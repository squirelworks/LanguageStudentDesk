// Meaning tokens for the Translation Learner.
//
// The meaning matrix (data/matrix.js) lists meanings once, language-neutral,
// and the sentences built from them. A language (data/<lang>.js) renders
// sentences as tokens, each pointing back at the matrix:
//   [text, reading, meaning]
// text is the token as written. A leading "-" joins it to the token before
// (a suffix or particle written solid), a trailing "-" joins it to the token
// after (a prefix). reading is its romanization or kana ("" when the text is
// already romanized). meaning is a matrix id ("student", "@topic"), or several
// joined with "+" when one token carries more than one ("not+know").
//
// A rendering must carry exactly the sentence's meanings: build() reports any
// it drops or adds. A meaning the language leaves to context (Japanese often
// says no "I") is listed in the rendering's implied list instead.
//
// Checking a learner's translation works the same way: every meaning must be
// found in their words, and any word no meaning (or the model answer)
// accounts for counts as added. No DOM here, so this file runs under node too.
(function (root) {
  "use strict";

  // One meaning id -> { id, grammar, label, alts }.
  function meaning(id, meanings) {
    const raw = meanings[id];
    if (raw == null) return null;
    const m = /^\((.*?)\)(.*)$/.exec(raw);
    if (m) return { id, grammar: true, label: m[1], alts: m[2] ? m[2].split("|") : [] };
    const alts = raw.split("|").filter(Boolean);
    return { id, grammar: false, label: alts[0] || id, alts };
  }

  function bare(text) {
    return text.replace(/^-|-$/g, "");
  }

  function glued(tokens, i) {
    return i > 0 && (tokens[i].text.startsWith("-") || tokens[i - 1].text.endsWith("-"));
  }

  // Joins tokens into the written sentence. sep is " " for languages written
  // with spaces and "" for Japanese and Chinese.
  function join(tokens, sep, end) {
    return tokens.map((t, i) => (i && !glued(tokens, i) ? sep : "") + bare(t.text)).join("") + (end || "");
  }

  // Joins readings: solid pieces with "-" (jeo-neun, al-kitāb), words with spaces.
  function joinReading(tokens) {
    if (!tokens.some((t) => t.reading)) return "";
    return tokens.map((t, i) => (i ? (glued(tokens, i) ? "-" : " ") : "") + bare(t.reading)).join("");
  }

  // Turns a language column into sentences ready to practise, checking each
  // rendering against its matrix row. Returns { sentences, problems }.
  function build(matrix, lang) {
    const problems = [];
    const rows = new Map(matrix.sentences.map((s) => [s.id, s]));
    const sentences = [];
    for (const [id, r] of Object.entries(lang.r || {})) {
      const row = rows.get(id);
      if (!row) { problems.push(id + ": no such sentence in the matrix"); continue; }
      const tokens = r.t.map(([text, reading, ids]) => ({
        text,
        reading: reading || "",
        units: ids.split("+").map((mid) => {
          const u = meaning(mid, matrix.meanings);
          if (!u) problems.push(id + ": unknown meaning " + mid);
          return u || { id: mid, grammar: false, label: mid, alts: [] };
        }),
      }));
      const implied = (r.implied || []).map((mid) => meaning(mid, matrix.meanings) || { id: mid, grammar: false, label: mid, alts: [] });
      const carried = tokens.flatMap((t) => t.units).filter((u) => !u.grammar).map((u) => u.id).concat(implied.map((u) => u.id));
      const missing = row.m.filter((mid) => !carried.includes(mid));
      const extra = carried.filter((mid) => !row.m.includes(mid));
      if (missing.length) problems.push(id + ": drops " + missing.join(", "));
      if (extra.length) problems.push(id + ": adds " + extra.join(", "));
      sentences.push({ id, pack: row.pack, en: row.en, end: r.end || "", tokens, implied, sep: lang.sep });
    }
    return { sentences, problems };
  }

  // ---- English side ----

  const CONTRACTIONS = {
    "i'm": "i am", "you're": "you are", "we're": "we are", "they're": "they are",
    "he's": "he is", "she's": "she is", "it's": "it is", "that's": "that is",
    "what's": "what is", "where's": "where is", "who's": "who is", "there's": "there is",
    "here's": "here is", "how's": "how is", "let's": "let us",
    "i've": "i have", "you've": "you have", "we've": "we have", "they've": "they have",
    "i'll": "i will", "you'll": "you will", "we'll": "we will", "it'll": "it will",
    "i'd": "i would", "you'd": "you would",
    "can't": "can not", "cannot": "can not", "won't": "will not", "don't": "do not",
    "doesn't": "does not", "didn't": "did not", "isn't": "is not", "aren't": "are not",
    "wasn't": "was not", "weren't": "were not", "haven't": "have not", "hasn't": "has not",
    "shouldn't": "should not", "wouldn't": "would not", "couldn't": "could not",
  };

  // Words English needs where other languages use word order, endings or
  // nothing at all. They never count as added meaning.
  const FUNCTION_WORDS = new Set(
    "a an the is am are was were be been being do does did it there".split(" ")
  );

  // Light stemming so "books" matches "book" and "eating" matches "eat".
  // Both sides go through the same function, so a stem only has to be
  // consistent, not a real word ("live", "lived", "living" all give "liv").
  function stem(w) {
    let s = w;
    if (s.length > 4 && s.endsWith("ies")) s = s.slice(0, -3) + "y";
    else if (s.length > 4 && s.endsWith("ing") && /[aeiouy]/.test(s.slice(0, -3))) s = s.slice(0, -3);
    else if (s.length > 4 && s.endsWith("ed") && /[aeiouy]/.test(s.slice(0, -2))) s = s.slice(0, -2);
    else if (s.length > 4 && /(ches|shes|sses|xes)$/.test(s)) s = s.slice(0, -2);
    else if (s.length > 3 && s.endsWith("s") && !s.endsWith("ss")) s = s.slice(0, -1);
    if (s !== w && /([b-df-hj-np-tv-z])\1$/.test(s) && !/(ll|ss)$/.test(s)) s = s.slice(0, -1);
    if (s.length > 3 && s.endsWith("e")) s = s.slice(0, -1);
    return s;
  }

  // English text -> [{ word, stem }], contractions expanded.
  function englishWords(text) {
    const out = [];
    const raw = (text || "")
      .toLowerCase()
      .replace(/[’‘]/g, "'")
      .replace(/\([^)]*\)/g, " ")
      .split(/[^a-z0-9']+/)
      .filter(Boolean);
    for (let w of raw) {
      w = w.replace(/^'+|'+$/g, "");
      if (!w) continue;
      const expanded = CONTRACTIONS[w] || (w.endsWith("n't") ? w.slice(0, -3) + " not" : w.endsWith("'s") ? w.slice(0, -2) : w);
      for (const part of expanded.split(" ")) out.push({ word: part, stem: stem(part) });
    }
    return out;
  }

  // Finds alt (one or more words) in the learner's words, skipping used ones.
  function findAlt(words, used, alt) {
    const want = englishWords(alt).map((w) => w.stem);
    if (!want.length) return null;
    for (let i = 0; i + want.length <= words.length; i++) {
      let ok = true;
      for (let k = 0; k < want.length; k++) {
        if (used[i + k] || words[i + k].stem !== want[k]) { ok = false; break; }
      }
      if (ok) return Array.from({ length: want.length }, (_, k) => i + k);
    }
    return null;
  }

  // Checks an English translation of a built sentence.
  // Returns { units, added: [word], dropped, honest }, one unit per meaning:
  //   { token (index, or -1 when implied), meaning, status, matched: [word] }
  // status: "kept" (found), "dropped" (content meaning missing), "shown"
  // (grammar English showed with a word), "grammar", "implied" (left to
  // context and not written, which is fine).
  function checkEnglish(sentence, answer) {
    const words = englishWords(answer);
    const used = words.map(() => false);
    const units = [];
    sentence.tokens.forEach((t, i) => t.units.forEach((u) => units.push({ token: i, meaning: u, status: "", matched: [] })));
    sentence.implied.forEach((u) => units.push({ token: -1, meaning: u, status: "", matched: [] }));
    // Content first, then implied, then grammar; longest alternative first,
    // so "thank you" wins over "you".
    const rank = (x) => (x.meaning.grammar ? 2 : x.token < 0 ? 1 : 0);
    for (const x of units.slice().sort((p, q) => rank(p) - rank(q))) {
      const alts = x.meaning.alts.slice().sort((p, q) => q.split(" ").length - p.split(" ").length);
      let hit = null;
      for (const alt of alts) if ((hit = findAlt(words, used, alt))) break;
      if (hit) {
        hit.forEach((k) => (used[k] = true));
        x.matched = hit.map((k) => words[k].word);
        x.status = x.meaning.grammar ? "shown" : "kept";
      } else {
        x.status = x.meaning.grammar ? "grammar" : x.token < 0 ? "implied" : "dropped";
      }
    }
    const model = new Set(englishWords(sentence.en).map((w) => w.stem));
    const added = [];
    words.forEach((w, k) => {
      if (used[k] || FUNCTION_WORDS.has(w.word) || model.has(w.stem)) return;
      added.push(w.word);
    });
    const dropped = units.filter((x) => x.status === "dropped").length;
    return { units, added, dropped, honest: dropped === 0 && added.length === 0 };
  }

  // ---- Target-language side ----

  // Checks tiles placed for a sentence. placed is a list of tokens (the
  // sentence's own, or distractors). Tokens with the same text are
  // interchangeable. Returns { missing: [token], extra: [token], orderOk, honest }.
  function checkTiles(sentence, placed) {
    const want = sentence.tokens.map((t) => t.text);
    const left = sentence.tokens.slice();
    const extra = [];
    for (const p of placed) {
      const i = left.findIndex((t) => t.text === p.text);
      if (i >= 0) left.splice(i, 1);
      else extra.push(p);
    }
    const missing = left;
    const honest = !missing.length && !extra.length;
    const orderOk = honest && placed.map((p) => p.text).join("\u0000") === want.join("\u0000");
    return { missing, extra, orderOk, honest };
  }

  // ---- Breaking down any sentence ----

  // A lexicon is built from [text, reading, gloss] entries: every token of a
  // language's sentences, plus extra words (the Vocabulary Learner decks).
  // Lookups go by written form and, for Japanese, by kana reading too.
  function lexicon(entries, opts) {
    const byForm = new Map();
    const add = (key, e, affix) => {
      if (!key) return;
      const list = byForm.get(key) || [];
      if (!list.some((x) => x.e[2] === e[2] && x.affix === affix)) list.push({ e, affix });
      byForm.set(key, list);
    };
    for (const e of entries) {
      const text = e[0];
      const affix = text.startsWith("-") ? "suffix" : text.endsWith("-") ? "prefix" : "";
      add(bare(text), e, affix);
      if (opts && opts.byReading && e[1]) add(e[1].replace(/\s+/g, ""), e, affix);
    }
    let longest = 1;
    byForm.forEach((_, k) => (longest = Math.max(longest, [...k].length)));
    return { byForm, longest, caseless: !(opts && opts.caseSensitive) };
  }

  // Splits one chunk (a word, or a whole Japanese/Chinese sentence) into the
  // longest known pieces. Unknown stretches come back with gloss null.
  function segment(chunk, lex) {
    const chars = [...chunk];
    const out = [];
    let unknown = "";
    const flush = () => {
      if (unknown) out.push({ text: unknown, reading: "", gloss: null });
      unknown = "";
    };
    for (let i = 0; i < chars.length; ) {
      let hit = null;
      for (let len = Math.min(lex.longest, chars.length - i); len > 0 && !hit; len--) {
        const piece = chars.slice(i, i + len).join("");
        const list = lex.byForm.get(piece) || (lex.caseless ? lex.byForm.get(piece.toLowerCase()) : null);
        if (!list) continue;
        const atStart = i === 0, atEnd = i + len === chars.length;
        const fit =
          list.find((x) => !x.affix) ||
          list.find((x) => x.affix === "suffix" && !atStart) ||
          list.find((x) => x.affix === "prefix" && atStart && !atEnd);
        if (fit) hit = { text: piece, reading: fit.e[1], gloss: fit.e[2], len };
      }
      if (hit) {
        flush();
        out.push(hit);
        i += hit.len;
      } else {
        unknown += chars[i];
        i++;
      }
    }
    flush();
    return out;
  }

  // Breaks a sentence into meaning tokens. spaced says whether the language
  // separates words with spaces.
  function breakDown(text, lex, spaced) {
    const clean = text.replace(/[.,!?;:"“”«»。、！？「」…؟،।]/g, " ").trim();
    if (!clean) return [];
    // Spaced languages are cut into words first; Japanese and Chinese run on.
    const chunks = spaced ? clean.split(/\s+/) : [clean.replace(/\s+/g, "")];
    return chunks.flatMap((c, i) => segment(c, lex).map((p) => Object.assign(p, { word: i })));
  }

  const api = { meaning, bare, join, joinReading, build, englishWords, stem, checkEnglish, checkTiles, lexicon, segment, breakDown };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.MeaningTokens = api;
})(this);
