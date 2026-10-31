// QuickBASIC course for the Programming Learner. Written for this project.
// Schema: see data/python.js. Examples with `out` and practice of kind
// "output" are run by tools/check_packs.py with tools/run_quickbasic.py.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.quickbasic = {
  id: "quickbasic",
  name: "QuickBASIC",
  title: "QuickBASIC on DOS",
  intro:
    "QuickBASIC (and its free little sibling QBasic, which came with MS-DOS 5 and Windows 95) gave BASIC a full-screen editor, structured loops and named subroutines, so line numbers became optional. It is a good way to see how programs worked before windows and mice, and a gentle first language in its own right. To try it today, run QBasic or QuickBASIC 4.5 inside DOSBox, or use QB64, a modern compiler that understands the same code. Press F5 in the editor to run a program. Every example here shows exactly what it prints.",
  comment: "'",
  caseInsensitive: true,
  keywords: [
    "PRINT", "INPUT", "LET", "DIM", "REDIM", "AS", "IF", "THEN", "ELSE", "ELSEIF", "END", "FOR", "TO", "STEP", "NEXT", "DO", "LOOP",
    "WHILE", "WEND", "UNTIL", "SUB", "FUNCTION", "CALL", "DECLARE", "GOTO", "GOSUB", "RETURN", "SELECT", "CASE", "IS", "REM", "AND", "OR", "XOR",
    "NOT", "MOD", "INTEGER", "STRING", "SINGLE", "DOUBLE", "LONG", "CLS", "SCREEN", "COLOR", "LOCATE", "EXIT", "SHARED", "CONST",
    "DATA", "READ", "RESTORE", "SWAP", "RANDOMIZE", "SLEEP", "BEEP",
  ],
  builtins: [
    "LEN", "LEFT$", "RIGHT$", "MID$", "UCASE$", "LCASE$", "LTRIM$", "RTRIM$", "STR$", "VAL", "INT", "FIX", "CINT", "ABS", "SQR", "RND",
    "TIMER", "CHR$", "ASC", "INSTR", "SPACE$", "STRING$", "INKEY$", "TAB", "SPC",
  ],
  lessons: [
    {
      id: "basics",
      title: "PRINT and the screen",
      summary: "Showing text and numbers, and how PRINT spaces them.",
      sections: [
        {
          p: "<code>PRINT</code> writes a line to the screen and <code>CLS</code> clears it. A comment starts with an apostrophe (or the older <code>REM</code>). <code>PRINT</code> on its own prints an empty line.",
          code: `CLS
' My first program
PRINT "Hello from QuickBASIC"
PRINT
PRINT 6 * 7`,
          out: "Hello from QuickBASIC\n\n 42",
        },
        {
          h: "Spaces around numbers",
          p: "QuickBASIC prints a number with a space in front (where a minus sign would go) and one after. A negative number uses that front space for its minus sign. Text is printed exactly as written.",
          code: `PRINT 5
PRINT -5
PRINT "5"`,
          out: " 5\n-5\n5",
        },
        {
          h: "Semicolons and commas",
          p: "A <b>semicolon</b> between items keeps the cursor on the same line; a <b>comma</b> jumps to the next 14-character column, which lines things up like a table. A semicolon at the very end means the next <code>PRINT</code> carries on the same line.",
          code: `PRINT "Total:"; 5
PRINT "A", "B", "C"
PRINT "same ";
PRINT "line"`,
          out: "Total: 5\nA             B             C\nsame line",
        },
        {
          h: "TAB and SPC",
          p: "<code>TAB(n)</code> moves to column n of the line (counting from 1) and <code>SPC(n)</code> prints n spaces. They only work inside <code>PRINT</code>.",
          code: `PRINT "Name"; TAB(10); "Nuts"
PRINT "Hazel"; TAB(10); "12"
PRINT "x"; SPC(3); "y"`,
          out: "Name     Nuts\nHazel    12\nx   y",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `PRINT "x"; "y"`, options: ["xy", "x y", "x      y", "x\ny"], answer: "xy", why: "A semicolon joins items with nothing between them. Only numbers get their own padding spaces." },
        { q: "Which line is a comment?", options: ["' count the nuts", "// count the nuts", "# count the nuts", "-- count the nuts"], answer: "' count the nuts", why: "An apostrophe (or REM) starts a comment in QuickBASIC." },
        { kind: "output", q: "What does this print?", code: `PRINT 3 + 4`, options: [" 7", "3 + 4", "7.0", "34"], answer: " 7", why: "The sum is printed with the leading space QuickBASIC leaves for a sign." },
        { kind: "output", q: "What does this print?", code: `PRINT "Up";
PRINT "Tree"`, options: ["UpTree", "Up\nTree", "Up Tree", "Up;Tree"], answer: "UpTree", why: "The semicolon at the end keeps the cursor on the line, so the next PRINT carries on." },
        { kind: "output", q: "What does this print?", code: `PRINT "Nuts:"; -3`, options: ["Nuts:-3", "Nuts: -3", "Nuts: 3", "Nuts:- 3"], answer: "Nuts:-3", why: "The space before a number is where its sign goes, so a negative number fills it with the minus." },
        { q: "What does a comma between PRINT items do?", options: ["Moves to the next 14-character column", "Prints a comma", "Starts a new line", "Joins the items with no space"], answer: "Moves to the next 14-character column", why: "Commas line output up in print zones, which is handy for tables." },
      ],
    },
    {
      id: "variables",
      title: "Variables and types",
      summary: "Type suffixes, DIM ... AS, CONST and joining text.",
      sections: [
        {
          p: "A variable is a name for a value. <code>=</code> stores a value in it (the old keyword <code>LET</code> is optional). The last character of a name sets its type: <code>$</code> for text, <code>%</code> for a whole number, <code>&amp;</code> for a long whole number, and <code>!</code> or nothing for a decimal number.",
          code: `who$ = "Hazel"
nuts% = 12
weight = 0.5
PRINT who$; " has"; nuts%; "nuts"
PRINT "and weighs"; weight; "kg"`,
          out: "Hazel has 12 nuts\nand weighs .5 kg",
        },
        {
          h: "No leading zero",
          p: "Notice <code>.5</code> above: QuickBASIC leaves out the 0 before a decimal point. A variable that has never been given a value is 0, or an empty string for text.",
          code: `PRINT never
PRINT "["; empty$; "]"`,
          out: " 0\n[]",
        },
        {
          h: "Whole numbers round",
          p: "Storing a decimal in a <code>%</code> variable rounds it to the nearest whole number. An <code>INTEGER</code> holds −32768 to 32767; a <code>LONG</code> (<code>&amp;</code>) holds about ±2 billion.",
          code: `a% = 7.6
b% = 7.2
PRINT a%; b%`,
          out: " 8  7",
        },
        {
          h: "DIM ... AS",
          p: "Instead of a suffix you can declare a type with <code>DIM name AS type</code>. The types are <code>INTEGER</code>, <code>LONG</code>, <code>SINGLE</code>, <code>DOUBLE</code> (more digits) and <code>STRING</code>.",
          code: `DIM pet AS STRING
DIM legs AS INTEGER
pet = "squirrel"
legs = 4
PRINT "A "; pet; " has"; legs; "legs"`,
          out: "A squirrel has 4 legs",
        },
        {
          h: "Joining text and CONST",
          p: "<code>+</code> joins two strings. <code>CONST</code> names a value that never changes, which keeps magic numbers out of the program.",
          code: `CONST TREES = 3
first$ = "Oak"
whole$ = first$ + " tree"
PRINT whole$; " x"; TREES`,
          out: "Oak tree x 3",
        },
      ],
      practice: [
        { q: "Which variable holds text?", options: ["n$", "n%", "n!", "n&"], answer: "n$", why: "The $ suffix makes a string variable." },
        { kind: "output", q: "What does this print?", code: `x% = 4.7
PRINT x%`, options: [" 5", " 4.7", " 4", "4.7"], answer: " 5", why: "A % variable holds whole numbers, so 4.7 is rounded to 5." },
        { kind: "output", q: "What does this print?", code: `PRINT 0.25`, options: [" .25", " 0.25", "0.25", " 25"], answer: " .25", why: "QuickBASIC drops the 0 in front of the decimal point." },
        { kind: "output", q: "What does this print?", code: `a$ = "nut"
b$ = "meg"
PRINT b$ + a$`, options: ["megnut", "nutmeg", "meg nut", "nut meg"], answer: "megnut", why: "+ joins strings in the order written." },
        { q: "What is in count% if the program never set it?", options: ["0", "Nothing; it is an error", "-1", "A random number"], answer: "0", why: "Number variables start at 0 and strings start empty." },
        { q: "Which type holds the most digits?", options: ["DOUBLE", "SINGLE", "INTEGER", "LONG"], answer: "DOUBLE", why: "DOUBLE is double precision: about 15 digits against SINGLE's 7." },
      ],
    },
    {
      id: "maths",
      title: "Maths",
      summary: "Operators, whole-number division, powers and the maths functions.",
      sections: [
        {
          p: "<code>+ - * /</code> work as on a calculator, and <code>^</code> raises to a power. <code>\\</code> (backslash) divides and drops the remainder; <code>MOD</code> gives the remainder.",
          code: String.raw`PRINT 7 / 2
PRINT 7 \ 2
PRINT 7 MOD 2
PRINT 2 ^ 10`,
          out: " 3.5\n 3\n 1\n 1024",
        },
        {
          h: "Order of operations",
          p: "Powers first, then a minus sign in front, then <code>*</code> and <code>/</code>, then <code>\\</code>, then <code>MOD</code>, then <code>+</code> and <code>-</code>. Brackets go first of all.",
          code: `PRINT 2 + 3 * 4
PRINT (2 + 3) * 4
PRINT 10 - 4 - 3`,
          out: " 14\n 20\n 3",
        },
        {
          h: "Seven digits",
          p: "Ordinary decimal variables are <code>SINGLE</code> precision, so PRINT shows at most 7 digits.",
          code: `PRINT 10 / 3
PRINT 1 / 8`,
          out: " 3.333333\n .125",
        },
        {
          h: "Maths functions",
          p: "<code>INT</code> rounds down to a whole number, <code>FIX</code> just chops off the decimals (they differ for negative numbers), <code>ABS</code> drops the sign and <code>SQR</code> is the square root.",
          code: `PRINT INT(3.7); FIX(3.7)
PRINT INT(-3.7); FIX(-3.7)
PRINT ABS(-8); SQR(81)`,
          out: " 3  3\n-4 -3\n 8  9",
        },
        {
          h: "Updating a variable",
          p: "To change a variable, work out the new value from the old one and store it back.",
          code: `score = 10
score = score + 5
score = score * 2
PRINT score`,
          out: " 30",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: String.raw`PRINT 17 \ 5`, options: [" 3", " 3.4", " 2", " 4"], answer: " 3", why: "Backslash is whole-number division: 5 fits into 17 three times." },
        { kind: "output", q: "What does this print?", code: `PRINT 17 MOD 5`, options: [" 2", " 3", " 3.4", " 12"], answer: " 2", why: "17 is 3 × 5 with 2 left over." },
        { kind: "output", q: "What does this print?", code: `PRINT 1 + 2 * 3`, options: [" 7", " 9", " 6", " 123"], answer: " 7", why: "Multiplication comes before addition: 2 × 3 = 6, then 1 + 6." },
        { kind: "output", q: "What does this print?", code: `PRINT 3 ^ 2`, options: [" 9", " 6", " 5", " 1"], answer: " 9", why: "^ is a power: 3 squared." },
        { kind: "output", q: "What does this print?", code: `PRINT INT(-1.5)`, options: ["-2", "-1", " 2", "-1.5"], answer: "-2", why: "INT always rounds down, and down from −1.5 is −2. FIX would give −1." },
        { kind: "output", q: "What does this print?", code: `PRINT 2 / 8`, options: [" .25", " 0", " 4", " 0.25"], answer: " .25", why: "/ gives a decimal answer, printed without the leading 0." },
      ],
    },
    {
      id: "strings",
      title: "Working with text",
      summary: "LEN, LEFT$, RIGHT$, MID$, INSTR, UCASE$, STR$, VAL, CHR$ and ASC.",
      sections: [
        {
          p: "Functions whose names end in <code>$</code> give back text. <code>LEN</code> counts characters. <code>LEFT$</code> and <code>RIGHT$</code> take characters from either end, and <code>MID$(s$, start, length)</code> takes them from the middle, counting from 1.",
          code: `w$ = "squirrel"
PRINT LEN(w$)
PRINT LEFT$(w$, 3)
PRINT RIGHT$(w$, 3)
PRINT MID$(w$, 3, 4)`,
          out: " 8\nsqu\nrel\nuirr",
        },
        {
          h: "Finding and changing case",
          p: "<code>INSTR(s$, find$)</code> gives the position where <code>find$</code> first appears, or 0 if it does not. <code>UCASE$</code> and <code>LCASE$</code> change case.",
          code: `PRINT INSTR("hazelnut", "nut")
PRINT INSTR("hazelnut", "pea")
PRINT UCASE$("acorn"); " "; LCASE$("OAK")`,
          out: " 6\n 0\nACORN oak",
        },
        {
          h: "Numbers and text",
          p: "<code>STR$</code> turns a number into text (keeping the space for the sign) and <code>VAL</code> turns text into a number, reading as far as it can. You cannot add a number to a string without converting it first.",
          code: `n = 42
t$ = "Answer:" + STR$(n)
PRINT t$
PRINT VAL("12 apples") + 1`,
          out: "Answer: 42\n 13",
        },
        {
          h: "Character codes",
          p: "Every character has a code number. <code>ASC</code> gives the code of the first character and <code>CHR$</code> turns a code back into a character. Letters are in order, so adding to a code moves along the alphabet.",
          code: `PRINT ASC("A")
PRINT CHR$(66)
PRINT CHR$(ASC("a") + 2)`,
          out: " 65\nB\nc",
        },
        {
          h: "Comparing text",
          p: "Strings compare letter by letter by their codes, so <code>\"apple\" &lt; \"banana\"</code> is true. Every capital letter comes before every small letter, which is why programs often <code>UCASE$</code> both sides first.",
          code: `IF "apple" < "banana" THEN PRINT "apple first"
IF "Zebra" < "apple" THEN PRINT "capitals first"`,
          out: "apple first\ncapitals first",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `PRINT LEFT$("acorn", 2)`, options: ["ac", "rn", "co", "a"], answer: "ac", why: "LEFT$ takes characters from the start." },
        { kind: "output", q: "What does this print?", code: `PRINT MID$("chestnut", 6, 3)`, options: ["nut", "tnu", "che", "stn"], answer: "nut", why: "Counting from 1, position 6 is n, and three characters are n, u, t." },
        { kind: "output", q: "What does this print?", code: `PRINT LEN("oak tree")`, options: [" 8", " 7", " 2", " 3"], answer: " 8", why: "The space counts as a character too." },
        { kind: "output", q: "What does this print?", code: `PRINT INSTR("walnut", "l")`, options: [" 3", " 2", " 4", " 0"], answer: " 3", why: "w is 1, a is 2, l is 3." },
        { q: "What does \"Score:\" + 5 do?", options: ["Stops with a type mismatch error", "Gives Score:5", "Gives Score: 5", "Gives 5"], answer: "Stops with a type mismatch error", why: "+ cannot join text and a number; convert with STR$ first." },
        { kind: "output", q: "What does this print?", code: `PRINT CHR$(ASC("B") + 1)`, options: ["C", "A", "B1", " 67"], answer: "C", why: "B is code 66; one more is 67, which is C." },
      ],
    },
    {
      id: "flow",
      title: "Decisions",
      summary: "IF, ELSEIF, ELSE, AND, OR, NOT and what true really is.",
      sections: [
        {
          p: "Block <code>IF</code> runs lines until <code>END IF</code>. <code>ELSEIF</code> and <code>ELSE</code> add more branches; only the first matching one runs. Equality is a single <code>=</code>; not-equal is <code>&lt;&gt;</code>.",
          code: `temp = 4
IF temp < 0 THEN
    PRINT "Freezing"
ELSEIF temp < 10 THEN
    PRINT "Chilly"
ELSE
    PRINT "Mild"
END IF`,
          out: "Chilly",
        },
        {
          h: "One-line IF",
          p: "For something short, put it all on one line. No <code>END IF</code> is needed. A colon separates several statements on one line.",
          code: `nuts = 0
IF nuts = 0 THEN PRINT "Hungry!": PRINT "Off to find nuts"
IF nuts > 5 THEN PRINT "Full" ELSE PRINT "Not full"`,
          out: "Hungry!\nOff to find nuts\nNot full",
        },
        {
          h: "AND, OR and NOT",
          p: "Combine tests with <code>AND</code> (both true), <code>OR</code> (at least one true) and <code>NOT</code>.",
          code: `age = 12
IF age >= 10 AND age <= 19 THEN PRINT "Teenager or nearly"
IF age < 5 OR age > 65 THEN PRINT "Free entry" ELSE PRINT "Pay at the gate"`,
          out: "Teenager or nearly\nPay at the gate",
        },
        {
          h: "True is -1",
          p: "A comparison is really a number: −1 for true and 0 for false. <code>IF</code> treats any value that is not 0 as true. That is why <code>NOT 0</code> is −1.",
          code: `PRINT 3 > 2; 3 < 2
PRINT NOT 0
flag = 5
IF flag THEN PRINT "non-zero counts as true"`,
          out: "-1  0\n-1\nnon-zero counts as true",
        },
      ],
      practice: [
        { q: "How do you write “not equal” in QuickBASIC?", options: ["<>", "!=", "=/=", "~="], answer: "<>", why: "BASIC uses <> for not equal." },
        { q: "What closes a block IF?", options: ["END IF", "ENDIF;", "FI", "NEXT"], answer: "END IF", why: "Block IF statements end with END IF, written as two words." },
        { kind: "output", q: "What does this print?", code: `x = 15
IF x > 20 THEN
    PRINT "big"
ELSEIF x > 10 THEN
    PRINT "medium"
ELSEIF x > 5 THEN
    PRINT "small"
END IF`, options: ["medium", "medium\nsmall", "big", "small"], answer: "medium", why: "Only the first branch whose test is true runs, even though x > 5 is also true." },
        { kind: "output", q: "What does this print?", code: `PRINT 5 = 5`, options: ["-1", " 1", " 0", "TRUE"], answer: "-1", why: "A true comparison has the value −1 in QuickBASIC." },
        { kind: "output", q: "What does this print?", code: `a = 3
IF a > 1 AND a < 3 THEN PRINT "in" ELSE PRINT "out"`, options: ["out", "in", "in\nout", "Nothing"], answer: "out", why: "a < 3 is false when a is 3, and AND needs both to be true." },
        { q: "Which runs the PRINT?", options: ["IF 7 THEN PRINT \"yes\"", "IF 0 THEN PRINT \"yes\"", "IF \"\" THEN PRINT \"yes\"", "IF 3 < 2 THEN PRINT \"yes\""], answer: "IF 7 THEN PRINT \"yes\"", why: "Any non-zero number counts as true; IF \"\" is a type mismatch, since IF wants a number." },
      ],
    },
    {
      id: "loops",
      title: "Loops",
      summary: "FOR…NEXT, DO…LOOP, WHILE…WEND and EXIT.",
      sections: [
        {
          h: "FOR…NEXT",
          p: "Counts from a start to an end value, inclusive. <code>STEP</code> sets how much to add each time; a negative step counts down.",
          code: `FOR i = 1 TO 10 STEP 3
    PRINT i;
NEXT i
PRINT
FOR i = 3 TO 1 STEP -1
    PRINT i;
NEXT i`,
          out: " 1  4  7  10\n 3  2  1",
        },
        {
          h: "Adding up",
          p: "A loop and a running total add up a list of numbers. This finds 1 + 2 + … + 100.",
          code: `total = 0
FOR n = 1 TO 100
    total = total + n
NEXT n
PRINT total`,
          out: " 5050",
        },
        {
          h: "DO…LOOP",
          p: "Repeats while (or until) a condition holds. With the test at the top the body might never run; with the test at the bottom (<code>LOOP UNTIL</code>, <code>LOOP WHILE</code>) it always runs at least once.",
          code: `stash = 1
DO WHILE stash < 20
    stash = stash * 3
LOOP
PRINT stash
n = 100
DO
    n = n + 1
LOOP UNTIL n > 5
PRINT n`,
          out: " 27\n 101",
        },
        {
          h: "WHILE…WEND",
          p: "<code>WHILE</code> ... <code>WEND</code> is the older form of <code>DO WHILE</code> ... <code>LOOP</code>. You will see it in older listings.",
          code: `n = 1
WHILE n < 100
    n = n * 2
WEND
PRINT n`,
          out: " 128",
        },
        {
          h: "EXIT",
          p: "<code>EXIT FOR</code> and <code>EXIT DO</code> leave a loop early, for example as soon as an answer is found.",
          code: `FOR n = 2 TO 100
    IF n * n > 50 THEN EXIT FOR
NEXT n
PRINT "First square over 50 is"; n; "squared"`,
          out: "First square over 50 is 8 squared",
        },
        {
          h: "Loops in loops",
          p: "Each pass of the outer loop runs the whole inner loop. This prints a small times table.",
          code: `FOR r = 1 TO 3
    FOR c = 1 TO 4
        PRINT r * c;
    NEXT c
    PRINT
NEXT r`,
          out: " 1  2  3  4\n 2  4  6  8\n 3  6  9  12",
        },
      ],
      practice: [
        { q: "How many numbers does FOR i = 1 TO 10 STEP 3 … NEXT print?", options: ["4", "3", "10", "5"], answer: "4", why: "1, 4, 7 and 10. The end value counts when it is reached exactly." },
        { q: "FOR i = 5 TO 1 STEP -2 visits which values?", options: ["5, 3, 1", "5, 4, 3, 2, 1", "1, 3, 5", "Nothing"], answer: "5, 3, 1", why: "A negative STEP counts down, and 1 is reached exactly." },
        { kind: "output", q: "What does this print?", code: `FOR k = 2 TO 8 STEP 2
    PRINT k;
NEXT k`, options: [" 2  4  6  8", " 2  4  6", " 2  3  4  5  6  7  8", " 8"], answer: " 2  4  6  8", why: "Starting at 2 and adding 2 each time reaches 8 exactly." },
        { kind: "output", q: "What does this print?", code: `n = 10
DO WHILE n < 5
    n = n + 1
LOOP
PRINT n`, options: [" 10", " 5", " 11", " 4"], answer: " 10", why: "The test is at the top and is false straight away, so the body never runs." },
        { kind: "output", q: "What does this print?", code: `n = 10
DO
    n = n + 1
LOOP WHILE n < 5
PRINT n`, options: [" 11", " 10", " 5", " 6"], answer: " 11", why: "With the test at the bottom the body runs once before the test is checked." },
        { kind: "output", q: "What does this print?", code: `t = 0
FOR i = 1 TO 4
    t = t + i
NEXT i
PRINT t`, options: [" 10", " 4", " 24", " 5"], answer: " 10", why: "1 + 2 + 3 + 4 = 10." },
      ],
    },
    {
      id: "select",
      title: "SELECT CASE",
      summary: "Choosing by value, by range and by comparison.",
      sections: [
        {
          p: "<code>SELECT CASE</code> picks one branch by value, which reads better than a long chain of IFs. <code>CASE ELSE</code> catches everything not listed. Only the first matching case runs.",
          code: `k$ = "S"
SELECT CASE k$
    CASE "N": PRINT "North"
    CASE "S": PRINT "South"
    CASE ELSE: PRINT "Stay"
END SELECT`,
          out: "South",
        },
        {
          h: "Lists, ranges and IS",
          p: "A case can list several values separated by commas, give a range with <code>TO</code>, or compare with <code>IS</code>.",
          code: `FOR n = 0 TO 12 STEP 4
    SELECT CASE n
        CASE 0
            PRINT n; "none"
        CASE 1, 2, 3
            PRINT n; "a few"
        CASE 4 TO 9
            PRINT n; "several"
        CASE IS >= 10
            PRINT n; "lots"
    END SELECT
NEXT n`,
          out: " 0 none\n 4 several\n 8 several\n 12 lots",
        },
        {
          h: "Text cases",
          p: "Cases can be strings. Comparing <code>UCASE$</code> of the input means the user can type either case.",
          code: `answer$ = "yes"
SELECT CASE UCASE$(answer$)
    CASE "Y", "YES"
        PRINT "Great!"
    CASE "N", "NO"
        PRINT "Maybe later."
    CASE ELSE
        PRINT "Please answer yes or no."
END SELECT`,
          out: "Great!",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `n = 7
SELECT CASE n
    CASE 1 TO 5: PRINT "low"
    CASE 6 TO 10: PRINT "mid"
    CASE ELSE: PRINT "high"
END SELECT`, options: ["mid", "low", "high", "mid\nhigh"], answer: "mid", why: "7 falls in the range 6 TO 10." },
        { kind: "output", q: "What does this print?", code: `n = 50
SELECT CASE n
    CASE IS > 10: PRINT "over ten"
    CASE IS > 40: PRINT "over forty"
END SELECT`, options: ["over ten", "over forty", "over ten\nover forty", "Nothing"], answer: "over ten", why: "Both cases match, but only the first matching case runs." },
        { q: "How do you write a case for 3 or 5 or 7?", options: ["CASE 3, 5, 7", "CASE 3 OR 5 OR 7", "CASE 3 TO 7", "CASE IS 3, 5, 7"], answer: "CASE 3, 5, 7", why: "A comma-separated list matches any of its values. 3 TO 7 would also match 4 and 6." },
        { q: "What runs if no case matches and there is no CASE ELSE?", options: ["Nothing", "The first case", "The last case", "An error"], answer: "Nothing", why: "The program just carries on after END SELECT." },
      ],
    },
    {
      id: "arrays",
      title: "Arrays and DATA",
      summary: "Numbered lists of values, filling them from DATA, and tables.",
      sections: [
        {
          p: "An <b>array</b> is a row of variables sharing one name, picked by a number in brackets. <code>DIM nuts(1 TO 5)</code> makes five of them, numbered 1 to 5. A loop is the natural way to visit every one.",
          code: `DIM nuts(1 TO 5)
FOR i = 1 TO 5
    nuts(i) = i * 10
NEXT i
PRINT nuts(1); nuts(5)
total = 0
FOR i = 1 TO 5
    total = total + nuts(i)
NEXT i
PRINT "Total:"; total`,
          out: " 10  50\nTotal: 150",
        },
        {
          h: "Counting from 0",
          p: "<code>DIM a(10)</code> without <code>TO</code> makes elements 0 to 10: eleven of them. Using a number outside the range stops the program with “Subscript out of range”.",
          code: `DIM a(3)
a(0) = 5
a(3) = 8
PRINT a(0) + a(3)`,
          out: " 13",
        },
        {
          h: "DATA and READ",
          p: "<code>DATA</code> lines hold values inside the program. <code>READ</code> takes the next one each time it runs, which is a tidy way to fill an array. <code>RESTORE</code> starts again from the first value.",
          code: `DIM names$(1 TO 3), ages(1 TO 3)
FOR i = 1 TO 3
    READ names$(i), ages(i)
NEXT i
FOR i = 1 TO 3
    PRINT names$(i); " is"; ages(i)
NEXT i
DATA "Hazel", 3, "Bramble", 5, "Acorn", 1`,
          out: "Hazel is 3\nBramble is 5\nAcorn is 1",
        },
        {
          h: "Finding the biggest",
          p: "To find the largest value, keep the best so far and compare each element with it.",
          code: `DIM s(1 TO 6)
FOR i = 1 TO 6: READ s(i): NEXT i
best = s(1)
FOR i = 2 TO 6
    IF s(i) > best THEN best = s(i)
NEXT i
PRINT "Best score:"; best
DATA 12, 40, 7, 33, 41, 9`,
          out: "Best score: 41",
        },
        {
          h: "Tables",
          p: "An array can have two numbers: rows and columns. <code>SWAP</code> exchanges two variables, handy for sorting.",
          code: `DIM grid(1 TO 2, 1 TO 3)
FOR r = 1 TO 2
    FOR c = 1 TO 3
        grid(r, c) = r * 10 + c
    NEXT c
NEXT r
PRINT grid(2, 3)
x = 1: y = 2
SWAP x, y
PRINT x; y`,
          out: " 23\n 2  1",
        },
      ],
      practice: [
        { q: "How many elements does DIM a(1 TO 4) make?", options: ["4", "5", "3", "1"], answer: "4", why: "Elements 1, 2, 3 and 4." },
        { q: "How many elements does DIM a(4) make?", options: ["5", "4", "3", "1"], answer: "5", why: "Without TO the numbering starts at 0, so it is 0 to 4." },
        { kind: "output", q: "What does this print?", code: `DIM v(1 TO 3)
FOR i = 1 TO 3
    v(i) = i * i
NEXT i
PRINT v(3) - v(2)`, options: [" 5", " 1", " 9", " 3"], answer: " 5", why: "v(3) is 9 and v(2) is 4." },
        { kind: "output", q: "What does this print?", code: `READ a, b
READ c
PRINT a + b + c
DATA 1, 2, 3, 4`, options: [" 6", " 10", " 3", " 7"], answer: " 6", why: "READ takes values in order: a = 1, b = 2, c = 3. The 4 is never read." },
        { kind: "output", q: "What does this print?", code: `READ x
RESTORE
READ y
PRINT x; y
DATA 7, 8`, options: [" 7  7", " 7  8", " 8  7", " 8  8"], answer: " 7  7", why: "RESTORE goes back to the first DATA value, so y reads 7 again." },
        { q: "What does SWAP a, b do?", options: ["Exchanges the values of a and b", "Copies a into b", "Sorts an array", "Makes a and b the same variable"], answer: "Exchanges the values of a and b", why: "After SWAP, a holds what b held and b holds what a held." },
      ],
    },
    {
      id: "subs",
      title: "SUBs and FUNCTIONs",
      summary: "Naming pieces of a program so you can reuse them.",
      sections: [
        {
          p: "A <code>SUB</code> does a job; a <code>FUNCTION</code> returns a value by assigning to its own name. The editor stores each one on its own page (press F2 to list them) and adds a <code>DECLARE</code> line at the top for you.",
          code: `DECLARE SUB Banner (t$)
DECLARE FUNCTION Square% (n%)

Banner "Squares"
PRINT Square%(9)

SUB Banner (t$)
    PRINT "== "; t$; " =="
END SUB

FUNCTION Square% (n%)
    Square% = n% * n%
END FUNCTION`,
          out: "== Squares ==\n 81",
        },
        {
          h: "By reference",
          p: "Arguments are passed <b>by reference</b>: if a SUB changes its parameter, the caller's variable changes too. Wrap an argument in brackets to pass a copy instead.",
          code: `DECLARE SUB AddOne (x%)
n% = 1
AddOne n%
PRINT n%
AddOne (n%)
PRINT n%

SUB AddOne (x%)
    x% = x% + 1
END SUB`,
          out: " 2\n 2",
        },
        {
          h: "Local and SHARED",
          p: "Variables inside a SUB or FUNCTION are its own: a <code>count</code> inside is a different variable from a <code>count</code> outside. <code>DIM SHARED</code> in the main program makes a variable that every SUB can see.",
          code: `DECLARE SUB Bump ()
DIM SHARED score
score = 10
count = 1
Bump
PRINT score; count

SUB Bump
    score = score + 5
    count = 99
END SUB`,
          out: " 15  1",
        },
        {
          h: "CALL",
          p: "<code>CALL Name(arguments)</code> is another way to run a SUB. With <code>CALL</code> the arguments go in brackets; without it they do not.",
          code: `DECLARE SUB Stars (n%)
CALL Stars(3)
Stars 5

SUB Stars (n%)
    PRINT STRING$(n%, "*")
END SUB`,
          out: "***\n*****",
        },
        {
          h: "Recursion",
          p: "A FUNCTION may call itself, as long as some case stops it. The factorial of n is n × (n − 1) × … × 1.",
          code: `DECLARE FUNCTION Fact& (n%)
PRINT Fact&(5)
PRINT Fact&(10)

FUNCTION Fact& (n%)
    IF n% <= 1 THEN
        Fact& = 1
    ELSE
        Fact& = n% * Fact&(n% - 1)
    END IF
END FUNCTION`,
          out: " 120\n 3628800",
        },
      ],
      practice: [
        { q: "How does a FUNCTION return its value?", options: ["By assigning to its own name", "With a RETURN value line", "With PRINT", "With EXIT SUB"], answer: "By assigning to its own name", why: "Inside FUNCTION Square%, writing Square% = … sets the result." },
        { q: "A SUB sets its parameter to 0. The caller passed n%. What happens to n%?", options: ["It becomes 0", "It is unchanged", "An error", "It becomes empty"], answer: "It becomes 0", why: "Arguments are passed by reference unless you wrap them in brackets." },
        { q: "Which key lists the SUBs and FUNCTIONs in the QuickBASIC editor?", options: ["F2", "F5", "F1", "F10"], answer: "F2", why: "F2 opens the SUBs list; F5 runs the program; F1 is help." },
        { kind: "output", q: "What does this print?", code: `DECLARE FUNCTION Twice (x)
PRINT Twice(Twice(3))

FUNCTION Twice (x)
    Twice = x * 2
END FUNCTION`, options: [" 12", " 6", " 9", " 3"], answer: " 12", why: "The inner call gives 6 and the outer call doubles that." },
        { kind: "output", q: "What does this print?", code: `DECLARE SUB Zap (v)
a = 5
Zap a
PRINT a

SUB Zap (v)
    v = 0
END SUB`, options: [" 0", " 5", " 50", "Nothing"], answer: " 0", why: "a is passed by reference, so setting v changes a." },
        { kind: "output", q: "What does this print?", code: `DECLARE SUB Change ()
x = 1
Change
PRINT x

SUB Change
    x = 2
END SUB`, options: [" 1", " 2", " 0", " 3"], answer: " 1", why: "The x inside the SUB is its own local variable; without DIM SHARED the main x is untouched." },
      ],
    },
    {
      id: "screen",
      title: "Input, colour and chance",
      summary: "INPUT, INKEY$, LOCATE, COLOR, RND and SLEEP for interactive programs.",
      sections: [
        {
          p: "These statements make programs interactive. Their output depends on the person at the keyboard or on chance, so try them in QBasic, DOSBox or QB64 rather than reading a fixed answer. <code>INPUT</code> shows a prompt and waits for the user to type and press Enter. The value lands in the variable you name.",
          code: `INPUT "What is your name"; n$
INPUT "How many acorns"; a%
PRINT "Hello, "; n$; ". Double that is"; a% * 2`,
        },
        {
          h: "Random numbers",
          p: "<code>RND</code> gives a random number from 0 up to (but not including) 1. Multiply and take <code>INT</code> to get a whole number in a range. <code>RANDOMIZE TIMER</code> seeds the generator from the clock, so each run is different.",
          code: `RANDOMIZE TIMER
die = INT(RND * 6) + 1      ' 1 to 6
PRINT "You rolled"; die`,
        },
        {
          h: "Placing text and colour",
          p: "<code>LOCATE row, column</code> moves the cursor (the text screen is 25 rows by 80 columns). <code>COLOR foreground, background</code> picks from 16 colours (0 black, 1 blue, 2 green, 4 red, 14 yellow, 15 white).",
          code: `CLS
COLOR 14, 1
LOCATE 12, 35
PRINT "Centre stage"
COLOR 7, 0`,
        },
        {
          h: "Waiting for a key",
          p: "<code>INKEY$</code> returns the key being pressed right now, or an empty string, without waiting. A loop around it waits for any key; <code>SLEEP</code> pauses for a number of seconds.",
          code: `PRINT "Press any key..."
DO
LOOP WHILE INKEY$ = ""
PRINT "Thanks!"
SLEEP 1`,
        },
        {
          h: "A guessing game",
          p: "Put together, these make a complete game. The loop keeps asking until the guess is right, and counts the tries.",
          code: `RANDOMIZE TIMER
secret = INT(RND * 100) + 1
tries = 0
DO
    INPUT "Guess (1-100)"; g
    tries = tries + 1
    IF g < secret THEN PRINT "Higher!"
    IF g > secret THEN PRINT "Lower!"
LOOP UNTIL g = secret
PRINT "Got it in"; tries; "tries."`,
        },
      ],
      practice: [
        { q: "Which expression gives a whole number from 1 to 6?", options: ["INT(RND * 6) + 1", "RND(6)", "INT(RND * 6)", "RND * 6 + 1"], answer: "INT(RND * 6) + 1", why: "RND * 6 is 0 up to 5.999…; INT makes it 0 to 5, and + 1 shifts it to 1 to 6." },
        { q: "Why call RANDOMIZE TIMER first?", options: ["So each run gives different random numbers", "To make RND faster", "To clear the screen", "To start the clock"], answer: "So each run gives different random numbers", why: "Without a seed, RND gives the same sequence every run." },
        { q: "What does INKEY$ give when no key is pressed?", options: ["An empty string", "It waits for a key", "0", "The last key pressed"], answer: "An empty string", why: "INKEY$ never waits, which makes it useful in game loops." },
        { q: "LOCATE 1, 1 moves the cursor where?", options: ["Top-left corner", "Bottom-right corner", "Row 1 of a new screen", "Centre"], answer: "Top-left corner", why: "Rows and columns both count from 1 at the top left." },
        { q: "In the guessing game, why LOOP UNTIL g = secret at the bottom?", options: ["The player must guess at least once", "DO loops need it", "It is faster", "INPUT only works in that kind of loop"], answer: "The player must guess at least once", why: "A test at the bottom always runs the body once before checking." },
      ],
    },
    {
      id: "fizzbuzz",
      title: "Putting it together: FizzBuzz",
      summary: "Loops, MOD, decisions and a FUNCTION in one program.",
      sections: [
        {
          p: "FizzBuzz counts from 1, but says <b>Fizz</b> for multiples of 3, <b>Buzz</b> for multiples of 5 and <b>FizzBuzz</b> for both. <code>n MOD 3 = 0</code> is true exactly when n divides by 3. Building the word up piece by piece avoids testing 15 separately.",
          code: `FOR n = 1 TO 15
    w$ = ""
    IF n MOD 3 = 0 THEN w$ = w$ + "Fizz"
    IF n MOD 5 = 0 THEN w$ = w$ + "Buzz"
    IF w$ = "" THEN PRINT n ELSE PRINT w$
NEXT n`,
          out: " 1\n 2\nFizz\n 4\nBuzz\nFizz\n 7\n 8\nFizz\nBuzz\n 11\nFizz\n 13\n 14\nFizzBuzz",
        },
        {
          h: "Tidier numbers",
          p: "The numbers above keep PRINT's leading space. <code>LTRIM$(STR$(n))</code> turns a number into text with no spaces, so everything lines up. Moving the rule into a FUNCTION gives it a name.",
          code: `DECLARE FUNCTION Say$ (n%)
FOR i% = 1 TO 15
    PRINT Say$(i%); " ";
NEXT i%
PRINT

FUNCTION Say$ (n%)
    w$ = ""
    IF n% MOD 3 = 0 THEN w$ = "Fizz"
    IF n% MOD 5 = 0 THEN w$ = w$ + "Buzz"
    IF w$ = "" THEN w$ = LTRIM$(STR$(n%))
    Say$ = w$
END FUNCTION`,
          out: "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz",
        },
        {
          h: "Where to go next",
          p: "You know enough QuickBASIC to write real programs. Good next steps: change FizzBuzz to count to 100; turn the guessing game into one where the computer guesses your number; draw with <code>SCREEN 12</code>, <code>LINE</code> and <code>CIRCLE</code>; or look through the GORILLA.BAS and NIBBLES.BAS games that came with QBasic, which use everything in this course.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `PRINT 12 MOD 3 = 0`, options: ["-1", " 0", " 4", " 1"], answer: "-1", why: "12 MOD 3 is 0, so the comparison is true, which prints as −1." },
        { kind: "output", q: "What does this print?", code: `PRINT "["; LTRIM$(STR$(7)); "]"`, options: ["[7]", "[ 7]", "[ 7 ]", "[7 ]"], answer: "[7]", why: "STR$ gives \" 7\" and LTRIM$ removes the space in front." },
        { kind: "output", q: "What does this print?", code: `FOR n = 9 TO 10
    w$ = ""
    IF n MOD 3 = 0 THEN w$ = w$ + "Fizz"
    IF n MOD 5 = 0 THEN w$ = w$ + "Buzz"
    PRINT w$
NEXT n`, options: ["Fizz\nBuzz", "FizzBuzz", "Buzz\nFizz", "Fizz"], answer: "Fizz\nBuzz", why: "9 divides by 3 only, and 10 divides by 5 only." },
        { q: "Why build w$ up instead of testing 15 first?", options: ["A multiple of both gets both words added", "MOD 15 is not allowed", "It is the only way in BASIC", "Strings cannot be compared"], answer: "A multiple of both gets both words added", why: "15 passes both tests, so Fizz and then Buzz are added and FizzBuzz comes out." },
      ],
    },
  ],
};
