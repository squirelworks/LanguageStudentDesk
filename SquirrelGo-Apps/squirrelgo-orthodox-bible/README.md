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

The app is one offline package with these Bibles built in: English (Brenton's Septuagint and the King James Version with Apocrypha), Greek (the Septuagint, the Patriarchal and Byzantine New Testaments and Vamvas's modern Greek), Latin (the Clementine Vulgate), Russian Synodal, Church Slavonic, Serbian, French and Arabic, plus English commentary from about 40 Church Fathers (Eastern, early and Western Fathers from before the schism).

**Content expansion.** Everything else (Syriac, Coptic, Hebrew and about 70 more Bibles, and further Fathers in English, Greek, Latin and Russian) downloads on request from the **latest SquirrelGo release on GitHub**. In Translations & settings, **Check for new texts** asks GitHub for the latest release and lists every pack it carries, including texts added after your copy of the app was built; **Download** fetches one from that release. A downloaded pack is kept on the device, so the app stays offline afterwards. Nothing is fetched unless you tap one of those buttons.

All texts are public domain or openly licensed. The full list of sources and licenses, and the scripts that build the data files, are in [`tools/texts/`](tools/texts/README.md).

## Data format

All data files are plain scripts (no `fetch`), so the app works from `file://` and inside the Android WebView. The app loads a Bible or commentary file only when it is first used.

- `www/data/books.js`: `SGO_BOOKS`, the book list in Orthodox order with USFM ids (`GEN`, `PSA`, `SIR`, `1MA`, `JHN`...). Owned by the app.
- `www/data/catalog.js`: `SGO_CATALOG = { bibles: [{id, name, lang, dir, versification, license, source, testaments}], commentary: [{id, author, work, lang, license, source, books}] }`. Downloadable packs also have `url` (the file on the `orthodox-bible-texts` branch) and `size`. The app lists what is here plus whatever the latest release's `orthodox-bible-content.json` adds (kept in localStorage).
- `www/data/bibles/<id>.js`: `SGO_BIBLES.push({id, name, lang, script, dir, versification, license, source, books: {GEN: [[v1, v2, ...], [chapter 2...]], ...}})`. Chapters and verses are 1-based arrays (index 0 is chapter/verse 1); a missing verse is `null`. Numbered in the translation's own system.
- `www/data/commentary/<id>.js`: `SGO_COMMENTARY.push({id, author, work, translator, lang, license, source, versification, notes: {"JHN.1.1": ["text..."], "MAT.5.3-12": ["text..."]}})`.
- `www/data/lectionary.js`: `SGO_LECTIONARY`, the daily-readings tables (readings, day titles and saints' names for each day of the Paschal cycle, the fixed calendar and the floating feasts). Generated.
- `www/data/paschalion.js`: hand-written calculator, loaded after `lectionary.js`. `SGO_LECTIONARY.day(date, {calendar: "new" | "old"})` returns `{date, menaion, weekday, pdist, tone, titles, feasts, feastLevel, summary, saints, readings: [{service, desc, display, refs}], main}`. Each ref is `[book, chapter, verse, endChapter, endVerse]` in KJV numbering (a composite Old Testament reading has `refs: []`), and `main` holds the indexes of the day's chief Epistle and Gospel. Slavic (OCA) usage on the New (Revised Julian) or Old (Julian) calendar; `SGO_LECTIONARY.pascha(year)` gives the date of Pascha.
- `www/data/versification.js`: `SGO_VERSIFICATION = {lxx: {...}, rso: {...}}`, mapping each scheme's refs to KJV refs, listing only the refs that differ. `null` means the verse has no KJV equivalent (e.g. a psalm title numbered as a verse).

## Web / desktop

Open `www/index.html` in a browser (no build step). The top-level `index.html` redirects there so the Desk launcher lists the app.

## Install the APK

Download [`SquirrelGoOrthodoxBible.apk`](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoOrthodoxBible.apk) from the latest SquirrelGo release ([release page](https://github.com/squirelworks/LanguageStudentDesk/releases/latest)) and sideload it. Pull requests and pushes to `main` only check that it still builds; a test APK can be built by hand with the `SquirrelGo test APK` workflow.
