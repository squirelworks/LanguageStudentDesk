// Meetei Mayek for SquirrelGo Alphabets, the script of Manipuri (Meitei).
// Each character is [letter, romanization, sound hint, example, example romanization,
// meaning, text to speak, IPA, example language, example IPA]. The example for each
// of the first eighteen letters is its own name. eSpeak NG has no Meitei voice, so
// the sounds are made from the IPA, without tones. Hints, groupings and articles
// are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "meetei",
  title: "Meetei Mayek",
  native: "ꯃꯤꯇꯩ ꯃꯌꯦꯛ",
  lang: "mni",
  langName: "Manipuri",
  audio: "ipa",
  voice: "hi",
  font: '"Noto Sans Meetei Mayek", "Nirmala UI", sans-serif',
  blurb: "The script of Manipur: 18 letters named after parts of the body, 9 borrowed letters, and final letters that close a syllable.",
  writeTip: "Start each letter at the top and draw the main body before any hook or tail. Final letters (lonsum) are short forms: keep them small.",
  lessons: [
    {
      title: "Iyek Ipee: the first nine",
      group: "Letters",
      cols: 3,
      note: "The eighteen original letters are each named after a part of the body. A letter carries a short a, so ꯀ alone is ka.",
      chars: [
        ["ꯀ", "k", "k; named kok, head", "ꯀꯣꯛ", "kok", "head", "", "k", "", "kok"],
        ["ꯁ", "s", "s; named sam, hair", "ꯁꯝ", "sam", "hair", "", "s", "", "səm"],
        ["ꯂ", "l", "l; named lai, forehead", "ꯂꯥꯏ", "lai", "forehead", "", "l", "", "lai"],
        ["ꯃ", "m", "m; named mit, eye", "ꯃꯤꯠ", "mit", "eye", "", "m", "", "mit"],
        ["ꯄ", "p", "p; named pa, eyelash", "ꯄꯥ", "pa", "eyelash", "", "p", "", "pa"],
        ["ꯅ", "n", "n; named na, ear", "ꯅꯥ", "na", "ear", "", "n", "", "na"],
        ["ꯆ", "ch", "ch; named chil", "ꯆꯤꯜ", "chil", "the letter's name", "", "tʃ", "", "tʃil"],
        ["ꯇ", "t", "t; named til", "ꯇꯤꯜ", "til", "the letter's name", "", "t", "", "til"],
        ["ꯈ", "kh", "k with a puff of air; named khou, throat", "ꯈꯧ", "khou", "throat", "", "kʰ", "", "kʰəu"],
      ],
    },
    {
      title: "Iyek Ipee: the second nine",
      group: "Letters",
      cols: 3,
      note: "ꯎ and ꯏ are the vowels u and i, and ꯑ carries any vowel at the start of a word.",
      chars: [
        ["ꯉ", "ng", "ng as in sing; named ngou", "ꯉꯧ", "ngou", "the letter's name", "", "ŋ", "", "ŋəu"],
        ["ꯊ", "th", "t with a puff of air; named thou, chest", "ꯊꯧ", "thou", "chest", "", "tʰ", "", "tʰəu"],
        ["ꯋ", "w", "w; named wai, navel", "ꯋꯥꯏ", "wai", "navel", "", "w", "", "wai"],
        ["ꯌ", "y", "y as in yes; named yang", "ꯌꯥꯡ", "yang", "the letter's name", "", "j", "", "jaŋ"],
        ["ꯍ", "h", "h; named huk", "ꯍꯨꯛ", "huk", "the letter's name", "", "h", "", "huk"],
        ["ꯎ", "u", "oo as in food; named un, skin", "ꯎꯟ", "un", "skin", "", "u", "", "un"],
        ["ꯏ", "i", "ee as in see; named ee, blood", "ꯏ", "ee", "blood", "", "i", "", "i"],
        ["ꯐ", "ph", "p with a puff of air; named pham", "ꯐꯝ", "pham", "the letter's name", "", "pʰ", "", "pʰəm"],
        ["ꯑ", "a", "a vowel carrier, said a; named atiya, sky", "ꯑꯇꯤꯌꯥ", "atiya", "sky", "", "ə", "", "ətija"],
      ],
    },
    {
      title: "Lom Eeyek: borrowed letters",
      group: "Letters",
      cols: 3,
      note: "Nine letters for voiced and breathy sounds, used mostly in words from Sanskrit, Bengali and English.",
      chars: [
        ["ꯒ", "g", "g as in go; named gok", "", "", "", "", "ɡ", "", ""],
        ["ꯓ", "jh", "j with a breathy release; named jham", "", "", "", "", "dʒʱ", "", ""],
        ["ꯔ", "r", "r; named rai", "", "", "", "", "r", "", ""],
        ["ꯕ", "b", "b; named ba", "", "", "", "", "b", "", ""],
        ["ꯖ", "j", "j; named jil", "", "", "", "", "dʒ", "", ""],
        ["ꯗ", "d", "d; named dil", "", "", "", "", "d", "", ""],
        ["ꯘ", "gh", "g with a breathy release; named ghou", "", "", "", "", "ɡʱ", "", ""],
        ["ꯙ", "dh", "d with a breathy release; named dhou", "", "", "", "", "dʱ", "", ""],
        ["ꯚ", "bh", "b with a breathy release; named bham", "", "", "", "", "bʱ", "", ""],
      ],
    },
    {
      title: "Cheitap: vowel signs on ꯀ",
      group: "Vowel signs",
      cols: 4,
      note: "Vowel signs attach to a letter to replace its short a.",
      chars: [
        ["ꯀꯥ", "kaa", "ꯥ: aa, a long a", "", "", "", "", "ka"],
        ["ꯀꯤ", "ki", "ꯤ: i", "", "", "", "", "ki"],
        ["ꯀꯨ", "ku", "ꯨ: u", "", "", "", "", "ku"],
        ["ꯀꯦ", "ke", "ꯦ: e", "", "", "", "", "ke"],
        ["ꯀꯩ", "kei", "ꯩ: ei", "", "", "", "", "kei"],
        ["ꯀꯣ", "ko", "ꯣ: o", "", "", "", "", "ko"],
        ["ꯀꯧ", "kou", "ꯧ: ou", "", "", "", "", "kəu"],
        ["ꯀꯪ", "kang", "ꯪ: nung, an ng sound", "", "", "", "", "kəŋ"],
      ],
    },
    {
      title: "Lonsum: final letters",
      group: "Final letters",
      cols: 4,
      note: "Eight short forms used at the end of a syllable, where the letter has no vowel of its own.",
      chars: [
        ["ꯛ", "k", "final k, short form of ꯀ", "ꯀꯣꯛ", "kok", "head", "", "k", "", "kok"],
        ["ꯜ", "l", "final l, short form of ꯂ", "ꯆꯤꯜ", "chil", "the letter's name", "", "l", "", "tʃil"],
        ["ꯝ", "m", "final m, short form of ꯃ", "ꯁꯝ", "sam", "hair", "", "m", "", "səm"],
        ["ꯞ", "p", "final p, short form of ꯄ", "", "", "", "", "p", "", ""],
        ["ꯟ", "n", "final n, short form of ꯅ", "ꯎꯟ", "un", "skin", "", "n", "", "un"],
        ["ꯠ", "t", "final t, short form of ꯇ", "ꯃꯤꯠ", "mit", "eye", "", "t", "", "mit"],
        ["ꯡ", "ng", "final ng, short form of ꯉ", "ꯌꯥꯡ", "yang", "the letter's name", "", "ŋ", "", "jaŋ"],
        ["ꯢ", "i", "final i, after a vowel, as in ei", "", "", "", "", "i", "", ""],
      ],
    },
  ],
  articles: [
    {
      title: "Letters named after the body",
      body: `<p>Each of the eighteen original letters, the Iyek Ipee, takes its name from a part of the human body: <span lang="mni">ꯀ</span> kok is the head, <span lang="mni">ꯁ</span> sam the hair, <span lang="mni">ꯃ</span> mit the eye and <span lang="mni">ꯅ</span> na the ear. Meitei tradition holds that the letters were modelled on the body itself, and teachers still use the names as a mnemonic.</p>
<p>The nine Lom Eeyek letters were added later for sounds that came in with borrowed words.</p>`,
    },
    {
      title: "A script brought back",
      body: `<p>Meetei Mayek was the script of the kingdom of Manipur for centuries. In the early 18th century the Bengali script replaced it, and for about two hundred years Manipuri was written in Bengali letters.</p>
<p>A revival movement in the 20th century restored the old script, and the government of Manipur adopted it in 1980. Since the 2000s it has been taught in schools and used on signboards beside the Bengali script, which is still common in print.</p>`,
    },
    {
      title: "Lonsum and the syllable",
      body: `<p>Manipuri syllables often end in a consonant. Instead of a vowel-killing sign, Meetei Mayek has eight final letters, the lonsum, each a short form of an ordinary letter: <span lang="mni">ꯀ</span> becomes <span lang="mni">ꯛ</span> at the end of <span lang="mni">ꯀꯣꯛ</span> (kok).</p>
<p>For other clusters there is a sign, the apun iyek, that joins two letters with no vowel between them, as in words borrowed from Sanskrit.</p>`,
    },
  ],
});
