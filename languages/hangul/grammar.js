// Korean grammar for the Grammar Learner, one level on every lesson. Written for this project.
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
// - National Institute of Korean Language educational grammar for 받침 (seven final
//   sounds and liaison), -(으)시-, humble 드리다/여쭙다/뵙다, 한다체, and written
//   -(으)며 / -(으)나 / -(으)므로. Example sentences are original.
// Each lesson has a level: absolute-beginner, beginner, beginner-intermediate,
// intermediate, advanced-intermediate, advanced. The drill shape is unchanged.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.hangul = {
  title: "Korean grammar",
  intro: "Korean puts the verb last and marks each noun with a particle. Every lesson has a level. Absolute beginner is Hangul: consonants, vowels, and syllable blocks with no final letter. Beginner is batchim (받침), the particles 은/는, 이/가, 을/를, and 에/에서, and 이에요/예요. Beginner-intermediate is 해요체: -아요/-어요, the polite past, 안 and 못, -고 싶어요, -(으)ㄹ 거예요, and -고 있어요. Intermediate is connective endings. Advanced-intermediate is honorifics. Advanced is the plain written style used in news. Romanization follows the Revised Romanization of Korean.",
  lessons: [
    {
      id: "hangul-consonants",
      level: "absolute-beginner",
      title: "Hangul consonants",
      particle: "ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ",
      summary: "Fourteen basic consonants. ㅇ is silent at the start of a syllable. An extra stroke marks a puff of air.",
      sections: [
        {
          p: "Hangul is an alphabet: each letter is a sound, and the letters stack into one block per syllable. The fourteen basic consonants are <b>ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ</b>. At the start of a syllable, ㄱ ㄷ ㅂ ㅈ are plain (a light start, little air), and ㅋ ㅌ ㅍ ㅊ are the same mouth positions with a strong puff of air.",
          examples: [
            ["ㄱ ㄴ ㄷ ㄹ ㅁ", "g, n, d, r, m", "The first five basic consonants."],
            ["ㅂ ㅅ ㅇ ㅈ ㅎ", "b, s, ng, j, h", "ㅇ is silent when a syllable starts with a vowel."],
            ["ㅋ ㅌ ㅍ ㅊ", "k, t, p, ch", "Aspirated: a clear puff of air."],
          ],
        },
        {
          h: "Plain, aspirated, and silent ㅇ",
          p: "ㄱ and ㅋ are both a “k” place, but only ㅋ sends a puff of air. The same pairs are ㄷ/ㅌ, ㅂ/ㅍ, and ㅈ/ㅊ. Doubled ㄲ ㄸ ㅃ ㅆ ㅉ are tense; leave them until the fourteen above are easy. <b>ㅇ</b> at the start of a block is only a placeholder, so a vowel has something to sit with. It is not “ng” there.",
          examples: [
            ["가 / 카", "ga / ka", "ㄱ versus ㅋ, both with ㅏ."],
            ["다 / 타", "da / ta", "ㄷ versus ㅌ."],
            ["아", "a", "Silent ㅇ plus ㅏ."],
          ],
        },
      ],
      drills: [
        { q: "Which letter is silent at the start of a syllable?", en: "", options: ["ㅇ", "ㅎ", "ㄱ", "ㅁ"], answer: "ㅇ", why: "Initial ㅇ is a placeholder. It is silent before a vowel." },
        { q: "Which consonant is a strong puff of air (aspirated k)?", en: "", options: ["ㅋ", "ㄱ", "ㄴ", "ㅅ"], answer: "ㅋ", why: "ㅋ is aspirated. ㄱ is the plain partner, with little air." },
        { q: "ㄴ is which sound?", en: "", options: ["n", "m", "ng", "r"], answer: "n", why: "ㄴ is n, as in 나 na." },
        { q: "How many basic consonants does Hangul have?", en: "", options: ["14", "10", "24", "7"], answer: "14", why: "Fourteen basic consonants, and ten basic vowels. Doubled letters come later." },
        { q: "Which of these is a vowel, not a consonant?", en: "", options: ["ㅏ", "ㅁ", "ㅅ", "ㅎ"], answer: "ㅏ", why: "ㅏ is the vowel a. The others are consonants." },
        { q: "ㅂ and ㅍ differ by…", en: "", options: ["a puff of air", "the vowel that follows", "being silent", "a final letter only"], answer: "a puff of air", why: "ㅍ is aspirated; ㅂ is plain. The mouth position is the same." },
      ],
    },
    {
      id: "hangul-vowels",
      level: "absolute-beginner",
      title: "Hangul vowels",
      particle: "ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ ㅑ ㅕ ㅛ ㅠ",
      summary: "Ten basic vowels. Tall vowels sit to the right of the consonant; flat ones sit below it.",
      sections: [
        {
          p: "The ten basic vowels are <b>ㅏ a, ㅑ ya, ㅓ eo, ㅕ yeo, ㅗ o, ㅛ yo, ㅜ u, ㅠ yu, ㅡ eu, ㅣ i</b>. ㅓ is “eo”, an open “uh”, not the “o” of ㅗ. ㅡ is “eu”: lips flat, no rounding. ㅐ and ㅔ are compounds (ㅏ+ㅣ and ㅓ+ㅣ). In modern Seoul speech both sound like “e”, and you will meet ㅔ immediately in the particle 에.",
          examples: [
            ["아 어 오 우", "a, eo, o, u", "Four vowels you will see constantly."],
            ["야 여 요 유", "ya, yeo, yo, yu", "A y- glide: one extra short stroke."],
            ["에 / 애", "e / ae", "ㅔ and ㅐ. Seoul speech treats them as almost the same e."],
          ],
        },
        {
          h: "Where the vowel sits",
          p: "A <b>tall</b> vowel (ㅏ ㅑ ㅓ ㅕ ㅣ, and ㅐ ㅔ) stands to the right of the first consonant: 가, 너, 미. A <b>flat</b> vowel (ㅗ ㅛ ㅜ ㅠ ㅡ) lies under it: 고, 무, 스. When the syllable starts with a vowel sound, write silent ㅇ first: 오 is ㅇ plus ㅗ, not a bare ㅗ.",
          examples: [
            ["가", "ga", "ㄱ on the left, tall ㅏ on the right."],
            ["고", "go", "ㄱ on top, flat ㅗ underneath."],
            ["우유", "uyu", "Two blocks: 우 (u) and 유 (yu)."],
          ],
        },
      ],
      drills: [
        { q: "ㅓ is romanized…", en: "", options: ["eo", "o", "eu", "u"], answer: "eo", why: "ㅓ is eo, the open vowel in 어. ㅗ is o." },
        { q: "ㅡ is romanized…", en: "", options: ["eu", "u", "eo", "i"], answer: "eu", why: "ㅡ is eu, unrounded. ㅜ is u." },
        { q: "Where does tall ㅏ sit in 가?", en: "", options: ["To the right of ㄱ", "Under ㄱ", "On top of ㄱ", "It replaces ㄱ"], answer: "To the right of ㄱ", why: "Tall vowels stand to the right of the first consonant." },
        { q: "Where does flat ㅗ sit in 고?", en: "", options: ["Under ㄱ", "To the right of ㄱ", "Before ㄱ as its own block", "It is silent"], answer: "Under ㄱ", why: "Flat vowels lie under the first consonant." },
        { q: "How do you write the syllable “a” by itself?", en: "", options: ["아", "ㅏ", "가", "오"], answer: "아", why: "A syllable cannot start with a bare vowel. Silent ㅇ plus ㅏ is 아." },
        { q: "에 is which vowel letter?", en: "", options: ["ㅔ", "ㅐ", "ㅓ", "ㅗ"], answer: "ㅔ", why: "에 is silent ㅇ plus ㅔ. 애 is ㅐ. Both sound like e in Seoul speech." },
      ],
    },
    {
      id: "hangul-blocks",
      level: "absolute-beginner",
      title: "Reading syllable blocks",
      particle: "consonant + vowel",
      summary: "Read a block as first consonant, then vowel. These blocks have no final letter yet.",
      sections: [
        {
          p: "Every syllable is one block. Read the first consonant, then the vowel. <b>나</b> is ㄴ plus ㅏ, “na”. <b>무</b> is ㅁ plus ㅜ, “mu”. A word is blocks in a row: <b>나무</b> is na-mu, “tree”.",
          examples: [
            ["나무", "namu", "tree — 나 plus 무."],
            ["모자", "moja", "hat — 모 plus 자."],
            ["아기", "agi", "baby — 아 plus 기."],
          ],
        },
        {
          h: "No final letter yet",
          p: "These blocks end when the vowel ends. A letter sitting under the vowel is a final consonant, 받침, and it changes the sound. That is the next lesson. For now, if you only see a consonant and a vowel, say both and stop: 바다 is ba-da, “sea”. 가게 is ga-ge, “shop”, with ㅔ on the right.",
          examples: [
            ["바다", "bada", "sea."],
            ["가수", "gasu", "singer."],
            ["가게", "gage", "shop."],
          ],
        },
      ],
      drills: [
        { q: "나 is which sounds?", en: "", options: ["ㄴ + ㅏ", "ㄴ + ㅓ", "ㅁ + ㅏ", "ㅇ + ㅏ"], answer: "ㄴ + ㅏ", why: "나 is n plus a." },
        { q: "Read 모자.", en: "", options: ["moja (hat)", "namu (tree)", "bada (sea)", "uyu (milk)"], answer: "moja (hat)", why: "모 is mo, 자 is ja." },
        { q: "Read 우유.", en: "", options: ["uyu (milk)", "agi (baby)", "gage (shop)", "gasu (singer)"], answer: "uyu (milk)", why: "우 is u, 유 is yu." },
        { q: "Which block is “na”?", en: "", options: ["나", "너", "무", "가"], answer: "나", why: "나 = ㄴ + ㅏ. 너 is neo." },
        { q: "아기 splits into…", en: "", options: ["아 + 기", "아가 + 이", "ㅇ + 아기", "아ㄱ + ㅣ"], answer: "아 + 기", why: "Two blocks: silent ㅇ plus ㅏ, then ㄱ plus ㅣ." },
        { q: "A block with only a consonant and a vowel…", en: "", options: ["has no batchim yet", "always ends in ㅇ", "is two syllables", "cannot be a word"], answer: "has no batchim yet", why: "Batchim is a final consonant under the vowel. These blocks stop after the vowel." },
      ],
    },
    {
      id: "batchim",
      level: "beginner",
      title: "받침 — final consonants",
      particle: "받침",
      summary: "A letter under the vowel is batchim. At the end of a word it is one of seven sounds, and it picks 은/는, 이/가, and 을/를.",
      sections: [
        {
          p: "받침 (batchim) is the consonant at the bottom of a block: 한 is ㅎ + ㅏ + ㄴ. At the end of a word, Korean pronounces batchim as one of <b>seven</b> sounds, however it is spelled. ㄱ ㅋ ㄲ are an unreleased k; ㄷ ㅅ ㅆ ㅈ ㅊ ㅌ ㅎ are an unreleased t; ㅂ ㅍ are an unreleased p; and ㄴ ㄹ ㅁ ㅇ stay n, l, m, and ng.",
          examples: [
            ["국", "guk", "soup — final ㄱ is k."],
            ["옷", "ot", "clothes — spelled with ㅅ, but the final sound is t."],
            ["강, 물, 밥", "gang, mul, bap", "ng, l, and p."],
          ],
        },
        {
          h: "The final moves onto a following vowel",
          p: "When the next syllable starts with silent ㅇ, the batchim is pronounced at the start of that syllable. 한국어 is said “한구거”: the ㄱ of 국 moves onto 어. 꽃이 is “꼬치”: before 이, ㅊ is “ch”, not the final t. Particles look at the spelling. A block with any batchim takes 은, 이, 을; a block with none takes 는, 가, 를.",
          examples: [
            ["한국어", "hangugeo", "The ㄱ of 국 is heard on 어."],
            ["꽃이", "kkochi", "Before 이, ㅊ is ch, not a final t."],
            ["책은 / 나는", "chaekeun / naneun", "책 has batchim, so 은; 나 has none, so 는."],
          ],
        },
      ],
      drills: [
        { q: "국 ends with which sound?", en: "", options: ["k", "n", "t", "ng"], answer: "k", why: "Final ㄱ is the unreleased k of the seven batchim sounds." },
        { q: "옷 is spelled with ㅅ. The final sound is…", en: "", options: ["t", "s", "ch", "n"], answer: "t", why: "ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ, and ㄷ are all an unreleased t at the end of a word." },
        { q: "강 ends with…", en: "", options: ["ng", "n", "k", "m"], answer: "ng", why: "Final ㅇ is ng. Initial ㅇ is silent; final ㅇ is not." },
        { q: "In 한국어, the ㄱ of 국 is pronounced…", en: "", options: ["at the start of 어", "as a final k", "not at all", "as ng"], answer: "at the start of 어", why: "Before a vowel, batchim moves forward: hangugeo." },
        { q: "꽃이 is pronounced…", en: "", options: ["kkochi", "kkot-i", "kkoni", "kkosi"], answer: "kkochi", why: "ㅊ before 이 is ch. The final-t rule applies only when nothing follows." },
        { q: "책 takes 은 rather than 는 because…", en: "", options: ["it has batchim", "it is the topic", "책 means book", "은 is always correct"], answer: "it has batchim", why: "Any final consonant takes the consonant shape: 은, 이, 을." },
      ],
    },
    {
      id: "eun-neun",
      level: "beginner",
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
      level: "beginner",
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
      level: "beginner",
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
      level: "beginner",
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
      id: "copula",
      level: "beginner",
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
      id: "ayo-eoyo",
      level: "beginner-intermediate",
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
      id: "past",
      level: "beginner-intermediate",
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
      level: "beginner-intermediate",
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
      level: "beginner-intermediate",
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
      level: "beginner-intermediate",
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
      level: "beginner-intermediate",
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
      level: "intermediate",
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
    {
      id: "myeon",
      level: "intermediate",
      title: "-(으)면 — if and when",
      particle: "-(으)면",
      summary: "Add -면 after a vowel or ㄹ, and -으면 after any other consonant. It means “if” or “when”.",
      sections: [
        {
          p: "-(으)면 on the first verb sets a condition: “if” or “whenever”. A stem ending in a vowel takes <b>-면</b> (가면, 오면). A stem ending in a consonant takes <b>-으면</b> (먹으면, 읽으면). A stem that already ends in ㄹ just takes <b>-면</b>: 살면, not 살으면. 하다 becomes <b>하면</b>. Tense and 요 sit on the last verb.",
          examples: [
            ["비가 오{면} 집에 있어요.", "Bi-ga omyeon jib-e isseoyo.", "If it rains, I'll stay home."],
            ["시간이 없{으면} 나중에 해요.", "Sigan-i eopseumyeon najung-e haeyo.", "If there is no time, do it later."],
            ["한국에서 살{면} 한국어를 배워요.", "Hanguk-eseo salmyeon hangugeo-reul baewoyo.", "If you live in Korea, you learn Korean."],
          ],
        },
        {
          h: "Not a reason",
          p: "-아서/어서 gives a reason (“so, because”). -(으)면 gives a condition. 바빠서 못 갔어요 means you were busy, so you didn't go. 바쁘면 안 가요 means if you are busy, you don't go. A stem-final ㅡ stays before -면: 바쁘면. It drops only before a vowel ending, which is why the polite present is 바빠요.",
          examples: [
            ["바쁘{면} 안 가요.", "Bappeumyeon an gayo.", "If I'm busy, I don't go."],
            ["배고프{면} 먹어요.", "Baegopeumyeon meogeoyo.", "If you're hungry, eat."],
          ],
        },
      ],
      drills: [
        { q: "비가 오＿ 집에 있어요.", en: "If it rains, I stay home.", options: ["면", "으면", "지만", "고"], answer: "면", why: "오다 ends in a vowel: -면." },
        { q: "시간이 없＿ 나중에 해요.", en: "If there is no time, do it later.", options: ["으면", "면", "어서", "고 있어요"], answer: "으면", why: "없 ends in a consonant: -으면." },
        { q: "한국에서 살＿ 한국어를 배워요.", en: "If you live in Korea, you learn Korean.", options: ["면", "으면", "지만", "아서"], answer: "면", why: "A stem that already ends in ㄹ takes -면: 살면." },
        { q: "하다 → ？", en: "if (someone) does", options: ["하면", "하으면", "하고", "하지만"], answer: "하면", why: "하다 drops 다 and adds -면." },
        { q: "Which ending means “if”, not “because”?", en: "", options: ["-(으)면", "-아서/어서", "-고 있어요", "-지만"], answer: "-(으)면", why: "-(으)면 is the condition. -아서/어서 is the reason." },
        { q: "읽다 → ？", en: "if (someone) reads", options: ["읽으면", "읽면", "읽어면", "읽고"], answer: "읽으면", why: "읽 ends in a consonant other than ㄹ: -으면." },
      ],
    },
    {
      id: "neunde",
      level: "intermediate",
      title: "-는데 / -은데 — background",
      particle: "-는데 / -은데 / -인데",
      summary: "Set the scene or a contrast: -는데 on action verbs, -ㄴ데 or -은데 on adjectives, -인데 on nouns.",
      sections: [
        {
          p: "-는데 gives the listener some background, then the real point. On an <b>action</b> verb it is always <b>-는데</b>, whether the stem ends in a vowel or a consonant: 가는데, 먹는데. A stem in ㄹ drops ㄹ: 살다 → 사는데. 하다 → 하는데. The second clause carries the tense and the 요.",
          examples: [
            ["지금 밥을 먹{는데} 나중에 전화해요.", "Jigeum bab-eul meokneunde najung-e jeonhwahaeyo.", "I'm eating now, so call later."],
            ["한국어를 배우{는데} 재미있어요.", "Hangugeo-reul baeuneunde jaemiisseoyo.", "I'm learning Korean, and it's fun."],
            ["서울에 사{는데} 공원이 있어요.", "Seoul-e saneunde gongwon-i isseoyo.", "I live in Seoul, and there are parks."],
          ],
        },
        {
          h: "Adjectives and nouns",
          p: "Adjectives take <b>-ㄴ데</b> after a vowel and <b>-은데</b> after a consonant: 큰데, 작은데. A stem-final ㅡ drops before ㄴ, so 크다 → 큰데. 좋다 ends in ㅎ, so it is spelled 좋은데. Nouns take <b>-인데</b> after either a vowel or a consonant: 학생인데, 의사인데.",
          examples: [
            ["집은 {큰데} 조용해요.", "Jib-eun keunde joyonghaeyo.", "The house is big, but it's quiet."],
            ["방이 작{은데} 조용해요.", "Bang-i jageunde joyonghaeyo.", "The room is small, but it's quiet."],
            ["날씨가 좋{은데} 바람이 강해요.", "Nalssi-ga joeunde baram-i ganghaeyo.", "The weather is nice, but the wind is strong."],
            ["학생{인데} 일을 안 해요.", "Haksaeng-inde ireul an haeyo.", "They're a student, but they don't work."],
          ],
        },
      ],
      drills: [
        { q: "지금 밥을 먹＿ 나중에 전화해요.", en: "I'm eating, so call later.", options: ["는데", "은데", "인데", "면"], answer: "는데", why: "먹다 is an action verb: -는데." },
        { q: "서울에 사＿ 공원이 있어요.", en: "I live in Seoul, and there are parks.", options: ["는데", "은데", "으면", "러"], answer: "는데", why: "살다 drops ㄹ before ㄴ: 사는데." },
        { q: "크다 → ？", en: "adjective background", options: ["큰데", "크은데", "크는데", "크인데"], answer: "큰데", why: "크다 ends in ㅡ, which drops before ㄴ: 큰데." },
        { q: "방이 작＿ 조용해요.", en: "The room is small, but quiet.", options: ["은데", "는데", "인데", "아서"], answer: "은데", why: "작다 is an adjective ending in a consonant: 작은데." },
        { q: "저는 학생＿ 일을 해요.", en: "I'm a student, and I work.", options: ["인데", "는데", "은데", "예요데"], answer: "인데", why: "Nouns take -인데, after a vowel or a consonant." },
        { q: "공부하＿ 재미있어요.", en: "I'm studying, and it's fun.", options: ["는데", "은데", "인데", "면"], answer: "는데", why: "하다 is an action verb, so -는데: 하는데." },
      ],
    },
    {
      id: "purpose",
      level: "intermediate",
      title: "-(으)러 and -(으)려고 — purpose",
      particle: "-(으)러 / -(으)려고",
      summary: "-(으)러 goes only with a verb of going or coming. -(으)려고 is “intending to”, before any verb.",
      sections: [
        {
          p: "<b>-(으)러</b> means “in order to”, and the next verb must be a motion verb such as 가다, 오다, or 다니다. Vowel stems and 하다 take <b>-러</b>: 보러, 만나러, 하러. Other consonant stems take <b>-으러</b>: 먹으러, 읽으러. A stem in ㄹ takes <b>-러</b>: 살러, not 살으러.",
          examples: [
            ["점심을 먹{으러} 식당에 가요.", "Jeomsim-eul meogeureo sikdang-e gayo.", "I'm going to a restaurant to eat lunch."],
            ["친구를 만나{러} 서울에 가요.", "Chingu-reul mannareo Seoul-e gayo.", "I'm going to Seoul to meet a friend."],
            ["책을 읽{으러} 도서관에 가요.", "Chaeg-eul ilgeureo doseogwan-e gayo.", "I'm going to the library to read."],
          ],
        },
        {
          h: "-(으)려고 — intending to",
          p: "<b>-(으)려고</b> is the intention itself, so the next verb can be anything, often 하다: 먹으려고 해요 “I'm planning to eat”. Same shape rule: vowel <b>-려고</b>, consonant <b>-으려고</b>, ㄹ stem <b>-려고</b> (살려고, not 살으려고). Do not put -러 in front of 먹다 or 하다.",
          examples: [
            ["내일 영화를 보{려고} 해요.", "Naeil yeonghwa-reul boryeogo haeyo.", "I'm planning to see a film tomorrow."],
            ["물을 마시{려고} 일어났어요.", "Mur-eul masiryeogo ireonasseoyo.", "I got up intending to drink water."],
            ["서울에 살{려고} 해요.", "Seoul-e sallyeogo haeyo.", "I'm planning to live in Seoul."],
          ],
        },
      ],
      drills: [
        { q: "점심을 먹＿ 식당에 가요.", en: "I'm going to a restaurant to eat lunch.", options: ["으러", "러", "려고", "고"], answer: "으러", why: "먹다 ends in a consonant, and 가요 is a motion verb: -으러." },
        { q: "친구를 만나＿ 서울에 가요.", en: "I'm going to Seoul to meet a friend.", options: ["러", "으러", "으려고", "지만"], answer: "러", why: "만나다 ends in a vowel: -러." },
        { q: "한국어를 공부하＿ 도서관에 가요.", en: "I'm going to the library to study Korean.", options: ["러", "으러", "은데", "면"], answer: "러", why: "하다 takes -러: 하러." },
        { q: "내일 영화를 보＿ 해요.", en: "I'm planning to see a film tomorrow.", options: ["려고", "러", "으러", "는데"], answer: "려고", why: "The next verb is 해요, not a motion verb, so -려고." },
        { q: "서울에 살＿ 해요.", en: "I'm planning to live in Seoul.", options: ["려고", "으려고", "으러", "으면"], answer: "려고", why: "ㄹ stems take -려고, not -으려고: 살려고." },
        { q: "Which sentence is wrong?", en: "", options: ["밥을 먹으러 먹어요.", "밥을 먹으러 가요.", "밥을 먹으려고 해요.", "밥을 먹으러 식당에 와요."], answer: "밥을 먹으러 먹어요.", why: "-(으)러 needs 가다, 오다, or 다니다. 먹어요 is not a motion verb." },
      ],
    },
    {
      id: "honorific-si",
      level: "advanced-intermediate",
      title: "-(으)시- — the subject honorific",
      particle: "-(으)세요",
      summary: "Raise the person who does the action: -세요 after a vowel or ㄹ, -으세요 after a consonant. Never put it on yourself.",
      sections: [
        {
          p: "-(으)시- honors the <b>subject</b>, the person doing the verb. In the polite 요 style the present is <b>-(으)세요</b>. A vowel stem takes -세요 (가세요, 오세요). A consonant stem takes -으세요 (읽으세요, 앉으세요). A stem in ㄹ drops ㄹ: 만들다 → 만드세요. 하다 becomes <b>하세요</b>. The past is <b>-(으)셨어요</b>: 가셨어요, 읽으셨어요.",
          examples: [
            ["선생님이 교실에 가{세요}.", "Seonsaengnim-i gyosil-e gaseyo.", "The teacher is going to the classroom."],
            ["할머니가 신문을 읽{으세요}.", "Halmeoni-ga sinmun-eul ilgeuseyo.", "Grandmother is reading the newspaper."],
            ["어제 할아버지가 오{셨어요}.", "Eoje harabeoji-ga osyeosseoyo.", "Grandfather came yesterday."],
          ],
        },
        {
          h: "Special verbs, and not for yourself",
          p: "A few everyday verbs have their own honorific word. 먹다 and 마시다 become <b>드시다</b> (드세요), 자다 becomes <b>주무시다</b> (주무세요), and 있다 for a person becomes <b>계시다</b> (계세요). 시 honors someone else. 저는 가세요 is wrong; say 저는 가요.",
          examples: [
            ["할머니가 밥을 드{세요}.", "Halmeoni-ga bab-eul deuseyo.", "Grandmother is eating."],
            ["아버지가 지금 주무{세요}.", "Abeoji-ga jigeum jumuseyo.", "Father is sleeping now."],
            ["선생님이 교실에 계{세요}?", "Seonsaengnim-i gyosil-e gyeseyo?", "Is the teacher in the classroom?"],
          ],
        },
      ],
      drills: [
        { q: "선생님이 교실에 ＿.", en: "The teacher goes to the classroom. (honorific present)", options: ["가세요", "가요", "가", "가셨어요"], answer: "가세요", why: "Honor the subject: 가다 → 가세요." },
        { q: "할머니가 신문을 ＿.", en: "Grandmother reads the paper.", options: ["읽으세요", "읽어요", "읽세요", "읽으셨어요"], answer: "읽으세요", why: "읽 ends in a consonant: -으세요." },
        { q: "하다 → ？", en: "honorific polite present", options: ["하세요", "하으세요", "하셔요", "해요"], answer: "하세요", why: "하다 becomes 하세요, not 하으세요." },
        { q: "할머니가 지금 ＿.", en: "Grandmother is sleeping. (honorific)", options: ["주무세요", "자요", "자세요", "잤어요"], answer: "주무세요", why: "The honorific of 자다 is 주무시다: 주무세요." },
        { q: "How do you say “I go”, with yourself as the subject?", en: "", options: ["저는 가요.", "저는 가세요.", "저는 가셨어요.", "저는 주무세요."], answer: "저는 가요.", why: "-(으)시- honors someone else. Do not put it on 저." },
        { q: "어제 할아버지가 ＿.", en: "Grandfather came yesterday.", options: ["오셨어요", "오세요", "왔어요", "오셨어요요"], answer: "오셨어요", why: "Honorific past: 오다 → 오셨어요." },
      ],
    },
    {
      id: "honorific-nouns",
      level: "advanced-intermediate",
      title: "께서, 께, and honorific nouns",
      particle: "께서 / 께 / 분",
      summary: "Honored people take 께서 as the subject and 께 as “to”. A few nouns swap in: 분, 성함, 연세, 진지, 댁.",
      sections: [
        {
          p: "When the subject is someone you honor, <b>께서</b> replaces 이/가: 할머니께서 오세요. When you give or say something <b>to</b> that person, <b>께</b> replaces 에게: 선생님께 드려요. The person noun itself is often <b>분</b> rather than 사람: 이분이 선생님이에요.",
          examples: [
            ["할머니{께서} 오세요.", "Halmeoni-kkeseo oseyo.", "Grandmother is coming."],
            ["선생님{께} 편지를 드려요.", "Seonsaengnim-kke pyeonji-reul deuryeoyo.", "I give a letter to the teacher."],
            ["이{분}이 선생님이에요.", "Ibun-i seonsaengnim-ieyo.", "This person is a teacher."],
          ],
        },
        {
          h: "Name, age, meal, house",
          p: "A few nouns change when they belong to someone you honor. <b>성함</b> is a name (이름), <b>연세</b> is age (나이), <b>진지</b> is a meal (밥), and <b>댁</b> is a house (집). The verb beside them is honorific too: 성함이 어떻게 되세요?",
          examples: [
            ["성함이 어떻게 되세요?", "Seongham-i eotteoke doeseyo?", "What is your name? (honorific)"],
            ["연세가 어떻게 되세요?", "Yeonse-ga eotteoke doeseyo?", "How old are you? (honorific)"],
            ["진지 드세요.", "Jinji deuseyo.", "Please have your meal."],
          ],
        },
      ],
      drills: [
        { q: "할머니＿ 오세요.", en: "Grandmother is coming. (honorific subject)", options: ["께서", "께", "이", "을"], answer: "께서", why: "께서 marks an honored subject. 이/가 is the plain subject marker." },
        { q: "선생님＿ 편지를 드려요.", en: "I give a letter to the teacher.", options: ["께", "께서", "에서", "을"], answer: "께", why: "께 is “to” an honored person. 께서 is the subject marker." },
        { q: "Which noun honors the person you mean?", en: "", options: ["이분", "이 사람", "이 아이", "이 친구"], answer: "이분", why: "분 is the honorific word for a person. 사람 is neutral." },
        { q: "The honorific word for “name” is…", en: "", options: ["성함", "연세", "진지", "이름"], answer: "성함", why: "성함 replaces 이름. 연세 is age, 진지 is a meal." },
        { q: "연세가 어떻게 되세요? asks…", en: "", options: ["age, politely", "a name, politely", "where someone lives", "what someone ate"], answer: "age, politely", why: "연세 is honorific “age”." },
        { q: "진지 pairs with which verb?", en: "", options: ["드시다", "먹다", "자다", "가다"], answer: "드시다", why: "진지 드세요: the honorific meal with the honorific “eat”." },
      ],
    },
    {
      id: "humble",
      level: "advanced-intermediate",
      title: "Humble verbs — 드리다, 여쭙다, 뵙다",
      particle: "드리다 / 여쭙다 / 뵙다",
      summary: "Lower yourself toward someone higher: 드리다 “give”, 여쭙다 “ask”, 뵙다 “see”. Their actions still take -(으)시-.",
      sections: [
        {
          p: "Honorific -(으)시- raises the subject. Humble verbs lower <b>you</b>. When you give something to someone honored, 주다 becomes <b>드리다</b>: 선생님께 드려요. When that person gives something to you, they are the subject, so the verb is <b>주시다</b>, not 드리다: 선생님께서 주셨어요.",
          examples: [
            ["제가 선생님께 꽃을 드{려요}.", "Jega seonsaengnim-kke kkot-eul deuryeoyo.", "I give flowers to the teacher."],
            ["선생님께서 책을 주{셨어요}.", "Seonsaengnim-kkeseo chaeg-eul jusyeosseoyo.", "The teacher gave me a book."],
            ["어머니께 선물을 드{렸어요}.", "Eomeoni-kke seonmul-eul deuryeosseoyo.", "I gave a present to my mother."],
          ],
        },
        {
          h: "Asking and seeing",
          p: "묻다 “ask” becomes <b>여쭙다</b> (여쭤요) when you ask someone honored. 보다 “see or meet” becomes <b>뵙다</b> (봬요). 뵙다's ㅂ drops before a vowel ending, so “going in order to see” is 뵈러 가요, not 뵙으러 가요. You still mark the person with 께 or 을/를. Do not put -(으)시- on your own humble verb: 여쭈세요 would honor you.",
          examples: [
            ["선생님께 이름을 여{쭤요}.", "Seonsaengnim-kke ireum-eul yeojjwoyo.", "I ask the teacher the name."],
            ["내일 교수님을 {뵈러} 가요.", "Naeil gyosunim-eul boereo gayo.", "I'm going to see the professor tomorrow."],
            ["저는 {해요}.", "Jeo-neun haeyo.", "I do it. No 시, because the subject is me."],
          ],
        },
      ],
      drills: [
        { q: "제가 선생님께 꽃을 ＿.", en: "I give flowers to the teacher.", options: ["드려요", "줘요", "주세요", "드세요"], answer: "드려요", why: "You are the giver and the teacher is higher: humble 드리다." },
        { q: "선생님께서 책을 ＿.", en: "The teacher gave me a book.", options: ["주셨어요", "드렸어요", "줬어요", "드셨어요"], answer: "주셨어요", why: "The teacher is the subject who gives, so honor them with 주시다: past 주셨어요." },
        { q: "선생님께 이름을 ＿.", en: "I ask the teacher the name.", options: ["여쭤요", "물어요", "물어 보세요", "여쭈세요"], answer: "여쭤요", why: "Humble “ask” is 여쭙다 → 여쭤요. 여쭈세요 would honor yourself." },
        { q: "내일 교수님을 ＿ 가요.", en: "I'm going to see the professor tomorrow.", options: ["뵈러", "보러", "뵙으러", "여쭤"], answer: "뵈러", why: "뵙다 with 가다: 뵈러 가요. The ㅂ drops before the vowel ending." },
        { q: "Which verb humbles the speaker?", en: "", options: ["드리다", "주시다", "드시다", "주무시다"], answer: "드리다", why: "드리다 lowers the giver, you. 주시다, 드시다, and 주무시다 honor the subject." },
        { q: "제가 선생님을 ＿.", en: "I see the teacher. (humble)", options: ["봬요", "보세요", "봐요", "뵈세요"], answer: "봬요", why: "뵙다 → 봬요. 보세요 would honor the subject, which here is you." },
      ],
    },
    {
      id: "plain-style",
      level: "advanced",
      title: "한다체 — the plain written style",
      particle: "-ㄴ다 / -는다 / -다",
      summary: "News, diaries, and narration end in the plain style: 간다, 먹는다, 좋다, 학생이다. No 요.",
      sections: [
        {
          p: "The plain style (한다체) is what articles, diaries, and narration use. An <b>action</b> verb ending in a vowel takes <b>-ㄴ다</b>: 간다, 온다, 한다. One ending in a consonant takes <b>-는다</b>: 먹는다, 읽는다. A stem in ㄹ drops ㄹ: 살다 → 산다. There is no 요.",
          examples: [
            ["민수가 학교에 {간다}.", "Minsu-ga hakgyo-e ganda.", "Minsu goes to school."],
            ["학생이 밥을 {먹는다}.", "Haksaeng-i bab-eul meokneunda.", "The student eats."],
            ["그들은 서울에 {산다}.", "Geudeul-eun Seoul-e sanda.", "They live in Seoul."],
          ],
        },
        {
          h: "Adjectives, nouns, and the past",
          p: "An adjective does not take -는다. Its plain present is the dictionary form: 좋다, 작다. A noun uses <b>이다</b> after a consonant and <b>다</b> after a vowel: 학생이다, 커피다. The past is the -았/었- you already know, with -다 instead of -어요: 갔다, 먹었다, 했다, 왔다.",
          examples: [
            ["날씨가 {좋다}.", "Nalssi-ga jota.", "The weather is good."],
            ["그는 학생{이다}. 이것은 커피{다}.", "Geu-neun haksaeng-ida. Igeot-eun keopi-da.", "He is a student. This is coffee."],
            ["어제 비가 {왔다}.", "Eoje bi-ga watda.", "It rained yesterday."],
          ],
        },
      ],
      drills: [
        { q: "가다 → ？", en: "plain present", options: ["간다", "가는다", "가다요", "가요"], answer: "간다", why: "Vowel-stem action verb: -ㄴ다." },
        { q: "먹다 → ？", en: "plain present", options: ["먹는다", "먹ㄴ다", "먹는다요", "먹어요"], answer: "먹는다", why: "Consonant-stem action verb: -는다." },
        { q: "좋다 → ？", en: "plain present", options: ["좋다", "좋는다", "좋은다", "좋아요"], answer: "좋다", why: "Adjectives stay in the dictionary form. They do not take -는다." },
        { q: "하다 → ？", en: "plain present", options: ["한다", "하는다", "한는다", "해요"], answer: "한다", why: "하다 → 한다." },
        { q: "살다 → ？", en: "plain present", options: ["산다", "살는다", "살ㄴ다", "산는다"], answer: "산다", why: "ㄹ drops before ㄴ: 산다." },
        { q: "Which is “This is coffee” in the plain style?", en: "", options: ["이것은 커피다.", "이것은 커피이다.", "이것은 커피예요.", "이것은 커피는다."], answer: "이것은 커피다.", why: "After a vowel, 이다 is written 다. After a consonant it stays 이다: 학생이다." },
      ],
    },
    {
      id: "news-report",
      level: "advanced",
      title: "News reports — 다고 and 에 따르면",
      particle: "-다고 / -에 따르면 / -(으)ㄴ 것으로",
      summary: "Articles quote a claim with -다고 밝혔다, cite a source with -에 따르면, and report a finding with -(으)ㄴ 것으로 나타났다.",
      sections: [
        {
          p: "A news sentence names a source, then a plain-style clause. <b>-에 따르면</b> means “according to”. A quoted statement adds <b>-다고</b> to the plain form and a reporting verb such as 밝혔다 “announced” or 전했다 “reported”: 간다고 밝혔다, 먹는다고 전했다, 좋다고 했다. A past quote is -았/었다고: 올랐다고.",
          examples: [
            ["기상청{에 따르면} 오후에 비가 온다.", "Gisangcheong-e ttareumyeon ohu-e bi-ga onda.", "According to the weather office, it rains in the afternoon."],
            ["정부는 내일 회의를 연{다고} 밝혔다.", "Jeongbu-neun naeil hoeui-reul yeondago bakhyeotda.", "The government announced it would hold a meeting tomorrow."],
            ["물가가 올랐{다고} 전했다.", "Mulga-ga ollatdago jeonhaetda.", "They reported that prices had risen."],
          ],
        },
        {
          h: "것으로 나타났다, and 이다",
          p: "A finding is often <b>-(으)ㄴ 것으로 나타났다</b> “it turned out that”. A past action or an adjective uses the modifier <b>-ㄴ / -은</b>: 내린 것으로, 좋은 것으로. A noun is quoted with <b>-(이)라고</b>, not -다고: 학생이라고 after a consonant, 의사라고 after a vowel.",
          examples: [
            ["가격이 내린 {것으로} 나타났다.", "Gagyeok-i naerin geoseuro natanatda.", "It turned out that the price had fallen."],
            ["그는 학생{이라고} 밝혔다.", "Geu-neun haksaeng-irago bakhyeotda.", "They announced that he is a student."],
            ["그것은 사실{이라고} 전했다.", "Geugeot-eun sasil-irago jeonhaetda.", "They reported that it is a fact."],
          ],
        },
      ],
      drills: [
        { q: "기상청＿ 오후에 비가 온다.", en: "According to the weather office, it rains this afternoon.", options: ["에 따르면", "을 따르면", "라고", "으로"], answer: "에 따르면", why: "A source plus 에 따르면 means “according to”." },
        { q: "정부는 회의를 연＿ 밝혔다.", en: "The government announced it would hold a meeting.", options: ["다고", "라고", "으로", "고"], answer: "다고", why: "열다 → 연다, then -다고 for a quoted statement: 연다고." },
        { q: "물가가 올랐＿ 전했다.", en: "They reported that prices rose.", options: ["다고", "이라고", "는다고", "러"], answer: "다고", why: "The plain past 올랐다 is quoted as 올랐다고. The final 다 becomes 다고." },
        { q: "가격이 내린 ＿ 나타났다.", en: "It turned out that the price fell.", options: ["것으로", "다고로", "다고", "으면"], answer: "것으로", why: "The past modifier 내린 plus 것으로 나타났다." },
        { q: "그는 학생＿ 밝혔다.", en: "They announced that he is a student.", options: ["이라고", "다고", "라고", "은다고"], answer: "이라고", why: "이다 after a consonant is quoted with -이라고, not -다고." },
        { q: "민수는 의사＿ 전했다.", en: "They reported that Minsu is a doctor.", options: ["라고", "이라고", "다고", "는다고"], answer: "라고", why: "의사 ends in a vowel, so 이다 is quoted as -라고: 의사라고." },
      ],
    },
    {
      id: "written-connectives",
      level: "advanced",
      title: "-(으)며, -(으)나, -(으)므로 — written connectors",
      particle: "-(으)며 / -(으)나 / -(으)므로",
      summary: "The written partners of -고, -지만, and -아서: -(으)며 “and”, -(으)나 “but”, -(으)므로 “because”. The sentence still ends in plain style.",
      sections: [
        {
          p: "Writing uses connectors that 해요체 rarely does. <b>-(으)며</b> links facts (“and”): a vowel or ㄹ takes -며 (크며, 살며), and any other consonant takes -으며 (먹으며, 높으며). <b>-(으)나</b> is the written “but”: 가나, 먹으나, 비싸나. The sentence ends in 한다체, not -요.",
          examples: [
            ["산은 높{으며} 물은 맑다.", "San-eun nopeumyeo mul-eun makda.", "The mountain is high, and the water is clear."],
            ["값은 비싸{나} 품질이 좋다.", "Gaps-eun bissana pumjil-i jota.", "The price is high, but the quality is good."],
            ["사람들은 일하{며} 공부한다.", "Saramdeul-eun ilhamyeo gongbuhanda.", "People work and study."],
          ],
        },
        {
          h: "-(으)므로 — because",
          p: "<b>-(으)므로</b> is the written “because”: a vowel takes -므로 (오므로), a consonant takes -으므로 (없으므로), and a stem in ㄹ takes -므로 (살므로, not 살으므로). It states a reason the writer takes as given. Spoken Korean still uses -아서/어서 for the same job.",
          examples: [
            ["비가 오{므로} 경기가 취소됐다.", "Bi-ga omeuro gyeonggi-ga chwisodoetda.", "Because it is raining, the match was cancelled."],
            ["시간이 없{으므로} 회의를 미룬다.", "Sigan-i eopseumeuro hoeui-reul mirunda.", "Because there is no time, they postpone the meeting."],
            ["여기 살{므로} 길이 익숙하다.", "Yeogi salmeuro giri iksukhada.", "Because they live here, the road is familiar."],
          ],
        },
      ],
      drills: [
        { q: "산은 높＿ 물은 맑다.", en: "The mountain is high, and the water is clear.", options: ["으며", "며", "으나", "므로"], answer: "으며", why: "높다 ends in a consonant: -으며. This sentence is plain style, so not -고." },
        { q: "사람들은 일하＿ 공부한다.", en: "People work and study.", options: ["며", "으며", "지만", "어서"], answer: "며", why: "하다 → 하며, the written “and”." },
        { q: "값은 비싸＿ 품질이 좋다.", en: "It is expensive, but the quality is good.", options: ["나", "으나", "며", "아서"], answer: "나", why: "비싸다 ends in a vowel: -나, the written “but”." },
        { q: "시간이 없＿ 회의를 미룬다.", en: "Because there is no time, they postpone the meeting.", options: ["으므로", "므로", "으며", "지만"], answer: "으므로", why: "없 ends in a consonant: -으므로." },
        { q: "비가 오＿ 경기가 취소됐다.", en: "Because it is raining, the match was cancelled.", options: ["므로", "으므로", "나", "고"], answer: "므로", why: "오다 ends in a vowel: -므로." },
        { q: "여기 살＿ 길이 익숙하다.", en: "Because they live here, the road is familiar.", options: ["므로", "으므로", "으나", "는다"], answer: "므로", why: "ㄹ stems take -므로: 살므로, not 살으므로." },
      ],
    },

  ],
};
