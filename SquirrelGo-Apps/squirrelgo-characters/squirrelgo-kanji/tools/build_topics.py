#!/usr/bin/env python3
"""Rebuild the topic lists in www/data/catalog.json and catalog.js.

A kanji joins a topic when one of its first KANJIDIC2 meanings (EDRDG,
CC BY-SA 4.0) matches the topic's keywords as a whole word, plus the kanji
listed under "add" and minus those under "drop". Each topic is sorted by
JLPT level (N5 first) and then by frequency, so quizzes start easy.

Only "topics" and "stats" change; the lessons, levels and N5 packets in the
catalog are kept. Character Learner reads the same catalog.js.

    python3 tools/build_topics.py kanjidic2-en.json
"""
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "www", "data")
LEVEL_RANK = {"N5": 0, "N4": 1, "N3": 2, "N2": 3, "N1": 4}
MEANINGS = 1  # only the main meaning is matched; the rest add too much noise

TOPICS = {
    "Numbers": {
        "words": r"one|two|three|four|five|six|seven|eight|nine|ten|hundred|thousand|ten thousand|hundred million|trillion|zero|number|count|half|counter|times|fraction|double|several",
        "add": "数番第号億兆壱弐倍個枚冊匹",
    },
    "Time": {
        "words": r"time|day|days|night|morning|evening|noon|week|month|year|years|hour|minute|second|spring|summer|autumn|fall|winter|season|early|late|past|future|now|today|yesterday|tomorrow|era|age|period|daybreak|dusk|old times|sunday|weekday|ancient|soon|formerly|interval",
        "add": "曜旬昔暦",
        "drop": "日月火水木金土秒落泉",
    },
    "Location": {
        "words": r"up|above|down|below|under|left|right|front|before|behind|back|after|inside|outside|middle|center|centre|east|west|north|south|near|far|side|place|direction|top|bottom|edge|corner|area|region|beside|between|interior|surface|exterior|location|position|vicinity|neighborhood|border|boundary",
        "add": "所辺奥隣",
        "drop": "後",
    },
    "People": {
        "words": r"person|people|man|woman|child|children|boy|girl|father|mother|older brother|younger brother|older sister|elder sister|younger sister|husband|wife|parent|friend|guest|master|teacher|doctor|king|queen|prince|princess|baby|grandchild|descendant|ancestor|companion|fellow|human|elder|youth|samurai|gentleman|lady|daughter|son|relative|family|spouse|myself|he|she|they|me|i|you|self|official|merchant|servant|slave|priest|monk|sir|crowd|citizen|people's",
        "add": "族僕彼君俺",
    },
    "Body": {
        "words": r"body|head|face|eye|eyes|ear|nose|mouth|tooth|teeth|tongue|lip|neck|throat|shoulder|arm|hand|finger|nail|leg|foot|feet|knee|chest|breast|belly|abdomen|stomach|back|hip|waist|skin|hair|bone|blood|heart|brain|lung|liver|kidney|intestines|muscle|sinew|flesh|eyebrow|cheek|jaw|chin|navel|womb|organ|sweat|tears|breath|pulse|spine|thigh|buttocks|fist|palm|limb",
        "add": "体身頭顔首肩腕腰腹胸背骨歯舌喉臓肌脳",
        "drop": "奥裏呂穂",
    },
    "Family": {
        "words": r"father|mother|older brother|younger brother|older sister|elder sister|younger sister|husband|wife|parent|grandchild|descendant|ancestor|family|marriage|married|relative|household|son|daughter|spouse|kin|sibling",
        "add": "家族親祖孫婚嫁妻夫兄弟姉妹父母子娘息",
    },
    "Food": {
        "words": r"food|eat|meal|rice|cooked rice|drink|tea|wine|sake|alcohol|meat|fish|egg|vegetable|vegetables|fruit|bean|beans|salt|sugar|sweet|bitter|sour|spicy|hot water|soup|cake|confectionery|noodles|bread|flavor|taste|boil|cook|roast|grill|bake|wheat|barley|millet|oil|tasty|delicious|chopsticks|bowl|pot|cup|sauce|vinegar|honey|rice cake|bake|roast|feast|starve|hunger|swallow",
        "add": "飯酒茶肉魚卵米味菓麦豆塩糖鍋皿杯箸餅",
        "drop": "湧",
    },
    "Nature": {
        "words": r"mountain|river|sea|ocean|lake|pond|island|forest|grove|woods|field|plain|valley|stone|rock|sand|soil|earth|sky|sun|moon|star|cloud|rain|snow|wind|thunder|lightning|ice|frost|dew|fog|mist|wave|beach|shore|coast|spring|fountain|cave|hill|slope|peak|cliff|nature|weather|storm|typhoon|flame|fire|water|light|shine|shade|shadow|heaven|world|universe|swamp|marsh|harbor|bay|gulf",
        "add": "山川海湖池島森林野谷石岩砂土空日月星雲雨雪風雷氷霧波浜岸泉洞丘坂峠崖然天",
        "drop": "界港阜",
    },
    "Weather": {
        "words": r"weather|rain|snow|wind|cloud|cloudy|thunder|lightning|storm|typhoon|frost|dew|fog|mist|hail|clear up|fine weather|sunny|hot|cold|cool|warm|humid|dry|temperature|climate|ice",
        "add": "晴曇雨雪風雲雷霜露霧暑寒涼暖温湿乾嵐虹",
        "drop": "干",
    },
    "Water": {
        "words": r"water|sea|ocean|river|lake|pond|swamp|marsh|flow|stream|wave|wash|bathe|swim|wet|moist|pour|drop|drip|soak|sink|float|sail|ferry|harbor|bay|gulf|shore|beach|tide|current|flood|spring|fountain|liquid|juice|tears|sweat|ice|steam|bubble|foam",
        "add": "水海川湖池沼泳洗流波浜港湾潮滝泉汗涙湯氷油液",
    },
    "Plants": {
        "words": r"plant|tree|trees|flower|blossom|grass|leaf|leaves|bamboo|pine|cherry|plum|peach|chestnut|seed|seedling|root|branch|stem|bud|bloom|grow|grain|rice plant|wheat|barley|bean|beans|vegetable|vegetables|fruit|forest|grove|woods|herb|moss|lumber|timber|wood|willow|cedar|chrysanthemum|lotus|reed|ivy|pear|orange|tea|cultivate",
        "add": "木林森花草葉竹松桜梅桃栗種根枝芽苗稲麦豆菜果樹植茶実",
        "drop": "支",
    },
    "Animals": {
        "words": r"animal|animals|beast|dog|cat|horse|cow|cattle|ox|pig|sheep|goat|bird|chicken|rooster|fowl|fish|insect|bug|worm|snake|dragon|tiger|bear|deer|monkey|rabbit|mouse|rat|elephant|turtle|tortoise|crane|swallow|duck|crow|hawk|eagle|shellfish|shell|feather|wing|tail|horn|fang|claw|nest|egg|livestock|raise|domestic|hunt|crab|shrimp|whale|butterfly|silkworm|bee|frog|wolf|fox|fur|hide",
        "add": "犬猫馬牛豚羊鳥鶏魚虫蛇竜虎熊鹿猿兎象亀鶴燕鴨蚊蜂羽翼尾角牙巣卵畜飼獣貝鯨蝶蚕",
        "drop": "挙揚匿",
    },
    "Colors": {
        "words": r"color|colour|red|blue|green|yellow|white|black|purple|crimson|scarlet|indigo|navy blue|dark blue|deep red|brown|vermilion|ash|gray|grey|dye|paint|ink|gold|silver|vivid|colored",
        "add": "色赤青緑黄白黒紫紅藍紺朱灰墨彩染",
    },
    "Buildings": {
        "words": r"house|home|building|room|hall|shop|store|station|school|temple|shrine|castle|palace|tower|gate|door|window|wall|roof|floor|stairs|storey|story|bridge|warehouse|storehouse|inn|lodging|hut|cottage|mansion|residence|dormitory|hospital|library|office|garden|yard|fence|pillar|beam|tile|hotel|theater|theatre|prison|factory|mill|museum|pavilion|tomb",
        "add": "家屋室店駅校寺宮城塔門戸窓壁階橋倉庫宿館院庭柱棟瓦宅邸寮堂",
        "drop": "曹",
    },
    "Transport": {
        "words": r"car|vehicle|wheel|train|ship|boat|vessel|sail|ferry|port|harbor|road|street|way|path|route|rail|station|airport|fly|flight|ride|board|transport|carry|traffic|passenger|freight|bicycle|cart|drive|journey|travel|trip|voyage|tunnel|crossing",
        "add": "車電鉄駅道路線便船舟港航飛乗降運転輸輪旅渡橋",
        "drop": "丁",
    },
    "Movement": {
        "words": r"go|come|walk|run|go out|come out|enter|leave|exit|return|arrive|reach|pass|pass through|cross|advance|retreat|move|stop|turn|rise|ascend|climb|descend|fall|fly|jump|leap|follow|chase|pursue|escape|flee|hurry|send|carry|transport|swim|wander|stroll|approach|visit|depart|proceed|fly|roll|shake|sway|crawl|ride|step",
        "add": "行来歩走出入帰着通過進退動止回昇登降落飛跳追逃急送運泳遊歩",
        "drop": "番碁挨遊",
    },
    "Actions": {
        "words": r"do|make|use|hold|have|take|give|receive|put|place|open|close|shut|push|pull|hit|strike|throw|catch|pick up|cut|break|fold|tie|bind|build|create|produce|repair|fix|wash|clean|hide|search|find|choose|select|collect|gather|lend|borrow|buy|sell|pay|change|exchange|help|save|protect|attack|defend|wait|meet|work|play|begin|start|end|finish|stop|continue|try|test|keep|throw away|discard|lose|win|defeat",
        "add": "作使持取与置開閉押引打投切折結建造直洗隠探選集貸借買売払替助救守攻待会働遊始終続試捨失勝負",
        "drop": "所末呉",
    },
    "Senses and speech": {
        "words": r"see|look|watch|view|hear|listen|smell|taste|touch|feel|sense|say|speak|talk|tell|call|shout|cry|sing|song|ask|question|answer|reply|read|write|word|words|language|story|discuss|explain|announce|report|chat|whisper|praise|scold|thank|greet|apologize|voice|sound|noise|echo|letter|character|name|poem|sentence|record|document|book|message|news",
        "add": "見視観聞聴嗅味触感言話語読書記説答問叫歌唱声音字名詩文誌報",
    },
    "Thinking and learning": {
        "words": r"think|thought|consider|know|knowledge|wisdom|learn|study|teach|education|school|lesson|remember|memory|forget|understand|idea|intention|meaning|reason|logic|theory|research|investigate|examine|experiment|plan|decide|judge|doubt|believe|belief|guess|suppose|recognize|compare|science|art|skill|technique|talent|wise|clever|stupid|foolish|memorize|imagine|dream|mind",
        "add": "思考知識学習教授覚忘解理論研究調査験計画定判疑信想認比科術技能賢愚夢意",
    },
    "Emotions": {
        "words": r"love|like|hate|dislike|happy|joy|glad|delight|pleasure|pleasant|fun|enjoy|sad|sorrow|grief|weep|cry|angry|anger|rage|fear|afraid|terror|frightened|dread|worry|anxiety|anxious|surprise|astonish|shame|ashamed|embarrass|jealous|envy|lonely|regret|resent|grudge|calm|peace|sigh|laugh|smile|pity|sympathy|longing|yearn|emotion|feeling|feelings|mood|spirit|passion|desire|hope|wish|despair|suffer|suffering|pain|agony|comfort|relief|bored",
        "add": "愛好嫌喜楽悲泣怒恐怖驚恥妬羨寂悔恨笑憂悩苦慰望願感情",
    },
    "Character traits": {
        "words": r"strong|weak|kind|gentle|honest|sincere|brave|bold|courage|coward|lazy|diligent|patient|patience|rude|polite|proud|humble|modest|stubborn|cruel|wise|foolish|clever|stupid|calm|mild|soft|severe|strict|stern|faithful|loyal|virtue|good|evil|wicked|bad|pure|innocent|noble|mean|quiet|lively|cheerful|generous|greedy|arrogant",
        "add": "強弱優柔厳誠勇怠慎礼謙頑堅忠徳善悪純賢愚静",
    },
    "Size, shape and quality": {
        "words": r"big|large|small|little|long|short|tall|high|low|wide|broad|narrow|thick|thin|fat|heavy|light|deep|shallow|round|circle|square|angle|corner|shape|form|straight|crooked|bent|flat|sharp|dull|hard|soft|new|old|young|fast|quick|slow|many|much|few|little|near|far|hot|cold|warm|cool|bright|dark|clean|dirty|beautiful|ugly|true|false|same|different|easy|difficult|cheap|expensive|rare|strange",
        "add": "大小長短高低広狭厚薄太細重軽深浅丸円角形直曲平鋭鈍硬柔新古若早速遅多少明暗美醜同異易難安",
    },
    "Clothing": {
        "words": r"clothes|clothing|garment|robe|dress|kimono|wear|put on|shoes|footwear|boots|hat|cap|collar|sleeve|skirt|trousers|pleated|sash|belt|band|cloth|fabric|silk|cotton|wool|linen|thread|yarn|sew|weave|knit|button|pocket|bag|sack|pattern|naked|undress|take off|towel|textile|lining|sole",
        "add": "服衣着履靴帽袖襟裾帯布絹綿糸縫織裸脱袋柄",
        "drop": "範",
    },
    "Materials and tools": {
        "words": r"metal|gold|silver|copper|iron|steel|lead|tin|stone|jewel|jade|gem|crystal|glass|paper|wood|lumber|timber|board|plank|bamboo|clay|pottery|porcelain|ceramics|lacquer|leather|oil|coal|charcoal|tool|instrument|machine|device|needle|knife|blade|sword|saw|hammer|nail|wire|rope|string|net|box|case|vessel|container|bottle|bucket|lamp|mirror|key|lock|brush|pen|ink|seal|stamp|bell|drum|umbrella",
        "add": "金銀銅鉄鋼鉛石玉宝紙板竹陶革油炭器具機械針刀剣釘線縄網箱瓶灯鏡鍵錠筆墨印鐘鼓傘",
        "drop": "搭樹",
    },
    "Money and business": {
        "words": r"money|coin|yen|price|cost|fee|pay|payment|buy|sell|trade|business|commerce|merchant|shop|store|market|company|firm|profit|gain|loss|debt|loan|lend|borrow|rent|tax|wage|salary|rich|wealth|poor|poverty|cheap|expensive|account|bank|budget|economy|finance|capital|invest|deposit|savings|purchase|goods|merchandise|wares|product|industry|work|labor|employment|employ|hire|bill|receipt|ticket",
        "add": "金円銭価値費料払買売貿商店社業利損債貸借賃税給富貧安経済資預貯購品産労働雇券札",
        "drop": "京畿",
    },
    "Government and society": {
        "words": r"country|nation|state|government|politics|political|law|rule|regulation|order|official|public|office|bureau|ministry|prefecture|province|district|ward|city|town|village|capital|king|emperor|empress|lord|minister|parliament|assembly|congress|vote|election|elect|citizen|people|society|social|tax|court|judge|trial|police|crime|punish|punishment|prison|right|duty|policy|system|constitution|treaty|union|league|alliance|organize|organization|association|committee|council|tradition|custom|history|era",
        "add": "国政府法律規則官公庁省県州郡区市町村都王皇帝臣議選民社会税裁判警罪罰獄権義策制憲約盟組委慣史",
        "drop": "右整",
    },
    "War and conflict": {
        "words": r"war|battle|fight|struggle|combat|army|troops|soldier|warrior|military|weapon|arms|sword|blade|spear|bow|arrow|gun|cannon|bullet|bomb|explode|attack|assault|invade|defend|defense|guard|protect|siege|fort|fortress|castle|victory|win|defeat|lose|surrender|kill|slay|murder|wound|injure|enemy|foe|rival|navy|warship|flag|banner|command|commander|general|rebel|revolt|riot|conquer|occupy|threat|threaten|violence|violent",
        "add": "戦争闘軍兵士武器剣刀槍弓矢銃砲弾爆攻撃襲侵防衛守城勝敗殺傷敵艦旗将乱征占脅暴",
        "drop": "総激器",
    },
    "Religion and belief": {
        "words": r"god|gods|deity|spirit|soul|ghost|demon|devil|buddha|buddhist|buddhism|shinto|shrine|temple|monk|nun|priest|pray|prayer|worship|festival|ritual|ceremony|sacred|holy|divine|heaven|hell|paradise|faith|believe|belief|religion|sect|doctrine|scripture|sutra|zen|bless|blessing|fortune|luck|curse|omen|oracle|miracle|sin|virtue|pilgrimage|offering|sacrifice|tomb|grave|funeral|mourning|ancestor",
        "add": "神仏寺宮社霊魂鬼僧尼祈拝祭儀聖天獄信宗教経禅福運祝呪罪徳詣供葬墓喪祖",
    },
    "Art and culture": {
        "words": r"art|arts|picture|painting|draw|drawing|paint|music|song|sing|tune|melody|play|perform|performance|dance|drama|theater|theatre|poem|poetry|verse|novel|story|tale|literature|write|writing|calligraphy|book|volume|letter|character|culture|craft|handicraft|sculpture|carve|engrave|photograph|film|movie|instrument|drum|flute|harp|lute|beauty|beautiful|elegant|style|fashion|decorate|ornament|game|sport|tea ceremony|flower arrangement",
        "add": "芸術絵画描写歌曲楽奏演舞劇詩文書筆字冊巻彫刻映写鼓笛琴美雅装飾技",
        "drop": "積履",
    },
    "Health and life": {
        "words": r"life|live|living|alive|birth|born|give birth|grow|growth|age|old age|die|death|dead|kill|corpse|health|healthy|sick|sickness|illness|disease|ill|pain|ache|wound|injury|injure|cure|heal|treat|treatment|medicine|drug|doctor|physician|hospital|nurse|poison|fever|cough|tired|fatigue|sleep|rest|breathe|breath|blood|body|exercise|eat|drink|bathe|bath|marriage|marry|funeral|grave",
        "add": "生活命誕産育老死亡殺健康病疾痛傷治療癒薬医院毒熱疲眠休息呼吸血体浴婚葬墓",
    },
}


def load_js(path, expr):
    js = (
        "global.window=global;"
        "eval(require('fs').readFileSync(process.argv[1],'utf8'));"
        f"process.stdout.write(JSON.stringify({expr}))"
    )
    return json.loads(subprocess.run(["node", "-e", js, path], check=True, capture_output=True).stdout)


def main(kanjidic_path):
    kanji = {c["char"]: c for c in load_js(os.path.join(DATA, "kanji.js"), "SCRIPTS.kanji.chars")}
    meanings = {}
    for c in json.load(open(kanjidic_path, encoding="utf-8"))["characters"]:
        if c["literal"] not in kanji:
            continue
        ms = [
            m["value"].lower()
            for g in (c.get("readingMeaning") or {}).get("groups", [])
            for m in g.get("meanings", [])
            if m["lang"] == "en"
        ]
        meanings[c["literal"]] = ms[:MEANINGS]

    def order(ch):
        k = kanji[ch]
        return LEVEL_RANK.get(k.get("level"), 4), int(k.get("frequency") or 9999)

    topics = {}
    for name, spec in TOPICS.items():
        pat = re.compile(rf"^(?:to )?(?:{spec['words']})$")
        chars = {ch for ch, ms in meanings.items() if any(pat.match(m) for m in ms)}
        chars |= {ch for ch in spec.get("add", "") if ch in kanji}
        chars -= set(spec.get("drop", ""))
        topics[name] = sorted(chars, key=order)

    with open(os.path.join(DATA, "catalog.json"), encoding="utf-8") as f:
        catalog = json.load(f)
    catalog["topics"] = topics
    catalog["stats"] = {name: len(chars) for name, chars in topics.items()}
    text = json.dumps(catalog, ensure_ascii=False, indent=2)
    with open(os.path.join(DATA, "catalog.json"), "w", encoding="utf-8") as f:
        f.write(text)
    with open(os.path.join(DATA, "catalog.js"), "w", encoding="utf-8") as f:
        f.write(f'var DESK_CATALOG = {text};\nif (typeof window !== "undefined") window.DESK_CATALOG = DESK_CATALOG;\n')
    for name, chars in topics.items():
        print(f"{name} ({len(chars)}): {''.join(chars)}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
