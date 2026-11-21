package com.squirelworks.squirrelgokana

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
        val scripts = parseKanaScripts(assets.open("kana.json").bufferedReader().use { it.readText() })
        val strokes = parseKanaStrokes(assets.open("kana-strokes.json").bufferedReader().use { it.readText() })
        setContent {
            KanaApp("SquirrelGo Kana", scripts, strokes, isSystemInDarkTheme())
        }
    }
}
