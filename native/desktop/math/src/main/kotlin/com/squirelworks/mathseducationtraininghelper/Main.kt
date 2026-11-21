package com.squirelworks.mathseducationtraininghelper

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
import com.squirelworks.lsd.core.math.MATH_SYNC_SCRIPT
import com.squirelworks.lsd.core.math.applyMathSync
import com.squirelworks.lsd.core.math.decodeMathLayout
import com.squirelworks.lsd.core.math.encodeMathLayout
import com.squirelworks.lsd.core.math.isMathMenuUrl
import com.squirelworks.lsd.core.math.mathRules
import com.squirelworks.lsd.core.math.mathSeedDocument
import com.squirelworks.lsd.core.math.mathSeedSnapshot
import com.squirelworks.lsd.core.math.mathSyncChanged
import com.squirelworks.lsd.core.math.mathTags
import com.squirelworks.lsd.core.math.normalizeMathLayout
import com.squirelworks.lsd.core.math.parseMathCatalog
import com.squirelworks.lsd.core.math.parseMathSync
import com.squirelworks.lsd.learner.LearnerPages
import com.squirelworks.lsd.learner.LearnerPagesHost
import com.squirelworks.lsd.learner.LearnerPortBusy
import com.squirelworks.lsd.math.MathApp
import java.awt.Desktop
import java.io.File
import java.net.URI
import java.net.URLEncoder
import java.nio.charset.StandardCharsets
import javax.swing.JOptionPane
import javax.swing.SwingUtilities

fun main() = application {
    val catalog = parseMathCatalog(
        object {}.javaClass.classLoader.getResourceAsStream("math.json")!!.bufferedReader().use { it.readText() },
    )
    val rules = mathRules(catalog)
    val tags = mathTags(catalog.courses)
    val dir = File(System.getProperty("user.home"), ".squirrelgo").apply { mkdirs() }
    val settingsFile = File(dir, "math-settings.json")
    val layoutFile = File(dir, "math-view.json")
    val progressFile = File(dir, "math-progress.json")
    val initialSettings = decodeDeskSettings(settingsFile.takeIf { it.isFile }?.readText().orEmpty(), rules.fresh())
    val initialLayout = normalizeMathLayout(decodeMathLayout(layoutFile.takeIf { it.isFile }?.readText().orEmpty()), tags)
    val initialProgress = progressFile.takeIf { it.isFile }?.readText()?.ifEmpty { null }
    val www = System.getProperty("compose.application.resources.dir")?.let(::File)?.let { deskPagesRoot(it) }
    var host: LearnerPagesHost<com.squirelworks.lsd.core.math.MathSync>? = null
    var portMessage: String? = null
    val sync = mutableStateOf<(String) -> Unit>({ })
    if (www != null) {
        try {
            host = LearnerPagesHost(www, File(dir, "math-desk-port"), mathPages) { body ->
                SwingUtilities.invokeLater { sync.value(body) }
            }
        } catch (busy: LearnerPortBusy) {
            portMessage = busy.message
        }
    }
    Window(onCloseRequest = {
        host?.close()
        exitApplication()
    }, title = "Maths Edu-Training Helper") {
        var settings by remember { mutableStateOf(initialSettings) }
        var layout by remember { mutableStateOf(initialLayout) }
        var progress by remember { mutableStateOf(initialProgress) }
        var known by remember { mutableStateOf(mathSeedSnapshot(settings, layout, progress)) }
        sync.value = sync@{ raw ->
            val post = parseMathSync(raw) ?: return@sync
            if (!mathSyncChanged(known, post)) return@sync
            known = post
            val applied = applyMathSync(post, settings, layout, progress, tags)
            settings = applied.settings
            layout = applied.layout
            progress = applied.progress
            settingsFile.writeText(encodeDeskSettings(settings))
            layoutFile.writeText(encodeMathLayout(layout))
            progressFile.writeText(progress.orEmpty())
        }
        DisposableEffect(Unit) { onDispose { sync.value = {} } }
        MathApp(
            catalog = catalog,
            layout = layout,
            onLayout = {
                layout = normalizeMathLayout(it, tags)
                layoutFile.writeText(encodeMathLayout(layout))
                known = mathSeedSnapshot(settings, layout, progress)
            },
            onOpenCourse = { course ->
                val open = host
                val blocked = portMessage
                val page = www?.let { File(it, "math-learner/index.html") }
                if (blocked != null) {
                    JOptionPane.showMessageDialog(null, blocked)
                } else if (open == null || page?.isFile != true) {
                    JOptionPane.showMessageDialog(null, "This course is not in the installed Maths Edu-Training Helper.")
                } else {
                    val next = open.origin + coursePath(course?.id.orEmpty())
                    known = mathSeedSnapshot(settings, layout, progress)
                    Desktop.getDesktop().browse(URI(open.seedUrl(mathSeedDocument(settings, layout, progress, next), known)))
                }
            },
        )
    }
}

private val mathPages = LearnerPages(
    syncMarker = "__methSync",
    syncScript = MATH_SYNC_SCRIPT,
    isMenuUrl = ::isMathMenuUrl,
    menuHtml = """
        <!DOCTYPE html>
        <meta charset="utf-8">
        <title>Maths Edu-Training Helper</title>
        <p>Back in Maths Edu-Training Helper. You can close this tab.</p>
        <script>$MATH_SYNC_SCRIPT</script>
    """.trimIndent(),
    portBusy = { port ->
        "Maths Edu-Training Helper already uses port $port for its courses. Close the other copy, then open a course again."
    },
    seedMissing = "Open a course from the Desk first.",
    missingPage = "That page is not in this Desk.",
    parse = ::parseMathSync,
    changed = ::mathSyncChanged,
)

private fun coursePath(lang: String): String {
    val query = if (lang.isBlank()) "" else "?lang=" + URLEncoder.encode(lang, StandardCharsets.UTF_8)
    return "/math-learner/index.html$query"
}
