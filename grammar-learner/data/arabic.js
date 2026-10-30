// Arabic sentence basics (Modern Standard Arabic) for the Grammar Learner. Written for this project.
// Examples are [Arabic, transliteration, English]; {braces} mark the point of the lesson.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.arabic = {
  title: "Arabic sentence basics",
  intro: "These lessons cover the building blocks of Modern Standard Arabic: the word for “the”, masculine and feminine, sentences without “is”, “this” and “that”, attached pronouns, and the common prepositions. Arabic is read right to left and short vowels are usually not written; the transliteration under each example shows how it sounds.",
  lessons: [
    {
      id: "al",
      title: "ال — “the”",
      particle: "ال",
      summary: "One prefix for “the”, with sun and moon letters.",
      sections: [
        {
          p: "Arabic has no separate word for “a”: a bare noun is indefinite. To say “the”, join <b>ال</b> (al-) to the front of the word.",
          examples: [
            ["كتاب ← {ال}كتاب", "kitāb → al-kitāb", "a book → the book"],
            ["بيت ← {ال}بيت", "bayt → al-bayt", "a house → the house"],
          ],
        },
        {
          h: "Sun letters and moon letters",
          p: "Before half the alphabet, the “sun letters”, the l of al- is not pronounced: it turns into a copy of the next letter. They are the ones made at the front of the mouth: ت ث د ذ ر ز س ش ص ض ط ظ ل ن. The others are “moon letters” and keep the l. The spelling never changes, only the sound.",
          examples: [
            ["{ال}شمس", "ash-shams", "the sun (sun letter: l is silent, sh is doubled)"],
            ["{ال}قمر", "al-qamar", "the moon (moon letter: l is said)"],
            ["{ال}نور", "an-nūr", "the light"],
          ],
        },
      ],
      drills: [
        { q: "How do you write “the book”?", en: "كتاب = a book", options: ["الكتاب", "كتابال", "ال كتاب", "كتاب"], answer: "الكتاب", why: "ال is joined to the front of the noun: الكتاب." },
        { q: "How is السيارة (the car) pronounced?", en: "سيارة = sayyāra", options: ["as-sayyāra", "al-sayyāra", "sayyāra", "al-as-sayyāra"], answer: "as-sayyāra", why: "س is a sun letter, so the l turns into s: as-sayyāra." },
        { q: "How is الباب (the door) pronounced?", en: "باب = bāb", options: ["al-bāb", "ab-bāb", "bāb", "al-bab-al"], answer: "al-bāb", why: "ب is a moon letter: the l is pronounced." },
        { q: "Which word has a sun letter after ال?", en: "", options: ["الدرس", "القلم", "الولد", "الباب"], answer: "الدرس", why: "د is a sun letter: ad-dars. ق, و and ب are moon letters." },
        { q: "What does بيت alone mean?", en: "", options: ["a house", "the house", "houses", "this house"], answer: "a house", why: "Without ال a noun is indefinite: “a house”." },
      ],
    },
    {
      id: "gender",
      title: "Masculine and feminine",
      particle: "ة",
      summary: "Most feminine nouns end in ة, and adjectives follow the noun and match it.",
      sections: [
        {
          p: "Every noun is masculine or feminine. The usual sign of a feminine noun is the ending <b>ة</b> (tā’ marbūṭa), said -a. Many words for people make a feminine by adding it.",
          examples: [
            ["طالب / طالب{ة}", "ṭālib / ṭāliba", "student (man) / student (woman)"],
            ["مدرس / مدرس{ة}", "mudarris / mudarrisa", "teacher (man) / teacher (woman)"],
          ],
        },
        {
          h: "Adjectives come after and agree",
          p: "An adjective follows its noun and takes ة when the noun is feminine.",
          examples: [
            ["بيت كبير", "bayt kabīr", "a big house"],
            ["سيارة كبير{ة}", "sayyāra kabīra", "a big car"],
            ["مدينة جميل{ة}", "madīna jamīla", "a beautiful city"],
          ],
        },
      ],
      drills: [
        { q: "سيارة ＿", en: "a new car (new = جديد)", options: ["جديدة", "جديد"], answer: "جديدة", why: "سيارة ends in ة, so it is feminine, and the adjective takes ة too." },
        { q: "كتاب ＿", en: "a new book", options: ["جديد", "جديدة"], answer: "جديد", why: "كتاب is masculine, so the adjective stays without ة." },
        { q: "Which word is feminine?", en: "", options: ["غرفة", "قلم", "باب", "ولد"], answer: "غرفة", why: "غرفة (room) ends in ة." },
        { q: "How do you say “a big house”?", en: "بيت = house, كبير = big", options: ["بيت كبير", "كبير بيت", "بيت كبيرة", "كبيرة بيت"], answer: "بيت كبير", why: "The adjective comes after the noun and agrees: بيت is masculine." },
        { q: "A woman teacher is…", en: "مدرس = teacher", options: ["مدرسة", "مدرس", "مدرسي", "المدرس"], answer: "مدرسة", why: "Add ة for the feminine: mudarrisa." },
      ],
    },
    {
      id: "nominal",
      title: "Sentences without “is”",
      particle: "∅",
      summary: "In the present, “am / is / are” is simply left out.",
      sections: [
        {
          p: "Arabic has no present-tense word for “to be”. Put the subject and the description side by side and you have a sentence.",
          examples: [
            ["أنا طالب.", "anā ṭālib.", "I am a student."],
            ["هو مهندس.", "huwa muhandis.", "He is an engineer."],
            ["هي في البيت.", "hiya fī l-bayt.", "She is at home."],
          ],
        },
        {
          h: "“The house is big” or “the big house”?",
          p: "The difference is ال. If the noun has ال and the adjective does <b>not</b>, it is a sentence. If both have ال, it is just a phrase.",
          examples: [
            ["البيت كبير.", "al-bayt kabīr.", "The house is big."],
            ["البيت الكبير", "al-bayt al-kabīr", "the big house"],
          ],
        },
      ],
      drills: [
        { q: "What does أنا مدرس mean?", en: "", options: ["I am a teacher.", "My teacher.", "The teacher and I.", "I teach him."], answer: "I am a teacher.", why: "No word for “am” is needed: أنا (I) + مدرس (teacher)." },
        { q: "Which one is a full sentence?", en: "", options: ["الكتاب جديد", "الكتاب الجديد"], answer: "الكتاب جديد", why: "Definite noun + indefinite adjective = “the book is new”. With ال on both, it is only “the new book”." },
        { q: "What does السيارة الصغيرة mean?", en: "صغير = small", options: ["the small car", "The car is small.", "a small car", "small cars"], answer: "the small car", why: "Both words have ال, so it is a phrase, not a sentence." },
        { q: "How do you say “The room is big”?", en: "غرفة = room", options: ["الغرفة كبيرة", "الغرفة الكبيرة", "غرفة كبيرة", "كبيرة الغرفة"], answer: "الغرفة كبيرة", why: "Definite subject, indefinite description, and the adjective agrees with the feminine noun." },
        { q: "هو ＿ .", en: "He is a doctor. (طبيب = doctor)", options: ["طبيب", "يكون طبيب", "الطبيب الطبيب", "هو هو"], answer: "طبيب", why: "Just the subject and the noun: هو طبيب." },
      ],
    },
    {
      id: "demonstratives",
      title: "هذا and هذه — “this”",
      particle: "هذا / هذه",
      summary: "هذا for masculine, هذه for feminine; ال decides between “this is” and “this …”.",
      sections: [
        {
          p: "“This” is <b>هذا</b> (hādhā) with a masculine noun and <b>هذه</b> (hādhihi) with a feminine one. Followed by a noun without ال, it makes a sentence: “this is a …”.",
          examples: [
            ["{هذا} كتاب.", "hādhā kitāb.", "This is a book."],
            ["{هذه} سيارة.", "hādhihi sayyāra.", "This is a car."],
          ],
        },
        {
          h: "“This book”",
          p: "Put ال on the noun and the meaning changes from “this is a book” to “this book”. The same rule as in the last lesson.",
          examples: [
            ["{هذا} الكتاب جديد.", "hādhā l-kitāb jadīd.", "This book is new."],
            ["{هذه} المدينة جميلة.", "hādhihi l-madīna jamīla.", "This city is beautiful."],
          ],
        },
      ],
      drills: [
        { q: "＿ بيت.", en: "This is a house.", options: ["هذا", "هذه"], answer: "هذا", why: "بيت is masculine: هذا." },
        { q: "＿ مدرسة.", en: "This is a school.", options: ["هذه", "هذا"], answer: "هذه", why: "مدرسة ends in ة, feminine: هذه." },
        { q: "What does هذا القلم mean?", en: "قلم = pen", options: ["this pen", "This is a pen.", "the pens", "a pen"], answer: "this pen", why: "With ال on the noun it is a phrase: “this pen”." },
        { q: "What does هذا قلم mean?", en: "", options: ["This is a pen.", "this pen", "the pen", "pens"], answer: "This is a pen.", why: "No ال on the noun: it is a sentence, “this is a pen”." },
        { q: "＿ الغرفة كبيرة.", en: "This room is big.", options: ["هذه", "هذا"], answer: "هذه", why: "غرفة is feminine, so “this” is هذه." },
      ],
    },
    {
      id: "possessive",
      title: "My, your, his, her",
      particle: "ـي ـكَ ـكِ ـه ـها",
      summary: "Possessives are endings attached to the noun.",
      sections: [
        {
          p: "Instead of a word like “my”, Arabic joins a short ending to the noun. A noun with one of these endings is already definite, so it never takes ال.",
          examples: [
            ["كتاب{ي}", "kitābī", "my book"],
            ["كتاب{كَ}", "kitābuka", "your book (to a man)"],
            ["كتاب{كِ}", "kitābuki", "your book (to a woman)"],
            ["كتاب{ه}", "kitābuhu", "his book"],
            ["كتاب{ها}", "kitābuhā", "her book"],
          ],
        },
        {
          h: "ة becomes ت",
          p: "When a word ends in ة, the ة turns into an ordinary ت before the ending.",
          examples: [
            ["سيارة ← سيار{تي}", "sayyāra → sayyāratī", "a car → my car"],
            ["مدرسة ← مدرس{تها}", "madrasa → madrasatuhā", "a school → her school"],
          ],
        },
      ],
      drills: [
        { q: "How do you say “my house”?", en: "بيت = house", options: ["بيتي", "البيتي", "بيتها", "بيته"], answer: "بيتي", why: "Add ـي for “my”, and no ال: the ending already makes it definite." },
        { q: "What does قلمها mean?", en: "قلم = pen", options: ["her pen", "his pen", "my pen", "your pen"], answer: "her pen", why: "ـها is “her”." },
        { q: "How do you say “my car”?", en: "سيارة = car", options: ["سيارتي", "سيارةي", "السيارتي", "سيارته"], answer: "سيارتي", why: "ة becomes ت before an ending: سيارتي." },
        { q: "اسم＿ أحمد.", en: "His name is Ahmad. (اسم = name)", options: ["ه", "ي", "ها", "كِ"], answer: "ه", why: "ـه is “his”: اسمه أحمد." },
        { q: "Speaking to a woman, “your book” is…", en: "", options: ["كتابكِ", "كتابكَ", "كتابها", "كتابي"], answer: "كتابكِ", why: "ـكِ (-ki) is “your” to a woman; ـكَ (-ka) is to a man." },
      ],
    },
    {
      id: "prepositions",
      title: "في, على, من, إلى",
      particle: "في على من إلى",
      summary: "In, on, from and to.",
      sections: [
        {
          p: "Four prepositions cover most places and movements. Each goes before its noun.",
          examples: [
            ["{في} البيت", "fī l-bayt", "in the house"],
            ["{على} الطاولة", "‘alā ṭ-ṭāwila", "on the table"],
            ["{من} مصر", "min miṣr", "from Egypt"],
            ["{إلى} المدرسة", "ilā l-madrasa", "to the school"],
          ],
        },
        {
          h: "In a sentence",
          p: "With no word for “is”, a preposition phrase can be the whole description: “the book (is) on the table”.",
          examples: [
            ["الكتاب {على} الطاولة.", "al-kitāb ‘alā ṭ-ṭāwila.", "The book is on the table."],
            ["أنا {من} لبنان.", "anā min lubnān.", "I am from Lebanon."],
          ],
        },
      ],
      drills: [
        { q: "أنا ＿ المغرب.", en: "I am from Morocco.", options: ["من", "في", "على", "إلى"], answer: "من", why: "“From” is من." },
        { q: "القلم ＿ المكتب.", en: "The pen is on the desk.", options: ["على", "من", "إلى", "في"], answer: "على", why: "“On” is على." },
        { q: "أذهب ＿ السوق.", en: "I go to the market.", options: ["إلى", "من", "على", "في"], answer: "إلى", why: "Movement towards a place takes إلى." },
        { q: "هي ＿ الغرفة.", en: "She is in the room.", options: ["في", "إلى", "من", "على"], answer: "في", why: "“In” is في." },
        { q: "What does الولد في المدرسة mean?", en: "ولد = boy", options: ["The boy is at school.", "The boy goes to school.", "The boy is from the school.", "the school boy"], answer: "The boy is at school.", why: "في = in/at, and no word for “is” is needed." },
      ],
    },
  ],
};
