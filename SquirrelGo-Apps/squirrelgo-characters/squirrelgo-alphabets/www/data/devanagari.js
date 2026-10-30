// Devanagari (as used for Hindi) for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization, meaning, text to speak, IPA].
// Romanization is a simplified IAST. Hints, groupings and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "devanagari",
  title: "Devanagari",
  native: "देवनागरी",
  lang: "hi-IN",
  langName: "Hindi",
  font: '"Noto Sans Devanagari", "Kohinoor Devanagari", "Mangal", "Nirmala UI", sans-serif',
  blurb: "The script for Hindi, Marathi, Nepali and Sanskrit. Consonants carry a built-in a.",
  writeTip: "Write the letter body first, then the headline (shirorekha) across the top, which joins the letters of a word.",
  lessons: [
    {
      title: "Vowels",
      note: "These full vowel letters are used at the start of a word or after another vowel.",
      group: "Vowels",
      cols: 4,
      chars: [
        ["अ", "a", "short a, like u in but", "अब", "ab", "now", "", "ə"],
        ["आ", "ā", "long a, as in father", "आम", "ām", "mango", "", "aː"],
        ["इ", "i", "short i, as in bit", "इमली", "imlī", "tamarind", "", "ɪ"],
        ["ई", "ī", "long ee, as in see", "ईख", "īkh", "sugarcane", "", "iː"],
        ["उ", "u", "short u, as in put", "उल्लू", "ullū", "owl", "", "ʊ"],
        ["ऊ", "ū", "long oo, as in food", "ऊन", "ūn", "wool", "", "uː"],
        ["ऋ", "ṛ", "said ri in Hindi", "ऋषि", "ṛṣi", "sage", "", "rɪ"],
        ["ए", "e", "e as in hey, without the glide", "एक", "ek", "one", "", "eː"],
        ["ऐ", "ai", "a as in bat", "ऐनक", "ainak", "spectacles", "", "ɛː"],
        ["ओ", "o", "o as in go, without the glide", "ओस", "os", "dew", "", "oː"],
        ["औ", "au", "aw as in saw", "औरत", "aurat", "woman", "", "ɔː"],
        ["अं", "aṁ", "anusvara: nasal n or m sound after a vowel", "अंगूर", "aṅgūr", "grapes", "", "əŋ"],
      ],
    },
    {
      title: "Vowel signs on क",
      note: "After a consonant, a vowel is written as a sign (matra) attached to it. ि is written before the consonant but said after it.",
      group: "Vowel signs",
      cols: 4,
      chars: [
        ["का", "kā", "ा: long ā", "काम", "kām", "work", "", "kaː"],
        ["कि", "ki", "ि: short i, written first", "किताब", "kitāb", "book", "", "kɪ"],
        ["की", "kī", "ी: long ī", "कील", "kīl", "nail", "", "kiː"],
        ["कु", "ku", "ु: short u, hangs below", "कुत्ता", "kuttā", "dog", "", "kʊ"],
        ["कू", "kū", "ू: long ū, hangs below", "कूलर", "kūlar", "air cooler", "", "kuː"],
        ["कृ", "kṛ", "ृ: ri", "कृपया", "kṛpayā", "please", "", "krɪ"],
        ["के", "ke", "े: e", "केला", "kelā", "banana", "", "keː"],
        ["कै", "kai", "ै: ai", "कैसे", "kaise", "how", "", "kɛː"],
        ["को", "ko", "ो: o", "कोयल", "koyal", "cuckoo", "", "koː"],
        ["कौ", "kau", "ौ: au", "कौआ", "kauā", "crow", "", "kɔː"],
        ["कं", "kaṁ", "ं: nasal", "कंघी", "kaṅghī", "comb", "", "kəŋ"],
        ["क्", "k", "्: halant, removes the built-in a", "", "", "", "", "k"],
      ],
    },
    {
      title: "Velar consonants (back of the mouth)",
      note: "Each row of five follows the same pattern: plain, aspirated, voiced, voiced aspirated, nasal.",
      group: "Consonants",
      chars: [
        ["क", "ka", "k, no puff of air", "कमल", "kamal", "lotus", "", "kə"],
        ["ख", "kha", "k with a puff of air", "खरगोश", "khargoś", "rabbit", "", "kʰə"],
        ["ग", "ga", "g", "गमला", "gamlā", "flowerpot", "", "ɡə"],
        ["घ", "gha", "g with a breathy release", "घर", "ghar", "house", "", "ɡʱə"],
        ["ङ", "ṅa", "ng; only inside words", "", "", "", "", "ŋə"],
      ],
    },
    {
      title: "Palatal consonants",
      group: "Consonants",
      chars: [
        ["च", "ca", "ch, no puff of air", "चम्मच", "cammac", "spoon", "", "tʃə"],
        ["छ", "cha", "ch with a puff of air", "छतरी", "chatrī", "umbrella", "", "tʃʰə"],
        ["ज", "ja", "j", "जहाज़", "jahāz", "ship", "", "dʒə"],
        ["झ", "jha", "j with a breathy release", "झंडा", "jhaṇḍā", "flag", "", "dʒʱə"],
        ["ञ", "ña", "ny; rare in Hindi", "", "", "", "", "ɲə"],
      ],
    },
    {
      title: "Retroflex consonants",
      note: "Curl the tongue tip back and touch the roof of the mouth. This gives the 'hard' t and d of Indian English.",
      group: "Consonants",
      chars: [
        ["ट", "ṭa", "t with the tongue curled back", "टमाटर", "ṭamāṭar", "tomato", "", "ʈə"],
        ["ठ", "ṭha", "curled-back t with a puff of air", "ठंडा", "ṭhaṇḍā", "cold", "", "ʈʰə"],
        ["ड", "ḍa", "d with the tongue curled back", "डमरू", "ḍamrū", "hand drum", "", "ɖə"],
        ["ढ", "ḍha", "curled-back d, breathy", "ढोल", "ḍhol", "barrel drum", "", "ɖʱə"],
        ["ण", "ṇa", "n with the tongue curled back", "बाण", "bāṇ", "arrow", "", "ɳə"],
      ],
    },
    {
      title: "Dental consonants",
      note: "Tongue tip against the back of the upper teeth: softer than English t and d.",
      group: "Consonants",
      chars: [
        ["त", "ta", "t with the tongue on the teeth", "तरबूज़", "tarbūz", "watermelon", "", "t̪ə"],
        ["थ", "tha", "dental t with a puff of air (not th as in thin)", "थाली", "thālī", "plate", "", "t̪ʰə"],
        ["द", "da", "d with the tongue on the teeth", "दवा", "davā", "medicine", "", "d̪ə"],
        ["ध", "dha", "dental d, breathy", "धनुष", "dhanuṣ", "bow", "", "d̪ʱə"],
        ["न", "na", "n", "नल", "nal", "tap", "", "nə"],
      ],
    },
    {
      title: "Labial consonants (lips)",
      group: "Consonants",
      chars: [
        ["प", "pa", "p, no puff of air", "पतंग", "patang", "kite", "", "pə"],
        ["फ", "pha", "p with a puff of air; often said f", "फल", "phal", "fruit", "", "pʰə"],
        ["ब", "ba", "b", "बतख़", "batakh", "duck", "", "bə"],
        ["भ", "bha", "b with a breathy release", "भालू", "bhālū", "bear", "", "bʱə"],
        ["म", "ma", "m", "मछली", "machlī", "fish", "", "mə"],
      ],
    },
    {
      title: "Semivowels and sibilants",
      group: "More consonants",
      cols: 4,
      chars: [
        ["य", "ya", "y", "यह", "yah", "this", "", "jə"],
        ["र", "ra", "a tapped r", "रथ", "rath", "chariot", "", "ɾə"],
        ["ल", "la", "l", "लड़का", "laṛkā", "boy", "", "lə"],
        ["व", "va", "between v and w", "वन", "van", "forest", "", "ʋə"],
        ["श", "śa", "sh", "शेर", "śer", "lion, tiger", "", "ʃə"],
        ["ष", "ṣa", "sh; in Hindi said like श", "षट्कोण", "ṣaṭkoṇ", "hexagon", "", "ʃə"],
        ["स", "sa", "s", "सड़क", "saṛak", "road", "", "sə"],
        ["ह", "ha", "h, slightly breathy", "हाथी", "hāthī", "elephant", "", "ɦə"],
      ],
    },
    {
      title: "Special letters",
      note: "Two flapped sounds marked with a dot, and three conjuncts so common they are learned as letters.",
      group: "More consonants",
      cols: 4,
      chars: [
        ["ड़", "ṛa", "a flap: curl the tongue back and flick it forward", "पेड़", "peṛ", "tree", "", "ɽə"],
        ["ढ़", "ṛha", "the same flap, breathy", "पढ़ना", "paṛhnā", "to read, to study", "", "ɽʱə"],
        ["क्ष", "kṣa", "k + sh", "क्षमा", "kṣamā", "forgiveness", "", "kʃə"],
        ["त्र", "tra", "t + r", "त्रिभुज", "tribhuj", "triangle", "", "t̪ɾə"],
        ["ज्ञ", "gya", "said gya in Hindi", "ज्ञान", "gyān", "knowledge", "", "ɡjə"],
        ["श्र", "śra", "sh + r", "श्रम", "śram", "labor", "", "ʃɾə"],
      ],
    },
  ],
  articles: [
    {
      title: "How Devanagari works",
      body: `<p>Devanagari is an <i>abugida</i>: every consonant letter already includes a short a. <span lang="hi">क</span> on its own is ka, not k. To write another vowel you attach a vowel sign; to remove the vowel entirely you add a small slanted stroke called halant (<span lang="hi">क्</span>).</p>
<p>Letters hang from a horizontal headline, the <i>shirorekha</i>, which runs unbroken across a whole word: <span lang="hi">नमस्ते</span>.</p>
<p>The consonants are arranged by where the sound is made, from the throat to the lips. Each row has five letters in the same order: plain, aspirated, voiced, voiced and breathy, nasal. Learn one row and you know the pattern for all of them. Open the chart to see the grid.</p>`,
    },
    {
      title: "Vowel signs (matras)",
      body: `<p>Each vowel except a has two forms: a full letter for the start of a word and a sign for use after a consonant.</p>
<table>
<tr><td lang="hi">आ / ा</td><td><span lang="hi">का</span> kā</td></tr>
<tr><td lang="hi">इ / ि</td><td><span lang="hi">कि</span> ki, written before the consonant</td></tr>
<tr><td lang="hi">ई / ी</td><td><span lang="hi">की</span> kī</td></tr>
<tr><td lang="hi">उ / ु</td><td><span lang="hi">कु</span> ku, below</td></tr>
<tr><td lang="hi">ए / े</td><td><span lang="hi">के</span> ke, above</td></tr>
<tr><td lang="hi">ओ / ो</td><td><span lang="hi">को</span> ko</td></tr>
</table>
<p>With <span lang="hi">र</span> the u signs attach to the side instead: <span lang="hi">रु</span> ru, <span lang="hi">रू</span> rū.</p>`,
    },
    {
      title: "Conjunct consonants",
      body: `<p>When two consonants meet with no vowel between them, they usually fuse into a conjunct. Often the first letter loses its vertical stroke and leans on the second:</p>
<table>
<tr><td lang="hi">स् + त = स्त</td><td>st, as in <span lang="hi">नमस्ते</span></td></tr>
<tr><td lang="hi">प् + य = प्य</td><td>py, as in <span lang="hi">प्यार</span> (love)</td></tr>
<tr><td lang="hi">क् + य = क्य</td><td>ky, as in <span lang="hi">क्या</span> (what)</td></tr>
</table>
<p><span lang="hi">र</span> is special: before another consonant it becomes a small hook on top (<span lang="hi">र्म</span> in <span lang="hi">धर्म</span>), and after one it becomes a small slanted stroke below (<span lang="hi">प्र</span>).</p>`,
    },
    {
      title: "Aspiration and retroflex sounds",
      body: `<p>Two contrasts English does not make change meaning in Hindi.</p>
<p><b>Aspiration.</b> Hold a hand in front of your mouth. <span lang="hi">क</span> (ka) gives almost no puff of air, <span lang="hi">ख</span> (kha) gives a strong one. <span lang="hi">काना</span> (one-eyed) and <span lang="hi">खाना</span> (food) are different words.</p>
<p><b>Retroflex versus dental.</b> For <span lang="hi">ट ड</span> curl the tongue tip back; for <span lang="hi">त द</span> press it against the teeth. English t sits between the two, so you need to move your tongue further in both directions.</p>`,
    },
    {
      title: "The silent a",
      body: `<p>Hindi often drops the built-in a, especially at the end of a word and in the middle of longer words. The spelling keeps it; the pronunciation does not.</p>
<table>
<tr><td lang="hi">कमल</td><td>written ka-ma-la, said kamal</td></tr>
<tr><td lang="hi">समझना</td><td>written sa-ma-jha-nā, said samajhnā</td></tr>
</table>
<p>As a rule of thumb, drop the final a of a word, and listen to the audio to learn the middle ones.</p>`,
    },
  ],
});
