package com.squirelworks.lsd.core.desk

import java.io.File
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

class DeskPagesTest {
    @Test
    fun anInstalledCopyOpensThePackedLearner() {
        val root = File("build/desk-pages-test").apply { mkdirs() }
        val www = File(root, "www")
        File(www, "grammar-learner").mkdirs()
        File(www, "index.html").writeText("<p>menu</p>")
        val page = File(www, "grammar-learner/index.html")
        page.writeText("<p>grammar</p>")
        assertEquals(page.canonicalFile, deskLearnerPage(root, "grammar-learner/index.html")?.canonicalFile)
        assertNull(deskLearnerPage(root, "../secrets.txt"))
        assertNull(deskLearnerPage(root, "missing/index.html"))
    }
}
