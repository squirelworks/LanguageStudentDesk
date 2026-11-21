package com.squirelworks.squirrelgobopomofo

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.squirelworks.lsd.kana.DesktopKeys
import com.squirelworks.lsd.kana.KanaApp
import com.squirelworks.lsd.kana.LocalDesktopKeys
import com.squirelworks.lsd.kana.parseKanaScripts
import com.squirelworks.lsd.kana.parseKanaStrokes

fun main() = application {
    val loader = Thread.currentThread().contextClassLoader
    val scripts = parseKanaScripts(loader.getResource("bopomofo.json")!!.readText())
    val strokes = parseKanaStrokes(loader.getResource("bopomofo-strokes.json")!!.readText())
    val keys = DesktopKeys()
    Window(
        onCloseRequest = ::exitApplication,
        onPreviewKeyEvent = keys::preview,
        title = "SquirrelGo Bopomofo",
    ) {
        CompositionLocalProvider(LocalDesktopKeys provides keys) {
            KanaApp(
                "SquirrelGo Bopomofo",
                scripts,
                strokes,
                isSystemInDarkTheme(),
                onExit = ::exitApplication,
            )
        }
    }
}
