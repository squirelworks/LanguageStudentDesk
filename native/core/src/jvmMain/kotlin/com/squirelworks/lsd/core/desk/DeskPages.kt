package com.squirelworks.lsd.core.desk

import java.io.File

// Learner pages ship inside the desktop app's resources, under www/.
// Compose copies appResourcesRootDir/common into that directory.
fun deskPagesRoot(resourcesDir: File): File? {
    val nested = File(resourcesDir, "www")
    if (File(nested, "index.html").isFile) return nested
    if (File(resourcesDir, "index.html").isFile) return resourcesDir
    return null
}

fun deskLearnerPage(resourcesDir: File, href: String): File? {
    if (href.isBlank() || href.startsWith("/") || href.contains("..")) return null
    val root = deskPagesRoot(resourcesDir) ?: return null
    val page = File(root, href)
    if (!page.isFile) return null
    val rootPath = root.canonicalFile.toPath()
    val pagePath = page.canonicalFile.toPath()
    if (!pagePath.startsWith(rootPath)) return null
    return page
}
