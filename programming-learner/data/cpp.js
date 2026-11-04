// C++ course for the Programming Learner. Written for this project.
// Examples are complete C++20 programs. tools/run_cpp.py compiles them with
// g++ and checks the printed output.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.cpp = {
  id: "cpp",
  name: "C++",
  title: "Modern C++ from the first line",
  intro:
    "C++ began in the 1980s as C with classes and grew into one of the most widely used languages for programs that must be fast: games and game engines, browsers, databases, trading systems, embedded devices and much of the software other programs run on. Modern C++ (C++11 and later) is a different experience from the old style: the standard library manages memory and collections for you, and you rarely write <code>new</code> or <code>delete</code>. These lessons use C++20. Every example is a whole program and shows exactly what it prints. To run one yourself, save it as <code>hello.cpp</code> and type <code>g++ -std=c++20 -o hello hello.cpp && ./hello</code>.",
  comment: "//",
  keywords: [
    "int", "double", "char", "bool", "void", "auto", "const", "return", "if", "else", "for", "while", "include", "class", "struct",
    "public", "private", "template", "typename", "using", "namespace", "new", "delete", "true", "false", "this", "virtual", "override",
  ],
  builtins: ["std", "cout", "string", "vector", "map", "unique_ptr", "make_unique", "sort", "main"],
  lessons: [
    {
      id: "first",
      title: "Your first program",
      summary: "main, std::cout and the << operator.",
      sections: [
        {
          p: "A C++ program starts in <code>main</code>. <code>#include &lt;iostream&gt;</code> brings in the input/output library, and <code>std::cout &lt;&lt; ...</code> sends values to the screen, one <code>&lt;&lt;</code> after another. Nothing ends the line unless you print <code>'\\n'</code>. <code>std::</code> says the name comes from the standard library.",
          code: `#include <iostream>

int main() {
    std::cout << "Hello, squirrel!\\n";
    std::cout << "Nuts: " << 42 << '\\n';
}`,
          out: "Hello, squirrel!\nNuts: 42",
        },
        {
          h: "Strings",
          p: "<code>std::string</code> is a real text type that grows as needed. <code>+</code> joins strings, <code>size()</code> gives the length, and you can compare them with <code>==</code>.",
          code: `#include <iostream>
#include <string>

int main() {
    std::string name = "Hazel";
    std::string greeting = "Hi, " + name + "!";
    std::cout << greeting << ' ' << greeting.size() << '\\n';
    std::cout << (name == "Hazel") << '\\n';
}`,
          out: "Hi, Hazel! 10\n1",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <iostream>

int main() {
    std::cout << "Up" << " the" << " tree" << '\\n';
}`, options: ["Up the tree", "Upthetree", "Up\nthe\ntree", "\"Up\" \" the\" \" tree\""], answer: "Up the tree", why: "Each << adds the next piece right after the last one. The spaces are inside the strings." },
        { kind: "output", q: "What does this print?", code: `#include <iostream>

int main() {
    std::cout << 2 + 3 << '\\n';
    std::cout << "2 + 3" << '\\n';
}`, options: ["5\n2 + 3", "5\n5", "2 + 3\n2 + 3", "23\n2 + 3"], answer: "5\n2 + 3", why: "2 + 3 outside quotes is arithmetic. Inside quotes it is just text." },
        { q: "Why do lessons write std::cout and not just cout?", options: ["cout lives in the std namespace", "It is a different, faster cout", "std means standard output", "It is required on Windows only"], answer: "cout lives in the std namespace", why: "The standard library puts its names in namespace std so they don't clash with yours." },
      ],
    },
    {
      id: "values",
      title: "Types, auto and const",
      summary: "int, double, bool, integer division, auto and const.",
      sections: [
        {
          p: "Every variable has a type that is fixed when it is declared. Dividing two <code>int</code>s drops the fraction; if either side is a <code>double</code>, you get a fractional answer. <code>auto</code> lets the compiler work the type out from the value. <code>bool</code> prints as 1 or 0 unless you ask for <code>std::boolalpha</code>.",
          code: `#include <iostream>

int main() {
    int nuts = 17;
    int trees = 5;
    double share = static_cast<double>(nuts) / trees;
    auto ok = nuts > 10;
    std::cout << nuts / trees << ' ' << nuts % trees << '\\n';
    std::cout << share << '\\n';
    std::cout << ok << ' ' << std::boolalpha << ok << '\\n';
}`,
          out: "3 2\n3.4\n1 true",
        },
        {
          h: "const",
          p: "<code>const</code> means a value cannot change after it is set; the compiler refuses any attempt. Make things <code>const</code> by default and you get fewer surprises. <code>constexpr</code> goes further and computes the value while compiling.",
          code: `#include <iostream>

constexpr int square(int n) { return n * n; }

int main() {
    const int days = 7;
    constexpr int cells = square(8);
    std::cout << days * 2 << ' ' << cells << '\\n';
}`,
          out: "14 64",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <iostream>

int main() {
    std::cout << 9 / 2 << ' ' << 9.0 / 2 << '\\n';
}`, options: ["4 4.5", "4.5 4.5", "4 4", "5 4.5"], answer: "4 4.5", why: "9 / 2 divides two ints and drops the fraction. With 9.0 the arithmetic is done in double." },
        { kind: "output", q: "What does this print?", code: `#include <iostream>

int main() {
    bool b = 3 > 2;
    std::cout << b << '\\n';
}`, options: ["1", "true", "3", "0"], answer: "1", why: "Without std::boolalpha, a bool prints as 1 for true and 0 for false." },
        { q: "What type does auto x = 2.5; give x?", options: ["double", "int", "float", "auto"], answer: "double", why: "A literal with a decimal point is a double, so x is a double." },
      ],
    },
    {
      id: "references",
      title: "Functions and references",
      summary: "Passing by value, by reference and by const reference.",
      sections: [
        {
          p: "Arguments are <b>copied</b> by default, so a function cannot change the caller's variable. A <b>reference</b> parameter, written <code>int&amp;</code>, is another name for the caller's variable, so changes stick. For big values you only read, use <code>const T&amp;</code>: no copy, and no changes allowed.",
          code: `#include <iostream>
#include <string>

void bump_copy(int n) { n += 10; }
void bump_ref(int& n) { n += 10; }
std::size_t letters(const std::string& s) { return s.size(); }

int main() {
    int stash = 1;
    bump_copy(stash);
    std::cout << stash << '\\n';
    bump_ref(stash);
    std::cout << stash << '\\n';
    std::cout << letters("Pinecone") << '\\n';
}`,
          out: "1\n11\n8",
        },
        {
          h: "Overloading",
          p: "Several functions can share a name if their parameter types differ. The compiler picks the one that matches the arguments.",
          code: `#include <iostream>
#include <string>

std::string describe(int n) { return "number " + std::to_string(n); }
std::string describe(const std::string& s) { return "text " + s; }

int main() {
    std::cout << describe(3) << '\\n';
    std::cout << describe(std::string("oak")) << '\\n';
}`,
          out: "number 3\ntext oak",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <iostream>

void twice(int& x) { x *= 2; }

int main() {
    int n = 3;
    twice(n);
    twice(n);
    std::cout << n << '\\n';
}`, options: ["12", "6", "3", "9"], answer: "12", why: "x is a reference to n, so each call doubles n itself: 3, 6, 12." },
        { kind: "output", q: "What does this print?", code: `#include <iostream>

void reset(int x) { x = 0; }

int main() {
    int n = 5;
    reset(n);
    std::cout << n << '\\n';
}`, options: ["5", "0", "An error", "Nothing"], answer: "5", why: "x is a copy, so setting it to 0 doesn't touch n." },
        { q: "Why pass a std::string as const std::string&?", options: ["To avoid copying it while promising not to change it", "So the function can change it", "Because strings can't be copied", "To make it a global"], answer: "To avoid copying it while promising not to change it", why: "A reference avoids the copy, and const keeps the caller's string safe." },
      ],
    },
    {
      id: "containers",
      title: "Vectors, maps and algorithms",
      summary: "std::vector, range-for, std::map and the <algorithm> header.",
      sections: [
        {
          p: "<code>std::vector&lt;int&gt;</code> is a growable array: <code>push_back</code> adds to the end, <code>size()</code> counts, and <code>v[i]</code> reads by index from 0. A <b>range-for</b> loop, <code>for (int n : v)</code>, visits every element. <code>&lt;algorithm&gt;</code> and <code>&lt;numeric&gt;</code> have ready-made loops such as <code>std::sort</code> and <code>std::accumulate</code>.",
          code: `#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<int> nuts = {30, 12, 5};
    nuts.push_back(8);
    std::sort(nuts.begin(), nuts.end());
    for (int n : nuts) std::cout << n << ' ';
    std::cout << '\\n';
    std::cout << nuts.size() << ' ' << nuts[0] << ' '
              << std::accumulate(nuts.begin(), nuts.end(), 0) << '\\n';
}`,
          out: "5 8 12 30 \n4 5 55",
        },
        {
          h: "Maps",
          p: "<code>std::map&lt;K, V&gt;</code> stores keys with values, <b>sorted by key</b>. <code>m[key]</code> reads or creates an entry (a new <code>int</code> starts at 0), and <code>contains</code> (C++20) checks without creating one. A range-for over a map gives key-value pairs, which <b>structured bindings</b> can unpack.",
          code: `#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> trees;
    trees["oak"] += 3;
    trees["elm"] += 1;
    trees["oak"] += 2;
    for (const auto& [name, count] : trees)
        std::cout << name << '=' << count << '\\n';
    std::cout << trees.contains("ash") << '\\n';
}`,
          out: "elm=1\noak=5\n0",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {4, 5, 6};
    v.push_back(7);
    std::cout << v.size() << ' ' << v[1] << '\\n';
}`, options: ["4 5", "3 5", "4 4", "4 6"], answer: "4 5", why: "Adding 7 makes four elements, and index 1 is the second one, 5." },
        { kind: "output", q: "What does this print?", code: `#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> m;
    m["b"] = 2;
    m["a"] = 1;
    for (const auto& [k, v] : m) std::cout << k;
    std::cout << '\\n';
}`, options: ["ab", "ba", "12", "a1b2"], answer: "ab", why: "std::map keeps its keys sorted, whatever order they were added in." },
        { kind: "output", q: "What does this print?", code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3};
    for (int x : v) x *= 10;
    std::cout << v[0] << '\\n';
}`, options: ["1", "10", "0", "An error"], answer: "1", why: "int x is a copy of each element. Write int& x to change the vector itself." },
      ],
    },
    {
      id: "classes",
      title: "Classes and RAII",
      summary: "Members, constructors, destructors, and virtual functions.",
      sections: [
        {
          p: "A <code>class</code> bundles data with the functions that work on it, and <code>private</code> members can only be touched by those functions. A <b>constructor</b> sets an object up; the <b>destructor</b> (<code>~Name</code>) runs automatically when the object goes out of scope. Tying cleanup to the destructor is called <b>RAII</b>, and it is how C++ manages files, locks and memory without forgetting to release them.",
          code: `#include <iostream>
#include <string>

class Stash {
public:
    explicit Stash(std::string owner) : owner_(std::move(owner)) {
        std::cout << "open " << owner_ << '\\n';
    }
    ~Stash() { std::cout << "close " << owner_ << '\\n'; }
    void add(int n) { nuts_ += n; }
    int nuts() const { return nuts_; }

private:
    std::string owner_;
    int nuts_ = 0;
};

int main() {
    {
        Stash s("Hazel");
        s.add(4);
        std::cout << s.nuts() << '\\n';
    }
    std::cout << "done\\n";
}`,
          out: "open Hazel\n4\nclose Hazel\ndone",
        },
        {
          h: "Inheritance and virtual",
          p: "A class can inherit from another. Mark a function <code>virtual</code> in the base class and <code>override</code> in the derived one, and calls through a base reference reach the derived version.",
          code: `#include <iostream>
#include <string>

struct Animal {
    virtual ~Animal() = default;
    virtual std::string sound() const { return "..."; }
};
struct Squirrel : Animal {
    std::string sound() const override { return "chitter"; }
};

void speak(const Animal& a) { std::cout << a.sound() << '\\n'; }

int main() {
    Squirrel s;
    Animal a;
    speak(s);
    speak(a);
}`,
          out: "chitter\n...",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <iostream>

struct Noisy {
    ~Noisy() { std::cout << "bye\\n"; }
};

int main() {
    std::cout << "start\\n";
    {
        Noisy n;
        std::cout << "inside\\n";
    }
    std::cout << "end\\n";
}`, options: ["start\ninside\nbye\nend", "start\ninside\nend\nbye", "start\nbye\ninside\nend", "start\ninside\nend"], answer: "start\ninside\nbye\nend", why: "n is destroyed at the closing brace of its block, before end is printed." },
        { kind: "output", q: "What does this print?", code: `#include <iostream>

struct Base {
    virtual int id() const { return 1; }
};
struct Child : Base {
    int id() const override { return 2; }
};

int main() {
    Child c;
    const Base& b = c;
    std::cout << b.id() << '\\n';
}`, options: ["2", "1", "12", "An error"], answer: "2", why: "id is virtual, so the call through a Base reference reaches Child's version." },
        { q: "What does RAII mean in practice?", options: ["Cleanup happens in destructors, automatically at the end of scope", "All memory is garbage collected", "Every class must be abstract", "Objects can only be created with new"], answer: "Cleanup happens in destructors, automatically at the end of scope", why: "Resource Acquisition Is Initialisation: an object owns its resource and its destructor releases it." },
      ],
    },
    {
      id: "modern",
      title: "Templates and smart pointers",
      summary: "Generic functions, unique_ptr and lambdas.",
      sections: [
        {
          p: "A <b>template</b> is code with a type left open: the compiler writes a version for each type you use. The standard containers are templates, which is why you write <code>std::vector&lt;int&gt;</code>.",
          code: `#include <iostream>
#include <string>

template <typename T>
T biggest(T a, T b) {
    return a > b ? a : b;
}

int main() {
    std::cout << biggest(3, 9) << '\\n';
    std::cout << biggest(2.5, 1.5) << '\\n';
    std::cout << biggest(std::string("oak"), std::string("elm")) << '\\n';
}`,
          out: "9\n2.5\noak",
        },
        {
          h: "Smart pointers and lambdas",
          p: "When you do need an object on the heap, hold it in a <code>std::unique_ptr</code>: it deletes the object when it goes out of scope, so you never call <code>delete</code> yourself. A <b>lambda</b>, <code>[capture](params) { body }</code>, is a small unnamed function, often passed to algorithms; the capture list says which outside variables it may use.",
          code: `#include <algorithm>
#include <iostream>
#include <memory>
#include <vector>

struct Tree {
    int nuts;
};

int main() {
    auto t = std::make_unique<Tree>(Tree{12});
    t->nuts += 3;
    std::cout << t->nuts << '\\n';

    std::vector<int> v = {5, 12, 30, 8};
    int limit = 10;
    auto big = std::count_if(v.begin(), v.end(), [limit](int n) { return n > limit; });
    std::cout << big << '\\n';
}`,
          out: "15\n2",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <iostream>

template <typename T>
T twice(T x) { return x + x; }

int main() {
    std::cout << twice(4) << ' ' << twice(1.5) << '\\n';
}`, options: ["8 3", "8 3.0", "44 1.51.5", "8 2"], answer: "8 3", why: "The template makes an int version and a double version. 1.5 + 1.5 is 3, which prints as 3." },
        { kind: "output", q: "What does this print?", code: `#include <iostream>

int main() {
    int base = 10;
    auto add = [base](int n) { return base + n; };
    base = 100;
    std::cout << add(1) << '\\n';
}`, options: ["11", "101", "1", "An error"], answer: "11", why: "[base] captures a copy of base when the lambda is made, so changing base afterwards has no effect. [&base] would capture by reference." },
        { q: "Why prefer std::unique_ptr over new and delete?", options: ["It deletes the object automatically, so nothing leaks", "It makes the object faster", "It allows many owners at once", "It stores the object on the stack"], answer: "It deletes the object automatically, so nothing leaks", why: "unique_ptr owns the object and frees it in its destructor. std::shared_ptr is the one for shared ownership." },
      ],
    },
  ],
};
