# Release plan

When the next platform release is due, and what it waits for. The rules for
every release are in `RELEASES.md`: Claude (or any agent) prepares a
**draft**, the owner clicks **Publish**, tags are never moved or reused,
releases are never deleted, and AABs never go to GitHub. Tick the boxes here
as the steps land.

## Released

- [x] **squirrelgo-v0.1.0** (2026-11-04): first release built against a
      frozen squirrel-lang-data release (data v0.1.0).
- [x] **squirrelgo-v0.1.1** (2026-11-04): fixes from testing, data v0.1.1.
- [x] **squirrelgo-v0.1.2** (2026-11-04): data v0.1.2, the character apps read
      from the shared data, numerical methods track finished. All 10 apps are
      on Google Play closed testing, each release named after its app and
      version (#305).

Since then, on `main`: the data pin moved to **v0.1.3** (#307), and
Programming Learner courses were deepened (#297–#303).

## Next: squirrelgo-v0.1.3

A PATCH release that ships the data v0.1.4 content (72 grammar lessons for
most languages, the code pack, Latin and English inflection tables) to the
Desk and every app. It's due when all of these hold and the owner says
"release":

- [ ] **squirrel-lang-data v0.1.4 is published** (see that repo's
      `RELEASE_PLAN.md`; its grammar expansion is still landing).
- [ ] A one-seam PR here moves `data/` to the v0.1.4 tag, with the `data-pin`
      label, and regenerates the Desk and app files
      (`python3 languages/build_registry.py`, `--check` clean).
- [ ] CI is green on `main` here, in squirrelator and in squirrel-lang-data,
      and squirrelator pins the same data tag.
- [ ] A release PR raises every app's `versionCode` and `versionName` and adds
      `release-notes/squirrelgo-v0.1.3.md`, with nothing else in it.
- [ ] **Actions → SquirrelGo release (draft) → Run workflow** with
      `squirrelgo-v0.1.3`.
- [ ] The owner publishes. The Desk desktop builds, the Orthodox Bible
      content packs and the Play closed-testing uploads follow automatically.

PRs opened after this list was written don't hold the release back; they go
into the next one.

## How the draft is made

1. After the release PR merges, run **Actions → SquirrelGo release (draft) →
   Run workflow** with the version. It builds a release APK of every app
   (signed with the APK signing key when the `APK_KEYSTORE_BASE64`,
   `APK_STORE_PASSWORD`, `APK_KEY_ALIAS` and `APK_KEY_PASSWORD` secrets exist,
   otherwise with each app's fixed debug key; the Play upload key is never
   used here), writes `SHA256SUMS.txt`, and creates or refreshes the
   **draft** release targeting that commit, with the notes from
   `release-notes/<version>.md` and a table of every app's version and the
   data commit. It never creates or moves a tag.
2. The owner clicks **Publish**. Publishing creates the tag, and the existing
   workflows then attach the Linux, Windows and macOS Desk builds and the
   Orthodox Bible content packs, and `squirrelgo-play.yml` sends each app's
   AAB to its Play closed testing track (`PLAY.md`).

Not automated yet: installing each APK on an emulator before the draft. Until
it is, the notes say the APKs weren't smoke-tested on a device.

## Between releases

`data/` only moves to another tagged squirrel-lang-data release, never to an
untagged commit. Fixes ship as the next squirrelgo-v0.1.x.
