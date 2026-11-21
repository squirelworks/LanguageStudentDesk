#!/usr/bin/env python3
"""Build the native Japanese-English dictionary catalog.

The word list is the WebView's generated data when that directory is present.
It is not copied into git. Dictionary packs stay in squirrel-lang-data; this
tool does not download one and does not invent entries. Without the word list
the catalog says it is not installed.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from kana_catalog import suite_settings


def call_args(text, name):
    token = name + "("
    at = text.find(token)
    if at < 0:
        raise SystemExit(f"Missing {name}()")
    decoder = json.JSONDecoder()
    i = at + len(token)
    args = []
    while True:
        while i < len(text) and text[i] in " \t\r\n,":
            i += 1
        if i >= len(text) or text[i] == ")":
            break
        value, i = decoder.raw_decode(text, i)
        args.append(value)
    return args


def load_words(data):
    meta = call_args((data / "meta.js").read_text(encoding="utf-8"), "JEDData.meta")[0]
    lines = []
    entries = []
    for path in sorted(data.glob("index-*.js")):
        shard, text = call_args(path.read_text(encoding="utf-8"), "JEDData.index")
        lines.extend(text.split("\n"))
        entry_path = data / ("entries-%02d.js" % shard)
        if entry_path.is_file():
            _, body = call_args(entry_path.read_text(encoding="utf-8"), "JEDData.entries")
            entries.extend(body)
    kanji = {}
    radicals = []
    kanji_path = data / "kanji.js"
    if kanji_path.is_file():
        kanji = call_args(kanji_path.read_text(encoding="utf-8"), "JEDData.kanji")[0]
    radical_path = data / "radicals.js"
    if radical_path.is_file():
        for radical, strokes, chars in call_args(radical_path.read_text(encoding="utf-8"), "JEDData.radicals")[0]:
            radicals.append({"r": radical, "s": strokes, "k": chars})
    meta_out = {
        "installed": True,
        "words": meta.get("words", len(lines)),
        "kanjiCount": meta.get("kanjiCount", len(kanji)),
        "jmdictDate": meta.get("jmdictDate", ""),
        "kanjidicDate": meta.get("kanjidicDate", ""),
        "version": meta.get("version", ""),
        "tags": meta.get("tags", {}),
    }
    return meta_out, [line for line in lines if line], entries, kanji, radicals


def empty_catalog():
    meta = {
        "installed": False,
        "words": 0,
        "kanjiCount": 0,
        "jmdictDate": "",
        "kanjidicDate": "",
        "version": "",
        "tags": {},
    }
    return meta, [], [], {}, []


def main():
    www = Path(sys.argv[1])
    dest = Path(sys.argv[2])
    dest.mkdir(parents=True, exist_ok=True)
    data = www / "data"
    if (data / "meta.js").is_file():
        meta, lines, entries, kanji, radicals = load_words(data)
    else:
        meta, lines, entries, kanji, radicals = empty_catalog()
    dump = lambda name, value: (dest / name).write_text(
        json.dumps(value, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
    dump("jed-meta.json", meta)
    dump("jed-index.json", lines)
    dump("jed-entries.json", entries)
    dump("jed-kanji.json", kanji)
    dump("jed-radicals.json", radicals)
    suite = www.parent.parent / "shared" / "suite.js"
    (dest / "suite.json").write_text(
        json.dumps(suite_settings(suite), ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
