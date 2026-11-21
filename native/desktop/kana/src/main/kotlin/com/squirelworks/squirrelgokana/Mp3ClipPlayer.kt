package com.squirelworks.squirrelgokana

import javazoom.jl.decoder.Bitstream
import javazoom.jl.decoder.Decoder
import javazoom.jl.decoder.SampleBuffer
import java.io.InputStream
import javax.sound.sampled.AudioFormat
import javax.sound.sampled.AudioSystem
import javax.sound.sampled.SourceDataLine

// Desktop playback changes speed by changing the sample rate. Android keeps
// the pitch and changes only the speed.
class Mp3ClipPlayer(private val open: (String) -> InputStream?) {
    private var worker: Thread? = null
    private var line: SourceDataLine? = null

    fun stop() {
        worker?.interrupt()
        line?.stop()
        line?.close()
        line = null
    }

    fun play(path: String, rate: Float) {
        stop()
        val stream = open(path) ?: return
        worker = Thread {
            try {
                val bitstream = Bitstream(stream)
                val decoder = Decoder()
                var out: SourceDataLine? = null
                while (!Thread.currentThread().isInterrupted) {
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
                        out = AudioSystem.getSourceDataLine(format)
                        out.open(format)
                        out.start()
                        line = out
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
                if (!Thread.currentThread().isInterrupted) out?.drain()
                out?.stop()
                out?.close()
                bitstream.close()
            } catch (_: Exception) {
            } finally {
                runCatching { stream.close() }
            }
        }.also {
            it.isDaemon = true
            it.start()
        }
    }
}
