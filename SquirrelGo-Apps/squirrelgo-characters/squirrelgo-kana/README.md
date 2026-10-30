# SquirrelGo Kana

Offline hiragana and katakana trainer for Android and desktop browsers, part of LanguageStudentDesk.

It covers the same ground as the old TenguGo Kana app (lessons by sound row, voiced and combination kana, charts, flashcards, quizzes and spelling notes) but is a new implementation. All hints, example choices and articles are original. Not affiliated with TenguLogi.

## Features

- 14 hiragana and 14 katakana lessons: the basic rows, voiced kana (゛ ゜), combination sounds (ゃ ゅ ょ) and the extended katakana used for loanwords (ファ, ティ, ウェ …)
- Each character with romaji, a pronunciation hint and an example word, with audio
- Charts laid out in the traditional rows, coloured by quiz progress
- Quizzes: see the kana and pick the sound, see the sound and pick the kana, hear it and pick the kana, or mixed. A character counts as mastered after three right answers in a row; missed ones can be drilled on their own
- Flashcards with Again / Got it
- Writing pad with a faint guide character
- 10 short articles: the three Japanese scripts, voiced marks, small っ, long vowels, particles は へ を, how ん changes, look-alike kana

Audio uses the device's Japanese text-to-speech voice. On Android: Settings › Accessibility (or System) › Text-to-speech, then install Japanese voice data.

## Install the APK

Sideload `SquirrelGoKana-debug.apk` from this folder. The `SquirrelGo Kana APK` GitHub Actions workflow rebuilds it on every push that touches this folder and also uploads it as a run artifact.

- Package id: `com.squirelworks.squirrelgokana.debug`
- Min Android: 7.0 (API 24)

## Web / desktop

Open `www/index.html` in a browser (no build step). The top-level `index.html` redirects there so the Desk launcher lists the app.

## Layout

- `www/data/kana.js` — all lessons and articles. Each character is `[kana, romaji, hint, example, example romaji, meaning]`; `null` leaves a gap in the chart
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
