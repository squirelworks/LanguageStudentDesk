// Kana helpers: romaji → hiragana, katakana ↔ hiragana, hiragana → romaji.
(() => {
  const ROMAJI = {
    a: "あ", i: "い", u: "う", e: "え", o: "お",
    ka: "か", ki: "き", ku: "く", ke: "け", ko: "こ",
    ga: "が", gi: "ぎ", gu: "ぐ", ge: "げ", go: "ご",
    sa: "さ", si: "し", shi: "し", su: "す", se: "せ", so: "そ",
    za: "ざ", zi: "じ", ji: "じ", zu: "ず", ze: "ぜ", zo: "ぞ",
    ta: "た", ti: "ち", chi: "ち", tu: "つ", tsu: "つ", te: "て", to: "と",
    da: "だ", di: "ぢ", du: "づ", de: "で", do: "ど",
    na: "な", ni: "に", nu: "ぬ", ne: "ね", no: "の",
    ha: "は", hi: "ひ", hu: "ふ", fu: "ふ", he: "へ", ho: "ほ",
    ba: "ば", bi: "び", bu: "ぶ", be: "べ", bo: "ぼ",
    pa: "ぱ", pi: "ぴ", pu: "ぷ", pe: "ぺ", po: "ぽ",
    ma: "ま", mi: "み", mu: "む", me: "め", mo: "も",
    ya: "や", yu: "ゆ", yo: "よ",
    ra: "ら", ri: "り", ru: "る", re: "れ", ro: "ろ",
    la: "ら", li: "り", lu: "る", le: "れ", lo: "ろ",
    wa: "わ", wi: "うぃ", we: "うぇ", wo: "を",
    "n'": "ん",
    kya: "きゃ", kyu: "きゅ", kyo: "きょ", gya: "ぎゃ", gyu: "ぎゅ", gyo: "ぎょ",
    sha: "しゃ", shu: "しゅ", she: "しぇ", sho: "しょ", sya: "しゃ", syu: "しゅ", syo: "しょ",
    ja: "じゃ", ju: "じゅ", je: "じぇ", jo: "じょ", jya: "じゃ", jyu: "じゅ", jyo: "じょ", zya: "じゃ", zyu: "じゅ", zyo: "じょ",
    cha: "ちゃ", chu: "ちゅ", che: "ちぇ", cho: "ちょ", tya: "ちゃ", tyu: "ちゅ", tyo: "ちょ",
    dya: "ぢゃ", dyu: "ぢゅ", dyo: "ぢょ",
    nya: "にゃ", nyu: "にゅ", nyo: "にょ", hya: "ひゃ", hyu: "ひゅ", hyo: "ひょ",
    bya: "びゃ", byu: "びゅ", byo: "びょ", pya: "ぴゃ", pyu: "ぴゅ", pyo: "ぴょ",
    mya: "みゃ", myu: "みゅ", myo: "みょ", rya: "りゃ", ryu: "りゅ", ryo: "りょ",
    fa: "ふぁ", fi: "ふぃ", fe: "ふぇ", fo: "ふぉ", fyu: "ふゅ",
    va: "ゔぁ", vi: "ゔぃ", vu: "ゔ", ve: "ゔぇ", vo: "ゔぉ",
    thi: "てぃ", dhi: "でぃ", twu: "とぅ", dwu: "どぅ", tsa: "つぁ",
    xa: "ぁ", xi: "ぃ", xu: "ぅ", xe: "ぇ", xo: "ぉ", xya: "ゃ", xyu: "ゅ", xyo: "ょ", xtu: "っ", xtsu: "っ", xwa: "ゎ",
    "-": "ー",
  };

  // Longest-match conversion. Letters that cannot be converted are kept, so
  // callers can tell whether the input was really romaji.
  function romajiToHiragana(input) {
    const s = input.toLowerCase();
    let out = "";
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      // Doubled consonant → small tsu (but "nn" is ん).
      if (c === s[i + 1] && /[bcdfghjklmpqrstvwxyz]/.test(c) && c !== "n") {
        out += "っ";
        i++;
        continue;
      }
      if (c === "t" && s[i + 1] === "c" && s[i + 2] === "h") {
        out += "っ";
        i++;
        continue;
      }
      // "nn": one ん, unless the second n starts the next mora (konnichiha).
      if (c === "n" && s[i + 1] === "n") {
        out += "ん";
        i += /[aiueoy]/.test(s[i + 2] || "") ? 1 : 2;
        continue;
      }
      let hit = false;
      for (let len = 4; len >= 1; len--) {
        const chunk = s.substr(i, len);
        if (chunk.length === len && ROMAJI[chunk]) {
          out += ROMAJI[chunk];
          i += len;
          hit = true;
          break;
        }
      }
      if (hit) continue;
      if (c === "n" || c === "m" && /[bmp]/.test(s[i + 1] || "")) {
        // ん before a consonant, or at the end of the word.
        if (c === "n" && (i + 1 === s.length || !/[aiueoy]/.test(s[i + 1]))) {
          out += "ん";
          i++;
          continue;
        }
        if (c === "m") {
          out += "ん";
          i++;
          continue;
        }
      }
      out += c;
      i++;
    }
    return out;
  }

  function kataToHira(s) {
    return s.replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));
  }

  function hiraToKata(s) {
    return s.replace(/[ぁ-ゖ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 0x60));
  }

  const KANA_ROMAJI = {};
  for (const [r, k] of Object.entries(ROMAJI)) {
    if (/^[a-z-]+$/.test(r) && !KANA_ROMAJI[k]) KANA_ROMAJI[k] = r;
  }
  Object.assign(KANA_ROMAJI, {
    し: "shi", ち: "chi", つ: "tsu", ふ: "fu", じ: "ji", ぢ: "ji", づ: "zu", を: "o", ん: "n",
    しゃ: "sha", しゅ: "shu", しょ: "sho", じゃ: "ja", じゅ: "ju", じょ: "jo", ちゃ: "cha", ちゅ: "chu", ちょ: "cho",
    ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro", てぃ: "ti", ゔ: "vu", ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o",
  });

  function toRomaji(input) {
    const s = kataToHira(input);
    let out = "";
    for (let i = 0; i < s.length; i++) {
      const two = s.substr(i, 2);
      if (two.length === 2 && KANA_ROMAJI[two]) {
        out += KANA_ROMAJI[two];
        i++;
      } else if (s[i] === "っ" && i + 1 < s.length) {
        const next = KANA_ROMAJI[s.substr(i + 1, 2)] || KANA_ROMAJI[s[i + 1]] || "";
        out += next.startsWith("ch") ? "t" : next[0] || "";
      } else if (s[i] === "ー") {
        out += out.slice(-1);
      } else if (s[i] === "ん" && /^[aiueoy]/.test(KANA_ROMAJI[s[i + 1]] || "")) {
        out += "n'";
      } else {
        out += KANA_ROMAJI[s[i]] || s[i];
      }
    }
    return out;
  }

  const isKana = (s) => /^[぀-ヿー]+$/.test(s);
  const hasJapanese = (s) => /[぀-ヿ㐀-鿿豈-﫿々〆]/.test(s);
  const isKanji = (ch) => /[㐀-鿿豈-﫿々]/.test(ch);

  window.Kana = { romajiToHiragana, kataToHira, hiraToKata, toRomaji, isKana, hasJapanese, isKanji };
})();
