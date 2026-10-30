"""Shared helpers for building the Orthodox Bible data files.

Everything here writes the plain-script format the app reads from
www/data/ (see ../../README.md, "Data format").
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.normpath(os.path.join(HERE, "..", ".."))
DATA = os.path.join(APP, "www", "data")
CACHE = os.environ.get("SGO_TEXTS_CACHE", os.path.join(HERE, ".cache"))
# Downloadable packs are built here (not committed) and listed in packs.json.
PACKS_DIR = os.environ.get("SGO_PACKS_DIR", os.path.join(HERE, "packs"))
PACKS_JSON = os.path.join(HERE, "packs.json")

# English book names (scrollmapper / SWORD style) -> USFM ids.
NAME_TO_USFM = {
    "Genesis": "GEN", "Exodus": "EXO", "Leviticus": "LEV", "Numbers": "NUM",
    "Deuteronomy": "DEU", "Joshua": "JOS", "Judges": "JDG", "Ruth": "RUT",
    "I Samuel": "1SA", "II Samuel": "2SA", "I Kings": "1KI", "II Kings": "2KI",
    "I Chronicles": "1CH", "II Chronicles": "2CH", "Prayer of Manasses": "MAN",
    "Ezra": "EZR", "Nehemiah": "NEH", "I Esdras": "1ES", "II Esdras": "2ES",
    "Tobit": "TOB", "Judith": "JDT", "Esther": "EST", "Additions to Esther": "ESG",
    "Job": "JOB", "Psalms": "PSA", "Proverbs": "PRO", "Ecclesiastes": "ECC",
    "Song of Solomon": "SNG", "Wisdom": "WIS", "Sirach": "SIR", "Isaiah": "ISA",
    "Jeremiah": "JER", "Lamentations": "LAM", "Epistle of Jeremiah": "LJE",
    "Baruch": "BAR", "Ezekiel": "EZK", "Daniel": "DAN", "Hosea": "HOS",
    "Joel": "JOL", "Amos": "AMO", "Obadiah": "OBA", "Jonah": "JON", "Micah": "MIC",
    "Nahum": "NAM", "Habakkuk": "HAB", "Zephaniah": "ZEP", "Haggai": "HAG",
    "Zechariah": "ZEC", "Malachi": "MAL", "I Maccabees": "1MA", "II Maccabees": "2MA",
    "III Maccabees": "3MA", "IV Maccabees": "4MA", "Prayer of Azariah": "S3Y",
    "Susanna": "SUS", "Bel and the Dragon": "BEL", "Esther (Greek)": "ESG",
    "Matthew": "MAT", "Mark": "MRK", "Luke": "LUK", "John": "JHN", "Acts": "ACT",
    "Romans": "ROM", "I Corinthians": "1CO", "II Corinthians": "2CO",
    "Galatians": "GAL", "Ephesians": "EPH", "Philippians": "PHP", "Colossians": "COL",
    "I Thessalonians": "1TH", "II Thessalonians": "2TH", "I Timothy": "1TI",
    "II Timothy": "2TI", "Titus": "TIT", "Philemon": "PHM", "Hebrews": "HEB",
    "James": "JAS", "I Peter": "1PE", "II Peter": "2PE", "I John": "1JN",
    "II John": "2JN", "III John": "3JN", "Jude": "JUD", "Revelation of John": "REV",
}

# Arabic-numeral spellings used by the commentary database.
for _name, _id in list(NAME_TO_USFM.items()):
    for roman, arabic in (("IV ", "4 "), ("III ", "3 "), ("II ", "2 "), ("I ", "1 ")):
        if _name.startswith(roman):
            NAME_TO_USFM[arabic + _name[len(roman):]] = _id
            break
NAME_TO_USFM.update({"Revelation": "REV", "Song of Songs": "SNG",
                     "Wisdom of Solomon": "WIS", "Ecclesiasticus": "SIR"})

NT = {"MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH", "PHP",
      "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM", "HEB", "JAS", "1PE", "2PE",
      "1JN", "2JN", "3JN", "JUD", "REV"}
DC = {"1ES", "2ES", "TOB", "JDT", "ESG", "WIS", "SIR", "BAR", "LJE", "S3Y", "SUS",
      "BEL", "MAN", "1MA", "2MA", "3MA", "4MA"}


def book_ids():
    """USFM ids the app knows, read from www/data/books.js."""
    import re
    with open(os.path.join(DATA, "books.js"), encoding="utf-8") as f:
        return re.findall(r'\bid:\s*"([0-9A-Z]{3})"', f.read())


def testaments(books):
    parts = []
    if any(b not in NT and b not in DC for b in books):
        parts.append("OT")
    if any(b in NT for b in books):
        parts.append("NT")
    if any(b in DC for b in books):
        parts.append("DC")
    return ",".join(parts)


def to_arrays(verses):
    """{book: {chapter: {verse: text}}} -> {book: [[v1, v2, ...], ...]}.

    Chapters and verses become 1-based arrays; gaps are null. Verse 0 (an
    unnumbered psalm title) is folded into verse 1, which is how the KJV-style
    texts in the app already carry psalm titles.
    """
    out = {}
    for book, chapters in verses.items():
        if not chapters:
            continue
        arr = [[] for _ in range(max(chapters))]
        for c, vs in chapters.items():
            vs = dict(vs)
            if 0 in vs:
                title = vs.pop(0)
                vs[1] = (title + " " + vs.get(1, "")).strip()
            if not vs:
                continue
            row = [None] * max(vs)
            for v, t in vs.items():
                row[v - 1] = t
            arr[c - 1] = row
        out[book] = arr
    return out


def write_js(path, header, global_name, obj, push=True):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    body = json.dumps(obj, ensure_ascii=False, separators=(",", ":"))
    with open(path, "w", encoding="utf-8") as f:
        for line in header:
            f.write("// " + line + "\n")
        if push:
            f.write("%s.push(%s);\n" % (global_name, body))
        else:
            f.write("window.%s = %s;\n" % (global_name, body))
    return os.path.getsize(path)
