// The meaning network at run time: looks up the vectors that
// tools/build_network.py learned (data/network.js) and compares them.
// Node keys are "m:<meaning id>", "en:<English word>" and "<lang>:<word>".
// No DOM here, so this file runs under node too.
(function (root) {
  "use strict";

  function decode(b64) {
    if (typeof Buffer !== "undefined") {
      const buf = Buffer.from(b64, "base64");
      return new Int8Array(buf.buffer, buf.byteOffset, buf.length);
    }
    const bin = atob(b64);
    const out = new Int8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = (bin.charCodeAt(i) << 24) >> 24;
    return out;
  }

  // data is window.TL_NETWORK; stem is the English stemmer from tokens.js, so
  // "boys" finds the node for "boy".
  function load(data, stem) {
    const keys = data.keys.split("\n");
    const vec = decode(data.vectors);
    const dim = data.dim;
    const index = new Map(keys.map((k, i) => [k, i]));
    const byStem = new Map();
    keys.forEach((k, i) => {
      if (k.startsWith("en:")) {
        const s = stem(k.slice(3));
        if (!byStem.has(s)) byStem.set(s, i);
      }
    });

    function cos(i, j) {
      let s = 0;
      for (let k = 0; k < dim; k++) s += vec[i * dim + k] * vec[j * dim + k];
      return s / (127 * 127);
    }

    // The node for an English word, by exact form and then by stem.
    function english(word) {
      const w = word.toLowerCase();
      const i = index.get("en:" + w);
      return i != null ? i : byStem.has(stem(w)) ? byStem.get(stem(w)) : null;
    }

    // Similarity of two nodes, given as keys or indexes; null when either is unknown.
    function sim(a, b) {
      const i = typeof a === "number" ? a : index.get(a);
      const j = typeof b === "number" ? b : index.get(b);
      return i == null || j == null ? null : cos(i, j);
    }

    // The k nodes nearest to key, optionally only those whose key starts with
    // one of prefixes. Returns [{ key, sim }].
    function nearest(key, k, prefixes) {
      const i = index.get(key);
      if (i == null) return [];
      const out = [];
      for (let j = 0; j < keys.length; j++) {
        if (j === i || (prefixes && !prefixes.some((p) => keys[j].startsWith(p)))) continue;
        out.push({ key: keys[j], sim: cos(i, j) });
      }
      return out.sort((x, y) => y.sim - x.sim).slice(0, k);
    }

    return { keys, close: data.close, has: (key) => index.has(key), english, sim, nearest };
  }

  const api = { load };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.MeaningNet = api;
})(this);
