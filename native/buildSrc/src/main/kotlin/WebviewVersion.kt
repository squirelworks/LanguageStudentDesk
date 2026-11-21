import java.io.File

data class WebviewVersion(val code: Int, val name: String)

// One higher than the WebView app's versionCode, read from its build file,
// so a native release installs over that app. Same application id, same key.
fun webviewVersionAbove(legacyBuild: File): WebviewVersion {
    val text = legacyBuild.readText()
    val code = Regex("""versionCode\s+(\d+)""").find(text)?.groupValues?.get(1)?.toInt()
        ?: error("No versionCode in ${legacyBuild.path}")
    val name = Regex("""versionName\s+"([^"]+)"""").find(text)?.groupValues?.get(1)
        ?: error("No versionName in ${legacyBuild.path}")
    return WebviewVersion(code + 1, name)
}
