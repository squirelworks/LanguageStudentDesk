#!/usr/bin/env python3
"""Validate hangul and taiwanese grammar.js: drills, unique ids, 12+ lessons per level."""
from __future__ import annotations

import json
import subprocess
import sys
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
MIN_PER_LEVEL = 12

NODE = r"""
const fs = require("fs");
const vm = require("vm");
const id = process.argv[2];
const path = "languages/" + id + "/grammar.js";
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path, "utf8"), sandbox);
const course = sandbox.window.GRAMMAR[id];
const out = { ids: [], levels: {}, drillProblems: [] };
for (const lesson of course.lessons || []) {
  out.ids.push(lesson.id);
  const lv = lesson.level || "";
  out.levels[lv] = (out.levels[lv] || 0) + 1;
  for (const d of lesson.drills || []) {
    const opts = d.options || [];
    if (new Set(opts).size !== opts.length) {
      out.drillProblems.push(lesson.id + ": duplicate options");
    }
    if (!opts.includes(d.answer)) {
      out.drillProblems.push(lesson.id + ": answer not in options");
    }
  }
}
process.stdout.write(JSON.stringify(out));
"""


def load_lang(lang: str) -> dict:
    proc = subprocess.run(
        ["node", "-e", NODE, str(ROOT), lang],
        capture_output=True,
        text=True,
        check=False,
        cwd=ROOT,
    )
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr or proc.stdout)
    return json.loads(proc.stdout)


def main() -> int:
    failed = False
    for lang in ("hangul", "taiwanese"):
        info = load_lang(lang)
        ids = info["ids"]
        if len(ids) != len(set(ids)):
            dup = [i for i in ids if ids.count(i) > 1]
            print(f"{lang}: duplicate lesson ids: {sorted(set(dup))}", file=sys.stderr)
            failed = True
        if info["drillProblems"]:
            print(f"{lang}: drill problems:", file=sys.stderr)
            for p in info["drillProblems"]:
                print(f"  · {p}", file=sys.stderr)
            failed = True
        levels = info["levels"]
        print(f"{lang}: total {len(ids)} lessons")
        for lv in LEVELS:
            n = levels.get(lv, 0)
            mark = "OK" if n >= MIN_PER_LEVEL else "FAIL"
            print(f"  {lv}: {n} [{mark}]")
            if n < MIN_PER_LEVEL:
                failed = True
        missing = [lv for lv in LEVELS if levels.get(lv, 0) < MIN_PER_LEVEL]
        if missing:
            print(f"{lang}: need more in: {', '.join(missing)}", file=sys.stderr)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
