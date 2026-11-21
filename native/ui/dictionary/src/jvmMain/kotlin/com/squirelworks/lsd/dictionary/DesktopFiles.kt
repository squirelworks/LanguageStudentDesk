package com.squirelworks.lsd.dictionary

import java.io.File

fun favoriteLanguageFile(appId: String): File {
    val home = File(System.getProperty("user.home"))
    val os = System.getProperty("os.name").lowercase()
    val dir = when {
        "win" in os -> File(System.getenv("APPDATA") ?: home.path, appId)
        "mac" in os -> File(home, "Library/Application Support/$appId")
        else -> {
            val xdg = System.getenv("XDG_DATA_HOME")
            if (xdg.isNullOrBlank()) File(home, ".local/share/$appId") else File(xdg, appId)
        }
    }
    return File(dir, "favorite-languages.txt")
}

fun readCatalogResource(): String =
    checkNotNull(Thread.currentThread().contextClassLoader.getResource("languages.json")) {
        "Language catalog was not packaged"
    }.readText()
