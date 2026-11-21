package com.squirelworks.lsd.bible

import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.compose.ui.test.runDesktopComposeUiTest
import com.squirelworks.lsd.core.languages.TextStore
import java.awt.image.BufferedImage
import java.io.File
import javax.imageio.ImageIO
import kotlin.test.Test
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.jsonObject

@OptIn(ExperimentalTestApi::class)
class BibleScreensTest {
    @Test
    fun keyScreens() = runTest {
        val books = bibleJson.decodeFromString<List<BookMeta>>(quoteKeys(jsonSlice(repoFile("www/data/books.js"))))
        val lectionary = bibleJson.parseToJsonElement(jsonSlice(repoFile("www/data/lectionary.js"))).jsonObject
        val sample = """
            {"id":"sample","name":"Sample English","lang":"en","dir":"ltr","versification":"kjv",
             "books":{"JHN":[["In the beginning was the Word.","And the Word was with God.","All things were made by him."]],
                      "GEN":[["In the beginning God created the heaven and the earth.","And the earth was without form."]]}}
        """.trimIndent()
        val bundle = BibleBundle(
            books = books,
            catalog = BibleCatalog(
                bibles = listOf(CatalogBible(id = "sample", name = "Sample English", lang = "en", testaments = "OT,NT")),
            ),
            versification = emptyMap(),
            lectionary = lectionary,
            suite = null,
        )
        val out = File("/tmp/bible-screens").apply { mkdirs() }
        runDesktopComposeUiTest(width = 1100, height = 800) {
            setContent {
                BibleApp(
                    bundle = bundle,
                    readBible = { if (it == "sample") sample else null },
                    readCommentary = { null },
                    settingsStore = ScreenStore(),
                    contentStore = ScreenStore(),
                    packs = ScreenPacks(),
                )
            }
            waitUntil(timeoutMillis = 5_000) {
                onAllNodesWithText("In the beginning was the Word.", substring = true).fetchSemanticsNodes().isNotEmpty()
            }
            save(out, "reader")
            onNodeWithText("Matthew").performClick()
            waitForIdle()
            save(out, "books")
            onNodeWithText("In the beginning was the Word.", substring = true).performClick()
            waitUntil(timeoutMillis = 5_000) {
                onAllNodesWithText("In every language").fetchSemanticsNodes().isNotEmpty()
            }
            save(out, "verse")
            onNodeWithText("☆ Bookmark").performClick()
            waitForIdle()
            save(out, "verse-marked")
            onAllNodesWithText("‹")[0].performClick()
            waitForIdle()
            onNodeWithText("🌐").performClick()
            waitForIdle()
            save(out, "settings")
            onAllNodesWithText("‹")[0].performClick()
            waitForIdle()
            onNodeWithText("⌕").performClick()
            onNodeWithText("Words or a reference", substring = true).performTextInput("Word")
            waitUntil(timeoutMillis = 5_000) {
                onAllNodesWithText("John 1:1").fetchSemanticsNodes().isNotEmpty()
            }
            save(out, "search")
            onAllNodesWithText("‹")[0].performClick()
            waitForIdle()
            onNodeWithText("📅").performClick()
            waitUntil(timeoutMillis = 5_000) {
                onAllNodesWithText("Readings").fetchSemanticsNodes().isNotEmpty()
            }
            save(out, "today")
        }
    }

    @Test
    fun phoneThemesStayReadable() = runTest {
        val books = bibleJson.decodeFromString<List<BookMeta>>(quoteKeys(jsonSlice(repoFile("www/data/books.js"))))
        val lectionary = bibleJson.parseToJsonElement(jsonSlice(repoFile("www/data/lectionary.js"))).jsonObject
        val sample = """
            {"id":"sample","name":"Sample English","lang":"en","dir":"ltr","versification":"kjv",
             "books":{"JHN":[["In the beginning was the Word.","And the Word was with God.","All things were made by him."]]}}
        """.trimIndent()
        val bundle = BibleBundle(
            books = books,
            catalog = BibleCatalog(bibles = listOf(CatalogBible(id = "sample", name = "Sample English", lang = "en", testaments = "NT"))),
            versification = emptyMap(),
            lectionary = lectionary,
            suite = null,
        )
        val out = File("/tmp/bible-screens").apply { mkdirs() }
        for ((label, width) in listOf("phone" to 412, "desk" to 1100)) {
            for (theme in listOf("dark", "light")) {
            val settings = ScreenStore()
            writeBibleSettings(
                settings,
                BibleSettings(
                    primary = "sample",
                    theme = theme,
                    last = LastPlace("JHN", 1),
                    bookmarks = listOf("JHN.1.1"),
                    notes = mapOf("JHN.1.1" to "A note"),
                    highlights = mapOf("JHN.1.1" to "gold"),
                ),
            )
            runDesktopComposeUiTest(width = width, height = 900) {
                setContent {
                    BibleApp(
                        bundle = bundle,
                        readBible = { if (it == "sample") sample else null },
                        readCommentary = { null },
                        settingsStore = settings,
                        contentStore = ScreenStore(),
                        packs = ScreenPacks(),
                    )
                }
                waitUntil(timeoutMillis = 5_000) {
                    onAllNodesWithText("In the beginning was the Word.", substring = true).fetchSemanticsNodes().isNotEmpty()
                }
                save(out, "$label-$theme-reader")
                onNodeWithText("In the beginning was the Word.", substring = true).performClick()
                waitUntil(timeoutMillis = 5_000) {
                    onAllNodesWithText("Open in chapter").fetchSemanticsNodes().isNotEmpty()
                }
                if (width < 700) {
                    val copy = onNodeWithText("Copy").fetchSemanticsNode()
                    check(copy.size.height < 80) { "Copy is ${copy.size.height}px tall" }
                    check(onNodeWithText("John 1:1").fetchSemanticsNode().size.width > 60)
                }
                save(out, "$label-$theme-verse")
                onAllNodesWithText("‹")[0].performClick()
                waitForIdle()
                onNodeWithContentDescription("Bookmarks and notes").performClick()
                waitUntil(timeoutMillis = 5_000) {
                    onAllNodesWithText("A note", substring = true).fetchSemanticsNodes().isNotEmpty()
                }
                save(out, "$label-$theme-saved")
                onAllNodesWithText("‹")[0].performClick()
                waitForIdle()
                onNodeWithContentDescription("Today's readings").performClick()
                waitUntil(timeoutMillis = 5_000) {
                    onAllNodesWithText("Readings").fetchSemanticsNodes().isNotEmpty()
                }
                save(out, "$label-$theme-today")
                onAllNodesWithText("‹")[0].performClick()
                waitForIdle()
                onNodeWithContentDescription("Translations").performClick()
                waitUntil(timeoutMillis = 5_000) {
                    onAllNodesWithText("Sample English").fetchSemanticsNodes().isNotEmpty()
                }
                save(out, "$label-$theme-settings")
            }
            val ink = if (theme == "dark") 0xECE4D8 else 0x1D1A17
            for (screen in listOf("reader", "verse", "saved", "today", "settings")) {
                check(imageHasColor(File(out, "$label-$theme-$screen.png"), ink)) { "$label $theme $screen has no ink-coloured text" }
            }
            }
        }
    }

    private fun androidx.compose.ui.test.DesktopComposeUiTest.save(dir: File, name: String) {
        val image = captureToImage()
        val file = File(dir, "$name.png")
        ImageIO.write(image.toBuffered(), "png", file)
    }

    private fun ImageBitmap.toBuffered(): BufferedImage {
        val pixels = IntArray(width * height)
        readPixels(pixels)
        return BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB).apply {
            setRGB(0, 0, width, height, pixels, 0, width)
        }
    }
}

private fun imageHasColor(file: File, rgb: Int): Boolean {
    val image = javax.imageio.ImageIO.read(file)
    val targetR = (rgb shr 16) and 0xFF
    val targetG = (rgb shr 8) and 0xFF
    val targetB = rgb and 0xFF
    var hits = 0
    var y = 80
    while (y < image.height) {
        var x = 16
        while (x < image.width - 16) {
            val pixel = image.getRGB(x, y)
            val distance = kotlin.math.abs(((pixel shr 16) and 0xFF) - targetR) +
                kotlin.math.abs(((pixel shr 8) and 0xFF) - targetG) +
                kotlin.math.abs((pixel and 0xFF) - targetB)
            if (distance < 48) hits += 1
            x += 3
        }
        y += 3
    }
    return hits > 30
}

private class ScreenStore : TextStore {
    private var text = ""
    override fun read(): String = text
    override fun write(text: String) {
        this.text = text
    }
}

private class ScreenPacks : PackStore {
    private val files = HashMap<String, String>()
    override fun keys(): Set<String> = files.keys
    override fun read(key: String): String? = files[key]
    override fun write(key: String, text: String) {
        files[key] = text
    }
    override fun remove(key: String) {
        files.remove(key)
    }
}

private fun repoFile(relative: String): File {
    var dir: File? = File("").absoluteFile
    repeat(8) {
        val current = dir ?: return@repeat
        val candidate = File(current, "SquirrelGo-Apps/squirrelgo-orthodox-bible/$relative")
        if (candidate.isFile) return candidate
        dir = current.parentFile
    }
    error("missing $relative")
}

private fun quoteKeys(json: String): String {
    val quoted = Regex("""([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:""").replace(json) { "${it.groupValues[1]}\"${it.groupValues[2]}\":" }
    return Regex(""",(\s*[}\]])""").replace(quoted) { it.groupValues[1] }
}

private fun jsonSlice(file: File): String {
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
    error("no json in ${file.path}")
}
