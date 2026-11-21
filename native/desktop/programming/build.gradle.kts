import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.compose)
    alias(libs.plugins.kotlin.compose)
}

val catalogAssets = rootProject.layout.buildDirectory.dir("generated-programming").get().asFile
val learnerPages = rootProject.layout.buildDirectory.dir("generated-programming-www")
val appVersion = readAppVersion(rootProject.file("versions/programming.properties"))
requireNewerThanWebView(
    appVersion,
    rootProject.file("../SquirrelGo-Apps/programming-student-desk/android/app/build.gradle"),
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
    implementation(project(":ui:programming"))
}

sourceSets.main.get().resources.srcDir(catalogAssets)

tasks.named("processResources").configure {
    dependsOn(rootProject.tasks.named("generateProgrammingCatalog"))
}

tasks.configureEach {
    if (name == "prepareAppResources" || name.startsWith("prepareAppResources") || name == "createDistributable") {
        dependsOn(rootProject.tasks.named("packProgrammingLearners"))
    }
}

tasks.register("checkProgrammingPages") {
    dependsOn("createDistributable")
    doLast {
        val binaries = layout.buildDirectory.dir("compose/binaries").get().asFile
        val paths = binaries.walkTopDown().filter { it.isFile }.map { it.invariantSeparatorsPath }.toList()
        if (paths.none { it.endsWith("/programming-student-desk/www/index.html") }) {
            error("The desktop package has no Programming Student Desk menu")
        }
        if (paths.none { it.endsWith("/programming-learner/index.html") }) {
            error("The desktop package has no Programming Learner page")
        }
    }
}

compose.desktop {
    application {
        mainClass = "com.squirelworks.programmingstudentdesk.MainKt"
        nativeDistributions {
            appResourcesRootDir.set(learnerPages)
            val os = System.getProperty("os.name").lowercase()
            val formats = when {
                "mac" in os -> listOf(TargetFormat.Dmg)
                "win" in os -> listOf(TargetFormat.Msi)
                else -> listOf(TargetFormat.Deb, TargetFormat.AppImage)
            }
            targetFormats(*formats.toTypedArray())
            packageName = "ProgrammingStudentDesk"
            packageVersion = appVersion.versionName
            description = "Programming Student Desk"
            vendor = "SquirrelWorks"
        }
    }
}
