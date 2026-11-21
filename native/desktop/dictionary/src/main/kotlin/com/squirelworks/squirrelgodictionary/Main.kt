package com.squirelworks.squirrelgodictionary

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.squirelworks.lsd.core.languages.FileTextStore
import com.squirelworks.lsd.dictionary.DictionaryLegacy
import com.squirelworks.lsd.dictionary.EnglishDictionaryApp
import com.squirelworks.lsd.dictionary.JedIndex
import com.squirelworks.lsd.dictionary.adoptDictionaryState
import com.squirelworks.lsd.dictionary.loadJedIndex
import com.squirelworks.lsd.kana.DesktopKeys
import com.squirelworks.lsd.kana.DesktopVoice
import com.squirelworks.lsd.kana.EscapeBackEffect
import com.squirelworks.lsd.kana.LocalDesktopKeys
import com.squirelworks.lsd.kana.SuiteSheet
import com.squirelworks.lsd.kana.parseSuite
import java.awt.Desktop
import java.awt.EventQueue
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

fun main(args: Array<String>) = application {
    val loader = Thread.currentThread().contextClassLoader
    fun text(name: String) = loader.getResource(name)?.readText() ?: error("Missing dictionary data $name")
    val suite = parseSuite(text("suite.json"))
    val voice = DesktopVoice("dictionary")
    val state = FileTextStore(File(System.getProperty("user.home"), ".squirrelgo/dictionary-state.json"))
    val query = args.firstOrNull { it.startsWith("--query=") }?.substringAfter("=")
    val keys = DesktopKeys()
    var backEnabled by mutableStateOf(false)
    var backAction: () -> Unit = {}
    var index by mutableStateOf<JedIndex?>(null)
    var loadFailed by mutableStateOf(false)
    Thread({
        adoptDictionaryState(state, DictionaryLegacy.Absent)
        val loaded = runCatching {
            loadJedIndex(
                text("jed-meta.json"),
                text("jed-index.txt"),
                text("jed-kanji.json"),
                text("jed-radicals.json"),
            ) { shard ->
                loader.getResource("jed-entries/%02d.json".format(shard))?.readText()
            }
        }
        EventQueue.invokeLater {
            loaded.onSuccess { index = it }.onFailure { loadFailed = true }
        }
    }, "dictionary-load").apply { isDaemon = true }.start()
    Window(onCloseRequest = ::exitApplication, onPreviewKeyEvent = keys::preview, title = "SquirrelGo Japanese-English Dictionary") {
        CompositionLocalProvider(LocalDesktopKeys provides keys) {
            val ready = index
            if (ready == null) {
                Box(Modifier.fillMaxSize().background(Color.Black), contentAlignment = Alignment.Center) {
                    Text(
                        if (loadFailed) "The word list isn't installed in this copy." else "Loading dictionary…",
                        color = Color.White,
                    )
                }
            } else {
                EscapeBackEffect(backEnabled) { backAction() }
                EnglishDictionaryApp(
                    index = ready,
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
