package com.squirelworks.squirrelgoklingon

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import com.squirelworks.lsd.core.languages.FileTextStore
import com.squirelworks.lsd.kana.AndroidClipPlayer
import com.squirelworks.lsd.kana.SuiteIntents
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.kana.readWebViewProgress
import com.squirelworks.lsd.klingon.KlingonApp
import com.squirelworks.lsd.klingon.adoptKlingonProgress
import com.squirelworks.lsd.klingon.loadKlingonBundle
import java.io.File

class MainActivity : ComponentActivity() {
    private val clips by lazy { AndroidClipPlayer(assets) }
    private val suiteIntents = SuiteIntents(this)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val bundle = loadKlingonBundle(
            assets.open("klingon.json").bufferedReader().use { it.readText() },
            assets.open("strokes.json").bufferedReader().use { it.readText() },
            assets.open("suite.json").bufferedReader().use { it.readText() },
        )
        bundle.suite?.let { suiteIntents.remember(it.apps) }
        val hand = FontFamily(Font("fonts/pIqaD-qolqoS.ttf", assets))
        val classic = FontFamily(Font("fonts/pIqaD-classic.ttf", assets))
        val progress = FileTextStore(File(filesDir, "klingon-progress.json"))
        val dataDir = File(applicationInfo.dataDir)
        fun show() {
            setContent {
                KlingonApp(
                    bundle = bundle,
                    dark = isSystemInDarkTheme(),
                    hand = hand,
                    classic = classic,
                    progressStore = progress,
                    playClip = clips::play,
                    onStopAudio = clips::stop,
                    onCopy = ::copy,
                    installedPackages = suiteIntents.installed(),
                    onLaunchApp = suiteIntents::launch,
                    onOpenUrl = suiteIntents::openHttps,
                )
            }
        }
        Thread({
            val legacy = runCatching { readWebViewProgress(dataDir, bundle.about.store) }
                .getOrElse { WebViewStore.Unreadable }
            adoptKlingonProgress(progress, legacy)
            runOnUiThread { if (!isDestroyed) show() }
        }, "klingon-webview-progress").apply { isDaemon = true }.start()
    }

    private fun copy(text: String) {
        val clipboard = getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        clipboard.setPrimaryClip(ClipData.newPlainText("pIqaD", text))
    }

    override fun onPause() {
        clips.stop()
        super.onPause()
    }

    override fun onDestroy() {
        clips.stop()
        super.onDestroy()
    }
}
