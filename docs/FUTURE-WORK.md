# SquirrelGo: future work

Written 2026-11-14 for whoever carries the platform next (Cursor, Codex or
another agent). It covers LanguageStudentDesk (this repo, the platform home),
[squirrel-lang-data](https://github.com/squirelworks/squirrel-lang-data) and
[squirrelator](https://github.com/squirelworks/squirrelator). Nothing in it
has been started; every item is open for the next agent.

**GitHub is the source of truth.** The roadmap issues carry the checklists
(#199 lists them; squirrel-lang-data #56 is closed, squirrelator #25 and #26
are open). This file is the order and the reasoning; `HANDOFF.md` is the
snapshot and the rules.

---

## 1. Where things stand (2026-11-14)

| Repo | `main` | Published | Unpublished draft | Data pin |
|---|---|---|---|---|
| squirrel-lang-data | `ffd03a7` (#109) | **v0.1.5** (2026-11-13) | none | n/a |
| LanguageStudentDesk | `3c504fd` (#319) | squirrelgo-v0.1.2 | **squirrelgo-v0.1.3** (built on data v0.1.4) | v0.1.5 |
| squirrelator | `12a84a4` (#49) | v0.1.0 | **v0.1.1** (built on data v0.1.4) | v0.1.5 |

Shipped since the 2026-11-07 handoff:

- **Data v0.1.5:** French, German and Italian meaning-matrix columns (all 103
  rows), Latin, Greek and Russian filled to every row, English contractions,
  the `@partitive` meaning, and the Syriac (Estrangela) alphabet course
  (data #105, #106, #109).
- **LanguageStudentDesk:** French, German and Italian in the Translation
  Learner and Syriac in SquirrelGo Alphabets and the Character Learner (#319);
  four more lessons each and a project for TypeScript, Java and Bash (#318);
  the Orthodox Bible opens a book in the text that has it (#317, closes the
  first half of #281); no close-word credit for a different thing (#310,
  closed #284).
- **squirrelator:** English as the source reads contractions and a word's
  row meaning (#48); code explained with the code pack's English rows (#46);
  bare 今日は reads as hello (#47); Latin follows its fuller column with the
  v0.1.5 pin (#49).

### Known caveats

- **Syriac strokes are a machine draft.** They were generated from Noto Sans
  Syriac and pass the automated final-frame and stroke-count checks, but no
  person has checked them against a writing primer. Treat Syriac stroke order
  as unreviewed until a `REVIEW.md` entry says otherwise.
- **The new French, German and Italian columns, and the Latin, Greek and
  Russian fills, were written for this project** and checked only by the
  data validators and squirrelator's round-trip. No native speaker has
  reviewed them. Latin uses Neo-Latin coinages where Classical Latin has no
  word (cafēum, autocinētum, trāmen).
- **The two unpublished drafts are stale.** squirrelgo-v0.1.3 and squirrelator
  v0.1.1 were drafted against data v0.1.4. `main` in both repos now pins
  v0.1.5. Publishing either draft as it stands ships the older data.
- **APKs are not smoke-tested on a device** before a draft; the release notes
  say so.
- **23 stroke-check failures** are still in
  `SquirrelGo-Apps/tools/strokecheck/baseline.json` (#188).
- **Recorded content reviews** exist for 9 of 38 languages (Chinese, French,
  German, Greek, Italian, Japanese, Korean, Latin, Russian).

---

## 2. How to work: the lessons

These come from the last two weeks of running several agents across three
repos at once. They matter more than any single feature below.

1. **Few, sizeable PRs per repo, merged one after another.** Dozens of small
   PRs open at the same time caused most of the trouble: conflicts on shared
   files (release notes, roadmap copies, generated JS), a squash merge that
   silently put the `data/` pin back (#283, fixed by #286), and a GitHub
   Actions queue so backed up that work stopped for three hours. With one
   agent per repo, open **one PR per repo per theme**, wait for it to merge,
   then branch the next one from the new `main`. "One seam per PR" in each
   `AGENTS.md` still holds: read it as one theme (for example "fill the
   Arabic, Hindi and Hebrew columns"), with every folder it touches named on
   the `Scope:` line.
2. **Cross-repo order is fixed:** data PR, then a data release (the owner
   publishes), then the pin bump in LanguageStudentDesk (with the `data-pin`
   label), then the pin bump in squirrelator, then any app release. Never
   start a pin bump before the data tag exists.
3. **Never merge without CI.** Subscribe to the PR's checks instead of
   polling. After merging anything in this repo that touched `data/`, run
   `git ls-tree <merge sha> data` and compare it with the intended pin.
4. **Generate numbers, don't write them.** Counts of rows, lessons and
   languages went stale in every README and roadmap copy. Coverage and
   pass rates belong in CI output (see 3.2), not in prose.
5. **Tick the issue box in the same turn the PR merges**, naming the PR. Copy
   the issues into `docs/ROADMAP.md` only at a handoff.
6. **Releases stop at a draft.** Only the owner publishes. Tags are never
   created by hand, moved, reused or deleted. AABs and signing keys never go
   to GitHub.

---

## 3. Priorities, in order

Each item says which repo it lands in, so one PR per repo per step is easy to
plan. Steps within a priority can run in parallel across repos, never within
one.

### P0. Ship what's already on `main` (needs the owner)

1. **Refresh the two drafts to data v0.1.5** (LanguageStudentDesk,
   squirrelator). Neither tag exists yet, so the versions can be kept: one
   PR per repo updates `release-notes/squirrelgo-v0.1.3.md` and
   `release-notes/v0.1.1.md` to name data v0.1.5 and add what landed since
   (see section 1), then the hand-started **SquirrelGo release (draft)** and
   **Draft release** workflows are re-run on the new `main`. They refresh the
   existing drafts. The owner then publishes; the Desk builds, Orthodox Bible
   packs and Play uploads follow on their own. If the owner prefers new
   version numbers instead (squirrelgo-v0.1.4, squirrelator v0.1.2), the
   stale drafts are left unpublished and the release PRs raise the versions
   again. Ask once; it's the owner's call.
2. **An emulator smoke test before each draft** (LanguageStudentDesk CI): a
   hand-started job that installs every APK on an Android emulator, opens the
   main screen and fails on a crash. This removes the "not smoke-tested"
   caveat from every future release.

### P1. Close the quality gaps already known

1. **Review the Syriac strokes** (squirrel-lang-data): check all 22
   Estrangela letters against a published primer, redraw any that are wrong,
   and log the review in `languages/aramaic/REVIEW.md`. Cite the primer in
   `SOURCES.md`.
2. **Clear the stroke-check baseline** (squirrel-lang-data, then a pin bump
   here): 13 kanji from KanjiVG, 8 kana and ㅇ, ⴰ. Remove each from
   `baseline.json` as it passes. One PR for the kana and kanji, one for the
   rest.
3. **Recorded reviews for the languages without one** (squirrel-lang-data,
   following `REVIEWING.md`). Start with the ones learners see first: Arabic,
   Hindi, Hebrew, Thai, then the rest. One PR can carry several reviews.
4. **The last squirrelator misses** (squirrelator #26): Chinese 吃饭 and
   几点了, Klingon jIyajbe' and Dajatlh'a'. Then re-measure every column and
   post the numbers.

### P2. Make coverage measurable, then widen it

1. **A coverage report generated in CI** (squirrelator, Phase 5): for every
   meaning-matrix column, rows that come back as the top English result in
   each direction, written as a Markdown table artifact on every run. Drop a
   pair's "alpha" label in code only when the report shows it at the bar in
   #26 (90% of rows both ways). This replaces the hand-measured tables in #26.
2. **Translation Learner test sets for every full column** (this repo, #194):
   Chinese–English first, then French, German, Italian, Latin, Greek and
   Russian, which now have all rows. Each set lists accepted and rejected
   answers; a passing pair goes into `translation-learner/data/tested.js`.
3. **Fill the partial matrix columns** (squirrel-lang-data): Arabic, Hindi,
   Bengali, Armenian, Georgian, Hebrew, Thai, Tamil and Klingon, plus the
   Klingon code-pack rows. Batch three or four languages per PR.
4. **Columns for the 19 languages without one** (squirrel-lang-data):
   Amharic, Aramaic, Burmese, Cherokee, Gujarati, Inuktitut, Kannada, Khmer,
   Lao, Malayalam, Manipuri, Mongolian, Odia, Punjabi, Sinhala, Taiwanese,
   Tamazight, Telugu, Tibetan. The source-limited ones (Aramaic, Cherokee,
   Inuktitut, Manipuri, Tamazight) only from published sources, rows left
   empty rather than invented.
5. **Let the Translation Learner call squirrelator** for checking and
   alternatives (#194 last box), once the coverage report shows a pair is
   reliable. One PR in each repo, each naming the other.

### P3. Structural moves that unlock later work (data v0.2.0)

1. **Programming courses and keyword maps into squirrel-lang-data**
   (`programming/<id>/`, #196, #195). This is what lets squirrelator's code
   generators (Phase 4) share keyword maps with the Programming Learner.
   Move a few courses per PR; this repo then generates its files from
   `data/` the way the language learners do, with a drift check in CI.
2. **Character variants (`variants/`)** from Unihan, and traditional ↔
   simplified Chinese linked both ways (#200). squirrelator's conversion mode
   (Phase 2b) builds on it.
3. **Cantonese as the first regional variety** (#200), end to end: data,
   Desk, phone, translator. It proves the variety model and the More level
   in Settings before anything else uses it.
4. **squirrelator reads `features.json`** for its settings (#201).
5. Tag **data v0.2.0** when these land; it's a MINOR release.

### P4. Native apps (needs the owner's sign-off to replace anything)

1. **squirrelator #25:** measure the APK size, give the desktop build its own
   Python, reach parity with the Tk window (alternatives, breakdown, unknown
   words). The Tk window is replaced only after the owner signs off.
2. **An LSD pilot in Compose** (#197). The best candidate is SquirrelGo Kana:
   small, self-contained, reads only shared data, and has a writing pad that
   exercises the stroke code. The WebView app stays until the owner signs off.

### P5. Ideas for later

- **Handwriting input** (squirrelator Phase 3b) once the stroke baseline is
  empty: one matcher shared by the writing pads and the translator.
- **Source-language detection** from script and word list, with an override.
- **Serto and Madnhaya** Syriac shapes, once Estrangela is reviewed.
- **Pronunciation settings** for Latin (Classical, Ecclesiastical) and Ancient
  Greek (#200), which the speech and romanization can follow.
- **Learner deep-drill testing** of the Grammar, Language, Reference,
  Resource, Legalese and Programming learners (#198).
- **An accented public-domain Patriarchal Text** for the Orthodox Bible,
  if one exists (#281).
- **Programming Learner content** for the courses not yet deepened (#195):
  Python, PHP, Perl, Kotlin, Swift, SQL, Visual Basic, HTML and CSS, and the
  older languages.

---

## 4. Risks

- **One owner publishes everything.** Every release waits on the owner. Batch
  release asks: one message naming every draft that's ready.
- **Unreviewed content looks finished.** The apps don't show which data a
  person has checked. Consider a "not yet reviewed" note for a language with
  no `REVIEW.md`, driven by data, not hardcoded.
- **Stale drafts get published by accident.** Refresh or replace them (P0.1)
  before asking for a release.
- **Generated files drift.** The Desk regenerates from `data/`; the other
  SquirrelGo apps that carry their own copies still have no drift check
  (#196).
- **Two UIs per app.** WebView and Compose, Tk and Compose: every feature
  costs twice until a migration finishes. Don't start a second Compose
  migration until the first is signed off.
- **Repo size.** Recorded audio (for example the Syriac sounds in #319) is
  committed to this repo. If more languages get audio, move it to release
  downloads like the Orthodox Bible content packs.
- **License drift.** Every import must name its source and license in
  `SOURCES.md` in the same PR. Recheck before importing from anything new
  (Unihan, primers, Tatoeba is CC BY 2.0 FR).
