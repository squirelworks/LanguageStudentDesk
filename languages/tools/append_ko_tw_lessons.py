#!/usr/bin/env python3
"""Append level-tagged grammar lessons until hangul and taiwanese reach 12 per level."""
from __future__ import annotations

import json
import re
import subprocess
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LEVELS = [
    "absolute-beginner",
    "beginner",
    "beginner-intermediate",
    "intermediate",
    "advanced-intermediate",
    "advanced",
]
MIN = 12


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
        if "h" in sec:
            lines.append(f'          h: {js_str(sec["h"])},')
        lines.append(f'          p: {js_str(sec["p"])},')
        if sec.get("examples"):
            lines.append("          examples: [")
            for ex in sec["examples"]:
                lines.append(
                    "            ["
                    + ", ".join(js_str(x) for x in ex)
                    + "],"
                )
            lines.append("          ],")
        lines.append("        },")
    lines.append("      ],")
    lines.append("      drills: [")
    for d in lesson["drills"]:
        opts = ", ".join(js_str(o) for o in d["options"])
        lines.append(
            "        { "
            + f"q: {js_str(d['q'])}, "
            + f"en: {js_str(d.get('en', ''))}, "
            + f"options: [{opts}], "
            + f"answer: {js_str(d['answer'])}, "
            + f"why: {js_str(d['why'])} "
            + "},"
        )
    lines.append("      ],")
    lines.append("    },")
    return "\n".join(lines)


def taiwanese_lesson_js(lesson: dict) -> str:
    blob = json.dumps(lesson, ensure_ascii=False, indent=2)
    indented = textwrap.indent(blob, "    ")
    return indented + ","


def load_existing_ids(lang: str) -> set[str]:
    path = ROOT / "languages" / lang / "grammar.js"
    text = path.read_text(encoding="utf-8")
    if lang == "hangul":
        return set(re.findall(r'\bid:\s*"([^"]+)"', text))
    return set(re.findall(r'"id":\s*"([^"]+)"', text))


def count_levels(lang: str) -> dict[str, int]:
    proc = subprocess.run(
        [
            "python3",
            str(ROOT / "languages/tools/check_ko_tw_grammar.py"),
        ],
        capture_output=True,
        text=True,
        cwd=ROOT,
    )
    # parse from check output is awkward; use node inline
    node = """
const fs=require('fs');const vm=require('vm');
const id=process.argv[1];
const s={window:{}}; vm.runInNewContext(fs.readFileSync('languages/'+id+'/grammar.js','utf8'),s);
const c={}; for (const l of s.window.GRAMMAR[id].lessons) c[l.level]=(c[l.level]||0)+1;
console.log(JSON.stringify(c));
"""
    proc = subprocess.run(
        ["node", "-e", node, lang],
        capture_output=True,
        text=True,
        cwd=ROOT,
        check=True,
    )
    return json.loads(proc.stdout)


def insert_before_close(path: Path, fragment: str) -> None:
    text = path.read_text(encoding="utf-8")
    marker = "  ],\n};"
    if marker not in text:
        raise SystemExit(f"marker not found in {path}")
    if not fragment.strip():
        return
    text = text.replace(marker, fragment + "\n" + marker, 1)
    path.write_text(text, encoding="utf-8")


def drill(q, en, answer, wrong, why):
    opts = [answer] + list(wrong)
    return {"q": q, "en": en, "options": opts, "answer": answer, "why": why}


def sec(p, examples=None, h=None):
    s = {"p": p}
    if h:
        s["h"] = h
    if examples:
        s["examples"] = examples
    return s


# --- Korean extra lessons (content original for this project) ---

KO_EXTRA: list[dict] = []
