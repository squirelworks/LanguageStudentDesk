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

  const TYPES = { verb: "V", noun: "N", adj: "A", adv: "D", exp: "E", ctr: "C", ono: "O" };
  const CHARS = {
    hira: /[\u3041-\u309f]/,
    kata: /[\u30a1-\u30ff]/,
    kanji: /[\u3400-\u9fff\uf900-\ufaff々]/,
    latin: /[A-Za-zＡ-Ｚａ-ｚ0-9０-９]/,
  };

  function keep(pos, f) {
    if (f.only && !f.only.has(pos)) return false;
    if (!f.common && !f.type && !f.chars) return true;
    const row = Data.row(pos);
    if (f.common && !row.common) return false;
    if (f.type === "nonsuru") {
      if (!row.cls.includes("V") || row.cls.some((c) => c.startsWith("vs"))) return false;
    } else if (f.type && !row.cls.includes(TYPES[f.type])) return false;
    if (f.chars) {
      // JED's "allowed characters": every script in the headword must be ticked.
      const hw = row.kanji[0] || row.kana[0];
      for (const [name, re] of Object.entries(CHARS)) if (!f.chars[name] && re.test(hw)) return false;
    }
    return true;
  }

  // filters: {
  //   common: bool,
  //   type: "verb" | "nonsuru" | "noun" | "adj" | "adv" | "exp" | "ctr" | "ono" | "",
  //   field: "both" | "read" | "mean",           (JED's Both / Read / Mean)
  //   chars: {hira, kata, kanji, latin} or null,  (allowed characters)
  //   only: Set of positions or null,            (tags / history scopes)
  // }
  // Returns {results: [{pos, score, note}], kana, total}; kana is the romaji
  // reading that was also searched, if any. An empty query lists the scope.
  function search(raw, filters = {}) {
    const q = raw.trim().replace(/\s+/g, " ");
    const field = filters.field || "both";
    const hits = new Map();
    let kana = null;
    if (!q) {
      if (!filters.only && !filters.type) return { results: [], kana, total: 0 };
      const source = filters.only ? [...filters.only] : Data.forms.keys();
      let results = [];
      for (const pos of source) if (keep(pos, filters)) results.push({ pos, score: 0 });
      results.sort((a, b) => a.pos - b.pos);
      return { results: results.slice(0, LIMIT), kana, total: results.length };
    }
    if (Kana.hasJapanese(q) || /[*?＊？]/.test(q) && !/[a-z]/i.test(q)) {
      if (field !== "mean") japanese(Kana.kataToHira(q), hits);
    } else {
      const lower = q.toLowerCase();
      const converted = Kana.romajiToHiragana(lower.replace(/\s/g, ""));
      if (field !== "mean" && /^[\u3040-\u309fー*?]+$/.test(converted)) {
        kana = converted;
        japanese(converted, hits);
      }
      if (field !== "read") english(lower, hits);
    }
    const results = [...hits.values()].filter((r) => keep(r.pos, filters));
    for (const r of results) if (isCommon(r.pos)) r.score += 20;
    results.sort((a, b) => b.score - a.score || a.pos - b.pos);
    return { results: results.slice(0, LIMIT), kana, total: results.length };
  }

  // KANJIDIC search for the "All Kanji" screen: by character, reading or meaning.
  function kanji(raw, all) {
    const q = raw.trim().toLowerCase();
    const out = [];
    const hira = Kana.kataToHira(Kana.romajiToHiragana(q));
    for (const [ch, k] of Object.entries(all)) {
      let score = 0;
      if (!q) score = k.f ? 3000 - k.f : k.g ? 1 : 0;
      else if (q.includes(ch)) score = 5000;
      else {
        const reads = [].concat(k.on || [], k.kun || []).map((r) => Kana.kataToHira(r).replace(/[.-]/g, ""));
        if (reads.includes(hira)) score = 3000;
        else if ((k.m || []).some((m) => m.toLowerCase() === q)) score = 2500;
        else if ((k.m || []).some((m) => m.toLowerCase().split(/\W+/).includes(q))) score = 1500;
        if (score && k.f) score += 1000 - k.f / 3;
      }
      if (score) out.push([ch, score]);
    }
    out.sort((a, b) => b[1] - a[1]);
    return out.map((x) => x[0]);
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

  window.Search = { search, kanji, wordsWithKanji };
})();
