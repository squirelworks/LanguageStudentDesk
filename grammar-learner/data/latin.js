// Latin first grammar for the Grammar Learner. Written for this project.
// Examples are [Latin, word by word, English]; {braces} mark the point of the lesson.
// Drills are { q, en, options, answer, why }; ＿ is the blank.
window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.latin = {
  title: "Latin first grammar",
  intro: "Latin shows who does what by the endings of words, not by their order. A verb's ending tells you the subject, and a noun's ending tells you its job in the sentence. These lessons start with “to be” and the present tense, then the subject and object endings, plurals, adjectives that agree, and the two cases that follow prepositions. Long vowels are marked with macrons.",
  lessons: [
    {
      id: "esse",
      title: "Sum, es, est — “to be”",
      particle: "sum",
      summary: "The verb “to be”, and why Latin needs no “I” or “he”.",
      sections: [
        {
          p: "The verb's ending already says who: <b>sum</b> “I am”, <b>es</b> “you are”, <b>est</b> “he, she, it is”. So the pronoun is usually left out. Latin has no word for “a” or “the”.",
          examples: [
            ["Rōmānus {sum}.", "Roman · I am", "I am a Roman."],
            ["Laeta {es}.", "happy · you are", "You are happy."],
            ["Marcus agricola {est}.", "Marcus · farmer · is", "Marcus is a farmer."],
          ],
        },
        {
          h: "The plural",
          p: "<b>sumus</b> “we are”, <b>estis</b> “you all are”, <b>sunt</b> “they are”. The verb often comes last.",
          examples: [
            ["Amīcī {sumus}.", "friends · we are", "We are friends."],
            ["Puerī in hortō {sunt}.", "boys · in · garden · are", "The boys are in the garden."],
          ],
        },
      ],
      drills: [
        { q: "Ego discipulus ＿.", en: "I am a pupil.", options: ["sum", "es", "est", "sunt"], answer: "sum", why: "“I am” is sum." },
        { q: "Puellae laetae ＿.", en: "The girls are happy.", options: ["sunt", "est", "sumus", "estis"], answer: "sunt", why: "Several people (they): sunt." },
        { q: "What does «Rōma magna est» mean?", en: "magna = great", options: ["Rome is great.", "Great Rome.", "Rome was great.", "Is Rome great?"], answer: "Rome is great.", why: "est = is; the verb comes last." },
        { q: "Ubi ＿, Marce?", en: "Where are you, Marcus?", options: ["es", "est", "sum", "estis"], answer: "es", why: "Talking to one person: es." },
        { q: "Nōs Rōmānī ＿.", en: "We are Romans.", options: ["sumus", "sunt", "estis", "sum"], answer: "sumus", why: "“We are” is sumus." },
      ],
    },
    {
      id: "present",
      title: "The present tense",
      particle: "-ō -s -t",
      summary: "Six endings that say who does it.",
      sections: [
        {
          p: "Take the stem and add the person ending: <b>-ō</b> (I), <b>-s</b> (you), <b>-t</b> (he/she), <b>-mus</b> (we), <b>-tis</b> (you all), <b>-nt</b> (they). For amāre “to love”: amō, amās, amat, amāmus, amātis, amant.",
          examples: [
            ["{Amō} Rōmam.", "I love · Rome", "I love Rome."],
            ["Puella {cantat}.", "girl · sings", "The girl sings."],
            ["Agricolae {labōrant}.", "farmers · work", "The farmers work."],
          ],
        },
        {
          h: "Other verbs, same endings",
          p: "Verbs like monēre (to warn) keep an -e-: moneō, monēs, monet, monēmus, monētis, monent. The person endings are the same in every conjugation, which is what you need to spot first.",
          examples: [
            ["Magister nōs {monet}.", "teacher · us · warns", "The teacher warns us."],
            ["Quid {vidēs}?", "what · you see", "What do you see?"],
          ],
        },
      ],
      drills: [
        { q: "Ego in vīllā habit＿.", en: "I live in a villa.", options: ["ō", "at", "ās", "ant"], answer: "ō", why: "“I” takes -ō: habitō." },
        { q: "Puerī in agrō labōr＿.", en: "The boys work in the field.", options: ["ant", "at", "ō", "āmus"], answer: "ant", why: "“They” takes -nt: labōrant." },
        { q: "What does «ambulāmus» mean?", en: "ambulāre = to walk", options: ["we walk", "they walk", "you walk", "I walk"], answer: "we walk", why: "-mus = we." },
        { q: "Tū bene cant＿.", en: "You sing well.", options: ["ās", "at", "ō", "ātis"], answer: "ās", why: "One person “you”: -s, here cantās." },
        { q: "Who does «spectātis» refer to?", en: "spectāre = to watch", options: ["you all", "we", "they", "he or she"], answer: "you all", why: "-tis = you (plural)." },
        { q: "Servus vīnum port＿.", en: "The slave carries the wine.", options: ["at", "ant", "ō", "āmus"], answer: "at", why: "One person, he: -t." },
      ],
    },
    {
      id: "nom-acc",
      title: "Subject and object",
      particle: "-a / -am",
      summary: "The ending, not the order, says who does what.",
      sections: [
        {
          p: "The subject is in the <b>nominative</b>, the object in the <b>accusative</b>. For nouns like puella: puella (subject), puell<b>am</b> (object). For nouns like servus: servus, serv<b>um</b>.",
          examples: [
            ["{Puella} {servum} videt.", "girl (subject) · slave (object) · sees", "The girl sees the slave."],
            ["{Servus} {puellam} videt.", "slave (subject) · girl (object) · sees", "The slave sees the girl."],
          ],
        },
        {
          h: "Free word order",
          p: "Because the endings carry the meaning, the words can move for emphasis. Both sentences below mean the same thing.",
          examples: [
            ["Mārcus Iūliam amat.", "Marcus · Julia (object) · loves", "Marcus loves Julia."],
            ["Iūliam Mārcus amat.", "Julia (object) · Marcus · loves", "Marcus loves Julia. (It's Julia he loves.)"],
          ],
        },
      ],
      drills: [
        { q: "Who does the seeing in «Dominum servus videt»?", en: "", options: ["the slave", "the master", "both", "you can't tell"], answer: "the slave", why: "servus is nominative (subject); dominum, ending -um, is the object." },
        { q: "Agricola ＿ amat.", en: "The farmer loves the girl.", options: ["puellam", "puella", "puellae", "puellā"], answer: "puellam", why: "The object takes the accusative -am." },
        { q: "＿ agricolam laudat.", en: "The master praises the farmer.", options: ["Dominus", "Dominum", "Dominī", "Dominō"], answer: "Dominus", why: "The subject takes the nominative -us." },
        { q: "What does «Rēgīnam nauta videt» mean?", en: "rēgīna = queen, nauta = sailor", options: ["The sailor sees the queen.", "The queen sees the sailor.", "The queen and the sailor see.", "The sailor's queen sees."], answer: "The sailor sees the queen.", why: "rēgīnam ends -am: object. nauta is the subject, even though it ends in -a (it is a masculine noun of the puella type)." },
        { q: "Mārcus ＿ portat.", en: "Marcus carries the sword.", options: ["gladium", "gladius", "gladiō", "gladiī"], answer: "gladium", why: "gladius is a -us noun; its object form is -um." },
      ],
    },
    {
      id: "plural",
      title: "Plurals",
      particle: "-ae / -ī",
      summary: "More than one, as subject and as object.",
      sections: [
        {
          p: "Nouns like puella make the plural subject in <b>-ae</b> and object in <b>-ās</b>. Nouns like servus make <b>-ī</b> and <b>-ōs</b>. Neuter nouns like bellum have <b>-a</b> for both.",
          examples: [
            ["{Puellae} cantant.", "girls · sing", "The girls sing."],
            ["Dominus {servōs} vocat.", "master · slaves (object) · calls", "The master calls the slaves."],
            ["{Bella} sunt longa.", "wars · are · long", "Wars are long."],
          ],
        },
        {
          h: "The verb agrees",
          p: "A plural subject takes a plural verb: puella cantat, puellae cantant.",
          examples: [["{Amīcī} veniunt.", "friends · come", "The friends are coming."]],
        },
      ],
      drills: [
        { q: "＿ in viā ambulant.", en: "The girls walk in the street.", options: ["Puellae", "Puella", "Puellam", "Puellās"], answer: "Puellae", why: "Plural subject of a puella noun: -ae." },
        { q: "Agricola ＿ videt.", en: "The farmer sees the horses. (equus = horse)", options: ["equōs", "equī", "equum", "equus"], answer: "equōs", why: "Plural object of a -us noun: -ōs." },
        { q: "Servī ＿.", en: "The slaves work.", options: ["labōrant", "labōrat", "labōrō", "labōrās"], answer: "labōrant", why: "A plural subject takes -nt." },
        { q: "What does «Rōmānī fēminās laudant» mean?", en: "", options: ["The Romans praise the women.", "The women praise the Romans.", "The Roman praises the woman.", "The Roman women praise."], answer: "The Romans praise the women.", why: "Rōmānī is subject (-ī), fēminās object (-ās)." },
        { q: "The plural of templum (temple) is…", en: "", options: ["templa", "templī", "templae", "templōs"], answer: "templa", why: "Neuter nouns make their plural in -a." },
      ],
    },
    {
      id: "agreement",
      title: "Adjectives agree",
      particle: "bonus, bona, bonum",
      summary: "An adjective matches its noun in gender, number and case.",
      sections: [
        {
          p: "Adjectives like bonus have three sets of endings: <b>bonus</b> (masculine), <b>bona</b> (feminine), <b>bonum</b> (neuter). They copy the noun's gender, number and case, and usually follow the noun.",
          examples: [
            ["servus {bonus}", "slave · good", "a good slave"],
            ["puella {bona}", "girl · good", "a good girl"],
            ["vīnum {bonum}", "wine · good", "good wine"],
          ],
        },
        {
          h: "Matching the case",
          p: "When the noun is an object, so is the adjective: puellam bon<b>am</b>, servōs bon<b>ōs</b>. A few masculine nouns end in -a (agricola, nauta): their adjective is still masculine, agricola bon<b>us</b>.",
          examples: [
            ["Fēminam {laetam} videō.", "woman · happy · I see", "I see a happy woman."],
            ["Agricola {fessus} est.", "farmer · tired · is", "The farmer is tired."],
          ],
        },
      ],
      drills: [
        { q: "dominus ＿", en: "a good master", options: ["bonus", "bona", "bonum", "bonam"], answer: "bonus", why: "dominus is masculine nominative: bonus." },
        { q: "Rēgīna ＿ est.", en: "The queen is beautiful.", options: ["pulchra", "pulcher", "pulchrum", "pulchrās"], answer: "pulchra", why: "rēgīna is feminine: pulchra." },
        { q: "templum ＿", en: "a big temple", options: ["magnum", "magnus", "magna", "magnam"], answer: "magnum", why: "templum is neuter: magnum." },
        { q: "Servōs ＿ laudō.", en: "I praise the good slaves.", options: ["bonōs", "bonī", "bonās", "bonum"], answer: "bonōs", why: "Masculine plural object: -ōs, like servōs." },
        { q: "nauta ＿", en: "a strong sailor (validus = strong)", options: ["validus", "valida", "validum", "validam"], answer: "validus", why: "nauta looks feminine but is masculine, so the adjective is validus." },
      ],
    },
    {
      id: "prepositions",
      title: "Prepositions: towards and from",
      particle: "ad / in / ex",
      summary: "Some take the accusative, some the ablative.",
      sections: [
        {
          p: "Movement <b>towards</b> uses the accusative: <b>ad</b> (to), <b>in</b> (into), <b>per</b> (through). Position or movement <b>away</b> uses the ablative, which for puella nouns ends in <b>-ā</b> and for servus nouns in <b>-ō</b>: <b>in</b> (in, on), <b>ex</b> (out of), <b>ā/ab</b> (away from), <b>cum</b> (with).",
          examples: [
            ["Ad {vīllam} ambulō.", "to · villa (acc.) · I walk", "I walk to the villa."],
            ["In {vīllā} habitō.", "in · villa (abl.) · I live", "I live in the villa."],
            ["Ex {agrō} veniunt.", "out of · field (abl.) · they come", "They come out of the field."],
          ],
        },
        {
          h: "One preposition, two meanings",
          p: "<b>in</b> with the accusative means “into”, with the ablative “in”. The ending tells you which.",
          examples: [
            ["In {silvam} currit.", "into · forest (acc.) · runs", "He runs into the forest."],
            ["Cum {amīcō} cēnō.", "with · friend (abl.) · I dine", "I'm having dinner with a friend."],
          ],
        },
      ],
      drills: [
        { q: "Ad ＿ ambulāmus.", en: "We walk to the forum.", options: ["forum", "forō", "forī", "fora"], answer: "forum", why: "ad (towards) takes the accusative: forum." },
        { q: "Cum ＿ veniō.", en: "I come with my friend.", options: ["amīcō", "amīcum", "amīcus", "amīcī"], answer: "amīcō", why: "cum takes the ablative: -ō." },
        { q: "What does «in aquā» mean?", en: "", options: ["in the water", "into the water", "out of the water", "to the water"], answer: "in the water", why: "in + ablative (-ā) = position: in." },
        { q: "What does «in aquam» mean?", en: "", options: ["into the water", "in the water", "out of the water", "with water"], answer: "into the water", why: "in + accusative (-am) = movement: into." },
        { q: "Ex ＿ currunt.", en: "They run out of the forest.", options: ["silvā", "silvam", "silva", "silvae"], answer: "silvā", why: "ex (out of) takes the ablative: -ā." },
        { q: "Per ＿ ambulant.", en: "They walk through the streets.", options: ["viās", "viīs", "via", "viae"], answer: "viās", why: "per takes the accusative; plural of via: viās." },
      ],
    },
  ],
};
