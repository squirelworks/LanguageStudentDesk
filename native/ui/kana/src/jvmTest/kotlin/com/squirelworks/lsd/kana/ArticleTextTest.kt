package com.squirelworks.lsd.kana

import com.squirelworks.lsd.core.suite.SuiteApp
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class ArticleTextTest {
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
}
