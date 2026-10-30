// The Tibetan alphabet for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization,
// meaning, text to speak, IPA, example language, example IPA]. Romanization is Wylie,
// which follows the spelling; the hints and IPA give the Lhasa pronunciation, with
// á for a high tone and à for a low one. eSpeak NG has no Tibetan voice, so the
// sounds are made from the IPA (without tones). Hints, groupings and articles are
// original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "tibetan",
  title: "Tibetan",
  native: "བོད་ཡིག",
  lang: "bo",
  langName: "Tibetan",
  font: '"Noto Serif Tibetan", "Microsoft Himalaya", "Kailasa", "Jomolhari", serif',
  blurb: "30 letters hanging from a headline, read in rows of four, for Tibetan, Dzongkha and Ladakhi.",
  writeTip: "Start each letter with the headline across the top, then draw the body below it from left to right.",
  lessons: [
    {
      title: "The ka, ca and ta rows",
      group: "Letters",
      cols: 4,
      note: "The alphabet is recited in rows of four, and every letter carries a built-in a. In the first five rows the first two letters have a high tone and the last two a low one.",
      chars: [
        ["ཀ", "ka", "k without a puff of air; high tone", "ཀ་བ", "ka ba", "pillar", "", "ká", "", "kawa"],
        ["ཁ", "kha", "k with a puff of air; high tone", "ཁ", "kha", "mouth", "", "kʰá", "", "kʰa"],
        ["ག", "ga", "kh with a low tone, a little breathy", "གོས", "gos", "clothes", "", "kʰà", "", "kʰøː"],
        ["ང", "nga", "ng as in sing, even at the start; low tone", "ང", "nga", "I, me", "", "ŋà", "", "ŋa"],
        ["ཅ", "ca", "ch without a puff of air; high tone", "ཅོག་ཙེ", "cog tse", "table", "", "tɕá", "", "tɕoktsi"],
        ["ཆ", "cha", "ch with a puff of air; high tone", "ཆུ", "chu", "water", "", "tɕʰá", "", "tɕʰu"],
        ["ཇ", "ja", "ch with a low tone", "ཇ", "ja", "tea", "", "tɕʰà", "", "tɕʰa"],
        ["ཉ", "nya", "ny, like the ñ in Spanish; low tone", "ཉ", "nya", "fish", "", "ɲà", "", "ɲa"],
        ["ཏ", "ta", "t without a puff of air; high tone", "ཏིལ", "til", "sesame", "", "tá", "", "tiː"],
        ["ཐ", "tha", "t with a puff of air; high tone", "ཐབ", "thab", "stove", "", "tʰá", "", "tʰap"],
        ["ད", "da", "th with a low tone", "ད་ལྟ", "da lta", "now", "", "tʰà", "", "tʰanta"],
        ["ན", "na", "n as in no; low tone", "ནམ་མཁའ", "nam mkha'", "sky", "", "nà", "", "namkʰa"],
      ],
    },
    {
      title: "The pa, tsa and zha rows",
      group: "Letters",
      cols: 4,
      chars: [
        ["པ", "pa", "p without a puff of air; high tone", "པར", "par", "photo", "", "pá", "", "par"],
        ["ཕ", "pha", "p with a puff of air; high tone", "ཕ", "pha", "father", "", "pʰá", "", "pʰa"],
        ["བ", "ba", "ph with a low tone", "བུ", "bu", "son", "", "pʰà", "", "pʰu"],
        ["མ", "ma", "m as in man; low tone", "མེ", "me", "fire", "", "mà", "", "me"],
        ["ཙ", "tsa", "ts without a puff of air; high tone", "ཙམ་པ", "tsam pa", "tsampa (roasted barley flour)", "", "tsá", "", "tsampa"],
        ["ཚ", "tsha", "ts with a puff of air; high tone", "ཚ་པོ", "tsha po", "hot", "", "tsʰá", "", "tsʰapo"],
        ["ཛ", "dza", "ts with a low tone", "ཛམ་གླིང", "dzam gling", "the world", "", "tsʰà", "", "tsamliŋ"],
        ["ཝ", "wa", "w as in wet; low tone", "ཝ", "wa", "fox", "", "wà", "", "wa"],
        ["ཞ", "zha", "sh with a low tone", "ཞྭ་མོ", "zhwa mo", "hat", "", "ɕà", "", "ɕamo"],
        ["ཟ", "za", "s with a low tone", "ཟ་མ", "za ma", "food", "", "sà", "", "sama"],
        ["འ", "'a", "a plain a with a low tone", "འོ་མ", "'o ma", "milk", "", "à", "", "oma"],
        ["ཡ", "ya", "y as in yes; low tone", "ཡི་གེ", "yi ge", "letter, writing", "", "jà", "", "jiki"],
      ],
    },
    {
      title: "The ra and sa rows",
      group: "Letters",
      cols: 4,
      chars: [
        ["ར", "ra", "r, lightly rolled; low tone", "རི", "ri", "mountain", "", "rà", "", "ri"],
        ["ལ", "la", "l as in let; low tone", "ལག་པ", "lag pa", "hand", "", "là", "", "lakpa"],
        ["ཤ", "sha", "sh as in ship; high tone", "ཤིང", "shing", "wood, tree", "", "ɕá", "", "ɕiŋ"],
        ["ས", "sa", "s as in sun; high tone", "ས", "sa", "earth, ground", "", "sá", "", "sa"],
        ["ཧ", "ha", "h as in hat; high tone", "ཧ་ཅང", "ha cang", "very", "", "há", "", "hatɕaŋ"],
        ["ཨ", "a", "a plain a with a high tone; also holds vowel signs", "ཨ་མ", "a ma", "mother", "", "á", "", "ama"],
      ],
    },
    {
      title: "Vowel signs on ཀ",
      group: "Vowels",
      cols: 4,
      note: "Every letter carries a. The four other vowels are written with a sign above or below it.",
      chars: [
        ["ཀི", "ki", "gigu ི: ee as in see", "རི", "ri", "mountain", "", "ki", "", "ri"],
        ["ཀུ", "ku", "zhabkyu ུ: oo as in food; written below", "ཆུ", "chu", "water", "", "ku", "", "tɕʰu"],
        ["ཀེ", "ke", "drengbu ེ: e as in bed", "མེ", "me", "fire", "", "ke", "", "me"],
        ["ཀོ", "ko", "naro ོ: o as in more", "འོ་མ", "'o ma", "milk", "", "ko", "", "oma"],
      ],
    },
  ],
  articles: [
    {
      title: "Letters, syllables and the tsheg",
      body: `<p>Tibetan is written from left to right with letters hanging from a headline. Words are not separated by spaces; instead every syllable ends with a small dot called the <i>tsheg</i> (<span lang="bo">་</span>), and a vertical stroke, the <i>shad</i> (<span lang="bo">།</span>), ends a phrase or sentence.</p>
<p>A syllable is built around one root letter. Other letters can sit in front of it, on top of it, below it or after it: <span lang="bo">བསྒྲུབས</span> (bsgrubs, accomplished) has five letters and a vowel sign around the root <span lang="bo">ག</span> but is said in one beat.</p>`,
    },
    {
      title: "Spelling and sound",
      body: `<p>Tibetan spelling was fixed more than a thousand years ago, and the spoken language has changed a lot since. Many letters that were once said are now silent: <span lang="bo">བསྒྲུབས</span> is said drub. Letters before the root and on top of it mostly change only the tone, and some letters after the root change the vowel: <span lang="bo">གོས</span> (gos) is said gö.</p>
<p>That is why there are two kinds of romanization. Wylie, used in this app, spells out every letter so the Tibetan can be rebuilt from it. Phonetic systems write what is said instead, so the same word might be written bsgrubs in Wylie and drub in phonetics.</p>`,
    },
    {
      title: "High and low tones",
      body: `<p>Lhasa Tibetan has high and low tones, and the alphabet shows them. In the first five rows of four, the first two letters have a high tone and the last two a low tone. The third letter of each of those rows, like <span lang="bo">ག</span> (ga), was once a g; in Lhasa it is now said like kh with a low tone.</p>
<p>A letter written in front of or on top of a low root can make it high again: <span lang="bo">ན</span> is low, but <span lang="bo">སྣ</span> (sna, nose) is high.</p>`,
    },
  ],
});
