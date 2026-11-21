package com.squirelworks.lsd.bible

import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

internal const val PACKS_REPO = "squirelworks/LanguageStudentDesk"
internal const val PACKS_RELEASE_TAG = "orthodox-bible-packs"
internal const val PACKS_CONTENT_FILE = "orthodox-bible-content.json"
internal const val PACKS_RELEASE_API =
    "https://api.github.com/repos/$PACKS_REPO/releases/tags/$PACKS_RELEASE_TAG"
internal const val PACKS_BRANCH_CONTENT =
    "https://raw.githubusercontent.com/$PACKS_REPO/orthodox-bible-texts/$PACKS_CONTENT_FILE"

internal class PackFailure(message: String) : Exception(message)

interface PackStore {
    fun keys(): Set<String>
    fun read(key: String): String?
    fun write(key: String, text: String)
    fun remove(key: String)
}

internal fun packKey(kind: String, id: String) = "$kind:$id"

internal fun parsePackJson(text: String, marker: String): String {
    val start = text.indexOf(marker)
    val end = text.lastIndexOf(')')
    if (start < 0 || end <= start) throw PackFailure("Not a SquirrelGo data pack")
    val json = text.substring(start + marker.length, end).trim()
    if (!json.startsWith("{") && !json.startsWith("[")) throw PackFailure("Not a SquirrelGo data pack")
    return json
}

internal fun mergePackRelease(catalog: BibleCatalog, release: PackRelease): Pair<BibleCatalog, Int> {
    val bibles = catalog.bibles.toMutableList()
    val commentary = catalog.commentary.toMutableList()
    var added = 0
    for (entry in release.index.bibles) {
        if (entry.id.isBlank() || entry.file.isBlank()) continue
        val releaseUrl = release.assets[entry.file].orEmpty()
        val known = bibles.indexOfFirst { it.id == entry.id }
        if (known >= 0) {
            val current = bibles[known]
            if (current.url.isNotBlank() && releaseUrl.isNotBlank()) bibles[known] = current.copy(releaseUrl = releaseUrl)
            continue
        }
        val url = entry.url.ifBlank { releaseUrl }
        if (url.isBlank()) continue
        bibles += CatalogBible(
            id = entry.id,
            name = entry.name,
            lang = entry.lang,
            dir = entry.dir,
            versification = entry.versification,
            license = entry.license,
            source = entry.source,
            testaments = entry.testaments,
            url = url,
            releaseUrl = releaseUrl,
            size = entry.size,
        )
        added += 1
    }
    for (entry in release.index.commentary) {
        if (entry.id.isBlank() || entry.file.isBlank()) continue
        val releaseUrl = release.assets[entry.file].orEmpty()
        val known = commentary.indexOfFirst { it.id == entry.id }
        if (known >= 0) {
            val current = commentary[known]
            if (current.url.isNotBlank() && releaseUrl.isNotBlank()) commentary[known] = current.copy(releaseUrl = releaseUrl)
            continue
        }
        val url = entry.url.ifBlank { releaseUrl }
        if (url.isBlank()) continue
        commentary += CatalogCommentary(
            id = entry.id,
            author = entry.author,
            work = entry.work,
            lang = entry.lang,
            license = entry.license,
            source = entry.source,
            tradition = entry.tradition.ifBlank { "east" },
            books = entry.books,
            url = url,
            releaseUrl = releaseUrl,
            size = entry.size,
        )
        added += 1
    }
    return BibleCatalog(bibles, commentary) to added
}

internal fun fetchPackRelease(fetch: (String) -> String, now: Long): PackRelease {
    val raw = try {
        fetch(PACKS_RELEASE_API)
    } catch (error: Exception) {
        throw PackFailure(githubMessage(error))
    }
    val root = try {
        bibleJson.parseToJsonElement(raw).jsonObject
    } catch (_: Exception) {
        throw PackFailure("Could not read the pack list")
    }
    val assets = LinkedHashMap<String, String>()
    val listed = root["assets"] as? JsonArray ?: JsonArray(emptyList())
    for (item in listed) {
        val obj = item as? JsonObject ?: continue
        val name = obj.string("name")
        val url = obj.string("browser_download_url")
        if (name.isNotBlank() && url.isNotBlank()) assets[name] = url
    }
    val contentUrl = assets[PACKS_CONTENT_FILE] ?: throw PackFailure("No Bible packs are available yet")
    var index: PackIndex? = null
    for (url in listOf(contentUrl, PACKS_BRANCH_CONTENT)) {
        try {
            index = bibleJson.decodeFromString(fetch(url))
            break
        } catch (_: Exception) {
        }
    }
    if (index == null) throw PackFailure("Could not read the pack list")
    return PackRelease(tag = root.string("tag_name").ifBlank { PACKS_RELEASE_TAG }, checked = now, index = index, assets = assets)
}

internal fun downloadPackText(kind: String, url: String, releaseUrl: String, fetch: (String) -> String): String {
    val marker = if (kind == "bible") "SGO_BIBLES.push(" else "SGO_COMMENTARY.push("
    var failure: Exception = PackFailure("No download address")
    for (address in listOf(releaseUrl, url).filter { it.isNotBlank() }.distinct()) {
        try {
            val text = fetch(address)
            parsePackJson(text, marker)
            return text
        } catch (error: Exception) {
            failure = error
        }
    }
    throw failure
}

private fun githubMessage(error: Exception): String {
    val message = error.message.orEmpty()
    val status = Regex("""\((\d+)\)""").find(message)?.groupValues?.get(1)?.toIntOrNull()
    return when (status) {
        403 -> "GitHub is busy, try again later"
        null -> message.ifBlank { "Could not check" }
        else -> "GitHub said $status"
    }
}

private fun JsonObject.string(name: String): String {
    val value = this[name] as? kotlinx.serialization.json.JsonPrimitive ?: return ""
    return value.content
}
