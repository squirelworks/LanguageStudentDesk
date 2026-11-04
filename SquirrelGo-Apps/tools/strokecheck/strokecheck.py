#!/usr/bin/env python3
"""Check stroke-order data against real glyphs (roadmap #188).

Two checks, for every character in every stroke set listed in sets.json:

  final frame   Draw the finished strokes and the character from a reference
                font, fit both into the same box, and measure
                  coverage:  how much of the glyph the strokes cover
                  precision: how much of the strokes lie on the glyph
                Low coverage means missing parts (言 without the right side of
                its lower box); low precision means extra or misplaced strokes.
  stroke count  Compare the number of strokes with a reference count, where a
                set has one (counts/<set>.json, or the shared CJK table).

Characters that already fail are listed in baseline.json, so the check can
run in CI before every script has been audited. CI fails when a character not
in the baseline fails, or when a baselined character now passes (take it out
of the baseline, so the list only shrinks). An audit PR for a script fixes its
characters and removes them from the baseline.

    python3 strokecheck.py                    # every set; exit 1 on new failures
    python3 strokecheck.py zhuyin hiragana    # only these sets
    python3 strokecheck.py --report out.json  # every score, for review
    python3 strokecheck.py --sheet out/       # PNG per set: glyph vs strokes
    python3 strokecheck.py --write-baseline   # record today's failures

Needs Python 3 with numpy, pillow (with FreeType) and fonttools, plus node (to
read the stroke files) and npm (to fetch the Noto fonts from @fontsource into
fonts/, which is not committed).
"""
import argparse
import io
import json
import math
import re
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = Path(__file__).resolve().parent
APPS = HERE.parent.parent            # SquirrelGo-Apps/
REPO = APPS.parent
FONTS = HERE / "fonts"
SIZE = 128                           # comparison canvas, pixels
PAD = 8

# Pass marks. A finished frame passes when both scores reach these. A set can
# lower them in sets.json when its source is handwriting rather than type, as
# KanjiVG is: its kana and kanji end and hook where a pen does, not where a
# Gothic font does.
MIN_COVERAGE = 0.75
MIN_PRECISION = 0.85


# --- reading stroke files ------------------------------------------------

NODE_READ = r"""
const fs = require('fs'), vm = require('vm');
const ctx = { window: {} }; ctx.window.window = ctx.window; vm.createContext(ctx);
for (const f of process.argv.slice(1)) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
const w = ctx.window, out = {};
for (const k of Object.keys(w)) if (k !== 'window') out[k] = w[k];
process.stdout.write(JSON.stringify(out));
"""


def read_js(files):
    out = subprocess.run(["node", "-e", NODE_READ, *map(str, files)],
                         check=True, capture_output=True, text=True).stdout
    return json.loads(out)


def load_set(spec):
    """Return {char: [path, ...]} and the box size for one stroke set."""
    data = read_js([APPS / f for f in spec["files"]])
    table = data.get(spec.get("global", "SG_STROKES"), {})
    if spec.get("key"):
        table = table.get(spec["key"], {})
    chars = {}
    for ch, v in table.items():
        # KanjiVG-style entries are [paths, label positions].
        if v and isinstance(v[0], list):
            v = v[0]
        chars[ch] = v
    return chars, spec.get("box", 100)


# --- SVG paths -----------------------------------------------------------

TOKEN = re.compile(r"[MmLlHhVvCcSsQqTtZz]|-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?")


def path_points(d, steps=12):
    """Flatten an SVG path (M L H V C S Q T Z, either case) into polylines."""
    toks = TOKEN.findall(d)
    i, cmd = 0, None
    x = y = sx = sy = 0.0
    last_c = last_q = None
    lines, cur = [], []

    def num():
        nonlocal i
        v = float(toks[i]); i += 1
        return v

    def bez(pts):
        n = len(pts) - 1
        for s in range(1, steps + 1):
            t = s / steps
            px = sum(math.comb(n, k) * (1 - t) ** (n - k) * t ** k * pts[k][0] for k in range(n + 1))
            py = sum(math.comb(n, k) * (1 - t) ** (n - k) * t ** k * pts[k][1] for k in range(n + 1))
            cur.append((px, py))

    while i < len(toks):
        if re.fullmatch(r"[A-Za-z]", toks[i]):
            cmd = toks[i]; i += 1
            if cmd in "Zz":
                cur.append((sx, sy)); x, y = sx, sy
                continue
        rel = cmd.islower()
        c = cmd.upper()
        ox, oy = (x, y) if rel else (0.0, 0.0)
        if c == "M":
            if len(cur) > 1:
                lines.append(cur)
            x, y = ox + num(), oy + num(); sx, sy = x, y
            cur = [(x, y)]
            cmd = "l" if rel else "L"
            last_c = last_q = None
        elif c == "L":
            x, y = ox + num(), oy + num(); cur.append((x, y)); last_c = last_q = None
        elif c == "H":
            x = ox + num(); cur.append((x, y)); last_c = last_q = None
        elif c == "V":
            y = (y if rel else 0.0) + num(); cur.append((x, y)); last_c = last_q = None
        elif c == "C":
            p1 = (ox + num(), oy + num()); p2 = (ox + num(), oy + num()); p = (ox + num(), oy + num())
            bez([(x, y), p1, p2, p]); last_c, last_q = p2, None; x, y = p
        elif c == "S":
            p1 = (2 * x - last_c[0], 2 * y - last_c[1]) if last_c else (x, y)
            p2 = (ox + num(), oy + num()); p = (ox + num(), oy + num())
            bez([(x, y), p1, p2, p]); last_c, last_q = p2, None; x, y = p
        elif c == "Q":
            p1 = (ox + num(), oy + num()); p = (ox + num(), oy + num())
            bez([(x, y), p1, p]); last_q, last_c = p1, None; x, y = p
        elif c == "T":
            p1 = (2 * x - last_q[0], 2 * y - last_q[1]) if last_q else (x, y)
            p = (ox + num(), oy + num())
            bez([(x, y), p1, p]); last_q, last_c = p1, None; x, y = p
        else:
            raise ValueError(f"unsupported path command {cmd!r} in {d[:40]}")
    if cur:
        lines.append(cur)
    return lines


# --- fonts ---------------------------------------------------------------

class Fonts:
    """Every .woff/.ttf of the given @fontsource packages, indexed by cmap."""

    def __init__(self, packages):
        from fontTools.ttLib import TTFont
        self.faces = []
        for pkg in packages:
            pdir = FONTS / pkg
            if not pdir.exists():
                fetch(pkg)
            for f in sorted(pdir.glob("package/files/*-400-normal.woff")):
                t = TTFont(f)
                cmap = set(t.getBestCmap() or {})
                t.flavor = None
                buf = io.BytesIO(); t.save(buf)
                self.faces.append((cmap, buf.getvalue()))
        self.cache = {}

    def font_for(self, text):
        cps = {ord(c) for c in text if not c.isspace()}
        for i, (cmap, data) in enumerate(self.faces):
            if cps <= cmap:
                if i not in self.cache:
                    self.cache[i] = ImageFont.truetype(io.BytesIO(data), 400)
                return self.cache[i]
        return None


def fetch(pkg):
    dest = FONTS / pkg
    dest.mkdir(parents=True, exist_ok=True)
    tgz = subprocess.run(["npm", "pack", f"@fontsource/{pkg}", "--silent"], cwd=dest,
                         check=True, capture_output=True, text=True).stdout.strip().splitlines()[-1]
    subprocess.run(["tar", "xzf", tgz, "--wildcards", "package/files/*-400-normal.woff"],
                   cwd=dest, check=True)
    (dest / tgz).unlink()


# --- drawing and scoring -------------------------------------------------

def fit(bbox):
    """Scale and offset that fit a bounding box, centred, in the canvas."""
    x0, y0, x1, y1 = bbox
    w, h = max(x1 - x0, 1e-6), max(y1 - y0, 1e-6)
    s = (SIZE - 2 * PAD) / max(w, h)
    return s, PAD + ((SIZE - 2 * PAD) - w * s) / 2 - x0 * s, PAD + ((SIZE - 2 * PAD) - h * s) / 2 - y0 * s


def glyph_mask(text, font):
    img = Image.new("L", (1200, 900), 0)
    ImageDraw.Draw(img).text((200, 150), text, font=font, fill=255)
    bbox = img.getbbox()
    if not bbox:
        return None
    crop = img.crop(bbox)
    s, ox, oy = fit((0, 0, crop.width, crop.height))
    crop = crop.resize((max(1, round(crop.width * s)), max(1, round(crop.height * s))), Image.LANCZOS)
    out = Image.new("L", (SIZE, SIZE), 0)
    out.paste(crop, (round(ox), round(oy)))
    return np.array(out) > 127


def stroke_mask(paths, width):
    lines = [ln for p in paths for ln in path_points(p)]
    pts = [pt for ln in lines for pt in ln]
    if not pts:
        return None
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    s, ox, oy = fit((min(xs), min(ys), max(xs), max(ys)))
    img = Image.new("L", (SIZE, SIZE), 0)
    d = ImageDraw.Draw(img)
    for ln in lines:
        q = [(x * s + ox, y * s + oy) for x, y in ln]
        if len(q) == 1:
            q = q * 2
        d.line(q, fill=255, width=max(1, round(width)), joint="curve")
        r = width / 2
        for x, y in (q[0], q[-1]):
            d.ellipse((x - r, y - r, x + r, y + r), fill=255)
    return np.array(img) > 127


def half_width(mask):
    """Half the glyph's thickest stroke: erosions until almost no ink is left."""
    img = Image.fromarray((mask * 255).astype(np.uint8))
    total = mask.sum()
    for n in range(1, 30):
        img = img.filter(ImageFilter.MinFilter(3))
        if (np.array(img) > 127).sum() < 0.01 * total:
            return n
    return 30


def dilate(mask, r):
    img = Image.fromarray((mask * 255).astype(np.uint8))
    for _ in range(max(0, r)):
        img = img.filter(ImageFilter.MaxFilter(3))
    return np.array(img) > 127


def score(text, paths, font):
    g = glyph_mask(text, font)
    if g is None:
        return None
    hw = half_width(g)
    slack = round(0.05 * SIZE)                    # handwriting isn't a font: allow some drift
    thick = stroke_mask(paths, 2 * hw + slack)    # strokes as wide as the glyph's thickest part
    thin = stroke_mask(paths, 2)                  # the pen's centre line
    if thick is None:
        return {"coverage": 0.0, "precision": 0.0, "glyph": g, "strokes": thin}
    cov = (g & thick).sum() / max(g.sum(), 1)
    prec = (thin & dilate(g, hw // 2 + slack // 2)).sum() / max(thin.sum(), 1)
    return {"coverage": round(float(cov), 3), "precision": round(float(prec), 3), "glyph": g, "strokes": thin}


def sheet(rows, path):
    cols = 12
    cell = SIZE + 4
    img = Image.new("RGB", (cols * cell, math.ceil(len(rows) / cols) * (cell + 14)), "white")
    d = ImageDraw.Draw(img)
    for n, (ch, r) in enumerate(rows):
        x, y = (n % cols) * cell, (n // cols) * (cell + 14)
        if r and "glyph" in r:
            rgb = np.full((SIZE, SIZE, 3), 255, np.uint8)
            rgb[r["glyph"]] = (200, 200, 200)
            rgb[r["strokes"]] = (200, 30, 30)
            img.paste(Image.fromarray(rgb), (x, y))
            bad = not r["pass"]
            d.text((x + 2, y + SIZE), f"{r['coverage']:.2f} {r['precision']:.2f}{' X' if bad else ''}",
                   fill=(200, 0, 0) if bad else (0, 0, 0))
    img.save(path)


# --- reference counts ----------------------------------------------------

def reference_counts(spec):
    """{char: count} from counts/<set>.json or the shared CJK table, if any."""
    src = spec.get("counts")
    if not src:
        return {}
    if src == "cjk":
        table = read_js([REPO / "languages/cjk/characters.js"]).get("LSD_CJK") or {}
        return {ch: int(v["strokes"]) for ch, v in table.items() if str(v.get("strokes", "")).isdigit()}
    return json.loads((HERE / src).read_text(encoding="utf-8"))["counts"]


# --- main ----------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("sets", nargs="*", help="stroke set ids from sets.json (default: all)")
    ap.add_argument("--report", help="write every score to this JSON file")
    ap.add_argument("--sheet", help="write a PNG contact sheet per set into this folder")
    ap.add_argument("--write-baseline", action="store_true", help="record today's failures in baseline.json")
    args = ap.parse_args()

    sets = json.loads((HERE / "sets.json").read_text(encoding="utf-8"))["sets"]
    base_path = HERE / "baseline.json"
    baseline = json.loads(base_path.read_text(encoding="utf-8")) if base_path.exists() else {}
    chosen = args.sets or list(sets)
    unknown = [s for s in chosen if s not in sets]
    if unknown:
        sys.exit(f"unknown stroke set(s): {', '.join(unknown)}")

    report, new_fail, now_pass, skipped = {}, [], [], []
    for sid in chosen:
        spec = sets[sid]
        if spec.get("skip"):
            skipped.append(f"{sid}: {spec['skip']}")
            continue
        chars, _ = load_set(spec)
        fonts = Fonts(spec["fonts"])
        counts = reference_counts(spec)
        known = baseline.get(sid, {})
        rows, fails = [], {}
        for ch, paths in chars.items():
            if len(ch) > 1 and not spec.get("combined"):
                continue                          # a pairing like きゃ is checked through its parts
            r = None
            font = fonts.font_for(ch)
            problems = []
            if font is None:
                problems.append("no reference glyph")
            else:
                try:
                    r = score(ch, paths, font)
                except (IndexError, ValueError) as e:
                    r = None
                    problems.append(f"malformed path ({e.__class__.__name__})")
                if r is None:
                    problems = problems or ["reference glyph is empty"]
                else:
                    if r["coverage"] < spec.get("min_coverage", MIN_COVERAGE):
                        problems.append(f"coverage {r['coverage']}")
                    if r["precision"] < spec.get("min_precision", MIN_PRECISION):
                        problems.append(f"precision {r['precision']}")
            if ch in counts and counts[ch] != len(paths):
                problems.append(f"{len(paths)} strokes, reference says {counts[ch]}")
            if r is not None:
                r["pass"] = not problems
            rows.append((ch, r))
            if problems:
                fails[ch] = "; ".join(problems)
            report.setdefault(sid, {})[ch] = {
                k: v for k, v in (r or {}).items() if k in ("coverage", "precision")
            } | {"strokes": len(paths), "problems": problems}
        for ch, why in fails.items():
            if ch not in known:
                new_fail.append(f"{sid} {ch}: {why}")
        for ch in known:
            if ch in chars and ch not in fails:
                now_pass.append(f"{sid} {ch}")
        if args.write_baseline:
            if fails:
                baseline[sid] = dict(sorted(fails.items()))
            else:
                baseline.pop(sid, None)
        if args.sheet:
            Path(args.sheet).mkdir(parents=True, exist_ok=True)
            sheet(rows, Path(args.sheet) / f"{sid}.png")
        print(f"{sid}: {len(chars)} characters, {len(fails)} failing"
              f" ({len([c for c in fails if c in known])} already in the baseline)")

    if args.report:
        Path(args.report).write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
    for s in skipped:
        print("skipped", s)
    if args.write_baseline:
        base_path.write_text(json.dumps(dict(sorted(baseline.items())), ensure_ascii=False, indent=1) + "\n",
                             encoding="utf-8")
        print(f"wrote {base_path.name}")
        return 0
    if new_fail:
        print("\nNew failures (fix the strokes; see --sheet):")
        print("\n".join("  " + f for f in new_fail))
    if now_pass:
        print("\nThese now pass. Take them out of baseline.json:")
        print("\n".join("  " + f for f in now_pass))
    return 1 if new_fail or now_pass else 0


if __name__ == "__main__":
    sys.exit(main())
