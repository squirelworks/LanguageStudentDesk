package com.squirelworks.squirrelgokana

import com.squirelworks.lsd.core.speech.desktopSpeech
import java.io.File

class DesktopVoice {
    private var process: Process? = null
    private val available: Set<String> by lazy { speechPrograms() }

    fun speak(text: String, rate: Float, lang: String) {
        stop()
        val request = desktopSpeech(System.getProperty("os.name"), available, text, rate, lang) ?: return
        val started = ProcessBuilder(listOf(request.program) + request.args)
            .redirectOutput(ProcessBuilder.Redirect.DISCARD)
            .redirectError(ProcessBuilder.Redirect.DISCARD)
            .start()
        request.stdin?.let { words ->
            started.outputStream.bufferedWriter().use { it.write(words) }
        }
        process = started
    }

    fun stop() {
        process?.destroy()
        process = null
        if ("spd-say" in available) {
            runCatching {
                ProcessBuilder("spd-say", "-C")
                    .redirectOutput(ProcessBuilder.Redirect.DISCARD)
                    .redirectError(ProcessBuilder.Redirect.DISCARD)
                    .start()
            }
        }
    }

    private fun speechPrograms(): Set<String> {
        val names = listOf("espeak-ng", "espeak", "spd-say", "say", "powershell", "powershell.exe")
        return names.filter { commandExists(it) }.toSet()
    }

    private fun commandExists(name: String): Boolean {
        val finder = if (File.separatorChar == '\\') listOf("where", name) else listOf("which", name)
        return runCatching {
            ProcessBuilder(finder)
                .redirectOutput(ProcessBuilder.Redirect.DISCARD)
                .redirectError(ProcessBuilder.Redirect.DISCARD)
                .start()
                .waitFor() == 0
        }.getOrDefault(false)
    }
}
