# 0003: Migration onto one Kotlin and Compose codebase

- Status: **Accepted** by the owner on 2026-11-21 (Kotlin and Compose
  Multiplatform, legacy apps kept). Nothing here removes or replaces a
  WebView app.
- Date: 2026-11-21
- Builds on `0001-native-apps.md` and `0002-dictionaries.md`. Dictionary
  screens: #371, #372. Shared core: #373. Builds: #374.

## The question

Every phone app is a web page in a WebView, and the Desk opens the same pages
in a browser. #197 and 0001 chose Kotlin and Compose, with desktop and phone
as two builds of one codebase. This record is the inventory of what moves,
and the order it moves in. The legacy JavaScript stays in the tree and keeps
working until the owner signs off on that program.

## Inventory

The Desk launcher (`LanguageStudentDesk.py`) is the list of programs. Names
below are the ones it shows. A native build is added beside the legacy one.
It does not take the legacy folder's place.

### Desk

The Desk is the Python launcher and the browser learners it opens: Klingon,
Character Learner, Resource Learner, Reference Learner, Translation Learner,
Programming Learner, Math Learner, Electronics Learner, Legalese Learner,
Language Learner, Grammar Learner and Vocabulary Learner. Desktop downloads
are the Linux, Windows and macOS archives from the release workflow. Those
archives stay until each learner has a native screen and the owner signs off.

### Phone shells around Desk learners

- **Language Student Desk** (`SquirrelGo-Apps/lsd-suite`): the learners in one
  offline app.
- **Programming Student Desk** (`SquirrelGo-Apps/programming-student-desk`):
  the Programming Learner.
- **Maths Edu-Training Helper** (`SquirrelGo-Apps/math-student-desk`): the
  Math Learner. The name stays Maths Edu-Training Helper.
- **Electronics Student Desk** (`SquirrelGo-Apps/electronics-student-desk`):
  the Electronics Learner.

### SquirrelGo WebView apps

Under `SquirrelGo-Apps/`, each with its own `www/` and Android project:

- SquirrelGo Kana, SquirrelGo Bopomofo, SquirrelGo Alphabets, SquirrelGo Kanji
  and SquirrelGo Klingon, under `squirrelgo-characters/`.
- SquirrelGo Japanese-English Dictionary (`squirrelgo-dictionary`). It stays
  the Japanese-English dictionary. The new Japanese-only dictionary is a
  different app (0002).
- SquirrelGo Phrasebook.
- SquirrelGo Orthodox Bible.

Shared WebView code lives in `SquirrelGo-Apps/shared/` (`strokes.js`,
`writepad.js`, `pad.js`, `speech.js`, `suite.js`). A native port replaces a
module once, in `native/core`, and every build uses that module.

### New dictionaries (not ports)

These have no WebView twin. 0002 is the product decision. Both are thin
builds of `native/ui/dictionary` and `native/core`:

- **SquirrelGo 国語辞典**, Japanese only, package
  `com.squirelworks.squirrelgokokugo`.
- **SquirrelGo Multilingual Dictionary**, package
  `com.squirelworks.squirrelgomultidictionary`.

## Decision

One Gradle project, `native/`, as 0001 drew it:

```
native/
  core/                 common code: kana, deinflection, language list,
                        favorites, and later the pack reader
  ui/dictionary/        Compose screens both dictionary builds share
  android/<app>/        application id, manifest, the file that holds favorites
  desktop/<app>/        the same screens, packaged for the OS it is built on
```

Platform code is the favorite-language file and, later, speech and pack
downloads. Screens and dictionary rules stay in the shared modules. Adding a
phone or desktop build does not copy those modules.

Language lists come from the language metadata already generated from the
pinned squirrel-lang-data commit (`languages/*/meta.json`). They are sorted
A–Z by the display name the screen shows. A default only preselects a row.
Starred languages are a Favorites section above that list, and the full list
under it stays A–Z, with nothing pinned. The stars are stored in the app's
own files and survive a restart. The same core type does this for every app.

Dictionary entries and packs stay in squirrel-lang-data. A pin in this repo
may name only a commit that is on that repo's `main`. There is no
`dictionaries-v*` release to pin yet, so the first builds search with the
shared kana and deinflection code and show the empty-entry line when no pack
is installed. They do not invent entries.

## Order

Each step is its own PR. Legacy `www/` is not deleted in any of them.

1. **This record.**
2. **Shared core.** Port `squirrelgo-dictionary/www/js/kana.js` and
   `deinflect.js` to Kotlin. Tests replay those files' results. Favorite
   languages live in this module.
3. **SquirrelGo 国語辞典.** Android and desktop entry points, Japanese chrome,
   the shared search and the shared language list. Signed with the debug
   keystore the SquirrelGo apps already commit (one file, not a new copy).
4. **SquirrelGo Multilingual Dictionary.** The same screens, with the
   catalog's display names and its own entry points.
5. **The WebView apps, one at a time.** Character apps first, because they
   share strokes and the writing pad (0001). Phrasebook, the Japanese-English
   dictionary and the Orthodox Bible after those. Then the Desk shells
   (Language Student Desk, Programming Student Desk, Maths Edu-Training
   Helper, Electronics Student Desk), then the Desk learners. A desktop build
   of a screen ships in the same step as the phone build.
6. **Packs, when squirrel-lang-data has a `dictionaries-v*` commit on
   `main`.** Reader, bundled pin, and the download flow from 0002. That moves
   the pin in its own PR.

## Builds

PR and push workflows compile and run the core tests. They upload nothing.
A test APK comes only from the hand-started SquirrelGo test APK workflow, and
that artifact expires after seven days. APKs and AABs are not committed.
AABs are not uploaded to GitHub. A release of a native app carries a Linux
build, a Windows build and a macOS build, made on that OS's runner. Play
listing text and screenshots stay out of the repo until the owner asks.

## Out of scope here

- Removing or rewriting a WebView app, `LanguageStudentDesk.py`, or the
  browser learners.
- Renaming Maths Edu-Training Helper.
- squirrelator's `translate()` API.
- Editing `suite.js` to advertise an app that has no pack and no release yet.
  The suite line is part of #374, with the release.
