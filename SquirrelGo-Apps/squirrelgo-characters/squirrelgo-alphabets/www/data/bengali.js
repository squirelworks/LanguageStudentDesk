// Bengali (Bangla) for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization, meaning, text to speak, IPA].
// Romanization follows everyday Bangla spelling in Latin letters. Hints, groupings and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "bengali",
  title: "Bengali",
  native: "বাংলা",
  lang: "bn-BD",
  langName: "Bengali",
  font: '"Noto Sans Bengali", "Kohinoor Bangla", "Vrinda", "Nirmala UI", sans-serif',
  blurb: "The script for Bangla and Assamese. Consonants carry a built-in o, and letters hang from a headline.",
  writeTip: "Write the letter body first, then the headline (matra) across the top. A few letters, like এ and ঐ, have only part of a headline or none.",
  lessons: [
    {
      title: "Vowels",
      note: "Full vowel letters are used at the start of a word or after another vowel. Bangla does not keep long and short vowels apart: ই and ঈ sound the same.",
      group: "Vowels",
      cols: 4,
      chars: [
        ["অ", "o", "o as in British hot, mouth open", "অজগর", "ojogor", "python", "", "ɔ"],
        ["আ", "a", "a as in father", "আম", "am", "mango", "", "a"],
        ["ই", "i", "ee as in see", "ইঁদুর", "idur", "mouse", "", "i"],
        ["ঈ", "i", "the same ee, the 'long' letter", "ঈগল", "igol", "eagle", "", "i"],
        ["উ", "u", "oo as in food", "উট", "ut", "camel", "", "u"],
        ["ঊ", "u", "the same oo, the 'long' letter", "ঊষা", "usha", "dawn", "", "u"],
        ["ঋ", "ri", "said ri", "ঋষি", "rishi", "sage", "", "ri"],
        ["এ", "e", "e as in bed or a as in bat", "এক", "ek", "one", "", "e"],
        ["ঐ", "oi", "oi as in oil", "ঐক্য", "oikko", "unity", "", "oi"],
        ["ও", "o", "o as in go, without the glide", "ওজন", "ojon", "weight", "", "o"],
        ["ঔ", "ou", "o then u, one syllable", "ঔষধ", "oushodh", "medicine", "", "ou"],
      ],
    },
    {
      title: "Vowel signs on ক",
      note: "After a consonant, a vowel is written as a sign (kar) around it. ি, ে and ৈ are written before the consonant but said after it.",
      group: "Vowel signs",
      cols: 4,
      chars: [
        ["কা", "ka", "া: a", "কাক", "kak", "crow", "", "ka"],
        ["কি", "ki", "ি: i, written first", "কিশমিশ", "kishmish", "raisin", "", "ki"],
        ["কী", "ki", "ী: the long i sign", "কী", "ki", "what", "", "ki"],
        ["কু", "ku", "ু: u, hangs below", "কুকুর", "kukur", "dog", "", "ku"],
        ["কূ", "ku", "ূ: the long u sign", "কূল", "kul", "shore", "", "ku"],
        ["কৃ", "kri", "ৃ: ri", "কৃষক", "krishok", "farmer", "", "kri"],
        ["কে", "ke", "ে: e, written first", "কেক", "kek", "cake", "", "ke"],
        ["কৈ", "koi", "ৈ: oi, written first", "কৈশোর", "koishor", "adolescence", "", "koi"],
        ["কো", "ko", "ো: o, on both sides", "কোকিল", "kokil", "cuckoo", "", "ko"],
        ["কৌ", "kou", "ৌ: ou, on both sides", "কৌটা", "kouta", "small tin box", "", "kou"],
        ["ক্", "k", "্: hasanta, removes the built-in o", "", "", "", "", "k"],
      ],
    },
    {
      title: "Velar consonants (back of the mouth)",
      note: "Each row of five follows the same pattern: plain, aspirated, voiced, voiced aspirated, nasal.",
      group: "Consonants",
      chars: [
        ["ক", "ko", "k, no puff of air", "কলা", "kola", "banana", "", "kɔ"],
        ["খ", "kho", "k with a puff of air", "খরগোশ", "khorgosh", "rabbit", "", "kʰɔ"],
        ["গ", "go", "g", "গরু", "goru", "cow", "", "ɡɔ"],
        ["ঘ", "gho", "g with a breathy release", "ঘর", "ghor", "room, house", "", "ɡʱɔ"],
        ["ঙ", "ngo", "ng; never starts a word", "ব্যাঙ", "byang", "frog", "", "ŋɔ"],
      ],
    },
    {
      title: "Palatal consonants",
      group: "Consonants",
      chars: [
        ["চ", "cho", "ch, no puff of air", "চা", "cha", "tea", "", "tʃɔ"],
        ["ছ", "chho", "ch with a puff of air", "ছাতা", "chhata", "umbrella", "", "tʃʰɔ"],
        ["জ", "jo", "j", "জল", "jol", "water", "", "dʒɔ"],
        ["ঝ", "jho", "j with a breathy release", "ঝড়", "jhor", "storm", "", "dʒʱɔ"],
        ["ঞ", "nyo", "a nasal, mostly inside conjuncts", "", "", "", "", "nɔ"],
      ],
    },
    {
      title: "Retroflex consonants",
      note: "Curl the tongue tip back. ণ is said just like ন today but is still spelled differently.",
      group: "Consonants",
      chars: [
        ["ট", "ṭo", "t with the tongue curled back", "টমেটো", "ṭomeṭo", "tomato", "", "ʈɔ"],
        ["ঠ", "ṭho", "curled-back t with a puff of air", "ঠোঁট", "ṭhõṭ", "lips", "", "ʈʰɔ"],
        ["ড", "ḍo", "d with the tongue curled back", "ডাল", "ḍal", "lentils", "", "ɖɔ"],
        ["ঢ", "ḍho", "curled-back d, breathy", "ঢোল", "ḍhol", "barrel drum", "", "ɖʱɔ"],
        ["ণ", "ṇo", "said n", "হরিণ", "horin", "deer", "", "nɔ"],
      ],
    },
    {
      title: "Dental consonants",
      note: "Tongue tip against the back of the upper teeth: softer than English t and d.",
      group: "Consonants",
      chars: [
        ["ত", "to", "t with the tongue on the teeth", "তাল", "tal", "palm fruit", "", "t̪ɔ"],
        ["থ", "tho", "dental t with a puff of air (not th as in thin)", "থালা", "thala", "plate", "", "t̪ʰɔ"],
        ["দ", "do", "d with the tongue on the teeth", "দই", "doi", "yogurt", "", "d̪ɔ"],
        ["ধ", "dho", "dental d, breathy", "ধান", "dhan", "rice plant", "", "d̪ʱɔ"],
        ["ন", "no", "n", "নদী", "nodi", "river", "", "nɔ"],
      ],
    },
    {
      title: "Labial consonants (lips)",
      group: "Consonants",
      chars: [
        ["প", "po", "p, no puff of air", "পাখি", "pakhi", "bird", "", "pɔ"],
        ["ফ", "pho", "p with a puff of air; often said f", "ফল", "phol", "fruit", "", "pʰɔ"],
        ["ব", "bo", "b", "বই", "boi", "book", "", "bɔ"],
        ["ভ", "bho", "b with a breathy release; often said v", "ভালুক", "bhaluk", "bear", "", "bʱɔ"],
        ["ম", "mo", "m", "মাছ", "machh", "fish", "", "mɔ"],
      ],
    },
    {
      title: "Other consonants",
      note: "Bangla has three letters for s, and most of the time all three are said sh.",
      group: "More consonants",
      cols: 4,
      chars: [
        ["য", "jo", "said j, like জ", "যখন", "jokhon", "when", "", "dʒɔ"],
        ["র", "ro", "a tapped r", "রাজা", "raja", "king", "", "ɾɔ"],
        ["ল", "lo", "l", "লাল", "lal", "red", "", "lɔ"],
        ["শ", "sho", "sh", "শাপলা", "shapla", "water lily", "", "ʃɔ"],
        ["ষ", "sho", "also sh", "ষাঁড়", "shãṛ", "bull", "", "ʃɔ"],
        ["স", "so", "usually sh too; s before t, n, r, l", "সাপ", "shap", "snake", "", "ʃɔ"],
        ["হ", "ho", "h", "হাতি", "hati", "elephant", "", "ɦɔ"],
      ],
    },
    {
      title: "Special letters and signs",
      note: "Two flapped sounds marked with a dot, a y that only appears after a vowel, a t with no vowel, and three signs that sit on a letter.",
      group: "More consonants",
      cols: 4,
      chars: [
        ["ড়", "ṛo", "a flap: curl the tongue back and flick it forward", "পাহাড়", "pahaṛ", "hill", "", "ɽɔ"],
        ["ঢ়", "ṛho", "the same flap; rare", "আষাঢ়", "ashaṛh", "a rainy-season month", "", "ɽɔ"],
        ["য়", "yo", "a light y between vowels", "বিয়ে", "biye", "wedding", "", "jɔ"],
        ["ৎ", "t", "khanda to: a t with no vowel after it", "হঠাৎ", "hoṭhat", "suddenly", "", "t̪"],
        ["কং", "kong", "ং anusvara: ng after a vowel", "রং", "rong", "color", "", "kɔŋ"],
        ["কঃ", "koh", "ঃ bisorgo: doubles the next consonant or adds h", "দুঃখ", "dukkho", "sorrow", "", "kɔh"],
        ["কাঁ", "kã", "ঁ chandrabindu: makes the vowel nasal", "চাঁদ", "chãd", "moon", "", "kã"],
      ],
    },
  ],
  articles: [
    {
      title: "How Bengali script works",
      body: `<p>Like Devanagari, the Bengali script is an <i>abugida</i>: every consonant letter already carries a vowel. In Bangla that vowel is a rounded o, so <span lang="bn">ক</span> is ko. Other vowels are written with signs attached to the consonant, and the hasanta (<span lang="bn">ক্</span>) removes the vowel entirely.</p>
<p>Most letters hang from a headline, the <i>matra</i>, which joins up across a word: <span lang="bn">বাংলা</span>. Some letters, like <span lang="bn">এ ঐ ও ঔ ঙ ঞ ৎ</span>, have no headline, and a few have only half of one.</p>
<p>The consonants come in the same rows of five as Devanagari, from the throat to the lips. If you already read Hindi, many letters will look like cousins.</p>`,
    },
    {
      title: "The disappearing o",
      body: `<p>The built-in o is often not said, especially at the end of a word. The spelling does not tell you; you learn it word by word.</p>
<table>
<tr><td lang="bn">কলম</td><td>ko-lo-mo on paper, said kolom (pen)</td></tr>
<tr><td lang="bn">বাংলা</td><td>said bangla, with no vowel after ং</td></tr>
</table>
<p>Sometimes the vowel is said o rather than ɔ, as in the first syllable of <span lang="bn">কলম</span>. The recordings follow the usual pronunciation.</p>`,
    },
    {
      title: "Conjunct letters (juktakkhor)",
      body: `<p>Two consonants with no vowel between them are fused into one shape, often stacked one on top of the other:</p>
<table>
<tr><td lang="bn">ক্ + ষ = ক্ষ</td><td>said kh, as in <span lang="bn">ক্ষমা</span> (forgiveness)</td></tr>
<tr><td lang="bn">ন্ + ত = ন্ত</td><td>nt</td></tr>
<tr><td lang="bn">জ্ + ঞ = জ্ঞ</td><td>said gg, as in <span lang="bn">জ্ঞান</span> (knowledge)</td></tr>
</table>
<p>A য after a consonant becomes the small hook <span lang="bn">্য</span> and usually doubles the consonant or changes the vowel: <span lang="bn">ব্যাঙ</span> is byang. A র before a consonant becomes a small stroke on top (<span lang="bn">র্ক</span>), and after one it becomes a small mark below (<span lang="bn">প্র</span>).</p>`,
    },
    {
      title: "Bengali digits",
      body: `<p>Bangla has its own digits, still used everywhere from prices to page numbers:</p>
<table>
<tr><td lang="bn">০ ১ ২ ৩ ৪</td><td>0 1 2 3 4</td></tr>
<tr><td lang="bn">৫ ৬ ৭ ৮ ৯</td><td>5 6 7 8 9</td></tr>
</table>
<p>Watch out for <span lang="bn">৪</span>, which is 4 even though it looks like an 8.</p>`,
    },
  ],
});
