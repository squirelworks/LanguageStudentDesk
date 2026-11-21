package com.squirelworks.lsd.kana

import kotlin.test.Test
import kotlin.test.assertEquals

class StrokeNumbersTest {
    @Test
    fun aNumberAppearsWhenItsStrokeStartsAndStays() {
        assertEquals(1, visibleStrokeNumbers(3, 0f, playing = true, drawn = 3))
        assertEquals(2, visibleStrokeNumbers(3, 1.2f, playing = true, drawn = 3))
        assertEquals(3, visibleStrokeNumbers(3, 3f, playing = true, drawn = 3))
    }

    @Test
    fun aStillGlyphNumbersEveryStrokeAlreadyDrawn() {
        assertEquals(2, visibleStrokeNumbers(5, 0f, playing = false, drawn = 2))
        assertEquals(0, visibleStrokeNumbers(5, 0f, playing = false, drawn = 0))
    }
}
