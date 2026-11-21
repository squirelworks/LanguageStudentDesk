package com.squirelworks.squirrelgodictionary

import android.content.ClipData
import android.content.ClipboardManager
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.squirelworks.lsd.core.languages.FileTextStore
import com.squirelworks.lsd.dictionary.DICTIONARY_STORE_KEY
import com.squirelworks.lsd.dictionary.DictionaryLegacy
import com.squirelworks.lsd.dictionary.EnglishDictionaryApp
import com.squirelworks.lsd.dictionary.JedIndex
import com.squirelworks.lsd.dictionary.adoptDictionaryState
import com.squirelworks.lsd.dictionary.loadJedIndex
import com.squirelworks.lsd.kana.AndroidSpeech
import com.squirelworks.lsd.kana.SuiteIntents
import com.squirelworks.lsd.kana.SuiteSheet
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.kana.parseSuite
import com.squirelworks.lsd.kana.readWebViewProgress
import java.io.File

class MainActivity : ComponentActivity() {
    private var query by mutableStateOf<String?>(null)
    private var installed by mutableStateOf(emptySet<String>())
    private var backEnabled by mutableStateOf(false)
    private var backAction: () -> Unit = {}
    private val speech = AndroidSpeech(this, "dictionary")
    private val suiteIntents = SuiteIntents(this)
    private var pendingExport: String? = null
    private val saveCsv = registerForActivityResult(ActivityResultContracts.CreateDocument("text/csv")) { uri ->
        val csv = pendingExport
        pendingExport = null
        if (uri == null || csv == null) return@registerForActivityResult
        val saved = runCatching {
            contentResolver.openOutputStream(uri)?.use { it.write(csv.toByteArray()) }
        }.isSuccess
        Toast.makeText(this, if (saved) "Saved" else "Could not save file", Toast.LENGTH_SHORT).show()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        speech.start()
        query = suiteIntents.queryOf(intent)
        val suite = parseSuite(assets.open("suite.json").bufferedReader().use { it.readText() })
        suiteIntents.remember(suite.apps)
        installed = suiteIntents.installed()
        val state = FileTextStore(File(filesDir, "dictionary-state.json"))
        val dataDir = File(applicationInfo.dataDir)
        var index by mutableStateOf<JedIndex?>(null)
        var loadFailed by mutableStateOf(false)
        setContent {
            val ready = index
            if (ready == null) {
                Box(Modifier.fillMaxSize().background(Color.Black), contentAlignment = Alignment.Center) {
                    Text(
                        if (loadFailed) "The word list isn't installed in this copy." else "Loading dictionary…",
                        color = Color.White,
                    )
                }
            } else {
                BackHandler(enabled = backEnabled) { backAction() }
                EnglishDictionaryApp(
                    index = ready,
                    store = state,
                    speak = { speech.speak(it, 1f, "ja-JP") },
                    onStopAudio = speech::stop,
                    onCopy = { value ->
                        val board = getSystemService(ClipboardManager::class.java)
                        board.setPrimaryClip(ClipData.newPlainText("dictionary", value))
                        true
                    },
                    onExport = { name, csv ->
                        pendingExport = csv
                        saveCsv.launch(name)
                        ""
                    },
                    apps = suite.apps,
                    installed = installed,
                    onLaunchApp = suiteIntents::launch,
                    onOpenUrl = suiteIntents::openHttps,
                    onBackState = { enabled, action ->
                        backEnabled = enabled
                        backAction = action
                    },
                    suiteSheet = { notice, onOpen, onClose ->
                        SuiteSheet(suite, "dictionary", installed, notice, onOpen, suiteIntents::openHttps, onClose)
                    },
                    initialQuery = query,
                )
            }
        }
        Thread({
            val legacy = runCatching { readWebViewProgress(dataDir, DICTIONARY_STORE_KEY) }
                .getOrElse { WebViewStore.Unreadable }
            adoptDictionaryState(state, legacy.toDictionary())
            val loaded = runCatching {
                fun text(name: String) = assets.open(name).bufferedReader().use { it.readText() }
                loadJedIndex(
                    text("jed-meta.json"),
                    text("jed-index.txt"),
                    text("jed-kanji.json"),
                    text("jed-radicals.json"),
                ) { shard ->
                    val name = "jed-entries/%02d.json".format(shard)
                    runCatching { assets.open(name).bufferedReader().use { it.readText() } }.getOrNull()
                }
            }
            runOnUiThread {
                if (isDestroyed) return@runOnUiThread
                loaded.onSuccess { index = it }.onFailure { loadFailed = true }
            }
        }, "dictionary-load").apply { isDaemon = true }.start()
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

private fun WebViewStore.toDictionary(): DictionaryLegacy = when (this) {
    WebViewStore.Absent -> DictionaryLegacy.Absent
    WebViewStore.Unreadable -> DictionaryLegacy.Unreadable
    is WebViewStore.Value -> DictionaryLegacy.Value(text)
}
