package com.squirelworks.lsd.bible

import com.squirelworks.lsd.core.languages.compareDisplayNames

internal val bookGroups = listOf(
    "law" to "Law",
    "history" to "History",
    "wisdom" to "Wisdom",
    "prophets" to "Prophets",
    "appendix" to "Appendix",
    "gospels" to "Gospels",
    "acts" to "Acts",
    "epistles" to "Epistles",
    "revelation" to "Revelation",
)

internal val traditions = listOf(
    "east" to "Eastern Fathers",
    "early" to "Early Church",
    "west" to "Western Fathers (before the schism)",
)

internal val textSizes = listOf(0.9, 1.0, 1.05, 1.15, 1.3, 1.5)

internal val highlightColors = listOf("gold", "green", "blue", "rose")

private val languageNames = mapOf(
    "ar" to "Arabic",
    "bg" to "Bulgarian",
    "chr" to "Cherokee",
    "cop" to "Coptic",
    "cs" to "Czech",
    "cu" to "Church Slavonic",
    "da" to "Danish",
    "de" to "German",
    "el" to "Greek",
    "en" to "English",
    "enm" to "Middle English",
    "eo" to "Esperanto",
    "es" to "Spanish",
    "fa" to "Persian",
    "fi" to "Finnish",
    "fr" to "French",
    "got" to "Gothic",
    "grc" to "Greek (Koine)",
    "gv" to "Manx",
    "he" to "Hebrew",
    "hi" to "Hindi",
    "hu" to "Hungarian",
    "hy" to "Armenian",
    "it" to "Italian",
    "ja" to "Japanese",
    "ka" to "Georgian",
    "la" to "Latin",
    "lv" to "Latvian",
    "lzh" to "Classical Chinese",
    "mg" to "Malagasy",
    "ml" to "Malayalam",
    "my" to "Burmese",
    "nl" to "Dutch",
    "pl" to "Polish",
    "pt" to "Portuguese",
    "ro" to "Romanian",
    "ru" to "Russian",
    "sl" to "Slovenian",
    "sq" to "Albanian",
    "sr" to "Serbian",
    "sv" to "Swedish",
    "sw" to "Swahili",
    "syr" to "Syriac",
    "syc" to "Syriac",
    "tl" to "Tagalog",
    "uk" to "Ukrainian",
    "vi" to "Vietnamese",
    "zh" to "Chinese",
)

internal fun langName(code: String): String =
    languageNames[code] ?: languageNames[code.substringBefore('-')] ?: code

internal fun languagesInNameOrder(codes: Iterable<String>): List<String> =
    codes.distinct().sortedWith { left, right ->
        val byName = compareDisplayNames(langName(left), langName(right))
        if (byName != 0) byName else left.compareTo(right)
    }

internal data class PassageLine(val ref: String, val text: String, val bible: BibleDocument)

internal fun passageLines(verses: Versification, bible: BibleDocument, span: VerseSpan): List<PassageLine> {
    fun own(chapter: Int, verse: Int): VerseRef {
        val mapped = verses.fromKjv(bible.versification, refKey(span.book, chapter, verse))
            ?: refKey(span.book, chapter, verse)
        return parseRef(mapped)
    }
    val start = own(span.startChapter, span.startVerse)
    val end = own(span.endChapter, span.endVerse)
    if (start.book != span.book && bible.books[start.book] == null) return emptyList()
    val lines = ArrayList<PassageLine>()
    val book = start.book
    for (chapter in start.chapter..end.chapter) {
        val versesIn = bible.books[book]?.getOrNull(chapter - 1) ?: continue
        val last = if (chapter == end.chapter) minOf(end.verse, versesIn.size) else versesIn.size
        val first = if (chapter == start.chapter) start.verse else 1
        for (verse in first..last) {
            val text = versesIn.getOrNull(verse - 1) ?: continue
            lines += PassageLine(refKey(book, chapter, verse), text, bible)
        }
    }
    return lines
}

internal data class PreparedChapter(
    val book: BookMeta,
    val chapter: Int,
    val display: BibleDocument?,
    val parallels: List<BibleDocument>,
    val verses: List<String?>,
    val alternatives: List<CatalogBible>,
)

internal fun prepareChapter(
    library: BibleLibrary,
    catalog: BibleCatalog,
    books: List<BookMeta>,
    bookId: String,
    chapter: Int,
    primaryId: String,
    parallelIds: List<String>,
    available: (CatalogBible) -> Boolean,
    verses: Versification,
): PreparedChapter {
    val book = books.firstOrNull { it.id == bookId } ?: books.first { it.id == "JHN" }
    val ids = listOf(primaryId) + parallelIds
    val loaded = ids.mapNotNull { id ->
        catalog.bibles.firstOrNull { it.id == id }?.let { entry -> runCatching { library.ensureBible(entry) }.getOrNull() }
    }
    var primary = loaded.firstOrNull()
    var parallels = loaded.drop(1)
    if (!hasChapter(primary, book.id, chapter)) {
        val standIn = standInFor(library, catalog, book, chapter, primaryId, parallels, available)
        if (standIn != null) {
            parallels = parallels.filter { it.id != standIn.id }
            primary = standIn
        }
    }
    val shown = parallels.filter { parallel ->
        parallel.books.containsKey(book.id) || coversChapter(verses, parallel, primary, book.id, chapter)
    }
    val rows = primary?.books?.get(book.id)?.getOrNull(chapter - 1)
    val alternatives = if (rows == null) {
        catalog.bibles.filter { entry ->
            entry.id != primaryId && hasChapter(library.bible(entry.id), book.id, chapter)
        }
    } else {
        emptyList()
    }
    return PreparedChapter(book, chapter, primary, shown, rows.orEmpty(), alternatives)
}

private fun coversChapter(verses: Versification, parallel: BibleDocument, primary: BibleDocument?, book: String, chapter: Int): Boolean {
    if (primary == null) return false
    return (1..3).any { verse ->
        val ref = sameRefIn(verses, parallel, primary, refKey(book, chapter, verse)) ?: return@any false
        val parsed = parseRef(ref)
        parallel.books.containsKey(parsed.book)
    }
}

internal fun standInFor(
    library: BibleLibrary,
    catalog: BibleCatalog,
    book: BookMeta,
    chapter: Int,
    primaryId: String,
    parallels: List<BibleDocument>,
    available: (CatalogBible) -> Boolean,
): BibleDocument? {
    parallels.firstOrNull { hasChapter(it, book.id, chapter) }?.let { return it }
    val part = testamentOf(book)
    val candidates = catalog.bibles.filter { entry ->
        available(entry) && entry.id != primaryId && coversTestament(entry, part)
    }
    for (entry in candidates) {
        val bible = runCatching { library.ensureBible(entry) }.getOrNull() ?: continue
        if (hasChapter(bible, book.id, chapter)) return bible
    }
    return null
}

internal fun linkedBooks(bible: BibleDocument, book: String, chapter: Int, verses: Versification): Set<String> {
    val books = mutableSetOf(book)
    val rows = bible.books[book]?.getOrNull(chapter - 1).orEmpty()
    rows.forEachIndexed { index, text ->
        if (text == null) return@forEachIndexed
        val mapped = verses.toKjv(bible.versification, refKey(book, chapter, index + 1)) ?: return@forEachIndexed
        books += parseRef(mapped).book
    }
    return books
}

internal fun exportNotes(settings: BibleSettings, primary: BibleDocument?, verses: Versification, books: List<BookMeta>): String {
    val byId = books.associateBy { it.id }
    val keys = savedKeys(settings, books)
    return keys.joinToString("\n\n") { key ->
        val own = (primary?.let { verses.fromKjv(it.versification, key) } ?: key) ?: key
        val lines = ArrayList<String>()
        val star = if (key in settings.bookmarks) " ★" else ""
        lines += refLabel(own, byId) + star
        verseText(primary, own)?.let { lines += it }
        settings.notes[key]?.let { lines += "Note: $it" }
        lines.joinToString("\n")
    }
}

internal fun savedKeys(settings: BibleSettings, books: List<BookMeta>): List<String> {
    val index = books.mapIndexed { place, book -> book.id to place }.toMap()
    val keys = (settings.bookmarks + settings.notes.keys + settings.highlights.keys).distinct()
    return keys.sortedBy { key ->
        val parsed = parseRef(key)
        (index[parsed.book] ?: 999) * 1_000_000 + parsed.chapter * 1_000 + parsed.verse
    }
}

internal fun copyVerse(ref: String, primary: BibleDocument, loaded: List<BibleDocument>, verses: Versification, books: Map<String, BookMeta>): String {
    val lines = loaded.mapNotNull { bible ->
        val text = verseText(bible, sameRefIn(verses, bible, primary, ref)) ?: return@mapNotNull null
        "$text (${bible.name})"
    }
    return refLabel(ref, books) + "\n" + lines.joinToString("\n")
}
