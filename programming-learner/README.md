# Programming Learner

Scaffold for adding programming-language learning to Language Student Desk.

## Intended structure

- `index.html` — UI with language sidebar and content panels
- Future `data.js` or per-language files under `languages/programming/` for topics, examples, and quizzes
- Reuse patterns from Character Learner (learn / quiz / progress) where useful

## Launch

Appears automatically in the Desk launcher. Can also be opened directly:

```
programming-learner/index.html
programming-learner/index.html?lang=python
```

## Next steps

1. Define a data schema for topics and examples
2. Add real content for one language (e.g. Python)
3. Wire progress tracking via localStorage
4. Optionally add syntax-highlighting or runnable examples
