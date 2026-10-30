# Character Learner

Modular, TenguGo / SquirrelGo-style character learning tool for multiple scripts.

## Supported scripts

- Hiragana
- Katakana
- Arabic
- Cyrillic
- Hangul
- Devanagari (Hindi)
- Kanji — full Jōyō set (**2,136** characters), same dataset as [SquirrelGo Kanji](../squirrelgo-kanji/)

## Features

- Learn mode: click a character for details; **kanji show stroke-order animation** (Hanzi Writer; stroke JSON via jsDelivr when online)
- Recognition / meaning quiz
- Flashcards
- Beginning Kanji **Lessons** and **Topics** quizzes (ported from SquirrelGo)
- On-yomi groups view (for kanji)

## Architecture

- `index.html` — core learning application UI and logic
- `scripts/*.js` — modular script data (`kanji.js`, `catalog.js`, `lessons.js`, …)
- `vendor/hanzi-writer.min.js` — stroke animation engine

Open `index.html` in a browser. No build step required.

Part of LanguageStudentDesk.
