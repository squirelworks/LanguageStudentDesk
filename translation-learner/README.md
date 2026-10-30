# Translation Learner

Sentence translation practice that checks meaning, not spelling. Every sentence is split into
**meaning tokens**, and a translation is honest when it carries every meaning of the original and
adds none. Open with `?lang=<id>` (for example `?lang=japanese`) or pick a language on the start page;
the language list comes from the shared registry in `languages/`.

| Tab | What it does |
|---|---|
| Into English | Shows a sentence; you type English. Each token lights up green when your words carry its meaning, red when a meaning is missing, and any word that no meaning accounts for is listed as added. |
| Into the language | Shows English; you build the sentence from tiles. Some tiles carry meanings from other sentences, so picking one adds meaning. Right pieces in another order are reported separately from wrong pieces. |
| Break down a sentence | Splits any text into the longest known pieces, using the lesson sentences plus the Vocabulary Learner decks, and marks pieces with no known meaning. |
| Meaning matrix | Every sentence (row) in every language (column). Hover a cell to see which piece carries which meaning. |

Progress is kept in the browser (`localStorage`, key `lsd-translation-v1`).

## Files

| File | |
|---|---|
| `data/matrix.js` | The meaning matrix: `TL_MEANINGS` (meaning id → English), `TL_SENTENCES` (rows), `TL_PACK_TITLES` |
| `data/<lang>.js` | One column per language: how it renders the rows, token by token |
| `tokens.js` | Builds and checks columns against the matrix, checks translations, breaks down text. No DOM, so it runs under node |
| `check.js` | `node translation-learner/check.js` validates every column; run it after any data change |
| `app.js`, `index.html` | The page |

## The meaning matrix

Meanings are written once, language-neutral:

```js
window.TL_MEANINGS = {
  i: "I|me|my|mine|myself",      // content: English that may carry it, "|" between alternatives
  student: "student|pupil",
  "@topic": "(topic marker)as for",  // grammar: "(label)" then English that may show it, if any
  ...
};
```

A row is one sentence, its model English and the content meanings it carries:

```js
{ id: "i-am-student", pack: "people", en: "I am a student.", m: ["i", "student"] }
```

A language column renders rows as tokens `[text, reading, meaning]`:

```js
window.TL_LANGS.hangul = {
  sep: " ",                       // "" for languages written without spaces
  r: {
    "i-am-student": { end: ".", t: [["저", "jeo", "i"], ["-는", "neun", "@topic"], ["학생", "haksaeng", "student"], ["-이에요", "ieyo", "@copula"]] },
    "dont-know": { end: ".", implied: ["i"], t: [["몰라요", "mollayo", "not+know"]] },
  },
};
```

- A leading `-` glues a token to the one before (suffixes, particles written solid); a trailing `-` glues it to the one after (prefixes).
- One token carrying two meanings joins them with `+` (`not+know`).
- A meaning the language leaves to context (Japanese and Korean often drop "I") goes in `implied`. Learners may leave it out of their English.
- `reading` is the romanization, or kana for Japanese (romaji is generated from it). Leave it `""` when the text is already romanized, as for Klingon.
- Each column must carry exactly its row's `m`: `check.js` reports any meaning a rendering drops or adds, and checks that the row's own English passes the translation checker.

## Adding a language

1. Make sure the language exists in `languages/<id>/meta.json` (and in `registry.js`, via `languages/build_registry.py`).
2. Create `data/<id>.js` with `window.TL_LANGS.<id> = { sep, r: { ... } }`, rendering any rows of the matrix you like. You do not have to render every row.
3. Need a sentence the matrix lacks? Add a row to `TL_SENTENCES` (and any new meanings to `TL_MEANINGS`); every other language can then render it too.
4. Add the id to `COLUMNS` in `app.js`. If the Vocabulary Learner has a deck for it, add it to `DECKS` too so Break down knows more words.
5. Run `node translation-learner/check.js` until it prints `matrix ok`, then open the tool on the Desk server.

## Why not Squirrelator

This folder used to be a browser copy of [squirrelator](https://github.com/squirelworks/squirrelator)'s
rules: a handful of patterns ("print hello", "count from 1 to 5", "set x to 10") turned into code in
Python, QuickBASIC and others, with Latin and Klingon output that was the Python code plus a comment.
Squirrelator is still that rule matcher; it has no human-language translation to wire in, so the tool
now practises translation on sentences written for the Desk instead.
