# LanguageStudentDesk

A collection of language learning tools and a desktop environment launcher.

## Fresh install

```bash
cd ~/FU
git clone --recursive https://github.com/squirelworks/LanguageStudentDesk
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

### Settings

The menu starts simple: standard modern languages and the core learners. **Settings** has three levels (Simple, More, Everything) and a Customize list of single switches, such as regional varieties, historical stages and alpha features. A "What's in the app" section lists everything that's turned off and the switch that turns it on. The first run shows a welcome card with a few languages to try. The Desk window, its browser tabs and the Android suite use the same switches, and the Desk remembers them between sessions.

The switches are defined once in the shared language data ([squirrel-lang-data](https://github.com/squirelworks/squirrel-lang-data), checked out at `data/`): clone with `git clone --recursive`, or run `git submodule update --init` in an existing clone. `languages/features.js` is generated from it with `python3 data/tools/gen_features.py languages/features.js`.

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
- [Resource Learner](resource-learner/) — General study resources plus specialized lists for Japanese, Klingon, Arabic, Korean, Chinese, Hindi, Russian, Latin and English (other languages fall back to general).
- [Reference Learner](reference-learner/) — Quick lookup for language facts and notes.
- [Translation Learner](translation-learner/) — Sentence translation checked by meaning, not spelling: into English, into the language, sentence breakdowns, a meaning matrix, and top-1,000 word practice for Japanese, Korean, Chinese, Russian, Hindi, Arabic and Klingon.
- [Programming Learner](programming-learner/) — Programming language courses with syntax, concepts and practice; the full list is in the learner's menu and its [README](programming-learner/README.md).
- [Programming Student Desk](SquirrelGo-Apps/programming-student-desk/) — The Programming Learner as its own offline Android app: a home menu lists every course and opens one inside the app. Build the release AAB locally; it is not a GitHub release.
- [Legalese Learner](legalese-learner/) — How contract language works: *shall* and *may*, *herein*, *notwithstanding*, consideration, and the boilerplate at the back. Reading practice, not legal advice.
- [Language Learner](language-learner/) — A guided path per language: script, first words, grammar, then practice, with progress ticks.
- [Grammar Learner](grammar-learner/) — Short grammar lessons with explained drills, per language (most Desk languages; Cherokee, Inuktitut and Manipuri have none yet; English is reference-only).
- [Vocabulary Learner](vocabulary-learner/) — Flashcards, spaced review and Anki export, with decks from `languages/` and the SquirrelGo apps.
- [Language Student Desk (Android)](SquirrelGo-Apps/lsd-suite/) — The Desk learners in one offline Android app: a home menu opens each one in a WebView. Build the debug APK locally; it is not a published release.
- [Character Learner](character-learner/) — Multi-script trainer: kana, the full Jōyō kanji (2,136), HSK 1–6 hanzi (1,799), education hanja (1,800), pIqaD and every SquirrelGo Alphabets script (29), each with stroke-order animation and a writing pad that checks each stroke. Kanji Lessons and Topics come from SquirrelGo Kanji, pIqaD strokes from SquirrelGo Klingon, and the Alphabets scripts, strokes and sounds from SquirrelGo Alphabets. Language-scoped via `?lang=`. Includes on-yomi groups.
- [SquirrelGo Kana](SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/) — Hiragana and katakana trainer: lessons by sound row, charts, quizzes, flashcards, writing pad, audio. Web + Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoKana.apk)).
- [SquirrelGo Bopomofo](SquirrelGo-Apps/squirrelgo-characters/squirrelgo-bopomofo/) — Taiwan Zhuyin (注音): initials, medials, finals, tone marks, chart, quizzes and flashcards. Web + Android (release AAB built locally; not on the rolling APK pre-releases).
- [SquirrelGo Alphabets](SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/) — Latin, Greek, Cyrillic, Armenian, Georgian, Hebrew, Arabic, Devanagari, Bengali, Gurmukhi, Gujarati, Odia, Meetei Mayek, Tamil, Telugu, Kannada, Malayalam, Sinhala, Burmese, Thai, Lao, Khmer, Tibetan, Hangul, Ethiopic, Tifinagh, Cherokee, Inuktitut syllabics and Mongolian in one trainer: animated stroke order, a writing pad that checks each stroke, IPA and recorded sounds for every letter, a Hangul syllable builder and an Arabic letter-forms table. Web + Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoAlphabets.apk)).
- [SquirrelGo Klingon](SquirrelGo-Apps/squirrelgo-characters/squirrelgo-klingon/) — Learn to read and write pIqaD, the Klingon alphabet: animated stroke order for every letter and numeral, a writing pad that checks each stroke, IPA and recorded sounds for every letter and word, quizzes including whole-word reading, flashcards, a romanization-to-pIqaD converter and a pronunciation guide. Web + Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoKlingon.apk)).
- [SquirrelGo Kanji](SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/) — TenguGo-style kanji trainer for modern Android (lessons, topic/JLPT quizzes, dictionary, on-yomi groups, stroke-order animation from KanjiVG). Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoKanji.apk)).
- [SquirrelGo Japanese-English Dictionary](SquirrelGo-Apps/squirrelgo-dictionary/) — Offline Japanese–English dictionary (JMdict, KANJIDIC2, radicals, example sentences); replacement for the discontinued JED app. Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoJapaneseDictionary.apk)).
- [SquirrelGo Phrasebook](SquirrelGo-Apps/squirrelgo-phrasebook/) — Offline Japanese phrasebook with 25 packs and 1,055 phrases (all with audio): DLI survival topics, service-member packs, and everyday packs for travel, work and living in Japan; search, favorites, flashcards. Web + Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoPhrasebook.apk)).
- [SquirrelGo Orthodox Bible](SquirrelGo-Apps/squirrelgo-orthodox-bible/) — Offline Orthodox study Bible: Septuagint canon and book order, 73 text packs and 33 commentary packs, any verse side by side in other languages (English, Greek, Russian, Church Slavonic and more), patristic commentary per verse, lectionary, bookmarks, highlights and notes. Public-domain texts only. Web + Android ([download APK](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoOrthodoxBible.apk)).

The character trainers (Kana, Alphabets, Kanji, Klingon) live under `SquirrelGo-Apps/squirrelgo-characters/`.

### Desk and SquirrelGo in step

The Desk tools and the SquirrelGo apps share one copy of their data and code. Code every app ships (the suite sheet, the stroke player, the writing pad) lives in [`SquirrelGo-Apps/shared/`](SquirrelGo-Apps/shared/). After changing it, or after adding a script to SquirrelGo Alphabets, run:

```bash
SquirrelGo-Apps/tools/sync-shared.sh          # copy shared files into the apps, update Character Learner's script list
SquirrelGo-Apps/tools/sync-shared.sh --check  # what CI runs
```

The check also fails when an app in `shared/suite.js` is missing from the Desk launcher, sits in the wrong group, or doesn't point its APK at the latest release.

## Android apps (APK downloads)

Every SquirrelGo app's APK is attached to each platform release on the [Releases page](https://github.com/squirelworks/LanguageStudentDesk/releases); the links below always fetch the latest one. Open a download link on your phone, allow "Install unknown apps" for your browser, and install. Android 7.0 or newer.

| App | Download | Release |
|---|---|---|
| SquirrelGo Kana | [SquirrelGoKana.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoKana.apk) | [latest release](https://github.com/squirelworks/LanguageStudentDesk/releases/latest) |
| SquirrelGo Alphabets | [SquirrelGoAlphabets.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoAlphabets.apk) | [latest release](https://github.com/squirelworks/LanguageStudentDesk/releases/latest) |
| SquirrelGo Klingon | [SquirrelGoKlingon.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoKlingon.apk) | [latest release](https://github.com/squirelworks/LanguageStudentDesk/releases/latest) |
| SquirrelGo Kanji | [SquirrelGoKanji.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoKanji.apk) | [latest release](https://github.com/squirelworks/LanguageStudentDesk/releases/latest) |
| SquirrelGo Japanese-English Dictionary | [SquirrelGoJapaneseDictionary.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoJapaneseDictionary.apk) | [latest release](https://github.com/squirelworks/LanguageStudentDesk/releases/latest) |
| SquirrelGo Phrasebook | [SquirrelGoPhrasebook.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoPhrasebook.apk) | [latest release](https://github.com/squirelworks/LanguageStudentDesk/releases/latest) |
| SquirrelGo Orthodox Bible | [SquirrelGoOrthodoxBible.apk](https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoOrthodoxBible.apk) | [latest release](https://github.com/squirelworks/LanguageStudentDesk/releases/latest) |

## Core language engine

Shared translation and language logic lives in [squirrelator](https://github.com/squirelworks/squirrelator).

LSDesk consumes it for learning tools; squirrelator owns the actual language transformations (human ↔ code, code ↔ code, pseudocode, etc.).

```python
from squirrelator import translate
result = translate("print hello", from_lang="english", to_lang="python")
```

## Shared language data

See [languages/](languages/) for the Desk data layer: 36 languages with `meta.json`, loaded by the learners through `lsd-lang.js`. The language menu is sorted by English name. Most ship grammar (6 lessons / ~30 drills; Japanese 17/71, Klingon 10/26), vocab decks and reference cards; Cherokee, Inuktitut and Manipuri still lack grammar packs, and English is the base language (reference only). Shared CJK characters live in `languages/cjk/`. Run `python3 languages/build_registry.py` after changing anything under `languages/`.

## Expanding LSD

See [LSD-EXPANSION.md](LSD-EXPANSION.md) for the recursive expansion laundry list (doctrine, priority waves, seams, don’ts) for agents growing Desk + SquirrelGo, and [LSD-EXPANSION-NEXT.md](LSD-EXPANSION-NEXT.md) for the next round.
