#!/usr/bin/env python3
"""Runs the SQL course's examples (../data/sql.js) with SQLite.

Every example runs against a fresh in-memory copy of the course's sample
database. The tables are built by the section marked `setup: true` in
sql.js, so the page and the checker share one copy of it. Statements run in
order; each one that returns rows prints a header line and then one line per
row, with columns separated by " | " and NULL for a missing value. A blank
line separates the results of two queries. Python's built-in sqlite3 module
does the work, so this runner is always available.
"""
import os
import re
import sqlite3
import sys

AVAILABLE = True
HERE = os.path.dirname(os.path.abspath(__file__))
_setup = None


def setup_sql():
    global _setup
    if _setup is None:
        with open(os.path.join(HERE, "..", "data", "sql.js"), encoding="utf-8") as f:
            m = re.search(r"setup: true,\s*code: `(.*?)`", f.read(), re.S)
        _setup = m.group(1) if m else ""
    return _setup


def statements(src):
    buf = ""
    for line in src.splitlines(keepends=True):
        buf += line
        if sqlite3.complete_statement(buf):
            yield buf.strip()
            buf = ""
    if buf.strip() and not re.fullmatch(r"(\s*--[^\n]*\n?)*\s*", buf):
        yield buf.strip()


def cell(v):
    return "NULL" if v is None else str(v)


def run(src, with_setup=True):
    """Returns (printed text, error text)."""
    db = sqlite3.connect(":memory:")
    db.isolation_level = None
    out = []
    try:
        if with_setup:
            db.executescript(setup_sql())
        for stmt in statements(src):
            cur = db.execute(stmt)
            if cur.description:
                if out:
                    out.append("")
                out.append(" | ".join(d[0] for d in cur.description))
                out.extend(" | ".join(cell(v) for v in row) for row in cur.fetchall())
    except sqlite3.Error as e:
        return "\n".join(out), f"{type(e).__name__}: {e}"
    finally:
        db.close()
    return "\n".join(out), ""


if __name__ == "__main__":
    print(run(sys.stdin.read())[0] if not sys.argv[1:] else run(open(sys.argv[1], encoding="utf-8").read())[0])
