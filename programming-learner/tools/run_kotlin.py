#!/usr/bin/env python3
"""Runs the Kotlin course's programs (../data/kotlin.js) with kotlinc.

Each example is a complete Kotlin/JVM file with a top-level main. It is
compiled with kotlinc into a jar that carries the Kotlin runtime, and the jar
is run with java; what it prints is the result. Compiler warnings are
ignored, errors count as failures. Without kotlinc and java, AVAILABLE is
False and check_packs.py skips this course (the compiler is the
kotlin-compiler-<version>.zip on JetBrains' GitHub releases page).
"""
import os
import shutil
import subprocess
import sys
import tempfile

KOTLINC = shutil.which("kotlinc")
JAVA = shutil.which("java")
AVAILABLE = KOTLINC is not None and JAVA is not None


def _env():
    env = dict(os.environ)
    env.pop("JAVA_TOOL_OPTIONS", None)  # it makes the JVM print a banner to stderr
    return env


def run(src):
    """Returns (printed text, error text)."""
    if not AVAILABLE:
        return "", "kotlinc or java is not installed"
    with tempfile.TemporaryDirectory() as tmp:
        with open(os.path.join(tmp, "Main.kt"), "w", encoding="utf-8") as f:
            f.write(src)
        c = subprocess.run([KOTLINC, "-nowarn", "Main.kt", "-include-runtime", "-d", "main.jar"],
                           capture_output=True, text=True, cwd=tmp, timeout=300, env=_env())
        if c.returncode != 0 or not os.path.exists(os.path.join(tmp, "main.jar")):
            msg = [l for l in (c.stdout + c.stderr).strip().splitlines() if "error" in l] or ["(no message)"]
            return "", "compile failed: " + " | ".join(msg[:4])
        r = subprocess.run([JAVA, "-jar", "main.jar"], capture_output=True, text=True,
                           cwd=tmp, timeout=60, input="", env=_env())
        out = r.stdout.replace("\r", "").rstrip("\n")
        if r.returncode != 0:
            msg = r.stderr.strip().splitlines()
            return out, f"exit code {r.returncode}: " + " | ".join(msg[:4])
        return out, ""


if __name__ == "__main__":
    print(run(sys.stdin.read())[0] if not sys.argv[1:] else run(open(sys.argv[1], encoding="utf-8").read())[0])
