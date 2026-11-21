package com.squirelworks.lsd.phrasebook

import com.squirelworks.lsd.core.languages.TextStore
import com.squirelworks.lsd.kana.WebViewStore
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.longOrNull

private val progressJson = Json { ignoreUnknownKeys = true }

@Serializable
data class PhrasebookProgress(
    val showKanji: Boolean = true,
    val showKana: Boolean = true,
    val showRomaji: Boolean = true,
    val rate: Double = 1.0,
    val recorded: Boolean = true,
    val flashDir: String = "en-ja",
    val flashAutoplay: Boolean = true,
    val favorites: List<String> = emptyList(),
    val learned: Map<String, Long> = emptyMap(),
    val importedWebView: Boolean = false,
)

fun readPhrasebookProgress(store: TextStore?): PhrasebookProgress =
    parsePhrasebookProgress(store?.read().orEmpty()) ?: PhrasebookProgress()

fun parsePhrasebookProgress(text: String): PhrasebookProgress? {
    if (text.isBlank()) return null
    return runCatching {
        val obj = progressJson.parseToJsonElement(text).jsonObject
        val favorites = obj["favorites"]?.jsonArray?.mapNotNull { element ->
            runCatching { element.jsonPrimitive.content }.getOrNull()
        } ?: emptyList()
        val learned = obj["learned"]?.jsonObject?.mapNotNull { (key, value) ->
            val prim = runCatching { value.jsonPrimitive }.getOrNull() ?: return@mapNotNull null
            val stamp = prim.longOrNull ?: prim.doubleOrNull?.toLong() ?: return@mapNotNull null
            key to stamp
        }?.toMap() ?: emptyMap()
        PhrasebookProgress(
            showKanji = obj.bool("showKanji") ?: true,
            showKana = obj.bool("showKana") ?: true,
            showRomaji = obj.bool("showRomaji") ?: true,
            rate = obj.double("rate") ?: 1.0,
            recorded = obj.bool("recorded") ?: true,
            flashDir = obj.string("flashDir") ?: "en-ja",
            flashAutoplay = obj.bool("flashAutoplay") ?: true,
            favorites = favorites,
            learned = learned,
            importedWebView = obj.bool("importedWebView") ?: false,
        )
    }.getOrNull()
}

fun writePhrasebookProgress(store: TextStore?, file: PhrasebookProgress) {
    store?.write(progressJson.encodeToString(file))
}

fun importPhrasebookProgress(native: PhrasebookProgress, legacy: WebViewStore): PhrasebookProgress {
    if (native.importedWebView) return native
    return when (legacy) {
        WebViewStore.Unreadable -> native
        WebViewStore.Absent -> native.copy(importedWebView = true)
        is WebViewStore.Value -> {
            val parsed = parsePhrasebookProgress(legacy.text) ?: return native
            if (native.hasOwnProgress()) native.copy(importedWebView = true)
            else parsed.copy(importedWebView = true)
        }
    }
}

fun adoptPhrasebookProgress(store: TextStore, legacy: WebViewStore) {
    val current = readPhrasebookProgress(store)
    val next = importPhrasebookProgress(current, legacy)
    if (next != current) writePhrasebookProgress(store, next)
}

private fun PhrasebookProgress.hasOwnProgress(): Boolean {
    if (favorites.isNotEmpty() || learned.isNotEmpty()) return true
    val fresh = PhrasebookProgress()
    return showKanji != fresh.showKanji || showKana != fresh.showKana || showRomaji != fresh.showRomaji ||
        rate != fresh.rate || recorded != fresh.recorded || flashDir != fresh.flashDir ||
        flashAutoplay != fresh.flashAutoplay
}

private fun JsonObject.bool(name: String): Boolean? =
    this[name]?.jsonPrimitive?.content?.toBooleanStrictOrNull()

private fun JsonObject.double(name: String): Double? =
    this[name]?.jsonPrimitive?.doubleOrNull

private fun JsonObject.string(name: String): String? =
    this[name]?.jsonPrimitive?.content
