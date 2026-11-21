package com.squirelworks.lsd.bible

import com.squirelworks.lsd.core.languages.TextStore
import com.squirelworks.lsd.kana.WebViewStore
import java.io.File
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit
import kotlin.concurrent.thread
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue
import kotlinx.serialization.json.jsonObject

class BibleLogicTest {
    @Test
    fun paschaMatchesTheWebView() {
        assertEquals(Ymd(2024, 5, 5), paschaGregorian(2024))
        assertEquals(Ymd(2025, 4, 20), paschaGregorian(2025))
        assertEquals(Ymd(2026, 4, 12), paschaGregorian(2026))
        assertEquals(Ymd(2027, 5, 2), paschaGregorian(2027))
        assertEquals(Ymd(2028, 4, 16), paschaGregorian(2028))
    }

    @Test
    fun liturgicalDaysMatchTheWebView() {
        val lectionary = Lectionary(bibleJson.parseToJsonElement(extractJson(repoFile("www/data/lectionary.js"))).jsonObject)
        val pascha = liturgicalDay(lectionary, Ymd(2026, 4, 12), "new")
        assertEquals("Sunday", pascha.weekday)
        assertEquals(0, pascha.pdist)
        assertEquals(1, pascha.tone)
        assertEquals(listOf("Holy Pascha"), pascha.titles)
        assertEquals(listOf(0, 1), pascha.main)
        assertEquals("Acts 1.1-8", pascha.readings[0].display)
        assertEquals("John 1.1-17", pascha.readings[1].display)
        assertEquals("Beginning of the Pentecostarion", pascha.saints.first())

        val holySaturday = liturgicalDay(lectionary, Ymd(2026, 4, 11), "new")
        assertEquals("Great and Holy Saturday", holySaturday.titles.first())
        assertEquals(20, holySaturday.readings.size)
        assertEquals(listOf(18, 19), holySaturday.main)

        val nativity = liturgicalDay(lectionary, Ymd(2026, 12, 25), "new")
        assertEquals(listOf("Nativity of Christ"), nativity.feasts)
        assertEquals("Galatians 4.4-7", nativity.readings[1].display)

        val newJan7 = liturgicalDay(lectionary, Ymd(2026, 1, 7), "new")
        assertEquals(listOf("Synaxis of St John the Baptist"), newJan7.feasts)
        assertEquals(Ymd(2026, 1, 7), newJan7.menaion)

        val oldJan7 = liturgicalDay(lectionary, Ymd(2026, 1, 7), "old")
        assertEquals(listOf("Nativity of Christ"), oldJan7.feasts)
        assertEquals(Ymd(2025, 12, 25), oldJan7.menaion)
        assertEquals("The Shepherds who saw the Lord", oldJan7.saints.first())

        val oldPascha = liturgicalDay(lectionary, Ymd(2026, 4, 12), "old")
        assertEquals(Ymd(2026, 3, 30), oldPascha.menaion)
        assertEquals("Holy Pascha", oldPascha.titles.first())
    }

    @Test
    fun referencesSearchAndVerses() {
        val books = listOf(
            BookMeta("GEN", "Genesis", "law"),
            BookMeta("PSA", "Psalms", "wisdom"),
            BookMeta("JHN", "John", "gospels", nt = true),
            BookMeta("1SA", "1 Kingdoms", "history", alt = "1 Samuel"),
        )
        assertEquals("JHN.3.16", parseTypedRef("John 3:16", books))
        assertEquals("JHN.3.16", parseTypedRef("jo 3 16", books))
        assertEquals("PSA.50.1", parseTypedRef("Ps 50", books))
        assertEquals("1SA.1.1", parseTypedRef("1 Samuel 1:1", books))
        assertNull(parseTypedRef("x 1", books))

        val verses = Versification(mapOf("lxx" to mapOf("1CH.5.27" to "1CH.6.1", "PSA.3.1" to null)))
        assertEquals("1CH.6.1", verses.toKjv("lxx", "1CH.5.27"))
        assertNull(verses.toKjv("lxx", "PSA.3.1"))
        assertEquals("GEN.1.1", verses.toKjv("lxx", "GEN.1.1"))
        assertEquals("1CH.5.27", verses.fromKjv("lxx", "1CH.6.1"))
        assertNull(verses.fromKjv("lxx", "PSA.3.1"))

        val bible = BibleDocument(
            id = "sample",
            name = "Sample",
            lang = "en",
            versification = "kjv",
            books = mapOf("JHN" to listOf(listOf("In the beginning was the Word.", "And the Word was with God."))),
        )
        assertEquals("In the beginning was the Word.", verseText(bible, "JHN.1.1"))
        val hits = searchVerses(bible, books, "WORD")
        assertEquals(listOf("JHN.1.1", "JHN.1.2"), hits.map { it.ref })
        assertEquals(MarkSpan(0, 2), highlightSpan("In the beginning", foldText("in")))
        assertEquals("cafe", foldText("Café"))
        assertEquals("John 1:1", refLabel("JHN.1.1", books.associateBy { it.id }))
    }

    @Test
    fun russianPsalmTitleHasNoParallelVerse() {
        val verses = Versification(bibleJson.decodeFromString(extractJson(repoFile("www/data/versification.js"))))
        assertNull(verses.toKjv("rso", "PSA.50.1"))
        assertNull(verses.toKjv("rso", "PSA.50.2"))
        val synodal = BibleDocument(id = "rus-synodal", name = "Synodal", versification = "rso")
        val kjv = BibleDocument(id = "kjva", name = "KJV", versification = "kjv")
        assertNull(sameRefIn(verses, kjv, synodal, "PSA.50.1"))
        assertNull(sameRefIn(verses, kjv, synodal, "PSA.50.2"))
        assertEquals("PSA.49.1", sameRefIn(verses, synodal, kjv, "PSA.50.1"))
    }

    @Test
    fun realKjvOpensGenesis() {
        val text = extractJson(repoFile("www/data/bibles/kjva.js"))
        val bible = decodeBible(text)
        assertTrue(bible.books["GEN"]?.firstOrNull()?.firstOrNull()?.startsWith("In the beginning") == true)
    }

    @Test
    fun settingsImportOnce() {
        val defaults = BibleSettings(primary = "kjva", importedWebView = false)
        val legacy = """{"primary":"rus-synodal","parallel":["kjva"],"last":{"book":"MAT","chapter":5},"bookmarks":["JHN.1.1"],"notes":{"JHN.1.1":"Light"},"highlights":{"JHN.1.1":"gold"},"textSize":1.3,"theme":"dark","calendar":"old"}"""
        val imported = importBibleSettings(defaults, WebViewStore.Value(legacy), fileWasBlank = true)
        assertEquals("rus-synodal", imported.primary)
        assertEquals(listOf("kjva"), imported.parallel)
        assertEquals(LastPlace("MAT", 5), imported.last)
        assertEquals("Light", imported.notes["JHN.1.1"])
        assertEquals("gold", imported.highlights["JHN.1.1"])
        assertEquals(1.3, imported.textSize)
        assertEquals("dark", imported.theme)
        assertEquals("old", imported.calendar)
        assertTrue(imported.importedWebView)
        val again = importBibleSettings(imported, WebViewStore.Value("""{"primary":"kjva"}"""), fileWasBlank = false)
        assertEquals("rus-synodal", again.primary)

        val store = MemoryStore()
        adoptBibleSettings(store, WebViewStore.Absent, defaults)
        assertTrue(readBibleSettings(store, defaults).importedWebView)
        val unreadable = MemoryStore()
        adoptBibleSettings(unreadable, WebViewStore.Unreadable, defaults)
        assertEquals("", unreadable.read())
    }

    @Test
    fun packsStayOnTheDedicatedRelease() {
        assertTrue(PACKS_RELEASE_API.endsWith("/releases/tags/orthodox-bible-packs"))
        assertTrue("orthodox-bible-packs" in PACKS_RELEASE_TAG)
        assertTrue(PACKS_BRANCH_CONTENT.contains("/orthodox-bible-texts/"))
        val raw = """SGO_BIBLES.push({"id":"demo","name":"Demo","books":{}});"""
        assertTrue(parsePackJson(raw, "SGO_BIBLES.push(").contains("\"id\":\"demo\""))
        val catalog = BibleCatalog(
            bibles = listOf(CatalogBible(id = "kjva", name = "KJV", lang = "en", url = "https://example/kjva.js")),
        )
        val release = PackRelease(
            tag = PACKS_RELEASE_TAG,
            index = PackIndex(
                bibles = listOf(
                    PackListing(id = "kjva", file = "bibles/kjva.js", url = "https://example/kjva.js"),
                    PackListing(id = "demo", file = "bibles/demo.js", name = "Demo", lang = "en", url = "https://branch/demo.js"),
                ),
            ),
            assets = mapOf("bibles/kjva.js" to "https://github.com/releases/download/orthodox-bible-packs/kjva.js"),
        )
        val (merged, added) = mergePackRelease(catalog, release)
        assertEquals(1, added)
        assertEquals("https://github.com/releases/download/orthodox-bible-packs/kjva.js", merged.bibles.first { it.id == "kjva" }.releaseUrl)
        assertEquals("demo", merged.bibles.last().id)
        assertEquals("https://branch/demo.js", merged.bibles.last().url)
    }

    @Test
    fun languageNamesAreAlphabetical() {
        val order = languagesInNameOrder(listOf("ru", "en", "grc", "ar", "cu"))
        assertEquals(listOf("ar", "cu", "en", "grc", "ru"), order)
        assertEquals("Arabic", langName(order.first()))
    }

    private fun repoFile(relative: String): File {
        var dir: File? = File("").absoluteFile
        repeat(8) {
            val current = dir ?: return@repeat
            val candidate = File(current, "SquirrelGo-Apps/squirrelgo-orthodox-bible/$relative")
            if (candidate.isFile) return candidate
            dir = current.parentFile
        }
        error("Could not find $relative from ${File("").absoluteFile}")
    }

    private fun extractJson(file: File): String {
        val text = file.readText()
        val start = text.indexOfFirst { it == '{' || it == '[' }
        val open = text[start]
        val close = if (open == '{') '}' else ']'
        var depth = 0
        var inString = false
        var escape = false
        for (index in start until text.length) {
            val char = text[index]
            if (inString) {
                if (escape) escape = false
                else if (char == '\\') escape = true
                else if (char == '"') inString = false
                continue
            }
            when (char) {
                '"' -> inString = true
                open -> depth += 1
                close -> {
                    depth -= 1
                    if (depth == 0) return text.substring(start, index + 1)
                }
            }
        }
        error("No JSON value in ${file.path}")
    }

    @Test
    fun cacheReadDoesNotWaitForABibleLoad() {
        val started = CountDownLatch(1)
        val release = CountDownLatch(1)
        var reads = 0
        val library = BibleLibrary(
            readBundledBible = {
                reads += 1
                started.countDown()
                check(release.await(5, TimeUnit.SECONDS))
                """{"id":"slow"}"""
            },
            readBundledCommentary = { null },
            packs = MemoryPacks(),
            verses = Versification(emptyMap()),
        )
        val entry = CatalogBible(id = "slow", name = "Slow")
        val loader = thread { library.ensureBible(entry) }
        assertTrue(started.await(5, TimeUnit.SECONDS))
        val lookup = thread { library.bible("other") }
        lookup.join(500)
        val waited = lookup.isAlive
        release.countDown()
        loader.join(5_000)
        assertTrue(!waited, "cache read waited on the bible load")
        assertTrue(!loader.isAlive)
        assertEquals("slow", library.bible("slow")?.id)
        library.ensureBible(entry)
        assertEquals(1, reads)
    }
}

private class MemoryStore : TextStore {
    private var text = ""
    override fun read(): String = text
    override fun write(text: String) {
        this.text = text
    }
}

private class MemoryPacks : PackStore {
    override fun keys(): Set<String> = emptySet()
    override fun read(key: String): String? = null
    override fun write(key: String, text: String) = Unit
    override fun remove(key: String) = Unit
}
