package com.squirelworks.lsd.phrasebook

import com.squirelworks.lsd.core.languages.TextStore
import com.squirelworks.lsd.core.speech.VoiceStatus
import com.squirelworks.lsd.kana.WebViewStore
import kotlin.random.Random
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue

class PhrasebookLogicTest {
    @Test
    fun katakanaQueryFoldsToHiraganaAndTheLongMarkStays() {
        assertEquals("こんにちは", toHiragana("コンニチハ"))
        assertEquals("こんにちは。", toHiragana("こんにちは。"))
        assertEquals("こーひー", toHiragana("コーヒー"))
        assertEquals("ゔぁ", toHiragana("ヴァ"))
    }

    @Test
    fun searchMatchesEnglishRomajiKanaAndKanjiAndKeepsTheFullCount() {
        val hello = phrase(
            en = "Hello. / Good afternoon.",
            ja = "こんにちは。",
            reading = "こんにちは。",
            romaji = "Konnichiwa.",
            search = "hello. / good afternoon.\nkonnichiwa.\nこんにちは。\nこんにちは。",
        )
        val water = phrase(
            key = "basic|水をください。",
            en = "Water, please.",
            ja = "水をください。",
            reading = "みずをください。",
            romaji = "Mizu o kudasai.",
            search = "water, please.\nmizuokudasai.\n水をください。\nみずをください。",
        )
        assertEquals(listOf(hello), searchPhrases(listOf(hello, water), "Konnichiwa"))
        assertEquals(listOf(hello), searchPhrases(listOf(hello, water), "コンニチハ"))
        assertEquals(listOf(water), searchPhrases(listOf(hello, water), "水"))
        assertEquals(listOf(water), searchPhrases(listOf(hello, water), "mizu"))
        assertTrue(searchPhrases(listOf(hello), "   ").isEmpty())
        assertEquals("1 match", matchCountText(1))
        assertEquals("2 matches", matchCountText(2))
        assertEquals("No phrases match “駅”.", emptySearchText(" 駅 "))
    }

    @Test
    fun ankiExportQuotesNotesAndSlugsTheCategory() {
        val phrase = phrase(en = "Say \"hi\"", note = "Casual", category = "Greetings & courtesy")
        val csv = ankiCsv(listOf(phrase))
        assertTrue(csv.startsWith("#separator:comma\n#html:true\n#tags column:3\n"))
        assertTrue(csv.contains("Say \"\"hi\"\""))
        assertTrue(csv.contains("<br><i>Casual</i>"))
        assertTrue(csv.contains("\"basic basic::Greetings_courtesy\""))
        assertEquals("basic basic::Understanding_each_other", ankiTag("basic", "Understanding each other"))
        assertTrue(csv.endsWith("\n"))
    }

    @Test
    fun againPutsTheCardThreeToFivePlacesOn() {
        val random = Random(4)
        val slot = 3 + Random(4).nextInt(3)
        val deck = FlashDeck("All", listOf("a", "b", "c", "d", "e", "f"), 6, 0, true)
        val next = deck.again(random)
        assertFalse(next.revealed)
        assertEquals(slot, next.queue.indexOf("a"))
        assertEquals(6, next.queue.size)
        val graded = deck.good()
        assertEquals("a", graded?.second)
        assertEquals(listOf("b", "c", "d", "e", "f"), graded?.first?.queue)
        assertEquals(1, graded?.first?.done)
        assertFalse(graded?.first?.revealed ?: true)
    }

    @Test
    fun japaneseSideShowsOnTheFrontOrAfterTheAnswer() {
        assertFalse(japaneseSideVisible("en-ja", revealed = false))
        assertTrue(japaneseSideVisible("en-ja", revealed = true))
        assertTrue(japaneseSideVisible("ja-en", revealed = false))
        assertFalse(japaneseSideVisible("ja-en", revealed = true))
        assertEquals(0.6f, playbackRate(1.0, slow = true))
        assertEquals(1.15f, playbackRate(1.15, slow = false))
        assertEquals("こんにちは。", spokenForVoice("こんにちは。"))
        assertEquals("わたしはスミスです。", spokenForVoice("わたし は スミス です。"))
    }

    @Test
    fun learnedPercentAndAZeroStamp() {
        assertEquals(33, learnedPercent(1, 3))
        assertEquals(67, learnedPercent(2, 3))
        assertEquals(13, learnedPercent(1, 8))
        assertFalse(isLearned(mapOf("a" to 0L), "a"))
        assertTrue(isLearned(mapOf("a" to 5L), "a"))
    }

    @Test
    fun aboutCountsTheLoadedPacks() {
        val packs = listOf(
            PhrasePack("basic", "Basic", "基本", "", emptyList()),
            PhrasePack("travel", "Travel", "旅行", "", emptyList()),
        )
        val text = phrasebookAbout(packs, 3)
        assertTrue(text.contains("3 original phrases in 2 packs: Basic, Travel."))
        assertTrue(text.contains("Nagoya Institute of Technology (CC BY 3.0)"))
        assertFalse(text.contains("1142"))
    }

    @Test
    fun voiceLineMatchesThePage() {
        assertEquals("Japanese voice ready", deviceVoiceLine(VoiceStatus.Ready))
        assertTrue(deviceVoiceLine(VoiceStatus.Missing).startsWith("no Japanese voice detected yet"))
        assertTrue(deviceVoiceLine(VoiceStatus.Pending).contains("—"))
        assertEquals("0.7×", rateLabel(0.7))
        assertEquals("0.85×", rateLabel(0.85))
        assertEquals("1×", rateLabel(1.0))
        assertEquals("1.15×", rateLabel(1.15))
    }

    @Test
    fun webViewProgressIsImportedOnce() {
        val legacy = """
            {"showKanji":false,"showRomaji":false,"rate":0.85,"recorded":false,"flashDir":"ja-en",
            "flashAutoplay":false,"favorites":["basic|こんにちは。"],"learned":{"basic|はい。":1700000000000}}
        """.trimIndent()
        val imported = importPhrasebookProgress(PhrasebookProgress(), WebViewStore.Value(legacy))
        assertFalse(imported.showKanji)
        assertFalse(imported.showRomaji)
        assertEquals(0.85, imported.rate)
        assertEquals("ja-en", imported.flashDir)
        assertEquals(listOf("basic|こんにちは。"), imported.favorites)
        assertEquals(1700000000000L, imported.learned["basic|はい。"])
        assertTrue(imported.importedWebView)
        val kept = importPhrasebookProgress(
            PhrasebookProgress(favorites = listOf("mine"), importedWebView = false),
            WebViewStore.Value(legacy),
        )
        assertEquals(listOf("mine"), kept.favorites)
        assertTrue(kept.importedWebView)
        assertEquals(
            PhrasebookProgress(showKana = false),
            importPhrasebookProgress(PhrasebookProgress(showKana = false), WebViewStore.Unreadable),
        )
        assertTrue(importPhrasebookProgress(PhrasebookProgress(), WebViewStore.Absent).importedWebView)
        assertNull(parsePhrasebookProgress("{"))
        val store = MemoryStore()
        adoptPhrasebookProgress(store, WebViewStore.Value(legacy))
        assertTrue(store.text.contains("\"importedWebView\":true") || store.text.contains("\"importedWebView\": true"))
        val again = store.text
        adoptPhrasebookProgress(store, WebViewStore.Value("""{"favorites":["other"]}"""))
        assertEquals(again, store.text)
    }

    @Test
    fun theCatalogJsonKeepsPackOrderAndTheProgressKey() {
        val raw = """
            {"accent":"#8f2d2d","store":"squirrelgo-phrasebook","packs":[
              {"id":"basic","title":"Basic","jaTitle":"基本","desc":"Greetings",
               "categories":[{"id":"0","title":"Greetings & courtesy","phrases":[
                 {"key":"basic|こんにちは。","en":"Hello.","ja":"こんにちは。","reading":"こんにちは。",
                  "spoken":"こんにちは。","romaji":"Konnichiwa.","note":"","search":"hello.","clip":"a.mp3"}]}]}
            ]}
        """.trimIndent()
        val bundle = loadPhrasebookBundle(raw, null)
        assertEquals("#8f2d2d", bundle.accent)
        assertEquals("squirrelgo-phrasebook", bundle.storeKey)
        assertEquals("Konnichiwa.", bundle.phrases.single().romaji)
        assertEquals("Greetings & courtesy", bundle.phrases.single().category)
        assertEquals("a.mp3", bundle.byKey["basic|こんにちは。"]?.clip)
    }
}

private class MemoryStore(var text: String = "") : TextStore {
    override fun read(): String = text
    override fun write(text: String) {
        this.text = text
    }
}

private fun phrase(
    key: String = "basic|こんにちは。",
    en: String = "Hello.",
    ja: String = "こんにちは。",
    reading: String = "こんにちは。",
    romaji: String = "Konnichiwa.",
    note: String = "",
    search: String = "",
    category: String = "Greetings",
) = Phrase(
    key = key,
    packId = "basic",
    packTitle = "Basic",
    category = category,
    en = en,
    ja = ja,
    reading = reading,
    spoken = reading,
    romaji = romaji,
    note = note,
    search = search,
    clip = "a.mp3",
)
