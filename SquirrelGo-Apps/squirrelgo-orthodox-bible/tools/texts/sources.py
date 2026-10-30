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
