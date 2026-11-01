# Programming Student Desk (Android)

The Programming Learner as its own offline Android app. A home menu lists every course in `programming-learner/data/catalog.js` (Slick and Chisel included) and opens one with `?lang=<id>`, the same query the Desk launcher uses. The asset root mirrors just that learner and the shared `languages/learners.css` and `languages/lsd-lang.js` files it loads. The rest of the Desk is not in the app.

Package id: `com.squirelworks.programmingstudentdesk`. The debug build adds `.debug`; the release AAB does not. Store name: Programming Student Desk. Minimum Android: 7.0 (API 24). compileSdk and targetSdk: 36.

This AAB is not published on GitHub. There is no rolling GitHub release, no tag, and no Actions workflow for it. v0.0.5 stays unpublished. Build the release bundle on your machine.

## Build the release AAB

Java 17 and Android SDK 36 (platform `android-36`, build-tools `36.0.0`). Android Gradle Plugin 8.9.1, Gradle 8.11.1.

Debug builds are signed with an app-local debug-style keystore at `android/app/debug.keystore` (alias `androiddebugkey`, store and key password `android`). That file is gitignored. Release signing does not use it. `bundleRelease` reads `UPLOAD_STORE_FILE`, `UPLOAD_STORE_PASSWORD`, `UPLOAD_KEY_ALIAS`, and `UPLOAD_KEY_PASSWORD` from the environment, or from the same keys in gitignored `android/local.properties`. Do not commit the upload keystore or those passwords.

```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64   # a JDK 17, wherever it lives
export ANDROID_HOME=$HOME/android-sdk                 # or your SDK path
cd SquirrelGo-Apps/programming-student-desk/android
echo "sdk.dir=$ANDROID_HOME" > local.properties
keytool -genkeypair -keystore app/debug.keystore \
  -storepass android -keypass android -alias androiddebugkey \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -dname "CN=Android Debug, OU=Android, O=Unknown, L=Unknown, ST=Unknown, C=US"
# Release only: export UPLOAD_STORE_FILE, UPLOAD_STORE_PASSWORD,
# UPLOAD_KEY_ALIAS, and UPLOAD_KEY_PASSWORD, or put them in local.properties.
chmod +x gradlew
./gradlew bundleRelease
# output: app/build/outputs/bundle/release/app-release.aab
```

`bundleRelease` runs `tools/pack_assets.py` first. That copies `programming-learner` (the page, `app.js`, and `data/`, including `catalog.js`, `slick.js`, and `chisel.js`) plus `languages/learners.css` and `languages/lsd-lang.js` into `android/app/build/generated/deskAssets/`. Those copies are build output, not a second source tree. The pack fails if Slick or Chisel is missing from the catalog or if a catalog id has no `data/<id>.js`.

`./gradlew assembleDebug` builds the debug APK. Its application id is `com.squirelworks.programmingstudentdesk.debug`.

The same menu is `www/index.html`. The Desk launcher opens this folder's `index.html`, which keeps `?lang=` and the hash and redirects there. A course id opens `programming-learner/index.html?lang=<id>`. Any other id stays on the menu. The system Back button returns from a course to the menu. `http` and `https` links open in the browser.

## Not in this app

- The other Desk learners, `languages/` data, Klingon, or the SquirrelGo apps.
- A `suite.js` entry. This app is a Desk tool, not a SquirrelGo sibling.
- A GitHub release. v0.0.5 stays unpublished, and this app does not add a `*-latest` release.
