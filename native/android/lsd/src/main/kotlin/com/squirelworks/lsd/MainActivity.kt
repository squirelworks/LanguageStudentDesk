package com.squirelworks.lsd

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebView
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import com.squirelworks.lsd.core.desk.DeskLearner
import com.squirelworks.lsd.core.desk.DeskRules
import com.squirelworks.lsd.core.desk.decodeDeskSettings
import com.squirelworks.lsd.core.desk.encodeDeskSettings
import com.squirelworks.lsd.core.desk.importDeskWebView
import com.squirelworks.lsd.core.desk.parseDeskCatalog
import com.squirelworks.lsd.core.languages.FavoriteLanguages
import com.squirelworks.lsd.core.languages.FavoriteStore
import com.squirelworks.lsd.core.languages.formatFavoriteFile
import com.squirelworks.lsd.core.languages.parseFavoriteFile
import com.squirelworks.lsd.desk.DeskApp
import com.squirelworks.lsd.kana.PlatformBackHandler
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.kana.readWebViewProgress
import java.io.File
import java.net.URLEncoder

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val catalog = parseDeskCatalog(assets.open("desk.json").bufferedReader().use { it.readText() })
        val settingsFile = File(filesDir, "desk-settings.json")
        val favoriteFile = File(filesDir, "desk-favorites.txt")
        val rules = DeskRules(catalog)
        var settings by mutableStateOf(
            decodeDeskSettings(settingsFile.takeIf { it.isFile }?.readText().orEmpty(), rules.fresh()),
        )
        if (!settings.importedWebView) {
            val dataDir = File(applicationInfo.dataDir)
            val saved = (readWebViewProgress(dataDir, "lsd-settings") as? WebViewStore.Value)?.text
            val stars = (readWebViewProgress(dataDir, "lsd-favorite-languages") as? WebViewStore.Value)?.text
            val imported = importDeskWebView(saved, stars, settings, parseFavoriteFile(favoriteFile.takeIf { it.isFile }?.readText().orEmpty()))
            settings = imported.settings
            settingsFile.writeText(encodeDeskSettings(settings))
            favoriteFile.writeText(formatFavoriteFile(imported.favorites))
        }
        val favorites = FavoriteLanguages(FileFavoriteStore(favoriteFile))
        var learnerUrl by mutableStateOf<String?>(null)
        setContent {
            if (learnerUrl != null) {
                PlatformBackHandler(true) { learnerUrl = null }
                LearnerWeb(learnerUrl!!)
            } else {
                DeskApp(
                    catalog = catalog,
                    settings = settings,
                    favorites = favorites,
                    onSettings = { next ->
                        settings = next
                        settingsFile.writeText(encodeDeskSettings(next))
                    },
                    onFavorites = {},
                    onOpenLearner = { learner, lang -> learnerUrl = learnerUrl(learner, lang) },
                )
            }
        }
    }
}

private fun learnerUrl(learner: DeskLearner, lang: String): String {
    val query = if (learner.scoped && lang.isNotBlank()) "?lang=" + URLEncoder.encode(lang, "UTF-8") else ""
    return "file:///android_asset/www/${learner.href}$query"
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
private fun LearnerWeb(url: String) {
    AndroidView(
        modifier = Modifier.fillMaxSize(),
        factory = { context ->
            WebView(context).apply {
                settings.javaScriptEnabled = true
                settings.allowFileAccess = true
                @Suppress("DEPRECATION")
                settings.allowFileAccessFromFileURLs = true
                @Suppress("DEPRECATION")
                settings.allowUniversalAccessFromFileURLs = true
                loadUrl(url)
            }
        },
        update = { if (it.url != url) it.loadUrl(url) },
    )
}

private class FileFavoriteStore(private val file: File) : FavoriteStore {
    override fun load(): Set<String> = if (file.isFile) parseFavoriteFile(file.readText()) else emptySet()
    override fun save(ids: Set<String>) {
        file.writeText(formatFavoriteFile(ids))
    }
}
