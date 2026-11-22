package com.squirelworks.programmingstudentdesk

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.squirelworks.lsd.core.desk.decodeDeskSettings
import com.squirelworks.lsd.core.desk.encodeDeskSettings
import com.squirelworks.lsd.core.programming.PROGRAMMING_VIEW_KEY
import com.squirelworks.lsd.core.programming.ProgrammingCourse
import com.squirelworks.lsd.core.programming.ProgrammingSync
import com.squirelworks.lsd.core.programming.applyProgrammingSync
import com.squirelworks.lsd.core.programming.decodeProgrammingLayout
import com.squirelworks.lsd.core.programming.encodeProgrammingLayout
import com.squirelworks.lsd.core.programming.importProgrammingWebView
import com.squirelworks.lsd.core.programming.isProgrammingMenuUrl
import com.squirelworks.lsd.core.programming.normalizeProgrammingLayout
import com.squirelworks.lsd.core.programming.parseProgrammingCatalog
import com.squirelworks.lsd.core.programming.parseProgrammingSync
import com.squirelworks.lsd.core.programming.programmingCourse
import com.squirelworks.lsd.core.programming.programmingRules
import com.squirelworks.lsd.core.programming.programmingSeedDocument
import com.squirelworks.lsd.core.programming.programmingSeedSnapshot
import com.squirelworks.lsd.core.programming.programmingSyncChanged
import com.squirelworks.lsd.core.programming.programmingTags
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.kana.readWebViewProgress
import com.squirelworks.lsd.learner.LearnerPage
import com.squirelworks.lsd.learner.LearnerWeb
import com.squirelworks.lsd.programming.ProgrammingApp
import java.io.File
import java.net.URLEncoder

private val programmingLearnerPage = LearnerPage(
    isMenuUrl = ::isProgrammingMenuUrl,
    readStorageJs = "(function(){try{return{settings:localStorage.getItem('lsd-settings'),view:localStorage.getItem('lsd-programming-view-v1')};}catch(e){return null;}})()",
    speech = false,
)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val catalog = parseProgrammingCatalog(assets.open("programming.json").bufferedReader().use { it.readText() })
        val rules = programmingRules(catalog)
        val tags = programmingTags(catalog.courses)
        val settingsFile = File(filesDir, "programming-settings.json")
        val layoutFile = File(filesDir, "programming-view.json")
        val learnerOpen = File(filesDir, "programming-learner-open")
        var settings by mutableStateOf(decodeDeskSettings(settingsFile.takeIf { it.isFile }?.readText().orEmpty(), rules.fresh()))
        var layout by mutableStateOf(
            normalizeProgrammingLayout(decodeProgrammingLayout(layoutFile.takeIf { it.isFile }?.readText().orEmpty()), tags),
        )
        val dataDir = File(applicationInfo.dataDir)
        fun stored(key: String) = readWebViewProgress(dataDir, key, raw = true)
        if (!settings.importedWebView) {
            fun text(key: String) = (stored(key) as? WebViewStore.Value)?.text
            val imported = importProgrammingWebView(text("lsd-settings"), text(PROGRAMMING_VIEW_KEY), settings, layout, tags)
            settings = imported.settings
            layout = imported.layout
            settingsFile.writeText(encodeDeskSettings(settings))
            layoutFile.writeText(encodeProgrammingLayout(layout))
        }
        if (learnerOpen.isFile) {
            val saved = stored("lsd-settings")
            val view = stored(PROGRAMMING_VIEW_KEY)
            val values = listOf(saved, view)
            if (values.any { it is WebViewStore.Value }) {
                val applied = applyProgrammingSync(
                    ProgrammingSync((saved as? WebViewStore.Value)?.text, (view as? WebViewStore.Value)?.text),
                    settings,
                    layout,
                    tags,
                )
                settings = applied.settings
                layout = applied.layout
                settingsFile.writeText(encodeDeskSettings(settings))
                layoutFile.writeText(encodeProgrammingLayout(layout))
                learnerOpen.delete()
            } else if (values.none { it is WebViewStore.Unreadable }) {
                learnerOpen.delete()
            }
        }
        var known by mutableStateOf(programmingSeedSnapshot(settings, layout))
        val startLang = intent?.data?.getQueryParameter("lang").orEmpty()
        var course by mutableStateOf<ProgrammingCourse?>(programmingCourse(catalog, startLang))
        var openLearner by mutableStateOf(course != null)
        if (openLearner) learnerOpen.writeText("1")
        fun remember(raw: String?) {
            val post = parseProgrammingSync(raw) ?: return
            if (!programmingSyncChanged(known, post)) return
            known = post
            val applied = applyProgrammingSync(post, settings, layout, tags)
            settings = applied.settings
            layout = applied.layout
            settingsFile.writeText(encodeDeskSettings(settings))
            layoutFile.writeText(encodeProgrammingLayout(layout))
        }
        setContent {
            if (openLearner) {
                val address = learnerAddress(course?.id.orEmpty())
                LearnerWeb(
                    url = address,
                    seedHtml = programmingSeedDocument(settings, layout, address),
                    page = programmingLearnerPage,
                    onSnapshot = { remember(it) },
                    onLeave = { raw ->
                        remember(raw)
                        learnerOpen.delete()
                        openLearner = false
                        course = null
                    },
                )
            } else {
                ProgrammingApp(
                    catalog = catalog,
                    settings = settings,
                    layout = layout,
                    startLang = startLang,
                    onSettings = {
                        settings = it
                        settingsFile.writeText(encodeDeskSettings(it))
                        known = programmingSeedSnapshot(settings, layout)
                    },
                    onLayout = {
                        layout = it
                        layoutFile.writeText(encodeProgrammingLayout(it))
                        known = programmingSeedSnapshot(settings, layout)
                    },
                    onOpenCourse = {
                        course = it
                        known = programmingSeedSnapshot(settings, layout)
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
    return "file:///android_asset/www/programming-learner/index.html$query"
}
