#!/usr/bin/env python3
"""Checks the Programming Learner packs in ../data/.

Every pack: answers are among their options and options are unique.
Packs with a runner (Python and brainFOOD below, and any tools/run_<id>.py): every example with `out` and
every practice question of kind "output" is run, and what it prints must match exactly.

    python3 programming-learner/tools/check_packs.py

Needs node (to read the .js data files) and python3.
"""
import json
import pathlib
import subprocess
import sys
import importlib
import tempfile

sys.dont_write_bytecode = True  # keep tools/ free of __pycache__

HERE = pathlib.Path(__file__).resolve().parent
DATA = HERE.parent / "data"

DUMP = """
global.window = {};
for (const f of process.argv.slice(1)) require(f);
process.stdout.write(JSON.stringify(window.PROGRAMMING));
"""


def brainfood(code):
    """Runs a brainFOOD program with no input; returns what it prints."""
    prog = [c for c in code if c in "<>+-.,[]"]
    jump, stack = {}, []
    for i, c in enumerate(prog):
        if c == "[":
            stack.append(i)
        elif c == "]":
            j = stack.pop()
            jump[i], jump[j] = j, i
    cells, ptr, pc, out, steps = [0] * 30000, 0, 0, [], 0
    while pc < len(prog) and steps < 10_000_000:
        c = prog[pc]
        if c == ">":
            ptr += 1
        elif c == "<":
            ptr -= 1
        elif c == "+":
            cells[ptr] = (cells[ptr] + 1) % 256
        elif c == "-":
            cells[ptr] = (cells[ptr] - 1) % 256
        elif c == ".":
            out.append(chr(cells[ptr]))
        elif c == ",":
            cells[ptr] = 0
        elif c == "[" and cells[ptr] == 0:
            pc = jump[pc]
        elif c == "]" and cells[ptr] != 0:
            pc = jump[pc]
        pc += 1
        steps += 1
    return "".join(out).rstrip("\n"), ""


def python(code):
    with tempfile.TemporaryDirectory() as tmp:
        r = subprocess.run([sys.executable, "-I", "-"], input=code, capture_output=True, text=True, cwd=tmp, timeout=20)
    return r.stdout.rstrip("\n"), r.stderr.strip()


RUNNERS = {"python": python, "brainfood": brainfood}
# Any tools/run_<id>.py with run(code) -> (printed, error) checks that course too.
sys.path.insert(0, str(HERE))
for f in sorted(HERE.glob("run_*.py")):
    RUNNERS[f.stem[4:]] = importlib.import_module(f.stem).run


def load():
    files = sorted(str(p) for p in DATA.glob("*.js") if p.name != "catalog.js")
    out = subprocess.run(["node", "-e", DUMP, *files], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def main():
    packs = load()
    problems = []
    checked = 0
    for pid, pack in packs.items():
        runner = RUNNERS.get(pid)
        if pack.get("id") != pid:
            problems.append(f"{pid}: id is {pack.get('id')!r}")
        ids = [l["id"] for l in pack["lessons"]]
        if len(ids) != len(set(ids)):
            problems.append(f"{pid}: duplicate lesson ids")
        for lesson in pack["lessons"]:
            where = f"{pid}/{lesson['id']}"
            for i, sec in enumerate(lesson["sections"]):
                if runner and "out" in sec:
                    got, err = runner(sec["code"])
                    checked += 1
                    if got != sec["out"]:
                        problems.append(f"{where} section {i + 1}: printed {got!r}, data says {sec['out']!r} {err}")
            for i, q in enumerate(lesson.get("practice", [])):
                if q["answer"] not in q["options"]:
                    problems.append(f"{where} question {i + 1}: answer not among options")
                if len(q["options"]) != len(set(q["options"])):
                    problems.append(f"{where} question {i + 1}: duplicate options")
                if runner and q.get("kind") == "output":
                    want = q.get("check", q["answer"])
                    got, err = runner(q["code"])
                    checked += 1
                    if got != want:
                        problems.append(f"{where} question {i + 1}: printed {got!r}, expected {want!r} {err}")
    for p in problems:
        print("FAIL", p)
    print(f"{len(packs)} packs, {checked} snippets run, {len(problems)} problems")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
