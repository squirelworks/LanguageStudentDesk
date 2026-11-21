# Archived Kanji WebView shell

This is the old Android WebView project for SquirrelGo Kanji. Nothing builds it.
The app that ships is the native one, package `com.squirelworks.squirrelgokanji`,
and the release file is `SquirrelGoKanji.apk`, signed with the committed debug key.

The lessons, stroke files, words and the browser page stayed in
`SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/`. The native build
reads those files, and the shared scripts in `www/js/` are copies of
`SquirrelGo-Apps/shared/` that the other apps still sync.
