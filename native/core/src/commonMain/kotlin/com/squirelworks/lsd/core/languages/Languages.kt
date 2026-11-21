package com.squirelworks.lsd.core.languages

import com.squirelworks.lsd.core.deinflect.Deinflect
import com.squirelworks.lsd.core.deinflect.Deinflection
import com.squirelworks.lsd.core.kana.Kana
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class CatalogLanguage(
    val id: String,
    val name: String,
    val nativeName: String = "",
    val speech: String = "",
)

data class LanguageSection(val id: String, val title: String, val languages: List<CatalogLanguage>)

private val catalogJson = Json { ignoreUnknownKeys = true }

fun parseLanguageCatalog(json: String): List<CatalogLanguage> =
    catalogJson.decodeFromString(json)

fun displayNameOrder(a: CatalogLanguage, b: CatalogLanguage, displayName: (CatalogLanguage) -> String): Int {
    val byName = compareDisplayNames(displayName(a), displayName(b))
    if (byName != 0) return byName
    val byId = compareDisplayNames(a.id, b.id)
    if (byId != 0) return byId
    return a.id.compareTo(b.id)
}

// Favorites are their own section. The full list under them is every language,
// still A–Z by the name the screen shows. Starring does not move a row inside
// that list, and choosing a default does not either: the caller only reads
// [defaultLanguageId].
fun arrangeLanguages(
    languages: List<CatalogLanguage>,
    favoriteIds: Set<String>,
    displayName: (CatalogLanguage) -> String,
    favoritesTitle: String,
    allTitle: String,
): List<LanguageSection> {
    val sorted = languages.sortedWith { a, b -> displayNameOrder(a, b, displayName) }
    val favorites = sorted.filter { it.id in favoriteIds }
    val sections = mutableListOf<LanguageSection>()
    if (favorites.isNotEmpty()) sections += LanguageSection("favorites", favoritesTitle, favorites)
    sections += LanguageSection("all", allTitle, sorted)
    return sections
}

// Preselects. The device tag wins when a catalog row's id or speech subtag
// matches it; otherwise [fallbackId] when that row exists. Neither is moved.
fun defaultLanguageId(
    languages: List<CatalogLanguage>,
    deviceTag: String,
    fallbackId: String,
): String? {
    val sub = deviceTag.lowercase().substringBefore('-').substringBefore('_')
    if (sub.isNotEmpty()) {
        languages.firstOrNull { it.id.equals(sub, ignoreCase = true) }?.let { return it.id }
        languages.firstOrNull { speechSubtag(it.speech) == sub }?.let { return it.id }
    }
    return languages.firstOrNull { it.id == fallbackId }?.id
}

private fun speechSubtag(speech: String): String =
    speech.lowercase().substringBefore('-').substringBefore('_')

interface FavoriteStore {
    fun load(): Set<String>
    fun save(ids: Set<String>)
}

class MemoryFavoriteStore(initial: Set<String> = emptySet()) : FavoriteStore {
    private var ids = initial
    override fun load(): Set<String> = ids
    override fun save(ids: Set<String>) { this.ids = ids }
}

fun parseFavoriteFile(text: String): Set<String> =
    text.lineSequence().map { it.trim() }.filter { it.isNotEmpty() }.toSet()

fun formatFavoriteFile(ids: Set<String>): String =
    if (ids.isEmpty()) "" else ids.sorted().joinToString("\n", postfix = "\n")

// Desk stars keep the order they were starred in, which is the order the
// WebView's lsd-favorite-languages array uses.
fun formatFavoriteOrder(ids: Iterable<String>): String {
    val list = ids.toList()
    return if (list.isEmpty()) "" else list.joinToString("\n", postfix = "\n")
}

class FavoriteLanguages(private val store: FavoriteStore) {
    private var ids: Set<String> = store.load()

    fun ids(): Set<String> = ids

    fun toggle(id: String) {
        ids = if (id in ids) ids - id else ids + id
        store.save(ids)
    }

    fun replace(ids: Iterable<String>) {
        val next = linkedSetOf<String>()
        ids.forEach { if (it.isNotEmpty()) next += it }
        this.ids = next
        store.save(next)
    }
}

data class Lookup(val query: String, val kana: String?, val deinflections: List<Deinflection>)

private val wildcard = Regex("[*?＊？]")
private val latin = Regex("[a-zA-Z]")
private val hiraganaQuery = Regex("^[\\u3040-\\u309Fー*?]+$")

// Same split as the dictionary's search.js: Japanese (or a wildcard with no
// Latin letters) is folded to hiragana; otherwise romaji is converted, and
// kept only when that conversion is entirely hiragana.
fun lookup(raw: String): Lookup {
    val query = raw.trim().replace(Regex("\\s+"), " ")
    if (query.isEmpty()) return Lookup(query, null, emptyList())
    val kana = japaneseReading(query)
    val forms = if (kana != null && kana.length > 1) Deinflect.deinflect(kana) else emptyList()
    return Lookup(query, kana, forms)
}

internal fun japaneseReading(query: String): String? {
    val wild = wildcard.containsMatchIn(query)
    val hasLatin = latin.containsMatchIn(query)
    if (Kana.hasJapanese(query) || (wild && !hasLatin)) return Kana.kataToHira(query)
    val converted = Kana.romajiToHiragana(query.lowercase().replace(Regex("\\s"), ""))
    return converted.takeIf { hiraganaQuery.matches(it) }
}
