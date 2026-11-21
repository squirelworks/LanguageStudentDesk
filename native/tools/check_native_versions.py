#!/usr/bin/env python3
"""Fail if a native versionCode is not above the same file on the newest release tag.

The version code is major * 1000000 + minor * 1000 + patch, the same formula
the Gradle build uses. A tag that does not contain the file is skipped.
"""

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def git(*args, check=True):
    return subprocess.run(
        ["git", *args], cwd=ROOT, check=check, capture_output=True, text=True,
    )


def version_code(name):
    match = re.fullmatch(r"(\d+)\.(\d+)\.(\d+)", name)
    if not match:
        sys.exit(f"versionName must be major.minor.patch, got {name!r}")
    major, minor, patch = (int(part) for part in match.groups())
    return major * 1_000_000 + minor * 1_000 + patch


def version_name(text):
    match = re.search(r"(?m)^versionName=(.+)$", text)
    if not match:
        sys.exit("versionName missing")
    return match.group(1).strip()


def main():
    tags = git("tag", "-l", "squirrelgo-v*", "--sort=-creatordate").stdout.split()
    if not tags:
        print("No squirrelgo release tag; nothing to compare")
        return 0
    tag = tags[0]
    print(f"Newest release tag: {tag}")
    failed = False
    versions = sorted((ROOT / "native" / "versions").glob("*.properties"))
    if not versions:
        sys.exit("No native version files")
    for path in versions:
        rel = path.relative_to(ROOT).as_posix()
        old = git("show", f"{tag}:{rel}", check=False)
        if old.returncode != 0:
            print(f"{rel} is not on {tag}")
            continue
        previous = version_code(version_name(old.stdout))
        current = version_code(version_name(path.read_text()))
        if current <= previous:
            print(f"FAIL {rel}: {current} is not greater than {previous} on {tag}")
            failed = True
        else:
            print(f"ok {rel}: {current} > {previous}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
