package com.squirelworks.lsd.core

import com.squirelworks.lsd.core.speech.captureProcessOutput
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

class ProcessOutputTest {
    @Test
    fun readsStdoutAndStderrPastThePipeBuffer() {
        val stdoutBytes = 256 * 1024
        val output = captureProcessOutput(
            listOf(
                "/bin/sh",
                "-c",
                "dd if=/dev/zero bs=1024 count=256 status=none; dd if=/dev/zero bs=1024 count=80 status=none >&2",
            ),
            8,
        )
        assertEquals(stdoutBytes, output?.length)
    }

    @Test
    fun timeoutCoversTheReadAndKillsAStuckProcess() {
        assertNull(captureProcessOutput(listOf("/bin/sh", "-c", "sleep 30"), 1))
    }
}
