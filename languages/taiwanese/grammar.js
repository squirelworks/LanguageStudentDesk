// Taiwan Mandarin (台灣華語) grammar for the Grammar Learner. Written for this project.
// Traditional characters, Taiwan vocabulary, zh-TW readings in Zhuyin and pinyin.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.taiwanese = {
  "title": "Taiwan Mandarin grammar",
  "intro": "Taiwan Mandarin (台灣華語) is written in traditional characters. Schools teach the sounds with Zhuyin (注音), and these lessons print Zhuyin beside pinyin. Local words are used from the start: 捷運 for the metro, 計程車 for a taxi, 影片 for a video, 華語 for the language. The six levels step up in order: greetings and sounds, daily sentences, particles and aspect, connected speech, formal news-style writing, then nuance between patterns that look alike.",
  "lessons": [
    {
      "id": "tones",
      "level": "absolute-beginner",
      "title": "Tones and Zhuyin marks",
      "particle": "聲調",
      "summary": "The pitch is part of the word. Zhuyin writes the tone after the letters.",
      "sections": [
        {
          "p": "Taiwan Mandarin has four tones plus a light neutral tone. <b>媽 mā</b> (mother), <b>麻 má</b> (hemp), <b>馬 mǎ</b> (horse) and <b>罵 mà</b> (scold) are different words. Schoolbooks write the sound in Zhuyin (注音). The tone mark sits after the letters: no mark for the 1st tone, ˊ for the 2nd, ˇ for the 3rd, ˋ for the 4th. A neutral tone is a short light ˙, as in the question particle 嗎.",
          "examples": [
            [
              "媽",
              "ㄇㄚ · mā",
              "mother (1st tone, high and level)"
            ],
            [
              "麻",
              "ㄇㄚˊ · má",
              "hemp (2nd tone, rising)"
            ],
            [
              "馬",
              "ㄇㄚˇ · mǎ",
              "horse (3rd tone, low)"
            ],
            [
              "罵",
              "ㄇㄚˋ · mà",
              "to scold (4th tone, falling)"
            ]
          ]
        },
        {
          "h": "Neutral tone",
          "p": "The same spelling with the wrong tone is a different word, or nonsense. These lessons print Zhuyin and pinyin together so you can use either.",
          "examples": [
            [
              "嗎",
              "ㄇㄚ˙ · ma",
              "yes/no question particle (neutral, short and light)"
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "Which tone is high and level?",
          "en": "媽 mā",
          "options": [
            "1st",
            "2nd",
            "3rd",
            "4th"
          ],
          "answer": "1st",
          "why": "媽 is the high level 1st tone. Zhuyin writes it ㄇㄚ with no tone mark."
        },
        {
          "q": "馬 is which tone?",
          "en": "horse",
          "options": [
            "3rd",
            "1st",
            "2nd",
            "4th"
          ],
          "answer": "3rd",
          "why": "馬 mǎ dips or stays low: 3rd tone, Zhuyin ˇ."
        },
        {
          "q": "Where does the Zhuyin tone mark go?",
          "en": "",
          "options": [
            "After the letters",
            "Before the letters",
            "On top of the vowel only, as in pinyin",
            "It replaces the last letter"
          ],
          "answer": "After the letters",
          "why": "注音 writes the syllable, then ˊ, ˇ or ˋ. Pinyin puts the mark on a vowel instead."
        },
        {
          "q": "What does a final ˙ mean in these lessons?",
          "en": "ㄇㄚ˙",
          "options": [
            "A short, light neutral tone",
            "The 4th tone",
            "A rising tone",
            "The syllable is stressed"
          ],
          "answer": "A short, light neutral tone",
          "why": "嗎 is neutral. The mark in this course is ˙ after the letters."
        },
        {
          "q": "Which pair differs only by tone?",
          "en": "",
          "options": [
            "媽 and 馬",
            "茶 and 車",
            "我 and 你",
            "捷運 and 計程車"
          ],
          "answer": "媽 and 馬",
          "why": "Both are ㄇㄚ. 媽 is 1st tone, 馬 is 3rd."
        }
      ]
    },
    {
      "id": "greetings",
      "level": "absolute-beginner",
      "title": "Greetings — 你好, 請問, 再見",
      "particle": "你好",
      "summary": "Hello, thanks, sorry, and the mealtime greeting 你吃飽了嗎.",
      "sections": [
        {
          "p": "<b>你好</b> works with people you do not know well. In the morning people also say <b>早安</b>. <b>請問</b> opens a polite question. <b>謝謝</b> is thank you, and <b>不客氣</b> answers it. <b>不好意思</b> covers a small apology or “excuse me”.",
          "examples": [
            [
              "{你好}。",
              "ㄋㄧˇ ㄏㄠˇ. · Nǐ hǎo.",
              "Hello."
            ],
            [
              "{早安}。",
              "ㄗㄠˇ ㄢ. · Zǎo ān.",
              "Good morning."
            ],
            [
              "{請問}，洗手間在哪裡？",
              "ㄑㄧㄥˇ ㄨㄣˋ, ㄒㄧˇ ㄕㄡˇ ㄐㄧㄢ ㄗㄞˋ ㄋㄚˇ ㄌㄧˇ? · Qǐngwèn, xǐshǒujiān zài nǎlǐ?",
              "Excuse me, where is the toilet?"
            ]
          ]
        },
        {
          "h": "A Taiwan hello",
          "p": "Around a meal, <b>你吃飽了嗎</b> is a friendly hello, not a demand for a menu. <b>再見</b> is goodbye.",
          "examples": [
            [
              "{你吃飽了嗎}？",
              "ㄋㄧˇ ㄔ ㄅㄠˇ ㄌㄜ˙ ㄇㄚ˙? · Nǐ chī bǎo le ma?",
              "Have you eaten? (a greeting)"
            ],
            [
              "{再見}。",
              "ㄗㄞˋ ㄐㄧㄢˋ. · Zàijiàn.",
              "Goodbye."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "Someone holds a door for you. You say:",
          "en": "",
          "options": [
            "謝謝。",
            "再見。",
            "早安。",
            "請問。"
          ],
          "answer": "謝謝。",
          "why": "謝謝 is thank you."
        },
        {
          "q": "You want to ask a stranger a question. Start with:",
          "en": "",
          "options": [
            "請問",
            "再見",
            "不客氣",
            "吃飽了"
          ],
          "answer": "請問",
          "why": "請問 means “may I ask” and softens the question."
        },
        {
          "q": "They say 謝謝. A usual reply is:",
          "en": "",
          "options": [
            "不客氣。",
            "你好。",
            "再見。",
            "請問。"
          ],
          "answer": "不客氣。",
          "why": "不客氣 answers 謝謝: you're welcome."
        },
        {
          "q": "What is 你吃飽了嗎 doing in the street at noon?",
          "en": "",
          "options": [
            "Greeting someone, the way people do around meals",
            "Ordering a dish",
            "Asking the price",
            "Saying goodbye"
          ],
          "answer": "Greeting someone, the way people do around meals",
          "why": "你吃飽了嗎 is a hello near mealtimes, not only a real question about food."
        },
        {
          "q": "Which one is goodbye?",
          "en": "",
          "options": [
            "再見",
            "早安",
            "不好意思",
            "你好"
          ],
          "answer": "再見",
          "why": "再見 is goodbye. 早安 is good morning."
        }
      ]
    },
    {
      "id": "shi",
      "level": "absolute-beginner",
      "title": "是 — “to be” between nouns",
      "particle": "是",
      "summary": "A is B, when B is a noun.",
      "sections": [
        {
          "p": "<b>是</b> (shì) links two nouns: “I am a student”, “this is tea”. It never changes: 我是, 你是, 他是 are all just 是. Mandarin has no “a” or “the”.",
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
              "我{是}台灣人。",
              "ㄨㄛˇ ㄕˋ ㄊㄞˊ ㄨㄢ ㄖㄣˊ. · Wǒ shì Táiwān rén.",
              "I am Taiwanese."
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
      "level": "absolute-beginner",
      "title": "很 — adjectives without “is”",
      "particle": "很",
      "summary": "Adjectives act like verbs; 很 fills the gap.",
      "sections": [
        {
          "p": "An adjective follows the subject directly, with no 是. In a plain statement Mandarin puts <b>很</b> (hěn) in front of it. 很 literally means “very”, but here it is so weak that 我很好 is just “I'm fine”.",
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
              "華語{非常}有意思。",
              "ㄏㄨㄚˊ ㄩˇ ㄈㄟ ㄔㄤˊ ㄧㄡˇ ㄧˋ ㄙ˙. · Huáyǔ fēicháng yǒuyìsi.",
              "Mandarin is really interesting."
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
      "level": "beginner",
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
          "h": "沒 for having and for the past",
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
      "level": "beginner",
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
          "p": "With 什麼 (what), 誰 (who), 哪裡 (where), the question word sits where the answer would go, and 嗎 is not used.",
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
          "q": "How do you ask “Is he Taiwanese?”",
          "en": "",
          "options": [
            "他是台灣人嗎？",
            "嗎他是台灣人？",
            "他嗎是台灣人？",
            "他是嗎台灣人？"
          ],
          "answer": "他是台灣人嗎？",
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
            "他在哪裡？"
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
      "id": "you-have",
      "level": "beginner",
      "title": "有 — have, and there is",
      "particle": "有",
      "summary": "有 for possession and for something being somewhere. 沒有 is the only negative.",
      "sections": [
        {
          "p": "<b>有</b> (yǒu) means “have” and also “there is”. The thing follows 有. <b>沒有</b> is the negative; 不有 is not a sentence.",
          "examples": [
            [
              "我{有}時間。",
              "ㄨㄛˇ ㄧㄡˇ ㄕˊ ㄐㄧㄢ. · Wǒ yǒu shíjiān.",
              "I have time."
            ],
            [
              "桌上{有}茶。",
              "ㄓㄨㄛ ㄕㄤˋ ㄧㄡˇ ㄔㄚˊ. · Zhuō shàng yǒu chá.",
              "There is tea on the table."
            ],
            [
              "家裡{沒有}人。",
              "ㄐㄧㄚ ㄌㄧˇ ㄇㄟˊ ㄧㄡˇ ㄖㄣˊ. · Jiālǐ méiyǒu rén.",
              "Nobody is home."
            ]
          ]
        },
        {
          "h": "There is",
          "p": "A place can come first: 捷運站有洗手間 “the MRT station has a toilet” / “there is a toilet at the station”.",
          "examples": [
            [
              "捷運站{有}洗手間。",
              "ㄐㄧㄝˊ ㄩㄣˋ ㄓㄢˋ ㄧㄡˇ ㄒㄧˇ ㄕㄡˇ ㄐㄧㄢ. · Jiéyùn zhàn yǒu xǐshǒujiān.",
              "The MRT station has a toilet."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "我＿一張票。",
          "en": "I have a ticket.",
          "options": [
            "有",
            "是",
            "在",
            "很"
          ],
          "answer": "有",
          "why": "Possession: 有 + the thing."
        },
        {
          "q": "How do you say “I don't have time”?",
          "en": "時間 = time",
          "options": [
            "我沒有時間。",
            "我不有時間。",
            "我不是時間。",
            "我沒是時間。"
          ],
          "answer": "我沒有時間。",
          "why": "有 is denied only with 沒有."
        },
        {
          "q": "桌上＿茶。",
          "en": "There is tea on the table.",
          "options": [
            "有",
            "是",
            "很",
            "嗎"
          ],
          "answer": "有",
          "why": "有 also means “there is”."
        },
        {
          "q": "What does 捷運站有洗手間 mean?",
          "en": "",
          "options": [
            "The MRT station has a toilet.",
            "The MRT station is a toilet.",
            "I want the MRT.",
            "Where is the MRT?"
          ],
          "answer": "The MRT station has a toilet.",
          "why": "Place + 有 + thing."
        },
        {
          "q": "Which sentence is wrong?",
          "en": "",
          "options": [
            "我不有錢。",
            "我沒有錢。",
            "他有車。",
            "家裡沒有人。"
          ],
          "answer": "我不有錢。",
          "why": "Never 不有. The negative of 有 is 沒有."
        }
      ]
    },
    {
      "id": "measure",
      "level": "beginner",
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
      "id": "xiang-yao",
      "level": "beginner",
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
          "q": "你＿去哪裡？",
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
      "id": "de",
      "level": "beginner-intermediate",
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
          "p": "With close family, and in fixed pairs, 的 is usually dropped: 我媽媽 (my mum), 台灣人 (a person from Taiwan).",
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
      "id": "le",
      "level": "beginner-intermediate",
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
      "level": "beginner-intermediate",
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
              "他{在}台北工作。",
              "ㄊㄚ ㄗㄞˋ ㄊㄞˊ ㄅㄟˇ ㄍㄨㄥ ㄗㄨㄛˋ. · Tā zài Táiběi gōngzuò.",
              "He works in Taipei."
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
          "q": "What does 我在學華語 mean?",
          "en": "",
          "options": [
            "I'm studying Mandarin.",
            "I studied Mandarin.",
            "I will study Mandarin.",
            "I can study Mandarin."
          ],
          "answer": "I'm studying Mandarin.",
          "why": "在 + 學: progressive."
        },
        {
          "q": "Which sentence is right?",
          "en": "She's working in Kaohsiung.",
          "options": [
            "她在高雄工作。",
            "她工作在高雄是。",
            "她是在工作高雄。",
            "她高雄在工作了過。"
          ],
          "answer": "她在高雄工作。",
          "why": "在 + place + verb."
        }
      ]
    },
    {
      "id": "guo",
      "level": "beginner-intermediate",
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
              "我吃{過}牛肉麵。",
              "ㄨㄛˇ ㄔ ㄍㄨㄛ˙ ㄋㄧㄡˊ ㄖㄡˋ ㄇㄧㄢˋ. · Wǒ chī guo niúròu miàn.",
              "I've eaten beef noodle soup."
            ]
          ]
        },
        {
          "h": "沒…過 — never (yet)",
          "p": "Deny experience with 沒…過: 我沒去過 “I’ve never been”. 過 usually sits right after the verb, before the object.",
          "examples": [
            [
              "我{沒}去{過}。",
              "ㄨㄛˇ ㄇㄟˊ ㄑㄩˋ ㄍㄨㄛ˙. · Wǒ méi qù guo.",
              "I've never been."
            ],
            [
              "他{沒}學{過}華語。",
              "ㄊㄚ ㄇㄟˊ ㄒㄩㄝˊ ㄍㄨㄛ˙ ㄏㄨㄚˊ ㄩˇ. · Tā méi xué guo Huáyǔ.",
              "He's never studied Mandarin."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "你去＿高雄嗎？",
          "en": "Have you (ever) been to Kaohsiung?",
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
      "id": "result",
      "level": "beginner-intermediate",
      "title": "完, 到, 好 — the result of the action",
      "particle": "完",
      "summary": "A second piece after the verb says the action reached a result.",
      "sections": [
        {
          "p": "A result complement sticks to the verb. <b>完</b> means the action is finished. <b>到</b> means it reached someone or something: you managed to see or hear. <b>好</b> means it turned out done and ready.",
          "examples": [
            [
              "我看{完}這部影片了。",
              "ㄨㄛˇ ㄎㄢˋ ㄨㄢˊ ㄓㄜˋ ㄅㄨˋ ㄧㄥˇ ㄆㄧㄢˋ ㄌㄜ˙. · Wǒ kàn wán zhè bù yǐngpiàn le.",
              "I've finished this video."
            ],
            [
              "你聽{到}了嗎？",
              "ㄋㄧˇ ㄊㄧㄥ ㄉㄠˋ ㄌㄜ˙ ㄇㄚ˙? · Nǐ tīng dào le ma?",
              "Did you hear that?"
            ],
            [
              "便當做{好}了。",
              "ㄅㄧㄢˋ ㄉㄤ ㄗㄨㄛˋ ㄏㄠˇ ㄌㄜ˙. · Biàndāng zuò hǎo le.",
              "The boxed meal is ready."
            ]
          ]
        },
        {
          "h": "It didn't come off",
          "p": "If the result did not happen, use 沒 before the verb, and keep the complement: 我沒看到他 “I didn't see him”.",
          "examples": [
            [
              "我{沒}看{到}他。",
              "ㄨㄛˇ ㄇㄟˊ ㄎㄢˋ ㄉㄠˋ ㄊㄚ. · Wǒ méi kàn dào tā.",
              "I didn't see him."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "我看＿這部影片了。",
          "en": "I finished this video.",
          "options": [
            "完",
            "的",
            "嗎",
            "很"
          ],
          "answer": "完",
          "why": "完 marks the action as finished."
        },
        {
          "q": "你聽＿了嗎？",
          "en": "Did you catch that (succeed in hearing)?",
          "options": [
            "到",
            "完",
            "過",
            "是"
          ],
          "answer": "到",
          "why": "聽到 is “hear and catch it”, not merely “listen”."
        },
        {
          "q": "How do you say “The boxed meal is ready”?",
          "en": "便當 = boxed meal",
          "options": [
            "便當做好了。",
            "便當做是好。",
            "便當很做了。",
            "做好便當是。"
          ],
          "answer": "便當做好了。",
          "why": "做好: the making reached “ready”."
        },
        {
          "q": "我＿看到他。",
          "en": "I didn't see him.",
          "options": [
            "沒",
            "不",
            "很",
            "在"
          ],
          "answer": "沒",
          "why": "A result that did not happen takes 沒 before the verb."
        },
        {
          "q": "Which word says the action is finished through?",
          "en": "",
          "options": [
            "完",
            "在",
            "嗎",
            "的"
          ],
          "answer": "完",
          "why": "看完, 吃完, 做完: 完 is “finished”."
        }
      ]
    },
    {
      "id": "hui-neng-keyi",
      "level": "intermediate",
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
              "我{可以}坐這裡嗎？",
              "ㄨㄛˇ ㄎㄜˇ ㄧˇ ㄗㄨㄛˋ ㄓㄜˋ ㄌㄧˇ ㄇㄚ˙? · Wǒ kěyǐ zuò zhèlǐ ma?",
              "May I sit here?"
            ],
            [
              "這裡{不}可以停車。",
              "ㄓㄜˋ ㄌㄧˇ ㄅㄨˋ ㄎㄜˇ ㄧˇ ㄊㄧㄥˊ ㄔㄜ. · Zhèlǐ bù kěyǐ tíng chē.",
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
          "q": "這裡＿抽菸。",
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
      "id": "bi",
      "level": "intermediate",
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
              "華語{比}英語難。",
              "ㄏㄨㄚˊ ㄩˇ ㄅㄧˇ ㄧㄥ ㄩˇ ㄋㄢˊ. · Huáyǔ bǐ Yīngyǔ nán.",
              "Mandarin is harder than English."
            ]
          ]
        },
        {
          "h": "Not as … as; much more",
          "p": "A 沒有 B + adjective means “A is not as … as B”: 我沒有他高. For “much more”, add 多了 or 一點 after the adjective: 貴多了 “much more expensive”.",
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
    },
    {
      "id": "links",
      "level": "intermediate",
      "title": "因為…所以, 雖然…但是, 如果…就",
      "particle": "因為",
      "summary": "Tie two clauses together instead of leaving them as separate sentences.",
      "sections": [
        {
          "p": "<b>因為</b> gives the reason and <b>所以</b> the result. <b>雖然</b> concedes something and <b>但是</b> turns against it. Both halves stay in the sentence.",
          "examples": [
            [
              "{因為}下雨，{所以}我坐計程車。",
              "ㄧㄣ ㄨㄟˋ ㄒㄧㄚˋ ㄩˇ, ㄙㄨㄛˇ ㄧˇ ㄨㄛˇ ㄗㄨㄛˋ ㄐㄧˋ ㄔㄥˊ ㄔㄜ. · Yīnwèi xià yǔ, suǒyǐ wǒ zuò jìchéngchē.",
              "Because it was raining, I took a taxi."
            ],
            [
              "{雖然}很遠，{但是}捷運很方便。",
              "ㄙㄨㄟ ㄖㄢˊ ㄏㄣˇ ㄩㄢˇ, ㄉㄢˋ ㄕˋ ㄐㄧㄝˊ ㄩㄣˋ ㄏㄣˇ ㄈㄤ ㄅㄧㄢˋ. · Suīrán hěn yuǎn, dànshì jiéyùn hěn fāngbiàn.",
              "It's far, but the MRT is convenient."
            ]
          ]
        },
        {
          "h": "If…, then…",
          "p": "<b>如果</b> sets a condition. <b>就</b> in the next clause means “then”.",
          "examples": [
            [
              "{如果}有時間，我{就}去看影片。",
              "ㄖㄨˊ ㄍㄨㄛˇ ㄧㄡˇ ㄕˊ ㄐㄧㄢ, ㄨㄛˇ ㄐㄧㄡˋ ㄑㄩˋ ㄎㄢˋ ㄧㄥˇ ㄆㄧㄢˋ. · Rúguǒ yǒu shíjiān, wǒ jiù qù kàn yǐngpiàn.",
              "If I have time, I'll go watch a video."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "＿下雨，所以我坐計程車。",
          "en": "Because it was raining, I took a taxi.",
          "options": [
            "因為",
            "雖然",
            "如果",
            "但是"
          ],
          "answer": "因為",
          "why": "因為 matches 所以: reason, then result."
        },
        {
          "q": "雖然很遠，＿捷運很方便。",
          "en": "It's far, but the MRT is convenient.",
          "options": [
            "但是",
            "所以",
            "就",
            "嗎"
          ],
          "answer": "但是",
          "why": "雖然 pairs with 但是."
        },
        {
          "q": "如果有時間，我就去。 The 就 means:",
          "en": "",
          "options": [
            "then",
            "because",
            "but",
            "already finished"
          ],
          "answer": "then",
          "why": "如果…就 is “if…, then…”."
        },
        {
          "q": "How do you say “Because I have no time, I'm taking a taxi”?",
          "en": "",
          "options": [
            "因為沒有時間，所以我坐計程車。",
            "雖然沒有時間，就我坐計程車。",
            "如果所以沒有時間，我坐計程車。",
            "所以沒有時間，因為我坐計程車。"
          ],
          "answer": "因為沒有時間，所以我坐計程車。",
          "why": "Reason in the 因為 clause, result after 所以."
        },
        {
          "q": "Which pair is a concession, not a reason?",
          "en": "",
          "options": [
            "雖然…但是",
            "因為…所以",
            "如果…就",
            "在…嗎"
          ],
          "answer": "雖然…但是",
          "why": "雖然 concedes a fact; 但是 gives the contrast."
        }
      ]
    },
    {
      "id": "ba",
      "level": "intermediate",
      "title": "把 — what you do to a known thing",
      "particle": "把",
      "summary": "把 brings a specific object in front of the verb and says what becomes of it.",
      "sections": [
        {
          "p": "<b>把</b> (bǎ) is for a known thing that the verb handles: you close it, finish it, put it somewhere. The pattern is subject + 把 + thing + verb + a result, place, or 了. The verb cannot be left bare.",
          "examples": [
            [
              "請{把}窗戶關上。",
              "ㄑㄧㄥˇ ㄅㄚˇ ㄔㄨㄤ ㄏㄨˋ ㄍㄨㄢ ㄕㄤˋ. · Qǐng bǎ chuānghu guān shàng.",
              "Please close the window."
            ],
            [
              "我{把}影片看完了。",
              "ㄨㄛˇ ㄅㄚˇ ㄧㄥˇ ㄆㄧㄢˋ ㄎㄢˋ ㄨㄢˊ ㄌㄜ˙. · Wǒ bǎ yǐngpiàn kàn wán le.",
              "I finished the video."
            ],
            [
              "請{把}茶放在桌上。",
              "ㄑㄧㄥˇ ㄅㄚˇ ㄔㄚˊ ㄈㄤˋ ㄗㄞˋ ㄓㄨㄛ ㄕㄤˋ. · Qǐng bǎ chá fàng zài zhuō shàng.",
              "Please put the tea on the table."
            ]
          ]
        },
        {
          "h": "Don't",
          "p": "To tell someone not to, use 別把 or 不要把. 不把 on its own is not the usual warning.",
          "examples": [
            [
              "{別把}茶喝完。",
              "ㄅㄧㄝˊ ㄅㄚˇ ㄔㄚˊ ㄏㄜ ㄨㄢˊ. · Bié bǎ chá hē wán.",
              "Don't finish the tea."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "請＿窗戶關上。",
          "en": "Please close the window.",
          "options": [
            "把",
            "被",
            "過",
            "嗎"
          ],
          "answer": "把",
          "why": "把 + the thing + verb + result. 關上 is the result."
        },
        {
          "q": "How do you say “I finished the video” with 把?",
          "en": "",
          "options": [
            "我把影片看完了。",
            "我把看完影片。",
            "我影片把看完了。",
            "我看把影片完了。"
          ],
          "answer": "我把影片看完了。",
          "why": "把 + object + verb + 完 + 了."
        },
        {
          "q": "Which 把 sentence is wrong?",
          "en": "",
          "options": [
            "我把茶喝。",
            "我把茶喝完了。",
            "請把門關上。",
            "別把茶喝完。"
          ],
          "answer": "我把茶喝。",
          "why": "The verb after 把 needs an ending: 完, 上, a place, or 了. 喝 alone is bare."
        },
        {
          "q": "別把茶喝完 means:",
          "en": "",
          "options": [
            "Don't finish the tea.",
            "I finished the tea.",
            "The tea finished me.",
            "Have you finished the tea?"
          ],
          "answer": "Don't finish the tea.",
          "why": "別把 is the negative command."
        },
        {
          "q": "請把茶＿在桌上。",
          "en": "Please put the tea on the table.",
          "options": [
            "放",
            "是",
            "很",
            "嗎"
          ],
          "answer": "放",
          "why": "放在 says where the thing ends up."
        }
      ]
    },
    {
      "id": "de-comp",
      "level": "intermediate",
      "title": "得 — how well it is done",
      "particle": "得",
      "summary": "Verb + 得 + a description says how the action goes.",
      "sections": [
        {
          "p": "After the verb, <b>得</b> (de, neutral) introduces the manner or result as a comment: 說得很清楚 “speaks clearly”, 來得很快 “comes quickly”. 很 is normal inside that comment. This 得 is not the 的 of “my book”.",
          "examples": [
            [
              "他說華語說{得}很清楚。",
              "ㄊㄚ ㄕㄨㄛ ㄏㄨㄚˊ ㄩˇ ㄕㄨㄛ ㄉㄜ˙ ㄏㄣˇ ㄑㄧㄥ ㄔㄨˇ. · Tā shuō Huáyǔ shuō de hěn qīngchu.",
              "He speaks Mandarin clearly."
            ],
            [
              "捷運來{得}很快。",
              "ㄐㄧㄝˊ ㄩㄣˋ ㄌㄞˊ ㄉㄜ˙ ㄏㄣˇ ㄎㄨㄞˋ. · Jiéyùn lái de hěn kuài.",
              "The MRT comes quickly."
            ],
            [
              "這個便當做{得}很好吃。",
              "ㄓㄜˋ ㄍㄜ˙ ㄅㄧㄢˋ ㄉㄤ ㄗㄨㄛˋ ㄉㄜ˙ ㄏㄣˇ ㄏㄠˇ ㄔ. · Zhège biàndāng zuò de hěn hǎochī.",
              "This boxed meal is made really well."
            ]
          ]
        },
        {
          "h": "Not that way",
          "p": "The negative comment uses 不 after 得: 說得不清楚. That is different from 沒看完, which denies that a result happened.",
          "examples": [
            [
              "他說{得}不清楚。",
              "ㄊㄚ ㄕㄨㄛ ㄉㄜ˙ ㄅㄨˋ ㄑㄧㄥ ㄔㄨˇ. · Tā shuō de bù qīngchu.",
              "He doesn't speak clearly."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "捷運來＿很快。",
          "en": "The MRT comes quickly.",
          "options": [
            "得",
            "的",
            "地",
            "了"
          ],
          "answer": "得",
          "why": "得 links the verb to how it happens. 的 would mark a noun."
        },
        {
          "q": "What does 他說得很清楚 mean?",
          "en": "",
          "options": [
            "He speaks very clearly.",
            "He has a clear book.",
            "He finished speaking.",
            "He may speak."
          ],
          "answer": "He speaks very clearly.",
          "why": "說得 + comment describes the speaking."
        },
        {
          "q": "這個便當做得很好吃。 The 得 tells you:",
          "en": "",
          "options": [
            "How the cooking turned out",
            "Who owns the meal",
            "That the meal is finished and gone",
            "A yes/no question"
          ],
          "answer": "How the cooking turned out",
          "why": "做得很好吃 comments on the making."
        },
        {
          "q": "How do you say “He doesn't speak clearly”?",
          "en": "",
          "options": [
            "他說得不清楚。",
            "他不說得清楚。",
            "他說不清楚得。",
            "他得很說清楚。"
          ],
          "answer": "他說得不清楚。",
          "why": "Put 不 inside the comment after 得."
        },
        {
          "q": "Which sentence uses 得 for manner?",
          "en": "",
          "options": [
            "捷運來得很快。",
            "我的票。",
            "慢慢地說。",
            "他在台北。"
          ],
          "answer": "捷運來得很快。",
          "why": "來得很快 is verb + 得 + description. 我的 is possession. 地 marks an adverb."
        }
      ]
    },
    {
      "id": "formal",
      "level": "advanced-intermediate",
      "title": "因此, 然而, 此外, 對於 — news connectors",
      "particle": "因此",
      "summary": "Written news prefers a tighter set of connectors than 因為 and 但是.",
      "sections": [
        {
          "p": "A news sentence often opens with a source and then a written connector. <b>根據</b> is “according to”. <b>因此</b> is “therefore”. <b>然而</b> is “however”. <b>此外</b> adds a further point. <b>對於</b> is “regarding”.",
          "examples": [
            [
              "{根據}中央氣象署的資料，明天將有雨。",
              "ㄍㄣ ㄐㄩˋ ㄓㄨㄥ ㄧㄤ ㄑㄧˋ ㄒㄧㄤˋ ㄕㄨˇ ㄉㄜ˙ ㄗ ㄌㄧㄠˋ, ㄇㄧㄥˊ ㄊㄧㄢ ㄐㄧㄤ ㄧㄡˇ ㄩˇ. · Gēnjù Zhōngyāng Qìxiàngshǔ de zīliào, míngtiān jiāng yǒu yǔ.",
              "According to the Central Weather Administration, it will rain tomorrow."
            ],
            [
              "{因此}，市府決定加開班次。",
              "ㄧㄣ ㄘˇ, ㄕˋ ㄈㄨˇ ㄐㄩㄝˊ ㄉㄧㄥˋ ㄐㄧㄚ ㄎㄞ ㄅㄢ ㄘˋ. · Yīncǐ, shìfǔ juédìng jiā kāi bāncì.",
              "The city government therefore decided to add services."
            ],
            [
              "{此外}，捷運票價維持不變。",
              "ㄘˇ ㄨㄞˋ, ㄐㄧㄝˊ ㄩㄣˋ ㄆㄧㄠˋ ㄐㄧㄚˋ ㄨㄟˊ ㄔˊ ㄅㄨˊ ㄅㄧㄢˋ. · Cǐwài, jiéyùn piàojià wéichí bú biàn.",
              "In addition, MRT fares stay the same."
            ]
          ]
        },
        {
          "h": "Regarding, however",
          "p": "<b>對於</b> names the topic of a formal comment. <b>然而</b> contrasts, the way 但是 does in speech, but it belongs to writing.",
          "examples": [
            [
              "{對於}這項政策，各界仍有討論。",
              "ㄉㄨㄟˋ ㄩˊ ㄓㄜˋ ㄒㄧㄤˋ ㄓㄥˋ ㄘㄜˋ, ㄍㄜˋ ㄐㄧㄝˋ ㄖㄥˊ ㄧㄡˇ ㄊㄠˇ ㄌㄨㄣˋ. · Duìyú zhè xiàng zhèngcè, gèjiè réng yǒu tǎolùn.",
              "Regarding this policy, people are still debating it."
            ],
            [
              "票價不變。{然而}，班次減少了。",
              "ㄆㄧㄠˋ ㄐㄧㄚˋ ㄅㄨˊ ㄅㄧㄢˋ. ㄖㄢˊ ㄦˊ, ㄅㄢ ㄘˋ ㄐㄧㄢˇ ㄕㄠˇ ㄌㄜ˙. · Piàojià bú biàn. Rán'ér, bāncì jiǎnshǎo le.",
              "The fare is unchanged. However, there are fewer services."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "＿中央氣象署的資料，明天將有雨。",
          "en": "According to the Central Weather Administration…",
          "options": [
            "根據",
            "然而",
            "此外",
            "把"
          ],
          "answer": "根據",
          "why": "根據 introduces the source."
        },
        {
          "q": "班次不夠，＿市府加開班次。",
          "en": "Services were short, therefore the city added some.",
          "options": [
            "因此",
            "雖然",
            "嗎",
            "過"
          ],
          "answer": "因此",
          "why": "因此 is the written “therefore”."
        },
        {
          "q": "What does 此外 do?",
          "en": "",
          "options": [
            "Adds a further point",
            "Gives a reason like 因為",
            "Marks a completed action",
            "Asks a yes/no question"
          ],
          "answer": "Adds a further point",
          "why": "此外 means “in addition”."
        },
        {
          "q": "對於這項政策 means:",
          "en": "",
          "options": [
            "Regarding this policy",
            "Because of the weather",
            "Please close the window",
            "I have finished the video"
          ],
          "answer": "Regarding this policy",
          "why": "對於 names the topic in formal prose."
        },
        {
          "q": "Which connector is the written match for “however”?",
          "en": "",
          "options": [
            "然而",
            "因此",
            "根據",
            "完"
          ],
          "answer": "然而",
          "why": "然而 contrasts. 因此 concludes. 根據 cites a source."
        }
      ]
    },
    {
      "id": "bei-news",
      "level": "advanced-intermediate",
      "title": "被 — the news passive",
      "particle": "被",
      "summary": "被 says what was done to the subject. News copy uses it constantly.",
      "sections": [
        {
          "p": "<b>被</b> (bèi) promotes the thing affected and can name who did it: 提案被議會否決 “the proposal was rejected by the council”. In speech, people often avoid 被 unless something unfortunate happened. News uses it for neutral facts too.",
          "examples": [
            [
              "提案已{被}議會否決。",
              "ㄊㄧˊ ㄢˋ ㄧˇ ㄅㄟˋ ㄧˋ ㄏㄨㄟˋ ㄈㄡˇ ㄐㄩㄝˊ. · Tí'àn yǐ bèi yìhuì fǒujué.",
              "The proposal has been rejected by the council."
            ],
            [
              "乘客{被}要求改搭公車。",
              "ㄔㄥˊ ㄎㄜˋ ㄅㄟˋ ㄧㄠ ㄑㄧㄡˊ ㄍㄞˇ ㄉㄚ ㄍㄨㄥ ㄔㄜ. · Chéngkè bèi yāoqiú gǎi dā gōngchē.",
              "Passengers were asked to switch to buses."
            ],
            [
              "這部影片{被}下架了。",
              "ㄓㄜˋ ㄅㄨˋ ㄧㄥˇ ㄆㄧㄢˋ ㄅㄟˋ ㄒㄧㄚˋ ㄐㄧㄚˋ ㄌㄜ˙. · Zhè bù yǐngpiàn bèi xiàjià le.",
              "This video was taken down."
            ]
          ]
        },
        {
          "h": "把 beside 被",
          "p": "把 and 被 look at the same event from opposite sides. 議會把提案否決了 focuses on the council. 提案被議會否決 focuses on the proposal.",
          "examples": [
            [
              "議會{把}提案否決了。",
              "ㄧˋ ㄏㄨㄟˋ ㄅㄚˇ ㄊㄧˊ ㄢˋ ㄈㄡˇ ㄐㄩㄝˊ ㄌㄜ˙. · Yìhuì bǎ tí'àn fǒujué le.",
              "The council rejected the proposal."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "提案已被議會＿。",
          "en": "The proposal was rejected by the council.",
          "options": [
            "否決",
            "否決被",
            "很否決",
            "嗎否決"
          ],
          "answer": "否決",
          "why": "被 + (doer) + verb. 否決 is the verb."
        },
        {
          "q": "What does 這部影片被下架了 mean?",
          "en": "",
          "options": [
            "This video was taken down.",
            "I took the video down myself, focusing on me.",
            "The video took someone down.",
            "Will you take the video down?"
          ],
          "answer": "This video was taken down.",
          "why": "The video is the subject of 被. Who did it is left out."
        },
        {
          "q": "乘客被要求改搭公車。 The people affected are:",
          "en": "",
          "options": [
            "The passengers",
            "The buses",
            "The city government",
            "The weather service"
          ],
          "answer": "The passengers",
          "why": "What stands before 被 is the affected party."
        },
        {
          "q": "Which sentence focuses on the proposal, not the council?",
          "en": "",
          "options": [
            "提案被議會否決。",
            "議會把提案否決了。",
            "議會否決了提案。",
            "議會將否決提案。"
          ],
          "answer": "提案被議會否決。",
          "why": "被 makes the proposal the subject. 把 keeps the council as the subject."
        },
        {
          "q": "In everyday speech, 被 is most natural when:",
          "en": "",
          "options": [
            "Something unwelcome happens to the subject",
            "You say hello",
            "You ask a 嗎 question",
            "You link two nouns with 是"
          ],
          "answer": "Something unwelcome happens to the subject",
          "why": "Conversation prefers 被 for adversity. News also uses it for plain facts."
        }
      ]
    },
    {
      "id": "reporting",
      "level": "advanced-intermediate",
      "title": "表示, 指出, 認為 — reporting verbs",
      "particle": "表示",
      "summary": "News attributes a claim with 表示, 指出 or 認為 instead of 說.",
      "sections": [
        {
          "p": "Spoken Mandarin uses 說. A report uses <b>表示</b> (“stated”), <b>指出</b> (“pointed out”) and <b>認為</b> (“holds that”). The speaker comes first, then the verb, then the claim.",
          "examples": [
            [
              "市長{表示}，捷運將延長營運時間。",
              "ㄕˋ ㄓㄤˇ ㄅㄧㄠˇ ㄕˋ, ㄐㄧㄝˊ ㄩㄣˋ ㄐㄧㄤ ㄧㄢˊ ㄔㄤˊ ㄧㄥˊ ㄩㄣˋ ㄕˊ ㄐㄧㄢ. · Shìzhǎng biǎoshì, jiéyùn jiāng yáncháng yíngyùn shíjiān.",
              "The mayor stated that the MRT will run later."
            ],
            [
              "專家{指出}，空污已經改善。",
              "ㄓㄨㄢ ㄐㄧㄚ ㄓˇ ㄔㄨ, ㄎㄨㄥ ㄨ ㄧˇ ㄐㄧㄥ ㄍㄞˇ ㄕㄢˋ. · Zhuānjiā zhǐchū, kōngwū yǐjīng gǎishàn.",
              "Experts pointed out that air pollution has improved."
            ],
            [
              "不少人{認為}票價偏高。",
              "ㄅㄨˋ ㄕㄠˇ ㄖㄣˊ ㄖㄣˋ ㄨㄟˊ ㄆㄧㄠˋ ㄐㄧㄚˋ ㄆㄧㄢ ㄍㄠ. · Bùshǎo rén rènwéi piàojià piān gāo.",
              "Many people consider the fare high."
            ]
          ]
        },
        {
          "h": "說 beside 表示",
          "p": "說 is not wrong, but it sounds like conversation in the middle of a news paragraph. 表示 is the safe reporting verb.",
          "examples": [
            [
              "他{說}票價太高了。",
              "ㄊㄚ ㄕㄨㄛ ㄆㄧㄠˋ ㄐㄧㄚˋ ㄊㄞˋ ㄍㄠ ㄌㄜ˙. · Tā shuō piàojià tài gāo le.",
              "He said the fare is too high. (spoken)"
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "市長＿，捷運將延長營運。",
          "en": "The mayor stated that the MRT will run later.",
          "options": [
            "表示",
            "把",
            "過",
            "嗎"
          ],
          "answer": "表示",
          "why": "表示 attributes a statement in writing."
        },
        {
          "q": "專家指出，空污已經改善。 指出 means:",
          "en": "",
          "options": [
            "pointed out",
            "closed",
            "finished watching",
            "asked permission"
          ],
          "answer": "pointed out",
          "why": "指出 introduces a finding."
        },
        {
          "q": "Which verb is the spoken one, not the news one?",
          "en": "",
          "options": [
            "說",
            "表示",
            "指出",
            "認為"
          ],
          "answer": "說",
          "why": "說 is conversation. The other three are reporting verbs."
        },
        {
          "q": "不少人認為票價偏高 means:",
          "en": "",
          "options": [
            "Many people consider the fare high.",
            "The fare rejected many people.",
            "Please raise the fare.",
            "The fare is a video."
          ],
          "answer": "Many people consider the fare high.",
          "why": "認為 reports a judgment."
        },
        {
          "q": "How would a news line report the mayor's words?",
          "en": "",
          "options": [
            "市長表示，明日加開班次。",
            "市長說啦，明日加開班次喔。",
            "把市長表示班次。",
            "市長被班次表示。"
          ],
          "answer": "市長表示，明日加開班次。",
          "why": "Name + 表示 + the claim. Particles like 啦 and 喔 belong to speech."
        }
      ]
    },
    {
      "id": "written-time",
      "level": "advanced-intermediate",
      "title": "將, 已, 於 — written time",
      "particle": "將",
      "summary": "將, 已 and 於 pack time into a formal sentence.",
      "sections": [
        {
          "p": "Speech uses 會, 已經 and 在. Writing prefers <b>將</b> (will), <b>已</b> (already) and <b>於</b> (at / on). <b>將於</b> is “will, at [a time]”. <b>已於</b> is “already, on [a date]”.",
          "examples": [
            [
              "記者會{將於}週一上午舉行。",
              "ㄐㄧˋ ㄓㄜˇ ㄏㄨㄟˋ ㄐㄧㄤ ㄩˊ ㄓㄡ ㄧ ㄕㄤˋ ㄨˇ ㄐㄩˇ ㄒㄧㄥˊ. · Jìzhěhuì jiāng yú zhōuyī shàngwǔ jǔxíng.",
              "The press conference will be held on Monday morning."
            ],
            [
              "工程{已於}昨日完工。",
              "ㄍㄨㄥ ㄔㄥˊ ㄧˇ ㄩˊ ㄗㄨㄛˊ ㄖˋ ㄨㄢˊ ㄍㄨㄥ. · Gōngchéng yǐ yú zuórì wángōng.",
              "The work was already completed yesterday."
            ],
            [
              "捷運{將}延長營運。",
              "ㄐㄧㄝˊ ㄩㄣˋ ㄐㄧㄤ ㄧㄢˊ ㄔㄤˊ ㄧㄥˊ ㄩㄣˋ. · Jiéyùn jiāng yáncháng yíngyùn.",
              "The MRT will extend its hours."
            ]
          ]
        },
        {
          "h": "Not 不將",
          "p": "將 is not a verb you can negate with 不將. A spoken “won’t” is still 不會. 已 is the written twin of 已經.",
          "examples": [
            [
              "明天{不會}下雨。",
              "ㄇㄧㄥˊ ㄊㄧㄢ ㄅㄨˊ ㄏㄨㄟˋ ㄒㄧㄚˋ ㄩˇ. · Míngtiān bú huì xià yǔ.",
              "It won't rain tomorrow. (spoken negative)"
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "記者會＿週一上午舉行。",
          "en": "The press conference will be held on Monday morning.",
          "options": [
            "將於",
            "已於",
            "因為",
            "把"
          ],
          "answer": "將於",
          "why": "將於 is future plus the time phrase."
        },
        {
          "q": "工程已於昨日完工。 已於 means:",
          "en": "",
          "options": [
            "already, on (that date)",
            "will, if",
            "because of yesterday",
            "please finish"
          ],
          "answer": "already, on (that date)",
          "why": "已 is “already”; 於 pins the time."
        },
        {
          "q": "Which pair is speech, not a press release?",
          "en": "",
          "options": [
            "會 and 已經",
            "將 and 已",
            "將於 and 已於",
            "於 and 將"
          ],
          "answer": "會 and 已經",
          "why": "會 and 已經 are the spoken forms. 將 and 已 are written."
        },
        {
          "q": "How does a notice say the MRT will extend its hours?",
          "en": "",
          "options": [
            "捷運將延長營運。",
            "捷運不將延長營運。",
            "捷運延長將營運。",
            "把捷運將延長。"
          ],
          "answer": "捷運將延長營運。",
          "why": "將 sits before the verb phrase. 不將 is not the negative."
        },
        {
          "q": "明天不會下雨 uses 不會 because:",
          "en": "",
          "options": [
            "A future negative in speech is 不會, not 不將",
            "不會 means “already”",
            "不會 is a measure word",
            "不會 marks a passive"
          ],
          "answer": "A future negative in speech is 不會, not 不將",
          "why": "將 has no ordinary 不將 negative."
        }
      ]
    },
    {
      "id": "aspect-choice",
      "level": "advanced",
      "title": "了, 過, 著 — which aspect",
      "particle": "了",
      "summary": "了, 過 and 著 are not three ways to say the past. Each one picks out something different.",
      "sections": [
        {
          "p": "<b>了</b> after the verb ties the action to a completed instance, often a specific one. <b>過</b> says you have the experience, at least once, not which time. <b>著</b> (zhe) says a state is holding: a door standing open, a coat being worn.",
          "examples": [
            [
              "我昨天看{了}那部影片。",
              "ㄨㄛˇ ㄗㄨㄛˊ ㄊㄧㄢ ㄎㄢˋ ㄌㄜ˙ ㄋㄚˋ ㄅㄨˋ ㄧㄥˇ ㄆㄧㄢˋ. · Wǒ zuótiān kàn le nà bù yǐngpiàn.",
              "I watched that video yesterday. (that occasion)"
            ],
            [
              "我看{過}那部影片。",
              "ㄨㄛˇ ㄎㄢˋ ㄍㄨㄛ˙ ㄋㄚˋ ㄅㄨˋ ㄧㄥˇ ㄆㄧㄢˋ. · Wǒ kàn guo nà bù yǐngpiàn.",
              "I have seen that video. (sometime)"
            ],
            [
              "門開{著}。",
              "ㄇㄣˊ ㄎㄞ ㄓㄜ˙. · Mén kāi zhe.",
              "The door is open. (state)"
            ],
            [
              "他穿{著}外套。",
              "ㄊㄚ ㄔㄨㄢ ㄓㄜ˙ ㄨㄞˋ ㄊㄠˋ. · Tā chuān zhe wàitào.",
              "He is wearing a coat."
            ]
          ]
        },
        {
          "h": "Don't swap them",
          "p": "昨天 wants 了, not 過, when you mean that particular day. 過 does not like a single finished time nearly as much. 著 does not mean “finished”.",
          "examples": [
            [
              "我昨天看{了}那部影片。",
              "ㄨㄛˇ ㄗㄨㄛˊ ㄊㄧㄢ ㄎㄢˋ ㄌㄜ˙ ㄋㄚˋ ㄅㄨˋ ㄧㄥˇ ㄆㄧㄢˋ. · Wǒ zuótiān kàn le nà bù yǐngpiàn.",
              "Name the day, and 了 marks that occasion."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "我昨天看＿那部影片。",
          "en": "I watched that video yesterday (that time).",
          "options": [
            "了",
            "過",
            "著",
            "得"
          ],
          "answer": "了",
          "why": "A specific completed occasion, here yesterday, takes 了."
        },
        {
          "q": "我看＿那部影片。",
          "en": "I have seen that video at some point.",
          "options": [
            "過",
            "著",
            "得",
            "把"
          ],
          "answer": "過",
          "why": "過 is experience, not one dated occasion."
        },
        {
          "q": "門開＿。",
          "en": "The door is (standing) open.",
          "options": [
            "著",
            "過",
            "完",
            "把"
          ],
          "answer": "著",
          "why": "著 marks a continuing state."
        },
        {
          "q": "他穿著外套 means:",
          "en": "",
          "options": [
            "He is wearing a coat.",
            "He has worn a coat sometime.",
            "He finished the coat.",
            "He was asked to wear a coat."
          ],
          "answer": "He is wearing a coat.",
          "why": "穿著 is the state of having it on, not an experience 過."
        },
        {
          "q": "Which sentence is the odd one for “yesterday, that occasion”?",
          "en": "",
          "options": [
            "我昨天看過那部影片。",
            "我昨天看了那部影片。",
            "昨天我看了影片。",
            "我昨天看完了那部影片。"
          ],
          "answer": "我昨天看過那部影片。",
          "why": "過 is a poor match for one dated occasion. 了 and 完了 fit yesterday."
        }
      ]
    },
    {
      "id": "tw-particles",
      "level": "advanced",
      "title": "喔, 啦, 耶, 嘛, 齁 — Taiwan speech",
      "particle": "喔",
      "summary": "Sentence particles colour the tone. They are speech, not news copy.",
      "sections": [
        {
          "p": "These particles sit at the end and do not change the facts. <b>喔</b> softens and confirms: 好喔. <b>啦</b> urges, or marks something as settled: 來啦. <b>耶</b> shares a small surprise or a feeling: 真的耶. None of them is a yes/no question. That job belongs to 嗎.",
          "examples": [
            [
              "好，我知道了{喔}。",
              "ㄏㄠˇ, ㄨㄛˇ ㄓ ㄉㄠˋ ㄌㄜ˙ ㄛ. · Hǎo, wǒ zhīdào le ō.",
              "Okay, got it. (soft)"
            ],
            [
              "來{啦}！",
              "ㄌㄞˊ ㄌㄚ˙! · Lái la!",
              "Come on! / I'm coming!"
            ],
            [
              "真的{耶}。",
              "ㄓㄣ ㄉㄜ˙ ㄧㄝ˙. · Zhēn de ye.",
              "Oh, it really is."
            ]
          ]
        },
        {
          "h": "嘛 is not 嗎",
          "p": "<b>嘛</b> sounds like 嗎 but it coaxes or treats something as obvious: 你去嘛 “go on, go”. <b>齁</b> checks that the listener agrees. It is very common in Taiwan and rare in a textbook from elsewhere: 對齁 “right?”.",
          "examples": [
            [
              "你去{嘛}。",
              "ㄋㄧˇ ㄑㄩˋ ㄇㄚ˙. · Nǐ qù ma.",
              "Go on, just go."
            ],
            [
              "對{齁}？",
              "ㄉㄨㄟˋ ㄏㄡ? · Duì hōu?",
              "Right? / You know?"
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "好，我知道了＿。",
          "en": "Okay, got it — said softly.",
          "options": [
            "喔",
            "嗎",
            "被",
            "將"
          ],
          "answer": "喔",
          "why": "喔 softens. 嗎 would make it a question."
        },
        {
          "q": "來啦！ The 啦 is:",
          "en": "",
          "options": [
            "Urging, or marking it as settled",
            "A formal “therefore”",
            "A passive marker",
            "A measure word"
          ],
          "answer": "Urging, or marking it as settled",
          "why": "啦 is a spoken particle of urging or a new settled state."
        },
        {
          "q": "真的耶。 耶 signals:",
          "en": "",
          "options": [
            "A shared feeling or mild surprise",
            "That the action is finished",
            "The passive",
            "A news citation"
          ],
          "answer": "A shared feeling or mild surprise",
          "why": "耶 reacts. It does not mark aspect."
        },
        {
          "q": "你去嘛 vs 你去嗎？",
          "en": "",
          "options": [
            "嘛 coaxes; 嗎 asks yes or no",
            "They mean the same thing",
            "嘛 is written style; 嗎 is a tone mark",
            "嘛 means “already”"
          ],
          "answer": "嘛 coaxes; 嗎 asks yes or no",
          "why": "Same sound, different character and different job."
        },
        {
          "q": "Which particle is the Taiwan check “right?”",
          "en": "",
          "options": [
            "齁",
            "將",
            "於",
            "被"
          ],
          "answer": "齁",
          "why": "對齁 asks you to agree. 將, 於 and 被 are written grammar, not this particle."
        }
      ]
    },
    {
      "id": "de-di-de",
      "level": "advanced",
      "title": "的, 得, 地 — three de’s in writing",
      "particle": "的",
      "summary": "In speech they can all sound like de. Formal writing still splits them.",
      "sections": [
        {
          "p": "<b>的</b> comes before a noun: 我的朋友, 很貴的衣服. <b>地</b> comes before a verb and marks the adverb: 慢慢地說. <b>得</b> comes after a verb and starts the comment: 跑得很快. Careful prose keeps the three characters apart.",
          "examples": [
            [
              "我{的}朋友",
              "ㄨㄛˇ ㄉㄜ˙ ㄆㄥˊ ㄧㄡ˙ · wǒ de péngyou",
              "my friend (的 before a noun)"
            ],
            [
              "慢慢{地}說",
              "ㄇㄢˋ ㄇㄢ˙ ㄉㄜ˙ ㄕㄨㄛ · mànmàn de shuō",
              "speak slowly (地 before a verb)"
            ],
            [
              "他跑{得}很快。",
              "ㄊㄚ ㄆㄠˇ ㄉㄜ˙ ㄏㄣˇ ㄎㄨㄞˋ. · Tā pǎo de hěn kuài.",
              "He runs fast. (得 after the verb)"
            ]
          ]
        },
        {
          "h": "When it matters",
          "p": "Informal Taiwan writing often uses 的 for all three, and readers still understand. A news desk or a school essay is where the split still matters. The character 地 meaning “ground” is pronounced dì; the adverb particle is de.",
          "examples": [
            [
              "慢慢{地}走，不要跑{得}太快。",
              "ㄇㄢˋ ㄇㄢ˙ ㄉㄜ˙ ㄗㄡˇ, ㄅㄨˊ ㄧㄠˋ ㄆㄠˇ ㄉㄜ˙ ㄊㄞˋ ㄎㄨㄞˋ. · Mànmàn de zǒu, bú yào pǎo de tài kuài.",
              "Walk slowly, and don't run too fast."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "我＿朋友",
          "en": "my friend",
          "options": [
            "的",
            "得",
            "地",
            "了"
          ],
          "answer": "的",
          "why": "的 stands before the noun."
        },
        {
          "q": "慢慢＿說",
          "en": "speak slowly",
          "options": [
            "地",
            "得",
            "了",
            "過"
          ],
          "answer": "地",
          "why": "地 turns 慢慢 into the adverb of 說."
        },
        {
          "q": "他跑＿很快。",
          "en": "He runs fast.",
          "options": [
            "得",
            "的",
            "地",
            "著"
          ],
          "answer": "得",
          "why": "得 follows the verb and introduces the comment."
        },
        {
          "q": "In informal Taiwan messages, writers often:",
          "en": "",
          "options": [
            "Use 的 for all three and are still understood",
            "Must use 將 instead of 的",
            "Drop the verb",
            "Write only in Zhuyin"
          ],
          "answer": "Use 的 for all three and are still understood",
          "why": "The three-way split is a formal-writing rule. Chat often collapses it to 的."
        },
        {
          "q": "Which sentence would a careful editor mark?",
          "en": "",
          "options": [
            "他跑的很快。",
            "他跑得很快。",
            "我的朋友",
            "慢慢地說"
          ],
          "answer": "他跑的很快。",
          "why": "After the verb, the complement particle is 得, not the noun particle 的."
        }
      ]
    },
    {
      "id": "register",
      "level": "advanced",
      "title": "台灣說法 — word choice and register",
      "particle": "華語",
      "summary": "The grammar matches other Mandarin. A lot of the words, and the politeness, do not.",
      "sections": [
        {
          "p": "Use the Taiwan word when you are in Taiwan, even if a textbook from elsewhere taught another one. <b>捷運</b> is the metro, <b>計程車</b> is a taxi, <b>影片</b> is a video, <b>軟體</b> is software, <b>華語</b> (or 國語) is the language. <b>品質</b> is product quality. <b>資訊</b> is the usual word for information.",
          "examples": [
            [
              "我坐{捷運}，不說「地鐵」。",
              "ㄨㄛˇ ㄗㄨㄛˋ ㄐㄧㄝˊ ㄩㄣˋ. · Wǒ zuò jiéyùn.",
              "I take the MRT. 地鐵 is the other word."
            ],
            [
              "請幫我叫{計程車}。",
              "ㄑㄧㄥˇ ㄅㄤ ㄨㄛˇ ㄐㄧㄠˋ ㄐㄧˋ ㄔㄥˊ ㄔㄜ. · Qǐng bāng wǒ jiào jìchéngchē.",
              "Please call a taxi for me."
            ],
            [
              "這部{影片}很好看。",
              "ㄓㄜˋ ㄅㄨˋ ㄧㄥˇ ㄆㄧㄢˋ ㄏㄣˇ ㄏㄠˇ ㄎㄢˋ. · Zhè bù yǐngpiàn hěn hǎokàn.",
              "This video is really good."
            ]
          ]
        },
        {
          "h": "Polite, and the name of the language",
          "p": "<b>您</b> and <b>請問</b> raise the register with strangers and elders. 你 is fine with friends. 普通話 is the name used across the strait for the standard; in Taiwan the everyday names are 華語 and 國語. News style from the earlier lessons (將, 被, 表示) belongs in writing. 喔, 啦 and 齁 belong in speech.",
          "examples": [
            [
              "{請問}，{您}貴姓？",
              "ㄑㄧㄥˇ ㄨㄣˋ, ㄋㄧㄣˊ ㄍㄨㄟˋ ㄒㄧㄥˋ? · Qǐngwèn, nín guìxìng?",
              "May I ask your surname? (polite)"
            ],
            [
              "這個{軟體}的{品質}很好。",
              "ㄓㄜˋ ㄍㄜ˙ ㄖㄨㄢˇ ㄊㄧˇ ㄉㄜ˙ ㄆㄧㄣˇ ㄓˊ ㄏㄣˇ ㄏㄠˇ. · Zhège ruǎntǐ de pǐnzhí hěn hǎo.",
              "This software is good quality."
            ]
          ]
        }
      ],
      "drills": [
        {
          "q": "In Taipei, the metro is:",
          "en": "",
          "options": [
            "捷運",
            "地鐵",
            "視頻",
            "軟件"
          ],
          "answer": "捷運",
          "why": "捷運 is the Taiwan word. 地鐵 is used elsewhere."
        },
        {
          "q": "A video file is:",
          "en": "",
          "options": [
            "影片",
            "視頻",
            "計程車",
            "品質"
          ],
          "answer": "影片",
          "why": "影片 is the Taiwan word. 視頻 is mainland usage."
        },
        {
          "q": "Software is:",
          "en": "",
          "options": [
            "軟體",
            "軟件",
            "資訊",
            "便當"
          ],
          "answer": "軟體",
          "why": "軟體 is Taiwan usage. 軟件 is the other word."
        },
        {
          "q": "請問，您貴姓？ is:",
          "en": "",
          "options": [
            "A polite question to someone you should respect",
            "A way to talk to a close friend",
            "A news headline",
            "A tone mark"
          ],
          "answer": "A polite question to someone you should respect",
          "why": "請問 plus 您 is the polite register. Friends just use 你."
        },
        {
          "q": "Which pair fits a Taiwan news sentence about product quality?",
          "en": "",
          "options": [
            "品質 and 表示",
            "質量 and 視頻",
            "軟件 and 地鐵",
            "齁 and 啦"
          ],
          "answer": "品質 and 表示",
          "why": "品質 is quality, and 表示 is a reporting verb. 質量 is mass in Taiwan science class. 齁 and 啦 are speech."
        }
      ]
    }
  ]
};
