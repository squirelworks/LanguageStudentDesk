# Known Bugs

None open.

## Fixed

- **Klingon app showed the wrong script.** `klingon/index.html` used Glagolitic look-alike letters (U+2C4B …) instead of pIqaD, so the alphabet, quiz and Reader texts were not real pIqaD. It now uses the ConScript pIqaD code points with a bundled font. The Star-Spangled Banner and Pledge of Allegiance texts were made of those wrong letters and had no Klingon translation behind them, so the Reader now uses well-known Klingon sentences instead.
