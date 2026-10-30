package com.squirelworks.squirrelgoorthodoxbible;

import android.annotation.SuppressLint;
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
    private WebView webView;
    private TextToSpeech tts;
    private volatile boolean ttsReady = false;
    private String pendingExport;
    private ActivityResultLauncher<String> saveFile;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // WebView has no speechSynthesis, so read-aloud goes through the
        // system TextToSpeech engine via the AndroidTTS bridge below.
        tts = new TextToSpeech(this, status -> ttsReady = status == TextToSpeech.SUCCESS);

        saveFile = registerForActivityResult(new ActivityResultContracts.CreateDocument("text/plain"), this::writeExport);

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

    private void writeExport(Uri uri) {
        String text = pendingExport;
        pendingExport = null;
        if (uri == null || text == null) return;
        try (OutputStream out = getContentResolver().openOutputStream(uri)) {
            out.write(text.getBytes(StandardCharsets.UTF_8));
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
        public void speak(String text, String lang, float rate) {
            if (!ttsReady) return;
            int result = tts.setLanguage(Locale.forLanguageTag(lang));
            if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                runOnUiThread(() -> Toast.makeText(MainActivity.this,
                        "No text-to-speech voice for this language. Install one in Settings › Text-to-speech.",
                        Toast.LENGTH_LONG).show());
                return;
            }
            tts.setSpeechRate(rate);
            tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "verse");
        }

        @JavascriptInterface
        public void stop() {
            if (tts != null) tts.stop();
        }

        @JavascriptInterface
        public void saveFile(String filename, String text) {
            pendingExport = text;
            runOnUiThread(() -> saveFile.launch(filename));
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
