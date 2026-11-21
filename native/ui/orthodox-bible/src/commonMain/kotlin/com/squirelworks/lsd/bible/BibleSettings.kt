package com.squirelworks.lsd.bible

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

@Composable
internal fun TranslationsBody(ui: BibleUi, onAbout: () -> Unit) {
    val palette = LocalBiblePalette.current
    val release = remember(ui.catalog, ui.toast) { readPackRelease(ui.contentStore) }
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Muted("Pick the main text, then tick any others to read beside it, verse by verse.")
        val note = if (release == null) {
            "More languages and Fathers can be downloaded, then work offline."
        } else {
            "Checked ${formatDay(release.checked)}"
        }
        Row(verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text("More Bibles and commentary")
                Muted(note)
            }
            Button(onClick = { ui.checkForTexts() }) { Text("Check for new texts") }
        }
        languagesInNameOrder(ui.catalog.bibles.map { it.lang }).forEach { lang ->
            SectionTitle(langName(lang))
            ui.catalog.bibles.filter { it.lang == lang }.forEach { entry ->
                val detail = listOf(entry.testaments, entry.license, if (entry.url.isBlank()) "" else megabytes(entry.size))
                    .filter { it.isNotBlank() }
                    .joinToString(" · ")
                Column(Modifier.fillMaxWidth().padding(vertical = 4.dp)) {
                    Text(entry.name)
                    if (detail.isNotBlank()) Muted(detail)
                    if (ui.bibleAvailable(entry)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            RadioButton(selected = entry.id == ui.settings.primary, onClick = { ui.setPrimary(entry.id) })
                            Text("Main")
                            Checkbox(
                                checked = entry.id in ui.settings.parallel,
                                onCheckedChange = { ui.toggleParallel(entry.id, it) },
                                enabled = entry.id != ui.settings.primary,
                            )
                            Text("Beside")
                        }
                        if (entry.url.isNotBlank()) {
                            TextButton(onClick = { ui.removeDownload("bible", entry.id) }) { Text("Remove download") }
                        }
                    } else {
                        var busy by remember(entry.id) { mutableStateOf(false) }
                        Button(
                            onClick = {
                                busy = true
                                ui.download(listOf(packKey("bible", entry.id))) { busy = false }
                            },
                            enabled = !busy,
                        ) { Text(if (busy) "Downloading…" else "Download") }
                    }
                }
            }
        }
        SectionTitle("Reading")
        Text("Layout")
        Muted("Columns need a wide screen; phones always stack.")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Choice("Stacked under each verse", ui.settings.layout == "stack") { ui.save(ui.settings.copy(layout = "stack")) }
            Choice("Side-by-side columns", ui.settings.layout == "columns") { ui.save(ui.settings.copy(layout = "columns")) }
        }
        Text("Text size")
        Row(Modifier.horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            textSizes.forEach { size ->
                Choice("${kotlin.math.round(size * 100).toInt()}%", kotlin.math.abs(ui.settings.textSize - size) < 0.001) {
                    ui.save(ui.settings.copy(textSize = size))
                }
            }
        }
        Text("Theme")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Choice("Match device", ui.settings.theme == "auto") { ui.save(ui.settings.copy(theme = "auto")) }
            Choice("Light", ui.settings.theme == "light") { ui.save(ui.settings.copy(theme = "light")) }
            Choice("Dark", ui.settings.theme == "dark") { ui.save(ui.settings.copy(theme = "dark")) }
        }
        if (ui.catalog.commentary.isNotEmpty()) {
            SectionTitle("Patristic commentary")
            val byAuthor = LinkedHashMap<String, MutableList<CatalogCommentary>>()
            ui.catalog.commentary.forEach { entry ->
                byAuthor.getOrPut(entry.author.ifBlank { entry.id }) { mutableListOf() }.add(entry)
            }
            traditions.forEach { (id, label) ->
                val authors = byAuthor.values.filter { it.first().tradition.ifBlank { "east" } == id }
                if (authors.isEmpty()) return@forEach
                Text(label, fontWeight = FontWeight.Bold, color = palette.accent, modifier = Modifier.padding(top = 6.dp))
                authors.forEach { group ->
                    val missing = group.filter { !ui.commentaryAvailable(it) }
                    val license = group.map { it.license }.filter { it.isNotBlank() }.distinct().joinToString(" · ")
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Column(Modifier.weight(1f)) {
                            Text(group.first().author)
                            val extra = if (missing.isEmpty()) {
                                license
                            } else {
                                listOf(license, megabytes(missing.sumOf { it.size }).ifBlank { "download" })
                                    .filter { it.isNotBlank() }
                                    .joinToString(" · ")
                            }
                            if (extra.isNotBlank()) Muted(extra)
                        }
                        if (missing.isNotEmpty()) {
                            var busy by remember(group.first().id) { mutableStateOf(false) }
                            Button(
                                onClick = {
                                    busy = true
                                    ui.download(missing.map { packKey("commentary", it.id) }) { busy = false }
                                },
                                enabled = !busy,
                            ) { Text(if (busy) "Downloading…" else "Download") }
                        } else {
                            val ids = group.map { it.id }
                            val shown = ids.any { it !in ui.settings.hiddenCommentary }
                            Checkbox(
                                checked = shown,
                                onCheckedChange = { on ->
                                    val hidden = ui.settings.hiddenCommentary.filter { it !in ids }.toMutableList()
                                    if (!on) hidden += ids
                                    ui.save(ui.settings.copy(hiddenCommentary = hidden))
                                },
                            )
                        }
                    }
                }
            }
        }
        Button(onClick = onAbout) { Text("About & sources") }
    }
}

@Composable
internal fun Choice(label: String, selected: Boolean, onClick: () -> Unit) {
    val palette = LocalBiblePalette.current
    Text(
        label,
        modifier = Modifier
            .clip(RoundedCornerShape(8.dp))
            .background(if (selected) palette.accent else palette.paper)
            .border(1.dp, if (selected) palette.accent else palette.line, RoundedCornerShape(8.dp))
            .clickable(onClick = onClick)
            .padding(horizontal = 10.dp, vertical = 8.dp),
        color = if (selected) Color.White else palette.ink,
    )
}

private fun formatDay(epochMs: Long): String {
    if (epochMs <= 0L) return ""
    val days = (epochMs / 86_400_000L).toInt()
    return shiftDate(Ymd(1970, 1, 1), days).iso()
}

@Composable
internal fun TodayBody(
    ui: BibleUi,
    page: Page.Today,
    onReplace: (Page) -> Unit,
    onRead: (String, Int, Int) -> Unit,
) {
    if (ui.lectionary.services.isEmpty()) {
        Muted("The daily readings calendar isn't installed in this build yet.", Modifier.padding(16.dp))
        return
    }
    val date = page.iso?.let { parseIsoDate(it) } ?: currentDate()
    val day = remember(date, ui.settings.calendar) { liturgicalDay(ui.lectionary, date, ui.settings.calendar) }
    LaunchedEffect(ui.settings.primary, day.pdist, ui.settings.calendar) {
        val entry = ui.catalog.bibles.firstOrNull { it.id == ui.settings.primary }
        withContext(Dispatchers.Default) {
            entry?.let { runCatching { ui.library.ensureBible(it) } }
            day.readings.forEach { reading ->
                reading.refs.forEach { span ->
                    val book = ui.bundle.books.firstOrNull { it.id == span.book } ?: return@forEach
                    val current = ui.library.bible(ui.settings.primary)
                    if (current?.books?.containsKey(span.book) != true) {
                        standInFor(ui.library, ui.catalog, book, span.startChapter, ui.settings.primary, emptyList(), ui::bibleAvailable)
                    }
                }
            }
        }
    }
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            TextButton(onClick = { onReplace(Page.Today(shiftDate(date, -1).iso())) }) { Text("‹ Previous") }
            TextButton(onClick = { onReplace(Page.Today(null)) }) { Text("Today") }
            TextButton(onClick = { onReplace(Page.Today(shiftDate(date, 1).iso())) }) { Text("Next ›") }
        }
        Text("${day.weekday}, ${monthNames[day.date.m - 1]} ${day.date.d}, ${day.date.y}", fontWeight = FontWeight.Bold)
        if (ui.settings.calendar == "old") {
            Muted("(${monthNames[day.menaion.m - 1]} ${day.menaion.d} old style)")
        }
        day.titles.forEach { Text(it, fontWeight = FontWeight.Bold) }
        val tone = if (day.tone == 0) "" else "Tone ${day.tone}"
        val feastLine = listOf(tone, day.feasts.joinToString("; ")).filter { it.isNotBlank() }.joinToString(" · ")
        if (feastLine.isNotBlank()) Muted(feastLine)
        if (day.saints.isNotEmpty()) {
            SectionTitle("Commemorations")
            Text(day.saints.joinToString(" · "))
        }
        SectionTitle("Readings")
        val order = day.main + day.readings.indices.filter { it !in day.main }
        if (order.isEmpty()) Muted("No scripture readings appointed.")
        order.forEach { index ->
            val reading = day.readings.getOrNull(index) ?: return@forEach
            val chief = index in day.main
            CardBlock {
                Text(
                    reading.service + if (reading.desc.isBlank()) "" else " · ${reading.desc}",
                    fontWeight = FontWeight.Bold,
                    color = if (chief) LocalBiblePalette.current.accent else LocalBiblePalette.current.ink,
                )
                if (reading.display.isNotBlank()) Muted(reading.display)
                if (reading.refs.isEmpty()) {
                    Muted("Composite reading; see the service books.")
                } else {
                    reading.refs.forEach { span ->
                        val bible = bibleForSpan(ui, span)
                        val lines = bible?.let { passageLines(ui.verses, it, span) }.orEmpty()
                        if (lines.isNotEmpty()) {
                            val body = buildAnnotatedString {
                                lines.forEach { line ->
                                    withStyle(SpanStyle(fontWeight = FontWeight.Bold, fontSize = 11.sp)) {
                                        append(line.ref.substringAfterLast('.'))
                                    }
                                    append(" ")
                                    append(line.text)
                                    append(" ")
                                }
                            }
                            Text(body, fontFamily = FontFamily.Serif)
                            val start = parseRef(lines.first().ref)
                            TextButton(onClick = { onRead(start.book, start.chapter, start.verse) }) {
                                Text("Open in chapter · ${bible?.name.orEmpty()}")
                            }
                        }
                    }
                }
            }
        }
        if (day.main.isEmpty()) Muted("No Divine Liturgy is appointed today.")
        SectionTitle("Calendar")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Choice("New (Revised Julian)", ui.settings.calendar == "new") { ui.save(ui.settings.copy(calendar = "new")) }
            Choice("Old (Julian)", ui.settings.calendar == "old") { ui.save(ui.settings.copy(calendar = "old")) }
        }
        Muted("Readings follow the Slavic usage, from Orthocal (MIT).")
    }
}

private fun bibleForSpan(ui: BibleUi, span: VerseSpan): BibleDocument? {
    ui.library.bible(ui.settings.primary)?.takeIf { it.books.containsKey(span.book) }?.let { return it }
    return ui.catalog.bibles.firstNotNullOfOrNull { entry ->
        ui.library.bible(entry.id)?.takeIf { hasChapter(it, span.book, span.startChapter) }
    }
}

@Composable
internal fun AboutBody(ui: BibleUi) {
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("SquirrelGo Orthodox Bible is an offline Bible reader for Orthodox study: the Septuagint canon and book order, any verse side by side in other languages, and commentary from the Church Fathers verse by verse.")
        Muted("It uses only public-domain and openly licensed texts. It is not the Orthodox Study Bible and contains none of its text or notes, and it is not affiliated with Thomas Nelson, Ancient Faith, or the Catena app.")
        SectionTitle("Bible texts")
        ui.catalog.bibles.forEach { entry ->
            Text("${entry.name} (${langName(entry.lang)}) · ${entry.license}")
            val url = sourceUrl(entry.source)
            if (url.isNotBlank()) TextButton(onClick = { ui.onOpenUrl(url) }) { Text("source") }
        }
        SectionTitle("Commentary")
        if (ui.catalog.commentary.isEmpty()) Muted("None installed yet.")
        ui.catalog.commentary.forEach { entry ->
            val work = if (entry.work.isBlank()) "" else ", ${entry.work}"
            Text("${entry.author}$work · ${entry.license}")
            val url = sourceUrl(entry.source)
            if (url.isNotBlank()) TextButton(onClick = { ui.onOpenUrl(url) }) { Text("source") }
        }
    }
}
