// Modern Greek first grammar for the Grammar Learner. Written for this project.
// Examples are [Greek, romanization, English]; {braces} mark the point of the lesson.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.greek = {
  title: "Greek first grammar",
  intro: "Modern Greek marks the subject on the verb, so “I” and “you” are usually left out. Every noun is masculine, feminine or neuter, and the article in front of it shows which, and changes when the noun is the object. These lessons cover “to be”, the article and gender, the present tense, saying no and asking questions, the object form, and plurals. The romanization follows modern pronunciation, with an accent on the stressed vowel.",
  lessons: [
    {
      id: "eimai",
      title: "Είμαι, είσαι, είναι — “to be”",
      particle: "είμαι",
      summary: "The verb “to be”, and why Greek leaves out “I” and “you”.",
      sections: [
        {
          p: "The ending of the verb already says who: <b>είμαι</b> “I am”, <b>είσαι</b> “you are”, <b>είναι</b> “he, she, it is”. So εγώ (I) and εσύ (you) are only added for emphasis.",
          examples: [
            ["{Είμαι} φοιτητής.", "Íme fititís.", "I am a student."],
            ["Πού {είσαι};", "Pu íse?", "Where are you?"],
            ["Η Μαρία {είναι} γιατρός.", "I María íne giatrós.", "Maria is a doctor."],
          ],
        },
        {
          h: "The plural",
          p: "<b>είμαστε</b> “we are”, <b>είστε</b> “you are” (several people, or one person politely), <b>είναι</b> “they are”. Note that είναι serves for both “is” and “are”.",
          examples: [
            ["{Είμαστε} φίλοι.", "Ímaste fíli.", "We are friends."],
            ["Από πού {είστε};", "Apó pu íste?", "Where are you from? (polite)"],
            ["Τα παιδιά {είναι} στο σπίτι.", "Ta pediá íne sto spíti.", "The children are at home."],
          ],
        },
      ],
      drills: [
        { q: "＿ από την Αθήνα.", en: "I am from Athens.", options: ["Είμαι", "Είσαι", "Είναι", "Είμαστε"], answer: "Είμαι", why: "“I am” is είμαι; no εγώ is needed." },
        { q: "Ο Νίκος ＿ δάσκαλος.", en: "Nikos is a teacher.", options: ["είναι", "είμαι", "είσαι", "είστε"], answer: "είναι", why: "He, she or it: είναι." },
        { q: "Τι κάνετε; ＿ καλά;", en: "How are you? Are you well? (polite)", options: ["Είστε", "Είσαι", "Είμαστε", "Είμαι"], answer: "Είστε", why: "Polite “you” uses the plural, είστε." },
        { q: "＿ Έλληνες.", en: "We are Greeks.", options: ["Είμαστε", "Είναι", "Είστε", "Είμαι"], answer: "Είμαστε", why: "“We are” is είμαστε." },
        { q: "Τα σπίτια ＿ μεγάλα.", en: "The houses are big.", options: ["είναι", "είμαστε", "είσαι", "είμαι"], answer: "είναι", why: "“They are” is also είναι." },
      ],
    },
    {
      id: "articles",
      title: "Ο, η, το — the article and gender",
      particle: "ο η το",
      summary: "Three genders, each with its own word for “the”, and the endings that give them away.",
      sections: [
        {
          p: "“The” is <b>ο</b> before a masculine noun, <b>η</b> before a feminine one and <b>το</b> before a neuter one. The ending is a strong clue: masculine nouns usually end in <b>-ος, -ας, -ης</b>, feminine in <b>-α, -η</b>, neuter in <b>-ο, -ι, -μα</b>.",
          examples: [
            ["{ο} δρόμος, {ο} άντρας", "o drómos, o ándras", "the street, the man"],
            ["{η} πόλη, {η} θάλασσα", "i póli, i thálassa", "the town, the sea"],
            ["{το} νερό, {το} σπίτι, {το} όνομα", "to neró, to spíti, to ónoma", "the water, the house, the name"],
          ],
        },
        {
          h: "“A”",
          p: "The word for “a” also has a gender: <b>ένας</b> (masculine), <b>μία / μια</b> (feminine), <b>ένα</b> (neuter). They are also the number “one”. Adjectives take the matching ending: καλός, καλή, καλό (good).",
          examples: [
            ["{ένας} καλός φίλος", "énas kalós fílos", "a good friend"],
            ["{μια} μεγάλη πόλη", "mia megáli póli", "a big city"],
            ["{ένα} μικρό παιδί", "éna mikró pedí", "a small child"],
          ],
        },
      ],
      drills: [
        { q: "＿ θάλασσα είναι ζεστή.", en: "The sea is warm.", options: ["Η", "Ο", "Το"], answer: "Η", why: "θάλασσα ends in -α, a feminine ending: η." },
        { q: "＿ δρόμος είναι μακρύς.", en: "The road is long.", options: ["Ο", "Η", "Το"], answer: "Ο", why: "-ος is the usual masculine ending: ο." },
        { q: "＿ σπίτι είναι μικρό.", en: "The house is small.", options: ["Το", "Ο", "Η"], answer: "Το", why: "Nouns in -ι are neuter: το." },
        { q: "Έχω ＿ αδερφή.", en: "I have a sister.", options: ["μια", "ένας", "ένα"], answer: "μια", why: "αδερφή is feminine, so “a” is μια." },
        { q: "＿ καφές, παρακαλώ.", en: "A coffee, please.", options: ["Ένας", "Μια", "Ένα"], answer: "Ένας", why: "καφές ends in -ές, masculine: ένας." },
      ],
    },
    {
      id: "present",
      title: "The present tense",
      particle: "-ω -εις -ει",
      summary: "Six endings that say who does it, in the two main verb groups.",
      sections: [
        {
          p: "Most verbs end in <b>-ω</b>. Keep the stem and change the ending: <b>-ω</b> (I), <b>-εις</b> (you), <b>-ει</b> (he/she), <b>-ουμε</b> (we), <b>-ετε</b> (you all), <b>-ουν</b> (they). For γράφω, to write: γράφω, γράφεις, γράφει, γράφουμε, γράφετε, γράφουν.",
          examples: [
            ["{Μένω} στην Αθήνα.", "Méno stin Athína.", "I live in Athens."],
            ["Τι {διαβάζεις};", "Ti diavázis?", "What are you reading?"],
            ["Τα παιδιά {παίζουν} έξω.", "Ta pediá pézun éxo.", "The children are playing outside."],
          ],
        },
        {
          h: "Verbs stressed on the end",
          p: "A second group is stressed on the ending, like <b>μιλάω</b> (to speak): μιλάω, μιλάς, μιλάει, μιλάμε, μιλάτε, μιλάνε. Αγαπάω (love), ρωτάω (ask) and πεινάω (be hungry) go the same way. One present form covers both “I speak” and “I am speaking”.",
          examples: [
            ["{Μιλάτε} αγγλικά;", "Miláte angliká?", "Do you speak English?"],
            ["{Μιλάω} λίγα ελληνικά.", "Miláo líga elliniká.", "I speak a little Greek."],
          ],
        },
      ],
      drills: [
        { q: "Εγώ ＿ καφέ.", en: "I drink coffee. (πίνω)", options: ["πίνω", "πίνεις", "πίνει", "πίνουν"], answer: "πίνω", why: "“I” takes -ω." },
        { q: "Εσύ τι ＿;", en: "What do you want? (θέλω)", options: ["θέλεις", "θέλω", "θέλει", "θέλουμε"], answer: "θέλεις", why: "“You” (one person) takes -εις." },
        { q: "Εμείς ＿ στη Θεσσαλονίκη.", en: "We live in Thessaloniki. (μένω)", options: ["μένουμε", "μένουν", "μένετε", "μένει"], answer: "μένουμε", why: "“We” takes -ουμε." },
        { q: "Η Άννα ＿ γαλλικά.", en: "Anna speaks French. (μιλάω)", options: ["μιλάει", "μιλάω", "μιλάμε", "μιλάνε"], answer: "μιλάει", why: "In the μιλάω group, he/she is μιλάει." },
        { q: "Οι φίλοι μου ＿ μουσική.", en: "My friends listen to music. (ακούω)", options: ["ακούνε", "ακούει", "ακούω", "ακούμε"], answer: "ακούνε", why: "“They” takes -ουν, or -ουνε / -νε in speech; ακούω gives ακούνε." },
      ],
    },
    {
      id: "den-questions",
      title: "Δεν, and asking questions",
      particle: "δεν ;",
      summary: "Put δεν before the verb to say no; a question needs only a rising voice and a “;”.",
      sections: [
        {
          p: "To make a verb negative, put <b>δεν</b> right before it. The word order does not change.",
          examples: [
            ["{Δεν} καταλαβαίνω.", "Den katalavéno.", "I don't understand."],
            ["Ο Πέτρος {δεν} είναι εδώ.", "O Pétros den íne edó.", "Petros isn't here."],
          ],
        },
        {
          h: "Questions",
          p: "A yes/no question is the same sentence said with a rising voice. Greek writes the question mark as <b>;</b>, which looks like an English semicolon. The question words go first: <b>τι</b> (what), <b>πού</b> (where), <b>πότε</b> (when), <b>ποιος</b> (who), <b>γιατί</b> (why), <b>πώς</b> (how), <b>πόσο</b> (how much).",
          examples: [
            ["Είσαι καλά{;}", "Íse kalá?", "Are you well?"],
            ["{Πού} είναι η τουαλέτα;", "Pu íne i tualéta?", "Where is the toilet?"],
            ["{Πόσο} κάνει;", "Póso káni?", "How much is it?"],
          ],
        },
      ],
      drills: [
        { q: "＿ θέλω ψωμί.", en: "I don't want bread.", options: ["Δεν", "Όχι", "Μη", "Ναι"], answer: "Δεν", why: "δεν goes right before the verb. όχι is the word “no” on its own." },
        { q: "＿ είναι το μουσείο;", en: "Where is the museum?", options: ["Πού", "Τι", "Πότε", "Ποιος"], answer: "Πού", why: "πού = where." },
        { q: "＿ είναι αυτός;", en: "Who is he?", options: ["Ποιος", "Πού", "Πώς", "Πόσο"], answer: "Ποιος", why: "ποιος = who." },
        { q: "Which sentence is a question?", en: "", options: ["Μιλάς ελληνικά;", "Μιλάς ελληνικά.", "Μιλάς ελληνικά,", "Μιλάς ελληνικά!"], answer: "Μιλάς ελληνικά;", why: "The Greek question mark is ;." },
        { q: "＿ σε λένε;", en: "What's your name? (How do they call you?)", options: ["Πώς", "Πού", "Γιατί", "Πότε"], answer: "Πώς", why: "Greeks ask “how do they call you?”: Πώς σε λένε;" },
      ],
    },
    {
      id: "accusative",
      title: "The object: τον, την, το",
      particle: "τον την",
      summary: "When a noun is the object, or comes after a preposition, its article and ending change.",
      sections: [
        {
          p: "The object of a verb takes the accusative. The article changes: <b>ο → τον</b>, <b>η → την</b>, and <b>το</b> stays. Masculine nouns drop their final -ς: ο φίλος → τον φίλο, ο άντρας → τον άντρα.",
          examples: [
            ["Βλέπω {τον} φίλο μου.", "Vlépo ton fílo mu.", "I see my friend."],
            ["Ξέρεις {την} Ελένη;", "Xéris tin Eléni?", "Do you know Eleni?"],
            ["Πίνω {τον} καφέ.", "Píno ton kafé.", "I am drinking the coffee."],
          ],
        },
        {
          h: "σε + the article: στο, στη, στον",
          p: "<b>σε</b> (to, at, in) joins the article: <b>στον</b> (masculine), <b>στη(ν)</b> (feminine), <b>στο</b> (neuter). Prepositions like από (from), με (with) and για (for) also take the accusative.",
          examples: [
            ["Πάω {στο} σπίτι.", "Páo sto spíti.", "I'm going home."],
            ["Μένει {στην} Κρήτη.", "Méni stin Kríti.", "She lives in Crete."],
            ["Μιλάω με {τον} Γιάννη.", "Miláo me ton Giánni.", "I'm talking with Giannis."],
          ],
        },
      ],
      drills: [
        { q: "Αγαπώ ＿ θάλασσα.", en: "I love the sea.", options: ["την", "η", "τον", "το"], answer: "την", why: "Feminine object: η becomes την." },
        { q: "Περιμένω ＿ λεωφορείο.", en: "I'm waiting for the bus.", options: ["το", "τον", "την", "ο"], answer: "το", why: "λεωφορείο is neuter; το stays the same." },
        { q: "Ξέρω τον ＿.", en: "I know the teacher. (ο δάσκαλος)", options: ["δάσκαλο", "δάσκαλος", "δάσκαλοι", "δασκάλου"], answer: "δάσκαλο", why: "A masculine object loses its final -ς." },
        { q: "Πάμε ＿ παραλία;", en: "Shall we go to the beach? (η παραλία)", options: ["στην", "στον", "στο", "σε η"], answer: "στην", why: "σε + την = στην." },
        { q: "Είμαι ＿ γραφείο.", en: "I'm at the office. (το γραφείο)", options: ["στο", "στον", "στη", "το"], answer: "στο", why: "σε + το = στο." },
      ],
    },
    {
      id: "plural",
      title: "Plurals: οι and τα",
      particle: "οι τα",
      summary: "Masculine and feminine plurals take οι; neuter plurals take τα.",
      sections: [
        {
          p: "“The” in the plural is <b>οι</b> for masculine and feminine nouns and <b>τα</b> for neuter ones. Common endings: -ος → <b>-οι</b>, -ας and -ης → <b>-ες</b>, -α and -η → <b>-ες</b>, -ο → <b>-α</b>, -ι → <b>-ια</b>, -μα → <b>-ματα</b>.",
          examples: [
            ["{οι} φίλοι", "i fíli", "the friends (ο φίλος)"],
            ["{οι} γυναίκες", "i ginékes", "the women (η γυναίκα)"],
            ["{τα} βιβλία, {τα} παιδιά", "ta vivlía, ta pediá", "the books, the children"],
            ["{τα} ονόματα", "ta onómata", "the names (το όνομα)"],
          ],
        },
        {
          h: "Adjectives follow",
          p: "Adjectives take a plural ending too: καλοί (masculine), καλές (feminine), καλά (neuter). And the verb is plural: τα παιδιά είναι, οι φίλοι μένουν.",
          examples: [
            ["Τα σπίτια είναι {μεγάλα}.", "Ta spítia íne megála.", "The houses are big."],
            ["Οι μέρες είναι {ζεστές}.", "I méres íne zestés.", "The days are hot."],
          ],
        },
      ],
      drills: [
        { q: "＿ παιδιά παίζουν.", en: "The children are playing.", options: ["Τα", "Οι", "Το", "Η"], answer: "Τα", why: "παιδί is neuter; neuter plurals take τα." },
        { q: "Οι ＿ είναι εδώ.", en: "The friends are here. (ο φίλος)", options: ["φίλοι", "φίλος", "φίλα", "φίλες"], answer: "φίλοι", why: "-ος becomes -οι." },
        { q: "Δύο ＿, παρακαλώ.", en: "Two coffees, please. (ο καφές)", options: ["καφέδες", "καφέ", "καφές", "καφέα"], answer: "καφέδες", why: "Some masculines in -ές add -δες; ask for δύο καφέδες." },
        { q: "Τα ＿ μου είναι στην τσάντα.", en: "My books are in the bag. (το βιβλίο)", options: ["βιβλία", "βιβλίοι", "βιβλίες", "βιβλίο"], answer: "βιβλία", why: "Neuter -ο becomes -α." },
        { q: "Οι πόλεις είναι ＿.", en: "The cities are beautiful. (ωραίος, -α, -ο)", options: ["ωραίες", "ωραίοι", "ωραία", "ωραίος"], answer: "ωραίες", why: "πόλη is feminine; feminine plural adjectives end in -ες." },
      ],
    },
  ],
};
