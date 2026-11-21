package com.squirelworks.lsd

import android.annotation.SuppressLint
import android.content.ActivityNotFoundException
import android.content.Intent
import android.speech.tts.TextToSpeech
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import com.squirelworks.lsd.core.desk.deskSeedDocument
import com.squirelworks.lsd.core.desk.isDeskMenuUrl
import com.squirelworks.lsd.kana.PlatformBackHandler
import java.util.Locale

// The same stand-in the WebView shell uses when speechSynthesis is missing.
private const val SPEECH_POLYFILL =
    "(function(){" +
        "if(window.speechSynthesis||!window.AndroidTTS)return;" +
        "function V(lang){this.lang=lang;this.name=lang;this.default=false;this.localService=true;this.voiceURI=lang;}" +
        "var voices=[];" +
        "try{String(AndroidTTS.voices()||'').split(',').filter(Boolean).forEach(function(l){voices.push(new V(l));});}catch(e){}" +
        "function U(text){this.text=text||'';this.lang='';this.rate=1;}" +
        "window.SpeechSynthesisUtterance=U;" +
        "window.speechSynthesis={" +
        "getVoices:function(){return voices;}," +
        "speak:function(u){try{AndroidTTS.speak(String(u&&u.text||''),Number(u&&u.rate)||1,String(u&&u.lang||''));}catch(e){}}," +
        "cancel:function(){try{AndroidTTS.stop();}catch(e){}}," +
        "pause:function(){},resume:function(){}," +
        "addEventListener:function(){},removeEventListener:function(){}," +
        "pending:false,speaking:false,paused:false" +
        "};" +
        "})();"

private const val READ_STORAGE =
    "(function(){try{return{settings:localStorage.getItem('lsd-settings'),favorites:localStorage.getItem('lsd-favorite-languages'),lang:localStorage.getItem('lsd-suite-lang')};}catch(e){return null;}})()"

// One WebView, configured the way the suite shell configured its WebView.
// Back walks the learner's own history before returning to the native menu.
@SuppressLint("SetJavaScriptEnabled", "AddJavascriptInterface")
@Composable
fun LearnerWeb(url: String, seedHtml: String, onLeave: (String?) -> Unit) {
    val holder = remember(url) { LearnerWebHolder(url, seedHtml) }
    DisposableEffect(holder) {
        onDispose { holder.destroy() }
    }
    PlatformBackHandler(true) { holder.back(onLeave) }
    AndroidView(
        factory = { context -> holder.attach(context, onLeave) },
        modifier = Modifier.fillMaxSize(),
        update = { holder.attach(it.context, onLeave) },
    )
}

@SuppressLint("SetJavaScriptEnabled", "AddJavascriptInterface")
private class LearnerWebHolder(private val url: String, private val seedHtml: String) {
    private var webView: WebView? = null
    private var tts: TextToSpeech? = null
    private var ttsReady = false
    private var leaving = false
    private var openedLearner = false
    private var onLeave: (String?) -> Unit = {}

    fun attach(context: android.content.Context, onLeave: (String?) -> Unit): WebView {
        this.onLeave = onLeave
        webView?.let { return it }
        val created = WebView(context)
        val engine = TextToSpeech(context) { status ->
            ttsReady = status == TextToSpeech.SUCCESS
            installSpeech()
        }
        tts = engine
        configure(created, engine)
        created.loadDataWithBaseURL(url, seedHtml, "text/html", "utf-8", null)
        webView = created
        return created
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
        tts?.stop()
        tts?.shutdown()
        tts = null
        webView?.destroy()
        webView = null
    }

    private fun configure(view: WebView, engine: TextToSpeech) {
        val settings = view.settings
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
        settings.mediaPlaybackRequiresUserGesture = false
        view.addJavascriptInterface(SpeechBridge(view, engine), "AndroidTTS")
        view.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(web: WebView, request: WebResourceRequest): Boolean {
                val uri = request.url
                val url = uri.toString()
                if (isDeskMenuUrl(url)) {
                    readAndLeave()
                    return true
                }
                val scheme = uri.scheme
                if (scheme == null || scheme == "file") return false
                if (scheme == "http" || scheme == "https") {
                    try {
                        web.context.startActivity(Intent(Intent.ACTION_VIEW, uri))
                    } catch (_: ActivityNotFoundException) {
                    }
                    return true
                }
                return true
            }

            override fun onPageFinished(web: WebView, finished: String) {
                installSpeech()
                // Drop the seed document so Back walks the learner, then the native menu.
                if (!openedLearner && finished.startsWith("file:")) {
                    openedLearner = true
                    web.clearHistory()
                }
            }
        }
    }

    private fun installSpeech() {
        val view = webView ?: return
        if (!ttsReady) return
        view.evaluateJavascript(SPEECH_POLYFILL, null)
    }

    private fun readAndLeave() {
        if (leaving) return
        leaving = true
        val view = webView
        val leave = onLeave
        if (view == null) {
            leave(null)
            return
        }
        view.evaluateJavascript(READ_STORAGE) { raw -> leave(raw) }
    }

    private inner class SpeechBridge(private val view: WebView, private val engine: TextToSpeech) {
        @JavascriptInterface
        fun voices(): String {
            if (!ttsReady) return ""
            val langs = engine.availableLanguages ?: return ""
            return langs.filter { hasLanguage(it) }.joinToString(",") { it.toLanguageTag() }
        }

        @JavascriptInterface
        fun speak(text: String?, rate: Float, lang: String?) {
            if (!ttsReady || text.isNullOrEmpty()) return
            val locale = if (lang.isNullOrEmpty()) Locale.getDefault() else Locale.forLanguageTag(lang)
            if (!hasLanguage(locale)) {
                view.post {
                    Toast.makeText(
                        view.context,
                        "No text-to-speech voice for this language. Install one in Settings › Text-to-speech.",
                        Toast.LENGTH_LONG,
                    ).show()
                }
                return
            }
            engine.setLanguage(locale)
            engine.setSpeechRate(if (rate > 0f) rate else 1f)
            engine.speak(text, TextToSpeech.QUEUE_FLUSH, null, "lsd")
        }

        @JavascriptInterface
        fun stop() {
            engine.stop()
        }

        private fun hasLanguage(locale: Locale): Boolean {
            if (!ttsReady) return false
            val result = engine.isLanguageAvailable(locale)
            return result != TextToSpeech.LANG_MISSING_DATA && result != TextToSpeech.LANG_NOT_SUPPORTED
        }
    }
}

fun learnerAddress(href: String, scoped: Boolean, lang: String): String {
    val query = if (scoped && lang.isNotBlank()) "?lang=" + java.net.URLEncoder.encode(lang, "UTF-8") else ""
    return "file:///android_asset/www/$href$query"
}

fun learnerSeed(settings: com.squirelworks.lsd.core.desk.DeskSettings, favoriteIds: Iterable<String>, href: String, scoped: Boolean, lang: String): String =
    deskSeedDocument(settings, favoriteIds, learnerAddress(href, scoped, lang))
