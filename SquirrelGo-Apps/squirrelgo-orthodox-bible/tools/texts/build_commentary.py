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

import build_commentary_grc
import build_commentary_ru
from common import CACHE, COMMENTARY_PACKS_JSON, DATA, NAME_TO_USFM, PACKS_DIR, book_ids, write_js

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
    "Shepherd of Hermas": ("hermas", "The Shepherd of Hermas", "early"),
    "Epistle of Barnabas": ("barnabas", "The Epistle of Barnabas", "early"),
    "Ambrose of Milan": ("ambrose", "St Ambrose of Milan", "west"),
    "Augustine of Hippo": ("augustine", "Blessed Augustine of Hippo", "west"),
    "Jerome": ("jerome", "St Jerome", "west"),
    "Hilary of Poitiers": ("hilary", "St Hilary of Poitiers", "west"),
    "Leo the Great": ("leo", "St Leo the Great", "west"),
    "Gregory the Dialogist": ("gregory-dialogist", "St Gregory the Dialogist", "west"),
    "Maximus of Turin": ("maximus-turin", "St Maximus of Turin", "west"),
    "Peter Chrysologus": ("peter-chrysologus", "St Peter Chrysologus", "west"),
    "Bede": ("bede", "St Bede the Venerable", "west"),
    "John Cassian": ("john-cassian", "St John Cassian", "west"),
    "Pacian of Barcelona": ("pacian", "St Pacian of Barcelona", "west"),
    "Gregory of Elvira": ("gregory-elvira", "St Gregory of Elvira", "west"),
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

# The Historical Christian Faith Writings Database, where every
# historicalchristian.faith link points, is itself dedicated to the public
# domain: besides the ANF/NPNF texts it holds the maintainer's own new
# translations of the Greek and Latin (Migne) and of the 19th-century Russian
# (Theophylact). Those go into downloadable "more" packs, apart from the works
# below, which are modern translations still in copyright.
COPYRIGHTED_FILES = (
    "Theophylact of Ohrid/Commentary on Matthew.html",  # Chrysostom Press, 1992
    "Jerome/Commentary on Ecclesiastes.html",  # Robin McGregor's translation, no license given
    "Oecumenius/",  # John Litteral's translations, sold in print
    "Berengaudus/",  # also John Litteral
)
# Failed machine translations that slipped into the database.
JUNK = re.compile(r"I cannot provide|As an AI\b|locked for copyright|Please provide the (text|excerpt)")
# Fathers whose own works (beyond the Catena Aurea) come only through such packs.
MORE_ONLY = {"Theophylact of Ohrid", "Bede", "John Cassian", "Shepherd of Hermas",
             "Epistle of Barnabas", "Pacian of Barcelona", "Gregory of Elvira"}

REF_RE = re.compile(r"^(.+?) (\d+)_(\d+)(?:-(?:(\d+)_)?(\d+))?\.toml$")


def work_of(url):
    u = urllib.parse.unquote(urllib.parse.unquote(url or ""))
    if "by_father.php?file=" in u:
        return "hcf", u.split("file=", 1)[1].rsplit("/", 1)[0]
    return "web", re.sub(r"^https?://", "", u)


def hcf_file(url):
    u = urllib.parse.unquote(urllib.parse.unquote(url or ""))
    return u.split("file=", 1)[1] if "by_father.php?file=" in u else ""


def allowed(father, url, title):
    """"core" for the bundled set, "more" for a downloadable pack, or None."""
    kind, where = work_of(url)
    if EXCLUDE_TITLES.search(title or ""):
        return None
    if kind == "hcf":
        if where.startswith("Thomas Aquinas/Catena Aurea/"):
            return "core"
        if father not in CATENA_ONLY and father not in MORE_ONLY and any(
                where == w.rstrip("/") or (w.endswith("/") and where.startswith(w)) for w in PD_WORKS):
            return "core"
        own = where == father or where.startswith(father + "/")
        if own and "Pseudo" not in where and not hcf_file(url).startswith(COPYRIGHTED_FILES):
            return "more"
        return None
    if father not in CATENA_ONLY and father not in MORE_ONLY and where.startswith(PD_SITES):
        return "core"
    return None


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
        notes = {"core": {}, "more": {}}
        works = {"core": {}, "more": {}}
        kept, dropped = 0, 0
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
                tier = allowed(father, e.get("source_url"), title)
                if not tier or not e.get("quote", "").strip() or JUNK.search(e["quote"]):
                    dropped += 1
                    continue
                kept += 1
                notes[tier].setdefault(key, []).append(clean(e["quote"]) + "\n— " + title)
                kind, where = work_of(e.get("source_url"))
                if tier == "more":  # the work's own name, e.g. "Commentary on Isaiah"
                    w = os.path.splitext(hcf_file(e.get("source_url")).split("/")[1])[0]
                else:
                    w = "Catena Aurea" if "Catena Aurea" in where else re.sub(r"[ ,]+\d.*$", "", title)
                works[tier][w] = works[tier].get(w, 0) + 1
        # A handful of extra notes is not worth a separate download.
        if len(json.dumps(notes["more"]).encode()) < 100_000:
            for k, v in notes["more"].items():
                notes["core"].setdefault(k, []).extend(v)
            for w, n in works["more"].items():
                works["core"][w] = works["core"].get(w, 0) + n
            notes["more"], works["more"] = {}, {}
        if not notes["core"] and not notes["more"]:
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


CORE_TRANSLATOR = ("Public-domain English translations (Ante-Nicene and Nicene & Post-Nicene Fathers, "
                   "Library of the Fathers, Newman's Catena Aurea and others)")
MORE_TRANSLATOR = ("New English translations from the Historical Christian Faith Writings Database, made from "
                   "Migne's Greek and Latin text or the 19th-century Russian and dedicated to the public domain, "
                   "many of them machine-assisted; plus public-domain ANF/NPNF texts")


def work_label(works):
    top = [w for w, _ in sorted(works.items(), key=lambda x: -x[1])]
    return "; ".join(top[:4]) + ("; and other works" if len(top) > 4 else "")


def write(out, bundled=True):
    """Write the bundled files to www/data/commentary/ (unless bundled is False)
    and the downloadable "more" packs to PACKS_DIR/commentary/, and list the
    packs in COMMENTARY_PACKS_JSON for build_catalog.py."""
    order = {b: i for i, b in enumerate(book_ids())}
    packs = []

    def sort_key(k):
        b, c, v = k.split(".")
        return (order[b], int(c), int(v.split("-")[0]))

    for cid, (father, display, tradition, notes, works, kept, dropped) in out.items():
        for tier in ("core", "more"):
            if not notes[tier] or (tier == "core" and not bundled):
                continue
            work = work_label(works[tier])
            base = cid if tier == "core" else cid + "-more"
            parts = split_by_books(notes[tier], order)
            for part in parts:
                books = list(part)
                span = books[0] if len(books) == 1 else books[0] + "-" + books[-1]
                pid = base if len(parts) == 1 else "%s-%s" % (base, span.lower())
                pnotes = {k: v for b in books for k, v in part[b].items()}
                obj = {
                    "id": pid, "author": display, "work": work,
                    "translator": CORE_TRANSLATOR if tier == "core" else MORE_TRANSLATOR,
                    "lang": "en", "license": "Public Domain",
                    "source": "https://github.com/HistoricalChristianFaith/Commentaries-Database (%s/)" % father,
                    "versification": "kjv", "tradition": tradition,
                    "notes": {k: pnotes[k] for k in sorted(pnotes, key=sort_key)},
                }
                if tier == "core":
                    header = [display + ": commentary keyed to verses. Public Domain.",
                              "Source: " + obj["source"],
                              "Generated by tools/texts/build_commentary.py; do not edit by hand."]
                    path = os.path.join(DATA, "commentary", pid + ".js")
                else:  # the app JSON-parses packs, so one comment line and nothing else
                    header = [display + ": downloadable commentary pack. Public Domain. "
                              "Generated by tools/texts/build_commentary.py."]
                    path = os.path.join(PACKS_DIR, "commentary", pid + ".js")
                size = write_js(path, header, "SGO_COMMENTARY", obj)
                n = sum(len(v) for v in pnotes.values())
                print("%-34s %5d notes on %4d passages, %2d books, %5.2f MB%s" % (
                    pid, n, len(pnotes), len(books), size / 1e6, "" if tier == "core" else "  (pack)"))
                if tier == "more":
                    packs.append({"id": pid, "author": display, "work": work, "lang": "en",
                                  "license": "Public Domain", "source": obj["source"], "books": books,
                                  "tradition": tradition, "size": size, "pack": True})
        print("    %s: kept %d, left out %d not public domain" % (father, kept, dropped))
    packs += build_commentary_ru.build(order)  # Russian commentaries from azbyka.ru
    packs += build_commentary_grc.build(order)  # Greek originals from First1KGreek
    with open(COMMENTARY_PACKS_JSON, "w", encoding="utf-8") as f:
        json.dump(packs, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print("%d commentary packs, %.1f MB" % (len(packs), sum(p["size"] for p in packs) / 1e6))


if __name__ == "__main__":
    # --packs: only the downloadable packs (the packs workflow); otherwise both.
    out, unknown = main()
    if unknown:
        print("book names not mapped:", sorted(unknown.items(), key=lambda x: -x[1])[:20])
    write(out, bundled="--packs" not in sys.argv)
