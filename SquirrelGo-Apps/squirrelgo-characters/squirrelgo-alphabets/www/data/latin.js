// The Latin alphabet and its most common accented letters, for SquirrelGo Alphabets.
// Each character is [letter, sound label, sound hint, example, example romanization,
// meaning, text to speak, IPA, example language]. The example language is a BCP 47
// tag used for its recording and text-to-speech; it falls back to the script's.
// Hints, groupings, example choices and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "latin",
  title: "Latin",
  native: "Aa Ää Çç",
  lang: "es-ES",
  langName: "Spanish",
  font: 'system-ui, "Segoe UI", Roboto, "Noto Sans", sans-serif',
  chartFlow: true,
  blurb: "The 26 letters most of the world writes with, then the accents and extra letters of European languages.",
  writeTip: "These are the simple printed shapes children learn first. Each language has its own handwriting habits; the strokes here are a good common start.",
  lessons: [
    {
      title: "Vowels",
      group: "Letters",
      cols: 6,
      note: "The sounds here are the ones Spanish, Italian, German and most other languages use. English is the odd one out, so set its vowel names aside.",
      chars: [
        ["A a", "a", "a as in father", "casa", "", "house (Spanish)", "", "a", "es-ES"],
        ["E e", "e", "e as in bed, or the start of hey", "mesa", "", "table (Spanish)", "", "e", "es-ES"],
        ["I i", "i", "ee as in see", "libro", "", "book (Spanish)", "", "i", "es-ES"],
        ["O o", "o", "o as in more, with rounded lips", "sol", "", "sun (Spanish)", "", "o", "es-ES"],
        ["U u", "u", "oo as in food", "luna", "", "moon (Spanish)", "", "u", "es-ES"],
        ["Y y", "y", "a y as in yes; in many languages also a vowel like i", "yoga", "", "yoga", "", "j", "en-US"],
      ],
    },
    {
      title: "Steady consonants",
      group: "Letters",
      cols: 6,
      note: "These keep nearly the same sound in every language that uses them.",
      chars: [
        ["B b", "b", "b as in bed", "bebé", "", "baby (Spanish)", "", "b", "es-ES"],
        ["D d", "d", "d as in day", "dedo", "", "finger (Spanish)", "", "d", "es-ES"],
        ["F f", "f", "f as in fan", "foto", "", "photo (Spanish)", "", "f", "es-ES"],
        ["K k", "k", "k as in kite", "kilo", "", "kilo", "", "k", "es-ES"],
        ["L l", "l", "l as in let", "lago", "", "lake (Spanish)", "", "l", "es-ES"],
        ["M m", "m", "m as in man", "mano", "", "hand (Spanish)", "", "m", "es-ES"],
        ["N n", "n", "n as in no", "nube", "", "cloud (Spanish)", "", "n", "es-ES"],
        ["P p", "p", "p as in spin", "pan", "", "bread (Spanish)", "", "p", "es-ES"],
        ["S s", "s", "s as in sun; between vowels often z in German, French and Italian", "sopa", "", "soup (Spanish)", "", "s", "es-ES"],
        ["T t", "t", "t as in stop", "tomate", "", "tomato (Spanish)", "", "t", "es-ES"],
        ["V v", "v", "v as in van; in German usually f, in Spanish close to b", "vino", "", "wine (Italian)", "", "v", "it-IT"],
        ["Z z", "z", "z as in zoo in English and French; ts in German and Italian; th in Spain", "zebra", "", "zebra", "", "z", "en-US"],
      ],
    },
    {
      title: "Consonants that change",
      group: "Letters",
      cols: 6,
      note: "Each language gives these its own value. The hint lists the common ones.",
      chars: [
        ["C c", "c", "k before a, o, u; before e and i it softens to s (French, Spanish in the Americas) or ch (Italian)", "café", "", "coffee (French)", "", "k", "fr-FR"],
        ["G g", "g", "g as in go; before e and i it softens in French, Spanish and Italian", "gato", "", "cat (Spanish)", "", "ɡ", "es-ES"],
        ["H h", "h", "h as in hat; silent in Spanish, French and Italian", "Haus", "", "house (German)", "", "h", "de-DE"],
        ["J j", "j", "y in German and Polish, zh in French, a throaty h in Spanish, j in English", "Junge", "", "boy (German)", "", "j", "de-DE"],
        ["Q q", "q", "k, almost always followed by u", "queso", "", "cheese (Spanish)", "", "k", "es-ES"],
        ["R r", "r", "a tapped or rolled r in most languages; in French and German a soft r in the throat", "rosa", "", "rose (Italian)", "", "r", "it-IT"],
        ["W w", "w", "w as in wet in English; v in German and Polish", "Wasser", "", "water (German)", "", "v", "de-DE"],
        ["X x", "x", "ks as in box; in Spanish words like México a throaty h", "taxi", "", "taxi", "", "ks", "es-ES"],
      ],
    },
    {
      title: "Acute, grave and circumflex",
      group: "Accents",
      cols: 5,
      note: "An acute (´) marks stress in Spanish and Portuguese, a closed e in French, and a long vowel in Czech and Hungarian. A grave (`) and circumflex (^) mostly mark vowel quality.",
      chars: [
        ["Á á", "á", "a, stressed (Spanish) or long (Czech, Hungarian)", "está", "", "is (Spanish)", "", "a", "es-ES"],
        ["É é", "é", "a closed e, as in the start of hey (French)", "été", "", "summer (French)", "", "e", "fr-FR"],
        ["Í í", "í", "ee, stressed or long", "país", "", "country (Spanish)", "", "i", "es-ES"],
        ["Ó ó", "ó", "o, stressed or long; in Polish said u", "corazón", "", "heart (Spanish)", "", "o", "es-ES"],
        ["Ú ú", "ú", "oo, stressed or long", "música", "", "music (Spanish)", "", "u", "es-ES"],
        ["À à", "à", "a; in French it tells two words apart (à, to; a, has)", "voilà", "", "there it is (French)", "", "a", "fr-FR"],
        ["È è", "è", "an open e as in bed (French, Italian)", "mère", "", "mother (French)", "", "ɛ", "fr-FR"],
        ["Ê ê", "ê", "an open e (French); a closed e (Portuguese)", "fête", "", "party (French)", "", "ɛ", "fr-FR"],
        ["Ô ô", "ô", "a closed o (French, Portuguese, Slovak)", "hôtel", "", "hotel (French)", "", "o", "fr-FR"],
      ],
    },
    {
      title: "Umlaut and diaeresis",
      group: "Accents",
      cols: 5,
      note: "Two dots. In German, Swedish, Finnish, Hungarian and Turkish they make a new vowel. In French and Spanish they only say: pronounce this vowel separately.",
      chars: [
        ["Ä ä", "ä", "e as in bed (German, Swedish); a as in cat (Finnish)", "Mädchen", "", "girl (German)", "", "ɛ", "de-DE"],
        ["Ö ö", "ö", "say e as in hey with rounded lips", "schön", "", "beautiful (German)", "", "ø", "de-DE"],
        ["Ü ü", "ü", "say ee with rounded lips", "über", "", "over (German)", "", "y", "de-DE"],
        ["Ë ë", "ë", "e said on its own, not joined to the vowel before (French, Dutch); a schwa in Albanian", "Noël", "", "Christmas (French)", "", "ɛ", "fr-FR"],
        ["Ï ï", "ï", "ee said on its own, not joined to the vowel before", "maïs", "", "corn (French)", "", "i", "fr-FR"],
      ],
    },
    {
      title: "Tilde, cedilla and ogonek",
      group: "Accents",
      cols: 5,
      chars: [
        ["Ñ ñ", "ñ", "ny as in canyon (Spanish)", "niño", "", "child (Spanish)", "", "ɲ", "es-ES"],
        ["Ã ã", "ã", "a nasal a (Portuguese)", "irmã", "", "sister (Portuguese)", "", "ɐ̃", "pt-PT"],
        ["Õ õ", "õ", "a nasal o (Portuguese); a vowel between e and u (Estonian)", "lições", "", "lessons (Portuguese)", "", "õ", "pt-PT"],
        ["Ç ç", "ç", "s before a, o, u (French, Portuguese); ch (Turkish, Albanian)", "garçon", "", "boy (French)", "", "s", "fr-FR"],
        ["Ş ş", "ş", "sh (Turkish, Romanian ș)", "şeker", "", "sugar (Turkish)", "", "ʃ", "tr-TR"],
        ["Ą ą", "ą", "a nasal o (Polish)", "mąka", "", "flour (Polish)", "", "ɔ̃", "pl-PL"],
        ["Ę ę", "ę", "a nasal e (Polish)", "ręka", "", "hand (Polish)", "", "ɛ̃", "pl-PL"],
      ],
    },
    {
      title: "Caron (háček)",
      group: "Accents",
      cols: 5,
      note: "The little v-shaped hook turns a hissing sound into a hushing one. Czech, Slovak, Slovene, Croatian, Lithuanian and Latvian use it.",
      chars: [
        ["Č č", "č", "ch as in church", "čaj", "", "tea (Czech)", "", "tʃ", "cs-CZ"],
        ["Š š", "š", "sh as in ship", "škola", "", "school (Czech)", "", "ʃ", "cs-CZ"],
        ["Ž ž", "ž", "s as in pleasure", "žena", "", "woman (Czech)", "", "ʒ", "cs-CZ"],
        ["Ř ř", "ř", "a rolled r and a zh at the same moment; only Czech has it", "řeka", "", "river (Czech)", "", "r̝", "cs-CZ"],
        ["Ě ě", "ě", "ye as in yes (Czech)", "děti", "", "children (Czech)", "", "jɛ", "cs-CZ"],
      ],
    },
    {
      title: "Rings, strokes and dots",
      group: "Accents",
      cols: 5,
      chars: [
        ["Å å", "å", "o as in more (Swedish, Norwegian, Danish)", "år", "", "year (Swedish)", "", "oː", "sv-SE"],
        ["Ø ø", "ø", "say e with rounded lips (Danish, Norwegian)", "øl", "", "beer (Norwegian)", "", "ø", "nb-NO"],
        ["Ł ł", "ł", "w as in wet (Polish)", "mały", "", "small (Polish)", "", "w", "pl-PL"],
        ["Đ đ", "đ", "a soft j (Croatian, Serbian, Bosnian); d (Vietnamese)", "đak", "", "pupil (Croatian)", "", "dʑ", "hr-HR"],
        ["Ż ż", "ż", "s as in pleasure (Polish)", "żaba", "", "frog (Polish)", "", "ʐ", "pl-PL"],
        ["Ő ő", "ő", "a long ö (Hungarian)", "hő", "", "heat (Hungarian)", "", "øː", "hu-HU"],
        ["Ğ ğ", "ğ", "silent, lengthens the vowel before it (Turkish)", "dağ", "", "mountain (Turkish)", "", "ː", "tr-TR"],
        ["I ı", "ı", "dotless i: ee with the lips pulled flat, said far back (Turkish)", "kız", "", "girl (Turkish)", "", "ɯ", "tr-TR"],
      ],
    },
    {
      title: "Extra letters",
      group: "Extra letters",
      cols: 5,
      chars: [
        ["ß", "ss", "eszett: a sharp s (German)", "Straße", "", "street (German)", "", "s", "de-DE"],
        ["Æ æ", "æ", "a as in cat (Danish, Norwegian, Icelandic)", "æble", "", "apple (Danish)", "", "ɛ", "da-DK"],
        ["Œ œ", "œ", "the ö sound (French)", "cœur", "", "heart (French)", "", "œ", "fr-FR"],
        ["Þ þ", "þ", "thorn: th as in thin (Icelandic)", "þak", "", "roof (Icelandic)", "", "θ", "is-IS"],
        ["Ð ð", "ð", "eth: th as in this (Icelandic, Faroese)", "góður", "", "good (Icelandic)", "", "ð", "is-IS"],
      ],
    },
  ],
  articles: [
    {
      title: "One alphabet, many languages",
      body: `<p>The Latin alphabet started as the alphabet of ancient Rome, which borrowed it from the Etruscans, who took it from the Greeks. Rome had 23 letters; J, U and W were added in the Middle Ages to tell apart sounds that I, V and VV had once shared.</p>
<p>Today it is the most widely used script in the world: European languages, Turkish, Vietnamese, Indonesian, Swahili, Hausa, Yoruba, Tagalog and hundreds more. Each language adapted it to its own sounds, either with letter pairs (English sh, German sch, Polish sz) or with marks on the letters (Czech š). That is why the same letter can sound different from one language to the next.</p>
<p>This app teaches the values most languages share, which are close to Spanish and Italian. The hints say where a big language does something different.</p>`,
    },
    {
      title: "What the accent marks do",
      body: `<p>A mark on a letter does one of a few jobs:</p>
<ul>
<li><b>Stress</b>: Spanish <span lang="es">canción</span>, Portuguese <span lang="pt">café</span>. The marked syllable is the loud one.</li>
<li><b>Length</b>: Czech <span lang="cs">dobrý</span>, Hungarian <span lang="hu">jó</span>. The marked vowel is held longer.</li>
<li><b>Quality</b>: French <span lang="fr">é, è, ê</span>, German <span lang="de">ä, ö, ü</span>. The mark gives a different vowel.</li>
<li><b>A new consonant</b>: Czech <span lang="cs">č, š, ž</span>, Polish <span lang="pl">ł, ż</span>, Spanish <span lang="es">ñ</span>, French <span lang="fr">ç</span>.</li>
<li><b>Nasal sound</b>: Portuguese <span lang="pt">ã, õ</span>, Polish <span lang="pl">ą, ę</span>.</li>
</ul>
<p>Accents are part of the spelling. Leaving them out can change the word: Spanish <span lang="es">año</span> is year, <span lang="es">ano</span> is something quite different.</p>`,
    },
    {
      title: "Letter pairs to know",
      body: `<p>Many languages spell one sound with two or three letters:</p>
<table>
<tr><td>sh</td><td>English sh, German <span lang="de">sch</span>, French <span lang="fr">ch</span>, Polish <span lang="pl">sz</span>, Hungarian <span lang="hu">s</span></td></tr>
<tr><td>ch as in church</td><td>Spanish <span lang="es">ch</span>, Italian <span lang="it">ci</span>, German <span lang="de">tsch</span>, Polish <span lang="pl">cz</span>, Hungarian <span lang="hu">cs</span></td></tr>
<tr><td>ny</td><td>Spanish <span lang="es">ñ</span>, French and Italian <span lang="fr">gn</span>, Portuguese <span lang="pt">nh</span>, Hungarian <span lang="hu">ny</span></td></tr>
<tr><td>ly</td><td>Italian <span lang="it">gli</span>, Portuguese <span lang="pt">lh</span>, Spanish <span lang="es">ll</span> in some regions</td></tr>
</table>
<p>When you start a new language, learn its letter pairs along with its accented letters. Together they are most of what makes its spelling different.</p>`,
    },
    {
      title: "Capitals and small letters",
      body: `<p>Latin, Greek, Cyrillic and Armenian are the main scripts with two cases. Capitals come from Roman inscriptions; small letters grew out of quick handwriting in the early Middle Ages.</p>
<p>Most pairs look alike (O o, S s), some look nothing alike (A a, G g, Q q). Practise both: the writing pad lets you switch between them with the buttons above the pad.</p>
<p>Capital letters start sentences and names everywhere. German also capitalizes every noun: <span lang="de">das Haus, der Hund</span>.</p>`,
    },
  ],
});
