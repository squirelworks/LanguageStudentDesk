# Programming Student Desk

The menu is `www/index.html`. The Desk launcher opens this folder's `index.html`, which redirects there. The Programming Learner stays in the repo and keeps the same relative links.

The Android app that ships is the native build, package `com.squirelworks.programmingstudentdesk`. The release file is [`ProgrammingStudentDesk.apk`](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/ProgrammingStudentDesk.apk), signed with the committed debug key. A test APK can be built by hand with the `SquirrelGo test APK` workflow, choosing `programming-native`.

The old WebView shell is in `archive/webview/programming/` and is not built.
