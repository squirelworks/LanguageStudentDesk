#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def d(q, en, ans, wrong, why):
    return {"q": q, "en": en, "options": [ans] + list(wrong), "answer": ans, "why": why}


def L(id, level, title, particle, summary, sections, drills):
    return {
        "id": id,
        "level": level,
        "title": title,
        "particle": particle,
        "summary": summary,
        "sections": sections,
        "drills": drills,
    }


ko = json.loads((ROOT / "ko_lessons_p1.json").read_text(encoding="utf-8"))

# beginner-intermediate +6
ko += [
    L(
        "juseyo-request",
        "beginner-intermediate",
        "-아/어 주세요 — please do for me",
        "-아/어 주세요",
        "Ask someone to do something for you politely.",
        [
            {
                "p": "Stem + <b>-아/어 주세요</b> asks a favor: 앉아 주세요 means please sit. The same vowel rule as -아요/-어요.",
                "examples": [
                    ["앉{아} 주세요.", "Anja juseyo.", "Please sit."],
                    ["기다려 {주세요}.", "Gidaryeo juseyo.", "Please wait."],
                ],
            }
        ],
        [
            d("Please sit: 앉＿ 주세요.", "", "아", ["어", "해", "요"], "Stem 앉 has ㅏ."),
            d("기다려 주세요 means…", "", "Please wait.", ["I wait.", "Please give.", "Waited."], "주세요 is please do."),
            d("Please open", "", "열어 주세요", ["열 주세요", "열아 주세요", "열해 주세요"], "열다 → 열어 주세요."),
            d("-아/어 주세요 attaches to…", "", "verb stem", ["noun only", "past", "question"], "Stem + 주세요."),
            d("Polite favor ending…", "", "-아/어 주세요", ["-고 싶어요", "-을 거예요", "-지 않아요"], "Request pattern."),
        ],
    ),
    L(
        "te-form-intro",
        "beginner-intermediate",
        "-아/어서 — and so / because (spoken)",
        "-아/어서",
        "Spoken reason and sequence; same vowel rule as -아요.",
        [
            {
                "p": "<b>-아서 / -어서</b> links clauses in speech. Tense goes on the final verb only.",
                "examples": [
                    ["배가 고파{서} 먹었어요.", "Baega gopaseo meogeosseoyo.", "I was hungry, so I ate."],
                    ["피곤{해서} 일찍 잤어요.", "Pigophaeseo iljjik jasseoyo.", "I was tired, so I slept early."],
                ],
            }
        ],
        [
            d("Because I'm tired: 피곤＿.", "", "해서", ["고", "지만", "면"], "하다 → 해서."),
            d("배가 고파서 means…", "", "because (I) was hungry", ["although hungry", "before hungry", "if hungry"], "Reason."),
            d("Because it rained", "", "비가 와서", ["비가 와고", "비가 왔지만", "비가 오면"], "오다 → 와서."),
            d("Tense usually sits on…", "", "the last verb", ["both verbs", "first only", "neither"], "One tense at end."),
            d("Spoken because ending…", "", "-아/어서", ["-(으)며", "-(으)므로", "-고"], "Spoken causal."),
        ],
    ),
    L(
        "comparison-de",
        "beginner-intermediate",
        "더 — more",
        "더",
        "Put 더 before an adjective for comparison.",
        [
            {
                "p": "<b>더</b> before an adjective means more. A보다 marks the standard in comparisons.",
                "examples": [
                    ["{더} 비싸요.", "Deo bissayo.", "It is more expensive."],
                    ["서울이 부산{보다} 커요.", "Seoul-i Busan-boda keoyo.", "Seoul is bigger than Busan."],
                ],
            }
        ],
        [
            d("More expensive: ＿ 비싸요.", "", "더", ["만", "도", "는"], "더 = more."),
            d("서울이 부산보다 커요 means…", "", "Seoul is bigger than Busan.", ["Busan is bigger.", "Same size.", "Seoul is Busan."], "보다 comparison."),
            d("Which uses 보다?", "", "comparison", ["only past", "only future", "only questions"], "A보다 B."),
            d("더 sits…", "", "before the adjective", ["after verb", "sentence end", "after object"], "더 + adjective."),
            d("더 커요 means…", "", "It is bigger.", ["Only big.", "Less big.", "Was big."], "더 is more."),
        ],
    ),
    L(
        "permission",
        "beginner-intermediate",
        "-아/어도 돼요 — may I?",
        "-아/어도 돼요",
        "Asking and giving permission.",
        [
            {
                "p": "<b>-아/어도 돼요?</b> asks permission. <b>안 돼요</b> is not allowed.",
                "examples": [
                    ["앉{아}도 돼요?", "Anjado dwaeyo?", "May I sit?"],
                    ["여기서 담배 피우{면} 안 돼요.", "Yeogiseo dambae piumyeon an dwaeyo.", "You must not smoke here."],
                ],
            }
        ],
        [
            d("May I sit?", "", "앉아도 돼요?", ["앉아 주세요?", "앉고 싶어요?", "앉았어요?"], "Permission question."),
            d("안 돼요 means…", "", "not allowed", ["please do", "thank you", "hello"], "Not OK."),
            d("Forbids smoking here", "", "피우면 안 돼요", ["피워도 돼요", "피우고 싶어요", "피웠어요"], "Conditional + 안 돼요."),
            d("Permission ending…", "", "-아/어도 돼요", ["-고 싶어요", "-을 거예요", "-고 있어요"], "May I pattern."),
            d("Yes, you may sit", "", "네, 앉아도 돼요.", ["아니요, 앉아도 돼요.", "네, 안 돼요.", "앉아 주세요."], "Affirm permission."),
        ],
    ),
    L(
        "sequential-geondae",
        "beginner-intermediate",
        "그런데 / 그리고 — by the way, and",
        "그런데",
        "Link sentences in conversation.",
        [
            {
                "p": "<b>그리고</b> adds another fact. <b>그런데</b> changes topic or adds contrast.",
                "examples": [
                    ["밥을 먹었어요. {그리고} 커피를 마셨어요.", "Babeul meogeosseoyo. Geurigo keopi-reul masyeosseoyo.", "I ate and drank coffee."],
                    ["{그런데} 시간이 없어요.", "Geureonde sigan-i eopseoyo.", "But there is no time."],
                ],
            }
        ],
        [
            d("Adds another fact", "", "그리고", ["그런데", "하지만", "그래서"], "And also."),
            d("그런데 often…", "", "changes topic or contrasts", ["only means and", "ends sentence", "marks past"], "BTW / but."),
            d("I ate and drank coffee", "", "그리고", ["그런데", "그러면", "그래서"], "Sequence."),
            d("But there is no time", "", "그런데 시간이 없어요", ["그리고 …", "그래서 …", "그러면 …"], "Contrast."),
            d("Spoken and then…", "", "그리고", ["-(으)며", "-고", "-지만"], "Discourse word."),
        ],
    ),
    L(
        "try-eoboda",
        "beginner-intermediate",
        "-아/어 보다 — try doing",
        "-아/어 보다",
        "Try an action to see what it is like.",
        [
            {
                "p": "Stem + <b>-아/어 보다</b> tries something. Past: 먹어 봤어요 I tried eating.",
                "examples": [
                    ["한번 먹{어} 보세요.", "Hanbeon meogeo boseyo.", "Try eating it once."],
                    ["한국어를 배워 {봤어요}.", "Hangugeo-reul baewo bwasseoyo.", "I tried learning Korean."],
                ],
            }
        ],
        [
            d("Try eating once: 한번 먹＿ 보세요.", "", "어", ["아", "고", "서"], "먹다 → 먹어 보세요."),
            d("먹어 보세요 means…", "", "Please try eating.", ["I ate.", "Don't eat.", "Eating now."], "Try (polite)."),
            d("I tried learning", "", "배워 봤어요", ["will learn", "hate learning", "learning now"], "Past try."),
            d("Try doing pattern", "", "-아/어 보다", ["-고 싶다", "-고 있다", "-을 거다"], "Experience try."),
            d("Often pairs with…", "", "한번 (once)", ["only past", "only future", "never"], "Common collocation."),
        ],
    ),
]

# intermediate +8 — abbreviated titles, same quality
int_lessons = [
    ("indirect-quote", "indirect-quote", "-다고 — reported speech", "-다고", "Report what someone said.", "민수가 온{다고} 했어요.", "They said he is coming.", "다고", ["라고", "고", "면"], "Statement quote."),
    ("before-jeon", "before-jeon", "-기 전에 — before", "-기 전에", "Before an action.", "먹{기 전에}", "before eating", "기 전에", ["고 나서", "면", "서"], "Stem + 기 전에."),
    ("after-naseo", "after-naseo", "-고 나서 — after", "-고 나서", "After finishing.", "먹{고 나서}", "after eating", "고 나서", ["기 전에", "면", "서"], "After completion."),
    ("while-neurado", "while-neurado", "-는데 — background", "-는데", "Background in speech.", "비가 오{는데}", "it is raining and…", "는데", ["고", "면", "서"], "Background."),
    ("durak-eo", "durak-eo", "-니까 — because", "-니까", "Reason you assume shared.", "바쁘{니까}", "because busy", "니까", ["고", "면", "서"], "Reason."),
    ("more-myeon", "more-myeon", "-면 — if/when", "-면", "Condition.", "시간이 있{으면}", "if there is time", "으면", ["면 wrong", "니까", "서"], "Conditional."),
    ("verb-noun", "verb-noun", "-기 — nominalizer", "-기", "Verb as noun phrase.", "{먹기}", "eating", "먹기", ["먹어", "먹고", "먹은"], "Stem + 기."),
    ("passive-ish", "passive-ish", "Passive partners", "-이/히", "열리다 / 보이다 pairs.", "문이 {열렸어요}", "door opened", "문이 열렸어요", ["문을 열렸어요", "문이 열었어요", "문을 열어요"], "Passive partner."),
]
for lid, id_, title, particle, summary, ex_ko, ex_en, ans, wrong, why in int_lessons:
    ko.append(
        L(
            id_,
            "intermediate",
            title,
            particle,
            summary,
            [{"p": f"Pattern in context: <b>{particle}</b>. Example: {ex_ko}.", "examples": [[ex_ko.replace("{", "").replace("}", ""), "…", ex_en]]}],
            [d(f"Fill: {ex_ko.replace('{', '＿').replace('}', '')}", "", ans, wrong, why)]
            + [
                d("Pattern level", "", "intermediate", ["absolute-beginner", "advanced only", "honorific only"], "Mid-level connector."),
                d("Example meaning", "", ex_en, ["opposite", "future only", "noun only"], "Sense of example."),
                d("Korean puts…", "", "verb last", ["verb first", "topic first always", "object last only"], "SOV."),
                d("Particle/end focus", "", particle.split()[0], ["-요 only", "English -ing", "none"], "Lesson focus."),
            ],
        )
    )

# advanced-intermediate +9 and advanced +9 with fuller drills for honorific/written
ai = [
    L("honorific-gyesip", "advanced-intermediate", "-(으)시- honorific", "-(으)시-", "Respected subject in verb.", [{"p": "Use <b>-(으)시-</b> for elder/subject honorific: 오{세요}.", "examples": [["선생님이 오{셨어요}.", "Osyeosseoyo.", "The teacher came."]]}], [d("Teacher comes", "", "오세요", ["와요", "오고", "오니까"], "Honorific."), d("Never on yourself", "", "저는 가세요 (wrong)", ["선생님이 가세요", "할머니가 드세요", "사장님이 오세요"], "Wrong for self."), d("Marks", "", "respected subject", ["object", "location", "yourself"], "Subject honorific."), d("Consonant stem", "", "-(으)시-", ["always -시-", "-세요 only", "-ㅂ니다 only"], "Batchim rule."), d("오셨어요", "", "respected came", ["I came", "will come", "please come"], "Honorific past.")]),
    L("honorific-jusim", "advanced-intermediate", "주시다", "주시다", "Honorific giving.", [{"p": "<b>주시다</b> honorific of 주다.", "examples": [["선생님이 책을 {주셨어요}.", "Jusyeosseoyo.", "Teacher gave."]]}], [d("Teacher gave", "", "주셨어요", ["줬어요", "주세요", "주고"], "Honorific give."), d("도와 주세요", "", "Please help (polite)", ["I help you", "He helped", "Don't help"], "Polite favor."), d("Replaces", "", "주다 for respected giver", ["먹다", "가다", "있다"], "Give."), d("Giver", "", "teacher/elder", ["yourself", "child only", "object"], "Agent."), d("Object marker", "", "을/를", ["만", "도", "에서"], "Book object.")]),
    L("honorific-drinks", "advanced-intermediate", "드시다", "드시다", "Honorific eat/drink.", [{"p": "<b>드시다</b> replaces 먹다 for elders.", "examples": [["할아버지가 밥을 {드세요}.", "Deuseyo.", "Grandfather eats."]]}], [d("Grandfather eats", "", "드세요", ["먹어요", "드리세요", "잡수세요"], "Honorific eat."), d("Replaces", "", "먹다 for elder subject", ["마시다 always", "하다", "가다"], "Eat."), d("Subject", "", "할머니", ["제가", "너", "친구"], "Elder."), d("Formal meal verb", "", "잡수시다", ["casual", "past only", "written only"], "Formal."), d("I eat plain", "", "먹어요", ["드세요", "잡수세요", "주세요"], "Plain self.")]),
    L("humble-bojigi", "advanced-intermediate", "드리다 / 여쭙다", "드리다", "Humble to elders.", [{"p": "<b>드리다</b> humble give; <b>여쭙다</b> humble ask.", "examples": [["선생님께 {드렸어요}.", "Deuryeosseoyo.", "I gave (humble)."]]}], [d("I gave humble", "", "드렸어요", ["줬어요", "주셨어요", "드세요"], "Humble."), d("May I ask humble", "", "여쭤봐도 될까요?", ["Answer me.", "I told you.", "Don't ask."], "Humble question."), d("Direction", "", "toward respected person", ["from teacher", "objects only", "past only"], "To elder."), d("Humble verb", "", "드리다", ["주다 to elder about self", "먹다 for elder", "가다 for elder"], "Humble."), d("To teacher giving", "", "드리다", ["주시다", "받다", "드시다"], "Speaker humble.")]),
    L("nim-title", "advanced-intermediate", "-님 title", "님", "Respect on names/roles.", [{"p": "<b>-님</b> after roles: 선생님, 사장님.", "examples": [["{선생님}, 질문 있어요.", "Seonsaengnim…", "Teacher, a question."]]}], [d("Respectful teacher", "", "선생님", ["선생", "선생들", "선생이"], "님."), d("Attaches to", "", "name or role", ["verbs", "particles", "yourself"], "Title."), d("Polite address", "", "어머님", ["엄마 to stranger", "너", " 야"], "Formal."), d("사장님", "", "boss (polite)", ["employee", "student", "child"], "Role."), d("Never", "", "저님", ["선생님", "사장님", "할머님"], "No self honorific.")]),
    L("kke-respect", "advanced-intermediate", "께 / 께서", "께", "Honorific particles.", [{"p": "<b>께</b> to person; <b>께서</b> subject honorific.", "examples": [["선생님{께} {드렸어요}.", "…", "To teacher (humble give)."]]}], [d("To teacher particle", "", "께", ["에게", "한테", "에서"], "Honorific to."), d("께서 is", "", "honorific subject", ["object", "topic only", "past only"], "Subject."), d("선생님께 드렸어요", "", "humble give + 께", ["주셨어요", "먹었어요", "가세요"], "Combo."), d("Honorific subject marker", "", "께서", ["이", "가", "은"], "Replaces 이/가."), d("Friend plain", "", "한테", ["께", "께서", "님께서 only"], "Plain.")]),
    L("malssum", "advanced-intermediate", "말씀", "말씀", "Honorific speech word.", [{"p": "<b>말씀</b> for respected speech.", "examples": [["{말씀}해 주세요.", "Malssumhae juseyo.", "Please tell me."]]}], [d("Teacher spoke", "", "말씀하셨어요", ["말했어요", "말해요", "말씀드렸어요"], "Honorific."), d("말씀하세요", "", "Please speak (respect)", ["I speak", "Don't speak", "plain"], "Request."), d("Replaces", "", "말 for respected speech", ["물", "책", "학교"], "Speech noun."), d("Your story", "", "말했어요", ["말씀하셨어요", "드세요", "주세요"], "Plain self."), d("Please tell me", "", "말씀해 주세요", ["말해 주세요 to CEO", "말씀하세요", "말했어요"], "Polite.")]),
    L("age-respect", "advanced-intermediate", "연세 / 성함", "연세", "Formal questions.", [{"p": "Ask age with <b>연세</b>, name with <b>성함</b>.", "examples": [["{연세}가 어떻게 되세요?", "…", "May I ask your age?"]]}], [d("Formal age", "", "연세", ["나이 to CEO rude", "몇 살 to CEO", "번호"], "Formal."), d("성함 is", "", "honorific name", ["age", "job", "address"], "Name."), d("To CEO name", "", "성함이 어떻게 되세요?", ["이름이 뭐야?", "너 누구?", "몇 살?"], "Formal."), d("연세 replaces", "", "나이 in formal speech", ["물", "시", "집"], "Age word."), d("어떻게 되세요", "", "formal copula question", ["only past", "commands", "slang"], "Formula.")]),
    L("business-greet", "advanced-intermediate", "Business phrases", "처음 뵙겠습니다", "First meeting formal.", [{"p": "<b>처음 뵙겠습니다</b>; <b>잘 부탁드립니다</b>.", "examples": [["{처음 뵙겠습니다}.", "…", "Nice to meet you (formal)."]]}], [d("First meeting formal", "", "처음 뵙겠습니다", ["안녕 only", "잘 가", "반가워"], "Business."), d("잘 부탁드립니다", "", "starting cooperation", ["ending", "coffee order", "goodbye"], "Work together."), d("뵙겠습니다", "", "humble meet/see", ["plain 보다", "먹다", "가다"], "Humble."), d("Cooperation phrase", "", "잘 부탁드립니다", ["잘 자", "맛있게", "안녕히"], "Business."), d("Register", "", "formal honorific", ["slang", "only news", "only kids"], "Formal.")]),
]
ko += ai

adv = [
    L("plain-declare", "advanced", "Plain -(ㄴ)다", "-(ㄴ)다", "Written blunt statement.", [{"p": "Plain present <b>-ㄴ다/-는다</b>.", "examples": [["비가 온{다}.", "Onda.", "It rains."]]}], [d("It rains plain", "", "비가 온다", ["비가 와요", "비가 옵니다", "비가 와서"], "Plain."), d("읽는다", "", "consonant stem", ["vowel only", "noun", "past"], "Consonant."), d("Appears in", "", "news and writing", ["only baby talk", "only honorific", "only questions"], "Written."), d("Everyday polite", "", "-아/어요", ["-(ㄴ)다", "-ㅂ니다", "-시-"], "Contrast."), d("온다", "", "plain present", ["past", "future", "honorific"], "Present plain.")]),
    L("formal-nida", "advanced", "Formal -ㅂ니다", "-ㅂ니다", "Announcements.", [{"p": "Formal <b>-ㅂ니다/-습니다</b>.", "examples": [["학교에 {갑니다}.", "Gamnida.", "I go (formal)."]]}], [d("Formal go", "", "갑니다", ["가요", "간다", "가세요"], "Formal."), d("-습니다", "", "consonant stem", ["vowel only", "past only", "nouns"], "Consonant."), d("Formal question", "", "-ㅂ니까 / -습니까", ["-요?", "-다?", "-니?"], "Question."), d("Station announcement", "", "-ㅂ니다", ["-ㅋㅋ", "-야", "-네"], "Public."), d("드십니까", "", "formal honorific eat Q", ["plain", "past only", "written only"], "Formal honorific.")]),
    L("passive-written", "advanced", "Passive -되다", "-되다", "News passives.", [{"p": "News uses <b>-되다</b> passives.", "examples": [["안건이 {통과}됐다.", "Tonggwadoetda.", "Bill passed."]]}], [d("Bill passed", "", "통과됐다", ["통과했다 active", "통과하다", "통과니까"], "Passive."), d("발표됐다", "", "was announced", ["announced actively", "will announce", "don't announce"], "Passive news."), d("Passive helper", "", "되다", ["하다 only", "있다", "싶다"], "되다."), d("Active announce", "", "발표했다", ["발표됐다", "발표되다", "발표니까"], "Active."), d("News prefers", "", "plain past -됐다", ["-어요", "-ㅋ", "-세요"], "Written plain.")]),
    L("headline-style", "advanced", "Headline omissions", "headline", "Telegraphic titles.", [{"p": "Headlines drop particles.", "examples": [["정부, {새} 정책 발표", "…", "Government announces new policy."]]}], [d("Headlines omit", "", "particles", ["all verbs", "all nouns", "subjects"], "Drop particles."), d("정부, 새 정책 발표", "", "gov announces policy", ["question", "spoken only", "past only"], "Telegraphic."), d("Looks like headline", "", "비, 전국 강수", ["비가 전국에 강수합니다.", "비 와요", "비니까"], "Comma style."), d("Full sentence adds", "", "particles and endings", ["English", "honorific only", "slang"], "Grammar."), d("Register", "", "written news", ["casual chat", "baby talk", "honorific speech"], "News.")]),
    L("formal-contrast-ya", "advanced", "바로 / 즉", "바로", "Formal emphasis.", [{"p": "<b>바로</b> precisely; <b>즉</b> that is.", "examples": [["{바로} 그 지점이다.", "…", "That is the point."]]}], [d("Precisely that point", "", "바로 그 지점", ["그냥", "아주", "조금"], "바로."), d("즉 means", "", "that is / i.e.", ["because", "but", "if"], "Defines."), d("Formal emphasis", "", "바로", ["slang ya", "ㅋ", "음"], "News."), d("Copula ending", "", "plain -이다", ["-예요", "-ㅂ니다 only", "-네"], "Plain."), d("Restate connector", "", "즉", ["그런데", "그리고", "그래서"], "i.e.")]),
    L("editorial-we", "advanced", "Editorial judgment", "것으로 보인다", "Cautious stance.", [{"p": "<b>…것으로 보인다</b>; <b>…알려졌다</b>.", "examples": [["원인은 {실수}로 보인다.", "…", "Cause appears to be error."]]}], [d("Appears error", "", "실수로 보인다", ["실수다 only", "실수요", "실수니까"], "Tentative."), d("알려졌다", "", "was reported", ["I know", "definitely", "never"], "Reported."), d("Cautious judgment", "", "-(으)로 보인다", ["-고 싶다", "-ㅋ", "-야"], "Appears."), d("알려졌다 structure", "", "reported to be", ["command", "question", "honorific only"], "Indirect."), d("Tone", "", "plain written", ["casual", "emoji", "spoken only"], "News.")]),
    L("relative-clause", "advanced", "Relative -(으)ㄴ / -는", "-(으)ㄴ", "Modify nouns.", [{"p": "Modifiers before nouns: <b>읽는 책</b>.", "examples": [["{읽는} 책", "Ingneun chaek", "book being read"]]}], [d("Book being read", "", "읽는 책", ["읽기 책", "읽고 책", "읽어 책"], "Relative -는."), d("좋은 날", "", "adjective -(으)ㄴ", ["-는 only", "-기", "-고"], "Adjective mod."), d("Modifier position", "", "before noun", ["after verb", "end", "speech only"], "Pre-noun."), d("읽는", "", "present modifier", ["past", "future", "nominalizer"], "Modifier."), d("Full sentence", "", "verb last", ["noun last", "modifier last", "particle first"], "SOV.")]),
    L("formal-because-muro", "advanced", "Formal -(으)므로", "-(으)므로", "Official notices.", [{"p": "Notices use <b>-(으)므로</b>.", "examples": [["이용이 제한되므로 양해 바랍니다.", "…", "Use restricted, please understand."]]}], [d("Formal because", "", "-(으)므로", ["-아서 only", "-니까 only", "-고"], "Written reason."), d("양해 바랍니다", "", "please understand (formal)", ["hello", "goodbye", "thanks"], "Formal."), d("Notice style", "", "plain + formal endings", ["-ㅋ", "-야", "-네 only"], "Official."), d("제한되므로", "", "because restricted", ["if use", "although", "after"], "Reason."), d("Casual because", "", "-아/어서", ["-(으)므로 in chat", "-ㅂ니다", "-다니까 always"], "Speech vs notice.")]),
    L("written-quote-da", "advanced", "Plain quoting -다고", "-다고", "Written reports.", [{"p": "Plain reports use <b>-다고</b> with plain matrix.", "examples": [["정부는 정책을 발표{한다고} 밝혔다.", "…", "Gov said it will announce."]]}], [d("Gov said announce", "", "한다고", ["해요", "하세요", "하니까"], "Plain quote."), d("Matrix verb", "", "plain past 밝혔다", ["-어요", "-ㅂ니다", "-시-"], "Written."), d("Quote marker", "", "-다고", ["-라고 only always", "-고 only", "-면"], "Indirect."), d("Register pair", "", "plain + plain", ["해요 + plain", "honorific mix", "slang"], "News."), d("Lesson focus", "", "written reporting", ["spoken only", "Hangul only", "numbers"], "Advanced writing.")]),
]
ko += adv

out = ROOT / "ko_lessons_all.json"
out.write_text(json.dumps(ko, ensure_ascii=False, indent=2), encoding="utf-8")
print("total ko lessons in json", len(ko))
