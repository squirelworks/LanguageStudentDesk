// The Armenian alphabet (Eastern Armenian values) for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization,
// meaning, text to speak, IPA]. Hints, groupings and articles are original.
// An apostrophe in the romanization marks an aspirated consonant (t' = t with a puff of air).
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "armenian",
  title: "Armenian",
  native: "Հայերեն",
  lang: "hy-AM",
  langName: "Armenian",
  font: '"Noto Sans Armenian", "Segoe UI", system-ui, sans-serif',
  chartFlow: true,
  blurb: "Every Armenian letter in alphabet order, with Eastern Armenian sounds.",
  writeTip: "Most small letters hang from the top or stand on the line with a bowl at the bottom. Many differ only by a hook, so watch where each stroke turns.",
  lessons: [
    {
      title: "Ա to Թ",
      group: "Letters",
      cols: 4,
      note: "The first nine letters. Է and Ը are two of Armenian's seven vowels.",
      chars: [
        ["Ա ա", "a", "a as in father", "արև", "arev", "sun", "ա", "ɑ"],
        ["Բ բ", "b", "b as in bed (p in Western Armenian)", "բարև", "barev", "hello", "բ", "b"],
        ["Գ գ", "g", "g as in go (k in Western Armenian)", "գիրք", "girk'", "book", "գ", "ɡ"],
        ["Դ դ", "d", "d as in day (t in Western Armenian)", "դուռ", "durr", "door", "դ", "d"],
        ["Ե ե", "ye / e", "ye at the start of a word, e inside one", "երեխա", "yerekha", "child", "ե", "jɛ"],
        ["Զ զ", "z", "z as in zoo", "զանգ", "zang", "bell", "զ", "z"],
        ["Է է", "e", "e as in bed, at the start of a word", "էջ", "ej", "page", "է", "ɛ"],
        ["Ը ը", "ə", "the short uh in about", "ընկեր", "ənker", "friend", "ը", "ə"],
        ["Թ թ", "t'", "t with a puff of air", "թուղթ", "t'ught'", "paper", "թ", "tʰ"],
      ],
    },
    {
      title: "Ժ to Հ",
      group: "Letters",
      cols: 4,
      chars: [
        ["Ժ ժ", "zh", "s as in pleasure", "ժամ", "zham", "hour", "ժ", "ʒ"],
        ["Ի ի", "i", "ee as in see", "իմ", "im", "my", "ի", "i"],
        ["Լ լ", "l", "l as in let", "լուսին", "lusin", "moon", "լ", "l"],
        ["Խ խ", "kh", "ch as in Scottish loch", "խնձոր", "khndzor", "apple", "խ", "χ"],
        ["Ծ ծ", "ts", "ts with no puff of air, tight", "ծառ", "tsarr", "tree", "ծ", "tsʼ"],
        ["Կ կ", "k", "k with no puff of air, tight", "կատու", "katu", "cat", "կ", "kʼ"],
        ["Հ հ", "h", "h as in hat", "հաց", "hats'", "bread", "հ", "h"],
      ],
    },
    {
      title: "Ձ to Ո",
      group: "Letters",
      cols: 4,
      chars: [
        ["Ձ ձ", "dz", "dz as in adze", "ձուկ", "dzuk", "fish", "ձ", "dz"],
        ["Ղ ղ", "gh", "a gargled sound like a French r", "ղեկ", "ghek", "steering wheel", "ղ", "ʁ"],
        ["Ճ ճ", "ch", "ch with no puff of air, tight", "ճաշ", "chash", "meal", "ճ", "tʃʼ"],
        ["Մ մ", "m", "m", "մայր", "mayr", "mother", "մ", "m"],
        ["Յ յ", "y", "y as in yes; h at the start of a few words", "յոթ", "yot'", "seven", "յ", "j"],
        ["Ն ն", "n", "n as in no", "նուռ", "nurr", "pomegranate", "ն", "n"],
        ["Շ շ", "sh", "sh as in ship", "շուն", "shun", "dog", "շ", "ʃ"],
        ["Ո ո", "vo / o", "vo at the start of a word, o inside one", "ոտք", "votk'", "foot", "ո", "vɔ"],
      ],
    },
    {
      title: "Չ to Վ",
      group: "Letters",
      cols: 4,
      chars: [
        ["Չ չ", "ch'", "ch with a puff of air, as in church", "չորս", "ch'ors", "four", "չ", "tʃʰ"],
        ["Պ պ", "p", "p with no puff of air, tight", "պանիր", "panir", "cheese", "պ", "pʼ"],
        ["Ջ ջ", "j", "j as in jam", "ջուր", "jur", "water", "ջ", "dʒ"],
        ["Ռ ռ", "rr", "a rolled r, as in Spanish perro", "ռադիո", "rradio", "radio", "ռ", "r"],
        ["Ս ս", "s", "s as in sun", "սեղան", "seghan", "table", "ս", "s"],
        ["Վ վ", "v", "v as in van", "վարդ", "vard", "rose", "վ", "v"],
      ],
    },
    {
      title: "Տ to Ֆ",
      group: "Letters",
      cols: 4,
      note: "Ու is two letters that together spell u. Օ and Ֆ were added in the Middle Ages.",
      chars: [
        ["Տ տ", "t", "t with no puff of air, tight", "տուն", "tun", "house", "տ", "tʼ"],
        ["Ր ր", "r", "a soft tapped r", "րոպե", "rope", "minute", "ր", "ɾ"],
        ["Ց ց", "ts'", "ts with a puff of air", "ցուրտ", "ts'urt", "cold", "ց", "tsʰ"],
        ["Ու ու", "u", "oo as in food; written with two letters", "ուտել", "utel", "to eat", "ու", "u"],
        ["Փ փ", "p'", "p with a puff of air", "փող", "p'ogh", "money", "փ", "pʰ"],
        ["Ք ք", "k'", "k with a puff of air", "քար", "k'ar", "stone", "ք", "kʰ"],
        ["և", "yev", "a joined ե + վ, the word and", "և", "yev", "and", "և", "jɛv"],
        ["Օ օ", "o", "o as in more", "օր", "or", "day", "օ", "ɔ"],
        ["Ֆ ֆ", "f", "f, mostly in borrowed words", "ֆուտբոլ", "futbol", "football", "ֆ", "f"],
      ],
    },
  ],
  articles: [
    {
      title: "About the Armenian alphabet",
      body: `<p>Mesrop Mashtots created the Armenian alphabet around the year 405 so the Bible could be translated into Armenian. It had 36 letters; three more were added later. The script has been used without a break ever since, and the letters are a strong symbol of Armenian identity.</p>
<p>Armenian is written left to right, with capital and small letters like Latin. The letters once also stood for numbers (Ա = 1, Բ = 2 …), which you still see in old books and clock faces.</p>`,
    },
    {
      title: "Eastern and Western Armenian",
      body: `<p>There are two standard forms of Armenian. Eastern Armenian is spoken in Armenia and Iran; Western Armenian by most of the diaspora in the Middle East, Europe and the Americas. They use the same letters but read some of them differently.</p>
<p>The biggest difference is in three-way sets of consonants. Eastern says <span lang="hy">բ, գ, դ</span> as b, g, d and <span lang="hy">պ, կ, տ</span> as tight p, k, t. Western swaps them: <span lang="hy">բ, գ, դ</span> are p, k, t and <span lang="hy">պ, կ, տ</span> are b, g, d. So the name Պետրոս is Petros in the east and Bedros in the west.</p>
<p>This app uses the Eastern values. Spelling also differs: Armenia uses a spelling reformed in the 1920s, while Western Armenian and Iranian Armenians keep the older classical spelling.</p>`,
    },
    {
      title: "Three kinds of p, t, k",
      body: `<p>Armenian has three versions of p, t, k, ts and ch:</p>
<table>
<tr><th>voiced</th><th>tight</th><th>with a puff</th></tr>
<tr><td lang="hy">բ b</td><td lang="hy">պ p</td><td lang="hy">փ p'</td></tr>
<tr><td lang="hy">դ d</td><td lang="hy">տ t</td><td lang="hy">թ t'</td></tr>
<tr><td lang="hy">գ g</td><td lang="hy">կ k</td><td lang="hy">ք k'</td></tr>
<tr><td lang="hy">ձ dz</td><td lang="hy">ծ ts</td><td lang="hy">ց ts'</td></tr>
<tr><td lang="hy">ջ j</td><td lang="hy">ճ ch</td><td lang="hy">չ ch'</td></tr>
</table>
<p>The tight ones have no puff of air: hold a hand in front of your mouth and say spin, then pin. The tight sound is the one in spin. Many speakers make them ejective, with a little click from the throat.</p>`,
    },
    {
      title: "The unwritten ə",
      body: `<p>Armenian often has a short ə sound between consonants that is not written. <span lang="hy">խնձոր</span> (apple) is said khəndzor, and <span lang="hy">գրել</span> (to write) is gərel.</p>
<p>The letter <span lang="hy">ը</span> is only written at the start of some words, and at the end of a word as the definite article: <span lang="hy">տունը</span>, the house.</p>`,
    },
  ],
});
