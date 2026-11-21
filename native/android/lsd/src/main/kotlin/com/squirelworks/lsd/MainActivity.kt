package com.squirelworks.lsd

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.squirelworks.lsd.core.desk.decodeDeskSettings
import com.squirelworks.lsd.core.desk.encodeDeskSettings
import com.squirelworks.lsd.core.desk.parseDeskCatalog
import com.squirelworks.lsd.core.languages.FavoriteLanguages
import com.squirelworks.lsd.core.languages.FavoriteStore
import com.squirelworks.lsd.core.languages.formatFavoriteFile
import com.squirelworks.lsd.core.languages.parseFavoriteFile
import com.squirelworks.lsd.desk.DeskApp
import java.io.File

private class FileFavoriteStore(private val file: File) : FavoriteStore {
    override fun load(): Set<String> = if (file.isFile) parseFavoriteFile(file.readText()) else emptySet()
    override fun save(ids: Set<String>) {
        file.writeText(formatFavoriteFile(ids))
    }
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val catalog = parseDeskCatalog(assets.open("desk.json").bufferedReader().use { it.readText() })
        val settingsFile = File(filesDir, "desk-settings.json")
        val favorites = FavoriteLanguages(FileFavoriteStore(File(filesDir, "desk-favorites.txt")))
        var settings by mutableStateOf(
            decodeDeskSettings(settingsFile.takeIf { it.isFile }?.readText().orEmpty(), com.squirelworks.lsd.core.desk.DeskRules(catalog).fresh()),
        )
        setContent {
            DeskApp(
                catalog = catalog,
                settings = settings,
                favorites = favorites,
                onSettings = { next ->
                    settings = next
                    settingsFile.writeText(encodeDeskSettings(next))
                },
                onFavorites = {},
            )
        }
    }
}
