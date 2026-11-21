package com.squirelworks.lsd.core.math

import com.squirelworks.lsd.core.desk.DeskFeature
import com.squirelworks.lsd.core.desk.DeskLevel
import com.squirelworks.lsd.core.desk.encodeDeskSettings
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
            """{"arithmetic":{}}""",
            fresh,
            MathLayout(),
            listOf("Numbers"),
        )
        assertTrue(imported.settings.importedWebView)
        assertEquals("everything", imported.settings.level)
        assertEquals("az", imported.layout.view)
        assertEquals("", imported.layout.tag)
        assertEquals("""{"arithmetic":{}}""", imported.progress)
        val again = importMathWebView(encodeDeskSettings(fresh), encodeMathLayout(MathLayout()), null, imported.settings, imported.layout, listOf("Numbers"))
        assertEquals("everything", again.settings.level)
        assertEquals("az", again.layout.view)
        val kept = applyMathSync(MathSync(progress = """{"algebra":{}}"""), again.settings, again.layout, again.progress, listOf("Numbers"))
        assertTrue(kept.settings.importedWebView)
        assertEquals("""{"algebra":{}}""", kept.progress)
    }
}
