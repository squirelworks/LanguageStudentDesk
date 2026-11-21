package com.squirelworks.mathseducationtraininghelper

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.squirelworks.lsd.core.desk.decodeDeskSettings
import com.squirelworks.lsd.core.desk.encodeDeskSettings
import com.squirelworks.lsd.core.math.MATH_PROGRESS_KEY
import com.squirelworks.lsd.core.math.MATH_VIEW_KEY
import com.squirelworks.lsd.core.math.MathCourse
import com.squirelworks.lsd.core.math.MathSync
import com.squirelworks.lsd.core.math.applyMathSync
import com.squirelworks.lsd.core.math.decodeMathLayout
import com.squirelworks.lsd.core.math.encodeMathLayout
import com.squirelworks.lsd.core.math.importMathWebView
import com.squirelworks.lsd.core.math.isMathMenuUrl
import com.squirelworks.lsd.core.math.mathCourse
import com.squirelworks.lsd.core.math.mathRules
import com.squirelworks.lsd.core.math.mathSeedDocument
import com.squirelworks.lsd.core.math.mathSeedSnapshot
import com.squirelworks.lsd.core.math.mathSyncChanged
import com.squirelworks.lsd.core.math.mathTags
import com.squirelworks.lsd.core.math.normalizeMathLayout
import com.squirelworks.lsd.core.math.parseMathCatalog
import com.squirelworks.lsd.core.math.parseMathSync
import com.squirelworks.lsd.kana.WebViewStore
import com.squirelworks.lsd.kana.readWebViewProgress
import com.squirelworks.lsd.learner.LearnerPage
import com.squirelworks.lsd.learner.LearnerWeb
import com.squirelworks.lsd.math.MathApp
import java.io.File
import java.net.URLEncoder

private val mathLearnerPage = LearnerPage(
    isMenuUrl = ::isMathMenuUrl,
    readStorageJs = "(function(){try{return{settings:localStorage.getItem('lsd-settings'),view:localStorage.getItem('lsd-math-view-v1'),progress:localStorage.getItem('lsd-math-v1')};}catch(e){return null;}})()",
    speech = false,
)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val catalog = parseMathCatalog(assets.open("math.json").bufferedReader().use { it.readText() })
        val rules = mathRules(catalog)
        val tags = mathTags(catalog.courses)
        val settingsFile = File(filesDir, "math-settings.json")
        val layoutFile = File(filesDir, "math-view.json")
        val progressFile = File(filesDir, "math-progress.json")
        val learnerOpen = File(filesDir, "math-learner-open")
        var settings by mutableStateOf(decodeDeskSettings(settingsFile.takeIf { it.isFile }?.readText().orEmpty(), rules.fresh()))
        var layout by mutableStateOf(normalizeMathLayout(decodeMathLayout(layoutFile.takeIf { it.isFile }?.readText().orEmpty()), tags))
        var progress by mutableStateOf(progressFile.takeIf { it.isFile }?.readText())
        val dataDir = File(applicationInfo.dataDir)
        fun stored(key: String) = readWebViewProgress(dataDir, key, raw = true)
        if (!settings.importedWebView) {
            fun text(key: String) = (stored(key) as? WebViewStore.Value)?.text
            val imported = importMathWebView(text("lsd-settings"), text(MATH_VIEW_KEY), text(MATH_PROGRESS_KEY), settings, layout, tags)
            settings = imported.settings
            layout = imported.layout
            progress = imported.progress
            settingsFile.writeText(encodeDeskSettings(settings))
            layoutFile.writeText(encodeMathLayout(layout))
            progressFile.writeText(progress.orEmpty())
        }
        if (learnerOpen.isFile) {
            val saved = stored("lsd-settings")
            val view = stored(MATH_VIEW_KEY)
            val courseProgress = stored(MATH_PROGRESS_KEY)
            val values = listOf(saved, view, courseProgress)
            if (values.any { it is WebViewStore.Value }) {
                val applied = applyMathSync(
                    MathSync((saved as? WebViewStore.Value)?.text, (view as? WebViewStore.Value)?.text, (courseProgress as? WebViewStore.Value)?.text),
                    settings,
                    layout,
                    progress,
                    tags,
                )
                settings = applied.settings
                layout = applied.layout
                progress = applied.progress
                settingsFile.writeText(encodeDeskSettings(settings))
                layoutFile.writeText(encodeMathLayout(layout))
                progressFile.writeText(progress.orEmpty())
                learnerOpen.delete()
            } else if (values.none { it is WebViewStore.Unreadable }) {
                learnerOpen.delete()
            }
        }
        var known by mutableStateOf(mathSeedSnapshot(settings, layout, progress))
        val startLang = intent?.data?.getQueryParameter("lang").orEmpty()
        var course by mutableStateOf<MathCourse?>(mathCourse(catalog, startLang))
        var openLearner by mutableStateOf(course != null)
        if (openLearner) learnerOpen.writeText("1")
        fun remember(raw: String?) {
            val post = parseMathSync(raw) ?: return
            if (!mathSyncChanged(known, post)) return
            known = post
            val applied = applyMathSync(post, settings, layout, progress, tags)
            settings = applied.settings
            layout = applied.layout
            progress = applied.progress
            settingsFile.writeText(encodeDeskSettings(settings))
            layoutFile.writeText(encodeMathLayout(layout))
            progressFile.writeText(progress.orEmpty())
        }
        setContent {
            if (openLearner) {
                val address = learnerAddress(course?.id.orEmpty())
                LearnerWeb(
                    url = address,
                    seedHtml = mathSeedDocument(settings, layout, progress, address),
                    page = mathLearnerPage,
                    onSnapshot = { remember(it) },
                    onLeave = { raw ->
                        remember(raw)
                        learnerOpen.delete()
                        openLearner = false
                        course = null
                    },
                )
            } else {
                MathApp(
                    catalog = catalog,
                    layout = layout,
                    startLang = startLang,
                    onLayout = {
                        layout = it
                        layoutFile.writeText(encodeMathLayout(it))
                        known = mathSeedSnapshot(settings, layout, progress)
                    },
                    onOpenCourse = {
                        course = it
                        known = mathSeedSnapshot(settings, layout, progress)
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
    return "file:///android_asset/www/math-learner/index.html$query"
}
