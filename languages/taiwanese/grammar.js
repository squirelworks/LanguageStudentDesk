// Taiwan Mandarin (台灣華語) first grammar for the Grammar Learner. Written for this project.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.taiwanese = {
  "title": "Taiwan Mandarin first grammar",
  "intro": "Taiwan Mandarin (台灣華語) uses traditional characters and the same basic grammar as Mandarin, with local vocabulary such as 捷運 for the metro and 計程車 for taxis. Lessons 1–6 cover 是, 很 with adjectives, 不 and 沒, 嗎, 的, and measure words. Lessons 7–12 add 了, 在, 會・能・可以, 想・要, 過, and 比. Readings show Zhuyin (注音) and pinyin.",
  "lessons": [
    {
      "id": "shi",
      "title": "是 — “to be” between nouns",
      "particle": "是",
      "summary": "A is B, when B is a noun.",
      "sections": [
        {
          "p": "<b>是</b> (shì) links two nouns: “I am a student”, “this is tea”. It never changes: 我是, 你是, 他是 are all just 是. Chinese has no “a” or “the”.",
          "examples": [
            [
              "我{是}學生。",
              "ㄨㄛˇ ㄕˋ ㄒㄩㄝˊ ㄕㄥ˙. · Wǒ shì xuésheng.",
              "I am a student."
            ],
            [
              "他{是}老師。",
              "ㄊㄚ ㄕˋ ㄌㄠˇ ㄕ. · Tā shì lǎoshī.",
              "He is a teacher."
            ],
            [
              "這{是}茶。",
              "ㄓㄜˋ ㄕˋ ㄔㄚˊ. · Zhè shì chá.",
              "This is tea."
            ]
          ]
        },
        {
          "h": "Not with adjectives",
          "p": "是 is only for nouns. “I am tired” or “she is tall” do not use 是; the next lesson shows how they work.",
          "examples": [
            [
              "我{是}中國人。",
              "ㄨㄛˇ ㄕˋ ㄓㄨㄥ ㄍㄨㄛˊ ㄖㄣˊ. · Wǒ shì Zhōngguó rén.",
              "I am Chinese."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "我＿醫生。",
          "en": "I am a doctor.",
          "options": [
            "是",
            "很",
            "的",
            "有"
          ],
          "answer": "是",
          "why": "醫生 (doctor) is a noun, so it is linked with 是."
        },
        {
          "q": "她＿我的朋友。",
          "en": "She is my friend.",
          "options": [
            "是",
            "很",
            "嗎",
            "不"
          ],
          "answer": "是",
          "why": "朋友 is a noun: 是."
        },
        {
          "q": "How do you say “they are teachers”?",
          "en": "他們 = they",
          "options": [
            "他們是老師。",
            "他們是老師們是。",
            "他們老師是。",
            "是他們老師。"
          ],
          "answer": "他們是老師。",
          "why": "Subject + 是 + noun. 是 never changes."
        },
        {
          "q": "What does 這是水 mean?",
          "en": "水 = water",
          "options": [
            "This is water.",
            "This water.",
            "Is this water?",
            "Water is here."
          ],
          "answer": "This is water.",
          "why": "這 (this) + 是 (is) + 水 (water)."
        },
        {
          "q": "Which sentence is wrong?",
          "en": "",
          "options": [
            "我是累。",
            "我是美國人。",
            "這是書。",
            "他是哥哥。"
          ],
          "answer": "我是累。",
          "why": "累 (tired) is an adjective, so 是 is not used: 我很累."
        }
      ]
    },
    {
      "id": "hen",
      "title": "很 — adjectives without “is”",
      "particle": "很",
      "summary": "Adjectives act like verbs; 很 fills the gap.",
      "sections": [
        {
          "p": "An adjective follows the subject directly, with no 是. In a plain statement Chinese puts <b>很</b> (hěn) in front of it. 很 literally means “very”, but here it is so weak that 我很好 is just “I'm fine”.",
          "examples": [
            [
              "我{很}好。",
              "ㄨㄛˇ ㄏㄣˇ ㄏㄠˇ. · Wǒ hěn hǎo.",
              "I'm well."
            ],
            [
              "今天{很}冷。",
              "ㄐㄧㄣ ㄊㄧㄢ ㄏㄣˇ ㄌㄥˇ. · Jīntiān hěn lěng.",
              "It's cold today."
            ],
            [
              "這個{很}貴。",
              "ㄓㄜˋ ㄍㄜ˙ ㄏㄣˇ ㄍㄨㄟˋ. · Zhège hěn guì.",
              "This one is expensive."
            ]
          ]
        },
        {
          "h": "Stronger than 很",
          "p": "For a real “very”, use 非常 (fēicháng) or 太…了 (tài…le, “too”, often just “so”).",
          "examples": [
            [
              "漢語{非常}有意思。",
              "ㄏㄢˋ ㄩˇ ㄈㄟ ㄔㄤˊ ㄧㄡˇ ㄧˋ ㄙ˙. · Hànyǔ fēicháng yǒuyìsi.",
              "Chinese is really interesting."
            ],
            [
              "{太}好{了}！",
              "ㄊㄞˋ ㄏㄠˇ ㄌㄜ˙! · Tài hǎo le!",
              "Great!"
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "她＿高。",
          "en": "She is tall.",
          "options": [
            "很",
            "是",
            "的",
            "嗎"
          ],
          "answer": "很",
          "why": "高 (tall) is an adjective: subject + 很 + adjective, no 是."
        },
        {
          "q": "How do you say “I'm busy”?",
          "en": "忙 = busy",
          "options": [
            "我很忙。",
            "我是忙。",
            "我忙是。",
            "我的忙。"
          ],
          "answer": "我很忙。",
          "why": "Adjectives take 很, not 是."
        },
        {
          "q": "What does 天氣很熱 mean?",
          "en": "天氣 = weather, 熱 = hot",
          "options": [
            "The weather is hot.",
            "The weather is very, very hot.",
            "Is the weather hot?",
            "Hot weather."
          ],
          "answer": "The weather is hot.",
          "why": "很 is the normal link with an adjective; it hardly adds “very”."
        },
        {
          "q": "＿貴了！",
          "en": "That's far too expensive!",
          "options": [
            "太",
            "很",
            "是",
            "不"
          ],
          "answer": "太",
          "why": "太…了 means “too…” or “so…”."
        },
        {
          "q": "Which sentence is right?",
          "en": "My room is small.",
          "options": [
            "我的房間很小。",
            "我的房間是小。",
            "我的房間小是。",
            "我是房間小。"
          ],
          "answer": "我的房間很小。",
          "why": "小 is an adjective, so 很 + 小."
        }
      ]
    },
    {
      "id": "bu-mei",
      "title": "不 and 沒 — saying no",
      "particle": "不・沒",
      "summary": "不 for now, habits and wishes; 沒 for “have” and the past.",
      "sections": [
        {
          "p": "<b>不</b> (bù) goes before a verb or adjective to deny it in the present or future, or as a habit or choice.",
          "examples": [
            [
              "我{不}是老師。",
              "ㄨㄛˇ ㄅㄨˊ ㄕˋ ㄌㄠˇ ㄕ. · Wǒ bú shì lǎoshī.",
              "I'm not a teacher."
            ],
            [
              "我{不}喝咖啡。",
              "ㄨㄛˇ ㄅㄨˋ ㄏㄜ ㄎㄚ ㄈㄟ. · Wǒ bù hē kāfēi.",
              "I don't drink coffee."
            ],
            [
              "今天{不}冷。",
              "ㄐㄧㄣ ㄊㄧㄢ ㄅㄨˋ ㄌㄥˇ. · Jīntiān bù lěng.",
              "It isn't cold today."
            ]
          ]
        },
        {
          "h": "没 for having and for the past",
          "p": "<b>沒</b> (méi) is the only negative of 有 (to have, there is): 沒有. It also says something did not happen. 不 becomes bú before a fourth tone, as in 不是.",
          "examples": [
            [
              "我{沒}有錢。",
              "ㄨㄛˇ ㄇㄟˊ ㄧㄡˇ ㄑㄧㄢˊ. · Wǒ méiyǒu qián.",
              "I have no money."
            ],
            [
              "他昨天{沒}來。",
              "ㄊㄚ ㄗㄨㄛˊ ㄊㄧㄢ ㄇㄟˊ ㄌㄞˊ. · Tā zuótiān méi lái.",
              "He didn't come yesterday."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "我＿有時間。",
          "en": "I don't have time.",
          "options": [
            "沒",
            "不",
            "很",
            "是"
          ],
          "answer": "沒",
          "why": "有 is always denied with 沒: 沒有."
        },
        {
          "q": "她＿吃肉。",
          "en": "She doesn't eat meat. (ever)",
          "options": [
            "不",
            "沒",
            "很",
            "嗎"
          ],
          "answer": "不",
          "why": "A habit or choice: 不."
        },
        {
          "q": "我昨天＿去。",
          "en": "I didn't go yesterday.",
          "options": [
            "沒",
            "不",
            "是",
            "很"
          ],
          "answer": "沒",
          "why": "Something that did not happen in the past: 沒."
        },
        {
          "q": "這＿是我的。",
          "en": "This isn't mine.",
          "options": [
            "不",
            "沒",
            "很",
            "的"
          ],
          "answer": "不",
          "why": "是 is denied with 不 (said bú before the fourth tone of shì)."
        },
        {
          "q": "我明天＿去。",
          "en": "I won't go tomorrow.",
          "options": [
            "不",
            "沒",
            "了",
            "很"
          ],
          "answer": "不",
          "why": "The future, or a decision: 不."
        },
        {
          "q": "How is 不 said in 不是?",
          "en": "",
          "options": [
            "bú",
            "bù",
            "bǔ",
            "bū"
          ],
          "answer": "bú",
          "why": "Before a fourth tone (shì), 不 changes to the second tone."
        }
      ]
    },
    {
      "id": "ma",
      "title": "嗎 — yes/no questions",
      "particle": "嗎",
      "summary": "Add 嗎 to the end of a statement.",
      "sections": [
        {
          "p": "To make a yes/no question, put <b>嗎</b> (ma) at the end of the statement. Nothing else moves. Answer by repeating the verb, or its negative: 是 / 不是, 有 / 沒有.",
          "examples": [
            [
              "你是學生{嗎}？",
              "ㄋㄧˇ ㄕˋ ㄒㄩㄝˊ ㄕㄥ˙ ㄇㄚ˙? · Nǐ shì xuésheng ma?",
              "Are you a student?"
            ],
            [
              "你喜歡茶{嗎}？",
              "ㄋㄧˇ ㄒㄧˇ ㄏㄨㄢ˙ ㄔㄚˊ ㄇㄚ˙? · Nǐ xǐhuan chá ma?",
              "Do you like tea?"
            ],
            [
              "你有哥哥{嗎}？",
              "ㄋㄧˇ ㄧㄡˇ ㄍㄜ ㄍㄜ˙ ㄇㄚ˙? · Nǐ yǒu gēge ma?",
              "Do you have an older brother?"
            ]
          ]
        },
        {
          "h": "Question words stay in place",
          "p": "With 什麼 (what), 誰 (who), 哪兒 (where), the question word sits where the answer would go, and 嗎 is not used.",
          "examples": [
            [
              "你叫{什麼}名字？",
              "ㄋㄧˇ ㄐㄧㄠˋ ㄕㄣˊ ㄇㄜ˙ ㄇㄧㄥˊ ㄗ˙? · Nǐ jiào shénme míngzi?",
              "What's your name?"
            ],
            [
              "廁所在哪裡？",
              "ㄘㄜˋ ㄙㄨㄛˇ ㄗㄞˋ ㄋㄚˇ ㄌㄧˇ? · Cèsuǒ zài nǎlǐ?",
              "Where is the toilet?"
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "你忙＿？",
          "en": "Are you busy?",
          "options": [
            "嗎",
            "的",
            "很",
            "不"
          ],
          "answer": "嗎",
          "why": "A yes/no question ends in 嗎."
        },
        {
          "q": "How do you ask “Is he Chinese?”",
          "en": "",
          "options": [
            "他是中國人嗎？",
            "嗎他是中國人？",
            "他嗎是中國人？",
            "他是嗎中國人？"
          ],
          "answer": "他是中國人嗎？",
          "why": "嗎 goes at the very end; the rest stays as a statement."
        },
        {
          "q": "你喜歡咖啡嗎？ — Yes.",
          "en": "Do you like coffee?",
          "options": [
            "喜歡。",
            "是。",
            "嗎。",
            "很。"
          ],
          "answer": "喜歡。",
          "why": "Answer “yes” by repeating the verb."
        },
        {
          "q": "Which question is wrong?",
          "en": "",
          "options": [
            "你叫什麼名字嗎？",
            "你叫什麼名字？",
            "你是老師嗎？",
            "他在哪兒？"
          ],
          "answer": "你叫什麼名字嗎？",
          "why": "With a question word like 什麼, 嗎 is left out."
        },
        {
          "q": "你有車嗎？ — No.",
          "en": "Do you have a car?",
          "options": [
            "沒有。",
            "不有。",
            "不是。",
            "沒是。"
          ],
          "answer": "沒有。",
          "why": "有 is denied with 沒: 沒有."
        }
      ]
    },
    {
      "id": "de",
      "title": "的 — of, ’s and describing",
      "particle": "的",
      "summary": "The describer comes first, then 的, then the thing.",
      "sections": [
        {
          "p": "<b>的</b> (de) joins a describer to a noun, the describer first: 我的書 “my book”, 老師的車 “the teacher's car”. It works like English ’s, but for everything.",
          "examples": [
            [
              "我{的}書",
              "ㄨㄛˇ ㄉㄜ˙ ㄕㄨ · wǒ de shū",
              "my book"
            ],
            [
              "媽媽{的}手機",
              "ㄇㄚ ㄇㄚ˙ ㄉㄜ˙ ㄕㄡˇ ㄐㄧ · māma de shǒujī",
              "Mum's phone"
            ],
            [
              "很貴{的}衣服",
              "ㄏㄣˇ ㄍㄨㄟˋ ㄉㄜ˙ ㄧ ㄈㄨ˙ · hěn guì de yīfu",
              "very expensive clothes"
            ]
          ]
        },
        {
          "h": "When 的 is left out",
          "p": "With close family, and in fixed pairs, 的 is usually dropped: 我媽媽 (my mum), 中國人 (a Chinese person).",
          "examples": [
            [
              "我媽媽",
              "ㄨㄛˇ ㄇㄚ ㄇㄚ˙ · wǒ māma",
              "my mum"
            ],
            [
              "這本書是{我的}。",
              "ㄓㄜˋ ㄅㄣˇ ㄕㄨ ㄕˋ ㄨㄛˇ ㄉㄜ˙. · Zhè běn shū shì wǒ de.",
              "This book is mine."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "這是你＿茶。",
          "en": "This is your tea.",
          "options": [
            "的",
            "嗎",
            "很",
            "是"
          ],
          "answer": "的",
          "why": "你 + 的 + 茶: your tea."
        },
        {
          "q": "How do you say “my friend's house”?",
          "en": "朋友 = friend, 家 = home",
          "options": [
            "我朋友的家",
            "家的我朋友",
            "我的家朋友",
            "朋友我的家"
          ],
          "answer": "我朋友的家",
          "why": "The owner comes first, then 的, then the thing."
        },
        {
          "q": "What does 這是他的 mean?",
          "en": "",
          "options": [
            "This is his.",
            "This is him.",
            "Is this his?",
            "He has this."
          ],
          "answer": "This is his.",
          "why": "他的 alone means “his”."
        },
        {
          "q": "Which is the most natural way to say “my dad”?",
          "en": "爸爸 = dad",
          "options": [
            "我爸爸",
            "爸爸我",
            "爸爸的我",
            "我是爸爸"
          ],
          "answer": "我爸爸",
          "why": "With close family, 的 is usually dropped."
        },
        {
          "q": "紅色＿車",
          "en": "a red car",
          "options": [
            "的",
            "嗎",
            "了",
            "不"
          ],
          "answer": "的",
          "why": "A describer + 的 + noun."
        }
      ]
    },
    {
      "id": "measure",
      "title": "Measure words",
      "particle": "個 本 杯",
      "summary": "Between a number and a noun there is always a measure word.",
      "sections": [
        {
          "p": "You cannot say “three books” directly. A <b>measure word</b> goes between the number (or 這 this, 那 that) and the noun. <b>個</b> (gè) is the general one and is always understood.",
          "examples": [
            [
              "一{個}人",
              "ㄧˊ ㄍㄜ˙ ㄖㄣˊ · yí ge rén",
              "one person"
            ],
            [
              "三{本}書",
              "ㄙㄢ ㄅㄣˇ ㄕㄨ · sān běn shū",
              "three books"
            ],
            [
              "兩{杯}咖啡",
              "ㄌㄧㄤˇ ㄅㄟ ㄎㄚ ㄈㄟ · liǎng bēi kāfēi",
              "two cups of coffee"
            ],
            [
              "這{個}",
              "ㄓㄜˋ ㄍㄜ˙ · zhège",
              "this one"
            ]
          ]
        },
        {
          "h": "Two is 两",
          "p": "Before a measure word, “two” is <b>兩</b> (liǎng), not 二. Other common measure words: 張 (zhāng) for flat things, 只 (zhī) for many animals, 件 (jiàn) for clothes and matters.",
          "examples": [
            [
              "{兩}張票",
              "ㄌㄧㄤˇ ㄓㄤ ㄆㄧㄠˋ · liǎng zhāng piào",
              "two tickets"
            ],
            [
              "一{只}貓",
              "ㄧˋ ㄓ ㄇㄠ · yì zhī māo",
              "a cat"
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "我有三＿朋友。",
          "en": "I have three friends.",
          "options": [
            "個",
            "本",
            "杯",
            "的"
          ],
          "answer": "個",
          "why": "個 is the measure word for people (and the general one)."
        },
        {
          "q": "一＿書",
          "en": "one book",
          "options": [
            "本",
            "杯",
            "張",
            "只"
          ],
          "answer": "本",
          "why": "本 is for books and bound things."
        },
        {
          "q": "＿杯茶",
          "en": "two cups of tea",
          "options": [
            "兩",
            "二",
            "二個",
            "兩個"
          ],
          "answer": "兩",
          "why": "Before a measure word, two is 兩."
        },
        {
          "q": "How do you say “this person”?",
          "en": "",
          "options": [
            "這個人",
            "這人個",
            "個這人",
            "這的人"
          ],
          "answer": "這個人",
          "why": "這 + measure word + noun."
        },
        {
          "q": "一＿票",
          "en": "one ticket",
          "options": [
            "張",
            "本",
            "只",
            "杯"
          ],
          "answer": "張",
          "why": "張 is for flat things: tickets, paper, tables."
        },
        {
          "q": "Which is wrong?",
          "en": "",
          "options": [
            "三書",
            "三本書",
            "三個人",
            "一杯水"
          ],
          "answer": "三書",
          "why": "A number cannot go straight onto a noun: 三本書."
        }
      ]
    },
    {
      "id": "le",
      "title": "了 — done, or a new situation",
      "particle": "了",
      "summary": "After the verb for “already happened”; at the end for a change.",
      "sections": [
        {
          "p": "<b>了</b> (le) after a verb marks that the action is complete: 我吃了 “I ate / I’ve eaten”. Time words like 昨天 (yesterday) often sit with it, but 了 itself is not past tense — it is aspect.",
          "examples": [
            [
              "我吃{了}飯。",
              "ㄨㄛˇ ㄔ ㄌㄜ˙ ㄈㄢˋ. · Wǒ chī le fàn.",
              "I've eaten (a meal)."
            ],
            [
              "他買{了}一本書。",
              "ㄊㄚ ㄇㄞˇ ㄌㄜ˙ ㄧˋ ㄅㄣˇ ㄕㄨ. · Tā mǎi le yì běn shū.",
              "He bought a book."
            ],
            [
              "我昨天看{了}電影。",
              "ㄨㄛˇ ㄗㄨㄛˊ ㄊㄧㄢ ㄎㄢˋ ㄌㄜ˙ ㄉㄧㄢˋ ㄧㄥˇ. · Wǒ zuótiān kàn le diànyǐng.",
              "I watched a film yesterday."
            ]
          ]
        },
        {
          "h": "Sentence-final 了 — a new situation",
          "p": "了 at the end of the sentence often marks a change of state: 下雨了 “it’s raining (now)”, 我累了 “I’m tired (now)”. Negating a completed action uses 沒, not 不了: 我沒吃.",
          "examples": [
            [
              "下雨{了}。",
              "ㄒㄧㄚˋ ㄩˇ ㄌㄜ˙. · Xià yǔ le.",
              "It's raining (now)."
            ],
            [
              "我累{了}。",
              "ㄨㄛˇ ㄌㄟˋ ㄌㄜ˙. · Wǒ lèi le.",
              "I'm tired (now)."
            ],
            [
              "我{沒}吃。",
              "ㄨㄛˇ ㄇㄟˊ ㄔ. · Wǒ méi chī.",
              "I didn't eat / haven't eaten."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "我看＿這本書。",
          "en": "I've read this book. (finished)",
          "options": [
            "了",
            "過",
            "的",
            "嗎"
          ],
          "answer": "了",
          "why": "Verb + 了 marks a completed action."
        },
        {
          "q": "How do you say “She bought coffee”?",
          "en": "買 = buy",
          "options": [
            "她買了咖啡。",
            "她買過咖啡了是。",
            "她是買咖啡。",
            "她買咖啡了沒。"
          ],
          "answer": "她買了咖啡。",
          "why": "買 + 了 + object."
        },
        {
          "q": "下雨＿。",
          "en": "It's raining now (it wasn't before).",
          "options": [
            "了",
            "嗎",
            "的",
            "很"
          ],
          "answer": "了",
          "why": "Sentence-final 了 marks a new situation."
        },
        {
          "q": "我昨天＿去。",
          "en": "I didn't go yesterday.",
          "options": [
            "沒",
            "不",
            "了",
            "很"
          ],
          "answer": "沒",
          "why": "A past event that did not happen: 沒, not 不."
        },
        {
          "q": "What does 我好了 mean?",
          "en": "",
          "options": [
            "I'm fine now / I'm better.",
            "I am always fine.",
            "Was I fine?",
            "I will be fine."
          ],
          "answer": "I'm fine now / I'm better.",
          "why": "Final 了: a change — now I'm fine (again)."
        },
        {
          "q": "Which is wrong for “I haven't eaten”?",
          "en": "",
          "options": [
            "我不吃了飯。",
            "我沒吃飯。",
            "我沒吃。",
            "我還沒吃。"
          ],
          "answer": "我不吃了飯。",
          "why": "Completed action denied with 沒; 不 + 了 is not the pattern here."
        }
      ]
    },
    {
      "id": "zai",
      "title": "在 — where, and “-ing”",
      "particle": "在",
      "summary": "Place with 在; ongoing action with 在 / 正在.",
      "sections": [
        {
          "p": "<b>在</b> (zài) before a place means “at / in / on”: 我在家 “I’m at home”. The place comes right after 在, before the rest of the sentence.",
          "examples": [
            [
              "我{在}家。",
              "ㄨㄛˇ ㄗㄞˋ ㄐㄧㄚ. · Wǒ zài jiā.",
              "I'm at home."
            ],
            [
              "書{在}桌子上。",
              "ㄕㄨ ㄗㄞˋ ㄓㄨㄛ ㄗ˙ ㄕㄤˋ. · Shū zài zhuōzi shàng.",
              "The book is on the table."
            ],
            [
              "他{在}北京工作。",
              "ㄊㄚ ㄗㄞˋ ㄅㄟˇ ㄐㄧㄥ ㄍㄨㄥ ㄗㄨㄛˋ. · Tā zài Běijīng gōngzuò.",
              "He works in Beijing."
            ]
          ]
        },
        {
          "h": "在 / 正在 + verb — happening now",
          "p": "在 or 正在 before a verb marks an action in progress: 我在看書 “I’m reading”. 正在 is a little stronger. Do not put 了 after a plain progressive 在 + verb.",
          "examples": [
            [
              "我{在}看書。",
              "ㄨㄛˇ ㄗㄞˋ ㄎㄢˋ ㄕㄨ. · Wǒ zài kàn shū.",
              "I'm reading."
            ],
            [
              "她{正在}打電話。",
              "ㄊㄚ ㄓㄥˋ ㄗㄞˋ ㄉㄚˇ ㄉㄧㄢˋ ㄏㄨㄚˋ. · Tā zhèngzài dǎ diànhuà.",
              "She's on the phone right now."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "我＿學校。",
          "en": "I'm at school.",
          "options": [
            "在",
            "是",
            "的",
            "了"
          ],
          "answer": "在",
          "why": "Place after 在: 在 + place."
        },
        {
          "q": "How do you say “The keys are on the table”?",
          "en": "鑰匙 = keys, 桌子上 = on the table",
          "options": [
            "鑰匙在桌子上。",
            "鑰匙是桌子上。",
            "鑰匙桌子上在。",
            "在鑰匙桌子上。"
          ],
          "answer": "鑰匙在桌子上。",
          "why": "Thing + 在 + place."
        },
        {
          "q": "他＿吃飯。",
          "en": "He's eating (right now).",
          "options": [
            "在",
            "了",
            "過",
            "的"
          ],
          "answer": "在",
          "why": "在 + verb = action in progress."
        },
        {
          "q": "What does 我在學習漢語 mean?",
          "en": "",
          "options": [
            "I'm studying Chinese.",
            "I studied Chinese.",
            "I will study Chinese.",
            "I can study Chinese."
          ],
          "answer": "I'm studying Chinese.",
          "why": "在 + 學習: progressive."
        },
        {
          "q": "Which sentence is right?",
          "en": "She's working in Shanghai.",
          "options": [
            "她在上海工作。",
            "她工作在上海是。",
            "她是在工作上海。",
            "她上海在工作了過。"
          ],
          "answer": "她在上海工作。",
          "why": "在 + place + verb."
        }
      ]
    },
    {
      "id": "hui-neng-keyi",
      "title": "會・能・可以 — can and may",
      "particle": "會・能・可以",
      "summary": "會 for skill or future; 能 for ability; 可以 for permission.",
      "sections": [
        {
          "p": "<b>會</b> (huì) is “know how to” after learning a skill, and also a soft “will” for the future: 我會說中文, 明天會下雨. <b>能</b> (néng) is “be able to” — capacity or circumstance: 我能去.",
          "examples": [
            [
              "我{會}說華語。",
              "ㄨㄛˇ ㄏㄨㄟˋ ㄕㄨㄛ ㄏㄨㄚˊ ㄩˇ. · Wǒ huì shuō Huáyǔ.",
              "I can speak Chinese (Taiwan Mandarin)."
            ],
            [
              "明天{會}下雨。",
              "ㄇㄧㄥˊ ㄊㄧㄢ ㄏㄨㄟˋ ㄒㄧㄚˋ ㄩˇ. · Míngtiān huì xià yǔ.",
              "It will rain tomorrow."
            ],
            [
              "我今天{能}去。",
              "ㄨㄛˇ ㄐㄧㄣ ㄊㄧㄢ ㄋㄥˊ ㄑㄩˋ. · Wǒ jīntiān néng qù.",
              "I can go today."
            ]
          ]
        },
        {
          "h": "可以 — allowed to",
          "p": "<b>可以</b> (kěyǐ) asks or gives permission: 我可以進來嗎？ “May I come in?”. Negatives: 不會 / 不能 / 不可以. 不能 and 不可以 often overlap for “mustn’t / can’t”.",
          "examples": [
            [
              "我{可以}坐這兒嗎？",
              "ㄨㄛˇ ㄎㄜˇ ㄧˇ ㄗㄨㄛˋ ㄓㄜˋ ㄦ˙ ㄇㄚ˙? · Wǒ kěyǐ zuò zhèr ma?",
              "May I sit here?"
            ],
            [
              "這兒{不}可以停車。",
              "ㄓㄜˋ ㄦ˙ ㄅㄨˋ ㄎㄜˇ ㄧˇ ㄊㄧㄥˊ ㄔㄜ. · Zhèr bù kěyǐ tíng chē.",
              "You can't park here."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "我＿游泳。",
          "en": "I can swim. (I learned how)",
          "options": [
            "會",
            "在",
            "了",
            "的"
          ],
          "answer": "會",
          "why": "A learned skill: 會."
        },
        {
          "q": "明天＿下雨嗎？",
          "en": "Will it rain tomorrow?",
          "options": [
            "會",
            "能",
            "過",
            "很"
          ],
          "answer": "會",
          "why": "會 also marks a likely future."
        },
        {
          "q": "我病了，不＿去。",
          "en": "I'm ill, so I can't go.",
          "options": [
            "能",
            "會",
            "的",
            "嗎"
          ],
          "answer": "能",
          "why": "Circumstance blocks ability: 不能."
        },
        {
          "q": "How do you ask “May I look?”?",
          "en": "看 = look",
          "options": [
            "我可以看嗎？",
            "我會看嗎了？",
            "我能過看？",
            "我看可以是嗎？"
          ],
          "answer": "我可以看嗎？",
          "why": "Permission: 可以 + verb + 嗎."
        },
        {
          "q": "What does 他會開車 mean?",
          "en": "開 = drive",
          "options": [
            "He can drive / knows how to drive.",
            "He is driving now.",
            "He drove once.",
            "He may please drive."
          ],
          "answer": "He can drive / knows how to drive.",
          "why": "會 + skill verb."
        },
        {
          "q": "這兒＿抽菸。",
          "en": "You may not smoke here.",
          "options": [
            "不可以",
            "不會",
            "沒有",
            "不是"
          ],
          "answer": "不可以",
          "why": "不可以 denies permission."
        }
      ]
    },
    {
      "id": "xiang-yao",
      "title": "想 and 要 — want, feel like, going to",
      "particle": "想・要",
      "summary": "想 for “feel like / think”; 要 for “want” and near future.",
      "sections": [
        {
          "p": "<b>想</b> (xiǎng) before a verb is “would like to / feel like”: 我想喝茶. Alone it also means “to miss” or “to think”: 我想你, 我想他是對的.",
          "examples": [
            [
              "我{想}喝茶。",
              "ㄨㄛˇ ㄒㄧㄤˇ ㄏㄜ ㄔㄚˊ. · Wǒ xiǎng hē chá.",
              "I'd like some tea."
            ],
            [
              "我{想}回家。",
              "ㄨㄛˇ ㄒㄧㄤˇ ㄏㄨㄟˊ ㄐㄧㄚ. · Wǒ xiǎng huí jiā.",
              "I want to go home."
            ],
            [
              "你{想}什麼？",
              "ㄋㄧˇ ㄒㄧㄤˇ ㄕㄣˊ ㄇㄜ˙? · Nǐ xiǎng shénme?",
              "What are you thinking?"
            ]
          ]
        },
        {
          "h": "要 — want, need, about to",
          "p": "<b>要</b> (yào) is a stronger “want” or “need”, and with a time word it often means “be going to”: 我要走了 “I’m about to leave”. 不要 is “don’t (do)…”.",
          "examples": [
            [
              "我{要}一杯水。",
              "ㄨㄛˇ ㄧㄠˋ ㄧˋ ㄅㄟ ㄕㄨㄟˇ. · Wǒ yào yì bēi shuǐ.",
              "I want a glass of water."
            ],
            [
              "我{要}走了。",
              "ㄨㄛˇ ㄧㄠˋ ㄗㄡˇ ㄌㄜ˙. · Wǒ yào zǒu le.",
              "I'm about to leave."
            ],
            [
              "{不要}著急。",
              "ㄅㄨˊ ㄧㄠˋ ㄓㄠ ㄐㄧˊ. · Bú yào zhāojí.",
              "Don't worry / don't rush."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "我＿睡覺。",
          "en": "I'd like to sleep / I feel like sleeping.",
          "options": [
            "想",
            "在",
            "了",
            "的"
          ],
          "answer": "想",
          "why": "想 + verb = feel like doing."
        },
        {
          "q": "How do you say “I want two tickets”?",
          "en": "票 = ticket",
          "options": [
            "我要兩張票。",
            "我想兩張票是。",
            "我兩張票要了。",
            "我過要兩票。"
          ],
          "answer": "我要兩張票。",
          "why": "要 + noun for ordering or wanting something."
        },
        {
          "q": "＿關門！",
          "en": "Don't close the door!",
          "options": [
            "不要",
            "不想",
            "沒有",
            "不會"
          ],
          "answer": "不要",
          "why": "不要 + verb = don't…"
        },
        {
          "q": "What does 我要出發了 mean?",
          "en": "出發 = set off",
          "options": [
            "I'm about to set off.",
            "I set off yesterday.",
            "I can set off.",
            "May I set off?"
          ],
          "answer": "I'm about to set off.",
          "why": "要…了 marks a near future / about to."
        },
        {
          "q": "你＿去哪兒？",
          "en": "Where would you like to go?",
          "options": [
            "想",
            "了",
            "過",
            "嗎"
          ],
          "answer": "想",
          "why": "想 + verb for a preference."
        }
      ]
    },
    {
      "id": "guo",
      "title": "過 — have (ever) done",
      "particle": "過",
      "summary": "Verb + 過 for experience at some time before now.",
      "sections": [
        {
          "p": "<b>過</b> (guo, neutral tone) after a verb marks experience: you have done it at least once. 我去過中國 “I’ve been to China”. It is not the same as 了, which focuses on a completed instance.",
          "examples": [
            [
              "我去{過}中國。",
              "ㄨㄛˇ ㄑㄩˋ ㄍㄨㄛ˙ ㄓㄨㄥ ㄍㄨㄛˊ. · Wǒ qù guo Zhōngguó.",
              "I've been to China."
            ],
            [
              "你看{過}這部電影嗎？",
              "ㄋㄧˇ ㄎㄢˋ ㄍㄨㄛ˙ ㄓㄜˋ ㄅㄨˋ ㄉㄧㄢˋ ㄧㄥˇ ㄇㄚ˙? · Nǐ kàn guo zhè bù diànyǐng ma?",
              "Have you seen this film?"
            ],
            [
              "我吃{過}北京烤鴨。",
              "ㄨㄛˇ ㄔ ㄍㄨㄛ˙ ㄅㄟˇ ㄐㄧㄥ ㄎㄠˇ ㄧㄚ. · Wǒ chī guo Běijīng kǎoyā.",
              "I've eaten Peking duck."
            ]
          ]
        },
        {
          "h": "没…过 — never (yet)",
          "p": "Deny experience with 沒…過: 我沒去過 “I’ve never been”. 過 usually sits right after the verb, before the object.",
          "examples": [
            [
              "我{沒}去{過}。",
              "ㄨㄛˇ ㄇㄟˊ ㄑㄩˋ ㄍㄨㄛ˙. · Wǒ méi qù guo.",
              "I've never been."
            ],
            [
              "他{沒}學{過}漢語。",
              "ㄊㄚ ㄇㄟˊ ㄒㄩㄝˊ ㄍㄨㄛ˙ ㄏㄢˋ ㄩˇ. · Tā méi xué guo Hànyǔ.",
              "He's never studied Chinese."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "你去＿上海嗎？",
          "en": "Have you (ever) been to Shanghai?",
          "options": [
            "過",
            "了",
            "在",
            "的"
          ],
          "answer": "過",
          "why": "Verb + 過 asks about experience."
        },
        {
          "q": "How do you say “I've read that book” (at some point)?",
          "en": "",
          "options": [
            "我看過那本書。",
            "我在看那本書。",
            "我看是那本書。",
            "我過看那本書了嗎。"
          ],
          "answer": "我看過那本書。",
          "why": "看 + 過 + object."
        },
        {
          "q": "我＿吃過日本菜。",
          "en": "I've never eaten Japanese food.",
          "options": [
            "沒",
            "不",
            "很",
            "是"
          ],
          "answer": "沒",
          "why": "Experience is denied with 沒…過."
        },
        {
          "q": "What does 她學過法語 mean?",
          "en": "",
          "options": [
            "She has studied French (before).",
            "She is studying French now.",
            "She will study French.",
            "She must study French."
          ],
          "answer": "She has studied French (before).",
          "why": "學過 = experiential."
        },
        {
          "q": "了 or 過? “I ate just now.”",
          "en": "",
          "options": [
            "我剛吃了。",
            "我剛吃過了是。",
            "我過吃剛。",
            "我吃在剛。"
          ],
          "answer": "我剛吃了。",
          "why": "A specific completed event: 了 (過 is “ever / before”)."
        },
        {
          "q": "Which is wrong?",
          "en": "",
          "options": [
            "我過沒去中國。",
            "我沒去過中國。",
            "你去過嗎？",
            "我去過兩次。"
          ],
          "answer": "我過沒去中國。",
          "why": "沒 comes before the verb: 沒 + verb + 過."
        }
      ]
    },
    {
      "id": "bi",
      "title": "比 — comparing A and B",
      "particle": "比",
      "summary": "A 比 B + adjective: A is more … than B.",
      "sections": [
        {
          "p": "To compare, put <b>比</b> (bǐ) between the two things: A 比 B + adjective. 他比我高 “he is taller than me”. Do not put 很 before the adjective in a plain 比 sentence.",
          "examples": [
            [
              "他{比}我高。",
              "ㄊㄚ ㄅㄧˇ ㄨㄛˇ ㄍㄠ. · Tā bǐ wǒ gāo.",
              "He is taller than me."
            ],
            [
              "今天{比}昨天冷。",
              "ㄐㄧㄣ ㄊㄧㄢ ㄅㄧˇ ㄗㄨㄛˊ ㄊㄧㄢ ㄌㄥˇ. · Jīntiān bǐ zuótiān lěng.",
              "Today is colder than yesterday."
            ],
            [
              "漢語{比}英語難。",
              "ㄏㄢˋ ㄩˇ ㄅㄧˇ ㄧㄥ ㄩˇ ㄋㄢˊ. · Hànyǔ bǐ Yīngyǔ nán.",
              "Chinese is harder than English."
            ]
          ]
        },
        {
          "h": "Not as … as; much more",
          "p": "A 沒有 B + adjective means “A is not as … as B”: 我沒有他高. For “much more”, add 多了 or 一點兒 after the adjective: 貴多了 “much more expensive”.",
          "examples": [
            [
              "我{沒有}他高。",
              "ㄨㄛˇ ㄇㄟˊ ㄧㄡˇ ㄊㄚ ㄍㄠ. · Wǒ méiyǒu tā gāo.",
              "I'm not as tall as him."
            ],
            [
              "這個{比}那個貴多了。",
              "ㄓㄜˋ ㄍㄜ˙ ㄅㄧˇ ㄋㄚˋ ㄍㄜ˙ ㄍㄨㄟˋ ㄉㄨㄛ ㄌㄜ˙. · Zhège bǐ nàge guì duō le.",
              "This is much more expensive than that."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "她＿我忙。",
          "en": "She is busier than me.",
          "options": [
            "比",
            "在",
            "過",
            "的"
          ],
          "answer": "比",
          "why": "A 比 B + adjective."
        },
        {
          "q": "How do you say “This book is cheaper than that one”?",
          "en": "便宜 = cheap",
          "options": [
            "這本書比那本便宜。",
            "這本書很比那本便宜。",
            "這本書是比便宜那本。",
            "比這本書那本便宜。"
          ],
          "answer": "這本書比那本便宜。",
          "why": "A 比 B + adj; no 很 in the basic pattern."
        },
        {
          "q": "我＿你高。",
          "en": "I'm not as tall as you.",
          "options": [
            "沒有",
            "不是",
            "不會",
            "不要"
          ],
          "answer": "沒有",
          "why": "A 沒有 B + adj = not as … as."
        },
        {
          "q": "What does 火車比飛機慢 mean?",
          "en": "",
          "options": [
            "Trains are slower than planes.",
            "Planes are slower than trains.",
            "Trains and planes are slow.",
            "The train was slow."
          ],
          "answer": "Trains are slower than planes.",
          "why": "A 比 B + 慢."
        },
        {
          "q": "Which sentence is wrong?",
          "en": "",
          "options": [
            "他比我很高。",
            "他比我高。",
            "今天比昨天熱。",
            "我沒有他高。"
          ],
          "answer": "他比我很高。",
          "why": "In a plain 比 sentence, drop 很 before the adjective."
        }
      ]
    }
  ]
};
