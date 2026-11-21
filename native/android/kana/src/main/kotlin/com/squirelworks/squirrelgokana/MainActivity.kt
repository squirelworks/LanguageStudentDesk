package com.squirelworks.squirrelgokana

import android.content.ActivityNotFoundException
import android.content.Intent
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
import com.squirelworks.lsd.kana.KanaApp
import com.squirelworks.lsd.kana.parseKanaAudio
import com.squirelworks.lsd.kana.parseKanaCopy
import com.squirelworks.lsd.kana.parseKanaScripts
import com.squirelworks.lsd.kana.parseKanaStrokes
import java.io.File
import java.util.Locale

class MainActivity : ComponentActivity() {
    private var query by mutableStateOf<String?>(null)
    private var player: MediaPlayer? = null
    private var voice: TextToSpeech? = null
    private var voiceReady = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        query = queryOf(intent)
        voice = TextToSpeech(this) { status -> voiceReady = status == TextToSpeech.SUCCESS }
        val scripts = parseKanaScripts(assets.open("kana.json").bufferedReader().use { it.readText() })
        val strokes = parseKanaStrokes(assets.open("kana-strokes.json").bufferedReader().use { it.readText() })
        val clips = parseKanaAudio(assets.open("kana-audio.json").bufferedReader().use { it.readText() })
        val copy = parseKanaCopy(assets.open("app.json").bufferedReader().use { it.readText() })
        val progress = FileTextStore(File(filesDir, "kana-progress.json"))
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
                onLookup = ::openDictionary,
                canSpeak = true,
            )
        }
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

    private fun playClip(path: String, rate: Float) {
        player?.release()
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

    private fun speak(text: String, rate: Float, lang: String) {
        val engine = voice ?: return
        if (!voiceReady) return
        engine.setSpeechRate(rate)
        if (lang.isNotBlank()) engine.language = Locale.forLanguageTag(lang)
        engine.speak(text, TextToSpeech.QUEUE_FLUSH, null, "kana")
    }

    private fun openDictionary(text: String) {
        val launch = packageManager.getLaunchIntentForPackage("com.squirelworks.squirrelgodictionary.debug")
            ?: packageManager.getLaunchIntentForPackage("com.squirelworks.squirrelgodictionary")
            ?: return
        launch.putExtra(EXTRA_QUERY, text)
        try {
            startActivity(launch)
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
