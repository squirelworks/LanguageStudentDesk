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

## Drafted, not published: squirrelgo-v0.1.3

- [x] squirrel-lang-data **v0.1.4** published (2026-11-05, `d5e05a4`).
- [x] `data/` moved to v0.1.4 (#312).
- [x] Release PR: every app's version raised and
      `release-notes/squirrelgo-v0.1.3.md` added (#315).
- [x] Draft created by **SquirrelGo release (draft)**.
- [x] Notes refreshed for data **v0.1.5** and what landed since the first
      draft (#316–#319): French, German and Italian in the Translation
      Learner, Syriac in SquirrelGo Alphabets and the Character Learner,
      TypeScript/Java/Bash projects, Orthodox Bible open-in-text, plus the
      earlier v0.1.4 content. The GitHub draft itself still needs a re-run
      of the draft workflow on current `main`.
- [ ] The owner publishes. Nothing is published without the owner's click.

## Next (open): re-run the draft, then publish

`release-notes/squirrelgo-v0.1.3.md` now names data v0.1.5. The
`squirrelgo-v0.1.3` tag still does not exist. Remaining steps:

- [ ] CI is green on `main` here, in squirrelator and in squirrel-lang-data,
      and squirrelator pins the same data tag (v0.1.5, squirrelator #49).
- [ ] After this notes refresh merges, re-run **SquirrelGo release (draft)**
      with `squirrelgo-v0.1.3` so the GitHub draft targets current `main` and
      picks up the refreshed notes. Then the owner publishes. The Desk
      desktop builds, the Orthodox Bible content packs and the Play
      closed-testing uploads follow automatically.

If the owner prefers a new version number instead (squirrelgo-v0.1.4), leave
the v0.1.3 draft unpublished, raise every app's `versionCode` and
`versionName`, and draft `squirrelgo-v0.1.4`. Ask once; it's the owner's
call.

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
