# SquirrelGo v0.1.5

Ships the Desk and every twin app against squirrel-lang-data **v0.1.6**, so
Play closed testing gets the full meaning-matrix and programming course packs
that landed after v0.1.4. Every app's `versionCode` / `versionName` goes up
so this release installs over squirrelgo-v0.1.4.

## Languages and data

- **squirrel-lang-data v0.1.6** (`73b5ace`): every language folder now has a
  full meaning-matrix column (103 rows), including Inuktitut. Arabic, Hindi,
  Hebrew, Thai, Bengali, Armenian, Georgian, Tamil and Klingon (with the
  code pack) are filled end to end; Gujarati, Kannada, Malayalam, Telugu,
  Burmese, Khmer, Lao, Mongolian, Odia, Punjabi, Sinhala, Tibetan, Amharic,
  Cherokee, Taiwanese, Aramaic, Manipuri and Tamazight columns are added.
  Mechanical `REVIEW.md` entries cover those fills. Syriac Estrangela strokes
  are reviewed against a primer; Tifinagh ⴰ and 21 kana/kanji strokes are
  redrawn for the final-frame check. Programming course packs (`programming/`),
  Math and Electronics trees, and `gen_features.py --check` payload-only
  comparison land in the same tag.
- Desk `data/` is pinned to that tag (#364).

## Translation Learner

- French, German and Italian stay in the language menu (#363), matching the
  v0.1.5 matrix columns that v0.1.4 already documented.

## Desk and packaging

- Desktop builds skip the data submodule when copying Desk files, and copy
  generated dictionary data into those builds (#359, #360).
- Orthodox Bible text packs build and attach to their own GitHub release
  (#361).
- Maths Edu-Training Helper and Electronics Student Desk Play store listing
  packs push from CI (`squirrelgo-listing.yml`) when their `play/` files
  change (#362).

## SquirrelGo apps

- Every app's version number goes up, so this release installs over v0.1.4
  and can go to Google Play. On the release page, each APK is listed under
  its app name and version.

## Downloads

The APKs for every app are attached here, along with `SHA256SUMS.txt`. When
this release is published, the Linux, Windows and macOS builds of the Desk
and the Orthodox Bible content packs are added automatically, and each app
goes to its Google Play closed testing track. The desktop builds are
unsigned, so your system may ask you to confirm before opening one.
