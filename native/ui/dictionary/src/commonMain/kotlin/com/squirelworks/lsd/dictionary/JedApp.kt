package com.squirelworks.lsd.dictionary

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.dp
import com.squirelworks.lsd.core.languages.TextStore
import com.squirelworks.lsd.core.speech.SpeechOutcome
import com.squirelworks.lsd.core.suite.DictionaryLookup
import com.squirelworks.lsd.core.suite.KanaBack
import com.squirelworks.lsd.core.suite.SuiteApp
import com.squirelworks.lsd.core.suite.dictionaryLookup
import kotlinx.coroutines.delay

@Composable
fun EnglishDictionaryApp(
    index: JedIndex,
    store: TextStore,
    speak: (String) -> SpeechOutcome,
    onStopAudio: () -> Unit,
    onCopy: (String) -> Boolean,
    onExport: (String, String) -> String,
    apps: List<SuiteApp>,
    installed: Set<String>?,
    onLaunchApp: (SuiteApp, String) -> Boolean,
    onOpenUrl: (String) -> Unit,
    onBackState: (Boolean, () -> Unit) -> Unit,
    suiteSheet: @Composable (String, (SuiteApp) -> Unit, () -> Unit) -> Unit,
    initialQuery: String? = null,
) {
    val density = LocalDensity.current
    var saved by remember { mutableStateOf(readDictionaryState(store)) }
    var stack by remember { mutableStateOf(listOf<DictScreen>(DictScreen.Search(DictScope.All, initialQuery?.trim().orEmpty()))) }
    var overlays by remember { mutableStateOf(listOf<DictOverlay>()) }
    var sheet by remember { mutableStateOf(false) }
    var suiteNotice by remember { mutableStateOf("") }
    var toast by remember { mutableStateOf("") }
    var toastTick by remember { mutableIntStateOf(0) }
    var radicalReset by remember { mutableIntStateOf(0) }
    fun persist(next: JedSaved) {
        saved = next
        writeDictionaryState(store, next)
    }
    fun showToast(message: String) {
        if (message.isBlank()) return
        toast = message
        toastTick++
    }
    fun open(screen: DictScreen) {
        stack = stack + screen
    }
    fun replaceTop(screen: DictScreen) {
        stack = stack.dropLast(1) + screen
    }
    fun searchAll(query: String) {
        onStopAudio()
        sheet = false
        overlays = emptyList()
        stack = listOf(DictScreen.Search(DictScope.All, query))
    }
    fun setQuery(query: String) {
        when (val top = stack.last()) {
            is DictScreen.Search -> replaceTop(top.copy(query = query))
            is DictScreen.KanjiList -> replaceTop(top.copy(query = query))
            else -> searchAll(query)
        }
    }
    fun performBack() {
        when (dictionaryBack(sheet, overlays.size, stack.size)) {
            KanaBack.CloseSheet -> {
                sheet = false
                suiteNotice = ""
            }
            KanaBack.CloseDialog -> overlays = overlays.dropLast(1)
            KanaBack.PreviousScreen -> {
                onStopAudio()
                stack = stack.dropLast(1)
            }
            KanaBack.Exit -> Unit
        }
    }
    fun lookup(id: String, query: String) {
        val app = apps.firstOrNull { it.id == id } ?: return
        fun follow(step: DictionaryLookup) {
            val browse = step as? DictionaryLookup.Browse ?: return
            if (browse.url.isNotBlank()) onOpenUrl(browse.url)
            if (browse.notice.isNotBlank()) showToast(browse.notice)
        }
        when (val step = dictionaryLookup(app, installed)) {
            DictionaryLookup.None -> Unit
            DictionaryLookup.Launch -> if (!onLaunchApp(app, query)) follow(dictionaryLookup(app, emptySet()))
            is DictionaryLookup.Browse -> follow(step)
        }
    }
    val actions = PageActions(
        open = ::open,
        searchAll = ::searchAll,
        speak = { text -> if (text.isNotBlank() && speak(text) == SpeechOutcome.Missing) showToast(JAPANESE_VOICE_NOTICE) },
        copy = { text -> showToast(if (onCopy(text)) "Copied to clipboard" else "Copy failed") },
        lookup = ::lookup,
        menu = { overlays = overlays + it },
        persist = ::persist,
        back = ::performBack,
        export = { name, csv ->
            val message = onExport(name, csv)
            if (message.isNotBlank()) showToast(message)
            message
        },
        rememberEntry = rememberEntry@{ pos ->
            val row = index.rows.getOrNull(pos) ?: return@rememberEntry
            val shot = snapshot(row, index.body(pos))
            persist(saved.copy(history = listOf(shot) + saved.history.filterNot { it.id == shot.id }.take(199)))
        },
        clearHistory = { persist(saved.copy(history = emptyList())) },
        toast = ::showToast,
    )
    SideEffect { onBackState(dictionaryBack(sheet, overlays.size, stack.size) != KanaBack.Exit, ::performBack) }
    LaunchedEffect(initialQuery) {
        val query = initialQuery?.trim().orEmpty()
        if (query.isNotEmpty()) stack = listOf(DictScreen.Search(DictScope.All, query))
    }
    LaunchedEffect(toastTick) {
        if (toast.isEmpty()) return@LaunchedEffect
        delay(2000)
        toast = ""
    }
    val scale = saved.textScale.toFloat().coerceIn(0.8f, 1.6f)
    CompositionLocalProvider(LocalDensity provides Density(density.density, density.fontScale * scale)) {
        Box(Modifier.fillMaxSize().background(Color.Black).windowInsetsPadding(WindowInsets.safeDrawing).imePadding()) {
            BoxWithConstraints(Modifier.fillMaxSize()) {
                val top = stack.last()
                val split = maxWidth >= 600.dp && stack.size > 1 && (top is DictScreen.Details || top is DictScreen.KanjiPage)
                val rootQuery = (stack.firstOrNull() as? DictScreen.Search)?.query.orEmpty()
                if (split) {
                    Row(Modifier.fillMaxSize()) {
                        Box(Modifier.width(420.dp).fillMaxSize()) {
                            Page(stack[stack.lastIndex - 1], index, saved, actions, radicalReset, false, rootQuery, ::setQuery, ::replaceTop, { radicalReset++ }, { sheet = true }, chrome = false)
                        }
                        Box(Modifier.weight(1f).fillMaxSize()) {
                            Page(top, index, saved, actions, radicalReset, false, rootQuery, ::setQuery, ::replaceTop, { radicalReset++ }, { sheet = true }, chrome = true)
                        }
                    }
                } else {
                    Page(top, index, saved, actions, radicalReset, stack.size == 1, rootQuery, ::setQuery, ::replaceTop, { radicalReset++ }, { sheet = true })
                }
            }
            overlays.lastOrNull()?.let { overlay ->
                Box(Modifier.fillMaxSize().background(Color(0xAA000000)).clickable { overlays = overlays.dropLast(1) }) {
                    Column(
                        Modifier.align(Alignment.Center).padding(24.dp).background(Color(0xFF2A2A2A)).padding(16.dp).clickable {},
                        verticalArrangement = Arrangement.spacedBy(8.dp),
                    ) {
                        when (overlay) {
                            DictOverlay.Notepad -> NotepadEditor(saved, actions) { overlays = overlays.dropLast(1) }
                            DictOverlay.Options -> OptionsEditor(saved, actions) { overlays = overlays.dropLast(1) }
                            is DictOverlay.Items -> {
                                if (overlay.title.isNotEmpty()) Text(overlay.title, color = JedPaper)
                                overlay.items.forEach { (label, action) ->
                                    Text(label, color = JedPaper, modifier = Modifier.clickable {
                                        overlays = overlays.dropLast(1)
                                        action()
                                    }.padding(vertical = 8.dp))
                                }
                            }
                            is DictOverlay.Ask -> AskEditor(overlay) { overlays = overlays.dropLast(1) }
                            is DictOverlay.Confirm -> {
                                Text("Are you sure?", color = JedPaper)
                                Text(overlay.text, color = JedSecondary)
                                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    JedButton("Yes") {
                                        overlays = overlays.dropLast(1)
                                        overlay.onYes()
                                        overlay.yesToast?.let(::showToast)
                                    }
                                    JedButton("No") { overlays = overlays.dropLast(1) }
                                }
                            }
                        }
                    }
                }
            }
            if (sheet) {
                suiteSheet(suiteNotice, { app ->
                    sheet = false
                    lookup(app.id, "")
                }, {
                    sheet = false
                    suiteNotice = ""
                })
            }
            if (toast.isNotEmpty()) {
                Text(toast, color = JedPaper, modifier = Modifier.align(Alignment.BottomCenter).padding(16.dp).background(Color(0xFF333333)).padding(horizontal = 16.dp, vertical = 10.dp))
            }
        }
    }
}

@Composable
private fun Page(
    screen: DictScreen,
    index: JedIndex,
    saved: JedSaved,
    actions: PageActions,
    radicalReset: Int,
    atRoot: Boolean,
    rootQuery: String,
    setQuery: (String) -> Unit,
    replace: (DictScreen) -> Unit,
    resetRadicals: () -> Unit,
    openSuite: () -> Unit,
    chrome: Boolean = true,
) {
    val hint = when (screen) {
        is DictScreen.Search -> scopeHint(screen.scope)
        DictScreen.Menu -> "Menu"
        DictScreen.Categories -> "Categories"
        is DictScreen.Details -> "Entry"
        is DictScreen.KanjiList -> "Search kanji"
        is DictScreen.KanjiPage -> "Kanji"
        is DictScreen.Radicals -> "Search radicals"
        is DictScreen.KanaChart -> if (screen.katakana) "Katakana" else "Hiragana"
        is DictScreen.Tags -> if (screen.assignId == null) "Tags" else "Tag"
        DictScreen.Settings -> "Settings"
        DictScreen.About -> "About"
    }
    val query = when (screen) {
        is DictScreen.Search -> screen.query
        is DictScreen.KanjiList -> screen.query
        else -> ""
    }
    val live = screen is DictScreen.Search || screen is DictScreen.KanjiList
    var draft by remember(screen) { mutableStateOf(query) }
    Column(Modifier.fillMaxSize()) {
        if (chrome) {
        TitleBar(
            hint = hint,
            query = if (live) query else draft,
            editable = true,
            atRoot = atRoot,
            right = when (screen) {
                is DictScreen.Search -> "Options"
                is DictScreen.Details -> "Tag"
                is DictScreen.Radicals -> "Reset"
                is DictScreen.KanaChart -> "Switch"
                else -> null
            },
            onLeft = { if (atRoot) actions.open(DictScreen.Menu) else actions.back() },
            onRight = {
                when (screen) {
                    is DictScreen.Search -> actions.menu(DictOverlay.Options)
                    is DictScreen.Details -> actions.open(DictScreen.Tags(index.rows.getOrNull(screen.pos)?.id))
                    is DictScreen.Radicals -> resetRadicals()
                    is DictScreen.KanaChart -> replace(DictScreen.KanaChart(!screen.katakana))
                    else -> Unit
                }
            },
            onQuery = { if (live) setQuery(it) else draft = it },
            onSubmit = { submitted -> if (live) setQuery(submitted) else actions.searchAll(submitted) },
        )
        }
        Box(Modifier.weight(1f)) {
            when (screen) {
                is DictScreen.Search -> SearchPage(screen, index, saved, actions)
                DictScreen.Menu -> MenuPage(index, saved, rootQuery, actions, openSuite)
                DictScreen.Categories -> CategoriesPage(index, actions)
                is DictScreen.Details -> DetailsPage(screen, index, saved, actions)
                is DictScreen.KanjiList -> KanjiListPage(screen, index, saved, actions)
                is DictScreen.KanjiPage -> KanjiDetailPage(screen, index, saved, actions)
                is DictScreen.Radicals -> RadicalsPage(screen, index, radicalReset, actions)
                is DictScreen.KanaChart -> KanaChartPage(screen.katakana, actions)
                is DictScreen.Tags -> TagsPage(screen, index, saved, actions)
                DictScreen.Settings -> SettingsPage(saved, actions)
                DictScreen.About -> AboutPage(index)
            }
        }
        if (chrome && (screen is DictScreen.Search || screen is DictScreen.Details || screen is DictScreen.KanjiList || screen is DictScreen.KanjiPage)) {
            Text("Notepad", color = JedPaper, modifier = Modifier.fillMaxWidth().background(Color(0xFF1A1A1A)).clickable {
                actions.menu(DictOverlay.Notepad)
            }.padding(10.dp))
        }
    }
}
