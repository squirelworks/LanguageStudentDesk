"""Every Bible the app ships, with where it comes from and its license.

Only public-domain texts are listed. Copyrighted Orthodox translations
(the Orthodox Study Bible / NKJV and its notes, the EOB, Rahlfs-Hanhart,
the Romanian Anania Bible, Ohienko's Ukrainian, and so on) are left out on
purpose. See README.md for the reasoning behind each choice.
"""

SM = "https://raw.githubusercontent.com/scrollmapper/bible_databases/master/formats/json/"
BYZ = "https://raw.githubusercontent.com/byztxt/"

BIBLES = [
    {
        "id": "grc-brenton",
        "name": "Ἡ Παλαιὰ Διαθήκη κατὰ τοὺς Ἑβδομήκοντα (Septuagint, Brenton's Greek, 1851)",
        "lang": "grc", "script": "Grek", "dir": "ltr", "versification": "lxx",
        "license": "Public Domain",
        "source": "https://ebible.org/details.php?id=grcbrent",
        "notes": "Greek text printed in Brenton's 1851 edition (Codex Vaticanus based). Old Testament with the deuterocanonical books.",
        "format": "ebible", "ebible": "grcbrent",
    },
    {
        "id": "eng-brenton",
        "name": "Brenton's English Septuagint (1851)",
        "lang": "en", "script": "Latn", "dir": "ltr", "versification": "lxx",
        "license": "Public Domain",
        "source": "https://ebible.org/details.php?id=eng-Brenton",
        "notes": "Sir Lancelot C. L. Brenton's translation of the Septuagint, the English Old Testament most used by English-speaking Orthodox before the OSB.",
        "format": "ebible", "ebible": "eng-Brenton",
    },
    {
        "id": "grc-antoniades",
        "name": "Πατριαρχικὸν Κείμενον (Patriarchal Text, Antoniades 1904/1912)",
        "lang": "grc", "script": "Grek", "dir": "ltr", "versification": "kjv",
        "license": "Public Domain",
        "source": "https://github.com/byztxt/greektext-antoniades",
        "notes": "New Testament of the Ecumenical Patriarchate, edited by Vasileios Antoniades. Transcribed by Maurice A. Robinson without accents.",
        "format": "antoniades",
    },
    {
        "id": "grc-byz",
        "name": "Byzantine Textform Greek NT (Robinson–Pierpont 2018)",
        "lang": "grc", "script": "Grek", "dir": "ltr", "versification": "kjv",
        "license": "Public Domain",
        "source": "https://github.com/byztxt/byzantine-majority-text",
        "notes": "The Byzantine majority text, which the Orthodox Church's lectionary text follows closely. Accented.",
        "format": "byzcsv",
    },
    {
        "id": "rus-synodal",
        "name": "Синодальный перевод (Russian Synodal, 1876)",
        "lang": "ru", "script": "Cyrl", "dir": "ltr", "versification": "rso",
        "license": "Public Domain",
        "source": "https://github.com/scrollmapper/bible_databases (formats/json/RusSynodal.json, from the CrossWire SWORD module)",
        "notes": "The Russian Orthodox Church's standard Russian Bible.",
        "format": "scrollmapper", "file": "RusSynodal",
    },
    {
        "id": "csl-elizabeth",
        "name": "Елизаветинская Библия (Church Slavonic Elizabeth Bible, 1757)",
        "lang": "cu", "script": "Cyrl", "dir": "ltr", "versification": "rso",
        "license": "Public Domain",
        "source": "https://github.com/scrollmapper/bible_databases (formats/json/CSlElizabeth.json, from the CrossWire SWORD module)",
        "notes": "The liturgical Bible of the Slavic Orthodox Churches, shown in civil (modern Cyrillic) spelling.",
        "format": "scrollmapper", "file": "CSlElizabeth",
    },
    {
        "id": "srp-danicic-karadzic",
        "name": "Свето писмо (Serbian, Vuk Karadžić & Đura Daničić, 1847/1865)",
        "lang": "sr", "script": "Cyrl", "dir": "ltr", "versification": "kjv",
        "license": "Public Domain",
        "source": "https://github.com/scrollmapper/bible_databases (formats/json/SrKDIjekav.json, from the CrossWire SWORD module)",
        "notes": "The classic Serbian Bible used in the Serbian Orthodox Church, in its original ijekavian form. Translated from the Hebrew canon, so it has no deuterocanonical books.",
        "format": "scrollmapper", "file": "SrKDIjekav",
    },
    {
        "id": "fra-giguet",
        "name": "La Sainte Bible selon les Septante (French Septuagint, Pierre Giguet, 1872)",
        "lang": "fr", "script": "Latn", "dir": "ltr", "versification": "lxx",
        "license": "Public Domain",
        "source": "https://github.com/scrollmapper/bible_databases (formats/json/FreLXXGiguet.json, from the CrossWire SWORD module)",
        "notes": "French translation of the whole Septuagint. Old Testament only.",
        "format": "scrollmapper", "file": "FreLXXGiguet",
    },
    {
        "id": "ell-vamvas",
        "name": "Η Αγία Γραφή (Modern Greek, Neophytos Vamvas, 1850)",
        "lang": "el", "script": "Grek", "dir": "ltr", "versification": "kjv",
        "license": "Public Domain",
        "source": "https://github.com/scrollmapper/bible_databases (formats/json/GreVamvas.json, from the CrossWire SWORD module)",
        "notes": "Modern Greek translation from the Hebrew Old Testament and Greek New Testament. Widely read but never the Church of Greece's official text.",
        "format": "scrollmapper", "file": "GreVamvas",
    },
    {
        "id": "arb-vandyck",
        "name": "الكتاب المقدس (Arabic, Smith–Van Dyck, 1865)",
        "lang": "ar", "script": "Arab", "dir": "rtl", "versification": "kjv",
        "license": "Public Domain",
        "source": "https://ebible.org/details.php?id=arb-vd",
        "notes": "The standard Arabic Bible, widely read in the Antiochian and other Arabic-speaking Orthodox churches. Translated from the Hebrew canon.",
        "format": "ebible", "ebible": "arb-vd",
    },
    {
        "id": "kjva",
        "name": "King James Version with Apocrypha (1769)",
        "lang": "en", "script": "Latn", "dir": "ltr", "versification": "kjv",
        "license": "Public Domain",
        "source": "https://github.com/scrollmapper/bible_databases (formats/json/KJVA.json)",
        "notes": "Long used for the New Testament in English-speaking Orthodox parishes.",
        "format": "scrollmapper", "file": "KJVA",
    },
]

# --- Downloadable packs -------------------------------------------------------
#
# These are too large to bundle in the APK. build_bibles.py writes them to
# packs/bibles/<id>.js (same format as www/data/bibles) and records them in
# packs.json; the "SquirrelGo Orthodox Bible text packs" workflow publishes
# packs/ to the data-only branch below, and build_catalog.py lists them in
# catalog.js with their "url" and "size" so the app can download them.

PACK_BRANCH = "orthodox-bible-texts"
PACK_BASE = ("https://raw.githubusercontent.com/squirelworks/LanguageStudentDesk/"
             + PACK_BRANCH + "/")
PACK_URL = PACK_BASE + "bibles/"
COMMENTARY_PACK_URL = PACK_BASE + "commentary/"

SM_SOURCE = "https://github.com/scrollmapper/bible_databases (formats/json/%s.json, from the CrossWire SWORD module)"


def _sm(id, file, name, lang, script, versification, notes, license="Public Domain", dir="ltr"):
    return {"id": id, "name": name, "lang": lang, "script": script, "dir": dir,
            "versification": versification, "license": license,
            "source": SM_SOURCE % file, "notes": notes,
            "format": "scrollmapper", "file": file, "pack": True}


def _eb(id, ebible, name, lang, script, versification, notes, license="Public Domain", dir="ltr"):
    return {"id": id, "name": name, "lang": lang, "script": script, "dir": dir,
            "versification": versification, "license": license,
            "source": "https://ebible.org/details.php?id=" + ebible, "notes": notes,
            "format": "ebible", "ebible": ebible, "pack": True}


# Versification: "org" is the Hebrew numbering (psalm titles counted as
# verses, Malachi in three chapters), "vul" the Vulgate's, "lxx" the
# Septuagint's; see README.md.
PACKS = [
    # Ancient and liturgical languages of the Orthodox and Oriental churches
    _sm("syc-peshitta", "Peshitta", "ܐܘܢܓܠܝܘܢ (Syriac Peshitta New Testament)", "syc", "Syrc", "kjv",
        "The Peshitta, the Bible of the Syriac churches since the 5th century. New Testament (27 books).",
        dir="rtl"),
    _sm("cop-sahidic", "CopSahBible2", "ⲧⲅⲣⲁⲫⲏ ⲉⲧⲟⲩⲁⲁⲃ (Coptic Sahidic Bible)", "cop", "Copt", "lxx",
        "Sahidic Coptic text, the oldest Coptic version, translated from the Septuagint and Greek NT. Several Old Testament books are fragmentary.",
        license="CC BY-SA (CrossWire CopSahBible2 module; share alike)"),
    _sm("hye-eastern", "ArmEastern", "Աստվածաշունչ (Eastern Armenian, partial)", "hy", "Armn", "kjv",
        "Modern Eastern Armenian translation. Only Genesis, Exodus and the four Gospels are in the source."),
    _sm("lat-vulgate-clementine", "VulgClementine", "Biblia Sacra Vulgata (Clementine Vulgate, 1592)", "la", "Latn", "vul",
        "St Jerome's Latin Bible in the Clementine edition, with the deuterocanonical books. The Bible of the Western Church before and after the schism."),
    _sm("got-wulfila", "Wulfila", "𐌱𐌰𐌹𐌱𐌻𐌴𐌹 (Gothic Bible of Bishop Wulfila, 4th century, surviving portions)", "got", "Goth", "kjv",
        "The surviving fragments of the Gothic translation made by Bishop Wulfila from the Byzantine Greek text, in Gothic script. Gospels, Pauline epistles and part of Nehemiah."),
    _sm("heb-wlc", "WLC", "תנ״ך (Hebrew Masoretic Text, Westminster Leningrad Codex)", "he", "Hebr", "org",
        "The Hebrew Masoretic text of the Old Testament, with vowels and accents. Useful beside the Septuagint.",
        dir="rtl"),
    # Slavonic and Orthodox-country languages
    _sm("rus-makarij", "RusMakarij", "Пятикнижие Моисея (Russian, Archimandrite Makarius Glukharev)", "ru", "Cyrl", "kjv",
        "St Makarius (Glukharev) of Altai's 19th-century Russian translation of the Pentateuch, in pre-reform spelling."),
    _sm("srp-danicic-karadzic-ekavian", "SrKDEkavski", "Свето писмо (Serbian, Daničić–Karadžić, ekavian)", "sr", "Cyrl", "kjv",
        "The classic Serbian Bible in its ekavian form, as read in Serbia. Hebrew canon."),
    _sm("fin-biblia-1776", "FinBiblia", "Biblia (Finnish, 1776)", "fi", "Latn", "kjv",
        "The 1776 Finnish Bible, with the deuterocanonical books."),
    _sm("fin-pr-1938", "FinPR", "Pyhä Raamattu (Finnish, 1933/1938)", "fi", "Latn", "kjv",
        "Finnish Church Bible of 1933/1938, with the deuterocanonical books. Finland's Orthodox Church long used it alongside its own liturgical texts."),
    _sm("pol-gdanska", "PolGdanska", "Biblia Gdańska (Polish, 1881 edition)", "pl", "Latn", "kjv",
        "Polish Gdańsk Bible (1632), 1881 spelling. Hebrew canon."),
    _sm("ces-kralicka", "CzeBKR", "Bible kralická (Czech, 1613)", "cs", "Latn", "kjv",
        "Czech Kralice Bible. Hebrew canon."),
    _sm("slv-stritar", "SloStritar", "Novi testament in Psalmi (Slovene, Stritar)", "sl", "Latn", "org",
        "Slovene New Testament and Psalms by Josip Stritar and others."),
    _sm("hun-karoli", "HunKar", "Károli Biblia (Hungarian, 1908 revision)", "hu", "Latn", "org",
        "Hungarian Károli Bible, 1908 revision. Hebrew canon."),
    _sm("lav-gluck", "LvGluck8", "Bībele (Latvian, Glück, 8th edition)", "lv", "Latn", "kjv",
        "Ernst Glück's Latvian Bible (1689), 8th edition. Hebrew canon."),
    # English
    _sm("eng-drc", "DRC", "Douay-Rheims Bible, Challoner Revision (1752)", "en", "Latn", "vul",
        "English translation of the Vulgate, with the deuterocanonical books and Vulgate (Septuagint) psalm numbering."),
    _sm("eng-cpdv", "CPDV", "Catholic Public Domain Version", "en", "Latn", "vul",
        "Modern English translation of the Clementine Vulgate by Ronald L. Conte Jr., with the deuterocanonical books."),
    _sm("eng-nheb", "NHEB", "New Heart English Bible", "en", "Latn", "kjv",
        "Modern English revision of the World English Bible. Hebrew canon."),
    _sm("eng-asv", "ASV", "American Standard Version (1901)", "en", "Latn", "kjv",
        "Hebrew canon."),
    _sm("eng-ylt", "YLT", "Young's Literal Translation (1898)", "en", "Latn", "kjv",
        "Very literal English translation. Hebrew canon."),
    _sm("eng-geneva", "Geneva1599", "Geneva Bible (1599)", "en", "Latn", "kjv",
        "Hebrew canon."),
    _sm("eng-wycliffe", "Wycliffe", "Wycliffe Bible (Middle English, c. 1395)", "enm", "Latn", "vul",
        "The first complete English Bible, translated from the Vulgate (later Wycliffite version).",
        license="CC BY-SA 4.0 (CrossWire Wycliffe module; share alike)"),
    _sm("eng-tyndale", "Tyndale", "Tyndale Bible (1525/1530, portions)", "en", "Latn", "kjv",
        "William Tyndale's translation: Genesis, the Gospels, Acts, Romans, 1 Corinthians, Hebrews and Revelation in this module."),
    _sm("eng-darby", "Darby", "Darby Bible (1889)", "en", "Latn", "kjv",
        "John Nelson Darby's literal translation. Hebrew canon."),
    _sm("eng-webster", "Webster", "Webster Bible (1833)", "en", "Latn", "kjv",
        "Noah Webster's revision of the King James Version. Hebrew canon."),
    _sm("eng-rotherham", "Rotherham", "The Emphasised Bible (Rotherham, 1902)", "en", "Latn", "kjv",
        "Joseph Bryant Rotherham's literal translation. Hebrew canon."),
    _sm("eng-jps-1917", "JPS", "Jewish Publication Society Old Testament (1917)", "en", "Latn", "org",
        "English translation of the Hebrew Masoretic text. Old Testament only."),
    _sm("eng-noyes", "Noyes", "Noyes Translation (1869)", "en", "Latn", "kjv",
        "George R. Noyes's translation of the New Testament and parts of the Old."),
    _sm("eng-twentieth-century-nt", "Twenty", "Twentieth Century New Testament (1904)", "en", "Latn", "kjv",
        "Early modern-English New Testament. New Testament only."),
    _sm("eng-anderson-nt", "Anderson", "Anderson New Testament (1864)", "en", "Latn", "kjv",
        "Henry Tompkins Anderson's New Testament. New Testament only."),
    _sm("eng-haweis-nt", "Haweis", "Haweis New Testament (1795)", "en", "Latn", "kjv",
        "Thomas Haweis's New Testament. New Testament only."),
    # Western European
    _sm("fra-crampon", "FreCrampon", "La Sainte Bible (French, Augustin Crampon, 1923)", "fr", "Latn", "org",
        "French Catholic translation from the Hebrew and Greek, with the deuterocanonical books."),
    _sm("fra-synodale-nt", "FreSynodale1921", "Le Nouveau Testament (French, Version Synodale, 1921)", "fr", "Latn", "kjv",
        "New Testament only."),
    _sm("fra-perret-gentil", "FrePGR", "Bible Perret-Gentil et Rilliet (French, 1861-1866)", "fr", "Latn", "kjv",
        "Old Testament by Perret-Gentil, New Testament by Rilliet. Hebrew canon."),
    _sm("fra-oltramare-nt", "FreOltramare1874", "Le Nouveau Testament (French, Oltramare, 1874)", "fr", "Latn", "kjv",
        "New Testament only."),
    _sm("fra-stapfer-nt", "FreStapfer1889", "Le Nouveau Testament (French, Stapfer, 1889)", "fr", "Latn", "kjv",
        "New Testament only."),
    _sm("deu-elberfelder-1871", "GerElb1871", "Elberfelder Bibel (German, 1871)", "de", "Latn", "kjv",
        "The first edition of the Elberfelder Bible. Hebrew canon."),
    _sm("deu-textbibel-1906", "GerTextbibel", "Textbibel (German, Kautzsch and Weizsäcker, 1906)", "de", "Latn", "org",
        "Emil Kautzsch's Old Testament and Carl Weizsäcker's New Testament. Hebrew canon."),
    _sm("spa-rv1865", "SpaRV1865", "Reina-Valera (Spanish, 1865)", "es", "Latn", "kjv",
        "The 1865 revision of the Reina-Valera Bible. Hebrew canon."),
    _sm("swe-karl-xii-1873", "SweKarlXII1873", "Karl XII:s Bibel (Swedish, 1703, 1873 edition)", "sv", "Latn", "kjv",
        "The Swedish Bible of Charles XII. Hebrew canon."),
    _sm("glv-manx", "ManxGaelic", "Yn Vible Casherick (Manx Gaelic, portions)", "gv", "Latn", "kjv",
        "Portions of the 18th-century Manx Bible."),
    _sm("deu-menge", "GerMenge", "Menge-Bibel (German, 1939)", "de", "Latn", "org",
        "Hermann Menge's German translation, with the deuterocanonical books."),
    _sm("deu-luther-1545", "GerBoLut", "Luther-Bibel (German, 1545)", "de", "Latn", "org",
        "Martin Luther's 1545 German Bible. Hebrew canon in this edition."),
    _sm("deu-elberfelder-1905", "GerElb1905", "Elberfelder Bibel (German, 1905)", "de", "Latn", "kjv",
        "Unrevised Elberfelder Bible. Hebrew canon."),
    _sm("deu-albrecht-nt", "GerAlbrecht", "Das Neue Testament (German, Ludwig Albrecht, 1926)", "de", "Latn", "kjv",
        "New Testament only."),
    _sm("spa-rv1909", "SpaRV", "Reina-Valera (Spanish, 1909)", "es", "Latn", "kjv",
        "Hebrew canon."),
    _sm("por-biblia-livre", "PorBLivre", "Bíblia Livre (Portuguese)", "pt", "Latn", "kjv",
        "Hebrew canon.", license="CC BY 3.0 BR (Bíblia Livre)"),
    _sm("nld-statenvertaling", "DutSVVA", "Statenvertaling met apocriefe boeken (Dutch, 1637)", "nl", "Latn", "kjv",
        "Dutch States Translation with the apocrypha."),
    _sm("dan-1871-1907", "DaOT1871NT1907", "Bibelen (Danish, OT 1871, NT 1907)", "da", "Latn", "kjv",
        "Hebrew canon."),
    _sm("swe-1917", "Swe1917", "Bibeln (Swedish, 1917)", "sv", "Latn", "kjv",
        "Swedish Church Bible of 1917, with the deuterocanonical books."),
    _sm("epo-londona", "Esperanto", "La Sankta Biblio (Esperanto, Londona Biblio)", "eo", "Latn", "kjv",
        "Old Testament by L. L. Zamenhof, New Testament by a British committee (1912). Hebrew canon."),
    # Asia, Africa, Oceania and the Americas
    _sm("zho-cuv", "ChiUn", "和合本 (Chinese Union Version, traditional, 1919)", "zh", "Hant", "kjv",
        "Hebrew canon."),
    _sm("lzh-cuv-wenli", "ChiUnL", "文理和合譯本 (Chinese Union Version, classical Chinese)", "lzh", "Hant", "kjv",
        "Hebrew canon."),
    _sm("jpn-bungo", "JapBungo", "文語訳聖書 (Japanese literary version, Meiji OT 1887, Taishō NT 1917)", "ja", "Jpan", "kjv",
        "Japanese literary translation. The Japanese Orthodox Church uses its own translation by St Nicholas of Japan, which is not available digitally. Hebrew canon."),
    _sm("vie-1934", "Viet", "Kinh Thánh (Vietnamese, 1934)", "vi", "Latn", "kjv",
        "Hebrew canon."),
    _sm("tgl-ang-biblia", "TagAngBiblia", "Ang Biblia (Tagalog, 1905)", "tl", "Latn", "kjv",
        "Hebrew canon."),
    _sm("mya-judson", "BurJudson", "သမ္မာကျမ်းစာ (Burmese, Judson, 1835)", "my", "Mymr", "kjv",
        "Hebrew canon."),
    _sm("mal-1910", "Mal1910", "സത്യവേദപുസ്തകം (Malayalam, 1910)", "ml", "Mlym", "kjv",
        "Hebrew canon. Read by the Malankara Orthodox and other St Thomas Christians of Kerala."),
    _sm("mlg-1865", "Mg1865", "Baiboly (Malagasy, 1865)", "mg", "Latn", "org",
        "Hebrew canon."),
    _sm("chr-nt-1860", "Che1860", "ᎪᎪᎳᏅ ᏗᎧᎿᏩᏛᏍᏗ (Cherokee New Testament, 1860)", "chr", "Cher", "kjv",
        "New Testament only."),
    # From eBible.org (built by the text packs workflow, since ebible.org is
    # only reachable from GitHub Actions)
    _eb("ukr-kulish", "ukr1871", "Біблія (Ukrainian, Kulish, Puluj and Nechuy-Levytsky, 1905)", "uk", "Cyrl", "kjv",
        "The first complete Ukrainian Bible, by Panteleimon Kulish, Ivan Puluj and Ivan Nechuy-Levytsky. Hebrew canon."),
    _eb("eng-lxx2012", "eng-lxx2012", "LXX2012: Septuagint in American English", "en", "Latn", "lxx",
        "Michael Paul Johnson's modernised revision of Brenton's English Septuagint, with the deuterocanonical books."),
    _eb("eng-web", "eng-web", "World English Bible with Deuterocanon", "en", "Latn", "kjv",
        "Modern English translation, with the deuterocanonical books including 3 and 4 Maccabees and 1 Esdras."),
    _eb("eng-rv", "eng-rv", "Revised Version with Apocrypha (1895)", "en", "Latn", "kjv",
        "The English Revised Version, with the Apocrypha."),
    _eb("ita-riveduta", "ita1927", "La Sacra Bibbia Riveduta (Italian, Giovanni Luzzi, 1927)", "it", "Latn", "kjv",
        "Hebrew canon."),
    _eb("ita-diodati", "ita1885", "La Sacra Bibbia (Italian, Diodati, 1885 revision)", "it", "Latn", "kjv",
        "Hebrew canon."),
    _eb("fra-segond", "fraLSG", "La Sainte Bible (French, Louis Segond, 1910)", "fr", "Latn", "org",
        "Hebrew canon."),
    _eb("fra-bible-libre", "frasbl", "Sainte Bible libre pour le monde (French)", "fr", "Latn", "kjv",
        "Modern French translation, with the deuterocanonical books."),
    _eb("spa-biblia-libre", "spablm", "Santa Biblia libre para el mundo (Spanish)", "es", "Latn", "kjv",
        "Modern Spanish translation, with the deuterocanonical books. eBible marks it as a draft still under review."),
    _eb("cmn-cuv-simplified", "cmn-cu89s", "和合本 (Chinese Union Version, simplified)", "zh", "Hans", "kjv",
        "Hebrew canon."),
    _eb("pes-opv", "pesOPV", "کتاب مقدس (Persian, Old Persian Version)", "fa", "Arab", "kjv",
        "Hebrew canon.", dir="rtl"),
    _eb("swh-krapf-nt", "swh1850", "Agano Jipya (Swahili, Krapf, 1850)", "sw", "Latn", "kjv",
        "Johann Ludwig Krapf's Swahili New Testament. Incomplete (26 books)."),
    _eb("hin-irv", "hin2017", "पवित्र बाइबिल (Hindi, Indian Revised Version, 2017)", "hi", "Deva", "kjv",
        "Hebrew canon.", license="CC BY-SA 4.0 (Bridge Connectivity Solutions)"),
]


if __name__ == "__main__":
    # Used by fetch_sources.sh: "python3 sources.py scrollmapper" lists the
    # scrollmapper files to download, "python3 sources.py ebible" the eBible ids.
    import sys
    key = {"scrollmapper": "file", "ebible": "ebible"}[sys.argv[1]]
    print(" ".join(s[key] for s in BIBLES + PACKS if s["format"] == sys.argv[1]))
