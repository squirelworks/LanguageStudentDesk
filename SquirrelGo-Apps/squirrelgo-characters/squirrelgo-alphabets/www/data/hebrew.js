// The Hebrew alphabet (Modern Israeli Hebrew values) for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization,
// meaning, text to speak, IPA, example language, example IPA]. Examples are written
// with vowel points, as in books for learners. The example IPA is what the recordings
// are made from, since eSpeak NG spells pointed Hebrew out letter by letter.
// Hints, groupings and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "hebrew",
  title: "Hebrew",
  native: "עברית",
  lang: "he-IL",
  langName: "Hebrew",
  dir: "rtl",
  audio: "ipa",
  font: '"Noto Sans Hebrew", "Arial Hebrew", "Segoe UI", system-ui, sans-serif',
  chartFlow: true,
  blurb: "The 22 letters of Hebrew, their five end-of-word forms, the dots that change a sound, and the vowel points.",
  writeTip: "These are the printed letters. Everyday handwriting uses a rounder cursive with different shapes; learn to read print first.",
  lessons: [
    {
      title: "א to ה",
      group: "Letters",
      note: "Hebrew is read from right to left. The letters are all consonants; vowels are mostly left for the reader to know.",
      chars: [
        ["א", "ʾ", "alef: silent, or a light catch in the throat; carries a vowel", "אַבָּא", "aba", "dad", "", "ʔ", "", "ˈaba"],
        ["ב", "v / b", "bet: v, or b with a dot inside (בּ)", "כּוֹכָב", "kokhav", "star", "", "v ~ b", "", "koˈχav"],
        ["ג", "g", "gimel: g as in go", "גָּמָל", "gamal", "camel", "", "ɡ", "", "ɡaˈmal"],
        ["ד", "d", "dalet: d", "דָּג", "dag", "fish", "", "d", "", "daɡ"],
        ["ה", "h", "he: h; silent at the end of a word", "הַר", "har", "mountain", "", "h", "", "haʁ"],
      ],
    },
    {
      title: "ו to י",
      group: "Letters",
      chars: [
        ["ו", "v / o / u", "vav: v, or the vowel o (וֹ) or u (וּ)", "וֶרֶד", "vered", "rose", "", "v", "", "ˈveʁed"],
        ["ז", "z", "zayin: z", "זָהָב", "zahav", "gold", "", "z", "", "zaˈhav"],
        ["ח", "kh", "het: ch as in Scottish loch", "חָלָב", "khalav", "milk", "", "χ", "", "χaˈlav"],
        ["ט", "t", "tet: t", "טוֹב", "tov", "good", "", "t", "", "tov"],
        ["י", "y / i", "yod: y as in yes, or the vowel i", "יֶלֶד", "yeled", "boy", "", "j", "", "ˈjeled"],
      ],
    },
    {
      title: "כ to ס",
      group: "Letters",
      chars: [
        ["כ", "kh / k", "kaf: ch as in loch, or k with a dot (כּ)", "מִכְתָּב", "mikhtav", "letter (mail)", "", "χ ~ k", "", "miχˈtav"],
        ["ל", "l", "lamed: l; the tallest letter", "לֶחֶם", "lekhem", "bread", "", "l", "", "ˈleχem"],
        ["מ", "m", "mem: m", "מַיִם", "mayim", "water", "", "m", "", "ˈmajim"],
        ["נ", "n", "nun: n", "נֵר", "ner", "candle", "", "n", "", "neʁ"],
        ["ס", "s", "samekh: s", "סוּס", "sus", "horse", "", "s", "", "sus"],
      ],
    },
    {
      title: "ע to ת",
      group: "Letters",
      chars: [
        ["ע", "ʿ", "ayin: silent in most modern speech; carries a vowel", "עַיִן", "ayin", "eye", "", "ʔ", "", "ˈajin"],
        ["פ", "f / p", "pe: f, or p with a dot (פּ)", "סֵפֶר", "sefer", "book", "", "f ~ p", "", "ˈsefeʁ"],
        ["צ", "ts", "tsadi: ts as in cats", "צֶבַע", "tseva", "color", "", "ts", "", "ˈtseva"],
        ["ק", "k", "qof: k", "קָפֶה", "kafe", "coffee", "", "k", "", "kaˈfe"],
        ["ר", "r", "resh: a soft r in the throat, as in French", "רֶגֶל", "regel", "leg, foot", "", "ʁ", "", "ˈʁeɡel"],
        ["ש", "sh / s", "shin: sh, or s when the dot is on the left (שׂ)", "שֶׁמֶשׁ", "shemesh", "sun", "", "ʃ ~ s", "", "ˈʃemeʃ"],
        ["ת", "t", "tav: t", "תַּפּוּחַ", "tapuakh", "apple", "", "t", "", "tapˈuaχ"],
      ],
    },
    {
      title: "End-of-word forms",
      group: "Final forms",
      note: "Five letters change shape at the end of a word. Most of them stretch down below the line.",
      chars: [
        ["ך", "kh", "final kaf", "דֶּרֶךְ", "derekh", "road, way", "", "χ", "", "ˈdeʁeχ"],
        ["ם", "m", "final mem: closed like a box", "שָׁלוֹם", "shalom", "peace, hello", "", "m", "", "ʃaˈlom"],
        ["ן", "n", "final nun", "בֵּן", "ben", "son", "", "n", "", "ben"],
        ["ף", "f", "final pe", "כַּף", "kaf", "spoon", "", "f", "", "kaf"],
        ["ץ", "ts", "final tsadi", "עֵץ", "ets", "tree", "", "ts", "", "ets"],
      ],
    },
    {
      title: "Dots that change the sound",
      group: "Dots and vowels",
      cols: 5,
      note: "A dot inside ב, כ or פ makes it hard: b, k, p. The dot on ש says whether it is sh (right) or s (left).",
      chars: [
        ["בּ", "b", "bet with a dot: b", "בֹּקֶר", "boker", "morning", "", "b", "", "ˈbokeʁ"],
        ["כּ", "k", "kaf with a dot: k", "כּוֹס", "kos", "cup", "", "k", "", "kos"],
        ["פּ", "p", "pe with a dot: p", "פִּיל", "pil", "elephant", "", "p", "", "pil"],
        ["שׁ", "sh", "shin, dot on the right: sh", "שִׁיר", "shir", "song", "", "ʃ", "", "ʃiʁ"],
        ["שׂ", "s", "sin, dot on the left: s", "שָׂדֶה", "sade", "field", "", "s", "", "saˈde"],
      ],
    },
    {
      title: "Vowel points",
      group: "Dots and vowels",
      cols: 5,
      note: "Dots and dashes under, over or beside a letter mark its vowel. They appear in children's books, poetry, prayer books and learners' texts; everyday writing leaves them out. Here they are shown on מ.",
      chars: [
        ["מַ", "ma", "patah, a dash under: a", "", "", "", "", "ma"],
        ["מָ", "ma", "kamatz, a T under: a (o in some words)", "", "", "", "", "ma"],
        ["מֵ", "me", "tsere, two dots under: e", "", "", "", "", "me"],
        ["מֶ", "me", "segol, three dots under: e", "", "", "", "", "me"],
        ["מִ", "mi", "hiriq, one dot under: i", "", "", "", "", "mi"],
        ["מוֹ", "mo", "holam, a dot over vav: o", "", "", "", "", "mo"],
        ["מוּ", "mu", "shuruk, a dot in vav: u", "", "", "", "", "mu"],
        ["מֻ", "mu", "kubutz, three slanted dots: u", "", "", "", "", "mu"],
        ["מְ", "m(e)", "shva, two dots stacked: a quick e or nothing", "", "", "", "", "mə"],
      ],
    },
  ],
  articles: [
    {
      title: "About the Hebrew alphabet",
      body: `<p>The Hebrew letters in use today, called the square script, developed from the Aramaic alphabet over 2,000 years ago. They are used for Hebrew and also for Yiddish and Ladino, which give some letters different values.</p>
<p>Hebrew is written right to left, with no capital letters. Like Arabic, it is an abjad: the letters write consonants, and readers supply most of the vowels from their knowledge of the language. The letters <span lang="he">א, ה, ו, י</span> can also stand for vowels.</p>
<p>Each letter has a number value (<span lang="he">א</span> = 1, <span lang="he">ב</span> = 2, <span lang="he">י</span> = 10 …), still used for dates in the Hebrew calendar and for numbering lists.</p>`,
    },
    {
      title: "Reading without vowels",
      body: `<p>Everyday Hebrew is written without vowel points. The word <span lang="he">ספר</span> could be <span lang="he">סֵפֶר</span> (sefer, book), <span lang="he">סַפָּר</span> (sapar, barber) or <span lang="he">סִפֵּר</span> (siper, he told). Readers know which from the context.</p>
<p>Two habits make unpointed text easier. <span lang="he">ו</span> often shows an o or u, and <span lang="he">י</span> an i: <span lang="he">שיר</span> is shir, <span lang="he">טוב</span> is tov. Learn new words with their points, then practise reading them without.</p>`,
    },
    {
      title: "Letters that look alike",
      body: `<p>Several pairs differ by a small detail:</p>
<table>
<tr><td lang="he">ב כ</td><td>bet has a little foot at the bottom right; kaf is rounded</td></tr>
<tr><td lang="he">ד ר</td><td>dalet has a sharp corner; resh is rounded</td></tr>
<tr><td lang="he">ה ח ת</td><td>he has a gap at the top left; het is closed; tav has a foot at the bottom left</td></tr>
<tr><td lang="he">ו ז ן</td><td>vav is a plain stroke; zayin has a head; final nun goes below the line</td></tr>
<tr><td lang="he">ס ם</td><td>samekh is round; final mem is square</td></tr>
</table>`,
    },
  ],
});
