#!/usr/bin/env python3
"""Runs the PHP course's programs (../data/php.js) with the php command line.

Each example is a complete script starting with <?php. It is run with php and
what it prints is the result. Without php, AVAILABLE is False and
check_packs.py skips this course instead of failing.
"""
import os
import shutil
import subprocess
import sys
import tempfile

PHP = shutil.which("php")
AVAILABLE = PHP is not None


def run(src):
    """Returns (printed text, error text)."""
    if not AVAILABLE:
        return "", "php is not installed"
    with tempfile.TemporaryDirectory() as tmp:
        path = os.path.join(tmp, "prog.php")
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)
        r = subprocess.run([PHP, "-n", "-d", "display_errors=stderr", path],
                           capture_output=True, text=True, cwd=tmp, timeout=20, input="")
        out = r.stdout.replace("\r", "").rstrip("\n")
        err = r.stderr.strip()
        if r.returncode != 0:
            err = f"exit code {r.returncode} {err}"
        return out, err


if __name__ == "__main__":
    print(run(sys.stdin.read())[0] if not sys.argv[1:] else run(open(sys.argv[1], encoding="utf-8").read())[0])
