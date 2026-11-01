// Cherokee first grammar for the Grammar Learner. Written for this project.
// Examples are [Cherokee syllabary, romanization, English]; {braces} mark the point of the lesson.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
//
// Sources (open / educational; accuracy over volume — no invented forms):
// - Cherokee Nation Language Program, ᏣᎳᎩ ᎣᏣᏕᎶᏆᎠ (Cherokee language textbook PDF)
//   https://cherokeenationdictionary.net/pdf/cherokee_grammar.pdf — prefixes, greetings,
//   questions (-s / -ju), negation (tla + yi-/y-), numbers, want / speak / go conjugations.
// - Cherokee Nation Language Technology, Grammar Set A / Set B handout
//   https://language.cherokee.org/media/fadc4zn5/grammar_a_b.pdf
// - Durbin Feeling (1975), Cherokee–English Dictionary (Cherokee Nation of Oklahoma),
//   cited via Wiktionary for attested lemma glosses (e.g. ᎦᏬᏂᎭ gawoniha).
// - Wiktionary Cherokee entries and phrasebook (CC BY-SA): ᎣᏏᏲ, ᏩᏙ, ᏙᎯᏧ, ᏙᎾᏓᎪᎲᎢ,
//   Ꮵ ᏣᎳᎩ, ᎦᏙ ᏕᏣᏙᎠ, Ꮭ ᏣᎳᎩ ᏱᏥᏬᏂ, Ꮭ, numerals, and verb lemmas.
// - Wikipedia “Cherokee grammar” (CC BY-SA) for Set A / Set B overview.
// - This repo’s languages/cherokee/vocab.js and reference.json for greeting and number forms
//   already used in the Desk (osiyo, wado, saquu–sgohi, ayv, nihi, …).
// Romanization matches the Desk vocab (ts for Ꮳ/Ꮵ, v for the nasal vowel, qu for Ꮖ).
// Tone is not marked; sources that mark pitch are cited only for the form, not the tone.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.cherokee = {
  title: "Cherokee first grammar",
  intro: "Cherokee (ᏣᎳᎩ, Tsalagi) packs who does what into the verb with pronoun prefixes, so a whole English sentence is often one word. These lessons cover greetings, name and identity statements, Set A and Set B prefixes on a few well-attested verbs, yes/no and question-word questions, negation with Ꮭ, and the numbers one to ten. Examples use Sequoyah’s syllabary with the same romanization as the Desk vocabulary; tone is left unmarked.",
  lessons: [
    {
      id: "greetings",
      title: "ᎣᏏᏲ — greetings",
      particle: "ᎣᏏᏲ",
      summary: "Hello, how are you, thank you, and until we meet again.",
      sections: [
        {
          p: "Start with <b>ᎣᏏᏲ</b> (osiyo) “hello”. Ask how someone is with <b>ᏙᎯᏧ?</b> (dohitsu?). A common answer is <b>ᎣᏍᏓ</b> (osda) “good; fine”, often followed by <b>ᏂᎯᏃ?</b> (nihino?) “and you?”.",
          examples: [
            ["{ᎣᏏᏲ}.", "Osiyo.", "Hello."],
            ["{ᏙᎯᏧ}?", "Dohitsu?", "How are you?"],
            ["{ᎣᏍᏓ}, ᏂᎯᏃ?", "Osda, nihino?", "Fine, and you?"],
          ],
        },
        {
          h: "Thanks, yes, no, and parting",
          p: "<b>ᏩᏙ</b> (wado) is “thank you”. <b>ᎥᎥ</b> (vv) is “yes” and <b>ᎥᏝ</b> (vtla) is “no”. Cherokee has no final goodbye; say <b>ᏙᎾᏓᎪᎲᎢ</b> (donadagohvi) “until we meet again”.",
          examples: [
            ["{ᏩᏙ}.", "Wado.", "Thank you."],
            ["{ᎥᎥ}. / {ᎥᏝ}.", "Vv. / Vtla.", "Yes. / No."],
            ["{ᏙᎾᏓᎪᎲᎢ}.", "Donadagohvi.", "Until we meet again."],
          ],
        },
      ],
      drills: [
        { q: "＿", en: "Hello.", options: ["ᎣᏏᏲ", "ᏩᏙ", "ᎥᎥ", "ᎣᏍᏓ"], answer: "ᎣᏏᏲ", why: "ᎣᏏᏲ (osiyo) is the everyday hello." },
        { q: "＿?", en: "How are you?", options: ["ᏙᎯᏧ", "ᏩᏙ", "ᎥᏝ", "ᏣᎳᎩ"], answer: "ᏙᎯᏧ", why: "ᏙᎯᏧ? (dohitsu?) asks how someone is." },
        { q: "＿.", en: "Thank you.", options: ["ᏩᏙ", "ᎣᏏᏲ", "ᎥᎥ", "ᎠᏴ"], answer: "ᏩᏙ", why: "ᏩᏙ (wado) is thank you." },
        { q: "＿, ᏂᎯᏃ?", en: "Fine, and you?", options: ["ᎣᏍᏓ", "ᎥᏝ", "ᏩᏙ", "ᏌᏊ"], answer: "ᎣᏍᏓ", why: "ᎣᏍᏓ (osda) means good or fine." },
        { q: "＿.", en: "Until we meet again.", options: ["ᏙᎾᏓᎪᎲᎢ", "ᎣᏏᏲ", "ᎥᎥ", "ᏩᏙ"], answer: "ᏙᎾᏓᎪᎲᎢ", why: "There is no final goodbye; ᏙᎾᏓᎪᎲᎢ is the parting wish." },
      ],
    },
    {
      id: "to-be",
      title: "Names and “I am …”",
      particle: "ᏓᏆᏙᎠ",
      summary: "Independent pronouns, saying your name, and identity with a Set A prefix.",
      sections: [
        {
          p: "Independent pronouns are optional because the verb already marks the person. <b>ᎠᏴ</b> (ayv) is “I; me” and <b>ᏂᎯ</b> (nihi) is “you”. Ask someone’s name with <b>ᎦᏙ ᏕᏣᏙᎠ?</b> (gado dejado'a?) and answer with <b>… ᏓᏆᏙᎠ</b> (… dagwado'a) “my name is …”.",
          examples: [
            ["{ᎦᏙ ᏕᏣᏙᎠ}?", "Gado dejado'a?", "What is your name?"],
            ["Meli {ᏓᏆᏙᎠ}.", "Meli dagwado'a.", "My name is Meli."],
            ["{ᎠᏴ} ᏣᎳᎩ.", "Ayv tsalagi.", "I (am) Cherokee. (pronoun for emphasis)"],
          ],
        },
        {
          h: "Identity on the noun",
          p: "Cherokee often needs no separate “is”. A Set A prefix can sit on a noun used as a predicate: <b>Ꮵ ᏣᎳᎩ</b> (tsi tsalagi) “I am Cherokee”. People words from the vocabulary include <b>ᎠᏍᎦᏯ</b> (asgaya) “man” and <b>ᎠᎨᏯ</b> (ageya) “woman”.",
          examples: [
            ["{Ꮵ ᏣᎳᎩ}.", "Tsi tsalagi.", "I am Cherokee."],
            ["Ꮎ {ᎠᏍᎦᏯ}.", "Na asgaya.", "That (is a) man."],
            ["Ꮎ {ᎠᎨᏯ}.", "Na ageya.", "That (is a) woman."],
          ],
        },
      ],
      drills: [
        { q: "＿ ᏕᏣᏙᎠ?", en: "What is your name?", options: ["ᎦᏙ", "ᎭᏢ", "ᎦᎪ", "ᏩᏙ"], answer: "ᎦᏙ", why: "ᎦᏙ (gado) is “what” in ᎦᏙ ᏕᏣᏙᎠ?" },
        { q: "Meli ＿.", en: "My name is Meli.", options: ["ᏓᏆᏙᎠ", "ᏕᏣᏙᎠ", "ᎣᏏᏲ", "ᏩᏙ"], answer: "ᏓᏆᏙᎠ", why: "ᏓᏆᏙᎠ (dagwado'a) is “my name is …”." },
        { q: "＿ ᏣᎳᎩ.", en: "I am Cherokee. (prefixed form)", options: ["Ꮵ", "Ꭿ", "Ꭶ", "ᎠᏂ"], answer: "Ꮵ", why: "Set A “I” before a consonant is Ꮵ (tsi-), as in Ꮵ ᏣᎳᎩ." },
        { q: "＿ means “I; me”.", en: "", options: ["ᎠᏴ", "ᏂᎯ", "ᎥᎥ", "ᏩᏙ"], answer: "ᎠᏴ", why: "ᎠᏴ (ayv) is the independent pronoun “I; me”." },
        { q: "Ꮎ ＿.", en: "That (is a) man.", options: ["ᎠᏍᎦᏯ", "ᎠᎨᏯ", "ᎠᏲᎵ", "ᏩᏯ"], answer: "ᎠᏍᎦᏯ", why: "ᎠᏍᎦᏯ (asgaya) is “man”." },
      ],
    },
    {
      id: "prefixes",
      title: "Set A prefixes — ᎦᏬᏂᎭ “is speaking”",
      particle: "Ꮵ- Ꭿ- Ꭶ-",
      summary: "Who speaks is marked on the front of the verb, not with a separate word.",
      sections: [
        {
          p: "Every Cherokee verb carries a pronoun prefix. <b>Set A</b> is common on active verbs. With the present stem for “speak”, third person is <b>ᎦᏬᏂᎭ</b> (gawoniha) “he/she is speaking”. Before a consonant: <b>Ꮵ-</b> (tsi-) I, <b>Ꭿ-</b> (hi-) you, <b>Ꭶ-</b>/<b>Ꭰ-</b> (ga-/a-) he/she, <b>ᎠᏂ-</b> (ani-) they.",
          examples: [
            ["{ᏥᏬᏂᎭ}.", "Tsiwoniha.", "I am speaking."],
            ["{ᎯᏬᏂᎭ}.", "Hiwoniha.", "You are speaking."],
            ["Ꮎ ᎠᏍᎦᏯ {ᎦᏬᏂᎭ}.", "Na asgaya gawoniha.", "That man is speaking."],
          ],
        },
        {
          h: "We and they",
          p: "Inclusive “you and I” is <b>ᎢᏂ-</b> (ini-): <b>ᎢᏂᏬᏂᎭ</b>. Inclusive “we all” is <b>ᎢᏗ-</b> (idi-). “They” is <b>ᎠᏂᏬᏂᎭ</b> (aniwoniha). You can name the language: <b>ᏣᎳᎩ ᏥᏬᏂᎭ</b> “I am speaking Cherokee”.",
          examples: [
            ["{ᎢᏂᏬᏂᎭ}.", "Iniwoniha.", "You and I are speaking."],
            ["{ᎠᏂᏬᏂᎭ}.", "Aniwoniha.", "They are speaking."],
            ["ᏣᎳᎩ {ᏥᏬᏂᎭ}.", "Tsalagi tsiwoniha.", "I am speaking Cherokee."],
          ],
        },
      ],
      drills: [
        { q: "＿ᏬᏂᎭ.", en: "I am speaking.", options: ["Ꮵ", "Ꭿ", "Ꭶ", "ᎠᏂ"], answer: "Ꮵ", why: "Set A “I” before a consonant is Ꮵ- (tsi-)." },
        { q: "＿ᏬᏂᎭ.", en: "You are speaking.", options: ["Ꭿ", "Ꮵ", "Ꭶ", "ᎢᏗ"], answer: "Ꭿ", why: "Set A “you” (one person) is Ꭿ- (hi-)." },
        { q: "Ꮎ ᎠᏍᎦᏯ ＿.", en: "That man is speaking.", options: ["ᎦᏬᏂᎭ", "ᏥᏬᏂᎭ", "ᎯᏬᏂᎭ", "ᎢᏂᏬᏂᎭ"], answer: "ᎦᏬᏂᎭ", why: "Third person present “is speaking” is ᎦᏬᏂᎭ." },
        { q: "＿ᏬᏂᎭ.", en: "They are speaking.", options: ["ᎠᏂ", "Ꮵ", "Ꭿ", "Ꭶ"], answer: "ᎠᏂ", why: "Set A “they” before a consonant is ᎠᏂ- (ani-)." },
        { q: "ᏣᎳᎩ ＿.", en: "I am speaking Cherokee.", options: ["ᏥᏬᏂᎭ", "ᎦᏬᏂᎭ", "ᎯᏬᏂᎭ", "ᎠᏂᏬᏂᎭ"], answer: "ᏥᏬᏂᎭ", why: "“I am speaking” is ᏥᏬᏂᎭ; put ᏣᎳᎩ with it for Cherokee." },
      ],
    },
    {
      id: "verbs",
      title: "Set B “want”, and “go”",
      particle: "ᎠᏆᏚᎵᎭ",
      summary: "Stative “want” takes Set B; “go” shows Set A before a vowel.",
      sections: [
        {
          p: "<b>Set B</b> is common on stative verbs. The stem <b>-aduliha</b> “want it” takes Set B before a vowel: <b>ᎠᏆᏚᎵᎭ</b> (agwaduliha) I want it, <b>ᏣᏚᎵᎭ</b> (tsaduliha) you want it, <b>ᎤᏚᎵᎭ</b> (uduliha) he/she wants it. Object nouns come first: coffee is <b>ᎧᏫ</b> (kahwi), bread <b>ᎦᏚ</b> (gadu).",
          examples: [
            ["ᎧᏫ {ᎠᏆᏚᎵᎭ}.", "Kahwi agwaduliha.", "I want coffee."],
            ["ᎦᏚ {ᏣᏚᎵᎭ}.", "Gadu tsaduliha.", "You want bread."],
            ["ᎧᏫ {ᎤᏚᎵᎭ}.", "Kahwi uduliha.", "He / she wants coffee."],
          ],
        },
        {
          h: "Going somewhere",
          p: "The verb “go” is Set A before a vowel: <b>ᎨᎦ</b> (gega) I am going, <b>ᎮᎦ</b> (hega) you are going, <b>ᎡᎦ</b> (ega) he/she is going. Ask <b>ᎭᏢ ᎮᎦ?</b> (hadlv hega?) “Where are you going?”.",
          examples: [
            ["{ᎨᎦ}.", "Gega.", "I am going."],
            ["ᎭᏢ {ᎮᎦ}?", "Hadlv hega?", "Where are you going?"],
            ["{ᎡᎦ}.", "Ega.", "He / she is going."],
          ],
        },
      ],
      drills: [
        { q: "ᎧᏫ ＿.", en: "I want coffee.", options: ["ᎠᏆᏚᎵᎭ", "ᏣᏚᎵᎭ", "ᎤᏚᎵᎭ", "ᎦᏬᏂᎭ"], answer: "ᎠᏆᏚᎵᎭ", why: "Set B “I want it” before a vowel is ᎠᏆᏚᎵᎭ (agwaduliha)." },
        { q: "ᎦᏚ ＿.", en: "You want bread.", options: ["ᏣᏚᎵᎭ", "ᎠᏆᏚᎵᎭ", "ᎤᏚᎵᎭ", "ᎨᎦ"], answer: "ᏣᏚᎵᎭ", why: "Set B “you want it” is ᏣᏚᎵᎭ (tsaduliha)." },
        { q: "ᎧᏫ ＿.", en: "He/she wants coffee.", options: ["ᎤᏚᎵᎭ", "ᎠᏆᏚᎵᎭ", "ᏣᏚᎵᎭ", "ᎯᏬᏂᎭ"], answer: "ᎤᏚᎵᎭ", why: "Set B third person “wants it” is ᎤᏚᎵᎭ (uduliha)." },
        { q: "＿.", en: "I am going.", options: ["ᎨᎦ", "ᎮᎦ", "ᎡᎦ", "ᎠᏆᏚᎵᎭ"], answer: "ᎨᎦ", why: "“I am going” is ᎨᎦ (gega)." },
        { q: "ᎭᏢ ＿?", en: "Where are you going?", options: ["ᎮᎦ", "ᎨᎦ", "ᎡᎦ", "ᏥᏬᏂᎭ"], answer: "ᎮᎦ", why: "“You are going” is ᎮᎦ (hega)." },
      ],
    },
    {
      id: "questions",
      title: "Questions — ‑Ꮝ, ‑Ꮷ, and question words",
      particle: "‑Ꮝ ‑Ꮷ",
      summary: "Yes/no markers on the verb, and words for what, who, and where.",
      sections: [
        {
          p: "Yes/no questions often add a marker on the end of a word. <b>‑Ꮝ</b> (-s) and <b>‑Ꮷ</b> (-tsu / -ju) are both used (which one you hear can depend on the community). Example: <b>ᎧᏫᏍ ᏣᏚᎵᎭ?</b> “Do you want coffee?” and <b>ᏙᎯᏧ?</b> “How are you?”",
          examples: [
            ["ᎧᏫ{Ꮝ} ᏣᏚᎵᎭ?", "Kahwis tsaduliha?", "Do you want coffee?"],
            ["ᎦᏚ{Ꮝ} ᏣᏚᎵᎭ?", "Gadus tsaduliha?", "Do you want bread?"],
            ["ᏙᎯ{Ꮷ}?", "Dohitsu?", "How are you?"],
          ],
        },
        {
          h: "What, who, where",
          p: "Question words usually come first. <b>ᎦᏙ</b> (gado) “what”, <b>ᎦᎪ</b> (gago) “who”, <b>ᎭᏢ</b> (hadlv) “where”. Tag-like <b>‑Ꭶ</b> / <b>‑Ꭷ</b> (-ga / -ka) can soften a check question (“…, right?”) in some materials; learn ‑Ꮝ and ‑Ꮷ first.",
          examples: [
            ["{ᎦᏙ} ᏕᏣᏙᎠ?", "Gado dejado'a?", "What is your name?"],
            ["{ᎦᎪ} ᎦᏬᏂᎭ?", "Gago gawoniha?", "Who is speaking?"],
            ["{ᎭᏢ} ᎮᎦ?", "Hadlv hega?", "Where are you going?"],
          ],
        },
      ],
      drills: [
        { q: "ᎧᏫ＿ ᏣᏚᎵᎭ?", en: "Do you want coffee?", options: ["Ꮝ", "Ꮷ", "Ꭶ", "Ꮓ"], answer: "Ꮝ", why: "‑Ꮝ (-s) is a yes/no question marker, as in ᎧᏫᏍ ᏣᏚᎵᎭ?" },
        { q: "＿ ᏕᏣᏙᎠ?", en: "What is your name?", options: ["ᎦᏙ", "ᎭᏢ", "ᎦᎪ", "ᎣᏏᏲ"], answer: "ᎦᏙ", why: "ᎦᏙ (gado) = what." },
        { q: "＿ ᎦᏬᏂᎭ?", en: "Who is speaking?", options: ["ᎦᎪ", "ᎦᏙ", "ᎭᏢ", "ᏂᎯ"], answer: "ᎦᎪ", why: "ᎦᎪ (gago) = who." },
        { q: "＿ ᎮᎦ?", en: "Where are you going?", options: ["ᎭᏢ", "ᎦᏙ", "ᎦᎪ", "ᎥᎥ"], answer: "ᎭᏢ", why: "ᎭᏢ (hadlv) = where." },
        { q: "Which ending asks “how are you?” in ᏙᎯ＿?", en: "", options: ["Ꮷ", "Ꮝ", "Ꭶ", "Ꮓ"], answer: "Ꮷ", why: "ᏙᎯᏧ? uses the ‑Ꮷ (-tsu) question ending." },
      ],
    },
    {
      id: "negation-numbers",
      title: "Ꮭ … negation, and numbers 1–10",
      particle: "Ꮭ",
      summary: "Say no with Ꮭ plus yi-/y- on the verb, and count from one to ten.",
      sections: [
        {
          p: "To negate a present verb, put <b>Ꮭ</b> (tla) — also written <b>ᎥᏝ</b> (vtla) — before it and add the prepronominal prefix <b>yi-</b> before a consonant or <b>y-</b> before a vowel: <b>Ꮭ ᏱᏥᏬᏂᎭ</b> “I am not speaking”, <b>Ꮭ ᏯᏆᏚᎵᎭ</b> “I do not want it”. A short phrasebook form is <b>Ꮭ ᏣᎳᎩ ᏱᏥᏬᏂ</b> “I don’t speak Cherokee”. For “is not [noun/adjective]”, materials use <b>Ꮭ … ᏱᎩ</b> (tla … yigi).",
          examples: [
            ["{Ꮭ} {Ᏹ}ᏥᏬᏂᎭ.", "Tla yitsiwoniha.", "I am not speaking."],
            ["{Ꮭ} {Ꮿ}ᏆᏚᎵᎭ.", "Tla yagwaduliha.", "I do not want it."],
            ["{Ꮭ ᏣᎳᎩ ᏱᏥᏬᏂ}.", "Tla tsalagi yitsiwoni.", "I don’t speak Cherokee."],
          ],
        },
        {
          h: "Numbers one to ten",
          p: "Cardinal numbers are separate words, not verb prefixes: <b>ᏌᏊ</b> 1, <b>ᏔᎵ</b> 2, <b>ᏦᎢ</b> 3, <b>ᏅᎩ</b> 4, <b>ᎯᏍᎩ</b> 5, <b>ᏑᏓᎵ</b> 6, <b>ᎦᎵᏉᎩ</b> 7, <b>ᏧᏁᎳ</b> 8, <b>ᏐᏁᎳ</b> 9, <b>ᏍᎪᎯ</b> 10. Seven is culturally important — there are seven Cherokee clans.",
          examples: [
            ["{ᏌᏊ}, {ᏔᎵ}, {ᏦᎢ}", "saquu, tali, tsoi", "one, two, three"],
            ["{ᏅᎩ}, {ᎯᏍᎩ}, {ᏑᏓᎵ}", "nvgi, hisgi, sudali", "four, five, six"],
            ["{ᎦᎵᏉᎩ}, {ᏧᏁᎳ}, {ᏐᏁᎳ}, {ᏍᎪᎯ}", "galiquogi, tsunela, sonela, sgohi", "seven, eight, nine, ten"],
          ],
        },
      ],
      drills: [
        { q: "＿ ᏱᏥᏬᏂᎭ.", en: "I am not speaking.", options: ["Ꮭ", "ᎥᎥ", "ᏩᏙ", "ᎣᏍᏓ"], answer: "Ꮭ", why: "Ꮭ (tla) stands before the negated verb." },
        { q: "Ꮭ ＿ᏥᏬᏂᎭ.", en: "I am not speaking. (negation prefix)", options: ["Ᏹ", "Ꮻ", "Ꮧ", "Ꭿ"], answer: "Ᏹ", why: "Before a consonant the negation prefix is yi- (Ᏹ-)." },
        { q: "Ꮭ ＿ᏆᏚᎵᎭ.", en: "I do not want it.", options: ["Ꮿ", "Ᏹ", "Ꮻ", "Ꭰ"], answer: "Ꮿ", why: "Before a vowel the negation prefix is y- (here Ꮿ- on agwaduliha → yagwaduliha)." },
        { q: "＿", en: "one", options: ["ᏌᏊ", "ᏔᎵ", "ᏦᎢ", "ᏍᎪᎯ"], answer: "ᏌᏊ", why: "ᏌᏊ (saquu) = one." },
        { q: "＿", en: "seven (sacred clan number)", options: ["ᎦᎵᏉᎩ", "ᎯᏍᎩ", "ᏑᏓᎵ", "ᏐᏁᎳ"], answer: "ᎦᎵᏉᎩ", why: "ᎦᎵᏉᎩ (galiquogi) = seven." },
        { q: "＿", en: "ten", options: ["ᏍᎪᎯ", "ᏌᏊ", "ᏅᎩ", "ᏧᏁᎳ"], answer: "ᏍᎪᎯ", why: "ᏍᎪᎯ (sgohi) = ten." },
      ],
    },
  ],
};
