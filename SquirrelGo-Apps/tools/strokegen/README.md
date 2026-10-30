# strokegen

Drafts stroke-order data for SquirrelGo Alphabets from the outlines of the Noto fonts.

```bash
./fetch-fonts.sh noto-sans noto-sans-armenian      # @fontsource npm packages -> fonts/*.ttf
python3 strokegen.py specs/armenian.json --sheet /tmp/armenian.png \
  --out ../../squirrelgo-characters/squirrelgo-alphabets/www/data/strokes
```

Needs Python 3 with `numpy scipy scikit-image freetype-py uharfbuzz pillow`, plus node (to read the lesson data) and npm (to fetch fonts). The fonts are build inputs only and are not committed.

## How a draft is made

1. Each character in the script's lesson data (`"A a"` is two characters) is shaped with HarfBuzz and rendered with FreeType. One scale is used for the whole script so letters keep their relative sizes; each is then enlarged up to 1.6 times to fill the writing pad.
2. The glyph is thinned to a one-pixel centre line and turned into a graph of ends, junctions and branches. Short spurs from thinning are pruned.
3. The graph is walked into pen strokes: at a junction the pen carries straight on, and lifts at a sharp corner where both sides are straight (the corners of E, the point of V; a hook or tight curve stays whole).
4. Each stroke starts at the end a hand would start from: top first, then left (right for `"dir": "rtl"`). Closed loops start at the top and run anticlockwise. Dots and accents (small separate pieces) come last; pieces stacked over each other go top to bottom. With `"headline_last"` the flat pieces along the top join into one headline drawn last, as in Devanagari. With `"join": <distance>` the pieces of one letter that meet end to start are drawn as one stroke, for scripts written in long looping strokes (Tamil, Telugu, Kannada, Malayalam, Sinhala).
5. The contact sheet (`--sheet`) shows every character with numbered, coloured strokes for review.

## Hand-drawn strokes

`overrides/<script>.json` maps a character to its stroke paths (M and L commands in the 100 × 100 box). They replace the draft. A value like `"@latin:M"` borrows another script's drawing of the same shape. An accented letter whose base letter is hand-drawn (é from e) gets the hand-drawn base fitted to where the traced one sits, plus its traced marks.
