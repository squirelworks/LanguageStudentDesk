#!/usr/bin/env python3
"""Builds the Translation Learner's meaning network.

    python3 translation-learner/tools/build_network.py           # train from the committed word lists
    python3 translation-learner/tools/build_network.py --fetch   # download the word lists first

1. Word banks: the 1,000 most frequent words per language from Hermit Dave's
   FrequencyWords (OpenSubtitles 2018; 2016 for Hindi), CC BY-SA 4.0. They are
   cached in tools/wordlists/<lang>.txt so training needs no network.
2. A graph is built over meanings (data/matrix.js), English words, and words in
   each Desk language. Edges come from the matrix (meaning <-> its English, token
   <-> its meaning, meanings that share a sentence), the Vocabulary Learner decks
   (word <-> English gloss) and SquirrelGo Kanji (kanji <-> English meaning).
   Word bank words that look like a form of a known word (a Korean noun with
   a particle, a Russian ending, an Arabic article or pronoun suffix) are
   linked to that word.
3. A small neural network (skip-gram with negative sampling, as in word2vec,
   trained on random walks over the graph, as in DeepWalk) learns a vector for
   every node. Nodes with related meanings end up close together.
4. Output, all loaded by the page:
   data/network.js          node keys and int8 vectors (base64)
   data/wordbank/<lang>.js  each word bank with what the network knows of it
Training is seeded, so the same inputs give the same files.
"""
import base64
import json
import math
import os
import re
import subprocess
import sys
import urllib.request
from collections import defaultdict

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
TL = os.path.dirname(HERE)
LISTS = os.path.join(HERE, "wordlists")
DATA = os.path.join(TL, "data")

SOURCE = "https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/"
CREDIT = "Hermit Dave, FrequencyWords (from OpenSubtitles), CC BY-SA 4.0, https://github.com/hermitdave/FrequencyWords"
# Desk language id -> (FrequencyWords path, characters a real word is made of)
BANKS = {
    "japanese": ("2018/ja/ja_full.txt", r"[ぁ-ヿ一-鿿々ー]+"),
    "hangul": ("2018/ko/ko_50k.txt", r"[가-힣]+"),
    "chinese": ("2018/zh_cn/zh_cn_50k.txt", r"[一-鿿]+"),
    "cyrillic": ("2018/ru/ru_50k.txt", r"[а-яё]+(-[а-яё]+)?"),
    "hindi": ("2016/hi/hi_50k.txt", r"[ऀ-ॿ]+"),
    "arabic": ("2018/ar/ar_50k.txt", r"[ء-يً-ْ]+"),
}
TOP = 1000

# English words that carry no meaning of their own in a gloss.
STOP = set(
    "a an the to of is am are was were be been being do does did it its there "
    "and or for with in on at by from as that this one's someone something sb sth "
    "etc".split()
)

DIM = 24
WALKS = 12
WALK_LEN = 16
WINDOW = 4
NEG = 5
EPOCHS = 3
SEED = 20261030
CLOSE = 0.85


def fetch():
    os.makedirs(LISTS, exist_ok=True)
    for lang, (path, pattern) in BANKS.items():
        print("fetching", lang, path)
        with urllib.request.urlopen(SOURCE + path) as r:
            lines = r.read().decode("utf-8").splitlines()
        keep = []
        rx = re.compile("^" + pattern + "$")
        for line in lines:
            parts = line.split()
            if len(parts) != 2 or not rx.match(parts[0]):
                continue
            keep.append(parts[0] + "\t" + parts[1])
            if len(keep) == TOP:
                break
        with open(os.path.join(LISTS, lang + ".txt"), "w", encoding="utf-8") as f:
            f.write("# " + CREDIT + "\n# " + SOURCE + path + ", first " + str(TOP) + " entries that are words\n")
            f.write("\n".join(keep) + "\n")


def read_lists():
    banks = {}
    for lang in BANKS:
        p = os.path.join(LISTS, lang + ".txt")
        if not os.path.exists(p):
            sys.exit("missing " + p + ": run with --fetch once")
        rows = []
        with open(p, encoding="utf-8") as f:
            for line in f:
                if line.startswith("#") or not line.strip():
                    continue
                w, n = line.rstrip("\n").split("\t")
                rows.append((w, int(n)))
        banks[lang] = rows
    return banks


def english_words(gloss):
    gloss = re.sub(r"\([^)]*\)", " ", gloss.lower())
    out = []
    for part in re.split(r"[;,/]", gloss):
        words = [w.strip("'") for w in re.findall(r"[a-z']+", part)]
        words = [w for w in words if w and w not in STOP]
        if words:
            out.append(words)
    return out


class Graph:
    def __init__(self):
        self.ids = {}
        self.keys = []
        self.edges = defaultdict(float)

    def node(self, key):
        if key not in self.ids:
            self.ids[key] = len(self.keys)
            self.keys.append(key)
        return self.ids[key]

    def link(self, a, b, w):
        if a == b:
            return
        i, j = self.node(a), self.node(b)
        self.edges[(min(i, j), max(i, j))] += w


def bare(text):
    return re.sub(r"^-|-$", "", text)


KO_PARTICLES = ("이", "가", "은", "는", "을", "를", "에", "에서", "도", "의", "랑", "하고", "야", "요", "만", "한테", "로", "으로")
AR_PREFIXES = ("وال", "بال", "فال", "لل", "ال", "و", "ب", "ل", "ف")
AR_SUFFIXES = ("ها", "هم", "نا", "ه", "ي")
# Russian endings by kind of base word: verbs in -ть, adjectives in -ый/-ий/-ой,
# nouns in -а/-я, nouns ending in a consonant.
RU_VERB = ("ю", "у", "ешь", "ет", "ем", "ете", "ют", "ут", "ишь", "ит", "им", "ите", "ат", "ят", "л", "ла", "ло", "ли", "й", "йте", "и")
RU_ADJ = ("ая", "ое", "ые", "ого", "ому", "ым", "ую", "ой", "ей", "их", "ых", "ими", "ыми", "ее", "яя", "ие", "ий", "ый", "о")
RU_NOUN_A = ("у", "ю", "ы", "и", "е", "ой", "ей", "ам", "ям", "ах", "ях", "ами", "ями")
RU_NOUN = ("а", "у", "е", "ом", "ы", "и", "ов", "ей", "ам", "ах", "ами")


def form_of(lang, word, lexicon):
    """The lexicon word that word is most likely a form of, or None.

    Only patterns regular enough to trust: a Korean noun plus a particle or a
    verb stem plus an ending, Russian stems plus their own kind of ending, an
    Arabic word with an article, conjunction or pronoun attached.
    """
    if lang == "hangul":
        for base in lexicon:
            if len(base) >= 2 and word.startswith(base) and word[len(base):] in KO_PARTICLES:
                return base
            stem = base[:-1] if base.endswith("다") else ""
            if len(stem) >= 2 and word.startswith(stem) and len(word) - len(stem) <= 2:
                return base
    elif lang == "cyrillic":
        for base in lexicon:
            if " " in base or len(base) < 3:
                continue
            if base.endswith("ть"):
                stem, ends = base[:-2], RU_VERB
            elif base[-2:] in ("ый", "ий", "ой"):
                stem, ends = base[:-2], RU_ADJ
            elif base[-1] in "ая":
                stem, ends = base[:-1], RU_NOUN_A
            elif base[-1] not in "аеёиоуыэюяьй":
                stem, ends = base, RU_NOUN
            else:
                continue
            if len(stem) >= 3 and word.startswith(stem) and word[len(stem):] in ends and word != base:
                return base
    elif lang == "arabic":
        cands = {word}
        for p in AR_PREFIXES:
            if word.startswith(p):
                cands.add(word[len(p):])
        for c in list(cands):
            for x in AR_SUFFIXES:
                if c.endswith(x):
                    cands.add(c[: -len(x)])
        for c in cands:
            if c != word and len(c) >= 3 and c in lexicon:
                return c
    return None


def build_graph(src, banks):
    g = Graph()
    direct = defaultdict(dict)  # lang -> word -> English gloss (first sense)

    # Meanings and their English.
    for mid, raw in src["meanings"].items():
        m = re.match(r"^\((.*?)\)(.*)$", raw)
        alts = (m.group(2) if m else raw).split("|")
        for alt in alts:
            for words in english_words(alt):
                for w in words:
                    g.link("m:" + mid, "en:" + w, 3.0 / len(words))
    # Meanings that share a sentence are related, a little.
    for s in src["sentences"]:
        for i, a in enumerate(s["m"]):
            for b in s["m"][i + 1:]:
                g.link("m:" + a, "m:" + b, 0.3)
    # Tokens of each column point at their meanings.
    for lang, col in src["columns"].items():
        for r in col["r"].values():
            for text, reading, ids in r["t"]:
                key = lang + ":" + bare(text)
                for mid in ids.split("+"):
                    g.link(key, "m:" + mid, 3.0)
                    if not mid.startswith("@"):
                        direct[lang].setdefault(bare(text), src["meanings"][mid].split("|")[0])
    # Deck words and their English glosses; a gloss that is a meaning's
    # English also links the word to that meaning.
    alt_index = defaultdict(set)
    for mid, raw in src["meanings"].items():
        if not raw.startswith("("):
            for alt in raw.split("|"):
                alt_index[alt.lower()].add(mid)
    for lang, rows in src["decks"].items():
        for word, reading, english in rows:
            key = lang + ":" + word
            senses = english_words(english)
            for words in senses:
                for w in words:
                    g.link(key, "en:" + w, 2.0 / len(words))
            for part in re.split(r"[;,/]", re.sub(r"\([^)]*\)", "", english.lower())):
                for mid in alt_index.get(part.strip(), ()):
                    g.link(key, "m:" + mid, 2.0)
            if senses:
                direct[lang].setdefault(word, re.split(r"[;/]", re.sub(r"\([^)]*\)", "", english))[0].strip())
    # Kanji and their English meanings (Japanese).
    # Only the first sense: later senses ("lot" for 壌, soil) mostly add noise.
    for char, reading, info in src["kanji"]:
        for words in english_words(info)[:1]:
            for w in words:
                g.link("japanese:" + char, "en:" + w, 1.5 / len(words))
        if info:
            direct["japanese"].setdefault(char, info.split(";")[0].split(",")[0].strip())
    # Word bank words that look like a form of a word the graph knows
    # (a noun with a particle, a conjugated verb) lean on that word.
    forms = defaultdict(dict)
    for lang, rows in banks.items():
        lexicon = direct[lang]
        for word, _ in rows:
            if word in lexicon:
                continue
            base = form_of(lang, word, lexicon)
            if base:
                forms[lang][word] = base
                g.link(lang + ":" + word, lang + ":" + base, 1.0)
    return g, direct, forms


def train(g):
    rng = np.random.default_rng(SEED)
    n = len(g.keys)
    nbrs = [[] for _ in range(n)]
    wts = [[] for _ in range(n)]
    for (i, j), w in g.edges.items():
        nbrs[i].append(j)
        wts[i].append(w)
        nbrs[j].append(i)
        wts[j].append(w)
    cum = [np.cumsum(w) / sum(w) if w else None for w in wts]

    # Random walks: each step follows an edge with probability by weight.
    walks = []
    for _ in range(WALKS):
        for start in rng.permutation(n):
            if not nbrs[start]:
                continue
            walk = [start]
            for _ in range(WALK_LEN - 1):
                cur = walk[-1]
                walk.append(nbrs[cur][int(np.searchsorted(cum[cur], rng.random()))])
            walks.append(walk)
    # (centre, context) pairs inside the window.
    pairs = []
    for walk in walks:
        for i, c in enumerate(walk):
            for j in range(max(0, i - WINDOW), min(len(walk), i + WINDOW + 1)):
                if j != i and walk[j] != c:
                    pairs.append((c, walk[j]))
    pairs = np.array(pairs, dtype=np.int64)
    counts = np.bincount(pairs[:, 1], minlength=n).astype(np.float64) ** 0.75
    noise = counts / counts.sum()
    print("graph:", n, "nodes,", len(g.edges), "edges;", len(pairs), "training pairs")

    # Skip-gram with negative sampling: one hidden layer of DIM units.
    w_in = (rng.random((n, DIM)) - 0.5) / DIM
    w_out = np.zeros((n, DIM))
    batch = 2048
    steps = EPOCHS * math.ceil(len(pairs) / batch)
    step = 0
    for epoch in range(EPOCHS):
        order = rng.permutation(len(pairs))
        for b in range(0, len(pairs), batch):
            lr = 0.05 * max(0.0001, 1 - step / steps)
            step += 1
            idx = order[b : b + batch]
            c, o = pairs[idx, 0], pairs[idx, 1]
            neg = rng.choice(n, size=(len(idx), NEG), p=noise)
            targets = np.concatenate([o[:, None], neg], axis=1)
            labels = np.zeros(targets.shape)
            labels[:, 0] = 1
            vc = w_in[c]
            vo = w_out[targets]
            score = 1 / (1 + np.exp(-np.einsum("bd,bkd->bk", vc, vo)))
            grad = (labels - score) * lr
            np.add.at(w_out, targets, grad[:, :, None] * vc[:, None, :])
            np.add.at(w_in, c, np.einsum("bk,bkd->bd", grad, vo))
        print("epoch", epoch + 1, "done")
    v = w_in / np.maximum(np.linalg.norm(w_in, axis=1, keepdims=True), 1e-9)
    return v


def main():
    if "--fetch" in sys.argv:
        fetch()
    banks = read_lists()
    src = json.loads(subprocess.check_output(["node", os.path.join(HERE, "export_sources.js")]))
    g, direct, forms = build_graph(src, banks)
    v = train(g)

    # How similar a learner's word must be to a meaning to count as close.
    # Related meanings in the same sentences sit well above chance (tea and
    # coffee about 0.7, hot and cold about 0.6), so close must be clearly
    # higher; check.js tests both sides of the line.
    close = CLOSE

    q = np.clip(np.round(v * 127), -127, 127).astype(np.int8)
    with open(os.path.join(DATA, "network.js"), "w", encoding="utf-8") as f:
        f.write("// Generated by tools/build_network.py. Do not edit; rebuild instead.\n")
        f.write("// Learned meaning vectors: one per node, int8, " + str(DIM) + " numbers each.\n")
        f.write("window.TL_NETWORK = ")
        json.dump(
            {
                "dim": DIM,
                "close": round(close, 3),
                "keys": "\n".join(g.keys),
                "vectors": base64.b64encode(q.tobytes()).decode("ascii"),
            },
            f,
            ensure_ascii=False,
            separators=(",", ":"),
        )
        f.write(";\n")

    os.makedirs(os.path.join(DATA, "wordbank"), exist_ok=True)
    for lang, rows in banks.items():
        words = []
        known = guessed = 0
        for word, count in rows:
            if word in direct[lang]:
                words.append([word, direct[lang][word], ""])
                known += 1
            elif word in forms[lang]:
                base = forms[lang][word]
                words.append([word, direct[lang][base], base])
                guessed += 1
            else:
                words.append([word, "", ""])
        print(lang, "word bank:", known, "known,", guessed, "read as a form of a known word, of", len(rows))
        with open(os.path.join(DATA, "wordbank", lang + ".js"), "w", encoding="utf-8") as f:
            f.write("// Generated by tools/build_network.py from tools/wordlists/" + lang + ".txt. Do not edit.\n")
            f.write("// Word list: " + CREDIT + ".\n")
            f.write("// Each word is [word, English, base]: base is the known word it is read as a\n")
            f.write("// form of (\"\" when the word itself is known). English is \"\" for unknown words.\n")
            f.write("window.TL_WORDBANK = window.TL_WORDBANK || {};\n")
            f.write("window.TL_WORDBANK." + lang + " = ")
            json.dump({"credit": CREDIT, "words": words}, f, ensure_ascii=False, separators=(",", ":"))
            f.write(";\n")


if __name__ == "__main__":
    main()
