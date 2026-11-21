package com.squirelworks.lsd.core.strokes

// Port of SquirrelGo-Apps/shared/strokes.js: path sampling and the check that
// a drawn stroke matches the model. Tests replay that file.
data class StrokePoint(val x: Double, val y: Double)

data class StrokeCompare(val forward: Double, val reversed: Double)

enum class StrokeVerdict { Ok, Reversed, Miss }

sealed interface StrokeSegment {
    data class Move(val x: Double, val y: Double) : StrokeSegment
    data class Line(val x: Double, val y: Double) : StrokeSegment
    data class Quad(val cx: Double, val cy: Double, val x: Double, val y: Double) : StrokeSegment
    data class Cubic(
        val c1x: Double,
        val c1y: Double,
        val c2x: Double,
        val c2y: Double,
        val x: Double,
        val y: Double,
    ) : StrokeSegment
}

object Strokes {
    fun segments(d: String): List<StrokeSegment> {
        val toks = TOKEN.findAll(d).map { it.value }.toList()
        val out = mutableListOf<StrokeSegment>()
        var i = 0
        var cmd = 'M'
        var cx = 0.0
        var cy = 0.0
        var startX = 0.0
        var startY = 0.0
        var ctrlX = 0.0
        var ctrlY = 0.0
        var prev = ' '
        fun command(token: String) = token.length == 1 && token[0].isLetter()
        fun num(): Double {
            if (i >= toks.size) error("Path is missing a number: $d")
            return toks[i++].toDouble()
        }
        while (i < toks.size) {
            if (command(toks[i])) cmd = toks[i++][0]
            val rel = cmd.isLowerCase()
            when (cmd.uppercaseChar()) {
                'Z' -> {
                    out += StrokeSegment.Line(startX, startY)
                    cx = startX
                    cy = startY
                    prev = 'Z'
                    if (i < toks.size && !command(toks[i])) break
                }
                'M' -> {
                    val x = num() + if (rel) cx else 0.0
                    val y = num() + if (rel) cy else 0.0
                    out += StrokeSegment.Move(x, y)
                    cx = x
                    cy = y
                    startX = x
                    startY = y
                    prev = 'M'
                    cmd = if (rel) 'l' else 'L'
                }
                'L' -> {
                    val x = num() + if (rel) cx else 0.0
                    val y = num() + if (rel) cy else 0.0
                    out += StrokeSegment.Line(x, y)
                    cx = x
                    cy = y
                    prev = 'L'
                }
                'H' -> {
                    val x = num() + if (rel) cx else 0.0
                    out += StrokeSegment.Line(x, cy)
                    cx = x
                    prev = 'L'
                }
                'V' -> {
                    val y = num() + if (rel) cy else 0.0
                    out += StrokeSegment.Line(cx, y)
                    cy = y
                    prev = 'L'
                }
                'Q' -> {
                    var qx = num()
                    var qy = num()
                    var x = num()
                    var y = num()
                    if (rel) {
                        qx += cx
                        qy += cy
                        x += cx
                        y += cy
                    }
                    out += StrokeSegment.Quad(qx, qy, x, y)
                    ctrlX = qx
                    ctrlY = qy
                    cx = x
                    cy = y
                    prev = 'Q'
                }
                'T' -> {
                    val reflected = prev == 'Q' || prev == 'T'
                    val qx = if (reflected) 2 * cx - ctrlX else cx
                    val qy = if (reflected) 2 * cy - ctrlY else cy
                    var x = num()
                    var y = num()
                    if (rel) {
                        x += cx
                        y += cy
                    }
                    out += StrokeSegment.Quad(qx, qy, x, y)
                    ctrlX = qx
                    ctrlY = qy
                    cx = x
                    cy = y
                    prev = 'T'
                }
                'C' -> {
                    var c1x = num()
                    var c1y = num()
                    var c2x = num()
                    var c2y = num()
                    var x = num()
                    var y = num()
                    if (rel) {
                        c1x += cx
                        c1y += cy
                        c2x += cx
                        c2y += cy
                        x += cx
                        y += cy
                    }
                    out += StrokeSegment.Cubic(c1x, c1y, c2x, c2y, x, y)
                    ctrlX = c2x
                    ctrlY = c2y
                    cx = x
                    cy = y
                    prev = 'C'
                }
                'S' -> {
                    val reflected = prev == 'C' || prev == 'S'
                    val c1x = if (reflected) 2 * cx - ctrlX else cx
                    val c1y = if (reflected) 2 * cy - ctrlY else cy
                    var c2x = num()
                    var c2y = num()
                    var x = num()
                    var y = num()
                    if (rel) {
                        c2x += cx
                        c2y += cy
                        x += cx
                        y += cy
                    }
                    out += StrokeSegment.Cubic(c1x, c1y, c2x, c2y, x, y)
                    ctrlX = c2x
                    ctrlY = c2y
                    cx = x
                    cy = y
                    prev = 'S'
                }
                else -> error("Unknown path command $cmd in $d")
            }
        }
        return out
    }

    fun points(d: String): List<StrokePoint> {
        val out = mutableListOf<StrokePoint>()
        var cur = StrokePoint(0.0, 0.0)
        for (seg in segments(d)) {
            when (seg) {
                is StrokeSegment.Move -> {
                    cur = StrokePoint(seg.x, seg.y)
                    out += cur
                }
                is StrokeSegment.Line -> {
                    cur = StrokePoint(seg.x, seg.y)
                    out += cur
                }
                is StrokeSegment.Quad -> {
                    val x0 = cur.x
                    val y0 = cur.y
                    for (s in 1..CURVE_SAMPLES) {
                        val t = s / CURVE_SAMPLES.toDouble()
                        val a = (1 - t) * (1 - t)
                        val b = 2 * (1 - t) * t
                        val c = t * t
                        out += StrokePoint(a * x0 + b * seg.cx + c * seg.x, a * y0 + b * seg.cy + c * seg.y)
                    }
                    cur = StrokePoint(seg.x, seg.y)
                }
                is StrokeSegment.Cubic -> {
                    val x0 = cur.x
                    val y0 = cur.y
                    for (s in 1..CURVE_SAMPLES) {
                        val t = s / CURVE_SAMPLES.toDouble()
                        val u = 1 - t
                        val a = u * u * u
                        val b = 3 * u * u * t
                        val c = 3 * u * t * t
                        val e = t * t * t
                        out += StrokePoint(
                            a * x0 + b * seg.c1x + c * seg.c2x + e * seg.x,
                            a * y0 + b * seg.c1y + c * seg.c2y + e * seg.y,
                        )
                    }
                    cur = StrokePoint(seg.x, seg.y)
                }
            }
        }
        return out
    }

    fun length(pts: List<StrokePoint>): Double {
        var len = 0.0
        for (i in 1 until pts.size) len += hypot(pts[i], pts[i - 1])
        return len
    }

    fun resample(pts: List<StrokePoint>, n: Int): List<StrokePoint> {
        if (pts.size == 1) return List(n) { pts[0] }
        val total = length(pts).takeIf { it != 0.0 } ?: 1.0
        val step = total / (n - 1)
        val out = mutableListOf(pts[0])
        var need = step
        var acc = 0.0
        var i = 1
        while (i < pts.size && out.size < n) {
            val a = pts[i - 1]
            val b = pts[i]
            val seg = hypot(b, a)
            while (seg > 0 && acc + seg >= need && out.size < n) {
                val t = (need - acc) / seg
                out += StrokePoint(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t)
                need += step
            }
            acc += seg
            i++
        }
        while (out.size < n) out += pts.last()
        return out
    }

    fun compare(drawn: List<StrokePoint>, d: String): StrokeCompare {
        val model = resample(points(d), SAMPLE)
        val user = resample(drawn, SAMPLE)
        return StrokeCompare(meanDist(user, model), meanDist(user.asReversed(), model))
    }

    fun judge(drawn: List<StrokePoint>, d: String): StrokeVerdict {
        val distances = compare(drawn, d)
        val limit = maxOf(11.0, minOf(16.0, length(points(d)) / 5.0))
        return when {
            distances.forward <= limit -> StrokeVerdict.Ok
            distances.reversed <= limit -> StrokeVerdict.Reversed
            else -> StrokeVerdict.Miss
        }
    }

    private fun meanDist(a: List<StrokePoint>, b: List<StrokePoint>): Double {
        var sum = 0.0
        for (i in a.indices) sum += hypot(a[i], b[i])
        return sum / a.size
    }

    private fun hypot(a: StrokePoint, b: StrokePoint): Double {
        val dx = a.x - b.x
        val dy = a.y - b.y
        return kotlin.math.sqrt(dx * dx + dy * dy)
    }

    private val TOKEN = Regex("""[MmLlHhVvCcSsQqTtZz]|-?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?""")
    private const val CURVE_SAMPLES = 12
    private const val SAMPLE = 24
}
