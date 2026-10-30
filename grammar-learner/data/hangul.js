// Korean particles and polite endings for the Grammar Learner. Written for this project.
// Examples are [Korean, romanization, English]; {braces} mark the particle or ending.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.hangul = {
  title: "Korean particles and polite endings",
  intro: "Korean puts the verb last and marks each noun's job with a particle stuck to its end, much like Japanese. Most particles come in two shapes: one after a consonant (a block ending in a bottom letter, 받침) and one after a vowel. Verbs end in a polite -요 form that works with almost anyone you meet. Romanization follows the Revised Romanization of Korean.",
  lessons: [
    {
      id: "eun-neun",
      title: "은/는 — the topic",
      particle: "은 / 는",
      summary: "What the sentence is about: 은 after a consonant, 는 after a vowel.",
      sections: [
        {
          p: "은/는 marks the topic: “as for X, …”. Use <b>는</b> when the noun ends in a vowel and <b>은</b> when it ends in a consonant (the block has a bottom letter).",
          examples: [
            ["저{는} 학생이에요.", "Jeo-neun haksaeng-ieyo.", "I am a student. (As for me, student.)"],
            ["이름{은} 민준이에요.", "Ireum-eun Minjun-ieyo.", "My name is Minjun."],
            ["오늘{은} 추워요.", "Oneul-eun chuwoyo.", "It's cold today."],
          ],
        },
        {
          h: "Contrast",
          p: "Like Japanese は, 은/는 also contrasts: “this one, but not that one”.",
          examples: [["커피{는} 좋아해요. 차{는} 안 좋아해요.", "Keopi-neun joahaeyo. Cha-neun an joahaeyo.", "Coffee I like. Tea I don't."]],
        },
      ],
      drills: [
        { q: "저＿ 의사예요.", en: "I am a doctor.", options: ["는", "은", "를", "에"], answer: "는", why: "저 ends in a vowel, so the topic particle is 는." },
        { q: "책＿ 비싸요.", en: "The book is expensive.", options: ["은", "는", "를", "에서"], answer: "은", why: "책 ends in the consonant ㄱ, so the topic particle is 은." },
        { q: "한국어＿ 재미있어요.", en: "Korean is fun.", options: ["는", "은", "을", "에"], answer: "는", why: "한국어 ends in 어, a vowel: 는." },
        { q: "서울＿ 커요.", en: "Seoul is big.", options: ["은", "는", "이에요", "를"], answer: "은", why: "서울 ends in ㄹ, a consonant: 은." },
        { q: "Which noun takes 은 rather than 는?", en: "", options: ["물 (water)", "나 (I)", "학교 (school)", "커피 (coffee)"], answer: "물 (water)", why: "물 ends in the consonant ㄹ; the others end in vowels." },
      ],
    },
    {
      id: "i-ga",
      title: "이/가 — the subject",
      particle: "이 / 가",
      summary: "Who or what does it, especially new information: 이 after a consonant, 가 after a vowel.",
      sections: [
        {
          p: "이/가 marks the subject. Reach for it when something is new to the conversation, when you say something exists or is missing (있어요, 없어요), and with question words like 누가 (who).",
          examples: [
            ["고양이{가} 있어요.", "Goyang-i-ga isseoyo.", "There is a cat."],
            ["물{이} 없어요.", "Mur-i eopseoyo.", "There's no water."],
            ["누{가} 왔어요?", "Nu-ga wasseoyo?", "Who came?"],
          ],
        },
        {
          h: "은/는 or 이/가?",
          p: "은/는 says “talking about X…”; 이/가 points at X as the one. A question word is never the topic, so it always takes 이/가 — and so does the answer to it.",
          examples: [["민지{가} 왔어요.", "Minji-ga wasseoyo.", "Minji came. (Minji is the one who came.)"]],
        },
      ],
      drills: [
        { q: "시간＿ 없어요.", en: "There's no time.", options: ["이", "가", "를", "에"], answer: "이", why: "시간 ends in ㄴ, a consonant, and 없어요 (there isn't) takes the subject particle: 이." },
        { q: "친구＿ 있어요.", en: "I have a friend. (A friend exists.)", options: ["가", "이", "을", "는"], answer: "가", why: "친구 ends in a vowel: 가. Existence with 있어요 uses the subject particle." },
        { q: "누＿ 전화했어요?", en: "Who called?", options: ["가", "는", "를", "에"], answer: "가", why: "Question words take the subject particle: 누가. They are never the topic." },
        { q: "가방＿ 무거워요.", en: "The bag is heavy.", options: ["이", "가", "을", "에서"], answer: "이", why: "가방 ends in ㅇ, a consonant: 이." },
        { q: "Someone asks “Who is the teacher?” The best answer starts…", en: "", options: ["제가 선생님이에요.", "저는 선생님이에요."], answer: "제가 선생님이에요.", why: "The answer to “who?” is new information, so it takes 이/가 (저 + 가 becomes 제가)." },
      ],
    },
    {
      id: "eul-reul",
      title: "을/를 — the object",
      particle: "을 / 를",
      summary: "What the action is done to: 을 after a consonant, 를 after a vowel.",
      sections: [
        {
          p: "을/를 marks the direct object. The usual order is subject – object – verb, with the verb always at the end.",
          examples: [
            ["빵{을} 먹어요.", "Ppang-eul meogeoyo.", "I eat bread."],
            ["커피{를} 마셔요.", "Keopi-reul masyeoyo.", "I drink coffee."],
            ["저는 영화{를} 봐요.", "Jeo-neun yeonghwa-reul bwayo.", "I watch a movie."],
          ],
        },
        {
          h: "Free word order",
          p: "Because the particles carry the roles, the nouns can move around as long as the verb stays last: 커피를 민지가 마셔요 still means “Minji drinks coffee”.",
        },
      ],
      drills: [
        { q: "물＿ 마셔요.", en: "I drink water.", options: ["을", "를", "이", "에"], answer: "을", why: "물 ends in ㄹ, a consonant, and it is what you drink: 을." },
        { q: "사과＿ 먹어요.", en: "I eat an apple.", options: ["를", "을", "가", "에서"], answer: "를", why: "사과 ends in a vowel: 를." },
        { q: "한국어＿ 공부해요.", en: "I study Korean.", options: ["를", "을", "는", "에"], answer: "를", why: "한국어 ends in a vowel and is the object of study: 를." },
        { q: "책＿ 읽어요.", en: "I read a book.", options: ["을", "를", "이", "에"], answer: "을", why: "책 ends in ㄱ: 을." },
        { q: "In “음악을 민수가 들어요”, who listens?", en: "음악 = music, 듣다 = listen", options: ["민수", "음악"], answer: "민수", why: "가 marks the subject (민수); 을 marks the object (음악), whatever the order." },
      ],
    },
    {
      id: "e-eseo",
      title: "에 and 에서 — where and when",
      particle: "에 / 에서",
      summary: "에 for where you go, where something is, and the time. 에서 for where an action happens.",
      sections: [
        {
          p: "<b>에</b> points at a destination, a place where something simply is, or a time. It has one shape for every noun.",
          examples: [
            ["학교{에} 가요.", "Hakgyo-e gayo.", "I go to school."],
            ["집{에} 있어요.", "Jib-e isseoyo.", "I'm at home."],
            ["세 시{에} 만나요.", "Se si-e mannayo.", "Let's meet at three."],
          ],
        },
        {
          h: "에서: where the action happens",
          p: "<b>에서</b> marks the place where you <i>do</i> something. Being somewhere takes 에; doing something there takes 에서. 에서 also means “from” a place.",
          examples: [
            ["도서관{에서} 공부해요.", "Doseogwan-eseo gongbuhaeyo.", "I study at the library."],
            ["부산{에서} 왔어요.", "Busan-eseo wasseoyo.", "I came from Busan."],
          ],
        },
      ],
      drills: [
        { q: "회사＿ 가요.", en: "I go to the office.", options: ["에", "에서", "를", "은"], answer: "에", why: "A destination after 가다 (go) takes 에." },
        { q: "식당＿ 밥을 먹어요.", en: "I eat at a restaurant.", options: ["에서", "에", "이", "를"], answer: "에서", why: "Eating is an action, and the restaurant is where it happens: 에서." },
        { q: "고양이가 방＿ 있어요.", en: "The cat is in the room.", options: ["에", "에서", "을", "는"], answer: "에", why: "있어요 just says where something is, so it takes 에." },
        { q: "일곱 시＿ 일어나요.", en: "I get up at seven.", options: ["에", "에서", "가", "를"], answer: "에", why: "Times take 에." },
        { q: "공원＿ 운동해요.", en: "I exercise in the park.", options: ["에서", "에", "은", "이"], answer: "에서", why: "Exercising is an action done in the park: 에서." },
        { q: "미국＿ 왔어요.", en: "I came from America.", options: ["에서", "에", "를", "이"], answer: "에서", why: "“From” a place is 에서." },
      ],
    },
    {
      id: "ayo-eoyo",
      title: "-아요/-어요 — the polite present",
      particle: "-아요 / -어요 / -해요",
      summary: "Drop -다, then add -아요 or -어요 depending on the last vowel. 하다 becomes 해요.",
      sections: [
        {
          p: "Dictionary forms end in -다. Remove it to get the stem. If the stem's last vowel is <b>ㅏ or ㅗ</b>, add -아요; otherwise add -어요. Any verb ending in 하다 becomes <b>해요</b>. The same form is a statement or, with rising intonation, a question.",
          examples: [
            ["좋다 → 좋{아요}", "jota → joayo", "It's good."],
            ["먹다 → 먹{어요}", "meokda → meogeoyo", "I eat."],
            ["공부하다 → 공부{해요}", "gongbuhada → gongbuhaeyo", "I study."],
          ],
        },
        {
          h: "Vowels that merge",
          p: "When the stem ends in a vowel, the two vowels squeeze together: 가 + 아요 → 가요, 오 + 아요 → 와요, 마시 + 어요 → 마셔요, 주 + 어요 → 줘요.",
          examples: [
            ["가다 → {가요}", "gada → gayo", "I go."],
            ["오다 → {와요}", "oda → wayo", "I come."],
            ["마시다 → {마셔요}", "masida → masyeoyo", "I drink."],
          ],
        },
      ],
      drills: [
        { q: "앉다 (sit) → ？", en: "Polite present", options: ["앉아요", "앉어요", "앉해요", "앉요"], answer: "앉아요", why: "The stem 앉 has ㅏ, so it takes -아요." },
        { q: "읽다 (read) → ？", en: "Polite present", options: ["읽어요", "읽아요", "읽해요", "읽요"], answer: "읽어요", why: "The stem 읽 has ㅣ, not ㅏ or ㅗ: -어요." },
        { q: "일하다 (work) → ？", en: "Polite present", options: ["일해요", "일하어요", "일하아요", "일어요"], answer: "일해요", why: "Every 하다 verb becomes 해요." },
        { q: "보다 (see) → ？", en: "Polite present", options: ["봐요", "보어요", "벼요", "보해요"], answer: "봐요", why: "ㅗ takes -아요, and 보 + 아요 merges into 봐요." },
        { q: "마시다 (drink) → ？", en: "Polite present", options: ["마셔요", "마시아요", "마사요", "마시해요"], answer: "마셔요", why: "ㅣ takes -어요, and 시 + 어 merges into 셔: 마셔요." },
        { q: "How do you ask “Do you eat?” politely?", en: "", options: ["먹어요?", "먹다?", "먹어?요", "먹요?"], answer: "먹어요?", why: "The polite form doubles as a question: same ending, rising voice." },
      ],
    },
    {
      id: "copula",
      title: "이에요/예요 — “to be” a thing",
      particle: "이에요 / 예요 / 아니에요",
      summary: "“X is a Y”: 이에요 after a consonant, 예요 after a vowel. “Is not” is 아니에요.",
      sections: [
        {
          p: "To say what something <i>is</i>, attach the polite copula straight to the noun: <b>이에요</b> after a consonant, <b>예요</b> after a vowel.",
          examples: [
            ["저는 학생{이에요}.", "Jeo-neun haksaeng-ieyo.", "I am a student."],
            ["이건 커피{예요}.", "Igeon keopi-yeyo.", "This is coffee."],
          ],
        },
        {
          h: "Saying “is not”",
          p: "The negative is a separate word, <b>아니에요</b>, and the noun before it takes 이/가.",
          examples: [["저는 학생이 {아니에요}.", "Jeo-neun haksaeng-i anieyo.", "I am not a student."]],
        },
      ],
      drills: [
        { q: "저는 선생님＿.", en: "I am a teacher.", options: ["이에요", "예요", "아니에요", "을"], answer: "이에요", why: "선생님 ends in the consonant ㅁ: 이에요." },
        { q: "이건 우유＿.", en: "This is milk.", options: ["예요", "이에요", "를", "에"], answer: "예요", why: "우유 ends in a vowel: 예요." },
        { q: "저는 의사＿ 아니에요.", en: "I'm not a doctor.", options: ["가", "이", "를", "예요"], answer: "가", why: "Before 아니에요 the noun takes 이/가; 의사 ends in a vowel, so 가." },
        { q: "여기는 서울＿.", en: "This is Seoul.", options: ["이에요", "예요", "에", "을"], answer: "이에요", why: "서울 ends in ㄹ, a consonant: 이에요." },
        { q: "Which means “It's not water”?", en: "물 = water", options: ["물이 아니에요.", "물이에요.", "물을 아니에요.", "물예요."], answer: "물이 아니에요.", why: "Negative copula: noun + 이/가 + 아니에요." },
      ],
    },
  ],
};
