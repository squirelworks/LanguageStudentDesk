#!/usr/bin/env python3
"""Draft stroke-order data for SquirrelGo Alphabets from Noto font outlines.

For each character the glyph is shaped (HarfBuzz) and rendered (FreeType),
thinned to a one-pixel centreline, turned into a graph and walked into pen
strokes: straight-through paths at junctions stay one stroke, strokes start
at the end a hand would start from (top first, then left, or right for
right-to-left scripts), and small detached marks come last. Hand-written
paths in overrides/<script>.json replace the draft for any character.

Output: www/data/strokes/<script>.js, paths in a 100 x 100 box using only
M and L commands, the format www/js/strokes.js reads.

Usage: strokegen.py <spec.json> [--sheet out.png]
"""
import argparse
import json
import math
import os
import sys
import unicodedata

import freetype
import numpy as np
import uharfbuzz as hb
from scipy import ndimage
from skimage.morphology import skeletonize

HERE = os.path.dirname(os.path.abspath(__file__))
PX = 4  # pixels per box unit while tracing
BOX = 100
N8 = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]


# ---------- rendering ----------

class Font:
    def __init__(self, path):
        self.path = path
        blob = hb.Blob.from_file_path(path)
        self.hbface = hb.Face(blob)
        self.hbfont = hb.Font(self.hbface)
        self.upem = self.hbface.upem
        self.ft = freetype.Face(path)

    def shape(self, text, direction):
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        if direction:
            buf.direction = direction
        hb.shape(self.hbfont, buf, {})
        return list(zip(buf.glyph_infos, buf.glyph_positions))

    def render(self, text, size_px, direction=None):
        """Bitmap of the shaped text with its pen origin; returns (img, ox, oy)
        where (ox, oy) is the baseline origin inside img."""
        self.ft.set_pixel_sizes(0, size_px)
        scale = size_px / self.upem
        pad = size_px
        W = H = size_px * 4
        img = np.zeros((H, W), np.uint8)
        ox, oy = pad, H // 2 + size_px // 3
        x = 0.0
        for info, pos in self.shape(text, direction):
            self.ft.load_glyph(info.codepoint, freetype.FT_LOAD_RENDER | freetype.FT_LOAD_NO_HINTING)
            g = self.ft.glyph
            bm = g.bitmap
            if bm.width and bm.rows:
                a = np.array(bm.buffer, np.uint8).reshape(bm.rows, bm.pitch)[:, : bm.width]
                gx = int(round(ox + (x + pos.x_offset) * scale)) + g.bitmap_left
                gy = int(round(oy - pos.y_offset * scale)) - g.bitmap_top
                sub = img[gy : gy + bm.rows, gx : gx + bm.width]
                np.maximum(sub, a[: sub.shape[0], : sub.shape[1]], out=sub)
            x += pos.x_advance
        return img, ox, oy


# ---------- skeleton graph ----------

def skeleton_graph(mask):
    sk = skeletonize(mask)
    ys, xs = np.nonzero(sk)
    pix = set(zip(ys.tolist(), xs.tolist()))

    def nbrs(p):
        return [(p[0] + dy, p[1] + dx) for dy, dx in N8 if (p[0] + dy, p[1] + dx) in pix]

    deg = {p: len(nbrs(p)) for p in pix}
    # Junction pixels (3+ neighbours) merge into one node per cluster.
    node_of = {}
    nodes = []
    for p in pix:
        if deg[p] >= 3 and p not in node_of:
            stack, cl = [p], []
            node_of[p] = len(nodes)
            while stack:
                q = stack.pop()
                cl.append(q)
                for r in nbrs(q):
                    if deg[r] >= 3 and r not in node_of:
                        node_of[r] = len(nodes)
                        stack.append(r)
            nodes.append(cl)
    for p in pix:
        if deg[p] <= 1:
            node_of[p] = len(nodes)
            nodes.append([p])
    centre = [tuple(np.mean(cl, axis=0)) for cl in nodes]

    edges = []  # (a, b, [pixels a..b])
    seen = set()
    for ni, cl in enumerate(nodes):
        for q in cl:
            for r in nbrs(q):
                if r in node_of:
                    nj = node_of[r]
                    if nj != ni and (min(q, r), max(q, r)) not in seen:
                        seen.add((min(q, r), max(q, r)))
                        edges.append([ni, nj, [centre[ni], centre[nj]]])
                    continue
                if (q, r) in seen:
                    continue
                path = [centre[ni], r]
                prev, cur = q, r
                seen.add((q, r))
                while True:
                    nx = [s for s in nbrs(cur) if s != prev and s not in cl]
                    nn = [s for s in nx if s in node_of]
                    if nn:
                        nj = node_of[nn[0]]
                        seen.add((nn[0], cur))
                        path.append(centre[nj])
                        edges.append([ni, nj, path])
                        break
                    nx = [s for s in nx if s not in path[-3:]]
                    if not nx:
                        edges.append([ni, ni, path])
                        break
                    seen.add((cur, nx[0]))
                    prev, cur = cur, nx[0]
                    path.append(cur)
    # dedupe edges walked from both ends
    uniq, keys = [], set()
    for a, b, p in edges:
        k = (min(a, b), max(a, b), frozenset((round(q[0]), round(q[1])) for q in p[1:-1]))
        if k in keys:
            continue
        keys.add(k)
        uniq.append([a, b, p])
    # the same branch walked from both ends: keep one copy
    def pixset(p):
        return {(int(round(q[0])), int(round(q[1]))) for q in p[1:-1]}
    kept = []
    for e in uniq:
        pe = pixset(e[2])
        dup = False
        for f in kept:
            if {e[0], e[1]} == {f[0], f[1]}:
                pf = pixset(f[2])
                if pe and len(pe & pf) > 0.6 * min(len(pe), len(pf)):
                    dup = True
                    break
        if not dup:
            kept.append(e)
    uniq = kept
    # pure loops with no node at all
    covered = set()
    for _, _, p in uniq:
        covered.update(tuple(map(int, q)) for q in p[1:-1] if isinstance(q[0], (int, np.integer)))
    for cl in nodes:
        covered.update(cl)
    for p in pix:
        if p in covered:
            continue
        loop, prev, cur = [p], None, p
        covered.add(p)
        while True:
            nx = [s for s in nbrs(cur) if s != prev and s not in covered]
            if not nx:
                break
            prev, cur = cur, nx[0]
            covered.add(cur)
            loop.append(cur)
        if len(loop) > 3:
            nodes.append([p])
            centre.append(p)
            ni = len(nodes) - 1
            uniq.append([ni, ni, [p] + loop[1:] + [p]])
    return centre, uniq


def plen(p):
    return sum(math.dist(p[i], p[i + 1]) for i in range(len(p) - 1))


def prune(centre, edges, spur):
    """Drop short branches ending in a free end (thinning artefacts at
    corners and stroke ends) and fold tiny junction-to-junction links."""
    changed = True
    while changed:
        changed = False
        deg = {}
        for a, b, _ in edges:
            deg[a] = deg.get(a, 0) + 1
            deg[b] = deg.get(b, 0) + 1
        for e in sorted(edges, key=lambda e: plen(e[2])):
            a, b, p = e
            if a == b:
                continue
            free = (deg[a] == 1) != (deg[b] == 1)
            if free and plen(p) < spur and (deg[a] >= 3 or deg[b] >= 3):
                edges.remove(e)
                changed = True
                break
            if deg[a] >= 3 and deg[b] >= 3 and plen(p) < spur * 0.6:
                edges.remove(e)
                for f in edges:
                    if f[0] == b:
                        f[0] = a
                        f[2] = [centre[a]] + f[2][1:]
                    if f[1] == b:
                        f[1] = a
                        f[2] = f[2][:-1] + [centre[a]]
                changed = True
                break
        if not changed:
            # merge chains through degree-2 nodes
            for n in list(deg):
                es = [e for e in edges if e[0] == n or e[1] == n]
                if len(es) == 2 and es[0] is not es[1] and deg.get(n) == 2:
                    e1, e2 = es
                    p1 = e1[2] if e1[1] == n else e1[2][::-1]
                    p2 = e2[2] if e2[0] == n else e2[2][::-1]
                    a = e1[0] if e1[1] == n else e1[1]
                    b = e2[1] if e2[0] == n else e2[0]
                    edges.remove(e1)
                    edges.remove(e2)
                    edges.append([a, b, p1 + p2[1:]])
                    changed = True
                    break
    return edges


# ---------- strokes ----------

def direction(p, k=6):
    a, b = np.array(p[0]), np.array(p[min(k, len(p) - 1)])
    d = b - a
    n = np.hypot(*d)
    return d / n if n else d


def walk(centre, edges, start_score, smooth_turn=55):
    """Turn the graph into pen strokes."""
    left = [list(e) for e in edges]
    strokes = []
    while left:
        deg = {}
        for a, b, _ in left:
            deg[a] = deg.get(a, 0) + 1
            deg[b] = deg.get(b, 0) + 1
        # candidate starts: free ends first, else any node
        cands = []
        for i, (a, b, p) in enumerate(left):
            if a == b:
                # loop: start at its top point
                # the last point repeats the first, so it is not a start
                j = min(range(max(1, len(p) - 1)), key=lambda j: start_score(p[j], loop=True))
                cands.append((start_score(p[j], loop=True) + (0 if deg[a] <= 2 else 5), i, "loop", j))
                continue
            for end, pt, other in ((a, p[0], b), (b, p[-1], a)):
                pen = 0 if deg[end] == 1 else 8
                cands.append((start_score(pt) + pen, i, "fwd" if end == a else "rev", 0))
        cands.sort(key=lambda c: c[0])
        _, i, how, j = cands[0]
        a, b, p = left.pop(i)
        if how == "loop":
            body = p[:-1] or p
            path = body[j:] + body[:j] + [body[j]]
            strokes.append(path)
            continue
        path = p if how == "fwd" else p[::-1]
        node = b if how == "fwd" else a
        # carry on straight through junctions
        while True:
            vin = -direction(path[::-1])
            best = None
            for k, (c, d, q) in enumerate(left):
                for end, qq in ((c, q), (d, q[::-1])):
                    if end != node or c == d:
                        continue
                    vout = direction(qq)
                    turn = math.degrees(math.acos(max(-1, min(1, float(np.dot(vin, vout))))))
                    if turn < smooth_turn and (best is None or turn < best[0]):
                        best = (turn, k, qq, d if end == c else c)
            if not best:
                break
            _, k, qq, nxt = best
            left.pop(k)
            path = path + qq[1:]
            node = nxt
        strokes.append(path)
    return strokes


def split_corners(p, thresh, reach=8):
    """Split a pen path at sharp corners (turns over thresh degrees), the way
    a hand lifts the pen at the corners of E or the point of V."""
    if len(p) < 2 * reach + 1:
        return [p]
    a = np.array(p, float)
    closed = np.allclose(a[0], a[-1], atol=2)
    n = len(a) - 1 if closed else len(a)
    turns = np.zeros(n)
    rng = range(n) if closed else range(reach, n - reach)
    for i in rng:
        u = a[i] - a[(i - reach) % n] if closed else a[i] - a[i - reach]
        v = a[(i + reach) % n] - a[i] if closed else a[i + reach] - a[i]
        nu, nv = np.hypot(*u), np.hypot(*v)
        if nu and nv:
            turns[i] = math.degrees(math.acos(max(-1, min(1, float(np.dot(u, v) / nu / nv)))))
    def straight(idx):
        pts = a[[j % n for j in idx]] if closed else a[[j for j in idx if 0 <= j < len(a)]]
        if len(pts) < 3:
            return True
        arc = np.sum(np.hypot(*np.diff(pts, axis=0).T))
        return arc == 0 or np.hypot(*(pts[-1] - pts[0])) / arc > 0.93

    # local maxima above the threshold, at least `reach` apart, where both
    # arms run straight into the corner (a hook or a tight curve is kept whole)
    cuts = []
    arm = 7
    for i in np.argsort(-turns):
        if turns[i] <= thresh:
            break
        if not (straight(range(i - arm, i + 1)) and straight(range(i, i + arm + 1))):
            continue
        if all(min(abs(i - c), n - abs(i - c)) > reach for c in cuts):
            cuts.append(int(i))
    cuts.sort()
    if not cuts:
        return [p]
    if closed:
        # rotate so the loop opens at its first corner
        k0 = cuts[0]
        p = list(p[k0:n]) + list(p[: k0 + 1])
        cuts = [(c - k0) % n for c in cuts[1:]]
    out, last = [], 0
    for c in sorted(cuts) + [len(p) - 1]:
        if c - last >= 2:
            out.append(p[last : c + 1])
        last = c
    return out or [p]


def smooth(p, w=2):
    if len(p) < 5:
        return p
    a = np.array(p, float)
    out = a.copy()
    for i in range(1, len(a) - 1):
        lo, hi = max(0, i - w), min(len(a), i + w + 1)
        out[i] = a[lo:hi].mean(axis=0)
    if np.allclose(a[0], a[-1]):
        out[-1] = out[0]
    return [tuple(x) for x in out]


def densify(p, step=1.0):
    out = [p[0]]
    for a, b in zip(p, p[1:]):
        n = max(1, int(math.dist(a, b) / step))
        for i in range(1, n + 1):
            out.append((a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n))
    return out


def rdp(p, eps):
    if len(p) < 3:
        return p
    a, b = np.array(p[0]), np.array(p[-1])
    ab = b - a
    n = np.hypot(*ab)
    best, idx = 0, 0
    for i in range(1, len(p) - 1):
        q = np.array(p[i])
        d = abs(ab[0] * (a - q)[1] - ab[1] * (a - q)[0]) / n if n else math.dist(p[i], p[0])
        if d > best:
            best, idx = d, i
    if best > eps:
        return rdp(p[: idx + 1], eps)[:-1] + rdp(p[idx:], eps)
    return [p[0], p[-1]]


def to_d(p):
    pts = []
    for x, y in p:
        q = (round(x), round(y))
        if not pts or q != pts[-1]:
            pts.append(q)
    if len(pts) == 1:
        pts.append((pts[0][0], pts[0][1] + 3))
    return "M" + " L".join(f"{x},{y}" for x, y in pts)


def components(mask):
    lab, n = ndimage.label(mask, structure=np.ones((3, 3)))
    return lab, n


def trace(img, cfg, xform):
    """img: grayscale glyph image already placed in the 400 x 400 box."""
    mask = img > 110
    if not mask.any():
        return []
    dist = ndimage.distance_transform_edt(mask)
    width = 2 * float(np.median(dist[skeletonize(mask)])) or 4
    rtl = cfg.get("dir") == "rtl"

    def start_score(pt, loop=False):
        y, x = pt[0] / PX, pt[1] / PX
        xs = (BOX - x) if rtl else x
        return y * cfg.get("wy", 1.0) + xs * cfg.get("wx", 0.6)

    lab, n = components(mask)
    parts = []
    for c in range(1, n + 1):
        m = lab == c
        if m.sum() < 6:
            continue
        ys, xs = np.nonzero(m)
        area = m.sum()
        centre, edges = skeleton_graph(m)
        edges = prune(centre, edges, spur=width * cfg.get("spur", 1.0))
        if not edges:
            cy, cx = ys.mean(), xs.mean()
            r = max(2.0, width * 0.4)
            parts.append((area, xs.min(), ys.min(), [[(cy - r, cx), (cy + r, cx)]], max(np.ptp(ys), np.ptp(xs)), (xs.min(), xs.max())))
            continue
        strokes = walk(centre, edges, start_score)
        parts.append((area, xs.min(), ys.min(), strokes, max(np.ptp(ys), np.ptp(xs)), (xs.min(), xs.max())))
    if not parts:
        return []
    tall = max(p[4] for p in parts)
    big = max(p[0] for p in parts)
    # Main bodies in reading order, then small marks (dots, accents) the same way.
    def key(p):
        small = p[4] < tall * cfg.get("mark", 0.4) or p[0] < big * 0.12
        x = p[1] / PX
        return (small, (BOX - x) if rtl else x, p[2])

    def score(st):
        (x0, y0), (x1, y1) = st[0], st[-1]
        horiz = abs(x1 - x0) / (math.hypot(x1 - x0, y1 - y0) + 1e-6)
        xs = (BOX - x0) if rtl else x0
        xe = (BOX - x1) if rtl else x1
        return y0 * cfg.get("wy", 1.0) + xs * cfg.get("wx", 0.6) + 4 * horiz + 0.01 * xe

    def orient(st):
        if math.dist(st[0], st[-1]) < 3 and len(st) > 4:
            body = st[:-1]
            area = sum(body[i][0] * body[(i + 1) % len(body)][1] - body[(i + 1) % len(body)][0] * body[i][1] for i in range(len(body)))
            if (area > 0) == (cfg.get("loops", "ccw") == "ccw"):
                body = body[::-1]
            j = min(range(len(body)), key=lambda i: body[i][1])
            body = body[j:] + body[:j]
            return body + [body[0]]
        return min((st, st[::-1]), key=score)

    # Reading order for separate pieces: across the line, except that pieces
    # stacked over each other (Ξ, the dots of ü) go top to bottom.
    import functools

    def cmp(p, q):
        kp, kq = key(p), key(q)
        if kp[0] != kq[0]:
            return -1 if kq[0] else 1
        (pa, pb), (qa, qb) = p[5], q[5]
        overlap = min(pb, qb) - max(pa, qa)
        if overlap > 0.5 * min(pb - pa, qb - qa):
            return -1 if p[2] < q[2] else 1
        return -1 if kp[1] < kq[1] else 1

    out = []
    marks = set()
    for p in sorted(parts, key=functools.cmp_to_key(cmp)):
        pieces = []
        for st in p[3]:
            st = smooth(st)
            st = [(x / PX, y / PX) for y, x in st]
            st = rdp(st, cfg.get("eps", 0.9))
            st = densify(st)
            for q in split_corners(st, cfg.get("corner", 80)):
                if plen(q) >= 2 or len(p[3]) == 1:
                    pieces.append(orient(rdp(q, cfg.get("eps", 0.9))))
        if len(pieces) > 1:
            # junction scraps
            pieces = [q for q in pieces if plen(q) >= cfg.get("scrap", 4)] or pieces
        if not cfg.get("graphOrder"):
            pieces = sorted(pieces, key=score)
        if cfg.get("join") and not key(p)[0]:
            # Cursive scripts (Tamil, Malayalam): keep the pen down where one
            # piece of a letter ends at the start, or end, of the next.
            joined = []
            for q in pieces:
                if joined and math.dist(joined[-1][-1], q[0]) < cfg["join"]:
                    joined[-1] = joined[-1] + q[1:]
                elif joined and math.dist(joined[-1][-1], q[-1]) < cfg["join"] and math.dist(q[0], q[-1]) >= 3:
                    joined[-1] = joined[-1] + q[::-1][1:]
                else:
                    joined.append(q)
            pieces = joined
        if key(p)[0]:
            marks.update(id(q) for q in pieces)
        out.extend(pieces)
    if cfg.get("headline_last"):
        # Devanagari-style headline: the flat pieces along the top become one
        # stroke, drawn last from left to right.
        def flat(s):
            xs = [p[0] for p in s]
            ys = [p[1] for p in s]
            return max(xs) - min(xs) > 6 and max(ys) - min(ys) < 5
        top = min((min(p[1] for p in s) for s in out if s), default=0)
        heads = [s for s in out if flat(s) and min(p[1] for p in s) < top + 6 and id(s) not in marks]
        if heads:
            xs = [p[0] for s in heads for p in s]
            y = float(np.mean([p[1] for s in heads for p in s]))
            head = [(min(xs), y), (max(xs), y)]
            out = [s for s in out if all(s is not h for h in heads)] + [head]
    return [(s, id(s) in marks) for s in out]


# ---------- driver ----------

def data_chars(path):
    """Every single character the script's lesson data teaches. A lesson
    entry like "A a" is two characters to write; "का" is one."""
    import subprocess
    js = (
        "const vm=require('vm');const w={};vm.runInNewContext(require('fs').readFileSync(process.argv[1],'utf8'),{window:w});"
        "const out=[];for(const s of w.SG_SCRIPTS)for(const l of s.lessons)for(const c of l.chars){if(!c)continue;"
        "for(const g of c[0].split(' '))if(g&&!out.includes(g))out.push(g)}console.log(JSON.stringify(out))"
    )
    return json.loads(subprocess.check_output(["node", "-e", js, path]))


def pick_font(fonts, text):
    cps = [ord(ch) for ch in text if ord(ch) not in (0x200C, 0x200D, 0x25CC)]
    for f in fonts:
        cmap = f.ft.get_chars()
        have = {c for c, _ in cmap}
        if all(c in have for c in cps):
            return f
    return fonts[0]


def build(spec_path, sheet=None, only=None):
    spec = json.load(open(spec_path))
    base = os.path.dirname(os.path.abspath(spec_path))
    import glob
    fonts = [Font(f) for pat in spec["fonts"] for f in sorted(glob.glob(os.path.join(HERE, "fonts", pat)))]
    if not fonts:
        sys.exit(f"no fonts match {spec['fonts']}: run fetch-fonts.sh {spec.get('fontPackages', '')}")
    chars = spec.get("chars") or data_chars(os.path.join(HERE, spec["data"]))
    spec["chars"] = chars
    if only:
        chars = [c for c in chars if c in only]
    dirn = "rtl" if spec.get("dir") == "rtl" else None
    size = 220
    renders = {c: pick_font(fonts, c).render(c, size, dirn) for c in chars}
    # One scale for the whole script so letters keep their relative sizes:
    # fit the union of all ink boxes (relative to the baseline) in the box.
    top = bot = None
    widest = 0
    for c, (img, ox, oy) in renders.items():
        ys, xs = np.nonzero(img > 60)
        if not len(ys):
            continue
        t, b = ys.min() - oy, ys.max() - oy
        top = t if top is None else min(top, t)
        bot = b if bot is None else max(bot, b)
        widest = max(widest, xs.max() - xs.min())
    margin = spec.get("margin", 10)
    span = BOX - 2 * margin
    k = span / max(bot - top, widest)
    k = min(k, spec.get("maxScale", 9e9) / size * 100)
    result = {}
    raw = {}
    for c, (img, ox, oy) in renders.items():
        ys, xs = np.nonzero(img > 60)
        if not len(ys):
            continue
        cx = (xs.min() + xs.max()) / 2
        # place: baseline-relative vertical, centred horizontally, 4 px per unit
        vy = margin + (span - (bot - top) * k) / 2
        M = np.zeros((BOX * PX, BOX * PX), np.uint8)
        yy, xx = np.nonzero(img)
        ty = ((yy - oy - top) * k + vy) * PX
        tx = ((xx - cx) * k + BOX / 2) * PX
        # resample by inverse mapping for a clean image
        gy, gx = np.mgrid[0 : BOX * PX, 0 : BOX * PX]
        sy = (gy / PX - vy) / k + oy + top
        sx = (gx / PX - BOX / 2) / k + cx
        M = ndimage.map_coordinates(img.astype(float), [sy, sx], order=1, cval=0).astype(np.uint8)
        raw[c] = trace(M, spec, lambda pt: pt)
    ov_path = os.path.join(HERE, "overrides", spec["id"] + ".json")
    overrides = load_overrides(spec["id"])
    for c, strokes in raw.items():
        if c in overrides:
            result[c] = overrides[c]
            continue
        body = [s for s, mark in strokes if not mark]
        marks = [s for s, mark in strokes if mark]
        b = unicodedata.normalize("NFD", c)[0]
        if b != c and b in overrides and marks and body:
            # An accented letter whose base letter was drawn by hand: put the
            # hand-drawn base where the traced one sits and keep the marks.
            body = fit(parse(overrides[b]), body)
        result[c] = [to_d(s) for s in enlarge(body + marks, spec.get("grow", 1.6))]
    if sheet:
        contact_sheet(result, sheet, spec)
    return spec, result


def load_overrides(script):
    """Hand-drawn strokes for a script. A value "@latin:M" borrows another
    script's drawing of a letter with the same shape (Greek Μ, Cyrillic М)."""
    path = os.path.join(HERE, "overrides", script + ".json")
    if not os.path.exists(path):
        return {}
    data = json.load(open(path))
    for c, v in list(data.items()):
        if isinstance(v, str) and v.startswith("@"):
            other, ch = v[1:].split(":", 1)
            data[c] = load_overrides(other)[ch]
    return data


def parse(paths):
    return [[tuple(map(float, t.split(","))) for t in d[1:].split(" L")] for d in paths]


def bbox(strokes):
    pts = [p for s in strokes for p in s]
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    return min(xs), min(ys), max(xs), max(ys)


def fit(src, dst):
    """Move and scale strokes src onto the bounding box of strokes dst."""
    a, b = bbox(src), bbox(dst)
    f = max(b[2] - b[0], b[3] - b[1]) / max(a[2] - a[0], a[3] - a[1], 1)
    ca, cb = ((a[0] + a[2]) / 2, (a[1] + a[3]) / 2), ((b[0] + b[2]) / 2, (b[1] + b[3]) / 2)
    return [[(cb[0] + (x - ca[0]) * f, cb[1] + (y - ca[1]) * f) for x, y in s] for s in src]


def enlarge(strokes, most):
    """Scale a character about the box centre so it fills the writing pad,
    by up to `most` times the script-wide size."""
    pts = [p for s in strokes for p in s]
    if not pts:
        return strokes
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    w, h = max(xs) - min(xs), max(ys) - min(ys)
    f = min(most, 78 / max(w, h, 1))
    cx, cy = (max(xs) + min(xs)) / 2, (max(ys) + min(ys)) / 2
    return [[(50 + (x - cx) * f, 50 + (y - cy) * f) for x, y in s] for s in strokes]


def write_js(spec, result, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    lines = [
        f"// Stroke order for {spec['title']}, drafted by SquirrelGo-Apps/tools/strokegen from",
        f"// {spec['fontName']} (SIL Open Font License) and checked by hand. Paths sit in a",
        "// 100 x 100 box; see www/js/strokes.js.",
        "window.SG_STROKES = window.SG_STROKES || {};",
        f"window.SG_STROKES[{json.dumps(spec['id'])}] = {{",
    ]
    for c in spec["chars"]:
        if c in result:
            lines.append(f"  {json.dumps(c, ensure_ascii=False)}: {json.dumps(result[c])},")
    lines.append("};")
    with open(os.path.join(out_dir, spec["id"] + ".js"), "w") as f:
        f.write("\n".join(lines) + "\n")


def contact_sheet(result, path, spec):
    from PIL import Image, ImageDraw
    cell = 120
    cols = 12
    keys = list(result)
    rows = (len(keys) + cols - 1) // cols
    im = Image.new("RGB", (cols * cell, rows * cell), "white")
    d = ImageDraw.Draw(im)
    colors = [(200, 30, 30), (30, 120, 200), (30, 160, 60), (200, 120, 0), (150, 40, 180), (0, 150, 150), (120, 120, 0), (200, 0, 120)]
    for i, c in enumerate(keys):
        ox, oy = (i % cols) * cell + 10, (i // cols) * cell + 10
        d.rectangle([ox, oy, ox + 100, oy + 100], outline=(220, 220, 220))
        for si, dd in enumerate(result[c]):
            pts = [tuple(map(float, t.split(","))) for t in dd[1:].split(" L")]
            pts = [(ox + x, oy + y) for x, y in pts]
            col = colors[si % len(colors)]
            if len(pts) > 1:
                d.line(pts, fill=col, width=4, joint="curve")
            d.ellipse([pts[0][0] - 4, pts[0][1] - 4, pts[0][0] + 4, pts[0][1] + 4], fill=col)
            d.text((pts[0][0] + 4, pts[0][1] - 10), str(si + 1), fill=(0, 0, 0))
        d.text((ox, oy + 100), c, fill=(0, 0, 0))
    im.save(path)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("spec")
    ap.add_argument("--out", default=None)
    ap.add_argument("--sheet")
    ap.add_argument("--only")
    a = ap.parse_args()
    spec, result = build(a.spec, a.sheet, a.only)
    if a.out:
        write_js(spec, result, a.out)
    print(f"{spec['id']}: {len(result)} characters, {sum(len(v) for v in result.values())} strokes", file=sys.stderr)
