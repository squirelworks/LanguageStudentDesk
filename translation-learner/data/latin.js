// Generated from squirrel-lang-data bd56e84 meaning/columns/latin.jsonl by: python3 data/tools/gen_meaning.py --out translation-learner/data
// Latin column of the meaning matrix. Written for this project. Tokens are
// [text, "", meaning id]: the text is Classical Latin with macrons, so there is
// no separate reading. Verb endings carry the person, so "I" and "you" are
// often implied. Sources: forms match languages/latin/vocab.js and the Latin
// grammar pack; textbook Latin for everyday phrases (salvē, grātiās, quaesō,
// lātrīna, statiō, deversōrium).
window.TL_LANGS = window.TL_LANGS || {};
window.TL_LANGS.latin = {
  sep: " ",
  r: {
    "i-am-student": {"end": ".", "implied": ["i"], "t": [["Discipulus", "", "student"], ["sum", "", "@copula"]]},
    "name-anna": {"end": ".", "t": [["Nōmen", "", "name"], ["mihi", "", "i"], ["est", "", "@copula"], ["Anna", "", "anna"]]},
    "hello": {"end": ".", "t": [["Salvē", "", "hello"]]},
    "good-morning": {"end": ".", "t": [["Bonum", "", "good"], ["māne", "", "morning"]]},
    "thank-you": {"end": ".", "t": [["Grātiās", "", "thanks"]]},
    "thank-you-very-much": {"end": ".", "t": [["Maximās", "", "very-much"], ["grātiās", "", "thanks"]]},
    "dont-understand": {"end": ".", "implied": ["i"], "t": [["Nōn", "", "not"], ["intellegō", "", "understand"]]},
    "dont-know": {"end": ".", "implied": ["i"], "t": [["Nesciō", "", "not+know"]]},
    "speak-english": {"end": "?", "implied": ["you"], "t": [["Loqueris", "", "speak"], ["-ne", "", "@question"], ["Anglice", "", "english"]]},
    "love-you": {"end": ".", "implied": ["i"], "t": [["Tē", "", "you"], ["amō", "", "love"]]},
    "my-friend": {"end": ".", "t": [["Is", "", "he"], ["est", "", "@copula"], ["amīcus", "", "friend"], ["meus", "", "i"]]},
    "who-is-he": {"end": "?", "t": [["Quis", "", "who"], ["est", "", "@copula"], ["is", "", "he"]]},
    "where-live": {"end": "?", "implied": ["you"], "t": [["Ubi", "", "where"], ["habitās", "", "live"]]},
    "from-egypt": {"end": ".", "implied": ["i"], "t": [["Ex", "", "from"], ["Aegyptō", "", "egypt"], ["sum", "", "@copula"]]},
    "this-is-book": {"end": ".", "t": [["Hic", "", "this"], ["est", "", "@copula"], ["liber", "", "book"]]},
    "this-is-my-book": {"end": ".", "t": [["Hic", "", "this"], ["est", "", "@copula"], ["liber", "", "book"], ["meus", "", "i"]]},
    "drink-water": {"end": ".", "implied": ["i"], "t": [["Aquam", "", "water"], ["bibō", "", "drink"]]},
    "read-book": {"end": ".", "implied": ["i"], "t": [["Librum", "", "book"], ["legō", "", "read"]]},
    "cold-today": {"end": ".", "t": [["Hodiē", "", "today"], ["frīgidum", "", "cold"], ["est", "", "@copula"]]},
    "have-cat": {"end": ".", "implied": ["i"], "t": [["Fēlem", "", "cat"], ["habeō", "", "have"]]},
    "what-time": {"end": "?", "t": [["Quota", "", "what"], ["hōra", "", "time"], ["est", "", "@copula"]]},
    "house-big": {"end": ".", "t": [["Domus", "", "house"], ["magna", "", "big"], ["est", "", "@copula"]]},
    "hungry": {"end": ".", "implied": ["i"], "t": [["Ēsuriō", "", "hungry"]]},
    "give-water": {"end": ".", "t": [["Dā", "", "give"], ["mihi", "", "i"], ["aquam", "", "water"], ["quaesō", "", "please"]]},
    "sit-down": {"end": ".", "t": [["Consīde", "", "sit"], ["quaesō", "", "please"]]},
    "where-station": {"end": "?", "t": [["Ubi", "", "where"], ["est", "", "@copula"], ["statiō", "", "station"]]},
    "where-toilet": {"end": "?", "t": [["Ubi", "", "where"], ["est", "", "@copula"], ["lātrīna", "", "toilet"]]},
    "where-hotel": {"end": "?", "t": [["Ubi", "", "where"], ["est", "", "@copula"], ["deversōrium", "", "hotel"]]},
    "how-much-this": {"end": "?", "t": [["Quantī", "", "how-much"], ["hoc", "", "this"], ["est", "", "@copula"]]},
    "go-school": {"end": ".", "implied": ["i"], "t": [["Ad", "", "@direction"], ["scholam", "", "school"], ["eō", "", "go"]]},
    "going-home": {"end": ".", "implied": ["i"], "t": [["Domum", "", "home"], ["eō", "", "go"]]},
    "we-going-home": {"end": ".", "implied": ["we"], "t": [["Domum", "", "home"], ["īmus", "", "go"]]},
    "i-sleep": {"end": ".", "implied": ["i"], "t": [["Dormiō", "", "sleep"]]},
    "i-fight": {"end": ".", "implied": ["i"], "t": [["Pugnō", "", "fight"]]},
    "we-fight": {"end": ".", "implied": ["we"], "t": [["Pugnāmus", "", "fight"]]},
    "sleep-command": {"end": "!", "t": [["Dormī", "", "sleep"]]},
    "child-sleeps": {"end": ".", "t": [["Puer", "", "child"], ["dormit", "", "sleep"]]},
  },
};
