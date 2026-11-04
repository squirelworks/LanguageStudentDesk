# SquirrelGo release process

This covers the whole SquirrelGo platform: LanguageStudentDesk (the Desk and its
learners), the SquirrelGo Android apps, the Programming Student Desk, squirrelator,
and the squirrel-lang-data version they're built from.

## The short version

- **APKs go to GitHub Releases.** They're built only when the user asks for one, or
  for a release.
- **AABs are for the user only.** They go in Claude's files directory, never to
  GitHub, never committed, and never attached to a release.
- **Desktop builds** (Linux, Windows, macOS) are made for releases and attached to
  the GitHub Release.
- **Test builds aren't releases.** Nothing counts as a release unless the user
  says "release".
- After the user approves a release, Claude does everything up to a **draft**
  GitHub Release. The user's job is to click **Publish** (and upload the AABs to
  Play if they want).

## 0. First task: stop the APK flood

The current build workflows upload an APK on every PR and push, so GitHub fills up
with builds of intermediate steps. Fix this before any other release work:

1. Find every workflow in LanguageStudentDesk (and any other SquirrelGo repo) that
   uploads an APK, AAB or other build output on `pull_request` or `push`.
2. Change those workflows to **compile only**: they still build the apps so a
   broken build fails the check, but they don't run `actions/upload-artifact` for
   APKs or AABs, and they don't attach anything anywhere.
3. Add a separate, manually started workflow (`workflow_dispatch`) that builds a
   test APK with an artifact `retention-days: 7`. That is the only way to get an
   APK outside a release.
4. Make this one PR with its own seam ("CI: compile only, APKs on request"), and
   don't mix it with other changes. Keep the check names the same so the PR guard
   and the required checks still match.

## 1. Test builds (any time, not releases)

- Claude can build anything to test it, locally or in CI. That never creates a
  GitHub Release, a tag or a commit with build output.
- **CI on pull requests and pushes compiles the apps to prove they build, but
  doesn't upload APKs.** Intermediate steps never put an APK on GitHub, whether as an
  artifact, a release asset or a commit.
- **An APK only when asked.** When the user asks for a test APK ("build me a test
  APK of Kana"), Claude builds it through a manually started workflow and gives
  the user the download link to the workflow artifact, which expires after 7 days.
  That isn't a release.
- A test AAB, when asked for, goes in the files directory like a release AAB,
  under `test-builds/<date>-<app>/`.

## 2. Making a release

### What starts it

Only the user, saying something like "release" or "release v1.4.0". If they don't
give a number, Claude proposes one (see Versions) and waits for an OK before doing
anything else.

### What Claude does after the OK, in order

1. **Freeze check.**
   - Every open PR is merged or deliberately left out.
   - CI is green on `main` in LanguageStudentDesk, squirrelator and
     squirrel-lang-data.
   - The submodules in LSD and squirrelator point at the same squirrel-lang-data
     commit.
   - Any failure stops the release, and Claude reports it.
2. **Release PR in each repo.**
   - Raise each app's `versionCode` (it always goes up) and `versionName`.
   - Update `release-notes/<version>.md`.
   - Nothing else goes in this PR. The merger reviews and merges it as usual.
3. **Tag.**
   - Tag each repo's merged release commit with the platform version
     (`squirrelgo-v1.4.0`).
   - Never reuse a tag, and never move one.
4. **Build in GitHub Actions**, using a release workflow that starts on the tag:
   - **APKs:** a release-signed APK for every app.
   - **Desktop:** one native build on Linux, Windows and macOS runners, since the
     builds can't be cross-compiled. That's an AppImage or `.tar.gz` for Linux, a
     `.zip` or installer for Windows, and a `.zip` or `.dmg` for macOS.
     Each covers LanguageStudentDesk, the Programming Student Desk and squirrelator,
     with the data they need.
   - **Smoke tests:** install each APK on an emulator and open it, and launch each
     desktop build headlessly. Any failure stops the release.
   - **Checksums:** a `SHA256SUMS.txt` for everything attached.
5. **Draft GitHub Release** on LanguageStudentDesk, which is the platform's home:
   - **Attached:** all the APKs, the desktop builds for all three systems, and
     `SHA256SUMS.txt`.
   - **Content packs:** when the release is published, the "SquirrelGo
     Orthodox Bible release packs" workflow attaches the Orthodox Bible's
     downloadable Bibles and commentary (`orthodox-bible-content.json` plus
     one `orthodox-bible-*.js` or `orthodox-commentary-*.js` per pack). The
     app ships English, Greek and Latin and downloads the rest from the latest
     release when the reader asks. These are data, not builds, so they're
     allowed on the release.
   - **Notes:** written in plain language from the merged PR titles since the last
     release, with no implementation notes. They include a generated table of each
     app and its version, plus the squirrelator and squirrel-lang-data commits.
   - **No AABs.**
   - It stays a **draft**. Claude never publishes it.
6. **AABs.**
   - Build a release-signed AAB for every app from the same tagged commit, in
     Claude's own environment.
   - Put them in Claude's files directory under `releases/<version>/` with their
     own `SHA256SUMS.txt`.
   - If an AAB has to be built in CI instead, upload it as an artifact with a
     one-day expiry, download it into the files directory, and delete the artifact
     right away. The repo is public.
7. **Report to the user:**
   - the draft release link (their one click is **Publish**)
   - where the AABs are in the files directory
   - the version table
   - anything left out, and why

### What the user does

1. Says "release" (and OKs the version number if Claude proposed it).
2. Clicks **Publish** on the draft release.
3. Optionally uploads the AABs from the files directory to Google Play.

## 3. Versions

- **Platform version:** `squirrelgo-vMAJOR.MINOR.PATCH`, used for the tag and
  the release title.
  - PATCH is for fixes only.
  - MINOR is for new features, languages or apps.
  - MAJOR is for breaking changes (data format, API, or dropping an app).
- **Each app** keeps its own `versionName` and `versionCode`. `versionCode` always
  goes up by at least 1 for every app in a release, because Play needs that. The
  notes' table maps app versions to the platform version.

## 4. Signing and secrets

- APK signing keys are stored as GitHub Actions secrets for the release workflow,
  and are never committed or printed in logs.
- The Play upload key for the AABs is kept only in Claude's environment (or a
  secret in a private place the user picks). It never goes into the public repo or
  its artifacts.
- macOS and Windows builds start out unsigned. Signing them needs paid
  certificates (an Apple Developer account and a Windows code-signing
  certificate). Until the user decides on that, the release notes say how to open
  an unsigned build.

## 5. Never

- Commit an APK, AAB, desktop build or signing key to any repo.
- Attach an AAB to a GitHub Release, or leave one as a downloadable artifact.
- Publish a release, or create one without the user's "release".
- Make APKs when no one asked for them and it isn't a release, or upload build
  output from PR or push CI.
- Reuse, move or delete tags or releases.
