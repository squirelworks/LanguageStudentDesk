package com.squirelworks.lsd.core.strokes

// Port of SquirrelGo-Apps/shared/strokes.js: path sampling and the check that
// a drawn stroke matches the model. Tests replay that file.
data class StrokePoint(val x: Double, val y: Double)

data class StrokeCompare(val forward: Double, val reversed: Double)

enum class StrokeVerdict { Ok, Reversed, Miss }

object Strokes {
    fun points(d: String): List<StrokePoint> {
        val toks = TOKEN.findAll(d).map { it.value }.toList()
        val out = mutableListOf<StrokePoint>()
        var cmd: String? = null
        var cur: StrokePoint? = null
        var i = 0
        while (i < toks.size) {
            if (toks[i].length == 1 && toks[i][0] in "MLQ") cmd = toks[i++]
            if (cmd == "Q") {
                val cx = toks[i].toDouble()
                val cy = toks[i + 1].toDouble()
                val x = toks[i + 2].toDouble()
                val y = toks[i + 3].toDouble()
                val x0 = cur!!.x
                val y0 = cur.y
                for (s in 1..CURVE_SAMPLES) {
                    val t = s / CURVE_SAMPLES.toDouble()
                    val a = (1 - t) * (1 - t)
                    val b = 2 * (1 - t) * t
                    val c = t * t
                    out += StrokePoint(a * x0 + b * cx + c * x, a * y0 + b * cy + c * y)
                }
                cur = StrokePoint(x, y)
                i += 4
            } else {
                cur = StrokePoint(toks[i].toDouble(), toks[i + 1].toDouble())
                out += cur
                i += 2
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

    private val TOKEN = Regex("""[MLQ]|-?[\d.]+""")
    private const val CURVE_SAMPLES = 12
    private const val SAMPLE = 24
}
