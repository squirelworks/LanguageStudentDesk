// SquirrelGo Phrasebook — phrase packs.
// Original content written for LanguageStudentDesk. Each phrase is
// [English, Japanese, kana reading (space-separated words), optional note].
// Romaji is generated from the kana reading at runtime (js/romaji.js).
window.PHRASEBOOK_PACKS = [
  {
    id: "basic",
    code: "bc",
    title: "Basic",
    jaTitle: "基本",
    desc: "Greetings, getting by, numbers, directions and emergencies.",
    categories: [
      {
        title: "Greetings & courtesy",
        phrases: [
          ["Hello. / Good afternoon.", "こんにちは。", "こんにちは。"],
          ["Good morning.", "おはようございます。", "おはよう ございます。", "Casual form among friends: おはよう."],
          ["Good evening.", "こんばんは。", "こんばんは。"],
          ["Goodbye.", "さようなら。", "さようなら。", "Sounds final; with colleagues say しつれいします (shitsurei shimasu) instead."],
          ["Thank you very much.", "どうもありがとうございます。", "どうも ありがとう ございます。"],
          ["You're welcome.", "どういたしまして。", "どう いたしまして。"],
          ["Excuse me.", "すみません。", "すみません。", "Also used to get attention and as a light apology."],
          ["I'm sorry.", "ごめんなさい。", "ごめんなさい。"],
          ["Please, go ahead.", "どうぞ。", "どうぞ。", "Used when offering something or letting someone go first."],
          ["Yes.", "はい。", "はい。"],
          ["No.", "いいえ。", "いいえ。"],
          ["Nice to meet you.", "はじめまして。", "はじめまして。"],
          ["I look forward to working with you.", "よろしくお願いします。", "よろしく おねがい します。", "Said after introducing yourself; there is no exact English equivalent."]
        ]
      },
      {
        title: "Introductions",
        phrases: [
          ["My name is Smith.", "私はスミスです。", "わたし は スミス です。"],
          ["What is your name?", "お名前は何ですか。", "おなまえ は なん です か。"],
          ["I am American.", "私はアメリカ人です。", "わたし は アメリカじん です。"],
          ["Where are you from?", "どちらから来ましたか。", "どちら から きました か。"],
          ["I am a student.", "私は学生です。", "わたし は がくせい です。"],
          ["I am here for work.", "仕事で来ました。", "しごと で きました。"]
        ]
      },
      {
        title: "Understanding each other",
        phrases: [
          ["Do you speak English?", "英語を話せますか。", "えいご を はなせます か。"],
          ["I speak a little Japanese.", "日本語が少し話せます。", "にほんご が すこし はなせます。"],
          ["I don't understand.", "分かりません。", "わかりません。"],
          ["I understand.", "分かりました。", "わかりました。"],
          ["Please say that again.", "もう一度言ってください。", "もう いちど いって ください。"],
          ["Please speak slowly.", "ゆっくり話してください。", "ゆっくり はなして ください。"],
          ["What does this mean?", "これはどういう意味ですか。", "これ は どういう いみ です か。"],
          ["Please write it down.", "書いてください。", "かいて ください。"],
          ["How do you say this in Japanese?", "これは日本語で何と言いますか。", "これ は にほんご で なん と いいます か。"]
        ]
      },
      {
        title: "Numbers & time",
        phrases: [
          ["One, two, three, four, five", "一、二、三、四、五", "いち、 に、 さん、 よん、 ご", "Four is also read し (shi), but よん is safer when speaking."],
          ["Six, seven, eight, nine, ten", "六、七、八、九、十", "ろく、 なな、 はち、 きゅう、 じゅう"],
          ["What time is it now?", "今何時ですか。", "いま なんじ です か。"],
          ["It is three o'clock.", "三時です。", "さんじ です。"],
          ["Today", "今日", "きょう"],
          ["Tomorrow", "明日", "あした"],
          ["Yesterday", "昨日", "きのう"],
          ["What day of the week is it today?", "今日は何曜日ですか。", "きょう は なんようび です か。"],
          ["Please wait a moment.", "ちょっと待ってください。", "ちょっと まって ください。"]
        ]
      },
      {
        title: "Directions",
        phrases: [
          ["Where is the toilet?", "トイレはどこですか。", "トイレ は どこ です か。"],
          ["Where is the station?", "駅はどこですか。", "えき は どこ です か。"],
          ["Right", "右", "みぎ"],
          ["Left", "左", "ひだり"],
          ["Straight ahead", "まっすぐ", "まっすぐ"],
          ["Is it far?", "遠いですか。", "とおい です か。"],
          ["It's close.", "近いです。", "ちかい です。"],
          ["Please show me on the map.", "地図で見せてください。", "ちず で みせて ください。"],
          ["I'm lost.", "道に迷いました。", "みち に まよいました。"]
        ]
      },
      {
        title: "Food & shopping",
        phrases: [
          ["How much is this?", "これはいくらですか。", "これ は いくら です か。"],
          ["I'll take this, please.", "これをください。", "これ を ください。"],
          ["Water, please.", "水をください。", "みず を ください。"],
          ["The check, please.", "お会計をお願いします。", "おかいけい を おねがい します。"],
          ["I can't eat meat.", "肉が食べられません。", "にく が たべられません。"],
          ["I have a food allergy.", "食物アレルギーがあります。", "しょくもつ アレルギー が あります。"],
          ["It's delicious.", "おいしいです。", "おいしい です。"],
          ["Can I pay by card?", "カードで払えますか。", "カード で はらえます か。"]
        ]
      },
      {
        title: "Emergencies",
        phrases: [
          ["Help!", "助けて！", "たすけて！"],
          ["Please call the police.", "警察を呼んでください。", "けいさつ を よんで ください。", "Police: 110. Fire and ambulance: 119."],
          ["Please call an ambulance.", "救急車を呼んでください。", "きゅうきゅうしゃ を よんで ください。"],
          ["Fire!", "火事だ！", "かじ だ！"],
          ["I'm hurt.", "けがをしました。", "けが を しました。"],
          ["Is there a hospital nearby?", "近くに病院はありますか。", "ちかく に びょういん は あります か。"],
          ["I lost my passport.", "パスポートをなくしました。", "パスポート を なくしました。"]
        ]
      },
      {
        title: "Weather",
        phrases: [
          ["It's hot today, isn't it?", "今日は暑いですね。", "きょう は あつい です ね。"],
          ["It's cold.", "寒いです。", "さむい です。"],
          ["It's raining.", "雨が降っています。", "あめ が ふって います。"],
          ["A typhoon is coming.", "台風が来ています。", "たいふう が きて います。"]
        ]
      }
    ]
  },
  {
    id: "aircrew",
    code: "ac",
    title: "Air Crew",
    jaTitle: "航空",
    desc: "Cabin instructions, emergency commands, ground operations and cargo.",
    categories: [
      {
        title: "Boarding & cabin",
        phrases: [
          ["Welcome aboard.", "ご搭乗ありがとうございます。", "ごとうじょう ありがとう ございます。", "Literally: thank you for boarding."],
          ["May I see your boarding pass?", "搭乗券を拝見します。", "とうじょうけん を はいけん します。"],
          ["Your seat is over there.", "お席はあちらです。", "おせき は あちら です。"],
          ["Please fasten your seat belt.", "シートベルトをお締めください。", "シートベルト を おしめ ください。"],
          ["Please put your bag under the seat in front of you.", "荷物は前の座席の下に入れてください。", "にもつ は まえ の ざせき の した に いれて ください。"],
          ["Please return your seat to the upright position.", "座席の背を元の位置に戻してください。", "ざせき の せ を もと の いち に もどして ください。"],
          ["Please turn off your phone or switch it to airplane mode.", "携帯電話の電源を切るか、機内モードにしてください。", "けいたい でんわ の でんげん を きる か、 きない モード に して ください。"],
          ["Please stay in your seat.", "座ったままでお待ちください。", "すわった まま で おまち ください。"],
          ["We will be taking off shortly.", "まもなく離陸します。", "まもなく りりく します。"],
          ["We will be landing shortly.", "まもなく着陸します。", "まもなく ちゃくりく します。"],
          ["Would you like something to drink?", "お飲み物はいかがですか。", "おのみもの は いかが です か。"]
        ]
      },
      {
        title: "Safety & emergency commands",
        phrases: [
          ["Put on your life vest.", "救命胴衣を着けてください。", "きゅうめい どうい を つけて ください。"],
          ["Do not inflate it inside the aircraft.", "機内ではふくらませないでください。", "きない で は ふくらませないで ください。"],
          ["Put on your oxygen mask.", "酸素マスクを着けてください。", "さんそ マスク を つけて ください。"],
          ["Heads down!", "頭を下げて！", "あたま を さげて！"],
          ["Release your seat belt!", "ベルトを外して！", "ベルト を はずして！"],
          ["Leave your baggage!", "荷物を持たないで！", "にもつ を もたないで！"],
          ["Come this way!", "こちらへ来て！", "こちら へ きて！"],
          ["Jump and slide!", "飛び降りて！", "とびおりて！"],
          ["The emergency exits are here.", "非常口はこちらです。", "ひじょうぐち は こちら です。"],
          ["Is anyone injured?", "けが人はいますか。", "けがにん は います か。"],
          ["Is there a doctor on board?", "お客様の中にお医者様はいらっしゃいますか。", "おきゃくさま の なか に おいしゃさま は いらっしゃいます か。"]
        ]
      },
      {
        title: "Ground operations",
        phrases: [
          ["Please move away from here.", "ここから離れてください。", "ここ から はなれて ください。"],
          ["Stay away from the propeller.", "プロペラに近づかないでください。", "プロペラ に ちかづかないで ください。"],
          ["Stay away from the engine intake.", "エンジンの空気取り入れ口に近づかないでください。", "エンジン の くうき とりいれぐち に ちかづかないで ください。"],
          ["Wear ear protection.", "耳栓を着けてください。", "みみせん を つけて ください。"],
          ["We need fuel.", "燃料が必要です。", "ねんりょう が ひつよう です。"],
          ["How much fuel do you need?", "燃料はどのくらい必要ですか。", "ねんりょう は どの くらい ひつよう です か。"],
          ["Where is the control tower?", "管制塔はどこですか。", "かんせいとう は どこ です か。"],
          ["Is the runway usable?", "滑走路は使えますか。", "かっそうろ は つかえます か。"],
          ["The aircraft needs maintenance.", "機体の整備が必要です。", "きたい の せいび が ひつよう です。"],
          ["Do not smoke near the aircraft.", "機体の近くでたばこを吸わないでください。", "きたい の ちかく で たばこ を すわないで ください。"]
        ]
      },
      {
        title: "Weather & routing",
        phrases: [
          ["What is the weather at the destination?", "目的地の天気はどうですか。", "もくてきち の てんき は どう です か。"],
          ["Visibility is poor.", "視界が悪いです。", "しかい が わるい です。"],
          ["The wind is strong.", "風が強いです。", "かぜ が つよい です。"],
          ["We expect turbulence.", "揺れが予想されます。", "ゆれ が よそう されます。"],
          ["We are diverting to another airport.", "別の空港に向かいます。", "べつ の くうこう に むかいます。"],
          ["The departure is delayed.", "出発が遅れています。", "しゅっぱつ が おくれて います。"]
        ]
      },
      {
        title: "Passengers & cargo",
        phrases: [
          ["How many passengers are there?", "乗客は何人ですか。", "じょうきゃく は なんにん です か。"],
          ["How heavy is this cargo?", "この貨物の重さはどのくらいですか。", "この かもつ の おもさ は どの くらい です か。"],
          ["Are there any hazardous materials?", "危険物はありますか。", "きけんぶつ は あります か。"],
          ["Please load this here.", "これをここに積んでください。", "これ を ここ に つんで ください。"],
          ["Please secure the cargo.", "貨物を固定してください。", "かもつ を こてい して ください。"],
          ["Please line up here.", "ここに並んでください。", "ここ に ならんで ください。"]
        ]
      }
    ]
  },
  {
    id: "civil",
    code: "ca",
    title: "Civil Affairs",
    jaTitle: "民生支援",
    desc: "Working with local officials, disaster relief, utilities and public services.",
    categories: [
      {
        title: "Meeting officials",
        phrases: [
          ["I would like to speak with the mayor.", "市長とお話ししたいです。", "しちょう と おはなし したい です。"],
          ["Who is in charge here?", "ここの責任者はどなたですか。", "ここ の せきにんしゃ は どなた です か。"],
          ["We are here to help.", "私たちは支援のために来ました。", "わたしたち は しえん の ため に きました。"],
          ["What does this area need most?", "この地域で一番必要なものは何ですか。", "この ちいき で いちばん ひつよう な もの は なん です か。"],
          ["Thank you for your cooperation.", "ご協力ありがとうございます。", "ごきょうりょく ありがとう ございます。"],
          ["Let's meet again tomorrow.", "また明日会いましょう。", "また あした あいましょう。"],
          ["Could you give me your contact details?", "連絡先を教えていただけますか。", "れんらくさき を おしえて いただけます か。"]
        ]
      },
      {
        title: "Disaster relief",
        phrases: [
          ["Was anyone injured in the earthquake?", "地震でけがをした人はいますか。", "じしん で けが を した ひと は います か。"],
          ["Is anyone missing?", "行方不明の人はいますか。", "ゆくえ ふめい の ひと は います か。"],
          ["Where is the evacuation center?", "避難所はどこですか。", "ひなんじょ は どこ です か。"],
          ["How many people are at the evacuation center?", "避難所には何人いますか。", "ひなんじょ に は なんにん います か。"],
          ["Please evacuate to higher ground.", "高い所へ避難してください。", "たかい ところ へ ひなん して ください。"],
          ["A tsunami warning has been issued.", "津波警報が出ています。", "つなみ けいほう が でて います。"],
          ["Is this building safe?", "この建物は安全ですか。", "この たてもの は あんぜん です か。"],
          ["Do not enter this building.", "この建物に入らないでください。", "この たてもの に はいらないで ください。"],
          ["We have brought food and water.", "食料と水を持ってきました。", "しょくりょう と みず を もって きました。"],
          ["Please line up for distribution.", "配給のために並んでください。", "はいきゅう の ため に ならんで ください。"],
          ["We need blankets.", "毛布が必要です。", "もうふ が ひつよう です。"]
        ]
      },
      {
        title: "Utilities & infrastructure",
        phrases: [
          ["Is there electricity?", "電気は使えますか。", "でんき は つかえます か。"],
          ["Is this water safe to drink?", "この水は飲めますか。", "この みず は のめます か。"],
          ["The water supply is cut off.", "断水しています。", "だんすい して います。"],
          ["Is the gas line damaged?", "ガス管は壊れていますか。", "ガスかん は こわれて います か。"],
          ["The road is impassable.", "道路が通れません。", "どうろ が とおれません。"],
          ["The bridge is damaged.", "橋が壊れています。", "はし が こわれて います。"],
          ["Where can we get fuel?", "燃料はどこで手に入りますか。", "ねんりょう は どこ で て に はいります か。"],
          ["How long will the repairs take?", "修理にはどのくらいかかりますか。", "しゅうり に は どの くらい かかります か。"]
        ]
      },
      {
        title: "Public services",
        phrases: [
          ["Is the school open?", "学校は開いていますか。", "がっこう は あいて います か。"],
          ["Where is the city hall?", "市役所はどこですか。", "しやくしょ は どこ です か。"],
          ["Is the hospital seeing patients?", "病院は診療していますか。", "びょういん は しんりょう して います か。"],
          ["How many households live here?", "ここには何世帯住んでいますか。", "ここ に は なんせたい すんで います か。"],
          ["Are there elderly people living alone?", "一人暮らしのお年寄りはいますか。", "ひとりぐらし の おとしより は います か。"],
          ["Do you need an interpreter?", "通訳が必要ですか。", "つうやく が ひつよう です か。"]
        ]
      },
      {
        title: "Agreements & follow-up",
        phrases: [
          ["We will come again next week.", "来週また来ます。", "らいしゅう また きます。"],
          ["Please sign here.", "ここに署名してください。", "ここ に しょめい して ください。"],
          ["We cannot promise that today.", "今日はお約束できません。", "きょう は おやくそく できません。"],
          ["I will report this to my supervisor.", "上司に報告します。", "じょうし に ほうこく します。"],
          ["Please let us know if there are any problems.", "何か問題があれば知らせてください。", "なにか もんだい が あれば しらせて ください。"]
        ]
      }
    ]
  },
  {
    id: "medical",
    code: "md",
    title: "Medical",
    jaTitle: "医療",
    desc: "Registration, symptoms, examination, medication, treatment and follow-up.",
    categories: [
      {
        title: "Registration",
        phrases: [
          ["Please tell me your name.", "お名前を教えてください。", "おなまえ を おしえて ください。"],
          ["What is your date of birth?", "生年月日はいつですか。", "せいねん がっぴ は いつ です か。"],
          ["How old are you?", "何歳ですか。", "なんさい です か。"],
          ["Do you have your health insurance card?", "保険証はありますか。", "ほけんしょう は あります か。"],
          ["Please fill out this form.", "この用紙に記入してください。", "この ようし に きにゅう して ください。"],
          ["Please wait here.", "こちらでお待ちください。", "こちら で おまち ください。"],
          ["I am a doctor.", "私は医者です。", "わたし は いしゃ です。"],
          ["I am a nurse.", "私は看護師です。", "わたし は かんごし です。"]
        ]
      },
      {
        title: "Symptoms & pain",
        phrases: [
          ["What seems to be the problem?", "どうしましたか。", "どう しました か。"],
          ["Where does it hurt?", "どこが痛いですか。", "どこ が いたい です か。"],
          ["Please point to where it hurts.", "痛い所を指してください。", "いたい ところ を さして ください。"],
          ["Since when?", "いつからですか。", "いつ から です か。"],
          ["On a scale of one to ten, how bad is the pain?", "痛みは一から十でどのくらいですか。", "いたみ は いち から じゅう で どの くらい です か。"],
          ["Is it a sharp pain or a dull pain?", "鋭い痛みですか、鈍い痛みですか。", "するどい いたみ です か、 にぶい いたみ です か。"],
          ["Do you have a fever?", "熱はありますか。", "ねつ は あります か。"],
          ["Do you feel dizzy?", "めまいがしますか。", "めまい が します か。"],
          ["Do you feel nauseous?", "吐き気がしますか。", "はきけ が します か。"],
          ["Is it hard to breathe?", "息が苦しいですか。", "いき が くるしい です か。"],
          ["Have you vomited?", "吐きましたか。", "はきました か。"],
          ["I have a headache.", "頭が痛いです。", "あたま が いたい です。"],
          ["I have a stomachache.", "お腹が痛いです。", "おなか が いたい です。"]
        ]
      },
      {
        title: "Examination",
        phrases: [
          ["Please lie down.", "横になってください。", "よこ に なって ください。"],
          ["Please sit up.", "起き上がってください。", "おきあがって ください。"],
          ["Take a deep breath.", "深く息を吸ってください。", "ふかく いき を すって ください。"],
          ["Breathe out.", "息を吐いてください。", "いき を はいて ください。"],
          ["Open your mouth.", "口を開けてください。", "くち を あけて ください。"],
          ["Squeeze my hand.", "私の手を握ってください。", "わたし の て を にぎって ください。"],
          ["Follow my finger with your eyes.", "目で私の指を追ってください。", "め で わたし の ゆび を おって ください。"],
          ["Does this hurt?", "ここは痛いですか。", "ここ は いたい です か。"],
          ["Please roll up your sleeve.", "袖をまくってください。", "そで を まくって ください。"],
          ["I'm going to take your blood pressure.", "血圧を測ります。", "けつあつ を はかります。"],
          ["We will do a urine test.", "尿検査をします。", "にょう けんさ を します。"]
        ]
      },
      {
        title: "Medication & allergies",
        phrases: [
          ["Are you taking any medication now?", "今、飲んでいる薬はありますか。", "いま、 のんで いる くすり は あります か。"],
          ["Are you allergic to any medicine?", "薬のアレルギーはありますか。", "くすり の アレルギー は あります か。"],
          ["Take this medicine three times a day after meals.", "この薬を一日三回、食後に飲んでください。", "この くすり を いちにち さんかい、 しょくご に のんで ください。"],
          ["Take one tablet.", "一錠飲んでください。", "いちじょう のんで ください。"],
          ["This may make you drowsy.", "眠くなることがあります。", "ねむく なる こと が あります。"],
          ["Do not drink alcohol.", "お酒は飲まないでください。", "おさけ は のまないで ください。"]
        ]
      },
      {
        title: "Treatment & procedures",
        phrases: [
          ["You need surgery.", "手術が必要です。", "しゅじゅつ が ひつよう です。"],
          ["Please sign this consent form.", "この同意書に署名してください。", "この どういしょ に しょめい して ください。"],
          ["Do not eat or drink after midnight.", "夜十二時以降は飲食しないでください。", "よる じゅうにじ いこう は いんしょく しないで ください。"],
          ["I'm going to give you an injection.", "注射をします。", "ちゅうしゃ を します。"],
          ["You'll feel a small prick.", "少しちくっとします。", "すこし ちくっと します。"],
          ["We will take an X-ray.", "レントゲンを撮ります。", "レントゲン を とります。"],
          ["The bone is broken.", "骨が折れています。", "ほね が おれて います。"],
          ["Please don't move.", "動かないでください。", "うごかないで ください。"]
        ]
      },
      {
        title: "Body parts",
        phrases: [
          ["Head", "頭", "あたま"],
          ["Eye", "目", "め"],
          ["Ear", "耳", "みみ"],
          ["Throat", "のど", "のど"],
          ["Chest", "胸", "むね"],
          ["Heart", "心臓", "しんぞう"],
          ["Stomach / belly", "お腹", "おなか"],
          ["Back", "背中", "せなか"],
          ["Arm", "腕", "うで"],
          ["Leg / foot", "足", "あし"]
        ]
      },
      {
        title: "Children & pregnancy",
        phrases: [
          ["How old is your child?", "お子さんは何歳ですか。", "おこさん は なんさい です か。"],
          ["Is your child eating well?", "お子さんはよく食べていますか。", "おこさん は よく たべて います か。"],
          ["Has your child had their vaccinations?", "予防接種は受けていますか。", "よぼう せっしゅ は うけて います か。"],
          ["Are you pregnant?", "妊娠していますか。", "にんしん して います か。"],
          ["How many weeks pregnant are you?", "妊娠何週目ですか。", "にんしん なんしゅうめ です か。"],
          ["When was your last period?", "最後の生理はいつでしたか。", "さいご の せいり は いつ でした か。"]
        ]
      },
      {
        title: "Discharge & follow-up",
        phrases: [
          ["You can go home today.", "今日は帰っても大丈夫です。", "きょう は かえって も だいじょうぶ です。"],
          ["Please come back in one week.", "一週間後にまた来てください。", "いっしゅうかん ご に また きて ください。"],
          ["Please rest for a few days.", "数日間休んでください。", "すうじつかん やすんで ください。"],
          ["If it gets worse, come back right away.", "悪くなったらすぐに来てください。", "わるく なったら すぐ に きて ください。"],
          ["Keep the wound clean and dry.", "傷口を清潔に保ち、濡らさないでください。", "きずぐち を せいけつ に たもち、 ぬらさないで ください。"]
        ]
      }
    ]
  },
  {
    id: "naval",
    code: "nv",
    title: "Naval",
    jaTitle: "海事",
    desc: "Port entry and mooring, ship visits, deck commands, supplies and rescue at sea.",
    categories: [
      {
        title: "Port entry & mooring",
        phrases: [
          ["We request permission to enter port.", "入港の許可をお願いします。", "にゅうこう の きょか を おねがい します。"],
          ["Which pier should we use?", "どの岸壁を使えばいいですか。", "どの がんぺき を つかえば いい です か。"],
          ["Please take the mooring line.", "係留索を受け取ってください。", "けいりゅうさく を うけとって ください。"],
          ["Is a tugboat available?", "タグボートは使えますか。", "タグボート は つかえます か。"],
          ["Will a pilot come aboard?", "水先人は乗船しますか。", "みずさきにん は じょうせん します か。"],
          ["What is the depth here?", "ここの水深はどのくらいですか。", "ここ の すいしん は どの くらい です か。"],
          ["We will leave port at eight tomorrow morning.", "明日の朝八時に出港します。", "あした の あさ はちじ に しゅっこう します。"]
        ]
      },
      {
        title: "Ship visits",
        phrases: [
          ["Welcome aboard.", "ようこそ、本艦へ。", "ようこそ、 ほんかん へ。", "本艦 (honkan) means \"this ship\" for a naval vessel."],
          ["Please show your ID.", "身分証明書を見せてください。", "みぶん しょうめいしょ を みせて ください。"],
          ["Please follow me.", "ついて来てください。", "ついて きて ください。"],
          ["Watch your step.", "足元に気をつけてください。", "あしもと に き を つけて ください。"],
          ["Mind your head.", "頭上に注意してください。", "ずじょう に ちゅうい して ください。"],
          ["Photography is not allowed here.", "ここは撮影禁止です。", "ここ は さつえい きんし です。"],
          ["Hold the handrail on the ladder.", "はしごでは手すりを持ってください。", "はしご で は てすり を もって ください。"],
          ["This area is off-limits.", "ここは立ち入り禁止です。", "ここ は たちいり きんし です。"]
        ]
      },
      {
        title: "Deck commands",
        phrases: [
          ["Stop!", "止まれ！", "とまれ！"],
          ["Hurry!", "急いで！", "いそいで！"],
          ["Slowly!", "ゆっくり！", "ゆっくり！"],
          ["Pull!", "引け！", "ひけ！"],
          ["Let go!", "放せ！", "はなせ！"],
          ["Stand clear of the line!", "索から離れろ！", "さく から はなれろ！"],
          ["Wear a life jacket on deck.", "甲板ではライフジャケットを着用してください。", "かんぱん で は ライフジャケット を ちゃくよう して ください。"]
        ]
      },
      {
        title: "Supplies & services",
        phrases: [
          ["We need fresh water.", "真水が必要です。", "まみず が ひつよう です。"],
          ["We would like to refuel.", "燃料を補給したいです。", "ねんりょう を ほきゅう したい です。"],
          ["We would like to take on fresh food.", "生鮮食品を補給したいです。", "せいせん しょくひん を ほきゅう したい です。"],
          ["Where should we put our garbage?", "ごみはどこに出せばいいですか。", "ごみ は どこ に だせば いい です か。"],
          ["We need shore power.", "陸上電源が必要です。", "りくじょう でんげん が ひつよう です。"],
          ["How long will it take?", "どのくらい時間がかかりますか。", "どの くらい じかん が かかります か。"],
          ["Is there a doctor at the port?", "港に医者はいますか。", "みなと に いしゃ は います か。"]
        ]
      },
      {
        title: "Shipboard emergencies",
        phrases: [
          ["There's a fire on board!", "船内で火事です！", "せんない で かじ です！"],
          ["Someone fell into the sea!", "人が海に落ちた！", "ひと が うみ に おちた！"],
          ["Abandon ship!", "総員退船！", "そういん たいせん！"],
          ["Go to your muster station.", "集合場所に行ってください。", "しゅうごう ばしょ に いって ください。"],
          ["The ship is taking on water.", "船が浸水しています。", "ふね が しんすい して います。"],
          ["Is everyone here?", "全員そろっていますか。", "ぜんいん そろって います か。"]
        ]
      },
      {
        title: "Rescue at sea",
        phrases: [
          ["Can you hear me?", "聞こえますか。", "きこえます か。"],
          ["How many people were on board?", "何人乗っていましたか。", "なんにん のって いました か。"],
          ["Grab the rope!", "ロープをつかんで！", "ロープ を つかんで！"],
          ["Hang on, we're coming!", "がんばって、今行きます！", "がんばって、 いま いきます！"],
          ["Are you injured?", "けがはありますか。", "けが は あります か。"],
          ["Put this on.", "これを着てください。", "これ を きて ください。"],
          ["You're safe now.", "もう大丈夫です。", "もう だいじょうぶ です。"]
        ]
      }
    ]
  },
  {
    id: "publicaffairs",
    code: "pa",
    title: "Public Affairs",
    jaTitle: "広報",
    desc: "Media calls, escorting reporters, interviews, press conferences and crisis statements.",
    categories: [
      {
        title: "General statements",
        phrases: [
          ["I am the public affairs officer.", "私は広報担当です。", "わたし は こうほう たんとう です。"],
          ["I'll check and get back to you.", "確認して折り返しご連絡します。", "かくにん して おりかえし ごれんらく します。"],
          ["I can't comment on that.", "その件についてはコメントできません。", "その けん に ついて は コメント できません。"],
          ["We can't release that information yet.", "その情報はまだ発表できません。", "その じょうほう は まだ はっぴょう できません。"],
          ["I don't know, but I'll find out.", "分かりませんが、調べてみます。", "わかりません が、 しらべて みます。"],
          ["We will issue a press release.", "プレスリリースを出します。", "プレスリリース を だします。"]
        ]
      },
      {
        title: "Phone queries",
        phrases: [
          ["Hello, public affairs office.", "はい、広報室です。", "はい、 こうほうしつ です。"],
          ["Which media organization are you with?", "どちらの報道機関の方ですか。", "どちら の ほうどう きかん の かた です か。"],
          ["May I have your name and phone number?", "お名前と電話番号をお願いします。", "おなまえ と でんわ ばんごう を おねがい します。"],
          ["What is your deadline?", "締め切りはいつですか。", "しめきり は いつ です か。"],
          ["I will call you back.", "折り返しお電話します。", "おりかえし おでんわ します。"],
          ["Please send your questions by email.", "ご質問はメールでお送りください。", "ごしつもん は メール で おおくり ください。"]
        ]
      },
      {
        title: "Escorting media",
        phrases: [
          ["I will be your guide today.", "本日ご案内を担当します。", "ほんじつ ごあんない を たんとう します。"],
          ["Please stay with the group.", "グループから離れないでください。", "グループ から はなれないで ください。"],
          ["Please wear this badge at all times.", "このバッジを常に着けてください。", "この バッジ を つねに つけて ください。"],
          ["You may take photos here.", "ここは撮影できます。", "ここ は さつえい できます。"],
          ["Please do not take photos here.", "ここは撮影しないでください。", "ここ は さつえい しないで ください。"],
          ["We have ten minutes left.", "残り十分です。", "のこり じゅっぷん です。"],
          ["The bus leaves at two o'clock.", "バスは二時に出発します。", "バス は にじ に しゅっぱつ します。"]
        ]
      },
      {
        title: "Interviews",
        phrases: [
          ["How many minutes do you need for the interview?", "取材には何分必要ですか。", "しゅざい に は なんぷん ひつよう です か。"],
          ["The interview will be thirty minutes.", "インタビューは三十分です。", "インタビュー は さんじゅっぷん です。"],
          ["Is this off the record?", "これはオフレコですか。", "これ は オフレコ です か。"],
          ["Please tell me your questions in advance.", "事前に質問の内容を教えてください。", "じぜん に しつもん の ないよう を おしえて ください。"],
          ["Please state your name and title.", "お名前と役職をお願いします。", "おなまえ と やくしょく を おねがい します。"],
          ["Let's move on to the next question.", "次の質問に移ります。", "つぎ の しつもん に うつります。"]
        ]
      },
      {
        title: "Press conference",
        phrases: [
          ["We will now begin the press conference.", "ただいまから記者会見を始めます。", "ただいま から きしゃ かいけん を はじめます。"],
          ["If you have a question, please raise your hand.", "質問のある方は手を挙げてください。", "しつもん の ある かた は て を あげて ください。"],
          ["Please state your outlet and your name.", "社名とお名前をお願いします。", "しゃめい と おなまえ を おねがい します。"],
          ["One question per person, please.", "質問はお一人一問でお願いします。", "しつもん は おひとり いちもん で おねがい します。"],
          ["We have time for one more question.", "あと一問だけお受けします。", "あと いちもん だけ おうけ します。"],
          ["This concludes the press conference.", "これで記者会見を終わります。", "これ で きしゃ かいけん を おわります。"]
        ]
      },
      {
        title: "Crisis communication",
        phrases: [
          ["We are aware of the incident.", "この事案については把握しています。", "この じあん に ついて は はあく して います。"],
          ["Our top priority is the safety of human life.", "人命の安全を最優先しています。", "じんめい の あんぜん を さいゆうせん して います。"],
          ["The cause is under investigation.", "原因は現在調査中です。", "げんいん は げんざい ちょうさちゅう です。"],
          ["We will share details as soon as we know more.", "詳しい情報は分かり次第お知らせします。", "くわしい じょうほう は わかりしだい おしらせ します。"],
          ["Our deepest sympathies go to those affected.", "被害に遭われた方々に心からお見舞い申し上げます。", "ひがい に あわれた かたがた に こころ から おみまい もうしあげます。"],
          ["We are cooperating fully with local authorities.", "地元当局と全面的に協力しています。", "じもと とうきょく と ぜんめんてき に きょうりょく して います。"],
          ["The next update is scheduled for 3 p.m.", "次の発表は午後三時の予定です。", "つぎ の はっぴょう は ごご さんじ の よてい です。"]
        ]
      }
    ]
  },
  {
    id: "forceprotection",
    code: "fp",
    title: "Force Protection",
    jaTitle: "警備",
    desc: "Gate and checkpoint control, vehicle and bag inspection, security alerts.",
    categories: [
      {
        title: "Gate & checkpoint",
        phrases: [
          ["Please stop here.", "ここで止まってください。", "ここ で とまって ください。"],
          ["Please show your ID.", "身分証明書を見せてください。", "みぶん しょうめいしょ を みせて ください。"],
          ["What is the purpose of your visit?", "訪問の目的は何ですか。", "ほうもん の もくてき は なん です か。"],
          ["Who are you here to see?", "どなたに会いに来ましたか。", "どなた に あい に きました か。"],
          ["Please wait here until your escort arrives.", "案内の者が来るまでここで待ってください。", "あんない の もの が くる まで ここ で まって ください。"],
          ["Please write your name here.", "ここに記名してください。", "ここ に きめい して ください。"],
          ["This is a restricted area.", "ここは制限区域です。", "ここ は せいげん くいき です。"],
          ["You may enter.", "入ってもいいです。", "はいって も いい です。"],
          ["You cannot enter.", "入れません。", "はいれません。"]
        ]
      },
      {
        title: "Vehicle inspection",
        phrases: [
          ["Please turn off the engine.", "エンジンを止めてください。", "エンジン を とめて ください。"],
          ["Please open the trunk.", "トランクを開けてください。", "トランク を あけて ください。"],
          ["Please open the hood.", "ボンネットを開けてください。", "ボンネット を あけて ください。"],
          ["Please step out of the vehicle.", "車から降りてください。", "くるま から おりて ください。"],
          ["Is this your vehicle?", "これはあなたの車ですか。", "これ は あなた の くるま です か。"],
          ["Please show your vehicle inspection certificate.", "車検証を見せてください。", "しゃけんしょう を みせて ください。", "Japanese cars carry a 車検証 (shakenshou), the registration and inspection certificate."],
          ["We are going to inspect the vehicle.", "車両を検査します。", "しゃりょう を けんさ します。"],
          ["Thank you. You may go.", "ありがとうございます。行っていいです。", "ありがとう ございます。 いって いい です。"]
        ]
      },
      {
        title: "Bag & personal screening",
        phrases: [
          ["Please put your bag here.", "かばんをここに置いてください。", "かばん を ここ に おいて ください。"],
          ["Please open your bag.", "かばんを開けてください。", "かばん を あけて ください。"],
          ["Do you have anything sharp?", "何か鋭い物を持っていますか。", "なにか するどい もの を もって います か。"],
          ["Please empty your pockets.", "ポケットの中の物を出してください。", "ポケット の なか の もの を だして ください。"],
          ["Please raise your arms.", "両腕を上げてください。", "りょううで を あげて ください。"],
          ["Please walk through here.", "ここを通ってください。", "ここ を とおって ください。"]
        ]
      },
      {
        title: "Security alerts",
        phrases: [
          ["Suspicious object! Keep away!", "不審物です。近づかないでください！", "ふしんぶつ です。 ちかづかないで ください！"],
          ["Please evacuate the building.", "建物から避難してください。", "たてもの から ひなん して ください。"],
          ["Move back!", "下がってください！", "さがって ください！"],
          ["Did you see anyone suspicious?", "不審な人を見ましたか。", "ふしん な ひと を みました か。"],
          ["Please tell us if you notice anything unusual.", "何か変わったことがあれば知らせてください。", "なにか かわった こと が あれば しらせて ください。"],
          ["The gate is closed.", "ゲートは閉鎖中です。", "ゲート は へいさちゅう です。"]
        ]
      }
    ]
  },
  {
    id: "militarypolice",
    code: "mp",
    title: "Military Police",
    jaTitle: "憲兵",
    desc: "Traffic stops, taking statements, detention and working with Japanese police.",
    categories: [
      {
        title: "Traffic",
        phrases: [
          ["Please pull over here.", "ここに車を止めてください。", "ここ に くるま を とめて ください。"],
          ["Please show your driver's license.", "運転免許証を見せてください。", "うんてん めんきょしょう を みせて ください。"],
          ["You were speeding.", "スピード違反です。", "スピード いはん です。"],
          ["Have you been drinking?", "お酒を飲みましたか。", "おさけ を のみました か。"],
          ["Please blow into this.", "これに息を吹きかけてください。", "これ に いき を ふきかけて ください。"],
          ["Was anyone hurt in the accident?", "事故でけがをした人はいますか。", "じこ で けが を した ひと は います か。"],
          ["Please move your car.", "車を移動してください。", "くるま を いどう して ください。"]
        ]
      },
      {
        title: "Statements & reports",
        phrases: [
          ["What happened?", "何がありましたか。", "なに が ありました か。"],
          ["When did it happen?", "いつ起きましたか。", "いつ おきました か。"],
          ["Where did it happen?", "どこで起きましたか。", "どこ で おきました か。"],
          ["Can you describe the person?", "その人の特徴を教えてください。", "その ひと の とくちょう を おしえて ください。"],
          ["Did anyone see it happen?", "誰か見ていましたか。", "だれか みて いました か。"],
          ["Please tell me your address.", "住所を教えてください。", "じゅうしょ を おしえて ください。"],
          ["I will write a report.", "報告書を作成します。", "ほうこくしょ を さくせい します。"]
        ]
      },
      {
        title: "Detention",
        phrases: [
          ["Stop! Don't move!", "止まれ！動くな！", "とまれ！ うごくな！"],
          ["Show me your hands.", "手を見えるところに出してください。", "て を みえる ところ に だして ください。"],
          ["Turn around.", "後ろを向いてください。", "うしろ を むいて ください。"],
          ["You are being detained.", "あなたを拘束します。", "あなた を こうそく します。"],
          ["Please come with me.", "一緒に来てください。", "いっしょ に きて ください。"],
          ["Do you need a doctor?", "医者が必要ですか。", "いしゃ が ひつよう です か。"],
          ["An interpreter is on the way.", "通訳が来ます。", "つうやく が きます。"],
          ["You may call someone.", "連絡したい人に電話できます。", "れんらく したい ひと に でんわ できます。"]
        ]
      },
      {
        title: "Working with Japanese police",
        phrases: [
          ["Please contact the Japanese police.", "日本の警察に連絡してください。", "にほん の けいさつ に れんらく して ください。"],
          ["We will cooperate with the police.", "警察に協力します。", "けいさつ に きょうりょく します。"],
          ["This person is affiliated with the U.S. military.", "この人は米軍の関係者です。", "この ひと は べいぐん の かんけいしゃ です。"],
          ["Which police station?", "どの警察署ですか。", "どの けいさつしょ です か。"]
        ]
      }
    ]
  },
  {
    id: "cordonsearch",
    code: "cs",
    title: "Cordon & Search",
    jaTitle: "捜索",
    desc: "Instructions to residents, entering and searching buildings, property and wrap-up.",
    categories: [
      {
        title: "Instructions to residents",
        phrases: [
          ["We are going to search this building.", "この建物を捜索します。", "この たてもの を そうさく します。"],
          ["Please stay calm.", "落ち着いてください。", "おちついて ください。"],
          ["Everyone, please come outside.", "皆さん、外に出てください。", "みなさん、 そと に でて ください。"],
          ["Please gather here.", "ここに集まってください。", "ここ に あつまって ください。"],
          ["Please do not leave this area.", "この区域から出ないでください。", "この くいき から でないで ください。"],
          ["Is anyone else inside?", "中にほかに誰かいますか。", "なか に ほか に だれか います か。"],
          ["It will be over soon.", "すぐに終わります。", "すぐ に おわります。"]
        ]
      },
      {
        title: "Entry & search",
        phrases: [
          ["Open the door, please!", "ドアを開けてください！", "ドア を あけて ください！"],
          ["Who lives here?", "ここには誰が住んでいますか。", "ここ に は だれ が すんで います か。"],
          ["Who owns this house?", "この家の持ち主は誰ですか。", "この いえ の もちぬし は だれ です か。"],
          ["Please open this room.", "この部屋を開けてください。", "この へや を あけて ください。"],
          ["Please be present during the search.", "捜索に立ち会ってください。", "そうさく に たちあって ください。"],
          ["Is there anything dangerous here?", "ここに危険な物はありますか。", "ここ に きけん な もの は あります か。"],
          ["Please don't touch that.", "それに触らないでください。", "それ に さわらないで ください。"]
        ]
      },
      {
        title: "Property & wrap-up",
        phrases: [
          ["We will return this to you.", "これはお返しします。", "これ は おかえし します。"],
          ["Please check that nothing is missing.", "なくなった物がないか確認してください。", "なくなった もの が ない か かくにん して ください。"],
          ["Was anything damaged?", "何か壊れた物はありますか。", "なにか こわれた もの は あります か。"],
          ["Here is a receipt.", "これは受領証です。", "これ は じゅりょうしょう です。"],
          ["The search is finished.", "捜索は終わりました。", "そうさく は おわりました。"],
          ["You may go back inside.", "中に戻ってもいいです。", "なか に もどって も いい です。"],
          ["Thank you for your cooperation.", "ご協力ありがとうございました。", "ごきょうりょく ありがとう ございました。"]
        ]
      }
    ]
  },
  {
    id: "weapons",
    code: "wp",
    title: "Weapons",
    jaTitle: "武器",
    desc: "Weapon safety, range commands, permits, storage and basic terms.",
    categories: [
      {
        title: "Safety",
        phrases: [
          ["Is it loaded?", "弾は入っていますか。", "たま は はいって います か。"],
          ["Please unload the weapon.", "弾を抜いてください。", "たま を ぬいて ください。"],
          ["Point it in a safe direction.", "安全な方向に向けてください。", "あんぜん な ほうこう に むけて ください。"],
          ["Keep your finger off the trigger.", "引き金から指を離してください。", "ひきがね から ゆび を はなして ください。"],
          ["Put it on safe.", "安全装置をかけてください。", "あんぜん そうち を かけて ください。"],
          ["Show me the chamber is empty.", "薬室が空なのを見せてください。", "やくしつ が から な の を みせて ください。"],
          ["Put the weapon down.", "武器を置いてください。", "ぶき を おいて ください。"],
          ["Drop it!", "捨てろ！", "すてろ！"]
        ]
      },
      {
        title: "Range commands",
        phrases: [
          ["Wear eye and ear protection.", "保護眼鏡と耳栓を着けてください。", "ほご めがね と みみせん を つけて ください。"],
          ["Is the firing line ready?", "射撃準備はいいですか。", "しゃげき じゅんび は いい です か。"],
          ["Commence firing.", "撃ち方始め。", "うちかた はじめ。", "Standard Japan Self-Defense Forces range command."],
          ["Cease fire!", "撃ち方やめ！", "うちかた やめ！"],
          ["Check your target.", "標的を確認してください。", "ひょうてき を かくにん して ください。"],
          ["Please leave the range.", "射場から出てください。", "しゃじょう から でて ください。"]
        ]
      },
      {
        title: "Permits & storage",
        phrases: [
          ["Is this weapon yours?", "この武器はあなたのですか。", "この ぶき は あなた の です か。"],
          ["Do you have a permit for it?", "所持許可はありますか。", "しょじ きょか は あります か。"],
          ["What is the serial number?", "製造番号は何番ですか。", "せいぞう ばんごう は なんばん です か。"],
          ["Where is the ammunition stored?", "弾薬はどこに保管していますか。", "だんやく は どこ に ほかん して います か。"],
          ["Weapons are not allowed here.", "ここに武器は持ち込めません。", "ここ に ぶき は もちこめません。"],
          ["Please check your weapon in here.", "武器はここで預けてください。", "ぶき は ここ で あずけて ください。"]
        ]
      },
      {
        title: "Terms",
        phrases: [
          ["Rifle", "小銃", "しょうじゅう"],
          ["Pistol", "拳銃", "けんじゅう"],
          ["Ammunition", "弾薬", "だんやく"],
          ["Magazine", "弾倉", "だんそう"],
          ["Knife", "ナイフ", "ナイフ"]
        ]
      }
    ]
  },
  {
    id: "travel",
    code: "tr",
    title: "Travel",
    jaTitle: "旅行",
    desc: "Airports, trains and buses, taxis, tickets and sightseeing.",
    categories: [
      {
        title: "At the airport",
        phrases: [
          ["Where is the check-in counter?", "チェックインカウンターはどこですか。", "チェックイン カウンター は どこ です か。"],
          ["Here is my passport.", "パスポートです。", "パスポート です。"],
          ["I'd like a window seat.", "窓側の席をお願いします。", "まどがわ の せき を おねがい します。"],
          ["I'd like an aisle seat.", "通路側の席をお願いします。", "つうろがわ の せき を おねがい します。"],
          ["I have one bag to check.", "預ける荷物は一つです。", "あずける にもつ は ひとつ です。"],
          ["Which gate does it leave from?", "何番ゲートから出発しますか。", "なんばん ゲート から しゅっぱつ します か。"],
          ["Is the flight delayed?", "便は遅れていますか。", "びん は おくれて います か。"],
          ["My bag hasn't come out.", "荷物が出てきません。", "にもつ が でて きません。", "Say this at the baggage service counter (手荷物サービス)."],
          ["I'm here for sightseeing.", "観光です。", "かんこう です。", "A common answer at immigration when asked your purpose of visit."],
          ["I'll stay for one week.", "一週間滞在します。", "いっしゅうかん たいざい します。"]
        ]
      },
      {
        title: "Trains & subways",
        phrases: [
          ["Where is the ticket machine?", "券売機はどこですか。", "けんばいき は どこ です か。"],
          ["One ticket to Kyoto, please.", "京都まで一枚お願いします。", "きょうと まで いちまい おねがい します。"],
          ["Which platform is it?", "何番線ですか。", "なんばんせん です か。"],
          ["Does this train stop at Shinjuku?", "この電車は新宿に止まりますか。", "この でんしゃ は しんじゅく に とまります か。"],
          ["Where do I change trains?", "どこで乗り換えますか。", "どこ で のりかえます か。"],
          ["Is this seat free?", "この席は空いていますか。", "この せき は あいて います か。"],
          ["What is the next station?", "次の駅は何ですか。", "つぎ の えき は なん です か。"],
          ["I'd like a reserved seat.", "指定席をお願いします。", "していせき を おねがい します。", "Unreserved seats are 自由席 (jiyuuseki)."],
          ["Can I use an IC card?", "ICカードは使えますか。", "アイシー カード は つかえます か。", "Rechargeable transit cards such as Suica and ICOCA."],
          ["When is the last train?", "終電は何時ですか。", "しゅうでん は なんじ です か。"]
        ]
      },
      {
        title: "Buses & taxis",
        phrases: [
          ["Where is the bus stop?", "バス停はどこですか。", "バスてい は どこ です か。"],
          ["Does this bus go to the station?", "このバスは駅に行きますか。", "この バス は えき に いきます か。"],
          ["Do I pay when I get off?", "降りる時に払いますか。", "おりる とき に はらいます か。", "Many city buses are paid on exit; check the sign by the door."],
          ["Please tell me when we reach this stop.", "このバス停に着いたら教えてください。", "この バスてい に ついたら おしえて ください。"],
          ["To this address, please.", "この住所までお願いします。", "この じゅうしょ まで おねがい します。", "Show the driver the address written down or on a map."],
          ["How long does it take?", "どのくらいかかりますか。", "どの くらい かかります か。"],
          ["Please stop here.", "ここで止めてください。", "ここ で とめて ください。"],
          ["Can I pay by card?", "カードで払えますか。", "カード で はらえます か。"],
          ["Please open the trunk.", "トランクを開けてください。", "トランク を あけて ください。"]
        ]
      },
      {
        title: "Hotel",
        phrases: [
          ["I have a reservation.", "予約しています。", "よやく して います。"],
          ["Do you have a room for tonight?", "今晩、部屋は空いていますか。", "こんばん、 へや は あいて います か。"],
          ["What time is check-out?", "チェックアウトは何時ですか。", "チェックアウト は なんじ です か。"],
          ["Is breakfast included?", "朝食は付いていますか。", "ちょうしょく は ついて います か。"],
          ["Can you keep my luggage?", "荷物を預かってもらえますか。", "にもつ を あずかって もらえます か。"],
          ["What is the Wi-Fi password?", "Wi-Fiのパスワードは何ですか。", "ワイファイ の パスワード は なん です か。"],
          ["The air conditioning doesn't work.", "エアコンが動きません。", "エアコン が うごきません。"],
          ["There is no hot water.", "お湯が出ません。", "おゆ が でません。"],
          ["I lost my room key.", "部屋の鍵をなくしました。", "へや の かぎ を なくしました。"],
          ["Could you call a taxi for me?", "タクシーを呼んでもらえますか。", "タクシー を よんで もらえます か。"]
        ]
      },
      {
        title: "Sightseeing",
        phrases: [
          ["Where is the tourist information center?", "観光案内所はどこですか。", "かんこう あんないじょ は どこ です か。"],
          ["What time does it open?", "何時に開きますか。", "なんじ に あきます か。"],
          ["What time does it close?", "何時に閉まりますか。", "なんじ に しまります か。"],
          ["How much is admission?", "入場料はいくらですか。", "にゅうじょうりょう は いくら です か。"],
          ["Two adults, please.", "大人二枚お願いします。", "おとな にまい おねがい します。"],
          ["May I take photos here?", "ここで写真を撮ってもいいですか。", "ここ で しゃしん を とって も いい です か。"],
          ["Could you take our picture?", "写真を撮っていただけますか。", "しゃしん を とって いただけます か。"],
          ["Do you have a map in English?", "英語の地図はありますか。", "えいご の ちず は あります か。"],
          ["Do I take my shoes off here?", "ここで靴を脱ぎますか。", "ここ で くつ を ぬぎます か。", "Temples, homes and some restaurants ask you to remove shoes at the entrance."]
        ]
      }
    ]
  },
  {
    id: "restaurant",
    code: "rs",
    title: "Restaurant",
    jaTitle: "食事",
    desc: "Getting a table, ordering, dietary needs, paying and cafés.",
    categories: [
      {
        title: "Getting a table",
        phrases: [
          ["A table for two, please.", "二人です。", "ふたり です。", "Staff will ask 何名様ですか (how many people?); answering with the number is enough."],
          ["Just me.", "一人です。", "ひとり です。"],
          ["Do you have a non-smoking seat?", "禁煙席はありますか。", "きんえんせき は あります か。"],
          ["How long is the wait?", "どのくらい待ちますか。", "どの くらい まちます か。"],
          ["I made a reservation at seven.", "七時に予約しました。", "しちじ に よやく しました。"],
          ["Can we sit at the counter?", "カウンター席でもいいですか。", "カウンターせき でも いい です か。"],
          ["Is there a seat with chairs?", "椅子の席はありますか。", "いす の せき は あります か。", "Useful in places with tatami seating on the floor."]
        ]
      },
      {
        title: "Ordering",
        phrases: [
          ["Could I see the menu?", "メニューを見せてください。", "メニュー を みせて ください。"],
          ["Do you have an English menu?", "英語のメニューはありますか。", "えいご の メニュー は あります か。"],
          ["What do you recommend?", "おすすめは何ですか。", "おすすめ は なん です か。"],
          ["I'll have this.", "これをください。", "これ を ください。", "Point at the menu or the plastic display."],
          ["The same for me.", "同じものをお願いします。", "おなじ もの を おねがい します。"],
          ["One more, please.", "もう一つお願いします。", "もう ひとつ おねがい します。"],
          ["Water, please.", "お水をください。", "おみず を ください。"],
          ["What is this dish?", "これはどんな料理ですか。", "これ は どんな りょうり です か。"],
          ["Is it spicy?", "辛いですか。", "からい です か。"],
          ["A large serving, please.", "大盛りでお願いします。", "おおもり で おねがい します。"],
          ["Excuse me! (to call staff)", "すみません！", "すみません！", "The normal way to get a server's attention; raise your hand as you say it."]
        ]
      },
      {
        title: "Dietary needs",
        phrases: [
          ["I'm allergic to eggs.", "卵アレルギーがあります。", "たまご アレルギー が あります。"],
          ["I can't eat pork.", "豚肉が食べられません。", "ぶたにく が たべられません。"],
          ["I'm vegetarian.", "ベジタリアンです。", "ベジタリアン です。"],
          ["Does this contain meat?", "これに肉は入っていますか。", "これ に にく は はいって います か。", "Many broths use fish stock (だし); ask about it too if you avoid fish."],
          ["Does this contain fish stock?", "これに出汁は入っていますか。", "これ に だし は はいって います か。"],
          ["Without onions, please.", "玉ねぎ抜きでお願いします。", "たまねぎ ぬき で おねがい します。", "Swap in any food: ＿＿抜き means without ＿＿."],
          ["I can't drink alcohol.", "お酒が飲めません。", "おさけ が のめません。"],
          ["Are there peanuts in it?", "ピーナッツは入っていますか。", "ピーナッツ は はいって います か。"]
        ]
      },
      {
        title: "At the table",
        phrases: [
          ["Let's eat. (before eating)", "いただきます。", "いただきます。", "Said before every meal, even when alone."],
          ["Thank you for the meal. (after eating)", "ごちそうさまでした。", "ごちそうさま でした。", "Said to the staff as you leave, too."],
          ["This is delicious.", "とてもおいしいです。", "とても おいしい です。"],
          ["Could I have a fork?", "フォークをもらえますか。", "フォーク を もらえます か。"],
          ["Could I have a small plate?", "取り皿をください。", "とりざら を ください。", "For sharing dishes."],
          ["I didn't order this.", "これは頼んでいません。", "これ は たのんで いません。"],
          ["My order hasn't come yet.", "注文がまだ来ていません。", "ちゅうもん が まだ きて いません。"],
          ["Can I take the rest home?", "持ち帰りできますか。", "もちかえり できます か。", "Not every restaurant allows this for food safety reasons."]
        ]
      },
      {
        title: "Paying",
        phrases: [
          ["The check, please.", "お会計をお願いします。", "おかいけい を おねがい します。", "In many places you pay at the register by the door, not at the table."],
          ["Separate checks, please.", "別々でお願いします。", "べつべつ で おねがい します。"],
          ["All together, please.", "一緒でお願いします。", "いっしょ で おねがい します。"],
          ["Can I pay by credit card?", "クレジットカードは使えますか。", "クレジット カード は つかえます か。"],
          ["Do you need a receipt?", "領収書は要りますか。", "りょうしゅうしょ は いります か。"],
          ["A receipt, please.", "レシートをください。", "レシート を ください。"],
          ["Is tipping expected?", "チップは必要ですか。", "チップ は ひつよう です か。", "Tipping is not customary in Japan; staff may run after you to return it."]
        ]
      },
      {
        title: "Cafés & fast food",
        phrases: [
          ["For here, please.", "店内で。", "てんない で。", "Staff will ask 店内でお召し上がりですか (eating in?)."],
          ["To go, please.", "持ち帰りで。", "もちかえり で。"],
          ["One iced coffee, please.", "アイスコーヒーを一つください。", "アイス コーヒー を ひとつ ください。"],
          ["A small size, please.", "Sサイズでお願いします。", "エス サイズ で おねがい します。"],
          ["No sugar, please.", "砂糖なしでお願いします。", "さとう なし で おねがい します。"],
          ["Where is the trash can?", "ゴミ箱はどこですか。", "ゴミばこ は どこ です か。", "Trash is often sorted: burnable, plastic, cans and bottles."]
        ]
      }
    ]
  },
  {
    id: "shopping",
    code: "sh",
    title: "Shopping",
    jaTitle: "買い物",
    desc: "Finding things, prices, sizes and colors, paying, returns and tax-free.",
    categories: [
      {
        title: "Looking around",
        phrases: [
          ["I'm just looking.", "見ているだけです。", "みて いる だけ です。"],
          ["Do you have this?", "これはありますか。", "これ は あります か。", "Show a photo on your phone."],
          ["Where can I find batteries?", "電池はどこにありますか。", "でんち は どこ に あります か。"],
          ["Could I see that one?", "あれを見せてもらえますか。", "あれ を みせて もらえます か。"],
          ["Do you have a different color?", "ほかの色はありますか。", "ほか の いろ は あります か。"],
          ["Is this made in Japan?", "これは日本製ですか。", "これ は にほんせい です か。"],
          ["What floor is the food section?", "食品売り場は何階ですか。", "しょくひん うりば は なんがい です か。", "Department store food halls are usually in the basement (地下)."]
        ]
      },
      {
        title: "Prices",
        phrases: [
          ["How much is this?", "これはいくらですか。", "これ は いくら です か。"],
          ["Is tax included?", "税込みですか。", "ぜいこみ です か。", "Price tags may show 税抜 (before tax) and 税込 (tax included)."],
          ["It's a little expensive.", "ちょっと高いです。", "ちょっと たかい です。"],
          ["Do you have a cheaper one?", "もっと安いのはありますか。", "もっと やすい の は あります か。"],
          ["Is this on sale?", "これはセール中ですか。", "これ は セールちゅう です か。"],
          ["Can you give me a discount?", "安くしてもらえますか。", "やすく して もらえます か。", "Bargaining is unusual in shops; it is more acceptable at flea markets."]
        ]
      },
      {
        title: "Clothes & sizes",
        phrases: [
          ["May I try this on?", "試着してもいいですか。", "しちゃく して も いい です か。"],
          ["Where is the fitting room?", "試着室はどこですか。", "しちゃくしつ は どこ です か。"],
          ["Do you have a bigger size?", "もっと大きいサイズはありますか。", "もっと おおきい サイズ は あります か。"],
          ["Do you have a smaller size?", "もっと小さいサイズはありますか。", "もっと ちいさい サイズ は あります か。"],
          ["It's too tight.", "きついです。", "きつい です。"],
          ["It's too loose.", "ゆるいです。", "ゆるい です。"],
          ["It fits well.", "ちょうどいいです。", "ちょうど いい です。"],
          ["I'll take this one.", "これにします。", "これ に します。"]
        ]
      },
      {
        title: "Paying",
        phrases: [
          ["Where is the register?", "レジはどこですか。", "レジ は どこ です か。"],
          ["Cash, please.", "現金で払います。", "げんきん で はらいます。"],
          ["Can I use this card?", "このカードは使えますか。", "この カード は つかえます か。"],
          ["I don't need a bag.", "袋は要りません。", "ふくろ は いりません。", "Shops charge a few yen for plastic bags."],
          ["A bag, please.", "袋をお願いします。", "ふくろ を おねがい します。"],
          ["Could you wrap it as a gift?", "プレゼント用に包んでもらえますか。", "プレゼントよう に つつんで もらえます か。"],
          ["Can I buy this tax-free?", "免税できますか。", "めんぜい できます か。", "Visitors on a short-term stay can buy tax-free at shops with the 免税 sign; bring your passport."]
        ]
      },
      {
        title: "Returns & problems",
        phrases: [
          ["I'd like to return this.", "これを返品したいです。", "これ を へんぴん したい です。"],
          ["Can I exchange this?", "これを交換できますか。", "これ を こうかん できます か。"],
          ["It's broken.", "壊れています。", "こわれて います。"],
          ["Here is the receipt.", "レシートはこれです。", "レシート は これ です。"],
          ["The change is wrong.", "おつりが違います。", "おつり が ちがいます。"]
        ]
      },
      {
        title: "Convenience store",
        phrases: [
          ["Could you heat this up?", "温めてもらえますか。", "あたためて もらえます か。", "Staff will usually ask 温めますか (shall I heat it?)."],
          ["No, thank you. (I don't need it.)", "大丈夫です。", "だいじょうぶ です。", "A soft no to offers like a bag, chopsticks or heating."],
          ["Chopsticks, please.", "お箸をください。", "おはし を ください。"],
          ["Is there an ATM?", "ATMはありますか。", "エーティーエム は あります か。", "Convenience store ATMs usually accept foreign cards."],
          ["Can I top up my IC card here?", "ここでICカードにチャージできますか。", "ここ で アイシー カード に チャージ できます か。"]
        ]
      }
    ]
  },
  {
    id: "directions",
    code: "dr",
    title: "Directions",
    jaTitle: "道案内",
    desc: "Asking the way, understanding the answer, landmarks and getting lost.",
    categories: [
      {
        title: "Asking the way",
        phrases: [
          ["Excuse me, may I ask something?", "すみません、ちょっといいですか。", "すみません、 ちょっと いい です か。", "A polite opener before asking a stranger for directions."],
          ["How do I get to the station?", "駅へはどう行けばいいですか。", "えき へ は どう いけば いい です か。"],
          ["Is it far from here?", "ここから遠いですか。", "ここ から とおい です か。"],
          ["Can I walk there?", "歩いて行けますか。", "あるいて いけます か。"],
          ["How many minutes on foot?", "歩いて何分ですか。", "あるいて なんぷん です か。"],
          ["Where is this place?", "この場所はどこですか。", "この ばしょ は どこ です か。", "Show the address or a map on your phone."],
          ["Is there a convenience store near here?", "この近くにコンビニはありますか。", "この ちかく に コンビニ は あります か。"],
          ["Could you show me on the map?", "地図で教えてもらえますか。", "ちず で おしえて もらえます か。"]
        ]
      },
      {
        title: "Understanding the answer",
        phrases: [
          ["Go straight.", "まっすぐ行ってください。", "まっすぐ いって ください。"],
          ["Turn right at the corner.", "角を右に曲がってください。", "かど を みぎ に まがって ください。"],
          ["Turn left at the traffic light.", "信号を左に曲がってください。", "しんごう を ひだり に まがって ください。"],
          ["It's the second street.", "二つ目の道です。", "ふたつめ の みち です。"],
          ["Cross the bridge.", "橋を渡ってください。", "はし を わたって ください。"],
          ["It's on your right.", "右側にあります。", "みぎがわ に あります。"],
          ["It's across the street.", "道の向かい側です。", "みち の むかいがわ です。"],
          ["It's next to the bank.", "銀行の隣です。", "ぎんこう の となり です。"],
          ["It's behind the building.", "建物の裏です。", "たてもの の うら です。"],
          ["It's right there.", "すぐそこです。", "すぐ そこ です。"]
        ]
      },
      {
        title: "Landmarks",
        phrases: [
          ["Intersection", "交差点", "こうさてん"],
          ["Traffic light", "信号", "しんごう"],
          ["Crosswalk", "横断歩道", "おうだん ほどう"],
          ["Exit (of a station)", "出口", "でぐち", "Big stations have numbered and lettered exits; ask for the exact one."],
          ["Entrance", "入口", "いりぐち"],
          ["Police box", "交番", "こうばん", "Small neighborhood police posts; officers there give directions."],
          ["Post office", "郵便局", "ゆうびんきょく"],
          ["Hospital", "病院", "びょういん"],
          ["Park", "公園", "こうえん"],
          ["North, south, east, west", "北、南、東、西", "きた、 みなみ、 ひがし、 にし"]
        ]
      },
      {
        title: "Lost",
        phrases: [
          ["I'm lost.", "道に迷いました。", "みち に まよいました。"],
          ["Where am I now?", "ここはどこですか。", "ここ は どこ です か。"],
          ["What is the name of this street?", "この通りの名前は何ですか。", "この とおり の なまえ は なん です か。"],
          ["Which exit should I use?", "どの出口から出ればいいですか。", "どの でぐち から でれば いい です か。"],
          ["Please take me there.", "そこまで連れて行ってください。", "そこ まで つれて いって ください。"],
          ["Thank you, that helps a lot.", "ありがとうございます、助かりました。", "ありがとう ございます、 たすかりました。"]
        ]
      }
    ]
  },
  {
    id: "emergencies",
    code: "em",
    title: "Emergencies",
    jaTitle: "緊急",
    desc: "Calling for help, police, lost items, getting sick, and earthquakes.",
    categories: [
      {
        title: "Calling for help",
        phrases: [
          ["Help!", "助けて！", "たすけて！"],
          ["Call the police!", "警察を呼んでください！", "けいさつ を よんで ください！", "Police: dial 110."],
          ["Call an ambulance!", "救急車を呼んでください！", "きゅうきゅうしゃ を よんで ください！", "Ambulance and fire: dial 119."],
          ["Fire!", "火事だ！", "かじ だ！"],
          ["It's an emergency.", "緊急です。", "きんきゅう です。"],
          ["Someone has collapsed.", "人が倒れています。", "ひと が たおれて います。"],
          ["Is anyone hurt?", "けが人はいますか。", "けがにん は います か。"],
          ["Please stay with me.", "そばにいてください。", "そば に いて ください。"],
          ["Is there anyone who speaks English?", "英語を話せる人はいますか。", "えいご を はなせる ひと は います か。"]
        ]
      },
      {
        title: "Police",
        phrases: [
          ["Where is the police box?", "交番はどこですか。", "こうばん は どこ です か。"],
          ["My wallet was stolen.", "財布を盗まれました。", "さいふ を ぬすまれました。"],
          ["Someone is following me.", "誰かにつけられています。", "だれか に つけられて います。"],
          ["I was in a traffic accident.", "交通事故にあいました。", "こうつう じこ に あいました。"],
          ["Please make a report.", "届けを出したいです。", "とどけ を だしたい です。"],
          ["I need a police report for insurance.", "保険のために証明書が必要です。", "ほけん の ため に しょうめいしょ が ひつよう です。"],
          ["Please contact my embassy.", "大使館に連絡してください。", "たいしかん に れんらく して ください。"]
        ]
      },
      {
        title: "Lost items",
        phrases: [
          ["I lost my passport.", "パスポートをなくしました。", "パスポート を なくしました。"],
          ["I left my bag on the train.", "電車にかばんを忘れました。", "でんしゃ に かばん を わすれました。", "Report it to station staff; lost property in Japan is often returned."],
          ["I lost my phone.", "スマホをなくしました。", "スマホ を なくしました。"],
          ["It's a black backpack.", "黒いリュックです。", "くろい リュック です。"],
          ["Where is the lost and found?", "忘れ物センターはどこですか。", "わすれもの センター は どこ です か。"],
          ["Has a wallet been handed in?", "財布の届けはありますか。", "さいふ の とどけ は あります か。"]
        ]
      },
      {
        title: "Getting sick",
        phrases: [
          ["I feel sick.", "気分が悪いです。", "きぶん が わるい です。"],
          ["I need a doctor.", "医者に診てもらいたいです。", "いしゃ に みて もらいたい です。"],
          ["Where is the nearest hospital?", "一番近い病院はどこですか。", "いちばん ちかい びょういん は どこ です か。"],
          ["Is there a pharmacy near here?", "この近くに薬局はありますか。", "この ちかく に やっきょく は あります か。"],
          ["I have a fever.", "熱があります。", "ねつ が あります。"],
          ["I hurt my ankle.", "足首をけがしました。", "あしくび を けが しました。"],
          ["I have travel insurance.", "旅行保険に入っています。", "りょこう ほけん に はいって います。"],
          ["I take this medicine.", "この薬を飲んでいます。", "この くすり を のんで います。"]
        ]
      },
      {
        title: "Earthquakes & disasters",
        phrases: [
          ["Earthquake!", "地震だ！", "じしん だ！"],
          ["Get under the table.", "机の下に入ってください。", "つくえ の した に はいって ください。"],
          ["Where is the evacuation area?", "避難場所はどこですか。", "ひなん ばしょ は どこ です か。", "Look for green signs marked 避難場所 or 避難所."],
          ["Is there a tsunami warning?", "津波警報は出ていますか。", "つなみ けいほう は でて います か。"],
          ["Move to high ground!", "高い所へ逃げてください！", "たかい ところ へ にげて ください！"],
          ["Is it safe here?", "ここは安全ですか。", "ここ は あんぜん です か。"],
          ["Is the train running?", "電車は動いていますか。", "でんしゃ は うごいて います か。"],
          ["I want to contact my family.", "家族に連絡したいです。", "かぞく に れんらく したい です。"]
        ]
      }
    ]
  },
  {
    id: "workplace",
    code: "wp",
    title: "Workplace",
    jaTitle: "職場",
    desc: "Office greetings, meetings, phone and email, schedules and asking for help.",
    categories: [
      {
        title: "Everyday greetings",
        phrases: [
          ["Good morning. (to colleagues)", "おはようございます。", "おはよう ございます。", "Used on arrival at any hour in many workplaces, even for night shifts."],
          ["Thanks for your hard work.", "お疲れ様です。", "おつかれさま です。", "A greeting and thank-you in one; used when passing colleagues and at the end of the day."],
          ["Excuse me for leaving first.", "お先に失礼します。", "おさき に しつれい します。", "Said when leaving while others are still working."],
          ["I'm back.", "ただいま戻りました。", "ただいま もどりました。"],
          ["Welcome back.", "お帰りなさい。", "おかえりなさい。"],
          ["Excuse me for interrupting.", "失礼します。", "しつれい します。", "Said when entering someone's office or a meeting room."],
          ["Thank you for always helping me.", "いつもお世話になっております。", "いつも おせわ に なって おります。", "The standard opener for business phone calls and email."]
        ]
      },
      {
        title: "Introductions",
        phrases: [
          ["I'm Smith from the sales department.", "営業部のスミスです。", "えいぎょうぶ の スミス です。"],
          ["I joined today.", "今日から入りました。", "きょう から はいりました。"],
          ["Here is my business card.", "名刺をどうぞ。", "めいし を どうぞ。", "Offer it with both hands, text facing the other person."],
          ["I look forward to working with you.", "どうぞよろしくお願いいたします。", "どうぞ よろしく おねがい いたします。"],
          ["What is your role?", "ご担当は何ですか。", "ごたんとう は なん です か。"]
        ]
      },
      {
        title: "Meetings",
        phrases: [
          ["What time does the meeting start?", "会議は何時からですか。", "かいぎ は なんじ から です か。"],
          ["Which room is it in?", "どの会議室ですか。", "どの かいぎしつ です か。"],
          ["Shall we begin?", "始めましょうか。", "はじめましょう か。"],
          ["I have a question.", "質問があります。", "しつもん が あります。"],
          ["Could you explain that again?", "もう一度説明していただけますか。", "もう いちど せつめい して いただけます か。"],
          ["I agree.", "賛成です。", "さんせい です。"],
          ["Let me think about it.", "少し考えさせてください。", "すこし かんがえさせて ください。"],
          ["Could you share the materials?", "資料を共有していただけますか。", "しりょう を きょうゆう して いただけます か。"],
          ["Let's decide on the next steps.", "次の対応を決めましょう。", "つぎ の たいおう を きめましょう。"]
        ]
      },
      {
        title: "Phone & email",
        phrases: [
          ["Hello? (on the phone)", "もしもし。", "もしもし。", "Not used when answering a business line; give the company name instead."],
          ["This is Smith speaking.", "スミスと申します。", "スミス と もうします。"],
          ["May I speak to Mr. or Ms. Tanaka?", "田中さんはいらっしゃいますか。", "たなか さん は いらっしゃいます か。"],
          ["He or she is away from their desk.", "ただいま席を外しております。", "ただいま せき を はずして おります。"],
          ["I'll call back later.", "後でかけ直します。", "あと で かけなおします。"],
          ["Could you ask them to call me back?", "折り返しお電話をお願いできますか。", "おりかえし おでんわ を おねがい できます か。"],
          ["I'll send it by email.", "メールでお送りします。", "メール で おおくり します。"],
          ["Did you get my email?", "メールは届きましたか。", "メール は とどきました か。"]
        ]
      },
      {
        title: "Schedules & deadlines",
        phrases: [
          ["When is the deadline?", "締め切りはいつですか。", "しめきり は いつ です か。"],
          ["I'll finish it by tomorrow.", "明日までに終わらせます。", "あした まで に おわらせます。"],
          ["I'm sorry, it will be late.", "申し訳ありません、遅れます。", "もうしわけ ありません、 おくれます。"],
          ["Are you free next week?", "来週はご都合いかがですか。", "らいしゅう は ごつごう いかが です か。"],
          ["I'll be off tomorrow.", "明日は休みをいただきます。", "あした は やすみ を いただきます。"],
          ["I'll be a little late today.", "今日は少し遅れます。", "きょう は すこし おくれます。", "Tell your team before your start time, not after."]
        ]
      },
      {
        title: "Asking for help",
        phrases: [
          ["Do you have a moment?", "今、お時間よろしいですか。", "いま、 おじかん よろしい です か。"],
          ["Could you teach me how to do this?", "やり方を教えていただけますか。", "やりかた を おしえて いただけます か。"],
          ["Where should I save this file?", "このファイルはどこに保存すればいいですか。", "この ファイル は どこ に ほぞん すれば いい です か。"],
          ["The printer isn't working.", "プリンターが動きません。", "プリンター が うごきません。"],
          ["Could you check this?", "確認していただけますか。", "かくにん して いただけます か。"],
          ["Thank you, you've been a great help.", "ありがとうございます、助かりました。", "ありがとう ございます、 たすかりました。"]
        ]
      }
    ]
  },
  {
    id: "smalltalk",
    code: "st",
    title: "Small Talk",
    jaTitle: "会話",
    desc: "Getting to know people, hobbies, weather, feelings and keeping in touch.",
    categories: [
      {
        title: "Getting to know someone",
        phrases: [
          ["How are you?", "お元気ですか。", "おげんき です か。", "Mostly for people you haven't seen in a while, not a daily greeting."],
          ["I'm fine, thanks.", "はい、元気です。", "はい、 げんき です。"],
          ["It's been a long time.", "お久しぶりです。", "おひさしぶり です。"],
          ["Where do you live?", "どこに住んでいますか。", "どこ に すんで います か。"],
          ["I live in Osaka.", "大阪に住んでいます。", "おおさか に すんで います。"],
          ["What do you do for work?", "お仕事は何ですか。", "おしごと は なん です か。"],
          ["How long have you been in Japan?", "日本に来てどのくらいですか。", "にほん に きて どの くらい です か。"],
          ["About six months.", "半年くらいです。", "はんとし くらい です。"],
          ["Do you have any brothers or sisters?", "兄弟はいますか。", "きょうだい は います か。"],
          ["Your Japanese is good.", "日本語が上手ですね。", "にほんご が じょうず です ね。", "A common compliment; a modest reply is いえいえ、まだまだです."],
          ["No, I still have a long way to go.", "いえいえ、まだまだです。", "いえいえ、 まだまだ です。"]
        ]
      },
      {
        title: "Hobbies & free time",
        phrases: [
          ["What are your hobbies?", "趣味は何ですか。", "しゅみ は なん です か。"],
          ["My hobby is reading.", "趣味は読書です。", "しゅみ は どくしょ です。"],
          ["I like music.", "音楽が好きです。", "おんがく が すき です。"],
          ["What kind of music do you like?", "どんな音楽が好きですか。", "どんな おんがく が すき です か。"],
          ["What do you do on weekends?", "週末は何をしますか。", "しゅうまつ は なに を します か。"],
          ["I often go hiking.", "よくハイキングに行きます。", "よく ハイキング に いきます。"],
          ["I've been learning Japanese for a year.", "日本語を一年勉強しています。", "にほんご を いちねん べんきょう して います。"],
          ["Have you seen this anime?", "このアニメを見たことがありますか。", "この アニメ を みた こと が あります か。"],
          ["Do you play any sports?", "何かスポーツをしますか。", "なにか スポーツ を します か。"]
        ]
      },
      {
        title: "Weather & seasons",
        phrases: [
          ["It's hot today, isn't it?", "今日は暑いですね。", "きょう は あつい です ね。", "Talking about the weather with ね is the classic way to start a chat."],
          ["It's cold, isn't it?", "寒いですね。", "さむい です ね。"],
          ["It's humid.", "蒸し暑いですね。", "むしあつい です ね。"],
          ["It looks like rain.", "雨が降りそうですね。", "あめ が ふりそう です ね。"],
          ["The cherry blossoms are beautiful.", "桜がきれいですね。", "さくら が きれい です ね。"],
          ["Which season do you like?", "どの季節が好きですか。", "どの きせつ が すき です か。"],
          ["The rainy season has started.", "梅雨に入りましたね。", "つゆ に はいりました ね。", "Most of Japan has a rainy season in June and July."]
        ]
      },
      {
        title: "Feelings & reactions",
        phrases: [
          ["Really?", "本当ですか。", "ほんとう です か。"],
          ["That's great!", "すごいですね！", "すごい です ね！"],
          ["That's too bad.", "それは残念ですね。", "それ は ざんねん です ね。"],
          ["I see.", "なるほど。", "なるほど。"],
          ["That sounds fun.", "楽しそうですね。", "たのしそう です ね。"],
          ["I'm happy.", "うれしいです。", "うれしい です。"],
          ["I'm tired.", "疲れました。", "つかれました。"],
          ["I'm a little nervous.", "少し緊張しています。", "すこし きんちょう して います。"],
          ["Congratulations!", "おめでとうございます！", "おめでとう ございます！"]
        ]
      },
      {
        title: "Invitations & plans",
        phrases: [
          ["Would you like to get a meal together?", "一緒にご飯を食べませんか。", "いっしょ に ごはん を たべません か。"],
          ["Sounds good, let's go.", "いいですね、行きましょう。", "いい です ね、 いきましょう。"],
          ["Sorry, I have plans that day.", "すみません、その日は用事があります。", "すみません、 その ひ は ようじ が あります。", "A polite way to decline without giving details."],
          ["When are you free?", "いつが空いていますか。", "いつ が あいて います か。"],
          ["Where shall we meet?", "どこで待ち合わせしましょうか。", "どこ で まちあわせ しましょう か。"],
          ["Let's meet in front of the station.", "駅の前で会いましょう。", "えき の まえ で あいましょう。"],
          ["I'll be about five minutes late.", "五分くらい遅れます。", "ごふん くらい おくれます。"]
        ]
      },
      {
        title: "Keeping in touch",
        phrases: [
          ["Can I have your contact details?", "連絡先を教えてもらえますか。", "れんらくさき を おしえて もらえます か。"],
          ["Do you use LINE?", "LINEをやっていますか。", "ライン を やって います か。", "LINE is the most common messaging app in Japan."],
          ["I'll message you later.", "後で連絡します。", "あと で れんらく します。"],
          ["It was nice talking with you.", "お話しできて楽しかったです。", "おはなし できて たのしかった です。"],
          ["Let's meet again.", "また会いましょう。", "また あいましょう。"],
          ["Take care.", "気をつけてね。", "き を つけて ね。"],
          ["See you.", "またね。", "また ね。", "Casual; with people you don't know well, say ではまた (dewa mata)."]
        ]
      }
    ]
  },
  {
    id: "dailylife",
    code: "dl",
    title: "Daily Life",
    jaTitle: "生活",
    desc: "City hall, the bank and post office, phones, housing, trash and neighbors.",
    categories: [
      {
        title: "City hall",
        phrases: [
          ["I'd like to register my address.", "住所の届け出をしたいです。", "じゅうしょ の とどけで を したい です。", "New residents register at the city or ward office within 14 days of moving in."],
          ["Which counter should I go to?", "どの窓口に行けばいいですか。", "どの まどぐち に いけば いい です か。"],
          ["Here is my residence card.", "在留カードです。", "ざいりゅう カード です。"],
          ["What documents do I need?", "どんな書類が必要ですか。", "どんな しょるい が ひつよう です か。"],
          ["I'd like to join the health insurance.", "健康保険に入りたいです。", "けんこう ほけん に はいりたい です。"],
          ["Where do I write my name?", "名前はどこに書きますか。", "なまえ は どこ に かきます か。"],
          ["Please take a number and wait.", "番号札を取ってお待ちください。", "ばんごうふだ を とって おまち ください。"]
        ]
      },
      {
        title: "Bank & post office",
        phrases: [
          ["I'd like to open an account.", "口座を開きたいです。", "こうざ を ひらきたい です。"],
          ["I'd like to send money abroad.", "海外に送金したいです。", "かいがい に そうきん したい です。"],
          ["Where can I exchange money?", "どこで両替できますか。", "どこ で りょうがえ できます か。"],
          ["I'd like to send this to America.", "これをアメリカに送りたいです。", "これ を アメリカ に おくりたい です。"],
          ["By airmail, please.", "航空便でお願いします。", "こうくうびん で おねがい します。"],
          ["How many days will it take?", "何日くらいかかりますか。", "なんにち くらい かかります か。"],
          ["One stamp, please.", "切手を一枚ください。", "きって を いちまい ください。"],
          ["I got a missed-delivery notice.", "不在票が入っていました。", "ふざいひょう が はいって いました。", "Use the slip's phone number or QR code to schedule redelivery."]
        ]
      },
      {
        title: "Phones & internet",
        phrases: [
          ["I'd like to buy a SIM card.", "SIMカードを買いたいです。", "シム カード を かいたい です。"],
          ["How much is it per month?", "月にいくらですか。", "つき に いくら です か。"],
          ["My phone won't connect.", "スマホがつながりません。", "スマホ が つながりません。"],
          ["Is there free Wi-Fi here?", "ここに無料のWi-Fiはありますか。", "ここ に むりょう の ワイファイ は あります か。"],
          ["Can I charge my phone?", "スマホを充電してもいいですか。", "スマホ を じゅうでん して も いい です か。"],
          ["The battery is almost dead.", "電池がもうすぐ切れます。", "でんち が もうすぐ きれます。"]
        ]
      },
      {
        title: "Housing",
        phrases: [
          ["I'm looking for an apartment.", "アパートを探しています。", "アパート を さがして います。"],
          ["How much is the rent?", "家賃はいくらですか。", "やちん は いくら です か。"],
          ["Is it close to the station?", "駅から近いですか。", "えき から ちかい です か。"],
          ["Can I see the room?", "部屋を見せてもらえますか。", "へや を みせて もらえます か。"],
          ["Are pets allowed?", "ペットは大丈夫ですか。", "ペット は だいじょうぶ です か。"],
          ["The toilet is blocked.", "トイレが詰まりました。", "トイレ が つまりました。"],
          ["The water is leaking.", "水が漏れています。", "みず が もれて います。"],
          ["When will the electricity be turned on?", "電気はいつ使えるようになりますか。", "でんき は いつ つかえる よう に なります か。"]
        ]
      },
      {
        title: "Trash & recycling",
        phrases: [
          ["What day is trash collection?", "ゴミの日は何曜日ですか。", "ゴミ の ひ は なんようび です か。", "Each neighborhood has a schedule; ask the city office or your landlord for the chart."],
          ["Is this burnable?", "これは燃えるゴミですか。", "これ は もえる ゴミ です か。"],
          ["Where do plastic bottles go?", "ペットボトルはどこに捨てますか。", "ペットボトル は どこ に すてます か。", "Remove the cap and label, and rinse the bottle."],
          ["Where is the collection point?", "ゴミ置き場はどこですか。", "ゴミおきば は どこ です か。"],
          ["How do I throw away large items?", "粗大ゴミはどうやって捨てますか。", "そだい ゴミ は どう やって すてます か。", "Large items need a paid sticker and a booked pickup."]
        ]
      },
      {
        title: "Neighbors",
        phrases: [
          ["I just moved in next door.", "隣に引っ越してきました。", "となり に ひっこして きました。"],
          ["This is a small gift.", "つまらないものですが、どうぞ。", "つまらない もの です が、 どうぞ。", "A traditional modest phrase when giving a moving-in gift."],
          ["I'm sorry about the noise.", "うるさくてすみません。", "うるさくて すみません。"],
          ["Could you keep it down a little?", "少し静かにしてもらえますか。", "すこし しずか に して もらえます か。"],
          ["A package came for you.", "荷物が届いていましたよ。", "にもつ が とどいて いました よ。"],
          ["Thanks for everything.", "いろいろありがとうございました。", "いろいろ ありがとう ございました。"]
        ]
      }
    ]
  },
  {
    id: "classroom",
    code: "cl",
    title: "Classroom",
    jaTitle: "教室",
    desc: "Language-school phrases: asking questions, instructions, homework and tests.",
    categories: [
      {
        title: "Asking the teacher",
        phrases: [
          ["Teacher, I have a question.", "先生、質問があります。", "せんせい、 しつもん が あります。"],
          ["How do you read this kanji?", "この漢字は何と読みますか。", "この かんじ は なん と よみます か。"],
          ["What is the difference between these?", "これとこれはどう違いますか。", "これ と これ は どう ちがいます か。"],
          ["Is this sentence correct?", "この文は正しいですか。", "この ぶん は ただしい です か。"],
          ["Could you give an example?", "例を挙げていただけますか。", "れい を あげて いただけます か。"],
          ["Is this polite or casual?", "これは丁寧な言い方ですか。", "これ は ていねい な いいかた です か。"],
          ["Which page is it?", "何ページですか。", "なん ページ です か。"],
          ["Could you write it on the board?", "黒板に書いていただけますか。", "こくばん に かいて いただけます か。"]
        ]
      },
      {
        title: "Teacher's instructions",
        phrases: [
          ["Open your textbook.", "教科書を開いてください。", "きょうかしょ を ひらいて ください。"],
          ["Please repeat after me.", "後について言ってください。", "あと に ついて いって ください。"],
          ["Read it aloud.", "声に出して読んでください。", "こえ に だして よんで ください。"],
          ["Work in pairs.", "ペアで練習してください。", "ペア で れんしゅう して ください。"],
          ["Listen carefully.", "よく聞いてください。", "よく きいて ください。"],
          ["Fill in the blanks.", "空欄を埋めてください。", "くうらん を うめて ください。"],
          ["That's it for today.", "今日はここまでです。", "きょう は ここ まで です。"]
        ]
      },
      {
        title: "Homework & tests",
        phrases: [
          ["When is the homework due?", "宿題はいつまでですか。", "しゅくだい は いつ まで です か。"],
          ["I forgot my homework.", "宿題を忘れました。", "しゅくだい を わすれました。"],
          ["When is the test?", "テストはいつですか。", "テスト は いつ です か。"],
          ["What is on the test?", "テストの範囲はどこですか。", "テスト の はんい は どこ です か。"],
          ["I'm studying for the JLPT.", "日本語能力試験の勉強をしています。", "にほんご のうりょく しけん の べんきょう を して います。", "The Japanese-Language Proficiency Test runs from N5 (easiest) to N1."],
          ["I passed!", "合格しました！", "ごうかく しました！"]
        ]
      },
      {
        title: "Class logistics",
        phrases: [
          ["Sorry I'm late.", "遅れてすみません。", "おくれて すみません。"],
          ["I'll be absent tomorrow.", "明日は休みます。", "あした は やすみます。"],
          ["May I go to the restroom?", "トイレに行ってもいいですか。", "トイレ に いって も いい です か。"],
          ["Could I borrow a pen?", "ペンを借りてもいいですか。", "ペン を かりて も いい です か。"],
          ["What did we do last class?", "前の授業で何をしましたか。", "まえ の じゅぎょう で なに を しました か。"],
          ["Thank you for today's lesson.", "今日もありがとうございました。", "きょう も ありがとう ございました。"]
        ]
      },
      {
        title: "Grammar words",
        phrases: [
          ["Noun", "名詞", "めいし"],
          ["Verb", "動詞", "どうし"],
          ["Adjective", "形容詞", "けいようし"],
          ["Particle", "助詞", "じょし"],
          ["Polite form", "丁寧形", "ていねいけい", "The です/ます form."],
          ["Dictionary form", "辞書形", "じしょけい"],
          ["Past tense", "過去形", "かこけい"],
          ["Pronunciation", "発音", "はつおん"]
        ]
      }
    ]
  }
];
