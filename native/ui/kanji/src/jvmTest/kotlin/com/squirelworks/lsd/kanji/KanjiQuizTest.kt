package com.squirelworks.lsd.kanji

import com.squirelworks.lsd.kana.WebViewStore
import kotlin.random.Random
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertIs
import kotlin.test.assertNull
import kotlin.test.assertTrue

class KanjiQuizTest {
    private val shuffler = Shuffler(Random(1))

    private fun entry(char: String, info: String, kun: String = "", on: String = "", roman: String = "", level: String = "N5", frequency: String = "10") =
        KanjiChar(char = char, info = info, kun = kun, on = on, roman = roman, level = level, frequency = frequency)

    @Test
    fun meaningQuizUsesTheMeaningAndStaysInsideTheSet() {
        val chars = listOf(
            entry("日", "sun"),
            entry("月", "moon"),
            entry("火", "fire"),
            entry("水", "water"),
            entry("木", "tree"),
        )
        val built = buildQuiz("set", chars.map { it.char }, "meaning", chars.associateBy { it.char }, emptyMap(), shuffler)
        val quiz = assertIs<QuizBuild.Ready>(built).quiz
        assertEquals(5, quiz.questions.size)
        quiz.questions.forEach { question ->
            val item = chars.first { it.char == question.char }
            assertEquals(item.info, question.answer)
            assertTrue(question.answer in question.options)
            assertTrue(question.options.all { option -> chars.any { it.info == option } })
        }
    }

    @Test
    fun kunPadsMissingReadings() {
        val chars = listOf(
            entry("日", "sun", kun = "ひ"),
            entry("月", "moon", kun = "つき"),
            entry("火", "fire"),
            entry("水", "water"),
        )
        val built = buildQuiz("set", chars.map { it.char }, "kun", chars.associateBy { it.char }, emptyMap(), shuffler)
        val quiz = assertIs<QuizBuild.Ready>(built).quiz
        val bare = quiz.questions.first { it.char == "火" }
        assertEquals("(no common kun)", bare.answer)
        assertEquals(4, bare.options.size)
        assertTrue(bare.options.count { it == "—" } >= 1)
    }

    @Test
    fun onFallsBackToRomanization() {
        val chars = listOf(
            entry("日", "sun", on = "ニチ"),
            entry("月", "moon", roman = "ゲツ"),
            entry("火", "fire", on = "カ"),
            entry("水", "water", on = "スイ"),
        )
        val built = buildQuiz("set", chars.map { it.char }, "on", chars.associateBy { it.char }, emptyMap(), shuffler)
        val quiz = assertIs<QuizBuild.Ready>(built).quiz
        assertEquals("ゲツ", quiz.questions.first { it.char == "月" }.answer)
    }

    @Test
    fun wordQuizPrefersACompoundFromTheTopTwo() {
        val chars = (1..4).map { entry("字$it", "meaning $it") }
        val words = mapOf(
            "字1" to listOf(
                KanjiWord("字", "じ", "letter"),
                KanjiWord("漢字", "かんじ", "kanji"),
            ),
            "字2" to listOf(KanjiWord("二字", "にじ", "two")),
            "字3" to listOf(KanjiWord("三字", "さんじ", "three")),
            "字4" to listOf(KanjiWord("四字", "よじ", "four")),
        )
        val built = buildQuiz("set", chars.map { it.char }, "words", chars.associateBy { it.char }, words, shuffler)
        val quiz = assertIs<QuizBuild.Ready>(built).quiz
        val first = quiz.questions.first { it.char == "字1" }
        assertEquals("漢字", first.shown)
        assertEquals("かんじ", first.answer)
        assertEquals("漢字 【かんじ】 kanji", first.note)
        assertTrue(first.answer in first.options)
    }

    @Test
    fun smallSetsDoNotStartAQuiz() {
        val chars = listOf(entry("日", "sun"), entry("月", "moon"), entry("火", "fire"))
        val built = buildQuiz("set", chars.map { it.char }, "meaning", chars.associateBy { it.char }, emptyMap(), shuffler)
        assertIs<QuizBuild.TooFewKanji>(built)
        val lonely = (1..4).map { entry("字$it", "m$it") }
        val words = mapOf("字1" to listOf(KanjiWord("一字", "いちじ", "one")))
        val wordsQuiz = buildQuiz("set", lonely.map { it.char }, "words", lonely.associateBy { it.char }, words, shuffler)
        assertIs<QuizBuild.TooFewWords>(wordsQuiz)
    }

    @Test
    fun answeringScoresAndThenFinishes() {
        val question = QuizQuestion("日", prompt = "meaning", answer = "sun", options = listOf("sun", "moon"))
        val quiz = KanjiQuiz("set", "meaning", listOf("日"), listOf(question))
        val answered = quiz.choose("sun")
        assertEquals(1, answered.score)
        assertTrue(answered.answered)
        assertEquals(answered, answered.choose("moon"))
        val done = answered.advance()
        assertTrue(done.finished)
    }

    @Test
    fun dictionaryFiltersSortsAndCaps() {
        val entries = (1..130).map { entry("字$it", if (it == 3) "river" else "other $it", level = if (it < 5) "N5" else "N4", frequency = (200 - it).toString()) }
        val found = dictionaryEntries(entries, "river", "all")
        assertEquals(listOf("字3"), found.map { it.char })
        val n5 = dictionaryEntries(entries, "", "N5")
        assertEquals(listOf("字4", "字3", "字2", "字1"), n5.map { it.char })
        assertEquals(120, dictionaryEntries(entries, "", "all").size)
    }

    @Test
    fun onyomiKeepsTheLargestEighty() {
        val groups = (1..90).map { size ->
            KanjiGroup("読$size", chars = List(size) { KanjiGroupChar("x$it") })
        }
        val listed = onyomiList(groups)
        assertEquals(80, listed.size)
        assertEquals(90, listed.first().chars.size)
        assertEquals(11, listed.last().chars.size)
    }

    @Test
    fun queryFindsTheFirstKnownCharacter() {
        val known = setOf("語", "漢")
        assertEquals("漢", firstKnownCharacter("  look 漢字 up", known))
        assertNull(firstKnownCharacter("abc", known))
    }

    @Test
    fun lessonsGroupBySectionName() {
        val lessons = listOf(
            KanjiLesson("a", "A", "Beginning Kanji"),
            KanjiLesson("b", "B", "Radicals at work"),
            KanjiLesson("c", "C", "Beginning Kanji"),
        )
        val sections = lessonSections(lessons)
        assertEquals(listOf("Beginning Kanji", "Radicals at work"), sections.map { it.name })
        assertEquals(listOf("a", "c"), sections.first().lessons.map { it.id })
    }

    @Test
    fun parsersReadTheWebViewShapes() {
        val file = parseKanjiFile("""{"chars":[{"char":"人","info":"person","frequency":"15"}],"accent":"#1f4f8a"}""")
        assertEquals("人", file.chars[0].char)
        assertEquals("#1f4f8a", file.accent)
        val strokes = parseKanjiStrokes("""{"人":{"paths":["M1 2","M3 4"],"labels":[[46,20],[52,56]]}}""")
        assertEquals(2, strokes.getValue("人").paths.size)
        assertEquals(46f, strokes.getValue("人").labels[0][0])
        val (words, sentences) = parseKanjiWords("""{"words":{"人":[["人","ひと","person"]]},"sentences":{"人":["jp","en","221002"]}}""")
        assertEquals("ひと", words.getValue("人")[0].reading)
        assertEquals("221002", sentences.getValue("人").id)
        val lessons = parseKanjiLessons("""{"howToUse":{"id":"how_to_use","title":"How","body":["Read this."]},"beginning":[{"id":"n5","title":"Numbers","section":"Beginning Kanji","body":[],"chars":["人"]}]}""")
        assertEquals("人", lessons.beginning[0].chars[0])
    }

    @Test
    fun webViewSeenCountsImportOnce() {
        val legacy = WebViewStore.Value("""{"seen":{"日":2,"月":1}}""")
        val imported = importKanjiProgress(KanjiProgress(), legacy)
        assertEquals(2, imported.seen["日"])
        assertTrue(imported.importedWebView)
        val kept = importKanjiProgress(imported.mark("日"), WebViewStore.Value("""{"seen":{"日":9}}"""))
        assertEquals(3, kept.seen["日"])
        val unread = importKanjiProgress(KanjiProgress(), WebViewStore.Unreadable)
        assertEquals(false, unread.importedWebView)
    }
}
