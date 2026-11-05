// Generated from squirrel-lang-data d5e05a4 meaning/columns/armenian.jsonl by: python3 data/tools/gen_meaning.py --out translation-learner/data
// Eastern Armenian column of the meaning matrix. Written for this project.
// Tokens are [text, romanization, meaning id]. The romanization matches
// languages/armenian (ë is the short “uh”; an apostrophe marks an aspirate).
// Sentences end with ։; ՞ sits on the stressed vowel of a question word. Verb
// person is on the helper (եմ / ես / է…), so "I" and "you" are sometimes
// implied. Sources: forms match languages/armenian/vocab.js, reference.json
// phrases, and the Armenian grammar pack (Ես ուսանող եմ, իմ անունը…, Անգլերեն
// խոսու՞մ եք, չեմ հասկանում, չգիտեմ, Ես սուրճ եմ խմում, Զուգարանը որտե՞ղ է,
// Ինչքա՞ն արժե, հաշիվը խնդրեմ, բարի լույս).
window.TL_LANGS = window.TL_LANGS || {};
window.TL_LANGS.armenian = {
  sep: " ",
  r: {
    "i-am-student": {"end": "։", "t": [["Ես", "yes", "i"], ["ուսանող", "usanogh", "student"], ["եմ", "em", "@copula"]]},
    "name-anna": {"end": "։", "t": [["Իմ", "im", "i"], ["անունը", "anunë", "name"], ["Աննա", "Anna", "anna"], ["է", "e", "@copula"]]},
    "your-name": {"end": "։", "t": [["Ձեր", "dzer", "you"], ["անունն", "anunn", "name"], ["ի՞նչ", "inch", "what"], ["է", "e", "@copula"]]},
    "hello": {"end": "։", "t": [["Բարև", "barev", "hello"]]},
    "nice-to-meet-you": {"end": "։", "t": [["Շատ ուրախ եմ", "shat urakh em", "nice-to-meet-you"]]},
    "good-morning": {"end": "։", "t": [["Բարի լույս", "bari luys", "good+morning"]]},
    "thank-you": {"end": "։", "t": [["Շնորհակալություն", "shnorhakalut'yun", "thanks"]]},
    "thank-you-very-much": {"end": "։", "t": [["Շատ", "shat", "very-much"], ["շնորհակալություն", "shnorhakalut'yun", "thanks"]]},
    "dont-understand": {"end": "։", "t": [["Ես", "yes", "i"], ["չեմ", "chem", "not"], ["հասկանում", "haskanum", "understand"]]},
    "dont-know": {"end": "։", "implied": ["i"], "t": [["Չգիտեմ", "chgitem", "not+know"]]},
    "speak-english": {"end": "։", "implied": ["you"], "t": [["Անգլերեն", "angleren", "english"], ["խոսու՞մ", "khosum", "speak"], ["եք", "ek'", "@copula"]]},
    "like-coffee": {"end": "։", "t": [["Ես", "yes", "i"], ["սուրճ", "surch", "coffee"], ["եմ", "em", "@copula"], ["սիրում", "sirum", "like"]]},
    "like-tea": {"end": "։", "t": [["Ես", "yes", "i"], ["թեյ", "t'ey", "tea"], ["եմ", "em", "@copula"], ["սիրում", "sirum", "like"]]},
    "my-friend": {"end": "։", "t": [["Նա", "na", "he"], ["իմ", "im", "i"], ["ընկերն", "ënkern", "friend"], ["է", "e", "@copula"]]},
    "who-is-he": {"end": "։", "t": [["Ո՞վ", "vov", "who"], ["է", "e", "@copula"], ["նա", "na", "he"]]},
    "where-live": {"end": "։", "implied": ["you"], "t": [["Որտե՞ղ", "vortegh", "where"], ["ես", "es", "@copula"], ["ապրում", "aprum", "live"]]},
    "this-is-book": {"end": "։", "t": [["Սա", "sa", "this"], ["գիրք", "girk'", "book"], ["է", "e", "@copula"]]},
    "this-is-my-book": {"end": "։", "t": [["Սա", "sa", "this"], ["իմ", "im", "i"], ["գիրքն", "girk'n", "book"], ["է", "e", "@copula"]]},
    "drink-water": {"end": "։", "t": [["Ես", "yes", "i"], ["ջուր", "jur", "water"], ["եմ", "em", "@copula"], ["խմում", "khmum", "drink"]]},
    "drink-tea": {"end": "։", "t": [["Ես", "yes", "i"], ["թեյ", "t'ey", "tea"], ["եմ", "em", "@copula"], ["խմում", "khmum", "drink"]]},
    "want-coffee": {"end": "։", "t": [["Ես", "yes", "i"], ["սուրճ", "surch", "coffee"], ["եմ", "em", "@copula"], ["ուզում", "uzum", "want"]]},
    "read-book": {"end": "։", "t": [["Ես", "yes", "i"], ["գիրք", "girk'", "book"], ["եմ", "em", "@copula"], ["կարդում", "kardum", "read"]]},
    "hot-today": {"end": "։", "t": [["Այսօր", "aysor", "today"], ["տաք", "tak'", "hot"], ["է", "e", "@copula"]]},
    "cold-today": {"end": "։", "t": [["Այսօր", "aysor", "today"], ["սառը", "sarë", "cold"], ["է", "e", "@copula"]]},
    "what-time": {"end": "։", "t": [["Ժամը", "zhamë", "time"], ["քանի՞սն", "k'anisn", "what"], ["է", "e", "@copula"]]},
    "house-big": {"end": "։", "t": [["Տունը", "tunë", "house"], ["մեծ", "mets", "big"], ["է", "e", "@copula"]]},
    "car-new": {"end": "։", "t": [["Մեքենան", "mek'enan", "car"], ["նոր", "nor", "new"], ["է", "e", "@copula"]]},
    "delicious": {"end": "։", "t": [["Համեղ", "hamegh", "delicious"], ["է", "e", "@copula"]]},
    "where-station": {"end": "։", "t": [["Կայարանը", "kayaranë", "station"], ["որտե՞ղ", "vortegh", "where"], ["է", "e", "@copula"]]},
    "where-toilet": {"end": "։", "t": [["Զուգարանը", "zugaranë", "toilet"], ["որտե՞ղ", "vortegh", "where"], ["է", "e", "@copula"]]},
    "where-hotel": {"end": "։", "t": [["Հյուրանոցը", "hyuranots'ë", "hotel"], ["որտե՞ղ", "vortegh", "where"], ["է", "e", "@copula"]]},
    "how-much-this": {"end": "։", "t": [["Սա", "sa", "this"], ["ինչքա՞ն", "inchk'an", "how-much"], ["արժե", "arzhe", "@happen"]]},
    "how-much-is-it": {"end": "։", "t": [["Ինչքա՞ն", "inchk'an", "how-much"], ["արժե", "arzhe", "@happen"]]},
    "how-much-cost": {"end": "։", "t": [["Ինչքա՞ն", "inchk'an", "how-much"], ["արժե", "arzhe", "cost"]]},
    "bill-please": {"end": "։", "t": [["Հաշիվը", "hashivë", "bill"], ["խնդրեմ", "khndrem", "please"]]},
    "go-school": {"end": "։", "t": [["Ես", "yes", "i"], ["դպրոց", "dprots'", "school"], ["եմ", "em", "@copula"], ["գնում", "gnum", "go"]]},
    "going-home": {"end": "։", "t": [["Ես", "yes", "i"], ["տուն", "tun", "home"], ["եմ", "em", "@copula"], ["գնում", "gnum", "go"]]},
    "we-going-home": {"end": "։", "t": [["Մենք", "menk'", "we"], ["տուն", "tun", "home"], ["ենք", "enk'", "@copula"], ["գնում", "gnum", "go"]]},
    "where-going": {"end": "։", "implied": ["you"], "t": [["Որտե՞ղ", "vortegh", "where"], ["ես", "es", "@copula"], ["գնում", "gnum", "go"]]},
    "print-word": {"end": "։", "t": [["Տպիր", "tpir", "print"], ["բառը", "barë", "word"]]},
    "show-number": {"end": "։", "t": [["Ցույց տուր", "ts'uyts' tur", "print"], ["թիվը", "t'ivë", "number"]]},
    "print-screen": {"end": "։", "t": [["Տպիր", "tpir", "print"], ["բառը", "barë", "word"], ["էկրանին", "ekranin", "screen+@place"]]},
    "start-loop": {"end": "։", "t": [["Սկսիր", "sksir", "start"], ["ցիկլը", "ts'iklë", "loop"]]},
    "end-loop": {"end": "։", "t": [["Ավարտիր", "avartir", "end"], ["ցիկլը", "ts'iklë", "loop"]]},
    "repeat-three": {"end": "։", "t": [["Կրկնիր", "krknir", "repeat"], ["երեք", "yerek'", "three"], ["անգամ", "angam", "times"]]},
    "count-to-ten": {"end": "։", "t": [["Հաշվիր", "hashvir", "count"], ["մեկից", "mekits'", "one+from"], ["մինչև", "minchev", "@until"], ["տասը", "tasë", "ten"]]},
    "set-value": {"end": "։", "t": [["Սահմանիր", "sahmanir", "set"], ["արժեքը", "arzhek'ë", "value"]]},
    "create-variable": {"end": "։", "t": [["Ստեղծիր", "steghtsir", "create"], ["փոփոխական", "p'op'okhakan", "variable"]]},
    "return-value": {"end": "։", "t": [["Վերադարձրու", "veradardzru", "return"], ["արժեքը", "arzhek'ë", "value"]]},
    "load-data": {"end": "։", "t": [["Բեռնիր", "bernir", "load"], ["տվյալները", "tvyalnerë", "data"]]},
    "add-one": {"end": "։", "t": [["Ավելացրու", "avelats'ru", "add"], ["մեկ", "mek", "one"]]},
    "sort-list": {"end": "։", "t": [["Դասավորիր", "dasavorir", "sort"], ["ցուցակը", "ts'uts'akë", "list"]]},
    "run-program": {"end": "։", "t": [["Գործարկիր", "gortsarkir", "run"], ["ծրագիրը", "tsragirë", "program"]]},
  },
};
