// Georgian first grammar for the Grammar Learner. Written for this project.
// Examples are [Georgian, romanization, English]; {braces} mark the point of the lesson.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.georgian = {
  title: "Georgian first grammar",
  intro: "Georgian has no articles and no grammatical gender: ის means he, she and it alike. Instead it packs a lot into the verb, which marks who does what with prefixes and endings, and it adds case endings and postpositions to nouns where English uses prepositions. These lessons cover “to be”, this and that, plurals, the present tense, places with -ში, -ზე and -დან, and saying no and asking questions. The romanization is the national system; an apostrophe marks an ejective consonant (k', p', t', ts', ch', q'), and kh, gh are throaty sounds.",
  lessons: [
    {
      id: "var",
      title: "ვარ, ხარ, არის — “to be”",
      particle: "ვარ",
      summary: "“Am / are / is”, which usually goes at the end.",
      sections: [
        {
          p: "The verb “to be”: <b>ვარ</b> I am, <b>ხარ</b> you are, <b>არის</b> he/she/it is. It usually comes after the word it describes. Pronouns (მე I, შენ you, ის he/she) are often dropped.",
          examples: [
            ["მე სტუდენტი {ვარ}.", "Me st'udent'i var.", "I am a student."],
            ["სად {ხარ}?", "Sad khar?", "Where are you?"],
            ["ის ექიმი {არის}.", "Is ekimi aris.", "He / she is a doctor."],
          ],
        },
        {
          h: "Plural, and the short -ა",
          p: "<b>ვართ</b> we are, <b>ხართ</b> you are (several, or polite), <b>არიან</b> they are. In speech არის is often shortened to <b>-ა</b> on the end of the word: ეს წიგნი არის → ეს წიგნია.",
          examples: [
            ["ჩვენ მეგობრები {ვართ}.", "Chven megobrebi vart.", "We are friends."],
            ["ეს ჩაი{ა}.", "Es chai-a.", "This is tea."],
          ],
        },
      ],
      drills: [
        { q: "მე ქართველი ＿.", en: "I am Georgian.", options: ["ვარ", "ხარ", "არის", "ვართ"], answer: "ვარ", why: "“I am” is ვარ." },
        { q: "შენ სად ＿?", en: "Where are you?", options: ["ხარ", "ვარ", "არის", "არიან"], answer: "ხარ", why: "“You are” (one person) is ხარ." },
        { q: "ნინო მასწავლებელი ＿.", en: "Nino is a teacher.", options: ["არის", "ვარ", "ხართ", "ვართ"], answer: "არის", why: "He or she: არის." },
        { q: "ისინი სახლში ＿.", en: "They are at home.", options: ["არიან", "არის", "ვართ", "ხარ"], answer: "არიან", why: "“They are” is არიან." },
        { q: "What does «ეს ყავაა» mean?", en: "ყავა = coffee", options: ["This is coffee.", "This coffee.", "Is this coffee?", "There is no coffee."], answer: "This is coffee.", why: "The final -ა is the short form of არის." },
      ],
    },
    {
      id: "es-is",
      title: "ეს, ის and “my”",
      particle: "ეს ის",
      summary: "No articles, no gender: this, that, and the possessives.",
      sections: [
        {
          p: "Georgian has no word for “a” or “the”, and no he/she difference. <b>ეს</b> means “this”, and <b>ის</b> means “that” and also “he, she, it”.",
          examples: [
            ["{ეს} რა არის?", "Es ra aris?", "What is this?"],
            ["{ის} ჩემი ძმაა.", "Is chemi dzmaa.", "He is my brother."],
            ["{ის} ჩემი დაა.", "Is chemi daa.", "She is my sister."],
          ],
        },
        {
          h: "My, your, his",
          p: "<b>ჩემი</b> my, <b>შენი</b> your, <b>მისი</b> his / her, <b>ჩვენი</b> our, <b>თქვენი</b> your (plural, polite), <b>მათი</b> their. They come before the noun.",
          examples: [
            ["{ჩემი} სახელია ნინო.", "Chemi sakhelia Nino.", "My name is Nino."],
            ["{თქვენი} სახლი ლამაზია.", "Tkveni sakhli lamazia.", "Your house is beautiful."],
          ],
        },
      ],
      drills: [
        { q: "＿ ჩემი წიგნია.", en: "This is my book.", options: ["ეს", "ის", "რა", "ვინ"], answer: "ეს", why: "ეს = this." },
        { q: "How do you say “he” in Georgian?", en: "", options: ["ის", "ეს", "მე", "შენ"], answer: "ის", why: "ის covers he, she, it and “that”." },
        { q: "＿ მეგობარი", en: "your friend (to one friend)", options: ["შენი", "ჩემი", "მისი", "მათი"], answer: "შენი", why: "შენი = your (one person)." },
        { q: "＿ სახელი რა არის?", en: "What is your name? (polite)", options: ["თქვენი", "შენი", "ჩემი", "მისი"], answer: "თქვენი", why: "Polite “your” is თქვენი." },
        { q: "How do you say “the city” (ქალაქი)?", en: "", options: ["ქალაქი", "ეს ქალაქი ის", "ის-ქალაქი", "ქალაქმა"], answer: "ქალაქი", why: "No articles: ქალაქი is both “a city” and “the city”." },
      ],
    },
    {
      id: "plural",
      title: "Plurals with -ები",
      particle: "-ები",
      summary: "Drop the final -ი and add -ები; after a number, keep the singular.",
      sections: [
        {
          p: "Most nouns make the plural with <b>-ები</b>. A noun in -ი drops it first; a noun in -ა keeps it.",
          examples: [
            ["წიგნი → წიგნ{ები}", "ts'igni → ts'ignebi", "book → books"],
            ["ბავშვი → ბავშვ{ები}", "bavshvi → bavshvebi", "child → children"],
            ["მაგიდა → მაგიდ{ები}", "magida → magidebi", "table → tables"],
          ],
        },
        {
          h: "Numbers take the singular",
          p: "After a number, or a word like რამდენი (how many) or ბევრი (many), the noun stays singular: <b>ორი წიგნი</b> “two books”.",
          examples: [
            ["{ორი} ბავშვი", "ori bavshvi", "two children"],
            ["{სამი} ყავა, თუ შეიძლება.", "Sami q'ava, tu sheidzleba.", "Three coffees, please."],
          ],
        },
      ],
      drills: [
        { q: "კაცი → ＿", en: "man → men", options: ["კაცები", "კაციები", "კაცი", "კაცებია"], answer: "კაცები", why: "Drop -ი and add -ები." },
        { q: "ქალი → ＿", en: "woman → women", options: ["ქალები", "ქალიები", "ქალი", "ქალეი"], answer: "ქალები", why: "Same rule: ქალ + ები." },
        { q: "ხუთი ＿", en: "five books", options: ["წიგნი", "წიგნები", "წიგნებს", "წიგნია"], answer: "წიგნი", why: "After a number the noun stays singular." },
        { q: "ეს ჩემი ＿ არიან.", en: "These are my friends. (მეგობარი)", options: ["მეგობრები", "მეგობარები", "მეგობარი", "მეგობრი"], answer: "მეგობრები", why: "მეგობარი loses its last vowel before the ending: მეგობრები." },
        { q: "Which is “many books”?", en: "ბევრი = many", options: ["ბევრი წიგნი", "ბევრი წიგნები", "წიგნები ბევრი", "ბევრები წიგნი"], answer: "ბევრი წიგნი", why: "Like numbers, ბევრი takes a singular noun." },
      ],
    },
    {
      id: "present",
      title: "The present tense",
      particle: "ვ- -ს -თ",
      summary: "ვ- marks “I” at the front; -ს, -თ and -ენ mark the others at the end.",
      sections: [
        {
          p: "Many verbs follow one pattern. For წერ “write”: <b>ვ</b>წერ I write, წერ you write, წერ<b>ს</b> he/she writes, <b>ვ</b>წერ<b>თ</b> we write, წერ<b>თ</b> you write (plural), წერ<b>ენ</b> they write.",
          examples: [
            ["{ვ}ცხოვრობ თბილისში.", "Vtskhovrob Tbilisshi.", "I live in Tbilisi."],
            ["ის ქართულად ლაპარაკობ{ს}.", "Is kartulad lap'arak'obs.", "He / she speaks Georgian."],
            ["ბავშვები თამაშობ{ენ}.", "Bavshvebi tamashoben.", "The children are playing."],
          ],
        },
        {
          h: "Asking with “you”",
          p: "The “you” form has no marker at all, so the bare stem is a question to one person: <b>ლაპარაკობ ინგლისურად?</b> “Do you speak English?” Add -თ for polite or plural you.",
          examples: [
            ["ინგლისურად ლაპარაკობ{თ}?", "Inglisurad lap'arak'obt?", "Do you speak English? (polite)"],
            ["ყავას {ვ}სვამ.", "Q'avas vsvam.", "I am drinking coffee."],
          ],
        },
      ],
      drills: [
        { q: "მე წერილს ＿.", en: "I am writing a letter.", options: ["ვწერ", "წერ", "წერს", "წერენ"], answer: "ვწერ", why: "ვ- at the front marks “I”." },
        { q: "ნიკა ჩაის ＿.", en: "Nika drinks tea.", options: ["სვამს", "ვსვამ", "სვამ", "სვამენ"], answer: "სვამს", why: "He or she: -ს at the end." },
        { q: "ჩვენ ქუთაისში ＿.", en: "We live in Kutaisi.", options: ["ვცხოვრობთ", "ვცხოვრობ", "ცხოვრობს", "ცხოვრობენ"], answer: "ვცხოვრობთ", why: "We: ვ- at the front and -თ at the end." },
        { q: "ისინი ქართულად ＿.", en: "They speak Georgian.", options: ["ლაპარაკობენ", "ლაპარაკობს", "ვლაპარაკობ", "ლაპარაკობთ"], answer: "ლაპარაკობენ", why: "They: -ენ." },
        { q: "შენ რას ＿?", en: "What are you eating? (ჭამ-)", options: ["ჭამ", "ვჭამ", "ჭამს", "ჭამენ"], answer: "ჭამ", why: "“You” (one person) is the bare stem." },
      ],
    },
    {
      id: "places",
      title: "In, on and from: -ში, -ზე, -დან",
      particle: "-ში -ზე",
      summary: "Where English uses a preposition, Georgian adds an ending to the noun.",
      sections: [
        {
          p: "<b>-ში</b> means “in” or “to”, and <b>-ზე</b> means “on” or “about”. A noun in -ი drops it first: სახლი → სახლ<b>ში</b>. A noun in -ა keeps it: მაგიდა → მაგიდა<b>ზე</b>.",
          examples: [
            ["თბილის{ში} ვცხოვრობ.", "Tbilisshi vtskhovrob.", "I live in Tbilisi."],
            ["წიგნი მაგიდა{ზე}ა.", "Ts'igni magidazea.", "The book is on the table."],
            ["სკოლა{ში} მივდივარ.", "Sk'olashi mivdivar.", "I'm going to school."],
          ],
        },
        {
          h: "From: -დან",
          p: "<b>-დან</b> means “from”. It follows the -ი that most names and nouns end in: თბილისი → თბილისი<b>დან</b>, ლონდონი → ლონდონი<b>დან</b>. საიდან? means “from where?”.",
          examples: [
            ["საიდან ხარ? — ბათუმი{დან}.", "Saidan khar? — Batumidan.", "Where are you from? — From Batumi."],
            ["ლონდონი{დან} ვარ.", "Londonidan var.", "I'm from London."],
          ],
        },
      ],
      drills: [
        { q: "ის სახლ＿ არის.", en: "She is at home (in the house).", options: ["ში", "ზე", "დან", "ს"], answer: "ში", why: "-ში = in." },
        { q: "ჩანთა სკამ＿ა.", en: "The bag is on the chair. (სკამი)", options: ["ზე", "ში", "დან", "ებს"], answer: "ზე", why: "-ზე = on; სკამი drops its -ი." },
        { q: "მე ბერლინი＿ ვარ.", en: "I am from Berlin.", options: ["დან", "ში", "ზე", "ს"], answer: "დან", why: "-დან = from." },
        { q: "How do you say “in the city” (ქალაქი)?", en: "", options: ["ქალაქში", "ქალაქიში", "ქალაქზე", "ქალაქიდან"], answer: "ქალაქში", why: "Drop -ი, add -ში." },
        { q: "საიდან ხარ?", en: "What is this question?", options: ["Where are you from?", "Where are you?", "Who are you?", "How are you?"], answer: "Where are you from?", why: "საიდან = from where; სად alone is “where”." },
      ],
    },
    {
      id: "ar-questions",
      title: "არ, ვერ and questions",
      particle: "არ ვერ",
      summary: "არ is “not”, ვერ is “can't”, and question words go before the verb.",
      sections: [
        {
          p: "Put <b>არ</b> just before the verb for “not”. <b>ვერ</b> means “cannot”. The answers yes and no are <b>კი</b> (or polite <b>დიახ</b>) and <b>არა</b>.",
          examples: [
            ["{არ} ვიცი.", "Ar vitsi.", "I don't know."],
            ["{არ} მესმის.", "Ar mesmis.", "I don't understand."],
            ["{ვერ} მოვდივარ.", "Ver movdivar.", "I can't come."],
          ],
        },
        {
          h: "Question words",
          p: "<b>რა</b> what, <b>ვინ</b> who, <b>სად</b> where, <b>როდის</b> when, <b>რატომ</b> why, <b>როგორ</b> how, <b>რამდენი</b> how many / how much. A yes/no question is a statement with a rising voice.",
          examples: [
            ["{როგორ} ხარ?", "Rogor khar?", "How are you?"],
            ["{რამდენი} ღირს?", "Ramdeni ghirs?", "How much does it cost?"],
            ["{ვინ} არის ეს?", "Vin aris es?", "Who is this?"],
          ],
        },
      ],
      drills: [
        { q: "მე ＿ მესმის.", en: "I don't understand.", options: ["არ", "არა", "ვერ", "კი"], answer: "არ", why: "არ before the verb = not. არა is the answer “no”." },
        { q: "＿ ხარ?", en: "How are you?", options: ["როგორ", "სად", "ვინ", "რა"], answer: "როგორ", why: "როგორ = how." },
        { q: "ტუალეტი ＿ არის?", en: "Where is the toilet?", options: ["სად", "როდის", "რატომ", "რამდენი"], answer: "სად", why: "სად = where." },
        { q: "Polite “yes” is…", en: "", options: ["დიახ", "არა", "არ", "ვერ"], answer: "დიახ", why: "დიახ is polite yes; კი is everyday yes." },
        { q: "ის დღეს ＿ მოდის.", en: "He isn't coming today.", options: ["არ", "არა", "კი", "დიახ"], answer: "არ", why: "არ goes right before the verb. არა and კი are answers on their own." },
      ],
    },
  ],
};
