#!/usr/bin/env python3
"""Runs the Go course's programs (../data/go.js) with the go command.

Each example is a complete program in package main. It is run with `go run`;
what it prints is the result. Without go, AVAILABLE is False and
check_packs.py skips this course instead of failing.
"""
import os
import shutil
import subprocess
import sys
import tempfile

GO = shutil.which("go")
AVAILABLE = GO is not None


def run(src):
    """Returns (printed text, error text)."""
    if not AVAILABLE:
        return "", "go is not installed"
    with tempfile.TemporaryDirectory() as tmp:
        path = os.path.join(tmp, "prog.go")
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)
        env = os.environ.copy()
        env["GO111MODULE"] = "off"
        r = subprocess.run(
            [GO, "run", path],
            capture_output=True, text=True, cwd=tmp, timeout=40, env=env,
        )
        if r.returncode != 0:
            msg = (r.stdout + r.stderr).strip().splitlines()
            return "", "go run failed: " + " | ".join(msg[-4:])
        return r.stdout.replace("\r", "").rstrip("\n"), ""


if __name__ == "__main__":
    print(run(sys.stdin.read())[0] if not sys.argv[1:] else run(open(sys.argv[1], encoding="utf-8").read())[0])
