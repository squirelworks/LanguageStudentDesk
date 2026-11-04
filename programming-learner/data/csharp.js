// C# course for the Programming Learner. Written for this project.
// Examples are complete C# 12 programs. tools/run_csharp.py compiles them with
// the .NET SDK's compiler and checks the printed output.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.csharp = {
  id: "csharp",
  name: "C#",
  title: "C# from the first line",
  intro:
    "C# (said \"C sharp\") is Microsoft's main language, released in 2000 with the .NET platform. It looks like Java and C++, but it has grown quickly: properties, LINQ queries, async code, records and pattern matching all arrived in C# before most of its neighbours. It runs Windows desktop programs, web services on any system, and games made with the Unity engine. Modern C# lets a program start straight away with <b>top-level statements</b>, without the class and <code>Main</code> wrapper older examples have. These lessons use C# 12 on .NET 8. Every example is a whole program and shows exactly what it prints. To run one yourself, install the .NET SDK, type <code>dotnet new console -o hello</code>, paste the example into <code>hello/Program.cs</code> and type <code>dotnet run --project hello</code>.",
  comment: "//",
  keywords: [
    "var", "int", "double", "decimal", "bool", "char", "string", "void", "const", "new", "return", "if", "else", "switch", "case",
    "default", "for", "foreach", "in", "while", "class", "record", "struct", "interface", "public", "private", "static", "readonly",
    "get", "set", "init", "this", "null", "true", "false", "using", "async", "await", "is", "and", "or", "not", "when", "override",
  ],
  builtins: ["Console", "WriteLine", "Write", "Math", "List", "Dictionary", "Task", "Where", "Select", "OrderBy", "Sum", "ToList", "string"],
  lessons: [
    {
      id: "first",
      title: "Your first program",
      summary: "Top-level statements, Console.WriteLine and interpolated strings.",
      sections: [
        {
          p: "A C# program can start with statements at the top of the file; the compiler wraps them in a <code>Main</code> method for you. <code>Console.WriteLine</code> prints a line and <code>Console.Write</code> prints without ending it. Statements end with a semicolon.",
          code: `Console.WriteLine("Hello, squirrel!");
Console.Write("Nuts: ");
Console.WriteLine(42);`,
          out: "Hello, squirrel!\nNuts: 42",
        },
        {
          h: "Interpolated strings",
          p: "A string with a <code>$</code> in front can hold expressions in braces, which are worked out and put in place. After a colon you can give a format: <code>{price:F2}</code> shows two decimals and <code>{n,4}</code> pads to four characters. A string with <code>@</code> in front keeps backslashes as they are, which suits Windows paths.",
          code: `string name = "Hazel";
int nuts = 7;
double price = 1.5;
Console.WriteLine($"{name} has {nuts} nuts");
Console.WriteLine($"{nuts * 2} after a good day");
Console.WriteLine($"Cost: {price:F2} [{nuts,4}]");
Console.WriteLine(@"C:\\Stash\\nuts.txt");`,
          out: "Hazel has 7 nuts\n14 after a good day\nCost: 1.50 [   7]\nC:\\Stash\\nuts.txt",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `Console.Write("Up");
Console.Write(" the");
Console.WriteLine(" tree");`, options: ["Up the tree", "Up\n the\n tree", "Upthetree", "Up the\ntree"], answer: "Up the tree", why: "Write doesn't end the line, so all three pieces land on one line." },
        { kind: "output", q: "What does this print?", code: `int a = 3, b = 4;
Console.WriteLine($"{a} + {b} = {a + b}");
Console.WriteLine("{a} + {b}");`, options: ["3 + 4 = 7\n{a} + {b}", "3 + 4 = 7\n3 + 4", "{a} + {b} = {a + b}\n{a} + {b}", "7\n{a} + {b}"], answer: "3 + 4 = 7\n{a} + {b}", why: "Only the string with $ in front fills in the braces. The second is plain text." },
      ],
    },
    {
      id: "values",
      title: "Types and variables",
      summary: "int, double, decimal, bool, string, var and null.",
      sections: [
        {
          p: "Every variable has a type. <code>int</code> holds whole numbers, <code>double</code> numbers with a fraction, <code>decimal</code> exact decimal amounts such as money, <code>bool</code> true or false, <code>char</code> one character and <code>string</code> text. <code>var</code> lets the compiler take the type from the value. Dividing two ints drops the fraction. A <code>double</code> can't hold 0.1 exactly, which is why sums of money use <code>decimal</code> (numbers written with an <code>m</code>).",
          code: `int nuts = 17;
var squirrels = 5;
Console.WriteLine(nuts / squirrels);
Console.WriteLine(nuts % squirrels);
Console.WriteLine(nuts / 5.0);
Console.WriteLine(0.1 + 0.2 == 0.3);
Console.WriteLine(0.1m + 0.2m == 0.3m);`,
          out: "3\n2\n3.4\nFalse\nTrue",
        },
        {
          h: "Strings",
          p: "Strings have methods and properties: <code>Length</code>, <code>ToUpper()</code>, <code>Contains</code>, <code>Replace</code>, and <code>[i]</code> for one character counting from 0. In C#, <code>==</code> on strings compares the text, so it does what you would expect. Strings can't be changed; each method returns a new one.",
          code: `string tree = "Silver birch";
Console.WriteLine(tree.Length);
Console.WriteLine(tree.ToUpper());
Console.WriteLine(tree[0]);
Console.WriteLine(tree.Contains("birch"));
Console.WriteLine(tree.Replace("Silver", "Downy"));
Console.WriteLine(tree == "Silver " + "birch");`,
          out: "12\nSILVER BIRCH\nS\nTrue\nDowny birch\nTrue",
        },
        {
          h: "null",
          p: "<code>null</code> means no object. With nullable checks turned on (the default in new projects), a <code>string</code> can't be null, but a <code>string?</code> can, and the compiler warns you before you use one without checking. <code>?.</code> calls a method only if the value isn't null, and <code>??</code> gives a fallback.",
          code: `string? favourite = null;
Console.WriteLine(favourite?.Length);
Console.WriteLine(favourite ?? "no favourite yet");
favourite = "hazelnut";
Console.WriteLine(favourite?.Length);`,
          out: "\nno favourite yet\n8",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `Console.WriteLine(7 / 2);
Console.WriteLine(7 / 2.0);
Console.WriteLine(7 % 2);`, options: ["3\n3.5\n1", "3.5\n3.5\n1", "3\n3\n1", "4\n3.5\n1"], answer: "3\n3.5\n1", why: "7 / 2 is integer division. Once one side is a double, the result has a fraction. % is the remainder." },
        { kind: "output", q: "What does this print?", code: `string s = "acorn";
Console.WriteLine(s[1] + "" + s.Length);
Console.WriteLine(s.ToUpper() == "ACORN");`, options: ["c5\nTrue", "a5\nTrue", "c5\nFalse", "c6\nTrue"], answer: "c5\nTrue", why: "Index 1 is the second character. == compares the text of the two strings." },
        { q: "Which type should hold a price like 19.99?", options: ["decimal", "double", "int", "float"], answer: "decimal", why: "decimal stores decimal fractions exactly. double and float use binary fractions, so 0.1 + 0.2 isn't exactly 0.3." },
      ],
    },
    {
      id: "control",
      title: "Decisions and loops",
      summary: "if, switch expressions with patterns, for, foreach and while.",
      sections: [
        {
          p: "<code>if</code> and <code>else</code> take a condition in brackets; <code>&amp;&amp;</code> is and, <code>||</code> is or and <code>!</code> is not. A <b>switch expression</b> picks a value by matching <b>patterns</b>: an exact value, a comparison like <code>&lt; 5</code>, or several joined with <code>and</code> and <code>or</code>. <code>_</code> matches anything else.",
          code: `int nuts = 12;
if (nuts > 20)
{
    Console.WriteLine("feast");
}
else if (nuts > 10 && nuts % 2 == 0)
{
    Console.WriteLine("even dozen-ish");
}

string Describe(int n) => n switch
{
    0 => "none",
    < 5 => "a few",
    >= 5 and < 20 => "plenty",
    _ => "a hoard",
};
Console.WriteLine(Describe(0) + ", " + Describe(3) + ", " + Describe(12) + ", " + Describe(50));`,
          out: "even dozen-ish\nnone, a few, plenty, a hoard",
        },
        {
          h: "Loops",
          p: "<code>for</code> has a start, a test and a step. <code>foreach</code> visits every item in an array or list. <code>while</code> repeats as long as its condition holds. <code>break</code> leaves a loop and <code>continue</code> skips to the next pass.",
          code: `for (int i = 1; i <= 5; i++)
{
    if (i == 3) continue;
    Console.Write(i + " ");
}
Console.WriteLine();
int[] stash = { 4, 9, 2 };
int total = 0;
foreach (int n in stash)
{
    total += n;
}
Console.WriteLine(total);
int height = 1;
while (height < 20) height *= 3;
Console.WriteLine(height);`,
          out: "1 2 4 5 \n15\n27",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `string Season(int month) => month switch
{
    12 or 1 or 2 => "winter",
    >= 9 and <= 11 => "autumn",
    _ => "other",
};
Console.WriteLine(Season(10) + " " + Season(1) + " " + Season(5));`, options: ["autumn winter other", "other winter other", "autumn other other", "autumn winter autumn"], answer: "autumn winter other", why: "10 falls in 9 to 11, 1 is listed with the winter months, and 5 matches only the _ case." },
        { kind: "output", q: "What does this print?", code: `int count = 0;
for (int i = 0; i < 10; i += 4)
{
    count++;
}
Console.WriteLine(count);`, options: ["3", "2", "4", "10"], answer: "3", why: "i is 0, 4 and 8, then 12 fails the test." },
      ],
    },
    {
      id: "methods",
      title: "Methods and collections",
      summary: "Methods, out and named arguments, List and Dictionary.",
      sections: [
        {
          p: "A method has a return type, a name and typed parameters. In a program with top-level statements you can write methods right there, among the statements. Parameters can have default values, and callers can pass arguments by name. A method that has nothing to return uses <code>void</code>. A one-line method can use <code>=&gt;</code> instead of braces.",
          code: `int Share(int nuts, int squirrels = 2) => nuts / squirrels;

void Report(string who, int nuts)
{
    Console.WriteLine($"{who}: {nuts}");
}

Report("Hazel", Share(10));
Report("Acorn", Share(10, 3));
Report(nuts: Share(squirrels: 5, nuts: 20), who: "Pip");`,
          out: "Hazel: 5\nAcorn: 3\nPip: 4",
        },
        {
          h: "List and Dictionary",
          p: "<code>List&lt;T&gt;</code> is a list that grows as you <code>Add</code>; <code>Count</code> gives its size and <code>[i]</code> reads by index. <code>Dictionary&lt;TKey, TValue&gt;</code> stores values under keys. <code>TryGetValue</code> looks a key up without failing when it is missing. A <b>collection expression</b> like <code>[3, 1, 2]</code> fills a collection in one go.",
          code: `List<string> trees = ["oak", "ash"];
trees.Add("hazel");
trees.Insert(0, "beech");
Console.WriteLine($"{trees.Count} {trees[0]} {string.Join(",", trees)}");

var stash = new Dictionary<string, int> { ["oak"] = 4, ["hazel"] = 9 };
stash["oak"] += 1;
stash["beech"] = 2;
Console.WriteLine(stash["oak"]);
Console.WriteLine(stash.TryGetValue("pine", out int pine) ? pine : -1);
Console.WriteLine(stash.ContainsKey("beech"));`,
          out: "4 beech beech,oak,ash,hazel\n5\n-1\nTrue",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `int Twice(int x) => x * 2;
Console.WriteLine(Twice(Twice(3)));`, options: ["12", "6", "9", "33"], answer: "12", why: "The inner call gives 6 and the outer one doubles it again." },
        { kind: "output", q: "What does this print?", code: `List<int> a = [1, 2, 3];
List<int> b = a;
b.Add(4);
Console.WriteLine(a.Count);`, options: ["4", "3", "1", "7"], answer: "4", why: "A List is an object. b = a copies the reference, so both names point at the same list." },
      ],
    },
    {
      id: "classes",
      title: "Classes, records and interfaces",
      summary: "Properties, constructors, records, interfaces and inheritance.",
      sections: [
        {
          p: "A class describes a kind of object. C# uses <b>properties</b>, which look like fields from outside but can control who may change them: <code>{ get; private set; }</code> can be read by anyone and changed only inside the class. A <b>primary constructor</b>, written in brackets after the class name, gives the class its constructor parameters directly.",
          code: `var s = new Squirrel("Hazel");
s.Gather(3);
s.Gather(4);
Console.WriteLine($"{s.Name} has {s.Nuts}");

class Squirrel(string name)
{
    public string Name { get; } = name;
    public int Nuts { get; private set; }

    public void Gather(int found) => Nuts += found;
}`,
          out: "Hazel has 7",
        },
        {
          h: "Records",
          p: "A <code>record</code> is a type for plain data. One line gives you a constructor, read-only properties, equality that compares the values, and a readable <code>ToString</code>. <code>with</code> makes a copy with some values changed.",
          code: `var a = new Nut("hazel", 3);
var b = new Nut("hazel", 3);
Console.WriteLine(a);
Console.WriteLine(a == b);
var bigger = a with { Grams = 5 };
Console.WriteLine(bigger);

record Nut(string Kind, int Grams);`,
          out: "Nut { Kind = hazel, Grams = 3 }\nTrue\nNut { Kind = hazel, Grams = 5 }",
        },
        {
          h: "Interfaces and inheritance",
          p: "An <code>interface</code> lists members a type promises to have, and code can work with any type that implements it. A class can also <b>inherit</b> from one base class; an <code>abstract</code> member has no body in the base and must be supplied with <code>override</code>. The right version is chosen when the program runs.",
          code: `List<IAnimal> wood = [new Squirrel(), new Owl(), new Squirrel()];
foreach (var a in wood) Console.Write(a.Sound() + " ");
Console.WriteLine();
Console.WriteLine(new Owl().Describe());

interface IAnimal
{
    string Sound();
}

abstract class Animal : IAnimal
{
    public abstract string Sound();
    public string Describe() => $"{GetType().Name} says {Sound()}";
}

class Squirrel : Animal
{
    public override string Sound() => "chitter";
}

class Owl : Animal
{
    public override string Sound() => "hoo";
}`,
          out: "chitter hoo chitter \nOwl says hoo",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `var p = new Point(2, 5);
var q = p with { Y = 1 };
Console.WriteLine($"{p.X + p.Y} {q.Y} {p == q}");

record Point(int X, int Y);`, options: ["7 1 False", "7 5 True", "3 1 False", "7 1 True"], answer: "7 1 False", why: "with makes a new record and leaves p alone. The two now differ in Y, so == is False." },
        { q: "What does { get; private set; } on a property mean?", options: ["Anyone can read it; only the class can change it", "Nobody can change it", "Anyone can change it; only the class can read it", "It is a field, not a property"], answer: "Anyone can read it; only the class can change it", why: "Each accessor can have its own access level. This is the usual way to keep an object in charge of its own data." },
      ],
    },
    {
      id: "linq",
      title: "LINQ and async",
      summary: "Where, Select, OrderBy, GroupBy, and async methods with Task.",
      sections: [
        {
          p: "<b>LINQ</b> (Language-Integrated Query) adds query methods to every collection. <code>Where</code> keeps items that pass a test, <code>Select</code> changes each item, <code>OrderBy</code> sorts, and <code>Sum</code>, <code>Count</code> and <code>Max</code> boil a sequence down to one value. The tests are <b>lambdas</b>, small functions written <code>n =&gt; n * 2</code>.",
          code: `int[] nuts = [5, 12, 3, 8, 20];
var big = nuts.Where(n => n > 4).Select(n => n * 2).ToList();
Console.WriteLine(string.Join(" ", big));
Console.WriteLine(nuts.Sum() + " " + nuts.Max() + " " + nuts.Count(n => n % 2 == 0));
string[] trees = ["oak", "beech", "ash", "hazel"];
Console.WriteLine(string.Join(",", trees.OrderBy(t => t.Length).ThenBy(t => t)));`,
          out: "10 24 16 40\n48 20 3\nash,oak,beech,hazel",
        },
        {
          h: "Grouping",
          p: "<code>GroupBy</code> collects items that share a key. Each group has a <code>Key</code> and can be counted or summed like any sequence. LINQ works the same way on lists in memory and, through libraries like Entity Framework, on database tables.",
          code: `var stashes = new[]
{
    new { Nut = "acorn", Count = 12 },
    new { Nut = "hazelnut", Count = 5 },
    new { Nut = "acorn", Count = 3 },
};
foreach (var g in stashes.GroupBy(s => s.Nut).OrderBy(g => g.Key))
{
    Console.WriteLine($"{g.Key}: {g.Count()} stashes, {g.Sum(s => s.Count)} nuts");
}`,
          out: "acorn: 2 stashes, 15 nuts\nhazelnut: 1 stashes, 5 nuts",
        },
        {
          h: "async and await",
          p: "An <code>async</code> method returns a <code>Task</code>, or <code>Task&lt;T&gt;</code> when it produces a value. <code>await</code> waits for a task without blocking the thread, which keeps apps responsive while they wait for files or the network. <code>Task.WhenAll</code> waits for several at once. Top-level statements may use <code>await</code> directly.",
          code: `async Task<int> CountNutsAsync(string tree)
{
    await Task.Delay(10);
    return tree.Length;
}

int oak = await CountNutsAsync("oak");
int[] rest = await Task.WhenAll(CountNutsAsync("ash"), CountNutsAsync("hazel"));
Console.WriteLine(oak + rest.Sum());`,
          out: "11",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `string[] trees = ["oak", "ash", "elm", "beech"];
Console.WriteLine(trees.Count(t => t.Length == 3));
Console.WriteLine(trees.First(t => t.StartsWith("b")));`, options: ["3\nbeech", "4\nbeech", "3\nash", "1\nbeech"], answer: "3\nbeech", why: "oak, ash and elm have three letters, and beech is the first that starts with b." },
        { kind: "output", q: "What does this print?", code: `var evens = Enumerable.Range(1, 6).Where(n => n % 2 == 0).Select(n => n * n);
Console.WriteLine(string.Join("+", evens) + "=" + evens.Sum());`, options: ["4+16+36=56", "2+4+6=12", "1+4+9=14", "4+16+36=36"], answer: "4+16+36=56", why: "Range(1, 6) is 1 to 6. The even ones are 2, 4 and 6, and their squares add to 56." },
      ],
    },
    {
      id: "valueref",
      title: "Value types and reference types",
      summary: "struct versus class, and what = really copies.",
      sections: [
        {
          p: "C# has two kinds of types. A <b>value type</b> (<code>int</code>, <code>double</code>, <code>bool</code> and any <code>struct</code>) holds its data directly, so <code>=</code> copies the data. A <b>reference type</b> (any <code>class</code>, arrays, <code>string</code>) is reached through a reference, so <code>=</code> copies the reference and both names then point at the same object.",
          code: `var p1 = new PointS { X = 1 };
var p2 = p1;
p2.X = 99;
Console.WriteLine($"struct: {p1.X} {p2.X}");

var c1 = new PointC { X = 1 };
var c2 = c1;
c2.X = 99;
Console.WriteLine($"class:  {c1.X} {c2.X}");

struct PointS { public int X; }
class PointC { public int X; }`,
          out: "struct: 1 99\nclass:  99 99",
        },
        {
          h: "Passing to methods",
          p: "Arguments are copied in the same way. A method that gets a class object can change that object, but giving its parameter a new object does not affect the caller. Marking a parameter <code>ref</code> passes the caller's variable itself, so even a value type can be changed.",
          code: `int[] stash = [1, 2, 3];
AddNut(stash);
Console.WriteLine(string.Join(",", stash));
Replace(stash);
Console.WriteLine(string.Join(",", stash));

int count = 5;
Bump(count);
Console.WriteLine(count);
BumpRef(ref count);
Console.WriteLine(count);

static void AddNut(int[] a) => a[0] += 10;
static void Replace(int[] a) => a = [0, 0, 0];
static void Bump(int n) => n++;
static void BumpRef(ref int n) => n++;`,
          out: "11,2,3\n11,2,3\n5\n6",
        },
        {
          h: "Equality",
          p: "<code>==</code> on two class objects asks whether they are the <i>same object</i>. Records, structs and strings compare their contents instead. That is a good reason to use a <code>record</code> for plain data.",
          code: `var a = new Box(3);
var b = new Box(3);
Console.WriteLine(a == b);
Console.WriteLine(ReferenceEquals(a, a));

var r1 = new Crate(3);
var r2 = new Crate(3);
Console.WriteLine(r1 == r2);

string s1 = "oak";
string s2 = string.Concat("o", "ak");
Console.WriteLine(s1 == s2);

class Box(int n) { public int N { get; } = n; }
record Crate(int N);`,
          out: "False\nTrue\nTrue\nTrue",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `var a = new List<int> { 1 };
var b = a;
b.Add(2);
Console.WriteLine(a.Count);`, options: ["2", "1", "0", "3"], answer: "2", why: "List is a class, so a and b refer to the same list." },
        { kind: "output", q: "What does this print?", code: `var x = new Pair { A = 1 };
var y = x;
y.A = 5;
Console.WriteLine(x.A);

struct Pair { public int A; }`, options: ["1", "5", "0", "6"], answer: "1", why: "Pair is a struct, so y is an independent copy." },
        { q: "What does ref on a parameter do?", options: ["Passes the caller's variable itself, so the method can change it", "Makes the parameter read-only", "Copies the object deeply", "Turns a struct into a class"], answer: "Passes the caller's variable itself, so the method can change it", why: "Without ref the method gets a copy of the value (or of the reference)." },
      ],
    },
    {
      id: "errors",
      title: "Exceptions and null safety",
      summary: "try, catch, using, and the ?. and ?? operators.",
      sections: [
        {
          p: "When something goes wrong, .NET <b>throws</b> an exception, and it travels up through the callers until a <code>catch</code> handles it. Catch the specific type you expect, such as <code>FormatException</code> from <code>int.Parse</code>. A <code>finally</code> block runs whether or not anything was thrown. For input that is often bad, <code>int.TryParse</code> avoids exceptions altogether.",
          code: `foreach (var text in new[] { "12", "twelve" })
{
    try
    {
        int n = int.Parse(text);
        Console.WriteLine($"got {n}");
    }
    catch (FormatException)
    {
        Console.WriteLine($"'{text}' is not a number");
    }
    finally
    {
        Console.WriteLine("checked");
    }
}

if (int.TryParse("7", out int seven))
{
    Console.WriteLine(seven * 2);
}`,
          out: "got 12\nchecked\n'twelve' is not a number\nchecked\n14",
        },
        {
          h: "Throwing your own",
          p: "<code>throw</code> starts an exception. Pick a standard type that fits (<code>ArgumentException</code> for a bad argument, <code>InvalidOperationException</code> when the object is in the wrong state) and give a clear message. A <code>when</code> clause lets a <code>catch</code> handle only some cases.",
          code: `var store = new Store();
store.Add(5);
try
{
    store.Take(8);
}
catch (InvalidOperationException e) when (e.Message.Contains("only"))
{
    Console.WriteLine($"refused: {e.Message}");
}
try
{
    store.Add(-1);
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}

class Store
{
    int nuts;
    public void Add(int n)
    {
        if (n < 0) throw new ArgumentException("cannot add a negative number");
        nuts += n;
    }
    public void Take(int n)
    {
        if (n > nuts) throw new InvalidOperationException($"only {nuts} nuts stored");
        nuts -= n;
    }
}`,
          out: "refused: only 5 nuts stored\ncannot add a negative number",
        },
        {
          h: "using and IDisposable",
          p: "Objects that hold something outside .NET's memory, such as an open file or a network connection, implement <code>IDisposable</code>. A <code>using</code> declaration calls <code>Dispose</code> when the variable goes out of scope, even if an exception is thrown, so the resource is always released.",
          code: `try
{
    using var log = new Log("nuts.log");
    log.Write("buried 3");
    throw new Exception("owl!");
}
catch (Exception e)
{
    Console.WriteLine($"caught {e.Message}");
}

class Log(string name) : IDisposable
{
    public void Write(string line) => Console.WriteLine($"{name}: {line}");
    public void Dispose() => Console.WriteLine($"{name} closed");
}`,
          out: "nuts.log: buried 3\nnuts.log closed\ncaught owl!",
        },
        {
          h: "Nullable references",
          p: "Modern C# projects turn on <b>nullable reference types</b>: <code>string</code> means never null, and <code>string?</code> means it may be null, and the compiler warns when you use a maybe-null value without checking. <code>?.</code> reads a member only if the value is not null, giving null otherwise, and <code>??</code> supplies a fallback.",
          code: `#nullable enable
string? Lookup(string tree) => tree == "oak" ? "acorn" : null;

string? a = Lookup("oak");
string? b = Lookup("pine");
Console.WriteLine(a?.Length);
Console.WriteLine(b?.Length ?? -1);
Console.WriteLine(b ?? "nothing");
if (a is not null)
{
    Console.WriteLine(a.ToUpper());
}`,
          out: "5\n-1\nnothing\nACORN",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `try
{
    Console.Write("a");
    throw new Exception("b");
}
catch (Exception e)
{
    Console.Write(e.Message);
}
finally
{
    Console.Write("c");
}
Console.WriteLine("d");`, options: ["abcd", "acd", "abd", "ab"], answer: "abcd", why: "The catch prints the message, finally always runs, and the program then carries on." },
        { kind: "output", q: "What does this print?", code: `#nullable enable
string? name = null;
Console.WriteLine(name?.Length ?? 0);`, options: ["0", "null", "An exception", "4"], answer: "0", why: "name?.Length is null because name is null, and ?? replaces it with 0." },
        { q: "Why use int.TryParse instead of int.Parse for user input?", options: ["It reports failure with a bool instead of throwing", "It is the only one that handles negative numbers", "It rounds decimals", "It never accepts spaces"], answer: "It reports failure with a bool instead of throwing", why: "Bad input is expected, not exceptional, so checking a bool is simpler and cheaper." },
      ],
    },
    {
      id: "generics",
      title: "Generics, delegates and lambdas",
      summary: "Code that works for many types, and functions as values.",
      sections: [
        {
          p: "A <b>generic</b> type or method has a type parameter, written in angle brackets, that is filled in when it is used. <code>List&lt;T&gt;</code> is one. You can write your own, and a constraint such as <code>where T : IComparable&lt;T&gt;</code> says what the type must be able to do.",
          code: `Console.WriteLine(Largest([3, 9, 4]));
Console.WriteLine(Largest(["oak", "yew", "beech"]));
var pair = new Pair<string, int>("hazel", 12);
Console.WriteLine(pair);

static T Largest<T>(List<T> items) where T : IComparable<T>
{
    T best = items[0];
    foreach (var item in items)
    {
        if (item.CompareTo(best) > 0) best = item;
    }
    return best;
}

record Pair<A, B>(A First, B Second);`,
          out: "9\nyew\nPair { First = hazel, Second = 12 }",
        },
        {
          h: "Delegates and lambdas",
          p: "A <b>delegate</b> is a value that holds a method. The built-in <code>Func&lt;int, int&gt;</code> takes an <code>int</code> and returns one; <code>Action&lt;string&gt;</code> takes a string and returns nothing. A <b>lambda</b> such as <code>n =&gt; n * 2</code> writes the method in place. Lambdas can use variables from around them, which is called <b>capturing</b>.",
          code: `Func<int, int> twice = n => n * 2;
Func<int, int, int> add = (a, b) => a + b;
Action<string> shout = s => Console.WriteLine(s.ToUpper() + "!");

Console.WriteLine(twice(21));
Console.WriteLine(add(2, 3));
shout("nuts");

int total = 0;
Action<int> collect = n => total += n;
collect(4);
collect(6);
Console.WriteLine(total);

Console.WriteLine(ApplyTwice(twice, 5));
static int ApplyTwice(Func<int, int> f, int x) => f(f(x));`,
          out: "42\n5\nNUTS!\n10\n20",
        },
        {
          h: "Events",
          p: "An <code>event</code> is a list of delegates that a class calls when something happens. Other code subscribes with <code>+=</code>. This is how buttons in a user interface tell your code they were clicked. <code>?.Invoke</code> calls the event only if someone subscribed.",
          code: `var feeder = new Feeder();
feeder.Emptied += () => Console.WriteLine("refill the feeder");
feeder.Emptied += () => Console.WriteLine("squirrels are sad");
feeder.Eat(3);
feeder.Eat(2);

class Feeder
{
    int seeds = 5;
    public event Action? Emptied;
    public void Eat(int n)
    {
        seeds -= n;
        Console.WriteLine($"{seeds} seeds left");
        if (seeds <= 0) Emptied?.Invoke();
    }
}`,
          out: "2 seeds left\n0 seeds left\nrefill the feeder\nsquirrels are sad",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `Func<int, int> inc = n => n + 1;
Func<int, int> sq = n => n * n;
Console.WriteLine(sq(inc(3)));`, options: ["16", "10", "9", "7"], answer: "16", why: "inc(3) is 4, and sq(4) is 16." },
        { kind: "output", q: "What does this print?", code: `var actions = new List<Action>();
int x = 1;
actions.Add(() => Console.Write(x));
x = 2;
actions.Add(() => Console.Write(x));
foreach (var a in actions) a();
Console.WriteLine();`, options: ["22", "12", "11", "21"], answer: "22", why: "Lambdas capture the variable itself, not its value at the time, so both see x = 2 when they run." },
        { q: "What does where T : IComparable<T> allow inside a generic method?", options: ["Calling CompareTo on values of type T", "Using T only with numbers", "Creating new T objects with new T()", "Nothing; it is only documentation"], answer: "Calling CompareTo on values of type T", why: "The constraint promises every T has that method, so the compiler lets you call it." },
      ],
    },
    {
      id: "iterators",
      title: "Iterators and lazy sequences",
      summary: "IEnumerable, yield return and deferred LINQ.",
      sections: [
        {
          p: "<code>foreach</code> works on anything that is <code>IEnumerable&lt;T&gt;</code>. The easiest way to make one is a method with <code>yield return</code>: each time the loop asks for the next item, the method runs until the next <code>yield return</code> and then pauses there. Items are made only when needed, so a sequence can even be endless.",
          code: `foreach (var n in Countdown(3))
{
    Console.Write(n + " ");
}
Console.WriteLine();

foreach (var f in Fibonacci().Take(10))
{
    Console.Write(f + " ");
}
Console.WriteLine();

static IEnumerable<int> Countdown(int from)
{
    for (int i = from; i > 0; i--) yield return i;
    yield return 0;
}

static IEnumerable<long> Fibonacci()
{
    long a = 0, b = 1;
    while (true)
    {
        yield return a;
        (a, b) = (b, a + b);
    }
}`,
          out: "3 2 1 0 \n0 1 1 2 3 5 8 13 21 34 ",
        },
        {
          h: "LINQ is lazy too",
          p: "Most LINQ methods (<code>Where</code>, <code>Select</code>, <code>Take</code>) do not run when you call them. They build a recipe that runs when you loop over it. So the query below reads the list as it is <i>when it is used</i>, and the printing shows the steps happen one item at a time. <code>ToList()</code> runs the recipe immediately and keeps the results.",
          code: `var nuts = new List<int> { 4, 9, 2 };
var big = nuts.Where(n =>
{
    Console.WriteLine($"  checking {n}");
    return n > 3;
});
nuts.Add(12);
Console.WriteLine("before the loop");
foreach (var n in big) Console.WriteLine($"big: {n}");

var snapshot = nuts.Where(n => n > 3).ToList();
nuts.Add(50);
Console.WriteLine(snapshot.Count);`,
          out: "before the loop\n  checking 4\nbig: 4\n  checking 9\nbig: 9\n  checking 2\n  checking 12\nbig: 12\n3",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `foreach (var x in Evens().Take(3)) Console.Write(x);
Console.WriteLine();

static IEnumerable<int> Evens()
{
    for (int i = 0; ; i += 2) yield return i;
}`, options: ["024", "246", "02", "An endless loop"], answer: "024", why: "Take(3) stops asking after three items, so the endless method only runs that far." },
        { kind: "output", q: "What does this print?", code: `var list = new List<int> { 1, 2 };
var q = list.Select(n => n * 10);
list.Add(3);
Console.WriteLine(q.Count());`, options: ["3", "2", "0", "30"], answer: "3", why: "The query runs when Count() is called, after 3 was added." },
        { q: "What happens at yield return?", options: ["The method hands back one item and pauses until the next is asked for", "The method ends", "All items are produced at once", "The item is printed"], answer: "The method hands back one item and pauses until the next is asked for", why: "That is what makes iterators lazy, and why endless sequences work with Take." },
      ],
    },
    {
      id: "project",
      title: "Project: a nut inventory",
      summary: "Records, LINQ, pattern matching and formatting together.",
      sections: [
        {
          p: "This program keeps a small inventory of stores, each with nuts of different kinds and ages. It uses a <code>record</code> for the data, LINQ to group and total, a <code>switch</code> expression with patterns to label freshness, and format specifiers such as <code>{name,-8}</code> (left-aligned in 8 columns) and <code>{n,4}</code> (right-aligned in 4) to print a tidy table.",
          code: `List<Cache> caches =
[
    new("oak", "acorn", 14, 3),
    new("oak", "acorn", 6, 40),
    new("hazel", "hazelnut", 9, 10),
    new("beech", "beechnut", 20, 2),
    new("hazel", "hazelnut", 4, 75),
];

Console.WriteLine($"{"tree",-8}{"nuts",5}  freshest");
foreach (var g in caches.GroupBy(c => c.Tree).OrderByDescending(g => g.Sum(c => c.Count)))
{
    int total = g.Sum(c => c.Count);
    int youngest = g.Min(c => c.AgeDays);
    Console.WriteLine($"{g.Key,-8}{total,5}  {Freshness(youngest)}");
}
Console.WriteLine($"{"all",-8}{caches.Sum(c => c.Count),5}");

var old = caches.Where(c => c.AgeDays > 30).Select(c => $"{c.Kind} at the {c.Tree}");
Console.WriteLine("eat soon: " + string.Join(", ", old));

static string Freshness(int days) => days switch
{
    < 7 => "fresh",
    < 30 => "fine",
    _ => "old",
};

record Cache(string Tree, string Kind, int Count, int AgeDays);`,
          out: "tree     nuts  freshest\noak        20  fresh\nbeech      20  fresh\nhazel      13  fine\nall        53\neat soon: acorn at the oak, hazelnut at the hazel",
        },
        {
          h: "Ideas to try",
          p: "Add a method that moves nuts from one store to another and throws if there are not enough, read the caches from a CSV file with <code>File.ReadLines</code> and <code>Split(',')</code>, or make <code>Freshness</code> depend on the kind of nut as well, using a tuple pattern such as <code>(\"acorn\", &lt; 60)</code>.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `Console.WriteLine($"[{"ab",-4}][{7,3}]");`, options: ["[ab  ][  7]", "[  ab][7  ]", "[ab][7]", "[ab  ][7  ]"], answer: "[ab  ][  7]", why: "A negative width left-aligns, a positive one right-aligns." },
        { kind: "output", q: "What does this print?", code: `string Size(int n) => n switch
{
    0 => "none",
    < 10 => "few",
    _ => "many",
};
Console.WriteLine($"{Size(0)} {Size(4)} {Size(40)}");`, options: ["none few many", "none none many", "few few many", "none few few"], answer: "none few many", why: "The arms are tried from the top; _ catches everything left." },
        { q: "What does GroupBy(c => c.Tree) give you?", options: ["One group per tree, each with a Key and the caches for that tree", "The caches sorted by tree", "Only the first cache of each tree", "A dictionary of counts"], answer: "One group per tree, each with a Key and the caches for that tree", why: "Each group can be totalled or searched with LINQ, as the program does with Sum and Min." },
      ],
    },
  ],
};
