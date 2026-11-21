package com.squirelworks.lsd.phrasebook

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.lightColorScheme
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
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.squirelworks.lsd.core.languages.TextStore
import com.squirelworks.lsd.core.speech.SpeechOutcome
import com.squirelworks.lsd.core.speech.VoiceStatus
import com.squirelworks.lsd.core.suite.KanaBack
import com.squirelworks.lsd.core.suite.SuiteApp
import com.squirelworks.lsd.core.suite.kanaBack
import com.squirelworks.lsd.kana.EscapeBackEffect
import com.squirelworks.lsd.kana.PlatformBackHandler
import com.squirelworks.lsd.kana.SuiteSheet
import com.squirelworks.lsd.kana.accentArgb
import com.squirelworks.lsd.kana.missingVoiceNotice
import com.squirelworks.lsd.kana.openSuiteApp
import kotlin.random.Random
import kotlinx.coroutines.delay

private val Bg = Color(0xFFF7F5F1)
private val Paper = Color(0xFFFFFFFF)
private val Ink = Color(0xFF1A1A1A)
private val Muted = Color(0xFF5C5C5C)
private val Line = Color(0xFFD9D4CB)
private val AccentSoft = Color(0xFFF7E9E7)
private val Good = Color(0xFF1B7A3D)
private val Bad = Color(0xFFB3261E)
private val Star = Color(0xFFC98A00)
private val Shape = RoundedCornerShape(10.dp)

private sealed interface Screen {
    data object Home : Screen
    data class Pack(val id: String) : Screen
    data class Category(val packId: String, val catId: String) : Screen
    data object Favorites : Screen
    data class Flash(val deck: FlashDeck) : Screen
    data object Settings : Screen
}

@Composable
fun PhrasebookApp(
    bundle: PhrasebookBundle,
    progressStore: TextStore? = null,
    playClip: (String, Float) -> Unit = { _, _ -> },
    speak: (String, Float, String) -> SpeechOutcome = { _, _, _ -> SpeechOutcome.Pending },
    voiceStatus: () -> VoiceStatus = { VoiceStatus.Pending },
    onStopAudio: () -> Unit = {},
    onExport: (String, (String) -> Unit) -> Unit = { _, _ -> },
    initialQuery: String? = null,
    queryGeneration: Int = 0,
    installedPackages: Set<String>? = null,
    onLaunchApp: (SuiteApp, String) -> Boolean = { _, _ -> false },
    onOpenUrl: (String) -> Unit = {},
) {
    val accent = accentArgb(bundle.accent)?.let { Color(it) } ?: Color(0xFF8F2D2D)
    var stack by remember { mutableStateOf(listOf<Screen>(Screen.Home)) }
    var progress by remember { mutableStateOf(readPhrasebookProgress(progressStore)) }
    var query by remember { mutableStateOf("") }
    var showSuite by remember { mutableStateOf(false) }
    var suiteNotice by remember { mutableStateOf("") }
    var resetOpen by remember { mutableStateOf(false) }
    var toastText by remember { mutableStateOf("") }
    var toastTick by remember { mutableIntStateOf(0) }
    var navId by remember { mutableIntStateOf(0) }
    val scroll = rememberScrollState()
    fun showToast(message: String) {
        if (message.isBlank()) return
        toastText = message
        toastTick++
    }
    fun save(next: PhrasebookProgress) {
        progress = next
        writePhrasebookProgress(progressStore, next)
    }
    fun open(next: Screen) {
        stack = stack + next
        navId++
    }
    fun back() {
        if (stack.size <= 1) return
        onStopAudio()
        stack = stack.dropLast(1)
        navId++
    }
    val dialogOpen = resetOpen
    val backEnabled = showSuite || dialogOpen || stack.size > 1
    fun performBack() {
        when (kanaBack(showSuite, dialogOpen, stack.size)) {
            KanaBack.CloseSheet -> {
                showSuite = false
                suiteNotice = ""
            }
            KanaBack.CloseDialog -> resetOpen = false
            KanaBack.PreviousScreen -> back()
            KanaBack.Exit -> Unit
        }
    }
    PlatformBackHandler(backEnabled, ::performBack)
    EscapeBackEffect(backEnabled, ::performBack)
    LaunchedEffect(navId) { scroll.scrollTo(0) }
    LaunchedEffect(queryGeneration) {
        val incoming = initialQuery?.trim().orEmpty()
        if (queryGeneration == 0 || incoming.isEmpty()) return@LaunchedEffect
        query = incoming
        stack = listOf(Screen.Home)
        showSuite = false
        resetOpen = false
        navId++
    }
    fun play(phrase: Phrase, slow: Boolean) {
        onStopAudio()
        val rate = playbackRate(nearestRate(progress.rate), slow)
        val clip = if (progress.recorded) phrase.clip else ""
        if (clip.isNotEmpty()) {
            playClip("clips/$clip", rate)
        } else if (speak(spokenForVoice(phrase.spoken), rate, "ja-JP") == SpeechOutcome.Missing) {
            showToast(missingVoiceNotice("Japanese"))
        }
    }
    fun toggleFav(key: String) {
        val next = if (key in progress.favorites) progress.favorites.filter { it != key } else progress.favorites + key
        save(progress.copy(favorites = next))
    }
    fun startFlash(title: String, items: List<Phrase>) {
        if (items.isEmpty()) {
            showToast("No phrases to study.")
            return
        }
        open(Screen.Flash(FlashDeck(title, items.map { it.key }.shuffled(), items.size, 0, false)))
    }
    val screen = stack.last()
    MaterialTheme(colorScheme = lightColorScheme(primary = accent, background = Bg, surface = Paper, onSurface = Ink)) {
        Box(Modifier.fillMaxSize().background(Bg)) {
            Column(Modifier.fillMaxSize().windowInsetsPadding(WindowInsets.safeDrawing)) {
                TopBar(
                    title = barTitle(screen, bundle),
                    subtitle = barSubtitle(screen, bundle, progress),
                    showBack = stack.size > 1,
                    onBack = ::back,
                    onSuite = { showSuite = true },
                    onSettings = { if (screen !is Screen.Settings) open(Screen.Settings) },
                )
                BoxWithConstraints(Modifier.weight(1f).fillMaxWidth()) {
                    val columns = ((maxWidth.coerceAtMost(760.dp) - 32.dp) / 232.dp).toInt().coerceAtLeast(1)
                    Column(
                        Modifier
                            .widthIn(max = 760.dp)
                            .fillMaxWidth()
                            .align(Alignment.TopCenter)
                            .verticalScroll(scroll)
                            .padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp),
                    ) {
                        when (screen) {
                            Screen.Home -> HomePage(
                                bundle, progress, query, columns,
                                onQuery = { query = it },
                                onPack = { open(Screen.Pack(it)) },
                                onPlay = { play(it, false) },
                                onSlow = { play(it, true) },
                                onFav = ::toggleFav,
                                onFavorites = { open(Screen.Favorites) },
                                onFlashAll = { startFlash("All packs", bundle.phrases) },
                            )
                            is Screen.Pack -> {
                                val pack = bundle.packs.firstOrNull { it.id == screen.id }
                                if (pack != null) PackPage(pack, progress, { startFlash(pack.title, pack.phrases) }) {
                                    open(Screen.Category(pack.id, it))
                                }
                            }
                            is Screen.Category -> {
                                val cat = bundle.packs.firstOrNull { it.id == screen.packId }?.categories?.firstOrNull { it.id == screen.catId }
                                if (cat != null) CategoryPage(
                                    cat, progress,
                                    onFlash = { startFlash(cat.title, cat.phrases) },
                                    onPlay = { play(it, false) },
                                    onSlow = { play(it, true) },
                                    onFav = ::toggleFav,
                                )
                            }
                            Screen.Favorites -> FavoritesPage(
                                bundle, progress,
                                onFlash = {
                                    val items = progress.favorites.mapNotNull { bundle.byKey[it] }
                                    startFlash("Favorites", items)
                                },
                                onPlay = { play(it, false) },
                                onSlow = { play(it, true) },
                                onFav = ::toggleFav,
                            )
                            is Screen.Flash -> FlashPage(
                                screen.deck, bundle, progress,
                                onPlay = { play(it, false) },
                                onSlow = { play(it, true) },
                                onReveal = { replace -> stack = stack.dropLast(1) + Screen.Flash(replace) },
                                onGrade = { next, learnedKey ->
                                    if (learnedKey != null) {
                                        save(progress.copy(learned = progress.learned + (learnedKey to System.currentTimeMillis())))
                                    }
                                    stack = stack.dropLast(1) + Screen.Flash(next)
                                },
                                onDone = ::back,
                            )
                            Screen.Settings -> SettingsPage(
                                progress, bundle, voiceStatus,
                                onChange = ::save,
                                onTest = { bundle.phrases.firstOrNull()?.let { play(it, false) } },
                                onExport = { onExport(ankiCsv(bundle.phrases), ::showToast) },
                                onReset = { resetOpen = true },
                            )
                        }
                    }
                }
            }
            if (toastText.isNotBlank()) {
                LaunchedEffect(toastTick) {
                    delay(2_600)
                    toastText = ""
                }
                Text(
                    toastText,
                    color = Color.White,
                    textAlign = TextAlign.Center,
                    modifier = Modifier
                        .align(Alignment.BottomCenter)
                        .windowInsetsPadding(WindowInsets.safeDrawing)
                        .padding(16.dp)
                        .background(Color(0xFF222222), RoundedCornerShape(8.dp))
                        .padding(horizontal = 16.dp, vertical = 12.dp),
                )
            }
            if (showSuite && bundle.suite != null) {
                SuiteSheet(
                    file = bundle.suite,
                    selfId = "phrasebook",
                    installed = installedPackages,
                    notice = suiteNotice,
                    onOpen = { app ->
                        showSuite = false
                        suiteNotice = openSuiteApp(app, installedPackages, { chosen -> onLaunchApp(chosen, "") }, onOpenUrl)
                        if (suiteNotice.isNotBlank()) showSuite = true
                    },
                    onUrl = onOpenUrl,
                    onClose = {
                        showSuite = false
                        suiteNotice = ""
                    },
                )
            }
            if (resetOpen) {
                AlertDialog(
                    onDismissRequest = { resetOpen = false },
                    title = { Text("Clear all learned progress? Favorites are kept.") },
                    confirmButton = {
                        TextButton(onClick = {
                            save(progress.copy(learned = emptyMap()))
                            resetOpen = false
                            showToast("Progress cleared.")
                        }) { Text("Clear") }
                    },
                    dismissButton = { TextButton(onClick = { resetOpen = false }) { Text("Cancel") } },
                )
            }
        }
    }
}

private fun barTitle(screen: Screen, bundle: PhrasebookBundle): String = when (screen) {
    Screen.Home -> "SquirrelGo Phrasebook"
    is Screen.Pack -> bundle.packs.firstOrNull { it.id == screen.id }?.title ?: "SquirrelGo Phrasebook"
    is Screen.Category -> bundle.packs.firstOrNull { it.id == screen.packId }?.categories?.firstOrNull { it.id == screen.catId }?.title
        ?: "SquirrelGo Phrasebook"
    Screen.Favorites -> "Favorites"
    is Screen.Flash -> screen.deck.title
    Screen.Settings -> "Settings"
}

private fun barSubtitle(screen: Screen, bundle: PhrasebookBundle, progress: PhrasebookProgress): String = when (screen) {
    Screen.Home -> "Japanese · 日本語"
    is Screen.Pack -> {
        val pack = bundle.packs.firstOrNull { it.id == screen.id }
        if (pack == null) "" else "${pack.jaTitle} · ${pack.phrases.size} phrases"
    }
    is Screen.Category -> bundle.packs.firstOrNull { it.id == screen.packId }?.title.orEmpty()
    Screen.Favorites -> {
        val saved = progress.favorites.mapNotNull { bundle.byKey[it] }
        "${saved.size} saved"
    }
    is Screen.Flash -> if (screen.deck.queue.isEmpty()) "Flashcards" else "${screen.deck.done}/${screen.deck.total} done"
    Screen.Settings -> ""
}

@Composable
private fun TopBar(
    title: String,
    subtitle: String,
    showBack: Boolean,
    onBack: () -> Unit,
    onSuite: () -> Unit,
    onSettings: () -> Unit,
) {
    Row(
        Modifier.fillMaxWidth().background(MaterialTheme.colorScheme.primary).padding(horizontal = 12.dp, vertical = 8.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        if (showBack) {
            BarButton("‹", "Back", onBack)
        }
        Column(Modifier.weight(1f)) {
            Text(title, color = Color.White, fontWeight = FontWeight.SemiBold, fontSize = 18.sp)
            if (subtitle.isNotBlank()) Text(subtitle, color = Color.White.copy(alpha = 0.85f), fontSize = 12.sp)
        }
        BarButton("▦", "SquirrelGo apps", onSuite)
        BarButton("⚙", "Settings", onSettings)
    }
}

@Composable
private fun BarButton(label: String, description: String, onClick: () -> Unit) {
    Box(
        Modifier
            .size(40.dp)
            .border(1.dp, Color.White.copy(alpha = 0.4f), RoundedCornerShape(8.dp))
            .clip(RoundedCornerShape(8.dp))
            .clickable(onClick = onClick)
            .semantics { contentDescription = description },
        contentAlignment = Alignment.Center,
    ) {
        Text(label, color = Color.White, fontSize = 20.sp)
    }
}

@Composable
private fun HomePage(
    bundle: PhrasebookBundle,
    progress: PhrasebookProgress,
    query: String,
    columns: Int,
    onQuery: (String) -> Unit,
    onPack: (String) -> Unit,
    onPlay: (Phrase) -> Unit,
    onSlow: (Phrase) -> Unit,
    onFav: (String) -> Unit,
    onFavorites: () -> Unit,
    onFlashAll: () -> Unit,
) {
    androidx.compose.material3.OutlinedTextField(
        value = query,
        onValueChange = onQuery,
        modifier = Modifier.fillMaxWidth(),
        singleLine = true,
        placeholder = { Text("Search English, romaji, kana or kanji") },
    )
    val q = query.trim()
    if (q.isNotEmpty()) {
        val hits = searchPhrases(bundle.phrases, query)
        if (hits.isEmpty()) {
            Text(emptySearchText(query), color = Muted, modifier = Modifier.fillMaxWidth().padding(vertical = 24.dp), textAlign = TextAlign.Center)
        } else {
            Text(matchCountText(hits.size), color = Muted, fontSize = 14.sp)
            hits.take(PHRASE_SEARCH_LIMIT).forEach { phrase ->
                PhraseRow(phrase, showPack = true, progress = progress, onPlay = { onPlay(phrase) }, onSlow = { onSlow(phrase) }, onFav = { onFav(phrase.key) })
            }
        }
    } else {
        bundle.packs.chunked(columns).forEach { row ->
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp), modifier = Modifier.fillMaxWidth()) {
                row.forEach { pack ->
                    PackCard(pack, progress, Modifier.weight(1f), onClick = { onPack(pack.id) })
                }
                repeat(columns - row.size) { Spacer(Modifier.weight(1f)) }
            }
        }
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            ActionButton("★ Favorites (${progress.favorites.size})", onFavorites)
            ActionButton("Flashcards: all packs", onFlashAll)
        }
    }
}

@Composable
private fun PackCard(pack: PhrasePack, progress: PhrasebookProgress, modifier: Modifier, onClick: () -> Unit) {
    val learned = learnedCount(pack.phrases, progress.learned)
    val pct = learnedPercent(learned, pack.phrases.size)
    Column(
        modifier
            .clip(Shape)
            .background(Paper)
            .border(1.dp, Line, Shape)
            .clickable(onClick = onClick)
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(4.dp),
    ) {
        Text(pack.jaTitle, color = MaterialTheme.colorScheme.primary, fontSize = 24.sp)
        Text(pack.title, fontWeight = FontWeight.Bold, fontSize = 17.sp, color = Ink)
        Text(pack.desc, color = Muted, fontSize = 13.sp)
        Text("${pack.phrases.size} phrases · $pct% learned", color = Muted, fontSize = 12.sp)
        Meter(pct / 100f)
    }
}

@Composable
private fun Meter(fraction: Float) {
    Box(Modifier.fillMaxWidth().height(4.dp).clip(RoundedCornerShape(2.dp)).background(AccentSoft)) {
        Box(Modifier.fillMaxWidth(fraction.coerceIn(0f, 1f)).fillMaxHeight().background(MaterialTheme.colorScheme.primary))
    }
}

@Composable
private fun PackPage(pack: PhrasePack, progress: PhrasebookProgress, onFlash: () -> Unit, onCategory: (String) -> Unit) {
    Text(pack.desc, color = Muted)
    PrimaryButton("Flashcards", onFlash)
    pack.categories.forEach { cat ->
        Row(
            Modifier
                .fillMaxWidth()
                .clip(Shape)
                .background(Paper)
                .border(1.dp, Line, Shape)
                .clickable { onCategory(cat.id) }
                .padding(horizontal = 16.dp, vertical = 14.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(cat.title, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f), color = Ink)
            Text("${learnedCount(cat.phrases, progress.learned)}/${cat.phrases.size}", color = Muted)
        }
    }
}

@Composable
private fun CategoryPage(
    cat: PhraseCategory,
    progress: PhrasebookProgress,
    onFlash: () -> Unit,
    onPlay: (Phrase) -> Unit,
    onSlow: (Phrase) -> Unit,
    onFav: (String) -> Unit,
) {
    PrimaryButton("Flashcards", onFlash)
    cat.phrases.forEach { phrase ->
        PhraseRow(phrase, showPack = false, progress = progress, onPlay = { onPlay(phrase) }, onSlow = { onSlow(phrase) }, onFav = { onFav(phrase.key) })
    }
}

@Composable
private fun FavoritesPage(
    bundle: PhrasebookBundle,
    progress: PhrasebookProgress,
    onFlash: () -> Unit,
    onPlay: (Phrase) -> Unit,
    onSlow: (Phrase) -> Unit,
    onFav: (String) -> Unit,
) {
    val items = progress.favorites.mapNotNull { bundle.byKey[it] }
    if (items.isEmpty()) {
        Text("Tap ☆ on any phrase to save it here.", color = Muted, modifier = Modifier.fillMaxWidth().padding(vertical = 24.dp), textAlign = TextAlign.Center)
    } else {
        PrimaryButton("Flashcards", onFlash)
        items.forEach { phrase ->
            PhraseRow(phrase, showPack = true, progress = progress, onPlay = { onPlay(phrase) }, onSlow = { onSlow(phrase) }, onFav = { onFav(phrase.key) })
        }
    }
}

@Composable
private fun PhraseRow(
    phrase: Phrase,
    showPack: Boolean,
    progress: PhrasebookProgress,
    onPlay: () -> Unit,
    onSlow: () -> Unit,
    onFav: () -> Unit,
) {
    val showReading = progress.showKana && (phrase.reading != phrase.ja || !progress.showKanji)
    val fav = phrase.key in progress.favorites
    Row(
        Modifier.fillMaxWidth().clip(Shape).background(Paper).border(1.dp, Line, Shape).padding(12.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(2.dp)) {
            if (showPack) {
                Text(
                    "${phrase.packTitle} · ${phrase.category}",
                    color = MaterialTheme.colorScheme.primary,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.SemiBold,
                    letterSpacing = 0.4.sp,
                )
            }
            Text(phrase.en, fontWeight = FontWeight.SemiBold, color = Ink)
            if (progress.showKanji) Text(phrase.ja, fontSize = 21.sp, color = Ink)
            if (showReading) Text(phrase.reading, color = Muted, fontSize = 15.sp)
            if (progress.showRomaji) Text(phrase.romaji, color = Muted, fontStyle = FontStyle.Italic, fontSize = 15.sp)
            if (phrase.note.isNotEmpty()) Note(phrase.note)
        }
        Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
            RoundButton("▶", "Play", filled = true, onClick = onPlay)
            RoundButton("½", "Play slowly", filled = false, onClick = onSlow)
            RoundButton(if (fav) "★" else "☆", "Favorite", filled = false, tint = if (fav) Star else Muted, onClick = onFav)
        }
    }
}

@Composable
private fun Note(text: String) {
    Row(Modifier.fillMaxWidth().padding(top = 4.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Box(Modifier.width(3.dp).height(18.dp).background(AccentSoft))
        Text(text, color = Muted, fontSize = 13.sp, modifier = Modifier.weight(1f))
    }
}

@Composable
private fun RoundButton(label: String, description: String, filled: Boolean, tint: Color = MaterialTheme.colorScheme.primary, onClick: () -> Unit) {
    val bg = if (filled) MaterialTheme.colorScheme.primary else Paper
    val fg = if (filled) Color.White else tint
    Box(
        Modifier
            .size(40.dp)
            .clip(CircleShape)
            .background(bg)
            .border(1.dp, if (filled) MaterialTheme.colorScheme.primary else Line, CircleShape)
            .clickable(onClick = onClick)
            .semantics { contentDescription = description },
        contentAlignment = Alignment.Center,
    ) {
        Text(label, color = fg, fontSize = if (label == "½") 13.sp else 16.sp)
    }
}

@Composable
private fun FlashPage(
    deck: FlashDeck,
    bundle: PhrasebookBundle,
    progress: PhrasebookProgress,
    onPlay: (Phrase) -> Unit,
    onSlow: (Phrase) -> Unit,
    onReveal: (FlashDeck) -> Unit,
    onGrade: (FlashDeck, String?) -> Unit,
    onDone: () -> Unit,
) {
    val card = deck.queue.firstOrNull()?.let { bundle.byKey[it] }
    if (card == null) {
        Column(Modifier.fillMaxWidth().padding(top = 48.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text("お疲れさまでした！", fontSize = 26.sp, color = Ink, textAlign = TextAlign.Center)
            Text("Otsukaresama deshita! You went through all ${deck.total} cards.", color = Muted, textAlign = TextAlign.Center)
            PrimaryButton("Done", onDone)
        }
        return
    }
    LaunchedEffect(card.key, deck.revealed, progress.flashAutoplay, progress.flashDir) {
        if (progress.flashAutoplay && japaneseSideVisible(progress.flashDir, deck.revealed)) onPlay(card)
    }
    Meter(if (deck.total == 0) 0f else deck.done.toFloat() / deck.total)
    Column(
        Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp)).background(Paper).border(1.dp, Line, RoundedCornerShape(14.dp)).padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Text("${card.packTitle} · ${card.category}", color = MaterialTheme.colorScheme.primary, fontSize = 11.sp, fontWeight = FontWeight.SemiBold)
        val frontJapanese = progress.flashDir != "en-ja"
        if (frontJapanese) JapaneseFace(card, big = true) else Text(card.en, fontWeight = FontWeight.SemiBold, fontSize = 26.sp, textAlign = TextAlign.Center, color = Ink)
        if (deck.revealed) {
            Box(Modifier.fillMaxWidth().height(1.dp).background(Line))
            if (frontJapanese) Text(card.en, fontWeight = FontWeight.SemiBold, fontSize = 26.sp, textAlign = TextAlign.Center, color = Ink)
            else JapaneseFace(card, big = true)
            if (card.note.isNotEmpty()) Note(card.note)
        }
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            RoundButton("▶", "Play", filled = true, onClick = { onPlay(card) })
            RoundButton("½", "Play slowly", filled = false, onClick = { onSlow(card) })
        }
    }
    if (deck.revealed) {
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            Box(Modifier.weight(1f)) {
                OutlinedButton(
                    onClick = { onGrade(deck.again(Random.Default), null) },
                    modifier = Modifier.fillMaxWidth(),
                ) { Text("Again", color = Bad) }
            }
            Box(Modifier.weight(1f)) {
                androidx.compose.material3.Button(
                    onClick = {
                        val graded = deck.good()
                        if (graded != null) onGrade(graded.first, graded.second)
                    },
                    modifier = Modifier.fillMaxWidth(),
                    colors = androidx.compose.material3.ButtonDefaults.buttonColors(containerColor = Good),
                ) { Text("Got it") }
            }
        }
    } else {
        PrimaryButton("Show answer", { onReveal(deck.reveal()) }, fill = true)
    }
    val direction = if (progress.flashDir == "en-ja") "English → Japanese" else "Japanese → English"
    Text("Direction: $direction (change in ⚙)", color = Muted, fontSize = 13.sp, textAlign = TextAlign.Center, modifier = Modifier.fillMaxWidth())
}

@Composable
private fun JapaneseFace(phrase: Phrase, big: Boolean) {
    Text(phrase.ja, fontSize = if (big) 30.sp else 21.sp, textAlign = TextAlign.Center, color = Ink)
    if (phrase.reading != phrase.ja) Text(phrase.reading, color = Muted, fontSize = 16.sp, textAlign = TextAlign.Center)
    Text(phrase.romaji, color = Muted, fontStyle = FontStyle.Italic, textAlign = TextAlign.Center)
}

@Composable
private fun SettingsPage(
    progress: PhrasebookProgress,
    bundle: PhrasebookBundle,
    voiceStatus: () -> VoiceStatus,
    onChange: (PhrasebookProgress) -> Unit,
    onTest: () -> Unit,
    onExport: () -> Unit,
    onReset: () -> Unit,
) {
    var voiceLine by remember { mutableStateOf(deviceVoiceLine(VoiceStatus.Pending)) }
    LaunchedEffect(Unit) {
        while (true) {
            val status = voiceStatus()
            voiceLine = deviceVoiceLine(status)
            if (status != VoiceStatus.Pending) break
            delay(300)
        }
    }
    SectionLabel("SHOW")
    ToggleRow("Japanese (kanji & kana)", progress.showKanji) { onChange(progress.copy(showKanji = it)) }
    ToggleRow("Kana reading", progress.showKana) { onChange(progress.copy(showKana = it)) }
    ToggleRow("Romaji", progress.showRomaji) { onChange(progress.copy(showRomaji = it)) }
    SectionLabel("AUDIO")
    ToggleRow("Recorded voice", progress.recorded) { onChange(progress.copy(recorded = it)) }
    ChoiceRow("Speech speed", rateLabel(progress.rate), SPEECH_RATES.map { it to rateLabel(it) }) { picked ->
        onChange(progress.copy(rate = nearestRate(picked)))
    }
    Text("Device voice: $voiceLine", color = Muted, fontSize = 14.sp)
    ActionButton("Test voice", onTest)
    SectionLabel("FLASHCARDS")
    ChoiceRow(
        "Direction",
        if (progress.flashDir == "en-ja") "English → Japanese" else "Japanese → English",
        listOf("en-ja" to "English → Japanese", "ja-en" to "Japanese → English"),
    ) { onChange(progress.copy(flashDir = it)) }
    ToggleRow("Speak Japanese when shown", progress.flashAutoplay) { onChange(progress.copy(flashAutoplay = it)) }
    SectionLabel("DATA")
    ActionButton("Export all phrases (Anki CSV)", onExport)
    ActionButton("Reset learned progress", onReset)
    SectionLabel("ABOUT")
    Text(phrasebookAbout(bundle.packs, bundle.phrases.size), color = Muted, fontSize = 14.sp)
}

@Composable
private fun SectionLabel(text: String) {
    Text(text, color = Muted, fontSize = 12.sp, fontWeight = FontWeight.SemiBold, letterSpacing = 1.sp, modifier = Modifier.padding(top = 8.dp))
}

@Composable
private fun ToggleRow(label: String, checked: Boolean, onChange: (Boolean) -> Unit) {
    Row(
        Modifier.fillMaxWidth().clip(Shape).background(Paper).border(1.dp, Line, Shape).padding(horizontal = 16.dp, vertical = 10.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(label, modifier = Modifier.weight(1f), color = Ink)
        Switch(checked = checked, onCheckedChange = onChange)
    }
}

@Composable
private fun <T> ChoiceRow(label: String, current: String, options: List<Pair<T, String>>, onPick: (T) -> Unit) {
    var open by remember { mutableStateOf(false) }
    Row(
        Modifier.fillMaxWidth().clip(Shape).background(Paper).border(1.dp, Line, Shape).padding(horizontal = 16.dp, vertical = 10.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(label, modifier = Modifier.weight(1f), color = Ink)
        Box {
            OutlinedButton(onClick = { open = true }) { Text(current) }
            DropdownMenu(expanded = open, onDismissRequest = { open = false }) {
                options.forEach { (value, name) ->
                    DropdownMenuItem(text = { Text(name) }, onClick = { onPick(value); open = false })
                }
            }
        }
    }
}

@Composable
private fun ActionButton(label: String, onClick: () -> Unit) {
    OutlinedButton(onClick = onClick) { Text(label) }
}

@Composable
private fun PrimaryButton(label: String, onClick: () -> Unit, fill: Boolean = false) {
    androidx.compose.material3.Button(onClick = onClick, modifier = if (fill) Modifier.fillMaxWidth() else Modifier) { Text(label) }
}
