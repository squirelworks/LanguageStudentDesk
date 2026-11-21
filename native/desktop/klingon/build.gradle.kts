import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.compose)
    alias(libs.plugins.kotlin.compose)
}

val klingonAssets = rootProject.layout.buildDirectory.dir("generated-klingon").get().asFile
val appVersion = readAppVersion(rootProject.file("versions/klingon.properties"))
requireNewerThanWebView(
    appVersion,
    rootProject.file("../archive/webview/klingon/app/build.gradle"),
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
    implementation(project(":ui:klingon"))
}

sourceSets.main.get().resources.srcDir(klingonAssets)

tasks.named("processResources").configure {
    dependsOn(rootProject.tasks.named("generateKlingonCatalog"))
}

compose.desktop {
    application {
        mainClass = "com.squirelworks.squirrelgoklingon.MainKt"
        nativeDistributions {
            val os = System.getProperty("os.name").lowercase()
            val formats = when {
                "mac" in os -> listOf(TargetFormat.Dmg)
                "win" in os -> listOf(TargetFormat.Msi)
                else -> listOf(TargetFormat.Deb, TargetFormat.AppImage)
            }
            targetFormats(*formats.toTypedArray())
            packageName = "SquirrelGoKlingon"
            packageVersion = appVersion.versionName
            description = "SquirrelGo Klingon"
            vendor = "SquirrelWorks"
        }
    }
}
