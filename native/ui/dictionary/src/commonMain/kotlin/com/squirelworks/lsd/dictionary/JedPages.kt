package com.squirelworks.lsd.dictionary

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.squirelworks.lsd.core.kana.Kana
import kotlinx.coroutines.delay

internal class PageActions(
    val open: (DictScreen) -> Unit,
    val searchAll: (String) -> Unit,
    val speak: (String) -> Unit,
    val copy: (String) -> Unit,
    val lookup: (String, String) -> Unit,
    val menu: (DictOverlay) -> Unit,
    val persist: (JedSaved) -> Unit,
    val back: () -> Unit,
    val export: (String, String) -> String,
    val rememberEntry: (Int) -> Unit,
    val clearHistory: () -> Unit,
    val toast: (String) -> Unit,
)

@Composable
internal fun SearchPage(screen: DictScreen.Search, index: JedIndex, saved: JedSaved, actions: PageActions) {
    val filter = remember(saved.field, saved.commonOnly, saved.chars, saved.history, saved.lists, screen.scope, index) {
        searchFilter(saved, screen.scope, index)
    }
    var outcome by remember(screen.query, filter) { mutableStateOf(jedSearch(index, screen.query, filter)) }
    LaunchedEffect(screen.query, filter) {
        delay(200)
        outcome = jedSearch(index, screen.query, filter)
    }
    if (!index.meta.installed) {
        StatusLine(WORD_LIST_MISSING)
        return
    }
    val browsing = screen.query.isBlank() && filter.only == null && filter.type == null
    if (browsing) {
        WelcomeList(index, saved, actions)
        return
    }
    if (outcome.results.isEmpty()) {
        StatusLine("No result(s)")
        return
    }
    var shown by remember(outcome) { mutableIntStateOf(minOf(SEARCH_PAGE, outcome.results.size)) }
    LazyColumn {
        item {
            Text(
                buildString {
                    append(groupedCount(outcome.total))
                    append(" result(s)")
                    if (outcome.total > outcome.results.size) append(", showing the first ${outcome.results.size}")
                },
                color = JedSecondary,
                modifier = Modifier.padding(12.dp),
            )
        }
        items(outcome.results.take(shown), key = { it.pos }) { hit ->
            val row = index.rows[hit.pos]
            ResultRow(row, hit.note, saved, { actions.open(DictScreen.Details(hit.pos, hit.note)) }, {
                actions.menu(entryItems(row, screen.scope, actions))
            })
        }
        if (shown < outcome.results.size) {
            item { MoreLine("More results ($shown of ${outcome.results.size})") { shown = minOf(outcome.results.size, shown + SEARCH_PAGE) } }
        }
    }
}

@Composable
private fun WelcomeList(index: JedIndex, saved: JedSaved, actions: PageActions) {
    val recent = saved.history.take(10).mapNotNull { word -> index.byId[word.id]?.let { it to index.rows[it] } }
    LazyColumn {
        item {
            Text(
                "Type kanji, kana, rōmaji or English above. Long-press a result for more options.",
                color = JedSecondary,
                modifier = Modifier.padding(16.dp),
            )
        }
        if (recent.isNotEmpty()) {
            item { SectionLabel("History") }
            items(recent, key = { it.first }) { (pos, row) ->
                ResultRow(row, null, saved, { actions.open(DictScreen.Details(pos, null)) }, {
                    actions.menu(entryItems(row, DictScope.All, actions))
                })
            }
        }
    }
}

internal fun entryItems(row: JedRow, scope: DictScope, actions: PageActions): DictOverlay.Items {
    val items = mutableListOf(
        "Copy kanji" to { actions.copy(headOf(row)) },
        "Copy reading" to { actions.copy(row.kana.joinToString(", ")) },
        "Copy meaning" to { actions.copy(row.senses.joinToString("; ")) },
        "Tag" to { actions.open(DictScreen.Tags(row.id)) },
        "Listen" to { actions.speak(row.kana.firstOrNull().orEmpty()) },
    )
    if (scope is DictScope.History) {
        items += "Clear history" to {
            actions.menu(DictOverlay.Confirm("Clear history?", "Clearing history!", actions.clearHistory))
        }
    }
    return DictOverlay.Items(headOf(row), items)
}

@Composable
internal fun MenuPage(index: JedIndex, saved: JedSaved, rootQuery: String, actions: PageActions, openSuite: () -> Unit) {
    val words = groupedCount(index.meta.words)
    val kanji = groupedCount(index.meta.kanjiCount)
    val tagged = saved.lists.values.flatten().map { it.id }.toSet().size
    Column(Modifier.verticalScroll(rememberScrollState())) {
        SectionLabel("Search")
        MenuLine("All", "Search among all entries ($words)") { actions.searchAll(rootQuery) }
        MenuLine("Tags", "Search among your tagged entries (${groupedCount(tagged)})") { actions.open(DictScreen.Tags(null)) }
        MenuLine("History", "Search recently displayed entries (${groupedCount(saved.history.size)})") {
            actions.open(DictScreen.Search(DictScope.History, ""))
        }
        SectionLabel("Dictionary")
        MenuLine("All Words/Expresions", "Search among words and expressions ($words)") { actions.searchAll(rootQuery) }
        MenuLine("Words by category", "Choose the category to search from") { actions.open(DictScreen.Categories) }
        SectionLabel("Kanji and Kana")
        MenuLine("All Kanji", "Search in all kanji ($kanji)") { actions.open(DictScreen.KanjiList("")) }
        MenuLine("Kanji by radicals", "Search kanji by its radical(s)") { actions.open(DictScreen.Radicals(null)) }
        MenuLine("Hiragana and Katakana", "Simple kana table") { actions.open(DictScreen.KanaChart(false)) }
        SectionLabel("SquirrelGo")
        MenuLine("SquirrelGo apps", "Kana, Kanji, Phrasebook and more · notes and resources", openSuite)
        SectionLabel("Application")
        MenuLine("Settings", "Text size and display") { actions.open(DictScreen.Settings) }
        MenuLine("About", "Version, data and acknowledgements") { actions.open(DictScreen.About) }
    }
}

@Composable
internal fun CategoriesPage(index: JedIndex, actions: PageActions) {
    val counts = remember(index) { categoryCounts(index) }
    Column(Modifier.verticalScroll(rememberScrollState())) {
        SectionLabel("Parts of speech")
        listOf("verb", "nonsuru", "noun", "adj", "adv").forEach { type -> CategoryLine(type, counts, actions) }
        SectionLabel("Others")
        listOf("ctr", "ono").forEach { type -> CategoryLine(type, counts, actions) }
    }
}

@Composable
private fun CategoryLine(type: String, counts: Map<String, Int>, actions: PageActions) {
    val name = WORD_CATEGORIES.getValue(type)
    MenuLine(name, "Search ${name.lowercase()} (${groupedCount(counts[type] ?: 0)})") {
        actions.open(DictScreen.Search(DictScope.Category(type), ""))
    }
}

@Composable
internal fun DetailsPage(screen: DictScreen.Details, index: JedIndex, saved: JedSaved, actions: PageActions) {
    val row = index.rows.getOrNull(screen.pos) ?: return StatusLine("No result(s)")
    val body = index.body(screen.pos)
    LaunchedEffect(row.id) { actions.rememberEntry(screen.pos) }
    val senses = if (body.s.isNotEmpty()) body.s else row.senses.map { JedSense(g = listOf(it)) }
    val head = headOf(row)
    val tags = saved.lists.filterValues { words -> words.any { it.id == row.id } }.keys.toList()
    Column(Modifier.verticalScroll(rememberScrollState())) {
        Column(Modifier.fillMaxWidth().clickable { actions.speak(row.kana.firstOrNull().orEmpty()) }.padding(16.dp)) {
            Text(head, color = JedPaper, fontSize = 36.sp, style = TextStyle(localeList = JedJapanese))
            if (row.kanji.isNotEmpty()) Text(row.kana.firstOrNull().orEmpty(), color = JedSecondary, style = TextStyle(localeList = JedJapanese))
            if (saved.romaji && row.kana.isNotEmpty()) Text(Kana.toRomaji(row.kana[0]), color = JedSimple)
        }
        if (!screen.note.isNullOrBlank()) NameValue("Root form", "$head (${screen.note})")
        if (row.kanji.isNotEmpty()) NameValue("Reading", row.kana.firstOrNull().orEmpty())
        if (body.c.isNotEmpty()) NameValue("Common", "Yes")
        if (tags.isNotEmpty()) NameValue("Tags", tags.joinToString(" "))
        SectionLabel("Meanings")
        var lastPos = ""
        senses.forEachIndexed { i, sense ->
            val pos = sense.p.joinToString(", ") { tagName(index.meta, it) }
            Column(Modifier.padding(horizontal = 12.dp, vertical = 8.dp)) {
                if (pos.isNotEmpty() && pos != lastPos) Text(pos, color = JedSecondary)
                Text("${i + 1}. ${sense.g.joinToString("; ")}", color = JedGloss)
                val extra = (sense.m + sense.f + sense.d).map { tagName(index.meta, it) }
                if (extra.isNotEmpty()) Text(extra.joinToString(", "), color = JedSimple)
                val limits = sense.sk + sense.sr
                if (limits.isNotEmpty()) Text("only for ${limits.joinToString(", ")}", color = JedSimple)
                if (sense.i.isNotEmpty()) Text(sense.i.joinToString("; "), color = JedSimple)
                if (sense.l.isNotEmpty()) Text("From ${sense.l.joinToString(", ")}", color = JedSimple)
                if (sense.r.isNotEmpty()) RefLine("See also", sense.r, actions)
                if (sense.a.isNotEmpty()) RefLine("Antonym", sense.a, actions)
            }
            if (pos.isNotEmpty()) lastPos = pos
        }
        val alts = buildList {
            row.kanji.drop(1).forEach { kanji ->
                val reads = row.kana.filter { reading -> body.ra[reading].let { it == null || kanji in it } }
                add(kanji to reads.joinToString(", "))
            }
            row.kana.drop(1).forEach { add(it to "") }
        }
        if (alts.isNotEmpty()) {
            SectionLabel("Alternatives")
            alts.forEach { (word, reading) ->
                Row(Modifier.padding(horizontal = 12.dp, vertical = 6.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(word, color = JedPaper, style = TextStyle(localeList = JedJapanese))
                    if (reading.isNotEmpty()) Text("[$reading]", color = JedSecondary, style = TextStyle(localeList = JedJapanese))
                }
            }
        }
        val chars = row.kanji
            .filter { "sK" !in body.kt[it].orEmpty() }
            .flatMap { word -> word.map { it.toString() } }
            .filter { it in index.kanji }
            .distinct()
        if (chars.isNotEmpty()) {
            SectionLabel("Kanji")
            chars.forEach { ch ->
                KanjiLine(ch, index.kanji.getValue(ch), onClick = { actions.open(DictScreen.KanjiPage(ch)) })
            }
        }
        if (body.x.isNotEmpty()) {
            SectionLabel("Sentences")
            body.x.forEach { pair ->
                val jp = pair.getOrElse(0) { "" }
                Column(Modifier.fillMaxWidth().clickable { actions.speak(jp) }.padding(horizontal = 12.dp, vertical = 8.dp)) {
                    Text(jp, color = JedPaper, style = TextStyle(localeList = JedJapanese))
                    Text(pair.getOrElse(1) { "" }, color = JedSecondary)
                }
            }
        }
        MoreLine("Find $head in the Phrasebook") { actions.lookup("phrasebook", head) }
        Text(
            "JMdict ${row.id}" + if (body.x.isNotEmpty()) " · sentences from Tatoeba" else "",
            color = JedSimple,
            modifier = Modifier.padding(12.dp),
        )
    }
}

@Composable
private fun RefLine(label: String, refs: List<String>, actions: PageActions) {
    Row(Modifier.padding(top = 4.dp), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
        Text("$label:", color = JedSimple)
        refs.forEach { ref ->
            Text(ref, color = JedTag, style = TextStyle(localeList = JedJapanese), modifier = Modifier.clickable {
                actions.searchAll(ref.substringBefore("・"))
            })
        }
    }
}

@Composable
internal fun KanjiListPage(screen: DictScreen.KanjiList, index: JedIndex, saved: JedSaved, actions: PageActions) {
    if (!index.meta.installed) return StatusLine(WORD_LIST_MISSING)
    val list = remember(screen.query, index) { searchKanji(index, screen.query) }
    if (list.isEmpty()) return StatusLine("No result(s)")
    var shown by remember(list) { mutableIntStateOf(minOf(SEARCH_PAGE, list.size)) }
    LazyColumn {
        item { Text("${groupedCount(list.size)} kanji", color = JedSecondary, modifier = Modifier.padding(12.dp)) }
        items(list.take(shown)) { ch ->
            KanjiLine(ch, index.kanji.getValue(ch), { actions.open(DictScreen.KanjiPage(ch)) }, {
                actions.menu(DictOverlay.Items(ch, listOf(
                    "Copy kanji" to { actions.copy(ch) },
                    "Search words with this kanji" to { actions.searchAll("*$ch*") },
                )))
            })
        }
        if (shown < list.size) item { MoreLine("More results ($shown of ${list.size})") { shown = minOf(list.size, shown + SEARCH_PAGE) } }
    }
}

@Composable
internal fun KanjiDetailPage(screen: DictScreen.KanjiPage, index: JedIndex, saved: JedSaved, actions: PageActions) {
    val kanji = index.kanji[screen.character]
    if (kanji == null) return StatusLine(if (index.meta.installed) "No result(s)" else WORD_LIST_MISSING)
    val words = remember(screen.character, index) { wordsWithKanji(index, screen.character) }
    Column(Modifier.verticalScroll(rememberScrollState())) {
        Row(Modifier.padding(16.dp), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Text(screen.character, color = JedPaper, fontSize = 64.sp, style = TextStyle(localeList = JedJapanese))
            Column {
                Text(kanji.on.joinToString("、"), color = JedPaper, style = TextStyle(localeList = JedJapanese))
                Text(kanji.kun.joinToString("、"), color = JedPaper, style = TextStyle(localeList = JedJapanese))
                Text(kanji.m.joinToString(", "), color = JedGloss)
            }
        }
        NameValue("Strokes", kanji.s.toString())
        kanji.r?.let { NameValue("Radical", "#$it") }
        if (!kanji.p.isNullOrEmpty()) {
            Row(Modifier.padding(horizontal = 12.dp, vertical = 6.dp)) {
                Text("Parts", color = JedSimple, modifier = Modifier.width(120.dp))
                kanji.p.forEach { part ->
                    Text(part.toString(), color = JedPaper, modifier = Modifier.padding(4.dp).clickable {
                        actions.open(DictScreen.Radicals(part.toString()))
                    }, style = TextStyle(localeList = JedJapanese))
                }
            }
        }
        kanji.g?.let { NameValue("Grade", gradeLabel(it)) }
        kanji.j?.let { NameValue("JLPT", "N$it") }
        kanji.f?.let { NameValue("Frequency", "$it / 2500") }
        if (kanji.n.isNotEmpty()) NameValue("Nanori", kanji.n.joinToString("、"))
        kanji.sk?.let { NameValue("SKIP", it) }
        kanji.h?.let { NameValue("Heisig", it) }
        SectionLabel("Words")
        words.forEach { pos ->
            ResultRow(index.rows[pos], null, saved, { actions.open(DictScreen.Details(pos, null)) }, {
                actions.menu(entryItems(index.rows[pos], DictScope.All, actions))
            })
        }
        MoreLine("Search all words with ${screen.character}") { actions.searchAll("*${screen.character}*") }
        MoreLine("Stroke order and quizzes in SquirrelGo Kanji") { actions.lookup("kanji", screen.character) }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
internal fun RadicalsPage(screen: DictScreen.Radicals, index: JedIndex, reset: Int, actions: PageActions) {
    if (!index.meta.installed) return StatusLine(WORD_LIST_MISSING)
    var picked by remember(screen.preset, reset, index) {
        mutableStateOf(if (screen.preset != null && index.radicals.any { it.r == screen.preset }) setOf(screen.preset) else emptySet())
    }
    val matches = remember(picked, index) {
        var set: Set<String>? = null
        for (radical in picked) {
            val chars = index.radicals.firstOrNull { it.r == radical }?.k?.map { it.toString() }?.toSet().orEmpty()
            set = if (set == null) chars else set.intersect(chars)
        }
        set?.sortedBy { index.kanji[it]?.s ?: 99 }.orEmpty()
    }
    val possible = if (picked.isEmpty()) null else index.radicals.filter { it.r !in picked && matches.any { ch -> ch in it.k } }.map { it.r }.toSet()
    Column(Modifier.verticalScroll(rememberScrollState()).padding(8.dp)) {
        Text("Number of kanji: ${if (picked.isEmpty()) "-" else matches.size.toString()}", color = JedSecondary)
        if (picked.isNotEmpty()) {
            FlowRow {
                matches.take(200).forEach { ch ->
                    Text(ch, color = JedPaper, fontSize = 22.sp, modifier = Modifier.padding(4.dp).clickable {
                        actions.open(DictScreen.KanjiPage(ch))
                    }, style = TextStyle(localeList = JedJapanese))
                }
                if (matches.size > 200) Text("+${matches.size - 200}", color = JedSimple)
            }
        }
        FlowRow {
            var last = 0
            index.radicals.forEach { radical ->
                if (radical.s != last) {
                    Text(radical.s.toString(), color = JedSimple, modifier = Modifier.padding(6.dp))
                    last = radical.s
                }
                val on = radical.r in picked
                val off = possible != null && radical.r !in possible && !on
                Text(
                    radical.r,
                    color = if (off) JedSimple else JedPaper,
                    modifier = Modifier.padding(2.dp).background(if (on) JedPressed else Color(0xFF1A1A1A)).clickable {
                        picked = if (on) picked - radical.r else if (!off) picked + radical.r else picked
                    }.padding(6.dp),
                    style = TextStyle(localeList = JedJapanese),
                )
            }
        }
    }
}

@Composable
internal fun KanaChartPage(kata: Boolean, actions: PageActions) {
    Column(Modifier.verticalScroll(rememberScrollState()).padding(8.dp)) {
        KanaBlock("Seion", listOf("-" to "あいうえお", "K" to "かきくけこ", "S" to "さしすせそ", "T" to "たちつてと", "N" to "なにぬねの", "H" to "はひふへほ", "M" to "まみむめも", "Y" to "や_ゆ_よ", "R" to "らりるれろ", "W" to "わ___を", "N" to "ん____"), kata, actions)
        KanaBlock("Dakuon", listOf("G" to "がぎぐげご", "Z" to "ざじずぜぞ", "D" to "だぢづでど", "B" to "ばびぶべぼ"), kata, actions)
        KanaBlock("HanDakuon", listOf("P" to "ぱぴぷぺぽ"), kata, actions)
        Text("Yoon", color = JedSecondary, modifier = Modifier.padding(vertical = 8.dp))
        listOf("Ky" to "き", "Sh" to "し", "Ch" to "ち", "Ny" to "に", "Hy" to "ひ", "My" to "み", "Ry" to "り", "Gy" to "ぎ", "J" to "じ", "By" to "び", "Py" to "ぴ").forEach { (label, base) ->
            Row {
                Text(label, color = JedSimple, modifier = Modifier.width(36.dp))
                KanaCell(base + "ゃ", kata, actions)
                Spacer(Modifier.width(48.dp))
                KanaCell(base + "ゅ", kata, actions)
                Spacer(Modifier.width(48.dp))
                KanaCell(base + "ょ", kata, actions)
            }
        }
        MoreLine("Lessons, quizzes and writing in SquirrelGo Kana") { actions.lookup("kana", "") }
    }
}

@Composable
private fun KanaBlock(title: String, rows: List<Pair<String, String>>, kata: Boolean, actions: PageActions) {
    Text(title, color = JedSecondary, modifier = Modifier.padding(vertical = 8.dp))
    rows.forEach { (label, cells) ->
        Row {
            Text(label, color = JedSimple, modifier = Modifier.width(36.dp))
            cells.forEach { ch -> if (ch == '_') Spacer(Modifier.width(48.dp)) else KanaCell(ch.toString(), kata, actions) }
        }
    }
}

@Composable
private fun KanaCell(kana: String, kata: Boolean, actions: PageActions) {
    val shown = if (kata) Kana.hiraToKata(kana) else kana
    Column(Modifier.width(48.dp).clickable { actions.speak(shown) }.padding(2.dp), horizontalAlignment = Alignment.CenterHorizontally) {
        Text(shown, color = JedPaper, style = TextStyle(localeList = JedJapanese))
        Text(Kana.toRomaji(kana), color = JedSimple, fontSize = 10.sp)
    }
}

@Composable
internal fun TagsPage(screen: DictScreen.Tags, index: JedIndex, saved: JedSaved, actions: PageActions) {
    val names = saved.lists.keys.toList()
    var checked by remember(screen.assignId, names.joinToString("\u0000")) {
        mutableStateOf(
            if (screen.assignId == null) emptySet()
            else names.filter { name -> saved.lists[name].orEmpty().any { it.id == screen.assignId } }.toSet(),
        )
    }
    Column(Modifier.fillMaxSize()) {
        if (names.isEmpty()) StatusLine("No tag(s)")
        Column(Modifier.weight(1f).verticalScroll(rememberScrollState())) {
            names.forEach { name ->
                Row(
                    Modifier.fillMaxWidth().pressMenu(
                        { checked = if (name in checked) checked - name else checked + name },
                        {
                            actions.menu(DictOverlay.Items("Tag menu", listOf(
                                "Rename tag" to {
                                    actions.menu(DictOverlay.Ask("Rename tag", name) { to ->
                                        if (to.isBlank() || to == name || saved.lists.containsKey(to)) return@Ask
                                        val renamed = LinkedHashMap<String, List<TagWord>>()
                                        saved.lists.forEach { (key, value) -> renamed[if (key == name) to else key] = value }
                                        actions.persist(saved.copy(lists = renamed))
                                    })
                                },
                                "Delete tag" to {
                                    actions.menu(DictOverlay.Confirm("Delete the tag “$name”?", null) {
                                        actions.persist(saved.copy(lists = saved.lists - name))
                                    })
                                },
                            )))
                        },
                    ).padding(12.dp),
                ) {
                    Text(if (name in checked) "☑" else "☐", color = JedPaper)
                    Text(" $name ", color = JedPaper)
                    Text("(${saved.lists[name].orEmpty().size})", color = JedSimple)
                }
            }
        }
        Row(Modifier.fillMaxWidth().padding(8.dp), horizontalArrangement = Arrangement.SpaceEvenly) {
            if (screen.assignId != null) {
                JedButton("Cancel", actions.back)
                JedButton("Add") { actions.menu(newTag(saved, actions)) }
                JedButton("Save") {
                    val row = index.byId[screen.assignId]?.let { index.rows[it] }
                    val shot = when {
                        row != null -> snapshot(row, index.body(index.byId.getValue(row.id)))
                        else -> saved.history.firstOrNull { it.id == screen.assignId }
                    }
                    if (shot != null) {
                        val next = saved.lists.mapValues { (name, words) ->
                            val has = words.any { it.id == shot.id }
                            when {
                                name in checked && !has -> listOf(shot) + words
                                name !in checked && has -> words.filterNot { it.id == shot.id }
                                else -> words
                            }
                        }
                        actions.persist(saved.copy(lists = next))
                    }
                    actions.back()
                }
            } else {
                JedButton("Export") {
                    val chosen = if (checked.isEmpty()) names else checked.toList()
                    if (chosen.isEmpty()) {
                        actions.toast("No tag(s)")
                        return@JedButton
                    }
                    actions.menu(DictOverlay.Items("Export tag(s) to", listOf(
                        "Anki file (CSV)" to {
                            val file = exportTagCsv(saved.lists, chosen) ?: return@to
                            actions.export(file.first, file.second)
                        },
                    )))
                }
                JedButton("Add") { actions.menu(newTag(saved, actions)) }
                JedButton("Show") {
                    actions.open(DictScreen.Search(DictScope.Tags(if (checked.isEmpty()) null else checked.toList()), ""))
                }
            }
        }
    }
}

private fun newTag(saved: JedSaved, actions: PageActions) = DictOverlay.Ask("Please enter a tag name...", "") { name ->
    if (name.isBlank() || saved.lists.containsKey(name)) return@Ask
    actions.persist(saved.copy(lists = saved.lists + (name to emptyList())))
}

@Composable
internal fun SettingsPage(saved: JedSaved, actions: PageActions) {
    Column(Modifier.verticalScroll(rememberScrollState())) {
        SectionLabel("Display")
        Text("Text size", color = JedPaper, modifier = Modifier.padding(12.dp))
        Row(Modifier.horizontalScroll(rememberScrollState()).padding(horizontal = 12.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf(0.9, 1.0, 1.15, 1.3).forEach { scale ->
                val on = kotlin.math.abs(saved.textScale - scale) < 0.001
                Text(
                    "${(scale * 100).toInt()}%",
                    color = JedInk,
                    modifier = Modifier.background(if (on) JedPressed else Color(0xFFDDDDDD)).clickable {
                        actions.persist(saved.copy(textScale = scale))
                    }.padding(horizontal = 12.dp, vertical = 8.dp),
                )
            }
        }
        Row(Modifier.fillMaxWidth().clickable { actions.persist(saved.copy(romaji = !saved.romaji)) }.padding(12.dp)) {
            Text(if (saved.romaji) "☑" else "☐", color = JedPaper)
            Column(Modifier.padding(start = 8.dp)) {
                Text("Show rōmaji", color = JedPaper)
                Text("Show rōmaji next to readings", color = JedSimple)
            }
        }
        SectionLabel("Data")
        Row(Modifier.fillMaxWidth().padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text("Clear history", color = JedPaper)
                Text("${saved.history.size} entries", color = JedSimple)
            }
            JedButton("Clear") {
                actions.menu(DictOverlay.Confirm("Clear history?", "Clearing history!") {
                    actions.persist(saved.copy(history = emptyList()))
                })
            }
        }
    }
}

@Composable
internal fun AboutPage(index: JedIndex) {
    val meta = index.meta
    Column(Modifier.verticalScroll(rememberScrollState()).padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Text("SquirrelGo Japanese-English Dictionary", color = JedPaper, fontSize = 22.sp)
        Text("Offline Japanese–English dictionary, laid out after JED. Everything is on the device; no download or server is needed.", color = JedPaper)
        Text("Search with kanji, hiragana, katakana, rōmaji or English. Conjugated verbs and adjectives (食べた, 高くない) are traced back to their dictionary form. Use * and ? as wildcards. Long-press any entry for copy and tag options.", color = JedPaper)
        Text(
            "JMdict ${meta.jmdictDate.ifBlank { "?" }} · ${groupedCount(meta.words)} entries\nKANJIDIC2 ${meta.kanjidicDate.ifBlank { "?" }} · ${groupedCount(meta.kanjiCount)} kanji\njmdict-simplified ${meta.version}",
            color = JedSimple,
        )
        Text("Acknowledgements", color = JedPaper, fontSize = 18.sp)
        Text("This software uses the JMdict, KANJIDIC2, RADKFILE and KRADFILE dictionary files. These files are the property of the Electronic Dictionaries Research and Development Group, and are used in conformance with the Group's licence (CC BY-SA 4.0). See edrdg.org.", color = JedPaper)
        Text("Example sentences come from the Tatoeba project (formerly the Tanaka Corpus), CC BY 2.0 FR.", color = JedPaper)
        Text("JSON conversion by jmdict-simplified.", color = JedPaper)
        Text("Not affiliated with umibouzu.com or the original JED; this is an independent implementation.", color = JedSimple)
    }
}

@Composable
internal fun NotepadEditor(saved: JedSaved, actions: PageActions, close: () -> Unit) {
    var text by remember { mutableStateOf(saved.notepad) }
    Column {
        Text("Notepad", color = JedPaper, modifier = Modifier.padding(bottom = 8.dp))
        BasicTextField(
            value = text,
            onValueChange = {
                text = it
                actions.persist(saved.copy(notepad = it))
            },
            textStyle = TextStyle(color = JedInk, fontSize = 16.sp, localeList = JedJapanese),
            cursorBrush = SolidColor(JedPressed),
            modifier = Modifier.fillMaxWidth().height(180.dp).background(JedPaper).padding(8.dp).pressMenu({}, {
                val body = text
                actions.menu(DictOverlay.Items("Notepad", buildList {
                    val sel = body.trim()
                    if (sel.isNotEmpty()) add("Search “$sel”" to { close(); actions.searchAll(sel) })
                    add("Copy all" to { actions.copy(body) })
                    add("Clear" to {
                        text = ""
                        actions.persist(saved.copy(notepad = ""))
                    })
                }))
            }),
        )
        JedButton("Close", close)
    }
}

@Composable
internal fun OptionsEditor(saved: JedSaved, actions: PageActions, close: () -> Unit) {
    var field by remember { mutableStateOf(saved.field) }
    var common by remember { mutableStateOf(saved.commonOnly) }
    var chars by remember { mutableStateOf(saved.chars) }
    Column {
        Text("Search Options", color = JedPaper, modifier = Modifier.padding(bottom = 8.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf("both" to "Both", "read" to "Read", "mean" to "Mean").forEach { (value, label) ->
                Text(label, color = JedInk, modifier = Modifier.background(if (field == value) JedPressed else Color(0xFFDDDDDD)).clickable { field = value }.padding(8.dp))
            }
        }
        Text((if (common) "☑" else "☐") + " Common", color = JedPaper, modifier = Modifier.clickable { common = !common }.padding(vertical = 8.dp))
        Text("Allowed Characters", color = JedSecondary)
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(vertical = 8.dp)) {
            listOf("hira" to "あ", "kata" to "ア", "kanji" to "漢字", "latin" to "latin").forEach { (key, label) ->
                val on = when (key) {
                    "hira" -> chars.hira
                    "kata" -> chars.kata
                    "kanji" -> chars.kanji
                    else -> chars.latin
                }
                Text((if (on) "☑ " else "☐ ") + label, color = JedPaper, style = TextStyle(localeList = JedJapanese), modifier = Modifier.clickable {
                    chars = when (key) {
                        "hira" -> chars.copy(hira = !chars.hira)
                        "kata" -> chars.copy(kata = !chars.kata)
                        "kanji" -> chars.copy(kanji = !chars.kanji)
                        else -> chars.copy(latin = !chars.latin)
                    }
                }.padding(4.dp))
            }
        }
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            JedButton("Ok") {
                actions.persist(saved.copy(field = field, commonOnly = common, chars = chars))
                close()
            }
            JedButton("Cancel", close)
        }
    }
}

@Composable
internal fun AskEditor(ask: DictOverlay.Ask, close: () -> Unit) {
    var value by remember { mutableStateOf(ask.value) }
    Column {
        Text(ask.title, color = JedPaper)
        BasicTextField(
            value = value,
            onValueChange = { value = it },
            singleLine = true,
            textStyle = TextStyle(color = JedInk, fontSize = 18.sp, localeList = JedJapanese),
            cursorBrush = SolidColor(JedPressed),
            modifier = Modifier.fillMaxWidth().background(JedPaper).padding(8.dp),
        )
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 8.dp)) {
            JedButton("Ok") { close(); ask.onOk(value.trim()) }
            JedButton("Cancel", close)
        }
    }
}
