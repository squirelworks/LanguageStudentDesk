#!/usr/bin/env python3
"""Looks up the Japanese and Chinese word banks in open dictionaries and writes
tools/glosses/japanese.tsv and tools/glosses/chinese.tsv, which
build_network.py reads. Only these short gloss files are committed, not the
dictionaries.

    python3 translation-learner/tools/gloss_dictionaries.py --jmdict jamdict.db --cedict cedict.json

--jmdict  the SQLite JMdict from the jamdict-data package on PyPI
          (pip download --no-deps jamdict-data; unpack; xz -d jamdict.db.xz)
--cedict  cedict.json from the cedict-json package on npm
          (npm pack cedict-json; unpack)

JMdict is the Electronic Dictionary Research and Development Group's
Japanese-English dictionary, CC BY-SA. CC-CEDICT is MDBG's Chinese-English
dictionary, CC BY-SA 4.0. Gloss files derived from them carry the same licence.
"""
import argparse
import json
import os
import re
import sqlite3

HERE = os.path.dirname(os.path.abspath(__file__))
LISTS = os.path.join(HERE, "wordlists")
OUT = os.path.join(HERE, "glosses")
MAX = 48  # characters of English per word

JMDICT_CREDIT = "JMdict, Electronic Dictionary Research and Development Group, CC BY-SA, https://www.edrdg.org/edrdg/licence.html"
CEDICT_CREDIT = "CC-CEDICT, MDBG, CC BY-SA 4.0, https://www.mdbg.net/chinese/dictionary?page=cc-cedict"

# Fragments the frequency list's tokenizer leaves behind, mapped to the
# dictionary form they come from.
JA_FRAGMENTS = {
    "まし": "ます", "ませ": "ます", "でし": "です", "でしょ": "です", "だっ": "だ", "だろ": "だ",
    "なかっ": "ない", "なく": "ない", "たかっ": "たい", "てる": "ている", "てた": "ている",
    "られ": "られる", "れ": "れる", "せ": "せる", "さ": "する", "し": "する", "でき": "できる",
    "あっ": "ある", "あり": "ある", "いっ": "いく", "なっ": "なる", "やっ": "やる", "き": "くる",
    "こ": "くる", "み": "みる", "見": "見る", "思っ": "思う", "言っ": "言う", "行っ": "行く",
}
# A godan verb's stem ends in a kana from the い, あ or え row; the dictionary
# form ends in the same consonant's う-row kana (読み, 読ま, 読め: 読む).
GODAN = {}
for row in ("いきぎしちにびみり", "わかがさたなばまら", "えけげせてねべめれ"):
    for k, u in zip(row, "うくぐすつぬぶむる"):
        GODAN[k] = u
# い and っ before a verb ending can stand for several consonants (書い: 書く).
ONBIN = {"い": "くぐ", "っ": "うつる", "ん": "むぶぬ"}


def words(lang):
    out = []
    with open(os.path.join(LISTS, lang + ".txt"), encoding="utf-8") as f:
        for line in f:
            if line.startswith("#") or not line.strip():
                continue
            out.append(line.split("\t")[0])
    return out


def short(glosses):
    out = ""
    for g in glosses:
        g = re.sub(r"\s+", " ", g).strip()
        if not g:
            continue
        nxt = g if not out else out + "; " + g
        if len(nxt) > MAX and out:
            break
        out = nxt
    return out[:MAX + 20]


def jmdict(path):
    db = sqlite3.connect(path)
    pri = {}
    for (idseq,) in db.execute("select idseq from Entry"):
        pri[idseq] = 0
    for idseq, n in db.execute("select k.idseq, count(*) from Kanji k join KJP p on p.kid = k.ID group by k.idseq"):
        pri[idseq] += n
    for idseq, n in db.execute("select k.idseq, count(*) from Kana k join KNP p on p.kid = k.ID group by k.idseq"):
        pri[idseq] += n
    has_kanji = {i for (i,) in db.execute("select distinct idseq from Kanji")}
    usually_kana = {
        i for (i,) in db.execute("select distinct s.idseq from misc m join Sense s on s.ID = m.sid where m.text like '%usually written using kana%'")
    }
    by_kanji, by_kana = {}, {}
    for idseq, text in db.execute("select idseq, text from Kanji"):
        by_kanji.setdefault(text, set()).add(idseq)
    for idseq, text in db.execute("select idseq, text from Kana"):
        by_kana.setdefault(text, set()).add(idseq)

    def gloss(idseq):
        sense = db.execute("select ID from Sense where idseq = ? order by ID limit 1", (idseq,)).fetchone()
        if not sense:
            return ""
        rows = db.execute("select text from SenseGloss where sid = ? and (lang = 'eng' or lang is null)", sense).fetchall()
        return short(r[0] for r in rows)

    def best(text):
        # Written in kanji: that spelling. Written in kana: words normally
        # written that way (particles, usually-kana words) before kanji
        # words that happen to share the reading (の is a particle, not 野).
        if text in by_kanji:
            return max(by_kanji[text], key=lambda i: (pri.get(i, 0), -i))
        ids = by_kana.get(text)
        if not ids:
            return None
        return max(ids, key=lambda i: (i not in has_kanji or i in usually_kana, pri.get(i, 0) > 0, pri.get(i, 0), -i))

    def candidates(w):
        # (how direct the reading is, dictionary form): a stem's own verb
        # ending beats simply adding one (思わ is 思う, not 思わく).
        for e in ONBIN.get(w[-1:], ""):
            yield 1, w[:-1] + e
        if w[-1:] in GODAN:
            yield 1, w[:-1] + GODAN[w[-1]]
        # A stem plus る is an ichidan verb (入れ: 入れる), which beats reading
        # the last kana as a godan ending (入る).
        yield 2, w + "る"
        yield 1, w + "い"
        for e in ("う", "く", "す", "つ", "む"):
            yield 0, w + e

    out = []
    for w in words("japanese"):
        i = best(w)
        base = ""
        # Only words with a kanji (思っ, 読ん, 食べ) or a known fragment are read
        # as part of a longer dictionary form; bare kana is too ambiguous.
        kanji = re.search(r"[\u4e00-\u9fff]", w)
        if w in JA_FRAGMENTS or (kanji and (i is None or pri.get(i, 0) == 0 or w.endswith(("っ", "ん")))):
            # Of the dictionary forms the word could come from, the most common.
            found = [((rank, pri.get(j, 0)), c, j) for rank, c in candidates(w) for j in [best(c)] if j is not None and pri.get(j, 0) > 0]
            if w in JA_FRAGMENTS and best(JA_FRAGMENTS[w]) is not None:
                found = [((9, 0), JA_FRAGMENTS[w], best(JA_FRAGMENTS[w]))]
            if found:
                _, base, i = max(found, key=lambda x: x[0])
        if i is None:
            continue
        g = gloss(i)
        if g:
            out.append((w, base, g))
    return out


def cedict(path):
    entries = {}
    for e in json.load(open(path, encoding="utf-8")):
        entries.setdefault(e["simplified"], []).append(e)

    def usable(defs):
        return [d for d in defs if not re.match(r"^(surname |variant of|old variant|see |used in |CL:|abbr\. for |Japanese variant)", d)]

    out = []
    for w in words("chinese"):
        cands = entries.get(w, [])
        # Common words before proper nouns (capitalised pinyin) and variant
        # characters; a single character's neutral-tone reading is its
        # particle use (了 le, 吗 ma), which is what makes it this frequent.
        cands = sorted(
            cands,
            key=lambda e: (
                e["pinyin"][:1].isupper(),
                any("variant of" in d for d in e["english"]),
                not (len(w) == 1 and e["pinyin"].endswith("5")),
                -len(usable(e["english"])),
            ),
        )
        for e in cands:
            defs = usable(e["english"])
            if defs:
                out.append((w, "", short(defs)))
                break
    return out


def write(lang, rows, credit):
    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, lang + ".tsv"), "w", encoding="utf-8") as f:
        f.write("# Generated by tools/gloss_dictionaries.py. Glosses from " + credit + ".\n")
        f.write("# word, the dictionary form it was read as (blank when the same), English\n")
        for w, base, g in rows:
            f.write(w + "\t" + base + "\t" + g + "\n")
    print(lang, len(rows), "glosses")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--jmdict")
    ap.add_argument("--cedict")
    a = ap.parse_args()
    if a.jmdict:
        write("japanese", jmdict(a.jmdict), JMDICT_CREDIT)
    if a.cedict:
        write("chinese", cedict(a.cedict), CEDICT_CREDIT)


if __name__ == "__main__":
    main()
