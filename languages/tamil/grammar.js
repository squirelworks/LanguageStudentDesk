// Tamil first grammar for the Grammar Learner. Written for this project.
// Examples are [Tamil, transliteration, English]; {braces} mark the point of the lesson.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.tamil = {
  title: "Tamil first grammar",
  intro: "Tamil is a Dravidian language: words are built by adding suffixes one after another, the verb comes last, and the verb ending says who did it, including whether “he” is masculine, feminine or polite. Written Tamil and everyday spoken Tamil differ quite a lot; these lessons use the standard forms, which are understood everywhere and are fine for polite speech. They cover sentences without “is”, the present tense, இல்லை and இருக்கிறது, questions, case endings, and “my” and plurals.",
  lessons: [
    {
      id: "pronouns",
      title: "நான், நீங்கள் — no “is”",
      particle: "நான்",
      summary: "Saying what someone is needs no verb; the pronouns tell gender and politeness.",
      sections: [
        {
          p: "A sentence like “I am a teacher” needs no verb: <b>நான் ஆசிரியர்</b>. The pronouns: <b>நான்</b> I, <b>நீ</b> you (intimate), <b>நீங்கள்</b> you (polite or plural), <b>அவன்</b> he, <b>அவள்</b> she, <b>அவர்</b> he or she (polite).",
          examples: [
            ["{நான்} மாணவன்.", "Naan maanavan.", "I am a student. (a boy or man)"],
            ["{அவள்} என் தங்கை.", "Aval en thangai.", "She is my younger sister."],
            ["{அவர்} மருத்துவர்.", "Avar maruththuvar.", "He / she is a doctor. (polite)"],
          ],
        },
        {
          h: "Plural, and two kinds of “we”",
          p: "<b>நாங்கள்</b> means “we, but not you” and <b>நாம்</b> “we, including you”. <b>அவர்கள்</b> is “they”, and also a very respectful “he / she”.",
          examples: [
            ["{நாங்கள்} இந்தியர்கள்.", "Naangal indhiyargal.", "We are Indians. (not you)"],
            ["{நாம்} நண்பர்கள்.", "Naam nanbargal.", "We (you and I) are friends."],
          ],
        },
      ],
      drills: [
        { q: "＿ யார்?", en: "Who are you? (polite)", options: ["நீங்கள்", "நான்", "அவள்", "நாம்"], answer: "நீங்கள்", why: "Polite “you” is நீங்கள்." },
        { q: "＿ என் அண்ணன்.", en: "He is my elder brother.", options: ["அவன்", "அவள்", "நான்", "நாங்கள்"], answer: "அவன்", why: "அவன் = he." },
        { q: "Which “we” includes the listener?", en: "", options: ["நாம்", "நாங்கள்", "நீங்கள்", "அவர்கள்"], answer: "நாம்", why: "நாம் is “we, you included”." },
        { q: "Which means “She is a teacher” (polite)?", en: "ஆசிரியர் = teacher", options: ["அவர் ஆசிரியர்.", "அவர் இருக்கிறது ஆசிரியர்.", "ஆசிரியர் அவரை.", "அவருக்கு ஆசிரியர்."], answer: "அவர் ஆசிரியர்.", why: "No verb is needed to say what someone is." },
        { q: "＿ தமிழன்.", en: "I am Tamil. (a man)", options: ["நான்", "நீ", "அவள்", "நாம்"], answer: "நான்", why: "நான் = I." },
      ],
    },
    {
      id: "present",
      title: "The present tense: -கிற்-",
      particle: "-கிறேன்",
      summary: "Verb stem + -கிற்- (or -கின்ற்-) + an ending for who does it.",
      sections: [
        {
          p: "Take the stem, add the present marker <b>-கிற்-</b>, then the person ending. For படி (read, study): <b>படிக்கிறேன்</b> I, <b>படிக்கிறாய்</b> you, <b>படிக்கிறீர்கள்</b> you (polite), <b>படிக்கிறான்</b> he, <b>படிக்கிறாள்</b> she, <b>படிக்கிறார்</b> he/she (polite), <b>படிக்கிறோம்</b> we, <b>படிக்கிறார்கள்</b> they.",
          examples: [
            ["நான் தமிழ் படிக்{கிறேன்}.", "Naan thamizh padikkiren.", "I am learning Tamil."],
            ["அவள் பாடு{கிறாள்}.", "Aval paadugiraal.", "She sings."],
            ["நீங்கள் எங்கே வசிக்{கிறீர்கள்}?", "Neengal enge vasikkireergal?", "Where do you live?"],
          ],
        },
        {
          h: "Some stems change",
          p: "Some verbs use -கிற்- straight after the stem and some double the k (படிக்கிறேன்). A few are irregular: வா (come) → <b>வருகிறேன்</b>, போ (go) → <b>போகிறேன்</b>.",
          examples: [
            ["நான் நாளை {வருகிறேன்}.", "Naan naalai varugiren.", "I'll come tomorrow."],
          ],
        },
      ],
      drills: [
        { q: "நான் காபி குடிக்கிற＿.", en: "I drink coffee.", options: ["ேன்", "ான்", "ாள்", "ோம்"], answer: "ேன்", why: "“I” takes -ஏன்." },
        { q: "அவள் வேலை செய்கிற＿.", en: "She works.", options: ["ாள்", "ான்", "ேன்", "ார்கள்"], answer: "ாள்", why: "“She” takes -ஆள்." },
        { q: "அவன் பள்ளிக்குப் போகிற＿.", en: "He goes to school.", options: ["ான்", "ாள்", "ேன்", "ீர்கள்"], answer: "ான்", why: "“He” takes -ஆன்." },
        { q: "நாங்கள் தமிழ் பேசுகிற＿.", en: "We speak Tamil.", options: ["ோம்", "ேன்", "ார்", "ாய்"], answer: "ோம்", why: "“We” takes -ஓம்." },
        { q: "நீங்கள் என்ன செய்கிற＿?", en: "What do you do? (polite)", options: ["ீர்கள்", "ாய்", "ேன்", "ான்"], answer: "ீர்கள்", why: "Polite “you” takes -ஈர்கள்." },
      ],
    },
    {
      id: "illai",
      title: "இருக்கிறது and இல்லை",
      particle: "இல்லை",
      summary: "இருக்கிறது says something is there; இல்லை says it isn't, or that something is not so.",
      sections: [
        {
          p: "<b>இருக்கிறது</b> (in speech இருக்கு) means “is there, exists”. For a person it agrees like a verb: அவர் வீட்டில் <b>இருக்கிறார்</b>, “he is at home”. <b>இல்லை</b> means “is not, there isn't” for every person.",
          examples: [
            ["இங்கே ஒரு கடை {இருக்கிறது}.", "Inge oru kadai irukkiradhu.", "There is a shop here."],
            ["அப்பா வீட்டில் {இல்லை}.", "Appaa veettil illai.", "Dad isn't at home."],
            ["இது காபி {இல்லை}.", "Idhu kaapi illai.", "This isn't coffee."],
          ],
        },
        {
          h: "Having",
          p: "Tamil says “to me there is”: <b>எனக்கு</b> (to me) + noun + இருக்கிறது. “Don't have” uses இல்லை. இல்லை on its own is also the word “no”; “yes” is ஆமாம்.",
          examples: [
            ["{எனக்கு} இரண்டு பிள்ளைகள் இருக்கிறார்கள்.", "Enakku irandu pillaigal irukkiraargal.", "I have two children."],
            ["{எனக்கு} நேரம் இல்லை.", "Enakku neram illai.", "I don't have time."],
          ],
        },
      ],
      drills: [
        { q: "பையில் பணம் ＿.", en: "There's no money in the bag.", options: ["இல்லை", "இருக்கிறது", "ஆமாம்", "என்ன"], answer: "இல்லை", why: "“There isn't” is இல்லை." },
        { q: "எனக்கு ஒரு தம்பி ＿.", en: "I have a younger brother.", options: ["இருக்கிறான்", "இல்லை", "இருக்கிறது", "இருக்கிறேன்"], answer: "இருக்கிறான்", why: "எனக்கு … இருக்கிறான்: a brother is a he, so the verb ends in -ஆன்." },
        { q: "இது என் பை ＿.", en: "This isn't my bag.", options: ["இல்லை", "இருக்கிறது", "ஆமாம்", "எங்கே"], answer: "இல்லை", why: "இல்லை after a noun means “is not”." },
        { q: "The Tamil for “yes” is…", en: "", options: ["ஆமாம்", "இல்லை", "என்ன", "சரி"], answer: "ஆமாம்", why: "ஆமாம் = yes; சரி = okay." },
        { q: "＿ நேரம் இல்லை.", en: "I don't have time.", options: ["எனக்கு", "நான்", "என்", "நாம்"], answer: "எனக்கு", why: "Having uses எனக்கு, “to me”." },
      ],
    },
    {
      id: "questions",
      title: "Asking questions",
      particle: "-ஆ",
      summary: "Add -ஆ to the end for yes or no; question words sit where the answer would go.",
      sections: [
        {
          p: "Add <b>-ஆ</b> to the last word for a yes/no question: பேசுகிறீர்கள் → <b>பேசுகிறீர்களா?</b> “Do you speak?” Question words stay in place: <b>என்ன</b> what, <b>யார்</b> who, <b>எங்கே</b> where, <b>எப்போது</b> when, <b>ஏன்</b> why, <b>எப்படி</b> how, <b>எவ்வளவு</b> how much.",
          examples: [
            ["நீங்கள் ஆங்கிலம் பேசுகிறீர்கள்{ா}?", "Neengal aangilam pesugireergalaa?", "Do you speak English?"],
            ["உங்கள் பெயர் {என்ன}?", "Ungal peyar enna?", "What is your name?"],
            ["இது {எவ்வளவு}?", "Idhu evvalavu?", "How much is this?"],
          ],
        },
      ],
      drills: [
        { q: "கழிப்பறை ＿?", en: "Where is the toilet?", options: ["எங்கே", "என்ன", "யார்", "ஏன்"], answer: "எங்கே", why: "எங்கே = where." },
        { q: "நீங்கள் ＿ இருக்கிறீர்கள்?", en: "How are you?", options: ["எப்படி", "எங்கே", "யார்", "எவ்வளவு"], answer: "எப்படி", why: "எப்படி = how." },
        { q: "அவர் ＿?", en: "Who is he?", options: ["யார்", "என்ன", "எப்போது", "ஏன்"], answer: "யார்", why: "யார் = who." },
        { q: "Make «இது உங்கள் வீடு» a question:", en: "Is this your house?", options: ["இது உங்கள் வீடா?", "இது உங்கள் வீடு என்ன?", "ஆ இது உங்கள் வீடு?", "இது உங்கள் யார் வீடு?"], answer: "இது உங்கள் வீடா?", why: "Add -ஆ to the last word: வீடு → வீடா." },
        { q: "பஸ் ＿ வரும்?", en: "When will the bus come?", options: ["எப்போது", "எங்கே", "ஏன்", "யார்"], answer: "எப்போது", why: "எப்போது = when." },
      ],
    },
    {
      id: "cases",
      title: "In, from, to: -இல், -இலிருந்து, -க்கு",
      particle: "-இல் -க்கு",
      summary: "Case endings join the noun where English uses prepositions.",
      sections: [
        {
          p: "<b>-இல்</b> means “in, at”, <b>-இலிருந்து</b> “from”, <b>-க்கு</b> “to, for”, and <b>-ஐ</b> marks a definite object. Nouns in -ம் change it to -த்-: மரம் → மரத்தில், in the tree.",
          examples: [
            ["நான் சென்னை{யில்} வசிக்கிறேன்.", "Naan chennaiyil vasikkiren.", "I live in Chennai."],
            ["அவர் மதுரை{யிலிருந்து} வருகிறார்.", "Avar madhuraiyilirundhu varugiraar.", "He is coming from Madurai."],
            ["நான் கடை{க்கு}ப் போகிறேன்.", "Naan kadaikkup pogiren.", "I'm going to the shop."],
          ],
        },
        {
          h: "Linking sounds",
          p: "Between a vowel and an ending a y or v slips in (சென்னை → சென்னையில்), and a k, ch, t or p often doubles at the start of the next word (கடைக்குப் போகிறேன்). This is how the spoken sounds run together.",
        },
      ],
      drills: [
        { q: "புத்தகம் மேசை＿ இருக்கிறது.", en: "The book is on the table.", options: ["யில்", "க்கு", "யிலிருந்து", "ஐ"], answer: "யில்", why: "-இல் = in, at, on; after ஐ a y slips in." },
        { q: "நான் லண்டன＿ வருகிறேன்.", en: "I come from London.", options: ["ிலிருந்து", "ில்", "ுக்கு", "ை"], answer: "ிலிருந்து", why: "-இலிருந்து = from: லண்டனிலிருந்து." },
        { q: "நான் பள்ளி＿ப் போகிறேன்.", en: "I go to school.", options: ["க்கு", "இல்", "யிலிருந்து", "ஐ"], answer: "க்கு", why: "-க்கு = to." },
        { q: "அவள் வீட்டி＿ இருக்கிறாள்.", en: "She is at home.", options: ["ல்", "க்கு", "லிருந்து", "ஐ"], answer: "ல்", why: "வீடு + இல் = வீட்டில், at home." },
        { q: "அம்மா＿ ஒரு பரிசு", en: "a present for Mum", options: ["வுக்கு", "வில்", "விலிருந்து", "வை"], answer: "வுக்கு", why: "-க்கு = for; after அம்மா a v slips in: அம்மாவுக்கு." },
      ],
    },
    {
      id: "en-kal",
      title: "My, and plurals with -கள்",
      particle: "என் -கள்",
      summary: "என், உங்கள் before the noun; -கள் makes a plural.",
      sections: [
        {
          p: "<b>என்</b> my, <b>உன்</b> your (intimate), <b>உங்கள்</b> your (polite), <b>அவனுடைய</b> his, <b>அவளுடைய</b> her, <b>எங்கள் / நம்</b> our. For a name, add <b>-உடைய</b> or <b>-இன்</b>: ராமுடைய வீடு, Ram's house.",
          examples: [
            ["{என்} பெயர் மீனா.", "En peyar Meenaa.", "My name is Meena."],
            ["{உங்கள்} ஊர் எது?", "Ungal oor edhu?", "Which is your home town?"],
          ],
        },
        {
          h: "Plurals",
          p: "Add <b>-கள்</b> for the plural. Nouns in -ம் change it to -ங்-: புத்தகம் → <b>புத்தகங்கள்</b>, books. After a number the plural is optional for things.",
          examples: [
            ["நண்பர்{கள்}", "nanbargal", "friends"],
            ["புத்தக{ங்கள்}", "puththagangal", "books"],
          ],
        },
      ],
      drills: [
        { q: "＿ அம்மா ஆசிரியர்.", en: "My mother is a teacher.", options: ["என்", "நான்", "எனக்கு", "உங்கள்"], answer: "என்", why: "என் = my." },
        { q: "＿ பெயர் என்ன?", en: "What is your name? (polite)", options: ["உங்கள்", "என்", "உன்", "அவள்"], answer: "உங்கள்", why: "Polite “your” is உங்கள்." },
        { q: "பழம் → ＿", en: "fruit → fruits", options: ["பழங்கள்", "பழம்கள்", "பழத்தில்", "பழமா"], answer: "பழங்கள்", why: "-ம் becomes -ங்- before -கள்." },
        { q: "பையன் → ＿", en: "boy → boys", options: ["பையன்கள்", "பையங்கள்", "பையனுக்கு", "பையனா"], answer: "பையன்கள்", why: "Add -கள்." },
        { q: "ராம＿ கார்", en: "Ram's car", options: ["ுடைய", "ில்", "ுக்கு", "ை"], answer: "ுடைய", why: "-உடைய = 's, of: ராமுடைய." },
      ],
    },
  ],
};
