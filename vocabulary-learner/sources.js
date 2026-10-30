// Word sources for the Vocabulary Learner. Each language maps to a list of
// loaders; a loader returns decks of cards:
//   deck = { id, title, group, cards: [card] }
//   card = { front, reading, back, note, speak }
// front is the word in the target language, reading its pronunciation
// (kana, romaji, pinyin...), back the English meaning.
// The SquirrelGo mobile apps' data files are plain scripts that set globals,
// so they load over file:// as well as from the Desk's local server.
(() => {
  const APPS = "../SquirrelGo-Apps/";
  const KANA = APPS + "squirrelgo-characters/squirrelgo-kana/www/data/kana.js";
  const ALPHA = APPS + "squirrelgo-characters/squirrelgo-alphabets/www/data/";
  const KANJI = APPS + "squirrelgo-characters/squirrelgo-kanji/www/data/kanji.js";
  const PHRASES = APPS + "squirrelgo-phrasebook/www/data/packs.js";
  const ROMAJI = APPS + "squirrelgo-phrasebook/www/js/romaji.js";

  // The kana and alphabet files both write window.SG_SCRIPTS, so each is
  // loaded into a fresh array and the result kept per file.
  // Loads run one at a time so two files never share the array.
  const sgCache = {};
  let sgQueue = Promise.resolve();
  function sgScripts(src) {
    if (!sgCache[src]) {
      sgCache[src] = sgQueue = sgQueue.catch(() => {}).then(async () => {
        window.SG_SCRIPTS = [];
        await LSD.loadScript(src);
        const got = window.SG_SCRIPTS;
        window.SG_SCRIPTS = [];
        return got;
      });
    }
    return sgCache[src];
  }

  // Example words from a SquirrelGo Kana / Alphabets script, one per letter.
  // Rows are [letter, sound, hint, example, example reading, meaning, speak?].
  function exampleDeck(script, group) {
    const seen = new Set();
    const cards = [];
    for (const lesson of script.lessons || []) {
      for (const c of lesson.chars || []) {
        if (!c || !c[3] || seen.has(c[3])) continue;
        seen.add(c[3]);
        cards.push({ front: c[3], reading: c[4], back: c[5], note: "Example word for " + c[0] + " (" + c[1] + ")", speak: c[3] });
      }
    }
    return { id: "sg-" + script.id + "-words", title: script.title + " example words", group, cards };
  }

  function alphabetLoader(file, scriptId) {
    return async () => {
      const scripts = await sgScripts(ALPHA + file);
      const s = scripts.find((x) => x.id === scriptId);
      return s ? [exampleDeck(s, "SquirrelGo Alphabets")] : [];
    };
  }

  async function kanaDecks() {
    const scripts = await sgScripts(KANA);
    return scripts.map((s) => exampleDeck(s, "SquirrelGo Kana"));
  }

  async function phrasebookDecks() {
    await LSD.loadScript(ROMAJI);
    await LSD.loadScript(PHRASES);
    return (window.PHRASEBOOK_PACKS || []).map((pack) => ({
      id: "pb-" + pack.id,
      title: "Phrasebook: " + pack.title,
      group: "SquirrelGo Phrasebook",
      cards: pack.categories.flatMap((cat) =>
        cat.phrases.map((p) => ({
          front: p[1],
          reading: p[2].replace(/ /g, "") + " · " + window.Romaji.romanize(p[2]),
          back: p[0],
          note: [cat.title, p[3]].filter(Boolean).join(" — "),
          speak: p[1],
        }))
      ),
    }));
  }

  async function kanjiDecks() {
    await LSD.loadScript(KANJI);
    const all = (window.SCRIPTS && window.SCRIPTS.kanji && window.SCRIPTS.kanji.chars) || [];
    return ["N5", "N4", "N3", "N2", "N1"].map((level) => ({
      id: "kanji-" + level.toLowerCase(),
      title: "Kanji JLPT " + level,
      group: "SquirrelGo Kanji",
      cards: all
        .filter((k) => k.level === level)
        .map((k) => ({
          front: k.char,
          reading: [k.on, k.kun].filter((x) => x && x !== "-").join(" · "),
          back: k.info,
          note: [k.strokes && k.strokes + " strokes", k.radical && "radical " + k.radical].filter(Boolean).join(", "),
          speak: (k.kun || k.on || "").split(/[ /・]/)[0].replace(/[-.]/g, ""),
        })),
    }));
  }

  // Decks written for the Desk itself (decks/<lang>.js): [word, reading?, English, note].
  function deskLoader(lang, hasReading) {
    return async () => {
      await LSD.loadScript("decks/" + lang + ".js");
      return (window.LSD_DECKS[lang] || []).map((d) => ({
        id: "desk-" + d.id,
        title: d.title,
        group: "Desk starter words",
        cards: d.words.map((w) =>
          hasReading
            ? { front: w[0], reading: w[1], back: w[2], note: w[3] || "", speak: w[0] }
            : { front: w[0], reading: "", back: w[1], note: w[2] || "", speak: "" }
        ),
      }));
    };
  }

  window.VOCAB_SOURCES = {
    japanese: [kanaDecks, phrasebookDecks, kanjiDecks],
    klingon: [deskLoader("klingon", false)],
    chinese: [deskLoader("chinese", true)],
    arabic: [deskLoader("arabic", true), alphabetLoader("arabic.js", "arabic")],
    hangul: [deskLoader("hangul", true), alphabetLoader("hangul.js", "hangul")],
    cyrillic: [deskLoader("cyrillic", true), alphabetLoader("cyrillic.js", "cyrillic")],
    hindi: [deskLoader("hindi", true), alphabetLoader("devanagari.js", "devanagari")],
  };

  // Every deck for a language. A source that fails to load (a missing folder,
  // say) is reported and skipped, not fatal.
  window.loadVocabDecks = async function (lang) {
    const loaders = window.VOCAB_SOURCES[lang] || [];
    const errors = [];
    const lists = await Promise.all(
      loaders.map((fn) =>
        fn().catch((e) => {
          errors.push(e.message);
          return [];
        })
      )
    );
    return { decks: lists.flat().filter((d) => d.cards.length), errors };
  };
})();
