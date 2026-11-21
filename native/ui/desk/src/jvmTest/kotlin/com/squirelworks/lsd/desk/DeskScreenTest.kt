package com.squirelworks.lsd.desk

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.graphics.toAwtImage
import androidx.compose.ui.test.captureToImage
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onRoot
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.runComposeUiTest
import androidx.compose.ui.unit.dp
import com.squirelworks.lsd.core.desk.parseDeskCatalog
import java.io.File
import javax.imageio.ImageIO
import com.squirelworks.lsd.core.desk.DeskCatalog
import com.squirelworks.lsd.core.desk.DeskCourse
import com.squirelworks.lsd.core.desk.DeskFeature
import com.squirelworks.lsd.core.desk.DeskLanguage
import com.squirelworks.lsd.core.desk.DeskLearner
import com.squirelworks.lsd.core.desk.DeskLevel
import com.squirelworks.lsd.core.desk.DeskSettings
import com.squirelworks.lsd.core.desk.DeskText
import com.squirelworks.lsd.core.languages.FavoriteLanguages
import com.squirelworks.lsd.core.languages.MemoryFavoriteStore
import kotlin.test.Test
import kotlin.test.assertEquals

class DeskScreenTest {
    @OptIn(ExperimentalTestApi::class)
    @Test
    fun phoneTabsAndOpeningALearner() = runComposeUiTest {
        var opened: Pair<String, String>? = null
        setContent {
            Box(Modifier.size(360.dp, 800.dp)) {
                DeskApp(
                    catalog = sample(),
                    settings = DeskSettings(level = "simple", welcomeDone = true, noticeDismissed = true, suiteLang = "latin"),
                    favorites = FavoriteLanguages(MemoryFavoriteStore(setOf("latin"))),
                    onSettings = {},
                    onFavorites = {},
                    onOpenLearner = { learner, lang -> opened = learner.id to lang },
                )
            }
        }
        onNodeWithText("Language Student Desk").assertExists()
        onNodeWithText("Klingon (tlhIngan Hol)").assertExists()
        onNodeWithText("Favorites").performClick()
        onNodeWithText("Star a language to pin it at the top of every language menu on this device.").assertExists()
        onNodeWithText("Latin · Latina").assertExists()
        onNodeWithText("Settings").performClick()
        onNodeWithText("Show").assertExists()
        onNodeWithText("• Simple").assertExists()
        onNodeWithText("Tools").performClick()
        onNodeWithText("Klingon (tlhIngan Hol)").performClick()
        assertEquals("klingon" to "", opened)
        onNodeWithText("Language Learner").performClick()
        assertEquals("language" to "latin", opened)
    }

    @OptIn(ExperimentalTestApi::class)
    @Test
    fun realCatalogRendersAtPhoneWidth() = runComposeUiTest {
        val catalogFile = listOf(
            File("../../build/generated-desk/desk.json"),
            File("build/generated-desk/desk.json"),
        ).firstOrNull { it.isFile } ?: return@runComposeUiTest
        val catalog = parseDeskCatalog(catalogFile.readText())
        setContent {
            Box(Modifier.size(412.dp, 900.dp)) {
                DeskApp(
                    catalog = catalog,
                    settings = com.squirelworks.lsd.core.desk.DeskSettings(
                        level = catalog.defaultLevel.ifBlank { "simple" },
                        welcomeDone = true,
                        noticeDismissed = true,
                    ),
                    favorites = FavoriteLanguages(MemoryFavoriteStore()),
                    onSettings = {},
                    onFavorites = {},
                    onOpenLearner = { _, _ -> },
                )
            }
        }
        onNodeWithText("Language Student Desk").assertExists()
        onNodeWithText("• Tools").assertExists()
        onNodeWithText("Open scoped tools in").assertExists()
        val image = onRoot().captureToImage().toAwtImage()
        val out = File("build/reports/desk-phone.png")
        out.parentFile.mkdirs()
        ImageIO.write(image, "png", out)
        assertEquals(412, image.width)
    }
}

private fun sample() = DeskCatalog(
    levels = listOf(DeskLevel("simple", "Simple", "The everyday set")),
    defaultLevel = "simple",
    features = listOf(DeskFeature("alpha", "Alpha features", "Shown in Simple", "simple")),
    featured = listOf("latin"),
    text = DeskText(welcomeTitle = "Welcome", welcomeBody = "Pick a language.", notice = ""),
    languages = listOf(DeskLanguage("latin", "Latin", "Latina", shipped = true)),
    courses = listOf(DeskCourse("python", "Python")),
    learners = listOf(
        DeskLearner(
            "klingon",
            "Klingon (tlhIngan Hol)",
            "pIqaD alphabet, handwriting, numbers, vocabulary, grammar, reader and quizzes.",
            "klingon/index.html",
            scoped = false,
        ),
        DeskLearner(
            "language",
            "Language Learner",
            "A guided path per language: script, first words, grammar, then practice.",
            "language-learner/index.html",
            scoped = true,
        ),
    ),
)
