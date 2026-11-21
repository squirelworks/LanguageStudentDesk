package com.squirelworks.lsd.kana

import androidx.compose.foundation.ScrollState
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.runComposeUiTest
import androidx.compose.ui.unit.dp
import kotlin.test.Test
import kotlin.test.assertEquals

class PageScrollTest {
    @OptIn(ExperimentalTestApi::class)
    @Test
    fun answeringAQuestionKeepsTheScrollOffset() = runComposeUiTest {
        var question by mutableIntStateOf(1)
        var step by mutableIntStateOf(0)
        lateinit var scroll: ScrollState
        setContent {
            val state = rememberPageScrollState(step)
            SideEffect { scroll = state }
            Column(Modifier.height(80.dp).verticalScroll(state)) {
                Text("Question $question")
                Spacer(Modifier.height(600.dp))
            }
        }
        waitForIdle()
        scroll.scrollTo(200)
        waitForIdle()
        assertEquals(200, scroll.value)
        question = 2
        waitForIdle()
        assertEquals(200, scroll.value)
        step = 1
        waitForIdle()
        assertEquals(0, scroll.value)
    }
}
