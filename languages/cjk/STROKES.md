# CJK stroke-order investigation (P2.3)

Decision recorded 2026-10-31. **No stroke corpus added in this change.**

## What Character Learner does today

Hanzi and hanja detail cards share the kanji stroke path:

1. `character-learner/index.html` loads SquirrelGo Kanji’s KanjiVG table
   (`squirrelgo-kanji/www/data/strokes.js` → `window.KANJI_STROKES`) and player
   (`www/js/strokes.js` → `StrokeOrder`).
2. For any CJK script (`kanji` / `hanzi` / `hanja`), detail uses
   `StrokeOrder.has(c.char)` — an **exact codepoint** lookup in the Jōyō set.
3. `strokeKeys()` deliberately returns nothing for CJK, so the Alphabets-style
   **checked writing pad never mounts** for hanzi/hanja/kanji. Kanji (and
   shared-glyph hanzi/hanja) get the KanjiVG animation / step chart only.

There is **no** separate hanzi or hanja stroke file under `languages/cjk/` or
SquirrelGo. Shared CJK metadata (`characters.js`) stores only a **stroke
count**, not path data.

### Coverage when opening hanzi / hanja (measured on `main`)

Against the committed KanjiVG table (2,136 Jōyō entries):

| Set | Characters | Exact KanjiVG hit | Missing |
|-----|------------|-------------------|---------|
| Hanzi (HSK 1–6) | 1,799 | 953 (53.0%) | 846 |
| · HSK 1 | 300 | 186 (62.0%) | 114 |
| · HSK 2–6 | 1,499 | 767 | 732 |
| Hanja (education) | 1,800 | 1,379 (76.6%) | 421 |

Hits are almost exactly the glyphs also tagged `kanji` in `LSD_CJK`. Misses are
mostly Simplified-only forms (HSK) or Traditional/education forms outside
Jōyō (hanja). Missing HSK 1 examples: 你、这、说、们、个、还、给、过、现、时…

For a miss, the detail panel shows: “No stroke-order data for this character.”

## License options

| Source | What it covers | License | Fit for LSD |
|--------|----------------|---------|-------------|
| **KanjiVG** (already in repo) | Japanese kanji/kana stroke paths | CC BY-SA 3.0 | Keep as the Japanese source of truth. Reusing it for identical codepoints is fine; it does **not** fill Simplified HSK gaps, and Japanese forms can differ from PRC/Taiwan order even when Unicode matches. |
| **Make Me a Hanzi** (`graphics.txt`) | ~9k Simplified + Traditional stroke SVGs + medians | **Arphic Public License** (APL) on graphics; dictionary side is LGPL — use **graphics only** | Openly redistributable with APL notice + unaltered `ARPHICPL.TXT`. Compatible as a **separate** data file (APL “mere aggregation”). Do **not** merge into the KanjiVG `strokes.js` blob. |
| **AnimCJK** (`svgsZhHans` / `svgsZhHant` / hanja sets) | Large Simplified HSK-oriented sets; traditional variants; some hanja | Same split: character SVGs under **APL**, other files LGPL | Same practical constraints as Make Me a Hanzi; useful if we want pre-split language folders. |

Neither MMAH nor AnimCJK is “LGPL-only” for the stroke drawings — the drawings
are Arphic-derived. That is still open data and acceptable under the Desk’s
“open data only” rule **if** we keep APL attribution, ship `ARPHICPL.TXT`, and
keep the file separate from CC BY-SA KanjiVG data.

## Decision

1. **Document only in this PR.** Do not import a stroke corpus yet.
2. **Recommended next implementation** (separate small PR):
   - Import **Make Me a Hanzi `graphics.txt`** (APL) for **HSK 1** first
     (~114 missing glyphs; optionally refresh all 300 so medians match PRC
     order instead of relying on Japanese KanjiVG for the shared 186).
   - Store as e.g. `languages/cjk/hanzi-strokes.js` (or under SquirrelGo if a
     twin app appears later), keyed by character, with a header citing MMAH +
     APL and a committed `ARPHICPL.TXT` beside it.
   - Wire Character Learner: for `hanzi`, prefer hanzi-strokes; fall back to
     `KANJI_STROKES` only when no Chinese entry exists. Do not overwrite
     Japanese kanji lookup.
   - Convert medians/paths into a shape the existing `StrokeOrder` player
     and/or Alphabets `writepad.js` can consume so HSK 1 gets **animation +
     checked writing pad**.
   - Hanja: later PR; prefer Traditional/APL data (MMAH traditional or
     AnimCJK) for the ~421 Jōyō misses; leave KanjiVG hits as-is until a
     Korean-specific order source is justified.

3. **Not recommended:** treating “53% KanjiVG overlap” as done for P2.3, or
   dumping the full 9k MMAH set in one PR.
