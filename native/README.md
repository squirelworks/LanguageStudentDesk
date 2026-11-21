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

The build reads the WebView app's own `versionCode` and fails if a port's version code is not greater. Compile-only CI does the same against the newest `squirrelgo-v*` release tag when that tag already contains the version file, and it uploads nothing. Release packages and APKs carry the app's own version name.

The WebView `www/` stays until a later parity change. SquirrelGo Kana and SquirrelGo Bopomofo are chart builds of the same screen. Quiz, the writing pad and audio are still the WebView builds.

SquirrelGo 国語辞典 is `com.squirelworks.squirrelgokokugo`. SquirrelGo Multilingual Dictionary is `com.squirelworks.squirrelgomultidictionary`. A test APK comes from
the hand-started SquirrelGo test APK workflow. Release builds sign with the
debug keystore already committed for the SquirrelGo apps. Desktop packages for
Linux, Windows and macOS are attached by the Native desktop builds workflow
when a release is published.
