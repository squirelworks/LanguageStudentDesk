# LanguageStudentDesk

A collection of language learning tools and a desktop environment launcher.

## Fresh install

```bash
cd ~/FU
git clone https://github.com/squirelworks/LanguageStudentDesk
cd LanguageStudentDesk
python3 -m venv .venv
source .venv/bin/activate
pip install -e .  # if/when a package is defined; currently just the launcher
python3 LanguageStudentDesk.py
```

## Update existing install

```bash
cd ~/FU/LanguageStudentDesk
git pull
source .venv/bin/activate
python3 LanguageStudentDesk.py
```

## Main Desk Launcher

Run the desktop GUI to scan for and launch available tools:

```bash
python3 LanguageStudentDesk.py
```

Or with the browser flag (informational):

```bash
python3 LanguageStudentDesk.py --browser
```

The GUI stays open and launches micro-apps in your system browser.

### Language-scoped launch

In the Desk, select a tool and optionally choose a language from the dropdown. This opens the tool with `?lang=<id>` where supported.

Examples:
- `character-learner/index.html?lang=japanese` → only hiragana, katakana, kanji
- `character-learner/index.html?lang=klingon` → only pIqaD
- `programming-learner/index.html?lang=python` → Python panel
- Open without `?lang=` → full multi-language / overview mode

## Tools

- [Klingon (tlhIngan Hol)](klingon/) — Focuses on the pIqaD script with interactive lessons, quizzes, and a Reader section.
- [Resource Learner](resource-learner/) — General resources always visible; specialized lists under each language. Klingon always shown.
- [Reference Learner](reference-learner/) — Quick lookup for language facts and notes.
- [Translation Learner](translation-learner/) — Squirrelator-style translation practice in Desk UI.
- [Programming Learner](programming-learner/) — Scaffold for programming-language learning (syntax, concepts, practice).
- [Character Learner](character-learner/) — Modular TenguGo-style trainer. Supports standalone multi-script mode or language-scoped mode via `?lang=`. Includes on-yomi groups.
- [SquirrelGo Kanji](SquirrelGo-Apps/squirrelgo-kanji/) — TenguGo-style kanji trainer for modern Android (lessons, topic/JLPT quizzes, dictionary, on-yomi groups). Sideload `SquirrelGoKanji-debug.apk`.
- [SquirrelGo Dictionary](SquirrelGo-Apps/squirrelgo-dictionary/) — Offline Japanese–English dictionary (JMdict, KANJIDIC2, radicals, example sentences); replacement for the discontinued JED app. APK built by GitHub Actions.
- [SquirrelGo Phrasebook](SquirrelGo-Apps/squirrelgo-phrasebook/) — Offline Japanese phrasebook with ten packs (Basic, Air Crew, Civil Affairs, Medical, Naval, Public Affairs, Force Protection, Military Police, Cordon & Search, Weapons): audio, search, favorites, flashcards. Web + Android.

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
