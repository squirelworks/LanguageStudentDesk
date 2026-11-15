#!/usr/bin/env python3
"""Validate Math Learner packs: catalog ids load and practice answers exist."""
from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
NS = "MATH"

DUMP = r"""
const fs = require("fs");
const ns = process.env.LSD_NS;
const file = process.env.LSD_FILE;
const mode = process.env.LSD_MODE;
global.window = global;
global[ns] = global[ns] || {};
eval(fs.readFileSync(file, "utf8"));
const out = mode === "catalog" ? global[ns + "_CATALOG"] : global[ns][mode];
process.stdout.write(JSON.stringify(out));
"""


def dump(path: Path, mode: str) -> dict:
    env = {**os.environ, "LSD_NS": NS, "LSD_FILE": str(path), "LSD_MODE": mode}
    r = subprocess.run(
        ["node", "-e", DUMP],
        capture_output=True,
        text=True,
        check=False,
        env=env,
    )
    if r.returncode:
        raise SystemExit(f"{path}: {r.stderr or r.stdout}")
    return json.loads(r.stdout)


def main() -> int:
    catalog = dump(DATA / "catalog.js", "catalog")
    problems: list[str] = []
    lessons = 0
    for c in catalog:
        path = DATA / f"{c['id']}.js"
        if not path.is_file():
            problems.append(f"missing {path.name}")
            continue
        pack = dump(path, c["id"])
        if pack.get("id") != c["id"]:
            problems.append(f"{path.name}: id {pack.get('id')!r} != catalog {c['id']!r}")
        for L in pack.get("lessons") or []:
            lessons += 1
            for q in L.get("practice") or []:
                if q.get("answer") not in (q.get("options") or []):
                    problems.append(f"{c['id']}/{L.get('id')}: answer not in options")
    if problems:
        print("\n".join(problems))
        return 1
    print(f"math: {len(catalog)} courses, {lessons} lessons OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
