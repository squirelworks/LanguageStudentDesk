package com.squirelworks.squirrelgophrasebook;

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

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;

import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {
    private static final String EXTRA_QUERY = "com.squirelworks.squirrelgo.QUERY";
    private WebView webView;
    private volatile String pendingQuery;
    private TextToSpeech tts;
    private volatile boolean ttsReady = false;
    private String pendingExport;
    private ActivityResultLauncher<String> saveCsv;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // WebView has no speechSynthesis, so Japanese audio goes through the
        // system TextToSpeech engine via the AndroidTTS bridge below.
        tts = new TextToSpeech(this, status -> {
            if (status != TextToSpeech.SUCCESS) return;
            int result = tts.setLanguage(Locale.JAPAN);
            ttsReady = result != TextToSpeech.LANG_MISSING_DATA && result != TextToSpeech.LANG_NOT_SUPPORTED;
        });

        saveCsv = registerForActivityResult(new ActivityResultContracts.CreateDocument("text/csv"), this::writeExport);

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
        // Flashcards play the recorded phrase as soon as a card is shown.
        settings.setMediaPlaybackRequiresUserGesture(false);

        webView.addJavascriptInterface(new Bridge(), "AndroidTTS");
        webView.setWebViewClient(new WebViewClient());
        // Cross-app links for the SquirrelGo suite (www/js/suite.js).
        pendingQuery = queryOf(getIntent());
        webView.addJavascriptInterface(new SuiteBridge(), "SquirrelGo");
        webView.loadUrl("file:///android_asset/www/index.html");
    }

    private void writeExport(Uri uri) {
        String csv = pendingExport;
        pendingExport = null;
        if (uri == null || csv == null) return;
        try (OutputStream out = getContentResolver().openOutputStream(uri)) {
            out.write(csv.getBytes(StandardCharsets.UTF_8));
            Toast.makeText(this, "Saved", Toast.LENGTH_SHORT).show();
        } catch (Exception e) {
            Toast.makeText(this, "Could not save file", Toast.LENGTH_LONG).show();
        }
    }

    private class Bridge {
        @JavascriptInterface
        public boolean isReady() {
            return ttsReady;
        }

        @JavascriptInterface
        public void speak(String text, float rate) {
            if (!ttsReady) {
                runOnUiThread(() -> Toast.makeText(MainActivity.this,
                        "No Japanese text-to-speech voice. Install one in Settings › Text-to-speech.",
                        Toast.LENGTH_LONG).show());
                return;
            }
            tts.setSpeechRate(rate);
            tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "phrase");
        }

        @JavascriptInterface
        public void stop() {
            if (tts != null) tts.stop();
        }

        @JavascriptInterface
        public void saveFile(String filename, String text) {
            pendingExport = text;
            runOnUiThread(() -> saveCsv.launch(filename));
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
