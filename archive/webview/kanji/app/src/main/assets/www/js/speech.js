// Text-to-speech for any script's language. Uses the Android shell's native
// TTS bridge when present (Android WebView has no speechSynthesis), otherwise
// the browser's Web Speech API.
(() => {
  const voices = {};

  function pickVoice(lang) {
    if (!("speechSynthesis" in window)) return null;
    const all = speechSynthesis.getVoices();
    const base = lang.split("-")[0].toLowerCase();
    return all.find((v) => v.lang === lang) || all.find((v) => v.lang.toLowerCase().startsWith(base)) || null;
  }
  function voiceFor(lang) {
    if (!voices[lang]) voices[lang] = pickVoice(lang);
    return voices[lang];
  }
  if ("speechSynthesis" in window) {
    speechSynthesis.getVoices();
    speechSynthesis.addEventListener?.("voiceschanged", () => {
      for (const k of Object.keys(voices)) delete voices[k];
    });
  }

  function available(lang) {
    if (window.AndroidTTS) return window.AndroidTTS.isReady(lang);
    return "speechSynthesis" in window && !!voiceFor(lang);
  }

  function speak(text, rate, lang) {
    if (window.AndroidTTS) {
      window.AndroidTTS.speak(text, rate, lang);
      return true;
    }
    if (!("speechSynthesis" in window)) return false;
    const voice = voiceFor(lang);
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    if (voice) u.voice = voice;
    u.rate = rate;
    speechSynthesis.speak(u);
    return !!voice;
  }

  function stop() {
    if (window.AndroidTTS) window.AndroidTTS.stop();
    else if ("speechSynthesis" in window) speechSynthesis.cancel();
  }

  window.Speech = { speak, stop, available };
})();
