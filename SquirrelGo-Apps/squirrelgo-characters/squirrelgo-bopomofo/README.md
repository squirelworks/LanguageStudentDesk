# SquirrelGo Bopomofo

Offline Zhuyin (注音, Bopomofo) trainer for Android and desktop browsers, part of LanguageStudentDesk.

Teaches Taiwan's phonetic alphabet the way textbooks mark readers: **聲母** initials, **介音** medials ㄧ ㄨ ㄩ, **韻母** finals, the four tone marks plus neutral **˙**, then short reading practice (for example 你好 as ㄋㄧˇ ㄏㄠˇ). Charts, lesson groups, quizzes and flashcards reuse the SquirrelGo Kana trainer shell; hints and examples are original.

Stroke-order animations and a checked writing pad cover every standalone Zhuyin symbol in the chart (initials, medials, finals, and drawable tone marks). Paths live in `www/data/strokes/zhuyin.js`, made by `tools/gen_zhuyin_strokes.py`; they are drawn by hand over the Noto Sans TC glyphs, so each animation finishes as the printed symbol. Audio uses the device's **zh-TW** text-to-speech voice in the WebView shell; no recorded clips.

The stroke files are generated from squirrel-lang-data (`data/strokes/zhuyin.jsonl`) by `python3 languages/build_registry.py`, so a fix goes into the data repo; `tools/gen_zhuyin_strokes.py` only drafts new strokes, which are then copied there.

## Web / desktop

Open `www/index.html` in a browser. The top-level `index.html` redirects there for the Desk launcher.

## Android

The release file is [`SquirrelGoBopomofo.apk`](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoBopomofo.apk), the native app, package `com.squirelworks.squirrelgobopomofo`, signed with the committed debug key. The WebView shell is archived at `archive/webview/bopomofo/` and is not built.

From the repo root:

```bash
export ANDROID_HOME=$HOME/android-sdk
cd native
echo "sdk.dir=$ANDROID_HOME" > local.properties
./gradlew :android:bopomofo:assembleRelease
```

## Layout

- `www/data/bopomofo.js` — lessons, chart groups and articles
- `www/data/strokes/zhuyin.js` — stroke paths for chart symbols
- `www/js/app.js`, `js/strokes.js`, `js/pad.js`, `js/writepad.js` — trainer UI (SquirrelGo Kana shell)
- `android/` — WebView shell with native TTS bridge (API 36)
