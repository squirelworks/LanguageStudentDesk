// Hangul (Korean) for SquirrelGo Alphabets.
// Each character is [jamo, romanization, sound hint, example, example romanization, meaning, text to speak, IPA].
// Romanization follows the Revised Romanization of Korean. Hints and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "hangul",
  title: "Hangul",
  native: "한글",
  lang: "ko-KR",
  langName: "Korean",
  font: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
  chartFlow: true,
  blurb: "The Korean alphabet: 24 basic letters stacked into syllable blocks.",
  writeTip: "Write jamo top to bottom and left to right. Inside a block, the first consonant goes left or top, the vowel right or below, and any final consonant underneath.",
  lessons: [
    {
      title: "Basic vowels",
      note: "Vertical vowels sit to the right of the consonant; horizontal ones sit below it. A silent ㅇ fills the consonant slot when a syllable starts with a vowel.",
      group: "Vowels",
      chars: [
        ["ㅏ", "a", "a as in father", "아기", "agi", "baby", "아", "a"],
        ["ㅑ", "ya", "ya as in yard", "야구", "yagu", "baseball", "야", "ja"],
        ["ㅓ", "eo", "u as in sun, with the jaw open", "어머니", "eomeoni", "mother", "어", "ʌ"],
        ["ㅕ", "yeo", "y + eo, like yu in yummy", "여자", "yeoja", "woman", "여", "jʌ"],
        ["ㅗ", "o", "o with rounded lips, as in go but shorter", "오이", "oi", "cucumber", "오", "o"],
        ["ㅛ", "yo", "yo as in yoga", "요리", "yori", "cooking", "요", "jo"],
        ["ㅜ", "u", "oo as in food", "우유", "uyu", "milk", "우", "u"],
        ["ㅠ", "yu", "you", "유리", "yuri", "glass", "유", "ju"],
        ["ㅡ", "eu", "oo with the lips pulled flat, no rounding", "그림", "geurim", "picture", "으", "ɯ"],
        ["ㅣ", "i", "ee as in see", "이", "i", "tooth", "이", "i"],
      ],
    },
    {
      title: "Compound vowels",
      note: "Built from the basic vowels. ㅐ and ㅔ sound almost the same in modern Seoul speech.",
      group: "Vowels",
      chars: [
        ["ㅐ", "ae", "e as in bed, slightly more open", "개", "gae", "dog", "애", "ɛ"],
        ["ㅒ", "yae", "ye as in yes", "얘기", "yaegi", "talk, story", "얘", "jɛ"],
        ["ㅔ", "e", "e as in bed", "게", "ge", "crab", "에", "e"],
        ["ㅖ", "ye", "ye as in yes", "시계", "sigye", "clock", "예", "je"],
        ["ㅘ", "wa", "wa as in wasp", "사과", "sagwa", "apple", "와", "wa"],
        ["ㅙ", "wae", "we as in wet", "왜", "wae", "why", "왜", "wɛ"],
        ["ㅚ", "oe", "usually said we as in wet", "회사", "hoesa", "company", "외", "we"],
        ["ㅝ", "wo", "wo as in won", "뭐", "mwo", "what", "워", "wʌ"],
        ["ㅞ", "we", "we as in wet", "웨이터", "weiteo", "waiter", "웨", "we"],
        ["ㅟ", "wi", "wee", "귀", "gwi", "ear", "위", "wi"],
        ["ㅢ", "ui", "eu gliding into i", "의사", "uisa", "doctor", "의", "ɰi"],
      ],
    },
    {
      title: "Basic consonants",
      note: "ㄱ ㄷ ㅂ ㅈ are soft and unaspirated: closer to k t p ch at the start of a word, and g d b j between vowels.",
      group: "Consonants",
      chars: [
        ["ㄱ", "g/k", "soft g or k", "가방", "gabang", "bag", "가", "k ~ ɡ"],
        ["ㄴ", "n", "n", "나무", "namu", "tree", "나", "n"],
        ["ㄷ", "d/t", "soft d or t", "다리", "dari", "leg, bridge", "다", "t ~ d"],
        ["ㄹ", "r/l", "a tapped r between vowels, l at the end of a syllable", "라면", "ramyeon", "instant noodles", "라", "ɾ ~ l"],
        ["ㅁ", "m", "m", "마음", "maeum", "heart, mind", "마", "m"],
        ["ㅂ", "b/p", "soft b or p", "바다", "bada", "sea", "바", "p ~ b"],
        ["ㅅ", "s", "s; before ㅣ it sounds like sh", "사람", "saram", "person", "사", "s"],
        ["ㅇ", "–/ng", "silent at the start of a block, ng at the end", "아이", "ai", "child", "아", "ŋ"],
        ["ㅈ", "j", "soft j or ch", "자리", "jari", "seat", "자", "tɕ ~ dʑ"],
        ["ㅎ", "h", "h", "하늘", "haneul", "sky", "하", "h"],
      ],
    },
    {
      title: "Aspirated consonants",
      note: "Each adds a strong puff of air to a basic consonant. Hold your palm in front of your mouth to feel it.",
      group: "Consonants",
      chars: [
        ["ㅊ", "ch", "ch with a puff of air", "차", "cha", "car; tea", "차", "tɕʰ"],
        ["ㅋ", "k", "k with a puff of air", "코", "ko", "nose", "카", "kʰ"],
        ["ㅌ", "t", "t with a puff of air", "토끼", "tokki", "rabbit", "타", "tʰ"],
        ["ㅍ", "p", "p with a puff of air", "포도", "podo", "grapes", "파", "pʰ"],
      ],
    },
    {
      title: "Tense consonants",
      note: "Doubled letters are said with a tight throat and no puff of air, like the k in 'skate'.",
      group: "Consonants",
      chars: [
        ["ㄲ", "kk", "tense k, no air", "꼬리", "kkori", "tail", "까", "k͈"],
        ["ㄸ", "tt", "tense t, no air", "딸기", "ttalgi", "strawberry", "따", "t͈"],
        ["ㅃ", "pp", "tense p, no air", "빵", "ppang", "bread", "빠", "p͈"],
        ["ㅆ", "ss", "tense, hissing s", "쌀", "ssal", "uncooked rice", "싸", "s͈"],
        ["ㅉ", "jj", "tense j, no air", "짜다", "jjada", "to be salty", "짜", "t͈ɕ"],
      ],
    },
  ],
  builder: {
    title: "Syllable block builder",
    note: "Every Korean syllable is one block: a first consonant, a vowel, and sometimes a final consonant (batchim). Romanization here is letter by letter and does not show sound changes between blocks.",
    initials: [
      ["ㄱ", "g"], ["ㄲ", "kk"], ["ㄴ", "n"], ["ㄷ", "d"], ["ㄸ", "tt"], ["ㄹ", "r"], ["ㅁ", "m"], ["ㅂ", "b"], ["ㅃ", "pp"], ["ㅅ", "s"],
      ["ㅆ", "ss"], ["ㅇ", ""], ["ㅈ", "j"], ["ㅉ", "jj"], ["ㅊ", "ch"], ["ㅋ", "k"], ["ㅌ", "t"], ["ㅍ", "p"], ["ㅎ", "h"],
    ],
    medials: [
      ["ㅏ", "a"], ["ㅐ", "ae"], ["ㅑ", "ya"], ["ㅒ", "yae"], ["ㅓ", "eo"], ["ㅔ", "e"], ["ㅕ", "yeo"], ["ㅖ", "ye"], ["ㅗ", "o"], ["ㅘ", "wa"], ["ㅙ", "wae"],
      ["ㅚ", "oe"], ["ㅛ", "yo"], ["ㅜ", "u"], ["ㅝ", "wo"], ["ㅞ", "we"], ["ㅟ", "wi"], ["ㅠ", "yu"], ["ㅡ", "eu"], ["ㅢ", "ui"], ["ㅣ", "i"],
    ],
    finals: [
      ["", ""], ["ㄱ", "k"], ["ㄲ", "k"], ["ㄳ", "k"], ["ㄴ", "n"], ["ㄵ", "n"], ["ㄶ", "n"], ["ㄷ", "t"], ["ㄹ", "l"], ["ㄺ", "k"],
      ["ㄻ", "m"], ["ㄼ", "l"], ["ㄽ", "l"], ["ㄾ", "l"], ["ㄿ", "p"], ["ㅀ", "l"], ["ㅁ", "m"], ["ㅂ", "p"], ["ㅄ", "p"], ["ㅅ", "t"],
      ["ㅆ", "t"], ["ㅇ", "ng"], ["ㅈ", "t"], ["ㅊ", "t"], ["ㅋ", "k"], ["ㅌ", "t"], ["ㅍ", "p"], ["ㅎ", "t"],
    ],
  },
  articles: [
    {
      title: "How Hangul works",
      body: `<p>Hangul was created in the 15th century under King Sejong so that ordinary people could read and write, and it is one of the few scripts whose design is documented. Consonant shapes sketch the mouth: <span lang="ko">ㄱ</span> is the tongue's back raised to the soft palate, <span lang="ko">ㄴ</span> the tongue tip touching the ridge behind the teeth, <span lang="ko">ㅁ</span> closed lips. Extra strokes add aspiration: <span lang="ko">ㄱ → ㅋ</span>, <span lang="ko">ㄷ → ㅌ</span>.</p>
<p>Vowels are built from three elements: a dot (now a short stroke) for heaven, a flat line for earth, and an upright line for people.</p>
<p>Letters are not written in a row. They are stacked into square blocks, one block per syllable: <span lang="ko">ㅎ + ㅏ + ㄴ = 한</span>, <span lang="ko">ㄱ + ㅡ + ㄹ = 글</span>. Try it in the syllable block builder.</p>`,
    },
    {
      title: "Block shapes",
      body: `<p>The vowel decides the layout.</p>
<table>
<tr><td>Vertical vowel (ㅏ ㅓ ㅣ …)</td><td>consonant on the left, vowel on the right: <span lang="ko">가, 너, 미</span></td></tr>
<tr><td>Horizontal vowel (ㅗ ㅜ ㅡ …)</td><td>consonant on top, vowel below: <span lang="ko">고, 누, 므</span></td></tr>
<tr><td>Combined vowel (ㅘ ㅝ ㅢ …)</td><td>consonant top left, vowel wraps around: <span lang="ko">과, 뭐, 의</span></td></tr>
<tr><td>With a final consonant</td><td>the final sits at the bottom: <span lang="ko">각, 눈, 곰</span></td></tr>
</table>
<p>A syllable that begins with a vowel still needs a consonant slot, filled by a silent <span lang="ko">ㅇ</span>: <span lang="ko">아, 오, 이</span>.</p>`,
    },
    {
      title: "Final consonants (batchim)",
      body: `<p>At the end of a syllable, consonants are not released, so the many final letters collapse into just seven sounds:</p>
<table>
<tr><td lang="ko">ㄱ ㅋ ㄲ</td><td>k</td></tr>
<tr><td lang="ko">ㄴ</td><td>n</td></tr>
<tr><td lang="ko">ㄷ ㅌ ㅅ ㅆ ㅈ ㅊ ㅎ</td><td>t</td></tr>
<tr><td lang="ko">ㄹ</td><td>l</td></tr>
<tr><td lang="ko">ㅁ</td><td>m</td></tr>
<tr><td lang="ko">ㅂ ㅍ</td><td>p</td></tr>
<tr><td lang="ko">ㅇ</td><td>ng</td></tr>
</table>
<p>So <span lang="ko">옷</span> (clothes), <span lang="ko">옫</span> and <span lang="ko">옻</span> all end in the same t sound. The spelling shows up again when a vowel follows, as in <span lang="ko">옷이</span> (o-si).</p>`,
    },
    {
      title: "Sound changes between blocks",
      body: `<p>Korean is written block by block but spoken smoothly, so sounds shift at block boundaries. Three changes to know first:</p>
<ul>
<li><b>Linking.</b> A final consonant moves into the next block when that block starts with silent ㅇ: <span lang="ko">음악</span> is said eu-mak, <span lang="ko">한국어</span> han-gu-geo.</li>
<li><b>Nasalization.</b> k, t, p sounds become ng, n, m before ㄴ or ㅁ: <span lang="ko">감사합니다</span> is said gam-sa-ham-ni-da.</li>
<li><b>Tensing.</b> After a k, t or p sound, a following ㄱ ㄷ ㅂ ㅅ ㅈ often turns tense: <span lang="ko">학교</span> is said hak-kkyo.</li>
</ul>
<p>Listen to the example words and compare the sound with the spelling.</p>`,
    },
  ],
});
