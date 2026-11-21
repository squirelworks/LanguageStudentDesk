package com.squirelworks.lsd.core.article

sealed interface ArticleRun {
    data class Text(
        val value: String,
        val bold: Boolean = false,
        val italic: Boolean = false,
        val japanese: Boolean = false,
    ) : ArticleRun
    data class Play(val spoken: String) : ArticleRun
}

sealed interface ArticleBlock {
    data class Paragraph(val runs: List<ArticleRun>) : ArticleBlock
    data class Heading(val text: String) : ArticleBlock
    data class Bullet(val runs: List<ArticleRun>) : ArticleBlock
    data class Table(val rows: List<List<List<ArticleRun>>>) : ArticleBlock
}

// The article HTML uses paragraphs, lists, tables, headings, bold, italic,
// and play buttons. Anything else is kept as text.
fun parseArticle(html: String): List<ArticleBlock> {
    val blocks = mutableListOf<ArticleBlock>()
    val runs = mutableListOf<ArticleRun>()
    val rows = mutableListOf<List<List<ArticleRun>>>()
    val cells = mutableListOf<List<ArticleRun>>()
    var bold = false
    var italic = false
    var japanese = false
    var inline = false
    var inButton = false
    var inHeading = false
    var inCell = false
    var inRow = false
    var inTable = false
    var heading = StringBuilder()
    var i = 0
    fun addText(raw: String) {
        val text = decodeEntities(raw)
        if (inButton) return
        if (inHeading) {
            heading.append(text)
            return
        }
        if (!inline || text.isEmpty()) return
        runs += ArticleRun.Text(text, bold, italic, japanese)
    }
    fun takeRuns(): List<ArticleRun> {
        val copy = runs.toList()
        runs.clear()
        return copy
    }
    while (i < html.length) {
        if (html[i] != '<') {
            val next = html.indexOf('<', i).let { if (it < 0) html.length else it }
            addText(html.substring(i, next))
            i = next
            continue
        }
        val close = html.indexOf('>', i)
        if (close < 0) break
        val tag = html.substring(i + 1, close).trim()
        i = close + 1
        val name = tag.trimStart('/').substringBefore(' ').substringBefore('/').lowercase()
        val closing = tag.startsWith("/")
        when (name) {
            "b", "strong" -> bold = !closing
            "i", "em" -> italic = !closing
            "span" -> japanese = !closing && Regex("""\blang\s*=\s*["']ja""").containsMatchIn(tag)
            "button" -> {
                if (!closing && tag.contains("data-act=\"say\"")) {
                    val spoken = Regex("""data-text="([^"]*)"""").find(tag)?.groupValues?.get(1).orEmpty()
                    if (spoken.isNotBlank()) runs += ArticleRun.Play(decodeEntities(spoken))
                }
                inButton = !closing
            }
            "h3", "h2" -> {
                if (closing) {
                    val text = heading.toString().trim()
                    if (text.isNotBlank()) blocks += ArticleBlock.Heading(text)
                    heading = StringBuilder()
                }
                inHeading = !closing
            }
            "p" -> if (!closing) inline = true else {
                inline = false
                val paragraph = takeRuns()
                if (paragraph.isNotEmpty()) blocks += ArticleBlock.Paragraph(paragraph)
            }
            "li" -> if (!closing) inline = true else {
                inline = false
                val item = takeRuns()
                if (item.isNotEmpty()) blocks += ArticleBlock.Bullet(item)
            }
            "table" -> {
                if (!closing) {
                    inTable = true
                    rows.clear()
                } else {
                    if (rows.isNotEmpty()) blocks += ArticleBlock.Table(rows.toList())
                    rows.clear()
                    inTable = false
                }
            }
            "tr" -> {
                if (!closing) {
                    inRow = true
                    cells.clear()
                } else if (inRow) {
                    if (inCell) {
                        cells += takeRuns()
                        inCell = false
                    }
                    if (cells.isNotEmpty()) rows += cells.toList()
                    cells.clear()
                    inRow = false
                }
            }
            "td", "th" -> {
                if (!closing) {
                    if (inCell) cells += takeRuns()
                    inCell = true
                    inline = true
                    runs.clear()
                } else if (inCell) {
                    cells += takeRuns()
                    inCell = false
                    inline = false
                }
            }
            "br" -> if (inline && !inButton && !inHeading) runs += ArticleRun.Text("\n", bold, italic, japanese)
        }
    }
    if (runs.isNotEmpty() && !inTable) blocks += ArticleBlock.Paragraph(takeRuns())
    return blocks
}

private fun decodeEntities(text: String): String = text
    .replace("&amp;", "&")
    .replace("&lt;", "<")
    .replace("&gt;", ">")
    .replace("&quot;", "\"")
    .replace("&#39;", "'")
    .replace("&nbsp;", " ")
