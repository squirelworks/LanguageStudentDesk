package com.squirelworks.lsd

import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.squirelworks.lsd.core.desk.DeskRules
import com.squirelworks.lsd.core.desk.applyDeskWebSnapshot
import com.squirelworks.lsd.core.desk.decodeDeskSettings
import com.squirelworks.lsd.core.desk.deskPagesRoot
import com.squirelworks.lsd.core.desk.encodeDeskSettings
import com.squirelworks.lsd.core.desk.parseDeskCatalog
import com.squirelworks.lsd.core.desk.parseDeskWebSnapshot
import com.squirelworks.lsd.core.languages.FavoriteLanguages
import com.squirelworks.lsd.core.languages.FavoriteStore
import com.squirelworks.lsd.core.languages.formatFavoriteOrder
import com.squirelworks.lsd.core.languages.parseFavoriteFile
import com.squirelworks.lsd.desk.DeskApp
import java.awt.Desktop
import java.io.File
import java.net.URI
import javax.swing.JOptionPane
import javax.swing.SwingUtilities

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
    val www = System.getProperty("compose.application.resources.dir")?.let(::File)?.let { deskPagesRoot(it) }
    var host: DeskLearnerHost? = null
    var portMessage: String? = null
    val sync = mutableStateOf<(String) -> Unit>({ })
    if (www != null) {
        try {
            host = DeskLearnerHost(www, File(dir, "desk-port")) { body ->
                SwingUtilities.invokeLater { sync.value(body) }
            }
        } catch (busy: DeskPortBusy) {
            portMessage = busy.message
        }
    }
    Window(onCloseRequest = {
        host?.close()
        exitApplication()
    }, title = "Language Student Desk") {
        var settings by remember { mutableStateOf(initial) }
        var generation by remember { mutableStateOf(0) }
        sync.value = sync@{ raw ->
            val snapshot = parseDeskWebSnapshot(raw) ?: return@sync
            val applied = applyDeskWebSnapshot(snapshot, settings, favorites.ids())
            settings = applied.settings
            settingsFile.writeText(encodeDeskSettings(settings))
            favorites.replace(applied.favorites)
            generation++
        }
        DisposableEffect(Unit) {
            onDispose { sync.value = {} }
        }
        DeskApp(
            catalog = catalog,
            settings = settings,
            favorites = favorites,
            syncGeneration = generation,
            onSettings = { next ->
                settings = next
                settingsFile.writeText(encodeDeskSettings(next))
            },
            onFavorites = {},
            onOpenLearner = { learner, lang ->
                val open = host
                val blocked = portMessage
                if (blocked != null) {
                    JOptionPane.showMessageDialog(null, blocked)
                } else if (open == null || deskLearnerPage(www!!, learner.href) == null) {
                    JOptionPane.showMessageDialog(null, "This learner is not in the installed Language Student Desk.")
                } else {
                    Desktop.getDesktop().browse(URI(open.seedUrl(settings, favorites.ids(), learner.href, learner.scoped, lang)))
                }
            },
        )
    }
}

private fun deskLearnerPage(www: File, href: String) =
    com.squirelworks.lsd.core.desk.deskLearnerPage(www.parentFile ?: www, href)
