package com.squirelworks.lsd.learner

import com.squirelworks.lsd.core.desk.injectPageScript
import com.sun.net.httpserver.HttpExchange
import com.sun.net.httpserver.HttpServer
import java.io.File
import java.io.IOException
import java.net.InetSocketAddress
import java.net.URLDecoder
import java.nio.charset.StandardCharsets

class LearnerPortBusy(val port: Int, message: String) : Exception(message)

// One localhost server for a desk that opens packed learner pages in the
// browser. The port is saved so the origin, and the browser's storage, stay
// put across launches. The seed page is kept in memory. A post that matches
// the last known tab state is ignored.
class LearnerPagesHost<T>(
    private val www: File,
    portFile: File,
    private val pages: LearnerPages<T>,
    private val onSync: (String) -> Unit,
) : AutoCloseable {
    private val server = listen(portFile, pages.portBusy)
    val origin = "http://127.0.0.1:${server.address.port}"
    @Volatile private var seedHtml: String? = null
    @Volatile private var tabState: T? = null

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

    fun seedUrl(html: String, state: T): String {
        tabState = state
        seedHtml = html
        return "$origin/desk-seed.html"
    }

    override fun close() {
        server.stop(0)
    }

    private fun handle(exchange: HttpExchange) {
        val path = URLDecoder.decode(exchange.requestURI.rawPath ?: "/", StandardCharsets.UTF_8)
        if (exchange.requestMethod == "POST" && path == "/desk-sync") {
            val body = exchange.requestBody.use { it.readBytes() }.toString(StandardCharsets.UTF_8)
            val post = pages.parse(body)
            if (post != null && pages.changed(tabState, post)) {
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
                send(exchange, 404, "text/plain; charset=utf-8", pages.seedMissing.toByteArray())
                return
            }
            send(exchange, 200, "text/html; charset=utf-8", page.toByteArray())
            return
        }
        if (pages.isMenuUrl(origin + path)) {
            send(exchange, 200, "text/html; charset=utf-8", pages.menuHtml.toByteArray())
            return
        }
        val file = resolvePackedFile(www, path)
        if (file == null) {
            send(exchange, 404, "text/plain; charset=utf-8", pages.missingPage.toByteArray())
            return
        }
        val bytes = if (file.extension.equals("html", true) || file.extension.equals("htm", true)) {
            injectPageScript(file.readText(), pages.syncMarker, pages.syncScript).toByteArray()
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

class LearnerPages<T>(
    val syncMarker: String,
    val syncScript: String,
    val isMenuUrl: (String) -> Boolean,
    val menuHtml: String,
    val portBusy: (Int) -> String,
    val seedMissing: String,
    val missingPage: String,
    val parse: (String) -> T?,
    val changed: (T?, T) -> Boolean,
)

private fun listen(portFile: File, portBusy: (Int) -> String): HttpServer {
    portFile.parentFile?.mkdirs()
    val saved = portFile.takeIf { it.isFile }?.readText()?.trim()?.toIntOrNull()?.takeIf { it in 1..65535 }
    if (saved != null) {
        try {
            return HttpServer.create(InetSocketAddress("127.0.0.1", saved), 0)
        } catch (_: IOException) {
            throw LearnerPortBusy(saved, portBusy(saved))
        }
    }
    val created = HttpServer.create(InetSocketAddress("127.0.0.1", 0), 0)
    portFile.writeText(created.address.port.toString())
    return created
}

fun learnerPath(href: String, scoped: Boolean, lang: String): String {
    val query = if (scoped && lang.isNotBlank()) "?lang=" + java.net.URLEncoder.encode(lang, StandardCharsets.UTF_8) else ""
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
