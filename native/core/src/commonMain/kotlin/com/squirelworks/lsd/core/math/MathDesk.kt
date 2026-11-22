package com.squirelworks.lsd.core.math

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
data class MathGroup(val id: String, val title: String, val sub: String = "")

@Serializable
data class MathCourse(
    val id: String,
    val name: String,
    val era: String = "",
    val blurb: String = "",
    val group: String = "foundations",
    val tags: List<String> = emptyList(),
)

@Serializable
data class MathBlock(val id: String, val title: String, val sub: String = "", val items: List<MathCourse>)

@Serializable
data class MathCatalog(
    val groups: List<MathGroup>,
    val courses: List<MathCourse>,
    val levels: List<DeskLevel>,
    val defaultLevel: String,
    val features: List<DeskFeature>,
)

@Serializable
data class MathLayout(val view: String = "sections", val tag: String = "")

@Serializable
data class MathSync(val settings: String? = null, val view: String? = null)

data class MathState(val settings: DeskSettings, val layout: MathLayout)

private val mathJson = Json { ignoreUnknownKeys = true }

const val MATH_VIEW_KEY = "lsd-math-view-v1"

const val MATH_SYNC_SCRIPT: String =
    "(function(){if(window.__methSync)return;window.__methSync=true;var last=null;" +
        "function send(){try{var body=JSON.stringify({settings:localStorage.getItem('lsd-settings')," +
        "view:localStorage.getItem('lsd-math-view-v1')});" +
        "if(body===last)return;last=body;" +
        "navigator.sendBeacon('/desk-sync',new Blob([body],{type:'application/json'}));}catch(e){}}" +
        "window.addEventListener('pagehide',send);" +
        "document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')send();});" +
        "setInterval(send,1500);})();"

fun parseMathCatalog(json: String): MathCatalog = mathJson.decodeFromString(json)

fun encodeMathLayout(layout: MathLayout): String = mathJson.encodeToString(layout)

fun decodeMathLayout(text: String): MathLayout =
    runCatching { mathJson.decodeFromString<MathLayout>(text) }.getOrDefault(MathLayout())
        .let { if (it.view == "az") it else it.copy(view = "sections") }

fun normalizeMathLayout(layout: MathLayout, tags: Collection<String>): MathLayout {
    val view = if (layout.view == "az") "az" else "sections"
    val tag = if (layout.tag.isNotEmpty() && layout.tag !in tags) "" else layout.tag
    return MathLayout(view, tag)
}

fun mathRules(catalog: MathCatalog): DeskRules = DeskRules(
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

private fun groupOf(course: MathCourse, groups: List<MathGroup>): String =
    if (groups.any { it.id == course.group }) course.group else "foundations"

fun mathTags(courses: List<MathCourse>): List<String> =
    courses.flatMap { it.tags }.distinct().sortedWith { a, b -> compareDisplayNames(a, b) }

fun arrangeMath(catalog: MathCatalog, layout: MathLayout): List<MathBlock> {
    val tag = layout.tag
    val list = catalog.courses.filter { tag.isEmpty() || tag in it.tags }.sortedWith { a, b ->
        val byName = compareDisplayNames(a.name, b.name)
        if (byName != 0) byName else compareDisplayNames(a.id, b.id)
    }
    if (layout.view == "az") {
        return if (list.isEmpty()) emptyList() else listOf(MathBlock("az", "All courses, A–Z", "", list))
    }
    return catalog.groups.mapNotNull { group ->
        val items = list.filter { groupOf(it, catalog.groups) == group.id }
        if (items.isEmpty()) null else MathBlock(group.id, group.title, group.sub, items)
    }
}

fun mathCourse(catalog: MathCatalog, lang: String): MathCourse? {
    val id = lang.trim().lowercase()
    if (id.isEmpty()) return null
    return catalog.courses.firstOrNull { it.id == id }
}

fun mathSyncChanged(known: MathSync?, post: MathSync): Boolean = post != known

fun importMathWebView(
    settingsJson: String?,
    viewJson: String?,
    current: DeskSettings,
    layout: MathLayout,
    tags: Collection<String>,
): MathState {
    if (current.importedWebView) return MathState(current, normalizeMathLayout(layout, tags))
    val settings = if (settingsJson == null) current else decodeDeskSettings(settingsJson, current)
    val next = if (viewJson == null) layout else decodeMathLayout(viewJson)
    return MathState(settings.copy(importedWebView = true), normalizeMathLayout(next, tags))
}

fun applyMathSync(post: MathSync, current: DeskSettings, layout: MathLayout, tags: Collection<String>): MathState {
    val settings = if (post.settings == null) current
    else decodeDeskSettings(post.settings, current).copy(importedWebView = current.importedWebView)
    val next = if (post.view == null) layout else decodeMathLayout(post.view)
    return MathState(settings, normalizeMathLayout(next, tags))
}

fun mathSeedSnapshot(settings: DeskSettings, layout: MathLayout): MathSync = MathSync(
    settings = encodeDeskSettings(settings.copy(importedWebView = false)),
    view = encodeMathLayout(MathLayout(view = if (layout.view == "az") "az" else "sections", tag = layout.tag)),
)

fun mathSeedDocument(settings: DeskSettings, layout: MathLayout, nextUrl: String): String {
    val seed = mathSeedSnapshot(settings, layout)
    return """
<!DOCTYPE html>
<meta charset="utf-8">
<title>Maths Edu-Training Helper</title>
<script>
try {
  localStorage.setItem('lsd-settings', ${jsStringLiteral(seed.settings!!)});
  localStorage.setItem('$MATH_VIEW_KEY', ${jsStringLiteral(seed.view!!)});
} catch (e) {}
location.replace(${jsStringLiteral(nextUrl)});
</script>
""".trim()
}

fun parseMathSync(text: String?): MathSync? {
    if (text.isNullOrBlank() || text == "null") return null
    return runCatching { mathJson.decodeFromString<MathSync>(text) }.getOrNull()
}

fun isMathMenuUrl(url: String): Boolean {
    val bare = url.substringBefore('#').substringBefore('?')
    return bare.endsWith("/math-student-desk/www/index.html") || bare.endsWith("/math-student-desk/index.html")
}
