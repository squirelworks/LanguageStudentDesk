// The Burmese (Myanmar) script for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization,
// meaning, text to speak, IPA, example language, example IPA]. Romanization is a
// simplified common style (hs for the breathy s, ht and hp for aspirates, th for θ).
// Each consonant's hint gives its traditional name. eSpeak NG reads Burmese letters
// poorly, so the sounds are made from the IPA, without tones. Hints, groupings and
// articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "burmese",
  title: "Burmese",
  native: "မြန်မာ",
  lang: "my-MM",
  langName: "Burmese",
  audio: "ipa",
  voice: "hi",
  font: '"Noto Sans Myanmar", "Myanmar Text", "Padauk", "Myanmar MN", sans-serif',
  blurb: "33 round consonants, vowels and tones written around them, and medial letters that hook onto a consonant.",
  writeTip: "Most letters are a circle or part of one, opened at a different side. Draw the circle in one smooth stroke, then add any extra piece.",
  lessons: [
    {
      title: "The ka row",
      group: "Consonants",
      cols: 5,
      note: "The chart is read in rows of five: plain, puffed, voiced, voiced (for Pali words), nasal. Every consonant carries a short a.",
      chars: [
        ["က", "ka", "k without a puff of air; named ka gyi, big ka", "ကြက်", "kyet", "chicken", "", "ka", "", "tɕɛʔ"],
        ["ခ", "kha", "k with a puff of air; named kha gwe, curved kha", "ခွေး", "khwe", "dog", "", "kʰa", "", "kʰwe"],
        ["ဂ", "ga", "g; named ga nge, small ga", "ဂီတ", "gita", "music", "", "ɡa", "", "ɡita"],
        ["ဃ", "ga", "g, in words from Pali; named ga gyi, big ga", "", "", "", "", "ɡa", "", ""],
        ["င", "nga", "ng as in sing, even at the start of a word", "ငါး", "nga", "fish", "", "ŋa", "", "ŋa"],
      ],
    },
    {
      title: "The sa row",
      group: "Consonants",
      cols: 5,
      note: "In Burmese this row became s and z sounds, and ည became ny.",
      chars: [
        ["စ", "sa", "s; named sa lone, round sa", "စာ", "sa", "letter, writing", "", "sa", "", "sa"],
        ["ဆ", "hsa", "s with a puff of air; named hsa lein, twisted hsa", "ဆား", "hsa", "salt", "", "sʰa", "", "sʰa"],
        ["ဇ", "za", "z; named za gwe, curved za", "ဇွန်း", "zun", "spoon", "", "za", "", "zun"],
        ["ဈ", "za", "z, in a few words; named za myin zwe", "ဈေး", "ze", "market", "", "za", "", "ze"],
        ["ည", "nya", "ny as in canyon; named nya gyi, big nya", "ည", "nya", "night", "", "ɲa", "", "ɲa"],
      ],
    },
    {
      title: "The ta row",
      group: "Consonants",
      cols: 5,
      chars: [
        ["တ", "ta", "t without a puff of air; named ta wun pu, potbellied ta", "တောင်", "taung", "mountain", "", "ta", "", "taun"],
        ["ထ", "hta", "t with a puff of air; named hta sin du, elephant-hook hta", "ထမင်း", "htamin", "cooked rice", "", "tʰa", "", "tʰəmin"],
        ["ဒ", "da", "d; named da dwe", "ဒူး", "du", "knee", "", "da", "", "du"],
        ["ဓ", "da", "d, in words from Pali; named da auk chait, bottom-notched da", "ဓား", "da", "knife", "", "da", "", "da"],
        ["န", "na", "n; named na nge, small na", "နွား", "nwa", "cow", "", "na", "", "nwa"],
      ],
    },
    {
      title: "The pa row",
      group: "Consonants",
      cols: 5,
      chars: [
        ["ပ", "pa", "p without a puff of air; named pa sauk, steep pa", "ပန်း", "pan", "flower", "", "pa", "", "pan"],
        ["ဖ", "hpa", "p with a puff of air; named hpa u htoke, hatted hpa", "ဖား", "hpa", "frog", "", "pʰa", "", "pʰa"],
        ["ဗ", "ba", "b; named ba lak chait, notched ba", "ဗိုက်", "baik", "belly", "", "ba", "", "baiʔ"],
        ["ဘ", "ba", "b; named ba gone, humped ba", "ဘဲ", "be", "duck", "", "ba", "", "bɛ"],
        ["မ", "ma", "m", "မိုး", "mo", "rain, sky", "", "ma", "", "mo"],
      ],
    },
    {
      title: "The last eight",
      group: "Consonants",
      cols: 4,
      note: "Semivowels, s and h, and အ, the letter that carries a vowel with no consonant.",
      chars: [
        ["ယ", "ya", "y as in yes; named ya pak lak, flat ya", "ယပ်", "yat", "hand fan", "", "ja", "", "jaʔ"],
        ["ရ", "ya", "y in Yangon speech, r in Pali words and loans; named ya gauk, bent ya", "ရေ", "ye", "water", "", "ja", "", "je"],
        ["လ", "la", "l", "လ", "la", "moon, month", "", "la", "", "la"],
        ["ဝ", "wa", "w; a plain circle", "ဝက်", "wet", "pig", "", "wa", "", "wɛʔ"],
        ["သ", "tha", "th as in thin, often softer, near t", "သစ်ပင်", "thitpin", "tree", "", "θa", "", "θiʔpin"],
        ["ဟ", "ha", "h", "ဟင်း", "hin", "curry", "", "ha", "", "hin"],
        ["ဠ", "la", "l, in words from Pali; named la gyi, big la", "", "", "", "", "la", "", ""],
        ["အ", "a", "a vowel carrier: holds a vowel at the start of a syllable", "အမေ", "ame", "mother", "", "ʔa", "", "ʔəme"],
      ],
    },
    {
      title: "Letters for Pali words",
      group: "Consonants",
      cols: 5,
      note: "The curled-back row of the Indian alphabet. Burmese says them like the ta row, and they mostly appear in religious and learned words.",
      chars: [
        ["ဋ", "ta", "t; named ta talin gyeik", "", "", "", "", "ta", "", ""],
        ["ဌ", "hta", "t with a puff of air; named hta win be", "", "", "", "", "tʰa", "", ""],
        ["ဍ", "da", "d; named da yin gauk", "", "", "", "", "da", "", ""],
        ["ဎ", "da", "d; named da ye hmote", "", "", "", "", "da", "", ""],
        ["ဏ", "na", "n; named na gyi, big na", "", "", "", "", "na", "", ""],
      ],
    },
    {
      title: "Vowels on က",
      group: "Vowels",
      cols: 4,
      note: "Vowel signs sit around the consonant. Many come in sets of three, one for each tone: low (plain), high (with း), and creaky (short, with ့ or no mark).",
      chars: [
        ["ကာ", "kà", "ာ: a, low tone; ါ is used instead after round letters like ဂ", "", "", "", "", "kà"],
        ["ကား", "ká", "ား: a, high tone", "ကား", "ka", "car", "", "ká", "", "ka"],
        ["ကိ", "ki", "ိ: i, short creaky tone", "", "", "", "", "kḭ"],
        ["ကီ", "kì", "ီ: i, low tone", "", "", "", "", "kì"],
        ["ကု", "ku", "ု: u, short creaky tone", "", "", "", "", "kṵ"],
        ["ကူ", "kù", "ူ: u, low tone", "", "", "", "", "kù"],
        ["ကေ", "kè", "ေ: e, written before the consonant", "", "", "", "", "kè"],
        ["ကဲ", "ké", "ဲ: e as in bed, high tone", "", "", "", "", "kɛ́"],
        ["ကော", "káw", "ော: aw as in saw, high tone", "", "", "", "", "kɔ́"],
        ["ကော်", "kàw", "ော်: aw, low tone", "ကော်ဖီ", "kawhpi", "coffee", "", "kɔ̀", "", "kɔpʰi"],
        ["ကို", "kò", "ို: o as in go, low tone", "ကိုကို", "koko", "older brother", "", "kò", "", "koko"],
        ["ကံ", "kàn", "ံ: a nasal n at the end", "", "", "", "", "kàɴ"],
      ],
    },
    {
      title: "Vowel letters",
      group: "Vowels",
      cols: 4,
      note: "Most syllables that start with a vowel use အ with a vowel sign. These few letters stand for a vowel on their own.",
      chars: [
        ["ဣ", "i", "i, short; in a few Pali words", "", "", "", "", "ḭ"],
        ["ဤ", "i", "i, low tone; the word for this", "ဤ", "i", "this", "", "ì", "", "i"],
        ["ဥ", "u", "u, short creaky tone", "ဥ", "u", "egg", "", "ṵ", "", "u"],
        ["ဦ", "u", "u, low tone; with း it is the title U, Mr", "ဦး", "u", "Mr, uncle", "", "ù", "", "u"],
        ["ဧ", "e", "e, low tone", "", "", "", "", "è"],
        ["ဩ", "aw", "aw, high tone", "", "", "", "", "ɔ́"],
      ],
    },
    {
      title: "Medials and marks",
      group: "Signs",
      cols: 4,
      note: "Four medial signs hook onto a consonant to add y, w or h to it, and three marks set the tone or end the syllable.",
      chars: [
        ["ကျ", "kya", "ျ: medial y, a hook on the right; ky is said ch", "", "", "", "", "tɕa"],
        ["ကြ", "kya", "ြ: medial r, a bracket around the letter; said like ျ", "ကြက်", "kyet", "chicken", "", "tɕa", "", "tɕɛʔ"],
        ["ကွ", "kwa", "ွ: medial w, a small circle below", "", "", "", "", "kwa"],
        ["မှ", "hma", "ှ: medial h, a tail below; the m, n or l is breathed", "", "", "", "", "m̥a"],
        ["က်", "k", "်: asat, kills the vowel; a final k, t or p becomes a catch in the throat", "", "", "", "", "ʔ"],
        ["က့", "ka", "့: the creaky tone mark, a dot below", "", "", "", "", "ka̰"],
      ],
    },
  ],
  articles: [
    {
      title: "Why the letters are round",
      body: `<p>Burmese, like Odia and Sinhala, was written for centuries on palm leaves with a stylus. Straight lines along the leaf would split it, so the letters came to be built from circles, half circles and small hooks. The script itself came from the Mon, who had taken it from southern India; it reached the Burmans in the 11th century, and Shan, Karen and Mon are written with versions of it today.</p>
<p>The circles make some letters look alike. Watch where a circle opens and what is added to it: <span lang="my">ဝ</span> is a closed circle, <span lang="my">ဂ</span> opens at the top, and <span lang="my">င</span> opens at the bottom.</p>`,
    },
    {
      title: "Tones in the spelling",
      body: `<p>Burmese has three tones, and a fourth kind of syllable that ends in a catch in the throat:</p>
<table>
<tr><td lang="my">ကာ</td><td>low: long and level</td></tr>
<tr><td lang="my">ကား</td><td>high: long, often a little breathy; written with း</td></tr>
<tr><td lang="my">က့</td><td>creaky: short and tight; written with ့ or no mark</td></tr>
<tr><td lang="my">ကက်</td><td>checked: cut off by a glottal stop</td></tr>
</table>
<p>The vowel sign shows the default tone, and the marks change it. The sounds in this app are spoken without tones, so listen to a native speaker for the melody.</p>`,
    },
    {
      title: "Medials: letters that cling",
      body: `<p>Burmese can put y, r, w or h between a consonant and its vowel by writing a medial sign on the consonant instead of a second letter: <span lang="my">ျ</span> on the right, <span lang="my">ြ</span> wrapped around, <span lang="my">ွ</span> below, <span lang="my">ှ</span> as a tail below.</p>
<p>In modern speech ky and kr are both said ch: <span lang="my">ကျောင်း</span> (school) is spelled kyaung and said chaung, and <span lang="my">မြန်မာ</span> (Myanmar) is said myanma, with the r turned into a y.</p>`,
    },
    {
      title: "The asat and final sounds",
      body: `<p>A consonant at the end of a syllable carries the asat, <span lang="my">်</span>, a small curl on top that kills its vowel. Final stops are not said fully: k, t and p all become a catch in the throat, and n, m and ng all become a nasal vowel.</p>
<p>So <span lang="my">ကြက်</span> (chicken) is spelled kr-a-k but said chet, with a catch at the end.</p>`,
    },
  ],
});
