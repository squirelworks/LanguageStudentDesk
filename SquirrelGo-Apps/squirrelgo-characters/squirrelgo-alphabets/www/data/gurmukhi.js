// Gurmukhi (as used for Punjabi) for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization, meaning, text to speak, IPA].
// Romanization is a simplified scholarly one. Hints, groupings and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "gurmukhi",
  title: "Gurmukhi",
  native: "ਗੁਰਮੁਖੀ",
  lang: "pa-IN",
  langName: "Punjabi",
  font: '"Noto Sans Gurmukhi", "Gurmukhi MN", "Raavi", "Nirmala UI", sans-serif',
  blurb: "The script for Punjabi in India. Vowels are built on three carrier letters, and some letters stand for tones.",
  writeTip: "Write the letter body first, then the headline across the top. ੳ, ਅ and ੲ are carriers: write the carrier, then the vowel sign.",
  lessons: [
    {
      title: "Vowels",
      note: "Gurmukhi has no separate vowel letters. A vowel at the start of a word is a vowel sign written on one of three carriers: ੳ for u sounds and o, ਅ for a and the au/ai sounds, ੲ for i and e.",
      group: "Vowels",
      cols: 4,
      chars: [
        ["ਅ", "a", "short a, like u in but", "ਅਨਾਰ", "anār", "pomegranate", "", "ə"],
        ["ਆ", "ā", "long a, as in father", "ਆਲੂ", "ālū", "potato", "", "aː"],
        ["ਇ", "i", "short i, as in bit", "ਇੱਟ", "iṭṭ", "brick", "", "ɪ"],
        ["ਈ", "ī", "long ee, as in see", "ਈਦ", "īd", "Eid", "", "iː"],
        ["ਉ", "u", "short u, as in put", "ਉੱਲੂ", "ullū", "owl", "", "ʊ"],
        ["ਊ", "ū", "long oo, as in food", "ਊਠ", "ūṭh", "camel", "", "uː"],
        ["ਏ", "e", "e as in hey, without the glide", "ਏਕਤਾ", "ektā", "unity", "", "eː"],
        ["ਐ", "ai", "a as in bat", "ਐਨਕ", "ainak", "spectacles", "", "ɛː"],
        ["ਓ", "o", "o as in go, without the glide", "ਓਖਲੀ", "okhlī", "mortar", "", "oː"],
        ["ਔ", "au", "aw as in saw", "ਔਰਤ", "aurat", "woman", "", "ɔː"],
      ],
    },
    {
      title: "Vowel signs on ਕ",
      note: "After a consonant the same signs attach to it. ਿ is written before the consonant but said after it.",
      group: "Vowel signs",
      cols: 4,
      chars: [
        ["ਕਾ", "kā", "ਾ kanna: long ā", "ਕਾਰ", "kār", "car", "", "kaː"],
        ["ਕਿ", "ki", "ਿ sihari: short i, written first", "ਕਿਤਾਬ", "kitāb", "book", "", "kɪ"],
        ["ਕੀ", "kī", "ੀ bihari: long ī", "ਕੀੜੀ", "kīṛī", "ant", "", "kiː"],
        ["ਕੁ", "ku", "ੁ aunkar: short u, below", "ਕੁੱਤਾ", "kuttā", "dog", "", "kʊ"],
        ["ਕੂ", "kū", "ੂ dulainkar: long ū, below", "ਕੂੜਾ", "kūṛā", "rubbish", "", "kuː"],
        ["ਕੇ", "ke", "ੇ lanv: e", "ਕੇਲਾ", "kelā", "banana", "", "keː"],
        ["ਕੈ", "kai", "ੈ dulanvan: ai", "ਕੈਂਚੀ", "kaiñcī", "scissors", "", "kɛː"],
        ["ਕੋ", "ko", "ੋ hora: o", "ਕੋਇਲ", "koil", "cuckoo", "", "koː"],
        ["ਕੌ", "kau", "ੌ kanaura: au", "ਕੌਮ", "kaum", "nation", "", "kɔː"],
        ["ਕੰ", "kaṅ", "ੰ tippi: a nasal n or m", "ਕੰਘੀ", "kaṅghī", "comb", "", "kəŋ"],
        ["ਕਾਂ", "kā̃", "ਂ bindi: makes the vowel nasal", "ਗਾਂ", "gā̃", "cow", "", "kãː"],
        ["ਕੱ", "kak", "ੱ addak: doubles the next consonant", "ਅੱਖ", "akkh", "eye", "", "kək"],
      ],
    },
    {
      title: "The first row: carriers, s and h",
      note: "The alphabet (painti, 'the thirty-five') starts with the three vowel carriers, then s and h.",
      group: "Consonants",
      chars: [
        ["ੳ", "ūṛā", "carrier for u, ū and o", "", "", "", "ਉ", "ʊ"],
        ["ੲ", "īṛī", "carrier for i, ī and e", "", "", "", "ਇ", "ɪ"],
        ["ਸ", "sa", "s", "ਸੱਪ", "sapp", "snake", "", "sə"],
        ["ਹ", "ha", "h", "ਹਾਥੀ", "hāthī", "elephant", "", "ɦə"],
      ],
    },
    {
      title: "Velar consonants (back of the mouth)",
      note: "The fourth letter of each row, once a breathy sound, is now said like the first letter plus a falling tone on the vowel.",
      group: "Consonants",
      chars: [
        ["ਕ", "ka", "k, no puff of air", "ਕਬੂਤਰ", "kabūtar", "pigeon", "", "kə"],
        ["ਖ", "kha", "k with a puff of air", "ਖਰਗੋਸ਼", "khargosh", "rabbit", "", "kʰə"],
        ["ਗ", "ga", "g", "ਗਾਂ", "gā̃", "cow", "", "ɡə"],
        ["ਘ", "gha", "said k with a low falling tone", "ਘਰ", "ghar", "house", "", "kə̀"],
        ["ਙ", "ṅa", "ng; very rare", "", "", "", "", "ŋə"],
      ],
    },
    {
      title: "Palatal consonants",
      group: "Consonants",
      chars: [
        ["ਚ", "ca", "ch, no puff of air", "ਚਾਹ", "cāh", "tea", "", "tʃə"],
        ["ਛ", "cha", "ch with a puff of air", "ਛਤਰੀ", "chatrī", "umbrella", "", "tʃʰə"],
        ["ਜ", "ja", "j", "ਜਹਾਜ਼", "jahāz", "ship", "", "dʒə"],
        ["ਝ", "jha", "said ch with a low falling tone", "ਝੰਡਾ", "jhaṇḍā", "flag", "", "tʃə̀"],
        ["ਞ", "ña", "ny; very rare", "", "", "", "", "ɲə"],
      ],
    },
    {
      title: "Retroflex consonants",
      note: "Curl the tongue tip back and touch the roof of the mouth.",
      group: "Consonants",
      chars: [
        ["ਟ", "ṭa", "t with the tongue curled back", "ਟਮਾਟਰ", "ṭamāṭar", "tomato", "", "ʈə"],
        ["ਠ", "ṭha", "curled-back t with a puff of air", "ਠੰਢਾ", "ṭhaṇḍhā", "cold", "", "ʈʰə"],
        ["ਡ", "ḍa", "d with the tongue curled back", "ਡੱਬਾ", "ḍabbā", "box", "", "ɖə"],
        ["ਢ", "ḍha", "said ṭ with a low falling tone", "ਢੋਲ", "ḍhol", "barrel drum", "", "ʈə̀"],
        ["ਣ", "ṇa", "n with the tongue curled back; never starts a word", "ਪਾਣੀ", "pāṇī", "water", "", "ɳə"],
      ],
    },
    {
      title: "Dental consonants",
      note: "Tongue tip against the back of the upper teeth: softer than English t and d.",
      group: "Consonants",
      chars: [
        ["ਤ", "ta", "t with the tongue on the teeth", "ਤਰਬੂਜ਼", "tarbūz", "watermelon", "", "t̪ə"],
        ["ਥ", "tha", "dental t with a puff of air (not th as in thin)", "ਥਾਲੀ", "thālī", "plate", "", "t̪ʰə"],
        ["ਦ", "da", "d with the tongue on the teeth", "ਦਵਾਈ", "davāī", "medicine", "", "d̪ə"],
        ["ਧ", "dha", "said dental t with a low falling tone", "ਧੁੱਪ", "dhupp", "sunshine", "", "t̪ə̀"],
        ["ਨ", "na", "n", "ਨਲ", "nal", "tap", "", "nə"],
      ],
    },
    {
      title: "Labial consonants (lips)",
      group: "Consonants",
      chars: [
        ["ਪ", "pa", "p, no puff of air", "ਪਤੰਗ", "patang", "kite", "", "pə"],
        ["ਫ", "pha", "p with a puff of air", "ਫਲ", "phal", "fruit", "", "pʰə"],
        ["ਬ", "ba", "b", "ਬੱਤਖ", "battakh", "duck", "", "bə"],
        ["ਭ", "bha", "said p with a low falling tone", "ਭਾਲੂ", "bhālū", "bear", "", "pə̀"],
        ["ਮ", "ma", "m", "ਮੱਛੀ", "macchī", "fish", "", "mə"],
      ],
    },
    {
      title: "The last row",
      group: "Consonants",
      chars: [
        ["ਯ", "ya", "y", "ਯਾਰ", "yār", "friend", "", "jə"],
        ["ਰ", "ra", "a tapped r", "ਰੱਥ", "ratth", "chariot", "", "ɾə"],
        ["ਲ", "la", "l", "ਲੜਕਾ", "laṛkā", "boy", "", "lə"],
        ["ਵ", "va", "between v and w", "ਵਾਲ", "vāl", "hair", "", "ʋə"],
        ["ੜ", "ṛa", "a flap: curl the tongue back and flick it forward", "ਪਹਾੜ", "pahāṛ", "mountain", "", "ɽə"],
      ],
    },
    {
      title: "Letters with a dot (pair bindi)",
      note: "A dot under the foot of a letter gives a sound borrowed from Persian, Arabic or English.",
      group: "More consonants",
      cols: 3,
      chars: [
        ["ਸ਼", "sha", "sh", "ਸ਼ੇਰ", "sher", "lion", "", "ʃə"],
        ["ਖ਼", "xa", "kh as in Scottish loch", "ਖ਼ਬਰ", "xabar", "news", "", "xə"],
        ["ਗ਼", "ġa", "a soft gargled g", "ਗ਼ਰੀਬ", "ġarīb", "poor", "", "ɣə"],
        ["ਜ਼", "za", "z", "ਜ਼ਮੀਨ", "zamīn", "land", "", "zə"],
        ["ਫ਼", "fa", "f", "ਫ਼ੌਜ", "fauj", "army", "", "fə"],
        ["ਲ਼", "ḷa", "a retroflex l, tongue curled back", "", "", "", "", "ɭə"],
      ],
    },
  ],
  articles: [
    {
      title: "How Gurmukhi works",
      body: `<p>Gurmukhi was standardised in the 1500s by the second Sikh Guru, and its name means 'from the mouth of the Guru'. It is an <i>abugida</i>: each consonant includes a short a, so <span lang="pa">ਕ</span> is ka. Other vowels are signs written around the consonant.</p>
<p>Unlike Devanagari, Gurmukhi has no separate letters for vowels at the start of a word. Instead it uses three carriers, <span lang="pa">ੳ ਅ ੲ</span>, and puts the vowel sign on them: <span lang="pa">ਉ</span> is ੳ with the u sign, <span lang="pa">ਇ</span> is ੲ with the i sign.</p>
<p>Letters hang from a headline that runs across the word: <span lang="pa">ਪੰਜਾਬ</span>.</p>`,
    },
    {
      title: "Tones",
      body: `<p>Punjabi is the only major Indian language with tones, and the script shows them in an unexpected way. The letters <span lang="pa">ਘ ਝ ਢ ਧ ਭ</span> once stood for breathy sounds. Today, at the start of a word, they are said like <span lang="pa">ਕ ਚ ਟ ਤ ਪ</span> with a low tone that rises again:</p>
<table>
<tr><td lang="pa">ਘਰ</td><td>ghar on paper, said kàr (house)</td></tr>
<tr><td lang="pa">ਕਰ</td><td>kar (do), level tone</td></tr>
</table>
<p>Inside or at the end of a word, the same letters, and ਹ, give a high falling tone to the vowel before them instead: <span lang="pa">ਚਾਹ</span> (tea) and <span lang="pa">ਪੜ੍ਹ</span> (read). Listen to the recordings to hear the pitch.</p>`,
    },
    {
      title: "Nasal and double signs",
      body: `<p>Three small signs above the line are worth learning early.</p>
<table>
<tr><td lang="pa">ੰ tippi</td><td>an n or m sound, used with short vowels: <span lang="pa">ਪੰਜ</span> (five)</td></tr>
<tr><td lang="pa">ਂ bindi</td><td>a nasal vowel, used with long vowels: <span lang="pa">ਮਾਂ</span> (mother)</td></tr>
<tr><td lang="pa">ੱ addak</td><td>doubles the consonant after it: <span lang="pa">ਪੱਤਾ</span> (leaf)</td></tr>
</table>
<p>Gurmukhi rarely stacks consonants. Only ਰ, ਹ and ਵ regularly attach below another letter, as in <span lang="pa">ਪ੍ਰੀਤ</span>.</p>`,
    },
    {
      title: "One language, two scripts",
      body: `<p>Punjabi is written in Gurmukhi in India and in Shahmukhi, a form of the Arabic script, in Pakistan. The spoken language is largely the same across the border.</p>
<p>The dotted letters (<span lang="pa">ਸ਼ ਖ਼ ਗ਼ ਜ਼ ਫ਼</span>) were added to write words from Persian and Arabic. Many speakers drop the dot in everyday writing and say ਜ for ਜ਼, so you will see both spellings.</p>`,
    },
  ],
});
