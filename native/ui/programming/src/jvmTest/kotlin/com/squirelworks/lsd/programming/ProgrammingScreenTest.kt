package com.squirelworks.lsd.programming

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.runComposeUiTest
import androidx.compose.ui.unit.dp
import com.squirelworks.lsd.core.desk.DeskFeature
import com.squirelworks.lsd.core.desk.DeskLevel
import com.squirelworks.lsd.core.programming.ProgrammingCatalog
import com.squirelworks.lsd.core.programming.ProgrammingCourse
import com.squirelworks.lsd.core.programming.ProgrammingGroup
import com.squirelworks.lsd.core.programming.ProgrammingLayout
import com.squirelworks.lsd.core.programming.programmingRules
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

class ProgrammingScreenTest {
    @OptIn(ExperimentalTestApi::class)
    @Test
    fun phoneMenuFiltersAndOpensACourse() = runComposeUiTest {
        val catalog = sample()
        var settings = programmingRules(catalog).fresh()
        var layout = ProgrammingLayout()
        var opened: String? = "unset"
        setContent {
            Box(Modifier.size(412.dp, 900.dp)) {
                ProgrammingApp(
                    catalog = catalog,
                    settings = settings,
                    layout = layout,
                    startLang = "missing",
                    onSettings = { settings = it },
                    onLayout = { layout = it },
                    onOpenCourse = { opened = it?.id },
                )
            }
        }
        onNodeWithText("Programming Student Desk").assertExists()
        onNodeWithText("Web").assertIsDisplayed()
        onNodeWithText("No programming course with id “missing”. Pick one below.").assertExists()
        onNodeWithText("Python").assertExists()
        onNodeWithText("A–Z").performClick()
        onNodeWithText("Python").performClick()
        assertEquals("python", opened)
        onNodeWithText("All courses").performClick()
        assertNull(opened)
    }
}

private fun sample() = ProgrammingCatalog(
    groups = listOf(
        ProgrammingGroup("modern", "Modern and popular", "Current languages."),
        ProgrammingGroup("joke", "Joke and esoteric", "For fun."),
    ),
    courses = listOf(
        ProgrammingCourse(
            "python",
            "Python",
            "1991 · general purpose",
            "A friendly language.",
            "modern",
            listOf("Assembly", "Compiled programs", "Data", "Hardware", "Scripting", "Web"),
        ),
        ProgrammingCourse("intercal", "INTERCAL", "Esoteric · 1972", "Politeness is mandatory.", "joke"),
    ),
    levels = listOf(DeskLevel("simple", "Simple")),
    defaultLevel = "simple",
    features = listOf(
        DeskFeature("programming-older", "Older programming languages", "Legacy languages.", "simple"),
        DeskFeature("programming-joke", "Joke programming languages", "Esoteric languages.", "simple"),
    ),
)
