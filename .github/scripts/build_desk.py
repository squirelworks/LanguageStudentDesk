#!/usr/bin/env python3
"""Build a standalone Desk for the OS this runs on.

PyInstaller freezes LanguageStudentDesk.py (Python and Tk included) into a
folder, and the Desk's web apps are copied next to the executable, where the
launcher looks for them. Only files git tracks are copied (submodules are skipped), and the Android
projects and the .git and .github folders stay out. The folder is then archived as
dist/LanguageStudentDesk-<os>.zip (.tar.gz on Linux, to keep file modes).

    python3 .github/scripts/build_desk.py linux|windows|macos [checkout]

Builds from the checkout given (default: the current folder), so the release
workflow can build an older tag with this script. Needs `pip install pyinstaller`.
"""

import shutil
import subprocess
import sys
import tarfile
from pathlib import Path

NAME = "LanguageStudentDesk"
SKIP_DIRS = {".git", ".github", "android", "node_modules", "__pycache__", "build", "dist"}
# Generated folders that git ignores but the Desk needs. The workflow builds
# them before this script runs; each is copied when present.
GENERATED_DIRS = ["SquirrelGo-Apps/squirrelgo-dictionary/www/data"]


def tracked_files(root):
    out = subprocess.run(["git", "ls-files", "-s", "-z"], cwd=root, capture_output=True, check=True).stdout
    for entry in out.decode("utf-8").split("\0"):
        if not entry:
            continue
        meta, rel = entry.split("\t", 1)
        # Mode 160000 is a submodule (data/), a folder rather than a file; the
        # Desk's web apps read their own generated files, not the submodule.
        if meta.startswith("160000") or rel == f"{NAME}.py":
            continue
        parts = Path(rel).parts
        if SKIP_DIRS.intersection(parts[:-1]):
            continue
        yield rel


def main():
    target = sys.argv[1] if len(sys.argv) > 1 else {"win32": "windows", "darwin": "macos"}.get(sys.platform, "linux")
    root = Path(sys.argv[2] if len(sys.argv) > 2 else ".").resolve()
    work = root / "build" / "desk"
    dist = root / "dist"
    shutil.rmtree(work, ignore_errors=True)
    dist.mkdir(exist_ok=True)

    # --contents-directory . puts Python's own files next to the executable, so
    # the launcher's BASE (the folder of its __file__) is the folder the web
    # apps are copied into.
    cmd = [sys.executable, "-m", "PyInstaller", "--noconfirm", "--clean", "--onedir",
           "--name", NAME, "--contents-directory", ".",
           "--distpath", str(work / "dist"), "--workpath", str(work / "build"), "--specpath", str(work),
           str(root / f"{NAME}.py")]
    if target == "windows":
        cmd.insert(-1, "--windowed")
    subprocess.run(cmd, check=True)

    app = work / "dist" / NAME
    count = 0
    for rel in tracked_files(root):
        dest = app / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(root / rel, dest)
        count += 1
    for rel in GENERATED_DIRS:
        src = root / rel
        if src.is_dir():
            shutil.copytree(src, app / rel, dirs_exist_ok=True)
            count += sum(1 for p in src.rglob("*") if p.is_file())
        else:
            print(f"Warning: {rel} is missing; run its generator first.")
    print(f"Copied {count} files next to the {target} executable.")

    if target == "linux":
        archive = dist / f"{NAME}-{target}.tar.gz"
        with tarfile.open(archive, "w:gz") as tar:
            tar.add(app, arcname=NAME)
    else:
        archive = Path(shutil.make_archive(str(dist / f"{NAME}-{target}"), "zip", app.parent, NAME))
    print(f"Wrote {archive} ({archive.stat().st_size // (1024 * 1024)} MB).")


if __name__ == "__main__":
    main()
