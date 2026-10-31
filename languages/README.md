# Languages Data Layer

Shared language data for LanguageStudentDesk tools.

## Structure

Every language's data lives in its own folder. The learner folders hold UI and
logic only, and load the selected language's data from here.

```
languages/
  japanese/
    meta.json        who the language is, and which data files it has
    characters.js    Character Learner scripts
    grammar.js       Grammar Learner course
    vocab.js         Vocabulary Learner decks
    reference.json   Reference Learner cards
  ...
```

A language holds only the files it has content for; `meta.json` is the one file
every language needs.

## Data files

`meta.json` lists the files a language has under `data`, one entry per kind:

```json
"data": {
  "characters": "characters.js",
  "grammar": "grammar.js",
  "vocab": "vocab.js",
  "reference": "reference.json"
}
```

Each value is a file name or a list of file names, relative to the language's
folder. A path may point at a shared file elsewhere in `languages/` (for
example `"characters": ["characters.js", "../cjk/kanji.js"]`), but never
outside it. `build_registry.py` fails when a listed file is missing, when a
kind is unknown, or when a folder holds one of the four files without listing
it, so a tool never silently misses data.

| Kind | File | Format | Defines |
|------|------|--------|---------|
| `characters` | `characters.js` | classic script | `window.SCRIPTS[<key>]` for each of the language's `characterKeys`: `{ name, chars: [{ char, roman, info, ... }] }` |
| `grammar` | `grammar.js` | classic script | `window.GRAMMAR[<id>]`: `{ title, intro, lessons: [...] }` |
| `vocab` | `vocab.js` | classic script | `window.LSD_DECKS[<id>]`: a list of `{ id, title, words: [...] }` decks |
| `reference` | `reference.json` | JSON | the card set described under *reference.json schema* below |

The `.js` files are plain scripts that assign a global, never modules and never
`fetch()`, so they also work when a tool is opened from `file://`. Each one
starts with `window.<GLOBAL> = window.<GLOBAL> || {};` and adds only its own
language (or, for `characters.js`, its own script keys).

### Loading

Tools load data through `lsd-lang.js`, by language id:

```js
const course = await LSD.load("japanese", "grammar");     // window.GRAMMAR.japanese
const decks = await LSD.load("latin", "vocab");           // window.LSD_DECKS.latin
const scripts = await LSD.load("japanese", "characters"); // { hiragana, katakana, ... }
const cards = await LSD.load("klingon", "reference");     // parsed reference.json
```

`LSD.load` returns `null` when the language has no data of that kind.
`LSD.has(meta, kind)` tells a tool whether to offer a language at all, and
`LSD.dataUrls(meta, kind)` gives the full file URLs for a tool that adds its own
`<script>` tags.

## Hanzi, kanji and hanja

Chinese characters are shared by three traditions, so they live once, in
`cjk/characters.js`, keyed by character. `cjk/` is not a language and has no
`meta.json`.

```js
window.LSD_CJK = {
  "日": { "uses": ["hanzi", "kanji", "hanja"], "radical": "日", "strokes": 4 },
  ...
};
```

`uses` lists every tradition the character belongs to: `hanzi` (Chinese),
`kanji` (Japanese), `hanja` (Korean). `radical` and `strokes` are shared.
Readings and meanings belong to each language:

| Tradition | File | Fields besides `roman` (main reading) and `info` (meaning) |
|-----------|------|---------------------------------|
| `kanji` | `japanese/kanji.js` | `on`, `kun`, `level` (JLPT), `grade`, `frequency`; plus on'yomi `groups` |
| `hanzi` | `chinese/hanzi.js` | `pinyin`, `hsk`, `simplified`, `traditional` |
| `hanja` | `hangul/hanja.js` | `hangul` (reading) |

Each file is one assignment of a JSON object, in the order the characters
should be taught:

```js
window.LSD_CJK_READINGS = window.LSD_CJK_READINGS || {};
window.LSD_CJK_READINGS.kanji = { "name": "Kanji", "chars": { "日": { "roman": "ニチ", "info": "day", ... } } };
```

`LSD.cjkScript(tradition)` puts a tradition's readings and the shared table
together into a Character Learner script, and `LSD.load(id, "characters")` does
this for any `characterKeys` entry named `hanzi`, `kanji` or `hanja`.
`LSD.cjk(char)` returns the shared entry with every loaded tradition's reading.
`build_registry.py` fails when a tradition has an entry the table doesn't tag
with it, or the table tags a character a tradition has no entry for.

### Sources

- **Kanji** (`japanese/kanji.js`): the full Jōyō set, shared with SquirrelGo Kanji.
- **Hanzi** (`chinese/hanzi.js`): every character of HSK 3.0 levels 1–6 (1,799;
  `hsk` is the lowest level a word with the character appears at), from the
  word lists in [complete-hsk-vocabulary](https://github.com/drkameleon/complete-hsk-vocabulary)
  (MIT). Pinyin (`kMandarin`), meaning (`kDefinition`) and traditional form
  (`kTraditionalVariant`) come from the [Unihan database](https://www.unicode.org/reports/tr38/)
  (Unicode 17.0, [Unicode license](https://www.unicode.org/license.txt)).
- **Hanja** (`hangul/hanja.js`): the 1,800 basic hanja for education, the
  `kHangul` readings Unihan marks `E`, with Unihan meanings, in hangul order.
- Radicals and stroke counts of characters that are not kanji come from Unihan
  `kRSUnicode` and `kTotalStrokes`; kanji keep the SquirrelGo Kanji values.

`cjk/build_cjk.py` rebuilds the hanzi and hanja files and their tags in the
table from those sources:

```
python3 languages/cjk/build_cjk.py --unihan <folder with Unihan_*.txt> --hsk complete.json
python3 languages/build_registry.py --check
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

Optional fields: `data` (see *Data files* above), `speech` (BCP 47 tag for text to speech, e.g. `ja-JP`),
`font` (`pIqaD` for Klingon), `direction` (`rtl`). The ids `hangul`, `cyrillic`
and `hindi` match the Character Learner's existing `?lang=` values. Latin and
English have an empty `characterKeys`, since they have no Character Learner
script.

Every SquirrelGo Alphabets script has a language here. Most share the script's
id (`greek`, `thai`, `tamil`…); five are named for the language instead, with
the script in `characterKeys`: `amharic` (ethiopic), `inuktitut` (syllabics),
`punjabi` (gurmukhi), `tamazight` (tifinagh) and `manipuri` (meetei). The
Character Learner accepts either id.

## reference.json schema

Cards for the Reference Learner, one file per language:

```json
{
  "id": "japanese",
  "entries": [
    {
      "id": "wa-ga",
      "topic": "grammar",
      "title": "Particles は (wa) and が (ga)",
      "body": ["Paragraph, with {highlighted} words.", "Another paragraph."],
      "examples": [{ "t": "私{は}学生です。", "r": "watashi wa gakusei desu", "e": "I'm a student." }],
      "table": { "head": ["Particle", "Marks"], "rows": [["を", "direct object"]] },
      "tags": ["particles"]
    }
  ]
}
```

`topic` is one of `overview`, `script`, `sounds`, `grammar`, `verbs`, `numbers`,
`phrases`, `culture`. `body` is a string or a list of paragraphs; `{…}` marks a
highlight in `body`, `examples[].t` and table cells. `examples`, `table` and
`tags` are optional; `r` (reading) and `e` (English) are optional per example.
Klingon examples are written in romanization and shown in pIqaD automatically.
`build_registry.py` rejects unknown topics, duplicate ids and table rows with the
wrong number of cells.

## Shared files

- `registry.js` — every `meta.json` in one script, and `reference.js` — every
  `reference.json`, both generated by `python3 languages/build_registry.py`.
  Tools fetch the JSON when served over http:// (the Desk's local server) and
  fall back to these scripts on `file://`, where browsers block `fetch()`. Run
  the script after editing any `meta.json` or `reference.json`, or after adding
  a data file; `--check` exits 1
  if either script is stale.
- `lsd-lang.js` — the loader the learners use: reads `?lang=`, loads meta and
  each language's data files (`LSD.load`), language picker, text to speech,
  Klingon romanization → pIqaD.
- `learners.css` — the shared dark look of those three tools.
- `klingon/piqad.css` — the pIqaD qolqoS font (SIL OFL) as a data URL.

## Usage

- Character-learner and the grammar, vocabulary, language and reference learners can be launched standalone or with `?lang=<id>`.
- When `?lang=` is present the tool scopes itself to that language only.
- Existing self-contained tools continue to work without this folder.
