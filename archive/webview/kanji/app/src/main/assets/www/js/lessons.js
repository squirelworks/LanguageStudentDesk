// Original educational lessons inspired by TenguGo Kanji's structure.
// Prose is newly written for LanguageStudentDesk — not copied from TenguLogi.
// Every lesson lives in `beginning` (Character Learner lists that array), and
// `section` groups them into tracks in SquirrelGo Kanji's Lessons screen.
window.DESK_LESSONS = {
  howToUse: {
    id: "how_to_use",
    title: "How to use SquirrelGo Kanji",
    body: [
      "SquirrelGo Kanji follows a TenguGo-style path: short lessons, packet quizzes, review flashcards, on-yomi groups, and a dictionary.",
      "If you are new to kanji, start with Beginning Kanji. It covers how characters work and the JLPT N5 set (~80 characters).",
      "After that, use Quizzes by JLPT level or by topic. When you have a base vocabulary, open On-yomi Groups to learn shared Chinese-origin readings in clusters.",
      "Every quiz has a Review mode: meaning, on/kun readings, radical, strokes, frequency, grade, and JLPT tag.",
      "The Words tab on each kanji card lists common words that use it (from JMdict) and an example sentence (from Tatoeba). The word reading quiz tests those words: you see 学校 and pick がっこう.",
      "Past the beginning lessons there are four more tracks: Radicals at work, Reading skills, Look-alike kanji, and the JLPT N4 path.",
      "Progress is saved on this device (local storage)."
    ]
  },
  beginning: [
    {
      section: "Beginning Kanji",
      id: "lesson_1",
      title: "Lesson 1: How to learn kanji",
      body: [
        "Assume you already know hiragana and katakana. If not, practice those first in Character Learner.",
        "Authoritative dictionaries list tens of thousands of characters. Practical targets are the Jōyō list (~2,136) taught through Japanese schooling, or roughly 2,000 characters for JLPT N1.",
        "“Knowing” a character usually means: a core meaning, common kun readings (native Japanese), common on readings (Sino-Japanese), and words that use it.",
        "Do not grind every rare reading on day one. Learn meaning + one useful reading, then add readings when you meet them in words.",
        "SquirrelGo Kanji’s method: use radicals to parse meaning, follow JLPT order for coverage, and learn on readings through real words or on-yomi groups."
      ]
    },
    {
      section: "Beginning Kanji",
      id: "lesson_2",
      title: "Lesson 2: Origin of the kanji",
      body: [
        "Kanji (漢字, “Han characters”) came to Japan from China by way of Korea, with literacy taking root around the 5th century.",
        "Early Chinese writing includes oracle-bone inscriptions (Shang dynasty) and later bronze inscriptions — the oldest writing system still in everyday use.",
        "Many early graphs were pictographs (mountain 山, river 川, two 二, three 三). Over time, simpler parts (radicals) were combined for abstract ideas.",
        "Japanese developed two strategies: assign a native word’s sound as a kun reading when meanings matched, and keep approximations of Chinese pronunciations as on readings.",
        "Hiragana and katakana grew out of abbreviated kanji used phonetically. Context usually hints whether an on or kun reading applies."
      ]
    },
    {
      section: "Beginning Kanji",
      id: "lesson_3",
      title: "Lesson 3: First 10 kanji",
      body: [
        "These ten characters are common on their own and reappear as radicals inside harder characters.",
        "Focus first on meaning and the primary kun reading (a real Japanese word). Notice that kun verbs/adjectives often trail okurigana (hiragana after the character).",
        "After studying the list, take the Meaning quiz, then Meaning + Kun, then the Complete quiz."
      ],
      chars: ["人", "水", "手", "木", "口", "女", "山", "川", "日", "月"]
    },
    {
      section: "Beginning Kanji",
      id: "lesson_4",
      title: "Lesson 4: Introducing radicals",
      body: [
        "Radicals are recurring parts used to organize dictionaries and to hint at meaning or sound.",
        "Examples: 氵 (sanzui) relates to water; 亻 (ninben) relates to people; 木 can mean wood/tree when it stands alone or as a component.",
        "Learning the most frequent radicals early makes new characters feel compositional instead of random."
      ]
    },
    {
      section: "Beginning Kanji",
      id: "lesson_5",
      title: "Lesson 5: Structure of the kanji",
      body: [
        "Radicals sit in conventional positions. Left-side radicals are often called hen (偏); right-side ones tsukuri (旁).",
        "Example: 休 “rest” = person radical 亻 + 木. 動 “move” ends with the power radical 力 on the right.",
        "Some radicals change shape by position (人 → 亻 on the left). Spotting the variant is part of reading fluency."
      ]
    },
    {
      section: "Beginning Kanji",
      id: "lesson_6",
      title: "Lesson 6: First radicals to memorize",
      body: [
        "Priority shortlist: 人/亻 (person), 水/氵 (water), 木 (tree), 口 (mouth), 日 (sun/day), 月 (moon/month), 手/扌 (hand), 心/忄 (heart), 言 (speech), 糸 (thread).",
        "When you meet an unfamiliar character, ask: which radical is present, and does it suggest meaning or sound?"
      ]
    },
    {
      section: "Beginning Kanji",
      id: "lesson_7",
      title: "Lesson 7: Reading the kanji",
      body: [
        "Kun readings usually appear when a character stands alone as a native word (山 → やま) or with okurigana (食べる).",
        "On readings dominate in compounds of two or more characters (山水 → さんすい).",
        "There are exceptions (jukujikun, ateji). Still, the alone-vs-compound heuristic is a strong default."
      ]
    },
    {
      section: "Beginning Kanji",
      id: "lesson_8",
      title: "Lesson 8: Writing basics",
      body: [
        "General stroke tendencies: left → right, top → bottom, horizontal before vertical when they cross, outer frame before contents, close the frame last.",
        "Tap the writing animation at the top of any kanji card to watch it drawn again, and open the Strokes tab for a numbered, step-by-step chart of every stroke (stroke data from KanjiVG).",
        "For recognition and reading, correct stroke order helps memory but meaning + readings carry most of the workload."
      ]
    },
    {
      section: "Beginning Kanji",
      id: "lesson_9",
      title: "Lesson 9: Using dictionaries",
      body: [
        "Classic paper dictionaries index by radical + stroke count. Digital search also allows reading, meaning, and handwriting input.",
        "SquirrelGo Kanji’s dictionary lets you filter by JLPT level and search by character, meaning, or reading.",
        "Entry pages show on/kun, radical, strokes, school grade, frequency rank, and JLPT level when known."
      ]
    },
    {
      section: "Beginning Kanji",
      id: "lesson_10",
      title: "Lesson 10: What next",
      body: [
        "Finish the Beginning themed quizzes (numbers, location, people, time, adjectives, verbs, nature) and the full N5 packet.",
        "Next, Radicals at work shows the common building blocks inside real characters, and Reading skills covers okurigana, compounds, sound changes, special readings and counters.",
        "Look-alike kanji pairs up characters that are easy to confuse. The JLPT N4 path then takes you through the 170 N4 kanji in ten lessons, most frequent first.",
        "After that, climb the JLPT quizzes N3 → N1, or roam topic quizzes for vocabulary you care about.",
        "Use On-yomi Groups when you want to batch characters that share a phonetic component and reading."
      ]
    },
    {
      id: "radical_person",
      section: "Radicals at work",
      title: "Person: 亻",
      body: [
        "人 squeezes into 亻 (ninben) when it stands on the left. Characters with it are often about what people do or are.",
        "休 is a person leaning on a tree: rest. 体 (body) is a person plus 本, root. 住 is a person staying put: live.",
        "In 作, 使, 代 and 借 the person radical marks an action someone performs: make, use, stand in for, borrow."
      ],
      chars: ["休", "体", "何", "作", "使", "住", "代", "借", "仕", "位", "伝", "健"]
    },
    {
      id: "radical_water",
      section: "Radicals at work",
      title: "Water: 氵",
      body: [
        "水 becomes 氵 (sanzui, “three drops”) on the left. Seas, washing, flowing and liquids nearly all carry it.",
        "海 sea, 池 pond, 泳 swim, 洗 wash, 汗 sweat, 湯 hot water, 涙 tears: the meaning is in the radical, and the right side often gives the sound.",
        "漢 (as in 漢字) and 洋 (Western) took the radical from the names of rivers and oceans."
      ],
      chars: ["海", "池", "泳", "洗", "汗", "湯", "涙", "流", "消", "活", "注", "漢", "洋"]
    },
    {
      id: "radical_tree",
      section: "Radicals at work",
      title: "Tree: 木",
      body: [
        "木 alone is a tree. Two make 林 (grove), three make 森 (forest).",
        "On the left, 木 marks wooden things and plants: 板 board, 橋 bridge, 植 plant, 枝 branch, 根 root, 桜 cherry tree.",
        "校 (school) and 村 (village) keep the tree from older meanings: a wooden enclosure and a place with trees."
      ],
      chars: ["林", "森", "校", "村", "板", "橋", "植", "枝", "根", "桜", "横", "机"]
    },
    {
      id: "radical_mouth",
      section: "Radicals at work",
      title: "Mouth: 口",
      body: [
        "口 is an open mouth. As a radical it marks eating, breathing and making sounds.",
        "味 taste, 呼 call, 鳴 an animal's cry (mouth + bird), 吸 breathe in, 吹 blow, 叫 shout, 唱 chant.",
        "In 品 (goods) three mouths stand for many items, and in 問 (question) the mouth sits inside a gate."
      ],
      chars: ["口", "味", "呼", "鳴", "吸", "吹", "叫", "唱", "品", "問"]
    },
    {
      id: "radical_hand",
      section: "Radicals at work",
      title: "Hand: 扌",
      body: [
        "手 becomes 扌 (tehen) on the left. Almost every character with it is something you do with your hands.",
        "持 hold, 打 hit, 指 finger or point, 押 push, 払 pay, 投 throw, 拾 pick up, 折 fold, 招 beckon, 探 search, 抱 hug.",
        "When you meet a new 扌 character, guess a hand action first. You will usually be close."
      ],
      chars: ["手", "持", "打", "指", "押", "払", "投", "拾", "折", "招", "探", "抱"]
    },
    {
      id: "radical_heart",
      section: "Radicals at work",
      title: "Heart: 心 and 忄",
      body: [
        "心 (heart, mind) sits underneath a character, or stands up as 忄 on the left. Both mark feelings and thoughts.",
        "Below: 思 think, 意 intention, 悪 bad, 急 hurry, 感 feel, 忘 forget, 愛 love, 怒 anger, 悲 sad.",
        "On the left: 情 emotion, 快 pleasant, 性 nature. 忙 (busy) is a heart that is lost."
      ],
      chars: ["心", "思", "意", "悪", "急", "感", "忘", "愛", "怒", "悲", "情", "快", "性", "忙"]
    },
    {
      id: "radical_speech",
      section: "Radicals at work",
      title: "Words: 言",
      body: [
        "言 means say. On the left it marks speaking, language and records.",
        "話 talk, 読 read aloud, 語 language, 計 count, 試 try, 説 explain, 記 write down, 訳 translate, 調 investigate, 談 discuss, 議 debate.",
        "日本語 (Japanese language) and 会話 (conversation) are two words you will meet constantly."
      ],
      chars: ["言", "話", "読", "語", "計", "試", "説", "記", "訳", "調", "談", "議"]
    },
    {
      id: "radical_thread",
      section: "Radicals at work",
      title: "Thread: 糸",
      body: [
        "糸 is a twisted thread. On the left it marks cloth, lines, ties and anything that continues.",
        "紙 paper (made from fibres), 線 line, 続 continue, 終 end, 結 tie, 絵 picture, 組 group, 約 promise, 細 thin, 緑 green.",
        "The colours 緑 and 紅 come from dyed thread."
      ],
      chars: ["糸", "紙", "線", "続", "終", "結", "絵", "組", "約", "細", "給", "緑"]
    },
    {
      id: "radical_grass",
      section: "Radicals at work",
      title: "Grass: 艹",
      body: [
        "艹 (kusakanmuri, the grass crown) sits on top of plants, herbs and things made from them.",
        "花 flower, 茶 tea, 葉 leaf, 草 grass, 落 fall (leaves dropping), 薬 medicine (herbs), 菜 greens, 苦 bitter.",
        "英 (as in 英語, English) borrowed the grass radical from an old word for a flower."
      ],
      chars: ["花", "茶", "葉", "草", "若", "落", "薬", "菜", "英", "苦", "芸", "荷"]
    },
    {
      id: "radical_road",
      section: "Radicals at work",
      title: "Movement: 辶",
      body: [
        "辶 (shinnyō) wraps along the bottom left. It marks moving along a road.",
        "近 near, 遠 far, 通 pass through, 道 road, 送 send, 運 carry, 返 return, 進 advance, 遊 play, 速 fast, 遅 slow.",
        "週 (week) carries it too. Write 辶 last: the part it carries comes first."
      ],
      chars: ["近", "遠", "通", "道", "送", "運", "週", "返", "進", "遊", "速", "遅"]
    },
    {
      id: "radical_roof",
      section: "Radicals at work",
      title: "Roof: 宀",
      body: [
        "宀 (ukanmuri) is a roof. Characters under it are about homes and what is kept safe inside.",
        "家 house (a pig under a roof, from the days of farm households), 室 room, 宿 lodging, 客 guest, 寝 sleep, 宅 residence.",
        "安 (peace, cheap) is a woman safe at home. 守 protect and 定 settle keep the same idea."
      ],
      chars: ["家", "安", "室", "宿", "客", "寒", "寝", "定", "実", "守", "宅", "字"]
    },
    {
      id: "radical_metal",
      section: "Radicals at work",
      title: "Metal: 金 and 釒",
      body: [
        "金 is gold, money and metal. On the left it narrows to 釒.",
        "銀 silver, 鉄 iron, 銅 copper, 鏡 mirror (polished metal), 針 needle, 鍵 key, 鍋 pot, 録 record.",
        "金曜日 (Friday) is the metal day of the week."
      ],
      chars: ["金", "銀", "鉄", "銅", "鏡", "針", "鍵", "鍋", "録", "鈍"]
    },
    {
      id: "radical_woman",
      section: "Radicals at work",
      title: "Woman: 女",
      body: [
        "女 is a kneeling woman. As a radical it appears in family members and in some older words about people.",
        "姉 older sister, 妹 younger sister, 娘 daughter, 妻 wife, 婦 lady, 婚 marriage, 姓 surname.",
        "好 (like) is a woman with a child, and 始 (begin) has 女 too."
      ],
      chars: ["女", "好", "姉", "妹", "始", "娘", "妻", "婚", "婦", "姓"]
    },
    {
      id: "radical_fire",
      section: "Radicals at work",
      title: "Fire: 火 and 灬",
      body: [
        "火 keeps its shape on the left. Underneath a character it becomes four dots, 灬 (rekka).",
        "Left: 灯 lamp, 焼 burn or grill, 煙 smoke, 燃 burn. Top or doubled: 炎 flame.",
        "Below: 熱 heat, 点 point, 照 shine, 然 (as in 自然, nature)."
      ],
      chars: ["火", "灯", "焼", "煙", "燃", "炎", "熱", "点", "照", "然"]
    },
    {
      id: "radical_earth",
      section: "Radicals at work",
      title: "Earth: 土",
      body: [
        "土 is soil. On the left it marks ground and places.",
        "地 ground, 場 place, 坂 slope, 城 castle, 塩 salt, 境 border.",
        "In 堂 (hall) and 増 (increase) the earth radical is the ground something is built on or heaped up."
      ],
      chars: ["土", "地", "場", "坂", "城", "塩", "堂", "増", "境", "報"]
    },
    {
      id: "radical_flesh",
      section: "Radicals at work",
      title: "Flesh: 月 as 肉",
      body: [
        "Many characters with 月 on the left have nothing to do with the moon. That 月 is a squashed 肉, flesh.",
        "腕 arm, 腹 belly, 胸 chest, 背 back, 脳 brain, 肩 shoulder, 腰 hip, 肌 skin, 胃 stomach.",
        "If the 月 is on the left or bottom and the meaning is a body part, read it as flesh."
      ],
      chars: ["肉", "腕", "腹", "胸", "背", "脳", "肩", "腰", "肌", "胃", "育"]
    },
    {
      id: "skill_okurigana",
      section: "Reading skills",
      title: "Okurigana: the kana after a kanji",
      body: [
        "A verb or adjective writes its stem in kanji and its ending in hiragana: 食べる, 見る, 高い, 新しい. The trailing kana are okurigana.",
        "The okurigana tell you two things: that the kun reading is meant, and which word it is. 上がる (あがる, rise) and 上げる (あげる, raise) share a kanji and differ only in their endings.",
        "When the ending changes, the kanji stays: 食べる, 食べた, 食べない. Learn the kanji with its dictionary form and the rest follows.",
        "Open the Words tab on these kanji to see their verbs and adjectives with okurigana."
      ],
      chars: ["食", "見", "行", "来", "高", "新", "長", "少", "教", "起", "上", "下"]
    },
    {
      id: "skill_compounds",
      section: "Reading skills",
      title: "How compounds are built",
      body: [
        "Most kanji words are two characters read with on readings. Their parts relate in a few regular ways.",
        "Opposites: 上下 (up and down), 売買 (buying and selling), 男女 (men and women), 左右 (left and right).",
        "Same meaning twice: 森林 (forest), 道路 (road), 身体 (body). Describer first: 高山 (high mountain), 青空 (blue sky).",
        "Action then object: 読書 (reading books), 登山 (climbing mountains), 帰国 (returning home), 入学 (entering school).",
        "Negation in front: 不 (not), 無 (without), 未 (not yet), 非 (non-). 不安 unease, 無料 free of charge, 未来 future, 非常 emergency."
      ],
      chars: ["上", "下", "売", "買", "読", "登", "帰", "森", "不", "無", "未", "非"]
    },
    {
      id: "skill_sound_changes",
      section: "Reading skills",
      title: "Sound changes inside words",
      body: [
        "Readings bend when kanji join. Two changes cover most of what you will meet.",
        "Rendaku: the second part of a native compound often starts voiced. 手 (て) + 紙 (かみ) = 手紙 てがみ. 青 (あお) + 空 (そら) = あおぞら. 本 + 棚 = ほんだな.",
        "Doubling: an on reading ending in き, く, ち or つ often turns into small っ before k, s, t or p. 学 (がく) + 校 (こう) = がっこう. 一 (いち) + 本 (ほん) = いっぽん.",
        "H sounds turn into p after っ (一分 いっぷん, 一本 いっぽん) and often into b or p after ん (三本 さんぼん, 三分 さんぷん). Counting is where these show up most, so say counters out loud."
      ],
      chars: ["手", "紙", "青", "空", "学", "校", "一", "本", "分", "三"]
    },
    {
      id: "skill_special_readings",
      section: "Reading skills",
      title: "Special readings: 今日, 大人, 一人",
      body: [
        "Some words are read as a whole, not character by character. These are called jukujikun.",
        "今日 きょう (today), 明日 あした (tomorrow), 昨日 きのう (yesterday), 大人 おとな (adult), 一人 ひとり, 二人 ふたり, 上手 じょうず, 下手 へた.",
        "Others: 時計 とけい (clock), 果物 くだもの (fruit), 部屋 へや (room), 景色 けしき (scenery), 眼鏡 めがね (glasses).",
        "There is no rule to derive them, so learn each as a word. The good news is that the list of everyday ones is short."
      ],
      chars: ["今", "明", "昨", "大", "一", "二", "上", "下", "時", "果", "部", "景"]
    },
    {
      id: "skill_counters",
      section: "Reading skills",
      title: "Counters",
      body: [
        "Japanese counts things with a counter after the number, chosen by the shape or kind of thing.",
        "本 long thin things (bottles, pens), 枚 flat things (paper, shirts), 匹 small animals, 台 machines and vehicles, 冊 books, 個 small objects, 杯 cups and glasses.",
        "人 people (but 一人 ひとり and 二人 ふたり), 回 times, 階 floors, 歳 years of age, 円 yen.",
        "Many counters change sound with the number: 一本 いっぽん, 二本 にほん, 三本 さんぼん. Practise them in pairs with a number."
      ],
      chars: ["本", "枚", "匹", "台", "冊", "個", "杯", "人", "回", "階", "歳", "円"]
    },
    {
      id: "skill_calendar",
      section: "Reading skills",
      title: "Calendar and clock",
      body: [
        "The days of the week are the sun, the moon and the five elements: 日曜日, 月曜日, 火曜日, 水曜日, 木曜日, 金曜日, 土曜日.",
        "Months are numbers plus 月: 一月 (いちがつ) to 十二月. Years: 二〇二六年. Dates: 三日 みっか, 十日 とおか, and 一日 ついたち for the first of the month.",
        "Time: 時 o'clock, 分 minutes, 半 half past, 午前 a.m., 午後 p.m. 毎 every: 毎日, 毎週, 毎年.",
        "今 now, 先 previous, 来 next: 今週 this week, 先週 last week, 来週 next week."
      ],
      chars: ["日", "月", "火", "水", "木", "金", "土", "曜", "週", "年", "時", "分", "半", "午", "前", "後", "毎", "今", "先", "来"]
    },
    {
      id: "alike_strokes",
      section: "Look-alike kanji",
      title: "One stroke apart",
      body: [
        "These pairs differ by the length or position of a single stroke. Write each pair side by side.",
        "土 earth has a long bottom line; 士 samurai has a long top line. 未 not yet has a short top line; 末 end has a long one.",
        "千 thousand has a slanted top stroke; 干 dry has a flat one. 刀 sword ends in a hook; 力 power crosses through.",
        "人 person, 入 enter and 八 eight are all two strokes: 人 leans right, 入 leans left, 八 does not touch."
      ],
      chars: ["土", "士", "未", "末", "千", "干", "刀", "力", "人", "入", "八"]
    },
    {
      id: "alike_boxes",
      section: "Look-alike kanji",
      title: "Boxes: 日, 目, 白, 自",
      body: [
        "日 has one line inside, 目 has two. 白 (white) is 日 with a tick on top, 自 (self) is 目 with a tick on top, and 百 (hundred) puts a line over 白.",
        "田 rice field is a box cut into four. 由 reason pokes through the top, 申 say pokes through top and bottom.",
        "Count the inside lines and look for strokes that poke out. That is usually all it takes."
      ],
      chars: ["日", "目", "白", "自", "百", "田", "由", "申"]
    },
    {
      id: "alike_big",
      section: "Look-alike kanji",
      title: "Big, dog, fat, heaven",
      body: [
        "大 big is a person with arms spread. Add a dot and it changes: 犬 dog (dot top right), 太 fat (dot below).",
        "Add a line on top: 天 heaven (short line above), 夫 husband (line through the head).",
        "失 lose and 矢 arrow are close cousins of 夫. 王 king, 玉 jewel (with a dot) and 主 master (dot on top) are another set."
      ],
      chars: ["大", "犬", "太", "天", "夫", "失", "矢", "王", "玉", "主"]
    },
    {
      id: "alike_families",
      section: "Look-alike kanji",
      title: "Shared parts, different meanings",
      body: [
        "Some groups share a large part and differ in the radical. The radical gives the meaning, the shared part often gives the sound.",
        "門 gate family: 問 question (mouth at the gate), 間 interval (sun through the gate), 聞 hear (ear at the gate), 開 open, 閉 close, 関 barrier.",
        "寺 temple family: 時 time (sun), 持 hold (hand), 待 wait (going), 特 special (cow), 詩 poem (words). Here 寺 hints at the sound in 時 and 持 (じ) and 詩 (し), but not in 待 (たい) or 特 (とく).",
        "Quiz these together. Mixing them up in a quiz is how you stop mixing them up in reading."
      ],
      chars: ["問", "間", "聞", "開", "閉", "関", "寺", "時", "持", "待", "特", "詩"]
    },
    {
      id: "n4_1",
      section: "JLPT N4 path",
      title: "N4 part 1: 事有言…",
      body: [
        "Part 1 of 10 of the JLPT N4 kanji, ordered by how often they appear in Japanese text, so the most useful come first.",
        "Study each card's meaning and one reading, then check the Words tab: N4 is where most kanji are learned through words rather than alone.",
        "Take the meaning quiz first, then the word reading quiz."
      ],
      chars: ["事", "有", "言", "無", "物", "思", "私", "自", "場", "方", "考", "持", "知", "使", "多", "目", "作"]
    },
    {
      id: "n4_2",
      section: "JLPT N4 path",
      title: "N4 part 2: 題問手…",
      body: [
        "Part 2 of 10 of the JLPT N4 kanji, ordered by how often they appear in Japanese text, so the most useful come first.",
        "Study each card's meaning and one reading, then check the Words tab: N4 is where most kanji are learned through words rather than alone.",
        "Take the meaning quiz first, then the word reading quiz."
      ],
      chars: ["題", "問", "手", "同", "少", "仕", "者", "家", "教", "意", "味", "心", "特", "悪", "強", "買", "界"]
    },
    {
      id: "n4_3",
      section: "JLPT N4 path",
      title: "N4 part 3: 世図新…",
      body: [
        "Part 3 of 10 of the JLPT N4 kanji, ordered by how often they appear in Japanese text, so the most useful come first.",
        "Study each card's meaning and one reading, then check the Words tab: N4 is where most kanji are learned through words rather than alone.",
        "Take the meaning quiz first, then the word reading quiz."
      ],
      chars: ["世", "図", "新", "立", "体", "早", "風", "度", "開", "力", "写", "真", "口", "理", "会", "社", "重"]
    },
    {
      id: "n4_4",
      section: "JLPT N4 path",
      title: "N4 part 4: 飲屋可…",
      body: [
        "Part 4 of 10 of the JLPT N4 kanji, ordered by how often they appear in Japanese text, so the most useful come first.",
        "Study each card's meaning and one reading, then check the Words tab: N4 is where most kanji are learned through words rather than alone.",
        "Take the meaning quiz first, then the word reading quiz."
      ],
      chars: ["飲", "屋", "可", "通", "終", "待", "答", "身", "代", "地", "死", "音", "別", "的", "質", "始", "歩"]
    },
    {
      id: "n4_5",
      section: "JLPT N4 path",
      title: "N4 part 5: 切道夜…",
      body: [
        "Part 5 of 10 of the JLPT N4 kanji, ordered by how often they appear in Japanese text, so the most useful come first.",
        "Study each card's meaning and one reading, then check the Words tab: N4 is where most kanji are learned through words rather than alone.",
        "Take the meaning quiz first, then the word reading quiz."
      ],
      chars: ["切", "道", "夜", "花", "用", "足", "色", "起", "明", "送", "業", "走", "族", "止", "楽", "親", "品"]
    },
    {
      id: "n4_6",
      section: "JLPT N4 path",
      title: "N4 part 6: 近住京…",
      body: [
        "Part 6 of 10 of the JLPT N4 kanji, ordered by how often they appear in Japanese text, so the most useful come first.",
        "Study each card's meaning and one reading, then check the Words tab: N4 is where most kanji are learned through words rather than alone.",
        "Take the meaning quiz first, then the word reading quiz."
      ],
      chars: ["近", "住", "京", "店", "以", "動", "朝", "海", "広", "町", "院", "病", "元", "究", "研", "売", "料"]
    },
    {
      id: "n4_7",
      section: "JLPT N4 path",
      title: "N4 part 7: 歌正発…",
      body: [
        "Part 7 of 10 of the JLPT N4 kanji, ordered by how often they appear in Japanese text, so the most useful come first.",
        "Study each card's meaning and one reading, then check the Words tab: N4 is where most kanji are learned through words rather than alone.",
        "Take the meaning quiz first, then the word reading quiz."
      ],
      chars: ["歌", "正", "発", "験", "着", "夏", "去", "安", "急", "注", "映", "画", "空", "古", "犬", "字", "文"]
    },
    {
      id: "n4_8",
      section: "JLPT N4 path",
      title: "N4 part 8: 建集紙…",
      body: [
        "Part 8 of 10 of the JLPT N4 kanji, ordered by how often they appear in Japanese text, so the most useful come first.",
        "Study each card's meaning and one reading, then check the Words tab: N4 is where most kanji are learned through words rather than alone.",
        "Take the meaning quiz first, then the word reading quiz."
      ],
      chars: ["建", "集", "紙", "運", "英", "黒", "春", "不", "赤", "秋", "計", "冬", "旅", "魚", "借", "銀", "主"]
    },
    {
      id: "n4_9",
      section: "JLPT N4 path",
      title: "N4 part 9: 医野飯…",
      body: [
        "Part 9 of 10 of the JLPT N4 kanji, ordered by how often they appear in Japanese text, so the most useful come first.",
        "Study each card's meaning and one reading, then check the Words tab: N4 is where most kanji are learned through words rather than alone.",
        "Take the meaning quiz first, then the word reading quiz."
      ],
      chars: ["医", "野", "飯", "駅", "服", "試", "兄", "勉", "台", "員", "肉", "弟", "妹", "習", "転", "青", "鳥"]
    },
    {
      id: "n4_10",
      section: "JLPT N4 path",
      title: "N4 part 10: 週茶工…",
      body: [
        "Part 10 of 10 of the JLPT N4 kanji, ordered by how often they appear in Japanese text, so the most useful come first.",
        "Study each card's meaning and one reading, then check the Words tab: N4 is where most kanji are learned through words rather than alone.",
        "Take the meaning quiz first, then the word reading quiz."
      ],
      chars: ["週", "茶", "工", "公", "夕", "貸", "姉", "帰", "室", "昼", "漢", "館", "牛", "田", "曜", "洋", "堂"]
    }
  ]
};
