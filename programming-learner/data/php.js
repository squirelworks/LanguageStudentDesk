// PHP course for the Programming Learner. Written for this project.
// Examples are complete PHP 8 scripts. tools/run_php.py runs them with the
// php command line and checks the printed output.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.php = {
  id: "php",
  name: "PHP",
  title: "PHP from the first echo",
  intro:
    "PHP started in 1994 as a few tools for a personal home page and became the language behind a large share of the web, including WordPress and the early Facebook. A web server runs a PHP script each time a page is asked for, and whatever the script prints becomes the page. Modern PHP (version 8) has types, classes, enums and fast arrow functions, and it also runs fine from the command line, which is how these lessons use it. Every example is a whole script and shows exactly what it prints. To run one yourself, save it as <code>hello.php</code> and type <code>php hello.php</code>.",
  comment: "//",
  keywords: [
    "echo", "print", "function", "fn", "return", "if", "elseif", "else", "foreach", "as", "for", "while", "match", "class", "new",
    "public", "private", "readonly", "static", "interface", "implements", "enum", "case", "true", "false", "null", "int", "float",
    "string", "bool", "array", "use",
  ],
  builtins: ["count", "strlen", "strtoupper", "implode", "explode", "array_map", "array_filter", "array_sum", "sort", "ksort", "printf", "json_encode", "htmlspecialchars", "var_dump", "str_repeat"],
  lessons: [
    {
      id: "first",
      title: "Your first script",
      summary: "<?php, echo, variables and strings.",
      sections: [
        {
          p: "A PHP file starts with <code>&lt;?php</code>. Anything before that tag would be sent out as plain text, which is how PHP mixes into web pages. <code>echo</code> prints, and statements end with a semicolon. Nothing ends the line unless you print <code>\"\\n\"</code>.",
          code: `<?php
echo "Hello, squirrel!\\n";
echo "Nuts: ", 42, "\\n";`,
          out: "Hello, squirrel!\nNuts: 42",
        },
        {
          h: "Variables and strings",
          p: "Every variable name starts with <code>$</code>, and you don't declare a type: the value carries it. The dot <code>.</code> joins strings. Inside <b>double</b> quotes a variable is replaced by its value; inside <b>single</b> quotes the text is kept exactly as written.",
          code: `<?php
$name = "Hazel";
$nuts = 7;
echo "Hi, " . $name . "!\\n";
echo "$name has $nuts nuts\\n";
echo '$name has $nuts nuts', "\\n";`,
          out: "Hi, Hazel!\nHazel has 7 nuts\n$name has $nuts nuts",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `<?php
$tree = "oak";
echo "Up the $tree\\n";
echo 'Up the $tree';`, options: ["Up the oak\nUp the $tree", "Up the oak\nUp the oak", "Up the $tree\nUp the $tree", "Up the $tree\nUp the oak"], answer: "Up the oak\nUp the $tree", why: "Double quotes put the variable's value in. Single quotes print the text exactly as written." },
        { kind: "output", q: "What does this print?", code: `<?php
echo "2" . "3", "\\n";
echo 2 + 3;`, options: ["23\n5", "5\n5", "23\n23", "5\n23"], answer: "23\n5", why: "The dot joins text. + adds numbers." },
        { q: "What does every PHP variable name start with?", options: ["$", "@", "#", "&"], answer: "$", why: "The $ tells PHP the word is a variable, which is also how it can spot variables inside double-quoted strings." },
      ],
    },
    {
      id: "values",
      title: "Types and comparing",
      summary: "int, float, string, bool, null, == and ===.",
      sections: [
        {
          p: "PHP's basic types are <code>int</code>, <code>float</code>, <code>string</code>, <code>bool</code> and <code>null</code>. <code>/</code> gives a float when the division isn't exact; <code>intdiv</code> keeps only the whole part and <code>%</code> gives the remainder. <code>var_dump</code> shows a value together with its type, which is handy when something surprises you.",
          code: `<?php
var_dump(17 / 5);
var_dump(10 / 5);
var_dump(intdiv(17, 5));
var_dump(17 % 5);
var_dump("nuts");
var_dump(null);`,
          out: "float(3.4)\nint(2)\nint(3)\nint(2)\nstring(4) \"nuts\"\nNULL",
        },
        {
          h: "== and ===",
          p: "<code>==</code> converts the two sides to a common type before comparing, so the string <code>\"5\"</code> equals the number <code>5</code>. <code>===</code> also checks that the types match. Most PHP style guides say to use <code>===</code> unless you mean to convert. <code>var_dump</code> on a comparison shows <code>bool(true)</code> or <code>bool(false)</code>.",
          code: `<?php
var_dump("5" == 5);
var_dump("5" === 5);
var_dump(0 == "");
var_dump(null == false);
var_dump(null === false);`,
          out: "bool(true)\nbool(false)\nbool(false)\nbool(true)\nbool(false)",
        },
        {
          h: "Strings in numbers",
          p: "Arithmetic on a string that holds a number turns it into that number first, so <code>\"4\" + 3</code> is <code>7</code>. <code>(int)</code> converts on purpose. The <code>??</code> operator gives a fallback when a value is <code>null</code> or missing.",
          code: `<?php
echo "4" + 3, "\\n";
echo (int) "12 acorns", "\\n";
$found = null;
echo $found ?? "nothing yet", "\\n";`,
          out: "7\n12\nnothing yet",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `<?php
var_dump(9 / 3);
var_dump(9 / 2);`, options: ["int(3)\nfloat(4.5)", "float(3)\nfloat(4.5)", "int(3)\nint(4)", "3\n4.5"], answer: "int(3)\nfloat(4.5)", why: "An exact division of two ints stays an int. When it doesn't come out even, the result is a float." },
        { kind: "output", q: "What does this print?", code: `<?php
var_dump("10" == "1e1");
var_dump("10" === "1e1");`, options: ["bool(true)\nbool(false)", "bool(false)\nbool(false)", "bool(true)\nbool(true)", "bool(false)\nbool(true)"], answer: "bool(true)\nbool(false)", why: "Both strings look like numbers, so == compares them as numbers, and 1e1 is 10. === compares the strings as written, and they differ." },
      ],
    },
    {
      id: "control",
      title: "Decisions and loops",
      summary: "if, elseif, match, for and while.",
      sections: [
        {
          p: "<code>if</code>, <code>elseif</code> and <code>else</code> choose a block to run. <code>&amp;&amp;</code> means and, <code>||</code> means or and <code>!</code> means not. A <code>match</code> expression picks a value by comparing with <code>===</code>, and gives an error if nothing matches and there is no <code>default</code>.",
          code: `<?php
$nuts = 12;
if ($nuts > 20) {
    echo "feast\\n";
} elseif ($nuts > 10) {
    echo "good day\\n";
} else {
    echo "keep looking\\n";
}
$day = "sat";
echo match ($day) {
    "sat", "sun" => "nap in the drey",
    "mon" => "bury nuts",
    default => "forage",
}, "\\n";`,
          out: "good day\nnap in the drey",
        },
        {
          h: "Loops",
          p: "<code>for</code> has a start, a test and a step. <code>while</code> repeats while its test holds. <code>break</code> leaves a loop early and <code>continue</code> skips to the next pass.",
          code: `<?php
for ($i = 1; $i <= 5; $i++) {
    if ($i === 3) {
        continue;
    }
    echo $i, " ";
}
echo "\\n";
$height = 1;
while ($height < 20) {
    $height *= 3;
}
echo $height, "\\n";`,
          out: "1 2 4 5 \n27",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `<?php
$n = "2";
echo match ($n) {
    2 => "number",
    "2" => "text",
    default => "neither",
};`, options: ["text", "number", "neither", "number text"], answer: "text", why: "match compares with ===, so the string \"2\" only matches the string case." },
        { kind: "output", q: "What does this print?", code: `<?php
$total = 0;
for ($i = 1; $i <= 10; $i++) {
    if ($i > 4) {
        break;
    }
    $total += $i;
}
echo $total;`, options: ["10", "55", "15", "4"], answer: "10", why: "The loop adds 1, 2, 3 and 4, then break stops it when i reaches 5." },
      ],
    },
    {
      id: "arrays",
      title: "Arrays",
      summary: "Lists, key–value arrays, foreach and the array functions.",
      sections: [
        {
          p: "A PHP array does two jobs. Written with plain values, <code>[\"oak\", \"ash\"]</code>, it is a list numbered from 0. <code>$list[] = ...</code> adds to the end and <code>count</code> gives the size. <code>foreach</code> visits every item; <code>implode</code> joins them into one string.",
          code: `<?php
$trees = ["oak", "ash"];
$trees[] = "hazel";
echo count($trees), " ", $trees[0], "\\n";
foreach ($trees as $i => $tree) {
    echo "$i: $tree\\n";
}
echo implode(", ", $trees), "\\n";`,
          out: "3 oak\n0: oak\n1: ash\n2: hazel\noak, ash, hazel",
        },
        {
          h: "Keys and values",
          p: "Written with <code>key =&gt; value</code> pairs, the same array type works as a dictionary. The array keeps the order you put things in. <code>isset</code> checks whether a key is there, and <code>ksort</code> sorts by key.",
          code: `<?php
$stash = ["oak" => 4, "hazel" => 9];
$stash["beech"] = 2;
$stash["oak"] += 1;
foreach ($stash as $tree => $nuts) {
    echo "$tree: $nuts\\n";
}
var_dump(isset($stash["pine"]));
ksort($stash);
echo implode(" ", array_keys($stash)), "\\n";`,
          out: "oak: 5\nhazel: 9\nbeech: 2\nbool(false)\nbeech hazel oak",
        },
        {
          h: "Array functions",
          p: "PHP has a long list of built-in array functions. <code>array_filter</code> keeps items that pass a test, <code>array_map</code> changes each item, and <code>array_sum</code> adds them up. The test or change is a small function, written here as an arrow function <code>fn($n) =&gt; $n * 2</code>. <code>array_filter</code> keeps the original keys; <code>array_values</code> renumbers them from 0.",
          code: `<?php
$nuts = [5, 12, 3, 8, 20];
$big = array_filter($nuts, fn($n) => $n > 4);
$doubled = array_map(fn($n) => $n * 2, $big);
echo implode(" ", $doubled), "\\n";
echo implode(",", array_keys($big)), "\\n";
echo implode(",", array_keys(array_values($big))), "\\n";
echo array_sum($nuts), "\\n";`,
          out: "10 24 16 40\n0,1,3,4\n0,1,2,3\n48",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `<?php
$a = ["x", "y"];
$a[] = "z";
echo count($a), $a[2];`, options: ["3z", "2z", "3y", "z3"], answer: "3z", why: "$a[] = adds at the next index, 2, so there are three items and $a[2] is z." },
        { kind: "output", q: "What does this print?", code: `<?php
$ages = ["Hazel" => 3, "Acorn" => 1];
$ages["Hazel"]++;
echo $ages["Hazel"] + $ages["Acorn"];`, options: ["5", "4", "31", "HazelAcorn"], answer: "5", why: "Hazel goes from 3 to 4, and 4 + 1 is 5." },
        { q: "What does array_filter do with the keys of the items it keeps?", options: ["Keeps the original keys", "Renumbers them from 0", "Removes all keys", "Sorts them"], answer: "Keeps the original keys", why: "That is why the lesson uses array_values when it wants a list numbered from 0 again." },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      summary: "Typed parameters, defaults, named arguments and closures.",
      sections: [
        {
          p: "<code>function</code> defines a function. Parameters can have types and a default value, and <code>: int</code> after the brackets gives the return type. With <code>declare(strict_types=1);</code> at the top of the file, passing the wrong type is an error instead of a silent conversion. <b>Named arguments</b> let you pass values by name, in any order.",
          code: `<?php
declare(strict_types=1);

function share(int $nuts, int $squirrels = 2): int {
    return intdiv($nuts, $squirrels);
}

echo share(10), "\\n";
echo share(10, 3), "\\n";
echo share(squirrels: 5, nuts: 20), "\\n";`,
          out: "5\n3\n4",
        },
        {
          h: "Closures",
          p: "A function can be a value stored in a variable. An anonymous <code>function</code> must list outside variables it wants with <code>use</code>; an arrow function <code>fn</code> sees them automatically. Either kind can be passed to another function.",
          code: `<?php
$bonus = 3;
$addBonus = function ($n) use ($bonus) {
    return $n + $bonus;
};
$triple = fn($n) => $n * 3;

function twice(callable $f, int $x): int {
    return $f($f($x));
}

echo $addBonus(4), "\\n";
echo twice($triple, 2), "\\n";
echo twice($addBonus, 0), "\\n";`,
          out: "7\n18\n6",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `<?php
function greet(string $name, string $greeting = "Hello"): string {
    return "$greeting, $name";
}
echo greet("Hazel"), "\\n";
echo greet(greeting: "Hi", name: "Acorn");`, options: ["Hello, Hazel\nHi, Acorn", "Hello, Hazel\nAcorn, Hi", "Hazel, Hello\nHi, Acorn", "Hello, Hazel\nHello, Acorn"], answer: "Hello, Hazel\nHi, Acorn", why: "The first call uses the default greeting. The second names both arguments, so the order doesn't matter." },
        { kind: "output", q: "What does this print?", code: `<?php
$n = 10;
$f = fn($x) => $x + $n;
$n = 100;
echo $f(1);`, options: ["11", "101", "1", "110"], answer: "11", why: "An arrow function copies the outside value when it is created. Changing $n later doesn't affect it." },
      ],
    },
    {
      id: "classes",
      title: "Classes and enums",
      summary: "Constructor promotion, readonly properties, interfaces and enums.",
      sections: [
        {
          p: "A class groups data (properties) with the functions that work on it (methods). <code>-&gt;</code> reaches a property or calls a method on an object, and <code>$this</code> is the object the method was called on. Writing <code>private int $nuts = 0</code> in the constructor's brackets declares the property and sets it in one go; this is called <b>constructor promotion</b>. A <code>readonly</code> property can be set once and never changed.",
          code: `<?php
class Squirrel {
    public function __construct(
        public readonly string $name,
        private int $nuts = 0,
    ) {}

    public function gather(int $found): void {
        $this->nuts += $found;
    }

    public function report(): string {
        return "{$this->name} has {$this->nuts}";
    }
}

$s = new Squirrel("Hazel");
$s->gather(3);
$s->gather(4);
echo $s->report(), "\\n";
echo $s->name, "\\n";`,
          out: "Hazel has 7\nHazel",
        },
        {
          h: "Interfaces",
          p: "An interface lists methods a class promises to have. Code that takes the interface type works with any class that <code>implements</code> it, and each class answers in its own way.",
          code: `<?php
interface Animal {
    public function sound(): string;
}

class Squirrel implements Animal {
    public function sound(): string { return "chitter"; }
}

class Owl implements Animal {
    public function sound(): string { return "hoo"; }
}

function chorus(Animal ...$animals): string {
    return implode(" ", array_map(fn(Animal $a) => $a->sound(), $animals));
}

echo chorus(new Squirrel(), new Owl(), new Squirrel()), "\\n";`,
          out: "chitter hoo chitter",
        },
        {
          h: "Enums",
          p: "An <code>enum</code> is a type with a fixed set of cases. A <b>backed</b> enum gives each case a string or int value, and <code>from</code> turns a value back into its case. Enums can have methods, and <code>match</code> on an enum reads well.",
          code: `<?php
enum Season: string {
    case Spring = "spring";
    case Autumn = "autumn";

    public function job(): string {
        return match ($this) {
            Season::Spring => "find new shoots",
            Season::Autumn => "bury nuts",
        };
    }
}

$s = Season::from("autumn");
echo $s->name, "\\n";
echo $s->value, "\\n";
echo $s->job(), "\\n";`,
          out: "Autumn\nautumn\nbury nuts",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `<?php
class Counter {
    private int $count = 0;
    public function tick(): static {
        $this->count++;
        return $this;
    }
    public function value(): int { return $this->count; }
}
echo (new Counter())->tick()->tick()->tick()->value();`, options: ["3", "1", "0", "Counter"], answer: "3", why: "tick returns the same object, so the calls chain. Three ticks make the count 3." },
        { q: "What happens when code tries to change a readonly property after the constructor set it?", options: ["PHP throws an Error", "The change is ignored", "It works like any property", "The property becomes null"], answer: "PHP throws an Error", why: "readonly means one assignment only. A second one stops the script with an Error unless it is caught." },
      ],
    },
    {
      id: "web",
      title: "Safe output for the web",
      summary: "htmlspecialchars, json_encode and printf.",
      sections: [
        {
          p: "On a web page, text a visitor typed must never be printed straight into HTML, or a name like <code>&lt;script&gt;</code> becomes code in everyone else's browser. <code>htmlspecialchars</code> turns the special characters into HTML entities so they show as text. This one habit stops a whole family of attacks.",
          code: `<?php
$typed = '<b>Hazel</b> & "friends"';
echo htmlspecialchars($typed), "\\n";`,
          out: "&lt;b&gt;Hazel&lt;/b&gt; &amp; &quot;friends&quot;",
        },
        {
          h: "JSON and printf",
          p: "<code>json_encode</code> turns arrays into JSON, the format web apps send back and forth: lists become <code>[...]</code> and key–value arrays become <code>{...}</code>. <code>printf</code> fills a template: <code>%s</code> for a string, <code>%d</code> for a whole number, <code>%.2f</code> for a number with two decimals, and <code>%5d</code> pads to five places.",
          code: `<?php
echo json_encode(["name" => "Hazel", "nuts" => [3, 4]]), "\\n";
echo json_encode(["oak", "ash"]), "\\n";
printf("%s paid %.2f for %d nuts\\n", "Acorn", 1.5, 6);
printf("[%5d]\\n", 42);`,
          out: "{\"name\":\"Hazel\",\"nuts\":[3,4]}\n[\"oak\",\"ash\"]\nAcorn paid 1.50 for 6 nuts\n[   42]",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `<?php
echo htmlspecialchars("1 < 2");`, options: ["1 &lt; 2", "1 < 2", "1 &gt; 2", "1 &amp;lt; 2"], answer: "1 &lt; 2", why: "< becomes &lt;, which a browser shows as < without treating it as the start of a tag." },
        { kind: "output", q: "What does this print?", code: `<?php
printf("%.1f|%3d", 2.26, 7);`, options: ["2.3|  7", "2.26|7", "2.2|7  ", "2|  7"], answer: "2.3|  7", why: "%.1f rounds to one decimal place, and %3d pads 7 on the left to three characters." },
      ],
    },
  ],
};
