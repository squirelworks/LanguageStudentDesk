# SquirrelGo Alphabets

Offline trainer for the world's major writing systems, for Android and desktop browsers, part of LanguageStudentDesk.

The TenguGo series had a separate app for each alphabet. SquirrelGo Alphabets puts them in one app with the same lesson, chart, quiz, flashcard and writing tools as SquirrelGo Kana, plus stroke-order animations, a writing pad that checks each stroke, IPA for every character and recorded sounds. It is a new implementation: hints, groupings, example choices and articles are original. Not affiliated with TenguLogi.

## Scripts

| Script | Language values | Lessons | Extras |
| --- | --- | --- | --- |
| Latin | shared European values; examples from Spanish, French, German, Czech, Polish, Turkish and more | vowels, steady consonants, consonants that change; acute/grave/circumflex, umlaut, tilde/cedilla/ogonek, caron, rings/strokes/dots, extra letters (ß æ œ þ ð) | articles on accent marks, letter pairs and capitals |
| Greek Ελληνικά | Modern Greek | familiar letters, false friends, new shapes, vowel pairs, consonant pairs | articles on the stress mark, the five ways to spell ee and final sigma |
| Cyrillic Кириллица | Russian | true friends, false friends, new shapes, hushing sounds, y-vowels, hard and soft signs | articles on stress, hard/soft consonants and handwriting |
| Armenian Հայերեն | Eastern Armenian | the alphabet in five runs, including ու and և | articles on Eastern vs Western Armenian, the three kinds of p/t/k and the unwritten ə |
| Georgian ქართული | Georgian (national romanization) | vowels, easy consonants, hushing and throat sounds, aspirated consonants, ejectives | articles on the three Georgian scripts, Mtavruli and spelling |
| Hangul 한글 | Korean (Revised Romanization) | basic and compound vowels; basic, aspirated and tense consonants | syllable block builder; articles on block shapes, batchim and sound changes |
| Devanagari देवनागरी | Hindi (simplified IAST) | vowels, vowel signs on क, the five consonant rows, semivowels and sibilants, special letters | articles on matras, conjuncts, aspiration/retroflex and the silent a |
| Arabic العربية | Modern Standard Arabic | letters in shape families, extra letters, short vowel marks | letter forms table (isolated, initial, medial, final); articles on joining and sun/moon letters |
| Hebrew עברית | Modern Hebrew | the letters in four runs, end-of-word forms, the dots that change a sound (בּ כּ פּ שׁ שׂ), vowel points | articles on reading without vowels and letters that look alike |
| Ethiopic ፊደል | Amharic | base letters with ä, ejectives, letters that share a sound, the vowel orders on ለ, በ and ሰ | articles on the fidel, reading the orders, the sixth order and doubled consonants |
| Cherokee ᏣᎳᎩ | Cherokee | all 85 syllables, a lesson per consonant row | articles on Sequoyah's syllabary, reading the chart and consonant clusters |
| Syllabics ᖃᓂᐅᔮᖅᐸᐃᑦ | Inuktitut | the i, u, a series and finals for each consonant | articles on syllabics, how the shapes turn, and long vowels |
| Mongolian ᠮᠣᠩᠭᠣᠯ | Mongolian (Inner Mongolia) | vowels, native consonants, letters for borrowed words; shown vertically | articles on the script, letter shapes in words, spelling and speech |
| Thai ไทย | Thai (RTGS, doubled long vowels) | middle-, high- and low-class consonants, vowels on ก, tone marks | each consonant with its traditional name word; articles on consonant classes, vowel positions and word breaks |
| Lao ລາວ | Vientiane Lao | middle-, high- and low-class consonants (with ໜ and ໝ), vowels on ກ | articles on Lao and Thai, classes and tones, and the silent ຫ |
| Khmer ខ្មែរ | Khmer (letter names; simplified UNGEGN) | the chart in rows of five, vowels on ក | articles on the two consonant series, subscript letters and independent vowels |
| Tibetan བོད་ཡིག | Lhasa Tibetan (Wylie) | the 30 letters in rows of four, the four vowel signs | articles on the tsheg and syllables, spelling and sound, and high and low tones |

Every character has:

- **Stroke order**: an animated, numbered drawing for each form (capital and small letters are animated side by side), replayable from the detail page, the flashcard back and the writing screen
- **Writing practice that checks each stroke**: the same pad as SquirrelGo Klingon. A good stroke snaps to the clean shape; a wrong one, or one drawn backwards, is wiped with a hint. Pairs like Σ σ ς get a button for each form. Guide, Hint, Undo, Clear, and a switch to turn checking off
- **IPA** next to the romanization
- **Recorded sounds** for the letter and its example word, so audio and the listening quiz work with no text-to-speech voice installed. The device voice is still used for anything without a recording

## Sounds

Recordings are made with eSpeak NG by `SquirrelGo-Apps/tools/alphabet_audio.py` and committed under `www/audio/<script>/`, with a map from spoken text to clip in `www/data/audio/<script>.js`. Each letter clip says the letter's sound: a consonant is said with the vowel a after it (б as ба), a vowel from its IPA. Example words are read in their own language (Latin examples carry a language tag). eSpeak NG has no voice for Lao, Khmer or Tibetan, so their clips are made from IPA with `SquirrelGo-Apps/tools/ipa_audio.py` (through the Hindi phoneme table, without tones): the letter from its IPA and the example word from the example IPA given with the character. Hebrew, Cherokee, syllabics and Mongolian set `audio: "ipa"` in their data and are recorded from IPA the same way, because eSpeak spells pointed Hebrew out letter by letter and reads the others badly. Clips are mono MP3 at 32 to 40 kbps, about 2 to 3 KB each.

## Stroke order

Stroke paths live in `www/data/strokes/<script>.js`, in a 100 × 100 box. They are drafted by `SquirrelGo-Apps/tools/strokegen` from the outlines of the Noto fonts (SIL Open Font License): the glyph is thinned to its centre line and walked into pen strokes, which start where a hand would (top first, then left, or right for right-to-left scripts), split at sharp corners and draw dots and accents last. Thai and Lao letters start at their head, the small loop, and are drawn in one stroke where the shape allows; Tibetan and Khmer drafts follow the font's centre line and are rougher. Letters where the draft did not match how people write them are drawn by hand in `tools/strokegen/overrides/`; accented letters reuse the hand-drawn base letter. Where a script has no fixed standard, the orders are suggestions for smooth handwriting.

## Install the APK

Download [`SquirrelGoAlphabets-debug.apk`](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-alphabets-latest/SquirrelGoAlphabets-debug.apk) from the **SquirrelGo Alphabets (latest build)** pre-release ([release page](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-alphabets-latest)) and sideload it. The `SquirrelGo Alphabets APK` GitHub Actions workflow rebuilds and republishes it on every push to `main` that touches this folder; builds on other branches are only uploaded as run artifacts.

- Package id: `com.squirelworks.squirrelgoalphabets.debug`
- Min Android: 7.0 (API 24)

## Web / desktop

Open `www/index.html` in a browser (no build step).

## Adding a script

1. Add `www/data/<script>.js` that pushes a script object onto `window.SG_SCRIPTS` (copy `greek.js` for the shape). Each character is `[letter, romanization, hint, example, example romanization, meaning, text to speak, IPA, example language, example IPA]`; the last four are optional. Give the example IPA when eSpeak NG has no voice for the language, so the example can be recorded from it.
2. Add a spec in `SquirrelGo-Apps/tools/strokegen/specs/`, fetch its font with `fetch-fonts.sh`, then run `strokegen.py specs/<script>.json --sheet sheet.png --out <this app>/www/data/strokes`. Check the contact sheet and hand-draw any letter that needs it in `overrides/<script>.json`.
3. Run `SquirrelGo-Apps/tools/alphabet_audio.py <script>` to record the sounds.
4. Add the three `<script>` tags (data, strokes, audio) to `www/index.html`.

`www/js/` is shared with SquirrelGo Kana; keep the two copies the same.

## Rebuild Android APK locally

Same steps as SquirrelGo Kana: copy `www` into `android/app/src/main/assets/www`, then `./gradlew assembleDebug` in `android/`.
