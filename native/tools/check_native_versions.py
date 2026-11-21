#!/usr/bin/env python3
"""Compare native version files with the squirrelgo release tags.

PR and push CI (the default) require each version code to be at least the
one on the newest squirrelgo-v* tag. Equal is fine. A lower code fails.

The release workflow passes --release. An app whose own Android, desktop, or
version file changed since the previous squirrelgo-v* tag must have a strictly
higher version code than that tag. Apps that did not change are left alone.

The version code is major * 1000000 + minor * 1000 + patch, the same formula
the Gradle build uses. major is at least 1, minor is 0..255, patch is 0..999.
A tag that does not contain the file is skipped. A git failure is not.
"""

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
VERSIONS = ROOT / "native" / "versions"


def git(args, check=True):
    result = subprocess.run(
        ["git", *args], cwd=ROOT, check=False, capture_output=True, text=True,
    )
    if check and result.returncode != 0:
        sys.exit(
            "git "
            + " ".join(args)
            + " failed ("
            + str(result.returncode)
            + "):\n"
            + (result.stderr or result.stdout)
        )
    return result


def version_code(name, where):
    match = re.fullmatch(r"(\d+)\.(\d+)\.(\d+)", name)
    if not match:
        sys.exit(f"{where}: versionName must be major.minor.patch, got {name!r}")
    major, minor, patch = (int(part) for part in match.groups())
    if major < 1:
        sys.exit(f"{where}: major must be at least 1, got {name}")
    if minor > 255:
        sys.exit(f"{where}: minor must be 0..255 (Windows installer limit), got {name}")
    if patch > 999:
        sys.exit(f"{where}: patch must be 0..999 so version codes do not collide, got {name}")
    return major * 1_000_000 + minor * 1_000 + patch


def version_name(text, where):
    match = re.search(r"(?m)^versionName=(.+)$", text)
    if not match:
        sys.exit(f"{where}: versionName missing")
    return match.group(1).strip()


def file_on_tag(tag, rel):
    shown = git(["show", f"{tag}:{rel}"], check=False)
    if shown.returncode == 0:
        return shown.stdout
    err = shown.stderr or ""
    missing = (
        "exists on disk, but not in" in err
        or "does not exist" in err
        or "Path does not exist" in err
    )
    if missing:
        return None
    sys.exit(f"git show {tag}:{rel} failed ({shown.returncode}):\n{err}")


def tags_newest_first():
    return git(["tag", "-l", "squirrelgo-v*", "--sort=-creatordate"]).stdout.split()


def previous_release_tag(tags):
    head = git(["rev-parse", "HEAD^{commit}"]).stdout.strip()
    for tag in tags:
        commit = git(["rev-parse", f"{tag}^{{commit}}"]).stdout.strip()
        if commit != head:
            return tag
    return None


def app_changed(tag, stem):
    paths = [
        f"native/android/{stem}",
        f"native/desktop/{stem}",
        f"native/versions/{stem}.properties",
    ]
    diff = git(["diff", "--name-only", f"{tag}..HEAD", "--", *paths])
    return bool(diff.stdout.strip())


def main():
    release = "--release" in sys.argv[1:]
    tags = tags_newest_first()
    if not tags:
        print("No squirrelgo release tag; nothing to compare")
        return 0
    versions = sorted(VERSIONS.glob("*.properties"))
    if not versions:
        sys.exit("No native version files")
    if release:
        tag = previous_release_tag(tags)
        if tag is None:
            print("No previous squirrelgo release tag; nothing to compare")
            return 0
        print(f"Release check against previous tag {tag}")
    else:
        tag = tags[0]
        print(f"Newest release tag: {tag}")
    failed = False
    for path in versions:
        rel = path.relative_to(ROOT).as_posix()
        stem = path.stem
        current = version_code(version_name(path.read_text(), rel), rel)
        old_text = file_on_tag(tag, rel)
        if old_text is None:
            print(f"{rel} is not on {tag}")
            continue
        previous = version_code(version_name(old_text, f"{tag}:{rel}"), f"{tag}:{rel}")
        if release:
            if not app_changed(tag, stem):
                print(f"ok {rel}: sources unchanged since {tag}")
                continue
            if current <= previous:
                print(f"FAIL {rel}: {current} is not greater than {previous} on {tag}")
                failed = True
            else:
                print(f"ok {rel}: {current} > {previous}")
        elif current < previous:
            print(f"FAIL {rel}: {current} is lower than {previous} on {tag}")
            failed = True
        else:
            print(f"ok {rel}: {current} >= {previous}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
