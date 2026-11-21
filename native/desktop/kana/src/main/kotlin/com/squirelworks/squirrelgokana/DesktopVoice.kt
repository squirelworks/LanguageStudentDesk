package com.squirelworks.squirrelgokana

import com.squirelworks.lsd.core.speech.NamedVoice
import com.squirelworks.lsd.core.speech.desktopSpeech
import com.squirelworks.lsd.core.speech.parseEspeakLanguages
import com.squirelworks.lsd.core.speech.parseSayVoices
import com.squirelworks.lsd.core.speech.parseWindowsVoices
import java.io.File

class DesktopVoice {
    private var process: Process? = null
    private var cancelDispatcher = false
    private val programs: Set<String> by lazy { speechPrograms() }
    private val macVoices: List<NamedVoice> by lazy { readVoices("say", "-v", "?") { parseSayVoices(it) } }
    private val windowsVoices: List<NamedVoice> by lazy {
        val dollar = '$'
        val script = "Add-Type -AssemblyName System.Speech; " +
            "(New-Object System.Speech.Synthesis.SpeechSynthesizer).GetInstalledVoices() | " +
            "ForEach-Object { ${dollar}_.VoiceInfo.Name + \"`t\" + ${dollar}_.VoiceInfo.Culture.Name }"
        val program = when {
            commandExists("powershell.exe") -> "powershell.exe"
            commandExists("powershell") -> "powershell"
            else -> return@lazy emptyList()
        }
        readVoices(program, "-NoProfile", "-NonInteractive", "-Command", script) { parseWindowsVoices(it) }
    }
    private val espeakLanguages: Set<String> by lazy {
        val program = when {
            commandExists("espeak-ng") -> "espeak-ng"
            commandExists("espeak") -> "espeak"
            else -> return@lazy emptySet()
        }
        readVoices(program, "--voices") { parseEspeakLanguages(it) }
    }

    fun speak(text: String, rate: Float, lang: String) {
        stop()
        val request = desktopSpeech(
            System.getProperty("os.name"),
            programs,
            text,
            rate,
            lang,
            macVoices,
            windowsVoices,
            espeakLanguages,
        ) ?: return
        val started = runCatching {
            ProcessBuilder(listOf(request.program) + request.args)
                .redirectOutput(ProcessBuilder.Redirect.DISCARD)
                .redirectError(ProcessBuilder.Redirect.DISCARD)
                .start()
        }.getOrNull() ?: return
        request.stdin?.let { words ->
            Thread {
                runCatching { started.outputStream.bufferedWriter().use { it.write(words) } }
            }.apply {
                isDaemon = true
                start()
            }
        }
        cancelDispatcher = request.cancelsSpeechDispatcher
        process = started
    }

    fun stop() {
        process?.let { runCatching { it.destroy() } }
        process = null
        if (!cancelDispatcher) return
        cancelDispatcher = false
        runCatching {
            ProcessBuilder("spd-say", "-C")
                .redirectOutput(ProcessBuilder.Redirect.DISCARD)
                .redirectError(ProcessBuilder.Redirect.DISCARD)
                .start()
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

    private fun <T> readVoices(vararg command: String, parse: (String) -> T): T {
        val empty = parse("")
        val text = runCatching {
            val started = ProcessBuilder(command.toList())
                .redirectError(ProcessBuilder.Redirect.DISCARD)
                .start()
            val output = started.inputStream.bufferedReader().readText()
            started.waitFor()
            output
        }.getOrDefault("")
        return parse(text)
    }
}
