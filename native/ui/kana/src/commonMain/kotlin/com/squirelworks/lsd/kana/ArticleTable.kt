package com.squirelworks.lsd.kana

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.Layout
import androidx.compose.ui.layout.Placeable
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.rememberTextMeasurer
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.unit.dp
import kotlin.math.max

// Column widths for one table. Each column is as wide as its widest cell.
// When that is wider than the page, earlier columns keep their width and the
// last column takes what remains so its text wraps.
fun articleColumnWidths(preferred: IntArray, maxWidth: Int, gap: Int): IntArray {
    if (preferred.isEmpty()) return IntArray(0)
    val gaps = gap * (preferred.size - 1).coerceAtLeast(0)
    val available = (maxWidth - gaps).coerceAtLeast(0)
    if (preferred.sum() <= available) return preferred.copyOf()
    val widths = preferred.copyOf()
    val others = widths.dropLast(1).sum()
    if (others >= available) {
        val lastMin = available / (widths.size + 1)
        val budget = (available - lastMin).coerceAtLeast(0)
        val scale = if (others == 0) 0f else budget.toFloat() / others
        for (i in 0 until widths.lastIndex) widths[i] = (widths[i] * scale).toInt()
        widths[widths.lastIndex] = (available - widths.dropLast(1).sum()).coerceAtLeast(0)
    } else {
        widths[widths.lastIndex] = available - others
    }
    return widths
}

@Composable
fun ArticleTable(
    rows: List<List<AnnotatedString>>,
    plays: List<String?> = emptyList(),
    onPlay: (String) -> Unit = {},
) {
    val measurer = rememberTextMeasurer()
    val style = MaterialTheme.typography.bodyLarge
    val gap = 8.dp
    Layout(
        modifier = Modifier.fillMaxWidth(),
        content = {
            rows.forEachIndexed { rowIndex, cells ->
                cells.forEach { Text(it, style = style) }
                val spoken = plays.getOrNull(rowIndex)
                if (spoken != null) {
                    TextButton(
                        onClick = { onPlay(spoken) },
                        modifier = Modifier.semantics { contentDescription = "Play $spoken" },
                    ) { Text("▶") }
                }
            }
        },
    ) { measurables, constraints ->
        val gapPx = gap.roundToPx()
        val colCount = rows.maxOfOrNull { it.size } ?: 0
        if (colCount == 0) return@Layout layout(0, 0) {}
        val preferred = IntArray(colCount)
        rows.forEach { cells ->
            cells.forEachIndexed { index, text ->
                val single = measurer.measure(
                    text,
                    style = style,
                    constraints = Constraints(maxWidth = Int.MAX_VALUE / 4),
                )
                preferred[index] = max(preferred[index], single.size.width)
            }
        }
        val hasPlay = plays.any { it != null }
        val reserved = if (hasPlay) gapPx + 48.dp.roundToPx() else 0
        val widths = articleColumnWidths(preferred, (constraints.maxWidth - reserved).coerceAtLeast(0), gapPx)
        val placeables = mutableListOf<Placeable>()
        var cursor = 0
        val rowHeights = IntArray(rows.size)
        rows.forEachIndexed { rowIndex, cells ->
            var height = 0
            cells.forEachIndexed { index, _ ->
                val width = widths[index].coerceAtLeast(0)
                val placeable = measurables[cursor].measure(Constraints(minWidth = width, maxWidth = width))
                placeables += placeable
                height = max(height, placeable.height)
                cursor++
            }
            if (plays.getOrNull(rowIndex) != null) {
                val placeable = measurables[cursor].measure(Constraints())
                placeables += placeable
                height = max(height, placeable.height)
                cursor++
            }
            rowHeights[rowIndex] = height
        }
        val height = rowHeights.sum() + gapPx * (rows.size - 1).coerceAtLeast(0)
        layout(constraints.maxWidth, height) {
            var y = 0
            var placed = 0
            rows.forEachIndexed { rowIndex, cells ->
                var x = 0
                cells.forEachIndexed { index, _ ->
                    placeables[placed].place(x, y)
                    x += widths[index] + gapPx
                    placed++
                }
                if (plays.getOrNull(rowIndex) != null) {
                    placeables[placed].place(x, y)
                    placed++
                }
                y += rowHeights[rowIndex] + gapPx
            }
        }
    }
}
