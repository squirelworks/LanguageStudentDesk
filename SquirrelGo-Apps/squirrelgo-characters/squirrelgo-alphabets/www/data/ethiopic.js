// Ge'ez script (fidel) as used for Amharic, for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization,
// meaning, text to speak, IPA]. Romanization uses ä for the first-order vowel and
// ə for the sixth; an apostrophe marks an ejective. Hints, groupings and articles
// are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "ethiopic",
  title: "Ethiopic",
  native: "ፊደል",
  lang: "am-ET",
  langName: "Amharic",
  font: '"Noto Sans Ethiopic", "Abyssinica SIL", "Nyala", "Segoe UI", sans-serif',
  chartFlow: true,
  blurb: "The base letters of the Amharic fidel, then the seven vowel orders every letter takes.",
  writeTip: "Each base letter carries the vowel ä. The other vowels are small additions to the same shape: a foot, a ring, a shortened leg. Learn the base shape first.",
  lessons: [
    {
      title: "First letters",
      group: "Base letters (with ä)",
      cols: 5,
      note: "Every letter is a whole syllable. These base forms all end in ä, a short vowel like the u in but.",
      chars: [
        ["ለ", "lä", "l + ä", "ልጅ", "ləj", "child", "", "lə"],
        ["መ", "mä", "m + ä", "መኪና", "mäkina", "car", "", "mə"],
        ["ረ", "rä", "a tapped r + ä", "ረጅም", "räjjim", "tall, long", "", "rə"],
        ["ሰ", "sä", "s + ä", "ሰላም", "sälam", "peace; hello", "", "sə"],
        ["ቀ", "q'ä", "a tight k from the back of the throat + ä", "ቀን", "q'än", "day", "", "kʼə"],
        ["በ", "bä", "b + ä", "በር", "bär", "door", "", "bə"],
        ["ተ", "tä", "t + ä", "ተማሪ", "tämari", "student", "", "tə"],
        ["ነ", "nä", "n + ä", "ነጭ", "näch'", "white", "", "nə"],
        ["አ", "ä", "a vowel on its own (a glottal catch before it)", "አባት", "abbat", "father", "", "ʔə"],
        ["ከ", "kä", "k + ä", "ከተማ", "kätäma", "city", "", "kə"],
      ],
    },
    {
      title: "More letters",
      group: "Base letters (with ä)",
      cols: 5,
      chars: [
        ["ወ", "wä", "w + ä", "ወንዝ", "wänz", "river", "", "wə"],
        ["ዘ", "zä", "z + ä", "ዘር", "zär", "seed", "", "zə"],
        ["የ", "yä", "y + ä", "የት", "yät", "where", "", "jə"],
        ["ደ", "dä", "d + ä", "ደብዳቤ", "däbdabe", "letter (mail)", "", "də"],
        ["ገ", "gä", "g + ä", "ገበያ", "gäbäya", "market", "", "ɡə"],
        ["ፈ", "fä", "f + ä", "ፈረስ", "färäs", "horse", "", "fə"],
        ["ሸ", "shä", "sh + ä", "ሸሚዝ", "shämiz", "shirt", "", "ʃə"],
        ["ቸ", "chä", "ch + ä", "ቸኮሌት", "chäkolet", "chocolate", "", "tʃə"],
        ["ጀ", "jä", "j + ä", "ጀልባ", "jälba", "boat", "", "dʒə"],
        ["ኘ", "ñä", "ny as in canyon + ä", "ዳኛ", "daña", "judge", "", "ɲə"],
        ["ዠ", "zhä", "s as in pleasure + ä; rare", "", "", "", "", "ʒə"],
        ["ቨ", "vä", "v + ä; only in borrowed words", "ቪዲዮ", "vidiyo", "video", "", "və"],
        ["ፐ", "pä", "p + ä; mostly in borrowed words", "ፓስታ", "pasta", "pasta", "", "pə"],
      ],
    },
    {
      title: "Ejectives",
      group: "Base letters (with ä)",
      cols: 5,
      note: "Tight, popped consonants: close the throat and push the sound out without breath from the lungs.",
      chars: [
        ["ጠ", "t'ä", "a popped t + ä", "ጠረጴዛ", "t'äräp'eza", "table", "", "tʼə"],
        ["ጨ", "ch'ä", "a popped ch + ä", "ጨው", "ch'äw", "salt", "", "tʃʼə"],
        ["ጰ", "p'ä", "a popped p + ä; rare", "ጰጰስ", "p'äp'p'as", "bishop", "", "pʼə"],
        ["ጸ", "ts'ä", "a popped ts + ä", "ጸሐይ", "ts'ähay", "sun", "", "tsʼə"],
      ],
    },
    {
      title: "Same sound, other letter",
      group: "Base letters (with ä)",
      cols: 5,
      note: "Ge'ez had more sounds than Amharic. In Amharic these letters are said like ones you know, but words keep their traditional spelling.",
      chars: [
        ["ሀ", "hä", "h + ä", "ሀገር", "hägär", "country", "", "hə"],
        ["ሐ", "hä", "said like ሀ; once a strong throat h", "ሐሙስ", "hamus", "Thursday", "", "hə"],
        ["ኀ", "hä", "said like ሀ; once a throaty kh", "ኀይል", "hayl", "power", "", "hə"],
        ["ኸ", "hä", "said like ሀ in Amharic; rare", "", "", "", "", "hə"],
        ["ሠ", "sä", "said like ሰ", "ሠላሳ", "sälasa", "thirty", "", "sə"],
        ["ዐ", "ä", "said like አ; once a throat sound", "ዐይን", "ayn", "eye", "", "ʔə"],
        ["ፀ", "ts'ä", "said like ጸ", "ፀጉር", "ts'ägur", "hair", "", "tsʼə"],
      ],
    },
    {
      title: "The seven orders on ለ",
      group: "Vowel orders",
      cols: 6,
      note: "Every base letter has seven forms, one per vowel. The base form ለ (lä) is the first; here are the other six. The changes are regular: a foot for u, a lower foot for i, a shortened leg for a, a ring for e, a bend for ə, and a raised mark for o.",
      chars: [
        ["ሉ", "lu", "2nd order (ka'ib): u, a stroke on the right middle", "", "", "", "ሉ", "lu"],
        ["ሊ", "li", "3rd order (salis): i, a foot on the right bottom", "", "", "", "ሊ", "li"],
        ["ላ", "la", "4th order (rabi'): a, the right leg shortened", "", "", "", "ላ", "la"],
        ["ሌ", "le", "5th order (hamis): e, a ring on the right foot", "", "", "", "ሌ", "le"],
        ["ል", "lə", "6th order (sadis): ə or no vowel, the leg bent", "", "", "", "ል", "lɨ"],
        ["ሎ", "lo", "7th order (sabi'): o, the leg raised", "", "", "", "ሎ", "lo"],
      ],
    },
    {
      title: "The seven orders on በ and ሰ",
      group: "Vowel orders",
      cols: 6,
      note: "The same patterns on በ (bä) and ሰ (sä). Not every letter follows them exactly; watch for small differences.",
      chars: [
        ["ቡ", "bu", "2nd order: u", "", "", "", "ቡ", "bu"],
        ["ቢ", "bi", "3rd order: i", "", "", "", "ቢ", "bi"],
        ["ባ", "ba", "4th order: a", "", "", "", "ባ", "ba"],
        ["ቤ", "be", "5th order: e", "ቤት", "bet", "house", "ቤ", "be"],
        ["ብ", "bə", "6th order: ə or none", "", "", "", "ብ", "bɨ"],
        ["ቦ", "bo", "7th order: o", "", "", "", "ቦ", "bo"],
        ["ሱ", "su", "2nd order: u", "", "", "", "ሱ", "su"],
        ["ሲ", "si", "3rd order: i", "", "", "", "ሲ", "si"],
        ["ሳ", "sa", "4th order: a", "ሳር", "sar", "grass", "ሳ", "sa"],
        ["ሴ", "se", "5th order: e", "", "", "", "ሴ", "se"],
        ["ስ", "sə", "6th order: ə or none", "ስም", "səm", "name", "ስ", "sɨ"],
        ["ሶ", "so", "7th order: o", "", "", "", "ሶ", "so"],
      ],
    },
  ],
  articles: [
    {
      title: "About the fidel",
      body: `<p>The Ethiopic script, called <span lang="am">ፊደል</span> (fidel), was first used for Ge'ez, the classical language of Ethiopia, more than 1,600 years ago. Ge'ez is still the language of the Ethiopian and Eritrean Orthodox churches. Today the script writes Amharic, Tigrinya, Tigre and several other languages of the Horn of Africa.</p>
<p>It started as an abjad of consonants. Around the 4th century, vowels were added as small changes to each letter, which turned it into an abugida: every character is a consonant plus a vowel.</p>`,
    },
    {
      title: "Reading the orders",
      body: `<p>Charts of the fidel are laid out as a grid: one row per consonant, seven columns for the vowel orders ä, u, i, a, e, ə, o. Amharic has about 33 base letters, so the full grid has over 230 characters, plus extra forms with a w-glide (<span lang="am">ሏ</span> lwa, <span lang="am">ቋ</span> q'wa).</p>
<p>You do not need to memorize 230 separate shapes. Learn the base letters, then learn the seven patterns. Most letters follow them; the ones that don't (<span lang="am">ሉ</span>, <span lang="am">ሩ</span>, <span lang="am">ፉ</span>, <span lang="am">ሎ</span> …) are worth noting as you meet them.</p>`,
    },
    {
      title: "The sixth order",
      body: `<p>The sixth order (<span lang="am">ል, ብ, ስ</span> …) is said with a short ə, or with no vowel at all. Amharic has no letter for a bare consonant, so the sixth order does both jobs: <span lang="am">ልጅ</span> (child) is ləj, with the ጅ said as plain j.</p>
<p>The rule of thumb: at the end of a word and before another consonant it is usually silent; between consonants that would be hard to say together it is a short ə.</p>`,
    },
    {
      title: "Doubled consonants",
      body: `<p>Amharic often doubles a consonant, holding it a little longer, and the fidel does not show it: <span lang="am">ገና</span> is gäna (still, yet) and also gänna (Christmas). Doubling can change the meaning, so learn it with each word. Dictionaries and textbooks sometimes mark it with a dot or a line over the letter.</p>`,
    },
  ],
});
