package com.squirelworks.electronicsstudentdesk

import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.squirelworks.lsd.core.desk.decodeDeskSettings
import com.squirelworks.lsd.core.desk.deskPagesRoot
import com.squirelworks.lsd.core.desk.encodeDeskSettings
import com.squirelworks.lsd.core.electronics.ELECTRONICS_SYNC_SCRIPT
import com.squirelworks.lsd.core.electronics.applyElectronicsSync
import com.squirelworks.lsd.core.electronics.decodeElectronicsLayout
import com.squirelworks.lsd.core.electronics.electronicsRules
import com.squirelworks.lsd.core.electronics.electronicsSeedDocument
import com.squirelworks.lsd.core.electronics.electronicsSeedSnapshot
import com.squirelworks.lsd.core.electronics.electronicsSyncChanged
import com.squirelworks.lsd.core.electronics.electronicsTags
import com.squirelworks.lsd.core.electronics.encodeElectronicsLayout
import com.squirelworks.lsd.core.electronics.isElectronicsMenuUrl
import com.squirelworks.lsd.core.electronics.normalizeElectronicsLayout
import com.squirelworks.lsd.core.electronics.parseElectronicsCatalog
import com.squirelworks.lsd.core.electronics.parseElectronicsSync
import com.squirelworks.lsd.electronics.ElectronicsApp
import com.squirelworks.lsd.learner.LearnerPages
import com.squirelworks.lsd.learner.LearnerPagesHost
import com.squirelworks.lsd.learner.LearnerPortBusy
import java.awt.Desktop
import java.io.File
import java.net.URI
import java.net.URLEncoder
import java.nio.charset.StandardCharsets
import javax.swing.JOptionPane
import javax.swing.SwingUtilities

fun main() = application {
    val catalog = parseElectronicsCatalog(
        object {}.javaClass.classLoader.getResourceAsStream("electronics.json")!!.bufferedReader().use { it.readText() },
    )
    val rules = electronicsRules(catalog)
    val tags = electronicsTags(catalog.courses)
    val dir = File(System.getProperty("user.home"), ".squirrelgo").apply { mkdirs() }
    val settingsFile = File(dir, "electronics-settings.json")
    val layoutFile = File(dir, "electronics-view.json")
    val initialSettings = decodeDeskSettings(settingsFile.takeIf { it.isFile }?.readText().orEmpty(), rules.fresh())
    val initialLayout = normalizeElectronicsLayout(decodeElectronicsLayout(layoutFile.takeIf { it.isFile }?.readText().orEmpty()), tags)
    val www = System.getProperty("compose.application.resources.dir")?.let(::File)?.let { deskPagesRoot(it) }
    var host: LearnerPagesHost<com.squirelworks.lsd.core.electronics.ElectronicsSync>? = null
    var portMessage: String? = null
    val sync = mutableStateOf<(String) -> Unit>({ })
    if (www != null) {
        try {
            host = LearnerPagesHost(www, File(dir, "electronics-desk-port"), electronicsPages) { body ->
                SwingUtilities.invokeLater { sync.value(body) }
            }
        } catch (busy: LearnerPortBusy) {
            portMessage = busy.message
        }
    }
    Window(onCloseRequest = {
        host?.close()
        exitApplication()
    }, title = "Electronics Student Desk") {
        var settings by remember { mutableStateOf(initialSettings) }
        var layout by remember { mutableStateOf(initialLayout) }
        var known by remember { mutableStateOf(electronicsSeedSnapshot(settings, layout)) }
        sync.value = sync@{ raw ->
            val post = parseElectronicsSync(raw) ?: return@sync
            if (!electronicsSyncChanged(known, post)) return@sync
            known = post
            val applied = applyElectronicsSync(post, settings, layout, tags)
            settings = applied.settings
            layout = applied.layout
            settingsFile.writeText(encodeDeskSettings(settings))
            layoutFile.writeText(encodeElectronicsLayout(layout))
        }
        DisposableEffect(Unit) { onDispose { sync.value = {} } }
        ElectronicsApp(
            catalog = catalog,
            layout = layout,
            onLayout = {
                layout = normalizeElectronicsLayout(it, tags)
                layoutFile.writeText(encodeElectronicsLayout(layout))
                known = electronicsSeedSnapshot(settings, layout)
            },
            onOpenCourse = { course ->
                val open = host
                val blocked = portMessage
                val page = www?.let { File(it, "electronics-learner/index.html") }
                if (blocked != null) {
                    JOptionPane.showMessageDialog(null, blocked)
                } else if (open == null || page?.isFile != true) {
                    JOptionPane.showMessageDialog(null, "This course is not in the installed Electronics Student Desk.")
                } else {
                    val next = open.origin + coursePath(course?.id.orEmpty())
                    known = electronicsSeedSnapshot(settings, layout)
                    Desktop.getDesktop().browse(URI(open.seedUrl(electronicsSeedDocument(settings, layout, next), known)))
                }
            },
        )
    }
}

private val electronicsPages = LearnerPages(
    syncMarker = "__esdSync",
    syncScript = ELECTRONICS_SYNC_SCRIPT,
    isMenuUrl = ::isElectronicsMenuUrl,
    menuHtml = """
        <!DOCTYPE html>
        <meta charset="utf-8">
        <title>Electronics Student Desk</title>
        <p>Back in Electronics Student Desk. You can close this tab.</p>
        <script>$ELECTRONICS_SYNC_SCRIPT</script>
    """.trimIndent(),
    portBusy = { port ->
        "Electronics Student Desk already uses port $port for its courses. Close the other copy, then open a course again."
    },
    seedMissing = "Open a course from the Desk first.",
    missingPage = "That page is not in this Desk.",
    parse = ::parseElectronicsSync,
    changed = ::electronicsSyncChanged,
)

private fun coursePath(lang: String): String {
    val query = if (lang.isBlank()) "" else "?lang=" + URLEncoder.encode(lang, StandardCharsets.UTF_8)
    return "/electronics-learner/index.html$query"
}
