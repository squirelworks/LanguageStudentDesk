// Rust course for the Programming Learner. Written for this project.
// Examples are complete Rust 2021 programs. tools/run_rust.py compiles them
// with rustc and checks the printed output.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.rust = {
  id: "rust",
  name: "Rust",
  title: "Rust from the first line",
  intro:
    "Rust is a systems language in the same neighbourhood as C, with a compiler that refuses a large class of memory mistakes before the program ever runs. These lessons use the 2021 edition: printing, names, choices, loops and functions, then the rule that a value has one owner. Every example is a whole program and shows exactly what it prints. To run one yourself, save it as <code>hello.rs</code> and type <code>rustc hello.rs && ./hello</code>, or use <code>cargo new</code> for a project.",
  comment: "//",
  keywords: ["fn", "let", "mut", "if", "else", "for", "in", "while", "return", "true", "false", "struct"],
  builtins: ["println", "main", "String"],
  lessons: [
    {
      id: "first",
      title: "Your first program",
      summary: "fn main and println!.",
      sections: [
        {
          p: "A Rust program starts in <code>fn main</code>. <code>println!</code> prints a line. The <code>!</code> means it is a macro, not an ordinary function: it checks the format string when the program is compiled. Text goes in double quotes.",
          code: `fn main() {
    println!("Hello, squirrel!");
    println!("Nuts are ready.");
}`,
          out: "Hello, squirrel!\nNuts are ready.",
        },
        {
          h: "Placeholders",
          p: "<code>{}</code> is a hole in the string. Each value after the string fills the next hole. <code>{:?}</code> is the debugging form, useful for seeing exactly what a value is.",
          code: `fn main() {
    println!("I have {} acorns", 3);
    println!("{}-{}", "a", "b");
}`,
          out: "I have 3 acorns\na-b",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fn main() {
    println!("Up the tree");
}`, options: ["Up the tree", "Up the tree\\n", "println!(Up the tree)", "Nothing"], answer: "Up the tree", why: "println! prints the text and then ends the line. The quotes and the ! are not printed." },
        { kind: "output", q: "What does this print?", code: `fn main() {
    println!("{} {}", "two", "words");
}`, options: ["two words", "two\nwords", "{} {}", "twowords"], answer: "two words", why: "Each {} is replaced by the next argument, and the space between them is an ordinary character in the string." },
        { q: "Why does println! end with an exclamation mark?", options: ["It is a macro, checked at compile time", "It prints a louder line", "It returns a number", "It is optional decoration"], answer: "It is a macro, checked at compile time", why: "The ! marks a macro. println! can reject a format string that does not match its arguments before the program runs." },
        { q: "Where does a Rust program start?", options: ["fn main", "start()", "begin", "println!"], answer: "fn main", why: "main is the entry point. println! only prints." },
        { kind: "output", q: "What does this print?", code: `fn main() {
    // println!("hidden");
    println!("shown");
}`, options: ["shown", "hidden\nshown", "// println!(\"hidden\");\nshown", "Nothing"], answer: "shown", why: "A line starting with // is a comment and never runs." },
      ],
    },
    {
      id: "names",
      title: "Names and mut",
      summary: "let, and why the default is immutable.",
      sections: [
        {
          p: "<code>let</code> gives a name to a value. By default the name cannot be pointed at a new value later. <code>let mut</code> allows that. Rust figures out the type from the value: <code>5</code> is an integer.",
          code: `fn main() {
    let nuts = 5;
    let mut more = nuts;
    more = more + 2;
    println!("{}", more);
}`,
          out: "7",
        },
        {
          h: "Shadowing",
          p: "You can <code>let</code> the same name again. That is a new binding, not a change to the old one, so it is allowed even without <code>mut</code>. The new binding can even have a different type.",
          code: `fn main() {
    let n = 3;
    let n = n + 1;
    println!("{}", n);
}`,
          out: "4",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fn main() {
    let mut n = 10;
    n = n - 3;
    println!("{}", n);
}`, options: ["7", "10", "13", "n"], answer: "7", why: "mut allows the assignment. n becomes 10 − 3." },
        { q: "Which line will the compiler reject?", options: ["let n = 1; n = 2;", "let mut n = 1; n = 2;", "let n = 1; let n = 2;", "let n = 1; println!(\"{}\", n);"], answer: "let n = 1; n = 2;", why: "Without mut, a name cannot be assigned again. Shadowing with a second let is a different, legal, thing." },
        { kind: "output", q: "What does this print?", code: `fn main() {
    let n = 2;
    let n = n * 5;
    println!("{}", n);
}`, options: ["10", "2", "5", "25"], answer: "10", why: "The second let hides the first. Its value is 2 * 5." },
        { q: "What does mut stand for?", options: ["The name may be assigned a new value", "The value is shared with other threads", "The value is a string", "The name is public"], answer: "The name may be assigned a new value", why: "mut means mutable. The default, without mut, is that the binding does not change." },
        { kind: "output", q: "What does this print?", code: `fn main() {
    let a = 1;
    let b = a + 1;
    println!("{} {}", a, b);
}`, options: ["1 2", "2 2", "1 1", "a b"], answer: "1 2", why: "a is still 1. b is a new name holding a + 1. Reading a does not use it up, because i32 is copied." },
      ],
    },
    {
      id: "choices",
      title: "Choices",
      summary: "if is an expression.",
      sections: [
        {
          p: "<code>if</code> does not use brackets around the test. The branch is a block. <code>==</code> compares; <code>=</code> assigns, and an assignment is not a test.",
          code: `fn main() {
    let nuts = 3;
    if nuts > 2 {
        println!("plenty");
    } else {
        println!("few");
    }
}`,
          out: "plenty",
        },
        {
          h: "if gives a value",
          p: "A block can end in an expression with no semicolon, and that expression is the block's value. So <code>if</code> can be used on the right of <code>let</code>. Both branches must produce the same type.",
          code: `fn main() {
    let n = 4;
    let word = if n > 3 { "mid" } else { "small" };
    println!("{}", word);
}`,
          out: "mid",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fn main() {
    let n = 2;
    if n == 2 {
        println!("yes");
    } else {
        println!("no");
    }
}`, options: ["yes", "no", "2", "yes\nno"], answer: "yes", why: "n == 2 is true, so only the first branch runs." },
        { kind: "output", q: "What does this print?", code: `fn main() {
    let n = 1;
    let label = if n > 5 { "big" } else { "small" };
    println!("{}", label);
}`, options: ["small", "big", "1", "small\nbig"], answer: "small", why: "1 is not greater than 5, so the else expression is the value of the if." },
        { q: "Which is a comparison?", options: ["n == 2", "n = 2", "let n == 2", "n := 2"], answer: "n == 2", why: "== compares. = is assignment, and it is not allowed as the test of if." },
        { q: "What must be true when if is used as a value?", options: ["Both branches produce the same type", "Both branches print something", "The test is always true", "The branches are empty"], answer: "Both branches produce the same type", why: "The if expression has one type. A branch that ends in a number and a branch that ends in text do not match." },
        { kind: "output", q: "What does this print?", code: `fn main() {
    let n = 4;
    if n > 5 {
        println!("big");
    } else if n > 3 {
        println!("mid");
    } else {
        println!("small");
    }
}`, options: ["mid", "big", "small", "big\nmid"], answer: "mid", why: "4 fails the first test and passes the second. The else is not reached." },
      ],
    },
    {
      id: "loops",
      title: "Loops",
      summary: "for, ranges and while.",
      sections: [
        {
          p: "<code>for</code> walks a range. <code>0..3</code> is 0, 1 and 2: the end is left out. <code>0..=3</code> includes 3. <code>print!</code> is <code>println!</code> without the newline. <code>continue</code> skips the rest of the current pass.",
          code: `fn main() {
    for i in 0..3 {
        println!("{}", i);
    }
}`,
          out: "0\n1\n2",
        },
        {
          h: "while",
          p: "<code>while</code> repeats while a test is true. Something in the test has to change, or the loop does not end.",
          code: `fn main() {
    let mut n = 3;
    while n > 0 {
        println!("{}", n);
        n = n - 1;
    }
}`,
          out: "3\n2\n1",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fn main() {
    for i in 1..=3 {
        print!("{}", i);
    }
    println!();
}`, options: ["123", "0123", "1\n2\n3", "123\n123"], answer: "123", why: "1..=3 includes 3. print! does not add a newline, so the digits sit on one line, and println!() ends it." },
        { kind: "output", q: "What does this print?", code: `fn main() {
    let mut n = 0;
    while n < 2 {
        print!("x");
        n = n + 1;
    }
    println!();
}`, options: ["xx", "x", "xxx", "x\nx"], answer: "xx", why: "The body runs for n = 0 and n = 1. Then n is 2 and the test fails." },
        { q: "What numbers are in 0..3?", options: ["0, 1 and 2", "0, 1, 2 and 3", "1, 2 and 3", "3 only"], answer: "0, 1 and 2", why: "A range written with .. leaves out the end. ..= would include it." },
        { q: "Why is n declared mut in the while example?", options: ["The loop assigns a new value to n", "while requires mut on every name", "n is shared with another thread", "println! needs mut"], answer: "The loop assigns a new value to n", why: "n = n - 1 changes the binding, so it must be mut. The test reads n; reading alone would not need mut." },
        { kind: "output", q: "What does this print?", code: `fn main() {
    for i in 0..4 {
        if i == 2 {
            continue;
        }
        print!("{}", i);
    }
    println!();
}`, options: ["013", "0123", "01", "23"], answer: "013", why: "continue skips the rest of this pass. 2 is not printed, then the loop goes on to 3." },
      ],
    },
    {
      id: "functions",
      title: "Functions and ownership",
      summary: "Parameters, return values, and one owner.",
      sections: [
        {
          p: "A function names its parameter types and, after <code>-&gt;</code>, its return type. The last expression of the body, with no semicolon, is the value returned. A semicolon would turn it into a statement that returns nothing.",
          code: `fn add(a: i32, b: i32) -> i32 {
    a + b
}
fn main() {
    println!("{}", add(2, 3));
}`,
          out: "5",
        },
        {
          h: "One owner",
          p: "A <code>String</code> has one owner. Assigning it to another name <b>moves</b> it: the old name may no longer be used. Integers are <code>Copy</code>, so assigning an <code>i32</code> copies it and both names stay usable. Passing <code>&amp;name</code> lends a reference without moving the string.",
          code: `fn main() {
    let name = String::from("ada");
    println!("{}", name);
    let n = 3;
    let m = n;
    println!("{} {}", n, m);
}`,
          out: "ada\n3 3",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fn twice(n: i32) -> i32 {
    n * 2
}
fn main() {
    println!("{}", twice(4));
}`, options: ["8", "4", "2", "44"], answer: "8", why: "twice returns n * 2, and the call passes 4. The missing semicolon means that expression is the return value." },
        { q: "Which function body returns the sum?", options: ["a + b", "a + b;", "return a + b;", "println!(\"{}\", a + b)"], answer: "a + b", why: "An expression without a semicolon is the block's value. A semicolon throws the value away. println! prints but returns ()." },
        { q: "What happens to a String when you assign it to a new name?", options: ["It moves, and the old name can no longer be used", "Both names share it freely", "It is copied, like an i32", "The program prints it"], answer: "It moves, and the old name can no longer be used", why: "String is not Copy. The new name becomes the owner. An i32 is copied instead, which is why both names still work for numbers." },
        { q: "What does &name pass to a function?", options: ["A borrow, leaving you as the owner", "The string, which you then lose", "A copy of every character", "Nothing; & is a comment"], answer: "A borrow, leaving you as the owner", why: "A reference lets the function look at the value without taking ownership." },
        { kind: "output", q: "What does this print?", code: `fn greet() {
    println!("hi");
}
fn main() {
    greet();
    greet();
}`, options: ["hi\nhi", "hi", "greet\ngreet", "hi hi"], answer: "hi\nhi", why: "A function with no -> returns (). Each call prints one line." },
      ],
    },
    {
      id: "borrowing",
      title: "Borrowing and references",
      summary: "Using a value without taking it.",
      sections: [
        {
          p: "Passing a <code>String</code> to a function moves it, and the caller can't use it any more. Usually you only want to let the function <b>look</b>. Writing <code>&amp;name</code> lends a <b>reference</b>, and the parameter type <code>&amp;String</code> (or better, <code>&amp;str</code>) says the function borrows. When the function returns, the loan ends and the owner carries on.",
          code: `fn letters(text: &str) -> usize {
    text.chars().count()
}

fn main() {
    let name = String::from("hazelnut");
    let n = letters(&name);
    println!("{} has {} letters", name, n);
    println!("a literal works too: {}", letters("acorn"));
}`,
          out: "hazelnut has 8 letters\na literal works too: 5",
        },
        {
          h: "Mutable borrows",
          p: "To let a function change a value, lend it with <code>&amp;mut</code>. Rust's central rule is that at any moment you may have <b>either</b> any number of shared references <b>or</b> exactly one mutable one, never both. That rule, checked by the compiler, is what rules out data races and many of C's pointer bugs.",
          code: `fn add_nuts(store: &mut Vec<u32>, n: u32) {
    store.push(n);
}

fn total(store: &Vec<u32>) -> u32 {
    store.iter().sum()
}

fn main() {
    let mut store = vec![3, 5];
    add_nuts(&mut store, 7);
    add_nuts(&mut store, 1);
    let first = &store[0];
    let last = &store[store.len() - 1];
    println!("first {}, last {}, total {}", first, last, total(&store));
}`,
          out: "first 3, last 1, total 16",
        },
        {
          h: "Slices",
          p: "A <b>slice</b> borrows part of a collection: <code>&amp;v[1..3]</code> is elements 1 and 2 of a vector, and <code>&amp;s[0..3]</code> is the first three bytes of a string. A <code>&amp;str</code> is a string slice. Functions that take slices work with whole collections and parts of them alike.",
          code: `fn biggest(values: &[i32]) -> i32 {
    let mut best = values[0];
    for &v in values {
        if v > best {
            best = v;
        }
    }
    best
}

fn main() {
    let days = [4, 9, 2, 12, 6];
    println!("{}", biggest(&days));
    println!("{}", biggest(&days[2..]));
    let tree = String::from("sycamore");
    let start: &str = &tree[0..3];
    println!("{}", start);
}`,
          out: "12\n12\nsyc",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fn shout(s: &mut String) {
    s.push('!');
}

fn main() {
    let mut s = String::from("nuts");
    shout(&mut s);
    shout(&mut s);
    println!("{}", s);
}`, options: ["nuts!!", "nuts!", "nuts", "!nuts!"], answer: "nuts!!", why: "Each call borrows s mutably and adds one character." },
        { kind: "output", q: "What does this print?", code: `fn main() {
    let v = vec![10, 20, 30, 40];
    let part = &v[1..3];
    println!("{} {}", part.len(), part[0]);
}`, options: ["2 20", "3 20", "2 10", "3 10"], answer: "2 20", why: "1..3 includes index 1 but not 3, so the slice is [20, 30]." },
        { q: "Which borrows can exist at the same time?", options: ["Many shared (&) references, or one mutable (&mut) reference", "Any number of each", "One shared and one mutable", "Only one reference of any kind"], answer: "Many shared (&) references, or one mutable (&mut) reference", why: "Readers can share, but a writer needs exclusive access." },
      ],
    },
    {
      id: "structs",
      title: "Structs and methods",
      summary: "Your own types, with impl blocks.",
      sections: [
        {
          p: "A <code>struct</code> groups named fields. Methods go in an <code>impl</code> block. A method's first parameter says how it uses the value: <code>&amp;self</code> to read, <code>&amp;mut self</code> to change it. A function in the block without <code>self</code>, such as <code>new</code>, is called with <code>::</code> and is often used as a constructor.",
          code: `struct Squirrel {
    name: String,
    nuts: u32,
}

impl Squirrel {
    fn new(name: &str) -> Squirrel {
        Squirrel { name: name.to_string(), nuts: 0 }
    }

    fn gather(&mut self, found: u32) {
        self.nuts += found;
    }

    fn report(&self) -> String {
        format!("{} has {} nuts", self.name, self.nuts)
    }
}

fn main() {
    let mut sam = Squirrel::new("Sam");
    sam.gather(4);
    sam.gather(6);
    println!("{}", sam.report());
}`,
          out: "Sam has 10 nuts",
        },
        {
          h: "Deriving traits",
          p: "<code>#[derive(...)]</code> asks the compiler to write common behaviour for you. <code>Debug</code> lets <code>{:?}</code> print the value, <code>Clone</code> adds <code>.clone()</code>, and <code>PartialEq</code> adds <code>==</code>. Struct update syntax, <code>..other</code>, fills the remaining fields from another value.",
          code: `#[derive(Debug, Clone, PartialEq)]
struct Tree {
    kind: String,
    height: f64,
    nuts: u32,
}

fn main() {
    let oak = Tree { kind: "oak".to_string(), height: 18.5, nuts: 120 };
    let twin = oak.clone();
    let young = Tree { height: 2.0, nuts: 0, ..oak.clone() };
    println!("{:?}", young);
    println!("{}", oak == twin);
    println!("{}", oak == young);
}`,
          out: "Tree { kind: \"oak\", height: 2.0, nuts: 0 }\ntrue\nfalse",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `struct Counter {
    n: u32,
}

impl Counter {
    fn tick(&mut self) -> u32 {
        self.n += 1;
        self.n
    }
}

fn main() {
    let mut c = Counter { n: 0 };
    c.tick();
    c.tick();
    println!("{}", c.tick());
}`, options: ["3", "1", "2", "0"], answer: "3", why: "Each tick adds one and returns the new count." },
        { q: "What does &mut self in a method's parameters mean?", options: ["The method may change the value it is called on", "The method takes ownership and destroys the value", "The method can only read", "The method is a constructor"], answer: "The method may change the value it is called on", why: "&self reads, &mut self changes, and self (without &) takes ownership." },
        { q: "What does #[derive(Debug)] give you?", options: ["The ability to print the value with {:?}", "Automatic error handling", "A faster compile", "A default constructor"], answer: "The ability to print the value with {:?}", why: "The compiler writes the formatting code for every field." },
      ],
    },
    {
      id: "enums",
      title: "Enums, match and Option",
      summary: "A value that is one of several kinds.",
      sections: [
        {
          p: "A Rust <code>enum</code> lists the kinds a value can be, and each kind can carry its own data. <code>match</code> picks code for each kind and pulls the data out. The compiler checks that every kind is handled, so adding a new one shows you every place that needs updating.",
          code: `enum Find {
    Nothing,
    Nuts(u32),
    Seeds { kind: String, count: u32 },
}

fn describe(f: &Find) -> String {
    match f {
        Find::Nothing => "nothing today".to_string(),
        Find::Nuts(1) => "a single nut".to_string(),
        Find::Nuts(n) => format!("{} nuts", n),
        Find::Seeds { kind, count } => format!("{} {} seeds", count, kind),
    }
}

fn main() {
    let days = vec![
        Find::Nuts(5),
        Find::Nothing,
        Find::Seeds { kind: "sunflower".to_string(), count: 12 },
        Find::Nuts(1),
    ];
    for d in &days {
        println!("{}", describe(d));
    }
}`,
          out: "5 nuts\nnothing today\n12 sunflower seeds\na single nut",
        },
        {
          h: "Option instead of null",
          p: "Rust has no null. A value that may be missing has type <code>Option&lt;T&gt;</code>, an enum with two kinds: <code>Some(value)</code> or <code>None</code>. You can't use the value without handling <code>None</code> first, with <code>match</code>, <code>if let</code>, or a helper such as <code>unwrap_or</code>.",
          code: `fn find_tree<'a>(trees: &[&'a str], first: char) -> Option<&'a str> {
    for t in trees {
        if t.starts_with(first) {
            return Some(t);
        }
    }
    None
}

fn main() {
    let trees = ["oak", "beech", "hazel"];
    match find_tree(&trees, 'b') {
        Some(t) => println!("found {}", t),
        None => println!("none"),
    }
    if let Some(t) = find_tree(&trees, 'h') {
        println!("{} has {} letters", t, t.len());
    }
    println!("{}", find_tree(&trees, 'z').unwrap_or("no tree"));
    let first = trees.first().map(|t| t.to_uppercase());
    println!("{:?}", first);
}`,
          out: "found beech\nhazel has 5 letters\nno tree\nSome(\"OAK\")",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fn main() {
    let a: Option<u32> = Some(4);
    let b: Option<u32> = None;
    println!("{} {}", a.unwrap_or(0) * 2, b.unwrap_or(7));
}`, options: ["8 7", "8 0", "4 7", "0 7"], answer: "8 7", why: "a holds 4, so 4 * 2 = 8; b is None, so unwrap_or gives 7." },
        { kind: "output", q: "What does this print?", code: `enum Light {
    Red,
    Amber,
    Green,
}

fn main() {
    let l = Light::Amber;
    let s = match l {
        Light::Red => "stop",
        Light::Amber => "wait",
        Light::Green => "go",
    };
    println!("{}", s);
}`, options: ["wait", "stop", "go", "Amber"], answer: "wait", why: "match is an expression; the Amber arm gives \"wait\"." },
        { q: "What happens if a match does not handle every kind of an enum?", options: ["The program does not compile", "The missing cases do nothing", "It panics at run time", "It returns None"], answer: "The program does not compile", why: "Matches must be exhaustive; _ can stand for all remaining kinds." },
      ],
    },
    {
      id: "errors",
      title: "Errors with Result and ?",
      summary: "Failures you have to deal with.",
      sections: [
        {
          p: "Operations that can fail return <code>Result&lt;T, E&gt;</code>: <code>Ok(value)</code> on success or <code>Err(error)</code> on failure. Turning text into a number with <code>parse</code> is one. As with <code>Option</code>, the compiler makes you look at the result before using the value.",
          code: `fn main() {
    for text in ["42", "forty-two", "-3"] {
        match text.parse::<u32>() {
            Ok(n) => println!("{} -> {}", text, n),
            Err(e) => println!("{} -> error: {}", text, e),
        }
    }
}`,
          out: "42 -> 42\nforty-two -> error: invalid digit found in string\n-3 -> error: invalid digit found in string",
        },
        {
          h: "Passing errors on with ?",
          p: "Inside a function that itself returns <code>Result</code>, the <code>?</code> operator means: if this is an <code>Err</code>, return it from the function now; otherwise take the value out and carry on. That keeps the happy path readable. You can define your own error type, often an enum, and <code>map_err</code> converts one error into another.",
          code: `#[derive(Debug)]
enum TakeError {
    NotANumber(String),
    TooMany { asked: u32, stored: u32 },
}

fn take(stored: u32, request: &str) -> Result<u32, TakeError> {
    let asked: u32 = request
        .trim()
        .parse()
        .map_err(|_| TakeError::NotANumber(request.to_string()))?;
    if asked > stored {
        return Err(TakeError::TooMany { asked, stored });
    }
    Ok(stored - asked)
}

fn main() {
    println!("{:?}", take(10, " 4 "));
    println!("{:?}", take(10, "lots"));
    println!("{:?}", take(10, "12"));
}`,
          out: "Ok(6)\nErr(NotANumber(\"lots\"))\nErr(TooMany { asked: 12, stored: 10 })",
        },
        {
          h: "When to panic",
          p: "<code>unwrap()</code> takes the value out of an <code>Ok</code> or <code>Some</code> and <b>panics</b>, stopping the program, if there is none. <code>expect(\"message\")</code> does the same with a clearer message. Use them in quick experiments and where failure would be a bug in your own code, and return a <code>Result</code> where the failure comes from outside, such as user input or a missing file.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fn half(n: i32) -> Result<i32, String> {
    if n % 2 == 0 {
        Ok(n / 2)
    } else {
        Err(format!("{} is odd", n))
    }
}

fn quarter(n: i32) -> Result<i32, String> {
    let h = half(n)?;
    half(h)
}

fn main() {
    println!("{:?} {:?}", quarter(12), quarter(6));
}`, options: ["Ok(3) Err(\"3 is odd\")", "Ok(3) Ok(1)", "Ok(3) Err(\"6 is odd\")", "Ok(6) Ok(3)"], answer: "Ok(3) Err(\"3 is odd\")", why: "12 halves to 6 and then to 3. 6 halves to 3, and halving 3 fails, so quarter returns that Err." },
        { q: "What does ? do on an Err value?", options: ["Returns that error from the current function", "Panics", "Replaces it with a default", "Ignores it"], answer: "Returns that error from the current function", why: "On Ok it unwraps the value; on Err it returns early." },
        { q: "Where is unwrap() a reasonable choice?", options: ["In quick experiments, or where failure would be a bug in your own code", "When reading user input", "When opening files chosen by the user", "Never, it does not compile"], answer: "In quick experiments, or where failure would be a bug in your own code", why: "For failures that come from outside, return a Result so the caller can decide." },
      ],
    },
    {
      id: "collections",
      title: "Collections, iterators and closures",
      summary: "Vec, HashMap, and chains of iterator methods.",
      sections: [
        {
          p: "A <b>closure</b> is a function written in place: <code>|n| n * 2</code>. Iterators take closures in methods such as <code>filter</code>, <code>map</code> and <code>sum</code>. The chain does nothing until something consumes it, such as <code>sum</code>, <code>count</code> or <code>collect</code>, which builds a new collection.",
          code: `fn main() {
    let days = vec![5, 12, 3, 8, 15, 1];
    let big: Vec<u32> = days.iter().filter(|&&n| n > 4).cloned().collect();
    println!("{:?}", big);
    let doubled: Vec<u32> = days.iter().map(|n| n * 2).collect();
    println!("{:?}", doubled);
    let total: u32 = days.iter().sum();
    let best = days.iter().max().unwrap();
    println!("total {}, best {}", total, best);
    let limit = 10;
    let over = days.iter().filter(|&&n| n > limit).count();
    println!("{} days over {}", over, limit);
    for (i, n) in days.iter().enumerate().take(2) {
        println!("day {}: {}", i + 1, n);
    }
}`,
          out: "[5, 12, 8, 15]\n[10, 24, 6, 16, 30, 2]\ntotal 44, best 15\n2 days over 10\nday 1: 5\nday 2: 12",
        },
        {
          h: "HashMap and the entry API",
          p: "<code>HashMap</code> stores values by key. <code>entry(key).or_insert(0)</code> gives a mutable reference to the value for a key, inserting 0 first if it is missing, which makes counting a one-liner. A hash map keeps no particular order, so copy the pairs into a <code>Vec</code> and sort them before printing.",
          code: `use std::collections::HashMap;

fn main() {
    let finds = ["acorn", "hazelnut", "acorn", "walnut", "acorn", "hazelnut"];
    let mut counts: HashMap<&str, u32> = HashMap::new();
    for f in finds {
        *counts.entry(f).or_insert(0) += 1;
    }
    let mut rows: Vec<(&str, u32)> = counts.into_iter().collect();
    rows.sort_by(|a, b| b.1.cmp(&a.1).then(a.0.cmp(b.0)));
    for (nut, n) in &rows {
        println!("{:<9}{}", nut, n);
    }
}`,
          out: "acorn    3\nhazelnut 2\nwalnut   1",
        },
        {
          h: "Strings",
          p: "<code>String</code> is growable, owned text; <code>&amp;str</code> is borrowed text. Both are UTF-8, so <code>len()</code> counts bytes and <code>chars()</code> walks real characters. <code>split_whitespace</code>, <code>to_uppercase</code>, <code>contains</code> and <code>format!</code> cover most daily needs.",
          code: `fn main() {
    let line = "the squirrel buried an acorn";
    let words: Vec<&str> = line.split_whitespace().collect();
    println!("{} words, longest: {}", words.len(), words.iter().max_by_key(|w| w.len()).unwrap());
    let caps: Vec<String> = words.iter().map(|w| w.to_uppercase()).collect();
    println!("{}", caps.join("-"));
    let word = "naïve";
    println!("{} bytes, {} chars", word.len(), word.chars().count());
    println!("{}", line.contains("acorn"));
}`,
          out: "5 words, longest: squirrel\nTHE-SQUIRREL-BURIED-AN-ACORN\n6 bytes, 5 chars\ntrue",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fn main() {
    let v = vec![1, 2, 3, 4, 5, 6];
    let s: i32 = v.iter().filter(|&&n| n % 2 == 0).map(|n| n * 10).sum();
    println!("{}", s);
}`, options: ["120", "21", "12", "60"], answer: "120", why: "The even numbers 2, 4 and 6 become 20, 40 and 60, which add up to 120." },
        { kind: "output", q: "What does this print?", code: `use std::collections::HashMap;

fn main() {
    let mut m = HashMap::new();
    for w in ["a", "b", "a", "a"] {
        *m.entry(w).or_insert(0) += 1;
    }
    println!("{} {}", m["a"], m.len());
}`, options: ["3 2", "3 4", "1 2", "2 2"], answer: "3 2", why: "\"a\" appears three times, and there are two different keys." },
        { q: "When does a chain like v.iter().map(...).filter(...) do its work?", options: ["Only when something consumes it, such as sum, count or collect", "As soon as map is called", "When the program starts", "Never; it must be in a for loop"], answer: "Only when something consumes it, such as sum, count or collect", why: "Iterators are lazy, which also lets them stop early with take." },
      ],
    },
    {
      id: "traits",
      title: "Traits and generics",
      summary: "Shared behaviour, and code that works for many types.",
      sections: [
        {
          p: "A <b>trait</b> names behaviour that types can share, like an interface in other languages. Each type implements it in an <code>impl Trait for Type</code> block. A trait can give a <b>default</b> method that types get for free. Implementing the standard <code>Display</code> trait lets a type be printed with <code>{}</code>.",
          code: `use std::fmt;

trait Store {
    fn name(&self) -> String;
    fn capacity(&self) -> u32;
    fn describe(&self) -> String {
        format!("{} holds {}", self.name(), self.capacity())
    }
}

struct Hollow;
struct Burrow {
    depth: u32,
}

impl Store for Hollow {
    fn name(&self) -> String {
        "tree hollow".to_string()
    }
    fn capacity(&self) -> u32 {
        120
    }
}

impl Store for Burrow {
    fn name(&self) -> String {
        format!("burrow {} cm deep", self.depth)
    }
    fn capacity(&self) -> u32 {
        self.depth * 2
    }
}

impl fmt::Display for Burrow {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Burrow({})", self.depth)
    }
}

fn main() {
    println!("{}", Hollow.describe());
    let b = Burrow { depth: 30 };
    println!("{}", b.describe());
    println!("{}", b);
}`,
          out: "tree hollow holds 120\nburrow 30 cm deep holds 60\nBurrow(30)",
        },
        {
          h: "Generic functions and trait objects",
          p: "A generic function such as <code>fn largest&lt;T: PartialOrd + Copy&gt;</code> works for any type with the listed traits; the compiler makes a fast copy for each type it is used with. When a collection must hold <i>different</i> types that share a trait, use a <b>trait object</b>, <code>Box&lt;dyn Store&gt;</code>, and the right method is chosen while the program runs.",
          code: `trait Sound {
    fn sound(&self) -> &str;
}

struct Squirrel;
struct Owl;

impl Sound for Squirrel {
    fn sound(&self) -> &str {
        "chitter"
    }
}

impl Sound for Owl {
    fn sound(&self) -> &str {
        "hoot"
    }
}

fn largest<T: PartialOrd + Copy>(items: &[T]) -> T {
    let mut best = items[0];
    for &i in items {
        if i > best {
            best = i;
        }
    }
    best
}

fn main() {
    println!("{} {}", largest(&[3, 9, 4]), largest(&[1.5, 0.2]));
    let wood: Vec<Box<dyn Sound>> = vec![Box::new(Squirrel), Box::new(Owl), Box::new(Squirrel)];
    let sounds: Vec<&str> = wood.iter().map(|a| a.sound()).collect();
    println!("{}", sounds.join(" "));
}`,
          out: "9 1.5\nchitter hoot chitter",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `trait Greet {
    fn name(&self) -> String;
    fn hello(&self) -> String {
        format!("hi {}", self.name())
    }
}

struct Sam;

impl Greet for Sam {
    fn name(&self) -> String {
        "Sam".to_string()
    }
}

fn main() {
    println!("{}", Sam.hello());
}`, options: ["hi Sam", "Sam", "hi", "It does not compile"], answer: "hi Sam", why: "Sam only supplies name; hello comes from the trait's default." },
        { q: "When do you need Box<dyn Trait> instead of a generic T: Trait?", options: ["When one collection must hold values of different types", "Whenever a trait has methods", "When the types are numbers", "Never; they are the same"], answer: "When one collection must hold values of different types", why: "A Vec<T> holds one type; a Vec<Box<dyn Trait>> can mix any types that implement the trait." },
        { q: "What does implementing fmt::Display for a type allow?", options: ["Printing it with {} in println! and format!", "Comparing it with ==", "Copying it", "Sorting it"], answer: "Printing it with {} in println! and format!", why: "{:?} needs Debug; {} needs Display." },
      ],
    },
    {
      id: "project",
      title: "Project: a nut ledger",
      summary: "Structs, enums, Result, HashMap and iterators together.",
      sections: [
        {
          p: "This program reads a small ledger written as text, one entry per line, such as <code>day 3: acorn x9</code>. It parses each line into a struct, collecting errors for bad lines instead of stopping, totals each kind of nut in a <code>HashMap</code>, and prints a sorted report. Notice how <code>?</code> keeps the parser short, and how <code>split_once</code> returns an <code>Option</code> that <code>ok_or</code> turns into an error.",
          code: `use std::collections::HashMap;

#[derive(Debug)]
struct Entry {
    day: u32,
    nut: String,
    count: u32,
}

fn parse(line: &str) -> Result<Entry, String> {
    let (day_part, rest) = line.split_once(':').ok_or("missing ':'")?;
    let day = day_part
        .trim()
        .strip_prefix("day ")
        .ok_or("line must start with 'day'")?
        .parse::<u32>()
        .map_err(|e| format!("bad day: {}", e))?;
    let (nut, count) = rest.trim().split_once(" x").ok_or("missing ' x'")?;
    let count = count.parse::<u32>().map_err(|e| format!("bad count: {}", e))?;
    Ok(Entry { day, nut: nut.to_string(), count })
}

fn main() {
    let ledger = "day 1: acorn x6
day 1: hazelnut x2
day 2: walnut x1
day two: acorn x3
day 3: acorn x9
day 3: hazelnut x4
day 4 acorn x5";

    let mut entries = Vec::new();
    for (i, line) in ledger.lines().enumerate() {
        match parse(line) {
            Ok(e) => entries.push(e),
            Err(msg) => println!("line {} skipped: {}", i + 1, msg),
        }
    }

    let mut totals: HashMap<&str, u32> = HashMap::new();
    for e in &entries {
        *totals.entry(e.nut.as_str()).or_insert(0) += e.count;
    }
    let mut rows: Vec<_> = totals.into_iter().collect();
    rows.sort_by(|a, b| b.1.cmp(&a.1).then(a.0.cmp(b.0)));

    let all: u32 = entries.iter().map(|e| e.count).sum();
    for (nut, n) in &rows {
        println!("{:<9}{:>3} {:>5.1}%", nut, n, 100.0 * *n as f64 / all as f64);
    }
    let best = entries.iter().max_by_key(|e| e.count).unwrap();
    println!("best find: {} {} on day {}", best.count, best.nut, best.day);
}`,
          out: "line 4 skipped: bad day: invalid digit found in string\nline 7 skipped: missing ':'\nacorn     15  68.2%\nhazelnut   6  27.3%\nwalnut     1   4.5%\nbest find: 9 acorn on day 3",
        },
        {
          h: "Ideas to try",
          p: "Read the ledger from a file with <code>std::fs::read_to_string</code> (which returns a <code>Result</code> too), replace the <code>String</code> errors with an error enum, or add a <code>Display</code> implementation for <code>Entry</code> so it can print itself.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `fn main() {
    let line = "oak: 12";
    match line.split_once(": ") {
        Some((tree, n)) => println!("{} {}", n, tree),
        None => println!("none"),
    }
}`, options: ["12 oak", "oak 12", "none", "oak: 12"], answer: "12 oak", why: "split_once returns the parts before and after the first \": \", and the program prints them swapped." },
        { q: "Why does the program collect errors per line instead of using ? in main?", options: ["So one bad line is reported and skipped instead of stopping the whole report", "Because ? only works in main", "Because Result cannot be printed", "To make it faster"], answer: "So one bad line is reported and skipped instead of stopping the whole report", why: "? passes the error up; here main decides to log it and carry on." },
        { q: "What does ok_or do?", options: ["Turns an Option into a Result, using the given error for None", "Unwraps or panics", "Turns a Result into an Option", "Returns true when the value is Some"], answer: "Turns an Option into a Result, using the given error for None", why: "That lets ? be used on Options inside a function that returns Result." },
      ],
    },
  ],
};
