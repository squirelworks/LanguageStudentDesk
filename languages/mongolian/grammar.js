// Mongolian first grammar for the Grammar Learner. Written for this project.
// Examples are in Cyrillic, the script used in Mongolia, as [Mongolian, romanization, English];
// {braces} mark the point of the lesson. Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.mongolian = {
  title: "Mongolian first grammar",
  intro: "These lessons teach everyday Mongolian as it is spoken in Mongolia and written in Cyrillic there; the Reference cards show how the same words look in the traditional vertical script. The verb comes last, endings are added to words, and vowel harmony decides which form an ending takes: words with a, o, u take endings with a, o, u, and words with e, ö, ü take endings with e, ö, ü. The lessons cover pronouns and “is not”, questions, case endings, “have”, and verbs in the present and past.",
  lessons: [
    {
      id: "pronouns",
      title: "Pronouns, “is” and “is not”",
      particle: "би та биш",
      summary: "The pronouns; “is” is usually left out, and биш means “is not”.",
      sections: [
        {
          p: "<b>би</b> (bi) I, <b>чи</b> (chi) you, <b>та</b> (ta) you (polite, or more than one), <b>тэр</b> (ter) he, she, <b>бид</b> (bid) we, <b>тэд</b> (ted) they. In a simple statement no “is” is needed: Би оюутан, “I (am a) student”. To say “is not”, put <b>биш</b> (bish) at the end.",
          examples: [
            ["{Би} оюутан.", "Bi oyuutan.", "I am a student."],
            ["{Тэр} багш.", "Ter bagsh.", "She is a teacher."],
            ["Би эмч {биш}.", "Bi emch bish.", "I'm not a doctor."],
            ["{Та} сайн байна уу?", "Ta sain baina uu?", "Hello. (polite; literally “are you well?”)"],
          ],
        },
      ],
      drills: [
        { q: "＿ оюутан.", en: "I am a student.", options: ["Би", "Чи", "Тэр", "Бид"], answer: "Би", why: "Би = I." },
        { q: "Тэр багш ＿.", en: "He isn't a teacher.", options: ["биш", "байна", "уу", "вэ"], answer: "биш", why: "биш = is not." },
        { q: "＿ сайн байна уу?", en: "Hello. (polite, to one person)", options: ["Та", "Би", "Бид", "Тэд"], answer: "Та", why: "Та is the polite “you”." },
        { q: "＿ монгол хүн.", en: "We are Mongolian.", options: ["Бид", "Би", "Тэр", "Чи"], answer: "Бид", why: "Бид = we." },
        { q: "Би эмч ＿.", en: "I'm not a doctor.", options: ["биш", "байхгүй", "үү", "бэ"], answer: "биш", why: "A noun is negated with биш." },
      ],
    },
    {
      id: "questions",
      title: "Questions: уу, үү, вэ, бэ",
      particle: "уу үү вэ бэ",
      summary: "уу / үү for yes/no questions; вэ / бэ after a question word.",
      sections: [
        {
          p: "A yes/no question ends in <b>уу</b> (uu) after a word with back vowels (a, o, u) and <b>үү</b> (üü) after a word with front vowels (e, ö, ü, and words with only i). After a long vowel or diphthong these are written <b>юу</b> / <b>юү</b>.",
          examples: [
            ["Та оюутан {уу}?", "Ta oyuutan uu?", "Are you a student?"],
            ["Та эмч {үү}?", "Ta emch üü?", "Are you a doctor?"],
          ],
        },
        {
          h: "Question words",
          p: "A question with a question word ends in <b>вэ</b> (ve), or <b>бэ</b> (be) after в, м or н. Question words: <b>юу</b> (yuu) what, <b>хэн</b> (khen) who, <b>хаана</b> (khaana) where, <b>хэзээ</b> (khezee) when, <b>яагаад</b> (yaagaad) why, <b>яаж</b> (yaaj) how, <b>хэд</b> (khed) how many, how much.",
          examples: [
            ["Энэ юу {вэ}?", "Ene yuu ve?", "What is this?"],
            ["Таны нэр хэн {бэ}?", "Tany ner khen be?", "What is your name?"],
            ["Буудал {хаана} байна вэ?", "Buudal khaana baina ve?", "Where is the station?"],
          ],
        },
      ],
      drills: [
        { q: "Та оюутан ＿?", en: "Are you a student?", options: ["уу", "үү", "вэ", "биш"], answer: "уу", why: "оюутан has back vowels, so уу." },
        { q: "Та эмч ＿?", en: "Are you a doctor?", options: ["үү", "уу", "бэ", "биш"], answer: "үү", why: "эмч has a front vowel, so үү." },
        { q: "Энэ юу ＿?", en: "What is this?", options: ["вэ", "бэ", "уу", "үү"], answer: "вэ", why: "After a question word, вэ (бэ only after в, м, н)." },
        { q: "Таны нэр хэн ＿?", en: "What is your name?", options: ["бэ", "вэ", "уу", "үү"], answer: "бэ", why: "хэн ends in н, so бэ. Mongolian asks “who is your name?”." },
        { q: "Буудал ＿ байна вэ?", en: "Where is the station?", options: ["хаана", "хэн", "юу", "хэзээ"], answer: "хаана", why: "хаана = where." },
      ],
    },
    {
      id: "cases",
      title: "Endings for “my”, “in” and “from”",
      particle: "миний -д -аас",
      summary: "Case endings show possession, place and direction.",
      sections: [
        {
          p: "“My” is <b>миний</b> (minii), “your” <b>чиний</b> (chinii) or polite <b>таны</b> (tany), “his, her” <b>түүний</b> (tüünii), “our” <b>бидний</b> (bidnii).",
          examples: [
            ["{Миний} нэр Болд.", "Minii ner Bold.", "My name is Bold."],
            ["{Таны} нэр хэн бэ?", "Tany ner khen be?", "What is your name?"],
          ],
        },
        {
          h: "In, at; from",
          p: "<b>-д</b> (-d), or <b>-т</b> (-t) after г, р and с, means “in, at, to”: гэрт, at home; Улаанбаатарт, in Ulaanbaatar. <b>-аас / -ээс / -оос / -өөс</b> means “from”, following vowel harmony: Англиас, from England.",
          examples: [
            ["Би гэр{т} байна.", "Bi gert baina.", "I'm at home."],
            ["Би Улаанбаатар{т} амьдардаг.", "Bi Ulaanbaatart amidardag.", "I live in Ulaanbaatar."],
            ["Би Англи{аас} ирсэн.", "Bi Angliaas irsen.", "I come from England."],
          ],
        },
      ],
      drills: [
        { q: "＿ нэр Болд.", en: "My name is Bold.", options: ["Миний", "Чиний", "Таны", "Түүний"], answer: "Миний", why: "Миний = my." },
        { q: "Би ＿ байна.", en: "I'm at home.", options: ["гэрт", "гэрээс", "гэрийн", "гэр"], answer: "гэрт", why: "-т = in, at (after р)." },
        { q: "Би Англи＿ ирсэн.", en: "I come from England.", options: ["аас", "д", "ын", "тай"], answer: "аас", why: "-аас = from." },
        { q: "Би Улаанбаатар＿ амьдардаг.", en: "I live in Ulaanbaatar.", options: ["т", "аас", "ын", "тай"], answer: "т", why: "-т = in (after р)." },
        { q: "＿ нэр хэн бэ?", en: "What is your name? (polite)", options: ["Таны", "Миний", "Бидний", "Түүний"], answer: "Таны", why: "Таны = your (polite)." },
      ],
    },
    {
      id: "have",
      title: "There is, and “I have”",
      particle: "байна байхгүй надад",
      summary: "байна there is; байхгүй there isn't; надад … байна, I have.",
      sections: [
        {
          p: "<b>байна</b> (baina) means “there is”, and <b>байхгүй</b> (baikhgüi) “there isn't”. To say “I have”, say “to me there is”: <b>надад</b> (nadad) … байна. “You have” is <b>чамд</b> (chamd) or polite <b>танд</b> (tand).",
          examples: [
            ["Надад машин {байна}.", "Nadad mashin baina.", "I have a car."],
            ["Надад цаг {байхгүй}.", "Nadad tsag baikhgüi.", "I don't have time."],
            ["Танд ус {байна} уу?", "Tand us baina uu?", "Do you have water?"],
          ],
        },
      ],
      drills: [
        { q: "Надад машин ＿.", en: "I have a car.", options: ["байна", "байхгүй", "биш", "уу"], answer: "байна", why: "надад … байна = I have." },
        { q: "Надад цаг ＿.", en: "I don't have time.", options: ["байхгүй", "байна", "биш", "вэ"], answer: "байхгүй", why: "байхгүй = there isn't." },
        { q: "＿ ах байна.", en: "I have an older brother.", options: ["Надад", "Би", "Миний", "Танд"], answer: "Надад", why: "Надад = to me." },
        { q: "Танд ус ＿ уу?", en: "Do you have water?", options: ["байна", "байхгүй", "биш", "бэ"], answer: "байна", why: "байна уу? = is there? do you have?" },
        { q: "Энд кофе ＿.", en: "There's no coffee here.", options: ["байхгүй", "байна", "биш", "уу"], answer: "байхгүй", why: "байхгүй = there isn't." },
      ],
    },
    {
      id: "present",
      title: "Verbs: now, usually, will",
      particle: "-на -ж байна -даг",
      summary: "-на will, -ж байна is doing, -даг usually does, -хгүй won't.",
      sections: [
        {
          p: "Verbs come last and take endings that follow vowel harmony. <b>-на / -нэ / -но / -нө</b>: will do, явна (yavna) I'll go. <b>-ж байна</b>: is doing now, уншиж байна (unshij baina) I'm reading. <b>-даг / -дэг / -дог / -дөг</b>: usually does, ярьдаг (yaridag) speaks. <b>-хгүй</b>: won't, doesn't, идэхгүй (idekhgüi).",
          examples: [
            ["Би маргааш Хархорин руу {явна}.", "Bi margaash Kharkhorin ruu yavna.", "I'll go to Kharkhorin tomorrow."],
            ["Би одоо ном {уншиж байна}.", "Bi odoo nom unshij baina.", "I'm reading a book now."],
            ["Тэр монголоор {ярьдаг}.", "Ter mongoloor yaridag.", "She speaks Mongolian."],
            ["Би мах {иддэггүй}.", "Bi makh iddeggüi.", "I don't eat meat."],
          ],
        },
      ],
      drills: [
        { q: "Би маргааш Хархорин руу ＿.", en: "I'll go to Kharkhorin tomorrow.", options: ["явна", "явсан", "явахгүй", "явж байна"], answer: "явна", why: "Future: -на." },
        { q: "Би одоо ном ＿ байна.", en: "I'm reading a book now.", options: ["уншиж", "уншина", "уншсан", "уншихгүй"], answer: "уншиж", why: "Doing now: -ж байна." },
        { q: "Би маргааш ＿.", en: "I won't come tomorrow.", options: ["ирэхгүй", "ирнэ", "ирсэн", "ирж"], answer: "ирэхгүй", why: "-хгүй = won't." },
        { q: "Тэр монголоор ＿.", en: "She speaks Mongolian.", options: ["ярьдаг", "ярьсан", "ярихгүй", "ярьж"], answer: "ярьдаг", why: "Usually does: -даг." },
        { q: "Би одоо ＿ байна.", en: "I'm eating now.", options: ["идэж", "идсэн", "идэхгүй", "идэнэ"], answer: "идэж", why: "Doing now: -ж байна." },
      ],
    },
    {
      id: "past",
      title: "Verbs: the past",
      particle: "-сан -лаа -аагүй",
      summary: "-сан did, -лаа just did, -аагүй didn't.",
      sections: [
        {
          p: "<b>-сан / -сэн / -сон / -сөн</b> is the general past: ирсэн (irsen) came. <b>-лаа / -лээ / -лоо / -лөө</b> is a recent past, for something that just happened: ирлээ (irlee) I've arrived. <b>-аагүй / -ээгүй / -оогүй / -өөгүй</b> means “didn't”: үзээгүй (üzeegüi) didn't see.",
          examples: [
            ["Би өчигдөр Улаанбаатарт {ирсэн}.", "Bi öchigdör Ulaanbaatart irsen.", "I arrived in Ulaanbaatar yesterday."],
            ["Би хоол {идсэн}.", "Bi khool idsen.", "I've eaten."],
            ["Би тэр киног {үзээгүй}.", "Bi ter kinog üzeegüi.", "I didn't see that film."],
            ["За, би {ирлээ}!", "Za, bi irlee!", "Right, I'm here!"],
          ],
        },
      ],
      drills: [
        { q: "Би өчигдөр Улаанбаатарт ＿.", en: "I arrived in Ulaanbaatar yesterday.", options: ["ирсэн", "ирнэ", "ирэхгүй", "ирж"], answer: "ирсэн", why: "Past: -сэн (front vowels)." },
        { q: "Би хоол ＿.", en: "I've eaten.", options: ["идсэн", "идэнэ", "идэхгүй", "идэж"], answer: "идсэн", why: "Past: -сэн." },
        { q: "Би тэр киног ＿.", en: "I didn't see that film.", options: ["үзээгүй", "үзсэн", "үзнэ", "үзэхгүй"], answer: "үзээгүй", why: "Didn't: -ээгүй." },
        { q: "Тэр Монголд ＿ уу?", en: "Did he go to Mongolia?", options: ["очсон", "очно", "очихгүй", "очиж"], answer: "очсон", why: "Past: -сон (back vowel о)." },
        { q: "За, би ＿!", en: "Right, I'm here! (I've just arrived)", options: ["ирлээ", "ирнэ", "ирээгүй", "ирэхгүй"], answer: "ирлээ", why: "Just happened: -лээ." },
      ],
    },
  ],
};
