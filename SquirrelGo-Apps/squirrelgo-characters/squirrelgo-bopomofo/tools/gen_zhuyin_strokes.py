#!/usr/bin/env python3
"""Generate www/data/strokes/zhuyin.js: Bopomofo stroke paths in a 100 x 100 box.

The Zhuyin symbols come from AnimCJK (https://github.com/parsimonhi/animCJK,
© FM-SH), whose Bopomofo drawings are not derived from the Arphic fonts and are
offered under the GNU LGPL 3.0 or later. Each AnimCJK stroke has a median line
(the pen's centre path) on a 1024 grid; it is scaled into the 100 box and
written as M/L commands. The output stays under the LGPL.

AnimCJK has no tone marks, so ˊ ˇ ˋ ˙ are drawn here.

    python3 tools/gen_zhuyin_strokes.py              # fetch the pinned AnimCJK commit
    python3 tools/gen_zhuyin_strokes.py path/to/dir  # or read local svgsZhHansZoo SVGs

Fetched SVGs are cached in tools/.animcjk-<commit>/ (not committed).
"""
import re
import sys
import urllib.request
from pathlib import Path

COMMIT = "1c8c8ef45aa9dfe1e1129cb5462ddf59a50a65ce"
URL = "https://raw.githubusercontent.com/parsimonhi/animCJK/{rev}/svgsZhHansZoo/{code}.svg"
HERE = Path(__file__).resolve().parent
OUT = HERE.parent / "www" / "data" / "strokes" / "zhuyin.js"

SYMBOLS = (
    "ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙ"  # initials
    "ㄧㄨㄩ"  # medials
    "ㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ"  # finals
)

# Tone marks, drawn here because AnimCJK has none.
TONES = {
    "ˊ": ["M34,68 L66,32"],
    "ˇ": ["M22,22 L50,78 L78,22"],
    "ˋ": ["M34,32 L66,68"],
    "˙": ["M46,50 Q50,46 54,50 Q50,54 46,50"],
}


def svg_for(ch, src):
    path = Path(src) / f"{ord(ch)}.svg"
    if not path.exists():
        with urllib.request.urlopen(URL.format(rev=COMMIT, code=ord(ch)), timeout=60) as r:
            path.write_bytes(r.read())
    return path.read_text(encoding="utf-8")


def num(v):
    s = f"{v:.1f}".rstrip("0").rstrip(".")
    return "0" if s == "-0" else s


def medians(svg):
    out = []
    for d in re.findall(r'<path [^>]*clip-path="url\([^)]*\)"[^>]*\sd="([^"]+)"', svg):
        pts = re.findall(r"(-?[\d.]+)[ ,](-?[\d.]+)", d)
        out.append("M" + " L".join(f"{num(float(x) * 100 / 1024)},{num(float(y) * 100 / 1024)}" for x, y in pts))
    if not out:
        raise ValueError("no strokes found")
    return out


def main(src=None):
    if src is None:
        src = HERE / f".animcjk-{COMMIT[:7]}"
        src.mkdir(exist_ok=True)
    strokes = {ch: medians(svg_for(ch, src)) for ch in SYMBOLS}
    strokes.update(TONES)
    lines = [
        "// Zhuyin (Bopomofo) stroke order for SquirrelGo Bopomofo, from AnimCJK",
        "// (https://github.com/parsimonhi/animCJK, © FM-SH, GNU LGPL 3.0 or later), made by",
        "// tools/gen_zhuyin_strokes.py. Paths sit in a 100×100 box; see www/js/strokes.js.",
        "window.SG_STROKES = window.SG_STROKES || {};",
        'window.SG_STROKES["zhuyin"] = {',
    ]
    lines += [f'  "{ch}": [{", ".join(chr(34) + p + chr(34) for p in paths)}],' for ch, paths in strokes.items()]
    lines[-1] = lines[-1].rstrip(",")
    lines += ["};", ""]
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {len(strokes)} symbols to {OUT}")


if __name__ == "__main__":
    main(*sys.argv[1:2])
