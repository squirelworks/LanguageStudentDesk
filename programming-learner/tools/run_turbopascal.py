#!/usr/bin/env python3
"""Runs the Turbo Pascal course's programs (../data/turbopascal.js) with Free Pascal.

Each complete program is compiled with `fpc -Mtp`, Free Pascal's Turbo Pascal
compatibility mode (16-bit Integer, short strings), and run; what it prints is
the result, without spaces at line ends. Sections that need a DOS screen (the
Crt unit) carry no `out`, so they are not run. Without fpc, AVAILABLE is
False and check_packs.py skips this course instead of failing.

    python3 run_turbopascal.py program.pas      prints what the program prints
"""
import os
import shutil
import subprocess
import sys
import tempfile

FPC = shutil.which("fpc")
AVAILABLE = FPC is not None


def run(src):
    """Returns (printed text, error text)."""
    if not AVAILABLE:
        return "", "fpc (Free Pascal) is not installed"
    with tempfile.TemporaryDirectory() as tmp:
        path = os.path.join(tmp, "prog.pas")
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)
        c = subprocess.run([FPC, "-Mtp", "-v0", "-FE" + tmp, path], capture_output=True, text=True, cwd=tmp, timeout=60)
        exe = os.path.join(tmp, "prog")
        if c.returncode != 0 or not os.path.exists(exe):
            msg = (c.stdout + c.stderr).strip().splitlines()
            return "", "compile failed: " + " | ".join(msg[-4:])
        r = subprocess.run([exe], capture_output=True, text=True, cwd=tmp, timeout=20, input="")
        out = "\n".join(l.rstrip(" ") for l in r.stdout.replace("\r", "").split("\n")).rstrip("\n")
        err = "" if r.returncode == 0 else f"exit code {r.returncode} {r.stderr.strip()}"
        return out, err


if __name__ == "__main__":
    out, err = run(open(sys.argv[1], encoding="utf-8").read())
    print(out)
    if err:
        print("ERROR:", err, file=sys.stderr)
        sys.exit(1)
