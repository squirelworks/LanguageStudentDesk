#!/usr/bin/env python3
"""Tests the numerical methods track (../data/numerical.js) against known results.

For every example with a `lang` and `known` values:
  1. it is run with that language's runner (see check_packs.py),
  2. the last numbers it prints with six or more decimals (one per known
     value, in order) must equal the known values to the printed precision;
     earlier numbers, such as the steps of an iteration, are not checked,
  3. examples that share an `impl` id (one method in several languages) must
     print exactly the same text.
A language whose runner is missing is skipped with a note, like check_packs.py.

    python3 programming-learner/tools/test_numerical.py
"""
import re
import sys

sys.dont_write_bytecode = True

import check_packs  # noqa: E402  (same folder; loads every runner)

NUMBER = re.compile(r"-?\d+\.(\d{6,})")


def check(pack):
    problems, skipped, checked = [], set(), 0
    outputs = {}
    for lesson in pack["lessons"]:
        for i, sec in enumerate(lesson["sections"]):
            if "lang" not in sec or "known" not in sec:
                continue
            where = f"{lesson['id']} section {i + 1} ({sec['lang']})"
            run = check_packs.RUNNERS.get(sec["lang"])
            if not run:
                skipped.add(sec["lang"])
                continue
            got, err = run(sec["code"])
            checked += 1
            if err:
                problems.append(f"{where}: {err}")
                continue
            found = [(float(m.group(0)), 10 ** -len(m.group(1))) for m in NUMBER.finditer(got)]
            known = sec["known"]
            last = found[-len(known):] if len(found) >= len(known) else []
            if not last:
                problems.append(f"{where}: printed {len(found)} results, expected {len(known)}")
            for (value, step), k in zip(last, known):
                if abs(value - k) > step:
                    problems.append(f"{where}: printed {value}, known value is {k}")
            if "impl" in sec:
                outputs.setdefault(sec["impl"], []).append((where, got))
    for impl, runs in outputs.items():
        first_where, first = runs[0]
        for where, got in runs[1:]:
            if got != first:
                problems.append(f"{impl}: {where} prints differently from {first_where}")
    return problems, skipped, checked


def main():
    pack = check_packs.load()["numerical"]
    problems, skipped, checked = check(pack)
    for p in problems:
        print("FAIL", p)
    for lang in sorted(skipped):
        print(f"note: {lang} examples not run (its runner or compiler is missing)")
    print(f"{checked} implementations checked against known values, {len(problems)} problems")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
