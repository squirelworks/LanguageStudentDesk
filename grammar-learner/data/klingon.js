// Klingon verb prefixes for the Grammar Learner. Written for this project.
// Examples are [Klingon, gloss, English]; {braces} mark the prefix.
// Lessons with `generate` get drills built from the prefix grid below.
window.GRAMMAR = window.GRAMMAR || {};

// Who does it (rows) to whom (columns). "" is the empty prefix; a missing
// cell (I → me, you → you, we → us...) is not possible with a prefix.
const KLINGON_SUBJECTS = ["I", "you", "he/she", "we", "you all", "they"];
const KLINGON_OBJECTS = ["none", "me", "you", "him/her", "us", "you all", "them"];
const KLINGON_PREFIXES = {
  I: { none: "jI", you: "qa", "him/her": "vI", "you all": "Sa", them: "vI" },
  you: { none: "bI", me: "cho", "him/her": "Da", us: "ju", them: "Da" },
  "he/she": { none: "", me: "mu", you: "Du", "him/her": "", us: "nu", "you all": "lI", them: "" },
  we: { none: "ma", you: "pI", "him/her": "wI", "you all": "re", them: "DI" },
  "you all": { none: "Su", me: "tu", "him/her": "bo", us: "che", them: "bo" },
  they: { none: "", me: "mu", you: "nI", "him/her": "lu", us: "nu", "you all": "lI", them: "" },
};
// Commands: to whom (one listener / several listeners).
const KLINGON_IMPERATIVES = { none: ["yI", "pe"], me: ["HI", "HI"], "him/her": ["yI", "yI"], us: ["gho", "gho"], them: ["tI", "tI"] };

// [Klingon, English base, English with he/she].
const KLINGON_VERBS_TRANSITIVE = [
  ["legh", "see", "sees"],
  ["qIp", "hit", "hits"],
  ["ghel", "ask", "asks"],
  ["ja'", "tell", "tells"],
  ["Qoy", "hear", "hears"],
  ["HoH", "kill", "kills"],
  ["noH", "judge", "judges"],
];
const KLINGON_VERBS_INTRANSITIVE = [
  ["Qong", "sleep", "sleeps"],
  ["Suv", "fight", "fights"],
  ["jatlh", "speak", "speaks"],
  ["Qagh", "make a mistake", "makes a mistake"],
  ["yIn", "live", "lives"],
];

window.KLINGON_GRID = { SUBJECTS: KLINGON_SUBJECTS, OBJECTS: KLINGON_OBJECTS, PREFIXES: KLINGON_PREFIXES, IMPERATIVES: KLINGON_IMPERATIVES, TRANSITIVE: KLINGON_VERBS_TRANSITIVE, INTRANSITIVE: KLINGON_VERBS_INTRANSITIVE };

window.GRAMMAR.klingon = {
  title: "Klingon verb prefixes",
  intro: "A Klingon verb starts with a prefix that says who does the action and, at the same time, who it is done to. One syllable carries what English splits across a subject and an object. Learn the grid once and every verb opens up. Romanization is the standard Latin spelling; tick “Show pIqaD” to see each example in Klingon script.",
  lessons: [
    {
      id: "shape",
      title: "How a Klingon verb is built",
      particle: "verb",
      summary: "prefix + verb + suffixes, and the object comes first.",
      sections: [
        {
          p: "A Klingon verb is built like a train: <b>prefix</b> (who → whom) + <b>verb</b> + optional <b>suffixes</b> (not, can, question...). The prefix is required for the meaning; pronouns like jIH (I) are usually left out because the prefix already says it.",
          examples: [
            ["{jI}Qong", "jI- (I) + Qong (sleep)", "I sleep."],
            ["{jI}yajbe'", "jI- + yaj (understand) + -be' (not)", "I don't understand."],
          ],
        },
        {
          h: "Word order: object, verb, subject",
          p: "When nouns are spelled out, the object comes <i>before</i> the verb and the subject <i>after</i> it — the reverse of English. Read “puq legh yaS” as “the child — sees — the officer”: the officer sees the child.",
          examples: [
            ["puq legh yaS", "child | sees | officer", "The officer sees the child."],
            ["yaS legh puq", "officer | sees | child", "The child sees the officer."],
          ],
        },
        {
          h: "Verbs that describe",
          p: "Klingon has no separate adjectives. “Be big”, “be good” are verbs and take the same prefixes: {jI}tIn, “I am big”.",
        },
      ],
      drills: [
        { q: "In “Duj legh HoD”, who sees whom?", en: "Duj = ship, HoD = captain", options: ["The captain sees the ship.", "The ship sees the captain."], answer: "The captain sees the ship.", why: "Object first, subject last: Duj (object) legh HoD (subject)." },
        { q: "Which part of “jIQong” means “I”?", en: "", options: ["jI", "Qong", "Both together", "Neither"], answer: "jI", why: "jI- is the prefix for “I” with no object; Qong is “sleep”." },
        { q: "In “jagh Suv SuvwI'”, who fights?", en: "jagh = enemy, SuvwI' = warrior", options: ["The warrior", "The enemy"], answer: "The warrior", why: "The subject comes after the verb: SuvwI'." },
      ],
    },
    {
      id: "no-object",
      title: "Prefixes with no object",
      particle: "jI- bI- ma- Su-",
      summary: "I, you, we, you all, he/she, they — when the action has no object.",
      table: "none",
      sections: [
        {
          p: "When nothing receives the action (sleeping, fighting, being big), the prefix only names the subject. He/she/it and they take <b>no prefix at all</b>: the bare verb.",
          examples: [
            ["{jI}Qong", "I sleep", "I sleep."],
            ["{bI}Qong", "you sleep", "You sleep."],
            ["Qong", "(no prefix)", "He/she sleeps, or they sleep."],
            ["{ma}Qong", "we sleep", "We sleep."],
            ["{Su}Qong", "you all sleep", "You (all) sleep."],
          ],
        },
      ],
      generate: { kind: "none", count: 8 },
    },
    {
      id: "with-object",
      title: "Prefixes with an object",
      particle: "qa- vI- mu- Da-…",
      summary: "One prefix for “who does it to whom”.",
      table: "all",
      sections: [
        {
          p: "When the action has an object, the prefix encodes both people at once. The grid below lists every combination; you will meet the most useful ones first.",
          examples: [
            ["{qa}legh", "I → you", "I see you."],
            ["{vI}legh", "I → him/her/them", "I see him (or her, or them)."],
            ["{mu}legh", "he/she/they → me", "He/she sees me, or they see me."],
            ["{Da}legh", "you → him/her/them", "You see him (or her, or them)."],
            ["{cho}legh", "you → me", "You see me."],
            ["{wI}legh", "we → him/her", "We see him or her."],
            ["{DI}legh", "we → them", "We see them."],
            ["{lu}legh", "they → him/her", "They see him or her."],
          ],
        },
        {
          h: "Patterns that help",
          p: "Several prefixes are shared: mu- and nu- (→ me, → us) and lI- (→ you all) work for both he/she and they. vI- and Da- work for both him/her and them. The grid's empty cells (I → me, we → us) need the suffix -'egh “oneself” instead: jIlegh'egh, “I see myself”.",
        },
      ],
      generate: { kind: "object", count: 10 },
    },
    {
      id: "empty",
      title: "When there is no prefix",
      particle: "∅",
      summary: "The bare verb: he/she/it/they, with no object or a third-person one.",
      table: "all",
      sections: [
        {
          p: "A verb with no prefix has a third-person subject (he, she, it, they) and either no object or a third-person object (him, her, it, them). The nouns or the conversation tell you which.",
          examples: [
            ["legh", "(no prefix)", "He sees her / she sees it / they see them…"],
            ["Duj legh HoD", "ship | sees | captain", "The captain sees the ship."],
          ],
        },
        {
          p: "The one exception is they → him/her, which has its own prefix lu-: <b>{lu}legh</b> “they see him”.",
        },
      ],
      generate: { kind: "all", count: 10 },
    },
    {
      id: "imperative",
      title: "Commands",
      particle: "yI- pe- HI- gho- tI-",
      summary: "Telling someone to do something.",
      table: "imperative",
      sections: [
        {
          p: "Commands have their own prefixes. With no object: <b>yI-</b> to one person, <b>pe-</b> to several. With an object, the prefix names the object, whether you speak to one person or many.",
          examples: [
            ["{yI}Qong!", "(you) sleep!", "Sleep!"],
            ["{pe}Qong!", "(you all) sleep!", "Sleep, all of you!"],
            ["{HI}legh!", "(you) → me", "Look at me!"],
            ["{gho}ja'!", "(you) → us", "Tell us!"],
            ["{yI}Suv!", "(you) fight!", "Fight!"],
            ["{tI}legh!", "(you) → them", "Look at them!"],
          ],
        },
      ],
      generate: { kind: "imperative", count: 8 },
    },
  ],
};
