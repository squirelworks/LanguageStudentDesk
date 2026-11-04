# Release plan

When the next platform release is due, and what it waits for. The rules for
every release are in `RELEASES.md`: Claude prepares a **draft**, the owner
clicks **Publish**, tags are never moved or reused, releases are never deleted,
and AABs never go to GitHub.

## Next: squirrelgo-v0.1.0

The first release built against a frozen squirrel-lang-data release, so the
apps can be tested for usability and accuracy on content that doesn't move.
Following `RELEASES.md`, the tag is `squirrelgo-v0.1.0` (MINOR, because it
adds languages, learners and courses since v0.0.5).

It's due when all of these are on `main` and CI is green there:

- [ ] **squirrel-lang-data v0.1.0 is published** (see that repo's
      `RELEASE_PLAN.md`), and a one-seam PR here moves `data/` to its commit.
- [ ] The LanguageStudentDesk side of any data move that landed in data
      v0.1.0 (for example the meaning matrix, squirrel-lang-data #14), so the
      apps read that content from `data/`.
- [ ] The Programming Learner courses open now are merged or deliberately
      left out: C++ (#243), Java (#249), PHP (#253), Perl (#255), Bash (#256),
      TypeScript (#257), SQL (#258), C# (#259), classic BASIC (#260),
      HTML and CSS (#261).
- [ ] The hand-started release workflow (`squirrelgo-release.yml`) is on
      `main`.
- [ ] A release PR raises every app's `versionCode` and `versionName` and adds
      `release-notes/squirrelgo-v0.1.0.md`, with nothing else in it.

PRs opened after this list was written don't hold the release back; they go
into the next one. Stroke redraws, grammar and reference work keep landing on
`main` as usual.

Already on `main` since v0.0.5, and so in this release: the registry built
from squirrel-lang-data (#230), the simple menu with Settings levels (#218),
level tabs for grammar, References and Resources (#210, #217), the grammar web
(#222), the meaning matrix side by side and the meaning web (#211, #213), the
Translation Learner accepting equivalent phrasings (#221, #228, #229, #241),
the Programming Learner sections, switches and new courses (#208, #212, #216,
#220, #224, #226, #234, #237, #239), regenerated kanji strokes (#209) and the
stroke redraws for many scripts, the camera-cutout fix for the SquirrelGo apps
(#223), and the Orthodox Bible packs (#232, #242, #254).

## How the draft is made

1. After the release PR merges, run **Actions → SquirrelGo release (draft) →
   Run workflow** with the version. It builds a release APK of every app
   (signed with the upload key when the `UPLOAD_*` secrets exist, otherwise
   with each app's fixed debug key, as before), writes `SHA256SUMS.txt`, and
   creates or refreshes the **draft** release targeting that commit, with the
   notes from `release-notes/<version>.md` and a table of every app's version
   and the data commit. It never creates or moves a tag.
2. The owner clicks **Publish**. Publishing creates the tag, and the existing
   workflows then attach the Linux, Windows and macOS Desk builds and the
   Orthodox Bible content packs.
3. AABs, if wanted, are built separately into Claude's files directory under
   `releases/<version>/`, never on GitHub.

Not automated yet: installing each APK on an emulator before the draft. Until
it is, the notes say the APKs weren't smoke-tested on a device.

## After v0.1.0

Testing happens against v0.1.0 and its pinned data. `data/` only moves to
another squirrel-lang-data release (v0.1.x or v0.2.0), never to an untagged
commit, until testing is done. Fixes ship as squirrelgo-v0.1.1 and so on.
