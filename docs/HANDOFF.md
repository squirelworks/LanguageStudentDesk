# SquirrelGo: what changed, what's in flight, what's on hold

Brief for Cursor or Codex. First written 2026-11-05 for the 2026-11-07
handoff; sections 1, 3, 4 and 5 refreshed 2026-11-14 from live GitHub state.
The suggested order for future work, the risks and the working lessons are in
[`FUTURE-WORK.md`](FUTURE-WORK.md); read it next. The previous brief was
`CURSOR-HANDOFF.md` (in the owner's handoff bundle); its guardrails (section 1)
still hold, with the additions in section 6 below.

**GitHub is the source of truth.** Every roadmap is an issue with a checkbox
task list. Tick boxes there as PRs merge. Copies of the roadmaps live in
`docs/ROADMAP.md` and in the handoff bundle the owner hands over.

---

## 1. Snapshot (2026-11-14)

| Repo | `main` | Latest published release | Unpublished draft | Open PRs | Open issues |
|---|---|---|---|---|---|
| squirelworks/LanguageStudentDesk (LSD, the platform home) | `3c504fd` (#319) | **squirrelgo-v0.1.2** (2026-11-04) | squirrelgo-v0.1.3 (data v0.1.4, stale) | none | #188–#201 roadmap, #281 |
| squirelworks/squirrel-lang-data (all language content) | `ffd03a7` (#109) | **v0.1.5** (2026-11-13) | none | none | none (#56 closed 2026-11-14) |
| squirelworks/squirrelator (translator engine + apps) | `12a84a4` (#49) | **v0.1.0** | v0.1.1 (data v0.1.4, stale) | none | #25, #26 |

- **Data pins:** LSD (#319) and squirrelator (#49) both pin `data/` to
  `ffd03a7`, the **v0.1.5** tag.
- **Google Play:** all 10 SquirrelGo apps are on Play closed testing at
  squirrelgo-v0.1.2. squirrelator's phone app is ready for Play (squirrelator
  #43, LSD #316) and goes to internal testing when its first release is
  published.
- **Stale drafts:** squirrelgo-v0.1.3 and squirrelator v0.1.1 were drafted
  against data v0.1.4 and never published. See `RELEASE_PLAN.md` in each
  repo and `FUTURE-WORK.md` P0.

---

## 2. What changed since the last Cursor handoff

### Since 2026-11-07

- **Data v0.1.5** (published 2026-11-13): French, German and Italian
  meaning-matrix columns (all 103 rows), Latin, Greek and Russian filled to
  every row, English contractions and `@partitive` (data #105, #109), and the
  Syriac (Estrangela) alphabet with machine-drafted strokes (data #106).
- **LSD:** pin to v0.1.5 with French, German and Italian in the Translation
  Learner and Syriac in SquirrelGo Alphabets and the Character Learner (#319);
  TypeScript, Java and Bash deepened (#318); Orthodox Bible opens a book in
  the text that has it (#317); squirrelator Play testing workflow (#316); no
  close-word credit for a different thing (#310, closed #284).
- **squirrelator:** English as the source (#48), code explained with the code
  pack's English rows (#46, closed data #56), bare 今日は (#47), Klingon jatlh
  (#45), pin to v0.1.5 (#49).

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
  The Syriac alphabet came later, in data v0.1.5.
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

## 3. Known caveats

- **Syriac strokes are a machine draft** from Noto Sans Syriac. They pass the
  automated checks; no person has reviewed them (#188, #201).
- **New matrix columns are unreviewed:** French, German, Italian and the
  Latin, Greek and Russian fills were written for the project and checked
  only by validators and squirrelator's round trip (#198).
- **23 stroke-check failures** remain in the baseline (#188).
- **APKs are not smoke-tested on a device** before a draft.
- **Recorded reviews** exist for 9 of 38 languages.

---

## 4. On hold (needs Squirrel before anyone acts)

- [ ] **Publishing anything.** Refreshing the squirrelgo-v0.1.3 and
      squirrelator v0.1.1 drafts to data v0.1.5 (or replacing them with new
      versions) is prepared by an agent; only Squirrel publishes.
- **Replacing WebView/Tk apps with native builds** (LSD #197, squirrelator #25):
  only a pilot is in scope. Nothing gets removed or replaced before Squirrel
  signs off.
- **Branch ruleset:** Squirrel decided not to turn it on. Don't recommend it.
- **Source-limited languages** (Aramaic, Cherokee, Inuktitut, Manipuri,
  Tamazight): no more content without published sources.
- **Signing keys and Play secrets:** owner-only. Never add, print or commit.

Settled since the last brief: Latin and Klingon sentences go to the Pipeline
under Auto (squirrelator #40); close-word credit stops at things, places,
names, languages and days (#310).

---

## 5. Suggested next work

The full order, with reasons, is in [`FUTURE-WORK.md`](FUTURE-WORK.md). In
short:

1. Refresh the two stale drafts to data v0.1.5 and ask Squirrel to publish.
2. Add an emulator smoke test for the APKs.
3. Review the Syriac strokes; clear the stroke-check baseline; record reviews.
4. Generate squirrelator's coverage report in CI; drop alpha labels from it.
5. Translation Learner test sets for Chinese and the new full columns.
6. Fill the partial matrix columns, then add the missing ones.
7. Move programming courses and variants into the data repo (data v0.2.0).
8. Native pilots, only with Squirrel's sign-off.

Open **few, sizeable PRs per repo, one theme each, merged one after
another**, and keep the cross-repo order: data, data release, LSD pin,
squirrelator pin, app release.

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
| Future work, risks, lessons | LSD `docs/FUTURE-WORK.md` |
| Platform roadmap | LSD issue #199 (children #188–#198, #200, #201); copy in LSD `docs/ROADMAP.md` |
| Release plans | LSD `docs/RELEASE_PLAN.md`, data `RELEASE_PLAN.md`, squirrelator `RELEASE_PLAN.md` |
| Release rules | LSD `docs/RELEASES.md`, `docs/PLAY.md` |
| Data repo rules | data `README.md`, `AGENTS.md`, `REVIEWING.md`, `SOURCES.md` |
| squirrelator roadmap | squirrelator `ROADMAP.md`; issues #25, #26 |
| Framework spec | LSD `docs/FRAMEWORK.md`, `docs/decisions/0001-native-apps.md` |
| Merge rules | each repo's `AGENTS.md` and `.github/MERGING.md`; the handoff bundle's `squirrelgo-suite/*/MERGE_GUIDELINES.md` |
| Thread prompts (Claude's setup, useful as role descriptions) | the handoff bundle's `squirrelgo-suite/` |
