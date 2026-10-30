#!/usr/bin/env python3
"""Turn the Russian commentaries fetched by fetch_azbyka.py (.cache/azbyka/)
into downloadable commentary packs. build_commentary.py calls build() and
lists the result in commentary_packs.json with its own packs.

azbyka.ru prints each passage being explained as a <p class="h5"> holding a
link to the verse (https://azbyka.ru/biblia/?Mt.5:1) followed by the Slavonic
and Synodal text, then the commentary on it as <p class="txt"> paragraphs.
Books laid out another way (Theodoret's questions on the Octateuch, for
example) give no notes and are skipped.
"""
import glob
import gzip
import html
import json
import os
import re
import sys

from common import CACHE, PACKS_DIR, book_ids, write_js
from sources_ru import ACCEPT_REPRINT, AZBYKA_BOOKS, COMMENTARIES, MAX_YEAR, REJECT_SOURCE

SRC = os.path.join(CACHE, "azbyka")
MAX_BYTES = 4_000_000

# azbyka.ru verse-link book codes -> USFM
CODES = {
    "Gen": "GEN", "Ex": "EXO", "Lev": "LEV", "Num": "NUM", "Deut": "DEU", "Nav": "JOS", "Judg": "JDG",
    "Rth": "RUT", "1Sam": "1SA", "2Sam": "2SA", "1King": "1KI", "2King": "2KI", "1Chron": "1CH",
    "2Chron": "2CH", "Ps": "PSA", "Prov": "PRO", "Eccl": "ECC", "Song": "SNG", "Is": "ISA", "Jer": "JER",
    "Lam": "LAM", "Bar": "BAR", "Ezek": "EZK", "Dan": "DAN", "Hos": "HOS", "Joel": "JOL", "Am": "AMO",
    "Avd": "OBA", "Jona": "JON", "Mic": "MIC", "Naum": "NAM", "Habak": "HAB", "Sofon": "ZEP", "Hag": "HAG",
    "Zah": "ZEC", "Mal": "MAL",
    "Mt": "MAT", "Mk": "MRK", "Lk": "LUK", "Jn": "JHN", "Act": "ACT", "Jac": "JAS", "1Pet": "1PE",
    "2Pet": "2PE", "1Jn": "1JN", "2Jn": "2JN", "3Jn": "3JN", "Juda": "JUD", "Rom": "ROM", "1Cor": "1CO",
    "2Cor": "2CO", "Gal": "GAL", "Eph": "EPH", "Phil": "PHP", "Col": "COL", "1Thes": "1TH", "2Thes": "2TH",
    "1Tim": "1TI", "2Tim": "2TI", "Tit": "TIT", "Phlm": "PHM", "Hebr": "HEB", "Apok": "REV",
}
LINK_RE = re.compile(r'href="https://azbyka\.ru/biblia/\?([0-9]?[A-Za-z]+)\.(\d+):(\d+)(?:[-–](?:(\d+):)?(\d+))?[",]')
PARA_RE = re.compile(r'<p\b([^>]*)>(.*?)</p>', re.S)


def text_of(fragment):
    t = re.sub(r'<a href="#note[^>]*>.*?</a>', "", fragment, flags=re.S)  # footnote markers
    t = re.sub(r"<br\s*/?>", "\n", t)
    t = html.unescape(re.sub(r"<[^>]+>", "", t))
    return re.sub(r"[ \t\xa0]+", " ", t).strip()


def source_line(index_html):
    i = index_html.find("Источник:")
    if i < 0:
        return ""
    s = text_of(index_html[i:i + 2000]).replace("\n", " ")
    return re.sub(r"\s+", " ", s.split("Социальные")[0])[len("Источник:"):].strip()


def public_domain(src):
    """Whether a book's edition, as azbyka.ru gives it, is a public-domain translation."""
    if not src or REJECT_SOURCE.search(src):
        return False
    if ACCEPT_REPRINT.search(src):
        return True
    years = [int(y) for y in re.findall(r"\b(1[6-9]\d\d|20\d\d)\b", src)]
    return bool(years) and max(years) <= MAX_YEAR


def read(path):
    with gzip.open(path, "rt", encoding="utf-8") as f:
        return f.read()


def parse_book(book_dir, title):
    """Return {key: [note, ...]} for one book, notes in page order."""
    def page_order(p):
        n = os.path.basename(p)[:-len(".html.gz")]
        return [-1] if n == "index" else [int(x) for x in n.split("_")]

    notes, seen = {}, set()
    for path in sorted(glob.glob(os.path.join(book_dir, "*.html.gz")), key=page_order):
        key, buf = None, []

        def flush():
            if key and buf:
                text = "\n\n".join(buf)
                if (key, text) not in seen:
                    seen.add((key, text))
                    notes.setdefault(key, []).append(text + "\n— " + title)

        for attrs, body in PARA_RE.findall(read(path)):
            m = LINK_RE.search(body) if "bibText1" in body else None
            if m:
                flush()
                book = CODES.get(m[1])
                key, buf = None, []
                if book:
                    c, v = int(m[2]), int(m[3])
                    key = "%s.%d.%d" % (book, c, v) + ("-%s" % m[5] if m[5] and not m[4] else "")
            elif 'class="txt"' in attrs and key:
                t = text_of(body)
                if t:
                    buf.append(t)
        flush()
    return notes


def build(order):
    """Write the Russian packs; return their commentary_packs.json entries."""
    if not os.path.isdir(SRC):
        print("Russian commentary: %s missing, run ./fetch_sources.sh" % SRC)
        return []

    def sort_key(k):
        b, c, v = k.split(".")
        return (order[b], int(c), int(v.split("-")[0]))

    entries = []
    for cid, books in AZBYKA_BOOKS.items():
        author, tradition = COMMENTARIES[cid]
        notes, works, sources = {}, [], []
        for book in books:
            rel = book["url"].split("/otechnik/", 1)[1].strip("/")
            book_dir = os.path.join(SRC, rel)
            index = os.path.join(book_dir, "index.html.gz")
            if not os.path.exists(index):
                print("    missing", rel)
                continue
            ih = read(index)
            src = source_line(ih)
            m = re.search(r"<h1[^>]*>(.*?)</h1>", ih, re.S)
            title = text_of(m[1]) if m else rel
            if not public_domain(src):
                print("    left out (edition not public domain): %s [%s]" % (rel, src[:120]))
                continue
            got = parse_book(book_dir, title)
            if not got:
                print("    no verse-keyed notes:", rel)
                continue
            for k, v in got.items():
                notes.setdefault(k, []).extend(v)
            works.append(title)
            sources.append(src)
        if not notes:
            continue
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
        work = "; ".join(works[:4]) + ("; and other works" if len(works) > 4 else "")
        for bks in parts:
            pid = cid if len(parts) == 1 else "%s-%s" % (cid, (bks[0] + "-" + bks[-1] if len(bks) > 1 else bks[0]).lower())
            keys = sorted((k for b in bks for k in by_book[b]), key=sort_key)
            obj = {
                "id": pid, "author": author, "work": work,
                "translator": "Pre-revolutionary Russian translations: " + " | ".join(sorted(set(sources))),
                "lang": "ru", "license": "Public Domain",
                "source": "https://azbyka.ru/otechnik/ (via the orthodox-bible-sources-ru branch)",
                "versification": "rso", "tradition": tradition,
                "notes": {k: notes[k] for k in keys},
            }
            path = os.path.join(PACKS_DIR, "commentary", pid + ".js")
            size = write_js(path, [author + ": downloadable commentary pack (Russian). Public Domain. "
                                   "Generated by tools/texts/build_commentary_ru.py."], "SGO_COMMENTARY", obj)
            n = sum(len(notes[k]) for k in keys)
            print("%-34s %5d notes on %4d passages, %2d books, %5.2f MB  (pack)" % (
                pid, n, len(keys), len(bks), size / 1e6))
            entries.append({"id": pid, "author": author, "work": work, "lang": "ru",
                            "license": "Public Domain", "source": obj["source"], "books": bks,
                            "tradition": tradition, "size": size, "pack": True})
    return entries


if __name__ == "__main__":
    build({b: i for i, b in enumerate(book_ids())})
    sys.exit(0)
