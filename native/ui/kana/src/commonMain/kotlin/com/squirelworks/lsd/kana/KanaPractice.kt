package com.squirelworks.lsd.kana

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import kotlinx.coroutines.delay
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.squirelworks.lsd.core.strokes.StrokeVerdict
import com.squirelworks.lsd.core.trainer.FlashDeck
import com.squirelworks.lsd.core.trainer.GlyphRef
import com.squirelworks.lsd.core.trainer.QuestionKind
import com.squirelworks.lsd.core.trainer.flashAgain
import com.squirelworks.lsd.core.trainer.questionKind
import com.squirelworks.lsd.core.trainer.quizChoices
import com.squirelworks.lsd.core.trainer.quizQueue
import kotlin.random.Random

fun lessonGlyphs(script: KanaScript, lessons: Set<Int>? = null): List<GlyphRef> =
    script.lessons.flatMapIndexed { index, lesson ->
        if (lessons != null && index !in lessons) emptyList()
        else lesson.chars.filterNotNull().map {
            GlyphRef("${script.id}|${it.g}", it.g, it.r, lesson.group.ifBlank { "Characters" })
        }
    }

fun cellOf(script: KanaScript, glyph: String): KanaCell? =
    script.lessons.flatMap { it.chars }.firstOrNull { it?.g == glyph }

fun spokenText(cell: KanaCell?): String = cell?.speak?.ifBlank { cell.g } ?: ""

fun plainArticle(html: String): String = html
    .replace(Regex("(?i)<br\\s*/?>"), "\n")
    .replace(Regex("(?i)</p>"), "\n\n")
    .replace(Regex("(?i)</li>"), "\n")
    .replace(Regex("(?i)<li>"), "• ")
    .replace(Regex("<[^>]+>"), "")
    .replace("&amp;", "&")
    .replace("&lt;", "<")
    .replace("&gt;", ">")
    .replace("&nbsp;", " ")
    .replace(Regex("\n{3,}"), "\n\n")
    .trim()

@Composable
fun ChooseScreen(
    script: KanaScript,
    mode: String,
    selected: Set<Int>,
    weakLessons: Set<Int>,
    weakCount: Int,
    kind: String,
    count: Int,
    canListen: Boolean,
    onToggle: (Int) -> Unit,
    onSet: (Set<Int>) -> Unit,
    onKind: (String) -> Unit,
    onCount: (Int) -> Unit,
    onStart: (Set<Int>, Boolean) -> Unit,
    onBack: () -> Unit,
) {
    val title = when (mode) {
        "flash" -> "Flashcards"
        "write" -> "Writing practice"
        else -> "Quiz"
    }
    var notice by remember { mutableStateOf("") }
    Column(Modifier.verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        TextButton(onClick = onBack) { Text("‹") }
        Text(title, style = MaterialTheme.typography.titleLarge)
        Text(script.title)
        Text("Characters", style = MaterialTheme.typography.titleMedium)
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedButton(onClick = { onSet(script.lessons.indices.toSet()) }) { Text("All") }
            OutlinedButton(onClick = { onSet(emptySet()) }) { Text("None") }
            if (weakCount > 0) {
                OutlinedButton(onClick = { onStart(weakLessons, true) }) { Text("Only the $weakCount to review") }
            }
        }
        script.lessons.forEachIndexed { index, lesson ->
            val preview = lesson.chars.filterNotNull().take(5).joinToString(" ") { it.g }
            Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
                Checkbox(checked = index in selected, onCheckedChange = { onToggle(index) })
                Column {
                    Text(lesson.title)
                    if (preview.isNotBlank()) Text(preview, style = MaterialTheme.typography.bodySmall)
                }
            }
        }
        if (mode == "quiz") {
            Text("Question type", style = MaterialTheme.typography.titleMedium)
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                kindButton("read", "See the character", kind, onKind)
                kindButton("pick", "See the sound", kind, onKind)
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                if (canListen) kindButton("listen", "Hear it", kind, onKind)
                kindButton("mix", "Mixed", kind, onKind)
            }
            Text("Questions", style = MaterialTheme.typography.titleMedium)
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf(10, 20, 0).forEach { n ->
                    val label = if (n == 0) "All selected" else n.toString()
                    val button: @Composable () -> Unit = { Text(label) }
                    if (count == n) Button(onClick = { onCount(n) }, content = { button() })
                    else OutlinedButton(onClick = { onCount(n) }, content = { button() })
                }
            }
        }
        if (notice.isNotBlank()) Text(notice)
        Button(onClick = {
            if (selected.isEmpty()) notice = "Pick at least one lesson."
            else onStart(selected, false)
        }, modifier = Modifier.fillMaxWidth()) { Text("Start") }
    }
}

@Composable
private fun kindButton(id: String, label: String, current: String, onKind: (String) -> Unit) {
    if (current == id) Button(onClick = { onKind(id) }) { Text(label) }
    else OutlinedButton(onClick = { onKind(id) }) { Text(label) }
}

private data class QuizRound(
    val queue: List<GlyphRef>,
    val index: Int,
    val right: Int,
    val missed: List<GlyphRef>,
    val choiceKey: String?,
    val kind: QuestionKind,
    val options: List<GlyphRef>,
)

@Composable
fun QuizScreen(
    script: KanaScript,
    items: List<GlyphRef>,
    requested: String,
    count: Int,
    canListen: Boolean,
    onSpeak: (GlyphRef) -> Unit,
    onAnswer: (GlyphRef, Boolean) -> Unit,
    onBack: () -> Unit,
) {
    val everyone = lessonGlyphs(script)
    fun ask(queue: List<GlyphRef>, index: Int, right: Int, missed: List<GlyphRef>, random: Random): QuizRound {
        if (index >= queue.size) return QuizRound(queue, index, right, missed, null, QuestionKind.Read, emptyList())
        val item = queue[index]
        val near = everyone.filter { it.group == item.group }
        val kind = questionKind(requested, canListen, random)
        return QuizRound(queue, index, right, missed, null, kind, quizChoices(item, near, everyone, random))
    }
    var round by remember(items, requested, count) {
        mutableStateOf(ask(quizQueue(items, count, Random.Default), 0, 0, emptyList(), Random.Default))
    }
    val current = round.queue.getOrNull(round.index)
    LaunchedEffect(round.index, round.kind, current?.key) {
        if (round.choiceKey == null && round.kind == QuestionKind.Listen && current != null) onSpeak(current)
    }
    Column(Modifier.verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        TextButton(onClick = onBack) { Text("‹") }
        if (current == null) {
            val pct = if (round.queue.isEmpty()) 0 else (100 * round.right) / round.queue.size
            Text("Quiz results", style = MaterialTheme.typography.titleLarge)
            Text("${round.right} / ${round.queue.size}", style = MaterialTheme.typography.headlineMedium)
            Text("$pct% correct")
            val missed = round.missed.distinctBy { it.key }
            if (missed.isEmpty()) Text("Perfect round.") else Text("Missed")
            missed.forEach { Text(it.glyph) }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                if (missed.isNotEmpty()) {
                    Button(onClick = { round = ask(missed, 0, 0, emptyList(), Random.Default) }) { Text("Retry missed") }
                }
                OutlinedButton(onClick = { round = ask(quizQueue(round.queue, 0, Random.Default), 0, 0, emptyList(), Random.Default) }) {
                    Text("Go again")
                }
            }
            return@Column
        }
        Text("Question ${round.index + 1} of ${round.queue.size} · ${round.right} right")
        when (round.kind) {
            QuestionKind.Read -> {
                Text(current.glyph, style = MaterialTheme.typography.displayMedium, textAlign = TextAlign.Center, modifier = Modifier.fillMaxWidth())
                Text("What sound is this?")
            }
            QuestionKind.Pick -> {
                Text(current.reading, style = MaterialTheme.typography.displayMedium, textAlign = TextAlign.Center, modifier = Modifier.fillMaxWidth())
                Text("Which character makes this sound?")
            }
            QuestionKind.Listen -> {
                Button(onClick = { onSpeak(current) }) { Text("Play again") }
                Text("Which character did you hear?")
            }
        }
        round.options.forEach { option ->
            val label = if (round.kind == QuestionKind.Read) option.reading else option.glyph
            Button(
                onClick = {
                    if (round.choiceKey != null) return@Button
                    val ok = option.key == current.key
                    onAnswer(current, ok)
                    round = round.copy(
                        choiceKey = option.key,
                        right = round.right + if (ok) 1 else 0,
                        missed = if (ok) round.missed else round.missed + current,
                    )
                },
                enabled = round.choiceKey == null,
                modifier = Modifier.fillMaxWidth(),
            ) { Text(label) }
        }
        if (round.choiceKey != null) {
            val cell = cellOf(script, current.glyph)
            val hint = cell?.hint?.takeIf { it.isNotBlank() }?.let { ": $it" }.orEmpty()
            val ipa = cell?.ipa?.takeIf { it.isNotBlank() }?.let { " /$it/" }.orEmpty()
            val ok = round.choiceKey == current.key
            Text((if (ok) "Correct." else "Not quite.") + " ${current.glyph} is ${current.reading}$ipa$hint")
            Button(onClick = {
                round = ask(round.queue, round.index + 1, round.right, round.missed, Random.Default)
            }) { Text(if (round.index + 1 < round.queue.size) "Next" else "See results") }
        }
    }
}

@Composable
fun FlashScreen(
    script: KanaScript,
    items: List<GlyphRef>,
    glyphFirst: Boolean,
    speed: Int,
    strokes: Map<String, List<String>>,
    onSpeak: (GlyphRef) -> Unit,
    onBack: () -> Unit,
) {
    var deck by remember(items) { mutableStateOf(FlashDeck(quizQueue(items, 0, Random.Default), 0, items.size, false)) }
    Column(Modifier.verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        TextButton(onClick = onBack) { Text("‹") }
        if (deck.cards.isEmpty()) {
            Text("Done", style = MaterialTheme.typography.headlineMedium)
            Text("You went through all ${deck.total} cards.")
            Button(onClick = { deck = FlashDeck(quizQueue(items, 0, Random.Default), 0, items.size, false) }) {
                Text("Shuffle and go again")
            }
            return@Column
        }
        val card = deck.cards.first()
        val cell = cellOf(script, card.glyph)
        Text("${deck.done + 1} of ${deck.total}")
        Text(
            if (!deck.shown || glyphFirst) card.glyph else card.reading,
            style = MaterialTheme.typography.displayMedium,
        )
        if (deck.shown) {
            if (glyphFirst) Text(listOf(card.reading, cell?.ipa?.let { "/$it/" }.orEmpty()).filter { it.isNotBlank() }.joinToString(" "))
            else Text(card.glyph, style = MaterialTheme.typography.displayMedium)
            if (!cell?.hint.isNullOrBlank()) Text(cell.hint)
            if (!cell?.ex.isNullOrBlank()) {
                Text(cell.ex, style = MaterialTheme.typography.titleMedium)
                Text(listOf(cell.exR, cell.exM).filter { it.isNotBlank() }.joinToString(" · "))
            }
            val paths = strokes[card.glyph].orEmpty()
            if (!glyphFirst && paths.isNotEmpty()) StrokeGlyph(paths, true, speed = speed)
        }
        Button(onClick = { onSpeak(card) }) { Text("Play") }
        if (!deck.shown) {
            Button(onClick = { deck = deck.copy(shown = true) }, modifier = Modifier.fillMaxWidth()) { Text("Show answer") }
        } else {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedButton(onClick = { deck = deck.copy(cards = flashAgain(deck.cards, Random.Default), shown = false) }) { Text("Again") }
                Button(onClick = { deck = deck.copy(cards = deck.cards.drop(1), done = deck.done + 1, shown = false) }) { Text("Got it") }
            }
        }
    }
}

@Composable
fun WriteScreen(
    script: KanaScript,
    items: List<GlyphRef>,
    start: Int,
    strokes: Map<String, List<String>>,
    guide: Boolean,
    check: Boolean,
    speed: Int,
    onToggleGuide: () -> Unit,
    onToggleCheck: () -> Unit,
    onSpeak: (GlyphRef) -> Unit,
    onBack: () -> Unit,
) {
    var index by remember(items, start) { mutableIntStateOf(start.coerceIn(0, (items.size - 1).coerceAtLeast(0))) }
    var part by remember(items, start) { mutableIntStateOf(0) }
    var message by remember { mutableStateOf("") }
    var undo by remember { mutableIntStateOf(0) }
    var clear by remember { mutableIntStateOf(0) }
    var hint by remember { mutableStateOf(false) }
    var watch by remember { mutableStateOf(false) }
    var advance by remember { mutableStateOf(false) }
    fun partsOf(at: Int) = items[at].glyph.split(" ").filter { strokes[it].orEmpty().isNotEmpty() }
    LaunchedEffect(advance) {
        if (!advance) return@LaunchedEffect
        delay(1100)
        advance = false
        val step = com.squirelworks.lsd.core.trainer.stepWrite(index, part, partsOf(index).size, { partsOf(it).size }, items.size, 1)
        index = step.first
        part = step.second
        message = ""
    }
    if (items.isEmpty()) {
        Column {
            TextButton(onClick = onBack) { Text("‹") }
            Text("Nothing to write.")
        }
        return
    }
    val item = items[index]
    val parts = partsOf(index)
    val model = parts.getOrNull(part)?.let { strokes[it].orEmpty() }.orEmpty()
    Column(Modifier.verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        TextButton(onClick = onBack) { Text("‹") }
        Text("Write ${item.reading}", style = MaterialTheme.typography.titleLarge)
        Text("${script.title} · ${index + 1} of ${items.size}")
        if (parts.isEmpty()) {
            Text(item.glyph, style = MaterialTheme.typography.displayMedium)
            if (cellOf(script, item.glyph)?.hint?.isNotBlank() == true) Text(cellOf(script, item.glyph)!!.hint)
            WritePad(emptyList(), guide, false, false, undo, clear, { _, _, _ -> }, {})
        } else {
            val ch = parts[part.coerceIn(0, parts.lastIndex)]
            if (watch) StrokeGlyph(model, true, speed = speed)
            Text("$ch · ${model.size} stroke" + if (model.size == 1) "" else "s")
            if (parts.size > 1) {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    parts.forEachIndexed { i, letter ->
                        if (i == part) Button(onClick = { part = i }) { Text(letter) }
                        else OutlinedButton(onClick = { part = i }) { Text(letter) }
                    }
                }
            }
            WritePad(
                model = model,
                guide = guide,
                check = check,
                hint = hint,
                undoRequest = undo,
                clearRequest = clear,
                onResult = { verdict, stroke, total ->
                    message = when (verdict) {
                        StrokeVerdict.Ok -> if (stroke + 1 < total) "Good. Stroke ${stroke + 2} of $total" else ""
                        StrokeVerdict.Reversed -> "Right shape, wrong direction. Start stroke ${stroke + 1} from the numbered end."
                        StrokeVerdict.Miss -> "That doesn't match stroke ${stroke + 1}. Tap Hint to see where it goes."
                    }
                },
                onDone = {
                    val last = index + 1 >= items.size && part + 1 >= parts.size
                    message = if (last) "Well written! That's the whole set." else "Well written! On to the next one."
                    advance = !last
                },
            )
            Text(if (check) message.ifBlank { "Stroke 1 of ${model.size}" } else "Free drawing: strokes are not checked")
        }
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            if (model.isNotEmpty()) {
                OutlinedButton(onClick = { watch = !watch }) { Text("Watch") }
                OutlinedButton(onClick = { hint = !hint }) { Text("Hint") }
            }
            OutlinedButton(onClick = { undo += 1 }) { Text("Undo") }
            OutlinedButton(onClick = { clear += 1; message = "" }) { Text("Clear") }
            Button(onClick = { onSpeak(item) }) { Text("Play") }
        }
        Row {
            TextButton(onClick = onToggleGuide) { Text(if (guide) "Hide guide" else "Show guide") }
            TextButton(onClick = onToggleCheck) { Text(if (check) "Check my strokes" else "Do not check strokes") }
        }
        Row {
            val atStart = index <= 0 && part <= 0
            val atEnd = index >= items.size - 1 && (parts.isEmpty() || part >= parts.size - 1)
            TextButton(
                onClick = {
                    val step = com.squirelworks.lsd.core.trainer.stepWrite(index, part, parts.size, { partsOf(it).size }, items.size, -1)
                    index = step.first
                    part = step.second
                    message = ""
                },
                enabled = !atStart,
            ) { Text("‹ Prev") }
            TextButton(
                onClick = {
                    val step = com.squirelworks.lsd.core.trainer.stepWrite(index, part, parts.size, { partsOf(it).size }, items.size, 1)
                    index = step.first
                    part = step.second
                    message = ""
                },
                enabled = !atEnd,
            ) { Text("Next ›") }
        }
        if (script.writeTip.isNotBlank()) Text(script.writeTip)
    }
}

@Composable
fun ArticleScreen(title: String, body: String, onBack: () -> Unit) {
    Column(Modifier.verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        TextButton(onClick = onBack) { Text("‹") }
        Text(title, style = MaterialTheme.typography.titleLarge)
        Text(plainArticle(body))
    }
}

@Composable
fun SettingsScreen(
    voice: Boolean,
    rate: Float,
    showRoman: Boolean,
    flashGlyph: Boolean,
    guide: Boolean,
    check: Boolean,
    speed: Int,
    scripts: List<KanaScript>,
    about: String,
    onVoice: (Boolean) -> Unit,
    onRate: (Float) -> Unit,
    onRoman: (Boolean) -> Unit,
    onFlash: (Boolean) -> Unit,
    onGuide: (Boolean) -> Unit,
    onCheck: (Boolean) -> Unit,
    onSpeed: (Int) -> Unit,
    onReset: (KanaScript) -> Unit,
    onBack: () -> Unit,
) {
    var pending by remember { mutableStateOf<KanaScript?>(null) }
    Column(Modifier.verticalScroll(rememberScrollState()).padding(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        TextButton(onClick = onBack) { Text("‹") }
        Text("Settings", style = MaterialTheme.typography.titleLarge)
        TextButton(onClick = { onVoice(!voice) }) { Text(if (voice) "Audio on" else "Audio off") }
        Text("Speech speed")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            rateButton(0.7f, "Slower", rate, onRate)
            rateButton(1f, "Normal", rate, onRate)
            rateButton(1.2f, "Faster", rate, onRate)
        }
        TextButton(onClick = { onRoman(!showRoman) }) { Text(if (showRoman) "Romanization on tiles" else "Romanization hidden") }
        Text("Stroke animation speed")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            speedButton(40, "Slow", speed, onSpeed)
            speedButton(70, "Normal", speed, onSpeed)
            speedButton(110, "Fast", speed, onSpeed)
        }
        TextButton(onClick = { onCheck(!check) }) { Text(if (check) "Check strokes when writing" else "Do not check strokes") }
        TextButton(onClick = { onGuide(!guide) }) { Text(if (guide) "Writing guide on" else "Writing guide off") }
        TextButton(onClick = { onFlash(!flashGlyph) }) { Text(if (flashGlyph) "Flashcard front: character" else "Flashcard front: sound") }
        Text("Progress", style = MaterialTheme.typography.titleMedium)
        scripts.forEach { script ->
            OutlinedButton(onClick = { pending = script }) { Text("Reset ${script.title}") }
        }
        if (about.isNotBlank()) {
            Text("About", style = MaterialTheme.typography.titleMedium)
            Text(about)
        }
    }
    pending?.let { script ->
        AlertDialog(
            onDismissRequest = { pending = null },
            title = { Text("Clear quiz progress for ${script.title}?") },
            confirmButton = {
                TextButton(onClick = { onReset(script); pending = null }) { Text("Clear") }
            },
            dismissButton = { TextButton(onClick = { pending = null }) { Text("Cancel") } },
        )
    }
}

@Composable
private fun rateButton(value: Float, label: String, current: Float, onRate: (Float) -> Unit) {
    if (current == value) Button(onClick = { onRate(value) }) { Text(label) }
    else OutlinedButton(onClick = { onRate(value) }) { Text(label) }
}

@Composable
private fun speedButton(value: Int, label: String, current: Int, onSpeed: (Int) -> Unit) {
    if (current == value) Button(onClick = { onSpeed(value) }) { Text(label) }
    else OutlinedButton(onClick = { onSpeed(value) }) { Text(label) }
}
