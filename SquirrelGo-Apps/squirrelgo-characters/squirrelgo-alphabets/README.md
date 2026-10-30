# SquirrelGo Alphabets

Offline trainer for four writing systems, for Android and desktop browsers, part of LanguageStudentDesk.

The TenguGo series had a separate app for each of these alphabets (Hangul, Cyrillic, Hindi/Devanagari and Arabic). SquirrelGo Alphabets covers all four in one app with the same lesson, chart, quiz, flashcard and writing tools as SquirrelGo Kana. It is a new implementation: hints, groupings, example choices and articles are original. Not affiliated with TenguLogi.

## Scripts

| Script | Language values | Lessons | Extras |
| --- | --- | --- | --- |
| Hangul 한글 | Korean (Revised Romanization) | basic and compound vowels; basic, aspirated and tense consonants | syllable block builder; articles on block shapes, batchim and sound changes |
| Cyrillic Кириллица | Russian | true friends, false friends, new shapes, hushing sounds, y-vowels, hard and soft signs | articles on stress, hard/soft consonants and handwriting |
| Devanagari देवनागरी | Hindi (simplified IAST) | vowels, vowel signs on क, the five consonant rows, semivowels and sibilants, special letters | articles on matras, conjuncts, aspiration/retroflex and the silent a |
| Arabic العربية | Modern Standard Arabic | letters in shape families, extra letters, short vowel marks | letter forms table (isolated, initial, medial, final); articles on joining and sun/moon letters |

Audio uses the device's text-to-speech voice for each language (Korean, Russian, Hindi, Arabic). Install the voice data in Android's text-to-speech settings; the listening quiz is hidden for languages with no voice installed.

## Install the APK

Download [`SquirrelGoAlphabets-debug.apk`](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-alphabets-latest/SquirrelGoAlphabets-debug.apk) from the **SquirrelGo Alphabets (latest build)** pre-release ([release page](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-alphabets-latest)) and sideload it. The `SquirrelGo Alphabets APK` GitHub Actions workflow rebuilds and republishes it on every push to `main` that touches this folder; builds on other branches are only uploaded as run artifacts.

- Package id: `com.squirelworks.squirrelgoalphabets.debug`
- Min Android: 7.0 (API 24)

## Web / desktop

Open `www/index.html` in a browser (no build step).

## Adding a script

Add a file under `www/data/` that pushes a script object onto `window.SG_SCRIPTS` (copy `cyrillic.js` for the shape) and add a `<script>` tag for it in `www/index.html`. `www/js/` is shared with SquirrelGo Kana; keep the two copies the same.

## Rebuild Android APK locally

Same steps as SquirrelGo Kana: copy `www` into `android/app/src/main/assets/www`, then `./gradlew assembleDebug` in `android/`.
