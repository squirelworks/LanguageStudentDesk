// Arabic (Modern Standard) column of the meaning matrix (matrix.js). Written
// for this project. Tokens are [text, romanization, meaning id]. The article
// ال is its own token, romanized by the sun-letter rule (as-sayyāra, al-bayt).
// Verbs carry their subject, so "I" and "you" are often implied.
window.TL_LANGS = window.TL_LANGS || {};
window.TL_LANGS.arabic = {
  sep: " ",
  r: {
    "i-am-student": { end: ".", t: [["أنا", "anā", "i"], ["طالب", "ṭālib", "student"]] },
    "your-name": { end: "؟", t: [["ما", "mā", "what"], ["اسم", "ism", "name"], ["-ك", "uka", "you"]] },
    "name-sami": { end: ".", t: [["اسم", "ism", "name"], ["-ي", "ī", "i"], ["سامي", "Sāmī", "sami"]] },
    "thank-you": { end: ".", t: [["شكرا", "shukran", "thanks"]] },
    "from-egypt": { end: ".", t: [["أنا", "anā", "i"], ["من", "min", "from"], ["مصر", "Miṣr", "egypt"]] },
    "good-morning": { end: ".", t: [["صباح", "ṣabāḥ", "morning"], ["ال-", "al", "@the"], ["خير", "khayr", "good"]] },
    "dont-understand": { end: ".", t: [["أنا", "anā", "i"], ["لا", "lā", "not"], ["أفهم", "afham", "understand"]] },
    "speak-arabic": { end: "؟", implied: ["you"], t: [["هل", "hal", "@question"], ["تتكلم", "tatakallam", "speak"], ["ال-", "al", "@the"], ["عربية", "ʿarabiyya", "arabic"]] },
    "this-is-book": { end: ".", t: [["هذا", "hādhā", "this"], ["كتاب", "kitāb", "book"]] },
    "drink-water": { end: ".", implied: ["i"], t: [["أشرب", "ashrab", "drink"], ["ال-", "al", "@the"], ["ماء", "māʾ", "water"]] },
    "house-big": { end: ".", t: [["ال-", "al", "@the"], ["بيت", "bayt", "house"], ["كبير", "kabīr", "big"]] },
    "car-new": { end: ".", t: [["ال-", "as", "@the"], ["سيارة", "sayyāra", "car"], ["جديدة", "jadīda", "new"]] },
    "weather-hot": { end: ".", t: [["ال-", "aj", "@the"], ["جو", "jaww", "weather"], ["حار", "ḥārr", "hot"], ["ال-", "al", "@the"], ["يوم", "yawm", "today"]] },
    "want-coffee": { end: ".", implied: ["i"], t: [["أريد", "urīd", "want"], ["قهوة", "qahwa", "coffee"]] },
    "sit-down": { end: ".", t: [["تفضل", "tafaḍḍal", "please"], ["اجلس", "ijlis", "sit"]] },
    "where-station": { end: "؟", t: [["أين", "ayna", "where"], ["ال-", "al", "@the"], ["محطة", "maḥaṭṭa", "station"]] },
    "where-toilet": { end: "؟", t: [["أين", "ayna", "where"], ["ال-", "al", "@the"], ["حمام", "ḥammām", "toilet"]] },
    "where-hotel": { end: "؟", t: [["أين", "ayna", "where"], ["ال-", "al", "@the"], ["فندق", "funduq", "hotel"]] },
    "how-much-this": { end: "؟", t: [["بكم", "bikam", "how-much"], ["هذا", "hādhā", "this"]] },
    "live-cairo": { end: ".", implied: ["i"], t: [["أسكن", "askun", "live"], ["في", "fī", "@place"], ["القاهرة", "al-Qāhira", "cairo"]] },
  },
};
