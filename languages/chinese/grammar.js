// Mandarin Chinese first grammar for the Grammar Learner. Written for this project.
// Examples are [characters, pinyin, English]; {braces} mark the point of the lesson.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.chinese = {
  title: "Mandarin first grammar",
  intro: "Chinese words never change their form: there are no endings for tense, number or gender. Meaning is carried by word order and by a handful of small words. These lessons cover the ones you need for your first sentences: 是, 很 with adjectives, the two negatives 不 and 没, questions with 吗, 的, and measure words.",
  lessons: [
    {
      id: "shi",
      title: "是 — “to be” between nouns",
      particle: "是",
      summary: "A is B, when B is a noun.",
      sections: [
        {
          p: "<b>是</b> (shì) links two nouns: “I am a student”, “this is tea”. It never changes: 我是, 你是, 他是 are all just 是. Chinese has no “a” or “the”.",
          examples: [
            ["我{是}学生。", "Wǒ shì xuésheng.", "I am a student."],
            ["他{是}老师。", "Tā shì lǎoshī.", "He is a teacher."],
            ["这{是}茶。", "Zhè shì chá.", "This is tea."],
          ],
        },
        {
          h: "Not with adjectives",
          p: "是 is only for nouns. “I am tired” or “she is tall” do not use 是; the next lesson shows how they work.",
          examples: [["我{是}中国人。", "Wǒ shì Zhōngguó rén.", "I am Chinese."]],
        },
      ],
      drills: [
        { q: "我＿医生。", en: "I am a doctor.", options: ["是", "很", "的", "有"], answer: "是", why: "医生 (doctor) is a noun, so it is linked with 是." },
        { q: "她＿我的朋友。", en: "She is my friend.", options: ["是", "很", "吗", "不"], answer: "是", why: "朋友 is a noun: 是." },
        { q: "How do you say “they are teachers”?", en: "他们 = they", options: ["他们是老师。", "他们是老师们是。", "他们老师是。", "是他们老师。"], answer: "他们是老师。", why: "Subject + 是 + noun. 是 never changes." },
        { q: "What does 这是水 mean?", en: "水 = water", options: ["This is water.", "This water.", "Is this water?", "Water is here."], answer: "This is water.", why: "这 (this) + 是 (is) + 水 (water)." },
        { q: "Which sentence is wrong?", en: "", options: ["我是累。", "我是美国人。", "这是书。", "他是哥哥。"], answer: "我是累。", why: "累 (tired) is an adjective, so 是 is not used: 我很累." },
      ],
    },
    {
      id: "hen",
      title: "很 — adjectives without “is”",
      particle: "很",
      summary: "Adjectives act like verbs; 很 fills the gap.",
      sections: [
        {
          p: "An adjective follows the subject directly, with no 是. In a plain statement Chinese puts <b>很</b> (hěn) in front of it. 很 literally means “very”, but here it is so weak that 我很好 is just “I'm fine”.",
          examples: [
            ["我{很}好。", "Wǒ hěn hǎo.", "I'm well."],
            ["今天{很}冷。", "Jīntiān hěn lěng.", "It's cold today."],
            ["这个{很}贵。", "Zhège hěn guì.", "This one is expensive."],
          ],
        },
        {
          h: "Stronger than 很",
          p: "For a real “very”, use 非常 (fēicháng) or 太…了 (tài…le, “too”, often just “so”).",
          examples: [
            ["汉语{非常}有意思。", "Hànyǔ fēicháng yǒuyìsi.", "Chinese is really interesting."],
            ["{太}好{了}！", "Tài hǎo le!", "Great!"],
          ],
        },
      ],
      drills: [
        { q: "她＿高。", en: "She is tall.", options: ["很", "是", "的", "吗"], answer: "很", why: "高 (tall) is an adjective: subject + 很 + adjective, no 是." },
        { q: "How do you say “I'm busy”?", en: "忙 = busy", options: ["我很忙。", "我是忙。", "我忙是。", "我的忙。"], answer: "我很忙。", why: "Adjectives take 很, not 是." },
        { q: "What does 天气很热 mean?", en: "天气 = weather, 热 = hot", options: ["The weather is hot.", "The weather is very, very hot.", "Is the weather hot?", "Hot weather."], answer: "The weather is hot.", why: "很 is the normal link with an adjective; it hardly adds “very”." },
        { q: "＿贵了！", en: "That's far too expensive!", options: ["太", "很", "是", "不"], answer: "太", why: "太…了 means “too…” or “so…”." },
        { q: "Which sentence is right?", en: "My room is small.", options: ["我的房间很小。", "我的房间是小。", "我的房间小是。", "我是房间小。"], answer: "我的房间很小。", why: "小 is an adjective, so 很 + 小." },
      ],
    },
    {
      id: "bu-mei",
      title: "不 and 没 — saying no",
      particle: "不・没",
      summary: "不 for now, habits and wishes; 没 for “have” and the past.",
      sections: [
        {
          p: "<b>不</b> (bù) goes before a verb or adjective to deny it in the present or future, or as a habit or choice.",
          examples: [
            ["我{不}是老师。", "Wǒ bú shì lǎoshī.", "I'm not a teacher."],
            ["我{不}喝咖啡。", "Wǒ bù hē kāfēi.", "I don't drink coffee."],
            ["今天{不}冷。", "Jīntiān bù lěng.", "It isn't cold today."],
          ],
        },
        {
          h: "没 for having and for the past",
          p: "<b>没</b> (méi) is the only negative of 有 (to have, there is): 没有. It also says something did not happen. 不 becomes bú before a fourth tone, as in 不是.",
          examples: [
            ["我{没}有钱。", "Wǒ méiyǒu qián.", "I have no money."],
            ["他昨天{没}来。", "Tā zuótiān méi lái.", "He didn't come yesterday."],
          ],
        },
      ],
      drills: [
        { q: "我＿有时间。", en: "I don't have time.", options: ["没", "不", "很", "是"], answer: "没", why: "有 is always denied with 没: 没有." },
        { q: "她＿吃肉。", en: "She doesn't eat meat. (ever)", options: ["不", "没", "很", "吗"], answer: "不", why: "A habit or choice: 不." },
        { q: "我昨天＿去。", en: "I didn't go yesterday.", options: ["没", "不", "是", "很"], answer: "没", why: "Something that did not happen in the past: 没." },
        { q: "这＿是我的。", en: "This isn't mine.", options: ["不", "没", "很", "的"], answer: "不", why: "是 is denied with 不 (said bú before the fourth tone of shì)." },
        { q: "我明天＿去。", en: "I won't go tomorrow.", options: ["不", "没", "了", "很"], answer: "不", why: "The future, or a decision: 不." },
        { q: "How is 不 said in 不是?", en: "", options: ["bú", "bù", "bǔ", "bū"], answer: "bú", why: "Before a fourth tone (shì), 不 changes to the second tone." },
      ],
    },
    {
      id: "ma",
      title: "吗 — yes/no questions",
      particle: "吗",
      summary: "Add 吗 to the end of a statement.",
      sections: [
        {
          p: "To make a yes/no question, put <b>吗</b> (ma) at the end of the statement. Nothing else moves. Answer by repeating the verb, or its negative: 是 / 不是, 有 / 没有.",
          examples: [
            ["你是学生{吗}？", "Nǐ shì xuésheng ma?", "Are you a student?"],
            ["你喜欢茶{吗}？", "Nǐ xǐhuan chá ma?", "Do you like tea?"],
            ["你有哥哥{吗}？", "Nǐ yǒu gēge ma?", "Do you have an older brother?"],
          ],
        },
        {
          h: "Question words stay in place",
          p: "With 什么 (what), 谁 (who), 哪儿 (where), the question word sits where the answer would go, and 吗 is not used.",
          examples: [
            ["你叫{什么}名字？", "Nǐ jiào shénme míngzi?", "What's your name?"],
            ["厕所在{哪儿}？", "Cèsuǒ zài nǎr?", "Where is the toilet?"],
          ],
        },
      ],
      drills: [
        { q: "你忙＿？", en: "Are you busy?", options: ["吗", "的", "很", "不"], answer: "吗", why: "A yes/no question ends in 吗." },
        { q: "How do you ask “Is he Chinese?”", en: "", options: ["他是中国人吗？", "吗他是中国人？", "他吗是中国人？", "他是吗中国人？"], answer: "他是中国人吗？", why: "吗 goes at the very end; the rest stays as a statement." },
        { q: "你喜欢咖啡吗？ — Yes.", en: "Do you like coffee?", options: ["喜欢。", "是。", "吗。", "很。"], answer: "喜欢。", why: "Answer “yes” by repeating the verb." },
        { q: "Which question is wrong?", en: "", options: ["你叫什么名字吗？", "你叫什么名字？", "你是老师吗？", "他在哪儿？"], answer: "你叫什么名字吗？", why: "With a question word like 什么, 吗 is left out." },
        { q: "你有车吗？ — No.", en: "Do you have a car?", options: ["没有。", "不有。", "不是。", "没是。"], answer: "没有。", why: "有 is denied with 没: 没有." },
      ],
    },
    {
      id: "de",
      title: "的 — of, ’s and describing",
      particle: "的",
      summary: "The describer comes first, then 的, then the thing.",
      sections: [
        {
          p: "<b>的</b> (de) joins a describer to a noun, the describer first: 我的书 “my book”, 老师的车 “the teacher's car”. It works like English ’s, but for everything.",
          examples: [
            ["我{的}书", "wǒ de shū", "my book"],
            ["妈妈{的}手机", "māma de shǒujī", "Mum's phone"],
            ["很贵{的}衣服", "hěn guì de yīfu", "very expensive clothes"],
          ],
        },
        {
          h: "When 的 is left out",
          p: "With close family, and in fixed pairs, 的 is usually dropped: 我妈妈 (my mum), 中国人 (a Chinese person).",
          examples: [
            ["我妈妈", "wǒ māma", "my mum"],
            ["这本书是{我的}。", "Zhè běn shū shì wǒ de.", "This book is mine."],
          ],
        },
      ],
      drills: [
        { q: "这是你＿茶。", en: "This is your tea.", options: ["的", "吗", "很", "是"], answer: "的", why: "你 + 的 + 茶: your tea." },
        { q: "How do you say “my friend's house”?", en: "朋友 = friend, 家 = home", options: ["我朋友的家", "家的我朋友", "我的家朋友", "朋友我的家"], answer: "我朋友的家", why: "The owner comes first, then 的, then the thing." },
        { q: "What does 这是他的 mean?", en: "", options: ["This is his.", "This is him.", "Is this his?", "He has this."], answer: "This is his.", why: "他的 alone means “his”." },
        { q: "Which is the most natural way to say “my dad”?", en: "爸爸 = dad", options: ["我爸爸", "爸爸我", "爸爸的我", "我是爸爸"], answer: "我爸爸", why: "With close family, 的 is usually dropped." },
        { q: "红色＿车", en: "a red car", options: ["的", "吗", "了", "不"], answer: "的", why: "A describer + 的 + noun." },
      ],
    },
    {
      id: "measure",
      title: "Measure words",
      particle: "个 本 杯",
      summary: "Between a number and a noun there is always a measure word.",
      sections: [
        {
          p: "You cannot say “three books” directly. A <b>measure word</b> goes between the number (or 这 this, 那 that) and the noun. <b>个</b> (gè) is the general one and is always understood.",
          examples: [
            ["一{个}人", "yí ge rén", "one person"],
            ["三{本}书", "sān běn shū", "three books"],
            ["两{杯}咖啡", "liǎng bēi kāfēi", "two cups of coffee"],
            ["这{个}", "zhège", "this one"],
          ],
        },
        {
          h: "Two is 两",
          p: "Before a measure word, “two” is <b>两</b> (liǎng), not 二. Other common measure words: 张 (zhāng) for flat things, 只 (zhī) for many animals, 件 (jiàn) for clothes and matters.",
          examples: [
            ["{两}张票", "liǎng zhāng piào", "two tickets"],
            ["一{只}猫", "yì zhī māo", "a cat"],
          ],
        },
      ],
      drills: [
        { q: "我有三＿朋友。", en: "I have three friends.", options: ["个", "本", "杯", "的"], answer: "个", why: "个 is the measure word for people (and the general one)." },
        { q: "一＿书", en: "one book", options: ["本", "杯", "张", "只"], answer: "本", why: "本 is for books and bound things." },
        { q: "＿杯茶", en: "two cups of tea", options: ["两", "二", "二个", "两个"], answer: "两", why: "Before a measure word, two is 两." },
        { q: "How do you say “this person”?", en: "", options: ["这个人", "这人个", "个这人", "这的人"], answer: "这个人", why: "这 + measure word + noun." },
        { q: "一＿票", en: "one ticket", options: ["张", "本", "只", "杯"], answer: "张", why: "张 is for flat things: tickets, paper, tables." },
        { q: "Which is wrong?", en: "", options: ["三书", "三本书", "三个人", "一杯水"], answer: "三书", why: "A number cannot go straight onto a noun: 三本书." },
      ],
    },
  ],
};
