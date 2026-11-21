package com.squirelworks.lsd.desk

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.ScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
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
import com.squirelworks.lsd.core.desk.DeskCatalog
import com.squirelworks.lsd.core.desk.DeskLanguage
import com.squirelworks.lsd.core.desk.DeskLearner
import com.squirelworks.lsd.core.desk.DeskRules
import com.squirelworks.lsd.core.desk.DeskSettings
import com.squirelworks.lsd.core.desk.deskLabel
import com.squirelworks.lsd.core.desk.sortDeskLanguages
import com.squirelworks.lsd.core.languages.FavoriteLanguages
import com.squirelworks.lsd.kana.EscapeBackEffect
import com.squirelworks.lsd.kana.PlatformBackHandler

private val gold = Color(0xFFFFD54F)
private val paper = Color(0xFF0F0F12)

private sealed interface DeskPage {
    data object Home : DeskPage
    data class Learner(val learner: DeskLearner, val selection: String) : DeskPage
}

@Composable
fun DeskApp(
    catalog: DeskCatalog,
    settings: DeskSettings,
    favorites: FavoriteLanguages,
    onSettings: (DeskSettings) -> Unit,
    onFavorites: (FavoriteLanguages) -> Unit,
) {
    val rules = remember(catalog) { DeskRules(catalog) }
    var page by remember { mutableStateOf<DeskPage>(DeskPage.Home) }
    var tab by remember { mutableStateOf("tools") }
    var selection by remember { mutableStateOf("") }
    var favoriteIds by remember { mutableStateOf(favorites.ids()) }
    fun toggleFavorite(id: String) {
        favorites.toggle(id)
        favoriteIds = favorites.ids()
        onFavorites(favorites)
    }
    val backEnabled = page !is DeskPage.Home
    fun back() {
        if (page !is DeskPage.Home) page = DeskPage.Home
    }
    PlatformBackHandler(backEnabled, ::back)
    EscapeBackEffect(backEnabled, ::back)
    MaterialTheme(colorScheme = darkColorScheme(primary = gold, background = paper)) {
        Column(
            Modifier.fillMaxSize().background(paper).windowInsetsPadding(WindowInsets.safeDrawing).padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            when (val current = page) {
                DeskPage.Home -> Home(
                    catalog, rules, settings, favoriteIds, ::toggleFavorite, tab, selection,
                    onTab = { tab = it },
                    onSelection = { selection = it },
                    onSettings = onSettings,
                    onOpen = { learner -> page = DeskPage.Learner(learner, selection) },
                    onLanguage = { id ->
                        onSettings(settings.copy(welcomeDone = true))
                        selection = id
                        page = DeskPage.Learner(
                            catalog.learners.first { it.id == "language" },
                            id,
                        )
                    },
                )
                is DeskPage.Learner -> LearnerPage(current.learner, current.selection, catalog, ::back)
            }
        }
    }
}

@Composable
private fun Home(
    catalog: DeskCatalog,
    rules: DeskRules,
    settings: DeskSettings,
    favoriteIds: Set<String>,
    onToggleFavorite: (String) -> Unit,
    tab: String,
    selection: String,
    onTab: (String) -> Unit,
    onSelection: (String) -> Unit,
    onSettings: (DeskSettings) -> Unit,
    onOpen: (DeskLearner) -> Unit,
    onLanguage: (String) -> Unit,
) {
    val scroll = remember(tab) { ScrollState(0) }
    Column(Modifier.fillMaxSize().verticalScroll(scroll), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text("Language Student Desk", style = MaterialTheme.typography.headlineSmall, color = gold)
        Text("Grammar, vocabulary, language, programming, legalese, translation, reference, resource, character, and Klingon. Each one opens inside this app.")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf("tools" to "Tools", "favorites" to "Favorites", "settings" to "Settings").forEach { (id, label) ->
                TextButton(onClick = { onTab(id) }) {
                    Text(if (id == tab) "• $label" else label, color = if (id == tab) gold else MaterialTheme.colorScheme.onSurface)
                }
            }
        }
        when (tab) {
            "favorites" -> FavoritesTab(catalog, rules, settings, favoriteIds, onToggleFavorite)
            "settings" -> SettingsTab(catalog, rules, settings, onSettings, onLanguage)
            else -> ToolsTab(catalog, rules, settings, favoriteIds, selection, onSelection, onSettings, onOpen, onLanguage)
        }
    }
}

@Composable
private fun ToolsTab(
    catalog: DeskCatalog,
    rules: DeskRules,
    settings: DeskSettings,
    favoriteIds: Set<String>,
    selection: String,
    onSelection: (String) -> Unit,
    onSettings: (DeskSettings) -> Unit,
    onOpen: (DeskLearner) -> Unit,
    onLanguage: (String) -> Unit,
) {
    if (!settings.welcomeDone && rules.featured().isNotEmpty()) {
        Text(catalog.text.welcomeTitle, style = MaterialTheme.typography.titleMedium, color = gold)
        Text(catalog.text.welcomeBody)
        rules.featured().forEach { language ->
            TextButton(onClick = { onLanguage(language.id) }) { Text(deskLabel(language)) }
        }
        TextButton(onClick = { onSettings(settings.copy(welcomeDone = true)) }) { Text("Not now") }
    }
    if (!settings.noticeDismissed && catalog.text.notice.isNotBlank()) {
        Text(catalog.text.notice)
        TextButton(onClick = { onSettings(settings.copy(noticeDismissed = true)) }) { Text("Dismiss") }
    }
    Text("Open scoped tools in", style = MaterialTheme.typography.labelLarge)
    val choices = pickerChoices(catalog, rules, settings, favoriteIds.toList())
    choices.forEach { (id, label) ->
        TextButton(onClick = { onSelection(id) }) { Text(if (id == selection) "• $label" else label) }
    }
    Text("Klingon and Legalese open the same whatever you pick. Back returns to this menu.", style = MaterialTheme.typography.bodySmall)
    catalog.learners.filter { rules.allows(settings, it.requires) }.forEach { learner ->
        Column(Modifier.fillMaxWidth().padding(vertical = 6.dp)) {
            TextButton(onClick = { onOpen(learner) }) {
                Column {
                    Text(learner.title, color = gold)
                    Text(learner.description)
                }
            }
        }
    }
}

@Composable
private fun FavoritesTab(
    catalog: DeskCatalog,
    rules: DeskRules,
    settings: DeskSettings,
    favoriteIds: Set<String>,
    onToggleFavorite: (String) -> Unit,
) {
    Text("Star a language to pin it at the top of every language menu on this device.")
    val languages = catalog.languages.filter { rules.allows(settings, it.requires) }
    sortDeskLanguages(languages, favoriteIds.toList()).forEach { language ->
        val on = language.id in favoriteIds
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text(deskLabel(language), modifier = Modifier.weight(1f))
            TextButton(onClick = { onToggleFavorite(language.id) }) { Text(if (on) "★" else "☆", color = gold) }
        }
    }
}

@Composable
private fun SettingsTab(
    catalog: DeskCatalog,
    rules: DeskRules,
    settings: DeskSettings,
    onSettings: (DeskSettings) -> Unit,
    onLanguage: (String) -> Unit,
) {
    Text("Show", style = MaterialTheme.typography.titleMedium)
    catalog.levels.forEach { level ->
        TextButton(onClick = { onSettings(rules.setLevel(settings, level.id)) }) {
            Column {
                Text(if (settings.level == level.id) "• ${level.label}" else level.label, color = if (settings.level == level.id) gold else MaterialTheme.colorScheme.onSurface)
                Text(level.description, style = MaterialTheme.typography.bodySmall)
            }
        }
    }
    if (settings.level == "custom") Text(catalog.text.custom)
    Text(catalog.text.customize, style = MaterialTheme.typography.titleMedium)
    rules.customizeOrder().forEach { feature ->
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(checked = rules.isOn(settings, feature.id), onCheckedChange = { onSettings(rules.setSwitch(settings, feature.id, it)) })
            Column {
                Text(feature.label)
                Text(feature.description, style = MaterialTheme.typography.bodySmall)
            }
        }
    }
    Text(catalog.text.whatsInApp, style = MaterialTheme.typography.titleMedium)
    if (rules.featured().isNotEmpty()) {
        Text(catalog.text.welcomeBody)
        rules.featured().forEach { language ->
            TextButton(onClick = { onLanguage(language.id) }) { Text(deskLabel(language)) }
        }
    }
    catalog.features.sortedBy { it.label }.forEach { feature ->
        val on = rules.isOn(settings, feature.id)
        Text("${feature.label} ${if (on) "(on)" else "(off: turn on ${feature.label} in Customize)"}")
        Text(feature.description, style = MaterialTheme.typography.bodySmall)
    }
}

@Composable
private fun LearnerPage(learner: DeskLearner, selection: String, catalog: DeskCatalog, onBack: () -> Unit) {
    TextButton(onClick = onBack) { Text("‹ Menu") }
    Text(learner.title, style = MaterialTheme.typography.headlineSmall, color = gold)
    Text(learner.description)
    if (learner.scoped && selection.isNotBlank()) {
        val name = catalog.languages.firstOrNull { it.id == selection }?.let(::deskLabel)
            ?: catalog.courses.firstOrNull { it.id == selection }?.name
            ?: selection
        Text("Open in $name")
    }
    Text("This learner's pages are still the Desk pages. The shell remembers where you were going.")
}

private fun pickerChoices(
    catalog: DeskCatalog,
    rules: DeskRules,
    settings: DeskSettings,
    favoriteIds: List<String>,
): List<Pair<String, String>> {
    val languages = sortDeskLanguages(
        catalog.languages.filter { rules.allows(settings, it.requires) },
        favoriteIds,
    ).map { it.id to deskLabel(it) }
    val courses = catalog.courses.sortedBy { it.name }.map { it.id to it.name }
    return listOf("" to "All languages") + languages + courses
}
