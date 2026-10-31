# tlhIngan Hol — Klingon Teacher

A simple, self-contained web app for learning the Klingon language with a focus on the **pIqaD** script (not just Latin romanization).

## Features

- The 26 pIqaD letters with sound descriptions and example words
- Type in pIqaD: type the standard romanization and see it in pIqaD as you type, with an on-screen pIqaD keyboard and a copy button
- Stroke order: every letter and numeral animates stroke by stroke, with numbered starting points
- Handwriting pad that checks each stroke: a good stroke snaps to the clean shape, a wrong or backwards one is wiped with a hint. Trace over a guide or write from memory; checking can be turned off for free drawing
- pIqaD digits and Klingon number words
- Core vocabulary and reader sentences shown in pIqaD with romanization and meaning
- Quizzes: sound to letter, letter to sound, and pIqaD word to meaning

## How to use

Open it from the Desk (`python3 LanguageStudentDesk.py`), which serves the repository on `127.0.0.1`. No build step or dependencies required.

## Shared with SquirrelGo Klingon

The stroke orders and the checked writing pad are loaded from [SquirrelGo Klingon](../SquirrelGo-Apps/squirrelgo-characters/squirrelgo-klingon/) rather than copied, so the Desk and the Android app teach the same strokes:

- `www/data/strokes.js`: stroke paths for every letter and numeral
- `www/js/strokes.js`: SVG drawing, animation and stroke matching
- `www/js/writepad.js`: the checked writing pad

The last two are the same stroke player and pad every SquirrelGo character app uses; their source is `SquirrelGo-Apps/shared/`, copied into each app by `SquirrelGo-Apps/tools/sync-shared.sh`. The pad draws in this page's `--accent` color.

These load by relative path, so open the app from the repository tree. `js/pad.js` (the old freehand pad) is no longer loaded.

## pIqaD on computers

pIqaD is not in the official Unicode standard. The app uses the ConScript Unicode Registry layout in the Private Use Area: letters U+F8D0–U+F8E9 in alphabetical order (a b ch D e gh H I j l m n ng o p q Q r S t tlh u v w y '), digits U+F8F0–U+F8F9, comma U+F8FD, full stop U+F8FE. Text in that range only displays where a pIqaD font is installed.

The app ships the `pIqaD qolqoS` font by Daniel Dadap under the SIL Open Font License (`fonts/OFL.txt`). `fonts/piqad.css` embeds it as a data URL because browsers refuse to load font files over `file://`; regenerate it from `fonts/pIqaD-qolqoS.ttf` if the font changes. To read copied pIqaD elsewhere, install `fonts/pIqaD-qolqoS.ttf` on your system.

This is part of the LanguageStudentDesk project.

Qapla'!
