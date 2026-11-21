package com.squirelworks.lsd.bible

import com.squirelworks.lsd.core.languages.TextStore
import com.squirelworks.lsd.kana.WebViewStore

internal fun defaultSettings(catalog: BibleCatalog): BibleSettings {
    val bundled = catalog.bibles.filter { it.url.isBlank() }
    val first = bundled.firstOrNull()
    val parallel = bundled.filter { it.lang != first?.lang }.take(1).map { it.id }
    return BibleSettings(primary = first?.id.orEmpty(), parallel = parallel)
}

internal fun readBibleSettings(store: TextStore, defaults: BibleSettings): BibleSettings {
    val text = store.read()
    if (text.isBlank()) return defaults
    return runCatching { bibleJson.decodeFromString<BibleSettings>(text) }.getOrElse { defaults }
}

internal fun writeBibleSettings(store: TextStore, settings: BibleSettings) {
    store.write(bibleJson.encodeToString(BibleSettings.serializer(), settings))
}

internal fun normalizeSettings(settings: BibleSettings, catalog: BibleCatalog, available: (String) -> Boolean): BibleSettings {
    val known = catalog.bibles.associateBy { it.id }
    val primary = settings.primary.takeIf { id -> known[id]?.let { available(id) } == true }
        ?: catalog.bibles.firstOrNull { available(it.id) }?.id.orEmpty()
    val parallel = settings.parallel.filter { id -> id != primary && known[id]?.let { available(id) } == true }
    return settings.copy(primary = primary, parallel = parallel)
}

internal fun importBibleSettings(native: BibleSettings, legacy: WebViewStore, fileWasBlank: Boolean): BibleSettings {
    if (native.importedWebView) return native
    return when (legacy) {
        WebViewStore.Unreadable -> native
        WebViewStore.Absent -> native.copy(importedWebView = true)
        is WebViewStore.Value -> {
            if (!fileWasBlank) native.copy(importedWebView = true)
            else (runCatching { bibleJson.decodeFromString<BibleSettings>(legacy.text) }.getOrNull() ?: native)
                .copy(importedWebView = true)
        }
    }
}

internal fun adoptBibleSettings(store: TextStore, legacy: WebViewStore, defaults: BibleSettings) {
    val blank = store.read().isBlank()
    val current = readBibleSettings(store, defaults)
    val next = importBibleSettings(current, legacy, blank)
    if (next != current) writeBibleSettings(store, next)
}

fun adoptBibleSettings(store: TextStore, legacy: WebViewStore, bundle: BibleBundle) {
    adoptBibleSettings(store, legacy, defaultSettings(bundle.catalog))
}

internal fun readPackRelease(store: TextStore): PackRelease? {
    val text = store.read()
    if (text.isBlank()) return null
    return runCatching { bibleJson.decodeFromString<PackRelease>(text) }.getOrNull()
}

internal fun writePackRelease(store: TextStore, release: PackRelease) {
    store.write(bibleJson.encodeToString(PackRelease.serializer(), release))
}

internal fun importPackRelease(native: PackRelease?, legacy: WebViewStore, fileWasBlank: Boolean): PackRelease? {
    if (!fileWasBlank) return native
    return when (legacy) {
        is WebViewStore.Value -> runCatching { bibleJson.decodeFromString<PackRelease>(legacy.text) }.getOrNull()
        else -> native
    }
}

fun adoptPackRelease(store: TextStore, legacy: WebViewStore) {
    val blank = store.read().isBlank()
    val current = readPackRelease(store)
    val next = importPackRelease(current, legacy, blank) ?: return
    if (blank) writePackRelease(store, next)
}
