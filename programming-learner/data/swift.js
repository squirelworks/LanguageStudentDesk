// Swift course for the Programming Learner. Written for this project.
// Examples are complete Swift files of top-level code. tools/run_swift.py
// compiles each with swiftc, runs it and checks the printed output. Code is in
// String.raw templates because Swift writes \(...) inside strings.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.swift = {
  id: "swift",
  name: "Swift",
  title: "Swift: the language of iPhone and Mac apps",
  intro:
    "Swift is Apple's language for apps on the iPhone, iPad, Mac, Apple Watch and Apple TV. Apple released it in 2014 to replace Objective-C, and made it open source a year later, so it also runs on Linux and Windows. Swift is built to be safe: every variable has a type the compiler checks, a value that may be missing has to be marked as <b>optional</b> and unwrapped before use, and arrays check that you stay inside them. It is also quick to write, with types worked out for you and no semicolons. These lessons cover the language itself, the part that is the same whether you go on to build iPhone apps with SwiftUI or command-line tools. Every example is a whole file and shows exactly what it prints. To run one yourself, install Swift (it comes with Xcode on a Mac; for Linux and Windows see swift.org), save the example as <code>main.swift</code>, and type <code>swiftc main.swift -o main</code> and then <code>./main</code>.",
  comment: "//",
  keywords: [
    "let", "var", "func", "return", "if", "else", "guard", "switch", "case", "default", "for", "in", "while", "repeat",
    "struct", "class", "enum", "protocol", "extension", "init", "self", "mutating", "throws", "throw", "try", "do", "catch",
    "nil", "true", "false", "private", "where", "some", "inout", "async", "await", "is", "as",
  ],
  builtins: ["print", "Int", "Double", "String", "Bool", "Character", "Array", "Dictionary", "Set", "Error", "Result", "count", "map", "filter", "reduce", "sorted", "joined", "max", "min", "compactMap", "flatMap"],
  lessons: [
    {
      id: "first",
      title: "Your first program",
      summary: "print, let and var, types and string interpolation.",
      sections: [
        {
          p: "A Swift program can start straight away: statements at the top of <code>main.swift</code> run in order, with no <code>main</code> function to write. <code>print</code> prints its values and ends the line. Given several values, it puts a space between them.",
          code: String.raw`print("Hello, squirrel!")
print("Nuts:", 42)`,
          out: "Hello, squirrel!\nNuts: 42",
        },
        {
          h: "let and var",
          p: "<code>let</code> makes a <b>constant</b>, which can't be given a new value, and <code>var</code> a <b>variable</b>, which can. Swift prefers <code>let</code>, and the compiler even warns about a <code>var</code> that never changes. The type comes after a colon, but usually Swift works it out from the value: <code>let nuts = 7</code> is an <code>Int</code>.",
          code: String.raw`let name: String = "Hazel"
var nuts = 7
nuts = nuts + 3
// name = "Bob"   <- error: cannot assign to a 'let' constant
let hungry = nuts < 20
print(name)
print(nuts)
print(hungry)`,
          out: "Hazel\n10\ntrue",
        },
        {
          h: "String interpolation",
          p: "Inside a string, <code>\\(...)</code> puts in the value of any expression. Strings can also be joined with <code>+</code>, and <code>count</code> gives the number of characters.",
          code: String.raw`let name = "Hazel"
let nuts = 7
print("\(name) has \(nuts) nuts")
print("Next week: \(nuts * 2)")
print("Name length: \(name.count)")
print(name + " the squirrel")`,
          out: "Hazel has 7 nuts\nNext week: 14\nName length: 5\nHazel the squirrel",
        },
        {
          h: "Numbers",
          p: "<code>Int</code> holds whole numbers and <code>Double</code> numbers with a fractional part. Dividing two <code>Int</code>s drops the remainder, which <code>%</code> gives you. Swift never mixes number types by itself: an <code>Int</code> and a <code>Double</code> can't be added until you convert one with <code>Double(...)</code> or <code>Int(...)</code>.",
          code: String.raw`let nuts = 17
let squirrels = 5
print(nuts / squirrels)
print(nuts % squirrels)
print(Double(nuts) / Double(squirrels))
let weight = 6.0
print(weight)
print(Int(weight) + 1)`,
          out: "3\n2\n3.4\n6.0\n7",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`var acorns = 4
acorns += 2
let tree = "oak"
print("\(acorns) from the \(tree)")`, options: ["6 from the oak", String.raw`\(acorns) from the \(tree)`, "42 from the oak", "4 from the oak"], answer: "6 from the oak", why: "Each \\(...) is replaced by the value inside, and acorns is 6 after += 2." },
        { kind: "output", q: "What does this print?", code: String.raw`print(7 / 2)
print(7.0 / 2)`, options: ["3\n3.5", "3.5\n3.5", "3\n3", "4\n3.5"], answer: "3\n3.5", why: "Int divided by Int drops the remainder. 7.0 is a Double, so the 2 next to it is treated as a Double too." },
        { q: "What happens when you give a let constant a new value?", options: ["The compiler reports an error", "It changes, like a var", "It is ignored", "The program stops when it reaches that line"], answer: "The compiler reports an error", why: "A let can be set only once. The mistake is caught before the program runs." },
      ],
    },
    {
      id: "decisions",
      title: "Decisions and loops",
      summary: "if, switch with ranges, for-in and while.",
      sections: [
        {
          p: "<code>if</code> needs no brackets around its condition, but the braces around its body are required, even for one line. The condition must be a real <code>Bool</code>: Swift doesn't treat 0 or an empty string as false.",
          code: String.raw`let nuts = 12
if nuts > 10 {
    print("Big stash")
} else if nuts > 0 {
    print("Some nuts")
} else {
    print("Keep looking")
}`,
          out: "Big stash",
        },
        {
          h: "switch",
          p: "Swift's <code>switch</code> can match several values, a range like <code>3...9</code>, or a condition with <code>where</code>. It doesn't fall through to the next case, so no <code>break</code> is needed. A <code>switch</code> must cover every possible value, which for an <code>Int</code> means ending with <code>default</code>.",
          code: String.raw`func describe(_ nuts: Int) -> String {
    switch nuts {
    case 0:
        return "none"
    case 1, 2:
        return "a few"
    case 3...9:
        return "some"
    case let n where n > 100:
        return "too many to count"
    default:
        return "lots"
    }
}

print(describe(0))
print(describe(2))
print(describe(5))
print(describe(40))
print(describe(500))`,
          out: "none\na few\nsome\nlots\ntoo many to count",
        },
        {
          h: "Ranges and loops",
          p: "<code>1...5</code> is a range from 1 to 5 with both ends included, and <code>0..&lt;3</code> leaves out the end. <code>for</code>-<code>in</code> walks through a range or an array. <code>stride(from:to:by:)</code> counts in steps, including backwards. <code>while</code> loops as long as its condition holds.",
          code: String.raw`for i in 1...5 {
    print(i, terminator: " ")
}
print()
for i in 0..<3 {
    print(i, terminator: " ")
}
print()
for i in stride(from: 10, through: 0, by: -5) {
    print(i, terminator: " ")
}
print()
var nuts = 1
while nuts < 50 {
    nuts *= 3
}
print(nuts)`,
          out: "1 2 3 4 5 \n0 1 2 \n10 5 0 \n81",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`var total = 0
for i in 1...4 {
    total += i
}
print(total)`, options: ["10", "6", "4", "1234"], answer: "10", why: "1...4 includes both ends: 1 + 2 + 3 + 4 = 10." },
        { kind: "output", q: "What does this print?", code: String.raw`let n = 7
switch n {
case 0..<5:
    print("small")
case 5..<10:
    print("medium")
default:
    print("large")
}`, options: ["medium", "small", "large", "medium\nlarge"], answer: "medium", why: "7 is in 5..<10. Swift runs only the matching case and doesn't fall through." },
        { q: "How many times does  for i in 0..<4  run?", options: ["4", "5", "3", "0"], answer: "4", why: "..< leaves out the end, so i takes 0, 1, 2 and 3." },
      ],
    },
    {
      id: "functions",
      title: "Functions and closures",
      summary: "Argument labels, defaults, return types and closures.",
      sections: [
        {
          p: "Functions are declared with <code>func</code>; the return type follows <code>-&gt;</code>. Swift callers write each argument's <b>label</b>, so calls read like sentences: <code>share(nuts: 10, among: 5)</code>. A parameter can have a label for callers and a different name inside the function, or <code>_</code> for no label. Parameters can have default values.",
          code: String.raw`func share(nuts: Int, among squirrels: Int = 2) -> Int {
    return nuts / squirrels
}

func double(_ n: Int) -> Int {
    n * 2
}

print(share(nuts: 10))
print(share(nuts: 10, among: 5))
print(double(21))`,
          out: "5\n2\n42",
        },
        {
          h: "Returning several values",
          p: "A function can return a <b>tuple</b>, a small group of values with names. The caller reads them by name, or takes them apart into separate constants.",
          code: String.raw`func split(_ nuts: Int, into parts: Int) -> (each: Int, left: Int) {
    (nuts / parts, nuts % parts)
}

let result = split(17, into: 5)
print(result.each, result.left)
let (each, left) = split(10, into: 3)
print("\(each) each, \(left) left over")`,
          out: "3 2\n3 each, 1 left over",
        },
        {
          h: "Closures",
          p: "A <b>closure</b> is a function without a name, written in braces: <code>{ (n: Int) -&gt; Int in n * 3 }</code>. You can keep one in a constant and pass it to other functions. When Swift knows the types, you can drop them, and even the parameter names: <code>$0</code> is the first argument. A closure that is the last argument can go after the brackets.",
          code: String.raw`func twice(_ x: Int, _ f: (Int) -> Int) -> Int {
    f(f(x))
}

let triple = { (n: Int) -> Int in n * 3 }
print(triple(4))
print(twice(2, triple))
print(twice(5) { $0 + 10 })`,
          out: "12\n18\n25",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`func label(_ tree: String, count: Int = 1) -> String {
    "\(tree) x\(count)"
}
print(label("oak"))
print(label("ash", count: 3))`, options: ["oak x1\nash x3", "oak x0\nash x3", "oak\nash x3", "oak x1\nash x1"], answer: "oak x1\nash x3", why: "count defaults to 1. The first parameter has _ so it needs no label, and count does." },
        { kind: "output", q: "What does this print?", code: String.raw`func apply(_ n: Int, _ f: (Int) -> Int) -> Int {
    f(n)
}
print(apply(5) { $0 * $0 })`, options: ["25", "10", "5", "$0 * $0"], answer: "25", why: "The closure after the brackets is f, and $0 is its first argument, 5." },
      ],
    },
    {
      id: "optionals",
      title: "Optionals",
      summary: "Int?, if let, guard let, ?? and optional chaining.",
      sections: [
        {
          p: "A plain <code>String</code> in Swift always holds a string. When a value may be missing, its type gets a question mark: <code>String?</code> is an <b>optional</b> string, which holds either a string or <code>nil</code>. You can't use an optional as if it were there. <code>if let</code> unwraps it: the body runs only when there is a value, and inside it the name is a plain <code>String</code>.",
          code: String.raw`func shout(_ name: String?) {
    // print(name.uppercased())   <- error: name might be nil
    if let name {
        print(name.uppercased())
    } else {
        print("nobody")
    }
}

shout("hazel")
shout(nil)`,
          out: "HAZEL\nnobody",
        },
        {
          h: "?? and optional chaining",
          p: "<code>??</code> gives a fallback when an optional is <code>nil</code>. <code>?.</code>, <b>optional chaining</b>, goes on only if there is a value: <code>name?.count</code> is the length, or <code>nil</code>. <code>!</code> forces an optional open and crashes the program if it is <code>nil</code>, so use it rarely.",
          code: String.raw`let names: [String?] = ["Hazel", nil, "Acorn"]
for n in names {
    print(n?.count ?? 0)
}
for n in names {
    print(n ?? "unknown")
}
let first = names[0]!
print(first.lowercased())`,
          out: "5\n0\n5\nHazel\nunknown\nAcorn\nhazel",
        },
        {
          h: "Things that may fail, and guard",
          p: "Many operations return an optional when they may have no answer. <code>Int(\"42\")</code> turns text into a number, or <code>nil</code> if the text isn't one. <code>first(where:)</code> finds the first matching item, or <code>nil</code>. <code>guard let</code> is the other way round from <code>if let</code>: it leaves the function early when the value is missing, and the unwrapped name stays usable for the rest of the function.",
          code: String.raw`print(Int("42") ?? -1)
print(Int("forty") ?? -1)

func nutsPerDay(_ text: String) -> String {
    guard let total = Int(text) else {
        return "not a number"
    }
    return "\(total / 7) a day"
}
print(nutsPerDay("70"))
print(nutsPerDay("lots"))

let trees = ["oak", "ash", "beech"]
if let long = trees.first(where: { $0.count > 4 }) {
    print("Found \(long)")
}`,
          out: "42\n-1\n10 a day\nnot a number\nFound beech",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`let a: String? = nil
let b: String? = "pine"
print((a?.count ?? 0) + (b?.count ?? 0))`, options: ["4", "nil", "0", "An error"], answer: "4", why: "a?.count is nil, so ?? gives 0. b?.count is 4. 0 + 4 = 4." },
        { kind: "output", q: "What does this print?", code: String.raw`let inputs = ["3", "x", "5"]
var sum = 0
for s in inputs {
    sum += Int(s) ?? 0
}
print(sum)`, options: ["8", "3x5", "0", "An error"], answer: "8", why: "\"x\" isn't a number, so Int(\"x\") is nil and ?? turns it into 0: 3 + 0 + 5." },
        { q: "What does guard let do when the value is nil?", options: ["Runs its else block, which must leave the function", "Skips to the next line", "Crashes the program", "Sets the value to 0"], answer: "Runs its else block, which must leave the function", why: "guard's else must exit, with return or throw, so after the guard the unwrapped value is always there." },
      ],
    },
    {
      id: "collections",
      title: "Arrays and dictionaries",
      summary: "Arrays, dictionaries, sets, and map, filter and reduce.",
      sections: [
        {
          p: "An <b>array</b> is an ordered list of values of one type, written in square brackets. An array made with <code>let</code> can't change; one made with <code>var</code> can be <code>append</code>ed to and have items removed. Items are numbered from 0. Printing an array shows strings in quotes.",
          code: String.raw`let trees = ["oak", "ash", "beech"]
print(trees)
print(trees[1])
print(trees.count)
var stash = [3, 5]
stash.append(8)
stash.remove(at: 0)
print(stash)
print(trees.contains("ash"))`,
          out: "[\"oak\", \"ash\", \"beech\"]\nash\n3\n[5, 8]\ntrue",
        },
        {
          h: "Dictionaries",
          p: "A <b>dictionary</b> stores values under keys: <code>[\"oak\": 4]</code>. Looking up a key gives an optional, because the key may not be there. A dictionary has no fixed order, so to print one in a predictable order, go through <code>keys.sorted()</code>. Setting a key to <code>nil</code> removes it.",
          code: String.raw`var stash = ["oak": 4, "hazel": 9]
stash["beech"] = 2
stash["oak", default: 0] += 1
print(stash["pine"] ?? 0)
stash["hazel"] = nil
for tree in stash.keys.sorted() {
    print("\(tree): \(stash[tree]!)")
}`,
          out: "0\nbeech: 2\noak: 5",
        },
        {
          h: "map, filter and reduce",
          p: "Arrays come with functions that take a closure. <code>filter</code> keeps the items that pass a test, <code>map</code> turns each item into something else, and <code>reduce</code> combines them all into one value, starting from the value you give it. <code>sorted</code>, <code>max</code> and <code>joined</code> do what their names say.",
          code: String.raw`let nuts = [4, 11, 7, 2, 9]
print(nuts.filter { $0 > 5 })
print(nuts.map { $0 * 10 })
print(nuts.reduce(0, +))
print(nuts.filter { $0 % 2 == 1 }.reduce(0, +))
print(nuts.max() ?? 0)
let trees = ["beech", "oak", "chestnut"]
print(trees.sorted { $0.count < $1.count })
print(trees.map { $0.uppercased() }.joined(separator: " / "))`,
          out: "[11, 7, 9]\n[40, 110, 70, 20, 90]\n33\n27\n11\n[\"oak\", \"beech\", \"chestnut\"]\nBEECH / OAK / CHESTNUT",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`let n = [1, 2, 3, 4, 5, 6]
print(n.filter { $0 % 2 == 0 }.map { $0 * $0 })`, options: ["[4, 16, 36]", "[1, 9, 25]", "[2, 4, 6]", "56"], answer: "[4, 16, 36]", why: "filter keeps 2, 4 and 6, and map squares each of them." },
        { kind: "output", q: "What does this print?", code: String.raw`let ages = ["Hazel": 3, "Acorn": 1]
print(ages["Acorn"] ?? -1)
print(ages["Bob"] ?? -1)`, options: ["1\n-1", "1\n0", "1\nAn error", "Acorn\nBob"], answer: "1\n-1", why: "A lookup gives an optional. Bob isn't a key, so the lookup is nil and ?? gives -1." },
        { q: "What does  let a = [1, 2];  a.append(3)  do?", options: ["It doesn't compile: a let array can't change", "Makes [1, 2, 3]", "Returns a new array", "Crashes when it runs"], answer: "It doesn't compile: a let array can't change", why: "An array in a let constant is fixed. Declare it with var to change it." },
      ],
    },
    {
      id: "structs",
      title: "Structs and classes",
      summary: "Properties, methods, mutating, and value versus reference types.",
      sections: [
        {
          p: "A <code>struct</code> groups related values and the functions that work on them. Swift writes an initializer for you that takes each property by name. A method that changes the struct's own properties is marked <code>mutating</code>. A <b>computed property</b> works out its value each time it is read.",
          code: String.raw`struct Squirrel {
    let name: String
    var nuts = 0

    mutating func gather(_ found: Int) {
        nuts += found
    }
    var report: String {
        "\(name) has \(nuts) nuts"
    }
}

var s = Squirrel(name: "Hazel")
s.gather(3)
s.gather(4)
print(s.report)
print(s.name)`,
          out: "Hazel has 7 nuts\nHazel",
        },
        {
          h: "Values and references",
          p: "Structs are <b>value types</b>: assigning one to another name makes a separate copy, so changing the copy leaves the original alone. Classes are <b>reference types</b>: both names point at the same object. Swift code uses structs for most things, and classes when one shared object is really wanted. A class needs its own <code>init</code>.",
          code: String.raw`struct NutBox {
    var nuts: Int
}
class NutTree {
    var nuts: Int
    init(nuts: Int) {
        self.nuts = nuts
    }
}

var box1 = NutBox(nuts: 5)
var box2 = box1
box2.nuts = 99
print(box1.nuts, box2.nuts)

let tree1 = NutTree(nuts: 5)
let tree2 = tree1
tree2.nuts = 99
print(tree1.nuts, tree2.nuts)`,
          out: "5 99\n99 99",
        },
        {
          h: "Protocols",
          p: "A <code>protocol</code> lists what a type must provide. Structs, classes and enums can all adopt protocols, and an array of the protocol type can hold any of them. <code>CustomStringConvertible</code> is a built-in protocol: give a type a <code>description</code> and <code>print</code> uses it.",
          code: String.raw`protocol Animal {
    var name: String { get }
    func sound() -> String
}

struct Squirrel: Animal {
    let name: String
    func sound() -> String { "chitter" }
}

struct Owl: Animal, CustomStringConvertible {
    let name: String
    func sound() -> String { "hoo" }
    var description: String { "Owl called \(name)" }
}

let wood: [any Animal] = [Squirrel(name: "Hazel"), Owl(name: "Sage")]
for a in wood {
    print("\(a.name) says \(a.sound())")
}
print(Owl(name: "Sage"))`,
          out: "Hazel says chitter\nSage says hoo\nOwl called Sage",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`struct Point {
    var x: Int
    var y: Int
}
var p = Point(x: 1, y: 2)
var q = p
q.y = 5
print(p.y, q.y)`, options: ["2 5", "5 5", "2 2", "1 5"], answer: "2 5", why: "Point is a struct, so q is a separate copy. Changing q leaves p alone." },
        { kind: "output", q: "What does this print?", code: String.raw`class Counter {
    var count = 0
    func tick() -> Int {
        count += 1
        return count
    }
}
let a = Counter()
let b = a
_ = a.tick()
print(b.tick())`, options: ["2", "1", "0", "It doesn't compile"], answer: "2", why: "Counter is a class, so a and b are the same object. Its count is ticked twice." },
      ],
    },
    {
      id: "enums",
      title: "Enums",
      summary: "Cases, switch over every case, associated values and raw values.",
      sections: [
        {
          p: "An <code>enum</code> is a type with a fixed list of cases. A <code>switch</code> over an enum must handle every case, so adding a new case makes the compiler point at every switch that misses it. When Swift knows the type, you can write just <code>.autumn</code>. <code>CaseIterable</code> adds <code>allCases</code>, a list of every case.",
          code: String.raw`enum Season: CaseIterable {
    case spring, summer, autumn, winter
}

func task(_ s: Season) -> String {
    switch s {
    case .spring, .summer:
        return "eat"
    case .autumn:
        return "bury nuts"
    case .winter:
        return "dig them up"
    }
}

for s in Season.allCases {
    print("\(s): \(task(s))")
}`,
          out: "spring: eat\nsummer: eat\nautumn: bury nuts\nwinter: dig them up",
        },
        {
          h: "Associated values",
          p: "Each case of an enum can carry its own values, called <b>associated values</b>. A <code>switch</code> takes them apart with <code>let</code>. This is a tidy way to say \"one of these shapes\" or \"either a result or a reason it failed\".",
          code: String.raw`enum Shape {
    case circle(r: Double)
    case rect(w: Double, h: Double)
}

func area(_ s: Shape) -> Double {
    switch s {
    case .circle(let r):
        return 3.0 * r * r
    case .rect(let w, let h):
        return w * h
    }
}

print(area(.circle(r: 2)))
print(area(.rect(w: 3, h: 4.5)))`,
          out: "12.0\n13.5",
        },
        {
          h: "Raw values",
          p: "An enum can give each case a fixed <b>raw value</b>, such as a string or a number. <code>rawValue</code> reads it, and <code>init(rawValue:)</code> goes the other way, giving an optional because the value may match no case.",
          code: String.raw`enum Tree: String {
    case oak = "Quercus"
    case ash = "Fraxinus"
    case hazel = "Corylus"
}

print(Tree.oak.rawValue)
if let t = Tree(rawValue: "Corylus") {
    print("Found \(t)")
}
print(Tree(rawValue: "Pinus") == nil)`,
          out: "Quercus\nFound hazel\ntrue",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`enum Pet {
    case dog(name: String)
    case fish(count: Int)
}
func say(_ p: Pet) -> String {
    switch p {
    case .dog(let name):
        return "dog \(name)"
    case .fish(let count):
        return "\(count) fish"
    }
}
print(say(.fish(count: 3)))
print(say(.dog(name: "Rex")))`, options: ["3 fish\ndog Rex", "dog Rex\n3 fish", "fish(count: 3)\ndog(name: \"Rex\")", "It doesn't compile without default"], answer: "3 fish\ndog Rex", why: "The switch covers both cases of Pet, so no default is needed, and let takes out each case's value." },
        { q: "Why does  Tree(rawValue: \"Pinus\")  give an optional?", options: ["The raw value might match no case", "Raw values are always optional", "Enums can't be made from strings", "So it can be changed later"], answer: "The raw value might match no case", why: "Any string can be passed in, but only three of them name a tree, so the result is nil for the rest." },
      ],
    },
    {
      id: "errors",
      title: "Errors, extensions and generics",
      summary: "throws and do-catch, adding to existing types, type parameters.",
      sections: [
        {
          p: "A function that can fail is marked <code>throws</code> and stops with <code>throw</code>. Any type that adopts the <code>Error</code> protocol can be thrown; an enum is the usual choice. Calls to it must be marked with <code>try</code>, inside a <code>do</code> block whose <code>catch</code> clauses handle each error. <code>try?</code> turns an error into <code>nil</code> instead.",
          code: String.raw`enum StashError: Error {
    case empty
    case tooFew(have: Int)
}

func take(_ want: Int, from stash: Int) throws -> Int {
    if stash == 0 { throw StashError.empty }
    if stash < want { throw StashError.tooFew(have: stash) }
    return stash - want
}

for stash in [10, 0, 3] {
    do {
        let left = try take(5, from: stash)
        print("left: \(left)")
    } catch StashError.tooFew(let have) {
        print("only \(have)")
    } catch {
        print("error: \(error)")
    }
}
print((try? take(1, from: 0)) ?? -1)`,
          out: "left: 5\nerror: empty\nonly 3\n-1",
        },
        {
          h: "Extensions",
          p: "An <code>extension</code> adds methods and computed properties to a type you didn't write, even <code>String</code> or <code>Int</code>. Inside it, <code>self</code> is the value it was used on.",
          code: String.raw`extension String {
    func shout() -> String {
        uppercased() + "!"
    }
}
extension Int {
    var isBig: Bool { self > 100 }
}

print("hello squirrel".shout())
print(250.isBig)
print(7.isBig)`,
          out: "HELLO SQUIRREL!\ntrue\nfalse",
        },
        {
          h: "Generics",
          p: "A <b>generic</b> function has a type parameter in angle brackets, <code>&lt;T&gt;</code>, standing for whatever type the caller uses. Arrays and dictionaries are generic too: <code>[String]</code> is short for <code>Array&lt;String&gt;</code>. A constraint like <code>T: Comparable</code> lets the function use <code>&lt;</code> on its values.",
          code: String.raw`func middle<T>(_ items: [T]) -> T {
    items[items.count / 2]
}

func largest<T: Comparable>(_ a: T, _ b: T) -> T {
    a > b ? a : b
}

struct Box<T> {
    let item: T
}

print(middle(["oak", "ash", "elm"]))
print(middle([1, 2, 3, 4]) * 10)
print(largest(3, 8), largest("oak", "ash"))
print(Box(item: 42).item)`,
          out: "ash\n30\n8 oak\n42",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`enum NutError: Error {
    case rotten
}
func eat(_ n: Int) throws -> String {
    if n < 0 { throw NutError.rotten }
    return "ate \(n)"
}
print((try? eat(2)) ?? "none")
print((try? eat(-1)) ?? "none")`, options: ["ate 2\nnone", "ate 2\nate -1", "none\nnone", "ate 2\nrotten"], answer: "ate 2\nnone", why: "try? gives nil when the call throws, and ?? swaps nil for \"none\"." },
        { kind: "output", q: "What does this print?", code: String.raw`extension Int {
    func squared() -> Int { self * self }
}
print(3.squared() + 4.squared())`, options: ["25", "7", "49", "34"], answer: "25", why: "squared is added to Int by the extension, so 3.squared() is 9 and 4.squared() is 16." },
      ],
    },
    {
      id: "results",
      title: "Result as a value",
      summary: "Result success and failure, map, flatMap and get.",
      sections: [
        {
          p: "<code>Result&lt;Success, Failure&gt;</code> is either a <code>.success</code> holding a value or a <code>.failure</code> holding an error. Unlike <code>throw</code>, the failure is a normal return value, so the caller has to look at it. A <code>switch</code> (or <code>get()</code>, which throws the failure) unpacks it. This is the same idea as a carefully written enum with associated values, built into the language.",
          code: String.raw`enum StashError: Error {
    case empty
    case tooFew(have: Int)
}

func take(_ want: Int, from stash: Int) -> Result<Int, StashError> {
    if stash == 0 { return .failure(.empty) }
    if stash < want { return .failure(.tooFew(have: stash)) }
    return .success(stash - want)
}

for stash in [10, 0, 3] {
    switch take(5, from: stash) {
    case .success(let left):
        print("left: \(left)")
    case .failure(.tooFew(let have)):
        print("only \(have)")
    case .failure(.empty):
        print("empty")
    }
}`,
          out: "left: 5\nempty\nonly 3",
        },
        {
          h: "map, flatMap and get",
          p: "<code>map</code> transforms a successful value and leaves a failure alone. <code>flatMap</code> chains a second step that itself returns a <code>Result</code>, so failures skip the rest. <code>get()</code> throws the failure, which suits a <code>do</code>/<code>catch</code> or <code>try?</code> when you want an optional again.",
          code: String.raw`enum ParseError: Error { case bad }

func parse(_ s: String) -> Result<Int, ParseError> {
    if let n = Int(s) { return .success(n) }
    return .failure(.bad)
}

func double(_ n: Int) -> Result<Int, ParseError> {
    .success(n * 2)
}

let values = ["12", "x", "5"].map { parse($0) }
var sum = 0
var fails = 0
for r in values {
    switch r {
    case .success(let n): sum += n
    case .failure: fails += 1
    }
}
print(sum)
print(fails)

switch parse("7").flatMap(double) {
case .success(let n): print(n)
case .failure: print("fail")
}
switch parse("no").map({ $0 * 2 }) {
case .success(let n): print(n)
case .failure: print("fail")
}
print((try? parse("4").get()) ?? -1)
print((try? parse("z").get()) ?? -1)`,
          out: "17\n1\n14\nfail\n4\n-1",
        },
        {
          h: "Optionals that dig deeper",
          p: "<code>guard let</code> can unwrap several optionals at once, and stop early if any is missing. Optional <code>map</code> runs a transform only when there is a value. Together with <code>Result</code>, you choose: missing data stays an optional; a real failure becomes a <code>Result</code> (or a throw).",
          code: String.raw`func label(_ text: String?) -> String {
    guard let text, let n = Int(text), n >= 0 else {
        return "unknown"
    }
    return "\(n) nuts"
}

print(label("9"))
print(label(nil))
print(label("no"))
print(label("-1"))

let amounts: [String?] = ["3", nil, "5"]
let total = amounts.compactMap { $0 }.compactMap { Int($0) }.reduce(0, +)
print(total)
print(Optional(4).map { $0 * 10 } ?? 0)
print((nil as Int?).map { $0 * 10 } ?? 0)`,
          out: "9 nuts\nunknown\nunknown\nunknown\n8\n40\n0",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`enum E: Error { case nope }
let rs: [Result<Int, E>] = [.success(2), .failure(.nope), .success(5)]
var sum = 0
for r in rs {
    if case .success(let n) = r { sum += n }
}
print(sum)`, options: ["7", "2", "5", "0"], answer: "7", why: "Only the two successes add their values: 2 + 5." },
        { kind: "output", q: "What does this print?", code: String.raw`enum E: Error { case bad }
func parse(_ s: String) -> Result<Int, E> {
    if let n = Int(s) { return .success(n) }
    return .failure(.bad)
}
switch parse("6").map({ $0 * $0 }) {
case .success(let n): print(n)
case .failure: print("x")
}`, options: ["36", "6", "x", "0"], answer: "36", why: "map squares the successful 6; failure would stay a failure." },
        { q: "When is Result a better fit than throw?", options: ["When a failure is a normal outcome the caller should handle as a value", "Whenever anything can go wrong", "Only inside async functions", "Never; throw is always better"], answer: "When a failure is a normal outcome the caller should handle as a value", why: "Result makes the failure part of the return type, so it can't be ignored by accident." },
      ],
    },
    {
      id: "patterns",
      title: "Pattern matching in depth",
      summary: "if case, for case, and nested associated values.",
      sections: [
        {
          p: "<code>if case</code> matches one enum case without a full <code>switch</code>, and <code>for case</code> walks a list keeping only the cases you care about. Both can bind associated values with <code>let</code>. Use <code>_</code> for values you don't need.",
          code: String.raw`enum Event {
    case found(nut: String, count: Int)
    case ate(nut: String, count: Int)
    case gift(nut: String, count: Int, to: String)
}

let events: [Event] = [
    .found(nut: "acorn", count: 8),
    .ate(nut: "acorn", count: 2),
    .gift(nut: "walnut", count: 1, to: "Pip"),
    .found(nut: "walnut", count: 3),
]

if case .found(let nut, let count) = events[0] {
    print("first find \(count) \(nut)")
}
for case .gift(_, _, let to) in events {
    print("gift to \(to)")
}
let finds = events.compactMap { e -> String? in
    if case .found(let nut, let count) = e { return "\(nut) x\(count)" }
    return nil
}
print(finds.joined(separator: ", "))`,
          out: "first find 8 acorn\ngift to Pip\nacorn x8, walnut x3",
        },
        {
          h: "Nested associated values",
          p: "One enum's associated value can be another enum. A <code>switch</code> can match both layers at once: <code>.ok(.pair(let a, let b))</code>. That keeps related shapes together without a pile of optional fields.",
          code: String.raw`enum Payload {
    case text(String)
    case pair(Int, Int)
}

enum Message {
    case ok(Payload)
    case err(String)
}

func describe(_ m: Message) -> String {
    switch m {
    case .ok(.text(let s)):
        return "text \(s)"
    case .ok(.pair(let a, let b)):
        return "pair \(a)+\(b)"
    case .err(let e):
        return "err \(e)"
    }
}

print(describe(.ok(.text("hi"))))
print(describe(.ok(.pair(3, 4))))
print(describe(.err("nope")))`,
          out: "text hi\npair 3+4\nerr nope",
        },
        {
          h: "where clauses on cases",
          p: "A case can add a <code>where</code> condition. The branch runs only when the pattern matches <i>and</i> the condition is true. That keeps filters next to the data they care about.",
          code: String.raw`enum Find {
    case nut(kind: String, grams: Int)
    case empty
}

func grade(_ f: Find) -> String {
    switch f {
    case .nut(let kind, let grams) where grams >= 10:
        return "big \(kind)"
    case .nut(let kind, _):
        return "small \(kind)"
    case .empty:
        return "nothing"
    }
}

for f in [Find.nut(kind: "walnut", grams: 12), .nut(kind: "acorn", grams: 4), .empty] {
    print(grade(f))
}`,
          out: "big walnut\nsmall acorn\nnothing",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`enum Pet {
    case dog(String)
    case fish(Int)
}
let pets: [Pet] = [.dog("Rex"), .fish(3), .dog("Pip")]
var names: [String] = []
for case .dog(let name) in pets {
    names.append(name)
}
print(names.joined(separator: "+"))`, options: ["Rex+Pip", "Rex", "Rex+3+Pip", "dog+dog"], answer: "Rex+Pip", why: "for case keeps only the dog cases and binds each name." },
        { kind: "output", q: "What does this print?", code: String.raw`enum Inner { case a(Int), b }
enum Outer { case wrap(Inner), bare }
func show(_ o: Outer) -> String {
    switch o {
    case .wrap(.a(let n)): return "a\(n)"
    case .wrap(.b): return "b"
    case .bare: return "bare"
    }
}
print(show(.wrap(.a(2))))
print(show(.bare))`, options: ["a2\nbare", "wrap\nbare", "a2\nb", "2\nbare"], answer: "a2\nbare", why: "The nested pattern matches wrap with inner a(2), and bare matches on its own." },
        { q: "What does if case .found(let nut, _) = e do?", options: ["Runs its body only when e is .found, binding the nut and ignoring the other value", "Converts e into a found case", "Crashes if e is not found", "Loops over every found case"], answer: "Runs its body only when e is .found, binding the nut and ignoring the other value", why: "if case is a one-case match; _ discards an associated value you don't need." },
      ],
    },
    {
      id: "project",
      title: "Project: a nut ledger",
      summary: "Enums with associated values, a Result-style apply and a report.",
      sections: [
        {
          p: "A ledger is built by replaying a list of events. Each event is one case of an enum with associated values. Applying an event either updates the stock or returns an error string — a tiny result type, without throwing. A gift that asks for more walnuts than you have is skipped and reported; the rest become a sorted table.",
          code: String.raw`enum NutKind: String, CaseIterable {
    case acorn, walnut, hazelnut
}

enum InventoryEvent {
    case found(nut: NutKind, count: Int)
    case ate(nut: NutKind, count: Int)
    case gift(nut: NutKind, count: Int, to: String)
}

enum ApplyResult {
    case ok([NutKind: Int])
    case err(String)
}

func apply(_ stock: [NutKind: Int], _ e: InventoryEvent) -> ApplyResult {
    var next = stock
    switch e {
    case .found(let nut, let count):
        next[nut, default: 0] += count
        return .ok(next)
    case .ate(let nut, let count):
        if next[nut, default: 0] < count {
            return .err("cannot ate \(count) \(nut.rawValue): only \(next[nut, default: 0])")
        }
        next[nut, default: 0] -= count
        return .ok(next)
    case .gift(let nut, let count, _):
        if next[nut, default: 0] < count {
            return .err("cannot gift \(count) \(nut.rawValue): only \(next[nut, default: 0])")
        }
        next[nut, default: 0] -= count
        return .ok(next)
    }
}

func pad(_ s: String, _ width: Int) -> String {
    if s.count >= width { return s }
    return s + String(repeating: " ", count: width - s.count)
}

let events: [InventoryEvent] = [
    .found(nut: .acorn, count: 8),
    .found(nut: .walnut, count: 3),
    .ate(nut: .acorn, count: 2),
    .gift(nut: .walnut, count: 5, to: "Pip"),
    .found(nut: .hazelnut, count: 4),
    .gift(nut: .acorn, count: 1, to: "Pip"),
]

var stock = Dictionary(uniqueKeysWithValues: NutKind.allCases.map { ($0, 0) })
var gifts = Set<String>()
for e in events {
    switch apply(stock, e) {
    case .ok(let next):
        stock = next
        if case .gift(_, _, let to) = e { gifts.insert(to) }
    case .err(let msg):
        print("skipped: \(msg)")
    }
}

for (nut, n) in stock.sorted(by: {
    $0.value != $1.value ? $0.value > $1.value : $0.key.rawValue < $1.key.rawValue
}) {
    let num = n < 10 ? " \(n)" : "\(n)"
    print("\(pad(nut.rawValue, 9)) \(num)")
}
print("gifts to: \(gifts.sorted().joined(separator: ", "))")`,
          out: "skipped: cannot gift 5 walnut: only 3\nacorn      5\nhazelnut   4\nwalnut     3\ngifts to: Pip",
        },
        {
          h: "Ideas to try",
          p: "Add a <code>traded</code> case that swaps one nut for another and see the compiler point at the unhandled case, keep a history of every stock along the way, or switch <code>ApplyResult</code> for the built-in <code>Result</code> type.",
        },
      ],
      practice: [
        { q: "Why does apply return ApplyResult instead of throwing?", options: ["So a bad event can be skipped and reported without stopping the whole replay", "Swift cannot throw inside a switch", "Enums cannot be thrown", "Strings are faster than errors"], answer: "So a bad event can be skipped and reported without stopping the whole replay", why: "Returning an error value keeps the loop in charge, the same idea as Result." },
        { kind: "output", q: "What does this print?", code: String.raw`enum Nut: String, CaseIterable { case acorn, walnut }
var stock = Dictionary(uniqueKeysWithValues: Nut.allCases.map { ($0, 0) })
stock[.acorn, default: 0] += 3
print(Nut.allCases.map(\.rawValue).joined(separator: ",") + " \(stock[.acorn]!)")`, options: ["acorn,walnut 3", "acorn 3", "ACORN,WALNUT 3", "0,0 3"], answer: "acorn,walnut 3", why: "allCases gives both cases in order; acorn is then increased." },
        { q: "What does if case .gift(_, _, let to) = e bind?", options: ["Only the recipient name, when e is a gift", "Every associated value of e", "The nut and the count", "Nothing; it always fails"], answer: "Only the recipient name, when e is a gift", why: "The two underscores discard the nut and count; to is bound only for gift events." },
      ],
    },
  ],
};
