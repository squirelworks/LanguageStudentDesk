package com.squirelworks.squirrelgobopomofo

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
import com.squirelworks.lsd.kana.KanaApp
import com.squirelworks.lsd.kana.SuiteIntents
import com.squirelworks.lsd.kana.adoptWebViewProgress
import com.squirelworks.lsd.kana.parseKanaCopy
import com.squirelworks.lsd.kana.parseKanaScripts
import com.squirelworks.lsd.kana.parseKanaStrokes
import com.squirelworks.lsd.kana.parseSuite
import com.squirelworks.lsd.kana.readWebViewProgress
import java.io.File

class MainActivity : ComponentActivity() {
    private var query by mutableStateOf<String?>(null)
    private var installed by mutableStateOf(emptySet<String>())
    private val speech = AndroidSpeech(this, "bopomofo")
    private val suiteIntents = SuiteIntents(this)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        speech.start()
        query = suiteIntents.queryOf(intent)
        val scripts = parseKanaScripts(assets.open("bopomofo.json").bufferedReader().use { it.readText() })
        val strokes = parseKanaStrokes(assets.open("bopomofo-strokes.json").bufferedReader().use { it.readText() })
        val copy = parseKanaCopy(assets.open("app.json").bufferedReader().use { it.readText() })
        val suite = parseSuite(assets.open("suite.json").bufferedReader().use { it.readText() })
        suiteIntents.remember(suite.apps)
        installed = suiteIntents.installed()
        val progress = FileTextStore(File(filesDir, "bopomofo-progress.json"))
        val dataDir = File(applicationInfo.dataDir)
        fun show() {
            setContent {
                KanaApp(
                    title = copy.name.ifBlank { "SquirrelGo Bopomofo" },
                    scripts = scripts,
                    strokes = strokes,
                    dark = isSystemInDarkTheme(),
                    speakFallback = speech::speak,
                    progressStore = progress,
                    initialQuery = query,
                    intro = copy.intro,
                    about = copy.about,
                    canSpeak = true,
                    suite = suite,
                    suiteId = "bopomofo",
                    installedPackages = installed,
                    onLaunchApp = suiteIntents::launch,
                    onOpenUrl = suiteIntents::openHttps,
                    onStopAudio = speech::stop,
                )
            }
        }
        Thread({
            val legacy = runCatching { readWebViewProgress(dataDir, "squirrelgo-bopomofo") }
                .getOrElse { com.squirelworks.lsd.kana.WebViewStore.Unreadable }
            adoptWebViewProgress(progress, legacy)
            runOnUiThread {
                if (!isDestroyed) show()
            }
        }, "bopomofo-webview-progress").apply { isDaemon = true }.start()
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
