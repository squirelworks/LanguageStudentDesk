// Loads the offline dictionary data. The data files are plain scripts that
// call back into JEDData, so they load from file:// URLs (Android assets,
// desktop browsers) where fetch() of local files is blocked.
(() => {
  const lines = [];      // index lines, by position
  const forms = [];      // "kanji;kana" with katakana folded to hiragana, by position
  const glossLower = []; // lowercased glosses, by position
  const byId = new Map(); // JMdict id → position
  const entryShards = [];
  const waiting = {};
  let meta = null;
  let kanji = null;
  let radicals = null;
  let loadedShards = 0;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = () => { s.remove(); resolve(); };
      s.onerror = () => { s.remove(); reject(new Error("Could not load " + src)); };
      document.head.appendChild(s);
    });
  }

  const pad = (n) => String(n).padStart(2, "0");

  window.JEDData = {
    meta(m) { meta = m; },
    kanji(k) { kanji = k; },
    radicals(r) { radicals = r; },
    index(shard, text) {
      const base = shard * meta.shard;
      const rows = text.split("\n");
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const f = row.split("\t");
        const pos = base + i;
        lines[pos] = row;
        forms[pos] = Kana.kataToHira(f[1] + ";" + f[2]);
        glossLower[pos] = f[5].toLowerCase();
        byId.set(f[0], pos);
      }
    },
    entries(shard, list) {
      entryShards[shard] = list;
      if (waiting[shard]) waiting[shard].forEach((fn) => fn());
      delete waiting[shard];
    },
  };

  // Loads meta and every index shard; onProgress(loaded, total) after each.
  async function init(onProgress) {
    await loadScript("data/meta.js");
    for (let n = 0; n < meta.shards; n++) {
      await loadScript("data/index-" + pad(n) + ".js");
      loadedShards = n + 1;
      if (onProgress) onProgress(loadedShards, meta.shards);
    }
  }

  async function loadKanji() {
    if (!kanji) await loadScript("data/kanji.js");
    return kanji;
  }

  async function loadRadicals() {
    if (!radicals) await loadScript("data/radicals.js");
    if (!kanji) await loadScript("data/kanji.js");
    return radicals;
  }

  // Parsed index row for a position.
  function row(pos) {
    const f = lines[pos].split("\t");
    return {
      pos,
      id: f[0],
      kanji: f[1] ? f[1].split(";") : [],
      kana: f[2].split(";"),
      common: f[3] === "1",
      cls: f[4] ? f[4].split(",") : [],
      senses: f[5].split("|"),
    };
  }

  // Full entry (row + senses, tags, examples); loads the shard on demand.
  async function entry(pos) {
    const shard = Math.floor(pos / meta.shard);
    if (!entryShards[shard]) {
      const ready = new Promise((resolve) => (waiting[shard] = waiting[shard] || []).push(resolve));
      if (waiting[shard].length === 1) loadScript("data/entries-" + pad(shard) + ".js");
      await ready;
    }
    return Object.assign(row(pos), entryShards[shard][pos % meta.shard]);
  }

  window.Data = {
    init,
    loadKanji,
    loadRadicals,
    row,
    entry,
    posOfId: (id) => byId.get(id),
    get meta() { return meta; },
    get kanji() { return kanji; },
    get radicals() { return radicals; },
    get size() { return lines.length; },
    get ready() { return meta && loadedShards === meta.shards; },
    forms,
    glossLower,
  };
})();
