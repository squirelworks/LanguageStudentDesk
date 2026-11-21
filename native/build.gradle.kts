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
fun catalogTask(name: String, lessons: String, strokes: String, outName: String, audio: String? = null) =
    tasks.register<Exec>(name) {
        val repo = rootProject.projectDir.parentFile
        val outDir = layout.buildDirectory.dir("generated-$outName")
        inputs.file(repo.resolve(lessons))
        inputs.dir(repo.resolve(strokes))
        inputs.file("tools/kana_catalog.py")
        val about = repo.resolve(lessons).parentFile.resolve("app.js")
        if (about.isFile) inputs.file(about)
        if (audio != null) {
            inputs.dir(repo.resolve(audio))
            inputs.dir(repo.resolve(audio).parentFile.parentFile.resolve("audio"))
        }
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
        commandLine(cmd)
    }

catalogTask(
    "generateKanaCatalog",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/www/data/kana.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/www/data/strokes",
    "kana",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/www/data/audio",
)
catalogTask(
    "generateBopomofoCatalog",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-bopomofo/www/data/bopomofo.js",
    "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-bopomofo/www/data/strokes",
    "bopomofo",
)
