package com.squirelworks.programmingstudentdesk

import android.annotation.SuppressLint
import android.content.ActivityNotFoundException
import android.content.Intent
import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.viewinterop.AndroidView
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import com.squirelworks.lsd.core.desk.decodeDeskSettings
import com.squirelworks.lsd.core.desk.encodeDeskSettings
import com.squirelworks.lsd.core.programming.ProgrammingCourse
import com.squirelworks.lsd.core.programming.decodeProgrammingLayout
import com.squirelworks.lsd.core.programming.encodeProgrammingLayout
import com.squirelworks.lsd.core.programming.isProgrammingMenuUrl
import com.squirelworks.lsd.core.programming.parseProgrammingCatalog
import com.squirelworks.lsd.core.programming.parseProgrammingSync
import com.squirelworks.lsd.core.programming.programmingCourse
import com.squirelworks.lsd.core.programming.programmingRules
import com.squirelworks.lsd.core.programming.programmingSeedDocument
import com.squirelworks.lsd.core.programming.programmingSyncChanged
import com.squirelworks.lsd.kana.PlatformBackHandler
import com.squirelworks.lsd.programming.ProgrammingApp
import java.io.File
import java.net.URLEncoder

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val catalog = parseProgrammingCatalog(assets.open("programming.json").bufferedReader().use { it.readText() })
        val rules = programmingRules(catalog)
        val settingsFile = File(filesDir, "programming-settings.json")
        val layoutFile = File(filesDir, "programming-view.json")
        var settings by mutableStateOf(decodeDeskSettings(settingsFile.takeIf { it.isFile }?.readText().orEmpty(), rules.fresh()))
        var layout by mutableStateOf(decodeProgrammingLayout(layoutFile.takeIf { it.isFile }?.readText().orEmpty()))
        var known by mutableStateOf(com.squirelworks.lsd.core.programming.programmingSeedSnapshot(settings, layout))
        val startLang = intent?.data?.getQueryParameter("lang").orEmpty()
        var course by mutableStateOf<ProgrammingCourse?>(programmingCourse(catalog, startLang))
        var openLearner by mutableStateOf(course != null)
        fun remember(raw: String?) {
            val post = parseProgrammingSync(raw) ?: return
            if (!programmingSyncChanged(known, post)) return
            known = post
            post.settings?.let { settings = decodeDeskSettings(it, settings) }
            post.view?.let { layout = decodeProgrammingLayout(it) }
            settingsFile.writeText(encodeDeskSettings(settings))
            layoutFile.writeText(encodeProgrammingLayout(layout))
        }
        setContent {
            if (openLearner) {
                val address = learnerAddress(course?.id.orEmpty())
                CourseWeb(
                    url = address,
                    seedHtml = programmingSeedDocument(settings, layout, address),
                    onSnapshot = { remember(it) },
                    onLeave = { raw ->
                        remember(raw)
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
                        known = com.squirelworks.lsd.core.programming.programmingSeedSnapshot(settings, layout)
                    },
                    onLayout = {
                        layout = it
                        layoutFile.writeText(encodeProgrammingLayout(it))
                        known = com.squirelworks.lsd.core.programming.programmingSeedSnapshot(settings, layout)
                    },
                    onOpenCourse = {
                        course = it
                        known = com.squirelworks.lsd.core.programming.programmingSeedSnapshot(settings, layout)
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

private const val READ_STORAGE =
    "(function(){try{return{settings:localStorage.getItem('lsd-settings'),view:localStorage.getItem('lsd-programming-view-v1')};}catch(e){return null;}})()"

@SuppressLint("SetJavaScriptEnabled")
@Composable
private fun CourseWeb(url: String, seedHtml: String, onSnapshot: (String?) -> Unit, onLeave: (String?) -> Unit) {
    val holder = remember(url) { CourseHolder(url, seedHtml) }
    val lifecycle = LocalLifecycleOwner.current.lifecycle
    DisposableEffect(holder, lifecycle) {
        val observer = LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_PAUSE || event == Lifecycle.Event.ON_STOP) holder.read(onSnapshot)
        }
        lifecycle.addObserver(observer)
        onDispose {
            lifecycle.removeObserver(observer)
            holder.destroy()
        }
    }
    PlatformBackHandler(true) { holder.back(onLeave) }
    AndroidView(factory = { holder.attach(it, onLeave) }, modifier = Modifier.fillMaxSize())
}

@SuppressLint("SetJavaScriptEnabled")
private class CourseHolder(private val url: String, private val seedHtml: String) {
    private var webView: WebView? = null
    private var leaving = false
    private var opened = false
    private var onLeave: (String?) -> Unit = {}

    fun attach(context: android.content.Context, onLeave: (String?) -> Unit): WebView {
        this.onLeave = onLeave
        webView?.let { return it }
        val created = WebView(context)
        val settings = created.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.allowFileAccess = true
        settings.allowContentAccess = true
        @Suppress("DEPRECATION")
        settings.allowFileAccessFromFileURLs = true
        @Suppress("DEPRECATION")
        settings.allowUniversalAccessFromFileURLs = true
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        settings.textZoom = 100
        settings.useWideViewPort = true
        settings.loadWithOverviewMode = true
        created.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                val uri = request.url
                if (isProgrammingMenuUrl(uri.toString())) {
                    readAndLeave()
                    return true
                }
                val scheme = uri.scheme
                if (scheme == null || scheme == "file") return false
                if (scheme == "http" || scheme == "https") {
                    try {
                        view.context.startActivity(Intent(Intent.ACTION_VIEW, uri))
                    } catch (_: ActivityNotFoundException) {
                    }
                    return true
                }
                return true
            }

            override fun onPageFinished(view: WebView, finished: String) {
                if (!opened && finished.startsWith("file:")) {
                    opened = true
                    view.clearHistory()
                }
            }
        }
        created.loadDataWithBaseURL(url, seedHtml, "text/html", "utf-8", null)
        webView = created
        return created
    }

    fun read(onSnapshot: (String?) -> Unit) {
        if (leaving) return
        webView?.evaluateJavascript(READ_STORAGE, onSnapshot)
    }

    fun back(onLeave: (String?) -> Unit) {
        this.onLeave = onLeave
        val view = webView
        if (view != null && view.canGoBack()) {
            view.goBack()
            return
        }
        readAndLeave()
    }

    fun destroy() {
        webView?.destroy()
        webView = null
    }

    private fun readAndLeave() {
        if (leaving) return
        leaving = true
        val view = webView
        val leave = onLeave
        if (view == null) leave(null) else view.evaluateJavascript(READ_STORAGE) { leave(it) }
    }
}
