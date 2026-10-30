// Telugu for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization, meaning, text to speak, IPA].
// Romanization is a simplified ISO 15919. Hints, groupings and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "telugu",
  title: "Telugu",
  native: "తెలుగు",
  lang: "te-IN",
  langName: "Telugu",
  font: '"Noto Sans Telugu", "Telugu Sangam MN", "Gautami", "Nirmala UI", sans-serif',
  blurb: "A round script whose letters wear a small tick on top. Nearly every Telugu word ends in a vowel.",
  writeTip: "Write the round body first, then the tick (talakattu) on top. Vowel signs replace the tick or hang on the right.",
  lessons: [
    {
      title: "Vowels",
      note: "Telugu keeps short and long vowels apart, including e and o.",
      group: "Vowels",
      cols: 4,
      chars: [
        ["అ", "a", "short a, like u in but", "అమ్మ", "amma", "mother", "", "a"],
        ["ఆ", "ā", "long a, as in father", "ఆవు", "āvu", "cow", "", "aː"],
        ["ఇ", "i", "short i, as in bit", "ఇల్లు", "illu", "house", "", "i"],
        ["ఈ", "ī", "long ee, as in see", "ఈగ", "īga", "housefly", "", "iː"],
        ["ఉ", "u", "short u, as in put", "ఉడుత", "uḍuta", "squirrel", "", "u"],
        ["ఊ", "ū", "long oo, as in food", "ఊయల", "ūyala", "swing", "", "uː"],
        ["ఋ", "ru", "said ru", "ఋషి", "ruṣi", "sage", "", "ru"],
        ["ఎ", "e", "short e, as in bed", "ఎలుక", "eluka", "rat", "", "e"],
        ["ఏ", "ē", "long e, as in hey without the glide", "ఏనుగు", "ēnugu", "elephant", "", "eː"],
        ["ఐ", "ai", "ai as in aisle", "ఐదు", "aidu", "five", "", "ai"],
        ["ఒ", "o", "short o", "ఒంటె", "oṇṭe", "camel", "", "o"],
        ["ఓ", "ō", "long o, as in go without the glide", "ఓడ", "ōḍa", "ship", "", "oː"],
        ["ఔ", "au", "ow as in cow", "ఔషధం", "auṣadhaṁ", "medicine", "", "au"],
        ["అం", "aṁ", "sunna: a nasal n or m sound", "అంగడి", "aṅgaḍi", "shop", "", "am"],
      ],
    },
    {
      title: "Vowel signs on క",
      note: "The vowel sign takes the place of the tick or hangs from the letter's right side.",
      group: "Vowel signs",
      cols: 4,
      chars: [
        ["కా", "kā", "ా: long ā", "కాకి", "kāki", "crow", "", "kaː"],
        ["కి", "ki", "ి: i, a curl on top", "కిటికీ", "kiṭikī", "window", "", "ki"],
        ["కీ", "kī", "ీ: ī, a curl with a tail", "కీటకం", "kīṭakaṁ", "insect", "", "kiː"],
        ["కు", "ku", "ు: u, a hook on the right", "కుక్క", "kukka", "dog", "", "ku"],
        ["కూ", "kū", "ూ: ū, a longer hook", "కూర", "kūra", "curry", "", "kuː"],
        ["కృ", "kru", "ృ: ru", "కృషి", "kruṣi", "hard work", "", "kru"],
        ["కె", "ke", "ె: short e", "కెరటం", "keraṭaṁ", "wave", "", "ke"],
        ["కే", "kē", "ే: long ē", "కేక", "kēka", "shout", "", "keː"],
        ["కై", "kai", "ై: ai, with a mark below", "", "", "", "", "kai"],
        ["కొ", "ko", "ొ: short o", "కొండ", "koṇḍa", "hill", "", "ko"],
        ["కో", "kō", "ో: long ō", "కోతి", "kōti", "monkey", "", "koː"],
        ["కౌ", "kau", "ౌ: au", "కౌగిలి", "kaugili", "hug", "", "kau"],
        ["క్", "k", "్ virama: removes the built-in a", "", "", "", "", "k"],
      ],
    },
    {
      title: "Velar consonants (back of the mouth)",
      note: "Each row of five follows the same pattern: plain, aspirated, voiced, voiced aspirated, nasal. The aspirated letters are mostly used in words from Sanskrit.",
      group: "Consonants",
      chars: [
        ["క", "ka", "k, no puff of air", "కమలం", "kamalaṁ", "lotus", "", "ka"],
        ["ఖ", "kha", "k with a puff of air", "ఖడ్గం", "khaḍgaṁ", "sword", "", "kʰa"],
        ["గ", "ga", "g", "గడియారం", "gaḍiyāraṁ", "clock", "", "ɡa"],
        ["ఘ", "gha", "g with a breathy release", "ఘంట", "ghaṇṭa", "bell", "", "ɡʱa"],
        ["ఙ", "ṅa", "ng; very rare", "", "", "", "", "ŋa"],
      ],
    },
    {
      title: "Palatal consonants",
      group: "Consonants",
      chars: [
        ["చ", "ca", "ch, or ts before a, o and u", "చేప", "cēpa", "fish", "", "tʃa"],
        ["ఛ", "cha", "ch with a puff of air", "ఛత్రం", "chatraṁ", "parasol", "", "tʃʰa"],
        ["జ", "ja", "j, or dz before a, o and u", "జడ", "jaḍa", "braid", "", "dʒa"],
        ["ఝ", "jha", "j with a breathy release", "ఝరి", "jhari", "stream", "", "dʒʱa"],
        ["ఞ", "ña", "ny; very rare", "", "", "", "", "ɲa"],
      ],
    },
    {
      title: "Retroflex consonants",
      note: "Curl the tongue tip back and touch the roof of the mouth.",
      group: "Consonants",
      chars: [
        ["ట", "ṭa", "t with the tongue curled back", "టమాట", "ṭamāṭa", "tomato", "", "ʈa"],
        ["ఠ", "ṭha", "curled-back t with a puff of air", "కంఠం", "kaṇṭhaṁ", "throat", "", "ʈʰa"],
        ["డ", "ḍa", "d with the tongue curled back", "డబ్బు", "ḍabbu", "money", "", "ɖa"],
        ["ఢ", "ḍha", "curled-back d, breathy; rare", "", "", "", "", "ɖʱa"],
        ["ణ", "ṇa", "n with the tongue curled back", "బాణం", "bāṇaṁ", "arrow", "", "ɳa"],
      ],
    },
    {
      title: "Dental consonants",
      note: "Tongue tip against the back of the upper teeth: softer than English t and d.",
      group: "Consonants",
      chars: [
        ["త", "ta", "t with the tongue on the teeth", "తల", "tala", "head", "", "t̪a"],
        ["థ", "tha", "dental t with a puff of air (not th as in thin)", "రథం", "rathaṁ", "chariot", "", "t̪ʰa"],
        ["ద", "da", "d with the tongue on the teeth", "దారం", "dāraṁ", "thread", "", "d̪a"],
        ["ధ", "dha", "dental d, breathy", "ధనుస్సు", "dhanussu", "bow", "", "d̪ʱa"],
        ["న", "na", "n", "నది", "nadi", "river", "", "na"],
      ],
    },
    {
      title: "Labial consonants (lips)",
      group: "Consonants",
      chars: [
        ["ప", "pa", "p, no puff of air", "పాలు", "pālu", "milk", "", "pa"],
        ["ఫ", "pha", "p with a puff of air; often said f", "ఫలం", "phalaṁ", "fruit", "", "pʰa"],
        ["బ", "ba", "b", "బల్ల", "balla", "table", "", "ba"],
        ["భ", "bha", "b with a breathy release", "భూమి", "bhūmi", "earth", "", "bʱa"],
        ["మ", "ma", "m", "మామిడి", "māmiḍi", "mango", "", "ma"],
      ],
    },
    {
      title: "Semivowels, sibilants and h",
      group: "More consonants",
      cols: 4,
      chars: [
        ["య", "ya", "y", "యంత్రం", "yantraṁ", "machine", "", "ja"],
        ["ర", "ra", "a tapped r", "రాజు", "rāju", "king", "", "ɾa"],
        ["ల", "la", "l", "లడ్డు", "laḍḍu", "laddu (a sweet)", "", "la"],
        ["వ", "va", "between v and w", "వల", "vala", "net", "", "ʋa"],
        ["శ", "śa", "sh", "శంఖం", "śaṅkhaṁ", "conch shell", "", "ʃa"],
        ["ష", "ṣa", "sh with the tongue curled back", "", "", "", "", "ʂa"],
        ["స", "sa", "s", "సింహం", "siṁhaṁ", "lion", "", "sa"],
        ["హ", "ha", "h", "హంస", "haṁsa", "swan", "", "ɦa"],
      ],
    },
    {
      title: "Special letters",
      group: "More consonants",
      cols: 3,
      chars: [
        ["ళ", "ḷa", "l with the tongue curled back", "తాళం", "tāḷaṁ", "lock", "", "ɭa"],
        ["క్ష", "kṣa", "k + sh", "క్షమ", "kṣama", "forgiveness", "", "kʃa"],
        ["ఱ", "ṟa", "an older, trilled r; rarely used today", "", "", "", "", "ra"],
      ],
    },
  ],
  articles: [
    {
      title: "The tick on top",
      body: `<p>Most Telugu consonants wear a small check mark on top, the <i>talakattu</i>. It is the built-in vowel a: <span lang="te">క</span> is ka. When you add another vowel, the tick is replaced by that vowel's sign: <span lang="te">కి</span> ki, <span lang="te">కె</span> ke. A few letters, like <span lang="te">ఙ</span> and <span lang="te">ణ</span>, have no tick at all.</p>
<p>Telugu letters grew round because they were written with a stylus on palm leaves, where straight lines along the grain would split the leaf.</p>`,
    },
    {
      title: "Second forms (vattulu)",
      body: `<p>When two consonants meet with no vowel between them, the second one is written as a small 'subscript' form under or beside the first. These are called <i>vattulu</i>:</p>
<table>
<tr><td lang="te">క్ + క = క్క</td><td>kka, as in <span lang="te">కుక్క</span> (dog)</td></tr>
<tr><td lang="te">మ్ + మ = మ్మ</td><td>mma, as in <span lang="te">అమ్మ</span> (mother)</td></tr>
<tr><td lang="te">త్ + ర = త్ర</td><td>tra, as in <span lang="te">యంత్రం</span> (machine)</td></tr>
</table>
<p>Most second forms look like a shrunken version of the full letter without its tick. A few, like the one for ర, look quite different.</p>`,
    },
    {
      title: "Words end in vowels",
      body: `<p>Telugu has been called 'the Italian of the East' because nearly every word ends in a vowel: <span lang="te">ఇల్లు</span> illu, <span lang="te">పాలు</span> pālu. A final m in Sanskrit words is written with the sunna (ం), as in <span lang="te">కమలం</span> kamalaṁ, and said as a soft m or nasal vowel.</p>`,
    },
  ],
});
