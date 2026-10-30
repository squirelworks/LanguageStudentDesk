// Canadian Aboriginal syllabics as used for Inuktitut (Nunavut) in SquirrelGo Alphabets.
// Each character is [character, romanization, sound hint, example, example romanization,
// meaning, text to speak, IPA, example language, example IPA]. eSpeak NG has no
// Inuktitut voice, so sounds are recorded from the IPA. Hints, groupings and
// articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "syllabics",
  title: "Syllabics",
  native: "ᖃᓂᐅᔮᖅᐸᐃᑦ",
  lang: "iu",
  langName: "Inuktitut",
  audio: "ipa",
  voice: "hi",
  bareVowel: "before",
  font: '"Noto Sans Canadian Aboriginal", "Euphemia UCAS", "Gadugi", sans-serif',
  chartFlow: false,
  blurb: "Inuktitut syllabics: one shape per consonant, turned to show the vowel, plus a small form for the consonant alone.",
  writeTip: "Every row reuses one shape. Learn the shape once, then the three directions it points in: i, u and a.",
  lessons: [
    {
      title: "Vowels, p and t",
      group: "Syllables",
      cols: 4,
      note: "Each row is a consonant; the shape turns to show the vowel: pointing up for i, right for u, left for a. The small raised form is the consonant on its own, with no vowel.",
      chars: [
        ["ᐃ", "i", "i as in machine (or e as in hey)", "ᐃᓄᒃ", "inuk", "person", "", "i", "", "inuk"],
        ["ᐅ", "u", "u as in rule (or o as in note)", "ᐅᒥᐊᖅ", "umiaq", "boat", "", "u", "", "umiaq"],
        ["ᐊ", "a", "a as in father", "ᐊᒪᕈᖅ", "amaruq", "wolf", "", "a", "", "amaʁuq"],
        null,
        ["ᐱ", "pi", "p as in spin + i", "ᐱᓱᒃᑐᖅ", "pisuktuq", "he or she walks", "", "pi", "", "pisuktuq"],
        ["ᐳ", "pu", "p + u", "", "", "", "", "pu", "", ""],
        ["ᐸ", "pa", "p + a", "ᐸᓇ", "pana", "snow knife", "", "pa", "", "pana"],
        ["ᑉ", "p", "p on its own, with no vowel; written small and raised", "", "", "", "", "p", "", ""],
        ["ᑎ", "ti", "t as in stop + i", "ᑎᖕᒥᐊᖅ", "tingmiaq", "bird", "", "ti", "", "tiŋmiaq"],
        ["ᑐ", "tu", "t + u", "ᑐᒃᑐ", "tuktu", "caribou", "", "tu", "", "tuktu"],
        ["ᑕ", "ta", "t + a", "ᑕᕆᐅᖅ", "tariuq", "sea", "", "ta", "", "taʁiuq"],
        ["ᑦ", "t", "t on its own, with no vowel; written small and raised", "", "", "", "", "t", "", ""],
      ],
    },
    {
      title: "k, g and m",
      group: "Syllables",
      cols: 4,
      chars: [
        ["ᑭ", "ki", "k as in skip + i", "ᑭᓇ", "kina", "who", "", "ki", "", "kina"],
        ["ᑯ", "ku", "k + u", "", "", "", "", "ku", "", ""],
        ["ᑲ", "ka", "k + a", "", "", "", "", "ka", "", ""],
        ["ᒃ", "k", "k on its own, with no vowel; written small and raised", "", "", "", "", "k", "", ""],
        ["ᒋ", "gi", "g, softened between vowels + i", "", "", "", "", "ɡi", "", ""],
        ["ᒍ", "gu", "g + u", "", "", "", "", "ɡu", "", ""],
        ["ᒐ", "ga", "g + a", "", "", "", "", "ɡa", "", ""],
        ["ᒡ", "g", "g on its own, with no vowel; written small and raised", "ᐃᒡᓗ", "iglu", "house", "", "ɡ", "", "iɡlu"],
        ["ᒥ", "mi", "m + i", "ᒥᑎᒃ", "mitik", "eider duck", "", "mi", "", "mitik"],
        ["ᒧ", "mu", "m + u", "", "", "", "", "mu", "", ""],
        ["ᒪ", "ma", "m + a", "", "", "", "", "ma", "", ""],
        ["ᒻ", "m", "m on its own, with no vowel; written small and raised", "", "", "", "", "m", "", ""],
      ],
    },
    {
      title: "n, s and l",
      group: "Syllables",
      cols: 4,
      chars: [
        ["ᓂ", "ni", "n + i", "", "", "", "", "ni", "", ""],
        ["ᓄ", "nu", "n + u", "ᓄᓇ", "nuna", "land", "", "nu", "", "nuna"],
        ["ᓇ", "na", "n + a", "ᓇᓄᖅ", "nanuq", "polar bear", "", "na", "", "nanuq"],
        ["ᓐ", "n", "n on its own, with no vowel; written small and raised", "", "", "", "", "n", "", ""],
        ["ᓯ", "si", "s (h in some dialects) + i", "ᓯᓚ", "sila", "weather, the outdoors", "", "si", "", "sila"],
        ["ᓱ", "su", "s + u", "", "", "", "", "su", "", ""],
        ["ᓴ", "sa", "s + a", "ᓴᕕᒃ", "savik", "knife", "", "sa", "", "savik"],
        ["ᔅ", "s", "s on its own, with no vowel; written small and raised", "", "", "", "", "s", "", ""],
        ["ᓕ", "li", "l + i", "", "", "", "", "li", "", ""],
        ["ᓗ", "lu", "l + u", "", "", "", "", "lu", "", ""],
        ["ᓚ", "la", "l + a", "", "", "", "", "la", "", ""],
        ["ᓪ", "l", "l on its own, with no vowel; written small and raised", "", "", "", "", "l", "", ""],
      ],
    },
    {
      title: "j, v and r",
      group: "Syllables",
      cols: 4,
      chars: [
        ["ᔨ", "ji", "y as in yes + i", "", "", "", "", "ji", "", ""],
        ["ᔪ", "ju", "j + u", "", "", "", "", "ju", "", ""],
        ["ᔭ", "ja", "j + a", "ᖁᔭᓐᓇᒦᒃ", "qujannamiik", "thank you", "", "ja", "", "qujannamiːk"],
        ["ᔾ", "j", "j on its own, with no vowel; written small and raised", "", "", "", "", "j", "", ""],
        ["ᕕ", "vi", "v + i", "", "", "", "", "vi", "", ""],
        ["ᕗ", "vu", "v + u", "", "", "", "", "vu", "", ""],
        ["ᕙ", "va", "v + a", "", "", "", "", "va", "", ""],
        ["ᕝ", "v", "v on its own, with no vowel; written small and raised", "", "", "", "", "v", "", ""],
        ["ᕆ", "ri", "a gargled r at the back of the throat, as in French + i", "", "", "", "", "ʁi", "", ""],
        ["ᕈ", "ru", "r + u", "", "", "", "", "ʁu", "", ""],
        ["ᕋ", "ra", "r + a", "", "", "", "", "ʁa", "", ""],
        ["ᕐ", "r", "r on its own, with no vowel; written small and raised", "", "", "", "", "ʁ", "", ""],
      ],
    },
    {
      title: "q, ng and ł",
      group: "Syllables",
      cols: 4,
      note: "ng and ł are written with two-part characters; q and ng are among the most common finals.",
      chars: [
        ["ᕿ", "qi", "a k from deep in the throat + i", "ᕿᒻᒥᖅ", "qimmiq", "dog", "", "qi", "", "qimmiq"],
        ["ᖁ", "qu", "q + u", "ᖁᓪᓕᖅ", "qulliq", "oil lamp", "", "qu", "", "qulliq"],
        ["ᖃ", "qa", "q + a", "ᖃᒧᑎᒃ", "qamutik", "sled", "", "qa", "", "qamutik"],
        ["ᖅ", "q", "q on its own, with no vowel; written small and raised", "", "", "", "", "q", "", ""],
        ["ᖏ", "ngi", "ng as in sing + i", "ᐊᖏᔪᖅ", "angijuq", "big", "", "ŋi", "", "aŋijuq"],
        ["ᖑ", "ngu", "ng + u", "", "", "", "", "ŋu", "", ""],
        ["ᖓ", "nga", "ng + a", "", "", "", "", "ŋa", "", ""],
        ["ᖕ", "ng", "ng on its own, with no vowel; written small and raised", "", "", "", "", "ŋ", "", ""],
        ["ᖠ", "łi", "a breathy l, as in Welsh ll + i", "", "", "", "", "ɬi", "", ""],
        ["ᖢ", "łu", "ł + u", "", "", "", "", "ɬu", "", ""],
        ["ᖤ", "ła", "ł + a", "", "", "", "", "ɬa", "", ""],
        ["ᖦ", "ł", "ł on its own, with no vowel; written small and raised", "", "", "", "", "ɬ", "", ""],
      ],
    },
  ],
  articles: [
    {
      title: "About syllabics",
      body: `<p>Canadian syllabics were created in 1840 by James Evans, a missionary, working with Cree speakers in what is now Manitoba. The system spread quickly because it is so regular, and was adapted for Ojibwe, Cree, Naskapi, Carrier, Blackfoot and, from the 1850s, Inuktitut.</p>
<p>Today Inuktitut syllabics are an official script of Nunavut and are used in Nunavik (northern Quebec). They appear on signs, in government documents and newspapers, and on phones and computers. Other Inuit regions write Inuktut in the Latin alphabet.</p>`,
    },
    {
      title: "How the shapes work",
      body: `<p>Each consonant has one shape. Its direction gives the vowel:</p>
<table>
<tr><td lang="iu">ᐱ ᐳ ᐸ</td><td>pi, pu, pa: the same shape pointing up, right and left</td></tr>
<tr><td lang="iu">ᑎ ᑐ ᑕ</td><td>ti, tu, ta</td></tr>
<tr><td lang="iu">ᓂ ᓄ ᓇ</td><td>ni, nu, na</td></tr>
</table>
<p>A small raised version of the a-form is the consonant with no vowel: <span lang="iu">ᑉ</span> p, <span lang="iu">ᑦ</span> t, <span lang="iu">ᓐ</span> n. So <span lang="iu">ᐃᓄᒃ</span> is i + nu + k: inuk, a person.</p>
<p>Inuktitut has only three vowels (i, u, a), which is why there are three directions. Syllabics for Cree also use an e-direction.</p>`,
    },
    {
      title: "Long vowels",
      body: `<p>A dot over a syllable makes its vowel long: <span lang="iu">ᒥ</span> mi, <span lang="iu">ᒦ</span> mii. In the word for thank you, <span lang="iu">ᖁᔭᓐᓇᒦᒃ</span> (qujannamiik), the dot on <span lang="iu">ᒦ</span> marks the long ii. Some writers leave the dots out, and some write the vowel twice instead (<span lang="iu">ᒥᐃ</span>).</p>`,
    },
  ],
});
