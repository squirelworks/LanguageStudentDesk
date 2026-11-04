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
    {
      id: "strings",
      title: "Strings and formatting",
      summary: "std::string, string_view and std::format.",
      sections: [
        {
          p: "<code>std::string</code> owns its characters and grows as needed, so the C worries about sizes and zero bytes go away. It knows its <code>size()</code>, joins with <code>+</code>, compares with <code>==</code>, and has members such as <code>find</code> (which returns <code>std::string::npos</code> when nothing is found) and <code>substr</code>.",
          code: `#include <iostream>
#include <string>
int main() {
    std::string tree = "hazel";
    std::string label = tree + "nut";
    std::cout << label << " has " << label.size() << " letters\\n";
    std::cout << std::boolalpha << (tree == "hazel") << "\\n";
    auto at = label.find("nut");
    std::cout << "nut starts at " << at << ": " << label.substr(0, at) << "\\n";
    if (label.find("oak") == std::string::npos) {
        std::cout << "no oak\\n";
    }
    return 0;
}`,
          out: "hazelnut has 8 letters\ntrue\nnut starts at 5: hazel\nno oak",
        },
        {
          h: "std::string_view",
          p: "A <code>std::string_view</code> is a cheap window onto characters that live somewhere else: a pointer and a length, nothing copied. It is the usual parameter type for a function that only reads text, because a <code>std::string</code>, a literal or part of either can be passed without making a copy. The one rule is that the characters must outlive the view.",
          code: `#include <iostream>
#include <string>
#include <string_view>
int count_vowels(std::string_view text) {
    int n = 0;
    for (char c : text) {
        if (std::string_view("aeiou").find(c) != std::string_view::npos) {
            n++;
        }
    }
    return n;
}
int main() {
    std::string owned = "sycamore";
    std::cout << count_vowels(owned) << "\\n";
    std::cout << count_vowels("beech") << "\\n";
    std::string_view first_four(owned.data(), 4);
    std::cout << first_four << " " << count_vowels(first_four) << "\\n";
    return 0;
}`,
          out: "3\n2\nsyca 1",
        },
        {
          h: "std::format",
          p: "C++20's <code>std::format</code> builds a string from a pattern, like Python's f-strings. Each <code>{}</code> is replaced by the next argument; inside the braces <code>:&gt;6</code> right-aligns in 6 columns, <code>:&lt;8</code> left-aligns, and <code>:.2f</code> gives two decimals. Unlike <code>printf</code>, it checks the types when it compiles.",
          code: `#include <format>
#include <iostream>
int main() {
    std::cout << std::format("{} found {} nuts\\n", "Sam", 42);
    std::cout << std::format("[{:<8}] [{:>6}]\\n", "oak", 17);
    std::cout << std::format("{:.2f} kg each\\n", 0.0333 * 3);
    std::cout << std::format("{0} and {0} again\\n", "echo");
    return 0;
}`,
          out: "Sam found 42 nuts\n[oak     ] [    17]\n0.10 kg each\necho and echo again",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <iostream>
#include <string>
int main() {
    std::string s = "acorn";
    s += "s";
    std::cout << s.size() << " " << s.substr(1, 3) << "\\n";
    return 0;
}`, options: ["6 cor", "5 cor", "6 aco", "6 corn"], answer: "6 cor", why: "Adding \"s\" makes 6 letters. substr(1, 3) takes 3 characters starting at index 1." },
        { kind: "output", q: "What does this print?", code: `#include <format>
#include <iostream>
int main() {
    std::cout << std::format("|{:>4}|{:<4}|", 7, 8) << "\\n";
    return 0;
}`, options: ["|   7|8   |", "|7   |   8|", "|7|8|", "|   7|   8|"], answer: "|   7|8   |", why: "> pads on the left so the value sits on the right; < does the opposite." },
        { q: "Why is std::string_view a good parameter type for a function that only reads text?", options: ["Strings and literals can be passed without copying", "It can change the caller's string", "It adds a zero byte at the end", "It is the only type std::format accepts"], answer: "Strings and literals can be passed without copying", why: "A view is just a pointer and a length to characters stored elsewhere." },
      ],
    },
    {
      id: "errors",
      title: "Errors: exceptions and std::optional",
      summary: "Reporting failure, and cleaning up when it happens.",
      sections: [
        {
          p: "When a function cannot do its job, it can <code>throw</code> an exception. The function stops at once, and so does every caller, until a <code>try</code> block with a matching <code>catch</code> is found. The standard library's exceptions derive from <code>std::exception</code>, and <code>what()</code> returns the message. <code>std::stoi</code>, which turns text into an <code>int</code>, throws <code>std::invalid_argument</code> when the text is not a number.",
          code: `#include <iostream>
#include <stdexcept>
#include <string>
int take(int stored, int wanted) {
    if (wanted > stored) {
        throw std::runtime_error("only " + std::to_string(stored) + " nuts left");
    }
    return stored - wanted;
}
int main() {
    try {
        int left = take(10, 4);
        std::cout << "left: " << left << "\\n";
        left = take(left, 9);
        std::cout << "never printed\\n";
    } catch (const std::exception& e) {
        std::cout << "error: " << e.what() << "\\n";
    }
    try {
        std::stoi("twelve");
    } catch (const std::invalid_argument&) {
        std::cout << "not a number\\n";
    }
    return 0;
}`,
          out: "left: 6\nerror: only 6 nuts left\nnot a number",
        },
        {
          h: "Cleanup happens anyway",
          p: "When an exception passes through a function, every local object in it is destroyed, so its destructor runs. This is why RAII (from the classes lesson) matters: a file, a lock or memory owned by an object is released however the function ends, with no <code>finally</code> needed.",
          code: `#include <iostream>
#include <stdexcept>
struct Guard {
    const char* name;
    explicit Guard(const char* n) : name(n) { std::cout << "open " << name << "\\n"; }
    ~Guard() { std::cout << "close " << name << "\\n"; }
};
void work() {
    Guard g("store");
    throw std::runtime_error("squirrel startled");
}
int main() {
    try {
        work();
    } catch (const std::exception& e) {
        std::cout << "caught: " << e.what() << "\\n";
    }
    return 0;
}`,
          out: "open store\nclose store\ncaught: squirrel startled",
        },
        {
          h: "std::optional for answers that may be missing",
          p: "Not finding something is often normal, not exceptional. <code>std::optional&lt;T&gt;</code> holds either a <code>T</code> or nothing (<code>std::nullopt</code>). Test it like a bool, read it with <code>*</code>, or use <code>value_or</code> to supply a default.",
          code: `#include <iostream>
#include <map>
#include <optional>
#include <string>
std::optional<int> nuts_in(const std::map<std::string, int>& stores, const std::string& tree) {
    auto it = stores.find(tree);
    if (it == stores.end()) {
        return std::nullopt;
    }
    return it->second;
}
int main() {
    std::map<std::string, int> stores = {{"oak", 12}, {"beech", 7}};
    if (auto n = nuts_in(stores, "oak")) {
        std::cout << "oak: " << *n << "\\n";
    }
    std::cout << "pine: " << nuts_in(stores, "pine").value_or(0) << "\\n";
    return 0;
}`,
          out: "oak: 12\npine: 0",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <iostream>
#include <stdexcept>
int main() {
    try {
        std::cout << "a";
        throw std::runtime_error("b");
        std::cout << "c";
    } catch (const std::exception& e) {
        std::cout << e.what();
    }
    std::cout << "d\\n";
    return 0;
}`, options: ["abd", "abcd", "acd", "ab"], answer: "abd", why: "throw jumps straight to the catch, skipping \"c\"; the program then carries on after the try block." },
        { kind: "output", q: "What does this print?", code: `#include <iostream>
#include <optional>
int main() {
    std::optional<int> a = 5;
    std::optional<int> b;
    std::cout << a.value_or(0) + b.value_or(10) << "\\n";
    return 0;
}`, options: ["15", "5", "10", "0"], answer: "15", why: "a holds 5; b is empty, so value_or gives 10." },
        { q: "Why don't C++ programs need a finally block to release resources?", options: ["Destructors of local objects run when an exception passes through", "Exceptions never leave a function", "The operating system frees everything immediately", "catch blocks free memory automatically"], answer: "Destructors of local objects run when an exception passes through", why: "With RAII, owning a resource in an object guarantees it is released however the scope ends." },
      ],
    },
    {
      id: "operators",
      title: "Value types and operators",
      summary: "Making your own types behave like built-in ones.",
      sections: [
        {
          p: "You can define what <code>+</code>, <code>==</code> or <code>&lt;&lt;</code> mean for your own types. A small type that holds a value, such as an amount of money or a point, then reads as naturally as an <code>int</code>. Overload operators only where the meaning is obvious; a <code>+</code> that does something surprising makes code harder to read.",
          code: `#include <iostream>
struct Stash {
    int acorns = 0;
    int hazelnuts = 0;
};
Stash operator+(Stash a, Stash b) {
    return {a.acorns + b.acorns, a.hazelnuts + b.hazelnuts};
}
std::ostream& operator<<(std::ostream& out, const Stash& s) {
    return out << s.acorns << " acorns, " << s.hazelnuts << " hazelnuts";
}
int main() {
    Stash monday{3, 1};
    Stash tuesday{2, 4};
    std::cout << monday + tuesday << "\\n";
    return 0;
}`,
          out: "5 acorns, 5 hazelnuts",
        },
        {
          h: "Comparisons for free",
          p: "C++20 can write comparisons for you. Declaring <code>operator==</code> and <code>operator&lt;=&gt;</code> (the \"spaceship\") as <code>= default</code> compares the members in order, and from those the compiler provides <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code> and <code>&gt;=</code>. Sorting a vector of such values then needs no extra code.",
          code: `#include <algorithm>
#include <compare>
#include <iostream>
#include <vector>
struct Version {
    int major = 0;
    int minor = 0;
    bool operator==(const Version&) const = default;
    auto operator<=>(const Version&) const = default;
};
int main() {
    std::vector<Version> v = {{1, 10}, {1, 2}, {0, 9}, {2, 0}};
    std::sort(v.begin(), v.end());
    for (const auto& x : v) {
        std::cout << x.major << "." << x.minor << " ";
    }
    std::cout << "\\n" << std::boolalpha << (Version{1, 2} < Version{1, 10}) << "\\n";
    return 0;
}`,
          out: "0.9 1.2 1.10 2.0 \ntrue",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <iostream>
struct Point {
    int x, y;
};
Point operator*(Point p, int k) {
    return {p.x * k, p.y * k};
}
int main() {
    Point p = Point{2, 3} * 4;
    std::cout << p.x << "," << p.y << "\\n";
    return 0;
}`, options: ["8,12", "2,3", "6,7", "24"], answer: "8,12", why: "The operator multiplies each member by k." },
        { q: "What does = default on operator<=> do?", options: ["Compares the members one by one, in the order they are declared", "Makes every comparison return true", "Compares the objects' addresses", "Deletes the comparison operators"], answer: "Compares the members one by one, in the order they are declared", why: "The first member that differs decides; that is why 1.2 comes before 1.10 here." },
        { q: "Why does operator<< return the std::ostream&?", options: ["So that calls can be chained: cout << a << b", "To print a newline", "Because operators must return references", "To close the stream"], answer: "So that calls can be chained: cout << a << b", why: "cout << a returns cout, and the next << is applied to it." },
      ],
    },
    {
      id: "lambdas",
      title: "Lambdas and algorithms",
      summary: "Small functions written in place, and the algorithms that use them.",
      sections: [
        {
          p: "A <b>lambda</b> is a function written where it is used: <code>[](int n) { return n * 2; }</code>. The square brackets list what it <b>captures</b> from around it: <code>[limit]</code> copies <code>limit</code> in, <code>[&amp;total]</code> uses <code>total</code> by reference so the lambda can change it. Lambdas are how you tell standard algorithms what to do.",
          code: `#include <algorithm>
#include <iostream>
#include <vector>
int main() {
    std::vector<int> nuts = {5, 12, 3, 8, 15};
    int limit = 7;
    auto big = std::count_if(nuts.begin(), nuts.end(), [limit](int n) { return n > limit; });
    std::cout << big << " days above " << limit << "\\n";
    int total = 0;
    std::for_each(nuts.begin(), nuts.end(), [&total](int n) { total += n; });
    std::cout << "total " << total << "\\n";
    std::sort(nuts.begin(), nuts.end(), [](int a, int b) { return a > b; });
    std::cout << "largest first: " << nuts[0] << " " << nuts[1] << "\\n";
    return 0;
}`,
          out: "3 days above 7\ntotal 43\nlargest first: 15 12",
        },
        {
          h: "Ranges and views",
          p: "C++20 ranges let algorithms take a whole container instead of a begin/end pair: <code>std::ranges::sort(v)</code>. <b>Views</b> describe a lazy pipeline joined with <code>|</code>: <code>filter</code> keeps some elements and <code>transform</code> changes each one. Nothing is copied; the work happens as you loop over the result.",
          code: `#include <algorithm>
#include <iostream>
#include <ranges>
#include <string>
#include <vector>
int main() {
    std::vector<std::string> trees = {"oak", "beech", "fir", "hazel", "yew"};
    std::ranges::sort(trees);
    for (const auto& t : trees) {
        std::cout << t << " ";
    }
    std::cout << "\\n";
    auto long_names = trees
        | std::views::filter([](const std::string& t) { return t.size() > 3; })
        | std::views::transform([](const std::string& t) { return t.size(); });
    for (auto n : long_names) {
        std::cout << n << " ";
    }
    std::cout << "\\n";
    return 0;
}`,
          out: "beech fir hazel oak yew \n5 5 ",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <iostream>
int main() {
    int count = 0;
    auto add = [&count](int n) { count += n; };
    add(3);
    add(4);
    std::cout << count << "\\n";
    return 0;
}`, options: ["7", "0", "4", "3"], answer: "7", why: "[&count] captures by reference, so the lambda changes the real count." },
        { kind: "output", q: "What does this print?", code: `#include <iostream>
int main() {
    int x = 1;
    auto f = [x]() { return x * 10; };
    x = 5;
    std::cout << f() << "\\n";
    return 0;
}`, options: ["10", "50", "1", "5"], answer: "10", why: "[x] copies x when the lambda is created, while it is still 1." },
        { q: "What does std::views::filter do?", options: ["Gives a lazy view of only the elements that pass a test", "Removes elements from the vector", "Sorts the elements", "Copies matching elements into a new vector"], answer: "Gives a lazy view of only the elements that pass a test", why: "Views don't change or copy the container; they decide what you see as you iterate." },
      ],
    },
    {
      id: "project",
      title: "Project: counting words",
      summary: "Strings, maps, lambdas and formatting in one program.",
      sections: [
        {
          p: "This program counts how often each word appears in a short text, ignoring case and punctuation, and prints the most common ones in a table. It reads words with a <code>std::istringstream</code>, cleans each one, counts with a <code>std::map</code>, copies the pairs into a vector, sorts them with a lambda (most frequent first, then alphabetically), and prints with <code>std::format</code>.",
          code: `#include <algorithm>
#include <cctype>
#include <format>
#include <iostream>
#include <map>
#include <sstream>
#include <string>
#include <utility>
#include <vector>
std::string clean(const std::string& word) {
    std::string out;
    for (unsigned char c : word) {
        if (std::isalpha(c)) {
            out += static_cast<char>(std::tolower(c));
        }
    }
    return out;
}
int main() {
    std::string text =
        "The squirrel hid a nut. Then the squirrel forgot the nut, "
        "and the nut became a tree. The tree grew nuts.";
    std::map<std::string, int> counts;
    std::istringstream in(text);
    std::string word;
    int total = 0;
    while (in >> word) {
        std::string w = clean(word);
        if (!w.empty()) {
            counts[w]++;
            total++;
        }
    }
    std::vector<std::pair<std::string, int>> rows(counts.begin(), counts.end());
    std::sort(rows.begin(), rows.end(), [](const auto& a, const auto& b) {
        if (a.second != b.second) {
            return a.second > b.second;
        }
        return a.first < b.first;
    });
    std::cout << std::format("{} words, {} different\\n", total, counts.size());
    for (std::size_t i = 0; i < 4 && i < rows.size(); i++) {
        std::cout << std::format("{:<9}{:>2}\\n", rows[i].first, rows[i].second);
    }
    return 0;
}`,
          out: "21 words, 12 different\nthe       5\nnut       3\na         2\nsquirrel  2",
        },
        {
          h: "Ideas to try",
          p: "Skip short words such as \"a\" and \"the\" with a set of stop words, or read the text from a file with <code>std::ifstream</code>. If you need the order of first appearance rather than alphabetical ties, record the position where each word was first seen.",
        },
      ],
      practice: [
        { q: "Why copy the map's pairs into a vector before sorting?", options: ["A std::map always keeps its keys in order, so it cannot be re-sorted by count", "Maps cannot be looped over", "std::sort is faster on maps", "To remove duplicate words"], answer: "A std::map always keeps its keys in order, so it cannot be re-sorted by count", why: "The map's order is fixed by its keys; a vector can be put in any order." },
        { kind: "output", q: "What does this print?", code: `#include <iostream>
#include <map>
#include <string>
int main() {
    std::map<std::string, int> m;
    m["nut"]++;
    m["nut"]++;
    m["oak"]++;
    std::cout << m.size() << " " << m["nut"] << "\\n";
    return 0;
}`, options: ["2 2", "3 2", "2 1", "1 2"], answer: "2 2", why: "m[\"nut\"] creates the entry with 0 the first time, then ++ counts; there are two different keys." },
        { q: "What does in >> word do with an std::istringstream?", options: ["Reads the next word, skipping spaces", "Reads the next line", "Reads one character", "Reads the rest of the text"], answer: "Reads the next word, skipping spaces", why: ">> into a std::string stops at whitespace, and the loop ends when no words are left." },
      ],
    },
  ],
};
