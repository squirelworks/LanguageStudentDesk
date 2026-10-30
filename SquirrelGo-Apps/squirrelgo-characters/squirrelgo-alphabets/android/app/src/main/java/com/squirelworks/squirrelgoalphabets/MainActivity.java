package com.squirelworks.squirrelgoalphabets;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.Locale;

public class MainActivity extends AppCompatActivity {
    private WebView webView;
    private TextToSpeech tts;
    private volatile boolean ttsReady = false;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // WebView has no speechSynthesis, so audio goes through the system
        // TextToSpeech engine via the AndroidTTS bridge below. Each script asks
        // for its own language, so the locale is set per call.
        tts = new TextToSpeech(this, status -> ttsReady = status == TextToSpeech.SUCCESS);

        webView = findViewById(R.id.webview);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setTextZoom(100);

        webView.addJavascriptInterface(new Bridge(), "AndroidTTS");
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("file:///android_asset/www/index.html");
    }

    private boolean hasLanguage(String lang) {
        if (!ttsReady) return false;
        int result = tts.isLanguageAvailable(Locale.forLanguageTag(lang));
        return result != TextToSpeech.LANG_MISSING_DATA && result != TextToSpeech.LANG_NOT_SUPPORTED;
    }

    private class Bridge {
        @JavascriptInterface
        public boolean isReady(String lang) {
            return hasLanguage(lang);
        }

        @JavascriptInterface
        public void speak(String text, float rate, String lang) {
            if (!hasLanguage(lang)) {
                runOnUiThread(() -> Toast.makeText(MainActivity.this,
                        "No text-to-speech voice for this language. Install one in Settings › Text-to-speech.",
                        Toast.LENGTH_LONG).show());
                return;
            }
            tts.setLanguage(Locale.forLanguageTag(lang));
            tts.setSpeechRate(rate);
            tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "char");
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
        // Prefer in-app back navigation over WebView history.
        if (webView != null) {
            webView.evaluateJavascript(
                "(function(){var b=document.getElementById('backBtn'); if(b && !b.classList.contains('hidden')){b.click(); return true;} return false;})()",
                value -> {
                    if ("false".equals(value)) {
                        MainActivity.super.onBackPressed();
                    }
                }
            );
            return;
        }
        super.onBackPressed();
    }
}
