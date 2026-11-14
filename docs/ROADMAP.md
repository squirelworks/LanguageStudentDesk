# Roadmap

A copy of the roadmap issues on GitHub, taken 2026-11-14 for the handoff (`HANDOFF.md`; the suggested order is in `FUTURE-WORK.md`). **The issues are the source of truth**: tick boxes there as PRs merge, and refresh this copy at the next handoff. Links like #188 point at this repo's issues; "data #N" means a squirrel-lang-data PR. A closed issue is marked (closed).

## Contents

- [#199 Roadmap: LanguageStudentDesk and SquirrelGo](https://github.com/squirelworks/LanguageStudentDesk/issues/199)
- [#196 Roadmap: Central data repo (squirrel-lang-data) as a submodule, and a modular framework for every app](https://github.com/squirelworks/LanguageStudentDesk/issues/196)
- [#198 Roadmap: Content review and testing](https://github.com/squirelworks/LanguageStudentDesk/issues/198)
- [#201 Roadmap: Keep the language menu simple; turn on more in Settings](https://github.com/squirelworks/LanguageStudentDesk/issues/201)
- [#188 Roadmap: Audit and fix stroke-order animations in every script](https://github.com/squirelworks/LanguageStudentDesk/issues/188)
- [#189 Roadmap: Make character sets as complete as possible](https://github.com/squirelworks/LanguageStudentDesk/issues/189)
- [#200 Roadmap: CJK character variants, regional varieties, historical stages and pronunciation choices](https://github.com/squirelworks/LanguageStudentDesk/issues/200)
- [#190 Roadmap: Expand vocabulary by level from cited sources](https://github.com/squirelworks/LanguageStudentDesk/issues/190)
- [#191 Roadmap: Plan grammar lessons by level for every language](https://github.com/squirelworks/LanguageStudentDesk/issues/191)
- [#192 Roadmap: References and Resources by level, plus a grammar web](https://github.com/squirelworks/LanguageStudentDesk/issues/192)
- [#194 Roadmap: Translation learner that accepts equivalent phrasings, alpha until then](https://github.com/squirelworks/LanguageStudentDesk/issues/194)
- [#195 Roadmap: Programming learner sections (modern, older, joke), alphabetical view, more languages and a numerical methods track](https://github.com/squirelworks/LanguageStudentDesk/issues/195)
- [#197 Roadmap: Native apps instead of WebView shells, if feasible](https://github.com/squirelworks/LanguageStudentDesk/issues/197)
- [#281 SquirrelGo Orthodox Bible: first-open notice, and the Patriarchal Text shows without accents](https://github.com/squirelworks/LanguageStudentDesk/issues/281)
- [#284 Translation Learner (alpha): adding words scores 0% while a wrong noun scores 87%](https://github.com/squirelworks/LanguageStudentDesk/issues/284) (closed)

---

## #199 Roadmap: LanguageStudentDesk and SquirrelGo

The plan for growing LanguageStudentDesk, the SquirrelGo apps and the Student Desk programs. Each item has its own issue. Every PR says `Part of #<issue>` and follows the merge guidelines (share don't fork, data before shells, Desk and phone stay twins, no implementation notes in the UI, APKs in Releases). Lesson from the last round: **open few, sizeable PRs per repo (one theme each) and merge them one after another**, rather than many small PRs at once.

**Status as of 2026-11-14** (handoff brief: `docs/HANDOFF.md`; suggested order, risks and ideas: `docs/FUTURE-WORK.md`). Language content lives in [squirrel-lang-data](https://github.com/squirelworks/squirrel-lang-data), pinned at `data/` to the **v0.1.5** tag (#319). The squirrelgo-v0.1.3 release is drafted but unpublished and was built on data v0.1.4, so it wants a refresh before the owner publishes. Every unticked box below is open for the next agent (Cursor or Codex). Tick a box when the PR that finishes it merges, and name the PR on the line.

### Foundation (runs alongside everything)

- [ ] #196 One shared content source and a modular framework for every app. *The Desk and the character apps generate everything from `data/`; open: the rest of the apps' build steps, a drift check for them, and moving the programming courses into the data repo (data v0.2.0).*
- [ ] #198 Content review and testing. *CI data and stroke checks, the review checklist and the Content error form are in; recorded reviews exist for 9 of 38 languages. Open: the other reviews (including the new French, German and Italian columns and the Syriac strokes), more translation test pairs, and the learner deep-drill passes.*
- [ ] #201 Keep the language menu simple. *Menu, levels, switches and welcome card shipped (#218, #262); the Syriac (Estrangela) alphabet shipped in SquirrelGo Alphabets (data #106, #319), with machine-drafted strokes that still need a person's review. Open: per-language pages for varieties, squirrelator reading `features.json`, Serto and Madnhaya shapes, more Aramaic grammar from published sources.*

### Phase 1: Characters

- [ ] #188 Audit and fix stroke-order animations in every script. *Checks in CI (#205); Bopomofo, kanji and kana done, many scripts' flagged letters redrawn. Open: 23 known failures in the stroke-check baseline, the per-script audits, and a human review of the Syriac draft.*
- [ ] #189 Make character sets as complete as possible. *Syriac Estrangela added (data #106); open: target sets by public standard and a generated coverage report.*
- [ ] #200 CJK character variants, regional varieties, historical stages and pronunciation choices. *The variety schema is in (data #3, first used by Aramaic). Open: everything else; start with `variants/` from Unihan and Cantonese as the first variety.*

### Phase 2: Vocabulary and grammar

- [ ] #190 Expand vocabulary by level from cited sources. *JLPT, NIKL, CC-CEDICT and wordfreq imports with level and frequency tags are in; open: 22 languages still untagged.*
- [ ] #191 Plan grammar lessons by level for every language. *72-lesson courses for 30 languages and 24-lesson courses for Tibetan and Klingon shipped in data v0.1.4 (#312). Open: the source-limited languages and per-language reviews.*

### Phase 3: References and resources

- [ ] #192 Level tabs for References and Resources, plus a grammar web. *Tabs and grammar web shipped; open: collecting references for every language.*

### Phase 4: Meaning and translation

- [x] #193 Meaning network as a web, with languages compared side by side and no scroll bar stuck at the bottom of the page
- [ ] #194 Translation learner that accepts equivalent phrasings, marked **(alpha)** until its tests pass. *Japanese and Korean pass and lost the label; French, German and Italian added (#319); close-word credit settled (#310). Open: test sets for Chinese and the other full columns, and calling squirrelator for checking.*

### Phase 5: Programming learner

- [ ] #195 Programming learner sections, A–Z view, switches, more languages and a numerical methods track. *Sections, switches, ~20 new courses and the whole numerical methods track are in; C, C++, C#, Delphi, Rust, Go, JavaScript, TypeScript, Java and Bash deepened (#297–#303, #318). Open: deeper content for the other courses, README housekeeping, the Android twin, moving courses to the data repo.*

### Later: Native apps

- [ ] #197 Native apps instead of WebView shells, if feasible. *Decision recorded (#206, #231): Kotlin + Compose Multiplatform. squirrelator's `native/` app is the first Compose app; no LSD app is migrated yet (suggested pilot: SquirrelGo Kana). Replacing anything needs the owner's sign-off.*

### Bugs found in testing

- [ ] #281 Orthodox Bible: the first-open notice is fixed (#317) and the accents label is in (#292); only the optional accented Patriarchal Text is left.
- [x] #284 Translation Learner: close-word credit (zero-score half fixed by #287; no close credit for things, places, names, languages and days, #310)

### Labels

- `roadmap` marks every issue that's part of this plan.
- `alpha` marks a feature that's labeled alpha in the app until its tests pass.

---

## #196 Roadmap: Central data repo (squirrel-lang-data) as a submodule, and a modular framework for every app

Part of the roadmap, #199. This is the foundation track and runs alongside the content work.

### Decision (Nov 4, 2026)

All language content lives in [squirelworks/squirrel-lang-data](https://github.com/squirelworks/squirrel-lang-data). LanguageStudentDesk and squirrelator both pull it in as a git submodule at `data/`, pinned to a **tagged release** (v0.1.3, `b6912a0`, as of 2026-11-05). A full checkout is `git clone --recursive`. Content moves out of LSD one type at a time, as a pair of PRs: the data repo PR merges first, then the LSD PR switches the build to read from `data/` and removes the old copy.

### Goal

One shared set of content files that every SquirrelGo app, Student Desk program and other app pulls from when it's built, inside a framework where work stays modular so changes don't break things.

### Work

- [x] Write a spec (`docs/FRAMEWORK.md`).
- [x] Schema validation and data tests in CI for every content type. (squirrel-lang-data `tools/check_*.py`, run by its Data check workflow)
- [x] Pin moves only to tagged data releases, and the PR guard fails a pin move without the `data-pin` label. (#291; squirrelator#11 does the same check there)
- [ ] Move app-local copies of the data onto the shared source, one content type per PR pair:
  - [x] Language meta and registry (#230, data #4)
  - [x] Vocabulary, grammar and reference cards (#264, data #7, #9, #10)
  - [x] Meaning matrix (#267, data #14)
  - [x] Character tables (#274, data #25)
  - [x] Stroke files and script courses for Alphabets, Kana, Kanji, Bopomofo and Klingon (#289, data #34, #39, #43)
  - [ ] Programming courses and keyword maps (`programming/<id>/` in the data repo)
  - [ ] Variants (`variants/`, with #200)
- [ ] Have the build step for every app pull from the shared source:
  - [x] The Desk launcher and the character apps (`languages/build_registry.py` runs the data repo's generators)
  - [ ] Phrasebook, Dictionary, Orthodox Bible, Programming Student Desk (only where they carry shared content)
  - [ ] Generalize `sync-shared.sh` and `pack-www.gradle` so Gradle reads `data/` directly
- [ ] A CI check that fails when an app carries content that differs from the shared source.
  - [x] Desk data checks cover the Desk and the character apps' generated files (#289)
  - [ ] The remaining apps

### Done when

No app has its own copy of shared content, and CI catches drift and schema errors before a merge.

---

## #198 Roadmap: Content review and testing

Part of the roadmap, #199. This runs alongside everything else.

**Status 2026-11-14:** the automated checks and the review process are in; recorded reviews exist for 9 of 38 languages. Open items below are for the next agent; see `docs/FUTURE-WORK.md` for order.

### Goal

Characters, grammar and vocabulary need a lot of review and testing. Make that systematic.

### Work

- [x] CI data tests for every content type: schema, duplicates, missing translations, level tags, broken references. (squirrel-lang-data `tools/check_*.py`, one per content type)
- [x] Stroke final-frame and stroke-count checks. (#205, the Stroke check workflow)
- [x] A human review checklist for each language, recorded in the language's folder. (squirrel-lang-data `REVIEWING.md` and `languages/<id>/REVIEW.md`, data #59)
- [x] A form for content errors (wrong stroke, wrong meaning, wrong level). (squirrel-lang-data's Content error issue form, data #62)
- [ ] A recorded review for every language (logs exist for Chinese, Russian, French, German, Greek, Korean, Italian, Japanese and Latin):
  - [ ] Every other language; several can share one PR. Suggested first: Arabic, Hindi, Hebrew, Thai.
  - [ ] **Content added after the existing reviews**, which nobody has checked yet: the French, German and Italian meaning-matrix columns and the Latin, Greek and Russian fills (data #105, written for this project), and the Syriac strokes (data #106, a machine draft from Noto Sans Syriac). Add a dated entry to each language's `REVIEW.md`.
- [ ] Tests for each language pair in the translation learner (see #194): Japanese–English (#221) and Korean–English (#228) done; Chinese, French, German, Italian, Latin, Greek and Russian are next.
- [ ] Learner testing passes still to do (the first two passes are in the "Test apps" notes): deep drills in the Grammar, Language, Reference, Resource, Legalese and Programming learners, and the writing pads for the rest of the Alphabets scripts, Syriac included.
- [ ] An emulator smoke test for every SquirrelGo APK before a release draft (today the notes say the APKs weren't smoke-tested on a device).
- [ ] (Idea) Show a plain "not yet reviewed" note for a language with no `REVIEW.md`, driven by the data.

### Done when

Every content PR runs these checks, and each language has a recorded review.

---

## #201 Roadmap: Keep the language menu simple; turn on more in Settings

Part of the roadmap, #199.

**Status 2026-11-14:** the menu, levels, switches and welcome card are done, and the Syriac (Estrangela) alphabet reached SquirrelGo Alphabets and the Character Learner with the data v0.1.5 pin (#319). Open items below are for the next agent; see `docs/FUTURE-WORK.md` for order. **Caveat:** the Syriac strokes are a machine draft from Noto Sans Syriac that passes the automated checks but hasn't been reviewed by a person against a writing primer.

### Problem

The roadmap adds a lot: dialects, historical stages, character forms, pronunciation choices, programming language groups, alpha features. If every option goes into the main menu, the simple "pick a language and start" idea is lost.

### Proposal: a simple menu, with more turned on in Settings

Most of this shipped in #218 (Desk window, Desk browser home and the Android suite menu, as twins).

#### 1. The main menu stays simple

- [x] It lists only standard modern languages, alphabetically, with a search box. (no pins since #215)
- [ ] Each language opens its own page, where varieties, pronunciation and character forms are chosen. (Waits for #200 content; the switches exist but hide nothing yet.)
- [x] A small, dismissible notice says more is available in Settings, and Settings has a "What's in the app" page. (#218)

#### 1b. First-time welcome

- [x] A first-run welcome card suggests **Latin**, **Klingon** and **Aramaic**, each opening that language's path; after dismissal they stay on "What's in the app". (#218)
- [x] The featured list is data (`"featured"` in squirrel-lang-data `features.json`). (data #1)
- [x] A featured language opens from the card whatever level is set.
- [x] A featured language with no content is left off the card. (#262)

#### 2. Settings: one "Show more" level, plus fine-grained switches

| Level | What it adds |
|---|---|
| **Simple** (default) | Standard modern languages and the core learners (alpha features stay visible with their label, per the owner: data #6) |
| **More** | Regional varieties, character-form choices, pronunciation choices |
| **Everything** | Historical stages, reconstructions (labeled) |

- [x] Simple, More and Everything levels, plus a **Customize** section with each switch; changing one shows "Custom". (#218)
- [x] The Programming Learner's older and joke switches live on this Settings page. (#218, #234)

#### 3. One set of feature names everywhere

- [x] Feature switches defined once, in squirrel-lang-data `features.json`, with id, label, description and default level. (data #1, #6; the Desk regenerates `languages/features.js` from it, #273)
- [ ] The SquirrelGo apps, the Programming Student Desk and squirrelator all read that file. (The Desk and the suite menu do; **open:** squirrelator's settings don't yet.)
- [ ] Content is tagged with the feature it needs (`requires: "historical"`), so menus filter themselves. (The Programming Learner does; language content waits for #200.)

#### 4. Rules

- A new feature is **off by default** unless the owner decides otherwise, and shows up first in Customize.
- Nothing should be impossible to find: anything turned off is listed on "What's in the app" with the switch that turns it on.
- The Desk and the phone stay twins, and the setting is remembered between sessions.

### Aramaic (needed for the welcome card)

- [x] `languages/aramaic/` in squirrel-lang-data with the variety model from #200: Biblical and Imperial (square script, sharing Hebrew's data), Classical Syriac, and Neo-Aramaic varieties. (data #5)
- [x] Core vocabulary (data #8), a first grammar (data #11) and reference cards (data #23).
- [ ] The Syriac alphabet (Estrangela, Serto, Madnhaya) with stroke order, right to left, with sources and licenses cited.
  - [x] Data: Estrangela course with letter forms and a drafted stroke order (data #106, shipped in data v0.1.5)
  - [x] SquirrelGo Alphabets and the Character Learner pick it up, with sounds recorded from IPA and a strokecheck set (#319)
  - [ ] **A person reviews the 22 drafted Estrangela strokes** against a published primer, redraws any that are wrong, and logs it in `languages/aramaic/REVIEW.md` in squirrel-lang-data (primer cited in `SOURCES.md`)
  - [ ] Serto and Madnhaya shapes (after the Estrangela review)
- [ ] More grammar, only from published sources (5 lessons and 6 planned today; see #191).
- [x] Desk and phone twins, and Aramaic on the welcome card. (#218, #262)

### Done when

The main menu shows only standard languages by default (done), the notice and "What's in the app" exist (done), the levels and Customize switches work on the Desk and the phone (done), #195 and #200 use these switches instead of their own toggles, and the welcome card features Latin, Klingon and Aramaic (done).

---

## #188 Roadmap: Audit and fix stroke-order animations in every script

Part of the roadmap, #199.

**Status 2026-11-14:** unchanged since 2026-11-05 except that Syriac joined (data #106, #319) with machine-drafted strokes. 23 known failures are still in the baseline. Every open box below is for the next agent; see `docs/FUTURE-WORK.md` for order (Syriac review and the baseline first).

### Problem

Several stroke-order animations don't look like a person writing the character, and some finish as a shape that isn't the character at all.

- **Bopomofo (Zhuyin):** the finished frame of the animation looked nothing like the symbol. (Fixed in #214.)
- **Chinese:** some characters are missing parts. For example, 言 is drawn without the right side of its lower box.
- **Other scripts:** strokes don't always follow the natural native order for that script.

### Goal

Every animated character finishes looking like the real character and is drawn in the order and direction a native writer would use.

Stroke files now live in [squirrel-lang-data](https://github.com/squirelworks/squirrel-lang-data) `strokes/`, and the apps generate their copies from it (#289). Fix strokes there, then bump the pin here.

### Checks

- [x] Automated **final-frame check**: render each character's finished stroke paths and compare them to the glyph in a reference font. Runs in CI (the Stroke check workflow).
- [x] **Stroke-count check** against a reference source for each script. (#205)
- [ ] Clear the known failures listed in `SquirrelGo-Apps/tools/strokecheck/baseline.json` (23 characters, unchanged as of 2026-11-14), removing each from the baseline as it's fixed:
  - [ ] hiragana: う ぐ ぶ ぷ
  - [ ] katakana: ク グ ト ハ
  - [ ] kanji: 九 了 仁 今 八 古 合 含 心 必 斗 比 礼
  - [ ] hangul: ㅇ
  - [ ] tifinagh: ⴰ

### Audit by script

Each box means the script's stroke order and direction were checked against a trustworthy source, not just that the automated checks pass. Several scripts can share one PR.

- [x] Bopomofo (#214)
- [x] Kanji, regenerated from KanjiVG (#209)
- [x] Kana: handakuten circle (#233), example words (data #40), historical ゐ ゑ ヰ ヱ (data #65)
- [ ] Hangul (order of ㅓ ㅕ ㅎ and breaks in ㅅ ㅆ fixed in data #53; full audit still to do)
- [ ] Hanzi, traditional and simplified (言 and the like)
- [ ] Hanja
- [ ] Greek
- [ ] Cyrillic
- [ ] Latin
- [ ] Hebrew (ר redrawn, #250)
- [ ] Arabic (three letters redrawn, #240)
- [ ] Syriac (Estrangela): **machine draft** from Noto Sans Syriac that passes both checks (data #106); needs a person to check all 22 letters against a published primer and log it in `languages/aramaic/REVIEW.md`
- [ ] Devanagari
- [ ] Bengali (এ redrawn, #244)
- [ ] Gurmukhi
- [ ] Gujarati
- [ ] Odia (two letters redrawn, #236)
- [ ] Tamil
- [ ] Telugu
- [ ] Kannada
- [ ] Malayalam (റ redrawn, #248)
- [ ] Sinhala
- [ ] Thai (ษ redrawn, #252)
- [ ] Lao
- [ ] Khmer
- [ ] Burmese (ဝ redrawn, #246)
- [ ] Tibetan (three letters redrawn, #235)
- [ ] Georgian (ო redrawn, #247)
- [ ] Armenian (seven letters redrawn, #227)
- [ ] Ethiopic (ኀ redrawn, #245)
- [ ] Mongolian (checked against an upright glyph, #219)
- [ ] Cherokee (ten letters redrawn, #225)
- [ ] Canadian Syllabics (ᓪ redrawn, #251)
- [ ] Meetei Mayek (five letters redrawn, #238)
- [ ] Tifinagh
- [ ] Klingon (pIqaD)

### Method

- [ ] Regenerate or redraw failing data from a trustworthy source instead of hand-tuning paths. Candidates (check each one's license first): Taiwan Ministry of Education standards for Bopomofo and traditional hanzi, KanjiVG for kanji, Make Me a Hanzi for hanzi, national handwriting primers for other scripts.
- [ ] Keep CJK data tagged by tradition (hanzi, kanji, hanja), because order can differ between them.
- [ ] Have a person spot-check a sample of each script after the automated checks pass, and log it in the language's `REVIEW.md` in squirrel-lang-data.

### Done when

The final-frame and stroke-count checks pass for every character in every script with an empty baseline, and a spot check finds nothing that looks unnatural.

---

## #189 Roadmap: Make character sets as complete as possible

Part of the roadmap, #199.

**Status 2026-11-14:** Syriac Estrangela added (data #106, in the apps since #319). Everything else below is open for the next agent.

### Goal

Make the character sets as complete as possible, for both learning and writing practice, once the stroke audit (#188) has a working check. (It does now: the Stroke check workflow.)

Character tables and strokes live in [squirrel-lang-data](https://github.com/squirelworks/squirrel-lang-data) (`cjk/`, `languages/<id>/characters/`, `strokes/`, `alphabets/`).

### Work

- [ ] Define the target set for each script by a public standard where one exists, and record it in the data repo:
  - [ ] Japanese: the Jōyō kanji (the table has them; check strokes for every one)
  - [ ] Chinese: HSK (simplified) and TOCFL (traditional) lists
  - [ ] Korean: the standard education hanja
  - [ ] Kana, hangul jamo and syllable structure, Bopomofo
  - [ ] Every alphabet's complete letter set, including diacritic and final forms
  - [ ] Syriac (Estrangela, Serto, Madnhaya) for Aramaic (#201)
    - [x] Estrangela: 22 letters with names, romanization, IPA, example nouns and letter forms (data #106, #319). Strokes are a machine draft awaiting human review (#188).
    - [ ] Serto and Madnhaya
- [ ] Report coverage for each script as generated output, not a hardcoded number in the docs.
- [ ] Every added character passes the final-frame and stroke-count checks before it merges.
- [ ] Add readings, meanings and examples from the shared data, without forking it per app.

### Done when

Each script reaches its target set, and every character has stroke data that passes the checks.

---

## #200 Roadmap: CJK character variants, regional varieties, historical stages and pronunciation choices

Part of the roadmap, #199.

### Goal

Cover more than one standard form per language: every form of a CJK character, regional varieties (dialects and related languages), and historical stages. The learner can switch each of these on or off.

Status 2026-11-05: the variety schema is in squirrel-lang-data, and Aramaic is the first language to use it. Nothing else here has started.

### Data (squirrel-lang-data, #196) — do this first

- [x] The schema has a `variety` model with `id`, `parent`, `kind` (standard, regional or historical), `code` (ISO 639-3 or Glottolog), `period`, `scripts` and `romanization`. (squirrel-lang-data#3; first used by Aramaic in #5)
- [ ] Content can be tagged with the varieties it applies to. Shared content isn't duplicated; a variety only overrides what's different from its parent.
- [ ] Character variants are stored as links between characters (`variants/`), not as duplicate entries.

### Character variants (CJK)

- [ ] Hanzi in **traditional and simplified** forms, linked both ways (one simplified character can map to several traditional ones, for example 发 to 發 and 髮). Conversion picks by context and the word list, never by a blind character table, with tests.
- [ ] Regional standard forms: Taiwan, Hong Kong, mainland China, and Japanese **shinjitai and kyūjitai** (学 and 學); Korean hanja forms; other variant and semantic forms (峰 and 峯).
- [ ] Variant tables from Unihan (`kTraditionalVariant`, `kSimplifiedVariant`, `kZVariant`, `kSemanticVariant`) and national standards, cited in `SOURCES.md`.
- [ ] Stroke order tagged by regional standard as well as by tradition (hanzi, kanji, hanja) (#188).

### Regional varieties

Each variety is its own entry with its parent language, a standard code and its own romanization.

- [ ] **Chinese:**
  - [ ] Cantonese (Jyutping), with its own characters such as 冇 and 佢 — the first one to ship
  - [x] Taiwanese Hokkien (already a language with a 72-lesson course)
  - [ ] Hakka (Pha̍k-fa-sṳ)
  - [ ] Wu (Shanghainese)
  - [ ] Min Dong, Gan, Xiang and others
- [ ] **Japonic:** Okinawan (Uchinaaguchi), Amami, Miyako, Yaeyama, Yonaguni, Kunigami
- [ ] **Korean:** South and North norms, Jeju and the regional varieties
- [ ] **Ainu**, as its own language (an isolate, not a Japanese dialect), in katakana with the small-kana extensions and in Latin script
- [x] **Aramaic:** Biblical/Imperial, Classical Syriac and Neo-Aramaic varieties (data #5)
- [ ] Other languages' regional varieties as data allows

### Historical stages

Each stage is an entry with its time period and parent language.

- [ ] **Greek:** Ancient (Attic, Homeric, Koine) with polytonic spelling, and Byzantine
- [ ] **Latin:** Old, Classical, Late and Medieval, and Ecclesiastical
- [ ] **English:** Old English (þ, ð, ƿ), Middle English, Early Modern English
- [ ] **Japanese:** Old, Classical (bungo) and Early Modern, with historical kana spelling and hentaigana where possible (the historical kana ゐ ゑ ヰ ヱ are taught since data #65)
- [ ] **Korean:** Middle Korean, with the obsolete letters (ㆍ, ㅿ, ㆆ, ㅸ) and hanmun
- [ ] **Chinese:** Classical (Literary) Chinese, plus Middle and Old Chinese as **reconstructions**, labeled as reconstructed, citing the reconstruction
- [ ] Others over time (Old Norse, Sanskrit and Middle Indic, Biblical and Mishnaic Hebrew, etc.)

### Pronunciation choices

A pronunciation is a setting on the language, not a separate language.

- [ ] **Latin:** **Classical** (restored; W. Sidney Allen, *Vox Latina*: *Cicero* "KIK-eh-roh", *v* as English *w*, *ae* as "eye") and **Ecclesiastical** (Italianate: "CHEE-cheh-roh", *v* as *v*, *ae* as "eh"). Sound guides, romanization notes and speech follow the setting; where the two differ, the learner can see both.
- [ ] **Ancient Greek:** **restored** (Allen, *Vox Graeca*), **Erasmian** and **modern Greek**
- [ ] The same model for others later (Biblical Hebrew Tiberian or modern; Sanskrit regional readings)
- [ ] Every pronunciation setting cites its sources in `SOURCES.md`

### Learner controls (Desk and phone as twins)

The switches live in Settings, as described in #201, not in the main menu. `features.json` already defines them.

- [ ] Standard languages by default, with separate switches for **regional varieties** and **historical stages**, both off by default
- [ ] Inside a language, a variety selector filters everything to that variety: characters (including the variant set), vocabulary, grammar, references and stroke order
- [ ] Characters show an "also written as" line listing their other forms
- [ ] Lists stay alphabetical with no pins; each variety sorts under its parent

### Done when

The schema supports varieties (done), traditional and simplified conversion works with tests, the switches work on the Desk and the phone, and at least one regional variety (Cantonese) and one historical stage (Classical Latin or Ancient Greek) are live in their own folders.

---

## #190 Roadmap: Expand vocabulary by level from cited sources

Part of the roadmap, #199.

### Goal

Grow the vocabulary of every language, organized by level, while keeping it to words people actually use.

Vocabulary lives in [squirrel-lang-data](https://github.com/squirelworks/squirrel-lang-data) `languages/<id>/vocab.jsonl`. Imports come from a script in its `tools/`, with the source and license in `SOURCES.md`.

### Sources (confirm the license and give attribution before importing any of them)

- [Tanos](https://www.tanos.co.uk/) for the JLPT vocabulary lists (N5 to N1) and the HSK lists.
- Wiktionary frequency lists and vocabulary appendices for each language.
- Official or widely used level lists: TOCFL, TOPIK, CEFR word lists, and similar lists for the others.
- Others as we find them, recorded in each language's `reference.json`.

### Work

- [ ] An import tool for each source that writes the shared format, so nobody hand-pastes data:
  - [x] Japanese: JLPT N5 to N1 (data #13)
  - [x] Korean: NIKL Basic Korean Dictionary graded words (data #15)
  - [x] Chinese: most frequent words with CC-CEDICT pinyin and meanings (data #17); HSK levels placed by hand, not guessed from frequency (data #46, #48)
  - [ ] The other languages (none yet)
- [ ] Triage by frequency (core, common or rare), shown core and common first:
  - [x] wordfreq tags for 11 more languages (data #33)
  - [ ] The 22 languages wordfreq doesn't cover stay untagged until another source is found
- [ ] Remove duplicates and check for conflicts against the existing data.
- [ ] Tag every word with its level (JLPT, HSK, CEFR, etc.) so the level tabs can filter by it. (Japanese, Korean and Chinese done.)
- [x] Schema and data tests in CI. (data `tools/check_*.py`)
- [x] Vocabulary cards linked to meaning units (data #27, #31; used by the learners in #279).

### Done when

Every language has level-tagged vocabulary from a cited source, and the CI data tests pass.

---

## #191 Roadmap: Plan grammar lessons by level for every language

Part of the roadmap, #199.

**Status 2026-11-14:** the 72-lesson courses shipped (data v0.1.4, pinned here by #312 and in squirrelator by squirelworks/squirrelator#41). Open: the source-limited languages and per-language reviews, for the next agent.

### Goal

Grammar lessons for every language are planned by level, the way Taiwanese and Korean already are.

Grammar courses live in [squirrel-lang-data](https://github.com/squirelworks/squirrel-lang-data) `languages/<id>/grammar.json` (`grammar@1`). The Desk generates its files from the pinned data, so new lessons reach the apps with the next data tag and pin bump.

### Work

- [x] Use the [Tanos](https://www.tanos.co.uk/) JLPT grammar lists to plan the Japanese lessons from N5 to N1. (squirrel-lang-data#16)
- [x] Level systems for the big languages: Chinese HSK (data #21), Korean TOPIK (data #19), CEFR for French, German, Italian, Greek and Russian (data #30), with quoted level cards (data #18, #20, #22).
- [x] Every grammar section has the level selector used for Taiwanese and Korean. (#217)
- [x] Level labels agree with the CEFR estimate. (data #93)
- [x] Every language with good sources has a full course, **72 lessons, A1 to C1** (24 for Tibetan and Klingon), one language per data PR:
  - [x] Amharic (data #94)
  - [x] Arabic (data #74)
  - [x] Armenian (data #92)
  - [x] Bengali (data #76)
  - [x] Burmese (data #87)
  - [x] Chinese (data #66)
  - [x] French (data #69)
  - [x] Georgian (data #91)
  - [x] German (data #70)
  - [x] Greek (data #73)
  - [x] Gujarati (data #83)
  - [x] Hebrew (data #77)
  - [x] Hindi (data #75)
  - [x] Italian (data #71)
  - [x] Japanese, 73 lessons with 42 smaller points still on the plan list (data #68)
  - [x] Kannada (data #81)
  - [x] Khmer (data #88)
  - [x] Klingon, 10 → 24 (data #98)
  - [x] Korean (already 72; 16 stub lessons rewritten in data #52)
  - [x] Lao (data #89)
  - [x] Latin (data #95)
  - [x] Malayalam (data #82)
  - [x] Mongolian (data #90)
  - [x] Odia (data #85)
  - [x] Punjabi (data #84)
  - [x] Russian (data #72)
  - [x] Sinhala (data #86)
  - [x] Taiwanese (already 72)
  - [x] Tamil (data #79)
  - [x] Telugu (data #80)
  - [x] Thai (data #78)
  - [x] Tibetan, 6 → 24 (data #97)
- [ ] Source-limited languages, only from published grammars, cited in the file, never invented forms:
  - [ ] Aramaic (5 lessons, 6 planned)
  - [ ] Cherokee (12)
  - [ ] Inuktitut (12)
  - [ ] Manipuri (6)
  - [ ] Tamazight (12)
- [x] Ship the new courses to the apps: data v0.1.4 tag (published 2026-11-05), then the pin bumps in LanguageStudentDesk (#312) and squirrelator (squirelworks/squirrelator#41).
- [ ] Review and test each language's grammar, logged in its `REVIEW.md` (see squirrel-lang-data `REVIEWING.md`). Several languages can share one PR.
- [ ] Japanese: the 42 smaller points still on the plan list.

English has no grammar course on purpose: it's the base language.

### Done when

Every language has grammar grouped by level with no empty levels, or the missing levels are marked plainly as planned.

---

## #192 Roadmap: References and Resources by level, plus a grammar web

Part of the roadmap, #199.

### Goal

Make references and resources easy to find for each language and level.

### Work

- [ ] Collect references and resources for each language, as many as possible, in that language's `reference.json` (now in [squirrel-lang-data](https://github.com/squirelworks/squirrel-lang-data)).
  - [x] Level cards quoting the official scales: JLPT (data #18), TOPIK (data #20), HSK (data #22), CEFR for French, German, Italian, Greek and Russian (data #30)
  - [x] Aramaic reference cards (data #23)
  - [ ] Every other language
- [x] Add a **level tab bar** to References and Resources that works the same way as the level selector in the grammar lessons. (#210)
- [x] Add a **grammar web**: a visual graph of grammar points linked by level and topic. (#222)
- [x] Mark points we haven't written yet plainly in the web. (#222: planned points show "Not written yet")
- [x] Keep the Desk and phone versions twins. (the Android Desk app packs the same learners at build time)

### Done when

Each language's references and resources can be filtered by level, and the grammar web shows every point, including the ones not written yet.

---

## #194 Roadmap: Translation learner that accepts equivalent phrasings, alpha until then

Part of the roadmap, #199.

**Status 2026-11-14:** French, German and Italian are in the Translation Learner (#319), and the close-word question is settled (#310). Open items below are for the next agent; see `docs/FUTURE-WORK.md` for order.

### Problem

The translation learner accepted too few answers. Japanese often leaves out parts of speech, so one sentence has several correct English versions. For example, バスで学校に行きます can be "I take the bus to school", "I'm going to school by bus" or "took a bus to school". The same problem shows up between any pair of languages.

### Goal

A simple, predictable translation checker built on the meaning network. Any pair without passing tests stays marked **(alpha)**.

### Work

- [x] Mark the translation learner **(alpha)** now, until the steps below are finished. (#207)
- [x] Store **sets of equivalent phrasings** for each sentence, attached to shared meaning units, not single strings. (#221)
- [x] Add rules for dropped words: omitted subjects and pronouns, tense and aspect the source leaves open, optional particles and articles, and word-order variants. (#221)
- [x] Check answers by matching the meaning units and the required parts, with clear feedback about what was missing or wrong. No free-form machine translation. (#221)
- [x] An added phrase no longer zeroes the meaning score. (#287, from #284)
- [x] Close-word credit: things, places, names, languages and days take no close credit ("dinner" for "lunch" scores like any other wrong word); other near-synonyms keep partial credit. (#310, closed #284)
- [x] French, German and Italian columns in the learner, with a content meaning shared by two tokens (ne … pas) counted once. (#319, data v0.1.5)
- [ ] Tests for each language pair, with accepted and rejected answers:
  - [x] Japanese–English (#221)
  - [x] Korean–English (#228)
  - [ ] Chinese–English (the data's Chinese column renders every matrix row) — **do first**
  - [ ] French–English, German–English, Italian–English (full columns since data v0.1.5)
  - [ ] Latin–English, Greek–English, Russian–English (filled to every row in data v0.1.5)
  - [ ] Every other column in the meaning matrix, as it fills
- [ ] Remove the "(alpha)" label only for pairs that pass their tests. (Done for Japanese and Korean, #229, #241; `translation-learner/data/tested.js` lists them.)
- [ ] Use squirrelator's engine for checking and alternatives once its generated coverage report shows the pair is reliable (squirelworks/squirrelator#26), with a PR in each repo naming the other.

### Done when

Each supported language pair accepts every natural phrasing in its test set and rejects the wrong ones. Any pair that doesn't pass yet is labeled "(alpha)".

---

## #195 Roadmap: Programming learner sections (modern, older, joke), alphabetical view, more languages and a numerical methods track

Part of the roadmap, #199.

### Goal

Keep adding programming languages and content, and lay the list out so a typical learner sees the popular, current languages first.

### Default view: categorized

The list is grouped into sections in this order:

1. **Modern and popular.** Current, widely used languages: BASIC (Visual Basic and QuickBASIC lineages), C, C++, C#, modern Delphi, Python, Rust, Go, JavaScript and others like them. Alphabetical inside the section; nothing is pinned.
2. **Older and legacy.** Older versions and long-lived languages still in use: Delphi 7 and earlier, Borland and Turbo Pascal, QuickBASIC and classic BASIC, COBOL, Fortran, Win16 and Z80 assembly. A modern version of a language sits in section 1 and its older versions here.
3. **Joke and esoteric.** brainFOOD, INTERCAL, LOLCODE, Malbolge, Piet, Whitespace and similar.

Each language in the first two sections also gets a category tag (such as **Compiled programs** or **Web**), and the learner can filter by tag.

- [x] Categorized default, alphabetical inside each section, tag filter (#208)

### Options

- [x] **Alphabetical view** of every language (#208)
- [x] **Show older languages** and **show joke languages** switches, both on by default, in Settings with the others (#201, #234)
- [x] Choices remembered between sessions, Desk and phone the same

### Content

- [x] More modern languages: C++, C#, JavaScript, HTML and CSS, PHP, Perl, Java, Kotlin, Swift, TypeScript, SQL, Bash, Visual Basic (.NET) and modern Delphi. (#243, #259, #239, #261, #253, #255, #249, #277, #280, #257, #258, #256, #272, #224)
- [x] More older languages: COBOL (#216), Fortran (#220), Turbo Pascal (#237), classic BASIC (#260).
- [ ] More content for every language: syntax, concepts, practice and small projects.
  - [x] C (#297), C++ (#298), C# (#299), modern Delphi (#300), Rust (#301), Go (#302), JavaScript (#303)
  - [x] TypeScript, Java and Bash (#318)
  - [ ] Every other course
- [x] brainFOOD name note (#212)

### Numerical methods track (based on Numerical Recipes)

- [x] An advanced, cross-language track on the topics in *Numerical Recipes*, each with tests against known results:
  - [x] Root finding (#226)
  - [x] Integration (#275)
  - [x] Linear systems (#276)
  - [x] Interpolation (#285)
  - [x] ODEs (#288)
  - [x] Minimization (#293)
  - [x] Random numbers, eigenvalues and the FFT (#296)
- [x] Every explanation and every piece of code is our own. *Numerical Recipes* is cited as further reading only.
- [x] Each implementation has tests against known results, so the versions in different languages agree.

### Housekeeping

- [ ] Keep the READMEs free of hardcoded counts and language lists (sweep `programming-learner/README.md` and the root README).
- [ ] Keep the Programming Student Desk Android app a twin of the desktop version.
- [ ] Move the courses to squirrel-lang-data `programming/<id>/` (#196), so squirrelator's code generators can share the keyword maps.

### Done when

The categorized default, the alphabetical view and both switches work on the Desk and the phone (done), every joke language sits in its own section (done), the brainFOOD note is shown (done), the numerical methods track has tests in at least two languages (done), and every course has practice and a small project.

---

## #197 Roadmap: Native apps instead of WebView shells, if feasible

Part of the roadmap, #199. This depends on the shared-content framework (#196).

### Goal

If it's feasible, stop shipping apps that are only web pages inside a WebView. Build them as real programs, while keeping the Desk and phone apps twins.

### Work

- [x] Run a short spike to compare options against our constraints (offline use, shared content, Android plus desktop, one codebase if possible). (#206)
- [x] Write a decision record: Kotlin with Compose Multiplatform, Android and desktop as two builds of the same code. (`docs/decisions/0001-native-apps.md`, #206, #231)
- [ ] Build one pilot app natively, reading only the shared content.
  - [x] squirrelator's `native/` translate screen is the first Compose app on this plan, with a hand-started test APK workflow (squirelworks/squirrelator#31, #33, #34)
  - [ ] An LSD pilot
- [ ] Migrate the rest app by app, keeping each one shippable at every step.

**On hold until the owner signs off:** removing or replacing any existing WebView app or the Tk Desk.

### Done when

A decision is recorded (done), and the pilot app ships natively from the shared content with feature parity.

---

## #281 SquirrelGo Orthodox Bible: first-open notice, and the Patriarchal Text shows without accents

Found while testing the apps as a learner (web build served from the Desk, main 3d425a5).

- [x] **The first screen opens with a fallback notice.** The app opens at John 1, but the default main text is Brenton's Septuagint, which has no New Testament. Fixed in #317: a book the main text lacks is read in the text that contains it, without the notice; the column and language chip still name the text.
- [x] **The Patriarchal Text has no accents or breathings, and the app didn't say so.** Fixed in #292: the text picker now calls it an unaccented transcription.
- [ ] (Optional, later) Switch to an accented public-domain Patriarchal Text if one exists.

Everything else walked through works: reading, the calendar, translations, search, saved verses and the suite menu, with no console errors.

---

## #284 Translation Learner (alpha): adding words scores 0% while a wrong noun scores 87% (closed)

Found while testing the apps as a learner. I used Japanese, "Into English", with the sentence レストランで昼ご飯を食べます。

What works well: "I eat lunch at a restaurant.", "I have lunch at a restaurant.", "I'll eat lunch at the restaurant." and "At a restaurant I eat lunch." are all accepted as every meaning carried over.

- [x] **An added phrase zeroed the score.** "I eat lunch at a restaurant with my friend." scored **0%**. Fixed in #287: added words now join the total, so it scores 50%.
- [x] **A wrong noun scores 87%.** "I eat dinner at a restaurant." swaps the meaning of a main word and still scored **87%**, shown as a "close word", because the meaning network rates *dinner* close to *lunch*. The owner chose "no credit for things and places". Fixed in #310: close words for things, places, names, languages and days (`translation-learner/data/exact.js`) are still shown as close but earn no credit, so it now scores 50%, the same as "train" for bus. Close words for people, actions and descriptions keep partial credit.
- [x] ~~The alpha label disappears inside the page.~~ Not a bug: Japanese and Korean are in `data/tested.js`, so the page correctly drops their label.
