#!/usr/bin/env python3
"""A small LOLCODE 1.2 interpreter for checking the course in ../data/lolcode.js.

Follows the 1.2 specification as the lci interpreter runs it: VISIBLE (with !
to stay on the line), GIMMEH (reads nothing here), variables and types, MAEK
and IS NOW A, the maths, logic and comparison operators, SMOOSH, O RLY? with
MEBBE, WTF? with fall-through and GTFO, IM IN YR loops with UPPIN/NERFIN and
TIL/WILE, and HOW IZ I functions. A NUMBAR prints with two decimal places.
Snippets without HAI/KTHXBYE run as if they had them.

    python3 run_lolcode.py program.lol      prints what the program prints
"""
import re
import sys


class LolError(Exception):
    pass


class Noob:
    def __repr__(self):
        return "NOOB"


NOOB = Noob()


class Yarn(str):
    """A YARN value, kept apart from identifiers in the token stream."""


# ---------- values ----------
def type_of(v):
    if v is NOOB:
        return "NOOB"
    if isinstance(v, bool):
        return "TROOF"
    if isinstance(v, int):
        return "NUMBR"
    if isinstance(v, float):
        return "NUMBAR"
    return "YARN"


def to_yarn(v):
    if v is NOOB:
        raise LolError("cannot turn NOOB into a YARN")
    if isinstance(v, bool):
        return "WIN" if v else "FAIL"
    if isinstance(v, float):
        return "%.2f" % (int(v * 100) / 100)  # lci truncates to two places
    return str(v)


def to_troof(v):
    if v is NOOB:
        return False
    if isinstance(v, str):
        return v != ""
    return bool(v)


def to_num(v, what="NUMBR"):
    if isinstance(v, bool):
        return int(v)
    if isinstance(v, (int, float)):
        return v
    if v is NOOB:
        if what == "cast":
            return 0
        raise LolError("cannot do maths with NOOB")
    s = v.strip()
    if re.fullmatch(r"-?\d+", s):
        return int(s)
    if re.fullmatch(r"-?\d*\.\d+", s):
        return float(s)
    raise LolError(f"cannot turn the YARN {v!r} into a number")


def cast(v, t):
    if t == "TROOF":
        return to_troof(v)
    if t == "YARN":
        return "" if v is NOOB else to_yarn(v)
    if t == "NUMBR":
        n = to_num(v, "cast")
        return int(n)
    if t == "NUMBAR":
        return float(to_num(v, "cast"))
    if t == "NOOB":
        return NOOB
    raise LolError(f"unknown type {t}")


# ---------- tokens ----------
ESC = {")": "\n", ">": "\t", "o": "\a", '"': '"', ":": ":"}


def tokenize(src):
    """Returns a list of lines; each line is a list of tokens (str words, Yarn strings)."""
    lines, cur = [], []
    i, n = 0, len(src)
    in_block = False
    while i < n:
        ch = src[i]
        if in_block:
            m = re.compile(r"\bTLDR\b").search(src, i)
            if not m:
                raise LolError("OBTW without TLDR")
            i = m.end()
            in_block = False
            continue
        if ch == "\n" or ch == ",":
            if cur:
                lines.append(cur)
                cur = []
            i += 1
            continue
        if ch.isspace():
            i += 1
            continue
        if src.startswith("...", i) or src.startswith("…", i):
            # line continues on the next line
            j = src.find("\n", i)
            i = n if j < 0 else j + 1
            continue
        if ch == '"':
            j, buf = i + 1, ""
            while True:
                if j >= n or src[j] == "\n":
                    raise LolError("string without a closing quote")
                c = src[j]
                if c == '"':
                    break
                if c == ":":
                    nxt = src[j + 1]
                    if nxt in ESC:
                        buf += ESC[nxt]
                        j += 2
                        continue
                    if nxt == "{":
                        k = src.index("}", j)
                        buf += "\0{" + src[j + 2:k] + "}"
                        j = k + 1
                        continue
                    raise LolError(f"unknown escape :{nxt}")
                buf += c
                j += 1
            cur.append(Yarn(buf))
            i = j + 1
            continue
        m = re.compile(r"[^\s,\"]+").match(src, i)
        word = m.group(0)
        i = m.end()
        if word == "BTW":
            j = src.find("\n", i)
            i = n if j < 0 else j
            continue
        if word == "OBTW":
            in_block = True
            continue
        if len(word) > 1 and word.endswith("!"):
            # like lci, a ! is its own token even when it touches a word
            cur += [word[:-1], "!"]
            continue
        cur.append(word)
    if cur:
        lines.append(cur)
    return lines


# ---------- control flow signals ----------
OWN = "\0own"  # env key: the names declared in this scope (not those seen from outside)


class Gtfo(Exception):
    pass


class Found(Exception):
    def __init__(self, value):
        self.value = value


class Func:
    def __init__(self, params, body):
        self.params, self.body = params, body


class Interp:
    def __init__(self, lines, max_steps=500_000):
        self.lines = lines
        self.out = []
        self.funcs = {}
        self.steps = 0
        self.max_steps = max_steps

    # ---- expressions ----
    def expr(self, toks, i, env):
        """Parses one expression starting at toks[i]; returns (value, next index)."""
        if i >= len(toks):
            raise LolError("expected a value")
        t = toks[i]
        if isinstance(t, Yarn):
            return self.interpolate(t, env), i + 1
        two = " ".join(map(str, toks[i:i + 2]))
        binary = {
            "SUM OF": lambda a, b: self.math(a, b, lambda x, y: x + y),
            "DIFF OF": lambda a, b: self.math(a, b, lambda x, y: x - y),
            "PRODUKT OF": lambda a, b: self.math(a, b, lambda x, y: x * y),
            "QUOSHUNT OF": lambda a, b: self.math(a, b, self.div),
            "MOD OF": lambda a, b: self.math(a, b, self.mod),
            "BIGGR OF": lambda a, b: self.math(a, b, max),
            "SMALLR OF": lambda a, b: self.math(a, b, min),
            "BOTH OF": lambda a, b: to_troof(a) and to_troof(b),
            "EITHER OF": lambda a, b: to_troof(a) or to_troof(b),
            "WON OF": lambda a, b: to_troof(a) != to_troof(b),
            "BOTH SAEM": self.same,
            "DIFFRINT": lambda a, b: not self.same(a, b),
        }
        key = two if two in binary else (t if t == "DIFFRINT" else None)
        if key:
            i += len(key.split())
            a, i = self.expr(toks, i, env)
            if i < len(toks) and toks[i] == "AN":
                i += 1
            b, i = self.expr(toks, i, env)
            return binary[key](a, b), i
        if t == "NOT":
            v, i = self.expr(toks, i + 1, env)
            return not to_troof(v), i
        if two in ("ALL OF", "ANY OF") or t == "SMOOSH":
            i += 1 if t == "SMOOSH" else 2
            vals = []
            while i < len(toks) and toks[i] != "MKAY":
                if toks[i] == "AN":
                    i += 1
                    continue
                v, i = self.expr(toks, i, env)
                vals.append(v)
            i += 1 if i < len(toks) else 0
            if t == "SMOOSH":
                return "".join(to_yarn(v) for v in vals), i
            if two == "ALL OF":
                return all(to_troof(v) for v in vals), i
            return any(to_troof(v) for v in vals), i
        if t == "MAEK":
            v, i = self.expr(toks, i + 1, env)
            if i < len(toks) and toks[i] == "A":
                i += 1
            return cast(v, toks[i]), i + 1
        if two == "I IZ":
            name = toks[i + 2]
            i += 3
            args = []
            while i < len(toks) and toks[i] != "MKAY":
                if toks[i] in ("YR", "AN"):
                    i += 1
                    continue
                v, i = self.expr(toks, i, env)
                args.append(v)
            i += 1 if i < len(toks) else 0
            return self.call(name, args), i
        if t == "WIN":
            return True, i + 1
        if t == "FAIL":
            return False, i + 1
        if t == "NOOB":
            return NOOB, i + 1
        if re.fullmatch(r"-?\d+", t):
            return int(t), i + 1
        if re.fullmatch(r"-?\d*\.\d+", t):
            return float(t), i + 1
        if t in env:
            return env[t], i + 1
        raise LolError(f"unknown variable {t!r}")

    def interpolate(self, y, env):
        def var(m):
            name = m.group(1)
            if name not in env:
                raise LolError(f"unknown variable {name!r} in a string")
            return to_yarn(env[name])
        return re.sub(r"\0\{([^}]*)\}", var, str(y))

    @staticmethod
    def div(x, y):
        if y == 0:
            raise LolError("division by zero")
        if isinstance(x, int) and isinstance(y, int):
            q = abs(x) // abs(y)
            return q if (x < 0) == (y < 0) else -q
        return x / y

    @staticmethod
    def mod(x, y):
        if y == 0:
            raise LolError("division by zero")
        if isinstance(x, int) and isinstance(y, int):
            r = abs(x) % abs(y)
            return r if x >= 0 else -r
        import math
        return math.fmod(x, y)

    @staticmethod
    def math(a, b, op):
        x, y = to_num(a), to_num(b)
        r = op(x, y)
        if isinstance(x, float) or isinstance(y, float):
            return float(r)
        return int(r)

    @staticmethod
    def same(a, b):
        if type_of(a) in ("NUMBR", "NUMBAR") and type_of(b) in ("NUMBR", "NUMBAR"):
            return float(a) == float(b)
        return type_of(a) == type_of(b) and a == b

    # ---- statements ----
    def run(self):
        lines = self.lines
        if lines and lines[0][0] == "HAI":
            lines = lines[1:]
        if lines and lines[-1][0] == "KTHXBYE":
            lines = lines[:-1]
        env = {"IT": NOOB}
        try:
            self.block(lines, env)
        except Gtfo:
            pass
        return "".join(self.out)

    def find_end(self, lines, i, opens, closes):
        """Index of the line that closes the block opened at lines[i]."""
        depth = 0
        for j in range(i, len(lines)):
            if opens(lines[j]):
                depth += 1
            elif closes(lines[j]):
                depth -= 1
                if depth == 0:
                    return j
        raise LolError(f"block opened by {' '.join(map(str, lines[i]))!r} is never closed")

    @staticmethod
    def starts(line, *words):
        return [str(w) for w in line[:len(words)]] == list(words)

    def block(self, lines, env):
        i = 0
        while i < len(lines):
            self.steps += 1
            if self.steps > self.max_steps:
                raise LolError("too many steps (endless loop?)")
            i = self.statement(lines, i, env)

    def statement(self, lines, i, env):
        L = lines[i]
        w = [str(t) if not isinstance(t, Yarn) else None for t in L]
        if w[0] == "CAN" or w[0] == "KTHXBYE":
            return i + 1
        if w[:3] == ["I", "HAS", "A"]:
            name = w[3]
            own = env.setdefault(OWN, set())
            if name in own:
                raise LolError(f"{name} is declared twice in the same place")
            own.add(name)
            if len(L) > 4 and w[4] == "ITZ":
                if w[5:6] == ["A"] and len(L) == 7 and w[6] in ("NUMBR", "NUMBAR", "YARN", "TROOF", "NOOB"):
                    env[name] = cast(NOOB, w[6]) if w[6] != "NOOB" else NOOB
                else:
                    env[name], _ = self.expr(L, 5, env)
            else:
                env[name] = NOOB
            return i + 1
        if len(L) >= 2 and w[1] == "R":
            if w[0] not in env:
                raise LolError(f"{w[0]} is used before I HAS A")
            env[w[0]], _ = self.expr(L, 2, env)
            return i + 1
        if len(L) >= 4 and w[1:4] == ["IS", "NOW", "A"]:
            env[w[0]] = cast(env[w[0]], w[4])
            return i + 1
        if w[0] == "VISIBLE":
            j, parts, newline = 1, [], True
            while j < len(L):
                if w[j] == "!" and j == len(L) - 1:
                    newline = False
                    break
                if w[j] == "AN":
                    j += 1
                    continue
                v, j = self.expr(L, j, env)
                parts.append(to_yarn(v))
            self.out.append("".join(parts) + ("\n" if newline else ""))
            return i + 1
        if w[0] == "GIMMEH":
            env[w[1]] = ""
            return i + 1
        if w[0] == "GTFO":
            raise Gtfo()
        if w[:2] == ["FOUND", "YR"]:
            v, _ = self.expr(L, 2, env)
            raise Found(v)
        if w[:2] == ["O", "RLY?"]:
            end = self.find_end(lines, i, lambda l: self.starts(l, "O", "RLY?") or self.starts(l, "WTF?"), lambda l: self.starts(l, "OIC"))
            self.orly(lines[i + 1:end], env)
            return end + 1
        if w[0] == "WTF?":
            end = self.find_end(lines, i, lambda l: self.starts(l, "O", "RLY?") or self.starts(l, "WTF?"), lambda l: self.starts(l, "OIC"))
            self.wtf(lines[i + 1:end], env)
            return end + 1
        if w[:3] == ["IM", "IN", "YR"]:
            label = w[3]
            end = self.find_end(lines, i, lambda l: self.starts(l, "IM", "IN", "YR"), lambda l: self.starts(l, "IM", "OUTTA", "YR"))
            self.loop(L, lines[i + 1:end], env)
            return end + 1
        if w[:3] == ["HOW", "IZ", "I"]:
            end = self.find_end(lines, i, lambda l: self.starts(l, "HOW", "IZ", "I"), lambda l: self.starts(l, "IF", "U", "SAY", "SO"))
            params = [w[k + 1] for k in range(4, len(w)) if w[k] == "YR"]
            self.funcs[w[3]] = Func(params, lines[i + 1:end])
            return end + 1
        # a bare expression goes into IT
        v, j = self.expr(L, 0, env)
        if j != len(L):
            raise LolError(f"did not understand {' '.join(map(str, L))!r}")
        env["IT"] = v
        return i + 1

    def orly(self, body, env):
        # split into YA RLY / MEBBE / NO WAI parts at depth 0
        parts, depth = [], 0
        for k, l in enumerate(body):
            if self.starts(l, "O", "RLY?") or self.starts(l, "WTF?"):
                depth += 1
            elif self.starts(l, "OIC"):
                depth -= 1
            elif depth == 0 and (self.starts(l, "YA", "RLY") or self.starts(l, "MEBBE") or self.starts(l, "NO", "WAI")):
                parts.append(k)
        parts.append(len(body))
        for a, b in zip(parts, parts[1:]):
            head = body[a]
            if self.starts(head, "YA", "RLY"):
                ok = to_troof(env["IT"])
            elif self.starts(head, "MEBBE"):
                v, _ = self.expr(head, 1, env)
                env["IT"] = v
                ok = to_troof(v)
            else:
                ok = True
            if ok:
                self.block(body[a + 1:b], env)
                return

    def wtf(self, body, env):
        cases, depth = [], 0
        for k, l in enumerate(body):
            if self.starts(l, "O", "RLY?") or self.starts(l, "WTF?") or self.starts(l, "IM", "IN", "YR"):
                depth += 1
            elif self.starts(l, "OIC") or self.starts(l, "IM", "OUTTA", "YR"):
                depth -= 1
            elif depth == 0 and (self.starts(l, "OMG") or self.starts(l, "OMGWTF")):
                cases.append(k)
        it = env["IT"]
        start = None
        for k in cases:
            head = body[k]
            if str(head[0]) == "OMGWTF":
                start = k if start is None else start
                break
            v, _ = self.expr(head, 1, env)
            if self.same(it, v):
                start = k
                break
        if start is None:
            return
        # fall through from the matching case until GTFO
        rest = [l for l in body[start:] if not (str(l[0]) in ("OMG", "OMGWTF") and l in [body[c] for c in cases])]
        try:
            self.block(rest, env)
        except Gtfo:
            pass

    def loop(self, head, body, env):
        w = [str(t) for t in head]
        op = var = cond = None
        k = 4
        if k < len(w) and w[k] in ("UPPIN", "NERFIN"):
            op, var = w[k], w[k + 2]
            k += 3
        elif k < len(w) and w[k] not in ("TIL", "WILE"):
            raise LolError(f"unknown loop operation {w[k]}")
        if k < len(w) and w[k] in ("TIL", "WILE"):
            cond = (w[k], k + 1)
        # the loop body is its own scope; the counter always starts at 0 and belongs to it
        local = dict(env)
        local[OWN] = set()
        if var:
            local[var] = 0
        try:
            while True:
                self.steps += 1
                if self.steps > self.max_steps:
                    raise LolError("too many steps (endless loop?)")
                if cond:
                    v, _ = self.expr(head, cond[1], local)
                    if to_troof(v) == (cond[0] == "TIL"):
                        break
                self.block(body, local)
                if op:
                    local[var] = to_num(local[var]) + (1 if op == "UPPIN" else -1)
        except Gtfo:
            pass
        # write back the outer variables the loop changed
        for name in env:
            if name not in (OWN, var):
                env[name] = local[name]

    def call(self, name, args):
        f = self.funcs.get(name)
        if not f:
            raise LolError(f"no function called {name}")
        if len(args) != len(f.params):
            raise LolError(f"{name} wants {len(f.params)} values, got {len(args)}")
        env = {"IT": NOOB}
        env.update(zip(f.params, args))
        try:
            self.block(f.body, env)
        except Found as r:
            return r.value
        except Gtfo:
            return NOOB
        return env["IT"]


def run(src):
    """Returns (printed text, error text)."""
    try:
        return Interp(tokenize(src)).run().rstrip("\n"), ""
    except (LolError, RecursionError) as e:
        return "", str(e)


if __name__ == "__main__":
    out, err = run(open(sys.argv[1]).read())
    print(out)
    if err:
        print("ERROR:", err, file=sys.stderr)
        sys.exit(1)
