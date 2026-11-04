#!/usr/bin/env python3
"""Write orthodox-bible-content.json, the list of downloadable packs that a
GitHub release carries.

The app reads it from the latest release (see README.md, "From the latest
GitHub release"). Each entry is the pack's catalog entry plus:

- "file": the release asset that holds the pack (orthodox-bible-<id>.js or
  orthodox-commentary-<id>.js), and
- "url": the same file on the orthodox-bible-texts branch, for browsers that
  can't read release assets.

Usage: python3 build_content_index.py OUT.json [--source-commit SHA]
"""
import json
import os
import sys

from common import COMMENTARY_PACKS_JSON, PACKS_JSON
from sources import COMMENTARY_PACK_URL, PACK_URL

FORMAT = 1
BIBLE_KEYS = ("id", "name", "lang", "dir", "versification", "license", "source", "testaments", "size")
COMMENTARY_KEYS = ("id", "author", "work", "lang", "license", "source", "tradition", "books", "size")


def asset_name(kind, id):
    return "orthodox-%s-%s.js" % (kind, id)


def read(path):
    if not os.path.exists(path):
        return []
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def build(source_commit=""):
    bibles = []
    for e in read(PACKS_JSON):
        entry = {k: e[k] for k in BIBLE_KEYS if k in e}
        entry["file"] = asset_name("bible", e["id"])
        entry["url"] = PACK_URL + e["id"] + ".js"
        bibles.append(entry)
    commentary = []
    for e in read(COMMENTARY_PACKS_JSON):
        entry = {k: e[k] for k in COMMENTARY_KEYS if k in e}
        entry["file"] = asset_name("commentary", e["id"])
        entry["url"] = COMMENTARY_PACK_URL + e["id"] + ".js"
        commentary.append(entry)
    return {"format": FORMAT, "app": "squirrelgo-orthodox-bible", "source_commit": source_commit,
            "bibles": bibles, "commentary": commentary}


def main(args):
    if not args:
        sys.exit(__doc__)
    out = args[0]
    sha = args[args.index("--source-commit") + 1] if "--source-commit" in args else ""
    index = build(sha)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print("%s: %d Bibles, %d commentary packs" % (out, len(index["bibles"]), len(index["commentary"])))


if __name__ == "__main__":
    main(sys.argv[1:])
