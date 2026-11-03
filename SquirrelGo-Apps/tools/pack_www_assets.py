#!/usr/bin/env python3
"""Copy an app's www/ tree into the Android asset root (dest/www/).

Release WebViews load file:///android_asset/www/index.html; this task must
run before mergeReleaseAssets or the store build shows ERR_FILE_NOT_FOUND.
"""

from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True, help="Path to the app's www/ directory")
    ap.add_argument("--dest", required=True, help="Generated asset root (parent of www/)")
    args = ap.parse_args()
    src = Path(args.src).resolve()
    dest_root = Path(args.dest).resolve()
    index = src / "index.html"
    if not index.is_file():
        print(f"pack_www_assets: missing {index}", file=sys.stderr)
        return 1
    www = dest_root / "www"
    if www.exists():
        shutil.rmtree(www)
    shutil.copytree(
        src,
        www,
        ignore=shutil.ignore_patterns("__pycache__", "*.pyc", ".DS_Store"),
    )
    count = sum(1 for p in www.rglob("*") if p.is_file())
    if not (www / "index.html").is_file():
        print("pack_www_assets: index.html missing after copy", file=sys.stderr)
        return 1
    print(f"pack_www_assets: {count} files -> {www}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
