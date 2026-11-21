package com.squirelworks.lsd.kana

import kotlin.test.Test
import kotlin.test.assertEquals

class ArticleTableTest {
    @Test
    fun shortColumnsKeepTheirOwnWidth() {
        assertEquals(intArrayOf(40, 80).toList(), articleColumnWidths(intArrayOf(40, 80), maxWidth = 200, gap = 8).toList())
    }

    @Test
    fun aWideLastColumnWrapsAndEarlierColumnsStayPut() {
        assertEquals(intArrayOf(40, 152).toList(), articleColumnWidths(intArrayOf(40, 400), maxWidth = 200, gap = 8).toList())
    }
}
