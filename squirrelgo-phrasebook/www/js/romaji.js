// Kana -> Hepburn romaji (wapuro-style long vowels: おう = ou, ー doubles the vowel).
// Input is a space-separated kana reading; particles written as their own word
// (は, へ, を) are romanized as wa, e, o.
(() => {
  const BASE = {
    あ: "a", い: "i", う: "u", え: "e", お: "o",
    か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
    が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go",
    さ: "sa", し: "shi", す: "su", せ: "se", そ: "so",
    ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
    た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
    だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do",
    な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
    は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
    ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
    ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po",
    ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
    や: "ya", ゆ: "yu", よ: "yo",
    ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro",
    わ: "wa", ゐ: "i", ゑ: "e", を: "o", ん: "n", ゔ: "vu",
    ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o", ゃ: "ya", ゅ: "yu", ょ: "yo",
  };
  // Two-kana combinations (yōon and katakana extensions).
  const COMBO = {
    きゃ: "kya", きゅ: "kyu", きょ: "kyo", ぎゃ: "gya", ぎゅ: "gyu", ぎょ: "gyo",
    しゃ: "sha", しゅ: "shu", しょ: "sho", しぇ: "she", じゃ: "ja", じゅ: "ju", じょ: "jo", じぇ: "je",
    ちゃ: "cha", ちゅ: "chu", ちょ: "cho", ちぇ: "che", ぢゃ: "ja", ぢゅ: "ju", ぢょ: "jo",
    にゃ: "nya", にゅ: "nyu", にょ: "nyo", ひゃ: "hya", ひゅ: "hyu", ひょ: "hyo",
    びゃ: "bya", びゅ: "byu", びょ: "byo", ぴゃ: "pya", ぴゅ: "pyu", ぴょ: "pyo",
    みゃ: "mya", みゅ: "myu", みょ: "myo", りゃ: "rya", りゅ: "ryu", りょ: "ryo",
    ふぁ: "fa", ふぃ: "fi", ふぇ: "fe", ふぉ: "fo", てぃ: "ti", でぃ: "di", とぅ: "tu", どぅ: "du",
    うぃ: "wi", うぇ: "we", うぉ: "wo", ゔぁ: "va", ゔぃ: "vi", ゔぇ: "ve", ゔぉ: "vo",
  };
  const PUNCT = { "、": ",", "。": ".", "？": "?", "！": "!", "・": " ", "　": " " };
  const WHOLE_WORD = { は: "wa", へ: "e", を: "o", こんにちは: "konnichiwa", こんばんは: "konbanwa" };

  function toHiragana(s) {
    return s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
  }

  function word(w) {
    const h = toHiragana(w);
    const bare = h.replace(/[、。？！]/g, "");
    if (WHOLE_WORD[bare]) return WHOLE_WORD[bare] + h.slice(bare.length).replace(/./g, (c) => PUNCT[c] || c);
    let out = "";
    let geminate = false;
    for (let i = 0; i < h.length; i++) {
      const c = h[i];
      if (c === "っ") { geminate = true; continue; }
      if (c === "ー") {
        const m = out.match(/[aeiou]$/);
        if (m) out += m[0];
        continue;
      }
      if (PUNCT[c] !== undefined) { out += PUNCT[c]; geminate = false; continue; }
      const prev = h[i - 1];
      let r = COMBO[h.slice(i, i + 2)];
      if (r) i++;
      else r = BASE[c];
      if (r === undefined) { out += c; geminate = false; continue; }
      if (geminate) {
        out += r.startsWith("ch") ? "t" : r[0];
        geminate = false;
      }
      // ん before a vowel or y is written n' to keep syllables apart.
      if (prev === "ん" && /^[aeiouy]/.test(r)) out += "'";
      out += r;
    }
    return out;
  }

  function romanize(kana) {
    const s = kana
      .trim()
      .split(/\s+/)
      .map(word)
      .join(" ")
      .replace(/\s+([,.?!])/g, "$1");
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  window.Romaji = { romanize, toHiragana };
})();
