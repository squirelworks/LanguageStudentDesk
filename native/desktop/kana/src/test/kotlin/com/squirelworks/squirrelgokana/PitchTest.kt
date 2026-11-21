package com.squirelworks.squirrelgokana

import kotlin.math.PI
import kotlin.math.sin
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class PitchTest {
    @Test
    fun normalSpeedLeavesTheSamplesAlone() {
        val tone = sine(frames = 2000, period = 80)
        assertEquals(tone.toList(), preservePitch(tone, 1, 22050, 1f).toList())
    }

    @Test
    fun aSlowerOrFasterClipKeepsTheSamePeriod() {
        val tone = sine(frames = 8000, period = 80)
        val slower = preservePitch(tone, 1, 22050, 0.6f)
        val faster = preservePitch(tone, 1, 22050, 1.2f)
        assertPeriod(slower, 80)
        assertPeriod(faster, 80)
        assertTrue(slower.size > tone.size * 1.4)
        assertTrue(faster.size < tone.size * 0.9)
    }

    @Test
    fun overlapDoesNotPunchHolesInASteadyTone() {
        val flat = ShortArray(4000) { 1000 }
        val stretched = preservePitch(flat, 1, 22050, 0.7f)
        assertTrue(stretched.size > flat.size)
        assertTrue(stretched.all { it in 900..1100 })
    }

    private fun sine(frames: Int, period: Int): ShortArray =
        ShortArray(frames) { i -> (sin(2.0 * PI * i / period) * 8000).toInt().toShort() }

    private fun assertPeriod(samples: ShortArray, expected: Int) {
        var bestLag = 0
        var best = Double.NEGATIVE_INFINITY
        for (lag in expected - 12..expected + 12) {
            var score = 0.0
            val limit = minOf(samples.size - lag, 2000)
            for (i in 0 until limit) score += samples[i] * samples[i + lag]
            if (score > best) {
                best = score
                bestLag = lag
            }
        }
        assertEquals(expected, bestLag)
    }
}
