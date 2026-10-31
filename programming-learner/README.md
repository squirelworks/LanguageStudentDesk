# Programming Learner

Short lessons with worked examples, then a practice round that explains every
answer. Python has the full beginner course (12 lessons, from `print` to
classes). Z80 assembly has a full course too (10 lessons, from registers to a
FizzBuzz for CP/M). QuickBASIC, Delphi, Win16, brainFOOD, LOLCODE, INTERCAL,
Whitespace, Piet and Malbolge each have a shorter course. Progress is saved in
the browser.

## Launch

Appears automatically in the Desk launcher. Can also be opened directly:

```
programming-learner/index.html
programming-learner/index.html?lang=python
programming-learner/index.html?lang=python#loops
```

`?lang=` picks the course (ids match `EXTRA_LANGS` in `LanguageStudentDesk.py`);
`#<lesson id>` opens one lesson. Works over `file://` and the Desk's local server.

## Files

- `index.html`, `app.js` — the page and its logic (uses `../languages/learners.css` and `LSD.store` / `LSD.loadScript` from `../languages/lsd-lang.js`)
- `data/catalog.js` — the languages, in menu order, with the blurb shown on the home grid
- `data/<id>.js` — one course per language, loaded on demand
- `tools/check_packs.py` — checks every course; runs the Python, brainFOOD and Z80 examples
- `tools/z80run.py` — a small Z80 interpreter with the CP/M print calls, used to run the Z80 examples

## Course schema

Each `data/<id>.js` sets `window.PROGRAMMING.<id>`:

```js
{
  id, name, title, intro,          // intro is HTML
  comment: "#",                    // optional: line-comment marker, for colouring
  keywords: [...], builtins: [...],// optional: words to colour
  caseInsensitive: true,           // optional: BASIC, Pascal, assembly
  lessons: [{
    id, title, summary,
    sections: [{ h, p, code, out }],   // all optional; p is HTML, out is exactly what code prints
    practice: [{ q, code, options, answer, why, kind, check }],
  }],
}
```

A practice question with `kind: "output"` asks what `code` prints; `answer`
must be that output (or put the real output in `check` when the answer is
phrased differently, such as a line count). Code uses `String.raw` template
literals where backslashes matter.

## Adding a language

1. Add `data/<id>.js` following the schema.
2. Add an entry to `data/catalog.js`.
3. If the Desk should offer it under `?lang=`, the id must be in `EXTRA_LANGS`
   in `LanguageStudentDesk.py`.
4. Run `python3 programming-learner/tools/check_packs.py` (needs node and python3).
