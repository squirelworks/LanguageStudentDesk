# Character Learner

Modular character learning tool for Language Student Desk.

## Supported scripts

- Hiragana, Katakana
- Arabic, Cyrillic, Hangul, Devanagari
- Klingon pIqaD
- Latin, Greek, Armenian, Georgian, Bengali, Gurmukhi, Gujarati, Tamil, Telugu,
  Kannada, Malayalam, Sinhala, Hebrew, Ethiopic, Cherokee, Inuktitut syllabics,
  Mongolian, Thai, Lao, Khmer, Tibetan — the SquirrelGo Alphabets scripts, loaded
  from that app's data files
- Kanji — full **Jōyō set (2,136)**, identical to [SquirrelGo Kanji](../SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/)

## Features

- Learn / Quiz / Flashcards
- Click a character for details
- **Kanji stroke-order animation** (shared KanjiVG data from SquirrelGo — works offline)
- **Stroke order and checked writing pad for every non-kanji script with SquirrelGo data**
  (all of the above except hiragana and katakana, which have no stroke data in SquirrelGo yet).
  Cards with two letters, such as Greek "Α α", animate both and let you pick which one to write.
- Recorded sounds from SquirrelGo Alphabets for Speak, falling back to the browser's voice
- `?lang=` scopes come from the shared `languages/` registry (`characterKeys`, else
  `writingSystems`); a script id such as `?lang=greek` works too
- Kanji **Lessons** and **Topics** (shared SquirrelGo curriculum)
- On-yomi groups

## Shared SquirrelGo content

Character Learner loads these from `SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/www/`:

- `data/strokes.js` + `js/strokes.js` — writing animations for all 2,136 Jōyō kanji
- `data/catalog.js` + `js/lessons.js` — topics & beginning lessons

and from `SquirrelGo-Apps/squirrelgo-characters/squirrelgo-klingon/www/`:

- `data/strokes.js` — pIqaD stroke order

and from `SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/www/`:

- `data/<script>.js` — letters, hints and examples for the 21 scripts the Desk does not define itself
  (`scripts/sg-alphabets.js` turns them into Character Learner scripts)
- `data/strokes/<script>.js` — stroke orders for all 25 Alphabets scripts, used by the Desk's own
  Arabic, Cyrillic, Hangul and Devanagari too (Hangul double finals such as ㄳ are drawn from their two parts)
- `data/audio/<script>.js` + `audio/` — recorded sounds
- `js/strokes.js` + `js/writepad.js` — the stroke player and the writing pad that checks each stroke,
  for pIqaD as well (its table is filed under the key `klingon`)

Open `index.html` in a browser (from the repo tree so relative paths resolve).

Part of LanguageStudentDesk.
