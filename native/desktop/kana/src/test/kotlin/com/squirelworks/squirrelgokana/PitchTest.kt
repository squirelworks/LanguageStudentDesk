package com.squirelworks.squirrelgokana

import kotlin.math.PI
import kotlin.math.abs
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
    fun aLowVoiceKeepsItsPitchAtTheSlowestSpeed() {
        val sampleRate = 22050
        val period = sampleRate / 100
        val tone = sine(frames = sampleRate * 2, period = period)
        val stretched = preservePitch(tone, 1, sampleRate, 0.42f)
        val heard = dominantPeriod(stretched, period / 2, period * 2)
        assertTrue(abs(heard - period) <= period / 50, "period $heard, expected $period")
    }

    @Test
    fun theLengthFollowsTheSpeed() {
        val tone = sine(frames = 22050, period = 80)
        val stretched = preservePitch(tone, 1, 22050, 0.7f)
        val expected = tone.size / 0.7
        assertTrue(kotlin.math.abs(stretched.size - expected) / expected < 0.02, "length ${stretched.size}, expected $expected")
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
        assertEquals(expected, dominantPeriod(samples, expected - 12, expected + 12))
    }

    private fun dominantPeriod(samples: ShortArray, minLag: Int, maxLag: Int): Int {
        var bestLag = minLag
        var best = Double.NEGATIVE_INFINITY
        for (lag in minLag..maxLag) {
            var score = 0.0
            val limit = minOf(samples.size - lag, 4000)
            if (limit <= 0) continue
            for (i in 0 until limit) score += samples[i] * samples[i + lag]
            if (score > best) {
                best = score
                bestLag = lag
            }
        }
        return bestLag
    }
}
