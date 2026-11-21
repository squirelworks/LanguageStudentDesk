package com.squirelworks.lsd.core

import com.squirelworks.lsd.core.speech.NamedVoice
import com.squirelworks.lsd.core.speech.VoiceProbe
import com.squirelworks.lsd.core.speech.VoiceStatus
import com.squirelworks.lsd.core.speech.desktopSpeech
import com.squirelworks.lsd.core.speech.desktopSpeechFromProbe
import com.squirelworks.lsd.core.speech.voiceStatus
import com.squirelworks.lsd.core.speech.parseEspeakLanguages
import com.squirelworks.lsd.core.speech.parseSayVoices
import com.squirelworks.lsd.core.speech.parseSpeechDispatcherVoices
import com.squirelworks.lsd.core.speech.pickVoice
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

class DesktopSpeechTest {
    private val macVoices = listOf(
        NamedVoice("Alex", "en_US"),
        NamedVoice("Kyoko", "ja_JP"),
    )
    private val windowsVoices = listOf(
        NamedVoice("Microsoft David", "en-US"),
        NamedVoice("Microsoft Haruka", "ja-JP"),
    )

    @Test
    fun macPicksTheJapaneseVoiceThenRefusesTheDefault() {
        val request = desktopSpeech("Mac OS X", setOf("say"), "-あ", 1f, "ja-JP", macVoices = macVoices)
        assertEquals("say", request?.program)
        assertEquals(listOf("-v", "Kyoko", "-r", "175", "--", "-あ"), request?.args)
        val onlyEnglish = desktopSpeech("Mac OS X", setOf("say"), "あ", 1f, "ja-JP", macVoices = listOf(NamedVoice("Alex", "en_US")))
        assertNull(onlyEnglish)
        val base = pickVoice("ja-JP", listOf(NamedVoice("Japanese", "ja")))
        assertEquals("Japanese", base?.name)
        val exact = pickVoice("ja-JP", listOf(NamedVoice("Base", "ja"), NamedVoice("Kyoko", "ja_JP")))
        assertEquals("Kyoko", exact?.name)
    }

    @Test
    fun windowsSelectsTheMatchingCultureAndKeepsWordsOffTheCommand() {
        val request = desktopSpeech("Windows 11", setOf("powershell.exe"), "it's \"あ\"", 1f, "ja-JP", windowsVoices = windowsVoices)
        assertEquals("powershell.exe", request?.program)
        assertEquals("Microsoft Haruka", request?.environment?.get("KANA_VOICE"))
        assertEquals("0", request?.environment?.get("KANA_RATE"))
        assertTrue(request?.args?.any { it.contains("\$env:KANA_VOICE") } == true)
        assertTrue(request?.args?.none { it.contains("Microsoft Haruka") } == true)
        assertEquals("it's \"あ\"", request?.stdin)
        assertTrue(request?.args?.none { it.contains("あ") } == true)
        assertNull(desktopSpeech("Windows 11", setOf("powershell.exe"), "あ", 1f, "ja-JP", windowsVoices = listOf(NamedVoice("Microsoft David", "en-US"))))
    }

    @Test
    fun linuxUsesEspeakNgJapaneseAndSkipsOldEspeakWithoutIt() {
        val listing = "Pty Language Age/Gender VoiceName File\n 5  en             M  english\n 5  ja             M  japanese\n"
        assertEquals(setOf("en", "ja"), parseEspeakLanguages(listing))
        val ng = desktopSpeech("Linux", setOf("espeak-ng", "espeak"), "あ", 0.6f, "ja-JP", espeakLanguages = setOf("ja", "en"))
        assertEquals("espeak-ng", ng?.program)
        assertEquals(listOf("-v", "ja", "-s", "105", "--", "あ"), ng?.args)
        assertNull(desktopSpeech("Linux", setOf("espeak"), "あ", 1f, "ja-JP", espeakLanguages = setOf("en")))
        val old = desktopSpeech("Linux", setOf("espeak"), "あ", 1f, "ja-JP", espeakLanguages = setOf("ja"))
        assertEquals("espeak", old?.program)
    }

    @Test
    fun speechDispatcherMatchesAListedVoiceOrStaysQuiet() {
        val listing = "NAME                     LANGUAGE             VARIANT\n" +
            "english                  en                   none\n" +
            "Female Japanese          ja                   none\n"
        assertEquals(
            listOf(NamedVoice("english", "en"), NamedVoice("Female Japanese", "ja")),
            parseSpeechDispatcherVoices(listing),
        )
        val request = desktopSpeech(
            "Linux",
            setOf("spd-say", "espeak"),
            "あ",
            1f,
            "ja-JP",
            espeakLanguages = setOf("en"),
            dispatcherVoices = parseSpeechDispatcherVoices(listing),
        )
        assertEquals("spd-say", request?.program)
        assertEquals(listOf("-y", "Female Japanese", "-l", "ja", "-r", "0", "-w", "--", "あ"), request?.args)
        assertTrue(request?.cancelsSpeechDispatcher == true)
        assertNull(
            desktopSpeech(
                "Linux",
                setOf("spd-say"),
                "あ",
                1f,
                "ja-JP",
                dispatcherVoices = listOf(NamedVoice("english", "en")),
            ),
        )
    }

    @Test
    fun aFinishedProgramSpeaksWhileAnotherProbeIsStillRunning() {
        val espeakReady = desktopSpeechFromProbe(
            "Linux",
            "あ",
            1f,
            "ja-JP",
            VoiceProbe(espeakNgLanguages = setOf("ja"), dispatcherVoices = null),
        )
        assertEquals("espeak-ng", espeakReady?.program)
        val dispatcherReady = desktopSpeechFromProbe(
            "Linux",
            "あ",
            1f,
            "ja-JP",
            VoiceProbe(dispatcherVoices = listOf(NamedVoice("japanese", "ja"))),
        )
        assertEquals("spd-say", dispatcherReady?.program)
        assertNull(desktopSpeechFromProbe("Linux", "あ", 1f, "ja-JP", VoiceProbe()))
        assertNull(desktopSpeechFromProbe("Mac OS X", "あ", 1f, "ja-JP", VoiceProbe()))
    }

    @Test
    fun aMissingVoiceIsReportedOnlyAfterEveryProbeHasFinished() {
        assertEquals(VoiceStatus.Pending, voiceStatus("Mac OS X", "ja-JP", VoiceProbe()))
        assertEquals(VoiceStatus.Missing, voiceStatus("Mac OS X", "ja-JP", VoiceProbe(macVoices = listOf(NamedVoice("Alex", "en_US")))))
        assertEquals(VoiceStatus.Ready, voiceStatus("Mac OS X", "ja-JP", VoiceProbe(macVoices = listOf(NamedVoice("Kyoko", "ja_JP")))))
        assertEquals(VoiceStatus.Pending, voiceStatus("Windows 11", "ja-JP", VoiceProbe()))
        assertEquals(VoiceStatus.Missing, voiceStatus("Windows 11", "ja-JP", VoiceProbe(windowsProgram = "")))
        assertEquals(
            VoiceStatus.Ready,
            voiceStatus("Windows 11", "ja-JP", VoiceProbe(windowsProgram = "powershell.exe", windowsVoices = windowsVoices)),
        )
        assertEquals(VoiceStatus.Ready, voiceStatus("Linux", "ja-JP", VoiceProbe(espeakNgLanguages = setOf("ja"))))
        assertEquals(
            VoiceStatus.Pending,
            voiceStatus("Linux", "ja-JP", VoiceProbe(espeakNgLanguages = setOf("en"), espeakLanguages = setOf("en"))),
        )
        assertEquals(
            VoiceStatus.Missing,
            voiceStatus(
                "Linux",
                "ja-JP",
                VoiceProbe(
                    espeakNgLanguages = setOf("en"),
                    espeakLanguages = setOf("en"),
                    dispatcherVoices = listOf(NamedVoice("english", "en")),
                ),
            ),
        )
    }

    @Test
    fun sayListingKeepsTheVoiceNameAndLocale() {
        val listing = "Alex                en_US    # Hello!\nKyoko               ja_JP    # こんにちは\n"
        assertEquals(listOf(NamedVoice("Alex", "en_US"), NamedVoice("Kyoko", "ja_JP")), parseSayVoices(listing))
    }
}
