#!/usr/bin/env python3
"""Turn the Orthodox Bible WebView data into JSON the native app reads.

Bundled texts stay in the WebView tree. Downloadable packs are listed in the
catalog and are not copied: the app fetches those from the orthodox-bible-packs
release, the same place the WebView uses.
"""

import json
import pathlib
import shutil
import subprocess
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from kana_catalog import suite_settings


def load_books(path):
    script = """
const fs = require("fs");
const vm = require("vm");
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(process.argv[1], "utf8"), sandbox, { filename: process.argv[1] });
if (!sandbox.window.SGO_BOOKS) {
  console.error("SGO_BOOKS is missing");
  process.exit(1);
}
process.stdout.write(JSON.stringify(sandbox.window.SGO_BOOKS));
"""
    try:
        result = subprocess.run(["node", "-e", script, str(path)], check=False, capture_output=True, text=True)
    except FileNotFoundError:
        raise SystemExit("node is required to read the book list and was not found")
    if result.returncode != 0:
        detail = (result.stderr or result.stdout or "").strip()
        raise SystemExit(f"Could not read {path}:\n{detail}")
    return json.loads(result.stdout)


def extract_json(path):
    text = path.read_text(encoding="utf-8")
    start = None
    for index, char in enumerate(text):
        if char in "{[":
            start = index
            break
    if start is None:
        raise SystemExit(f"No JSON value in {path}")
    try:
        value, _ = json.JSONDecoder().raw_decode(text[start:])
    except json.JSONDecodeError as err:
        raise SystemExit(f"Could not read {path}: {err}")
    return value


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")


def bundled(entries):
    return [entry for entry in entries if not entry.get("url")]


def convert(folder, names, dest):
    written = 0
    for name in names:
        source = folder / f"{name}.js"
        if not source.is_file():
            raise SystemExit(f"Bundled text is missing: {source}")
        write_json(dest / f"{name}.json", extract_json(source))
        written += 1
    return written


def main():
    if len(sys.argv) != 3:
        raise SystemExit("usage: bible_catalog.py WWW DEST")
    www = pathlib.Path(sys.argv[1])
    dest = pathlib.Path(sys.argv[2])
    data = www / "data"
    catalog = extract_json(data / "catalog.js")
    books = load_books(data / "books.js")
    versification = extract_json(data / "versification.js")
    lectionary = extract_json(data / "lectionary.js")
    suite_path = pathlib.Path(__file__).resolve().parents[2] / "SquirrelGo-Apps" / "shared" / "suite.js"
    if not suite_path.is_file():
        raise SystemExit(f"Suite file is missing: {suite_path}")
    if dest.exists():
        shutil.rmtree(dest)
    dest.mkdir(parents=True)
    write_json(dest / "catalog.json", catalog)
    write_json(dest / "books.json", books)
    write_json(dest / "versification.json", versification)
    write_json(dest / "lectionary.json", lectionary)
    write_json(dest / "suite.json", suite_settings(suite_path))
    bibles = convert(data / "bibles", [entry["id"] for entry in bundled(catalog.get("bibles", []))], dest / "bibles")
    commentary = convert(
        data / "commentary",
        [entry["id"] for entry in bundled(catalog.get("commentary", []))],
        dest / "commentary",
    )
    print(f"orthodox bible books {len(books)} bundled bibles {bibles} bundled commentary {commentary}")


if __name__ == "__main__":
    main()
