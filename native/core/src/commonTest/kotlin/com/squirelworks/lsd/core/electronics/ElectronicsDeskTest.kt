package com.squirelworks.lsd.core.electronics

import com.squirelworks.lsd.core.desk.DeskFeature
import com.squirelworks.lsd.core.desk.DeskLevel
import com.squirelworks.lsd.core.desk.encodeDeskSettings
import kotlinx.serialization.json.Json
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue

class ElectronicsDeskTest {
    private val catalog = ElectronicsCatalog(
        groups = listOf(
            ElectronicsGroup("foundations", "Foundations", "Units, laws, meters and safe habits."),
            ElectronicsGroup("components", "Components", "Passives, semiconductors and sensors."),
        ),
        courses = listOf(
            ElectronicsCourse("components", "Components", "Parts", "Resistors and diodes.", "components", listOf("Passives")),
            ElectronicsCourse("foundations", "Foundations", "Core", "Ohm's law.", "foundations", listOf("Basics")),
        ),
        levels = listOf(DeskLevel("simple", "Simple")),
        defaultLevel = "simple",
        features = listOf(DeskFeature("sample", "Sample", level = "simple")),
    )
    private val rules = electronicsRules(catalog)

    @Test
    fun sectionsStayInOrderAndAzIsOneList() {
        val sections = arrangeElectronics(catalog, ElectronicsLayout())
        assertEquals(listOf("foundations", "components"), sections.map { it.id })
        assertEquals("Foundations", sections.first().title)
        val az = arrangeElectronics(catalog, ElectronicsLayout(view = "az"))
        assertEquals("All courses, A–Z", az.single().title)
        assertEquals(listOf("Components", "Foundations"), az.single().items.map { it.name })
    }

    @Test
    fun aMissingCategoryReturnsToAllAndAnUnknownCourseStaysOnTheMenu() {
        assertEquals("", normalizeElectronicsLayout(ElectronicsLayout(tag = "Gone"), listOf("Basics")).tag)
        assertEquals("foundations", electronicsCourse(catalog, " Foundations ")?.id)
        assertNull(electronicsCourse(catalog, "nope"))
        assertTrue(isElectronicsMenuUrl("file:///android_asset/www/SquirrelGo-Apps/electronics-student-desk/www/index.html"))
        assertFalse(isElectronicsMenuUrl("file:///android_asset/www/electronics-learner/index.html"))
    }

    @Test
    fun theOldWebViewMenuIsImportedOnceAndProgressStaysOnThePage() {
        val fresh = rules.fresh()
        val imported = importElectronicsWebView(
            encodeDeskSettings(fresh.copy(level = "everything")),
            encodeElectronicsLayout(ElectronicsLayout(view = "az", tag = "Gone")),
            fresh,
            ElectronicsLayout(),
            listOf("Basics"),
        )
        assertTrue(imported.settings.importedWebView)
        assertEquals("everything", imported.settings.level)
        assertEquals("az", imported.layout.view)
        assertEquals("", imported.layout.tag)
        val again = importElectronicsWebView(
            encodeDeskSettings(fresh),
            encodeElectronicsLayout(ElectronicsLayout()),
            imported.settings,
            imported.layout,
            listOf("Basics"),
        )
        assertEquals("everything", again.settings.level)
        assertEquals("az", again.layout.view)
        val page = electronicsSeedDocument(fresh, ElectronicsLayout(), "http://127.0.0.1/electronics-learner/index.html")
        assertFalse(page.contains("lsd-electronics-v1"))
        assertTrue(page.indexOf("<!DOCTYPE html>") < page.indexOf("<script>"))
    }

    @Test
    fun aMenuChangeSurvivesAPostFromTheOpenCourse() {
        val fresh = rules.fresh()
        val opened = electronicsSeedSnapshot(fresh, ElectronicsLayout(view = "sections"))
        val menu = ElectronicsLayout(view = "az", tag = "Basics")
        val fromTab = parseElectronicsSync(
            """{"settings":${Json.encodeToString(opened.settings)},"view":${Json.encodeToString(opened.view)},"progress":"{\"foundations\":{\"q\":1}}"}""",
        )
        assertEquals(opened, fromTab)
        val kept = if (fromTab != null && electronicsSyncChanged(opened, fromTab)) {
            applyElectronicsSync(fromTab, fresh, menu, listOf("Basics")).layout
        } else {
            menu
        }
        assertEquals("az", kept.view)
        assertEquals("Basics", kept.tag)
    }
}
