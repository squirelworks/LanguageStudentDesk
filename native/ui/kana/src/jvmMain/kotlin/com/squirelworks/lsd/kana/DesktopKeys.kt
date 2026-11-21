package com.squirelworks.lsd.kana

import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.input.key.Key
import androidx.compose.ui.input.key.KeyEvent
import androidx.compose.ui.input.key.KeyEventType
import androidx.compose.ui.input.key.key
import androidx.compose.ui.input.key.type

class DesktopKeys {
    var onEscape: (() -> Unit)? = null

    fun preview(event: KeyEvent): Boolean {
        if (event.type != KeyEventType.KeyDown || event.key != Key.Escape) return false
        onEscape?.invoke()
        return onEscape != null
    }
}

val LocalDesktopKeys = staticCompositionLocalOf { DesktopKeys() }

@Composable
actual fun EscapeBackEffect(onEscape: () -> Unit) {
    val keys = LocalDesktopKeys.current
    val current by rememberUpdatedState(onEscape)
    SideEffect { keys.onEscape = { current() } }
    DisposableEffect(keys) {
        onDispose { keys.onEscape = null }
    }
}
