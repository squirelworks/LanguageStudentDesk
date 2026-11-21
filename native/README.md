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

SquirrelGo 国語辞典 is `com.squirelworks.squirrelgokokugo`. SquirrelGo Multilingual Dictionary is `com.squirelworks.squirrelgomultidictionary`. A test APK comes from
the hand-started SquirrelGo test APK workflow. Release builds sign with the
debug keystore already committed for the SquirrelGo apps. Desktop packages for
Linux, Windows and macOS are attached by the Native desktop builds workflow
when a release is published.
