package com.squirelworks.lsd.kanji

import com.squirelworks.lsd.kana.SuiteFile
import com.squirelworks.lsd.kana.parseSuite
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

private val json = Json { ignoreUnknownKeys = true }

@Serializable
data class KanjiChar(
    val char: String,
    val roman: String = "",
    val info: String = "",
    val level: String = "",
    val on: String = "",
    val kun: String = "",
    val radical: String = "",
    val strokes: String = "",
    val grade: String = "",
    val frequency: String = "",
)

@Serializable
data class KanjiGroupChar(val char: String = "", val roman: String = "")

@Serializable
data class KanjiGroup(
    val reading: String = "",
    val note: String = "",
    val chars: List<KanjiGroupChar> = emptyList(),
)

@Serializable
data class KanjiFile(
    val chars: List<KanjiChar> = emptyList(),
    val groups: List<KanjiGroup> = emptyList(),
    val accent: String = "",
)

@Serializable
data class KanjiCatalog(
    val first10: List<String> = emptyList(),
    val topics: Map<String, List<String>> = emptyMap(),
    val levels: Map<String, List<String>> = emptyMap(),
    val beginning: Map<String, List<String>> = emptyMap(),
)

@Serializable
data class KanjiLesson(
    val id: String = "",
    val title: String = "",
    val section: String = "",
    val body: List<String> = emptyList(),
    val chars: List<String> = emptyList(),
)

@Serializable
data class KanjiLessons(
    val howToUse: KanjiLesson = KanjiLesson(),
    val beginning: List<KanjiLesson> = emptyList(),
)

@Serializable
data class StrokeFigure(
    val paths: List<String> = emptyList(),
    val labels: List<List<Float>> = emptyList(),
)

@Serializable
data class KanjiWordsFile(
    val words: Map<String, List<List<String>>> = emptyMap(),
    val sentences: Map<String, List<String>> = emptyMap(),
)

data class KanjiWord(val written: String, val reading: String, val meaning: String)

data class KanjiSentence(val japanese: String, val english: String, val id: String)

data class KanjiBundle(
    val chars: List<KanjiChar>,
    val byChar: Map<String, KanjiChar>,
    val groups: List<KanjiGroup>,
    val catalog: KanjiCatalog,
    val lessons: KanjiLessons,
    val words: Map<String, List<KanjiWord>>,
    val sentences: Map<String, KanjiSentence>,
    val strokes: Map<String, StrokeFigure>,
    val accent: String,
    val suite: SuiteFile?,
)

data class LessonSection(val name: String, val lessons: List<KanjiLesson>)

fun parseKanjiFile(text: String): KanjiFile = json.decodeFromString(text)

fun parseKanjiCatalog(text: String): KanjiCatalog = json.decodeFromString(text)

fun parseKanjiLessons(text: String): KanjiLessons = json.decodeFromString(text)

fun parseKanjiStrokes(text: String): Map<String, StrokeFigure> = json.decodeFromString(text)

fun parseKanjiWords(text: String): Pair<Map<String, List<KanjiWord>>, Map<String, KanjiSentence>> {
    val file = json.decodeFromString<KanjiWordsFile>(text)
    val words = file.words.mapValues { (_, rows) ->
        rows.mapNotNull { row ->
            if (row.size < 3) null else KanjiWord(row[0], row[1], row[2])
        }
    }
    val sentences = file.sentences.mapNotNull { (char, row) ->
        if (row.size < 3) null else char to KanjiSentence(row[0], row[1], row[2])
    }.toMap()
    return words to sentences
}

fun loadKanjiBundle(
    kanji: String,
    catalog: String,
    lessons: String,
    words: String,
    strokes: String,
    suite: String?,
): KanjiBundle {
    val file = parseKanjiFile(kanji)
    val listed = parseKanjiWords(words)
    return KanjiBundle(
        chars = file.chars,
        byChar = file.chars.associateBy { it.char },
        groups = file.groups,
        catalog = parseKanjiCatalog(catalog),
        lessons = parseKanjiLessons(lessons),
        words = listed.first,
        sentences = listed.second,
        strokes = parseKanjiStrokes(strokes),
        accent = file.accent,
        suite = suite?.let { parseSuite(it) },
    )
}

fun lessonSections(lessons: List<KanjiLesson>): List<LessonSection> {
    val sections = mutableListOf<LessonSection>()
    for (lesson in lessons) {
        val name = lesson.section.ifBlank { "Beginning Kanji" }
        val index = sections.indexOfFirst { it.name == name }
        if (index < 0) sections += LessonSection(name, listOf(lesson))
        else sections[index] = sections[index].copy(lessons = sections[index].lessons + lesson)
    }
    return sections
}

val themeLabels = mapOf(
    "numbers" to "JLPT 5 · Numbers",
    "location" to "JLPT 5 · Location / Direction",
    "people" to "JLPT 5 · People",
    "time" to "JLPT 5 · Time",
    "adjectives" to "JLPT 5 · Adjectives",
    "verbs" to "JLPT 5 · Verbs",
    "nature" to "JLPT 5 · Nature",
    "school" to "JLPT 5 · School and language",
    "money" to "JLPT 5 · Money and counting",
)

val sectionIntros = mapOf(
    "Radicals at work" to "The building blocks that recur inside thousands of kanji, each with the characters that use it.",
    "Reading skills" to "Okurigana, compounds, sound changes, special readings, counters and dates.",
    "Look-alike kanji" to "Characters that are easy to confuse, side by side.",
    "JLPT N4 path" to "All 170 N4 kanji in ten lessons, most frequent first.",
)

fun levelLabel(level: String): String = when (level) {
    "N5" -> "JLPT level 5 (easiest)"
    "N1" -> "JLPT level 1 (hardest)"
    else -> "JLPT level ${level.removePrefix("N")}"
}

fun frequencyRank(value: String): Int = value.toIntOrNull() ?: Int.MAX_VALUE

fun firstKnownCharacter(query: String, known: Set<String>): String? {
    val text = query.trim()
    var i = 0
    while (i < text.length) {
        val c = text[i]
        val pair = c.isHighSurrogate() && i + 1 < text.length && text[i + 1].isLowSurrogate()
        val token = if (pair) text.substring(i, i + 2) else c.toString()
        if (token in known) return token
        i += if (pair) 2 else 1
    }
    return null
}
