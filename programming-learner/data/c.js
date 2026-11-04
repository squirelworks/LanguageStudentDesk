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
    {
      id: "arrays",
      title: "Arrays",
      summary: "Many values of one type, side by side.",
      sections: [
        {
          p: "An array holds a fixed number of values of the same type, one after another in memory. <code>int nuts[5]</code> makes room for five <code>int</code>s. They are numbered from <b>0</b>, so the last one is <code>nuts[4]</code>. Braces give the starting values.",
          code: `#include <stdio.h>
int main(void) {
    int nuts[5] = {3, 1, 4, 1, 5};
    printf("first %d, last %d\\n", nuts[0], nuts[4]);
    nuts[1] = 9;
    printf("second is now %d\\n", nuts[1]);
    return 0;
}`,
          out: "first 3, last 5\nsecond is now 9",
        },
        {
          h: "Looping over an array",
          p: "A <code>for</code> loop from 0 up to (but not including) the length visits every element. C does not store an array's length for you. Inside the function where the array is declared, <code>sizeof nuts / sizeof nuts[0]</code> works it out: the size of the whole array in bytes divided by the size of one element.",
          code: `#include <stdio.h>
int main(void) {
    int nuts[] = {3, 1, 4, 1, 5, 9};
    int count = sizeof nuts / sizeof nuts[0];
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += nuts[i];
    }
    printf("%d days, %d nuts\\n", count, total);
    return 0;
}`,
          out: "6 days, 23 nuts",
        },
        {
          h: "Passing an array to a function",
          p: "When you pass an array to a function, the function receives only where the array starts, not its length. So C functions that take an array almost always take the length as a second parameter. The function can change the caller's elements, because it works on the same memory.",
          code: `#include <stdio.h>
int biggest(const int values[], int count) {
    int best = values[0];
    for (int i = 1; i < count; i++) {
        if (values[i] > best) {
            best = values[i];
        }
    }
    return best;
}
void double_all(int values[], int count) {
    for (int i = 0; i < count; i++) {
        values[i] *= 2;
    }
}
int main(void) {
    int nuts[] = {3, 8, 2};
    printf("biggest %d\\n", biggest(nuts, 3));
    double_all(nuts, 3);
    printf("now %d %d %d\\n", nuts[0], nuts[1], nuts[2]);
    return 0;
}`,
          out: "biggest 8\nnow 6 16 4",
        },
        {
          h: "No bounds checks",
          p: "C does not check that an index is inside the array. Reading <code>nuts[5]</code> from a five-element array is not an error message; it is <b>undefined behaviour</b>: the program may print rubbish, crash, or seem to work and fail later. Many security holes in C programs started this way. Keep the length next to the array and test your loop bounds. Compiling with <code>-fsanitize=address</code> makes gcc and clang stop the program at the first bad access while you test.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    int a[4] = {10, 20, 30, 40};
    printf("%d\\n", a[1] + a[3]);
    return 0;
}`, options: ["60", "40", "30", "70"], answer: "60", why: "Indexes start at 0, so a[1] is 20 and a[3] is 40." },
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    int a[5] = {1, 2};
    printf("%d %d\\n", a[1], a[4]);
    return 0;
}`, options: ["2 0", "2 2", "1 0", "2 rubbish"], answer: "2 0", why: "Elements without a starting value in the braces are set to 0." },
        { q: "Why do C functions that take an array usually take its length too?", options: ["The function only receives where the array starts", "Arrays must always be passed in pairs", "To make the call faster", "sizeof is not allowed inside functions"], answer: "The function only receives where the array starts", why: "Inside the function the array is just a pointer to its first element, so sizeof cannot tell how many there are." },
        { q: "What happens if you read past the end of a C array?", options: ["Undefined behaviour: anything can happen", "The program always stops with an error", "You get 0", "C makes the array bigger"], answer: "Undefined behaviour: anything can happen", why: "C does not check indexes. Tools such as -fsanitize=address can catch it while testing." },
      ],
    },
    {
      id: "strings",
      title: "Strings",
      summary: "Characters in an array, ending with a zero.",
      sections: [
        {
          p: "C has no separate string type. A string is an array of <code>char</code> that ends with a zero byte, written <code>'\\0'</code>. A literal such as <code>\"acorn\"</code> takes six bytes: five letters and the zero. <code>%s</code> in <code>printf</code> prints characters until it reaches that zero, and <code>strlen</code> from <code>&lt;string.h&gt;</code> counts them.",
          code: `#include <stdio.h>
#include <string.h>
int main(void) {
    char name[] = "acorn";
    printf("%s has %zu letters\\n", name, strlen(name));
    printf("the array takes %zu bytes\\n", sizeof name);
    printf("first letter %c\\n", name[0]);
    return 0;
}`,
          out: "acorn has 5 letters\nthe array takes 6 bytes\nfirst letter a",
        },
        {
          h: "Changing letters",
          p: "Because a string is an array, you can loop over it and change single characters. The loop stops at the zero. <code>toupper</code> from <code>&lt;ctype.h&gt;</code> turns one letter into a capital.",
          code: `#include <ctype.h>
#include <stdio.h>
int main(void) {
    char word[] = "hazelnut";
    for (int i = 0; word[i] != '\\0'; i++) {
        word[i] = toupper((unsigned char)word[i]);
    }
    printf("%s\\n", word);
    return 0;
}`,
          out: "HAZELNUT",
        },
        {
          h: "Comparing and building strings",
          p: "<code>==</code> on two strings compares where they are stored, not their letters, so use <code>strcmp</code>: it returns 0 when they are equal. To build a string, <code>snprintf</code> works like <code>printf</code> but writes into an array, and it never writes more than the size you give it, so it cannot run past the end. It returns how many characters the whole text needed, so a result at least as big as the size tells you it was cut short. Older functions such as <code>strcpy</code> and <code>strcat</code> do not check the size, which is why careful code avoids them.",
          code: `#include <stdio.h>
#include <string.h>
int make_label(char *out, size_t size, const char *tree, int number) {
    return snprintf(out, size, "%s tree #%d", tree, number);
}
int main(void) {
    char a[] = "oak";
    char b[] = "oak";
    if (strcmp(a, b) == 0) {
        printf("same letters\\n");
    }
    char label[16];
    make_label(label, sizeof label, a, 7);
    printf("%s\\n", label);
    int needed = make_label(label, sizeof label, "Douglas fir", 12345);
    printf("%s (needed %d)\\n", label, needed);
    return 0;
}`,
          out: "same letters\noak tree #7\nDouglas fir tre (needed 23)",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
#include <string.h>
int main(void) {
    char s[] = "pine";
    printf("%zu %zu\\n", strlen(s), sizeof s);
    return 0;
}`, options: ["4 5", "4 4", "5 5", "5 4"], answer: "4 5", why: "strlen counts the 4 letters. The array also holds the zero at the end, so it is 5 bytes." },
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    char s[] = "squirrel";
    s[3] = '\\0';
    printf("%s\\n", s);
    return 0;
}`, options: ["squ", "squirrel", "squ rrel", "sq"], answer: "squ", why: "%s stops at the first zero byte, which is now at index 3." },
        { q: "How should you check whether two C strings have the same letters?", options: ["strcmp(a, b) == 0", "a == b", "strlen(a) == strlen(b)", "sizeof a == sizeof b"], answer: "strcmp(a, b) == 0", why: "== compares the addresses where the strings are stored, not their contents." },
        { q: "Why is snprintf safer than strcpy for building a string?", options: ["It never writes more than the size you pass", "It is faster", "It adds a newline", "It allocates memory for you"], answer: "It never writes more than the size you pass", why: "strcpy keeps copying until the source ends, even past the end of the destination." },
      ],
    },
    {
      id: "pointers",
      title: "Pointers",
      summary: "Variables that hold where something is.",
      sections: [
        {
          p: "Every variable lives at an <b>address</b> in memory. <code>&amp;x</code> gives the address of <code>x</code>, and a <b>pointer</b> is a variable that stores such an address. <code>int *p</code> declares a pointer to an <code>int</code>. Writing <code>*p</code> follows the pointer to the value it points at, so <code>*p = 7</code> changes <code>x</code> itself.",
          code: `#include <stdio.h>
int main(void) {
    int x = 3;
    int *p = &x;
    printf("x is %d, *p is %d\\n", x, *p);
    *p = 7;
    printf("x is now %d\\n", x);
    return 0;
}`,
          out: "x is 3, *p is 3\nx is now 7",
        },
        {
          h: "Letting a function change your variables",
          p: "C passes arguments by value: a function gets copies. To let it change the caller's variables, pass their addresses. This is how <code>scanf</code> stores what it reads, and how a function can hand back more than one result.",
          code: `#include <stdio.h>
void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}
void split(int total, int *bags, int *left) {
    *bags = total / 6;
    *left = total % 6;
}
int main(void) {
    int x = 1, y = 2;
    swap(&x, &y);
    printf("x=%d y=%d\\n", x, y);
    int bags, left;
    split(20, &bags, &left);
    printf("%d bags, %d left over\\n", bags, left);
    return 0;
}`,
          out: "x=2 y=1\n3 bags, 2 left over",
        },
        {
          h: "Pointers and arrays",
          p: "An array's name used in an expression becomes a pointer to its first element. Adding 1 to a pointer moves it to the next <i>element</i>, not the next byte, so <code>*(p + 2)</code> and <code>p[2]</code> mean the same thing. That is why passing an array to a function passes only its start.",
          code: `#include <stdio.h>
int main(void) {
    int nuts[] = {5, 6, 7, 8};
    int *p = nuts;
    printf("%d %d %d\\n", *p, *(p + 2), p[3]);
    p++;
    printf("after p++: %d\\n", *p);
    for (int *q = nuts; q < nuts + 4; q++) {
        printf("%d ", *q);
    }
    printf("\\n");
    return 0;
}`,
          out: "5 7 8\nafter p++: 6\n5 6 7 8 ",
        },
        {
          h: "NULL",
          p: "A pointer that points at nothing is set to <code>NULL</code>. Following a NULL pointer, or one that points at memory that no longer exists, is undefined behaviour and usually crashes the program. Functions that may fail to find something often return NULL, so check before you use the result.",
          code: `#include <stdio.h>
#include <string.h>
int main(void) {
    const char *trees = "oak, beech, hazel";
    const char *found = strstr(trees, "beech");
    if (found != NULL) {
        printf("found at position %d\\n", (int)(found - trees));
    }
    if (strstr(trees, "palm") == NULL) {
        printf("no palm\\n");
    }
    return 0;
}`,
          out: "found at position 5\nno palm",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    int a = 5;
    int *p = &a;
    *p = *p + 10;
    printf("%d\\n", a);
    return 0;
}`, options: ["15", "5", "10", "an address"], answer: "15", why: "p points at a, so *p = *p + 10 changes a itself." },
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
void bump(int n) {
    n = n + 1;
}
void bump_ptr(int *n) {
    *n = *n + 1;
}
int main(void) {
    int x = 1;
    bump(x);
    bump_ptr(&x);
    printf("%d\\n", x);
    return 0;
}`, options: ["2", "3", "1", "0"], answer: "2", why: "bump changes only its own copy. bump_ptr follows the address to x, so only that call counts." },
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
int main(void) {
    int v[] = {2, 4, 6, 8};
    int *p = v + 1;
    printf("%d %d\\n", *p, p[1]);
    return 0;
}`, options: ["4 6", "2 4", "4 8", "6 8"], answer: "4 6", why: "v + 1 points at the second element (4), and p[1] is the one after it (6)." },
        { q: "What does & do in &x?", options: ["Gives the address of x", "Follows a pointer", "Means logical and", "Makes a copy of x"], answer: "Gives the address of x", why: "& takes an address; * follows one." },
      ],
    },
    {
      id: "structs",
      title: "Structs",
      summary: "Grouping related values under one name.",
      sections: [
        {
          p: "A <code>struct</code> bundles several values, each with its own name and type, into one. Fields are reached with a dot. <code>typedef</code> gives the struct a short name so you can write <code>Tree</code> instead of <code>struct tree</code>. Structs can be copied with <code>=</code> and passed to and returned from functions like any other value.",
          code: `#include <stdio.h>
typedef struct {
    char name[16];
    int nuts;
    double height;
} Tree;
int main(void) {
    Tree t = {"oak", 120, 18.5};
    printf("%s: %d nuts, %.1f m\\n", t.name, t.nuts, t.height);
    Tree copy = t;
    copy.nuts = 0;
    printf("copy has %d, original still has %d\\n", copy.nuts, t.nuts);
    return 0;
}`,
          out: "oak: 120 nuts, 18.5 m\ncopy has 0, original still has 120",
        },
        {
          h: "Arrays of structs",
          p: "An array of structs is the C way to keep a table of records. Designated initializers such as <code>.nuts = 40</code> name each field, which reads well and keeps working if the fields are reordered.",
          code: `#include <stdio.h>
typedef struct {
    const char *name;
    int nuts;
} Tree;
int main(void) {
    Tree park[] = {
        {.name = "oak", .nuts = 40},
        {.name = "beech", .nuts = 75},
        {.name = "hazel", .nuts = 60},
    };
    int count = sizeof park / sizeof park[0];
    int best = 0;
    for (int i = 1; i < count; i++) {
        if (park[i].nuts > park[best].nuts) {
            best = i;
        }
    }
    printf("most nuts: %s (%d)\\n", park[best].name, park[best].nuts);
    return 0;
}`,
          out: "most nuts: beech (75)",
        },
        {
          h: "Pointers to structs",
          p: "Passing a big struct by value copies all of it, and the function cannot change the caller's copy. Passing a pointer avoids both problems. <code>p-&gt;nuts</code> is shorthand for <code>(*p).nuts</code>: follow the pointer, then take the field. Mark the pointer <code>const</code> when the function only reads.",
          code: `#include <stdio.h>
typedef struct {
    const char *name;
    int nuts;
} Tree;
void harvest(Tree *t, int amount) {
    if (amount > t->nuts) {
        amount = t->nuts;
    }
    t->nuts -= amount;
}
void show(const Tree *t) {
    printf("%s has %d nuts\\n", t->name, t->nuts);
}
int main(void) {
    Tree oak = {"oak", 30};
    harvest(&oak, 12);
    show(&oak);
    harvest(&oak, 50);
    show(&oak);
    return 0;
}`,
          out: "oak has 18 nuts\noak has 0 nuts",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
typedef struct {
    int x, y;
} Point;
int main(void) {
    Point a = {1, 2};
    Point b = a;
    b.x = 10;
    printf("%d %d\\n", a.x, b.x);
    return 0;
}`, options: ["1 10", "10 10", "1 1", "10 1"], answer: "1 10", why: "b = a copies the whole struct, so changing b leaves a alone." },
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
typedef struct {
    int count;
} Box;
void add(Box *b) {
    b->count += 5;
}
int main(void) {
    Box b = {1};
    add(&b);
    add(&b);
    printf("%d\\n", b.count);
    return 0;
}`, options: ["11", "6", "1", "10"], answer: "11", why: "add receives a pointer, so both calls change the same Box: 1 + 5 + 5." },
        { q: "What does p->field mean?", options: ["(*p).field: follow the pointer, then take the field", "Copy the struct p into field", "Compare p with field", "The address of field"], answer: "(*p).field: follow the pointer, then take the field", why: "-> is shorthand for following a pointer to a struct and reading one field." },
      ],
    },
    {
      id: "memory",
      title: "Memory with malloc and free",
      summary: "Asking for memory while the program runs.",
      sections: [
        {
          p: "Local variables disappear when their function returns, and arrays need a size fixed when you write the program. When you only know the size while running, ask for memory with <code>malloc</code> from <code>&lt;stdlib.h&gt;</code>. It returns a pointer to a block of the size you ask for, or <code>NULL</code> if there is none. The memory stays yours until you hand it back with <code>free</code>.",
          code: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int days = 7;
    int *nuts = malloc(days * sizeof *nuts);
    if (nuts == NULL) {
        printf("out of memory\\n");
        return 1;
    }
    for (int i = 0; i < days; i++) {
        nuts[i] = (i + 1) * 3;
    }
    printf("day 7: %d nuts\\n", nuts[6]);
    free(nuts);
    return 0;
}`,
          out: "day 7: 21 nuts",
        },
        {
          h: "Growing with realloc",
          p: "<code>realloc</code> resizes a block, moving it if it has to, and returns the new address. A common pattern is a list that doubles its capacity whenever it fills up, so adding n items costs only about 2n copies in total. Keep the old pointer until realloc succeeds, so a failure does not lose your data.",
          code: `#include <stdio.h>
#include <stdlib.h>
typedef struct {
    int *items;
    int count, capacity;
} List;
int push(List *list, int value) {
    if (list->count == list->capacity) {
        int bigger = list->capacity ? list->capacity * 2 : 2;
        int *moved = realloc(list->items, bigger * sizeof *moved);
        if (moved == NULL) {
            return 0;
        }
        list->items = moved;
        list->capacity = bigger;
        printf("grew to %d\\n", bigger);
    }
    list->items[list->count++] = value;
    return 1;
}
int main(void) {
    List list = {NULL, 0, 0};
    for (int i = 1; i <= 9; i++) {
        push(&list, i * i);
    }
    printf("%d items, last %d\\n", list.count, list.items[list.count - 1]);
    free(list.items);
    return 0;
}`,
          out: "grew to 2\ngrew to 4\ngrew to 8\ngrew to 16\n9 items, last 81",
        },
        {
          h: "What can go wrong",
          p: "The C compiler does not track who owns which block, so a few mistakes are easy to make. Forgetting <code>free</code> is a <b>leak</b>: the memory stays taken until the program ends. Using a pointer after <code>free</code> (a <b>dangling pointer</b>) or freeing the same block twice is undefined behaviour. A good habit is that whoever calls <code>malloc</code> is responsible for the matching <code>free</code>, and to set the pointer to <code>NULL</code> afterwards. Tools such as Valgrind and <code>-fsanitize=address</code> find these mistakes while you test. Languages such as Rust were designed largely to make them impossible.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *p = calloc(3, sizeof *p);
    if (p == NULL) {
        return 1;
    }
    p[1] = 4;
    printf("%d %d %d\\n", p[0], p[1], p[2]);
    free(p);
    return 0;
}`, options: ["0 4 0", "rubbish 4 rubbish", "4 4 4", "0 0 0"], answer: "0 4 0", why: "calloc, unlike malloc, fills the new block with zeros." },
        { q: "What does malloc return when there is no memory left?", options: ["NULL", "0 bytes of memory", "It stops the program", "The previous block"], answer: "NULL", why: "Always check the result before using it." },
        { q: "What is a memory leak?", options: ["Memory taken with malloc that is never freed", "Reading past the end of an array", "Using a pointer after free", "Running out of stack space"], answer: "Memory taken with malloc that is never freed", why: "The block stays reserved until the program ends, so a long-running program slowly uses more and more." },
        { q: "Why keep the old pointer when calling realloc?", options: ["If realloc fails it returns NULL and the old block is still yours", "realloc always frees the old block", "The new pointer is always the same", "To call free twice"], answer: "If realloc fails it returns NULL and the old block is still yours", why: "Writing p = realloc(p, ...) would lose the only pointer to your data when it fails." },
      ],
    },
    {
      id: "project",
      title: "Project: a nut ledger",
      summary: "Structs, arrays, strings and sorting in one small program.",
      sections: [
        {
          p: "This small program puts the earlier lessons together. It reads a day-by-day record of where nuts were buried, adds up each tree with a loop over an array of structs, sorts the totals with the standard library's <code>qsort</code>, and prints a report. <code>qsort</code> sorts any array: you give it the start, the number of elements, the size of one, and a <b>comparison function</b> that says which of two elements comes first. The function gets <code>const void *</code> pointers, which can point at anything, so it converts them back to <code>const Total *</code> first.",
          code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct {
    const char *tree;
    int nuts;
} Entry;
typedef struct {
    char tree[16];
    int nuts;
} Total;
/* More nuts first; ties in alphabetical order. */
int by_nuts(const void *a, const void *b) {
    const Total *x = a, *y = b;
    if (x->nuts != y->nuts) {
        return y->nuts - x->nuts;
    }
    return strcmp(x->tree, y->tree);
}
int main(void) {
    Entry log[] = {
        {"oak", 12}, {"hazel", 7}, {"oak", 5}, {"beech", 9},
        {"hazel", 10}, {"beech", 8}, {"pine", 2},
    };
    int entries = sizeof log / sizeof log[0];
    Total totals[8];
    int trees = 0;
    for (int i = 0; i < entries; i++) {
        int j = 0;
        while (j < trees && strcmp(totals[j].tree, log[i].tree) != 0) {
            j++;
        }
        if (j == trees) {
            snprintf(totals[j].tree, sizeof totals[j].tree, "%s", log[i].tree);
            totals[j].nuts = 0;
            trees++;
        }
        totals[j].nuts += log[i].nuts;
    }
    qsort(totals, trees, sizeof totals[0], by_nuts);
    int all = 0;
    for (int i = 0; i < trees; i++) {
        printf("%-6s %3d\\n", totals[i].tree, totals[i].nuts);
        all += totals[i].nuts;
    }
    printf("%-6s %3d\\n", "total", all);
    return 0;
}`,
          out: "beech   17\nhazel   17\noak     17\npine     2\ntotal   53",
        },
        {
          h: "Ideas to try",
          p: "Change the program and check the output still makes sense: add a column with each tree's share of the total as a percentage, read the entries from a file with <code>fopen</code> and <code>fscanf</code> instead of an array, or replace the fixed <code>totals[8]</code> with the growing list from the memory lesson so any number of trees fits.",
        },
      ],
      practice: [
        { q: "What should a qsort comparison function return when a should come before b?", options: ["A negative number", "A positive number", "Zero", "true"], answer: "A negative number", why: "Negative means a first, positive means b first, and zero means they are equal for sorting." },
        { kind: "output", q: "What does this print?", code: `#include <stdio.h>
#include <stdlib.h>
int up(const void *a, const void *b) {
    return *(const int *)a - *(const int *)b;
}
int main(void) {
    int v[] = {4, 1, 3};
    qsort(v, 3, sizeof v[0], up);
    printf("%d %d %d\\n", v[0], v[1], v[2]);
    return 0;
}`, options: ["1 3 4", "4 3 1", "4 1 3", "1 4 3"], answer: "1 3 4", why: "up returns a negative number when a is smaller, so smaller values come first." },
        { q: "Why does by_nuts take const void * parameters?", options: ["qsort works with any element type, so it passes untyped pointers", "void means the function returns nothing", "To make the sort faster", "Because Total cannot be passed to functions"], answer: "qsort works with any element type, so it passes untyped pointers", why: "The comparison converts them back to the real type before reading the fields." },
      ],
    },
  ],
};
