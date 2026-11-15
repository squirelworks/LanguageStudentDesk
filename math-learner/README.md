# Math Learner

Short lessons with worked examples, then a practice round that explains every
answer. Courses are grouped by subject: foundations (arithmetic), algebra,
geometry and trigonometry, calculus, linear algebra and topology. Overlap
between subjects is deliberate — a lesson in calculus may use algebra, but
each course still stands alone. Progress is saved in the browser.

## Launch

Appears in the Desk launcher. Direct URLs:

```
math-learner/index.html
math-learner/index.html?lang=arithmetic
math-learner/index.html?lang=calculus#derivative
```

## Files

- `index.html`, `app.js`, `sections.js` — the page (shared Desk learner chrome)
- `data/catalog.js` — courses and groups
- `data/<id>.js` — one course per subject (`window.MATH.<id>`)

## Course schema

Same lesson / section / practice shape as the Programming Learner. See
`programming-learner/README.md`. Math courses usually omit syntax
highlighting fields (`keywords`, `comment`).
