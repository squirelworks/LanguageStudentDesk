package com.squirelworks.lsd.kanji

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
data class KanjiProgress(
    val seen: Map<String, Int> = emptyMap(),
    val importedWebView: Boolean = false,
)

fun readKanjiProgress(store: TextStore?): KanjiProgress = parseKanjiProgress(store?.read().orEmpty()) ?: KanjiProgress()

fun parseKanjiProgress(text: String): KanjiProgress? {
    if (text.isBlank()) return null
    return runCatching {
        val obj = progressJson.parseToJsonElement(text).jsonObject
        val seen = obj["seen"]?.jsonObject.orEmpty().mapNotNull { (char, value) ->
            val count = value.jsonPrimitive.intOrNull ?: return@mapNotNull null
            char to count
        }.toMap()
        val imported = obj["importedWebView"]?.jsonPrimitive?.content?.toBooleanStrictOrNull() ?: false
        KanjiProgress(seen, imported)
    }.getOrNull()
}

fun writeKanjiProgress(store: TextStore?, file: KanjiProgress) {
    store?.write(progressJson.encodeToString(file))
}

fun KanjiProgress.mark(char: String): KanjiProgress =
    copy(seen = seen + (char to ((seen[char] ?: 0) + 1)))

// Copy the WebView seen-counts once. A later native file is left alone.
// A store that is present but cannot be read stays unmarked, so a later launch can retry.
fun importKanjiProgress(native: KanjiProgress, legacy: WebViewStore): KanjiProgress {
    if (native.importedWebView) return native
    return when (legacy) {
        WebViewStore.Unreadable -> native
        WebViewStore.Absent -> native.copy(importedWebView = true)
        is WebViewStore.Value -> {
            if (native.seen.isNotEmpty()) native.copy(importedWebView = true)
            else (parseKanjiProgress(legacy.text) ?: KanjiProgress()).copy(importedWebView = true)
        }
    }
}

fun adoptKanjiProgress(store: TextStore, legacy: WebViewStore) {
    val current = readKanjiProgress(store)
    val next = importKanjiProgress(current, legacy)
    if (next != current) writeKanjiProgress(store, next)
}
