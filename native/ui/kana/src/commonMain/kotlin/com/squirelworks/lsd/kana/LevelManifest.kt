package com.squirelworks.lsd.kana

data class LiveLevel(val minLog: Long, val prevLog: Long, val tables: Set<Long>)

// CURRENT names the manifest. The manifest is a log of version edits.
// Only tables still listed there, and logs at or after the log number, are live.
// A half-written table from an interrupted compaction is not listed, so it is ignored.
fun levelDbStore(files: Map<String, ByteArray>, key: String, raw: Boolean = false): WebViewStore {
    val current = files["CURRENT"] ?: return if (files.keys.any { it.endsWith(".ldb") || it.endsWith(".log") || it.startsWith("MANIFEST-") }) {
        WebViewStore.Unreadable
    } else {
        WebViewStore.Absent
    }
    val name = current.decodeToString().trim()
    if (!name.startsWith("MANIFEST-") || name.contains('/') || name.contains('\\')) return WebViewStore.Unreadable
    val manifest = files[name] ?: return WebViewStore.Unreadable
    val live = liveLevel(manifest) ?: return WebViewStore.Unreadable
    val logs = ArrayList<ByteArray>()
    val tables = ArrayList<ByteArray>()
    for (number in live.tables) {
        val bytes = files["%06d.ldb".format(number)] ?: return WebViewStore.Unreadable
        tables += bytes
    }
    for ((fileName, bytes) in files) {
        if (!fileName.endsWith(".log")) continue
        val number = fileName.removeSuffix(".log").toLongOrNull() ?: continue
        if (number >= live.minLog || (live.prevLog > 0L && number == live.prevLog)) logs += bytes
    }
    return localStorageFromStore(logs, tables, key, raw)
}

fun liveLevel(manifest: ByteArray): LiveLevel? {
    val records = logicalRecords(manifest) ?: return null
    var minLog = 0L
    var prevLog = 0L
    var sawLog = false
    var sawNextFile = false
    var sawSequence = false
    val tables = HashSet<Long>()
    for (record in records) {
        val edit = versionEdit(record) ?: return null
        if (edit.comparator != null && edit.comparator != BYTEWISE) return null
        if (edit.log != null) {
            minLog = edit.log
            sawLog = true
        }
        if (edit.prev != null) prevLog = edit.prev
        if (edit.sawNextFile) sawNextFile = true
        if (edit.sawSequence) sawSequence = true
        tables.removeAll(edit.removed)
        tables.addAll(edit.added)
    }
    // VersionSet::Recover refuses a descriptor that never recorded these three.
    if (!sawLog || !sawNextFile || !sawSequence) return null
    return LiveLevel(minLog, prevLog, tables)
}

private class VersionEdit(
    val comparator: String?,
    val log: Long?,
    val prev: Long?,
    val sawNextFile: Boolean,
    val sawSequence: Boolean,
    val added: List<Long>,
    val removed: List<Long>,
)

private fun versionEdit(record: ByteArray): VersionEdit? {
    var pos = 0
    var comparator: String? = null
    var log: Long? = null
    var prev: Long? = null
    var sawNextFile = false
    var sawSequence = false
    val added = ArrayList<Long>()
    val removed = ArrayList<Long>()
    while (pos < record.size) {
        val (tag, afterTag) = varint64(record, pos) ?: return null
        pos = afterTag
        when (tag) {
            1L -> {
                val (name, next) = readPrefixed(record, pos) ?: return null
                comparator = name.decodeToString()
                pos = next
            }
            2L -> {
                val (number, next) = varint64(record, pos) ?: return null
                log = number
                pos = next
            }
            3L -> {
                val (_, next) = varint64(record, pos) ?: return null
                sawNextFile = true
                pos = next
            }
            4L -> {
                val (_, next) = varint64(record, pos) ?: return null
                sawSequence = true
                pos = next
            }
            5L -> {
                val (_, afterLevel) = varint64(record, pos) ?: return null
                pos = skipPrefixed(record, afterLevel) ?: return null
            }
            6L -> {
                val (_, afterLevel) = varint64(record, pos) ?: return null
                val (number, next) = varint64(record, afterLevel) ?: return null
                removed += number
                pos = next
            }
            7L -> {
                val (_, afterLevel) = varint64(record, pos) ?: return null
                val (number, afterNumber) = varint64(record, afterLevel) ?: return null
                val (_, afterSize) = varint64(record, afterNumber) ?: return null
                val afterSmallest = skipPrefixed(record, afterSize) ?: return null
                pos = skipPrefixed(record, afterSmallest) ?: return null
                added += number
            }
            9L -> {
                val (number, next) = varint64(record, pos) ?: return null
                prev = number
                pos = next
            }
            else -> return null
        }
    }
    return VersionEdit(comparator, log, prev, sawNextFile, sawSequence, added, removed)
}

private fun skipPrefixed(data: ByteArray, start: Int): Int? = readPrefixed(data, start)?.second

private fun readPrefixed(data: ByteArray, start: Int): Pair<ByteArray, Int>? {
    val (length, pos) = varint64(data, start) ?: return null
    if (length < 0L || pos.toLong() + length > data.size.toLong()) return null
    val end = pos + length.toInt()
    return data.copyOfRange(pos, end) to end
}

private const val BYTEWISE = "leveldb.BytewiseComparator"
