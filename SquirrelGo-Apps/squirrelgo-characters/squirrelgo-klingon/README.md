# SquirrelGo Klingon

Offline trainer for reading and writing **pIqaD**, the Klingon alphabet, for Android and desktop browsers, part of LanguageStudentDesk.

## Features

- All 26 pIqaD letters and the 10 numerals in six lessons: vowels, familiar consonants, crisp consonants, the capital-letter sounds (D, H, S, Q), throat sounds (q, gh, tlh, ') and numerals
- Each letter with its romanization, IPA, audio, how to say it, a "sounds like" respelling and an example word written in pIqaD (with IPA and audio)
- **Stroke order** for every character: an animated, numbered drawing you can replay
- **Writing practice** that checks each stroke: draw on the pad and a good stroke snaps to the clean shape; a wrong one, or one drawn backwards, is wiped with a hint. Trace over a guide or write from memory, with Hint, Undo and Clear. Checking can be turned off for free drawing
- Quizzes: see the letter and pick the sound, see the sound and pick the letter, hear it and pick the letter, read a whole word, or mixed. Word questions only use letters from the lessons you picked. A character counts as mastered after three right answers in a row
- Flashcards with Again / Got it
- Chart in alphabet order, with numerals and punctuation
- **Write words**: type Klingon in romanization and see it in pIqaD, letter by letter; copy the text (ConScript code points) or practise writing its letters
- Two pIqaD styles: Handwriting (even-weight, matches the stroke drawings) and Classic (sharp, blade-like)
- Articles: about pIqaD, reading the romanization, pronunciation guide, how to write pIqaD, numbers

There is no Klingon text-to-speech voice, so the app ships its own clips in `www/audio/` (about 200 KB), synthesized from IPA with eSpeak NG: one per letter and one per example word. They sound robotic but every sound is the right one, including the retroflex D and S, uvular q and Q, lateral tlh and the glottal stop. To regenerate them after changing letters, IPA or words (needs `espeak-ng` and `ffmpeg`):

```
node tools/clips.js > /tmp/clips.json
python3 ../../tools/ipa_audio.py /tmp/clips.json www/audio
```

## Install the APK

Download [`SquirrelGoKlingon-debug.apk`](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-klingon-latest/SquirrelGoKlingon-debug.apk) from the **SquirrelGo Klingon (latest build)** pre-release ([release page](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-klingon-latest)) and sideload it. The `SquirrelGo Klingon APK` GitHub Actions workflow rebuilds and republishes it on every push to `main` that touches this folder; builds on other branches are only uploaded as run artifacts.

- Package id: `com.squirelworks.squirrelgoklingon.debug`
- Min Android: 7.0 (API 24)

## Web / desktop

Open `www/index.html` in a browser (no build step). The top-level `index.html` redirects there so the Desk launcher lists the app.

## Layout

- `www/data/klingon.js`: lessons, sound descriptions, example words and articles
- `www/data/strokes.js`: stroke paths for every letter and numeral in a 100 × 100 box (M, L and Q commands only)
- `www/js/strokes.js`: stroke sampling, SVG drawing, animation and stroke matching
- `www/js/writepad.js`: the checked writing pad
- `www/js/klingon-audio.js`: romanization to IPA, clip names and playback
- `www/audio/`: generated audio clips; `tools/clips.js` lists them
- `www/js/app.js`: screens and navigation
- `www/fonts/`: the two pIqaD fonts and their licence

## Content and licences

Lesson groupings, sound descriptions, stroke orders and articles are original. There is no official pIqaD stroke order; the orders here are suggestions for smooth handwriting, drawn over the shapes of the pIqaD qolqoS font. Example words are a small set of everyday words (numbers, greetings, a few nouns); the app does not include dictionary content.

Fonts, both under the SIL Open Font License 1.1 (full text and credits in `www/fonts/OFL.txt`):

- `pIqaD-qolqoS.ttf`: pIqaD qolqoS by Daniel Dadap, unmodified
- `pIqaD-classic.ttf`: the pIqaD block cut from Constructium by Kreative Software and renamed "SquirrelGo pIqaD Classic"

pIqaD is stored at the ConScript Unicode Registry code points (U+F8D0–F8FF). Not affiliated with Paramount, CBS or the Klingon Language Institute.

## Rebuild Android APK locally

Copy `www` into `android/app/src/main/assets/www`, then run `./gradlew assembleDebug` in `android/`.
