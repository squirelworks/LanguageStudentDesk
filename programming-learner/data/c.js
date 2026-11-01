// C course for the Programming Learner. Written for this project.
// Examples are complete C11 programs. tools/run_c.py compiles them with gcc
// and checks the printed output.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.c = {
  id: "c",
  name: "C",
  title: "C from the first line",
  intro:
    "C is the language underneath a great deal of everything else: operating systems, the Python and Rust runtimes, and most of the programs on a small computer. It is small, close to the machine, and strict about types. These lessons use C11. Every example is a whole program and shows exactly what it prints. To run one yourself, save it as <code>hello.c</code> and type <code>gcc -std=c11 -o hello hello.c && ./hello</code>.",
  comment: "//",
  keywords: ["int", "void", "char", "return", "if", "else", "for", "while", "include", "define"],
  builtins: ["printf", "main"],
  lessons: [
    {
      id: "first",
      title: "Your first program",
      summary: "main, printf and comments.",
      sections: [
        {
          p: "A C program starts in <code>main</code>. <code>printf</code> prints text, but only what you ask for: it does not add a newline unless you write <code>\\n</code>. The line <code>#include &lt;stdio.h&gt;</code> brings <code>printf</code> in. <code>return 0</code> tells the operating system the program finished cleanly.",
          code: `#include <stdio.h>
int main(void) {
    printf("Hello, squirrel!\\n");
    printf("Nuts are ready.\\n");
    return 0;
}`,
          out: "Hello, squirrel!\nNuts are ready.",
        },
        {
          h: "Comments",
          p: "Everything after <code>//</code> on a line is a comment. A comment between <code>/*</code> and <code>*/</code> can span lines. Comments are for people; the compiler throws them away.",
          code: `#include <stdio.h>
int main(void) {
    // This line does nothing.
    printf("Only this shows\\n"); /* and neither does this */
    return 0;
}`,
          out: "Only this shows",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    printf("Up");
    printf(" the tree\\n");
    return 0;
}`, options: ["Up the tree", "Up\nthe tree", "Upthe tree", "Up the tree\\n"], answer: "Up the tree", why: "printf does not add a space or a newline unless you write them. The second call starts right where the first stopped, then \\n ends the line." },
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    // printf("hidden\\n");
    printf("shown\\n");
    return 0;
}`, options: ["shown", "hidden\nshown", "// printf(\"hidden\\n\");\nshown", "Nothing"], answer: "shown", why: "The first printf is inside a comment, so it never runs." },
        { q: "Where does a C program start?", options: ["main", "start", "begin", "printf"], answer: "main", why: "The operating system calls main. printf only prints." },
        { q: "What does return 0 from main mean?", options: ["The program finished without reporting an error", "Print a zero", "Stop after zero seconds", "Return to the top of main"], answer: "The program finished without reporting an error", why: "The number returned from main is the program's exit status. Zero is the usual success code." },
        { q: "Which line brings printf into the program?", options: ["#include <stdio.h>", "import stdio", "using printf", "load stdio.h"], answer: "#include <stdio.h>", why: "stdio.h is the standard header that declares printf." },
      ],
    },
    {
      id: "variables",
      title: "Variables and arithmetic",
      summary: "int, assignment, and why 7 / 2 is 3.",
      sections: [
        {
          p: "A variable has a type and a name. <code>int</code> holds a whole number. <code>=</code> stores a value; it does not ask whether two things are equal.",
          code: `#include <stdio.h>
int main(void) {
    int nuts = 5;
    nuts = nuts + 2;
    printf("%d\\n", nuts);
    return 0;
}`,
          out: "7",
        },
        {
          h: "Integer division",
          p: "When both sides of <code>/</code> are integers, the result is an integer. The fraction is dropped, not rounded. <code>%</code> is the remainder.",
          code: `#include <stdio.h>
int main(void) {
    printf("%d %d\\n", 7 / 2, 7 % 2);
    return 0;
}`,
          out: "3 1",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    int n = 10;
    n = n - 3;
    printf("%d\\n", n);
    return 0;
}`, options: ["7", "10", "13", "n"], answer: "7", why: "n starts at 10 and then becomes 10 − 3." },
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    printf("%d\\n", 5 / 2);
    return 0;
}`, options: ["2", "2.5", "3", "2.0"], answer: "2", why: "Both 5 and 2 are ints, so / drops the fraction." },
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    printf("%d\\n", 5 % 2);
    return 0;
}`, options: ["1", "2", "0", "2.5"], answer: "1", why: "% is the remainder. 5 is two 2s, with 1 left over." },
        { q: "What does = mean in int n = 4?", options: ["Store 4 in n", "Ask whether n equals 4", "Print 4", "Add 4 to n"], answer: "Store 4 in n", why: "One equals sign assigns. Two equals signs, ==, compare." },
        { q: "Which type holds a whole number?", options: ["int", "string", "text", "word"], answer: "int", why: "int is the basic integer type. C has no string type of its own; text is an array of char." },
      ],
    },
    {
      id: "choices",
      title: "Choices",
      summary: "if, else, and ==.",
      sections: [
        {
          p: "<code>if</code> runs the next block only when the test is true. <code>==</code> compares two numbers. A single <code>=</code> would store a value instead, which is a different job.",
          code: `#include <stdio.h>
int main(void) {
    int nuts = 3;
    if (nuts > 2) {
        printf("plenty\\n");
    } else {
        printf("few\\n");
    }
    return 0;
}`,
          out: "plenty",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    int n = 2;
    if (n == 2) {
        printf("yes\\n");
    } else {
        printf("no\\n");
    }
    return 0;
}`, options: ["yes", "no", "2", "yes\nno"], answer: "yes", why: "n == 2 is true, so only the first branch runs." },
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    int n = 0;
    if (n) {
        printf("yes\\n");
    } else {
        printf("no\\n");
    }
    return 0;
}`, options: ["no", "yes", "0", "yes\nno"], answer: "no", why: "In a test, zero is false and any other number is true. n is 0, so the else branch runs." },
        { q: "Which operator asks whether two ints are equal?", options: ["==", "=", "!=", "eq"], answer: "==", why: "= stores a value. == compares. != asks whether they differ." },
        { q: "When does the else block run?", options: ["When the if test is false", "Always, after the if block", "When the if test is true", "Only if you write return"], answer: "When the if test is false", why: "else is the other branch. It is skipped when the test succeeds." },
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    int n = 4;
    if (n > 5) {
        printf("big\\n");
    } else if (n > 3) {
        printf("mid\\n");
    } else {
        printf("small\\n");
    }
    return 0;
}`, options: ["mid", "big", "small", "big\nmid"], answer: "mid", why: "4 is not greater than 5, but it is greater than 3, so the else if branch runs and the rest is skipped." },
      ],
    },
    {
      id: "loops",
      title: "Loops",
      summary: "for and while.",
      sections: [
        {
          p: "A <code>for</code> loop has three parts in the brackets: where to start, when to keep going, and what to do after each pass. This prints 0, 1 and 2. When <code>i</code> reaches 3 the test <code>i &lt; 3</code> fails and the loop stops. <code>continue</code> skips the rest of the current pass and goes straight to the step.",
          code: `#include <stdio.h>
int main(void) {
    int i;
    for (i = 0; i < 3; i = i + 1) {
        printf("%d\\n", i);
    }
    return 0;
}`,
          out: "0\n1\n2",
        },
        {
          h: "while",
          p: "<code>while</code> repeats as long as its test is true. The counter has to change inside the loop, or it never ends.",
          code: `#include <stdio.h>
int main(void) {
    int n = 3;
    while (n > 0) {
        printf("%d\\n", n);
        n = n - 1;
    }
    return 0;
}`,
          out: "3\n2\n1",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    int i;
    for (i = 1; i <= 3; i = i + 1) {
        printf("%d", i);
    }
    printf("\\n");
    return 0;
}`, options: ["123", "012", "1\n2\n3", "123\n123"], answer: "123", why: "i runs through 1, 2 and 3, and each printf adds a digit with no newline. The newline comes after the loop." },
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    int n = 0;
    while (n < 2) {
        printf("x");
        n = n + 1;
    }
    printf("\\n");
    return 0;
}`, options: ["xx", "x", "xxx", "x\nx"], answer: "xx", why: "The body runs for n = 0 and n = 1, then n is 2 and the test fails." },
        { q: "What are the three parts inside for ( ... )?", options: ["Start, keep-going test, step", "Start, step, stop-now", "Test, test, test", "Type, name, value"], answer: "Start, keep-going test, step", why: "for (i = 0; i < 3; i = i + 1) sets i, checks it, then moves it after each pass." },
        { q: "Why must a while loop change something it tests?", options: ["Otherwise the test stays true and the loop never ends", "The compiler rejects an unchanged variable", "while can run only once", "The change is what gets printed"], answer: "Otherwise the test stays true and the loop never ends", why: "The test is checked every pass. If nothing it depends on changes, it keeps succeeding." },
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    int i;
    for (i = 0; i < 4; i = i + 1) {
        if (i == 2) {
            continue;
        }
        printf("%d", i);
    }
    printf("\\n");
    return 0;
}`, options: ["013", "0123", "01", "23"], answer: "013", why: "continue skips the rest of the body for that pass. When i is 2 the printf is skipped, then the loop carries on with 3." },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      summary: "Naming a calculation.",
      sections: [
        {
          p: "A function has a return type, a name, and parameters. <code>add</code> takes two <code>int</code>s and returns an <code>int</code>. The call <code>add(2, 3)</code> runs the body with those values and gives back whatever it <code>return</code>s.",
          code: `#include <stdio.h>
int add(int a, int b) {
    return a + b;
}
int main(void) {
    printf("%d\\n", add(2, 3));
    return 0;
}`,
          out: "5",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int twice(int n) {
    return n * 2;
}
int main(void) {
    printf("%d\\n", twice(4));
    return 0;
}`, options: ["8", "4", "2", "44"], answer: "8", why: "twice returns n * 2, and it is called with 4." },
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int sign(int n) {
    if (n < 0) {
        return -1;
    }
    return 1;
}
int main(void) {
    printf("%d %d\\n", sign(-3), sign(3));
    return 0;
}`, options: ["-1 1", "1 1", "-1 -1", "-3 3"], answer: "-1 1", why: "A negative argument hits the first return. A positive one falls through to return 1." },
        { q: "What does the int before the function name say?", options: ["The type of the value it returns", "How many parameters it takes", "That it runs only once", "That its parameters are ints"], answer: "The type of the value it returns", why: "int add(...) returns an int. The parameter types are written inside the brackets." },
        { q: "What happens at return?", options: ["The function stops and hands a value back to the caller", "The whole program stops", "The value is printed", "The function starts again"], answer: "The function stops and hands a value back to the caller", why: "return leaves the function. main's return is special only because main is where the program started." },
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
void greet(void) {
    printf("hi\\n");
}
int main(void) {
    greet();
    greet();
    return 0;
}`, options: ["hi\nhi", "hi", "greet\ngreet", "hi hi"], answer: "hi\nhi", why: "void means the function returns nothing. Each call prints one line." },
      ],
    },
  ],
};
