package com.squirelworks.lsd.core.speech

data class NamedVoice(val name: String, val lang: String)

data class SpeechRequest(
    val program: String,
    val args: List<String>,
    val stdin: String? = null,
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

fun desktopSpeech(
    osName: String,
    available: Set<String>,
    text: String,
    rate: Float,
    lang: String,
    macVoices: List<NamedVoice> = emptyList(),
    windowsVoices: List<NamedVoice> = emptyList(),
    espeakLanguages: Set<String> = emptySet(),
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
        "spd-say" in available ->
            SpeechRequest(
                "spd-say",
                listOf("-l", language, "-r", spdRate(rate).toString(), "-w", "--", text),
                cancelsSpeechDispatcher = true,
            )
        else -> null
    }
}

private fun windowsSpeech(program: String, rate: Float, text: String, voice: String): SpeechRequest {
    val sapi = ((rate - 1f) * 10f).toInt().coerceIn(-10, 10)
    val safeName = voice.replace("'", "''")
    val script = "Add-Type -AssemblyName System.Speech; " +
        "\$s = New-Object System.Speech.Synthesis.SpeechSynthesizer; " +
        "\$s.SelectVoice('$safeName'); " +
        "\$s.Rate = $sapi; " +
        "\$s.Speak([Console]::In.ReadToEnd())"
    return SpeechRequest(
        program,
        listOf("-NoProfile", "-NonInteractive", "-Command", script),
        stdin = text,
    )
}

private fun spdRate(rate: Float): Int = ((rate - 1f) * 100f).toInt().coerceIn(-100, 100)

private fun normalize(lang: String): String =
    lang.trim().replace('_', '-').lowercase()

private val sayVoiceLine = Regex("""(?m)^(.+?)\s+([A-Za-z]{2,3}[_-][A-Za-z0-9]+)\s+#""")
