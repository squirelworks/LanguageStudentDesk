# LSD recursive expansion — laundry list for Claude

Operating brief for agents expanding **Language Student Desk** and the **SquirrelGo** suite. Recurse on documented seams; prefer shared data over new shells.

**Doctrine in one line:** one seam per turn · share, don’t fork · data before shells · Desk↔phone twins · no implementation notes in the UI.

---

## How to recurse

1. Start at **Wave 1**.
2. For each item: branch → implement along the named seam → smoke on the Desk local server (`http://127.0.0.1`, not `file://`) → UPDATES/README if user-visible → PR.
3. When a wave is empty, descend into **Wave 3** content factories and repeat forever on packs / scripts / lessons.

### Definition of done (one recursive step)

- User can open Desk → hit the changed tool over `http://127.0.0.1`
- Reader-facing UI has **no** implementation notes
- Shared data stays single-sourced
- APK / workflow / suite updated if an Android app moved
- Short PR description naming the seam

---

## Doctrine

| Rule | Meaning |
|------|---------|
| **One seam per turn** | Pick one documented expansion seam (grammar pack, script file, suite sync, stroke reuse). Ship it end-to-end before starting another. |
| **Share, don’t fork** | Prefer loading SquirrelGo `www/data` from Character Learner / Desk tools over copying megabytes. One KanjiVG blob, one pIqaD stroke table, one `suite.js`. |
| **Data first, shell second** | Grow Phrasebook packs, Alphabets scripts, `grammar/*.js`, `languages/*/meta.json`, Orthodox packs. New APK shells only when a product line truly needs its own WebView. |
| **Desk + phone stay twins** | Anything that lands in a SquirrelGo app should remain reachable from the Desk (relative path or deep link). Anything Desk teaches should not strand Android without a home. |
| **Reader-facing copy only** | No “(always shown)”, no “still to come” in UI chrome, no implementation notes in headings. Developer intent belongs in README/UPDATES. |
| **Verify on the Desk server** | Open via `LanguageStudentDesk` local HTTP. Smoke relative shared paths. Screenshot or record when the change is visual. |

---

## Wave 1 — Close the twins

| ID | Do this | Why | Seam |
|----|---------|-----|------|
| **W1.1** | Reuse SquirrelGo Klingon strokes + checked write pad in Desk `klingon/` and Character Learner pIqaD | Kanji already shares KanjiVG; pIqaD still freehands in Desk while the APK draws strokes | `character-learner` + `klingon/` ← `squirrelgo-klingon/www` |
| **W1.2** | Wire `suite.js` into SquirrelGo Klingon and Orthodox (`sync-shared.sh` + `APPS` already list them) | Cross-app sheet is dead inside those two APKs today | `SquirrelGo-Apps/shared` + `sync-shared.sh` |
| **W1.3** | Align Resource Learner lang ids (`korean` vs `hangul`) and replace placeholder Hindi/Cyrillic panels | `?lang=` from Desk must open the right panel; placeholders read as unfinished product | `resource-learner/index.html` + `languages/` |
| **W1.4** | Finish Language Learner alphabet paths: grammar “still to come” → real grammar packs | Paths already stitch tools; missing grammar packs break the guided loop | `grammar-learner/data/<id>.js` + `language-learner/paths.js` |

---

## Wave 2 — Fill every language seam

| ID | Do this | Why | Seam |
|----|---------|-----|------|
| **W2.1** | Grammar packs for hangul, arabic, cyrillic, hindi (and chinese when Hanzi path exists) | Only `japanese.js` + `klingon.js` exist; `FILES` pattern is ready | `grammar-learner/data` + `app.js` `FILES` |
| **W2.2** | Grow vocabulary-learner desk decks + run dictionary fetch where JMDict decks are expected | Chinese/Klingon are thin; dictionary decks need generated data | `vocabulary-learner/decks` + squirrelgo-dictionary `fetch_data.sh` |
| **W2.3** | Reference Learner: stop being ~11 hard-coded cards — load from `languages/` or structured JSON | Footer already says expand; make it data-driven once | `reference-learner` + `languages/` |
| **W2.4** | `languages/<id>/meta.json` for every Desk language, rebuild registry, consume from all `?lang=` tools | README marks `languages/` as the shared future layer — make it true | `languages/` + `build_registry.py` |
| **W2.5** | Character Learner: stroke/detail depth for non-kanji scripts where SG already has data | Detail overlay exists; only kanji mounts `StrokeOrder` today | `character-learner/scripts` + SG `www/data` |

---

## Wave 3 — Content factories (recurse on data)

| ID | Do this | Why | Seam |
|----|---------|-----|------|
| **W3.1** | Phrasebook: add packs by editing `packs.js` tuples — no new shell | Highest Japanese content leverage per line changed | `squirrelgo-phrasebook/www/data/packs.js` |
| **W3.2** | Alphabets: add scripts with the documented `SG_SCRIPTS` push pattern | README already teaches “Adding a script” | `squirrelgo-alphabets/www/data/<script>.js` |
| **W3.3** | Orthodox Bible: grow catalog/books/commentary via existing pack + text workflows | CI already exists for large generated packs; don’t invent a parallel pipeline | `squirrelgo-orthodox-bible/tools` + workflows |
| **W3.4** | Kanji curriculum: deepen Lessons/Topics from shared catalog; Character Learner keeps loading the same files | Parity is done; depth is the next recursion | `squirrelgo-kanji/www/data` + `js/lessons.js` |
| **W3.5** | Kana: richer row lessons / audio; keep Desk hiragana/katakana conceptually twin | Same twin rule as kanji | `squirrelgo-kana/www/data` |

---

## Wave 4 — Productize the scaffolds

| ID | Do this | Why | Seam |
|----|---------|-----|------|
| **W4.1** | Programming Learner: define a schema, ship one real language pack (Python is already in `EXTRA_LANGS`) | README admits scaffold; stop shipping empty panels | `programming-learner/` |
| **W4.2** | Translation Learner: wire real squirrelator or rename/scope the toy matcher honestly | Today it pretends to be Squirrelator with print/loop demos | `translation-learner/` ↔ external squirrelator |
| **W4.3** | New Desk micro-app only when `scan_tools` + `TOOLS` + README + `?lang=` story are clear | Folder-with-`index.html` is cheap; product quality is not | `LanguageStudentDesk.py` `TOOLS` + root folder |
| **W4.4** | New SquirrelGo APK only with `www/`, `android/`, workflow, `TOOLS` APK meta, `suite.js`, `sync-shared.sh`, SuiteBridge | Half-wired apps create dead suite entries (see Klingon/Orthodox) | `shared/README.md` checklist |

---

## Wave 5 — Recursive polish loop

| ID | Do this | Why | Seam |
|----|---------|-----|------|
| **W5.1** | Desk GUI: metrics-based Treeview rows; window ~88% screen; no Segoe-only fonts | Linux/HiDPI already bit us once | `LanguageStudentDesk.py` |
| **W5.2** | Strip reader-facing implementation notes wherever they reappear | Resource Learner “(always shown)” pattern will recur if unchecked | any `index.html` copy |
| **W5.3** | After each content wave: `UPDATES.md` + root README; confirm APK path filters still fire CI | Rolling releases are the phone distribution story | `README` + `.github/workflows` |
| **W5.4** | When stuck, deepen an existing seam instead of inventing a parallel trainer | Desk Klingon vs SG Klingon duplication is the anti-pattern to stop repeating | architecture judgment |

---

## Expansion seams (recipes)

If the work doesn’t fit a row below, you’re probably inventing a parallel product — stop and reuse a twin instead.

| Kind | Recipe |
|------|--------|
| New Desk language | `languages/<id>/meta.json` → `build_registry.py` → wire `?lang=` consumers |
| Character Learner script | `scripts/<id>.js` + script tag + `LANG_SCRIPTS` |
| SG Alphabets script | `www/data/<id>.js` pushes `SG_SCRIPTS` + index script tag |
| Grammar pack | `grammar-learner/data/<id>.js` + `FILES` in `app.js` |
| Vocab source | `decks/<id>.js` + `VOCAB_SOURCES`, or SG data via `sources.js` |
| Language path | `language-learner/paths.js` (`alphabetPath` or Japanese/Klingon stage shape) |
| Phrase pack | phrasebook `www/data/packs.js` tuples |
| Orthodox text | catalog + pack/text workflows under orthodox `tools/` |
| New SG app | folder + `TOOLS` + APK workflow + `suite.js` + `sync-shared.sh` |
| New Desk tool | root `index.html` (+ `TOOLS` metadata for title/group/scoped/APK) |

---

## Hard don’ts

- Don’t pirate discontinued APKs or scrape paid content — rebuild with open data (KanjiVG, JMdict, public-domain texts).
- Don’t CDN-depend stroke engines when offline KanjiVG/pIqaD data already lives in-repo.
- Don’t leave `suite.js` / `sync-shared.sh` half-updated when adding an app.
- Don’t ship UI labels that describe visibility rules or unfinished work.
- Don’t open PRs that only rename without moving a seam forward.

---

## Before inventing new patterns

Re-read:

- `LanguageStudentDesk.py` (`TOOLS`, discovery, local server)
- `languages/README.md`
- `SquirrelGo-Apps/shared/README.md`
- `character-learner/README.md` / `UPDATES.md` (shared KanjiVG precedent)

Grounded in repo layout as of the Character Learner ↔ SquirrelGo Kanji stroke share, Desk Treeview/window fixes, and Resource Learner copy cleanup.
