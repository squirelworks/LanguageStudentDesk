# LanguageStudentDesk

A collection of language learning tools and a desktop environment launcher.

## Fresh install

```bash
cd ~/FU
git clone https://github.com/squirelworks/LanguageStudentDesk
cd LanguageStudentDesk
python3 LanguageStudentDesk.py   # standard library only, nothing to install
```

## Update existing install

```bash
cd ~/FU/LanguageStudentDesk
git pull
python3 LanguageStudentDesk.py
```

## Main Desk Launcher

Run the desktop GUI to browse and launch every tool and SquirrelGo app:

```bash
python3 LanguageStudentDesk.py
```

The Desk groups the tools (Desk tools, SquirrelGo apps), shows what each one does, has a search box (Ctrl+F), and opens tools in your browser from a small local web server on `127.0.0.1`, so `?lang=` links, fonts and data files work the same on every system. SquirrelGo apps also get an **Android APK** button that opens the latest download. The server stops when you close the Desk.

Other modes:

```bash
python3 LanguageStudentDesk.py --browser  # no GUI: open a Desk home page in the browser
python3 LanguageStudentDesk.py --list     # print the tools found and exit
python3 LanguageStudentDesk.py --file     # GUI, but open tools as file:// pages
```

If `tkinter` is missing (some Linux installs: `sudo apt install python3-tk`), the Desk falls back to `--browser` mode.

### Language-scoped launch

Select a tool that supports it and choose a language from the dropdown. This opens the tool with `?lang=<id>`. The list comes from `languages/*/meta.json` plus a few extra ids.

Examples:
- `character-learner/index.html?lang=japanese` → only hiragana, katakana, kanji
- `character-learner/index.html?lang=klingon` → only pIqaD
- `programming-learner/index.html?lang=python` → Python panel
- `resource-learner/index.html?lang=arabic` → Arabic resources
- Open without `?lang=` → full multi-language / overview mode

## Tools

- [Klingon (tlhIngan Hol)](klingon/) — Focuses on the pIqaD script with interactive lessons, quizzes, and a Reader section.
- [Resource Learner](resource-learner/) — General resources always visible; specialized lists under each language. Klingon always shown.
- [Reference Learner](reference-learner/) — Quick lookup for language facts and notes.
- [Translation Learner](translation-learner/) — Squirrelator-style translation practice in Desk UI.
- [Programming Learner](programming-learner/) — Scaffold for programming-language learning (syntax, concepts, practice).
- [Character Learner](character-learner/) — Modular TenguGo-style trainer. Supports standalone multi-script mode or language-scoped mode via `?lang=`. Includes on-yomi groups.
- [SquirrelGo Kana](SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/) — Hiragana and katakana trainer: lessons by sound row, charts, quizzes, flashcards, writing pad, audio. Web + Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-kana-latest/SquirrelGoKana-debug.apk)).
- [SquirrelGo Alphabets](SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/) — Hangul, Cyrillic, Devanagari and Arabic in one trainer, with a Hangul syllable builder and an Arabic letter-forms table. Web + Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-alphabets-latest/SquirrelGoAlphabets-debug.apk)).
- [SquirrelGo Kanji](SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/) — TenguGo-style kanji trainer for modern Android (lessons, topic/JLPT quizzes, dictionary, on-yomi groups, stroke-order animation from KanjiVG). Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-kanji-latest/SquirrelGoKanji-debug.apk)).
- [SquirrelGo Japanese-English Dictionary](SquirrelGo-Apps/squirrelgo-dictionary/) — Offline Japanese–English dictionary (JMdict, KANJIDIC2, radicals, example sentences); replacement for the discontinued JED app. Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-dictionary-latest/SquirrelGoDictionary.apk)).
- [SquirrelGo Phrasebook](SquirrelGo-Apps/squirrelgo-phrasebook/) — Offline Japanese phrasebook with ten packs (Basic, Air Crew, Civil Affairs, Medical, Naval, Public Affairs, Force Protection, Military Police, Cordon & Search, Weapons): audio, search, favorites, flashcards. Web + Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-phrasebook-latest/SquirrelGoPhrasebook-debug.apk)).
- [SquirrelGo Orthodox Bible](SquirrelGo-Apps/squirrelgo-orthodox-bible/) — Offline Orthodox study Bible: Septuagint canon and book order, any verse side by side in other languages (English, Greek, Russian, Church Slavonic and more), patristic commentary per verse, bookmarks, highlights and notes. Public-domain texts only. Web + Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-orthodox-bible-latest/SquirrelGoOrthodoxBible-debug.apk)).

The TenguGo-style character trainers (Kana, Alphabets, Kanji) live under `SquirrelGo-Apps/squirrelgo-characters/`.

## Android apps (APK downloads)

Every SquirrelGo app is built by GitHub Actions on each push to `main` and published as its own rolling pre-release on the [Releases page](https://github.com/squirelworks/LanguageStudentDesk/releases). Open a download link on your phone, allow "Install unknown apps" for your browser, and install. Android 7.0 or newer.

| App | Download | Release |
|---|---|---|
| SquirrelGo Kana | [SquirrelGoKana-debug.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-kana-latest/SquirrelGoKana-debug.apk) | [squirrelgo-kana-latest](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-kana-latest) |
| SquirrelGo Alphabets | [SquirrelGoAlphabets-debug.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-alphabets-latest/SquirrelGoAlphabets-debug.apk) | [squirrelgo-alphabets-latest](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-alphabets-latest) |
| SquirrelGo Kanji | [SquirrelGoKanji-debug.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-kanji-latest/SquirrelGoKanji-debug.apk) | [squirrelgo-kanji-latest](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-kanji-latest) |
| SquirrelGo Japanese-English Dictionary | [SquirrelGoDictionary.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-dictionary-latest/SquirrelGoDictionary.apk) | [squirrelgo-dictionary-latest](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-dictionary-latest) |
| SquirrelGo Phrasebook | [SquirrelGoPhrasebook-debug.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-phrasebook-latest/SquirrelGoPhrasebook-debug.apk) | [squirrelgo-phrasebook-latest](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-phrasebook-latest) |
| SquirrelGo Orthodox Bible | [SquirrelGoOrthodoxBible-debug.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-orthodox-bible-latest/SquirrelGoOrthodoxBible-debug.apk) | [squirrelgo-orthodox-bible-latest](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-orthodox-bible-latest) |

## Core language engine

Shared translation and language logic lives in [squirrelator](https://github.com/squirelworks/squirrelator).

LSDesk consumes it for learning tools; squirrelator owns the actual language transformations (human ↔ code, code ↔ code, pseudocode, etc.).

```python
from squirrelator import translate
result = translate("print hello", from_lang="english", to_lang="python")
```

## Shared language data

See [languages/](languages/) for the emerging data layer (`meta.json` per language). Future grammar, vocabulary, and full language learners will read from here.

More languages and tools coming soon.
