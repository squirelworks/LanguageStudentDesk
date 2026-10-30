// Prints, as JSON, everything the meaning network learns from: the meaning
// matrix and its language columns, the Vocabulary Learner decks and the
// SquirrelGo Kanji meanings. Run by build_network.py; not loaded by the page.
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..");
global.window = global;
const load = (rel) => new Function(fs.readFileSync(path.join(ROOT, rel), "utf8"))();

const tl = path.join(ROOT, "translation-learner", "data");
for (const f of fs.readdirSync(tl)) if (f.endsWith(".js") && f !== "network.js") load("translation-learner/data/" + f);

const decks = {};
const deckDir = path.join(ROOT, "vocabulary-learner", "decks");
for (const f of fs.readdirSync(deckDir)) {
  load("vocabulary-learner/decks/" + f);
  const id = f.replace(/\.js$/, "");
  // Desk decks are [word, reading, English, note]; Klingon has no reading.
  decks[id] = (window.LSD_DECKS[id] || []).flatMap((d) =>
    d.words.map((w) => (id === "klingon" ? [w[0], "", w[1]] : [w[0], w[1], w[2]]))
  );
}

load("SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/www/data/kanji.js");
const kanji = SCRIPTS.kanji.chars.map((k) => [k.char, k.kun && k.kun !== "-" ? k.kun : k.on || "", k.info || ""]);

process.stdout.write(
  JSON.stringify({
    meanings: window.TL_MEANINGS,
    sentences: window.TL_SENTENCES,
    columns: window.TL_LANGS,
    decks,
    kanji,
  })
);
