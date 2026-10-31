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

## Desktop builds (no Python needed)

Each tagged release on the [Releases page](https://github.com/squirelworks/LanguageStudentDesk/releases) carries a standalone Desk for Linux (`LanguageStudentDesk-linux.tar.gz`), Windows (`LanguageStudentDesk-windows.zip`) and macOS on Apple silicon (`LanguageStudentDesk-macos.zip`). Python, Tk and every web app are inside. Unpack it and run `LanguageStudentDesk` (`LanguageStudentDesk.exe` on Windows); the `--browser`, `--list` and `--file` options below work the same. The builds are unsigned: on Windows choose "More info" → "Run anyway"; on macOS run `xattr -dr com.apple.quarantine LanguageStudentDesk` on the unpacked folder first. The `Desk desktop builds` workflow makes them when a release is published, or by hand for an existing tag.

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

- [Klingon (tlhIngan Hol)](klingon/) — Focuses on the pIqaD script with interactive lessons, quizzes, and a Reader section. Stroke order and the checked writing pad are shared with SquirrelGo Klingon.
- [Resource Learner](resource-learner/) — General study resources plus specialized lists for each language, including Klingon.
- [Reference Learner](reference-learner/) — Quick lookup for language facts and notes.
- [Translation Learner](translation-learner/) — Sentence translation checked by meaning, not spelling: into English, into the language, sentence breakdowns, a meaning matrix across the Desk languages, and top-1,000 word practice.
- [Programming Learner](programming-learner/) — Syntax, concepts and practice for programming languages, from Python to the esolangs.
- [Language Learner](language-learner/) — A guided path per language: script, first words, grammar, then practice, with progress ticks.
- [Grammar Learner](grammar-learner/) — Short grammar lessons with explained drills, per language.
- [Vocabulary Learner](vocabulary-learner/) — Flashcards, spaced review and Anki export, with decks drawn from the SquirrelGo apps.
- [Character Learner](character-learner/) — Multi-script trainer: kana, the full Jōyō kanji (2,136), pIqaD and every SquirrelGo Alphabets script, each with stroke-order animation and a writing pad that checks each stroke. Kanji Lessons and Topics come from SquirrelGo Kanji, pIqaD strokes from SquirrelGo Klingon, and the Alphabets scripts, strokes and sounds from SquirrelGo Alphabets. Language-scoped via `?lang=`. Includes on-yomi groups.
- [SquirrelGo Kana](SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/) — Hiragana and katakana trainer: lessons by sound row, charts, quizzes, flashcards, writing pad, audio. Web + Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-kana-latest/SquirrelGoKana-debug.apk)).
- [SquirrelGo Alphabets](SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/) — Latin, Greek, Cyrillic, Armenian, Georgian, Hebrew, Arabic, Devanagari, Bengali, Gurmukhi, Gujarati, Odia, Meetei Mayek, Tamil, Telugu, Kannada, Malayalam, Sinhala, Burmese, Thai, Lao, Khmer, Tibetan, Hangul, Ethiopic, Tifinagh, Cherokee, Inuktitut syllabics and Mongolian in one trainer: animated stroke order, a writing pad that checks each stroke, IPA and recorded sounds for every letter, a Hangul syllable builder and an Arabic letter-forms table. Web + Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-alphabets-latest/SquirrelGoAlphabets-debug.apk)).
- [SquirrelGo Klingon](SquirrelGo-Apps/squirrelgo-characters/squirrelgo-klingon/) — Learn to read and write pIqaD, the Klingon alphabet: animated stroke order for every letter and numeral, a writing pad that checks each stroke, IPA and recorded sounds for every letter and word, quizzes including whole-word reading, flashcards, a romanization-to-pIqaD converter and a pronunciation guide. Web + Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-klingon-latest/SquirrelGoKlingon-debug.apk)).
- [SquirrelGo Kanji](SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/) — TenguGo-style kanji trainer for modern Android (lessons, topic/JLPT quizzes, dictionary, on-yomi groups, stroke-order animation from KanjiVG). Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-kanji-latest/SquirrelGoKanji-debug.apk)).
- [SquirrelGo Japanese-English Dictionary](SquirrelGo-Apps/squirrelgo-dictionary/) — Offline Japanese–English dictionary (JMdict, KANJIDIC2, radicals, example sentences); replacement for the discontinued JED app. Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-dictionary-latest/SquirrelGoDictionary.apk)).
- [SquirrelGo Phrasebook](SquirrelGo-Apps/squirrelgo-phrasebook/) — Offline Japanese phrasebook with ten packs (Basic, Air Crew, Civil Affairs, Medical, Naval, Public Affairs, Force Protection, Military Police, Cordon & Search, Weapons): audio, search, favorites, flashcards. Web + Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-phrasebook-latest/SquirrelGoPhrasebook-debug.apk)).
- [SquirrelGo Orthodox Bible](SquirrelGo-Apps/squirrelgo-orthodox-bible/) — Offline Orthodox study Bible: Septuagint canon and book order, any verse side by side in other languages (English, Greek, Russian, Church Slavonic and more), patristic commentary per verse, bookmarks, highlights and notes. Public-domain texts only. Web + Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-orthodox-bible-latest/SquirrelGoOrthodoxBible-debug.apk)).

The character trainers (Kana, Alphabets, Kanji, Klingon) live under `SquirrelGo-Apps/squirrelgo-characters/`.

### Desk and SquirrelGo in step

The Desk tools and the SquirrelGo apps share one copy of their data and code. Code every app ships (the suite sheet, the stroke player, the writing pad) lives in [`SquirrelGo-Apps/shared/`](SquirrelGo-Apps/shared/). After changing it, or after adding a script to SquirrelGo Alphabets, run:

```bash
SquirrelGo-Apps/tools/sync-shared.sh          # copy shared files into the apps, update Character Learner's script list
SquirrelGo-Apps/tools/sync-shared.sh --check  # what CI runs
```

The check also fails when an app in `shared/suite.js` is missing from the Desk launcher, sits in the wrong group, or points at an APK no workflow publishes.

## Android apps (APK downloads)

Every SquirrelGo app is built by GitHub Actions on each push to `main` and published as its own rolling pre-release on the [Releases page](https://github.com/squirelworks/LanguageStudentDesk/releases). Open a download link on your phone, allow "Install unknown apps" for your browser, and install. Android 7.0 or newer.

| App | Download | Release |
|---|---|---|
| SquirrelGo Kana | [SquirrelGoKana-debug.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-kana-latest/SquirrelGoKana-debug.apk) | [squirrelgo-kana-latest](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-kana-latest) |
| SquirrelGo Alphabets | [SquirrelGoAlphabets-debug.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-alphabets-latest/SquirrelGoAlphabets-debug.apk) | [squirrelgo-alphabets-latest](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-alphabets-latest) |
| SquirrelGo Klingon | [SquirrelGoKlingon-debug.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-klingon-latest/SquirrelGoKlingon-debug.apk) | [squirrelgo-klingon-latest](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-klingon-latest) |
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

## Expanding LSD

See [LSD-EXPANSION.md](LSD-EXPANSION.md) for the recursive expansion laundry list (doctrine, priority waves, seams, don’ts) for agents growing Desk + SquirrelGo, and [LSD-EXPANSION-NEXT.md](LSD-EXPANSION-NEXT.md) for the next round.
