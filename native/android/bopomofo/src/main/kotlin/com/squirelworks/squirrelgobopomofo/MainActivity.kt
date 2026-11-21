package com.squirelworks.squirrelgobopomofo

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import com.squirelworks.lsd.kana.KanaApp
import com.squirelworks.lsd.kana.parseKanaScripts
import com.squirelworks.lsd.kana.parseKanaStrokes

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val scripts = parseKanaScripts(assets.open("bopomofo.json").bufferedReader().use { it.readText() })
        val strokes = parseKanaStrokes(assets.open("bopomofo-strokes.json").bufferedReader().use { it.readText() })
        setContent {
            KanaApp("SquirrelGo Bopomofo", scripts, strokes, isSystemInDarkTheme())
        }
    }
}
