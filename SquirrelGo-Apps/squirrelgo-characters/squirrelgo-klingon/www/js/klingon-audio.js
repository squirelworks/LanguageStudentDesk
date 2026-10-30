// Romanization to IPA and the recorded clip for each letter and word in www/audio.
// Shared by the app and tools/clips.js, which generates the clips.
(() => {
  const K = window.SG_KLINGON;
  const MULTI = ["tlh", "ch", "gh", "ng"];

  // Split romanized Klingon into letters (unknown characters are skipped).
  function letters(word) {
    const out = [];
    for (let i = 0; i < word.length; ) {
      const m = MULTI.find((x) => word.startsWith(x, i)) || word[i];
      if (K.ipa[m] || m === " ") out.push(m);
      i += m.length;
    }
    return out;
  }
  const ipa = (word) => letters(word).map((l) => (l === " " ? " " : K.ipa[l])).join("");

  // File names avoid case-only differences (q and Q), which clash on Windows and macOS.
  const letterFile = (cp) => `l-${cp.toString(16)}.mp3`;
  const wordFile = (w) => `w-${w.replace(/'/g, "7").replace(/ /g, "-").replace(/[A-Z]/g, (c) => "_" + c.toLowerCase())}.mp3`;

  let current = null;
  function play(file, rate = 1) {
    try {
      current?.pause();
      current = new Audio(`audio/${file}`);
      current.playbackRate = rate;
      return current.play().catch(() => {});
    } catch {}
  }

  window.KlingonAudio = { letters, ipa, letterFile, wordFile, play };
})();
