package com.squirelworks.lsd.kana

import com.squirelworks.lsd.core.languages.TextStore
import com.squirelworks.lsd.core.trainer.PracticeStat
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

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
    val importedWebView: Boolean = false,
)

private val progressJson = Json { ignoreUnknownKeys = true }

fun readProgress(store: TextStore?): ProgressFile = parseProgress(store?.read().orEmpty()) ?: ProgressFile()

fun parseProgress(text: String): ProgressFile? {
    if (text.isBlank()) return null
    return runCatching {
        val obj = progressJson.parseToJsonElement(text).jsonObject
        ProgressFile(
            voice = obj.bool("voice") ?: true,
            rate = obj.float("rate") ?: 1f,
            showRoman = obj.bool("showRoman") ?: true,
            flashDir = obj.string("flashDir") ?: "glyph",
            guide = obj.bool("guide") ?: true,
            check = obj.bool("check") ?: true,
            speed = obj.int("speed") ?: 70,
            stats = obj["stats"]?.jsonObject.orEmpty().mapValues { (_, value) ->
                val stat = value.jsonObject
                StatWire(stat.int("c") ?: 0, stat.int("w") ?: 0, stat.int("s") ?: 0)
            },
            importedWebView = obj.bool("importedWebView") ?: false,
        )
    }.getOrNull()
}

sealed interface WebViewStore {
    data object Absent : WebViewStore
    data class Value(val text: String) : WebViewStore
    data object Unreadable : WebViewStore
}

// Copy the WebView store once. A later native file, or a second launch, is left alone.
// A store that is present but cannot be read stays unmarked, so a later build can retry.
fun importWebViewProgress(native: ProgressFile, legacy: WebViewStore): ProgressFile {
    if (native.importedWebView) return native
    return when (legacy) {
        WebViewStore.Unreadable -> native
        WebViewStore.Absent -> native.copy(importedWebView = true)
        is WebViewStore.Value -> {
            val parsed = parseProgress(legacy.text) ?: return native
            if (native.hasOwnProgress()) native.copy(importedWebView = true)
            else parsed.copy(importedWebView = true)
        }
    }
}

private fun ProgressFile.hasOwnProgress(): Boolean {
    if (stats.isNotEmpty()) return true
    val fresh = ProgressFile()
    return voice != fresh.voice || rate != fresh.rate || showRoman != fresh.showRoman ||
        flashDir != fresh.flashDir || guide != fresh.guide || check != fresh.check || speed != fresh.speed
}

private fun JsonObject.bool(name: String): Boolean? = this[name]?.jsonPrimitive?.content?.toBooleanStrictOrNull()

private fun JsonObject.float(name: String): Float? = this[name]?.jsonPrimitive?.content?.toFloatOrNull()

private fun JsonObject.int(name: String): Int? = this[name]?.jsonPrimitive?.content?.toIntOrNull()

private fun JsonObject.string(name: String): String? = this[name]?.jsonPrimitive?.content

fun writeProgress(store: TextStore?, file: ProgressFile) {
    store?.write(progressJson.encodeToString(file))
}

fun adoptWebViewProgress(store: TextStore, legacy: WebViewStore) {
    val current = readProgress(store)
    val next = importWebViewProgress(current, legacy)
    if (next != current) writeProgress(store, next)
}

fun ProgressFile.stat(key: String): PracticeStat {
    val wire = stats[key] ?: return PracticeStat()
    return PracticeStat(wire.c, wire.w, wire.s)
}

fun ProgressFile.withStat(key: String, stat: PracticeStat) =
    copy(stats = stats + (key to StatWire(stat.correct, stat.wrong, stat.streak)))
