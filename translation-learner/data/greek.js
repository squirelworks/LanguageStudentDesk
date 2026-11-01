// Modern Greek column of the meaning matrix (matrix.js). Written for this project.
// Tokens are [text, romanization, meaning id]. Verb endings mark the person, so
// "I" and "you" are often implied. The Greek question mark is ";". Sources:
// forms match languages/greek/vocab.js and the Modern Greek grammar pack;
// everyday phrases from those decks (γεια σου, καλημέρα, ευχαριστώ, παρακαλώ,
// δεν καταλαβαίνω, μιλάτε αγγλικά;, πού είναι η τουαλέτα;).
window.TL_LANGS = window.TL_LANGS || {};
window.TL_LANGS.greek = {
  sep: " ",
  r: {
    "i-am-student": { end: ".", implied: ["i"], t: [["Είμαι", "íme", "@copula"], ["φοιτητής", "fititís", "student"]] },
    "name-anna": { end: ".", t: [["Με", "me", "i"], ["λένε", "léne", "name"], ["Άννα", "Ánna", "anna"]] },
    "hello": { end: ".", t: [["Γεια σου", "giá sou", "hello"]] },
    "nice-to-meet-you": { end: ".", t: [["Χαίρω πολύ", "chéro polí", "nice-to-meet-you"]] },
    "good-morning": { end: ".", t: [["Καλημέρα", "kaliméra", "good+morning"]] },
    "thank-you": { end: ".", t: [["Ευχαριστώ", "efcharistó", "thanks"]] },
    "thank-you-very-much": { end: ".", t: [["Ευχαριστώ", "efcharistó", "thanks"], ["πολύ", "polí", "very-much"]] },
    "dont-understand": { end: ".", implied: ["i"], t: [["Δεν", "den", "not"], ["καταλαβαίνω", "katalavéno", "understand"]] },
    "dont-know": { end: ".", implied: ["i"], t: [["Δεν", "den", "not"], ["ξέρω", "xéro", "know"]] },
    "speak-english": { end: ";", implied: ["you"], t: [["Μιλάτε", "miláte", "speak"], ["αγγλικά", "angliká", "english"]] },
    "love-you": { end: ".", implied: ["i"], t: [["Σε", "se", "you"], ["αγαπάω", "agapáo", "love"]] },
    "my-friend": { end: ".", t: [["Αυτός", "aftós", "he"], ["είναι", "íne", "@copula"], ["ο", "o", "@the"], ["φίλος", "fílos", "friend"], ["μου", "mu", "i"]] },
    "who-is-he": { end: ";", t: [["Ποιος", "piós", "who"], ["είναι", "íne", "@copula"], ["αυτός", "aftós", "he"]] },
    "where-live": { end: ";", implied: ["you"], t: [["Πού", "poú", "where"], ["μένεις", "ménis", "live"]] },
    "from-egypt": { end: ".", implied: ["i"], t: [["Είμαι", "íme", "@copula"], ["από", "apó", "from"], ["την", "tin", "@the"], ["Αίγυπτο", "Éyipto", "egypt"]] },

    "this-is-book": { end: ".", t: [["Αυτό", "aftó", "this"], ["είναι", "íne", "@copula"], ["ένα", "éna", "@one"], ["βιβλίο", "vivlío", "book"]] },
    "this-is-my-book": { end: ".", t: [["Αυτό", "aftó", "this"], ["είναι", "íne", "@copula"], ["το", "to", "@the"], ["βιβλίο", "vivlío", "book"], ["μου", "mu", "i"]] },
    "drink-water": { end: ".", implied: ["i"], t: [["Πίνω", "píno", "drink"], ["νερό", "neró", "water"]] },
    "drink-tea": { end: ".", implied: ["i"], t: [["Πίνω", "píno", "drink"], ["τσάι", "tsái", "tea"]] },
    "want-coffee": { end: ".", implied: ["i"], t: [["Θέλω", "thélo", "want"], ["καφέ", "kafé", "coffee"]] },
    "read-book": { end: ".", implied: ["i"], t: [["Διαβάζω", "diavázo", "read"], ["ένα", "éna", "@one"], ["βιβλίο", "vivlío", "book"]] },
    "cold-today": { end: ".", t: [["Σήμερα", "símera", "today"], ["κάνει", "káni", "@happen"], ["κρύο", "krío", "cold"]] },
    "hot-today": { end: ".", t: [["Σήμερα", "símera", "today"], ["κάνει", "káni", "@happen"], ["ζέστη", "zésti", "hot"]] },
    "have-cat": { end: ".", implied: ["i"], t: [["Έχω", "écho", "have"], ["μια", "mia", "@one"], ["γάτα", "gáta", "cat"]] },
    "what-time": { end: ";", t: [["Τι", "ti", "what"], ["ώρα", "óra", "time"], ["είναι", "íne", "@copula"]] },
    "house-big": { end: ".", t: [["Το", "to", "@the"], ["σπίτι", "spíti", "house"], ["είναι", "íne", "@copula"], ["μεγάλο", "megálo", "big"]] },
    "hungry": { end: ".", implied: ["i"], t: [["Πεινάω", "pináo", "hungry"]] },
    "give-water": { end: ".", t: [["Δώσε", "dóse", "give"], ["μου", "mu", "i"], ["νερό", "neró", "water"], ["παρακαλώ", "parakaló", "please"]] },
    "sit-down": { end: ".", t: [["Κάτσε", "kátse", "sit"], ["παρακαλώ", "parakaló", "please"]] },
    "delicious": { end: ".", t: [["Είναι", "íne", "@copula"], ["νόστιμο", "nóstimo", "delicious"]] },

    "where-station": { end: ";", t: [["Πού", "poú", "where"], ["είναι", "íne", "@copula"], ["ο", "o", "@the"], ["σταθμός", "stathmós", "station"]] },
    "where-toilet": { end: ";", t: [["Πού", "poú", "where"], ["είναι", "íne", "@copula"], ["η", "i", "@the"], ["τουαλέτα", "tualéta", "toilet"]] },
    "where-hotel": { end: ";", t: [["Πού", "poú", "where"], ["είναι", "íne", "@copula"], ["το", "to", "@the"], ["ξενοδοχείο", "xenodochío", "hotel"]] },
    "how-much-this": { end: ";", t: [["Πόσο", "póso", "how-much"], ["κάνει", "káni", "@happen"], ["αυτό", "aftó", "this"]] },
    "how-much-is-it": { end: ";", t: [["Πόσο", "póso", "how-much"], ["κάνει", "káni", "@happen"]] },
    "bill-please": { end: ".", t: [["Τον", "ton", "@the"], ["λογαριασμό", "logariasmó", "bill"], ["παρακαλώ", "parakaló", "please"]] },
    "go-school": { end: ".", implied: ["i"], t: [["Πάω", "páo", "go"], ["στο", "sto", "@direction"], ["σχολείο", "scholío", "school"]] },
    "going-home": { end: ".", implied: ["i"], t: [["Πάω", "páo", "go"], ["σπίτι", "spíti", "home"]] },
    "we-going-home": { end: ".", implied: ["we"], t: [["Πάμε", "páme", "go"], ["σπίτι", "spíti", "home"]] },
    "where-going": { end: ";", implied: ["you"], t: [["Πού", "poú", "where"], ["πας", "pas", "go"]] },

    "i-sleep": { end: ".", implied: ["i"], t: [["Κοιμάμαι", "kimáme", "sleep"]] },
    "child-sleeps": { end: ".", t: [["Το", "to", "@the"], ["παιδί", "pedí", "child"], ["κοιμάται", "kimáte", "sleep"]] },
  },
};
