package com.squirelworks.squirrelgodictionary

import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.squirelworks.lsd.core.languages.FileTextStore
import com.squirelworks.lsd.dictionary.DictionaryLegacy
import com.squirelworks.lsd.dictionary.EnglishDictionaryApp
import com.squirelworks.lsd.dictionary.adoptDictionaryState
import com.squirelworks.lsd.dictionary.loadJedIndex
import com.squirelworks.lsd.kana.DesktopKeys
import com.squirelworks.lsd.kana.DesktopVoice
import com.squirelworks.lsd.kana.EscapeBackEffect
import com.squirelworks.lsd.kana.LocalDesktopKeys
import com.squirelworks.lsd.kana.SuiteSheet
import com.squirelworks.lsd.kana.parseSuite
import java.awt.Desktop
import java.awt.FileDialog
import java.awt.Frame
import java.awt.Toolkit
import java.awt.datatransfer.StringSelection
import java.io.File
import java.net.URI

private fun openHttps(url: String) {
    if (!url.startsWith("https://") || !Desktop.isDesktopSupported()) return
    runCatching { Desktop.getDesktop().browse(URI(url)) }
}

fun main(args: Array<String>) {
    if (args.firstOrNull() == "--shots") {
        renderDictionaryShots(java.io.File(args.getOrElse(1) { "/tmp/jed-shots" }))
        return
    }
    application {
    val loader = Thread.currentThread().contextClassLoader
    fun text(name: String) = loader.getResource(name)?.readText() ?: error("Missing dictionary data $name")
    val index = loadJedIndex(
        text("jed-meta.json"),
        text("jed-index.json"),
        text("jed-entries.json"),
        text("jed-kanji.json"),
        text("jed-radicals.json"),
    )
    val suite = parseSuite(text("suite.json"))
    val voice = DesktopVoice("dictionary")
    val state = FileTextStore(File(System.getProperty("user.home"), ".squirrelgo/dictionary-state.json"))
    adoptDictionaryState(state, DictionaryLegacy.Absent)
    val query = args.firstOrNull { it.startsWith("--query=") }?.substringAfter("=")
    val keys = DesktopKeys()
    var backEnabled by mutableStateOf(false)
    var backAction: () -> Unit = {}
    Window(onCloseRequest = ::exitApplication, onPreviewKeyEvent = keys::preview, title = "SquirrelGo Japanese-English Dictionary") {
        CompositionLocalProvider(LocalDesktopKeys provides keys) {
            EscapeBackEffect(backEnabled) { backAction() }
            EnglishDictionaryApp(
                index = index,
                store = state,
                speak = { voice.speak(it, 1f, "ja-JP") },
                onStopAudio = voice::stop,
                onCopy = { value ->
                    runCatching {
                        Toolkit.getDefaultToolkit().systemClipboard.setContents(StringSelection(value), null)
                    }.isSuccess
                },
                onExport = export@{ name, csv ->
                    val dialog = FileDialog(null as Frame?, "Export tag(s)", FileDialog.SAVE)
                    dialog.file = name
                    dialog.isVisible = true
                    val chosen = dialog.file ?: return@export ""
                    val dir = dialog.directory ?: return@export ""
                    val wrote = runCatching { File(dir, chosen).writeText(csv) }.isSuccess
                    if (wrote) "Data successfully exported" else "Could not save file"
                },
                apps = suite.apps,
                installed = null,
                onLaunchApp = { _, _ -> false },
                onOpenUrl = ::openHttps,
                onBackState = { enabled, action ->
                    backEnabled = enabled
                    backAction = action
                },
                suiteSheet = { notice, onOpen, onClose ->
                    SuiteSheet(suite, "dictionary", null, notice, onOpen, ::openHttps, onClose)
                },
                initialQuery = query,
            )
        }
    }
    }
}

private fun renderDictionaryShots(dir: File) {
    dir.mkdirs()
    val loader = Thread.currentThread().contextClassLoader
    fun text(name: String) = loader.getResource(name)?.readText() ?: error("Missing dictionary data $name")
    val empty = loadJedIndex(text("jed-meta.json"), text("jed-index.json"), text("jed-entries.json"), text("jed-kanji.json"), text("jed-radicals.json"))
    val sample = loadJedIndex(
        """{"installed":true,"words":2,"kanjiCount":1,"jmdictDate":"2024-01-01","kanjidicDate":"2024-01-01","version":"preview","tags":{"v1":"Ichidan verb"}}""",
        """["100\t食べる\tたべる\t1\tv1,V\tto eat|to consume","102\t猫\tねこ\t1\tN\tcat"]""",
        """[{"s":[{"g":["to eat","to consume"],"p":["v1"]}],"x":[["ご飯を食べる","to eat a meal"]]},{"s":[{"g":["cat"],"p":["n"]}]}]""",
        """{"猫":{"s":11,"on":["ビョウ"],"kun":["ねこ"],"m":["cat"],"g":2,"f":100}}""",
        """[{"r":"犭","s":3,"k":"猫"}]""",
    )
    val store = FileTextStore(File(dir, "state.json"))
    adoptDictionaryState(store, DictionaryLegacy.Absent)
    fun shot(name: String, index: com.squirelworks.lsd.dictionary.JedIndex, query: String?, kind: String?) {
        val scene = androidx.compose.ui.ImageComposeScene(1100, 780, androidx.compose.ui.unit.Density(1.5f)) {
            EnglishDictionaryApp(
                index = index,
                store = store,
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
                initialQuery = query,
                shot = kind,
            )
        }
        val image = scene.render()
        File(dir, "$name.png").writeBytes(image.encodeToData(org.jetbrains.skia.EncodedImageFormat.PNG)!!.bytes)
        scene.close()
    }
    shot("search-missing", empty, null, null)
    shot("search", sample, "eat", null)
    shot("detail", sample, null, "detail")
    shot("menu", sample, null, "menu")
    shot("kana", sample, null, "kana")
    shot("settings", sample, null, "settings")
    shot("kanji", sample, null, "kanji")
    shot("about", sample, null, "about")
}
