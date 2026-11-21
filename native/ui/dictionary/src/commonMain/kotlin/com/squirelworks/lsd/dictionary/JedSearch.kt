package com.squirelworks.lsd.dictionary

import com.squirelworks.lsd.core.deinflect.Deinflect
import com.squirelworks.lsd.core.kana.Kana

const val SEARCH_LIMIT = 1000
const val SEARCH_PAGE = 50

data class SearchHit(val pos: Int, val score: Int, val note: String?)

data class SearchOutcome(val results: List<SearchHit>, val kana: String?, val total: Int)

data class SearchFilter(
    val field: String = "both",
    val common: Boolean = false,
    val type: String? = null,
    val chars: CharChoices? = null,
    val only: Set<Int>? = null,
)

private val CHAR_TESTS = listOf(
    "hira" to Regex("[\\u3041-\\u309f]"),
    "kata" to Regex("[\\u30a1-\\u30ff]"),
    "kanji" to Regex("[\\u3400-\\u9fff\\uf900-\\ufaff々]"),
    "latin" to Regex("[A-Za-zＡ-Ｚａ-ｚ0-9０-９]"),
)

private val TYPE_LETTER = mapOf(
    "verb" to "V",
    "noun" to "N",
    "adj" to "A",
    "adv" to "D",
    "exp" to "E",
    "ctr" to "C",
    "ono" to "O",
)

fun searchFilter(saved: JedSaved, scope: DictScope, index: JedIndex): SearchFilter {
    val chars = if (saved.chars.allowsAll()) null else saved.chars
    var only: Set<Int>? = null
    var type: String? = null
    when (scope) {
        DictScope.All -> Unit
        is DictScope.Category -> type = scope.type
        DictScope.History -> only = saved.history.mapNotNull { index.byId[it.id] }.toSet()
        is DictScope.Tags -> {
            val names = scope.names ?: saved.lists.keys.toList()
            only = names.flatMap { saved.lists[it].orEmpty() }.mapNotNull { index.byId[it.id] }.toSet()
        }
    }
    return SearchFilter(saved.field, saved.commonOnly, type, chars, only)
}

sealed interface DictScope {
    data object All : DictScope
    data class Category(val type: String) : DictScope
    data object History : DictScope
    data class Tags(val names: List<String>?) : DictScope
}

fun scopeHint(scope: DictScope): String = when (scope) {
    DictScope.All -> "Search all"
    DictScope.History -> "Search history"
    is DictScope.Tags -> "Search tags" + if (scope.names != null) ": " + scope.names.joinToString(", ") else ""
    is DictScope.Category -> "Search " + (WORD_CATEGORIES[scope.type] ?: scope.type).lowercase()
}

fun jedSearch(index: JedIndex, raw: String, filters: SearchFilter = SearchFilter()): SearchOutcome {
    val query = raw.trim().replace(Regex("\\s+"), " ")
    val field = filters.field.ifBlank { "both" }
    if (query.isEmpty()) {
        if (filters.only == null && filters.type == null) return SearchOutcome(emptyList(), null, 0)
        val source = filters.only ?: index.forms.indices
        val matched = source.filter { keep(index, it, filters) }.map { SearchHit(it, 0, null) }.sortedBy { it.pos }
        return SearchOutcome(matched.take(SEARCH_LIMIT), null, matched.size)
    }
    val hits = HashMap<Int, SearchHit>()
    var kana: String? = null
    val japaneseQuery = Kana.hasJapanese(query) || (Regex("[*?＊？]").containsMatchIn(query) && !Regex("[a-z]", RegexOption.IGNORE_CASE).containsMatchIn(query))
    if (japaneseQuery) {
        if (field != "mean") japanese(index, Kana.kataToHira(query), hits)
    } else {
        val lower = query.lowercase()
        val converted = Kana.romajiToHiragana(lower.replace(" ", ""))
        if (field != "mean" && Regex("^[\\u3040-\\u309fー*?]+$").matches(converted)) {
            kana = converted
            japanese(index, converted, hits)
        }
        if (field != "read") english(index, lower, hits)
    }
    val matched = hits.values.filter { keep(index, it.pos, filters) }.map { hit ->
        if (index.rows[hit.pos].common) hit.copy(score = hit.score + 20) else hit
    }.sortedWith(compareByDescending<SearchHit> { it.score }.thenBy { it.pos })
    return SearchOutcome(matched.take(SEARCH_LIMIT), kana, matched.size)
}

private fun keep(index: JedIndex, pos: Int, filters: SearchFilter): Boolean {
    if (pos !in index.rows.indices) return false
    if (filters.only != null && pos !in filters.only) return false
    if (!filters.common && filters.type == null && filters.chars == null) return true
    val row = index.rows[pos]
    if (filters.common && !row.common) return false
    if (filters.type == "nonsuru") {
        if (!row.cls.contains("V") || row.cls.any { it.startsWith("vs") }) return false
    } else if (filters.type != null && !row.cls.contains(TYPE_LETTER[filters.type])) return false
    val chars = filters.chars
    if (chars != null) {
        val head = headOf(row)
        val allowed = mapOf(
            "hira" to chars.hira,
            "kata" to chars.kata,
            "kanji" to chars.kanji,
            "latin" to chars.latin,
        )
        for ((name, pattern) in CHAR_TESTS) {
            if (allowed[name] == false && pattern.containsMatchIn(head)) return false
        }
    }
    return true
}

private fun japanese(index: JedIndex, query: String, hits: HashMap<Int, SearchHit>) {
    val wild = Regex("[*?＊？]").containsMatchIn(query)
    val hasKanji = Regex("[\\u3400-\\u9fff\\uf900-\\ufaff々]").containsMatchIn(query)
    if (wild) {
        val pattern = wildcard(query)
        index.forms.forEachIndexed { pos, packed ->
            if (packed.split(';').any { pattern.matches(it) }) addHit(hits, pos, 70, null)
        }
        return
    }
    index.forms.forEachIndexed { pos, packed ->
        if (!packed.contains(query)) return@forEachIndexed
        var best = 0
        for (form in packed.split(';')) {
            best = when {
                form == query -> maxOf(best, 110)
                form.startsWith(query) -> maxOf(best, 70 - minOf(30, form.length - query.length))
                (hasKanji || query.length > 1) && form.contains(query) -> maxOf(best, 30 - minOf(20, form.length - query.length))
                else -> best
            }
        }
        if (best > 0) addHit(hits, pos, best, null)
    }
    if (query.length > 1) {
        for (candidate in Deinflect.deinflect(query)) {
            val positions = index.exact[candidate.form] ?: continue
            for (pos in positions) {
                if (index.rows[pos].cls.any { it.startsWith(candidate.cls) }) {
                    addHit(hits, pos, 95, candidate.label)
                }
            }
        }
    }
}

private fun english(index: JedIndex, query: String, hits: HashMap<Int, SearchHit>) {
    val word = Regex("(^|[^a-z])" + Regex.escape(query) + "($|[^a-z])")
    index.glossLower.forEachIndexed { pos, text ->
        if (!text.contains(query)) return@forEachIndexed
        var best = 0
        val senses = text.split('|')
        for (senseIndex in senses.indices) {
            if (best >= 104) break
            val first = senseIndex == 0
            val glosses = senses[senseIndex].split("; ")
            for (glossIndex in glosses.indices) {
                val gloss = glosses[glossIndex]
                val bare = stripNotes(gloss)
                best = when {
                    bare == query || bare == "to $query" || bare == "a $query" || bare == "the $query" ->
                        maxOf(best, if (first) (if (glossIndex == 0) 104 - minOf(4, glosses.size - 1) else 98) else 80)
                    word.containsMatchIn(gloss) ->
                        maxOf(best, (if (first) 55 else 40) - minOf(15, gloss.length / 8))
                    gloss.contains(query) -> maxOf(best, 10)
                    else -> best
                }
            }
        }
        if (best > 0) addHit(hits, pos, best, null)
    }
}

private fun stripNotes(gloss: String): String =
    gloss.replace(Regex("^\\([^)]*\\)\\s*"), "").replace(Regex("\\s*\\([^)]*\\)$"), "")

private fun addHit(hits: HashMap<Int, SearchHit>, pos: Int, score: Int, note: String?) {
    val previous = hits[pos]
    if (previous == null || previous.score < score) {
        hits[pos] = SearchHit(pos, score, note ?: previous?.note)
    }
}

private fun wildcard(query: String): Regex {
    val body = buildString {
        for (ch in query) {
            when (ch) {
                '*', '＊' -> append(".*")
                '?', '？' -> append(".")
                '.', '+', '^', '$', '{', '}', '(', ')', '|', '[', ']', '\\' -> append('\\').append(ch)
                else -> append(ch)
            }
        }
    }
    return Regex("^$body$")
}

fun searchKanji(index: JedIndex, raw: String): List<String> {
    val query = raw.trim().lowercase()
    val reading = Kana.kataToHira(Kana.romajiToHiragana(query))
    val scored = ArrayList<Pair<String, Double>>()
    for ((character, kanji) in index.kanji) {
        var score = 0.0
        if (query.isEmpty()) {
            score = when {
                kanji.f != null -> 3000.0 - kanji.f
                kanji.g != null -> 1.0
                else -> 0.0
            }
        } else if (query.contains(character)) {
            score = 5000.0
        } else {
            val reads = (kanji.on + kanji.kun).map { Kana.kataToHira(it).replace(Regex("[.-]"), "") }
            score = when {
                reads.contains(reading) -> 3000.0
                kanji.m.any { it.lowercase() == query } -> 2500.0
                kanji.m.any { it.lowercase().split(Regex("\\W+")).contains(query) } -> 1500.0
                else -> 0.0
            }
            if (score > 0 && kanji.f != null) score += 1000.0 - kanji.f / 3.0
        }
        if (score > 0) scored += character to score
    }
    scored.sortWith(compareByDescending { it.second })
    return scored.map { it.first }
}

fun wordsWithKanji(index: JedIndex, character: String, limit: Int = 40): List<Int> {
    val found = ArrayList<Int>()
    for (pos in index.forms.indices) {
        if (found.size >= limit * 4) break
        if (index.forms[pos].contains(character)) found += pos
    }
    fun lengthOf(pos: Int): Int = (if (index.rows[pos].common) 0 else 100) + index.forms[pos].substringBefore(';').length
    return found.sortedWith(compareBy<Int> { lengthOf(it) }.thenBy { it }).take(limit)
}
