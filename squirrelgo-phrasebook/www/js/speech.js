// Japanese text-to-speech. Uses the Android shell's native TTS bridge when
// present (Android WebView has no speechSynthesis), otherwise the browser's
// Web Speech API.
(() => {
  let voice = null;

  function pickVoice() {
    if (!("speechSynthesis" in window)) return;
    const voices = speechSynthesis.getVoices();
    voice = voices.find((v) => v.lang === "ja-JP") || voices.find((v) => /^ja/i.test(v.lang)) || null;
  }
  if ("speechSynthesis" in window) {
    pickVoice();
    speechSynthesis.addEventListener?.("voiceschanged", pickVoice);
  }

  function available() {
    if (window.AndroidTTS) return window.AndroidTTS.isReady();
    return "speechSynthesis" in window && !!voice;
  }

  function speak(text, rate = 1) {
    const clean = text.replace(/\s+/g, "");
    if (window.AndroidTTS) {
      window.AndroidTTS.speak(clean, rate);
      return true;
    }
    if (!("speechSynthesis" in window)) return false;
    if (!voice) pickVoice();
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = "ja-JP";
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
