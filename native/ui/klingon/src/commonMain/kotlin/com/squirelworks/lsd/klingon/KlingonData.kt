package com.squirelworks.lsd.klingon

import com.squirelworks.lsd.kana.SuiteFile
import com.squirelworks.lsd.kana.parseSuite
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonPrimitive

private val json = Json { ignoreUnknownKeys = true }

@Serializable
data class KlingonFile(
    val ipa: Map<String, String> = emptyMap(),
    val lessons: List<KlingonLesson> = emptyList(),
    val words: List<List<String>> = emptyList(),
    val articles: List<KlingonArticle> = emptyList(),
    val accent: String = "",
    val app: KlingonAbout = KlingonAbout(),
)

@Serializable
data class KlingonAbout(
    val name: String = "SquirrelGo Klingon",
    val tagline: String = "",
    val store: String = "squirrelgo-klingon",
    val about: String = "",
)

@Serializable
data class KlingonLesson(
    val title: String = "",
    val note: String = "",
    val numerals: Boolean = false,
    val chars: List<JsonArray> = emptyList(),
)

@Serializable
data class KlingonArticle(val title: String = "", val body: String = "")

data class KlingonLetter(
    val key: String,
    val codePoint: Int,
    val hint: String,
    val like: String,
    val example: String,
    val meaning: String,
    val numeral: Boolean,
    val lesson: Int,
) {
    val glyph: String get() = codePoint.toChar().toString()
    val clip: String get() = if (numeral) wordFile(example) else letterFile(codePoint)
    val label: String get() = if (numeral) "$key · $hint" else key
}

data class KlingonWord(val written: String, val meaning: String)

data class KlingonBundle(
    val ipa: Map<String, String>,
    val lessons: List<KlingonLesson>,
    val letters: List<KlingonLetter>,
    val byKey: Map<String, KlingonLetter>,
    val words: List<KlingonWord>,
    val articles: List<KlingonArticle>,
    val strokes: Map<String, List<String>>,
    val accent: String,
    val about: KlingonAbout,
    val suite: SuiteFile?,
)

fun parseKlingonFile(text: String): KlingonFile = json.decodeFromString(text)

fun parseKlingonStrokes(text: String): Map<String, List<String>> = json.decodeFromString(text)

fun loadKlingonBundle(course: String, strokes: String, suite: String?): KlingonBundle {
    val file = parseKlingonFile(course)
    val letters = file.lessons.flatMapIndexed { index, lesson ->
        lesson.chars.mapNotNull { row ->
            if (row.size < 6) return@mapNotNull null
            KlingonLetter(
                row[0].jsonPrimitive.content,
                row[1].jsonPrimitive.int,
                row[2].jsonPrimitive.content,
                row[3].jsonPrimitive.content,
                row[4].jsonPrimitive.content,
                row[5].jsonPrimitive.content,
                lesson.numerals,
                index,
            )
        }
    }
    return KlingonBundle(
        ipa = file.ipa,
        lessons = file.lessons,
        letters = letters,
        byKey = letters.associateBy { it.key },
        words = file.words.mapNotNull { row -> if (row.size < 2) null else KlingonWord(row[0], row[1]) },
        articles = file.articles,
        strokes = parseKlingonStrokes(strokes),
        accent = file.accent,
        about = file.app,
        suite = suite?.let { parseSuite(it) },
    )
}

fun lettersIn(bundle: KlingonBundle, lessonIds: Set<Int>): List<KlingonLetter> =
    bundle.letters.filter { it.lesson in lessonIds }
