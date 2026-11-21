#!/usr/bin/env python3
"""Turn the generated Kana lesson and stroke files into JSON the native app reads.

The inputs are the files already generated from the pinned squirrel-lang-data
commit. This does not invent a character list.
"""

import json
import pathlib
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


if __name__ == "__main__":
    main()
