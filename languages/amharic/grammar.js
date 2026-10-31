// Amharic first grammar for the Grammar Learner. Written for this project.
// Examples are [Amharic, romanization, English]; {braces} mark the point of the lesson.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.amharic = {
  title: "Amharic first grammar",
  intro: "Amharic is the working language of Ethiopia and a Semitic language, a cousin of Arabic and Hebrew. The verb comes last, “you” has separate forms for a man and a woman, and small endings on nouns and verbs carry a lot of meaning. These lessons cover pronouns and “to be”, “my” and “your” endings, having and not having, questions, small words for place, and verbs in the present and past. The romanization is a simple guide: e is the short vowel of “the”, and gn is the ny sound of “canyon”.",
  lessons: [
    {
      id: "to-be",
      title: "Pronouns and “to be”",
      particle: "ነኝ ነህ ነው",
      summary: "The pronouns, and the form of “is” that matches each one.",
      sections: [
        {
          p: "<b>እኔ</b> (ine) I, <b>አንተ</b> (ante) you (to a man), <b>አንቺ</b> (anchi) you (to a woman), <b>እሱ</b> (issu) he, <b>እሷ</b> (isswa) she, <b>እኛ</b> (igna) we, <b>እነሱ</b> (inessu) they. <b>እርስዎ</b> (irswo) is a respectful “you”. “Is” comes last and changes with the person: <b>ነኝ</b> I am, <b>ነህ</b> / <b>ነሽ</b> you are, <b>ነው</b> he is, <b>ናት</b> she is, <b>ነን</b> we are, <b>ናቸው</b> they are.",
          examples: [
            ["እኔ ተማሪ {ነኝ}።", "Ine temari negn.", "I am a student."],
            ["አንተ ኢትዮጵያዊ {ነህ}?", "Ante ityopyawi neh?", "Are you Ethiopian? (to a man)"],
            ["እሷ ዶክተር {ናት}።", "Isswa doktor nat.", "She is a doctor."],
            ["እነሱ ጓደኞቼ {ናቸው}።", "Inessu gwadegnoche nachew.", "They are my friends."],
          ],
        },
      ],
      drills: [
        { q: "እኔ ተማሪ ＿።", en: "I am a student.", options: ["ነኝ", "ነህ", "ነው", "ናት"], answer: "ነኝ", why: "With እኔ (I): ነኝ." },
        { q: "እሷ ዶክተር ＿።", en: "She is a doctor.", options: ["ናት", "ነው", "ነኝ", "ነን"], answer: "ናት", why: "With እሷ (she): ናት." },
        { q: "እሱ ኢትዮጵያዊ ＿።", en: "He is Ethiopian.", options: ["ነው", "ናት", "ነህ", "ናቸው"], answer: "ነው", why: "With እሱ (he): ነው." },
        { q: "እኛ ተማሪዎች ＿።", en: "We are students.", options: ["ነን", "ነኝ", "ናቸው", "ነሽ"], answer: "ነን", why: "With እኛ (we): ነን." },
        { q: "＿ ተማሪ ነህ?", en: "Are you a student? (to a man)", options: ["አንተ", "አንቺ", "እሱ", "እኔ"], answer: "አንተ", why: "አንተ is “you” to a man, and goes with ነህ." },
      ],
    },
    {
      id: "possessives",
      title: "My, your, his: endings",
      particle: "-ኤ -ህ -ሽ -ኡ",
      summary: "“My”, “your” and “his” are endings on the noun.",
      sections: [
        {
          p: "Possession is an ending: ቤት (bet) house → <b>ቤቴ</b> (bete) my house, <b>ቤትህ</b> (betih) your house (man), <b>ቤትሽ</b> (betish) your house (woman), <b>ቤቱ</b> (betu) his house, <b>ቤቷ</b> (betwa) her house, <b>ቤታችን</b> (betachin) our house. The ending -ኡ (-u) also means “the”: ቤቱ can be “the house”.",
          examples: [
            ["{ስሜ} ዮናስ ነው።", "Sime Yonas new.", "My name is Yonas."],
            ["{ስምህ} ማን ነው?", "Simih man new?", "What is your name? (to a man)"],
            ["{ስምሽ} ማን ነው?", "Simish man new?", "What is your name? (to a woman)"],
            ["ይህ {ቤታችን} ነው።", "Yih betachin new.", "This is our house."],
          ],
        },
      ],
      drills: [
        { q: "＿ ዮናስ ነው።", en: "My name is Yonas.", options: ["ስሜ", "ስምህ", "ስሙ", "ስሟ"], answer: "ስሜ", why: "-ኤ (-e) = my: ስም → ስሜ." },
        { q: "＿ ማን ነው?", en: "What is your name? (to a woman)", options: ["ስምሽ", "ስምህ", "ስሜ", "ስሙ"], answer: "ስምሽ", why: "-ሽ (-ish) = your, to a woman." },
        { q: "ይህ ＿ ነው።", en: "This is my house.", options: ["ቤቴ", "ቤቱ", "ቤትህ", "ቤታችን"], answer: "ቤቴ", why: "ቤት + -ኤ = ቤቴ, my house." },
        { q: "＿ ትልቅ ነው።", en: "His house is big.", options: ["ቤቱ", "ቤቴ", "ቤቷ", "ቤትሽ"], answer: "ቤቱ", why: "-ኡ (-u) = his (and also “the”)." },
        { q: "ይህ ＿ ነው።", en: "This is our house.", options: ["ቤታችን", "ቤቴ", "ቤትህ", "ቤቷ"], answer: "ቤታችን", why: "-አችን (-achin) = our." },
      ],
    },
    {
      id: "have-not",
      title: "Having, and saying no",
      particle: "አለ የለም አይደለም",
      summary: "አለ there is, አለኝ I have; የለም there isn't; አይደለም is not.",
      sections: [
        {
          p: "<b>አለ</b> (alle) means “there is”. With an ending it means “have”: <b>አለኝ</b> (allegn) I have, <b>አለህ</b> (alleh) you have (man), <b>አለው</b> (allew) he has, <b>አላት</b> (allat) she has. The negative is <b>የለም</b> (yellem) “there isn't”, and <b>የለኝም</b> (yellegnim) “I don't have”.",
          examples: [
            ["ቡና {አለ}?", "Buna alle?", "Is there any coffee?"],
            ["እኔ መኪና {አለኝ}።", "Ine mekina allegn.", "I have a car."],
            ["ገንዘብ {የለኝም}።", "Genzeb yellegnim.", "I have no money."],
          ],
        },
        {
          h: "“Is not”",
          p: "The negative of ነው is <b>አይደለም</b> (aydellem): “he / it is not”. “I am not” is <b>አይደለሁም</b> (aydellehum), and “she is not” <b>አይደለችም</b> (aydellechim).",
          examples: [
            ["እሱ ዶክተር {አይደለም}።", "Issu doktor aydellem.", "He isn't a doctor."],
            ["እኔ ቱሪስት {አይደለሁም}።", "Ine turist aydellehum.", "I'm not a tourist."],
          ],
        },
      ],
      drills: [
        { q: "ቡና ＿?", en: "Is there any coffee?", options: ["አለ", "የለም", "ነኝ", "አይደለም"], answer: "አለ", why: "አለ = there is." },
        { q: "ይቅርታ፣ ቡና ＿።", en: "Sorry, there's no coffee.", options: ["የለም", "አለ", "አይደለም", "ነው"], answer: "የለም", why: "የለም = there isn't." },
        { q: "እኔ መኪና ＿።", en: "I have a car.", options: ["አለኝ", "አለው", "አላት", "የለም"], answer: "አለኝ", why: "አለ + -ኝ (me) = I have." },
        { q: "ገንዘብ ＿።", en: "I have no money.", options: ["የለኝም", "አለኝ", "አይደለሁም", "ነኝ"], answer: "የለኝም", why: "የለኝም = I don't have." },
        { q: "እሱ ዶክተር ＿።", en: "He isn't a doctor.", options: ["አይደለም", "የለም", "አይደለሁም", "ነው"], answer: "አይደለም", why: "The negative of ነው is አይደለም." },
      ],
    },
    {
      id: "questions",
      title: "Asking questions",
      particle: "ምን ማን የት ስንት",
      summary: "Question words go before the verb; a yes/no question just rises in tone.",
      sections: [
        {
          p: "A yes/no question uses the normal word order with a rising voice. Question words come just before the verb: <b>ምን</b> (min) what, <b>ማን</b> (man) who, <b>የት</b> (yet) where, <b>መቼ</b> (meche) when, <b>ለምን</b> (lemin) why, <b>እንዴት</b> (indet) how, <b>ስንት</b> (sint) how many, how much. A name is asked with ማን: “who is your name?”",
          examples: [
            ["ይህ {ምን} ነው?", "Yih min new?", "What is this?"],
            ["ሆቴሉ {የት} ነው?", "Hotelu yet new?", "Where is the hotel?"],
            ["ዋጋው {ስንት} ነው?", "Wagaw sint new?", "How much is it?"],
            ["{እንዴት} ነሽ?", "Indet nesh?", "How are you? (to a woman)"],
          ],
        },
      ],
      drills: [
        { q: "ስምህ ＿ ነው?", en: "What is your name?", options: ["ማን", "ምን", "የት", "ስንት"], answer: "ማን", why: "Amharic asks a name with ማን, “who”." },
        { q: "ይህ ＿ ነው?", en: "What is this?", options: ["ምን", "ማን", "መቼ", "የት"], answer: "ምን", why: "ምን = what." },
        { q: "ሆቴሉ ＿ ነው?", en: "Where is the hotel?", options: ["የት", "ምን", "ስንት", "ለምን"], answer: "የት", why: "የት = where." },
        { q: "ዋጋው ＿ ነው?", en: "How much is it?", options: ["ስንት", "ማን", "የት", "እንዴት"], answer: "ስንት", why: "ስንት = how much, how many." },
        { q: "＿ ነህ?", en: "How are you? (to a man)", options: ["እንዴት", "የት", "ማን", "መቼ"], answer: "እንዴት", why: "እንዴት = how." },
      ],
    },
    {
      id: "place-plural",
      title: "From, in, to; and plurals",
      particle: "ከ- በ- ለ- ወደ -ኦች",
      summary: "Short prefixes for place, and -ኦች for the plural.",
      sections: [
        {
          p: "Several small words are written joined to the front of the noun: <b>ከ-</b> (ke-) from, <b>በ-</b> (be-) in, at, by, <b>ለ-</b> (le-) for, to (a person). <b>ወደ</b> (wede) “towards” is a separate word.",
          examples: [
            ["{ከ}አዲስ አበባ ነኝ።", "Ke-Addis Abeba negn.", "I'm from Addis Ababa."],
            ["{በ}ቤት ነኝ።", "Be-bet negn.", "I'm at home."],
            ["{ወደ} ገበያ እሄዳለሁ።", "Wede gebeya ihedallehu.", "I'm going to the market."],
            ["ይህ {ለ}እናቴ ነው።", "Yih le-inate new.", "This is for my mother."],
          ],
        },
        {
          h: "Plurals",
          p: "Most nouns add <b>-ኦች</b> (-och): ቤት → <b>ቤቶች</b> (betoch) houses, መኪና → <b>መኪናዎች</b> (mekinawoch) cars. After a number the plural is often left out: ሁለት ቤት, two houses.",
          examples: [
            ["ብዙ {ቤቶች}", "bizu betoch", "many houses"],
          ],
        },
      ],
      drills: [
        { q: "＿አዲስ አበባ ነኝ።", en: "I'm from Addis Ababa.", options: ["ከ", "በ", "ለ", "ወደ"], answer: "ከ", why: "ከ- = from." },
        { q: "ነገ ＿ ገበያ እሄዳለሁ።", en: "Tomorrow I'll go to the market.", options: ["ወደ", "ከ", "በ", "ለ"], answer: "ወደ", why: "ወደ = to, towards." },
        { q: "＿ቤት ነኝ።", en: "I'm at home.", options: ["በ", "ከ", "ወደ", "ለ"], answer: "በ", why: "በ- = in, at." },
        { q: "ይህ ስጦታ ＿እናቴ ነው።", en: "This gift is for my mother.", options: ["ለ", "ከ", "በ", "ወደ"], answer: "ለ", why: "ለ- = for." },
        { q: "ብዙ ＿", en: "many houses", options: ["ቤቶች", "ቤቱ", "ቤቴ", "ቤትህ"], answer: "ቤቶች", why: "-ኦች makes the plural." },
      ],
    },
    {
      id: "verbs",
      title: "Verbs: present and past",
      particle: "እ-…-አለሁ ይ-…-አል -ኩ",
      summary: "The present has a prefix and an ending; the past has only an ending.",
      sections: [
        {
          p: "The present (also used for the future) wraps the verb: <b>እ</b>ሄድ<b>አለሁ</b> → <b>እሄዳለሁ</b> (ihedallehu) I go, <b>ትሄዳለህ</b> (tihedalleh) you go (man), <b>ይሄዳል</b> (yihedal) he goes, <b>ትሄዳለች</b> (tihedallech) she goes, <b>እንሄዳለን</b> (inhedallen) we go.",
          examples: [
            ["ነገ ወደ ጎንደር {እሄዳለሁ}።", "Nege wede Gonder ihedallehu.", "I'll go to Gondar tomorrow."],
            ["እሱ ቡና {ይጠጣል}።", "Issu buna yitetal.", "He drinks coffee."],
            ["እሷ አማርኛ {ትናገራለች}።", "Isswa amarigna tinageralech.", "She speaks Amharic."],
          ],
        },
        {
          h: "The past",
          p: "The past adds an ending only: <b>ሄድኩ</b> (hedku) I went, <b>ሄድክ</b> (hedk) you went (man), <b>ሄደ</b> (hede) he went, <b>ሄደች</b> (hedech) she went, <b>ሄድን</b> (hedin) we went.",
          examples: [
            ["ትናንት ወደ ገበያ {ሄድኩ}።", "Tinant wede gebeya hedku.", "I went to the market yesterday."],
            ["እሱ ትናንት {መጣ}።", "Issu tinant meta.", "He came yesterday."],
          ],
        },
      ],
      drills: [
        { q: "እኔ ነገ ወደ ጎንደር ＿።", en: "I'll go to Gondar tomorrow.", options: ["እሄዳለሁ", "ይሄዳል", "ትሄዳለች", "ሄድኩ"], answer: "እሄዳለሁ", why: "I, present or future: እ-…-አለሁ." },
        { q: "እሱ ቡና ＿።", en: "He drinks coffee.", options: ["ይጠጣል", "እጠጣለሁ", "ትጠጣለች", "ጠጣሁ"], answer: "ይጠጣል", why: "He, present: ይ-…-አል." },
        { q: "እሷ አማርኛ ＿።", en: "She speaks Amharic.", options: ["ትናገራለች", "ይናገራል", "እናገራለሁ", "ተናገረች"], answer: "ትናገራለች", why: "She, present: ት-…-አለች." },
        { q: "ትናንት ወደ ገበያ ＿።", en: "I went to the market yesterday.", options: ["ሄድኩ", "እሄዳለሁ", "ሄደ", "ይሄዳል"], answer: "ሄድኩ", why: "I, past: -ኩ." },
        { q: "እሱ ትናንት ＿።", en: "He came yesterday.", options: ["መጣ", "መጣሁ", "ይመጣል", "መጣች"], answer: "መጣ", why: "He, past: the bare stem, መጣ." },
      ],
    },
  ],
};
