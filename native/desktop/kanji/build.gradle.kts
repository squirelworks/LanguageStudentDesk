import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.compose)
    alias(libs.plugins.kotlin.compose)
}

val kanjiAssets = rootProject.layout.buildDirectory.dir("generated-kanji").get().asFile
val appVersion = readAppVersion(rootProject.file("versions/kanji.properties"))
requireNewerThanWebView(
    appVersion,
    rootProject.file("../archive/webview/kanji/app/build.gradle"),
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
    implementation(project(":ui:kanji"))
}

sourceSets.main.get().resources.srcDir(kanjiAssets)

tasks.named("processResources").configure {
    dependsOn(rootProject.tasks.named("generateKanjiCatalog"))
}

compose.desktop {
    application {
        mainClass = "com.squirelworks.squirrelgokanji.MainKt"
        nativeDistributions {
            val os = System.getProperty("os.name").lowercase()
            val formats = when {
                "mac" in os -> listOf(TargetFormat.Dmg)
                "win" in os -> listOf(TargetFormat.Msi)
                else -> listOf(TargetFormat.Deb, TargetFormat.AppImage)
            }
            targetFormats(*formats.toTypedArray())
            packageName = "SquirrelGoKanji"
            packageVersion = appVersion.versionName
            description = "SquirrelGo Kanji"
            vendor = "SquirrelWorks"
        }
    }
}
