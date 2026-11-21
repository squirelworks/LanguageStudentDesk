package com.squirelworks.lsd.dictionary

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.combinedClickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.input.key.Key
import androidx.compose.ui.input.key.KeyEventType
import androidx.compose.ui.input.key.key
import androidx.compose.ui.input.key.onPreviewKeyEvent
import androidx.compose.ui.input.key.type
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.intl.Locale
import androidx.compose.ui.text.intl.LocaleList
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.squirelworks.lsd.core.kana.Kana
import com.squirelworks.lsd.core.suite.KanaBack

internal val JedInk = Color(0xFF000000)
internal val JedPaper = Color.White
internal val JedGloss = Color(0xFFFF0000)
internal val JedSimple = Color(0xFF737373)
internal val JedSecondary = Color(0xFFBEBEBE)
internal val JedTag = Color(0xFF0000DD)
internal val JedPressed = Color(0xFFFF8C00)
internal val JedJapanese = LocaleList(Locale("ja"))

const val JAPANESE_VOICE_NOTICE =
    "No Japanese voice found. Install a Japanese text-to-speech voice in your system settings."

fun dictionaryBack(sheet: Boolean, overlays: Int, screens: Int): KanaBack = when {
    sheet -> KanaBack.CloseSheet
    overlays > 0 -> KanaBack.CloseDialog
    screens > 1 -> KanaBack.PreviousScreen
    else -> KanaBack.Exit
}

internal sealed interface DictScreen {
    data class Search(val scope: DictScope, val query: String) : DictScreen
    data object Menu : DictScreen
    data object Categories : DictScreen
    data class Details(val pos: Int, val note: String?) : DictScreen
    data class KanjiList(val query: String) : DictScreen
    data class KanjiPage(val character: String) : DictScreen
    data class Radicals(val preset: String?) : DictScreen
    data class KanaChart(val katakana: Boolean) : DictScreen
    data class Tags(val assignId: String?) : DictScreen
    data object Settings : DictScreen
    data object About : DictScreen
}

internal sealed interface DictOverlay {
    data object Notepad : DictOverlay
    data object Options : DictOverlay
    data class Items(val title: String, val items: List<Pair<String, () -> Unit>>) : DictOverlay
    data class Ask(val title: String, val value: String, val onOk: (String) -> Unit) : DictOverlay
    data class Confirm(val text: String, val yesToast: String?, val onYes: () -> Unit) : DictOverlay
}

@Composable
internal fun TitleBar(
    hint: String,
    query: String,
    editable: Boolean,
    atRoot: Boolean,
    right: String?,
    onLeft: () -> Unit,
    onRight: () -> Unit,
    onQuery: (String) -> Unit,
    onSubmit: (String) -> Unit,
) {
    Row(
        Modifier
            .fillMaxWidth()
            .background(Brush.verticalGradient(listOf(Color(0xFFC0C0C0), Color(0xFF505050))))
            .padding(4.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(4.dp),
    ) {
        JedButton(if (atRoot) "Menu" else "Back", onLeft)
        Box(Modifier.weight(1f).background(JedPaper).padding(horizontal = 8.dp, vertical = 8.dp)) {
            if (editable) {
                BasicTextField(
                    value = query,
                    onValueChange = onQuery,
                    singleLine = true,
                    textStyle = TextStyle(color = JedInk, fontSize = 18.sp, localeList = JedJapanese),
                    cursorBrush = SolidColor(JedPressed),
                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
                    keyboardActions = KeyboardActions(onSearch = { onSubmit(query) }),
                    modifier = Modifier.fillMaxWidth().onPreviewKeyEvent { event ->
                        if (event.key == Key.Enter && event.type == KeyEventType.KeyDown) {
                            onSubmit(query)
                            true
                        } else {
                            false
                        }
                    },
                    decorationBox = { inner ->
                        if (query.isEmpty()) Text(hint, color = Color(0xFF9A9A9A), fontSize = 18.sp)
                        inner()
                    },
                )
            } else {
                Text(hint, color = JedSimple, fontSize = 18.sp)
            }
        }
        if (right != null) JedButton(right, onRight)
    }
}

@Composable
internal fun JedButton(label: String, onClick: () -> Unit) {
    Text(
        label,
        color = JedInk,
        modifier = Modifier
            .background(Brush.verticalGradient(listOf(Color(0xFFFBFBFB), Color(0xFFCFCFCF))))
            .border(1.dp, Color(0xFF6F6F6F))
            .clickable(onClick = onClick)
            .padding(horizontal = 12.dp, vertical = 10.dp),
    )
}

@Composable
internal fun ResultRow(
    row: JedRow,
    note: String?,
    saved: JedSaved,
    onClick: () -> Unit,
    onMenu: () -> Unit,
) {
    val head = headOf(row)
    val reading = if (row.kanji.isNotEmpty()) row.kana.firstOrNull().orEmpty() else ""
    val gloss = row.senses.mapIndexed { i, sense ->
        (if (row.senses.size > 1) "(${i + 1}) " else "") + sense
    }.joinToString(" ")
    val tags = saved.lists.filterValues { words -> words.any { it.id == row.id } }.keys
    Column(Modifier.fillMaxWidth().pressMenu(onClick, onMenu).padding(horizontal = 12.dp, vertical = 10.dp)) {
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(head, color = JedPaper, fontSize = 22.sp, style = TextStyle(localeList = JedJapanese))
            if (reading.isNotEmpty()) Text("[$reading]", color = JedSecondary, style = TextStyle(localeList = JedJapanese))
            if (saved.romaji && row.kana.isNotEmpty()) Text(Kana.toRomaji(row.kana[0]), color = JedSimple)
        }
        Text(
            buildString {
                if (!note.isNullOrBlank()) append(note).append(' ')
                append(gloss)
            },
            color = JedGloss,
            maxLines = 3,
            overflow = TextOverflow.Ellipsis,
        )
        val pills = (if (row.common) listOf("common") else emptyList()) + tags
        if (pills.isNotEmpty()) {
            Row(horizontalArrangement = Arrangement.spacedBy(6.dp), modifier = Modifier.padding(top = 4.dp)) {
                pills.forEach { pill ->
                    Text(pill, color = JedTag, modifier = Modifier.background(Color(0xFF111111)).padding(horizontal = 6.dp, vertical = 2.dp))
                }
            }
        }
    }
}

@Composable
internal fun KanjiLine(character: String, kanji: JedKanji, onClick: () -> Unit, onMenu: () -> Unit = {}) {
    Row(
        Modifier.fillMaxWidth().pressMenu(onClick, onMenu).padding(horizontal = 12.dp, vertical = 8.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(character, color = JedPaper, fontSize = 32.sp, style = TextStyle(localeList = JedJapanese))
        Column(Modifier.weight(1f).padding(start = 12.dp)) {
            Text((kanji.on + kanji.kun).joinToString("、"), color = JedPaper, style = TextStyle(localeList = JedJapanese))
            Text(kanji.m.joinToString(", "), color = JedGloss)
        }
        Text("›", color = JedSecondary)
    }
}

@Composable
internal fun SectionLabel(title: String) {
    Text(title, color = JedSecondary, modifier = Modifier.fillMaxWidth().background(Color(0xFF111111)).padding(horizontal = 12.dp, vertical = 6.dp))
}

@Composable
internal fun MenuLine(title: String, desc: String, onClick: () -> Unit) {
    Column(Modifier.fillMaxWidth().clickable(onClick = onClick).padding(horizontal = 12.dp, vertical = 10.dp)) {
        Text(title, color = JedPaper)
        Text(desc, color = JedSimple)
    }
}

@Composable
internal fun NameValue(name: String, value: String) {
    Row(Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 6.dp)) {
        Text(name, color = JedSimple, modifier = Modifier.width(120.dp))
        Text(value, color = JedPaper, style = TextStyle(localeList = JedJapanese))
    }
}

@Composable
internal fun MoreLine(label: String, onClick: () -> Unit) {
    Text(label, color = JedPaper, modifier = Modifier.fillMaxWidth().clickable(onClick = onClick).padding(12.dp))
}

@Composable
internal fun StatusLine(message: String) {
    Text(message, color = JedSecondary, modifier = Modifier.padding(16.dp))
}

internal fun Modifier.pressMenu(onClick: () -> Unit, onMenu: () -> Unit): Modifier =
    combinedClickable(onClick = onClick, onLongClick = onMenu)
