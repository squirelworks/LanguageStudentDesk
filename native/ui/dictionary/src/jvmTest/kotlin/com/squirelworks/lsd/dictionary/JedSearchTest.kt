package com.squirelworks.lsd.dictionary

import com.squirelworks.lsd.core.languages.TextStore
import com.squirelworks.lsd.core.suite.KanaBack
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue

class JedSearchTest {
    private val index = sampleIndex()

    @Test
    fun englishRanksTheLeadingGlossFirst() {
        val found = jedSearch(index, "eat")
        assertEquals("100", index.rows[found.results.first().pos].id)
        assertTrue(found.results.any { index.rows[it.pos].id == "101" })
        assertTrue(found.results.first().score > found.results.first { index.rows[it.pos].id == "101" }.score)
    }

    @Test
    fun romajiBecomesKanaAndStillSearchesEnglish() {
        val found = jedSearch(index, "taberu")
        assertEquals("たべる", found.kana)
        assertEquals("100", index.rows[found.results.first().pos].id)
    }

    @Test
    fun aConjugatedVerbNamesItsDictionaryForm() {
        val found = jedSearch(index, "食べた")
        val hit = found.results.first { index.rows[it.pos].id == "100" }
        assertEquals("past", hit.note)
    }

    @Test
    fun wildcardsAndCharacterFilters() {
        val wild = jedSearch(index, "*べる")
        assertTrue(wild.results.any { index.rows[it.pos].id == "100" })
        val noKana = jedSearch(index, "たべる", SearchFilter(chars = CharChoices(hira = false)))
        assertTrue(noKana.results.none { index.rows[it.pos].id == "100" })
    }

    @Test
    fun categoriesAndHistoryScope() {
        val verbs = jedSearch(index, "", SearchFilter(type = "verb"))
        assertEquals(listOf("100", "101", "104"), verbs.results.map { index.rows[it.pos].id })
        val plain = jedSearch(index, "", SearchFilter(type = "nonsuru"))
        assertEquals(listOf("100", "101"), plain.results.map { index.rows[it.pos].id })
        val history = jedSearch(index, "", SearchFilter(only = setOf(index.byId.getValue("102"))))
        assertEquals(listOf("102"), history.results.map { index.rows[it.pos].id })
    }

    @Test
    fun kanjiSearchAndWords() {
        val byMeaning = searchKanji(index, "cat")
        assertEquals("猫", byMeaning.first())
        val byReading = searchKanji(index, "neko")
        assertEquals("猫", byReading.first())
        assertTrue(wordsWithKanji(index, "猫").isNotEmpty())
    }

    @Test
    fun anEmptyCatalogIsNotAnInventedEntry() {
        val empty = JedIndex(JedMeta(installed = false), emptyList(), emptyMap(), emptyList())
        assertEquals(0, jedSearch(empty, "eat").total)
        assertFalse(empty.meta.installed)
        assertFalse(WORD_LIST_MISSING.any { it.isDigit() })
    }
}

class JedShardTest {
    @Test
    fun anEntryBodyLoadsItsShardOnce() {
        val row = parseIndexLine("1\t猫\tねこ\t1\tN\tcat")!!
        var reads = 0
        val index = JedIndex(
            JedMeta(installed = true),
            listOf(row),
            emptyMap(),
            emptyList(),
        ) { shard ->
            reads++
            if (shard == 0) """[{"s":[{"g":["cat"]}]}]""" else null
        }
        assertEquals(0, reads)
        assertEquals(listOf("cat"), index.body(0).s.single().g)
        index.body(0)
        assertEquals(1, reads)
        assertEquals(JedEntryBody(), index.body(ENTRY_SHARD))
    }
}

class JedStateTest {
    @Test
    fun webViewStateIsImportedOnce() {
        val store = MemoryStore()
        val legacy = """{"lists":{"Favorites":[{"id":"102","head":"猫","kana":"ねこ","gloss":"cat"}]},"history":[{"id":"100","head":"食べる","kana":"たべる","gloss":"to eat"}],"notepad":"memo","textScale":1.15,"romaji":true,"options":{"field":"read","common":true,"chars":{"hira":true,"kata":false,"kanji":true,"latin":true}}}"""
        adoptDictionaryState(store, DictionaryLegacy.Value(legacy))
        val saved = readDictionaryState(store)
        assertTrue(saved.importedWebView)
        assertEquals("memo", saved.notepad)
        assertEquals("read", saved.field)
        assertTrue(saved.commonOnly)
        assertFalse(saved.chars.kata)
        assertEquals("100", saved.history.single().id)
        assertEquals(listOf("猫"), saved.lists.getValue("Favorites").map { it.head })
        store.write(store.read().replace("memo", "kept"))
        adoptDictionaryState(store, DictionaryLegacy.Value("""{"notepad":"other"}"""))
        assertEquals("kept", readDictionaryState(store).notepad)
    }

    @Test
    fun anUnreadableStoreIsLeftForLater() {
        val store = MemoryStore()
        adoptDictionaryState(store, DictionaryLegacy.Unreadable)
        assertFalse(readDictionaryState(store).importedWebView)
        adoptDictionaryState(store, DictionaryLegacy.Absent)
        assertTrue(readDictionaryState(store).importedWebView)
    }

    @Test
    fun tagsExportCsvAndBackOrder() {
        val file = exportTagCsv(
            mapOf("Favorites" to listOf(TagWord("1", "猫", "ねこ", "a \"cat\""))),
            listOf("Favorites"),
        )
        assertEquals("Favorites.csv", file?.first)
        assertTrue(file!!.second.contains("\"a \"\"cat\"\"\""))
        assertNull(exportTagCsv(emptyMap(), emptyList()))
        assertEquals(KanaBack.CloseSheet, dictionaryBack(sheet = true, overlays = 2, screens = 3))
        assertEquals(KanaBack.CloseDialog, dictionaryBack(false, 1, 3))
        assertEquals(KanaBack.PreviousScreen, dictionaryBack(false, 0, 2))
        assertEquals(KanaBack.Exit, dictionaryBack(false, 0, 1))
    }
}

private class MemoryStore(var text: String = "") : TextStore {
    override fun read(): String = text
    override fun write(text: String) {
        this.text = text
    }
}

private fun sampleIndex(): JedIndex {
    val lines = listOf(
        "100\t食べる\tたべる\t1\tv1,V\tto eat|to consume",
        "101\t食う\tくう\t0\tv5u,V\tto eat a meal",
        "102\t猫\tねこ\t1\tN\tcat",
        "103\t高い\tたかい\t1\tadj-i,A\thigh; tall",
        "104\t勉強する\tべんきょうする\t1\tvs-i,V\tto study",
    )
    val rows = lines.map { parseIndexLine(it)!! }
    return JedIndex(
        JedMeta(installed = true, words = rows.size, kanjiCount = 1, tags = mapOf("v1" to "Ichidan verb")),
        rows,
        mapOf("猫" to JedKanji(s = 11, on = listOf("ビョウ"), kun = listOf("ねこ"), m = listOf("cat"), f = 100, g = 2)),
        listOf(JedRadical("犭", 3, "猫")),
    )
}
