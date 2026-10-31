// Eastern Armenian first grammar for the Grammar Learner. Written for this project.
// Examples are [Armenian, romanization, English]; {braces} mark the point of the lesson.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.armenian = {
  title: "Armenian first grammar",
  intro: "Eastern Armenian, the standard language of Armenia, has no grammatical gender. “The” is an ending on the noun, most verbs are built from a participle plus a small helper verb, and endings on nouns do the work of English prepositions. These lessons cover “to be”, the article, plurals, the present tense, saying no and asking, and in, from and “my”. Armenian ends a sentence with ։ and marks a question with ՞ over the stressed vowel. In the romanization ë is the short “uh” sound and k' is a breathy k.",
  lessons: [
    {
      id: "em",
      title: "եմ, ես, է — “to be”",
      particle: "եմ",
      summary: "The helper verb “to be”, which goes after the word it describes.",
      sections: [
        {
          p: "<b>եմ</b> I am, <b>ես</b> you are, <b>է</b> he/she/it is. It follows the word it describes. The pronouns are ես (I), դու (you), նա (he, she). Note that ես is both “I” and “you are”.",
          examples: [
            ["Ես ուսանող {եմ}։", "Yes usanogh em.", "I am a student."],
            ["Որտե՞ղ {ես}։", "Vortegh es?", "Where are you?"],
            ["Նա բժիշկ {է}։", "Na bzhishk e.", "He / she is a doctor."],
          ],
        },
        {
          h: "The plural",
          p: "<b>ենք</b> we are, <b>եք</b> you are (several, or polite), <b>են</b> they are. The pronouns are մենք, դուք and նրանք.",
          examples: [
            ["Մենք ընկերներ {ենք}։", "Menk' ënkerner enk'.", "We are friends."],
            ["Դուք որտեղի՞ց {եք}։", "Duk' vorteghits ek'?", "Where are you from? (polite)"],
            ["Նրանք տանը {են}։", "Nrank' tanë en.", "They are at home."],
          ],
        },
      ],
      drills: [
        { q: "Ես հայ ＿։", en: "I am Armenian.", options: ["եմ", "ես", "է", "ենք"], answer: "եմ", why: "“I am” is եմ." },
        { q: "Արամը ուսուցիչ ＿։", en: "Aram is a teacher.", options: ["է", "եմ", "եք", "են"], answer: "է", why: "He or she: է." },
        { q: "Դու լա՞վ ＿։", en: "Are you well?", options: ["ես", "եմ", "է", "եք"], answer: "ես", why: "“You are” (one friend) is ես." },
        { q: "Մենք Երևանում ＿։", en: "We are in Yerevan.", options: ["ենք", "են", "եմ", "եք"], answer: "ենք", why: "“We are” is ենք." },
        { q: "Նրանք եղբայրներ ＿։", en: "They are brothers.", options: ["են", "է", "ենք", "ես"], answer: "են", why: "“They are” is են." },
      ],
    },
    {
      id: "article",
      title: "“The” is an ending: -ը and -ն",
      particle: "-ը -ն",
      summary: "Add -ը after a consonant and -ն after a vowel; “a” is մի before the noun.",
      sections: [
        {
          p: "Armenian puts “the” on the end of the noun: <b>-ը</b> after a consonant, <b>-ն</b> after a vowel. There is no gender, so this is the only choice.",
          examples: [
            ["գիրք → գիրք{ը}", "girk' → girk'ë", "a book → the book"],
            ["տուն → տուն{ը}", "tun → tunë", "a house → the house"],
            ["կատու → կատու{ն}", "katu → katun", "a cat → the cat"],
          ],
        },
        {
          h: "“A”, and “this”",
          p: "<b>մի</b> before a noun means “a, one”. <b>այս</b> means “this” and <b>այն</b> “that”; <b>սա</b> is “this one”. Proper names take the article too when they are the subject: Աննան, Արամը.",
          examples: [
            ["{մի} բաժակ ջուր", "mi bazhak jur", "a glass of water"],
            ["{Սա} իմ տունն է։", "Sa im tunn e.", "This is my house."],
          ],
        },
      ],
      drills: [
        { q: "սեղան → ＿", en: "table → the table", options: ["սեղանը", "սեղանն", "սեղանի", "մի սեղան"], answer: "սեղանը", why: "It ends in a consonant, so add -ը." },
        { q: "երեխա → ＿", en: "child → the child", options: ["երեխան", "երեխաը", "երեխայի", "մի երեխա"], answer: "երեխան", why: "It ends in a vowel, so add -ն." },
        { q: "＿ խնձոր", en: "an apple", options: ["մի", "այս", "-ը", "սա"], answer: "մի", why: "մի before the noun means “a, one”." },
        { q: "What does «սուրճը» mean?", en: "սուրճ = coffee", options: ["the coffee", "a coffee", "coffees", "this coffee"], answer: "the coffee", why: "The -ը ending is “the”." },
        { q: "＿ քաղաքը գեղեցիկ է։", en: "This city is beautiful.", options: ["Այս", "Մի", "Սա", "Նա"], answer: "Այս", why: "այս = this, before a noun." },
      ],
    },
    {
      id: "plural",
      title: "Plurals: -եր and -ներ",
      particle: "-եր -ներ",
      summary: "One-syllable words add -եր; longer words add -ներ.",
      sections: [
        {
          p: "A one-syllable noun adds <b>-եր</b>; a noun of two or more syllables adds <b>-ներ</b>. A few common words are irregular: մարդ (person) → մարդիկ.",
          examples: [
            ["դաս → դաս{եր}", "das → daser", "lesson → lessons"],
            ["ծառ → ծառ{եր}", "tsar → tsarer", "tree → trees"],
            ["քաղաք → քաղաք{ներ}", "k'aghak' → k'aghak'ner", "city → cities"],
            ["երեխա → երեխա{ներ}", "yerekha → yerekhaner", "child → children"],
          ],
        },
        {
          h: "Numbers take the singular",
          p: "After a number the noun usually stays singular: <b>երկու գիրք</b> “two books”, <b>երեք օր</b> “three days”.",
          examples: [
            ["{երկու} բաժակ սուրճ", "yerku bazhak surch", "two cups of coffee"],
          ],
        },
      ],
      drills: [
        { q: "քար → ＿", en: "stone → stones", options: ["քարեր", "քարներ", "քարիկ", "քարը"], answer: "քարեր", why: "One syllable: add -եր." },
        { q: "աթոռ → ＿", en: "chair → chairs", options: ["աթոռներ", "աթոռեր", "աթոռիկ", "աթոռը"], answer: "աթոռներ", why: "Two syllables (a-tor): add -ներ." },
        { q: "սեղան → ＿", en: "table → tables", options: ["սեղաններ", "սեղաներ", "սեղանը", "սեղանիկ"], answer: "սեղաններ", why: "Two syllables: սեղան + ներ." },
        { q: "մարդ → ＿", en: "person → people", options: ["մարդիկ", "մարդեր", "մարդներ", "մարդը"], answer: "մարդիկ", why: "One of the few irregular plurals." },
        { q: "երեք ＿", en: "three days (օր)", options: ["օր", "օրեր", "օրը", "օրներ"], answer: "օր", why: "After a number the noun stays singular." },
      ],
    },
    {
      id: "present",
      title: "The present tense: -ում եմ",
      particle: "-ում",
      summary: "Change -ել or -ալ to -ում and add the “to be” helper for the person.",
      sections: [
        {
          p: "Take the infinitive, change <b>-ել</b> or <b>-ալ</b> to <b>-ում</b>, and add եմ, ես, է… for the person: գրել (to write) → <b>գրում եմ</b> I write, <b>գրում ես</b> you write, <b>գրում է</b> he writes. The same form means “I write” and “I am writing”.",
          examples: [
            ["Ես ապրում {եմ} Երևանում։", "Yes aprum em Yerevanum.", "I live in Yerevan."],
            ["Նա գիրք է կարդ{ում}։", "Na girk' e kardum.", "She is reading a book."],
            ["Մենք հայերեն ենք սովոր{ում}։", "Menk' hayeren enk' sovorum.", "We are learning Armenian."],
          ],
        },
        {
          h: "The helper moves",
          p: "The helper often jumps in front of the participle, right after the word you are stressing: <b>Ես սուրճ եմ խմում</b> “I drink coffee”. In a question ՞ sits on the participle's stressed vowel.",
          examples: [
            ["Դու անգլերեն խոսու՞մ ես։", "Du angleren khosum es?", "Do you speak English?"],
            ["Ես սուրճ {եմ} խմում։", "Yes surch em khmum.", "I drink coffee."],
          ],
        },
      ],
      drills: [
        { q: "Ես նամակ ＿ գրում։", en: "I am writing a letter.", options: ["եմ", "ես", "է", "են"], answer: "եմ", why: "“I” takes the helper եմ." },
        { q: "Խոսել → Նա հայերեն ＿ է։", en: "He speaks Armenian.", options: ["խոսում", "խոսել", "խոսեմ", "խոսը"], answer: "խոսում", why: "-ել becomes -ում." },
        { q: "Կարդալ → Ես ＿ եմ։", en: "I am reading.", options: ["կարդում", "կարդալում", "կարդաում", "կարդալ"], answer: "կարդում", why: "-ալ also becomes -ում: կարդում." },
        { q: "Նրանք Մոսկվայում ապրում ＿։", en: "They live in Moscow.", options: ["են", "է", "ենք", "եք"], answer: "են", why: "They: են." },
        { q: "Դուք ի՞նչ եք ＿։", en: "What are you doing? (անել, to do)", options: ["անում", "անել", "անեմ", "անը"], answer: "անում", why: "անել → անում." },
      ],
    },
    {
      id: "negative",
      title: "Saying no, and asking",
      particle: "չ-",
      summary: "Put չ- on the helper and move it before the verb; question words carry ՞.",
      sections: [
        {
          p: "To say “not”, add <b>չ-</b> to the helper and put it in front: <b>չեմ</b>, <b>չես</b>, <b>չի</b> (not չէ), <b>չենք</b>, <b>չեք</b>, <b>չեն</b>. Ես չեմ հասկանում, “I don't understand”. The words for yes and no are <b>այո</b> and <b>ոչ</b>.",
          examples: [
            ["Ես {չեմ} հասկանում։", "Yes chem haskanum.", "I don't understand."],
            ["Նա այստեղ {չի}։", "Na aystegh chi.", "He isn't here."],
            ["{Չգիտեմ}։", "Chgitem.", "I don't know."],
          ],
        },
        {
          h: "Question words",
          p: "<b>ի՞նչ</b> what, <b>ո՞վ</b> who, <b>որտե՞ղ</b> where, <b>ե՞րբ</b> when, <b>ինչո՞ւ</b> why, <b>ինչպե՞ս</b> how, <b>ինչքա՞ն</b> how much. The ՞ mark sits on the stressed vowel of the word being asked about.",
          examples: [
            ["{Ինչպե՞ս} ես։", "Inchpes es?", "How are you?"],
            ["{Ինչքա՞ն} արժե։", "Inchk'an arzhe?", "How much does it cost?"],
            ["Սա {ի՞նչ} է։", "Sa inch e?", "What is this?"],
          ],
        },
      ],
      drills: [
        { q: "Ես ռուսերեն ＿ խոսում։", en: "I don't speak Russian.", options: ["չեմ", "եմ", "չի", "ոչ"], answer: "չեմ", why: "Not + I: չեմ, before the verb." },
        { q: "Նա տանը ＿։", en: "She isn't at home.", options: ["չի", "չէ", "է", "չեմ"], answer: "չի", why: "The negative of է is չի." },
        { q: "＿ է նա։", en: "Who is he?", options: ["Ո՞վ", "Ի՞նչ", "Ե՞րբ", "Որտե՞ղ"], answer: "Ո՞վ", why: "ո՞վ = who." },
        { q: "Զուգարանը ＿ է։", en: "Where is the toilet?", options: ["որտե՞ղ", "ե՞րբ", "ինչո՞ւ", "ինչքա՞ն"], answer: "որտե՞ղ", why: "որտե՞ղ = where." },
        { q: "The Armenian for “no” is…", en: "", options: ["ոչ", "այո", "չ-", "չի"], answer: "ոչ", why: "այո is yes, ոչ is no; չ- is the prefix for “not”." },
      ],
    },
    {
      id: "cases",
      title: "In, from, and “my”",
      particle: "-ում -ից",
      summary: "-ում means “in”, -ից means “from”; իմ, քո, նրա come before the noun.",
      sections: [
        {
          p: "Endings do the work of prepositions. <b>-ում</b> means “in, at”: Երևան → Երևան<b>ում</b>. <b>-ից</b> means “from”: Երևան<b>ից</b>. “At home” is irregular: տանը.",
          examples: [
            ["Ես ապրում եմ Գյումրի{ում}։", "Yes aprum em Gyumrium.", "I live in Gyumri."],
            ["Նա Ամերիկայ{ից} է։", "Na Amerikayits e.", "She is from America."],
            ["Գիրքը պայուսակ{ում} է։", "Girk'ë payusakum e.", "The book is in the bag."],
          ],
        },
        {
          h: "My, your, his",
          p: "<b>իմ</b> my, <b>քո</b> your, <b>նրա</b> his / her, <b>մեր</b> our, <b>ձեր</b> your (plural, polite), <b>նրանց</b> their. The noun then usually takes “the”: իմ տունը, my house.",
          examples: [
            ["{Իմ} անունը Անի է։", "Im anunë Ani e.", "My name is Ani."],
            ["{Ձեր} անունն ի՞նչ է։", "Dzer anunn inch e?", "What is your name? (polite)"],
          ],
        },
      ],
      drills: [
        { q: "Մենք Փարիզ＿ ենք։", en: "We are in Paris.", options: ["ում", "ից", "ը", "ներ"], answer: "ում", why: "-ում = in." },
        { q: "Ես Ֆրանսիայ＿ եմ։", en: "I am from France.", options: ["ից", "ում", "ն", "եր"], answer: "ից", why: "-ից = from." },
        { q: "＿ եղբայրը բժիշկ է։", en: "My brother is a doctor.", options: ["Իմ", "Քո", "Նրա", "Ձեր"], answer: "Իմ", why: "իմ = my." },
        { q: "＿ մայրը որտե՞ղ է։", en: "Where is your mother? (to a friend)", options: ["Քո", "Իմ", "Մեր", "Նրանց"], answer: "Քո", why: "քո = your, to one friend." },
        { q: "How do you say “at home”?", en: "", options: ["տանը", "տունում", "տունից", "տներ"], answer: "տանը", why: "“At home” is the irregular տանը." },
      ],
    },
  ],
};
