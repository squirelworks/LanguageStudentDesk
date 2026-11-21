package com.squirelworks.lsd.kanji

import kotlin.random.Random

class Shuffler(private val random: Random = Random.Default) {
    fun <T> shuffle(items: List<T>): List<T> {
        val copy = items.toMutableList()
        for (i in copy.lastIndex downTo 1) {
            val j = random.nextInt(i + 1)
            val swap = copy[i]
            copy[i] = copy[j]
            copy[j] = swap
        }
        return copy
    }
}

data class QuizQuestion(
    val char: String,
    val shown: String = "",
    val prompt: String,
    val answer: String,
    val options: List<String>,
    val note: String = "",
)

data class KanjiQuiz(
    val title: String,
    val mode: String,
    val chars: List<String>,
    val questions: List<QuizQuestion>,
    val index: Int = 0,
    val score: Int = 0,
    val answered: Boolean = false,
    val lastChoice: String? = null,
    val finished: Boolean = false,
)

sealed interface QuizBuild {
    data class Ready(val quiz: KanjiQuiz) : QuizBuild
    data object TooFewKanji : QuizBuild
    data object TooFewWords : QuizBuild
}

fun uniqueText(list: List<String>): List<String> = list.filter { it.isNotBlank() }.distinct()

fun onyomiBySize(groups: List<KanjiGroup>): List<KanjiGroup> =
    groups.sortedByDescending { it.chars.size }

fun onyomiList(groups: List<KanjiGroup>): List<KanjiGroup> = onyomiBySize(groups).take(80)

fun dictionaryEntries(entries: List<KanjiChar>, query: String, level: String): List<KanjiChar> {
    val q = query.trim().lowercase()
    return entries
        .asSequence()
        .filter { level == "all" || it.level == level }
        .filter { entry ->
            q.isEmpty() ||
                entry.char.contains(q) ||
                entry.info.lowercase().contains(q) ||
                entry.on.lowercase().contains(q) ||
                entry.kun.lowercase().contains(q) ||
                entry.roman.lowercase().contains(q)
        }
        .sortedBy { frequencyRank(it.frequency) }
        .take(120)
        .toList()
}

fun KanjiQuiz.choose(choice: String): KanjiQuiz {
    if (answered || finished || questions.isEmpty()) return this
    val question = questions[index]
    return copy(
        answered = true,
        lastChoice = choice,
        score = score + if (choice == question.answer) 1 else 0,
    )
}

fun KanjiQuiz.advance(): KanjiQuiz {
    if (finished || questions.isEmpty()) return this
    if (index >= questions.lastIndex) return copy(finished = true)
    return copy(index = index + 1, answered = false, lastChoice = null)
}

fun buildQuiz(
    title: String,
    chars: List<String>,
    mode: String,
    byChar: Map<String, KanjiChar>,
    words: Map<String, List<KanjiWord>>,
    shuffler: Shuffler = Shuffler(),
): QuizBuild {
    val pool = uniqueText(chars).mapNotNull { byChar[it] }
    if (pool.size < 4) return QuizBuild.TooFewKanji
    val questions = if (mode == "words") {
        val built = wordQuestions(pool, words, shuffler)
        if (built.size < 4) return QuizBuild.TooFewWords
        built
    } else {
        shuffler.shuffle(pool).take(minOf(10, pool.size)).map { item ->
            readingQuestion(mode, item, pool, shuffler)
        }
    }
    return QuizBuild.Ready(KanjiQuiz(title, mode, pool.map { it.char }, questions))
}

fun wordQuestions(
    pool: List<KanjiChar>,
    words: Map<String, List<KanjiWord>>,
    shuffler: Shuffler,
): List<QuizQuestion> {
    val chosen = mutableListOf<Pair<KanjiChar, KanjiWord>>()
    val seen = mutableSetOf<String>()
    for (item in pool) {
        val top = words[item.char].orEmpty().filter { it.written !in seen }.take(2)
        val word = top.firstOrNull { it.written.length > 1 } ?: top.firstOrNull() ?: continue
        if (word.written in seen) continue
        seen += word.written
        chosen += item to word
    }
    val readings = uniqueText(pool.flatMap { item -> words[item.char].orEmpty().map { it.reading } })
    return shuffler.shuffle(chosen).take(10).map { (item, word) ->
        val distractors = shuffler.shuffle(readings.filter { it != word.reading }).take(3)
        QuizQuestion(
            char = item.char,
            shown = word.written,
            prompt = "Choose the reading of this word:",
            answer = word.reading,
            options = shuffler.shuffle(listOf(word.reading) + distractors),
            note = "${word.written} 【${word.reading}】 ${word.meaning}",
        )
    }
}

private fun readingQuestion(
    mode: String,
    item: KanjiChar,
    pool: List<KanjiChar>,
    shuffler: Shuffler,
): QuizQuestion {
    val others = pool.filter { it.char != item.char }
    return when (mode) {
        "kun" -> {
            val answer = item.kun.ifBlank { "(no common kun)" }
            val distractors = shuffler.shuffle(others.map { it.kun }.filter { it.isNotBlank() }).take(3).toMutableList()
            while (distractors.size < 3) distractors += "—"
            QuizQuestion(
                char = item.char,
                prompt = "Choose the kun-yomi for this Kanji:",
                answer = answer,
                options = shuffler.shuffle(listOf(answer) + distractors.take(3)),
            )
        }
        "on" -> {
            val answer = item.on.ifBlank { item.roman }.ifBlank { "(no common on)" }
            val distractors = shuffler.shuffle(
                others.map { it.on.ifBlank { it.roman } }.filter { it.isNotBlank() },
            ).take(3).toMutableList()
            while (distractors.size < 3) distractors += "—"
            QuizQuestion(
                char = item.char,
                prompt = "Choose on-yomi / reading for this Kanji:",
                answer = answer,
                options = shuffler.shuffle(listOf(answer) + distractors.take(3)),
            )
        }
        else -> {
            val distractors = shuffler.shuffle(others.map { it.info }).take(3)
            QuizQuestion(
                char = item.char,
                prompt = "Choose the meaning of this Kanji:",
                answer = item.info,
                options = shuffler.shuffle(listOf(item.info) + distractors),
            )
        }
    }
}
