# Language Student Desk (Android)

One offline Android app for the Desk learners. A home menu opens each learner's `index.html` inside a WebView. The asset root mirrors the repo, so the learners' relative links (`../languages/`, `../SquirrelGo-Apps/`, `?lang=`) work the same way they do on the desktop.

Package id: `com.squirelworks.lsd.debug` (the debug build adds `.debug`). Minimum Android: 7.0 (API 24).

This APK is not published. There is no rolling GitHub release and no Actions workflow for it. Build it on your machine and sideload it.

## What's in the menu

- Klingon (tlhIngan Hol)
- Character Learner
- Resource Learner
- Reference Learner
- Translation Learner
- Programming Learner (Slick and Chisel included; the course list follows `programming-learner/data/catalog.js`)
- Legalese Learner
- Language Learner
- Grammar Learner
- Vocabulary Learner

Pick a language or a programming course on the menu. Tools that take `?lang=` open in that one. The system Back button returns to the menu. `https` links (resource lists) open in the browser. Recorded character audio is packed with the app. Where a learner asks the WebView to speak, the device text-to-speech engine is used if that language is installed.

## Build the debug APK

Java 17 and Android SDK 36 (platform `android-36`, build-tools `35.0.0`). Same Gradle wrapper as the other SquirrelGo apps (AGP 8.9.1, Gradle 8.11.1).

```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64   # a JDK 17, wherever it lives
export ANDROID_HOME=$HOME/android-sdk                 # or your SDK path
cd SquirrelGo-Apps/lsd-suite/android
echo "sdk.dir=$ANDROID_HOME" > local.properties
chmod +x gradlew
./gradlew assembleDebug
# output: app/build/outputs/apk/debug/app-debug.apk
```

`assembleDebug` runs `tools/pack_assets.py` first. That copies the learners, `languages/`, `klingon/`, and the SquirrelGo `www` data the learners load into `android/app/build/generated/deskAssets/`. Those copies are build output, not a second source tree.

The same menu is `www/index.html`. The Desk launcher opens the folder's `index.html`, which redirects there, and the links resolve in the repo as well as in the APK.

## Not in this APK

- Phrasebook recordings (`www/audio/`). Vocabulary still has the phrase text from `packs.js`.
- The dictionary's generated JMdict shards. They are not in the repo (`squirrelgo-dictionary/tools/fetch_data.sh` builds them). Vocabulary decks from `languages/` and the SquirrelGo scripts still load; dictionary search does not until those shards exist and you rebuild.
- The SquirrelGo apps as separate activities, and the Orthodox Bible. Install those from their own APKs.
- A GitHub release. v0.0.5 stays unpublished, and this app does not add a `*-latest` release.
