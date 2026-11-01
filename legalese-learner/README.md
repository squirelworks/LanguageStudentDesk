# Legalese Learner

Short lessons on how legal sentences work: *shall* and *may*, *herein* and
*hereinafter*, *notwithstanding* and *subject to*, consideration, and the
boilerplate at the back. Each lesson ends in practice that explains every
answer.

This is reading practice, not legal advice. The sample clauses were written
for the Desk. A real contract is read under the law of a particular place.

## Launch

```
legalese-learner/index.html
legalese-learner/index.html#shall-may
```

`#<lesson id>` opens one lesson. Works over `file://` and the Desk's local server.

## Files

- `index.html`, `app.js` — the page (uses `../languages/learners.css` and `LSD.store` from `../languages/lsd-lang.js`)
- `data/course.js` — the lessons
- `tools/check_course.py` — answers are among the options, options are unique

```
python3 legalese-learner/tools/check_course.py
```
