# Native apps

Kotlin and Compose Multiplatform builds. The WebView apps stay where they are.
The plan is `docs/decisions/0003-native-migration.md`.

`core` is the shared code: romaji and kana, deinflection, and favorite
languages. `ui/dictionary` is the screen both dictionary apps draw. Each app
under `android/` and `desktop/` is a thin entry point.

Language rows are generated at build time from `languages/*/meta.json`, which
comes from the pinned squirrel-lang-data commit. Favorite languages are stored
in the app's own files.

## Checks

Java 17 and Android SDK 37. The Compose artifacts this tree uses do not build against an older SDK.

```bash
cd native
echo "sdk.dir=$ANDROID_HOME" > local.properties
./gradlew :core:jvmTest :ui:dictionary:jvmTest :android:japanese-dictionary:assembleDebug :android:multilingual-dictionary:assembleDebug :desktop:japanese-dictionary:compileKotlin :desktop:multilingual-dictionary:compileKotlin
```

Each native app keeps its version in its own file under `native/versions/`. The file names a semantic version. Android and the desktop package for that app both use it. The version code is computed from that version: the major number times one million, plus the minor number times one thousand, plus the patch. A port of a WebView app starts at 2.0.0. A new app starts at 1.0.0. The application id and the shared debug keystore stay as they are.

The build reads the WebView app's own `versionCode` and fails if a port's version code is not greater. The major number is at least 1, the minor number is at most 255, and the patch is at most 999. Compile-only CI fetches the release tags and fails if a version code went backwards compared with the newest `squirrelgo-v*` tag, when that tag already contains the file. An equal version is fine, and CI uploads nothing. The release workflow requires a higher version when that app's sources changed since the previous release tag. A change in a shared module counts for every app that depends on it, following the Gradle project dependencies from the app through `core`, `ui`, and the rest. The same check counts the shared Gradle setup, the native tools, and the files each app's generator reads: lesson data and recordings for a character app, language metadata for a dictionary. Release packages and APKs carry the app's own version name.

SquirrelGo Kana is the lessons, chart, quiz, flashcards, writing pad, articles, recorded audio, and the SquirrelGo apps sheet from the WebView app, drawn by one Compose UI on Android and desktop. The sheet lists the sister apps, notes, and resources from the shared suite file. Android checks again which of those apps are installed each time Kana returns to the foreground. Android's back button closes that sheet and a confirmation, then returns through the previous screen, and leaves the app from the home screen. Formatted articles and a few playback details are still ahead of this build, so the WebView app stays in place. SquirrelGo Bopomofo still uses the chart on that same screen. Quiz, the writing pad, and audio for Bopomofo stay on the WebView build until its own parity change.

SquirrelGo 国語辞典 is `com.squirelworks.squirrelgokokugo`. SquirrelGo Multilingual Dictionary is `com.squirelworks.squirrelgomultidictionary`. A test APK comes from
the hand-started SquirrelGo test APK workflow. Release builds sign with the
debug keystore already committed for the SquirrelGo apps. Desktop packages for
Linux, Windows and macOS are attached by the Native desktop builds workflow
when a release is published.
