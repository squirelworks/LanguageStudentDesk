package com.squirelworks.squirrelgoorthodoxbible

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import com.squirelworks.lsd.bible.BibleApp
import com.squirelworks.lsd.bible.PackStore
import com.squirelworks.lsd.bible.adoptBibleSettings
import com.squirelworks.lsd.bible.adoptPackRelease
import com.squirelworks.lsd.bible.parseBibleBundle
import com.squirelworks.lsd.core.languages.FileTextStore
import com.squirelworks.lsd.kana.AndroidSpeech
import com.squirelworks.lsd.kana.SuiteIntents
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.kana.readWebViewProgress
import java.io.File
import java.net.HttpURLConnection
import java.net.URL

class MainActivity : ComponentActivity() {
    private val speech = AndroidSpeech(this, "orthodox-bible")
    private val suiteIntents = SuiteIntents(this)
    private var pendingExport = ""
    private val exportLauncher = registerForActivityResult(ActivityResultContracts.CreateDocument("text/plain")) { uri: Uri? ->
        if (uri == null) return@registerForActivityResult
        contentResolver.openOutputStream(uri)?.use { it.write(pendingExport.toByteArray()) }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        speech.start()
        val bundle = parseBibleBundle(
            assets.open("books.json").bufferedReader().use { it.readText() },
            assets.open("catalog.json").bufferedReader().use { it.readText() },
            assets.open("versification.json").bufferedReader().use { it.readText() },
            assets.open("lectionary.json").bufferedReader().use { it.readText() },
            assets.open("suite.json").bufferedReader().use { it.readText() },
        )
        bundle.suite?.let { suiteIntents.remember(it.apps) }
        val settings = FileTextStore(File(filesDir, "orthodox-bible.json"))
        val content = FileTextStore(File(filesDir, "orthodox-bible-content.json"))
        val packs = FilePackStore(File(filesDir, "orthodox-packs"))
        val dataDir = File(applicationInfo.dataDir)
        fun show() {
            setContent {
                BibleApp(
                    bundle = bundle,
                    readBible = { id -> readAsset("bibles/$id.json") },
                    readCommentary = { id -> readAsset("commentary/$id.json") },
                    settingsStore = settings,
                    contentStore = content,
                    packs = packs,
                    speak = { text, lang -> speech.speak(text, 1f, lang) },
                    onCopy = ::copy,
                    onExport = { name, text ->
                        pendingExport = text
                        exportLauncher.launch(name)
                    },
                    fetch = ::httpGet,
                    installedPackages = suiteIntents.installed(),
                    onLaunchApp = suiteIntents::launch,
                    onOpenUrl = suiteIntents::openHttps,
                    onStopSpeech = speech::stop,
                )
            }
        }
        Thread({
            val legacy = runCatching { readWebViewProgress(dataDir, "squirrelgo-orthodox-bible") }
                .getOrElse { WebViewStore.Unreadable }
            val legacyContent = runCatching { readWebViewProgress(dataDir, "squirrelgo-orthodox-bible-content") }
                .getOrElse { WebViewStore.Unreadable }
            adoptBibleSettings(settings, legacy, bundle)
            adoptPackRelease(content, legacyContent)
            runOnUiThread { if (!isDestroyed) show() }
        }, "orthodox-bible-webview").apply { isDaemon = true }.start()
    }

    private fun readAsset(name: String): String? =
        runCatching { assets.open(name).bufferedReader().use { it.readText() } }.getOrNull()

    private fun copy(text: String) {
        val clipboard = getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        clipboard.setPrimaryClip(ClipData.newPlainText("verse", text))
    }

    override fun onResume() {
        super.onResume()
        speech.clearLanguageCache()
    }

    override fun onPause() {
        speech.stop()
        super.onPause()
    }

    override fun onDestroy() {
        speech.stop()
        speech.shutdown()
        super.onDestroy()
    }
}

private class FilePackStore(private val root: File) : PackStore {
    override fun keys(): Set<String> {
        val found = mutableSetOf<String>()
        for (kind in listOf("bible", "commentary")) {
            File(root, kind).listFiles()?.forEach { file ->
                if (file.isFile) found += "$kind:${file.nameWithoutExtension}"
            }
        }
        return found
    }

    override fun read(key: String): String? {
        val file = file(key)
        return if (file.isFile) file.readText() else null
    }

    override fun write(key: String, text: String) {
        val file = file(key)
        file.parentFile?.mkdirs()
        file.writeText(text)
    }

    override fun remove(key: String) {
        file(key).delete()
    }

    private fun file(key: String): File {
        val kind = key.substringBefore(":")
        val id = key.substringAfter(":")
        return File(root, "$kind/$id.txt")
    }
}

private fun httpGet(url: String): String {
    val connection = (URL(url).openConnection() as HttpURLConnection).apply {
        instanceFollowRedirects = true
        connectTimeout = 20_000
        readTimeout = 120_000
        setRequestProperty("User-Agent", "SquirrelGoOrthodoxBible")
        setRequestProperty("Accept", "application/vnd.github+json, application/json, text/plain, */*")
    }
    try {
        val code = connection.responseCode
        if (code !in 200..299) error("Download failed ($code)")
        return connection.inputStream.bufferedReader().use { it.readText() }
    } finally {
        connection.disconnect()
    }
}
