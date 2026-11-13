// Generated from squirrel-lang-data ffd03a7 meaning/columns/arabic.jsonl by: python3 data/tools/gen_meaning.py --out translation-learner/data
// Arabic (Modern Standard) column of the meaning matrix. Written for this
// project. Tokens are [text, romanization, meaning id]. The article ال is its
// own token, romanized by the sun-letter rule (as-sayyāra, al-bayt). Verbs
// carry their subject, so "I" and "you" are often implied.
window.TL_LANGS = window.TL_LANGS || {};
window.TL_LANGS.arabic = {
  sep: " ",
  r: {
    "i-am-student": {"end": ".", "t": [["أنا", "anā", "i"], ["طالب", "ṭālib", "student"]]},
    "your-name": {"end": "؟", "t": [["ما", "mā", "what"], ["اسم", "ism", "name"], ["-ك", "uka", "you"]]},
    "name-sami": {"end": ".", "t": [["اسم", "ism", "name"], ["-ي", "ī", "i"], ["سامي", "Sāmī", "sami"]]},
    "thank-you": {"end": ".", "t": [["شكرا", "shukran", "thanks"]]},
    "from-egypt": {"end": ".", "t": [["أنا", "anā", "i"], ["من", "min", "from"], ["مصر", "Miṣr", "egypt"]]},
    "good-morning": {"end": ".", "t": [["صباح", "ṣabāḥ", "morning"], ["ال-", "al", "@the"], ["خير", "khayr", "good"]]},
    "dont-understand": {"end": ".", "t": [["أنا", "anā", "i"], ["لا", "lā", "not"], ["أفهم", "afham", "understand"]]},
    "speak-arabic": {"end": "؟", "implied": ["you"], "t": [["هل", "hal", "@question"], ["تتكلم", "tatakallam", "speak"], ["ال-", "al", "@the"], ["عربية", "ʿarabiyya", "arabic"]]},
    "this-is-book": {"end": ".", "t": [["هذا", "hādhā", "this"], ["كتاب", "kitāb", "book"]]},
    "drink-water": {"end": ".", "implied": ["i"], "t": [["أشرب", "ashrab", "drink"], ["ال-", "al", "@the"], ["ماء", "māʾ", "water"]]},
    "house-big": {"end": ".", "t": [["ال-", "al", "@the"], ["بيت", "bayt", "house"], ["كبير", "kabīr", "big"]]},
    "car-new": {"end": ".", "t": [["ال-", "as", "@the"], ["سيارة", "sayyāra", "car"], ["جديدة", "jadīda", "new"]]},
    "weather-hot": {"end": ".", "t": [["ال-", "aj", "@the"], ["جو", "jaww", "weather"], ["حار", "ḥārr", "hot"], ["ال-", "al", "@the"], ["يوم", "yawm", "today"]]},
    "want-coffee": {"end": ".", "implied": ["i"], "t": [["أريد", "urīd", "want"], ["قهوة", "qahwa", "coffee"]]},
    "sit-down": {"end": ".", "t": [["تفضل", "tafaḍḍal", "please"], ["اجلس", "ijlis", "sit"]]},
    "where-station": {"end": "؟", "t": [["أين", "ayna", "where"], ["ال-", "al", "@the"], ["محطة", "maḥaṭṭa", "station"]]},
    "where-toilet": {"end": "؟", "t": [["أين", "ayna", "where"], ["ال-", "al", "@the"], ["حمام", "ḥammām", "toilet"]]},
    "where-hotel": {"end": "؟", "t": [["أين", "ayna", "where"], ["ال-", "al", "@the"], ["فندق", "funduq", "hotel"]]},
    "how-much-this": {"end": "؟", "t": [["بكم", "bikam", "how-much"], ["هذا", "hādhā", "this"]]},
    "live-cairo": {"end": ".", "implied": ["i"], "t": [["أسكن", "askun", "live"], ["في", "fī", "@place"], ["القاهرة", "al-Qāhira", "cairo"]]},
    "print-word": {"end": ".", "t": [["اطبع", "iṭbaʿ", "print"], ["ال-", "al", "@the"], ["كلمة", "kalima", "word"]]},
    "show-number": {"end": ".", "t": [["اعرض", "iʿriḍ", "print"], ["ال-", "ar", "@the"], ["رقم", "raqm", "number"]]},
    "print-screen": {"end": ".", "t": [["اطبع", "iṭbaʿ", "print"], ["ال-", "al", "@the"], ["كلمة", "kalima", "word"], ["على", "ʿalā", "@place"], ["ال-", "ash", "@the"], ["شاشة", "shāsha", "screen"]]},
    "start-loop": {"end": ".", "t": [["ابدأ", "ibdaʾ", "start"], ["حلقة", "ḥalqa", "loop"]]},
    "end-loop": {"end": ".", "t": [["أنهِ", "anhi", "end"], ["ال-", "al", "@the"], ["حلقة", "ḥalqa", "loop"]]},
    "repeat-three": {"end": ".", "t": [["كرّر", "karrir", "repeat"], ["ثلاث", "thalāth", "three"], ["مرات", "marrāt", "times"]]},
    "count-to-ten": {"end": ".", "t": [["عُدّ", "ʿudda", "count"], ["من", "min", "from"], ["واحد", "wāḥid", "one"], ["إلى", "ilā", "@until"], ["عشرة", "ʿashara", "ten"]]},
    "set-value": {"end": ".", "t": [["عيّن", "ʿayyin", "set"], ["ال-", "al", "@the"], ["قيمة", "qīma", "value"]]},
    "create-variable": {"end": ".", "t": [["أنشئ", "anshiʾ", "create"], ["متغيرًا", "mutaghayyiran", "variable"]]},
    "return-value": {"end": ".", "t": [["أرجع", "arjiʿ", "return"], ["ال-", "al", "@the"], ["قيمة", "qīma", "value"]]},
    "load-data": {"end": ".", "t": [["حمّل", "ḥammil", "load"], ["ال-", "al", "@the"], ["بيانات", "bayānāt", "data"]]},
    "add-one": {"end": ".", "t": [["أضف", "aḍif", "add"], ["واحدًا", "wāḥidan", "one"]]},
    "sort-list": {"end": ".", "t": [["رتّب", "rattib", "sort"], ["ال-", "al", "@the"], ["قائمة", "qāʾima", "list"]]},
    "run-program": {"end": ".", "t": [["شغّل", "shaghghil", "run"], ["ال-", "al", "@the"], ["برنامج", "barnāmaj", "program"]]},
  },
};
