# SquirrelGo Kanji

TenguGo-style kanji trainer for modern Android (and desktop browsers).

This is a **new open implementation** inspired by the discontinued TenguGo Kanji workflow (lessons → packet quizzes → flashcard review → on-yomi groups → dictionary). Lesson prose is original. Kanji readings/meanings come from the existing LanguageStudentDesk Jōyō dataset. Not affiliated with TenguLogi.

## Install the APK

Debug build (sideload):

- `SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/SquirrelGoKanji-debug.apk`
- Package id: `com.squirelworks.squirrelgokanji.debug`
- Min Android: 7.0 (API 24)

On your phone: enable install from unknown sources / “Install unknown apps” for your file manager, then open the APK.

## Features

- Beginning Kanji lessons + how-to guide
- Quizzes by JLPT level (N5–N1) and by topic
- Review flashcards (details / readings / meta)
- On-yomi reading groups
- Offline dictionary search over ~2,136 Jōyō entries

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
