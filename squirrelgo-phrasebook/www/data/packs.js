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
  }
];
