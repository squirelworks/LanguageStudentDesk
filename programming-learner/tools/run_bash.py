#!/usr/bin/env python3
"""Runs the Bash course's programs (../data/bash.js) with bash.

Each example is a complete script. It is run with bash in an empty folder,
with the C locale so sort orders are the same everywhere, and what it prints is
the result. Without bash, AVAILABLE is False and check_packs.py skips this
course instead of failing.
"""
import os
import shutil
import subprocess
import sys
import tempfile

BASH = shutil.which("bash")
AVAILABLE = BASH is not None


def run(src):
    """Returns (printed text, error text)."""
    if not AVAILABLE:
        return "", "bash is not installed"
    with tempfile.TemporaryDirectory() as tmp:
        path = os.path.join(tmp, "prog.sh")
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)
        env = {"PATH": os.environ.get("PATH", "/usr/bin:/bin"), "HOME": tmp, "LC_ALL": "C"}
        r = subprocess.run([BASH, "--noprofile", "--norc", path],
                           capture_output=True, text=True, cwd=tmp, timeout=20, input="", env=env)
        out = r.stdout.replace("\r", "").rstrip("\n")
        err = r.stderr.strip()
        if r.returncode != 0:
            err = f"exit code {r.returncode} {err}"
        return out, err


if __name__ == "__main__":
    print(run(sys.stdin.read())[0] if not sys.argv[1:] else run(open(sys.argv[1], encoding="utf-8").read())[0])
