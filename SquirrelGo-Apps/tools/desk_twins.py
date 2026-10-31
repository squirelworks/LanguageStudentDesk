#!/usr/bin/env python3
"""Keep the desk's twins of the SquirrelGo apps in step. Run by sync-shared.sh.

    desk_twins.py          rewrite Character Learner's Alphabets script list
    desk_twins.py --check  report drift and exit 1 (CI)

What it looks after:
  * character-learner/index.html loads the same Alphabets data files, in the
    same order, as the Alphabets app's own index.html (the block between the
    sg-alphabets markers is generated).
  * Every ../SquirrelGo-Apps/ file the desk twins (character-learner, klingon)
    load exists.
  * Every app in shared/suite.js is in the launcher's TOOLS under
    "SquirrelGo apps" with the same release tag and APK file, and an APK
    workflow publishes that file to that tag.
  * The launcher keeps its 88% window and font-sized tree rows.
"""

import ast
import re
import sys
from pathlib import Path

SG = Path(__file__).resolve().parent.parent
REPO = SG.parent
ALPHABETS = "squirrelgo-characters/squirrelgo-alphabets/www/"
CL = REPO / "character-learner" / "index.html"
BEGIN = "<!-- sg-alphabets:"
END = "<!-- /sg-alphabets -->"

problems = []


def alphabets_block():
    """Character Learner's script tags for the Alphabets data, from the app's index.html."""
    src = (SG / ALPHABETS / "index.html").read_text(encoding="utf-8")
    files = re.findall(r'<script src="(data/[^"]+\.js)"', src)
    scripts = [f[5:-3] for f in files if f.count("/") == 1 and f != "data/app.js"]
    lines = [
        "<!-- Shared SquirrelGo Alphabets: %d scripts, their stroke orders and recorded sounds,"
        % len(scripts),
        '     plus the stroke player and checked writing pad below (keys are "<script>|<char>") -->',
    ]
    lines += [f'<script src="../SquirrelGo-Apps/{ALPHABETS}{f}"></script>' for f in files]
    return lines


def sync_character_learner(check):
    text = CL.read_text(encoding="utf-8")
    lines = text.split("\n")
    try:
        b = next(i for i, l in enumerate(lines) if l.startswith(BEGIN))
        e = lines.index(END, b)
    except (StopIteration, ValueError):
        problems.append(f"{CL.relative_to(REPO)}: sg-alphabets markers are missing")
        return
    want = alphabets_block()
    if lines[b + 1:e] == want:
        return
    if check:
        problems.append(f"{CL.relative_to(REPO)}: Alphabets script list is out of date "
                        "(run SquirrelGo-Apps/tools/sync-shared.sh)")
    else:
        CL.write_text("\n".join(lines[:b + 1] + want + lines[e:]), encoding="utf-8")
        print(f"synced {CL.relative_to(REPO)}")


def check_desk_paths():
    for page in (CL, REPO / "klingon" / "index.html"):
        for src in re.findall(r'(?:src|href)="(\.\./SquirrelGo-Apps/[^"?#]+)"', page.read_text(encoding="utf-8")):
            if not (page.parent / src).resolve().is_file():
                problems.append(f"{page.relative_to(REPO)}: {src} does not exist")


def check_launcher():
    desk = (REPO / "LanguageStudentDesk.py").read_text(encoding="utf-8")
    tools = None
    for node in ast.parse(desk).body:
        if isinstance(node, ast.Assign) and any(getattr(t, "id", "") == "TOOLS" for t in node.targets):
            tools = ast.literal_eval(node.value)
    if tools is None:
        problems.append("LanguageStudentDesk.py: TOOLS not found")
        return

    suite = (SG / "shared" / "suite.js").read_text(encoding="utf-8")
    apps = re.findall(r'\{ id: "([^"]+)".*?tag: "([^"]+)", apk: "([^"]+)",\s*web: "([^"]+)"', suite, re.S)
    if not apps:
        problems.append("shared/suite.js: no APPS entries found")

    workflows = {}
    for wf in (REPO / ".github" / "workflows").glob("*-apk.yml"):
        y = wf.read_text(encoding="utf-8")
        tag = re.search(r"TAG=(\S+)", y)
        apk = re.search(r'gh release create "\$TAG" (\S+\.apk)', y)
        if tag and apk:
            workflows[tag.group(1)] = (apk.group(1), wf.name)

    in_suite = set()
    for app_id, tag, apk, web in apps:
        folder = Path(web).parent.parent
        in_suite.add(folder.name)
        if not (SG / web).is_file():
            problems.append(f"suite.js {app_id}: {web} does not exist")
        if not (SG / folder / "index.html").is_file():
            problems.append(f"suite.js {app_id}: {folder}/index.html is missing, so the Desk won't list it")
        t = tools.get(folder.name)
        if not t:
            problems.append(f"suite.js {app_id}: no TOOLS entry for {folder.name} in LanguageStudentDesk.py")
        else:
            if t[2] != "SquirrelGo apps":
                problems.append(f"TOOLS {folder.name}: group is {t[2]!r}, expected 'SquirrelGo apps'")
            if t[4] != (tag, apk):
                problems.append(f"TOOLS {folder.name}: APK {t[4]} does not match suite.js ({tag}, {apk})")
        if workflows.get(tag, (None,))[0] != apk:
            problems.append(f"suite.js {app_id}: no APK workflow publishes {apk} to {tag}")
    for name, t in tools.items():
        if t[2] == "SquirrelGo apps" and name not in in_suite:
            problems.append(f"TOOLS {name}: in 'SquirrelGo apps' but missing from suite.js APPS")

    # Regressed before: a fixed 1100x720 window, and rowheight=28 cutting off
    # descenders with Linux fonts.
    if "0.88)" not in desk:
        problems.append("LanguageStudentDesk.py: the window no longer opens at 88% of the screen")
    if 'metrics("linespace")' not in desk:
        problems.append("LanguageStudentDesk.py: tree rows are no longer sized from the font")


def main():
    check = "--check" in sys.argv
    sync_character_learner(check)
    check_desk_paths()
    check_launcher()
    for p in problems:
        print(p)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
