package com.squirelworks.squirrelgokanji

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.squirelworks.lsd.core.languages.FileTextStore
import com.squirelworks.lsd.kana.DesktopKeys
import com.squirelworks.lsd.kana.DesktopVoice
import com.squirelworks.lsd.kana.LocalDesktopKeys
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.kanji.KanjiApp
import com.squirelworks.lsd.kanji.adoptKanjiProgress
import com.squirelworks.lsd.kanji.loadKanjiBundle
import java.awt.Desktop
import java.io.File
import java.net.URI

private fun openHttps(url: String) {
    if (!url.startsWith("https://") || !Desktop.isDesktopSupported()) return
    runCatching { Desktop.getDesktop().browse(URI(url)) }
}

fun main(args: Array<String>) = application {
    val loader = Thread.currentThread().contextClassLoader
    fun text(name: String) = loader.getResource(name)?.readText()
        ?: error("Missing Kanji data $name")
    val bundle = loadKanjiBundle(
        text("kanji.json"),
        text("catalog.json"),
        text("lessons.json"),
        text("words.json"),
        text("strokes.json"),
        text("suite.json"),
    )
    val voice = DesktopVoice("kanji")
    val progress = FileTextStore(File(System.getProperty("user.home"), ".squirrelgo/kanji-progress.json"))
    adoptKanjiProgress(progress, WebViewStore.Absent)
    val query = args.firstOrNull { it.startsWith("--query=") }?.substringAfter("=")
    val keys = DesktopKeys()
    Window(
        onCloseRequest = ::exitApplication,
        onPreviewKeyEvent = keys::preview,
        title = "SquirrelGo Kanji",
    ) {
        CompositionLocalProvider(LocalDesktopKeys provides keys) {
            KanjiApp(
                bundle = bundle,
                dark = isSystemInDarkTheme(),
                progressStore = progress,
                initialQuery = query,
                speak = { text, rate, lang ->
                    voice.speak(text, rate, lang)
                },
                onOpenUrl = ::openHttps,
                onStopAudio = voice::stop,
            )
        }
    }
}
