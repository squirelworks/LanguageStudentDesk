package com.squirelworks.lsd.core.languages

import java.io.File

class FileTextStore(private val file: File) : TextStore {
    override fun read(): String = if (file.isFile) file.readText() else ""

    override fun write(text: String) {
        file.parentFile?.mkdirs()
        val tmp = File(file.parentFile, file.name + ".tmp")
        tmp.writeText(text)
        if (!tmp.renameTo(file)) {
            file.writeText(text)
            tmp.delete()
        }
    }
}
