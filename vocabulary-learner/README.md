# Vocabulary Learner

Flashcards, spaced review and Anki export for every language in `languages/`.
Open with `?lang=<id>` (for example `?lang=japanese`) or pick a language on the start page.

**Where the words come from**

| Language | Decks |
|---|---|
| Japanese | SquirrelGo Kana example words (hiragana, katakana), the ten SquirrelGo Phrasebook packs, SquirrelGo Kanji by JLPT level, and dictionary lookups from the SquirrelGo Dictionary |
| Korean, Russian, Hindi, Arabic | SquirrelGo Alphabets example words |
| Klingon, Chinese | Starter decks written for the Desk (`decks/*.js`) |
| Any language | My words: add your own |

The SquirrelGo data files are loaded straight from `SquirrelGo-Apps/`, so the apps and the Desk share one copy.
Dictionary search needs the dictionary data, which is generated rather than committed: run
`SquirrelGo-Apps/squirrelgo-dictionary/tools/fetch_data.sh` once.

**Review** uses a simplified SM-2 schedule (`srs.js`): Again / Hard / Good / Easy, learning steps of 1 and 10 minutes,
then intervals in days. New cards per day and the direction (word → meaning, meaning → word, or both) are settings.

**Export** writes a tab-separated file with Anki's import headers (`#notetype`, `#deck column`, `#tags column`),
one subdeck per deck under `SquirrelGo::<Language>`.

Progress is stored in the browser (`localStorage`, key `lsd-vocab-v1`); the Export tab can back it up to a file.
