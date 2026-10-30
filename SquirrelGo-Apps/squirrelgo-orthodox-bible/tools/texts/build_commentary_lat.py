#!/usr/bin/env python3
"""Latin originals of patristic commentary, from the Open Greek and Latin
edition of the Corpus Scriptorum Ecclesiasticorum Latinorum (csel-dev,
CC BY-SA 4.0), as downloadable packs keyed to the same verses as the
translations:

    - St Ambrose of Milan on St Luke (Expositio evangelii secundum Lucan,
      CSEL 32.4, ed. Schenkl 1902), on twelve Psalms (Explanatio psalmorum XII,
      CSEL 64, ed. Petschenig 1919) and on Psalm 118 (CSEL 62, 1913);
    - St Hilary of Poitiers on the Psalms (Tractatus super psalmos, CSEL 22,
      ed. Zingerle 1891).

The Luke commentary prints the verse each section discusses in the margin
(<bibl n="...tlg0031.tlg003:1.2">), which gives the key. The Psalm commentaries
are divided by Psalm (Latin numbering; for Psalm 118 by letter, eight verses
each) and by numbered section, and quote the verses as they go, so each
section is keyed to the verse of that Psalm whose words it shares most, matched
against the Clementine Vulgate pack (built by build_bibles.py --packs, or
downloaded into packs/bibles/). Notes use the Vulgate numbering (vul).

build_commentary.py calls build() and lists the result in commentary_packs.json.
"""
import json
import os
import re
import unicodedata

from build_commentary_grc import LICENSE, write
from common import CACHE, PACKS_DIR

SRC = os.path.join(CACHE, "csel", "data")
CSEL = "https://github.com/OpenGreekAndLatin/csel-dev"
VULGATE = os.path.join(PACKS_DIR, "bibles", "lat-vulgate-clementine.js")
LETTERS = ("aleph beth gimel daleth he vau zain heth teth iod caph lamed mem nun samech ain phe zade koph "
           "resch sin tau").split()

AMBROSE = {
    "luke": ("stoa0022/stoa051", "Expositio evangelii secundum Lucan (CSEL 32.4, ed. Schenkl, 1902)"),
    "psalms": ("stoa0022/stoa048", "Explanatio psalmorum XII (CSEL 64, ed. Petschenig, 1919)"),
    "ps118": ("stoa0022/stoa052", "Expositio psalmi CXVIII (CSEL 62, ed. Petschenig, 1913)"),
}
# Psalm numbers misprinted in the editions' markup (Hilary's "CLIX" is Psalm 149)
FIXES = {"159": "149"}
HILARY = ("stoa0149b/stoa001", "Tractatus super psalmos (CSEL 22, ed. Zingerle, 1891)")


def plain(s):
    s = unicodedata.normalize("NFD", s.lower().replace("æ", "ae").replace("œ", "oe"))
    s = "".join(c for c in s if not unicodedata.combining(c))
    return s.replace("j", "i").replace("v", "u")


def words(s):
    return re.findall(r"[a-z]+", plain(s))


def bigrams(ws):
    return set(zip(ws, ws[1:]))


def text_of(p):
    p = re.sub(r"<note\b.*?</note>", "", p, flags=re.S)
    p = re.sub(r"<[^>]+>", " ", p)
    p = re.sub(r"(\w)-\s+(?=[a-z])", r"\1", p)  # words hyphenated across printed lines
    return re.sub(r"\s+", " ", p).strip()


def read(path):
    with open(path, encoding="utf-8") as f:
        t = f.read()
    return t[t.find("<body"):]


def source(rel):
    d = os.path.join(SRC, rel)
    return os.path.join(d, rel.replace("/", ".") + ".opp-lat1.xml")


def divs(t, subtype):
    """[(n, text)] of the <div subtype=...> parts, in order."""
    marks = [(m.start(), m[1] or m[2]) for m in re.finditer(
        r'<div\b(?=[^>]*subtype="%s")[^>]*?\bn="([^"]+)"[^>]*>|<div\b[^>]*\bn="([^"]+)"[^>]*subtype="%s"[^>]*>'
        % (subtype, subtype), t)]
    return [(n, t[a:b]) for (a, n), (b, _) in zip(marks, marks[1:] + [(len(t), "")])]


def ambrose_luke():
    path = source(AMBROSE["luke"][0])
    if not os.path.exists(path):
        print("    missing", path)
        return {}
    notes, key = {}, None
    for _, part in divs(read(path), "section"):
        m = re.search(r'tlg0031\.tlg003:(\d+)\.(\d+)', part)
        if m:
            key = "LUK.%s.%s" % (m[1], m[2])
        t = text_of(part)
        if key and len(t) > 20:
            notes.setdefault(key, []).append(t)
    return notes


class Psalm:
    """Keys the sections of a commentary on one Psalm (or verses lo..hi of it) to its verses."""

    def __init__(self, vul, n, lo=1, hi=None):
        verses = vul["PSA"][n - 1]
        hi = hi or len(verses)
        self.n = n
        self.verses = [(v, bigrams(words(verses[v - 1] or ""))) for v in range(lo, min(hi, len(verses)) + 1)]
        self.pos = 0

    def key(self, text):
        """The verse quoted first in the section (half its word pairs or more), else the last one keyed."""
        ws = words(text)
        first = {}
        for i, bg in enumerate(zip(ws, ws[1:])):
            first.setdefault(bg, i)
        top = None
        for i in range(max(0, self.pos - 1), len(self.verses)):
            v, bg = self.verses[i]
            hit = [first[x] for x in bg if x in first]
            if len(bg) >= 2 and len(hit) >= 2 and len(hit) >= 0.5 * len(bg):
                where = sorted(hit)[len(hit) // 2]  # median, so one stray pair does not count
                if top is None or where < top[0]:
                    top = (where, i)
        if top:
            self.pos = top[1]
        return "PSA.%d.%d" % (self.n, self.verses[self.pos][0])


def psalm_sections(path, vul, letters_from=None):
    """Psalm commentary divided into <div subtype="book" n="psalm number or letter"> of sections."""
    notes = {}
    for n, book in divs(read(path), "book"):
        n = FIXES.get(n, n)
        if n in LETTERS:
            k = LETTERS.index(n)
            ps = Psalm(vul, 118, 8 * k + 1, 8 * k + 8)
        elif letters_from and n.isdigit() and 1 <= int(n) <= 22:
            k = int(n) - 1
            ps = Psalm(vul, 118, 8 * k + 1, 8 * k + 8)
        elif n.isdigit() and 1 <= int(n) <= 150:
            ps = Psalm(vul, int(n))
        else:
            continue  # preface, appendix
        for _, part in divs(book, "chapter"):
            t = text_of(part)
            if len(t) > 20:
                notes.setdefault(ps.key(t), []).append(t)
    return notes


def load_vulgate():
    with open(VULGATE, encoding="utf-8") as f:
        t = f.read()
    return json.loads(t[t.index(".push(") + 6:t.rindex(");")])["books"]


def build(order):
    """Write the Latin packs; return their commentary_packs.json entries."""
    if not os.path.isdir(SRC):
        print("Latin commentary: %s missing, run ./fetch_sources.sh" % SRC)
        return []
    vul = load_vulgate() if os.path.exists(VULGATE) else None
    if vul is None:
        print("    no Vulgate pack at %s: Psalm commentaries left out" % VULGATE)
    meta = dict(lang="la", source=CSEL,
                translator="Latin original, from the Open Greek and Latin CSEL (csel-dev), " + LICENSE,
                header="(Latin). " + LICENSE + ", Open Greek and Latin CSEL. "
                       "Generated by tools/texts/build_commentary_lat.py.")
    entries = []

    notes = {}
    for k, v in ambrose_luke().items():
        notes.setdefault(k, []).extend(n + "\n— " + AMBROSE["luke"][1] for n in v)
    if vul:
        for work, letters in (("psalms", False), ("ps118", True)):
            path = source(AMBROSE[work][0])
            if os.path.exists(path):
                for k, v in psalm_sections(path, vul, letters).items():
                    notes.setdefault(k, []).extend(n + "\n— " + AMBROSE[work][1] for n in v)
    if notes:
        entries += write("ambrose-lat", "Sanctus Ambrosius (St Ambrose of Milan)",
                         "Expositio evangelii secundum Lucan; Explanatio psalmorum XII; Expositio psalmi CXVIII",
                         "west", "vul", notes, order, **meta)

    path = source(HILARY[0])
    if vul and os.path.exists(path):
        notes = {k: [n + "\n— " + HILARY[1] for n in v] for k, v in psalm_sections(path, vul).items()}
        if notes:
            entries += write("hilary-lat", "Sanctus Hilarius Pictaviensis (St Hilary of Poitiers)",
                             "Tractatus super psalmos", "west", "vul", notes, order, **meta)
    return entries


if __name__ == "__main__":
    from common import book_ids
    build({b: i for i, b in enumerate(book_ids())})
