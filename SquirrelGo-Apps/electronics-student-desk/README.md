# Electronics Student Desk

The menu is `www/index.html`. The Desk launcher opens this folder's `index.html`, which redirects there. The Electronics Learner stays in the repo and keeps the same relative links.

The Android app that ships is the native build, package `com.squirelworks.electronicsstudentdesk`. The release file is [`ElectronicsStudentDesk.apk`](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/ElectronicsStudentDesk.apk), signed with the committed debug key. A test APK can be built by hand with the `SquirrelGo test APK` workflow, choosing `electronics-native`.

The old WebView shell is in `archive/webview/electronics/` and is not built. Its Play listing pack is `archive/webview/electronics/app/src/main/play/`.
