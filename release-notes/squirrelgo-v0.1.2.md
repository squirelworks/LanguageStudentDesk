# SquirrelGo v0.1.2

The second fix release from testing. The Desk and the apps move to
squirrel-lang-data v0.1.2, and the character apps now read their content from
it too.

## Before you update

- **Three Japanese cards lose their review history in the Vocabulary
  Learner.** Data v0.1.2 moves ありがとう and おはよう to JLPT N5 and turns the
  old おいしい card into the Food card 美味しい. The Desk keeps progress per
  deck and card, so these three come back as new cards. Nothing else is lost.

## Fixes

- **Translation Learner:** adding an extra phrase to an otherwise right
  answer no longer drops the meaning score to zero.
- **Data v0.1.2 corrections:** the set Japanese greetings are now at N5, and
  wrong or made-up example words in the kana and Hangul courses are fixed.
- **Orthodox Bible:** the Patriarchal Text is now described as an unaccented
  transcription, which is what it is.

## Languages and data

- **squirrel-lang-data v0.1.2:** frequency tags for 11 more languages, the
  first inflection tables, and Anki and Yomitan packs.
- **The character apps read from the shared data.** SquirrelGo Alphabets,
  Kana, Kanji, Bopomofo and Klingon now take their stroke order and courses
  from squirrel-lang-data, the same as the Desk, so a fix there reaches every
  app.

## Programming Learner

- The numerical methods track adds ordinary differential equations with the
  Euler and Runge–Kutta methods.

## SquirrelGo apps

- Every app's version number goes up, so this release installs over v0.1.1
  and can go to Google Play.

## Downloads

The APKs for every app are attached here, along with `SHA256SUMS.txt`. When
this release is published, the Linux, Windows and macOS builds of the Desk
and the Orthodox Bible content packs are added automatically, and each app
goes to its Google Play closed testing track. The desktop builds are
unsigned, so your system may ask you to confirm before opening one.
