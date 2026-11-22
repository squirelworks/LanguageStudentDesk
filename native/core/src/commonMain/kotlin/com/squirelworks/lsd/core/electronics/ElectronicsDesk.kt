package com.squirelworks.lsd.core.electronics

import com.squirelworks.lsd.core.desk.DeskFeature
import com.squirelworks.lsd.core.desk.DeskLevel
import com.squirelworks.lsd.core.desk.DeskRules
import com.squirelworks.lsd.core.desk.DeskSettings
import com.squirelworks.lsd.core.desk.decodeDeskSettings
import com.squirelworks.lsd.core.desk.encodeDeskSettings
import com.squirelworks.lsd.core.desk.jsStringLiteral
import com.squirelworks.lsd.core.languages.compareDisplayNames
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class ElectronicsGroup(val id: String, val title: String, val sub: String = "")

@Serializable
data class ElectronicsCourse(
    val id: String,
    val name: String,
    val era: String = "",
    val blurb: String = "",
    val group: String = "foundations",
    val tags: List<String> = emptyList(),
)

@Serializable
data class ElectronicsBlock(
    val id: String,
    val title: String,
    val sub: String = "",
    val items: List<ElectronicsCourse>,
)

@Serializable
data class ElectronicsCatalog(
    val groups: List<ElectronicsGroup>,
    val courses: List<ElectronicsCourse>,
    val levels: List<DeskLevel>,
    val defaultLevel: String,
    val features: List<DeskFeature>,
)

@Serializable
data class ElectronicsLayout(val view: String = "sections", val tag: String = "")

@Serializable
data class ElectronicsSync(val settings: String? = null, val view: String? = null)

data class ElectronicsState(val settings: DeskSettings, val layout: ElectronicsLayout)

private val electronicsJson = Json { ignoreUnknownKeys = true }

const val ELECTRONICS_VIEW_KEY = "lsd-electronics-view-v1"

const val ELECTRONICS_SYNC_SCRIPT: String =
    "(function(){if(window.__esdSync)return;window.__esdSync=true;var last=null;" +
        "function send(){try{var body=JSON.stringify({settings:localStorage.getItem('lsd-settings')," +
        "view:localStorage.getItem('lsd-electronics-view-v1')});" +
        "if(body===last)return;last=body;" +
        "navigator.sendBeacon('/desk-sync',new Blob([body],{type:'application/json'}));}catch(e){}}" +
        "window.addEventListener('pagehide',send);" +
        "document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')send();});" +
        "setInterval(send,1500);})();"

fun parseElectronicsCatalog(json: String): ElectronicsCatalog = electronicsJson.decodeFromString(json)

fun encodeElectronicsLayout(layout: ElectronicsLayout): String = electronicsJson.encodeToString(layout)

fun decodeElectronicsLayout(text: String): ElectronicsLayout =
    runCatching { electronicsJson.decodeFromString<ElectronicsLayout>(text) }.getOrDefault(ElectronicsLayout())
        .let { if (it.view == "az") it else it.copy(view = "sections") }

fun normalizeElectronicsLayout(layout: ElectronicsLayout, tags: Collection<String>): ElectronicsLayout {
    val view = if (layout.view == "az") "az" else "sections"
    val tag = if (layout.tag.isNotEmpty() && layout.tag !in tags) "" else layout.tag
    return ElectronicsLayout(view, tag)
}

fun electronicsRules(catalog: ElectronicsCatalog): DeskRules = DeskRules(
    com.squirelworks.lsd.core.desk.DeskCatalog(
        levels = catalog.levels,
        defaultLevel = catalog.defaultLevel,
        features = catalog.features,
        featured = emptyList(),
        languages = emptyList(),
        courses = emptyList(),
        learners = emptyList(),
    ),
)

private fun groupOf(course: ElectronicsCourse, groups: List<ElectronicsGroup>): String =
    if (groups.any { it.id == course.group }) course.group else "foundations"

fun electronicsTags(courses: List<ElectronicsCourse>): List<String> =
    courses.flatMap { it.tags }.distinct().sortedWith { a, b -> compareDisplayNames(a, b) }

fun arrangeElectronics(catalog: ElectronicsCatalog, layout: ElectronicsLayout): List<ElectronicsBlock> {
    val tag = layout.tag
    val list = catalog.courses.filter { tag.isEmpty() || tag in it.tags }.sortedWith { a, b ->
        val byName = compareDisplayNames(a.name, b.name)
        if (byName != 0) byName else compareDisplayNames(a.id, b.id)
    }
    if (layout.view == "az") {
        return if (list.isEmpty()) emptyList() else listOf(ElectronicsBlock("az", "All courses, A–Z", "", list))
    }
    return catalog.groups.mapNotNull { group ->
        val items = list.filter { groupOf(it, catalog.groups) == group.id }
        if (items.isEmpty()) null else ElectronicsBlock(group.id, group.title, group.sub, items)
    }
}

fun electronicsCourse(catalog: ElectronicsCatalog, lang: String): ElectronicsCourse? {
    val id = lang.trim().lowercase()
    if (id.isEmpty()) return null
    return catalog.courses.firstOrNull { it.id == id }
}

fun electronicsSyncChanged(known: ElectronicsSync?, post: ElectronicsSync): Boolean = post != known

fun importElectronicsWebView(
    settingsJson: String?,
    viewJson: String?,
    current: DeskSettings,
    layout: ElectronicsLayout,
    tags: Collection<String>,
): ElectronicsState {
    if (current.importedWebView) return ElectronicsState(current, normalizeElectronicsLayout(layout, tags))
    val settings = if (settingsJson == null) current else decodeDeskSettings(settingsJson, current)
    val next = if (viewJson == null) layout else decodeElectronicsLayout(viewJson)
    return ElectronicsState(settings.copy(importedWebView = true), normalizeElectronicsLayout(next, tags))
}

fun applyElectronicsSync(
    post: ElectronicsSync,
    current: DeskSettings,
    layout: ElectronicsLayout,
    tags: Collection<String>,
): ElectronicsState {
    val settings = if (post.settings == null) current
    else decodeDeskSettings(post.settings, current).copy(importedWebView = current.importedWebView)
    val next = if (post.view == null) layout else decodeElectronicsLayout(post.view)
    return ElectronicsState(settings, normalizeElectronicsLayout(next, tags))
}

fun electronicsSeedSnapshot(settings: DeskSettings, layout: ElectronicsLayout): ElectronicsSync = ElectronicsSync(
    settings = encodeDeskSettings(settings.copy(importedWebView = false)),
    view = encodeElectronicsLayout(ElectronicsLayout(view = if (layout.view == "az") "az" else "sections", tag = layout.tag)),
)

fun electronicsSeedDocument(settings: DeskSettings, layout: ElectronicsLayout, nextUrl: String): String {
    val seed = electronicsSeedSnapshot(settings, layout)
    return """
<!DOCTYPE html>
<meta charset="utf-8">
<title>Electronics Student Desk</title>
<script>
try {
  localStorage.setItem('lsd-settings', ${jsStringLiteral(seed.settings!!)});
  localStorage.setItem('$ELECTRONICS_VIEW_KEY', ${jsStringLiteral(seed.view!!)});
} catch (e) {}
location.replace(${jsStringLiteral(nextUrl)});
</script>
""".trim()
}

fun parseElectronicsSync(text: String?): ElectronicsSync? {
    if (text.isNullOrBlank() || text == "null") return null
    return runCatching { electronicsJson.decodeFromString<ElectronicsSync>(text) }.getOrNull()
}

fun isElectronicsMenuUrl(url: String): Boolean {
    val bare = url.substringBefore('#').substringBefore('?')
    return bare.endsWith("/electronics-student-desk/www/index.html") ||
        bare.endsWith("/electronics-student-desk/index.html")
}
