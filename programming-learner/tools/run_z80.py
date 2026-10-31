#!/usr/bin/env python3
"""A small Z80 assembler-interpreter for checking the Z80 course in ../data/z80.js.

It runs CP/M .COM style programs: code starts at ORG 100h, CALL 5 is the BDOS
(C=2 prints the character in E, C=9 prints the $-terminated string at DE,
C=0 ends the program), and RET from the top level or JP 0 ends the program too.
That is the same convention real CP/M emulators such as RunCPM use, so every
course example also runs there after assembling with an ordinary assembler.

Instructions are interpreted from their source text rather than encoded into
bytes; data from DB/DW/DS lives in a real 64 KB memory. Covered: the documented
8- and 16-bit loads, arithmetic, logic, rotates and shifts, BIT/SET/RES, jumps,
calls, the stack, exchanges, block moves (LDI/LDIR/LDD/LDDR/CPI/CPIR) and
(IX+d)/(IY+d). Not covered: interrupts, I/O ports, DAA and undocumented opcodes.

    python3 run_z80.py program.asm      prints what the program prints
"""
import re
import sys

R8 = ["B", "C", "D", "E", "H", "L", "A"]
R16 = ["BC", "DE", "HL", "SP", "IX", "IY", "AF"]
CONDS = {"NZ", "Z", "NC", "C", "PO", "PE", "P", "M"}
SF, ZF, HF, PF, NF, CF = 0x80, 0x40, 0x10, 0x04, 0x02, 0x01


class AsmError(Exception):
    pass


def split_operands(s):
    out, cur, q = [], "", None
    for ch in s:
        if q:
            cur += ch
            if ch == q:
                q = None
        elif ch in "'\"":
            # AF' is a register name, not a quote
            if ch == "'" and cur.strip().upper() == "AF":
                cur += ch
                continue
            q = ch
            cur += ch
        elif ch == ",":
            out.append(cur.strip())
            cur = ""
        else:
            cur += ch
    if cur.strip():
        out.append(cur.strip())
    return out


def strip_comment(line):
    q = None
    for i, ch in enumerate(line):
        if q:
            if ch == q:
                q = None
        elif ch in "'\"" and not line[max(0, i - 2):i + 1].upper().endswith("AF'"):
            q = ch
        elif ch == ";":
            return line[:i]
    return line


class Program:
    def __init__(self, src):
        self.mem = bytearray(65536)
        self.code = {}      # address -> (mnemonic, operands, line number)
        self.labels = {}
        self.src = src
        self.assemble()

    def number(self, tok):
        t = tok.strip()
        u = t.upper()
        if re.fullmatch(r"'.'|\".\"", t):
            return ord(t[1])
        if re.fullmatch(r"[0-9][0-9A-F]*H", u):
            return int(u[:-1], 16)
        if re.fullmatch(r"(\$|#|0X)[0-9A-F]+", u):
            return int(re.sub(r"^(\$|#|0X)", "", u), 16)
        if re.fullmatch(r"[01]+B", u):
            return int(u[:-1], 2)
        if re.fullmatch(r"%[01]+", u):
            return int(u[1:], 2)
        if re.fullmatch(r"[0-9]+D?", u):
            return int(u.rstrip("D"))
        if u in self.labels:
            return self.labels[u]
        raise AsmError(f"unknown value {tok!r}")

    def expr(self, s, here=0, loose=False):
        s = s.strip()
        # tokens: numbers, labels, $, chars, operators + - * / and brackets
        toks = re.findall(r"'[^']'|\"[^\"]\"|\$(?![0-9A-Fa-f])|[A-Za-z_.][A-Za-z0-9_.]*|\$[0-9A-Fa-f]+|#[0-9A-Fa-f]+|[0-9][0-9A-Fa-fxXhH]*|%[01]+|[-+*/()]", s)
        py = ""
        for t in toks:
            if t == "$":
                py += str(here)
            elif t in "+-*/()":
                py += "//" if t == "/" else t
            else:
                try:
                    py += str(self.number(t))
                except AsmError:
                    if loose:
                        py += "0"
                    else:
                        raise
        if not py:
            raise AsmError(f"empty expression {s!r}")
        return eval(py, {"__builtins__": {}}) & 0xFFFF

    def lines(self):
        for n, raw in enumerate(self.src.splitlines(), 1):
            line = strip_comment(raw).rstrip()
            if not line.strip():
                continue
            label = None
            m = re.match(r"^([A-Za-z_.][A-Za-z0-9_.]*):\s*(.*)$", line.strip())
            if m:
                label, rest = m.group(1).upper(), m.group(2)
            elif not line[0].isspace() and re.match(r"^\S+\s+(EQU|=|DB|DW|DS|DEFB|DEFW|DEFS|DEFM)\b", line, re.I):
                # a colon-less label at column 0, as in "msg DB 'Hi$'" or "CR EQU 13"
                parts = line.split(None, 1)
                label, rest = parts[0].upper(), parts[1]
            else:
                rest = line.strip()
            parts = rest.split(None, 1)
            mn = parts[0].upper() if parts else ""
            ops = split_operands(parts[1]) if len(parts) > 1 else []
            yield n, label, mn, ops

    def check_names(self, ops, n):
        """Every name an instruction mentions must be a register, a condition or a label."""
        known = set(R8) | set(R16) | CONDS | {"AF'", "I", "R"}
        for op in ops:
            for word in re.findall(r"'[^']*'|\"[^\"]*\"|[A-Za-z_.][A-Za-z0-9_.']*", op):
                w = word.upper()
                if w[0] in "'\"" or w in known or w in self.labels:
                    continue
                if re.fullmatch(r"[0-9A-F]+H|[01]+B", w):
                    continue
                raise AsmError(f"line {n}: unknown name {word!r}")

    def size(self, mn, ops):
        if mn in ("DB", "DEFB", "DEFM"):
            return sum(len(o) - 2 if o[0] in "'\"" else 1 for o in ops)
        if mn in ("DW", "DEFW"):
            return 2 * len(ops)
        return 0

    def assemble(self):
        for pass_no in (1, 2):
            here = 0x100
            for n, label, mn, ops in self.lines():
                if mn in ("EQU", "="):
                    self.labels[label] = self.expr(ops[0], here, loose=pass_no == 1)
                    continue
                if mn == "ORG":
                    here = self.expr(ops[0], here, loose=pass_no == 1)
                if label:
                    self.labels[label] = here
                if not mn or mn in ("ORG", "END"):
                    continue
                if mn in ("DB", "DEFB", "DEFM", "DW", "DEFW", "DS", "DEFS"):
                    if pass_no == 2:
                        a = here
                        for o in ops:
                            if mn in ("DB", "DEFB", "DEFM"):
                                if o[0] in "'\"" and len(o) != 3:
                                    for ch in o[1:-1]:
                                        self.mem[a] = ord(ch)
                                        a += 1
                                else:
                                    self.mem[a] = self.expr(o, here) & 0xFF
                                    a += 1
                            elif mn in ("DW", "DEFW"):
                                v = self.expr(o, here)
                                self.mem[a], self.mem[a + 1] = v & 0xFF, v >> 8
                                a += 2
                    if mn in ("DS", "DEFS"):
                        here += self.expr(ops[0], here, loose=pass_no == 1)
                    else:
                        here += self.size(mn, ops)
                    continue
                if pass_no == 2:
                    self.code[here] = (mn, ops, n)
                    self.check_names(ops, n)
                # one address per instruction keeps labels distinct; data never overlaps
                here += 3 if ops else 1


class CPU:
    def __init__(self, prog, max_steps=2_000_000):
        self.p = prog
        self.m = prog.mem
        self.r = {k: 0 for k in R8}
        self.r["F"] = 0
        self.ix = self.iy = 0
        self.sp = 0xFF00
        self.alt = {"A": 0, "F": 0, "B": 0, "C": 0, "D": 0, "E": 0, "H": 0, "L": 0}
        self.pc = 0x100
        self.out = []
        self.max_steps = max_steps
        self.push(0)  # returning to address 0 ends the program, as on CP/M

    # ---- registers ----
    def get16(self, rr):
        r = self.r
        if rr == "SP":
            return self.sp
        if rr == "IX":
            return self.ix
        if rr == "IY":
            return self.iy
        hi, lo = {"BC": "BC", "DE": "DE", "HL": "HL", "AF": "AF"}[rr]
        return r[hi] << 8 | r[lo]

    def set16(self, rr, v):
        v &= 0xFFFF
        if rr == "SP":
            self.sp = v
        elif rr == "IX":
            self.ix = v
        elif rr == "IY":
            self.iy = v
        else:
            self.r[rr[0]], self.r[rr[1]] = v >> 8, v & 0xFF

    def flag(self, f):
        return bool(self.r["F"] & f)

    def setf(self, f, on):
        self.r["F"] = (self.r["F"] | f) if on else (self.r["F"] & ~f & 0xFF)

    def cond(self, c):
        return {
            "NZ": not self.flag(ZF), "Z": self.flag(ZF), "NC": not self.flag(CF), "C": self.flag(CF),
            "PO": not self.flag(PF), "PE": self.flag(PF), "P": not self.flag(SF), "M": self.flag(SF),
        }[c]

    def push(self, v):
        self.sp = (self.sp - 2) & 0xFFFF
        self.m[self.sp], self.m[(self.sp + 1) & 0xFFFF] = v & 0xFF, (v >> 8) & 0xFF

    def pop(self):
        v = self.m[self.sp] | self.m[(self.sp + 1) & 0xFFFF] << 8
        self.sp = (self.sp + 2) & 0xFFFF
        return v

    # ---- operands ----
    def val(self, e):
        return self.p.expr(e, self.pc)

    def addr_of(self, op):
        """Memory address for a bracketed operand, or None."""
        if not (op.startswith("(") and op.endswith(")")):
            return None
        inner = op[1:-1].strip()
        u = inner.upper().replace(" ", "")
        if u in ("HL", "BC", "DE", "SP"):
            return self.get16(u)
        m = re.fullmatch(r"(IX|IY)([+-].*)?", u)
        if m:
            base = self.ix if m.group(1) == "IX" else self.iy
            d = self.p.expr("0" + m.group(2), self.pc) if m.group(2) else 0
            if d >= 0x8000:
                d -= 0x10000
            return (base + d) & 0xFFFF
        return self.val(inner)

    def is_mem(self, op):
        return op.startswith("(") and op.endswith(")") and self._balanced(op)

    @staticmethod
    def _balanced(op):
        depth = 0
        for i, ch in enumerate(op):
            depth += ch == "("
            depth -= ch == ")"
            if depth == 0 and i < len(op) - 1:
                return False
        return True

    def read8(self, op):
        u = op.upper()
        if u in R8:
            return self.r[u]
        if u in ("I", "R"):
            return 0
        if self.is_mem(op):
            return self.m[self.addr_of(op)]
        return self.val(op) & 0xFF

    def write8(self, op, v):
        u = op.upper()
        v &= 0xFF
        if u in R8:
            self.r[u] = v
        elif self.is_mem(op):
            self.m[self.addr_of(op)] = v
        else:
            raise AsmError(f"cannot write to {op}")

    # ---- flag helpers ----
    def szp(self, v, parity=True):
        self.setf(SF, v & 0x80)
        self.setf(ZF, v == 0)
        if parity:
            self.setf(PF, bin(v).count("1") % 2 == 0)

    def add8(self, a, b, carry=0, sub=False):
        if sub:
            res = a - b - carry
            self.setf(HF, (a & 0xF) - (b & 0xF) - carry < 0)
            self.setf(CF, res < 0)
            self.setf(PF, ((a ^ b) & (a ^ res)) & 0x80)
        else:
            res = a + b + carry
            self.setf(HF, (a & 0xF) + (b & 0xF) + carry > 0xF)
            self.setf(CF, res > 0xFF)
            self.setf(PF, (~(a ^ b) & (a ^ res)) & 0x80)
        res &= 0xFF
        self.szp(res, parity=False)
        self.setf(NF, sub)
        return res

    # ---- BDOS ----
    def bdos(self):
        fn = self.r["C"]
        if fn == 0:
            return False
        if fn == 2:
            self.out.append(chr(self.r["E"]))
        elif fn == 9:
            a = self.get16("DE")
            while self.m[a] != ord("$"):
                self.out.append(chr(self.m[a]))
                a = (a + 1) & 0xFFFF
                if len(self.out) > 100000:
                    raise AsmError("string at DE has no $ ending")
        return True

    def clobber(self):
        # the real BDOS keeps no registers safe, so neither does the checker
        for k in "ABCDEHLF":
            self.r[k] = 0xA5

    # ---- run ----
    def run(self):
        steps = 0
        while True:
            if self.pc == 0:
                break
            if self.pc == 5:
                # reached the BDOS by CALL or by a tail JP: do the call, then return
                if not self.bdos():
                    break
                self.clobber()
                self.pc = self.pop()
                continue
            if self.pc not in self.p.code:
                raise AsmError(f"ran into data or empty memory at {self.pc:04X}h")
            steps += 1
            if steps > self.max_steps:
                raise AsmError("too many steps (endless loop?)")
            mn, ops, line = self.p.code[self.pc]
            nxt = self.pc + (3 if ops else 1)
            try:
                jump = self.step(mn, ops, nxt)
            except (AsmError, KeyError, IndexError, ValueError) as e:
                raise AsmError(f"line {line}: {mn} {', '.join(ops)}: {e}")
            if jump == "halt":
                break
            self.pc = nxt if jump is None else jump
        return "".join(self.out).replace("\r", "")

    def step(self, mn, ops, nxt):
        U = [o.upper().replace(" ", "") for o in ops]
        r = self.r
        if mn == "NOP" or mn in ("DI", "EI", "IM", "OUT"):
            return None
        if mn == "IN":
            self.write8(ops[0], 0xFF)
            return None
        if mn == "HALT":
            return "halt"
        if mn == "LD":
            d, s = U
            if d in R16 or d in ("IX", "IY"):
                if s in ("HL", "IX", "IY"):
                    self.set16(d, self.get16(s))
                elif self.is_mem(ops[1]):
                    a = self.addr_of(ops[1])
                    self.set16(d, self.m[a] | self.m[(a + 1) & 0xFFFF] << 8)
                else:
                    self.set16(d, self.val(ops[1]))
                return None
            if self.is_mem(ops[0]) and (s in R16 or s in ("IX", "IY")):
                a = self.addr_of(ops[0])
                v = self.get16(s)
                self.m[a], self.m[(a + 1) & 0xFFFF] = v & 0xFF, v >> 8
                return None
            self.write8(ops[0], self.read8(ops[1]))
            return None
        if mn == "PUSH":
            self.push(self.get16(U[0]) if U[0] != "AF" else (r["A"] << 8 | r["F"]))
            return None
        if mn == "POP":
            v = self.pop()
            if U[0] == "AF":
                r["A"], r["F"] = v >> 8, v & 0xFF
            else:
                self.set16(U[0], v)
            return None
        if mn == "EX":
            if U == ["DE", "HL"]:
                a, b = self.get16("DE"), self.get16("HL")
                self.set16("DE", b)
                self.set16("HL", a)
            elif U[0] == "(SP)":
                reg = U[1]
                v = self.m[self.sp] | self.m[self.sp + 1] << 8
                cur = self.get16(reg)
                self.m[self.sp], self.m[self.sp + 1] = cur & 0xFF, cur >> 8
                self.set16(reg, v)
            elif U[0] == "AF":
                for k in "AF":
                    r[k], self.alt[k] = self.alt[k], r[k]
            return None
        if mn == "EXX":
            for k in "BCDEHL":
                r[k], self.alt[k] = self.alt[k], r[k]
            return None
        if mn in ("ADD", "ADC", "SUB", "SBC", "AND", "OR", "XOR", "CP"):
            if len(U) == 2 and U[0] in ("HL", "IX", "IY"):
                a, b = self.get16(U[0]), self.get16(U[1])
                c = 1 if mn in ("ADC", "SBC") and self.flag(CF) else 0
                if mn == "ADD":
                    res = a + b
                    self.setf(CF, res > 0xFFFF)
                    self.setf(NF, False)
                elif mn == "ADC":
                    res = a + b + c
                    self.setf(CF, res > 0xFFFF)
                    self.setf(ZF, (res & 0xFFFF) == 0)
                    self.setf(SF, res & 0x8000)
                    self.setf(NF, False)
                else:
                    res = a - b - c
                    self.setf(CF, res < 0)
                    self.setf(ZF, (res & 0xFFFF) == 0)
                    self.setf(SF, res & 0x8000)
                    self.setf(NF, True)
                self.set16(U[0], res)
                return None
            src = ops[-1]
            v = self.read8(src)
            a = r["A"]
            c = 1 if self.flag(CF) else 0
            if mn == "ADD":
                r["A"] = self.add8(a, v)
            elif mn == "ADC":
                r["A"] = self.add8(a, v, c)
            elif mn == "SUB":
                r["A"] = self.add8(a, v, 0, True)
            elif mn == "SBC":
                r["A"] = self.add8(a, v, c, True)
            elif mn == "CP":
                self.add8(a, v, 0, True)
            else:
                res = {"AND": a & v, "OR": a | v, "XOR": a ^ v}[mn]
                r["A"] = res
                self.szp(res)
                self.setf(CF, False)
                self.setf(NF, False)
                self.setf(HF, mn == "AND")
            return None
        if mn in ("INC", "DEC"):
            d = 1 if mn == "INC" else -1
            if U[0] in R16:
                self.set16(U[0], self.get16(U[0]) + d)
                return None
            v = self.read8(ops[0])
            res = (v + d) & 0xFF
            self.write8(ops[0], res)
            self.szp(res, parity=False)
            self.setf(PF, (v == 0x7F) if d == 1 else (v == 0x80))
            self.setf(NF, d == -1)
            return None
        if mn == "JP":
            if len(U) == 1:
                if U[0] in ("(HL)", "(IX)", "(IY)"):
                    return self.get16(U[0][1:-1])
                return self.val(ops[0])
            return self.val(ops[1]) if self.cond(U[0]) else None
        if mn == "JR":
            if len(U) == 1:
                return self.val(ops[0])
            if U[0] not in ("NZ", "Z", "NC", "C"):
                raise AsmError("JR only takes NZ, Z, NC or C")
            return self.val(ops[1]) if self.cond(U[0]) else None
        if mn == "DJNZ":
            r["B"] = (r["B"] - 1) & 0xFF
            return self.val(ops[0]) if r["B"] else None
        if mn == "CALL":
            if len(U) == 2 and not self.cond(U[0]):
                return None
            target = self.val(ops[-1])
            self.push(nxt)
            return target
        if mn == "RST":
            if self.val(ops[0]) == 0:
                return 0
            raise AsmError("only RST 0 is supported")
        if mn == "RET":
            if U and not self.cond(U[0]):
                return None
            return self.pop()
        if mn in ("RLCA", "RRCA", "RLA", "RRA"):
            a = r["A"]
            c = 1 if self.flag(CF) else 0
            if mn == "RLCA":
                out = a >> 7
                a = (a << 1 | out) & 0xFF
            elif mn == "RRCA":
                out = a & 1
                a = a >> 1 | out << 7
            elif mn == "RLA":
                out = a >> 7
                a = (a << 1 | c) & 0xFF
            else:
                out = a & 1
                a = a >> 1 | c << 7
            r["A"] = a
            self.setf(CF, out)
            self.setf(NF, False)
            self.setf(HF, False)
            return None
        if mn in ("RLC", "RRC", "RL", "RR", "SLA", "SRA", "SRL", "SLL"):
            v = self.read8(ops[0])
            c = 1 if self.flag(CF) else 0
            if mn == "RLC":
                out, v = v >> 7, (v << 1 | v >> 7) & 0xFF
            elif mn == "RRC":
                out, v = v & 1, v >> 1 | (v & 1) << 7
            elif mn == "RL":
                out, v = v >> 7, (v << 1 | c) & 0xFF
            elif mn == "RR":
                out, v = v & 1, v >> 1 | c << 7
            elif mn == "SLA":
                out, v = v >> 7, (v << 1) & 0xFF
            elif mn == "SLL":
                out, v = v >> 7, (v << 1 | 1) & 0xFF
            elif mn == "SRA":
                out, v = v & 1, v >> 1 | (v & 0x80)
            else:
                out, v = v & 1, v >> 1
            self.write8(ops[0], v)
            self.szp(v)
            self.setf(CF, out)
            self.setf(NF, False)
            self.setf(HF, False)
            return None
        if mn in ("BIT", "SET", "RES"):
            b = self.val(ops[0])
            v = self.read8(ops[1])
            if mn == "BIT":
                self.setf(ZF, not (v >> b) & 1)
                self.setf(HF, True)
                self.setf(NF, False)
            else:
                self.write8(ops[1], v | 1 << b if mn == "SET" else v & ~(1 << b))
            return None
        if mn == "NEG":
            r["A"] = self.add8(0, r["A"], 0, True)
            return None
        if mn == "CPL":
            r["A"] ^= 0xFF
            self.setf(NF, True)
            self.setf(HF, True)
            return None
        if mn == "SCF":
            self.setf(CF, True)
            return None
        if mn == "CCF":
            self.setf(CF, not self.flag(CF))
            return None
        if mn in ("LDI", "LDIR", "LDD", "LDDR"):
            d = 1 if mn in ("LDI", "LDIR") else -1
            while True:
                self.m[self.get16("DE")] = self.m[self.get16("HL")]
                self.set16("HL", self.get16("HL") + d)
                self.set16("DE", self.get16("DE") + d)
                self.set16("BC", self.get16("BC") - 1)
                if mn in ("LDI", "LDD") or self.get16("BC") == 0:
                    break
            self.setf(PF, self.get16("BC") != 0)
            self.setf(NF, False)
            self.setf(HF, False)
            return None
        if mn in ("CPI", "CPIR", "CPD", "CPDR"):
            d = 1 if mn in ("CPI", "CPIR") else -1
            while True:
                v = self.m[self.get16("HL")]
                res = (r["A"] - v) & 0xFF
                self.set16("HL", self.get16("HL") + d)
                self.set16("BC", self.get16("BC") - 1)
                self.setf(ZF, res == 0)
                self.setf(SF, res & 0x80)
                if mn in ("CPI", "CPD") or res == 0 or self.get16("BC") == 0:
                    break
            self.setf(PF, self.get16("BC") != 0)
            self.setf(NF, True)
            return None
        raise AsmError(f"instruction {mn} is not supported by the checker")


def run(src):
    """Returns (printed text, error text)."""
    try:
        return CPU(Program(src)).run().rstrip("\n"), ""
    except AsmError as e:
        return "", str(e)


if __name__ == "__main__":
    out, err = run(open(sys.argv[1]).read())
    print(out)
    if err:
        print("ERROR:", err, file=sys.stderr)
        sys.exit(1)
