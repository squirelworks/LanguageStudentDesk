package com.squirelworks.lsd.kana

private const val MAGIC = 0xdb4775248b80fb57UL
private const val FOOTER = 48
private const val TRAILER = 5

// A compacted LevelDB table (.ldb). Data blocks may be raw or Snappy.
// Each entry's key is the user key plus an 8-byte sequence and type trailer.
internal fun hitsFromTable(bytes: ByteArray, key: String): List<StoreHit>? {
    if (bytes.size < FOOTER) return null
    if (u64(bytes, bytes.size - 8).toULong() != MAGIC) return null
    val footer = bytes.copyOfRange(bytes.size - FOOTER, bytes.size - 8)
    val meta = blockHandle(footer, 0) ?: return null
    val index = blockHandle(footer, meta.third) ?: return null
    val indexBlock = readBlock(bytes, index.first, index.second) ?: return null
    val indexEntries = blockEntries(indexBlock) ?: return null
    val hits = ArrayList<StoreHit>()
    for ((_, handle) in indexEntries) {
        val data = blockHandle(handle, 0) ?: return null
        val block = readBlock(bytes, data.first, data.second) ?: return null
        val entries = blockEntries(block) ?: return null
        for ((internal, value) in entries) {
            if (internal.size < 8) return null
            val packed = u64(internal, internal.size - 8)
            val sequence = packed ushr 8
            val type = (packed and 0xff).toInt()
            val user = internal.copyOfRange(0, internal.size - 8)
            if (storageKey(user) != key) continue
            when (type) {
                0 -> hits += StoreHit(sequence, null)
                1 -> {
                    val text = storageText(value) ?: return null
                    hits += StoreHit(sequence, text)
                }
                else -> return null
            }
        }
    }
    return hits
}

private fun blockHandle(data: ByteArray, start: Int): Triple<Long, Long, Int>? {
    val (offset, afterOffset) = varint64(data, start) ?: return null
    val (size, afterSize) = varint64(data, afterOffset) ?: return null
    if (offset < 0 || size < 0) return null
    return Triple(offset, size, afterSize)
}

private fun readBlock(file: ByteArray, offset: Long, size: Long): ByteArray? {
    val end = offset + size + TRAILER
    if (offset < 0L || size < 0L || end < 0L || end > file.size.toLong()) return null
    if (offset > Int.MAX_VALUE.toLong() || size > Int.MAX_VALUE.toLong()) return null
    val off = offset.toInt()
    val length = size.toInt()
    val raw = file.copyOfRange(off, off + length)
    val type = file[off + length].toInt() and 0xff
    val checked = file.copyOfRange(off, off + length + 1)
    if (mask(crc32c(checked)) != u32(file, off + length + 1)) return null
    return when (type) {
        0 -> raw
        1 -> snappyDecode(raw)
        else -> null
    }
}

internal fun blockEntries(block: ByteArray): List<Pair<ByteArray, ByteArray>>? {
    if (block.size < 4) return null
    val restarts = u32(block, block.size - 4).toLong() and 0xffffffffL
    if (restarts <= 0L || restarts > (block.size - 4L) / 4L) return null
    val restartAt = (block.size - (restarts + 1L) * 4L).toInt()
    if (restartAt < 0) return null
    val entries = ArrayList<Pair<ByteArray, ByteArray>>()
    for (restart in 0 until restarts.toInt()) {
        val start = u32(block, restartAt + restart * 4)
        val limit = if (restart + 1L < restarts) u32(block, restartAt + (restart + 1) * 4) else restartAt
        if (start < 0 || limit < start || limit > restartAt) return null
        var pos = start
        var key = ByteArray(0)
        var first = true
        while (pos < limit) {
            val (shared, p1) = varint(block, pos) ?: return null
            val (nonShared, p2) = varint(block, p1) ?: return null
            val (valueLength, p3) = varint(block, p2) ?: return null
            if (first && shared != 0) return null
            first = false
            val keyLength = shared.toLong() + nonShared.toLong()
            if (shared > key.size || nonShared < 0 || valueLength < 0 || keyLength > Int.MAX_VALUE) return null
            if (p3 > limit || nonShared > limit - p3 || valueLength > limit - p3 - nonShared) return null
            val next = ByteArray(keyLength.toInt())
            key.copyInto(next, 0, 0, shared)
            block.copyInto(next, shared, p3, p3 + nonShared)
            val value = block.copyOfRange(p3 + nonShared, p3 + nonShared + valueLength)
            key = next
            entries += key to value
            pos = p3 + nonShared + valueLength
        }
        if (pos != limit) return null
    }
    return entries
}

internal fun snappyDecode(data: ByteArray): ByteArray? {
    val (length, start) = varint(data, 0) ?: return null
    if (length < 0 || length > 16 * 1024 * 1024) return null
    val out = ByteArray(length)
    var written = 0
    var pos = start
    while (pos < data.size) {
        val tag = data[pos].toInt() and 0xff
        pos++
        when (tag and 3) {
            0 -> {
                val literal = literalLength(data, pos, tag) ?: return null
                pos = literal.second
                val count = literal.first
                if (count <= 0L || pos > data.size || count > (data.size - pos).toLong() || count > (out.size - written).toLong()) return null
                val n = count.toInt()
                data.copyInto(out, written, pos, pos + n)
                written += n
                pos += n
            }
            1 -> {
                if (pos >= data.size) return null
                val copy = ((tag ushr 2) and 7) + 4
                val offset = (((tag ushr 5) shl 8) or (data[pos].toInt() and 0xff)).toLong()
                pos++
                if (!copyFrom(out, written, copy, offset)) return null
                written += copy
            }
            2 -> {
                if (pos.toLong() + 2L > data.size.toLong()) return null
                val copy = (tag ushr 2) + 1
                val offset = ((data[pos].toInt() and 0xff) or ((data[pos + 1].toInt() and 0xff) shl 8)).toLong()
                pos += 2
                if (!copyFrom(out, written, copy, offset)) return null
                written += copy
            }
            else -> {
                if (pos.toLong() + 4L > data.size.toLong()) return null
                val copy = (tag ushr 2) + 1
                var offset = 0L
                for (i in 0 until 4) offset = offset or ((data[pos + i].toLong() and 0xff) shl (8 * i))
                pos += 4
                if (!copyFrom(out, written, copy, offset)) return null
                written += copy
            }
        }
    }
    if (written != out.size) return null
    return out
}

private fun literalLength(data: ByteArray, pos: Int, tag: Int): Pair<Long, Int>? {
    val head = tag ushr 2
    if (head < 60) return (head + 1L) to pos
    val extra = head - 59
    if (extra !in 1..4 || pos.toLong() + extra > data.size.toLong()) return null
    var length = 0L
    for (i in 0 until extra) length = length or ((data[pos + i].toLong() and 0xff) shl (8 * i))
    return (length + 1L) to (pos + extra)
}

private fun copyFrom(out: ByteArray, written: Int, length: Int, offset: Long): Boolean {
    if (length <= 0 || offset <= 0L || offset > written.toLong()) return false
    if (written.toLong() + length.toLong() > out.size.toLong()) return false
    var from = written - offset.toInt()
    var to = written
    repeat(length) { out[to++] = out[from++] }
    return true
}

internal fun varint64(data: ByteArray, start: Int): Pair<Long, Int>? {
    var value = 0L
    var shift = 0
    var pos = start
    while (shift <= 63 && pos < data.size) {
        val byte = data[pos].toLong() and 0xff
        pos++
        value = value or ((byte and 0x7f) shl shift)
        if (byte and 0x80L == 0L) return value to pos
        shift += 7
    }
    return null
}
