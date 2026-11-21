# Archived Alphabets WebView shell

This is the old Android WebView project for SquirrelGo Alphabets. Nothing builds it.
The app that ships is the native one, package `com.squirelworks.squirrelgoalphabets`,
and the release file is `SquirrelGoAlphabets.apk`, signed with the committed debug key.

The lessons, stroke files, recordings and the browser page stayed in
`SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/`. The native build
reads those files, and the shared scripts in `www/js/` are copies of
`SquirrelGo-Apps/shared/` that the other apps still sync.
