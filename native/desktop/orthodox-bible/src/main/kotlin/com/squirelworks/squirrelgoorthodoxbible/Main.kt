package com.squirelworks.squirrelgoorthodoxbible

import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.squirelworks.lsd.bible.BibleApp
import com.squirelworks.lsd.bible.PackStore
import com.squirelworks.lsd.bible.adoptBibleSettings
import com.squirelworks.lsd.bible.adoptPackRelease
import com.squirelworks.lsd.bible.parseBibleBundle
import com.squirelworks.lsd.core.languages.FileTextStore
import com.squirelworks.lsd.kana.DesktopKeys
import com.squirelworks.lsd.kana.DesktopVoice
import com.squirelworks.lsd.kana.LocalDesktopKeys
import com.squirelworks.lsd.kana.WebViewStore
import java.awt.Desktop
import java.awt.FileDialog
import java.awt.Frame
import java.awt.Toolkit
import java.awt.datatransfer.StringSelection
import java.io.File
import java.net.HttpURLConnection
import java.net.URI
import java.net.URL

fun main() = application {
    val loader = Thread.currentThread().contextClassLoader
    fun text(name: String) = loader.getResource(name)?.readText() ?: error("Missing Orthodox Bible data $name")
    val bundle = parseBibleBundle(
        text("books.json"),
        text("catalog.json"),
        text("versification.json"),
        text("lectionary.json"),
        text("suite.json"),
    )
    val home = File(System.getProperty("user.home"), ".squirrelgo")
    val settings = FileTextStore(File(home, "orthodox-bible.json"))
    val content = FileTextStore(File(home, "orthodox-bible-content.json"))
    val packs = FilePackStore(File(home, "orthodox-packs"))
    adoptBibleSettings(settings, WebViewStore.Absent, bundle)
    adoptPackRelease(content, WebViewStore.Absent)
    val voice = DesktopVoice("orthodox-bible")
    val keys = DesktopKeys()
    Window(onCloseRequest = ::exitApplication, onPreviewKeyEvent = keys::preview, title = "SquirrelGo Orthodox Bible") {
        CompositionLocalProvider(LocalDesktopKeys provides keys) {
            BibleApp(
                bundle = bundle,
                readBible = { id -> loader.getResource("bibles/$id.json")?.readText() },
                readCommentary = { id -> loader.getResource("commentary/$id.json")?.readText() },
                settingsStore = settings,
                contentStore = content,
                packs = packs,
                speak = { text, lang -> voice.speak(text, 1f, lang) },
                onCopy = { copied ->
                    Toolkit.getDefaultToolkit().systemClipboard.setContents(StringSelection(copied), null)
                },
                onExport = { name, body ->
                    val dialog = FileDialog(null as Frame?, "Export notes", FileDialog.SAVE)
                    dialog.file = name
                    dialog.isVisible = true
                    val directory = dialog.directory
                    val file = dialog.file
                    if (directory != null && file != null) File(directory, file).writeText(body)
                },
                fetch = ::httpGet,
                onOpenUrl = ::openHttps,
                onStopSpeech = voice::stop,
            )
        }
    }
}

private fun openHttps(url: String) {
    if (!url.startsWith("https://") || !Desktop.isDesktopSupported()) return
    runCatching { Desktop.getDesktop().browse(URI(url)) }
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
