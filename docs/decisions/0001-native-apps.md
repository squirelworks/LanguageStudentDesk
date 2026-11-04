# 0001: Native apps instead of WebView shells

- Status: **Proposed.** Waiting for the user's sign-off. No app changes until then.
- Date: 2026-11-04
- Roadmap: #197 (part of #199). Depends on #196, the shared content source.
- Spike: `spikes/native-apps/`

## The question

Every SquirrelGo app is a web page inside a WebView. Each `MainActivity` loads
`www/index.html` and adds a small JavaScript bridge for text to speech, opening
sibling apps and saving files. The Desk runs the same pages in a browser from
`LanguageStudentDesk.py`. Issue #197 asks whether we should build real native
programs instead, and if so, how.

## Constraints

These come from #197, the merge guidelines and the release process.

1. **Offline.** Every app works with no network.
2. **One content source.** Apps read only the shared content (#196,
   squirrel-lang-data), turned into app assets at build time by tools.
3. **Android and desktop.** The Desk ships Linux, Windows and macOS builds at
   every release, built natively on each OS.
4. **One codebase if possible**, and the Desk and phone stay twins.
5. **Shippable at every step.** No big-bang rewrite. An app is never removed or
   replaced before the user signs off.
6. **Same release machinery.** Gradle builds, `versionCode` that only goes up,
   APKs to Releases, AABs to the files directory, compile-only CI.

## What the spike looked at

`spikes/native-apps/inventory.py` measures what a port of each app has to
replace. Snapshot at main `95d2f31`:

| App | App JS lines | Shared modules | Data | Audio | Bridge methods |
|---|---:|---|---:|---:|---|
| lsd-suite | 0 | none | 0 B | 0 B | speak, stop, voices |
| programming-student-desk | 0 | none | 0 B | 0 B | none |
| squirrelgo-characters/squirrelgo-alphabets | 1023 | pad, speech, strokes, suite, writepad | 604.4 KB | 5.6 MB | installed, isReady, open, openUrl, speak, stop, takeQuery |
| squirrelgo-characters/squirrelgo-bopomofo | 1024 | pad, speech, strokes, suite, writepad | 11.6 KB | 0 B | installed, isReady, open, openUrl, speak, stop, takeQuery |
| squirrelgo-characters/squirrelgo-kana | 1023 | pad, speech, strokes, suite, writepad | 182.6 KB | 1.3 MB | installed, isReady, open, openUrl, speak, stop, takeQuery |
| squirrelgo-characters/squirrelgo-kanji | 1585 | speech, strokes, suite | 2.8 MB | 0 B | installed, isReady, open, openUrl, speak, stop, takeQuery |
| squirrelgo-characters/squirrelgo-klingon | 963 | strokes, suite, writepad | 13.5 KB | 145.4 KB | installed, isReady, open, openUrl, speak, stop, takeQuery |
| squirrelgo-dictionary | 1315 | speech, suite | 0 B | 0 B | installed, isReady, open, openUrl, saveFile, speak, stop, takeQuery |
| squirrelgo-orthodox-bible | 979 | speech, suite | 85.5 MB | 0 B | installed, isReady, open, openUrl, saveFile, speak, stop, takeQuery |
| squirrelgo-phrasebook | 546 | speech, suite | 231.0 KB | 6.9 MB | installed, isReady, open, openUrl, saveFile, speak, stop, takeQuery |

What it shows:

- **The apps are small.** Each has roughly 500 to 1,600 lines of its own
  JavaScript. The hard parts sit in the shared modules (`strokes.js`,
  `writepad.js`, `pad.js`, `speech.js`, `suite.js`, about 740 lines together),
  so porting them once covers most apps.
- **The bridge is the same everywhere.** Seven or eight methods (speech,
  sibling apps, save file). A native app replaces it with plain platform calls.
- **Content is the bulk**, and it moves to the shared source in #196 anyway.
  A native app should read the generated JSON, not the `window.X = ...` scripts.
- **The two Desk apps are different.** `lsd-suite` and `programming-student-desk`
  wrap the Desk learners, which are larger (the Programming Learner alone is
  about 8,500 lines). They aren't candidates for an early port.

The spike didn't build a native app. No Android SDK or Flutter toolchain was
available, and #197 asks for the decision first. APK size, start time and
stroke-drawing smoothness get measured in the pilot, against the WebView build
of the same app.

## Options

### A. Kotlin with Jetpack Compose, plus Compose Multiplatform for desktop

- One Kotlin codebase for Android and desktop (JVM). iOS is possible later.
- Fits what we have. The apps are already Gradle Android projects, so signing,
  `versionCode`, the APK workflows and compile-only CI stay as they are.
- **It can move one screen at a time.** A Compose screen can sit in the same app
  as the WebView, so each app stays shippable through the whole migration.
- Strokes and the writing pad map onto Compose `Canvas` and `Path` (the stroke
  data is already SVG paths). Android speech uses the `TextToSpeech` engine
  directly, without a bridge.
- Desktop builds are packaged with `jpackage` (deb or AppImage, msi, dmg) on each
  OS's runner, which matches the release process. They bundle a Java runtime, so
  they're larger than the current Desk build.
- Desktop speech is the weak spot. There's no built-in engine, so it calls the
  OS voice (SAPI, `say`, speech-dispatcher) or plays recorded audio.

### B. Flutter

- One Dart codebase for Android, Linux, Windows and macOS (and iOS).
- Very good custom drawing, and small desktop builds without a runtime.
- Adds a second toolchain and language next to Gradle, Java and Python.
- Moving one screen at a time is harder. "Add to app" exists, but the practical
  path is rewriting each app whole before it can ship, which breaks constraint 5.
- Speech is a community plugin, with uneven Linux support.

### C. Keep the web core, and make only the heavy parts native

- Keep `www/` and the WebView, and replace the writing pad, audio and strokes
  with native views behind the bridge.
- The cheapest option, and the Desk stays a twin for free.
- It doesn't meet the goal of #197. The apps are still web pages in a WebView,
  and we'd maintain two drawing engines (native on phones, JS on the Desk).

## Decision (proposed)

**Option A: Kotlin and Compose, migrating screen by screen inside the existing
Android apps, with Compose Multiplatform for desktop.**

It's the only option that meets every constraint, especially "shippable at every
step". It keeps the build and release setup we already have, and it lets the
riskiest parts (strokes, writing pad) be proven in one app before anything else
moves. Option C is the fallback if the pilot shows the cost is too high, since
A's first steps (native strokes and speech in one app) are useful to C too.

## One codebase, many builds

The user wants every program, phone and desktop, to come from one codebase,
with the platform being a build choice rather than a separate set of code. The
target layout is one Gradle project:

```
native/
  core/          commonMain only: content models and reader, strokes and
                 matching, writing pad logic, quiz rules, speech interface
  ui/            commonMain Compose screens, one module per app or learner
                 (kana, kanji, dictionary, programming, ...)
  android/       thin entry points: one application id per SquirrelGo app,
                 each pulling in the ui modules it ships
  desktop/       thin entry points: the Desk (every ui module behind one home
                 screen) and any standalone desktop app
```

- **Platform code is small and fenced off.** Only speech, file saving and
  opening sibling apps differ by platform. They sit behind interfaces in
  `core`, with `androidMain` and `desktopMain` versions.
- **Which app and which platform is a Gradle task**, not a code fork. For
  example `:android:kana:assembleRelease` builds the Kana APK, and
  `:desktop:desk:packageDistributionForCurrentOS` builds the Desk installer on
  each OS's release runner.
- **The Desk becomes a native desktop app** that hosts the same screens as the
  phone apps. That makes Desk and phone twins by construction, since they run the
  same code, and replaces the Python launcher and browser learners once each
  learner has a native screen with parity and the user signs off.
- **Programming Student Desk** gets both a phone and a desktop build from the
  same `ui/programming` module. The Programming Learner is the largest learner,
  so it ports late.
- **squirrelator** lives in its own repo with its own threads. It can use
  `core` the same way (as a published library or a build include) if it ever
  gets a native desktop or Android version, but that's its own decision.

## Migration path

Each step is its own PR, and nothing starts before #196 lands and the user signs
off on this record.

1. **Shared native module.** A Kotlin module next to `SquirrelGo-Apps/shared/`
   that ports `strokes.js`, `writepad.js`, `pad.js`, `speech.js` and `suite.js`.
   It has tests that check the same stroke data gives the same final frames and
   stroke counts as the checks from #188. It's shared the way `shared/` is now,
   never copied by hand.
2. **Content reader.** Loads the JSON that the squirrel-lang-data generators
   produce into typed models (kotlinx.serialization), checked against the
   versioned schemas.
3. **Pilot: SquirrelGo Kana.** Small, uses every shared module (strokes,
   writing pad, freehand pad, speech, suite), and its content is among the first
   to move to the shared source. Screens move one at a time: chart, detail and
   strokes, writing pad, quiz. The app ships after each one. Done when it reaches
   feature parity, reads only shared content, and has measurements against the
   WebView build.
4. **User checkpoint.** The user sees the pilot and its numbers, then decides
   whether to continue, change course, or stop with Option C.
5. **The other phone apps**, one at a time. The character apps come first,
   since they reuse the most. The Phrasebook, Dictionary and Orthodox Bible
   come after.
6. **The Desk.** A desktop build of the pilot comes early, from the same code,
   to measure size and start time. The native Desk then grows one learner at a
   time, and the Python launcher and browser learners stay in the release until
   every learner has a native screen and the user signs off on retiring them.

## What happens to the web versions

- **Nothing is removed before sign-off.** The merge rule in the roadmap addendum
  holds any PR that removes or replaces a WebView app before the user signs off.
- **During migration**, an app ships both: native screens where they're ready,
  WebView screens for the rest. `www/` stays in the repo and in the build.
- **After an app reaches parity** and the user signs off for that app, its `www/`
  stops being packed into the APK in a separate PR. The web pages stay on the
  Desk, since the Desk learners and Character Learner load them.
- **The Desk keeps its browser learners** until each one has a native screen.
  Until then, for the twin rule, a native phone app and its web Desk twin share
  content (one source) and behaviour (the same shared module tests), not code.
  `desk_twins.py` gets a check for that when the pilot lands.

## Risks

- **Two implementations while migrating.** Stroke logic exists in JS and Kotlin
  until the web side retires. Mitigated by one set of data tests both must pass.
- **Desktop size and speech.** A bundled Java runtime makes desktop builds
  bigger, and desktop speech needs OS-specific code. Measured in step 6, before
  anything replaces the current Desk build.
- **Effort.** Each port is a rewrite of that app's screens. The pilot gives a
  real cost per app before anything else is committed.

## iOS (answered by the user, 2026-11-04)

iOS is scaffolded but not built. There's no way to test it, and shipping to the
App Store isn't wanted for now.

- Shared logic (content models, stroke geometry and matching, quiz rules) goes
  in the multiplatform `commonMain` source set from the start, with no Android
  or JVM imports. That's what keeps iOS possible later.
- Only `android` and `desktop` (JVM) targets are declared. No iOS target, no
  Xcode project and no macOS CI job for it, so nothing untested ships and CI
  stays the same.
- If iOS work starts later, it lands on `main` as its own PRs that add the iOS
  target and its screens, not on a long-lived iOS branch, which would drift from
  `main` and break the no-stacked-PRs rule.

## Open questions for the user

1. Is a desktop build of a few tens of MB larger than today acceptable, in
   exchange for native apps on desktop?
