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
        note: "Add k to each vowel. Every row after this one works the same way.",
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
        note: "ぬ and め look alike; ぬ ends in a small loop. ね, れ and わ share their first stroke.",
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
        note: "む and す both have a loop; む also has a dot on the right.",
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
        note: "Voiced kana combine the same way: ぎゃ gya, じゃ ja, びゃ bya, ぴゃ pya.",
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
      {
        title: "Reading practice: the basic rows",
        body: `<p>Every word here uses only the kana from the lessons up to that point, so you can read them as soon as you finish each row. Say each word, then press ▶ to check.</p>
<h3>Vowels and K</h3>
<table>
<tr><td lang="ja" class="word">あい</td><td>ai, love</td><td><button class="round play" data-act="say" data-text="あい" aria-label="Play あい">▶</button></td></tr>
<tr><td lang="ja" class="word">いえ</td><td>ie, house</td><td><button class="round play" data-act="say" data-text="いえ" aria-label="Play いえ">▶</button></td></tr>
<tr><td lang="ja" class="word">うえ</td><td>ue, above</td><td><button class="round play" data-act="say" data-text="うえ" aria-label="Play うえ">▶</button></td></tr>
<tr><td lang="ja" class="word">あお</td><td>ao, blue</td><td><button class="round play" data-act="say" data-text="あお" aria-label="Play あお">▶</button></td></tr>
<tr><td lang="ja" class="word">かお</td><td>kao, face</td><td><button class="round play" data-act="say" data-text="かお" aria-label="Play かお">▶</button></td></tr>
<tr><td lang="ja" class="word">あき</td><td>aki, autumn</td><td><button class="round play" data-act="say" data-text="あき" aria-label="Play あき">▶</button></td></tr>
<tr><td lang="ja" class="word">いけ</td><td>ike, pond</td><td><button class="round play" data-act="say" data-text="いけ" aria-label="Play いけ">▶</button></td></tr>
<tr><td lang="ja" class="word">きく</td><td>kiku, to listen</td><td><button class="round play" data-act="say" data-text="きく" aria-label="Play きく">▶</button></td></tr>
</table>
<h3>S and T</h3>
<table>
<tr><td lang="ja" class="word">すし</td><td>sushi, sushi</td><td><button class="round play" data-act="say" data-text="すし" aria-label="Play すし">▶</button></td></tr>
<tr><td lang="ja" class="word">あさ</td><td>asa, morning</td><td><button class="round play" data-act="say" data-text="あさ" aria-label="Play あさ">▶</button></td></tr>
<tr><td lang="ja" class="word">うそ</td><td>uso, lie</td><td><button class="round play" data-act="say" data-text="うそ" aria-label="Play うそ">▶</button></td></tr>
<tr><td lang="ja" class="word">せき</td><td>seki, seat</td><td><button class="round play" data-act="say" data-text="せき" aria-label="Play せき">▶</button></td></tr>
<tr><td lang="ja" class="word">たこ</td><td>tako, octopus</td><td><button class="round play" data-act="say" data-text="たこ" aria-label="Play たこ">▶</button></td></tr>
<tr><td lang="ja" class="word">ちかてつ</td><td>chikatetsu, subway</td><td><button class="round play" data-act="say" data-text="ちかてつ" aria-label="Play ちかてつ">▶</button></td></tr>
<tr><td lang="ja" class="word">つくえ</td><td>tsukue, desk</td><td><button class="round play" data-act="say" data-text="つくえ" aria-label="Play つくえ">▶</button></td></tr>
<tr><td lang="ja" class="word">とけい</td><td>tokei, clock</td><td><button class="round play" data-act="say" data-text="とけい" aria-label="Play とけい">▶</button></td></tr>
</table>
<h3>N and H</h3>
<table>
<tr><td lang="ja" class="word">なつ</td><td>natsu, summer</td><td><button class="round play" data-act="say" data-text="なつ" aria-label="Play なつ">▶</button></td></tr>
<tr><td lang="ja" class="word">ねこ</td><td>neko, cat</td><td><button class="round play" data-act="say" data-text="ねこ" aria-label="Play ねこ">▶</button></td></tr>
<tr><td lang="ja" class="word">いぬ</td><td>inu, dog</td><td><button class="round play" data-act="say" data-text="いぬ" aria-label="Play いぬ">▶</button></td></tr>
<tr><td lang="ja" class="word">にく</td><td>niku, meat</td><td><button class="round play" data-act="say" data-text="にく" aria-label="Play にく">▶</button></td></tr>
<tr><td lang="ja" class="word">はな</td><td>hana, flower; nose</td><td><button class="round play" data-act="say" data-text="はな" aria-label="Play はな">▶</button></td></tr>
<tr><td lang="ja" class="word">ひと</td><td>hito, person</td><td><button class="round play" data-act="say" data-text="ひと" aria-label="Play ひと">▶</button></td></tr>
<tr><td lang="ja" class="word">ふね</td><td>fune, boat</td><td><button class="round play" data-act="say" data-text="ふね" aria-label="Play ふね">▶</button></td></tr>
<tr><td lang="ja" class="word">ほし</td><td>hoshi, star</td><td><button class="round play" data-act="say" data-text="ほし" aria-label="Play ほし">▶</button></td></tr>
</table>
<h3>M, Y, R and W</h3>
<table>
<tr><td lang="ja" class="word">まち</td><td>machi, town</td><td><button class="round play" data-act="say" data-text="まち" aria-label="Play まち">▶</button></td></tr>
<tr><td lang="ja" class="word">みみ</td><td>mimi, ear</td><td><button class="round play" data-act="say" data-text="みみ" aria-label="Play みみ">▶</button></td></tr>
<tr><td lang="ja" class="word">むし</td><td>mushi, insect</td><td><button class="round play" data-act="say" data-text="むし" aria-label="Play むし">▶</button></td></tr>
<tr><td lang="ja" class="word">もも</td><td>momo, peach</td><td><button class="round play" data-act="say" data-text="もも" aria-label="Play もも">▶</button></td></tr>
<tr><td lang="ja" class="word">やま</td><td>yama, mountain</td><td><button class="round play" data-act="say" data-text="やま" aria-label="Play やま">▶</button></td></tr>
<tr><td lang="ja" class="word">ゆき</td><td>yuki, snow</td><td><button class="round play" data-act="say" data-text="ゆき" aria-label="Play ゆき">▶</button></td></tr>
<tr><td lang="ja" class="word">よる</td><td>yoru, night</td><td><button class="round play" data-act="say" data-text="よる" aria-label="Play よる">▶</button></td></tr>
<tr><td lang="ja" class="word">さくら</td><td>sakura, cherry blossom</td><td><button class="round play" data-act="say" data-text="さくら" aria-label="Play さくら">▶</button></td></tr>
<tr><td lang="ja" class="word">くるま</td><td>kuruma, car</td><td><button class="round play" data-act="say" data-text="くるま" aria-label="Play くるま">▶</button></td></tr>
<tr><td lang="ja" class="word">わたし</td><td>watashi, I, me</td><td><button class="round play" data-act="say" data-text="わたし" aria-label="Play わたし">▶</button></td></tr>
<tr><td lang="ja" class="word">ほん</td><td>hon, book</td><td><button class="round play" data-act="say" data-text="ほん" aria-label="Play ほん">▶</button></td></tr>
<tr><td lang="ja" class="word">みかん</td><td>mikan, mandarin orange</td><td><button class="round play" data-act="say" data-text="みかん" aria-label="Play みかん">▶</button></td></tr>
</table>`,
      },
      {
        title: "Reading practice: voiced and combination sounds",
        body: `<p>Dakuten, handakuten and the small ゃ ゅ ょ in everyday words.</p>
<h3>Voiced sounds</h3>
<table>
<tr><td lang="ja" class="word">かぎ</td><td>kagi, key</td><td><button class="round play" data-act="say" data-text="かぎ" aria-label="Play かぎ">▶</button></td></tr>
<tr><td lang="ja" class="word">かぜ</td><td>kaze, wind; a cold</td><td><button class="round play" data-act="say" data-text="かぜ" aria-label="Play かぜ">▶</button></td></tr>
<tr><td lang="ja" class="word">まど</td><td>mado, window</td><td><button class="round play" data-act="say" data-text="まど" aria-label="Play まど">▶</button></td></tr>
<tr><td lang="ja" class="word">ゆび</td><td>yubi, finger</td><td><button class="round play" data-act="say" data-text="ゆび" aria-label="Play ゆび">▶</button></td></tr>
<tr><td lang="ja" class="word">ごはん</td><td>gohan, rice; a meal</td><td><button class="round play" data-act="say" data-text="ごはん" aria-label="Play ごはん">▶</button></td></tr>
<tr><td lang="ja" class="word">でんわ</td><td>denwa, telephone</td><td><button class="round play" data-act="say" data-text="でんわ" aria-label="Play でんわ">▶</button></td></tr>
<tr><td lang="ja" class="word">えんぴつ</td><td>enpitsu, pencil</td><td><button class="round play" data-act="say" data-text="えんぴつ" aria-label="Play えんぴつ">▶</button></td></tr>
<tr><td lang="ja" class="word">さんぽ</td><td>sanpo, a walk</td><td><button class="round play" data-act="say" data-text="さんぽ" aria-label="Play さんぽ">▶</button></td></tr>
</table>
<h3>Combination sounds</h3>
<table>
<tr><td lang="ja" class="word">きょう</td><td>kyō, today</td><td><button class="round play" data-act="say" data-text="きょう" aria-label="Play きょう">▶</button></td></tr>
<tr><td lang="ja" class="word">しゃしん</td><td>shashin, photograph</td><td><button class="round play" data-act="say" data-text="しゃしん" aria-label="Play しゃしん">▶</button></td></tr>
<tr><td lang="ja" class="word">ちゃわん</td><td>chawan, rice bowl</td><td><button class="round play" data-act="say" data-text="ちゃわん" aria-label="Play ちゃわん">▶</button></td></tr>
<tr><td lang="ja" class="word">りょこう</td><td>ryokō, trip</td><td><button class="round play" data-act="say" data-text="りょこう" aria-label="Play りょこう">▶</button></td></tr>
<tr><td lang="ja" class="word">びょういん</td><td>byōin, hospital</td><td><button class="round play" data-act="say" data-text="びょういん" aria-label="Play びょういん">▶</button></td></tr>
<tr><td lang="ja" class="word">じゅぎょう</td><td>jugyō, class, lesson</td><td><button class="round play" data-act="say" data-text="じゅぎょう" aria-label="Play じゅぎょう">▶</button></td></tr>
<tr><td lang="ja" class="word">ぎゅうにゅう</td><td>gyūnyū, milk</td><td><button class="round play" data-act="say" data-text="ぎゅうにゅう" aria-label="Play ぎゅうにゅう">▶</button></td></tr>
<tr><td lang="ja" class="word">にんぎょう</td><td>ningyō, doll</td><td><button class="round play" data-act="say" data-text="にんぎょう" aria-label="Play にんぎょう">▶</button></td></tr>
</table>
<p>Compare <span lang="ja">びよういん</span> biyōin (beauty salon) with <span lang="ja">びょういん</span> byōin (hospital): the small ょ removes a beat.</p>`,
      },
      {
        title: "Reading practice: small っ and long vowels",
        body: `<p>Count the beats as you read. A small っ and each half of a long vowel take one beat each.</p>
<table>
<tr><td lang="ja" class="word">がっこう</td><td>gakkō, school</td><td><button class="round play" data-act="say" data-text="がっこう" aria-label="Play がっこう">▶</button></td></tr>
<tr><td lang="ja" class="word">きって</td><td>kitte, postage stamp</td><td><button class="round play" data-act="say" data-text="きって" aria-label="Play きって">▶</button></td></tr>
<tr><td lang="ja" class="word">ざっし</td><td>zasshi, magazine</td><td><button class="round play" data-act="say" data-text="ざっし" aria-label="Play ざっし">▶</button></td></tr>
<tr><td lang="ja" class="word">いっしょ</td><td>issho, together</td><td><button class="round play" data-act="say" data-text="いっしょ" aria-label="Play いっしょ">▶</button></td></tr>
<tr><td lang="ja" class="word">おかあさん</td><td>okāsan, mother</td><td><button class="round play" data-act="say" data-text="おかあさん" aria-label="Play おかあさん">▶</button></td></tr>
<tr><td lang="ja" class="word">おとうさん</td><td>otōsan, father</td><td><button class="round play" data-act="say" data-text="おとうさん" aria-label="Play おとうさん">▶</button></td></tr>
<tr><td lang="ja" class="word">おねえさん</td><td>onēsan, older sister</td><td><button class="round play" data-act="say" data-text="おねえさん" aria-label="Play おねえさん">▶</button></td></tr>
<tr><td lang="ja" class="word">せんせい</td><td>sensei, teacher</td><td><button class="round play" data-act="say" data-text="せんせい" aria-label="Play せんせい">▶</button></td></tr>
<tr><td lang="ja" class="word">ゆうびん</td><td>yūbin, mail</td><td><button class="round play" data-act="say" data-text="ゆうびん" aria-label="Play ゆうびん">▶</button></td></tr>
<tr><td lang="ja" class="word">とおい</td><td>tōi, far</td><td><button class="round play" data-act="say" data-text="とおい" aria-label="Play とおい">▶</button></td></tr>
</table>
<p>がっこう is four beats: が・っ・こ・う. Clapping the beats is a quick way to hear the difference between きて and きって.</p>`,
      },
      {
        title: "Reading practice: short sentences",
        body: `<p>Short sentences in hiragana only, with spaces between the words as in children's books. Watch for the particles は (wa), へ (e) and を (o).</p>
<table>
<tr><td lang="ja" class="word">わたしは がくせいです。</td><td>watashi wa gakusei desu, I am a student</td><td><button class="round play" data-act="say" data-text="わたしは がくせいです。" aria-label="Play わたしは がくせいです。">▶</button></td></tr>
<tr><td lang="ja" class="word">がっこうへ いきます。</td><td>gakkō e ikimasu, I go to school</td><td><button class="round play" data-act="say" data-text="がっこうへ いきます。" aria-label="Play がっこうへ いきます。">▶</button></td></tr>
<tr><td lang="ja" class="word">みずを のみます。</td><td>mizu o nomimasu, I drink water</td><td><button class="round play" data-act="say" data-text="みずを のみます。" aria-label="Play みずを のみます。">▶</button></td></tr>
<tr><td lang="ja" class="word">これは ねこです。</td><td>kore wa neko desu, this is a cat</td><td><button class="round play" data-act="say" data-text="これは ねこです。" aria-label="Play これは ねこです。">▶</button></td></tr>
<tr><td lang="ja" class="word">あしたは あめです。</td><td>ashita wa ame desu, tomorrow it will rain</td><td><button class="round play" data-act="say" data-text="あしたは あめです。" aria-label="Play あしたは あめです。">▶</button></td></tr>
<tr><td lang="ja" class="word">おはよう ございます。</td><td>ohayō gozaimasu, good morning</td><td><button class="round play" data-act="say" data-text="おはよう ございます。" aria-label="Play おはよう ございます。">▶</button></td></tr>
</table>
<p>Real Japanese leaves out the spaces and writes most nouns in kanji: <span lang="ja">私は学生です。</span></p>`,
      },
      {
        title: "Quiet vowels: why です sounds like dess",
        body: `<p>In standard Japanese, i and u often go quiet when they fall between voiceless consonants (k, s, t, h, p) or at the end of a sentence after one. The mouth still shapes the vowel, but the voice drops out.</p>
<table>
<tr><td lang="ja">です</td><td>desu, said almost like dess</td></tr>
<tr><td lang="ja">ます</td><td>masu, said almost like mass</td></tr>
<tr><td lang="ja">すき</td><td>suki (like), said almost like ski</td></tr>
<tr><td lang="ja">ひと</td><td>hito (person), the i barely heard</td></tr>
</table>
<p>Spelling never changes: the kana stay the same, and you still count them as beats. Some text-to-speech voices say every vowel fully, so listen to real speakers too.</p>`,
      },
      {
        title: "じ and ぢ, ず and づ",
        body: `<p>ぢ and じ are both said ji, and づ and ず are both said zu. In modern spelling じ and ず are the normal choice. ぢ and づ appear in only two situations:</p>
<ul>
<li>when a word repeats a ち or つ sound with a voiced mark: <span lang="ja">ちぢむ</span> chijimu (shrink), <span lang="ja">つづく</span> tsuzuku (continue)</li>
<li>when a compound voices a word that starts with ち or つ: <span lang="ja">はな</span> + <span lang="ja">ち</span> = <span lang="ja">はなぢ</span> hanaji (nosebleed), <span lang="ja">みか</span> + <span lang="ja">つき</span> = <span lang="ja">みかづき</span> mikazuki (crescent moon)</li>
</ul>
<p>When typing on a keyboard, ぢ is di and づ is du.</p>`,
      },
      {
        title: "Punctuation and vertical writing",
        body: `<p>Japanese punctuation is full width, one square like a kana:</p>
<table>
<tr><td lang="ja">。</td><td>full stop (maru)</td></tr>
<tr><td lang="ja">、</td><td>comma (ten)</td></tr>
<tr><td lang="ja">「 」</td><td>quotation marks (kagi-kakko)</td></tr>
<tr><td lang="ja">・</td><td>middle dot, between foreign names: <span lang="ja">ジョン・スミス</span></td></tr>
<tr><td lang="ja">〜</td><td>wave dash, for ranges: <span lang="ja">3〜5</span></td></tr>
</table>
<p>Books, newspapers and manga are often written vertically: columns run top to bottom, and the columns go from right to left. Small kana sit in the upper right of their square, and the long-vowel bar turns vertical. The shapes of the kana do not change.</p>`,
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
        note: "Katakana is built from short, straight strokes. The sounds are the same as hiragana.",
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
        note: "カ and か, キ and き, コ and こ look much like their hiragana twins.",
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
        note: "チ is chi and ツ is tsu, as in hiragana. テ and チ are easy to mix up.",
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
        note: "ヌ and ス are close: ヌ's second stroke crosses the first, ス's does not.",
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
        note: "ヘ is nearly identical to hiragana へ. フ is a single hooked stroke.",
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
        note: "ム is a triangle with a tail; メ is two crossing strokes.",
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
        note: "ヤ, ユ and ヨ: ユ is a box with an open left side, ヨ has three bars.",
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
        note: "ル and レ are the two-stroke and one-stroke versions of the same shape.",
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
        note: "ヲ is almost never used in modern writing. ン and ソ look alike: see the look-alikes article.",
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
        note: "The same two small strokes (dakuten) as in hiragana: ガ ga, ザ za, ダ da.",
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
        note: "ハ becomes バ with dakuten and パ with the small circle.",
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
      {
        title: "Reading practice: loanwords",
        body: `<p>Everyday loanwords from English and other languages. Read each one aloud and guess the original word before you look at the meaning.</p>
<table>
<tr><td lang="ja" class="word">カメラ</td><td>kamera, camera</td><td><button class="round play" data-act="say" data-text="カメラ" aria-label="Play カメラ">▶</button></td></tr>
<tr><td lang="ja" class="word">テレビ</td><td>terebi, television</td><td><button class="round play" data-act="say" data-text="テレビ" aria-label="Play テレビ">▶</button></td></tr>
<tr><td lang="ja" class="word">ホテル</td><td>hoteru, hotel</td><td><button class="round play" data-act="say" data-text="ホテル" aria-label="Play ホテル">▶</button></td></tr>
<tr><td lang="ja" class="word">タクシー</td><td>takushī, taxi</td><td><button class="round play" data-act="say" data-text="タクシー" aria-label="Play タクシー">▶</button></td></tr>
<tr><td lang="ja" class="word">バス</td><td>basu, bus</td><td><button class="round play" data-act="say" data-text="バス" aria-label="Play バス">▶</button></td></tr>
<tr><td lang="ja" class="word">コーヒー</td><td>kōhī, coffee</td><td><button class="round play" data-act="say" data-text="コーヒー" aria-label="Play コーヒー">▶</button></td></tr>
<tr><td lang="ja" class="word">パン</td><td>pan, bread</td><td><button class="round play" data-act="say" data-text="パン" aria-label="Play パン">▶</button></td></tr>
<tr><td lang="ja" class="word">ケーキ</td><td>kēki, cake</td><td><button class="round play" data-act="say" data-text="ケーキ" aria-label="Play ケーキ">▶</button></td></tr>
<tr><td lang="ja" class="word">ノート</td><td>nōto, notebook</td><td><button class="round play" data-act="say" data-text="ノート" aria-label="Play ノート">▶</button></td></tr>
<tr><td lang="ja" class="word">ピアノ</td><td>piano, piano</td><td><button class="round play" data-act="say" data-text="ピアノ" aria-label="Play ピアノ">▶</button></td></tr>
<tr><td lang="ja" class="word">トマト</td><td>tomato, tomato</td><td><button class="round play" data-act="say" data-text="トマト" aria-label="Play トマト">▶</button></td></tr>
<tr><td lang="ja" class="word">メニュー</td><td>menyū, menu</td><td><button class="round play" data-act="say" data-text="メニュー" aria-label="Play メニュー">▶</button></td></tr>
<tr><td lang="ja" class="word">ゲーム</td><td>gēmu, game</td><td><button class="round play" data-act="say" data-text="ゲーム" aria-label="Play ゲーム">▶</button></td></tr>
<tr><td lang="ja" class="word">コンビニ</td><td>konbini, convenience store</td><td><button class="round play" data-act="say" data-text="コンビニ" aria-label="Play コンビニ">▶</button></td></tr>
</table>`,
      },
      {
        title: "Reading practice: extended katakana",
        body: `<p>Words that need the newer combinations from the last lesson.</p>
<table>
<tr><td lang="ja" class="word">ファン</td><td>fan, fan, supporter</td><td><button class="round play" data-act="say" data-text="ファン" aria-label="Play ファン">▶</button></td></tr>
<tr><td lang="ja" class="word">フォーク</td><td>fōku, fork</td><td><button class="round play" data-act="say" data-text="フォーク" aria-label="Play フォーク">▶</button></td></tr>
<tr><td lang="ja" class="word">パーティー</td><td>pātī, party</td><td><button class="round play" data-act="say" data-text="パーティー" aria-label="Play パーティー">▶</button></td></tr>
<tr><td lang="ja" class="word">ソファ</td><td>sofa, sofa</td><td><button class="round play" data-act="say" data-text="ソファ" aria-label="Play ソファ">▶</button></td></tr>
<tr><td lang="ja" class="word">チェック</td><td>chekku, check</td><td><button class="round play" data-act="say" data-text="チェック" aria-label="Play チェック">▶</button></td></tr>
<tr><td lang="ja" class="word">ジェット</td><td>jetto, jet</td><td><button class="round play" data-act="say" data-text="ジェット" aria-label="Play ジェット">▶</button></td></tr>
<tr><td lang="ja" class="word">シェフ</td><td>shefu, chef</td><td><button class="round play" data-act="say" data-text="シェフ" aria-label="Play シェフ">▶</button></td></tr>
<tr><td lang="ja" class="word">ウェブ</td><td>webu, the web</td><td><button class="round play" data-act="say" data-text="ウェブ" aria-label="Play ウェブ">▶</button></td></tr>
<tr><td lang="ja" class="word">ウォーター</td><td>wōtā, water (in names)</td><td><button class="round play" data-act="say" data-text="ウォーター" aria-label="Play ウォーター">▶</button></td></tr>
<tr><td lang="ja" class="word">デュエット</td><td>dyuetto, duet</td><td><button class="round play" data-act="say" data-text="デュエット" aria-label="Play デュエット">▶</button></td></tr>
</table>
<p>Older spellings are still common: <span lang="ja">バイオリン</span> baiorin (violin) is more usual than <span lang="ja">ヴァイオリン</span>.</p>`,
      },
      {
        title: "Reading practice: countries and cities",
        body: `<p>Foreign place names are written in katakana. Japan's neighbours China and Korea are the exception: they use kanji (<span lang="ja">中国</span>, <span lang="ja">韓国</span>).</p>
<table>
<tr><td lang="ja" class="word">アメリカ</td><td>Amerika, America</td><td><button class="round play" data-act="say" data-text="アメリカ" aria-label="Play アメリカ">▶</button></td></tr>
<tr><td lang="ja" class="word">イギリス</td><td>Igirisu, Britain</td><td><button class="round play" data-act="say" data-text="イギリス" aria-label="Play イギリス">▶</button></td></tr>
<tr><td lang="ja" class="word">フランス</td><td>Furansu, France</td><td><button class="round play" data-act="say" data-text="フランス" aria-label="Play フランス">▶</button></td></tr>
<tr><td lang="ja" class="word">ドイツ</td><td>Doitsu, Germany</td><td><button class="round play" data-act="say" data-text="ドイツ" aria-label="Play ドイツ">▶</button></td></tr>
<tr><td lang="ja" class="word">イタリア</td><td>Itaria, Italy</td><td><button class="round play" data-act="say" data-text="イタリア" aria-label="Play イタリア">▶</button></td></tr>
<tr><td lang="ja" class="word">カナダ</td><td>Kanada, Canada</td><td><button class="round play" data-act="say" data-text="カナダ" aria-label="Play カナダ">▶</button></td></tr>
<tr><td lang="ja" class="word">ブラジル</td><td>Burajiru, Brazil</td><td><button class="round play" data-act="say" data-text="ブラジル" aria-label="Play ブラジル">▶</button></td></tr>
<tr><td lang="ja" class="word">インド</td><td>Indo, India</td><td><button class="round play" data-act="say" data-text="インド" aria-label="Play インド">▶</button></td></tr>
<tr><td lang="ja" class="word">オーストラリア</td><td>Ōsutoraria, Australia</td><td><button class="round play" data-act="say" data-text="オーストラリア" aria-label="Play オーストラリア">▶</button></td></tr>
<tr><td lang="ja" class="word">ロンドン</td><td>Rondon, London</td><td><button class="round play" data-act="say" data-text="ロンドン" aria-label="Play ロンドン">▶</button></td></tr>
<tr><td lang="ja" class="word">パリ</td><td>Pari, Paris</td><td><button class="round play" data-act="say" data-text="パリ" aria-label="Play パリ">▶</button></td></tr>
<tr><td lang="ja" class="word">ニューヨーク</td><td>Nyūyōku, New York</td><td><button class="round play" data-act="say" data-text="ニューヨーク" aria-label="Play ニューヨーク">▶</button></td></tr>
</table>
<p>イギリス comes from Portuguese inglês, and ドイツ from Dutch duits, a trace of the first Europeans to trade with Japan.</p>`,
      },
      {
        title: "Sound words in katakana",
        body: `<p>Japanese has thousands of sound and feeling words, often written in katakana in manga and ads.</p>
<table>
<tr><td lang="ja" class="word">ワンワン</td><td>wanwan, woof (a dog)</td><td><button class="round play" data-act="say" data-text="ワンワン" aria-label="Play ワンワン">▶</button></td></tr>
<tr><td lang="ja" class="word">ニャー</td><td>nyā, meow</td><td><button class="round play" data-act="say" data-text="ニャー" aria-label="Play ニャー">▶</button></td></tr>
<tr><td lang="ja" class="word">ドキドキ</td><td>dokidoki, heart pounding</td><td><button class="round play" data-act="say" data-text="ドキドキ" aria-label="Play ドキドキ">▶</button></td></tr>
<tr><td lang="ja" class="word">ワクワク</td><td>wakuwaku, excited</td><td><button class="round play" data-act="say" data-text="ワクワク" aria-label="Play ワクワク">▶</button></td></tr>
<tr><td lang="ja" class="word">ザーザー</td><td>zāzā, pouring rain</td><td><button class="round play" data-act="say" data-text="ザーザー" aria-label="Play ザーザー">▶</button></td></tr>
<tr><td lang="ja" class="word">ゴロゴロ</td><td>gorogoro, rumbling; lazing about</td><td><button class="round play" data-act="say" data-text="ゴロゴロ" aria-label="Play ゴロゴロ">▶</button></td></tr>
<tr><td lang="ja" class="word">ピカピカ</td><td>pikapika, sparkling</td><td><button class="round play" data-act="say" data-text="ピカピカ" aria-label="Play ピカピカ">▶</button></td></tr>
<tr><td lang="ja" class="word">ペコペコ</td><td>pekopeko, starving</td><td><button class="round play" data-act="say" data-text="ペコペコ" aria-label="Play ペコペコ">▶</button></td></tr>
</table>
<p>Many are doubled words. Writing them in hiragana makes them softer, in katakana louder.</p>`,
      },
    ],
  },
];
