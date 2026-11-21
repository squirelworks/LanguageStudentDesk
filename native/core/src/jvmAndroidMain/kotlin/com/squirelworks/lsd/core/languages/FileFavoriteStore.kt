package com.squirelworks.lsd.core.languages

import java.io.File

// One file per app. The new text is written beside it and renamed into place,
// so a restart never sees a half-written list.
class FileFavoriteStore(private val file: File) : FavoriteStore {
    override fun load(): Set<String> {
        if (!file.isFile) return emptySet()
        return parseFavoriteFile(file.readText())
    }

    override fun save(ids: Set<String>) {
        file.parentFile?.mkdirs()
        val text = formatFavoriteFile(ids)
        val tmp = File(file.parentFile, file.name + ".tmp")
        tmp.writeText(text)
        if (!tmp.renameTo(file)) {
            file.writeText(text)
            tmp.delete()
        }
    }
}
