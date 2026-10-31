// Russian first grammar for the Grammar Learner. Written for this project.
// Examples are [Russian, transliteration, English]; {braces} mark the point of the lesson.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.cyrillic = {
  title: "Russian first grammar",
  intro: "Russian has no words for “a” or “the”, usually drops “is” in the present, and shows a noun's job by changing its ending. These lessons start with the sentences you can make straight away, then the three genders, the present tense, and the first two case endings you will need: the object and “in / at”.",
  lessons: [
    {
      id: "eto",
      title: "Это and the missing “is”",
      particle: "это",
      summary: "“This is …”, and sentences with no verb at all.",
      sections: [
        {
          p: "<b>Это</b> means “this is” or “that is”, and it never changes. Russian has no “a” or “the”, so “это книга” is simply “this is a book”.",
          examples: [
            ["{Это} книга.", "Eto kniga.", "This is a book."],
            ["{Это} мой брат.", "Eto moy brat.", "This is my brother."],
            ["Что {это}?", "Chto eto?", "What is this?"],
          ],
        },
        {
          h: "No “is” in the present",
          p: "In the present tense “am / is / are” is left out. In writing a dash sometimes stands in its place between two nouns.",
          examples: [
            ["Я студент.", "Ya student.", "I am a student."],
            ["Москва — столица России.", "Moskva — stolitsa Rossii.", "Moscow is the capital of Russia."],
            ["Он дома.", "On doma.", "He is at home."],
          ],
        },
      ],
      drills: [
        { q: "What does «Это стол» mean?", en: "стол = table", options: ["This is a table.", "This table.", "It's on the table.", "Is this a table?"], answer: "This is a table.", why: "Это = “this is”; there is no word for “a”." },
        { q: "How do you say “I am a doctor”?", en: "врач = doctor", options: ["Я врач.", "Я есть врач.", "Я это врач.", "Мне врач."], answer: "Я врач.", why: "The present-tense “am” is simply left out." },
        { q: "＿ моя мама.", en: "This is my mum.", options: ["Это", "Эта", "Этот", "Есть"], answer: "Это", why: "In “this is …” sentences it is always это, whatever the gender." },
        { q: "How do you ask “What is this?”", en: "", options: ["Что это?", "Кто это?", "Это что есть?", "Что есть?"], answer: "Что это?", why: "Что = what; кто would be “who”." },
        { q: "What does «Она дома» mean?", en: "она = she", options: ["She is at home.", "Her house.", "She has a house.", "She goes home."], answer: "She is at home.", why: "No verb is needed: она (she) + дома (at home)." },
      ],
    },
    {
      id: "gender",
      title: "He, she, it: noun gender",
      particle: "он / она / оно",
      summary: "The ending of a noun tells you its gender.",
      sections: [
        {
          p: "Every noun is masculine, feminine or neuter, and you can nearly always tell from the last letter. <b>Consonant</b> or -й: masculine (он). <b>-а / -я</b>: feminine (она). <b>-о / -е</b>: neuter (оно).",
          examples: [
            ["дом → {он}", "dom → on", "house: masculine"],
            ["книга → {она}", "kniga → ona", "book: feminine"],
            ["окно → {оно}", "okno → ono", "window: neuter"],
          ],
        },
        {
          h: "My: мой, моя, моё",
          p: "Words that go with a noun take the same gender: мой дом, моя книга, моё окно. Nouns ending in -ь can be either gender and are learned one by one; a few male people end in -а (папа, “dad”) and are masculine anyway.",
          examples: [
            ["{мой} дом", "moy dom", "my house"],
            ["{моя} книга", "moya kniga", "my book"],
            ["{моё} окно", "moyo okno", "my window"],
          ],
        },
      ],
      drills: [
        { q: "машина (car) is…", en: "", options: ["feminine", "masculine", "neuter"], answer: "feminine", why: "It ends in -а: feminine (она)." },
        { q: "письмо (letter) is…", en: "", options: ["neuter", "masculine", "feminine"], answer: "neuter", why: "It ends in -о: neuter (оно)." },
        { q: "＿ телефон", en: "my phone", options: ["мой", "моя", "моё"], answer: "мой", why: "телефон ends in a consonant: masculine, so мой." },
        { q: "＿ сестра", en: "my sister", options: ["моя", "мой", "моё"], answer: "моя", why: "сестра ends in -а: feminine, so моя." },
        { q: "＿ море", en: "my sea", options: ["моё", "мой", "моя"], answer: "моё", why: "море ends in -е: neuter, so моё." },
        { q: "Where is the book? — ＿ здесь.", en: "It is here. (книга = book)", options: ["Она", "Он", "Оно"], answer: "Она", why: "книга is feminine, so “it” is она." },
      ],
    },
    {
      id: "present",
      title: "The present tense",
      particle: "-ю -ешь -ет",
      summary: "One verb pattern that covers a huge number of verbs: читать, to read.",
      sections: [
        {
          p: "Take the infinitive, drop <b>-ть</b>, and add an ending for the person. This pattern fits most verbs ending in -ать and -ять.",
          examples: [
            ["я чита{ю}", "ya chitayu", "I read"],
            ["ты чита{ешь}", "ty chitayesh'", "you read (one friend)"],
            ["он / она чита{ет}", "on / ona chitayet", "he / she reads"],
            ["мы чита{ем}", "my chitayem", "we read"],
            ["вы чита{ете}", "vy chitayete", "you read (several, or polite)"],
            ["они чита{ют}", "oni chitayut", "they read"],
          ],
        },
        {
          h: "The same pattern",
          p: "знать (know), делать (do), работать (work), понимать (understand) and гулять (walk) all behave the same way. One present tense covers “I read”, “I am reading” and “I do read”.",
          examples: [
            ["Я не {понимаю}.", "Ya ne ponimayu.", "I don't understand."],
            ["Что ты {делаешь}?", "Chto ty delayesh'?", "What are you doing?"],
          ],
        },
      ],
      drills: [
        { q: "Я ＿ .", en: "I know. (знать)", options: ["знаю", "знает", "знаешь", "знать"], answer: "знаю", why: "я takes -ю: знаю." },
        { q: "Она ＿ в банке.", en: "She works at a bank. (работать)", options: ["работает", "работаю", "работают", "работаешь"], answer: "работает", why: "он / она takes -ет." },
        { q: "Мы ＿ по-русски.", en: "We read Russian. (читать)", options: ["читаем", "читают", "читаешь", "читаете"], answer: "читаем", why: "мы takes -ем." },
        { q: "Ты ＿ ?", en: "Do you understand? (понимать)", options: ["понимаешь", "понимаю", "понимает", "понимать"], answer: "понимаешь", why: "ты takes -ешь." },
        { q: "Они ＿ в парке.", en: "They walk in the park. (гулять)", options: ["гуляют", "гуляет", "гуляем", "гуляю"], answer: "гуляют", why: "они takes -ют." },
        { q: "Вы ＿ ?", en: "What are you doing? (делать)", options: ["делаете", "делаем", "делают", "делаешь"], answer: "делаете", why: "вы takes -ете." },
      ],
    },
    {
      id: "accusative",
      title: "The object: -у and -ю",
      particle: "-а → -у",
      summary: "Feminine nouns change -а to -у when they are the object.",
      sections: [
        {
          p: "When a noun is the thing you read, see or buy, it goes into the <b>accusative</b>. For feminine nouns, -а becomes <b>-у</b> and -я becomes <b>-ю</b>.",
          examples: [
            ["Я читаю книг{у}.", "Ya chitayu knigu.", "I'm reading a book."],
            ["Он любит Анн{у}.", "On lyubit Annu.", "He loves Anna."],
            ["Мы ждём Тан{ю}.", "My zhdyom Tanyu.", "We're waiting for Tanya."],
          ],
        },
        {
          h: "Things that don't change",
          p: "Masculine nouns for things, and all neuter nouns, stay exactly as they are. (Masculine nouns for people and animals do change; that comes later.)",
          examples: [
            ["Я вижу дом.", "Ya vizhu dom.", "I see a house."],
            ["Она пьёт молоко.", "Ona p'yot moloko.", "She drinks milk."],
          ],
        },
      ],
      drills: [
        { q: "Я читаю ＿ .", en: "I'm reading a newspaper. (газета)", options: ["газету", "газета", "газете", "газеты"], answer: "газету", why: "Feminine object: -а → -у." },
        { q: "Он пьёт ＿ .", en: "He drinks water. (вода)", options: ["воду", "вода", "воде", "воды"], answer: "воду", why: "вода is feminine and the object: воду." },
        { q: "Мы смотрим ＿ .", en: "We're watching a film. (фильм)", options: ["фильм", "фильму", "фильма", "фильме"], answer: "фильм", why: "Masculine things don't change in the accusative." },
        { q: "Я знаю ＿ .", en: "I know Olya. (Оля)", options: ["Олю", "Оля", "Олу", "Оле"], answer: "Олю", why: "-я becomes -ю." },
        { q: "Она открывает ＿ .", en: "She opens the window. (окно)", options: ["окно", "окну", "окна", "окне"], answer: "окно", why: "Neuter nouns don't change in the accusative." },
      ],
    },
    {
      id: "prepositional",
      title: "в and на: where things are",
      particle: "в / на + -е",
      summary: "“In” and “at” take the prepositional case, usually ending in -е.",
      sections: [
        {
          p: "To say where something is, use <b>в</b> (in) or <b>на</b> (on, at) and change the noun's ending, most often to <b>-е</b>. Consonant: add -е. -а / -я / -о: replace with -е.",
          examples: [
            ["в парк{е}", "v parke", "in the park (парк)"],
            ["в школ{е}", "v shkole", "at school (школа)"],
            ["на стол{е}", "na stole", "on the table (стол)"],
            ["в Москв{е}", "v Moskve", "in Moscow (Москва)"],
          ],
        },
        {
          h: "Places that take на",
          p: "Some places use на where English says “at”: на работе (at work), на почте (at the post office), на улице (outside, “on the street”). Learn them as you meet them.",
          examples: [["Папа {на} работе.", "Papa na rabote.", "Dad is at work."]],
        },
      ],
      drills: [
        { q: "Книга на ＿ .", en: "The book is on the table. (стол)", options: ["столе", "стол", "столу", "стола"], answer: "столе", why: "After на for a location, add -е: столе." },
        { q: "Я живу в ＿ .", en: "I live in London. (Лондон)", options: ["Лондоне", "Лондон", "Лондону", "Лондона"], answer: "Лондоне", why: "в + location: Лондоне." },
        { q: "Дети в ＿ .", en: "The children are at school. (школа)", options: ["школе", "школа", "школу", "школы"], answer: "школе", why: "-а is replaced by -е." },
        { q: "Она на ＿ .", en: "She is at work. (работа)", options: ["работе", "работа", "работу", "работы"], answer: "работе", why: "на работе: -а → -е." },
        { q: "Мы в ＿ .", en: "We're in the city. (город)", options: ["городе", "город", "городу", "города"], answer: "городе", why: "Consonant ending: add -е." },
      ],
    },
    {
      id: "plural",
      title: "Plurals: -ы and -и",
      particle: "-ы / -и / -а",
      summary: "Most masculine and feminine nouns add -ы or -и; neuters end in -а.",
      sections: [
        {
          p: "Masculine nouns add <b>-ы</b>; feminine nouns swap -а for <b>-ы</b>. After г, к, х, ж, ш, ч, щ (and for -я / -ь endings) the ending is <b>-и</b> instead, because Russian spelling never writes ы after those letters.",
          examples: [
            ["стол → стол{ы}", "stol → stoly", "table → tables"],
            ["мама → мам{ы}", "mama → mamy", "mum → mums"],
            ["книга → книг{и}", "kniga → knigi", "book → books"],
            ["неделя → недел{и}", "nedelya → nedeli", "week → weeks"],
          ],
        },
        {
          h: "Neuter plurals",
          p: "Neuter -о becomes <b>-а</b>, and -е becomes <b>-я</b>. The stress often moves too.",
          examples: [
            ["окно → окн{а}", "okno → okna", "window → windows"],
            ["море → мор{я}", "more → morya", "sea → seas"],
          ],
        },
      ],
      drills: [
        { q: "журнал → ？", en: "magazine → magazines", options: ["журналы", "журнали", "журнала", "журналя"], answer: "журналы", why: "Masculine, ending in л: add -ы." },
        { q: "собака → ？", en: "dog → dogs", options: ["собаки", "собакы", "собаку", "собака"], answer: "собаки", why: "After к the ending is -и, never -ы." },
        { q: "лампа → ？", en: "lamp → lamps", options: ["лампы", "лампи", "лампу", "лампе"], answer: "лампы", why: "Feminine -а becomes -ы after п." },
        { q: "место → ？", en: "place → places", options: ["места", "месты", "мести", "месте"], answer: "места", why: "Neuter -о becomes -а." },
        { q: "нож → ？", en: "knife → knives", options: ["ножи", "ножы", "ножа", "ноже"], answer: "ножи", why: "After ж, Russian writes и, not ы." },
      ],
    },
  ],
};
