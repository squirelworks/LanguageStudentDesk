#!/usr/bin/env python3
"""A small QuickBASIC interpreter for checking the course in ../data/quickbasic.js.

Covers what the course uses: PRINT (with ; , TAB and SPC, and QuickBASIC's
spaces around numbers), variables with type suffixes and DIM ... AS, arrays,
CONST, block and one-line IF, FOR/NEXT, DO/LOOP, WHILE/WEND, SELECT CASE,
EXIT, SUB and FUNCTION (arguments by reference unless bracketed), DIM SHARED,
SWAP, DATA/READ/RESTORE and the common string and maths functions.
Numbers are SINGLE unless typed otherwise and print with up to 7 digits;
spaces at the end of a line are dropped from the result, since nobody sees them.
Not covered: GOTO/GOSUB, PRINT USING, files, graphics, INPUT and RND.

    python3 run_quickbasic.py program.bas      prints what the program prints
"""
import math
import re
import sys


class BasError(Exception):
    pass


# ---------- lexer ----------
TOKEN = re.compile(r"""
    (?P<ws>[ \t]+)
  | (?P<str>"[^"]*"?)
  | (?P<comment>'.*)
  | (?P<num>&H[0-9A-F]+|(?:\d+\.?\d*|\.\d+)(?:[ED][+-]?\d+)?[%&!#]?)
  | (?P<name>[A-Z][A-Z0-9_.]*[$%&!#]?)
  | (?P<op><>|<=|>=|[-+*/\\^=<>(),;:])
""", re.I | re.X)


class Tok:
    __slots__ = ("kind", "text")

    def __init__(self, kind, text):
        self.kind, self.text = kind, text

    def __repr__(self):
        return self.text

    @property
    def up(self):
        return self.text.upper()


def lex(line):
    toks, i = [], 0
    while i < len(line):
        m = TOKEN.match(line, i)
        if not m:
            raise BasError(f"cannot read {line[i:]!r}")
        i = m.end()
        kind = m.lastgroup
        if kind == "ws":
            continue
        if kind == "comment":
            break
        text = m.group(0)
        if kind == "name" and text.upper() == "REM":
            break
        toks.append(Tok(kind, text))
    return toks


# ---------- values ----------
def num_text(v):
    """A number the way PRINT and STR$ spell it, without the padding."""
    if isinstance(v, int) or (isinstance(v, float) and v.is_integer() and abs(v) < 1e7):
        s = str(int(v))
    else:
        s = "%.7G" % v
        if "E" in s:
            mant, exp = s.split("E")
            if "." in mant:
                mant = mant.rstrip("0").rstrip(".")
            s = mant + "E" + exp[0] + exp[1:].zfill(2)
        elif "." in s:
            s = s.rstrip("0").rstrip(".")
        s = s.replace("0.", ".", 1) if s.startswith(("0.", "-0.")) else s
    return s if s.startswith("-") else " " + s


def kind_of(name, dimmed):
    n = name.upper()
    if n in dimmed:
        return dimmed[n]
    return {"$": "STRING", "%": "INTEGER", "&": "LONG", "!": "SINGLE", "#": "DOUBLE"}.get(n[-1], "SINGLE")


def round_half_even(x):
    return int(round(x))  # Python rounds halves to even, as QuickBASIC does


def coerce(kind, v, name="value"):
    if kind == "STRING":
        if not isinstance(v, str):
            raise BasError(f"type mismatch: {name} wants text")
        return v
    if isinstance(v, str):
        raise BasError(f"type mismatch: {name} wants a number")
    if kind in ("INTEGER", "LONG"):
        r = round_half_even(v)
        lim = 32768 if kind == "INTEGER" else 2 ** 31
        if not -lim <= r < lim:
            raise BasError("overflow")
        return r
    return float(v)


def default(kind):
    return "" if kind == "STRING" else (0 if kind in ("INTEGER", "LONG") else 0.0)


class Cell:
    __slots__ = ("v", "kind")

    def __init__(self, v, kind):
        self.v, self.kind = v, kind


class Array:
    def __init__(self, kind, bounds):
        self.kind, self.bounds = kind, bounds
        size = 1
        for lo, hi in bounds:
            size *= hi - lo + 1
        self.data = [default(kind)] * size

    def index(self, idx):
        if len(idx) != len(self.bounds):
            raise BasError("wrong number of subscripts")
        pos = 0
        for i, (lo, hi) in zip(idx, self.bounds):
            i = round_half_even(i)
            if not lo <= i <= hi:
                raise BasError("subscript out of range")
            pos = pos * (hi - lo + 1) + (i - lo)
        return pos


class ElemRef:
    """A by-reference argument that is an array element."""

    def __init__(self, arr, pos):
        self.arr, self.pos = arr, pos

    @property
    def v(self):
        return self.arr.data[self.pos]

    @v.setter
    def v(self, x):
        self.arr.data[self.pos] = x

    @property
    def kind(self):
        return self.arr.kind


# ---------- parser ----------
class Stmt:
    def __init__(self, kind, line, **kw):
        self.kind, self.line = kind, line
        self.__dict__.update(kw)


def statements(src):
    """Splits the source into (tokens, line number) statements, keeping one-line IFs whole."""
    out = []
    for n, raw in enumerate(src.splitlines(), 1):
        toks = lex(raw)
        if toks and toks[0].kind == "num" and re.fullmatch(r"\d+", toks[0].text):
            toks = toks[1:]  # an old-style line number
        while toks:
            if toks[0].up == "IF":
                then = next((k for k, t in enumerate(toks) if t.up == "THEN"), None)
                if then is not None and then < len(toks) - 1:
                    out.append((toks, n))
                    break
            k = next((k for k, t in enumerate(toks) if t.text == ":"), len(toks))
            if k:
                out.append((toks[:k], n))
            toks = toks[k + 1:]
    return out


class Parser:
    def __init__(self, src):
        self.stmts = statements(src)
        self.i = 0
        self.subs = {}

    def program(self):
        body = self.block(set())
        if self.i < len(self.stmts):
            toks, n = self.stmts[self.i]
            raise BasError(f"line {n}: unexpected {' '.join(map(str, toks))}")
        return body

    def peek_words(self, k=2):
        if self.i >= len(self.stmts):
            return ""
        return " ".join(t.up for t in self.stmts[self.i][0][:k])

    def block(self, ends):
        body = []
        while self.i < len(self.stmts):
            toks, n = self.stmts[self.i]
            words1 = toks[0].up
            words2 = " ".join(t.up for t in toks[:2])
            if words1 in ends or words2 in ends:
                return body
            self.i += 1
            s = self.statement(toks, n)
            if s:
                body.append(s)
        if ends:
            raise BasError(f"missing {' or '.join(sorted(ends))}")
        return body

    def expect_end(self, *words):
        toks, n = self.stmts[self.i]
        self.i += 1
        return toks, n

    def statement(self, toks, n):
        w = toks[0].up
        w2 = " ".join(t.up for t in toks[:2])
        if w in ("CLS", "DECLARE", "DEFINT", "SCREEN", "COLOR", "LOCATE", "BEEP", "SLEEP", "RANDOMIZE", "WIDTH", "VIEW", "OPTION"):
            return None
        if w == "PRINT" or w == "?":
            return Stmt("print", n, toks=toks[1:])
        if w == "END" and len(toks) == 1:
            return Stmt("end", n)
        if w == "SYSTEM" or w == "STOP":
            return Stmt("end", n)
        if w == "DIM" or w == "REDIM":
            return Stmt("dim", n, toks=toks[1:])
        if w == "CONST":
            return Stmt("const", n, toks=toks[1:])
        if w == "SWAP":
            return Stmt("swap", n, toks=toks[1:])
        if w == "DATA":
            return Stmt("data", n, toks=toks[1:])
        if w == "READ":
            return Stmt("read", n, toks=toks[1:])
        if w == "RESTORE":
            return Stmt("restore", n)
        if w == "INPUT" or w == "LINE":
            raise BasError(f"line {n}: INPUT is not run by the checker")
        if w in ("GOTO", "GOSUB", "RETURN", "ON"):
            raise BasError(f"line {n}: {w} is not run by the checker")
        if w == "EXIT":
            return Stmt("exit", n, what=toks[1].up)
        if w == "IF":
            return self.if_stmt(toks, n)
        if w == "FOR":
            return self.for_stmt(toks, n)
        if w == "DO":
            return self.do_stmt(toks, n)
        if w == "WHILE":
            body = self.block({"WEND"})
            self.i += 1
            return Stmt("do", n, pre=("WHILE", toks[1:]), post=None, body=body)
        if w == "SELECT":
            return self.select_stmt(toks, n)
        if w in ("SUB", "FUNCTION"):
            return self.proc(toks, n, w)
        if w == "CALL":
            name = toks[1].up
            args = toks[2:]
            if args and args[0].text == "(" and args[-1].text == ")":
                args = args[1:-1]
            return Stmt("call", n, name=name, args=args)
        if w == "LET":
            toks = toks[1:]
        # assignment: target = expr
        eq = self.top_level_eq(toks)
        if eq is not None:
            return Stmt("let", n, target=toks[:eq], expr=toks[eq + 1:])
        # a SUB call without CALL
        if toks[0].kind == "name":
            return Stmt("call", n, name=toks[0].up, args=toks[1:])
        raise BasError(f"line {n}: cannot understand {' '.join(map(str, toks))}")

    @staticmethod
    def top_level_eq(toks):
        depth = 0
        for k, t in enumerate(toks):
            if t.text == "(":
                depth += 1
            elif t.text == ")":
                depth -= 1
            elif t.text == "=" and depth == 0:
                return k
        return None

    def if_stmt(self, toks, n):
        then = next(k for k, t in enumerate(toks) if t.up == "THEN")
        cond = toks[1:then]
        rest = toks[then + 1:]
        if rest:
            # one-line IF: THEN a : b ELSE c : d
            depth, els = 0, None
            for k, t in enumerate(rest):
                if t.up == "IF":
                    depth += 1
                if t.up == "ELSE":
                    if depth == 0:
                        els = k
                        break
            yes, no = (rest, []) if els is None else (rest[:els], rest[els + 1:])
            return Stmt("if", n, arms=[(cond, self.inline(yes, n))], other=self.inline(no, n))
        arms = [(cond, self.block({"ELSEIF", "ELSE", "END IF", "ENDIF"}))]
        other = []
        while True:
            toks2, n2 = self.stmts[self.i]
            self.i += 1
            w = toks2[0].up
            if w == "ELSEIF":
                th = next(k for k, t in enumerate(toks2) if t.up == "THEN")
                arms.append((toks2[1:th], self.block({"ELSEIF", "ELSE", "END IF", "ENDIF"})))
            elif w == "ELSE":
                other = self.block({"END IF", "ENDIF"})
            else:
                break
        return Stmt("if", n, arms=arms, other=other)

    def inline(self, toks, n):
        out, cur = [], []
        for t in toks + [Tok("op", ":")]:
            if t.text == ":":
                if cur:
                    s = self.statement(cur, n)
                    if s:
                        out.append(s)
                cur = []
            else:
                cur.append(t)
        return out

    def for_stmt(self, toks, n):
        eq = next(k for k, t in enumerate(toks) if t.text == "=")
        to = next(k for k, t in enumerate(toks) if t.up == "TO")
        step = next((k for k, t in enumerate(toks) if t.up == "STEP"), None)
        var = toks[1].up
        start = toks[eq + 1:to]
        end = toks[to + 1:step] if step else toks[to + 1:]
        stp = toks[step + 1:] if step else None
        body = self.block({"NEXT"})
        self.i += 1
        return Stmt("for", n, var=var, start=start, end=end, step=stp, body=body)

    def do_stmt(self, toks, n):
        pre = (toks[1].up, toks[2:]) if len(toks) > 1 else None
        body = self.block({"LOOP"})
        end, _ = self.stmts[self.i]
        self.i += 1
        post = (end[1].up, end[2:]) if len(end) > 1 else None
        return Stmt("do", n, pre=pre, post=post, body=body)

    def select_stmt(self, toks, n):
        subject = toks[2:]
        cases = []
        # skip anything before the first CASE
        self.block({"CASE", "END SELECT"})
        while True:
            toks2, n2 = self.stmts[self.i]
            self.i += 1
            if toks2[0].up == "END":
                break
            body = self.block({"CASE", "END SELECT"})
            cases.append((toks2[1:], body))
        return Stmt("select", n, subject=subject, cases=cases)

    def proc(self, toks, n, kind):
        name = toks[1].up
        params = []
        if len(toks) > 2 and toks[2].text == "(":
            k = 3
            while toks[k].text != ")":
                if toks[k].text == ",":
                    k += 1
                    continue
                p = toks[k].up
                k += 1
                ptype = None
                if toks[k].text == "(":   # an array parameter: a()
                    k += 2
                    p += "()"
                if toks[k].up == "AS":
                    ptype = toks[k + 1].up
                    k += 2
                params.append((p, ptype))
        body = self.block({"END " + kind})
        self.i += 1
        self.subs[name] = Stmt("proc", n, name=name, params=params, body=body, func=kind == "FUNCTION")
        return None


# ---------- interpreter ----------
class Exit(Exception):
    def __init__(self, what):
        self.what = what


class End(Exception):
    pass


BUILTINS = {
    "LEN": lambda s: len(s),
    "LEFT$": lambda s, n: s[:max(0, int(n))],
    "RIGHT$": lambda s, n: s[len(s) - int(n):] if n > 0 else "",
    "UCASE$": lambda s: s.upper(),
    "LCASE$": lambda s: s.lower(),
    "LTRIM$": lambda s: s.lstrip(" "),
    "RTRIM$": lambda s: s.rstrip(" "),
    "STR$": lambda v: num_text(v),
    "VAL": lambda s: Interp.val(s),
    "INT": lambda v: float(math.floor(v)),
    "FIX": lambda v: float(math.trunc(v)),
    "CINT": lambda v: round_half_even(v),
    "ABS": lambda v: abs(v),
    "SGN": lambda v: (v > 0) - (v < 0),
    "SQR": lambda v: math.sqrt(v),
    "CHR$": lambda v: chr(int(v)),
    "ASC": lambda s: ord(s[0]),
    "SPACE$": lambda n: " " * int(n),
    "STRING$": lambda n, c: (c[0] if isinstance(c, str) else chr(int(c))) * int(n),
    "HEX$": lambda v: "%X" % round_half_even(v),
}


class Interp:
    def __init__(self, parser, max_steps=1_000_000):
        self.p = parser
        self.out = []
        self.col = 0
        self.globals = {}
        self.shared = set()
        self.consts = {}
        self.dimmed = {}  # name -> kind declared with DIM ... AS
        self.data = []
        self.data_pos = 0
        self.steps = 0
        self.max_steps = max_steps

    # ---- output ----
    def write(self, s):
        for ch in s:
            self.out.append(ch)
            self.col = 0 if ch == "\n" else self.col + 1

    # ---- variables ----
    def cell(self, scope, name):
        if name in self.consts:
            raise BasError(f"{name} is a CONST")
        if name in scope["vars"]:
            return scope["vars"][name]
        if scope is not self.top and name in self.shared:
            return self.top["vars"][name] if name in self.top["vars"] else self.new_cell(self.top, name)
        return self.new_cell(scope, name)

    def new_cell(self, scope, name):
        kind = kind_of(name, scope["dimmed"])
        c = Cell(default(kind), kind)
        scope["vars"][name] = c
        return c

    def array(self, scope, name):
        if name + "()" in scope["vars"]:
            return scope["vars"][name + "()"]
        if scope is not self.top and name + "()" in self.shared:
            return self.top["vars"][name + "()"]
        # an undimensioned array gets 0 TO 10, as in QuickBASIC
        if name + "()" not in self.top["vars"] or scope is not self.top:
            arr = Array(kind_of(name, scope["dimmed"]), [(0, 10)])
            scope["vars"][name + "()"] = arr
            return arr
        return self.top["vars"][name + "()"]

    # ---- expressions ----
    def expr(self, toks, scope):
        self.t, self.k, self.scope = toks, 0, scope
        v = self.e_or()
        if self.k != len(toks):
            raise BasError(f"unexpected {toks[self.k]} in expression")
        return v

    def eval_at(self, toks, k, scope, stop=()):
        """Evaluates from toks[k] until a top-level stop token; returns (value, next k)."""
        depth, j = 0, k
        while j < len(toks):
            t = toks[j].text
            if t == "(":
                depth += 1
            elif t == ")":
                depth -= 1
            elif depth == 0 and (t in stop or toks[j].up in stop):
                break
            j += 1
        saved = (getattr(self, "t", None), getattr(self, "k", None), getattr(self, "scope", None))
        v = self.expr(toks[k:j], scope)
        self.t, self.k, self.scope = saved
        return v, j

    def look(self):
        return self.t[self.k] if self.k < len(self.t) else None

    def take(self, *texts):
        t = self.look()
        if t is not None and (t.text in texts or t.up in texts):
            self.k += 1
            return t
        return None

    @staticmethod
    def truth(b):
        return -1 if b else 0

    def e_or(self):
        v = self.e_and()
        while True:
            if self.take("OR"):
                v = int(v) | int(self.e_and())
            elif self.take("XOR"):
                v = int(v) ^ int(self.e_and())
            else:
                return v

    def e_and(self):
        v = self.e_not()
        while self.take("AND"):
            v = int(v) & int(self.e_not())
        return v

    def e_not(self):
        if self.take("NOT"):
            return ~int(self.e_not())
        return self.e_rel()

    def e_rel(self):
        v = self.e_add()
        while True:
            t = self.take("=", "<>", "<", ">", "<=", ">=")
            if not t:
                return v
            w = self.e_add()
            if isinstance(v, str) != isinstance(w, str):
                raise BasError("type mismatch in comparison")
            v = self.truth({"=": v == w, "<>": v != w, "<": v < w, ">": v > w, "<=": v <= w, ">=": v >= w}[t.text])

    def e_add(self):
        v = self.e_mod()
        while True:
            t = self.take("+", "-")
            if not t:
                return v
            w = self.e_mod()
            if t.text == "+":
                if isinstance(v, str) != isinstance(w, str):
                    raise BasError("type mismatch: cannot add text and a number")
                v = v + w
            else:
                v = self.num(v) - self.num(w)

    def e_mod(self):
        v = self.e_idiv()
        while self.take("MOD"):
            a, b = round_half_even(self.num(v)), round_half_even(self.num(self.e_idiv()))
            if b == 0:
                raise BasError("division by zero")
            v = int(math.fmod(a, b))
        return v

    def e_idiv(self):
        v = self.e_mul()
        while self.take("\\"):
            a, b = round_half_even(self.num(v)), round_half_even(self.num(self.e_mul()))
            if b == 0:
                raise BasError("division by zero")
            v = int(a / b)
        return v

    def e_mul(self):
        v = self.e_neg()
        while True:
            t = self.take("*", "/")
            if not t:
                return v
            w = self.e_neg()
            if t.text == "*":
                v = self.num(v) * self.num(w)
            else:
                if self.num(w) == 0:
                    raise BasError("division by zero")
                v = self.num(v) / self.num(w)

    def e_neg(self):
        if self.take("-"):
            return -self.num(self.e_neg())
        if self.take("+"):
            return self.e_neg()
        return self.e_pow()

    def e_pow(self):
        v = self.atom()
        while self.take("^"):
            v = self.num(v) ** self.num(self.atom())
        return v

    @staticmethod
    def num(v):
        if isinstance(v, str):
            raise BasError("type mismatch: text where a number was expected")
        return v

    def args(self):
        out = []
        if not self.take("("):
            return out
        if self.take(")"):
            return out
        while True:
            out.append(self.e_or())
            if self.take(")"):
                return out
            if not self.take(","):
                raise BasError("expected , or )")

    def atom(self):
        t = self.look()
        if t is None:
            raise BasError("expression ended too soon")
        self.k += 1
        if t.kind == "str":
            return t.text[1:-1] if t.text.endswith('"') and len(t.text) > 1 else t.text[1:]
        if t.kind == "num":
            s = t.text.upper()
            if s.startswith("&H"):
                return int(s[2:], 16)
            if s[-1] in "%&":
                return int(s[:-1])
            s = s.rstrip("!#").replace("D", "E")
            return float(s) if not re.fullmatch(r"\d+", s) else int(s)
        if t.text == "(":
            v = self.e_or()
            if not self.take(")"):
                raise BasError("missing )")
            return v
        if t.kind != "name":
            raise BasError(f"unexpected {t}")
        name = t.up
        if name == "MID$":
            a = self.args()
            s, start = a[0], int(a[1])
            return s[start - 1:start - 1 + int(a[2])] if len(a) > 2 else s[start - 1:]
        if name == "INSTR":
            a = self.args()
            if len(a) == 3:
                return a[1].find(a[2], int(a[0]) - 1) + 1
            return a[0].find(a[1]) + 1
        if name in ("TIMER", "RND", "INKEY$"):
            raise BasError(f"{name} gives a different answer every run")
        if name in BUILTINS:
            return BUILTINS[name](*self.args())
        if name in self.consts:
            return self.consts[name]
        if name in self.p.subs and self.p.subs[name].func:
            nxt = self.look()
            raw = []
            if nxt is not None and nxt.text == "(":
                # collect the raw argument tokens for by-reference passing
                depth, j = 0, self.k
                while True:
                    tt = self.t[j].text
                    depth += tt == "("
                    depth -= tt == ")"
                    j += 1
                    if depth == 0:
                        break
                raw = self.t[self.k + 1:j - 1]
                self.k = j
            saved = (self.t, self.k, self.scope)
            v = self.call(name, raw, self.scope)
            self.t, self.k, self.scope = saved
            return v
        nxt = self.look()
        if nxt is not None and nxt.text == "(":
            idx = self.args()
            arr = self.array(self.scope, name)
            return arr.data[arr.index(idx)]
        return self.cell(self.scope, name).v

    @staticmethod
    def val(s):
        m = re.match(r"\s*[-+]?(\d+\.?\d*|\.\d+)(E[-+]?\d+)?", s, re.I)
        return float(m.group(0)) if m else 0.0

    # ---- statements ----
    def run(self):
        self.top = {"vars": {}, "dimmed": self.dimmed}
        body = self.p.program()
        self.collect_data(body)
        try:
            self.block(body, self.top)
        except End:
            pass
        return "".join(self.out)

    def collect_data(self, body):
        for s in body:
            if s.kind == "data":
                for part in self.split_commas(s.toks):
                    if len(part) == 1 and part[0].kind == "str":
                        self.data.append(part[0].text.strip('"'))
                    else:
                        txt = "".join(t.text for t in part)
                        self.data.append(float(txt) if re.fullmatch(r"[-+]?(\d+\.?\d*|\.\d+)", txt) else txt)
            for attr in ("body", "other"):
                if hasattr(s, attr):
                    self.collect_data(getattr(s, attr))
            for arm in getattr(s, "arms", []):
                self.collect_data(arm[1])
        for proc in self.p.subs.values():
            if proc.body is not body and any(x.kind == "data" for x in proc.body):
                raise BasError("DATA belongs in the main program")

    @staticmethod
    def split_commas(toks):
        parts, cur, depth = [], [], 0
        for t in toks:
            if t.text == "(":
                depth += 1
            elif t.text == ")":
                depth -= 1
            if t.text == "," and depth == 0:
                parts.append(cur)
                cur = []
            else:
                cur.append(t)
        if cur or parts:
            parts.append(cur)
        return parts

    def block(self, body, scope):
        for s in body:
            self.steps += 1
            if self.steps > self.max_steps:
                raise BasError("too many steps (endless loop?)")
            try:
                getattr(self, "do_" + s.kind)(s, scope)
            except (BasError, ZeroDivisionError, ValueError, IndexError) as e:
                if isinstance(e, BasError) and str(e).startswith("line "):
                    raise
                raise BasError(f"line {s.line}: {e}")

    def target_ref(self, toks, scope):
        name = toks[0].up
        if len(toks) > 1 and toks[1].text == "(":
            idx = [self.eval_at(p, 0, scope)[0] for p in self.split_commas(toks[2:-1])]
            arr = self.array(scope, name)
            return ElemRef(arr, arr.index(idx))
        if len(toks) != 1:
            raise BasError(f"cannot assign to {' '.join(map(str, toks))}")
        if scope.get("func") == name:
            return scope["ret"]
        return self.cell(scope, name)

    def do_let(self, s, scope):
        ref = self.target_ref(s.target, scope)
        ref.v = coerce(ref.kind, self.expr(s.expr, scope), s.target[0].text)

    def do_print(self, s, scope):
        toks = s.toks
        k, newline = 0, True
        while k < len(toks):
            t = toks[k]
            if t.text == ";":
                k += 1
                newline = False
                continue
            if t.text == ",":
                k += 1
                self.write(" " * (14 - self.col % 14))
                newline = False
                continue
            newline = True
            if t.up in ("TAB", "SPC") and k + 1 < len(toks) and toks[k + 1].text == "(":
                v, k = self.eval_at(toks, k + 1, scope, stop=(";", ","))
                if t.up == "TAB":
                    want = int(v) - 1
                    if self.col > want:
                        self.write("\n")
                    self.write(" " * (want - self.col))
                else:
                    self.write(" " * int(v))
                continue
            v, k = self.eval_at(toks, k, scope, stop=(";", ","))
            self.write(v if isinstance(v, str) else num_text(v) + " ")
            # PRINT a b with no separator acts like a semicolon
        if newline or not toks:
            self.write("\n")

    def do_end(self, s, scope):
        raise End()

    def do_dim(self, s, scope):
        toks = s.toks
        shared = bool(toks) and toks[0].up == "SHARED"
        if shared:
            toks = toks[1:]
        for part in self.split_commas(toks):
            name = part[0].up
            kind = None
            if len(part) >= 2 and part[-2].up == "AS":
                kind = part[-1].up
                part = part[:-2]
            if kind:
                if kind not in ("INTEGER", "LONG", "SINGLE", "DOUBLE", "STRING"):
                    raise BasError(f"unknown type {kind}")
                scope["dimmed"][name] = kind
            k = kind or kind_of(name, scope["dimmed"])
            if len(part) > 1 and part[1].text == "(":
                bounds = []
                for b in self.split_commas(part[2:-1]):
                    to = next((j for j, t in enumerate(b) if t.up == "TO"), None)
                    if to is None:
                        bounds.append((0, int(self.expr(b, scope))))
                    else:
                        bounds.append((int(self.expr(b[:to], scope)), int(self.expr(b[to + 1:], scope))))
                scope["vars"][name + "()"] = Array(k, bounds)
                if shared:
                    self.shared.add(name + "()")
            else:
                scope["vars"][name] = Cell(default(k), k)
                if shared:
                    self.shared.add(name)

    def do_const(self, s, scope):
        for part in self.split_commas(s.toks):
            self.consts[part[0].up] = self.expr(part[2:], scope)

    def do_swap(self, s, scope):
        a, b = self.split_commas(s.toks)
        ra, rb = self.target_ref(a, scope), self.target_ref(b, scope)
        ra.v, rb.v = rb.v, ra.v

    def do_data(self, s, scope):
        pass

    def do_read(self, s, scope):
        for part in self.split_commas(s.toks):
            if self.data_pos >= len(self.data):
                raise BasError("out of DATA")
            ref = self.target_ref(part, scope)
            v = self.data[self.data_pos]
            self.data_pos += 1
            if ref.kind != "STRING" and isinstance(v, str):
                raise BasError("type mismatch in READ")
            ref.v = coerce(ref.kind, v if ref.kind != "STRING" or isinstance(v, str) else num_text(v).strip())

    def do_restore(self, s, scope):
        self.data_pos = 0

    def do_exit(self, s, scope):
        raise Exit(s.what)

    def do_if(self, s, scope):
        for cond, body in s.arms:
            if self.expr(cond, scope):
                return self.block(body, scope)
        self.block(s.other, scope)

    def do_for(self, s, scope):
        ref = self.target_ref([Tok("name", s.var)], scope)
        start = self.expr(s.start, scope)
        end = self.expr(s.end, scope)
        step = self.expr(s.step, scope) if s.step else 1
        ref.v = coerce(ref.kind, start)
        try:
            while (ref.v <= end) if step >= 0 else (ref.v >= end):
                self.steps += 1
                if self.steps > self.max_steps:
                    raise BasError("too many steps (endless loop?)")
                self.block(s.body, scope)
                ref.v = coerce(ref.kind, ref.v + step)
        except Exit as e:
            if e.what != "FOR":
                raise

    def do_do(self, s, scope):
        def test(cond):
            if not cond:
                return True
            v = bool(self.expr(cond[1], scope))
            return v if cond[0] == "WHILE" else not v
        try:
            while test(s.pre):
                self.steps += 1
                if self.steps > self.max_steps:
                    raise BasError("too many steps (endless loop?)")
                self.block(s.body, scope)
                if not test(s.post):
                    break
        except Exit as e:
            if e.what != "DO":
                raise

    def do_select(self, s, scope):
        v = self.expr(s.subject, scope)
        for test, body in s.cases:
            if test and test[0].up == "ELSE":
                return self.block(body, scope)
            for part in self.split_commas(test):
                if part[0].up == "IS":
                    op = part[1].text
                    w = self.expr(part[2:], scope)
                    hit = {"=": v == w, "<>": v != w, "<": v < w, ">": v > w, "<=": v <= w, ">=": v >= w}[op]
                else:
                    to = next((j for j, t in enumerate(part) if t.up == "TO"), None)
                    if to is None:
                        hit = v == self.expr(part, scope)
                    else:
                        hit = self.expr(part[:to], scope) <= v <= self.expr(part[to + 1:], scope)
                if hit:
                    return self.block(body, scope)

    def do_call(self, s, scope):
        if s.name not in self.p.subs:
            raise BasError(f"no SUB called {s.name}")
        self.call(s.name, s.args, scope)

    def call(self, name, argtoks, scope):
        proc = self.p.subs[name]
        parts = self.split_commas(argtoks) if argtoks else []
        if len(parts) != len(proc.params):
            raise BasError(f"{name} wants {len(proc.params)} arguments, got {len(parts)}")
        local = {"vars": {}, "dimmed": {}}
        for (pname, ptype), part in zip(proc.params, parts):
            if ptype:
                local["dimmed"][pname] = ptype
            if pname.endswith("()"):
                local["vars"][pname] = self.array(scope, part[0].up)
                continue
            kind = kind_of(pname, local["dimmed"])
            plain = part and part[0].kind == "name" and part[0].up not in self.consts and part[0].up not in BUILTINS \
                and part[0].up not in self.p.subs and (len(part) == 1 or (part[1].text == "(" and part[-1].text == ")"))
            if plain:
                # by reference: the SUB works on the caller's own variable
                ref = self.target_ref(part, scope)
                if ref.kind != kind and (ref.kind == "STRING") != (kind == "STRING"):
                    raise BasError(f"type mismatch passing {part[0].text}")
                if ref.kind != kind:
                    raise BasError(f"parameter type mismatch: {part[0].text} is {ref.kind}, {pname} is {kind}")
                local["vars"][pname] = ref
            else:
                local["vars"][pname] = Cell(coerce(kind, self.eval_at(part, 0, scope)[0], pname), kind)
        if proc.func:
            kind = kind_of(name, {})
            local["func"] = name
            local["ret"] = Cell(default(kind), kind)
        try:
            self.block(proc.body, local)
        except Exit as e:
            if e.what not in ("SUB", "FUNCTION"):
                raise
        return local["ret"].v if proc.func else None


def run(src):
    """Returns (printed text, error text)."""
    try:
        text = Interp(Parser(src)).run()
        # the space PRINT leaves after a number is invisible at the end of a line
        return "\n".join(line.rstrip(" ") for line in text.split("\n")).rstrip("\n"), ""
    except (BasError, RecursionError, StopIteration) as e:
        return "", str(e) or type(e).__name__


if __name__ == "__main__":
    out, err = run(open(sys.argv[1]).read())
    print(out)
    if err:
        print("ERROR:", err, file=sys.stderr)
        sys.exit(1)
