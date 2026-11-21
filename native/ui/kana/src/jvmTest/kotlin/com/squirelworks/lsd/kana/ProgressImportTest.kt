package com.squirelworks.lsd.kana

import java.io.File
import kotlin.random.Random
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue

class ProgressImportTest {
    @Test
    fun aFreshInstallTakesTheWebViewProgressOnce() {
        val legacy = """{"voice":false,"rate":0.7,"stats":{"hiragana|あ":{"c":4,"w":1,"s":3}}}"""
        val first = importWebViewProgress(ProgressFile(), WebViewStore.Value(legacy))
        assertFalse(first.voice)
        assertEquals(0.7f, first.rate)
        assertEquals(4, first.stats["hiragana|あ"]?.c)
        assertTrue(first.importedWebView)
        val again = importWebViewProgress(first, WebViewStore.Value("""{"voice":true,"stats":{"hiragana|い":{"c":9,"w":0,"s":1}}}"""))
        assertEquals(first, again)
    }

    @Test
    fun nativeProgressIsNotReplaced() {
        val native = ProgressFile(stats = mapOf("hiragana|あ" to StatWire(2, 0, 2)))
        val merged = importWebViewProgress(native, WebViewStore.Value("""{"stats":{"hiragana|あ":{"c":9,"w":0,"s":9}}}"""))
        assertEquals(2, merged.stats["hiragana|あ"]?.c)
        assertTrue(merged.importedWebView)
        assertEquals(merged, importWebViewProgress(merged, WebViewStore.Value("""{"stats":{"hiragana|あ":{"c":1,"w":0,"s":1}}}""")))
    }

    @Test
    fun anUnreadableStoreIsLeftForALaterAttempt() {
        val fresh = ProgressFile()
        assertEquals(fresh, importWebViewProgress(fresh, WebViewStore.Unreadable))
        assertEquals(fresh, importWebViewProgress(fresh, WebViewStore.Value("not json")))
        assertTrue(importWebViewProgress(fresh, WebViewStore.Absent).importedWebView)
    }

    @Test
    fun aChromiumLogKeepsTheNewestKanaProgress() {
        val bytes = javaClass.getResourceAsStream("/chromium/000003.log")!!.readBytes()
        assertEquals(836, bytes.size)
        val store = localStorageFromLog(bytes, "squirrelgo-kana") as WebViewStore.Value
        val progress = importWebViewProgress(ProgressFile(), store)
        assertEquals(7, progress.stats.size)
        assertEquals(9, progress.stats["hiragana|あ"]?.c)
        assertEquals(40, progress.speed)
        assertEquals(0.7f, progress.rate)
        assertTrue(progress.importedWebView)
        assertTrue(localStorageFromLog(bytes, "missing") is WebViewStore.Absent)
        assertTrue(localStorageFromLog(bytes.copyOf(20), "squirrelgo-kana") is WebViewStore.Unreadable)
    }

    @Test
    fun aCompactedTableKeepsKanaProgressAndLosesToANewerLog() {
        val table = resource("/chromium/000017.ldb")
        val olderLog = resource("/chromium/older-c3.log")
        val olderTable = resource("/chromium/000009.ldb")
        val newerLog = resource("/chromium/newer-c9.log")
        val onlyTable = importWebViewProgress(ProgressFile(), localStorageFromStore(emptyList(), listOf(table), "squirrelgo-kana"))
        assertEquals(7, onlyTable.stats.size)
        assertEquals(9, onlyTable.stats["hiragana|あ"]?.c)
        assertEquals(40, onlyTable.speed)
        assertEquals(0.7f, onlyTable.rate)
        val tableWins = importWebViewProgress(ProgressFile(), localStorageFromStore(listOf(olderLog), listOf(table), "squirrelgo-kana"))
        assertEquals(9, tableWins.stats["hiragana|あ"]?.c)
        val logWins = importWebViewProgress(ProgressFile(), localStorageFromStore(listOf(newerLog), listOf(olderTable), "squirrelgo-kana"))
        assertEquals(9, logWins.stats["hiragana|あ"]?.c)
        val fresh = ProgressFile()
        assertEquals(fresh, importWebViewProgress(fresh, localStorageFromStore(emptyList(), listOf(table.copyOf(40)), "squirrelgo-kana")))
    }

    @Test
    fun anOrphanTableDoesNotHideTheLiveValue() {
        val files = resourceDir("/chromium/interrupted")
        assertTrue(files.containsKey("000016.ldb"))
        assertTrue(files.getValue("000016.ldb").size > 100_000)
        val store = levelDbStore(files, "squirrelgo-kana") as WebViewStore.Value
        val progress = importWebViewProgress(ProgressFile(), store)
        assertEquals(9, progress.stats["hiragana|あ"]?.c)
        assertEquals(7, progress.stats.size)
        assertEquals(0.7f, progress.rate)
        val manifestName = files.getValue("CURRENT").decodeToString().trim()
        val broken = files.toMutableMap()
        broken[manifestName] = byteArrayOf(1, 2, 3, 4, 5, 6, 7, 8, 9)
        val fresh = ProgressFile()
        assertEquals(fresh, importWebViewProgress(fresh, levelDbStore(broken, "squirrelgo-kana")))
    }

    @Test
    fun aComparatorOnlyManifestStaysUnmarked() {
        val files = resourceDir("/chromium/comparator-only")
        assertEquals(35, files.getValue("MANIFEST-000002").size)
        assertTrue(files.containsKey("000005.ldb"))
        val fresh = ProgressFile()
        assertEquals(fresh, importWebViewProgress(fresh, levelDbStore(files, "squirrelgo-kana")))
        val meta = levelDbStore(resourceDir("/chromium/meta-only"), "squirrelgo-kana")
        assertTrue(meta is WebViewStore.Absent)
        assertTrue(importWebViewProgress(fresh, meta).importedWebView)
        val foreign = levelDbStore(resourceDir("/chromium/foreign-comparator"), "squirrelgo-kana")
        assertEquals(fresh, importWebViewProgress(fresh, foreign))
    }

    @Test
    fun aDeletedTableEntryIsNoProgress() {
        val tomb = resource("/chromium/tombstone.ldb")
        val store = localStorageFromStore(emptyList(), listOf(tomb), "squirrelgo-kana")
        assertTrue(store is WebViewStore.Absent)
        assertTrue(importWebViewProgress(ProgressFile(), store).importedWebView)
    }

    @Test
    fun badSnappyAndRestartCountsReturnNull() {
        assertNull(snappyDecode(byteArrayOf(10, (63 shl 2).toByte(), 0xFE.toByte(), 0xFF.toByte(), 0xFF.toByte(), 0xFF.toByte(), 1, 2)))
        val restarts = ByteArray(8)
        restarts[4] = 0
        restarts[5] = 0
        restarts[6] = 0
        restarts[7] = 0x40
        assertNull(blockEntries(restarts))
        val random = Random(1)
        repeat(200_000) {
            val size = random.nextInt(1, 24)
            val bytes = ByteArray(size) { random.nextInt().toByte() }
            snappyDecode(bytes)
        }
        repeat(2_000) {
            val size = random.nextInt(1, 48)
            val bytes = ByteArray(size) { random.nextInt().toByte() }
            localStorageFromStore(listOf(bytes), listOf(bytes), "squirrelgo-kana")
        }
    }

    private fun resource(path: String): ByteArray = javaClass.getResourceAsStream(path)!!.readBytes()

    private fun resourceDir(path: String): Map<String, ByteArray> {
        val dir = File(javaClass.getResource(path)!!.toURI())
        return dir.listFiles()!!.filter { it.isFile }.associate { it.name to it.readBytes() }
    }
}
