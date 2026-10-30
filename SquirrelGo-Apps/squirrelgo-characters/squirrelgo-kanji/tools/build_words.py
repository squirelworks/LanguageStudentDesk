#!/usr/bin/env python3
"""Build www/data/words.js: example words and one example sentence for every
Jōyō kanji in www/data/kanji.js.

Inputs are the JSON releases of jmdict-simplified
(https://github.com/scriptin/jmdict-simplified/releases):

  jmdict-eng-common-<v>.json     JMdict common words (EDRDG, CC BY-SA 4.0)
  jmdict-examples-eng-<v>.json   JMdict with its Tatoeba example sentences
                                 (sentences: Tatoeba, CC BY 2.0 FR)

Words are picked so a learner can read them: every kanji in the word must be
Jōyō, and words whose kanji are all at the target kanji's JLPT level or
easier come first. Among those, words that turn up more often in the Tatoeba
sentences win (a verb or adjective is counted by its stem, 食べ for 食べる). The sentence is the shortest Tatoeba example attached to one of
the chosen words whose kanji are no harder than the target's level, when
there is one.

Needs node (to read kanji.js). The output is committed; CI does not run this.

    python3 tools/build_words.py jmdict-eng-common.json jmdict-examples-eng.json
"""
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
WWW = os.path.join(HERE, "..", "www")
WORDS_PER_KANJI = 4
# Written forms whose JMdict reading here is the rare one: 出来 is listed as
# しゅったい, while learners meet it as でき in 出来る, which JMdict files
# under kana.
SKIP = {"出来"}
LEVEL_RANK = {"N5": 5, "N4": 4, "N3": 3, "N2": 2, "N1": 1}


def load_kanji():
    js = (
        "global.window=global;"
        "eval(require('fs').readFileSync(process.argv[1],'utf8'));"
        "process.stdout.write(JSON.stringify(SCRIPTS.kanji.chars))"
    )
    out = subprocess.run(["node", "-e", js, os.path.join(WWW, "data", "kanji.js")], check=True, capture_output=True)
    return {c["char"]: c for c in json.loads(out.stdout)}


def is_kanji(ch):
    return "一" <= ch <= "鿿" or ch == "々"


def gloss(sense):
    parts = [re.sub(r"\s*\([^)]*\)", "", g["text"]).strip() for g in sense["gloss"] if g["lang"] == "eng"]
    parts = [p for p in parts if p]
    out = []
    for p in parts:
        if len("; ".join(out + [p])) > 40 and out:
            break
        out.append(p)
    return "; ".join(out)


# The kana a one-kanji verb or adjective stem can be followed by when it
# inflects, so 見る is counted in 見た and 見ない too.
ROWS = {"う": "わいうえおっ", "く": "かきくけこい", "ぐ": "がぎぐげごい", "す": "さしすせそ", "つ": "たちつてとっ",
        "ぬ": "なにぬねのん", "ぶ": "ばびぶべぼん", "む": "まみむめもん", "る": "らりるれろっ"}
ICHIDAN = "るたてなまよれらさず"
ADJ_I = "いくかさけす"


def stem(word, pos):
    """The parts of a word that stay the same when it inflects: 食べる -> 食べ.
    Only verbs and i-adjectives inflect; other words are counted whole. A
    stem of a lone kanji (見る -> 見) would also match the kanji everywhere, so
    it is paired with each kana that can follow it instead."""
    verb = any(p.startswith("v") and p not in ("vs", "vs-c") for p in pos)
    adj = "adj-i" in pos
    if not (verb or adj) or len(word) < 2 or not ("\u3041" <= word[-1] <= "\u309f"):
        return (word,)
    base = word[:-1]
    if len(base) > 1:
        return (base,)
    if adj:
        follow = ADJ_I
    elif any(p.startswith("v1") for p in pos):
        follow = ICHIDAN
    else:
        follow = ROWS.get(word[-1], word[-1])
    return tuple(base + k for k in follow)


def corpus_counts(sentences, stems):
    """How many Tatoeba sentences use each stem. At each place in a sentence
    only the longest stem that fits is counted, so 山 standing alone is not
    also counted inside 火山 or 富士山, and 高い is not counted as 高."""
    count = dict.fromkeys(stems, 0)
    for jp in sentences:
        found = set()
        i = 0
        while i < len(jp):
            hit = next((jp[i : i + n] for n in (4, 3, 2, 1) if jp[i : i + n] in count), None)
            if hit and not (len(hit) == 1 and is_kanji(jp[i - 1 : i] or "a")) and not (
                len(hit) == 1 and is_kanji(jp[i + 1 : i + 2] or "a")
            ):
                found.add(hit)
            i += len(hit) if hit else 1
        for sub in found:
            count[sub] += 1
    return count


def main(common_path, examples_path):
    kanji = load_kanji()
    rank = {c: LEVEL_RANK.get(k.get("level"), 1) for c, k in kanji.items()}
    freq = {c: int(k.get("frequency") or 2500) for c, k in kanji.items()}

    def difficulty(word):
        ks = [ch for ch in word if is_kanji(ch) and ch != "々"]
        if not ks or any(ch not in kanji for ch in ks):
            return None
        return min(rank[ch] for ch in ks), sum(freq[ch] for ch in ks) / len(ks)

    common = json.load(open(common_path, encoding="utf-8"))["words"]
    candidates = {c: [] for c in kanji}
    for w in common:
        if not w["kanji"] or not w["sense"]:
            continue
        for k in w["kanji"]:
            text = k["text"]
            if text in SKIP or not k["common"] or "iK" in k["tags"] or "rK" in k["tags"] or "sK" in k["tags"] or len(text) > 4:
                continue
            d = difficulty(text)
            if not d:
                continue
            kana = next(
                (r["text"] for r in w["kana"] if r["common"] and ("*" in r["appliesToKanji"] or text in r["appliesToKanji"])),
                None,
            )
            sense = next((s for s in w["sense"] if "*" in s["appliesToKanji"] or text in s["appliesToKanji"]), None)
            if not kana or not sense or "uk" in sense["misc"]:
                continue
            # A lone kanji is also listed as a suffix or prefix (人 as -じん);
            # the free-standing word teaches more.
            if all(p in ("suf", "pref", "ctr") for p in sense["partOfSpeech"]):
                continue
            g = gloss(sense)
            if not g:
                continue
            for ch in set(text):
                if ch in candidates:
                    candidates[ch].append((text, kana, g, w["id"], d, stem(text, sense["partOfSpeech"])))
            break  # one written form per entry

    examples_words = json.load(open(examples_path, encoding="utf-8"))["words"]
    # A written form can belong to several entries (入る is はいる and いる,
    # 方 is かた and ほう). The entry with more Tatoeba examples is the more
    # common reading, so it sorts first among words written the same way.
    n_examples = {w["id"]: sum(len(s.get("examples") or []) for s in w["sense"]) for w in examples_words}
    sentences = {
        x["text"]
        for w in examples_words
        for s in w["sense"]
        for ex in s.get("examples") or []
        for x in ex["sentences"]
        if x["lang"] == "jpn"
    }
    uses = corpus_counts(sentences, {x for items in candidates.values() for t in items for x in t[5]})
    used = lambda t: sum(uses[x] for x in t[5])

    picked = {}
    for ch, items in candidates.items():
        level = rank[ch]
        seen = set()
        items.sort(key=lambda t: (t[4][0] < level, -used(t), t[5] == (t[0],), len(t[0]), -n_examples.get(t[3], 0), t[4][1]))
        out = []
        for t in items:
            # One word per stem: 上げる, not also the noun 上げ.
            if t[0] in seen or t[5] in seen:
                continue
            seen.update((t[0], t[5]))
            out.append(t)
            if len(out) == WORDS_PER_KANJI:
                break
        picked[ch] = out

    # Sentences: index the examples of the chosen words by JMdict id.
    want = {t[3] for items in picked.values() for t in items}
    examples = {}
    for w in examples_words:
        if w["id"] not in want:
            continue
        for s in w["sense"]:
            for ex in s.get("examples") or []:
                jp = next((x["text"] for x in ex["sentences"] if x["lang"] == "jpn"), None)
                en = next((x["text"] for x in ex["sentences"] if x["lang"] == "eng"), None)
                if jp and en and ex["source"]["type"] == "tatoeba":
                    examples.setdefault(w["id"], []).append((jp, en, ex["source"]["value"]))

    words_out, sentences_out = {}, {}
    for ch in kanji:
        items = picked[ch]
        if items:
            words_out[ch] = [[t[0], t[1], t[2]] for t in items]
        best = None
        for t in items:
            for jp, en, sid in examples.get(t[3], []):
                if ch not in jp or len(jp) > 32:
                    continue
                d = difficulty(jp) if any(is_kanji(c) for c in jp) else (5, 0)
                if not d:
                    continue
                key = (d[0] < rank[ch], len(jp))
                if best is None or key < best[0]:
                    best = (key, [jp, en, sid])
        if best:
            sentences_out[ch] = best[1]

    path = os.path.join(WWW, "data", "words.js")
    with open(path, "w", encoding="utf-8") as f:
        f.write(
            "// Example words and sentences for each kanji, made by tools/build_words.py.\n"
            "// Words: JMdict (EDRDG, CC BY-SA 4.0). Sentences: Tatoeba (CC BY 2.0 FR),\n"
            "// as linked from JMdict; the third field is the Tatoeba sentence number.\n"
            "// Each word is [written, reading, meaning].\n"
        )
        f.write("window.KANJI_WORDS = {\n")
        f.write(",\n".join(f"  {json.dumps(c, ensure_ascii=False)}: {json.dumps(v, ensure_ascii=False)}" for c, v in words_out.items()))
        f.write("\n};\nwindow.KANJI_SENTENCES = {\n")
        f.write(",\n".join(f"  {json.dumps(c, ensure_ascii=False)}: {json.dumps(v, ensure_ascii=False)}" for c, v in sentences_out.items()))
        f.write("\n};\n")
    print(f"{len(words_out)} kanji with words, {len(sentences_out)} with a sentence -> {os.path.relpath(path)}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
