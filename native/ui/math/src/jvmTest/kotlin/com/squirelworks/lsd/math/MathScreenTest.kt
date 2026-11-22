package com.squirelworks.lsd.math

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
import com.squirelworks.lsd.core.math.MathCatalog
import com.squirelworks.lsd.core.math.MathCourse
import com.squirelworks.lsd.core.math.MathGroup
import com.squirelworks.lsd.core.math.MathLayout
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

class MathScreenTest {
    @OptIn(ExperimentalTestApi::class)
    @Test
    fun phoneMenuWrapsCategoriesAndOpensACourse() = runComposeUiTest {
        val catalog = sample()
        var layout = MathLayout()
        var opened: String? = "unset"
        setContent {
            Box(Modifier.size(412.dp, 900.dp)) {
                MathApp(
                    catalog = catalog,
                    layout = layout,
                    startLang = "missing",
                    onLayout = { layout = it },
                    onOpenCourse = { opened = it?.id },
                )
            }
        }
        onNodeWithText("Maths Edu-Training Helper").assertExists()
        onNodeWithText("No math course with id “missing”. Pick one below.").assertExists()
        onNodeWithText("Vectors", substring = false).assertIsDisplayed()
        onNodeWithText("Arithmetic").performClick()
        assertEquals("arithmetic", opened)
        onNodeWithText("All courses").performClick()
        assertNull(opened)
    }
}

private fun sample() = MathCatalog(
    groups = listOf(MathGroup("foundations", "Foundations", "Number sense.")),
    courses = listOf(
        MathCourse(
            "arithmetic",
            "Arithmetic",
            "Foundations · ages 8+",
            "The four operations.",
            "foundations",
            listOf("Algebra", "Calculus", "Change", "Equations", "Foundations", "Geometry", "Linear algebra", "Numbers", "Shape", "Topology", "Trigonometry", "Vectors"),
        ),
    ),
    levels = listOf(DeskLevel("simple", "Simple")),
    defaultLevel = "simple",
    features = listOf(DeskFeature("sample", "Sample", level = "simple")),
)
