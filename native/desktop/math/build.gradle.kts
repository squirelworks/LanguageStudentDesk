import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.compose)
    alias(libs.plugins.kotlin.compose)
}

val catalogAssets = rootProject.layout.buildDirectory.dir("generated-math").get().asFile
val learnerPages = rootProject.layout.buildDirectory.dir("generated-math-www")
val appVersion = readAppVersion(rootProject.file("versions/math.properties"))
requireNewerThanWebView(
    appVersion,
    rootProject.file("../archive/webview/math/app/build.gradle"),
)

kotlin { compilerOptions { jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17) } }
java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

dependencies {
    implementation(compose.desktop.currentOs)
    implementation(project(":ui:math"))
    implementation(project(":learner"))
}

sourceSets.main.get().resources.srcDir(catalogAssets)
tasks.named("processResources").configure { dependsOn(rootProject.tasks.named("generateMathCatalog")) }
tasks.configureEach {
    if (name == "prepareAppResources" || name.startsWith("prepareAppResources") || name == "createDistributable") {
        dependsOn(rootProject.tasks.named("packMathLearners"))
    }
}

tasks.register("checkMathPages") {
    dependsOn("createDistributable")
    doLast {
        val paths = layout.buildDirectory.dir("compose/binaries").get().asFile.walkTopDown().filter { it.isFile }.map { it.invariantSeparatorsPath }
        if (paths.none { it.endsWith("/math-student-desk/www/index.html") }) error("The desktop package has no Maths Edu-Training Helper menu")
        if (paths.none { it.endsWith("/math-learner/index.html") }) error("The desktop package has no Math Learner page")
    }
}

compose.desktop {
    application {
        mainClass = "com.squirelworks.mathseducationtraininghelper.MainKt"
        nativeDistributions {
            appResourcesRootDir.set(learnerPages)
            val os = System.getProperty("os.name").lowercase()
            val formats = when {
                "mac" in os -> listOf(TargetFormat.Dmg)
                "win" in os -> listOf(TargetFormat.Msi)
                else -> listOf(TargetFormat.Deb, TargetFormat.AppImage)
            }
            targetFormats(*formats.toTypedArray())
            packageName = "MathsEduTrainingHelper"
            packageVersion = appVersion.versionName
            description = "Maths Edu-Training Helper"
            vendor = "SquirrelWorks"
        }
    }
}
