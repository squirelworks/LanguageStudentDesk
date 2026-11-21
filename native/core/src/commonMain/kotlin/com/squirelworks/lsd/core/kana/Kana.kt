package com.squirelworks.lsd.core.kana

// Port of SquirrelGo-Apps/squirrelgo-dictionary/www/js/kana.js.
// The tests replay that file, so the quirks below are the behaviour.
object Kana {
    private val CONSONANTS = "bcdfghjklmpqrstvwxyz".toSet()
    private val VOWEL_OR_Y = "aiueoy".toSet()
    private val BMP = "bmp".toSet()
    private val ROMAN_KEY = Regex("^[a-z-]+$")
    private val KANA_ONLY = Regex("^[\\u3040-\\u30FFー]+$")
    private val JAPANESE = Regex("[\\u3040-\\u30FF\\u3400-\\u9FFF\\uF900-\\uFAFF々〆]")
    private val KANJI = Regex("[\\u3400-\\u9FFF\\uF900-\\uFAFF々]")

    private const val HIRA_START = '\u3041'
    private const val HIRA_END = '\u3096'
    private const val KATA_START = '\u30A1'
    private const val KATA_END = '\u30F6'

    private val romaji = linkedMapOf(
        "a" to "あ", "i" to "い", "u" to "う", "e" to "え", "o" to "お",
        "ka" to "か", "ki" to "き", "ku" to "く", "ke" to "け", "ko" to "こ",
        "ga" to "が", "gi" to "ぎ", "gu" to "ぐ", "ge" to "げ", "go" to "ご",
        "sa" to "さ", "si" to "し", "shi" to "し", "su" to "す", "se" to "せ", "so" to "そ",
        "za" to "ざ", "zi" to "じ", "ji" to "じ", "zu" to "ず", "ze" to "ぜ", "zo" to "ぞ",
        "ta" to "た", "ti" to "ち", "chi" to "ち", "tu" to "つ", "tsu" to "つ", "te" to "て", "to" to "と",
        "da" to "だ", "di" to "ぢ", "du" to "づ", "de" to "で", "do" to "ど",
        "na" to "な", "ni" to "に", "nu" to "ぬ", "ne" to "ね", "no" to "の",
        "ha" to "は", "hi" to "ひ", "hu" to "ふ", "fu" to "ふ", "he" to "へ", "ho" to "ほ",
        "ba" to "ば", "bi" to "び", "bu" to "ぶ", "be" to "べ", "bo" to "ぼ",
        "pa" to "ぱ", "pi" to "ぴ", "pu" to "ぷ", "pe" to "ぺ", "po" to "ぽ",
        "ma" to "ま", "mi" to "み", "mu" to "む", "me" to "め", "mo" to "も",
        "ya" to "や", "yu" to "ゆ", "yo" to "よ",
        "ra" to "ら", "ri" to "り", "ru" to "る", "re" to "れ", "ro" to "ろ",
        "la" to "ら", "li" to "り", "lu" to "る", "le" to "れ", "lo" to "ろ",
        "wa" to "わ", "wi" to "うぃ", "we" to "うぇ", "wo" to "を",
        "n'" to "ん",
        "kya" to "きゃ", "kyu" to "きゅ", "kyo" to "きょ", "gya" to "ぎゃ", "gyu" to "ぎゅ", "gyo" to "ぎょ",
        "sha" to "しゃ", "shu" to "しゅ", "she" to "しぇ", "sho" to "しょ", "sya" to "しゃ", "syu" to "しゅ", "syo" to "しょ",
        "ja" to "じゃ", "ju" to "じゅ", "je" to "じぇ", "jo" to "じょ", "jya" to "じゃ", "jyu" to "じゅ", "jyo" to "じょ",
        "zya" to "じゃ", "zyu" to "じゅ", "zyo" to "じょ",
        "cha" to "ちゃ", "chu" to "ちゅ", "che" to "ちぇ", "cho" to "ちょ", "tya" to "ちゃ", "tyu" to "ちゅ", "tyo" to "ちょ",
        "dya" to "ぢゃ", "dyu" to "ぢゅ", "dyo" to "ぢょ",
        "nya" to "にゃ", "nyu" to "にゅ", "nyo" to "にょ", "hya" to "ひゃ", "hyu" to "ひゅ", "hyo" to "ひょ",
        "bya" to "びゃ", "byu" to "びゅ", "byo" to "びょ", "pya" to "ぴゃ", "pyu" to "ぴゅ", "pyo" to "ぴょ",
        "mya" to "みゃ", "myu" to "みゅ", "myo" to "みょ", "rya" to "りゃ", "ryu" to "りゅ", "ryo" to "りょ",
        "fa" to "ふぁ", "fi" to "ふぃ", "fe" to "ふぇ", "fo" to "ふぉ", "fyu" to "ふゅ",
        "va" to "ゔぁ", "vi" to "ゔぃ", "vu" to "ゔ", "ve" to "ゔぇ", "vo" to "ゔぉ",
        "thi" to "てぃ", "dhi" to "でぃ", "twu" to "とぅ", "dwu" to "どぅ", "tsa" to "つぁ",
        "xa" to "ぁ", "xi" to "ぃ", "xu" to "ぅ", "xe" to "ぇ", "xo" to "ぉ",
        "xya" to "ゃ", "xyu" to "ゅ", "xyo" to "ょ", "xtu" to "っ", "xtsu" to "っ", "xwa" to "ゎ",
        "-" to "ー",
    )

    private val kanaRomaji: Map<String, String> = buildMap {
        for ((spelling, kana) in romaji) {
            if (ROMAN_KEY.matches(spelling) && kana !in this) put(kana, spelling)
        }
        putAll(
            mapOf(
                "し" to "shi", "ち" to "chi", "つ" to "tsu", "ふ" to "fu", "じ" to "ji", "ぢ" to "ji", "づ" to "zu",
                "を" to "o", "ん" to "n",
                "しゃ" to "sha", "しゅ" to "shu", "しょ" to "sho", "じゃ" to "ja", "じゅ" to "ju", "じょ" to "jo",
                "ちゃ" to "cha", "ちゅ" to "chu", "ちょ" to "cho",
                "ら" to "ra", "り" to "ri", "る" to "ru", "れ" to "re", "ろ" to "ro",
                "てぃ" to "ti", "ゔ" to "vu", "ぁ" to "a", "ぃ" to "i", "ぅ" to "u", "ぇ" to "e", "ぉ" to "o",
            ),
        )
    }

    fun romajiToHiragana(input: String): String {
        val s = input.lowercase()
        val out = StringBuilder()
        var i = 0
        while (i < s.length) {
            val c = s[i]
            val next = s.getOrNull(i + 1)
            if (next != null && c == next && c != 'n' && c in CONSONANTS) {
                out.append('っ')
                i++
                continue
            }
            if (c == 't' && next == 'c' && s.getOrNull(i + 2) == 'h') {
                out.append('っ')
                i++
                continue
            }
            if (c == 'n' && next == 'n') {
                out.append('ん')
                val third = s.getOrNull(i + 2)
                i += if (third != null && third in VOWEL_OR_Y) 1 else 2
                continue
            }
            var hit = false
            for (len in 4 downTo 1) {
                if (i + len > s.length) continue
                val kana = romaji[s.substring(i, i + len)]
                if (kana != null) {
                    out.append(kana)
                    i += len
                    hit = true
                    break
                }
            }
            if (hit) continue
            // `&&` binds tighter than `||` in the JavaScript, so an "n" always
            // enters and an "m" enters only before b, m or p.
            val mBeforeBmp = c == 'm' && next != null && next in BMP
            if (c == 'n' || mBeforeBmp) {
                if (c == 'n' && (i + 1 == s.length || next == null || next !in VOWEL_OR_Y)) {
                    out.append('ん')
                    i++
                    continue
                }
                if (c == 'm') {
                    out.append('ん')
                    i++
                    continue
                }
            }
            out.append(c)
            i++
        }
        return out.toString()
    }

    fun kataToHira(s: String): String = buildString {
        for (ch in s) {
            if (ch in KATA_START..KATA_END) append((ch.code - 0x60).toChar()) else append(ch)
        }
    }

    fun hiraToKata(s: String): String = buildString {
        for (ch in s) {
            if (ch in HIRA_START..HIRA_END) append((ch.code + 0x60).toChar()) else append(ch)
        }
    }

    fun toRomaji(input: String): String {
        val s = kataToHira(input)
        val out = StringBuilder()
        var i = 0
        while (i < s.length) {
            if (i + 1 < s.length) {
                val two = s.substring(i, i + 2)
                val spelling = kanaRomaji[two]
                if (spelling != null) {
                    out.append(spelling)
                    i += 2
                    continue
                }
            }
            val ch = s[i]
            if (ch == 'っ' && i + 1 < s.length) {
                val slice = s.substring(i + 1, minOf(i + 3, s.length))
                val next = kanaRomaji[slice] ?: kanaRomaji[s.substring(i + 1, i + 2)].orEmpty()
                val doubled = if (next.startsWith("ch")) "t" else next.firstOrNull()?.toString().orEmpty()
                out.append(doubled)
            } else if (ch == 'ー') {
                if (out.isNotEmpty()) out.append(out.last())
            } else if (ch == 'ん') {
                val nextRomaji = if (i + 1 < s.length) kanaRomaji[s.substring(i + 1, i + 2)].orEmpty() else ""
                if (nextRomaji.isNotEmpty() && nextRomaji[0] in VOWEL_OR_Y) out.append("n'")
                else out.append(kanaRomaji[ch.toString()] ?: ch.toString())
            } else {
                out.append(kanaRomaji[ch.toString()] ?: ch.toString())
            }
            i++
        }
        return out.toString()
    }

    fun isKana(s: String): Boolean = KANA_ONLY.matches(s)

    fun hasJapanese(s: String): Boolean = JAPANESE.containsMatchIn(s)

    fun isKanji(s: String): Boolean = KANJI.containsMatchIn(s)
}
