// Korean particles and polite endings for the Grammar Learner. Written for this project.
// Examples are [Korean, romanization, English]; {braces} mark the particle or ending.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
//
// Sources (open / educational; attested constructions — original example sentences):
// - National Institute of Korean Language (국립국어원) grammar notes and 표준국어대사전
//   entries for particles, -았/었-, 안/못, -고 싶다, -(으)ㄹ 것이다, -고 있다, -고/-지만/-아서·어서
//   (public educational reference material).
// - Wiktionary Korean lemmas and “Korean grammar” overview (CC BY-SA): 은/는, 이/가, 을/를,
//   에/에서, -아요/-어요, 이다, past, negation, desire, prospective, progressive, connectors.
// - Wikipedia “Korean grammar” / “Revised Romanization of Korean” (CC BY-SA) for overview
//   and romanization; romanization in this file follows RR.
// - In-repo languages/hangul/reference.json past-negative, want, future, connectors cards
//   (same beginner seam; examples here are original).
// Lessons 1–6 unchanged; 7–12 deepen the beginner seam (past, negation, want, future,
// progressive, clause connectors).
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.hangul = {
  title: "Korean particles and polite endings",
  intro: "Korean puts the verb last and marks each noun's job with a particle stuck to its end, much like Japanese. Most particles come in two shapes: one after a consonant (a block ending in a bottom letter, 받침) and one after a vowel. Lessons 1–6 cover 은/는, 이/가, 을/를, 에/에서, the polite -아요/-어요 present, and 이에요/예요. Lessons 7–12 add the polite past, 안/못, -고 싶어요, -(으)ㄹ 거예요, -고 있어요, and clause connectors. Romanization follows the Revised Romanization of Korean.",
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
    {
      id: "past",
      title: "-았어요/-었어요 — the polite past",
      particle: "-았어요 / -었어요 / -했어요",
      summary: "Same vowel rule as the present: ㅏ/ㅗ stems take -았어요; others take -었어요. 하다 becomes 했어요.",
      sections: [
        {
          p: "To talk about the past in the polite -요 style, replace -아요/-어요 with <b>-았어요/-었어요</b>. The vowel rule is the same as the present: last vowel <b>ㅏ or ㅗ</b> → -았어요; otherwise → -었어요. Every 하다 verb becomes <b>했어요</b>.",
          examples: [
            ["어제 영화를 {봤어요}.", "Eoje yeonghwa-reul bwasseoyo.", "I watched a film yesterday."],
            ["밥을 {먹었어요}.", "Bab-eul meogeosseoyo.", "I ate (a meal)."],
            ["공부{했어요}.", "Gongbuhaesseoyo.", "I studied."],
          ],
        },
        {
          h: "Vowels that merge",
          p: "Stems that end in a vowel squeeze the same way as in the present: 가 + 았어요 → 갔어요, 오 + 았어요 → 왔어요, 보 + 았어요 → 봤어요, 마시 + 었어요 → 마셨어요.",
          examples: [
            ["학교에 {갔어요}.", "Hakgyo-e gasseoyo.", "I went to school."],
            ["친구가 {왔어요}.", "Chingu-ga wasseoyo.", "A friend came."],
            ["커피를 {마셨어요}.", "Keopi-reul masyeosseoyo.", "I drank coffee."],
          ],
        },
      ],
      drills: [
        { q: "앉다 (sit) → ？", en: "Polite past", options: ["앉았어요", "앉었어요", "앉했어요", "앉아요"], answer: "앉았어요", why: "Stem 앉 has ㅏ, so the past is -았어요." },
        { q: "읽다 (read) → ？", en: "Polite past", options: ["읽었어요", "읽았어요", "읽했어요", "읽어요"], answer: "읽었어요", why: "Stem 읽 has ㅣ: -었어요." },
        { q: "일하다 (work) → ？", en: "Polite past", options: ["일했어요", "일하았어요", "일하었어요", "일해요"], answer: "일했어요", why: "Every 하다 verb becomes 했어요 in the past." },
        { q: "보다 (see) → ？", en: "Polite past", options: ["봤어요", "보았어요", "보었어요", "봤아요"], answer: "봤어요", why: "보 + 았어요 merges to 봤어요." },
        { q: "How do you say “I went” politely?", en: "가다 = go", options: ["갔어요", "가요", "갈 거예요", "가고 있어요"], answer: "갔어요", why: "가 + 았어요 → 갔어요." },
      ],
    },
    {
      id: "an-mot",
      title: "안 and 못 — not, and can't",
      particle: "안 / 못 / -지 않아요",
      summary: "안 before the verb means “not”; 못 means “can't / couldn't”. -지 않아요 is a longer “not”.",
      sections: [
        {
          p: "Put <b>안</b> right before the verb to negate it: 안 가요 “I'm not going”. A longer equivalent is stem + <b>-지 않아요</b>: 가지 않아요. With 하다 verbs, 안 usually sits before 하다: 공부 안 해요.",
          examples: [
            ["오늘 {안} 가요.", "Oneul an gayo.", "I'm not going today."],
            ["고기를 먹{지 않아요}.", "Gogi-reul meokji anayo.", "I don't eat meat."],
            ["공부 {안} 해요.", "Gongbu an haeyo.", "I'm not studying."],
          ],
        },
        {
          h: "못 — can't",
          p: "<b>못</b> before the verb means you are unable to do it (or couldn't): 못 가요 “I can't go”. Do not mix 안 and 못 for the same meaning — 안 is refusal or simple negation; 못 is inability.",
          examples: [
            ["수영을 {못} 해요.", "Suyeong-eul mot haeyo.", "I can't swim."],
            ["어제 회의에 {못} 갔어요.", "Eoje hoeui-e mot gasseoyo.", "I couldn't go to the meeting yesterday."],
          ],
        },
      ],
      drills: [
        { q: "오늘 영화를 ＿ 봐요.", en: "I'm not watching a film today.", options: ["안", "못", "을", "도"], answer: "안", why: "Simple “not”: 안 before the verb." },
        { q: "한국어를 잘 ＿ 해요.", en: "I can't speak Korean well. (unable)", options: ["못", "안", "은", "를"], answer: "못", why: "Inability: 못." },
        { q: "고기를 먹＿.", en: "I don't eat meat. (long form)", options: ["지 않아요", "고 싶어요", "고 있어요", "을 거예요"], answer: "지 않아요", why: "Stem + -지 않아요 is the long negation." },
        { q: "How do you say “I'm not studying” with 하다?", en: "", options: ["공부 안 해요.", "안 공부해요.", "공부 못 안 해요.", "공부해요 안."], answer: "공부 안 해요.", why: "With 하다, 안 goes before 하다: 공부 안 해요." },
        { q: "Which means “I couldn't go”?", en: "", options: ["못 갔어요.", "안 가요.", "갈 거예요.", "가고 싶어요."], answer: "못 갔어요.", why: "못 + past: couldn't." },
      ],
    },
    {
      id: "go-sipeoyo",
      title: "-고 싶어요 — want to",
      particle: "-고 싶어요",
      summary: "Add -고 싶어요 to the verb stem for what you want to do. For other people, use -고 싶어해요.",
      sections: [
        {
          p: "Drop -다 from the dictionary form and add <b>-고 싶어요</b> to say what <i>you</i> want to do. The object still takes 을/를 when there is one.",
          examples: [
            ["비빔밥을 먹{고 싶어요}.", "Bibimbap-eul meokgo sipeoyo.", "I want to eat bibimbap."],
            ["한국에 가{고 싶어요}.", "Hangug-e gago sipeoyo.", "I want to go to Korea."],
            ["한국어를 배우{고 싶어요}.", "Hangugeo-reul baeugo sipeoyo.", "I want to learn Korean."],
          ],
        },
        {
          h: "Other people's wants",
          p: "For someone else's desire, Korean prefers <b>-고 싶어해요</b>: 민수가 가고 싶어해요 “Minsu wants to go”. Negate with 안 before 싶어요: 가고 싶지 않아요 / 안 가고 싶어요.",
          examples: [
            ["민수가 커피를 마시{고 싶어해요}.", "Minsu-ga keopi-reul masigo sipeohaeyo.", "Minsu wants to drink coffee."],
            ["지금 자고 싶{지 않아요}.", "Jigeum jago sipji anayo.", "I don't want to sleep right now."],
          ],
        },
      ],
      drills: [
        { q: "물을 마시＿.", en: "I want to drink water.", options: ["고 싶어요", "고 있어요", "을 거예요", "지 않아요"], answer: "고 싶어요", why: "Stem + -고 싶어요 = want to." },
        { q: "집에 가＿.", en: "I want to go home.", options: ["고 싶어요", "았어요", "고 있어요", "지만"], answer: "고 싶어요", why: "가다 → 가고 싶어요." },
        { q: "How do you say “I want to study”?", en: "공부하다 = study", options: ["공부하고 싶어요.", "공부 안 해요.", "공부했어요.", "공부할 거예요."], answer: "공부하고 싶어요.", why: "하다 stem + -고 싶어요." },
        { q: "친구가 피자를 먹＿.", en: "My friend wants to eat pizza.", options: ["고 싶어해요", "고 싶어요", "고 있어요", "었어요"], answer: "고 싶어해요", why: "Other people's wants: -고 싶어해요." },
        { q: "What does 영화를 보고 싶어요 mean?", en: "", options: ["I want to watch a film.", "I am watching a film.", "I watched a film.", "I will watch a film."], answer: "I want to watch a film.", why: "보고 싶어요 = want to see/watch." },
      ],
    },
    {
      id: "eul-geoyeyo",
      title: "-(으)ㄹ 거예요 — will / going to",
      particle: "-(으)ㄹ 거예요",
      summary: "-ㄹ 거예요 after a vowel stem, -을 거예요 after a consonant. Plans and near future.",
      sections: [
        {
          p: "For “will” or “am going to”, add <b>-ㄹ 거예요</b> to a stem that ends in a vowel and <b>-을 거예요</b> to one that ends in a consonant. 하다 becomes <b>할 거예요</b>.",
          examples: [
            ["내일 갈 {거예요}.", "Naeil gal geoyeyo.", "I'll go tomorrow."],
            ["점심에 김밥을 먹을 {거예요}.", "Jeomsim-e gimbap-eul meogeul geoyeyo.", "I'm going to eat gimbap for lunch."],
            ["주말에 공부할 {거예요}.", "Jumal-e gongbuhal geoyeyo.", "I'll study on the weekend."],
          ],
        },
        {
          h: "Batchim ㄹ",
          p: "If the stem already ends in ㄹ, just add -거예요 (do not write 을): 살다 → 살 거예요 “I'll live / stay”. This form is for plans and likely future, not a hard promise.",
          examples: [
            ["서울에서 살 {거예요}.", "Seoul-eseo sal geoyeyo.", "I'm going to live in Seoul."],
            ["내일 만날 {거예요}.", "Naeil mannal geoyeyo.", "I'll meet (them) tomorrow."],
          ],
        },
      ],
      drills: [
        { q: "가다 → ？", en: "will / going to (polite)", options: ["갈 거예요", "갈어요", "가고 있어요", "갔어요"], answer: "갈 거예요", why: "Vowel stem: -ㄹ 거예요." },
        { q: "먹다 → ？", en: "will / going to (polite)", options: ["먹을 거예요", "먹ㄹ 거예요", "먹고 싶어요", "먹었어요"], answer: "먹을 거예요", why: "Consonant stem: -을 거예요." },
        { q: "하다 → ？", en: "will / going to (polite)", options: ["할 거예요", "하을 거예요", "했어요", "해요"], answer: "할 거예요", why: "하다 → 할 거예요." },
        { q: "살다 (live) → ？", en: "will live", options: ["살 거예요", "살을 거예요", "살고 싶어요", "살았어요"], answer: "살 거예요", why: "Stem already ends in ㄹ: just -거예요." },
        { q: "How do you say “I'll drink coffee”?", en: "마시다 = drink", options: ["커피를 마실 거예요.", "커피를 마시고 있어요.", "커피를 마셨어요.", "커피를 안 마셔요."], answer: "커피를 마실 거예요.", why: "마시- ends in a vowel: 마실 거예요." },
      ],
    },
    {
      id: "go-isseoyo",
      title: "-고 있어요 — doing now",
      particle: "-고 있어요",
      summary: "Stem + -고 있어요 for an action in progress, like English “-ing”.",
      sections: [
        {
          p: "Add <b>-고 있어요</b> to the verb stem for something happening now: 먹고 있어요 “I'm eating”. 있다 here is the existence verb used as an auxiliary; the polite form is 있어요.",
          examples: [
            ["지금 밥을 먹{고 있어요}.", "Jigeum bab-eul meokgo isseoyo.", "I'm eating right now."],
            ["한국어를 배우{고 있어요}.", "Hangugeo-reul baeugo isseoyo.", "I'm learning Korean."],
            ["비가 오{고 있어요}.", "Bi-ga ogo isseoyo.", "It's raining."],
          ],
        },
        {
          h: "Past progressive",
          p: "For “was doing”, use <b>-고 있었어요</b>: 자고 있었어요 “I was sleeping”. Negate with 안 before 고 or with -지 않아요 on 있다: 안 먹고 있어요 / 먹고 있지 않아요.",
          examples: [
            ["전화했을 때 공부{하고 있었어요}.", "Jeonhwahaesseul ttae gongbuhago isseosseoyo.", "When you called, I was studying."],
            ["지금은 운동{안} 하고 있어요.", "Jigeum-eun undong an hago isseoyo.", "I'm not exercising right now."],
          ],
        },
      ],
      drills: [
        { q: "책을 읽＿.", en: "I'm reading a book.", options: ["고 있어요", "고 싶어요", "을 거예요", "었어요"], answer: "고 있어요", why: "Stem + -고 있어요 = progressive." },
        { q: "친구를 기다리＿.", en: "I'm waiting for a friend.", options: ["고 있어요", "고 싶어요", "지 않아요", "았어요"], answer: "고 있어요", why: "기다리다 → 기다리고 있어요." },
        { q: "How do you say “I'm studying”?", en: "공부하다", options: ["공부하고 있어요.", "공부할 거예요.", "공부했어요.", "공부하고 싶어요."], answer: "공부하고 있어요.", why: "하다 → 하고 있어요." },
        { q: "어제 여덟 시에 자＿.", en: "I was sleeping at eight yesterday.", options: ["고 있었어요", "고 있어요", "고 싶어요", "을 거예요"], answer: "고 있었어요", why: "Past progressive: -고 있었어요." },
        { q: "What does 음악을 듣고 있어요 mean?", en: "듣다 = listen", options: ["I'm listening to music.", "I want to listen to music.", "I listened to music.", "I'll listen to music."], answer: "I'm listening to music.", why: "듣고 있어요 = listening (now)." },
      ],
    },
    {
      id: "connectors",
      title: "-고, -지만, -아서/어서 — joining clauses",
      particle: "-고 / -지만 / -아서 · -어서",
      summary: "Link clauses on the first verb: -고 “and”, -지만 “but”, -아서/어서 “so / and then”. Tense usually sits only on the last verb.",
      sections: [
        {
          p: "Korean joins clauses with endings on the first verb, not with separate little words. <b>-고</b> means “and (then)”. <b>-지만</b> means “but”. Put tense and politeness on the <i>last</i> verb.",
          examples: [
            ["밥을 먹{고} 공부했어요.", "Bab-eul meokgo gongbuhaesseoyo.", "I ate and (then) studied."],
            ["비싸{지만} 좋아요.", "Bissajiman joayo.", "It's expensive but good."],
            ["샤워하{고} 나갔어요.", "Syawohago nagasseoyo.", "I showered and went out."],
          ],
        },
        {
          h: "-아서 / -어서 — so, because; and then",
          p: "Use the same ㅏ/ㅗ rule as -아요/-어요: <b>-아서</b> after ㅏ/ㅗ, <b>-어서</b> otherwise; 하다 → <b>해서</b>. It gives a reason (“so / because”) or a natural next step.",
          examples: [
            ["배가 고파{서} 먹었어요.", "Bae-ga gopaseo meogeosseoyo.", "I was hungry, so I ate."],
            ["친구를 만나{서} 영화를 봤어요.", "Chingu-reul mannaseo yeonghwa-reul bwasseoyo.", "I met a friend and (then) watched a film."],
            ["바빠{서} 못 갔어요.", "Bappaseo mot gasseoyo.", "I was busy, so I couldn't go."],
          ],
        },
      ],
      drills: [
        { q: "커피를 마시＿ 책을 읽어요.", en: "I drink coffee and read a book.", options: ["고", "지만", "서", "을"], answer: "고", why: "-고 links actions: and (then)." },
        { q: "날씨가 좋＿ 바람이 세요.", en: "The weather is nice but the wind is strong.", options: ["지만", "고", "아서", "어요"], answer: "지만", why: "-지만 = but." },
        { q: "피곤＿ 일찍 잤어요.", en: "I was tired, so I went to bed early.", options: ["해서", "하고", "하지만", "고 있어요"], answer: "해서", why: "하다 → 해서 for “so / because”." },
        { q: "학교에 가＿ 공부해요.", en: "I go to school and study.", options: ["고", "지만", "을 거예요", "안"], answer: "고", why: "Sequence with -고; tense on the last verb." },
        { q: "Which ending means “but”?", en: "", options: ["-지만", "-고", "-아서", "-고 있어요"], answer: "-지만", why: "-지만 contrasts two clauses." },
      ],
    },
  ],
};
