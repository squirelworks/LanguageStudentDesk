package com.squirelworks.squirrelgokana

import android.database.sqlite.SQLiteDatabase
import com.squirelworks.lsd.kana.extractStoredJson
import java.io.File

// The WebView app keeps its progress in this package's data directory when the
// native app is installed over it. A different package cannot read that directory.
fun readWebViewProgress(dataDir: File): String? {
    val storage = listOf(
        File(dataDir, "app_webview/Default/Local Storage"),
        File(dataDir, "app_webview/Local Storage"),
    )
    for (dir in storage) {
        dir.listFiles()?.filter { it.isFile && it.name.endsWith(".localstorage") }?.forEach { file ->
            readSqliteItem(file, STORE_KEY)?.let { return it }
        }
        val leveldb = File(dir, "leveldb")
        leveldb.listFiles()?.filter { it.isFile && (it.extension == "log" || it.extension == "ldb") }?.forEach { file ->
            if (file.length() > MAX_SCAN) return@forEach
            val bytes = runCatching { file.readBytes() }.getOrNull() ?: return@forEach
            extractStoredJson(bytes, STORE_KEY)?.let { return it }
        }
    }
    return null
}

private fun readSqliteItem(file: File, key: String): String? {
    if (!file.isFile) return null
    val header = runCatching { file.inputStream().use { it.readNBytes(16) } }.getOrNull() ?: return null
    if (!header.decodeToString().startsWith("SQLite format 3")) return null
    return runCatching {
        val db = SQLiteDatabase.openDatabase(file.path, null, SQLiteDatabase.OPEN_READONLY)
        db.use {
            val cursor = db.rawQuery("SELECT value FROM ItemTable WHERE key=?", arrayOf(key))
            cursor.use { if (it.moveToFirst()) it.getString(0) else null }
        }
    }.getOrNull()
}

private const val STORE_KEY = "squirrelgo-kana"
private const val MAX_SCAN = 8L * 1024L * 1024L
