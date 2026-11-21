#!/usr/bin/env python3
"""Turn the SquirrelGo Klingon WebView files into JSON and clips the native app reads.

The lessons, strokes, and recordings stay in the WebView tree. This does not
keep a second copy of them.
"""

import json
import pathlib
import shutil
import subprocess
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from kana_catalog import suite_settings

_EVAL = r"""
const fs = require("fs");
const vm = require("vm");
const [klingon, app, strokes, css] = process.argv.slice(1);
const sandbox = { window: {} };
function run(file) {
  vm.runInNewContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
}
run(klingon);
run(app);
run(strokes);
let accent = "";
const text = fs.readFileSync(css, "utf8");
const match = text.match(/--accent:\s*(#[0-9a-fA-F]{3,8})/);
if (match) accent = match[1];
const data = sandbox.window.SG_KLINGON;
const meta = sandbox.window.SG_APP;
const table = sandbox.window.SG_STROKES;
if (!data || !data.lessons) {
  console.error("SG_KLINGON is missing");
  process.exit(1);
}
process.stdout.write(JSON.stringify({ data, meta, strokes: table || {}, accent }));
"""

def letter_file(code_point):
    return f"l-{code_point:x}.mp3"


def word_file(word):
    out = []
    for ch in word.replace("'", "7").replace(" ", "-"):
        out.append("_" + ch.lower() if ch.isupper() else ch)
    return "w-" + "".join(out) + ".mp3"


def load(paths):
    try:
        result = subprocess.run(["node", "-e", _EVAL, *paths], check=False, capture_output=True)
    except FileNotFoundError:
        raise SystemExit("node is required to read the Klingon WebView files and was not found")
    if result.returncode != 0:
        detail = (result.stderr or result.stdout or b"").decode("utf-8", "replace").strip()
        raise SystemExit(f"Could not read the Klingon WebView files:\n{detail}")
    return json.loads(result.stdout)


def referenced_clips(data):
    names = []
    for lesson in data["lessons"]:
        numerals = bool(lesson.get("numerals"))
        for row in lesson["chars"]:
            roman, code, _hint, _like, example, _meaning = row
            if numerals:
                names.append(word_file(example))
            else:
                names.append(letter_file(code))
                names.append(word_file(example))
    for word, _meaning in data.get("words", []):
        names.append(word_file(word))
    return names


def main():
    www = pathlib.Path(sys.argv[1])
    dest = pathlib.Path(sys.argv[2])
    loaded = load([
        str(www / "data" / "klingon.js"),
        str(www / "data" / "app.js"),
        str(www / "data" / "strokes.js"),
        str(www / "css" / "app.css"),
    ])
    data = loaded["data"]
    audio = www / "audio"
    missing = sorted({name for name in referenced_clips(data) if not (audio / name).is_file()})
    if missing:
        raise SystemExit("Klingon recordings are missing:\n" + "\n".join(missing))
    if dest.exists():
        shutil.rmtree(dest)
    dest.mkdir(parents=True)
    clips = dest / "clips"
    clips.mkdir()
    for mp3 in sorted(audio.glob("*.mp3")):
        shutil.copy2(mp3, clips / mp3.name)
    fonts = dest / "fonts"
    fonts.mkdir()
    for font in (www / "fonts").glob("*.ttf"):
        shutil.copy2(font, fonts / font.name)
    payload = {
        "ipa": data.get("ipa", {}),
        "lessons": data.get("lessons", []),
        "words": data.get("words", []),
        "articles": data.get("articles", []),
        "accent": loaded.get("accent") or "",
        "app": loaded.get("meta") or {},
    }
    (dest / "klingon.json").write_text(json.dumps(payload, ensure_ascii=False))
    (dest / "strokes.json").write_text(json.dumps(loaded["strokes"], ensure_ascii=False))
    suite = www.parent.parent.parent / "shared" / "suite.js"
    if not suite.is_file():
        suite = pathlib.Path(__file__).resolve().parents[2] / "SquirrelGo-Apps" / "shared" / "suite.js"
    (dest / "suite.json").write_text(json.dumps(suite_settings(suite), ensure_ascii=False))
    letters = sum(len(lesson["chars"]) for lesson in data["lessons"])
    print(f"klingon lessons {len(data['lessons'])} letters {letters} clips {len(list(clips.glob('*.mp3')))}")


if __name__ == "__main__":
    main()
