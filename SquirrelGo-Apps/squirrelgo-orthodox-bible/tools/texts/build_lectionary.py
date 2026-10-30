#!/usr/bin/env python3
"""Build www/data/lectionary.js, the tables behind the daily readings.

Source: Orthocal's calendar fixtures (github.com/brianglass/orthocal-python,
MIT), fetched by fetch_sources.sh into .cache/orthocal/. They hold the
Slavic (OCA) lectionary as audited against oca.org: which pericope is read
on which day of the Paschal cycle, of the fixed (Menaion) calendar and of
the floating feasts, plus the day titles and the names of the saints.

Only references and names are kept. The lives of the saints in the same
fixtures are left out (they come from copyrighted sources), and so is the
Scripture text of the composite readings; the app shows the text from its
own Bibles. Rows tagged for the Greek tradition are dropped: the
calculator in www/data/paschalion.js follows Slavic usage, which is the
same for the New (Revised Julian) and Old (Julian) calendars.

    python3 build_lectionary.py
"""
import collections
import json
import os
import re

from common import CACHE, DATA

SRC = os.path.join(CACHE, "orthocal")
COMMIT = "3eba406ec7d34825cf6ae828fbb285111effc689"

# Orthocal's book abbreviations (Pericope.verses) -> USFM ids.
BOOKS = {
    "Gen": "GEN", "Exod": "EXO", "Num": "NUM", "Deut": "DEU", "Josh": "JOS",
    "Judg": "JDG", "3Kg": "1KI", "4Kg": "2KI", "Job": "JOB", "Prov": "PRO",
    "Wis": "WIS", "Isa": "ISA", "Jer": "JER", "Baruch": "BAR", "Ezek": "EZK",
    "Dan": "DAN", "Joel": "JOL", "Amos": "AMO", "Jonah": "JON", "Micah": "MIC",
    "Zeph": "ZEP", "Zech": "ZEC",
    "Matt": "MAT", "Mark": "MRK", "Luke": "LUK", "John": "JHN", "Acts": "ACT",
    "Rom": "ROM", "1Cor": "1CO", "2Cor": "2CO", "Gal": "GAL", "Eph": "EPH",
    "Phil": "PHP", "Col": "COL", "1Thess": "1TH", "2Thess": "2TH", "1Tim": "1TI",
    "2Tim": "2TI", "Titus": "TIT", "Philemon": "PHM", "Heb": "HEB", "James": "JAS",
    "1Peter": "1PE", "2Peter": "2PE", "1John": "1JN", "2John": "2JN",
    "3John": "3JN", "Jude": "JUD",
}


def load(name):
    with open(os.path.join(SRC, name + ".json"), encoding="utf-8") as f:
        rows = json.load(f)
    by_model = collections.defaultdict(list)
    for row in rows:
        by_model[row["model"]].append(dict(row["fields"], id=row["pk"]))
    return by_model


def slot(row):
    """The key the calculator looks a row up by: "M-D" for the fixed
    calendar, otherwise the distance from Pascha (or a floating-feast index,
    1001 and up, or 700 + an Eothinon number)."""
    return f'{row["month"]}-{row["day"]}' if row["month"] else str(row["pdist"])


def parts(verses):
    """'Heb_11024_11026|Heb_11032_11040' -> [["HEB", 11, 24, 11, 26], ...]."""
    out = []
    for part in verses.split("|"):
        book, start, end = re.fullmatch(r"([0-9A-Za-z]+)_(\d+)_(\d+)", part.strip()).groups()
        if book == "Comp":  # stitched-together Old Testament reading
            return []
        start, end = int(start), int(end)
        out.append([BOOKS[book], start // 1000, start % 1000, end // 1000, end % 1000])
    return out


def strip(text):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", text or "")).strip()


def main():
    cal = load("calendarium")
    com = load("commemorations")

    # Day rows: one winner per slot, the Slavic row overriding the common one
    # only in its rank (see orthocal's _merge_tradition_days).
    groups = collections.defaultdict(dict)
    for d in sorted(cal["calendarium.day"], key=lambda d: d["id"]):
        if d["tradition"] in ("common", "slavic"):
            groups[(d["pdist"], d["month"], d["day"])][d["tradition"]] = d
    days = collections.defaultdict(list)
    winners = set()
    for group in groups.values():
        base, over = group.get("common"), group.get("slavic")
        row = dict(base or over)
        if base and over:
            for field in ("feast_level", "fast_exception"):
                if over[field] is not None:
                    row[field] = over[field]
        winners.add(row["id"])
        title = f'{row["title"]}: {row["subtitle"]}' if row["subtitle"] else row["title"]
        days[slot(row)].append([row["id"], strip(title), strip(row["feast_name"]),
                                row["feast_level"] or 0, row["fast_exception"] or 0])
    for rows in days.values():
        rows.sort()

    # Readings, with a Slavic row replacing the common one in the same place.
    pericopes, per_index = [], {}
    by_pk = {p["id"]: p for p in cal["calendarium.pericope"]}
    services = []
    readings = collections.defaultdict(dict)
    for r in sorted(cal["calendarium.reading"], key=lambda r: r["id"]):
        if r["tradition"] not in ("common", "slavic"):
            continue
        key = (r["source"], r["ordering"], r["desc"])
        place = readings[slot(r)]
        if key in place and r["tradition"] == "common":
            continue
        if r["pericope"] not in per_index:
            p = by_pk[r["pericope"]]
            per_index[r["pericope"]] = len(pericopes)
            display = re.sub(r"^Composite \d+ - ", "", p["display"].strip())
            pericopes.append([display, parts(p["verses"])])
        if r["source"] not in services:
            services.append(r["source"])
        place[key] = [r["id"], services.index(r["source"]), r["desc"],
                      per_index[r["pericope"]], r["ordering"]]
    readings = {k: sorted(v.values(), key=lambda x: (x[4], x[0])) for k, v in readings.items()}

    # Saints of the day: names only (the lives are not copied). kind 0 is a saint listed under the day,
    # 1 one added to it, 2 one already shown as the day's feast (shown again
    # only when an Old Calendar day borrows it by its civil date).
    all_days = {d["id"]: d for d in cal["calendarium.day"]}
    saints = collections.defaultdict(list)
    for c in com["commemorations.daycommemoration"]:
        if c["tradition"] not in ("common", "slavic") or not strip(c["title"]):
            continue
        d = all_days[c["day"]]
        if c["ordering"] >= 0:
            kind = 0 if c["day_native"] else 1
        else:
            kind = 2 if d["id"] in winners else 1
        # Which saints a short summary names first (orthocal's
        # _display_priority): ranked ones, then those with a written life.
        rank = 0 if c["rank"] > 0 or c["high_rank"] else 1 if strip(c["story"]) else 2
        saints[slot(d)].append([d["id"], c["ordering"], kind, 1 if c["new_style"] else 0,
                                strip(c["title"]), rank])
    for rows in saints.values():
        rows.sort(key=lambda x: (x[0], x[1]))

    out = {
        "source": f"https://github.com/brianglass/orthocal-python/tree/{COMMIT}/fixtures",
        "license": "MIT (Orthocal, Brian Glass); readings and commemorations are references and names only",
        "tradition": "slavic",
        "versification": "kjv",
        "services": services,
        "pericopes": pericopes,
        "days": dict(days),
        "readings": readings,
        "saints": dict(saints),
    }
    path = os.path.join(DATA, "lectionary.js")
    with open(path, "w", encoding="utf-8") as f:
        f.write("// Orthodox lectionary tables: which readings, feasts and saints belong to\n"
                "// each day of the Paschal cycle, the fixed calendar and the floating feasts.\n"
                "// www/data/paschalion.js turns a date into a day from these.\n"
                "// Generated by tools/texts/build_lectionary.py.\n"
                "window.SGO_LECTIONARY = ")
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    print(f"{path}: {len(pericopes)} pericopes, {sum(map(len, readings.values()))} readings, "
          f"{sum(map(len, saints.values()))} commemorations, {os.path.getsize(path) // 1024} KB")


if __name__ == "__main__":
    main()
