#!/usr/bin/env python3
"""Copy the Math Learner into the Android asset tree.

The WebView opens

    file:///android_asset/www/SquirrelGo-Apps/math-student-desk/www/index.html

and the menu keeps the relative paths it already uses in the repo
(``../../../math-learner/...``, and the learner's ``../languages/...``).
The asset root is a mirror of the paths those links need, not a second copy
checked into git.

Only the learner page, its course scripts, and the shared JS/CSS those pages
load (including the feature switches) are packed. The rest of the Desk stays out.
"""

import argparse
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]

# Repo-relative paths. Each one is copied to <dest>/www/<same path>.
PATHS = [
    "math-learner/index.html",
    "math-learner/app.js",
    "math-learner/sections.js",
    "math-learner/data",
    "languages/learners.css",
    "languages/lsd-lang.js",
    "languages/features.js",
    "languages/lsd-features.js",
    "languages/lsd-features.css",
    "SquirrelGo-Apps/math-student-desk/www/index.html",
]

# Present after a successful pack. Paths are under <dest>/www/.
REQUIRED = [
    "SquirrelGo-Apps/math-student-desk/www/index.html",
    "math-learner/index.html",
    "math-learner/app.js",
    "math-learner/sections.js",
    "math-learner/data/catalog.js",
    "math-learner/data/arithmetic.js",
    "languages/learners.css",
    "languages/lsd-lang.js",
    "languages/features.js",
    "languages/lsd-features.js",
    "languages/lsd-features.css",
]


def copy_path(src, dest):
    if src.is_dir():
        shutil.copytree(
            src,
            dest,
            ignore=shutil.ignore_patterns("__pycache__", "*.pyc", ".DS_Store"),
        )
    else:
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dest", required=True)
    args = ap.parse_args()
    www = Path(args.dest) / "www"
    if www.exists():
        shutil.rmtree(www)
    www.mkdir(parents=True)
    for rel in PATHS:
        src = ROOT / rel
        if not src.exists():
            print(f"missing {rel}", file=sys.stderr)
            return 1
        copy_path(src, www / rel)
    missing = [p for p in REQUIRED if not (www / p).is_file()]
    if missing:
        print("pack incomplete: " + ", ".join(missing), file=sys.stderr)
        return 1
    catalog = (www / "math-learner/data/catalog.js").read_text(encoding="utf-8")
    ids = re.findall(r'"id"\s*:\s*"([^"]+)"', catalog)
    if "arithmetic" not in ids:
        print("catalog.js is missing Arithmetic", file=sys.stderr)
        return 1
    absent = [i for i in ids if not (www / "math-learner/data" / f"{i}.js").is_file()]
    if absent:
        print("catalog ids without a course: " + ", ".join(absent), file=sys.stderr)
        return 1
    print(f"packed {len(ids)} math courses into {www}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
