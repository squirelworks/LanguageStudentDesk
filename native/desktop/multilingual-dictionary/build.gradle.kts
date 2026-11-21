import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.compose)
    alias(libs.plugins.kotlin.compose)
}

val appVersion = readAppVersion(rootProject.file("versions/multilingual-dictionary.properties"))
val catalogDir = rootProject.layout.buildDirectory.dir("generated-catalog").get().asFile

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
}

sourceSets.main.get().resources.srcDir(catalogDir)

tasks.named("processResources").configure {
    dependsOn(rootProject.tasks.named("generateLanguageCatalog"))
}

compose.desktop {
    application {
        mainClass = "com.squirelworks.squirrelgomultidictionary.MainKt"
        nativeDistributions {
            val os = System.getProperty("os.name").lowercase()
            val formats = when {
                "mac" in os -> listOf(TargetFormat.Dmg)
                "win" in os -> listOf(TargetFormat.Msi)
                else -> listOf(TargetFormat.Deb, TargetFormat.AppImage)
            }
            targetFormats(*formats.toTypedArray())
            packageName = "SquirrelGoMultilingualDictionary"
            packageVersion = appVersion.versionName
            description = "SquirrelGo Multilingual Dictionary"
            vendor = "SquirrelWorks"
        }
    }
}
