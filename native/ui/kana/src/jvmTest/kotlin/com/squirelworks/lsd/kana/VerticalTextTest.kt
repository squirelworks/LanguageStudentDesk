package com.squirelworks.lsd.kana

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.assertCountEquals
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.runComposeUiTest
import androidx.compose.ui.text.TextStyle
import kotlin.test.Test
import kotlin.test.assertEquals

class VerticalTextTest {
    @OptIn(ExperimentalTestApi::class)
    @Test
    fun aMongolianWordIsOneTextRun() = runComposeUiTest {
        val word = "ᠮᠣᠩᠭᠣᠯ"
        setContent {
            GlyphText(word, TextStyle.Default, vertical = true)
        }
        onAllNodesWithText(word, substring = false).assertCountEquals(1)
        onAllNodesWithText("ᠮ", substring = false).assertCountEquals(0)
    }

    @Test
    fun turningAWideLineReservesATallBox() {
        val box = rotatedBox(contentWidth = 80, contentHeight = 20)
        assertEquals(20, box.width)
        assertEquals(80, box.height)
        assertEquals((20 - 80) / 2, box.x)
        assertEquals((80 - 20) / 2, box.y)
    }
}
