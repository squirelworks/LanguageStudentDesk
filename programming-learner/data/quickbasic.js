// QuickBASIC course for the Programming Learner. Written for this project.
// Schema: see data/python.js.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.quickbasic = {
  id: "quickbasic",
  name: "QuickBASIC",
  title: "QuickBASIC on DOS",
  intro:
    "QuickBASIC (and its free little sibling QBasic, which came with MS-DOS 5 and Windows 95) gave BASIC a full-screen editor, structured loops and named subroutines, so line numbers became optional. It is a good way to see how programs worked before windows and mice. To try it today, run QBasic or QuickBASIC 4.5 inside DOSBox, or use QB64, a modern compiler that understands the same code.",
  comment: "'",
  caseInsensitive: true,
  keywords: [
    "PRINT", "INPUT", "LET", "DIM", "AS", "IF", "THEN", "ELSE", "ELSEIF", "END", "FOR", "TO", "STEP", "NEXT", "DO", "LOOP",
    "WHILE", "WEND", "UNTIL", "SUB", "FUNCTION", "CALL", "GOTO", "GOSUB", "RETURN", "SELECT", "CASE", "REM", "AND", "OR",
    "NOT", "MOD", "INTEGER", "STRING", "SINGLE", "DOUBLE", "LONG", "CLS", "SCREEN", "COLOR", "LOCATE", "EXIT", "SHARED", "CONST",
  ],
  builtins: ["LEN", "LEFT$", "RIGHT$", "MID$", "UCASE$", "LCASE$", "STR$", "VAL", "INT", "RND", "RANDOMIZE", "TIMER", "CHR$", "ASC", "INKEY$", "SLEEP"],
  lessons: [
    {
      id: "basics",
      title: "PRINT, variables and INPUT",
      summary: "Show text, store values, ask the user.",
      sections: [
        {
          p: "<code>PRINT</code> writes a line to the screen and <code>CLS</code> clears it. A comment starts with an apostrophe (or the older <code>REM</code>).",
          code: `CLS
' My first program
PRINT "Hello from QuickBASIC"
PRINT 6 * 7`,
          out: "Hello from QuickBASIC\n 42",
        },
        {
          h: "Spaces around numbers",
          p: "QuickBASIC prints a number with a space in front (where a minus sign would go) and one after. A <b>semicolon</b> between items keeps the cursor on the same line; a <b>comma</b> jumps to the next 14-character column.",
          code: `PRINT "Total:"; 5
PRINT "A", "B"`,
          out: "Total: 5\nA             B",
        },
        {
          h: "Variable types by suffix",
          p: "The last character of a name sets its type: <code>$</code> for text, <code>%</code> for a whole number, <code>!</code> (or nothing) for a decimal number. You can also declare with <code>DIM name AS type</code>.",
          code: `name$ = "Hazel"
nuts% = 12
DIM weight AS SINGLE
weight = 0.5
PRINT name$; " has"; nuts%; "nuts"`,
          out: "Hazel has 12 nuts",
        },
        {
          h: "INPUT",
          p: "<code>INPUT</code> shows a prompt and waits for the user to type. The value lands in the variable you name.",
          code: `INPUT "How many acorns"; a%
PRINT "Double that is"; a% * 2`,
        },
      ],
      practice: [
        { q: "Which variable holds text?", options: ["n$", "n%", "n!", "n#"], answer: "n$", why: "The $ suffix makes a string variable." },
        { q: "What does PRINT \"x\"; \"y\" show?", options: ["xy", "x y", "x      y", "x\ny"], answer: "xy", why: "A semicolon joins items with nothing between them. Only numbers get their own padding spaces." },
        { q: "Which line is a comment?", options: ["' count the nuts", "// count the nuts", "# count the nuts", "-- count the nuts"], answer: "' count the nuts", why: "An apostrophe (or REM) starts a comment in QuickBASIC." },
        { q: "What does PRINT 3 + 4 show?", options: [" 7", "3 + 4", "7.0", "34"], answer: " 7", why: "The sum is printed with the leading space QuickBASIC leaves for a sign." },
      ],
    },
    {
      id: "flow",
      title: "Decisions and loops",
      summary: "IF…THEN, FOR…NEXT, DO…LOOP and SELECT CASE.",
      sections: [
        {
          p: "Block <code>IF</code> runs lines until <code>END IF</code>. <code>ELSEIF</code> and <code>ELSE</code> add more branches. Equality is a single <code>=</code>; not-equal is <code>&lt;&gt;</code>.",
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
          h: "FOR…NEXT",
          p: "Counts from a start to an end value, inclusive. <code>STEP</code> sets how much to add each time; a negative step counts down.",
          code: `FOR i = 1 TO 10 STEP 3
    PRINT i;
NEXT i`,
          out: " 1  4  7  10",
        },
        {
          h: "DO…LOOP",
          p: "Repeats while (or until) a condition holds. The test can go at the top or the bottom.",
          code: `stash = 1
DO WHILE stash < 20
    stash = stash * 3
LOOP
PRINT stash`,
          out: " 27",
        },
        {
          h: "SELECT CASE",
          p: "Picks one branch by value, which reads better than a long chain of IFs.",
          code: `key$ = "S"
SELECT CASE key$
    CASE "N": PRINT "North"
    CASE "S": PRINT "South"
    CASE ELSE: PRINT "Stay"
END SELECT`,
          out: "South",
        },
      ],
      practice: [
        { q: "How many numbers does FOR i = 1 TO 10 STEP 3 … NEXT print?", options: ["4", "3", "10", "5"], answer: "4", why: "1, 4, 7 and 10. The end value counts when it is reached exactly." },
        { q: "How do you write “not equal” in QuickBASIC?", options: ["<>", "!=", "=/=", "~="], answer: "<>", why: "BASIC uses <> for not equal." },
        { q: "What closes a block IF?", options: ["END IF", "ENDIF;", "FI", "NEXT"], answer: "END IF", why: "Block IF statements end with END IF, written as two words." },
        { q: "FOR i = 5 TO 1 STEP -2 visits which values?", options: ["5, 3, 1", "5, 4, 3, 2, 1", "1, 3, 5", "Nothing"], answer: "5, 3, 1", why: "A negative STEP counts down, and 1 is reached exactly." },
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
      ],
      practice: [
        { q: "How does a FUNCTION return its value?", options: ["By assigning to its own name", "With a RETURN value line", "With PRINT", "With EXIT SUB"], answer: "By assigning to its own name", why: "Inside FUNCTION Square%, writing Square% = … sets the result." },
        { q: "A SUB sets its parameter to 0. The caller passed n%. What happens to n%?", options: ["It becomes 0", "It is unchanged", "An error", "It becomes empty"], answer: "It becomes 0", why: "Arguments are passed by reference unless you wrap them in brackets." },
        { q: "Which key lists the SUBs and FUNCTIONs in the QuickBASIC editor?", options: ["F2", "F5", "F1", "F10"], answer: "F2", why: "F2 opens the SUBs list; F5 runs the program; F1 is help." },
      ],
    },
  ],
};
