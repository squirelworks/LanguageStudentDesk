package com.squirelworks.squirrelgobopomofo

import android.database.sqlite.SQLiteDatabase
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.kana.levelDbStore
import com.squirelworks.lsd.kana.liveLevel
import java.io.File

// The WebView app keeps its progress in this package's data directory when the
// native app is installed over it. A different package cannot read that directory.
fun readWebViewProgress(dataDir: File): WebViewStore {
    val storage = listOf(
        File(dataDir, "app_webview/Default/Local Storage"),
        File(dataDir, "app_webview/Local Storage"),
    ).filter { it.isDirectory }
    if (storage.isEmpty()) return WebViewStore.Absent
    var sawLevel = false
    for (dir in storage) {
        val level = File(dir, "leveldb")
        if (!level.isDirectory) continue
        sawLevel = true
        val read = readLevelDirectory(level)
        if (read != WebViewStore.Absent) return read
    }
    if (sawLevel) return WebViewStore.Absent
    for (dir in storage) {
        dir.listFiles()?.filter { it.isFile && it.name.endsWith(".localstorage") }?.forEach { database ->
            when (val row = readSqliteItem(database, STORE_KEY)) {
                SqliteRead.Skip -> Unit
                SqliteRead.Failed -> return WebViewStore.Unreadable
                SqliteRead.Missing -> Unit
                is SqliteRead.Value -> return WebViewStore.Value(row.text)
            }
        }
    }
    return WebViewStore.Absent
}

private fun readLevelDirectory(level: File): WebViewStore {
    val files = level.listFiles()?.filter { it.isFile }.orEmpty()
    val hasTables = files.any { it.extension == "ldb" || it.extension == "log" || it.name.startsWith("MANIFEST-") }
    val current = files.firstOrNull { it.name == "CURRENT" } ?: return if (hasTables) WebViewStore.Unreadable else WebViewStore.Absent
    if (current.length() > 1024L) return WebViewStore.Unreadable
    val currentBytes = runCatching { current.readBytes() }.getOrElse { return WebViewStore.Unreadable }
    val manifestName = currentBytes.decodeToString().trim()
    val manifest = files.firstOrNull { it.name == manifestName } ?: return WebViewStore.Unreadable
    if (manifest.length() > MAX_SCAN) return WebViewStore.Unreadable
    val manifestBytes = runCatching { manifest.readBytes() }.getOrElse { return WebViewStore.Unreadable }
    val live = liveLevel(manifestBytes) ?: return WebViewStore.Unreadable
    val packed = LinkedHashMap<String, ByteArray>()
    packed["CURRENT"] = currentBytes
    packed[manifest.name] = manifestBytes
    for (number in live.tables) {
        val table = File(level, "%06d.ldb".format(number))
        if (!table.isFile || table.length() > MAX_SCAN) return WebViewStore.Unreadable
        packed[table.name] = runCatching { table.readBytes() }.getOrElse { return WebViewStore.Unreadable }
    }
    for (file in files) {
        if (file.extension != "log") continue
        val number = file.nameWithoutExtension.toLongOrNull() ?: continue
        val wanted = number >= live.minLog || (live.prevLog > 0L && number == live.prevLog)
        if (!wanted) continue
        if (file.length() > MAX_SCAN) return WebViewStore.Unreadable
        packed[file.name] = runCatching { file.readBytes() }.getOrElse { return WebViewStore.Unreadable }
    }
    return levelDbStore(packed, STORE_KEY)
}

private sealed interface SqliteRead {
    data object Skip : SqliteRead
    data object Failed : SqliteRead
    data object Missing : SqliteRead
    data class Value(val text: String) : SqliteRead
}

private fun readSqliteItem(file: File, key: String): SqliteRead {
    if (!file.isFile) return SqliteRead.Skip
    val header = runCatching { file.inputStream().use { it.readNBytes(16) } }.getOrNull() ?: return SqliteRead.Failed
    if (!header.decodeToString().startsWith("SQLite format 3")) return SqliteRead.Skip
    return runCatching {
        val db = SQLiteDatabase.openDatabase(file.path, null, SQLiteDatabase.OPEN_READONLY)
        db.use {
            val cursor = db.rawQuery("SELECT value FROM ItemTable WHERE key=?", arrayOf(key))
            cursor.use {
                if (it.moveToFirst()) SqliteRead.Value(it.getString(0).orEmpty()) else SqliteRead.Missing
            }
        }
    }.getOrDefault(SqliteRead.Failed)
}

private const val STORE_KEY = "squirrelgo-bopomofo"
private const val MAX_SCAN = 8L * 1024L * 1024L
