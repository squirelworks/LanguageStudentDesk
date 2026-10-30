// Python course for the Programming Learner. Written for this project.
// Schema (shared by every pack in data/):
//   { id, name, title, intro, keywords, comment, lessons: [lesson] }
//   lesson   = { id, title, summary, sections: [section], practice: [question] }
//   section  = { h?, p?, code?, out? }   p is trusted HTML; out is the exact output of code
//   question = { q, code?, options, answer, why, kind? }
//              kind "output": answer is exactly what code prints (tools/check_packs.py runs it)
// Code is String.raw so backslashes reach the page untouched.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.python = {
  id: "python",
  name: "Python",
  title: "Python from the first line",
  intro:
    "Python reads almost like plain English, which makes it a gentle first language and a serious everyday tool: it runs websites, science, spreadsheets-on-steroids and the scripts that glue other programs together. These lessons go from your first <code>print</code> to writing small classes. Every example shows exactly what it prints. To run code yourself, install Python 3 from python.org and type <code>python</code> (or <code>py</code> on Windows) in a terminal, or save the code in a file ending in <code>.py</code> and run <code>python file.py</code>.",
  comment: "#",
  keywords: [
    "False", "None", "True", "and", "as", "assert", "break", "class", "continue", "def", "del", "elif", "else", "except",
    "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass", "raise",
    "return", "try", "while", "with", "yield",
  ],
  builtins: [
    "print", "len", "range", "input", "int", "float", "str", "bool", "list", "dict", "set", "tuple", "type", "sorted",
    "sum", "min", "max", "abs", "round", "enumerate", "zip", "open", "isinstance", "self",
  ],
  lessons: [
    {
      id: "first",
      title: "Your first program",
      summary: "print, strings and comments.",
      sections: [
        {
          p: "<code>print</code> shows whatever you put between its brackets. Text goes in quotes; single and double quotes mean the same thing. Each <code>print</code> starts a new line.",
          code: String.raw`print("Hello, squirrel!")
print('Nuts are ready.')
print(7)`,
          out: "Hello, squirrel!\nNuts are ready.\n7",
        },
        {
          h: "Several things at once",
          p: "Separate values with commas and <code>print</code> puts a space between them. Text in quotes is a <b>string</b>; numbers need no quotes.",
          code: String.raw`print("I have", 3, "acorns")
print("a", "b", "c", sep="-")`,
          out: "I have 3 acorns\na-b-c",
        },
        {
          h: "Comments",
          p: "Everything after a <code>#</code> is a comment: Python ignores it. Comments are notes for people reading the code, including you next month.",
          code: String.raw`# This line does nothing.
print("Only this shows")  # a comment can follow code too`,
          out: "Only this shows",
        },
        {
          h: "Special characters",
          p: "Inside a string, <code>\\n</code> starts a new line and <code>\\t</code> is a tab. To put a quote inside, use the other kind of quote around the string.",
          code: String.raw`print("one\ntwo")
print("She said 'hi'")`,
          out: "one\ntwo\nShe said 'hi'",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`print("Up", "the", "tree")`, options: ["Up the tree", "Upthetree", "Up,the,tree", "\"Up\" \"the\" \"tree\""], answer: "Up the tree", why: "Commas between values become single spaces, and the quotes are not printed." },
        { kind: "output", q: "What does this print?", code: String.raw`# print("hidden")
print("shown")`, options: ["shown", "hidden\nshown", "# print(\"hidden\")\nshown", "Nothing"], answer: "shown", why: "The first line is a comment because it starts with #, so it never runs." },
        { kind: "output", q: "What does this print?", code: String.raw`print("x", "y", sep="")`, options: ["xy", "x y", "x\ny", "x,y"], answer: "xy", why: "sep sets what goes between the values; an empty string means nothing at all." },
        { q: "Which line is a valid string with an apostrophe in it?", options: ["\"It's mine\"", "'It's mine'", "It's mine", "('It's mine')"], answer: "\"It's mine\"", why: "Double quotes around the text let the single quote inside be an ordinary character." },
        { kind: "output", q: "What does this print?", code: String.raw`print("a\nb")`, options: ["a\nb", "a b", "anb", "a\\nb"], answer: "a\nb", why: "\\n inside a string is a newline, so b lands on the next line." },
      ],
    },
    {
      id: "variables",
      title: "Variables and types",
      summary: "Names for values, and the four basic kinds of value.",
      sections: [
        {
          p: "A <b>variable</b> is a name that points at a value. <code>=</code> means “make this name point at this value”, not “is equal to”. You can point the name somewhere else later.",
          code: String.raw`nuts = 5
print(nuts)
nuts = nuts + 2
print(nuts)`,
          out: "5\n7",
        },
        {
          h: "Four basic types",
          p: "Whole numbers are <code>int</code>, numbers with a decimal point are <code>float</code>, text is <code>str</code>, and <code>True</code>/<code>False</code> are <code>bool</code>. <code>type()</code> tells you which one you have.",
          code: String.raw`print(type(42))
print(type(4.2))
print(type("42"))
print(type(True))`,
          out: "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>",
        },
        {
          h: "Converting",
          p: "<code>int()</code>, <code>float()</code> and <code>str()</code> turn one type into another. This matters because <code>\"2\" + \"3\"</code> joins text while <code>2 + 3</code> adds numbers.",
          code: String.raw`print("2" + "3")
print(int("2") + int("3"))
print("Score: " + str(10))`,
          out: "23\n5\nScore: 10",
        },
        {
          h: "f-strings",
          p: "Put an <code>f</code> before the quotes and anything in <code>{braces}</code> is filled in from your variables. This is the everyday way to build a message.",
          code: String.raw`name = "Hazel"
age = 3
print(f"{name} is {age} years old")
print(f"Next year: {age + 1}")`,
          out: "Hazel is 3 years old\nNext year: 4",
        },
        {
          h: "Naming rules",
          p: "Names use letters, digits and underscores, and cannot start with a digit. Case matters: <code>Nuts</code> and <code>nuts</code> are different. Python style is lowercase words joined by underscores: <code>nuts_buried</code>.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`x = 4
x = x * 2
print(x)`, options: ["8", "4", "x * 2", "16"], answer: "8", why: "x starts at 4; the second line takes the current 4, doubles it and points x at 8." },
        { kind: "output", q: "What does this print?", code: String.raw`print("5" + "5")`, options: ["55", "10", "5 5", "An error"], answer: "55", why: "Both are strings, so + joins them end to end." },
        { kind: "output", q: "What does this print?", code: String.raw`print(type(3.0))`, options: ["<class 'float'>", "<class 'int'>", "<class 'str'>", "3.0"], answer: "<class 'float'>", why: "The decimal point makes 3.0 a float, even though it is a whole number." },
        { kind: "output", q: "What does this print?", code: String.raw`tree = "oak"
print(f"I live in an {tree}")`, options: ["I live in an oak", "I live in an {tree}", "I live in an tree", "f\"I live in an oak\""], answer: "I live in an oak", why: "The f before the quotes makes {tree} get replaced by the variable's value." },
        { q: "Which is a valid variable name?", options: ["seeds_2", "2seeds", "my seeds", "seeds-2"], answer: "seeds_2", why: "Names cannot start with a digit or contain spaces or hyphens; underscores and later digits are fine." },
        { kind: "output", q: "What does this print?", code: String.raw`a = 1
b = a
a = 9
print(b)`, options: ["1", "9", "a", "An error"], answer: "1", why: "b was pointed at the value 1. Moving a to 9 afterwards does not move b." },
      ],
    },
    {
      id: "numbers",
      title: "Numbers and arithmetic",
      summary: "+ − * /, whole-number division, remainders and powers.",
      sections: [
        {
          p: "The usual operators work as on a calculator. Note that <code>/</code> always gives a float, even when the division is exact.",
          code: String.raw`print(7 + 3)
print(7 - 3)
print(7 * 3)
print(6 / 3)`,
          out: "10\n4\n21\n2.0",
        },
        {
          h: "Floor division and remainder",
          p: "<code>//</code> divides and drops the fraction. <code>%</code> gives what is left over. Together they answer “how many full groups, and how many spare?”.",
          code: String.raw`acorns = 17
print(acorns // 5)   # full bags of 5
print(acorns % 5)    # left over`,
          out: "3\n2",
        },
        {
          h: "Powers and order",
          p: "<code>**</code> raises to a power. Python follows maths order: powers first, then <code>* / // %</code>, then <code>+ -</code>. Brackets go first of all.",
          code: String.raw`print(2 ** 3)
print(2 + 3 * 4)
print((2 + 3) * 4)`,
          out: "8\n14\n20",
        },
        {
          h: "Handy helpers",
          p: "<code>round</code>, <code>abs</code>, <code>min</code> and <code>max</code> are built in. Shortcuts like <code>+=</code> update a variable in place.",
          code: String.raw`print(round(3.14159, 2))
print(abs(-8))
print(max(4, 9, 2))
total = 10
total += 5
print(total)`,
          out: "3.14\n8\n9\n15",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`print(10 / 2)`, options: ["5.0", "5", "5.00", "An error"], answer: "5.0", why: "/ always produces a float." },
        { kind: "output", q: "What does this print?", code: String.raw`print(14 % 4)`, options: ["2", "3", "3.5", "0"], answer: "2", why: "4 fits into 14 three times (12) with 2 left over." },
        { kind: "output", q: "What does this print?", code: String.raw`print(14 // 4)`, options: ["3", "3.5", "2", "4"], answer: "3", why: "// keeps only the whole part of 3.5." },
        { kind: "output", q: "What does this print?", code: String.raw`print(1 + 2 * 3)`, options: ["7", "9", "6", "123"], answer: "7", why: "Multiplication comes first: 2 * 3 = 6, then 1 + 6." },
        { kind: "output", q: "What does this print?", code: String.raw`n = 3
n *= 4
print(n)`, options: ["12", "7", "3", "34"], answer: "12", why: "n *= 4 is short for n = n * 4." },
        { q: "How would you test whether a number n is even?", options: ["n % 2 == 0", "n / 2 == 0", "n // 2 == 1", "n ** 2 == 0"], answer: "n % 2 == 0", why: "An even number leaves no remainder when divided by 2." },
      ],
    },
    {
      id: "strings",
      title: "Working with strings",
      summary: "Indexing, slicing, length and string methods.",
      sections: [
        {
          p: "A string is a sequence of characters, numbered from <b>0</b>. Square brackets pick one out. Negative numbers count from the end.",
          code: String.raw`word = "squirrel"
print(word[0])
print(word[3])
print(word[-1])
print(len(word))`,
          out: "s\ni\nl\n8",
        },
        {
          h: "Slices",
          p: "<code>word[a:b]</code> takes characters from position <code>a</code> up to, but not including, <code>b</code>. Leave a side empty to mean “from the start” or “to the end”.",
          code: String.raw`word = "squirrel"
print(word[0:3])
print(word[3:])
print(word[:-1])`,
          out: "squ\nirrel\nsquirre",
        },
        {
          h: "Methods",
          p: "Strings come with tools called with a dot. They return a new string; the original never changes (strings are <b>immutable</b>).",
          code: String.raw`s = "  Pine Cone  "
print(s.strip())
print(s.strip().upper())
print(s.strip().replace("Cone", "Nut"))
print("a,b,c".split(","))`,
          out: "Pine Cone\nPINE CONE\nPine Nut\n['a', 'b', 'c']",
        },
        {
          h: "Searching",
          p: "<code>in</code> checks whether one string appears inside another. <code>find</code> gives the position, or <code>-1</code> if it is missing.",
          code: String.raw`print("nut" in "chestnut")
print("chestnut".find("nut"))
print("chestnut".find("pea"))`,
          out: "True\n5\n-1",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`print("forest"[1])`, options: ["o", "f", "r", "fo"], answer: "o", why: "Counting starts at 0: f is 0, o is 1." },
        { kind: "output", q: "What does this print?", code: String.raw`print("forest"[-2])`, options: ["s", "t", "e", "r"], answer: "s", why: "-1 is the last character (t); -2 is the one before it." },
        { kind: "output", q: "What does this print?", code: String.raw`print("branches"[2:5])`, options: ["anc", "ranc", "an", "anch"], answer: "anc", why: "Positions 2, 3 and 4; the slice stops before 5." },
        { kind: "output", q: "What does this print?", code: String.raw`s = "leaf"
s.upper()
print(s)`, options: ["leaf", "LEAF", "Leaf", "None"], answer: "leaf", why: "upper() returns a new string, but nothing keeps it. s itself never changes." },
        { kind: "output", q: "What does this print?", code: String.raw`print(len("a b"))`, options: ["3", "2", "1", "4"], answer: "3", why: "The space counts as a character." },
        { kind: "output", q: "What does this print?", code: String.raw`print("tree house".split())`, options: ["['tree', 'house']", "['tree house']", "tree house", "['t', 'r', 'e', 'e']"], answer: "['tree', 'house']", why: "split() with no argument splits on whitespace and returns a list." },
      ],
    },
    {
      id: "decisions",
      title: "Making decisions",
      summary: "if, elif, else, comparisons and logic.",
      sections: [
        {
          p: "<code>if</code> runs a block only when a condition is true. The block is the indented lines after the colon; indentation is how Python knows where it ends. Four spaces is the norm.",
          code: String.raw`nuts = 12
if nuts > 10:
    print("Enough for winter")
print("Done counting")`,
          out: "Enough for winter\nDone counting",
        },
        {
          h: "elif and else",
          p: "Add <code>elif</code> for more conditions and <code>else</code> for everything left. Python checks them top to bottom and runs only the <b>first</b> match.",
          code: String.raw`temp = 4
if temp < 0:
    print("Freezing")
elif temp < 10:
    print("Chilly")
else:
    print("Mild")`,
          out: "Chilly",
        },
        {
          h: "Comparisons",
          p: "<code>==</code> equal, <code>!=</code> not equal, <code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code>. Remember: one <code>=</code> assigns, two compare. Combine conditions with <code>and</code>, <code>or</code>, <code>not</code>.",
          code: String.raw`age = 15
print(age >= 13 and age <= 19)
print(age == 15)
print(not age > 20)`,
          out: "True\nTrue\nTrue",
        },
        {
          h: "Truthiness",
          p: "Empty things count as false: <code>0</code>, <code>\"\"</code>, <code>[]</code>, <code>None</code>. Almost everything else counts as true, so <code>if name:</code> means “if name is not empty”.",
          code: String.raw`name = ""
if name:
    print("Hi", name)
else:
    print("No name given")`,
          out: "No name given",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`x = 7
if x > 5:
    print("big")
else:
    print("small")`, options: ["big", "small", "big\nsmall", "Nothing"], answer: "big", why: "7 > 5 is true, so only the if block runs." },
        { kind: "output", q: "What does this print?", code: String.raw`n = 50
if n > 10:
    print("A")
elif n > 40:
    print("B")
else:
    print("C")`, options: ["A", "B", "A\nB", "C"], answer: "A", why: "Only the first true branch runs. n > 10 is already true, so elif is never checked." },
        { kind: "output", q: "What does this print?", code: String.raw`print(3 == 3.0)`, options: ["True", "False", "An error", "3"], answer: "True", why: "== compares values, and 3 and 3.0 are the same number." },
        { kind: "output", q: "What does this print?", code: String.raw`print(True and not True)`, options: ["False", "True", "None", "An error"], answer: "False", why: "not True is False, and True and False is False." },
        { kind: "output", q: "What does this print?", code: String.raw`items = []
if items:
    print("full")
else:
    print("empty")`, options: ["empty", "full", "[]", "An error"], answer: "empty", why: "An empty list counts as false." },
        { q: "Why does `if x = 5:` fail?", options: ["One = assigns; comparing needs ==", "Numbers cannot follow if", "The colon is wrong", "x must be a string"], answer: "One = assigns; comparing needs ==", why: "Python refuses assignment inside an if condition, which catches a very common slip." },
      ],
    },
    {
      id: "loops",
      title: "Loops",
      summary: "for, range, while, break and continue.",
      sections: [
        {
          p: "A <code>for</code> loop runs its block once for each item in a sequence. A string is a sequence of characters.",
          code: String.raw`for letter in "nut":
    print(letter)`,
          out: "n\nu\nt",
        },
        {
          h: "range",
          p: "<code>range(n)</code> counts 0, 1, … up to but not including <code>n</code>. <code>range(a, b)</code> starts at <code>a</code>; a third number sets the step.",
          code: String.raw`for i in range(3):
    print(i)
for i in range(10, 0, -3):
    print(i)`,
          out: "0\n1\n2\n10\n7\n4\n1",
        },
        {
          h: "while",
          p: "<code>while</code> repeats as long as its condition is true. Make sure something inside changes, or the loop never ends.",
          code: String.raw`stash = 1
while stash < 20:
    stash = stash * 3
print(stash)`,
          out: "27",
        },
        {
          h: "break and continue",
          p: "<code>break</code> leaves the loop at once. <code>continue</code> skips to the next round.",
          code: String.raw`for n in range(1, 10):
    if n % 2 == 0:
        continue
    if n > 6:
        break
    print(n)`,
          out: "1\n3\n5",
        },
        {
          h: "Adding up",
          p: "A common pattern: start a total at zero and add to it inside the loop.",
          code: String.raw`total = 0
for n in range(1, 5):
    total += n
print(total)`,
          out: "10",
        },
      ],
      practice: [
        { kind: "output", q: "How many lines does this print?", code: String.raw`for i in range(4):
    print("hop")`, options: ["4", "3", "5", "1"], answer: "4", why: "range(4) gives 0, 1, 2, 3: four rounds.", check: "hop\nhop\nhop\nhop" },
        { kind: "output", q: "What does this print?", code: String.raw`for i in range(2, 5):
    print(i)`, options: ["2\n3\n4", "2\n3\n4\n5", "3\n4\n5", "2\n5"], answer: "2\n3\n4", why: "range(2, 5) starts at 2 and stops before 5." },
        { kind: "output", q: "What does this print?", code: String.raw`n = 0
while n < 3:
    n += 1
print(n)`, options: ["3", "2", "4", "0"], answer: "3", why: "The loop stops as soon as n < 3 is false, which first happens at 3." },
        { kind: "output", q: "What does this print?", code: String.raw`for c in "acorn":
    if c == "o":
        break
    print(c)`, options: ["a\nc", "a\nc\no", "a\nc\nr\nn", "o"], answer: "a\nc", why: "The loop stops at o before printing it." },
        { kind: "output", q: "What does this print?", code: String.raw`s = 0
for i in range(5):
    s += i
print(s)`, options: ["10", "15", "5", "4"], answer: "10", why: "0 + 1 + 2 + 3 + 4 = 10. range(5) never reaches 5." },
        { kind: "output", q: "What does this print?", code: String.raw`for i in range(5, 0, -2):
    print(i)`, options: ["5\n3\n1", "5\n3", "5\n4\n3\n2\n1", "1\n3\n5"], answer: "5\n3\n1", why: "Start at 5, step −2, stop before 0." },
      ],
    },
    {
      id: "lists",
      title: "Lists",
      summary: "Ordered collections you can change.",
      sections: [
        {
          p: "A <b>list</b> holds several values in order, inside square brackets. Indexing and slicing work just like strings.",
          code: String.raw`trees = ["oak", "beech", "pine"]
print(trees[0])
print(trees[-1])
print(len(trees))`,
          out: "oak\npine\n3",
        },
        {
          h: "Changing a list",
          p: "Unlike strings, lists are <b>mutable</b>: you can change them in place.",
          code: String.raw`trees = ["oak", "beech"]
trees.append("pine")
trees[0] = "elm"
trees.remove("beech")
print(trees)`,
          out: "['elm', 'pine']",
        },
        {
          h: "Looping and sorting",
          p: "Loop straight over the items. <code>sorted()</code> gives a new sorted list; <code>.sort()</code> sorts the list itself. <code>enumerate</code> hands you the position too.",
          code: String.raw`scores = [7, 2, 9]
print(sorted(scores))
print(sum(scores), max(scores))
for i, s in enumerate(scores):
    print(i, s)`,
          out: "[2, 7, 9]\n18 9\n0 7\n1 2\n2 9",
        },
        {
          h: "List comprehensions",
          p: "A compact way to build one list from another: <code>[expression for item in sequence if condition]</code>.",
          code: String.raw`nums = [1, 2, 3, 4, 5, 6]
squares = [n * n for n in nums]
evens = [n for n in nums if n % 2 == 0]
print(squares)
print(evens)`,
          out: "[1, 4, 9, 16, 25, 36]\n[2, 4, 6]",
        },
        {
          h: "Two names, one list",
          p: "Assigning a list to a second name does not copy it. Both names point at the same list, so a change through one shows through the other. Use <code>.copy()</code> for a separate list.",
          code: String.raw`a = [1, 2]
b = a
c = a.copy()
a.append(3)
print(b)
print(c)`,
          out: "[1, 2, 3]\n[1, 2]",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`x = [4, 5, 6]
print(x[1])`, options: ["5", "4", "6", "[5]"], answer: "5", why: "Index 1 is the second item." },
        { kind: "output", q: "What does this print?", code: String.raw`x = [1, 2]
x.append([3])
print(len(x))`, options: ["3", "4", "2", "An error"], answer: "3", why: "append adds one item, and here that item is the list [3]." },
        { kind: "output", q: "What does this print?", code: String.raw`print([n * 2 for n in range(3)])`, options: ["[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]", "[0, 2, 4, 6]"], answer: "[0, 2, 4]", why: "range(3) is 0, 1, 2; each is doubled." },
        { kind: "output", q: "What does this print?", code: String.raw`a = [1]
b = a
b.append(2)
print(a)`, options: ["[1, 2]", "[1]", "[2]", "An error"], answer: "[1, 2]", why: "a and b are two names for the same list." },
        { kind: "output", q: "What does this print?", code: String.raw`x = [3, 1, 2]
y = sorted(x)
print(x)`, options: ["[3, 1, 2]", "[1, 2, 3]", "None", "[3, 2, 1]"], answer: "[3, 1, 2]", why: "sorted() returns a new list and leaves the original alone." },
        { kind: "output", q: "What does this print?", code: String.raw`print([1, 2, 3, 4][1:3])`, options: ["[2, 3]", "[1, 2, 3]", "[2, 3, 4]", "[1, 2]"], answer: "[2, 3]", why: "Positions 1 and 2; the slice stops before 3." },
      ],
    },
    {
      id: "dicts",
      title: "Dictionaries, tuples and sets",
      summary: "Look things up by key; fixed pairs; unique items.",
      sections: [
        {
          p: "A <b>dictionary</b> maps keys to values, like words to definitions. Look up, add or change a value with its key in square brackets.",
          code: String.raw`stash = {"acorn": 12, "hazelnut": 5}
print(stash["acorn"])
stash["walnut"] = 2
stash["acorn"] -= 1
print(stash)`,
          out: "12\n{'acorn': 11, 'hazelnut': 5, 'walnut': 2}",
        },
        {
          h: "Missing keys",
          p: "Asking for a key that is not there raises a <code>KeyError</code>. <code>.get()</code> returns a default instead, and <code>in</code> checks first.",
          code: String.raw`stash = {"acorn": 12}
print(stash.get("pecan", 0))
print("pecan" in stash)`,
          out: "0\nFalse",
        },
        {
          h: "Looping over a dictionary",
          p: "<code>.items()</code> gives key and value together. Dictionaries keep the order you inserted things.",
          code: String.raw`ages = {"Hazel": 3, "Rowan": 5}
for name, age in ages.items():
    print(f"{name}: {age}")`,
          out: "Hazel: 3\nRowan: 5",
        },
        {
          h: "Tuples",
          p: "A <b>tuple</b> is like a list in round brackets that cannot be changed. It is handy for fixed groups, and for returning several values at once. Unpack it into separate names.",
          code: String.raw`point = (3, 4)
x, y = point
print(x + y)`,
          out: "7",
        },
        {
          h: "Sets",
          p: "A <b>set</b> keeps each value once. It is the quickest way to drop duplicates or test membership.",
          code: String.raw`seen = set(["oak", "pine", "oak", "elm", "pine"])
print(len(seen))
print("elm" in seen)`,
          out: "3\nTrue",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`d = {"a": 1, "b": 2}
print(d["b"])`, options: ["2", "1", "b", "An error"], answer: "2", why: "The key \"b\" maps to 2." },
        { kind: "output", q: "What does this print?", code: String.raw`d = {"a": 1}
d["a"] = 5
print(len(d))`, options: ["1", "2", "5", "An error"], answer: "1", why: "Assigning to an existing key replaces its value; there is still one key." },
        { kind: "output", q: "What does this print?", code: String.raw`d = {}
print(d.get("x", "none"))`, options: ["none", "None", "An error", "x"], answer: "none", why: "get returns the default you gave when the key is missing." },
        { kind: "output", q: "What does this print?", code: String.raw`print(len({1, 1, 2, 2, 3}))`, options: ["3", "5", "2", "An error"], answer: "3", why: "A set keeps each value once: {1, 2, 3}." },
        { q: "What happens with `t = (1, 2); t[0] = 9`?", options: ["A TypeError: tuples cannot be changed", "t becomes (9, 2)", "t becomes (9, 1, 2)", "Nothing happens"], answer: "A TypeError: tuples cannot be changed", why: "Tuples are immutable. Build a new tuple instead." },
        { kind: "output", q: "What does this print?", code: String.raw`a, b = 1, 2
a, b = b, a
print(a, b)`, options: ["2 1", "1 2", "2 2", "1 1"], answer: "2 1", why: "The right side builds the tuple (2, 1) first, then unpacks it, so the swap works." },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      summary: "def, parameters, return values and scope.",
      sections: [
        {
          p: "A <b>function</b> is a named block you can run whenever you need it. <code>def</code> defines it; calling it by name with brackets runs it.",
          code: String.raw`def greet(name):
    print(f"Hello, {name}!")

greet("Hazel")
greet("Rowan")`,
          out: "Hello, Hazel!\nHello, Rowan!",
        },
        {
          h: "return",
          p: "<code>return</code> sends a value back to whoever called the function. A function with no <code>return</code> gives back <code>None</code>.",
          code: String.raw`def area(width, height):
    return width * height

big = area(4, 5)
print(big)
print(area(2, 3) + 1)`,
          out: "20\n7",
        },
        {
          h: "Defaults and names",
          p: "Give a parameter a default and callers can leave it out. Callers can also name arguments, which keeps long calls readable.",
          code: String.raw`def bag(nuts, size=10):
    return nuts // size

print(bag(35))
print(bag(35, size=5))`,
          out: "3\n7",
        },
        {
          h: "Scope",
          p: "Variables made inside a function are <b>local</b>: they exist only while it runs and do not touch names outside. Pass values in as parameters and get results out with <code>return</code>.",
          code: String.raw`count = 1

def bump():
    count = 100
    return count

print(bump())
print(count)`,
          out: "100\n1",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`def double(n):
    return n * 2

print(double(double(3)))`, options: ["12", "6", "9", "36"], answer: "12", why: "double(3) is 6, and double(6) is 12." },
        { kind: "output", q: "What does this print?", code: String.raw`def f():
    print("hi")

x = f()
print(x)`, options: ["hi\nNone", "hi", "None", "hi\nhi"], answer: "hi\nNone", why: "Calling f prints hi. f has no return, so x is None." },
        { kind: "output", q: "What does this print?", code: String.raw`def p(a, b=2):
    return a + b

print(p(1), p(1, 5))`, options: ["3 6", "3 3", "1 6", "An error"], answer: "3 6", why: "The first call uses the default b=2; the second passes 5." },
        { kind: "output", q: "What does this print?", code: String.raw`x = 5
def change():
    x = 10
change()
print(x)`, options: ["5", "10", "None", "An error"], answer: "5", why: "x = 10 inside the function makes a separate local x." },
        { kind: "output", q: "What does this print?", code: String.raw`def first_two(word):
    return word[:2]
    print("unreached")

print(first_two("pine"))`, options: ["pi", "pi\nunreached", "pine", "unreached"], answer: "pi", why: "return ends the function immediately; the line after it never runs." },
      ],
    },
    {
      id: "errors",
      title: "Errors and exceptions",
      summary: "Reading tracebacks and handling problems with try.",
      sections: [
        {
          p: "When something goes wrong Python stops and prints a <b>traceback</b>. Read its last line first: it names the error and gives a short reason. The lines above show where it happened.",
          code: String.raw`Traceback (most recent call last):
  File "stash.py", line 2, in <module>
    print(stash["pecan"])
KeyError: 'pecan'`,
        },
        {
          h: "Common errors",
          p: "<b>SyntaxError</b>: the code is not valid Python (missing colon or bracket). <b>IndentationError</b>: the spaces at the start of a line do not line up. <b>NameError</b>: a name is used before it exists, often a typo. <b>TypeError</b>: an operation on the wrong kind of value, like <code>\"3\" + 4</code>. <b>ValueError</b>: right type, bad value, like <code>int(\"abc\")</code>. <b>IndexError</b>/<b>KeyError</b>: a position or key that is not there. <b>ZeroDivisionError</b>: dividing by zero.",
        },
        {
          h: "try and except",
          p: "Wrap risky code in <code>try</code>. If a matching error happens, the <code>except</code> block runs instead of the program crashing.",
          code: String.raw`for text in ["12", "twelve"]:
    try:
        n = int(text)
        print("Got", n)
    except ValueError:
        print("Not a number:", text)`,
          out: "Got 12\nNot a number: twelve",
        },
        {
          h: "else, finally and raise",
          p: "<code>else</code> runs when no error happened; <code>finally</code> always runs. <code>raise</code> signals an error yourself when a value makes no sense.",
          code: String.raw`def split_stash(nuts, squirrels):
    if squirrels <= 0:
        raise ValueError("need at least one squirrel")
    return nuts // squirrels

try:
    print(split_stash(10, 0))
except ValueError as e:
    print("Problem:", e)
finally:
    print("Checked")`,
          out: "Problem: need at least one squirrel\nChecked",
        },
      ],
      practice: [
        { q: "Which error does `int(\"ten\")` raise?", options: ["ValueError", "TypeError", "NameError", "SyntaxError"], answer: "ValueError", why: "int accepts a string, so the type is fine; the value cannot be read as a number." },
        { q: "Which error does `\"a\" + 1` raise?", options: ["TypeError", "ValueError", "NameError", "IndexError"], answer: "TypeError", why: "You cannot add a str and an int; convert one first." },
        { q: "Which error does `prnt(\"hi\")` raise?", options: ["NameError", "SyntaxError", "TypeError", "KeyError"], answer: "NameError", why: "prnt is a name Python has never seen; it is a typo for print." },
        { kind: "output", q: "What does this print?", code: String.raw`try:
    print(1 / 0)
except ZeroDivisionError:
    print("oops")`, options: ["oops", "inf", "0", "An error"], answer: "oops", why: "Dividing by zero raises ZeroDivisionError, which the except block catches." },
        { kind: "output", q: "What does this print?", code: String.raw`try:
    x = [1, 2][5]
except IndexError:
    x = 0
finally:
    print("end")
print(x)`, options: ["end\n0", "0\nend", "end", "An error"], answer: "end\n0", why: "The IndexError is caught and x set to 0; finally prints end; then x is printed." },
      ],
    },
    {
      id: "modules-files",
      title: "Modules and files",
      summary: "import, the standard library, reading and writing files.",
      sections: [
        {
          p: "Python ships with a large <b>standard library</b>. <code>import</code> brings a module in; use its contents with a dot, or import names directly with <code>from</code>.",
          code: String.raw`import math
from datetime import date

print(math.sqrt(81))
print(math.pi > 3)
print(date(2024, 3, 1).strftime("%A"))`,
          out: "9.0\nTrue\nFriday",
        },
        {
          h: "Writing a file",
          p: "<code>open(name, \"w\")</code> opens a file for writing (replacing it). The <code>with</code> statement closes the file for you when the block ends, even after an error.",
          code: String.raw`with open("nuts.txt", "w") as f:
    f.write("acorn\n")
    f.write("hazelnut\n")
print("saved")`,
          out: "saved",
        },
        {
          h: "Reading a file",
          p: "Open with <code>\"r\"</code> (the default) to read. Looping over a file gives one line at a time, each ending in a newline, which <code>.strip()</code> removes. Use <code>\"a\"</code> to add to the end instead of replacing.",
          code: String.raw`with open("nuts.txt", "w") as f:
    f.write("acorn\nhazelnut\n")

with open("nuts.txt") as f:
    for line in f:
        print(line.strip().title())`,
          out: "Acorn\nHazelnut",
        },
        {
          h: "Your own modules",
          p: "Any <code>.py</code> file is a module. Save functions in <code>helpers.py</code> and <code>import helpers</code> from a file next to it. Code under <code>if __name__ == \"__main__\":</code> runs only when the file is run directly, not when it is imported.",
          code: String.raw`def shout(text):
    return text.upper() + "!"

if __name__ == "__main__":
    print(shout("hello"))`,
          out: "HELLO!",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`import math
print(math.floor(4.7))`, options: ["4", "5", "4.7", "4.0"], answer: "4", why: "floor rounds down to the nearest whole number." },
        { q: "Why use `with open(...) as f:` rather than plain `f = open(...)`?", options: ["It closes the file automatically", "It reads faster", "It is the only way to write", "It creates folders"], answer: "It closes the file automatically", why: "Leaving the with block always closes the file, even if an error happens inside." },
        { q: "Which mode adds to the end of an existing file?", options: ["\"a\"", "\"w\"", "\"r\"", "\"x\""], answer: "\"a\"", why: "a is append. w empties the file first; r only reads; x fails if the file exists." },
        { kind: "output", q: "What does this print?", code: String.raw`from math import sqrt
print(sqrt(16) + 1)`, options: ["5.0", "5", "17", "An error"], answer: "5.0", why: "sqrt returns a float, 4.0, and 4.0 + 1 is 5.0." },
        { kind: "output", q: "What does this print?", code: String.raw`with open("t.txt", "w") as f:
    f.write("a\nb\n")
with open("t.txt") as f:
    print(len(f.readlines()))`, options: ["2", "4", "1", "3"], answer: "2", why: "The file holds two lines, a and b; readlines returns a list of both." },
      ],
    },
    {
      id: "classes",
      title: "Classes and objects",
      summary: "Bundling data with the functions that use it.",
      sections: [
        {
          p: "A <b>class</b> is a blueprint; each <b>object</b> made from it carries its own data. <code>__init__</code> runs when an object is created and stores values on <code>self</code>, the object being built.",
          code: String.raw`class Squirrel:
    def __init__(self, name):
        self.name = name
        self.nuts = 0

hazel = Squirrel("Hazel")
rowan = Squirrel("Rowan")
hazel.nuts = 4
print(hazel.name, hazel.nuts)
print(rowan.name, rowan.nuts)`,
          out: "Hazel 4\nRowan 0",
        },
        {
          h: "Methods",
          p: "Functions defined inside a class are <b>methods</b>. Their first parameter is always <code>self</code>, and Python fills it in for you.",
          code: String.raw`class Squirrel:
    def __init__(self, name):
        self.name = name
        self.nuts = 0

    def gather(self, n):
        self.nuts += n
        return self.nuts

s = Squirrel("Hazel")
s.gather(3)
print(s.gather(2))`,
          out: "5",
        },
        {
          h: "Printing objects",
          p: "Define <code>__str__</code> to choose what <code>print</code> shows for your object.",
          code: String.raw`class Tree:
    def __init__(self, kind, height):
        self.kind = kind
        self.height = height

    def __str__(self):
        return f"{self.kind} ({self.height} m)"

print(Tree("oak", 20))`,
          out: "oak (20 m)",
        },
        {
          h: "Inheritance",
          p: "A class can build on another. The new class gets every method of its parent and can add or replace some.",
          code: String.raw`class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Squirrel(Animal):
    def speak(self):
        return "chitter"

for a in [Animal("rock"), Squirrel("Hazel")]:
    print(a.name, a.speak())`,
          out: "rock ...\nHazel chitter",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`class Box:
    def __init__(self, n):
        self.n = n

a = Box(1)
b = Box(2)
print(a.n + b.n)`, options: ["3", "12", "2", "An error"], answer: "3", why: "Each object keeps its own n: 1 and 2." },
        { kind: "output", q: "What does this print?", code: String.raw`class C:
    def __init__(self):
        self.v = 0
    def inc(self):
        self.v += 1

c = C()
c.inc()
c.inc()
print(c.v)`, options: ["2", "1", "0", "None"], answer: "2", why: "Each call to inc adds 1 to the same object's v." },
        { q: "What is `self` inside a method?", options: ["The object the method was called on", "The class itself", "The first argument you pass", "A global variable"], answer: "The object the method was called on", why: "c.inc() runs inc with self set to c." },
        { kind: "output", q: "What does this print?", code: String.raw`class A:
    def hi(self):
        return "A"
class B(A):
    pass

print(B().hi())`, options: ["A", "B", "None", "An error"], answer: "A", why: "B inherits hi from A unchanged; pass just means the body is empty." },
        { kind: "output", q: "What does this print?", code: String.raw`class P:
    def __str__(self):
        return "pine"

print(P())`, options: ["pine", "P", "<P object>", "None"], answer: "pine", why: "print uses __str__ when the class defines it." },
      ],
    },
  ],
};
