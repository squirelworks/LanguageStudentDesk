package com.squirelworks.lsd.core.speech

import java.util.concurrent.TimeUnit

// Read both pipes while the process runs. A voice list can be over a megabyte,
// and the pipe buffer is only 64 KB, so waiting for exit before reading
// deadlocks and the timeout then kills the process.
fun captureProcessOutput(command: List<String>, timeoutSeconds: Long): String? {
    val started = runCatching { ProcessBuilder(command).start() }.getOrNull() ?: return null
    val deadline = System.nanoTime() + TimeUnit.SECONDS.toNanos(timeoutSeconds)
    val output = StringBuilder()
    val stdout = Thread {
        runCatching { started.inputStream.bufferedReader().use { output.append(it.readText()) } }
    }.apply {
        isDaemon = true
        name = "speech-stdout"
        start()
    }
    val stderr = Thread {
        runCatching { started.errorStream.bufferedReader().use { it.readText() } }
    }.apply {
        isDaemon = true
        name = "speech-stderr"
        start()
    }
    val finished = runCatching { started.waitFor(millisLeft(deadline), TimeUnit.MILLISECONDS) }.getOrDefault(false)
    val readDone = finished && joined(stdout, deadline) && joined(stderr, deadline)
    if (!readDone) {
        destroyProcessTree(started)
        stdout.join(200)
        stderr.join(200)
        return null
    }
    return output.toString()
}

fun destroyProcessTree(process: Process) {
    val children = runCatching { process.toHandle().descendants().toList() }.getOrDefault(emptyList())
    children.forEach { child -> runCatching { child.destroyForcibly() } }
    runCatching { process.destroyForcibly() }
}

private fun joined(thread: Thread, deadlineNanos: Long): Boolean {
    val left = millisLeft(deadlineNanos)
    if (left > 0L) thread.join(left)
    return !thread.isAlive
}

private fun millisLeft(deadlineNanos: Long): Long =
    TimeUnit.NANOSECONDS.toMillis(deadlineNanos - System.nanoTime()).coerceAtLeast(0)
