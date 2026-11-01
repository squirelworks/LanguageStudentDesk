#!/usr/bin/env python3
"""Report Desk language coverage across the shared languages/ layer and learners.

Prints one row per language with: meta present, characterKeys resolvable,
grammar lessons/drills, vocab decks/words, reference entries, Resource Learner
panel, Language Learner path (and whether it has a grammar stage), and
Translation Learner column.

Also validates every grammar drill: answer must be one of options, and options
must be unique. Drill validation failures exit non-zero. Optional --min
thresholds print warnings but do not fail the process (CI uses this as an
informational step until thresholds are enforced).

    python3 languages/coverage.py
    python3 languages/coverage.py --min-grammar-lessons 6 --min-grammar-drills 30
    python3 languages/coverage.py --min-vocab-decks 9 --min-vocab-words 110
    python3 languages/coverage.py --min-reference 10
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent

CJK_TRADITIONS = {"hanzi", "kanji", "hanja"}
TRANSLATION_COLUMNS = ("japanese", "hangul", "chinese", "cyrillic", "hindi", "arabic", "klingon")

# Node helper: parse classic-script data files and language-learner paths.
# Runs once so we avoid a subprocess per language.
NODE_COLLECT = r"""
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = process.argv[1];
const langsDir = path.join(root, "languages");
const alphaDir = path.join(
  root,
  "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/www/data"
);

function runFile(file, sandbox) {
  const code = fs.readFileSync(file, "utf8");
  vm.runInNewContext(code, sandbox, { filename: file });
}

const out = { grammar: {}, vocab: {}, paths: {}, resourceKeys: [], sgScriptIds: [], scriptKeys: [] };

// Alphabets SG_SCRIPTS ids (file basenames minus app.js).
for (const name of fs.readdirSync(alphaDir)) {
  if (!name.endsWith(".js") || name === "app.js") continue;
  out.sgScriptIds.push(name.slice(0, -3));
}

// SCRIPTS keys defined under languages/*/characters.js (and related).
for (const id of fs.readdirSync(langsDir)) {
  const chars = path.join(langsDir, id, "characters.js");
  if (!fs.existsSync(chars)) continue;
  const sandbox = { window: {}, SCRIPTS: {} };
  sandbox.window.SCRIPTS = sandbox.SCRIPTS;
  try {
    runFile(chars, sandbox);
  } catch (e) {
    // Still collect whatever was assigned before a throw.
  }
  for (const k of Object.keys(sandbox.SCRIPTS || {})) {
    if (!out.scriptKeys.includes(k)) out.scriptKeys.push(k);
  }
}

// Grammar + vocab per language folder with meta.json.
for (const id of fs.readdirSync(langsDir).sort()) {
  const metaPath = path.join(langsDir, id, "meta.json");
  if (!fs.existsSync(metaPath)) continue;

  const gPath = path.join(langsDir, id, "grammar.js");
  if (fs.existsSync(gPath)) {
    const sandbox = { window: {} };
    runFile(gPath, sandbox);
    const course = (sandbox.window.GRAMMAR || {})[id];
    if (!course) {
      out.grammar[id] = { error: "GRAMMAR." + id + " missing after load" };
    } else {
      const lessons = course.lessons || [];
      const drillProblems = [];
      let drills = 0;
      for (const lesson of lessons) {
        for (const d of lesson.drills || []) {
          drills += 1;
          const opts = d.options || [];
          const uniq = new Set(opts);
          if (uniq.size !== opts.length) {
            drillProblems.push(id + "/" + (lesson.id || "?") + ": duplicate options");
          }
          if (!opts.includes(d.answer)) {
            drillProblems.push(
              id + "/" + (lesson.id || "?") + ": answer not in options: " + JSON.stringify(d.answer)
            );
          }
        }
      }
      out.grammar[id] = { lessons: lessons.length, drills, drillProblems };
    }
  }

  const vPath = path.join(langsDir, id, "vocab.js");
  if (fs.existsSync(vPath)) {
    const sandbox = { window: {} };
    runFile(vPath, sandbox);
    const decks = (sandbox.window.LSD_DECKS || {})[id];
    if (!Array.isArray(decks)) {
      out.vocab[id] = { error: "LSD_DECKS." + id + " missing after load" };
    } else {
      const words = decks.reduce((n, d) => n + ((d.words && d.words.length) || 0), 0);
      out.vocab[id] = { decks: decks.length, words };
    }
  }
}

// Language Learner paths.
{
  const sandbox = { window: {} };
  runFile(path.join(root, "language-learner/paths.js"), sandbox);
  const paths = sandbox.window.LANGUAGE_PATHS || {};
  for (const [id, stages] of Object.entries(paths)) {
    const hasGrammar = (stages || []).some((stage) =>
      (stage.steps || []).some((s) => s.check && s.check.grammar)
    );
    out.paths[id] = { stages: (stages || []).length, grammarStage: !!hasGrammar };
  }
}

// Resource Learner panel keys (excluding general).
{
  const sandbox = { window: {} };
  runFile(path.join(root, "resource-learner/resources.js"), sandbox);
  out.resourceKeys = Object.keys(sandbox.window.LSD_RESOURCES || {}).filter((k) => k !== "general");
}

process.stdout.write(JSON.stringify(out));
"""


def collect_js() -> dict:
    """Run the Node collector once; raises on failure."""
    proc = subprocess.run(
        ["node", "-e", NODE_COLLECT, str(ROOT)],
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0:
        raise RuntimeError(f"node collector failed:\n{proc.stderr or proc.stdout}")
    return json.loads(proc.stdout)


def resolvable_keys(js: dict) -> set[str]:
    keys = set(CJK_TRADITIONS)
    keys.update(js.get("sgScriptIds") or [])
    keys.update(js.get("scriptKeys") or [])
    # Kana live in SquirrelGo Kana / japanese characters.js; treat as always known
    # when listed, matching Character Learner's SCRIPTS after load.
    keys.update({"hiragana", "katakana"})
    return keys


def character_keys_status(meta: dict, known: set[str]) -> str:
    """Return yes / no / — (empty list is intentional 'no Character Learner scripts')."""
    raw = meta.get("characterKeys")
    if raw is None:
        return "missing"
    if not isinstance(raw, list):
        return "invalid"
    if len(raw) == 0:
        return "—"
    bad = [k for k in raw if k not in known]
    if bad:
        return "no (" + ", ".join(bad) + ")"
    return "yes"


def load_metas() -> list[dict]:
    metas = []
    for p in sorted(HERE.glob("*/meta.json")):
        metas.append(json.loads(p.read_text(encoding="utf-8")))
    return metas


def reference_count(lang_id: str, meta: dict) -> int | None:
    data = meta.get("data") or {}
    if "reference" not in data:
        return None
    ref_name = data["reference"]
    if isinstance(ref_name, list):
        ref_name = ref_name[0]
    path = HERE / lang_id / ref_name
    if not path.is_file():
        return None
    ref = json.loads(path.read_text(encoding="utf-8"))
    return len(ref.get("entries") or [])


def fmt_pair(a: int | None, b: int | None, none_label: str = "none") -> str:
    if a is None:
        return none_label
    return f"{a}/{b}"


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--min-grammar-lessons", type=int, default=None, help="Warn if grammar lessons below this")
    p.add_argument("--min-grammar-drills", type=int, default=None, help="Warn if grammar drills below this")
    p.add_argument("--min-vocab-decks", type=int, default=None, help="Warn if vocab decks below this")
    p.add_argument("--min-vocab-words", type=int, default=None, help="Warn if vocab words below this")
    p.add_argument("--min-reference", type=int, default=None, help="Warn if reference entries below this")
    p.add_argument(
        "--json",
        action="store_true",
        help="Print machine-readable JSON instead of the table",
    )
    return p.parse_args(argv)


def build_rows(js: dict) -> tuple[list[dict], list[str]]:
    known = resolvable_keys(js)
    resource_keys = set(js.get("resourceKeys") or [])
    paths = js.get("paths") or {}
    grammar = js.get("grammar") or {}
    vocab = js.get("vocab") or {}
    drill_problems: list[str] = []
    rows: list[dict] = []

    metas = load_metas()
    meta_ids = {m["id"] for m in metas}

    for meta in metas:
        lang = meta["id"]
        g = grammar.get(lang)
        v = vocab.get(lang)
        data = meta.get("data") or {}

        if g and g.get("drillProblems"):
            drill_problems.extend(g["drillProblems"])

        g_lessons = g.get("lessons") if g and "lessons" in g else None
        g_drills = g.get("drills") if g and "drills" in g else None
        if "grammar" in data and g is None:
            g_lessons, g_drills = None, None  # listed but missing file → shown as none with note
        if g and g.get("error"):
            drill_problems.append(f"{lang}: {g['error']}")
            g_lessons, g_drills = None, None

        v_decks = v.get("decks") if v and "decks" in v else None
        v_words = v.get("words") if v and "words" in v else None
        if v and v.get("error"):
            drill_problems.append(f"{lang}: {v['error']}")
            v_decks, v_words = None, None

        path_info = paths.get(lang)
        has_path = path_info is not None
        grammar_stage = bool(path_info and path_info.get("grammarStage"))

        row = {
            "id": lang,
            "meta": True,
            "characterKeys": character_keys_status(meta, known),
            "grammar_lessons": g_lessons,
            "grammar_drills": g_drills,
            "vocab_decks": v_decks,
            "vocab_words": v_words,
            "reference": reference_count(lang, meta),
            "resource_panel": lang in resource_keys,
            "language_path": has_path,
            "grammar_stage": grammar_stage if has_path else False,
            "translation_column": lang in TRANSLATION_COLUMNS,
        }
        rows.append(row)

    # Folders without meta are not expected; flag any LANGUAGE_PATHS orphan briefly via drill_problems.
    for pid in sorted(paths):
        if pid not in meta_ids:
            drill_problems.append(f"language-learner path for unknown id {pid!r}")

    return rows, drill_problems


def print_table(rows: list[dict]) -> None:
    headers = [
        ("id", "Language"),
        ("meta", "Meta"),
        ("characterKeys", "CharKeys"),
        ("grammar", "Grammar"),
        ("vocab", "Vocab"),
        ("reference", "Ref"),
        ("resource_panel", "Resources"),
        ("path", "LL path"),
        ("translation_column", "TL col"),
    ]

    display = []
    for r in rows:
        display.append(
            {
                "id": r["id"],
                "meta": "yes" if r["meta"] else "no",
                "characterKeys": r["characterKeys"],
                "grammar": fmt_pair(r["grammar_lessons"], r["grammar_drills"]),
                "vocab": fmt_pair(r["vocab_decks"], r["vocab_words"]),
                "reference": "none" if r["reference"] is None else str(r["reference"]),
                "resource_panel": "yes" if r["resource_panel"] else "general",
                "path": (
                    ("yes+grammar" if r["grammar_stage"] else "yes")
                    if r["language_path"]
                    else "no"
                ),
                "translation_column": "yes" if r["translation_column"] else "no",
            }
        )

    widths = {key: len(label) for key, label in headers}
    for row in display:
        for key, _ in headers:
            widths[key] = max(widths[key], len(str(row[key])))

    def line(row: dict) -> str:
        return "  ".join(str(row[key]).ljust(widths[key]) for key, _ in headers)

    print(line({key: label for key, label in headers}))
    print(line({key: "-" * widths[key] for key, _ in headers}))
    for row in display:
        print(line(row))

    n = len(rows)
    with_grammar = sum(1 for r in rows if r["grammar_lessons"] is not None)
    with_resource = sum(1 for r in rows if r["resource_panel"])
    with_tl = sum(1 for r in rows if r["translation_column"])
    with_path = sum(1 for r in rows if r["language_path"])
    with_gstage = sum(1 for r in rows if r["grammar_stage"])
    print()
    print(
        f"{n} languages · grammar {with_grammar}/{n} · "
        f"resource panels {with_resource}/{n} (rest fall back to general) · "
        f"LL paths {with_path}/{n} ({with_gstage} with grammar stage) · "
        f"TL columns {with_tl}/{n}"
    )


def threshold_warnings(rows: list[dict], args: argparse.Namespace) -> list[str]:
    warnings: list[str] = []
    for r in rows:
        # English is the base language: reference-only is expected.
        if r["id"] == "english":
            continue
        if args.min_grammar_lessons is not None:
            n = r["grammar_lessons"]
            if n is None or n < args.min_grammar_lessons:
                warnings.append(
                    f"{r['id']}: grammar lessons {n if n is not None else 0} < --min-grammar-lessons {args.min_grammar_lessons}"
                )
        if args.min_grammar_drills is not None:
            n = r["grammar_drills"]
            if n is None or n < args.min_grammar_drills:
                warnings.append(
                    f"{r['id']}: grammar drills {n if n is not None else 0} < --min-grammar-drills {args.min_grammar_drills}"
                )
        if args.min_vocab_decks is not None:
            n = r["vocab_decks"]
            if n is None or n < args.min_vocab_decks:
                warnings.append(
                    f"{r['id']}: vocab decks {n if n is not None else 0} < --min-vocab-decks {args.min_vocab_decks}"
                )
        if args.min_vocab_words is not None:
            n = r["vocab_words"]
            if n is None or n < args.min_vocab_words:
                warnings.append(
                    f"{r['id']}: vocab words {n if n is not None else 0} < --min-vocab-words {args.min_vocab_words}"
                )
        if args.min_reference is not None:
            n = r["reference"]
            if n is None or n < args.min_reference:
                warnings.append(
                    f"{r['id']}: reference {n if n is not None else 0} < --min-reference {args.min_reference}"
                )
    return warnings


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    try:
        js = collect_js()
    except RuntimeError as e:
        print(e, file=sys.stderr)
        return 2

    rows, drill_problems = build_rows(js)

    if args.json:
        print(json.dumps({"languages": rows, "drillProblems": drill_problems}, indent=2))
    else:
        print_table(rows)

    warnings = threshold_warnings(rows, args)
    if warnings:
        print("\nThreshold warnings (informational; do not fail CI yet):", file=sys.stderr)
        for w in warnings:
            print(f"  · {w}", file=sys.stderr)

    if drill_problems:
        print("\nDrill validation failures:", file=sys.stderr)
        for p in drill_problems:
            print(f"  · {p}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
