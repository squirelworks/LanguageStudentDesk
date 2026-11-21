package com.squirelworks.squirrelgokana

import javazoom.jl.decoder.Bitstream
import javazoom.jl.decoder.Decoder
import javazoom.jl.decoder.SampleBuffer
import java.io.InputStream
import java.util.concurrent.atomic.AtomicInteger
import javax.sound.sampled.AudioFormat
import javax.sound.sampled.AudioSystem
import javax.sound.sampled.SourceDataLine

// Desktop playback changes speed by changing the sample rate. Android keeps
// the pitch and changes only the speed.
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
        val thread = Thread {
            var out: SourceDataLine? = null
            var bitstream: Bitstream? = null
            try {
                bitstream = Bitstream(stream)
                val decoder = Decoder()
                while (!Thread.currentThread().isInterrupted && generation.get() == ticket) {
                    val header = bitstream.readFrame() ?: break
                    val buffer = decoder.decodeFrame(header, bitstream) as SampleBuffer
                    if (out == null) {
                        val format = AudioFormat(
                            buffer.sampleFrequency * rate.coerceIn(0.5f, 2f),
                            16,
                            buffer.channelCount,
                            true,
                            false,
                        )
                        val opened = AudioSystem.getSourceDataLine(format)
                        opened.open(format)
                        opened.start()
                        out = opened
                        if (generation.get() != ticket) break
                        line = opened
                        if (generation.get() != ticket) break
                    }
                    val samples = buffer.buffer
                    val count = buffer.bufferLength
                    val bytes = ByteArray(count * 2)
                    for (i in 0 until count) {
                        val sample = samples[i].toInt()
                        bytes[i * 2] = (sample and 0xff).toByte()
                        bytes[i * 2 + 1] = (sample shr 8 and 0xff).toByte()
                    }
                    out.write(bytes, 0, bytes.size)
                    bitstream.closeFrame()
                }
                if (!Thread.currentThread().isInterrupted && generation.get() == ticket) out?.drain()
            } catch (_: Exception) {
            } finally {
                if (line === out) line = null
                runCatching { out?.stop() }
                runCatching { out?.close() }
                runCatching { bitstream?.close() }
                runCatching { stream.close() }
            }
        }
        thread.isDaemon = true
        worker = thread
        thread.start()
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
