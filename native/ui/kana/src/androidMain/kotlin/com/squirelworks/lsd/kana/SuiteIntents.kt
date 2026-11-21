package com.squirelworks.lsd.kana

import android.app.Activity
import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import com.squirelworks.lsd.core.suite.SuiteApp

// Opening a sibling app, its download page, and a query sent into this app.
class SuiteIntents(private val activity: Activity) {
    private var packages: List<String> = emptyList()

    fun remember(apps: List<SuiteApp>) {
        packages = apps.map { it.pkg }
    }

    fun installed(): Set<String> = packages.filter { launchIntentFor(it) != null }.toSet()

    fun launch(app: SuiteApp, query: String): Boolean {
        val launch = launchIntentFor(app.pkg) ?: return false
        if (query.isNotBlank()) launch.putExtra(EXTRA_QUERY, query)
        launch.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        return try {
            activity.startActivity(launch)
            true
        } catch (_: ActivityNotFoundException) {
            false
        }
    }

    fun openHttps(url: String) {
        if (!url.startsWith("https://")) return
        try {
            activity.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
        } catch (_: ActivityNotFoundException) {
        }
    }

    fun queryOf(intent: Intent?): String? =
        intent?.getStringExtra(EXTRA_QUERY)?.takeIf { it.isNotBlank() }

    private fun launchIntentFor(pkg: String): Intent? {
        val manager = activity.packageManager
        return manager.getLaunchIntentForPackage("$pkg.debug") ?: manager.getLaunchIntentForPackage(pkg)
    }

    companion object {
        const val EXTRA_QUERY = "com.squirelworks.squirrelgo.QUERY"
    }
}
