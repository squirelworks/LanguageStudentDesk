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
    {
      id: "collections",
      title: "Slices and maps in depth",
      summary: "append, sharing, ranges and maps.",
      sections: [
        {
          p: "A slice is a window onto an underlying array: it has a <b>length</b> (how many elements you can see) and a <b>capacity</b> (how far the array goes). <code>append</code> adds to the end and returns the slice, growing the array when it is full, so always write <code>s = append(s, x)</code>. <code>range</code> gives the index and the value of each element; use <code>_</code> for the one you don't need.",
          code: `package main

import "fmt"

func main() {
	var nuts []int
	for i := 1; i <= 5; i++ {
		nuts = append(nuts, i*i)
	}
	fmt.Println(nuts, len(nuts))
	total := 0
	for _, n := range nuts {
		total += n
	}
	fmt.Println("total", total)
	firstTwo := nuts[:2]
	fmt.Println(firstTwo, nuts[3:])
}`,
          out: "[1 4 9 16 25] 5\ntotal 55\n[1 4] [16 25]",
        },
        {
          h: "Slices share their array",
          p: "Slicing does not copy. Two slices of the same array see each other's changes, which is fast but can surprise you. <code>copy</code> or <code>slices.Clone</code> makes an independent copy when you need one.",
          code: `package main

import (
	"fmt"
	"slices"
)

func main() {
	days := []int{4, 9, 2, 7}
	view := days[1:3]
	view[0] = 99
	fmt.Println(days)
	own := slices.Clone(days)
	own[0] = 0
	fmt.Println(days[0], own[0])
	slices.Sort(own)
	fmt.Println(own, slices.Contains(own, 7))
}`,
          out: "[4 99 2 7]\n4 0\n[0 2 7 99] true",
        },
        {
          h: "Maps",
          p: "A map stores values by key: <code>map[string]int</code>. Reading a missing key gives the zero value; the two-value form <code>v, ok := m[k]</code> tells you whether it was there. <code>delete</code> removes a key. Go deliberately visits map entries in a random order, so sort the keys when the order matters.",
          code: `package main

import (
	"fmt"
	"slices"
)

func main() {
	stores := map[string]int{"oak": 12, "beech": 7}
	stores["hazel"] += 5
	if n, ok := stores["pine"]; !ok {
		fmt.Println("no pine, zero value is", n)
	}
	delete(stores, "beech")
	var trees []string
	for tree := range stores {
		trees = append(trees, tree)
	}
	slices.Sort(trees)
	for _, tree := range trees {
		fmt.Println(tree, stores[tree])
	}
	fmt.Println(len(stores), "trees")
}`,
          out: "no pine, zero value is 0\nhazel 5\noak 12\n2 trees",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `package main

import "fmt"

func main() {
	s := []int{1, 2, 3}
	t := s[:2]
	t[1] = 20
	fmt.Println(s)
}`, options: ["[1 20 3]", "[1 2 3]", "[1 20]", "[20 2 3]"], answer: "[1 20 3]", why: "t is a window onto the same array as s." },
        { kind: "output", q: "What does this print?", code: `package main

import "fmt"

func main() {
	m := map[string]int{"a": 1}
	_, ok := m["b"]
	fmt.Println(m["b"], ok, len(m))
}`, options: ["0 false 1", "0 true 1", "1 false 2", "nil false 1"], answer: "0 false 1", why: "A missing key gives the zero value 0, ok is false, and reading does not add the key." },
        { q: "Why write s = append(s, x) rather than just append(s, x)?", options: ["append may make a new, bigger array and returns the slice that points to it", "append prints the slice", "append only works on maps otherwise", "It is only a style rule"], answer: "append may make a new, bigger array and returns the slice that points to it", why: "Discarding the result loses the new element when the array had to grow." },
      ],
    },
    {
      id: "structs",
      title: "Structs, methods and interfaces",
      summary: "Your own types, and behaviour they share.",
      sections: [
        {
          p: "A <code>struct</code> groups named fields. Methods are functions with a <b>receiver</b> written before the name. A pointer receiver, <code>(s *Squirrel)</code>, lets the method change the value; a value receiver works on a copy. Go has no classes or constructors; a function named <code>NewSomething</code> is the usual way to build a value.",
          code: `package main

import "fmt"

type Squirrel struct {
	Name string
	Nuts int
}

func NewSquirrel(name string) *Squirrel {
	return &Squirrel{Name: name}
}

func (s *Squirrel) Gather(n int) {
	s.Nuts += n
}

func (s Squirrel) Report() string {
	return fmt.Sprintf("%s has %d nuts", s.Name, s.Nuts)
}

func main() {
	sam := NewSquirrel("Sam")
	sam.Gather(4)
	sam.Gather(6)
	fmt.Println(sam.Report())
	fmt.Printf("%+v\\n", *sam)
}`,
          out: "Sam has 10 nuts\n{Name:Sam Nuts:10}",
        },
        {
          h: "Interfaces",
          p: "An interface lists methods. Any type that has those methods satisfies the interface automatically; there is no <code>implements</code> keyword. The standard <code>fmt.Stringer</code> interface has one method, <code>String() string</code>, and <code>fmt</code> uses it whenever it prints a value of that type.",
          code: `package main

import "fmt"

type Store interface {
	Capacity() int
}

type Hollow struct{}

type Burrow struct {
	Depth int
}

func (Hollow) Capacity() int   { return 120 }
func (b Burrow) Capacity() int { return b.Depth * 2 }
func (b Burrow) String() string {
	return fmt.Sprintf("burrow %d cm deep", b.Depth)
}

func main() {
	stores := []Store{Hollow{}, Burrow{Depth: 30}}
	total := 0
	for _, s := range stores {
		total += s.Capacity()
	}
	fmt.Println("room for", total)
	fmt.Println(Burrow{Depth: 15})
}`,
          out: "room for 180\nburrow 15 cm deep",
        },
        {
          h: "Type switches and embedding",
          p: "A <b>type switch</b> runs different code depending on the concrete type inside an interface value. <b>Embedding</b> one struct in another, by naming only its type, promotes its fields and methods, which is how Go reuses behaviour instead of inheritance.",
          code: `package main

import "fmt"

type Animal struct {
	Name string
}

func (a Animal) Hello() string { return "I am " + a.Name }

type Squirrel struct {
	Animal
	Nuts int
}

func describe(v any) string {
	switch x := v.(type) {
	case int:
		return fmt.Sprintf("int %d", x)
	case string:
		return "string " + x
	case Squirrel:
		return x.Hello()
	default:
		return "something else"
	}
}

func main() {
	s := Squirrel{Animal{"Pip"}, 3}
	fmt.Println(s.Name, s.Nuts)
	for _, v := range []any{7, "oak", s, 2.5} {
		fmt.Println(describe(v))
	}
}`,
          out: "Pip 3\nint 7\nstring oak\nI am Pip\nsomething else",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `package main

import "fmt"

type Box struct{ N int }

func (b Box) AddValue()    { b.N++ }
func (b *Box) AddPointer() { b.N++ }

func main() {
	b := Box{}
	b.AddValue()
	b.AddPointer()
	b.AddPointer()
	fmt.Println(b.N)
}`, options: ["2", "3", "1", "0"], answer: "2", why: "The value receiver changes a copy; only the two pointer-receiver calls count." },
        { q: "How does a Go type satisfy an interface?", options: ["By having all the interface's methods; nothing else is needed", "By writing implements after the type", "By embedding the interface", "By registering it with the interface"], answer: "By having all the interface's methods; nothing else is needed", why: "Go interfaces are satisfied implicitly." },
        { q: "What does a String() string method on a type change?", options: ["How fmt prints values of that type", "How the type is compared", "Nothing unless you call it", "How the type is stored in memory"], answer: "How fmt prints values of that type", why: "It satisfies fmt.Stringer, which fmt checks for." },
      ],
    },
    {
      id: "errors",
      title: "Errors",
      summary: "Errors are values you check.",
      sections: [
        {
          p: "Go has no exceptions for ordinary failures. A function that can fail returns an <code>error</code> as its last result, and the caller checks it right away: <code>if err != nil</code>. <code>strconv.Atoi</code>, which turns text into an <code>int</code>, works like this. It is more typing, but you can always see where failures are handled.",
          code: `package main

import (
	"fmt"
	"strconv"
)

func main() {
	for _, text := range []string{"42", "forty-two"} {
		n, err := strconv.Atoi(text)
		if err != nil {
			fmt.Println("error:", err)
			continue
		}
		fmt.Println("got", n)
	}
}`,
          out: "got 42\nerror: strconv.Atoi: parsing \"forty-two\": invalid syntax",
        },
        {
          h: "Making and wrapping errors",
          p: "<code>errors.New</code> makes a simple error, and <code>fmt.Errorf</code> builds one with a message. A <code>%w</code> in <code>fmt.Errorf</code> <b>wraps</b> another error, adding context while keeping the original inside. <code>errors.Is</code> then checks whether a particular error is anywhere in the chain.",
          code: `package main

import (
	"errors"
	"fmt"
)

var ErrEmpty = errors.New("the store is empty")

func take(stored, wanted int) (int, error) {
	if stored == 0 {
		return 0, ErrEmpty
	}
	if wanted > stored {
		return stored, fmt.Errorf("asked for %d, only %d stored", wanted, stored)
	}
	return stored - wanted, nil
}

func takeFromOak(wanted int) (int, error) {
	left, err := take(0, wanted)
	if err != nil {
		return 0, fmt.Errorf("oak: %w", err)
	}
	return left, nil
}

func main() {
	left, err := take(10, 4)
	fmt.Println(left, err)
	_, err = take(3, 8)
	fmt.Println(err)
	_, err = takeFromOak(1)
	fmt.Println(err)
	fmt.Println(errors.Is(err, ErrEmpty))
}`,
          out: "6 <nil>\nasked for 8, only 3 stored\noak: the store is empty\ntrue",
        },
        {
          h: "defer",
          p: "<code>defer</code> schedules a call to run when the surrounding function returns, however it returns. It keeps clean-up, such as closing a file, right next to the code that opened it. Deferred calls run in reverse order, last one first.",
          code: `package main

import "fmt"

func work() {
	fmt.Println("open store")
	defer fmt.Println("close store")
	defer fmt.Println("count nuts")
	fmt.Println("bury three nuts")
}

func main() {
	work()
	fmt.Println("done")
}`,
          out: "open store\nbury three nuts\ncount nuts\nclose store\ndone",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `package main

import "fmt"

func main() {
	for i := 1; i <= 3; i++ {
		defer fmt.Print(i)
	}
	fmt.Print("go ")
}`, options: ["go 321", "go 123", "123go ", "321go "], answer: "go 321", why: "Deferred calls run when main returns, last one first." },
        { kind: "output", q: "What does this print?", code: `package main

import (
	"errors"
	"fmt"
)

func main() {
	base := errors.New("no nuts")
	err := fmt.Errorf("day 3: %w", base)
	fmt.Println(err, errors.Is(err, base))
}`, options: ["day 3: no nuts true", "day 3: no nuts false", "no nuts true", "day 3: %w true"], answer: "day 3: no nuts true", why: "%w puts the original error's text in the message and keeps it in the chain for errors.Is." },
        { q: "How does a Go function usually report failure?", options: ["By returning an error as its last result", "By throwing an exception", "By returning -1", "By calling panic"], answer: "By returning an error as its last result", why: "panic is kept for bugs and truly unrecoverable situations." },
      ],
    },
    {
      id: "concurrency",
      title: "Goroutines and channels",
      summary: "Doing several things at once, safely.",
      sections: [
        {
          p: "Writing <code>go f()</code> starts <code>f</code> in a new <b>goroutine</b>, a very lightweight thread; a program can run thousands. Goroutines talk through <b>channels</b>: <code>ch &lt;- v</code> sends a value and <code>v := &lt;-ch</code> receives one, waiting until a value arrives. \"Share memory by communicating\" is the Go motto.",
          code: `package main

import "fmt"

func count(tree string, nuts []int, results chan<- string) {
	total := 0
	for _, n := range nuts {
		total += n
	}
	results <- fmt.Sprintf("%s: %d", tree, total)
}

func main() {
	results := make(chan string)
	go count("oak", []int{3, 4, 5}, results)
	go count("beech", []int{10, 2}, results)
	a, b := <-results, <-results
	if a > b {
		a, b = b, a
	}
	fmt.Println(a)
	fmt.Println(b)
}`,
          out: "beech: 12\noak: 12",
        },
        {
          h: "WaitGroup and Mutex",
          p: "<code>sync.WaitGroup</code> waits for a group of goroutines to finish. When several goroutines change the same variable, protect it with a <code>sync.Mutex</code>: only the goroutine holding the lock may touch the data. Without it, updates can be lost. <code>go run -race</code> finds such bugs.",
          code: `package main

import (
	"fmt"
	"sync"
)

func main() {
	var (
		mu    sync.Mutex
		wg    sync.WaitGroup
		total int
	)
	for squirrel := 1; squirrel <= 10; squirrel++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			for i := 0; i < 1000; i++ {
				mu.Lock()
				total++
				mu.Unlock()
			}
		}(squirrel)
	}
	wg.Wait()
	fmt.Println("nuts counted:", total)
}`,
          out: "nuts counted: 10000",
        },
        {
          h: "Pipelines",
          p: "A goroutine can read from one channel and write to another, forming a pipeline. <code>close(ch)</code> says no more values are coming, and <code>for v := range ch</code> reads until the channel is closed. A buffered channel, <code>make(chan int, 3)</code>, holds a few values so the sender need not wait.",
          code: `package main

import "fmt"

func main() {
	days := make(chan int, 3)
	doubled := make(chan int, 3)
	go func() {
		for _, n := range []int{4, 9, 2, 7} {
			days <- n
		}
		close(days)
	}()
	go func() {
		for n := range days {
			doubled <- n * 2
		}
		close(doubled)
	}()
	for n := range doubled {
		fmt.Print(n, " ")
	}
	fmt.Println()
}`,
          out: "8 18 4 14 ",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `package main

import "fmt"

func main() {
	ch := make(chan int, 2)
	ch <- 5
	ch <- 7
	close(ch)
	sum := 0
	for v := range ch {
		sum += v
	}
	fmt.Println(sum)
}`, options: ["12", "5", "7", "It waits forever"], answer: "12", why: "The buffer holds both values, and range stops once the closed channel is empty." },
        { q: "Why protect a shared counter with a sync.Mutex?", options: ["Without it, goroutines can overwrite each other's updates", "It makes goroutines start faster", "Channels require it", "Go will not compile otherwise"], answer: "Without it, goroutines can overwrite each other's updates", why: "total++ reads, adds and writes; two goroutines doing it at once can lose a count." },
        { q: "What does close(ch) tell receivers?", options: ["No more values will be sent", "The channel is empty right now", "The program should stop", "The values should be discarded"], answer: "No more values will be sent", why: "range over the channel ends after the remaining values are read." },
      ],
    },
    {
      id: "project",
      title: "Project: counting words",
      summary: "Strings, maps, sorting and formatting together.",
      sections: [
        {
          p: "This program counts the words in a short text, ignoring case and punctuation, and prints the most common ones. It splits the text with <code>strings.FieldsFunc</code>, counts in a map, copies the counts into a slice of structs, and sorts that with <code>slices.SortFunc</code> and <code>cmp.Compare</code>: most frequent first, then alphabetically.",
          code: `package main

import (
	"cmp"
	"fmt"
	"slices"
	"strings"
	"unicode"
)

type count struct {
	word string
	n    int
}

func main() {
	text := "The squirrel hid a nut. Then the squirrel forgot the nut, " +
		"and the nut became a tree. The tree grew nuts."

	words := strings.FieldsFunc(strings.ToLower(text), func(r rune) bool {
		return !unicode.IsLetter(r)
	})
	counts := map[string]int{}
	for _, w := range words {
		counts[w]++
	}
	var rows []count
	for w, n := range counts {
		rows = append(rows, count{w, n})
	}
	slices.SortFunc(rows, func(a, b count) int {
		if c := cmp.Compare(b.n, a.n); c != 0 {
			return c
		}
		return strings.Compare(a.word, b.word)
	})
	fmt.Printf("%d words, %d different\\n", len(words), len(counts))
	for _, r := range rows[:4] {
		fmt.Printf("%-9s%2d\\n", r.word, r.n)
	}
}`,
          out: "21 words, 12 different\nthe       5\nnut       3\na         2\nsquirrel  2",
        },
        {
          h: "Ideas to try",
          p: "Read the text from a file with <code>os.ReadFile</code> (checking its error), skip stop words such as \"a\" and \"the\" with a <code>map[string]bool</code>, or count several files at once, one goroutine each, sending their maps down a channel to be merged.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `package main

import (
	"fmt"
	"strings"
)

func main() {
	f := strings.Fields("  oak   beech hazel ")
	fmt.Println(len(f), f[1])
}`, options: ["3 beech", "5 beech", "3 oak", "4 beech"], answer: "3 beech", why: "Fields splits on runs of spaces and ignores spaces at the ends." },
        { q: "Why copy the map into a slice before printing the top words?", options: ["Maps have no order, and a slice can be sorted", "Maps cannot be printed", "Slices use less memory", "range does not work on maps"], answer: "Maps have no order, and a slice can be sorted", why: "Go even randomizes map order on purpose so that code does not rely on it." },
        { q: "In slices.SortFunc, what should the comparison return when a should come first?", options: ["A negative number", "A positive number", "Zero", "true"], answer: "A negative number", why: "cmp.Compare(b.n, a.n) is negative when a has the bigger count, so bigger counts come first." },
      ],
    },
  ],
};
