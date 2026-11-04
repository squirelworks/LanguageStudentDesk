// Generated from squirrel-lang-data b6912a0 meaning/columns/hebrew.jsonl by: python3 data/tools/gen_meaning.py --out translation-learner/data
// Modern Hebrew column of the meaning matrix. Written for this project. Tokens
// are [text, romanization, meaning id]. Hebrew is written right to left without
// vowel points (matching languages/hebrew). The article ה- and the one-letter
// prepositions ב־ / ל־ / מ־ are their own tokens and glue to the next word.
// There is no present-tense "to be", so copula sentences are just pronoun +
// noun. Sources: forms match languages/hebrew/vocab.js and the Modern Hebrew
// grammar pack (אני סטודנט, קוראים לי…, בוקר טוב, תודה רבה, אני לא מבין, החשבון
// בבקשה, כמה זה עולה?).
window.TL_LANGS = window.TL_LANGS || {};
window.TL_LANGS.hebrew = {
  sep: " ",
  r: {
    "i-am-student": {"end": ".", "t": [["אני", "ani", "i"], ["סטודנט", "student", "student"]]},
    "name-anna": {"end": ".", "t": [["קוראים", "kor'im", "name"], ["לי", "li", "i"], ["אנה", "Anna", "anna"]]},
    "hello": {"end": ".", "t": [["שלום", "shalom", "hello"]]},
    "nice-to-meet-you": {"end": ".", "t": [["נעים מאוד", "na'im me'od", "nice-to-meet-you"]]},
    "good-morning": {"end": ".", "t": [["בוקר", "boker", "morning"], ["טוב", "tov", "good"]]},
    "thank-you": {"end": ".", "t": [["תודה", "toda", "thanks"]]},
    "thank-you-very-much": {"end": ".", "t": [["תודה", "toda", "thanks"], ["רבה", "raba", "very-much"]]},
    "dont-understand": {"end": ".", "t": [["אני", "ani", "i"], ["לא", "lo", "not"], ["מבין", "mevin", "understand"]]},
    "dont-know": {"end": ".", "t": [["אני", "ani", "i"], ["לא", "lo", "not"], ["יודע", "yodea", "know"]]},
    "speak-english": {"end": "?", "t": [["אתה", "ata", "you"], ["מדבר", "medaber", "speak"], ["אנגלית", "anglit", "english"]]},
    "love-you": {"end": ".", "t": [["אני", "ani", "i"], ["אוהב", "ohev", "love"], ["אותך", "otcha", "you"]]},
    "like-coffee": {"end": ".", "t": [["אני", "ani", "i"], ["אוהב", "ohev", "like"], ["קפה", "kafe", "coffee"]]},
    "like-tea": {"end": ".", "t": [["אני", "ani", "i"], ["אוהב", "ohev", "like"], ["תה", "te", "tea"]]},
    "my-friend": {"end": ".", "t": [["הוא", "hu", "he"], ["ה-", "ha", "@the"], ["חבר", "chaver", "friend"], ["שלי", "sheli", "i"]]},
    "who-is-he": {"end": "?", "t": [["מי", "mi", "who"], ["הוא", "hu", "he"]]},
    "where-live": {"end": "?", "t": [["איפה", "eifo", "where"], ["אתה", "ata", "you"], ["גר", "gar", "live"]]},
    "from-egypt": {"end": ".", "t": [["אני", "ani", "i"], ["מ-", "mi", "from"], ["מצרים", "Mitzrayim", "egypt"]]},
    "this-is-book": {"end": ".", "t": [["זה", "ze", "this"], ["ספר", "sefer", "book"]]},
    "this-is-my-book": {"end": ".", "t": [["זה", "ze", "this"], ["ה-", "ha", "@the"], ["ספר", "sefer", "book"], ["שלי", "sheli", "i"]]},
    "drink-water": {"end": ".", "t": [["אני", "ani", "i"], ["שותה", "shote", "drink"], ["מים", "mayim", "water"]]},
    "drink-tea": {"end": ".", "t": [["אני", "ani", "i"], ["שותה", "shote", "drink"], ["תה", "te", "tea"]]},
    "want-coffee": {"end": ".", "t": [["אני", "ani", "i"], ["רוצה", "rotze", "want"], ["קפה", "kafe", "coffee"]]},
    "read-book": {"end": ".", "t": [["אני", "ani", "i"], ["קורא", "kore", "read"], ["ספר", "sefer", "book"]]},
    "cold-today": {"end": ".", "t": [["היום", "hayom", "today"], ["קר", "kar", "cold"]]},
    "hot-today": {"end": ".", "t": [["היום", "hayom", "today"], ["חם", "cham", "hot"]]},
    "what-time": {"end": "?", "t": [["מה", "ma", "what"], ["ה-", "ha", "@the"], ["שעה", "sha'a", "time"]]},
    "house-big": {"end": ".", "t": [["ה-", "ha", "@the"], ["בית", "bayit", "house"], ["גדול", "gadol", "big"]]},
    "car-new": {"end": ".", "t": [["ה-", "ha", "@the"], ["מכונית", "mechonit", "car"], ["חדשה", "chadasha", "new"]]},
    "delicious": {"end": ".", "t": [["טעים", "ta'im", "delicious"]]},
    "food-tasty": {"end": ".", "t": [["ה-", "ha", "@the"], ["אוכל", "ochel", "food"], ["מאוד", "me'od", "very"], ["טעים", "ta'im", "delicious"]]},
    "where-station": {"end": "?", "t": [["איפה", "eifo", "where"], ["ה-", "ha", "@the"], ["תחנה", "tachana", "station"]]},
    "where-toilet": {"end": "?", "t": [["איפה", "eifo", "where"], ["ה-", "ha", "@the"], ["שירותים", "sherutim", "toilet"]]},
    "where-hotel": {"end": "?", "t": [["איפה", "eifo", "where"], ["ה-", "ha", "@the"], ["מלון", "malon", "hotel"]]},
    "how-much-this": {"end": "?", "t": [["כמה", "kama", "how-much"], ["זה", "ze", "this"]]},
    "how-much-is-it": {"end": "?", "t": [["כמה", "kama", "how-much"]]},
    "how-much-cost": {"end": "?", "t": [["כמה", "kama", "how-much"], ["עולה", "ole", "cost"]]},
    "bill-please": {"end": ".", "t": [["ה-", "ha", "@the"], ["חשבון", "cheshbon", "bill"], ["בבקשה", "bevakasha", "please"]]},
    "go-school": {"end": ".", "t": [["אני", "ani", "i"], ["הולך", "holech", "go"], ["ל-", "le", "@direction"], ["בית ספר", "beit sefer", "school"]]},
    "going-home": {"end": ".", "t": [["אני", "ani", "i"], ["הולך", "holech", "go"], ["הביתה", "habayta", "home"]]},
    "we-going-home": {"end": ".", "t": [["אנחנו", "anachnu", "we"], ["הולכים", "holchim", "go"], ["הביתה", "habayta", "home"]]},
    "where-going": {"end": "?", "t": [["לאן", "le'an", "where"], ["אתה", "ata", "you"], ["הולך", "holech", "go"]]},
  },
};
