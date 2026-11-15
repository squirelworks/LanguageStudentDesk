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
- [x] **squirrelgo-v0.1.3** (2026-11-15): published, but the tag pointed at the
      older draft commit (`e1ebe515`), not current `main`. Play closed-testing
      builds used that tag (no Math/Electronics twins in the matrix).

## Next: squirrelgo-v0.1.4 from current main

- [ ] Release PR: raise every app's `versionCode` / `versionName` and add
      `release-notes/squirrelgo-v0.1.4.md`.
- [ ] Draft with **SquirrelGo release (draft)** targeting current `main`
      (or a local rebuild uploaded to the draft with `--target` set to that
      commit).
- [ ] The owner publishes. Desktop builds, Orthodox Bible packs, and Play
      closed-testing uploads (including Maths Edu-Training Helper and
      Electronics Student Desk) follow automatically.

PRs opened after this list was written don't hold the release back; they go
into the next one. The longer-term order is in `FUTURE-WORK.md`.
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
