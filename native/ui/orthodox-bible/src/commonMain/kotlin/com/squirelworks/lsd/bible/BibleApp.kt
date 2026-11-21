package com.squirelworks.lsd.bible

import androidx.compose.foundation.background
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.squirelworks.lsd.core.languages.TextStore
import com.squirelworks.lsd.core.speech.SpeechOutcome
import com.squirelworks.lsd.core.suite.SuiteApp
import com.squirelworks.lsd.kana.EscapeBackEffect
import com.squirelworks.lsd.kana.PlatformBackHandler
import com.squirelworks.lsd.kana.SuiteSheet
import com.squirelworks.lsd.kana.openSuiteApp
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

internal sealed interface Page {
    data class Read(val book: String, val chapter: Int, val verse: Int = 0) : Page
    data class Books(val book: String) : Page
    data class Verse(val ref: String, val via: String?) : Page
    data object Search : Page
    data object Saved : Page
    data object Translations : Page
    data class Today(val iso: String?) : Page
    data object About : Page
}

internal class BibleUi(
    val bundle: BibleBundle,
    val library: BibleLibrary,
    val verses: Versification,
    val lectionary: Lectionary,
    val packs: PackStore,
    val settingsStore: TextStore,
    val contentStore: TextStore,
    val fetch: (String) -> String,
    val speak: (String, String) -> SpeechOutcome,
    val onCopy: (String) -> Unit,
    val onExport: (String, String) -> Unit,
    val onOpenUrl: (String) -> Unit,
    val scope: CoroutineScope,
    settingsState: androidx.compose.runtime.MutableState<BibleSettings>,
    catalogState: androidx.compose.runtime.MutableState<BibleCatalog>,
    installedState: androidx.compose.runtime.MutableState<Set<String>>,
    toastState: androidx.compose.runtime.MutableState<String>,
) {
    var settings by settingsState
    var catalog by catalogState
    var installed by installedState
    var toast by toastState
    val booksById = bundle.books.associateBy { it.id }

    fun bibleAvailable(entry: CatalogBible) = entry.url.isBlank() || packKey("bible", entry.id) in installed

    fun commentaryAvailable(entry: CatalogCommentary) = entry.url.isBlank() || packKey("commentary", entry.id) in installed

    fun save(next: BibleSettings) {
        val normalized = normalizeSettings(next, catalog) { id ->
            catalog.bibles.firstOrNull { it.id == id }?.let(::bibleAvailable) == true
        }
        settings = normalized
        writeBibleSettings(settingsStore, normalized)
    }

    fun setPrimary(id: String) {
        save(settings.copy(primary = id, parallel = settings.parallel.filter { it != id }))
    }

    fun toggleParallel(id: String, on: Boolean) {
        val next = if (on) settings.parallel + id else settings.parallel.filter { it != id }
        save(settings.copy(parallel = next.distinct()))
    }

    fun speakVerse(text: String, lang: String) {
        when (speak(text, lang)) {
            SpeechOutcome.Spoken -> Unit
            SpeechOutcome.Pending -> toast = "Voice is not ready yet"
            SpeechOutcome.Missing -> toast = "No ${langName(lang)} voice on this device"
        }
    }

    fun checkForTexts() {
        scope.launch {
            toast = "Checking…"
            val result = withContext(Dispatchers.Default) { runCatching { fetchPackRelease(fetch, nowMillis()) } }
            result.onSuccess { release ->
                val (next, count) = mergePackRelease(catalog, release)
                catalog = next
                writePackRelease(contentStore, release)
                toast = if (count == 0) "Up to date" else if (count == 1) "1 new text" else "$count new texts"
            }.onFailure { error ->
                toast = "Could not check: ${error.message}"
            }
        }
    }

    fun download(keys: List<String>, onDone: () -> Unit = {}) {
        scope.launch {
            try {
                for (key in keys) {
                    val kind = key.substringBefore(":")
                    val id = key.substringAfter(":")
                    val url: String
                    val releaseUrl: String
                    if (kind == "bible") {
                        val entry = catalog.bibles.first { it.id == id }
                        url = entry.url
                        releaseUrl = entry.releaseUrl
                    } else {
                        val entry = catalog.commentary.first { it.id == id }
                        url = entry.url
                        releaseUrl = entry.releaseUrl
                    }
                    val text = withContext(Dispatchers.Default) { downloadPackText(kind, url, releaseUrl, fetch) }
                    packs.write(packKey(kind, id), text)
                }
                installed = packs.keys()
                toast = "Downloaded"
                onDone()
            } catch (error: Exception) {
                toast = "Could not download: ${error.message}"
                onDone()
            }
        }
    }

    fun removeDownload(kind: String, id: String) {
        scope.launch {
            withContext(Dispatchers.Default) { packs.remove(packKey(kind, id)) }
            if (kind == "bible") library.forgetBible(id)
            installed = packs.keys()
            save(settings)
        }
    }
}

@Composable
fun BibleApp(
    bundle: BibleBundle,
    readBible: (String) -> String?,
    readCommentary: (String) -> String?,
    settingsStore: TextStore,
    contentStore: TextStore,
    packs: PackStore,
    speak: (String, String) -> SpeechOutcome = { _, _ -> SpeechOutcome.Missing },
    onCopy: (String) -> Unit = {},
    onExport: (String, String) -> Unit = { _, _ -> },
    fetch: (String) -> String = { throw PackFailure("No download address") },
    installedPackages: Set<String>? = null,
    onLaunchApp: (SuiteApp, String) -> Boolean = { _, _ -> false },
    onOpenUrl: (String) -> Unit = {},
    onStopSpeech: () -> Unit = {},
) {
    val scope = rememberCoroutineScope()
    val defaults = remember(bundle) { defaultSettings(bundle.catalog) }
    val settingsState = remember { mutableStateOf(readBibleSettings(settingsStore, defaults)) }
    val catalogState = remember {
        val cached = readPackRelease(contentStore)
        mutableStateOf(if (cached == null) bundle.catalog else mergePackRelease(bundle.catalog, cached).first)
    }
    val installedState = remember { mutableStateOf(packs.keys()) }
    val toastState = remember { mutableStateOf("") }
    val verses = remember(bundle) { Versification(bundle.versification) }
    val lectionary = remember(bundle) { Lectionary(bundle.lectionary) }
    val library = remember(bundle) { BibleLibrary(readBible, readCommentary, packs, verses) }
    val ui = remember(bundle) {
        BibleUi(
            bundle, library, verses, lectionary, packs, settingsStore, contentStore, fetch, speak, onCopy, onExport, onOpenUrl, scope,
            settingsState, catalogState, installedState, toastState,
        )
    }
    val start = ui.settings.last
    var stack by remember { mutableStateOf(listOf<Page>(Page.Read(start.book, start.chapter))) }
    var suiteOpen by remember { mutableStateOf(false) }
    var suiteNotice by remember { mutableStateOf("") }
    val page = stack.last()
    fun push(next: Page) {
        onStopSpeech()
        stack = stack + next
    }
    fun back() {
        onStopSpeech()
        if (stack.size > 1) stack = stack.dropLast(1)
    }
    val backEnabled = suiteOpen || stack.size > 1
    fun performBack() {
        if (suiteOpen) {
            suiteOpen = false
            suiteNotice = ""
        } else {
            back()
        }
    }
    PlatformBackHandler(backEnabled, ::performBack)
    EscapeBackEffect(backEnabled, ::performBack)
    LaunchedEffect(ui.toast) {
        if (ui.toast.isNotBlank() && ui.toast != "Checking…") {
            delay(2200)
            ui.toast = ""
        }
    }
    val dark = when (ui.settings.theme) {
        "dark" -> true
        "light" -> false
        else -> isSystemInDarkTheme()
    }
    val palette = if (dark) darkBiblePalette else lightBiblePalette
    MaterialTheme(colorScheme = bibleColors(dark)) {
        CompositionLocalProvider(LocalBiblePalette provides palette) {
            BoxWithConstraints(Modifier.fillMaxSize().background(palette.bg)) {
                val expanded = maxWidth >= 840.dp
                val wideText = maxWidth >= 700.dp
                Column(Modifier.fillMaxSize()) {
                    val read = page as? Page.Read
                    BibleTopBar(
                        title = titleOf(page, ui),
                        subtitle = subtitleOf(page, ui),
                        canBack = stack.size > 1,
                        titleOpensBooks = read != null && !expanded,
                        onBack = ::back,
                        onTitle = { if (read != null) push(Page.Books(read.book)) },
                        onApps = { suiteOpen = true },
                        readerActions = if (read != null) {
                            {
                                Action("📅", "Today's readings") { push(Page.Today(null)) }
                                Action("🌐", "Translations") { push(Page.Translations) }
                                Action("⌕", "Search") { push(Page.Search) }
                                Action("★", "Bookmarks and notes") { push(Page.Saved) }
                            }
                        } else {
                            null
                        },
                    )
                    Row(Modifier.weight(1f).imePadding()) {
                        if (expanded && read != null) {
                            Box(Modifier.width(300.dp).background(palette.paper)) {
                                BooksBody(ui, read.book, embedded = true) { book, chapter ->
                                    stack = listOf(Page.Read(book, chapter))
                                }
                            }
                        }
                        Box(Modifier.weight(1f)) {
                            when (val current = page) {
                                is Page.Read -> ReaderBody(
                                    ui, current, wideText,
                                    onVerse = { ref, via -> push(Page.Verse(ref, via)) },
                                    onChapter = { book, chapter -> stack = listOf(Page.Read(book, chapter)) },
                                    onTranslations = { push(Page.Translations) },
                                )
                                is Page.Books -> BooksBody(ui, current.book, embedded = false) { book, chapter ->
                                    stack = listOf(Page.Read(book, chapter))
                                }
                                is Page.Verse -> VerseBody(ui, current) { book, chapter, verse ->
                                    stack = listOf(Page.Read(book, chapter, verse))
                                }
                                Page.Search -> SearchBody(ui) { book, chapter, verse, primary ->
                                    if (primary != null && primary != ui.settings.primary) ui.setPrimary(primary)
                                    stack = listOf(Page.Read(book, chapter, verse))
                                }
                                Page.Saved -> SavedBody(ui) { ref -> push(Page.Verse(ref, null)) }
                                Page.Translations -> TranslationsBody(ui) { push(Page.About) }
                                is Page.Today -> TodayBody(
                                    ui, current,
                                    onReplace = { next -> stack = stack.dropLast(1) + next },
                                    onRead = { book, chapter, verse -> push(Page.Read(book, chapter, verse)) },
                                )
                                Page.About -> AboutBody(ui)
                            }
                        }
                    }
                }
                if (suiteOpen && bundle.suite != null) {
                    SuiteSheet(
                        file = bundle.suite,
                        selfId = "orthodox-bible",
                        installed = installedPackages,
                        notice = suiteNotice,
                        onOpen = { app ->
                            suiteNotice = openSuiteApp(app, installedPackages, { chosen -> onLaunchApp(chosen, "") }, onOpenUrl)
                        },
                        onUrl = onOpenUrl,
                        onClose = { suiteOpen = false; suiteNotice = "" },
                    )
                }
                Box(Modifier.align(Alignment.BottomCenter).padding(16.dp)) {
                    BibleToast(ui.toast)
                }
            }
        }
    }
}

@Composable
private fun Action(label: String, description: String, onClick: () -> Unit) {
    androidx.compose.material3.TextButton(
        onClick = onClick,
        contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 4.dp),
    ) {
        Text(label, color = androidx.compose.ui.graphics.Color.White)
    }
}

private fun titleOf(page: Page, ui: BibleUi): String = when (page) {
    is Page.Read -> {
        val name = ui.booksById[page.book]?.en ?: page.book
        "$name ${page.chapter}"
    }
    is Page.Books -> "Books"
    is Page.Verse -> refLabel(page.ref, ui.booksById)
    Page.Search -> "Search"
    Page.Saved -> "Bookmarks & notes"
    Page.Translations -> "Translations & settings"
    is Page.Today -> "Today"
    Page.About -> "About & sources"
}

private fun subtitleOf(page: Page, ui: BibleUi): String = when (page) {
    is Page.Books -> ui.catalog.bibles.firstOrNull { it.id == ui.settings.primary }?.name.orEmpty()
    is Page.Today -> if (ui.settings.calendar == "old") "Old calendar" else "New calendar"
    is Page.Verse -> ui.catalog.bibles.firstOrNull { it.id == (page.via ?: ui.settings.primary) }?.name.orEmpty()
    else -> ""
}
