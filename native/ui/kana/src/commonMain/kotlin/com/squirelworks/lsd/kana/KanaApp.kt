package com.squirelworks.lsd.kana

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp

private sealed interface Screen {
    data object Home : Screen
    data class Chart(val scriptId: String) : Screen
    data class Detail(val scriptId: String, val glyph: String) : Screen
}

@Composable
fun KanaApp(
    scripts: List<KanaScript>,
    strokes: Map<String, Map<String, List<String>>>,
    dark: Boolean,
) {
    var stack by remember { mutableStateOf(listOf<Screen>(Screen.Home)) }
    val screen = stack.last()
    fun open(next: Screen) { stack = stack + next }
    fun back() { if (stack.size > 1) stack = stack.dropLast(1) }
    MaterialTheme(colorScheme = if (dark) darkColorScheme() else lightColorScheme()) {
        BoxWithConstraints(
            Modifier.fillMaxSize().windowInsetsPadding(WindowInsets.safeDrawing).padding(16.dp),
        ) {
            val wide = maxWidth >= 840.dp && screen is Screen.Detail
            if (wide) {
                val detail = screen as Screen.Detail
                Row(Modifier.fillMaxSize(), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                    ChartPage(
                        scripts.first { it.id == detail.scriptId },
                        onBack = ::back,
                        onOpen = { open(Screen.Detail(detail.scriptId, it)) },
                        modifier = Modifier.weight(1f),
                    )
                    DetailPage(
                        scripts.first { it.id == detail.scriptId },
                        strokes[detail.scriptId].orEmpty()[detail.glyph].orEmpty(),
                        detail.glyph,
                        onBack = ::back,
                        modifier = Modifier.weight(1f),
                    )
                }
            } else {
                when (screen) {
                    Screen.Home -> HomePage(scripts) { open(Screen.Chart(it)) }
                    is Screen.Chart -> ChartPage(
                        scripts.first { it.id == screen.scriptId },
                        onBack = ::back,
                        onOpen = { open(Screen.Detail(screen.scriptId, it)) },
                        modifier = Modifier.fillMaxSize(),
                    )
                    is Screen.Detail -> DetailPage(
                        scripts.first { it.id == screen.scriptId },
                        strokes[screen.scriptId].orEmpty()[screen.glyph].orEmpty(),
                        screen.glyph,
                        onBack = ::back,
                        modifier = Modifier.fillMaxSize(),
                    )
                }
            }
        }
    }
}

@Composable
private fun HomePage(scripts: List<KanaScript>, onOpen: (String) -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text("SquirrelGo Kana", style = MaterialTheme.typography.headlineSmall)
        scripts.forEach { script ->
            Column(
                Modifier.fillMaxWidth().clickable { onOpen(script.id) }.padding(vertical = 12.dp),
            ) {
                Text(script.title, style = MaterialTheme.typography.titleLarge)
                if (script.native.isNotBlank()) Text(script.native)
            }
        }
    }
}

@Composable
private fun ChartPage(
    script: KanaScript,
    onBack: () -> Unit,
    onOpen: (String) -> Unit,
    modifier: Modifier,
) {
    Column(modifier) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            TextButton(onClick = onBack) { Text("‹") }
            Text(script.title, style = MaterialTheme.typography.titleLarge)
        }
        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            chartGroups(script).forEach { group ->
                item { Text(group.name, style = MaterialTheme.typography.titleMedium) }
                items(group.cells.chunked(group.cols)) { row ->
                    Row(Modifier.fillMaxWidth()) {
                        row.forEach { cell ->
                            Box(
                                Modifier.weight(1f).aspectRatio(1f).padding(2.dp),
                                contentAlignment = Alignment.Center,
                            ) {
                                if (cell != null) {
                                    Text(
                                        cell.g,
                                        modifier = Modifier.fillMaxSize().clickable { onOpen(cell.g) }.padding(4.dp),
                                        textAlign = TextAlign.Center,
                                        style = MaterialTheme.typography.headlineSmall,
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun DetailPage(
    script: KanaScript,
    paths: List<String>,
    glyph: String,
    onBack: () -> Unit,
    modifier: Modifier,
) {
    val cell = script.lessons.flatMap { it.chars }.firstOrNull { it?.g == glyph }
    var play by remember(glyph) { mutableStateOf(false) }
    Column(modifier, verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            TextButton(onClick = onBack) { Text("‹") }
            Text(cell?.r ?: glyph, style = MaterialTheme.typography.titleLarge)
        }
        Text(glyph, style = MaterialTheme.typography.displayLarge)
        if (cell != null && cell.hint.isNotBlank()) Text(cell.hint)
        if (paths.isNotEmpty()) {
            StrokeGlyph(
                paths,
                play,
                Modifier.background(MaterialTheme.colorScheme.surfaceVariant),
            )
            Text(if (paths.size == 1) "1 stroke" else "${paths.size} strokes")
            Button(onClick = { play = !play }) { Text(if (play) "Stop" else "Play") }
        }
        if (cell != null && cell.ex.isNotBlank()) {
            Text(cell.ex, style = MaterialTheme.typography.titleMedium)
            val gloss = listOf(cell.exR, cell.exM).filter { it.isNotBlank() }.joinToString(" · ")
            if (gloss.isNotBlank()) Text(gloss)
        }
    }
}
