// Resource lists for the Resource Learner. "general" applies to every
// language; the other keys are language ids from languages/<id>/meta.json.
// url is optional (books without one official page); href starting with ../
// points at another Desk tool. stars is 1–5.
window.LSD_RESOURCES = {
  general: [
    { title: "Anki", url: "https://apps.ankiweb.net", meta: "Spaced-repetition flashcards · Free / open source", tags: ["SRS", "custom", "all languages"], stars: 5 },
    { title: "Forvo", url: "https://forvo.com", meta: "Words pronounced by native speakers in hundreds of languages · Free", tags: ["pronunciation", "audio"], stars: 4 },
    { title: "Wiktionary", url: "https://en.wiktionary.org", meta: "Multilingual dictionary with etymology, inflection tables and pronunciation · Free", tags: ["dictionary", "grammar"], stars: 4 },
  ],
  japanese: [
    { title: "Japanese From Zero!", meta: "Structured beginner series (books + YouTube)", tags: ["beginner", "grammar"] },
    { title: "Tanos.co.uk", url: "https://www.tanos.co.uk", meta: "JLPT lists, kanji, vocabulary, grammar · Free", tags: ["JLPT", "reference"], stars: 4 },
  ],
  klingon: [
    { title: "Language Student Desk — Klingon learner", url: "../klingon/index.html", meta: "pIqaD script, vocab, grammar, and Reader section", tags: ["script", "pIqaD", "reader"], stars: 4 },
    { title: "The Klingon Dictionary / Klingon Language Institute", url: "https://www.kli.org", meta: "The canonical dictionary, plus the KLI's grammar notes and community", tags: ["dictionary", "grammar"], stars: 4 },
  ],
  arabic: [
    { title: "Alif Baa / Al-Kitaab series", meta: "Standard university textbooks", tags: ["textbook", "script"], stars: 4 },
  ],
  hangul: [
    { title: "Talk To Me In Korean", meta: "Podcasts, lessons, and textbooks", tags: ["beginner", "audio"], stars: 4 },
  ],
  chinese: [
    { title: "Pleco", meta: "Dictionary and flashcards", tags: ["dictionary", "SRS"], stars: 5 },
  ],
  hindi: [
    { title: "A Door Into Hindi", url: "https://tajhindi.unc.edu", meta: "24 video lessons by Afroz Taj (UNC), with a Devanagari script module · Free", tags: ["beginner", "video", "script"], stars: 5 },
    { title: "Oxford Hindi-English Dictionary (McGregor)", url: "https://dsal.uchicago.edu/dictionaries/mcgregor/", meta: "Searchable online at Digital Dictionaries of South Asia · Free", tags: ["dictionary", "Devanagari"], stars: 5 },
    { title: "Platts' Dictionary of Urdu, Classical Hindi and English", url: "https://dsal.uchicago.edu/dictionaries/platts/", meta: "Classic dictionary in Devanagari, Urdu and roman script · Free", tags: ["dictionary", "Urdu"], stars: 4 },
  ],
  thai: [
    { title: "Thai Notes", url: "https://thai-notes.com/", meta: "Reading course, tone practice, FSI-based lessons and searchable dictionaries · Free", tags: ["beginner", "script", "dictionary"], stars: 5 },
    { title: "Thai Language Online (UH Mānoa)", url: "https://thailanguage-online.com/", meta: "University of Hawaiʻi open Thai audio-visual resources and reading materials · Free", tags: ["university", "audio", "script"], stars: 5 },
    { title: "SEAlang Thai Dictionary", url: "http://sealang.net/thai/dictionary.htm", meta: "Searchable Thai–English dictionary and corpus tools (SEAlang Library) · Free", tags: ["dictionary", "corpus"], stars: 5 },
  ],
  lao: [
    { title: "SEAsite Lao (Northern Illinois)", url: "https://seasite.niu.edu/Lao/", meta: "Spoken Lao lessons with audio, quizzes, flashcards and tone charts · Free", tags: ["beginner", "audio", "university"], stars: 5 },
    { title: "FSI Lao Basic Course", url: "https://www.fsi-language-courses.org/fsi-lao-basic-course/", meta: "Public-domain Foreign Service Institute Lao course with texts and audio · Free", tags: ["beginner", "audio", "grammar"], stars: 5 },
    { title: "SEAlang Lao Dictionary", url: "http://sealang.net/lao/dictionary.htm", meta: "Searchable Lao–English dictionary and corpus (SEAlang Library) · Free", tags: ["dictionary", "corpus"], stars: 5 },
  ],
  khmer: [
    { title: "FSI Cambodian Basic Course", url: "https://www.fsi-language-courses.org/fsi-cambodian-basic-course/", meta: "Public-domain Foreign Service Institute Cambodian (Khmer) course with audio · Free", tags: ["beginner", "audio", "grammar"], stars: 5 },
    { title: "SEAsite Khmer (Northern Illinois)", url: "https://seasite.niu.edu/Khmer/", meta: "Khmer script, reading and language materials from NIU's Center for Southeast Asian Studies · Free", tags: ["script", "university"], stars: 4 },
    { title: "SEAlang Khmer Dictionary", url: "http://sealang.net/khmer/dictionary.htm", meta: "Searchable Khmer–English dictionary, corpus and bitext (SEAlang Library) · Free", tags: ["dictionary", "corpus"], stars: 5 },
  ],
  burmese: [
    { title: "Everyday Spoken Burmese", url: "https://my.wikisource.org/wiki/Everyday_Spoken_Burmese", meta: "Burmese script guide with romanization and everyday vocabulary (Wikisource) · Free", tags: ["beginner", "script"], stars: 5 },
    { title: "SEAsite Burmese (Northern Illinois)", url: "https://seasite.niu.edu/Burmese/", meta: "Myanmar language, literature and culture learning materials · Free", tags: ["university", "culture"], stars: 4 },
    { title: "SEAlang Burmese Dictionary", url: "http://sealang.net/burmese/dictionary.htm", meta: "Searchable Burmese–English dictionary, corpus and bitext (SEAlang Library) · Free", tags: ["dictionary", "corpus"], stars: 5 },
  ],
  tibetan: [
    { title: "THL Tibetan Terms", url: "https://thlib.org/terms/", meta: "Tibetan and Himalayan Library dictionary content with definitions and multimedia · Free", tags: ["dictionary", "university"], stars: 5 },
    { title: "Wikibooks: Tibetan", url: "https://en.wikibooks.org/wiki/Tibetan", meta: "Community-written introduction to Tibetan script and basics · Free", tags: ["beginner", "script"], stars: 4 },
    { title: "Buddhist Digital Resource Center", url: "https://library.bdrc.io/", meta: "Searchable library of Tibetan texts and scans · Free", tags: ["texts", "reading"], stars: 5 },
  ],
  cyrillic: [
    { title: "Между нами (Mezhdu nami)", url: "https://mezhdunami.org", meta: "Complete first-year Russian textbook with audio and grammar charts · Free, CC BY-NC-ND", tags: ["beginner", "textbook", "audio"], stars: 5 },
    { title: "OpenRussian", url: "https://en.openrussian.org", meta: "Dictionary with stress marks, declensions, conjugations and examples · Free (optional Pro)", tags: ["dictionary", "grammar"], stars: 5 },
    { title: "Russian National Corpus", url: "https://ruscorpora.ru/en/", meta: "Search real Russian texts to see how words are used · Free", tags: ["corpus", "reading"], stars: 4 },
  ],
  latin: [
    { title: "Lingua Latina per se Illustrata (Ørberg)", meta: "A textbook written entirely in Latin that teaches through context", tags: ["textbook", "reading"], stars: 5 },
    { title: "Wheelock's Latin", meta: "The classic grammar-first university course", tags: ["textbook", "grammar"], stars: 4 },
    { title: "Perseus Digital Library", url: "https://www.perseus.tufts.edu", meta: "Classical texts with word-by-word parsing and Lewis & Short · Free", tags: ["texts", "dictionary"], stars: 5 },
    { title: "Dickinson College Commentaries", url: "https://dcc.dickinson.edu", meta: "Annotated classical texts and a core Latin vocabulary list · Free", tags: ["reading", "vocabulary"], stars: 4 },
    { title: "The Latin Library", url: "https://www.thelatinlibrary.com", meta: "Large collection of Latin texts from every period · Free", tags: ["texts"], stars: 4 },
  ],
  english: [
    { title: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish", meta: "Courses, grammar, pronunciation and news-based lessons · Free", tags: ["courses", "audio", "video"], stars: 5 },
    { title: "Cambridge Dictionary", url: "https://dictionary.cambridge.org", meta: "Learner's dictionary with UK and US pronunciation and grammar notes · Free", tags: ["dictionary", "pronunciation"], stars: 5 },
    { title: "English Grammar in Use (Raymond Murphy)", meta: "Self-study grammar book: explanation on the left page, practice on the right", tags: ["grammar", "textbook"], stars: 5 },
  ],
};
