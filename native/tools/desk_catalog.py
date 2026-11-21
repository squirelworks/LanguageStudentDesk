#!/usr/bin/env python3
"""Read the Desk menu's language registry, feature switches and programming
courses into one JSON file. The native shell does not keep a second copy.
"""
import json
import subprocess
import sys
from pathlib import Path

LEARNERS = [
    {"id": "klingon", "title": "Klingon (tlhIngan Hol)",
     "description": "pIqaD alphabet, handwriting, numbers, vocabulary, grammar, reader and quizzes.", "scoped": False},
    {"id": "character", "title": "Character Learner",
     "description": "Kana, kanji, hanzi, hanja, pIqaD and the Alphabets scripts: stroke order and a writing pad.", "scoped": True},
    {"id": "resource", "title": "Resource Learner",
     "description": "Curated learning resources, general and per language.", "scoped": True},
    {"id": "reference", "title": "Reference Learner",
     "description": "Quick lookup for language facts and notes.", "scoped": True},
    {"id": "translation", "title": "Translation Learner (alpha)",
     "description": "Sentence translation checked by meaning, a meaning matrix, and top-1,000 word practice.", "scoped": True},
    {"id": "programming", "title": "Programming Learner",
     "description": "Syntax, concepts and practice, from Python, Slick and Chisel to the esolangs.", "scoped": True},
    {"id": "legalese", "title": "Legalese Learner",
     "description": "How the heavy words in a contract work. Reading practice, not legal advice.", "scoped": False},
    {"id": "language", "title": "Language Learner",
     "description": "A guided path per language: script, first words, grammar, then practice.", "scoped": True},
    {"id": "grammar", "title": "Grammar Learner",
     "description": "Short grammar lessons with explained drills.", "scoped": True},
    {"id": "vocabulary", "title": "Vocabulary Learner",
     "description": "Flashcards, spaced review and Anki export.", "scoped": True},
]

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
    if len(sys.argv) != 5:
        sys.exit("usage: desk_catalog.py <features.js> <registry.js> <catalog.js> <out.json>")
    features, registry, catalog, out = [Path(arg) for arg in sys.argv[1:]]
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
    data["learners"] = LEARNERS
    if not data["languages"] or not data["features"]:
        sys.exit("The Desk menu files did not contain languages and feature switches")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    print(f"desk languages {len(data['languages'])} courses {len(data['courses'])} features {len(data['features'])}")


if __name__ == "__main__":
    main()
