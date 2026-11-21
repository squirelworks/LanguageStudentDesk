package com.squirelworks.lsd.kana

import android.content.res.AssetManager
import android.media.MediaPlayer
import android.media.PlaybackParams
import android.os.Build

// Plays a packaged recording and keeps its pitch when the speed changes.
class AndroidClipPlayer(private val assets: AssetManager) {
    private var player: MediaPlayer? = null

    fun stop() {
        player?.let { playing ->
            runCatching { playing.stop() }
            playing.release()
        }
        player = null
    }

    fun play(path: String, rate: Float) {
        stop()
        val mp = MediaPlayer()
        val afd = assets.openFd(path)
        mp.setDataSource(afd.fileDescriptor, afd.startOffset, afd.length)
        afd.close()
        mp.setOnPreparedListener { ready ->
            if (Build.VERSION.SDK_INT >= 23) {
                runCatching { ready.playbackParams = PlaybackParams().setSpeed(rate).setPitch(1f) }
            }
            ready.start()
        }
        mp.prepareAsync()
        player = mp
    }
}
