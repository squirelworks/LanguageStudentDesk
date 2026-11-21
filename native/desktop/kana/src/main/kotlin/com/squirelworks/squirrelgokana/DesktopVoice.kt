package com.squirelworks.squirrelgokana

import com.squirelworks.lsd.core.speech.VoiceProbe
import com.squirelworks.lsd.core.speech.captureProcessOutput
import com.squirelworks.lsd.core.speech.desktopSpeechFromProbe
import com.squirelworks.lsd.core.speech.parseEspeakLanguages
import com.squirelworks.lsd.core.speech.parseSayVoices
import com.squirelworks.lsd.core.speech.parseSpeechDispatcherVoices
import com.squirelworks.lsd.core.speech.parseWindowsVoices
import java.io.File
import java.util.concurrent.TimeUnit

private const val PROBE_TIMEOUT_SECONDS = 8L

class DesktopVoice {
    private var process: Process? = null
    private var cancelDispatcher = false

    @Volatile
    private var probe = VoiceProbe()
    private val probeLock = Any()

    init {
        listOf(
            Thread({ publishMac() }, "kana-say"),
            Thread({ publishWindows() }, "kana-windows"),
            Thread({ publishEspeakNg() }, "kana-espeak-ng"),
            Thread({ publishEspeak() }, "kana-espeak"),
            Thread({ publishDispatcher() }, "kana-spd-say"),
        ).forEach {
            it.isDaemon = true
            it.start()
        }
    }

    fun speak(text: String, rate: Float, lang: String) {
        val request = desktopSpeechFromProbe(System.getProperty("os.name"), text, rate, lang, probe) ?: return
        stop()
        val started = runCatching {
            val builder = ProcessBuilder(listOf(request.program) + request.args)
                .redirectOutput(ProcessBuilder.Redirect.DISCARD)
                .redirectError(ProcessBuilder.Redirect.DISCARD)
            request.environment.forEach { (key, value) -> builder.environment()[key] = value }
            builder.start()
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

    private fun publishMac() {
        val voices = runCatching {
            if (!commandExists("say")) emptyList()
            else readVoices(listOf("say", "-v", "?"), ::parseSayVoices)
        }.getOrDefault(emptyList())
        publish { it.copy(macVoices = voices) }
    }

    private fun publishWindows() {
        val program = when {
            commandExists("powershell.exe") -> "powershell.exe"
            commandExists("powershell") -> "powershell"
            else -> ""
        }
        val voices = runCatching {
            if (program.isEmpty()) emptyList()
            else readVoices(listOf(program, "-NoProfile", "-NonInteractive", "-Command", windowsListScript), ::parseWindowsVoices)
        }.getOrDefault(emptyList())
        publish { it.copy(windowsProgram = program, windowsVoices = voices) }
    }

    private fun publishEspeakNg() {
        val languages = runCatching {
            if (!commandExists("espeak-ng")) emptySet()
            else readVoices(listOf("espeak-ng", "--voices"), ::parseEspeakLanguages)
        }.getOrDefault(emptySet())
        publish { it.copy(espeakNgLanguages = languages) }
    }

    private fun publishEspeak() {
        val languages = runCatching {
            if (!commandExists("espeak")) emptySet()
            else readVoices(listOf("espeak", "--voices"), ::parseEspeakLanguages)
        }.getOrDefault(emptySet())
        publish { it.copy(espeakLanguages = languages) }
    }

    private fun publishDispatcher() {
        val voices = runCatching {
            if (!commandExists("spd-say")) emptyList()
            else readVoices(listOf("spd-say", "-L"), ::parseSpeechDispatcherVoices)
        }.getOrDefault(emptyList())
        publish { it.copy(dispatcherVoices = voices) }
    }

    private fun publish(update: (VoiceProbe) -> VoiceProbe) {
        synchronized(probeLock) {
            probe = update(probe)
        }
    }

    private fun commandExists(name: String): Boolean {
        val finder = if (File.separatorChar == '\\') listOf("where", name) else listOf("which", name)
        val started = runCatching {
            ProcessBuilder(finder)
                .redirectOutput(ProcessBuilder.Redirect.DISCARD)
                .redirectError(ProcessBuilder.Redirect.DISCARD)
                .start()
        }.getOrNull() ?: return false
        val done = runCatching { started.waitFor(PROBE_TIMEOUT_SECONDS, TimeUnit.SECONDS) }.getOrDefault(false)
        if (!done) {
            started.destroyForcibly()
            return false
        }
        return started.exitValue() == 0
    }

    private fun <T> readVoices(command: List<String>, parse: (String) -> T): T {
        val text = captureProcessOutput(command, PROBE_TIMEOUT_SECONDS) ?: return parse("")
        return parse(text)
    }
}

private const val windowsListScript =
    "Add-Type -AssemblyName System.Speech; " +
        "(New-Object System.Speech.Synthesis.SpeechSynthesizer).GetInstalledVoices() | " +
        "ForEach-Object { \$_.VoiceInfo.Name + \"`t\" + \$_.VoiceInfo.Culture.Name }"
