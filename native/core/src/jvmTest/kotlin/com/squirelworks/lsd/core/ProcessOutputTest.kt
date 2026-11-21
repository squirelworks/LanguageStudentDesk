package com.squirelworks.lsd.core

import com.squirelworks.lsd.core.speech.captureProcessOutput
import java.nio.file.Files
import java.util.concurrent.TimeUnit
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

    @Test
    fun timeoutKillsDescendants() {
        val dir = Files.createTempDirectory("kana-voice")
        val pidFile = dir.resolve("child.pid")
        val result = captureProcessOutput(
            listOf("/bin/sh", "-c", "sleep 60 & echo \$! > '$pidFile'; wait"),
            1,
        )
        assertNull(result)
        val pid = pidFile.toFile().readText().trim().toLong()
        val deadline = System.nanoTime() + TimeUnit.SECONDS.toNanos(2)
        var alive = true
        while (System.nanoTime() < deadline) {
            alive = ProcessHandle.of(pid).map { it.isAlive }.orElse(false)
            if (!alive) break
            Thread.sleep(50)
        }
        assertEquals(false, alive)
    }
}
