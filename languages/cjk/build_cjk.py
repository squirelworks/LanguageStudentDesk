#!/usr/bin/env python3
"""Seed the hanzi and hanja sides of the shared CJK table from open data.

    chinese/hanzi.js     <- HSK 3.0 levels 1-6 characters, with Unihan pinyin,
                            meaning and traditional form
    hangul/hanja.js      <- the 1,800 basic hanja for education (Unihan kHangul
                            entries flagged E), with Unihan hangul reading and meaning
    cjk/characters.js    <- adds the hanzi and hanja tags, and new characters
                            with Unihan radical and stroke count

Sources (see languages/README.md):
  * Unihan database files (Unicode license), https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip:
    Unihan_Readings.txt (kMandarin, kDefinition, kHangul),
    Unihan_IRGSources.txt (kRSUnicode, kTotalStrokes),
    Unihan_Variants.txt (kTraditionalVariant)
  * complete-hsk-vocabulary (MIT), https://github.com/drkameleon/complete-hsk-vocabulary:
    complete.json, for which words belong to which HSK 3.0 level

    python3 languages/cjk/build_cjk.py --unihan DIR --hsk complete.json

Kanji entries in the table keep their own radical and stroke count. Run
python3 languages/build_registry.py --check afterwards.
"""
import argparse
import json
import re
import unicodedata
from pathlib import Path

LANG = Path(__file__).resolve().parent.parent
HSK_LEVELS = 6
# Education hanja that Unihan gives no kDefinition, and the character whose
# meaning they share. 𮕩 is the Korean education-list form of 衰.
MEANING_FROM = {"𮕩": "衰"}


def read_unihan(folder):
    data = {}
    for name in ("Unihan_Readings.txt", "Unihan_IRGSources.txt", "Unihan_Variants.txt"):
        for line in (Path(folder) / name).read_text(encoding="utf-8").splitlines():
            if not line.startswith("U+"):
                continue
            cp, field, value = line.split("\t", 2)
            data.setdefault(chr(int(cp[2:], 16)), {})[field] = value
    return data


def radical(rs):
    """kRSUnicode '72.0' or "120'.3" -> the Kangxi radical as an ideograph."""
    num = int(re.match(r"\d+", rs).group())
    return unicodedata.normalize("NFKC", chr(0x2F00 + num - 1))


def meaning(definition):
    """The first few senses of a kDefinition, short enough for a card."""
    parts = [p.strip() for p in definition.split(";") if p.strip()]
    out = ""
    for p in parts:
        if out and len(out) + len(p) > 40:
            break
        out = out + "; " + p if out else p
    return out


def variant(value):
    """'U+66F8' or 'U+66F8 U+...' -> the characters, joined."""
    return "".join(chr(int(v[2:].split("<")[0], 16)) for v in value.split())


def hsk_chars(path):
    """Each HSK 3.0 character of levels 1-6, by the lowest level a word with it
    appears at, in the order the list first uses it."""
    words = json.loads(Path(path).read_text(encoding="utf-8"))
    level_of = {}
    for lvl in range(1, HSK_LEVELS + 1):
        tag = f"new-{lvl}"
        for w in sorted((w for w in words if tag in w.get("level", [])), key=lambda w: w.get("frequency", 10**9)):
            for ch in w["simplified"]:
                if unicodedata.category(ch) == "Lo" and ch not in level_of:
                    level_of[ch] = lvl
    return level_of


def hanzi_entries(unihan, level_of):
    out = {}
    for ch, lvl in level_of.items():
        u = unihan.get(ch, {})
        if not u.get("kMandarin") or not u.get("kDefinition"):
            continue
        pinyin = u["kMandarin"].split()[0]
        e = {"roman": pinyin, "info": meaning(u["kDefinition"]), "pinyin": u["kMandarin"], "hsk": lvl}
        trad = variant(u["kTraditionalVariant"]) if u.get("kTraditionalVariant") else ""
        if trad and trad != ch:
            e["traditional"] = trad
        out[ch] = e
    return out


def hanja_entries(unihan):
    rows = []
    for ch, u in unihan.items():
        readings = [r.split(":") for r in u.get("kHangul", "").split()]
        edu = [h for h, src in readings if "E" in src]
        definition = u.get("kDefinition") or unihan.get(MEANING_FROM.get(ch, ""), {}).get("kDefinition")
        if edu and definition:
            rows.append((edu[0], ch, edu, definition))
    rows.sort(key=lambda r: (r[0], r[1]))
    return {ch: {"roman": " / ".join(edu), "info": meaning(definition), "hangul": " / ".join(edu)}
            for _, ch, edu, definition in rows}


def write_readings(path, tradition, name, intro, chars):
    body = "{\n" + ",\n".join(f"    {json.dumps(c, ensure_ascii=False)}: {json.dumps(e, ensure_ascii=False, separators=(',', ':'))}"
                             for c, e in chars.items()) + "\n  }"
    path.write_text(
        intro
        + "window.LSD_CJK_READINGS = window.LSD_CJK_READINGS || {};\n"
        + f"window.LSD_CJK_READINGS.{tradition} = {{\n  \"name\": {json.dumps(name)},\n  \"chars\": {body}\n}};\n",
        encoding="utf-8")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--unihan", required=True, help="folder with the Unihan_*.txt files")
    ap.add_argument("--hsk", required=True, help="complete-hsk-vocabulary complete.json")
    a = ap.parse_args()
    unihan = read_unihan(a.unihan)
    hanzi = hanzi_entries(unihan, hsk_chars(a.hsk))
    hanja = hanja_entries(unihan)

    table_path = LANG / "cjk" / "characters.js"
    text = table_path.read_text(encoding="utf-8")
    head, body = text.split("window.LSD_CJK =", 1)
    table = json.loads(body.strip().rstrip(";"))
    for tradition, chars in (("hanzi", hanzi), ("hanja", hanja)):
        for ch in chars:
            u = unihan.get(ch, {})
            entry = table.setdefault(ch, {"uses": []})
            if tradition not in entry["uses"]:
                entry["uses"].append(tradition)
            if "radical" not in entry and u.get("kRSUnicode"):
                entry["radical"] = radical(u["kRSUnicode"].split()[0])
            if "strokes" not in entry and u.get("kTotalStrokes"):
                entry["strokes"] = int(u["kTotalStrokes"].split()[0])
    order = ["hanzi", "kanji", "hanja"]
    for entry in table.values():
        entry["uses"].sort(key=order.index)
    lines = ",\n".join(f"  {json.dumps(c, ensure_ascii=False)}: {json.dumps(e, ensure_ascii=False, separators=(',', ':'))}"
                       for c, e in table.items())
    table_path.write_text(head + "window.LSD_CJK = {\n" + lines + "\n};\n", encoding="utf-8")

    write_readings(LANG / "chinese" / "hanzi.js", "hanzi", "Hanzi",
                   "// Hanzi readings for the shared CJK table (languages/cjk/characters.js):\n"
                   "// every character of HSK 3.0 levels 1-6, by level, with pinyin, meaning\n"
                   "// (info) and traditional form. Generated by languages/cjk/build_cjk.py from\n"
                   "// Unihan and complete-hsk-vocabulary; see languages/README.md.\n", hanzi)
    write_readings(LANG / "hangul" / "hanja.js", "hanja", "Hanja",
                   "// Hanja readings for the shared CJK table (languages/cjk/characters.js):\n"
                   "// the 1,800 basic hanja for education, in hangul order, with hangul reading\n"
                   "// and meaning (info). Generated by languages/cjk/build_cjk.py from Unihan;\n"
                   "// see languages/README.md.\n", hanja)
    print(f"hanzi {len(hanzi)}, hanja {len(hanja)}, table {len(table)}")


if __name__ == "__main__":
    main()
