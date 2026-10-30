// The Khmer alphabet for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization,
// meaning, text to speak, IPA, example language, example IPA]. A consonant's
// romanization is its name: ka for the first series (built-in vowel aa), ko for the
// second (built-in vowel oo). Example romanizations are a simplified UNGEGN style.
// eSpeak NG has no Khmer voice, so the sounds are made from the IPA. Hints,
// groupings and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "khmer",
  title: "Khmer",
  native: "ខ្មែរ",
  lang: "km-KH",
  langName: "Khmer",
  font: '"Noto Sans Khmer", "Khmer OS", "Khmer UI", "Leelawadee UI", sans-serif',
  blurb: "33 consonants in two series that change how every vowel is said, the script of Cambodia.",
  writeTip: "Most Khmer letters are drawn in one stroke, starting at the top left. Letters of the second series often carry a small 'hair' on top: draw it last.",
  lessons: [
    {
      title: "The ka and ca rows",
      group: "Consonants",
      cols: 5,
      note: "The chart is read in rows of five. Letters alternate between the first series (said with aa, like ka) and the second (said with oo, like ko).",
      chars: [
        ["ក", "ka", "k, no puff of air; first series", "កូន", "kon", "child", "", "kɑː", "", "koun"],
        ["ខ", "kha", "k with a puff of air; first series", "ខ្មែរ", "khmae", "Khmer", "", "kʰɑː", "", "kʰmae"],
        ["គ", "ko", "k, no puff of air; second series", "គោ", "ko", "cow", "", "kɔː", "", "kou"],
        ["ឃ", "kho", "k with a puff of air; second series", "ឃ្លាន", "khlean", "hungry", "", "kʰɔː", "", "kʰliən"],
        ["ង", "ngo", "ng as in sing, even at the start of a word", "ងូតទឹក", "ngut tuek", "to bathe", "", "ŋɔː", "", "ŋuːt tɨk"],
        ["ច", "cha", "between ch and j, no puff of air; first series", "ចាន", "chan", "plate", "", "cɑː", "", "caːn"],
        ["ឆ", "chha", "ch with a puff of air; first series", "ឆ្មា", "chhma", "cat", "", "cʰɑː", "", "cʰmaː"],
        ["ជ", "cho", "between ch and j, no puff of air; second series", "ជើង", "cheung", "foot, leg", "", "cɔː", "", "cəːŋ"],
        ["ឈ", "chho", "ch with a puff of air; second series", "ឈើ", "chheu", "wood, tree", "", "cʰɔː", "", "cʰəː"],
        ["ញ", "nho", "ny, like the ñ in Spanish", "ញ៉ាំ", "nham", "to eat", "", "ɲɔː", "", "ɲam"],
      ],
    },
    {
      title: "The da and ta rows",
      group: "Consonants",
      cols: 5,
      note: "The first row came from letters for Sanskrit sounds made with the tongue curled back. In Khmer they sound like the second row, and ឋ, ឌ and ឍ are rare.",
      chars: [
        ["ដ", "da", "d, with a little catch in the throat; first series", "ដៃ", "dai", "hand, arm", "", "ɗɑː", "", "ɗaj"],
        ["ឋ", "tha", "t with a puff of air; first series, rare", "ឋាន", "than", "place, realm", "", "tʰɑː", "", "tʰaːn"],
        ["ឌ", "do", "d; second series, rare", "មណ្ឌល", "mondol", "centre", "", "ɗɔː", "", "mɔndɑl"],
        ["ឍ", "tho", "t with a puff of air; second series, very rare", "", "", "", "", "tʰɔː"],
        ["ណ", "na", "n; first series", "ណាស់", "nas", "very", "", "nɑː", "", "naːh"],
        ["ត", "ta", "t, no puff of air; first series", "តុ", "tok", "table", "", "tɑː", "", "tok"],
        ["ថ", "tha", "t with a puff of air; first series", "ថ្ងៃ", "thngai", "day, sun", "", "tʰɑː", "", "tʰŋaj"],
        ["ទ", "to", "t, no puff of air; second series", "ទឹក", "tuek", "water", "", "tɔː", "", "tɨk"],
        ["ធ", "tho", "t with a puff of air; second series", "ធំ", "thom", "big", "", "tʰɔː", "", "tʰom"],
        ["ន", "no", "n as in no; second series", "នំ", "num", "cake, snack", "", "nɔː", "", "nom"],
      ],
    },
    {
      title: "The ba row and the rest",
      group: "Consonants",
      cols: 5,
      note: "The last letters are not in pairs. ប, ស, ហ, ឡ and អ are first series; យ, រ, ល and វ are second.",
      chars: [
        ["ប", "ba", "b, with a little catch in the throat; first series", "បាយ", "bay", "cooked rice", "", "ɓɑː", "", "ɓaːj"],
        ["ផ", "pha", "p with a puff of air; first series", "ផ្ទះ", "phteah", "house", "", "pʰɑː", "", "pʰteəh"],
        ["ព", "po", "p, no puff of air; second series", "ពេល", "pel", "time", "", "pɔː", "", "peːl"],
        ["ភ", "pho", "p with a puff of air; second series", "ភ្នំ", "phnom", "mountain", "", "pʰɔː", "", "pʰnom"],
        ["ម", "mo", "m as in man; second series", "ម្ដាយ", "mdai", "mother", "", "mɔː", "", "mɗaːj"],
        ["យ", "yo", "y as in yes; second series", "យប់", "yob", "night", "", "jɔː", "", "jup"],
        ["រ", "ro", "a rolled r; second series", "រៀន", "rien", "to study", "", "rɔː", "", "riən"],
        ["ល", "lo", "l as in let; second series", "លុយ", "luy", "money", "", "lɔː", "", "luj"],
        ["វ", "vo", "between v and w; second series", "វត្ត", "voat", "pagoda", "", "ʋɔː", "", "ʋɔət"],
        null,
        ["ស", "sa", "s as in sun; first series", "សួស្ដី", "suostei", "hello", "", "sɑː", "", "suəsɗəj"],
        ["ហ", "ha", "h as in hat; first series", "ហូប", "hob", "to eat (casual)", "", "hɑː", "", "houp"],
        ["ឡ", "la", "l; first series", "ឡាន", "lan", "car", "", "lɑː", "", "laːn"],
        ["អ", "a", "a catch in the throat before the vowel; first series", "អរគុណ", "arkun", "thank you", "", "ʔɑː", "", "ʔɑːkun"],
      ],
    },
    {
      title: "Vowels on ក",
      group: "Vowels",
      cols: 4,
      note: "Each vowel sign has two sounds: one after a first-series consonant, one after a second-series consonant. They are shown on ក (first series); the hint gives the second-series sound too.",
      chars: [
        ["កា", "kaa", "aa as in father; ea after second series", "ការ", "kar", "work", "", "kaː", "", "kaː"],
        ["កិ", "ke", "a short e; i after second series", "ពិត", "pit", "true", "", "ke", "", "pit"],
        ["កី", "kei", "ei as in eight; ii after second series", "ស្រី", "srei", "woman", "", "kəj", "", "srəj"],
        ["កឹ", "koe", "a short oe; ue after second series", "ទឹក", "tuek", "water", "", "kə", "", "tɨk"],
        ["កុ", "ko", "a short o; u after second series", "តុ", "tok", "table", "", "ko", "", "tok"],
        ["កូ", "kou", "ou as in soul; uu after second series", "កូន", "kon", "child", "", "kou", "", "koun"],
        ["កួ", "kuo", "uo, oo gliding to a, after both series", "សួន", "suon", "garden", "", "kuə", "", "suən"],
        ["កើ", "kaeu", "a gliding to oe; long oe after second series", "ជើង", "cheung", "foot, leg", "", "kaə", "", "cəːŋ"],
        ["កឿ", "kuea", "ue gliding to a, after both series", "រឿង", "rueng", "story", "", "kɨə", "", "rɨəŋ"],
        ["កៀ", "kie", "ia, as in Mia, after both series", "រៀន", "rien", "to study", "", "kiə", "", "riən"],
        ["កេ", "ke", "ei as in eight; long e after second series", "ពេល", "pel", "time", "", "kei", "", "peːl"],
        ["កែ", "kae", "a gliding to e; e as in bed after second series", "ខែ", "khae", "month", "", "kae", "", "kʰae"],
        ["កៃ", "kai", "ai as in Thai; ey after second series", "ដៃ", "dai", "hand, arm", "", "kaj", "", "ɗaj"],
        ["កោ", "kao", "ao as in how; long o after second series", "ខោ", "khao", "trousers", "", "kao", "", "kʰao"],
        ["កៅ", "kau", "aw as in now; eu after second series", "នៅ", "nov", "to stay; at", "", "kaw", "", "nɨw"],
        ["កុំ", "kom", "om; um after second series", "កុំ", "kom", "don't", "", "kom", "", "kom"],
        ["កំ", "kam", "am; um after second series", "ធំ", "thom", "big", "", "kam", "", "tʰom"],
        ["កាំ", "kam", "am; oam after second series", "ចាំ", "cham", "to wait; to remember", "", "kam", "", "cam"],
        ["កះ", "kah", "ah; eah after second series", "ផ្ទះ", "phteah", "house", "", "kah", "", "pʰteəh"],
      ],
    },
  ],
  articles: [
    {
      title: "Two series of consonants",
      body: `<p>Khmer consonants come in two series. A first-series letter is named with aa (<span lang="km">ក</span> ka), a second-series letter with oo (<span lang="km">គ</span> ko). Long ago the two series stood for different consonants, voiceless and voiced; over time the consonants merged and the difference moved into the vowel.</p>
<p>That is why each vowel sign has two readings. <span lang="km">កា</span> is kaa, but <span lang="km">គា</span> is kea. When you learn a letter, learn its series with it.</p>
<p>Two small marks swap the series of a letter: <span lang="km">៉</span> (musĕkâtônd) moves a second-series letter to the first, and <span lang="km">៊</span> (treisâpt) moves a first-series letter to the second. This lets Khmer spell sounds that one of the pair is missing, as in <span lang="km">ញ៉ាំ</span> (nham, to eat).</p>`,
    },
    {
      title: "Letters under letters",
      body: `<p>Khmer has no spaces between words, and it stacks consonants. When two consonants come together with no vowel between them, the second is written below the first as a small subscript form called a <i>cheung</i> (foot): <span lang="km">ខ្មែរ</span> (Khmer) has <span lang="km">ម</span> written under <span lang="km">ខ</span>.</p>
<p>Most subscripts look like small copies of their letter. A few look quite different: the subscript of <span lang="km">រ</span> is a stroke written to the left of the letter it attaches to, as in <span lang="km">ក្រ</span>, and the subscripts of <span lang="km">ដ</span> and <span lang="km">ត</span> are the same shape.</p>`,
    },
    {
      title: "Vowels that stand alone",
      body: `<p>Besides the vowel signs, Khmer has a set of independent vowels that are full letters of their own, such as <span lang="km">ឥ</span> (e), <span lang="km">ឪ</span> (au) and <span lang="km">ឱ</span> (ao). They are used in a small number of words, most of them from Pali and Sanskrit, like <span lang="km">ឪពុក</span> (âupuk, father).</p>
<p>A syllable with no vowel sign carries the letter's own vowel: aa for the first series, oo for the second. A consonant that ends a word is said with no vowel at all: <span lang="km">ពេល</span> is pel, and a final <span lang="km">រ</span> is not said, so <span lang="km">ការ</span> is kaa.</p>`,
    },
  ],
});
