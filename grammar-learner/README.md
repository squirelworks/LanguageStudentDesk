# Grammar Learner

Short lessons with examples, then a drill that explains every answer. Open with `?lang=<id>`.

- **Japanese** (`languages/japanese/grammar.js`): seventeen lessons. Twelve on particles (は, が, は vs が, を, に, へ, で, と, も, の, から/まで, and the sentence endings か/よ/ね), then です, polite verbs with ます, the past with ました, い and な adjectives, and requests with てください.
- **Klingon** (`languages/klingon/grammar.js`): ten lessons. Five on verb prefixes (verb shape and word order, prefixes with no object, the full subject/object grid, the bare verb, and commands), with drills generated from the prefix grid so they differ every time. Then -be'/-laH/-'a', plural nouns, possessives, -Daq/-vo'/-vaD, and “to be” with pronouns. Examples can be shown in pIqaD.

- **Korean** (`languages/hangul/grammar.js`): six lessons — 은/는, 이/가, 을/를, 에 and 에서, the polite -아요/-어요 present, and 이에요/예요.
- **Arabic** (`languages/arabic/grammar.js`): six lessons — ال and sun letters, gender and agreement, sentences without “is”, هذا/هذه, possessive endings, and في/على/من/إلى. Arabic lines pick their own right-to-left direction.
- **Russian** (`languages/cyrillic/grammar.js`): six lessons — это and the missing “is”, noun gender, the present tense, the accusative -у/-ю, в/на with -е, and plurals.
- **Hindi** (`languages/hindi/grammar.js`): six lessons — हूँ/है/हो/हैं, word order and questions, gender, में/पर/से/को, का/की/के, and the habitual present.
- **Chinese** (`languages/chinese/grammar.js`): six lessons — 是, adjectives with 很, 不 and 没, questions with 吗, 的, and measure words.
- **Latin** (`languages/latin/grammar.js`): six lessons — sum/es/est, the present tense endings, subject and object, plurals, adjectives that agree, and prepositions with the accusative and ablative.

The Language Learner's Korean, Arabic, Russian and Hindi paths have a “First sentences” stage that ticks off from these lessons.

A lesson is passed at 80%. Mixed review draws questions from every lesson you have practised.
Progress is stored in `localStorage` under `lsd-grammar-v1`, which the Language Learner reads.

Grammar Learner holds UI and logic only. Each course lives in its language's folder as `languages/<id>/grammar.js`. To add a language, write that file in the same shape (`window.GRAMMAR.<id> = { title, intro, lessons }`) and list it under `data.grammar` in the language's `meta.json`, then run `python3 languages/build_registry.py`. The learner finds it on its own.
