package com.squirelworks.lsd

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.squirelworks.lsd.core.desk.DeskLearner
import com.squirelworks.lsd.core.desk.DeskRules
import com.squirelworks.lsd.core.desk.applyDeskWebSnapshot
import com.squirelworks.lsd.core.desk.decodeDeskSettings
import com.squirelworks.lsd.core.desk.encodeDeskSettings
import com.squirelworks.lsd.core.desk.importDeskWebView
import com.squirelworks.lsd.core.desk.parseDeskCatalog
import com.squirelworks.lsd.core.desk.parseDeskWebSnapshot
import com.squirelworks.lsd.core.languages.FavoriteLanguages
import com.squirelworks.lsd.core.languages.formatFavoriteOrder
import com.squirelworks.lsd.core.languages.parseFavoriteFile
import com.squirelworks.lsd.desk.DeskApp
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.kana.readWebViewProgress
import com.squirelworks.lsd.learner.LearnerWeb
import java.io.File

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
        val favorites = FavoriteLanguages(OrderedFavoriteStore(favoriteFile))
        val learnerOpen = File(filesDir, "desk-learner-open")
        if (!settings.importedWebView) {
            val dataDir = File(applicationInfo.dataDir)
            fun stored(key: String) = (readWebViewProgress(dataDir, key, raw = true) as? WebViewStore.Value)?.text
            val imported = importDeskWebView(
                stored("lsd-settings"),
                stored("lsd-favorite-languages"),
                settings,
                favorites.ids(),
                stored("lsd-suite-lang"),
            )
            settings = imported.settings
            settingsFile.writeText(encodeDeskSettings(settings))
            favorites.replace(imported.favorites)
        }
        if (learnerOpen.isFile) {
            val dataDir = File(applicationInfo.dataDir)
            fun stored(key: String) = readWebViewProgress(dataDir, key, raw = true)
            val saved = stored("lsd-settings")
            val stars = stored("lsd-favorite-languages")
            val lang = stored("lsd-suite-lang")
            val values = listOf(saved, stars, lang)
            if (values.any { it is WebViewStore.Value }) {
                val applied = applyDeskWebSnapshot(
                    com.squirelworks.lsd.core.desk.DeskWebSnapshot(
                        (saved as? WebViewStore.Value)?.text,
                        (stars as? WebViewStore.Value)?.text,
                        (lang as? WebViewStore.Value)?.text,
                    ),
                    settings,
                    favorites.ids(),
                )
                settings = applied.settings.copy(importedWebView = true)
                settingsFile.writeText(encodeDeskSettings(settings))
                favorites.replace(applied.favorites)
                learnerOpen.delete()
            } else if (values.none { it is WebViewStore.Unreadable }) {
                learnerOpen.delete()
            }
        }
        fun remember(raw: String?) {
            val snapshot = parseDeskWebSnapshot(raw) ?: return
            val applied = applyDeskWebSnapshot(snapshot, settings, favorites.ids())
            settings = applied.settings
            settingsFile.writeText(encodeDeskSettings(settings))
            favorites.replace(applied.favorites)
        }
        var learner by mutableStateOf<Pair<DeskLearner, String>?>(null)
        setContent {
            val open = learner
            if (open != null) {
                val (page, lang) = open
                LearnerWeb(
                    url = learnerAddress(page.href, page.scoped, lang),
                    seedHtml = learnerSeed(settings, favorites.ids(), page.href, page.scoped, lang),
                    page = deskLearnerPage,
                    onSnapshot = { remember(it) },
                    onLeave = { raw ->
                        remember(raw)
                        learnerOpen.delete()
                        learner = null
                    },
                )
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
                    onOpenLearner = { page, lang ->
                        learnerOpen.writeText("1")
                        learner = page to lang
                    },
                )
            }
        }
    }
}

private class OrderedFavoriteStore(private val file: File) : com.squirelworks.lsd.core.languages.FavoriteStore {
    override fun load(): Set<String> = if (file.isFile) parseFavoriteFile(file.readText()) else emptySet()
    override fun save(ids: Set<String>) {
        file.writeText(formatFavoriteOrder(ids))
    }
}
