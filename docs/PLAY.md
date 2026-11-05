# Google Play closed testing

After the owner publishes a platform release (see `RELEASES.md`), the
**SquirrelGo Play closed testing** workflow (`squirrelgo-play.yml`) builds
each app's AAB from the release tag and sends it straight to that app's
closed testing track on Google Play, where it rolls out to testers. The AAB is
built on the runner and deleted there. It never becomes an artifact, a
release asset or a commit.

It can also be run by hand: **Actions → SquirrelGo Play closed testing → Run
workflow**, with the tag, optionally a comma-separated list of apps (`kana,
kanji`), the track, and the status.

## One-time setup (owner)

### 1. A service account that can release to testing tracks

1. In the Google Cloud console (console.cloud.google.com), pick or create a
   project, open **APIs & Services → Library**, and enable the **Google Play
   Android Developer API**.
2. **IAM & Admin → Service accounts → Create service account.** Name it, for
   example, `squirrelgo-play-release`. It needs no Cloud roles. Skip the
   optional steps.
3. Open the new service account → **Keys → Add key → Create new key →
   JSON**. A `.json` file downloads. Treat it like a password.
4. In Play Console (play.google.com/console), go to **Users and permissions →
   Invite new users**. Paste the service account's email (it ends in
   `iam.gserviceaccount.com`). Under **App permissions**, add each SquirrelGo
   app, or use **Account permissions** to cover all of them, and tick:
   - **View app information and download bulk reports (read only)**
   - **Release apps to testing tracks**

   Then click **Invite user**. Service accounts are accepted straight away.

### 2. The GitHub secret

In LanguageStudentDesk, go to **Settings → Secrets and variables → Actions →
New repository secret**:

- Name: `PLAY_SERVICE_ACCOUNT_JSON`
- Value: the whole contents of the JSON file.

Then delete the downloaded file from your computer, or keep it somewhere
private.

If your closed testing track isn't Play's default "Closed testing - Alpha"
track (whose API name is `alpha`), add a repository **variable** (not a
secret) called `PLAY_TRACK` holding the track's name.

### 3. The upload key (needed, Play won't take the debug key)

Play only accepts a bundle signed with the app's registered **upload key**,
and it refuses any bundle signed with an Android debug certificate
(`CN=Android Debug`). Without the upload key in secrets, the workflow falls
back to the apps' shared debug key, and Play will refuse the upload.

Add these four repository secrets:

| Secret | Value |
| --- | --- |
| `UPLOAD_KEYSTORE_BASE64` | the upload keystore, base64-encoded: `base64 -w0 upload.jks` (macOS: `base64 -i upload.jks`) |
| `UPLOAD_STORE_PASSWORD` | the keystore password |
| `UPLOAD_KEY_ALIAS` | the key's alias |
| `UPLOAD_KEY_PASSWORD` | the key's password |

These are the same names the apps' `build.gradle` already reads. Only this
Play workflow uses them. The draft-release workflow signs APKs with a
separate APK signing key (`APK_*` secrets) and never touches the upload key.

If all the apps use one upload key, these four secrets cover all of them. If
the key is lost, or you'd rather start a new one, Play Console can reset it
for each app: **Test and release → App integrity → App signing → Request
upload key reset**. Make a new key, give Play its certificate, and put the new
key in these secrets once Google approves the reset, which usually takes a day
or two.

## New apps

An app has to exist in Play Console before the API can upload to it, and its
first upload has to be made by hand, or sent as a draft (status `draft` when
running the workflow by hand). Create it with the package name from the table
below, link its privacy policy (`PRIVACY.md` covers every app), and fill in
the content rating and Data safety form ("no data collected", the same as the
others).

| App | Package |
| --- | --- |
| Language Student Desk | `com.squirelworks.lsd` |
| Programming Student Desk | `com.squirelworks.programmingstudentdesk` |
| SquirrelGo Alphabets | `com.squirelworks.squirrelgoalphabets` |
| SquirrelGo Bopomofo | `com.squirelworks.squirrelgobopomofo` |
| SquirrelGo Kana | `com.squirelworks.squirrelgokana` |
| SquirrelGo Kanji | `com.squirelworks.squirrelgokanji` |
| SquirrelGo Klingon | `com.squirelworks.squirrelgoklingon` |
| SquirrelGo Japanese-English Dictionary | `com.squirelworks.squirrelgodictionary` |
| SquirrelGo Orthodox Bible | `com.squirelworks.squirrelgoorthodoxbible` |
| SquirrelGo Phrasebook | `com.squirelworks.squirrelgophrasebook` |
| squirrelator | `com.squirelworks.squirrelator` (its own workflow, below) |

## squirrelator

squirrelator's phone app lives in the squirrelator repo but goes to Play from
here, through **squirrelator Play testing** (`squirrelator-play.yml`), so it
uses the same service account and upload key secrets as the apps above.
Nothing needs setting up in the squirrelator repo.

- **Every hour** the workflow looks at squirrelator's latest published
  release. If Play doesn't have that version yet, it builds the AAB from the
  release tag, signs it with the upload key, sends it to **internal
  testing**, and sets the store listing (title, descriptions, icon, feature
  graphic, phone screenshots) from that tag's
  `native/android/src/main/play/`. When Play is up to date it does nothing.
- The version comes from squirrelator's `pyproject.toml`: versionCode is
  `major × 10000 + minor × 100 + patch` (0.1.1 is 101), and Play shows the
  release as **squirrelator 0.1.1**.
- **By hand** (Actions → squirrelator Play testing → Run workflow):
  - **promote** moves a tag's build from internal testing to **closed
    testing** (`alpha`, or the `PLAY_TRACK` variable) without building again;
  - **upload** sends a tag again;
  - **listing** sets only the store listing (blank tag = squirrelator's main);
  - **check** tests the upload key and that the service account can see the
    app.
- **First upload:** while the app has never been published, Play takes a
  release only as a draft, so the first one arrives as a draft. Open Play
  Console → **Test and release → Testing → Internal testing**, edit the
  draft, and press **Start rollout**. Later releases roll out by themselves.
- Setting the store listing needs the service account's **Manage store
  presence** permission for squirrelator, on top of the two release
  permissions above.

## When it fails

Each app is its own job, so one refused upload doesn't stop the others. The
job's log says why Play refused it:

- **wrong key or debug mode:** the upload key secrets are missing or don't
  match the key Play has for that app.
- **package not found:** the app isn't in Play Console yet, or the service
  account wasn't given access to it.
- **version code already used:** the release PR didn't raise that app's
  `versionCode`.

## "Changes not yet sent for review" with no button

After the SquirrelGo v0.1.1 upload, SquirrelGo Kana showed "Changes not yet
sent for review", but Play Console had no "Send changes for review" button
anywhere. This was a Play Console glitch, not our upload: the log showed the
release reached the track as completed.

What fixed it: **discard the pending changes, then submit them again.** Do
that first if it happens again; don't go looking for the button.
