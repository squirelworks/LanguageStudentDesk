package com.squirelworks.lsd

import com.squirelworks.lsd.core.desk.DESK_SYNC_SCRIPT
import com.squirelworks.lsd.core.desk.DeskSettings
import com.squirelworks.lsd.core.desk.DeskWebSnapshot
import com.squirelworks.lsd.core.desk.deskSeedDocument
import com.squirelworks.lsd.core.desk.deskSeedSnapshot
import com.squirelworks.lsd.core.desk.injectDeskSync
import com.squirelworks.lsd.core.desk.isDeskMenuUrl
import com.squirelworks.lsd.core.desk.parseDeskWebSnapshot
import com.squirelworks.lsd.core.desk.tabPostChanged
import com.sun.net.httpserver.HttpExchange
import com.sun.net.httpserver.HttpServer
import java.io.File
import java.io.IOException
import java.net.InetSocketAddress
import java.net.URLDecoder
import java.net.URLEncoder
import java.nio.charset.StandardCharsets

class DeskPortBusy(val port: Int) : Exception(
    "Language Student Desk already uses port $port for its learner pages. Close the other copy, then open a learner again.",
)

// Serves the packed learner pages on one saved localhost port so they share
// an origin across launches, the same way the phone WebView keeps its origin.
// The seed page lives in memory. Learner pages post the three Desk keys back
// only when those values change.
class DeskLearnerHost(
    private val www: File,
    portFile: File,
    private val onSync: (String) -> Unit,
) : AutoCloseable {
    private val server = listen(portFile)
    val origin = "http://127.0.0.1:${server.address.port}"
    @Volatile private var seedHtml: String? = null
    @Volatile private var tabState: DeskWebSnapshot? = null

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

    fun seedUrl(settings: DeskSettings, favoriteIds: Iterable<String>, href: String, scoped: Boolean, lang: String): String {
        val next = origin + learnerPath(href, scoped, lang)
        tabState = deskSeedSnapshot(settings, favoriteIds)
        seedHtml = deskSeedDocument(settings, favoriteIds, next)
        return "$origin/desk-seed.html"
    }

    override fun close() {
        server.stop(0)
    }

    private fun handle(exchange: HttpExchange) {
        val path = URLDecoder.decode(exchange.requestURI.rawPath ?: "/", StandardCharsets.UTF_8)
        if (exchange.requestMethod == "POST" && path == "/desk-sync") {
            val body = exchange.requestBody.use { it.readBytes() }.toString(StandardCharsets.UTF_8)
            val post = parseDeskWebSnapshot(body)
            if (post != null && tabPostChanged(tabState, post)) {
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
                send(exchange, 404, "text/plain; charset=utf-8", "Open a learner from the Desk first.".toByteArray())
                return
            }
            send(exchange, 200, "text/html; charset=utf-8", page.toByteArray())
            return
        }
        if (isDeskMenuUrl(origin + path)) {
            val page = """
                <!DOCTYPE html>
                <meta charset="utf-8">
                <title>Language Student Desk</title>
                <p>Back in Language Student Desk. You can close this tab.</p>
                <script>$DESK_SYNC_SCRIPT</script>
            """.trimIndent()
            send(exchange, 200, "text/html; charset=utf-8", page.toByteArray())
            return
        }
        val file = resolvePackedFile(www, path)
        if (file == null) {
            send(exchange, 404, "text/plain; charset=utf-8", "That page is not in this Desk.".toByteArray())
            return
        }
        val bytes = if (file.extension.equals("html", true) || file.extension.equals("htm", true)) {
            injectDeskSync(file.readText()).toByteArray()
        } else {
            file.readBytes()
        }
        send(exchange, 200, contentType(file), bytes)
    }

    private fun send(exchange: HttpExchange, status: Int, type: String, body: ByteArray) {
        exchange.responseHeaders.add("Content-Type", type)
        exchange.sendResponseHeaders(status, body.size.toLong())
        if (exchange.requestMethod != "HEAD") {
            exchange.responseBody.use { it.write(body) }
        } else {
            exchange.responseBody.close()
        }
    }
}

private fun listen(portFile: File): HttpServer {
    portFile.parentFile?.mkdirs()
    val saved = portFile.takeIf { it.isFile }?.readText()?.trim()?.toIntOrNull()?.takeIf { it in 1..65535 }
    if (saved != null) {
        try {
            return HttpServer.create(InetSocketAddress("127.0.0.1", saved), 0)
        } catch (_: IOException) {
            throw DeskPortBusy(saved)
        }
    }
    val created = HttpServer.create(InetSocketAddress("127.0.0.1", 0), 0)
    portFile.writeText(created.address.port.toString())
    return created
}

fun learnerPath(href: String, scoped: Boolean, lang: String): String {
    val query = if (scoped && lang.isNotBlank()) "?lang=" + URLEncoder.encode(lang, StandardCharsets.UTF_8) else ""
    return "/" + href.trimStart('/') + query
}

fun resolvePackedFile(www: File, urlPath: String): File? {
    val relative = urlPath.trimStart('/')
    if (relative.isEmpty() || relative.contains('\\') || relative.split('/').any { it == ".." }) return null
    val file = File(www, relative)
    val root = www.canonicalFile.toPath()
    val path = file.canonicalFile.toPath()
    if (!path.startsWith(root)) return null
    return file.takeIf { it.isFile }
}

private fun contentType(file: File): String = when (file.extension.lowercase()) {
    "html", "htm" -> "text/html; charset=utf-8"
    "js" -> "text/javascript; charset=utf-8"
    "css" -> "text/css; charset=utf-8"
    "json" -> "application/json"
    "svg" -> "image/svg+xml"
    "png" -> "image/png"
    "jpg", "jpeg" -> "image/jpeg"
    "gif" -> "image/gif"
    "webp" -> "image/webp"
    "woff" -> "font/woff"
    "woff2" -> "font/woff2"
    "ttf" -> "font/ttf"
    "mp3" -> "audio/mpeg"
    "wav" -> "audio/wav"
    "ogg" -> "audio/ogg"
    else -> "application/octet-stream"
}
