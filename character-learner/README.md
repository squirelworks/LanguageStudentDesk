# Character Learner

Modular, TenguGo-style character learning tool for multiple scripts.

## Supported scripts

- Hiragana
- Katakana
- Arabic
- Cyrillic
- Hangul
- Devanagari (Hindi)
- Kanji (stub — JLPT N5 sample + on-yomi groupings)

## Features

- Learn mode: grid of characters with details and Web Speech API pronunciation
- Recognition quiz
- Flashcards
- On-yomi groups view (for kanji)

## Architecture

- `index.html` — core learning application UI and logic
- `data.js` — modular script data. Add a new script by extending the `SCRIPTS` object.

Open `index.html` in a browser. No build step required.

Part of LanguageStudentDesk.
