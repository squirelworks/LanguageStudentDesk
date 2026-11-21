#!/usr/bin/env python3
"""Turn the generated Kana lesson and stroke files into JSON the native app reads.

The inputs are the files already generated from the pinned squirrel-lang-data
commit. This does not invent a character list.
"""

import json
import pathlib
import shutil
import subprocess
import sys

FIELDS = ["g", "r", "hint", "ex", "exR", "exM", "speak", "ipa", "exLang", "exIpa"]


def extract_json(text, start):
    pairs = {"{": "}", "[": "]"}
    stack = [pairs[text[start]]]
    in_str = False
    esc = False
    for j in range(start + 1, len(text)):
        c = text[j]
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == '"':
                in_str = False
            continue
        if c == '"':
            in_str = True
        elif c in pairs:
            stack.append(pairs[c])
        elif c in "}]":
            if c != stack[-1]:
                raise SystemExit(f"Unbalanced {c} at {j}")
            stack.pop()
            if not stack:
                return text[start : j + 1]
    raise SystemExit("Unclosed JSON value")


def cell(raw):
    if raw is None:
        return None
    out = {}
    for i, name in enumerate(FIELDS):
        if i < len(raw) and raw[i] is not None:
            out[name] = raw[i]
    return out


def scripts(text):
    out = []
    needle = "SG_SCRIPTS.push("
    start = 0
    while True:
        at = text.find(needle, start)
        if at < 0:
            break
        brace = text.find("{", at)
        data = json.loads(extract_json(text, brace))
        for lesson in data.get("lessons", []):
            lesson["chars"] = [cell(c) for c in lesson.get("chars", [])]
        out.append(data)
        start = brace + 1
    if not out:
        raise SystemExit("No Kana scripts in the lesson file")
    return out


# The WebView file is JavaScript. Node evaluates it unchanged and prints
# window.SG_APP. A syntax error or a missing node binary fails the build.
_APP_EVAL = r"""
const fs = require("fs");
const vm = require("vm");
const file = process.argv[1];
const window = {};
try {
  vm.runInNewContext(fs.readFileSync(file, "utf8"), { window: window }, { filename: file });
} catch (err) {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
}
if (!window.SG_APP || typeof window.SG_APP !== "object") {
  console.error("window.SG_APP is missing after evaluating " + file);
  process.exit(1);
}
process.stdout.write(JSON.stringify(window.SG_APP));
"""


def app_settings(path):
    try:
        result = subprocess.run(
            ["node", "-e", _APP_EVAL, str(path)],
            check=False,
            capture_output=True,
            text=True,
        )
    except FileNotFoundError:
        raise SystemExit(f"node is required to read {path} and was not found")
    if result.returncode != 0:
        detail = (result.stderr or result.stdout or "").strip()
        raise SystemExit(f"Could not evaluate {path}:\n{detail}")
    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError as err:
        raise SystemExit(f"node did not print JSON for {path}: {err}")


def strokes(text):
    at = text.find('"] = {')
    if at < 0:
        raise SystemExit("No stroke table in the stroke file")
    return json.loads(extract_json(text, text.find("{", at)))


def main():
    lessons_path = pathlib.Path(sys.argv[1])
    stroke_dir = pathlib.Path(sys.argv[2])
    dest = pathlib.Path(sys.argv[3])
    lessons_name = sys.argv[4]
    strokes_name = sys.argv[5]
    tables = {}
    for path in sorted(stroke_dir.glob("*.js")):
        tables[path.stem] = strokes(path.read_text())
    if not tables:
        raise SystemExit(f"No stroke files in {stroke_dir}")
    dest.mkdir(parents=True, exist_ok=True)
    (dest / lessons_name).write_text(json.dumps(scripts(lessons_path.read_text()), ensure_ascii=False))
    (dest / strokes_name).write_text(json.dumps(tables, ensure_ascii=False))
    if len(sys.argv) > 6:
        audio_js = pathlib.Path(sys.argv[6])
        spoken = {}
        clip_root = dest / "clips"
        mp3_root = audio_js.parent.parent / "audio"
        for js in sorted(p for p in audio_js.glob("*.js")):
            mapping = strokes(js.read_text())
            spoken[js.stem] = mapping
            for filename in mapping.values():
                src = mp3_root / js.stem / filename
                if not src.is_file():
                    raise SystemExit(f"Missing recording {src}")
                target = clip_root / js.stem / filename
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(src, target)
        stem = lessons_name.removesuffix(".json")
        (dest / f"{stem}-audio.json").write_text(json.dumps(spoken, ensure_ascii=False))
    app_js = lessons_path.parent / "app.js"
    if app_js.is_file() and lessons_path.is_file():
        data = app_settings(app_js)
        (dest / "app.json").write_text(json.dumps(data, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    main()
