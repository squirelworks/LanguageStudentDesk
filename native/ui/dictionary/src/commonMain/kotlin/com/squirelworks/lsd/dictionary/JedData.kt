package com.squirelworks.lsd.dictionary

import com.squirelworks.lsd.core.kana.Kana
import com.squirelworks.lsd.core.languages.TextStore
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

// The WebView keeps lists, history, the notepad and display settings under this key.
const val DICTIONARY_STORE_KEY = "squirrelgo-dictionary.v1"

const val WORD_LIST_MISSING =
    "The word list isn't installed in this copy. The Android app and the Desk downloads on the Releases page include it."

private val jedJson = Json { ignoreUnknownKeys = true; encodeDefaults = true }

@Serializable
data class JedMeta(
    val installed: Boolean = false,
    val words: Int = 0,
    val kanjiCount: Int = 0,
    val jmdictDate: String = "",
    val kanjidicDate: String = "",
    val version: String = "",
    val tags: Map<String, String> = emptyMap(),
)

@Serializable
data class JedKanji(
    val s: Int = 0,
    val on: List<String> = emptyList(),
    val kun: List<String> = emptyList(),
    val n: List<String> = emptyList(),
    val m: List<String> = emptyList(),
    val g: Int? = null,
    val j: Int? = null,
    val f: Int? = null,
    val r: Int? = null,
    val h: String? = null,
    val sk: String? = null,
    val p: String? = null,
)

@Serializable
data class JedRadical(val r: String, val s: Int = 0, val k: String = "")

@Serializable
data class JedSense(
    val g: List<String> = emptyList(),
    val p: List<String> = emptyList(),
    val m: List<String> = emptyList(),
    val f: List<String> = emptyList(),
    val d: List<String> = emptyList(),
    val i: List<String> = emptyList(),
    val r: List<String> = emptyList(),
    val a: List<String> = emptyList(),
    val sk: List<String> = emptyList(),
    val sr: List<String> = emptyList(),
    val l: List<String> = emptyList(),
)

@Serializable
data class JedEntryBody(
    val s: List<JedSense> = emptyList(),
    val kt: Map<String, List<String>> = emptyMap(),
    val rt: Map<String, List<String>> = emptyMap(),
    val ra: Map<String, List<String>> = emptyMap(),
    val c: List<String> = emptyList(),
    val x: List<List<String>> = emptyList(),
)

data class JedRow(
    val id: String,
    val kanji: List<String>,
    val kana: List<String>,
    val common: Boolean,
    val cls: List<String>,
    val senses: List<String>,
)

@Serializable
data class TagWord(val id: String, val head: String, val kana: String, val gloss: String)

@Serializable
data class CharChoices(
    val hira: Boolean = true,
    val kata: Boolean = true,
    val kanji: Boolean = true,
    val latin: Boolean = true,
) {
    fun allowsAll(): Boolean = hira && kata && kanji && latin
}

@Serializable
data class JedSaved(
    val lists: Map<String, List<TagWord>> = mapOf("Favorites" to emptyList()),
    val history: List<TagWord> = emptyList(),
    val notepad: String = "",
    val textScale: Double = 1.0,
    val romaji: Boolean = false,
    val field: String = "both",
    val commonOnly: Boolean = false,
    val chars: CharChoices = CharChoices(),
    val importedWebView: Boolean = false,
)

class JedIndex(
    val meta: JedMeta,
    val rows: List<JedRow>,
    val entries: List<JedEntryBody>,
    val kanji: Map<String, JedKanji>,
    val radicals: List<JedRadical>,
) {
    val forms: List<String> = rows.map { row ->
        Kana.kataToHira(row.kanji.joinToString(";") + ";" + row.kana.joinToString(";"))
    }
    val glossLower: List<String> = rows.map { it.senses.joinToString("|").lowercase() }
    val byId: Map<String, Int> = rows.mapIndexed { index, row -> row.id to index }.toMap()

    val exact: Map<String, List<Int>> by lazy {
        val map = HashMap<String, MutableList<Int>>()
        forms.forEachIndexed { pos, packed ->
            for (form in packed.split(';')) {
                if (form.isEmpty()) continue
                map.getOrPut(form) { mutableListOf() }.add(pos)
            }
        }
        map
    }

    fun body(pos: Int): JedEntryBody = entries.getOrNull(pos) ?: JedEntryBody()
}

fun parseIndexLine(line: String): JedRow? {
    if (line.isEmpty()) return null
    val fields = line.split('\t')
    if (fields.size < 6) return null
    return JedRow(
        id = fields[0],
        kanji = if (fields[1].isEmpty()) emptyList() else fields[1].split(';'),
        kana = if (fields[2].isEmpty()) emptyList() else fields[2].split(';'),
        common = fields[3] == "1",
        cls = if (fields[4].isEmpty()) emptyList() else fields[4].split(','),
        senses = fields[5].split('|'),
    )
}

fun loadJedIndex(
    metaText: String,
    indexText: String,
    entriesText: String,
    kanjiText: String,
    radicalsText: String,
): JedIndex {
    val meta = jedJson.decodeFromString<JedMeta>(metaText)
    val lines = jedJson.decodeFromString<List<String>>(indexText)
    val rows = lines.mapNotNull(::parseIndexLine)
    val entries = jedJson.decodeFromString<List<JedEntryBody>>(entriesText)
    val kanji = jedJson.decodeFromString<Map<String, JedKanji>>(kanjiText)
    val radicals = jedJson.decodeFromString<List<JedRadical>>(radicalsText)
    return JedIndex(meta, rows, entries, kanji, radicals)
}

fun headOf(row: JedRow): String = row.kanji.firstOrNull() ?: row.kana.firstOrNull().orEmpty()

fun tagName(meta: JedMeta, code: String): String = meta.tags[code] ?: code

fun snapshot(row: JedRow, body: JedEntryBody): TagWord {
    val gloss = if (body.s.isNotEmpty()) {
        body.s.take(3).joinToString(" / ") { it.g.joinToString("; ") }
    } else {
        row.senses.take(3).joinToString(" / ")
    }
    return TagWord(row.id, headOf(row), row.kana.firstOrNull().orEmpty(), gloss)
}

fun readDictionaryState(store: TextStore): JedSaved {
    val text = store.read()
    if (text.isBlank()) return JedSaved()
    return runCatching { jedJson.decodeFromString<JedSaved>(text) }.getOrNull() ?: JedSaved()
}

fun writeDictionaryState(store: TextStore, saved: JedSaved) {
    store.write(jedJson.encodeToString(saved))
}

// Copy the WebView store once. A later native file, or a second launch, is left alone.
// A store that is present but cannot be read stays unmarked, so a later build can retry.
sealed interface DictionaryLegacy {
    data object Absent : DictionaryLegacy
    data object Unreadable : DictionaryLegacy
    data class Value(val text: String) : DictionaryLegacy
}

fun importDictionaryState(native: JedSaved, legacy: DictionaryLegacy): JedSaved {
    if (native.importedWebView) return native
    return when (legacy) {
        DictionaryLegacy.Unreadable -> native
        DictionaryLegacy.Absent -> native.copy(importedWebView = true)
        is DictionaryLegacy.Value -> {
            val parsed = parseWebViewDictionary(legacy.text)
            if (parsed == null) native
            else if (native.hasOwnDictionary()) native.copy(importedWebView = true)
            else parsed.copy(importedWebView = true)
        }
    }
}

fun adoptDictionaryState(store: TextStore, legacy: DictionaryLegacy) {
    val current = readDictionaryState(store)
    val next = importDictionaryState(current, legacy)
    if (next != current) writeDictionaryState(store, next)
}

private fun JedSaved.hasOwnDictionary(): Boolean {
    if (history.isNotEmpty() || notepad.isNotEmpty()) return true
    val fresh = JedSaved()
    if (textScale != fresh.textScale || romaji != fresh.romaji || field != fresh.field || commonOnly != fresh.commonOnly) return true
    if (chars != fresh.chars) return true
    val extra = lists.filterNot { it.key == "Favorites" && it.value.isEmpty() }
    return extra.isNotEmpty()
}

fun parseWebViewDictionary(text: String): JedSaved? {
    val root = runCatching { jedJson.parseToJsonElement(text).jsonObject }.getOrNull() ?: return null
    val lists = LinkedHashMap<String, List<TagWord>>()
    val rawLists = root["lists"]?.let { runCatching { it.jsonObject }.getOrNull() }
    if (rawLists != null) {
        for ((name, value) in rawLists) {
            lists[name] = runCatching { value.jsonArray.map { wordOf(it.jsonObject) } }.getOrElse { emptyList() }
        }
    }
    val history = root["history"]?.let { element ->
        runCatching { element.jsonArray.map { wordOf(it.jsonObject) } }.getOrNull()
    }.orEmpty()
    val options = root["options"]?.let { runCatching { it.jsonObject }.getOrNull() }
    val chars = options?.get("chars")?.let { runCatching { it.jsonObject }.getOrNull() }
    val scale = root.doubleOf("textScale") ?: 1.0
    return JedSaved(
        lists = if (lists.isEmpty() && rawLists == null) JedSaved().lists else lists,
        history = history.take(200),
        notepad = root.stringOf("notepad").orEmpty(),
        textScale = if (scale > 0) scale else 1.0,
        romaji = root.boolOf("romaji") == true,
        field = options?.stringOf("field")?.takeIf { it == "both" || it == "read" || it == "mean" } ?: "both",
        commonOnly = options?.boolOf("common") == true,
        chars = CharChoices(
            hira = chars?.boolOf("hira") ?: true,
            kata = chars?.boolOf("kata") ?: true,
            kanji = chars?.boolOf("kanji") ?: true,
            latin = chars?.boolOf("latin") ?: true,
        ),
    )
}

private fun wordOf(obj: JsonObject) = TagWord(
    id = obj.stringOf("id").orEmpty(),
    head = obj.stringOf("head").orEmpty(),
    kana = obj.stringOf("kana").orEmpty(),
    gloss = obj.stringOf("gloss").orEmpty(),
)

private fun JsonObject.stringOf(key: String): String? =
    this[key]?.let { runCatching { it.jsonPrimitive.contentOrNull }.getOrNull() }

private fun JsonObject.boolOf(key: String): Boolean? =
    this[key]?.let { runCatching { it.jsonPrimitive.booleanOrNull ?: it.jsonPrimitive.contentOrNull?.toBooleanStrictOrNull() }.getOrNull() }

private fun JsonObject.doubleOf(key: String): Double? =
    this[key]?.let { runCatching { it.jsonPrimitive.content.toDoubleOrNull() }.getOrNull() }

fun exportTagCsv(lists: Map<String, List<TagWord>>, names: List<String>): Pair<String, String>? {
    if (names.isEmpty()) return null
    val seen = HashSet<String>()
    val rows = ArrayList<String>()
    for (name in names) {
        for (word in lists[name].orEmpty()) {
            if (!seen.add(word.id)) continue
            rows += listOf(word.head, word.kana, word.gloss, name).joinToString(",") { csvCell(it) }
        }
    }
    val file = (if (names.size == 1) names[0] else "jed-tags").replace(Regex("[^\\w-]+"), "_") + ".csv"
    return file to (rows.joinToString("\n") + "\n")
}

private fun csvCell(value: String): String = "\"" + value.replace("\"", "\"\"") + "\""

fun categoryCounts(index: JedIndex): Map<String, Int> {
    val counts = HashMap<String, Int>()
    val map = mapOf("V" to "verb", "N" to "noun", "A" to "adj", "D" to "adv", "C" to "ctr", "O" to "ono")
    for (row in index.rows) {
        for (cls in row.cls) {
            val name = map[cls] ?: continue
            counts[name] = (counts[name] ?: 0) + 1
        }
        if (row.cls.contains("V") && row.cls.none { it.startsWith("vs") }) {
            counts["nonsuru"] = (counts["nonsuru"] ?: 0) + 1
        }
    }
    return counts
}

fun groupedCount(n: Int): String = n.toString().reversed().chunked(3).joinToString(",").reversed()

val WORD_CATEGORIES = linkedMapOf(
    "verb" to "Verbs",
    "nonsuru" to "Non suru verbs",
    "noun" to "Nouns",
    "adj" to "Adjectives",
    "adv" to "Adverbs",
    "ctr" to "Counters",
    "ono" to "Onomatopeia",
)

fun gradeLabel(grade: Int): String = when {
    grade <= 6 -> "Kyōiku $grade"
    grade == 8 -> "Jōyō"
    else -> "Jinmeiyō"
}
