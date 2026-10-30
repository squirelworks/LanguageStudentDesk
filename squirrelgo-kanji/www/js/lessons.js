// Original educational lessons inspired by TenguGo Kanji's structure.
// Prose is newly written for LanguageStudentDesk — not copied from TenguLogi.
window.DESK_LESSONS = {
  howToUse: {
    id: "how_to_use",
    title: "How to use SquirrelGo Kanji",
    body: [
      "SquirrelGo Kanji follows a TenguGo-style path: short lessons, packet quizzes, review flashcards, on-yomi groups, and a dictionary.",
      "If you are new to kanji, start with Beginning Kanji. It covers how characters work and the JLPT N5 set (~80 characters).",
      "After that, use Quizzes by JLPT level or by topic. When you have a base vocabulary, open On-yomi Groups to learn shared Chinese-origin readings in clusters.",
      "Every quiz has a Review mode: meaning, on/kun readings, radical, strokes, frequency, grade, and JLPT tag.",
      "Progress is saved on this device (local storage)."
    ]
  },
  beginning: [
    {
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
      id: "lesson_4",
      title: "Lesson 4: Introducing radicals",
      body: [
        "Radicals are recurring parts used to organize dictionaries and to hint at meaning or sound.",
        "Examples: 氵 (sanzui) relates to water; 亻 (ninben) relates to people; 木 can mean wood/tree when it stands alone or as a component.",
        "Learning the most frequent radicals early makes new characters feel compositional instead of random."
      ]
    },
    {
      id: "lesson_5",
      title: "Lesson 5: Structure of the kanji",
      body: [
        "Radicals sit in conventional positions. Left-side radicals are often called hen (偏); right-side ones tsukuri (旁).",
        "Example: 休 “rest” = person radical 亻 + 木. 動 “move” ends with the power radical 力 on the right.",
        "Some radicals change shape by position (人 → 亻 on the left). Spotting the variant is part of reading fluency."
      ]
    },
    {
      id: "lesson_6",
      title: "Lesson 6: First radicals to memorize",
      body: [
        "Priority shortlist: 人/亻 (person), 水/氵 (water), 木 (tree), 口 (mouth), 日 (sun/day), 月 (moon/month), 手/扌 (hand), 心/忄 (heart), 言 (speech), 糸 (thread).",
        "When you meet an unfamiliar character, ask: which radical is present, and does it suggest meaning or sound?"
      ]
    },
    {
      id: "lesson_7",
      title: "Lesson 7: Reading the kanji",
      body: [
        "Kun readings usually appear when a character stands alone as a native word (山 → やま) or with okurigana (食べる).",
        "On readings dominate in compounds of two or more characters (山水 → さんすい).",
        "There are exceptions (jukujikun, ateji). Still, the alone-vs-compound heuristic is a strong default."
      ]
    },
    {
      id: "lesson_8",
      title: "Lesson 8: Writing basics",
      body: [
        "General stroke tendencies: left → right, top → bottom, horizontal before vertical when they cross, outer frame before contents, close the frame last.",
        "SquirrelGo Kanji does not include stroke-order animation yet; pair this app with a stroke-order reference when handwriting matters.",
        "For recognition and reading, correct stroke order helps memory but meaning + readings carry most of the workload."
      ]
    },
    {
      id: "lesson_9",
      title: "Lesson 9: Using dictionaries",
      body: [
        "Classic paper dictionaries index by radical + stroke count. Digital search also allows reading, meaning, and handwriting input.",
        "SquirrelGo Kanji’s dictionary lets you filter by JLPT level and search by character, meaning, or reading.",
        "Entry pages show on/kun, radical, strokes, school grade, frequency rank, and JLPT level when known."
      ]
    },
    {
      id: "lesson_10",
      title: "Lesson 10: What next",
      body: [
        "Finish the Beginning themed quizzes (numbers, location, people, time, adjectives, verbs, nature) and the full N5 packet.",
        "Then climb JLPT quizzes N4 → N1, or roam topic quizzes for vocabulary you care about.",
        "Use On-yomi Groups when you want to batch characters that share a phonetic component and reading."
      ]
    }
  ]
};
