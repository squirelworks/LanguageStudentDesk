package com.squirelworks.lsd.dictionary

import androidx.compose.ui.ImageComposeScene
import androidx.compose.ui.unit.Density
import com.squirelworks.lsd.core.languages.TextStore
import kotlin.test.Test
import kotlin.test.assertTrue

class JedScreenTest {
    @Test
    fun theSearchScreenRendersAResult() {
        val row = parseIndexLine("100\t食べる\tたべる\t1\tv1,V\tto eat")!!
        val index = JedIndex(
            JedMeta(installed = true, words = 1),
            listOf(row),
            emptyMap(),
            emptyList(),
        )
        val scene = ImageComposeScene(900, 700, Density(1f)) {
            EnglishDictionaryApp(
                index = index,
                store = MemoryText(),
                speak = { com.squirelworks.lsd.core.speech.SpeechOutcome.Spoken },
                onStopAudio = {},
                onCopy = { true },
                onExport = { _, _ -> "" },
                apps = emptyList(),
                installed = emptySet(),
                onLaunchApp = { _, _ -> false },
                onOpenUrl = {},
                onBackState = { _, _ -> },
                suiteSheet = { _, _, _ -> },
                initialQuery = "eat",
            )
        }
        val image = scene.render()
        val png = image.encodeToData(org.jetbrains.skia.EncodedImageFormat.PNG)!!.bytes
        scene.close()
        assertTrue(image.width == 900 && image.height == 700)
        assertTrue(png.size > 1000)
    }
}

private class MemoryText : TextStore {
    override fun read(): String = ""
    override fun write(text: String) = Unit
}
