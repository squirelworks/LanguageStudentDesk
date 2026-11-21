package com.squirelworks.lsd.klingon

import kotlin.random.Random

private val multi = listOf("tlh", "ch", "gh", "ng")
private val punct = mapOf("," to "\uF8FD", "." to "\uF8FE")
private val lowerCase = "ABCEGJLMNOPRTUVWY"

data class KlingonPiece(val roman: String, val glyph: String, val known: Boolean)

data class KlingonSpelling(val text: String, val parts: List<KlingonPiece>)

class Shuffler(private val random: Random = Random.Default) {
    fun <T> shuffle(items: List<T>): List<T> {
        val copy = items.toMutableList()
        for (i in copy.lastIndex downTo 1) {
            val j = random.nextInt(i + 1)
            val swap = copy[i]
            copy[i] = copy[j]
            copy[j] = swap
        }
        return copy
    }

    fun <T> pick(items: List<T>): T = items[random.nextInt(items.size)]
}

fun letterFile(codePoint: Int): String = "l-${codePoint.toString(16)}.mp3"

fun wordFile(word: String): String {
    val body = word.replace("'", "7").replace(" ", "-").map { ch ->
        if (ch.isUpperCase()) "_" + ch.lowercase() else ch.toString()
    }.joinToString("")
    return "w-$body.mp3"
}

fun normalizeKlingon(text: String): String {
    val folded = text.replace(Regex("[‘’ʼ`´]"), "'").map { ch ->
        if (ch in lowerCase) ch.lowercaseChar() else ch
    }.joinToString("")
    // ch, gh and tlh are single letters, so their h is not the capital H.
    val protected = folded.replace("tlh", "\u0001").replace("ch", "\u0002").replace("gh", "\u0003")
    val raised = protected.map { ch -> if (ch in "dhis") ch.uppercaseChar() else ch }.joinToString("")
    return raised.replace("\u0001", "tlh").replace("\u0002", "ch").replace("\u0003", "gh")
}

fun transliterate(text: String, byKey: Map<String, KlingonLetter>): KlingonSpelling {
    val source = normalizeKlingon(text)
    val parts = mutableListOf<KlingonPiece>()
    var i = 0
    while (i < source.length) {
        val cluster = multi.firstOrNull { source.startsWith(it, i) }
        val token = cluster ?: source[i].toString()
        val letter = byKey[token]
        val mark = punct[token]
        when {
            letter != null -> parts += KlingonPiece(token, letter.glyph, true)
            mark != null -> parts += KlingonPiece(token, mark, true)
            else -> parts += KlingonPiece(token, token, token.length == 1 && token[0] in " \t\n!?;:\"()-")
        }
        i += token.length
    }
    return KlingonSpelling(parts.joinToString("") { it.glyph }, parts)
}

fun klingonIpa(word: String, ipa: Map<String, String>): String {
    val source = normalizeKlingon(word)
    val sounds = mutableListOf<String>()
    var i = 0
    while (i < source.length) {
        val cluster = multi.firstOrNull { source.startsWith(it, i) }
        val token = cluster ?: source[i].toString()
        when {
            token == " " -> sounds += " "
            token in ipa -> sounds += ipa.getValue(token)
        }
        i += token.length
    }
    return sounds.joinToString("")
}

fun hasClip(word: String, bundle: KlingonBundle): Boolean {
    val normalized = normalizeKlingon(word).trim()
    if (bundle.words.any { it.written == normalized }) return true
    return bundle.letters.any { !it.numeral && it.example == normalized }
}

data class QuizOption(val key: String, val label: String, val glyph: String)

data class QuizQuestion(
    val key: String,
    val kind: String,
    val promptGlyph: String = "",
    val promptSound: String = "",
    val clip: String = "",
    val word: String = "",
    val wordMeaning: String = "",
    val wordIpa: String = "",
    val spelled: String = "",
    val answer: String,
    val options: List<QuizOption>,
)

data class KlingonQuiz(
    val questions: List<QuizQuestion>,
    val index: Int = 0,
    val right: Int = 0,
    val missed: List<String> = emptyList(),
    val answered: String? = null,
    val finished: Boolean = false,
)

fun buildQuiz(
    items: List<KlingonLetter>,
    kind: String,
    count: Int,
    voice: Boolean,
    bundle: KlingonBundle,
    shuffler: Shuffler = Shuffler(),
): KlingonQuiz {
    val shuffled = shuffler.shuffle(items)
    val pool = if (count <= 0) shuffled else shuffled.take(count.coerceAtMost(shuffled.size))
    val questions = pool.map { letter -> questionFor(letter, kind, items, voice, bundle, shuffler) }
    return KlingonQuiz(questions)
}

private fun questionFor(
    letter: KlingonLetter,
    requested: String,
    items: List<KlingonLetter>,
    voice: Boolean,
    bundle: KlingonBundle,
    shuffler: Shuffler,
): QuizQuestion {
    var kind = requested
    if (kind == "mix") {
        val choices = if (voice) listOf("read", "pick", "listen", "word") else listOf("read", "pick", "word")
        kind = shuffler.pick(choices)
    }
    if (kind == "word" && letter.numeral) kind = "read"
    if (kind == "word") {
        val word = wordFor(letter, items, bundle, shuffler)
        val others = shuffler.shuffle(bundle.words.filter { it.written != word.written }).take(3)
        val options = shuffler.shuffle(listOf(word) + others).map {
            QuizOption(it.written, it.written, "")
        }
        val spelled = transliterate(word.written, bundle.byKey).parts
            .filter { it.roman in bundle.byKey }
            .joinToString(" · ") { it.roman }
        return QuizQuestion(
            key = letter.key,
            kind = "word",
            word = word.written,
            wordMeaning = word.meaning,
            wordIpa = klingonIpa(word.written, bundle.ipa),
            spelled = spelled,
            clip = "clips/${wordFile(word.written)}",
            promptGlyph = transliterate(word.written, bundle.byKey).text,
            answer = word.written,
            options = options,
        )
    }
    val near = bundle.letters.filter { it.numeral == letter.numeral && it.key != letter.key }
    val chosen = listOf(letter) + shuffler.shuffle(near).take(3)
    val options = shuffler.shuffle(chosen).map { item ->
        val label = if (item.numeral) "${item.key} · ${item.hint}" else item.key
        QuizOption(item.key, if (kind == "read") label else item.glyph, item.glyph)
    }
    val sound = if (letter.numeral) "${letter.key} · ${letter.hint}" else letter.key
    return QuizQuestion(
        key = letter.key,
        kind = kind,
        promptGlyph = letter.glyph,
        promptSound = sound,
        clip = "clips/${letter.clip}",
        answer = letter.key,
        options = options,
    )
}

fun wordFor(
    letter: KlingonLetter,
    items: List<KlingonLetter>,
    bundle: KlingonBundle,
    shuffler: Shuffler,
): KlingonWord {
    val known = items.map { it.key }.toSet()
    val fits = bundle.words.filter { word ->
        val parts = transliterate(word.written, bundle.byKey).parts
        parts.any { it.roman == letter.key } && parts.all { piece ->
            piece.roman !in bundle.byKey || piece.roman in known
        }
    }
    val pool = fits.ifEmpty { bundle.words }
    return shuffler.pick(pool)
}

fun KlingonQuiz.choose(choice: String): KlingonQuiz {
    if (answered != null || finished || questions.isEmpty()) return this
    val question = questions[index]
    val correct = choice == question.answer
    return copy(
        answered = choice,
        right = right + if (correct) 1 else 0,
        missed = if (correct) missed else missed + question.key,
    )
}

fun reinsertFlashCard(deck: List<String>, offset: Int): List<String> {
    if (deck.isEmpty()) return deck
    val rest = deck.drop(1).toMutableList()
    rest.add(minOf(rest.size, offset.coerceAtLeast(0)), deck.first())
    return rest
}

fun KlingonQuiz.advance(): KlingonQuiz {
    if (finished) return this
    if (index >= questions.lastIndex) return copy(finished = true, answered = null)
    return copy(index = index + 1, answered = null)
}
