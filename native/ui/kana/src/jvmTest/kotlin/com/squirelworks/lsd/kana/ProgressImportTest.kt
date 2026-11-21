package com.squirelworks.lsd.kana

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue

class ProgressImportTest {
    @Test
    fun aFreshInstallTakesTheWebViewProgressOnce() {
        val legacy = """{"voice":false,"rate":0.7,"stats":{"hiragana|あ":{"c":4,"w":1,"s":3}}}"""
        val first = importWebViewProgress(ProgressFile(), legacy)
        assertFalse(first.voice)
        assertEquals(0.7f, first.rate)
        assertEquals(4, first.stats["hiragana|あ"]?.c)
        assertTrue(first.importedWebView)
        val again = importWebViewProgress(first, """{"voice":true,"stats":{"hiragana|い":{"c":9,"w":0,"s":1}}}""")
        assertEquals(first, again)
    }

    @Test
    fun nativeProgressIsNotReplaced() {
        val native = ProgressFile(stats = mapOf("hiragana|あ" to StatWire(2, 0, 2)))
        val merged = importWebViewProgress(native, """{"stats":{"hiragana|あ":{"c":9,"w":0,"s":9}}}""")
        assertEquals(2, merged.stats["hiragana|あ"]?.c)
        assertTrue(merged.importedWebView)
        assertEquals(merged, importWebViewProgress(merged, """{"stats":{"hiragana|あ":{"c":1,"w":0,"s":1}}}"""))
    }

    @Test
    fun localStorageBytesYieldTheStoredJson() {
        val json = """{"speed":40,"stats":{"k|あ":{"c":1,"w":2,"s":0}}}"""
        val bytes = "pad".encodeToByteArray() + utf16("squirrelgo-kana") + byteArrayOf(0, 1) + utf16(json)
        assertEquals(json, extractStoredJson(bytes, "squirrelgo-kana"))
        assertEquals(40, parseProgress(extractStoredJson(bytes, "squirrelgo-kana").orEmpty())?.speed)
        assertNull(extractStoredJson(bytes, "other-app"))
        val plain = "squirrelgo-kana\u0001$json".encodeToByteArray()
        assertEquals(json, extractStoredJson(plain, "squirrelgo-kana"))
    }

    private fun utf16(text: String): ByteArray {
        val out = ByteArray(text.length * 2)
        text.forEachIndexed { index, ch ->
            out[index * 2] = (ch.code and 0xff).toByte()
            out[index * 2 + 1] = (ch.code shr 8 and 0xff).toByte()
        }
        return out
    }
}
