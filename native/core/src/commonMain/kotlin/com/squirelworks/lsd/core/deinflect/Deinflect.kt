package com.squirelworks.lsd.core.deinflect

import kotlinx.serialization.Serializable

// Port of SquirrelGo-Apps/squirrelgo-dictionary/www/js/deinflect.js.
// Rule order is the JavaScript insertion order: a match chains before the
// next rule is tried, and only one extra step, and only when the rule
// produces い or an ichidan verb.
@Serializable
data class Deinflection(val form: String, val cls: String, val label: String)

object Deinflect {
    fun deinflect(word: String): List<Deinflection> {
        val out = mutableListOf<Deinflection>()
        val seen = mutableSetOf(word)
        fun step(w: String, chain: List<String>, depth: Int) {
            for (rule in RULES) {
                if (rule.from.isEmpty() || !w.endsWith(rule.from)) continue
                val base = w.dropLast(rule.from.length) + rule.to
                if (base.isEmpty() || base == w) continue
                val key = base + "|" + rule.cls
                if (key in seen) continue
                seen += key
                val labels = chain + rule.label
                out += Deinflection(base, rule.cls, labels.asReversed().joinToString(" → "))
                if (depth < 1 && (rule.to == "い" || rule.cls == "v1")) step(base, labels, depth + 1)
            }
        }
        step(word, emptyList(), 0)
        return out
    }
}

private data class Rule(val from: String, val to: String, val cls: String, val label: String)

private val KANJI_START = Regex("^[こき]")
private val KUREBA = Regex("^くれば")

private val RULES: List<Rule> = buildList {
    val v5 = listOf(
        listOf("u", "う", "わ", "い", "っ", "え", "お"),
        listOf("ku", "く", "か", "き", "い", "け", "こ"),
        listOf("gu", "ぐ", "が", "ぎ", "い", "げ", "ご"),
        listOf("su", "す", "さ", "し", "し", "せ", "そ"),
        listOf("tsu", "つ", "た", "ち", "っ", "て", "と"),
        listOf("nu", "ぬ", "な", "に", "ん", "ね", "の"),
        listOf("bu", "ぶ", "ば", "び", "ん", "べ", "ぼ"),
        listOf("mu", "む", "ま", "み", "ん", "め", "も"),
        listOf("ru", "る", "ら", "り", "っ", "れ", "ろ"),
    )
    val clsOf = mapOf("く" to "k", "ぐ" to "g", "す" to "s", "つ" to "t", "ぬ" to "n", "ぶ" to "b", "む" to "m")
    for (row in v5) {
        val dict = row[1]
        val a = row[2]
        val i = row[3]
        val te = row[4]
        val e = row[5]
        val o = row[6]
        val cls = when (dict) {
            "う" -> "v5u"
            "る" -> "v5r"
            else -> "v5" + clsOf.getValue(dict)
        }
        val voiced = dict == "ぐ" || dict == "ぬ" || dict == "ぶ" || dict == "む"
        val ta = te + if (voiced) "だ" else "た"
        val tte = te + if (voiced) "で" else "て"
        add(Rule(a + "ない", dict, cls, "negative"))
        add(Rule(a + "なかった", dict, cls, "past negative"))
        add(Rule(i + "ます", dict, cls, "polite"))
        add(Rule(i + "ました", dict, cls, "polite past"))
        add(Rule(i + "ません", dict, cls, "polite negative"))
        add(Rule(i + "ませんでした", dict, cls, "polite past negative"))
        add(Rule(i + "たい", dict, cls, "want to"))
        add(Rule(i + "ましょう", dict, cls, "polite volitional"))
        add(Rule(ta, dict, cls, "past"))
        add(Rule(tte, dict, cls, "te-form"))
        add(Rule(tte + "いる", dict, cls, "progressive"))
        add(Rule(tte + "いた", dict, cls, "past progressive"))
        add(Rule(tte + "います", dict, cls, "polite progressive"))
        add(Rule(e, dict, cls, "imperative"))
        add(Rule(e + "る", dict, cls, "potential"))
        add(Rule(e + "ば", dict, cls, "conditional"))
        add(Rule(o + "う", dict, cls, "volitional"))
        add(Rule(a + "れる", dict, cls, "passive"))
        add(Rule(a + "せる", dict, cls, "causative"))
        add(Rule(ta + "ら", dict, cls, "conditional (-tara)"))
    }
    add(Rule("いった", "いく", "v5k-s", "past"))
    add(Rule("いって", "いく", "v5k-s", "te-form"))
    add(Rule("行った", "行く", "v5k-s", "past"))
    add(Rule("行って", "行く", "v5k-s", "te-form"))

    val ichidan = listOf(
        "ない" to "negative",
        "なかった" to "past negative",
        "ます" to "polite",
        "ました" to "polite past",
        "ません" to "polite negative",
        "ませんでした" to "polite past negative",
        "たい" to "want to",
        "た" to "past",
        "て" to "te-form",
        "ている" to "progressive",
        "ていた" to "past progressive",
        "ています" to "polite progressive",
        "ろ" to "imperative",
        "よう" to "volitional",
        "ましょう" to "polite volitional",
        "られる" to "potential / passive",
        "れる" to "potential (colloquial)",
        "させる" to "causative",
        "れば" to "conditional",
        "たら" to "conditional (-tara)",
        "" to "stem",
    )
    for ((end, label) in ichidan) if (end.isNotEmpty()) add(Rule(end, "る", "v1", label))

    val suru = mapOf(
        "ない" to "しない",
        "なかった" to "しなかった",
        "ろ" to "しろ",
        "よう" to "しよう",
        "られる" to "される",
        "れる" to "できる",
        "させる" to "させる",
        "れば" to "すれば",
    )
    val kuru = mapOf(
        "ない" to "こない",
        "なかった" to "こなかった",
        "ろ" to "こい",
        "よう" to "こよう",
        "られる" to "こられる",
        "れる" to "これる",
        "させる" to "こさせる",
        "れば" to "くれば",
    )
    for ((end, label) in ichidan) {
        if (end.isEmpty()) continue
        val s = suru[end] ?: "し$end"
        add(Rule(s, "する", "vs-i", label))
        val k = kuru[end] ?: "き$end"
        add(Rule(k, "くる", "vk", label))
        add(Rule(s, "", "vs", "suru verb, $label"))
        val kanji = KANJI_START.replace(k, "来").let { KUREBA.replace(it, "来れば") }
        add(Rule(kanji, "来る", "vk", label))
    }
    add(Rule("する", "", "vs", "suru verb"))

    val adjectives = listOf(
        "くない" to "negative",
        "かった" to "past",
        "くなかった" to "past negative",
        "くて" to "te-form",
        "く" to "adverbial",
        "ければ" to "conditional",
        "さ" to "noun (-sa)",
        "そう" to "looks like",
        "すぎる" to "too much",
    )
    for ((end, label) in adjectives) add(Rule(end, "い", "adj-i", label))
}
