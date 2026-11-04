# strokecheck

Checks that stroke-order animations finish as the real character (roadmap #188).

```bash
python3 strokecheck.py                     # every set; exit 1 on a new failure
python3 strokecheck.py zhuyin              # one set
python3 strokecheck.py zhuyin --sheet out/ # out/zhuyin.png: glyph in grey, strokes in red
```

Needs Python 3 with `numpy pillow fonttools`, plus node and npm. The reference
fonts (Noto, SIL Open Font License) are fetched from `@fontsource` into `fonts/`
on first use and are not committed. CI runs it on every PR that touches stroke
data, in `.github/workflows/stroke-check.yml`.

## What it checks

- **Final frame.** The finished strokes and the character from a reference font
  are fitted into the same box. *Coverage* is how much of the glyph the strokes
  cover, so a missing part (a box drawn without its right side) lowers it.
  *Precision* is how much of the strokes lie on the glyph, so an extra or
  misplaced stroke lowers it. Both must reach the pass marks in `strokecheck.py`,
  which a set can lower in `sets.json` when its source is handwriting rather than
  type (KanjiVG's kana and kanji).
- **Malformed paths.** A path the SVG grammar can't read is reported, since a
  browser stops drawing it at the error.
- **Stroke count.** Where a set names a reference count source in `sets.json`
  (`cjk` for the shared table in `languages/cjk/characters.js`, or a file in
  `counts/` with its source and license), the number of strokes must match.

Pairings such as きゃ are checked through their single characters.

## The baseline

`baseline.json` lists the characters that failed when the check was added, with
the reason, so CI can run before every script has been audited. CI fails when a
character outside the baseline fails, and when a baselined character passes, so
the list only shrinks. An audit PR for a script fixes its characters and takes
them out of the baseline (`--write-baseline` rewrites it from a full run).

## Adding a stroke set

Add an entry to `sets.json`: the stroke files (relative to `SquirrelGo-Apps/`),
the key or global they assign, the `@fontsource` font packages that cover the
script and, if one exists, a reference count source. A script written top to
bottom whose font lays its glyphs on their side (Mongolian) sets `"vertical": true`,
so the reference glyph is stood upright as strokegen does.
