package com.squirelworks.lsd.programming

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.squirelworks.lsd.core.desk.DeskSettings
import com.squirelworks.lsd.core.programming.PROGRAMMING_JOKE
import com.squirelworks.lsd.core.programming.PROGRAMMING_OLDER
import com.squirelworks.lsd.core.programming.ProgrammingCatalog
import com.squirelworks.lsd.core.programming.ProgrammingCourse
import com.squirelworks.lsd.core.programming.ProgrammingLayout
import com.squirelworks.lsd.core.programming.arrangeProgramming
import com.squirelworks.lsd.core.programming.programmingCourse
import com.squirelworks.lsd.core.programming.programmingRules
import com.squirelworks.lsd.core.programming.programmingShows
import com.squirelworks.lsd.core.programming.programmingTags

private val teal = Color(0xFF26A69A)
private val cardTitle = Color(0xFF80CBC4)
private val note = Color(0xFFFFCC80)
private val paper = Color(0xFF0F0F12)

@Composable
fun ProgrammingApp(
    catalog: ProgrammingCatalog,
    settings: DeskSettings,
    layout: ProgrammingLayout,
    startLang: String = "",
    onSettings: (DeskSettings) -> Unit,
    onLayout: (ProgrammingLayout) -> Unit,
    onOpenCourse: (ProgrammingCourse?) -> Unit,
) {
    val rules = remember(catalog) { programmingRules(catalog) }
    val colors = darkColorScheme(
        primary = teal,
        background = paper,
        surface = paper,
        onBackground = Color(0xFFE8E8E8),
        onSurface = Color(0xFFE8E8E8),
        onSurfaceVariant = Color(0xFFAAAAAA),
    )
    MaterialTheme(colorScheme = colors) {
        Surface(Modifier.fillMaxSize(), color = paper) {
            val scroll = rememberScrollState()
            Column(
                Modifier.fillMaxSize().background(paper).windowInsetsPadding(WindowInsets.safeDrawing).verticalScroll(scroll).padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                Text("Programming Student Desk", style = MaterialTheme.typography.headlineSmall, color = teal)
                Text("Courses from the Programming Learner. Each one opens in this app.")
                val unknown = startLang.isNotBlank() && programmingCourse(catalog, startLang) == null
                if (unknown) {
                    Text("No programming course with id “${startLang.trim()}”. Pick one below.", color = note)
                }
                val (showOlder, showJoke) = programmingShows(rules, settings)
                FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    TextButton(onClick = { onLayout(layout.copy(view = "sections")) }) {
                        Text(if (layout.view != "az") "• By section" else "By section", color = if (layout.view != "az") teal else Color(0xFFE8E8E8))
                    }
                    TextButton(onClick = { onLayout(layout.copy(view = "az")) }) {
                        Text(if (layout.view == "az") "• A–Z" else "A–Z", color = if (layout.view == "az") teal else Color(0xFFE8E8E8))
                    }
                }
                FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    TextButton(onClick = { onLayout(layout.copy(tag = "")) }) {
                        Text(if (layout.tag.isEmpty()) "• All" else "All", color = if (layout.tag.isEmpty()) teal else Color(0xFFE8E8E8))
                    }
                    programmingTags(catalog.courses).forEach { tag ->
                        TextButton(onClick = { onLayout(layout.copy(tag = tag)) }) {
                            Text(if (layout.tag == tag) "• $tag" else tag, color = if (layout.tag == tag) teal else Color(0xFFE8E8E8))
                        }
                    }
                }
                listOf(PROGRAMMING_OLDER, PROGRAMMING_JOKE).forEach { id ->
                    val feature = catalog.features.firstOrNull { it.id == id } ?: return@forEach
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Checkbox(
                            checked = rules.isOn(settings, id),
                            onCheckedChange = { onSettings(rules.setSwitch(settings, id, it)) },
                        )
                        Column {
                            Text(feature.label)
                            Text(feature.description, style = MaterialTheme.typography.bodySmall)
                        }
                    }
                }
                CourseButton("All courses", "Open the Programming Learner and pick from the same list.", null) {
                    onOpenCourse(null)
                }
                val blocks = arrangeProgramming(catalog, layout, showOlder, showJoke)
                if (blocks.isEmpty()) Text("No languages match this filter.", color = note)
                blocks.forEach { block ->
                    if (layout.view != "az") {
                        Text(block.title, color = cardTitle, style = MaterialTheme.typography.titleMedium)
                        if (block.sub.isNotBlank()) Text(block.sub, style = MaterialTheme.typography.bodySmall)
                    }
                    block.items.forEach { course ->
                        val detail = listOf(course.era, course.blurb).filter { it.isNotBlank() }.joinToString(" — ")
                        val tags = if (course.tags.isEmpty()) "" else course.tags.joinToString(" · ")
                        CourseButton(course.name, detail, tags) { onOpenCourse(course) }
                    }
                }
                Text(
                    "Language Student Desk · Programming Student Desk\nBack returns to this menu. Progress stays on this device.",
                    style = MaterialTheme.typography.bodySmall,
                )
            }
        }
    }
}

@Composable
private fun CourseButton(title: String, detail: String, tags: String?, onClick: () -> Unit) {
    TextButton(onClick = onClick, modifier = Modifier.fillMaxWidth()) {
        Column(Modifier.fillMaxWidth()) {
            Text(title, color = cardTitle)
            if (detail.isNotBlank()) Text(detail)
            if (!tags.isNullOrBlank()) Text(tags, style = MaterialTheme.typography.bodySmall)
        }
    }
}
