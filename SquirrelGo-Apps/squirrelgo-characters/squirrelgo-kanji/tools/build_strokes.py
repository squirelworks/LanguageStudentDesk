#!/usr/bin/env python3
"""Build www/data/strokes.js: KanjiVG stroke paths and stroke-number positions
for every kanji in that file.

KanjiVG (https://kanjivg.tagaini.net, © Ulrich Apel, CC BY-SA 3.0) draws each
kanji as numbered SVG strokes on a 109 x 109 grid. The paths are kept as they
are, with every number rounded to one decimal. The output stays under
CC BY-SA 3.0.

    python3 tools/build_strokes.py                 # fetch the pinned release
    python3 tools/build_strokes.py path/to/kanji   # or read a local KanjiVG kanji/ folder

Fetched SVGs are cached in tools/.kanjivg-<release>/ (not committed). The
Android copy of the file is written too, so both stay identical.

An earlier version of this file was made by a script that rounded -0.02 to
"0" and dropped the minus sign that was also the separator, so "c3.6-0.02,5.77"
became "c3.60,5.8" and browsers stopped drawing the stroke there. Paths are now
rebuilt token by token, so every number keeps a separator.
"""
import concurrent.futures
import json
import os
import re
import sys
import urllib.request

RELEASE = "r20250816"
URL = "https://raw.githubusercontent.com/KanjiVG/kanjivg/{rel}/kanji/{code:05x}.svg"

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(HERE, "..")
OUTPUTS = [
    os.path.join(APP, "www", "data", "strokes.js"),
    os.path.join(APP, "android", "app", "src", "main", "assets", "www", "data", "strokes.js"),
]
HEADER = (
    "// Stroke order for SquirrelGo Kanji, derived from KanjiVG (https://kanjivg.tagaini.net),\n"
    "// Copyright (C) 2009-2024 Ulrich Apel, licensed under CC BY-SA 3.0\n"
    "// (https://creativecommons.org/licenses/by-sa/3.0/). Coordinates are rounded to one decimal;\n"
    "// each entry is [stroke paths in order, stroke-number label positions] on a 109x109 grid.\n"
    "// Made by tools/build_strokes.py.\n"
)
TOKEN = re.compile(r"[A-Za-z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?")


def num(v):
    s = f"{v:.1f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def round_path(d):
    """Round every number to one decimal and write each with a separator."""
    out, prev_num = [], False
    for t in TOKEN.findall(d):
        if t[0].isalpha():
            out.append(t)
            prev_num = False
            continue
        s = num(float(t))
        if prev_num and not s.startswith("-"):
            out.append(",")
        out.append(s)
        prev_num = True
    return "".join(out)


def current_keys():
    text = open(OUTPUTS[0], encoding="utf-8").read()
    data = json.loads(text[text.index("{") : text.rindex("}") + 1])
    return list(data)


def fetch(code, cache):
    path = os.path.join(cache, f"{code:05x}.svg")
    if not os.path.exists(path):
        with urllib.request.urlopen(URL.format(rel=RELEASE, code=code), timeout=60) as r:
            body = r.read()
        with open(path, "wb") as f:
            f.write(body)
    return path


def entry(svg):
    found = re.findall(r'<path id="kvg:[0-9a-f]+-s(\d+)"[^>]*\sd="([^"]+)"', svg)
    paths = [round_path(d) for _, d in sorted(found, key=lambda t: int(t[0]))]
    labels = [
        [round(float(x)), round(float(y))]
        for x, y, _ in sorted(
            re.findall(r'<text transform="matrix\(1 0 0 1 ([\d.]+) ([\d.]+)\)">(\d+)</text>', svg),
            key=lambda t: int(t[2]),
        )
    ]
    if not paths or len(paths) != len(labels):
        raise ValueError("stroke and label counts differ")
    return [paths, labels]


def main(kvg_dir=None):
    keys = current_keys()
    if kvg_dir is None:
        kvg_dir = os.path.join(HERE, f".kanjivg-{RELEASE}")
        os.makedirs(kvg_dir, exist_ok=True)
        with concurrent.futures.ThreadPoolExecutor(16) as pool:
            list(pool.map(lambda c: fetch(ord(c), kvg_dir), keys))
    data = {}
    for c in keys:
        with open(os.path.join(kvg_dir, f"{ord(c):05x}.svg"), encoding="utf-8") as f:
            data[c] = entry(f.read())
    body = HEADER + "window.KANJI_STROKES = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n"
    for out in OUTPUTS:
        with open(out, "w", encoding="utf-8") as f:
            f.write(body)
    print(f"{len(data)} kanji from KanjiVG {RELEASE}")


if __name__ == "__main__":
    main(*sys.argv[1:2])
