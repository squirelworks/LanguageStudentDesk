// Inuktitut first grammar for the Grammar Learner. Written for this project.
// Examples are [syllabics, ICI Roman orthography, English]; {braces} mark the point of the lesson.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
//
// Sources (open / educational; accuracy over volume — no invented forms):
// - Inuit Uqausinginnik Taiguusiliuqtiit, Inuktut Uqausingit Aqqiksuutingit / Inuktut Grammar
//   (August 2018 download PDF), https://www.taiguusiliuqtiit.ca/sites/default/files/2018-09/Grammar%20Book_Aug2018_download.pdf
//   — noun endings (iglu paradigm: -mik, -mi, -mit, -mut), possession (anaanaga / anaanait /
//   anaananga; -up; Inuit nunangat), location questions (nani / namut / nakit), statement and
//   question verb endings (anijunga / nirijutit / nirivit; -junga~-tunga tables), -nngit- negatives.
// - Wikipedia “Inuit grammar” (CC BY-SA): indicative person table in syllabics (ᐊᓂᔪᖓ …),
//   -nngit- (ᖁᕕᐊᓱᙱᑦᑐᖓ quviasunngittunga, ᓴᓇᙱᑦᑐᖅ sananngittuq), pisuk- as a state verb.
// - Wiktionary (CC BY-SA): ᐃᒡᓗ iglu “house”, ᐃᓄᒃ inuk / ᐃᓄᐃᑦ inuit, ᐊᓈᓇ anaana, lemma glosses.
// - Inuktut Tusaalanga (Pirurvik / tusaalanga.ca) grammar topic index for pedagogical framing
//   (noun endings, possession, -mi/-mut/-mit, simple verb endings, questions, the negative).
// - This repo’s languages/inuktitut/vocab.js and reference.json (greetings, people, land words,
//   and syllabics already used on the Desk: qanuippit, qanuinngittunga, nunavut, …).
// - SquirrelGo Alphabets syllabics example: ᐱᓱᒃᑐᖅ pisuktuq “he or she walks”.
// Romanization follows the Inuit Cultural Institute (ICI) standard used in Nunavut materials.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.inuktitut = {
  title: "Inuktitut first grammar",
  intro: "Inuktitut (ᐃᓄᒃᑎᑐᑦ, Inuktitut) builds a whole English sentence inside one word: a root, then endings for who, where, and whether. These lessons cover noun number, possession, the place endings ‑mi / ‑mut / ‑mit, present verb person endings, questions, and negation with ‑nngit‑. Examples use Canadian Aboriginal syllabics with ICI Roman orthography; there is no tone to mark.",
  lessons: [
    {
      id: "nouns",
      title: "Nouns: one, two, and many",
      particle: "-uk -t",
      summary: "The basic form, the dual, the plural, and ‑mik when something is an object.",
      sections: [
        {
          p: "A noun in its basic form names one thing as the subject: <b>ᐃᒡᓗ</b> (iglu) “house”, <b>ᐃᓄᒃ</b> (inuk) “person”, <b>ᐊᕐᓇᖅ</b> (arnaq) “woman”. Two of something take a dual ending (often <b>-uk</b> or <b>-ak</b>): <b>ᐃᒡᓘᒃ</b> (igluuk), <b>ᐃᓅᒃ</b> (inuuk), <b>ᐊᕐᓈᒃ</b> (arnaak). Three or more take a plural ending (often <b>-t</b> or <b>-it</b>): <b>ᐃᒡᓗᑦ</b> (iglut), <b>ᐃᓄᐃᑦ</b> (inuit), <b>ᐊᕐᓇᐃᑦ</b> (arnait).",
          examples: [
            ["{ᐃᒡᓗ}, {ᐃᒡᓘᒃ}, {ᐃᒡᓗᑦ}", "iglu, igluuk, iglut", "house; two houses; houses"],
            ["{ᐃᓄᒃ}, {ᐃᓅᒃ}, {ᐃᓄᐃᑦ}", "inuk, inuuk, inuit", "person; two people; people (Inuit)"],
            ["{ᐊᕐᓇᖅ}, {ᐊᕐᓈᒃ}, {ᐊᕐᓇᐃᑦ}", "arnaq, arnaak, arnait", "woman; two women; women"],
          ],
        },
        {
          h: "The object ending ‑mik",
          p: "When a singular noun is an indefinite object, it often takes <b>‑mik</b>: <b>ᐃᒡᓗᒥᒃ</b> (iglumik). Dual and plural objects use related endings (‑ngnik / ‑nik). The same stem without ‑mik is the basic subject form.",
          examples: [
            ["{ᐃᒡᓗᒥᒃ}", "iglumik", "a house (as object)"],
            ["{ᓄᓇ}", "nuna", "land (basic form)"],
            ["{ᐊᖑᑦ}, {ᐊᖑᑎᑦ}", "angut, angutit", "man; men"],
          ],
        },
      ],
      drills: [
        { q: "＿, igluuk, iglut", en: "house (one)", options: ["ᐃᒡᓗ", "ᐃᒡᓗᑦ", "ᐃᒡᓗᒥ", "ᐃᓄᒃ"], answer: "ᐃᒡᓗ", why: "The basic singular is iglu (ᐃᒡᓗ)." },
        { q: "iglu, ＿, iglut", en: "two houses", options: ["ᐃᒡᓘᒃ", "ᐃᒡᓗᑦ", "ᐃᒡᓗᒥᒃ", "ᐃᒡᓗᒧᑦ"], answer: "ᐃᒡᓘᒃ", why: "The dual of iglu is igluuk (ᐃᒡᓘᒃ)." },
        { q: "inuk → ＿", en: "people (three or more)", options: ["ᐃᓄᐃᑦ", "ᐃᓅᒃ", "ᐃᓄᒃ", "ᐊᕐᓇᐃᑦ"], answer: "ᐃᓄᐃᑦ", why: "The plural of inuk is inuit (ᐃᓄᐃᑦ)." },
        { q: "arnaq → ＿", en: "women", options: ["ᐊᕐᓇᐃᑦ", "ᐊᕐᓈᒃ", "ᐊᕐᓇᖅ", "ᐃᓄᐃᑦ"], answer: "ᐊᕐᓇᐃᑦ", why: "arnaq → arnait (ᐊᕐᓇᐃᑦ) in the plural." },
        { q: "iglu as an object often takes ＿.", en: "house (object)", options: ["ᐃᒡᓗᒥᒃ", "ᐃᒡᓗᒥ", "ᐃᒡᓗᑦ", "ᐃᒡᓘᒃ"], answer: "ᐃᒡᓗᒥᒃ", why: "Singular indefinite objects commonly take ‑mik: iglumik." },
      ],
    },
    {
      id: "possession",
      title: "Possession: my, your, their",
      particle: "-ga -it -nga",
      summary: "Endings on the noun say whose it is; ‑up marks a named singular owner.",
      sections: [
        {
          p: "Possession sits on the thing owned. For one owned item: <b>‑ga</b> “my”, <b>‑it</b> “your” (one person), <b>‑nga</b> “his/her/its”. So <b>ᐊᓈᓇ</b> (anaana) “mother” → <b>ᐊᓈᓇᒐ</b> (anaanaga) “my mother”, <b>ᐊᓈᓇᐃᑦ</b> (anaanait) “your mother”, <b>ᐊᓈᓇᖓ</b> (anaananga) “his/her mother”. The same pattern gives <b>ᐊᑖᑕᒐ</b> (ataataga) “my father”.",
          examples: [
            ["{ᐊᓈᓇᒐ}", "anaanaga", "my mother"],
            ["{ᐊᓈᓇᐃᑦ}", "anaanait", "your mother"],
            ["{ᐊᓈᓇᖓ}", "anaananga", "his/her mother"],
            ["{ᐊᑖᑕᒐ}", "ataataga", "my father"],
          ],
        },
        {
          h: "Our land, and naming the owner",
          p: "<b>ᓄᓇᕗᑦ</b> (nunavut) is “our land” (the name of the territory). When a singular noun owns something, the owner can take <b>‑up</b> and the owned noun takes a third-person possessive: <b>ᐃᒡᓘᑉ ᐸᐊᖓ</b> (igluup paanga) “the door of the house”. With a plural owner there is no ‑up: <b>ᐃᓄᐃᑦ ᓄᓇᖓᑦ</b> (Inuit nunangat) “the land of Inuit”.",
          examples: [
            ["{ᓄᓇᕗᑦ}", "nunavut", "our land"],
            ["{ᐃᒡᓘᑉ} ᐹᖓ", "igluup paanga", "the door of the house"],
            ["ᐃᓄᐃᑦ {ᓄᓇᖓᑦ}", "Inuit nunangat", "the land of Inuit"],
          ],
        },
      ],
      drills: [
        { q: "anaana → ＿", en: "my mother", options: ["ᐊᓈᓇᒐ", "ᐊᓈᓇᐃᑦ", "ᐊᓈᓇᖓ", "ᐊᑖᑕᒐ"], answer: "ᐊᓈᓇᒐ", why: "‑ga on the noun: anaanaga “my mother”." },
        { q: "＿ = your mother", en: "your mother", options: ["ᐊᓈᓇᐃᑦ", "ᐊᓈᓇᒐ", "ᐊᓈᓇᖓ", "ᓄᓇᕗᑦ"], answer: "ᐊᓈᓇᐃᑦ", why: "‑it is “your” (one person): anaanait." },
        { q: "＿ = his/her mother", en: "his or her mother", options: ["ᐊᓈᓇᖓ", "ᐊᓈᓇᒐ", "ᐊᓈᓇᐃᑦ", "ᐊᑖᑕᒐ"], answer: "ᐊᓈᓇᖓ", why: "‑nga is “his/her/its”: anaananga." },
        { q: "ataata → ＿", en: "my father", options: ["ᐊᑖᑕᒐ", "ᐊᓈᓇᒐ", "ᐊᑖᑕᖓ", "ᓄᓇᕗᑦ"], answer: "ᐊᑖᑕᒐ", why: "ataataga = my father." },
        { q: "“Our land” is ＿.", en: "our land", options: ["ᓄᓇᕗᑦ", "ᓄᓇ", "ᐃᓄᐃᑦ", "ᐃᒡᓗᒐ"], answer: "ᓄᓇᕗᑦ", why: "nunavut means our land." },
      ],
    },
    {
      id: "places",
      title: "In, to, and from: ‑mi, ‑mut, ‑mit",
      particle: "-mi -mut -mit",
      summary: "Four place endings on people, places and things, and the matching question words.",
      sections: [
        {
          p: "Attach these endings to a noun: <b>‑mi</b> “at / in / on”, <b>‑mut</b> “to”, <b>‑mit</b> “from”, and <b>‑kkut</b> “through / by way of”. On <b>ᐃᒡᓗ</b>: <b>ᐃᒡᓗᒥ</b> (iglumi) “in the house”, <b>ᐃᒡᓗᒧᑦ</b> (iglumut) “to the house”, <b>ᐃᒡᓗᒥᑦ</b> (iglumit) “from the house”. After a dual or plural stem they become <b>‑ni / ‑nut / ‑nit</b> (igluni, iglunut, iglunit).",
          examples: [
            ["{ᐃᒡᓗᒥ}", "iglumi", "in / at the house"],
            ["{ᐃᒡᓗᒧᑦ}", "iglumut", "to the house"],
            ["{ᐃᒡᓗᒥᑦ}", "iglumit", "from the house"],
          ],
        },
        {
          h: "Where? To where? From where?",
          p: "The matching question words are <b>ᓇᓂ?</b> (nani?) “where?”, <b>ᓇᒧᑦ?</b> (namut?) “to where?”, <b>ᓇᑭᑦ?</b> (nakit?) “from where?”, and <b>naukkut?</b> “through where / by what means?”. Place names take the same endings: <b>Iglulingmit</b> “from Iglulik”.",
          examples: [
            ["{ᓇᓂ}?", "nani?", "where?"],
            ["{ᓇᒧᑦ}?", "namut?", "to where?"],
            ["{ᓇᑭᑦ}?", "nakit?", "from where?"],
          ],
        },
      ],
      drills: [
        { q: "iglu + in/at → ＿", en: "in the house", options: ["ᐃᒡᓗᒥ", "ᐃᒡᓗᒧᑦ", "ᐃᒡᓗᒥᑦ", "ᐃᒡᓗᒥᒃ"], answer: "ᐃᒡᓗᒥ", why: "‑mi = in/at/on: iglumi." },
        { q: "iglu + to → ＿", en: "to the house", options: ["ᐃᒡᓗᒧᑦ", "ᐃᒡᓗᒥ", "ᐃᒡᓗᒥᑦ", "ᐃᒡᓗᑦ"], answer: "ᐃᒡᓗᒧᑦ", why: "‑mut = to: iglumut." },
        { q: "iglu + from → ＿", en: "from the house", options: ["ᐃᒡᓗᒥᑦ", "ᐃᒡᓗᒥ", "ᐃᒡᓗᒧᑦ", "ᐃᒡᓗᒥᒃ"], answer: "ᐃᒡᓗᒥᑦ", why: "‑mit = from: iglumit." },
        { q: "＿?", en: "Where?", options: ["ᓇᓂ", "ᓇᒧᑦ", "ᓇᑭᑦ", "ᓱᓇ"], answer: "ᓇᓂ", why: "nani? asks where (locative)." },
        { q: "＿?", en: "To where?", options: ["ᓇᒧᑦ", "ᓇᓂ", "ᓇᑭᑦ", "ᑭᓇ"], answer: "ᓇᒧᑦ", why: "namut? matches the ‑mut ending." },
      ],
    },
    {
      id: "verbs",
      title: "Present verbs: who does it",
      particle: "-junga -jutit -juq",
      summary: "Statement endings mark the person on the verb; j after a vowel, t after a consonant.",
      sections: [
        {
          p: "Every verb needs a root and an ending. Statement endings after a vowel begin with <b>j</b>: <b>‑junga</b> (I), <b>‑jutit</b> (you, one), <b>‑juq</b> (he/she/it), <b>‑jugut</b> (we, 3+), <b>‑jut</b> (they, 3+). So from <b>ani‑</b> “go out”: <b>ᐊᓂᔪᖓ</b> (anijunga), <b>ᐊᓂᔪᑎᑦ</b> (anijutit), <b>ᐊᓂᔪᖅ</b> (anijuq). From <b>niri‑</b> “eat”: <b>ᓂᕆᔪᑎᑦ</b> (nirijutit) “you are eating”.",
          examples: [
            ["{ᐊᓂᔪᖓ}", "anijunga", "I go / have just gone out"],
            ["{ᐊᓂᔪᑎᑦ}", "anijutit", "you (one) go out"],
            ["{ᐊᓂᔪᖅ}", "anijuq", "he/she/it goes out"],
            ["{ᓂᕆᔪᑎᑦ}", "nirijutit", "you are eating"],
          ],
        },
        {
          h: "After a consonant: ‑tunga, ‑tuq",
          p: "After a stem that ends in a consonant, the same endings begin with <b>t</b>: <b>ᐱᓱᒃᑐᖅ</b> (pisuktuq) “he/she walks”, <b>ᐱᓱᒃᑐᖓ</b> (pisuktunga) “I walk”, <b>ᐱᓱᒃᑐᒍᑦ</b> (pisuktugut) “we walk”. <b>ᐅᓪᓚᒃᑐᖓ</b> (ullaktunga) is “I run”. <b>ᑕᖃᔪᒍᑦ</b> (taqajugut) “we are tired” and <b>ᖁᕕᐊᓱᒃᑐᑦ</b> (quviasuktut) “they are happy” show the same person endings on other roots.",
          examples: [
            ["{ᐱᓱᒃᑐᖅ}", "pisuktuq", "he/she walks"],
            ["{ᐱᓱᒃᑐᖓ}", "pisuktunga", "I walk"],
            ["{ᐱᓱᒃᑐᒍᑦ}", "pisuktugut", "we (3+) walk"],
            ["{ᐅᓪᓚᒃᑐᖓ}", "ullaktunga", "I run"],
          ],
        },
      ],
      drills: [
        { q: "ani‑ + I → ＿", en: "I go out", options: ["ᐊᓂᔪᖓ", "ᐊᓂᔪᑎᑦ", "ᐊᓂᔪᖅ", "ᐊᓂᔪᒍᑦ"], answer: "ᐊᓂᔪᖓ", why: "‑junga after a vowel: anijunga." },
        { q: "ani‑ + you (one) → ＿", en: "you go out", options: ["ᐊᓂᔪᑎᑦ", "ᐊᓂᔪᖓ", "ᐊᓂᔪᖅ", "ᐱᓱᒃᑐᖅ"], answer: "ᐊᓂᔪᑎᑦ", why: "‑jutit is you (singular)." },
        { q: "ani‑ + he/she → ＿", en: "he or she goes out", options: ["ᐊᓂᔪᖅ", "ᐊᓂᔪᖓ", "ᐊᓂᔪᑎᑦ", "ᐊᓂᔪᑦ"], answer: "ᐊᓂᔪᖅ", why: "‑juq is he/she/it." },
        { q: "pisuk‑ + he/she → ＿", en: "he or she walks", options: ["ᐱᓱᒃᑐᖅ", "ᐱᓱᒃᑐᖓ", "ᐊᓂᔪᖅ", "ᓂᕆᔪᖅ"], answer: "ᐱᓱᒃᑐᖅ", why: "After a consonant the ending is ‑tuq: pisuktuq." },
        { q: "pisuk‑ + we (3+) → ＿", en: "we walk", options: ["ᐱᓱᒃᑐᒍᑦ", "ᐱᓱᒃᑐᖓ", "ᐱᓱᒃᑐᖅ", "ᐊᓂᔪᒍᑦ"], answer: "ᐱᓱᒃᑐᒍᑦ", why: "‑tugut after a consonant: pisuktugut." },
      ],
    },
    {
      id: "questions",
      title: "Asking questions",
      particle: "-vit? -pit?",
      summary: "Question endings on the verb, plus who / what / where words.",
      sections: [
        {
          p: "Yes/no questions use a different set of endings. After a vowel, “are you …?” is often <b>‑vit?</b>: <b>ᓂᕆᕕᑦ?</b> (nirivit?) “Are you eating?”. After a consonant it is <b>‑pit?</b> (as in the greeting <b>ᖃᓄᐃᑉᐱᑦ?</b> qanuippit? “How are you?”). Third person uses <b>‑va?</b> / <b>‑pa?</b>.",
          examples: [
            ["{ᓂᕆᕕᑦ}?", "nirivit?", "Are you eating?"],
            ["{ᖃᓄᐃᑉᐱᑦ}?", "qanuippit?", "How are you?"],
            ["ᓂᕆᔪᑎᑦ / {ᓂᕆᕕᑦ}?", "nirijutit / nirivit?", "You are eating. / Are you eating?"],
          ],
        },
        {
          h: "Who, what, where",
          p: "Content questions start with a question word: <b>ᑭᓇ?</b> (kina?) “who?”, <b>ᓱᓇ?</b> (suna?) “what?”, and for place <b>ᓇᓂ?</b> (nani?) “where?” (also <b>ᓇᐅᒃ?</b> nauk? in everyday speech). Answers to kina? can be a pronoun such as <b>uvanga</b> “me” or <b>ivvit</b> “you”.",
          examples: [
            ["{ᑭᓇ}?", "kina?", "who?"],
            ["{ᓱᓇ}?", "suna?", "what?"],
            ["{ᓇᓂ}?", "nani?", "where?"],
          ],
        },
      ],
      drills: [
        { q: "＿?", en: "Are you eating?", options: ["ᓂᕆᕕᑦ", "ᓂᕆᔪᑎᑦ", "ᓂᕆᔪᖓ", "ᓂᕆᔪᖅ"], answer: "ᓂᕆᕕᑦ", why: "The question ending ‑vit? gives nirivit?" },
        { q: "Statement “you are eating” is ＿.", en: "you are eating", options: ["ᓂᕆᔪᑎᑦ", "ᓂᕆᕕᑦ", "ᓂᕆᔪᖓ", "ᐊᓂᔪᑎᑦ"], answer: "ᓂᕆᔪᑎᑦ", why: "Statement ‑jutit vs question ‑vit." },
        { q: "＿?", en: "How are you?", options: ["ᖃᓄᐃᑉᐱᑦ", "ᓂᕆᕕᑦ", "ᓱᓇ", "ᐄ"], answer: "ᖃᓄᐃᑉᐱᑦ", why: "qanuippit? is the everyday greeting question." },
        { q: "＿?", en: "Who?", options: ["ᑭᓇ", "ᓱᓇ", "ᓇᓂ", "ᓇᒧᑦ"], answer: "ᑭᓇ", why: "kina? = who?" },
        { q: "＿?", en: "What?", options: ["ᓱᓇ", "ᑭᓇ", "ᓇᓂ", "ᓇᑭᑦ"], answer: "ᓱᓇ", why: "suna? = what?" },
      ],
    },
    {
      id: "negation",
      title: "Saying no: ‑nngit‑",
      particle: "-nngit-",
      summary: "The affix ‑nngit‑ negates the verb; ᐄ and ᐋᒃᑲ answer yes and no.",
      sections: [
        {
          p: "Put <b>‑nngit‑</b> in the verb before the person ending. It deletes a preceding consonant, and the statement ending then begins with <b>t</b>: <b>ᖁᕕᐊᓱᙱᑦᑐᖓ</b> (quviasunngittunga) “I am not happy”, <b>ᓴᓇᙱᑦᑐᖅ</b> (sananngittuq) “he/she does not work”, <b>ᐊᓂᙱᑦᑐᖓ</b> (aninngittunga) “I am not going out”. The everyday answer <b>ᖃᓄᐃᙱᑦᑐᖓ</b> (qanuinngittunga) “I’m fine” is literally “I am not (feeling) somehow”.",
          examples: [
            ["{ᖁᕕᐊᓱᙱᑦᑐᖓ}", "quviasunngittunga", "I am not happy"],
            ["{ᓴᓇᙱᑦᑐᖅ}", "sananngittuq", "he/she does not work"],
            ["{ᐊᓂᙱᑦᑐᖓ}", "aninngittunga", "I am not going out"],
            ["{ᖃᓄᐃᙱᑦᑐᖓ}", "qanuinngittunga", "I'm fine (lit. I am not somehow)"],
          ],
        },
        {
          h: "Yes and no",
          p: "On their own, <b>ᐄ</b> (ii) is “yes” and <b>ᐋᒃᑲ</b> (aakka) is “no”. Negative questions also build on ‑nngit‑ with their own endings (for example pinngilaq? “is it not?”), but the plain ‑nngit‑ + statement ending is the pattern to learn first.",
          examples: [
            ["{ᐄ}.", "Ii.", "Yes."],
            ["{ᐋᒃᑲ}.", "Aakka.", "No."],
            ["ᓴᓇᔪᖅ / {ᓴᓇᙱᑦᑐᖅ}", "sanajuq / sananngittuq", "he/she works / does not work"],
          ],
        },
      ],
      drills: [
        { q: "quviasuk‑ + not + I → ＿", en: "I am not happy", options: ["ᖁᕕᐊᓱᙱᑦᑐᖓ", "ᖁᕕᐊᓱᒃᑐᖓ", "ᓴᓇᙱᑦᑐᖅ", "ᖃᓄᐃᙱᑦᑐᖓ"], answer: "ᖁᕕᐊᓱᙱᑦᑐᖓ", why: "‑nngit‑ before ‑tunga: quviasunngittunga." },
        { q: "sana‑ + not + he/she → ＿", en: "he or she does not work", options: ["ᓴᓇᙱᑦᑐᖅ", "ᓴᓇᔪᖅ", "ᐊᓂᙱᑦᑐᖓ", "ᐋᒃᑲ"], answer: "ᓴᓇᙱᑦᑐᖅ", why: "sananngittuq = he/she does not work." },
        { q: "＿.", en: "I'm fine.", options: ["ᖃᓄᐃᙱᑦᑐᖓ", "ᖃᓄᐃᑉᐱᑦ", "ᐄ", "ᖁᕕᐊᓱᒃᑐᖅ"], answer: "ᖃᓄᐃᙱᑦᑐᖓ", why: "qanuinngittunga uses ‑nngit‑ in the stock reply." },
        { q: "＿", en: "Yes.", options: ["ᐄ", "ᐋᒃᑲ", "ᓱᓇ", "ᓇᓂ"], answer: "ᐄ", why: "ii (ᐄ) is yes." },
        { q: "＿", en: "No.", options: ["ᐋᒃᑲ", "ᐄ", "ᓴᓇᔪᖅ", "ᑭᓇ"], answer: "ᐋᒃᑲ", why: "aakka (ᐋᒃᑲ) is no." },
      ],
    },
  ],
};
