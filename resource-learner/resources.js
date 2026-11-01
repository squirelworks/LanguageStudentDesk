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
  amharic: [
    { title: "FSI Amharic Basic Course", url: "https://www.fsi-language-courses.org/fsi-amharic-basic-course/", meta: "Public-domain Foreign Service Institute Amharic course with texts and audio · Free", tags: ["beginner", "audio", "grammar"], stars: 5 },
    { title: "Abyssinica Dictionary", url: "https://dictionary.abyssinica.com/", meta: "Large Amharic–English dictionary with Ethiopic script lookup · Free", tags: ["dictionary", "Amharic"], stars: 5 },
    { title: "Lexilogos Amharic", url: "https://www.lexilogos.com/english/amharic_dictionary.htm", meta: "Hub of free Amharic dictionaries, keyboards and Ethiopic script tools · Free", tags: ["dictionary", "script"], stars: 5 },
  ],
  mongolian: [
    { title: "Peace Corps Mongolian Language Lessons", url: "https://www.fsi-language-courses.org/mongolian/courses/peace-corps-mongolian-language-lessons/", meta: "Basic Mongolian expressions with audio for Peace Corps trainees · Free", tags: ["beginner", "audio"], stars: 5 },
    { title: "Bolor Dictionary", url: "https://bolor-toli.com/", meta: "Mongolian–English and multilingual dictionary with Cyrillic and traditional script · Free", tags: ["dictionary", "Mongolian"], stars: 5 },
    { title: "Lexilogos Mongolian", url: "https://www.lexilogos.com/english/mongolian_dictionary.htm", meta: "Hub of free Mongolian dictionaries, phrasebooks and script charts · Free", tags: ["dictionary", "script"], stars: 5 },
  ],
  tamazight: [
    { title: "IRCAM Amazigh Dictionary (DGLAi)", url: "https://tal.ircam.ma/dglai/", meta: "Official trilingual Amazigh–French–Arabic dictionary from Morocco's Royal Institute · Free", tags: ["dictionary", "government"], stars: 5 },
    { title: "Amazigh.online", url: "https://www.amazigh.online/", meta: "Tifinagh reading lessons and a themed Tamazight dictionary · Free", tags: ["beginner", "script", "dictionary"], stars: 5 },
    { title: "Lexilogos Berber / Amazigh", url: "https://www.lexilogos.com/berbere_dictionnaire.htm", meta: "Hub of free Tamazight, Kabyle and other Amazigh dictionaries and keyboards · Free", tags: ["dictionary", "Tifinagh"], stars: 4 },
  ],
  cherokee: [
    { title: "Cherokee Nation Language Department", url: "https://language.cherokee.org/", meta: "Official syllabary charts, verb handbooks and free teaching materials · Free", tags: ["syllabary", "government"], stars: 5 },
    { title: "Cherokee Nation Dictionary", url: "https://cherokeenationdictionary.net/", meta: "Searchable Cherokee–English dictionary with audio and Durbin Feeling entries · Free", tags: ["dictionary", "audio"], stars: 5 },
    { title: "Wikibooks: Cherokee", url: "https://en.wikibooks.org/wiki/Cherokee", meta: "Community-written introduction to the Cherokee syllabary and basics · Free", tags: ["beginner", "script"], stars: 4 },
  ],
  inuktitut: [
    { title: "Inuktut Tusaalanga", url: "https://www.tusaalanga.ca/", meta: "Free Inuktut lessons, dialogues and audio across several dialects (Pirurvik / Nunavut) · Free", tags: ["beginner", "audio", "grammar"], stars: 5 },
    { title: "Inuktitut Living Dictionary", url: "https://www.livingdictionary.com/", meta: "Searchable dictionary across English, French, roman Inuktitut and syllabics · Free", tags: ["dictionary", "syllabics"], stars: 5 },
    { title: "Wikibooks: Inuktitut", url: "https://en.wikibooks.org/wiki/Inuktitut", meta: "Community-written introduction to Inuktitut syllabics and basics · Free", tags: ["beginner", "script"], stars: 4 },
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
  bengali: [
    { title: "Basic Bangla (Michigan State)", url: "https://openbooks.lib.msu.edu/basicbangla/", meta: "Interactive open textbook: Bangla script, grammar, conversation and vocabulary · Free, CC", tags: ["beginner", "textbook", "script"], stars: 5 },
    { title: "Bangla at UT Austin", url: "https://bangla.la.utexas.edu/", meta: "Open Bangla script, pronunciation, grammar and dialogue materials (COERLL) · Free", tags: ["beginner", "audio", "script"], stars: 5 },
    { title: "Biswas Bengali–English Dictionary", url: "https://dsal.uchicago.edu/dictionaries/biswas-bengali/", meta: "Searchable at Digital Dictionaries of South Asia · Free", tags: ["dictionary", "Bengali"], stars: 5 },
  ],
  tamil: [
    { title: "Basic Tamil (Michigan State)", url: "https://openbooks.lib.msu.edu/basictamil/", meta: "Interactive open textbook for true beginners: script, conversation and grammar · Free, CC BY-NC", tags: ["beginner", "textbook", "script"], stars: 5 },
    { title: "Tamil Virtual Academy", url: "https://www.tamilvu.org/", meta: "Government of Tamil Nadu courses and audiovisual lessons · Free", tags: ["courses", "video", "government"], stars: 5 },
    { title: "Tamil Lexicon", url: "https://dsal.uchicago.edu/dictionaries/tamil-lex/", meta: "University of Madras lexicon, searchable at Digital Dictionaries of South Asia · Free", tags: ["dictionary", "Tamil"], stars: 5 },
  ],
  telugu: [
    { title: "Basic Telugu (Michigan State)", url: "https://openbooks.lib.msu.edu/basictelugu/", meta: "Interactive open textbook for beginning Telugu · Free, CC", tags: ["beginner", "textbook", "script"], stars: 5 },
    { title: "Brown's Telugu–English Dictionary (1903)", url: "https://dsal.uchicago.edu/dictionaries/brown/", meta: "Classic dictionary at Digital Dictionaries of South Asia · Free", tags: ["dictionary", "Telugu"], stars: 5 },
    { title: "Gwynn's Telugu–English Dictionary", url: "https://dsal.uchicago.edu/dictionaries/gwynn/", meta: "Modern Telugu dictionary at Digital Dictionaries of South Asia · Free", tags: ["dictionary", "Telugu"], stars: 4 },
  ],
  kannada: [
    { title: "Kittel's Kannada–English Dictionary", url: "https://dsal.uchicago.edu/dictionaries/kittel/", meta: "Standard historical dictionary at Digital Dictionaries of South Asia · Free", tags: ["dictionary", "Kannada"], stars: 5 },
    { title: "Wikibooks: Kannada", url: "https://en.wikibooks.org/wiki/Kannada", meta: "Community-written introduction to Kannada script and basics · Free", tags: ["beginner", "script"], stars: 4 },
    { title: "Wiktionary: Kannada", url: "https://en.wiktionary.org/wiki/Category:Kannada_language", meta: "Entries with inflection, etymology and pronunciation · Free", tags: ["dictionary", "grammar"], stars: 4 },
  ],
  malayalam: [
    { title: "Malayalam at UT Austin", url: "https://malayalam.la.utexas.edu/", meta: "University Malayalam programme with open educational resources · Free", tags: ["courses", "OER"], stars: 5 },
    { title: "UT Austin Malayalam resources", url: "https://malayalam.la.utexas.edu/resources/", meta: "Open materials for script, listening and classroom use (COERLL) · Free", tags: ["beginner", "audio", "script"], stars: 5 },
    { title: "Gundert Malayalam and English Dictionary", url: "https://dsal.uchicago.edu/dictionaries/gundert/", meta: "Classic dictionary at Digital Dictionaries of South Asia · Free", tags: ["dictionary", "Malayalam"], stars: 5 },
  ],
  gujarati: [
    { title: "Gujarati Lexicon", url: "https://www.gujaratilexicon.com/", meta: "Large online Gujarati dictionary with literature and idioms · Free", tags: ["dictionary", "Gujarati"], stars: 5 },
    { title: "Wikibooks: Gujarati", url: "https://en.wikibooks.org/wiki/Gujarati", meta: "Community-written introduction to Gujarati script and basics · Free", tags: ["beginner", "script"], stars: 4 },
    { title: "Wiktionary: Gujarati", url: "https://en.wiktionary.org/wiki/Category:Gujarati_language", meta: "Entries with inflection, etymology and pronunciation · Free", tags: ["dictionary", "grammar"], stars: 4 },
  ],
  punjabi: [
    { title: "Basic Punjabi (Michigan State)", url: "https://openbooks.lib.msu.edu/basicpunjabi/", meta: "Interactive open textbook for beginning Punjabi · Free, CC", tags: ["beginner", "textbook", "script"], stars: 5 },
    { title: "Bashir Punjabi–English Dictionary", url: "https://dsal.uchicago.edu/dictionaries/bashir/", meta: "Searchable at Digital Dictionaries of South Asia · Free", tags: ["dictionary", "Punjabi"], stars: 5 },
    { title: "Maya Singh's Panjabi Dictionary", url: "https://dsal.uchicago.edu/dictionaries/singh/", meta: "Classic 1895 dictionary at Digital Dictionaries of South Asia · Free", tags: ["dictionary", "Punjabi"], stars: 4 },
  ],
  odia: [
    { title: "Purnnachandra Odia Bhashakosha (Praharaj)", url: "https://dsal.uchicago.edu/dictionaries/praharaj/", meta: "Major Odia lexicon at Digital Dictionaries of South Asia · Free", tags: ["dictionary", "Odia"], stars: 5 },
    { title: "Wikibooks: Odia", url: "https://en.wikibooks.org/wiki/Odia", meta: "Community-written introduction to Odia script and basics · Free", tags: ["beginner", "script"], stars: 4 },
    { title: "Wiktionary: Odia", url: "https://en.wiktionary.org/wiki/Category:Odia_language", meta: "Entries with inflection, etymology and pronunciation · Free", tags: ["dictionary", "grammar"], stars: 4 },
  ],
  sinhala: [
    { title: "Carter Sinhalese–English Dictionary", url: "https://dsal.uchicago.edu/dictionaries/carter/", meta: "Classic dictionary at Digital Dictionaries of South Asia · Free", tags: ["dictionary", "Sinhala"], stars: 5 },
    { title: "Learn Sinhala", url: "https://www.learnsinhala.com/", meta: "Spoken Sinhala lessons and phrase practice · Free", tags: ["beginner", "audio"], stars: 4 },
    { title: "Department of Official Languages (Sri Lanka)", url: "https://languagesdept.gov.lk/web/index.php?lang=en", meta: "Government learning materials, glossary and trilingual tools · Free", tags: ["government", "reference"], stars: 4 },
  ],
  manipuri: [
    { title: "Learners' Manipuri–English Dictionary (Sharma)", url: "https://dsal.uchicago.edu/dictionaries/sharma/", meta: "Searchable at Digital Dictionaries of South Asia · Free", tags: ["dictionary", "Manipuri"], stars: 5 },
    { title: "Wikibooks: Modern Meitei", url: "https://en.wikibooks.org/wiki/Modern_Meitei", meta: "Community-written introduction to Meitei (Manipuri) and Meetei Mayek · Free", tags: ["beginner", "script"], stars: 4 },
    { title: "Unicode Meetei Mayek chart", url: "https://www.unicode.org/charts/PDF/UABC0.pdf", meta: "Official code chart for the Meetei Mayek script · Free", tags: ["script", "reference"], stars: 4 },
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
