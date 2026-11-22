package com.squirelworks.electronicsstudentdesk

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.squirelworks.lsd.core.desk.decodeDeskSettings
import com.squirelworks.lsd.core.desk.encodeDeskSettings
import com.squirelworks.lsd.core.electronics.ELECTRONICS_VIEW_KEY
import com.squirelworks.lsd.core.electronics.ElectronicsCourse
import com.squirelworks.lsd.core.electronics.ElectronicsSync
import com.squirelworks.lsd.core.electronics.applyElectronicsSync
import com.squirelworks.lsd.core.electronics.decodeElectronicsLayout
import com.squirelworks.lsd.core.electronics.electronicsCourse
import com.squirelworks.lsd.core.electronics.electronicsRules
import com.squirelworks.lsd.core.electronics.electronicsSeedDocument
import com.squirelworks.lsd.core.electronics.electronicsSeedSnapshot
import com.squirelworks.lsd.core.electronics.electronicsSyncChanged
import com.squirelworks.lsd.core.electronics.electronicsTags
import com.squirelworks.lsd.core.electronics.encodeElectronicsLayout
import com.squirelworks.lsd.core.electronics.importElectronicsWebView
import com.squirelworks.lsd.core.electronics.isElectronicsMenuUrl
import com.squirelworks.lsd.core.electronics.normalizeElectronicsLayout
import com.squirelworks.lsd.core.electronics.parseElectronicsCatalog
import com.squirelworks.lsd.core.electronics.parseElectronicsSync
import com.squirelworks.lsd.electronics.ElectronicsApp
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.kana.readWebViewProgress
import com.squirelworks.lsd.learner.LearnerPage
import com.squirelworks.lsd.learner.LearnerWeb
import java.io.File
import java.net.URLEncoder

private val electronicsLearnerPage = LearnerPage(
    isMenuUrl = ::isElectronicsMenuUrl,
    readStorageJs = "(function(){try{return{settings:localStorage.getItem('lsd-settings'),view:localStorage.getItem('lsd-electronics-view-v1')};}catch(e){return null;}})()",
    speech = false,
)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val catalog = parseElectronicsCatalog(assets.open("electronics.json").bufferedReader().use { it.readText() })
        val rules = electronicsRules(catalog)
        val tags = electronicsTags(catalog.courses)
        val settingsFile = File(filesDir, "electronics-settings.json")
        val layoutFile = File(filesDir, "electronics-view.json")
        val learnerOpen = File(filesDir, "electronics-learner-open")
        var settings by mutableStateOf(decodeDeskSettings(settingsFile.takeIf { it.isFile }?.readText().orEmpty(), rules.fresh()))
        var layout by mutableStateOf(normalizeElectronicsLayout(decodeElectronicsLayout(layoutFile.takeIf { it.isFile }?.readText().orEmpty()), tags))
        val dataDir = File(applicationInfo.dataDir)
        fun stored(key: String) = readWebViewProgress(dataDir, key, raw = true)
        if (!settings.importedWebView) {
            fun text(key: String) = (stored(key) as? WebViewStore.Value)?.text
            val imported = importElectronicsWebView(text("lsd-settings"), text(ELECTRONICS_VIEW_KEY), settings, layout, tags)
            settings = imported.settings
            layout = imported.layout
            settingsFile.writeText(encodeDeskSettings(settings))
            layoutFile.writeText(encodeElectronicsLayout(layout))
        }
        if (learnerOpen.isFile) {
            val saved = stored("lsd-settings")
            val view = stored(ELECTRONICS_VIEW_KEY)
            val values = listOf(saved, view)
            if (values.any { it is WebViewStore.Value }) {
                val applied = applyElectronicsSync(
                    ElectronicsSync((saved as? WebViewStore.Value)?.text, (view as? WebViewStore.Value)?.text),
                    settings,
                    layout,
                    tags,
                )
                settings = applied.settings
                layout = applied.layout
                settingsFile.writeText(encodeDeskSettings(settings))
                layoutFile.writeText(encodeElectronicsLayout(layout))
                learnerOpen.delete()
            } else if (values.none { it is WebViewStore.Unreadable }) {
                learnerOpen.delete()
            }
        }
        var known by mutableStateOf(electronicsSeedSnapshot(settings, layout))
        val startLang = intent?.data?.getQueryParameter("lang").orEmpty()
        var course by mutableStateOf<ElectronicsCourse?>(electronicsCourse(catalog, startLang))
        var openLearner by mutableStateOf(course != null)
        if (openLearner) learnerOpen.writeText("1")
        fun remember(raw: String?) {
            val post = parseElectronicsSync(raw) ?: return
            if (!electronicsSyncChanged(known, post)) return
            known = post
            val applied = applyElectronicsSync(post, settings, layout, tags)
            settings = applied.settings
            layout = applied.layout
            settingsFile.writeText(encodeDeskSettings(settings))
            layoutFile.writeText(encodeElectronicsLayout(layout))
        }
        setContent {
            if (openLearner) {
                val address = learnerAddress(course?.id.orEmpty())
                LearnerWeb(
                    url = address,
                    seedHtml = electronicsSeedDocument(settings, layout, address),
                    page = electronicsLearnerPage,
                    onSnapshot = { remember(it) },
                    onLeave = { raw ->
                        remember(raw)
                        learnerOpen.delete()
                        openLearner = false
                        course = null
                    },
                )
            } else {
                ElectronicsApp(
                    catalog = catalog,
                    layout = layout,
                    startLang = startLang,
                    onLayout = {
                        layout = it
                        layoutFile.writeText(encodeElectronicsLayout(it))
                        known = electronicsSeedSnapshot(settings, layout)
                    },
                    onOpenCourse = {
                        course = it
                        known = electronicsSeedSnapshot(settings, layout)
                        learnerOpen.writeText("1")
                        openLearner = true
                    },
                )
            }
        }
    }
}

private fun learnerAddress(lang: String): String {
    val query = if (lang.isBlank()) "" else "?lang=" + URLEncoder.encode(lang, "UTF-8")
    return "file:///android_asset/www/electronics-learner/index.html$query"
}
