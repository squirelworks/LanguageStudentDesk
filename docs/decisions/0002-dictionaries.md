# 0002: Native dictionaries and separately released dictionary packs

- Status: **Accepted** by the owner on 2026-11-20 (the choices marked below).
  Nothing is built yet.
- Date: 2026-11-20
- Roadmaps: #371 (Japanese Dictionary), #372 (Multilingual Dictionary), shared
  code #373, builds #374; data squirelworks/squirrel-lang-data#181 (#182–#186).
- Builds on `0001-native-apps.md` (Kotlin and Compose Multiplatform, `native/`).

## What we're building

Two new native apps for Android and desktop, with no WebView:

1. **SquirrelGo Japanese Dictionary** (国語辞典): Japanese only. Search by
   kanji, kana or romaji, look up kanji by radical, and read every entry in
   Japanese. No English anywhere in its screens or entries.
2. **SquirrelGo Multilingual Dictionary**: a dropdown picks the language the
   definitions are written in, and entries are shown in that language.

Both are builds of one shared `ui/dictionary` module and one `core` (0001's
"one codebase, many builds").

## Decisions (owner, 2026-11-20)

- **The Japanese Dictionary is a new, separate app.** The existing SquirrelGo
  Dictionary (`SquirrelGo-Apps/squirrelgo-dictionary`, Japanese-English, JED
  style) stays as it is.
- **Dictionaries come from squirrel-lang-data, as packs that release
  separately**: their own tag series (`dictionaries-vX.Y.Z`), not the data
  tags and not the SquirrelGo app releases. Apps get newer packs without an app
  update. This is a second exception to 0001's "content ships inside each app",
  after the Orthodox Bible's packs, and for the same reason: size.
- **The Japanese Dictionary bundles its dictionary**, so it is complete and
  offline from the first launch. A newer pack can replace the bundled one.
- **The Multilingual Dictionary downloads** the languages the reader picks,
  and ships only a small starter pack.

## Data

Sources, all CC BY-SA 4.0 compatible (details and checks in the data issues):

| Source | Used for | Licence |
|---|---|---|
| JMdict (EDRDG) | Japanese headwords, readings, priority, parts of speech; non-English glosses for multilingual packs | CC BY-SA 4.0 |
| KANJIDIC2 (EDRDG) | kanji pages | CC BY-SA 4.0 |
| RADKFILE / KRADFILE (EDRDG) | radical search | EDRDG licence; confirm it is the CC BY-SA 4.0 wording |
| Japanese Wiktionary | Japanese definitions | CC BY-SA 4.0 / GFDL |
| Wiktionary editions (en, de, fr, es, ru, zh, ko, ...) | multilingual definitions | CC BY-SA 4.0 / GFDL |
| KanjiVG (already in `strokes/`) | stroke order | CC BY-SA 3.0 |

Not used: commercial 国語辞典s (proprietary), FreeDict (GPL). Japanese WordNet
has its own licence and is held until the owner agrees.

The Japanese Wiktionary won't define every JMdict word. Entries without a
Japanese definition say so in Japanese and show forms, readings and kanji; they
never fall back to English.

## Is squirrel-lang-data the right source?

Yes, with two rules it already has: raw downloads are fetched by `tools/` and
ignored, and generated files are build output. Today the repo is 21 MB
(4.4 MB of history); JMdict alone is ~215,000 entries and a Wiktionary edition
is hundreds of MB to several GB raw. So only importers, a pinned sources
manifest (URL, version, SHA-256, licence) and small test samples are committed.
`tools/export.py`'s sqlite format stays for curated content; dictionaries get
their own format, `dictpack@1`.

## Pack format and lookup

One SQLite file per pack (`dictpack@1`), gzipped for download:

- `forms` (B-tree) for exact, prefix and wildcard lookup; romaji is turned into
  kana in the app, so it needs no index;
- FTS5 over definitions (`trigram` for Japanese and Chinese, `unicode61`
  otherwise) for search by meaning;
- `kanji`, `radicals`, `kanji_radicals` for radical search by intersection;
- deinflection rules for conjugated Japanese.

The apps open packs with androidx.sqlite's bundled SQLite, since FTS5 isn't in
every Android device's own SQLite. SQLite can't open a compressed file, so a
pack takes about three times its download size once installed.

## The pack release track (squirrel-lang-data)

- Tags `dictionaries-vMAJOR.MINOR.PATCH`. MAJOR: a pack format change apps must
  be updated for. MINOR: new packs or sources. PATCH: source refreshes, fixes.
- A hand-started workflow fetches the pinned sources, builds and checks the
  packs, and makes a **draft** release with `dictionaries.json` (the manifest:
  per pack id, definition language, tier, format, version, sizes, SHA-256,
  sources), the packs and `SHA256SUMS.txt`. The owner publishes. Never marked
  latest, never moved, never deleted.
- Apps check only when the reader taps: list releases through the GitHub API,
  take the newest published `dictionaries-v*` with a MAJOR they support, read
  the manifest, download, check SHA-256, verify, and swap atomically (the Bible
  app's flow in `squirrelgo-orthodox-bible/www/js/app.js`, made native).
- An app's bundled pack is pinned in `native/dictionary-packs.lock.json` and
  fetched at build time. Moving that pin is its own PR, like a `data/` bump.

## Sizes (estimates, measured in data #185 and #374)

| | Download / APK | Installed |
|---|---:|---:|
| Japanese pack | 30–45 MB | 90–130 MB |
| Japanese Dictionary APK (with its pack) | 40–60 MB | 100–150 MB |
| Multilingual Dictionary APK (starter pack) | ~15 MB | ~30 MB |
| One multilingual "core" pack (~50,000 headwords) | 5–20 MB | 15–60 MB |
| One multilingual "full" pack | 20–150 MB | 3–4× that |
| Desktop builds | + a Java runtime, ~60–90 MB | |

For comparison, the existing Japanese-English Dictionary's APK is 19.7 MB with
~45 MB of generated data (JS shards, not SQLite).

## Order

1. Data: #182 (EDRDG import), #185 (pack generator, on JMdict alone), #183
   (Japanese definitions), #186 (first `dictionaries-v*` draft).
2. App: #373 (core, reader, pack manager), then #371's screens (search,
   radicals, entry and kanji pages), #374 (builds and CI).
3. Data #184 (multilingual packs), then #372's screens.
