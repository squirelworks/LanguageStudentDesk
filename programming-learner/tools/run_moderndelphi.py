#!/usr/bin/env python3
"""Runs the modern Delphi course's console programs (../data/moderndelphi.js).

The programs are written the way current Delphi writes them, with namespaced
unit names such as System.SysUtils and System.Generics.Collections. Free
Pascal 3.2 knows the same units without the "System." prefix, so this runner
drops that prefix from the uses clause and then compiles with run_delphi.py
(fpc in Delphi mode). Everything else in the program is compiled as written.
Sections that use syntax Free Pascal doesn't have (inline variables,
anonymous methods) carry no `out`, so they are not run.

Without fpc, AVAILABLE is False and check_packs.py skips this course.
"""
import re
import sys

import run_delphi

AVAILABLE = run_delphi.AVAILABLE

USES = re.compile(r"(\buses\b)(.*?;)", re.I | re.S)


def to_fpc(src):
    return USES.sub(lambda m: m.group(1) + re.sub(r"\bSystem\.(?=\w)", "", m.group(2)), src, count=1)


def run(src):
    """Returns (printed text, error text)."""
    return run_delphi.run(to_fpc(src))


if __name__ == "__main__":
    out, err = run(open(sys.argv[1]).read())
    print(out)
    if err:
        print("ERROR:", err, file=sys.stderr)
        sys.exit(1)
