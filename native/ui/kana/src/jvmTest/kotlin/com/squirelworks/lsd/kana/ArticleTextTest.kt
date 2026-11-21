package com.squirelworks.lsd.kana

import kotlin.test.Test
import kotlin.test.assertEquals

class ArticleTextTest {
    @Test
    fun htmlArticlesBecomePlainParagraphs() {
        val text = plainArticle("<p>Hiragana and <b>katakana</b>.</p><ul><li>One</li><li>Two</li></ul>")
        assertEquals("Hiragana and katakana.\n\n• One\n• Two", text)
    }
}
