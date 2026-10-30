// The Lao alphabet for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization,
// meaning, text to speak, IPA, example language, example IPA]. Romanization is the
// common Lao-French style (x for s, ny, v), with doubled letters for long vowels.
// Each consonant's example is the word it is named after in Lao schools. eSpeak NG
// has no Lao voice, so the sounds are made from the IPA. Hints, groupings and
// articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "lao",
  title: "Lao",
  native: "ລາວ",
  lang: "lo-LA",
  langName: "Lao",
  font: '"Noto Sans Lao Looped", "Noto Sans Lao", "Phetsarath OT", "Lao UI", sans-serif',
  blurb: "27 consonants in three tone classes and vowels written around them, a close cousin of Thai.",
  writeTip: "Start most letters at the small loop and draw them in one stroke without lifting the pen.",
  lessons: [
    {
      title: "Middle-class consonants",
      group: "Consonants",
      note: "Eight letters with the simplest tone rules. Each is named by its sound with o after it, then a word: ກ is ko kai, k as in kai (chicken).",
      chars: [
        ["ກ", "k", "k without a puff of air, as in skin", "ໄກ່", "kai", "chicken", "", "k", "", "kaj"],
        ["ຈ", "ch", "ch without a puff of air, close to j", "ຈອກ", "chok", "cup", "", "tɕ", "", "tɕɔːk"],
        ["ດ", "d", "d as in day", "ເດັກ", "dek", "child", "", "d", "", "dek"],
        ["ຕ", "t", "t without a puff of air, as in stop", "ຕາ", "ta", "eye", "", "t", "", "taː"],
        ["ບ", "b", "b as in boy", "ແບ້", "bae", "goat", "", "b", "", "bɛː"],
        ["ປ", "p", "p without a puff of air, as in spin", "ປາ", "pa", "fish", "", "p", "", "paː"],
        ["ຢ", "y", "y as in yes", "ຢາ", "ya", "medicine", "", "j", "", "jaː"],
        ["ອ", "ʼ", "a silent holder for a vowel; also the vowel aw", "ໂອ", "o", "bowl", "", "ʔ", "", "ʔoː"],
      ],
    },
    {
      title: "High-class consonants",
      group: "Consonants",
      note: "Said with a puff of air, or hissing. ຫ also goes silently in front of a low letter to give it a high-class tone.",
      chars: [
        ["ຂ", "kh", "k with a puff of air, as in kin", "ໄຂ່", "khai", "egg", "", "kʰ", "", "kʰaj"],
        ["ສ", "s", "s as in sun", "ເສືອ", "suea", "tiger", "", "s", "", "sɯa"],
        ["ຖ", "th", "t with a puff of air, as in tin", "ຖົງ", "thong", "bag", "", "tʰ", "", "tʰoŋ"],
        ["ຜ", "ph", "p with a puff of air, as in pin", "ເຜິ້ງ", "phueng", "bee", "", "pʰ", "", "pʰɤŋ"],
        ["ຝ", "f", "f as in fan", "ຝົນ", "fon", "rain", "", "f", "", "fon"],
        ["ຫ", "h", "h as in hat", "ຫ່ານ", "han", "goose", "", "h", "", "haːn"],
        ["ໜ", "n", "ຫ and ນ joined: n with a high-class tone", "ໜູ", "nu", "mouse", "", "n", "", "nuː"],
        ["ໝ", "m", "ຫ and ມ joined: m with a high-class tone", "ໝາ", "ma", "dog", "", "m", "", "maː"],
      ],
    },
    {
      title: "Low-class consonants",
      group: "Consonants",
      note: "Everything else is low class. Several are low twins of a high letter with the same sound: ຄ and ຂ are both kh.",
      chars: [
        ["ຄ", "kh", "kh, the low twin of ຂ", "ຄວາຍ", "khouay", "water buffalo", "", "kʰ", "", "kʰwaːj"],
        ["ງ", "ng", "ng as in sing, even at the start of a word", "ງົວ", "ngoua", "cow", "", "ŋ", "", "ŋua"],
        ["ຊ", "x", "s, the low twin of ສ", "ຊ້າງ", "xang", "elephant", "", "s", "", "saːŋ"],
        ["ຍ", "ny", "ny, like the ñ in Spanish", "ຍຸງ", "nyung", "mosquito", "", "ɲ", "", "ɲuŋ"],
        ["ທ", "th", "th, the low twin of ຖ", "ທຸງ", "thung", "flag", "", "tʰ", "", "tʰuŋ"],
        ["ນ", "n", "n as in no", "ນົກ", "nok", "bird", "", "n", "", "nok"],
        ["ພ", "ph", "ph, the low twin of ຜ", "ພູ", "phou", "mountain", "", "pʰ", "", "pʰuː"],
        ["ຟ", "f", "f, the low twin of ຝ", "ໄຟ", "fai", "fire", "", "f", "", "faj"],
        ["ມ", "m", "m as in man", "ແມວ", "maeo", "cat", "", "m", "", "mɛːw"],
        ["ຣ", "r", "r, used in names and foreign words; usually said l", "ປາຣີ", "pari", "Paris", "", "r", "", "paːliː"],
        ["ລ", "l", "l as in let", "ລີງ", "ling", "monkey", "", "l", "", "liːŋ"],
        ["ວ", "v", "between v and w", "ວີ", "vi", "hand fan", "", "ʋ", "", "ʋiː"],
        ["ຮ", "h", "h, the low twin of ຫ", "ເຮືອນ", "huean", "house", "", "h", "", "hɯan"],
      ],
    },
    {
      title: "Vowels on ກ",
      group: "Vowels",
      cols: 4,
      note: "Vowel signs sit before, after, above or below the consonant, and some wrap around it. They are shown here on ກ. The consonant is always said first.",
      chars: [
        ["ກະ", "ka", "short a", "ຈະ", "cha", "will (future)", "", "ka", "", "tɕa"],
        ["ກາ", "kaa", "long a, as in father", "ປາ", "pa", "fish", "", "kaː", "", "paː"],
        ["ກິ", "ki", "short i, as in bit", "ສິບ", "sip", "ten", "", "ki", "", "sip"],
        ["ກີ", "kii", "long ee, as in see", "ດີ", "di", "good", "", "kiː", "", "diː"],
        ["ກຶ", "kue", "short ue: say i with your lips spread flat", "ສຶກສາ", "suksa", "education", "", "kɯ", "", "sɯksaː"],
        ["ກື", "kuue", "long ue", "ມື", "mue", "hand", "", "kɯː", "", "mɯː"],
        ["ກຸ", "ku", "short u, as in put", "ລຸງ", "lung", "uncle", "", "ku", "", "luŋ"],
        ["ກູ", "kuu", "long oo, as in food", "ງູ", "ngu", "snake", "", "kuː", "", "ŋuː"],
        ["ເກ", "kee", "long e, as in they without the glide; written first", "ເລກ", "lek", "number", "", "keː", "", "leːk"],
        ["ແກ", "kae", "long a, as in bad; written first", "ແມ່", "mae", "mother", "", "kɛː", "", "mɛː"],
        ["ໂກ", "koo", "long o, as in go without the glide; written first", "ໂລກ", "lok", "world", "", "koː", "", "loːk"],
        ["ກໍ", "kaw", "long aw, as in saw", "ພໍ່", "pho", "father", "", "kɔː", "", "pʰɔː"],
        ["ເກີ", "koe", "long oe, like the u in fur without the r", "ເຊີນ", "xoen", "to invite; please", "", "kɤː", "", "sɤːn"],
        ["ເກຍ", "kia", "ia, as in Mia", "ເມຍ", "mia", "wife", "", "kia", "", "mia"],
        ["ເກືອ", "kuea", "uea: ue gliding to a", "ເຮືອ", "huea", "boat", "", "kɯa", "", "hɯa"],
        ["ກົວ", "kua", "ua, as in the oo-a of truer", "ງົວ", "ngoua", "cow", "", "kua", "", "ŋua"],
        ["ໄກ", "kai", "ai, as in Thai", "ໄຟ", "fai", "fire", "", "kaj", "", "faj"],
        ["ໃກ", "kai", "ai again; used in only about twenty words", "ໃຈ", "chai", "heart, mind", "", "kaj", "", "tɕaj"],
        ["ເກົາ", "kao", "ao, as in how", "ເຂົ້າ", "khao", "rice", "", "kaw", "", "kʰaw"],
        ["ກຳ", "kam", "am: a short a with an m", "ນ້ຳ", "nam", "water", "", "kam", "", "nam"],
      ],
    },
  ],
  articles: [
    {
      title: "Lao and Thai",
      body: `<p>The Lao and Thai scripts grew from the same parent in the 13th and 14th centuries, and the languages are close enough that many speakers understand each other. Lao letters are rounder and simpler, and Lao spelling was reformed to be written more as it sounds: it has 27 consonants where Thai has 44, because the extra Thai letters for Pali and Sanskrit words were dropped.</p>
<p>Like Thai, Lao is written without spaces between words, with vowels around the consonant and tone marks above it.</p>`,
    },
    {
      title: "Classes and tones",
      body: `<p>Vientiane Lao has six tones. As in Thai, the spelling shows the tone through three things together: the class of the first consonant (middle, high or low), the tone mark (<span lang="lo">່</span> mai ek or <span lang="lo">້</span> mai tho, and two rarer ones), and whether the syllable is live (ending in a long vowel, m, n, ng, w or y) or dead (a short vowel, or p, t, k).</p>
<p>Because the tones differ from region to region, Lao teachers usually give the rules for the capital, Vientiane. The sounds in this app are spoken without tones, so listen to a native speaker for the melody.</p>`,
    },
    {
      title: "ຫ, the silent helper",
      body: `<p>Low-class letters like ນ, ມ, ລ and ວ have no high-class twin. To spell a word with their sound and a high-class tone, Lao writes a silent ຫ in front: <span lang="lo">ຫວານ</span> (wan, sweet). Two of these pairs are so common that they are written as one letter: <span lang="lo">ໜ</span> for ຫນ and <span lang="lo">ໝ</span> for ຫມ.</p>`,
    },
  ],
});
