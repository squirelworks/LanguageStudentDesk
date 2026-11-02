#!/usr/bin/env python3
"""Generate taiwanese grammar lesson JSON additions (45 lessons)."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def d(q, en, ans, wrong, why):
    return {"q": q, "en": en, "options": [ans] + list(wrong), "answer": ans, "why": why}


def ex(zh, zy_py, en):
    return [zh, zy_py, en]


def L(id_, level, title, particle, summary, sections, drills):
    return {
        "id": id_,
        "level": level,
        "title": title,
        "particle": particle,
        "summary": summary,
        "sections": sections,
        "drills": drills,
    }


tw = []

# absolute-beginner +8 (to 12)
ab_specs = [
    ("zhuyin-initials", "Zhuyin initials", "b p m f…", "The left column of Zhuyin: ㄅㄆㄇㄈ.", "ㄅ is b, ㄆ is p with more air, ㄇ is m, ㄈ is f.", ex("{八}。", "ㄅㄚ · bā", "eight"), "Which is p with a puff?", "ㄆ", ["ㄅ", "ㄇ", "ㄈ"], "ㄆ is aspirated p; ㄅ is plain."),
    ("zhuyin-finals", "Zhuyin finals", "a o e…", "Single finals ㄚㄛㄜㄝ and compound spellings.", "After an initial, finals carry the vowel. ㄚ is a, ㄛ is o, ㄜ is e.", ex("{哥}。", "ㄍㄜ · gē", "older brother"), "ㄜ is romanized…", "e", ["o", "a", "i"], "ㄜ is e as in 哥 gē."),
    ("numbers-basic", "Numbers 一–十", "一…十", "Count with 一 to 十; 兩 before measure words for two.", "Use 兩 liǎng before classifiers: 兩個, not 二個 in Taiwan speech.", ex("{兩}個蘋果。", "ㄌㄧㄤˇ ㄍㄜˋ ㄆㄧㄥˊ ㄍㄨㄛˇ · Liǎng gè píngguǒ.", "two apples"), "Two apples uses…", "兩", ["二", "三", "十"], "兩 before measure words for two."),
    ("this-that", "這 / 那 / 哪", "這・那・哪", "Near 這, far 那, question 哪.", "這 zhè this, 那 nà that, 哪 nǎ which/where in questions.", ex("{這}是什麼？", "ㄓㄜˋ ㄕˋ ㄕㄜˊ ㄇㄜ˙? · Zhè shì shénme?", "What is this?"), "Which asks which?", "哪", ["這", "那", "很"], "哪 in 哪裡 / 哪個."),
    ("who-what", "誰 / 什麼", "誰・什麼", "Who and what in questions.", "誰 shéi who; 什麼 shénme what. Keep question word; verb at end.", ex("{誰}來？", "ㄕㄟˊ ㄌㄞˊ? · Shéi lái?", "Who is coming?"), "Who is coming?", "誰來？", ["什麼來？", "哪來？", "很來？"], "誰 = who."),
    ("polite-qing", "請 — please", "請", "請 qǐng please; 請進 come in; 請坐 please sit.", "請 softens requests. 請問 opens questions politely.", ex("{請}坐。", "ㄑㄧㄥˇ ㄗㄨㄛˋ · Qǐng zuò.", "Please sit."), "Please sit.", "請坐。", ["坐請。", "不坐。", "請問坐。"], "請 + verb."),
    ("transport-tw", "捷運 / 計程車", "捷運・計程車", "Taiwan words for metro and taxi.", "Take 捷運 for the metro; call a 計程車, not 出租车.", ex("我坐{捷運}。", "ㄨㄛˇ ㄗㄨㄛˋ ㄐㄧㄝˊ ㄩㄣˋ · Wǒ zuò jiéyùn.", "I take the MRT."), "Metro in Taipei is…", "捷運", ["地鐵", "公車", "計程車"], "Taiwan word 捷運."),
    ("classifiers-intro", "個 / 本 / 杯", "量詞", "Common measure words with 一、兩、三.", "個 gè general; 本 běn books; 杯 bēi cups.", ex("一{本}書。", "ㄧˋ ㄅㄣˇ ㄕㄨ · Yì běn shū.", "one book"), "One book uses…", "本", ["個", "杯", "張"], "Books take 本."),
]
for spec in ab_specs:
    id_, title, particle, summary, p, example, dq, ans, wrong, why = spec
    tw.append(
        L(
            id_,
            "absolute-beginner",
            title,
            particle,
            summary,
            [{"p": p, "examples": [example]}],
            [
                d(dq, "", ans, wrong, why),
                d("Taiwan Mandarin uses traditional characters.", "", "True", ["False", "Only simplified", "Only pinyin"], "Traditional in Taiwan."),
                d("Zhuyin sits…", "", "beside characters in these lessons", ["under every English word", "only in mainland texts", "replaces hanzi"], "Bopomofo aid."),
                d("Polite please is…", "", "請", ["不", "很", "是"], "請 qǐng."),
                d("Lesson vocabulary style is…", "", "Taiwan usage (捷運, 影片)", ["mainland-only", "Cantonese", "English only"], "Taiwan words."),
            ],
        )
    )

# beginner +7
beg = [
    L("zhe-ne-nali", "beginner", "這裡 / 那裡 / 哪裡", "哪裡", "Place words for here, there, where.", [{"p": "<b>這裡</b> here, <b>那裡</b> there, <b>哪裡</b> where. Taiwan also says 這邊/那邊 in speech.", "examples": [ex("洗手間在{哪裡}？", "ㄒㄧˇ ㄕㄡˇ ㄐㄧㄢ ㄗㄞˋ ㄋㄚˇ ㄌㄧˇ? · Xǐshǒujiān zài nǎlǐ?", "Where is the toilet?")]}], [d("Where is the toilet?", "", "哪裡", ["這裡", "那裡", "什麼"], "哪裡 = where."), d("這裡 means…", "", "here", ["there", "what", "who"], "這裡 here."), d("那裡 means…", "", "there", ["here", "why", "please"], "那裡 there."), d("Question place word…", "", "哪裡", ["這裡", "很", "的"], "哪裡."), d("在 + place asks…", "", "location", ["time only", "reason only", "passive"], "在 + 哪裡.")]),
    L("time-jiantian", "beginner", "今天 / 明天 / 昨天", "今天", "Basic time words.", [{"p": "<b>今天</b> today, <b>明天</b> tomorrow, <b>昨天</b> yesterday.", "examples": [ex("{明天}見。", "ㄇㄧ�ngˊ ㄊㄧㄢ ㄐㄧ�anˋ · Míngtiān jiàn.", "See you tomorrow.")]}], [d("See you tomorrow.", "", "明天見", ["今天見", "昨天見", "請見"], "明天 tomorrow."), d("Yesterday is…", "", "昨天", ["明天", "今天", "現在"], "昨天."), d("今天 means…", "", "today", ["tomorrow", "yesterday", "tonight"], "今天."), d("Which is future?", "", "明天", ["昨天", "今天", "現在"], "明天."), d("Time word order in TW Mandarin…", "", "same as Mandarin, Taiwan words", ["verb first", "no time words", "English order"], "Time before verb often.")]),
    L("weather-tw", "beginner", "天氣 — hot, cold, rain", "天氣", "Describe weather.", [{"p": "Use 很 with adjectives: 今天<b>很</b>熱. 下雨 xiàyǔ rain; 颱風 táifēng typhoon (Taiwan).", "examples": [ex("今天{很}冷。", "ㄐㄧㄣ ㄊㄧㄢ ㄏㄣˇ ㄌㄥˇ · Jīntiān hěn lěng.", "It is cold today.")]}], [d("It is cold today.", "", "今天很冷。", ["今天冷是。", "今天是很冷", "冷今天。"], "很 + adjective."), d("Rain verb phrase…", "", "下雨", ["下車", "上雨", "雨下"], "下雨 rain."), d("Typhoon in Taiwan is…", "", "颱風", ["龍捲風 only US", "雪風", "地震"], "颱風."), d("很 with weather adj…", "", "normal link", ["never use", "only past", "only question"], "很 link."), d("熱 means…", "", "hot", ["cold", "wind", "snow"], "熱 hot.")]),
    L("food-order", "beginner", "點餐 — ordering food", "點餐", "Order in a shop or night market.", [{"p": "<b>我要</b> I want; <b>請給我</b> please give me. Taiwan: 便當 biàndāng, 珍珠奶茶 zhēnzhū nǎichá.", "examples": [ex("{我要}一碗麵。", "ㄨㄛˇ ㄧㄠˋ ㄧˋ ㄨㄢˇ ㄇㄧ�anˋ · Wǒ yào yì wǎn miàn.", "I want a bowl of noodles.")]}], [d("I want a bowl of noodles.", "", "我要一碗麵", ["我要一碗是", "我是一碗麵", "要碗我麵"], "我要 + item."), d("Please give me uses…", "", "請給我", ["不給我", "給請我", "我請"], "請給我."), d("便當 is…", "", "boxed meal", ["only drink", "only dessert", "metro"], "Taiwan lunch box."), d("珍珠奶茶 is…", "", "bubble tea", ["coffee only", "wine", "juice only"], "Taiwan drink."), d("Ordering register…", "", "polite 請/我要", ["news style", "passive only", "classical"], "Daily shop.")]),
    L("dui-buqi", "beginner", "對不起 / 沒關係", "對不起", "Apologize and reply.", [{"p": "<b>對不起</b> sorry; <b>沒關係</b> it's OK. <b>不好意思</b> excuse me (lighter).", "examples": [ex("{對不起}。", "ㄉㄨㄟˋ ㄅㄨˊ ㄑㄧˇ · Duìbuqǐ.", "Sorry.")]}], [d("Sorry.", "", "對不起", ["沒關係", "謝謝", "再見"], "Apology."), d("It's OK (reply).", "", "沒關係", ["對不起", "請", "是"], "Reply."), d("Excuse me (light).", "", "不好意思", ["對不起 only heavy", "沒關係", "你好"], "不好意思."), d("After apology friend says…", "", "沒關係", ["對不起", "請問", "是"], "Forgive."), d("對不起 register…", "", "spoken polite", ["news 被", "only writing", "only questions"], "Spoken.")]),
    L("zai-jia", "beginner", "在 + place", "在", "Say where someone is.", [{"p": "<b>在</b> + place: 在家 at home, 在公司 at the office. Negate existence with 不在.", "examples": [ex("我在{家}。", "ㄨㄛˇ ㄗㄞˋ ㄐㄧㄚ · Wǒ zài jiā.", "I am at home.")]}], [d("I am at home.", "", "我在家", ["我是家", "我有家", "我在有家"], "在 location."), d("在 marks…", "", "location", ["time only", "passive", "topic only"], "Place."), d("不在 means…", "", "not at / not here", ["always at", "please at", "very at"], "Negation."), d("我在公司 means…", "", "I am at the office", ["I am a company", "I have office", "office is me"], "在 + place."), d("Question where…", "", "在哪裡", ["是什麼", "有誰", "的了"], "在哪裡.")]),
    L("you-meiyou", "beginner", "有 / 沒有 review", "有・沒有", "Have, there is; negate with 沒有.", [{"p": "Expand 有: 有時間 have time, 有問題 have a problem. 沒有 + noun.", "examples": [ex("我{沒有}問題。", "ㄨㄛˇ ㄇ�eiˊ ㄧㄡˇ ㄨㄣˋ ㄊㄧˊ · Wǒ méiyǒu wèntí.", "I have no problem.")]}], [d("I have no problem.", "", "我沒有問題", ["我不有問題", "我沒問題是", "我有沒問題"], "沒有 + noun."), d("有時間 means…", "", "have time", ["time is", "time does", "no time"], "有 + noun."), d("Negate 有 with…", "", "沒有", ["不", "很", "是"], "沒有."), d("有問題 can mean…", "", "there is a problem / I have a question", ["no problem only", "only past", "only passive"], "Context."), d("沒有 pattern…", "", "沒(有) + noun", ["不 + 有了", "沒是", "有沒"], "Standard neg.")]),
]
tw += beg

# beginner-intermediate +7
bi = [
    L("le-again", "beginner-intermediate", "了 — change of state", "了", "了 marks a new situation or completed change.", [{"p": "了 at end can mean something changed: 我餓了 I am hungry now (wasn't before).", "examples": [ex("我{餓}了。", "ㄨㄛˇ ㄜˋ ㄌㄜ˙ · Wǒ è le.", "I am hungry now.")]}], [d("I am hungry now (change).", "", "我餓了", ["我是餓", "我餓是", "我餓很"], "了 change."), d("了 can mark…", "", "new situation", ["only plural", "only topic", "only passive"], "Change."), d("Completed action 了 often…", "", "after verb", ["before subject", "replaces 很", "only in questions"], "Aspect."), d("我懂了 means…", "", "I understand now", ["I will understand", "I don't understand", "I understood yesterday only"], "Change of state."), d("了 vs 過…", "", "了 = change/done; 過 = ever", ["same", "opposite always", "only Taiwan"], "Aspect pair.")]),
    L("zhe-progressive", "beginner-intermediate", "在 — progressive", "在", "在 + verb = -ing: 在看", [{"p": "<b>在</b> before verb: 我在寫報告 I am writing a report.", "examples": [ex("我在{寫}報告。", "ㄨㄛˇ ㄗㄞˋ ㄒㄧㄝˇ ㄅㄠˋ ㄍㄠˋ · Wǒ zài xiě bàogào.", "I am writing a report.")]}], [d("I am writing a report.", "", "我在寫報告", ["我寫在報告", "我是寫報告", "我寫了報告 now"], "在 + V."), d("在 + verb = …", "", "-ing (progressive)", ["past", "future", "passive"], "Progressive."), d("我在聽音樂 means…", "", "I am listening to music", ["I listened", "I will listen", "music listens"], "Progressive."), d("Not progressive:", "", "我寫完報告", ["我在寫", "在寫", "寫著"], "Completed 完."), d("Taiwan 在 progressive…", "", "same as Mandarin", ["never used", "only written", "only 過"], "Shared grammar.")]),
    L("guo-experience", "beginner-intermediate", "過 — ever did", "過", "Verb + 過: have ever done.", [{"p": "去過 have been (there); 吃過 have eaten before.", "examples": [ex("我去{過}台北。", "ㄨㄛˇ ㄑㄩˋ ㄍㄨㄛˋ ㄊㄞˊ ㄅ�eiˇ · Wǒ qùguò Táiběi.", "I have been to Taipei.")]}], [d("I have been to Taipei.", "", "我去過台北", ["我過去台北", "我去台北過", "我台北去過是"], "V + 過."), d("吃過 means…", "", "have eaten before", ["eating now", "will eat", "never eat"], "Experience."), d("Negate experience…", "", "沒(去)過", ["不過", "沒去", "沒有去"], "沒…過."), d("過 vs 了…", "", "過 = ever; 了 = done/change", ["identical", "only Taiwan", "only written"], "Aspect."), d("See 過 in…", "", "我去過", ["過我去", "我過是", "過去我"], "After verb.")]),
    L("bijiao-bi", "beginner-intermediate", "比 — compare (review)", "比", "A 比 B + adj: A is more … than B.", [{"p": "台灣的夏天比英國熱。Use 更 for even more in some contexts.", "examples": [ex("這個{比}那個大。", "ㄓㄜˋ ㄍㄜ˙ ㄅㄧˇ ㄋㄚˋ ㄍㄜ˙ ㄉㄚˋ · Zhège bǐ nàge dà.", "This is bigger than that.")]}], [d("This is bigger than that.", "", "這個比那個大", ["這個那個比大", "比這個那個大", "這個大比那個"], "A 比 B adj."), d("比 introduces…", "", "standard of comparison", ["time", "passive", "topic"], "Comparison."), d("我比他高 means…", "", "I am taller than him", ["he is taller", "same height", "I am him"], "A 比 B."), d("更 can…", "", "even more", ["replace 比 always", "only past", "only question"], "更 stronger."), d("Comparison adj needs…", "", "no 很 before adj in 比 sentence", ["always 很", "always 是", "always 了"], "比 rule.")]),
    L("yixia-quick", "beginner-intermediate", "一下 — briefly", "一下", "Verb + 一下 do something briefly.", [{"p": "看一下 take a look; 等一下 wait a moment.", "examples": [ex("請{等}一下。", "ㄑㄧㄥˇ ㄉㄥˇ ㄧˊ ㄒㄧ�aˋ · Qǐng děng yíxià.", "Please wait a moment.")]}], [d("Please wait a moment.", "", "請等一下", ["請等下", "請一下等", "等請一下"], "一下 moment."), d("看一下 means…", "", "take a quick look", ["look forever", "don't look", "looked yesterday"], "Brief."), d("一下 follows…", "", "verb", ["only noun", "only adj", "only subject"], "V + 一下."), d("等一下 common in…", "", "Taiwan speech", ["only news", "only classical", "never spoken"], "Colloquial."), d("一下 nuance…", "", "short duration", ["completed", "passive", "comparison"], "Brief action.")]),
    L("hai-ye", "beginner-intermediate", "還 / 也 — still, also", "還・也", "還 still; 也 also (review).", [{"p": "他還在 he is still here; 我也去 I am going too.", "examples": [ex("我{也}要。", "ㄨㄛˇ ㄧㄝˇ ㄧㄠˋ · Wǒ yě yào.", "I want it too.")]}], [d("I want it too.", "", "我也要", ["我还要 only still", "我更要", "也我要"], "也 also."), d("還在 means…", "", "still here / still doing", ["already gone", "never", "also"], "還 still."), d("他還在工作 means…", "", "He is still working", ["He also works", "He never works", "He worked"], "還 progressive."), d("也 placement…", "", "before verb/adj", ["after verb always", "sentence end only", "only written"], "也 position."), d("還 vs 也…", "", "還 = still; 也 = also", ["same", "opposite always", "only Taiwan"], "Particles.")]),
    L("keyi-review", "beginner-intermediate", "可以 — permission/ability", "可以", "可以 can / may.", [{"p": "這裡可以拍照 You may take photos here. 我不可以 I cannot.", "examples": [ex("我{可以}進去嗎？", "ㄨㄛˇ ㄎㄜˇ ㄧˇ ㄐㄧㄣˋ ㄑㄩˋ ㄇㄚ˙? · Wǒ kěyǐ jìnqù ma?", "May I go in?")]}], [d("May I go in?", "", "我可以進去嗎？", ["我可以進去", "我進去可以嗎", "我可以嗎進去"], "可以 question."), d("可以 marks…", "", "permission or ability", ["only past", "only passive", "only topic"], "Modal."), d("不可以 means…", "", "may not / cannot", ["please", "already", "also"], "Negation."), d("這裡可以坐 means…", "", "You may sit here", ["You must sit", "You sat", "Sit!"], "Permission."), d("可以 vs 會…", "", "可以 = may/can; 會 = learned skill/will", ["identical", "only Taiwan", "only written"], "Modals.")]),
]
tw += bi

# intermediate +7
inter = [
    L("yinwei-suoyi", "intermediate", "因為…所以 — because", "因為・所以", "Cause and result.", [{"p": "因為…所以… because … therefore …", "examples": [ex("{因為}下雨，{所以}我沒去。", "ㄧ�n ㄨ�eiˋ ㄒㄧㄚˋ ㄩˇ, ㄙㄨㄛˇ ㄧˇ ㄨㄛˇ ㄇ�eiˊ ㄑㄩˋ · Yīnwei xiàyǔ, suǒyǐ wǒ méi qù.", "Because it rained, I didn't go.")]}], [d("Because it rained, I didn't go.", "", "因為下雨，所以我沒去", ["所以下雨，因為我沒去", "因為所以下雨沒去", "下雨因為沒去"], "因為…所以."), d("因為 introduces…", "", "reason", ["result only", "time only", "topic"], "Cause."), d("所以 introduces…", "", "result", ["reason", "question", "passive"], "Result."), d("Can omit 所以 in speech…", "", "sometimes", ["never", "always both required written only", "only Taiwan"], "Spoken drop."), d("Pair order…", "", "因為 before 所以", ["所以 before 因為", "random", "only one allowed"], "Order.")]),
    L("suiran-danshi", "intermediate", "雖然…但是 — although", "雖然・但是", "Contrast clauses.", [{"p": "雖然…但是… although … still …", "examples": [ex("{雖然}貴，{但是}很好。", "ㄙㄨㄟˊ ㄖㄢˊ ㄍㄨˋˋ, ㄉ�anˋ ㄕˋ ㄏㄣˇ ㄏㄠˇ · Suīrán guì, dànshì hěn hǎo.", "Although expensive, (it's) very good.")]}], [d("Although expensive, very good.", "", "雖然貴，但是很好", ["但是貴，雖然很好", "雖然但是貴很好", "貴雖然很好但是"], "雖然…但是."), d("雖然 marks…", "", "concession", ["result", "time", "passive"], "Although."), d("但是 marks…", "", "contrast main clause", ["reason", "question", "measure"], "But."), d("Spoken short…", "", "可是 / 但", ["只有", "被", "將"], "Variants."), d("Register…", "", "spoken and writing", ["only news", "only classical", "never Taiwan"], "General.")]),
    L("ruguo-jiu", "intermediate", "如果…就 — if…then", "如果・就", "Condition.", [{"p": "如果…就… if … then …", "examples": [ex("{如果}下雨，{就}不去。", "ㄖㄨˊ ㄍㄨㄛˇ ㄒㄧㄚˋ ㄩˇ, ㄐㄧㄡˋ ㄅㄨˋ ㄑㄩˋ · Rúguǒ xiàyǔ, jiù bù qù.", "If it rains, (I) won't go.")]}], [d("If it rains, won't go.", "", "如果下雨，就不去", ["就如果下雨不去", "如果不去下雨", "下雨如果就不去"], "如果…就."), d("如果 = …", "", "if", ["because", "although", "when completed"], "Condition."), d("就 after condition…", "", "then / emphasis", ["never", "only past", "only passive"], "Result."), d("如果 can replace…", "", "要是 in speech", ["只有", "被", "將 only"], "Synonym speech."), d("就 also marks…", "", "already / emphasis (other uses)", ["only if", "only plural", "only 的"], "Polysemy.")]),
    L("ba-review", "intermediate", "把 — disposal (review)", "把", "把 + obj + verb: handle the object.", [{"p": "我把影片看完了 I finished watching the video (Taiwan 影片).", "examples": [ex("我{把}門關了。", "ㄨㄛˇ ㄅㄚˇ ㄇㄣˊ ㄍㄨㄢ¯ ㄌㄜ˙ · Wǒ bǎ mén guān le.", "I closed the door.")]}], [d("I closed the door.", "", "我把門關了", ["我門把關了", "把關我門了", "我關把門了"], "把 disposal."), d("把 marks…", "", "known object handled", ["subject", "time", "passive agent"], "Object raised."), d("我把影片看完了 uses Taiwan word…", "", "影片", ["視頻", "地鐵", "軟件"], "影片 video."), d("Without 把 often…", "", "我關門了 still OK", ["impossible", "only passive", "only question"], "Alternate."), d("把 word order…", "", "把 + obj + verb", ["verb + 把 + subj", "obj + 把 + verb", "random"], "SOV disposal.")]),
    L("bei-spoken", "intermediate", "被 — passive in speech", "被", "Introduce passive with 被.", [{"p": "杯子被我打破了 The cup was broken by me (spoken passive). News uses more 被 too.", "examples": [ex("他{被}雨淋濕了。", "ㄊㄚ ㄅㄟˋ ㄩˇ ㄌㄧ�nˊ ㄕ¯ ㄌㄜ˙ · Tā bèi yǔ línshī le.", "He got soaked by the rain.")]}], [d("He got soaked by rain.", "", "他被雨淋濕了", ["他淋被雨濕了", "雨被他淋濕了", "他雨被淋了"], "被 passive."), d("被 marks…", "", "passive / affected", ["topic", "only future", "only question"], "Passive."), d("杯子被我…", "", "cup affected by me", ["cup did me", "only news", "never spoken"], "Agent optional."), d("Spoken vs news 被…", "", "both use, news more", ["Taiwan never", "only classical", "only 把"], "Register freq."), d("Negative passive…", "", "沒被…", ["不被 only rare", "被不", "被沒"], "沒被.")]),
    L("lian-ye", "intermediate", "連…都 — even", "連", "连 even emphasis.", [{"p": "連他都會 even he can; 連這個都不知道 don't even know this.", "examples": [ex("{連}小孩都懂。", "ㄌㄧanˊ ㄒㄧㄠˇ ㄏㄞˊ ㄉㄡ¯ ㄉㄨ�ngˇ · Lián xiǎohái dǒng.", "Even kids understand.")]}], [d("Even kids understand.", "", "連小孩都懂", ["小孩連都懂", "都連小孩懂", "連都小孩懂"], "連…都."), d("連 emphasizes…", "", "even / inclusive extreme", ["only past", "only question", "only passive"], "Even."), d("都 after 連…", "", "also/even pair", ["never", "only 也", "only 就"], "都."), d("連這個都不知道 means…", "", "don't even know this", ["know everything", "only kids know", "this knows you"], "Emphasis."), d("Register…", "", "spoken + writing", ["only classical", "only mainland", "never Taiwan"], "General.")]),
    L("bucuo-hen", "intermediate", "挺 / 蠻 — fairly", "挺・蠻", "Taiwan colloquial degree words.", [{"p": "台灣口語常用 <b>挺</b>、<b>蠻</b> instead of mainland 挺/很 alone: 蠻好的 pretty good.", "examples": [ex("這個{蠻}好的。", "ㄓㄜˋ ㄍㄜ˙ ㄇ�anˊ ㄏㄠˇ ㄉㄜ˙ · Zhège mǎn hǎo de.", "This is pretty good.")]}], [d("This is pretty good (TW).", "", "這個蠻好的", ["這個是蠻好", "這個好蠻的", "這個很好蠻"], "蠻 degree."), d("蠻/挺 replace…", "", "some 很 in speech", ["always 是", "never adjectives", "only past"], "Colloquial degree."), d("蠻好的 means…", "", "pretty good", ["bad", "too good", "not good"], "Positive."), d("Taiwan colloquial…", "", "蠻 common", ["never in Taiwan", "only news", "only classical"], "Spoken TW."), d("Written news prefers…", "", "很 / 十分", ["蠻 headline", "啦 headline", "齁 headline"], "Register.")]),
]
tw += inter

# advanced-intermediate +8
ai_specs = [
    ("news-lead", "News lead — 據…", "據", "Lead with 據 according to.", "據報導… according to reports.", "據", "according to", ["because", "although", "if"]),
    ("formal-yu", "於 — in/on (written)", "於", "Written 於 for time/place.", "於今… as of today (formal).", "於", "written preposition", ["在 only wrong", "被", "把"]),
    ("jiang-future", "將 — future (written)", "將", "將 will (formal/written).", "政府將公布…", "將", "future written", ["了", "過", "嘛"]),
    ("yijing-perfect", "已經 — already", "已經", "Already in news and speech.", "已經完成 completed already.", "已經", "already", ["還", "就", "才"]),
    ("youyu-because-formal", "由於 — due to", "由於", "Formal because.", "由於颱風… due to typhoon.", "由於", "due to (formal)", ["所以", "但是", "如果"]),
    ("zhiyu-as-for", "至於 — as for", "至於", "Topic shift in writing.", "至於細節… as for details.", "至於", "as for", ["因為", "雖然", "如果"]),
    ("genju-according", "根據 — according to", "根據", "According to rules/data.", "根據規定…", "根據", "according to", ["據 alone wrong meaning", "被", "把"]),
    ("bei-formal", "被 — formal passive", "被", "Long 被 sentences in news.", "措施被通過 passed (passive).", "被", "passive", ["把", "的", "是"]),
]
for id_, title, particle, summary, p, dq, ans, wrong in ai_specs:
    tw.append(
        L(
            id_,
            "advanced-intermediate",
            f"{title}",
            particle,
            summary,
            [{"p": p, "examples": [ex("{" + particle + "}…", "… · …", "formal/written example")]}],
            [
                d(dq, "", ans, wrong, f"{particle} in this lesson."),
                d("Register is…", "", "news / formal writing", ["baby talk", "only questions", "only pinyin"], "Written style."),
                d("Taiwan news uses traditional characters.", "", "True", ["False", "Simplified only", "No Chinese"], "Traditional."),
                d("Spoken particle 齁 belongs…", "", "casual speech, not this lesson", ["headlines", "passive only", "measure words"], "Register."),
                d("Pair with reporting verb often…", "", "表示/指出/認為 (other lessons)", ["only 了", "only 吗", "only 把"], "News lexicon."),
            ],
        )
    )

# advanced +8
adv_specs = [
    ("la-particle", "啦 — soft assertion", "啦", "Sentence-final 啦.", "好啦 OK then.", "啦", "sentence-final 啦", ["喔 only", "被", "將"]),
    ("ou-particle", "喔 — realization", "喔", "喔 I see / right.", "原来是這樣喔。", "喔", "realization particle", ["啦 only", "被", "的"]),
    ("ma-sentence", "嘛 — obvious", "嘛", "嘛 as you know.", "就是這樣嘛。", "嘛", "obvious 嘛", ["吗 question", "被", "將"]),
    ("de-de-di", "的/得/地 drill", "的・得・地", "Three de in writing.", "說得清楚 speak clearly.", "得", "complement 得", ["的 possessive", "地 only", "是"]),
    ("quality-pinzi", "品質 / 資訊", "品質", "Taiwan lexicon in formal text.", "提升品質 raise quality.", "品質", "quality (TW)", ["质量 mainland", "視頻", "地鐵"]),
    ("software-ruanti", "軟體 / 資訊", "軟體", "Software and info words.", "下載軟體 download software.", "軟體", "software TW", ["软件", "視頻", "出租车"]),
    ("huayu-name", "華語 / 國語", "華語", "Name of the language in Taiwan.", "華語教學 Chinese teaching.", "華語", "language name", ["普通话 only", "粤语", "英语"]),
    ("register-mix", "Register mix-up traps", "register", "Avoid mainland-only in TW context.", "Use 影片 not 视频 in Taiwan.", "影片", "video TW", ["视频", "软件", "地铁"]),
]
for id_, title, particle, summary, p, dq, ans, wrong in adv_specs:
    tw.append(
        L(
            id_,
            "advanced",
            title,
            particle,
            summary,
            [{"p": p, "examples": [ex("台灣用{影片}。", "… · …", "Taiwan word for video.")]}],
            [
                d(dq, "", ans, wrong, "Taiwan vocabulary/register."),
                d("News style 將/被/表示 belongs…", "", "writing", ["only 啦", "only 吗", "only greetings"], "Formal."),
                d("Speech particles 啦/喔/齁 belong…", "", "conversation", ["headlines", "legal only", "measure only"], "Spoken."),
                d("Traditional characters in Taiwan…", "", "standard", ["simplified standard", "latin only", "no characters"], "Script."),
                d("Zhuyin in these lessons…", "", "shown with pinyin", ["replaces hanzi", "mainland only", "never used"], "Pedagogy."),
            ],
        )
    )

Path(ROOT / "tw_lessons_all.json").write_text(json.dumps(tw, ensure_ascii=False, indent=2), encoding="utf-8")
print("tw additions", len(tw))
