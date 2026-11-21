package com.squirelworks.lsd.core

import com.squirelworks.lsd.core.article.ArticleBlock
import com.squirelworks.lsd.core.article.ArticleRun
import com.squirelworks.lsd.core.article.parseArticle
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class ArticleHtmlTest {
    @Test
    fun paragraphsKeepBoldAndListsKeepBullets() {
        val blocks = parseArticle("<p>Written <b>Japanese</b> mixes scripts.</p><ul><li>One</li><li>Two</li></ul>")
        val paragraph = blocks[0] as ArticleBlock.Paragraph
        assertEquals("Written ", (paragraph.runs[0] as ArticleRun.Text).value)
        assertTrue((paragraph.runs[1] as ArticleRun.Text).bold)
        assertEquals(listOf("One", "Two"), blocks.drop(1).map { ((it as ArticleBlock.Bullet).runs.single() as ArticleRun.Text).value })
    }

    @Test
    fun aPlayButtonKeepsTheSpokenText() {
        val html = """<h3>Vowels</h3><table><tr><td lang="ja">あい</td><td>ai, love</td><td><button class="round play" data-act="say" data-text="あい" aria-label="Play あい">▶</button></td></tr></table>"""
        val blocks = parseArticle(html)
        assertEquals("Vowels", (blocks[0] as ArticleBlock.Heading).text)
        val row = (blocks[1] as ArticleBlock.Table).rows.single()
        assertEquals("あい", (row[0].single() as ArticleRun.Text).value)
        assertEquals("ai, love", (row[1].single() as ArticleRun.Text).value)
        assertEquals("あい", (row[2].single() as ArticleRun.Play).spoken)
    }

    @Test
    fun aParagraphKeepsBoldJapaneseAndTheSpaceBeforePunctuation() {
        val html = """<p>A sentence like <span lang="ja">わたし</span>, and <b>kanji</b>.</p>"""
        val paragraph = parseArticle(html).single() as ArticleBlock.Paragraph
        val text = paragraph.runs.filterIsInstance<ArticleRun.Text>()
        assertEquals("A sentence like わたし, and kanji.", text.joinToString("") { it.value })
        val japanese = text.single { it.japanese }
        assertEquals("わたし", japanese.value)
        assertEquals("kanji", text.single { it.bold }.value)
    }
}
