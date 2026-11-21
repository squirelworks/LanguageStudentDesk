package com.squirelworks.lsd

import com.squirelworks.lsd.core.desk.DeskSettings
import com.squirelworks.lsd.core.desk.deskSeedDocument
import com.squirelworks.lsd.core.desk.isDeskMenuUrl
import com.squirelworks.lsd.learner.LearnerPage

val deskLearnerPage = LearnerPage(
    isMenuUrl = ::isDeskMenuUrl,
    readStorageJs = "(function(){try{return{settings:localStorage.getItem('lsd-settings'),favorites:localStorage.getItem('lsd-favorite-languages'),lang:localStorage.getItem('lsd-suite-lang')};}catch(e){return null;}})()",
    speech = true,
)

fun learnerAddress(href: String, scoped: Boolean, lang: String): String {
    val query = if (scoped && lang.isNotBlank()) "?lang=" + java.net.URLEncoder.encode(lang, "UTF-8") else ""
    return "file:///android_asset/www/$href$query"
}

fun learnerSeed(settings: DeskSettings, favoriteIds: Iterable<String>, href: String, scoped: Boolean, lang: String): String =
    deskSeedDocument(settings, favoriteIds, learnerAddress(href, scoped, lang))
