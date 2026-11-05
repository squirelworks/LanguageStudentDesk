# SquirrelGo: what changed, what's in flight, what's on hold

Brief for Cursor, taking over on Saturday 2026-11-07. Written 2026-11-05 from
live GitHub state. The previous brief was `CURSOR-HANDOFF.md` (LanguageStudentDesk
`main` at `e9c0146`, PR #116, release v0.0.4). Much of that file is now out of
date: the data has moved to its own repo, and its section 7 task list is
replaced by the GitHub roadmap issues. Its guardrails (section 1) still hold,
with the additions in section 6 below.

**GitHub is the source of truth.** Every roadmap is an issue with a checkbox
task list. Tick boxes there as PRs merge. Copies of the roadmaps live in `docs/ROADMAP.md`
and in the handoff bundle the owner hands over.

---

## 1. Snapshot

| Repo | `main` | Latest published release | Open PRs | Open issues |
|---|---|---|---|---|
| squirelworks/LanguageStudentDesk (LSD, the platform home) | `2227486` (#307) | **squirrelgo-v0.1.2** (2026-11-04) | none | #188–#201 roadmap, #281, #284 |
| squirelworks/squirrel-lang-data (all language content) | `18ea0aa` (#98) | **v0.1.3** (`b6912a0`) | none | #56 |
| squirelworks/squirrelator (translator engine + apps) | `453b6ae` (#38) | **v0.1.0** | none | #25, #26 |

- **Data pins:** LSD and squirrelator both pin `data/` to `b6912a0`, the
  **v0.1.3** tag. Data `main` is ~40 PRs ahead of that tag (everything listed in
  `release-notes/v0.1.4.md`, still marked Draft).
- **Google Play:** all **10 SquirrelGo apps** are on Play closed testing at
  squirrelgo-v0.1.2, each release named after its app and version (#305):
  LSD Suite (the Desk on Android), Programming Student Desk, Kana, Kanji,
  Alphabets, Bopomofo, Klingon, Japanese-English Dictionary, Phrasebook and
  Orthodox Bible.
- **No draft releases exist** on any repo. SquirrelGo v0.1.3 and squirrelator
  v0.1.1 are planned but not started (no notes file, no draft).

---

## 2. What changed since the last Cursor handoff

### New repo: squirrel-lang-data (all content lives here now)

- Decided 2026-11-04: all language content moved out of LSD into
  `squirelworks/squirrel-lang-data`. LSD and squirrelator pull it in as a git
  submodule at `data/`, pinned to a **tagged release** (never an untagged
  commit). Clone with `git clone --recursive`.
- Source format is **JSON for records and JSONL for big lists**, each naming a
  schema (`"schema": "grammar@1"`). Apps generate their `window.X = …` JS files
  at build time with the generators in `data/tools/` (run by LSD's
  `languages/build_registry.py`).
- Moved in, one type per PR pair: language meta + registry, vocabulary,
  grammar, reference cards, character tables, meaning matrix, stroke files and
  the script courses for the SquirrelGo character apps.
- Added: `features.json` (shared feature switches and the welcome card list),
  schemas and `tools/check_*.py` validators (`tools/check_all.sh`), the
  language-pack exporter (folder, SQLite, Anki, Yomitan), `REVIEWING.md` plus a
  `REVIEW.md` log per reviewed language, a Content error issue form,
  inflection tables (`inflections@1`: Latin and English), meta `markers`,
  `cases` and `order`.
- Imports with level and frequency tags: JLPT N5–N1 (Japanese), NIKL (Korean),
  CC-CEDICT frequency list with hand-placed HSK levels (Chinese), wordfreq tags
  for 11 more languages, CEFR levels for French, German, Italian, Greek and
  Russian, and quoted JLPT/TOPIK/HSK/CEFR level cards.
- Aramaic added (Biblical/Imperial in the square script, Classical Syriac and
  Neo-Aramaic varieties) with vocabulary, a first grammar and reference cards.
  The Syriac alphabet itself is not in the data yet.
- Meaning matrix: Japanese, Chinese and Korean columns render all 89 rows; a
  new **code pack** (14 rows for explaining code) with Japanese, Chinese,
  Korean and Latin columns.
- **Grammar expansion to 72 lessons per language** (data #66, #68–#94): see
  section 3.
- Kana: a Historical kana lesson for ゐ ゑ ヰ ヱ, plus a note on why there's no
  ye (data #65). 
- Releases v0.1.0, v0.1.1, v0.1.2, v0.1.3 published.

### LanguageStudentDesk and the SquirrelGo apps

- The Desk and the character apps generate everything from `data/` (#230,
  #264, #267, #274, #289). Desk data checks in CI fail on stale generated files.
- Simple menu: Settings levels (Simple, More, Everything), Customize switches,
  "What's in the app", first-run welcome card (Latin, Klingon, Aramaic) (#218,
  #262).
- Level tabs on grammar, References and Resources (#210, #217); grammar web
  with "Not written yet" points (#222).
- Meaning matrix side by side and a meaning web (#211, #213).
- Translation Learner: marked (alpha), accepts equivalent phrasings, Japanese
  and Korean test sets, alpha dropped for pairs whose tests pass, vocabulary
  links, added phrases no longer zero the score (#207, #221, #228, #229, #241,
  #279, #287).
- Strokes: final-frame and stroke-count checks in CI (#205); kanji
  regenerated from KanjiVG (#209); Bopomofo redrawn (#214); kana handakuten
  (#233); redraws in Armenian, Arabic, Bengali, Burmese, Cherokee, Ethiopic,
  Georgian, Hebrew, Malayalam, Meetei Mayek, Mongolian, Odia, Syllabics, Thai
  and Tibetan; Hangul order fixes in data #53.
- Programming Learner: modern / older / joke sections, A–Z view, tag filter,
  show-older and show-joke switches, brainFOOD note (#208, #212, #234); ~20 new
  courses (C++, C#, Java, JavaScript, TypeScript, HTML/CSS, PHP, Perl, Bash,
  SQL, Kotlin, Swift, VB.NET, modern Delphi, Turbo Pascal, classic BASIC,
  COBOL, Fortran…), deepened C, C++, C#, Delphi, Rust, Go and JavaScript
  (#297–#303); the **numerical methods track is complete** (root finding,
  integration, linear systems, interpolation, ODEs, minimization, random
  numbers, eigenvalues, FFT).
- Native apps: decision record `docs/decisions/0001-native-apps.md` (Kotlin +
  Compose Multiplatform). No LSD app has been migrated yet.
- Orthodox Bible: Latin built in, more texts and commentary as release
  downloads, "unaccented transcription" label for the Patriarchal Text.
- SquirrelGo apps keep clear of the camera cutout (#223); Dictionary word list
  ships in the Desk downloads (#278).
- Release machinery: `docs/RELEASES.md` (drafts only, the owner publishes),
  `squirrelgo-release.yml` (hand-started draft), `squirrelgo-test-apk.yml`
  (hand-started test APK), CI compiles only (no APK flood),
  `squirrelgo-play.yml` sends AABs to Play closed testing on publish
  (`docs/PLAY.md`).
- PR guard now fails a PR that moves the `data/` pin without the `data-pin`
  label (#291).
- Releases squirrelgo-v0.1.0, v0.1.1 and v0.1.2 published.

### squirrelator

- Phase 0 done: AGENTS.md, CI (pytest, ruff, web syntax), PR guard, golden
  tests (#2–#6).
- Phase 1 engine done as a pipeline: Analyze, Parse, Interlingua, Generate,
  Rank, `translate_full()` and the `Translation` result type (#12–#23).
- `engine="auto"` is the default: rules pairs (code) stay on Rules, human
  language pairs go to the Pipeline (alpha); Latin and Klingon show the
  Pipeline's answer as a "second opinion" (#27, #30, #32).
- Latin declension/conjugation and English verb/noun forms from the data's
  inflection tables (#36, #37).
- **Native app:** `native/` holds one Compose translate screen for Android and
  desktop, with the Python engine inside via Chaquopy (#31, #34), and a
  hand-started **test APK** workflow (`native-test-apk.yml`, #33).
- CI fails unless `data/` is pinned to a tagged data release on `main` (#11).
- Release v0.1.0 published; `data/` now at v0.1.3 (#38).

---

## 3. Recently finished, and what's still running

### "Add grammar lessons for every language" (finished 2026-11-05)

Target was **72 lessons per language** (24 for Tibetan and Klingon), one language per PR, in squirrel-lang-data. Every PR is merged on data `main`; none of it is tagged yet (it ships in v0.1.4).

- [x] Chinese (#66), Japanese 73 (#68), French (#69), German (#70), Italian (#71),
      Russian/cyrillic (#72), Greek (#73), Arabic (#74), Hindi (#75), Bengali (#76),
      Hebrew (#77), Thai (#78), Tamil (#79), Telugu (#80), Kannada (#81),
      Malayalam (#82), Gujarati (#83), Punjabi (#84), Odia (#85), Sinhala (#86),
      Burmese (#87), Khmer (#88), Lao (#89), Mongolian (#90), Georgian (#91),
      Armenian (#92), Amharic (#94); Korean/hangul and Taiwanese were already at 72
- [x] Level labels that disagreed with the CEFR estimate fixed (#93)
- [x] Latin to 72 (#95, merged 2026-11-05)
- [x] Tibetan 6 → 24 (#97)
- [x] Klingon 10 → 24 (#98; keeps the file's generate/table lessons and `drillData`)
- **Deliberately not touched:** Aramaic (5), Cherokee (12), Inuktitut (12),
  Manipuri (6), Tamazight (12). Every lesson there is source-cited; adding more
  needs real published sources ("accuracy over volume, no invented forms").
  English has no grammar course on purpose (it's the base language).

All of it is merged. Use the rules below for any future grammar PR.

Rules for a grammar PR (from the thread):

- Edit only `languages/<lang>/grammar.json` and add one bullet under
  `## Grammar` in `release-notes/v0.1.4.md`.
- The `Scope:` line lists every path in full; the guard doesn't expand `{a,b}`.
- Before pushing: `python3 tools/fmt.py`, `bash tools/check_all.sh`,
  `python3 .github/scripts/pr_guard.py --base origin/main --head HEAD`.
- Lesson shape (`grammar@1`): `id, title, particle, summary, level,
  sections[{h?, p, examples[[sentence, reading, english]]}],
  drills[{q, en, options, answer, why}]`. `{braces}` only in the sentence, never
  the reading. Each drill has exactly one `＿`, and `answer` is one of `options`.
- Each summary ends "(about A1…C1)", and its earliest level matches the band:
  absolute-beginner/beginner = A1, beginner-intermediate = A2, intermediate =
  B1, advanced-intermediate = B2, advanced = C1. A beginner lesson at A2 uses
  "(about A1–A2)". Update the course's intro and notes with the new lesson
  count and range.

### "Merge handoff PRs as they land"

The merger squash-merges green PRs in all three repos. Nothing is held. Its
running notes are `merger-notes.md` in the owner's handoff bundle. It will keep
merging until the handoff. After that, Cursor merges (if the owner lets it)
following `MERGE_GUIDELINES.md` and the rules in section 6.

### Review-ready threads (finished, with leftovers)

- **"Test apps for usability and veracity":** all fixes merged. Leftovers:
  LSD #281 item 1 (Orthodox Bible opens on John with a "Septuagint does not
  include John" notice) and LSD #284 (close-word credit: "dinner" for "lunch"
  still scores 87%). Not yet tested: deep drills in Grammar, Language,
  Reference, Resource, Legalese and Programming learners, and the rest of the
  Alphabets scripts' writing pads.
- **"Import vocab and grammar from sources":** all PRs merged (JLPT, NIKL,
  CC-CEDICT, CEFR, wordfreq). Leftover: 22 languages have no frequency data, so
  their words stay untagged; tool-based imports for the remaining languages
  (#190) not started.

---

## 4. On hold (needs Squirrel before anyone acts)

- [ ] **Data v0.1.4 tag.** Everything since v0.1.3 is on data `main` and in
      `release-notes/v0.1.4.md` (Draft). The grammar expansion is finished, so it
      only waits for Squirrel to say "release". Then: remove "Draft." from the notes,
      run **Draft release**, Squirrel publishes.
- [ ] **Pin bumps to v0.1.4** in LSD and squirrelator: one PR each,
      "Bump squirrel-lang-data to v0.1.4 (<sha>)", with the `data-pin` label in
      LSD. Only after the tag is published.
- [ ] **SquirrelGo v0.1.3** (LSD): release PR raising every app's
      `versionCode`/`versionName` plus `release-notes/squirrelgo-v0.1.3.md`,
      then the hand-started draft. Needs Squirrel's "release". Follows the v0.1.4
      pin bump so the new grammar ships.
- [ ] **squirrelator v0.1.1:** release PR adding `release-notes/v0.1.1.md`,
      then **Draft release**. Needs Squirrel's "release".
- **Latin and Klingon engine choice** (squirrelator #26, point 2): they stay on
  Rules with the Pipeline as a second opinion. Moving them to the Pipeline
  changes 16 golden outputs; Squirrel's call.
- **Close-word credit** (LSD #284): whether a near-synonym in the wrong role
  should still get credit is a design choice for Squirrel.
- **Replacing WebView/Tk apps with native builds** (LSD #197, squirrelator #25):
  only a pilot is in scope. Nothing gets removed or replaced before Squirrel
  signs off.
- **Branch ruleset:** Squirrel decided not to turn it on. Don't recommend it.
- **Source-limited languages** (Aramaic, Cherokee, Inuktitut, Manipuri,
  Tamazight): no more content without published sources.
- **Signing keys and Play secrets:** owner-only. Never add, print or commit.

---

## 5. Suggested next work, in order

1. [x] The grammar expansion is finished (Latin #95, Tibetan #97, Klingon #98).
2. [ ] Ask Squirrel to release data v0.1.4, then bump the pins (section 4).
3. [ ] Ask Squirrel about SquirrelGo v0.1.3 and squirrelator v0.1.1.
4. [ ] squirrelator: switch the code-explanation templates to the code pack's
       English rows (data #56 / squirrelator #26 idea 2).
5. [ ] Fill the meaning-matrix columns that have 20–42 of 89 rows, then add
       columns for the 22 languages without one (squirrelator #26 point 3).
6. [ ] Work the LSD roadmap issues top to bottom (#199 lists them): strokes
       script by script (#188), character sets (#189), vocabulary imports
       (#190), grammar level tabs and reviews (#191), varieties and
       traditional/simplified (#200), the content review logs (#198).
7. [ ] LSD #281 item 1 (Orthodox Bible first-open notice).

---

## 6. Rules added since the last handoff

All of section 1 of the previous brief (`CURSOR-HANDOFF.md`, in the handoff
bundle) still applies; the same rules are in `AGENTS.md` and `.github/MERGING.md`. On top of it:

1. **Content goes to squirrel-lang-data, not LSD.** LSD's `languages/` files
   are generated from `data/`. Hold or redo any PR that adds content to an
   app's own folder.
2. **Pins move only to tagged data releases.** A pin bump is its own PR,
   "Bump squirrel-lang-data to vX.Y.Z (<sha>)", nothing else in it, with the
   `data-pin` label in LSD (the guard fails it without). Every other PR keeps
   main's pin.
3. **After merging any LSD PR whose commits touched `data/`**, run
   `git ls-tree <merge sha> data` and compare with the intended pin. A squash
   merge once silently put the pin back (#283, fixed by #286).
4. **Never merge without CI.** Never on local checks alone, never with an
   empty check-run list. If CI doesn't start, hold and say so.
5. **Releases:** Claude/Cursor prepares a release PR and a **draft**; only
   Squirrel publishes. Tags are never moved, reused or deleted. AABs never go
   to GitHub. CI compiles only; APKs come from the hand-started test workflow
   or a release.
6. **Generated files:** after changing anything in `data/` or the generators,
   run `python3 languages/build_registry.py` in LSD and commit the output;
   `--check` must be clean.
7. **Tick the boxes.** When a PR finishes a roadmap item, tick it in the
   issue and name the PR in the line, e.g. `- [x] Bopomofo (#214)`.
8. **Don't be lazy on routine steps** (Squirrel, 2026-11-04): re-run jobs that
   failed for infrastructure reasons, resolve trivial release-notes conflicts by
   keeping every bullet, and merge green PRs promptly. Only stop for a real
   content failure or a step that needs Squirrel.

---

## 7. Where things are

| What | Where |
|---|---|
| This brief | LSD `docs/HANDOFF.md` and the owner's handoff bundle |
| Platform roadmap | LSD issue #199 (children #188–#198, #200, #201); copy in LSD `docs/ROADMAP.md` |
| Release plans | LSD `docs/RELEASE_PLAN.md`, data `RELEASE_PLAN.md`, squirrelator `RELEASE_PLAN.md` |
| Release rules | LSD `docs/RELEASES.md`, `docs/PLAY.md` |
| Data repo rules | data `README.md`, `AGENTS.md`, `REVIEWING.md`, `SOURCES.md` |
| squirrelator roadmap | squirrelator `ROADMAP.md`; issues #25, #26 |
| Framework spec | LSD `docs/FRAMEWORK.md`, `docs/decisions/0001-native-apps.md` |
| Merge rules | each repo's `AGENTS.md` and `.github/MERGING.md`; the handoff bundle's `squirrelgo-suite/*/MERGE_GUIDELINES.md` |
| Thread prompts (Claude's setup, useful as role descriptions) | the handoff bundle's `squirrelgo-suite/` |
