// Tamazight first grammar for the Grammar Learner. Written for this project.
// Standard Moroccan Tamazight in Tifinagh. Examples are [Tifinagh, Latin transcription, English];
// {braces} mark the point of the lesson. Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.tamazight = {
  title: "Tamazight first grammar",
  intro: "Tamazight is the Amazigh (Berber) language of Morocco, written in Tifinagh. Nouns are masculine or feminine, and a feminine noun is usually wrapped in t…t. Plurals change both ends of the word, “my” and “your” follow the noun, and verbs show the person with prefixes and endings. The Latin transcription is the official one: c is sh, x is kh, ɣ is a throaty r, and a dot under a letter marks an emphatic sound.",
  lessons: [
    {
      id: "pronouns",
      title: "I, you, and ⴷ “is”",
      particle: "ⵏⴽⴽ ⴽⵢⵢⵉ ⴷ",
      summary: "The pronouns, and ⴷ, which links a person to what they are.",
      sections: [
        {
          p: "<b>ⵏⴽⴽ</b> (nkk) I, <b>ⴽⵢⵢⵉ</b> (kyyi) you (to a man), <b>ⴽⵎⵎⵉ</b> (kmmi) you (to a woman), <b>ⵏⵜⵜⴰ</b> (ntta) he, <b>ⵏⵜⵜⴰⵜ</b> (nttat) she, <b>ⵏⴽⵏⵉ</b> (nkni) we, <b>ⵏⵜⵏⵉ</b> (ntni) they (men or mixed), <b>ⵏⵜⵏⵜⵉ</b> (ntnti) they (women). To say “I am a …”, put <b>ⴷ</b> (d) between: ⵏⴽⴽ ⴷ ⴰⵏⵍⵎⴰⴷ.",
          examples: [
            ["{ⵏⴽⴽ} ⴷ ⴰⵏⵍⵎⴰⴷ.", "Nkk d anlmad.", "I am a student."],
            ["ⵏⵜⵜⴰⵜ {ⴷ} ⵜⴰⵙⵍⵎⴰⴷⵜ.", "Nttat d taslmadt.", "She is a teacher."],
            ["{ⵏⴽⵏⵉ} ⴷ ⵉⵎⴰⵣⵉⵖⵏ.", "Nkni d imaziɣn.", "We are Amazigh."],
          ],
        },
      ],
      drills: [
        { q: "＿ ⴷ ⴰⵏⵍⵎⴰⴷ.", en: "I am a student.", options: ["ⵏⴽⴽ", "ⵏⵜⵜⴰ", "ⵏⵜⵜⴰⵜ", "ⵏⴽⵏⵉ"], answer: "ⵏⴽⴽ", why: "ⵏⴽⴽ = I." },
        { q: "ⵏⵜⵜⴰⵜ ＿ ⵜⴰⵙⵍⵎⴰⴷⵜ.", en: "She is a teacher.", options: ["ⴷ", "ⵓⵔ", "ⵏ", "ⴳ"], answer: "ⴷ", why: "ⴷ links a person to what they are." },
        { q: "＿ ⴷ ⴰⵙⵍⵎⴰⴷ.", en: "He is a teacher.", options: ["ⵏⵜⵜⴰ", "ⵏⵜⵜⴰⵜ", "ⴽⵎⵎⵉ", "ⵏⴽⵏⵉ"], answer: "ⵏⵜⵜⴰ", why: "ⵏⵜⵜⴰ = he; ⵏⵜⵜⴰⵜ = she." },
        { q: "＿ ⴷ ⵉⵎⴰⵣⵉⵖⵏ.", en: "We are Amazigh.", options: ["ⵏⴽⵏⵉ", "ⵏⴽⴽ", "ⵏⵜⵜⴰ", "ⴽⵢⵢⵉ"], answer: "ⵏⴽⵏⵉ", why: "ⵏⴽⵏⵉ = we." },
        { q: "＿ ⴷ ⴰⵏⵍⵎⴰⴷ?", en: "Are you a student? (to a man)", options: ["ⴽⵢⵢⵉ", "ⴽⵎⵎⵉ", "ⵏⵜⵜⴰⵜ", "ⵏⴽⵏⵉ"], answer: "ⴽⵢⵢⵉ", why: "ⴽⵢⵢⵉ is “you” to a man; ⴽⵎⵎⵉ to a woman." },
      ],
    },
    {
      id: "gender",
      title: "Masculine and feminine",
      particle: "ⴰ… ⵜ…ⵜ",
      summary: "Masculine nouns usually start with a vowel; feminine ones are wrapped in t…t.",
      sections: [
        {
          p: "Most masculine nouns begin with <b>ⴰ</b> (a), <b>ⵉ</b> (i) or <b>ⵓ</b> (u). The feminine adds <b>ⵜ</b> (t) at both ends: ⴰⵏⵍⵎⴰⴷ (anlmad) male student → <b>ⵜⴰⵏⵍⵎⴰⴷⵜ</b> (tanlmadt) female student. The same t…t also makes things small: ⴰⴷⵔⴰⵔ (adrar) mountain → <b>ⵜⴰⴷⵔⴰⵔⵜ</b> (tadrart) hill. The name of the language, <b>ⵜⴰⵎⴰⵣⵉⵖⵜ</b>, is the feminine of ⴰⵎⴰⵣⵉⵖ.",
          examples: [
            ["ⵏⵜⵜⴰ ⴷ {ⴰ}ⵙⵍⵎⴰⴷ.", "Ntta d aslmad.", "He is a teacher."],
            ["ⵏⵜⵜⴰⵜ ⴷ {ⵜ}ⴰⵙⵍⵎⴰⴷ{ⵜ}.", "Nttat d taslmadt.", "She is a teacher."],
            ["ⵏⴽⴽ ⴷ {ⵜ}ⴰⵎⴰⵣⵉⵖ{ⵜ}.", "Nkk d tamaziɣt.", "I am Amazigh. (said by a woman)"],
          ],
        },
      ],
      drills: [
        { q: "ⵏⵜⵜⴰⵜ ⴷ ＿.", en: "She is a student.", options: ["ⵜⴰⵏⵍⵎⴰⴷⵜ", "ⴰⵏⵍⵎⴰⴷ", "ⵉⵏⵍⵎⴰⴷⵏ", "ⵜⵉⵏⵍⵎⴰⴷⵉⵏ"], answer: "ⵜⴰⵏⵍⵎⴰⴷⵜ", why: "Feminine: ⵜ + ⴰⵏⵍⵎⴰⴷ + ⵜ." },
        { q: "ⵏⴽⴽ ⴷ ＿.", en: "I am Amazigh. (said by a woman)", options: ["ⵜⴰⵎⴰⵣⵉⵖⵜ", "ⴰⵎⴰⵣⵉⵖ", "ⵉⵎⴰⵣⵉⵖⵏ", "ⵜⴰⴷⴷⴰⵔⵜ"], answer: "ⵜⴰⵎⴰⵣⵉⵖⵜ", why: "A woman uses the feminine, wrapped in ⵜ…ⵜ." },
        { q: "ⵏⵜⵜⴰ ⴷ ＿.", en: "He is a teacher.", options: ["ⴰⵙⵍⵎⴰⴷ", "ⵜⴰⵙⵍⵎⴰⴷⵜ", "ⵜⴰⵏⵍⵎⴰⴷⵜ", "ⵜⴰⵎⵖⴰⵔⵜ"], answer: "ⴰⵙⵍⵎⴰⴷ", why: "Masculine: no ⵜ…ⵜ." },
        { q: "＿", en: "a hill (a small mountain)", options: ["ⵜⴰⴷⵔⴰⵔⵜ", "ⴰⴷⵔⴰⵔ", "ⵜⴰⴷⴷⴰⵔⵜ", "ⴰⵙⵉⴼ"], answer: "ⵜⴰⴷⵔⴰⵔⵜ", why: "ⵜ…ⵜ around a masculine noun can also mean “small”." },
        { q: "Which of these nouns is masculine?", en: "", options: ["ⴰⵔⴳⴰⵣ", "ⵜⴰⵎⵖⴰⵔⵜ", "ⵜⴰⴷⴷⴰⵔⵜ", "ⵜⴰⵎⴰⵣⵉⵖⵜ"], answer: "ⴰⵔⴳⴰⵣ", why: "ⴰⵔⴳⴰⵣ (man) starts with ⴰ and has no ⵜ…ⵜ." },
      ],
    },
    {
      id: "plural",
      title: "Plurals",
      particle: "ⵉ…ⵏ ⵜⵉ…ⵉⵏ",
      summary: "Masculine plurals often go a… → i…n; feminine ta…t → ti…in.",
      sections: [
        {
          p: "A common masculine plural changes the first <b>ⴰ</b> to <b>ⵉ</b> and adds <b>ⵏ</b>: ⴰⵏⵍⵎⴰⴷ → <b>ⵉⵏⵍⵎⴰⴷⵏ</b> (inlmadn) students. A common feminine plural changes <b>ⵜⴰ…ⵜ</b> to <b>ⵜⵉ…ⵉⵏ</b>: ⵜⴰⵏⵍⵎⴰⴷⵜ → <b>ⵜⵉⵏⵍⵎⴰⴷⵉⵏ</b> (tinlmadin). Some plurals are irregular: ⵜⴰⵎⵖⴰⵔⵜ (woman) → ⵜⵉⵎⵖⴰⵔⵉⵏ, but ⴰⴷⵔⴰⵔ (mountain) → ⵉⴷⵓⵔⴰⵔ.",
          examples: [
            ["ⵏⵜⵏⵉ ⴷ {ⵉ}ⵏⵍⵎⴰⴷ{ⵏ}.", "Ntni d inlmadn.", "They are students."],
            ["ⵏⵜⵏⵜⵉ ⴷ {ⵜⵉ}ⵏⵍⵎⴰⴷ{ⵉⵏ}.", "Ntnti d tinlmadin.", "They (women) are students."],
            ["{ⵉ}ⵔⴳⴰⵣ{ⵏ} ⴷ {ⵜⵉ}ⵎⵖⴰⵔ{ⵉⵏ}", "irgazn d timɣarin", "men and women"],
          ],
        },
      ],
      drills: [
        { q: "ⵏⵜⵏⵉ ⴷ ＿.", en: "They are students.", options: ["ⵉⵏⵍⵎⴰⴷⵏ", "ⴰⵏⵍⵎⴰⴷ", "ⵜⵉⵏⵍⵎⴰⴷⵉⵏ", "ⵜⴰⵏⵍⵎⴰⴷⵜ"], answer: "ⵉⵏⵍⵎⴰⴷⵏ", why: "Masculine plural: ⵉ…ⵏ." },
        { q: "ⵏⵜⵏⵜⵉ ⴷ ＿.", en: "They (women) are students.", options: ["ⵜⵉⵏⵍⵎⴰⴷⵉⵏ", "ⵉⵏⵍⵎⴰⴷⵏ", "ⵜⴰⵏⵍⵎⴰⴷⵜ", "ⴰⵏⵍⵎⴰⴷ"], answer: "ⵜⵉⵏⵍⵎⴰⴷⵉⵏ", why: "Feminine plural: ⵜⵉ…ⵉⵏ." },
        { q: "＿", en: "men", options: ["ⵉⵔⴳⴰⵣⵏ", "ⴰⵔⴳⴰⵣ", "ⵜⵉⵎⵖⴰⵔⵉⵏ", "ⵜⴰⵎⵖⴰⵔⵜ"], answer: "ⵉⵔⴳⴰⵣⵏ", why: "ⴰⵔⴳⴰⵣ → ⵉⵔⴳⴰⵣⵏ." },
        { q: "＿", en: "women", options: ["ⵜⵉⵎⵖⴰⵔⵉⵏ", "ⵜⴰⵎⵖⴰⵔⵜ", "ⵉⵔⴳⴰⵣⵏ", "ⴰⵔⴳⴰⵣ"], answer: "ⵜⵉⵎⵖⴰⵔⵉⵏ", why: "ⵜⴰⵎⵖⴰⵔⵜ → ⵜⵉⵎⵖⴰⵔⵉⵏ." },
        { q: "ⵏⴽⵏⵉ ⴷ ＿.", en: "We are teachers.", options: ["ⵉⵙⵍⵎⴰⴷⵏ", "ⴰⵙⵍⵎⴰⴷ", "ⵜⴰⵙⵍⵎⴰⴷⵜ", "ⵉⵏⵓ"], answer: "ⵉⵙⵍⵎⴰⴷⵏ", why: "ⴰⵙⵍⵎⴰⴷ → ⵉⵙⵍⵎⴰⴷⵏ." },
      ],
    },
    {
      id: "possession",
      title: "My, your, his",
      particle: "ⵉⵏⵓ ⵏⵏⴽ ⵏⵏⵙ",
      summary: "“My”, “your” and “his” come after the noun.",
      sections: [
        {
          p: "After the noun: <b>ⵉⵏⵓ</b> (inu) my, <b>ⵏⵏⴽ</b> (nnk) your (man), <b>ⵏⵏⵎ</b> (nnm) your (woman), <b>ⵏⵏⵙ</b> (nns) his, her, <b>ⵏⵏⵖ</b> (nnɣ) our. <b>ⵏ</b> (n) means “of”: ⴰⴷⵍⵉⵙ ⵏ ⵢⵓⴱⴰ, Yuba's book.",
          examples: [
            ["ⵉⵙⵎ {ⵉⵏⵓ} ⵢⵓⴱⴰ.", "Ism inu Yuba.", "My name is Yuba."],
            ["ⵎⴰⵜⵜⴰ ⵉⵙⵎ {ⵏⵏⴽ}?", "Matta ism nnk?", "What is your name? (to a man)"],
            ["ⵜⴰⴷⴷⴰⵔⵜ {ⵏⵏⵙ} ⵜⵎⵇⵇⵓⵔ.", "Taddart nns tmqqur.", "His house is big."],
          ],
        },
      ],
      drills: [
        { q: "ⵉⵙⵎ ＿ ⵢⵓⴱⴰ.", en: "My name is Yuba.", options: ["ⵉⵏⵓ", "ⵏⵏⴽ", "ⵏⵏⵙ", "ⵏⵏⵎ"], answer: "ⵉⵏⵓ", why: "ⵉⵏⵓ = my." },
        { q: "ⵎⴰⵜⵜⴰ ⵉⵙⵎ ＿?", en: "What is your name? (to a man)", options: ["ⵏⵏⴽ", "ⵏⵏⵎ", "ⵉⵏⵓ", "ⵏⵏⵖ"], answer: "ⵏⵏⴽ", why: "ⵏⵏⴽ = your, to a man." },
        { q: "ⵎⴰⵜⵜⴰ ⵉⵙⵎ ＿?", en: "What is your name? (to a woman)", options: ["ⵏⵏⵎ", "ⵏⵏⴽ", "ⵏⵏⵙ", "ⵉⵏⵓ"], answer: "ⵏⵏⵎ", why: "ⵏⵏⵎ = your, to a woman." },
        { q: "ⵜⴰⴷⴷⴰⵔⵜ ＿ ⵜⵎⵇⵇⵓⵔ.", en: "His house is big.", options: ["ⵏⵏⵙ", "ⵉⵏⵓ", "ⵏⵏⴽ", "ⵏⵏⵖ"], answer: "ⵏⵏⵙ", why: "ⵏⵏⵙ = his, her." },
        { q: "ⵜⴰⴷⴷⴰⵔⵜ ＿", en: "our house", options: ["ⵏⵏⵖ", "ⵉⵏⵓ", "ⵏⵏⵙ", "ⵏⵏⴽ"], answer: "ⵏⵏⵖ", why: "ⵏⵏⵖ = our." },
      ],
    },
    {
      id: "places",
      title: "In, from, to, of",
      particle: "ⴳ ⵣⴳ ⵙ ⵏ",
      summary: "Short words for place: ⴳ in, ⵣⴳ from, ⵙ to, ⵏ of.",
      sections: [
        {
          p: "<b>ⴳ</b> (g) in, at; <b>ⵣⴳ</b> (zg) from; <b>ⵙ</b> (s) to; <b>ⵏ</b> (n) of. After these words a noun often changes its first vowel (the “annexed state”): ⵜⴰⴷⴷⴰⵔⵜ, house → ⴳ <b>ⵜⴷⴷⴰⵔⵜ</b>, in the house. Place names stay as they are.",
          examples: [
            ["ⵏⴽⴽ {ⵣⴳ} ⵎⵔⵔⴰⴽⵛ.", "Nkk zg Mrrakc.", "I'm from Marrakech."],
            ["ⵜⵣⴷⵖ {ⴳ} ⵕⴱⴰⵟ.", "Tzdɣ g Rbaṭ.", "She lives in Rabat."],
            ["ⴷⴷⵉⵖ {ⵙ} ⵜⵉⵣⵏⵉⵜ.", "Ddiɣ s Tiznit.", "I went to Tiznit."],
            ["ⵏⴽⴽ {ⴳ} ⵜⴷⴷⴰⵔⵜ.", "Nkk g tddart.", "I'm at home."],
          ],
        },
      ],
      drills: [
        { q: "ⵏⴽⴽ ＿ ⵎⵔⵔⴰⴽⵛ.", en: "I'm from Marrakech.", options: ["ⵣⴳ", "ⴳ", "ⵙ", "ⴷ"], answer: "ⵣⴳ", why: "ⵣⴳ = from." },
        { q: "ⵜⵣⴷⵖ ＿ ⵕⴱⴰⵟ.", en: "She lives in Rabat.", options: ["ⴳ", "ⵣⴳ", "ⵙ", "ⵏ"], answer: "ⴳ", why: "ⴳ = in." },
        { q: "ⴷⴷⵉⵖ ＿ ⵜⵉⵣⵏⵉⵜ.", en: "I went to Tiznit.", options: ["ⵙ", "ⵣⴳ", "ⴳ", "ⵏ"], answer: "ⵙ", why: "ⵙ = to." },
        { q: "ⵏⴽⴽ ⴳ ＿.", en: "I'm at home.", options: ["ⵜⴷⴷⴰⵔⵜ", "ⵜⴰⴷⴷⴰⵔⵜ", "ⵜⵉⴷⴷⴰⵔ", "ⴰⴷⵔⴰⵔ"], answer: "ⵜⴷⴷⴰⵔⵜ", why: "After ⴳ the noun is in the annexed state: ⵜⴰⴷⴷⴰⵔⵜ → ⵜⴷⴷⴰⵔⵜ." },
        { q: "ⴰⴷⵍⵉⵙ ＿ ⵢⵓⴱⴰ", en: "Yuba's book", options: ["ⵏ", "ⴳ", "ⵙ", "ⵣⴳ"], answer: "ⵏ", why: "ⵏ = of." },
      ],
    },
    {
      id: "verbs",
      title: "Verbs: did, and didn't",
      particle: "-ⵖ ⵉ- ⵜ- ⵓⵔ",
      summary: "The person is marked on the verb; ⵓⵔ makes it negative.",
      sections: [
        {
          p: "The verb carries the person: <b>-ⵖ</b> (-ɣ) for I, <b>ⵉ-</b> (i-) for he, <b>ⵜ-</b> (t-) for she, <b>ⵏ-</b> (n-) for we. The past of ⴷⴷⵓ (go): <b>ⴷⴷⵉⵖ</b> (ddiɣ) I went, <b>ⵜⴷⴷⵉⵜ</b> (tddit) you went, <b>ⵉⴷⴷⴰ</b> (idda) he went, <b>ⵜⴷⴷⴰ</b> (tdda) she went, <b>ⵏⴷⴷⴰ</b> (ndda) we went.",
          examples: [
            ["ⵉⴹⵍⵍⵉ {ⴷⴷⵉⵖ} ⵙ ⵎⵔⵔⴰⴽⵛ.", "Iḍlli ddiɣ s Mrrakc.", "Yesterday I went to Marrakech."],
            ["{ⵔⵉⵖ} ⴰⵎⴰⵏ.", "Riɣ aman.", "I want water."],
          ],
        },
        {
          h: "Not",
          p: "<b>ⵓⵔ</b> (ur) before the verb makes it negative, and some verbs change their stem after it: ⵙⵙⵏⵖ (ssnɣ) I know → <b>ⵓⵔ ⵙⵙⵉⵏⵖ</b> (ur ssinɣ) I don't know.",
          examples: [
            ["{ⵓⵔ} ⵙⵙⵉⵏⵖ.", "Ur ssinɣ.", "I don't know."],
          ],
        },
      ],
      drills: [
        { q: "ⵉⴹⵍⵍⵉ ＿ ⵙ ⵎⵔⵔⴰⴽⵛ.", en: "Yesterday I went to Marrakech.", options: ["ⴷⴷⵉⵖ", "ⵉⴷⴷⴰ", "ⵜⴷⴷⴰ", "ⵏⴷⴷⴰ"], answer: "ⴷⴷⵉⵖ", why: "I: the ending -ⵖ." },
        { q: "ⵏⵜⵜⴰ ＿ ⵙ ⵜⵉⵣⵏⵉⵜ.", en: "He went to Tiznit.", options: ["ⵉⴷⴷⴰ", "ⴷⴷⵉⵖ", "ⵜⴷⴷⴰ", "ⵏⴷⴷⴰ"], answer: "ⵉⴷⴷⴰ", why: "He: the prefix ⵉ-." },
        { q: "ⵏⵜⵜⴰⵜ ＿ ⵙ ⵕⴱⴰⵟ.", en: "She went to Rabat.", options: ["ⵜⴷⴷⴰ", "ⵉⴷⴷⴰ", "ⴷⴷⵉⵖ", "ⵏⴷⴷⴰ"], answer: "ⵜⴷⴷⴰ", why: "She: the prefix ⵜ-." },
        { q: "ⵓⵔ ＿.", en: "I don't know.", options: ["ⵙⵙⵉⵏⵖ", "ⵙⵙⵏⵖ", "ⵉⵙⵙⵏ", "ⵜⵙⵙⵏ"], answer: "ⵙⵙⵉⵏⵖ", why: "After ⵓⵔ, ⵙⵙⵏⵖ changes to ⵙⵙⵉⵏⵖ." },
        { q: "＿ ⴰⵎⴰⵏ.", en: "I want water.", options: ["ⵔⵉⵖ", "ⵉⵔⴰ", "ⵜⵔⴰ", "ⵏⵔⴰ"], answer: "ⵔⵉⵖ", why: "I: the ending -ⵖ." },
      ],
    },
  ],
};
