package com.squirelworks.squirrelgophrasebook

import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState
import com.squirelworks.lsd.core.languages.FileTextStore
import com.squirelworks.lsd.kana.DesktopKeys
import com.squirelworks.lsd.kana.DesktopVoice
import com.squirelworks.lsd.kana.LocalDesktopKeys
import com.squirelworks.lsd.kana.Mp3ClipPlayer
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.phrasebook.PhrasebookApp
import com.squirelworks.lsd.phrasebook.adoptPhrasebookProgress
import com.squirelworks.lsd.phrasebook.loadPhrasebookBundle
import java.awt.Desktop
import java.awt.FileDialog
import java.awt.Frame
import java.io.File
import java.net.URI

private fun openHttps(url: String) {
    if (!url.startsWith("https://") || !Desktop.isDesktopSupported()) return
    runCatching { Desktop.getDesktop().browse(URI(url)) }
}

private fun saveCsv(csv: String): String {
    val frame = Frame()
    val dialog = FileDialog(frame, "Export phrases", FileDialog.SAVE)
    dialog.file = "squirrelgo-phrasebook.csv"
    dialog.isVisible = true
    val name = dialog.file
    val dir = dialog.directory
    dialog.dispose()
    frame.dispose()
    if (name.isNullOrBlank() || dir.isNullOrBlank()) return ""
    return try {
        File(dir, name).writeText(csv, Charsets.UTF_8)
        "Saved"
    } catch (_: Exception) {
        "Could not save file"
    }
}

fun main(args: Array<String>) = application {
    val loader = Thread.currentThread().contextClassLoader
    fun text(name: String) = loader.getResource(name)?.readText() ?: error("Missing Phrasebook data $name")
    val bundle = loadPhrasebookBundle(text("phrasebook.json"), text("suite.json"))
    val player = Mp3ClipPlayer { path -> loader.getResourceAsStream(path) }
    val voice = DesktopVoice("phrasebook")
    val progress = FileTextStore(File(System.getProperty("user.home"), ".squirrelgo/phrasebook-progress.json"))
    adoptPhrasebookProgress(progress, WebViewStore.Absent)
    val incoming = args.firstOrNull { it.startsWith("--query=") }?.substringAfter("=")
    val generation = if (incoming.isNullOrBlank()) 0 else 1
    val keys = DesktopKeys()
    Window(
        onCloseRequest = {
            player.stop()
            voice.stop()
            exitApplication()
        },
        onPreviewKeyEvent = keys::preview,
        title = "SquirrelGo Phrasebook",
        state = rememberWindowState(width = 960.dp, height = 800.dp),
    ) {
        CompositionLocalProvider(LocalDesktopKeys provides keys) {
            PhrasebookApp(
                bundle = bundle,
                progressStore = progress,
                playClip = { path, rate ->
                    voice.stop()
                    player.play(path, rate)
                },
                speak = { text, rate, lang ->
                    player.stop()
                    voice.speak(text, rate, lang)
                },
                voiceStatus = { voice.status("ja-JP") },
                onStopAudio = {
                    player.stop()
                    voice.stop()
                },
                onExport = { csv, notify ->
                    val message = saveCsv(csv)
                    if (message.isNotBlank()) notify(message)
                },
                initialQuery = incoming,
                queryGeneration = generation,
                onOpenUrl = ::openHttps,
            )
        }
    }
}
