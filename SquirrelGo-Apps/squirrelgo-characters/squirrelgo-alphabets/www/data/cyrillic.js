// Cyrillic (as used for Russian) for SquirrelGo Alphabets.
// Each character is [letter, romanization, sound hint, example, example romanization, meaning, text to speak, IPA].
// Hints, groupings and articles are original.
window.SG_SCRIPTS = window.SG_SCRIPTS || [];
window.SG_SCRIPTS.push({
  id: "cyrillic",
  title: "Cyrillic",
  native: "Кириллица",
  lang: "ru-RU",
  langName: "Russian",
  font: 'system-ui, "Segoe UI", Roboto, "Noto Sans", sans-serif',
  chartFlow: true,
  blurb: "The 33 letters of the Russian alphabet, starting with the ones you already half know.",
  writeTip: "Printed and handwritten Cyrillic differ a lot. Practise the printed shapes here first; the handwriting article shows the main differences.",
  lessons: [
    {
      title: "True friends",
      note: "These look like English letters and sound like them too.",
      chars: [
        ["А а", "a", "a as in father", "мама", "mama", "mom", "а", "a"],
        ["К к", "k", "k as in skip", "кот", "kot", "cat", "к", "k"],
        ["М м", "m", "m", "мир", "mir", "world, peace", "м", "m"],
        ["О о", "o", "o as in more when stressed; like a when not", "он", "on", "he", "о", "o"],
        ["Т т", "t", "t with the tongue against the teeth", "там", "tam", "there", "т", "t"],
      ],
    },
    {
      title: "False friends",
      note: "They look familiar, but the sound is different. Unlearn the English reading.",
      chars: [
        ["В в", "v", "v as in van", "вода", "voda", "water", "в", "v"],
        ["Е е", "ye", "ye as in yes", "нет", "net", "no", "е", "je"],
        ["Н н", "n", "n as in no", "нос", "nos", "nose", "н", "n"],
        ["Р р", "r", "a rolled or tapped r", "рука", "ruka", "hand, arm", "р", "r"],
        ["С с", "s", "s as in sun", "сок", "sok", "juice", "с", "s"],
        ["У у", "u", "oo as in food", "утро", "utro", "morning", "у", "u"],
        ["Х х", "kh", "ch as in Scottish loch", "хлеб", "khleb", "bread", "х", "x"],
      ],
    },
    {
      title: "New shapes, familiar sounds",
      chars: [
        ["Б б", "b", "b as in bed", "банк", "bank", "bank", "б", "b"],
        ["Г г", "g", "g as in go", "город", "gorod", "city", "г", "ɡ"],
        ["Д д", "d", "d with the tongue against the teeth", "дом", "dom", "house", "д", "d"],
        ["З з", "z", "z as in zoo", "зуб", "zub", "tooth", "з", "z"],
        ["И и", "i", "ee as in see", "игра", "igra", "game", "и", "i"],
        ["Й й", "y", "y as in boy; only after or before vowels", "мой", "moy", "my", "й", "j"],
        ["Л л", "l", "a dark l, as in full", "лампа", "lampa", "lamp", "л", "ɫ"],
        ["П п", "p", "p as in spot", "папа", "papa", "dad", "п", "p"],
        ["Ф ф", "f", "f", "фото", "foto", "photo", "ф", "f"],
      ],
    },
    {
      title: "Hushing and hissing sounds",
      chars: [
        ["Ж ж", "zh", "s as in pleasure", "жук", "zhuk", "beetle", "ж", "ʐ"],
        ["Ц ц", "ts", "ts as in cats", "цирк", "tsirk", "circus", "ц", "ts"],
        ["Ч ч", "ch", "ch as in cheese", "чай", "chay", "tea", "ч", "tɕ"],
        ["Ш ш", "sh", "a hard sh with the tongue pulled back", "шапка", "shapka", "hat", "ш", "ʂ"],
        ["Щ щ", "shch", "a long soft sh, as in fresh sheets", "щи", "shchi", "cabbage soup", "щ", "ɕː"],
      ],
    },
    {
      title: "Vowels with a y",
      note: "Е, Ё, Ю and Я add a y glide at the start of a word or after a vowel, and soften the consonant before them.",
      chars: [
        ["Ё ё", "yo", "yo as in yonder; always stressed", "ёлка", "yolka", "fir tree", "ё", "jo"],
        ["Ю ю", "yu", "you", "юг", "yug", "south", "ю", "ju"],
        ["Я я", "ya", "ya as in yard", "яблоко", "yabloko", "apple", "я", "ja"],
        ["Э э", "e", "e as in bet, no y glide", "это", "eto", "this, it", "э", "ɛ"],
        ["Ы ы", "y", "i said with the tongue pulled back; no English match", "сыр", "syr", "cheese", "ы", "ɨ"],
      ],
    },
    {
      title: "The two signs",
      note: "These letters have no sound of their own. They change how the letters around them are said.",
      chars: [
        ["Ь ь", "ʹ", "soft sign: softens the consonant before it", "мать", "matʹ", "mother", "мать", "ʲ"],
        ["Ъ ъ", "ʺ", "hard sign: keeps a y glide separate from the consonant", "объект", "obʺyekt", "object", "объект"],
      ],
    },
  ],
  articles: [
    {
      title: "About Cyrillic",
      body: `<p>Cyrillic grew out of the Greek alphabet in the 9th and 10th centuries, with extra letters for Slavic sounds. Today it is used for Russian, Ukrainian, Belarusian, Bulgarian, Serbian, Macedonian, Kazakh, Mongolian and many others. Each language uses a slightly different set of letters and values. This app teaches the 33 letters of Russian.</p>
<p>The good news: Russian spelling is close to phonetic. Once you know the letters and a few rules about stress, you can read most words aloud correctly.</p>`,
    },
    {
      title: "Stress and vowel reduction",
      body: `<p>Every Russian word has one stressed syllable, and the stress can fall anywhere. Dictionaries and textbooks mark it with an accent (<span lang="ru">молокó</span>); normal text does not.</p>
<p>Unstressed vowels weaken:</p>
<ul>
<li>unstressed <span lang="ru">о</span> sounds like a: <span lang="ru">молоко</span> is said ma-la-KO</li>
<li>unstressed <span lang="ru">е</span> and <span lang="ru">я</span> drift toward i: <span lang="ru">язык</span> is said yi-ZYK</li>
</ul>
<p>Learn the stress with each new word, and copy the audio rather than the spelling.</p>`,
    },
    {
      title: "Hard and soft consonants",
      body: `<p>Most Russian consonants come in pairs: hard (plain) and soft (said with the middle of the tongue raised toward the palate, as if a faint y followed).</p>
<p>A consonant is soft when it is followed by <span lang="ru">е, ё, и, ю, я</span> or the soft sign <span lang="ru">ь</span>. Compare:</p>
<table>
<tr><td lang="ru">мат</td><td>mat, checkmate (hard т)</td></tr>
<tr><td lang="ru">мать</td><td>matʹ, mother (soft т)</td></tr>
</table>
<p>A few consonants are always hard (<span lang="ru">ж, ш, ц</span>) and a few always soft (<span lang="ru">ч, щ, й</span>).</p>`,
    },
    {
      title: "Handwriting looks different",
      body: `<p>Russians write in a joined cursive, and several letters change shape enough to confuse a learner:</p>
<ul>
<li>cursive <span lang="ru">т</span> looks like an English m</li>
<li>cursive <span lang="ru">д</span> looks like g or a curly δ</li>
<li>cursive <span lang="ru">и</span> looks like u, and <span lang="ru">п</span> like n</li>
<li>cursive <span lang="ru">л</span> and <span lang="ru">м</span> start with a small hook at the bottom left</li>
</ul>
<p>Learn to read print first, then learn cursive from a handwriting guide once the printed letters are automatic.</p>`,
    },
  ],
});
