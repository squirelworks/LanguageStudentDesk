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

// The meaning network: close matches must stay on the right side of the line.
const N = require("./net.js");
new Function(fs.readFileSync(path.join(dir, "network.js"), "utf8"))();
const net = N.load(window.TL_NETWORK, T.stem);
// The reference pairs the close line was set from (tools/build_network.py):
// no unrelated pair may count as close, and enough related pairs must.
const ref = window.TL_NETWORK.reference;
for (const [word, mid] of ref.apart) {
  const s = net.sim(net.english(word), "m:" + mid);
  if (s == null || s >= net.close) {
    console.log("network: " + word + " vs " + mid + " is " + (s == null ? "unknown" : s.toFixed(2)) + ", expected not close");
    process.exitCode = 1;
  }
}
const near = ref.near.filter(([word, mid]) => net.sim(net.english(word), "m:" + mid) >= net.close).length;
if (near < ref.share * ref.near.length) {
  console.log("network: only " + near + " of " + ref.near.length + " related pairs are close");
  process.exitCode = 1;
}
// Near misses: a misspelt word is carried over with a spelling note; a real
// English word is never read as a misspelling of another.
{
  const ja = T.build(matrix, window.TL_LANGS.japanese).sentences.find((x) => x.id === "i-am-student");
  const typo = T.checkEnglish(ja, "I am a studnet.", net);
  if (!typo.honest || typo.typos !== 1) {
    console.log("near miss: \"studnet\" should count as student, with a spelling note");
    process.exitCode = 1;
  }
  const other = T.checkEnglish(ja, "I am a stud.", net);
  if (other.honest) {
    console.log("near miss: \"stud\" should not count as student");
    process.exitCode = 1;
  }
}
console.log(process.exitCode ? "network check failed" : "network ok");
