# Language Student Desk

The suite menu is `www/index.html`. The Desk launcher opens this folder's `index.html`, which redirects there. Learner pages stay in the repo and keep the same relative links (`../languages/`, `../SquirrelGo-Apps/`, `?lang=`).

The Android app that ships is the native build, package `com.squirelworks.lsd`. The release file is [`LanguageStudentDesk.apk`](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/LanguageStudentDesk.apk), signed with the committed debug key. A test APK can be built by hand with the `SquirrelGo test APK` workflow, choosing `lsd-native`.

The old WebView shell is in `archive/webview/lsd-suite/` and is not built.
