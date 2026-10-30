// Tamil for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization, meaning, text to speak, IPA].
// Romanization is a simplified ISO 15919. Hints, groupings and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "tamil",
  title: "Tamil",
  native: "தமிழ்",
  lang: "ta-IN",
  langName: "Tamil",
  font: '"Noto Sans Tamil", "Tamil Sangam MN", "Latha", "Nirmala UI", sans-serif',
  blurb: "One of the oldest living scripts, with 12 vowels and 18 consonants. One letter can stand for k or g.",
  writeTip: "Tamil letters are mostly drawn in one or two flowing strokes, starting at the top left. The dot (pulli) and vowel signs come last.",
  lessons: [
    {
      title: "Vowels (uyir, 'life')",
      note: "Tamil keeps short and long vowels apart, including e and o.",
      group: "Vowels",
      cols: 4,
      chars: [
        ["அ", "a", "short a, like u in but", "அம்மா", "ammā", "mother", "", "a"],
        ["ஆ", "ā", "long a, as in father", "ஆடு", "āṭu", "goat", "", "aː"],
        ["இ", "i", "short i, as in bit", "இலை", "ilai", "leaf", "", "i"],
        ["ஈ", "ī", "long ee, as in see", "ஈ", "ī", "housefly", "", "iː"],
        ["உ", "u", "short u, lips relaxed", "உரல்", "ural", "mortar", "", "u"],
        ["ஊ", "ū", "long oo, as in food", "ஊசி", "ūci", "needle", "", "uː"],
        ["எ", "e", "short e, as in bed", "எலி", "eli", "rat", "", "e"],
        ["ஏ", "ē", "long e, as in hey without the glide", "ஏணி", "ēṇi", "ladder", "", "eː"],
        ["ஐ", "ai", "ai as in aisle", "ஐந்து", "aintu", "five", "", "ai"],
        ["ஒ", "o", "short o", "ஒட்டகம்", "oṭṭakam", "camel", "", "o"],
        ["ஓ", "ō", "long o, as in go without the glide", "ஓடம்", "ōṭam", "boat", "", "oː"],
        ["ஔ", "au", "ow as in cow", "ஔவையார்", "auvaiyār", "Auvaiyar, a famous poet", "", "au"],
        ["ஃ", "ḵ", "āytam: a soft h or kh sound, very rare", "எஃகு", "eḵku", "steel", "", "h"],
      ],
    },
    {
      title: "Vowel signs on க",
      note: "Each consonant joined with a vowel (uyirmey, 'living body') has its own shape. ெ, ே and ை are written before the consonant.",
      group: "Vowel signs",
      cols: 4,
      chars: [
        ["கா", "kā", "ா: long ā", "காகம்", "kākam", "crow", "", "kaː"],
        ["கி", "ki", "ி: i, a loop on the top right", "கிளி", "kiḷi", "parrot", "", "ki"],
        ["கீ", "kī", "ீ: ī, a curl on the top right", "கீரை", "kīrai", "leafy greens", "", "kiː"],
        ["கு", "ku", "u: a hook below; the shape changes from letter to letter", "குடை", "kuṭai", "umbrella", "", "ku"],
        ["கூ", "kū", "ū: a hook with a tail; it too changes shape", "கூடை", "kūṭai", "basket", "", "kuː"],
        ["கெ", "ke", "ெ: short e, written first", "கெண்டை", "keṇṭai", "carp", "", "ke"],
        ["கே", "kē", "ே: long ē, written first", "கேள்வி", "kēḷvi", "question", "", "keː"],
        ["கை", "kai", "ை: ai, written first", "கை", "kai", "hand", "", "kai"],
        ["கொ", "ko", "ொ: o, on both sides", "கொடி", "koṭi", "flag, vine", "", "ko"],
        ["கோ", "kō", "ோ: ō, on both sides", "கோழி", "kōḻi", "hen", "", "koː"],
        ["கௌ", "kau", "ௌ: au, on both sides", "கௌதாரி", "kautāri", "partridge", "", "kau"],
        ["க்", "k", "் pulli: the dot removes the vowel", "", "", "", "", "k"],
      ],
    },
    {
      title: "Hard consonants (vallinam)",
      note: "Each of these is said voiceless at the start of a word or when doubled, and voiced or softened between vowels: க is k in கல் but g in பகல்.",
      group: "Consonants",
      cols: 3,
      chars: [
        ["க", "ka", "k; g or a soft h between vowels", "கண்", "kaṇ", "eye", "", "ka"],
        ["ச", "ca", "s or ch at the start; s or j between vowels", "சட்டை", "caṭṭai", "shirt", "", "tʃa"],
        ["ட", "ṭa", "t with the tongue curled back; ḍ between vowels", "பட்டம்", "paṭṭam", "kite", "", "ʈa"],
        ["த", "ta", "t with the tongue on the teeth; dh between vowels", "தண்ணீர்", "taṇṇīr", "water", "", "t̪a"],
        ["ப", "pa", "p; b between vowels", "பால்", "pāl", "milk", "", "pa"],
        ["ற", "ṟa", "a strong trilled r; tr when doubled", "கயிறு", "kayiṟu", "rope", "", "ra"],
      ],
    },
    {
      title: "Soft consonants (mellinam)",
      note: "The nasals. Each one goes with the hard consonant above it.",
      group: "Consonants",
      cols: 3,
      chars: [
        ["ங", "ṅa", "ng; almost always before க", "சங்கு", "caṅku", "conch shell", "", "ŋa"],
        ["ஞ", "ña", "ny", "ஞாயிறு", "ñāyiṟu", "sun, Sunday", "", "ɲa"],
        ["ண", "ṇa", "n with the tongue curled back", "மண்", "maṇ", "soil", "", "ɳa"],
        ["ந", "na", "n with the tongue on the teeth; starts words", "நண்டு", "naṇṭu", "crab", "", "n̪a"],
        ["ம", "ma", "m", "மரம்", "maram", "tree", "", "ma"],
        ["ன", "ṉa", "n with the tongue on the gum ridge; ends words", "மீன்", "mīṉ", "fish", "", "na"],
      ],
    },
    {
      title: "Medium consonants (idaiyinam)",
      note: "The in-between sounds, including ழ, the letter Tamil is proud of.",
      group: "Consonants",
      cols: 3,
      chars: [
        ["ய", "ya", "y", "யானை", "yāṉai", "elephant", "", "ja"],
        ["ர", "ra", "a light tapped r", "ரோஜா", "rōjā", "rose", "", "ɾa"],
        ["ல", "la", "l", "லட்டு", "laṭṭu", "laddu (a sweet)", "", "la"],
        ["வ", "va", "v, close to w", "வாழை", "vāḻai", "banana plant", "", "ʋa"],
        ["ழ", "ḻa", "curl the tongue far back without touching: between r and l", "பழம்", "paḻam", "fruit", "", "ɻa"],
        ["ள", "ḷa", "l with the tongue curled back", "வாள்", "vāḷ", "sword", "", "ɭa"],
      ],
    },
    {
      title: "Grantha letters",
      note: "Extra letters borrowed from the Grantha script to write Sanskrit and English words.",
      group: "More consonants",
      cols: 3,
      chars: [
        ["ஜ", "ja", "j", "ஜன்னல்", "jaṉṉal", "window", "", "dʒa"],
        ["ஷ", "ṣa", "sh", "விஷம்", "viṣam", "poison", "", "ʂa"],
        ["ஸ", "sa", "s", "பஸ்", "pas", "bus", "", "sa"],
        ["ஹ", "ha", "h", "ஹோட்டல்", "hōṭṭal", "hotel, restaurant", "", "ɦa"],
        ["க்ஷ", "kṣa", "k + sh", "", "", "", "", "kʂa"],
        ["ஸ்ரீ", "śrī", "shree: an honorific", "", "", "", "", "ʃriː"],
      ],
    },
  ],
  articles: [
    {
      title: "Life, body and the living letter",
      body: `<p>Tamil grammar names its letters after the body. The 12 vowels are <i>uyir</i>, 'life', and the 18 consonants are <i>mey</i>, 'body'. A consonant on its own is written with a dot, the <i>pulli</i>: <span lang="ta">க்</span> is a bare k.</p>
<p>Join a body to a life and you get an <i>uyirmey</i>, a 'living body': <span lang="ta">க் + அ = க</span> ka, <span lang="ta">க் + ஆ = கா</span> kā. With 18 × 12 combinations, there are 216 of these, but most are regular: the vowel signs ா ி ீ ெ ே ை ொ ோ ௌ look the same on every consonant.</p>
<p>The exceptions are u and ū, whose signs fuse with the consonant in a few different ways (<span lang="ta">கு மு து ரு</span>). Learn them in groups.</p>`,
    },
    {
      title: "One letter, two sounds",
      body: `<p>Tamil does not write the difference between k and g, t and d, or p and b. The same letter covers both, and the sound depends on where it sits:</p>
<table>
<tr><td>at the start of a word, or doubled</td><td>voiceless: <span lang="ta">பால்</span> pāl, <span lang="ta">அப்பா</span> appā</td></tr>
<tr><td>after a nasal</td><td>voiced: <span lang="ta">பந்து</span> pandu (ball)</td></tr>
<tr><td>between vowels</td><td>voiced or softened: <span lang="ta">பகல்</span> pagal (daytime)</td></tr>
</table>
<p>Tamil also has no aspirated letters: there is no separate kh or bh, which makes the alphabet one of the smallest in India.</p>`,
    },
    {
      title: "Three l's, three n's, two r's",
      body: `<p>To make up for the small alphabet, Tamil splits some sounds English treats as one.</p>
<table>
<tr><td lang="ta">ல ள ழ</td><td>plain l, curled-back l, and the zh-like ḻ of <span lang="ta">தமிழ்</span></td></tr>
<tr><td lang="ta">ந ன ண</td><td>dental n (start of a word), gum-ridge n (end of a word), curled-back n</td></tr>
<tr><td lang="ta">ர ற</td><td>a light tap and a strong trill</td></tr>
</table>
<p>ழ is hard for many learners and for some native speakers, who say it like ள. Aim for the tongue curled back without touching the roof of the mouth.</p>`,
    },
    {
      title: "Tamil numbers and old symbols",
      body: `<p>Tamil has its own digits (<span lang="ta">௧ ௨ ௩</span> for 1 2 3), but today people use the international digits almost everywhere. You may still see the old ones on clocks, temple walls and calendars.</p>`,
    },
  ],
});
