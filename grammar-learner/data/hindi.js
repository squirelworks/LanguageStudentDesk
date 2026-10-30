// Hindi first grammar for the Grammar Learner. Written for this project.
// Examples are [Hindi, transliteration, English]; {braces} mark the point of the lesson.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.hindi = {
  title: "Hindi first grammar",
  intro: "Hindi puts the verb at the end, uses postpositions that come after the noun instead of prepositions before it, and gives every noun a gender that the words around it follow. These lessons cover “to be”, word order, gender, the main postpositions, का / की / के for possession, and the everyday present tense. Transliteration is simplified: a long vowel has a line over it, and n after a vowel can mark nasal sound.",
  lessons: [
    {
      id: "hona",
      title: "हूँ, है, हो, हैं — “to be”",
      particle: "होना",
      summary: "“Am / is / are” changes with the subject and goes at the end.",
      sections: [
        {
          p: "The verb होना (to be) comes last in the sentence and agrees with the subject.",
          examples: [
            ["मैं छात्र {हूँ}।", "Main chhātra hūn.", "I am a student."],
            ["तुम कहाँ {हो}?", "Tum kahān ho?", "Where are you? (friendly)"],
            ["आप डॉक्टर {हैं}।", "Āp ḍokṭar hain.", "You are a doctor. (polite)"],
            ["यह मेरा घर {है}।", "Yah merā ghar hai.", "This is my house."],
            ["हम दोस्त {हैं}।", "Ham dost hain.", "We are friends."],
          ],
        },
        {
          h: "Three ways to say “you”",
          p: "<b>आप</b> is polite and takes हैं, even for one person. <b>तुम</b> is for friends and family and takes हो. <b>तू</b> is very intimate and best avoided at first. Polite आप is always a safe choice.",
        },
      ],
      drills: [
        { q: "मैं भारतीय ＿ ।", en: "I am Indian.", options: ["हूँ", "है", "हो", "हैं"], answer: "हूँ", why: "मैं (I) takes हूँ." },
        { q: "वह मेरी बहन ＿ ।", en: "She is my sister.", options: ["है", "हूँ", "हो", "हैं"], answer: "है", why: "वह (he / she / that) takes है." },
        { q: "आप कैसे ＿ ?", en: "How are you? (polite)", options: ["हैं", "है", "हो", "हूँ"], answer: "हैं", why: "Polite आप always takes हैं." },
        { q: "तुम कहाँ ＿ ?", en: "Where are you? (to a friend)", options: ["हो", "है", "हूँ", "हैं"], answer: "हो", why: "तुम takes हो." },
        { q: "वे शिक्षक ＿ ।", en: "They are teachers.", options: ["हैं", "है", "हो", "हूँ"], answer: "हैं", why: "वे (they) takes हैं." },
      ],
    },
    {
      id: "word-order",
      title: "Subject, object, verb",
      particle: "SOV",
      summary: "The verb goes last, and yes/no questions just add क्या.",
      sections: [
        {
          p: "A Hindi sentence runs subject – object – verb. Time and place words usually come early, after the subject.",
          examples: [
            ["मैं चाय पीता हूँ।", "Main chāy pītā hūn.", "I drink tea. (I tea drink.)"],
            ["राम हिंदी सीखता है।", "Rām hindī sīkhtā hai.", "Ram learns Hindi."],
          ],
        },
        {
          h: "Questions",
          p: "Put <b>क्या</b> at the start to turn a statement into a yes/no question; the word order stays the same. Question words like कहाँ (where) and क्या (what) usually sit just before the verb.",
          examples: [
            ["{क्या} आप हिंदी बोलते हैं?", "Kyā āp hindī bolte hain?", "Do you speak Hindi?"],
            ["आपका नाम {क्या} है?", "Āpkā nām kyā hai?", "What is your name?"],
          ],
        },
      ],
      drills: [
        { q: "Which is the normal Hindi order for “I eat rice”?", en: "चावल = rice, खाता हूँ = eat", options: ["मैं चावल खाता हूँ।", "मैं खाता हूँ चावल।", "खाता हूँ मैं चावल।", "चावल मैं हूँ खाता।"], answer: "मैं चावल खाता हूँ।", why: "Subject – object – verb, with हूँ at the very end." },
        { q: "How do you turn “आप भारत से हैं” into “Are you from India?”", en: "", options: ["क्या आप भारत से हैं?", "आप क्या भारत हैं से?", "आप भारत से हैं क्या हैं?", "हैं आप भारत से?"], answer: "क्या आप भारत से हैं?", why: "Add क्या at the start; nothing else moves." },
        { q: "आपका नाम ＿ है?", en: "What is your name?", options: ["क्या", "कहाँ", "कौन", "कब"], answer: "क्या", why: "क्या = what, placed before the verb." },
        { q: "वह ＿ है?", en: "Where is he?", options: ["कहाँ", "क्या", "कब", "कैसे"], answer: "कहाँ", why: "कहाँ = where." },
        { q: "Where does the verb go in a Hindi sentence?", en: "", options: ["At the end", "Second", "At the start", "Anywhere"], answer: "At the end", why: "Hindi is verb-final: subject, object, then the verb." },
      ],
    },
    {
      id: "gender",
      title: "Masculine and feminine",
      particle: "-आ / -ई",
      summary: "Many nouns ending in -ā are masculine and in -ī feminine; adjectives in -ā change to match.",
      sections: [
        {
          p: "Every noun is masculine or feminine. A good first guess: <b>-आ</b> (-ā) is masculine, <b>-ई</b> (-ī) feminine. Plenty of words break the rule (पानी, water, is masculine; किताब, book, is feminine), so learn each noun with an adjective.",
          examples: [
            ["लड़का / लड़की", "laṛkā / laṛkī", "boy / girl"],
            ["कमरा", "kamrā", "room (masculine)"],
            ["किताब", "kitāb", "book (feminine)"],
          ],
        },
        {
          h: "Adjectives in -ā change",
          p: "Adjectives ending in -ā follow the noun: <b>-ā</b> with a masculine noun, <b>-ī</b> with a feminine one, <b>-e</b> with masculine plural. Adjectives with other endings, like सुंदर (beautiful), never change.",
          examples: [
            ["{अच्छा} लड़का", "acchā laṛkā", "a good boy"],
            ["{अच्छी} लड़की", "acchī laṛkī", "a good girl"],
            ["{अच्छे} लड़के", "acche laṛke", "good boys"],
            ["{बड़ी} किताब", "baṛī kitāb", "a big book"],
          ],
        },
      ],
      drills: [
        { q: "＿ लड़की", en: "a tall girl (tall = लंबा)", options: ["लंबी", "लंबा", "लंबे"], answer: "लंबी", why: "लड़की is feminine, so -ā becomes -ī: लंबी." },
        { q: "＿ कमरा", en: "a big room (big = बड़ा)", options: ["बड़ा", "बड़ी", "बड़े"], answer: "बड़ा", why: "कमरा is masculine singular: बड़ा." },
        { q: "＿ किताब", en: "a new book (new = नया)", options: ["नई", "नया", "नए"], answer: "नई", why: "किताब is feminine even though it doesn't end in -ī: नई." },
        { q: "＿ लड़के", en: "good boys (good = अच्छा)", options: ["अच्छे", "अच्छा", "अच्छी"], answer: "अच्छे", why: "Masculine plural: -ā becomes -e." },
        { q: "Which adjective stays the same for every noun?", en: "", options: ["सुंदर", "अच्छा", "बड़ा", "छोटा"], answer: "सुंदर", why: "Only adjectives ending in -ā change; सुंदर ends in a consonant." },
      ],
    },
    {
      id: "postpositions",
      title: "में, पर, से, को",
      particle: "में पर से को",
      summary: "In, on, from and to come after the noun.",
      sections: [
        {
          p: "Hindi says “the house in” instead of “in the house”. These little words are <b>postpositions</b>.",
          examples: [
            ["घर {में}", "ghar men", "in the house"],
            ["मेज़ {पर}", "mez par", "on the table"],
            ["दिल्ली {से}", "dillī se", "from Delhi"],
            ["राम {को}", "Rām ko", "to Ram"],
          ],
        },
        {
          h: "In sentences",
          p: "से also means “with” or “by” (a tool, a vehicle), and को marks the person you give to or tell. -ā nouns change to -e before a postposition: कमरा → कमरे में, “in the room”.",
          examples: [
            ["किताब मेज़ {पर} है।", "Kitāb mez par hai.", "The book is on the table."],
            ["मैं मुंबई {से} हूँ।", "Main mumbaī se hūn.", "I am from Mumbai."],
            ["वह कमरे {में} है।", "Vah kamre men hai.", "He is in the room."],
          ],
        },
      ],
      drills: [
        { q: "बच्चे पार्क ＿ हैं।", en: "The children are in the park.", options: ["में", "पर", "से", "को"], answer: "में", why: "“In” is में, after the noun." },
        { q: "चाबी मेज़ ＿ है।", en: "The key is on the table.", options: ["पर", "में", "से", "को"], answer: "पर", why: "“On” is पर." },
        { q: "वह लंदन ＿ है।", en: "She is from London.", options: ["से", "में", "पर", "को"], answer: "से", why: "“From” is से." },
        { q: "मैं ＿ में हूँ।", en: "I am in the room. (कमरा)", options: ["कमरे", "कमरा", "कमरी", "कमरों"], answer: "कमरे", why: "A masculine -ā noun becomes -e before a postposition." },
        { q: "मैं बस ＿ जाता हूँ।", en: "I go by bus.", options: ["से", "में", "पर", "को"], answer: "से", why: "से also means “by / with” for a means of travel." },
      ],
    },
    {
      id: "ka-ki-ke",
      title: "का, की, के — of",
      particle: "का / की / के",
      summary: "“X’s Y”: the word for “of” matches Y, the thing owned.",
      sections: [
        {
          p: "To say “Ram's house”, put the owner first, then का / की / के, then the thing. It agrees with the <b>thing owned</b>, not with the owner: <b>का</b> masculine, <b>की</b> feminine, <b>के</b> masculine plural.",
          examples: [
            ["राम {का} घर", "Rām kā ghar", "Ram's house"],
            ["राम {की} किताब", "Rām kī kitāb", "Ram's book"],
            ["राम {के} जूते", "Rām ke jūte", "Ram's shoes"],
          ],
        },
        {
          h: "My, your: मेरा, आपका",
          p: "The possessive pronouns work the same way: मेरा / मेरी / मेरे (my), आपका / आपकी / आपके (your, polite).",
          examples: [
            ["{मेरी} माँ", "merī mān", "my mother"],
            ["{आपका} नाम", "āpkā nām", "your name"],
          ],
        },
      ],
      drills: [
        { q: "सीता ＿ भाई", en: "Sita's brother", options: ["का", "की", "के"], answer: "का", why: "भाई (brother) is masculine, so का, even though Sita is a woman." },
        { q: "अमित ＿ गाड़ी", en: "Amit's car", options: ["की", "का", "के"], answer: "की", why: "गाड़ी (car) is feminine: की." },
        { q: "बच्चों ＿ खिलौने", en: "the children's toys", options: ["के", "का", "की"], answer: "के", why: "खिलौने (toys) is masculine plural: के." },
        { q: "＿ बहन डॉक्टर है।", en: "My sister is a doctor.", options: ["मेरी", "मेरा", "मेरे"], answer: "मेरी", why: "बहन (sister) is feminine: मेरी." },
        { q: "What decides between का, की and के?", en: "", options: ["The thing owned", "The owner", "The verb", "Nothing; they are interchangeable"], answer: "The thing owned", why: "They agree with what is owned: Sita's brother is सीता का भाई." },
      ],
    },
    {
      id: "present",
      title: "The everyday present",
      particle: "-ता / -ती / -ते + है",
      summary: "Verb stem + -tā / -tī / -te, then हूँ / है / हो / हैं.",
      sections: [
        {
          p: "For things you do regularly, take the verb stem (drop -ना), add <b>-ता</b> (one man), <b>-ती</b> (a woman or women) or <b>-ते</b> (men, mixed groups, polite आप), then the right form of “to be”.",
          examples: [
            ["मैं हिंदी बोल{ता} हूँ।", "Main hindī boltā hūn.", "I speak Hindi. (a man)"],
            ["मैं हिंदी बोल{ती} हूँ।", "Main hindī boltī hūn.", "I speak Hindi. (a woman)"],
            ["वे दिल्ली में रह{ते} हैं।", "Ve dillī men rahte hain.", "They live in Delhi."],
            ["आप क्या कर{ते} हैं?", "Āp kyā karte hain?", "What do you do?"],
          ],
        },
        {
          h: "Not",
          p: "Put <b>नहीं</b> before the verb. In a negative sentence the है / हैं is often dropped.",
          examples: [["मैं मांस {नहीं} खाता।", "Main māns nahīn khātā.", "I don't eat meat."]],
        },
      ],
      drills: [
        { q: "वह (a woman) अंग्रेज़ी पढ़＿ है।", en: "She studies English.", options: ["ती", "ता", "ते"], answer: "ती", why: "A woman subject takes -ती." },
        { q: "मेरे पिता बैंक में काम कर＿ हैं।", en: "My father works in a bank.", options: ["ते", "ता", "ती"], answer: "ते", why: "Out of respect, an elder like a father takes the plural: -ते हैं." },
        { q: "मैं (a man) रोज़ दौड़＿ हूँ।", en: "I run every day.", options: ["ता", "ती", "ते"], answer: "ता", why: "One man: -ता, with हूँ for मैं." },
        { q: "हम (a mixed group) खाना बना＿ हैं।", en: "We cook food.", options: ["ते", "ता", "ती"], answer: "ते", why: "Mixed or male groups take -ते." },
        { q: "How do you say “I don't drink coffee” (a woman)?", en: "पीना = to drink", options: ["मैं कॉफ़ी नहीं पीती।", "मैं नहीं कॉफ़ी पीता।", "मैं कॉफ़ी पीती नहीं हूँ नहीं।", "नहीं मैं कॉफ़ी पीते।"], answer: "मैं कॉफ़ी नहीं पीती।", why: "नहीं goes before the verb, -ती for a woman, and है / हूँ can be dropped." },
      ],
    },
  ],
};
