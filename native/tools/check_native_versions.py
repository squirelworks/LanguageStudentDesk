#!/usr/bin/env python3
"""Compare native version files with the squirrelgo release tags.

PR and push CI (the default) require each version code to be at least the
one on the newest squirrelgo-v* tag. Equal is fine. A lower code fails.

The release workflow passes --release. An app must have a strictly higher
version code than the previous tag when something it is built from changed
since that tag. That includes its Android and desktop sources, its version
file, modules it depends on (core, ui, and their dependencies), the shared
Gradle setup, the native tools, and the files its generator reads. A Kana
change in the WebView lesson data or recordings counts. The same idea
applies to Bopomofo and to the language metadata the dictionaries read.
Apps that did not change are left alone.

The version code is major * 1000000 + minor * 1000 + patch, the same formula
the Gradle build uses. major is at least 1, minor is 0..255, patch is 0..999.
A tag that does not contain the file is skipped. A git failure is not.
"""

import os
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


def gradle_projects(text):
    return re.findall(r'project\("(:[^"]+)"\)', text)


def _add(paths, item):
    item = item.replace("\\", "/").strip("/")
    if item and item not in paths:
        paths.append(item)


def _www_tree(path):
    parts = Path(path).parts
    if "www" not in parts:
        return None
    index = parts.index("www")
    if index + 1 < len(parts) and parts[index + 1] in ("data", "audio"):
        return "/".join(parts[: index + 2])
    return None


def _watch(paths, raw):
    raw = os.path.normpath(raw).replace("\\", "/").strip("/")
    _add(paths, _www_tree(raw) or raw)


def _balanced(text, start, open_ch, close_ch):
    depth = 0
    in_str = False
    esc = False
    for i in range(start, len(text)):
        c = text[i]
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == '"':
                in_str = False
            continue
        if c == '"':
            in_str = True
        elif c == open_ch:
            depth += 1
        elif c == close_ch:
            depth -= 1
            if depth == 0:
                return text[start + 1 : i]
    sys.exit(f"Unbalanced {open_ch} in native/build.gradle.kts")


def generator_inputs(build_text):
    """Task name -> repo paths that task reads, taken from the root build file."""
    found = {}
    for match in re.finditer(r"(?<!fun )catalogTask\s*\(", build_text):
        args = _balanced(build_text, match.end() - 1, "(", ")")
        strings = re.findall(r'"([^"]*)"', args)
        if len(strings) < 4:
            continue
        name, lessons, strokes = strings[0], strings[1], strings[2]
        lesson = Path(lessons)
        data_dir = lesson if lesson.suffix == "" else lesson.parent
        paths = [lessons, strokes, str(data_dir / "app.js")]
        paths.append(str(data_dir.parent / "css" / "app.css"))
        if len(strings) > 4 and strings[4]:
            audio = strings[4]
            paths.append(audio)
            # The catalog task also reads the mp3 directory next to www/data.
            paths.append(str(Path(audio).parent.parent / "audio"))
        for extra in strings[5:]:
            if extra:
                paths.append(extra)
        found[name] = paths
    for match in re.finditer(r"(?<!fun )(?:kanji|klingon|phrasebook|jed)CatalogTask\s*\(", build_text):
        args = _balanced(build_text, match.end() - 1, "(", ")")
        strings = re.findall(r'"([^"]*)"', args)
        if len(strings) < 2:
            continue
        found[strings[0]] = strings[1:]
    lang = re.search(r'file\("(\.\./[^"]+)"\)', build_text)
    if lang and "generateLanguageCatalog" in build_text:
        found["generateLanguageCatalog"] = [str(Path("native", lang.group(1)))]
    return found


def source_paths(stem, build_text=None):
    paths = [
        f"native/android/{stem}",
        f"native/desktop/{stem}",
        f"native/versions/{stem}.properties",
        "native/buildSrc",
        "native/gradle",
        "native/build.gradle.kts",
        "native/settings.gradle.kts",
        "native/gradle.properties",
        "native/tools",
    ]
    seen = set()
    pending = []
    for side in ("android", "desktop"):
        gradle = ROOT / "native" / side / stem / "build.gradle.kts"
        if gradle.is_file():
            pending.append(gradle)
    while pending:
        gradle = pending.pop()
        for coord in gradle_projects(gradle.read_text()):
            folder = "native/" + coord.strip(":").replace(":", "/")
            if folder in seen:
                continue
            seen.add(folder)
            _add(paths, folder)
            child = ROOT / folder / "build.gradle.kts"
            if child.is_file():
                pending.append(child)
    text = build_text if build_text is not None else (ROOT / "native" / "build.gradle.kts").read_text()
    tasks = generator_inputs(text)
    named = []
    for side in ("android", "desktop"):
        gradle = ROOT / "native" / side / stem / "build.gradle.kts"
        if gradle.is_file():
            named += re.findall(r'tasks\.named\("([^"]+)"\)', gradle.read_text())
    for task in named:
        for raw in tasks.get(task, []):
            _watch(paths, raw)
    return paths


def app_changed(tag, stem, runner=None):
    run = runner or git
    diff = run(["diff", "--name-only", f"{tag}..HEAD", "--", *source_paths(stem)])
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
