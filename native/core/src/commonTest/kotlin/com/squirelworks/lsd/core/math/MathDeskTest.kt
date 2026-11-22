package com.squirelworks.lsd.core.math

import com.squirelworks.lsd.core.desk.DeskFeature
import com.squirelworks.lsd.core.desk.DeskLevel
import com.squirelworks.lsd.core.desk.encodeDeskSettings
import kotlinx.serialization.json.Json
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue

class MathDeskTest {
    private val catalog = MathCatalog(
        groups = listOf(
            MathGroup("foundations", "Foundations", "Number sense."),
            MathGroup("algebra", "Algebra", "Symbols and equations."),
        ),
        courses = listOf(
            MathCourse("algebra", "Algebra", "Secondary", "Equations.", "algebra", listOf("Algebra")),
            MathCourse("arithmetic", "Arithmetic", "Foundations", "The four operations.", "foundations", listOf("Numbers")),
        ),
        levels = listOf(DeskLevel("simple", "Simple")),
        defaultLevel = "simple",
        features = listOf(DeskFeature("sample", "Sample", level = "simple")),
    )
    private val rules = mathRules(catalog)

    @Test
    fun sectionsStayInOrderAndAzIsOneList() {
        val sections = arrangeMath(catalog, MathLayout())
        assertEquals(listOf("foundations", "algebra"), sections.map { it.id })
        assertEquals(listOf("Arithmetic"), sections.first().items.map { it.name })
        val az = arrangeMath(catalog, MathLayout(view = "az"))
        assertEquals("All courses, A–Z", az.single().title)
        assertEquals(listOf("Algebra", "Arithmetic"), az.single().items.map { it.name })
    }

    @Test
    fun aMissingCategoryReturnsToAllAndAnUnknownCourseStaysOnTheMenu() {
        assertEquals("", normalizeMathLayout(MathLayout(tag = "Gone"), listOf("Numbers")).tag)
        assertEquals("arithmetic", mathCourse(catalog, " Arithmetic ")?.id)
        assertNull(mathCourse(catalog, "nope"))
        assertTrue(isMathMenuUrl("file:///android_asset/www/SquirrelGo-Apps/math-student-desk/www/index.html"))
        assertFalse(isMathMenuUrl("file:///android_asset/www/math-learner/index.html"))
    }

    @Test
    fun theOldWebViewStateIsImportedOnce() {
        val fresh = rules.fresh()
        val imported = importMathWebView(
            encodeDeskSettings(fresh.copy(level = "everything")),
            encodeMathLayout(MathLayout(view = "az", tag = "Gone")),
            fresh,
            MathLayout(),
            listOf("Numbers"),
        )
        assertTrue(imported.settings.importedWebView)
        assertEquals("everything", imported.settings.level)
        assertEquals("az", imported.layout.view)
        assertEquals("", imported.layout.tag)
        val again = importMathWebView(encodeDeskSettings(fresh), encodeMathLayout(MathLayout()), imported.settings, imported.layout, listOf("Numbers"))
        assertEquals("everything", again.settings.level)
        assertEquals("az", again.layout.view)
        val page = mathSeedDocument(fresh, MathLayout(), "http://127.0.0.1/math-learner/index.html")
        assertFalse(page.contains("lsd-math-v1"))
    }

    @Test
    fun aMenuChangeSurvivesAPostFromTheOpenCourse() {
        val fresh = rules.fresh()
        val opened = mathSeedSnapshot(fresh, MathLayout(view = "sections"))
        val menu = MathLayout(view = "az", tag = "Numbers")
        val fromTab = parseMathSync(
            """{"settings":${Json.encodeToString(opened.settings)},"view":${Json.encodeToString(opened.view)},"progress":"{\"arithmetic\":{\"q\":1}}"}""",
        )
        assertEquals(opened, fromTab)
        val kept = if (fromTab != null && mathSyncChanged(opened, fromTab)) {
            applyMathSync(fromTab, fresh, menu, listOf("Numbers")).layout
        } else {
            menu
        }
        assertEquals("az", kept.view)
        assertEquals("Numbers", kept.tag)
    }
}
