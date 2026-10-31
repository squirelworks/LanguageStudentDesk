# Programming Learner

Short lessons with worked examples, then a practice round that explains every
answer. Python has the full beginner course (12 lessons, from `print` to
classes). Full courses also cover QuickBASIC (11 lessons, from `PRINT` to
SUBs, arrays and a guessing game), Z80 assembly (10 lessons, from registers
to a FizzBuzz for CP/M), LOLCODE (9 lessons, from `VISIBLE` to functions),
brainFOOD (8 lessons, from the eight commands to decisions and words in
memory), Delphi (11 lessons, from Pascal basics to classes, exceptions and
forms) and Whitespace (6 lessons, from numbers in S, T and L to loops and
subroutines). Win16 has a 9-lesson reading course, from WinMain to dialogs,
memory and porting to Win32; its C programs need Windows 3.x, so they show
no output. INTERCAL has a 5-lesson reading course (manners, mingle and
select, the unary operators, NEXT and RESUME, ABSTAIN and STASH). Piet and
Malbolge each have a shorter course. Progress is saved in the browser.

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
- `tools/check_packs.py` — checks every course; runs the Python and brainFOOD examples, and any course with a `tools/run_<id>.py`
- `tools/run_<id>.py` — a runner for one course: `run(code)` returns `(printed, error)`. `run_z80.py` is a small Z80 interpreter with the CP/M print calls, `run_lolcode.py` a LOLCODE 1.2 interpreter, `run_quickbasic.py` a QuickBASIC interpreter that spaces numbers the way PRINT does, `run_delphi.py` compiles the Delphi programs with Free Pascal (`fpc`, in Delphi mode), and `run_whitespace.py` is a Whitespace interpreter that reads the course's S/T/L notation. A runner whose tool is missing is skipped with a note

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
4. Run `python3 programming-learner/tools/check_packs.py` (needs node and python3;
   fpc as well to run the Delphi programs).
