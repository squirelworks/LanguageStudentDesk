#!/usr/bin/env python3
"""Build www/data/strokes/hiragana.js and katakana.js from KanjiVG.

KanjiVG (https://kanjivg.tagaini.net, © Ulrich Apel, CC BY-SA 3.0) draws
every kana as numbered strokes of cubic Béziers in a 109 × 109 box. The
writing pad (www/js/strokes.js) reads M/L/Q paths in a 100 × 100 box, so
each stroke is sampled into points, scaled, simplified and written as M/L.

A combination like きゃ or ファ is two kana written side by side; both are
drawn at 60% size, the first on the left and the small kana on the right.

    python3 tools/build_strokes.py path/to/kanjivg/kanji

Needs node (to read the lesson data). The output is committed and stays
under CC BY-SA 3.0.
"""
import json
import math
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
WWW = os.path.join(HERE, "..", "www")
SCALE = 100 / 109
STEPS = 10  # points per Bézier segment before simplifying
EPS = 0.35  # simplification tolerance in box units


def lesson_glyphs():
    js = (
        "global.window=global;"
        "eval(require('fs').readFileSync(process.argv[1],'utf8').replace('const JA_FONT','var JA_FONT'));"
        "process.stdout.write(JSON.stringify(SG_SCRIPTS.map(s=>[s.id,s.lessons.flatMap(l=>l.chars.filter(Boolean).map(c=>c[0]))])))"
    )
    out = subprocess.run(["node", "-e", js, os.path.join(WWW, "data", "kana.js")], check=True, capture_output=True)
    return json.loads(out.stdout)


def parse_path(d):
    """Sample an SVG path (M, C, S, L, any case) into a list of points."""
    toks = re.findall(r"[MmCcSsLl]|-?\d*\.?\d+(?:e-?\d+)?", d)
    pts, i, cmd = [], 0, None
    cur = (0.0, 0.0)
    last_ctrl = None
    while i < len(toks):
        if re.match(r"[A-Za-z]", toks[i]):
            cmd = toks[i]
            i += 1
        nums = lambda n: [float(t) for t in toks[i : i + n]]
        rel = cmd.islower()
        c = cmd.upper()
        if c == "M":
            x, y = nums(2)
            i += 2
            cur = (cur[0] + x, cur[1] + y) if rel and pts else (x, y)
            pts.append(cur)
            last_ctrl = None
            cmd = "l" if rel else "L"
        elif c == "L":
            x, y = nums(2)
            i += 2
            cur = (cur[0] + x, cur[1] + y) if rel else (x, y)
            pts.append(cur)
            last_ctrl = None
        elif c in "CS":
            if c == "C":
                v = nums(6)
                i += 6
                c1, c2, end = v[0:2], v[2:4], v[4:6]
                if rel:
                    c1 = (cur[0] + c1[0], cur[1] + c1[1])
                    c2 = (cur[0] + c2[0], cur[1] + c2[1])
                    end = (cur[0] + end[0], cur[1] + end[1])
            else:
                v = nums(4)
                i += 4
                c2, end = v[0:2], v[2:4]
                if rel:
                    c2 = (cur[0] + c2[0], cur[1] + c2[1])
                    end = (cur[0] + end[0], cur[1] + end[1])
                c1 = (2 * cur[0] - last_ctrl[0], 2 * cur[1] - last_ctrl[1]) if last_ctrl else cur
            p0 = cur
            for s in range(1, STEPS + 1):
                t = s / STEPS
                a, b, cc, dd = (1 - t) ** 3, 3 * (1 - t) ** 2 * t, 3 * (1 - t) * t * t, t**3
                pts.append(
                    (
                        a * p0[0] + b * c1[0] + cc * c2[0] + dd * end[0],
                        a * p0[1] + b * c1[1] + cc * c2[1] + dd * end[1],
                    )
                )
            last_ctrl = tuple(c2)
            cur = tuple(end)
        else:
            raise ValueError(f"unsupported path command {cmd} in {d}")
    return pts


def simplify(pts, eps):
    """Ramer–Douglas–Peucker."""
    if len(pts) < 3:
        return pts
    (x0, y0), (x1, y1) = pts[0], pts[-1]
    dx, dy = x1 - x0, y1 - y0
    norm = math.hypot(dx, dy) or 1e-9
    far, idx = 0, 0
    for k, (x, y) in enumerate(pts[1:-1], 1):
        dist = abs(dy * x - dx * y + x1 * y0 - y1 * x0) / norm
        if dist > far:
            far, idx = dist, k
    if far <= eps:
        return [pts[0], pts[-1]]
    return simplify(pts[: idx + 1], eps)[:-1] + simplify(pts[idx:], eps)


def strokes_of(kvg_dir, ch):
    path = os.path.join(kvg_dir, f"{ord(ch):05x}.svg")
    if not os.path.exists(path):
        return None
    svg = open(path, encoding="utf-8").read()
    found = re.findall(r'<path id="kvg:[0-9a-f]+-s(\d+)"[^>]*\sd="([^"]+)"', svg)
    return [parse_path(d) for _, d in sorted(found, key=lambda t: int(t[0]))]


def to_d(pts):
    out = [f"{x:.1f},{y:.1f}".replace(".0,", ",").removesuffix(".0") for x, y in pts]
    return "M" + out[0] + " " + " ".join("L" + p for p in out[1:])


def build(kvg_dir, glyph):
    chars = list(glyph)
    parts = [strokes_of(kvg_dir, ch) for ch in chars]
    if any(p is None for p in parts):
        return None
    if len(chars) == 1:
        place = [(SCALE, 0, 0)]
    else:
        s = SCALE * 0.6
        place = [(s, -2, 20), (s, 42, 20)]
    out = []
    for strokes, (s, ox, oy) in zip(parts, place):
        for pts in strokes:
            pts = [(x * s + ox, y * s + oy) for x, y in pts]
            out.append(to_d(simplify(pts, EPS)))
    return out


def main(kvg_dir):
    os.makedirs(os.path.join(WWW, "data", "strokes"), exist_ok=True)
    for script, glyphs in lesson_glyphs():
        data, missing = {}, []
        for g in glyphs:
            s = build(kvg_dir, g)
            if s:
                data[g] = s
            else:
                missing.append(g)
        path = os.path.join(WWW, "data", "strokes", f"{script}.js")
        with open(path, "w", encoding="utf-8") as f:
            f.write(
                f"// Stroke order for {script}, from KanjiVG (https://kanjivg.tagaini.net,\n"
                "// © Ulrich Apel, CC BY-SA 3.0), made by tools/build_strokes.py. Paths sit\n"
                "// in a 100 x 100 box; see www/js/strokes.js.\n"
                "window.SG_STROKES = window.SG_STROKES || {};\n"
                f'window.SG_STROKES["{script}"] = {{\n'
            )
            f.write(",\n".join(f"  {json.dumps(g, ensure_ascii=False)}: {json.dumps(v)}" for g, v in data.items()))
            f.write("\n};\n")
        print(f"{script}: {len(data)} characters, missing {''.join(missing) or 'none'}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
