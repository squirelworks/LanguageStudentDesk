# SquirrelGo Kanji

TenguGo-style kanji trainer for modern Android (and desktop browsers).

This is a **new open implementation** inspired by the discontinued TenguGo Kanji workflow (lessons → packet quizzes → flashcard review → on-yomi groups → dictionary). Lesson prose is original. Kanji readings/meanings come from the existing LanguageStudentDesk Jōyō dataset. Not affiliated with TenguLogi.

## Install the APK

Download [`SquirrelGoKanji-debug.apk`](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-kanji-latest/SquirrelGoKanji-debug.apk) from the **SquirrelGo Kanji (latest build)** pre-release ([release page](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-kanji-latest)) and sideload it. The `SquirrelGo Kanji APK` GitHub Actions workflow rebuilds and republishes it on every push to `main` that touches this folder; builds on other branches are only uploaded as run artifacts.

- Package id: `com.squirelworks.squirrelgokanji.debug`
- Min Android: 7.0 (API 24)

On your phone: enable install from unknown sources / “Install unknown apps” for your file manager, then open the APK.

## Features

- Beginning Kanji lessons + how-to guide
- Quizzes by JLPT level (N5–N1) and by topic
- Review flashcards (details / readings / meta)
- On-yomi reading groups
- Sidebar menu for every section (a slide-out drawer on phones)
- Writing animation at the top of every kanji (tap to replay), plus step-by-step stroke charts in the Strokes tab, for all 2,136 Jōyō kanji
- Offline dictionary search over ~2,136 Jōyō entries

## Stroke data

`www/data/strokes.js` is generated from [KanjiVG](https://kanjivg.tagaini.net) (© Ulrich Apel, CC BY-SA 3.0): the stroke paths and number positions for each kanji, with coordinates rounded to one decimal. That file stays under CC BY-SA 3.0.

## Web / desktop

Open `www/index.html` in a browser (no build step).

## Rebuild Android APK

```bash
export ANDROID_HOME=$HOME/android-sdk   # or your SDK path
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
rm -rf android/app/src/main/assets/www
cp -a www android/app/src/main/assets/www
cd android
./gradlew assembleDebug
# output: app/build/outputs/apk/debug/app-debug.apk
```

## Layout

- `www/` — offline web UI (also packaged into the APK)
- `android/` — WebView shell targeting API 34
