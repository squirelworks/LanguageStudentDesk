// Classic line-numbered BASIC course for the Programming Learner. Written for
// this project. tools/run_basic.py runs the examples and checks the output.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.basic = {
  id: "basic",
  name: "Classic BASIC",
  title: "Classic BASIC: numbered lines and GOTO",
  intro:
    "BASIC (Beginner's All-purpose Symbolic Instruction Code) was written at Dartmouth College in 1964 by John Kemeny and Thomas Kurtz so that students who weren't scientists could use a computer. When home computers arrived in the late 1970s and early 1980s, almost every one switched on straight into a BASIC prompt, and a whole generation typed in their first programs from magazines and manuals. Every line of a program starts with a <b>line number</b>; the computer keeps the lines sorted by number and runs them in that order, and <code>GOTO</code> jumps to another line. People numbered in tens so they could squeeze new lines in between later. These lessons use the Microsoft BASIC style most of those machines shared. The later QuickBASIC course shows what BASIC became once it dropped line numbers. To try the examples, use any classic BASIC interpreter or an emulator of a home computer from that time, type the lines in, and type <code>RUN</code>.",
  comment: "REM",
  caseInsensitive: true,
  keywords: [
    "PRINT", "LET", "IF", "THEN", "GOTO", "GOSUB", "RETURN", "ON", "FOR", "TO", "STEP", "NEXT", "END", "STOP", "REM", "DIM",
    "READ", "DATA", "RESTORE", "DEF", "AND", "OR", "NOT", "RUN", "LIST",
  ],
  builtins: ["LEN", "LEFT$", "RIGHT$", "MID$", "STR$", "VAL", "CHR$", "ASC", "INT", "ABS", "SQR", "SGN", "TAB"],
  lessons: [
    {
      id: "lines",
      title: "Lines and PRINT",
      summary: "Line numbers, PRINT, variables and REM.",
      sections: [
        {
          p: "Each line starts with a number. <code>PRINT</code> shows text in double quotes, or the value of a number or a sum. <code>REM</code> (remark) starts a comment that the computer skips. <code>END</code> stops the program. When BASIC prints a number, it leaves a space in front for the sign (a minus sign goes there for negative numbers) and a space after.",
          code: `10 REM MY FIRST PROGRAM
20 PRINT "HELLO, SQUIRREL!"
30 PRINT 6 * 7
40 PRINT -5
50 END`,
          out: "HELLO, SQUIRREL!\n 42\n-5",
        },
        {
          h: "Variables",
          p: "<code>LET</code> stores a value in a variable; most BASICs let you leave the word <code>LET</code> out. A name ending in <code>$</code> (said \"string\") holds text; other names hold numbers. In <code>PRINT</code>, a semicolon puts the next item straight after the last one, and a semicolon at the end of the line stops the line from ending. A comma moves to the next print zone, a column every 14 characters, which made tables easy.",
          code: `10 LET N$ = "HAZEL"
20 NUTS = 7
30 PRINT N$; " HAS"; NUTS; "NUTS"
40 PRINT "TOTAL: ";
50 PRINT NUTS * 2
60 PRINT "TREE", "NUTS"
70 PRINT "OAK", 12`,
          out: "HAZEL HAS 7 NUTS\nTOTAL:  14\nTREE          NUTS\nOAK            12",
        },
        {
          h: "Lines run in number order",
          p: "The computer sorts the program by line number, whatever order the lines were typed in. Typing a line with a number that already exists replaces the old line. This is how you edited programs: retype the line, or type a new number in between, such as 15 between 10 and 20.",
          code: `30 PRINT "THIRD"
10 PRINT "FIRST"
20 PRINT "SECOND, WRONG"
20 PRINT "SECOND"
15 PRINT "SQUEEZED IN"`,
          out: "FIRST\nSQUEEZED IN\nSECOND\nTHIRD",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `10 A = 3
20 B = 4
30 PRINT A; "+"; B; "="; A + B`, options: [" 3 + 4 = 7", "3+4=7", "A+B=7", " 3 + 4 =7"], answer: " 3 + 4 = 7", why: "Each number gets a space in front for its sign and one after, and the semicolons add nothing extra between items." },
        { kind: "output", q: "What does this print?", code: `20 PRINT "B"
10 PRINT "A";
30 PRINT "C"`, options: ["AB\nC", "B\nAC", "A\nB\nC", "ABC"], answer: "AB\nC", why: "Lines run in number order, so A prints first. Its trailing semicolon keeps B on the same line." },
        { q: "Why did people number lines 10, 20, 30 instead of 1, 2, 3?", options: ["To leave room to add lines in between later", "BASIC only accepted multiples of ten", "It made programs run faster", "Line 1 was kept for the system"], answer: "To leave room to add lines in between later", why: "With gaps of ten, a forgotten step could be typed in as line 15 without renumbering everything." },
      ],
    },
    {
      id: "jumps",
      title: "IF, THEN and GOTO",
      summary: "Decisions, jumps and loops made out of GOTO.",
      sections: [
        {
          p: "<code>GOTO</code> jumps to another line number and carries on from there. <code>IF</code> tests a condition; after <code>THEN</code> comes either a line number to jump to, or statements to run. If the condition is false, BASIC skips the rest of that line. Comparisons are <code>=</code>, <code>&lt;&gt;</code> (not equal), <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code> and <code>&gt;=</code>.",
          code: `10 NUTS = 12
20 IF NUTS > 20 THEN 60
30 IF NUTS > 10 THEN PRINT "GOOD DAY": GOTO 70
40 PRINT "KEEP LOOKING"
50 GOTO 70
60 PRINT "FEAST"
70 PRINT "DONE"`,
          out: "GOOD DAY\nDONE",
        },
        {
          h: "Loops out of GOTO",
          p: "Jumping back to an earlier line makes a loop. A variable counts the passes and an <code>IF</code> decides when to stop jumping back. A <code>GOTO</code> with no way out loops forever; on a real machine you pressed the BREAK or STOP key.",
          code: `10 H = 1
20 PRINT H;
30 H = H * 3
40 IF H < 100 THEN 20
50 PRINT
60 PRINT "TOP OF THE TREE AT"; H`,
          out: " 1  3  9  27  81\nTOP OF THE TREE AT 243",
        },
        {
          h: "Spaghetti",
          p: "Because any line can jump to any other, a large program could become a tangle of jumps that was hard to follow, which programmers called <b>spaghetti code</b>. Edsger Dijkstra's 1968 letter \"Go To Statement Considered Harmful\" argued for loops and blocks instead, and later BASICs such as QuickBASIC added them. This short program works, but try following it by hand.",
          code: `10 N = 1
20 GOTO 60
30 PRINT "ODD"; N
40 N = N + 1
50 IF N > 4 THEN 100
60 IF N / 2 = INT(N / 2) THEN 80
70 GOTO 30
80 PRINT "EVEN"; N
90 GOTO 40
100 END`,
          out: "ODD 1\nEVEN 2\nODD 3\nEVEN 4",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `10 X = 5
20 IF X = 5 THEN PRINT "FIVE": PRINT "!"
30 IF X <> 5 THEN PRINT "NOT": PRINT "?"
40 PRINT "END"`, options: ["FIVE\n!\nEND", "FIVE\n!\n?\nEND", "FIVE\nEND", "FIVE\n!\nNOT\n?\nEND"], answer: "FIVE\n!\nEND", why: "When IF is false, the whole rest of its line is skipped, including statements after the colon." },
        { kind: "output", q: "What does this print?", code: `10 C = 0
20 C = C + 2
30 IF C < 7 THEN 20
40 PRINT C`, options: [" 8", " 7", " 6", " 2"], answer: " 8", why: "C goes 2, 4, 6, 8. At 6 the test is still true, so it adds 2 once more and 8 fails the test." },
      ],
    },
    {
      id: "for",
      title: "FOR and NEXT",
      summary: "Counting loops, STEP and nested loops.",
      sections: [
        {
          p: "<code>FOR I = 1 TO 5</code> sets I to 1, runs the lines down to <code>NEXT I</code>, then adds 1 and goes round again until I passes 5. <code>STEP</code> sets a different amount to add, and a negative step counts down. It replaces the counter-and-GOTO pattern from the last lesson with two lines.",
          code: `10 FOR I = 1 TO 5
20 PRINT I;
30 NEXT I
40 PRINT
50 FOR T = 10 TO 0 STEP -5
60 PRINT "T MINUS"; T
70 NEXT T`,
          out: " 1  2  3  4  5\nT MINUS 10\nT MINUS 5\nT MINUS 0",
        },
        {
          h: "Nested loops",
          p: "A loop can sit inside another; the inner one runs all the way through for each pass of the outer one. <code>TAB(n)</code> in a <code>PRINT</code> moves to column n, which lines the numbers up into a table.",
          code: `10 FOR R = 1 TO 3
20 FOR C = 1 TO 4
30 PRINT TAB(C * 4); R * C;
40 NEXT C
50 PRINT
60 NEXT R`,
          out: "    1   2   3   4\n    2   4   6   8\n    3   6   9   12",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `10 S = 0
20 FOR I = 2 TO 8 STEP 3
30 S = S + I
40 NEXT I
50 PRINT S`, options: [" 15", " 20", " 18", " 10"], answer: " 15", why: "I takes the values 2, 5 and 8, which add to 15. The next value, 11, is past 8." },
        { kind: "output", q: "What does this print?", code: `10 FOR A = 1 TO 2
20 FOR B = 1 TO 3
30 N = N + 1
40 NEXT B
50 NEXT A
60 PRINT N`, options: [" 6", " 5", " 3", " 2"], answer: " 6", why: "The inner loop runs three times for each of the two outer passes. A variable that was never set starts at 0." },
      ],
    },
    {
      id: "gosub",
      title: "GOSUB and DEF FN",
      summary: "Subroutines, ON ... GOTO menus and one-line functions.",
      sections: [
        {
          p: "<code>GOSUB</code> jumps to a line like <code>GOTO</code>, but remembers where it came from. <code>RETURN</code> goes back to the statement after the <code>GOSUB</code>. This let a program reuse a piece of code, called a <b>subroutine</b>, from several places. Subroutines usually lived at high line numbers, with an <code>END</code> before them so the main program didn't run into them by accident. Variables are shared by the whole program, so values are passed in and out through ordinary variables.",
          code: `10 N$ = "HAZEL": GOSUB 100
20 N$ = "ACORN": GOSUB 100
30 PRINT "CALLS:"; C
40 END
100 REM SUBROUTINE: GREET N$
110 PRINT "HELLO, "; N$
120 C = C + 1
130 RETURN`,
          out: "HELLO, HAZEL\nHELLO, ACORN\nCALLS: 2",
        },
        {
          h: "ON ... GOTO",
          p: "<code>ON X GOTO 100, 200, 300</code> jumps to the first line number when X is 1, the second when X is 2, and so on; if X is out of range it does nothing. It was the usual way to act on a menu choice. <code>ON ... GOSUB</code> works the same way with subroutines.",
          code: `10 FOR M = 1 TO 4
20 ON M GOSUB 100, 200, 300
30 NEXT M
40 END
100 PRINT M; "BURY NUTS": RETURN
200 PRINT M; "FIND NUTS": RETURN
300 PRINT M; "EAT NUTS": RETURN`,
          out: " 1 BURY NUTS\n 2 FIND NUTS\n 3 EAT NUTS",
        },
        {
          h: "DEF FN",
          p: "<code>DEF FN</code> defines a one-line function whose name starts with FN. It takes a value in brackets and gives back the result of its formula. It is much more limited than a function in a modern language, but it saved retyping a formula.",
          code: `10 DEF FNA(R) = 3.14159 * R * R
20 DEF FNC(F) = INT((F - 32) * 5 / 9 + 0.5)
30 PRINT INT(FNA(10))
40 PRINT FNC(212); FNC(50)`,
          out: " 314\n 100  10",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `10 X = 1
20 GOSUB 100
30 GOSUB 100
40 PRINT X
50 END
100 X = X * 5
110 RETURN`, options: [" 25", " 5", " 10", " 1"], answer: " 25", why: "The subroutine runs twice, multiplying X by 5 each time: 1, 5, 25." },
        { kind: "output", q: "What does this print?", code: `10 ON 3 GOTO 40, 50, 60
20 PRINT "FELL THROUGH"
30 END
40 PRINT "A": END
50 PRINT "B": END
60 PRINT "C": END`, options: ["C", "A", "FELL THROUGH", "B"], answer: "C", why: "The value is 3, so it jumps to the third line number in the list, 60." },
      ],
    },
    {
      id: "data",
      title: "Arrays, DATA and strings",
      summary: "DIM, READ and DATA, RESTORE, and the string functions.",
      sections: [
        {
          p: "<code>DIM A(5)</code> makes an array of numbered boxes, A(0) to A(5). <code>DATA</code> lines hold a list of values inside the program, and each <code>READ</code> takes the next ones in order. Magazine listings were often mostly <code>DATA</code> lines. <code>RESTORE</code> goes back to the first value.",
          code: `10 DIM N(4)
20 FOR I = 1 TO 4
30 READ T$, N(I)
40 PRINT T$; N(I)
50 T = T + N(I)
60 NEXT I
70 PRINT "TOTAL"; T
80 RESTORE
90 READ T$
100 PRINT "FIRST AGAIN: "; T$
200 DATA OAK, 12, HAZEL, 5, BEECH, 20, ASH, 7`,
          out: "OAK 12\nHAZEL 5\nBEECH 20\nASH 7\nTOTAL 44\nFIRST AGAIN: OAK",
        },
        {
          h: "String functions",
          p: "<code>LEN</code> counts the characters in a string. <code>LEFT$</code>, <code>RIGHT$</code> and <code>MID$</code> cut pieces out of it (MID$ counts from 1). <code>STR$</code> turns a number into a string, with the sign space in front, and <code>VAL</code> turns text back into a number. <code>ASC</code> gives a character's code and <code>CHR$</code> turns a code back into a character. <code>+</code> joins strings.",
          code: `10 A$ = "SQUIRREL"
20 PRINT LEN(A$)
30 PRINT LEFT$(A$, 3); "-"; RIGHT$(A$, 3); "-"; MID$(A$, 4, 2)
40 PRINT ASC("A"); CHR$(66)
50 B$ = "NUTS:" + STR$(7)
60 PRINT B$
70 PRINT VAL("12") + 1`,
          out: " 8\nSQU-REL-IR\n 65 B\nNUTS: 7\n 13",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `10 FOR I = 1 TO 3
20 READ X
30 S = S + X
40 NEXT I
50 PRINT S
60 DATA 4, 5, 6, 7`, options: [" 15", " 22", " 9", " 18"], answer: " 15", why: "The loop reads three values, 4, 5 and 6. The 7 is never read." },
        { kind: "output", q: "What does this print?", code: `10 W$ = "ACORN"
20 FOR I = LEN(W$) TO 1 STEP -1
30 PRINT MID$(W$, I, 1);
40 NEXT I`, options: ["NROCA", "ACORN", "N", "A C O R N"], answer: "NROCA", why: "The loop counts down from 5 to 1 and prints one character at each position, so the word comes out backwards." },
      ],
    },
  ],
};
