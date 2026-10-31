// Guided paths for the Language Learner. A path is a list of stages; each
// step points at a Desk tool and says how to tell it is done:
//   { grammar: [lessonIds] }        every lesson passed in the Grammar Learner
//   { vocab: deckId, min: n }       n cards of that deck studied in the Vocabulary Learner
//   { mine: n }                     n words in the Vocabulary Learner's My words
//   (none)                          ticked off by hand
// Tool paths are relative to the Desk root; ?lang= is added automatically.
(() => {
  const KANA = "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/index.html";
  const ALPHA = "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/index.html";
  const CHARS = "character-learner/index.html";
  const VOCAB = "vocabulary-learner/index.html";
  const GRAMMAR = "grammar-learner/index.html";
  const tools = (...t) => t;
  const gr = (id, title, text, lessons) => ({ id, title, text, lessons });
  const T = {
    chars: ["Character Learner", CHARS],
    vocab: ["Vocabulary Learner", VOCAB],
    grammar: ["Grammar Learner", GRAMMAR],
    translation: ["Translation Learner", "translation-learner/index.html"],
    resources: ["Resource Learner", "resource-learner/index.html"],
    reference: ["Reference Learner", "reference-learner/index.html"],
  };

  // A script, its example words, first grammar, your own words, then the wider Desk.
  // grammar is a list of { id, title, text, lessons } steps checked in the Grammar Learner;
  // leave it empty for a language with no lessons yet and the stage is left out.
  // words is how many example words the script has, when that is fewer than thirty.
  const COUNT = { 7: "seven", 9: "nine", 10: "ten", 11: "eleven", 12: "twelve", 15: "fifteen", 18: "eighteen", 20: "twenty", 23: "twenty-three", 25: "twenty-five", 30: "thirty" };
  function alphabetPath(script, appName, grammar, words = 30) {
    const most = Math.min(30, words);
    const first = Math.min(15, Math.floor(most / 2));
    const path = [
      {
        title: "Learn the script",
        steps: [
          { id: "script", title: "Learn the letters", text: "Work through the lessons, chart and quiz until you can read every letter without the hint.", tools: tools([appName, ALPHA, true], T.chars) },
          { id: "words", title: "Read your first words", text: "Each letter comes with an example word. Study " + COUNT[first] + " of them in spaced review.", tools: tools(T.vocab), check: { vocab: "sg-" + script + "-words", min: first } },
        ],
      },
      {
        title: "First sentences",
        steps: grammar.map((g) => ({ id: g.id, title: g.title, text: g.text, tools: tools(T.grammar), check: { grammar: g.lessons } })),
      },
      {
        title: "Grow your vocabulary",
        steps: [
          { id: "more-words", title: most === 30 ? "Thirty example words" : "Every example word", text: "Keep a few new words coming each day until " + (most === 30 ? "thirty are" : "all " + COUNT[most] + " are") + " in your review.", tools: tools(T.vocab), check: { vocab: "sg-" + script + "-words", min: most } },
          { id: "mine", title: "Collect ten words of your own", text: "Add words you meet in songs, signs or lessons to My words.", tools: tools(T.vocab), check: { mine: 10 } },
          grammar.length
            ? { id: "explore", title: "Find a course or a book", text: "Pick a textbook, course or reader to take you further than the Desk's grammar lessons.", tools: tools(T.resources, T.reference) }
            : { id: "explore", title: "Find a course or a book", text: "Pick a textbook or course for your first sentences. Forvo, Wiktionary and Anki work for every language.", tools: tools(T.resources) },
        ],
      },
    ];
    return grammar.length ? path : path.filter((stage) => stage.steps.length);
  }

  window.LANGUAGE_PATHS = {
    japanese: [
      {
        title: "Read the kana",
        steps: [
          { id: "hiragana", title: "Learn hiragana", text: "The 46 basic hiragana, then the voiced and combination sounds. Use the chart, quiz and writing pad until you can read them without hints.", tools: tools(["SquirrelGo Kana", KANA, true], T.chars) },
          { id: "hira-words", title: "First words in hiragana", text: "Every kana has an example word. Study twenty of them in spaced review.", tools: tools(T.vocab), check: { vocab: "sg-hiragana-words", min: 20 } },
          { id: "katakana", title: "Learn katakana", text: "Same sounds, sharper shapes, used for foreign words and names.", tools: tools(["SquirrelGo Kana", KANA, true], T.chars) },
          { id: "kata-words", title: "First words in katakana", text: "Study twenty katakana example words. Many are English loanwords: read them aloud.", tools: tools(T.vocab), check: { vocab: "sg-katakana-words", min: 20 } },
        ],
      },
      {
        title: "First sentences",
        steps: [
          { id: "wa-ga", title: "Topic and subject: は and が", text: "The two particles every sentence starts with.", tools: tools(T.grammar), check: { grammar: ["wa", "ga", "wa-ga"] } },
          { id: "basic-phrases", title: "Survival phrases", text: "Greetings, numbers, directions and emergencies from the Phrasebook's Basic pack.", tools: tools(T.vocab, ["SquirrelGo Phrasebook", "SquirrelGo-Apps/squirrelgo-phrasebook/index.html", true]), check: { vocab: "pb-basic", min: 25 } },
          { id: "o-ni-de", title: "Objects, places and directions", text: "を, に, へ and で: what, where to, and where it happens.", tools: tools(T.grammar), check: { grammar: ["o", "ni", "e", "de"] } },
        ],
      },
      {
        title: "Building up",
        steps: [
          { id: "kanji-n5", title: "Your first kanji", text: "The JLPT N5 kanji: numbers, days, people, directions. Learn the meanings in review and the stroke order in SquirrelGo Kanji or the Character Learner.", tools: tools(T.vocab, T.chars), check: { vocab: "kanji-n5", min: 30 } },
          { id: "small-particles", title: "Joining ideas", text: "と, も, の, から/まで and the sentence endings か, よ, ね.", tools: tools(T.grammar), check: { grammar: ["to", "mo", "no", "kara-made", "endings"] } },
          { id: "mine", title: "Look up ten words", text: "Search the dictionary in the Vocabulary Learner (Add words) and keep ten words you want to know.", tools: tools(T.vocab, ["SquirrelGo Dictionary", "SquirrelGo-Apps/squirrelgo-dictionary/index.html", true]), check: { mine: 10 } },
        ],
      },
      {
        title: "Polite verbs",
        steps: [
          { id: "desu-masu", title: "です and ます", text: "Say what something is, and what you do, will do and don't do, in polite Japanese.", tools: tools(T.grammar), check: { grammar: ["desu", "masu"] } },
          { id: "past", title: "The past", text: "ました and ませんでした: what you did yesterday.", tools: tools(T.grammar), check: { grammar: ["mashita"] } },
          { id: "adj-te", title: "Adjectives and requests", text: "The two kinds of adjective, and asking politely with てください.", tools: tools(T.grammar), check: { grammar: ["adjectives", "te-kudasai"] } },
        ],
      },
      {
        title: "Put it to use",
        steps: [
          { id: "pack", title: "Pick a specialist phrase pack", text: "Medical, Air Crew, Civil Affairs and more: switch one on in the Decks tab and review it daily.", tools: tools(T.vocab) },
          { id: "kanji-n4", title: "Kanji, level two", text: "Start the N4 kanji deck once N5 feels easy.", tools: tools(T.vocab), check: { vocab: "kanji-n4", min: 50 } },
          { id: "resources", title: "Read and translate", text: "Try the translation drills, and find reading material in the resource list.", tools: tools(T.translation, T.resources) },
        ],
      },
    ],
    klingon: [
      {
        title: "pIqaD, the Klingon script",
        steps: [
          { id: "piqad", title: "Learn the 26 letters", text: "The Klingon app has the alphabet, a quiz, a Type in pIqaD tab that turns romanization into pIqaD as you type, and a Handwriting pad for tracing each letter.", tools: tools(["Klingon app", "klingon/index.html", true], T.chars) },
          { id: "sounds", title: "Mind the capitals", text: "Klingon romanization is case-sensitive: q and Q are different sounds, and D, H, I, S are always capitals. Read a few words aloud from the Vocabulary Learner.", tools: tools(T.vocab) },
        ],
      },
      {
        title: "First words",
        steps: [
          { id: "phrases", title: "Everyday phrases", text: "nuqneH, Qapla', HIja', ghobe' and friends.", tools: tools(T.vocab), check: { vocab: "desk-phrases", min: 10 } },
          { id: "pronouns", title: "Pronouns", text: "jIH, SoH, ghaH... you will rarely need them once you know the prefixes, but they help you read.", tools: tools(T.vocab), check: { vocab: "desk-pronouns", min: 8 } },
        ],
      },
      {
        title: "Verbs",
        steps: [
          { id: "verb-shape", title: "How a verb is built", text: "Prefix + verb + suffixes, and object–verb–subject word order.", tools: tools(T.grammar), check: { grammar: ["shape", "no-object"] } },
          { id: "verbs", title: "Fifteen verbs", text: "Learn the verbs you will conjugate in the next stage.", tools: tools(T.vocab), check: { vocab: "desk-verbs", min: 15 } },
        ],
      },
      {
        title: "Suffixes and nouns",
        steps: [
          { id: "suffixes", title: "Not, can, and questions", text: "-be', -laH and -'a': the three verb suffixes you will use every day.", tools: tools(T.grammar), check: { grammar: ["verb-suffixes"] } },
          { id: "nouns", title: "Plurals and possessives", text: "-pu', -Du' and -mey, then my, your and their.", tools: tools(T.grammar), check: { grammar: ["noun-plural", "possession"] } },
          { id: "places", title: "Places, and “to be”", text: "-Daq, -vo' and -vaD, and how tlhIngan jIH says “I am a Klingon”.", tools: tools(T.grammar), check: { grammar: ["locative", "to-be"] } },
        ],
      },
      {
        title: "Who does what to whom",
        steps: [
          { id: "prefixes", title: "The prefix grid", text: "Prefixes with an object, the bare verb, and commands.", tools: tools(T.grammar), check: { grammar: ["with-object", "empty", "imperative"] } },
          { id: "numbers", title: "Numbers and questions", text: "Count to a thousand and ask who, what, where and why.", tools: tools(T.vocab), check: { vocab: "desk-numbers", min: 12 } },
          { id: "translate", title: "Translate", text: "Try English → Klingon in the Translation Learner, and write the result in pIqaD with the Klingon app's typing tab.", tools: tools(T.translation, ["Klingon app", "klingon/index.html", true]) },
        ],
      },
    ],
    chinese: [
      {
        title: "Characters and sounds",
        steps: [
          { id: "hanzi", title: "Meet the characters", text: "Browse hanzi by HSK level, starting with HSK 1: shapes, strokes and radicals.", tools: tools(T.chars) },
          { id: "greetings", title: "Greetings", text: "你好, 谢谢, 再见 — with pinyin and tones.", tools: tools(T.vocab), check: { vocab: "desk-greetings", min: 7 } },
          { id: "numbers", title: "Numbers", text: "One to ten.", tools: tools(T.vocab), check: { vocab: "desk-numbers", min: 10 } },
        ],
      },
      {
        title: "First sentences",
        steps: [
          { id: "people", title: "People and questions", text: "我, 你, 他, and 什么, 谁, 哪儿.", tools: tools(T.vocab), check: { vocab: "desk-people", min: 10 } },
          { id: "verbs", title: "Verbs and time", text: "是, 有, 去, 吃 and today/tomorrow/yesterday.", tools: tools(T.vocab), check: { vocab: "desk-verbs", min: 15 } },
          { id: "gr-basics", title: "是, 很 and saying no", text: "是 between nouns, 很 with adjectives, and the two negatives 不 and 没.", tools: tools(T.grammar), check: { grammar: ["shi", "hen", "bu-mei"] } },
        ],
      },
      {
        title: "Asking and describing",
        steps: [
          { id: "gr-questions", title: "Questions, 的 and measure words", text: "吗 questions, 我的 and 老师的, and counting things with 个, 本 and 杯.", tools: tools(T.grammar), check: { grammar: ["ma", "de", "measure"] } },
          { id: "food", title: "Food and drink", text: "Order tea, rice and noodles.", tools: tools(T.vocab), check: { vocab: "desk-food", min: 12 } },
          { id: "mine", title: "Collect ten words of your own", text: "Add words from your textbook or shows to My words.", tools: tools(T.vocab, T.resources), check: { mine: 10 } },
        ],
      },
    ],
    arabic: alphabetPath("arabic", "SquirrelGo Alphabets", [
      { id: "gr-basics", title: "“The”, gender and sentences without “is”", text: "ال and the sun letters, feminine ة, and how البيت كبير differs from البيت الكبير.", lessons: ["al", "gender", "nominal"] },
      { id: "gr-this-my", title: "This, my, in and from", text: "هذا and هذه, possessive endings like كتابي, and the prepositions في, على, من, إلى.", lessons: ["demonstratives", "possessive", "prepositions"] },
    ]),
    hangul: alphabetPath("hangul", "SquirrelGo Alphabets", [
      { id: "gr-particles", title: "Topic, subject and object", text: "은/는, 이/가 and 을/를: which shape to use after a consonant or a vowel, and what each one does.", lessons: ["eun-neun", "i-ga", "eul-reul"] },
      { id: "gr-endings", title: "Places and polite verbs", text: "에 and 에서, the polite -아요/-어요 ending, and 이에요/예요 for “to be”.", lessons: ["e-eseo", "ayo-eoyo", "copula"] },
    ]),
    cyrillic: alphabetPath("cyrillic", "SquirrelGo Alphabets", [
      { id: "gr-basics", title: "Это, gender and verbs", text: "Sentences without “is”, he/she/it by the noun's ending, and the present tense of читать.", lessons: ["eto", "gender", "present"] },
      { id: "gr-cases", title: "First case endings and plurals", text: "The object ending -у, в and на with -е, and plurals in -ы and -и.", lessons: ["accusative", "prepositional", "plural"] },
    ]),
    greek: (() => {
      const [script, sentences, grow] = alphabetPath("greek", "SquirrelGo Alphabets", [
        gr("gr-basics", "“To be”, the article and the present", "είμαι, είσαι, είναι; ο, η, το and gender; and the present tense of everyday verbs.", ["eimai", "articles", "present"]),
        gr("gr-more", "No, questions, objects and plurals", "Δεν and questions, τον, την, το for the object, and plurals with οι and τα.", ["den-questions", "accusative", "plural"]),
      ]);
      return [
        script,
        {
          title: "First words",
          steps: [
            { id: "greetings", title: "Greetings", text: "γεια σου, καλημέρα, ευχαριστώ and παρακαλώ.", tools: tools(T.vocab), check: { vocab: "desk-greetings", min: 10 } },
            { id: "numbers", title: "Numbers", text: "Zero to a thousand.", tools: tools(T.vocab), check: { vocab: "desk-numbers", min: 12 } },
            { id: "verbs", title: "Everyday verbs", text: "είμαι, έχω, θέλω, πάω and the verbs you need to get around.", tools: tools(T.vocab), check: { vocab: "desk-verbs", min: 15 } },
            { id: "food", title: "At the taverna", text: "Order water, coffee, bread and the bill.", tools: tools(T.vocab), check: { vocab: "desk-food", min: 12 } },
          ],
        },
        sentences,
        grow,
      ];
    })(),
    latin: [
      {
        title: "First words",
        steps: [
          { id: "greetings", title: "Salvē and valē", text: "Greetings and the phrases a Roman would use every day.", tools: tools(T.vocab), check: { vocab: "desk-greetings", min: 8 } },
          { id: "sounds", title: "How Latin sounds", text: "Read the overview and pronunciation cards: hard c and g, v said as w, and why the macrons matter.", tools: tools(T.reference) },
          { id: "numbers", title: "Numbers and numerals", text: "ūnus to mīlle, with the Roman numeral for each.", tools: tools(T.vocab), check: { vocab: "desk-numbers", min: 10 } },
        ],
      },
      {
        title: "First sentences",
        steps: [
          { id: "gr-verbs", title: "“To be” and the present tense", text: "sum, es, est, and the six endings that say who does it.", tools: tools(T.grammar), check: { grammar: ["esse", "present"] } },
          { id: "verbs", title: "Everyday verbs", text: "amō, videō, dīcō, faciō and their principal parts.", tools: tools(T.vocab), check: { vocab: "desk-verbs", min: 15 } },
        ],
      },
      {
        title: "Cases",
        steps: [
          { id: "gr-cases", title: "Subject, object and plurals", text: "puella and puellam, servus and servum, and their plurals.", tools: tools(T.grammar), check: { grammar: ["nom-acc", "plural"] } },
          { id: "people", title: "People", text: "Family, friends, masters and citizens, each with its genitive and gender.", tools: tools(T.vocab), check: { vocab: "desk-people", min: 12 } },
        ],
      },
      {
        title: "Building up",
        steps: [
          { id: "gr-more", title: "Agreement and prepositions", text: "bonus, bona, bonum, and the prepositions that take the accusative or the ablative.", tools: tools(T.grammar), check: { grammar: ["agreement", "prepositions"] } },
          { id: "describing", title: "Describing words", text: "Adjectives to practise agreement with.", tools: tools(T.vocab), check: { vocab: "desk-describing", min: 12 } },
          { id: "explore", title: "Read real Latin", text: "Find a reader or a course to take you on to the classics.", tools: tools(T.resources, T.reference) },
        ],
      },
    ],
    hindi: alphabetPath("devanagari", "SquirrelGo Alphabets", [
      { id: "gr-basics", title: "“To be”, word order and gender", text: "हूँ, है, हो, हैं; verb-last sentences and questions with क्या; masculine and feminine adjectives.", lessons: ["hona", "word-order", "gender"] },
      { id: "gr-phrases", title: "Postpositions, “of” and the present", text: "में, पर, से, को; का, की, के; and everyday verbs like मैं हिंदी बोलता हूँ.", lessons: ["postpositions", "ka-ki-ke", "present"] },
    ]),
  };

  // The other SquirrelGo Alphabets languages: the script, its example words, a first
  // grammar stage where the language has lessons, then your own words.
  const ALPHABETS = {
    armenian: "armenian", georgian: "georgian", hebrew: "hebrew", amharic: "ethiopic", cherokee: "cherokee",
    inuktitut: "syllabics", mongolian: "mongolian", thai: "thai", lao: "lao", khmer: "khmer", tibetan: "tibetan",
    bengali: "bengali", punjabi: "gurmukhi", gujarati: "gujarati", tamil: "tamil", telugu: "telugu",
    kannada: "kannada", malayalam: "malayalam", sinhala: "sinhala", burmese: "burmese", odia: "odia",
    tamazight: "tifinagh", manipuri: "meetei",
  };
  // First grammar for those languages; lesson ids match languages/<id>/grammar.js.
  const FIRST_GRAMMAR = {
    armenian: [
      gr("gr-basics", "“To be”, “the” and plurals", "եմ, ես, է; the endings -ը and -ն for “the”; and plurals with -եր and -ներ.", ["em", "article", "plural"]),
      gr("gr-more", "Verbs, saying no, and cases", "The present with -ում եմ, չ- and questions, and the endings for in, from and “my”.", ["present", "negative", "cases"]),
    ],
    georgian: [
      gr("gr-basics", "“To be”, this and that, plurals", "ვარ, ხარ, არის; ეს, ის and “my”; and plurals with -ები.", ["var", "es-is", "plural"]),
      gr("gr-more", "Verbs, places and saying no", "The present tense, -ში, -ზე and -დან, and არ, ვერ and questions.", ["present", "places", "ar-questions"]),
    ],
    hebrew: [
      gr("gr-basics", "No “is”, “the” and gender", "Pronouns, the prefix ה־, and adjectives that agree.", ["pronouns", "ha", "gender"]),
      gr("gr-more", "Verbs, “there is” and prefixes", "The present tense, יש and אין, and ב־, ל־, מ־ and של.", ["present", "yesh-ein", "prefixes"]),
    ],
    amharic: [
      gr("gr-basics", "“To be”, “my” and “have”", "ነኝ, ነህ, ነው; the endings for “my” and “your”; and አለ and የለም.", ["to-be", "possessives", "have-not"]),
      gr("gr-more", "Questions, places and verbs", "Question words, ከ-, በ-, ለ- and plurals, and verbs in the present and past.", ["questions", "place-plural", "verbs"]),
    ],
    mongolian: [
      gr("gr-basics", "Pronouns, questions and cases", "Pronouns and биш, questions with уу and үү, and the endings for my, in and from.", ["pronouns", "questions", "cases"]),
      gr("gr-more", "“Have” and verbs", "байна and байхгүй, and verbs in the present and the past.", ["have", "present", "past"]),
    ],
    thai: [
      gr("gr-basics", "Polite words, “to be” and word order", "ครับ and ค่ะ, เป็น, อยู่ and มี, and where describing words go.", ["polite", "pen-yuu-mii", "word-order"]),
      gr("gr-more", "No, questions, time and counting", "ไม่ and ไหม, time words for past and future, and classifiers.", ["mai-questions", "time", "classifiers"]),
    ],
    lao: [
      gr("gr-basics", "Pronouns, “to be” and word order", "ຂ້ອຍ and ເຈົ້າ, ເປັນ, ຢູ່ and ມີ, and where describing words go.", ["pronouns", "pen-yu-mi", "word-order"]),
      gr("gr-more", "No, questions, time and counting", "ບໍ່ and ບໍ, time words for past and future, and classifiers.", ["bo-questions", "time", "classifiers"]),
    ],
    khmer: [
      gr("gr-basics", "Pronouns, “to be” and word order", "បាទ and ចាស, ជា, នៅ and មាន, and where describing words go.", ["pronouns", "chea-nov-mean", "word-order"]),
      gr("gr-more", "No, questions, time and counting", "មិន…ទេ and questions, time words for past and future, and classifiers.", ["min-te", "time", "classifiers"]),
    ],
    tibetan: [
      gr("gr-basics", "Pronouns, “is” and “there is”", "Pronouns and polite words, ཡིན and རེད, and ཡོད and འདུག.", ["pronouns", "yin-re", "yod-duk"]),
      gr("gr-more", "No, questions and verbs", "Saying no, asking questions, and verbs for now, tomorrow and yesterday.", ["negation", "questions", "verbs"]),
    ],
    bengali: [
      gr("gr-basics", "No “is”, verbs and saying no", "Sentences without “is”, আছে, verbs and politeness, and না and নেই.", ["no-to-be", "present", "na"]),
      gr("gr-more", "Questions, “the” and cases", "Question words, -টা and -গুলো, and the endings -র and -তে.", ["questions", "ta-gulo", "cases"]),
    ],
    punjabi: [
      gr("gr-basics", "“To be”, word order and gender", "ਹਾਂ, ਹੈ, ਹੋ, ਹਨ; verb-last sentences and questions; masculine and feminine.", ["hona", "word-order", "gender"]),
      gr("gr-more", "Verbs, postpositions and “of”", "The present tense, ਵਿੱਚ, ਉੱਤੇ, ਤੋਂ, ਨੂੰ, and ਦਾ, ਦੀ, ਦੇ.", ["present", "postpositions", "da-di-de"]),
    ],
    gujarati: [
      gr("gr-basics", "“To be”, questions and gender", "છું, છે, છો; questions and નથી; and the three genders.", ["chhe", "questions", "gender"]),
      gr("gr-more", "Verbs, places and “of”", "The present tense, -માં, -પર, -થી, and નો, ની, નું.", ["present", "places", "no-ni-nu"]),
    ],
    tamil: [
      gr("gr-basics", "Pronouns, verbs and saying no", "Sentences without “is”, the present tense, and இருக்கிறது and இல்லை.", ["pronouns", "present", "illai"]),
      gr("gr-more", "Questions, cases and plurals", "Questions, the endings for in, from and to, “my”, and plurals with -கள்.", ["questions", "cases", "en-kal"]),
    ],
    telugu: [
      gr("gr-basics", "Pronouns, verbs and saying no", "Sentences without “is”, the present with -తున్నాను, and కాదు and లేదు.", ["pronouns", "present", "kaadu-ledu"]),
      gr("gr-more", "Questions, cases and plurals", "Questions, -లో, నుండి and -కి, “my”, and plurals with -లు.", ["questions", "cases", "naa-lu"]),
    ],
    kannada: [
      gr("gr-basics", "Pronouns, verbs and saying no", "Sentences without “is”, the present tense, and ಇದೆ, ಇಲ್ಲ and ಅಲ್ಲ.", ["pronouns", "present", "illa-alla"]),
      gr("gr-more", "Questions, cases and plurals", "Questions, the endings for in, from and to, “my”, and plurals with -ಗಳು.", ["questions", "cases", "nanna-galu"]),
    ],
    malayalam: [
      gr("gr-basics", "“Is”, verbs and saying no", "ആണ്, the present tense, and ഉണ്ട്, ഇല്ല and അല്ല.", ["aanu", "present", "illa-alla"]),
      gr("gr-more", "Questions, cases and plurals", "Questions, the endings for in, from and to, “my”, and plurals with -കൾ.", ["questions", "cases", "ente-kal"]),
    ],
    sinhala: [
      gr("gr-basics", "No “is”, verbs and saying no", "Sentences without “is”, the present with -නවා, and නෑ and නෙවෙයි.", ["no-to-be", "present", "nae"]),
      gr("gr-more", "Questions, “there is” and cases", "Questions with ද, ඉන්නවා and තියෙනවා, and the endings for to, from and “my”.", ["questions", "inna-thiyena", "cases"]),
    ],
    burmese: [
      gr("gr-basics", "Pronouns, “is” and verb endings", "Pronouns and politeness, ပါ and ရှိတယ်, and the endings တယ်, မယ် and ပြီ.", ["pronouns", "pa-shi", "endings"]),
      gr("gr-more", "No, questions and particles", "မ…ဘူး, questions with လား and လဲ, place particles and counting.", ["ma-bu", "questions", "particles"]),
    ],
    odia: [
      gr("gr-basics", "No “is”, verbs and saying no", "Sentences without “is”, ଅଛି, the present with -ଉଛି, and ନାହିଁ.", ["achhi", "present", "nahin"]),
      gr("gr-more", "Questions, cases and plurals", "Questions, -ରେ, -ରୁ and -କୁ, “my”, and plurals.", ["questions", "cases", "mora-mane"]),
    ],
    tamazight: [
      gr("gr-basics", "Pronouns, gender and plurals", "Pronouns and ⴷ, masculine and feminine nouns, and plurals.", ["pronouns", "gender", "plural"]),
      gr("gr-more", "“My”, places and verbs", "ⵉⵏⵓ and ⵏⵏⴽ, ⴳ, ⵣⴳ, ⵙ and ⵏ, and verbs in the past with ⵓⵔ for “not”.", ["possession", "places", "verbs"]),
    ],
  };
  // Scripts with fewer than thirty example words.
  const WORDS = { mongolian: 15, meetei: 18, syllabics: 20, tifinagh: 23, cherokee: 25 };
  for (const [lang, script] of Object.entries(ALPHABETS)) window.LANGUAGE_PATHS[lang] = alphabetPath(script, "SquirrelGo Alphabets", FIRST_GRAMMAR[lang] || [], WORDS[script]);
})();
