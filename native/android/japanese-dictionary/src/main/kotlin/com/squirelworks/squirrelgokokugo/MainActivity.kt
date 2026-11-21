package com.squirelworks.squirrelgokokugo

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import com.squirelworks.lsd.core.languages.FileFavoriteStore
import com.squirelworks.lsd.core.languages.parseLanguageCatalog
import com.squirelworks.lsd.dictionary.DictionaryApp
import com.squirelworks.lsd.dictionary.KokugoCopy
import java.io.File

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val catalog = parseLanguageCatalog(assets.open("languages.json").bufferedReader().use { it.readText() })
        val store = FileFavoriteStore(File(filesDir, "favorite-languages.txt"))
        val device = resources.configuration.locales[0].toLanguageTag()
        setContent {
            DictionaryApp(
                catalog = catalog,
                store = store,
                copy = KokugoCopy,
                displayName = { it.nativeName.ifBlank { it.name } },
                fallbackId = "japanese",
                deviceTag = device,
                dark = isSystemInDarkTheme(),
            )
        }
    }
}
