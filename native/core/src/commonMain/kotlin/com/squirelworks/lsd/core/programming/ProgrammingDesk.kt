package com.squirelworks.lsd.core.programming

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
data class ProgrammingGroup(val id: String, val title: String, val sub: String = "")

@Serializable
data class ProgrammingCourse(
    val id: String,
    val name: String,
    val era: String = "",
    val blurb: String = "",
    val group: String = "modern",
    val tags: List<String> = emptyList(),
)

@Serializable
data class ProgrammingBlock(
    val id: String,
    val title: String,
    val sub: String = "",
    val items: List<ProgrammingCourse>,
)

@Serializable
data class ProgrammingCatalog(
    val groups: List<ProgrammingGroup>,
    val courses: List<ProgrammingCourse>,
    val levels: List<DeskLevel>,
    val defaultLevel: String,
    val features: List<DeskFeature>,
)

@Serializable
data class ProgrammingLayout(val view: String = "sections", val tag: String = "")

@Serializable
data class ProgrammingSync(val settings: String? = null, val view: String? = null)

private val programmingJson = Json { ignoreUnknownKeys = true }

const val PROGRAMMING_VIEW_KEY = "lsd-programming-view-v1"
const val PROGRAMMING_OLDER = "programming-older"
const val PROGRAMMING_JOKE = "programming-joke"

const val PROGRAMMING_SYNC_SCRIPT: String =
    "(function(){if(window.__psdSync)return;window.__psdSync=true;var last=null;" +
        "function send(){try{var body=JSON.stringify({settings:localStorage.getItem('lsd-settings')," +
        "view:localStorage.getItem('lsd-programming-view-v1')});" +
        "if(body===last)return;last=body;" +
        "navigator.sendBeacon('/desk-sync',new Blob([body],{type:'application/json'}));}catch(e){}}" +
        "window.addEventListener('pagehide',send);" +
        "document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')send();});" +
        "setInterval(send,1500);})();"

fun parseProgrammingCatalog(json: String): ProgrammingCatalog = programmingJson.decodeFromString(json)

fun encodeProgrammingLayout(layout: ProgrammingLayout): String = programmingJson.encodeToString(layout)

fun decodeProgrammingLayout(text: String): ProgrammingLayout =
    runCatching { programmingJson.decodeFromString<ProgrammingLayout>(text) }.getOrDefault(ProgrammingLayout())
        .let { if (it.view == "az") it else it.copy(view = "sections") }

data class ProgrammingState(val settings: DeskSettings, val layout: ProgrammingLayout)

// A saved category that the catalog no longer has goes back to All.
fun normalizeProgrammingLayout(layout: ProgrammingLayout, tags: Collection<String>): ProgrammingLayout {
    val view = if (layout.view == "az") "az" else "sections"
    val tag = if (layout.tag.isNotEmpty() && layout.tag !in tags) "" else layout.tag
    return ProgrammingLayout(view, tag)
}

// The first launch reads the WebView app's two keys once. Later launches keep the native copy.
fun importProgrammingWebView(
    settingsJson: String?,
    viewJson: String?,
    current: DeskSettings,
    layout: ProgrammingLayout,
    tags: Collection<String>,
): ProgrammingState {
    if (current.importedWebView) return ProgrammingState(current, normalizeProgrammingLayout(layout, tags))
    val settings = if (settingsJson == null) current else decodeDeskSettings(settingsJson, current)
    val next = if (viewJson == null) layout else decodeProgrammingLayout(viewJson)
    return ProgrammingState(settings.copy(importedWebView = true), normalizeProgrammingLayout(next, tags))
}

// A learner post, or values left behind when the app was killed. The imported flag stays as it was.
fun applyProgrammingSync(
    post: ProgrammingSync,
    current: DeskSettings,
    layout: ProgrammingLayout,
    tags: Collection<String>,
): ProgrammingState {
    val settings = if (post.settings == null) current
    else decodeDeskSettings(post.settings, current).copy(importedWebView = current.importedWebView)
    val next = if (post.view == null) layout else decodeProgrammingLayout(post.view)
    return ProgrammingState(settings, normalizeProgrammingLayout(next, tags))
}

fun programmingRules(catalog: ProgrammingCatalog): DeskRules = DeskRules(
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

fun programmingShows(rules: DeskRules, settings: DeskSettings): Pair<Boolean, Boolean> =
    rules.isOn(settings, PROGRAMMING_OLDER) to rules.isOn(settings, PROGRAMMING_JOKE)

private fun groupOf(course: ProgrammingCourse, groups: List<ProgrammingGroup>): String =
    if (groups.any { it.id == course.group }) course.group else "modern"

fun programmingTags(courses: List<ProgrammingCourse>): List<String> =
    courses.flatMap { it.tags }.distinct().sortedWith { a, b -> compareDisplayNames(a, b) }

fun arrangeProgramming(
    catalog: ProgrammingCatalog,
    layout: ProgrammingLayout,
    showOlder: Boolean,
    showJoke: Boolean,
): List<ProgrammingBlock> {
    val tag = layout.tag
    val list = catalog.courses.filter { course ->
        val group = groupOf(course, catalog.groups)
        if (group == "older" && !showOlder) return@filter false
        if (group == "joke" && !showJoke) return@filter false
        tag.isEmpty() || tag in course.tags
    }.sortedWith { a, b ->
        val byName = compareDisplayNames(a.name, b.name)
        if (byName != 0) byName else compareDisplayNames(a.id, b.id)
    }
    if (layout.view == "az") {
        return if (list.isEmpty()) emptyList()
        else listOf(ProgrammingBlock("az", "All languages, A–Z", "", list))
    }
    return catalog.groups.mapNotNull { group ->
        val items = list.filter { groupOf(it, catalog.groups) == group.id }
        if (items.isEmpty()) null else ProgrammingBlock(group.id, group.title, group.sub, items)
    }
}

fun programmingCourse(catalog: ProgrammingCatalog, lang: String): ProgrammingCourse? {
    val id = lang.trim().lowercase()
    if (id.isEmpty()) return null
    return catalog.courses.firstOrNull { it.id == id }
}

fun programmingSyncChanged(known: ProgrammingSync?, post: ProgrammingSync): Boolean = post != known

fun programmingSeedSnapshot(settings: DeskSettings, layout: ProgrammingLayout): ProgrammingSync =
    ProgrammingSync(
        settings = encodeDeskSettings(settings.copy(importedWebView = false)),
        view = encodeProgrammingLayout(ProgrammingLayout(view = if (layout.view == "az") "az" else "sections", tag = layout.tag)),
    )

fun programmingSeedDocument(settings: DeskSettings, layout: ProgrammingLayout, nextUrl: String): String {
    val seed = programmingSeedSnapshot(settings, layout)
    return """
<!DOCTYPE html>
<meta charset="utf-8">
<title>Programming Student Desk</title>
<script>
try {
  localStorage.setItem('lsd-settings', ${jsStringLiteral(seed.settings!!)});
  localStorage.setItem('$PROGRAMMING_VIEW_KEY', ${jsStringLiteral(seed.view!!)});
} catch (e) {}
location.replace(${jsStringLiteral(nextUrl)});
</script>
""".trim()
}

fun parseProgrammingSync(text: String?): ProgrammingSync? {
    if (text.isNullOrBlank() || text == "null") return null
    return runCatching { programmingJson.decodeFromString<ProgrammingSync>(text) }.getOrNull()
}

fun isProgrammingMenuUrl(url: String): Boolean {
    val bare = url.substringBefore('#').substringBefore('?')
    return bare.endsWith("/programming-student-desk/www/index.html") ||
        bare.endsWith("/programming-student-desk/index.html")
}
