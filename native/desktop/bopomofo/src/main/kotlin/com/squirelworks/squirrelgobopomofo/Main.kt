package com.squirelworks.squirrelgobopomofo

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.squirelworks.lsd.kana.KanaApp
import com.squirelworks.lsd.kana.parseKanaScripts
import com.squirelworks.lsd.kana.parseKanaStrokes

fun main() = application {
    val loader = Thread.currentThread().contextClassLoader
    val scripts = parseKanaScripts(loader.getResource("bopomofo.json")!!.readText())
    val strokes = parseKanaStrokes(loader.getResource("bopomofo-strokes.json")!!.readText())
    Window(onCloseRequest = ::exitApplication, title = "SquirrelGo Bopomofo") {
        KanaApp("SquirrelGo Bopomofo", scripts, strokes, isSystemInDarkTheme())
    }
}
