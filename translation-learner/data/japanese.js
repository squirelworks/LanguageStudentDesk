// Japanese column of the meaning matrix (matrix.js). Written for this project.
// Tokens are [text, kana reading, meaning id]; romaji is made from the kana.
// Japanese usually leaves "I" and "you" to context: those go under implied.
window.TL_LANGS = window.TL_LANGS || {};
window.TL_LANGS.japanese = {
  sep: "",
  r: {
    "i-am-student": { end: "。", t: [["私", "わたし", "i"], ["は", "は", "@topic"], ["学生", "がくせい", "student"], ["です", "です", "@copula"]] },
    "name-tanaka": { end: "。", t: [["私", "わたし", "i"], ["の", "の", "@possessive"], ["名前", "なまえ", "name"], ["は", "は", "@topic"], ["田中", "たなか", "tanaka"], ["です", "です", "@copula"]] },
    "nice-to-meet-you": { end: "。", t: [["はじめまして", "はじめまして", "nice-to-meet-you"]] },
    "thank-you-very-much": { end: "。", t: [["どうも", "どうも", "very-much"], ["ありがとう", "ありがとう", "thanks"], ["ございます", "ございます", "@polite"]] },
    "like-sushi": { end: "。", implied: ["i"], t: [["寿司", "すし", "sushi"], ["が", "が", "@subject"], ["好き", "すき", "like"], ["です", "です", "@copula"]] },
    "speak-english": { end: "。", implied: ["you"], t: [["英語", "えいご", "english"], ["を", "を", "@object"], ["話します", "はなします", "speak"], ["か", "か", "@question"]] },
    "dont-understand": { end: "。", implied: ["i"], t: [["分かり", "わかり", "understand"], ["ません", "ません", "not"]] },
    "this-is-book": { end: "。", t: [["これ", "これ", "this"], ["は", "は", "@topic"], ["本", "ほん", "book"], ["です", "です", "@copula"]] },
    "drink-water": { end: "。", implied: ["i"], t: [["水", "みず", "water"], ["を", "を", "@object"], ["飲みます", "のみます", "drink"]] },
    "hot-today": { end: "。", t: [["今日", "きょう", "today"], ["は", "は", "@topic"], ["暑い", "あつい", "hot"], ["です", "です", "@copula"]] },
    "there-is-cat": { end: "。", t: [["猫", "ねこ", "cat"], ["が", "が", "@subject"], ["います", "います", "exist"]] },
    "lunch-restaurant": { end: "。", implied: ["i"], t: [["レストラン", "レストラン", "restaurant"], ["で", "で", "@place"], ["昼ご飯", "ひるごはん", "lunch"], ["を", "を", "@object"], ["食べます", "たべます", "eat"]] },
    "book-on-table": { end: "。", t: [["テーブル", "テーブル", "table"], ["の", "の", "@of"], ["上", "うえ", "on"], ["に", "に", "@place"], ["本", "ほん", "book"], ["が", "が", "@subject"], ["あります", "あります", "exist"]] },
    "how-much-this": { end: "。", t: [["これ", "これ", "this"], ["は", "は", "@topic"], ["いくら", "いくら", "how-much"], ["です", "です", "@copula"], ["か", "か", "@question"]] },
    "wait-moment": { end: "。", t: [["ちょっと", "ちょっと", "moment"], ["待って", "まって", "wait"], ["ください", "ください", "please"]] },
    "where-station": { end: "。", t: [["駅", "えき", "station"], ["は", "は", "@topic"], ["どこ", "どこ", "where"], ["です", "です", "@copula"], ["か", "か", "@question"]] },
    "where-toilet": { end: "。", t: [["トイレ", "トイレ", "toilet"], ["は", "は", "@topic"], ["どこ", "どこ", "where"], ["です", "です", "@copula"], ["か", "か", "@question"]] },
    "go-school": { end: "。", implied: ["i"], t: [["学校", "がっこう", "school"], ["に", "に", "@direction"], ["行きます", "いきます", "go"]] },
    "go-tokyo": { end: "。", implied: ["i"], t: [["東京", "とうきょう", "tokyo"], ["に", "に", "@direction"], ["行き", "いき", "go"], ["たい", "たい", "want"], ["です", "です", "@polite"]] },
    "came-train": { end: "。", implied: ["i"], t: [["電車", "でんしゃ", "train"], ["で", "で", "@means"], ["来", "き", "come"], ["ました", "ました", "@past"]] },
  },
};
