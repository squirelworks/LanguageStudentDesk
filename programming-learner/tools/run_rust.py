#!/usr/bin/env python3
"""Runs the Rust course's programs (../data/rust.js) with rustc.

Each example is a complete program. It is compiled and run; what it prints is
the result. Without rustc, AVAILABLE is False and check_packs.py skips this
course instead of failing.
"""
import os
import shutil
import subprocess
import sys
import tempfile

RUSTC = shutil.which("rustc")
AVAILABLE = RUSTC is not None


def run(src):
    """Returns (printed text, error text)."""
    if not AVAILABLE:
        return "", "rustc is not installed"
    with tempfile.TemporaryDirectory() as tmp:
        path = os.path.join(tmp, "prog.rs")
        exe = os.path.join(tmp, "prog")
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)
        c = subprocess.run(
            [RUSTC, "--edition", "2021", "-o", exe, path],
            capture_output=True, text=True, cwd=tmp, timeout=60,
        )
        if c.returncode != 0 or not os.path.exists(exe):
            msg = (c.stdout + c.stderr).strip().splitlines()
            return "", "compile failed: " + " | ".join(msg[-4:])
        r = subprocess.run([exe], capture_output=True, text=True, cwd=tmp, timeout=10, input="")
        out = r.stdout.replace("\r", "").rstrip("\n")
        err = "" if r.returncode == 0 else f"exit code {r.returncode} {r.stderr.strip()}"
        return out, err


if __name__ == "__main__":
    print(run(sys.stdin.read())[0] if not sys.argv[1:] else run(open(sys.argv[1], encoding="utf-8").read())[0])
