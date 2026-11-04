// Generated from squirrel-lang-data bd56e84 languages/inuktitut/vocab.jsonl by: python3 data/tools/gen_vocab.py --out languages
// Each word is [Inuktitut syllabics, romanization, English, note]. Written for
// this project. Inuktitut builds long words from a root and many endings, so
// these decks keep to words and set phrases. Romanization follows the Inuit
// Cultural Institute (ICI) standard used in Nunavut materials. Verb cards use a
// common third-person form (“he/she …”) as the citation shape unless noted.
// Sources (attested forms only; leave out if unsure): - Existing Desk Inuktitut
// decks in this file - Inuktut Tusaalanga (Pirurvik / tusaalanga.ca) glossary
// and lessons (South Qikiqtaaluk learner forms; e.g. colours, body, verbs,
// family, clothing, land and weather) - Inuit Uqausinginnik Taiguusiliuqtiit
// materials and Inuktut learner word lists - Wiktionary Inuktitut lemmas /
// Appendix:Eskimo-Aleut basic vocabulary (CC BY-SA) - This repo’s
// languages/inuktitut/reference.json (numbers, greetings, place names)
window.LSD_DECKS = window.LSD_DECKS || {};
window.LSD_DECKS.inuktitut = [
  {
    "id": "greetings",
    "title": "Greetings",
    "words": [
      ["ᐊᐃ", "ai", "hello", ""],
      ["ᐅᓪᓛᒃᑯᑦ", "ullaakkut", "good morning", ""],
      ["ᐅᓐᓄᓴᒃᑯᑦ", "unnusakkut", "good afternoon; good evening", ""],
      ["ᖃᓄᐃᑉᐱᑦ?", "qanuippit?", "how are you?", ""],
      ["ᖃᓄᐃᙱᑦᑐᖓ", "qanuinngittunga", "I'm fine", "Literally “I am not anyhow”."],
      ["ᖁᔭᓐᓇᒦᒃ", "qujannamiik", "thank you", ""],
      ["ᐄ", "ii", "yes", ""],
      ["ᐋᒃᑲ", "aakka", "no", ""],
      ["ᐊᑎᕋ …", "atira …", "my name is …", ""],
      ["ᑕᕝᕙᐅᕗᑎᑦ", "tavvauvutit", "goodbye (to one person)", ""],
      ["ᑐᙵᓱᒋᑦ", "tunngasugit", "welcome (to one person)", "Tusaalanga lesson 1. To more than two: ᑐᙵᓱᒋᑦᓯ, tunngasugitsi."],
      ["ᐃᓛᓕ", "ilaali", "you're welcome", "Tusaalanga glossary."],
      ["ᐅᓪᓗᖃᑦᓯᐊᕆᑦ", "ulluqatsiarit", "have a good day (to one person)", "Tusaalanga glossary."],
      ["ᑐᑭᓯᕕᑦ?", "tukisivit?", "do you understand?", "Tusaalanga glossary."]
    ]
  },
  {
    "id": "people",
    "title": "People",
    "words": [
      ["ᐃᓄᒃ", "inuk", "person", "Plural ᐃᓄᐃᑦ, Inuit: the people."],
      ["ᐊᓈᓇ", "anaana", "mother", ""],
      ["ᐊᑖᑕ", "ataata", "father", ""],
      ["ᓄᑕᕋᖅ", "nutaraq", "child", ""],
      ["ᐃᓄᑐᖃᖅ", "inutuqaq", "elder", ""],
      ["ᐊᖑᑦ", "angut", "man", ""],
      ["ᐊᕐᓇᖅ", "arnaq", "woman", ""],
      ["ᐅᕙᖓ", "uvanga", "I; me", "Tusaalanga glossary."],
      ["ᐃᕐᓂᖅ", "irniq", "son", "Tusaalanga / Wiktionary family terms."],
      ["ᐸᓂᒃ", "panik", "daughter", "Tusaalanga / Wiktionary family terms."],
      ["ᐊᓈᓇᑦᓯᐊᖅ", "anaanatsiaq", "grandmother", "Tusaalanga glossary."],
      ["ᐊᑖᑕᑦᓯᐊᖅ", "ataatatsiaq", "grandfather", "Tusaalanga glossary."],
      ["ᓄᓕᐊᖅ", "nuliaq", "wife", "Tusaalanga glossary."],
      ["ᐊᓂᒃ", "anik", "brother (of a female)", "Tusaalanga glossary."],
      ["ᓇᔭᒃ", "najak", "sister (of a male)", "Tusaalanga glossary."],
      ["ᓄᑲᖅ", "nukaq", "younger sibling (same sex)", "Tusaalanga glossary."],
      ["ᐱᖃᑎ", "piqati", "friend", "Tusaalanga glossary."]
    ]
  },
  {
    "id": "numbers",
    "title": "Numbers",
    "words": [
      ["ᐊᑕᐅᓯᖅ", "atausiq", "one", ""],
      ["ᒪᕐᕉᒃ", "marruuk", "two", ""],
      ["ᐱᖓᓱᑦ", "pingasut", "three", ""],
      ["ᓯᑕᒪᑦ", "sitamat", "four", ""],
      ["ᑕᓪᓕᒪᑦ", "tallimat", "five", "Above five, many speakers use English numbers."],
      ["ᖁᓕᑦ", "qulit", "ten", ""],
      ["ᐱᖓᓲᔪᖅᑐᑦ", "pingasuujuqtut", "six", "South Qikiqtaaluk compound form (Tusaalanga)."],
      ["ᓯᑕᒪᐅᔪᙱᒐᖅᑐᑦ", "sitamaujunngigaqtut", "seven", "South Qikiqtaaluk compound form (Tusaalanga)."],
      ["ᓯᑕᒪᐅᔪᖅᑐᑦ", "sitamaujuqtut", "eight", "South Qikiqtaaluk compound form (Tusaalanga)."],
      ["ᖁᓕᐅᙱᒐᖅᑐᑦ", "quliunngigaqtut", "nine", "South Qikiqtaaluk compound form (Tusaalanga)."],
      ["ᐊᕙᑎᑦ", "avatit", "twenty", "Traditional base; Tusaalanga glossary."]
    ]
  },
  {
    "id": "land",
    "title": "Land, sea and sky",
    "words": [
      ["ᓄᓇ", "nuna", "land", "ᓄᓇᕗᑦ, Nunavut: “our land”."],
      ["ᐃᒪᖅ", "imaq", "sea; water", ""],
      ["ᐃᒥᖅ", "imiq", "drinking water", ""],
      ["ᓯᑯ", "siku", "sea ice", ""],
      ["ᐊᐳᑦ", "aput", "snow on the ground", ""],
      ["ᖃᓐᓂᖅ", "qanniq", "falling snow", ""],
      ["ᓯᕿᓂᖅ", "siqiniq", "sun", ""],
      ["ᑕᖅᑭᖅ", "taqqiq", "moon; month", ""],
      ["ᐅᐱᕐᖔᖅ", "upirngaaq", "spring", ""],
      ["ᐅᑭᐅᖅ", "ukiuq", "winter; year", ""],
      ["ᐊᐅᔭᖅ", "aujaq", "summer", "Tusaalanga glossary."],
      ["ᑰᒃ", "kuuk", "river", "Tusaalanga glossary."],
      ["ᑕᓯᖅ", "tasiq", "lake", "Tusaalanga glossary."],
      ["ᓯᓚ", "sila", "weather; outdoors; environment", "Tusaalanga glossary."],
      ["ᓄᕗᔭ", "nuvuja", "cloud", "Tusaalanga glossary."],
      ["ᓯᓚᓗᑦᑐᖅ", "silaluttuq", "it is raining", "Tusaalanga glossary."],
      ["ᓂᓪᓚᓱᒃᑐᖅ", "nillasuktuq", "it is cold (weather)", "Tusaalanga glossary."],
      ["ᓄᓇᕗᑦ", "nunavut", "Nunavut; our land", "Territory name; also “our land”."],
      ["ᐃᖃᓗᐃᑦ", "Iqaluit", "Iqaluit", "Capital of Nunavut; “many fish”."]
    ]
  },
  {
    "id": "animals",
    "title": "Animals and food",
    "words": [
      ["ᓇᓄᖅ", "nanuq", "polar bear", ""],
      ["ᑐᒃᑐ", "tuktu", "caribou", ""],
      ["ᓇᑦᑎᖅ", "nattiq", "ringed seal", ""],
      ["ᐃᖃᓗᒃ", "iqaluk", "fish; Arctic char", "ᐃᖃᓗᐃᑦ, Iqaluit: “many fish”."],
      ["ᕿᒻᒥᖅ", "qimmiq", "dog", ""],
      ["ᐊᕐᕕᖅ", "arviq", "bowhead whale", ""],
      ["ᓂᕿ", "niqi", "food; meat", ""],
      ["ᑏ", "tii", "tea", ""],
      ["ᐊᒪᕈᖅ", "amaruq", "wolf", "Tusaalanga glossary."],
      ["ᐊᐃᕕᖅ", "aiviq", "walrus", "Tusaalanga glossary."],
      ["ᐊᕿᒡᒋᖅ", "aqiggiq", "ptarmigan", "Tusaalanga glossary."],
      ["ᑎᕆᒐᓂᐊᖅ", "tiriganiaq", "Arctic fox", "Tusaalanga glossary."],
      ["ᐅᑲᓕᖅ", "ukaliq", "Arctic hare", "Tusaalanga glossary."],
      ["ᐊᕕᙵᖅ", "avinngaq", "lemming", "Tusaalanga glossary / Wiktionary."],
      ["ᐊᖅᐱᒃ", "aqpik", "cloudberry", "Tusaalanga glossary."]
    ]
  },
  {
    "id": "home-time",
    "title": "Home and time",
    "words": [
      ["ᐃᒡᓗ", "iglu", "house; any home", "Not only a snow house: that is ᐃᒡᓗᕕᒐᖅ, igluvigaq."],
      ["ᖃᒧᑏᒃ", "qamutiik", "sled", ""],
      ["ᖃᔭᖅ", "qajaq", "kayak", ""],
      ["ᐅᓪᓗᒥ", "ullumi", "today", ""],
      ["ᖃᐅᑉᐸᑦ", "qauppat", "tomorrow", ""],
      ["ᐃᑉᐸᒃᓴᖅ", "ippaksaq", "yesterday", ""],
      ["ᓱᓇ?", "suna?", "what?", ""],
      ["ᑭᓇ?", "kina?", "who?", ""],
      ["ᓇᐅᒃ?", "nauk?", "where?", ""],
      ["ᐃᒡᓗᕕᒐᖅ", "igluvigaq", "snowhouse; igloo", "Tusaalanga glossary; the snow house proper."],
      ["ᒪᑐ", "matu", "door", "Tusaalanga glossary."],
      ["ᐹ", "paa", "doorway; opening", "Tusaalanga glossary."],
      ["ᐃᒐᓛᖅ", "igalaaq", "window", "Tusaalanga glossary."],
      ["ᐅᓪᓗᖅ", "ulluq", "day", "Tusaalanga glossary."],
      ["ᓇᓂ?", "nani?", "where? (at / in)", "Locative question; Tusaalanga / IUT grammar materials."],
      ["ᓇᒧᑦ?", "namut?", "to where?", "Tusaalanga / IUT grammar materials."],
      ["ᓇᑭᑦ?", "nakit?", "from where?", "Tusaalanga glossary."]
    ]
  },
  {
    "id": "colours",
    "title": "Colours",
    "words": [
      ["ᐊᒥᐊᑦ", "amiat", "colours", "Tusaalanga glossary."],
      ["ᐊᐅᐸᖅᑐᖅ", "aupaqtuq", "red", "South Qikiqtaaluk (Tusaalanga); other dialects may say aupaluktuq."],
      ["ᖃᑯᖅᑕᖅ", "qakuqtaq", "white", "Tusaalanga glossary."],
      ["ᕿᕐᓂᖅᑕᖅ", "qirniqtaq", "black", "Tusaalanga glossary."],
      ["ᑐᖑᔪᖅᑕᖅ", "tungujuqtaq", "blue", "Tusaalanga glossary."],
      ["ᖁᖅᓱᖅᑕᖅ", "quqsuqtaq", "yellow", "Tusaalanga glossary."],
      ["ᐆᔭᐅᔭᖅ", "uujaujaq", "green", "Tusaalanga glossary."],
      ["ᑲᔪᖅ", "kajuq", "brown", "Tusaalanga glossary."]
    ]
  },
  {
    "id": "body",
    "title": "Body",
    "words": [
      ["ᓂᐊᖁᖅ", "niaquq", "head", "Tusaalanga glossary."],
      ["ᐊᒡᒐᑦ", "aggat", "hand", "Tusaalanga glossary."],
      ["ᑕᓕᖅ", "taliq", "arm", "Tusaalanga glossary."],
      ["ᕿᖓᖅ", "qingaq", "nose", "Tusaalanga glossary."],
      ["ᓄᔭᑦ", "nujat", "hair", "Tusaalanga glossary."],
      ["ᐆᒻᒪᑎ", "uummati", "heart", "Tusaalanga glossary."],
      ["ᑐᐃ", "tui", "shoulder", "Tusaalanga glossary."],
      ["ᓴᓂᕋᖅ", "saniraq", "side (of the body)", "Tusaalanga glossary."],
      ["ᐊᒡᒐᐅᑦ", "aggaut", "forearm", "Tusaalanga glossary."],
      ["ᐃᒡᒑᒃ", "iggaak", "eyeglasses", "Tusaalanga glossary."]
    ]
  },
  {
    "id": "verbs",
    "title": "Everyday verbs",
    "words": [
      ["ᓂᕆᔪᖅ", "nirijuq", "he/she is eating", "From niri-; Tusaalanga lesson 1."],
      ["ᐃᒥᖅᑐᖅ", "imiqtuq", "he/she is drinking", "Tusaalanga glossary."],
      ["ᓯᓂᑦᑐᖅ", "sinittuq", "he/she is sleeping", "Tusaalanga glossary."],
      ["ᐱᓱᑦᑐᖅ", "pisuttuq", "he/she is walking", "South Qikiqtaaluk (Tusaalanga); some dialects: pisuktuq."],
      ["ᐅᓪᓚᑦᑐᖅ", "ullattuq", "he/she is running", "Tusaalanga glossary."],
      ["ᑕᑯᔪᖅ", "takujuq", "he/she sees something", "Tusaalanga glossary."],
      ["ᑐᓴᖅᑐᖅ", "tusaqtuq", "he/she hears", "Tusaalanga glossary."],
      ["ᐃᖅᑲᓇᐃᔭᖅᑐᖅ", "iqqanaijaqtuq", "he/she is working", "Tusaalanga glossary."],
      ["ᐊᓂᔪᖅ", "anijuq", "he/she goes out; leaves", "Tusaalanga glossary / IUT grammar."],
      ["ᐊᐅᓪᓚᖅᑐᖅ", "aullaqtuq", "he/she departs; leaves town", "Tusaalanga glossary."],
      ["ᑐᑭᓯᔪᖅ", "tukisijuq", "he/she understands", "Tusaalanga glossary."],
      ["ᖃᐃᒋᑦ", "qaigit", "come! (to one person)", "Command; Tusaalanga glossary."],
      ["ᐱᙳᐊᖅᑐᖅ", "pinnguaqtuq", "he/she plays", "Tusaalanga glossary."],
      ["ᐅᖃᓕᒫᖅᑐᖅ", "uqalimaaqtuq", "he/she is reading", "Tusaalanga glossary."],
      ["ᖁᕕᐊᓱᑦᑐᖅ", "quviasuttuq", "he/she is happy", "Tusaalanga glossary."]
    ]
  },
  {
    "id": "clothing",
    "title": "Clothing and gear",
    "words": [
      ["ᑲᒦᒃ", "kamiik", "skin boots (pair)", "Dual; Tusaalanga glossary."],
      ["ᐊᒪᐅᑎ", "amauti", "parka with a child pouch", "Tusaalanga glossary."],
      ["ᐊᑎᒋ", "atigi", "caribou parka (fur inside)", "Tusaalanga glossary."],
      ["ᖃᕐᓖᒃ", "qarliik", "pants (pair)", "Dual; Tusaalanga glossary."],
      ["ᓇᓴᖅ", "nasaq", "hat", "Tusaalanga glossary."],
      ["ᑐᐱᖅ", "tupiq", "tent", "Tusaalanga glossary / lesson 1 root."],
      ["ᐅᒥᐊᖅ", "umiaq", "boat", "Stem in Tusaalanga umiaqtuqtuq “is boating”."],
      ["ᖁᓪᓕᖅ", "qulliq", "seal-oil lamp", "Tusaalanga glossary."],
      ["ᓴᕕᒃ", "savik", "knife", "Tusaalanga glossary."],
      ["ᐱᙳᐊᖅ", "pinnguaq", "toy; game", "Tusaalanga glossary."]
    ]
  },
  {
    "id": "describing",
    "title": "Describing words",
    "words": [
      ["ᐊᖏᔪᖅ", "angijuq", "it is big", "Tusaalanga glossary."],
      ["ᒥᑭᔪᖅ", "mikijuq", "it is small", "Tusaalanga glossary."],
      ["ᐊᑲᐅᔪᖅ", "akaujuq", "good; convenient", "Tusaalanga glossary."],
      ["ᐆᓇᖅᑐᖅ", "uunaqtuq", "hot (of a liquid)", "Tusaalanga glossary."],
      ["ᑖᖅᑐᖅ", "taaqtuq", "it is dark", "Tusaalanga glossary."],
      ["ᖃᐅᒪᔪᖅ", "qaumajuq", "it gives off light", "Tusaalanga glossary."],
      ["ᑕᖃᔪᖅ", "taqajuq", "he/she is tired", "Tusaalanga glossary."],
      ["ᐅᖁᒪᐃᑦᑐᖅ", "uqumaittuq", "it is heavy", "Tusaalanga glossary."]
    ]
  },
  {
    "id": "food",
    "title": "Food and drink",
    "words": [
      ["ᐃᒻᒧᒃ", "immuk", "milk", "Tusaalanga glossary."],
      ["ᐸᓚᐅᒑᖅ", "palaugaaq", "bannock", "Tusaalanga glossary."],
      ["ᓂᒃᑯ", "nikku", "dried meat", "Tusaalanga glossary."],
      ["ᒥᑭᒐᖅ", "mikigaq", "raw meat", "Tusaalanga glossary."],
      ["ᓇᓄᒥᓂᖅ", "nanuminiq", "polar bear meat", "Tusaalanga glossary."],
      ["ᑐᑦᑐᒥᓂᖅ", "tuttuminiq", "caribou meat", "Tusaalanga glossary."],
      ["ᓇᑦᓯᒥᓂᖅ", "natsiminiq", "ringed seal meat", "Tusaalanga glossary."],
      ["ᐃᒍᓇᖅ", "igunaq", "fermented walrus meat", "Tusaalanga glossary."]
    ]
  }
];
