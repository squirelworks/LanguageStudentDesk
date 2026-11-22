import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.compose)
    alias(libs.plugins.kotlin.compose)
}

val catalogAssets = rootProject.layout.buildDirectory.dir("generated-electronics").get().asFile
val learnerPages = rootProject.layout.buildDirectory.dir("generated-electronics-www")
val appVersion = readAppVersion(rootProject.file("versions/electronics.properties"))
requireNewerThanWebView(
    appVersion,
    rootProject.file("../archive/webview/electronics/app/build.gradle"),
)

kotlin { compilerOptions { jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17) } }
java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

dependencies {
    implementation(compose.desktop.currentOs)
    implementation(project(":ui:electronics"))
    implementation(project(":learner"))
}

sourceSets.main.get().resources.srcDir(catalogAssets)
tasks.named("processResources").configure { dependsOn(rootProject.tasks.named("generateElectronicsCatalog")) }
tasks.configureEach {
    if (name == "prepareAppResources" || name.startsWith("prepareAppResources") || name == "createDistributable") {
        dependsOn(rootProject.tasks.named("packElectronicsLearners"))
    }
}

tasks.register("checkElectronicsPages") {
    dependsOn("createDistributable")
    doLast {
        val paths = layout.buildDirectory.dir("compose/binaries").get().asFile.walkTopDown().filter { it.isFile }.map { it.invariantSeparatorsPath }
        if (paths.none { it.endsWith("/electronics-student-desk/www/index.html") }) error("The desktop package has no Electronics Student Desk menu")
        if (paths.none { it.endsWith("/electronics-learner/index.html") }) error("The desktop package has no Electronics Learner page")
    }
}

compose.desktop {
    application {
        mainClass = "com.squirelworks.electronicsstudentdesk.MainKt"
        nativeDistributions {
            appResourcesRootDir.set(learnerPages)
            val os = System.getProperty("os.name").lowercase()
            val formats = when {
                "mac" in os -> listOf(TargetFormat.Dmg)
                "win" in os -> listOf(TargetFormat.Msi)
                else -> listOf(TargetFormat.Deb, TargetFormat.AppImage)
            }
            targetFormats(*formats.toTypedArray())
            packageName = "ElectronicsStudentDesk"
            packageVersion = appVersion.versionName
            description = "Electronics Student Desk"
            vendor = "SquirrelWorks"
        }
    }
}
