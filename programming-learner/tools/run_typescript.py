#!/usr/bin/env python3
"""Runs the TypeScript course's programs (../data/typescript.js).

Each example is a complete script. It is type-checked and compiled with tsc in
strict mode, and the JavaScript tsc writes is run with node; what it prints
with console.log is the result. A type error counts as a failure, so every
example in the course has to pass the checker. Without both tsc and node,
AVAILABLE is False and check_packs.py skips this course (install tsc with
npm install -g typescript).
"""
import os
import shutil
import subprocess
import sys
import tempfile

TSC = shutil.which("tsc")
NODE = shutil.which("node")
AVAILABLE = TSC is not None and NODE is not None


def run(src):
    """Returns (printed text, error text)."""
    if not AVAILABLE:
        return "", "tsc or node is not installed"
    with tempfile.TemporaryDirectory() as tmp:
        path = os.path.join(tmp, "prog.ts")
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)
        c = subprocess.run(
            [TSC, "--strict", "--target", "es2022", "--module", "es2022", "--lib", "es2023,dom",
             "--moduleDetection", "force",
             "--outDir", "out", "prog.ts"],
            capture_output=True, text=True, cwd=tmp, timeout=60,
        )
        js = os.path.join(tmp, "out", "prog.js")
        if c.returncode != 0 or not os.path.exists(js):
            msg = (c.stdout + c.stderr).strip().splitlines()
            return "", "type check failed: " + " | ".join(msg[:4])
        mjs = os.path.join(tmp, "out", "prog.mjs")
        os.rename(js, mjs)
        r = subprocess.run([NODE, mjs], capture_output=True, text=True, cwd=tmp, timeout=20, input="")
        out = r.stdout.replace("\r", "").rstrip("\n")
        err = "" if r.returncode == 0 else f"exit code {r.returncode} {r.stderr.strip()}"
        return out, err


if __name__ == "__main__":
    print(run(sys.stdin.read())[0] if not sys.argv[1:] else run(open(sys.argv[1], encoding="utf-8").read())[0])
