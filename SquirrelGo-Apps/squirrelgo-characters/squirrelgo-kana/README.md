# SquirrelGo Kana

Offline hiragana and katakana trainer for Android and desktop browsers, part of LanguageStudentDesk.

It covers the same ground as the old TenguGo Kana app (lessons by sound row, voiced and combination kana, charts, flashcards, quizzes and spelling notes) but is a new implementation. All hints, example choices and articles are original. Not affiliated with TenguLogi.

## Features

- 14 hiragana and 14 katakana lessons: the basic rows, voiced kana (゛ ゜), combination sounds (ゃ ゅ ょ) and the extended katakana used for loanwords (ファ, ティ, ウェ …), each with a short note on what to watch for
- Each character with romaji, a pronunciation hint and an example word, with audio
- Stroke-order animation and a checked writing pad for every character, combinations included
- Recorded sounds for every character, example word and practice word, so audio and the listening quiz work with no Japanese text-to-speech voice installed
- Charts laid out in the traditional rows, coloured by quiz progress
- Quizzes: see the kana and pick the sound, see the sound and pick the kana, hear it and pick the kana, or mixed. A character counts as mastered after three right answers in a row; missed ones can be drilled on their own
- Flashcards with Again / Got it
- Writing pad with a faint guide character
- 21 short articles: the three Japanese scripts, voiced marks, small っ, long vowels, particles は へ を, how ん changes, look-alike kana, quiet vowels, じ/ぢ and ず/づ, punctuation and vertical writing, and reading practice with audio: words for each row, voiced and combination sounds, small っ and long vowels, short sentences, loanwords, extended katakana, place names and sound words

Recorded clips play first; anything without one uses the device's Japanese text-to-speech voice. On Android: Settings › Accessibility (or System) › Text-to-speech, then install Japanese voice data.

## Install the APK

Download [`SquirrelGoKana-debug.apk`](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-kana-latest/SquirrelGoKana-debug.apk) from the **SquirrelGo Kana (latest build)** pre-release ([release page](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-kana-latest)) and sideload it. The `SquirrelGo Kana APK` GitHub Actions workflow rebuilds and republishes it on every push to `main` that touches this folder; builds on other branches are only uploaded as run artifacts.

- Package id: `com.squirelworks.squirrelgokana.debug`
- Min Android: 7.0 (API 24)

## Web / desktop

Open `www/index.html` in a browser (no build step). The top-level `index.html` redirects there so the Desk launcher lists the app.

## Layout

- `www/data/kana.js` — all lessons and articles. Each character is `[kana, romaji, hint, example, example romaji, meaning]`; `null` leaves a gap in the chart
- `www/data/strokes/` — stroke order, made from [KanjiVG](https://kanjivg.tagaini.net) (© Ulrich Apel, CC BY-SA 3.0) by `tools/build_strokes.py`; these files stay under CC BY-SA 3.0
- `www/audio/` and `www/data/audio/` — clips recorded with eSpeak NG by `tools/build_audio.py` (needs espeak-ng, ffmpeg and node; rerun it after changing words in `kana.js`)
- `www/js/app.js` — the trainer (shared with SquirrelGo Alphabets)
- `android/` — WebView shell targeting API 34, with a native text-to-speech bridge

## Rebuild Android APK locally

```bash
export ANDROID_HOME=$HOME/android-sdk   # or your SDK path
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
rm -rf android/app/src/main/assets/www
cp -a www android/app/src/main/assets/www
cd android
./gradlew assembleDebug
# output: app/build/outputs/apk/debug/app-debug.apk
```
