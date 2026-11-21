import java.io.File

data class AppVersion(val versionName: String, val versionCode: Int)

// versionCode is major * 1_000_000 + minor * 1_000 + patch.
fun readAppVersion(file: File): AppVersion {
    val text = file.readText()
    val name = Regex("""(?m)^versionName=(.+)$""").find(text)?.groupValues?.get(1)?.trim()
        ?: error("versionName missing in ${file.path}")
    val parts = Regex("""^(\d+)\.(\d+)\.(\d+)$""").matchEntire(name)
        ?: error("versionName in ${file.path} must be major.minor.patch")
    val major = parts.groupValues[1].toInt()
    val minor = parts.groupValues[2].toInt()
    val patch = parts.groupValues[3].toInt()
    return AppVersion(name, major * 1_000_000 + minor * 1_000 + patch)
}

// A port must install over its WebView app. The WebView versionCode is read
// from that app's build file; it is not the native version.
fun requireNewerThanWebView(version: AppVersion, legacyBuild: File) {
    val text = legacyBuild.readText()
    val web = Regex("""versionCode\s+(\d+)""").find(text)?.groupValues?.get(1)?.toInt()
        ?: error("No versionCode in ${legacyBuild.path}")
    if (version.versionCode <= web) {
        error(
            "Native ${version.versionName} (${version.versionCode}) must be greater than " +
                "WebView versionCode $web in ${legacyBuild.path}",
        )
    }
}
