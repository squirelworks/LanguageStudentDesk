package com.squirelworks.squirrelgokana

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.squirelworks.lsd.core.languages.FileTextStore
import com.squirelworks.lsd.kana.KanaApp
import com.squirelworks.lsd.kana.parseKanaAudio
import com.squirelworks.lsd.kana.parseKanaCopy
import com.squirelworks.lsd.kana.parseKanaScripts
import com.squirelworks.lsd.kana.parseKanaStrokes
import java.io.File

fun main(args: Array<String>) = application {
    val loader = Thread.currentThread().contextClassLoader
    val scripts = parseKanaScripts(loader.getResource("kana.json")!!.readText())
    val strokes = parseKanaStrokes(loader.getResource("kana-strokes.json")!!.readText())
    val clips = loader.getResource("kana-audio.json")?.readText()?.let { parseKanaAudio(it) } ?: emptyMap()
    val copy = loader.getResource("app.json")?.readText()?.let { parseKanaCopy(it) }
    val player = Mp3ClipPlayer { path -> loader.getResourceAsStream(path) }
    val progress = FileTextStore(File(System.getProperty("user.home"), ".squirrelgo/kana-progress.json"))
    val query = args.firstOrNull { it.startsWith("--query=") }?.substringAfter("=")
    Window(onCloseRequest = ::exitApplication, title = copy?.name ?: "SquirrelGo Kana") {
        KanaApp(
            title = copy?.name?.ifBlank { null } ?: "SquirrelGo Kana",
            scripts = scripts,
            strokes = strokes,
            dark = isSystemInDarkTheme(),
            clips = clips,
            playClip = player::play,
            progressStore = progress,
            initialQuery = query,
            intro = copy?.intro.orEmpty(),
            about = copy?.about.orEmpty(),
        )
    }
}
