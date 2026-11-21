package com.squirelworks.lsd.core.trainer

import kotlin.random.Random

data class PracticeStat(val correct: Int = 0, val wrong: Int = 0, val streak: Int = 0)

fun recordAnswer(stat: PracticeStat, ok: Boolean): PracticeStat =
    if (ok) stat.copy(correct = stat.correct + 1, streak = stat.streak + 1)
    else stat.copy(wrong = stat.wrong + 1, streak = 0)

fun mastered(stat: PracticeStat): Boolean = stat.streak >= 3

fun needsReview(stat: PracticeStat): Boolean = stat.wrong > 0 && !mastered(stat)

data class GlyphRef(val key: String, val glyph: String, val reading: String, val group: String)

fun <T> shuffle(items: List<T>, random: Random): List<T> {
    val out = items.toMutableList()
    for (i in out.lastIndex downTo 1) {
        val j = random.nextInt(i + 1)
        val swap = out[i]
        out[i] = out[j]
        out[j] = swap
    }
    return out
}

enum class QuestionKind { Read, Pick, Listen }

// Mixed questions rotate through the kinds the script can actually play.
fun questionKind(requested: String, canListen: Boolean, random: Random): QuestionKind {
    val available = buildList {
        add(QuestionKind.Read)
        add(QuestionKind.Pick)
        if (canListen) add(QuestionKind.Listen)
    }
    return when (requested) {
        "pick" -> QuestionKind.Pick
        "listen" -> if (canListen) QuestionKind.Listen else QuestionKind.Read
        "mix" -> available[random.nextInt(available.size)]
        else -> QuestionKind.Read
    }
}

fun <T> quizQueue(items: List<T>, count: Int, random: Random): List<T> {
    val shuffled = shuffle(items, random)
    return if (count <= 0) shuffled else shuffled.take(count)
}

// Up to four choices. Distractors prefer the same lesson group and never share
// the answer's reading or glyph, so the question has one right answer.
fun quizChoices(
    answer: GlyphRef,
    sameGroup: List<GlyphRef>,
    all: List<GlyphRef>,
    random: Random,
): List<GlyphRef> {
    val opts = mutableListOf(answer)
    for (candidate in shuffle(sameGroup, random) + shuffle(all, random)) {
        if (opts.size >= 4) break
        if (opts.any { it.reading == candidate.reading || it.glyph == candidate.glyph }) continue
        opts += candidate
    }
    return shuffle(opts, random)
}

data class FlashDeck<T>(val cards: List<T>, val done: Int, val total: Int, val shown: Boolean)

fun <T> flashAgain(cards: List<T>, random: Random): List<T> {
    if (cards.isEmpty()) return cards
    val card = cards.first()
    val rest = cards.drop(1).toMutableList()
    val at = minOf(rest.size, 3 + random.nextInt(3))
    rest.add(at, card)
    return rest
}

// Move between the letters of one item, then to the next or previous item.
fun stepWrite(
    index: Int,
    part: Int,
    partsHere: Int,
    partsOf: (Int) -> Int,
    itemCount: Int,
    delta: Int,
): Pair<Int, Int> {
    var nextPart = part + delta
    var nextIndex = index
    val span = maxOf(1, partsHere)
    if (nextPart < 0 || nextPart >= span) {
        nextIndex = (index + delta).coerceIn(0, itemCount - 1)
        val there = partsOf(nextIndex)
        nextPart = if (delta < 0) maxOf(0, there - 1) else 0
    }
    return nextIndex to nextPart
}
