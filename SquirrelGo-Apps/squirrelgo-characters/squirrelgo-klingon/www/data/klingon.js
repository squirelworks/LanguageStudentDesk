// pIqaD letters, numerals, example words and articles for SquirrelGo Klingon.
// Glyphs use the ConScript Unicode Registry private-use code points (U+F8D0-F8FF).
// Each character is [romanization, code point, how to say it, sounds like, example word, example meaning].
// Lesson groupings, sound descriptions and articles are original. Example words are
// a small set of well-known everyday words, not taken from any dictionary.
window.SG_APP = {
  name: "SquirrelGo Klingon",
  tagline: "Read and write pIqaD",
  store: "squirrelgo-klingon",
  about:
    "SquirrelGo Klingon is part of LanguageStudentDesk. Lessons, sound descriptions, stroke orders and articles are original. Fonts: pIqaD qolqoS by Daniel Dadap and a subset of Constructium by Kreative Software, both under the SIL Open Font License (see fonts/OFL.txt). Not affiliated with Paramount, CBS or the Klingon Language Institute. Works fully offline.",
};

window.SG_KLINGON = {
  // IPA for each letter, used for display and to generate the audio in www/audio
  // (see tools/clips.js). Values follow the usual description of Klingon phonology.
  ipa: {
    a: "ɑ", e: "ɛ", I: "ɪ", o: "o", u: "u",
    b: "b", ch: "t͡ʃ", D: "ɖ", gh: "ɣ", H: "x", j: "d͡ʒ", l: "l", m: "m", n: "n", ng: "ŋ",
    p: "pʰ", q: "qʰ", Q: "q͡χ", r: "r", S: "ʂ", t: "tʰ", tlh: "t͡ɬ", v: "v", w: "w", y: "j", "'": "ʔ",
  },

  lessons: [
    {
      title: "Vowels",
      note: "Five vowels, each with one steady sound. I is written as a capital in romanization.",
      chars: [
        ["a", 0xf8d0, "a as in father, open and short", "ah", "jav", "six"],
        ["e", 0xf8d4, "e as in bet", "eh", "wej", "three"],
        ["I", 0xf8d7, "i as in bit, never as in bite", "ih", "bIQ", "water"],
        ["o", 0xf8dd, "o as in go, but pure, with no w glide at the end", "oh", "Hol", "language"],
        ["u", 0xf8e5, "oo as in food", "oo", "Hut", "nine"],
      ],
    },
    {
      title: "Familiar consonants",
      note: "These sound much like English.",
      chars: [
        ["b", 0xf8d1, "b as in bed", "b", "bIQ", "water"],
        ["j", 0xf8d8, "j as in jump", "j", "jav", "six"],
        ["l", 0xf8d9, "l as in let", "l", "loS", "four"],
        ["m", 0xf8da, "m as in man", "m", "maH", "we"],
        ["n", 0xf8db, "n as in no", "n", "nuqneH", "a greeting: what do you want?"],
        ["v", 0xf8e6, "v as in van", "v", "vagh", "five"],
        ["w", 0xf8e7, "w as in wet", "w", "wa'", "one"],
        ["y", 0xf8e8, "y as in yes", "y", "yIH", "tribble"],
      ],
    },
    {
      title: "Crisp consonants",
      note: "p, t and ch come with a strong puff of air. ng is one letter.",
      chars: [
        ["p", 0xf8de, "p as in pin, with a strong puff of air", "p", "pagh", "zero, none"],
        ["t", 0xf8e3, "t as in top, with a strong puff of air", "t", "Hut", "nine"],
        ["ch", 0xf8d2, "ch as in church", "ch", "cha'", "two"],
        ["r", 0xf8e1, "a tapped or lightly rolled r", "r (rolled)", "chorgh", "eight"],
        ["ng", 0xf8dc, "ng as in sing, and it can start a word", "ng", "tlhIngan", "Klingon"],
      ],
    },
    {
      title: "Capital-letter sounds",
      note: "Romanization writes these as capitals because they are not the English sounds. Never write them in lower case.",
      chars: [
        ["D", 0xf8d3, "d with the tongue tip curled back to touch the roof of the mouth", "d (tongue curled back)", "Duj", "ship"],
        ["H", 0xf8d6, "a rough h from the back of the mouth, like ch in Scottish loch", "kh (as in loch)", "Hol", "language"],
        ["S", 0xf8e2, "sh with the tongue tip curled back", "sh (tongue curled back)", "Soch", "seven"],
        ["Q", 0xf8e0, "q followed straight away by a harsh H: a hard, raspy kh", "qkh", "Qapla'", "success"],
      ],
    },
    {
      title: "Throat sounds",
      note: "The sounds that give Klingon its edge. Take them slowly.",
      chars: [
        ["q", 0xf8df, "k made far back in the throat, against the uvula, with a puff of air", "k (far back)", "nuqneH", "a greeting: what do you want?"],
        ["gh", 0xf8d5, "a gargled g: the voiced partner of H", "gh (gargled)", "ghobe'", "no"],
        ["tlh", 0xf8e4, "t followed by a hissing l, with air rushing past the sides of the tongue", "tl (hissed)", "tlhIngan", "Klingon"],
        ["'", 0xf8e9, "a glottal stop, the catch in the middle of uh-oh; it is a full letter", "(catch in uh-oh)", "wa'", "one"],
      ],
    },
    {
      title: "Numerals",
      numerals: true,
      note: "pIqaD has its own ten digits. Numbers are written with the largest place first, as in English.",
      chars: [
        ["0", 0xf8f0, "pagh", "pagh", "pagh", "zero"],
        ["1", 0xf8f1, "wa'", "wa'", "wa'", "one"],
        ["2", 0xf8f2, "cha'", "cha'", "cha'", "two"],
        ["3", 0xf8f3, "wej", "wej", "wej", "three"],
        ["4", 0xf8f4, "loS", "loS", "loS", "four"],
        ["5", 0xf8f5, "vagh", "vagh", "vagh", "five"],
        ["6", 0xf8f6, "jav", "jav", "jav", "six"],
        ["7", 0xf8f7, "Soch", "Soch", "Soch", "seven"],
        ["8", 0xf8f8, "chorgh", "chorgh", "chorgh", "eight"],
        ["9", 0xf8f9, "Hut", "Hut", "Hut", "nine"],
      ],
    },
  ],

  // Short words for word-reading quizzes and the transliterator's word list.
  words: [
    ["Qapla'", "success"],
    ["tlhIngan", "Klingon"],
    ["tlhIngan Hol", "the Klingon language"],
    ["nuqneH", "a greeting: what do you want?"],
    ["HIja'", "yes"],
    ["ghobe'", "no"],
    ["Hol", "language"],
    ["bIQ", "water"],
    ["Duj", "ship"],
    ["yIH", "tribble"],
    ["maH", "we"],
    ["pagh", "zero, none"],
    ["wa'", "one"],
    ["cha'", "two"],
    ["wej", "three"],
    ["loS", "four"],
    ["vagh", "five"],
    ["jav", "six"],
    ["Soch", "seven"],
    ["chorgh", "eight"],
    ["Hut", "nine"],
  ],

  articles: [
    {
      title: "About pIqaD",
      body: `<p><b>pIqaD</b> is the Klingon alphabet. Its letters began as decorative alien lettering on Star Trek sets and props. Fans later matched the 26 shapes to the 26 letters of the romanization used to write the language, and that mapping is now the standard one.</p>
<p>Most Klingon text is written in that romanization (<i>tlhIngan Hol</i>, "Klingon language"), but pIqaD is what you see on signs, tattoos, book covers and in the hands of serious learners. It is a true alphabet: one shape for each sound, written left to right, with no upper and lower case.</p>
<p>pIqaD is not in standard Unicode. Computers store it in the Private Use Area at the code points set out by the ConScript Unicode Registry (U+F8D0 to U+F8FF), so it only shows up where a pIqaD font is installed. This app carries its own fonts, so it works everywhere.</p>`,
    },
    {
      title: "Reading the romanization",
      body: `<p>Each pIqaD letter matches exactly one unit of the romanization. A few things trip up beginners:</p>
<ul>
<li><b>Capitals are different letters.</b> <i>q</i> and <i>Q</i> are two separate sounds. <i>D, H, I, Q</i> and <i>S</i> are always capitals; every other letter is always lower case, even at the start of a sentence.</li>
<li><b>Some letters are written with more than one Latin letter:</b> <i>ch, gh, ng</i> and <i>tlh</i> are each one pIqaD letter.</li>
<li><b>The apostrophe is a letter.</b> It is the glottal stop and gets its own pIqaD shape.</li>
</ul>
<p>So <i>tlhIngan</i> is five letters: <i>tlh · I · ng · a · n</i>. Try it in the <b>Write words</b> tool.</p>`,
    },
    {
      title: "Pronunciation guide",
      body: `<p>Klingon sounds are steady: each letter always makes the same sound. Every letter's page shows its IPA symbol and plays the sound: tap ▶ to hear it, ½ to hear it slowly. There is no Klingon text-to-speech voice, so the audio is synthesized from IPA with eSpeak NG. It sounds robotic, but each sound is the right one.</p>
<table>
<tr><th>Letter</th><th>Say it like</th></tr>
<tr><td>a e I o u</td><td>f<b>a</b>ther, b<b>e</b>t, b<b>i</b>t, g<b>o</b>, f<b>oo</b>d</td></tr>
<tr><td>D</td><td>d with the tongue tip curled back</td></tr>
<tr><td>S</td><td>sh with the tongue tip curled back</td></tr>
<tr><td>H</td><td>ch in Scottish lo<b>ch</b>, rough</td></tr>
<tr><td>gh</td><td>the same place as H, but voiced, like a gargle</td></tr>
<tr><td>q</td><td>k pulled right back to the throat</td></tr>
<tr><td>Q</td><td>q with a harsh H straight after</td></tr>
<tr><td>tlh</td><td>t then a hissed l, air past the sides of the tongue</td></tr>
<tr><td>'</td><td>the catch in uh-oh</td></tr>
<tr><td>r</td><td>tapped or rolled</td></tr>
</table>
<p><b>Vowel + w or y</b> make glides: <i>ay</i> as in m<b>y</b>, <i>ey</i> as in d<b>ay</b>, <i>oy</i> as in b<b>oy</b>, <i>aw</i> as in c<b>ow</b>, <i>uy</i> like oo-ee run together.</p>
<p><b>Do not soften the glottal stop.</b> In <i>Qapla'</i> and <i>wa'</i> the word ends with a short, clean catch in the throat.</p>`,
    },
    {
      title: "How to write pIqaD",
      body: `<p>There is no official stroke order for pIqaD. The orders in this app are suggestions that make the letters quick and smooth to write by hand:</p>
<ul>
<li>A bar across the top comes first, then what hangs from it.</li>
<li>Main strokes go from top to bottom and from left to right.</li>
<li>Closed loops (<i>D, H, y</i>) are drawn in one go.</li>
</ul>
<p>pIqaD is often drawn sharp and blade-like, as in the <b>Classic</b> font, or rounder and even-weight, as in the <b>Handwriting</b> font. Switch between them in Settings. The letter is the same in both; practise the handwriting shapes first, they are the ones your hand will make.</p>
<p>Leave a clear gap between words. pIqaD has its own punctuation: a small triangle pointing down works like a comma, one pointing up like a full stop.</p>`,
    },
    {
      title: "Numbers",
      body: `<p>Counting from one to nine: <i>wa', cha', wej, loS, vagh, jav, Soch, chorgh, Hut</i>. Zero is <i>pagh</i>.</p>
<p>Bigger numbers are built by adding a place word after the digit: <i>maH</i> tens, <i>vatlh</i> hundreds, <i>SaD</i> thousands. So 20 is <i>cha'maH</i> and 35 is <i>wejmaH vagh</i>.</p>
<p>The pIqaD digits work like ours: largest place first, written left to right. Try typing a number in the <b>Write words</b> tool.</p>`,
    },
  ],
};
