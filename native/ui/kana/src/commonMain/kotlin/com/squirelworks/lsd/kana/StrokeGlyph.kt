package com.squirelworks.lsd.kana

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.runtime.withFrameMillis
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.dp
import com.squirelworks.lsd.core.strokes.StrokeSegment
import com.squirelworks.lsd.core.strokes.Strokes

fun strokePath(d: String, scale: Float): Path {
    val path = Path()
    for (seg in Strokes.segments(d)) {
        when (seg) {
            is StrokeSegment.Move -> path.moveTo((seg.x * scale).toFloat(), (seg.y * scale).toFloat())
            is StrokeSegment.Line -> path.lineTo((seg.x * scale).toFloat(), (seg.y * scale).toFloat())
            is StrokeSegment.Quad -> path.quadraticTo(
                (seg.cx * scale).toFloat(),
                (seg.cy * scale).toFloat(),
                (seg.x * scale).toFloat(),
                (seg.y * scale).toFloat(),
            )
            is StrokeSegment.Cubic -> path.cubicTo(
                (seg.c1x * scale).toFloat(),
                (seg.c1y * scale).toFloat(),
                (seg.c2x * scale).toFloat(),
                (seg.c2y * scale).toFloat(),
                (seg.x * scale).toFloat(),
                (seg.y * scale).toFloat(),
            )
        }
    }
    return path
}

@Composable
fun StrokeGlyph(
    paths: List<String>,
    play: Boolean,
    modifier: Modifier = Modifier,
    speed: Int = 70,
    box: Float = 100f,
    limit: Int = Int.MAX_VALUE,
    highlightLast: Boolean = false,
    guides: Boolean = false,
    sizeDp: Dp = 220.dp,
    replay: Int = 0,
) {
    val end = limit.coerceIn(0, paths.size)
    val lengths = remember(paths) { paths.map { Strokes.length(Strokes.points(it)) + 1.0 } }
    var shown by remember(paths, play, end, replay) { mutableFloatStateOf(if (play) 0f else end.toFloat()) }
    LaunchedEffect(paths, play, speed, end, replay) {
        if (!play) {
            shown = end.toFloat()
            return@LaunchedEffect
        }
        shown = 0f
        var last = 0L
        var index = 0
        var into = 0.0
        while (index < paths.size) {
            withFrameMillis { now ->
                val dt = if (last == 0L) 0.0 else (now - last) / 1000.0
                last = now
                into += dt * 90.0 * (speed.coerceAtLeast(1) / 70.0)
                val len = lengths[index]
                if (into >= len) {
                    into = 0.0
                    index++
                }
                shown = index + if (index < paths.size && len > 0) (into / len).toFloat() else 0f
            }
        }
    }
    Canvas(modifier.size(sizeDp)) {
        val scale = size.minDimension / box.coerceAtLeast(1f)
        if (guides) {
            drawLine(Color(0xFFD9D3C5), Offset(size.width / 2f, 0f), Offset(size.width / 2f, size.height), strokeWidth = 1f)
            drawLine(Color(0xFFD9D3C5), Offset(0f, size.height / 2f), Offset(size.width, size.height / 2f), strokeWidth = 1f)
        }
        val ink = Stroke(width = 7f, cap = StrokeCap.Round, join = StrokeJoin.Round)
        val ghost = if (highlightLast) paths.take(end) else paths
        ghost.forEach { drawPath(strokePath(it, scale), Color(0xFFD9D3C5), style = ink) }
        val full = shown.toInt().coerceIn(0, paths.size)
        val solidEnd = if (highlightLast && !play) (end - 1).coerceAtLeast(0) else full
        for (i in 0 until solidEnd) drawPath(strokePath(paths[i], scale), Color(0xFF2C2416), style = ink)
        if (highlightLast && !play && end > 0) {
            drawPath(strokePath(paths[end - 1], scale), Color(0xFF1F4F8A), style = ink)
        }
        val frac = shown - full
        if (full < paths.size && frac > 0f) {
            val len = (lengths[full] * scale).toFloat().coerceAtLeast(1f)
            drawPath(
                strokePath(paths[full], scale),
                Color(0xFF2C2416),
                style = Stroke(
                    width = ink.width,
                    cap = StrokeCap.Round,
                    join = StrokeJoin.Round,
                    pathEffect = PathEffect.dashPathEffect(floatArrayOf(len, len), len * (1f - frac)),
                ),
            )
        }
    }
}
