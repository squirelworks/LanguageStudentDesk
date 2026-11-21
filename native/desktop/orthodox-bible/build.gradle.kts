import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.compose)
    alias(libs.plugins.kotlin.compose)
}

val bibleAssets = rootProject.layout.buildDirectory.dir("generated-orthodox-bible").get().asFile
val appVersion = readAppVersion(rootProject.file("versions/orthodox-bible.properties"))
requireNewerThanWebView(
    appVersion,
    rootProject.file("../archive/webview/orthodox-bible/app/build.gradle"),
)

kotlin {
    compilerOptions {
        jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
    }
}

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

dependencies {
    implementation(compose.desktop.currentOs)
    implementation(project(":ui:orthodox-bible"))
}

sourceSets.main.get().resources.srcDir(bibleAssets)

tasks.named("processResources").configure {
    dependsOn(rootProject.tasks.named("generateOrthodoxBibleCatalog"))
}

compose.desktop {
    application {
        mainClass = "com.squirelworks.squirrelgoorthodoxbible.MainKt"
        nativeDistributions {
            val os = System.getProperty("os.name").lowercase()
            val formats = when {
                "mac" in os -> listOf(TargetFormat.Dmg)
                "win" in os -> listOf(TargetFormat.Msi)
                else -> listOf(TargetFormat.Deb, TargetFormat.AppImage)
            }
            targetFormats(*formats.toTypedArray())
            packageName = "SquirrelGoOrthodoxBible"
            packageVersion = appVersion.versionName
            description = "SquirrelGo Orthodox Bible"
            vendor = "SquirrelWorks"
        }
    }
}
