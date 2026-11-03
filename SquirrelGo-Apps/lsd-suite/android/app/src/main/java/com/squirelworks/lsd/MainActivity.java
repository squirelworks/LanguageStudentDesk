package com.squirelworks.lsd;

import android.annotation.SuppressLint;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.Locale;
import java.util.Set;

public class MainActivity extends AppCompatActivity {
    private static final String HOME =
            "file:///android_asset/www/index.html";

    // Desk learners call speechSynthesis. WebView often has none, so this
    // stands in for it and speaks through the system text-to-speech engine.
    private static final String SPEECH_POLYFILL =
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
            "})();";

    private WebView webView;
    private TextToSpeech tts;
    private volatile boolean ttsReady = false;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tts = new TextToSpeech(this, status -> {
            ttsReady = status == TextToSpeech.SUCCESS;
            installSpeech();
        });

        webView = findViewById(R.id.webview);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        // Learners load each other, and their data, with relative file URLs.
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setTextZoom(100);
        // Honour the pages' viewport meta so the phone layouts actually apply.
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setMediaPlaybackRequiresUserGesture(false);

        webView.addJavascriptInterface(new SpeechBridge(), "AndroidTTS");
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                String scheme = uri.getScheme();
                if (scheme == null || "file".equals(scheme)) return false;
                if ("http".equals(scheme) || "https".equals(scheme)) {
                    try {
                        startActivity(new Intent(Intent.ACTION_VIEW, uri));
                    } catch (ActivityNotFoundException ignored) {
                    }
                    return true;
                }
                return true;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                installSpeech();
            }
        });
        webView.loadUrl(HOME);
    }

    private void installSpeech() {
        if (webView == null || !ttsReady) return;
        webView.evaluateJavascript(SPEECH_POLYFILL, null);
    }

    private boolean hasLanguage(Locale locale) {
        if (!ttsReady || tts == null || locale == null) return false;
        int result = tts.isLanguageAvailable(locale);
        return result != TextToSpeech.LANG_MISSING_DATA && result != TextToSpeech.LANG_NOT_SUPPORTED;
    }

    private class SpeechBridge {
        @JavascriptInterface
        public String voices() {
            if (!ttsReady || tts == null) return "";
            Set<Locale> langs = tts.getAvailableLanguages();
            if (langs == null) return "";
            StringBuilder out = new StringBuilder();
            for (Locale locale : langs) {
                if (!hasLanguage(locale)) continue;
                if (out.length() > 0) out.append(',');
                out.append(locale.toLanguageTag());
            }
            return out.toString();
        }

        @JavascriptInterface
        public void speak(String text, float rate, String lang) {
            if (!ttsReady || text == null || text.isEmpty()) return;
            Locale locale = (lang == null || lang.isEmpty()) ? Locale.getDefault() : Locale.forLanguageTag(lang);
            if (!hasLanguage(locale)) {
                runOnUiThread(() -> Toast.makeText(MainActivity.this,
                        "No text-to-speech voice for this language. Install one in Settings › Text-to-speech.",
                        Toast.LENGTH_LONG).show());
                return;
            }
            tts.setLanguage(locale);
            tts.setSpeechRate(rate > 0 ? rate : 1f);
            tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "lsd");
        }

        @JavascriptInterface
        public void stop() {
            if (tts != null) tts.stop();
        }
    }

    @Override
    protected void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
        super.onDestroy();
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
            return;
        }
        super.onBackPressed();
    }
}
