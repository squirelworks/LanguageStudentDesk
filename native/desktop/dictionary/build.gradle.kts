import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.compose)
    alias(libs.plugins.kotlin.compose)
}

val dictionaryAssets = rootProject.layout.buildDirectory.dir("generated-jed").get().asFile
val appVersion = readAppVersion(rootProject.file("versions/dictionary.properties"))
requireNewerThanWebView(
    appVersion,
    rootProject.file("../archive/webview/dictionary/app/build.gradle"),
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
    implementation(project(":ui:dictionary"))
    implementation(project(":ui:kana"))
}

sourceSets.main.get().resources.srcDir(dictionaryAssets)

tasks.named("processResources").configure {
    dependsOn(rootProject.tasks.named("generateJedCatalog"))
}

compose.desktop {
    application {
        mainClass = "com.squirelworks.squirrelgodictionary.MainKt"
        nativeDistributions {
            val os = System.getProperty("os.name").lowercase()
            val formats = when {
                "mac" in os -> listOf(TargetFormat.Dmg)
                "win" in os -> listOf(TargetFormat.Msi)
                else -> listOf(TargetFormat.Deb, TargetFormat.AppImage)
            }
            targetFormats(*formats.toTypedArray())
            packageName = "SquirrelGoJapaneseDictionary"
            packageVersion = appVersion.versionName
            description = "SquirrelGo Japanese-English Dictionary"
            vendor = "SquirrelWorks"
        }
    }
}
