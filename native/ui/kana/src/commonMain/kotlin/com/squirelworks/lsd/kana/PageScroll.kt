package com.squirelworks.lsd.kana

import androidx.compose.foundation.ScrollState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember

// Key this with the navigation step (push, jump, or back), not with the page
// value. replace() keeps the step, so answering a quiz, switching a tab, or
// typing keeps the offset. A new step starts at the top.
@Composable
fun rememberPageScrollState(step: Any): ScrollState = remember(step) { ScrollState(0) }
