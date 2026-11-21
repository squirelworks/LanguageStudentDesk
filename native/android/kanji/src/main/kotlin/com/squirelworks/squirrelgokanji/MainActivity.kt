package com.squirelworks.squirrelgokanji

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.squirelworks.lsd.core.languages.FileTextStore
import com.squirelworks.lsd.kana.AndroidSpeech
import com.squirelworks.lsd.kana.SuiteIntents
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.kana.readWebViewProgress
import com.squirelworks.lsd.kanji.KanjiApp
import com.squirelworks.lsd.kanji.adoptKanjiProgress
import com.squirelworks.lsd.kanji.loadKanjiBundle
import java.io.File

class MainActivity : ComponentActivity() {
    private var query by mutableStateOf<String?>(null)
    private var installed by mutableStateOf(emptySet<String>())
    private val speech = AndroidSpeech(this, "kanji")
    private val suiteIntents = SuiteIntents(this)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        speech.start()
        query = suiteIntents.queryOf(intent)
        val bundle = loadKanjiBundle(
            assets.open("kanji.json").bufferedReader().use { it.readText() },
            assets.open("catalog.json").bufferedReader().use { it.readText() },
            assets.open("lessons.json").bufferedReader().use { it.readText() },
            assets.open("words.json").bufferedReader().use { it.readText() },
            assets.open("strokes.json").bufferedReader().use { it.readText() },
            assets.open("suite.json").bufferedReader().use { it.readText() },
        )
        bundle.suite?.let { suiteIntents.remember(it.apps) }
        installed = suiteIntents.installed()
        val progress = FileTextStore(File(filesDir, "kanji-progress.json"))
        val dataDir = File(applicationInfo.dataDir)
        fun show() {
            setContent {
                KanjiApp(
                    bundle = bundle,
                    dark = isSystemInDarkTheme(),
                    progressStore = progress,
                    initialQuery = query,
                    speak = speech::speak,
                    installedPackages = installed,
                    onLaunchApp = suiteIntents::launch,
                    onOpenUrl = suiteIntents::openHttps,
                    onStopAudio = speech::stop,
                )
            }
        }
        Thread({
            val legacy = runCatching { readWebViewProgress(dataDir, "squirrelgo-kanji-progress") }
                .getOrElse { WebViewStore.Unreadable }
            adoptKanjiProgress(progress, legacy)
            runOnUiThread {
                if (!isDestroyed) show()
            }
        }, "kanji-webview-progress").apply { isDaemon = true }.start()
    }

    override fun onPause() {
        speech.stop()
        super.onPause()
    }

    override fun onResume() {
        super.onResume()
        installed = suiteIntents.installed()
        speech.clearLanguageCache()
    }

    override fun onNewIntent(intent: android.content.Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        query = suiteIntents.queryOf(intent)
    }

    override fun onDestroy() {
        speech.shutdown()
        super.onDestroy()
    }
}
