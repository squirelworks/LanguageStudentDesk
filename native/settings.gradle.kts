pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "native"
include(":core")
include(":ui:dictionary")
include(":android:japanese-dictionary")
include(":desktop:japanese-dictionary")
include(":android:multilingual-dictionary")
include(":desktop:multilingual-dictionary")
include(":android:dictionary")
include(":desktop:dictionary")
include(":ui:kana")
include(":android:kana")
include(":desktop:kana")
include(":android:bopomofo")
include(":desktop:bopomofo")
include(":android:alphabets")
include(":desktop:alphabets")
include(":ui:kanji")
include(":android:kanji")
include(":desktop:kanji")
include(":ui:klingon")
include(":android:klingon")
include(":desktop:klingon")
include(":ui:phrasebook")
include(":android:phrasebook")
include(":desktop:phrasebook")
include(":ui:orthodox-bible")
include(":android:orthodox-bible")
include(":desktop:orthodox-bible")
include(":ui:desk")
include(":android:lsd")
include(":desktop:lsd")
