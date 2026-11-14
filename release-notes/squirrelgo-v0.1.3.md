# SquirrelGo v0.1.3

The Desk and the apps move to squirrel-lang-data v0.1.5, which brings the
biggest content update yet. Grammar courses go from a handful of lessons to
72 in most languages, the Chinese, Japanese and Korean translators have
every sentence to work with, and French, German and Italian join with full
meaning-matrix columns.

## Languages and data

- **squirrel-lang-data v0.1.5:** French, German and Italian meaning-matrix
  columns (all 103 rows), Latin, Greek and Russian filled to every row,
  English contractions, the `@partitive` meaning, and the Syriac
  (Estrangela) alphabet course.
- **squirrel-lang-data v0.1.4:** grammar at 72 lessons for 29 languages
  (73 for Japanese), Latin to 72, and Tibetan and Klingon to 24 each, all
  sorted from absolute beginner to advanced. It also adds Latin, English and
  Klingon inflection tables, a Historical kana lesson for ゐ ゑ ヰ ヱ, and a
  "code" pack of short programming instructions in 15 languages.
- **squirrel-lang-data v0.1.3** (first shipped here): the Chinese, Japanese
  and Korean columns of the meaning matrix cover every sentence. Chinese words
  drop guessed HSK levels, Korean grammar's placeholder lessons are written
  out properly, and five Hangul letters have their stroke order fixed.

## Fixes

- **Grammar Learner:** each level tab numbers its lessons from 1, the same
  way the lesson's own "lesson N of M" line does.
- **Translation Learner:** a close word no longer earns credit when it names
  a different thing, place, name, language or day. "dinner" for *lunch*
  scores like any other wrong word.
- **Orthodox Bible:** opening a book jumps to the text that contains it,
  without a fallback notice.

## Translation Learner

- French, German and Italian pairs, with the full columns from data v0.1.5.

## Alphabets and Character Learner

- Syriac (Estrangela) joins SquirrelGo Alphabets and the Character Learner.
  Stroke order is a machine draft pending a human review.

## Programming Learner

- Longer C, C++, C#, Modern Delphi, Rust, Go and JavaScript courses, each
  ending in a project. They cover arrays and pointers, errors, generics and
  traits, collections, goroutines, and async in depth.
- Longer TypeScript, Java and Bash courses too, each ending in a project.

## SquirrelGo apps

- Every app's version number goes up, so this release installs over v0.1.2
  and can go to Google Play. On the release page, each APK is listed under
  its app name and version.

## Downloads

The APKs for every app are attached here, along with `SHA256SUMS.txt`. When
this release is published, the Linux, Windows and macOS builds of the Desk
and the Orthodox Bible content packs are added automatically, and each app
goes to its Google Play closed testing track. The desktop builds are
unsigned, so your system may ask you to confirm before opening one.
