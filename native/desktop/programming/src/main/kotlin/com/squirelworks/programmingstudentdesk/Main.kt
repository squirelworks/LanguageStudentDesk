package com.squirelworks.programmingstudentdesk

import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.squirelworks.lsd.core.desk.decodeDeskSettings
import com.squirelworks.lsd.core.desk.encodeDeskSettings
import com.squirelworks.lsd.core.desk.deskPagesRoot
import com.squirelworks.lsd.core.programming.decodeProgrammingLayout
import com.squirelworks.lsd.core.programming.encodeProgrammingLayout
import com.squirelworks.lsd.core.programming.parseProgrammingCatalog
import com.squirelworks.lsd.core.programming.parseProgrammingSync
import com.squirelworks.lsd.core.programming.programmingRules
import com.squirelworks.lsd.core.programming.programmingSeedSnapshot
import com.squirelworks.lsd.core.programming.programmingSyncChanged
import com.squirelworks.lsd.programming.ProgrammingApp
import java.awt.Desktop
import java.io.File
import java.net.URI
import javax.swing.JOptionPane
import javax.swing.SwingUtilities

fun main() = application {
    val catalog = parseProgrammingCatalog(
        object {}.javaClass.classLoader.getResourceAsStream("programming.json")!!.bufferedReader().use { it.readText() },
    )
    val rules = programmingRules(catalog)
    val dir = File(System.getProperty("user.home"), ".squirrelgo").apply { mkdirs() }
    val settingsFile = File(dir, "programming-settings.json")
    val layoutFile = File(dir, "programming-view.json")
    val initialSettings = decodeDeskSettings(settingsFile.takeIf { it.isFile }?.readText().orEmpty(), rules.fresh())
    val initialLayout = decodeProgrammingLayout(layoutFile.takeIf { it.isFile }?.readText().orEmpty())
    val www = System.getProperty("compose.application.resources.dir")?.let(::File)?.let { deskPagesRoot(it) }
    var host: ProgrammingHost? = null
    var portMessage: String? = null
    val sync = mutableStateOf<(String) -> Unit>({ })
    if (www != null) {
        try {
            host = ProgrammingHost(www, File(dir, "programming-desk-port")) { body ->
                SwingUtilities.invokeLater { sync.value(body) }
            }
        } catch (busy: ProgrammingPortBusy) {
            portMessage = busy.message
        }
    }
    Window(onCloseRequest = {
        host?.close()
        exitApplication()
    }, title = "Programming Student Desk") {
        var settings by remember { mutableStateOf(initialSettings) }
        var layout by remember { mutableStateOf(initialLayout) }
        var known by remember { mutableStateOf(programmingSeedSnapshot(settings, layout)) }
        sync.value = sync@{ raw ->
            val post = parseProgrammingSync(raw) ?: return@sync
            if (!programmingSyncChanged(known, post)) return@sync
            known = post
            post.settings?.let { settings = decodeDeskSettings(it, settings) }
            post.view?.let { layout = decodeProgrammingLayout(it) }
            settingsFile.writeText(encodeDeskSettings(settings))
            layoutFile.writeText(encodeProgrammingLayout(layout))
        }
        DisposableEffect(Unit) { onDispose { sync.value = {} } }
        ProgrammingApp(
            catalog = catalog,
            settings = settings,
            layout = layout,
            onSettings = {
                settings = it
                settingsFile.writeText(encodeDeskSettings(it))
                known = programmingSeedSnapshot(settings, layout)
            },
            onLayout = {
                layout = it
                layoutFile.writeText(encodeProgrammingLayout(it))
                known = programmingSeedSnapshot(settings, layout)
            },
            onOpenCourse = { course ->
                val open = host
                val blocked = portMessage
                val page = www?.let { File(it, "programming-learner/index.html") }
                if (blocked != null) {
                    JOptionPane.showMessageDialog(null, blocked)
                } else if (open == null || page?.isFile != true) {
                    JOptionPane.showMessageDialog(null, "This course is not in the installed Programming Student Desk.")
                } else {
                    known = programmingSeedSnapshot(settings, layout)
                    Desktop.getDesktop().browse(URI(open.seedUrl(settings, layout, course?.id.orEmpty())))
                }
            },
        )
    }
}
