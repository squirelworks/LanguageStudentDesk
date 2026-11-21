plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

val debugKeystore = rootProject.file("../SquirrelGo-Apps/squirrelgo-dictionary/android/app/debug.keystore")
val kanaAssets = rootProject.layout.buildDirectory.dir("generated-kana").get().asFile

kotlin {
    compilerOptions {
        jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
    }
}

android {
    namespace = "com.squirelworks.squirrelgokana"
    compileSdk = 37
    defaultConfig {
        applicationId = "com.squirelworks.squirrelgokana"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0.0"
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
    sourceSets.getByName("main").assets.srcDir(kanaAssets)
}

dependencies {
    implementation(project(":ui:kana"))
    implementation(libs.androidx.activity.compose)
}

tasks.matching { it.name == "preBuild" || it.name.startsWith("merge") && it.name.endsWith("Assets") }.configureEach {
    dependsOn(rootProject.tasks.named("generateKanaCatalog"))
}
