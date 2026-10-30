// Gujarati for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization, meaning, text to speak, IPA].
// Romanization is a simplified IAST. Hints, groupings and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "gujarati",
  title: "Gujarati",
  native: "ગુજરાતી",
  lang: "gu-IN",
  langName: "Gujarati",
  font: '"Noto Sans Gujarati", "Gujarati Sangam MN", "Shruti", "Nirmala UI", sans-serif',
  blurb: "A rounder cousin of Devanagari with no headline. Consonants carry a built-in a.",
  writeTip: "Gujarati has no headline: write each letter on its own, top first. Vowel signs go on after the consonant, even િ, which sits before it.",
  lessons: [
    {
      title: "Vowels",
      note: "These full vowel letters are used at the start of a word or after another vowel. Many are અ with a sign added.",
      group: "Vowels",
      cols: 4,
      chars: [
        ["અ", "a", "short a, like u in but", "અનાનસ", "anānas", "pineapple", "", "ə"],
        ["આ", "ā", "a as in father", "આંબો", "āmbo", "mango tree", "", "ɑ"],
        ["ઇ", "i", "i as in bit", "ઇમારત", "imārat", "building", "", "i"],
        ["ઈ", "ī", "ee as in see; in speech much like ઇ", "ઈંડું", "īṇḍuṁ", "egg", "", "i"],
        ["ઉ", "u", "u as in put", "ઉંદર", "undar", "mouse", "", "u"],
        ["ઊ", "ū", "oo as in food; in speech much like ઉ", "ઊન", "ūn", "wool", "", "u"],
        ["ઋ", "ru", "said ru", "ઋષિ", "ruṣi", "sage", "", "ru"],
        ["એ", "e", "e as in hey, or e as in bed", "એક", "ek", "one", "", "e"],
        ["ઐ", "ai", "a as in bat, or ai", "ઐતિહાસિક", "aitihāsik", "historic", "", "ɛ"],
        ["ઓ", "o", "o as in go, or aw as in saw", "ઓશીકું", "oshīkuṁ", "pillow", "", "o"],
        ["ઔ", "au", "aw as in saw, or au", "ઔષધ", "auṣadh", "medicine", "", "ɔ"],
        ["અં", "aṁ", "anusvara: nasal n or m sound after a vowel", "અંગૂઠો", "aṅgūṭho", "thumb", "", "əŋ"],
      ],
    },
    {
      title: "Vowel signs on ક",
      note: "After a consonant, a vowel is written as a sign attached to it. િ is written before the consonant but said after it.",
      group: "Vowel signs",
      cols: 4,
      chars: [
        ["કા", "kā", "ા: ā", "કાગડો", "kāgḍo", "crow", "", "kɑ"],
        ["કિ", "ki", "િ: i, written first", "કિલ્લો", "killo", "fort", "", "ki"],
        ["કી", "kī", "ી: the long i sign", "કીડી", "kīḍī", "ant", "", "ki"],
        ["કુ", "ku", "ુ: u, hangs below", "કુદરત", "kudrat", "nature", "", "ku"],
        ["કૂ", "kū", "ૂ: the long u sign", "કૂતરો", "kūtro", "dog", "", "ku"],
        ["કૃ", "kṛ", "ૃ: ru", "કૃપા", "kṛpā", "grace, kindness", "", "kru"],
        ["કે", "ke", "ે: e", "કેળું", "keḷuṁ", "banana", "", "ke"],
        ["કૈ", "kai", "ૈ: ai", "કૈલાસ", "kailās", "Mount Kailash", "", "kɛ"],
        ["કો", "ko", "ો: o", "કોયલ", "koyal", "cuckoo", "", "ko"],
        ["કૌ", "kau", "ૌ: au", "કૌશલ", "kauśal", "skill", "", "kɔ"],
        ["કં", "kaṁ", "ં: nasal", "", "", "", "", "kəŋ"],
        ["ક્", "k", "્: halant, removes the built-in a", "", "", "", "", "k"],
      ],
    },
    {
      title: "Velar consonants (back of the mouth)",
      note: "Each row of five follows the same pattern: plain, aspirated, voiced, voiced aspirated, nasal.",
      group: "Consonants",
      chars: [
        ["ક", "ka", "k, no puff of air", "કમળ", "kamaḷ", "lotus", "", "kə"],
        ["ખ", "kha", "k with a puff of air", "ખુરશી", "khurśī", "chair", "", "kʰə"],
        ["ગ", "ga", "g", "ગાય", "gāy", "cow", "", "ɡə"],
        ["ઘ", "gha", "g with a breathy release", "ઘર", "ghar", "house", "", "ɡʱə"],
        ["ઙ", "ṅa", "ng; only inside words", "", "", "", "", "ŋə"],
      ],
    },
    {
      title: "Palatal consonants",
      group: "Consonants",
      chars: [
        ["ચ", "ca", "ch, no puff of air", "ચા", "cā", "tea", "", "tʃə"],
        ["છ", "cha", "ch with a puff of air", "છત્રી", "chatrī", "umbrella", "", "tʃʰə"],
        ["જ", "ja", "j", "જહાજ", "jahāj", "ship", "", "dʒə"],
        ["ઝ", "jha", "j with a breathy release; often said z", "ઝાડ", "jhāḍ", "tree", "", "dʒʱə"],
        ["ઞ", "ña", "ny; rare", "", "", "", "", "ɲə"],
      ],
    },
    {
      title: "Retroflex consonants",
      note: "Curl the tongue tip back and touch the roof of the mouth.",
      group: "Consonants",
      chars: [
        ["ટ", "ṭa", "t with the tongue curled back", "ટામેટું", "ṭāmeṭuṁ", "tomato", "", "ʈə"],
        ["ઠ", "ṭha", "curled-back t with a puff of air", "ઠંડી", "ṭhaṇḍī", "cold weather", "", "ʈʰə"],
        ["ડ", "ḍa", "d with the tongue curled back", "ડબ્બો", "ḍabbo", "box", "", "ɖə"],
        ["ઢ", "ḍha", "curled-back d, breathy", "ઢોલ", "ḍhol", "barrel drum", "", "ɖʱə"],
        ["ણ", "ṇa", "n with the tongue curled back", "પાણી", "pāṇī", "water", "", "ɳə"],
      ],
    },
    {
      title: "Dental consonants",
      note: "Tongue tip against the back of the upper teeth: softer than English t and d.",
      group: "Consonants",
      chars: [
        ["ત", "ta", "t with the tongue on the teeth", "તરબૂચ", "tarbūc", "watermelon", "", "t̪ə"],
        ["થ", "tha", "dental t with a puff of air (not th as in thin)", "થાળી", "thāḷī", "plate", "", "t̪ʰə"],
        ["દ", "da", "d with the tongue on the teeth", "દવા", "davā", "medicine", "", "d̪ə"],
        ["ધ", "dha", "dental d, breathy", "ધજા", "dhajā", "flag", "", "d̪ʱə"],
        ["ન", "na", "n", "નળ", "naḷ", "tap", "", "nə"],
      ],
    },
    {
      title: "Labial consonants (lips)",
      group: "Consonants",
      chars: [
        ["પ", "pa", "p, no puff of air", "પતંગ", "pataṅg", "kite", "", "pə"],
        ["ફ", "pha", "p with a puff of air; often said f", "ફળ", "phaḷ", "fruit", "", "pʰə"],
        ["બ", "ba", "b", "બતક", "batak", "duck", "", "bə"],
        ["ભ", "bha", "b with a breathy release", "ભમરો", "bhamro", "bumblebee", "", "bʱə"],
        ["મ", "ma", "m", "માછલી", "māchlī", "fish", "", "mə"],
      ],
    },
    {
      title: "Semivowels and sibilants",
      group: "More consonants",
      cols: 4,
      chars: [
        ["ય", "ya", "y", "યાદ", "yād", "memory", "", "jə"],
        ["ર", "ra", "a tapped r", "રથ", "rath", "chariot", "", "ɾə"],
        ["લ", "la", "l", "લીંબુ", "līmbu", "lemon", "", "lə"],
        ["વ", "va", "between v and w", "વાઘ", "vāgh", "tiger", "", "ʋə"],
        ["શ", "śa", "sh", "શાક", "śāk", "cooked vegetables", "", "ʃə"],
        ["ષ", "ṣa", "sh; said like શ", "ષટ્કોણ", "ṣaṭkoṇ", "hexagon", "", "ʃə"],
        ["સ", "sa", "s", "સાપ", "sāp", "snake", "", "sə"],
        ["હ", "ha", "h, slightly breathy", "હાથી", "hāthī", "elephant", "", "ɦə"],
      ],
    },
    {
      title: "Special letters",
      note: "A retroflex l, and two conjuncts so common they are learned as letters.",
      group: "More consonants",
      cols: 3,
      chars: [
        ["ળ", "ḷa", "l with the tongue curled back", "બળદ", "baḷad", "bullock", "", "ɭə"],
        ["ક્ષ", "kṣa", "k + sh", "ક્ષમા", "kṣamā", "forgiveness", "", "kʃə"],
        ["જ્ઞ", "gna", "said gna in Gujarati", "જ્ઞાન", "gnān", "knowledge", "", "ɡnə"],
      ],
    },
  ],
  articles: [
    {
      title: "Devanagari without the line",
      body: `<p>Gujarati grew out of the same family as Devanagari, and most letters are rounder versions of their Hindi cousins with the headline taken off: compare Gujarati <span lang="gu">ક ગ મ</span> with Hindi <span lang="hi">क ग म</span>. The script was long used for bookkeeping and letters, where writing fast without a line mattered more than looking formal.</p>
<p>It works the same way: each consonant carries a short a, vowel signs attach to it, and the halant (<span lang="gu">ક્</span>) removes the vowel.</p>`,
    },
    {
      title: "Look-alikes to watch",
      body: `<p>Some pairs differ by one small stroke, and one letter looks like a digit:</p>
<table>
<tr><td lang="gu">ઘ ધ</td><td>gha and dha: the same pair is easy to confuse in Hindi too</td></tr>
<tr><td lang="gu">પ ષ</td><td>pa and ṣa: ષ adds a stroke across the middle</td></tr>
<tr><td lang="gu">ર ૨</td><td>the letter ra and the digit 2</td></tr>
</table>
<p>The chart puts the rows side by side so you can compare.</p>`,
    },
    {
      title: "Conjuncts and the half letter",
      body: `<p>When two consonants meet with no vowel between them, the first usually loses its vertical bar and leans on the second, just as in Hindi:</p>
<table>
<tr><td lang="gu">સ્ + ત = સ્ત</td><td>st, as in <span lang="gu">નમસ્તે</span></td></tr>
<tr><td lang="gu">પ્ + ય = પ્ય</td><td>py, as in <span lang="gu">પ્યાર</span> (love)</td></tr>
</table>
<p>Letters without a bar, like <span lang="gu">ડ ટ</span>, use the halant or stack instead: <span lang="gu">ડ્ડ</span>. A <span lang="gu">ર</span> before a consonant becomes a small hook on top, as in <span lang="gu">ધર્મ</span>.</p>`,
    },
    {
      title: "The silent a",
      body: `<p>Like Hindi, Gujarati drops the built-in a at the end of most words and often in the middle. <span lang="gu">કમળ</span> is written ka-ma-ḷa but said kamaḷ, and <span lang="gu">ઘર</span> is ghar.</p>`,
    },
  ],
});
