#!/usr/bin/env python3
"""Turns two large open sources into small link files for build_network.py.

    python3 translation-learner/tools/fetch_corpora.py            # both
    python3 translation-learner/tools/fetch_corpora.py tatoeba    # one

Not every machine can reach these servers, so the "Translation Learner
corpora" GitHub Actions workflow runs this, retrains, and commits only the
small outputs:

tatoeba/links.tsv     For each Desk word, the English words that keep turning
                      up in the English side of its sentences. Sentence pairs
                      are Tatoeba's (CC BY 2.0 FR), downloaded through OPUS.
wiktionary/<lang>.tsv Each Desk word's first Wiktionary senses, and the
                      headword when the Desk word is one of its inflected
                      forms. Entries are kaikki.org's Wiktionary extracts
                      (CC BY-SA 4.0).

Both keep only words the Desk already has a place for (its word banks,
glosses, decks and sentences), so the files stay a few hundred KB.
"""
import io
import json
import os
import re
import subprocess
import sys
import urllib.request
import zipfile
from collections import Counter, defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import build_network as bn  # noqa: E402

TATOEBA = os.path.join(HERE, "tatoeba", "links.tsv")
WIKTIONARY = os.path.join(HERE, "wiktionary")
TATOEBA_CREDIT = "Tatoeba sentence pairs via OPUS, CC BY 2.0 FR, https://tatoeba.org"
WIKTIONARY_CREDIT = "Wiktionary via kaikki.org, CC BY-SA 4.0, https://kaikki.org"

OPUS_API = "https://opus.nlpl.eu/opusapi/?source=en&target={code}&corpus=Tatoeba&preprocessing=moses&version=latest"
# OPUS names a pair in alphabetical order (ar-en, en-ja) and uses its own
# codes for some languages, so these are tried when the API gives no link.
OPUS_DIRECT = "https://object.pouta.csc.fi/OPUS-Tatoeba/{version}/moses/{pair}.txt.zip"
OPUS_VERSIONS = ("v2023-04-12", "v2022-03-03", "v2021-07-22")
OPUS_CODES = {"zh": ("zh", "zh_CN", "zh_cn", "cmn"), "ar": ("ar", "ara")}
KAIKKI = "https://kaikki.org/dictionary/{name}/kaikki.org-dictionary-{file}.jsonl"
KAIKKI_NAMES = {"japanese": "Japanese", "hangul": "Korean", "chinese": "Chinese", "cyrillic": "Russian", "hindi": "Hindi", "arabic": "Arabic"}
# Languages written without spaces are matched against the Desk's words,
# longest first.
UNSPACED = {"japanese", "chinese"}

MIN_PAIRS = 3     # a Desk word and an English word must share this many sentences
MIN_DICE = 0.08   # and this much of their sentences (Dice coefficient)
PER_WORD = 4      # English words kept per Desk word
SENSES = 2        # Wiktionary senses kept per entry


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "LanguageStudentDesk translation-learner"})
    return urllib.request.urlopen(req, timeout=120)


def vocabulary():
    src = json.loads(subprocess.check_output(["node", os.path.join(HERE, "export_sources.js")]))
    vocab = bn.desk_vocabulary(src)
    return {lang: vocab[code] for lang, code in bn.CN_CODES.items()}, vocab["en"]


# Tatoeba -----------------------------------------------------------------


def opus_pairs(code):
    """(English, other) sentence pairs for one language, from OPUS."""
    codes = OPUS_CODES.get(code, (code,))
    urls = []
    for c in codes:
        try:
            with get(OPUS_API.format(code=c)) as r:
                for corpus in json.load(r).get("corpora", []):
                    if isinstance(corpus, dict) and corpus.get("url", "").endswith(".zip"):
                        urls.append(corpus["url"])
        except Exception as e:
            print("  OPUS API:", e)
    for version in OPUS_VERSIONS:
        for c in codes:
            urls.append(OPUS_DIRECT.format(version=version, pair="-".join(sorted(("en", c)))))
    for url in dict.fromkeys(urls):
        try:
            print("  fetching", url)
            with get(url) as r:
                z = zipfile.ZipFile(io.BytesIO(r.read()))
        except Exception as e:
            print("  ", e)
            continue
        names = z.namelist()
        en = [n for n in names if n.endswith(".en")]
        xx = [n for n in names if not n.endswith((".en", ".xml", ".ids")) and "." in n and not n.endswith("README") and not n.endswith("LICENSE")]
        if en and xx:
            a = z.read(en[0]).decode("utf-8").splitlines()
            b = z.read(xx[0]).decode("utf-8").splitlines()
            return list(zip(a, b))
    return []


def segment(text, words, longest):
    """The Desk words in a sentence. Spaced languages are split on spaces; a
    Korean word also counts when a Desk word starts it (사랑해요: 사랑)."""
    found = []
    if longest:
        i = 0
        while i < len(text):
            for n in range(min(longest, len(text) - i), 0, -1):
                if text[i:i + n] in words:
                    found.append(text[i:i + n])
                    i += n
                    break
            else:
                i += 1
        return found
    for tok in re.findall(r"[\wऀ-ॿ]+", text.lower()):
        if tok in words:
            found.append(tok)
        else:
            for n in range(len(tok) - 1, 1, -1):
                if tok[:n] in words:
                    found.append(tok[:n])
                    break
    return found


def align(pairs, words, english, unspaced):
    """Desk word -> [(English word, shared sentences, Dice)], best first."""
    longest = max(map(len, words)) if unspaced else 0
    c_x, c_e, c_xe = Counter(), Counter(), Counter()
    for en, xx in pairs:
        ew = {w for w in re.findall(r"[a-z]+", en.lower()) if w in english and w not in bn.STOP}
        xw = set(segment(xx, words, longest))
        c_e.update(ew)
        c_x.update(xw)
        for x in xw:
            for e in ew:
                c_xe[(x, e)] += 1
    out = defaultdict(list)
    for (x, e), n in c_xe.items():
        if n < MIN_PAIRS:
            continue
        dice = 2 * n / (c_x[x] + c_e[e])
        if dice >= MIN_DICE:
            out[x].append((e, n, dice))
    return {x: sorted(v, key=lambda t: -t[2])[:PER_WORD] for x, v in out.items()}


def tatoeba(vocab, english):
    rows = []
    for lang, code in bn.CN_CODES.items():
        print("tatoeba", lang)
        pairs = opus_pairs(code)
        print("  %d sentence pairs" % len(pairs))
        for x, links in sorted(align(pairs, vocab[lang], english, lang in UNSPACED).items()):
            for e, n, dice in links:
                rows.append((lang, x, e, n, dice))
    if not rows:
        sys.exit("no Tatoeba sentence pairs could be downloaded")
    os.makedirs(os.path.dirname(TATOEBA), exist_ok=True)
    with open(TATOEBA, "w", encoding="utf-8") as f:
        f.write("# From " + TATOEBA_CREDIT + ". Written by fetch_corpora.py.\n")
        f.write("# language, Desk word, English word, sentences shared, Dice coefficient\n")
        for lang, x, e, n, dice in rows:
            f.write("%s\t%s\t%s\t%d\t%.3f\n" % (lang, x, e, n, dice))
    print("wrote", len(rows), "Tatoeba links")


# Wiktionary --------------------------------------------------------------


def wiktionary_entries(lines, words):
    """(Desk word, headword or "", English) for every entry whose headword or
    one of whose inflected forms is a Desk word."""
    for line in lines:
        e = json.loads(line)
        head = e.get("word", "")
        glosses = []
        for s in e.get("senses", []):
            if "form-of" in s.get("tags", []) or "alt-of" in s.get("tags", []):
                continue
            g = (s.get("glosses") or [""])[0]
            if g:
                glosses.append(g)
            if len(glosses) == SENSES:
                break
        if not glosses:
            continue
        english = "; ".join(glosses)
        if head in words:
            yield head, "", english
        for form in e.get("forms", []):
            f = form.get("form", "")
            if f != head and f in words:
                yield f, head, english


def wiktionary(vocab):
    os.makedirs(WIKTIONARY, exist_ok=True)
    wrote = 0
    for lang, name in KAIKKI_NAMES.items():
        url = KAIKKI.format(name=name, file=name.replace(" ", ""))
        print("wiktionary", lang, url)
        best = {}
        try:
            with get(url) as r:
                for word, head, english in wiktionary_entries(io.TextIOWrapper(r, encoding="utf-8"), vocab[lang]):
                    # A word's own entry beats being a form of another, and
                    # the first entry (the most common part of speech) wins.
                    if word not in best or (best[word][0] and not head):
                        best[word] = (head, english)
        except Exception as e:
            print("  ", e)
            continue
        with open(os.path.join(WIKTIONARY, lang + ".tsv"), "w", encoding="utf-8") as f:
            f.write("# From " + WIKTIONARY_CREDIT + ". Written by fetch_corpora.py.\n")
            f.write("# word, the headword it is a form of (blank when the same), English\n")
            for word in sorted(best):
                head, english = best[word]
                f.write("%s\t%s\t%s\n" % (word, head, short(english)))
        print("  %d words" % len(best))
        wrote += len(best)
    if not wrote:
        sys.exit("no Wiktionary extracts could be downloaded")


def short(text, limit=80):
    text = re.sub(r"\s+", " ", text).replace("\t", " ").strip()
    return text if len(text) <= limit else text[:limit].rsplit(" ", 1)[0]


def main():
    which = sys.argv[1:] or ["tatoeba", "wiktionary"]
    vocab, english = vocabulary()
    if "tatoeba" in which:
        tatoeba(vocab, english)
    if "wiktionary" in which:
        wiktionary(vocab)


if __name__ == "__main__":
    main()
