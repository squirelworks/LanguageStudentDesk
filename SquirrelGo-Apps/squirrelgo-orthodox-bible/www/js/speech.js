// Read-aloud in any language. Uses the Android shell's native TTS bridge when
// present (Android WebView has no speechSynthesis), otherwise the browser's
// Web Speech API.
(() => {
  // Languages without their own TTS voices fall back to a close neighbour.
  const VOICE_LANG = { cu: "ru", grc: "el" };
  const speechLang = (lang) => VOICE_LANG[lang] || lang;

  function pickVoice(lang) {
    if (!("speechSynthesis" in window)) return null;
    const voices = speechSynthesis.getVoices();
    const want = speechLang(lang).toLowerCase();
    return voices.find((v) => v.lang.toLowerCase() === want) ||
      voices.find((v) => v.lang.toLowerCase().startsWith(want + "-")) || null;
  }

  function speak(text, lang, rate = 1) {
    if (window.AndroidTTS) {
      window.AndroidTTS.speak(text, speechLang(lang), rate);
      return true;
    }
    if (!("speechSynthesis" in window)) return false;
    speechSynthesis.cancel();
    const voice = pickVoice(lang);
    const u = new SpeechSynthesisUtterance(text);
    u.lang = speechLang(lang);
    if (voice) u.voice = voice;
    u.rate = rate;
    speechSynthesis.speak(u);
    return !!voice;
  }

  function stop() {
    if (window.AndroidTTS) window.AndroidTTS.stop();
    else if ("speechSynthesis" in window) speechSynthesis.cancel();
  }

  if ("speechSynthesis" in window) speechSynthesis.getVoices();
  window.Speech = { speak, stop, supported: () => !!window.AndroidTTS || "speechSynthesis" in window };
})();
