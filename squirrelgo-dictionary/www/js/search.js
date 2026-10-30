// Dictionary search over the loaded index: Japanese (kanji/kana, romaji,
// wildcards, conjugated forms) and English glosses.
(() => {
  const LIMIT = 1000;
  let exact = null; // folded form → [positions], built on first deinflection lookup

  function exactMap() {
    if (exact && exact.size && exact.builtFor === Data.size) return exact;
    exact = new Map();
    const forms = Data.forms;
    for (let pos = 0; pos < forms.length; pos++) {
      for (const f of forms[pos].split(";")) {
        if (!f) continue;
        const list = exact.get(f);
        if (list) list.push(pos);
        else exact.set(f, [pos]);
      }
    }
    exact.builtFor = Data.size;
    return exact;
  }

  const isCommon = (pos) => Data.row(pos).common;

  function japanese(q, hits) {
    const forms = Data.forms;
    const wild = /[*?＊？]/.test(q);
    const hasKanji = /[\u3400-\u9fff\uf900-\ufaff々]/.test(q);
    if (wild) {
      const re = new RegExp("^" + q.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/[*＊]/g, ".*").replace(/[?？]/g, ".") + "$");
      for (let pos = 0; pos < forms.length; pos++) {
        if (forms[pos].split(";").some((f) => re.test(f))) add(hits, pos, 70);
      }
      return;
    }
    for (let pos = 0; pos < forms.length; pos++) {
      const all = forms[pos];
      if (all.indexOf(q) === -1) continue;
      let best = 0;
      for (const f of all.split(";")) {
        if (f === q) best = Math.max(best, 110);
        else if (f.startsWith(q)) best = Math.max(best, 70 - Math.min(30, f.length - q.length));
        else if ((hasKanji || q.length > 1) && f.includes(q)) best = Math.max(best, 30 - Math.min(20, f.length - q.length));
      }
      if (best) add(hits, pos, best);
    }
    if (q.length > 1) {
      const map = exactMap();
      for (const c of Deinflect.deinflect(q)) {
        const list = map.get(c.form);
        if (!list) continue;
        for (const pos of list) {
          if (Data.row(pos).cls.some((p) => p.startsWith(c.cls))) add(hits, pos, 95, c.label);
        }
      }
    }
  }

  const stripNotes = (g) => g.replace(/^\([^)]*\)\s*/, "").replace(/\s*\([^)]*\)$/, "");

  function english(q, hits) {
    const gl = Data.glossLower;
    const word = new RegExp("(^|[^a-z])" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|[^a-z])");
    for (let pos = 0; pos < gl.length; pos++) {
      const text = gl[pos];
      if (text.indexOf(q) === -1) continue;
      let best = 0;
      const senses = text.split("|");
      for (let s = 0; s < senses.length && best < 104; s++) {
        const first = s === 0;
        const glosses = senses[s].split("; ");
        for (let gi = 0; gi < glosses.length; gi++) {
          const g = glosses[gi];
          const bare = stripNotes(g);
          // Exact gloss; the leading gloss of a short first sense ranks best (食べる for "eat").
          if (bare === q || bare === "to " + q || bare === "a " + q || bare === "the " + q) best = Math.max(best, first ? (gi === 0 ? 104 - Math.min(4, glosses.length - 1) : 98) : 80);
          else if (word.test(g)) best = Math.max(best, (first ? 55 : 40) - Math.min(15, Math.floor(g.length / 8)));
          else if (g.includes(q)) best = Math.max(best, 10);
        }
      }
      if (best) add(hits, pos, best);
    }
  }

  function add(hits, pos, score, note) {
    const prev = hits.get(pos);
    if (!prev || prev.score < score) hits.set(pos, { pos, score, note: note || (prev && prev.note) });
  }

  // Returns {results: [{pos, score, note}], kana} — kana is the romaji reading
  // that was also searched, if any.
  const TYPES = { verb: "V", noun: "N", adj: "A", adv: "D", exp: "E" };

  // filters: {common: bool, type: "verb" | "noun" | "adj" | "adv" | "exp" | ""}
  function search(raw, filters = {}) {
    const q = raw.trim().replace(/\s+/g, " ");
    const hits = new Map();
    let kana = null;
    if (!q) return { results: [], kana };
    if (Kana.hasJapanese(q) || /[*?＊？]/.test(q) && !/[a-z]/i.test(q)) {
      japanese(Kana.kataToHira(q), hits);
    } else {
      const lower = q.toLowerCase();
      const converted = Kana.romajiToHiragana(lower.replace(/\s/g, ""));
      if (/^[\u3040-\u309fー*?]+$/.test(converted)) {
        kana = converted;
        japanese(converted, hits);
      }
      english(lower, hits);
    }
    let results = [...hits.values()];
    if (filters.common || filters.type) {
      const t = TYPES[filters.type];
      results = results.filter((r) => {
        const row = Data.row(r.pos);
        return (!filters.common || row.common) && (!t || row.cls.includes(t));
      });
    }
    for (const r of results) if (isCommon(r.pos)) r.score += 20;
    results.sort((a, b) => b.score - a.score || a.pos - b.pos);
    return { results: results.slice(0, LIMIT), kana, total: results.length };
  }

  // Common words that contain a kanji, for the kanji page.
  function wordsWithKanji(ch, limit = 40) {
    const out = [];
    const forms = Data.forms;
    for (let pos = 0; pos < forms.length && out.length < limit * 4; pos++) {
      if (forms[pos].indexOf(ch) !== -1) out.push(pos);
    }
    // Common words come first in the data; among them prefer short ones.
    const len = (pos) => (Data.row(pos).common ? 0 : 100) + forms[pos].split(";")[0].length;
    return out.sort((a, b) => len(a) - len(b) || a - b).slice(0, limit);
  }

  window.Search = { search, wordsWithKanji };
})();
