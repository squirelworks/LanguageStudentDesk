#!/usr/bin/env python3
"""Check the Legalese Learner course: answers are among the options, options
are unique, and lesson ids are unique.

    python3 legalese-learner/tools/check_course.py
"""
import json
import pathlib
import subprocess
import sys

HERE = pathlib.Path(__file__).resolve().parent
DATA = HERE.parent / "data" / "course.js"
DUMP = """
global.window = {};
require(process.argv[1]);
process.stdout.write(JSON.stringify(window.LEGALESE));
"""


def main():
    raw = subprocess.run(["node", "-e", DUMP, str(DATA)], capture_output=True, text=True, check=True)
    course = json.loads(raw.stdout)
    problems = []
    ids = [l["id"] for l in course["lessons"]]
    if len(ids) != len(set(ids)):
        problems.append("duplicate lesson ids")
    n = 0
    for lesson in course["lessons"]:
        where = lesson["id"]
        for i, q in enumerate(lesson.get("practice", [])):
            n += 1
            if q["answer"] not in q["options"]:
                problems.append(f"{where} question {i + 1}: answer not among options")
            if len(q["options"]) != len(set(q["options"])):
                problems.append(f"{where} question {i + 1}: duplicate options")
            if not q.get("why"):
                problems.append(f"{where} question {i + 1}: no explanation")
    for p in problems:
        print("FAIL", p)
    print(f"{len(course['lessons'])} lessons, {n} questions, {len(problems)} problems")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
