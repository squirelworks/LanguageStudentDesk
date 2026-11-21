package com.squirelworks.lsd.kana

data class LiveLevel(val minLog: Long, val prevLog: Long, val tables: Set<Long>)

// CURRENT names the manifest. The manifest is a log of version edits.
// Only tables still listed there, and logs at or after the log number, are live.
// A half-written table from an interrupted compaction is not listed, so it is ignored.
fun levelDbStore(files: Map<String, ByteArray>, key: String): WebViewStore {
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
    return localStorageFromStore(logs, tables, key)
}

fun liveLevel(manifest: ByteArray): LiveLevel? {
    val records = logicalRecords(manifest) ?: return null
    var minLog = 0L
    var prevLog = 0L
    val tables = HashSet<Long>()
    for (record in records) if (!applyVersionEdit(record, tables) { log, prev ->
        if (log != null) minLog = log
        if (prev != null) prevLog = prev
    }) return null
    return LiveLevel(minLog, prevLog, tables)
}

private fun applyVersionEdit(record: ByteArray, tables: MutableSet<Long>, logs: (Long?, Long?) -> Unit): Boolean {
    var pos = 0
    while (pos < record.size) {
        val (tag, afterTag) = varint64(record, pos) ?: return false
        pos = afterTag
        when (tag) {
            1L -> pos = skipPrefixed(record, pos) ?: return false
            2L -> {
                val (number, next) = varint64(record, pos) ?: return false
                logs(number, null)
                pos = next
            }
            3L, 4L -> {
                val (_, next) = varint64(record, pos) ?: return false
                pos = next
            }
            5L -> {
                val (_, afterLevel) = varint64(record, pos) ?: return false
                pos = skipPrefixed(record, afterLevel) ?: return false
            }
            6L -> {
                val (_, afterLevel) = varint64(record, pos) ?: return false
                val (number, next) = varint64(record, afterLevel) ?: return false
                tables.remove(number)
                pos = next
            }
            7L -> {
                val (_, afterLevel) = varint64(record, pos) ?: return false
                val (number, afterNumber) = varint64(record, afterLevel) ?: return false
                val (_, afterSize) = varint64(record, afterNumber) ?: return false
                val afterSmallest = skipPrefixed(record, afterSize) ?: return false
                pos = skipPrefixed(record, afterSmallest) ?: return false
                tables.add(number)
            }
            9L -> {
                val (number, next) = varint64(record, pos) ?: return false
                logs(null, number)
                pos = next
            }
            else -> return false
        }
    }
    return true
}

private fun skipPrefixed(data: ByteArray, start: Int): Int? {
    val (length, pos) = varint64(data, start) ?: return null
    if (length < 0L || pos.toLong() + length > data.size.toLong()) return null
    return pos + length.toInt()
}
