// Go course for the Programming Learner. Written for this project.
// Examples are complete programs. tools/run_go.py runs them with `go run`
// and checks the printed output.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.go = {
  id: "go",
  name: "Go",
  title: "Go from the first line",
  intro:
    "Go is a small language from Google for programs that stay running: servers, tools and services. It compiles quickly, has a garbage collector, and keeps the grammar short on purpose. These lessons cover printing, names, choices, the one looping keyword, functions and slices. Every example is a whole program and shows exactly what it prints. To run one yourself, save it as <code>hello.go</code> and type <code>go run hello.go</code>.",
  comment: "//",
  keywords: ["package", "import", "func", "var", "if", "else", "for", "return", "range"],
  builtins: ["println", "main", "fmt", "Println", "Printf"],
  lessons: [
    {
      id: "first",
      title: "Your first program",
      summary: "package, import and fmt.Println.",
      sections: [
        {
          p: "Every file starts with <code>package</code>. A program you can run is <code>package main</code> and has <code>func main</code>. <code>fmt.Println</code> prints its arguments separated by spaces, then a newline. The import path is a string.",
          code: `package main
import "fmt"
func main() {
    fmt.Println("Hello, squirrel!")
    fmt.Println("Nuts are ready.")
}`,
          out: "Hello, squirrel!\nNuts are ready.",
        },
        {
          h: "Printf",
          p: "<code>fmt.Printf</code> does not add a newline. <code>%d</code> is an integer and <code>%s</code> is a string. <code>\\n</code> starts the next line.",
          code: `package main
import "fmt"
func main() {
    fmt.Printf("I have %d acorns\\n", 3)
}`,
          out: "I have 3 acorns",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `package main
import "fmt"
func main() {
    fmt.Println("Up", "the", "tree")
}`, options: ["Up the tree", "Upthetree", "Up\nthe\ntree", "\"Up\" \"the\" \"tree\""], answer: "Up the tree", why: "Println puts a space between arguments and a newline after them. The quotes are not printed." },
        { kind: "output", q: "What does this print?", code: `package main
import "fmt"
func main() {
    // fmt.Println("hidden")
    fmt.Println("shown")
}`, options: ["shown", "hidden\nshown", "// fmt.Println(\"hidden\")\nshown", "Nothing"], answer: "shown", why: "A line starting with // is a comment and never runs." },
        { q: "Which package can you run with go run?", options: ["package main", "package fmt", "package hello", "package lib"], answer: "package main", why: "main is the package the go command builds into a program. Other names are libraries." },
        { q: "What is the difference between Println and Printf?", options: ["Println adds spaces and a newline; Printf follows the format string", "Printf is for numbers only", "Println cannot print numbers", "They print the same thing"], answer: "Println adds spaces and a newline; Printf follows the format string", why: "Printf prints exactly the format you write, including whether there is a newline." },
        { kind: "output", q: "What does this print?", code: `package main
import "fmt"
func main() {
    fmt.Printf("%s-%s\\n", "a", "b")
}`, options: ["a-b", "a b", "a\nb", "%s-%s"], answer: "a-b", why: "Each %s is replaced by the next string. The hyphen is an ordinary character." },
      ],
    },
    {
      id: "names",
      title: "Names",
      summary: "var and :=.",
      sections: [
        {
          p: "<code>var</code> declares a name. Inside a function, <code>:=</code> is a shorter form that both declares and assigns, and Go infers the type. <code>=</code> assigns to a name that already exists.",
          code: `package main
import "fmt"
func main() {
    nuts := 5
    nuts = nuts + 2
    fmt.Println(nuts)
}`,
          out: "7",
        },
        {
          h: "Zero values",
          p: "A <code>var</code> with no value starts at the zero for its type: <code>0</code> for a number, <code>\"\"</code> for a string, <code>false</code> for a bool. Go does not leave a number uninitialized.",
          code: `package main
import "fmt"
func main() {
    var n int
    fmt.Println(n)
}`,
          out: "0",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `package main
import "fmt"
func main() {
    n := 10
    n = n - 3
    fmt.Println(n)
}`, options: ["7", "10", "13", "n"], answer: "7", why: ":= declares n. The next line assigns n - 3 back to it." },
        { kind: "output", q: "What does this print?", code: `package main
import "fmt"
func main() {
    var s string
    fmt.Printf(\"[%s]\\n\", s)
}`, options: ["[]", "[string]", "[nil]", "[0]"], answer: "[]", why: "A string's zero value is empty, so the brackets have nothing between them." },
        { q: "Which line declares a new name and stores 4 in it?", options: ["n := 4", "n = 4", "var = 4", "let n = 4"], answer: "n := 4", why: ":= declares and assigns. = only assigns, and it needs a name that already exists." },
        { q: "What is the zero value of an int?", options: ["0", "nil", "undefined", "1"], answer: "0", why: "Numbers start at zero. There is no undefined." },
        { kind: "output", q: "What does this print?", code: `package main
import "fmt"
func main() {
    a := 1
    b := a + 1
    fmt.Println(a, b)
}`, options: ["1 2", "2 2", "1 1", "a b"], answer: "1 2", why: "a stays 1. b is a new name holding a + 1. Println puts a space between them." },
      ],
    },
    {
      id: "choices",
      title: "Choices",
      summary: "if without brackets.",
      sections: [
        {
          p: "<code>if</code> does not use brackets around the test. The body is always a block. <code>==</code> compares; <code>=</code> assigns.",
          code: `package main
import "fmt"
func main() {
    nuts := 3
    if nuts > 2 {
        fmt.Println("plenty")
    } else {
        fmt.Println("few")
    }
}`,
          out: "plenty",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `package main
import "fmt"
func main() {
    n := 2
    if n == 2 {
        fmt.Println("yes")
    } else {
        fmt.Println("no")
    }
}`, options: ["yes", "no", "2", "yes\nno"], answer: "yes", why: "n == 2 is true, so only the first branch runs." },
        { kind: "output", q: "What does this print?", code: `package main
import "fmt"
func main() {
    n := 4
    if n > 5 {
        fmt.Println("big")
    } else if n > 3 {
        fmt.Println("mid")
    } else {
        fmt.Println("small")
    }
}`, options: ["mid", "big", "small", "big\nmid"], answer: "mid", why: "4 fails the first test and passes the second." },
        { q: "Which is a comparison?", options: ["n == 2", "n = 2", "n := 2", "n eq 2"], answer: "n == 2", why: "== compares. = assigns. := declares." },
        { q: "What surrounds the body of an if?", options: ["Braces, which are required", "Indentation only", "Parentheses", "A semicolon"], answer: "Braces, which are required", why: "Go always uses braces for the body, even for a single line. There are no brackets around the test." },
        { kind: "output", q: "What does this print?", code: `package main
import "fmt"
func main() {
    n := 0
    if n == 0 {
        fmt.Println("zero")
    }
}`, options: ["zero", "0", "Nothing", "false"], answer: "zero", why: "The test succeeds, so the block runs. There is no else." },
      ],
    },
    {
      id: "loops",
      title: "The one loop",
      summary: "for does every kind of repetition.",
      sections: [
        {
          p: "Go has no <code>while</code> and no <code>do</code>. <code>for</code> covers all of them. The three-part form is start, test, step. <code>fmt.Print</code> does not add a newline. <code>continue</code> skips the rest of the current pass.",
          code: `package main
import "fmt"
func main() {
    for i := 0; i < 3; i++ {
        fmt.Println(i)
    }
}`,
          out: "0\n1\n2",
        },
        {
          h: "for as while",
          p: "A <code>for</code> with only a test repeats while the test is true. <code>range</code> walks a collection.",
          code: `package main
import "fmt"
func main() {
    n := 3
    for n > 0 {
        fmt.Println(n)
        n = n - 1
    }
}`,
          out: "3\n2\n1",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `package main
import "fmt"
func main() {
    for i := 1; i <= 3; i++ {
        fmt.Print(i)
    }
    fmt.Println()
}`, options: ["123", "012", "1\n2\n3", "123\n123"], answer: "123", why: "i runs through 1, 2 and 3. Print adds no newline, and Println() adds one at the end." },
        { kind: "output", q: "What does this print?", code: `package main
import "fmt"
func main() {
    word := "go"
    for _, ch := range word {
        fmt.Printf("%c", ch)
    }
    fmt.Println()
}`, options: ["go", "g\no", "0 1", "word"], answer: "go", why: "range on a string yields each byte's index and the rune. The index is ignored with _. %c prints the character." },
        { q: "How do you write a while loop in Go?", options: ["for with only a test", "while (test)", "loop test", "do test"], answer: "for with only a test", why: "for is the only looping keyword. for n > 0 { } is the while shape." },
        { q: "What does i++ do?", options: ["Adds 1 to i, as a statement", "Returns i + 1 as a value you can embed anywhere", "Compares i to 1", "Declares i"], answer: "Adds 1 to i, as a statement", why: "++ is a statement in Go, not an expression. You cannot write n = i++." },
        { kind: "output", q: "What does this print?", code: `package main
import "fmt"
func main() {
    for i := 0; i < 4; i++ {
        if i == 2 {
            continue
        }
        fmt.Print(i)
    }
    fmt.Println()
}`, options: ["013", "0123", "01", "23"], answer: "013", why: "continue skips the rest of this pass. 2 is not printed." },
      ],
    },
    {
      id: "functions",
      title: "Functions and slices",
      summary: "Multiple results, and a slice's length.",
      sections: [
        {
          p: "Parameter types come after the names. The return type comes after the parameter list. A function can return more than one value; the usual second value is an error, ignored here with <code>_</code>.",
          code: `package main
import "fmt"
func add(a int, b int) int {
    return a + b
}
func main() {
    fmt.Println(add(2, 3))
}`,
          out: "5",
        },
        {
          h: "Slices",
          p: "A slice is a view of a row of values. <code>len</code> is the number of elements. Indexes start at 0. The slice literal <code>[]int{10, 20, 30}</code> builds one.",
          code: `package main
import "fmt"
func main() {
    nums := []int{10, 20, 30}
    fmt.Println(len(nums), nums[1])
}`,
          out: "3 20",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `package main
import "fmt"
func twice(n int) int {
    return n * 2
}
func main() {
    fmt.Println(twice(4))
}`, options: ["8", "4", "2", "44"], answer: "8", why: "twice returns n * 2, called with 4." },
        { kind: "output", q: "What does this print?", code: `package main
import "fmt"
func main() {
    nums := []int{5, 6, 7}
    fmt.Println(nums[0], len(nums))
}`, options: ["5 3", "6 3", "5 2", "7 3"], answer: "5 3", why: "Index 0 is the first element. len counts all three." },
        { q: "Where is the return type written?", options: ["After the parameter list", "Before the function name", "Inside the parameter list", "It is not written"], answer: "After the parameter list", why: "func add(a int, b int) int — the final int is what comes back." },
        { q: "What is nums[1] in []int{10, 20, 30}?", options: ["20", "10", "30", "1"], answer: "20", why: "Indexes start at 0, so 1 is the second element." },
        { kind: "output", q: "What does this print?", code: `package main
import "fmt"
func greet() {
    fmt.Println("hi")
}
func main() {
    greet()
    greet()
}`, options: ["hi\nhi", "hi", "greet\ngreet", "hi hi"], answer: "hi\nhi", why: "A function with no result type returns nothing. Each call prints one line." },
      ],
    },
  ],
};
