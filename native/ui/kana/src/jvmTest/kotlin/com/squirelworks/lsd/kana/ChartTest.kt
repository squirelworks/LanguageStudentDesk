package com.squirelworks.lsd.kana

import com.squirelworks.lsd.core.trainer.GlyphRef
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

class ChartTest {
    @Test
    fun aShortLessonStartsTheNextOneOnANewRow() {
        val script = KanaScript(
            id = "hiragana",
            title = "Hiragana",
            lessons = listOf(
                KanaLesson(title = "Y", group = "Basic", cols = 5, chars = listOf(cell("や"), cell("ゆ"), cell("よ"))),
                KanaLesson(title = "R", group = "Basic", chars = listOf(cell("ら"), cell("り"), cell("る"), cell("れ"), cell("ろ"))),
            ),
        )
        val cells = chartGroups(script).single().cells
        assertEquals(10, cells.size)
        assertNull(cells[3])
        assertNull(cells[4])
        assertEquals("ら", cells[5]!!.g)
    }

    @Test
    fun strokeLessItemsStayOutOfWriting() {
        val strokes = mapOf("ㄅ" to listOf("M 1"))
        val glyphs = listOf(
            GlyphRef("zhuyin|ㄅ", "ㄅ", "bo", "Initials"),
            GlyphRef("zhuyin|你好", "你好", "nǐ hǎo", "Everyday"),
            GlyphRef("zhuyin|注音", "注音", "zhù yīn", "Everyday"),
        )
        assertEquals(listOf("ㄅ"), writableGlyphs(glyphs, strokes).map { it.glyph })
        assertEquals(emptyList(), strokeParts("（平）", strokes))
    }

    @Test
    fun pageAccentsComeFromTheStylesheetHex() {
        assertEquals(0xFF005A8C, accentArgb("#005a8c"))
        assertEquals(0xFF1F6F5C, accentArgb("#1f6f5c"))
        assertNull(accentArgb("green"))
    }

    private fun cell(g: String) = KanaCell(g, g)
}
