package com.squirelworks.programmingstudentdesk

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
import com.squirelworks.lsd.core.programming.PROGRAMMING_SYNC_SCRIPT
import com.squirelworks.lsd.core.programming.applyProgrammingSync
import com.squirelworks.lsd.core.programming.decodeProgrammingLayout
import com.squirelworks.lsd.core.programming.encodeProgrammingLayout
import com.squirelworks.lsd.core.programming.isProgrammingMenuUrl
import com.squirelworks.lsd.core.programming.normalizeProgrammingLayout
import com.squirelworks.lsd.core.programming.parseProgrammingCatalog
import com.squirelworks.lsd.core.programming.parseProgrammingSync
import com.squirelworks.lsd.core.programming.programmingRules
import com.squirelworks.lsd.core.programming.programmingSeedDocument
import com.squirelworks.lsd.core.programming.programmingSeedSnapshot
import com.squirelworks.lsd.core.programming.programmingSyncChanged
import com.squirelworks.lsd.core.programming.programmingTags
import com.squirelworks.lsd.learner.LearnerPages
import com.squirelworks.lsd.learner.LearnerPagesHost
import com.squirelworks.lsd.learner.LearnerPortBusy
import com.squirelworks.lsd.programming.ProgrammingApp
import java.awt.Desktop
import java.io.File
import java.net.URI
import java.net.URLEncoder
import java.nio.charset.StandardCharsets
import javax.swing.JOptionPane
import javax.swing.SwingUtilities

fun main() = application {
    val catalog = parseProgrammingCatalog(
        object {}.javaClass.classLoader.getResourceAsStream("programming.json")!!.bufferedReader().use { it.readText() },
    )
    val rules = programmingRules(catalog)
    val tags = programmingTags(catalog.courses)
    val dir = File(System.getProperty("user.home"), ".squirrelgo").apply { mkdirs() }
    val settingsFile = File(dir, "programming-settings.json")
    val layoutFile = File(dir, "programming-view.json")
    val initialSettings = decodeDeskSettings(settingsFile.takeIf { it.isFile }?.readText().orEmpty(), rules.fresh())
    val initialLayout = normalizeProgrammingLayout(
        decodeProgrammingLayout(layoutFile.takeIf { it.isFile }?.readText().orEmpty()),
        tags,
    )
    val www = System.getProperty("compose.application.resources.dir")?.let(::File)?.let { deskPagesRoot(it) }
    var host: LearnerPagesHost<com.squirelworks.lsd.core.programming.ProgrammingSync>? = null
    var portMessage: String? = null
    val sync = mutableStateOf<(String) -> Unit>({ })
    if (www != null) {
        try {
            host = LearnerPagesHost(www, File(dir, "programming-desk-port"), programmingPages) { body ->
                SwingUtilities.invokeLater { sync.value(body) }
            }
        } catch (busy: LearnerPortBusy) {
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
            val applied = applyProgrammingSync(post, settings, layout, tags)
            settings = applied.settings
            layout = applied.layout
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
                layout = normalizeProgrammingLayout(it, tags)
                layoutFile.writeText(encodeProgrammingLayout(layout))
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
                    val next = open.origin + coursePath(course?.id.orEmpty())
                    known = programmingSeedSnapshot(settings, layout)
                    Desktop.getDesktop().browse(URI(open.seedUrl(programmingSeedDocument(settings, layout, next), known)))
                }
            },
        )
    }
}

private val programmingPages = LearnerPages(
    syncMarker = "__psdSync",
    syncScript = PROGRAMMING_SYNC_SCRIPT,
    isMenuUrl = ::isProgrammingMenuUrl,
    menuHtml = """
        <!DOCTYPE html>
        <meta charset="utf-8">
        <title>Programming Student Desk</title>
        <p>Back in Programming Student Desk. You can close this tab.</p>
        <script>$PROGRAMMING_SYNC_SCRIPT</script>
    """.trimIndent(),
    portBusy = { port ->
        "Programming Student Desk already uses port $port for its courses. Close the other copy, then open a course again."
    },
    seedMissing = "Open a course from the Desk first.",
    missingPage = "That page is not in this Desk.",
    parse = ::parseProgrammingSync,
    changed = ::programmingSyncChanged,
)

private fun coursePath(lang: String): String {
    val query = if (lang.isBlank()) "" else "?lang=" + URLEncoder.encode(lang, StandardCharsets.UTF_8)
    return "/programming-learner/index.html$query"
}
