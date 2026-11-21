package com.squirelworks.programmingstudentdesk

import com.squirelworks.lsd.core.desk.DeskSettings
import com.squirelworks.lsd.core.programming.PROGRAMMING_SYNC_SCRIPT
import com.squirelworks.lsd.core.programming.ProgrammingLayout
import com.squirelworks.lsd.core.programming.ProgrammingSync
import com.squirelworks.lsd.core.programming.isProgrammingMenuUrl
import com.squirelworks.lsd.core.programming.parseProgrammingSync
import com.squirelworks.lsd.core.programming.programmingSeedDocument
import com.squirelworks.lsd.core.programming.programmingSeedSnapshot
import com.squirelworks.lsd.core.programming.programmingSyncChanged
import com.sun.net.httpserver.HttpExchange
import com.sun.net.httpserver.HttpServer
import java.io.File
import java.io.IOException
import java.net.InetSocketAddress
import java.net.URLDecoder
import java.net.URLEncoder
import java.nio.charset.StandardCharsets

class ProgrammingPortBusy(val port: Int) : Exception(
    "Programming Student Desk already uses port $port for its courses. Close the other copy, then open a course again.",
)

class ProgrammingHost(
    private val www: File,
    portFile: File,
    private val onSync: (String) -> Unit,
) : AutoCloseable {
    private val server = listen(portFile)
    val origin = "http://127.0.0.1:${server.address.port}"
    @Volatile private var seedHtml: String? = null
    @Volatile private var tabState: ProgrammingSync? = null

    init {
        server.createContext("/") { exchange ->
            try {
                handle(exchange)
            } catch (_: Exception) {
                send(exchange, 500, "text/plain; charset=utf-8", "Could not open that page.".toByteArray())
            }
        }
        server.start()
    }

    fun seedUrl(settings: DeskSettings, layout: ProgrammingLayout, lang: String): String {
        val next = origin + coursePath(lang)
        tabState = programmingSeedSnapshot(settings, layout)
        seedHtml = programmingSeedDocument(settings, layout, next)
        return "$origin/desk-seed.html"
    }

    override fun close() {
        server.stop(0)
    }

    private fun handle(exchange: HttpExchange) {
        val path = URLDecoder.decode(exchange.requestURI.rawPath ?: "/", StandardCharsets.UTF_8)
        if (exchange.requestMethod == "POST" && path == "/desk-sync") {
            val body = exchange.requestBody.use { it.readBytes() }.toString(StandardCharsets.UTF_8)
            val post = parseProgrammingSync(body)
            if (post != null && programmingSyncChanged(tabState, post)) {
                tabState = post
                onSync(body)
            }
            send(exchange, 204, "text/plain", ByteArray(0))
            return
        }
        if (exchange.requestMethod != "GET" && exchange.requestMethod != "HEAD") {
            send(exchange, 405, "text/plain", ByteArray(0))
            return
        }
        if (path == "/desk-seed.html") {
            val page = seedHtml
            if (page == null) {
                send(exchange, 404, "text/plain; charset=utf-8", "Open a course from the Desk first.".toByteArray())
            } else {
                send(exchange, 200, "text/html; charset=utf-8", page.toByteArray())
            }
            return
        }
        if (isProgrammingMenuUrl(origin + path)) {
            val page = "<!DOCTYPE html><meta charset=\"utf-8\"><title>Programming Student Desk</title>" +
                "<p>Back in Programming Student Desk. You can close this tab.</p><script>$PROGRAMMING_SYNC_SCRIPT</script>"
            send(exchange, 200, "text/html; charset=utf-8", page.toByteArray())
            return
        }
        val relative = path.trimStart('/')
        if (relative.isEmpty() || relative.split('/').any { it == ".." }) {
            send(exchange, 404, "text/plain; charset=utf-8", "That page is not in this Desk.".toByteArray())
            return
        }
        val file = File(www, relative)
        val root = www.canonicalFile.toPath()
        if (!file.canonicalFile.toPath().startsWith(root) || !file.isFile) {
            send(exchange, 404, "text/plain; charset=utf-8", "That page is not in this Desk.".toByteArray())
            return
        }
        val bytes = if (file.extension.equals("html", true) || file.extension.equals("htm", true)) {
            val html = file.readText()
            val tagged = if (html.contains("__psdSync")) html else "<script>$PROGRAMMING_SYNC_SCRIPT</script>$html"
            tagged.toByteArray()
        } else {
            file.readBytes()
        }
        val type = when (file.extension.lowercase()) {
            "html", "htm" -> "text/html; charset=utf-8"
            "js" -> "text/javascript; charset=utf-8"
            "css" -> "text/css; charset=utf-8"
            "json" -> "application/json"
            "svg" -> "image/svg+xml"
            "png" -> "image/png"
            else -> "application/octet-stream"
        }
        send(exchange, 200, type, bytes)
    }

    private fun send(exchange: HttpExchange, status: Int, type: String, body: ByteArray) {
        exchange.responseHeaders.add("Content-Type", type)
        exchange.sendResponseHeaders(status, body.size.toLong())
        if (exchange.requestMethod != "HEAD") exchange.responseBody.use { it.write(body) } else exchange.responseBody.close()
    }
}

private fun listen(portFile: File): HttpServer {
    portFile.parentFile?.mkdirs()
    val saved = portFile.takeIf { it.isFile }?.readText()?.trim()?.toIntOrNull()?.takeIf { it in 1..65535 }
    if (saved != null) {
        try {
            return HttpServer.create(InetSocketAddress("127.0.0.1", saved), 0)
        } catch (_: IOException) {
            throw ProgrammingPortBusy(saved)
        }
    }
    val created = HttpServer.create(InetSocketAddress("127.0.0.1", 0), 0)
    portFile.writeText(created.address.port.toString())
    return created
}

private fun coursePath(lang: String): String {
    val query = if (lang.isBlank()) "" else "?lang=" + URLEncoder.encode(lang, StandardCharsets.UTF_8)
    return "/programming-learner/index.html$query"
}
