#!/usr/bin/env python3
"""Turn the SquirrelGo Kanji WebView data files into JSON the native app reads.

The inputs are the files already generated for the WebView. This does not
invent a character list.
"""

import json
import pathlib
import subprocess
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from kana_catalog import suite_settings

_EVAL = r"""
const fs = require("fs");
const vm = require("vm");
const [catalog, lessons, kanji, words, strokes, css] = process.argv.slice(1);
const sandbox = { window: {} };
function run(file) {
  vm.runInNewContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
}
run(catalog);
run(lessons);
run(kanji);
run(words);
run(strokes);
const table = {};
for (const [ch, entry] of Object.entries(sandbox.window.KANJI_STROKES || {})) {
  const shaped = entry && Array.isArray(entry[0]) && typeof entry[0][0] === "string";
  const paths = shaped ? entry[0] : (entry || []).map((row) => (typeof row === "string" ? row : row && row[0]));
  const labels = shaped ? (entry[1] || []) : [];
  table[ch] = {
    paths: (paths || []).filter((p) => typeof p === "string" && p),
    labels: (labels || []).filter((p) => Array.isArray(p) && p.length >= 2).map((p) => [Number(p[0]), Number(p[1])]),
  };
}
let accent = "";
if (css) {
  const text = fs.readFileSync(css, "utf8");
  const match = text.match(/--accent:\s*(#[0-9a-fA-F]{3,8})/);
  if (match) accent = match[1];
}
process.stdout.write(JSON.stringify({
  catalog: sandbox.DESK_CATALOG,
  lessons: sandbox.window.DESK_LESSONS,
  kanji: sandbox.SCRIPTS && sandbox.SCRIPTS.kanji,
  words: sandbox.window.KANJI_WORDS || {},
  sentences: sandbox.window.KANJI_SENTENCES || {},
  strokes: table,
  accent: accent,
}));
"""


def load(paths):
    try:
        result = subprocess.run(
            ["node", "-e", _EVAL, *paths],
            check=False,
            capture_output=True,
        )
    except FileNotFoundError:
        raise SystemExit("node is required to read the Kanji WebView files and was not found")
    if result.returncode != 0:
        detail = (result.stderr or result.stdout or b"").decode("utf-8", "replace").strip()
        raise SystemExit(f"Could not read the Kanji WebView files:\n{detail}")
    return json.loads(result.stdout)


def main():
    root = pathlib.Path(sys.argv[1])
    dest = pathlib.Path(sys.argv[2])
    css = root / "css" / "app.css"
    data = load([
        str(root / "data" / "catalog.js"),
        str(root / "js" / "lessons.js"),
        str(root / "data" / "kanji.js"),
        str(root / "data" / "words.js"),
        str(root / "data" / "strokes.js"),
        str(css) if css.is_file() else "",
    ])
    if not data.get("kanji") or not data["kanji"].get("chars"):
        raise SystemExit("Kanji character table is missing")
    if not data.get("catalog") or not data.get("lessons"):
        raise SystemExit("Kanji catalog or lessons are missing")
    dest.mkdir(parents=True, exist_ok=True)
    kanji = data["kanji"]
    (dest / "kanji.json").write_text(json.dumps(
        {"chars": kanji.get("chars", []), "groups": kanji.get("groups", []), "accent": data.get("accent") or ""},
        ensure_ascii=False,
    ))
    (dest / "catalog.json").write_text(json.dumps(data["catalog"], ensure_ascii=False))
    (dest / "lessons.json").write_text(json.dumps(data["lessons"], ensure_ascii=False))
    (dest / "words.json").write_text(json.dumps(
        {"words": data["words"], "sentences": data["sentences"]},
        ensure_ascii=False,
    ))
    (dest / "strokes.json").write_text(json.dumps(data["strokes"], ensure_ascii=False))
    suite = root.parent.parent.parent / "shared" / "suite.js"
    if not suite.is_file():
        suite = pathlib.Path(__file__).resolve().parents[2] / "SquirrelGo-Apps" / "shared" / "suite.js"
    (dest / "suite.json").write_text(json.dumps(suite_settings(suite), ensure_ascii=False))
    print(f"kanji {len(kanji.get('chars', []))} groups {len(kanji.get('groups', []))} strokes {len(data['strokes'])}")


if __name__ == "__main__":
    main()
