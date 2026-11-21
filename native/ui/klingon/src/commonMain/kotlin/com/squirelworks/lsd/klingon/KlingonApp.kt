package com.squirelworks.lsd.klingon

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Checkbox
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
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.squirelworks.lsd.core.languages.TextStore
import com.squirelworks.lsd.core.strokes.StrokeVerdict
import com.squirelworks.lsd.core.suite.SuiteApp
import com.squirelworks.lsd.kana.ArticleBlocks
import com.squirelworks.lsd.kana.EscapeBackEffect
import com.squirelworks.lsd.kana.PlatformBackHandler
import com.squirelworks.lsd.kana.StrokeGlyph
import com.squirelworks.lsd.kana.SuiteSheet
import com.squirelworks.lsd.kana.WritePad
import com.squirelworks.lsd.kana.accentArgb
import com.squirelworks.lsd.kana.openSuiteApp
import kotlinx.coroutines.delay

private val punctuation = listOf("\uF8FD" to "comma", "\uF8FE" to "full stop", "\uF8FF" to "emblem")

private sealed interface Page {
    data object Home : Page
    data class Lesson(val index: Int) : Page
    data class Detail(val key: String, val list: List<String>) : Page
    data object Chart : Page
    data class Choose(val mode: String) : Page
    data class QuizRun(val quiz: KlingonQuiz, val items: List<String>, val kind: String, val count: Int) : Page
    data class Flash(val origin: List<String>, val keys: List<String>, val shown: Boolean, val done: Int) : Page
    data class Write(val keys: List<String>, val index: Int, val memory: Boolean, val revealed: Boolean) : Page
    data class Words(val text: String) : Page
    data class Article(val index: Int) : Page
    data object Settings : Page
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun KlingonApp(
    bundle: KlingonBundle,
    dark: Boolean,
    hand: FontFamily,
    classic: FontFamily,
    progressStore: TextStore?,
    playClip: (String, Float) -> Unit,
    onStopAudio: () -> Unit,
    onCopy: (String) -> Unit = {},
    installedPackages: Set<String>? = null,
    onLaunchApp: (SuiteApp, String) -> Boolean = { _, _ -> false },
    onOpenUrl: (String) -> Unit = {},
) {
    var stack by remember { mutableStateOf(listOf<Page>(Page.Home)) }
    var progress by remember { mutableStateOf(readKlingonProgress(progressStore)) }
    var suiteOpen by remember { mutableStateOf(false) }
    var suiteNotice by remember { mutableStateOf("") }
    var toast by remember { mutableStateOf("") }
    var selected by remember { mutableStateOf(setOf(0)) }
    var quizKind by remember { mutableStateOf("read") }
    var quizCount by remember { mutableStateOf(10) }
    var writeMemory by remember { mutableStateOf(false) }
    val font = if (progress.font == "classic") classic else hand
    val page = stack.last()
    fun save(next: KlingonProgress) {
        progress = next
        writeKlingonProgress(progressStore, next)
    }
    fun push(next: Page) {
        stack = stack + next
    }
    fun replace(next: Page) {
        stack = stack.dropLast(1) + next
    }
    fun back() {
        onStopAudio()
        if (stack.size > 1) stack = stack.dropLast(1)
    }
    val backEnabled = suiteOpen || stack.size > 1
    fun performBack() {
        if (suiteOpen) {
            suiteOpen = false
            suiteNotice = ""
        } else back()
    }
    PlatformBackHandler(backEnabled, ::performBack)
    EscapeBackEffect(backEnabled, ::performBack)
    LaunchedEffect(toast) {
        if (toast.isNotBlank()) {
            delay(2800)
            toast = ""
        }
    }
    fun play(file: String, slow: Boolean = false) {
        if (!progress.voice || file.isBlank()) return
        onStopAudio()
        playClip(file, if (slow) 0.7f else 1f)
    }
    val accent = accentArgb(bundle.accent)?.let { Color(it) }
    val colors = when {
        accent == null && dark -> darkColorScheme()
        accent == null -> lightColorScheme()
        dark -> darkColorScheme(primary = accent)
        else -> lightColorScheme(primary = accent)
    }
    MaterialTheme(colorScheme = colors) {
        Box(Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background).windowInsetsPadding(WindowInsets.safeDrawing)) {
            Column(Modifier.fillMaxSize()) {
                TopBar(
                    title = titleOf(page, bundle),
                    canBack = stack.size > 1,
                    onBack = ::back,
                    onApps = { suiteOpen = true },
                    onSettings = { push(Page.Settings) },
                )
                Column(
                    Modifier.weight(1f).verticalScroll(rememberScrollState()).padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp),
                ) {
                    when (val current = page) {
                        Page.Home -> HomePage(bundle, progress, font, ::push)
                        is Page.Lesson -> LessonPage(bundle, progress, font, current.index, ::push)
                        is Page.Detail -> DetailPage(bundle, progress, font, current, ::play, ::replace, ::push)
                        Page.Chart -> ChartPage(bundle, progress, font) { key, list -> push(Page.Detail(key, list)) }
                        is Page.Choose -> ChoosePage(
                            bundle, progress, font, current.mode, selected, quizKind, quizCount, writeMemory,
                            onSelected = { selected = it },
                            onKind = { quizKind = it },
                            onCount = { quizCount = it },
                            onMemory = { writeMemory = it },
                            onStart = { keys, mode, count ->
                                val questions = count ?: quizCount
                                when (mode) {
                                    "quiz" -> push(Page.QuizRun(buildQuiz(keys.mapNotNull { bundle.byKey[it] }, quizKind, questions, progress.voice, bundle), keys, quizKind, questions))
                                    "flash" -> push(Page.Flash(keys, keys.shuffled(), false, 0))
                                    else -> push(Page.Write(keys, 0, writeMemory, false))
                                }
                            },
                        )
                        is Page.QuizRun -> QuizPage(bundle, font, current, ::play, onChoose = { choice ->
                            val next = current.quiz.choose(choice)
                            if (next != current.quiz) {
                                val question = current.quiz.questions[current.quiz.index]
                                save(progress.record(question.key, choice == question.answer))
                                replace(current.copy(quiz = next))
                            }
                        }, onNext = { replace(current.copy(quiz = current.quiz.advance())) }, onRetry = { missed ->
                            val source = if (missed) current.quiz.missed.distinct() else current.quiz.questions.map { it.key }
                            val letters = source.mapNotNull { bundle.byKey[it] }
                            replace(current.copy(quiz = buildQuiz(letters, current.kind, 0, progress.voice, bundle)))
                        }, onDetail = { push(Page.Detail(it, listOf(it))) })
                        is Page.Flash -> FlashPage(bundle, progress, font, current, ::play, onFlip = { replace(current.copy(shown = true)) }, onAgain = {
                            val offset = 3 + kotlin.random.Random.nextInt(3)
                            replace(current.copy(keys = reinsertFlashCard(current.keys, offset), shown = false))
                        }, onGood = {
                            if (current.keys.size <= 1) replace(current.copy(keys = emptyList(), shown = false, done = current.done + 1))
                            else replace(current.copy(keys = current.keys.drop(1), shown = false, done = current.done + 1))
                        }, onRestart = { replace(current.copy(keys = current.origin.shuffled(), shown = false, done = 0)) })
                        is Page.Write -> WritePage(bundle, progress, font, current, ::play, onProgress = ::save, onReplace = ::replace)
                        is Page.Words -> WordsPage(bundle, font, current.text, ::play, onText = { replace(Page.Words(it)) }, onCopy = { text ->
                            onCopy(text)
                            toast = "Copied pIqaD text."
                        }, onWrite = { keys ->
                            if (keys.isNotEmpty()) push(Page.Write(keys, 0, false, false))
                        })
                        is Page.Article -> ArticleBlocks(bundle.articles[current.index].body, onPlay = {})
                        Page.Settings -> SettingsPage(bundle, progress, font, ::save, onReset = {
                            save(progress.copy(stats = emptyMap(), written = emptyMap()))
                            toast = "Progress cleared."
                        })
                    }
                }
            }
            if (suiteOpen && bundle.suite != null) {
                SuiteSheet(
                    file = bundle.suite,
                    selfId = "klingon",
                    installed = installedPackages,
                    notice = suiteNotice,
                    onOpen = { app ->
                        suiteNotice = openSuiteApp(app, installedPackages, { chosen -> onLaunchApp(chosen, "") }, onOpenUrl)
                    },
                    onUrl = onOpenUrl,
                    onClose = { suiteOpen = false; suiteNotice = "" },
                )
            }
            if (toast.isNotBlank()) {
                Text(toast, modifier = Modifier.align(Alignment.BottomCenter).padding(16.dp).background(MaterialTheme.colorScheme.inverseSurface).padding(12.dp), color = MaterialTheme.colorScheme.inverseOnSurface)
            }
        }
    }
}

@Composable
private fun TopBar(title: String, canBack: Boolean, onBack: () -> Unit, onApps: () -> Unit, onSettings: () -> Unit) {
    Row(Modifier.fillMaxWidth().padding(horizontal = 8.dp), verticalAlignment = Alignment.CenterVertically) {
        if (canBack) TextButton(onClick = onBack) { Text("Back") }
        Text(title, style = MaterialTheme.typography.titleLarge, modifier = Modifier.weight(1f))
        TextButton(onClick = onApps) { Text("Apps") }
        TextButton(onClick = onSettings) { Text("Settings") }
    }
}

@Composable
private fun Glyph(text: String, font: FontFamily, size: Int = 32) {
    Text(text, fontFamily = font, fontSize = size.sp, color = MaterialTheme.colorScheme.primary)
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun HomePage(bundle: KlingonBundle, progress: KlingonProgress, font: FontFamily, open: (Page) -> Unit) {
    val mastered = bundle.letters.count { progress.mastered(it.key) }
    val written = bundle.letters.count { (progress.written[it.key] ?: 0) > 0 }
    Glyph(transliterate("tlhIngan Hol", bundle.byKey).text, font, 40)
    Text("tlhIngan Hol · the Klingon language")
    Text("$mastered of ${bundle.letters.size} characters mastered in quizzes · $written written")
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Button(onClick = { open(Page.Choose("write")) }) { Text("Writing") }
        TextButton(onClick = { open(Page.Choose("quiz")) }) { Text("Quiz") }
        TextButton(onClick = { open(Page.Choose("flash")) }) { Text("Flashcards") }
        TextButton(onClick = { open(Page.Chart) }) { Text("Chart") }
    }
    Text("Lessons", style = MaterialTheme.typography.titleMedium)
    bundle.lessons.forEachIndexed { index, lesson ->
        val keys = bundle.letters.filter { it.lesson == index }
        TextButton(onClick = { open(Page.Lesson(index)) }, modifier = Modifier.fillMaxWidth()) {
            Column(Modifier.weight(1f)) {
                Glyph(keys.take(6).joinToString(" ") { it.glyph }, font, 22)
                Text(lesson.title)
                if (lesson.note.isNotBlank()) Text(lesson.note, style = MaterialTheme.typography.bodySmall)
                Text("${keys.count { progress.mastered(it.key) }} / ${keys.size}")
            }
        }
    }
    Text("Tools", style = MaterialTheme.typography.titleMedium)
    TextButton(onClick = { open(Page.Words("Qapla'")) }) { Text("Write words in pIqaD") }
    Text("Read about pIqaD", style = MaterialTheme.typography.titleMedium)
    bundle.articles.forEachIndexed { index, article ->
        TextButton(onClick = { open(Page.Article(index)) }) { Text(article.title) }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun LessonPage(bundle: KlingonBundle, progress: KlingonProgress, font: FontFamily, index: Int, open: (Page) -> Unit) {
    val lesson = bundle.lessons[index]
    val letters = bundle.letters.filter { it.lesson == index }
    if (lesson.note.isNotBlank()) Text(lesson.note)
    FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        letters.forEach { letter ->
            LetterTile(letter, progress, font) { open(Page.Detail(letter.key, letters.map { it.key })) }
        }
    }
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Button(onClick = { open(Page.Write(letters.map { it.key }, 0, false, false)) }) { Text("Write these") }
        TextButton(onClick = {
            val keys = letters.map { it.key }
            open(Page.QuizRun(buildQuiz(letters, "mix", 0, progress.voice, bundle), keys, "mix", 0))
        }) { Text("Quiz") }
        TextButton(onClick = {
            val keys = letters.map { it.key }
            open(Page.Flash(keys, keys.shuffled(), false, 0))
        }) { Text("Flashcards") }
    }
}

@Composable
private fun LetterTile(letter: KlingonLetter, progress: KlingonProgress, font: FontFamily, onClick: () -> Unit) {
    val color = when {
        progress.mastered(letter.key) -> Color(0xFF2E7D32)
        progress.weak(letter.key) -> Color(0xFFE65100)
        else -> MaterialTheme.colorScheme.onSurface
    }
    TextButton(onClick = onClick) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(letter.glyph, fontFamily = font, fontSize = 28.sp, color = color)
            if (progress.showRoman) Text(letter.key, style = MaterialTheme.typography.bodySmall)
        }
    }
}

@Composable
private fun DetailPage(
    bundle: KlingonBundle,
    progress: KlingonProgress,
    font: FontFamily,
    page: Page.Detail,
    play: (String, Boolean) -> Unit,
    replace: (Page) -> Unit,
    open: (Page) -> Unit,
) {
    val letter = bundle.byKey[page.key] ?: return
    val paths = bundle.strokes[letter.key].orEmpty()
    var replay by remember(letter.key) { mutableIntStateOf(0) }
    val index = page.list.indexOf(letter.key)
    Row(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalAlignment = Alignment.CenterVertically) {
        Glyph(letter.glyph, font, 64)
        if (paths.isNotEmpty()) {
            Column {
                StrokeGlyph(paths, play = true, replay = replay, speed = progress.speed)
                TextButton(onClick = { replay++ }) { Text("Watch") }
                Text("${paths.size} ${if (paths.size == 1) "stroke" else "strokes"}")
            }
        }
    }
    Text("${letter.label}  /${if (letter.numeral) klingonIpa(letter.example, bundle.ipa) else bundle.ipa[letter.key].orEmpty()}/")
    Row {
        TextButton(onClick = { play("clips/${letter.clip}", false) }) { Text("Play") }
        TextButton(onClick = { play("clips/${letter.clip}", true) }) { Text("Slow") }
    }
    if (letter.numeral) {
        Text(buildAnnotatedString {
            append("Said ")
            withStyle(SpanStyle(fontWeight = FontWeight.Bold)) { append(letter.hint) }
        })
    } else {
        Text(letter.hint)
    }
    if (!letter.numeral) {
        Text("Sounds like: ${letter.like}")
        if (letter.example.isNotBlank()) {
            Glyph(transliterate(letter.example, bundle.byKey).text, font, 28)
            Text("${letter.example} /${klingonIpa(letter.example, bundle.ipa)}/ · ${letter.meaning}")
            TextButton(onClick = { play("clips/${wordFile(letter.example)}", false) }) { Text("Play example") }
        }
    }
    val stat = progress.stats[letter.key]
    Text("Quiz record: ${stat?.c ?: 0} right, ${stat?.w ?: 0} wrong${if (progress.mastered(letter.key)) " · mastered" else ""} · written ${progress.written[letter.key] ?: 0} times")
    Row {
        TextButton(onClick = { if (index > 0) replace(page.copy(key = page.list[index - 1])) }, enabled = index > 0) { Text("Prev") }
        Button(onClick = { open(Page.Write(page.list, index.coerceAtLeast(0), false, false)) }) { Text("Write it") }
        TextButton(onClick = { if (index < page.list.lastIndex) replace(page.copy(key = page.list[index + 1])) }, enabled = index < page.list.lastIndex) { Text("Next") }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ChartPage(bundle: KlingonBundle, progress: KlingonProgress, font: FontFamily, open: (String, List<String>) -> Unit) {
    Text("Tap a character for its sound and stroke order. Green means mastered in quizzes, orange means it needs review.")
    Text("Letters", style = MaterialTheme.typography.titleMedium)
    FlowRow {
        val alpha = bundle.letters.filter { !it.numeral }.sortedBy { it.codePoint }.map { it.key }
        bundle.letters.filter { !it.numeral }.sortedBy { it.codePoint }.forEach { LetterTile(it, progress, font) { open(it.key, alpha) } }
    }
    Text("Numerals", style = MaterialTheme.typography.titleMedium)
    FlowRow {
        val numerals = bundle.letters.filter { it.numeral }.map { it.key }
        bundle.letters.filter { it.numeral }.forEach { LetterTile(it, progress, font) { open(it.key, numerals) } }
    }
    Text("Punctuation", style = MaterialTheme.typography.titleMedium)
    FlowRow {
        punctuation.forEach { (glyph, name) ->
            Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.padding(8.dp)) {
                Glyph(glyph, font, 28)
                Text(name, style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}

@Composable
private fun ChoosePage(
    bundle: KlingonBundle,
    progress: KlingonProgress,
    font: FontFamily,
    mode: String,
    selected: Set<Int>,
    quizKind: String,
    quizCount: Int,
    memory: Boolean,
    onSelected: (Set<Int>) -> Unit,
    onKind: (String) -> Unit,
    onCount: (Int) -> Unit,
    onMemory: (Boolean) -> Unit,
    onStart: (List<String>, String, Int?) -> Unit,
) {
    val weak = bundle.letters.filter { progress.weak(it.key) }
    Row {
        TextButton(onClick = { onSelected(bundle.lessons.indices.toSet()) }) { Text("All") }
        TextButton(onClick = { onSelected(emptySet()) }) { Text("None") }
        if (weak.isNotEmpty()) TextButton(onClick = { onStart(weak.map { it.key }, mode, 0) }) { Text("Only the ${weak.size} to review") }
    }
    bundle.lessons.forEachIndexed { index, lesson ->
        val glyphs = bundle.letters.filter { it.lesson == index }.take(5).joinToString(" ") { it.glyph }
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(checked = index in selected, onCheckedChange = { on ->
                onSelected(if (on) selected + index else selected - index)
            })
            Glyph(glyphs, font, 18)
            Text(lesson.title)
        }
    }
    if (mode == "quiz") {
        Text("Question type", style = MaterialTheme.typography.titleMedium)
        listOf(
            "read" to "See the letter, pick the sound",
            "pick" to "See the sound, pick the letter",
            "listen" to "Hear it, pick the letter",
            "word" to "Read a whole word",
            "mix" to "Mixed",
        ).forEach { (id, label) ->
            TextButton(onClick = { onKind(id) }) { Text(if (id == quizKind) "• $label" else label) }
        }
        Row {
            listOf(10, 20, 0).forEach { count ->
                TextButton(onClick = { onCount(count) }) { Text(if (count == quizCount) "• ${if (count == 0) "All" else count}" else if (count == 0) "All" else "$count") }
            }
        }
    }
    if (mode == "write") {
        TextButton(onClick = { onMemory(false) }) { Text(if (!memory) "• Trace over the guide" else "Trace over the guide") }
        TextButton(onClick = { onMemory(true) }) { Text(if (memory) "• From memory" else "From memory") }
    }
    Button(onClick = { onStart(lettersIn(bundle, selected).map { it.key }, mode, null) }, enabled = selected.isNotEmpty()) { Text("Start") }
}

@Composable
private fun QuizPage(
    bundle: KlingonBundle,
    font: FontFamily,
    page: Page.QuizRun,
    play: (String, Boolean) -> Unit,
    onChoose: (String) -> Unit,
    onNext: () -> Unit,
    onRetry: (Boolean) -> Unit,
    onDetail: (String) -> Unit,
) {
    val quiz = page.quiz
    if (quiz.finished || quiz.questions.isEmpty()) {
        val total = quiz.questions.size.coerceAtLeast(1)
        Text("${quiz.right} / ${quiz.questions.size}", style = MaterialTheme.typography.displaySmall)
        Text("${(100 * quiz.right) / total}% correct")
        val missed = quiz.missed.distinct().mapNotNull { bundle.byKey[it] }
        if (missed.isEmpty()) Text("Perfect round. Qapla'!")
        else {
            Text("Missed")
            missed.forEach { letter -> TextButton(onClick = { onDetail(letter.key) }) { Glyph(letter.glyph, font, 28); Text(letter.label) } }
            Button(onClick = { onRetry(true) }) { Text("Retry missed") }
        }
        TextButton(onClick = { onRetry(false) }) { Text("Go again") }
        return
    }
    val question = quiz.questions[quiz.index]
    Text("Question ${quiz.index + 1} of ${quiz.questions.size} · ${quiz.right} right")
    when (question.kind) {
        "word" -> {
            Glyph(question.promptGlyph, font, 40)
            Text("Which word is this?")
        }
        "listen" -> {
            TextButton(onClick = { play(question.clip, false) }) { Text("Play again") }
            Text("Which ${if (bundle.byKey[question.key]?.numeral == true) "numeral" else "letter"} did you hear?")
            LaunchedEffect(question.key, quiz.index) { play(question.clip, false) }
        }
        "pick" -> {
            Text(question.promptSound, style = MaterialTheme.typography.displaySmall, color = MaterialTheme.colorScheme.primary)
            Text("Which letter is this?")
        }
        else -> {
            Glyph(question.promptGlyph, font, 64)
            Text(if (bundle.byKey[question.key]?.numeral == true) "Which number is this?" else "What sound is this?")
        }
    }
    question.options.forEach { option ->
        val answered = quiz.answered
        val container = when {
            answered == null -> MaterialTheme.colorScheme.secondaryContainer
            option.key == question.answer -> Color(0xFF2E7D32)
            option.key == answered -> Color(0xFFC62828)
            else -> MaterialTheme.colorScheme.secondaryContainer
        }
        val content = if (answered != null && (option.key == question.answer || option.key == answered)) Color.White else MaterialTheme.colorScheme.onSecondaryContainer
        Button(
            onClick = { onChoose(option.key) },
            enabled = answered == null,
            modifier = Modifier.fillMaxWidth(),
            colors = ButtonDefaults.buttonColors(containerColor = container, contentColor = content, disabledContainerColor = container, disabledContentColor = content),
        ) {
            if (question.kind == "pick" || question.kind == "listen") Glyph(option.glyph, font, 28) else Text(option.label)
        }
    }
    if (quiz.answered != null) {
        val ok = quiz.answered == question.answer
        if (question.kind == "word") {
            Text("${if (ok) "Correct." else "Not quite."} It is ${question.word} /${question.wordIpa}/ (${question.wordMeaning}). Letters: ${question.spelled}")
            TextButton(onClick = { play(question.clip, false) }) { Text("Play word") }
        } else {
            val letter = bundle.byKey[question.key]
            val ipa = if (letter?.numeral == true) klingonIpa(letter.example, bundle.ipa) else bundle.ipa[question.key].orEmpty()
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(if (ok) "Correct. " else "Not quite. ")
                if (letter != null) Glyph(letter.glyph, font, 22)
                Text(" is ${letter?.label.orEmpty()} /$ipa/${if (letter?.numeral == true) "" else ": ${letter?.hint.orEmpty()}"}")
            }
        }
        Button(onClick = onNext) { Text(if (quiz.index < quiz.questions.lastIndex) "Next" else "See results") }
    }
}

@Composable
private fun FlashPage(
    bundle: KlingonBundle,
    progress: KlingonProgress,
    font: FontFamily,
    page: Page.Flash,
    play: (String, Boolean) -> Unit,
    onFlip: () -> Unit,
    onAgain: () -> Unit,
    onGood: () -> Unit,
    onRestart: () -> Unit,
) {
    if (page.keys.isEmpty()) {
        Text("Done", style = MaterialTheme.typography.displaySmall)
        Text("You went through all ${page.origin.size} cards.")
        Button(onClick = onRestart) { Text("Shuffle and go again") }
        return
    }
    val letter = bundle.byKey[page.keys.first()] ?: return
    Text("${page.done + 1} of ${page.done + page.keys.size}")
    val glyphFront = progress.flashDir != "sound"
    if (!page.shown) {
        if (glyphFront) Glyph(letter.glyph, font, 72) else Text(letter.label, style = MaterialTheme.typography.displaySmall)
    } else if (glyphFront) {
        Text(letter.label, style = MaterialTheme.typography.headlineMedium)
        Text("/${bundle.ipa[letter.key].orEmpty()}/")
        if (!letter.numeral) Text(letter.hint)
    } else {
        Glyph(letter.glyph, font, 72)
        if (bundle.strokes[letter.key].orEmpty().isNotEmpty()) StrokeGlyph(bundle.strokes.getValue(letter.key), play = true, speed = progress.speed, sizeDp = 140.dp)
        if (!letter.numeral) Text(letter.hint)
    }
    if (page.shown && !letter.numeral && letter.example.isNotBlank()) {
        Glyph(transliterate(letter.example, bundle.byKey).text, font, 28)
        Text("${letter.example} /${klingonIpa(letter.example, bundle.ipa)}/ · ${letter.meaning}")
        TextButton(onClick = { play("clips/${wordFile(letter.example)}", false) }) { Text("Play example") }
    }
    TextButton(onClick = { play("clips/${letter.clip}", false) }) { Text("Play") }
    if (!page.shown) Button(onClick = onFlip) { Text("Show answer") }
    else Row {
        TextButton(onClick = onAgain) { Text("Again") }
        Button(onClick = onGood) { Text("Got it") }
    }
}

@Composable
private fun WritePage(
    bundle: KlingonBundle,
    progress: KlingonProgress,
    font: FontFamily,
    page: Page.Write,
    play: (String, Boolean) -> Unit,
    onProgress: (KlingonProgress) -> Unit,
    onReplace: (Page) -> Unit,
) {
    val letter = bundle.byKey[page.keys.getOrNull(page.index)] ?: return
    val paths = bundle.strokes[letter.key].orEmpty()
    var replay by remember(letter.key, page.revealed) { mutableIntStateOf(0) }
    var hint by remember(letter.key) { mutableStateOf(false) }
    var undo by remember { mutableIntStateOf(0) }
    var clear by remember { mutableIntStateOf(0) }
    var message by remember(letter.key) { mutableStateOf(if (progress.check) "Stroke 1 of ${paths.size}" else "Free drawing: strokes are not checked") }
    var advance by remember(letter.key) { mutableStateOf(false) }
    LaunchedEffect(advance, letter.key) {
        if (!advance) return@LaunchedEffect
        delay(1100)
        onReplace(page.copy(index = page.index + 1, revealed = false))
    }
    val memory = page.memory && !page.revealed
    if (memory) {
        Text(letter.label, style = MaterialTheme.typography.headlineMedium)
        Text(if (letter.numeral) "Write this numeral from memory." else "${letter.hint}. Write it from memory.")
        TextButton(onClick = { onReplace(page.copy(revealed = true)) }) { Text("Show me") }
    } else if (paths.isNotEmpty()) {
        StrokeGlyph(paths, play = true, replay = replay, speed = progress.speed, sizeDp = 120.dp)
        Text("${letter.label} · ${paths.size} strokes")
        TextButton(onClick = { replay++ }) { Text("Watch") }
    }
    val guide = if (page.memory) page.revealed && progress.guide else progress.guide
    WritePad(
        model = paths,
        guide = guide,
        check = progress.check,
        hint = hint,
        undoRequest = undo,
        clearRequest = clear,
        onResult = { verdict, index, total ->
            message = when (verdict) {
                StrokeVerdict.Ok -> if (index + 1 < total) "Good. Stroke ${index + 2} of $total" else ""
                StrokeVerdict.Reversed -> "Right shape, wrong direction. Start stroke ${index + 1} from the numbered end."
                StrokeVerdict.Miss -> "That doesn't match stroke ${index + 1}. Tap Hint to see where it goes."
            }
        },
        onDone = {
            onProgress(progress.wrote(letter.key))
            message = if (page.index + 1 < page.keys.size) "Well written! On to the next one." else "Well written! That's the whole set."
            if (page.index + 1 < page.keys.size) advance = true
        },
        modifier = Modifier.fillMaxWidth(),
    )
    Text(message)
    Row {
        TextButton(onClick = { play("clips/${letter.clip}", false) }) { Text("Play") }
        TextButton(onClick = { hint = !hint }) { Text("Hint") }
        TextButton(onClick = { undo++ }) { Text("Undo") }
        TextButton(onClick = { clear++ }) { Text("Clear") }
    }
    Row(verticalAlignment = Alignment.CenterVertically) {
        Checkbox(checked = progress.guide, onCheckedChange = { onProgress(progress.copy(guide = it)) }, enabled = !memory)
        Text("Guide")
        Checkbox(checked = progress.check, onCheckedChange = { onProgress(progress.copy(check = it)) })
        Text("Check my strokes")
    }
    Row {
        TextButton(onClick = { if (page.index > 0) onReplace(page.copy(index = page.index - 1, revealed = false)) }, enabled = page.index > 0) { Text("Prev") }
        TextButton(onClick = { if (page.index < page.keys.lastIndex) onReplace(page.copy(index = page.index + 1, revealed = false)) }, enabled = page.index < page.keys.lastIndex) { Text("Next") }
    }
}

@Composable
private fun WordsPage(
    bundle: KlingonBundle,
    font: FontFamily,
    text: String,
    play: (String, Boolean) -> Unit,
    onText: (String) -> Unit,
    onCopy: (String) -> Unit,
    onWrite: (List<String>) -> Unit,
) {
    Text("Type Klingon in the usual romanization. Capitals matter: q and Q are different letters. Lower-case d, h, i and s are read as D, H, I and S.")
    BasicTextField(
        value = text,
        onValueChange = onText,
        textStyle = TextStyle(color = MaterialTheme.colorScheme.onSurface, fontSize = 20.sp),
        cursorBrush = SolidColor(MaterialTheme.colorScheme.primary),
        modifier = Modifier.fillMaxWidth().background(MaterialTheme.colorScheme.surfaceVariant).padding(8.dp),
    )
    val spelling = transliterate(text, bundle.byKey)
    Glyph(spelling.text, font, 36)
    val letters = spelling.parts.filter { it.roman in bundle.byKey || it.roman in listOf(",", ".") }
    Text(buildString {
        if (letters.isNotEmpty()) append("${letters.size} characters: ${letters.joinToString(" · ") { it.roman }}")
        val ipa = klingonIpa(text, bundle.ipa).trim()
        if (ipa.isNotBlank()) append("\n/$ipa/")
        val bad = spelling.parts.filter { !it.known }.map { it.roman }.distinct()
        if (bad.isNotEmpty()) append("\nNot Klingon letters: ${bad.joinToString(" ")}")
    })
    val normalized = normalizeKlingon(text).trim()
    if (hasClip(normalized, bundle)) TextButton(onClick = { play("clips/${wordFile(normalized)}", false) }) { Text("Play") }
    Row {
        TextButton(onClick = { onCopy(spelling.text) }) { Text("Copy pIqaD text") }
        TextButton(onClick = {
            onWrite(spelling.parts.map { it.roman }.filter { it in bundle.byKey }.distinct())
        }) { Text("Write these letters") }
    }
    Text("Copied text uses the ConScript code points; it shows as pIqaD only where a pIqaD font is installed.")
    Text("Words to try", style = MaterialTheme.typography.titleMedium)
    bundle.words.forEach { word ->
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
            TextButton(onClick = { onText(word.written) }, modifier = Modifier.weight(1f)) {
                Glyph(transliterate(word.written, bundle.byKey).text, font, 22)
                Column {
                    Text(word.written)
                    Text("${word.meaning}  /${klingonIpa(word.written, bundle.ipa)}/", style = MaterialTheme.typography.bodySmall)
                }
            }
            TextButton(onClick = { play("clips/${wordFile(word.written)}", false) }) { Text("Play") }
        }
    }
}

@Composable
private fun SettingsPage(bundle: KlingonBundle, progress: KlingonProgress, font: FontFamily, save: (KlingonProgress) -> Unit, onReset: () -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Checkbox(checked = progress.voice, onCheckedChange = { save(progress.copy(voice = it)) })
        Text("Audio")
    }
    Text("pIqaD style")
    TextButton(onClick = { save(progress.copy(font = "hand")) }) { Text(if (progress.font == "hand") "• Handwriting" else "Handwriting") }
    TextButton(onClick = { save(progress.copy(font = "classic")) }) { Text(if (progress.font == "classic") "• Classic (blade)" else "Classic (blade)") }
    Glyph(transliterate("Qapla'", bundle.byKey).text, font, 36)
    Text("Stroke animation speed")
    listOf(55 to "Slow", 90 to "Normal", 150 to "Fast").forEach { (speed, label) ->
        TextButton(onClick = { save(progress.copy(speed = speed)) }) { Text(if (progress.speed == speed) "• $label" else label) }
    }
    Row(verticalAlignment = Alignment.CenterVertically) {
        Checkbox(checked = progress.check, onCheckedChange = { save(progress.copy(check = it)) })
        Text("Check strokes when writing")
    }
    Row(verticalAlignment = Alignment.CenterVertically) {
        Checkbox(checked = progress.showRoman, onCheckedChange = { save(progress.copy(showRoman = it)) })
        Text("Show romanization on tiles")
    }
    Text("Flashcard front")
    TextButton(onClick = { save(progress.copy(flashDir = "glyph")) }) { Text(if (progress.flashDir == "glyph") "• pIqaD" else "pIqaD") }
    TextButton(onClick = { save(progress.copy(flashDir = "sound")) }) { Text(if (progress.flashDir == "sound") "• Sound" else "Sound") }
    Text("Progress", style = MaterialTheme.typography.titleMedium)
    var confirmReset by remember { mutableStateOf(false) }
    TextButton(onClick = { confirmReset = true }) { Text("Reset progress") }
    if (confirmReset) {
        AlertDialog(
            onDismissRequest = { confirmReset = false },
            text = { Text("Clear all quiz and writing progress?") },
            confirmButton = {
                TextButton(onClick = {
                    confirmReset = false
                    onReset()
                }) { Text("OK") }
            },
            dismissButton = { TextButton(onClick = { confirmReset = false }) { Text("Cancel") } },
        )
    }
    Text("About", style = MaterialTheme.typography.titleMedium)
    Text(bundle.about.about)
}

private fun titleOf(page: Page, bundle: KlingonBundle): String = when (page) {
    Page.Home -> bundle.about.name
    is Page.Lesson -> bundle.lessons[page.index].title
    is Page.Detail -> bundle.byKey[page.key]?.label ?: "Letter"
    Page.Chart -> "Chart"
    is Page.Choose -> when (page.mode) {
        "quiz" -> "Quiz"
        "flash" -> "Flashcards"
        else -> "Writing practice"
    }
    is Page.QuizRun -> if (page.quiz.finished) "Quiz results" else "Question ${page.quiz.index + 1}"
    is Page.Flash -> "Flashcards"
    is Page.Write -> "Write ${bundle.byKey[page.keys.getOrNull(page.index)]?.label.orEmpty()}"
    is Page.Words -> "Write words"
    is Page.Article -> bundle.articles[page.index].title
    Page.Settings -> "Settings"
}

