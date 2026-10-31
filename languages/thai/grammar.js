// Thai first grammar for the Grammar Learner. Written for this project.
// Examples are [Thai, romanization, English]; {braces} mark the point of the lesson.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.thai = {
  title: "Thai first grammar",
  intro: "Thai words never change their form: no endings for tense, person, plural or gender. Instead, word order and small helper words carry the meaning, and the speaker's own gender shows up in the polite word at the end of a sentence. These lessons cover pronouns and ครับ / ค่ะ, the three verbs for “to be” and “have”, word order and describing words, saying no and asking, time words, and counting with classifiers. The romanization is a simple one without tone marks; listen to each word with text to speech to hear the tone.",
  lessons: [
    {
      id: "polite",
      title: "I, you, and ครับ / ค่ะ",
      particle: "ครับ ค่ะ",
      summary: "Which “I” to use, and the polite word that ends most sentences.",
      sections: [
        {
          p: "A man says <b>ผม</b> (phom) for “I”, and a woman usually says <b>ฉัน</b> (chan) or ดิฉัน (formal). “You” is <b>คุณ</b> (khun), and “he, she, they” is <b>เขา</b> (khao).",
          examples: [
            ["{ผม}ชื่อสมชาย", "Phom chue Somchai.", "My name is Somchai. (a man)"],
            ["{ฉัน}มาจากอังกฤษ", "Chan ma chak Angkrit.", "I come from England. (a woman)"],
            ["{คุณ}ชื่ออะไร", "Khun chue arai?", "What is your name?"],
          ],
        },
        {
          h: "Polite endings",
          p: "End a sentence with <b>ครับ</b> (khrap) if you are a man and <b>ค่ะ</b> (kha) if you are a woman; in a question a woman says <b>คะ</b> (kha, with a rising tone). They make speech polite, and on their own they mean “yes”.",
          examples: [
            ["สวัสดี{ครับ}", "Sawatdi khrap.", "Hello. (a man)"],
            ["ขอบคุณ{ค่ะ}", "Khop khun kha.", "Thank you. (a woman)"],
            ["คุณชื่ออะไร{คะ}", "Khun chue arai kha?", "What's your name? (a woman asking)"],
          ],
        },
      ],
      drills: [
        { q: "＿ชื่อเดวิดครับ", en: "My name is David. (a man)", options: ["ผม", "ฉัน", "คุณ", "เขา"], answer: "ผม", why: "A man says ผม for “I”, and ends with ครับ." },
        { q: "ขอบคุณ＿", en: "Thank you. (a woman)", options: ["ค่ะ", "ครับ", "คะ", "ไหม"], answer: "ค่ะ", why: "A woman ends a statement with ค่ะ." },
        { q: "＿เป็นครู", en: "She is a teacher.", options: ["เขา", "คุณ", "ผม", "ฉัน"], answer: "เขา", why: "เขา = he, she or they." },
        { q: "สบายดีไหม＿", en: "How are you? (a woman asking)", options: ["คะ", "ค่ะ", "ครับ", "ผม"], answer: "คะ", why: "In a question, a woman uses คะ." },
        { q: "Which word means “you”?", en: "", options: ["คุณ", "เขา", "ผม", "ครับ"], answer: "คุณ", why: "คุณ is the everyday polite “you”." },
      ],
    },
    {
      id: "pen-yuu-mii",
      title: "เป็น, อยู่ and มี",
      particle: "เป็น อยู่ มี",
      summary: "Three verbs for “is”, “is at” and “has”, and adjectives that need no verb.",
      sections: [
        {
          p: "<b>เป็น</b> (pen) is “to be” for what someone is: a job, a nationality. <b>อยู่</b> (yu) is “to be” for where something is. <b>มี</b> (mi) is “to have” and “there is”.",
          examples: [
            ["ผม{เป็น}นักเรียน", "Phom pen nakrian.", "I am a student."],
            ["เขา{อยู่}ที่บ้าน", "Khao yu thi ban.", "He is at home."],
            ["ฉัน{มี}แมวสองตัว", "Chan mi maeo song tua.", "I have two cats."],
          ],
        },
        {
          h: "Adjectives are verbs",
          p: "With a describing word, no “is” is needed: <b>อาหารอร่อย</b> “the food (is) delicious”. Using เป็น there would be wrong.",
          examples: [
            ["อาหาร{อร่อย}", "Ahan aroi.", "The food is delicious."],
            ["วันนี้{ร้อน}", "Wan ni ron.", "It's hot today."],
          ],
        },
      ],
      drills: [
        { q: "เขา＿หมอ", en: "He is a doctor.", options: ["เป็น", "อยู่", "มี", "—"], answer: "เป็น", why: "Saying what someone is: เป็น." },
        { q: "ห้องน้ำ＿ที่ไหน", en: "Where is the toilet?", options: ["อยู่", "เป็น", "มี", "ไป"], answer: "อยู่", why: "Saying where something is: อยู่." },
        { q: "คุณ＿พี่น้องไหม", en: "Do you have brothers and sisters?", options: ["มี", "เป็น", "อยู่", "ไม่"], answer: "มี", why: "มี = to have." },
        { q: "Which sentence means “The room is big”?", en: "ห้อง = room, ใหญ่ = big", options: ["ห้องใหญ่", "ห้องเป็นใหญ่", "ห้องอยู่ใหญ่", "ห้องมีใหญ่"], answer: "ห้องใหญ่", why: "A describing word needs no verb in front of it." },
        { q: "ผม＿ที่กรุงเทพฯ", en: "I live (am) in Bangkok.", options: ["อยู่", "เป็น", "มี", "จะ"], answer: "อยู่", why: "อยู่ is “to be at” and also “to live (somewhere)”." },
      ],
    },
    {
      id: "word-order",
      title: "Word order and describing words",
      particle: "SVO",
      summary: "Subject, verb, object, like English; but the describing word comes after the noun.",
      sections: [
        {
          p: "A Thai sentence runs subject – verb – object, as in English, and the verb never changes. A describing word comes <b>after</b> its noun: บ้าน<b>ใหญ่</b> “big house”, รถ<b>สีแดง</b> “red car”.",
          examples: [
            ["ฉันกินข้าว", "Chan kin khao.", "I eat rice. / I'm eating."],
            ["บ้าน{ใหญ่}", "ban yai", "a big house"],
            ["รถ{สีแดง}", "rot si daeng", "a red car"],
          ],
        },
        {
          h: "This, that, and whose",
          p: "<b>นี้</b> (this) and <b>นั้น</b> (that) also follow the noun: หนังสือเล่มนี้, “this book”. <b>ของ</b> means “of / belonging to”: บ้านของผม, “my house”; in speech ของ is often dropped.",
          examples: [
            ["ร้าน{นี้}", "ran ni", "this shop"],
            ["เพื่อน{ของ}ฉัน", "phuean khong chan", "my friend"],
          ],
        },
      ],
      drills: [
        { q: "Which means “a small dog”?", en: "หมา = dog, เล็ก = small", options: ["หมาเล็ก", "เล็กหมา", "หมาเป็นเล็ก", "เล็กของหมา"], answer: "หมาเล็ก", why: "The describing word comes after the noun." },
        { q: "Which means “I drink coffee”?", en: "ดื่ม = drink, กาแฟ = coffee", options: ["ฉันดื่มกาแฟ", "ฉันกาแฟดื่ม", "ดื่มฉันกาแฟ", "กาแฟฉันดื่ม"], answer: "ฉันดื่มกาแฟ", why: "Subject – verb – object, as in English." },
        { q: "ร้านอาหาร＿อร่อย", en: "This restaurant is tasty.", options: ["นี้", "ของ", "เป็น", "มี"], answer: "นี้", why: "นี้ (this) follows the noun." },
        { q: "แม่＿ผม", en: "my mother", options: ["ของ", "นี้", "อยู่", "เป็น"], answer: "ของ", why: "ของ = of, belonging to." },
        { q: "How does “eat” change for “she ate”?", en: "กิน = eat", options: ["It doesn't change.", "It takes a past ending.", "It changes its tone.", "It doubles: กินกิน"], answer: "It doesn't change.", why: "Thai verbs never change form; time words show when." },
      ],
    },
    {
      id: "mai-questions",
      title: "ไม่, and asking questions",
      particle: "ไม่ ไหม",
      summary: "ไม่ before the verb is “not”; ไหม at the end makes a yes/no question.",
      sections: [
        {
          p: "Put <b>ไม่</b> (mai) before the verb or describing word to make it negative. To answer “no” you repeat the verb with ไม่: ไม่ชอบ “(I) don't like (it)”.",
          examples: [
            ["ผม{ไม่}เข้าใจ", "Phom mai khao chai.", "I don't understand."],
            ["{ไม่}เผ็ด", "Mai phet.", "Not spicy."],
            ["{ไม่}เป็นไร", "Mai pen rai.", "Never mind. / It's fine."],
          ],
        },
        {
          h: "Questions",
          p: "Add <b>ไหม</b> (mai, rising tone) to the end for a yes/no question. Question words stay where the answer would go, usually at the end: <b>อะไร</b> what, <b>ที่ไหน</b> where, <b>ใคร</b> who, <b>เมื่อไร</b> when, <b>ทำไม</b> why, <b>เท่าไร</b> how much.",
          examples: [
            ["คุณพูดภาษาอังกฤษได้{ไหม}", "Khun phut phasa Angkrit dai mai?", "Can you speak English?"],
            ["อันนี้{เท่าไร}", "An ni thao rai?", "How much is this?"],
            ["ห้องน้ำอยู่{ที่ไหน}", "Hong nam yu thi nai?", "Where is the toilet?"],
          ],
        },
      ],
      drills: [
        { q: "ผม＿ชอบเผ็ด", en: "I don't like spicy food.", options: ["ไม่", "ไหม", "อะไร", "ครับ"], answer: "ไม่", why: "ไม่ before the verb = not." },
        { q: "อร่อย＿", en: "Is it tasty?", options: ["ไหม", "ไม่", "ที่ไหน", "ใคร"], answer: "ไหม", why: "ไหม at the end makes a yes/no question." },
        { q: "นี่คือ＿", en: "What is this?", options: ["อะไร", "ใคร", "ที่ไหน", "เท่าไร"], answer: "อะไร", why: "อะไร = what." },
        { q: "คุณไป＿", en: "Where are you going?", options: ["ที่ไหน", "อะไร", "เมื่อไร", "ไหม"], answer: "ที่ไหน", why: "ที่ไหน = where." },
        { q: "เขาเป็น＿", en: "Who is he?", options: ["ใคร", "ทำไม", "เท่าไร", "ไม่"], answer: "ใคร", why: "ใคร = who, in the place of the answer." },
      ],
    },
    {
      id: "time",
      title: "Past, present and future",
      particle: "จะ แล้ว",
      summary: "Small words before or after the verb show when: จะ, กำลัง, แล้ว, เคย.",
      sections: [
        {
          p: "The verb stays the same; a helper word shows the time. <b>จะ</b> (ja) before the verb: will. <b>กำลัง</b> (kamlang) before the verb: in the middle of doing. <b>แล้ว</b> (laeo) at the end: already, done.",
          examples: [
            ["พรุ่งนี้ผม{จะ}ไปเชียงใหม่", "Phrung ni phom ja pai Chiang Mai.", "Tomorrow I will go to Chiang Mai."],
            ["เขา{กำลัง}ทำงาน", "Khao kamlang tham ngan.", "He is working right now."],
            ["ฉันกินข้าว{แล้ว}", "Chan kin khao laeo.", "I have already eaten."],
          ],
        },
        {
          h: "Ever, and time words",
          p: "<b>เคย</b> (khoei) before a verb means “have ever”. Often a time word alone is enough: เมื่อวาน (yesterday), วันนี้ (today), พรุ่งนี้ (tomorrow).",
          examples: [
            ["คุณ{เคย}ไปญี่ปุ่นไหม", "Khun khoei pai Yipun mai?", "Have you ever been to Japan?"],
            ["{เมื่อวาน}ฝนตก", "Muea wan fon tok.", "It rained yesterday."],
          ],
        },
      ],
      drills: [
        { q: "ผม＿ไปตลาดพรุ่งนี้", en: "I will go to the market tomorrow.", options: ["จะ", "แล้ว", "เคย", "กำลัง"], answer: "จะ", why: "จะ before the verb = will." },
        { q: "เขา＿อาบน้ำ", en: "She is (in the middle of) taking a shower.", options: ["กำลัง", "จะ", "แล้ว", "เคย"], answer: "กำลัง", why: "กำลัง = right now, in progress." },
        { q: "ฉันทำการบ้าน＿", en: "I have already done my homework.", options: ["แล้ว", "จะ", "กำลัง", "ไหม"], answer: "แล้ว", why: "แล้ว at the end = already, done." },
        { q: "คุณ＿กินทุเรียนไหม", en: "Have you ever eaten durian?", options: ["เคย", "จะ", "แล้ว", "กำลัง"], answer: "เคย", why: "เคย = have ever." },
        { q: "＿ผมไปทะเล", en: "Yesterday I went to the sea.", options: ["เมื่อวาน", "พรุ่งนี้", "จะ", "กำลัง"], answer: "เมื่อวาน", why: "A time word is enough to show the past." },
      ],
    },
    {
      id: "classifiers",
      title: "Counting with classifiers",
      particle: "ตัว คน เล่ม",
      summary: "Noun, number, then a counting word that depends on the kind of thing.",
      sections: [
        {
          p: "To count, say the noun, the number, and a <b>classifier</b>: แมว สอง <b>ตัว</b> “two cats” (cat two body). Each kind of thing has its own: <b>คน</b> for people, <b>ตัว</b> for animals and clothes, <b>เล่ม</b> for books, <b>อัน</b> for small things in general.",
          examples: [
            ["นักเรียนห้า{คน}", "nakrian ha khon", "five students"],
            ["แมวสอง{ตัว}", "maeo song tua", "two cats"],
            ["หนังสือสาม{เล่ม}", "nangsue sam lem", "three books"],
          ],
        },
        {
          h: "Containers and “this one”",
          p: "Drinks are counted by their container: กาแฟสอง<b>แก้ว</b> (two glasses / cups of coffee), น้ำหนึ่ง<b>ขวด</b> (a bottle of water). The classifier also goes with นี้: แมว<b>ตัว</b>นี้, “this cat”.",
          examples: [
            ["กาแฟสอง{แก้ว}", "kafae song kaeo", "two coffees"],
            ["น้ำหนึ่ง{ขวด}", "nam nueng khuat", "a bottle of water"],
          ],
        },
      ],
      drills: [
        { q: "ผมมีน้องสาวสอง＿", en: "I have two younger sisters.", options: ["คน", "ตัว", "เล่ม", "แก้ว"], answer: "คน", why: "People are counted with คน." },
        { q: "หมาสาม＿", en: "three dogs", options: ["ตัว", "คน", "เล่ม", "ขวด"], answer: "ตัว", why: "Animals are counted with ตัว." },
        { q: "ขอเบียร์สอง＿", en: "Two bottles of beer, please.", options: ["ขวด", "ตัว", "คน", "เล่ม"], answer: "ขวด", why: "ขวด = bottle." },
        { q: "Which means “four books”?", en: "หนังสือ = book, สี่ = four", options: ["หนังสือสี่เล่ม", "สี่หนังสือ", "สี่เล่มหนังสือ", "หนังสือเล่มสี่"], answer: "หนังสือสี่เล่ม", why: "Noun, number, classifier." },
        { q: "เสื้อ＿นี้สวย", en: "This shirt is pretty.", options: ["ตัว", "คน", "เล่ม", "แก้ว"], answer: "ตัว", why: "Clothes use ตัว, which also goes before นี้." },
      ],
    },
  ],
};
