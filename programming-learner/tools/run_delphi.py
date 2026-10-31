#!/usr/bin/env python3
"""Runs the Delphi course's console programs (../data/delphi.js) with Free Pascal.

Each complete program is compiled with `fpc -Mdelphi`, Free Pascal's Delphi
compatibility mode, and run; what it prints is the result, without spaces at
line ends. Free Pascal is the
compiler behind Lazarus (Debian/Ubuntu: apt install fp-compiler). Without it,
AVAILABLE is False and check_packs.py skips this course instead of failing.

    python3 run_delphi.py program.pas      prints what the program prints
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
        with open(path, "w") as f:
            f.write(src)
        c = subprocess.run([FPC, "-Mdelphi", "-v0", "-FE" + tmp, path], capture_output=True, text=True, cwd=tmp, timeout=60)
        exe = os.path.join(tmp, "prog")
        if c.returncode != 0 or not os.path.exists(exe):
            msg = (c.stdout + c.stderr).strip().splitlines()
            return "", "compile failed: " + " | ".join(msg[-4:])
        r = subprocess.run([exe], capture_output=True, text=True, cwd=tmp, timeout=20, input="")
        # spaces at the end of a line are invisible, so they are not compared
        out = "\n".join(l.rstrip(" ") for l in r.stdout.replace("\r", "").split("\n")).rstrip("\n")
        err = "" if r.returncode == 0 else f"exit code {r.returncode} {r.stderr.strip()}"
        return out, err


if __name__ == "__main__":
    out, err = run(open(sys.argv[1]).read())
    print(out)
    if err:
        print("ERROR:", err, file=sys.stderr)
        sys.exit(1)
