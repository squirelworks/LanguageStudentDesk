// Neo-Tifinagh for SquirrelGo Alphabets, in the IRCAM standard used for Amazigh
// (Berber) in Morocco. Each character is [letter, romanization, sound hint, example,
// example romanization, meaning, text to speak, IPA, example language, example IPA].
// Romanization is the usual Latin spelling of Amazigh (ɣ for the gargled r, ɛ for
// the throat sound). eSpeak NG has no Amazigh voice, so the sounds are made from
// the IPA. Hints, groupings and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "tifinagh",
  title: "Tifinagh",
  native: "ⵜⵉⴼⵉⵏⴰⵖ",
  lang: "zgh",
  langName: "Amazigh",
  audio: "ipa",
  voice: "hi",
  font: '"Noto Sans Tifinagh", "Ebrima", sans-serif',
  blurb: "The geometric alphabet of the Amazigh (Berber) languages: circles, lines and dots, 33 letters in the Moroccan standard.",
  writeTip: "Tifinagh letters are built from straight lines, circles and dots. Draw lines top to bottom and left to right, and circles in one stroke from the top.",
  lessons: [
    {
      title: "Vowels",
      group: "Vowels",
      cols: 4,
      note: "Amazigh has three full vowels and a short e that is often not written at all.",
      chars: [
        ["ⴰ", "a", "a as in father; named ya", "ⴰⵎⴰⵏ", "aman", "water", "", "a", "", "aman"],
        ["ⵉ", "i", "ee as in see; named yi", "ⵉⵎⵉ", "imi", "mouth", "", "i", "", "imi"],
        ["ⵓ", "u", "oo as in food; named yu", "ⵓⵍ", "ul", "heart", "", "u", "", "ul"],
        ["ⴻ", "e", "a short uh; named yey", "", "", "", "", "ə", "", ""],
      ],
    },
    {
      title: "Familiar sounds",
      group: "Consonants",
      cols: 5,
      note: "Each letter is named ya plus its sound: ⴱ is yab. Many are simple shapes: a circle, a square, a cross.",
      chars: [
        ["ⴱ", "b", "b", "ⴰⴱⵔⵉⴷ", "abrid", "road, path", "", "b", "", "abrid"],
        ["ⴷ", "d", "d", "ⴰⴷⵔⴰⵔ", "adrar", "mountain", "", "d", "", "adrar"],
        ["ⴼ", "f", "f", "ⴰⴼⵓⵙ", "afus", "hand", "", "f", "", "afus"],
        ["ⴳ", "g", "g as in go", "ⴰⴳⵍⵍⵉⴷ", "agellid", "king", "", "ɡ", "", "aɡəllid"],
        ["ⴽ", "k", "k", "ⴰⴽⴰⵍ", "akal", "earth, land", "", "k", "", "akal"],
        ["ⵍ", "l", "l", "ⴰⵍⵖⵎ", "alɣem", "camel", "", "l", "", "alʁəm"],
        ["ⵎ", "m", "m", "ⴰⵎⴰⵣⵉⵖ", "amaziɣ", "Amazigh, a free person", "", "m", "", "amaziʁ"],
        ["ⵏ", "n", "n", "ⵏⴽⴽ", "nekk", "I, me", "", "n", "", "nəkk"],
        ["ⵔ", "r", "a rolled r", "ⴰⵔⴳⴰⵣ", "argaz", "man", "", "r", "", "arɡaz"],
        ["ⵙ", "s", "s", "ⴰⵙⵉⴼ", "asif", "river", "", "s", "", "asif"],
        ["ⵜ", "t", "t; the cross", "ⵜⴰⴼⵓⴽⵜ", "tafukt", "sun", "", "t", "", "tafukt"],
        ["ⵡ", "w", "w", "ⴰⵡⴰⵍ", "awal", "word, speech", "", "w", "", "awal"],
        ["ⵢ", "y", "y as in yes", "ⴰⵢⵢⵓⵔ", "ayyur", "moon, month", "", "j", "", "ajjur"],
        ["ⵣ", "z", "z; the sign on the Amazigh flag", "ⴰⵣⵓⵍ", "azul", "hello", "", "z", "", "azul"],
        ["ⵀ", "h", "h", "", "", "", "", "h", "", ""],
      ],
    },
    {
      title: "Hushing and throat sounds",
      group: "Consonants",
      cols: 4,
      note: "Sounds from the back of the mouth and throat, shared with Arabic, and two hushing sounds.",
      chars: [
        ["ⵛ", "c", "sh as in ship", "ⴰⵎⵓⵛⵛ", "amucc", "cat", "", "ʃ", "", "amuʃʃ"],
        ["ⵊ", "j", "s as in measure", "", "", "", "", "ʒ", "", ""],
        ["ⵅ", "x", "ch as in Scottish loch", "ⵉⵅⴼ", "ixef", "head", "", "χ", "", "iχəf"],
        ["ⵖ", "ɣ", "a gargled r, as in French rue", "ⴰⵖⵔⵓⵎ", "aɣrum", "bread", "", "ʁ", "", "aʁrum"],
        ["ⵇ", "q", "k made far back in the throat", "", "", "", "", "q", "", ""],
        ["ⵃ", "ḥ", "a strong breathy h from the throat", "", "", "", "", "ħ", "", ""],
        ["ⵄ", "ɛ", "a squeezed sound from the throat, like Arabic ʿayn", "", "", "", "", "ʕ", "", ""],
      ],
    },
    {
      title: "Emphatic letters",
      group: "Consonants",
      cols: 5,
      note: "Said with the tongue pulled back, which darkens the vowels around them. Each is a plain letter with an extra mark.",
      chars: [
        ["ⴹ", "ḍ", "a heavy d; ⴷ with a bar", "ⵉⴹ", "iḍ", "night", "", "dˤ", "", "idˤ"],
        ["ⵟ", "ṭ", "a heavy t; the cross inside a circle", "ⵜⵉⵟ", "tiṭ", "eye", "", "tˤ", "", "titˤ"],
        ["ⵚ", "ṣ", "a heavy s", "", "", "", "", "sˤ", "", ""],
        ["ⵕ", "ṛ", "a heavy r", "", "", "", "", "rˤ", "", ""],
        ["ⵥ", "ẓ", "a heavy z", "ⴰⵥⵕⵓ", "aẓṛu", "stone", "", "zˤ", "", "azˤrˤu"],
      ],
    },
    {
      title: "Rounded k and g",
      group: "Consonants",
      cols: 2,
      note: "A small mark after ⴽ or ⴳ adds a w sound to it.",
      chars: [
        ["ⴳⵯ", "gʷ", "g said with rounded lips, gw", "", "", "", "", "ɡʷ", "", ""],
        ["ⴽⵯ", "kʷ", "k said with rounded lips, kw", "", "", "", "", "kʷ", "", ""],
      ],
    },
  ],
  articles: [
    {
      title: "An old script, renewed",
      body: `<p>Tifinagh descends from the Libyco-Berber alphabet, carved on rocks and stones across North Africa more than two thousand years ago. The Tuareg of the Sahara kept using it, mostly for short messages, love poems and graffiti, while most other Amazigh communities came to write their languages in Arabic or Latin letters.</p>
<p>In the 20th century activists revived it as a symbol of Amazigh identity, and in 2003 Morocco's Royal Institute of Amazigh Culture (IRCAM) set the standard taught here. Amazigh became an official language of Morocco in 2011, and Tifinagh now appears on road signs and in schools.</p>`,
    },
    {
      title: "Shapes from geometry",
      body: `<p>Tifinagh letters are made from a few simple parts: a circle (<span lang="zgh">ⵔ</span> r, <span lang="zgh">ⵙ</span> s), a cross (<span lang="zgh">ⵜ</span> t), lines and dots. Related sounds often share a shape: the emphatic letters add a bar or a circle to the plain one, as in <span lang="zgh">ⴷ</span> d and <span lang="zgh">ⴹ</span> ḍ.</p>
<p>The letter <span lang="zgh">ⵣ</span> (yaz) stands for the word amaziɣ, a free person, and is drawn in red on the Amazigh flag.</p>`,
    },
    {
      title: "Writing without vowels",
      body: `<p>The old Tuareg script wrote few or no vowels, and could run in any direction. The modern standard writes the vowels a, i and u, and runs left to right. The short e, <span lang="zgh">ⴻ</span>, is often left out: <span lang="zgh">ⵏⴽⴽ</span> is nekk, I.</p>
<p>Many nouns start with a- and feminine nouns start and end with t: <span lang="zgh">ⴰⵎⵖⴰⵔ</span> (amɣar, old man, chief) and <span lang="zgh">ⵜⴰⵎⵖⴰⵔⵜ</span> (tamɣart, woman).</p>`,
    },
  ],
});
