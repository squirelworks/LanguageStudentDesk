#!/usr/bin/env python3
"""Convert downloaded Bible sources into www/data/bibles/<id>.js.

Run fetch_sources.sh first. Usage:
    python3 build_bibles.py            # every source that has been fetched
    python3 build_bibles.py grc-byz    # only these ids
"""
import csv
import glob
import json
import os
import re
import sys
import zipfile

from common import CACHE, DATA, NAME_TO_USFM, book_ids, testaments, to_arrays, write_js
from sources import BIBLES

KNOWN = set(book_ids())

# --- scrollmapper/bible_databases JSON -------------------------------------


def load_scrollmapper(src):
    path = os.path.join(CACHE, "scrollmapper", src["file"] + ".json")
    if not os.path.exists(path):
        return None
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    out = {}
    for book in data["books"]:
        bid = NAME_TO_USFM.get(book["name"])
        if bid is None:
            print("  skip book", book["name"])
            continue
        chapters = {}
        for ch in book["chapters"]:
            vs = {v["verse"]: clean(v["text"]) for v in ch["verses"] if clean(v["text"])}
            if vs:
                chapters[ch["chapter"]] = vs
        if chapters:
            out[bid] = chapters
    return out


# --- byztxt: Robinson-Pierpont CSV and Antoniades text ----------------------

BYZ_FILES = {
    "MAT": "MAT", "MRK": "MAR", "LUK": "LUK", "JHN": "JOH", "ACT": "ACT", "ROM": "ROM",
    "1CO": "1CO", "2CO": "2CO", "GAL": "GAL", "EPH": "EPH", "PHP": "PHP", "COL": "COL",
    "1TH": "1TH", "2TH": "2TH", "1TI": "1TI", "2TI": "2TI", "TIT": "TIT", "PHM": "PHM",
    "HEB": "HEB", "JAS": "JAM", "1PE": "1PE", "2PE": "2PE", "1JN": "1JO", "2JN": "2JO",
    "3JN": "3JO", "JUD": "JUD", "REV": "REV",
}
ANT_FILES = {
    "MAT": "MT", "MRK": "MR", "LUK": "LU", "JHN": "JOH", "ACT": "AC", "ROM": "RO",
    "1CO": "1CO", "2CO": "2CO", "GAL": "GA", "EPH": "EPH", "PHP": "PHP", "COL": "COL",
    "1TH": "1TH", "2TH": "2TH", "1TI": "1TI", "2TI": "2TI", "TIT": "TIT", "PHM": "PHM",
    "HEB": "HEB", "JAS": "JAS", "1PE": "1PE", "2PE": "2PE", "1JN": "1JO", "2JN": "2JO",
    "3JN": "3JO", "JUD": "JUDE", "REV": "RE",
}


def load_byzcsv(src):
    base = os.path.join(CACHE, "byzantine-majority-text", "csv-unicode", "ccat", "no-variants")
    if not os.path.isdir(base):
        return None
    out = {}
    for bid, name in BYZ_FILES.items():
        chapters = {}
        with open(os.path.join(base, name + ".csv"), encoding="utf-8") as f:
            for row in csv.DictReader(f):
                chapters.setdefault(int(row["chapter"]), {})[int(row["verse"])] = clean(row["text"])
        out[bid] = chapters
    return out


def load_antoniades(src):
    base = os.path.join(CACHE, "greektext-antoniades", "textonly", "unicode")
    if not os.path.isdir(base):
        return None
    out = {}
    for bid, name in ANT_FILES.items():
        chapters = {}
        with open(os.path.join(base, name + ".txt"), encoding="utf-8") as f:
            for line in f:
                m = re.match(r"\s*(\d+):(\d+)\s+(.*)", line)
                if m:
                    chapters.setdefault(int(m[1]), {})[int(m[2])] = clean(m[3])
        out[bid] = chapters
    return out


# --- eBible.org USFM zips ----------------------------------------------------

# Character-style markers whose text is kept (the marker itself is dropped).
# Notes (\f, \fe, \x) and their contents are removed entirely.
NOTE_RE = re.compile(r"\\(f|fe|x|ef|ex)\s.*?\\\1\*", re.S)
WORD_RE = re.compile(r"\\\+?w\s+([^|\\]*?)(\|[^\\]*?)?\\\+?w\*")
CHAR_RE = re.compile(r"\\\+?[a-z]+[0-9]*\*?")
# Paragraph markers whose line content is not Scripture text.
SKIP_PARAS = {"id", "ide", "h", "toc1", "toc2", "toc3", "toca1", "toca2", "toca3", "mt",
              "mt1", "mt2", "mt3", "mt4", "mte", "mte1", "mte2", "imt", "imt1", "imt2",
              "is", "is1", "is2", "ip", "ipi", "im", "imi", "ipq", "imq", "ipr", "iq",
              "iq1", "iq2", "ib", "ili", "ili1", "ili2", "iot", "io", "io1", "io2", "ior",
              "iex", "ie", "ms", "ms1", "ms2", "mr", "s", "s1", "s2", "s3", "s4", "sr",
              "r", "rem", "sts", "cl", "cp", "cd", "sp", "usfm", "periph", "restore", "rq"}
USFM_ALIASES = {"DAG": "DAN", "ESG": "EST", "PS2": None, "ODA": None, "PSS": None,
                "FRT": None, "GLO": None, "BAK": None, "OTH": None, "INT": None, "CNC": None,
                "TDX": None, "XXA": None, "XXB": None, "XXC": None, "XXD": None, "XXE": None,
                "XXF": None, "XXG": None, "ENO": None, "JUB": None, "EZA": None, "5EZ": None,
                "6EZ": None, "LAO": None, "4ES": None}


def parse_usfm(text):
    text = NOTE_RE.sub(" ", text)
    text = WORD_RE.sub(lambda m: m[1], text)
    m = re.search(r"\\id\s+([0-9A-Z]{3})", text)
    if not m:
        return None, {}
    book = m[1]
    chapters, chap, verse, pending_title = {}, 0, None, ""
    for line in re.split(r"\n(?=\\)", text):
        m = re.match(r"\\([a-z]+[0-9]*)\s?(.*)", line.strip(), re.S)
        if not m:
            continue
        tag, rest = m[1], m[2]
        if tag == "c":
            chap = int(re.match(r"\d+", rest)[0])
            verse, pending_title = None, ""
            continue
        if tag in SKIP_PARAS or chap == 0:
            continue
        if tag == "v":
            rest = "\\v " + rest
        if tag == "d":  # psalm title before verse 1
            pending_title = (pending_title + " " + strip_chars(rest)).strip()
            continue
        # A line may hold several verses: "\q1 \v 3 text \v 4 text".
        for part in re.split(r"(\\v\s+\d+[a-z]?(?:-\d+[a-z]?)?\s)", rest):
            vm = re.match(r"\\v\s+(\d+)", part)
            if vm:
                verse = int(vm[1])
                cur = chapters.setdefault(chap, {})
                cur.setdefault(verse, "")
                if verse == 1 and pending_title:
                    cur[0] = pending_title
                    pending_title = ""
                continue
            if verse is None:
                continue
            t = strip_chars(part)
            if t:
                cur = chapters[chap]
                cur[verse] = (cur[verse] + " " + t).strip()
    for c in chapters.values():
        for v in [v for v, t in c.items() if not t]:
            del c[v]
    return book, chapters


def strip_chars(s):
    s = CHAR_RE.sub(" ", s)
    return clean(s)


def load_ebible(src):
    path = os.path.join(CACHE, "ebible", src["ebible"] + "_usfm.zip")
    if not os.path.exists(path):
        return None
    out = {}
    with zipfile.ZipFile(path) as z:
        for name in sorted(z.namelist()):
            if not name.lower().endswith((".usfm", ".sfm")):
                continue
            book, chapters = parse_usfm(z.read(name).decode("utf-8-sig"))
            book = USFM_ALIASES.get(book, book)
            if book and chapters:
                if book in out:  # e.g. Greek Esther after Hebrew Esther
                    print("  duplicate", book, "in", name, "- keeping the first")
                    continue
                out[book] = chapters
    return out


# --- common -----------------------------------------------------------------

def clean(s):
    s = s.replace("\u00b6", " ")  # pilcrows some sources keep
    s = re.sub(r"<[^>]+>", "", s)  # stray markup
    return re.sub(r"\s+", " ", s).strip()


LOADERS = {"scrollmapper": load_scrollmapper, "byzcsv": load_byzcsv,
           "antoniades": load_antoniades, "ebible": load_ebible}


def build(src):
    verses = LOADERS[src["format"]](src)
    if verses is None:
        print("%-22s not fetched, skipped" % src["id"])
        return None
    unknown = sorted(set(verses) - KNOWN)
    for b in unknown:
        print("  dropping book the app does not list:", b)
        del verses[b]
    books = to_arrays(verses)
    meta = {k: src[k] for k in ("id", "name", "lang", "script", "dir", "versification", "license", "source")}
    obj = dict(meta, books=books)
    header = [meta["name"] + ". " + src["license"] + ".",
              "Source: " + src["source"],
              "Generated by tools/texts/build_bibles.py; do not edit by hand."]
    size = write_js(os.path.join(DATA, "bibles", src["id"] + ".js"), header, "SGO_BIBLES", obj)
    nverses = sum(1 for b in books.values() for c in b for v in c if v)
    print("%-22s %3d books %6d verses %5.1f MB" % (src["id"], len(books), nverses, size / 1e6))
    entry = {k: meta[k] for k in ("id", "name", "lang", "dir", "versification", "license", "source")}
    entry["testaments"] = testaments(books)
    return entry


def main(ids):
    for src in BIBLES:
        if ids and src["id"] not in ids:
            continue
        build(src)


if __name__ == "__main__":
    main(set(sys.argv[1:]))
