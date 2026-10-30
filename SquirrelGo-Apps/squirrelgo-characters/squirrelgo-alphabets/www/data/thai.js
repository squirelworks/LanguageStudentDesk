// The Thai alphabet for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization,
// meaning, text to speak, IPA]. Romanization follows the Royal Thai General System
// for consonants, with doubled letters for long vowels. Each consonant's example is
// the word its traditional name comes from (ก is "ko kai", ko as in kai, chicken).
// Hints, groupings and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "thai",
  title: "Thai",
  native: "ไทย",
  lang: "th-TH",
  langName: "Thai",
  font: '"Noto Sans Thai Looped", "Noto Sans Thai", "Leelawadee UI", "Thonburi", sans-serif',
  blurb: "44 consonants in three classes, vowels written all around them, and five tones.",
  writeTip: "Most Thai letters start at the small loop (the head) and are drawn in one stroke without lifting the pen.",
  lessons: [
    {
      title: "Middle-class consonants",
      group: "Consonants",
      note: "Learn these nine first: their class gives the simplest tone rules. Each letter is named by its sound with an o after it, then a word: ก is ko kai, k as in kai (chicken).",
      chars: [
        ["ก", "k", "k without a puff of air, as in skin", "ไก่", "kai", "chicken", "กอ", "k"],
        ["จ", "ch", "ch without a puff of air, close to j", "จาน", "chan", "plate", "จอ", "tɕ"],
        ["ด", "d", "d as in day", "เด็ก", "dek", "child", "ดอ", "d"],
        ["ต", "t", "t without a puff of air, as in stop", "เต่า", "tao", "turtle", "ตอ", "t"],
        ["บ", "b", "b as in boy", "ใบไม้", "bai mai", "leaf", "บอ", "b"],
        ["ป", "p", "p without a puff of air, as in spin", "ปลา", "pla", "fish", "ปอ", "p"],
        ["อ", "ʼ", "a silent holder for a vowel; also the vowel aw", "อ่าง", "ang", "basin", "ออ", "ʔ"],
        ["ฎ", "d", "a rare d, used in words from Pali and Sanskrit", "ชฎา", "chada", "dancer's headdress", "ฎอ", "d"],
        ["ฏ", "t", "a rare t, used in words from Pali and Sanskrit", "ปฏัก", "patak", "ox goad", "ฏอ", "t"],
      ],
    },
    {
      title: "High-class consonants",
      group: "Consonants",
      note: "These are said with a puff of air, or are hissing sounds. A plain syllable that starts with one of them has a rising tone.",
      chars: [
        ["ข", "kh", "k with a puff of air, as in kin", "ไข่", "khai", "egg", "ขอ", "kʰ"],
        ["ฉ", "ch", "ch with a puff of air, as in chin", "ฉิ่ง", "ching", "small cymbals", "ฉอ", "tɕʰ"],
        ["ถ", "th", "t with a puff of air, as in tin", "ถุง", "thung", "bag", "ถอ", "tʰ"],
        ["ผ", "ph", "p with a puff of air, as in pin", "ผึ้ง", "phueng", "bee", "ผอ", "pʰ"],
        ["ฝ", "f", "f as in fan", "ฝา", "fa", "lid", "ฝอ", "f"],
        ["ส", "s", "s as in sun; the common s", "เสือ", "suea", "tiger", "สอ", "s"],
        ["ห", "h", "h as in hat; also makes a low consonant high", "หีบ", "hip", "chest", "หอ", "h"],
        ["ศ", "s", "s, in words from Sanskrit", "ศาลา", "sala", "pavilion", "ศอ", "s"],
        ["ษ", "s", "s, in words from Sanskrit", "ฤๅษี", "ruesi", "hermit", "ษอ", "s"],
        ["ฐ", "th", "a rare th, in words from Pali and Sanskrit", "ฐาน", "than", "base, pedestal", "ฐอ", "tʰ"],
        ["ฃ", "kh", "no longer used; its name word ขวด is now spelled with ข", "ขวด", "khuat", "bottle", "ขอ", "kʰ"],
      ],
    },
    {
      title: "Low-class consonants in pairs",
      group: "Consonants",
      note: "Each of these has a high-class twin with the same sound (ค and ข are both kh). A plain syllable that starts with a low consonant has a mid tone.",
      chars: [
        ["ค", "kh", "kh, the low twin of ข", "ควาย", "khwai", "water buffalo", "คอ", "kʰ"],
        ["ช", "ch", "ch with a puff of air, the low twin of ฉ", "ช้าง", "chang", "elephant", "ชอ", "tɕʰ"],
        ["ซ", "s", "s, the low twin of ส", "โซ่", "so", "chain", "ซอ", "s"],
        ["ท", "th", "th, the low twin of ถ", "ทหาร", "thahan", "soldier", "ทอ", "tʰ"],
        ["พ", "ph", "ph, the low twin of ผ", "พาน", "phan", "offering tray", "พอ", "pʰ"],
        ["ฟ", "f", "f, the low twin of ฝ", "ฟัน", "fan", "tooth", "ฟอ", "f"],
        ["ฮ", "h", "h, the low twin of ห", "นกฮูก", "nok huk", "owl", "ฮอ", "h"],
        ["ธ", "th", "th, mostly in words from Pali and Sanskrit", "ธง", "thong", "flag", "ธอ", "tʰ"],
        ["ภ", "ph", "ph, mostly in words from Pali and Sanskrit", "สำเภา", "samphao", "junk (sailing ship)", "ภอ", "pʰ"],
        ["ฆ", "kh", "a rare kh", "ระฆัง", "rakhang", "temple bell", "ฆอ", "kʰ"],
        ["ฌ", "ch", "a rare ch", "เฌอ", "choe", "tree", "ฌอ", "tɕʰ"],
        ["ฑ", "th", "a rare th, sometimes said d", "มณโฑ", "montho", "Montho, a queen in the Ramakien", "ฑอ", "tʰ"],
        ["ฒ", "th", "a rare th", "ผู้เฒ่า", "phu thao", "elder", "ฒอ", "tʰ"],
        ["ฅ", "kh", "no longer used; its name word คน is now spelled with ค", "คน", "khon", "person", "คอ", "kʰ"],
      ],
    },
    {
      title: "Low-class sounds with no twin",
      group: "Consonants",
      note: "Nasals and smooth sounds. To give one of them a high-class tone, Thai writes a silent ห in front: หมา (ma, dog).",
      chars: [
        ["ง", "ng", "ng as in sing, even at the start of a word", "งู", "ngu", "snake", "งอ", "ŋ"],
        ["น", "n", "n as in no", "หนู", "nu", "mouse", "นอ", "n"],
        ["ม", "m", "m as in man", "ม้า", "ma", "horse", "มอ", "m"],
        ["ย", "y", "y as in yes", "ยักษ์", "yak", "giant", "ยอ", "j"],
        ["ร", "r", "a tapped r; often said l in casual speech", "เรือ", "ruea", "boat", "รอ", "r"],
        ["ล", "l", "l as in let", "ลิง", "ling", "monkey", "ลอ", "l"],
        ["ว", "w", "w as in wet", "แหวน", "waen", "ring", "วอ", "w"],
        ["ญ", "y", "y, in words from Pali and Sanskrit", "หญิง", "ying", "woman", "ญอ", "j"],
        ["ณ", "n", "n, in words from Pali and Sanskrit", "เณร", "nen", "novice monk", "ณอ", "n"],
        ["ฬ", "l", "a rare l", "จุฬา", "chula", "star-shaped kite", "ฬอ", "l"],
      ],
    },
    {
      title: "Vowels on ก",
      group: "Vowels",
      cols: 4,
      note: "Vowel signs sit before, after, above or below the consonant, and some wrap around it. They are shown here on ก. Whatever the position, the consonant is said first.",
      chars: [
        ["กะ", "ka", "short a", "กะทิ", "kathi", "coconut milk", "", "ka"],
        ["กา", "kaa", "long a, as in father", "ตา", "ta", "eye", "", "kaː"],
        ["กิ", "ki", "short i, as in bit", "สิบ", "sip", "ten", "", "ki"],
        ["กี", "kii", "long ee, as in see", "ดี", "di", "good", "", "kiː"],
        ["กึ", "kue", "short ue: say i with your lips spread flat", "ลึก", "luek", "deep", "", "kɯ"],
        ["กือ", "kuue", "long ue; open syllables add a silent อ", "มือ", "mue", "hand", "", "kɯː"],
        ["กุ", "ku", "short u, as in put", "ลุง", "lung", "uncle", "", "ku"],
        ["กู", "kuu", "long oo, as in food", "งู", "ngu", "snake", "", "kuː"],
        ["เก", "kee", "long e, as in they without the glide; written first", "เลข", "lek", "number", "", "keː"],
        ["แก", "kae", "long a, as in bad; written first", "แมว", "maeo", "cat", "", "kɛː"],
        ["โก", "koo", "long o, as in go without the glide; written first", "โลก", "lok", "world", "", "koː"],
        ["กอ", "kaw", "long aw, as in saw", "พอ", "pho", "enough", "", "kɔː"],
        ["เกอ", "koe", "long oe, like the u in fur without the r", "เธอ", "thoe", "you, she", "", "kɤː"],
        ["เกีย", "kia", "ia, as in Mia", "เรียน", "rian", "to study", "", "kia"],
        ["เกือ", "kuea", "uea: ue gliding to a", "เรือ", "ruea", "boat", "", "kɯa"],
        ["กัว", "kua", "ua, as in the oo-a of truer", "วัว", "wua", "cow", "", "kua"],
        ["ไก", "kai", "ai, as in Thai; the common way to write it", "ไฟ", "fai", "fire", "", "kaj"],
        ["ใก", "kai", "ai again; used in only about twenty words", "ใจ", "chai", "heart, mind", "", "kaj"],
        ["เกา", "kao", "ao, as in how", "เขา", "khao", "he, she; mountain", "", "kaw"],
        ["กำ", "kam", "am: a short a with an m", "น้ำ", "nam", "water", "", "kam"],
      ],
    },
    {
      title: "Tone marks",
      group: "Tones",
      note: "Four marks sit above the consonant (above the vowel too, if it has one on top). With a middle-class consonant like ก each mark gives one tone; with the other classes the same mark can mean a different tone.",
      chars: [
        ["ก่า", "kàa", "mai ek ่: low tone with a middle-class letter", "ไก่", "kai", "chicken", "", "kàː"],
        ["ก้า", "kâa", "mai tho ้: falling tone with a middle-class letter", "บ้าน", "ban", "house", "", "kâː"],
        ["ก๊า", "káa", "mai tri ๊: high tone; used only on middle-class letters", "โต๊ะ", "to", "table", "", "káː"],
        ["ก๋า", "kǎa", "mai chattawa ๋: rising tone; used only on middle-class letters", "ตั๋ว", "tua", "ticket", "", "kǎː"],
      ],
    },
  ],
  articles: [
    {
      title: "Three classes of consonants",
      body: `<p>Thai has five tones: mid, low, falling, high and rising. Spelling shows which one a syllable has, but not with one mark per tone. Instead it combines three things: the class of the first consonant (middle, high or low), the tone mark if there is one, and whether the syllable ends in a vowel or a sound like m, n or ng (live), or in a short vowel or p, t, k (dead).</p>
<p>That is why Thai keeps several letters for the same sound: <span lang="th">ข</span> and <span lang="th">ค</span> are both kh, but one is high and one is low, so <span lang="th">ขา</span> (khǎa, leg) and <span lang="th">คา</span> (khaa, to be stuck) have different tones.</p>
<p>A good first step is to learn the nine middle-class letters by heart and the eleven high-class ones. Everything else is low.</p>`,
    },
    {
      title: "Vowels go all around",
      body: `<p>A Thai vowel can be written after the consonant (<span lang="th">กา</span>), above it (<span lang="th">กิ</span>), below it (<span lang="th">กุ</span>), before it (<span lang="th">เก</span>) or in several of those places at once (<span lang="th">เกีย</span>). The consonant is always said first, so you read <span lang="th">เก</span> as kee even though the vowel comes first on the page.</p>
<p>A syllable with no vowel written between two consonants has a hidden short o or a: <span lang="th">คน</span> is khon, person.</p>`,
    },
    {
      title: "No spaces between words",
      body: `<p>Thai is written without spaces between words. A space marks the end of a phrase or sentence, a little like a comma or full stop. Readers find the word breaks from the shapes of syllables: a vowel that is written first, like <span lang="th">เ</span> or <span lang="th">ไ</span>, often starts a new syllable.</p>
<p>At the end of a syllable many letters lose their own sound: only k, t, p, m, n, ng, w and y are heard. <span lang="th">ท</span>, <span lang="th">ศ</span> and <span lang="th">ษ</span> all end in t, so <span lang="th">บาท</span> (baht), <span lang="th">อากาศ</span> (akat, weather) and <span lang="th">พิเศษ</span> (phiset, special) all end the same way.</p>`,
    },
  ],
});
