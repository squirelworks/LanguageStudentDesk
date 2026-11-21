package com.squirelworks.lsd.kana

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
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
}
