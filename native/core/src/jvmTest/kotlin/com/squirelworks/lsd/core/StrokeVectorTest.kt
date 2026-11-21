package com.squirelworks.lsd.core

import com.squirelworks.lsd.core.strokes.StrokePoint
import com.squirelworks.lsd.core.strokes.StrokeVerdict
import com.squirelworks.lsd.core.strokes.Strokes
import kotlin.math.abs
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

class StrokeVectorTest {
    @Test
    fun geometryMatchesTheJavascript() {
        val vectors = json.decodeFromString<StrokeVectors>(
            javaClass.getResource("/stroke-vectors.json")!!.readText(),
        )
        for (c in vectors.points) assertClose(c.out, Strokes.points(c.input), c.input)
        for (c in vectors.resample) assertClose(c.out, Strokes.resample(Strokes.points(c.input), c.n), c.input)
        for (c in vectors.judge) {
            val drawn = c.drawn.map { StrokePoint(it[0], it[1]) }
            assertEquals(verdict(c.out), Strokes.judge(drawn, c.d), c.d)
        }
    }
}

private fun assertClose(expected: List<List<Double>>, actual: List<StrokePoint>, label: String) {
    assertEquals(expected.size, actual.size, label)
    for (i in expected.indices) {
        assertTrue(abs(expected[i][0] - actual[i].x) < 1e-6, label)
        assertTrue(abs(expected[i][1] - actual[i].y) < 1e-6, label)
    }
}

private fun verdict(name: String) = when (name) {
    "ok" -> StrokeVerdict.Ok
    "reversed" -> StrokeVerdict.Reversed
    "miss" -> StrokeVerdict.Miss
    else -> error(name)
}

@Serializable
private data class StrokeVectors(
    val points: List<PointCase>,
    val resample: List<ResampleCase>,
    val judge: List<JudgeCase>,
)

@Serializable
private data class PointCase(@SerialName("in") val input: String, val out: List<List<Double>>)

@Serializable
private data class ResampleCase(@SerialName("in") val input: String, val n: Int, val out: List<List<Double>>)

@Serializable
private data class JudgeCase(val d: String, val drawn: List<List<Double>>, val out: String)

private val json = Json { ignoreUnknownKeys = true }
