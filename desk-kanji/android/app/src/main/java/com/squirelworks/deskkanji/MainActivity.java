package com.squirelworks.deskkanji;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

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

        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("file:///android_asset/www/index.html");
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
