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
| Top 1,000 words | The language's most frequent words, what the Desk knows of each, the same meaning in the other Desk languages, and rank-weighted practice. |

When an English answer misses a meaning but uses a word the **meaning network** places right next to it
("The boy sleeps" for *Qong puq*, the child sleeps), that word counts as **close**: half credit in the
meaning score, never a pass.

Progress is kept in the browser (`localStorage`, key `lsd-translation-v1`).

## Files

| File | |
|---|---|
| `data/matrix.js` | The meaning matrix: `TL_MEANINGS` (meaning id → English), `TL_SENTENCES` (rows), `TL_PACK_TITLES` |
| `data/<lang>.js` | One column per language: how it renders the rows, token by token |
| `tokens.js` | Builds and checks columns against the matrix, checks translations, breaks down text. No DOM, so it runs under node |
| `net.js` | Reads the meaning network's vectors and compares them |
| `data/network.js` | The trained meaning network (generated) |
| `data/wordbank/<lang>.js` | Each word bank with what the network knows of it (generated) |
| `tools/build_network.py` | Fetches the word banks and trains the network |
| `tools/export_sources.js` | Hands the Desk's data to the trainer as JSON |
| `tools/wordlists/<lang>.txt` | The cached top-1,000 frequency lists |
| `check.js` | `node translation-learner/check.js` validates every column and the network's close/not-close line; run it after any data change |
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

## The meaning network

The matrix says exactly which meaning each token carries. The network adds a sense of which meanings,
English words and Desk words are *near* each other, so the tool can tell a close miss from a wrong one.

`tools/build_network.py` builds a graph whose nodes are meanings (`m:water`), English words (`en:water`)
and words in each language (`hangul:물`). Edges come from:

- the matrix: a meaning and its English, a token and its meaning, meanings that share a sentence;
- the Vocabulary Learner decks: a word and the words of its English gloss (and the matrix meaning, when the gloss is one);
- SquirrelGo Kanji: a kanji and its first English meaning;
- the word banks: a word that is plainly a form of a known word (Korean noun + particle or verb stem + ending, a Russian ending that fits the base word's kind, an Arabic article, conjunction or pronoun attached) and that word.

It then trains a skip-gram network with negative sampling (word2vec's model) on random walks over the
graph (DeepWalk), giving every node a 24-number vector, stored as int8 in `data/network.js` (about 300 KB).
Training is seeded and takes about a minute:

```
python3 translation-learner/tools/build_network.py           # retrain from the cached word lists
python3 translation-learner/tools/build_network.py --fetch   # download the word lists again first
node translation-learner/check.js
```

Two words count as close at a cosine similarity of 0.85 or more (`CLOSE` in the script). Words that share
sentences or topics sit lower (tea and coffee about 0.7, hot and cold about 0.6), and `check.js` holds a
few pairs on each side of the line so a retrain cannot quietly blur them.

What it cannot do: a word the Desk has never glossed has no place in the network, so it is neither close
nor far; it is simply unknown. Glosses give one sense per word, so homographs (Korean 이 is listed as
"two") show only that sense.

### Word banks

The 1,000 most frequent words per language come from Hermit Dave's
[FrequencyWords](https://github.com/hermitdave/FrequencyWords) lists, built from OpenSubtitles and licensed
**CC BY-SA 4.0** (the credit is in every list and word bank file, and on the page). The 2018 lists are used,
except Hindi, which only has a 2016 list of under 600 usable words. Klingon has no frequency list, so it
has no word bank tab.

| Language | Words with a Desk meaning | Read as a form of one |
|---|---|---|
| Japanese | 233 | — |
| Korean | 97 | 62 |
| Chinese | 133 | — |
| Russian | 124 | 87 |
| Hindi | 27 of 582 | — |
| Arabic | 89 | 62 |

The rest of each list is the clearest guide to which words the decks should cover next. Add them to
`vocabulary-learner/decks/<lang>.js` and retrain: they join the network and the word bank on their own.

## Adding a language

1. Make sure the language exists in `languages/<id>/meta.json` (and in `registry.js`, via `languages/build_registry.py`).
2. Create `data/<id>.js` with `window.TL_LANGS.<id> = { sep, r: { ... } }`, rendering any rows of the matrix you like. You do not have to render every row.
3. Need a sentence the matrix lacks? Add a row to `TL_SENTENCES` (and any new meanings to `TL_MEANINGS`); every other language can then render it too.
4. Add the id to `COLUMNS` in `app.js`. If the Vocabulary Learner has a deck for it, add it to `DECKS` too so Break down knows more words.
5. For a word bank, add the language to `BANKS` in `tools/build_network.py` (its FrequencyWords path and
   the characters its words are written with) and to `BANKS` in `app.js`, then run the script with `--fetch`.
   Its deck and column join the network on the next retrain either way.
6. Run `node translation-learner/check.js` until it prints `matrix ok` and `network ok`, then open the tool on the Desk server.

## Why not Squirrelator

This folder used to be a browser copy of [squirrelator](https://github.com/squirelworks/squirrelator)'s
rules: a handful of patterns ("print hello", "count from 1 to 5", "set x to 10") turned into code in
Python, QuickBASIC and others, with Latin and Klingon output that was the Python code plus a comment.
Squirrelator is still that rule matcher; it has no human-language translation to wire in, so the tool
now practises translation on sentences written for the Desk instead.
