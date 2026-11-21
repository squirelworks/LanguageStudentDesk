package com.squirelworks.lsd

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.squirelworks.lsd.core.desk.DeskRules
import com.squirelworks.lsd.core.desk.decodeDeskSettings
import com.squirelworks.lsd.core.desk.deskLearnerPage
import com.squirelworks.lsd.core.desk.encodeDeskSettings
import com.squirelworks.lsd.core.desk.parseDeskCatalog
import com.squirelworks.lsd.core.languages.FavoriteLanguages
import com.squirelworks.lsd.core.languages.FavoriteStore
import com.squirelworks.lsd.core.languages.formatFavoriteOrder
import com.squirelworks.lsd.core.languages.parseFavoriteFile
import com.squirelworks.lsd.desk.DeskApp
import java.awt.Desktop
import java.io.File
import java.net.URI
import javax.swing.JOptionPane

fun main() = application {
    val catalog = parseDeskCatalog(
        object {}.javaClass.classLoader.getResourceAsStream("desk.json")!!.bufferedReader().use { it.readText() },
    )
    val dir = File(System.getProperty("user.home"), ".squirrelgo").apply { mkdirs() }
    val settingsFile = File(dir, "desk-settings.json")
    val favorites = FavoriteLanguages(object : FavoriteStore {
        private val file = File(dir, "desk-favorites.txt")
        override fun load() = if (file.isFile) parseFavoriteFile(file.readText()) else emptySet()
        override fun save(ids: Set<String>) { file.writeText(formatFavoriteOrder(ids)) }
    })
    val initial = decodeDeskSettings(settingsFile.takeIf { it.isFile }?.readText().orEmpty(), DeskRules(catalog).fresh())
    Window(onCloseRequest = ::exitApplication, title = "Language Student Desk") {
        var settings by remember { mutableStateOf(initial) }
        DeskApp(
            catalog = catalog,
            settings = settings,
            favorites = favorites,
            onSettings = { next ->
                settings = next
                settingsFile.writeText(encodeDeskSettings(next))
            },
            onFavorites = {},
            onOpenLearner = { learner, lang ->
                val resources = System.getProperty("compose.application.resources.dir")?.let(::File)
                val page = resources?.let { deskLearnerPage(it, learner.href) }
                if (page == null) {
                    JOptionPane.showMessageDialog(null, "This learner is not in the installed Language Student Desk.")
                } else {
                    val query = if (learner.scoped && lang.isNotBlank()) "?lang=$lang" else ""
                    Desktop.getDesktop().browse(URI(page.toURI().toString() + query))
                }
            },
        )
    }
}
