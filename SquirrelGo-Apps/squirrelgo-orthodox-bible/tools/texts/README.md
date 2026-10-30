# Orthodox Bible texts: sources, licenses and build

These scripts produce everything under `www/data/` except `books.js`:
the Bibles (`bibles/<id>.js`), the patristic commentary (`commentary/<id>.js`),
the verse-numbering map (`versification.js`) and `catalog.js`.

Only **public-domain** texts are included. Nothing here comes from the
Orthodox Study Bible (its NKJV text, its St Athanasius Academy Septuagint and
its notes are copyrighted by Thomas Nelson) or from the Catena app.

## Bibles

| id | Text | Language | Numbering | Source | License |
| --- | --- | --- | --- | --- | --- |
| `grc-brenton` | Septuagint, Greek text of Brenton's 1851 edition (Vaticanus based), with the deuterocanonical books | Koine Greek | lxx | [eBible.org grcbrent](https://ebible.org/details.php?id=grcbrent) | Public domain |
| `eng-brenton` | Brenton's English Septuagint (1851) | English | lxx | [eBible.org eng-Brenton](https://ebible.org/details.php?id=eng-Brenton) | Public domain |
| `grc-antoniades` | Patriarchal Text of the New Testament, Antoniades 1904/1912, the official text of the Ecumenical Patriarchate (unaccented transcription by M. A. Robinson) | Koine Greek | kjv | [byztxt/greektext-antoniades](https://github.com/byztxt/greektext-antoniades) | Public domain dedication |
| `grc-byz` | Byzantine Textform NT, Robinson–Pierpont (accented) | Koine Greek | kjv | [byztxt/byzantine-majority-text](https://github.com/byztxt/byzantine-majority-text) | Public domain dedication |
| `rus-synodal` | Russian Synodal Bible (1876) | Russian | rso | [scrollmapper](https://github.com/scrollmapper/bible_databases) `RusSynodal` (CrossWire SWORD module) | Public domain |
| `csl-elizabeth` | Elizabeth Bible (1757), in civil Cyrillic spelling | Church Slavonic | rso | scrollmapper `CSlElizabeth` (CrossWire) | Public domain |
| `srp-danicic-karadzic` | Vuk Karadžić NT (1847) and Đura Daničić OT (1865), ijekavian | Serbian (Cyrillic) | kjv | scrollmapper `SrKDIjekav` (CrossWire) | Public domain |
| `fra-giguet` | Pierre Giguet's French Septuagint (1872), OT only | French | lxx (approximate, see below) | scrollmapper `FreLXXGiguet` (CrossWire) | Public domain |
| `ell-vamvas` | Neophytos Vamvas (1850) | Modern Greek | kjv | scrollmapper `GreVamvas` (CrossWire) | Public domain |
| `arb-vandyck` | Smith–Van Dyck Arabic Bible (1865) | Arabic | kjv | [eBible.org arb-vd](https://ebible.org/details.php?id=arb-vd) | Public domain |
| `kjva` | King James Version with Apocrypha (1769) | English | kjv | scrollmapper `KJVA` | Public domain |

scrollmapper/bible_databases is MIT licensed; the license of each text is the
one its source module declares (`sources/<lang>/<id>/README.md` there).

### Considered and left out

- **Byzantine NT from scrollmapper (`Byz`)**: that module is marked CC BY-NC-SA,
  so `grc-byz` is built from byztxt's public-domain files instead.
- **Rahlfs-Hanhart / CCAT Septuagint**: copyrighted (Deutsche Bibelgesellschaft).
  Swete's LXX is public domain, but the only digital copy found
  (eliranwong/LXX-Swete-1930) is GPL-3.0, so Brenton's Greek is used.
- **Ohienko's Ukrainian Bible (1962)**: the translator died in 1972, so it is
  very likely still in copyright despite being marked public domain in some modules.
- **Romanian and Georgian Orthodox Bibles**: no public-domain digital Orthodox
  edition was found. Cornilescu (Romanian) is a Protestant translation.
- **The eBible corpus line-per-verse files** (BibleNLP/ebible): they squeeze
  every Bible into one verse list, which drops LXX verses that have no
  Hebrew-numbered slot (for example Psalm 9:22-39), so the original USFM is
  used instead.

## Verse numbering

`versification.js` maps the `lxx` and `rso` schemes to KJV numbering. It is
generated from the standard Paratext/SIL versification files (`lxx.vrs`,
`rso.vrs`, `eng.vrs`, also in [sillsdev/libpalaso](https://github.com/sillsdev/libpalaso),
MIT) by composing each scheme's map to the "original" scheme with the
inverse of the English one. Psalm titles that are numbered as verses map to
`null`. `build_versification.py --check` lists chapters whose verse count
differs from the declared scheme; most differences are a verse or two (for
example Romans 14:24-26 in the Byzantine text, which the KJV prints as
16:25-27). Giguet's French follows the SWORD LXX layout, which does not
number psalm titles the same way, so its psalms can be a verse or two off.

## Patristic commentary

From the [Historical Christian Faith Commentaries Database](https://github.com/HistoricalChristianFaith/Commentaries-Database)
(compilation dedicated to the public domain). That database also holds short
fair-use excerpts from modern copyrighted translations (for example the Ancient
Christian Commentary on Scripture and the Fathers of the Church series), so
`build_commentary.py` keeps only:

- works whose English text is a public-domain translation: the Ante-Nicene and
  Nicene & Post-Nicene Fathers, the Oxford Library of the Fathers, Newman's
  edition of the Catena Aurea (1841-45), Pusey's Cyril on John and Payne
  Smith's Cyril on Luke; and anything sourced from newadvent.org/fathers,
  ccel.org or tertullian.org/fathers;
- Fathers the Orthodox Church receives: the Greek and Syriac Fathers, the
  pre-Nicene martyrs and apologists, and the Western pre-schism saints. Origen,
  Tertullian, Eusebius, Theodore of Mopsuestia, Didymus, Pseudo-writings and
  medieval Western authors are excluded. Theophylact, Bede and a few others
  appear only through their quotations in the Catena Aurea, because the
  modern English translations of their own commentaries are copyrighted.

Every note ends with a line naming its work and section. Each Father is one
file; the largest are split by book range so no file is over about 4 MB.

## Rebuilding

```bash
cd SquirrelGo-Apps/squirrelgo-orthodox-bible/tools/texts
./fetch_sources.sh            # GitHub-hosted sources into .cache/ (about 450 MB)
python3 build_bibles.py       # every Bible whose source was fetched
python3 build_commentary.py
python3 build_versification.py --check
python3 build_catalog.py
```

eBible.org texts (`grc-brenton`, `eng-brenton`, `arb-vandyck`): run
`./fetch_sources.sh ebible` first, or run the **SquirrelGo Orthodox Bible
texts (eBible.org)** workflow from the Actions tab, which builds them and
commits the result to the branch.
