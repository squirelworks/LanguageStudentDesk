package com.squirelworks.lsd.kana

import com.squirelworks.lsd.core.languages.compareDisplayNames
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class KanaScript(
    val id: String,
    val title: String,
    val native: String = "",
    val dir: String = "ltr",
    val chartFlow: Boolean = false,
    val lessons: List<KanaLesson> = emptyList(),
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
)

data class ChartGroup(val name: String, val cols: Int, val cells: List<KanaCell?>)

private val json = Json { ignoreUnknownKeys = true }

fun parseKanaScripts(text: String): List<KanaScript> = json.decodeFromString(text)

fun parseKanaStrokes(text: String): Map<String, Map<String, List<String>>> = json.decodeFromString(text)

// Home lists are A–Z by the title the screen shows. Nothing is moved to the top.
fun scriptsInDisplayOrder(scripts: List<KanaScript>): List<KanaScript> =
    scripts.sortedWith { a, b ->
        val byTitle = compareDisplayNames(a.title, b.title)
        if (byTitle != 0) byTitle else compareDisplayNames(a.id, b.id)
    }

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

// "A a" is two letters, each with its own strokes. A single kana is one part.
fun strokeParts(glyph: String, table: Map<String, List<String>>): List<List<String>> =
    glyph.split(" ").filter { it.isNotBlank() }.mapNotNull { ch ->
        table[ch]?.takeIf { it.isNotEmpty() }
    }
