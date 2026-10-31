// Bengali first grammar for the Grammar Learner. Written for this project.
// Examples are [Bengali, transliteration, English]; {braces} mark the point of the lesson.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.bengali = {
  title: "Bengali first grammar",
  intro: "Bengali (Bangla) puts the verb last and has no grammatical gender: the verb changes for the person and for how polite you are, but never for he or she. Present-tense sentences often need no “is”. These lessons cover sentences without “to be” and আছে, verbs and politeness, saying no, questions, “the” with -টা and plurals, and “my” and “in”. The transliteration is simplified: o is the short vowel most consonants carry, and ch, th, kh are breathy sounds.",
  lessons: [
    {
      id: "no-to-be",
      title: "আমি ছাত্র — and আছে",
      particle: "আছে",
      summary: "“I am a student” needs no verb; আছে says where something is or that it exists.",
      sections: [
        {
          p: "Saying what someone or something is needs no verb: <b>আমি ছাত্র</b> is literally “I student”. The pronouns are <b>আমি</b> I, <b>তুমি</b> you (friendly), <b>আপনি</b> you (polite), <b>সে</b> he/she, <b>তিনি</b> he/she (polite).",
          examples: [
            ["আমি শিক্ষক।", "Ami shikkhok.", "I am a teacher."],
            ["উনি আমার মা।", "Uni amar ma.", "She is my mother."],
            ["এটা আমার বই।", "Eta amar boi.", "This is my book."],
          ],
        },
        {
          h: "আছে — is there, is somewhere",
          p: "For where something is, or that it exists, use <b>আছে</b> (achhe). With আমার (my) it means “I have”: <b>আমার একটা বই আছে</b>, “I have a book”.",
          examples: [
            ["সে বাড়িতে {আছে}।", "She barite achhe.", "He / she is at home."],
            ["এখানে একটা দোকান {আছে}।", "Ekhane ekta dokan achhe.", "There is a shop here."],
            ["আমার দুটো ভাই {আছে}।", "Amar duto bhai achhe.", "I have two brothers."],
          ],
        },
      ],
      drills: [
        { q: "Which sentence means “I am a doctor”?", en: "ডাক্তার = doctor", options: ["আমি ডাক্তার।", "আমি আছে ডাক্তার।", "ডাক্তার আছি।", "আমার ডাক্তার।"], answer: "আমি ডাক্তার।", why: "Saying what someone is needs no verb." },
        { q: "বাবা অফিসে ＿।", en: "Dad is at the office.", options: ["আছে", "আমি", "না", "কি"], answer: "আছে", why: "Saying where someone is: আছে." },
        { q: "আমার একটা গাড়ি ＿।", en: "I have a car.", options: ["আছে", "নেই", "করি", "যাই"], answer: "আছে", why: "আমার … আছে = I have." },
        { q: "＿ কেমন আছেন?", en: "How are you? (polite)", options: ["আপনি", "তুমি", "আমি", "সে"], answer: "আপনি", why: "Polite “you” is আপনি." },
        { q: "What does «এটা আমার বাড়ি» mean?", en: "বাড়ি = house", options: ["This is my house.", "I have a house.", "My house is here.", "Is this my house?"], answer: "This is my house.", why: "এটা (this) + আমার (my) + বাড়ি, with no verb." },
      ],
    },
    {
      id: "present",
      title: "Verbs and politeness",
      particle: "-ই -ও -এন",
      summary: "The verb ending shows the person and the level of politeness, and comes last.",
      sections: [
        {
          p: "The verb goes at the end and takes an ending for who does it. For করা (to do): <b>আমি করি</b>, <b>তুমি করো</b>, <b>আপনি করেন</b>, <b>সে করে</b>, <b>তিনি করেন</b>. Plural subjects use the same endings: আমরা করি, তারা করে.",
          examples: [
            ["আমি ভাত খা{ই}।", "Ami bhat khai.", "I eat rice."],
            ["তুমি কোথায় থাক{ো}?", "Tumi kothay thako?", "Where do you live? (friendly)"],
            ["আপনি বাংলা বল{েন}?", "Apni bangla bolen?", "Do you speak Bengali? (polite)"],
          ],
        },
        {
          h: "Three levels of “you”",
          p: "<b>আপনি</b> (-en) for strangers and elders, <b>তুমি</b> (-o) for friends and family, <b>তুই</b> (bare stem) for close friends and children. He/she has a polite form too: সে (-e) and তিনি or উনি (-en).",
          examples: [
            ["সে গান গা{য়}।", "She gan gay.", "He / she sings."],
            ["উনি ঢাকায় থাক{েন}।", "Uni Dhakay thaken.", "He / she lives in Dhaka. (polite)"],
          ],
        },
      ],
      drills: [
        { q: "আমি চা খা＿।", en: "I drink tea. (খাওয়া)", options: ["ই", "ও", "েন", "ে"], answer: "ই", why: "“I” takes -ই: খাই." },
        { q: "তুমি কী কর＿?", en: "What do you do? (friendly)", options: ["ো", "ি", "েন", "ে"], answer: "ো", why: "তুমি takes -ও: করো." },
        { q: "আপনি কোথায় থাক＿?", en: "Where do you live? (polite)", options: ["েন", "ো", "ি", "ে"], answer: "েন", why: "আপনি takes -েন: থাকেন." },
        { q: "সে স্কুলে যা＿।", en: "He goes to school.", options: ["য়", "ই", "ন", "ও"], answer: "য়", why: "সে takes -এ; after a vowel it is written য়: যায়." },
        { q: "Where does the verb go?", en: "", options: ["At the end", "First", "Second", "Anywhere"], answer: "At the end", why: "Bengali is subject – object – verb." },
      ],
    },
    {
      id: "na",
      title: "না and নেই — saying no",
      particle: "না নেই",
      summary: "না comes after the verb; নেই is the opposite of আছে.",
      sections: [
        {
          p: "To make a present-tense verb negative, put <b>না</b> after it: <b>আমি জানি না</b>, “I don't know”. For a sentence with no verb, add <b>নই / নও / নন / নয়</b>: আমি ছাত্র নই, “I'm not a student”.",
          examples: [
            ["আমি বুঝি {না}।", "Ami bujhi na.", "I don't understand."],
            ["সে মাছ খায় {না}।", "She machh khay na.", "He doesn't eat fish."],
            ["এটা আমার নয়।", "Eta amar noy.", "This isn't mine."],
          ],
        },
        {
          h: "নেই",
          p: "The negative of আছে is <b>নেই</b>: “isn't there, don't have”.",
          examples: [
            ["আজ সময় {নেই}।", "Aj somoy nei.", "There's no time today."],
            ["আমার টাকা {নেই}।", "Amar taka nei.", "I don't have any money."],
          ],
        },
      ],
      drills: [
        { q: "আমি জানি ＿।", en: "I don't know.", options: ["না", "নেই", "আছে", "কি"], answer: "না", why: "না goes after the verb." },
        { q: "দোকানে দুধ ＿।", en: "There's no milk in the shop.", options: ["নেই", "না", "আছে", "নয়"], answer: "নেই", why: "The negative of আছে is নেই." },
        { q: "Which means “He doesn't drink tea”?", en: "", options: ["সে চা খায় না।", "সে না চা খায়।", "না সে চা খায়।", "সে চা নেই খায়।"], answer: "সে চা খায় না।", why: "না comes after the verb, at the end." },
        { q: "আমার ভাই ＿, শুধু বোন আছে।", en: "I don't have a brother, only a sister.", options: ["নেই", "না", "আছে", "নই"], answer: "নেই", why: "“Don't have” is … নেই." },
        { q: "এটা চা ＿, এটা কফি।", en: "This isn't tea, it's coffee.", options: ["নয়", "নেই", "না", "আছে"], answer: "নয়", why: "A sentence with no verb takes নয় for “is not”." },
      ],
    },
    {
      id: "questions",
      title: "Asking questions",
      particle: "কি কী",
      summary: "কি makes a yes/no question; question words sit just before the verb.",
      sections: [
        {
          p: "Put <b>কি</b> (ki) after the subject for a yes/no question: <b>তুমি কি আসবে?</b> “Will you come?” Spoken with a rising voice, the sentence alone also works.",
          examples: [
            ["আপনি {কি} ইংরেজি বলেন?", "Apni ki ingreji bolen?", "Do you speak English?"],
            ["তুমি {কি} ক্লান্ত?", "Tumi ki klanto?", "Are you tired?"],
          ],
        },
        {
          h: "Question words",
          p: "<b>কী</b> what, <b>কে</b> who, <b>কোথায়</b> where, <b>কখন</b> when, <b>কেন</b> why, <b>কেমন</b> how, <b>কত</b> how much. They usually go just before the verb. Note কি (yes/no) and কী (what) are spelled differently.",
          examples: [
            ["আপনার নাম {কী}?", "Apnar nam ki?", "What is your name?"],
            ["বাথরুম {কোথায়}?", "Bathrum kothay?", "Where is the bathroom?"],
            ["এটার দাম {কত}?", "Etar dam koto?", "How much is this?"],
          ],
        },
      ],
      drills: [
        { q: "তুমি ＿ যাচ্ছ?", en: "Where are you going?", options: ["কোথায়", "কী", "কে", "কত"], answer: "কোথায়", why: "কোথায় = where." },
        { q: "উনি ＿?", en: "Who is he?", options: ["কে", "কী", "কেন", "কখন"], answer: "কে", why: "কে = who." },
        { q: "আপনি ＿ আছেন?", en: "How are you?", options: ["কেমন", "কোথায়", "কত", "কে"], answer: "কেমন", why: "কেমন = how; কেমন আছেন? is the everyday greeting." },
        { q: "তুমি ＿ চা খাবে?", en: "Will you have tea?", options: ["কি", "কী", "কে", "না"], answer: "কি", why: "Yes/no questions use কি, with a short i." },
        { q: "ট্রেন ＿ ছাড়বে?", en: "When will the train leave?", options: ["কখন", "কেন", "কত", "কে"], answer: "কখন", why: "কখন = when." },
      ],
    },
    {
      id: "ta-gulo",
      title: "-টা and -গুলো: “the” and plurals",
      particle: "-টা -রা",
      summary: "A classifier on the end makes a noun definite; -রা and -গুলো make plurals.",
      sections: [
        {
          p: "Bengali has no separate word for “the”. Adding <b>-টা</b> (or the more formal <b>-টি</b>) to a noun makes it definite: <b>বই</b> a book, <b>বইটা</b> the book. With a number it means “one, two of”: <b>একটা বই</b> a book, <b>দুটো বই</b> two books.",
          examples: [
            ["বই{টা} কোথায়?", "Boita kothay?", "Where is the book?"],
            ["{একটা} কলম দিন।", "Ekta kolom din.", "Give me a pen, please."],
            ["আমার {দুটো} বিড়াল আছে।", "Amar duto biral achhe.", "I have two cats."],
          ],
        },
        {
          h: "Plurals",
          p: "People take <b>-রা</b> (or <b>-এরা</b> after a consonant): ছেলে → ছেলেরা, the boys. Things and animals take <b>-গুলো</b>: বই → বইগুলো, the books. After a number no plural ending is used.",
          examples: [
            ["ছাত্র{রা} এসেছে।", "Chhatrora esechhe.", "The students have come."],
            ["আম{গুলো} মিষ্টি।", "Amgulo mishti.", "The mangoes are sweet."],
          ],
        },
      ],
      drills: [
        { q: "চাবি＿ কোথায়?", en: "Where is the key?", options: ["টা", "রা", "গুলো", "র"], answer: "টা", why: "-টা makes it “the key”." },
        { q: "মেয়ে＿ গান গাইছে।", en: "The girls are singing.", options: ["রা", "গুলো", "টা", "তে"], answer: "রা", why: "People take -রা in the plural." },
        { q: "কলা＿ খুব পাকা।", en: "The bananas are very ripe.", options: ["গুলো", "রা", "টা", "র"], answer: "গুলো", why: "Things take -গুলো." },
        { q: "＿ কাপ চা, প্লিজ।", en: "Two cups of tea, please.", options: ["দুটো", "দুজন", "দুগুলো", "দুইরা"], answer: "দুটো", why: "Things take দুটো; দুজন is for counting people." },
        { q: "What does «একটা আম» mean?", en: "আম = mango", options: ["a mango", "the mangoes", "the mango", "one of the mangoes"], answer: "a mango", why: "একটা = one, a." },
      ],
    },
    {
      id: "cases",
      title: "My, of, and in: -র and -তে",
      particle: "-র -তে",
      summary: "-র / -এর means “of”, and -তে / -এ means “in, at”.",
      sections: [
        {
          p: "Add <b>-র</b> after a vowel or <b>-এর</b> after a consonant for “of, 's”: রামের বাড়ি, Ram's house. The pronouns: <b>আমার</b> my, <b>তোমার</b> your, <b>আপনার</b> your (polite), <b>তার</b> his/her.",
          examples: [
            ["{আমার} নাম রিনা।", "Amar nam Rina.", "My name is Rina."],
            ["রাম{ের} বাড়ি", "Ramer bari", "Ram's house"],
            ["{আপনার} দেশ কোথায়?", "Apnar desh kothay?", "Where is your country? (Where are you from?)"],
          ],
        },
        {
          h: "In, at",
          p: "<b>-তে</b> after a vowel and <b>-এ</b> after a consonant mean “in, at, to”: বাড়ি → বাড়িতে (at home), ঢাকা → ঢাকায় (in Dhaka, written with য় after আ).",
          examples: [
            ["আমি কলকাতা{য়} থাকি।", "Ami Kolkatay thaki.", "I live in Kolkata."],
            ["বই টেবিল{ে} আছে।", "Boi tebile achhe.", "The book is on the table."],
            ["ও বাড়ি{তে} নেই।", "O barite nei.", "He isn't at home."],
          ],
        },
      ],
      drills: [
        { q: "＿ বাবা ডাক্তার।", en: "My father is a doctor.", options: ["আমার", "আমি", "তুমি", "আমায়"], answer: "আমার", why: "আমার = my." },
        { q: "দিদি＿ বই", en: "my elder sister's book", options: ["র", "এর", "তে", "রা"], answer: "র", why: "After a vowel, “of” is -র." },
        { q: "আমি স্কুল＿ যাই।", en: "I go to school.", options: ["ে", "র", "টা", "রা"], answer: "ে", why: "After a consonant, “to, at” is -এ: স্কুলে." },
        { q: "সে অফিস＿ কাজ করে।", en: "She works at an office.", options: ["ে", "তে", "র", "গুলো"], answer: "ে", why: "অফিস ends in a consonant: অফিসে." },
        { q: "＿ নাম কী?", en: "What is your name? (polite)", options: ["আপনার", "তোমার", "আপনি", "তার"], answer: "আপনার", why: "Polite “your” is আপনার." },
      ],
    },
  ],
};
