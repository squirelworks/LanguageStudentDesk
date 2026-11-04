# Shared content framework

Status: draft spec for the roadmap (#199, item #196). Nothing here changes how
the apps work today. Each change below lands later as its own PR.

## Why

Language content lives in more than one place today. The Desk learners read
`languages/<id>/`, but the SquirrelGo apps keep their own copies in
`www/data/` (Alphabets scripts and strokes, Kana, Bopomofo, Kanji, Klingon,
Phrasebook packs), and some learners hold data of their own (the Translation
Learner's meaning columns, the Programming Learner's courses). A fix made in
one copy doesn't reach the others, and nothing notices when they drift.

The goal is one source for every kind of content, read by every app at build
time, with checks that stop drift and schema errors before a merge.

## Principles

1. **One source.** Every piece of content has exactly one home in the content
   root. Everything else is generated from it.
2. **Modules don't touch each other.** A module is one language, one shared
   character table, or one programming course. Adding or changing a module
   touches only its own folder, plus the generated indexes that a tool rebuilds.
3. **Copied by a tool, never by hand.** Apps get content from one build tool.
   A hand-edited copy in an app fails CI.
4. **Versioned schemas.** Every content file names the schema it follows, and
   the validator checks it against that version.
5. **Works offline and from `file://`.** Content stays as plain scripts that
   assign a global (no modules, no `fetch()` needed), with JSON where a tool
   already fetches it. This keeps the Desk working from a folder and keeps
   every app's `www/` runnable on its own.
6. **Imports are tools.** Content that comes from an outside source is made by
   a script under `tools/` that names the source and its license, so it can be
   regenerated. Hand-written content says so in its header.

## The content root

The root builds on `languages/`, which already holds the Desk's data in this
shape (see `languages/README.md`).

```
languages/
  <language id>/          a language module
    meta.json             manifest: who the language is and which files it has
    characters.js         Character Learner scripts
    strokes/<script>.json stroke paths for each script the language owns   (new)
    vocab.js              vocabulary decks
    grammar.js            grammar course
    reference.json        reference cards
    meaning.js            the language's column of the meaning network     (new)
    phrases.js            phrasebook packs                                 (new)
    REVIEW.md             human review record (#198)                       (new)
  cjk/                    shared module: hanzi, kanji and hanja table
    characters.js
    strokes/<tradition>.json                                                (new)
  programming/            shared module group: programming courses         (new)
    <course id>/
      module.json
      course.js
  schemas/                one JSON Schema per content type and version      (new)
  build_registry.py       rebuilds registry.js and reference.js
```

`cjk/` and `programming/` are not languages, so they have no `meta.json`.
A module that isn't a language carries a `module.json` instead, with the same
`data` map as a `meta.json` (below). Audio stays next to the app that plays it
for now; moving it is out of scope until the text content has moved.

### Manifests

`meta.json` keeps its current fields. Two are added:

```json
{
  "id": "greek",
  "schema": "meta@1",
  "data": {
    "characters": "characters.js",
    "strokes": { "greek": "strokes/greek.json" },
    "vocab": "vocab.js",
    "grammar": "grammar.js",
    "reference": "reference.json",
    "meaning": "meaning.js"
  }
}
```

- `schema` names the manifest's own schema version.
- `data` gains the new kinds. `strokes` maps each script key to its file,
  since one language can own several scripts (Japanese has hiragana and
  katakana) and one script can serve several languages (Cyrillic). Each
  script's strokes have exactly one owner; other languages point at it with a
  relative path inside `languages/`, as `characters` already allows.

## Content types and schemas

Each type has a schema file `languages/schemas/<type>.v<N>.json` (JSON Schema,
draft 2020-12). Every content file names its version: JSON files in a top-level
`"schema": "<type>@<N>"` field, and `.js` files in a first-line comment
`// schema: <type>@<N>` plus the same field on the object they assign.

| Type | File | Global or shape | Notes |
|---|---|---|---|
| `meta` | `meta.json` | manifest | current fields plus `schema` and new `data` kinds |
| `characters` | `characters.js` | `window.SCRIPTS[<key>]` | current format; letter rows carry romanization, sound hint, examples and IPA so Alphabets can be generated from it |
| `cjk` | `cjk/characters.js`, `*/kanji.js`, `*/hanzi.js`, `*/hanja.js` | `window.LSD_CJK`, `window.LSD_CJK_READINGS` | current format; every entry is tagged by tradition (`hanzi`, `kanji`, `hanja`) |
| `strokes` | `strokes/<script>.json` | `{ schema, script, source, license, box: 100, chars: { "<char>": ["M… L…", …] } }` | paths in the 100 × 100 box the stroke player uses; `source` names the generator or dataset; CJK files are per tradition, because order can differ |
| `vocab` | `vocab.js` | `window.LSD_DECKS[<id>]` | each word gains `level` (scheme and value, such as `{ "jlpt": "N5" }`) and `freq` (`core`, `common` or `rare`) |
| `grammar` | `grammar.js` | `window.GRAMMAR[<id>]` | each lesson gains `level`; drills keep the rule that `answer` is one of `options` |
| `reference` | `reference.json` | card set | current format; gains `level` per entry and `sources` (name, URL, license) for attribution |
| `meaning` | `meaning.js` | `window.LSD_MEANING[<id>]` | tokens `[text, romanization, meaning id]`, as the Translation Learner uses today; meaning ids come from one shared list |
| `phrases` | `phrases.js` | `window.LSD_PHRASES[<id>]` | Phrasebook packs for that language |
| `course` | `programming/<id>/course.js` | `window.PROGRAMMING[<id>]` | current format; gains `era` (`modern`, `older`, `joke`) so the learner can build its sections |

Changing a schema in a way that breaks old files means a new version
(`vocab@2`). The validator accepts every version still listed in
`languages/schemas/`, and a version is dropped only after no file uses it.
Adding an optional field doesn't need a new version.

## How apps get content

One tool, `tools/content_sync.py`, replaces the hand copies. It generalizes
`SquirrelGo-Apps/tools/sync-shared.sh`, which does the same job for shared code.

Each consumer declares what it needs in a small `content.json` next to its
`www/` folder (or its `index.html` for a Desk learner):

```json
{
  "schema": "consumer@1",
  "out": "www/data",
  "format": "sg-alphabets",
  "take": [
    { "module": "greek", "kinds": ["characters", "strokes"] },
    { "module": "*", "kinds": ["characters", "strokes"], "where": "alphabetic" }
  ]
}
```

- `take` lists modules and kinds. `"*"` with a `where` filter takes every
  module that matches, so a new language reaches the app with no edit to the
  app.
- `format` names an adapter in `content_sync.py` that writes the files in the
  shape the app's code already reads (`SG_SCRIPTS`, `SG_STROKES`, and so on).
  Adapters let content move first and app code change later, or never.
- Every generated file starts with a header saying it's generated, from which
  modules, and by which command.

Running it:

```
python3 tools/content_sync.py            # write every consumer's copy
python3 tools/content_sync.py --check    # CI: fail if any copy differs from the source
python3 tools/content_sync.py <consumer> # one app only
```

Apps keep a committed copy, as they do for shared code today, so each app's
`www/` still runs on its own in a browser and in the APK. The Gradle build
(`pack-www.gradle`) and the Desk launcher run `content_sync.py --check` before
packing, so a stale copy can't ship. Desk learners that already load from
`languages/` through `lsd-lang.js` need no copy at all and declare no
`content.json`.

## Adding a module

1. Make the folder: `languages/<id>/meta.json` for a language, or
   `languages/programming/<id>/module.json` for a course.
2. Add the content files it has, each naming its schema.
3. Run `python3 languages/build_registry.py` and `python3 tools/content_sync.py`.
4. Commit the module, the rebuilt indexes and any regenerated app copies.

Nothing outside the module's folder is hand-edited. Pickers and menus list
modules alphabetically from the registry, with none pinned.

## Checks in CI

These run on every PR that touches content (#198):

- **Schema:** every content file validates against the version it names.
- **Manifests:** `build_registry.py --check`, which already catches missing or
  unlisted files and stale generated scripts.
- **Data tests:** duplicate ids and characters, missing translations, missing
  level or frequency tags on vocabulary, broken references between modules,
  and drill answers that aren't among their options.
- **Strokes:** the final-frame check (the finished strokes cover the reference
  glyph) and the stroke-count check against a reference source (#188).
- **Drift:** `content_sync.py --check`, so no app carries content that differs
  from the source.
- **Attribution:** every file made by an import tool names its source and
  license, and the module's `reference.json` or README carries the
  attribution.

## Moving to the shared source

One app or learner per PR, in this order, each behind the drift check once it
lands:

1. Add `languages/schemas/`, the validator and `schema` fields on the files
   that already live in `languages/`.
2. Add `tools/content_sync.py` with its `--check`, and no consumers yet.
3. SquirrelGo Kanji: generate its `kanji.js` from the shared CJK table, which
   already holds the same data.
4. SquirrelGo Alphabets: move each script's letter data and strokes into the
   owning language's module, and generate the app's `www/data/`. The Desk's
   Character Learner follows, since it already loads from Alphabets.
5. Kana, Bopomofo and Klingon, the same way.
6. Translation Learner meaning columns into `meaning.js`.
7. Phrasebook packs into `phrases.js`.
8. Programming Learner courses into `languages/programming/`.
9. Turn on the drift check for every consumer in CI and in the Gradle build.

A move PR changes no content. It moves files, regenerates the copy, and shows
that the app's generated copy is identical to the old one (or lists exactly
what changed and why).

## Out of scope here

- Native apps (#197). A native app would read the same content root through
  its own adapter, so this spec doesn't block that decision.
- Audio files, which stay with their apps until the text content has moved.
- Changing any learner's UI.
