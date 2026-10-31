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
  georgian: [
    { title: "Wikibooks: Georgian", url: "https://en.wikibooks.org/wiki/Georgian", meta: "Community-written introduction to Mkhedruli script and basics · Free", tags: ["beginner", "script"], stars: 4 },
    { title: "translate.ge", url: "https://translate.ge/", meta: "Georgian–English and English–Georgian online dictionary · Free", tags: ["dictionary", "Georgian"], stars: 5 },
    { title: "SEELRC Georgian Reference Grammar (Aronson)", url: "https://slaviccenters.duke.edu/projects/grammars", meta: "Howard Aronson's Georgian reference grammar in Duke/SEELRC Reference Grammar Network · Free", tags: ["grammar", "university"], stars: 5 },
  ],
  armenian: [
    { title: "Wikibooks: Armenian", url: "https://en.wikibooks.org/wiki/Armenian", meta: "Community-written introduction to the Armenian alphabet and basics · Free", tags: ["beginner", "script"], stars: 4 },
    { title: "Armenian Grammar (Balayan)", url: "https://slaviccenters.duke.edu/sites/slaviccenters.duke.edu/files/documents/Armenian_Balayan_0.pdf", meta: "Dialogue-based handbook of Armenian grammar for beginning and intermediate students (Duke/SEELRC) · Free", tags: ["grammar", "textbook"], stars: 5 },
    { title: "Lexilogos Armenian", url: "https://www.lexilogos.com/english/armenian_dictionary.htm", meta: "Hub of free Eastern and Western Armenian dictionaries and keyboards · Free", tags: ["dictionary", "Armenian"], stars: 5 },
  ],
  greek: [
    { title: "Center for the Greek Language", url: "https://www.greek-language.gr/", meta: "Portal for Modern Greek: dictionaries, grammars, corpora and learning materials · Free", tags: ["dictionary", "grammar", "government"], stars: 5 },
    { title: "Dictionary of Standard Modern Greek (Triantafyllidis)", url: "https://www.greek-language.gr/greekLang/modern_greek/tools/lexica/triantafyllides/index.html", meta: "Searchable Modern Greek dictionary from the Institute of Modern Greek Studies · Free", tags: ["dictionary", "Modern Greek"], stars: 5 },
    { title: "FSI Greek Basic Course", url: "https://www.fsi-language-courses.org/fsi-greek-basic-course/", meta: "Public-domain Foreign Service Institute Greek course with texts and audio · Free", tags: ["beginner", "audio", "grammar"], stars: 5 },
  ],
  hebrew: [
    { title: "Pealim", url: "https://www.pealim.com/", meta: "Hebrew verb conjugation tables with binyanim, roots and searchable dictionary · Free", tags: ["verbs", "grammar", "dictionary"], stars: 5 },
    { title: "FSI Hebrew Basic Course", url: "https://www.fsi-language-courses.org/fsi-hebrew-basic-course/", meta: "Public-domain Foreign Service Institute Hebrew course with texts and audio · Free", tags: ["beginner", "audio", "grammar"], stars: 5 },
    { title: "Sefaria", url: "https://www.sefaria.org/", meta: "Living library of Jewish texts with Hebrew–English facing pages · Free", tags: ["texts", "reading"], stars: 5 },
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
