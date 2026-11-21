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

// Copy the WebView store once. A later native file, or a second launch, is left alone.
fun importWebViewProgress(native: ProgressFile, legacyText: String?): ProgressFile {
    if (native.importedWebView) return native
    val legacy = legacyText?.let { parseProgress(it) }
    if (legacy == null || native.hasOwnProgress()) return native.copy(importedWebView = true)
    return legacy.copy(importedWebView = true)
}

private fun ProgressFile.hasOwnProgress(): Boolean {
    if (stats.isNotEmpty()) return true
    val fresh = ProgressFile()
    return voice != fresh.voice || rate != fresh.rate || showRoman != fresh.showRoman ||
        flashDir != fresh.flashDir || guide != fresh.guide || check != fresh.check || speed != fresh.speed
}

// Chromium localStorage keeps the key and the JSON as UTF-16, sometimes with
// a few marker bytes between them. Plain UTF-8 is accepted too.
fun extractStoredJson(bytes: ByteArray, key: String): String? {
    utf16Json(bytes, key)?.let { return it }
    return utf8Json(bytes, key)
}

private fun utf16Json(bytes: ByteArray, key: String): String? {
    val needle = utf16(key)
    var from = 0
    while (from < bytes.size) {
        val at = indexOf(bytes, needle, from)
        if (at < 0) return null
        val json = jsonFrom(bytes, at + needle.size, utf16 = true)
        if (json != null && parseProgress(json) != null) return json
        from = at + 2
    }
    return null
}

private fun utf8Json(bytes: ByteArray, key: String): String? {
    val needle = key.encodeToByteArray()
    var from = 0
    while (from < bytes.size) {
        val at = indexOf(bytes, needle, from)
        if (at < 0) return null
        val json = utf8Object(bytes, at + needle.size)
        if (json != null && parseProgress(json) != null) return json
        from = at + 1
    }
    return null
}

private fun utf8Object(bytes: ByteArray, start: Int): String? {
    var i = start
    val limit = minOf(bytes.size, start + 512)
    while (i < limit && bytes[i] != '{'.code.toByte()) i++
    if (i >= bytes.size || bytes[i] != '{'.code.toByte()) return null
    val begin = i
    var depth = 0
    var quoted = false
    var escaped = false
    while (i < bytes.size) {
        val ch = bytes[i].toInt().toChar()
        i++
        if (escaped) {
            escaped = false
            continue
        }
        if (ch == '\\' && quoted) {
            escaped = true
            continue
        }
        if (ch == '"') {
            quoted = !quoted
            continue
        }
        if (quoted || ch.code > 127) continue
        if (ch == '{') depth++
        if (ch == '}') {
            depth--
            if (depth == 0) return bytes.decodeToString(begin, i)
        }
    }
    return null
}

private fun jsonFrom(bytes: ByteArray, start: Int, utf16: Boolean): String? {
    val step = if (utf16) 2 else 1
    var i = start
    val limit = minOf(bytes.size, start + 256 * step)
    while (i + step <= limit) {
        if (charAt(bytes, i, utf16) == '{') break
        i += step
    }
    if (i + step > bytes.size || charAt(bytes, i, utf16) != '{') return null
    val out = StringBuilder()
    var depth = 0
    var quoted = false
    var escaped = false
    while (i + step <= bytes.size) {
        val ch = charAt(bytes, i, utf16) ?: return null
        i += step
        out.append(ch)
        if (escaped) {
            escaped = false
            continue
        }
        if (ch == '\\' && quoted) {
            escaped = true
            continue
        }
        if (ch == '"') {
            quoted = !quoted
            continue
        }
        if (quoted) continue
        if (ch == '{') depth++
        if (ch == '}') {
            depth--
            if (depth == 0) return out.toString()
        }
    }
    return null
}

private fun charAt(bytes: ByteArray, index: Int, utf16: Boolean): Char? {
    if (!utf16) return if (index < bytes.size) bytes[index].toInt().toChar() else null
    if (index + 1 >= bytes.size) return null
    val low = bytes[index].toInt() and 0xff
    val high = bytes[index + 1].toInt() and 0xff
    return (high shl 8 or low).toChar()
}

private fun utf16(text: String): ByteArray {
    val out = ByteArray(text.length * 2)
    text.forEachIndexed { index, ch ->
        out[index * 2] = (ch.code and 0xff).toByte()
        out[index * 2 + 1] = (ch.code shr 8 and 0xff).toByte()
    }
    return out
}

private fun indexOf(bytes: ByteArray, needle: ByteArray, from: Int): Int {
    if (needle.isEmpty() || from < 0) return -1
    var i = from
    while (i + needle.size <= bytes.size) {
        var matched = true
        for (j in needle.indices) {
            if (bytes[i + j] != needle[j]) {
                matched = false
                break
            }
        }
        if (matched) return i
        i++
    }
    return -1
}

private fun JsonObject.bool(name: String): Boolean? = this[name]?.jsonPrimitive?.content?.toBooleanStrictOrNull()

private fun JsonObject.float(name: String): Float? = this[name]?.jsonPrimitive?.content?.toFloatOrNull()

private fun JsonObject.int(name: String): Int? = this[name]?.jsonPrimitive?.content?.toIntOrNull()

private fun JsonObject.string(name: String): String? = this[name]?.jsonPrimitive?.content

fun writeProgress(store: TextStore?, file: ProgressFile) {
    store?.write(progressJson.encodeToString(file))
}

fun adoptWebViewProgress(store: TextStore, legacyText: String?) {
    val current = readProgress(store)
    val next = importWebViewProgress(current, legacyText)
    if (next != current) writeProgress(store, next)
}

fun ProgressFile.stat(key: String): PracticeStat {
    val wire = stats[key] ?: return PracticeStat()
    return PracticeStat(wire.c, wire.w, wire.s)
}

fun ProgressFile.withStat(key: String, stat: PracticeStat) =
    copy(stats = stats + (key to StatWire(stat.correct, stat.wrong, stat.streak)))
