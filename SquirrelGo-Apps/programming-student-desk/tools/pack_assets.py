#!/usr/bin/env python3
"""Copy the Programming Learner into the Android asset tree.

The WebView opens

    file:///android_asset/www/SquirrelGo-Apps/programming-student-desk/www/index.html

and the menu keeps the relative paths it already uses in the repo
(``../../../programming-learner/...``, and the learner's ``../languages/...``).
The asset root is a mirror of the paths those links need, not a second copy
checked into git.

Only the learner page, its course scripts, and the shared JS/CSS those pages
load are packed. The rest of the Desk stays out.
"""

import argparse
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]

# Repo-relative paths. Each one is copied to <dest>/www/<same path>.
PATHS = [
    "programming-learner/index.html",
    "programming-learner/app.js",
    "programming-learner/data",
    "languages/learners.css",
    "languages/lsd-lang.js",
    "SquirrelGo-Apps/programming-student-desk/www/index.html",
]

# Present after a successful pack. Paths are under <dest>/www/.
REQUIRED = [
    "SquirrelGo-Apps/programming-student-desk/www/index.html",
    "programming-learner/index.html",
    "programming-learner/app.js",
    "programming-learner/data/catalog.js",
    "programming-learner/data/slick.js",
    "programming-learner/data/chisel.js",
    "languages/learners.css",
    "languages/lsd-lang.js",
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
    catalog = (www / "programming-learner/data/catalog.js").read_text(encoding="utf-8")
    ids = re.findall(r'\bid:\s*"([^"]+)"', catalog)
    if "slick" not in ids or "chisel" not in ids:
        print("catalog.js is missing Slick or Chisel", file=sys.stderr)
        return 1
    absent = [i for i in ids if not (www / "programming-learner/data" / f"{i}.js").is_file()]
    if absent:
        print("catalog ids without a course: " + ", ".join(absent), file=sys.stderr)
        return 1
    print(f"packed {len(ids)} programming courses into {www}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
