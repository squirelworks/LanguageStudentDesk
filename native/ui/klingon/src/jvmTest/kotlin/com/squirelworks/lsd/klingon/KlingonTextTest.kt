package com.squirelworks.lsd.klingon

import com.squirelworks.lsd.kana.WebViewStore
import kotlin.random.Random
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class KlingonTextTest {
    private val ipa = mapOf("a" to "ɑ", "I" to "ɪ", "n" to "n", "tlh" to "t͡ɬ", "ng" to "ŋ", "'" to "ʔ", "w" to "w")
    private val letters = listOf(
        KlingonLetter("a", 0xF8D0, "ah", "ah", "jav", "six", false, 0),
        KlingonLetter("I", 0xF8D7, "ih", "ih", "bIQ", "water", false, 0),
        KlingonLetter("n", 0xF8DB, "n", "n", "nuqneH", "greeting", false, 0),
        KlingonLetter("tlh", 0xF8E4, "tlh", "tl", "tlhIngan", "Klingon", false, 0),
        KlingonLetter("ng", 0xF8DC, "ng", "ng", "tlhIngan", "Klingon", false, 0),
        KlingonLetter("'", 0xF8E9, "stop", "uh-oh", "wa'", "one", false, 0),
        KlingonLetter("w", 0xF8E7, "w", "w", "wa'", "one", false, 0),
        KlingonLetter("0", 0xF8F0, "pagh", "pagh", "pagh", "zero", true, 1),
    )
    private val byKey = letters.associateBy { it.key }
    private val words = listOf(KlingonWord("tlhIngan", "Klingon"), KlingonWord("wa'", "one"), KlingonWord("Qapla'", "success"))
    private val bundle = KlingonBundle(
        ipa = ipa,
        lessons = emptyList(),
        letters = letters,
        byKey = byKey,
        words = words,
        articles = emptyList(),
        strokes = emptyMap(),
        accent = "",
        about = KlingonAbout(),
        suite = null,
    )

    @Test
    fun normalizeKeepsQAndRaisesTheCapitalLetters() {
        assertEquals("tlhIngan Hol", normalizeKlingon("tlhingan hol"))
        assertEquals("q Q", normalizeKlingon("q Q"))
        assertEquals("wa'", normalizeKlingon("wa’"))
    }

    @Test
    fun transliterateSplitsClusters() {
        val spelled = transliterate("tlhIngan", byKey)
        assertEquals(listOf("tlh", "I", "ng", "a", "n"), spelled.parts.map { it.roman })
        assertEquals(5, spelled.text.length)
        assertEquals("\uF8FD", transliterate(",", byKey).text)
    }

    @Test
    fun clipNamesAvoidCaseCollisions() {
        assertEquals("l-f8d0.mp3", letterFile(0xF8D0))
        assertEquals("w-_qapla7.mp3", wordFile("Qapla'"))
        assertEquals("w-tlh_ingan-_hol.mp3", wordFile("tlhIngan Hol"))
        assertEquals("t͡ɬɪŋɑn", klingonIpa("tlhIngan", ipa))
    }

    @Test
    fun wordQuizStaysInsideTheSelectedLetters() {
        val quiz = buildQuiz(letters.filter { !it.numeral }, "word", 4, true, bundle, Shuffler(Random(1)))
        assertEquals(4, quiz.questions.size)
        quiz.questions.forEach { question ->
            assertEquals("word", question.kind)
            assertTrue(question.answer in question.options.map { it.key })
        }
        val numeral = buildQuiz(letters.filter { it.numeral }, "word", 1, true, bundle, Shuffler(Random(1)))
        assertEquals("read", numeral.questions.single().kind)
    }

    @Test
    fun answeringRecordsAStreak() {
        var progress = KlingonProgress()
        progress = progress.record("a", true).record("a", true).record("a", true)
        assertTrue(progress.mastered("a"))
        progress = progress.record("a", false)
        assertFalse(progress.mastered("a"))
        val imported = importKlingonProgress(KlingonProgress(), WebViewStore.Value("""{"stats":{"a":{"c":1,"w":0,"s":1}},"written":{"a":2}}"""))
        assertEquals(1, imported.stats["a"]?.s)
        assertEquals(2, imported.written["a"])
        assertTrue(imported.importedWebView)
    }

    @Test
    fun articlesDropTags() {
        val plain = articlePlain("<p><b>pIqaD</b> is the alphabet.</p><ul><li>One</li></ul>")
        assertTrue(plain.contains("pIqaD"))
        assertFalse(plain.contains("<"))
        assertTrue(plain.contains("• One"))
    }
}
