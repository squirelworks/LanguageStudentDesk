package com.squirelworks.lsd.core.speech

data class SpeechRequest(val program: String, val args: List<String>, val stdin: String? = null)

// Pick a system speech program for a desktop without a recording. The spoken
// text is an argument, or stdin on Windows, never a shell command.
fun desktopSpeech(
    osName: String,
    available: Set<String>,
    text: String,
    rate: Float,
    lang: String,
): SpeechRequest? {
    val language = lang.substringBefore('-').substringBefore('_').lowercase().ifBlank { "en" }
    val speed = (175f * rate).toInt().coerceIn(80, 450)
    val os = osName.lowercase()
    return when {
        "mac" in os && "say" in available ->
            SpeechRequest("say", listOf("-r", speed.toString(), text))
        "win" in os && "powershell.exe" in available ->
            windowsSpeech("powershell.exe", rate, text)
        "win" in os && "powershell" in available ->
            windowsSpeech("powershell", rate, text)
        "espeak-ng" in available ->
            SpeechRequest("espeak-ng", listOf("-v", language, "-s", speed.toString(), text))
        "espeak" in available ->
            SpeechRequest("espeak", listOf("-v", language, "-s", speed.toString(), text))
        "spd-say" in available ->
            SpeechRequest(
                "spd-say",
                listOf("-l", language, "-r", spdRate(rate).toString(), "-w", text),
            )
        else -> null
    }
}

private fun windowsSpeech(program: String, rate: Float, text: String): SpeechRequest {
    val sapi = ((rate - 1f) * 10f).toInt().coerceIn(-10, 10)
    val script = "Add-Type -AssemblyName System.Speech; " +
        "\$s = New-Object System.Speech.Synthesis.SpeechSynthesizer; " +
        "\$s.Rate = $sapi; " +
        "\$s.Speak([Console]::In.ReadToEnd())"
    return SpeechRequest(
        program,
        listOf("-NoProfile", "-NonInteractive", "-Command", script),
        stdin = text,
    )
}

private fun spdRate(rate: Float): Int = ((rate - 1f) * 100f).toInt().coerceIn(-100, 100)
