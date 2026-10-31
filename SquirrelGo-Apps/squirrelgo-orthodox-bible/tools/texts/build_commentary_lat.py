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
# Commentaries on a run of verses: (CSEL path, footer, unit, {book div n or None: (book, start, end, ahead)})
END = (999, 999)
# The treatises on Genesis (Exameron, De paradiso, De Noe...) and Augustine's Genesis and Heptateuch works
# were tried and left out: they quote the Old Latin, not the Vulgate, so their notes piled up on a few verses.
AMBROSE_RANGES = [
    ("stoa0022/stoa015", "Apologia prophetae David (CSEL 32.2, ed. Schenkl, 1897)", "section",
     {None: ("PSA", (50, 1), (50, 21), None)}),
]
JEROME_RANGES = [
    ("stoa0162/stoa024", "In Hieremiam prophetam libri sex (CSEL 59, ed. Reiter, 1913)", "section",
     {str(n): ("JER", (1, 1), END, 80) for n in range(1, 7)}),
]
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


class Passage:
    """Keys the sections of a commentary on a run of verses (book, from (c, v), to (c, v)) to
    the verses they quote, moving forward through it; ahead limits how far a section may jump."""

    def __init__(self, vul, book, start=(1, 1), end=None, ahead=None):
        chapters = vul.get(book) or []
        end = end or (len(chapters), len(chapters[-1]) if chapters else 0)
        self.book = book
        self.verses = [((c, v), bigrams(words(chapters[c - 1][v - 1] or "")))
                       for c in range(start[0], min(end[0], len(chapters)) + 1)
                       for v in range(1, len(chapters[c - 1]) + 1)
                       if start <= (c, v) <= end]
        self.ahead = ahead
        self.pos = 0

    def key(self, text):
        """The verse quoted first in the section (half its word pairs or more), else the last one keyed."""
        ws = words(text)
        first = {}
        for i, bg in enumerate(zip(ws, ws[1:])):
            first.setdefault(bg, i)
        top = None
        hi = len(self.verses) if self.ahead is None else min(len(self.verses), self.pos + self.ahead)
        for i in range(max(0, self.pos - 1), hi):
            v, bg = self.verses[i]
            hit = [first[x] for x in bg if x in first]
            if len(bg) >= 2 and len(hit) >= 2 and len(hit) >= 0.5 * len(bg):
                where = sorted(hit)[len(hit) // 2]  # median, so one stray pair does not count
                if top is None or where < top[0]:
                    top = (where, i)
        if top:
            self.pos = top[1]
        c, v = self.verses[self.pos][0]
        return "%s.%d.%d" % (self.book, c, v)


def Psalm(vul, n, lo=1, hi=None):
    return Passage(vul, "PSA", (n, lo), (n, hi or 999))


def ranged(path, vul, parts, unit):
    """A commentary whose <div subtype="book" n=...> parts each cover one passage:
    parts maps n (or None for the whole work) to (book, start, end, ahead)."""
    t = read(path)
    books = divs(t, "book") if None not in parts else [(None, t)]
    notes, passages = {}, {}
    for n, part in books:
        if n not in parts:
            continue
        if parts[n] not in passages:  # parts on the same passage carry on where the last one stopped
            passages[parts[n]] = Passage(vul, *parts[n])
        ps = passages[parts[n]]
        for _, sec in divs(part, unit):
            text = text_of(sec)
            if len(text) > 20:
                notes.setdefault(ps.key(text), []).append(text)
    return notes


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
    if vul:
        for k, v in from_ranges(AMBROSE_RANGES, vul).items():
            notes.setdefault(k, []).extend(v)
    if notes:
        entries += write("ambrose-lat", "Sanctus Ambrosius (St Ambrose of Milan)",
                         "Expositio evangelii secundum Lucan; Explanatio psalmorum XII; Expositio psalmi CXVIII; "
                         "Apologia prophetae David",
                         "west", "vul", notes, order, **meta)

    path = source(HILARY[0])
    if vul and os.path.exists(path):
        notes = {k: [n + "\n— " + HILARY[1] for n in v] for k, v in psalm_sections(path, vul).items()}
        if notes:
            entries += write("hilary-lat", "Sanctus Hilarius Pictaviensis (St Hilary of Poitiers)",
                             "Tractatus super psalmos", "west", "vul", notes, order, **meta)

    notes = from_ranges(JEROME_RANGES, vul) if vul else {}
    if notes:
        entries += write("jerome-lat", "Sanctus Hieronymus (St Jerome)", "In Hieremiam prophetam libri sex",
                         "west", "vul", notes, order, **meta)
    return entries


def from_ranges(works, vul):
    """{key: [note]} for a list of AMBROSE_RANGES-style works, each note ending with its footer."""
    notes = {}
    for rel, footer, unit, parts in works:
        path = source(rel)
        if not os.path.exists(path):
            print("    missing", path)
            continue
        for k, v in ranged(path, vul, parts, unit).items():
            notes.setdefault(k, []).extend(n + "\n— " + footer for n in v)
    return notes


if __name__ == "__main__":
    from common import book_ids
    build({b: i for i, b in enumerate(book_ids())})
