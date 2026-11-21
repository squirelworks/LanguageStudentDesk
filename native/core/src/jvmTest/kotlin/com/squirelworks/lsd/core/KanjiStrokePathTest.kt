package com.squirelworks.lsd.core

import com.squirelworks.lsd.core.strokes.StrokeSegment
import com.squirelworks.lsd.core.strokes.Strokes
import kotlin.math.abs
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class KanjiStrokePathTest {
    // First strokes of 日 from the KanjiVG table the native app reads.
    private val nichi = listOf(
        "M31.5,24.5c1.1,1.1,1.7,2.8,1.7,4.8c0,1.6-0.2,38.1-0.1,53.5c0,3.8,0.1,6.3,0.1,6.8",
        "M33.5,26c0.8-0.1,37.7-3,40.8-3.2c3.2-0.2,5,1.8,5,4.2c0,4-0.2,40.8-0.2,56c0,3.5,0,5.7,0,6",
        "M34.2,55.2c7.8-0.5,35.9-2.5,44.1-2.8",
        "M34.2,86.5c10.5-0.8,34.1-2.1,43.8-2.2",
    )

    @Test
    fun nichiPointsAreDrawnInsideTheKanjiBox() {
        for (path in nichi) {
            val points = Strokes.points(path)
            assertTrue(points.isNotEmpty(), path)
            assertTrue(Strokes.segments(path).any { it is StrokeSegment.Cubic }, path)
            for (point in points) {
                assertTrue(point.x in 0.0..109.0, "$path -> $point")
                assertTrue(point.y in 0.0..109.0, "$path -> $point")
            }
        }
    }

    @Test
    fun smoothCubicReflectsThePreviousControl() {
        val cubics = Strokes.segments("M0,0 C10,0 20,0 30,0 S50,0 60,0")
            .filterIsInstance<StrokeSegment.Cubic>()
        assertEquals(2, cubics.size)
        assertClose(40.0, cubics[1].c1x)
        assertClose(0.0, cubics[1].c1y)
        assertClose(50.0, cubics[1].c2x)
        assertClose(60.0, cubics[1].x)
    }

    @Test
    fun relativeSmoothCubicUsesTheUpdatedPoint() {
        val cubic = Strokes.segments("M0,0 c10,20 30,20 40,0 s20,-20 40,0")
            .filterIsInstance<StrokeSegment.Cubic>()[1]
        assertClose(50.0, cubic.c1x)
        assertClose(-20.0, cubic.c1y)
        assertClose(60.0, cubic.c2x)
        assertClose(-20.0, cubic.c2y)
        assertClose(80.0, cubic.x)
        assertClose(0.0, cubic.y)
    }

    @Test
    fun relativeMoveAndCubicStayOffsetFromThePen() {
        val segs = Strokes.segments("m10,20 c5,1 8,2 12,4")
        val move = segs.first() as StrokeSegment.Move
        assertClose(10.0, move.x)
        assertClose(20.0, move.y)
        val cubic = segs.filterIsInstance<StrokeSegment.Cubic>().single()
        assertClose(15.0, cubic.c1x)
        assertClose(21.0, cubic.c1y)
        assertClose(18.0, cubic.c2x)
        assertClose(22.0, cubic.c2y)
        assertClose(22.0, cubic.x)
        assertClose(24.0, cubic.y)
    }
}

private fun assertClose(expected: Double, actual: Double) {
    assertTrue(abs(expected - actual) < 1e-9, "expected $expected, was $actual")
}
