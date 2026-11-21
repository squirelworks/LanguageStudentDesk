package com.squirelworks.lsd.kana

private const val BLOCK = 32768
private const val HEADER = 7
private const val FULL = 1
private const val FIRST = 2
private const val MIDDLE = 3
private const val LAST = 4
private const val PUT = 1
private const val DELETE = 0

internal class StoreHit(val sequence: Long, val text: String?)

// A Chromium localStorage .log file: LevelDB records, then write batches.
// The newest write for [key] wins. A newer delete means the key is gone.
// A record that does not check out is unreadable, not empty.
fun localStorageFromLog(bytes: ByteArray, key: String): WebViewStore =
    localStorageFromStore(listOf(bytes), emptyList(), key)

fun localStorageFromLogs(logs: List<ByteArray>, key: String): WebViewStore =
    localStorageFromStore(logs, emptyList(), key)

// Newest sequence across the write-ahead logs and the compacted tables wins.
fun localStorageFromStore(
    logs: List<ByteArray>,
    tables: List<ByteArray>,
    key: String,
    raw: Boolean = false,
): WebViewStore {
    var best: StoreHit? = null
    for (bytes in logs) {
        val hits = hitsFromLog(bytes, key) ?: return WebViewStore.Unreadable
        for (hit in hits) if (best == null || hit.sequence >= best.sequence) best = hit
    }
    for (bytes in tables) {
        val hits = hitsFromTable(bytes, key) ?: return WebViewStore.Unreadable
        for (hit in hits) if (best == null || hit.sequence >= best.sequence) best = hit
    }
    val winner = best ?: return WebViewStore.Absent
    val text = winner.text ?: return WebViewStore.Absent
    if (!raw && parseProgress(text) == null) return WebViewStore.Unreadable
    return WebViewStore.Value(text)
}

internal fun hitsFromLog(bytes: ByteArray, key: String): List<StoreHit>? {
    val records = logicalRecords(bytes) ?: return null
    val hits = ArrayList<StoreHit>()
    for (record in records) hits += batchHits(record, key) ?: return null
    return hits
}

internal fun logicalRecords(bytes: ByteArray): List<ByteArray>? {
    val out = ArrayList<ByteArray>()
    var pending = ByteArray(0)
    var open = false
    var offset = 0
    while (offset < bytes.size) {
        val intoBlock = offset % BLOCK
        val room = BLOCK - intoBlock
        if (room < HEADER) {
            offset += room
            continue
        }
        if (offset + HEADER > bytes.size) return if (bytes.drop(offset).all { it == 0.toByte() }) out else null
        val checksum = u32(bytes, offset)
        val length = u16(bytes, offset + 4)
        val type = bytes[offset + 6].toInt() and 0xff
        if (type == 0 && length == 0 && checksum == 0) {
            offset += room
            continue
        }
        val start = offset + HEADER
        if (length < 0 || start + length > bytes.size || (start + length - 1) / BLOCK != offset / BLOCK) return null
        val body = ByteArray(1 + length)
        body[0] = type.toByte()
        bytes.copyInto(body, 1, start, start + length)
        if (mask(crc32c(body)) != checksum) return null
        val chunk = bytes.copyOfRange(start, start + length)
        when (type) {
            FULL -> {
                if (open) return null
                out += chunk
            }
            FIRST -> {
                if (open) return null
                pending = chunk
                open = true
            }
            MIDDLE -> {
                if (!open) return null
                pending += chunk
            }
            LAST -> {
                if (!open) return null
                out += pending + chunk
                pending = ByteArray(0)
                open = false
            }
            else -> return null
        }
        offset = start + length
    }
    if (open) return null
    return out
}

private fun batchHits(record: ByteArray, key: String): List<StoreHit>? {
    if (record.size < 12) return null
    var sequence = u64(record, 0)
    val count = u32(record, 8)
    var pos = 12
    val hits = ArrayList<StoreHit>()
    repeat(count) {
        if (pos >= record.size) return null
        val tag = record[pos].toInt() and 0xff
        pos++
        val keyBytes = readBytes(record, pos) ?: return null
        pos = keyBytes.second
        val matches = storageKey(keyBytes.first) == key
        when (tag) {
            DELETE -> if (matches) hits += StoreHit(sequence, null)
            PUT -> {
                val value = readBytes(record, pos) ?: return null
                pos = value.second
                if (matches) {
                    val text = storageText(value.first) ?: return null
                    hits += StoreHit(sequence, text)
                }
            }
            else -> return null
        }
        sequence++
    }
    if (pos != record.size) return null
    return hits
}

internal fun storageKey(raw: ByteArray): String? {
    if (raw.isEmpty() || raw[0] != '_'.code.toByte()) return null
    val sep = raw.indexOf(0)
    if (sep < 0 || sep + 1 >= raw.size) return null
    return decode(raw[sep + 1].toInt() and 0xff, raw.copyOfRange(sep + 2, raw.size))
}

internal fun storageText(raw: ByteArray): String? {
    if (raw.isEmpty()) return null
    return decode(raw[0].toInt() and 0xff, raw.copyOfRange(1, raw.size))
}

private fun decode(encoding: Int, data: ByteArray): String? = when (encoding) {
    0 -> {
        if (data.size % 2 != 0) null
        else CharArray(data.size / 2) { index ->
            val low = data[index * 2].toInt() and 0xff
            val high = data[index * 2 + 1].toInt() and 0xff
            (high shl 8 or low).toChar()
        }.concatToString()
    }
    1 -> CharArray(data.size) { (data[it].toInt() and 0xff).toChar() }.concatToString()
    else -> null
}

private fun readBytes(data: ByteArray, start: Int): Pair<ByteArray, Int>? {
    val (length, pos) = varint(data, start) ?: return null
    if (length < 0 || pos > data.size || length > data.size - pos) return null
    return data.copyOfRange(pos, pos + length) to pos + length
}

internal fun varint(data: ByteArray, start: Int): Pair<Int, Int>? {
    var value = 0
    var shift = 0
    var pos = start
    while (shift <= 28 && pos < data.size) {
        val byte = data[pos].toInt() and 0xff
        pos++
        value = value or ((byte and 0x7f) shl shift)
        if (byte and 0x80 == 0) return value to pos
        shift += 7
    }
    return null
}

private operator fun ByteArray.plus(other: ByteArray): ByteArray {
    val out = ByteArray(size + other.size)
    copyInto(out)
    other.copyInto(out, size)
    return out
}

private fun u16(data: ByteArray, offset: Int): Int =
    (data[offset].toInt() and 0xff) or ((data[offset + 1].toInt() and 0xff) shl 8)

internal fun u32(data: ByteArray, offset: Int): Int =
    (data[offset].toInt() and 0xff) or
        ((data[offset + 1].toInt() and 0xff) shl 8) or
        ((data[offset + 2].toInt() and 0xff) shl 16) or
        ((data[offset + 3].toInt() and 0xff) shl 24)

internal fun u64(data: ByteArray, offset: Int): Long {
    var value = 0L
    for (i in 0 until 8) value = value or ((data[offset + i].toLong() and 0xff) shl (8 * i))
    return value
}

internal fun mask(crc: Int): Int {
    val rotated = (crc ushr 15) or (crc shl 17)
    return rotated + 0xA282EAD8.toInt()
}

internal fun crc32c(data: ByteArray): Int {
    var crc = 0.inv()
    for (byte in data) crc = CRC[(crc xor byte.toInt()) and 0xff] xor (crc ushr 8)
    return crc.inv()
}

private val CRC = IntArray(256) { index ->
    var value = index
    repeat(8) { value = if (value and 1 != 0) (value ushr 1) xor 0x82F63B78.toInt() else value ushr 1 }
    value
}
