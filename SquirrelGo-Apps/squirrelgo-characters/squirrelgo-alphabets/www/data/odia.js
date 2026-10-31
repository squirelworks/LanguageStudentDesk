// Odia for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization, meaning, text to speak, IPA].
// Romanization is a simplified IAST that keeps the final a Odia still says.
// Hints, groupings and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "odia",
  title: "Odia",
  native: "ଓଡ଼ିଆ",
  lang: "or-IN",
  langName: "Odia",
  font: '"Noto Sans Oriya", "Kalinga", "Nirmala UI", sans-serif',
  blurb: "The round-topped script of Odisha. Consonants carry a built-in o, and Odia still says it at the end of a word.",
  writeTip: "Most Odia letters start with the round cap on top, drawn left to right, then the body below it. Vowel signs go on after the consonant.",
  lessons: [
    {
      title: "Vowels",
      note: "These full vowel letters are used at the start of a word or after another vowel.",
      group: "Vowels",
      cols: 4,
      chars: [
        ["ଅ", "a", "short o, like aw in saw but shorter", "ଅଙ୍ଗୁର", "aṅgura", "grapes", "", "ɔ"],
        ["ଆ", "ā", "a as in father", "ଆମ୍ବ", "āmba", "mango", "", "a"],
        ["ଇ", "i", "i as in bit", "ଇଟା", "iṭā", "brick", "", "i"],
        ["ଈ", "ī", "ee as in see; in speech the same as ଇ", "ଈଶ୍ୱର", "īśwara", "God", "", "i"],
        ["ଉ", "u", "u as in put", "ଉଟ", "uṭa", "camel", "", "u"],
        ["ଊ", "ū", "oo as in food; in speech the same as ଉ", "ଊର୍ମି", "ūrmi", "wave", "", "u"],
        ["ଋ", "ru", "said ru", "ଋଷି", "ruṣi", "sage", "", "ru"],
        ["ଏ", "e", "e as in hey", "ଏକ", "eka", "one", "", "e"],
        ["ଐ", "ai", "oi as in coin, or ai", "ଐରାବତ", "airābata", "Airavata, Indra's elephant", "", "oi"],
        ["ଓ", "o", "o as in go", "ଓଠ", "oṭha", "lip", "", "o"],
        ["ଔ", "au", "ou as in loud", "ଔଷଧ", "auṣadha", "medicine", "", "ou"],
        ["ଅଂ", "aṁ", "anusvara: an ng or m sound after the vowel", "ଅଂଶ", "aṁśa", "part, share", "", "ɔŋ"],
      ],
    },
    {
      title: "Vowel signs on କ",
      note: "After a consonant, a vowel is written as a sign attached to it. େ is written before the consonant but said after it, and ୋ wraps around it.",
      group: "Vowel signs",
      cols: 4,
      chars: [
        ["କା", "kā", "ା: ā, a stroke on the right", "କାକ", "kāka", "crow", "", "ka"],
        ["କି", "ki", "ି: i, a hook on the top right", "କିଛି", "kichi", "something", "", "ki"],
        ["କୀ", "kī", "ୀ: the long i sign, a tall stroke on the right", "କୀଟ", "kīṭa", "insect", "", "ki"],
        ["କୁ", "ku", "ୁ: u, hangs below", "କୁକୁର", "kukura", "dog", "", "ku"],
        ["କୂ", "kū", "ୂ: the long u sign", "କୂଳ", "kūḷa", "shore", "", "ku"],
        ["କୃ", "kru", "ୃ: ru", "କୃଷକ", "kruṣaka", "farmer", "", "kru"],
        ["କେ", "ke", "େ: e, written first", "କେଶ", "keśa", "hair", "", "ke"],
        ["କୈ", "kai", "ୈ: ai, written first with a tick on top", "କୈଳାସ", "kaiḷāsa", "Mount Kailash", "", "koi"],
        ["କୋ", "ko", "ୋ: o, the e sign before and the ā stroke after", "କୋଠରି", "koṭhari", "room", "", "ko"],
        ["କୌ", "kau", "ୌ: au", "କୌଶଳ", "kauśaḷa", "skill", "", "kou"],
        ["କଂ", "kaṁ", "ଂ: nasal", "", "", "", "", "kɔŋ"],
        ["କ୍", "k", "୍: halanta, removes the built-in o", "", "", "", "", "k"],
      ],
    },
    {
      title: "Velar consonants (back of the mouth)",
      note: "Each row of five follows the same pattern: plain, aspirated, voiced, voiced aspirated, nasal.",
      group: "Consonants",
      chars: [
        ["କ", "ka", "k, no puff of air", "କମଳା", "kamaḷā", "orange", "", "kɔ"],
        ["ଖ", "kha", "k with a puff of air", "ଖଟ", "khaṭa", "cot, bed", "", "kʰɔ"],
        ["ଗ", "ga", "g", "ଗାଈ", "gāī", "cow", "", "ɡɔ"],
        ["ଘ", "gha", "g with a breathy release", "ଘର", "ghara", "house", "", "ɡʱɔ"],
        ["ଙ", "ṅa", "ng; only inside words", "", "", "", "", "ŋɔ"],
      ],
    },
    {
      title: "Palatal consonants",
      group: "Consonants",
      chars: [
        ["ଚ", "ca", "ch, no puff of air", "ଚା", "cā", "tea", "", "tʃɔ"],
        ["ଛ", "cha", "ch with a puff of air", "ଛତା", "chatā", "umbrella", "", "tʃʰɔ"],
        ["ଜ", "ja", "j", "ଜହ୍ନ", "jahna", "moon", "", "dʒɔ"],
        ["ଝ", "jha", "j with a breathy release", "ଝିଅ", "jhia", "girl, daughter", "", "dʒʱɔ"],
        ["ଞ", "ña", "ny; rare", "", "", "", "", "ɲɔ"],
      ],
    },
    {
      title: "Retroflex consonants",
      note: "Curl the tongue tip back and touch the roof of the mouth.",
      group: "Consonants",
      chars: [
        ["ଟ", "ṭa", "t with the tongue curled back", "ଟଙ୍କା", "ṭaṅkā", "rupee, money", "", "ʈɔ"],
        ["ଠ", "ṭha", "curled-back t with a puff of air", "ଠେକୁଆ", "ṭhekuā", "rabbit", "", "ʈʰɔ"],
        ["ଡ", "ḍa", "d with the tongue curled back", "ଡାକ୍ତର", "ḍāktara", "doctor", "", "ɖɔ"],
        ["ଢ", "ḍha", "curled-back d, breathy", "ଢୋଲ", "ḍhola", "drum", "", "ɖʱɔ"],
        ["ଣ", "ṇa", "n with the tongue curled back", "ପାଣି", "pāṇi", "water", "", "ɳɔ"],
      ],
    },
    {
      title: "Dental consonants",
      note: "Tongue tip against the back of the upper teeth: softer than English t and d.",
      group: "Consonants",
      chars: [
        ["ତ", "ta", "t with the tongue on the teeth", "ତେନ୍ତୁଳି", "tentuḷi", "tamarind", "", "t̪ɔ"],
        ["ଥ", "tha", "dental t with a puff of air (not th as in thin)", "ଥାଳି", "thāḷi", "plate", "", "t̪ʰɔ"],
        ["ଦ", "da", "d with the tongue on the teeth", "ଦାନ୍ତ", "dānta", "tooth", "", "d̪ɔ"],
        ["ଧ", "dha", "dental d, breathy", "ଧନୁ", "dhanu", "bow", "", "d̪ʱɔ"],
        ["ନ", "na", "n", "ନଦୀ", "nadī", "river", "", "nɔ"],
      ],
    },
    {
      title: "Labial consonants (lips)",
      group: "Consonants",
      chars: [
        ["ପ", "pa", "p, no puff of air", "ପଦ୍ମ", "padma", "lotus", "", "pɔ"],
        ["ଫ", "pha", "p with a puff of air; often said f", "ଫୁଲ", "phula", "flower", "", "pʰɔ"],
        ["ବ", "ba", "b", "ବାଘ", "bāgha", "tiger", "", "bɔ"],
        ["ଭ", "bha", "b with a breathy release", "ଭାଲୁ", "bhālu", "bear", "", "bʱɔ"],
        ["ମ", "ma", "m", "ମାଛ", "mācha", "fish", "", "mɔ"],
      ],
    },
    {
      title: "Semivowels and sibilants",
      note: "Odia has two letters for j and three for s: ଯ is said like ଜ, and ଶ ଷ ସ are all said s.",
      group: "More consonants",
      cols: 4,
      chars: [
        ["ଯ", "ja", "j; the old letter for y, now said like ଜ", "ଯନ୍ତ୍ର", "jantra", "machine", "", "dʒɔ"],
        ["ୟ", "ya", "y; the letter with a dot used for the y sound", "ଦୟା", "dayā", "mercy", "", "jɔ"],
        ["ର", "ra", "a tapped r", "ରଥ", "ratha", "chariot", "", "ɾɔ"],
        ["ଲ", "la", "l", "ଲେମ୍ବୁ", "lembu", "lemon", "", "lɔ"],
        ["ଳ", "ḷa", "l with the tongue curled back; never at the start of a word", "କଦଳୀ", "kadaḷī", "banana", "", "ɭɔ"],
        ["ୱ", "wa", "w; mostly in clusters like ଶ୍ୱ", "", "", "", "", "wɔ"],
        ["ଶ", "śa", "s; in Sanskrit words, sh", "ଶଙ୍ଖ", "śaṅkha", "conch shell", "", "sɔ"],
        ["ଷ", "ṣa", "s; said like ଶ", "ଷଣ୍ଢ", "ṣaṇḍha", "bull", "", "sɔ"],
        ["ସ", "sa", "s", "ସାପ", "sāpa", "snake", "", "sɔ"],
        ["ହ", "ha", "h", "ହାତୀ", "hātī", "elephant", "", "ɦɔ"],
      ],
    },
    {
      title: "Special letters and signs",
      note: "Two letters with a dot below for the flapped r sounds, a conjunct learned as a letter, and the signs for a breath of h and a nasal vowel, shown on ଅ.",
      group: "More consonants",
      cols: 3,
      chars: [
        ["ଡ଼", "ṛa", "a flapped r with the tongue curled back", "ଗାଡ଼ି", "gāṛi", "cart, car", "", "ɽɔ"],
        ["ଢ଼", "ṛha", "the flapped r with a breath", "ଆଷାଢ଼", "āṣāṛha", "Asadha, a month of the monsoon", "", "ɽʱɔ"],
        ["କ୍ଷ", "kṣa", "k + kh; said khyo", "କ୍ଷମା", "kṣamā", "forgiveness", "", "kʰjɔ"],
        ["ଅଃ", "aḥ", "ଃ visarga: a breath of h after a vowel", "ଦୁଃଖ", "duḥkha", "sorrow", "", "ɔh"],
        ["ଅଁ", "ã", "ଁ chandrabindu: says the vowel through the nose", "ହଁ", "hã", "yes", "", "ɔ̃"],
      ],
    },
  ],
  articles: [
    {
      title: "Why the letters are round",
      body: `<p>Odia was written for centuries by scratching palm leaves with an iron stylus, then rubbing soot into the scratches. A long straight line along the top, like the Devanagari headline, would follow the grain of the leaf and split it, so scribes drew it as a curve instead. That is the round cap that sits on almost every letter: compare Odia <span lang="or">କ ଗ ମ</span> with Hindi <span lang="hi">क ग म</span>.</p>
<p>Because the caps all look alike, the part to watch is the body under the cap.</p>`,
    },
    {
      title: "Odia keeps its o",
      body: `<p>Every consonant carries a short vowel, said o as in hot. Hindi, Bengali and Gujarati drop that vowel at the end of most words, but Odia keeps it: <span lang="or">ଘର</span> (house) is ghara, not ghar, and <span lang="or">କମଳ</span> (lotus) is kamaḷa.</p>
<p>To end a word on a bare consonant, Odia writes the halanta, <span lang="or">କ୍</span>, or joins the consonant to the next one.</p>`,
    },
    {
      title: "Letters that sound the same",
      body: `<p>Spelling keeps the letters of the Sanskrit alphabet, but speech has merged some of them:</p>
<table>
<tr><td lang="or">ଶ ଷ ସ</td><td>all said s</td></tr>
<tr><td lang="or">ଜ ଯ</td><td>both said j; the y sound is written <span lang="or">ୟ</span>, with a dot</td></tr>
<tr><td lang="or">ଇ ଈ, ଉ ଊ</td><td>short and long vowels said alike</td></tr>
<tr><td lang="or">ଣ ନ</td><td>often said alike</td></tr>
</table>
<p>So learn which letter a word uses by sight, as English speakers learn ph and f.</p>`,
    },
    {
      title: "Conjuncts",
      body: `<p>When two consonants meet with no vowel between them, the second is usually written smaller, under or beside the first:</p>
<table>
<tr><td lang="or">ନ୍ + ତ = ନ୍ତ</td><td>nt, as in <span lang="or">ଦାନ୍ତ</span> (tooth)</td></tr>
<tr><td lang="or">ମ୍ + ବ = ମ୍ବ</td><td>mb, as in <span lang="or">ଆମ୍ବ</span> (mango)</td></tr>
<tr><td lang="or">ଶ୍ + ୱ = ଶ୍ୱ</td><td>św, as in <span lang="or">ଈଶ୍ୱର</span> (God)</td></tr>
</table>
<p>A <span lang="or">ର</span> before a consonant becomes a small hook on top, as in <span lang="or">ଊର୍ମି</span>.</p>`,
    },
  ],
});
