package com.squirelworks.lsd.phrasebook

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.compose.ui.test.runComposeUiTest
import androidx.compose.ui.unit.dp
import com.squirelworks.lsd.core.languages.TextStore
import kotlin.test.Test

class PhrasebookScreenTest {
    @OptIn(ExperimentalTestApi::class)
    @Test
    fun packsSearchFlashcardsAndSettings() = runComposeUiTest {
        val store = ScreenMemory()
        setContent {
            Box(Modifier.size(900.dp, 720.dp)) {
                PhrasebookApp(bundle = sample(), progressStore = store)
            }
        }
        onNodeWithText("Basic").assertExists()
        onNodeWithText("Search English, romaji, kana or kanji").assertExists()
        onNodeWithText("Basic").performClick()
        onNodeWithText("Greetings").performClick()
        onNodeWithText("Konnichiwa.").assertExists()
        onNodeWithText("Flashcards").performClick()
        onNodeWithText("Show answer").assertExists()
        onNodeWithContentDescription("Back").performClick()
        onNodeWithContentDescription("Back").performClick()
        onNodeWithContentDescription("Back").performClick()
        onNodeWithText("Search English, romaji, kana or kanji").performTextInput("mizu")
        onNodeWithText("Water, please.").assertExists()
        onNodeWithText("Hello.").assertDoesNotExist()
        onNodeWithContentDescription("Settings").performClick()
        onNodeWithText("Recorded voice").assertExists()
        onNodeWithText("Export all phrases (Anki CSV)").assertExists()
    }
}

private class ScreenMemory(var text: String = "") : TextStore {
    override fun read(): String = text
    override fun write(text: String) {
        this.text = text
    }
}

private fun sample(): PhrasebookBundle {
    val hello = Phrase(
        key = "basic|こんにちは。",
        packId = "basic",
        packTitle = "Basic",
        category = "Greetings",
        en = "Hello.",
        ja = "こんにちは。",
        reading = "こんにちは。",
        spoken = "こんにちは。",
        romaji = "Konnichiwa.",
        note = "A daytime greeting.",
        search = "hello.\nkonnichiwa.\nこんにちは。\nこんにちは。",
        clip = "",
    )
    val water = Phrase(
        key = "basic|水をください。",
        packId = "basic",
        packTitle = "Basic",
        category = "Food",
        en = "Water, please.",
        ja = "水をください。",
        reading = "みずをください。",
        spoken = "みず を ください。",
        romaji = "Mizu o kudasai.",
        note = "",
        search = "water, please.\nmizuokudasai.\n水をください。\nみずをください。",
        clip = "",
    )
    val pack = PhrasePack(
        id = "basic",
        title = "Basic",
        jaTitle = "基本",
        desc = "Greetings and getting by.",
        categories = listOf(
            PhraseCategory("0", "Greetings", listOf(hello)),
            PhraseCategory("1", "Food", listOf(water)),
        ),
    )
    return PhrasebookBundle(
        packs = listOf(pack),
        phrases = listOf(hello, water),
        byKey = listOf(hello, water).associateBy { it.key },
        accent = "#8f2d2d",
        storeKey = "squirrelgo-phrasebook",
        suite = null,
    )
}
