// Japanese dictionary lookups for the Vocabulary Learner, using the
// SquirrelGo Japanese-English Dictionary's offline JMdict data and its own
// search code (romaji, kana, kanji, conjugated forms and English).
// The data is generated, not committed: build it once with
//   SquirrelGo-Apps/squirrelgo-dictionary/tools/fetch_data.sh
(() => {
  const DICT = "../SquirrelGo-Apps/squirrelgo-dictionary/www/";
  const lines = [];
  const forms = [];
  const glossLower = [];
  let meta = null;
  let loading = null;

  const pad = (n) => String(n).padStart(2, "0");
  const kataToHira = (s) => s.replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));

  // The data files call back into JEDData; entries, kanji and radicals are
  // not needed here.
  window.JEDData = {
    meta(m) { meta = m; },
    index(shard, text) {
      const base = shard * meta.shard;
      text.split("\n").forEach((row, i) => {
        const f = row.split("\t");
        lines[base + i] = row;
        forms[base + i] = kataToHira(f[1] + ";" + f[2]);
        glossLower[base + i] = (f[5] || "").toLowerCase();
      });
    },
    entries() {},
    kanji() {},
    radicals() {},
  };

  // The subset of the dictionary app's Data object that its search.js uses.
  window.Data = {
    row(pos) {
      const f = lines[pos].split("\t");
      return { pos, id: f[0], kanji: f[1] ? f[1].split(";") : [], kana: f[2].split(";"), common: f[3] === "1", cls: f[4] ? f[4].split(",") : [], senses: f[5].split("|") };
    },
    forms,
    glossLower,
    get size() { return lines.length; },
  };

  // Resolves when the index is loaded; rejects if the data was never built.
  function load(onProgress) {
    if (!loading) {
      loading = (async () => {
        await LSD.loadScript(DICT + "data/meta.js");
        for (const f of ["kana.js", "deinflect.js", "search.js"]) await LSD.loadScript(DICT + "js/" + f);
        for (let n = 0; n < meta.shards; n++) {
          await LSD.loadScript(DICT + "data/index-" + pad(n) + ".js");
          if (onProgress) onProgress(n + 1, meta.shards);
        }
        return meta;
      })();
      loading.catch(() => (loading = null));
    }
    return loading;
  }

  // Up to `limit` words for a query, as vocabulary cards.
  function lookup(q, limit = 40) {
    const { results, total } = window.Search.search(q, {});
    return {
      total,
      cards: results.slice(0, limit).map((r) => {
        const row = Data.row(r.pos);
        const front = row.kanji[0] || row.kana[0];
        return {
          front,
          reading: row.kanji.length ? row.kana[0] : "",
          back: row.senses.slice(0, 3).map((s) => s.split("; ").slice(0, 3).join(", ")).join("; "),
          note: (row.common ? "Common word" : "") + (r.note ? (row.common ? " · " : "") + r.note : ""),
          speak: row.kana[0],
          jmdict: row.id,
        };
      }),
    };
  }

  window.VocabDictionary = { load, lookup, get ready() { return !!(meta && lines.length) && !!window.Search; } };
})();
