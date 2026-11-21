package com.squirelworks.lsd.kana

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp

@Composable
internal fun GlyphText(
    text: String,
    style: TextStyle,
    vertical: Boolean,
    modifier: Modifier = Modifier,
    color: Color = Color.Unspecified,
) {
    if (!vertical) {
        Text(text, style = style, color = color, modifier = modifier)
        return
    }
    Column(modifier, horizontalAlignment = Alignment.CenterHorizontally) {
        text.forEach { ch ->
            if (!ch.isWhitespace()) Text(ch.toString(), style = style, color = color)
        }
    }
}

@Composable
internal fun FormsPage(
    script: KanaScript,
    onBack: () -> Unit,
    onOpen: (String) -> Unit,
) {
    val rows = script.lessons.filter { it.forms }.flatMap { lesson ->
        lesson.chars.filterNotNull().map { cell -> cell to letterForms(cell.g, script.nonJoining.orEmpty()) }
    }
    Column(Modifier.verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            TextButton(onClick = onBack) { Text("‹") }
            Text("Letter forms", style = MaterialTheme.typography.titleLarge, modifier = Modifier.weight(1f))
        }
        Text("Each letter takes a different shape depending on whether it joins the letter before it, the letter after it, both, or neither. Columns read right to left in the order you meet them in a word.")
        Row(Modifier.fillMaxWidth()) {
            listOf("Sound", "Alone", "Start", "Middle", "End").forEach { label ->
                Text(label, modifier = Modifier.weight(1f), style = MaterialTheme.typography.labelSmall)
            }
        }
        rows.forEach { (cell, forms) ->
            Row(
                Modifier.fillMaxWidth().clickable { onOpen(cell.g) }.padding(vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(cell.r, modifier = Modifier.weight(1f), style = MaterialTheme.typography.bodyMedium)
                listOf(forms.isolated, forms.initial, forms.medial, forms.final).forEach { shape ->
                    GlyphText(
                        shape,
                        MaterialTheme.typography.headlineSmall.forLang(script.lang),
                        script.vertical,
                        Modifier.weight(1f),
                    )
                }
            }
        }
    }
}

@Composable
internal fun BuilderPage(
    script: KanaScript,
    onBack: () -> Unit,
    onPlay: (String) -> Unit,
) {
    val builder = script.builder ?: return
    var initial by remember { mutableIntStateOf(0) }
    var medial by remember { mutableIntStateOf(0) }
    var finalIndex by remember { mutableIntStateOf(0) }
    val syllable = hangulSyllable(initial, medial, finalIndex)
    val roman = partRoman(builder.initials, initial) + partRoman(builder.medials, medial) + partRoman(builder.finals, finalIndex)
    val hint = listOfNotNull(
        partGlyph(builder.initials, initial).ifBlank { null },
        partGlyph(builder.medials, medial).ifBlank { null },
        partGlyph(builder.finals, finalIndex).ifBlank { null },
    ).joinToString(" + ")
    Column(Modifier.verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            TextButton(onClick = onBack) { Text("‹") }
            Text(builder.title, style = MaterialTheme.typography.titleLarge, modifier = Modifier.weight(1f))
        }
        GlyphText(syllable, MaterialTheme.typography.displayLarge.forLang(script.lang), script.vertical)
        Text(roman, style = MaterialTheme.typography.titleLarge)
        if (hint.isNotBlank()) Text(hint)
        Button(onClick = { onPlay(syllable) }) { Text("Play") }
        if (builder.note.isNotBlank()) Text(builder.note)
        PartRow("First consonant", builder.initials, initial, script) { initial = it }
        PartRow("Vowel", builder.medials, medial, script) { medial = it }
        PartRow("Final consonant (batchim)", builder.finals, finalIndex, script) { finalIndex = it }
    }
}

@Composable
private fun PartRow(
    title: String,
    parts: List<List<String>>,
    selected: Int,
    script: KanaScript,
    onPick: (Int) -> Unit,
) {
    Text(title, style = MaterialTheme.typography.titleMedium)
    parts.chunked(4).forEachIndexed { row, chunk ->
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(4.dp)) {
            chunk.forEachIndexed { column, part ->
                val index = row * 4 + column
                val label = part.getOrNull(0).orEmpty().ifBlank { "none" }
                val roman = part.getOrNull(1).orEmpty().ifBlank { "–" }
                val content: @Composable () -> Unit = {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        if (label == "none") Text(label) else GlyphText(label, MaterialTheme.typography.titleMedium.forLang(script.lang), script.vertical)
                        Text(roman, style = MaterialTheme.typography.labelSmall)
                    }
                }
                if (index == selected) {
                    Button(onClick = { onPick(index) }, modifier = Modifier.weight(1f)) { content() }
                } else {
                    OutlinedButton(onClick = { onPick(index) }, modifier = Modifier.weight(1f)) { content() }
                }
            }
        }
    }
}

private fun partGlyph(parts: List<List<String>>, index: Int): String = parts.getOrNull(index)?.getOrNull(0).orEmpty()

private fun partRoman(parts: List<List<String>>, index: Int): String = parts.getOrNull(index)?.getOrNull(1).orEmpty()
