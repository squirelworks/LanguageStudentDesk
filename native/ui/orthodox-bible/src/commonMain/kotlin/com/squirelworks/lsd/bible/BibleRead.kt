package com.squirelworks.lsd.bible

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

@Composable
internal fun ReaderBody(
    ui: BibleUi,
    page: Page.Read,
    wideText: Boolean,
    onVerse: (String, String?) -> Unit,
    onChapter: (String, Int) -> Unit,
    onTranslations: () -> Unit,
) {
    val palette = LocalBiblePalette.current
    var model by remember(page.book, page.chapter) { mutableStateOf<PreparedChapter?>(null) }
    var notesReady by remember { mutableStateOf(0) }
    val primaryId = ui.settings.primary
    val parallel = ui.settings.parallel
    LaunchedEffect(page.book, page.chapter, primaryId, parallel, ui.catalog.bibles.size, ui.installed) {
        val prepared = withContext(Dispatchers.Default) {
            prepareChapter(
                ui.library, ui.catalog, ui.bundle.books, page.book, page.chapter,
                primaryId, parallel, ui::bibleAvailable, ui.verses,
            )
        }
        model = prepared
        val display = prepared.display
        if (display != null) {
            val wanted = linkedBooks(display, prepared.book.id, prepared.chapter, ui.verses)
            withContext(Dispatchers.Default) {
                ui.library.ensureCommentary(wanted, ui.catalog.commentary, ui::commentaryAvailable)
            }
            notesReady += 1
        }
        ui.save(ui.settings.copy(last = LastPlace(prepared.book.id, prepared.chapter)))
    }
    val prepared = model
    if (prepared == null) {
        Muted("Loading…", Modifier.padding(16.dp))
        return
    }
    val columns = wideText && ui.settings.layout == "columns"
    val list = rememberLazyListState()
    LaunchedEffect(page.verse, prepared.verses.size) {
        if (page.verse > 0) list.scrollToItem(page.verse.coerceAtMost(prepared.verses.size))
    }
    LazyColumn(
        state = list,
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        item {
            Row(Modifier.horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Chip(prepared.display?.name ?: primaryId, filled = true, onClick = onTranslations)
                prepared.parallels.forEach { parallelBible ->
                    Chip(langName(parallelBible.lang), filled = false, onClick = onTranslations)
                }
                Chip("＋ language", filled = false, onClick = onTranslations)
            }
        }
        if (prepared.display?.sample == true) {
            item { Muted("Sample data: only a few chapters are installed until the full texts arrive.") }
        }
        item {
            Text(
                "${prepared.book.en} ${prepared.chapter}",
                style = MaterialTheme.typography.headlineSmall,
                fontFamily = FontFamily.Serif,
            )
        }
        if (prepared.verses.isEmpty()) {
            item {
                val name = prepared.display?.name ?: primaryId
                val sample = if (prepared.display?.sample == true) " in its sample data" else ""
                Muted("$name does not include ${prepared.book.en} ${prepared.chapter}$sample.")
                prepared.alternatives.forEach { entry ->
                    TextButton(onClick = { ui.setPrimary(entry.id) }) { Text(entry.name) }
                }
            }
        } else {
            if (columns) {
                item {
                    Row(Modifier.fillMaxWidth().padding(start = 36.dp), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        (listOfNotNull(prepared.display) + prepared.parallels).forEach { bible ->
                            Text(bible.name, modifier = Modifier.weight(1f), color = palette.muted, fontSize = 12.sp)
                        }
                    }
                }
            }
            items(prepared.verses.size) { index ->
                val text = prepared.verses[index] ?: return@items
                val number = index + 1
                val ref = refKey(prepared.book.id, prepared.chapter, number)
                val display = prepared.display
                val kref = display?.let { ui.verses.toKjv(it.versification, ref) }.orEmpty()
                val highlight = ui.settings.highlights[kref]
                val marks = buildString {
                    if (kref.isNotEmpty() && kref in ui.settings.bookmarks) append("★")
                    if (kref.isNotEmpty() && ui.settings.notes.containsKey(kref)) append("✎")
                    if (kref.isNotEmpty() && notesReady >= 0 && ui.library.commentaryFor(kref, ui.settings.hiddenCommentary.toSet()).isNotEmpty()) append("☩")
                }
                val background = highlight?.let { palette.highlights[it] } ?: Color.Transparent
                val focused = page.verse == number
                Column(
                    Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(8.dp))
                        .background(if (focused) palette.accentSoft else background)
                        .then(if (focused) Modifier.border(2.dp, palette.gold, RoundedCornerShape(8.dp)) else Modifier)
                        .clickable { onVerse(ref, display?.id?.takeIf { it != ui.settings.primary }) }
                        .padding(8.dp),
                ) {
                    Row(verticalAlignment = Alignment.Top) {
                        Text("$number", color = palette.gold, fontWeight = FontWeight.Bold, modifier = Modifier.width(36.dp))
                        Column(Modifier.weight(1f)) {
                            if (columns) {
                                Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                                    VerseLine(text, display?.lang.orEmpty(), display?.dir ?: "ltr", ui.settings.textSize, Modifier.weight(1f))
                                    prepared.parallels.forEach { parallelBible ->
                                        val parallelRef = display?.let { sameRefIn(ui.verses, parallelBible, it, ref) }
                                        val parallelText = verseText(parallelBible, parallelRef)
                                        Box(Modifier.weight(1f)) {
                                            if (parallelText == null) Text("—", color = palette.muted)
                                            else VerseLine(parallelText, parallelBible.lang, parallelBible.dir, ui.settings.textSize)
                                        }
                                    }
                                }
                            } else {
                                VerseLine(text, display?.lang.orEmpty(), display?.dir ?: "ltr", ui.settings.textSize)
                                prepared.parallels.forEach { parallelBible ->
                                    val parallelRef = display?.let { sameRefIn(ui.verses, parallelBible, it, ref) }
                                    val parallelText = verseText(parallelBible, parallelRef)
                                    Text(langName(parallelBible.lang), color = palette.muted, fontSize = 11.sp, modifier = Modifier.padding(top = 4.dp))
                                    if (parallelText == null) Text("—", color = palette.muted)
                                    else VerseLine(parallelText, parallelBible.lang, parallelBible.dir, ui.settings.textSize * 0.95, color = palette.muted)
                                }
                            }
                        }
                    }
                    if (marks.isNotEmpty()) Text(marks, color = palette.accent, fontSize = 12.sp)
                }
            }
        }
        item {
            val loaded = ui.library.loadedBibles()
            val prev = neighbour(ui.bundle.books, loaded, prepared.book.id, prepared.chapter, -1)
            val next = neighbour(ui.bundle.books, loaded, prepared.book.id, prepared.chapter, 1)
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                TextButton(onClick = { if (prev != null) onChapter(prev.book, prev.chapter) }, enabled = prev != null) {
                    Text(if (prev == null) "‹" else "‹ ${ui.booksById[prev.book]?.en.orEmpty()} ${prev.chapter}")
                }
                TextButton(onClick = { if (next != null) onChapter(next.book, next.chapter) }, enabled = next != null) {
                    Text(if (next == null) "›" else "${ui.booksById[next.book]?.en.orEmpty()} ${next.chapter} ›")
                }
            }
        }
    }
}

@Composable
internal fun BooksBody(ui: BibleUi, currentBook: String, embedded: Boolean, onRead: (String, Int) -> Unit) {
    val palette = LocalBiblePalette.current
    var tab by remember(currentBook) { mutableStateOf(if (ui.booksById[currentBook]?.nt == true) "nt" else "ot") }
    var open by remember(currentBook) { mutableStateOf(currentBook) }
    var loaded by remember { mutableStateOf(false) }
    LaunchedEffect(tab, ui.settings.primary, ui.installed) {
        withContext(Dispatchers.Default) {
            (listOf(ui.settings.primary) + ui.settings.parallel).forEach { id ->
                ui.catalog.bibles.firstOrNull { it.id == id }?.let { runCatching { ui.library.ensureBible(it) } }
            }
            val testament = ui.bundle.books.filter { (tab == "nt") == it.nt }
            if (testament.none { chapterCount(ui.library.loadedBibles(), it.id) > 0 } && testament.isNotEmpty()) {
                standInFor(ui.library, ui.catalog, testament.first(), 1, ui.settings.primary, emptyList(), ui::bibleAvailable)
            }
        }
        loaded = true
    }
    val primary = ui.catalog.bibles.firstOrNull { it.id == ui.settings.primary }
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(if (embedded) 8.dp else 16.dp)) {
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            TabButton("Old Testament", tab == "ot", Modifier.weight(1f)) { tab = "ot"; loaded = false }
            TabButton("New Testament", tab == "nt", Modifier.weight(1f)) { tab = "nt"; loaded = false }
        }
        if (tab == "ot") {
            Muted("In the order of the Septuagint. ◆ marks books the Church reads that are outside the Hebrew canon.")
        }
        val groups = if (tab == "nt") bookGroups.drop(5) else bookGroups.take(5)
        val testamentBooks = ui.bundle.books.filter { (tab == "nt") == it.nt }
        if (primary != null && testamentBooks.none { ui.library.bible(primary.id)?.books?.containsKey(it.id) == true }) {
            Muted("${primary.name} has no ${if (tab == "nt") "New" else "Old"} Testament, so these books open in another translation.")
        }
        if (!loaded) Muted("Loading…")
        groups.forEach { (id, label) ->
            val books = ui.bundle.books.filter { it.group == id }
            if (books.isEmpty()) return@forEach
            SectionTitle(label)
            books.forEach { book ->
                val selected = book.id == open
                Text(
                    buildString {
                        append(book.en)
                        if (book.dc) append(" ◆")
                        if (book.alt.isNotBlank()) append("  ${book.alt}")
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(if (selected || book.id == ui.settings.last.book) palette.accentSoft else palette.paper)
                        .clickable { open = if (open == book.id) "" else book.id }
                        .padding(10.dp),
                    fontWeight = if (book.id == ui.settings.last.book) FontWeight.Bold else FontWeight.Normal,
                    color = palette.ink,
                )
                if (selected) {
                    val count = chapterCount(ui.library.loadedBibles(), book.id)
                    if (count == 0) Muted("No installed translation includes this book yet.")
                    else ChapterGrid(count, book.id == ui.settings.last.book, ui.settings.last.chapter, onRead = { onRead(book.id, it) })
                }
            }
        }
    }
}

@Composable
private fun Chip(label: String, filled: Boolean, onClick: () -> Unit) {
    val palette = LocalBiblePalette.current
    Text(
        label,
        color = if (filled) Color.White else palette.accent,
        modifier = Modifier
            .clip(RoundedCornerShape(20.dp))
            .background(if (filled) palette.accent else palette.accentSoft)
            .clickable(onClick = onClick)
            .padding(horizontal = 12.dp, vertical = 6.dp),
        fontSize = 13.sp,
    )
}

@Composable
internal fun VerseLine(
    text: String,
    lang: String,
    dir: String,
    sizeRem: Double,
    modifier: Modifier = Modifier,
    color: Color = LocalBiblePalette.current.ink,
) {
    val direction = if (dir == "rtl") LayoutDirection.Rtl else LayoutDirection.Ltr
    CompositionLocalProvider(LocalLayoutDirection provides direction) {
        Text(
            text,
            modifier = modifier,
            color = color,
            fontFamily = FontFamily.Serif,
            fontSize = (sizeRem * 16).sp,
            lineHeight = (sizeRem * 24).sp,
        )
    }
}

@Composable
private fun TabButton(label: String, on: Boolean, modifier: Modifier, click: () -> Unit) {
    val palette = LocalBiblePalette.current
    Text(
        label,
        modifier = modifier
            .clip(RoundedCornerShape(8.dp))
            .background(if (on) palette.accent else palette.paper)
            .border(1.dp, palette.line, RoundedCornerShape(8.dp))
            .clickable(onClick = click)
            .padding(10.dp),
        color = if (on) Color.White else palette.ink,
        textAlign = TextAlign.Center,
        maxLines = 1,
    )
}

@Composable
private fun ChapterGrid(count: Int, currentBook: Boolean, currentChapter: Int, onRead: (Int) -> Unit) {
    val palette = LocalBiblePalette.current
    Column(Modifier.padding(bottom = 8.dp)) {
        (1..count).chunked(6).forEach { row ->
            Row(horizontalArrangement = Arrangement.spacedBy(6.dp), modifier = Modifier.padding(vertical = 3.dp)) {
                row.forEach { chapter ->
                    val current = currentBook && chapter == currentChapter
                    Text(
                        "$chapter",
                        modifier = Modifier
                            .size(40.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(if (current) palette.accent else palette.bg)
                            .clickable { onRead(chapter) }
                            .padding(top = 10.dp),
                        color = if (current) Color.White else palette.ink,
                        textAlign = TextAlign.Center,
                    )
                }
            }
        }
    }
}
