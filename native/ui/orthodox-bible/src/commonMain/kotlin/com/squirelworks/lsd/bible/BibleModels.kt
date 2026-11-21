package com.squirelworks.lsd.bible

import com.squirelworks.lsd.kana.SuiteFile
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject

internal val bibleJson = Json {
    ignoreUnknownKeys = true
    encodeDefaults = true
}

@Serializable
internal data class BookMeta(
    val id: String,
    val en: String,
    val group: String = "",
    val alt: String = "",
    val dc: Boolean = false,
    val nt: Boolean = false,
    val appendix: Boolean = false,
)

@Serializable
internal data class CatalogBible(
    val id: String,
    val name: String,
    val lang: String = "",
    val dir: String = "ltr",
    val versification: String = "kjv",
    val license: String = "",
    val source: String = "",
    val testaments: String = "",
    val url: String = "",
    val releaseUrl: String = "",
    val size: Long = 0,
)

@Serializable
internal data class CatalogCommentary(
    val id: String,
    val author: String = "",
    val work: String = "",
    val lang: String = "",
    val license: String = "",
    val source: String = "",
    val tradition: String = "east",
    val books: List<String>? = null,
    val url: String = "",
    val releaseUrl: String = "",
    val size: Long = 0,
)

@Serializable
internal data class BibleCatalog(
    val bibles: List<CatalogBible> = emptyList(),
    val commentary: List<CatalogCommentary> = emptyList(),
)

@Serializable
internal data class BibleDocument(
    val id: String,
    val name: String = "",
    val lang: String = "",
    val dir: String = "ltr",
    val versification: String = "kjv",
    val license: String = "",
    val source: String = "",
    val sample: Boolean = false,
    val books: Map<String, List<List<String?>?>?> = emptyMap(),
)

@Serializable
internal data class CommentaryDocument(
    val id: String,
    val author: String = "",
    val work: String = "",
    val translator: String = "",
    val lang: String = "",
    val license: String = "",
    val source: String = "",
    val versification: String = "kjv",
    val tradition: String = "east",
    val books: List<String>? = null,
    val notes: Map<String, List<String>> = emptyMap(),
)

internal data class CommentaryHit(
    val source: CommentaryDocument,
    val key: String,
    val texts: List<String>,
)

@Serializable
internal data class PackListing(
    val id: String = "",
    val file: String = "",
    val name: String = "",
    val lang: String = "",
    val dir: String = "ltr",
    val versification: String = "kjv",
    val license: String = "",
    val source: String = "",
    val testaments: String = "",
    val url: String = "",
    val size: Long = 0,
    val author: String = "",
    val work: String = "",
    val tradition: String = "",
    val books: List<String>? = null,
)

@Serializable
internal data class PackIndex(
    val bibles: List<PackListing> = emptyList(),
    val commentary: List<PackListing> = emptyList(),
)

@Serializable
internal data class PackRelease(
    val tag: String = "",
    val checked: Long = 0,
    val index: PackIndex = PackIndex(),
    val assets: Map<String, String> = emptyMap(),
)

@Serializable
internal data class LastPlace(
    val book: String = "JHN",
    val chapter: Int = 1,
)

@Serializable
internal data class BibleSettings(
    val primary: String = "",
    val parallel: List<String> = emptyList(),
    val layout: String = "stack",
    val textSize: Double = 1.05,
    val theme: String = "auto",
    val hiddenCommentary: List<String> = emptyList(),
    val calendar: String = "new",
    val last: LastPlace = LastPlace(),
    val bookmarks: List<String> = emptyList(),
    val notes: Map<String, String> = emptyMap(),
    val highlights: Map<String, String> = emptyMap(),
    val importedWebView: Boolean = false,
)

class BibleBundle internal constructor(
    internal val books: List<BookMeta>,
    internal val catalog: BibleCatalog,
    internal val versification: Map<String, Map<String, String?>>,
    internal val lectionary: JsonObject,
    val suite: SuiteFile?,
)

fun parseBibleBundle(books: String, catalog: String, versification: String, lectionary: String, suite: String): BibleBundle {
    val table = bibleJson.decodeFromString<Map<String, Map<String, String?>>>(versification)
    val suiteFile = runCatching { com.squirelworks.lsd.kana.parseSuite(suite) }.getOrNull()
    return BibleBundle(
        books = bibleJson.decodeFromString(books),
        catalog = bibleJson.decodeFromString(catalog),
        versification = table,
        lectionary = bibleJson.parseToJsonElement(lectionary) as JsonObject,
        suite = suiteFile,
    )
}

internal fun decodeBible(text: String): BibleDocument = bibleJson.decodeFromString(text)

internal fun decodeCommentary(text: String): CommentaryDocument = bibleJson.decodeFromString(text)
