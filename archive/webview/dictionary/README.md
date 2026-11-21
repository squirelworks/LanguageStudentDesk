# Archived Japanese-English Dictionary WebView shell

This is the old Android WebView project for SquirrelGo Japanese-English Dictionary. Nothing builds it.
The app that ships is the native one, package `com.squirelworks.squirrelgodictionary`,
and the release file is `SquirrelGoJapaneseDictionary.apk`, signed with the committed debug key.

The browser page stayed in `SquirrelGo-Apps/squirrelgo-dictionary/`. The native build
reads the word list that `tools/fetch_data.sh` writes there.
