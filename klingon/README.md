# tlhIngan Hol — Klingon Teacher

A simple, self-contained web app for learning the Klingon language with a focus on the **pIqaD** script (not just Latin romanization).

## Features

- The 26 pIqaD letters with sound descriptions and example words
- Type in pIqaD: type the standard romanization and see it in pIqaD as you type, with an on-screen pIqaD keyboard and a copy button
- Handwriting pad: trace each letter over a faint guide, then write it from memory
- pIqaD digits and Klingon number words
- Core vocabulary and reader sentences shown in pIqaD with romanization and meaning
- Quizzes: sound to letter, letter to sound, and pIqaD word to meaning

## How to use

Open `index.html` in any modern browser. No build step or dependencies required.

## pIqaD on computers

pIqaD is not in the official Unicode standard. The app uses the ConScript Unicode Registry layout in the Private Use Area: letters U+F8D0–U+F8E9 in alphabetical order (a b ch D e gh H I j l m n ng o p q Q r S t tlh u v w y '), digits U+F8F0–U+F8F9, comma U+F8FD, full stop U+F8FE. Text in that range only displays where a pIqaD font is installed.

The app ships the `pIqaD qolqoS` font by Daniel Dadap under the SIL Open Font License (`fonts/OFL.txt`). `fonts/piqad.css` embeds it as a data URL because browsers refuse to load font files over `file://`; regenerate it from `fonts/pIqaD-qolqoS.ttf` if the font changes. To read copied pIqaD elsewhere, install `fonts/pIqaD-qolqoS.ttf` on your system.

This is part of the LanguageStudentDesk project.

Qapla'!
