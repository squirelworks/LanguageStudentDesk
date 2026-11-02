#!/usr/bin/env python3
"""Merge JSON lesson additions into languages/hangul/grammar.js and taiwanese/grammar.js."""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
DATA = Path(__file__).resolve().parent


def load_ids(lang: str) -> set[str]:
    text = (ROOT / "languages" / lang / "grammar.js").read_text(encoding="utf-8")
    if lang == "hangul":
        return set(re.findall(r'\bid:\s*"([^"]+)"', text))
    return set(re.findall(r'"id":\s*"([^"]+)"', text))


def js_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def hangul_lesson_js(lesson: dict) -> str:
    lines = [
        "    {",
        f'      id: {js_str(lesson["id"])},',
        f'      level: {js_str(lesson["level"])},',
        f'      title: {js_str(lesson["title"])},',
        f'      particle: {js_str(lesson["particle"])},',
        f'      summary: {js_str(lesson["summary"])},',
        "      sections: [",
    ]
    for sec in lesson["sections"]:
        lines.append("        {")
        if sec.get("h"):
            lines.append(f'          h: {js_str(sec["h"])},')
        lines.append(f'          p: {js_str(sec["p"])},')
        if sec.get("examples"):
            lines.append("          examples: [")
            for ex in sec["examples"]:
                lines.append("            [" + ", ".join(js_str(x) for x in ex) + "],")
            lines.append("          ],")
        lines.append("        },")
    lines.append("      ],")
    lines.append("      drills: [")
    for dr in lesson["drills"]:
        opts = ", ".join(js_str(o) for o in dr["options"])
        lines.append(
            "        { "
            + f"q: {js_str(dr['q'])}, en: {js_str(dr.get('en', ''))}, "
            + f"options: [{opts}], answer: {js_str(dr['answer'])}, "
            + f"why: {js_str(dr['why'])} }},"
        )
    lines.append("      ],")
    lines.append("    },")
    return "\n".join(lines)


def taiwanese_lesson_js(lesson: dict) -> str:
    return json.dumps(lesson, ensure_ascii=False, indent=2) + ","


def insert_fragment(path: Path, fragment: str, lang: str) -> int:
    text = path.read_text(encoding="utf-8")
    if not fragment.strip():
        return 0
    if lang == "taiwanese":
        needle = "    }\n  ]\n};"
        if needle not in text:
            raise SystemExit(f"marker not found in {path}")
        path.write_text(text.replace(needle, "    },\n" + fragment + "\n  ]\n};", 1), encoding="utf-8")
        return 1
    marker = "  ],\n};"
    if marker not in text:
        raise SystemExit(f"marker not found in {path}")
    path.write_text(text.replace(marker, fragment + "\n" + marker, 1), encoding="utf-8")
    return 1


def merge_lang(lang: str, json_path: Path, formatter) -> int:
    additions = json.loads(json_path.read_text(encoding="utf-8"))
    existing = load_ids(lang)
    new = [L for L in additions if L["id"] not in existing]
    if not new:
        return 0
    frag = "\n".join(formatter(L) for L in new)
    insert_fragment(ROOT / "languages" / lang / "grammar.js", frag, lang)
    return len(new)


def main() -> int:
    n_ko = merge_lang("hangul", DATA / "ko_lessons_all.json", hangul_lesson_js)
    n_tw = merge_lang("taiwanese", DATA / "tw_lessons_all.json", taiwanese_lesson_js)
    print(f"Added {n_ko} hangul and {n_tw} taiwanese lessons")
    for cmd in (
        ["node", "--check", str(ROOT / "languages/hangul/grammar.js")],
        ["node", "--check", str(ROOT / "languages/taiwanese/grammar.js")],
        ["python3", str(ROOT / "languages/tools/check_ko_tw_grammar.py")],
        ["python3", str(ROOT / "languages/coverage.py")],
    ):
        proc = subprocess.run(cmd, cwd=ROOT)
        if proc.returncode != 0:
            return proc.returncode
    return 0


if __name__ == "__main__":
    sys.exit(main())
