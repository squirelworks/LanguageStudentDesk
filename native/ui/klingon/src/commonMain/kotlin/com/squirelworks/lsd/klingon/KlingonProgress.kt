package com.squirelworks.lsd.klingon

import com.squirelworks.lsd.core.languages.TextStore
import com.squirelworks.lsd.kana.WebViewStore
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

private val progressJson = Json { ignoreUnknownKeys = true }

@Serializable
data class KlingonStat(val c: Int = 0, val w: Int = 0, val s: Int = 0)

@Serializable
data class KlingonProgress(
    val voice: Boolean = true,
    val showRoman: Boolean = true,
    val flashDir: String = "glyph",
    val guide: Boolean = true,
    val check: Boolean = true,
    val font: String = "hand",
    val speed: Int = 90,
    val stats: Map<String, KlingonStat> = emptyMap(),
    val written: Map<String, Int> = emptyMap(),
    val importedWebView: Boolean = false,
) {
    fun mastered(key: String): Boolean = (stats[key]?.s ?: 0) >= 3

    fun weak(key: String): Boolean {
        val stat = stats[key] ?: return false
        return stat.w > 0 && stat.s < 3
    }

    fun record(key: String, correct: Boolean): KlingonProgress {
        val stat = stats[key] ?: KlingonStat()
        val next = if (correct) stat.copy(c = stat.c + 1, s = stat.s + 1) else stat.copy(w = stat.w + 1, s = 0)
        return copy(stats = stats + (key to next))
    }

    fun wrote(key: String): KlingonProgress =
        copy(written = written + (key to ((written[key] ?: 0) + 1)))
}

fun readKlingonProgress(store: TextStore?): KlingonProgress =
    parseKlingonProgress(store?.read().orEmpty()) ?: KlingonProgress()

fun parseKlingonProgress(text: String): KlingonProgress? {
    if (text.isBlank()) return null
    return runCatching {
        val obj = progressJson.parseToJsonElement(text).jsonObject
        val stats = obj["stats"]?.jsonObject.orEmpty().mapValues { (_, value) ->
            val stat = value.jsonObject
            KlingonStat(stat.int("c"), stat.int("w"), stat.int("s"))
        }
        val written = obj["written"]?.jsonObject.orEmpty().mapNotNull { (key, value) ->
            val count = value.jsonPrimitive.intOrNull ?: return@mapNotNull null
            key to count
        }.toMap()
        KlingonProgress(
            voice = obj.bool("voice") ?: true,
            showRoman = obj.bool("showRoman") ?: true,
            flashDir = obj.string("flashDir") ?: "glyph",
            guide = obj.bool("guide") ?: true,
            check = obj.bool("check") ?: true,
            font = obj.string("font") ?: "hand",
            speed = obj.int("speed") ?: 90,
            stats = stats,
            written = written,
            importedWebView = obj.bool("importedWebView") ?: false,
        )
    }.getOrNull()
}

fun writeKlingonProgress(store: TextStore?, file: KlingonProgress) {
    store?.write(progressJson.encodeToString(file))
}

fun importKlingonProgress(native: KlingonProgress, legacy: WebViewStore): KlingonProgress {
    if (native.importedWebView) return native
    return when (legacy) {
        WebViewStore.Unreadable -> native
        WebViewStore.Absent -> native.copy(importedWebView = true)
        is WebViewStore.Value -> {
            if (native.stats.isNotEmpty() || native.written.isNotEmpty()) native.copy(importedWebView = true)
            else (parseKlingonProgress(legacy.text) ?: KlingonProgress()).copy(importedWebView = true)
        }
    }
}

fun adoptKlingonProgress(store: TextStore, legacy: WebViewStore) {
    val current = readKlingonProgress(store)
    val next = importKlingonProgress(current, legacy)
    if (next != current) writeKlingonProgress(store, next)
}

private fun kotlinx.serialization.json.JsonObject.bool(name: String): Boolean? =
    this[name]?.jsonPrimitive?.content?.toBooleanStrictOrNull()

private fun kotlinx.serialization.json.JsonObject.int(name: String): Int =
    this[name]?.jsonPrimitive?.intOrNull ?: 0

private fun kotlinx.serialization.json.JsonObject.string(name: String): String? =
    this[name]?.jsonPrimitive?.content
