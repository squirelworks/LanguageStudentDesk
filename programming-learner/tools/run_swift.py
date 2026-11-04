#!/usr/bin/env python3
"""Runs the Swift course's programs (../data/swift.js) with swiftc.

Each example is a complete Swift file of top-level code, saved as main.swift
so top-level statements (and await) are allowed. It is compiled with swiftc
and the program is run; what it prints is the result. Compiler warnings are
ignored, errors count as failures. Without swiftc, AVAILABLE is False and
check_packs.py skips this course (Linux toolchains are on download.swift.org).
"""
import os
import shutil
import subprocess
import sys
import tempfile

SWIFTC = shutil.which("swiftc")
AVAILABLE = SWIFTC is not None


def run(src):
    """Returns (printed text, error text)."""
    if not AVAILABLE:
        return "", "swiftc is not installed"
    with tempfile.TemporaryDirectory() as tmp:
        with open(os.path.join(tmp, "main.swift"), "w", encoding="utf-8") as f:
            f.write(src)
        c = subprocess.run([SWIFTC, "-suppress-warnings", "main.swift", "-o", "prog"],
                           capture_output=True, text=True, cwd=tmp, timeout=300)
        exe = os.path.join(tmp, "prog")
        if c.returncode != 0 or not os.path.exists(exe):
            msg = [l for l in (c.stdout + c.stderr).strip().splitlines() if "error" in l] or ["(no message)"]
            return "", "compile failed: " + " | ".join(msg[:4])
        r = subprocess.run([exe], capture_output=True, text=True, cwd=tmp, timeout=60, input="")
        out = r.stdout.replace("\r", "").rstrip("\n")
        if r.returncode != 0:
            msg = r.stderr.strip().splitlines()
            return out, f"exit code {r.returncode}: " + " | ".join(msg[:4])
        return out, ""


if __name__ == "__main__":
    print(run(sys.stdin.read())[0] if not sys.argv[1:] else run(open(sys.argv[1], encoding="utf-8").read())[0])
