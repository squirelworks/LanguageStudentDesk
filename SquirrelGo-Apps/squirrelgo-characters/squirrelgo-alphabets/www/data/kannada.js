// Kannada for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization, meaning, text to speak, IPA].
// Romanization is a simplified ISO 15919. Hints, groupings and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "kannada",
  title: "Kannada",
  native: "ಕನ್ನಡ",
  lang: "kn-IN",
  langName: "Kannada",
  font: '"Noto Sans Kannada", "Kannada Sangam MN", "Tunga", "Nirmala UI", sans-serif',
  blurb: "The script for Kannada, a close sister of Telugu. Letters sit under a flat cap and almost every word ends in a vowel.",
  writeTip: "Write the round body first, then the flat cap (talakattu) on top. Vowel signs replace the cap or attach on the right.",
  lessons: [
    {
      title: "Vowels",
      note: "Kannada keeps short and long vowels apart, including e and o.",
      group: "Vowels",
      cols: 4,
      chars: [
        ["ಅ", "a", "short a, like u in but", "ಅಮ್ಮ", "amma", "mother", "", "a"],
        ["ಆ", "ā", "long a, as in father", "ಆನೆ", "āne", "elephant", "", "aː"],
        ["ಇ", "i", "short i, as in bit", "ಇಲಿ", "ili", "rat", "", "i"],
        ["ಈ", "ī", "long ee, as in see", "ಈಜು", "īju", "swimming", "", "iː"],
        ["ಉ", "u", "short u, as in put", "ಉಪ್ಪು", "uppu", "salt", "", "u"],
        ["ಊ", "ū", "long oo, as in food", "ಊಟ", "ūṭa", "meal", "", "uː"],
        ["ಋ", "ru", "said ru", "ಋಷಿ", "ruṣi", "sage", "", "ru"],
        ["ಎ", "e", "short e, as in bed", "ಎಲೆ", "ele", "leaf", "", "e"],
        ["ಏ", "ē", "long e, as in hey without the glide", "ಏಣಿ", "ēṇi", "ladder", "", "eː"],
        ["ಐ", "ai", "ai as in aisle", "ಐದು", "aidu", "five", "", "ai"],
        ["ಒ", "o", "short o", "ಒಂಟೆ", "oṇṭe", "camel", "", "o"],
        ["ಓ", "ō", "long o, as in go without the glide", "ಓದು", "ōdu", "read", "", "oː"],
        ["ಔ", "au", "ow as in cow", "ಔಷಧ", "auṣadha", "medicine", "", "au"],
        ["ಅಂ", "aṁ", "anusvara: a nasal n or m sound", "ಅಂಗಡಿ", "aṅgaḍi", "shop", "", "am"],
      ],
    },
    {
      title: "Vowel signs on ಕ",
      note: "The vowel sign takes the place of the cap or attaches on the right. ೆ, ೇ and ೈ hook onto the right side.",
      group: "Vowel signs",
      cols: 4,
      chars: [
        ["ಕಾ", "kā", "ಾ: long ā", "ಕಾಗೆ", "kāge", "crow", "", "kaː"],
        ["ಕಿ", "ki", "ಿ: i, a curl on top", "ಕಿಟಕಿ", "kiṭaki", "window", "", "ki"],
        ["ಕೀ", "kī", "ೀ: ī, a curl plus a hook", "ಕೀಲಿ", "kīli", "key", "", "kiː"],
        ["ಕು", "ku", "ು: u, a hook on the right", "ಕುರಿ", "kuri", "sheep", "", "ku"],
        ["ಕೂ", "kū", "ೂ: ū, a double hook", "ಕೂದಲು", "kūdalu", "hair", "", "kuː"],
        ["ಕೃ", "kru", "ೃ: ru", "ಕೃಷಿ", "kruṣi", "farming", "", "kru"],
        ["ಕೆ", "ke", "ೆ: short e", "ಕೆರೆ", "kere", "lake", "", "ke"],
        ["ಕೇ", "kē", "ೇ: long ē", "ಕೇಳು", "kēḷu", "listen, ask", "", "keː"],
        ["ಕೈ", "kai", "ೈ: ai", "ಕೈ", "kai", "hand", "", "kai"],
        ["ಕೊ", "ko", "ೊ: short o", "ಕೊಡೆ", "koḍe", "umbrella", "", "ko"],
        ["ಕೋ", "kō", "ೋ: long ō", "ಕೋತಿ", "kōti", "monkey", "", "koː"],
        ["ಕೌ", "kau", "ೌ: au", "ಕೌತುಕ", "kautuka", "wonder", "", "kau"],
        ["ಕ್", "k", "್ halant: removes the built-in a", "", "", "", "", "k"],
      ],
    },
    {
      title: "Velar consonants (back of the mouth)",
      note: "Each row of five follows the same pattern: plain, aspirated, voiced, voiced aspirated, nasal. The aspirated letters are mostly used in words from Sanskrit.",
      group: "Consonants",
      chars: [
        ["ಕ", "ka", "k, no puff of air", "ಕಮಲ", "kamala", "lotus", "", "ka"],
        ["ಖ", "kha", "k with a puff of air", "ಖಡ್ಗ", "khaḍga", "sword", "", "kʰa"],
        ["ಗ", "ga", "g", "ಗಡಿಯಾರ", "gaḍiyāra", "clock", "", "ɡa"],
        ["ಘ", "gha", "g with a breathy release", "ಘಂಟೆ", "ghaṇṭe", "bell", "", "ɡʱa"],
        ["ಙ", "ṅa", "ng; very rare", "", "", "", "", "ŋa"],
      ],
    },
    {
      title: "Palatal consonants",
      group: "Consonants",
      chars: [
        ["ಚ", "ca", "ch, no puff of air", "ಚಮಚ", "camaca", "spoon", "", "tʃa"],
        ["ಛ", "cha", "ch with a puff of air", "ಛತ್ರಿ", "chatri", "umbrella", "", "tʃʰa"],
        ["ಜ", "ja", "j", "ಜೇನು", "jēnu", "honey", "", "dʒa"],
        ["ಝ", "jha", "j with a breathy release", "ಝರಿ", "jhari", "stream", "", "dʒʱa"],
        ["ಞ", "ña", "ny; very rare", "", "", "", "", "ɲa"],
      ],
    },
    {
      title: "Retroflex consonants",
      note: "Curl the tongue tip back and touch the roof of the mouth.",
      group: "Consonants",
      chars: [
        ["ಟ", "ṭa", "t with the tongue curled back", "ಟಗರು", "ṭagaru", "ram", "", "ʈa"],
        ["ಠ", "ṭha", "curled-back t with a puff of air", "ಕಂಠ", "kaṇṭha", "throat", "", "ʈʰa"],
        ["ಡ", "ḍa", "d with the tongue curled back", "ಡಬ್ಬ", "ḍabba", "box", "", "ɖa"],
        ["ಢ", "ḍha", "curled-back d, breathy; rare", "", "", "", "", "ɖʱa"],
        ["ಣ", "ṇa", "n with the tongue curled back", "ಬಾಣ", "bāṇa", "arrow", "", "ɳa"],
      ],
    },
    {
      title: "Dental consonants",
      note: "Tongue tip against the back of the upper teeth: softer than English t and d.",
      group: "Consonants",
      chars: [
        ["ತ", "ta", "t with the tongue on the teeth", "ತಲೆ", "tale", "head", "", "t̪a"],
        ["ಥ", "tha", "dental t with a puff of air (not th as in thin)", "ರಥ", "ratha", "chariot", "", "t̪ʰa"],
        ["ದ", "da", "d with the tongue on the teeth", "ದನ", "dana", "cattle", "", "d̪a"],
        ["ಧ", "dha", "dental d, breathy", "ಧ್ವಜ", "dhvaja", "flag", "", "d̪ʱa"],
        ["ನ", "na", "n", "ನವಿಲು", "navilu", "peacock", "", "na"],
      ],
    },
    {
      title: "Labial consonants (lips)",
      group: "Consonants",
      chars: [
        ["ಪ", "pa", "p, no puff of air", "ಪುಸ್ತಕ", "pustaka", "book", "", "pa"],
        ["ಫ", "pha", "p with a puff of air; often said f", "ಫಲ", "phala", "fruit", "", "pʰa"],
        ["ಬ", "ba", "b", "ಬಾಳೆ", "bāḷe", "banana", "", "ba"],
        ["ಭ", "bha", "b with a breathy release", "ಭೂಮಿ", "bhūmi", "earth", "", "bʱa"],
        ["ಮ", "ma", "m", "ಮರ", "mara", "tree", "", "ma"],
      ],
    },
    {
      title: "Semivowels, sibilants and h",
      group: "More consonants",
      cols: 4,
      chars: [
        ["ಯ", "ya", "y", "ಯಂತ್ರ", "yantra", "machine", "", "ja"],
        ["ರ", "ra", "a tapped r", "ರಾಜ", "rāja", "king", "", "ɾa"],
        ["ಲ", "la", "l", "ಲಡ್ಡು", "laḍḍu", "laddu (a sweet)", "", "la"],
        ["ವ", "va", "between v and w", "ವೀಣೆ", "vīṇe", "veena (a lute)", "", "ʋa"],
        ["ಶ", "śa", "sh", "ಶಂಖ", "śaṅkha", "conch shell", "", "ʃa"],
        ["ಷ", "ṣa", "sh with the tongue curled back", "", "", "", "", "ʂa"],
        ["ಸ", "sa", "s", "ಸಿಂಹ", "siṁha", "lion", "", "sa"],
        ["ಹ", "ha", "h", "ಹಸು", "hasu", "cow", "", "ɦa"],
      ],
    },
    {
      title: "Special letters",
      group: "More consonants",
      cols: 2,
      chars: [
        ["ಳ", "ḷa", "l with the tongue curled back", "ಬಳೆ", "baḷe", "bangle", "", "ɭa"],
        ["ಕ್ಷ", "kṣa", "k + sh", "ಕ್ಷಮೆ", "kṣame", "forgiveness", "", "kʃa"],
      ],
    },
  ],
  articles: [
    {
      title: "Kannada and Telugu",
      body: `<p>Kannada and Telugu grew from the same parent script and separated only around the 1300s. Many letters are still close: compare Kannada <span lang="kn">ಕ ಮ ವ</span> with Telugu <span lang="te">క మ వ</span>. If you learn one, the other comes quickly.</p>
<p>The clearest difference is the cap. Telugu letters wear a tick (✓) on top, Kannada letters a flatter, hooked bar.</p>`,
    },
    {
      title: "Second forms (ottakshara)",
      body: `<p>When two consonants meet with no vowel between them, the second is written small, under the first. These are called <i>ottakshara</i>:</p>
<table>
<tr><td lang="kn">ಮ್ + ಮ = ಮ್ಮ</td><td>mma, as in <span lang="kn">ಅಮ್ಮ</span> (mother)</td></tr>
<tr><td lang="kn">ಪ್ + ಪ = ಪ್ಪ</td><td>ppa, as in <span lang="kn">ಉಪ್ಪು</span> (salt)</td></tr>
<tr><td lang="kn">ಸ್ + ತ = ಸ್ತ</td><td>sta, as in <span lang="kn">ಪುಸ್ತಕ</span> (book)</td></tr>
</table>
<p>The subscript usually looks like the full letter without its cap. ರ is the odd one out: before another consonant it is written after it, as a small mark on the right (<span lang="kn">ಧರ್ಮ</span>).</p>`,
    },
    {
      title: "Kannada digits",
      body: `<p>Kannada has its own digits, <span lang="kn">೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯</span>, seen on number plates and official signs in Karnataka, though international digits are more common.</p>`,
    },
  ],
});
