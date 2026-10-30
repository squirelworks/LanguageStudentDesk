// Korean column of the meaning matrix (matrix.js). Written for this project.
// Tokens are [text, Revised Romanization, meaning id]. Particles and endings
// start with "-" because they are written solid with the word before.
window.TL_LANGS = window.TL_LANGS || {};
window.TL_LANGS.hangul = {
  sep: " ",
  r: {
    "i-am-student": { end: ".", t: [["저", "jeo", "i"], ["-는", "neun", "@topic"], ["학생", "haksaeng", "student"], ["-이에요", "ieyo", "@copula"]] },
    "name-minjun": { end: ".", t: [["제", "je", "i"], ["이름", "ireum", "name"], ["-은", "eun", "@topic"], ["민준", "Minjun", "minjun"], ["-이에요", "ieyo", "@copula"]] },
    "thank-you": { end: ".", t: [["감사합니다", "gamsahamnida", "thanks"]] },
    "like-coffee": { end: ".", t: [["저", "jeo", "i"], ["-는", "neun", "@topic"], ["커피", "keopi", "coffee"], ["-를", "reul", "@object"], ["좋아해요", "joahaeyo", "like"]] },
    "dont-know": { end: ".", implied: ["i"], t: [["몰라요", "mollayo", "not+know"]] },
    "met-friend": { end: ".", implied: ["i"], t: [["어제", "eoje", "yesterday"], ["친구", "chingu", "friend"], ["-를", "reul", "@object"], ["만났어요", "mannasseoyo", "meet"]] },
    "study-korean": { end: ".", implied: ["i"], t: [["한국어", "hangugeo", "korean"], ["-를", "reul", "@object"], ["공부해요", "gongbuhaeyo", "study"]] },
    "drink-water": { end: ".", t: [["저", "jeo", "i"], ["-는", "neun", "@topic"], ["물", "mul", "water"], ["-을", "eul", "@object"], ["마셔요", "masyeoyo", "drink"]] },
    "there-is-cat": { end: ".", t: [["고양이", "goyang-i", "cat"], ["-가", "ga", "@subject"], ["있어요", "isseoyo", "exist"]] },
    "no-time": { end: ".", t: [["시간", "sigan", "time"], ["-이", "i", "@subject"], ["없어요", "eopseoyo", "none"]] },
    "cold-today": { end: ".", t: [["오늘", "oneul", "today"], ["-은", "eun", "@topic"], ["추워요", "chuwoyo", "cold"]] },
    "eat-restaurant": { end: ".", implied: ["i"], t: [["식당", "sikdang", "restaurant"], ["-에서", "eseo", "@place"], ["먹어요", "meogeoyo", "eat"]] },
    "delicious": { end: ".", t: [["맛있어요", "masisseoyo", "delicious"]] },
    "give-water": { end: ".", implied: ["i"], t: [["물", "mul", "water"], ["주세요", "juseyo", "give+please"]] },
    "where-toilet": { end: "?", t: [["화장실", "hwajangsil", "toilet"], ["-이", "i", "@subject"], ["어디", "eodi", "where"], ["-예요", "yeyo", "@copula"]] },
    "how-much-is-it": { end: "?", t: [["얼마", "eolma", "how-much"], ["-예요", "yeyo", "@copula"]] },
    "go-school": { end: ".", implied: ["i"], t: [["학교", "hakgyo", "school"], ["-에", "e", "@direction"], ["가요", "gayo", "go"]] },
    "where-going": { end: "?", implied: ["you"], t: [["어디", "eodi", "where"], ["-에", "e", "@direction"], ["가요", "gayo", "go"]] },
    "going-home": { end: ".", implied: ["i"], t: [["집", "jip", "home"], ["-에", "e", "@direction"], ["가요", "gayo", "go"]] },
  },
};
