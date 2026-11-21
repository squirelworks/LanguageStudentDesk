package com.squirelworks.lsd.core.desk

import java.io.File

// Learner pages ship inside the desktop app's resources, under www/.
// An installed package has no repo checkout to resolve them against.
fun deskLearnerPage(resourcesDir: File, href: String): File? {
    if (href.isBlank() || href.startsWith("/") || href.contains("..")) return null
    val nested = File(resourcesDir, "www")
    val root = if (File(nested, "index.html").isFile) nested else resourcesDir
    val page = File(root, href)
    if (!page.isFile) return null
    val rootPath = root.canonicalFile.toPath()
    val pagePath = page.canonicalFile.toPath()
    if (!pagePath.startsWith(rootPath)) return null
    return page
}
