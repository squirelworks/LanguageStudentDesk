# Character Learner

Modular character learning tool for Language Student Desk.

## Supported scripts

- Hiragana, Katakana
- Arabic, Cyrillic, Hangul, Devanagari
- Klingon pIqaD
- Kanji — full **Jōyō set (2,136)**, identical to [SquirrelGo Kanji](../SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/)

## Features

- Learn / Quiz / Flashcards
- Click a character for details
- **Kanji stroke-order animation** (shared KanjiVG data from SquirrelGo — works offline)
- **pIqaD stroke order and checked writing pad** (shared with SquirrelGo Klingon)
- Kanji **Lessons** and **Topics** (shared SquirrelGo curriculum)
- On-yomi groups

## Shared SquirrelGo content

Character Learner loads these from `SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/www/`:

- `data/strokes.js` + `js/strokes.js` — writing animations for all 2,136 Jōyō kanji
- `data/catalog.js` + `js/lessons.js` — topics & beginning lessons

and from `SquirrelGo-Apps/squirrelgo-characters/squirrelgo-klingon/www/`:

- `data/strokes.js` + `js/strokes.js` + `js/writepad.js` — pIqaD stroke order and the writing pad that checks each stroke

Open `index.html` in a browser (from the repo tree so relative paths resolve).

Part of LanguageStudentDesk.
