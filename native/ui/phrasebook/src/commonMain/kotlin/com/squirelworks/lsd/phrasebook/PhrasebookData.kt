package com.squirelworks.lsd.phrasebook

import com.squirelworks.lsd.core.speech.VoiceStatus
import com.squirelworks.lsd.kana.SuiteFile
import com.squirelworks.lsd.kana.parseSuite
import kotlin.math.min
import kotlin.math.roundToInt
import kotlin.random.Random
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

private val json = Json { ignoreUnknownKeys = true }

const val PHRASE_SEARCH_LIMIT = 150

@Serializable
data class PhrasebookFile(
    val accent: String = "",
    val store: String = "",
    val packs: List<PhrasebookPackFile> = emptyList(),
)

@Serializable
data class PhrasebookPackFile(
    val id: String = "",
    val title: String = "",
    val jaTitle: String = "",
    val desc: String = "",
    val categories: List<PhrasebookCategoryFile> = emptyList(),
)

@Serializable
data class PhrasebookCategoryFile(
    val id: String = "",
    val title: String = "",
    val phrases: List<PhrasebookPhraseFile> = emptyList(),
)

@Serializable
data class PhrasebookPhraseFile(
    val key: String = "",
    val en: String = "",
    val ja: String = "",
    val reading: String = "",
    val spoken: String = "",
    val romaji: String = "",
    val note: String = "",
    val search: String = "",
    val clip: String = "",
)

data class Phrase(
    val key: String,
    val packId: String,
    val packTitle: String,
    val category: String,
    val en: String,
    val ja: String,
    val reading: String,
    val spoken: String,
    val romaji: String,
    val note: String,
    val search: String,
    val clip: String,
)

data class PhraseCategory(val id: String, val title: String, val phrases: List<Phrase>)

data class PhrasePack(
    val id: String,
    val title: String,
    val jaTitle: String,
    val desc: String,
    val categories: List<PhraseCategory>,
) {
    val phrases: List<Phrase> get() = categories.flatMap { it.phrases }
}

data class PhrasebookBundle(
    val packs: List<PhrasePack>,
    val phrases: List<Phrase>,
    val byKey: Map<String, Phrase>,
    val accent: String,
    val storeKey: String,
    val suite: SuiteFile?,
)

data class FlashDeck(
    val title: String,
    val queue: List<String>,
    val total: Int,
    val done: Int,
    val revealed: Boolean,
)

fun loadPhrasebookBundle(course: String, suite: String?): PhrasebookBundle {
    val file = json.decodeFromString<PhrasebookFile>(course)
    val phrases = mutableListOf<Phrase>()
    val packs = file.packs.map { pack ->
        PhrasePack(
            id = pack.id,
            title = pack.title,
            jaTitle = pack.jaTitle,
            desc = pack.desc,
            categories = pack.categories.map { cat ->
                PhraseCategory(
                    id = cat.id,
                    title = cat.title,
                    phrases = cat.phrases.map { row ->
                        Phrase(
                            key = row.key,
                            packId = pack.id,
                            packTitle = pack.title,
                            category = cat.title,
                            en = row.en,
                            ja = row.ja,
                            reading = row.reading,
                            spoken = row.spoken,
                            romaji = row.romaji,
                            note = row.note,
                            search = row.search,
                            clip = row.clip,
                        ).also { phrases += it }
                    },
                )
            },
        )
    }
    return PhrasebookBundle(
        packs = packs,
        phrases = phrases,
        byKey = phrases.associateBy { it.key },
        accent = file.accent,
        storeKey = file.store,
        suite = suite?.let { parseSuite(it) },
    )
}

fun toHiragana(text: String): String = buildString(text.length) {
    for (ch in text) {
        if (ch in '\u30A1'..'\u30F6') append((ch.code - 0x60).toChar()) else append(ch)
    }
}

fun searchPhrases(phrases: List<Phrase>, query: String): List<Phrase> {
    val q = query.trim()
    if (q.isEmpty()) return emptyList()
    val needle = q.lowercase().replace(Regex("['\\s]"), "")
    val kana = toHiragana(q)
    return phrases.filter { it.search.contains(needle) || it.search.contains(kana) }
}

fun matchCountText(count: Int): String = if (count == 1) "1 match" else "$count matches"

fun emptySearchText(query: String): String = "No phrases match “${query.trim()}”."

fun isLearned(learned: Map<String, Long>, key: String): Boolean = (learned[key] ?: 0L) != 0L

fun learnedCount(phrases: List<Phrase>, learned: Map<String, Long>): Int =
    phrases.count { isLearned(learned, it.key) }

fun learnedPercent(learned: Int, total: Int): Int =
    if (total <= 0) 0 else (learned * 100.0 / total).roundToInt()

fun againInsertAt(remaining: Int, random: Random): Int = min(remaining, 3 + random.nextInt(3))

fun FlashDeck.reveal(): FlashDeck = copy(revealed = true)

fun FlashDeck.again(random: Random): FlashDeck {
    if (queue.isEmpty()) return this
    val card = queue.first()
    val rest = queue.drop(1).toMutableList()
    rest.add(againInsertAt(rest.size, random), card)
    return copy(queue = rest, revealed = false)
}

fun FlashDeck.good(): Pair<FlashDeck, String>? {
    val card = queue.firstOrNull() ?: return null
    return copy(queue = queue.drop(1), done = done + 1, revealed = false) to card
}

fun japaneseSideVisible(direction: String, revealed: Boolean): Boolean =
    if (direction == "ja-en") !revealed else revealed

fun playbackRate(speed: Double, slow: Boolean): Float = ((if (slow) 0.6 else 1.0) * speed).toFloat()

fun spokenForVoice(spoken: String): String = spoken.filter { !it.isWhitespace() }

fun csvQuote(value: String): String = "\"" + value.replace("\"", "\"\"") + "\""

fun ankiTag(packId: String, category: String): String {
    val slug = category.replace(Regex("[^A-Za-z0-9_]+"), "_")
    return "$packId $packId::$slug"
}

fun ankiCsv(phrases: List<Phrase>): String {
    val lines = phrases.joinToString("\n") { phrase ->
        val back = buildString {
            append(phrase.reading)
            append("<br>")
            append(phrase.romaji)
            append("<br>")
            append(phrase.en)
            if (phrase.note.isNotEmpty()) {
                append("<br><i>")
                append(phrase.note)
                append("</i>")
            }
        }
        listOf(csvQuote(phrase.ja), csvQuote(back), csvQuote(ankiTag(phrase.packId, phrase.category))).joinToString(",")
    }
    return "#separator:comma\n#html:true\n#tags column:3\n$lines\n"
}

fun phrasebookAbout(packs: List<PhrasePack>, phraseCount: Int): String {
    val titles = packs.joinToString(", ") { it.title }
    return "SquirrelGo Phrasebook is part of LanguageStudentDesk. $phraseCount original phrases in ${packs.size} packs: $titles. Works offline. Recorded voice: Open JTalk with the HTS voice Mei by Nagoya Institute of Technology (CC BY 3.0). With it turned off, your device's Japanese voice speaks instead."
}

fun deviceVoiceLine(status: VoiceStatus): String =
    if (status == VoiceStatus.Ready) {
        "Japanese voice ready"
    } else {
        "no Japanese voice detected yet — install one in your system's text-to-speech settings"
    }

val SPEECH_RATES = listOf(0.7, 0.85, 1.0, 1.15)

fun nearestRate(rate: Double): Double = SPEECH_RATES.minBy { kotlin.math.abs(it - rate) }

fun rateLabel(rate: Double): String {
    val snapped = nearestRate(rate)
    val text = if (snapped == snapped.toInt().toDouble()) snapped.toInt().toString() else snapped.toString()
    return "${text}×"
}
