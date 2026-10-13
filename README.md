# LanguageStudentDesk

A collection of language learning tools and a desktop environment launcher.

## Main Desk Launcher

Run the desktop GUI to scan for and launch available tools:

```bash
python LanguageStudentDesk.py
```

Or with the browser flag (informational):

```bash
python LanguageStudentDesk.py --browser
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
- [Programming Learner](programming-learner/) — Scaffold for programming-language learning (syntax, concepts, practice).
- [Character Learner](character-learner/) — Modular TenguGo-style trainer. Supports standalone multi-script mode or language-scoped mode via `?lang=`.

## Shared language data

See [languages/](languages/) for the emerging data layer (`meta.json` per language). Future grammar, vocabulary, and full language learners will read from here.

More languages and tools coming soon.
