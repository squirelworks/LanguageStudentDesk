package com.squirelworks.lsd.learner

import java.io.File
import java.net.HttpURLConnection
import java.net.URI
import kotlin.io.path.createTempDirectory
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class LearnerPagesHostTest {
    @Test
    fun theSyncScriptFollowsTheHeadAndARepeatIsIgnored() {
        val root = createTempDirectory().toFile().resolve("www").apply { mkdirs() }
        File(root, "course.html").writeText("<!DOCTYPE html>\n<html>\n<head><title>Course</title></head><body></body></html>")
        val portFile = File(root.parentFile, "port")
        var posts = 0
        val host = LearnerPagesHost(
            www = root,
            portFile = portFile,
            pages = LearnerPages(
                syncMarker = "__lsdDeskSync",
                syncScript = "window.__lsdDeskSync=true",
                isMenuUrl = { it.endsWith("/index.html") },
                menuHtml = "<!DOCTYPE html><title>Menu</title>",
                portBusy = { "busy $it" },
                seedMissing = "Open a learner from the Desk first.",
                missingPage = "That page is not in this Desk.",
                parse = { body -> body.takeIf { it.isNotBlank() } },
                changed = { known, post -> post != known },
            ),
            onSync = { posts++ },
        )
        host.use {
            val page = http(host.origin + "/course.html")
            assertTrue(page.indexOf("<!DOCTYPE html>") < page.indexOf("<script>"))
            assertTrue(page.indexOf("<head>") < page.indexOf("<script>"))
            assertTrue(page.contains("__lsdDeskSync"))
            val body = """{"settings":"{}"}"""
            assertEquals(204, post(host.origin + "/desk-sync", body))
            assertEquals(204, post(host.origin + "/desk-sync", body))
            assertEquals(1, posts)
            assertTrue(portFile.readText().toInt() in 1..65535)
        }
    }
}

private fun http(url: String): String {
    val connection = URI(url).toURL().openConnection() as HttpURLConnection
    connection.requestMethod = "GET"
    return connection.inputStream.use { it.readBytes().toString(Charsets.UTF_8) }
}

private fun post(url: String, body: String): Int {
    val connection = URI(url).toURL().openConnection() as HttpURLConnection
    connection.requestMethod = "POST"
    connection.doOutput = true
    connection.outputStream.use { it.write(body.toByteArray()) }
    return connection.responseCode
}
