package com.squirelworks.lsd.kana

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class KanaArticle(val title: String, val body: String)

@Serializable
data class KanaScript(
    val id: String,
    val title: String,
    val native: String = "",
    val lang: String = "",
    val langName: String = "",
    val dir: String = "ltr",
    val chartFlow: Boolean = false,
    val blurb: String = "",
    val tagline: String = "",
    val accent: String = "",
    val writeTip: String = "",
    val lessons: List<KanaLesson> = emptyList(),
    val articles: List<KanaArticle> = emptyList(),
)

@Serializable
data class KanaLesson(
    val title: String = "",
    val note: String = "",
    val group: String = "",
    val cols: Int = 5,
    val chars: List<KanaCell?> = emptyList(),
)

@Serializable
data class KanaCell(
    val g: String,
    val r: String = "",
    val hint: String = "",
    val ex: String = "",
    val exR: String = "",
    val exM: String = "",
    val speak: String = "",
    val ipa: String = "",
    val exLang: String = "",
)

data class ChartGroup(val name: String, val cols: Int, val cells: List<KanaCell?>)

private val json = Json { ignoreUnknownKeys = true }

fun parseKanaScripts(text: String): List<KanaScript> = json.decodeFromString(text)

// A page accent from the WebView stylesheet, such as #005a8c.
fun accentArgb(hex: String): Long? {
    val raw = hex.trim().removePrefix("#")
    if (raw.isEmpty() || raw.any { it !in '0'..'9' && it !in 'a'..'f' && it !in 'A'..'F' }) return null
    val value = raw.toLongOrNull(16) ?: return null
    return when (raw.length) {
        6 -> 0xFF000000L or value
        8 -> value
        else -> null
    }
}

fun missingVoiceNotice(langName: String): String {
    val name = langName.trim()
    return if (name.isEmpty()) {
        "No text-to-speech voice found. Install one in your system settings."
    } else {
        "No $name voice found. Install a $name text-to-speech voice in your system settings."
    }
}

// A line with its own language, such as an example word, uses that voice.
// An empty language means the script's voice, and names it in the notice.
fun missingVoiceNotice(langName: String, lineLanguage: String): String =
    if (lineLanguage.isNotBlank()) {
        "No text-to-speech voice is installed for this word's language."
    } else {
        missingVoiceNotice(langName)
    }

fun parseKanaStrokes(text: String): Map<String, Map<String, List<String>>> = json.decodeFromString(text)

fun parseKanaAudio(text: String): Map<String, Map<String, String>> = json.decodeFromString(text)

@Serializable
data class KanaCopy(val name: String = "", val tagline: String = "", val intro: String = "", val about: String = "")

fun parseKanaCopy(text: String): KanaCopy = json.decodeFromString(text)

// A chart that flows keeps lessons in one run. Otherwise a short lesson is
// padded so the next one starts on a new row. The column count is the one
// the group started with.
fun chartGroups(script: KanaScript): List<ChartGroup> {
    val groups = linkedMapOf<String, MutableList<KanaLesson>>()
    for (lesson in script.lessons) {
        groups.getOrPut(lesson.group.ifBlank { "Characters" }) { mutableListOf() } += lesson
    }
    return groups.map { (name, lessons) ->
        val cols = lessons.first().cols.coerceAtLeast(1)
        val cells = lessons.flatMap { lesson ->
            val pad = if (script.chartFlow) 0 else (cols - lesson.chars.size % cols) % cols
            lesson.chars + List(pad) { null }
        }
        ChartGroup(name, cols, cells)
    }
}
