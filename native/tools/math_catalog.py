#!/usr/bin/env python3
"""Read the Math Learner catalog, its section headings and the shared feature
switches into one JSON file. The native shell does not keep a second copy.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

GROUP = re.compile(
    r"""\{\s*id:\s*"([^"]+)"\s*,\s*title:\s*"([^"]+)"\s*,\s*sub:\s*"([^"]+)"\s*\}""",
    re.S,
)

READER = r"""
const fs = require("fs");
const window = {};
for (const file of process.argv.slice(1)) eval(fs.readFileSync(file, "utf8"));
const features = window.LSD_FEATURES;
const courses = (window.MATH_CATALOG || []).map((course) => ({
  id: course.id,
  name: course.name,
  era: course.era || "",
  blurb: course.blurb || "",
  group: course.group || "foundations",
  tags: [].concat(course.tags || []),
}));
process.stdout.write(JSON.stringify({
  levels: features.levels,
  defaultLevel: features.defaultLevel,
  features: features.features,
  courses,
}));
"""


def groups_from_sections(text):
    start = text.find("var GROUPS = [")
    if start < 0:
        sys.exit("sections.js has no GROUPS list")
    end = text.find("];", start)
    found = GROUP.findall(text[start:end])
    if not found:
        sys.exit("sections.js GROUPS list was empty")
    return [{"id": ident, "title": title, "sub": sub} for ident, title, sub in found]


def main():
    if len(sys.argv) != 5:
        sys.exit("usage: math_catalog.py <catalog.js> <sections.js> <features.js> <out.json>")
    catalog, sections, features, out = [Path(arg) for arg in sys.argv[1:]]
    try:
        raw = subprocess.run(
            ["node", "-e", READER, str(catalog), str(features)],
            check=True, capture_output=True, text=True,
        ).stdout
    except FileNotFoundError:
        sys.exit("node is required to read the Math Learner catalog and was not found")
    except subprocess.CalledProcessError as error:
        sys.exit(error.stderr or "Could not read the Math Learner catalog")
    data = json.loads(raw)
    data["groups"] = groups_from_sections(sections.read_text(encoding="utf-8"))
    if not data["courses"] or not data["features"] or not data["groups"]:
        sys.exit("The Math Learner files did not contain courses, sections and switches")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    print(f"math courses {len(data['courses'])} groups {len(data['groups'])}")


if __name__ == "__main__":
    main()
