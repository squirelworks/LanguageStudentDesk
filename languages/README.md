# Languages Data Layer

Shared language data for LanguageStudentDesk tools.

## Structure

Each language has its own folder:

```
languages/
  japanese/
    meta.json
    characters.json   (optional, for future)
  klingon/
    meta.json
  arabic/
    meta.json
  ...
```

## meta.json schema (initial)

```json
{
  "id": "japanese",
  "name": "Japanese",
  "nativeName": "日本語",
  "writingSystems": ["hiragana", "katakana", "kanji"],
  "characterKeys": ["hiragana", "katakana", "kanji"]
}
```

## Usage

- Character-learner (and future grammar/vocab/language learners) can be launched standalone or with `?lang=<id>`.
- When `?lang=` is present the tool scopes itself to that language only.
- Existing self-contained tools continue to work without this folder.
