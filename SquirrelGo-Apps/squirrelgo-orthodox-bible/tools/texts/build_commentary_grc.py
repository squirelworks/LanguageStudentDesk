#!/usr/bin/env python3
"""Greek originals of patristic commentary, from First1KGreek (Open Greek and
Latin, CC BY-SA 4.0), as downloadable packs keyed to the same verses as the
translations, so a reader can see the Greek next to the English or Russian.

    - the Greek catenae on the New Testament in J. A. Cramer's edition
      (Catenae Graecorum Patrum in Novum Testamentum, Oxford 1838-44),
      tlg4102 in First1KGreek, split into packs of whole books;
    - St Cyril of Alexandria on the Twelve Prophets (Pusey's edition, 1868),
      tlg4090.tlg001.

Neither edition numbers verses. Each prints the passage being explained as a
short paragraph (the lemma), so the verse is found by matching its words
against the Greek Bible already in the app (Robinson-Pierpont for the New
Testament, Brenton's Septuagint for the prophets), moving forward through the
book. A comment that quotes a verse a little further on starts a note on that
verse; any other paragraph belongs to the last verse found. Catena fragments
by writers the Church does not receive (see EXCLUDED) are left out.

build_commentary.py calls build() and lists the result in commentary_packs.json.
"""
import json
import os
import re
import unicodedata

from common import CACHE, DATA, PACKS_DIR, write_js

SRC = os.path.join(CACHE, "first1kgreek", "data")
LICENSE = "CC BY-SA 4.0"
F1K = "https://github.com/OpenGreekAndLatin/First1KGreek"
MAX_BYTES = 4_000_000

# Cramer's catenae: First1KGreek work -> book (tlg011 is a second catena on Romans 7-16,
# tlgX02 and tlgX03 two on the Apocalypse)
CATENAE = [
    ("tlg001", "MAT"), ("tlg002", "MRK"), ("tlg004", "LUK"), ("tlg005", "JHN"), ("tlg008", "ACT"),
    ("tlg010", "ROM"), ("tlg011", "ROM"), ("tlg012", "1CO"), ("tlg013", "2CO"), ("tlg019", "GAL"),
    ("tlg020", "EPH"), ("tlg021", "PHP"), ("tlg022", "COL"), ("tlg023", "1TH"), ("tlg024", "2TH"),
    ("tlg034", "1TI"), ("tlg035", "2TI"), ("tlg036", "TIT"), ("tlg037", "PHM"), ("tlg038", "HEB"),
    ("tlg040", "JAS"), ("tlg041", "1PE"), ("tlg042", "2PE"), ("tlg043", "1JN"), ("tlg044", "2JN"),
    ("tlg045", "3JN"), ("tlg046", "JUD"), ("tlgX02", "REV"), ("tlgX03", "REV"),
]
CYRIL_BOOKS = {
    "hosea": "HOS", "joel": "JOL", "amos": "AMO", "obadiah": "OBA", "jonah": "JON", "micah": "MIC",
    "nahum": "NAM", "habakkuk": "HAB", "zephaniah": "ZEP", "haggai": "HAG", "zechariah": "ZEC", "malachi": "MAL",
}
# Catena fragments by one of these writers are left out: Apollinaris, Theodore (of
# Mopsuestia or Heraclea), Didymus, Origen, Eusebius, Severus. A fragment is theirs
# when it opens on the name ("Σευήρου Ἀντιοχείας ἐκ...", "Θεόδωρος δέ φησι") or the
# name heads it after the lemma or another name ("...; Ὠριγένους.").
NAME = (r"(?:απολιν\w*|θεο[δσ]ω?ρ(?:οσ|ου)|διδυμ\w*|ωριγεν\w*"
        r"|ευσεβ(?:ιου|ιοσ|iου|iοσ|τοσ)|σευηρ(?:οσ|ου))\b")
EXCLUDED = re.compile(r"^\W*(?:του\W+(?:αγιου\W+)?)?" + NAME + r"|(?<!κατα )\b" + NAME + r"(?:\W+\w+){0,2}?\s*\.")


def plain(s):
    s = unicodedata.normalize("NFD", s.lower())
    return "".join(c for c in s if not unicodedata.combining(c)).replace("ς", "σ")


def words(s):
    return re.findall(r"[α-ω]+", plain(s))


STOP = set("""και ο η το του τησ των τω τη τοισ ταισ τον την τα οι αι τουσ τασ δε γαρ εν εισ εκ εξ επι προσ
    απο δια κατα μετα περι υπο υπερ παρα ουκ ου ουχ μη οτι ινα ωσ αυτου αυτοσ αυτω αυτον αυτων αυτοισ αυτη
    αυτησ αυτην αυτο αυτοι αυτουσ εστιν εστι ην μου σου μοι σοι ημων υμων ημιν υμιν με σε τισ τι ει αν εαν
    ουν μεν τε ουτοσ ουτω ουτωσ ταυτα τουτο τουτου""".split())


def content(ws):
    """The words that tell one verse from another."""
    return [w for w in ws if w not in STOP]


def text_of(p):
    p = re.sub(r"<note\b.*?</note>", "", p, flags=re.S)
    p = re.sub(r"<[^>]+>", " ", p)
    p = re.sub(r"-\s*\n\s*", "", p)  # words hyphenated across printed lines
    return re.sub(r"\s+", " ", p).strip()


def load_bible(bid):
    with open(os.path.join(DATA, "bibles", bid + ".js"), encoding="utf-8") as f:
        t = f.read()
    return json.loads(t[t.index(".push(") + 6:t.rindex(");")])["books"]


class Matcher:
    """Finds the verse a lemma or quotation comes from, moving forward through a book."""

    def __init__(self, chapters):
        self.verses = [((c + 1, v + 1), set(content(words(t or "")))) for c, ch in enumerate(chapters)
                       for v, t in enumerate(ch) if t]
        self.pos = 0

    def best(self, ws, lo, hi, span=4):
        """(share of the words found in span verses from one verse on, that verse)"""
        s = set(content(ws))
        top = (0, None)
        if not s:
            return top
        rank = (0, 0)
        for i in range(max(0, lo), min(hi, len(self.verses))):
            own = len(s & self.verses[i][1])
            if not own:
                continue
            seen = set()
            for v in self.verses[i:i + span]:
                seen |= v[1]
            score = len(s & seen) / len(s)
            # the passage starts in the verse that holds most of it
            if (round(score, 1), own) > rank:
                rank, top = (round(score, 1), own), (score, i)
        return top

    def lemma(self, ws):
        """A short paragraph that is the passage itself: close ahead of where we are, or anywhere if exact."""
        if not 3 <= len(ws) <= 70:
            return None
        score, i = self.best(ws, self.pos - 3, self.pos + 40)
        if score < 0.6:
            score, i = self.best(ws, 0, len(self.verses))
            if score < 0.85:
                return None
        self.pos = i
        return self.verses[i][0]

    def quote(self, ws):
        """A quotation inside a comment: only a little ahead of where we are, and closely."""
        n = len(set(content(ws)))
        if n < 3:
            return None
        score, i = self.best(ws, self.pos, self.pos + (60 if n >= 4 else 30), span=1)
        if score >= (0.85 if n >= 4 else 1):
            self.pos = i
            return self.verses[i][0]
        return None


def key_paragraphs(paras, book, chapters, catena):
    """[paragraph] in order -> {key: [note]}"""
    m = Matcher(chapters)
    notes, key, buf = {}, None, []
    excluded = False

    def flush():
        if key and buf:
            notes.setdefault(key, []).append("\n\n".join(buf))

    for p in paras:
        t = text_of(p)
        ws = words(t)
        if len(ws) < 2:
            continue
        found = m.lemma(ws)
        lemma = found is not None
        if found is None:
            # A comment that quotes a verse a little further on is about that verse.
            for q in re.findall(r"“([^”;?·]{8,150})", t)[:3]:
                found = m.quote(words(q)[:15])
                if found:
                    break
        if found:
            flush()
            key, buf = "%s.%d.%d" % (book, found[0], found[1]), []
            if lemma:
                continue  # the lemma itself: the Bible text is already on screen
        if catena:
            head = plain(t[:120])
            if EXCLUDED.search(head):
                excluded = True
                continue
            if re.match(r"\W*του αυτου", head):
                if excluded:
                    continue
            else:
                excluded = False
        if key:
            buf.append(t)
    flush()
    return notes


def read(path):
    with open(path, encoding="utf-8") as f:
        t = f.read()
    return t[t.find("<body"):]


def catenae(nt):
    out = {}
    for work, book in CATENAE:
        path = os.path.join(SRC, "tlg4102", work, "tlg4102.%s.1st1K-grc1.xml" % work)
        if not os.path.exists(path) or book not in nt:
            print("    missing", path)
            continue
        got = key_paragraphs(re.findall(r"<p\b[^>]*>(.*?)</p>", read(path), re.S), book, nt[book], True)
        for k, v in got.items():
            out.setdefault(k, []).extend(n + "\n— Catena (Cramer, 1838-44)" for n in v)
    return out


def cyril(lxx):
    path = os.path.join(SRC, "tlg4090", "tlg001", "tlg4090.tlg001.1st1K-grc1.xml")
    if not os.path.exists(path):
        print("    missing", path)
        return {}
    t = read(path)
    out = {}
    starts = [(m.start(), m[1]) for m in re.finditer(r'<div type="textpart" subtype="commentary" n="([^"]+)"', t)]
    for (a, name), (b, _) in zip(starts, starts[1:] + [(len(t), "")]):
        book = CYRIL_BOOKS.get(name)
        if not book or book not in lxx:
            continue
        got = key_paragraphs(re.findall(r"<p\b[^>]*>(.*?)</p>", t[a:b], re.S), book, lxx[book], False)
        for k, v in got.items():
            out[k] = [n + "\n— Ὑπόμνημα εἰς τοὺς δώδεκα προφήτας (ed. Pusey, 1868)" for n in v]
    return out


def write(cid, author, work, tradition, versification, notes, order, lang="grc", source=F1K,
          translator="Greek original, from First1KGreek (Open Greek and Latin), " + LICENSE,
          header="(Greek). " + LICENSE + ", First1KGreek. Generated by tools/texts/build_commentary_grc.py."):
    """Write notes as one pack, or several of whole books each under MAX_BYTES; return the entries."""
    def sort_key(k):
        b, c, v = k.split(".")
        return (order[b], int(c), int(v))

    by_book = {}
    for k in notes:
        by_book.setdefault(k.split(".")[0], []).append(k)
    parts, cur, size = [], [], 0
    for b in sorted(by_book, key=order.get):
        n = sum(len(json.dumps(notes[k], ensure_ascii=False).encode()) for k in by_book[b])
        if cur and size + n > MAX_BYTES:
            parts.append(cur)
            cur, size = [], 0
        cur.append(b)
        size += n
    parts.append(cur)
    entries = []
    for bks in parts:
        pid = cid if len(parts) == 1 else "%s-%s" % (cid, (bks[0] + "-" + bks[-1] if len(bks) > 1 else bks[0]).lower())
        keys = sorted((k for b in bks for k in by_book[b]), key=sort_key)
        obj = {
            "id": pid, "author": author, "work": work,
            "translator": translator,
            "lang": lang, "license": LICENSE, "source": source,
            "versification": versification, "tradition": tradition,
            "notes": {k: notes[k] for k in keys},
        }
        path = os.path.join(PACKS_DIR, "commentary", pid + ".js")
        size = write_js(path, [author + ": downloadable commentary pack " + header], "SGO_COMMENTARY", obj)
        print("%-34s %5d notes on %4d passages, %2d books, %5.2f MB  (pack)" % (
            pid, sum(len(notes[k]) for k in keys), len(keys), len(bks), size / 1e6))
        entries.append({"id": pid, "author": author, "work": work, "lang": lang, "license": LICENSE,
                        "source": source, "books": bks, "tradition": tradition, "size": size, "pack": True})
    return entries


def build(order):
    """Write the Greek packs; return their commentary_packs.json entries."""
    if not os.path.isdir(SRC):
        print("Greek commentary: %s missing, run ./fetch_sources.sh" % SRC)
        return []
    entries = []
    notes = catenae(load_bible("grc-byz"))
    if notes:
        entries += write("catena-grc", "Catena of the Greek Fathers (Ἁλυσίς)",
                         "Catenae on the New Testament, ed. J. A. Cramer", "east", "kjv", notes, order)
    notes = cyril(load_bible("grc-brenton"))
    if notes:
        entries += write("cyril-alexandria-grc", "Ἅγιος Κύριλλος Ἀλεξανδρείας (St Cyril of Alexandria)",
                         "Ὑπόμνημα εἰς τοὺς δώδεκα προφήτας", "east", "lxx", notes, order)
    return entries


if __name__ == "__main__":
    from common import book_ids
    build({b: i for i, b in enumerate(book_ids())})
