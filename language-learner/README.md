# Language Learner

A guided path for one language that strings the Desk's tools together: learn the script, read first words,
study grammar, then put it to use. Open with `?lang=<id>`.

Paths live in `paths.js`: Japanese, Klingon, Chinese, Korean, Russian, Hindi, Arabic, Greek, Latin, and
every other SquirrelGo Alphabets language (script, example words, then your own words). Each step links to a
tool with the same `?lang=`, and most tick themselves off from your progress in the Vocabulary Learner
(cards studied in a deck, words added) and the Grammar Learner (lessons passed). Steps without a check are
ticked by hand. The page also shows cards due today and your review streak.

Progress is shared through `localStorage`, so it works when the tools are opened from the same Desk server
(or the same folder over `file://` in browsers that share storage between local files).
