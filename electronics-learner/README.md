# Electronics Learner

Short lessons with worked examples, then a practice round that explains every
answer. Courses are grouped by recognizable subject: foundations, components,
circuits, digital, soldering, PCB design and systems. Overlap between subjects
is deliberate — a circuits lesson may use component ideas, but each course
still stands alone. Progress is saved in the browser.

## Launch

Appears in the Desk launcher. Direct URLs:

```
electronics-learner/index.html
electronics-learner/index.html?lang=foundations
electronics-learner/index.html?lang=circuits#series
```

## Files

- `index.html`, `app.js`, `sections.js` — the page (shared Desk learner chrome)
- `data/catalog.js` and `data/<id>.js` — generated from `squirrel-lang-data`
  `electronics/` by `python3 data/tools/gen_electronics.py --out electronics-learner/data`
  (`window.ELECTRONICS_CATALOG` / `window.ELECTRONICS.<id>`)

## Course schema

Same lesson / section / practice shape as the Programming Learner. See
`programming-learner/README.md`. Source of truth is `electronics-course@1` in
`squirrel-lang-data`.

Phone twin (**Electronics Student Desk**) is a planned follow-up.
