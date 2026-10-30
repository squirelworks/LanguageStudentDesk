// Hindi column of the meaning matrix (matrix.js). Written for this project.
// Tokens are [text, romanization, meaning id].
window.TL_LANGS = window.TL_LANGS || {};
window.TL_LANGS.hindi = {
  sep: " ",
  r: {
    "i-am-student": { end: "।", t: [["मैं", "main", "i"], ["छात्र", "chhātra", "student"], ["हूँ", "hūn", "@copula"]] },
    "name-ravi": { end: "।", t: [["मेरा", "merā", "i"], ["नाम", "nām", "name"], ["रवि", "Ravi", "ravi"], ["है", "hai", "@copula"]] },
    "thank-you": { end: "।", t: [["धन्यवाद", "dhanyavād", "thanks"]] },
    "where-live": { end: "?", t: [["आप", "āp", "you"], ["कहाँ", "kahān", "where"], ["रहते", "rahte", "live"], ["हैं", "hain", "@present"]] },
    "who-is-he": { end: "?", t: [["वह", "vah", "he"], ["कौन", "kaun", "who"], ["है", "hai", "@copula"]] },
    "speak-hindi": { end: "।", t: [["मैं", "main", "i"], ["हिंदी", "hindī", "hindi"], ["बोलता", "boltā", "speak"], ["हूँ", "hūn", "@present"]] },
    "dont-understand": { end: "।", t: [["मैं", "main", "i"], ["नहीं", "nahīn", "not"], ["समझा", "samjhā", "understand"]] },
    "this-is-book": { end: "।", t: [["यह", "yah", "this"], ["किताब", "kitāb", "book"], ["है", "hai", "@copula"]] },
    "drink-water": { end: "।", t: [["मैं", "main", "i"], ["पानी", "pānī", "water"], ["पीता", "pītā", "drink"], ["हूँ", "hūn", "@present"]] },
    "hot-today": { end: "।", t: [["आज", "āj", "today"], ["गर्मी", "garmī", "hot"], ["है", "hai", "@copula"]] },
    "like-tea": { end: "।", t: [["मुझे", "mujhe", "i"], ["चाय", "chāy", "tea"], ["पसंद", "pasand", "like"], ["है", "hai", "@copula"]] },
    "head-hurts": { end: "।", t: [["मेरे", "mere", "i"], ["सिर", "sir", "head"], ["में", "men", "@place"], ["दर्द", "dard", "hurt"], ["है", "hai", "@copula"]] },
    "food-tasty": { end: "।", t: [["खाना", "khānā", "food"], ["बहुत", "bahut", "very"], ["स्वादिष्ट", "svādisht", "delicious"], ["है", "hai", "@copula"]] },
    "raining": { end: "।", t: [["बारिश", "bārish", "rain"], ["हो", "ho", "@happen"], ["रही", "rahī", "@ongoing"], ["है", "hai", "@copula"]] },
    "monday": { end: "।", t: [["आज", "āj", "today"], ["सोमवार", "somvār", "monday"], ["है", "hai", "@copula"]] },
    "where-station": { end: "?", t: [["स्टेशन", "steshan", "station"], ["कहाँ", "kahān", "where"], ["है", "hai", "@copula"]] },
    "how-much-this": { end: "?", t: [["यह", "yah", "this"], ["कितने", "kitne", "how-much"], ["का", "kā", "@of"], ["है", "hai", "@copula"]] },
    "going-home": { end: "।", t: [["मैं", "main", "i"], ["घर", "ghar", "home"], ["जा", "jā", "go"], ["रहा", "rahā", "@ongoing"], ["हूँ", "hūn", "@copula"]] },
    "give-water": { end: "।", t: [["मुझे", "mujhe", "i"], ["पानी", "pānī", "water"], ["दीजिए", "dījie", "give+please"]] },
    "lets-go": { end: "।", t: [["चलो", "chalo", "let-us+go"]] },
  },
};
