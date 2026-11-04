#!/usr/bin/env python3
"""Size up what a native port of each SquirrelGo app would have to replace.

Spike code for the native apps decision (#197). It only reads the repo and
prints a Markdown table; it changes nothing.

For every app under SquirrelGo-Apps/ that has both an android/ and a www/
folder, it reports:

  - app JS: lines of the app's own JavaScript in www/js/, leaving out the
    copies of SquirrelGo-Apps/shared/ that sync-shared.sh puts there
  - shared: which shared modules the app carries (strokes, writepad, ...)
  - data: size of www/data/ (content that moves to the shared source in #196)
  - audio: size of recorded audio anywhere under www/
  - bridge: the @JavascriptInterface methods its MainActivity exposes to the page

    python3 spikes/native-apps/inventory.py
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
APPS = ROOT / "SquirrelGo-Apps"
SHARED = {p.name for p in (APPS / "shared").glob("*.js")}
AUDIO = {".mp3", ".ogg", ".wav", ".m4a", ".opus"}


def size(paths):
    return sum(p.stat().st_size for p in paths if p.is_file())


def human(n):
    for unit in ("B", "KB", "MB", "GB"):
        if n < 1024 or unit == "GB":
            return f"{n:.0f} {unit}" if unit == "B" else f"{n:.1f} {unit}"
        n /= 1024


def lines(path):
    with path.open(encoding="utf-8", errors="replace") as f:
        return sum(1 for _ in f)


def bridge_methods(android):
    names = set()
    for src in android.rglob("*.java"):
        text = src.read_text(encoding="utf-8", errors="replace")
        names.update(re.findall(r"@JavascriptInterface\s+public\s+\w+\s+(\w+)\s*\(", text))
    for src in android.rglob("*.kt"):
        text = src.read_text(encoding="utf-8", errors="replace")
        names.update(re.findall(r"@JavascriptInterface\s+fun\s+(\w+)\s*\(", text))
    return sorted(names)


def apps():
    for www in sorted(APPS.rglob("www")):
        app = www.parent
        if www.is_dir() and (app / "android").is_dir():
            yield app


def main():
    rows = []
    for app in apps():
        www = app / "www"
        js = [p for p in (www / "js").glob("*.js")] if (www / "js").is_dir() else []
        own = [p for p in js if p.name not in SHARED]
        shared = sorted(p.stem for p in js if p.name in SHARED)
        data = list((www / "data").rglob("*")) if (www / "data").is_dir() else []
        audio = [p for p in www.rglob("*") if p.suffix.lower() in AUDIO]
        rows.append((
            app.relative_to(APPS).as_posix(),
            sum(lines(p) for p in own),
            ", ".join(shared) or "none",
            human(size(p for p in data if p.suffix.lower() not in AUDIO)),
            human(size(audio)),
            ", ".join(bridge_methods(app / "android")) or "none",
        ))
    if not rows:
        sys.exit("No apps found under SquirrelGo-Apps/")
    print("| App | App JS lines | Shared modules | Data | Audio | Bridge methods |")
    print("|---|---:|---|---:|---:|---|")
    for r in rows:
        print("| " + " | ".join(str(c) for c in r) + " |")


if __name__ == "__main__":
    main()
