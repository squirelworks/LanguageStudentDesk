#!/usr/bin/env python3
"""Read the Desk menu's language registry, feature switches, programming
courses and learner list into one JSON file. The native shell does not keep
a second copy of any of them.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

# One object from the LEARNERS array in the suite menu. requires is optional.
LEARNER = re.compile(
    r"""\{\s*href:\s*"([^"]+)"\s*,\s*title:\s*"([^"]+)"\s*,\s*"""
    r"""desc:\s*"([^"]+)"\s*,\s*scoped:\s*(true|false)"""
    r"""(?:\s*,\s*requires:\s*(\[[^\]]*\]|"[^"]*"))?\s*\}""",
    re.S,
)


def learners_from_menu(text):
    """The suite menu is the only learner list. Ids come from the folder name."""
    start = text.find("var LEARNERS = [")
    if start < 0:
        sys.exit("desk menu has no LEARNERS list")
    end = text.find("];", start)
    if end < 0:
        sys.exit("desk menu LEARNERS list is not closed")
    found = LEARNER.findall(text[start:end])
    if not found:
        sys.exit("desk menu LEARNERS list was empty")
    learners = []
    for href, title, description, scoped, requires in found:
        href = href.removeprefix("../../../")
        folder = href.split("/", 1)[0]
        ident = folder[: -len("-learner")] if folder.endswith("-learner") else folder
        item = {
            "id": ident,
            "title": title,
            "href": href,
            "description": description,
            "scoped": scoped == "true",
        }
        if requires:
            if requires.startswith("["):
                item["requires"] = json.loads(requires)
            else:
                item["requires"] = [json.loads(requires)]
        learners.append(item)
    return learners

READER = r"""
const fs = require("fs");
const window = {};
for (const file of process.argv.slice(1)) {
  eval(fs.readFileSync(file, "utf8"));
}
const features = window.LSD_FEATURES;
const registry = window.LSD_LANGUAGE_REGISTRY || {};
const courses = window.PROGRAMMING_CATALOG || [];
const languages = Object.values(registry).map((meta) => ({
  id: meta.id,
  name: meta.name || meta.id,
  nativeName: meta.nativeName || "",
  shipped: !!(meta.data && Object.keys(meta.data).length),
  requires: [].concat(meta.requires || []),
}));
process.stdout.write(JSON.stringify({
  levels: features.levels,
  defaultLevel: features.defaultLevel,
  features: features.features,
  featured: features.featured,
  text: features.text,
  languages,
  courses: courses.map((course) => ({ id: course.id, name: course.name, group: course.group || "" })),
}));
"""


def main():
    if len(sys.argv) != 6:
        sys.exit("usage: desk_catalog.py <features.js> <registry.js> <catalog.js> <menu.html> <out.json>")
    features, registry, catalog, menu, out = [Path(arg) for arg in sys.argv[1:]]
    try:
        raw = subprocess.run(
            ["node", "-e", READER, str(features), str(registry), str(catalog)],
            check=True, capture_output=True, text=True,
        ).stdout
    except FileNotFoundError:
        sys.exit("node is required to read the Desk menu files and was not found")
    except subprocess.CalledProcessError as error:
        sys.exit(error.stderr or "Could not read the Desk menu files")
    data = json.loads(raw)
    data["learners"] = learners_from_menu(menu.read_text(encoding="utf-8"))
    if not data["languages"] or not data["features"]:
        sys.exit("The Desk menu files did not contain languages and feature switches")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    print(f"desk languages {len(data['languages'])} courses {len(data['courses'])} features {len(data['features'])}")


if __name__ == "__main__":
    main()
