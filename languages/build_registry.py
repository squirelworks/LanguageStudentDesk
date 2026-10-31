#!/usr/bin/env python3
"""Rebuild the generated scripts in languages/ from the per-language JSON.

    registry.js   <- languages/*/meta.json
    reference.js  <- languages/*/reference.json

It also checks each meta.json's "data" list against the files in its folder,
and the shared CJK table (cjk/characters.js) against each tradition's readings.

The tools read the JSON with fetch() when the Desk serves them over http://.
Browsers block fetch() of local files, so for file:// pages they fall back to
these plain scripts with the same data. Run this after editing any meta.json
or reference.json:

    python3 languages/build_registry.py          # rewrite the scripts
    python3 languages/build_registry.py --check  # exit 1 if one is stale
"""
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent

TOPICS = {"overview", "script", "sounds", "grammar", "verbs", "numbers", "phrases", "culture"}

# The kinds of data a language can list under "data" in its meta.json, and the
# file each kind lives in by default (see languages/README.md).
DATA_KINDS = {
    "characters": "characters.js",
    "grammar": "grammar.js",
    "vocab": "vocab.js",
    "reference": "reference.json",
}


def load(name):
    return [json.loads(p.read_text(encoding="utf-8")) for p in sorted(HERE.glob("*/" + name))]


def check_reference(ref, ids):
    """Catch the mistakes that would make the Reference Learner drop an entry."""
    problems = []
    if ref.get("id") not in ids:
        problems.append(f"{ref.get('id')}/reference.json: no matching meta.json")
    seen = set()
    for e in ref.get("entries", []):
        where = f"{ref.get('id')}/reference.json: {e.get('id')}"
        if not e.get("id") or e["id"] in seen:
            problems.append(where + ": missing or duplicate id")
        seen.add(e.get("id"))
        if e.get("topic") not in TOPICS:
            problems.append(where + f": unknown topic {e.get('topic')!r}")
        if not e.get("title"):
            problems.append(where + ": no title")
        for row in (e.get("table") or {}).get("rows", []):
            if len(row) != len(e["table"]["head"]):
                problems.append(where + f": table row {row[0]!r} has {len(row)} cells")
    return problems


def check_data(meta):
    """Every file under "data" must exist inside languages/, and every data file
    a language folder holds must be listed, so no tool misses it."""
    lang = meta.get("id")
    problems = []
    data = meta.get("data", {})
    if not isinstance(data, dict):
        return [f"{lang}/meta.json: data must be an object"]
    listed = set()
    for kind, files in data.items():
        if kind not in DATA_KINDS:
            problems.append(f"{lang}/meta.json: unknown data kind {kind!r}")
            continue
        for f in [files] if isinstance(files, str) else files:
            path = (HERE / lang / f).resolve()
            if HERE not in path.parents:
                problems.append(f"{lang}/meta.json: {kind} file {f!r} is outside languages/")
            elif not path.is_file():
                problems.append(f"{lang}/meta.json: {kind} file {f!r} does not exist")
            listed.add(path)
    for kind, name in DATA_KINDS.items():
        path = (HERE / lang / name).resolve()
        if path.is_file() and path not in listed:
            problems.append(f"{lang}/{name} exists but meta.json does not list it under data.{kind}")
    return problems


# The shared CJK table and the file holding each tradition's readings.
CJK_TABLE = "cjk/characters.js"
CJK_READINGS = {"hanzi": "chinese/hanzi.js", "kanji": "japanese/kanji.js", "hanja": "hangul/hanja.js"}


def js_value(path, prefix):
    """The JSON value a data script assigns after prefix, e.g. 'window.LSD_CJK ='."""
    text = path.read_text(encoding="utf-8")
    body = text.split(prefix, 1)[1].strip()
    return json.loads(body[:-1] if body.endswith(";") else body)


def check_cjk():
    """Every character a tradition reads is in the shared table tagged with that
    tradition, and every tag in the table has readings behind it."""
    if not (HERE / CJK_TABLE).is_file():
        return []
    problems = []
    try:
        table = js_value(HERE / CJK_TABLE, "window.LSD_CJK =")
    except (ValueError, IndexError) as e:
        return [f"{CJK_TABLE}: not one JSON object after window.LSD_CJK = ({e})"]
    readings = {}
    for tradition, rel in CJK_READINGS.items():
        if (HERE / rel).is_file():
            try:
                readings[tradition] = js_value(HERE / rel, f"window.LSD_CJK_READINGS.{tradition} =")["chars"]
            except (ValueError, IndexError, KeyError) as e:
                problems.append(f"{rel}: not one JSON object after window.LSD_CJK_READINGS.{tradition} = ({e})")
                readings[tradition] = {}
    for ch, entry in table.items():
        for tradition in entry.get("uses", []):
            if tradition not in CJK_READINGS:
                problems.append(f"{CJK_TABLE}: {ch}: unknown tradition {tradition!r}")
            elif ch not in readings.get(tradition, {}):
                problems.append(f"{CJK_TABLE}: {ch} is tagged {tradition} but {CJK_READINGS[tradition]} has no entry")
        if not entry.get("uses"):
            problems.append(f"{CJK_TABLE}: {ch}: no uses")
    for tradition, chars in readings.items():
        for ch, entry in chars.items():
            if tradition not in table.get(ch, {}).get("uses", []):
                problems.append(f"{CJK_READINGS[tradition]}: {ch} is not tagged {tradition} in {CJK_TABLE}")
            if not entry.get("info"):
                problems.append(f"{CJK_READINGS[tradition]}: {ch}: no meaning (info)")
    return problems


def script(comment, name, data):
    body = json.dumps(data, ensure_ascii=False, indent=2)
    return f"// Generated by languages/build_registry.py from {comment}. Do not edit.\nwindow.{name} = {body};\n"


def build():
    metas = load("meta.json")
    refs = load("reference.json")
    problems = [p for r in refs for p in check_reference(r, {m["id"] for m in metas})]
    problems += [p for m in metas for p in check_data(m)]
    problems += check_cjk()
    return {
        "registry.js": script("languages/*/meta.json", "LSD_LANGUAGE_REGISTRY", {m["id"]: m for m in metas}),
        "reference.js": script("languages/*/reference.json", "LSD_REFERENCE", {r["id"]: r for r in refs}),
    }, problems


def main():
    outputs, problems = build()
    for p in problems:
        print(p)
    if problems:
        return 1
    if "--check" in sys.argv:
        stale = [n for n, text in outputs.items()
                 if not (HERE / n).exists() or (HERE / n).read_text(encoding="utf-8") != text]
        for n in stale:
            print(f"languages/{n} is stale; run python3 languages/build_registry.py")
        return 1 if stale else 0
    for n, text in outputs.items():
        (HERE / n).write_text(text, encoding="utf-8")
        print("Wrote", (HERE / n).relative_to(HERE.parent))
    return 0


if __name__ == "__main__":
    sys.exit(main())
