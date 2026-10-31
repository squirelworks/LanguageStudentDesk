#!/usr/bin/env python3
"""A Malbolge interpreter for checking the course in ../data/malbolge.js.

Programs can be given as ordinary Malbolge or in normalized form, where each
cell is written as the letter of the instruction it performs there
(i < / * j p o v). A program made only of those letters is read as
normalized and converted back before it runs. Spaces and line breaks are
ignored. Input reads nothing (end of input gives 59048).

    python3 run_malbolge.py program.mb      prints what the program prints
"""
import sys

SIZE = 3 ** 10
CRAZY = ((1, 0, 0), (1, 0, 2), (2, 2, 1))  # CRAZY[trit of [d]][trit of a]
ENCRYPT = ('5z]&gqtyfr$(we4{WP)H-Zn,[%\\3dL+Q;>U!pJS72FhOA1CB'
           '6v^=I_0/8|jsb9m<.TVac`uY*MK\'X~xDl}REokN:#?G"i@')
OPS = {4: "i", 5: "<", 23: "/", 39: "*", 40: "j", 62: "p", 68: "o", 81: "v"}
LETTER = {v: k for k, v in OPS.items()}
MAX_STEPS = 1_000_000


class MbError(Exception):
    pass


def crazy(a, d):
    r, p = 0, 1
    for _ in range(10):
        r += CRAZY[d % 3][a % 3] * p
        a //= 3
        d //= 3
        p *= 3
    return r


def rotate(n):
    return n // 3 + n % 3 * 3 ** 9


def denormalize(text):
    """Turn normalized letters into the characters that run them at each place."""
    out = []
    for i, ch in enumerate(text):
        ch = (LETTER[ch] - i - 33) % 94 + 33
        out.append(chr(ch))
    return "".join(out)


def normalize(code):
    return "".join(OPS.get((ord(ch) + i) % 94, "?") for i, ch in enumerate(code))


def load(src):
    code = "".join(src.split())
    if code and set(code) <= set(LETTER):
        code = denormalize(code)
    if len(code) < 2:
        raise MbError("a program needs at least two characters")
    mem = [0] * SIZE
    for i, ch in enumerate(code):
        v = ord(ch)
        if not 33 <= v <= 126 or (v + i) % 94 not in OPS:
            raise MbError(f"character {ch!r} at {i} is not an instruction there")
        mem[i] = v
    for i in range(len(code), SIZE):
        mem[i] = crazy(mem[i - 1], mem[i - 2])
    return mem


def run(src):
    try:
        mem = load(src)
    except MbError as e:
        return "", str(e)
    a = c = d = 0
    out = []
    for _ in range(MAX_STEPS):
        v = mem[c]
        if not 33 <= v <= 126:
            return "".join(out), f"cell {c} holds {v}, which is not an instruction"
        op = (v + c) % 94
        if op == 4:
            c = mem[d]
        elif op == 5:
            out.append(chr(a % 256))
        elif op == 23:
            a = SIZE - 1
        elif op == 39:
            a = mem[d] = rotate(mem[d])
        elif op == 40:
            d = mem[d]
        elif op == 62:
            a = mem[d] = crazy(a, mem[d])
        elif op == 81:
            return "".join(out).rstrip(" \n"), ""
        if 33 <= mem[c] <= 126:
            mem[c] = ord(ENCRYPT[mem[c] - 33])
        c = (c + 1) % SIZE
        d = (d + 1) % SIZE
    return "".join(out), "did not stop"


if __name__ == "__main__":
    printed, err = run(open(sys.argv[1]).read())
    print(printed)
    if err:
        sys.exit(err)
