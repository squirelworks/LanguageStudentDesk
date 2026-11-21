package com.squirelworks.lsd.kana

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.darkColorScheme
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.squirelworks.lsd.core.languages.TextStore
import com.squirelworks.lsd.core.suite.KanaBack
import com.squirelworks.lsd.core.suite.SuiteApp
import com.squirelworks.lsd.core.suite.kanaBack
import com.squirelworks.lsd.core.trainer.mastered
import com.squirelworks.lsd.core.trainer.needsReview
import com.squirelworks.lsd.core.trainer.recordAnswer

private sealed interface Screen {
    data object Home : Screen
    data class Script(val scriptId: String) : Screen
    data class Lesson(val scriptId: String, val index: Int) : Screen
    data class Chart(val scriptId: String) : Screen
    data class Detail(val scriptId: String, val glyphs: List<String>, val index: Int) : Screen
    data class Choose(val scriptId: String, val mode: String) : Screen
    data class Quiz(val scriptId: String, val keys: List<String>, val kind: String, val count: Int) : Screen
    data class Flash(val scriptId: String, val keys: List<String>) : Screen
    data class Write(val scriptId: String, val keys: List<String>, val start: Int) : Screen
    data class Article(val scriptId: String, val index: Int) : Screen
    data object Settings : Screen
}

@Composable
fun KanaApp(
    title: String,
    scripts: List<KanaScript>,
    strokes: Map<String, Map<String, List<String>>>,
    dark: Boolean,
    clips: Map<String, Map<String, String>> = emptyMap(),
    playClip: (String, Float) -> Unit = { _, _ -> },
    speakFallback: (String, Float, String) -> Unit = { _, _, _ -> },
    progressStore: TextStore? = null,
    initialQuery: String? = null,
    intro: String = "",
    about: String = "",
    onLookup: ((String) -> Unit)? = null,
    canSpeak: Boolean = false,
    suite: SuiteFile? = null,
    suiteId: String = "",
    installedPackages: Set<String>? = null,
    onLaunchApp: (SuiteApp) -> Boolean = { false },
    onOpenUrl: (String) -> Unit = {},
) {
    var stack by remember { mutableStateOf(listOf<Screen>(Screen.Home)) }
    var progress by remember { mutableStateOf(readProgress(progressStore)) }
    var picked by remember { mutableStateOf(mapOf<String, Set<Int>>()) }
    var quizKind by remember { mutableStateOf("read") }
    var quizCount by remember { mutableIntStateOf(10) }
    var showSuite by remember { mutableStateOf(false) }
    var suiteNotice by remember { mutableStateOf("") }
    var dialogOpen by remember { mutableStateOf(false) }
    var closeDialog by remember { mutableStateOf<() -> Unit>({ }) }
    val openApps = if (suite == null) null else ({ showSuite = true })
    val screen = stack.last()
    fun open(next: Screen) { stack = stack + next }
    fun back() { if (stack.size > 1) stack = stack.dropLast(1) }
    val backEnabled = showSuite || dialogOpen || stack.size > 1
    PlatformBackHandler(backEnabled) {
        when (kanaBack(showSuite, dialogOpen, stack.size)) {
            KanaBack.CloseSheet -> {
                showSuite = false
                suiteNotice = ""
            }
            KanaBack.CloseDialog -> closeDialog()
            KanaBack.PreviousScreen -> back()
            KanaBack.Exit -> Unit
        }
    }
    fun save(next: ProgressFile) {
        progress = next
        writeProgress(progressStore, next)
    }
    fun play(script: KanaScript, text: String, slow: Boolean) {
        if (!progress.voice || text.isBlank()) return
        val rate = (if (slow) 0.6f else 1f) * progress.rate
        val file = clips[script.id]?.get(text)
        if (file != null) playClip("clips/${script.id}/$file", rate)
        else speakFallback(text, rate, script.lang)
    }
    fun glyphs(keys: List<String>, script: KanaScript) =
        keys.mapNotNull { key -> lessonGlyphs(script).firstOrNull { it.key == key } }
    fun stepDetail(delta: Int) {
        val current = stack.last() as? Screen.Detail ?: return
        val next = (current.index + delta).coerceIn(0, current.glyphs.lastIndex.coerceAtLeast(0))
        stack = stack.dropLast(1) + current.copy(index = next)
    }
    LaunchedEffect(initialQuery) {
        val query = initialQuery?.trim().orEmpty()
        if (query.isEmpty()) return@LaunchedEffect
        val hit = scripts.firstNotNullOfOrNull { script ->
            val all = lessonGlyphs(script)
            val index = all.indexOfFirst { it.glyph == query }
            if (index < 0) null else script to all
        }
        if (hit != null) {
            stack = listOf(Screen.Home, Screen.Script(hit.first.id), Screen.Detail(hit.first.id, hit.second.map { it.glyph }, hit.second.indexOfFirst { it.glyph == query }))
        }
    }
    MaterialTheme(colorScheme = if (dark) darkColorScheme() else lightColorScheme()) {
        Box(Modifier.fillMaxSize()) {
        BoxWithConstraints(
            Modifier.fillMaxSize().windowInsetsPadding(WindowInsets.safeDrawing).padding(16.dp),
        ) {
            val wide = maxWidth >= 840.dp && screen is Screen.Detail
            if (wide) {
                val detail = screen as Screen.Detail
                val script = scripts.first { it.id == detail.scriptId }
                Row(Modifier.fillMaxSize(), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                    ChartPage(script, progress, ::back, { glyph ->
                        val list = lessonGlyphs(script).map { it.glyph }
                        open(Screen.Detail(script.id, list, list.indexOf(glyph).coerceAtLeast(0)))
                    }, Modifier.weight(1f))
                    DetailPage(
                        script,
                        strokes[script.id].orEmpty(),
                        detail.glyphs,
                        detail.index,
                        progress,
                        speed = progress.speed,
                        onBack = ::back,
                        onPlay = { text, slow -> play(script, text, slow) },
                        onWrite = {
                            val refs = lessonGlyphs(script).filter { it.glyph in detail.glyphs }
                            open(Screen.Write(script.id, refs.map { it.key }, detail.index.coerceIn(0, refs.lastIndex.coerceAtLeast(0))))
                        },
                        onLookup = onLookup,
                        onStep = ::stepDetail,
                        modifier = Modifier.weight(1f),
                    )
                }
            } else {
                when (screen) {
                    Screen.Home -> HomePage(title, intro, scripts, progress, { open(Screen.Script(it)) }, openApps)
                    is Screen.Script -> ScriptPage(
                        scripts.first { it.id == screen.scriptId },
                        progress,
                        onBack = ::back,
                        onLesson = { open(Screen.Lesson(screen.scriptId, it)) },
                        onChart = { open(Screen.Chart(screen.scriptId)) },
                        onPractice = { open(Screen.Choose(screen.scriptId, it)) },
                        onArticle = { open(Screen.Article(screen.scriptId, it)) },
                        onSettings = { open(Screen.Settings) },
                        onApps = openApps,
                    )
                    is Screen.Lesson -> LessonPage(
                        scripts.first { it.id == screen.scriptId },
                        screen.index,
                        progress,
                        onBack = ::back,
                        onOpen = { glyph ->
                            val lesson = scripts.first { it.id == screen.scriptId }.lessons[screen.index]
                            val glyphs = lesson.chars.filterNotNull().map { it.g }
                            open(Screen.Detail(screen.scriptId, glyphs, glyphs.indexOf(glyph)))
                        },
                        onPractice = { mode ->
                            val script = scripts.first { it.id == screen.scriptId }
                            val keys = lessonGlyphs(script, setOf(screen.index)).map { it.key }
                            when (mode) {
                                "flash" -> open(Screen.Flash(script.id, keys))
                                "write" -> open(Screen.Write(script.id, keys, 0))
                                else -> open(Screen.Quiz(script.id, keys, "mix", 0))
                            }
                        },
                    )
                    is Screen.Chart -> ChartPage(
                        scripts.first { it.id == screen.scriptId },
                        progress,
                        ::back,
                        { glyph ->
                            val script = scripts.first { it.id == screen.scriptId }
                            val list = lessonGlyphs(script).map { it.glyph }
                            open(Screen.Detail(script.id, list, list.indexOf(glyph).coerceAtLeast(0)))
                        },
                        Modifier.fillMaxSize(),
                    )
                    is Screen.Detail -> {
                        val script = scripts.first { it.id == screen.scriptId }
                        DetailPage(
                            script,
                            strokes[script.id].orEmpty(),
                            screen.glyphs,
                            screen.index,
                            progress,
                            progress.speed,
                            ::back,
                            { text, slow -> play(script, text, slow) },
                            {
                                val refs = lessonGlyphs(script).filter { it.glyph in screen.glyphs }
                                val start = refs.indexOfFirst { it.glyph == screen.glyphs.getOrNull(screen.index) }.coerceAtLeast(0)
                                open(Screen.Write(script.id, refs.map { it.key }, start))
                            },
                            onLookup,
                            ::stepDetail,
                            Modifier.fillMaxSize(),
                        )
                    }
                    is Screen.Choose -> {
                        val script = scripts.first { it.id == screen.scriptId }
                        val weak = lessonGlyphs(script).filter { needsReview(progress.stat(it.key)) }
                        ChooseScreen(
                            script = script,
                            mode = screen.mode,
                            selected = picked[script.id] ?: setOf(0),
                            weakLessons = emptySet(),
                            weakCount = weak.size,
                            kind = quizKind,
                            count = quizCount,
                            canListen = progress.voice && (clips[script.id].orEmpty().isNotEmpty() || canSpeak),
                            onToggle = { index ->
                                val now = (picked[script.id] ?: setOf(0)).toMutableSet()
                                if (!now.add(index)) now.remove(index)
                                picked = picked + (script.id to now)
                            },
                            onSet = { picked = picked + (script.id to it) },
                            onKind = { quizKind = it },
                            onCount = { quizCount = it },
                            onStart = { selection, weakOnly ->
                                val pool = if (weakOnly) weak else lessonGlyphs(script, selection)
                                if (pool.isEmpty()) return@ChooseScreen
                                val keys = pool.map { it.key }
                                when (screen.mode) {
                                    "flash" -> open(Screen.Flash(script.id, keys))
                                    "write" -> open(Screen.Write(script.id, keys, 0))
                                    else -> open(Screen.Quiz(script.id, keys, quizKind, if (weakOnly) 0 else quizCount))
                                }
                            },
                            onBack = ::back,
                        )
                    }
                    is Screen.Quiz -> {
                        val script = scripts.first { it.id == screen.scriptId }
                        QuizScreen(
                            script,
                            glyphs(screen.keys, script),
                            screen.kind,
                            screen.count,
                            progress.voice && (clips[script.id].orEmpty().isNotEmpty() || canSpeak),
                            { play(script, spokenText(cellOf(script, it.glyph)), false) },
                            { ref, ok -> save(progress.withStat(ref.key, recordAnswer(progress.stat(ref.key), ok))) },
                            ::back,
                        )
                    }
                    is Screen.Flash -> {
                        val script = scripts.first { it.id == screen.scriptId }
                        FlashScreen(
                            script,
                            glyphs(screen.keys, script),
                            progress.flashDir != "sound",
                            progress.speed,
                            strokes[script.id].orEmpty(),
                            { play(script, spokenText(cellOf(script, it.glyph)), false) },
                            ::back,
                        )
                    }
                    is Screen.Write -> {
                        val script = scripts.first { it.id == screen.scriptId }
                        WriteScreen(
                            script,
                            glyphs(screen.keys, script),
                            screen.start,
                            strokes[script.id].orEmpty(),
                            progress.guide,
                            progress.check,
                            progress.speed,
                            { save(progress.copy(guide = !progress.guide)) },
                            { save(progress.copy(check = !progress.check)) },
                            { play(script, spokenText(cellOf(script, it.glyph)), false) },
                            ::back,
                        )
                    }
                    is Screen.Article -> {
                        val script = scripts.first { it.id == screen.scriptId }
                        val article = script.articles[screen.index]
                        ArticleScreen(
                            article.title,
                            article.body,
                            { text -> play(script, text, false) },
                            ::back,
                        )
                    }
                    Screen.Settings -> SettingsScreen(
                        progress.voice,
                        progress.rate,
                        progress.showRoman,
                        progress.flashDir != "sound",
                        progress.guide,
                        progress.check,
                        progress.speed,
                        scripts,
                        about,
                        { save(progress.copy(voice = it)) },
                        { save(progress.copy(rate = it)) },
                        { save(progress.copy(showRoman = it)) },
                        { save(progress.copy(flashDir = if (it) "glyph" else "sound")) },
                        { save(progress.copy(guide = it)) },
                        { save(progress.copy(check = it)) },
                        { save(progress.copy(speed = it)) },
                        { script ->
                            val keys = lessonGlyphs(script).map { it.key }.toSet()
                            save(progress.copy(stats = progress.stats.filterKeys { it !in keys }))
                        },
                        ::back,
                        { open, close ->
                            dialogOpen = open
                            closeDialog = close
                        },
                    )
                }
            }
        }
        if (showSuite && suite != null) {
            SuiteSheet(
                file = suite,
                selfId = suiteId,
                installed = installedPackages,
                notice = suiteNotice,
                onOpen = { app ->
                    showSuite = false
                    suiteNotice = openSuiteApp(app, installedPackages, onLaunchApp, onOpenUrl)
                    if (suiteNotice.isNotBlank()) showSuite = true
                },
                onUrl = onOpenUrl,
                onClose = {
                    showSuite = false
                    suiteNotice = ""
                },
            )
        }
        }
    }
}

@Composable
private fun HomePage(
    title: String,
    intro: String,
    scripts: List<KanaScript>,
    progress: ProgressFile,
    onOpen: (String) -> Unit,
    onApps: (() -> Unit)?,
) {
    Column(Modifier.verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text(title, style = MaterialTheme.typography.headlineSmall, modifier = Modifier.weight(1f))
            if (onApps != null) TextButton(onClick = onApps) { Text("Apps") }
        }
        if (intro.isNotBlank()) Text(intro)
        scripts.forEach { script ->
            val all = lessonGlyphs(script)
            val done = all.count { mastered(progress.stat(it.key)) }
            Column(Modifier.fillMaxWidth().clickable { onOpen(script.id) }.padding(vertical = 12.dp)) {
                if (script.native.isNotBlank()) Text(script.native, style = MaterialTheme.typography.titleLarge)
                Text(script.title, style = MaterialTheme.typography.titleLarge)
                if (script.blurb.isNotBlank()) Text(script.blurb)
                if (all.isNotEmpty()) Text("$done of ${all.size} characters mastered")
            }
        }
    }
}

@Composable
private fun ScriptPage(
    script: KanaScript,
    progress: ProgressFile,
    onBack: () -> Unit,
    onLesson: (Int) -> Unit,
    onChart: () -> Unit,
    onPractice: (String) -> Unit,
    onArticle: (Int) -> Unit,
    onSettings: () -> Unit,
    onApps: (() -> Unit)?,
) {
    val all = lessonGlyphs(script)
    val done = all.count { mastered(progress.stat(it.key)) }
    Column(Modifier.verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            TextButton(onClick = onBack) { Text("‹") }
            Text(script.title, style = MaterialTheme.typography.titleLarge, modifier = Modifier.weight(1f))
            if (onApps != null) TextButton(onClick = onApps) { Text("Apps") }
            TextButton(onClick = onSettings) { Text("Settings") }
        }
        if (script.native.isNotBlank()) Text(script.native)
        if (script.blurb.isNotBlank()) Text(script.blurb)
        if (all.isNotEmpty()) Text("$done of ${all.size} characters mastered")
        Text("Practice", style = MaterialTheme.typography.titleMedium)
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { onPractice("quiz") }) { Text("Quiz") }
            OutlinedPractice("Flashcards") { onPractice("flash") }
            OutlinedPractice("Writing") { onPractice("write") }
            OutlinedPractice("Chart") { onChart() }
        }
        Text("Lessons", style = MaterialTheme.typography.titleMedium)
        script.lessons.forEachIndexed { index, lesson ->
            val items = lesson.chars.filterNotNull()
            val known = items.count { mastered(progress.stat("${script.id}|${it.g}")) }
            TextButton(onClick = { onLesson(index) }, modifier = Modifier.fillMaxWidth()) {
                Column(Modifier.fillMaxWidth()) {
                    Text(items.take(5).joinToString(" ") { it.g })
                    Text(lesson.title)
                    if (lesson.note.isNotBlank()) Text(lesson.note)
                    if (items.isNotEmpty()) Text("$known of ${items.size}")
                }
            }
        }
        if (script.articles.isNotEmpty()) {
            Text("Read about ${script.title}", style = MaterialTheme.typography.titleMedium)
            script.articles.forEachIndexed { index, article ->
                TextButton(onClick = { onArticle(index) }, modifier = Modifier.fillMaxWidth()) { Text(article.title) }
            }
        }
    }
}

@Composable
private fun OutlinedPractice(label: String, onClick: () -> Unit) {
    androidx.compose.material3.OutlinedButton(onClick = onClick) { Text(label) }
}

@Composable
private fun LessonPage(
    script: KanaScript,
    index: Int,
    progress: ProgressFile,
    onBack: () -> Unit,
    onOpen: (String) -> Unit,
    onPractice: (String) -> Unit,
) {
    val lesson = script.lessons[index]
    Column(Modifier.verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Row {
            TextButton(onClick = onBack) { Text("‹") }
            Text(lesson.title, style = MaterialTheme.typography.titleLarge)
        }
        if (lesson.note.isNotBlank()) Text(lesson.note)
        lesson.chars.filterNotNull().chunked(5).forEach { row ->
            Row(Modifier.fillMaxWidth()) {
                row.forEach { cell ->
                    val stat = progress.stat("${script.id}|${cell.g}")
                    Column(
                        Modifier.weight(1f).clickable { onOpen(cell.g) }.padding(4.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                    ) {
                        Text(cell.g, color = masteryColor(stat), style = MaterialTheme.typography.headlineSmall)
                        if (progress.showRoman) Text(cell.r, style = MaterialTheme.typography.bodySmall)
                    }
                }
            }
        }
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { onPractice("quiz") }) { Text("Quiz this lesson") }
            OutlinedPractice("Flashcards") { onPractice("flash") }
            OutlinedPractice("Writing") { onPractice("write") }
        }
    }
}

@Composable
private fun ChartPage(
    script: KanaScript,
    progress: ProgressFile,
    onBack: () -> Unit,
    onOpen: (String) -> Unit,
    modifier: Modifier,
) {
    Column(modifier) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            TextButton(onClick = onBack) { Text("‹") }
            Text(script.title, style = MaterialTheme.typography.titleLarge)
        }
        Text("Tap a character for details. Green means mastered in quizzes, orange means it needs review.")
        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            chartGroups(script).forEach { group ->
                item { Text(group.name, style = MaterialTheme.typography.titleMedium) }
                items(group.cells.chunked(group.cols)) { row ->
                    Row(Modifier.fillMaxWidth()) {
                        row.forEach { cell ->
                            Box(
                                Modifier.weight(1f).aspectRatio(1f).padding(2.dp),
                                contentAlignment = Alignment.Center,
                            ) {
                                if (cell != null) {
                                    val stat = progress.stat("${script.id}|${cell.g}")
                                    Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.clickable { onOpen(cell.g) }) {
                                        Text(cell.g, color = masteryColor(stat), style = MaterialTheme.typography.titleLarge)
                                        if (progress.showRoman && cell.r.isNotBlank()) {
                                            Text(cell.r, style = MaterialTheme.typography.labelSmall)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun DetailPage(
    script: KanaScript,
    strokes: Map<String, List<String>>,
    glyphs: List<String>,
    index: Int,
    progress: ProgressFile,
    speed: Int,
    onBack: () -> Unit,
    onPlay: (String, Boolean) -> Unit,
    onWrite: () -> Unit,
    onLookup: ((String) -> Unit)?,
    onStep: (Int) -> Unit,
    modifier: Modifier,
) {
    val glyph = glyphs.getOrElse(index) { glyphs.firstOrNull().orEmpty() }
    val cell = cellOf(script, glyph)
    val paths = strokes[glyph].orEmpty()
    var play by remember(glyph) { mutableStateOf(false) }
    val stat = progress.stat("${script.id}|$glyph")
    Column(modifier.verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            TextButton(onClick = onBack) { Text("‹") }
            Text(cell?.r ?: glyph, style = MaterialTheme.typography.titleLarge)
        }
        Text(glyph, style = MaterialTheme.typography.displayLarge)
        if (!cell?.ipa.isNullOrBlank()) Text("/${cell.ipa.orEmpty()}/")
        if (!cell?.hint.isNullOrBlank()) Text(cell?.hint.orEmpty())
        if (paths.isNotEmpty()) {
            StrokeGlyph(paths, play, Modifier.background(MaterialTheme.colorScheme.surfaceVariant), speed)
            Text(if (paths.size == 1) "1 stroke" else "${paths.size} strokes")
            Button(onClick = { play = !play }) { Text(if (play) "Stop" else "Watch the strokes") }
        }
        val spoken = spokenText(cell).ifBlank { glyph }
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { onPlay(spoken, false) }) { Text("Play") }
            Button(onClick = { onPlay(spoken, true) }) { Text("Slow") }
        }
        val example = cell?.ex.orEmpty()
        if (example.isNotBlank()) {
            Text("Example", style = MaterialTheme.typography.labelLarge)
            Text(example, style = MaterialTheme.typography.titleMedium)
            val gloss = listOf(cell?.exR.orEmpty(), cell?.exM.orEmpty()).filter { it.isNotBlank() }.joinToString(" · ")
            if (gloss.isNotBlank()) Text(gloss)
            Button(onClick = { onPlay(example, false) }) { Text("Play example") }
            if (onLookup != null && script.lang.startsWith("ja")) {
                Button(onClick = { onLookup(example) }) { Text("Look up $example in the Dictionary") }
            }
        }
        val record = "Quiz record: ${stat.correct} right, ${stat.wrong} wrong" + if (mastered(stat)) " · mastered" else ""
        Text(record)
        Row {
            TextButton(onClick = { onStep(-1) }, enabled = index > 0) { Text("‹ Prev") }
            TextButton(onClick = onWrite) { Text("Write it") }
            TextButton(onClick = { onStep(1) }, enabled = index < glyphs.lastIndex) { Text("Next ›") }
        }
    }
}

private fun masteryColor(stat: com.squirelworks.lsd.core.trainer.PracticeStat): Color = when {
    mastered(stat) -> Color(0xFF1B7F4E)
    needsReview(stat) -> Color(0xFFB86E00)
    else -> Color.Unspecified
}
