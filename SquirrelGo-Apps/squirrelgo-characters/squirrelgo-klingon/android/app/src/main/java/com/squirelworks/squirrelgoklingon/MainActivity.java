package com.squirelworks.squirrelgoklingon;

import android.annotation.SuppressLint;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
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
    private static final String EXTRA_QUERY = "com.squirelworks.squirrelgo.QUERY";
    private WebView webView;
    private volatile String pendingQuery;
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
        // Cross-app links for the SquirrelGo suite (www/js/suite.js).
        pendingQuery = queryOf(getIntent());
        webView.addJavascriptInterface(new SuiteBridge(), "SquirrelGo");
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
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        String q = queryOf(intent);
        if (q == null || webView == null) return;
        pendingQuery = q;
        webView.evaluateJavascript("window.SquirrelGoSuite && SquirrelGoSuite.poll()", null);
    }

    private static String queryOf(Intent intent) {
        if (intent == null) return null;
        String q = intent.getStringExtra(EXTRA_QUERY);
        return q == null || q.isEmpty() ? null : q;
    }

    // Debug builds carry a ".debug" suffix; use whichever variant is installed.
    private Intent launchIntentFor(String pkg) {
        PackageManager pm = getPackageManager();
        Intent i = pm.getLaunchIntentForPackage(pkg + ".debug");
        return i != null ? i : pm.getLaunchIntentForPackage(pkg);
    }

    // The SquirrelGo bridge behind www/js/suite.js: open a sibling app on a
    // query, or its download page when it isn't installed.
    private class SuiteBridge {
        @JavascriptInterface
        public String installed(String pkgs) {
            StringBuilder out = new StringBuilder();
            for (String p : pkgs.split(",")) {
                if (p.isEmpty() || launchIntentFor(p) == null) continue;
                if (out.length() > 0) out.append(',');
                out.append(p);
            }
            return out.toString();
        }

        @JavascriptInterface
        public boolean open(String pkg, String query) {
            Intent i = launchIntentFor(pkg);
            if (i == null) return false;
            if (query != null && !query.isEmpty()) i.putExtra(EXTRA_QUERY, query);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            runOnUiThread(() -> startActivity(i));
            return true;
        }

        @JavascriptInterface
        public void openUrl(String url) {
            if (url == null || !url.startsWith("https://")) return;
            runOnUiThread(() -> {
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
                } catch (ActivityNotFoundException ignored) {
                }
            });
        }

        @JavascriptInterface
        public String takeQuery() {
            String q = pendingQuery;
            pendingQuery = null;
            return q == null ? "" : q;
        }
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        // Prefer in-app back navigation over WebView history.
        if (webView != null) {
            webView.evaluateJavascript(
                "(function(){if(window.SquirrelGoSuite&&SquirrelGoSuite.back())return true;var b=document.getElementById('backBtn'); if(b && !b.classList.contains('hidden')){b.click(); return true;} return false;})()",
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
