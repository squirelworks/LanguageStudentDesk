// Small rule-based deinflector: turns conjugated verbs and adjectives back
// into dictionary forms. Each candidate carries the word classes it is valid
// for, which search.js checks against the entry's JMdict part of speech.
(() => {
  // [ending, replacement, classes, label]
  const V5 = [["u", "う", "わ", "い", "っ", "え", "お"], ["ku", "く", "か", "き", "い", "け", "こ"], ["gu", "ぐ", "が", "ぎ", "い", "げ", "ご"],
    ["su", "す", "さ", "し", "し", "せ", "そ"], ["tsu", "つ", "た", "ち", "っ", "て", "と"], ["nu", "ぬ", "な", "に", "ん", "ね", "の"],
    ["bu", "ぶ", "ば", "び", "ん", "べ", "ぼ"], ["mu", "む", "ま", "み", "ん", "め", "も"], ["ru", "る", "ら", "り", "っ", "れ", "ろ"]];
  const RULES = [];
  const add = (from, to, cls, label) => RULES.push([from, to, cls, label]);

  for (const [, dict, a, i, te, e, o] of V5) {
    const cls = dict === "う" ? "v5u" : dict === "る" ? "v5r" : "v5" + { く: "k", ぐ: "g", す: "s", つ: "t", ぬ: "n", ぶ: "b", む: "m" }[dict];
    const voiced = dict === "ぐ" || dict === "ぬ" || dict === "ぶ" || dict === "む";
    const ta = te + (voiced ? "だ" : "た");
    const tte = te + (voiced ? "で" : "て");
    add(a + "ない", dict, cls, "negative");
    add(a + "なかった", dict, cls, "past negative");
    add(i + "ます", dict, cls, "polite");
    add(i + "ました", dict, cls, "polite past");
    add(i + "ません", dict, cls, "polite negative");
    add(i + "ませんでした", dict, cls, "polite past negative");
    add(i + "たい", dict, cls, "want to");
    add(i + "ましょう", dict, cls, "polite volitional");
    add(ta, dict, cls, "past");
    add(tte, dict, cls, "te-form");
    add(tte + "いる", dict, cls, "progressive");
    add(tte + "いた", dict, cls, "past progressive");
    add(tte + "います", dict, cls, "polite progressive");
    add(e, dict, cls, "imperative");
    add(e + "る", dict, cls, "potential");
    add(e + "ば", dict, cls, "conditional");
    add(o + "う", dict, cls, "volitional");
    add(a + "れる", dict, cls, "passive");
    add(a + "せる", dict, cls, "causative");
    add(ta + "ら", dict, cls, "conditional (-tara)");
  }
  // 行く is irregular in the te/ta forms.
  add("いった", "いく", "v5k-s", "past");
  add("いって", "いく", "v5k-s", "te-form");
  add("行った", "行く", "v5k-s", "past");
  add("行って", "行く", "v5k-s", "te-form");

  const ICHIDAN = [["ない", "negative"], ["なかった", "past negative"], ["ます", "polite"], ["ました", "polite past"], ["ません", "polite negative"],
    ["ませんでした", "polite past negative"], ["たい", "want to"], ["た", "past"], ["て", "te-form"], ["ている", "progressive"], ["ていた", "past progressive"],
    ["ています", "polite progressive"], ["ろ", "imperative"], ["よう", "volitional"], ["ましょう", "polite volitional"], ["られる", "potential / passive"],
    ["れる", "potential (colloquial)"], ["させる", "causative"], ["れば", "conditional"], ["たら", "conditional (-tara)"], ["", "stem"]];
  for (const [end, label] of ICHIDAN) if (end) add(end, "る", "v1", label);

  // する and くる
  for (const [end, label] of ICHIDAN) {
    if (!end) continue;
    const s = { ない: "しない", なかった: "しなかった", ろ: "しろ", よう: "しよう", られる: "される", れる: "できる", させる: "させる", れば: "すれば" }[end] || "し" + end;
    add(s, "する", "vs-i", label);
    const k = { ない: "こない", なかった: "こなかった", ろ: "こい", よう: "こよう", られる: "こられる", れる: "これる", させる: "こさせる", れば: "くれば" }[end] || "き" + end;
    add(k, "くる", "vk", label);
    add(s, "", "vs", "suru verb, " + label);
    add(k.replace(/^[こき]/, "来").replace(/^くれば/, "来れば"), "来る", "vk", label);
  }

  add("する", "", "vs", "suru verb");

  // い-adjectives
  for (const [end, label] of [["くない", "negative"], ["かった", "past"], ["くなかった", "past negative"], ["くて", "te-form"], ["く", "adverbial"],
    ["ければ", "conditional"], ["さ", "noun (-sa)"], ["そう", "looks like"], ["すぎる", "too much"]]) {
    add(end, "い", "adj-i", label);
  }

  // Returns [{form, label, cls}] for every rule that fits, chaining once more
  // so "食べたくない" → "食べたい" → "食べる".
  function deinflect(word) {
    const out = [];
    const seen = new Set([word]);
    const step = (w, chain, depth) => {
      for (const [from, to, cls, label] of RULES) {
        if (!w.endsWith(from)) continue;
        const base = w.slice(0, w.length - from.length) + to;
        if (!base || base === w) continue;
        const key = base + "|" + cls;
        if (seen.has(key)) continue;
        seen.add(key);
        const labels = chain.concat(label);
        out.push({ form: base, cls, label: labels.slice().reverse().join(" → ") });
        if (depth < 1 && (to === "い" || cls === "v1")) step(base, labels, depth + 1);
      }
    };
    step(word, [], 0);
    return out;
  }

  window.Deinflect = { deinflect };
})();
