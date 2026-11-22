plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

val debugKeystore = rootProject.file("../archive/webview/dictionary/app/debug.keystore")
val catalogAssets = rootProject.layout.buildDirectory.dir("generated-programming").get().asFile
val learnerAssets = rootProject.layout.buildDirectory.dir("generated-programming-www/common").get().asFile
val appVersion = readAppVersion(rootProject.file("versions/programming.properties"))
requireNewerThanWebView(
    appVersion,
    rootProject.file("../archive/webview/programming/app/build.gradle"),
)
// release, the GitHub APK, always uses the committed debug key. The play
// build type is the only one that may use UPLOAD_*, and only for its own bundle.
val uploadStore = System.getenv("UPLOAD_STORE_FILE").orEmpty()
base {
    archivesName.set("ProgrammingStudentDesk-${appVersion.versionName}")
}

kotlin {
    compilerOptions {
        jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
    }
}

android {
    namespace = "com.squirelworks.programmingstudentdesk"
    compileSdk = 37
    defaultConfig {
        applicationId = "com.squirelworks.programmingstudentdesk"
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
        if (uploadStore.isNotEmpty()) {
            create("play") {
                storeFile = file(uploadStore)
                storePassword = System.getenv("UPLOAD_STORE_PASSWORD")
                keyAlias = System.getenv("UPLOAD_KEY_ALIAS")
                keyPassword = System.getenv("UPLOAD_KEY_PASSWORD")
            }
        }
    }
    buildTypes {
        release {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("debug")
        }
        create("play") {
            initWith(getByName("release"))
            matchingFallbacks += listOf("release")
            signingConfig = if (uploadStore.isNotEmpty()) {
                signingConfigs.getByName("play")
            } else {
                signingConfigs.getByName("debug")
            }
        }
        debug {
            applicationIdSuffix = ".debug"
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    sourceSets.getByName("main").assets.srcDir(catalogAssets)
    sourceSets.getByName("main").assets.srcDir(learnerAssets)
}

dependencies {
    implementation(project(":ui:programming"))
    implementation(project(":learner"))
    implementation(libs.androidx.activity.compose)
}

tasks.matching { it.name == "preBuild" || it.name.startsWith("merge") && it.name.endsWith("Assets") }.configureEach {
    dependsOn(rootProject.tasks.named("generateProgrammingCatalog"))
    dependsOn(rootProject.tasks.named("packProgrammingLearners"))
}
