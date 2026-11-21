package com.squirelworks.squirrelgokana

import kotlin.math.PI
import kotlin.math.cos

// Time-stretch interleaved PCM so a faster or slower clip keeps its pitch.
// Overlap-add lines the next grain up with the one already written.
fun preservePitch(samples: ShortArray, channels: Int, sampleRate: Int, speed: Float): ShortArray {
    if (samples.isEmpty() || channels <= 0 || sampleRate <= 0) return samples
    val rate = speed.coerceIn(0.4f, 2f)
    if (rate in 0.99f..1.01f) return samples.copyOf()
    val frames = samples.size / channels
    if (frames < 2) return samples.copyOf()
    val window = (sampleRate * 35 / 1000).coerceIn(256, 4096)
    if (frames <= window) return samples.copyOf()
    val synthHop = window / 2
    val analysisHop = (synthHop * rate).toInt().coerceAtLeast(1)
    // One period of a 70 Hz voice, so a low voice can still line up at 0.42×.
    val seek = maxOf(synthHop / 2, sampleRate / 70)
    val outFrames = (frames / rate).toInt() + window
    val mixed = FloatArray(outFrames * channels)
    val weight = FloatArray(outFrames)
    val hann = FloatArray(window) { i -> (0.5 - 0.5 * cos(2.0 * PI * i / (window - 1))).toFloat() }

    fun add(source: Int, dest: Int) {
        val count = minOf(window, frames - source, outFrames - dest)
        for (i in 0 until count) {
            val scale = hann[i]
            val from = (source + i) * channels
            val to = (dest + i) * channels
            for (channel in 0 until channels) mixed[to + channel] += samples[from + channel] * scale
            weight[dest + i] += scale
        }
    }

    // The next grain is chosen to continue what was just written, but the
    // timeline itself advances by a fixed hop so the length stays 1/speed.
    var inputBase = 0
    var outputAt = 0
    add(0, 0)
    while (true) {
        val nextOut = outputAt + synthHop
        val nextBase = inputBase + analysisHop
        if (nextOut >= outFrames || nextBase >= frames) break
        var best = 0
        var bestScore = Double.NEGATIVE_INFINITY
        val compare = minOf(synthHop, frames - nextBase, outFrames - nextOut)
        if (compare <= 0) break
        var delta = -seek
        while (delta <= seek) {
            val candidate = nextBase + delta
            if (candidate >= 0 && candidate + compare <= frames) {
                var score = 0.0
                for (i in 0 until compare) {
                    score += mixed[(nextOut + i) * channels] * samples[(candidate + i) * channels]
                }
                if (score > bestScore) {
                    bestScore = score
                    best = delta
                }
            }
            delta++
        }
        inputBase = nextBase
        outputAt = nextOut
        add(nextBase + best, outputAt)
    }

    var start = 0
    var last = outFrames
    while (start < last && weight[start] == 0f) start++
    while (last > start && weight[last - 1] == 0f) last--
    val target = (frames / rate).toInt().coerceAtLeast(1)
    val end = minOf(last, start + target)
    val stretched = ShortArray((end - start) * channels)
    for (i in start until end) {
        val scale = weight[i]
        val at = (i - start) * channels
        for (channel in 0 until channels) {
            val value = if (scale > 0f) mixed[i * channels + channel] / scale else 0f
            stretched[at + channel] = value.toInt().coerceIn(-32768, 32767).toShort()
        }
    }
    return stretched
}
