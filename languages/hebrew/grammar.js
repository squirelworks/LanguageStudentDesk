// Modern Hebrew first grammar for the Grammar Learner. Written for this project.
// Examples are [Hebrew, transliteration, English]; {braces} mark the point of the lesson.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.hebrew = {
  title: "Hebrew first grammar",
  intro: "Modern Hebrew is written right to left, usually without vowel marks, and builds words from three-consonant roots. There is no “am / is / are” in the present tense, “the” is a single letter joined to the word, and nouns, adjectives and verbs all mark masculine or feminine. These lessons cover sentences without “to be”, ה־ for “the”, gender and adjectives, the present tense, יש and אין for “there is” and “have”, and the little prepositions that join the front of a word. Transliteration follows modern Israeli pronunciation: ch is the throaty sound in Bach.",
  lessons: [
    {
      id: "pronouns",
      title: "I, you, he — no “to be”",
      particle: "אני",
      summary: "In the present tense, Hebrew just puts the subject next to what it is.",
      sections: [
        {
          p: "There is no word for “am / is / are” in the present. <b>אני סטודנט</b> is literally “I student”. The pronouns: <b>אני</b> I, <b>אתה</b> you (a man), <b>את</b> you (a woman), <b>הוא</b> he, <b>היא</b> she.",
          examples: [
            ["{אני} מורה.", "Ani more.", "I am a teacher. (a man speaking)"],
            ["{את} ישראלית?", "At yisraelit?", "Are you Israeli? (to a woman)"],
            ["{הוא} בבית.", "Hu ba-bayit.", "He is at home."],
          ],
        },
        {
          h: "The plural",
          p: "<b>אנחנו</b> we, <b>אתם</b> you (several, or mixed), <b>אתן</b> you (several women), <b>הם</b> they (men or mixed), <b>הן</b> they (women).",
          examples: [
            ["{אנחנו} חברים.", "Anachnu chaverim.", "We are friends."],
            ["{הם} בתל אביב.", "Hem be-Tel Aviv.", "They are in Tel Aviv."],
          ],
        },
      ],
      drills: [
        { q: "＿ רופאה.", en: "She is a doctor.", options: ["היא", "הוא", "את", "הם"], answer: "היא", why: "היא = she. No word for “is” is needed." },
        { q: "＿ מאיפה?", en: "Where are you from? (to a man)", options: ["אתה", "את", "אתם", "הוא"], answer: "אתה", why: "To one man: אתה." },
        { q: "＿ סטודנטים.", en: "We are students.", options: ["אנחנו", "אני", "הם", "אתם"], answer: "אנחנו", why: "אנחנו = we." },
        { q: "What does «הוא בבית» mean?", en: "", options: ["He is at home.", "He was at home.", "His house.", "Is he home?"], answer: "He is at home.", why: "The present needs no verb: “he at-home”." },
        { q: "＿ בעבודה.", en: "They (women) are at work.", options: ["הן", "הם", "אתן", "היא"], answer: "הן", why: "A group of women is הן; mixed or male is הם." },
      ],
    },
    {
      id: "ha",
      title: "ה־ — “the”",
      particle: "ה־",
      summary: "“The” is the letter ה joined to the front of the word; there is no “a”.",
      sections: [
        {
          p: "Add <b>ה</b> (ha-) to the front of a noun to make it definite: <b>בית</b> “a house”, <b>הבית</b> “the house”. There is no word for “a”: בית already means “a house”.",
          examples: [
            ["{ה}ספר", "ha-sefer", "the book"],
            ["{ה}ילדה", "ha-yalda", "the girl"],
            ["{ה}עיר", "ha-ir", "the city"],
          ],
        },
        {
          h: "“This is”",
          p: "<b>זה</b> (this, masculine) and <b>זאת</b> (this, feminine) make the simplest sentences: זה ספר, “this is a book”. Put ה on the noun and it means “this book”: הספר הזה.",
          examples: [
            ["{זה} הבית שלי.", "Ze ha-bayit sheli.", "This is my house."],
            ["{זאת} מורה חדשה.", "Zot mora chadasha.", "This is a new teacher."],
          ],
        },
      ],
      drills: [
        { q: "＿כלב גדול.", en: "The dog is big.", options: ["ה", "ב", "ל", "מ"], answer: "ה", why: "ה joined to the noun means “the”." },
        { q: "What does «ספר» mean on its own?", en: "", options: ["a book", "the book", "books", "this book"], answer: "a book", why: "Hebrew has no word for “a”; a bare noun is indefinite." },
        { q: "＿ אמא שלי.", en: "This is my mother.", options: ["זאת", "זה", "הוא", "אלה"], answer: "זאת", why: "אמא is feminine, so “this” is זאת." },
        { q: "＿ השולחן.", en: "This is the table.", options: ["זה", "זאת", "היא", "את"], answer: "זה", why: "שולחן is masculine: זה." },
        { q: "How do you write “the city” (עיר)?", en: "", options: ["העיר", "עירה", "לעיר", "בעיר"], answer: "העיר", why: "ה + עיר = העיר." },
      ],
    },
    {
      id: "gender",
      title: "Gender and adjectives",
      particle: "־ה ־ת",
      summary: "Feminine words usually end in ־ה or ־ת; adjectives follow the noun and match it.",
      sections: [
        {
          p: "Nouns are masculine or feminine. Most feminine nouns end in <b>־ה</b> (-a) or <b>־ת</b> (-t): ילדה girl, מכונית car. The adjective comes <b>after</b> the noun and adds the same ending: ילד <b>גדול</b>, ילדה <b>גדולה</b>.",
          examples: [
            ["ילד {קטן}", "yeled katan", "a small boy"],
            ["ילדה {קטנה}", "yalda ktana", "a small girl"],
            ["ילדים {קטנים}", "yeladim ktanim", "small children"],
          ],
        },
        {
          h: "“The” on both",
          p: "When the noun has ה, the adjective takes ה too: <b>הבית הגדול</b> “the big house”. Without the second ה it is a sentence: <b>הבית גדול</b> “the house is big”.",
          examples: [
            ["{ה}בית {ה}גדול", "ha-bayit ha-gadol", "the big house"],
            ["{ה}בית גדול.", "Ha-bayit gadol.", "The house is big."],
          ],
        },
      ],
      drills: [
        { q: "מכונית ＿", en: "a new car (new = חדש)", options: ["חדשה", "חדש", "חדשים", "חדשות"], answer: "חדשה", why: "מכונית is feminine, so the adjective adds ־ה." },
        { q: "ספר ＿", en: "a good book (good = טוב)", options: ["טוב", "טובה", "טובים", "טובות"], answer: "טוב", why: "ספר is masculine singular." },
        { q: "הילדה ＿", en: "the pretty girl", options: ["היפה", "יפה", "יפים", "היפים"], answer: "היפה", why: "“The girl” has ה, so the adjective needs ה too." },
        { q: "What does «החדר קטן» mean?", en: "חדר = room", options: ["The room is small.", "The small room.", "A small room.", "Small rooms."], answer: "The room is small.", why: "Only the noun has ה, so it is a sentence." },
        { q: "Which word is most likely feminine?", en: "", options: ["משפחה", "שולחן", "ספר", "בית"], answer: "משפחה", why: "It ends in ־ה, the commonest feminine ending." },
      ],
    },
    {
      id: "present",
      title: "The present tense",
      particle: "כותב/ת",
      summary: "Present-tense verbs change like adjectives: four forms for gender and number.",
      sections: [
        {
          p: "The present tense doesn't change for I, you or he. It changes for gender and number, like an adjective: <b>כותב</b> (a man writes), <b>כותבת</b> (a woman writes), <b>כותבים</b> (men or a mixed group), <b>כותבות</b> (women).",
          examples: [
            ["אני {גר} בירושלים.", "Ani gar bi-Yerushalayim.", "I live in Jerusalem. (a man)"],
            ["היא {לומדת} עברית.", "Hi lomedet ivrit.", "She is learning Hebrew."],
            ["הם {עובדים} היום.", "Hem ovdim hayom.", "They work today."],
          ],
        },
        {
          h: "Saying no",
          p: "<b>לא</b> before the verb makes it negative: אני לא מבין, “I don't understand”. A woman says מבינה.",
          examples: [
            ["אני {לא} מבינה.", "Ani lo mevina.", "I don't understand. (a woman)"],
            ["הוא {לא} מדבר אנגלית.", "Hu lo medaber anglit.", "He doesn't speak English."],
          ],
        },
      ],
      drills: [
        { q: "דנה ＿ פיתה.", en: "Dana is eating a pita.", options: ["אוכלת", "אוכל", "אוכלים", "אוכלות"], answer: "אוכלת", why: "One woman: the feminine singular in ־ת." },
        { q: "אנחנו ＿ בחיפה.", en: "We (a mixed group) live in Haifa.", options: ["גרים", "גר", "גרה", "גרות"], answer: "גרים", why: "Mixed plural takes ־ים." },
        { q: "אתה ＿ עברית?", en: "Do you speak Hebrew? (to a man)", options: ["מדבר", "מדברת", "מדברים", "מדברות"], answer: "מדבר", why: "One man: the basic masculine form." },
        { q: "אני ＿ אוהבת קפה.", en: "I don't like coffee. (a woman)", options: ["לא", "אין", "אל", "בלי"], answer: "לא", why: "לא before the verb means “not”." },
        { q: "הבנות ＿ ספרים.", en: "The girls read books.", options: ["קוראות", "קוראים", "קורא", "קוראת"], answer: "קוראות", why: "A group of women: ־ות." },
      ],
    },
    {
      id: "yesh-ein",
      title: "יש and אין — there is, I have",
      particle: "יש לי",
      summary: "יש means “there is”, אין “there isn't”; with ל־ they mean “have”.",
      sections: [
        {
          p: "<b>יש</b> means “there is / there are” and <b>אין</b> “there isn't / aren't”. Neither changes for gender or number.",
          examples: [
            ["{יש} חלב במקרר.", "Yesh chalav ba-mekarer.", "There is milk in the fridge."],
            ["{אין} בעיה.", "Ein be'aya.", "No problem. (there isn't a problem)"],
          ],
        },
        {
          h: "Having",
          p: "Hebrew has no verb “to have”. It says “there is to me”: <b>יש לי</b> I have, <b>יש לך</b> you have (לְךָ to a man, לָךְ to a woman), <b>יש לו</b> he has, <b>יש לה</b> she has, <b>יש לנו</b> we have. Swap יש for אין to say “don't have”.",
          examples: [
            ["{יש לי} אח.", "Yesh li ach.", "I have a brother."],
            ["{אין לנו} זמן.", "Ein lanu zman.", "We don't have time."],
            ["{יש לך} עט?", "Yesh lecha et?", "Do you have a pen? (to a man)"],
          ],
        },
      ],
      drills: [
        { q: "＿ לי שתי אחיות.", en: "I have two sisters.", options: ["יש", "אין", "זה", "הוא"], answer: "יש", why: "יש לי = I have." },
        { q: "＿ כסף.", en: "There's no money.", options: ["אין", "יש", "לא", "בלי"], answer: "אין", why: "“There isn't” is אין, not לא." },
        { q: "יש ＿ מכונית.", en: "She has a car.", options: ["לה", "לו", "לי", "לנו"], answer: "לה", why: "לה = to her." },
        { q: "אין ＿ ילדים.", en: "We don't have children.", options: ["לנו", "לי", "להם", "לו"], answer: "לנו", why: "לנו = to us." },
        { q: "What does «יש לו כלב» mean?", en: "", options: ["He has a dog.", "I have a dog.", "There is no dog.", "Is it a dog?"], answer: "He has a dog.", why: "לו = to him: “there is to him a dog”." },
      ],
    },
    {
      id: "prefixes",
      title: "ב־, ל־, מ־ and של",
      particle: "ב ל מ",
      summary: "In, to and from are single letters joined to the next word; של means “of”.",
      sections: [
        {
          p: "Three common prepositions are one letter long and join the next word: <b>ב־</b> in/at, <b>ל־</b> to/for, <b>מ־</b> from. Before ה they swallow it: ב + הבית = <b>בבית</b> (ba-bayit), “in the house”.",
          examples: [
            ["אני גר {ב}תל אביב.", "Ani gar be-Tel Aviv.", "I live in Tel Aviv."],
            ["אני נוסע {ל}אילת.", "Ani nose'a le-Eilat.", "I'm travelling to Eilat."],
            ["היא {מ}ניו יורק.", "Hi mi-New York.", "She is from New York."],
          ],
        },
        {
          h: "של — of, belonging to",
          p: "<b>של</b> means “of”. With endings it means “my, your…”: <b>שלי</b> mine, <b>שלך</b> yours, <b>שלו</b> his, <b>שלה</b> hers. It comes after the noun, and the noun takes ה: הספר שלי, “my book”.",
          examples: [
            ["הבית {שלי}", "ha-bayit sheli", "my house"],
            ["החבר {שלה}", "ha-chaver shela", "her friend"],
            ["הספר {של} דני", "ha-sefer shel Dani", "Danny's book"],
          ],
        },
      ],
      drills: [
        { q: "אני ＿ירושלים.", en: "I am from Jerusalem.", options: ["מ", "ב", "ל", "ה"], answer: "מ", why: "מ־ = from." },
        { q: "הם ＿בית.", en: "They are at home.", options: ["ב", "ל", "מ", "ש"], answer: "ב", why: "ב־ = in, at; ב + הבית is written בבית." },
        { q: "האוטובוס הזה נוסע ＿חיפה?", en: "Does this bus go to Haifa?", options: ["ל", "מ", "ב", "ה"], answer: "ל", why: "ל־ = to." },
        { q: "האמא ＿", en: "my mother", options: ["שלי", "שלו", "שלה", "של"], answer: "שלי", why: "שלי = my, after the noun." },
        { q: "הטלפון ＿ יוסי", en: "Yossi's phone", options: ["של", "שלי", "ל", "מ"], answer: "של", why: "של = of: “the phone of Yossi”." },
      ],
    },
  ],
};
