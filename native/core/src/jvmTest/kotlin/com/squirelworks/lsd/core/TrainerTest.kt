package com.squirelworks.lsd.core

import com.squirelworks.lsd.core.trainer.GlyphRef
import com.squirelworks.lsd.core.trainer.PracticeStat
import com.squirelworks.lsd.core.trainer.flashAgain
import com.squirelworks.lsd.core.trainer.mastered
import com.squirelworks.lsd.core.trainer.needsReview
import com.squirelworks.lsd.core.trainer.QuestionKind
import com.squirelworks.lsd.core.trainer.questionKind
import com.squirelworks.lsd.core.trainer.quizChoices
import com.squirelworks.lsd.core.trainer.quizQueue
import com.squirelworks.lsd.core.trainer.recordAnswer
import com.squirelworks.lsd.core.trainer.stepWrite
import kotlin.random.Random
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class TrainerTest {
    private val a = GlyphRef("h|あ", "あ", "a", "Basic")
    private val i = GlyphRef("h|い", "い", "i", "Basic")
    private val ka = GlyphRef("h|か", "か", "ka", "Basic")
    private val sa = GlyphRef("h|さ", "さ", "sa", "Other")

    @Test
    fun threeCorrectAnswersInARowMasterTheCharacter() {
        var stat = PracticeStat()
        stat = recordAnswer(stat, true)
        stat = recordAnswer(stat, true)
        assertFalse(mastered(stat))
        stat = recordAnswer(stat, true)
        assertTrue(mastered(stat))
        stat = recordAnswer(stat, false)
        assertEquals(0, stat.streak)
        assertTrue(needsReview(stat))
    }

    @Test
    fun quizChoicesDoNotShareTheAnswerSoundOrGlyph() {
        val choices = quizChoices(a, listOf(a, i, ka), listOf(a, i, ka, sa), Random(1))
        assertTrue(a in choices)
        assertTrue(choices.size <= 4)
        assertEquals(1, choices.count { it.reading == "a" || it.glyph == "あ" })
    }

    @Test
    fun mixedQuestionsSkipListeningWhenThereIsNoAudio() {
        val kinds = List(20) { questionKind("mix", false, Random(it)) }.toSet()
        assertFalse(QuestionKind.Listen in kinds)
        assertEquals(QuestionKind.Listen, questionKind("listen", true, Random(1)))
        assertEquals(QuestionKind.Read, questionKind("listen", false, Random(1)))
    }

    @Test
    fun aZeroCountKeepsTheWholeShuffledPool() {
        val items = listOf(a, i, ka)
        assertEquals(3, quizQueue(items, 0, Random(2)).size)
        assertEquals(2, quizQueue(items, 2, Random(2)).size)
    }

    @Test
    fun anAgainCardGoesBackAFewPlaces() {
        val deck = flashAgain(listOf("a", "b", "c", "d", "e", "f"), Random(0))
        assertEquals(6, deck.size)
        assertTrue(deck.contains("a"))
        assertFalse(deck.first() == "a" && deck.size > 1)
    }

    @Test
    fun writingMovesAcrossPartsThenItems() {
        val parts = mapOf(0 to 2, 1 to 1)
        assertEquals(0 to 1, stepWrite(0, 0, 2, { parts.getValue(it) }, 2, 1))
        assertEquals(1 to 0, stepWrite(0, 1, 2, { parts.getValue(it) }, 2, 1))
        assertEquals(0 to 1, stepWrite(1, 0, 1, { parts.getValue(it) }, 2, -1))
    }
}
