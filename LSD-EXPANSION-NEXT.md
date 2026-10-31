# LSD recursive expansion — next laundry list for Claude

Follow-up to `LSD-EXPANSION.md`. Same doctrine. Recurse on remaining seams.

**Doctrine in one line:** one seam per turn · share, don’t fork · data before shells · Desk↔phone twins · no implementation notes in the UI.

---

## What already landed (do not redo)

- W1.1 Klingon strokes shared into Desk + Character Learner
- W1.3 Resource Learner matches `languages/` ids; Hindi and Russian panels filled
- Alphabets suite: Latin, Greek, Armenian, Georgian, Hebrew, Ethiopic, Cherokee, Inuktitut, Mongolian, Thai, Lao, Khmer, Tibetan, Bengali, Gurmukhi, Gujarati, Tamil, Telugu, Kannada, Malayalam, Sinhala (25 scripts)
- Phrasebook: nine everyday packs + Culture & Etiquette + Health & Pharmacy
- Vocabulary Learner: Chinese/Klingon grown; Korean, Russian, Arabic, Hindi added
- Grammar packs: Korean, Arabic, Russian, Hindi wired into alphabet paths
- Translation Learner: meaning matrix, top-1,000 banks, ConceptNet, Tatoeba/Wiktionary workflow
- Orthodox Bible: full public-domain texts, patristic packs, Russian Fathers, Greek/Latin originals
- Desk launcher: local server, grouped tools, APK links, 88% window
- APKs publish to rolling GitHub Releases (no committed APKs)
- Character Learner: stroke animations + writing pad for all SquirrelGo scripts
- Reference Learner loads from `languages/`

---

## How to recurse

1. Start at **Wave 6**.
2. For each item: branch → implement along the named seam → smoke on the Desk local server (`http://127.0.0.1`, not `file://`) → UPDATES/README if user-visible → PR.
3. When a wave is empty, descend into **Wave 9** content factories and repeat on packs / scripts / lessons / commentary.

### Definition of done (one recursive step)

- User can open Desk → hit the changed tool over `http://127.0.0.1`
- Reader-facing UI has **no** implementation notes
- Shared data stays single-sourced
- APK / workflow / suite updated if an Android app moved
- Short PR description naming the seam

---

## Wave 6 — Finish the twins

| ID | Do this | Why | Seam |
|----|---------|-----|------|
| **W6.1** | Sync remaining SquirrelGo stroke/writepad changes back into Desk Character Learner and Klingon after each Alphabets batch | Alphabets keeps gaining scripts; Desk copies drift | `character-learner` + `klingon/` ← `squirrelgo-alphabets/www` |
| **W6.2** | Make sure every SquirrelGo app listed in `suite.js` is reachable from the Desk launcher with the correct group and APK link | Suite sheet and Desk TOOLS have drifted before | `LanguageStudentDesk.py` TOOLS + `shared/suite.js` |
| **W6.3** | Confirm `sync-shared.sh --check` passes after every suite change | Half-updated suite.js has broken CI before | `SquirrelGo-Apps/tools/sync-shared.sh` |

---

## Wave 7 — Language coverage

| ID | Do this | Why | Seam |
|----|---------|-----|------|
| **W7.1** | Add `languages/<id>/meta.json` for every Alphabets script that still lacks one (Greek, Armenian, Georgian, etc.) | Desk tools can't scope to a language without meta | `languages/` + `build_registry.py` |
| **W7.2** | Grammar packs for Japanese (beyond current), Chinese, Latin, and Klingon | Grammar Learner is thin outside the four recent packs | `grammar-learner/data/` |
| **W7.3** | Vocabulary decks for the remaining Desk languages (Latin, Greek, etc.) | Vocab Learner only covers a subset | `vocabulary-learner/decks/` |
| **W7.4** | Language Learner paths for every language that has both an alphabet and a vocab/grammar pack | Paths are the glue; several languages still have no path | `language-learner/paths.js` |

---

## Wave 8 — Orthodox and Phrasebook depth

| ID | Do this | Why | Seam |
|----|---------|-----|------|
| **W8.1** | More patristic commentary packs (remaining public-domain Fathers, more books) | Commentary is the differentiator; keep growing it | orthodox `tools/` + `www/data/commentary/` |
| **W8.2** | Additional downloadable Bible text packs (more languages, better versification checks) | 55 packs landed; more public-domain texts exist | orthodox text workflows |
| **W8.3** | Phrasebook: more domain packs (business, medical deeper, military remaining topics, kids) | Everyday packs are in; specialized domains are thin | `squirrelgo-phrasebook/www/data/packs.js` |
| **W8.4** | Phrasebook audio coverage check: every phrase has a clip | Some packs may still be silent | phrasebook audio tools |

---

## Wave 9 — Content factories (repeat forever)

| ID | Do this | Why | Seam |
|----|---------|-----|------|
| **W9.1** | Next Alphabets batch: remaining major scripts (e.g. Amharic already in, next: Burmese, Malayalam done, next candidates: Oriya, Meetei Mayek, Tifinagh, Canadian Aboriginal variants) | Script coverage is the product | `squirrelgo-alphabets/www/data/` |
| **W9.2** | Hand-fix stroke orders that strokegen got wrong (Georgian, Armenian, Thai tones, etc.) | Machine drafts need human passes | `strokegen/overrides/` |
| **W9.3** | Translation Learner: more corpora, better near-miss scoring, export practice sets | Network is trained; keep feeding it | `translation-learner/tools/` |
| **W9.4** | Programming Learner: courses beyond Python (the scaffolded esolangs and Z80) | Only Python is real so far | `programming-learner/` |
| **W9.5** | Reference Learner: more card sets from `languages/` and SquirrelGo data | Cards are thin outside the first rounds | `reference-learner/` + `languages/` |

---

## Wave 10 — Polish and guardrails

| ID | Do this | Why | Seam |
|----|---------|-----|------|
| **W10.1** | After every content wave: update root README and any app README; confirm APK workflows still fire | Rolling releases are the phone distribution story | `README` + `.github/workflows` |
| **W10.2** | Strip any reader-facing implementation notes that reappear | The “(always shown)” pattern recurs | any `index.html` copy |
| **W10.3** | Keep the Desk window sizing and Linux row-height fixes intact | They’ve been regressed before | `LanguageStudentDesk.py` |
| **W10.4** | When stuck, deepen an existing seam instead of inventing a parallel trainer | Desk vs SG duplication is the anti-pattern | architecture judgment |

---

## Expansion seams (recipes)

Same as `LSD-EXPANSION.md`. If it doesn’t fit a row there, you’re probably inventing a parallel product.

---

## Hard don’ts

- Don’t pirate discontinued APKs or scrape paid content.
- Don’t CDN-depend stroke engines when offline data already lives in-repo.
- Don’t leave `suite.js` / `sync-shared.sh` half-updated.
- Don’t ship UI labels that describe visibility rules or unfinished work.
- Don’t open PRs that only rename without moving a seam forward.
- Don’t re-commit APKs; they go to Releases.

---

## Before inventing new patterns

Re-read:

- `LanguageStudentDesk.py` (`TOOLS`, discovery, local server)
- `languages/README.md`
- `SquirrelGo-Apps/shared/README.md`
- `LSD-EXPANSION.md` (original seams)

Grounded in repo layout as of the 25-script Alphabets suite, Translation Learner corpora workflow, Orthodox Russian Fathers packs, and Phrasebook everyday packs.
