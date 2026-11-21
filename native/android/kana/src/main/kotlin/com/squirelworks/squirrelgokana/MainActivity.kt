package com.squirelworks.squirrelgokana

import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import android.media.MediaPlayer
import android.media.PlaybackParams
import android.os.Build
import android.os.Bundle
import android.speech.tts.TextToSpeech
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.squirelworks.lsd.core.languages.FileTextStore
import com.squirelworks.lsd.core.speech.SpeechOutcome
import com.squirelworks.lsd.core.suite.SuiteApp
import com.squirelworks.lsd.kana.KanaApp
import com.squirelworks.lsd.kana.adoptWebViewProgress
import com.squirelworks.lsd.kana.parseKanaAudio
import com.squirelworks.lsd.kana.parseSuite
import com.squirelworks.lsd.kana.parseKanaCopy
import com.squirelworks.lsd.kana.parseKanaScripts
import com.squirelworks.lsd.kana.parseKanaStrokes
import java.io.File
import java.util.Locale

class MainActivity : ComponentActivity() {
    private var query by mutableStateOf<String?>(null)
    private var installed by mutableStateOf(emptySet<String>())
    private var suitePackages: List<String> = emptyList()
    private var player: MediaPlayer? = null
    private var voice: TextToSpeech? = null
    @Volatile private var engineState = EngineState.Starting
    private val languageAvailable = HashMap<String, Boolean>()
    private var appliedLanguage: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        query = queryOf(intent)
        voice = TextToSpeech(this) { status ->
            engineState = if (status == TextToSpeech.SUCCESS) EngineState.Ready else EngineState.Failed
        }
        val scripts = parseKanaScripts(assets.open("kana.json").bufferedReader().use { it.readText() })
        val strokes = parseKanaStrokes(assets.open("kana-strokes.json").bufferedReader().use { it.readText() })
        val clips = parseKanaAudio(assets.open("kana-audio.json").bufferedReader().use { it.readText() })
        val copy = parseKanaCopy(assets.open("app.json").bufferedReader().use { it.readText() })
        val suite = parseSuite(assets.open("suite.json").bufferedReader().use { it.readText() })
        suitePackages = suite.apps.map { it.pkg }
        installed = installedNow()
        val progress = FileTextStore(File(filesDir, "kana-progress.json"))
        adoptWebViewProgress(progress, readWebViewProgress(File(applicationInfo.dataDir)))
        setContent {
            KanaApp(
                title = copy.name.ifBlank { "SquirrelGo Kana" },
                scripts = scripts,
                strokes = strokes,
                dark = isSystemInDarkTheme(),
                clips = clips,
                playClip = ::playClip,
                speakFallback = ::speak,
                progressStore = progress,
                initialQuery = query,
                intro = copy.intro,
                about = copy.about,
                canSpeak = true,
                suite = suite,
                suiteId = "kana",
                installedPackages = installed,
                onLaunchApp = ::launchApp,
                onOpenUrl = ::openHttps,
                onStopAudio = ::stopAudio,
            )
        }
    }

    override fun onPause() {
        stopAudio()
        super.onPause()
    }

    override fun onResume() {
        super.onResume()
        installed = installedNow()
        languageAvailable.clear()
        appliedLanguage = null
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        query = queryOf(intent)
    }

    override fun onDestroy() {
        player?.release()
        voice?.shutdown()
        super.onDestroy()
    }

    private fun stopAudio() {
        player?.let { playing ->
            runCatching { playing.stop() }
            playing.release()
        }
        player = null
        voice?.stop()
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

    private fun speak(text: String, rate: Float, lang: String): SpeechOutcome {
        val engine = voice ?: return SpeechOutcome.Pending
        when (engineState) {
            EngineState.Starting -> return SpeechOutcome.Pending
            EngineState.Failed -> return SpeechOutcome.Missing
            EngineState.Ready -> Unit
        }
        if (!cachedLanguage(engine, lang)) {
            engine.stop()
            return SpeechOutcome.Missing
        }
        engine.setSpeechRate(rate)
        if (appliedLanguage != lang) {
            if (lang.isNotBlank() && engine.setLanguage(Locale.forLanguageTag(lang)) < TextToSpeech.LANG_AVAILABLE) {
                languageAvailable[lang] = false
                engine.stop()
                return SpeechOutcome.Missing
            }
            appliedLanguage = lang
        }
        val spoken = engine.speak(text, TextToSpeech.QUEUE_FLUSH, null, "kana")
        return if (spoken == TextToSpeech.ERROR) SpeechOutcome.Pending else SpeechOutcome.Spoken
    }

    private fun cachedLanguage(engine: TextToSpeech, lang: String): Boolean =
        languageAvailable.getOrPut(lang) {
            lang.isBlank() || engine.isLanguageAvailable(Locale.forLanguageTag(lang)) >= TextToSpeech.LANG_AVAILABLE
        }

    private fun installedNow(): Set<String> = suitePackages.filter { launchIntentFor(it) != null }.toSet()

    private fun launchIntentFor(pkg: String): Intent? {
        val debug = packageManager.getLaunchIntentForPackage("$pkg.debug")
        return debug ?: packageManager.getLaunchIntentForPackage(pkg)
    }

    private fun launchApp(app: SuiteApp, query: String): Boolean {
        val launch = launchIntentFor(app.pkg) ?: return false
        if (query.isNotBlank()) launch.putExtra(EXTRA_QUERY, query)
        launch.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        return try {
            startActivity(launch)
            true
        } catch (_: ActivityNotFoundException) {
            false
        }
    }

    private fun openHttps(url: String) {
        if (!url.startsWith("https://")) return
        try {
            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
        } catch (_: ActivityNotFoundException) {
        }
    }

    private fun queryOf(intent: Intent?): String? {
        val value = intent?.getStringExtra(EXTRA_QUERY)
        return value?.takeIf { it.isNotBlank() }
    }

    companion object {
        const val EXTRA_QUERY = "com.squirelworks.squirrelgo.QUERY"
    }
}

private enum class EngineState { Starting, Ready, Failed }
