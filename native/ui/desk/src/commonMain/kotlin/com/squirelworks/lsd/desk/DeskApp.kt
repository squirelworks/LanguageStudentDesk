@file:OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)

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
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
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
import com.squirelworks.lsd.core.desk.DeskCatalog
import com.squirelworks.lsd.core.desk.DeskLanguage
import com.squirelworks.lsd.core.desk.DeskLearner
import com.squirelworks.lsd.core.desk.DeskRules
import com.squirelworks.lsd.core.desk.DeskSettings
import com.squirelworks.lsd.core.desk.deskLabel
import com.squirelworks.lsd.core.desk.sortDeskLanguages
import com.squirelworks.lsd.core.languages.FavoriteLanguages
private val gold = Color(0xFFFFD54F)
private val paper = Color(0xFF0F0F12)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DeskApp(
    catalog: DeskCatalog,
    settings: DeskSettings,
    favorites: FavoriteLanguages,
    onSettings: (DeskSettings) -> Unit,
    onFavorites: (FavoriteLanguages) -> Unit,
    onOpenLearner: (DeskLearner, String) -> Unit,
    syncGeneration: Int = 0,
) {
    val rules = remember(catalog) { DeskRules(catalog) }
    var tab by remember { mutableStateOf("tools") }
    var selection by remember(settings.suiteLang) { mutableStateOf(settings.suiteLang) }
    var favoriteIds by remember(syncGeneration) { mutableStateOf(favorites.ids()) }
    fun toggleFavorite(id: String) {
        favorites.toggle(id)
        favoriteIds = favorites.ids()
        onFavorites(favorites)
    }
    val colors = darkColorScheme(
        primary = gold,
        background = paper,
        surface = paper,
        onBackground = Color(0xFFE8E8E8),
        onSurface = Color(0xFFE8E8E8),
        onSurfaceVariant = Color(0xFFAAAAAA),
    )
    MaterialTheme(colorScheme = colors) {
        Surface(Modifier.fillMaxSize(), color = paper, contentColor = Color(0xFFAAAAAA)) {
            Column(
                Modifier.fillMaxSize().background(paper).windowInsetsPadding(WindowInsets.safeDrawing).padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                Home(
                    catalog, rules, settings, favoriteIds, ::toggleFavorite, tab, selection,
                    onTab = { tab = it },
                    onSelection = { id ->
                        selection = id
                        if (id != settings.suiteLang) onSettings(settings.copy(suiteLang = id))
                    },
                    onSettings = onSettings,
                    onOpen = { learner -> onOpenLearner(learner, if (learner.scoped) selection else "") },
                    onLanguage = { id ->
                        selection = id
                        onSettings(settings.copy(welcomeDone = true, suiteLang = id))
                        catalog.learners.firstOrNull { it.id == "language" }?.let { onOpenLearner(it, id) }
                    },
                )
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
        Text(
            "Progress stays on this device. The separate SquirrelGo apps (Kana, Kanji, Dictionary, Phrasebook, Orthodox Bible) are not this app; Character and Vocabulary use the script and deck data packed with it.",
            style = MaterialTheme.typography.bodySmall,
        )
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
    val choices = pickerChoices(catalog, rules, settings, favoriteIds.toList())
    var menuOpen by remember { mutableStateOf(false) }
    val selectedLabel = choices.firstOrNull { it.first == selection }?.second ?: "All languages"
    ExposedDropdownMenuBox(expanded = menuOpen, onExpandedChange = { menuOpen = it }) {
        OutlinedTextField(
            value = selectedLabel,
            onValueChange = {},
            readOnly = true,
            label = { Text("Open scoped tools in") },
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = menuOpen) },
            modifier = Modifier.menuAnchor().fillMaxWidth(),
            colors = ExposedDropdownMenuDefaults.outlinedTextFieldColors(),
        )
        ExposedDropdownMenu(expanded = menuOpen, onDismissRequest = { menuOpen = false }) {
            choices.forEach { (id, label) ->
                DropdownMenuItem(
                    text = { Text(label) },
                    onClick = {
                        onSelection(id)
                        menuOpen = false
                    },
                )
            }
        }
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
