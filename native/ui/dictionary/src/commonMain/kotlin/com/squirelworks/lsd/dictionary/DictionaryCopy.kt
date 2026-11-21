package com.squirelworks.lsd.dictionary

data class DictionaryCopy(
    val title: String,
    val searchHint: String,
    val favorites: String,
    val allLanguages: String,
    val star: String,
    val unstar: String,
    val emptyEntry: String,
    val reading: String,
    val label: (String) -> String,
)

private val KOKUGO_GLOSS = mapOf(
    "negative" to "否定",
    "past negative" to "過去の否定",
    "polite" to "丁寧",
    "polite past" to "丁寧の過去",
    "polite negative" to "丁寧の否定",
    "polite past negative" to "丁寧の過去の否定",
    "want to" to "たい",
    "polite volitional" to "丁寧の意向",
    "past" to "過去",
    "te-form" to "て形",
    "progressive" to "ている",
    "past progressive" to "ていた",
    "polite progressive" to "丁寧のている",
    "imperative" to "命令",
    "potential" to "可能",
    "conditional" to "ば条件",
    "volitional" to "意向",
    "passive" to "受身",
    "causative" to "使役",
    "conditional (-tara)" to "たら条件",
    "potential / passive" to "可能・受身",
    "potential (colloquial)" to "可能（口語）",
    "adverbial" to "連用",
    "noun (-sa)" to "さ名詞",
    "looks like" to "そう",
    "too much" to "すぎる",
)

fun kokugoGrammarLabel(label: String): String =
    label.split(" → ").joinToString(" → ") { part ->
        when {
            part == "suru verb" -> "する動詞"
            part.startsWith("suru verb, ") -> "する動詞、" + gloss(part.removePrefix("suru verb, "))
            else -> gloss(part)
        }
    }

private fun gloss(part: String): String =
    KOKUGO_GLOSS[part] ?: error("No Japanese label for $part")

val MultiCopy = DictionaryCopy(
    title = "Multilingual Dictionary",
    searchHint = "Search",
    favorites = "Favorites",
    allLanguages = "All languages",
    star = "Add to favorites",
    unstar = "Remove from favorites",
    emptyEntry = "No entry for this search.",
    reading = "Reading",
    label = { it },
)

val KokugoCopy = DictionaryCopy(
    title = "国語辞典",
    searchHint = "検索",
    favorites = "お気に入り",
    allLanguages = "すべての言語",
    star = "お気に入りに追加",
    unstar = "お気に入りから外す",
    emptyEntry = "この語の国語辞典の説明はまだありません",
    reading = "読み",
    label = ::kokugoGrammarLabel,
)
