#!/usr/bin/env python3
"""Runs the Java course's programs (../data/java.js) with the JDK.

Each example is a complete source file whose first class has main. It is
started with the single-file source launcher (java Main.java, JDK 11 and
later; the lessons use Java 21 features). Without java, AVAILABLE is False
and check_packs.py skips this course instead of failing.
"""
import os
import shutil
import subprocess
import sys
import tempfile

JAVA = shutil.which("java")
AVAILABLE = JAVA is not None


def run(src):
    """Returns (printed text, error text)."""
    if not AVAILABLE:
        return "", "java is not installed"
    with tempfile.TemporaryDirectory() as tmp:
        path = os.path.join(tmp, "Main.java")
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)
        env = dict(os.environ)
        env.pop("JAVA_TOOL_OPTIONS", None)
        r = subprocess.run([JAVA, "Main.java"], capture_output=True, text=True,
                           cwd=tmp, timeout=60, input="", env=env)
        out = r.stdout.replace("\r", "").rstrip("\n")
        if r.returncode != 0:
            msg = r.stderr.strip().splitlines()
            return out, f"exit code {r.returncode}: " + " | ".join(msg[:4])
        return out, ""


if __name__ == "__main__":
    print(run(sys.stdin.read())[0] if not sys.argv[1:] else run(open(sys.argv[1], encoding="utf-8").read())[0])
