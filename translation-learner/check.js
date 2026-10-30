// Checks the meaning matrix: every language column must carry exactly each
// sentence's meanings, and its own model English must pass the checker.
//   node translation-learner/check.js
const fs = require("fs");
const path = require("path");
const T = require("./tokens.js");
global.window = {};
const dir = path.join(__dirname, "data");
for (const f of fs.readdirSync(dir)) if (f.endsWith(".js")) new Function(fs.readFileSync(path.join(dir, f), "utf8"))();
const matrix = { meanings: window.TL_MEANINGS, sentences: window.TL_SENTENCES };
let bad = 0;
const ids = new Set();
for (const s of matrix.sentences) {
  if (ids.has(s.id)) { console.log("matrix: duplicate sentence " + s.id); bad++; }
  ids.add(s.id);
  for (const m of s.m) if (!(m in matrix.meanings) || m.startsWith("@")) { console.log("matrix: " + s.id + " lists " + m); bad++; }
  if (!(s.pack in window.TL_PACK_TITLES)) { console.log("matrix: " + s.id + " has unknown pack " + s.pack); bad++; }
}
const used = new Set();
for (const [lang, col] of Object.entries(window.TL_LANGS)) {
  const { sentences, problems } = T.build(matrix, col);
  problems.forEach((p) => console.log(lang + ": " + p));
  bad += problems.length;
  for (const s of sentences) {
    s.tokens.forEach((t) => t.units.forEach((u) => used.add(u.id)));
    const r = T.checkEnglish(s, s.en);
    if (!r.honest) {
      bad++;
      console.log(lang + ": " + s.id + ": model English fails (" + r.units.filter((u) => u.status === "dropped").map((u) => u.meaning.id).concat(r.added).join(", ") + ")");
    }
  }
  console.log(lang + ": " + sentences.length + " sentences");
}
const unused = matrix.sentences.filter((s) => !Object.values(window.TL_LANGS).some((c) => c.r[s.id]));
if (unused.length) console.log("rows no language renders yet: " + unused.map((s) => s.id).join(", "));
process.exitCode = bad ? 1 : 0;
console.log(bad ? bad + " problems" : "matrix ok");
