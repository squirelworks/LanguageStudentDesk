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
    "string", "bool", "array", "use", "try", "catch", "finally", "throw", "extends", "parent", "final",
  ],
  builtins: ["count", "strlen", "strtoupper", "implode", "explode", "array_map", "array_filter", "array_sum", "sort", "ksort", "arsort", "printf", "sprintf", "json_encode", "json_decode", "htmlspecialchars", "var_dump", "str_repeat", "substr", "strpos", "str_replace", "str_contains", "file_get_contents", "file_put_contents", "file", "preg_split"],
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
    {
      id: "errors",
      title: "Errors and exceptions",
      summary: "try, catch, finally, and your own Exception subclasses.",
      sections: [
        {
          p: "When something goes wrong, PHP <b>throws</b> an exception and the script stops unless a <code>try</code> block catches it. Catch the most specific type first: <code>InvalidArgumentException</code> before the general <code>Exception</code>. A <code>finally</code> block runs whether or not anything was thrown, which is useful for cleanup that must always happen.",
          code: `<?php
function take(int $stored, int $asked): int {
    if ($asked < 0) {
        throw new InvalidArgumentException("asked must be non-negative");
    }
    if ($asked > $stored) {
        throw new Exception("asked for $asked, only $stored stored");
    }
    return $stored - $asked;
}

foreach ([3, 12, -1] as $asked) {
    try {
        $left = take(10, $asked);
        echo "left: $left\\n";
    } catch (InvalidArgumentException $e) {
        echo "bad input: ", $e->getMessage(), "\\n";
    } catch (Exception $e) {
        echo "refused: ", $e->getMessage(), "\\n";
    } finally {
        echo "checked $asked\\n";
    }
}`,
          out: "left: 7\nchecked 3\nrefused: asked for 12, only 10 stored\nchecked 12\nbad input: asked must be non-negative\nchecked -1",
        },
        {
          h: "Your own exceptions",
          p: "A class that <code>extends Exception</code> can carry extra fields, and <code>instanceof</code> (or a typed <code>catch</code>) tells your failures apart from everyone else's. Call <code>parent::__construct</code> so the message and stack trace are set up properly.",
          code: `<?php
class StashFullError extends Exception {
    public function __construct(public readonly int $limit) {
        parent::__construct("the stash holds at most $limit nuts");
    }
}

function store(array &$stash, string $nut, int $limit = 2): void {
    if (count($stash) >= $limit) {
        throw new StashFullError($limit);
    }
    $stash[] = $nut;
}

$stash = [];
try {
    store($stash, "acorn");
    store($stash, "walnut");
    store($stash, "pecan");
} catch (StashFullError $e) {
    echo $e::class, " ", $e->limit, " ", $e->getMessage(), "\\n";
}
echo implode(", ", $stash), "\\n";`,
          out: "StashFullError 2 the stash holds at most 2 nuts\nacorn, walnut",
        },
        {
          h: "finally for cleanup",
          p: "PHP has no try-with-resources, but <code>finally</code> is the usual place to close what you opened. It runs even when the <code>try</code> throws, so a later <code>catch</code> still sees a tidy state.",
          code: `<?php
function dig(string $spot): void {
    echo "open $spot\\n";
    try {
        if ($spot === "south") {
            throw new RuntimeException("roof fell in");
        }
        echo "working\\n";
    } finally {
        echo "close $spot\\n";
    }
}

try {
    dig("north");
    dig("south");
} catch (RuntimeException $e) {
    echo "caught: ", $e->getMessage(), "\\n";
}`,
          out: "open north\nworking\nclose north\nopen south\nclose south\ncaught: roof fell in",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `<?php
try {
    echo "a\\n";
    throw new Exception("x");
    echo "b\\n";
} catch (Exception $e) {
    echo "c\\n";
} finally {
    echo "d\\n";
}`, options: ["a\nc\nd", "a\nb\nc\nd", "a\nc", "c\nd"], answer: "a\nc\nd", why: "The throw skips b; the catch runs, then finally always runs." },
        { kind: "output", q: "What does this print?", code: `<?php
class Oops extends Exception {}
try {
    throw new Oops("late");
} catch (Oops $e) {
    echo $e instanceof Exception ? "yes" : "no";
}`, options: ["yes", "no", "Oops", "late"], answer: "yes", why: "An Oops is also an Exception, because Oops extends Exception." },
        { q: "Why catch InvalidArgumentException before Exception?", options: ["The first matching catch wins, so the specific type must come first", "PHP requires alphabetical order", "Exception cannot be caught at all", "finally only runs for the first catch"], answer: "The first matching catch wins, so the specific type must come first", why: "InvalidArgumentException is a subclass of Exception, so a bare catch (Exception) would swallow it first." },
      ],
    },
    {
      id: "strings",
      title: "Strings in depth",
      summary: "substr, strpos, explode/implode, sprintf and replace.",
      sections: [
        {
          p: "Beyond joining with <code>.</code>, PHP has a long list of string functions. <code>substr</code> cuts a piece (a negative start counts from the end), <code>strpos</code> finds a substring and returns <code>false</code> when it is missing — compare with <code>===</code>, because position <code>0</code> is also falsy. <code>explode</code> splits and <code>implode</code> joins; <code>sprintf</code> fills a template the same way <code>printf</code> does, but returns the string.",
          code: `<?php
$s = "hazelnut stash";
echo substr($s, 0, 5), " ", substr($s, -5), "\\n";
echo strpos($s, "nut"), " ", (strpos($s, "oak") === false ? "missing" : "found"), "\\n";
echo implode("-", explode(" ", $s)), "\\n";
echo sprintf("%-9s %3d %.1f%%", "acorn", 12, 66.666), "\\n";
echo str_replace("nut", "seed", $s), "\\n";`,
          out: "hazel stash\n5 missing\nhazelnut-stash\nacorn      12 66.7%\nhazelseed stash",
        },
        {
          h: "Splitting carefully and ignoring case",
          p: "<code>preg_split</code> splits on a regular expression, which is handy when the separators have uneven spaces. <code>str_ireplace</code> replaces without caring about case, and <code>array_reverse</code> flips a list before you join it back.",
          code: `<?php
$csv = "acorn, walnut, pecan ,  hazelnut";
$nuts = preg_split('/\\s*,\\s*/', $csv);
echo implode(" | ", array_reverse($nuts)), "\\n";
echo sprintf("[%04d] %s", 7, strtoupper("ok")), "\\n";
$note = "Oak oak OAK";
echo str_ireplace("oak", "elm", $note), "\\n";`,
          out: "hazelnut | pecan | walnut | acorn\n[0007] OK\nelm elm elm",
        },
        {
          h: "Trimming and measuring",
          p: "<code>trim</code> strips spaces from both ends, <code>strlen</code> counts bytes (fine for plain ASCII), and <code>str_contains</code> is the clear yes/no test for a substring when you don't need the position.",
          code: `<?php
$line = "  up   the   tree ";
$words = preg_split('/\\s+/', trim($line));
echo count($words), ": ", implode("|", $words), "\\n";
echo strlen("squirrel"), " ", (str_contains("squirrel", "quir") ? "yes" : "no"), "\\n";`,
          out: "3: up|the|tree\n8 yes",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `<?php
echo substr("abcdef", 2, 3), "|", substr("abcdef", -2);`, options: ["cde|ef", "cd|ef", "cdef|ef", "cde|f"], answer: "cde|ef", why: "From index 2, take 3 characters for cde; -2 takes the last two." },
        { kind: "output", q: "What does this print?", code: `<?php
$p = strpos("acorn", "a");
echo ($p ? "yes" : "no"), "|", ($p === false ? "missing" : $p);`, options: ["no|0", "yes|0", "no|missing", "yes|true"], answer: "no|0", why: "Position 0 is found, but 0 is falsy, so ? treats it as no. === false is the reliable test." },
        { kind: "output", q: "What does this print?", code: `<?php
echo implode(":", explode("-", "a-b-c"));`, options: ["a:b:c", "a-b-c", "abc", "a:b-c"], answer: "a:b:c", why: "explode cuts on -, implode glues with :." },
      ],
    },
    {
      id: "files",
      title: "Reading and writing files",
      summary: "file_get_contents, file_put_contents, file() and JSON on disk.",
      sections: [
        {
          p: "The simplest way to work with a whole file is <code>file_put_contents</code> to write and <code>file_get_contents</code> to read. <code>file</code> returns the lines as an array; <code>FILE_IGNORE_NEW_LINES</code> drops the trailing newlines. Paths are relative to the current working directory.",
          code: `<?php
file_put_contents("stash.txt", "acorn 6\\nhazelnut 2\\nwalnut 1\\n");
$text = file_get_contents("stash.txt");
echo "bytes: ", strlen($text), "\\n";
foreach (file("stash.txt", FILE_IGNORE_NEW_LINES) as $line) {
    [$nut, $n] = explode(" ", $line);
    echo "$nut => $n\\n";
}
copy("stash.txt", "backup.txt");
echo is_file("backup.txt") ? "backup ready\\n" : "missing\\n";`,
          out: "bytes: 28\nacorn => 6\nhazelnut => 2\nwalnut => 1\nbackup ready",
        },
        {
          h: "Appending and testing",
          p: "Pass <code>FILE_APPEND</code> to add to the end instead of replacing. <code>file_exists</code> asks whether a path is there at all; <code>is_file</code> asks specifically for a regular file.",
          code: `<?php
file_put_contents("log.txt", "day 1: found 3\\n");
file_put_contents("log.txt", "day 2: found 5\\n", FILE_APPEND);
echo file_get_contents("log.txt");
echo file_exists("nope.txt") ? "yes" : "no", "\\n";`,
          out: "day 1: found 3\nday 2: found 5\nno",
        },
        {
          h: "JSON on disk",
          p: "Web apps often store structured data as JSON. Encode an array, write the file, then <code>json_decode(..., true)</code> to get an associative array back.",
          code: `<?php
$data = ["name" => "Hazel", "nuts" => ["acorn" => 4, "walnut" => 2]];
file_put_contents("hazel.json", json_encode($data));
$back = json_decode(file_get_contents("hazel.json"), true);
echo $back["name"], " total ", array_sum($back["nuts"]), "\\n";`,
          out: "Hazel total 6",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `<?php
file_put_contents("n.txt", "a\\nb\\n");
echo count(file("n.txt", FILE_IGNORE_NEW_LINES));`, options: ["2", "3", "1", "0"], answer: "2", why: "Two lines, a and b; FILE_IGNORE_NEW_LINES only strips the newlines, it doesn't drop empty trailing pieces here." },
        { kind: "output", q: "What does this print?", code: `<?php
file_put_contents("t.txt", "x");
file_put_contents("t.txt", "y", FILE_APPEND);
echo file_get_contents("t.txt");`, options: ["xy", "y", "x", "yx"], answer: "xy", why: "FILE_APPEND adds y after the existing x." },
        { q: "What does json_decode($text, true) return for a JSON object?", options: ["An associative array", "A stdClass object", "A string", "null always"], answer: "An associative array", why: "The second argument true asks for arrays instead of objects." },
      ],
    },
    {
      id: "project",
      title: "Project: a tagged nut inventory",
      summary: "Enums, classes and match build a small event-sourced stash.",
      sections: [
        {
          p: "An inventory is built by replaying a list of events. Each event holds a kind string, a backed <code>NutKind</code> enum and a count. Applying an event either updates the stock or returns an error string — a tiny tagged-union style, without throwing. A gift that asks for more walnuts than you have is skipped and reported; the rest become a sorted table.",
          code: `<?php
enum NutKind: string {
    case Acorn = "acorn";
    case Walnut = "walnut";
    case Hazelnut = "hazelnut";
}

final class InventoryEvent {
    public function __construct(
        public readonly string $kind,
        public readonly NutKind $nut,
        public readonly int $count,
        public readonly ?string $to = null,
    ) {}
}

final class Inventory {
    /** @var array<string, int> */
    private array $stock;

    public function __construct() {
        $this->stock = array_fill_keys(
            array_map(fn(NutKind $n) => $n->value, NutKind::cases()),
            0,
        );
    }

    public function apply(InventoryEvent $e): ?string {
        $key = $e->nut->value;
        if ($e->kind === "found") {
            $this->stock[$key] += $e->count;
            return null;
        }
        if ($this->stock[$key] < $e->count) {
            return "cannot {$e->kind} {$e->count} $key: only {$this->stock[$key]}";
        }
        $this->stock[$key] -= $e->count;
        return null;
    }

    public function report(): void {
        $rows = $this->stock;
        arsort($rows);
        foreach ($rows as $nut => $n) {
            printf("%-9s %2d\\n", $nut, $n);
        }
    }
}

$events = [
    new InventoryEvent("found", NutKind::Acorn, 8),
    new InventoryEvent("found", NutKind::Walnut, 3),
    new InventoryEvent("ate", NutKind::Acorn, 2),
    new InventoryEvent("gift", NutKind::Walnut, 5, "Pip"),
    new InventoryEvent("found", NutKind::Hazelnut, 4),
    new InventoryEvent("gift", NutKind::Acorn, 1, "Pip"),
];

$inv = new Inventory();
$gifts = [];
foreach ($events as $e) {
    $err = $inv->apply($e);
    if ($err !== null) {
        echo "skipped: $err\\n";
        continue;
    }
    if ($e->kind === "gift") {
        $gifts[$e->to] = true;
    }
}
$inv->report();
echo "gifts to: ", implode(", ", array_keys($gifts)), "\\n";`,
          out: "skipped: cannot gift 5 walnut: only 3\nacorn      5\nhazelnut   4\nwalnut     3\ngifts to: Pip",
        },
        {
          h: "Ideas to try",
          p: "Turn the kind string into its own enum and <code>match</code> on it, read the events from a JSON file with <code>file_get_contents</code>, or keep a history of every stock along the way.",
        },
      ],
      practice: [
        { q: "Why does apply return ?string instead of throwing?", options: ["So a bad event can be skipped and reported without stopping the whole replay", "PHP cannot throw inside a class", "null means success only for enums", "Strings are faster than exceptions"], answer: "So a bad event can be skipped and reported without stopping the whole replay", why: "Returning an error value keeps the loop in charge, the same idea as a Result type." },
        { kind: "output", q: "What does this print?", code: `<?php
enum Nut: string { case A = "acorn"; case W = "walnut"; }
$stock = array_fill_keys(array_map(fn(Nut $n) => $n->value, Nut::cases()), 0);
$stock["acorn"] += 3;
echo implode(",", array_keys($stock)), " ", $stock["acorn"];`, options: ["acorn,walnut 3", "A,W 3", "acorn 3", "0,0 3"], answer: "acorn,walnut 3", why: "cases() gives both enums, value is the backing string, and acorn is then increased." },
        { q: "What does arsort do before the report prints?", options: ["Sorts the stock by count, largest first, keeping the nut names as keys", "Sorts the nut names alphabetically", "Removes zero counts", "Converts the array to a list"], answer: "Sorts the stock by count, largest first, keeping the nut names as keys", why: "arsort is a reverse sort by value that preserves keys." },
      ],
    },
  ],
};
