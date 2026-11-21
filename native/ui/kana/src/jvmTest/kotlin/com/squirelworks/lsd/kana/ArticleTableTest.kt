package com.squirelworks.lsd.kana

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.width
import androidx.compose.material3.MaterialTheme
import androidx.compose.ui.Modifier
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.assertCountEquals
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.runComposeUiTest
import androidx.compose.ui.unit.dp
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

    @OptIn(ExperimentalTestApi::class)
    @Test
    fun aPronunciationTableComposesOnANarrowPhone() = runComposeUiTest {
        setContent {
            MaterialTheme {
                Box(Modifier.width(220.dp)) {
                    ArticleBlocks(
                        "<table><tr><th>Letter</th><th>Say it like</th></tr><tr><td>a</td><td>f<b>a</b>ther</td></tr><tr><td>tlh</td><td>t then a hissed l</td></tr></table>",
                        onPlay = {},
                    )
                }
            }
        }
        onAllNodesWithText("Letter", substring = false).assertCountEquals(1)
        onAllNodesWithText("Say it like", substring = false).assertCountEquals(1)
        onAllNodesWithText("LetterSay", substring = true).assertCountEquals(0)
        onAllNodesWithText("tlh", substring = false).assertCountEquals(1)
        onAllNodesWithText("father", substring = true).assertCountEquals(1)
    }
}
