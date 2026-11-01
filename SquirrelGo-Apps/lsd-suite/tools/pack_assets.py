#!/usr/bin/env python3
"""Copy Desk learners into the Android asset tree.

The WebView opens

    file:///android_asset/www/SquirrelGo-Apps/lsd-suite/www/index.html

and every learner keeps the relative paths it already uses in the repo
(``../languages/...``, ``../SquirrelGo-Apps/...``). The asset root is a
mirror of the paths those links need, not a second copy checked into git.

Phrasebook recordings are left out: the learners read packs.js, not the
clips. Generated JMdict shards are not in the repo, so they are not packed.
"""

import argparse
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]

# Repo-relative directories. Each one is copied to <dest>/www/<same path>.
TREES = [
    "grammar-learner",
    "vocabulary-learner",
    "language-learner",
    "programming-learner",
    "legalese-learner",
    "translation-learner",
    "reference-learner",
    "resource-learner",
    "character-learner",
    "klingon",
    "languages",
    "SquirrelGo-Apps/lsd-suite/www",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/www",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/www",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/www",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-klingon/www",
    "SquirrelGo-Apps/squirrelgo-phrasebook/www",
    "SquirrelGo-Apps/squirrelgo-dictionary/www",
]

# Present after a successful pack. Paths are under <dest>/www/.
REQUIRED = [
    "SquirrelGo-Apps/lsd-suite/www/index.html",
    "grammar-learner/index.html",
    "vocabulary-learner/index.html",
    "language-learner/index.html",
    "programming-learner/index.html",
    "programming-learner/data/catalog.js",
    "programming-learner/data/chisel.js",
    "legalese-learner/index.html",
    "translation-learner/index.html",
    "reference-learner/index.html",
    "resource-learner/index.html",
    "character-learner/index.html",
    "klingon/index.html",
    "languages/registry.js",
    "languages/lsd-lang.js",
    "languages/learners.css",
    "languages/reference.js",
    "languages/klingon/piqad.css",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/www/data/kana.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/www/data/audio/hiragana.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/www/data/latin.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/www/data/kanji.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-klingon/www/data/strokes.js",
    "SquirrelGo-Apps/squirrelgo-phrasebook/www/data/packs.js",
    "SquirrelGo-Apps/squirrelgo-phrasebook/www/js/romaji.js",
    "SquirrelGo-Apps/squirrelgo-dictionary/www/js/search.js",
]


def skip(repo_rel):
    text = repo_rel.as_posix()
    if "__pycache__" in repo_rel.parts or ".git" in repo_rel.parts:
        return True
    if text.startswith("SquirrelGo-Apps/squirrelgo-phrasebook/www/audio"):
        return True
    if repo_rel.suffix == ".pyc" or repo_rel.name == ".DS_Store":
        return True
    return False


def copy_tree(rel, www):
    src = ROOT / rel
    if not src.is_dir():
        sys.exit(f"pack_assets: missing {rel}")
    dst = www / rel
    dst.parent.mkdir(parents=True, exist_ok=True)

    def ignore(dirpath, names):
        base = Path(dirpath)
        dropped = []
        for name in names:
            if skip((base / name).resolve().relative_to(ROOT)):
                dropped.append(name)
        return dropped

    shutil.copytree(src, dst, ignore=ignore, dirs_exist_ok=True)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--dest", type=Path, required=True, help="Asset source dir (www/ is created inside it)")
    args = ap.parse_args()
    dest = args.dest.resolve()
    www = dest / "www"
    if www.exists():
        shutil.rmtree(www)
    www.mkdir(parents=True)
    for rel in TREES:
        copy_tree(rel, www)
    missing = [rel for rel in REQUIRED if not (www / rel).exists()]
    if missing:
        sys.exit("pack_assets: packed tree is incomplete:\n  " + "\n  ".join(missing))
    files = [p for p in www.rglob("*") if p.is_file()]
    total = sum(p.stat().st_size for p in files)
    print(f"pack_assets: {len(files)} files, {total / 1e6:.1f} MB -> {www}")


if __name__ == "__main__":
    main()
