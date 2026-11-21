package com.squirelworks.lsd.kanji

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
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
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import com.squirelworks.lsd.core.languages.TextStore
import com.squirelworks.lsd.core.speech.SpeechOutcome
import com.squirelworks.lsd.core.suite.DictionaryLookup
import com.squirelworks.lsd.core.suite.SuiteApp
import com.squirelworks.lsd.core.suite.dictionaryLookup
import com.squirelworks.lsd.kana.EscapeBackEffect
import com.squirelworks.lsd.kana.PlatformBackHandler
import com.squirelworks.lsd.kana.StrokeGlyph
import com.squirelworks.lsd.kana.SuiteSheet
import com.squirelworks.lsd.kana.accentArgb
import com.squirelworks.lsd.kana.missingVoiceNotice
import com.squirelworks.lsd.kana.openSuiteApp
import kotlinx.coroutines.delay

private sealed interface Page {
    data object Home : Page
    data object Lessons : Page
    data class Lesson(val id: String) : Page
    data class Theme(val key: String) : Page
    data object Quizzes : Page
    data object Topics : Page
    data object Levels : Page
    data class Set(val title: String, val chars: List<String>) : Page
    data class Quiz(val quiz: KanjiQuiz) : Page
    data class Detail(
        val char: String,
        val tab: String = "details",
        val review: List<String> = emptyList(),
        val reviewIndex: Int = 0,
    ) : Page
    data object Onyomi : Page
    data class Group(val index: Int) : Page
    data object Dictionary : Page
}

private data class SideItem(val id: String, val label: String, val icon: String, val page: Page)

private val sideItems = listOf(
    SideItem("home", "Home", "家", Page.Home),
    SideItem("lessons", "Lessons", "学", Page.Lessons),
    SideItem("onyomi", "On-yomi Groups", "音", Page.Onyomi),
    SideItem("levels", "Quiz by JLPT level", "級", Page.Levels),
    SideItem("topics", "Quiz by topic", "題", Page.Topics),
    SideItem("dictionary", "Dictionary", "辞", Page.Dictionary),
)

private const val NEED_KANJI = "Need at least 4 kanji in this set to quiz."
private const val NEED_WORDS = "Not enough example words in this set for a word quiz."

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun KanjiApp(
    bundle: KanjiBundle,
    dark: Boolean,
    progressStore: TextStore?,
    initialQuery: String?,
    speak: (String, Float, String) -> SpeechOutcome,
    installedPackages: Set<String>? = null,
    onLaunchApp: (SuiteApp, String) -> Boolean = { _, _ -> false },
    onOpenUrl: (String) -> Unit = {},
    onStopAudio: () -> Unit = {},
) {
    var stack by remember { mutableStateOf(listOf<Page>(Page.Home)) }
    var drawer by remember { mutableStateOf(false) }
    var suiteOpen by remember { mutableStateOf(false) }
    var suiteNotice by remember { mutableStateOf("") }
    var toast by remember { mutableStateOf("") }
    var progress by remember { mutableStateOf(readKanjiProgress(progressStore)) }
    var dictQuery by remember { mutableStateOf("") }
    var dictLevel by remember { mutableStateOf("all") }
    var quizNote by remember { mutableStateOf("") }
    val page = stack.last()
    fun save(next: KanjiProgress) {
        progress = next
        writeKanjiProgress(progressStore, next)
    }
    fun push(next: Page) {
        quizNote = ""
        drawer = false
        if (stack.last() != next) stack = stack + next
    }
    fun replace(next: Page) {
        stack = stack.dropLast(1) + next
    }
    fun jump(next: Page) {
        quizNote = ""
        drawer = false
        stack = if (next == Page.Home) listOf(Page.Home) else listOf(Page.Home, next)
    }
    fun back() {
        onStopAudio()
        if (stack.size > 1) stack = stack.dropLast(1)
    }
    val backEnabled = suiteOpen || drawer || stack.size > 1
    fun performBack() {
        when {
            drawer -> drawer = false
            suiteOpen -> {
                suiteOpen = false
                suiteNotice = ""
            }
            stack.size > 1 -> back()
        }
    }
    PlatformBackHandler(backEnabled, ::performBack)
    EscapeBackEffect(backEnabled, ::performBack)
    LaunchedEffect(toast) {
        if (toast.isNotBlank()) {
            delay(4000)
            toast = ""
        }
    }
    LaunchedEffect(initialQuery) {
        val hit = firstKnownCharacter(initialQuery.orEmpty(), bundle.byChar.keys) ?: return@LaunchedEffect
        drawer = false
        val tab = if (bundle.strokes[hit]?.paths?.isNotEmpty() == true) "strokes" else "details"
        stack = listOf(Page.Home, Page.Detail(hit, tab))
    }
    fun say(text: String) {
        if (text.isBlank()) return
        onStopAudio()
        if (speak(text, 1f, "ja-JP") == SpeechOutcome.Missing) toast = missingVoiceNotice("Japanese")
    }
    fun lookup(text: String) {
        val app = bundle.suite?.apps?.firstOrNull { it.id == "dictionary" } ?: return
        fun follow(step: DictionaryLookup) {
            val browse = step as? DictionaryLookup.Browse ?: return
            if (browse.url.isNotBlank()) onOpenUrl(browse.url)
            if (browse.notice.isNotBlank()) toast = browse.notice
        }
        when (val step = dictionaryLookup(app, installedPackages)) {
            DictionaryLookup.None -> Unit
            DictionaryLookup.Launch -> if (!onLaunchApp(app, text)) follow(dictionaryLookup(app, emptySet()))
            is DictionaryLookup.Browse -> follow(step)
        }
    }
    fun startQuiz(title: String, chars: List<String>, mode: String) {
        when (val built = buildQuiz(title, chars, mode, bundle.byChar, bundle.words)) {
            QuizBuild.TooFewKanji -> quizNote = NEED_KANJI
            QuizBuild.TooFewWords -> quizNote = NEED_WORDS
            is QuizBuild.Ready -> {
                quizNote = ""
                push(Page.Quiz(built.quiz))
            }
        }
    }
    fun openReview(chars: List<String>) {
        val deck = uniqueText(chars).filter { it in bundle.byChar }
        val first = deck.firstOrNull() ?: return
        push(Page.Detail(first, "details", deck, 0))
    }
    val accent = accentArgb(bundle.accent)?.let { Color(it) }
    val colors = when {
        accent == null && dark -> darkColorScheme()
        accent == null -> lightColorScheme()
        dark -> darkColorScheme(primary = accent)
        else -> lightColorScheme(primary = accent)
    }
    val section = when (page) {
        Page.Home -> "home"
        Page.Lessons, is Page.Lesson, is Page.Theme -> "lessons"
        Page.Onyomi, is Page.Group -> "onyomi"
        Page.Levels, Page.Quizzes -> "levels"
        Page.Topics -> "topics"
        Page.Dictionary -> "dictionary"
        else -> ""
    }
    MaterialTheme(colorScheme = colors) {
        Box(Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background)) {
            BoxWithConstraints(Modifier.fillMaxSize().windowInsetsPadding(WindowInsets.safeDrawing)) {
                val wide = maxWidth >= 840.dp
                Row(Modifier.fillMaxSize()) {
                    if (wide) {
                        Sidebar(
                            section = section,
                            practiced = progress.seen.size,
                            onOpen = ::jump,
                            modifier = Modifier.width(240.dp).fillMaxHeight(),
                        )
                    }
                    Column(Modifier.weight(1f).fillMaxHeight()) {
                        TopBar(
                            title = titleOf(page, bundle),
                            subtitle = subtitleOf(page, bundle),
                            canBack = stack.size > 1,
                            onMenu = { drawer = !drawer },
                            onBack = ::back,
                            onApps = { suiteOpen = true },
                        )
                        Column(
                            Modifier.weight(1f).verticalScroll(rememberScrollState()).padding(16.dp),
                            verticalArrangement = Arrangement.spacedBy(12.dp),
                        ) {
                            when (val current = page) {
                                Page.Home -> HomePage(bundle, progress.seen.size, ::push)
                                Page.Lessons -> LessonsPage(bundle, ::push)
                                is Page.Lesson -> LessonPage(bundle, current.id, quizNote, ::push, ::startQuiz)
                                is Page.Theme -> ThemePage(bundle, current.key, quizNote, ::push, ::startQuiz, ::openReview)
                                Page.Quizzes -> QuizzesPage(bundle, ::push)
                                Page.Topics -> TopicsPage(bundle, ::push)
                                Page.Levels -> LevelsPage(bundle, ::push)
                                is Page.Set -> SetPage(bundle, current, quizNote, ::startQuiz, ::openReview)
                                is Page.Quiz -> QuizPage(
                                    current.quiz,
                                    onChoose = { choice ->
                                        val next = current.quiz.choose(choice)
                                        if (next != current.quiz) {
                                            save(progress.mark(current.quiz.questions[current.quiz.index].char))
                                            replace(Page.Quiz(next))
                                        }
                                    },
                                    onNext = { replace(Page.Quiz(current.quiz.advance())) },
                                    onRetry = {
                                        val again = buildQuiz(current.quiz.title, current.quiz.chars, current.quiz.mode, bundle.byChar, bundle.words)
                                        if (again is QuizBuild.Ready) replace(Page.Quiz(again.quiz))
                                    },
                                    onReview = { openReview(current.quiz.chars) },
                                    onCard = { push(Page.Detail(it)) },
                                    onHome = { jump(Page.Home) },
                                )
                                is Page.Detail -> DetailPage(
                                    bundle = bundle,
                                    page = current,
                                    onTab = { replace(current.copy(tab = it)) },
                                    onSpeak = ::say,
                                    onLookup = ::lookup,
                                    onStep = { delta ->
                                        if (current.review.isNotEmpty()) {
                                            val count = current.review.size
                                            val index = (current.reviewIndex + delta + count) % count
                                            replace(current.copy(char = current.review[index], reviewIndex = index))
                                        }
                                    },
                                    onOpenUrl = onOpenUrl,
                                )
                                Page.Onyomi -> OnyomiPage(bundle) { push(Page.Group(it)) }
                                is Page.Group -> GroupPage(bundle, current.index, quizNote, ::push, ::startQuiz, ::openReview)
                                Page.Dictionary -> DictionaryPage(bundle, dictQuery, dictLevel, { dictQuery = it }, { dictLevel = it }, ::push)
                            }
                        }
                    }
                }
                if (!wide && drawer) {
                    Box(Modifier.fillMaxSize().background(Color.Black.copy(alpha = 0.45f)).clickable { drawer = false })
                    Sidebar(
                        section = section,
                        practiced = progress.seen.size,
                        onOpen = ::jump,
                        modifier = Modifier
                            .width(240.dp)
                            .fillMaxHeight()
                            .align(Alignment.CenterStart)
                            .clickable(onClick = {}),
                    )
                }
            }
            if (suiteOpen && bundle.suite != null) {
                SuiteSheet(
                    file = bundle.suite,
                    selfId = "kanji",
                    installed = installedPackages,
                    notice = suiteNotice,
                    onOpen = { app ->
                        suiteNotice = openSuiteApp(app, installedPackages, { chosen -> onLaunchApp(chosen, "") }, onOpenUrl)
                    },
                    onUrl = onOpenUrl,
                    onClose = {
                        suiteOpen = false
                        suiteNotice = ""
                    },
                )
            }
            if (toast.isNotBlank()) {
                Text(
                    toast,
                    modifier = Modifier.align(Alignment.BottomCenter).padding(16.dp).background(MaterialTheme.colorScheme.inverseSurface).padding(12.dp),
                    color = MaterialTheme.colorScheme.inverseOnSurface,
                )
            }
        }
    }
}

@Composable
private fun Sidebar(section: String, practiced: Int, onOpen: (Page) -> Unit, modifier: Modifier) {
    Column(
        modifier.background(MaterialTheme.colorScheme.surfaceVariant).padding(12.dp).verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(4.dp),
    ) {
        Text("漢字  SquirrelGo Kanji", style = MaterialTheme.typography.titleMedium)
        sideItems.forEach { item ->
            val active = item.id == section
            TextButton(onClick = { onOpen(item.page) }, modifier = Modifier.fillMaxWidth()) {
                Text("${item.icon}  ${item.label}", color = if (active) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurface)
            }
        }
        Text("$practiced kanji practiced", style = MaterialTheme.typography.bodySmall)
    }
}

@Composable
private fun TopBar(
    title: String,
    subtitle: String,
    canBack: Boolean,
    onMenu: () -> Unit,
    onBack: () -> Unit,
    onApps: () -> Unit,
) {
    Row(Modifier.fillMaxWidth().padding(horizontal = 8.dp, vertical = 4.dp), verticalAlignment = Alignment.CenterVertically) {
        TextButton(onClick = onMenu) { Text("Menu") }
        if (canBack) TextButton(onClick = onBack) { Text("Back") }
        Column(Modifier.weight(1f)) {
            Text(title, style = MaterialTheme.typography.titleLarge)
            if (subtitle.isNotBlank()) Text(subtitle, style = MaterialTheme.typography.bodySmall)
        }
        TextButton(onClick = onApps) { Text("Apps") }
    }
}

@Composable
private fun HomePage(bundle: KanjiBundle, practiced: Int, open: (Page) -> Unit) {
    Text("Learn kanji at your own pace", style = MaterialTheme.typography.headlineSmall)
    Text("Lessons, packet quizzes, flashcard review, on-yomi groups, and a dictionary. $practiced characters practiced on this device.")
    listOf(
        "Lessons" to "Beginning kanji, radicals, reading skills, N4 path" to Page.Lessons,
        "On-yomi Groups" to "Shared readings and phonetic clusters" to Page.Onyomi,
        "Quizzes" to "By topic or JLPT level" to Page.Quizzes,
        "Dictionary" to "Search ${bundle.chars.size} Jōyō entries" to Page.Dictionary,
    ).forEach { (card, page) ->
        Surface(onClick = { open(page) }, modifier = Modifier.fillMaxWidth(), tonalElevation = 2.dp) {
            Column(Modifier.padding(12.dp)) {
                Text(card.first, style = MaterialTheme.typography.titleMedium)
                Text(card.second)
            }
        }
    }
    Text("Homage to the discontinued TenguGo Kanji workflow. Original lessons, open kanji data, not affiliated with TenguLogi.")
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun LessonsPage(bundle: KanjiBundle, open: (Page) -> Unit) {
    val sections = lessonSections(bundle.lessons.beginning)
    val first = sections.firstOrNull()
    if (first != null) {
        Text(first.name, style = MaterialTheme.typography.titleLarge)
        ListButton("How to use SquirrelGo Kanji") { open(Page.Lesson("how_to_use")) }
        first.lessons.forEach { lesson -> ListButton(lesson.title) { open(Page.Lesson(lesson.id)) } }
        Text("N5 themed packets", style = MaterialTheme.typography.titleMedium)
        bundle.catalog.beginning.forEach { (key, chars) ->
            ListButton("${themeLabels[key] ?: key} (${chars.size})") { open(Page.Theme(key)) }
        }
    }
    sections.drop(1).forEach { section ->
        Text(section.name, style = MaterialTheme.typography.titleLarge)
        sectionIntros[section.name]?.let { Text(it) }
        section.lessons.forEach { lesson -> ListButton(lesson.title) { open(Page.Lesson(lesson.id)) } }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun LessonPage(
    bundle: KanjiBundle,
    id: String,
    note: String,
    open: (Page) -> Unit,
    startQuiz: (String, List<String>, String) -> Unit,
) {
    val lesson = if (id == "how_to_use") bundle.lessons.howToUse
    else bundle.lessons.beginning.firstOrNull { it.id == id }
    if (lesson == null) {
        Text("That lesson is not in this copy.")
        return
    }
    lesson.body.forEach { Text(it) }
    val chars = lesson.chars.mapNotNull { bundle.byChar[it] }
    FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        chars.forEach { entry -> CharTile(entry.char, entry.info) { open(Page.Detail(entry.char)) } }
    }
    if (chars.size >= 4) {
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { startQuiz(lesson.title, lesson.chars, "meaning") }) { Text("Quiz: Meaning") }
            TextButton(onClick = { startQuiz(lesson.title, lesson.chars, "kun") }) { Text("Kun") }
            TextButton(onClick = { startQuiz(lesson.title, lesson.chars, "on") }) { Text("On") }
            TextButton(onClick = { startQuiz(lesson.title, lesson.chars, "words") }) { Text("Words") }
        }
    }
    if (note.isNotBlank()) Text(note)
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ThemePage(
    bundle: KanjiBundle,
    key: String,
    note: String,
    open: (Page) -> Unit,
    startQuiz: (String, List<String>, String) -> Unit,
    review: (List<String>) -> Unit,
) {
    val chars = bundle.catalog.beginning[key].orEmpty()
    val items = chars.mapNotNull { bundle.byChar[it] }
    val title = themeLabels[key] ?: key
    Text("${items.size} characters in this packet.")
    FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        items.forEach { entry -> CharTile(entry.char, entry.info) { open(Page.Detail(entry.char)) } }
    }
    QuizActions(title, chars, note, startQuiz, review, onLabel = "Complete / On quiz")
}

@Composable
private fun QuizzesPage(bundle: KanjiBundle, open: (Page) -> Unit) {
    ListButton("By topic") { open(Page.Topics) }
    ListButton("By JLPT level") { open(Page.Levels) }
    ListButton("JLPT 5 · Complete set") {
        open(Page.Set("JLPT 5 · Complete", bundle.catalog.levels["N5"].orEmpty()))
    }
}

@Composable
private fun TopicsPage(bundle: KanjiBundle, open: (Page) -> Unit) {
    bundle.catalog.topics.keys.sorted().forEach { topic ->
        val chars = bundle.catalog.topics[topic].orEmpty()
        ListButton("$topic (${chars.size})") { open(Page.Set(topic, chars)) }
    }
}

@Composable
private fun LevelsPage(bundle: KanjiBundle, open: (Page) -> Unit) {
    listOf("N5", "N4", "N3", "N2", "N1").forEach { level ->
        val chars = bundle.catalog.levels[level].orEmpty()
        ListButton("${levelLabel(level)} · ${chars.size}") { open(Page.Set("JLPT $level", chars)) }
    }
}

@Composable
private fun SetPage(
    bundle: KanjiBundle,
    page: Page.Set,
    note: String,
    startQuiz: (String, List<String>, String) -> Unit,
    review: (List<String>) -> Unit,
) {
    val count = page.chars.mapNotNull { bundle.byChar[it] }.size
    Text("$count characters available.")
    QuizActions(page.title, page.chars, note, startQuiz, review, onLabel = "Start on quiz", meaningLabel = "Start meaning quiz")
}

@Composable
private fun QuizActions(
    title: String,
    chars: List<String>,
    note: String,
    startQuiz: (String, List<String>, String) -> Unit,
    review: (List<String>) -> Unit,
    onLabel: String,
    meaningLabel: String = "Meaning quiz",
) {
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Button(onClick = { startQuiz(title, chars, "meaning") }) { Text(meaningLabel) }
        TextButton(onClick = { startQuiz(title, chars, "kun") }) { Text("Kun") }
        TextButton(onClick = { startQuiz(title, chars, "on") }) { Text(onLabel) }
        TextButton(onClick = { startQuiz(title, chars, "words") }) { Text("Words") }
        TextButton(onClick = { review(chars) }) { Text("Review") }
    }
    if (note.isNotBlank()) Text(note)
}

@Composable
private fun QuizPage(
    quiz: KanjiQuiz,
    onChoose: (String) -> Unit,
    onNext: () -> Unit,
    onRetry: () -> Unit,
    onReview: () -> Unit,
    onCard: (String) -> Unit,
    onHome: () -> Unit,
) {
    if (quiz.finished) {
        Text("Quiz complete", style = MaterialTheme.typography.headlineSmall)
        Text("${quiz.score} / ${quiz.questions.size}", style = MaterialTheme.typography.displaySmall)
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = onRetry) { Text("Try again") }
            TextButton(onClick = onReview) { Text("Review set") }
            TextButton(onClick = onHome) { Text("Home") }
        }
        return
    }
    val question = quiz.questions[quiz.index]
    Text("${quiz.index + 1} of ${quiz.questions.size}")
    Text(question.prompt)
    Text(
        question.shown.ifBlank { question.char },
        style = MaterialTheme.typography.displayMedium,
        textAlign = TextAlign.Center,
        modifier = Modifier.fillMaxWidth(),
    )
    if (quiz.answered && question.note.isNotBlank()) Text(question.note)
    question.options.forEach { option ->
        val color = when {
            !quiz.answered -> MaterialTheme.colorScheme.secondaryContainer
            option == question.answer -> Color(0xFF2E7D32)
            option == quiz.lastChoice -> Color(0xFFC62828)
            else -> MaterialTheme.colorScheme.secondaryContainer
        }
        val content = when {
            quiz.answered && (option == question.answer || option == quiz.lastChoice) -> Color.White
            else -> MaterialTheme.colorScheme.onSecondaryContainer
        }
        Button(
            onClick = { onChoose(option) },
            enabled = !quiz.answered,
            modifier = Modifier.fillMaxWidth(),
            colors = ButtonDefaults.buttonColors(
                containerColor = color,
                contentColor = content,
                disabledContainerColor = color,
                disabledContentColor = content,
            ),
        ) { Text(option) }
    }
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        TextButton(onClick = { onCard(question.char) }) { Text("Review card") }
        if (quiz.answered) Button(onClick = onNext) { Text("Next") }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun DetailPage(
    bundle: KanjiBundle,
    page: Page.Detail,
    onTab: (String) -> Unit,
    onSpeak: (String) -> Unit,
    onLookup: (String) -> Unit,
    onStep: (Int) -> Unit,
    onOpenUrl: (String) -> Unit,
) {
    val item = bundle.byChar[page.char] ?: run {
        Text("That kanji is not in this copy.")
        return
    }
    if (page.review.isNotEmpty()) Text("${page.reviewIndex + 1} of ${page.review.size}")
    val figure = bundle.strokes[item.char]
    if (figure != null && figure.paths.isNotEmpty()) {
        var replay by remember(item.char) { mutableIntStateOf(0) }
        Box(Modifier.clickable { replay++ }) {
            StrokeGlyph(figure.paths, play = true, box = 109f, guides = true, replay = replay)
            Text("Tap to replay", modifier = Modifier.align(Alignment.BottomCenter))
        }
    } else {
        Text(item.char, style = MaterialTheme.typography.displayLarge, modifier = Modifier.fillMaxWidth(), textAlign = TextAlign.Center)
    }
    Text(item.info, style = MaterialTheme.typography.titleLarge)
    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
        listOf("details" to "Details", "readings" to "Readings", "words" to "Words", "meta" to "Meta", "strokes" to "Strokes").forEach { (id, label) ->
            FilterChip(selected = page.tab == id, onClick = { onTab(id) }, label = { Text(label) })
        }
    }
    when (page.tab) {
        "readings" -> Readings(item)
        "words" -> WordsBlock(item, bundle, 8, onSpeak)
        "meta" -> {
            MetaRow("Strokes", item.strokes)
            MetaRow("Radical", item.radical)
            MetaRow("Frequency", "# ${item.frequency} (of ~2,500)")
            MetaRow("Grade", item.grade)
            MetaRow("JLPT", item.level)
        }
        "strokes" -> StrokePanel(figure, onOpenUrl)
        else -> {
            Readings(item)
            MetaRow("Meaning", item.info)
            MetaRow("Radical", item.radical)
            MetaRow("Strokes", item.strokes)
            MetaRow("JLPT", item.level)
            if (bundle.words[item.char].orEmpty().isNotEmpty()) {
                Text("Words", style = MaterialTheme.typography.titleMedium)
                WordsBlock(item, bundle, 2, onSpeak, sentence = false)
            }
        }
    }
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        TextButton(onClick = { onSpeak(item.char) }) { Text("Speak") }
        TextButton(onClick = { onLookup(item.char) }) { Text("Words in Dictionary") }
        if (page.review.isNotEmpty()) {
            TextButton(onClick = { onStep(-1) }) { Text("Previous") }
            TextButton(onClick = { onStep(1) }) { Text("Next") }
        }
    }
}

@Composable
private fun Readings(item: KanjiChar) {
    Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
        Column(Modifier.weight(1f)) {
            Text("On-yomi", style = MaterialTheme.typography.titleSmall)
            Text(item.on.ifBlank { item.roman }.ifBlank { "—" })
        }
        Column(Modifier.weight(1f)) {
            Text("Kun-yomi", style = MaterialTheme.typography.titleSmall)
            Text(item.kun.ifBlank { "—" })
        }
    }
}

@Composable
private fun WordsBlock(
    item: KanjiChar,
    bundle: KanjiBundle,
    limit: Int,
    onSpeak: (String) -> Unit,
    sentence: Boolean = true,
) {
    val words = bundle.words[item.char].orEmpty().take(limit)
    if (words.isEmpty()) Text("No common example words for this kanji.")
    words.forEach { word ->
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(word.written)
            Text(word.reading)
            Text(word.meaning, modifier = Modifier.weight(1f))
            TextButton(onClick = { onSpeak(word.reading) }) { Text("Play") }
        }
    }
    val line = bundle.sentences[item.char]
    if (sentence && line != null) {
        Text("Example sentence", style = MaterialTheme.typography.titleMedium)
        MarkedKanji(line.japanese, item.char)
        TextButton(onClick = { onSpeak(line.japanese) }) { Text("Play sentence") }
        Text(line.english)
        Text("Tatoeba sentence #${line.id} (CC BY 2.0 FR)", style = MaterialTheme.typography.bodySmall)
    }
}

@Composable
private fun MarkedKanji(text: String, kanji: String) {
    if (kanji.isEmpty() || !text.contains(kanji)) {
        Text(text)
        return
    }
    val parts = text.split(kanji)
    Text(
        buildAnnotatedString {
            parts.forEachIndexed { index, part ->
                append(part)
                if (index < parts.lastIndex) {
                    withStyle(SpanStyle(background = Color(0xFFFFF3B0), fontWeight = FontWeight.Bold)) {
                        append(kanji)
                    }
                }
            }
        },
    )
}

@Composable
private fun MetaRow(label: String, value: String) {
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
        Text(label)
        Text(value.ifBlank { "—" })
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun StrokePanel(figure: StrokeFigure?, onOpenUrl: (String) -> Unit) {
    if (figure == null || figure.paths.isEmpty()) {
        Text("No stroke-order data for this character.")
        return
    }
    var play by remember(figure) { mutableStateOf(true) }
    var replay by remember(figure) { mutableIntStateOf(0) }
    var step by remember(figure) { mutableIntStateOf(figure.paths.size) }
    var numbers by remember(figure) { mutableStateOf(false) }
    Box {
        StrokeGlyph(
            figure.paths,
            play = play,
            box = 109f,
            limit = if (play) figure.paths.size else step,
            guides = true,
            replay = replay,
        )
        if (numbers) {
            figure.labels.forEachIndexed { index, point ->
                if (point.size >= 2) {
                    Text(
                        "${index + 1}",
                        modifier = Modifier.offset(
                            x = (point[0] / 109f * 220f).dp,
                            y = (point[1] / 109f * 220f).dp,
                        ),
                        style = MaterialTheme.typography.labelSmall,
                    )
                }
            }
        }
    }
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        TextButton(onClick = {
            play = true
            replay++
        }) { Text("Play") }
        TextButton(onClick = {
            play = false
            step = if (step >= figure.paths.size) 1 else step + 1
        }) { Text("Next stroke") }
        TextButton(onClick = { numbers = !numbers }) { Text("Numbers") }
    }
    Text("${figure.paths.size} ${if (figure.paths.size == 1) "stroke" else "strokes"}")
    FlowRow(horizontalArrangement = Arrangement.spacedBy(4.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
        figure.paths.forEachIndexed { index, _ ->
            StrokeGlyph(
                figure.paths,
                play = false,
                box = 109f,
                limit = index + 1,
                highlightLast = true,
                guides = true,
                sizeDp = 56.dp,
            )
        }
    }
    TextButton(onClick = { onOpenUrl("https://kanjivg.tagaini.net") }) {
        Text("Stroke data: KanjiVG (CC BY-SA 3.0)")
    }
}

@Composable
private fun OnyomiPage(bundle: KanjiBundle, open: (Int) -> Unit) {
    Text("Characters that share a common Sino-Japanese reading. Tap a group to study.")
    onyomiList(bundle.groups).forEachIndexed { index, group ->
        ListButton("${group.reading} · ${group.chars.size} chars") { open(index) }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun GroupPage(
    bundle: KanjiBundle,
    index: Int,
    note: String,
    open: (Page) -> Unit,
    startQuiz: (String, List<String>, String) -> Unit,
    review: (List<String>) -> Unit,
) {
    val group = onyomiBySize(bundle.groups).getOrNull(index)
    if (group == null) {
        Text("That group is not in this copy.")
        return
    }
    val chars = group.chars.map { it.char }
    FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        group.chars.forEach { entry ->
            val meta = bundle.byChar[entry.char]?.info ?: entry.roman
            CharTile(entry.char, meta) { open(Page.Detail(entry.char)) }
        }
    }
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Button(onClick = { startQuiz(group.reading, chars, "on") }) { Text("Quiz this group") }
        TextButton(onClick = { startQuiz(group.reading, chars, "words") }) { Text("Word reading quiz") }
        TextButton(onClick = { review(chars) }) { Text("Review") }
    }
    if (note.isNotBlank()) Text(note)
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun DictionaryPage(
    bundle: KanjiBundle,
    query: String,
    level: String,
    onQuery: (String) -> Unit,
    onLevel: (String) -> Unit,
    open: (Page) -> Unit,
) {
    OutlinedTextField(
        value = query,
        onValueChange = onQuery,
        modifier = Modifier.fillMaxWidth(),
        label = { Text("Search character, meaning, or reading") },
        singleLine = true,
    )
    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
        listOf("all", "N5", "N4", "N3", "N2", "N1").forEach { chip ->
            FilterChip(
                selected = level == chip,
                onClick = { onLevel(chip) },
                label = { Text(if (chip == "all") "All" else chip) },
            )
        }
    }
    FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        dictionaryEntries(bundle.chars, query, level).forEach { entry ->
            CharTile(entry.char, entry.info) { open(Page.Detail(entry.char)) }
        }
    }
}

@Composable
private fun ListButton(label: String, onClick: () -> Unit) {
    TextButton(onClick = onClick, modifier = Modifier.fillMaxWidth()) {
        Text(label, modifier = Modifier.weight(1f))
        Text("›")
    }
}

@Composable
private fun CharTile(glyph: String, meta: String, onClick: () -> Unit) {
    Column(
        Modifier.width(104.dp).clickable(onClick = onClick).padding(4.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(glyph, style = MaterialTheme.typography.headlineMedium)
        Text(meta, style = MaterialTheme.typography.bodySmall, textAlign = TextAlign.Center, maxLines = 2)
    }
}

private fun titleOf(page: Page, bundle: KanjiBundle): String = when (page) {
    Page.Home -> "SquirrelGo Kanji"
    Page.Lessons -> "Lessons"
    is Page.Lesson -> lessonTitle(bundle, page.id)
    is Page.Theme -> themeLabels[page.key] ?: page.key
    Page.Quizzes -> "Quizzes"
    Page.Topics -> "By topic"
    Page.Levels -> "By JLPT level"
    is Page.Set -> page.title
    is Page.Quiz -> page.quiz.title
    is Page.Detail -> "Flashcards"
    Page.Onyomi -> "On-yomi Groups"
    is Page.Group -> onyomiBySize(bundle.groups).getOrNull(page.index)?.reading ?: "On-yomi Groups"
    Page.Dictionary -> "Kanji Dictionary"
}

private fun subtitleOf(page: Page, bundle: KanjiBundle): String = when (page) {
    Page.Home -> "TenguGo-style trainer · offline"
    is Page.Detail -> bundle.byChar[page.char]?.info.orEmpty()
    is Page.Group -> onyomiBySize(bundle.groups).getOrNull(page.index)?.note.orEmpty()
    else -> ""
}

private fun lessonTitle(bundle: KanjiBundle, id: String): String {
    if (id == "how_to_use") return bundle.lessons.howToUse.title.ifBlank { "How to use" }
    return bundle.lessons.beginning.firstOrNull { it.id == id }?.title ?: "Lesson"
}
