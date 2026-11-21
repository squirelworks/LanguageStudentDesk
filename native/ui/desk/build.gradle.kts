@file:OptIn(org.jetbrains.compose.ExperimentalComposeLibrary::class)

plugins {
    alias(libs.plugins.kotlin.multiplatform)
    alias(libs.plugins.android.library)
    alias(libs.plugins.compose)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.kotlin.serialization)
}

kotlin {
    jvm {
        compilerOptions {
            jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
        }
    }
    androidTarget {
        compilerOptions {
            jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
        }
    }
    sourceSets {
        commonMain.dependencies {
            api(project(":core"))
            api(project(":ui:kana"))
            implementation(libs.kotlinx.serialization.json)
        }
        jvmTest.dependencies {
            implementation(kotlin("test"))
            implementation(compose.desktop.currentOs)
            implementation(compose.uiTest)
        }
    }
}

tasks.matching { it.name == "jvmTest" }.configureEach {
    dependsOn(rootProject.tasks.named("generateDeskCatalog"))
}

android {
    namespace = "com.squirelworks.lsd.desk"
    compileSdk = 37
    defaultConfig {
        minSdk = 24
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
