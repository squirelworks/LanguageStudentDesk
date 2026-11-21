package com.squirelworks.lsd.kana

import androidx.compose.runtime.Composable

@Composable
expect fun PlatformBackHandler(enabled: Boolean, onBack: () -> Unit)

@Composable
expect fun EscapeBackEffect(enabled: Boolean, onEscape: () -> Unit)
