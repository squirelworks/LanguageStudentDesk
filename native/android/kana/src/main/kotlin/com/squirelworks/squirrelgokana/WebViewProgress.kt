package com.squirelworks.squirrelgokana

import android.database.sqlite.SQLiteDatabase
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.kana.localStorageFromStore
import java.io.File

// The WebView app keeps its progress in this package's data directory when the
// native app is installed over it. A different package cannot read that directory.
fun readWebViewProgress(dataDir: File): WebViewStore {
    val storage = listOf(
        File(dataDir, "app_webview/Default/Local Storage"),
        File(dataDir, "app_webview/Local Storage"),
    ).filter { it.isDirectory }
    if (storage.isEmpty()) return WebViewStore.Absent
    val logs = ArrayList<File>()
    val tables = ArrayList<File>()
    val databases = ArrayList<File>()
    for (dir in storage) {
        dir.listFiles()?.filter { it.isFile && it.name.endsWith(".localstorage") }?.forEach { databases += it }
        File(dir, "leveldb").listFiles()?.forEach { file ->
            when (file.extension) {
                "log" -> logs += file
                "ldb" -> if (file.length() > 0L) tables += file
            }
        }
    }
    if (logs.isEmpty() && tables.isEmpty() && databases.isEmpty()) return WebViewStore.Absent
    val logBytes = ArrayList<ByteArray>(logs.size)
    for (log in logs) {
        if (log.length() > MAX_SCAN) return WebViewStore.Unreadable
        logBytes += runCatching { log.readBytes() }.getOrElse { return WebViewStore.Unreadable }
    }
    val tableBytes = ArrayList<ByteArray>(tables.size)
    for (table in tables) {
        if (table.length() > MAX_SCAN) return WebViewStore.Unreadable
        tableBytes += runCatching { table.readBytes() }.getOrElse { return WebViewStore.Unreadable }
    }
    val fromLevel = localStorageFromStore(logBytes, tableBytes, STORE_KEY)
    if (fromLevel != WebViewStore.Absent || logs.isNotEmpty() || tables.isNotEmpty()) return fromLevel
    for (database in databases) {
        when (val row = readSqliteItem(database, STORE_KEY)) {
            SqliteRead.Skip -> Unit
            SqliteRead.Failed -> return WebViewStore.Unreadable
            SqliteRead.Missing -> Unit
            is SqliteRead.Value -> return WebViewStore.Value(row.text)
        }
    }
    return WebViewStore.Absent
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

private const val STORE_KEY = "squirrelgo-kana"
private const val MAX_SCAN = 8L * 1024L * 1024L
