package com.squirelworks.lsd.dictionary

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.input.key.Key
import androidx.compose.ui.input.key.KeyEventType
import androidx.compose.ui.input.key.key
import androidx.compose.ui.input.key.onPreviewKeyEvent
import androidx.compose.ui.input.key.type
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import com.squirelworks.lsd.core.languages.CatalogLanguage
import com.squirelworks.lsd.core.languages.FavoriteLanguages
import com.squirelworks.lsd.core.languages.FavoriteStore
import com.squirelworks.lsd.core.languages.arrangeLanguages
import com.squirelworks.lsd.core.languages.defaultLanguageId
import com.squirelworks.lsd.core.languages.lookup

@Composable
fun DictionaryApp(
    catalog: List<CatalogLanguage>,
    store: FavoriteStore,
    copy: DictionaryCopy,
    displayName: (CatalogLanguage) -> String,
    fallbackId: String,
    deviceTag: String,
    dark: Boolean,
) {
    val favorites = remember { FavoriteLanguages(store) }
    var favoriteIds by remember { mutableStateOf(favorites.ids()) }
    var query by remember { mutableStateOf("") }
    var selected by remember { mutableStateOf(defaultLanguageId(catalog, deviceTag, fallbackId)) }
    val scheme = if (dark) darkColorScheme() else lightColorScheme()
    MaterialTheme(colorScheme = scheme) {
        val root = Modifier
            .fillMaxSize()
            .windowInsetsPadding(WindowInsets.safeDrawing)
            .imePadding()
            .onPreviewKeyEvent { event ->
                if (event.key == Key.Escape && event.type == KeyEventType.KeyDown) {
                    query = ""
                    true
                } else {
                    false
                }
            }
        BoxWithConstraints(root) {
            val wide = maxWidth >= 600.dp
            if (wide) {
                Row(Modifier.fillMaxSize()) {
                    LanguageList(
                        catalog, favoriteIds, selected, copy, displayName,
                        onSelect = { selected = it },
                        onStar = { id ->
                            favorites.toggle(id)
                            favoriteIds = favorites.ids()
                        },
                        modifier = Modifier.width(320.dp).fillMaxHeight(),
                    )
                    Results(query, copy, { query = it }, Modifier.weight(1f).fillMaxHeight().padding(16.dp))
                }
            } else {
                Column(Modifier.fillMaxSize()) {
                    Results(query, copy, { query = it }, Modifier.weight(1f).fillMaxWidth().padding(16.dp))
                    LanguageList(
                        catalog, favoriteIds, selected, copy, displayName,
                        onSelect = { selected = it },
                        onStar = { id ->
                            favorites.toggle(id)
                            favoriteIds = favorites.ids()
                        },
                        modifier = Modifier.weight(1f).fillMaxWidth(),
                    )
                }
            }
        }
    }
}

@Composable
private fun Results(
    query: String,
    copy: DictionaryCopy,
    onQuery: (String) -> Unit,
    modifier: Modifier,
) {
    val focus = remember { FocusRequester() }
    LaunchedEffect(Unit) { focus.requestFocus() }
    val found = lookup(query)
    Column(modifier, verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text(copy.title, style = MaterialTheme.typography.headlineSmall)
        OutlinedTextField(
            value = query,
            onValueChange = onQuery,
            modifier = Modifier.fillMaxWidth().focusRequester(focus),
            placeholder = { Text(copy.searchHint) },
            singleLine = true,
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
        )
        LazyColumn(verticalArrangement = Arrangement.spacedBy(6.dp)) {
            if (found.kana != null && found.kana != found.query) {
                item { Text("${copy.reading}  ${found.kana}") }
            }
            items(found.deinflections) { form ->
                Text("${form.form}  ${copy.label(form.label)}")
            }
            if (found.query.isNotEmpty()) item { Text(copy.emptyEntry) }
        }
    }
}

@Composable
private fun LanguageList(
    catalog: List<CatalogLanguage>,
    favoriteIds: Set<String>,
    selected: String?,
    copy: DictionaryCopy,
    displayName: (CatalogLanguage) -> String,
    onSelect: (String) -> Unit,
    onStar: (String) -> Unit,
    modifier: Modifier,
) {
    val sections = arrangeLanguages(catalog, favoriteIds, displayName, copy.favorites, copy.allLanguages)
    LazyColumn(modifier) {
        sections.forEach { section ->
            if (sections.size > 1) {
                item(key = "header-${section.id}") {
                    Text(
                        section.title,
                        modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                        style = MaterialTheme.typography.titleSmall,
                    )
                }
            }
            items(section.languages, key = { "${section.id}-${it.id}" }) { lang ->
                val name = displayName(lang)
                val starred = lang.id in favoriteIds
                val background = if (lang.id == selected) {
                    MaterialTheme.colorScheme.secondaryContainer
                } else {
                    MaterialTheme.colorScheme.surface
                }
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(background)
                        .clickable { onSelect(lang.id) }
                        .padding(start = 16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Text(name, modifier = Modifier.weight(1f))
                    IconButton(
                        onClick = { onStar(lang.id) },
                        modifier = Modifier.semantics {
                            contentDescription = if (starred) copy.unstar else copy.star
                        },
                    ) {
                        Text(if (starred) "★" else "☆")
                    }
                }
            }
        }
    }
}
