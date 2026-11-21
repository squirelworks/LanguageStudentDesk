package com.squirelworks.lsd.kana

import com.squirelworks.lsd.core.languages.TextStore
import com.squirelworks.lsd.core.trainer.PracticeStat
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

@Serializable
data class StatWire(val c: Int = 0, val w: Int = 0, val s: Int = 0)

@Serializable
data class ProgressFile(
    val voice: Boolean = true,
    val rate: Float = 1f,
    val showRoman: Boolean = true,
    val flashDir: String = "glyph",
    val guide: Boolean = true,
    val check: Boolean = true,
    val speed: Int = 70,
    val stats: Map<String, StatWire> = emptyMap(),
)

private val progressJson = Json { ignoreUnknownKeys = true }

fun readProgress(store: TextStore?): ProgressFile {
    val text = store?.read().orEmpty()
    if (text.isBlank()) return ProgressFile()
    return runCatching { progressJson.decodeFromString<ProgressFile>(text) }.getOrDefault(ProgressFile())
}

fun writeProgress(store: TextStore?, file: ProgressFile) {
    store?.write(progressJson.encodeToString(file))
}

fun ProgressFile.stat(key: String): PracticeStat {
    val wire = stats[key] ?: return PracticeStat()
    return PracticeStat(wire.c, wire.w, wire.s)
}

fun ProgressFile.withStat(key: String, stat: PracticeStat) =
    copy(stats = stats + (key to StatWire(stat.correct, stat.wrong, stat.streak)))
