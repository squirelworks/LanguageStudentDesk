// Modular script data for Character Learner
// Add new scripts by extending the SCRIPTS object.

const SCRIPTS = {
  hiragana: {
    name: "Hiragana",
    chars: [
      { char: "あ", roman: "a", info: "Vowel", example: "あめ (ame)" },
      { char: "い", roman: "i", info: "Vowel", example: "いぬ (inu)" },
      { char: "う", roman: "u", info: "Vowel", example: "うみ (umi)" },
      { char: "え", roman: "e", info: "Vowel", example: "えき (eki)" },
      { char: "お", roman: "o", info: "Vowel", example: "おんな (onna)" },
      { char: "か", roman: "ka", info: "k + a", example: "かお (kao)" },
      { char: "き", roman: "ki", info: "k + i", example: "き (ki)" },
      { char: "く", roman: "ku", info: "k + u", example: "くも (kumo)" },
      { char: "け", roman: "ke", info: "k + e", example: "け (ke)" },
      { char: "こ", roman: "ko", info: "k + o", example: "こども (kodomo)" },
      { char: "さ", roman: "sa", info: "s + a", example: "さかな (sakana)" },
      { char: "し", roman: "shi", info: "s + i", example: "しろ (shiro)" },
      { char: "す", roman: "su", info: "s + u", example: "すき (suki)" },
      { char: "せ", roman: "se", info: "s + e", example: "せんせい (sensei)" },
      { char: "そ", roman: "so", info: "s + o", example: "そら (sora)" },
      { char: "た", roman: "ta", info: "t + a", example: "たべ (tabe)" },
      { char: "ち", roman: "chi", info: "t + i", example: "ちいさい (chiisai)" },
      { char: "つ", roman: "tsu", info: "t + u", example: "つき (tsuki)" },
      { char: "て", roman: "te", info: "t + e", example: "て (te)" },
      { char: "と", roman: "to", info: "t + o", example: "ともだち (tomodachi)" },
      { char: "な", roman: "na", info: "n + a", example: "なまえ (namae)" },
      { char: "に", roman: "ni", info: "n + i", example: "にほん (nihon)" },
      { char: "ぬ", roman: "nu", info: "n + u", example: "ぬ (nu)" },
      { char: "ね", roman: "ne", info: "n + e", example: "ねこ (neko)" },
      { char: "の", roman: "no", info: "n + o", example: "のむ (nomu)" }
    ]
  },
  katakana: {
    name: "Katakana",
    chars: [
      { char: "ア", roman: "a", info: "Vowel", example: "アメリカ" },
      { char: "イ", roman: "i", info: "Vowel", example: "インド" },
      { char: "ウ", roman: "u", info: "Vowel", example: "ウィスキー" },
      { char: "エ", roman: "e", info: "Vowel", example: "エレベーター" },
      { char: "オ", roman: "o", info: "Vowel", example: "オレンジ" },
      { char: "カ", roman: "ka", info: "k + a", example: "カメラ" },
      { char: "キ", roman: "ki", info: "k + i", example: "キッチン" },
      { char: "ク", roman: "ku", info: "k + u", example: "クロス" },
      { char: "ケ", roman: "ke", info: "k + e", example: "ケーキ" },
      { char: "コ", roman: "ko", info: "k + o", example: "コーヒー" },
      { char: "サ", roman: "sa", info: "s + a", example: "サラダ" },
      { char: "シ", roman: "shi", info: "s + i", example: "シャツ" },
      { char: "ス", roman: "su", info: "s + u", example: "スポーツ" },
      { char: "セ", roman: "se", info: "s + e", example: "センター" },
      { char: "ソ", roman: "so", info: "s + o", example: "ソファ" },
      { char: "タ", roman: "ta", info: "t + a", example: "タクシー" },
      { char: "チ", roman: "chi", info: "t + i", example: "チケット" },
      { char: "ツ", roman: "tsu", info: "t + u", example: "ツアー" },
      { char: "テ", roman: "te", info: "t + e", example: "テレビ" },
      { char: "ト", roman: "to", info: "t + o", example: "トイレ" }
    ]
  },
  arabic: {
    name: "Arabic",
    chars: [
      { char: "ا", roman: "alif", info: "Does not connect to the left. Isolated and final look similar.", example: "أحمد", forms: { isolated: "ا", initial: "—", medial: "—", final: "ا" } },
      { char: "ب", roman: "bāʾ", info: "Connects on both sides.", example: "باب", forms: { isolated: "ب", initial: "بـ", medial: "ـبـ", final: "ـب" } },
      { char: "ت", roman: "tāʾ", info: "Connects on both sides.", example: "تفاح", forms: { isolated: "ت", initial: "تـ", medial: "ـتـ", final: "ـت" } },
      { char: "ث", roman: "thāʾ", info: "Connects on both sides.", example: "ثلاثة", forms: { isolated: "ث", initial: "ثـ", medial: "ـثـ", final: "ـث" } },
      { char: "ج", roman: "jīm", info: "Connects on both sides.", example: "جميل", forms: { isolated: "ج", initial: "جـ", medial: "ـجـ", final: "ـج" } },
      { char: "ح", roman: "ḥāʾ", info: "Connects on both sides.", example: "حب", forms: { isolated: "ح", initial: "حـ", medial: "ـحـ", final: "ـح" } },
      { char: "خ", roman: "khāʾ", info: "Connects on both sides.", example: "خبز", forms: { isolated: "خ", initial: "خـ", medial: "ـخـ", final: "ـخ" } },
      { char: "د", roman: "dāl", info: "Does not connect to the left.", example: "دار", forms: { isolated: "د", initial: "—", medial: "—", final: "د" } },
      { char: "ذ", roman: "dhāl", info: "Does not connect to the left.", example: "ذهب", forms: { isolated: "ذ", initial: "—", medial: "—", final: "ذ" } },
      { char: "ر", roman: "rāʾ", info: "Does not connect to the left.", example: "رجل", forms: { isolated: "ر", initial: "—", medial: "—", final: "ر" } },
      { char: "ز", roman: "zāy", info: "Does not connect to the left.", example: "زيت", forms: { isolated: "ز", initial: "—", medial: "—", final: "ز" } },
      { char: "س", roman: "sīn", info: "Connects on both sides.", example: "سمك", forms: { isolated: "س", initial: "سـ", medial: "ـسـ", final: "ـس" } },
      { char: "ش", roman: "shīn", info: "Connects on both sides.", example: "شمس", forms: { isolated: "ش", initial: "شـ", medial: "ـشـ", final: "ـش" } },
      { char: "ص", roman: "ṣād", info: "Connects on both sides.", example: "صباح", forms: { isolated: "ص", initial: "صـ", medial: "ـصـ", final: "ـص" } },
      { char: "ض", roman: "ḍād", info: "Connects on both sides.", example: "ضوء", forms: { isolated: "ض", initial: "ضـ", medial: "ـضـ", final: "ـض" } }
    ]
  },
  cyrillic: {
    name: "Cyrillic",
    chars: [
      { char: "А", roman: "A", info: "a", example: "Анна" },
      { char: "Б", roman: "B", info: "b", example: "Брат" },
      { char: "В", roman: "V", info: "v", example: "Вода" },
      { char: "Г", roman: "G", info: "g", example: "Город" },
      { char: "Д", roman: "D", info: "d", example: "Дом" },
      { char: "Е", roman: "Ye", info: "ye", example: "Елена" },
      { char: "Ж", roman: "Zh", info: "zh", example: "Жизнь" },
      { char: "З", roman: "Z", info: "z", example: "Зима" },
      { char: "И", roman: "I", info: "i", example: "Имя" },
      { char: "Й", roman: "Y", info: "short i", example: "Йогурт" },
      { char: "К", roman: "K", info: "k", example: "Книга" },
      { char: "Л", roman: "L", info: "l", example: "Люди" },
      { char: "М", roman: "M", info: "m", example: "Мама" },
      { char: "Н", roman: "N", info: "n", example: "Ночь" },
      { char: "О", roman: "O", info: "o", example: "Окно" }
    ]
  },
  hangul: {
    name: "Hangul",
    chars: [
      { char: "ㄱ", roman: "g/k", info: "basic consonant", example: "가" },
      { char: "ㄴ", roman: "n", info: "basic consonant", example: "나" },
      { char: "ㄷ", roman: "d/t", info: "basic consonant", example: "다" },
      { char: "ㄹ", roman: "r/l", info: "basic consonant", example: "라" },
      { char: "ㅁ", roman: "m", info: "basic consonant", example: "마" },
      { char: "ㅂ", roman: "b/p", info: "basic consonant", example: "바" },
      { char: "ㅅ", roman: "s", info: "basic consonant", example: "사" },
      { char: "ㅇ", roman: "ng / silent", info: "basic consonant", example: "아" },
      { char: "ㅈ", roman: "j", info: "basic consonant", example: "자" },
      { char: "ㅎ", roman: "ch", info: "basic consonant", example: "차" },
      { char: "ㅏ", roman: "k", info: "basic consonant", example: "카" },
      { char: "ㅐ", roman: "t", info: "basic consonant", example: "타" },
      { char: "ㅑ", roman: "p", info: "basic consonant", example: "파" },
      { char: "ㅓ", roman: "h", info: "basic consonant", example: "하" },
      { char: "ㅋ", roman: "a", info: "vowel", example: "아" }
    ]
  },
  devanagari: {
    name: "Devanagari (Hindi)",
    chars: [
      { char: "अ", roman: "a", info: "vowel", example: "अ" },
      { char: "आ", roman: "aa", info: "long a", example: "आ" },
      { char: "इ", roman: "i", info: "vowel", example: "इ" },
      { char: "ई", roman: "ii", info: "long i", example: "ई" },
      { char: "उ", roman: "u", info: "vowel", example: "उ" },
      { char: "ऊ", roman: "uu", info: "long u", example: "ऊ" },
      { char: "ए", roman: "e", info: "vowel", example: "ए" },
      { char: "ऐ", roman: "ai", info: "vowel", example: "ऐ" },
      { char: "ओ", roman: "o", info: "vowel", example: "ओ" },
      { char: "औ", roman: "au", info: "vowel", example: "औ" },
      { char: "क", roman: "ka", info: "consonant", example: "क" },
      { char: "ख", roman: "kha", info: "consonant", example: "ख" },
      { char: "ग", roman: "ga", info: "consonant", example: "ग" },
      { char: "घ", roman: "gha", info: "consonant", example: "घ" },
      { char: "च", roman: "cha", info: "consonant", example: "च" }
    ]
  },
  kanji: {
    name: "Kanji (stub)",
    chars: [
      { char: "一", roman: "ichi / itsu", info: "one (N5)", example: "一 (1)" },
      { char: "二", roman: "ni / futatsu", info: "two (N5)", example: "二 (2)" },
      { char: "三", roman: "san / mitsu", info: "three (N5)", example: "三 (3)" },
      { char: "四", roman: "shi / yon", info: "four (N5)", example: "四 (4)" },
      { char: "五", roman: "go / itsu", info: "five (N5)", example: "五 (5)" },
      { char: "六", roman: "roku / mutsu", info: "six (N5)", example: "六 (6)" },
      { char: "七", roman: "shichi / nana", info: "seven (N5)", example: "七 (7)" },
      { char: "八", roman: "hachi / yatsu", info: "eight (N5)", example: "八 (8)" },
      { char: "九", roman: "kyuu / kokono", info: "nine (N5)", example: "九 (9)" },
      { char: "十", roman: "juu / to", info: "ten (N5)", example: "十 (10)" },
      { char: "人", roman: "jin / hito", info: "person (N5)", example: "人" },
      { char: "日", roman: "nichi / hi", info: "day / sun (N5)", example: "日本" },
      { char: "月", roman: "getsu / tsuki", info: "month / moon (N5)", example: "月" },
      { char: "火", roman: "ka / hi", info: "fire (N5)", example: "火" },
      { char: "水", roman: "sui / mizu", info: "water (N5)", example: "水" }
    ],
    groups: [
      {
        reading: "on: ka",
        note: "Example on-yomi group (stub)",
        chars: [
          { char: "火", roman: "ka" },
          { char: "花", roman: "ka" }
        ]
      },
      {
        reading: "on: sui",
        note: "Water-related on-yomi",
        chars: [
          { char: "水", roman: "sui" }
        ]
      }
    ]
  }
};
