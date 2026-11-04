# SquirrelGo Bopomofo

Offline Zhuyin (注音, Bopomofo) trainer for Android and desktop browsers, part of LanguageStudentDesk.

Teaches Taiwan's phonetic alphabet the way textbooks mark readers: **聲母** initials, **介音** medials ㄧ ㄨ ㄩ, **韻母** finals, the four tone marks plus neutral **˙**, then short reading practice (for example 你好 as ㄋㄧˇ ㄏㄠˇ). Charts, lesson groups, quizzes and flashcards reuse the SquirrelGo Kana trainer shell; hints and examples are original.

Stroke-order animations and a checked writing pad cover every standalone Zhuyin symbol in the chart (initials, medials, finals, and drawable tone marks). Paths live in `www/data/strokes/zhuyin.js`, made by `tools/gen_zhuyin_strokes.py`; they are drawn by hand over the Noto Sans TC glyphs, so each animation finishes as the printed symbol. Audio uses the device's **zh-TW** text-to-speech voice in the WebView shell; no recorded clips.

## Web / desktop

Open `www/index.html` in a browser. The top-level `index.html` redirects there for the Desk launcher.

## Android release AAB

Package id: `com.squirelworks.squirrelgobopomofo` (debug builds add `.debug`).

```bash
export ANDROID_HOME=$HOME/android-sdk
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
# Optional Play signing (gitignored): upload.storeFile, upload.storePassword,
# upload.keyAlias, upload.keyPassword — or the UPLOAD_* environment variables.
cd android && ./gradlew bundleRelease assembleRelease
```

Release builds run `syncWwwAssets` automatically (copies `www/` into `android/app/src/main/assets/www` before packaging).

## Layout

- `www/data/bopomofo.js` — lessons, chart groups and articles
- `www/data/strokes/zhuyin.js` — stroke paths for chart symbols
- `www/js/app.js`, `js/strokes.js`, `js/pad.js`, `js/writepad.js` — trainer UI (SquirrelGo Kana shell)
- `android/` — WebView shell with native TTS bridge (API 36)
