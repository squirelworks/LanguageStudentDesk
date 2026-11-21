package com.squirelworks.squirrelgokana

import javazoom.jl.decoder.Bitstream
import javazoom.jl.decoder.Decoder
import javazoom.jl.decoder.SampleBuffer
import java.io.InputStream
import java.util.concurrent.atomic.AtomicInteger
import javax.sound.sampled.AudioFormat
import javax.sound.sampled.AudioSystem
import javax.sound.sampled.SourceDataLine

// Speed changes the length of the clip and leaves the pitch where it was,
// the same way the WebView sets preservesPitch.
class Mp3ClipPlayer(private val open: (String) -> InputStream?) {
    @Volatile
    private var line: SourceDataLine? = null
    @Volatile
    private var worker: Thread? = null
    private val generation = AtomicInteger()

    fun stop() {
        generation.incrementAndGet()
        halt()
    }

    fun play(path: String, rate: Float) {
        val ticket = generation.incrementAndGet()
        halt()
        val stream = open(path) ?: return
        val speed = rate.coerceIn(0.4f, 2f)
        val thread = Thread {
            var out: SourceDataLine? = null
            try {
                val decoded = decode(stream, ticket) ?: return@Thread
                if (generation.get() != ticket || Thread.currentThread().isInterrupted) return@Thread
                val samples = preservePitch(decoded.samples, decoded.channels, decoded.sampleRate, speed)
                if (generation.get() != ticket || Thread.currentThread().isInterrupted) return@Thread
                val format = AudioFormat(decoded.sampleRate.toFloat(), 16, decoded.channels, true, false)
                val opened = AudioSystem.getSourceDataLine(format)
                opened.open(format)
                opened.start()
                out = opened
                if (generation.get() != ticket) return@Thread
                line = opened
                if (generation.get() != ticket) return@Thread
                val bytes = ByteArray(4096)
                var offset = 0
                while (offset < samples.size && !Thread.currentThread().isInterrupted && generation.get() == ticket) {
                    val count = minOf(bytes.size / 2, samples.size - offset)
                    for (i in 0 until count) {
                        val sample = samples[offset + i].toInt()
                        bytes[i * 2] = (sample and 0xff).toByte()
                        bytes[i * 2 + 1] = (sample shr 8 and 0xff).toByte()
                    }
                    opened.write(bytes, 0, count * 2)
                    offset += count
                }
                if (!Thread.currentThread().isInterrupted && generation.get() == ticket) opened.drain()
            } catch (_: Exception) {
            } finally {
                if (line === out) line = null
                runCatching { out?.stop() }
                runCatching { out?.close() }
                runCatching { stream.close() }
            }
        }
        thread.isDaemon = true
        worker = thread
        thread.start()
    }

    private fun decode(stream: InputStream, ticket: Int): Pcm? {
        val bitstream = Bitstream(stream)
        val decoder = Decoder()
        val parts = ArrayList<Short>()
        var channels = 1
        var sampleRate = 22050
        try {
            while (!Thread.currentThread().isInterrupted && generation.get() == ticket) {
                val header = bitstream.readFrame() ?: break
                val buffer = decoder.decodeFrame(header, bitstream) as SampleBuffer
                channels = buffer.channelCount.coerceAtLeast(1)
                sampleRate = buffer.sampleFrequency.coerceAtLeast(1)
                val frame = buffer.buffer
                for (i in 0 until buffer.bufferLength) parts.add(frame[i])
                bitstream.closeFrame()
            }
        } finally {
            runCatching { bitstream.close() }
        }
        if (parts.isEmpty()) return null
        return Pcm(parts.toShortArray(), channels, sampleRate)
    }

    private fun halt() {
        worker?.interrupt()
        val current = line
        line = null
        current?.let {
            runCatching { it.stop() }
            runCatching { it.close() }
        }
    }
}

private class Pcm(val samples: ShortArray, val channels: Int, val sampleRate: Int)
