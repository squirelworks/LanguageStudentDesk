#!/usr/bin/env python3
"""Runs the COBOL course's programs (../data/cobol.js) with GnuCOBOL.

Each example is a complete program in free format. It is compiled with
`cobc -x -free` and run; what it prints is the result. Without cobc,
AVAILABLE is False and check_packs.py skips this course instead of failing.
"""
import os
import shutil
import subprocess
import sys
import tempfile

COBC = shutil.which("cobc")
AVAILABLE = COBC is not None


def run(src):
    """Returns (printed text, error text)."""
    if not AVAILABLE:
        return "", "cobc (GnuCOBOL) is not installed"
    with tempfile.TemporaryDirectory() as tmp:
        path = os.path.join(tmp, "prog.cob")
        exe = os.path.join(tmp, "prog")
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)
        c = subprocess.run(
            [COBC, "-x", "-free", "-o", exe, path],
            capture_output=True, text=True, cwd=tmp, timeout=60,
        )
        if c.returncode != 0 or not os.path.exists(exe):
            msg = (c.stdout + c.stderr).strip().splitlines()
            return "", "compile failed: " + " | ".join(msg[-4:])
        r = subprocess.run([exe], capture_output=True, text=True, cwd=tmp, timeout=10, input="")
        out = "\n".join(line.rstrip() for line in r.stdout.replace("\r", "").split("\n")).rstrip("\n")
        err = "" if r.returncode == 0 else f"exit code {r.returncode} {r.stderr.strip()}"
        return out, err


if __name__ == "__main__":
    print(run(sys.stdin.read())[0] if not sys.argv[1:] else run(open(sys.argv[1], encoding="utf-8").read())[0])
