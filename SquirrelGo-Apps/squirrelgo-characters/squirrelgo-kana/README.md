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

Download [`SquirrelGoKana.apk`](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoKana.apk) from the latest SquirrelGo release ([release page](https://github.com/squirelworks/LanguageStudentDesk/releases/latest)) and sideload it. That file is the native app. A test APK can be built by hand with the `SquirrelGo test APK` workflow, choice `kana-native`.

- Package id: `com.squirelworks.squirrelgokana`
- Min Android: 7.0 (API 24)

## Web / desktop

Open `www/index.html` in a browser (no build step). The top-level `index.html` redirects there so the Desk launcher lists the app.

## Layout

- `www/data/kana.js` — all lessons and articles. Each character is `[kana, romaji, hint, example, example romaji, meaning]`; `null` leaves a gap in the chart
- `www/data/strokes/` — stroke order, made from [KanjiVG](https://kanjivg.tagaini.net) (© Ulrich Apel, CC BY-SA 3.0) by `tools/build_strokes.py`; these files stay under CC BY-SA 3.0

  The stroke files are generated from squirrel-lang-data (`data/strokes/{hiragana,katakana,kana}.jsonl`) by `python3 languages/build_registry.py`, so a fix goes into the data repo; `tools/build_strokes.py` only drafts new strokes, which are then copied there.
- `www/data/kana-strokes.js` — the same KanjiVG data for all 177 kana in SquirrelGo Kanji's stroke format (`KANA_STROKES`, also merged into `KANJI_STROKES`), for the kanji stroke player and Character Learner
- `www/audio/` and `www/data/audio/` — clips recorded with eSpeak NG by `tools/build_audio.py` (needs espeak-ng, ffmpeg and node; rerun it after changing words in `kana.js`)
- `www/js/app.js` — the trainer (shared with SquirrelGo Alphabets)

The Android WebView shell is archived at `archive/webview/kana/` and is not built. The native app is `native/android/kana` and `native/desktop/kana`.

## Rebuild the Android APK locally

From the repo root:

```bash
export ANDROID_HOME=$HOME/android-sdk   # or your SDK path
cd native
echo "sdk.dir=$ANDROID_HOME" > local.properties
./gradlew :android:kana:assembleRelease
# output: android/kana/build/outputs/apk/release/SquirrelGoKana-<version>.apk
```
