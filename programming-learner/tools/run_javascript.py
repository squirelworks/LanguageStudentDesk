#!/usr/bin/env python3
"""Runs the JavaScript course's programs (../data/javascript.js) with Node.js.

Each example is a complete script. It is run with `node` and what it prints
with console.log is the result. The examples stick to the language itself
(no browser page), so they behave the same in a browser console. Without
node, AVAILABLE is False and check_packs.py skips this course.
"""
import os
import shutil
import subprocess
import sys
import tempfile

NODE = shutil.which("node")
AVAILABLE = NODE is not None


def run(src):
    """Returns (printed text, error text)."""
    if not AVAILABLE:
        return "", "node is not installed"
    with tempfile.TemporaryDirectory() as tmp:
        path = os.path.join(tmp, "prog.mjs")
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)
        r = subprocess.run([NODE, path], capture_output=True, text=True, cwd=tmp, timeout=20, input="")
        out = r.stdout.replace("\r", "").rstrip("\n")
        err = "" if r.returncode == 0 else f"exit code {r.returncode} {r.stderr.strip().splitlines()[-1] if r.stderr.strip() else ''}"
        return out, err


if __name__ == "__main__":
    out, err = run(open(sys.argv[1], encoding="utf-8").read())
    print(out)
    if err:
        print("ERROR:", err, file=sys.stderr)
        sys.exit(1)
