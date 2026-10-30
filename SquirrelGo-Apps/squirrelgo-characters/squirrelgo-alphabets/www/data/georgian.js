// The Georgian alphabet (Mkhedruli) for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization,
// meaning, text to speak, IPA]. Romanization follows the national system, where an
// apostrophe marks an ejective (a tight sound with a click from the throat).
// Hints, groupings and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "georgian",
  title: "Georgian",
  native: "ქართული",
  lang: "ka-GE",
  langName: "Georgian",
  font: '"Noto Sans Georgian", "Segoe UI", system-ui, sans-serif',
  chartFlow: true,
  blurb: "The 33 rounded letters of Mkhedruli, the script Georgian is written in today.",
  writeTip: "Georgian letters sit on four lines: some stay between the middle two, some rise above, some hang below, and a few do both. Notice the height as you write.",
  lessons: [
    {
      title: "Vowels",
      group: "Letters",
      note: "Georgian has five pure vowels and no long ones.",
      chars: [
        ["ა", "a", "a as in father", "არა", "ara", "no", "ა", "ɑ"],
        ["ე", "e", "e as in bed", "ერთი", "erti", "one", "ე", "ɛ"],
        ["ი", "i", "ee as in see", "ია", "ia", "violet", "ი", "i"],
        ["ო", "o", "o as in more", "ოთახი", "otakhi", "room", "ო", "ɔ"],
        ["უ", "u", "oo as in food", "უბანი", "ubani", "neighborhood", "უ", "u"],
      ],
    },
    {
      title: "Easy consonants",
      group: "Letters",
      chars: [
        ["ბ", "b", "b as in bed", "ბავშვი", "bavshvi", "child", "ბ", "b"],
        ["გ", "g", "g as in go", "გული", "guli", "heart", "გ", "ɡ"],
        ["დ", "d", "d as in day", "დედა", "deda", "mother", "დ", "d"],
        ["ვ", "v", "v as in van; before a consonant closer to w", "ვაშლი", "vashli", "apple", "ვ", "v"],
        ["ზ", "z", "z as in zoo", "ზღვა", "zghva", "sea", "ზ", "z"],
        ["ლ", "l", "l as in let", "ლომი", "lomi", "lion", "ლ", "l"],
        ["მ", "m", "m", "მამა", "mama", "father", "მ", "m"],
        ["ნ", "n", "n as in no", "ნავი", "navi", "boat", "ნ", "n"],
        ["რ", "r", "a tapped r", "რძე", "rdze", "milk", "რ", "r"],
        ["ს", "s", "s as in sun", "სახლი", "sakhli", "house", "ს", "s"],
        ["ჰ", "h", "h as in hat", "ჰაერი", "haeri", "air", "ჰ", "h"],
      ],
    },
    {
      title: "Hushing and throat sounds",
      group: "Letters",
      chars: [
        ["ჟ", "zh", "s as in pleasure", "ჟურნალი", "zhurnali", "magazine", "ჟ", "ʒ"],
        ["შ", "sh", "sh as in ship", "შვიდი", "shvidi", "seven", "შ", "ʃ"],
        ["ჯ", "j", "j as in jam", "ჯიბე", "jibe", "pocket", "ჯ", "dʒ"],
        ["ძ", "dz", "dz as in adze", "ძაღლი", "dzaghli", "dog", "ძ", "dz"],
        ["ხ", "kh", "ch as in Scottish loch", "ხე", "khe", "tree", "ხ", "x"],
        ["ღ", "gh", "a gargled sound like a French r", "ღამე", "ghame", "night", "ღ", "ɣ"],
      ],
    },
    {
      title: "Sounds with a puff of air",
      group: "Pairs",
      note: "These are said like English p, t, k, ch and ts at the start of a word, with a small puff of air.",
      chars: [
        ["ფ", "p", "p with a puff of air, as in pin", "ფული", "puli", "money", "ფ", "pʰ"],
        ["თ", "t", "t with a puff of air, as in tin", "თევზი", "tevzi", "fish", "თ", "tʰ"],
        ["ქ", "k", "k with a puff of air, as in kin", "ქალაქი", "kalaki", "city", "ქ", "kʰ"],
        ["ჩ", "ch", "ch with a puff of air, as in chin", "ჩაი", "chai", "tea", "ჩ", "tʃʰ"],
        ["ც", "ts", "ts with a puff of air", "ცა", "tsa", "sky", "ც", "tsʰ"],
      ],
    },
    {
      title: "Ejectives",
      group: "Pairs",
      note: "The tight partners of the letters before. Close your throat, then pop the sound out with no air from the lungs.",
      chars: [
        ["პ", "p'", "a tight, popped p", "პური", "p'uri", "bread", "პ", "pʼ"],
        ["ტ", "t'", "a tight, popped t", "ტყე", "t'q'e", "forest", "ტ", "tʼ"],
        ["კ", "k'", "a tight, popped k", "კატა", "k'at'a", "cat", "კ", "kʼ"],
        ["ჭ", "ch'", "a tight, popped ch", "ჭიქა", "ch'ika", "drinking glass", "ჭ", "tʃʼ"],
        ["წ", "ts'", "a tight, popped ts", "წყალი", "ts'q'ali", "water", "წ", "tsʼ"],
        ["ყ", "q'", "a tight k made far back in the throat", "ყავა", "q'ava", "coffee", "ყ", "qʼ"],
      ],
    },
  ],
  articles: [
    {
      title: "About Georgian writing",
      body: `<p>Georgian has had three alphabets: Asomtavruli (from about the 5th century), Nuskhuri (from the 9th) and Mkhedruli (from the 11th). Mkhedruli, the rounded one taught here, is the one used for everyday Georgian. All three are on UNESCO's list of intangible cultural heritage.</p>
<p>The script is also used for Georgia's other Kartvelian languages: Mingrelian, Svan and Laz.</p>`,
    },
    {
      title: "No capital letters",
      body: `<p>Mkhedruli has one case. Sentences and names start with the same letters as any other word.</p>
<p>There is a set of capital-like forms called Mtavruli, used in titles, signs and headlines written all in capitals: <span lang="ka">ᲡᲐᲥᲐᲠᲗᲕᲔᲚᲝ</span> for <span lang="ka">საქართველო</span> (Sakartvelo, Georgia). They are not used to start sentences.</p>`,
    },
    {
      title: "One letter, one sound",
      body: `<p>Georgian spelling is very regular: each letter has one sound, and words are said as they are written. There are no silent letters and no stress marks to learn.</p>
<p>The challenge is in the sounds themselves. Georgian contrasts three versions of many consonants (voiced, with a puff of air, and ejective), and it allows long clusters of consonants at the start of a word: <span lang="ka">გვფრცქვნი</span> (gvprtskvni, you peel us) has eight in a row.</p>`,
    },
  ],
});
