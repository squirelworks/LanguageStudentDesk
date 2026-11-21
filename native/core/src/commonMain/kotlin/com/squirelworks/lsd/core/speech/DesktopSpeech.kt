package com.squirelworks.lsd.core.speech

data class NamedVoice(val name: String, val lang: String)

// A null list means that program has not been checked yet. An empty list means
// the check finished and there is nothing to use. Callers can speak with a
// finished program while another check is still running.
data class VoiceProbe(
    val macVoices: List<NamedVoice>? = null,
    val windowsProgram: String? = null,
    val windowsVoices: List<NamedVoice>? = null,
    val espeakNgLanguages: Set<String>? = null,
    val espeakLanguages: Set<String>? = null,
    val dispatcherVoices: List<NamedVoice>? = null,
)

enum class VoiceStatus { Ready, Missing, Pending }

enum class SpeechOutcome { Spoken, Missing, Pending }

// Ready when some finished probe can speak this language. Missing only when
// every probe for this system has finished and none of them can. Pending
// while a probe that might still match is running.
fun voiceStatus(osName: String, lang: String, probe: VoiceProbe): VoiceStatus {
    if (desktopSpeechFromProbe(osName, " ", 1f, lang, probe) != null) return VoiceStatus.Ready
    return if (voiceProbeFinished(osName, probe)) VoiceStatus.Missing else VoiceStatus.Pending
}

fun voiceProbeFinished(osName: String, probe: VoiceProbe): Boolean {
    val os = osName.lowercase()
    return when {
        "mac" in os -> probe.macVoices != null
        "win" in os -> probe.windowsProgram != null
        else -> probe.espeakNgLanguages != null && probe.espeakLanguages != null && probe.dispatcherVoices != null
    }
}

data class SpeechRequest(
    val program: String,
    val args: List<String>,
    val stdin: String? = null,
    val environment: Map<String, String> = emptyMap(),
    val cancelsSpeechDispatcher: Boolean = false,
)

// Exact locale first (ja-JP matches ja_JP), then the base language, the same
// order the WebView voice picker uses. No match means do not speak.
fun pickVoice(requested: String, voices: List<NamedVoice>): NamedVoice? {
    val wanted = normalize(requested)
    voices.firstOrNull { normalize(it.lang) == wanted }?.let { return it }
    val base = wanted.substringBefore('-')
    return voices.firstOrNull {
        val lang = normalize(it.lang)
        lang == base || lang.startsWith("$base-")
    }
}

fun parseSayVoices(listing: String): List<NamedVoice> =
    sayVoiceLine.findAll(listing).map { match ->
        NamedVoice(match.groupValues[1].trim(), match.groupValues[2])
    }.toList()

fun parseEspeakLanguages(listing: String): Set<String> =
    listing.lineSequence().mapNotNull { line ->
        val parts = line.trim().split(Regex("\\s+"))
        if (parts.size >= 2 && parts[0].all { it.isDigit() }) parts[1].substringBefore('-').lowercase()
        else null
    }.toSet()

fun parseWindowsVoices(listing: String): List<NamedVoice> =
    listing.lineSequence().mapNotNull { line ->
        val name = line.substringBefore('\t').trim()
        val lang = line.substringAfter('\t', "").trim()
        if (name.isEmpty() || lang.isEmpty() || name == line.trim()) null
        else NamedVoice(name, lang)
    }.toList()

// spd-say -L prints padded columns: name, language, variant.
fun parseSpeechDispatcherVoices(listing: String): List<NamedVoice> =
    listing.lineSequence().mapNotNull { raw ->
        val match = dispatcherVoiceLine.matchEntire(raw.trimEnd()) ?: return@mapNotNull null
        val name = match.groupValues[1].trim()
        val lang = match.groupValues[2]
        if (name.equals("NAME", ignoreCase = true) && lang.equals("LANGUAGE", ignoreCase = true)) null
        else NamedVoice(name, lang)
    }.toList()

fun desktopSpeechFromProbe(
    osName: String,
    text: String,
    rate: Float,
    lang: String,
    probe: VoiceProbe,
): SpeechRequest? {
    val language = lang.substringBefore('-').substringBefore('_').lowercase().ifBlank { "en" }
    val os = osName.lowercase()
    return when {
        "mac" in os -> {
            val voices = probe.macVoices ?: return null
            desktopSpeech(osName, setOf("say"), text, rate, lang, macVoices = voices)
        }
        "win" in os -> {
            val program = probe.windowsProgram ?: return null
            if (program.isEmpty()) return null
            desktopSpeech(osName, setOf(program), text, rate, lang, windowsVoices = probe.windowsVoices.orEmpty())
        }
        else -> {
            val espeakNg = probe.espeakNgLanguages
            if (espeakNg != null && language in espeakNg) {
                return desktopSpeech(osName, setOf("espeak-ng"), text, rate, lang, espeakLanguages = espeakNg)
            }
            val espeak = probe.espeakLanguages
            if (espeak != null && language in espeak) {
                return desktopSpeech(osName, setOf("espeak"), text, rate, lang, espeakLanguages = espeak)
            }
            val dispatcher = probe.dispatcherVoices ?: return null
            desktopSpeech(osName, setOf("spd-say"), text, rate, lang, dispatcherVoices = dispatcher)
        }
    }
}

fun desktopSpeech(
    osName: String,
    available: Set<String>,
    text: String,
    rate: Float,
    lang: String,
    macVoices: List<NamedVoice> = emptyList(),
    windowsVoices: List<NamedVoice> = emptyList(),
    espeakLanguages: Set<String> = emptySet(),
    dispatcherVoices: List<NamedVoice> = emptyList(),
): SpeechRequest? {
    val language = lang.substringBefore('-').substringBefore('_').lowercase().ifBlank { "en" }
    val speed = (175f * rate).toInt().coerceIn(80, 450)
    val os = osName.lowercase()
    return when {
        "mac" in os && "say" in available -> {
            val voice = pickVoice(lang, macVoices) ?: return null
            SpeechRequest("say", listOf("-v", voice.name, "-r", speed.toString(), "--", text))
        }
        "win" in os && ("powershell.exe" in available || "powershell" in available) -> {
            val voice = pickVoice(lang, windowsVoices) ?: return null
            val program = if ("powershell.exe" in available) "powershell.exe" else "powershell"
            windowsSpeech(program, rate, text, voice.name)
        }
        "espeak-ng" in available && language in espeakLanguages ->
            SpeechRequest("espeak-ng", listOf("-v", language, "-s", speed.toString(), "--", text))
        "espeak" in available && language in espeakLanguages ->
            SpeechRequest("espeak", listOf("-v", language, "-s", speed.toString(), "--", text))
        "spd-say" in available -> {
            val voice = pickVoice(lang, dispatcherVoices) ?: return null
            SpeechRequest(
                "spd-say",
                listOf("-y", voice.name, "-l", voice.lang, "-r", spdRate(rate).toString(), "-w", "--", text),
                cancelsSpeechDispatcher = true,
            )
        }
        else -> null
    }
}

private const val windowsSpeakScript =
    "Add-Type -AssemblyName System.Speech; " +
        "\$s = New-Object System.Speech.Synthesis.SpeechSynthesizer; " +
        "\$s.SelectVoice(\$env:KANA_VOICE); " +
        "\$s.Rate = [int]\$env:KANA_RATE; " +
        "\$s.Speak([Console]::In.ReadToEnd())"

private fun windowsSpeech(program: String, rate: Float, text: String, voice: String): SpeechRequest {
    val sapi = ((rate - 1f) * 10f).toInt().coerceIn(-10, 10)
    return SpeechRequest(
        program,
        listOf("-NoProfile", "-NonInteractive", "-Command", windowsSpeakScript),
        stdin = text,
        environment = mapOf("KANA_VOICE" to voice, "KANA_RATE" to sapi.toString()),
    )
}

private fun spdRate(rate: Float): Int = ((rate - 1f) * 100f).toInt().coerceIn(-100, 100)

private fun normalize(lang: String): String =
    lang.trim().replace('_', '-').lowercase()

private val sayVoiceLine = Regex("""(?m)^(.+?)\s+([A-Za-z]{2,3}[_-][A-Za-z0-9]+)\s+#""")

private val dispatcherVoiceLine = Regex("""^(.+?)\s{2,}(\S+)\s+(\S+)\s*$""")
