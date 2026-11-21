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

// One read of the WebView's localStorage. Settings use lsd-settings and stars
// use lsd-favorite-languages. A later launch keeps the native copies.
fun importDeskWebView(
    settingsJson: String?,
    favoritesJson: String?,
    current: DeskSettings,
    currentFavorites: Set<String>,
): DeskImport {
    if (current.importedWebView) return DeskImport(current, currentFavorites)
    val imported = settingsJson?.let { runCatching { deskJson.decodeFromString<DeskSettings>(it) }.getOrNull() } ?: current
    val stars = favoritesJson?.let { runCatching { deskJson.decodeFromString<List<String>>(it) }.getOrNull() }?.toSet()
        ?: currentFavorites
    return DeskImport(imported.copy(importedWebView = true), stars)
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
