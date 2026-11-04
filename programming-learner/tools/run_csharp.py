#!/usr/bin/env python3
"""Runs the C# course's programs (../data/csharp.js) with the .NET SDK.

Each example is a complete program, usually written with top-level
statements. It is compiled with the C# compiler that ships inside the SDK
(Roslyn's csc.dll, called directly, which is much faster than making a
project for every example) and run with dotnet. The compile sees the same
global usings as a new `dotnet new console` project, so the examples run
unchanged there. Without a .NET SDK, AVAILABLE is False and check_packs.py
skips this course. run_vbnet.py uses the same helpers for Visual Basic .NET.
"""
import glob
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

# The usings a console project gets from <ImplicitUsings>enable</ImplicitUsings>.
IMPLICIT_USINGS = ["System", "System.Collections.Generic", "System.IO", "System.Linq",
                   "System.Net.Http", "System.Threading", "System.Threading.Tasks"]


def _version_key(path):
    return [int(x) for x in re.findall(r"\d+", os.path.basename(path.rstrip("/")))]


def _find():
    dotnet = shutil.which("dotnet")
    if not dotnet:
        return None
    root = os.path.dirname(os.path.realpath(dotnet))
    compilers = sorted(glob.glob(os.path.join(root, "sdk", "*", "Roslyn", "bincore", "csc.dll")),
                       key=lambda p: _version_key(p.split(os.sep + "Roslyn")[0]))
    refs = sorted(glob.glob(os.path.join(root, "packs", "Microsoft.NETCore.App.Ref", "*", "ref", "net*")),
                  key=lambda p: _version_key(os.path.dirname(os.path.dirname(p))))
    if not compilers or not refs:
        return None
    return {"dotnet": dotnet, "bincore": os.path.dirname(compilers[-1]), "ref": refs[-1],
            "tfm": os.path.basename(refs[-1])}


DOTNET = _find()
AVAILABLE = DOTNET is not None
ENV = dict(os.environ, DOTNET_NOLOGO="1", DOTNET_CLI_TELEMETRY_OPTOUT="1",
           DOTNET_SKIP_FIRST_TIME_EXPERIENCE="1")


def compile_and_run(src, compiler, filename, extra_args):
    """Compiles src with csc.dll or vbc.dll and runs it. Returns (printed text, error text)."""
    if not AVAILABLE:
        return "", "the .NET SDK is not installed"
    with tempfile.TemporaryDirectory() as tmp:
        with open(os.path.join(tmp, filename), "w", encoding="utf-8") as f:
            f.write(src)
        refs = ["-r:" + p for p in sorted(glob.glob(os.path.join(DOTNET["ref"], "*.dll")))]
        cmd = [DOTNET["dotnet"], os.path.join(DOTNET["bincore"], compiler), "-nologo", "-noconfig",
               "-nostdlib", "-target:exe", "-out:prog.dll"] + extra_args(tmp) + refs + [filename]
        c = subprocess.run(cmd, capture_output=True, text=True, cwd=tmp, timeout=120, env=ENV)
        if c.returncode != 0:
            msg = [l for l in (c.stdout + c.stderr).splitlines() if "error" in l]
            return "", "compile failed: " + " | ".join(msg[:4])
        major = DOTNET["tfm"].replace("net", "").split(".")[0]
        with open(os.path.join(tmp, "prog.runtimeconfig.json"), "w") as f:
            json.dump({"runtimeOptions": {"tfm": DOTNET["tfm"], "rollForward": "LatestMajor", "framework": {
                "name": "Microsoft.NETCore.App", "version": major + ".0.0"}}}, f)
        r = subprocess.run([DOTNET["dotnet"], "prog.dll"], capture_output=True, text=True, cwd=tmp,
                           timeout=30, input="", env=ENV)
        out = r.stdout.replace("\r", "").rstrip("\n")
        err = "" if r.returncode == 0 else f"exit code {r.returncode} {r.stderr.strip()[:300]}"
        return out, err


def _csharp_args(tmp):
    with open(os.path.join(tmp, "GlobalUsings.cs"), "w", encoding="utf-8") as f:
        f.write("".join(f"global using global::{u};\n" for u in IMPLICIT_USINGS))
    return ["-langversion:latest", "-nullable:enable", "GlobalUsings.cs"]


def run(src):
    """Returns (printed text, error text)."""
    return compile_and_run(src, "csc.dll", "Program.cs", _csharp_args)


if __name__ == "__main__":
    print(run(sys.stdin.read())[0] if not sys.argv[1:] else run(open(sys.argv[1], encoding="utf-8").read())[0])
