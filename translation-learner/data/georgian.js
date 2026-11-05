// Generated from squirrel-lang-data d5e05a4 meaning/columns/georgian.jsonl by: python3 data/tools/gen_meaning.py --out translation-learner/data
// Georgian column of the meaning matrix. Written for this project. Tokens are
// [text, romanization, meaning id]. The romanization matches the national
// system in languages/georgian (apostrophe marks an ejective). Verb prefixes
// and endings mark the person, so "I" and "you" are often implied; inverted
// verbs (მინდა, მომწონს, მესმის, მიყვარს) mark the experiencer with მ- / გ-.
// Sources: forms match languages/georgian/vocab.js, reference.json phrases, and
// the Georgian grammar pack (მე სტუდენტი ვარ, ჩემი სახელია…, ინგლისურად
// ლაპარაკობთ?, არ მესმის, არ ვიცი, სკოლაში მივდივარ, ტუალეტი სად არის?, რამდენი
// ღირს?, დიდი მადლობა, ანგარიში, თუ შეიძლება).
window.TL_LANGS = window.TL_LANGS || {};
window.TL_LANGS.georgian = {
  sep: " ",
  r: {
    "i-am-student": {"end": ".", "t": [["მე", "me", "i"], ["სტუდენტი", "st'udent'i", "student"], ["ვარ", "var", "@copula"]]},
    "name-anna": {"end": ".", "t": [["ჩემი", "chemi", "i"], ["სახელი", "sakheli", "name"], ["-ა", "a", "@copula"], ["ანა", "Ana", "anna"]]},
    "your-name": {"end": "?", "t": [["თქვენი", "tkveni", "you"], ["სახელი", "sakheli", "name"], ["რა", "ra", "what"], ["არის", "aris", "@copula"]]},
    "hello": {"end": ".", "t": [["გამარჯობა", "gamarjoba", "hello"]]},
    "nice-to-meet-you": {"end": ".", "t": [["სასიამოვნოა", "sasiamovnoa", "nice-to-meet-you"]]},
    "good-morning": {"end": ".", "t": [["დილა მშვიდობისა", "dila mshvidobisa", "good+morning"]]},
    "thank-you": {"end": ".", "t": [["მადლობა", "madloba", "thanks"]]},
    "thank-you-very-much": {"end": ".", "t": [["დიდი", "didi", "very-much"], ["მადლობა", "madloba", "thanks"]]},
    "dont-understand": {"end": ".", "implied": ["i"], "t": [["არ", "ar", "not"], ["მესმის", "mesmis", "understand"]]},
    "dont-know": {"end": ".", "implied": ["i"], "t": [["არ", "ar", "not"], ["ვიცი", "vitsi", "know"]]},
    "speak-english": {"end": "?", "implied": ["you"], "t": [["ინგლისურად", "inglisurad", "english"], ["ლაპარაკობთ", "lap'arak'obt", "speak"]]},
    "like-coffee": {"end": ".", "implied": ["i"], "t": [["ყავა", "q'ava", "coffee"], ["მომწონს", "momts'ons", "like"]]},
    "like-tea": {"end": ".", "implied": ["i"], "t": [["ჩაი", "chai", "tea"], ["მომწონს", "momts'ons", "like"]]},
    "love-you": {"end": ".", "implied": ["i"], "t": [["შენ", "shen", "you"], ["მიყვარს", "miq'vars", "love"]]},
    "my-friend": {"end": ".", "t": [["ის", "is", "he"], ["ჩემი", "chemi", "i"], ["მეგობარი", "megobari", "friend"], ["-ა", "a", "@copula"]]},
    "who-is-he": {"end": "?", "t": [["ვინ", "vin", "who"], ["არის", "aris", "@copula"], ["ის", "is", "he"]]},
    "where-live": {"end": "?", "implied": ["you"], "t": [["სად", "sad", "where"], ["ცხოვრობთ", "tskhovrobt", "live"]]},
    "this-is-book": {"end": ".", "t": [["ეს", "es", "this"], ["წიგნი", "ts'igni", "book"], ["-ა", "a", "@copula"]]},
    "this-is-my-book": {"end": ".", "t": [["ეს", "es", "this"], ["ჩემი", "chemi", "i"], ["წიგნი", "ts'igni", "book"], ["-ა", "a", "@copula"]]},
    "drink-water": {"end": ".", "implied": ["i"], "t": [["წყალს", "ts'q'als", "water"], ["ვსვამ", "vsvam", "drink"]]},
    "drink-tea": {"end": ".", "implied": ["i"], "t": [["ჩაის", "chais", "tea"], ["ვსვამ", "vsvam", "drink"]]},
    "want-coffee": {"end": ".", "implied": ["i"], "t": [["ყავა", "q'ava", "coffee"], ["მინდა", "minda", "want"]]},
    "read-book": {"end": ".", "implied": ["i"], "t": [["წიგნს", "ts'igns", "book"], ["ვკითხულობ", "vk'itkhulob", "read"]]},
    "hot-today": {"end": ".", "t": [["დღეს", "dghes", "today"], ["ცხელი", "tskheli", "hot"], ["-ა", "a", "@copula"]]},
    "cold-today": {"end": ".", "t": [["დღეს", "dghes", "today"], ["ცივი", "tsivi", "cold"], ["-ა", "a", "@copula"]]},
    "what-time": {"end": "?", "t": [["რა", "ra", "what"], ["საათი", "saati", "time"], ["-ა", "a", "@copula"]]},
    "house-big": {"end": ".", "t": [["სახლი", "sakhli", "house"], ["დიდი", "didi", "big"], ["-ა", "a", "@copula"]]},
    "car-new": {"end": ".", "t": [["მანქანა", "mankana", "car"], ["ახალი", "akhali", "new"], ["-ა", "a", "@copula"]]},
    "delicious": {"end": ".", "t": [["გემრიელია", "gemrielia", "delicious"]]},
    "where-station": {"end": "?", "t": [["სადგური", "sadguri", "station"], ["სად", "sad", "where"], ["არის", "aris", "@copula"]]},
    "where-toilet": {"end": "?", "t": [["ტუალეტი", "t'ualet'i", "toilet"], ["სად", "sad", "where"], ["არის", "aris", "@copula"]]},
    "where-hotel": {"end": "?", "t": [["სასტუმრო", "sast'umro", "hotel"], ["სად", "sad", "where"], ["არის", "aris", "@copula"]]},
    "how-much-this": {"end": "?", "t": [["ეს", "es", "this"], ["რამდენი", "ramdeni", "how-much"], ["ღირს", "ghirs", "@happen"]]},
    "how-much-is-it": {"end": "?", "t": [["რამდენი", "ramdeni", "how-much"], ["ღირს", "ghirs", "@happen"]]},
    "how-much-cost": {"end": "?", "t": [["რამდენი", "ramdeni", "how-much"], ["ღირს", "ghirs", "cost"]]},
    "bill-please": {"end": ".", "t": [["ანგარიში", "angarishi", "bill"], ["თუ შეიძლება", "tu sheidzleba", "please"]]},
    "go-school": {"end": ".", "implied": ["i"], "t": [["სკოლა", "sk'ola", "school"], ["-ში", "shi", "@direction"], ["მივდივარ", "mivdivar", "go"]]},
    "going-home": {"end": ".", "implied": ["i"], "t": [["სახლი", "sakhli", "home"], ["-ში", "shi", "@direction"], ["მივდივარ", "mivdivar", "go"]]},
    "we-going-home": {"end": ".", "t": [["ჩვენ", "chven", "we"], ["სახლი", "sakhli", "home"], ["-ში", "shi", "@direction"], ["მივდივართ", "mivdivart", "go"]]},
    "where-going": {"end": "?", "implied": ["you"], "t": [["სად", "sad", "where"], ["მიდიხართ", "midikhart", "go"]]},
    "print-word": {"end": ".", "t": [["დაბეჭდე", "dabech'de", "print"], ["სიტყვა", "sit'q'va", "word"]]},
    "show-number": {"end": ".", "t": [["აჩვენე", "achvene", "print"], ["რიცხვი", "ritskhvi", "number"]]},
    "print-screen": {"end": ".", "t": [["დაბეჭდე", "dabech'de", "print"], ["სიტყვა", "sit'q'va", "word"], ["ეკრან", "ek'ran", "screen"], ["-ზე", "ze", "@place"]]},
    "start-loop": {"end": ".", "t": [["დაიწყე", "daits'q'e", "start"], ["ციკლი", "tsik'li", "loop"]]},
    "end-loop": {"end": ".", "t": [["დაასრულე", "daasrule", "end"], ["ციკლი", "tsik'li", "loop"]]},
    "repeat-three": {"end": ".", "t": [["გაიმეორე", "gaimeore", "repeat"], ["სამ", "sam", "three"], ["-ჯერ", "jer", "times"]]},
    "count-to-ten": {"end": ".", "t": [["დათვალე", "datvale", "count"], ["ერთი", "erti", "one"], ["-დან", "dan", "from"], ["ათ", "at", "ten"], ["-ამდე", "amde", "@until"]]},
    "set-value": {"end": ".", "t": [["მიანიჭე", "mianich'e", "set"], ["მნიშვნელობა", "mnishvneloba", "value"]]},
    "create-variable": {"end": ".", "t": [["შექმენი", "shekmeni", "create"], ["ცვლადი", "tsvladi", "variable"]]},
    "return-value": {"end": ".", "t": [["დააბრუნე", "daabrune", "return"], ["მნიშვნელობა", "mnishvneloba", "value"]]},
    "load-data": {"end": ".", "t": [["ჩატვირთე", "chat'virte", "load"], ["მონაცემები", "monatsemebi", "data"]]},
    "add-one": {"end": ".", "t": [["დაუმატე", "daumat'e", "add"], ["ერთი", "erti", "one"]]},
    "sort-list": {"end": ".", "t": [["დაალაგე", "daalage", "sort"], ["სია", "sia", "list"]]},
    "run-program": {"end": ".", "t": [["გაუშვი", "gaushvi", "run"], ["პროგრამა", "p'rograma", "program"]]},
  },
};
