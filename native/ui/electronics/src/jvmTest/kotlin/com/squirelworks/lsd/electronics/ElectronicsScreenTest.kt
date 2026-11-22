package com.squirelworks.lsd.electronics

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
import com.squirelworks.lsd.core.electronics.ElectronicsCatalog
import com.squirelworks.lsd.core.electronics.ElectronicsCourse
import com.squirelworks.lsd.core.electronics.ElectronicsGroup
import com.squirelworks.lsd.core.electronics.ElectronicsLayout
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

class ElectronicsScreenTest {
    @OptIn(ExperimentalTestApi::class)
    @Test
    fun phoneMenuWrapsCategoriesAndOpensACourse() = runComposeUiTest {
        val catalog = sample()
        var layout = ElectronicsLayout()
        var opened: String? = "unset"
        setContent {
            Box(Modifier.size(412.dp, 900.dp)) {
                ElectronicsApp(
                    catalog = catalog,
                    layout = layout,
                    startLang = "missing",
                    onLayout = { layout = it },
                    onOpenCourse = { opened = it?.id },
                )
            }
        }
        onNodeWithText("Electronics Student Desk").assertExists()
        onNodeWithText("No electronics course with id “missing”. Pick one below.").assertExists()
        onNodeWithText("Semiconductors", substring = false).assertIsDisplayed()
        onNodeWithText("Charge, current, voltage and Ohm's law.", substring = true).performClick()
        assertEquals("foundations", opened)
        onNodeWithText("All courses").performClick()
        assertNull(opened)
    }
}

private fun sample() = ElectronicsCatalog(
    groups = listOf(ElectronicsGroup("foundations", "Foundations", "Units, laws, meters and safe habits.")),
    courses = listOf(
        ElectronicsCourse(
            "foundations",
            "Foundations",
            "Core · units and laws",
            "Charge, current, voltage and Ohm's law.",
            "foundations",
            listOf(
                "Analysis", "Basics", "Bench", "CAD", "EMC", "Embedded", "Logic", "MCU",
                "Manufacturing", "Passives", "Power", "Safety", "Schematics", "Semiconductors",
            ),
        ),
    ),
    levels = listOf(DeskLevel("simple", "Simple")),
    defaultLevel = "simple",
    features = listOf(DeskFeature("sample", "Sample", level = "simple")),
)
