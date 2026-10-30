# Grammar Learner

Short lessons with examples, then a drill that explains every answer. Open with `?lang=<id>`.

- **Japanese** (`data/japanese.js`): twelve particle lessons — は, が, は vs が, を, に, へ, で, と, も, の, から/まで, and the sentence endings か/よ/ね.
- **Klingon** (`data/klingon.js`): five lessons on verb prefixes — verb shape and word order, prefixes with no object, the full subject/object grid, the bare verb, and commands. Drills are generated from the prefix grid, so they differ every time. Examples can be shown in pIqaD.

A lesson is passed at 80%. Mixed review draws questions from every lesson you have practised.
Progress is stored in `localStorage` under `lsd-grammar-v1`, which the Language Learner reads.

To add a language, write `data/<id>.js` in the same shape and add it to `FILES` in `app.js`.
