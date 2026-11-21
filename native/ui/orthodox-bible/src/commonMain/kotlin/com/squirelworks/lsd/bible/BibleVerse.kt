package com.squirelworks.lsd.bible

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

@Composable
internal fun VerseBody(ui: BibleUi, page: Page.Verse, onOpenChapter: (String, Int, Int) -> Unit) {
    val palette = LocalBiblePalette.current
    val parsed = parseRef(page.ref)
    var generation by remember(page.ref) { mutableIntStateOf(0) }
    var primary by remember(page.ref) { mutableStateOf<BibleDocument?>(null) }
    LaunchedEffect(page.ref, page.via, ui.installed, generation) {
        withContext(Dispatchers.Default) {
            val via = page.via?.let { id -> ui.catalog.bibles.firstOrNull { it.id == id } }
            val main = ui.catalog.bibles.firstOrNull { it.id == ui.settings.primary }
            primary = via?.let { runCatching { ui.library.ensureBible(it) }.getOrNull() }
                ?: main?.let { runCatching { ui.library.ensureBible(it) }.getOrNull() }
            ui.settings.parallel.forEach { id ->
                ui.catalog.bibles.firstOrNull { it.id == id }?.let { runCatching { ui.library.ensureBible(it) } }
            }
            val display = primary
            val mappedBook = display?.let { ui.verses.toKjv(it.versification, page.ref) }?.let { parseRef(it).book } ?: parsed.book
            ui.library.ensureCommentary(setOf(parsed.book, mappedBook), ui.catalog.commentary, ui::commentaryAvailable)
        }
    }
    val display = primary
    if (display == null) {
        Muted("Loading…", Modifier.padding(16.dp))
        return
    }
    val kref = ui.verses.toKjv(display.versification, page.ref).orEmpty()
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { onOpenChapter(parsed.book, parsed.chapter, parsed.verse) }) { Text("Open in chapter") }
            val marked = kref.isNotEmpty() && kref in ui.settings.bookmarks
            Button(onClick = {
                if (kref.isEmpty()) {
                    ui.toast = "This verse has no standard number to save against"
                } else {
                    val next = if (marked) ui.settings.bookmarks.filter { it != kref } else listOf(kref) + ui.settings.bookmarks
                    ui.save(ui.settings.copy(bookmarks = next))
                }
            }) { Text(if (marked) "★ Bookmarked" else "☆ Bookmark") }
            Button(onClick = {
                val loaded = ui.catalog.bibles.mapNotNull { ui.library.bible(it.id) }
                ui.onCopy(copyVerse(page.ref, display, loaded, ui.verses, ui.booksById))
                ui.toast = "Copied"
            }) { Text("Copy") }
        }
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
            Swatch(ui.settings.highlights[kref] == null, palette.paper, "✕") {
                if (kref.isEmpty()) ui.toast = "This verse has no standard number to save against"
                else ui.save(ui.settings.copy(highlights = ui.settings.highlights - kref))
            }
            highlightColors.forEach { name ->
                Swatch(ui.settings.highlights[kref] == name, palette.highlights[name] ?: palette.gold, "") {
                    if (kref.isEmpty()) ui.toast = "This verse has no standard number to save against"
                    else ui.save(ui.settings.copy(highlights = ui.settings.highlights + (kref to name)))
                }
            }
        }
        SectionTitle("In every language")
        ui.catalog.bibles.mapNotNull { entry -> ui.library.bible(entry.id)?.let { entry to it } }.forEach { (entry, bible) ->
            val own = sameRefIn(ui.verses, bible, display, page.ref)
            val text = verseText(bible, own)
            val renum = if (own == null || own == page.ref) {
                ""
            } else {
                val ownRef = parseRef(own)
                if (ownRef.book == parsed.book) " · ${ownRef.chapter}:${ownRef.verse}" else " · ${refLabel(own, ui.booksById)}"
            }
            CardBlock {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text("${langName(entry.lang)} · ${entry.name}$renum", modifier = Modifier.weight(1f), fontWeight = FontWeight.Bold)
                    if (!text.isNullOrBlank()) TextButton(onClick = { ui.speakVerse(text, bible.lang) }) { Text("▶") }
                }
                if (text == null) {
                    val reason = if (bible.books.containsKey(parsed.book) || bible.sample) {
                        "Not in this translation${if (bible.sample) "'s sample data" else ""}."
                    } else {
                        "This translation does not include ${ui.booksById[parsed.book]?.en ?: parsed.book}."
                    }
                    Muted(reason)
                } else {
                    VerseLine(text, bible.lang, bible.dir, ui.settings.textSize)
                }
            }
        }
        val unloaded = ui.catalog.bibles.filter { ui.bibleAvailable(it) && ui.library.bible(it.id) == null }
        unloaded.forEach { entry ->
            TextButton(onClick = {
                ui.scope.launch {
                    withContext(Dispatchers.Default) { runCatching { ui.library.ensureBible(entry) } }
                    generation += 1
                }
            }) { Text("＋ ${langName(entry.lang)}: ${entry.name}") }
        }
        if (unloaded.size > 1) {
            Button(onClick = {
                ui.scope.launch {
                    withContext(Dispatchers.Default) { unloaded.forEach { runCatching { ui.library.ensureBible(it) } } }
                    generation += 1
                }
            }) { Text("Show all") }
        }
        SectionTitle("The Fathers on this verse")
        val fathers = if (kref.isEmpty()) emptyList() else ui.library.commentaryFor(kref, ui.settings.hiddenCommentary.toSet())
        if (fathers.isEmpty()) {
            Muted(
                if (ui.catalog.commentary.isEmpty()) "No patristic commentary is installed yet."
                else "No patristic commentary on this verse in the installed sources.",
            )
        } else {
            traditions.forEach { (id, label) ->
                val group = fathers.filter { it.source.tradition.ifBlank { "east" } == id }
                if (group.isEmpty()) return@forEach
                Text(label, fontWeight = FontWeight.Bold, color = palette.accent)
                group.forEach { hit ->
                    CardBlock {
                        Text(hit.source.author, fontWeight = FontWeight.Bold)
                        if (hit.source.work.isNotBlank()) Muted(hit.source.work)
                        Text(hit.key.substringAfter('.').replace('.', ':'), color = palette.muted, fontSize = 12.sp)
                        hit.texts.forEach { line ->
                            Text(line, fontFamily = FontFamily.Serif, modifier = Modifier.padding(top = 6.dp))
                        }
                        val credit = listOfNotNull(
                            hit.source.translator.takeIf { it.isNotBlank() }?.let { "Tr. $it" },
                            hit.source.license.takeIf { it.isNotBlank() },
                        )
                        if (credit.isNotEmpty()) Muted(credit.joinToString(" · "))
                    }
                }
            }
        }
        SectionTitle("My note")
        var note by remember(kref) { mutableStateOf(ui.settings.notes[kref].orEmpty()) }
        OutlinedTextField(
            value = note,
            onValueChange = { value ->
                note = value
                if (kref.isEmpty()) return@OutlinedTextField
                val next = if (value.isBlank()) ui.settings.notes - kref else ui.settings.notes + (kref to value)
                ui.save(ui.settings.copy(notes = next))
            },
            modifier = Modifier.fillMaxWidth().heightIn(min = 120.dp),
            placeholder = { Text("Write a note on this verse…") },
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Default),
        )
    }
}

@Composable
internal fun SearchBody(ui: BibleUi, onOpen: (String, Int, Int, String?) -> Unit) {
    var query by remember { mutableStateOf("") }
    var bibleId by remember { mutableStateOf(ui.settings.primary) }
    var hits by remember { mutableStateOf<List<SearchHit>>(emptyList()) }
    var jump by remember { mutableStateOf<String?>(null) }
    var failed by remember { mutableStateOf(false) }
    var choosing by remember { mutableStateOf(false) }
    LaunchedEffect(query, bibleId) {
        delay(250)
        val trimmed = query.trim()
        if (trimmed.isEmpty()) {
            hits = emptyList()
            jump = null
            failed = false
            return@LaunchedEffect
        }
        jump = parseTypedRef(trimmed, ui.bundle.books)
        val entry = ui.catalog.bibles.firstOrNull { it.id == bibleId }
        val bible = entry?.let { withContext(Dispatchers.Default) { runCatching { ui.library.ensureBible(it) }.getOrNull() } }
        if (bible == null) {
            failed = true
            hits = emptyList()
        } else {
            failed = false
            hits = withContext(Dispatchers.Default) { searchVerses(bible, ui.bundle.books, trimmed) }
        }
    }
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        OutlinedTextField(
            value = query,
            onValueChange = { query = it },
            modifier = Modifier.fillMaxWidth(),
            placeholder = { Text("Words or a reference like John 3:16") },
            singleLine = true,
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
        )
        val selected = ui.catalog.bibles.firstOrNull { it.id == bibleId }
        TextButton(onClick = { choosing = !choosing }) { Text("Search in ${selected?.name ?: bibleId}") }
        if (choosing) {
            languagesInNameOrder(ui.catalog.bibles.map { it.lang }).forEach { lang ->
                Text(langName(lang), fontWeight = FontWeight.Bold, modifier = Modifier.padding(top = 6.dp))
                ui.catalog.bibles.filter { it.lang == lang }.forEach { entry ->
                    Text(
                        entry.name,
                        modifier = Modifier.fillMaxWidth().clickable { bibleId = entry.id; choosing = false }.padding(vertical = 6.dp),
                    )
                }
            }
        }
        if (failed) Muted("Could not load that translation.")
        jump?.let { ref ->
            Text(
                "Go to ${refLabel(ref, ui.booksById)}",
                fontWeight = FontWeight.Bold,
                color = LocalBiblePalette.current.accent,
                modifier = Modifier.clickable {
                    val parsed = parseRef(ref)
                    onOpen(parsed.book, parsed.chapter, parsed.verse, bibleId)
                }.padding(vertical = 6.dp),
            )
        }
        if (query.isNotBlank() && !failed && hits.isEmpty() && jump == null) Muted("No verses found.")
        if (hits.isNotEmpty()) {
            Muted(if (hits.size >= 300) "First 300 verses" else if (hits.size == 1) "1 verse" else "${hits.size} verses")
            val needle = foldText(query.trim())
            hits.forEach { hit ->
                val span = highlightSpan(hit.text, needle)
                val annotated = buildAnnotatedString {
                    if (span == null) {
                        append(hit.text)
                    } else {
                        append(hit.text.take(span.start))
                        withStyle(SpanStyle(background = LocalBiblePalette.current.highlights["gold"] ?: Color.Yellow)) {
                            append(hit.text.substring(span.start, span.end))
                        }
                        append(hit.text.substring(span.end))
                    }
                }
                Column(
                    Modifier.fillMaxWidth().clickable {
                        val parsed = parseRef(hit.ref)
                        onOpen(parsed.book, parsed.chapter, parsed.verse, bibleId)
                    }.padding(vertical = 6.dp),
                ) {
                    Text(refLabel(hit.ref, ui.booksById), fontWeight = FontWeight.Bold)
                    Text(annotated, fontFamily = FontFamily.Serif)
                }
            }
        }
    }
}

@Composable
internal fun SavedBody(ui: BibleUi, onOpen: (String) -> Unit) {
    val keys = savedKeys(ui.settings, ui.bundle.books)
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        if (keys.isEmpty()) {
            Muted("Tap any verse to bookmark it, highlight it or write a note.")
            return@Column
        }
        var primary by remember { mutableStateOf<BibleDocument?>(null) }
        LaunchedEffect(ui.settings.primary) {
            val entry = ui.catalog.bibles.firstOrNull { it.id == ui.settings.primary }
            primary = entry?.let { withContext(Dispatchers.Default) { runCatching { ui.library.ensureBible(it) }.getOrNull() } }
        }
        Button(onClick = { ui.onExport("bible-notes.txt", exportNotes(ui.settings, primary, ui.verses, ui.bundle.books)) }) {
            Text("Export notes")
        }
        keys.forEach { key ->
            val own = (primary?.let { ui.verses.fromKjv(it.versification, key) } ?: key) ?: key
            val text = verseText(primary, own)
            val highlight = ui.settings.highlights[key]
            val palette = LocalBiblePalette.current
            val stripe = if (highlight != null) palette.highlights[highlight] ?: palette.line else palette.line
            Column(
                Modifier
                    .fillMaxWidth()
                    .border(if (highlight != null) 6.dp else 1.dp, stripe, RoundedCornerShape(8.dp))
                    .clickable { onOpen(own) }
                    .padding(10.dp),
            ) {
                Text("${if (key in ui.settings.bookmarks) "★ " else ""}${refLabel(own, ui.booksById)}", fontWeight = FontWeight.Bold)
                if (!text.isNullOrBlank()) Text(text, fontFamily = FontFamily.Serif)
                ui.settings.notes[key]?.let { Muted("✎ $it") }
            }
        }
    }
}

@Composable
internal fun Swatch(selected: Boolean, color: Color, label: String, onClick: () -> Unit) {
    val palette = LocalBiblePalette.current
    Box(
        Modifier
            .size(32.dp)
            .clip(CircleShape)
            .background(color)
            .border(if (selected) 2.dp else 1.dp, if (selected) palette.accent else palette.line, CircleShape)
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center,
    ) {
        if (label.isNotEmpty()) Text(label, fontSize = 12.sp)
    }
}

@Composable
internal fun CardBlock(content: @Composable () -> Unit) {
    val palette = LocalBiblePalette.current
    Column(
        Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(10.dp))
            .background(palette.paper)
            .border(1.dp, palette.line, RoundedCornerShape(10.dp))
            .padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(4.dp),
        content = { content() },
    )
}
