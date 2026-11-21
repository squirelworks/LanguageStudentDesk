# Archived Bopomofo WebView shell

This is the old Android WebView project for SquirrelGo Bopomofo. Nothing builds it.
The app that ships is the native one, package `com.squirelworks.squirrelgobopomofo`,
and the release file is `SquirrelGoBopomofo.apk`, signed with the committed debug key.

The lessons, stroke files and the browser page stayed in
`SquirrelGo-Apps/squirrelgo-characters/squirrelgo-bopomofo/`. The native build
reads those files, and the shared scripts in `www/js/` are copies of
`SquirrelGo-Apps/shared/` that the other apps still sync.
