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

    fun loadedBibles(): Collection<BibleDocument> = bibleSync { bibles.values.toList() }

    fun bible(id: String): BibleDocument? = bibleSync { bibles[id] }

    fun ensureBible(entry: CatalogBible): BibleDocument? {
        bibleSync { bibles[entry.id] }?.let { return it }
        val json = readBible(entry) ?: return null
        val document = decodeBible(json)
        return bibleSync {
            bibles[entry.id] ?: document.also { bibles[it.id] = it }
        }
    }

    fun forgetBible(id: String) = bibleSync {
        bibles.remove(id)
    }

    fun ensureCommentary(bookIds: Set<String>, catalog: List<CatalogCommentary>, installed: (CatalogCommentary) -> Boolean) {
        val pending = bibleSync {
            buildList {
                for (entry in catalog) {
                    if (!installed(entry)) continue
                    val covers = entry.books
                    if (covers != null && covers.none { it in bookIds }) continue
                    if (!loadedCommentary.add(entry.id)) continue
                    add(entry)
                }
            }
        }
        for (entry in pending) {
            val document = readCommentary(entry)?.let { runCatching { decodeCommentary(it) }.getOrNull() }
            if (document == null) {
                bibleSync { loadedCommentary.remove(entry.id) }
                continue
            }
            bibleSync {
                commentary[document.id] = document
                index(document)
            }
        }
    }

    private fun readBible(entry: CatalogBible): String? = if (entry.url.isBlank()) {
        readBundledBible(entry.id)
    } else {
        packs.read(packKey("bible", entry.id))?.let { parsePackJson(it, "SGO_BIBLES.push(") }
    }

    private fun readCommentary(entry: CatalogCommentary): String? = if (entry.url.isBlank()) {
        readBundledCommentary(entry.id)
    } else {
        packs.read(packKey("commentary", entry.id))?.let { parsePackJson(it, "SGO_COMMENTARY.push(") }
    }

    fun commentaryFor(kref: String, hidden: Set<String>): List<CommentaryHit> = bibleSync {
        index[kref].orEmpty().filter { it.source.id !in hidden }.toList()
    }

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

internal expect fun <T> bibleSync(block: () -> T): T
