// The Greek alphabet (Modern Greek values) for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization,
// meaning, text to speak, IPA]. Hints, groupings and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "greek",
  title: "Greek",
  native: "Ελληνικά",
  lang: "el-GR",
  langName: "Greek",
  font: 'system-ui, "Segoe UI", Roboto, "Noto Sans", sans-serif',
  chartFlow: true,
  blurb: "The 24 letters of Greek, the letter pairs Modern Greek spells with, and the stress mark.",
  writeTip: "Write small letters without lifting the pen where you can: α, ο, σ and ω are each one smooth stroke.",
  lessons: [
    {
      title: "Look familiar, sound familiar",
      group: "Letters",
      note: "Eight letters you can read already.",
      chars: [
        ["Α α", "a", "a as in father", "αλάτι", "aláti", "salt", "α", "a"],
        ["Ε ε", "e", "e as in bed", "ένα", "éna", "one", "ε", "e"],
        ["Ι ι", "i", "ee as in see", "ιδέα", "idéa", "idea", "ι", "i"],
        ["Κ κ", "k", "k as in skip; before e and i it moves toward ky", "καφές", "kafés", "coffee", "κ", "k"],
        ["Μ μ", "m", "m", "μήλο", "mílo", "apple", "μ", "m"],
        ["Ο ο", "o", "o as in more, short", "όχι", "óchi", "no", "ο", "o"],
        ["Τ τ", "t", "t as in stop", "τώρα", "tóra", "now", "τ", "t"],
        ["Ζ ζ", "z", "z as in zoo", "ζάχαρη", "záchari", "sugar", "ζ", "z"],
      ],
    },
    {
      title: "False friends",
      group: "Letters",
      note: "They look like Latin letters but stand for other sounds.",
      chars: [
        ["Β β", "v", "v as in van, never b", "βιβλίο", "vivlío", "book", "β", "v"],
        ["Η η", "i", "ee as in see, never h", "ήλιος", "ílios", "sun", "η", "i"],
        ["Ν ν", "n", "n as in no; the small letter looks like a v", "νερό", "neró", "water", "ν", "n"],
        ["Ρ ρ", "r", "a tapped r, never p", "ρύζι", "rízi", "rice", "ρ", "ɾ"],
        ["Υ υ", "y", "ee as in see; the small letter looks like a u", "ύπνος", "ípnos", "sleep", "υ", "i"],
        ["Χ χ", "ch", "ch as in Scottish loch; before e and i like a breathy h in huge", "χέρι", "chéri", "hand", "χ", "x"],
      ],
    },
    {
      title: "New shapes",
      group: "Letters",
      chars: [
        ["Γ γ", "g", "a soft gargled g; before e and i it sounds like y in yes", "γάλα", "gála", "milk", "γ", "ɣ"],
        ["Δ δ", "d", "th as in this", "δέντρο", "déntro", "tree", "δ", "ð"],
        ["Θ θ", "th", "th as in thin", "θάλασσα", "thálassa", "sea", "θ", "θ"],
        ["Λ λ", "l", "l as in let", "λεμόνι", "lemóni", "lemon", "λ", "l"],
        ["Ξ ξ", "x", "ks as in box", "ξύλο", "xýlo", "wood", "ξ", "ks"],
        ["Π π", "p", "p as in spin", "πατάτα", "patáta", "potato", "π", "p"],
        ["Σ σ ς", "s", "s as in sun; small σ inside a word, ς at the end", "σπίτι", "spíti", "house", "σ", "s"],
        ["Φ φ", "f", "f as in fan", "φως", "fos", "light", "φ", "f"],
        ["Ψ ψ", "ps", "ps as in lips", "ψωμί", "psomí", "bread", "ψ", "ps"],
        ["Ω ω", "o", "the same o as ο", "ώρα", "óra", "hour", "ω", "o"],
      ],
    },
    {
      title: "Vowel pairs",
      group: "Letter pairs",
      cols: 3,
      note: "Two vowel letters that make a single sound. Spelling keeps the old pairs; speech merged them long ago.",
      chars: [
        ["ΑΙ αι", "e", "e as in bed, like ε", "και", "ke", "and", "αι", "e"],
        ["ΕΙ ει", "i", "ee, like ι", "είμαι", "íme", "I am", "ει", "i"],
        ["ΟΙ οι", "i", "ee, like ι", "οικογένεια", "ikoyénia", "family", "οι", "i"],
        ["ΟΥ ου", "ou", "oo as in food", "ουρανός", "ouranós", "sky", "ου", "u"],
        ["ΑΥ αυ", "av / af", "av before vowels and soft consonants, af before hard ones", "αύριο", "ávrio", "tomorrow", "αυ", "av"],
        ["ΕΥ ευ", "ev / ef", "ev before vowels and soft consonants, ef before hard ones", "ευχαριστώ", "efcharistó", "thank you", "ευ", "ef"],
      ],
    },
    {
      title: "Consonant pairs",
      group: "Letter pairs",
      cols: 3,
      note: "Greek has no letters for b, d and hard g, so it spells them with pairs.",
      chars: [
        ["ΜΠ μπ", "b", "b at the start of a word; mb inside one", "μπάλα", "bála", "ball", "μπ", "b"],
        ["ΝΤ ντ", "d", "d at the start of a word; nd inside one", "ντομάτα", "domáta", "tomato", "ντ", "d"],
        ["ΓΚ γκ", "g", "g as in go at the start of a word; ng inside one", "γκαράζ", "garáz", "garage", "γκ", "ɡ"],
        ["ΓΓ γγ", "ng", "ng as in finger", "Αγγλία", "Anglía", "England", "γγ", "ŋɡ"],
        ["ΤΣ τσ", "ts", "ts as in cats", "τσάι", "tsái", "tea", "τσ", "ts"],
        ["ΤΖ τζ", "dz", "dz as in adze", "τζάμι", "dzámi", "window pane", "τζ", "dz"],
      ],
    },
  ],
  articles: [
    {
      title: "About the Greek alphabet",
      body: `<p>Greek has been written with this alphabet for about 2,800 years. The Greeks took the letters from the Phoenicians and made one big change: they used some letters for vowels. That made it the first alphabet with full vowels, and the parent of Latin, Cyrillic, Coptic and Gothic.</p>
<p>Mathematicians and scientists use the letters too, so you may already know π, Σ, Δ, λ and Ω.</p>
<p>This app teaches Modern Greek sounds. Ancient Greek was said differently (β was b, η was a long e), which is why English words from Greek do not always match.</p>`,
    },
    {
      title: "The stress mark",
      body: `<p>Every Greek word of two or more syllables carries an accent (<span lang="el">ά, έ, ή, ί, ό, ύ, ώ</span>) on its stressed vowel. It is part of the spelling and it can change the meaning:</p>
<table>
<tr><td lang="el">πότε</td><td>póte, when?</td></tr>
<tr><td lang="el">ποτέ</td><td>poté, never</td></tr>
</table>
<p>Two dots (<span lang="el">ϊ, ϋ</span>) mean the vowel is said on its own, not as part of a pair: <span lang="el">ρολόι</span> is ro-ló-i, clock.</p>
<p>Capital letters at the start of a word keep the accent at their upper left (<span lang="el">Ώρα</span>); text in all capitals drops it.</p>`,
    },
    {
      title: "Five ways to spell ee",
      body: `<p>The sound ee can be written <span lang="el">ι, η, υ, ει</span> or <span lang="el">οι</span>, and o can be <span lang="el">ο</span> or <span lang="el">ω</span>. Each spelling was once a different sound in Ancient Greek; they merged over the centuries, but spelling kept the old forms.</p>
<p>For reading this is good news: each of these always says ee. For writing it means learning which spelling a word uses. Grammar helps: many endings always use the same one, like <span lang="el">-η</span> for feminine nouns (<span lang="el">η αγάπη</span>, love) and <span lang="el">-ω</span> for the first person of verbs (<span lang="el">γράφω</span>, I write).</p>`,
    },
    {
      title: "Final sigma",
      body: `<p>Small sigma has two shapes. Inside a word it is <span lang="el">σ</span>; at the end of a word it is <span lang="el">ς</span>:</p>
<p lang="el">σεισμός</p>
<p>seismós, earthquake: the first two sigmas are σ, the last is ς. The capital is always Σ.</p>`,
    },
  ],
});
