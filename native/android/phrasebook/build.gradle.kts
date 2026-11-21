plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

val debugKeystore = rootProject.file("../SquirrelGo-Apps/squirrelgo-dictionary/android/app/debug.keystore")
val phrasebookAssets = rootProject.layout.buildDirectory.dir("generated-phrasebook").get().asFile
val appVersion = readAppVersion(rootProject.file("versions/phrasebook.properties"))
requireNewerThanWebView(
    appVersion,
    rootProject.file("../SquirrelGo-Apps/squirrelgo-phrasebook/android/app/build.gradle"),
)
base {
    archivesName.set("SquirrelGoPhrasebook-${appVersion.versionName}")
}

kotlin {
    compilerOptions {
        jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
    }
}

android {
    namespace = "com.squirelworks.squirrelgophrasebook"
    compileSdk = 37
    defaultConfig {
        applicationId = "com.squirelworks.squirrelgophrasebook"
        minSdk = 24
        targetSdk = 36
        versionCode = appVersion.versionCode
        versionName = appVersion.versionName
    }
    signingConfigs {
        getByName("debug") {
            storeFile = debugKeystore
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
    }
    buildTypes {
        release {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("debug")
        }
        debug {
            applicationIdSuffix = ".debug"
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    sourceSets.getByName("main").assets.srcDir(phrasebookAssets)
}

dependencies {
    implementation(project(":ui:phrasebook"))
    implementation(libs.androidx.activity.compose)
}

tasks.matching { it.name == "preBuild" || it.name.startsWith("merge") && it.name.endsWith("Assets") }.configureEach {
    dependsOn(rootProject.tasks.named("generatePhrasebookCatalog"))
}
