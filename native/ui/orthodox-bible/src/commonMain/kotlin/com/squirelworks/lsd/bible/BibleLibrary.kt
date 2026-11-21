package com.squirelworks.lsd.bible

internal class BibleLibrary(
    private val readBundledBible: (String) -> String?,
    private val readBundledCommentary: (String) -> String?,
    private val packs: PackStore,
    private val verses: Versification,
) {
    private val bibles = HashMap<String, BibleDocument>()
    private val commentary = HashMap<String, CommentaryDocument>()
    private val loadedCommentary = HashSet<String>()
    private val index = HashMap<String, MutableList<CommentaryHit>>()

    fun loadedBibles(): Collection<BibleDocument> = bibles.values

    fun bible(id: String): BibleDocument? = bibles[id]

    fun ensureBible(entry: CatalogBible): BibleDocument? {
        bibles[entry.id]?.let { return it }
        val json = if (entry.url.isBlank()) {
            readBundledBible(entry.id)
        } else {
            packs.read(packKey("bible", entry.id))?.let { parsePackJson(it, "SGO_BIBLES.push(") }
        } ?: return null
        val document = decodeBible(json)
        bibles[document.id] = document
        return document
    }

    fun forgetBible(id: String) {
        bibles.remove(id)
    }

    fun ensureCommentary(bookIds: Set<String>, catalog: List<CatalogCommentary>, installed: (CatalogCommentary) -> Boolean) {
        for (entry in catalog) {
            if (!installed(entry)) continue
            val covers = entry.books
            if (covers != null && covers.none { it in bookIds }) continue
            if (!loadedCommentary.add(entry.id)) continue
            val json = if (entry.url.isBlank()) {
                readBundledCommentary(entry.id)
            } else {
                packs.read(packKey("commentary", entry.id))?.let { parsePackJson(it, "SGO_COMMENTARY.push(") }
            }
            if (json == null) {
                loadedCommentary.remove(entry.id)
                continue
            }
            val document = runCatching { decodeCommentary(json) }.getOrElse {
                loadedCommentary.remove(entry.id)
                null
            } ?: continue
            commentary[document.id] = document
            index(document)
        }
    }

    fun commentaryFor(kref: String, hidden: Set<String>): List<CommentaryHit> =
        index[kref].orEmpty().filter { it.source.id !in hidden }

    private fun index(document: CommentaryDocument) {
        val pattern = Regex("""^([0-9A-Z]{3})\.(\d+)\.(\d+)(?:-(\d+))?$""")
        for ((key, texts) in document.notes) {
            val match = pattern.matchEntire(key) ?: continue
            val book = match.groupValues[1]
            val chapter = match.groupValues[2].toInt()
            val start = match.groupValues[3].toInt()
            val end = match.groupValues[4].toIntOrNull() ?: start
            for (verse in start..end) {
                val kref = verses.toKjv(document.versification.ifBlank { "kjv" }, refKey(book, chapter, verse)) ?: continue
                index.getOrPut(kref) { mutableListOf() }.add(CommentaryHit(document, key, texts))
            }
        }
    }
}
