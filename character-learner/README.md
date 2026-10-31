# Character Learner

Modular character learning tool for Language Student Desk.

## Supported scripts

- Hiragana, Katakana
- Arabic, Cyrillic, Hangul, Devanagari
- Klingon pIqaD
- Latin, Greek, Armenian, Georgian, Bengali, Gurmukhi, Gujarati, Odia, Meetei Mayek, Tamil, Telugu,
  Kannada, Malayalam, Sinhala, Hebrew, Ethiopic, Tifinagh, Cherokee, Inuktitut syllabics,
  Mongolian, Burmese, Thai, Lao, Khmer, Tibetan — the SquirrelGo Alphabets scripts, loaded
  from that app's data files
- Kanji — full **Jōyō set (2,136)**, identical to [SquirrelGo Kanji](../SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/)
- Hanzi — the 1,799 characters of HSK 3.0 levels 1–6, by level, with pinyin and traditional forms (`?lang=chinese`)
- Hanja — the 1,800 basic hanja for education, with hangul readings, next to Hangul (`?lang=hangul`)

Kanji, hanzi and hanja come from one shared table, so a character used by more than one
tradition shows each tradition's reading on its detail card.

## Features

- Learn / Quiz / Flashcards
- Click a character for details
- **Kanji stroke-order animation** (shared KanjiVG data from SquirrelGo — works offline)
- **Stroke order and checked writing pad for every non-kanji script with SquirrelGo data**
  (every script above except kanji, which has its own KanjiVG player).
  Cards with two letters, such as Greek "Α α", animate both and let you pick which one to write.
- Recorded sounds from SquirrelGo Alphabets for Speak, falling back to the browser's voice
- `?lang=` scopes come from the shared `languages/` registry (`characterKeys`, else
  `writingSystems`); a script id such as `?lang=greek` works too
- Kanji **Lessons** and **Topics** (shared SquirrelGo curriculum)
- On-yomi groups

## Where the data lives

Character Learner holds UI and logic only. The Desk's own scripts are in each
language's folder, listed under `data.characters` in its `meta.json`, and load
through `languages/lsd-lang.js`:

- `languages/japanese/characters.js` — Hiragana, Katakana
- `languages/arabic/characters.js`, `languages/cyrillic/characters.js`,
  `languages/hangul/characters.js`, `languages/hindi/characters.js` (Devanagari)
- `languages/klingon/characters.js` — pIqaD
- Kanji, hanzi and hanja — `languages/cjk/characters.js` (the shared CJK table:
  radical, strokes, and which traditions use each character) plus each
  tradition's readings: `languages/japanese/kanji.js`, `languages/chinese/hanzi.js`,
  `languages/hangul/hanja.js`, put together by `LSD.load`

`scripts/sg-alphabets.js` is logic only: it turns SquirrelGo Alphabets' data
files into Character Learner scripts.

## Shared SquirrelGo content

Character Learner loads these from `SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/www/`:

- `data/strokes.js` + `js/strokes.js` — writing animations for all 2,136 Jōyō kanji
- `data/catalog.js` + `js/lessons.js` — topics & beginning lessons

and from `SquirrelGo-Apps/squirrelgo-characters/squirrelgo-klingon/www/`:

- `data/strokes.js` — pIqaD stroke order

and from `SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/www/`:

- `data/<script>.js` — letters, hints and examples for the scripts the Desk does not define itself
  (`scripts/sg-alphabets.js` turns them into Character Learner scripts)
- `data/strokes/<script>.js` — stroke orders for every Alphabets script, used by the Desk's own
  Arabic, Cyrillic, Hangul and Devanagari too (Hangul double finals such as ㄳ are drawn from their two parts)
- `data/audio/<script>.js` + `audio/` — recorded sounds
- `js/strokes.js` + `js/writepad.js` — the stroke player and the writing pad that checks each stroke,
  for pIqaD as well (its table is filed under the key `klingon`)

The Alphabets `<script>` tags in `index.html` (between the `sg-alphabets` markers) are written by
`SquirrelGo-Apps/tools/sync-shared.sh` from the Alphabets app's own `index.html`, so a new Alphabets
script shows up here after one sync. CI runs `sync-shared.sh --check` to catch a missed sync.

and from `SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/www/`:

- `data/strokes/hiragana.js`, `data/strokes/katakana.js` — kana stroke orders (KanjiVG)
- `data/audio/hiragana.js`, `data/audio/katakana.js` + `audio/` — recorded kana sounds

Open `index.html` in a browser (from the repo tree so relative paths resolve).

Part of LanguageStudentDesk.
