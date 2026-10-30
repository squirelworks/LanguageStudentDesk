#!/usr/bin/env python3
"""Build www/data/commentary/<father>.js from the Historical Christian Faith
Commentaries Database (github.com/HistoricalChristianFaith/Commentaries-Database).

That database mixes public-domain translations (ANF/NPNF, Newman's Catena
Aurea, Pusey's Cyril, ...) with short fair-use excerpts of modern copyrighted
translations. Only the first kind is taken, by allowing specific works rather
than whole authors, and only Fathers the Orthodox Church receives as saints
or as sound teachers (no Origen, Tertullian, Theodore of Mopsuestia, etc.).
"""
import json
import os
import re
import sys
import tomllib
import urllib.parse

from common import CACHE, DATA, NAME_TO_USFM, book_ids, write_js

SRC = os.path.join(CACHE, "commentaries")

# author folder -> (commentary id, display name, tradition)
FATHERS = {
    "John Chrysostom": ("chrysostom", "St John Chrysostom", "east"),
    "Cyril of Alexandria": ("cyril-alexandria", "St Cyril of Alexandria", "east"),
    "Athanasius of Alexandria": ("athanasius", "St Athanasius the Great", "east"),
    "Basil of Caesarea": ("basil", "St Basil the Great", "east"),
    "Gregory of Nyssa": ("gregory-nyssa", "St Gregory of Nyssa", "east"),
    "Gregory of Nazianzus": ("gregory-theologian", "St Gregory the Theologian", "east"),
    "Cyril of Jerusalem": ("cyril-jerusalem", "St Cyril of Jerusalem", "east"),
    "John Damascene": ("john-damascene", "St John of Damascus", "east"),
    "Ephrem the Syrian": ("ephrem", "St Ephrem the Syrian", "east"),
    "Theophylact of Ohrid": ("theophylact", "Blessed Theophylact of Ohrid", "east"),
    "Isidore of Pelusium": ("isidore-pelusium", "St Isidore of Pelusium", "east"),
    "Maximus the Confessor": ("maximus-confessor", "St Maximus the Confessor", "east"),
    "Gregory of Neocaesarea": ("gregory-wonderworker", "St Gregory the Wonderworker", "east"),
    "Dionysius of Alexandria": ("dionysius-alexandria", "St Dionysius of Alexandria", "east"),
    "Alexander of Alexandria": ("alexander-alexandria", "St Alexander of Alexandria", "east"),
    "Peter of Alexandria": ("peter-alexandria", "St Peter of Alexandria", "east"),
    "Methodius of Olympus": ("methodius", "St Methodius of Olympus", "east"),
    "Theonas of Alexandria": ("theonas", "St Theonas of Alexandria", "east"),
    "Irenaeus": ("irenaeus", "St Irenaeus of Lyons", "early"),
    "Justin Martyr": ("justin", "St Justin Martyr", "early"),
    "Ignatius of Antioch": ("ignatius", "St Ignatius of Antioch", "early"),
    "Clement of Rome": ("clement-rome", "St Clement of Rome", "early"),
    "Polycarp of Smyrna": ("polycarp", "St Polycarp of Smyrna", "early"),
    "Clement of Alexandria": ("clement-alexandria", "Clement of Alexandria", "early"),
    "Hippolytus of Rome": ("hippolytus", "St Hippolytus of Rome", "early"),
    "Theophilus of Antioch": ("theophilus-antioch", "St Theophilus of Antioch", "early"),
    "Julius Africanus": ("julius-africanus", "Julius Africanus", "early"),
    "Victorinus of Pettau": ("victorinus", "St Victorinus of Pettau", "early"),
    "Cyprian": ("cyprian", "St Cyprian of Carthage", "early"),
    "Didache": ("didache", "The Didache", "early"),
    "Ambrose of Milan": ("ambrose", "St Ambrose of Milan", "west"),
    "Augustine of Hippo": ("augustine", "Blessed Augustine of Hippo", "west"),
    "Jerome": ("jerome", "St Jerome", "west"),
    "Hilary of Poitiers": ("hilary", "St Hilary of Poitiers", "west"),
    "Leo the Great": ("leo", "St Leo the Great", "west"),
    "Gregory the Dialogist": ("gregory-dialogist", "St Gregory the Dialogist", "west"),
    "Maximus of Turin": ("maximus-turin", "St Maximus of Turin", "west"),
    "Peter Chrysologus": ("peter-chrysologus", "St Peter Chrysologus", "west"),
    "Bede": ("bede", "St Bede the Venerable", "west"),
}

# Work folders on historicalchristian.faith whose English text is a public-domain
# translation (ANF, NPNF, Library of the Fathers, or another pre-1929 edition).
# A trailing "/" matches the folder and everything under it; otherwise the
# folder must match exactly.
PD_WORKS = [
    "Thomas Aquinas/Catena Aurea/",  # J. H. Newman's edition, 1841-45
    "John Chrysostom/Homilies/On Matthew", "John Chrysostom/Homilies/On John",
    "John Chrysostom/Homilies/On the Acts of the Apostles", "John Chrysostom/Homilies/On Romans",
    "John Chrysostom/Homilies/On 1 Corinthians", "John Chrysostom/Homilies/On 2 Corinthians",
    "John Chrysostom/Homilies/On Ephesians", "John Chrysostom/Homilies/On Philippians",
    "John Chrysostom/Homilies/On Colossians", "John Chrysostom/Homilies/On 1 Thessalonians",
    "John Chrysostom/Homilies/On 2 Thessalonians", "John Chrysostom/Homilies/On 1 Timothy",
    "John Chrysostom/Homilies/On 2 Timothy", "John Chrysostom/Homilies/On Titus",
    "John Chrysostom/Homilies/On Philemon", "John Chrysostom/Homilies/On Hebrews",
    "John Chrysostom/Homilies/Concerning the Statues", "John Chrysostom/Homilies",
    "John Chrysostom/TREATISE ON THE PRIESTHOOD",
    "John Chrysostom/An Exhortation to Theodore After His Fall",
    "Cyril of Alexandria/Commentary on the Gospel of John",  # Pusey & Randell, 1874-85
    "Cyril of Alexandria/Commentary on the Gospel of Luke",  # R. Payne Smith, 1859
    "Athanasius of Alexandria", "Athanasius of Alexandria/Four Discourses Against the Arians",
    "Athanasius of Alexandria/History of the Arians", "Athanasius of Alexandria/Letters of Athanasius",
    "Basil of Caesarea", "Basil of Caesarea/The Hexaemeron", "Basil of Caesarea/Letters",
    "Gregory of Nyssa/", "Gregory of Nazianzus/Orations", "Cyril of Jerusalem/",
    "John Damascene/An Exact Exposition of the Orthodox Faith", "Ephrem the Syrian",
    "Irenaeus/", "Justin Martyr/", "Ignatius of Antioch", "Clement of Rome/",
    "Polycarp of Smyrna/", "Clement of Alexandria/", "Hippolytus of Rome/",
    "Methodius of Olympus/", "Gregory of Neocaesarea/", "Dionysius of Alexandria/",
    "Alexander of Alexandria/", "Peter of Alexandria/", "Theonas of Alexandria/",
    "Theophilus of Antioch/", "Julius Africanus/", "Victorinus of Pettau/", "Cyprian",
    "Cyprian/Letters", "Didache/",
    "Ambrose of Milan/Letters", "Ambrose of Milan/On the Holy Spirit",
    "Ambrose of Milan/Exposition of the Christian Faith", "Ambrose of Milan/ON THE DUTIES OF THE CLERGY",
    "Ambrose of Milan/On the Decease of His Brother Saytrus", "Ambrose of Milan/Concerning Repentance",
    "Ambrose of Milan/Concerning Virgins",
    "Augustine of Hippo/TRACTATES ON JOHN", "Augustine of Hippo/ON THE PSALMS",
    "Augustine of Hippo/Ten Homilies on the First Epistle of John",
    "Augustine of Hippo/OUR LORD'S SERMON ON THE MOUNT", "Augustine of Hippo/The City of God",
    "Augustine of Hippo/Confessions", "Augustine of Hippo/On The Trinity",
    "Augustine of Hippo/Sermons on Selected Lessons of the New Testament",
    "Augustine of Hippo/Reply to Faustus the Manichaean",
    "Augustine of Hippo/A Treatise Against Two Letters of the Pelagians",
    "Jerome/Letters", "Hilary of Poitiers/On the Trinity", "Hilary of Poitiers/Homilies on the Psalms",
    "Leo the Great/Sermons", "Gregory the Dialogist/Morals on the Book of Job/",
    "Gregory the Dialogist/THE BOOK OF PASTORAL RULE", "Gregory the Dialogist/Register of Epistles",
    "Gregory the Dialogist/Dialogues",
]
# Sites that host only public-domain translations of the Fathers.
PD_SITES = ("www.newadvent.org/fathers/", "newadvent.org/fathers/", "www.ccel.org/", "ccel.org/",
            "www.tertullian.org/fathers", "tertullian.org/fathers")
# Modern translations that sit inside otherwise public-domain folders.
EXCLUDE_TITLES = re.compile(r"Commentary on Daniel|Pseudo-", re.I)
# Works a Father appears in only through quotations in the Catena Aurea.
CATENA_ONLY = {"Theophylact of Ohrid", "Isidore of Pelusium", "Maximus the Confessor", "Bede",
               "Maximus of Turin", "Peter Chrysologus"}

REF_RE = re.compile(r"^(.+?) (\d+)_(\d+)(?:-(?:(\d+)_)?(\d+))?\.toml$")


def work_of(url):
    u = urllib.parse.unquote(urllib.parse.unquote(url or ""))
    if "by_father.php?file=" in u:
        return "hcf", u.split("file=", 1)[1].rsplit("/", 1)[0]
    return "web", re.sub(r"^https?://", "", u)


def allowed(father, url, title):
    kind, where = work_of(url)
    if EXCLUDE_TITLES.search(title or ""):
        return False
    if kind == "hcf":
        if father in CATENA_ONLY and not where.startswith("Thomas Aquinas/Catena Aurea/"):
            return False
        return any(where == w.rstrip("/") or (w.endswith("/") and where.startswith(w))
                   for w in PD_WORKS)
    return father not in CATENA_ONLY and where.startswith(PD_SITES)


def ref_key(fname, known):
    m = REF_RE.match(fname)
    if not m:
        return None
    book = NAME_TO_USFM.get(m[1])
    if book is None or book not in known:
        return None
    c, v = int(m[2]), int(m[3])
    if m[5] and not m[4]:
        return "%s.%d.%d-%s" % (book, c, v, m[5])
    return "%s.%d.%d" % (book, c, v)  # single verse, or a passage running into the next chapter


def clean(text):
    text = text.replace("\r", "")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n\s*\n+", "\n\n", text)
    return text.strip()


def main():
    known = set(book_ids())
    unknown_books = {}
    out = {}
    for father, (cid, display, tradition) in FATHERS.items():
        folder = os.path.join(SRC, father)
        if not os.path.isdir(folder):
            print("missing folder", father)
            continue
        notes, works, kept, dropped = {}, {}, 0, 0
        for fname in sorted(os.listdir(folder)):
            if not fname.endswith(".toml") or fname == "metadata.toml":
                continue
            key = ref_key(fname, known)
            if key is None:
                unknown_books[fname.split(" ")[0]] = unknown_books.get(fname.split(" ")[0], 0) + 1
                continue
            try:
                with open(os.path.join(folder, fname), "rb") as f:
                    entries = tomllib.load(f).get("commentary", [])
            except tomllib.TOMLDecodeError:
                continue
            for e in entries:
                title = (e.get("source_title") or "").strip().strip("'")
                if not allowed(father, e.get("source_url"), title) or not e.get("quote", "").strip():
                    dropped += 1
                    continue
                kept += 1
                notes.setdefault(key, []).append(clean(e["quote"]) + "\n— " + title)
                kind, where = work_of(e.get("source_url"))
                w = "Catena Aurea" if "Catena Aurea" in where else re.sub(r"[ ,]+\d.*$", "", title)
                works[w] = works.get(w, 0) + 1
        if not notes:
            print("%-26s nothing public-domain" % father)
            continue
        out[cid] = (father, display, tradition, notes, works, kept, dropped)
    return out, unknown_books


MAX_BYTES = 4_000_000  # keep each file quick to load in the Android WebView


def split_by_books(notes, order):
    """Split one Father's notes into book ranges of at most MAX_BYTES each."""
    by_book = {}
    for k, v in notes.items():
        by_book.setdefault(k.split(".")[0], {})[k] = v
    parts, cur, size = [], {}, 0
    for b in sorted(by_book, key=lambda b: order[b]):
        n = len(json.dumps(by_book[b], ensure_ascii=False).encode())
        if cur and size + n > MAX_BYTES:
            parts.append(cur)
            cur, size = {}, 0
        cur[b] = by_book[b]
        size += n
    parts.append(cur)
    return parts


def write(out):
    entries = []
    order = {b: i for i, b in enumerate(book_ids())}

    def sort_key(k):
        b, c, v = k.split(".")
        return (order[b], int(c), int(v.split("-")[0]))

    for cid, (father, display, tradition, notes, works, kept, dropped) in out.items():
        top = [w for w, _ in sorted(works.items(), key=lambda x: -x[1])]
        work = "; ".join(top[:4]) + ("; and other works" if len(top) > 4 else "")
        parts = split_by_books(notes, order)
        for part in parts:
            books = list(part)
            span = books[0] if len(books) == 1 else books[0] + "-" + books[-1]
            pid = cid if len(parts) == 1 else "%s-%s" % (cid, span.lower())
            pnotes = {k: v for b in books for k, v in part[b].items()}
            obj = {
                "id": pid, "author": display, "work": work,
                "translator": "Public-domain English translations (Ante-Nicene and Nicene & Post-Nicene "
                              "Fathers, Library of the Fathers, Newman's Catena Aurea and others)",
                "lang": "en", "license": "Public Domain",
                "source": "https://github.com/HistoricalChristianFaith/Commentaries-Database (%s/)" % father,
                "versification": "kjv", "tradition": tradition,
                "notes": {k: pnotes[k] for k in sorted(pnotes, key=sort_key)},
            }
            header = [display + ": commentary keyed to verses. Public Domain.",
                      "Source: " + obj["source"],
                      "Generated by tools/texts/build_commentary.py; do not edit by hand."]
            size = write_js(os.path.join(DATA, "commentary", pid + ".js"), header, "SGO_COMMENTARY", obj)
            n = sum(len(v) for v in pnotes.values())
            print("%-30s %5d notes on %4d passages, %2d books, %5.2f MB" % (
                pid, n, len(pnotes), len(books), size / 1e6))
            entries.append({"id": pid, "author": display, "work": work, "lang": "en",
                            "license": "Public Domain", "source": obj["source"], "books": books,
                            "tradition": tradition})
        print("    %s: kept %d, left out %d not public domain" % (father, kept, dropped))
    return entries


if __name__ == "__main__":
    out, unknown = main()
    if unknown:
        print("book names not mapped:", sorted(unknown.items(), key=lambda x: -x[1])[:20])
    write(out)
