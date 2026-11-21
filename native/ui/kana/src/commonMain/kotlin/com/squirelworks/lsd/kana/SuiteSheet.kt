package com.squirelworks.lsd.kana

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.unit.dp
import com.squirelworks.lsd.core.suite.SuiteApp
import com.squirelworks.lsd.core.suite.SuiteLink
import com.squirelworks.lsd.core.suite.SuiteNote
import com.squirelworks.lsd.core.suite.noteGroups
import com.squirelworks.lsd.core.suite.otherApps
import com.squirelworks.lsd.core.suite.SuiteAction
import com.squirelworks.lsd.core.suite.desktopReleasePage
import com.squirelworks.lsd.core.suite.releaseUrl
import com.squirelworks.lsd.core.suite.suiteAction
import com.squirelworks.lsd.core.suite.resourceList
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class SuiteFile(
    val apps: List<SuiteApp> = emptyList(),
    val langNames: Map<String, String> = emptyMap(),
    val notes: Map<String, List<SuiteNote>> = emptyMap(),
    val resources: Map<String, List<SuiteLink>> = emptyMap(),
)

private val suiteJson = Json { ignoreUnknownKeys = true }

fun parseSuite(text: String): SuiteFile = suiteJson.decodeFromString(text)

@Composable
fun SuiteSheet(
    file: SuiteFile,
    selfId: String,
    installed: Set<String>?,
    notice: String,
    onOpen: (SuiteApp) -> Unit,
    onUrl: (String) -> Unit,
    onClose: () -> Unit,
) {
    val langs = file.apps.firstOrNull { it.id == selfId }?.langs.orEmpty()
    Box(Modifier.fillMaxSize().background(MaterialTheme.colorScheme.scrim.copy(alpha = 0.45f)).clickable(onClick = onClose)) {
        Column(
            Modifier
                .align(Alignment.BottomCenter)
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.surface)
                .pointerInput(Unit) { detectTapGestures { } }
                .verticalScroll(rememberScrollState())
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text("SquirrelGo", style = MaterialTheme.typography.titleLarge, modifier = Modifier.weight(1f))
                TextButton(onClick = onClose) { Text("Close") }
            }
            Text("Apps", style = MaterialTheme.typography.titleMedium)
            otherApps(selfId, file.apps).forEach { app ->
                val action = suiteAction(app, installed)
                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(app.icon, style = MaterialTheme.typography.titleLarge)
                    Column(Modifier.weight(1f)) {
                        Text(app.name)
                        if (app.blurb.isNotBlank()) Text(app.blurb, style = MaterialTheme.typography.bodySmall)
                    }
                    if (action != SuiteAction.None) {
                        Button(onClick = { onOpen(app) }) { Text(if (action == SuiteAction.Open) "Open" else "Get") }
                    }
                }
            }
            val groups = noteGroups(langs, file.langNames, file.notes)
            if (groups.isNotEmpty()) {
                Text("Notes", style = MaterialTheme.typography.titleMedium)
                groups.forEach { (name, items) ->
                    Text(name, style = MaterialTheme.typography.titleSmall)
                    items.forEach { note ->
                        Text(note.title)
                        Text(note.body)
                    }
                }
            }
            val links = resourceList(langs, file.resources)
            if (links.isNotEmpty()) {
                Text("Resources", style = MaterialTheme.typography.titleMedium)
                links.forEach { link ->
                    if (link.url.isNotBlank()) {
                        TextButton(onClick = { onUrl(link.url) }) { Text(link.title) }
                    } else {
                        Text(link.title)
                    }
                    Text(link.body)
                }
            }
            Text("Part of LanguageStudentDesk. Each app keeps its own progress on this device.")
            if (notice.isNotBlank()) Text(notice)
        }
    }
}

fun openSuiteApp(
    app: SuiteApp,
    installed: Set<String>?,
    launch: (SuiteApp) -> Boolean,
    browse: (String) -> Unit,
): String {
    if (installed == null) {
        val page = desktopReleasePage(app)
        if (page != null) browse(page)
        return ""
    }
    val url = releaseUrl(app)
    if (app.pkg in installed && launch(app)) return ""
    if (url != null) {
        browse(url)
        return "${app.name} isn't installed yet. Opening its download page."
    }
    return ""
}
