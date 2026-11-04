# Programming Learner

Short lessons with worked examples, then a practice round that explains every
answer. The home page groups the languages into sections: modern and popular
languages first, then older and legacy ones, then joke and esoteric languages.
Each section is sorted by name, and nothing is pinned. An A–Z view lists every
language in one list instead, and category tags (such as compiled programs or
scripting) filter the modern and older sections. The view and the tag filter
are remembered. Two switches, also in the Desk's Settings, hide the older
and the joke sections; both are on by default. Some courses are full beginner courses with runnable examples,
others are reading courses for platforms that no longer run on today's
machines; the app's menu has the current list. Cross-language tracks, such as
numerical methods, teach one topic and implement it side by side in several
languages. Progress is saved in the browser.

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
- `data/catalog.js` — the languages, each with its group (`modern`, `older` or `joke`), category tags and the blurb shown on the home grid
- `sections.js` — lays the catalog out by section or A–Z and applies the tag filter; the Programming Student Desk menu uses the same file
- `data/<id>.js` — one course per language, loaded on demand
- `tools/check_packs.py` — checks every course; runs the Python and brainFOOD examples, and any course with a `tools/run_<id>.py`; in a track, each example runs with its own language's runner
- `tools/test_numerical.py` — tests the numerical methods track: each implementation's results must match known values, and the versions of one method in different languages must print the same thing
- `tools/run_<id>.py` — a runner for one course: `run(code)` returns `(printed, error)`. `run_z80.py` is a small Z80 interpreter with the CP/M print calls, `run_lolcode.py` a LOLCODE 1.2 interpreter, `run_quickbasic.py` a QuickBASIC interpreter that spaces numbers the way PRINT does, `run_delphi.py` compiles the Delphi programs with Free Pascal (`fpc`, in Delphi mode), `run_whitespace.py` is a Whitespace interpreter that reads the course's S/T/L notation, `run_piet.py` a Piet interpreter that reads the course's two-letter codel grids, and `run_malbolge.py` a Malbolge interpreter that also accepts normalized programs, `run_c.py` compiles the C course with gcc, `run_rust.py` compiles the Rust course with rustc, `run_go.py` runs the Go course with `go run`, `run_cobol.py` compiles the COBOL course with GnuCOBOL (`cobc -x -free`), `run_fortran.py` compiles the Fortran course with gfortran, `run_moderndelphi.py` compiles the modern Delphi course through `run_delphi.py` after dropping the `System.` prefix from unit names, `run_javascript.py` runs the JavaScript course with Node.js, and `run_turbopascal.py` compiles the Turbo Pascal course with fpc in Turbo Pascal mode (`-Mtp`). A runner whose tool is missing is skipped with a note

## Course schema

Each `data/<id>.js` sets `window.PROGRAMMING.<id>`:

```js
{
  id, name, title, intro,          // intro is HTML
  note: "...",                     // optional HTML, shown at the top of every page of the course
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

A track also has `langs: { <id>: { name, comment, keywords, builtins } }`,
and each example or question names its language with `lang`. In the
numerical methods track, `known: [...]` lists the values an example must
print (checked to the printed precision) and examples of one method in
different languages share an `impl` id.

## Adding a language

1. Add `data/<id>.js` following the schema.
2. Add an entry to `data/catalog.js` with its `group` and `tags`. A current
   version of a language goes in `modern`; its older versions (and languages
   mainly kept for existing systems) go in `older`; esoteric languages go in
   `joke` and have no tags.
3. If the Desk should offer it under `?lang=`, the id must be in `EXTRA_LANGS`
   in `LanguageStudentDesk.py`.
4. Run `python3 programming-learner/tools/check_packs.py` (needs node and python3;
   fpc to run the Delphi programs, cobc for COBOL, and gfortran for Fortran).
