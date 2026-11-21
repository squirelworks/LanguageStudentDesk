import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.compose)
    alias(libs.plugins.kotlin.compose)
}

val phrasebookAssets = rootProject.layout.buildDirectory.dir("generated-phrasebook").get().asFile
val appVersion = readAppVersion(rootProject.file("versions/phrasebook.properties"))
requireNewerThanWebView(
    appVersion,
    rootProject.file("../archive/webview/phrasebook/app/build.gradle"),
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
    implementation(project(":ui:phrasebook"))
}

sourceSets.main.get().resources.srcDir(phrasebookAssets)

tasks.named("processResources").configure {
    dependsOn(rootProject.tasks.named("generatePhrasebookCatalog"))
}

compose.desktop {
    application {
        mainClass = "com.squirelworks.squirrelgophrasebook.MainKt"
        nativeDistributions {
            val os = System.getProperty("os.name").lowercase()
            val formats = when {
                "mac" in os -> listOf(TargetFormat.Dmg)
                "win" in os -> listOf(TargetFormat.Msi)
                else -> listOf(TargetFormat.Deb, TargetFormat.AppImage)
            }
            targetFormats(*formats.toTypedArray())
            packageName = "SquirrelGoPhrasebook"
            packageVersion = appVersion.versionName
            description = "SquirrelGo Phrasebook"
            vendor = "SquirrelWorks"
        }
    }
}
