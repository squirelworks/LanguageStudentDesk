import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.compose)
    alias(libs.plugins.kotlin.compose)
}

val kanaAssets = rootProject.layout.buildDirectory.dir("generated-kana").get().asFile

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
    implementation(project(":ui:kana"))
}

sourceSets.main.get().resources.srcDir(kanaAssets)

tasks.named("processResources").configure {
    dependsOn(rootProject.tasks.named("generateKanaCatalog"))
}

compose.desktop {
    application {
        mainClass = "com.squirelworks.squirrelgokana.MainKt"
        nativeDistributions {
            val os = System.getProperty("os.name").lowercase()
            val formats = when {
                "mac" in os -> listOf(TargetFormat.Dmg)
                "win" in os -> listOf(TargetFormat.Msi)
                else -> listOf(TargetFormat.Deb, TargetFormat.AppImage)
            }
            targetFormats(*formats.toTypedArray())
            packageName = "SquirrelGoKana"
            packageVersion = "1.0.0"
            description = "SquirrelGo Kana"
            vendor = "SquirrelWorks"
        }
    }
}
