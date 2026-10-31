#!/usr/bin/env python3
"""A Whitespace interpreter for checking the course in ../data/whitespace.js.

The course writes programs with S, T and L standing for space, tab and line
feed, so this runner reads only the capital letters S, T and L (notes in
the examples are written in lower case). Real space, tab and line-feed
characters are not read, which lets the examples be laid out freely.
Input commands read nothing (end of input).

    python3 run_whitespace.py program.txt      prints what the program prints
"""
import sys


class WsError(Exception):
    pass


def parse(src):
    code = "".join(c for c in src if c in "STL")
    pos = 0

    def number():
        nonlocal pos
        end = code.find("L", pos)
        if end < 0:
            raise WsError("number without an L at the end")
        bits = code[pos:end]
        pos = end + 1
        if not bits:
            raise WsError("number without a sign")
        sign, digits = bits[0], bits[1:]
        v = int(digits.replace("S", "0").replace("T", "1"), 2) if digits else 0
        return -v if sign == "T" else v

    def label():
        nonlocal pos
        end = code.find("L", pos)
        if end < 0:
            raise WsError("label without an L at the end")
        lab = code[pos:end]
        pos = end + 1
        return lab

    table = [
        ("SS", "push", number), ("SLS", "dup", None), ("STS", "copy", number), ("STL", "slide", number),
        ("SLT", "swap", None), ("SLL", "drop", None),
        ("TSSS", "add", None), ("TSST", "sub", None), ("TSSL", "mul", None), ("TSTS", "div", None), ("TSTT", "mod", None),
        ("TTS", "store", None), ("TTT", "load", None),
        ("LSS", "mark", label), ("LST", "call", label), ("LSL", "jump", label), ("LTS", "jz", label), ("LTT", "jn", label),
        ("LTL", "ret", None), ("LLL", "end", None),
        ("TLSS", "putc", None), ("TLST", "putn", None), ("TLTS", "getc", None), ("TLTT", "getn", None),
    ]
    prog = []
    while pos < len(code):
        for pre, name, arg in table:
            if code.startswith(pre, pos):
                pos += len(pre)
                prog.append((name, arg() if arg else None))
                break
        else:
            raise WsError(f"no command starts with {code[pos:pos + 4]!r}")
    return prog


def execute(prog, max_steps=1_000_000):
    labels = {}
    for i, (name, arg) in enumerate(prog):
        if name == "mark":
            if arg in labels:
                raise WsError(f"label {arg!r} marked twice")
            labels[arg] = i
    stack, heap, calls, out = [], {}, [], []
    pc = steps = 0

    def pop():
        if not stack:
            raise WsError("the stack is empty")
        return stack.pop()

    while True:
        if pc >= len(prog):
            raise WsError("ran off the end without LLL")
        steps += 1
        if steps > max_steps:
            raise WsError("too many steps (endless loop?)")
        name, arg = prog[pc]
        pc += 1
        if name == "push":
            stack.append(arg)
        elif name == "dup":
            v = pop()
            stack += [v, v]
        elif name == "copy":
            if not 0 <= arg < len(stack):
                raise WsError("copy reaches past the stack")
            stack.append(stack[-1 - arg])
        elif name == "slide":
            top = pop()
            del stack[len(stack) - arg:]
            stack.append(top)
        elif name == "swap":
            a, b = pop(), pop()
            stack += [a, b]
        elif name == "drop":
            pop()
        elif name in ("add", "sub", "mul", "div", "mod"):
            b, a = pop(), pop()
            if name in ("div", "mod") and b == 0:
                raise WsError("division by zero")
            stack.append({"add": a + b, "sub": a - b, "mul": a * b, "div": a // b, "mod": a % b}[name])
        elif name == "store":
            v, addr = pop(), pop()
            heap[addr] = v
        elif name == "load":
            stack.append(heap.get(pop(), 0))
        elif name == "mark":
            pass
        elif name in ("call", "jump", "jz", "jn"):
            if arg not in labels:
                raise WsError(f"no label {arg!r}")
            if name == "call":
                calls.append(pc)
                pc = labels[arg]
            elif name == "jump":
                pc = labels[arg]
            else:
                v = pop()
                if (name == "jz" and v == 0) or (name == "jn" and v < 0):
                    pc = labels[arg]
        elif name == "ret":
            if not calls:
                raise WsError("return without a call")
            pc = calls.pop()
        elif name == "end":
            return "".join(out)
        elif name == "putc":
            out.append(chr(pop()))
        elif name == "putn":
            out.append(str(pop()))
        elif name in ("getc", "getn"):
            heap[pop()] = -1 if name == "getc" else 0


def run(src):
    """Returns (printed text, error text)."""
    try:
        return execute(parse(src)).rstrip("\n"), ""
    except WsError as e:
        return "", str(e)


if __name__ == "__main__":
    out, err = run(open(sys.argv[1]).read())
    print(out)
    if err:
        print("ERROR:", err, file=sys.stderr)
        sys.exit(1)
