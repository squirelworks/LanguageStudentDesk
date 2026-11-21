package com.squirelworks.lsd.core.suite

import kotlinx.serialization.Serializable

enum class KanaBack { CloseSheet, CloseDialog, PreviousScreen, Exit }

// One Android back press does the topmost thing: the apps sheet, then a
// confirmation dialog, then the previous screen. The app leaves only from home.
fun kanaBack(sheetOpen: Boolean, dialogOpen: Boolean, screenCount: Int): KanaBack = when {
    sheetOpen -> KanaBack.CloseSheet
    dialogOpen -> KanaBack.CloseDialog
    screenCount > 1 -> KanaBack.PreviousScreen
    else -> KanaBack.Exit
}

@Serializable
data class SuiteApp(
    val id: String,
    val name: String,
    val icon: String = "",
    val blurb: String = "",
    val pkg: String = "",
    val tag: String = "",
    val apk: String = "",
    val langs: List<String> = emptyList(),
)

@Serializable
data class SuiteNote(val title: String, val body: String)

@Serializable
data class SuiteLink(val title: String, val body: String, val url: String = "")

private const val RELEASES = "https://github.com/squirelworks/LanguageStudentDesk/releases/"

fun releaseUrl(app: SuiteApp): String? {
    if (app.tag.isBlank() || app.apk.isBlank()) return null
    val path = if (app.tag == "latest") "latest/download/${app.apk}" else "download/${app.tag}/${app.apk}"
    return RELEASES + path
}

// Sister apps that share a language come first. The order within each group
// stays the order of the suite list.
fun otherApps(selfId: String, apps: List<SuiteApp>): List<SuiteApp> {
    val langs = apps.firstOrNull { it.id == selfId }?.langs.orEmpty().toSet()
    return apps.filter { it.id != selfId }.sortedWith { a, b ->
        val aScore = if (a.langs.any { it in langs }) 1 else 0
        val bScore = if (b.langs.any { it in langs }) 1 else 0
        bScore - aScore
    }
}

fun noteGroups(
    langs: List<String>,
    names: Map<String, String>,
    notes: Map<String, List<SuiteNote>>,
): List<Pair<String, List<SuiteNote>>> =
    langs.mapNotNull { lang ->
        val items = notes[lang] ?: return@mapNotNull null
        (names[lang] ?: lang) to items
    }

fun resourceList(langs: List<String>, resources: Map<String, List<SuiteLink>>): List<SuiteLink> =
    (listOf("general") + langs).flatMap { resources[it].orEmpty() }
