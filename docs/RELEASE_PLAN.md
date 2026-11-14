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
- [ ] The owner publishes. **Not done, and the draft is now stale:** `main`
      has moved on to data **v0.1.5** (#319) and more work (#316–#319), so
      publishing the draft as it stands ships the older data.

## Next (open): refresh, then publish

Since the draft, on `main`: data **v0.1.5** (French, German and Italian in
the Translation Learner, Syriac in SquirrelGo Alphabets and the Character
Learner, #319), four more lessons each and a project for TypeScript, Java and
Bash (#318), the Orthodox Bible opening a book in the text that has it (#317),
and squirrelator Play testing (#316).

Two ways forward; the owner picks one, and nothing is published without the
owner's "release":

1. **Keep the version (suggested).** The `squirrelgo-v0.1.3` tag doesn't
   exist yet, so one release PR updates `release-notes/squirrelgo-v0.1.3.md`
   to name data v0.1.5 and add the items above, with nothing else in it. Then
   re-run **SquirrelGo release (draft)** with `squirrelgo-v0.1.3`; it
   refreshes the existing draft to the new `main` commit. The owner publishes.
2. **A new version.** A release PR raises every app's `versionCode` and
   `versionName` again and adds `release-notes/squirrelgo-v0.1.4.md`; the
   v0.1.3 draft stays unpublished. Then the draft workflow with
   `squirrelgo-v0.1.4`, and the owner publishes.

Either way:

- [ ] CI is green on `main` here, in squirrelator and in squirrel-lang-data,
      and squirrelator pins the same data tag (v0.1.5, squirrelator #49).
- [ ] The release PR, then the draft, then the owner publishes. The Desk
      desktop builds, the Orthodox Bible content packs and the Play
      closed-testing uploads follow automatically.

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
