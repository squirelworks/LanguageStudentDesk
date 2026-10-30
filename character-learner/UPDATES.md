# Character Learner updates

- Modular scripts (`scripts/*.js`)
- Full Jōyō kanji (2136) with JLPT levels
- 182 on-yomi groups
- Arabic positional forms on cards
- Full Devanagari, Cyrillic, Hangul
- Klingon pIqaD with embedded font

## 2026-10-31 (stroke depth, W2.5)

- Stroke-order animation and checked writing pad for Arabic, Cyrillic, Hangul and Devanagari, from SquirrelGo Alphabets' stroke data
- 21 more scripts loaded straight from SquirrelGo Alphabets, each with strokes, pad and recorded sounds
- pIqaD now uses the same stroke player and pad files as the Alphabets scripts
- `?lang=` reads the `languages/` registry instead of a list kept in this tool

## 2026-10-31

- Restored click-to-detail for all scripts
- Kanji writing animations via shared SquirrelGo KanjiVG stroke data (2,136/2,136)
- Lessons + Topics modes wired to SquirrelGo curriculum
- Confirmed kanji dataset parity with SquirrelGo Kanji (same Jōyō file)

## 2026-10-30

- pIqaD detail: stroke-order animation and a writing pad that checks each stroke, loaded from SquirrelGo Klingon (same data and pad as the Android app)
