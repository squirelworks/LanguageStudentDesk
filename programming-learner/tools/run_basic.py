#!/usr/bin/env python3
"""A small line-numbered BASIC interpreter for checking ../data/basic.js.

Classic home-computer BASIC (the Microsoft BASIC family of the late 1970s and
1980s) keeps a program as numbered lines and jumps between them. This runner
reuses run_quickbasic.py for what the two dialects share (the lexer,
expressions, PRINT, LET, DIM, DATA/READ/RESTORE and the string and maths
functions) and adds the classic control flow on top: GOTO, GOSUB/RETURN,
ON ... GOTO/GOSUB, IF ... THEN with a line number or statements, FOR/NEXT
tested at NEXT, END/STOP, REM and DEF FN. Lines run in line-number order, so
they may be typed in any order. Numbers print with a space for the sign and a
space after, as on those machines. Not covered: INPUT, GET, RND, PEEK/POKE,
graphics and sound.

    python3 run_basic.py program.bas      prints what the program prints
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import run_quickbasic as qb  # noqa: E402

AVAILABLE = True
BasError = qb.BasError


def split_line(raw, n):
    """Splits one numbered line into its statements (token lists)."""
    toks = qb.lex(raw)
    if not toks or toks[0].kind != "num" or not toks[0].text.isdigit():
        raise BasError(f"line {n} of the listing has no line number")
    num = int(toks[0].text)
    toks = toks[1:]
    out = []
    while toks:
        if toks[0].up == "IF":
            then = next((k for k, t in enumerate(toks) if t.up in ("THEN", "GOTO")), None)
            if then is None:
                raise BasError(f"line {num}: IF without THEN")
            rest = toks[then + 1:]
            if toks[then].up == "GOTO" or (len(rest) == 1 and rest[0].kind == "num"):
                out.append(("ifgoto", toks[1:then], int(rest[0].text)))
                return num, out
            out.append(("if", toks[1:then]))
            toks = rest
            continue
        k = next((k for k, t in enumerate(toks) if t.text == ":"), len(toks))
        if k:
            out.append(("stmt", toks[:k]))
        toks = toks[k + 1:]
    return num, out


class Classic(qb.Interp):
    def __init__(self, src, max_steps=1_000_000):
        super().__init__(qb.Parser(""), max_steps)
        lines = {}
        for n, raw in enumerate(src.splitlines(), 1):
            if raw.strip():
                num, stmts = split_line(raw, n)
                lines[num] = stmts  # retyping a line number replaces it
        self.flat, self.line_at, self.next_line = [], {}, []
        for num in sorted(lines):
            self.line_at[num] = len(self.flat)
            for s in lines[num]:
                self.flat.append((num, s))
        # where execution goes when an IF on this statement's line is false
        for i, (num, _) in enumerate(self.flat):
            j = i
            while j < len(self.flat) and self.flat[j][0] == num:
                j += 1
            self.next_line.append(j)
        self.fns = {}

    def jump(self, num, here):
        if num not in self.line_at:
            raise BasError(f"line {here}: there is no line {num}")
        return self.line_at[num]

    def atom(self):
        t = self.look()
        if t is not None and t.kind == "name" and t.up.startswith("FN") and t.up in self.fns:
            self.k += 1
            args = self.args()
            params, body = self.fns[t.up]
            saved = {p: self.top["vars"].get(p) for p in params}
            for p, v in zip(params, args):
                self.top["vars"][p] = qb.Cell(qb.coerce(qb.kind_of(p, {}), v), qb.kind_of(p, {}))
            state = (self.t, self.k, self.scope)
            try:
                return self.expr(body, self.top)
            finally:
                self.t, self.k, self.scope = state
                for p, c in saved.items():
                    if c is None:
                        self.top["vars"].pop(p, None)
                    else:
                        self.top["vars"][p] = c
        return super().atom()

    def run(self):
        self.top = {"vars": {}, "dimmed": self.dimmed}
        simple = []
        for num, s in self.flat:
            if s[0] == "stmt" and s[1][0].up == "DATA":
                simple.append(qb.Stmt("data", num, toks=s[1][1:]))
        self.collect_data(simple)
        pc, gosubs, loops = 0, [], []
        try:
            while pc < len(self.flat):
                self.steps += 1
                if self.steps > self.max_steps:
                    raise BasError("too many steps (endless loop?)")
                num, s = self.flat[pc]
                try:
                    pc = self.step(pc, num, s, gosubs, loops)
                except (ZeroDivisionError, ValueError, IndexError) as e:
                    raise BasError(f"line {num}: {e}")
                except BasError as e:
                    raise e if str(e).startswith("line ") else BasError(f"line {num}: {e}")
        except qb.End:
            pass
        return "".join(self.out)

    def step(self, pc, num, s, gosubs, loops):
        if s[0] == "ifgoto":
            return self.jump(s[2], num) if self.expr(s[1], self.top) else self.next_line[pc]
        if s[0] == "if":
            return pc + 1 if self.expr(s[1], self.top) else self.next_line[pc]
        toks = s[1]
        w = toks[0].up
        if w == "GOTO":
            return self.jump(int(toks[1].text), num)
        if w == "GOSUB":
            gosubs.append(pc + 1)
            return self.jump(int(toks[1].text), num)
        if w == "RETURN":
            if not gosubs:
                raise BasError("RETURN without GOSUB")
            return gosubs.pop()
        if w == "ON":
            how = next(k for k, t in enumerate(toks) if t.up in ("GOTO", "GOSUB"))
            choice = int(self.expr(toks[1:how], self.top))
            targets = [int(t.text) for t in toks[how + 1:] if t.text != ","]
            if 1 <= choice <= len(targets):
                if toks[how].up == "GOSUB":
                    gosubs.append(pc + 1)
                return self.jump(targets[choice - 1], num)
            return pc + 1
        if w == "FOR":
            to = next(k for k, t in enumerate(toks) if t.up == "TO")
            st = next((k for k, t in enumerate(toks) if t.up == "STEP"), len(toks))
            var = toks[1].up
            ref = self.target_ref([toks[1]], self.top)
            ref.v = qb.coerce(ref.kind, self.expr(toks[3:to], self.top))
            end = self.expr(toks[to + 1:st], self.top)
            stepv = self.expr(toks[st + 1:], self.top) if st < len(toks) else 1
            loops[:] = [lp for lp in loops if lp[0] != var]
            loops.append((var, end, stepv, pc + 1))
            return pc + 1
        if w == "NEXT":
            names = [t.up for t in toks[1:] if t.text != ","] or [None]
            for name in names:
                while loops and name is not None and loops[-1][0] != name:
                    loops.pop()
                if not loops:
                    raise BasError("NEXT without FOR")
                var, end, stepv, body = loops[-1]
                ref = self.target_ref([qb.Tok("name", var)], self.top)
                ref.v = qb.coerce(ref.kind, ref.v + stepv)
                if (ref.v <= end) if stepv >= 0 else (ref.v >= end):
                    return body
                loops.pop()
            return pc + 1
        if w == "DEF":
            # DEF FNA(X) = expression
            name = toks[1].up
            close = next(k for k, t in enumerate(toks) if t.text == ")")
            params = [t.up for t in toks[3:close] if t.text != ","]
            self.fns[name] = (params, toks[close + 2:])
            return pc + 1
        if w in ("END", "STOP"):
            raise qb.End()
        if w in ("INPUT", "GET", "POKE", "PEEK"):
            raise BasError(f"{w} is not run by the checker")
        st = self.p.statement(toks, num)
        if st is not None:
            getattr(self, "do_" + st.kind)(st, self.top)
        return pc + 1


def run(src):
    """Returns (printed text, error text)."""
    try:
        text = Classic(src).run()
        return "\n".join(line.rstrip(" ") for line in text.split("\n")).rstrip("\n"), ""
    except (BasError, RecursionError, StopIteration) as e:
        return "", str(e) or type(e).__name__


if __name__ == "__main__":
    out, err = run(open(sys.argv[1]).read())
    print(out)
    if err:
        print("ERROR:", err, file=sys.stderr)
        sys.exit(1)
