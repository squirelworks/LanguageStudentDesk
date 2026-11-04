# SquirrelGo v0.1.0

This is the first release built on a frozen copy of the language data,
squirrel-lang-data v0.1.0. From here on, testing focuses on how usable and
accurate the apps are, while the content stays fixed underneath them.

## Language Student Desk and the learners

- **Languages and data:** every language's vocabulary, grammar, reference
  cards and menu now come from squirrel-lang-data v0.1.0. Japanese grammar has
  JLPT levels on every lesson. Korean and Chinese grammar have TOPIK and HSK
  levels. New reference cards explain the JLPT, TOPIK and HSK levels. Aramaic
  is now available.
- **Simpler menu:** Settings now has three levels (Simple, More and
  Everything), plus switches for individual features. A welcome card suggests
  a few languages to try first, and the menu no longer pins one language to
  the top.
- **Levels everywhere:** the grammar, References and Resources pages have
  level tabs, and a grammar web shows which topics are written and which are
  still to come.
- **Meaning and translation:** the meaning matrix compares languages side by
  side, and there's a new Meaning web view. The Translation Learner accepts
  equivalent phrasings. The "(alpha)" label is gone for the language pairs
  whose tests pass, Japanese and Korean among them.
- **Programming Learner:** languages are grouped into modern, older and joke
  sections, with an A to Z view and switches to show older and joke
  languages. There are new courses for C++, C#, Java, JavaScript, TypeScript,
  PHP, Perl, Bash, SQL, HTML and CSS, classic BASIC, COBOL, Fortran, modern
  Delphi and Turbo Pascal, and a numerical methods track that starts with root
  finding. A note explains the brainFOOD name.

## Writing and strokes

- Kanji stroke order was regenerated from KanjiVG. Bopomofo strokes were
  redrawn so each one ends as the printed symbol.
- Letters that animated into the wrong shape were redrawn in Arabic,
  Armenian, Bengali, Burmese, Canadian Syllabics, Cherokee, Ethiopic,
  Georgian, Hebrew, Malayalam, Meetei Mayek, Odia, Thai and Tibetan, and
  Mongolian is now checked against an upright glyph.
- The kana handakuten is drawn as a circle instead of a dot.

## SquirrelGo apps

- Pages stay clear of the camera cutout and the system bars on newer phones.
- Orthodox Bible has Latin built in, and it can download more texts from the
  latest release. The Latin Fathers' Psalm commentaries are back.
- Every app's version number goes up, so this release installs over the last
  one and can go to Google Play.

## Downloads

The APKs for every app are attached here, along with `SHA256SUMS.txt`. When
this release is published, the Linux, Windows and macOS builds of the Desk
and the Orthodox Bible content packs are added automatically, and each app
goes to its Google Play closed testing track. The desktop builds are
unsigned, so your system may ask you to confirm before opening one.
