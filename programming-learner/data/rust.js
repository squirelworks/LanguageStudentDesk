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
  ],
};
