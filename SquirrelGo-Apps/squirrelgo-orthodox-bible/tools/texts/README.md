# Orthodox Bible texts: sources, licenses and build

These scripts produce everything under `www/data/` except `books.js` and
`paschalion.js`: the Bibles (`bibles/<id>.js`), the patristic commentary
(`commentary/<id>.js`), the verse-numbering map (`versification.js`),
the daily-readings tables (`lectionary.js`) and `catalog.js`.

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

### Downloadable packs

These are too large to ship inside the APK (the bundled Bibles above already
take most of its size), so the app downloads them on request. They are listed
as `PACKS` in `sources.py`. `build_bibles.py --packs` writes them to
`packs/bibles/<id>.js` (not committed; same format as `www/data/bibles/`) and
records them in `packs.json`, which `build_catalog.py` merges into
`catalog.js` with two extra fields: `url` and `size` (bytes). The
**SquirrelGo Orthodox Bible text packs** workflow builds them and force-pushes
`packs/` as a single commit to the data-only branch `orthodox-bible-texts`, so
the url is
`https://raw.githubusercontent.com/squirelworks/LanguageStudentDesk/orthodox-bible-texts/bibles/<id>.js`.
raw.githubusercontent.com allows cross-origin reads (a GitHub release asset
does not), and the app parses the file as JSON rather than running it.

<!-- packs table: regenerate from sources.PACKS and packs.json -->
| id | Text | Language | Books | Numbering | Source | License |
| --- | --- | --- | --- | --- | --- | --- |
| `syc-peshitta` | ܐܘܢܓܠܝܘܢ (Syriac Peshitta New Testament) | syc | NT | kjv | scrollmapper `Peshitta` (CrossWire) | Public Domain |
| `cop-sahidic` | ⲧⲅⲣⲁⲫⲏ ⲉⲧⲟⲩⲁⲁⲃ (Coptic Sahidic Bible) | cop | OT, NT, deuterocanon | lxx | scrollmapper `CopSahBible2` (CrossWire) | CC BY-SA (CrossWire CopSahBible2 module; share alike) |
| `hye-eastern` | Աստվածաշունչ (Eastern Armenian, partial) | hy | OT, NT | kjv | scrollmapper `ArmEastern` (CrossWire) | Public Domain |
| `lat-vulgate-clementine` | Biblia Sacra Vulgata (Clementine Vulgate, 1592) | la | OT, NT, deuterocanon | vul | scrollmapper `VulgClementine` (CrossWire) | Public Domain |
| `got-wulfila` | 𐌱𐌰𐌹𐌱𐌻𐌴𐌹 (Gothic Bible of Bishop Wulfila, 4th century, surviving portions) | got | OT, NT | kjv | scrollmapper `Wulfila` (CrossWire) | Public Domain |
| `heb-wlc` | תנ״ך (Hebrew Masoretic Text, Westminster Leningrad Codex) | he | OT | org | scrollmapper `WLC` (CrossWire) | Public Domain |
| `rus-makarij` | Пятикнижие Моисея (Russian, Archimandrite Makarius Glukharev) | ru | OT | kjv | scrollmapper `RusMakarij` (CrossWire) | Public Domain |
| `srp-danicic-karadzic-ekavian` | Свето писмо (Serbian, Daničić–Karadžić, ekavian) | sr | OT, NT | kjv | scrollmapper `SrKDEkavski` (CrossWire) | Public Domain |
| `fin-biblia-1776` | Biblia (Finnish, 1776) | fi | OT, NT, deuterocanon | kjv | scrollmapper `FinBiblia` (CrossWire) | Public Domain |
| `fin-pr-1938` | Pyhä Raamattu (Finnish, 1933/1938) | fi | OT, NT, deuterocanon | kjv | scrollmapper `FinPR` (CrossWire) | Public Domain |
| `pol-gdanska` | Biblia Gdańska (Polish, 1881 edition) | pl | OT, NT | kjv | scrollmapper `PolGdanska` (CrossWire) | Public Domain |
| `ces-kralicka` | Bible kralická (Czech, 1613) | cs | OT, NT | kjv | scrollmapper `CzeBKR` (CrossWire) | Public Domain |
| `slv-stritar` | Novi testament in Psalmi (Slovene, Stritar) | sl | OT, NT | org | scrollmapper `SloStritar` (CrossWire) | Public Domain |
| `hun-karoli` | Károli Biblia (Hungarian, 1908 revision) | hu | OT, NT | org | scrollmapper `HunKar` (CrossWire) | Public Domain |
| `lav-gluck` | Bībele (Latvian, Glück, 8th edition) | lv | OT, NT | kjv | scrollmapper `LvGluck8` (CrossWire) | Public Domain |
| `eng-drc` | Douay-Rheims Bible, Challoner Revision (1752) | en | OT, NT, deuterocanon | vul | scrollmapper `DRC` (CrossWire) | Public Domain |
| `eng-cpdv` | Catholic Public Domain Version | en | OT, NT, deuterocanon | vul | scrollmapper `CPDV` (CrossWire) | Public Domain |
| `eng-nheb` | New Heart English Bible | en | OT, NT | kjv | scrollmapper `NHEB` (CrossWire) | Public Domain |
| `eng-asv` | American Standard Version (1901) | en | OT, NT | kjv | scrollmapper `ASV` (CrossWire) | Public Domain |
| `eng-ylt` | Young's Literal Translation (1898) | en | OT, NT | kjv | scrollmapper `YLT` (CrossWire) | Public Domain |
| `eng-geneva` | Geneva Bible (1599) | en | OT, NT | kjv | scrollmapper `Geneva1599` (CrossWire) | Public Domain |
| `fra-crampon` | La Sainte Bible (French, Augustin Crampon, 1923) | fr | OT, NT, deuterocanon | org | scrollmapper `FreCrampon` (CrossWire) | Public Domain |
| `fra-synodale-nt` | Le Nouveau Testament (French, Version Synodale, 1921) | fr | OT, NT | kjv | scrollmapper `FreSynodale1921` (CrossWire) | Public Domain |
| `deu-menge` | Menge-Bibel (German, 1939) | de | OT, NT, deuterocanon | org | scrollmapper `GerMenge` (CrossWire) | Public Domain |
| `deu-luther-1545` | Luther-Bibel (German, 1545) | de | OT, NT | org | scrollmapper `GerBoLut` (CrossWire) | Public Domain |
| `deu-elberfelder-1905` | Elberfelder Bibel (German, 1905) | de | OT, NT | kjv | scrollmapper `GerElb1905` (CrossWire) | Public Domain |
| `deu-albrecht-nt` | Das Neue Testament (German, Ludwig Albrecht, 1926) | de | OT, NT | kjv | scrollmapper `GerAlbrecht` (CrossWire) | Public Domain |
| `spa-rv1909` | Reina-Valera (Spanish, 1909) | es | OT, NT | kjv | scrollmapper `SpaRV` (CrossWire) | Public Domain |
| `por-biblia-livre` | Bíblia Livre (Portuguese) | pt | OT, NT | kjv | scrollmapper `PorBLivre` (CrossWire) | CC BY 3.0 BR (Bíblia Livre) |
| `nld-statenvertaling` | Statenvertaling met apocriefe boeken (Dutch, 1637) | nl | OT, NT, deuterocanon | kjv | scrollmapper `DutSVVA` (CrossWire) | Public Domain |
| `dan-1871-1907` | Bibelen (Danish, OT 1871, NT 1907) | da | OT, NT | kjv | scrollmapper `DaOT1871NT1907` (CrossWire) | Public Domain |
| `swe-1917` | Bibeln (Swedish, 1917) | sv | OT, NT, deuterocanon | kjv | scrollmapper `Swe1917` (CrossWire) | Public Domain |
| `epo-londona` | La Sankta Biblio (Esperanto, Londona Biblio) | eo | OT, NT | kjv | scrollmapper `Esperanto` (CrossWire) | Public Domain |
| `zho-cuv` | 和合本 (Chinese Union Version, traditional, 1919) | zh | OT, NT | kjv | scrollmapper `ChiUn` (CrossWire) | Public Domain |
| `lzh-cuv-wenli` | 文理和合譯本 (Chinese Union Version, classical Chinese) | lzh | OT, NT | kjv | scrollmapper `ChiUnL` (CrossWire) | Public Domain |
| `jpn-bungo` | 文語訳聖書 (Japanese literary version, Meiji OT 1887, Taishō NT 1917) | ja | OT, NT | kjv | scrollmapper `JapBungo` (CrossWire) | Public Domain |
| `vie-1934` | Kinh Thánh (Vietnamese, 1934) | vi | OT, NT | kjv | scrollmapper `Viet` (CrossWire) | Public Domain |
| `tgl-ang-biblia` | Ang Biblia (Tagalog, 1905) | tl | OT, NT | kjv | scrollmapper `TagAngBiblia` (CrossWire) | Public Domain |
| `mya-judson` | သမ္မာကျမ်းစာ (Burmese, Judson, 1835) | my | OT, NT | kjv | scrollmapper `BurJudson` (CrossWire) | Public Domain |
| `mal-1910` | സത്യവേദപുസ്തകം (Malayalam, 1910) | ml | OT, NT | kjv | scrollmapper `Mal1910` (CrossWire) | Public Domain |
| `mlg-1865` | Baiboly (Malagasy, 1865) | mg | OT, NT | org | scrollmapper `Mg1865` (CrossWire) | Public Domain |
| `chr-nt-1860` | ᎪᎪᎳᏅ ᏗᎧᎿᏩᏛᏍᏗ (Cherokee New Testament, 1860) | chr | NT | kjv | scrollmapper `Che1860` (CrossWire) | Public Domain |
| `ukr-kulish` | Біблія (Ukrainian, Kulish, Puluj and Nechuy-Levytsky, 1905) | uk | OT, NT | kjv | [eBible.org ukr1871](https://ebible.org/details.php?id=ukr1871) | Public Domain |
| `eng-lxx2012` | LXX2012: Septuagint in American English | en | OT, deuterocanon | lxx | [eBible.org eng-lxx2012](https://ebible.org/details.php?id=eng-lxx2012) | Public Domain |
| `eng-web` | World English Bible with Deuterocanon | en | OT, NT, deuterocanon | kjv | [eBible.org eng-web](https://ebible.org/details.php?id=eng-web) | Public Domain |
| `eng-rv` | Revised Version with Apocrypha (1895) | en | OT, NT, deuterocanon | kjv | [eBible.org eng-rv](https://ebible.org/details.php?id=eng-rv) | Public Domain |
| `ita-riveduta` | La Sacra Bibbia Riveduta (Italian, Giovanni Luzzi, 1927) | it | OT, NT | kjv | [eBible.org ita1927](https://ebible.org/details.php?id=ita1927) | Public Domain |
| `ita-diodati` | La Sacra Bibbia (Italian, Diodati, 1885 revision) | it | OT, NT | kjv | [eBible.org ita1885](https://ebible.org/details.php?id=ita1885) | Public Domain |
| `fra-segond` | La Sainte Bible (French, Louis Segond, 1910) | fr | OT, NT | org | [eBible.org fraLSG](https://ebible.org/details.php?id=fraLSG) | Public Domain |
| `fra-bible-libre` | Sainte Bible libre pour le monde (French) | fr | OT, NT, deuterocanon | kjv | [eBible.org frasbl](https://ebible.org/details.php?id=frasbl) | Public Domain |
| `spa-biblia-libre` | Santa Biblia libre para el mundo (Spanish) | es | OT, NT, deuterocanon | kjv | [eBible.org spablm](https://ebible.org/details.php?id=spablm) | Public Domain |
| `cmn-cuv-simplified` | 和合本 (Chinese Union Version, simplified) | zh | OT, NT | kjv | [eBible.org cmn-cu89s](https://ebible.org/details.php?id=cmn-cu89s) | Public Domain |
| `pes-opv` | کتاب مقدس (Persian, Old Persian Version) | fa | OT, NT | kjv | [eBible.org pesOPV](https://ebible.org/details.php?id=pesOPV) | Public Domain |
| `swh-krapf-nt` | Agano Jipya (Swahili, Krapf, 1850) | sw | NT | kjv | [eBible.org swh1850](https://ebible.org/details.php?id=swh1850) | Public Domain |
| `hin-irv` | पवित्र बाइबिल (Hindi, Indian Revised Version, 2017) | hi | OT, NT | kjv | [eBible.org hin2017](https://ebible.org/details.php?id=hin2017) | CC BY-SA 4.0 (Bridge Connectivity Solutions) |

Numbering `org` is the Hebrew one (psalm titles counted as verses, Malachi in
three chapters) and `vul` the Vulgate's. Partial texts: the Peshitta, Cherokee,
French Synodale and Albrecht are New Testament only, the Armenian has Genesis,
Exodus and the Gospels, Makarius's Russian is the Pentateuch, Stritar's
Slovene is the New Testament and Psalms, and the Gothic is what survives of
Wulfila's Bible. The Coptic Sahidic text is CC BY-SA: anything derived from
that file must keep the same license and credit the CrossWire module.

### Considered and left out

- **Byzantine NT from scrollmapper (`Byz`)**: that module is marked CC BY-NC-SA,
  so `grc-byz` is built from byztxt's public-domain files instead.
- **Rahlfs-Hanhart / CCAT Septuagint**: copyrighted (Deutsche Bibelgesellschaft).
  Swete's LXX is public domain, but the only digital copy found
  (eliranwong/LXX-Swete-1930) is GPL-3.0, so Brenton's Greek is used.
- **Ohienko's Ukrainian Bible (1962)**: the translator died in 1972, so it is
  very likely still in copyright despite being marked public domain in some modules.
- **Romanian and Georgian Orthodox Bibles**: no public-domain digital Orthodox
  edition was found. Cornilescu (Romanian, also eBible `ron1924`) is a
  Protestant translation still claimed in copyright; the Fidela (`ronbtf`) is
  copyright Brian James Nibbe, 2015; Biblia Liberă (`ronbl`) is an unfinished
  NT draft. The Georgian text in Beblia/Holy-Bible-XML-Format (scraped from
  orthodox.ge) has no license from its publisher, so it is left out.
- **No public-domain digital text found**: Bulgarian Synodal (1925/1940),
  Macedonian, Belarusian (eBible's are CC BY-NC), Ge'ez/Ethiopic and Amharic
  (© United Bible Societies), Classical Armenian.
- **eBible `grclxx`** (Greek Septuagint from Orthodox Media Network): the
  edition is not named, and the common digital LXX is Rahlfs (copyrighted),
  so it is left out until its source is known.
- **Left out of the scrollmapper packs as copyrighted or unclear**: Šarić's
  Croatian Bible (translator died 1960), Straubinger's Spanish Biblia Platense
  (died 1956), the Studium Biblicum Chinese Bible (1968), the Korean Revised
  Version (1961), Schlachter (German), Zürcher 1931, Canisius (Dutch 1939),
  the Grünewald Bible, the Japanese Kougo-yaku (1955), every module marked
  NC, ND or "free non-commercial distribution" (for example CzeCSP, GerLeoNA28,
  SpaRVG, LEB, AKJV, KorHKJV), and modules with no stated license (Estonian,
  Maori, Modern Hebrew NT). The scrollmapper "Albanian Bible" names no
  edition or translator, so it is left out until its source is known.
- **The eBible corpus line-per-verse files** (BibleNLP/ebible): they squeeze
  every Bible into one verse list, which drops LXX verses that have no
  Hebrew-numbered slot (for example Psalm 9:22-39), so the original USFM is
  used instead.

## Verse numbering

`versification.js` maps the `lxx`, `rso`, `vul` and `org` schemes to KJV numbering. It is
generated from the standard Paratext/SIL versification files (`lxx.vrs`,
`rso.vrs`, `vul.vrs`, `org.vrs`, `eng.vrs`, also in [sillsdev/libpalaso](https://github.com/sillsdev/libpalaso),
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
  Tertullian, Eusebius, Theodore of Mopsuestia, Didymus, non-Chalcedonian
  writers (Philoxenus, Dionysius bar Salibi), Pseudo-writings and medieval
  Western authors are excluded.

Every note ends with a line naming its work and section. Each Father is one
file; the largest are split by book range so no file is over about 4 MB.

### Downloadable "more" packs

The database's links to historicalchristian.faith point into the
[Writings Database](https://github.com/HistoricalChristianFaith/Writings-Database),
which is dedicated to the public domain as a whole. Beyond the ANF/NPNF texts
it holds the maintainer's own new translations: from Migne's Greek and Latin
(Jerome's commentaries on the prophets and Matthew, Bede's commentaries,
Gregory the Dialogist on Ezekiel, 1 Kings and the Gospels, Ambrose on Luke and
the Psalms, Augustine's sermons, Cyril on Isaiah and the Minor Prophets), many
marked as made with ChatGPT, and from the 19th-century Russian Kazan
translation of Blessed Theophylact's commentary on the Gospels, Acts and
Epistles. These are public domain but newer and partly machine-made, so they
are kept apart from the bundled set: each Father's extra notes go into
`<id>-more` packs, written to `packs/commentary/` and listed in
`commentary_packs.json`, which the app downloads on request (see the packs
workflow). A Father's extras under about 100 KB are bundled instead.

Left out of the packs because they are modern translations still in copyright:

| Work in the database | Translation |
| --- | --- |
| Theophylact, Commentary on Matthew | Chrysostom Press (Fr Christopher Stade), 1992 |
| Oecumenius, all commentaries (Acts, Catholic and Pastoral Epistles, Galatians, Hebrews catena, Revelation) | John Litteral, sold in print |
| Jerome, Commentary on Ecclesiastes (first version) | Robin McGregor, no license stated |
| Andrew of Caesarea, Ephrem, Theodoret, Severian, Chrysostom on Genesis/Job/Psalms, Isaac the Syrian and others | only short excerpts of modern copyrighted editions (ACCS, FOTC and similar) |

Notes whose text is a failed machine translation ("I cannot provide...") are dropped.

### Greek originals (downloadable packs)

So a Father's note can be read in the language he wrote it in, beside the
English and Russian, `build_commentary_grc.py` (called from
`build_commentary.py`) builds Greek packs (`"lang": "grc"`) from
[First1KGreek](https://github.com/OpenGreekAndLatin/First1KGreek) (Open Greek
and Latin, University of Leipzig), licensed **CC BY-SA 4.0**. The license and
source are in each pack's first line and catalog entry; anyone who
redistributes these packs must credit First1KGreek and keep the same license.
`fetch_sources.sh` checks out only the two folders used.

| Pack | Text | Edition |
| --- | --- | --- |
| `catena-grc-*` | Catenae of the Greek Fathers on the whole New Testament (Chrysostom, Cyril of Alexandria, Severian, Theodoret, Isidore of Pelusium, Ammonius and others, each fragment headed with its author), with a second catena on Romans 7-16 and two on Revelation | J. A. Cramer, *Catenae Graecorum Patrum in Novum Testamentum*, Oxford 1838-44 (First1KGreek tlg4102) |
| `cyril-alexandria-grc` | St Cyril of Alexandria on the Twelve Prophets | P. E. Pusey, Oxford 1868 (First1KGreek tlg4090.tlg001) |

Neither edition numbers verses. Each prints the passage it explains as a short
paragraph (the lemma), so a lemma is matched word for word (accents ignored)
against the Greek Bible in the app, Robinson-Pierpont for the New Testament and
Brenton's Septuagint (`lxx` numbering) for the Prophets, moving forward
through the book; a comment that quotes a verse a little further on starts a
note on that verse. The lemma itself is not repeated in the note. Catena
fragments by Apollinaris, Theodore (of Mopsuestia or Heraclea), Didymus,
Origen, Eusebius or Severus of Antioch are left out: those headed with the name
or opening on it ("Θεόδωρος δέ φησι"), and the "Τοῦ αὐτοῦ" fragments that
follow them. Fathers who only mention one of them are kept. The text is the editors' Greek as OCR'd by First1KGreek, so it has the
occasional misread letter.

### Latin originals (downloadable packs)

`build_commentary_lat.py` builds Latin packs (`"lang": "la"`) from Open Greek
and Latin's [CSEL edition](https://github.com/OpenGreekAndLatin/csel-dev)
(Corpus Scriptorum Ecclesiasticorum Latinorum), also **CC BY-SA 4.0**, with
the same credit and share-alike terms.

| Pack | Text | Edition |
| --- | --- | --- |
| `ambrose-lat` | St Ambrose of Milan on St Luke, on twelve Psalms (1, 35-40, 43, 45, 47, 48, 61) and on Psalm 118 | CSEL 32.4 (Schenkl, 1902), CSEL 64 (Petschenig, 1919), CSEL 62 (Petschenig, 1913) |
| `hilary-lat` | St Hilary of Poitiers, Tractatus super psalmos (58 Psalms, with Psalm 118 by letter) | CSEL 22 (Zingerle, 1891) |

The Luke commentary prints the verse each section discusses in its margin,
which gives the key. The Psalm commentaries are split by Psalm and numbered
section, and each section is keyed to the verse of that Psalm it quotes first,
matched word pair by word pair against the Clementine Vulgate pack (so
`fetch_sources.sh` and `build_bibles.py --packs` must run first, as the packs
workflow does). Notes use the Vulgate numbering (`vul`): Psalm 118 there is
Psalm 119 in the KJV, and Psalm titles are verse 1. Victorinus of Pettau on
Revelation is in the same collection but left out for now: the edition prints
Victorinus's text and St Jerome's revision of it side by side, and they are
not yet told apart.

### Russian commentaries (downloadable packs)

Pre-revolutionary Russian translations from [azbyka.ru/otechnik](https://azbyka.ru/otechnik/),
listed in `sources_ru.py`. azbyka.ru is not reachable from every build
machine, so the **SquirrelGo Orthodox Bible Russian sources** workflow runs
`fetch_azbyka.py` (one request a second) and force-pushes the gzipped pages to
the data-only branch `orthodox-bible-sources-ru`, which `fetch_sources.sh`
clones. `build_commentary_ru.py`, called from `build_commentary.py`, turns
each verse heading (`<p class="h5">` with a verse link) and the paragraphs
after it into notes, numbered in the Synodal scheme (`rso`), so Psalm 50 there
is Psalm 51 in the KJV.

| Pack | Text | Edition on azbyka.ru |
| --- | --- | --- |
| `theophylact-ru-*` | Blessed Theophylact on the Gospels (including Matthew), Acts and Epistles | Благовестник, the 19th-century Kazan / St Petersburg translation (Kiev Lavra reprint, 2006) |
| `euthymius-ru-*` | Euthymius Zigabenus on the Psalter, Matthew, John, Titus and Hebrews | Kiev 1886-87 and 1907, Tula 1894 and 1897 |
| `theodoret-ru-*` | Blessed Theodoret on the Psalms, Song of Songs, the Prophets and St Paul | Moscow Theological Academy, Творения, 1855-1861 (and its 2003 reprint) |
| `andrew-caesarea-ru` | St Andrew of Caesarea on Revelation | Archpriest Michael Bogoslovsky, Moscow 1884 |

`build_commentary_ru.py` reads each book's edition line and leaves out any
book whose edition is later than 1925, unless it is a known reprint of the
19th-century translation (`ACCEPT_REPRINT`), or names a modern translator
(`REJECT_SOURCE`). Left out this way: Euthymius on Luke (a modern translation
by Hieromonk Theodore Yulaev, exeget.ru) and Euthymius on 1-2 Timothy (no
edition given). Theodoret's question-and-answer works on the Octateuch and
Kings are not laid out verse by verse, so they give no notes.

### Not yet available

Oecumenius on Revelation and Ephrem's commentaries have no public-domain text
keyed to verses that could be found. The Philokalia (Theophan the Recluse's
Russian, 1877-1890, public domain) is not a commentary on verses, so it would
only appear through the verses it quotes. The Russian Chrysostom (St
Petersburg Theological Academy, 1895-1906) is the next large source.

## Daily readings

`lectionary.js` comes from the calendar tables of [Orthocal](https://github.com/brianglass/orthocal-python)
(MIT, pinned to one commit in `fetch_sources.sh`): the Slavic lectionary as
audited against oca.org, giving which pericope is read on each day of the
Paschal cycle, each fixed (Menaion) date and each floating feast, plus the
day titles and the names of the saints. `build_lectionary.py` keeps only
those references and names. The lives of the saints in the same tables
come from copyrighted sources and are not copied, nor is the Scripture text
Orthocal stitches together for composite readings; the app shows the text
from its own Bibles.

`www/data/paschalion.js` is a JavaScript port of Orthocal's Slavic
calculator: Pascha, the Lukan jump, the Sunday Gospels kept for the weeks
after Theophany, the floating Saturdays and Sundays around the Elevation,
Nativity and Theophany, the Annunciation, moved Lenten Vespers readings,
and the Old Calendar (Menaion dates on the Julian calendar, modern
commemorations kept on their civil date). It reproduces Orthocal's own test
data exactly (all of January 2022, Theophany 2023, and its year tests).
The Greek (GOA/Antiochian) Sunday numbering and fasting rules are not
included yet.

## Rebuilding

```bash
cd SquirrelGo-Apps/squirrelgo-orthodox-bible/tools/texts
./fetch_sources.sh            # GitHub-hosted sources into .cache/ (about 450 MB)
python3 build_bibles.py       # every Bible whose source was fetched (packs go to packs/)
python3 build_commentary.py     # bundled files, plus packs/commentary/ and commentary_packs.json
python3 build_versification.py --check
python3 build_catalog.py
python3 build_lectionary.py
```

Downloadable packs: run the **SquirrelGo Orthodox Bible text packs**
workflow (it also runs when `sources.py` changes); it publishes `packs/` and
commits `packs.json`, `catalog.js` and `versification.js`.

Bundled eBible.org texts (`grc-brenton`, `eng-brenton`, `arb-vandyck`): run
`./fetch_sources.sh ebible` first, or run the **SquirrelGo Orthodox Bible
texts (eBible.org)** workflow from the Actions tab, which builds them and
commits the result to the branch.
