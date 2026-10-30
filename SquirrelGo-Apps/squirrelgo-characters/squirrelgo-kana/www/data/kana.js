// Hiragana and katakana lessons for SquirrelGo Kana.
// Each character is [kana, romaji, sound hint, example, example romaji, meaning].
// null leaves an empty cell in the chart. Lessons in the same group share a chart.
// All hints, example choices and articles are original to this project.
window.SG_APP = {
  name: "SquirrelGo Kana",
  tagline: "Hiragana & katakana",
  store: "squirrelgo-kana",
  intro: "Learn to read and write the two Japanese syllabaries.",
  about:
    "SquirrelGo Kana is part of LanguageStudentDesk. Lessons, hints and articles are original; it is not affiliated with any other kana app. Works fully offline.",
};

const JA_FONT = '"Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif';

window.SG_SCRIPTS = [
  {
    id: "hiragana",
    title: "Hiragana",
    native: "ひらがな",
    lang: "ja-JP",
    langName: "Japanese",
    font: JA_FONT,
    blurb: "The rounded syllabary for native words, grammar endings and particles. Learn it first.",
    writeTip: "Kana strokes generally run top to bottom and left to right. Keep each character inside an imaginary square.",
    lessons: [
      {
        title: "Vowels",
        note: "Every kana ends in one of these five vowels. Keep them short and crisp.",
        group: "Basic hiragana",
        chars: [
          ["あ", "a", "a as in father", "あさ", "asa", "morning"],
          ["い", "i", "ee as in see, but short", "いぬ", "inu", "dog"],
          ["う", "u", "oo with relaxed, unrounded lips", "うみ", "umi", "sea"],
          ["え", "e", "e as in bed", "えき", "eki", "station"],
          ["お", "o", "o as in old, but short", "おと", "oto", "sound"],
        ],
      },
      {
        title: "K row",
        group: "Basic hiragana",
        chars: [
          ["か", "ka", "k + a", "かさ", "kasa", "umbrella"],
          ["き", "ki", "k + i", "きた", "kita", "north"],
          ["く", "ku", "k + u", "くち", "kuchi", "mouth"],
          ["け", "ke", "k + e", "けさ", "kesa", "this morning"],
          ["こ", "ko", "k + o", "こえ", "koe", "voice"],
        ],
      },
      {
        title: "S row",
        note: "し is pronounced shi, not si.",
        group: "Basic hiragana",
        chars: [
          ["さ", "sa", "s + a", "さかな", "sakana", "fish"],
          ["し", "shi", "she", "しお", "shio", "salt"],
          ["す", "su", "s + u; the u is often barely heard", "すし", "sushi", "sushi"],
          ["せ", "se", "s + e", "せかい", "sekai", "world"],
          ["そ", "so", "s + o", "そら", "sora", "sky"],
        ],
      },
      {
        title: "T row",
        note: "ち is chi and つ is tsu.",
        group: "Basic hiragana",
        chars: [
          ["た", "ta", "t + a", "たこ", "tako", "octopus"],
          ["ち", "chi", "chee", "ちず", "chizu", "map"],
          ["つ", "tsu", "the ts in cats, then u", "つき", "tsuki", "moon"],
          ["て", "te", "t + e", "て", "te", "hand"],
          ["と", "to", "t + o", "とり", "tori", "bird"],
        ],
      },
      {
        title: "N row",
        group: "Basic hiragana",
        chars: [
          ["な", "na", "n + a", "なつ", "natsu", "summer"],
          ["に", "ni", "n + i", "にく", "niku", "meat"],
          ["ぬ", "nu", "n + u", "ぬの", "nuno", "cloth"],
          ["ね", "ne", "n + e", "ねこ", "neko", "cat"],
          ["の", "no", "n + o", "のり", "nori", "seaweed"],
        ],
      },
      {
        title: "H row",
        note: "ふ sits between f and h: blow gently through slightly parted lips.",
        group: "Basic hiragana",
        chars: [
          ["は", "ha", "h + a; read wa when it is the topic particle", "はな", "hana", "flower"],
          ["ひ", "hi", "h + i, almost a soft hiss", "ひと", "hito", "person"],
          ["ふ", "fu", "a soft f made with both lips", "ふね", "fune", "boat"],
          ["へ", "he", "h + e; read e when it is the direction particle", "へや", "heya", "room"],
          ["ほ", "ho", "h + o", "ほし", "hoshi", "star"],
        ],
      },
      {
        title: "M row",
        group: "Basic hiragana",
        chars: [
          ["ま", "ma", "m + a", "まど", "mado", "window"],
          ["み", "mi", "m + i", "みみ", "mimi", "ear"],
          ["む", "mu", "m + u", "むし", "mushi", "insect"],
          ["め", "me", "m + e", "め", "me", "eye"],
          ["も", "mo", "m + o", "もり", "mori", "forest"],
        ],
      },
      {
        title: "Y row",
        note: "Only three sounds. The gaps are where yi and ye would be.",
        group: "Basic hiragana",
        chars: [
          ["や", "ya", "y + a", "やま", "yama", "mountain"],
          null,
          ["ゆ", "yu", "y + u", "ゆき", "yuki", "snow"],
          null,
          ["よ", "yo", "y + o", "よる", "yoru", "night"],
        ],
      },
      {
        title: "R row",
        note: "The Japanese r is a quick tap of the tongue, between English r, l and d.",
        group: "Basic hiragana",
        chars: [
          ["ら", "ra", "tapped r + a", "らいねん", "rainen", "next year"],
          ["り", "ri", "tapped r + i", "りんご", "ringo", "apple"],
          ["る", "ru", "tapped r + u", "くるま", "kuruma", "car"],
          ["れ", "re", "tapped r + e", "れきし", "rekishi", "history"],
          ["ろ", "ro", "tapped r + o", "ろく", "roku", "six"],
        ],
      },
      {
        title: "W row and ん",
        note: "を is used only as the object particle. ん is the one kana with no vowel.",
        group: "Basic hiragana",
        chars: [
          ["わ", "wa", "w + a", "わたし", "watashi", "I, me"],
          null,
          null,
          null,
          ["を", "o", "said o; written wo in some romaji. Only used as a particle", "ほんをよむ", "hon o yomu", "read a book"],
          ["ん", "n", "a full beat of n, m or ng depending on the next sound", "ほん", "hon", "book"],
        ],
      },
      {
        title: "Voiced G, Z, D",
        note: "Two small strokes (dakuten) turn k into g, s into z and t into d.",
        group: "Voiced hiragana",
        chars: [
          ["が", "ga", "g + a", "えいが", "eiga", "movie"],
          ["ぎ", "gi", "g + i", "かぎ", "kagi", "key"],
          ["ぐ", "gu", "g + u", "かぐ", "kagu", "furniture"],
          ["げ", "ge", "g + e", "ひげ", "hige", "beard"],
          ["ご", "go", "g + o", "ごはん", "gohan", "rice, a meal"],
          ["ざ", "za", "z + a", "ざる", "zaru", "bamboo strainer"],
          ["じ", "ji", "j + i", "じかん", "jikan", "time"],
          ["ず", "zu", "z + u", "みず", "mizu", "water"],
          ["ぜ", "ze", "z + e", "かぜ", "kaze", "wind"],
          ["ぞ", "zo", "z + o", "ぞう", "zō", "elephant"],
          ["だ", "da", "d + a", "だれ", "dare", "who"],
          ["ぢ", "ji", "same sound as じ; only in a few words", "はなぢ", "hanaji", "nosebleed"],
          ["づ", "zu", "same sound as ず; only in a few words", "つづく", "tsuzuku", "to continue"],
          ["で", "de", "d + e", "でんわ", "denwa", "telephone"],
          ["ど", "do", "d + o", "どこ", "doko", "where"],
        ],
      },
      {
        title: "Voiced B and P",
        note: "Dakuten turns h into b; a small circle (handakuten) turns h into p.",
        group: "Voiced hiragana",
        chars: [
          ["ば", "ba", "b + a", "そば", "soba", "buckwheat noodles"],
          ["び", "bi", "b + i", "へび", "hebi", "snake"],
          ["ぶ", "bu", "b + u", "ぶた", "buta", "pig"],
          ["べ", "be", "b + e", "かべ", "kabe", "wall"],
          ["ぼ", "bo", "b + o", "ぼうし", "bōshi", "hat"],
          ["ぱ", "pa", "p + a", "かんぱい", "kanpai", "cheers!"],
          ["ぴ", "pi", "p + i", "えんぴつ", "enpitsu", "pencil"],
          ["ぷ", "pu", "p + u", "てんぷら", "tenpura", "tempura"],
          ["ぺ", "pe", "p + e", "ぺらぺら", "perapera", "fluent"],
          ["ぽ", "po", "p + o", "さんぽ", "sanpo", "a walk"],
        ],
      },
      {
        title: "Combinations with K, S, T, N, H",
        note: "A small ゃ, ゅ or ょ after an i-row kana blends the two into one beat.",
        group: "Combination sounds",
        cols: 3,
        chars: [
          ["きゃ", "kya", "one beat: ki + ya blended", "きゃく", "kyaku", "guest"],
          ["きゅ", "kyu", "one beat", "きゅうり", "kyūri", "cucumber"],
          ["きょ", "kyo", "one beat", "きょう", "kyō", "today"],
          ["しゃ", "sha", "sha as in shop", "しゃしん", "shashin", "photograph"],
          ["しゅ", "shu", "shoe, short", "しゅくだい", "shukudai", "homework"],
          ["しょ", "sho", "show, short", "としょかん", "toshokan", "library"],
          ["ちゃ", "cha", "cha as in chalk", "おちゃ", "ocha", "tea"],
          ["ちゅ", "chu", "chew, short", "ちゅうい", "chūi", "caution"],
          ["ちょ", "cho", "cho as in chop", "ちょっと", "chotto", "a little"],
          ["にゃ", "nya", "one beat", "こんにゃく", "konnyaku", "konjac jelly"],
          ["にゅ", "nyu", "one beat", "にゅういん", "nyūin", "hospital admission"],
          ["にょ", "nyo", "one beat", "にょろにょろ", "nyoronyoro", "wriggling"],
          ["ひゃ", "hya", "one beat", "ひゃく", "hyaku", "hundred"],
          ["ひゅ", "hyu", "one beat", "ひゅうひゅう", "hyūhyū", "whistling wind"],
          ["ひょ", "hyo", "one beat", "ひょう", "hyō", "table, chart"],
        ],
      },
      {
        title: "Combinations with M, R and voiced sounds",
        group: "Combination sounds",
        cols: 3,
        chars: [
          ["みゃ", "mya", "one beat", "みゃく", "myaku", "pulse"],
          ["みゅ", "myu", "one beat", "ミュージカル", "myūjikaru", "musical (in katakana)"],
          ["みょ", "myo", "one beat", "みょうじ", "myōji", "family name"],
          ["りゃ", "rya", "one beat", "りゃく", "ryaku", "abbreviation"],
          ["りゅ", "ryu", "one beat", "りゅう", "ryū", "dragon"],
          ["りょ", "ryo", "one beat", "りょこう", "ryokō", "trip"],
          ["ぎゃ", "gya", "one beat", "ぎゃく", "gyaku", "reverse"],
          ["ぎゅ", "gyu", "one beat", "ぎゅうにゅう", "gyūnyū", "milk"],
          ["ぎょ", "gyo", "one beat", "きんぎょ", "kingyo", "goldfish"],
          ["じゃ", "ja", "ja as in jar", "じゃま", "jama", "in the way"],
          ["じゅ", "ju", "joo, short", "じゅぎょう", "jugyō", "class, lesson"],
          ["じょ", "jo", "jo as in jog", "じょうず", "jōzu", "skillful"],
          ["びゃ", "bya", "one beat", "さんびゃく", "sanbyaku", "three hundred"],
          ["びゅ", "byu", "one beat", "びゅうびゅう", "byūbyū", "howling wind"],
          ["びょ", "byo", "one beat", "びょういん", "byōin", "hospital"],
          ["ぴゃ", "pya", "one beat", "はっぴゃく", "happyaku", "eight hundred"],
          ["ぴゅ", "pyu", "one beat", "ぴゅう", "pyū", "whoosh"],
          ["ぴょ", "pyo", "one beat", "ぴょんぴょん", "pyonpyon", "hopping"],
        ],
      },
    ],
    articles: [
      {
        title: "Three scripts, one sentence",
        body: `<p>Written Japanese mixes three scripts. <b>Kanji</b> carry the meaning of most nouns and verb stems. <b>Hiragana</b> spell grammar: verb endings, particles and words that have no common kanji. <b>Katakana</b> spell foreign loanwords, names and sound effects.</p>
<p>A sentence like <span lang="ja">わたしはコーヒーを飲みます</span> ("I drink coffee") uses all three: hiragana for <span lang="ja">わたし</span>, <span lang="ja">は</span>, <span lang="ja">を</span> and the ending <span lang="ja">みます</span>, katakana for <span lang="ja">コーヒー</span>, and the kanji <span lang="ja">飲</span> for the verb "drink".</p>
<p>Each kana stands for one beat of sound (a <i>mora</i>), not one letter. Most are a consonant plus a vowel. Hiragana developed from Chinese characters written in a fast, flowing hand, which is why the shapes are curved.</p>
<p>Children's books, and the small reading aids printed beside kanji (<i>furigana</i>), are written in hiragana. Once you know the 46 basic shapes you can sound out any of it.</p>`,
      },
      {
        title: "Voiced marks: ゛ and ゜",
        body: `<p>Two small marks at the upper right change a kana's consonant.</p>
<ul>
<li><b>Dakuten</b> (two ticks, ゛) makes the consonant voiced: か ka → が ga, さ sa → ざ za, た ta → だ da, は ha → ば ba.</li>
<li><b>Handakuten</b> (a small circle, ゜) is only used with the h row and turns it into p: は ha → ぱ pa.</li>
</ul>
<p>ぢ and づ sound exactly like じ and ず. They appear mainly when a word that starts with ち or つ gets voiced inside a compound, as in はな + ち → はなぢ (nosebleed), or when the same kana repeats, as in つづく.</p>`,
      },
      {
        title: "Combination sounds: small ゃ ゅ ょ",
        body: `<p>Write ゃ, ゅ or ょ at half size after a kana from the i column (き, し, ち, に, ひ, み, り and their voiced forms) and the two merge into one beat.</p>
<table><tr><td lang="ja">きや</td><td>ki-ya, two beats</td></tr><tr><td lang="ja">きゃ</td><td>kya, one beat</td></tr></table>
<p>Size matters. Compare <span lang="ja">びよういん</span> (biyōin, beauty salon) and <span lang="ja">びょういん</span> (byōin, hospital).</p>`,
      },
      {
        title: "Small っ: doubled consonants",
        body: `<p>A half-size っ is not pronounced as tsu. It tells you to hold the next consonant for one silent beat, like the pause in the middle of "bookcase".</p>
<table>
<tr><td lang="ja">きて</td><td>kite, come</td></tr>
<tr><td lang="ja">きって</td><td>kitte, postage stamp</td></tr>
<tr><td lang="ja">いっしょ</td><td>issho, together</td></tr>
</table>
<p>In romaji the doubled consonant is written twice: kk, ss, tt, pp. Before ch it is written tch, as in <span lang="ja">まっちゃ</span> matcha.</p>`,
      },
      {
        title: "Long vowels",
        body: `<p>Japanese vowels come in short and long versions, and the length changes the meaning. A long vowel lasts two beats.</p>
<ul>
<li>a, i, u and e are lengthened by adding the same vowel: <span lang="ja">おかあさん</span> okāsan (mother), <span lang="ja">おにいさん</span> onīsan (older brother), <span lang="ja">くうき</span> kūki (air), <span lang="ja">おねえさん</span> onēsan (older sister).</li>
<li>A long e is usually written with い: <span lang="ja">せんせい</span> sensei (teacher), said sensē.</li>
<li>A long o is usually written with う: <span lang="ja">ありがとう</span> arigatō. A few words use お instead, such as <span lang="ja">おおきい</span> ōkii (big) and <span lang="ja">とおい</span> tōi (far).</li>
</ul>
<p>Short and long make different words: <span lang="ja">おばさん</span> obasan (aunt) and <span lang="ja">おばあさん</span> obāsan (grandmother).</p>`,
      },
      {
        title: "Particles は, へ and を",
        body: `<p>Three kana are read differently when they work as grammar particles, a leftover from older spelling.</p>
<table>
<tr><td lang="ja">は</td><td>read <b>wa</b> as the topic marker: <span lang="ja">わたしは</span> watashi wa</td></tr>
<tr><td lang="ja">へ</td><td>read <b>e</b> as "toward": <span lang="ja">にほんへ</span> Nihon e</td></tr>
<tr><td lang="ja">を</td><td>read <b>o</b>, marks the object: <span lang="ja">みずをのむ</span> mizu o nomu</td></tr>
</table>
<p>Everywhere else は is ha and へ is he. を appears almost nowhere except as this particle.</p>`,
      },
      {
        title: "How ん changes",
        body: `<p>ん always takes a full beat, but its sound adjusts to what follows:</p>
<ul>
<li>before m, b and p it closes the lips like m: <span lang="ja">さんぽ</span> sampo</li>
<li>before k and g it sounds like ng: <span lang="ja">りんご</span> ringo</li>
<li>at the end of a word it is a light nasal hum: <span lang="ja">ほん</span> hon</li>
</ul>
<p>When ん comes before a vowel or y, romaji often adds an apostrophe to keep the beats apart: <span lang="ja">きんえん</span> kin'en (no smoking) versus <span lang="ja">きねん</span> kinen (commemoration).</p>`,
      },
      {
        title: "Look-alikes to watch",
        body: `<p>These pairs trip up most learners. Open them side by side in the chart.</p>
<table>
<tr><td lang="ja">さ / ち</td><td>mirror images: さ curves left at the bottom, ち curves right</td></tr>
<tr><td lang="ja">ぬ / め</td><td>ぬ ends with a small loop, め does not</td></tr>
<tr><td lang="ja">ね / れ / わ</td><td>same left stroke; the right side ends in a loop, a flick out, or a curve</td></tr>
<tr><td lang="ja">は / ほ</td><td>ほ has an extra crossbar on top</td></tr>
<tr><td lang="ja">る / ろ</td><td>る ends with a loop, ろ is open</td></tr>
<tr><td lang="ja">い / り</td><td>り's right stroke is much longer</td></tr>
</table>`,
      },
    ],
  },
  {
    id: "katakana",
    title: "Katakana",
    native: "カタカナ",
    lang: "ja-JP",
    langName: "Japanese",
    font: JA_FONT,
    blurb: "The angular syllabary for loanwords, foreign names and sound effects.",
    writeTip: "Katakana are built from short straight strokes. Watch the direction of the last stroke in シ, ツ, ソ and ン.",
    lessons: [
      {
        title: "Vowels",
        group: "Basic katakana",
        chars: [
          ["ア", "a", "a as in father", "アイス", "aisu", "ice cream"],
          ["イ", "i", "ee, short", "インク", "inku", "ink"],
          ["ウ", "u", "oo with relaxed lips", "ウール", "ūru", "wool"],
          ["エ", "e", "e as in bed", "エアコン", "eakon", "air conditioner"],
          ["オ", "o", "o, short", "オレンジ", "orenji", "orange"],
        ],
      },
      {
        title: "K row",
        group: "Basic katakana",
        chars: [
          ["カ", "ka", "k + a", "カメラ", "kamera", "camera"],
          ["キ", "ki", "k + i", "キロ", "kiro", "kilo"],
          ["ク", "ku", "k + u", "クラス", "kurasu", "class"],
          ["ケ", "ke", "k + e", "ケーキ", "kēki", "cake"],
          ["コ", "ko", "k + o", "コーヒー", "kōhī", "coffee"],
        ],
      },
      {
        title: "S row",
        note: "シ and ツ are easy to confuse: see the look-alikes article.",
        group: "Basic katakana",
        chars: [
          ["サ", "sa", "s + a", "サラダ", "sarada", "salad"],
          ["シ", "shi", "she", "タクシー", "takushī", "taxi"],
          ["ス", "su", "s + u", "スプーン", "supūn", "spoon"],
          ["セ", "se", "s + e", "セーター", "sētā", "sweater"],
          ["ソ", "so", "s + o", "ソファ", "sofa", "sofa"],
        ],
      },
      {
        title: "T row",
        group: "Basic katakana",
        chars: [
          ["タ", "ta", "t + a", "タオル", "taoru", "towel"],
          ["チ", "chi", "chee", "チーズ", "chīzu", "cheese"],
          ["ツ", "tsu", "ts + u", "ツアー", "tsuā", "tour"],
          ["テ", "te", "t + e", "テレビ", "terebi", "television"],
          ["ト", "to", "t + o", "トマト", "tomato", "tomato"],
        ],
      },
      {
        title: "N row",
        group: "Basic katakana",
        chars: [
          ["ナ", "na", "n + a", "バナナ", "banana", "banana"],
          ["ニ", "ni", "n + i", "テニス", "tenisu", "tennis"],
          ["ヌ", "nu", "n + u", "カヌー", "kanū", "canoe"],
          ["ネ", "ne", "n + e", "ネクタイ", "nekutai", "necktie"],
          ["ノ", "no", "n + o", "ノート", "nōto", "notebook"],
        ],
      },
      {
        title: "H row",
        group: "Basic katakana",
        chars: [
          ["ハ", "ha", "h + a", "ハム", "hamu", "ham"],
          ["ヒ", "hi", "h + i", "ヒーター", "hītā", "heater"],
          ["フ", "fu", "a soft f made with both lips", "ナイフ", "naifu", "knife"],
          ["ヘ", "he", "h + e; looks the same as hiragana へ", "ヘリコプター", "herikoputā", "helicopter"],
          ["ホ", "ho", "h + o", "ホテル", "hoteru", "hotel"],
        ],
      },
      {
        title: "M row",
        group: "Basic katakana",
        chars: [
          ["マ", "ma", "m + a", "マスク", "masuku", "face mask"],
          ["ミ", "mi", "m + i", "ミルク", "miruku", "milk"],
          ["ム", "mu", "m + u", "ゲーム", "gēmu", "game"],
          ["メ", "me", "m + e", "メール", "mēru", "email"],
          ["モ", "mo", "m + o", "メモ", "memo", "memo"],
        ],
      },
      {
        title: "Y row",
        group: "Basic katakana",
        chars: [
          ["ヤ", "ya", "y + a", "タイヤ", "taiya", "tire"],
          null,
          ["ユ", "yu", "y + u", "ユーモア", "yūmoa", "humor"],
          null,
          ["ヨ", "yo", "y + o", "ヨット", "yotto", "yacht"],
        ],
      },
      {
        title: "R row",
        group: "Basic katakana",
        chars: [
          ["ラ", "ra", "tapped r + a", "ラジオ", "rajio", "radio"],
          ["リ", "ri", "tapped r + i", "リボン", "ribon", "ribbon"],
          ["ル", "ru", "tapped r + u", "ルール", "rūru", "rule"],
          ["レ", "re", "tapped r + e", "レモン", "remon", "lemon"],
          ["ロ", "ro", "tapped r + o", "ロボット", "robotto", "robot"],
        ],
      },
      {
        title: "W row and ン",
        group: "Basic katakana",
        chars: [
          ["ワ", "wa", "w + a", "ワイン", "wain", "wine"],
          null,
          null,
          null,
          ["ヲ", "o", "the katakana particle o; almost never used", "", "", ""],
          ["ン", "n", "a full beat of n", "パン", "pan", "bread"],
        ],
      },
      {
        title: "Voiced G, Z, D",
        group: "Voiced katakana",
        chars: [
          ["ガ", "ga", "g + a", "ガム", "gamu", "chewing gum"],
          ["ギ", "gi", "g + i", "ギター", "gitā", "guitar"],
          ["グ", "gu", "g + u", "グラス", "gurasu", "glass"],
          ["ゲ", "ge", "g + e", "ゲーム", "gēmu", "game"],
          ["ゴ", "go", "g + o", "ゴルフ", "gorufu", "golf"],
          ["ザ", "za", "z + a", "ピザ", "piza", "pizza"],
          ["ジ", "ji", "j + i", "ジーンズ", "jīnzu", "jeans"],
          ["ズ", "zu", "z + u", "サイズ", "saizu", "size"],
          ["ゼ", "ze", "z + e", "ゼロ", "zero", "zero"],
          ["ゾ", "zo", "z + o", "ゾーン", "zōn", "zone"],
          ["ダ", "da", "d + a", "ダンス", "dansu", "dance"],
          ["ヂ", "ji", "same as ジ; very rare", "", "", ""],
          ["ヅ", "zu", "same as ズ; very rare", "", "", ""],
          ["デ", "de", "d + e", "デパート", "depāto", "department store"],
          ["ド", "do", "d + o", "ドア", "doa", "door"],
        ],
      },
      {
        title: "Voiced B and P",
        group: "Voiced katakana",
        chars: [
          ["バ", "ba", "b + a", "バス", "basu", "bus"],
          ["ビ", "bi", "b + i", "ビル", "biru", "building"],
          ["ブ", "bu", "b + u", "ブーツ", "būtsu", "boots"],
          ["ベ", "be", "b + e", "ベッド", "beddo", "bed"],
          ["ボ", "bo", "b + o", "ボール", "bōru", "ball"],
          ["パ", "pa", "p + a", "パスポート", "pasupōto", "passport"],
          ["ピ", "pi", "p + i", "ピアノ", "piano", "piano"],
          ["プ", "pu", "p + u", "プール", "pūru", "swimming pool"],
          ["ペ", "pe", "p + e", "ペン", "pen", "pen"],
          ["ポ", "po", "p + o", "ポスト", "posuto", "mailbox"],
        ],
      },
      {
        title: "Combination sounds",
        note: "These work exactly like their hiragana versions.",
        group: "Combination sounds",
        cols: 3,
        chars: [
          ["キャ", "kya", "one beat", "キャンプ", "kyanpu", "camping"],
          ["キュ", "kyu", "one beat", "バーベキュー", "bābekyū", "barbecue"],
          ["キョ", "kyo", "one beat", "", "", ""],
          ["シャ", "sha", "sha", "シャツ", "shatsu", "shirt"],
          ["シュ", "shu", "shoe, short", "シュート", "shūto", "shot (at goal)"],
          ["ショ", "sho", "show, short", "ショップ", "shoppu", "shop"],
          ["チャ", "cha", "cha", "チャンス", "chansu", "chance"],
          ["チュ", "chu", "chew, short", "チューリップ", "chūrippu", "tulip"],
          ["チョ", "cho", "cho", "チョコレート", "chokorēto", "chocolate"],
          ["ニャ", "nya", "one beat", "", "", ""],
          ["ニュ", "nyu", "one beat", "ニュース", "nyūsu", "news"],
          ["ニョ", "nyo", "one beat", "", "", ""],
          ["ヒャ", "hya", "one beat", "", "", ""],
          ["ヒュ", "hyu", "one beat", "ヒューズ", "hyūzu", "fuse"],
          ["ヒョ", "hyo", "one beat", "", "", ""],
          ["ミャ", "mya", "one beat", "", "", ""],
          ["ミュ", "myu", "one beat", "ミュージック", "myūjikku", "music"],
          ["ミョ", "myo", "one beat", "", "", ""],
          ["リャ", "rya", "one beat", "", "", ""],
          ["リュ", "ryu", "one beat", "リュック", "ryukku", "backpack"],
          ["リョ", "ryo", "one beat", "", "", ""],
          ["ジャ", "ja", "ja", "ジャム", "jamu", "jam"],
          ["ジュ", "ju", "joo, short", "ジュース", "jūsu", "juice"],
          ["ジョ", "jo", "jo", "ジョギング", "jogingu", "jogging"],
        ],
      },
      {
        title: "Sounds for foreign words",
        note: "Modern katakana combines a kana with a small vowel to spell sounds Japanese did not have.",
        group: "Extended katakana",
        cols: 4,
        chars: [
          ["ファ", "fa", "f + a", "ファイル", "fairu", "file"],
          ["フィ", "fi", "f + i", "フィルム", "firumu", "film"],
          ["フェ", "fe", "f + e", "カフェ", "kafe", "café"],
          ["フォ", "fo", "f + o", "フォーク", "fōku", "fork"],
          ["ティ", "ti", "t + i, not chi", "パーティー", "pātī", "party"],
          ["ディ", "di", "d + i, not ji", "ディスク", "disuku", "disc"],
          ["トゥ", "tu", "t + u, not tsu", "タトゥー", "tatū", "tattoo"],
          ["デュ", "dyu", "d + yu", "デュエット", "dyuetto", "duet"],
          ["ウィ", "wi", "w + i", "ウィンク", "winku", "wink"],
          ["ウェ", "we", "w + e", "ウェブ", "webu", "the web"],
          ["ウォ", "wo", "w + o", "ウォッチ", "wotchi", "watch"],
          ["ヴァ", "va", "v + a; most people say ba", "ヴァイオリン", "vaiorin", "violin"],
          ["シェ", "she", "she as in shed", "シェフ", "shefu", "chef"],
          ["ジェ", "je", "je as in jet", "ジェット", "jetto", "jet"],
          ["チェ", "che", "che as in check", "チェック", "chekku", "check"],
          ["イェ", "ye", "ye as in yes", "", "", ""],
        ],
      },
    ],
    articles: [
      {
        title: "What katakana is for",
        body: `<p>Katakana grew out of pieces of kanji that Buddhist scholars scribbled in the margins of texts as pronunciation notes, which is why it is made of short, straight strokes.</p>
<p>Today it is used for:</p>
<ul>
<li>loanwords: <span lang="ja">テレビ</span> terebi (television), <span lang="ja">パン</span> pan (bread, from Portuguese)</li>
<li>foreign names and places: <span lang="ja">アメリカ</span> Amerika, <span lang="ja">ロンドン</span> Rondon</li>
<li>sound effects and animal noises: <span lang="ja">ワンワン</span> wan wan (woof)</li>
<li>emphasis, much like italics in English, and scientific names of plants and animals</li>
</ul>
<p>Loanwords are reshaped to fit Japanese sounds, so English "strike" becomes <span lang="ja">ストライキ</span> sutoraiki. Reading katakana aloud and asking "what English word could this be?" is a good habit.</p>`,
      },
      {
        title: "The long-vowel bar ー",
        body: `<p>Katakana marks a long vowel with a bar, <span lang="ja">ー</span>, instead of an extra vowel kana. It runs in the direction of the text, so it is vertical in vertical writing.</p>
<table>
<tr><td lang="ja">コーヒー</td><td>kōhī, coffee</td></tr>
<tr><td lang="ja">ケーキ</td><td>kēki, cake</td></tr>
<tr><td lang="ja">ビル</td><td>biru, building</td></tr>
<tr><td lang="ja">ビール</td><td>bīru, beer</td></tr>
</table>
<p>The last pair shows why it matters. A small ッ doubles the next consonant just as っ does in hiragana: <span lang="ja">ベッド</span> beddo (bed).</p>`,
      },
      {
        title: "Look-alikes to watch",
        body: `<table>
<tr><td lang="ja">シ / ツ</td><td>shi's dots sit on the left and its last stroke sweeps up from the bottom; tsu's dots sit on top and its last stroke falls from the top</td></tr>
<tr><td lang="ja">ソ / ン</td><td>the same idea: so's last stroke falls from the top, n's sweeps up from the bottom</td></tr>
<tr><td lang="ja">ク / ケ / タ</td><td>ke has a horizontal line, ta has an extra stroke inside</td></tr>
<tr><td lang="ja">ウ / ワ / フ</td><td>u has a tick on top, wa has a short left side, fu has none</td></tr>
<tr><td lang="ja">ノ / メ</td><td>me adds a crossing stroke</td></tr>
<tr><td lang="ja">コ / ユ / ロ</td><td>yu's bottom line runs past the side, ro is a closed box</td></tr>
<tr><td lang="ja">チ / テ</td><td>chi's middle stroke curves down through the line; te's hangs below it</td></tr>
</table>
<p>The angle of the strokes is the clue. Practise シ, ツ, ソ and ン in the writing pad until the direction feels natural.</p>`,
      },
    ],
  },
];
