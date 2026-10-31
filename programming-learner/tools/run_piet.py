#!/usr/bin/env python3
"""A Piet interpreter for checking the course in ../data/piet.js.

The course writes a program as a grid of codels, one row per line, each
codel a two-letter token: a lightness (l light, n normal, d dark) and a hue
(r red, y yellow, g green, c cyan, b blue, m magenta), or ww for white and
kk for black. Input commands read nothing (end of input).

    python3 run_piet.py program.txt      prints what the program prints
"""
import sys

HUES = "rygcbm"
LIGHT = "lnd"
COMMANDS = [
    [None, "push", "pop"],
    ["add", "subtract", "multiply"],
    ["divide", "mod", "not"],
    ["greater", "pointer", "switch"],
    ["duplicate", "roll", "in_number"],
    ["in_char", "out_number", "out_char"],
]
DIRS = [(1, 0), (0, 1), (-1, 0), (0, -1)]  # right, down, left, up (x, y)
MAX_STEPS = 100_000


class PietError(Exception):
    pass


def parse(src):
    rows = [line.split() for line in src.strip().splitlines() if line.strip()]
    if not rows or len({len(r) for r in rows}) != 1:
        raise PietError("every row must have the same number of codels")
    for r in rows:
        for t in r:
            if t not in ("ww", "kk") and not (len(t) == 2 and t[0] in LIGHT and t[1] in HUES):
                raise PietError(f"unknown codel {t!r}")
    return rows


def block(grid, x, y):
    colour = grid[y][x]
    seen, todo = {(x, y)}, [(x, y)]
    while todo:
        cx, cy = todo.pop()
        for dx, dy in DIRS:
            nx, ny = cx + dx, cy + dy
            if (nx, ny) not in seen and 0 <= ny < len(grid) and 0 <= nx < len(grid[0]) and grid[ny][nx] == colour:
                seen.add((nx, ny))
                todo.append((nx, ny))
    return seen


def exit_codel(codels, dp, cc):
    dx, dy = DIRS[dp]
    far = max(x * dx + y * dy for x, y in codels)
    edge = [(x, y) for x, y in codels if x * dx + y * dy == far]
    # cc 0 is left of dp (counterclockwise), 1 is right (clockwise)
    sx, sy = DIRS[(dp + (1 if cc else 3)) % 4]
    return max(edge, key=lambda p: p[0] * sx + p[1] * sy)


def run(src):
    try:
        grid = parse(src)
    except PietError as e:
        return "", str(e)
    w, h = len(grid[0]), len(grid)

    def free(x, y):
        return 0 <= x < w and 0 <= y < h and grid[y][x] != "kk"

    x = y = dp = cc = 0
    stack, out = [], []
    for _ in range(MAX_STEPS):
        codels = block(grid, x, y)
        for attempt in range(8):
            ex, ey = exit_codel(codels, dp, cc)
            nx, ny = ex + DIRS[dp][0], ey + DIRS[dp][1]
            if free(nx, ny):
                break
            if attempt % 2 == 0:
                cc ^= 1
            else:
                dp = (dp + 1) % 4
        else:
            return "".join(out), ""
        if grid[ny][nx] == "ww":
            seen = set()
            while grid[ny][nx] == "ww":
                if (nx, ny, dp, cc) in seen:
                    return "".join(out), ""
                seen.add((nx, ny, dp, cc))
                fx, fy = nx + DIRS[dp][0], ny + DIRS[dp][1]
                if free(fx, fy):
                    nx, ny = fx, fy
                else:
                    cc ^= 1
                    dp = (dp + 1) % 4
            x, y = nx, ny
            continue
        a, b = grid[y][x], grid[ny][nx]
        if a != "ww":
            hue = (HUES.index(b[1]) - HUES.index(a[1])) % 6
            dark = (LIGHT.index(b[0]) - LIGHT.index(a[0])) % 3
            cmd = COMMANDS[hue][dark]
            dp, cc = execute(cmd, len(codels), stack, out, dp, cc)
        x, y = nx, ny
    return "".join(out), "did not stop"


def execute(cmd, size, s, out, dp, cc):
    def need(n):
        return len(s) >= n

    if cmd == "push":
        s.append(size)
    elif cmd == "pop" and need(1):
        s.pop()
    elif cmd in ("add", "subtract", "multiply") and need(2):
        b, a = s.pop(), s.pop()
        s.append(a + b if cmd == "add" else a - b if cmd == "subtract" else a * b)
    elif cmd in ("divide", "mod") and need(2) and s[-1] != 0:
        b, a = s.pop(), s.pop()
        s.append(a // b if cmd == "divide" else a % b)
    elif cmd == "not" and need(1):
        s.append(int(not s.pop()))
    elif cmd == "greater" and need(2):
        b, a = s.pop(), s.pop()
        s.append(int(a > b))
    elif cmd == "pointer" and need(1):
        dp = (dp + s.pop()) % 4
    elif cmd == "switch" and need(1):
        cc = (cc + abs(s.pop())) % 2
    elif cmd == "duplicate" and need(1):
        s.append(s[-1])
    elif cmd == "roll" and need(2) and 0 <= s[-2] <= len(s) - 2:
        rolls, depth = s.pop(), s.pop()
        if depth:
            part = s[-depth:]
            rolls %= depth
            s[-depth:] = part[-rolls:] + part[:-rolls]
    elif cmd == "out_number" and need(1):
        out.append(str(s.pop()))
    elif cmd == "out_char" and need(1):
        out.append(chr(s.pop()))
    return dp, cc


if __name__ == "__main__":
    printed, err = run(open(sys.argv[1]).read())
    print(printed)
    if err:
        sys.exit(err)
