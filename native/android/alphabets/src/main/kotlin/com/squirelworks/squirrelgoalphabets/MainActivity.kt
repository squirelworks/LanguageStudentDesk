package com.squirelworks.squirrelgoalphabets

import android.media.MediaPlayer
import android.media.PlaybackParams
import android.os.Build
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
import com.squirelworks.lsd.kana.parseKanaAudio
import com.squirelworks.lsd.kana.parseKanaCopy
import com.squirelworks.lsd.kana.parseKanaScripts
import com.squirelworks.lsd.kana.parseKanaStrokes
import com.squirelworks.lsd.kana.parseSuite
import com.squirelworks.lsd.kana.readWebViewProgress
import java.io.File

class MainActivity : ComponentActivity() {
    private var query by mutableStateOf<String?>(null)
    private var installed by mutableStateOf(emptySet<String>())
    private var player: MediaPlayer? = null
    private val speech = AndroidSpeech(this, "alphabets")
    private val suiteIntents = SuiteIntents(this)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        speech.start()
        query = suiteIntents.queryOf(intent)
        val scripts = parseKanaScripts(assets.open("alphabets.json").bufferedReader().use { it.readText() })
        val strokes = parseKanaStrokes(assets.open("alphabets-strokes.json").bufferedReader().use { it.readText() })
        val clips = parseKanaAudio(assets.open("alphabets-audio.json").bufferedReader().use { it.readText() })
        val copy = parseKanaCopy(assets.open("app.json").bufferedReader().use { it.readText() })
        val suite = parseSuite(assets.open("suite.json").bufferedReader().use { it.readText() })
        suiteIntents.remember(suite.apps)
        installed = suiteIntents.installed()
        val progress = FileTextStore(File(filesDir, "alphabets-progress.json"))
        val dataDir = File(applicationInfo.dataDir)
        fun show() {
            setContent {
                KanaApp(
                    title = copy.name.ifBlank { "SquirrelGo Alphabets" },
                    scripts = scripts,
                    strokes = strokes,
                    dark = isSystemInDarkTheme(),
                    clips = clips,
                    playClip = ::playClip,
                    speakFallback = speech::speak,
                    progressStore = progress,
                    initialQuery = query,
                    intro = copy.intro,
                    about = copy.about,
                    canSpeak = true,
                    suite = suite,
                    suiteId = "alphabets",
                    installedPackages = installed,
                    onLaunchApp = suiteIntents::launch,
                    onOpenUrl = suiteIntents::openHttps,
                    onStopAudio = ::stopAudio,
                )
            }
        }
        Thread({
            val legacy = runCatching { readWebViewProgress(dataDir, "squirrelgo-alphabets") }
                .getOrElse { com.squirelworks.lsd.kana.WebViewStore.Unreadable }
            adoptWebViewProgress(progress, legacy)
            runOnUiThread {
                if (!isDestroyed) show()
            }
        }, "alphabets-webview-progress").apply { isDaemon = true }.start()
    }

    override fun onPause() {
        stopAudio()
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
        player?.release()
        speech.shutdown()
        super.onDestroy()
    }

    private fun stopAudio() {
        player?.let { playing ->
            runCatching { playing.stop() }
            playing.release()
        }
        player = null
        speech.stop()
    }

    private fun playClip(path: String, rate: Float) {
        stopAudio()
        val mp = MediaPlayer()
        val afd = assets.openFd(path)
        mp.setDataSource(afd.fileDescriptor, afd.startOffset, afd.length)
        afd.close()
        mp.setOnPreparedListener { ready ->
            if (Build.VERSION.SDK_INT >= 23) {
                runCatching { ready.playbackParams = PlaybackParams().setSpeed(rate).setPitch(1f) }
            }
            ready.start()
        }
        mp.prepareAsync()
        player = mp
    }
}
