package com.squirelworks.lsd.kana

import androidx.compose.foundation.ScrollState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember

// One scroll state for the whole shell keeps the previous page's offset.
// Keying it by the page starts each newly opened page at the top.
@Composable
fun rememberPageScrollState(page: Any): ScrollState = remember(page) { ScrollState(0) }
