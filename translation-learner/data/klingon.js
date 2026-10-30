// Klingon column of the meaning matrix (matrix.js). Written for this project.
// Tokens are [text, "", meaning id]: the text is already romanized and pIqaD
// is drawn from it. Prefixes end in "-", suffixes start with "-".
// Klingon puts the object first and the subject last: "puq legh yaS" is
// child, sees, officer, and means the officer sees the child.
window.TL_LANGS = window.TL_LANGS || {};
window.TL_LANGS.klingon = {
  sep: " ",
  caseSensitive: true,
  r: {
    "hello": { end: "", t: [["nuqneH", "", "hello"]] },
    "success": { end: "!", t: [["Qapla'", "", "success"]] },
    "dont-understand": { end: "", t: [["jI-", "", "i"], ["yaj", "", "understand"], ["-be'", "", "not"]] },
    "speak-klingon": { end: "", t: [["tlhIngan", "", "klingon"], ["Hol", "", "@language"], ["Da-", "", "you"], ["jatlh", "", "speak"], ["-'a'", "", "@question"]] },
    "where-toilet": { end: "", t: [["nuqDaq", "", "where"], ["'oH", "", "@copula"], ["puchpa'", "", "toilet"], ["-'e'", "", "@topic"]] },
    "we-are-klingons": { end: "", t: [["tlhIngan", "", "klingon"], ["maH", "", "we"]] },
    "hungry": { end: "", t: [["jI-", "", "i"], ["ghung", "", "hungry"]] },
    "i-sleep": { end: "", t: [["jI-", "", "i"], ["Qong", "", "sleep"]] },
    "i-fight": { end: "", t: [["jI-", "", "i"], ["Suv", "", "fight"]] },
    "we-fight": { end: "", t: [["ma-", "", "we"], ["Suv", "", "fight"]] },
    "sleep-command": { end: "!", t: [["yI-", "", "@command"], ["Qong", "", "sleep"]] },
    "child-sleeps": { end: "", t: [["Qong", "", "sleep"], ["puq", "", "child"]] },
    "officer-sees-child": { end: "", t: [["puq", "", "child"], ["legh", "", "see"], ["yaS", "", "officer"]] },
    "captain-sees-ship": { end: "", t: [["Duj", "", "ship"], ["legh", "", "see"], ["HoD", "", "captain"]] },
    "i-see-ship": { end: "", t: [["Duj", "", "ship"], ["vI-", "", "i"], ["legh", "", "see"]] },
    "eat-food": { end: "", t: [["Soj", "", "food"], ["vI-", "", "i"], ["Sop", "", "eat"]] },
    "drink-water": { end: "", t: [["bIQ", "", "water"], ["vI-", "", "i"], ["tlhutlh", "", "drink"]] },
  },
};
