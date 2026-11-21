plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

val debugKeystore = rootProject.file("../SquirrelGo-Apps/squirrelgo-dictionary/android/app/debug.keystore")
val bopomofoAssets = rootProject.layout.buildDirectory.dir("generated-bopomofo").get().asFile
val appVersion = readAppVersion(rootProject.file("versions/bopomofo.properties"))
requireNewerThanWebView(
    appVersion,
    rootProject.file("../SquirrelGo-Apps/squirrelgo-characters/squirrelgo-bopomofo/android/app/build.gradle"),
)
base {
    archivesName.set("SquirrelGoBopomofo-${appVersion.versionName}")
}

kotlin {
    compilerOptions {
        jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
    }
}

android {
    namespace = "com.squirelworks.squirrelgobopomofo"
    compileSdk = 37
    defaultConfig {
        applicationId = "com.squirelworks.squirrelgobopomofo"
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
    sourceSets.getByName("main").assets.srcDir(bopomofoAssets)
}

dependencies {
    implementation(project(":ui:kana"))
    implementation(libs.androidx.activity.compose)
}

tasks.matching { it.name == "preBuild" || it.name.startsWith("merge") && it.name.endsWith("Assets") }.configureEach {
    dependsOn(rootProject.tasks.named("generateBopomofoCatalog"))
}
