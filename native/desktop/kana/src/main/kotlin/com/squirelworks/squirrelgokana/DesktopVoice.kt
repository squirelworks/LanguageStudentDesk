package com.squirelworks.squirrelgokana

import com.squirelworks.lsd.core.speech.NamedVoice
import com.squirelworks.lsd.core.speech.desktopSpeech
import com.squirelworks.lsd.core.speech.parseEspeakLanguages
import com.squirelworks.lsd.core.speech.parseSayVoices
import com.squirelworks.lsd.core.speech.parseSpeechDispatcherVoices
import com.squirelworks.lsd.core.speech.parseWindowsVoices
import java.io.File
import java.util.concurrent.TimeUnit

private const val PROBE_TIMEOUT_SECONDS = 8L

private data class VoiceCatalog(
    val programs: Set<String>,
    val macVoices: List<NamedVoice>,
    val windowsVoices: List<NamedVoice>,
    val espeakLanguages: Set<String>,
    val dispatcherVoices: List<NamedVoice>,
)

class DesktopVoice {
    private var process: Process? = null
    private var cancelDispatcher = false

    @Volatile
    private var catalog: VoiceCatalog? = null

    init {
        Thread(::discover, "kana-voices").apply {
            isDaemon = true
            start()
        }
    }

    fun speak(text: String, rate: Float, lang: String) {
        val known = catalog ?: return
        stop()
        val request = desktopSpeech(
            System.getProperty("os.name"),
            known.programs,
            text,
            rate,
            lang,
            known.macVoices,
            known.windowsVoices,
            known.espeakLanguages,
            known.dispatcherVoices,
        ) ?: return
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

    private fun discover() {
        runCatching { discoverVoices() }
        if (catalog == null) {
            catalog = VoiceCatalog(emptySet(), emptyList(), emptyList(), emptySet(), emptyList())
        }
    }

    private fun discoverVoices() {
        val programs = speechPrograms()
        val macVoices = if ("say" in programs) readVoices(listOf("say", "-v", "?"), ::parseSayVoices) else emptyList()
        val windowsProgram = when {
            "powershell.exe" in programs -> "powershell.exe"
            "powershell" in programs -> "powershell"
            else -> null
        }
        val windowsVoices = windowsProgram?.let {
            readVoices(listOf(it, "-NoProfile", "-NonInteractive", "-Command", windowsListScript), ::parseWindowsVoices)
        } ?: emptyList()
        val espeakProgram = when {
            "espeak-ng" in programs -> "espeak-ng"
            "espeak" in programs -> "espeak"
            else -> null
        }
        val espeakLanguages = espeakProgram?.let {
            readVoices(listOf(it, "--voices"), ::parseEspeakLanguages)
        } ?: emptySet()
        val dispatcherVoices = if ("spd-say" in programs) {
            readVoices(listOf("spd-say", "-L"), ::parseSpeechDispatcherVoices)
        } else {
            emptyList()
        }
        catalog = VoiceCatalog(programs, macVoices, windowsVoices, espeakLanguages, dispatcherVoices)
    }

    private fun speechPrograms(): Set<String> {
        val names = listOf("espeak-ng", "espeak", "spd-say", "say", "powershell", "powershell.exe")
        return names.filter { commandExists(it) }.toSet()
    }

    private fun commandExists(name: String): Boolean {
        val finder = if (File.separatorChar == '\\') listOf("where", name) else listOf("which", name)
        val started = runCatching {
            ProcessBuilder(finder)
                .redirectOutput(ProcessBuilder.Redirect.DISCARD)
                .redirectError(ProcessBuilder.Redirect.DISCARD)
                .start()
        }.getOrNull() ?: return false
        return finished(started) && started.exitValue() == 0
    }

    private fun <T> readVoices(command: List<String>, parse: (String) -> T): T {
        val started = runCatching {
            ProcessBuilder(command)
                .redirectError(ProcessBuilder.Redirect.DISCARD)
                .start()
        }.getOrNull() ?: return parse("")
        if (!finished(started)) return parse("")
        val text = runCatching { started.inputStream.bufferedReader().readText() }.getOrDefault("")
        return parse(text)
    }

    private fun finished(started: Process): Boolean {
        val done = runCatching { started.waitFor(PROBE_TIMEOUT_SECONDS, TimeUnit.SECONDS) }.getOrDefault(false)
        if (!done) {
            started.destroyForcibly()
            return false
        }
        return true
    }
}

private const val windowsListScript =
    "Add-Type -AssemblyName System.Speech; " +
        "(New-Object System.Speech.Synthesis.SpeechSynthesizer).GetInstalledVoices() | " +
        "ForEach-Object { \$_.VoiceInfo.Name + \"`t\" + \$_.VoiceInfo.Culture.Name }"
