package com.squirelworks.lsd.kana

import android.content.Context
import android.speech.tts.TextToSpeech
import com.squirelworks.lsd.core.speech.SpeechOutcome
import com.squirelworks.lsd.core.speech.VoiceStatus
import java.util.Locale

// One text-to-speech engine for the character apps. The utterance id only
// labels this app's speech so a stop does not need to know the other app.
class AndroidSpeech(private val context: Context, private val utteranceId: String) {
    private var voice: TextToSpeech? = null
    @Volatile private var engineState = EngineState.Starting
    private val languageAvailable = HashMap<String, Boolean>()
    private var appliedLanguage: String? = null

    fun start() {
        voice = TextToSpeech(context) { status ->
            engineState = if (status == TextToSpeech.SUCCESS) EngineState.Ready else EngineState.Failed
        }
    }

    fun speak(text: String, rate: Float, lang: String): SpeechOutcome {
        val engine = voice ?: return SpeechOutcome.Pending
        when (engineState) {
            EngineState.Starting -> return SpeechOutcome.Pending
            EngineState.Failed -> return SpeechOutcome.Missing
            EngineState.Ready -> Unit
        }
        if (!cachedLanguage(engine, lang)) {
            engine.stop()
            return SpeechOutcome.Missing
        }
        engine.setSpeechRate(rate)
        if (appliedLanguage != lang) {
            if (lang.isNotBlank() && engine.setLanguage(Locale.forLanguageTag(lang)) < TextToSpeech.LANG_AVAILABLE) {
                languageAvailable[lang] = false
                engine.stop()
                return SpeechOutcome.Missing
            }
            appliedLanguage = lang
        }
        val spoken = engine.speak(text, TextToSpeech.QUEUE_FLUSH, null, utteranceId)
        return if (spoken == TextToSpeech.ERROR) SpeechOutcome.Pending else SpeechOutcome.Spoken
    }

    fun languageStatus(lang: String): VoiceStatus {
        val engine = voice ?: return VoiceStatus.Pending
        return when (engineState) {
            EngineState.Starting -> VoiceStatus.Pending
            EngineState.Failed -> VoiceStatus.Missing
            EngineState.Ready -> if (cachedLanguage(engine, lang)) VoiceStatus.Ready else VoiceStatus.Missing
        }
    }

    fun stop() {
        voice?.stop()
    }

    fun shutdown() {
        voice?.shutdown()
    }

    fun clearLanguageCache() {
        languageAvailable.clear()
        appliedLanguage = null
    }

    private fun cachedLanguage(engine: TextToSpeech, lang: String): Boolean =
        languageAvailable.getOrPut(lang) {
            lang.isBlank() || engine.isLanguageAvailable(Locale.forLanguageTag(lang)) >= TextToSpeech.LANG_AVAILABLE
        }
}

private enum class EngineState { Starting, Ready, Failed }
