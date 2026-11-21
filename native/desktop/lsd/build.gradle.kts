import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.compose)
    alias(libs.plugins.kotlin.compose)
}

val deskAssets = rootProject.layout.buildDirectory.dir("generated-desk").get().asFile
val appVersion = readAppVersion(rootProject.file("versions/lsd.properties"))
requireNewerThanWebView(
    appVersion,
    rootProject.file("../SquirrelGo-Apps/lsd-suite/android/app/build.gradle"),
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
    implementation(project(":ui:desk"))
}

sourceSets.main.get().resources.srcDir(deskAssets)

tasks.named("processResources").configure {
    dependsOn(rootProject.tasks.named("generateDeskCatalog"))
}

compose.desktop {
    application {
        mainClass = "com.squirelworks.lsd.MainKt"
        nativeDistributions {
            val os = System.getProperty("os.name").lowercase()
            val formats = when {
                "mac" in os -> listOf(TargetFormat.Dmg)
                "win" in os -> listOf(TargetFormat.Msi)
                else -> listOf(TargetFormat.Deb, TargetFormat.AppImage)
            }
            targetFormats(*formats.toTypedArray())
            packageName = "LanguageStudentDesk"
            packageVersion = appVersion.versionName
            description = "Language Student Desk"
            vendor = "SquirrelWorks"
        }
    }
}
