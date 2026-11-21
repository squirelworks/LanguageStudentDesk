#!/usr/bin/env python3
"""Build the native Japanese-English dictionary catalog.

The word list is the same generated data the WebView uses. tools/fetch_data.sh
downloads the jmdict-simplified release and tools/build_data.py writes www/data/.
This tool reads those files. It does not invent entries.

Without www/data/meta.js the tool exits. Pass --allow-empty only for a
compile check that is not installed: the catalog then says the word list is
not installed. Release, test APK and desktop package builds do not pass that
flag, so they fail until fetch_data.sh has been run.
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


SHARD = 4096


def main():
    args = [arg for arg in sys.argv[1:] if arg != "--allow-empty"]
    allow_empty = "--allow-empty" in sys.argv[1:]
    if len(args) != 2:
        raise SystemExit("usage: jed_catalog.py [--allow-empty] WWW DEST")
    www = Path(args[0])
    dest = Path(args[1])
    dest.mkdir(parents=True, exist_ok=True)
    for stale in ("jed-index.json", "jed-entries.json"):
        old = dest / stale
        if old.is_file():
            old.unlink()
    data = www / "data"
    if (data / "meta.js").is_file():
        meta, lines, entries, kanji, radicals = load_words(data)
    elif allow_empty:
        meta, lines, entries, kanji, radicals = empty_catalog()
    else:
        raise SystemExit(
            "The Japanese-English word list is missing. "
            "Run SquirrelGo-Apps/squirrelgo-dictionary/tools/fetch_data.sh before this build."
        )
    dump = lambda name, value: (dest / name).write_text(
        json.dumps(value, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
    dump("jed-meta.json", meta)
    (dest / "jed-index.txt").write_text("\n".join(lines) + ("\n" if lines else ""), encoding="utf-8")
    shard_dir = dest / "jed-entries"
    if shard_dir.is_dir():
        for old in shard_dir.glob("*.json"):
            old.unlink()
    shard_dir.mkdir(exist_ok=True)
    shards = (len(entries) + SHARD - 1) // SHARD if entries else 0
    for shard in range(shards):
        chunk = entries[shard * SHARD:(shard + 1) * SHARD]
        (shard_dir / ("%02d.json" % shard)).write_text(
            json.dumps(chunk, ensure_ascii=False, separators=(",", ":")),
            encoding="utf-8",
        )
    dump("jed-kanji.json", kanji)
    dump("jed-radicals.json", radicals)
    suite = www.parent.parent / "shared" / "suite.js"
    (dest / "suite.json").write_text(
        json.dumps(suite_settings(suite), ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
