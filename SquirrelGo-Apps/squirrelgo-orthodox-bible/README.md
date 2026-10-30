# SquirrelGo Orthodox Bible

Offline Orthodox study Bible for Android and desktop browsers, part of LanguageStudentDesk.

It is a **new open implementation** meant to fill the gap left by the Orthodox Study Bible and Catena Bible apps, which are no longer maintained. It does the same kind of job, reading Scripture the way the Orthodox Church does with the Fathers beside it, but **contains none of their text or notes**. The Orthodox Study Bible's translation and study notes are copyrighted by Thomas Nelson, and Catena's content belongs to its makers. Everything here is public domain or openly licensed. Not affiliated with Thomas Nelson, Ancient Faith or Catena.

## Features

- Old Testament in Septuagint order, including the books the Church reads beyond the Hebrew canon (Tobit, Judith, Wisdom, Sirach, Maccabees and the rest), each marked ◆
- **Any verse side by side in other languages**: pick a main text and tick any others to read beside it, stacked under each verse on phones or in columns on wide screens
- Tap a verse to see it in every installed translation at once, with read-aloud per language
- Verse numbers line up across numbering systems (Septuagint and Slavonic psalms vs. Hebrew/KJV), so Psalm 50 in the Synodal text sits beside Psalm 51 in the KJV
- Commentary from the Church Fathers on each verse (☩ marks verses that have some)
- Bookmarks, four highlight colours and personal notes, exportable as a text file
- Search in any translation, or type a reference such as `Jn 3:16` or `Ps 50`
- Text size, light/dark theme, fully offline, no account

## Texts

The first build ships **sample chapters only** (Genesis 1, Psalm 50/51, Tobit 1, Matthew 5, John 1) from these public-domain texts, via [scrollmapper/bible_databases](https://github.com/scrollmapper/bible_databases):

| id | Text | Language | Numbering |
| --- | --- | --- | --- |
| `kjva` | King James Version with Apocrypha (1769) | English | kjv |
| `rus-synodal` | Russian Synodal (1876) | Russian | rso |
| `csl-elizabeth` | Elizabeth Bible (1757) | Church Slavonic | rso |
| `grc-byz` | Byzantine Textform Greek NT (2013) | Koine Greek | kjv |
| `ell-vamvas` | Vamvas Bible (1850) | Modern Greek | kjv |

Full texts, more languages and the patristic commentary are gathered separately and dropped into `www/data/` in the format below.

## Data format

All data files are plain scripts (no `fetch`), so the app works from `file://` and inside the Android WebView. The app loads a Bible or commentary file only when it is first used.

- `www/data/books.js`: `SGO_BOOKS`, the book list in Orthodox order with USFM ids (`GEN`, `PSA`, `SIR`, `1MA`, `JHN`...). Owned by the app.
- `www/data/catalog.js`: `SGO_CATALOG = { bibles: [{id, name, lang, dir, versification, license, source, testaments}], commentary: [{id, author, work, lang, license, source, books}] }`. The app lists only what is here.
- `www/data/bibles/<id>.js`: `SGO_BIBLES.push({id, name, lang, script, dir, versification, license, source, books: {GEN: [[v1, v2, ...], [chapter 2...]], ...}})`. Chapters and verses are 1-based arrays (index 0 is chapter/verse 1); a missing verse is `null`. Numbered in the translation's own system.
- `www/data/commentary/<id>.js`: `SGO_COMMENTARY.push({id, author, work, translator, lang, license, source, versification, notes: {"JHN.1.1": ["text..."], "MAT.5.3-12": ["text..."]}})`.
- `www/data/versification.js`: `SGO_VERSIFICATION = {lxx: {...}, rso: {...}}`, mapping each scheme's refs to KJV refs, listing only the refs that differ. `null` means the verse has no KJV equivalent (e.g. a psalm title numbered as a verse).

## Web / desktop

Open `www/index.html` in a browser (no build step). The top-level `index.html` redirects there so the Desk launcher lists the app.

## Install the APK

Download [`SquirrelGoOrthodoxBible-debug.apk`](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-orthodox-bible-latest/SquirrelGoOrthodoxBible-debug.apk) from the **SquirrelGo Orthodox Bible (latest build)** pre-release ([release page](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-orthodox-bible-latest)) and sideload it. The `SquirrelGo Orthodox Bible APK` GitHub Actions workflow rebuilds and republishes it on every push to `main` that touches this folder; builds on other branches are only uploaded as run artifacts.
