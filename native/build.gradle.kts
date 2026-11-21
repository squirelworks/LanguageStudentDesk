import groovy.json.JsonOutput
import groovy.json.JsonSlurper

plugins {
    alias(libs.plugins.kotlin.multiplatform) apply false
    alias(libs.plugins.kotlin.jvm) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
    alias(libs.plugins.android.library) apply false
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.serialization) apply false
    alias(libs.plugins.compose) apply false
}

// Language rows come from the metadata generated from the pinned
// squirrel-lang-data commit. The apps do not keep their own copy.
tasks.register("generateLanguageCatalog") {
    val languages = file("../languages")
    val outDir = layout.buildDirectory.dir("generated-catalog")
    inputs.dir(languages)
    outputs.dir(outDir)
    doLast {
        val slurper = JsonSlurper()
        val rows = languages.listFiles()?.filter { it.isDirectory }?.mapNotNull { dir ->
            val metaFile = dir.resolve("meta.json")
            if (!metaFile.isFile) return@mapNotNull null
            val meta = slurper.parse(metaFile) as Map<*, *>
            val id = meta["id"]?.toString() ?: return@mapNotNull null
            val name = meta["name"]?.toString() ?: error("${metaFile.path} has no display name")
            mapOf(
                "id" to id,
                "name" to name,
                "nativeName" to (meta["nativeName"]?.toString() ?: ""),
                "speech" to (meta["speech"]?.toString() ?: ""),
            )
        }?.sortedBy { it["id"] } ?: error("No language metadata under ${languages.path}")
        val out = outDir.get().asFile.resolve("languages.json")
        out.parentFile.mkdirs()
        out.writeText(JsonOutput.toJson(rows))
    }
}

// Kana lessons and stroke paths, from the files generated out of the pinned
// squirrel-lang-data commit. The app does not keep a second copy.
fun catalogTask(
    name: String,
    lessons: String,
    strokes: String,
    outName: String,
    audio: String? = null,
    suite: String? = null,
) =
    tasks.register<Exec>(name) {
        val repo = rootProject.projectDir.parentFile
        val outDir = layout.buildDirectory.dir("generated-$outName")
        val lessonPath = repo.resolve(lessons)
        val dataDir = if (lessonPath.isDirectory) lessonPath else lessonPath.parentFile
        if (lessonPath.isDirectory) inputs.dir(lessonPath) else inputs.file(lessonPath)
        inputs.dir(repo.resolve(strokes))
        inputs.file("tools/kana_catalog.py")
        val about = dataDir.resolve("app.js")
        if (about.isFile) inputs.file(about)
        val css = dataDir.parentFile.resolve("css/app.css")
        if (css.isFile) inputs.file(css)
        if (audio != null) {
            inputs.dir(repo.resolve(audio))
            inputs.dir(repo.resolve(audio).parentFile.parentFile.resolve("audio"))
        }
        if (suite != null) inputs.file(repo.resolve(suite))
        outputs.dir(outDir)
        val cmd = mutableListOf(
            "python3",
            rootProject.file("tools/kana_catalog.py").absolutePath,
            repo.resolve(lessons).absolutePath,
            repo.resolve(strokes).absolutePath,
            outDir.get().asFile.absolutePath,
            "$outName.json",
            "$outName-strokes.json",
        )
        if (audio != null) cmd += repo.resolve(audio).absolutePath
        if (suite != null) cmd += repo.resolve(suite).absolutePath
        commandLine(cmd)
    }

catalogTask(
    "generateKanaCatalog",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/www/data/kana.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/www/data/strokes",
    "kana",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/www/data/audio",
    "SquirrelGo-Apps/shared/suite.js",
)
catalogTask(
    "generateBopomofoCatalog",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-bopomofo/www/data/bopomofo.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-bopomofo/www/data/strokes",
    "bopomofo",
    suite = "SquirrelGo-Apps/shared/suite.js",
)
catalogTask(
    "generateAlphabetsCatalog",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/www/data",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/www/data/strokes",
    "alphabets",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/www/data/audio",
    "SquirrelGo-Apps/shared/suite.js",
)

// Kanji lessons, words, sentences and stroke paths, from the WebView files.
// The app does not keep a second copy.
fun kanjiCatalogTask(name: String, www: String, vararg watched: String) =
    tasks.register<Exec>(name) {
        val repo = rootProject.projectDir.parentFile
        val outDir = layout.buildDirectory.dir("generated-kanji")
        inputs.dir(repo.resolve(www))
        inputs.file("tools/kanji_catalog.py")
        inputs.file("tools/kana_catalog.py")
        watched.forEach { inputs.file(repo.resolve(it)) }
        outputs.dir(outDir)
        commandLine(
            "python3",
            rootProject.file("tools/kanji_catalog.py").absolutePath,
            repo.resolve(www).absolutePath,
            outDir.get().asFile.absolutePath,
        )
    }

kanjiCatalogTask(
    "generateKanjiCatalog",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/www",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/www/data/kanji.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/www/data/catalog.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/www/data/words.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/www/data/strokes.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/www/js/lessons.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji/www/css/app.css",
    "SquirrelGo-Apps/shared/suite.js",
)

// Klingon lessons, strokes and recordings, from the WebView files.
fun klingonCatalogTask(name: String, www: String, vararg watched: String) =
    tasks.register<Exec>(name) {
        val repo = rootProject.projectDir.parentFile
        val outDir = layout.buildDirectory.dir("generated-klingon")
        inputs.dir(repo.resolve(www))
        inputs.file("tools/klingon_catalog.py")
        inputs.file("tools/kana_catalog.py")
        watched.forEach { inputs.file(repo.resolve(it)) }
        outputs.dir(outDir)
        commandLine(
            "python3",
            rootProject.file("tools/klingon_catalog.py").absolutePath,
            repo.resolve(www).absolutePath,
            outDir.get().asFile.absolutePath,
        )
    }

klingonCatalogTask(
    "generateKlingonCatalog",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-klingon/www",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-klingon/www/data/klingon.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-klingon/www/data/strokes.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-klingon/www/data/app.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-klingon/www/css/app.css",
    "SquirrelGo-Apps/shared/suite.js",
)

// Phrasebook packs, readings and recordings, from the WebView files.
fun phrasebookCatalogTask(name: String, www: String, vararg watched: String) =
    tasks.register<Exec>(name) {
        val repo = rootProject.projectDir.parentFile
        val outDir = layout.buildDirectory.dir("generated-phrasebook")
        inputs.dir(repo.resolve(www))
        inputs.file("tools/phrasebook_catalog.py")
        inputs.file("tools/kana_catalog.py")
        watched.forEach { inputs.file(repo.resolve(it)) }
        outputs.dir(outDir)
        commandLine(
            "python3",
            rootProject.file("tools/phrasebook_catalog.py").absolutePath,
            repo.resolve(www).absolutePath,
            outDir.get().asFile.absolutePath,
        )
    }

phrasebookCatalogTask(
    "generatePhrasebookCatalog",
    "SquirrelGo-Apps/squirrelgo-phrasebook/www",
    "SquirrelGo-Apps/squirrelgo-phrasebook/www/data/packs.js",
    "SquirrelGo-Apps/squirrelgo-phrasebook/www/data/audio.js",
    "SquirrelGo-Apps/squirrelgo-phrasebook/www/js/romaji.js",
    "SquirrelGo-Apps/squirrelgo-phrasebook/www/js/app.js",
    "SquirrelGo-Apps/squirrelgo-phrasebook/www/css/app.css",
    "SquirrelGo-Apps/shared/suite.js",
)

// Japanese-English word list, from the same generated files the WebView ships.
// A build that can be installed fails when those files are missing.
// -Pjed.allowEmpty=true is only for a compile check.
fun jedCatalogTask(name: String, www: String, vararg watched: String) =
    tasks.register<Exec>(name) {
        val repo = rootProject.projectDir.parentFile
        val outDir = layout.buildDirectory.dir("generated-jed")
        inputs.dir(repo.resolve(www))
        inputs.file("tools/jed_catalog.py")
        inputs.file("tools/kana_catalog.py")
        inputs.property("jed.allowEmpty", (findProperty("jed.allowEmpty") ?: "false").toString())
        watched.forEach { inputs.file(repo.resolve(it)) }
        outputs.dir(outDir)
        val cmd = mutableListOf(
            "python3",
            rootProject.file("tools/jed_catalog.py").absolutePath,
            repo.resolve(www).absolutePath,
            outDir.get().asFile.absolutePath,
        )
        if (findProperty("jed.allowEmpty") == "true") cmd += "--allow-empty"
        commandLine(cmd)
    }

jedCatalogTask(
    "generateJedCatalog",
    "SquirrelGo-Apps/squirrelgo-dictionary/www",
    "SquirrelGo-Apps/shared/suite.js",
)

// Orthodox Bible books, bundled texts, versification and the lectionary.
// Downloadable packs stay on the orthodox-bible-packs release.
fun bibleCatalogTask(name: String, www: String, vararg watched: String) =
    tasks.register<Exec>(name) {
        val repo = rootProject.projectDir.parentFile
        val outDir = layout.buildDirectory.dir("generated-orthodox-bible")
        inputs.dir(repo.resolve(www))
        inputs.file("tools/bible_catalog.py")
        inputs.file("tools/kana_catalog.py")
        watched.forEach { inputs.file(repo.resolve(it)) }
        outputs.dir(outDir)
        commandLine(
            "python3",
            rootProject.file("tools/bible_catalog.py").absolutePath,
            repo.resolve(www).absolutePath,
            outDir.get().asFile.absolutePath,
        )
    }

bibleCatalogTask(
    "generateOrthodoxBibleCatalog",
    "SquirrelGo-Apps/squirrelgo-orthodox-bible/www",
    "SquirrelGo-Apps/squirrelgo-orthodox-bible/www/data/catalog.js",
    "SquirrelGo-Apps/squirrelgo-orthodox-bible/www/data/books.js",
    "SquirrelGo-Apps/squirrelgo-orthodox-bible/www/data/lectionary.js",
    "SquirrelGo-Apps/squirrelgo-orthodox-bible/www/data/paschalion.js",
    "SquirrelGo-Apps/shared/suite.js",
)
