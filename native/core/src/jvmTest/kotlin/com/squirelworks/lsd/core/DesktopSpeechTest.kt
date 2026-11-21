package com.squirelworks.lsd.core

import com.squirelworks.lsd.core.speech.desktopSpeech
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

class DesktopSpeechTest {
    @Test
    fun espeakNgSpeaksJapaneseAtTheRequestedSpeed() {
        val request = desktopSpeech("Linux", setOf("espeak-ng"), "あ", 1f, "ja-JP")
        assertEquals("espeak-ng", request?.program)
        assertEquals(listOf("-v", "ja", "-s", "175", "あ"), request?.args)
        val slow = desktopSpeech("Linux", setOf("espeak-ng", "spd-say"), "あ", 0.6f, "ja-JP")
        assertEquals("espeak-ng", slow?.program)
        assertEquals("105", slow?.args?.get(3))
    }

    @Test
    fun macUsesSayAndWindowsKeepsTheWordsOutOfTheCommand() {
        val mac = desktopSpeech("Mac OS X", setOf("say"), "あ", 1f, "ja-JP")
        assertEquals("say", mac?.program)
        assertEquals("あ", mac?.args?.last())
        val windows = desktopSpeech("Windows 11", setOf("powershell.exe"), "it's \"あ\"", 1f, "ja-JP")
        assertEquals("powershell.exe", windows?.program)
        assertEquals("it's \"あ\"", windows?.stdin)
        assertTrue(windows?.args?.none { it.contains("あ") } == true)
    }

    @Test
    fun noSpeechProgramMeansNoRequest() {
        assertNull(desktopSpeech("Linux", emptySet(), "あ", 1f, "ja-JP"))
    }
}
