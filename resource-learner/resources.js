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
