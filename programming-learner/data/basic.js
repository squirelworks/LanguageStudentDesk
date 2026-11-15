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
    "READ", "DATA", "RESTORE", "DEF", "AND", "OR", "NOT", "SWAP", "RUN", "LIST",
  ],
  builtins: ["LEN", "LEFT$", "RIGHT$", "MID$", "STR$", "VAL", "CHR$", "ASC", "INSTR", "STRING$", "SPACE$", "INT", "ABS", "SQR", "SGN", "TAB"],
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
    {
      id: "maths",
      title: "Number functions and logic",
      summary: "INT, ABS, SGN, SQR, and AND / OR / NOT.",
      sections: [
        {
          p: "<code>INT</code> chops toward −∞ (so <code>INT(-7.8)</code> is −8). <code>ABS</code> drops the sign, <code>SGN</code> is −1, 0 or 1 for the sign, and <code>SQR</code> is the square root. These were the everyday maths tools on a home-computer BASIC.",
          code: `10 REM NUMBER FUNCTIONS
20 X = -7.8
30 PRINT "INT "; INT(X); " ABS "; ABS(X)
40 PRINT "SGN "; SGN(X); SGN(0); SGN(3)
50 PRINT "SQR "; SQR(49)
60 END`,
          out: "INT -8  ABS  7.8\nSGN -1  0  1\nSQR  7",
        },
        {
          h: "AND, OR and NOT",
          p: "<code>AND</code>, <code>OR</code> and <code>NOT</code> combine tests on one <code>IF</code> line. A common trick for \"divides evenly\" is <code>N / D = INT(N / D)</code>. Real machines also had <code>INPUT</code> to type a number in, but the checker has no keyboard, so these lessons keep driving programs with <code>DATA</code> the way many magazine listings did.",
          code: `10 A = 12: B = 5
20 IF A > 10 AND B < 10 THEN PRINT "BOTH"
30 IF A < 5 OR B = 5 THEN PRINT "EITHER"
40 IF NOT (A = B) THEN PRINT "DIFFERENT"
50 N = 15
60 IF N / 3 = INT(N / 3) AND N / 5 = INT(N / 5) THEN PRINT "FIZZBUZZ"
70 END`,
          out: "BOTH\nEITHER\nDIFFERENT\nFIZZBUZZ",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `10 PRINT INT(9.1); INT(-1.2)
20 PRINT ABS(-4); SGN(-9)`, options: [" 9 -2\n 4 -1", " 9 -1\n 4 -1", " 9  1\n 4 -1", " 9 -2\n-4 -1"], answer: " 9 -2\n 4 -1", why: "INT floors toward −∞, so −1.2 becomes −2. ABS drops the sign; SGN of a negative is −1." },
        { kind: "output", q: "What does this print?", code: `10 N = 9
20 IF N / 3 = INT(N / 3) THEN PRINT "YES"
30 IF N / 2 = INT(N / 2) THEN PRINT "EVEN"`, options: ["YES", "EVEN", "YES\nEVEN", "(nothing)"], answer: "YES", why: "9 divides by 3 evenly, but not by 2, so only the first IF runs." },
        { q: "Why is INT(-7.8) equal to −8, not −7?", options: ["INT chops toward −∞", "ABS ran first", "SGN forces a round up", "BASIC always adds one"], answer: "INT chops toward −∞", why: "Classic BASIC INT is the floor function, not truncation toward zero." },
      ],
    },
    {
      id: "morestrings",
      title: "INSTR and report lines",
      summary: "Finding text, STRING$, SPACE$ and building a column.",
      sections: [
        {
          p: "<code>INSTR(haystack$, needle$)</code> returns the 1-based position of the first match, or 0 if it is missing. A three-argument form <code>INSTR(start, haystack$, needle$)</code> begins the search at that character. <code>STRING$(n, c)</code> repeats a character (or a character code) n times; <code>SPACE$(n)</code> is n spaces.",
          code: `10 W$ = "HAZELNUT"
20 PRINT INSTR(W$, "NUT")
30 PRINT INSTR(W$, "OAK")
40 PRINT INSTR(4, W$, "E")
50 PRINT STRING$(5, "*"); SPACE$(2); "DONE"
60 END`,
          out: " 6\n 0\n 4\n*****  DONE",
        },
        {
          h: "Building a report line",
          p: "Magazine programs often padded names with dots or spaces so columns lined up, then joined them with <code>+</code>. Splitting a comma-separated list is <code>INSTR</code> plus <code>LEFT$</code> and <code>MID$</code>. On a real machine you would type the line with <code>INPUT L$</code>; here the string is set in the program so the checker can run it.",
          code: `10 REM BUILD A REPORT LINE
20 N$ = "OAK": Q = 12
30 L$ = N$ + STRING$(8 - LEN(N$), ".") + STR$(Q)
40 PRINT L$
50 M$ = "ACORN,HAZEL,BEECH"
60 P = INSTR(M$, ",")
70 PRINT LEFT$(M$, P - 1)
80 PRINT MID$(M$, P + 1)
90 END`,
          out: "OAK..... 12\nACORN\nHAZEL,BEECH",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `10 PRINT INSTR("SQUIRREL", "IRR")
20 PRINT INSTR("SQUIRREL", "ZZ")`, options: [" 4\n 0", " 3\n 0", " 4\n-1", " 1\n 0"], answer: " 4\n 0", why: "IRR starts at character 4; a miss is 0." },
        { kind: "output", q: "What does this print?", code: `10 A$ = "PIP"
20 PRINT A$ + STRING$(5 - LEN(A$), "-") + "OK"`, options: ["PIP--OK", "PIP-OK", "PIP-----OK", "PIPOK"], answer: "PIP--OK", why: "LEN is 3, so STRING$ adds two dashes before OK." },
        { q: "What does INSTR return when the needle is missing?", options: ["0", "-1", "LEN of the haystack", "An empty string"], answer: "0", why: "A zero position means \"not found\" in classic BASIC." },
      ],
    },
    {
      id: "tables",
      title: "Two-dimensional tables",
      summary: "DIM with two indexes, grids and parallel arrays.",
      sections: [
        {
          p: "<code>DIM G(3, 3)</code> makes a grid: <code>G(R, C)</code> is the cell at row R and column C. Nested <code>FOR</code> loops fill and print it. Home-computer games and spreadsheets in BASIC were built from tables like this.",
          code: `10 DIM G(3, 3)
20 FOR R = 1 TO 3
30 FOR C = 1 TO 3
40 G(R, C) = R * C
50 NEXT C
60 NEXT R
70 FOR R = 1 TO 3
80 FOR C = 1 TO 3
90 PRINT TAB(C * 4); G(R, C);
100 NEXT C
110 PRINT
120 NEXT R
130 END`,
          out: "    1   2   3\n    2   4   6\n    3   6   9",
        },
        {
          h: "Parallel arrays as a table",
          p: "Two one-dimensional arrays with the same index — names in one, quantities in the other — act as the columns of a table. This report shows each tree's share of the total as a whole-number percentage.",
          code: `10 DIM N$(4), Q(4)
20 FOR I = 1 TO 4
30 READ N$(I), Q(I)
40 NEXT I
50 S = 0
60 FOR I = 1 TO 4
70 S = S + Q(I)
80 NEXT I
90 FOR I = 1 TO 4
100 P = INT(Q(I) * 100 / S + 0.5)
110 PRINT N$(I); Q(I); P; "%"
120 NEXT I
130 DATA OAK, 12, HAZEL, 6, BEECH, 18, ASH, 4
140 END`,
          out: "OAK 12  30 %\nHAZEL 6  15 %\nBEECH 18  45 %\nASH 4  10 %",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `10 DIM A(2, 2)
20 A(1, 1) = 4: A(1, 2) = 5
30 A(2, 1) = 6: A(2, 2) = 7
40 PRINT A(2, 1); A(1, 2)`, options: [" 6  5", " 4  7", " 5  6", " 6  7"], answer: " 6  5", why: "Row 2 column 1 is 6; row 1 column 2 is 5." },
        { kind: "output", q: "What does this print?", code: `10 DIM Q(3)
20 FOR I = 1 TO 3
30 READ Q(I): S = S + Q(I)
40 NEXT I
50 PRINT INT(Q(2) * 100 / S + 0.5)
60 DATA 10, 20, 20`, options: [" 40", " 20", " 50", " 33"], answer: " 40", why: "Total is 50; the middle value 20 is 40% after rounding." },
        { q: "What does DIM G(3, 3) create?", options: ["A grid indexed by row and column", "Three separate variables", "A string of length 3", "A subroutine with two arguments"], answer: "A grid indexed by row and column", why: "Two indexes mean two dimensions." },
      ],
    },
    {
      id: "search",
      title: "Search and extremes",
      summary: "Linear search through DATA and finding the largest.",
      sections: [
        {
          p: "A linear search walks an array until it finds the name it wants, then <code>GOTO</code> jumps out. A second pass keeps the index of the largest quantity. Magazine high-score tables and inventory look-ups were written this way.",
          code: `10 DIM N$(5), Q(5)
20 FOR I = 1 TO 5
30 READ N$(I), Q(I)
40 NEXT I
50 WANT$ = "BEECH"
60 FOR I = 1 TO 5
70 IF N$(I) = WANT$ THEN PRINT "FOUND"; Q(I); "AT"; I: GOTO 100
80 NEXT I
90 PRINT "MISSING"
100 BEST = 1
110 FOR I = 2 TO 5
120 IF Q(I) > Q(BEST) THEN BEST = I
130 NEXT I
140 PRINT "MOST "; N$(BEST); Q(BEST)
150 DATA OAK, 12, HAZEL, 5, BEECH, 20, ASH, 7, PINE, 9
160 END`,
          out: "FOUND 20 AT 3\nMOST BEECH 20",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `10 DIM A(4)
20 FOR I = 1 TO 4
30 READ A(I)
40 NEXT I
50 B = 1
60 FOR I = 2 TO 4
70 IF A(I) < A(B) THEN B = I
80 NEXT I
90 PRINT A(B)
100 DATA 8, 3, 9, 4`, options: [" 3", " 8", " 9", " 4"], answer: " 3", why: "The loop keeps the index of the smallest value, which is 3." },
        { kind: "output", q: "What does this print?", code: `10 FOR I = 1 TO 3
20 READ N$
30 IF N$ = "PIP" THEN PRINT I: GOTO 60
40 NEXT I
50 PRINT 0
60 DATA HAZEL, PIP, ROWAN`, options: [" 2", " 1", " 3", " 0"], answer: " 2", why: "PIP is the second name in the DATA list." },
        { q: "Why does the search use GOTO after a match?", options: ["To leave the loop once the item is found", "GOTO is required after every IF", "To restart READ", "To clear the array"], answer: "To leave the loop once the item is found", why: "Without the jump, the loop would keep scanning and might print again." },
      ],
    },
    {
      id: "sort",
      title: "Bubble sort",
      summary: "Sorting an array with nested loops and SWAP.",
      sections: [
        {
          p: "<code>SWAP A, B</code> exchanges two variables. A <b>bubble sort</b> compares neighbours and swaps them when they are out of order; after each outer pass the next-largest value has \"bubbled\" to the end, so the inner loop can shrink by one. It was the sort almost every BASIC book taught first.",
          code: `10 DIM A(5)
20 FOR I = 1 TO 5
30 READ A(I)
40 NEXT I
50 FOR P = 1 TO 4
60 FOR I = 1 TO 5 - P
70 IF A(I) > A(I + 1) THEN SWAP A(I), A(I + 1)
80 NEXT I
90 NEXT P
100 FOR I = 1 TO 5
110 PRINT A(I);
120 NEXT I
130 DATA 9, 3, 7, 1, 5
140 END`,
          out: " 1  3  5  7  9",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `10 A = 2: B = 9
20 SWAP A, B
30 PRINT A; B`, options: [" 9  2", " 2  9", " 2  2", " 9  9"], answer: " 9  2", why: "SWAP exchanges the two values." },
        { kind: "output", q: "What does this print?", code: `10 DIM A(3)
20 FOR I = 1 TO 3
30 READ A(I)
40 NEXT I
50 FOR P = 1 TO 2
60 FOR I = 1 TO 3 - P
70 IF A(I) > A(I + 1) THEN SWAP A(I), A(I + 1)
80 NEXT I
90 NEXT P
100 FOR I = 1 TO 3
110 PRINT A(I);
120 NEXT I
130 DATA 4, 1, 3`, options: [" 1  3  4", " 4  1  3", " 1  4  3", " 3  1  4"], answer: " 1  3  4", why: "Two bubble passes leave the three values in ascending order." },
        { q: "Why does the inner loop run to 5 − P?", options: ["Each outer pass fixes one more value at the end", "BASIC arrays start at 5", "SWAP needs a shorter range", "DATA only has four items"], answer: "Each outer pass fixes one more value at the end", why: "After pass P, the last P cells are sorted, so they need not be compared again." },
      ],
    },
    {
      id: "project",
      title: "Project: a nut ledger",
      summary: "DATA events, a stock array and a skip-when-short rule.",
      sections: [
        {
          p: "Six events update three stock bins. Each <code>DATA</code> line is an action (<code>FOUND</code>, <code>ATE</code> or <code>GIFT</code>), a nut name and a count. Finds always add; eats and gifts subtract when there is enough, otherwise the program prints <code>SKIPPED</code> and leaves the bin alone — the same ledger shape as the Turbo Pascal and COBOL projects, in classic line-numbered BASIC.",
          code: `10 REM NUT LEDGER
20 DIM N$(3), S(3)
30 N$(1) = "ACORN": N$(2) = "WALNUT": N$(3) = "HAZEL"
40 FOR I = 1 TO 3: S(I) = 0: NEXT I
50 FOR E = 1 TO 6
60 READ K$, NUT$, Q
70 FOR I = 1 TO 3
80 IF N$(I) = NUT$ THEN 110
90 NEXT I
100 GOTO 160
110 IF K$ = "FOUND" THEN S(I) = S(I) + Q: GOTO 160
120 IF S(I) >= Q THEN S(I) = S(I) - Q: GOTO 160
130 PRINT "SKIPPED "; N$(I)
160 NEXT E
170 FOR I = 1 TO 3
180 PRINT N$(I); ":"; S(I)
190 NEXT I
200 DATA FOUND, ACORN, 8
210 DATA FOUND, WALNUT, 3
220 DATA ATE, ACORN, 2
230 DATA GIFT, WALNUT, 5
240 DATA FOUND, HAZEL, 4
250 DATA GIFT, ACORN, 1
260 END`,
          out: "SKIPPED WALNUT\nACORN: 5\nWALNUT: 3\nHAZEL: 4",
        },
        {
          h: "Ideas to try",
          p: "Drive the events from a typed <code>INPUT</code> loop on a real interpreter, keep a running cash total beside the stock, or sort the final bins with the bubble sort from the last lesson before printing.",
        },
      ],
      practice: [
        { q: "Why is WALNUT skipped?", options: ["The gift asks for 5 but only 3 are in stock", "WALNUT is not in the name list", "ATE runs after GIFT", "FOUND never ran"], answer: "The gift asks for 5 but only 3 are in stock", why: "FOUND adds 3 walnuts; GIFT 5 fails the S(I) >= Q check." },
        { q: "What is the final ACORN count?", options: ["5", "8", "6", "7"], answer: "5", why: "Start 0, found 8, ate 2, gift 1 leaves 5." },
        { kind: "output", q: "What does this print?", code: `10 S = 4
20 Q = 2
30 IF S >= Q THEN S = S - Q: PRINT S
40 END`, options: [" 2", " 4", " 6", "SKIPPED"], answer: " 2", why: "4 is enough for a gift of 2, so stock becomes 2." },
      ],
    },
  ],
};
