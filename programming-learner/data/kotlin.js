// Kotlin course for the Programming Learner. Written for this project.
// Examples are complete Kotlin files with a top-level main. tools/run_kotlin.py
// compiles each with kotlinc, runs it on the JVM and checks the printed output.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.kotlin = {
  id: "kotlin",
  name: "Kotlin",
  title: "Kotlin: a modern language for the JVM and Android",
  intro:
    "Kotlin was made by JetBrains, the company behind IntelliJ IDEA, and released in 2016. It runs on the Java virtual machine and can use any Java library, but it needs far less typing than Java: no semicolons, types that are worked out for you, and one-line data classes. In 2019 Google made it the preferred language for Android apps, and it is now used for servers and desktop programs too. Its best-known feature is <b>null safety</b>: the compiler knows which values may be missing and won't let you forget to check. Every example here is a whole file and shows exactly what it prints. To run one yourself, install the Kotlin compiler, save the example as <code>Main.kt</code>, and type <code>kotlinc Main.kt -include-runtime -d main.jar</code> and then <code>java -jar main.jar</code>. Or paste it into the Kotlin Playground at play.kotlinlang.org.",
  comment: "//",
  keywords: [
    "fun", "val", "var", "if", "else", "when", "for", "in", "while", "do", "return", "class", "data", "object", "sealed",
    "interface", "open", "override", "private", "is", "as", "null", "true", "false", "this", "it", "init", "companion",
    "enum", "import", "throw", "try", "catch", "step", "until", "downTo", "vararg",
  ],
  builtins: [
    "println", "print", "main", "Int", "Double", "String", "Boolean", "Char", "List", "Map", "listOf", "mutableListOf",
    "mapOf", "mutableMapOf", "setOf", "Unit", "Any", "require", "let", "apply", "also", "run", "repeat",
  ],
  lessons: [
    {
      id: "first",
      title: "Your first program",
      summary: "main, println, val and var, string templates.",
      sections: [
        {
          p: "A Kotlin program starts in a function called <code>main</code>. Functions are declared with <code>fun</code>, and they don't have to live inside a class. <code>println</code> prints a value and ends the line; <code>print</code> prints without ending it. Lines don't need semicolons.",
          code: `fun main() {
    println("Hello, squirrel!")
    print("Nuts: ")
    println(42)
}`,
          out: "Hello, squirrel!\nNuts: 42",
        },
        {
          h: "val and var",
          p: "<code>val</code> makes a name that can't be given a new value, and <code>var</code> one that can. Use <code>val</code> unless you need to change it; most Kotlin code is mostly <code>val</code>. The type comes after a colon, but usually you leave it out and Kotlin works it out from the value: <code>val nuts = 7</code> is an <code>Int</code>.",
          code: `fun main() {
    val name: String = "Hazel"
    var nuts = 7
    nuts = nuts + 3
    // name = "Bob"   <- error: val cannot be reassigned
    val hungry = nuts < 20
    println(name)
    println(nuts)
    println(hungry)
}`,
          out: "Hazel\n10\ntrue",
        },
        {
          h: "String templates",
          p: "Inside a string, <code>$name</code> puts in the value of a variable, and <code>${...}</code> puts in the value of any expression. This replaces most of the <code>+</code> joining other languages need.",
          code: `fun main() {
    val name = "Hazel"
    val nuts = 7
    println("$name has $nuts nuts")
    println("Next week: \${nuts * 2}")
    println("Name length: \${name.length}")
}`,
          out: "Hazel has 7 nuts\nNext week: 14\nName length: 5",
        },
        {
          h: "Numbers",
          p: "<code>Int</code> holds whole numbers and <code>Double</code> numbers with a fractional part. Dividing two <code>Int</code>s drops the remainder, which <code>%</code> gives you. A <code>Double</code> always prints with a decimal point, even when it is whole. Kotlin never converts between number types by itself: call <code>toDouble()</code> or <code>toInt()</code>.",
          code: `fun main() {
    val nuts = 17
    val squirrels = 5
    println(nuts / squirrels)
    println(nuts % squirrels)
    println(nuts.toDouble() / squirrels)
    val weight = 6.0
    println(weight)
    println(weight.toInt() + 1)
}`,
          out: "3\n2\n3.4\n6.0\n7",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fun main() {
    var acorns = 4
    acorns += 2
    val tree = "oak"
    println("$acorns from the $tree")
}`, options: ["6 from the oak", "$acorns from the $tree", "42 from the oak", "4 from the oak"], answer: "6 from the oak", why: "$acorns and $tree are replaced by their values, and acorns is 6 after += 2." },
        { kind: "output", q: "What does this print?", code: `fun main() {
    println(7 / 2)
    println(7.0 / 2)
}`, options: ["3\n3.5", "3.5\n3.5", "3\n3", "4\n3.5"], answer: "3\n3.5", why: "Int divided by Int drops the remainder. With a Double on one side the answer is a Double." },
        { q: "What happens when you give a val a new value?", options: ["The compiler reports an error", "It changes, like a var", "It is ignored", "The program stops when it reaches that line"], answer: "The compiler reports an error", why: "A val can be set only once. The mistake is caught before the program runs." },
      ],
    },
    {
      id: "decisions",
      title: "Decisions and loops",
      summary: "if as an expression, when, ranges and for.",
      sections: [
        {
          p: "<code>if</code> works as in most languages, but in Kotlin it is also an <b>expression</b>: it gives back a value, so you can put it straight into a <code>val</code>. That replaces the <code>? :</code> operator that other languages have.",
          code: `fun main() {
    val nuts = 12
    if (nuts > 10) {
        println("Big stash")
    } else {
        println("Keep looking")
    }
    val mood = if (nuts > 10) "happy" else "worried"
    println(mood)
}`,
          out: "Big stash\nhappy",
        },
        {
          h: "when",
          p: "<code>when</code> picks the first branch that matches. A branch can list several values, test a range with <code>in</code>, or be any condition. <code>else</code> catches everything left. Like <code>if</code>, <code>when</code> gives back a value.",
          code: `fun describe(nuts: Int): String = when (nuts) {
    0 -> "none"
    1, 2 -> "a few"
    in 3..9 -> "some"
    else -> "lots"
}

fun main() {
    println(describe(0))
    println(describe(2))
    println(describe(5))
    println(describe(40))
}`,
          out: "none\na few\nsome\nlots",
        },
        {
          h: "Ranges and for",
          p: "<code>1..5</code> is a <b>range</b> from 1 to 5, both ends included. <code>for</code> walks through a range or a list. <code>until</code> leaves out the last number, <code>downTo</code> counts backwards, and <code>step</code> jumps by more than one. <code>while</code> loops as long as its condition holds.",
          code: `fun main() {
    for (i in 1..5) print("$i ")
    println()
    for (i in 0 until 3) print("$i ")
    println()
    for (i in 10 downTo 0 step 5) print("$i ")
    println()
    var nuts = 1
    while (nuts < 50) nuts *= 3
    println(nuts)
}`,
          out: "1 2 3 4 5 \n0 1 2 \n10 5 0 \n81",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fun main() {
    var total = 0
    for (i in 1..4) total += i
    println(total)
}`, options: ["10", "6", "4", "1234"], answer: "10", why: "1..4 includes both ends: 1 + 2 + 3 + 4 = 10." },
        { kind: "output", q: "What does this print?", code: `fun main() {
    val n = 7
    val size = when {
        n < 5 -> "small"
        n < 10 -> "medium"
        else -> "large"
    }
    println(size)
}`, options: ["medium", "small", "large", "small\nmedium"], answer: "medium", why: "when without a value tests each condition in turn and takes the first true one. 7 < 5 is false, 7 < 10 is true." },
        { q: "How many times does  for (i in 0 until 4)  run?", options: ["4", "5", "3", "0"], answer: "4", why: "until leaves out the end, so i takes 0, 1, 2 and 3." },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      summary: "Parameters, default and named arguments, one-line functions, lambdas.",
      sections: [
        {
          p: "Parameters need their types, and the return type goes after the brackets. A parameter can have a default value, so callers can leave it out. Callers can also name arguments, which makes a call with several numbers easier to read and lets them come in any order.",
          code: `fun share(nuts: Int, squirrels: Int = 2): Int {
    return nuts / squirrels
}

fun main() {
    println(share(10))
    println(share(10, 5))
    println(share(squirrels = 3, nuts = 12))
}`,
          out: "5\n2\n4",
        },
        {
          h: "One-line functions",
          p: "When a function just returns one expression, write <code>=</code> and the expression instead of braces and <code>return</code>. Kotlin works out the return type. A function that returns nothing useful returns <code>Unit</code>, which you don't write.",
          code: `fun square(n: Int) = n * n
fun isEven(n: Int) = n % 2 == 0

fun greet(name: String) {
    println("Hi, $name")
}

fun main() {
    println(square(6))
    println(isEven(7))
    greet("Acorn")
}`,
          out: "36\nfalse\nHi, Acorn",
        },
        {
          h: "Lambdas",
          p: "A <b>lambda</b> is a function without a name, written in braces: <code>{ n: Int -&gt; n * 3 }</code>. You can keep one in a <code>val</code> and pass it to other functions. When a lambda has one parameter you can leave it out and call it <code>it</code>. When a lambda is the last argument, it goes after the brackets.",
          code: `fun twice(x: Int, f: (Int) -> Int): Int = f(f(x))

fun main() {
    val triple = { n: Int -> n * 3 }
    println(triple(4))
    println(twice(2, triple))
    println(twice(5) { it + 10 })
    repeat(3) { print("nut ") }
    println()
}`,
          out: "12\n18\n25\nnut nut nut ",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fun label(tree: String, count: Int = 1) = "$tree x$count"

fun main() {
    println(label("oak"))
    println(label(count = 3, tree = "ash"))
}`, options: ["oak x1\nash x3", "oak x0\nash x3", "oak\nash x3", "oak x1\n3 xash"], answer: "oak x1\nash x3", why: "count defaults to 1. Named arguments can come in any order." },
        { kind: "output", q: "What does this print?", code: `fun apply(n: Int, f: (Int) -> Int) = f(n)

fun main() {
    println(apply(5) { it * it })
}`, options: ["25", "10", "5", "it * it"], answer: "25", why: "The lambda after the brackets is f, and it stands for its one parameter, 5." },
      ],
    },
    {
      id: "nulls",
      title: "Null safety",
      summary: "String?, ?., ?: and the !! warning.",
      sections: [
        {
          p: "In Kotlin a plain <code>String</code> can never be <code>null</code>. When a value may be missing, add a question mark to the type: <code>String?</code>. The compiler then won't let you use it as if it were there. Inside an <code>if (x != null)</code> check, Kotlin knows it is there and lets you use it normally; this is called a <b>smart cast</b>.",
          code: `fun shout(name: String?) {
    // println(name.length)   <- error: name might be null
    if (name != null) {
        println(name.uppercase())
    } else {
        println("nobody")
    }
}

fun main() {
    shout("hazel")
    shout(null)
}`,
          out: "HAZEL\nnobody",
        },
        {
          h: "?. and ?:",
          p: "<code>?.</code> is the <b>safe call</b>: <code>name?.length</code> gives the length, or <code>null</code> if <code>name</code> is null. <code>?:</code>, the <b>Elvis operator</b>, gives a fallback when the left side is null. Together they replace most null checks. <code>!!</code> says \"I'm sure this isn't null\" and crashes if you're wrong, so use it rarely.",
          code: `fun main() {
    val names: List<String?> = listOf("Hazel", null, "Acorn")
    for (n in names) {
        println(n?.length)
    }
    for (n in names) {
        println(n ?: "unknown")
    }
    val first = names[0]!!
    println(first.lowercase())
}`,
          out: "5\nnull\n5\nHazel\nunknown\nAcorn\nhazel",
        },
        {
          h: "Functions that may find nothing",
          p: "Many library functions return a nullable value when there may be no answer. <code>toIntOrNull()</code> turns text into a number, or <code>null</code> if the text isn't one. <code>firstOrNull</code> finds the first matching item, or <code>null</code>. <code>?.let { ... }</code> runs a block only when the value is there.",
          code: `fun main() {
    println("42".toIntOrNull())
    println("forty".toIntOrNull())
    val trees = listOf("oak", "ash", "beech")
    val long = trees.firstOrNull { it.length > 4 }
    long?.let { println("Found $it") }
    val huge = trees.firstOrNull { it.length > 10 }
    println(huge ?: "no huge tree")
}`,
          out: "42\nnull\nFound beech\nno huge tree",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fun main() {
    val a: String? = null
    val b: String? = "pine"
    println((a?.length ?: 0) + (b?.length ?: 0))
}`, options: ["4", "null", "0", "An error"], answer: "4", why: "a?.length is null, so ?: gives 0. b?.length is 4. 0 + 4 = 4." },
        { kind: "output", q: "What does this print?", code: `fun main() {
    val inputs = listOf("3", "x", "5")
    var sum = 0
    for (s in inputs) sum += s.toIntOrNull() ?: 0
    println(sum)
}`, options: ["8", "3x5", "0", "An error"], answer: "8", why: "\"x\" isn't a number, so toIntOrNull gives null and ?: turns it into 0: 3 + 0 + 5." },
        { q: "What is the difference between String and String? ?", options: ["Only String? may hold null", "String? is a shorter string", "Only String may hold null", "There is none"], answer: "Only String? may hold null", why: "Kotlin keeps null out of plain types, so a missing value can only appear where the type says it may." },
      ],
    },
    {
      id: "collections",
      title: "Lists and maps",
      summary: "listOf and mutableListOf, maps, filter, map and friends.",
      sections: [
        {
          p: "<code>listOf</code> makes a list that can't be changed. <code>mutableListOf</code> makes one you can <code>add</code> to and <code>remove</code> from. Read an item with <code>list[0]</code>; the first item is number 0. Printing a list shows its items in square brackets.",
          code: `fun main() {
    val trees = listOf("oak", "ash", "beech")
    println(trees)
    println(trees[1])
    println(trees.size)
    val stash = mutableListOf(3, 5)
    stash.add(8)
    stash.remove(3)
    println(stash)
    println("ash" in trees)
}`,
          out: "[oak, ash, beech]\nash\n3\n[5, 8]\ntrue",
        },
        {
          h: "Maps",
          p: "A <b>map</b> stores values under keys. <code>\"oak\" to 4</code> makes a key and value pair. Looking up a key that isn't there gives <code>null</code>, so the result type is nullable and <code>?:</code> is handy. In a <code>for</code> loop, <code>(key, value)</code> takes each pair apart.",
          code: `fun main() {
    val stash = mutableMapOf("oak" to 4, "hazel" to 9)
    stash["beech"] = 2
    stash["oak"] = stash["oak"]!! + 1
    println(stash)
    println(stash["pine"] ?: 0)
    for ((tree, nuts) in stash) {
        println("$tree: $nuts")
    }
}`,
          out: "{oak=5, hazel=9, beech=2}\n0\noak: 5\nhazel: 9\nbeech: 2",
        },
        {
          h: "filter, map and friends",
          p: "Lists come with many functions that take a lambda. <code>filter</code> keeps the items that pass a test, <code>map</code> turns each item into something else, and <code>sum</code>, <code>count</code>, <code>maxOrNull</code> and <code>sortedBy</code> do what their names say. Chaining them often replaces a whole loop.",
          code: `fun main() {
    val nuts = listOf(4, 11, 7, 2, 9)
    println(nuts.filter { it > 5 })
    println(nuts.map { it * 10 })
    println(nuts.filter { it % 2 == 1 }.sum())
    println(nuts.count { it < 5 })
    println(nuts.maxOrNull())
    val trees = listOf("beech", "oak", "chestnut")
    println(trees.sortedBy { it.length })
    println(trees.joinToString(" / ") { it.uppercase() })
}`,
          out: "[11, 7, 9]\n[40, 110, 70, 20, 90]\n27\n2\n11\n[oak, beech, chestnut]\nBEECH / OAK / CHESTNUT",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fun main() {
    val n = listOf(1, 2, 3, 4, 5, 6)
    println(n.filter { it % 2 == 0 }.map { it * it })
}`, options: ["[4, 16, 36]", "[1, 9, 25]", "[2, 4, 6]", "56"], answer: "[4, 16, 36]", why: "filter keeps 2, 4 and 6, and map squares each of them." },
        { kind: "output", q: "What does this print?", code: `fun main() {
    val ages = mapOf("Hazel" to 3, "Acorn" to 1)
    println(ages["Acorn"])
    println(ages["Bob"])
}`, options: ["1\nnull", "1\n0", "1\nAn error", "Acorn\nBob"], answer: "1\nnull", why: "Looking up a missing key gives null rather than an error." },
        { q: "What does  listOf(1, 2).add(3)  do?", options: ["It doesn't compile: listOf makes a read-only list", "Makes [1, 2, 3]", "Returns a new list [1, 2, 3]", "Crashes when it runs"], answer: "It doesn't compile: listOf makes a read-only list", why: "A List has no add. Use mutableListOf when you need to change it." },
      ],
    },
    {
      id: "classes",
      title: "Classes and data classes",
      summary: "Constructors, properties, methods and data classes.",
      sections: [
        {
          p: "A class's main constructor goes right after its name. Writing <code>val</code> or <code>var</code> in front of a parameter makes it a property in one step. Create an object by calling the class like a function; Kotlin has no <code>new</code>. <code>private</code> hides a property from code outside the class.",
          code: `class Squirrel(val name: String, private var nuts: Int = 0) {
    fun gather(found: Int) {
        nuts += found
    }
    fun report() = "$name has $nuts nuts"
}

fun main() {
    val s = Squirrel("Hazel")
    s.gather(3)
    s.gather(4)
    println(s.report())
    println(s.name)
    // println(s.nuts)   <- error: nuts is private
}`,
          out: "Hazel has 7 nuts\nHazel",
        },
        {
          h: "Data classes",
          p: "Classes that mainly hold data are so common that Kotlin has <code>data class</code>. It writes the boring parts for you: a readable <code>toString</code>, <code>==</code> that compares the contents, and <code>copy</code> to make a changed copy. Data classes can also be taken apart into separate <code>val</code>s.",
          code: `data class Nut(val kind: String, val grams: Int)

fun main() {
    val a = Nut("hazel", 3)
    val b = Nut("hazel", 3)
    println(a)
    println(a == b)
    val big = a.copy(grams = 5)
    println(big)
    val (kind, grams) = big
    println("$kind weighs $grams g")
}`,
          out: "Nut(kind=hazel, grams=3)\ntrue\nNut(kind=hazel, grams=5)\nhazel weighs 5 g",
        },
        {
          h: "Interfaces and inheritance",
          p: "An <code>interface</code> lists what a class must provide, and <code>override</code> marks each function that provides it. Kotlin classes are closed by default: another class can extend one only if it is marked <code>open</code>. A <code>List</code> of the interface type can hold any class that implements it.",
          code: `interface Animal {
    val name: String
    fun sound(): String
}

class Squirrel(override val name: String) : Animal {
    override fun sound() = "chitter"
}

class Owl(override val name: String) : Animal {
    override fun sound() = "hoo"
}

fun main() {
    val wood: List<Animal> = listOf(Squirrel("Hazel"), Owl("Sage"))
    for (a in wood) println("\${a.name} says \${a.sound()}")
}`,
          out: "Hazel says chitter\nSage says hoo",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `data class Point(val x: Int, val y: Int)

fun main() {
    val p = Point(1, 2)
    val q = p.copy(y = 5)
    println(q)
    println(p == Point(1, 2))
}`, options: ["Point(x=1, y=5)\ntrue", "Point(x=1, y=2)\ntrue", "Point(x=1, y=5)\nfalse", "Point@1b6d3586\nfalse"], answer: "Point(x=1, y=5)\ntrue", why: "copy changes only y. A data class compares its contents with ==, so an equal Point counts as equal." },
        { kind: "output", q: "What does this print?", code: `class Counter {
    var count = 0
    fun tick(): Int {
        count++
        return count
    }
}

fun main() {
    val a = Counter()
    val b = Counter()
    a.tick()
    println("\${a.tick()} \${b.tick()}")
}`, options: ["2 1", "1 1", "2 2", "1 2"], answer: "2 1", why: "Each object has its own count. a has ticked twice and b once." },
      ],
    },
    {
      id: "sealed",
      title: "Sealed classes and when",
      summary: "A fixed set of cases, is checks, and when that covers them all.",
      sections: [
        {
          p: "A <code>sealed</code> class or interface has a fixed list of subclasses, all in the same file. That lets <code>when</code> check that every case is handled: no <code>else</code> is needed, and adding a new case makes the compiler point at every <code>when</code> that misses it. Inside a branch, <code>is</code> has already smart-cast the value, so its own properties can be used.",
          code: `sealed interface Shape
data class Circle(val r: Double) : Shape
data class Rect(val w: Double, val h: Double) : Shape

fun area(s: Shape): Double = when (s) {
    is Circle -> 3.0 * s.r * s.r
    is Rect -> s.w * s.h
}

fun main() {
    println(area(Circle(2.0)))
    println(area(Rect(3.0, 4.5)))
}`,
          out: "12.0\n13.5",
        },
        {
          h: "Results that can fail",
          p: "Sealed types are a good way to return either a value or a reason it failed, instead of throwing an exception. The caller has to look at which one it got. An <code>object</code> is a class with exactly one instance, useful for a case with no data.",
          code: `sealed interface Lookup
data class Found(val nuts: Int) : Lookup
data class Empty(val tree: String) : Lookup
object Unknown : Lookup

fun look(tree: String): Lookup = when (tree) {
    "oak" -> Found(12)
    "ash" -> Empty("ash")
    else -> Unknown
}

fun main() {
    for (t in listOf("oak", "ash", "elm")) {
        val msg = when (val r = look(t)) {
            is Found -> "found \${r.nuts}"
            is Empty -> "nothing in the \${r.tree}"
            Unknown -> "never heard of it"
        }
        println(msg)
    }
}`,
          out: "found 12\nnothing in the ash\nnever heard of it",
        },
        {
          h: "Enums",
          p: "An <code>enum class</code> is a type with a fixed list of named values. Each value knows its <code>name</code> and its position, <code>ordinal</code>, and <code>entries</code> lists them all. Like sealed types, a <code>when</code> over an enum can cover every value without <code>else</code>.",
          code: `enum class Season { SPRING, SUMMER, AUTUMN, WINTER }

fun task(s: Season) = when (s) {
    Season.SPRING, Season.SUMMER -> "eat"
    Season.AUTUMN -> "bury nuts"
    Season.WINTER -> "dig them up"
}

fun main() {
    for (s in Season.entries) println("\${s.ordinal} \${s.name}: \${task(s)}")
}`,
          out: "0 SPRING: eat\n1 SUMMER: eat\n2 AUTUMN: bury nuts\n3 WINTER: dig them up",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `sealed interface Pet
data class Dog(val name: String) : Pet
data class Fish(val count: Int) : Pet

fun say(p: Pet) = when (p) {
    is Dog -> "dog \${p.name}"
    is Fish -> "\${p.count} fish"
}

fun main() {
    println(say(Fish(3)))
    println(say(Dog("Rex")))
}`, options: ["3 fish\ndog Rex", "dog Rex\n3 fish", "Fish(count=3)\nDog(name=Rex)", "It doesn't compile without else"], answer: "3 fish\ndog Rex", why: "Pet is sealed, so the compiler knows Dog and Fish are the only cases and no else is needed." },
        { q: "Why does a when over a sealed type not need an else branch?", options: ["The compiler knows every possible subclass", "else is never needed in Kotlin", "Sealed classes can't be null", "when picks the first branch anyway"], answer: "The compiler knows every possible subclass", why: "All subclasses of a sealed type are known when it is compiled, so the compiler can check that each one is handled." },
      ],
    },
    {
      id: "extensions",
      title: "Extensions and generics",
      summary: "Adding functions to existing types, type parameters, and scope functions.",
      sections: [
        {
          p: "An <b>extension function</b> adds a function to a type you didn't write, even <code>String</code> or <code>Int</code>. Inside it, <code>this</code> is the value it was called on. It doesn't really change the type; it's a normal function that is called with a dot.",
          code: `fun String.shout() = uppercase() + "!"
fun Int.isBig() = this > 100

fun main() {
    println("hello squirrel".shout())
    println(250.isBig())
    println(7.isBig())
}`,
          out: "HELLO SQUIRREL!\ntrue\nfalse",
        },
        {
          h: "Generics",
          p: "A <b>generic</b> function has a type parameter in angle brackets, <code>&lt;T&gt;</code>, standing for whatever type the caller uses. <code>List&lt;String&gt;</code> and <code>Map&lt;String, Int&gt;</code> are generic types you have already met. Kotlin works out <code>T</code> from the arguments, and the result keeps the right type.",
          code: `fun <T> middle(items: List<T>): T = items[items.size / 2]

fun <T> List<T>.everyOther(): List<T> = filterIndexed { i, _ -> i % 2 == 0 }

data class Box<T>(val item: T)

fun main() {
    println(middle(listOf("oak", "ash", "elm")))
    println(middle(listOf(1, 2, 3, 4)) * 10)
    println(listOf('a', 'b', 'c', 'd', 'e').everyOther())
    println(Box(42))
}`,
          out: "ash\n30\n[a, c, e]\nBox(item=42)",
        },
        {
          h: "Scope functions",
          p: "<code>let</code>, <code>apply</code> and <code>also</code> run a block with a value. <code>let</code> calls it <code>it</code> and gives back the block's result, which suits nullable values. <code>apply</code> calls it <code>this</code> and gives back the value itself, which suits setting up an object. <code>also</code> does a side job, like printing, and passes the value on.",
          code: `class Nest {
    var tree = ""
    var height = 0
}

fun main() {
    val nest = Nest().apply {
        tree = "oak"
        height = 12
    }
    println("\${nest.tree} \${nest.height}")
    val doubled = nest.height.let { it * 2 }
    println(doubled)
    val nuts = mutableListOf(3, 1).also { println("start: $it") }
    nuts.add(4)
    println(nuts)
}`,
          out: "oak 12\n24\nstart: [3, 1]\n[3, 1, 4]",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fun Int.squared() = this * this

fun main() {
    println(3.squared() + 4.squared())
}`, options: ["25", "7", "49", "34"], answer: "25", why: "squared is an extension on Int, so 3.squared() is 9 and 4.squared() is 16." },
        { kind: "output", q: "What does this print?", code: `fun <T> pairUp(a: T, b: T): List<T> = listOf(a, b, a)

fun main() {
    println(pairUp("x", "y"))
    println(pairUp(1, 2).sum())
}`, options: ["[x, y, x]\n4", "[x, y]\n3", "[x, y, x]\n3", "xyx\n4"], answer: "[x, y, x]\n4", why: "T is String in the first call and Int in the second, so sum works: 1 + 2 + 1." },
      ],
    },
  ],
};
