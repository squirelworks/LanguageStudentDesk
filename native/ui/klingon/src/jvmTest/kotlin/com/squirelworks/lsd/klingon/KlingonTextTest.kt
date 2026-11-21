package com.squirelworks.lsd.klingon

import com.squirelworks.lsd.kana.WebViewStore
import kotlin.random.Random
import com.squirelworks.lsd.core.article.ArticleBlock
import com.squirelworks.lsd.core.article.ArticleRun
import com.squirelworks.lsd.core.article.parseArticle
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotEquals
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
    fun allQuestionsAreShuffled() {
        val lettersOnly = letters.filter { !it.numeral }
        val first = buildQuiz(lettersOnly, "read", 0, true, bundle, Shuffler(Random(1)))
        val second = buildQuiz(lettersOnly, "read", 0, true, bundle, Shuffler(Random(2)))
        assertEquals(lettersOnly.size, first.questions.size)
        assertNotEquals(first.questions.map { it.key }, second.questions.map { it.key })
    }

    @Test
    fun againPutsTheCardAFewPlacesOn() {
        val deck = listOf("a", "b", "c", "d", "e", "f")
        assertEquals(listOf("b", "c", "d", "a", "e", "f"), reinsertFlashCard(deck, 3))
        assertEquals(listOf("b", "a"), reinsertFlashCard(listOf("a", "b"), 5))
    }

    @Test
    fun pronunciationHeaderIsTwoColumns() {
        val html = "<p><b>pIqaD</b> is <i>the</i> alphabet.</p><ul><li>One</li></ul><table><tr><th>Letter</th><th>Say it like</th></tr><tr><td>tlh</td><td>t then a hissed <b>l</b></td></tr></table>"
        val blocks = parseArticle(html)
        val paragraph = blocks[0] as ArticleBlock.Paragraph
        assertTrue((paragraph.runs[0] as ArticleRun.Text).bold)
        assertTrue((paragraph.runs[2] as ArticleRun.Text).italic)
        assertEquals("One", ((blocks[1] as ArticleBlock.Bullet).runs.single() as ArticleRun.Text).value)
        val table = blocks[2] as ArticleBlock.Table
        assertEquals(listOf("Letter", "Say it like"), table.rows[0].map { (it.single() as ArticleRun.Text).value })
        assertEquals("tlh", (table.rows[1][0].single() as ArticleRun.Text).value)
        assertTrue((table.rows[1][1].last() as ArticleRun.Text).bold)
    }
}
