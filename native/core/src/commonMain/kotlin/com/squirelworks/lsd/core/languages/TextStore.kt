package com.squirelworks.lsd.core.languages

interface TextStore {
    fun read(): String
    fun write(text: String)
}
