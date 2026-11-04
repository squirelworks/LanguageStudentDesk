# SquirrelGo v0.1.1

The first fix release from testing. It moves the Desk and the apps to
squirrel-lang-data v0.1.1, which only adds content, and fixes what testing
turned up.

## Fixes

- **Japanese-English Dictionary:** the Linux, Windows and macOS downloads of
  the Desk now include the dictionary's word list, so it no longer opens
  blank. If the list is ever missing, the page says so instead of showing
  nothing.
- **Feature switches:** features marked alpha now show at the Simple
  setting, matching the shared data. Before, the Desk's copy still hid them.

## Languages and data

- **squirrel-lang-data v0.1.1:**
  - French, German, Italian, Greek and Russian grammar have estimated CEFR
    levels on every lesson, plus a CEFR reference card each.
  - Vocabulary cards in 15 languages are linked to the meanings they carry,
    773 links in all.
  - Each language's info says where its grammar markers go.
- The character tables are now generated from the shared data instead of
  kept separately in the Desk.

## Meaning and vocabulary

- Vocabulary and meanings are now connected. In the Vocabulary Learner, a
  Desk card shows its meanings once you turn it over, and each one links to
  the Meaning web. The Meaning web lists the vocabulary cards for each
  meaning, and the Translation Learner breaks linked words down into their
  meanings.

## Programming Learner

- New Kotlin and Visual Basic .NET courses.
- The numerical methods track adds integration with the trapezoid and
  Simpson rules, and linear systems with Gaussian elimination.

## SquirrelGo apps

- Every app's version number goes up, so this release installs over v0.1.0
  and can go to Google Play.

## Downloads

The APKs for every app are attached here, along with `SHA256SUMS.txt`. When
this release is published, the Linux, Windows and macOS builds of the Desk
and the Orthodox Bible content packs are added automatically, and each app
goes to its Google Play closed testing track. The desktop builds are
unsigned, so your system may ask you to confirm before opening one.
