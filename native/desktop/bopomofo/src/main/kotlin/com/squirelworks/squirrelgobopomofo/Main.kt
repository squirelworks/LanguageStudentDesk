package com.squirelworks.squirrelgobopomofo

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.squirelworks.lsd.core.languages.FileTextStore
import com.squirelworks.lsd.kana.DesktopKeys
import com.squirelworks.lsd.kana.DesktopVoice
import com.squirelworks.lsd.kana.KanaApp
import com.squirelworks.lsd.kana.Mp3ClipPlayer
import com.squirelworks.lsd.kana.LocalDesktopKeys
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.kana.adoptWebViewProgress
import com.squirelworks.lsd.kana.parseKanaCopy
import com.squirelworks.lsd.kana.parseKanaScripts
import com.squirelworks.lsd.kana.parseKanaStrokes
import com.squirelworks.lsd.kana.parseSuite
import java.awt.Desktop
import java.io.File
import java.net.URI

private fun openHttps(url: String) {
    if (!url.startsWith("https://") || !Desktop.isDesktopSupported()) return
    runCatching { Desktop.getDesktop().browse(URI(url)) }
}

fun main(args: Array<String>) = application {
    val loader = Thread.currentThread().contextClassLoader
    val scripts = parseKanaScripts(loader.getResource("bopomofo.json")!!.readText())
    val strokes = parseKanaStrokes(loader.getResource("bopomofo-strokes.json")!!.readText())
    val copy = loader.getResource("app.json")?.readText()?.let { parseKanaCopy(it) }
    val suite = loader.getResource("suite.json")?.readText()?.let { parseSuite(it) }
    val player = Mp3ClipPlayer { path -> loader.getResourceAsStream(path) }
    val voice = DesktopVoice("bopomofo")
    val progress = FileTextStore(File(System.getProperty("user.home"), ".squirrelgo/bopomofo-progress.json"))
    adoptWebViewProgress(progress, WebViewStore.Absent)
    val query = args.firstOrNull { it.startsWith("--query=") }?.substringAfter("=")
    val keys = DesktopKeys()
    Window(
        onCloseRequest = ::exitApplication,
        onPreviewKeyEvent = keys::preview,
        title = copy?.name ?: "SquirrelGo Bopomofo",
    ) {
        CompositionLocalProvider(LocalDesktopKeys provides keys) {
            KanaApp(
                title = copy?.name?.ifBlank { null } ?: "SquirrelGo Bopomofo",
                scripts = scripts,
                strokes = strokes,
                dark = isSystemInDarkTheme(),
                playClip = { path, rate ->
                    voice.stop()
                    player.play(path, rate)
                },
                speakFallback = { text, rate, lang ->
                    player.stop()
                    voice.speak(text, rate, lang)
                },
                progressStore = progress,
                initialQuery = query,
                intro = copy?.intro.orEmpty(),
                about = copy?.about.orEmpty(),
                canSpeak = true,
                suite = suite,
                suiteId = "bopomofo",
                onOpenUrl = ::openHttps,
                onStopAudio = {
                    player.stop()
                    voice.stop()
                },
            )
        }
    }
}
