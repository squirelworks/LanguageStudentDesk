package com.squirelworks.lsd.core.desk

import com.squirelworks.lsd.core.languages.compareDisplayNames
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class DeskLevel(val id: String, val label: String, val description: String = "")

@Serializable
data class DeskFeature(
    val id: String,
    val label: String,
    val description: String = "",
    val level: String,
    val added: String = "",
)

@Serializable
data class DeskText(
    val notice: String = "",
    val welcomeTitle: String = "Welcome",
    val welcomeBody: String = "",
    val whatsInApp: String = "What's in the app",
    val customize: String = "Customize",
    val custom: String = "Custom",
)

@Serializable
data class DeskSettings(
    val level: String,
    val switches: Map<String, Boolean> = emptyMap(),
    val noticeDismissed: Boolean = false,
    val welcomeDone: Boolean = false,
    val importedWebView: Boolean = false,
    // The Tools menu's "Open scoped tools in" choice. The WebView stores it as
    // lsd-suite-lang, separate from lsd-settings.
    val suiteLang: String = "",
)

@Serializable
data class DeskLanguage(
    val id: String,
    val name: String,
    val nativeName: String = "",
    val shipped: Boolean = false,
    val requires: List<String> = emptyList(),
)

@Serializable
data class DeskCourse(val id: String, val name: String, val group: String = "")

@Serializable
data class DeskLearner(
    val id: String,
    val title: String,
    val description: String,
    val href: String,
    val scoped: Boolean,
    val requires: List<String> = emptyList(),
)

@Serializable
data class DeskCatalog(
    val levels: List<DeskLevel>,
    val defaultLevel: String,
    val features: List<DeskFeature>,
    val featured: List<String>,
    val text: DeskText = DeskText(),
    val languages: List<DeskLanguage>,
    val courses: List<DeskCourse>,
    val learners: List<DeskLearner>,
)

private val deskJson = Json { ignoreUnknownKeys = true }

fun parseDeskCatalog(json: String): DeskCatalog = deskJson.decodeFromString(json)

fun encodeDeskSettings(settings: DeskSettings): String = deskJson.encodeToString(settings)

fun decodeDeskSettings(text: String, fallback: DeskSettings): DeskSettings =
    runCatching { deskJson.decodeFromString<DeskSettings>(text) }.getOrDefault(fallback)

// The first launch reads the WebView app's localStorage once. After that, each
// learner open writes the native copy in, and closing the learner reads it back.
fun importDeskWebView(
    settingsJson: String?,
    favoritesJson: String?,
    current: DeskSettings,
    currentFavorites: Set<String>,
    suiteLang: String? = null,
): DeskImport {
    if (current.importedWebView) return DeskImport(current, currentFavorites)
    val applied = applyDeskWebSnapshot(DeskWebSnapshot(settingsJson, favoritesJson, suiteLang), current, currentFavorites)
    return DeskImport(applied.settings.copy(importedWebView = true), applied.favorites)
}

@Serializable
data class DeskWebSnapshot(
    val settings: String? = null,
    val favorites: String? = null,
    val lang: String? = null,
)

// What the learner pages read: lsd-settings, lsd-favorite-languages, lsd-suite-lang.
// A null field means that key was missing, so the native copy stays.
fun applyDeskWebSnapshot(
    snapshot: DeskWebSnapshot,
    current: DeskSettings,
    currentFavorites: Set<String>,
): DeskImport {
    val parsed = snapshot.settings?.let { runCatching { deskJson.decodeFromString<DeskSettings>(it) }.getOrNull() }
    var settings = if (parsed == null) current
    else parsed.copy(importedWebView = current.importedWebView, suiteLang = current.suiteLang)
    if (snapshot.lang != null) settings = settings.copy(suiteLang = snapshot.lang)
    val stars = snapshot.favorites?.let { runCatching { deskJson.decodeFromString<List<String>>(it) }.getOrNull() }
    val favorites = if (stars == null) currentFavorites else stars.filter { it.isNotEmpty() }.toCollection(linkedSetOf())
    return DeskImport(settings, favorites)
}

fun parseDeskWebSnapshot(evaluateResult: String?): DeskWebSnapshot? {
    if (evaluateResult.isNullOrBlank() || evaluateResult == "null") return null
    return runCatching { deskJson.decodeFromString<DeskWebSnapshot>(evaluateResult) }.getOrNull()
}

// A tiny page loaded with the learner's own file URL as its base, so the
// localStorage write lands in the origin the learner scripts read.
fun deskSeedDocument(settings: DeskSettings, favoriteIds: Iterable<String>, nextUrl: String): String {
    val settingsJson = encodeDeskSettings(settings.copy(importedWebView = false))
    val favoritesJson = deskJson.encodeToString(favoriteIds.toList())
    val langLine = if (settings.suiteLang.isEmpty()) {
        "localStorage.removeItem('lsd-suite-lang');"
    } else {
        "localStorage.setItem('lsd-suite-lang', ${jsStringLiteral(settings.suiteLang)});"
    }
    return """
<!DOCTYPE html>
<meta charset="utf-8">
<title>Language Student Desk</title>
<script>
try {
  localStorage.setItem('lsd-settings', ${jsStringLiteral(settingsJson)});
  localStorage.setItem('lsd-favorite-languages', ${jsStringLiteral(favoritesJson)});
  $langLine
} catch (e) {}
location.replace(${jsStringLiteral(nextUrl)});
</script>
""".trim()
}

fun jsStringLiteral(value: String): String = buildString {
    append('"')
    for (ch in value) {
        when (ch) {
            '\\' -> append("\\\\")
            '"' -> append("\\\"")
            '\n' -> append("\\n")
            '\r' -> append("\\r")
            '<' -> append("\\u003c")
            else -> append(ch)
        }
    }
    append('"')
}

// The packed suite menu, and the copy that still lives under lsd-suite.
// A learner's own index, and another app's www/index.html, are not the menu.
// The desktop server serves the packed www/ at the site root, so /index.html is the menu there.
fun isDeskMenuUrl(url: String): Boolean {
    val bare = percentDecode(url.substringBefore('#').substringBefore('?')).trimEnd('/')
    if (bare.endsWith("/android_asset/www/index.html") ||
        bare.endsWith("/lsd-suite/www/index.html") ||
        bare.endsWith("/lsd-suite/index.html")
    ) {
        return bare.startsWith("file:") || bare.startsWith("http://127.0.0.1") || bare.startsWith("http://localhost")
    }
    if (!(bare.startsWith("http://127.0.0.1") || bare.startsWith("http://localhost"))) return false
    val path = bare.substringAfter("://").substringAfter('/')
    return path == "index.html"
}

// Posted by a learner page so the desktop Desk hears changes without waiting for the tab to close.
const val DESK_SYNC_SCRIPT: String =
    "(function(){if(window.__lsdDeskSync)return;window.__lsdDeskSync=true;" +
        "function send(){try{var body=JSON.stringify({settings:localStorage.getItem('lsd-settings')," +
        "favorites:localStorage.getItem('lsd-favorite-languages'),lang:localStorage.getItem('lsd-suite-lang')});" +
        "navigator.sendBeacon('/desk-sync',new Blob([body],{type:'application/json'}));}catch(e){}}" +
        "window.addEventListener('pagehide',send);" +
        "document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')send();});" +
        "setInterval(send,1500);})();"

fun injectDeskSync(html: String): String {
    if (html.contains("__lsdDeskSync")) return html
    val tag = "<script>$DESK_SYNC_SCRIPT</script>"
    val head = html.indexOf("<head>", ignoreCase = true)
    if (head >= 0) return html.replaceRange(head + "<head>".length, head + "<head>".length, tag)
    return tag + html
}

private fun percentDecode(text: String): String = buildString {
    var index = 0
    while (index < text.length) {
        val ch = text[index]
        if (ch == '%' && index + 2 < text.length) {
            val value = text.substring(index + 1, index + 3).toIntOrNull(16)
            if (value != null) {
                append(value.toChar())
                index += 3
                continue
            }
        }
        append(ch)
        index++
    }
}

data class DeskImport(val settings: DeskSettings, val favorites: Set<String>)

fun deskLabel(language: DeskLanguage): String =
    if (language.nativeName.isBlank()) language.name else "${language.name} · ${language.nativeName}"

// Same rules as languages/lsd-features.js. A named level turns on every feature
// at that rank or below. Custom keeps an explicit switch for each feature, and
// collapses back to a named level when the switches match one.
class DeskRules(private val catalog: DeskCatalog) {
    private val levelRank = catalog.levels.mapIndexed { index, level -> level.id to index }.toMap()

    fun fresh(): DeskSettings = DeskSettings(level = catalog.defaultLevel.ifBlank { catalog.levels.firstOrNull()?.id ?: "simple" })

    fun isOn(settings: DeskSettings, id: String): Boolean {
        val feature = catalog.features.firstOrNull { it.id == id } ?: return false
        if (settings.level == "custom") return settings.switches[id] == true
        return rank(feature.level) <= rank(settings.level)
    }

    fun allows(settings: DeskSettings, requires: List<String>): Boolean =
        requires.all { isOn(settings, it) }

    fun setLevel(settings: DeskSettings, id: String): DeskSettings {
        if (id !in levelRank) return settings
        return settings.copy(level = id, switches = emptyMap())
    }

    fun setSwitch(settings: DeskSettings, id: String, on: Boolean): DeskSettings {
        if (catalog.features.none { it.id == id }) return settings
        val now = catalog.features.associate { it.id to isOn(settings, it.id) }.toMutableMap()
        now[id] = on
        val match = catalog.levels.firstOrNull { level ->
            catalog.features.all { feature -> now[feature.id] == (rank(feature.level) <= rank(level.id)) }
        }
        return if (match != null) settings.copy(level = match.id, switches = emptyMap())
        else settings.copy(level = "custom", switches = now)
    }

    fun featured(settingsIgnored: DeskSettings = fresh()): List<DeskLanguage> {
        val byId = catalog.languages.associateBy { it.id }
        return catalog.featured.mapNotNull { byId[it] }.filter { it.shipped }
    }

    fun customizeOrder(): List<DeskFeature> =
        catalog.features.sortedWith(compareByDescending<DeskFeature> { it.added }.thenBy { it.label })

    private fun rank(level: String): Int = levelRank[level] ?: 0
}

// Favorites first, in the order they were starred, then every other language
// A–Z by the name on the row. A starred language is not listed twice.
fun sortDeskLanguages(languages: List<DeskLanguage>, favoriteIds: List<String>): List<DeskLanguage> {
    val byId = languages.associateBy { it.id }
    val shown = mutableSetOf<String>()
    val out = mutableListOf<DeskLanguage>()
    fun push(language: DeskLanguage?) {
        if (language == null || language.id in shown) return
        shown += language.id
        out += language
    }
    favoriteIds.forEach { push(byId[it]) }
    languages.sortedWith { a, b ->
        val byName = compareDisplayNames(a.name, b.name)
        if (byName != 0) byName else compareDisplayNames(a.id, b.id)
    }.forEach { push(it) }
    return out
}
