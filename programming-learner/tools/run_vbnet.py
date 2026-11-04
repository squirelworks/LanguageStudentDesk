#!/usr/bin/env python3
"""Runs the Visual Basic .NET course's programs (../data/vbnet.js) with the .NET SDK.

Each example is a complete program with a Module and a Sub Main. It is
compiled with the Visual Basic compiler that ships inside the SDK (vbc.dll,
found next to the C# compiler) through the helpers in run_csharp.py, and
run with dotnet. The compile uses the same project imports and Option
settings as `dotnet new console -lang VB`, except that Option Strict is on,
so the examples also build in a project that turns it on. Without a .NET
SDK, AVAILABLE is False and check_packs.py skips this course.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import run_csharp  # noqa: E402

IMPORTS = ["Microsoft.VisualBasic", "System", "System.Collections", "System.Collections.Generic",
           "System.Diagnostics", "System.Linq", "System.Threading.Tasks"]

AVAILABLE = run_csharp.AVAILABLE and os.path.exists(
    os.path.join(run_csharp.DOTNET["bincore"], "vbc.dll"))


def _vb_args(tmp):
    return ["-vbruntime:" + os.path.join(run_csharp.DOTNET["ref"], "Microsoft.VisualBasic.dll"),
            '-define:_MYTYPE="Empty"', "-optionexplicit+", "-optionstrict+", "-optioninfer+",
            "-optioncompare:binary", "-imports:" + ",".join(IMPORTS)]


def run(src):
    """Returns (printed text, error text)."""
    if not AVAILABLE:
        return "", "the .NET SDK (with its Visual Basic compiler) is not installed"
    return run_csharp.compile_and_run(src, "vbc.dll", "Program.vb", _vb_args)


if __name__ == "__main__":
    print(run(sys.stdin.read())[0] if not sys.argv[1:] else run(open(sys.argv[1], encoding="utf-8").read())[0])
