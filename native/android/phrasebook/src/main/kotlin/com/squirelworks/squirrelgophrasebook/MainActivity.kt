package com.squirelworks.squirrelgophrasebook

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.squirelworks.lsd.core.languages.FileTextStore
import com.squirelworks.lsd.kana.AndroidClipPlayer
import com.squirelworks.lsd.kana.AndroidSpeech
import com.squirelworks.lsd.kana.SuiteIntents
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.kana.readWebViewProgress
import com.squirelworks.lsd.phrasebook.PhrasebookApp
import com.squirelworks.lsd.phrasebook.adoptPhrasebookProgress
import com.squirelworks.lsd.phrasebook.loadPhrasebookBundle
import java.io.File

class MainActivity : ComponentActivity() {
    private var incoming by mutableStateOf<String?>(null)
    private var generation by mutableIntStateOf(0)
    private var installed by mutableStateOf(emptySet<String>())
    private val clips by lazy { AndroidClipPlayer(assets) }
    private val speech by lazy { AndroidSpeech(this, "phrasebook") }
    private val suiteIntents = SuiteIntents(this)
    private val exporter = Exporter()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        speech.start()
        val first = suiteIntents.queryOf(intent)
        incoming = first
        generation = if (first.isNullOrBlank()) 0 else 1
        val bundle = loadPhrasebookBundle(
            assets.open("phrasebook.json").bufferedReader().use { it.readText() },
            assets.open("suite.json").bufferedReader().use { it.readText() },
        )
        bundle.suite?.let { suiteIntents.remember(it.apps) }
        installed = suiteIntents.installed()
        val progress = FileTextStore(File(filesDir, "phrasebook-progress.json"))
        val dataDir = File(applicationInfo.dataDir)
        fun show() {
            setContent {
                PhrasebookApp(
                    bundle = bundle,
                    progressStore = progress,
                    playClip = { path, rate ->
                        speech.stop()
                        clips.play(path, rate)
                    },
                    speak = { text, rate, lang ->
                        clips.stop()
                        speech.speak(text, rate, lang)
                    },
                    voiceStatus = { speech.languageStatus("ja-JP") },
                    onStopAudio = {
                        clips.stop()
                        speech.stop()
                    },
                    onExport = exporter::export,
                    initialQuery = incoming,
                    queryGeneration = generation,
                    installedPackages = installed,
                    onLaunchApp = suiteIntents::launch,
                    onOpenUrl = suiteIntents::openHttps,
                )
            }
        }
        Thread({
            val legacy = runCatching { readWebViewProgress(dataDir, bundle.storeKey) }
                .getOrElse { WebViewStore.Unreadable }
            adoptPhrasebookProgress(progress, legacy)
            runOnUiThread { if (!isDestroyed) show() }
        }, "phrasebook-webview-progress").apply { isDaemon = true }.start()
    }

    override fun onResume() {
        super.onResume()
        installed = suiteIntents.installed()
        speech.clearLanguageCache()
    }

    override fun onNewIntent(intent: android.content.Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        val query = suiteIntents.queryOf(intent) ?: return
        incoming = query
        generation++
    }

    override fun onPause() {
        clips.stop()
        speech.stop()
        super.onPause()
    }

    override fun onDestroy() {
        clips.stop()
        speech.shutdown()
        super.onDestroy()
    }

    private inner class Exporter {
        private var pending: String? = null
        private var notify: (String) -> Unit = {}
        private val launcher = registerForActivityResult(ActivityResultContracts.CreateDocument("text/csv")) { uri ->
            val csv = pending
            pending = null
            if (uri == null || csv == null) return@registerForActivityResult
            val message = try {
                contentResolver.openOutputStream(uri)?.use { it.write(csv.toByteArray(Charsets.UTF_8)) }
                    ?: error("no stream")
                "Saved"
            } catch (_: Exception) {
                "Could not save file"
            }
            notify(message)
        }

        fun export(csv: String, done: (String) -> Unit) {
            notify = done
            pending = csv
            launcher.launch("squirrelgo-phrasebook.csv")
        }
    }
}
