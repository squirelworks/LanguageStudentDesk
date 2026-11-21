package com.squirelworks.lsd.kana

import kotlin.test.Test
import kotlin.test.assertEquals

class VoiceNoticeTest {
    @Test
    fun theNoticeNamesTheScriptLanguage() {
        assertEquals(
            "No Japanese voice found. Install a Japanese text-to-speech voice in your system settings.",
            missingVoiceNotice("Japanese"),
        )
        assertEquals(
            "No text-to-speech voice found. Install one in your system settings.",
            missingVoiceNotice("  "),
        )
    }
}
