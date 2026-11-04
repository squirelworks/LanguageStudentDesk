// Generated from squirrel-lang-data b6912a0 meaning/columns/bengali.jsonl by: python3 data/tools/gen_meaning.py --out translation-learner/data
// Bengali column of the meaning matrix. Written for this project. Tokens are
// [text, romanization, meaning id]. The romanization matches the simplified
// scheme in languages/bengali (o for the inherent vowel; ch, th, kh for
// aspirates). Sources: forms match languages/bengali/vocab.js and the Bengali
// grammar pack (আমি ছাত্র, এটা আমার বই, আমি বুঝি না, আমি জানি না, আপনি কি
// ইংরেজি বলেন, আপনার নাম কী, বাথরুম কোথায়, এটার দাম কত, আমি ভাত খাই, তুমি
// কোথায় থাকো, আমি স্কুলে যাই, আমার … আছে).
window.TL_LANGS = window.TL_LANGS || {};
window.TL_LANGS.bengali = {
  sep: " ",
  r: {
    "i-am-student": {"end": "।", "t": [["আমি", "ami", "i"], ["ছাত্র", "chhatro", "student"]]},
    "name-anna": {"end": "।", "t": [["আমার", "amar", "i"], ["নাম", "nam", "name"], ["অ্যানা", "Aena", "anna"]]},
    "name-ravi": {"end": "।", "t": [["আমার", "amar", "i"], ["নাম", "nam", "name"], ["রবি", "Robi", "ravi"]]},
    "your-name": {"end": "?", "t": [["আপনার", "apnar", "you"], ["নাম", "nam", "name"], ["কী", "ki", "what"]]},
    "hello": {"end": "।", "t": [["নমস্কার", "nomoshkar", "hello"]]},
    "thank-you": {"end": "।", "t": [["ধন্যবাদ", "dhonnobad", "thanks"]]},
    "dont-understand": {"end": "।", "t": [["আমি", "ami", "i"], ["বুঝি", "bujhi", "understand"], ["না", "na", "not"]]},
    "dont-know": {"end": "।", "t": [["আমি", "ami", "i"], ["জানি", "jani", "know"], ["না", "na", "not"]]},
    "speak-english": {"end": "?", "t": [["আপনি", "apni", "you"], ["কি", "ki", "@question"], ["ইংরেজি", "ingreji", "english"], ["বলেন", "bolen", "speak"]]},
    "love-you": {"end": "।", "t": [["আমি", "ami", "i"], ["তোমাকে", "tomake", "you"], ["ভালোবাসি", "bhalobashi", "love"]]},
    "my-friend": {"end": "।", "t": [["সে", "she", "he"], ["আমার", "amar", "i"], ["বন্ধু", "bondhu", "friend"]]},
    "who-is-he": {"end": "?", "t": [["সে", "she", "he"], ["কে", "ke", "who"]]},
    "where-live": {"end": "?", "t": [["আপনি", "apni", "you"], ["কোথায়", "kothay", "where"], ["থাকেন", "thaken", "live"]]},
    "this-is-book": {"end": "।", "t": [["এটা", "eta", "this"], ["বই", "boi", "book"]]},
    "this-is-my-book": {"end": "।", "t": [["এটা", "eta", "this"], ["আমার", "amar", "i"], ["বই", "boi", "book"]]},
    "drink-water": {"end": "।", "t": [["আমি", "ami", "i"], ["জল", "jol", "water"], ["খাই", "khai", "drink"]]},
    "drink-tea": {"end": "।", "t": [["আমি", "ami", "i"], ["চা", "cha", "tea"], ["খাই", "khai", "drink"]]},
    "read-book": {"end": "।", "t": [["আমি", "ami", "i"], ["বই", "boi", "book"], ["পড়ি", "pori", "read"]]},
    "eat-rice": {"end": "।", "t": [["আমরা", "amra", "we"], ["ভাত", "bhat", "rice"], ["খাই", "khai", "eat"]]},
    "hot-today": {"end": "।", "t": [["আজ", "aj", "today"], ["গরম", "gorom", "hot"]]},
    "cold-today": {"end": "।", "t": [["আজ", "aj", "today"], ["ঠান্ডা", "thanda", "cold"]]},
    "have-cat": {"end": "।", "t": [["আমার", "amar", "i"], ["একটা", "ekta", "@one"], ["বিড়াল", "biral", "cat"], ["আছে", "achhe", "have"]]},
    "no-time": {"end": "।", "t": [["সময়", "somoy", "time"], ["নেই", "nei", "none"]]},
    "house-big": {"end": "।", "t": [["বাড়ি", "bari", "house"], ["বড়", "boro", "big"]]},
    "car-new": {"end": "।", "t": [["গাড়ি", "gari", "car"], ["নতুন", "notun", "new"]]},
    "delicious": {"end": "।", "t": [["সুস্বাদু", "susbadu", "delicious"]]},
    "food-tasty": {"end": "।", "t": [["খাবার", "khabar", "food"], ["খুব", "khub", "very"], ["সুস্বাদু", "susbadu", "delicious"]]},
    "give-water": {"end": "।", "t": [["দয়া করে", "doya kore", "please"], ["আমাকে", "amake", "i"], ["জল", "jol", "water"], ["দিন", "din", "give"]]},
    "where-station": {"end": "?", "t": [["স্টেশন", "steshon", "station"], ["কোথায়", "kothay", "where"]]},
    "where-toilet": {"end": "?", "t": [["বাথরুম", "bathrum", "toilet"], ["কোথায়", "kothay", "where"]]},
    "where-hotel": {"end": "?", "t": [["হোটেল", "hotel", "hotel"], ["কোথায়", "kothay", "where"]]},
    "how-much-this": {"end": "?", "t": [["এটা", "eta", "this"], ["কত", "koto", "how-much"]]},
    "go-school": {"end": "।", "t": [["আমি", "ami", "i"], ["স্কুল", "skul", "school"], ["-ে", "e", "@direction"], ["যাই", "jai", "go"]]},
    "going-home": {"end": "।", "t": [["আমি", "ami", "i"], ["বাড়ি", "bari", "home"], ["যাই", "jai", "go"]]},
    "we-going-home": {"end": "।", "t": [["আমরা", "amra", "we"], ["বাড়ি", "bari", "home"], ["যাই", "jai", "go"]]},
    "where-going": {"end": "?", "t": [["তুমি", "tumi", "you"], ["কোথায়", "kothay", "where"], ["যাচ্ছ", "jachchho", "go"]]},
  },
};
