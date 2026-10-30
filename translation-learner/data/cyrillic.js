// Russian column of the meaning matrix (matrix.js). Written for this project.
// Tokens are [text, romanization, meaning id].
window.TL_LANGS = window.TL_LANGS || {};
window.TL_LANGS.cyrillic = {
  sep: " ",
  r: {
    "i-am-student": { end: ".", t: [["Я", "ya", "i"], ["студент", "student", "student"]] },
    "name-anna": { end: ".", t: [["Меня", "menya", "i"], ["зовут", "zovut", "name"], ["Анна", "Anna", "anna"]] },
    "thank-you-very-much": { end: ".", t: [["Большое", "bol'shoye", "very-much"], ["спасибо", "spasibo", "thanks"]] },
    "good-morning": { end: ".", t: [["Доброе", "dobroye", "good"], ["утро", "utro", "morning"]] },
    "speak-english": { end: "?", t: [["Вы", "vy", "you"], ["говорите", "govorite", "speak"], ["по-английски", "po-angliyski", "english"]] },
    "dont-understand": { end: ".", t: [["Я", "ya", "i"], ["не", "ne", "not"], ["понимаю", "ponimayu", "understand"]] },
    "love-you": { end: ".", t: [["Я", "ya", "i"], ["тебя", "tebya", "you"], ["люблю", "lyublyu", "love"]] },
    "this-is-my-book": { end: ".", t: [["Это", "eto", "this"], ["моя", "moya", "i"], ["книга", "kniga", "book"]] },
    "drink-tea": { end: ".", t: [["Я", "ya", "i"], ["пью", "p'yu", "drink"], ["чай", "chay", "tea"]] },
    "read-book": { end: ".", t: [["Я", "ya", "i"], ["читаю", "chitayu", "read"], ["книгу", "knigu", "book"]] },
    "want-coffee": { end: ".", t: [["Я", "ya", "i"], ["хочу", "khochu", "want"], ["кофе", "kofe", "coffee"]] },
    "cold-today": { end: ".", t: [["Сегодня", "segodnya", "today"], ["холодно", "kholodno", "cold"]] },
    "have-cat": { end: ".", t: [["У", "u", "@possession"], ["меня", "menya", "i"], ["есть", "yest'", "have"], ["кошка", "koshka", "cat"]] },
    "what-time": { end: "?", t: [["Который", "kotoryy", "what"], ["час", "chas", "time"]] },
    "where-station": { end: "?", t: [["Где", "gde", "where"], ["вокзал", "vokzal", "station"]] },
    "where-toilet": { end: "?", t: [["Где", "gde", "where"], ["туалет", "tualet", "toilet"]] },
    "how-much-cost": { end: "?", t: [["Сколько", "skol'ko", "how-much"], ["стоит", "stoit", "cost"]] },
    "live-moscow": { end: ".", t: [["Я", "ya", "i"], ["живу", "zhivu", "live"], ["в", "v", "@place"], ["Москве", "Moskve", "moscow"]] },
    "we-going-home": { end: ".", t: [["Мы", "my", "we"], ["идём", "idyom", "go"], ["домой", "domoy", "home"]] },
    "bill-please": { end: ".", t: [["Счёт", "schyot", "bill"], ["пожалуйста", "pozhaluysta", "please"]] },
  },
};
