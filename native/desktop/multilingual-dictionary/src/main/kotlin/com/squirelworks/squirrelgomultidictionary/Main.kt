package com.squirelworks.squirrelgomultidictionary

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.squirelworks.lsd.core.languages.FileFavoriteStore
import com.squirelworks.lsd.core.languages.parseLanguageCatalog
import com.squirelworks.lsd.dictionary.DictionaryApp
import com.squirelworks.lsd.dictionary.MultiCopy
import com.squirelworks.lsd.dictionary.favoriteLanguageFile
import com.squirelworks.lsd.dictionary.readCatalogResource
import java.util.Locale

fun main() = application {
    val catalog = parseLanguageCatalog(readCatalogResource())
    val store = FileFavoriteStore(favoriteLanguageFile("squirrelgomultidictionary"))
    val device = Locale.getDefault().toLanguageTag()
    Window(onCloseRequest = ::exitApplication, title = "SquirrelGo Multilingual Dictionary") {
        DictionaryApp(
            catalog = catalog,
            store = store,
            copy = MultiCopy,
            displayName = { it.name },
            fallbackId = "english",
            deviceTag = device,
            dark = isSystemInDarkTheme(),
        )
    }
}
