package com.squirelworks.lsd.kana

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

    private fun cell(g: String) = KanaCell(g, g)
}
