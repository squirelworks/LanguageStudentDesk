package com.squirelworks.lsd.bible

internal expect fun foldText(value: String): String

internal data class VerseRef(val book: String, val chapter: Int, val verse: Int)

internal fun parseRef(ref: String): VerseRef {
    val parts = ref.split(".")
    return VerseRef(parts.getOrElse(0) { "" }, parts.getOrElse(1) { "0" }.toIntOrNull() ?: 0, parts.getOrElse(2) { "0" }.toIntOrNull() ?: 0)
}

internal fun refKey(book: String, chapter: Int, verse: Int) = "$book.$chapter.$verse"

internal class Versification(private val maps: Map<String, Map<String, String?>>) {
    private val inverse = HashMap<String, Map<String, String>>()

    fun toKjv(scheme: String, ref: String): String? {
        val map = maps[scheme] ?: return ref
        if (!map.containsKey(ref)) return ref
        return map[ref]
    }

    fun fromKjv(scheme: String, kref: String?): String? {
        if (kref == null) return null
        val map = maps[scheme] ?: return kref
        val back = inverse.getOrPut(scheme) {
            val built = LinkedHashMap<String, String>()
            for ((key, value) in map) {
                if (value != null && value !in built) built[value] = key
            }
            built
        }
        if (kref in back) return back[kref]
        return if (kref in map) null else kref
    }
}

internal fun verseText(bible: BibleDocument?, ref: String?): String? {
    if (bible == null || ref == null) return null
    val parsed = parseRef(ref)
    val chapter = bible.books[parsed.book]?.getOrNull(parsed.chapter - 1) ?: return null
    return chapter.getOrNull(parsed.verse - 1)
}

internal fun sameRefIn(verses: Versification, bible: BibleDocument, from: BibleDocument, ref: String): String? {
    if (bible.id == from.id || bible.versification == from.versification) return ref
    return verses.fromKjv(bible.versification, verses.toKjv(from.versification, ref))
}

internal fun hasChapter(bible: BibleDocument?, book: String, chapter: Int): Boolean =
    bible?.books?.get(book)?.getOrNull(chapter - 1) != null

internal fun chapterCount(loaded: Collection<BibleDocument>, bookId: String): Int {
    var count = 0
    for (bible in loaded) count = maxOf(count, bible.books[bookId]?.size ?: 0)
    return count
}

internal data class ChapterPlace(val book: String, val chapter: Int)

internal fun neighbour(
    books: List<BookMeta>,
    loaded: Collection<BibleDocument>,
    book: String,
    chapter: Int,
    direction: Int,
): ChapterPlace? {
    if (direction == 0) return null
    val indexOf = books.indexOfFirst { it.id == book }
    if (indexOf < 0) return null
    var index = indexOf
    var current = chapter + direction
    repeat(books.size * 2) {
        val id = books[index].id
        val count = chapterCount(loaded, id)
        if (current in 1..count) {
            if (loaded.any { hasChapter(it, id, current) }) return ChapterPlace(id, current)
            current += direction
            return@repeat
        }
        index += direction
        if (index !in books.indices) return null
        current = if (direction > 0) 1 else chapterCount(loaded, books[index].id)
    }
    return null
}

internal fun testamentOf(book: BookMeta): String = when {
    book.nt -> "NT"
    book.dc -> "DC"
    else -> "OT"
}

internal fun coversTestament(entry: CatalogBible, part: String): Boolean =
    entry.testaments.isBlank() || part in entry.testaments.split(",")

internal data class SearchHit(val ref: String, val text: String)

internal fun searchVerses(bible: BibleDocument, books: List<BookMeta>, query: String, limit: Int = 300): List<SearchHit> {
    val needle = foldText(query)
    if (needle.isEmpty()) return emptyList()
    val hits = ArrayList<SearchHit>()
    for (book in books) {
        val chapters = bible.books[book.id] ?: continue
        for (chapterIndex in chapters.indices) {
            val verses = chapters[chapterIndex] ?: continue
            for (verseIndex in verses.indices) {
                val text = verses[verseIndex] ?: continue
                if (foldText(text).contains(needle)) {
                    hits += SearchHit(refKey(book.id, chapterIndex + 1, verseIndex + 1), text)
                    if (hits.size >= limit) return hits
                }
            }
        }
    }
    return hits
}

internal data class MarkSpan(val start: Int, val end: Int)

internal fun highlightSpan(text: String, needleFolded: String): MarkSpan? {
    if (needleFolded.isEmpty()) return null
    val folded = foldText(text)
    val index = folded.indexOf(needleFolded)
    if (index < 0 || folded.length != text.length) return null
    return MarkSpan(index, index + needleFolded.length)
}

internal fun parseTypedRef(raw: String, books: List<BookMeta>): String? {
    val match = typedRef.find(raw.trim()) ?: return null
    val name = foldText(match.groupValues[1]).replace(Regex("\\s+"), "")
    if (name.length < 2) return null
    val book = books.firstOrNull { candidate ->
        listOf(candidate.en, candidate.alt, candidate.id).filter { it.isNotBlank() }.any { label ->
            foldText(label).replace(Regex("\\s+"), "").startsWith(name)
        }
    } ?: return null
    val chapter = match.groupValues[2].toIntOrNull() ?: return null
    val verse = match.groupValues[3].toIntOrNull() ?: 1
    return refKey(book.id, chapter, verse)
}

internal fun refLabel(ref: String, books: Map<String, BookMeta>): String {
    val parsed = parseRef(ref)
    val name = books[parsed.book]?.en ?: parsed.book
    return "$name ${parsed.chapter}:${parsed.verse}"
}

internal fun megabytes(bytes: Long): String {
    if (bytes <= 0L) return ""
    val tenths = (bytes * 10 + 524288) / 1048576
    return "${tenths / 10}.${tenths % 10} MB"
}

internal fun sourceUrl(source: String): String {
    val match = Regex("https?://\\S+").find(source)?.value ?: return ""
    return match.trimEnd(')', '.', ',', ';')
}

private val typedRef = Regex("""^(\d?\s*[^\d:]+?)\s*(\d+)(?:\s*[:.\s]\s*(\d+))?$""")