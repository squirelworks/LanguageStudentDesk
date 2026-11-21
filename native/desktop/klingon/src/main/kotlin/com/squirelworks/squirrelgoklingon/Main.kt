package com.squirelworks.squirrelgoklingon

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.platform.Font
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.squirelworks.lsd.core.languages.FileTextStore
import com.squirelworks.lsd.kana.DesktopKeys
import com.squirelworks.lsd.kana.LocalDesktopKeys
import com.squirelworks.lsd.kana.Mp3ClipPlayer
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.klingon.KlingonApp
import com.squirelworks.lsd.klingon.adoptKlingonProgress
import com.squirelworks.lsd.klingon.loadKlingonBundle
import java.awt.Desktop
import java.awt.Toolkit
import java.awt.datatransfer.StringSelection
import java.io.File
import java.net.URI

private fun openHttps(url: String) {
    if (!url.startsWith("https://") || !Desktop.isDesktopSupported()) return
    runCatching { Desktop.getDesktop().browse(URI(url)) }
}

private fun fontResource(loader: ClassLoader, name: String): FontFamily {
    val bytes = loader.getResourceAsStream("fonts/$name")?.use { it.readBytes() }
        ?: error("Missing pIqaD font $name")
    val file = File.createTempFile(name, ".ttf")
    file.deleteOnExit()
    file.writeBytes(bytes)
    return FontFamily(Font(file))
}

fun main() = application {
    val loader = Thread.currentThread().contextClassLoader
    fun text(name: String) = loader.getResource(name)?.readText() ?: error("Missing Klingon data $name")
    val bundle = loadKlingonBundle(text("klingon.json"), text("strokes.json"), text("suite.json"))
    val player = Mp3ClipPlayer { path -> loader.getResourceAsStream(path) }
    val progress = FileTextStore(File(System.getProperty("user.home"), ".squirrelgo/klingon-progress.json"))
    adoptKlingonProgress(progress, WebViewStore.Absent)
    val keys = DesktopKeys()
    Window(onCloseRequest = ::exitApplication, onPreviewKeyEvent = keys::preview, title = bundle.about.name) {
        CompositionLocalProvider(LocalDesktopKeys provides keys) {
            KlingonApp(
                bundle = bundle,
                dark = isSystemInDarkTheme(),
                hand = fontResource(loader, "pIqaD-qolqoS.ttf"),
                classic = fontResource(loader, "pIqaD-classic.ttf"),
                progressStore = progress,
                playClip = player::play,
                onStopAudio = player::stop,
                onCopy = { text ->
                    Toolkit.getDefaultToolkit().systemClipboard.setContents(StringSelection(text), null)
                },
                onOpenUrl = ::openHttps,
            )
        }
    }
}
