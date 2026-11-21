package com.squirelworks.squirrelgokokugo

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.squirelworks.lsd.core.languages.FileFavoriteStore
import com.squirelworks.lsd.core.languages.parseLanguageCatalog
import com.squirelworks.lsd.dictionary.DictionaryApp
import com.squirelworks.lsd.dictionary.KokugoCopy
import com.squirelworks.lsd.dictionary.favoriteLanguageFile
import com.squirelworks.lsd.dictionary.readCatalogResource
import java.util.Locale

fun main() = application {
    val catalog = parseLanguageCatalog(readCatalogResource())
    val store = FileFavoriteStore(favoriteLanguageFile("squirrelgokokugo"))
    val device = Locale.getDefault().toLanguageTag()
    Window(onCloseRequest = ::exitApplication, title = "SquirrelGo 国語辞典") {
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
