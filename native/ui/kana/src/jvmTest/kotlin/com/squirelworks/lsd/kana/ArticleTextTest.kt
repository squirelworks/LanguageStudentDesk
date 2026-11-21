package com.squirelworks.lsd.kana

import com.squirelworks.lsd.core.article.ArticleBlock
import com.squirelworks.lsd.core.article.parseArticle
import com.squirelworks.lsd.core.suite.SuiteApp
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class ArticleTextTest {
    @Test
    fun aParagraphWithBoldAndJapaneseIsOneAnnotatedString() {
        val html = """<p>A sentence like <span lang="ja">わたし</span>, and <b>kanji</b>.</p>"""
        val paragraph = parseArticle(html).single() as ArticleBlock.Paragraph
        val text = articleAnnotated(paragraph.runs)
        assertEquals("A sentence like わたし, and kanji.", text.text)
        val japanese = text.spanStyles.single { it.item.localeList != null }
        assertEquals("わたし", text.text.substring(japanese.start, japanese.end))
        val bold = text.spanStyles.single { it.item.fontWeight != null }
        assertEquals("kanji", text.text.substring(bold.start, bold.end))
    }

    @Test
    fun htmlArticlesBecomePlainParagraphs() {
        val text = plainArticle("<p>Hiragana and <b>katakana</b>.</p><ul><li>One</li><li>Two</li></ul>")
        assertEquals("Hiragana and katakana.\n\n• One\n• Two", text)
    }

    @Test
    fun aMissingInstallOpensTheDownloadPage() {
        var opened = ""
        val notice = openSuiteApp(
            SuiteApp("kanji", "SquirrelGo Kanji", pkg = "com.example.kanji", tag = "latest", apk = "SquirrelGoKanji.apk"),
            installed = emptySet(),
            launch = { false },
            browse = { opened = it },
        )
        assertTrue(notice.contains("isn't installed"))
        assertTrue(opened.endsWith("SquirrelGoKanji.apk"))
    }

    @Test
    fun desktopOpenUsesTheReleasePage() {
        var opened = ""
        val notice = openSuiteApp(
            SuiteApp("kanji", "SquirrelGo Kanji", tag = "latest", apk = "SquirrelGoKanji.apk"),
            installed = null,
            launch = { false },
            browse = { opened = it },
        )
        assertEquals("", notice)
        assertEquals("https://github.com/squirelworks/LanguageStudentDesk/releases/latest", opened)
        assertTrue(!opened.endsWith(".apk"))
    }

    @Test
    fun anAppWithNoDownloadDoesNotClaimOneIsOpening() {
        var opened = ""
        val notice = openSuiteApp(
            SuiteApp("bopomofo", "SquirrelGo Bopomofo", pkg = "com.squirelworks.squirrelgobopomofo"),
            installed = emptySet(),
            launch = { false },
            browse = { opened = it },
        )
        assertEquals("", notice)
        assertEquals("", opened)
    }
}
