// The traditional Mongolian script (Uyghur-Mongolian, as used in Inner Mongolia) for
// SquirrelGo Alphabets. Each character is [letter, transliteration, sound hint, example,
// example transliteration, meaning, text to speak, IPA, example language, example IPA].
// The script is written in vertical columns; the app shows it upright. Example IPA is
// the modern spoken form, which is often shorter than the spelling. eSpeak NG has no
// Mongolian voice, so sounds are recorded from the IPA. Hints, groupings and articles
// are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "mongolian",
  title: "Mongolian",
  native: "ᠮᠣᠩᠭᠣᠯ",
  lang: "mn-Mong",
  langName: "Mongolian",
  vertical: true,
  audio: "ipa",
  voice: "hi",
  font: '"Noto Sans Mongolian", "Mongolian Baiti", sans-serif',
  chartFlow: true,
  blurb: "The vertical script of Inner Mongolia: seven vowels, the native consonants and the letters for borrowed words.",
  writeTip: "Mongolian is written from top to bottom along a central stem, in columns that run left to right. These are the letters on their own; in a word each one joins the stem and changes shape.",
  lessons: [
    {
      title: "Vowels",
      group: "Vowels",
      cols: 4,
      note: "Mongolian vowels come in two teams: back (a, o, u) and front (e, ö, ü), with i fitting either. A word uses vowels from one team only.",
      chars: [
        ["ᠠ", "a", "a as in father; back vowel", "ᠠᠪᠤ", "abu", "father", "", "a", "", "aw"],
        ["ᠡ", "e", "a short e or uh; front vowel", "ᠡᠵᠢ", "eji", "mother", "", "ə", "", "ədʒ"],
        ["ᠢ", "i", "ee as in see; goes with either team", "ᠪᠢ", "bi", "I, me", "", "i", "", "pi"],
        ["ᠣ", "o", "o as in more, open; back vowel", "ᠮᠣᠷᠢ", "mori", "horse", "", "ɔ", "", "mɔr"],
        ["ᠤ", "u", "oo as in book; back vowel", "ᠤᠰᠤ", "usu", "water", "", "ʊ", "", "ʊs"],
        ["ᠥ", "ö", "o as in note; front vowel", "ᠳᠥᠷᠪᠡ", "dörbe", "four", "", "o", "", "torəw"],
        ["ᠦ", "ü", "oo as in food; front vowel", "ᠶᠡᠰᠦ", "yesü", "nine", "", "u", "", "jəs"],
      ],
    },
    {
      title: "First consonants",
      group: "Consonants",
      cols: 4,
      chars: [
        ["ᠨ", "n", "n", "ᠨᠠᠷᠠ", "nara", "sun", "", "n", "", "nar"],
        ["ᠪ", "b", "a soft p or b", "ᠪᠢ", "bi", "I, me", "", "p", "", "pi"],
        ["ᠮ", "m", "m", "ᠮᠣᠩᠭᠣᠯ", "mongγol", "Mongol", "", "m", "", "mɔŋɡɔl"],
        ["ᠯ", "l", "l", "", "", "", "", "l", "", ""],
        ["ᠰ", "s", "s", "ᠰᠠᠷᠠ", "sara", "moon, month", "", "s", "", "sar"],
        ["ᠲ", "t", "t with a puff of air", "ᠲᠠᠪᠤ", "tabu", "five", "", "tʰ", "", "tʰaw"],
        ["ᠳ", "d", "a soft t or d", "ᠳᠥᠷᠪᠡ", "dörbe", "four", "", "t", "", "torəw"],
      ],
    },
    {
      title: "More consonants",
      group: "Consonants",
      cols: 4,
      chars: [
        ["ᠬ", "q", "ch as in Scottish loch with back vowels; a breathy h with front ones", "ᠬᠣᠶᠠᠷ", "qoyar", "two", "", "x", "", "xɔjɔr"],
        ["ᠭ", "γ", "a soft g from the throat with back vowels; g with front ones", "ᠭᠤᠷᠪᠠ", "γurba", "three", "", "ɡ", "", "ɡʊrəw"],
        ["ᠴ", "č", "ch with a puff of air", "ᠴᠠᠢ", "čai", "tea", "", "tʃʰ", "", "tʃʰai"],
        ["ᠵ", "ǰ", "a soft ch or j", "ᠡᠵᠢ", "eji", "mother", "", "tʃ", "", "ədʒ"],
        ["ᠶ", "y", "y as in yes", "ᠶᠡᠰᠦ", "yesü", "nine", "", "j", "", "jəs"],
        ["ᠷ", "r", "a rolled r; never at the start of a native word", "ᠭᠡᠷ", "ger", "ger (felt tent), home", "", "r", "", "ɡer"],
        ["ᠸ", "w", "w; mostly in borrowed words", "", "", "", "", "w", "", ""],
        ["ᠫ", "p", "p with a puff of air; mostly in borrowed words", "", "", "", "", "pʰ", "", ""],
      ],
    },
    {
      title: "Letters for borrowed words",
      group: "Consonants",
      cols: 4,
      note: "Added to write words from Tibetan, Chinese and Russian.",
      chars: [
        ["ᠱ", "š", "sh as in ship", "", "", "", "", "ʃ", "", ""],
        ["ᠹ", "f", "f", "", "", "", "", "f", "", ""],
        ["ᠺ", "k", "k", "", "", "", "", "k", "", ""],
        ["ᠼ", "c", "ts as in cats", "", "", "", "", "ts", "", ""],
        ["ᠽ", "z", "dz as in adze", "", "", "", "", "dz", "", ""],
        ["ᠾ", "h", "h as in hat", "", "", "", "", "h", "", ""],
      ],
    },
  ],
  articles: [
    {
      title: "About the Mongolian script",
      body: `<p>The Mongols adopted this script in the early 13th century, under Genghis Khan, from the Old Uyghur alphabet, which itself came from Sogdian and ultimately from Aramaic. It is one of the few scripts written in vertical columns that run from left to right.</p>
<p>Mongolia switched to Cyrillic in the 1940s, but the traditional script is still the main script for Mongolian in Inner Mongolia, China, and Mongolia has been bringing it back into schools and official documents.</p>`,
    },
    {
      title: "Letters change with their place",
      body: `<p>Like Arabic, Mongolian is joined: letters hang from a central stem and take different shapes at the start, middle and end of a word. Several letters that are distinct on their own look the same in the middle of a word (o and u, ö and ü, and sometimes t and d), and readers tell them apart from the word.</p>
<p>This app teaches the letters on their own first. Once you know them, look at whole words such as <span lang="mn-Mong">ᠮᠣᠩᠭᠣᠯ</span> (Mongol) to see the joined forms.</p>`,
    },
    {
      title: "Spelling and speech",
      body: `<p>The spelling reflects how Mongolian sounded centuries ago. Modern speech often drops the last vowel and shortens others: <span lang="mn-Mong">ᠰᠠᠷᠠ</span> is spelled sara but said sar; <span lang="mn-Mong">ᠤᠰᠤ</span> is spelled usu and said us. The recordings here follow modern speech; the transliteration follows the spelling.</p>`,
    },
  ],
});
