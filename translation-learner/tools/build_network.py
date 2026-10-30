#!/usr/bin/env python3
"""Builds the Translation Learner's meaning network.

    python3 translation-learner/tools/build_network.py           # train from the committed word lists
    python3 translation-learner/tools/build_network.py --fetch   # download the word lists first
    python3 translation-learner/tools/build_network.py --fetch-conceptnet  # refresh tools/conceptnet/edges.tsv

1. Word banks: the 1,000 most frequent words per language from wordfreq 3.1
   (CC BY-SA 4.0). They are cached in tools/wordlists/<lang>.txt so training
   needs no network; --fetch needs the msgpack package.
2. A graph is built over meanings (data/matrix.js), English words, and words in
   each Desk language. Edges come from the matrix (meaning <-> its English, token
   <-> its meaning, meanings that share a sentence), the Vocabulary Learner decks
   (word <-> English gloss) and SquirrelGo Kanji (kanji <-> English meaning).
   Word bank glosses (tools/glosses) link each word to its English, and
   ConceptNet 5.7 (CC BY-SA 4.0) adds translation, synonym and word-form
   links between Desk words and English words already in the graph.
   When present, tools/tatoeba/links.tsv (Tatoeba sentence pairs, CC BY 2.0 FR)
   and tools/wiktionary/<lang>.tsv (Wiktionary, CC BY-SA 4.0), written by
   fetch_corpora.py, add links from real translations and dictionary entries.
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

# wordfreq 3.1.1 by Robyn Speer: word frequencies merged from subtitles,
# Wikipedia, news, books, web text and social media. The data files are
# CC BY-SA 4.0; they ship inside the Python wheel, pinned here by hash.
WHEEL = "https://files.pythonhosted.org/packages/24/61/62835c475d69872d30689f284497853fe33fe1d6dd18f57346d13305861d/wordfreq-3.1.1-py3-none-any.whl"
WHEEL_SHA256 = "4b1c6ecffc6198be3396d5cf871c4423ca71c907c231348d352dd54d62b97473"
CREDIT = "wordfreq 3.1 by Robyn Speer, CC BY-SA 4.0, https://github.com/rspeer/wordfreq"
# Desk language id -> (wordfreq data file, characters a real word is made of)
BANKS = {
    "japanese": ("large_ja", r"[\u3041-\u30ff\u4e00-\u9fff々ー]+"),
    "hangul": ("small_ko", r"[\uac00-\ud7a3]+"),
    "chinese": ("large_zh", r"[\u4e00-\u9fff]+"),
    "cyrillic": ("large_ru", r"[а-яё]+(-[а-яё]+)?"),
    "hindi": ("small_hi", r"[\u0900-\u097f]+"),
    "arabic": ("large_ar", r"[\u0621-\u064a\u064b-\u0652]+"),
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
EPOCHS = 5
SEED = 20261030
# Where "close" starts is set from these pairs (the same ones check.js tests):
# a word and a meaning it should be close to, and pairs that only share
# topics. The line goes 60% of the way from the highest unrelated pair to the
# lowest related one, leaning strict.
CLOSE_PAIRS = [("boy", "child"), ("kid", "child"), ("large", "big"), ("talk", "speak")]
APART_PAIRS = [("tea", "water"), ("coffee", "tea"), ("hot", "cold"), ("hello", "thanks"), ("dog", "cat")]

# Glosses for word bank words the Desk itself does not know. glosses/<lang>.tsv
# is generated from an open dictionary by gloss_dictionaries.py;
# glosses/desk-<lang>.tsv is written by hand and wins over both the dictionary
# and the Desk's own glosses.
GLOSSES = os.path.join(HERE, "glosses")
GLOSS_CREDITS = {
    "japanese": "JMdict, Electronic Dictionary Research and Development Group, CC BY-SA, https://www.edrdg.org/edrdg/licence.html",
    "chinese": "CC-CEDICT, MDBG, CC BY-SA 4.0, https://www.mdbg.net/chinese/dictionary?page=cc-cedict",
}

# ConceptNet 5.7 assertions (CC BY-SA 4.0). The full file is about 475 MB;
# --fetch-conceptnet streams it and keeps only the links that touch a word the
# Desk knows, in tools/conceptnet/edges.tsv (about 1 MB).
CONCEPTNET = "https://s3.amazonaws.com/conceptnet/downloads/2019/edges/conceptnet-assertions-5.7.0.csv.gz"
CONCEPTNET_CREDIT = "ConceptNet 5.7, CC BY-SA 4.0, https://conceptnet.io"
CN_EDGES = os.path.join(HERE, "conceptnet", "edges.tsv")
# Written by fetch_corpora.py (run by the "Translation Learner corpora"
# workflow, since not every machine can reach these sources).
TATOEBA_LINKS = os.path.join(HERE, "tatoeba", "links.tsv")
TATOEBA_CREDIT = "Tatoeba sentence pairs via OPUS, CC BY 2.0 FR, https://tatoeba.org"
WIKTIONARY = os.path.join(HERE, "wiktionary")
WIKTIONARY_CREDIT = "Wiktionary via kaikki.org, CC BY-SA 4.0, https://kaikki.org"
CN_CODES = {"japanese": "ja", "hangul": "ko", "chinese": "zh", "cyrillic": "ru", "hindi": "hi", "arabic": "ar"}
# How strongly each kind of ConceptNet link ties two words. RelatedTo is
# loose (a word and its topic), so it counts for less.
CN_RELATIONS = {"Synonym": 1.0, "FormOf": 1.0, "SimilarTo": 0.8, "RelatedTo": 0.4, "IsA": 0.5}
# Between two English words only these count: RelatedTo would tie tea to
# coffee and hot to cold, which must stay apart.
CN_ENGLISH = {"Synonym", "SimilarTo", "IsA"}


def desk_vocabulary(src):
    """Per ConceptNet language code, every word the Desk has a place for."""
    vocab = defaultdict(set)
    for lang, code in CN_CODES.items():
        vocab[code].update(w for w, _ in read_lists().get(lang, []))
        for name in ("desk-" + lang, lang):
            for word, (base, _) in read_glosses(name).items():
                vocab[code].add(word)
                if base:
                    vocab[code].add(base)
        for word, _, _ in src["decks"].get(lang, []):
            vocab[code].add(word)
        for r in src["columns"].get(lang, {"r": {}})["r"].values():
            for text, _, _ in r["t"]:
                vocab[code].add(bare(text))
    vocab["ja"].update(char for char, _, _ in src["kanji"])
    # English words the Desk uses, for English-to-English links.
    english = [raw for raw in src["meanings"].values()] + [e for rows in src["decks"].values() for _, _, e in rows]
    for lang in CN_CODES:
        for name in ("desk-" + lang, lang):
            english += [e for _, e in read_glosses(name).values()]
    for text in english:
        for words in english_words(text.replace("|", ";").replace(")", ");")):
            vocab["en"].update(words)
    return vocab


def fetch_conceptnet(src):
    import gzip

    vocab = desk_vocabulary(src)
    print("streaming", CONCEPTNET)
    kept = 0
    os.makedirs(os.path.dirname(CN_EDGES), exist_ok=True)
    with urllib.request.urlopen(CONCEPTNET) as r, open(CN_EDGES, "w", encoding="utf-8") as out:
        out.write("# From " + CONCEPTNET_CREDIT + ". Written by build_network.py --fetch-conceptnet.\n")
        out.write("# relation, language, word, language, word, weight: links that touch a Desk word\n")
        for line in gzip.GzipFile(fileobj=r):
            uri, rel, start, end, meta = line.decode("utf-8").rstrip("\n").split("\t")
            rel = rel[3:]
            if rel not in CN_RELATIONS or not start.startswith("/c/") or not end.startswith("/c/"):
                continue
            a, s = start.split("/")[2:4]
            b, e = end.split("/")[2:4]
            if a not in vocab or b not in vocab or (a == b == "en" and rel not in CN_ENGLISH):
                continue
            if rel == "IsA" and not a == b == "en":
                continue
            if (a == "en" and "_" in s) or (b == "en" and "_" in e):
                continue
            if (a == "en" and a != b or s in vocab[a]) and (b == "en" and a != b or e in vocab[b]):
                w = json.loads(meta).get("weight", 1.0)
                out.write("\t".join([rel, a, s, b, e, "%.2f" % w]) + "\n")
                kept += 1
    print("kept", kept, "ConceptNet links")


def read_conceptnet():
    if not os.path.exists(CN_EDGES):
        return []
    with open(CN_EDGES, encoding="utf-8") as f:
        return [line.rstrip("\n").split("\t") for line in f if not line.startswith("#")]


def fetch():
    import gzip
    import hashlib
    import io
    import zipfile

    try:
        import msgpack
    except ImportError:
        sys.exit("--fetch needs msgpack: pip install msgpack")
    print("fetching", WHEEL)
    with urllib.request.urlopen(WHEEL) as r:
        blob = r.read()
    if hashlib.sha256(blob).hexdigest() != WHEEL_SHA256:
        sys.exit("wordfreq wheel does not match its pinned hash")
    wheel = zipfile.ZipFile(io.BytesIO(blob))
    os.makedirs(LISTS, exist_ok=True)
    for lang, (name, pattern) in BANKS.items():
        # The file is a header, then words grouped in bins of one centibel each,
        # most frequent first. Zipf frequency = 9 - bin / 100.
        bins = msgpack.unpackb(gzip.decompress(wheel.read("wordfreq/data/" + name + ".msgpack.gz")), raw=False)[1:]
        rx = re.compile("^" + pattern + "$")
        keep = []
        for i, words in enumerate(bins):
            for w in words:
                if rx.match(w) and len(keep) < TOP:
                    keep.append(w + "\t" + format(9 - i / 100, ".2f"))
        with open(os.path.join(LISTS, lang + ".txt"), "w", encoding="utf-8") as f:
            f.write("# " + CREDIT + "\n# " + name + ", the first " + str(TOP) + " entries that are words; word, Zipf frequency\n")
            f.write("\n".join(keep) + "\n")
        print(lang, len(keep), "words")


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
                rows.append((w, float(n)))
        banks[lang] = rows
    return banks


def read_glosses(name, folder=GLOSSES):
    """word -> (base, English) from <folder>/<name>.tsv; English "-" drops a word."""
    out = {}
    path = os.path.join(folder, name + ".tsv")
    if not os.path.exists(path):
        return out
    with open(path, encoding="utf-8") as f:
        for line in f:
            if line.startswith("#") or not line.strip():
                continue
            word, base, english = line.rstrip("\n").split("\t")
            out[word] = (base, english.strip())
    return out


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
    # Word bank glosses: hand-written ones first, then the Desk's own, then a
    # dictionary's, then Wiktionary's. Each glossed word links to the English of its gloss, to
    # a meaning whose English the gloss is, and to the word it is a form of.
    glossed = defaultdict(dict)  # lang -> word -> (base, English)
    for lang, rows in banks.items():
        desk, dictionary = read_glosses("desk-" + lang), read_glosses(lang)
        wikt = read_glosses(lang, WIKTIONARY)
        for word, _ in rows:
            if word in desk:
                base, english = desk[word]
            elif word in direct[lang]:
                continue
            elif word in dictionary:
                base, english = dictionary[word]
            elif word in wikt:
                base, english = wikt[word]
            else:
                continue
            if english == "-":
                continue
            glossed[lang][word] = (base, english)
            key = lang + ":" + word
            for words in english_words(english)[:3]:
                for w in words:
                    g.link(key, "en:" + w, 1.5 / len(words))
            for part in re.split(r"[;,/]", re.sub(r"\([^)]*\)", "", english.lower())):
                for mid in alt_index.get(part.strip(), ()):
                    g.link(key, "m:" + mid, 1.5)
            if base and base != word:
                g.link(key, lang + ":" + base, 1.0)
    # ConceptNet: a Desk word and an English word already in the graph, or two
    # Desk words in the same language (a word and its dictionary form, two
    # synonyms). New English words are left out so the network stays small.
    code_lang = {c: l for l, c in CN_CODES.items()}
    for rel, a, s, b, e, w in read_conceptnet():
        ends = []
        for code, word in ((a, s), (b, e)):
            key = ("en:" if code == "en" else code_lang[code] + ":") + word
            if code == "en" and key not in g.ids:
                break
            ends.append(key)
        if len(ends) == 2:
            g.link(ends[0], ends[1], CN_RELATIONS[rel] * min(float(w), 2.0) / 2.0)
    # Wiktionary: every Desk word with an entry, linked to the English words of
    # its first senses that the graph already has, and to its headword.
    for lang in CN_CODES:
        for word, (head, english) in read_glosses(lang, WIKTIONARY).items():
            key = lang + ":" + word
            for words in english_words(english)[:3]:
                known = [w for w in words if "en:" + w in g.ids]
                for w in known:
                    g.link(key, "en:" + w, 1.0 / len(words))
            if head:
                g.link(key, lang + ":" + head, 1.0)
    # Tatoeba: a Desk word and the English words that keep turning up in the
    # translations of its sentences, weighted by how reliably they do.
    if os.path.exists(TATOEBA_LINKS):
        with open(TATOEBA_LINKS, encoding="utf-8") as f:
            for line in f:
                if line.startswith("#"):
                    continue
                lang, word, en, _, dice = line.rstrip("\n").split("\t")
                if "en:" + en in g.ids:
                    g.link(lang + ":" + word, "en:" + en, min(1.0, 3 * float(dice)))
    # Word bank words that look like a form of a word the graph knows
    # (a noun with a particle, a conjugated verb) lean on that word.
    forms = defaultdict(dict)
    for lang, rows in banks.items():
        lexicon = dict(direct[lang])
        lexicon.update((w, e) for w, (_, e) in glossed[lang].items())
        for word, _ in rows:
            if word in lexicon or word in glossed[lang]:
                continue
            base = form_of(lang, word, lexicon)
            if base:
                forms[lang][word] = base
                g.link(lang + ":" + word, lang + ":" + base, 1.0)
    return g, direct, forms, glossed


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
    if "--fetch-conceptnet" in sys.argv:
        fetch_conceptnet(src)
    g, direct, forms, glossed = build_graph(src, banks)
    v = train(g)

    # How similar a learner's word must be to a meaning to count as close.
    def sim(word, mid):
        return float(v[g.ids["en:" + word]] @ v[g.ids["m:" + mid]])

    near = min(sim(w, m) for w, m in CLOSE_PAIRS)
    apart = max(sim(w, m) for w, m in APART_PAIRS)
    if near - apart < 0.05:
        sys.exit("related and unrelated pairs are too close together (%.2f vs %.2f)" % (near, apart))
    close = apart + 0.6 * (near - apart)
    print("close line %.3f (related from %.2f, unrelated up to %.2f)" % (close, near, apart))

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
            if word in glossed[lang]:
                base, english = glossed[lang][word]
                words.append([word, english, base])
                known += 1
            elif word in direct[lang]:
                words.append([word, direct[lang][word], ""])
                known += 1
            elif word in forms[lang]:
                base = forms[lang][word]
                english = glossed[lang][base][1] if base in glossed[lang] else direct[lang][base]
                words.append([word, english, base, 1])
                guessed += 1
            else:
                words.append([word, "", ""])
        print(lang, "word bank:", known, "known,", guessed, "read as a form of a known word, of", len(rows))
        credit = CREDIT
        if lang in GLOSS_CREDITS:
            credit += ". Glosses partly from " + GLOSS_CREDITS[lang]
        if os.path.exists(os.path.join(WIKTIONARY, lang + ".tsv")):
            credit += ". Glosses and word forms partly from " + WIKTIONARY_CREDIT
        links = [c for path, c in ((CN_EDGES, CONCEPTNET_CREDIT), (TATOEBA_LINKS, TATOEBA_CREDIT)) if os.path.exists(path)]
        if links:
            credit += ". Word links partly from " + "; ".join(links)
        with open(os.path.join(DATA, "wordbank", lang + ".js"), "w", encoding="utf-8") as f:
            f.write("// Generated by tools/build_network.py from tools/wordlists/" + lang + ".txt. Do not edit.\n")
            f.write("// Word list: " + credit + ".\n")
            f.write("// Each word is [word, English, base, guess]: base is the dictionary form the\n")
            f.write("// word is a form of (\"\" when it is one); guess is 1 when that was read from the\n")
            f.write("// word's shape rather than a gloss. English is \"\" for unknown words.\n")
            f.write("window.TL_WORDBANK = window.TL_WORDBANK || {};\n")
            f.write("window.TL_WORDBANK." + lang + " = ")
            json.dump({"credit": credit, "words": words}, f, ensure_ascii=False, separators=(",", ":"))
            f.write(";\n")


if __name__ == "__main__":
    main()
