package com.squirelworks.lsd.kana

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import com.squirelworks.lsd.core.strokes.StrokePoint
import com.squirelworks.lsd.core.strokes.StrokeVerdict
import com.squirelworks.lsd.core.strokes.Strokes

@Composable
fun WritePad(
    model: List<String>,
    guide: Boolean,
    check: Boolean,
    hint: Boolean,
    undoRequest: Int,
    clearRequest: Int,
    onResult: (StrokeVerdict, Int, Int) -> Unit,
    onDone: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val freeMode = !check || model.isEmpty()
    var accepted by remember(model) { mutableIntStateOf(0) }
    var free by remember(model) { mutableStateOf(emptyList<List<StrokePoint>>()) }
    var drawing by remember(model) { mutableStateOf(emptyList<StrokePoint>()) }
    var rejected by remember(model) { mutableStateOf(emptyList<StrokePoint>()) }
    LaunchedEffect(undoRequest) {
        if (undoRequest == 0) return@LaunchedEffect
        if (freeMode && free.isNotEmpty()) free = free.dropLast(1)
        else accepted = (accepted - 1).coerceAtLeast(0)
    }
    LaunchedEffect(clearRequest) {
        if (clearRequest > 0) {
            accepted = 0
            free = emptyList()
            rejected = emptyList()
        }
    }
    Canvas(
        modifier
            .fillMaxWidth()
            .aspectRatio(1f)
            .pointerInput(model, check) {
                detectDragGestures(
                    onDragStart = { start ->
                        if (!freeMode && accepted >= model.size) return@detectDragGestures
                        rejected = emptyList()
                        drawing = listOf(toBox(start, size.width.toFloat(), size.height.toFloat()))
                    },
                    onDrag = { change, _ ->
                        if (drawing.isEmpty()) return@detectDragGestures
                        drawing = drawing + toBox(change.position, size.width.toFloat(), size.height.toFloat())
                    },
                    onDragEnd = {
                        val stroke = drawing
                        drawing = emptyList()
                        if (stroke.isEmpty()) return@detectDragGestures
                        if (freeMode) {
                            free = free + listOf(stroke)
                            return@detectDragGestures
                        }
                        val index = accepted
                        val verdict = Strokes.judge(stroke, model[index])
                        if (verdict == StrokeVerdict.Ok) {
                            accepted += 1
                            rejected = emptyList()
                            if (accepted == model.size) onDone()
                        } else {
                            rejected = stroke
                        }
                        onResult(verdict, index, model.size)
                    },
                    onDragCancel = { drawing = emptyList() },
                )
            },
    ) {
        val scale = size.minDimension / 100f
        fun drawModel(d: String, color: Color, width: Float) {
            drawPath(pathOf(d, scale), color, style = Stroke(width, cap = StrokeCap.Round, join = StrokeJoin.Round))
        }
        drawLine(Color(0xFFE1DACD), Offset(size.width / 2, 0f), Offset(size.width / 2, size.height), 1f)
        drawLine(Color(0xFFE1DACD), Offset(0f, size.height / 2), Offset(size.width, size.height / 2), 1f)
        if (guide) model.forEach { drawModel(it, Color(0x1A000000), 18f) }
        if (hint && check && accepted < model.size) drawModel(model[accepted], Color(0x668A1C1C), 18f)
        val ink = Stroke(width = 14f, cap = StrokeCap.Round, join = StrokeJoin.Round)
        if (!freeMode) {
            for (i in 0 until accepted) drawPath(pathOf(model[i], scale), Color(0xFF1A1A1A), style = ink)
        }
        free.forEach { drawPath(pointsPath(it, scale), Color(0xFF1A1A1A), style = ink) }
        if (rejected.isNotEmpty()) drawPath(pointsPath(rejected, scale), Color(0xFFB3261E), style = ink)
        if (drawing.isNotEmpty()) drawPath(pointsPath(drawing, scale), Color(0xFF8A1C1C), style = ink)
    }
}

private fun toBox(point: Offset, width: Float, height: Float) =
    StrokePoint((point.x / width) * 100.0, (point.y / height) * 100.0)

private fun pointsPath(points: List<StrokePoint>, scale: Float): Path {
    val path = Path()
    if (points.isEmpty()) return path
    path.moveTo(points[0].x.toFloat() * scale, points[0].y.toFloat() * scale)
    for (point in points.drop(1)) path.lineTo(point.x.toFloat() * scale, point.y.toFloat() * scale)
    return path
}

private fun pathOf(d: String, scale: Float): Path {
    val path = Path()
    val toks = Regex("""[MLQ]|-?[\d.]+""").findAll(d).map { it.value }.toList()
    var cmd: String? = null
    var i = 0
    while (i < toks.size) {
        if (toks[i].length == 1 && toks[i][0] in "MLQ") cmd = toks[i++]
        if (cmd == "Q") {
            path.quadraticTo(
                toks[i].toFloat() * scale,
                toks[i + 1].toFloat() * scale,
                toks[i + 2].toFloat() * scale,
                toks[i + 3].toFloat() * scale,
            )
            i += 4
        } else {
            val x = toks[i].toFloat() * scale
            val y = toks[i + 1].toFloat() * scale
            if (cmd == "M") path.moveTo(x, y) else path.lineTo(x, y)
            i += 2
        }
    }
    return path
}
