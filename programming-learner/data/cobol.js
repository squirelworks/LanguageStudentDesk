// COBOL course for the Programming Learner. Written for this project.
// Examples are complete programs in free format. tools/run_cobol.py compiles
// them with GnuCOBOL (cobc -x -free) and checks the printed output.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.cobol = {
  id: "cobol",
  name: "COBOL",
  title: "COBOL: records, money and plain English",
  intro:
    "COBOL (COmmon Business-Oriented Language) was designed in 1959 for business data: names, amounts, dates and records. It is still in daily use at banks, insurers and government agencies, where it runs payroll, payments and benefits on mainframes, and those systems need people who can read and maintain it. COBOL reads like stiff English: <code>ADD TAX TO TOTAL</code>. These lessons use free format, which modern compilers accept; older code puts each part of a line in fixed columns, and lesson 1 shows how. Every example is a whole program and shows exactly what it prints. To run one yourself with GnuCOBOL, save it as <code>hello.cob</code> and type <code>cobc -x -free hello.cob && ./hello</code>.",
  comment: "*>",
  caseInsensitive: true,
  keywords: [
    "IDENTIFICATION", "DIVISION", "PROGRAM-ID", "DATA", "WORKING-STORAGE", "SECTION", "PROCEDURE",
    "PIC", "VALUE", "MOVE", "TO", "ADD", "SUBTRACT", "FROM", "MULTIPLY", "BY", "DIVIDE", "INTO", "GIVING",
    "COMPUTE", "IF", "ELSE", "END-IF", "EVALUATE", "WHEN", "OTHER", "END-EVALUATE", "PERFORM", "END-PERFORM",
    "VARYING", "UNTIL", "TIMES", "STOP", "RUN", "OCCURS", "REMAINDER", "ROUNDED", "AND", "OR", "NOT", "SET", "TRUE",
  ],
  builtins: ["DISPLAY", "ZERO", "ZEROS", "SPACES"],
  lessons: [
    {
      id: "first",
      title: "Your first program",
      summary: "Divisions, DISPLAY and STOP RUN.",
      sections: [
        {
          p: "A COBOL program is split into <b>divisions</b>. The <code>IDENTIFICATION DIVISION</code> names the program. The <code>PROCEDURE DIVISION</code> holds the statements that run, top to bottom. <code>DISPLAY</code> prints a line, and <code>STOP RUN</code> ends the program. Sentences end with a full stop.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. HELLO.
PROCEDURE DIVISION.
    DISPLAY "Hello, squirrel!".
    DISPLAY "Nuts are ready.".
    STOP RUN.`,
          out: "Hello, squirrel!\nNuts are ready.",
        },
        {
          h: "Several items on one line",
          p: "<code>DISPLAY</code> prints every item you give it, one after the other with nothing in between, and then ends the line. <code>*&gt;</code> starts a comment that runs to the end of the line.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. JOIN.
PROCEDURE DIVISION.
    *> Two items, no space added between them
    DISPLAY "Acorn" "Bank".
    DISPLAY "Acorn " "Bank".
    STOP RUN.`,
          out: "AcornBank\nAcorn Bank",
        },
        {
          h: "Fixed columns in older code",
          p: "Code written for older compilers uses a fixed layout from the days of punched cards. Columns 1 to 6 hold a sequence number, column 7 marks a comment with <code>*</code>, division and paragraph names start in column 8 (area A), and statements start in column 12 or later (area B). Anything past column 72 is ignored. You will meet this layout in nearly every existing system, so it is worth recognising, even though the lessons here use free format.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q1.
PROCEDURE DIVISION.
    DISPLAY "Pay" "day".
    STOP RUN.`, options: ["Payday", "Pay day", "Pay\nday", "\"Pay\" \"day\""], answer: "Payday", why: "DISPLAY puts the items right next to each other. Add a space inside one of the strings if you want one." },
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q2.
PROCEDURE DIVISION.
    DISPLAY "One".
    *> DISPLAY "Two".
    DISPLAY "Three".
    STOP RUN.`, options: ["One\nThree", "One\nTwo\nThree", "OneThree", "One"], answer: "One\nThree", why: "The middle line is a comment, so it never runs. Each DISPLAY ends its own line." },
        { q: "Which division holds the statements that run?", options: ["PROCEDURE DIVISION", "IDENTIFICATION DIVISION", "DATA DIVISION", "RUN DIVISION"], answer: "PROCEDURE DIVISION", why: "The IDENTIFICATION DIVISION names the program, the DATA DIVISION describes data, and the PROCEDURE DIVISION is the code." },
        { q: "Where is COBOL still widely used today?", options: ["Bank, insurance and government systems", "Phone games", "Web browsers", "Graphics cards"], answer: "Bank, insurance and government systems", why: "Much of the world's payment, payroll and benefits processing still runs on COBOL." },
        { q: "In fixed-format code, what does a * in column 7 mean?", options: ["The line is a comment", "Multiply", "The line continues", "Start of a division"], answer: "The line is a comment", why: "Column 7 is the indicator area. * marks a comment line, and - marks a continued line." },
      ],
    },
    {
      id: "data",
      title: "Data and pictures",
      summary: "WORKING-STORAGE, PIC 9 and PIC X, MOVE.",
      sections: [
        {
          p: "Every variable is declared up front in the <code>DATA DIVISION</code>, under <code>WORKING-STORAGE SECTION</code>. A <b>picture</b> (<code>PIC</code>) says exactly what the field holds. <code>9</code> is one digit and <code>X</code> is one character, and a number in brackets repeats it: <code>PIC 9(3)</code> is three digits, <code>PIC X(8)</code> is eight characters. <code>01</code> is the level number of a stand-alone item.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. PICS.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 NUTS PIC 9(3) VALUE 42.
01 OWNER PIC X(8) VALUE "Squirrel".
PROCEDURE DIVISION.
    DISPLAY OWNER " has " NUTS " nuts".
    STOP RUN.`,
          out: "Squirrel has 042 nuts",
        },
        {
          h: "Fields have a fixed size",
          p: "A field always shows its full width. A three-digit number prints with leading zeros, and a short text value is padded with spaces on the right. A value that is too long is cut off: text loses its right end, and a number loses its leftmost digits.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. SIZES.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 CODE-A PIC X(4).
01 AMOUNT PIC 9(2).
PROCEDURE DIVISION.
    MOVE "AB" TO CODE-A.
    DISPLAY "[" CODE-A "]".
    MOVE "OAKTREE" TO CODE-A.
    DISPLAY "[" CODE-A "]".
    MOVE 1234 TO AMOUNT.
    DISPLAY AMOUNT.
    STOP RUN.`,
          out: "[AB  ]\n[OAKT]\n34",
        },
        {
          h: "Edited pictures for printing",
          p: "An edited picture formats a number for people. <code>Z</code> is a digit that shows as a space when it is a leading zero. Move a plain number into an edited field to print it neatly.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. EDITED.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 NUTS PIC 9(4) VALUE 42.
01 NUTS-OUT PIC ZZZ9.
PROCEDURE DIVISION.
    MOVE NUTS TO NUTS-OUT.
    DISPLAY "[" NUTS "]".
    DISPLAY "[" NUTS-OUT "]".
    STOP RUN.`,
          out: "[0042]\n[  42]",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q1.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 N PIC 9(3) VALUE 7.
PROCEDURE DIVISION.
    DISPLAY N.
    STOP RUN.`, options: ["007", "7", "  7", "700"], answer: "007", why: "PIC 9(3) is always three digits wide, so 7 shows with two leading zeros." },
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q2.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 T PIC X(3).
PROCEDURE DIVISION.
    MOVE "PINECONE" TO T.
    DISPLAY T.
    STOP RUN.`, options: ["PIN", "CONE", "PINECONE", "ONE"], answer: "PIN", why: "Text is cut off on the right when it does not fit, so only the first three characters stay." },
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q3.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 N PIC 9(2).
PROCEDURE DIVISION.
    MOVE 365 TO N.
    DISPLAY N.
    STOP RUN.`, options: ["65", "36", "365", "99"], answer: "65", why: "A number that is too big loses its leftmost digits. This silent truncation is a classic COBOL bug, so size fields generously." },
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q4.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 N PIC 9(3) VALUE 5.
01 E PIC ZZ9.
PROCEDURE DIVISION.
    MOVE N TO E.
    DISPLAY "[" E "]".
    STOP RUN.`, options: ["[  5]", "[005]", "[5]", "[5  ]"], answer: "[  5]", why: "Each Z turns a leading zero into a space. The final 9 always shows a digit." },
        { q: "What does PIC X(10) hold?", options: ["Ten characters", "Ten digits", "A number up to 10", "Ten lines"], answer: "Ten characters", why: "X is one character of any kind, and (10) repeats it ten times." },
      ],
    },
    {
      id: "arithmetic",
      title: "Arithmetic",
      summary: "ADD, SUBTRACT, MULTIPLY, DIVIDE, COMPUTE and decimals.",
      sections: [
        {
          p: "COBOL has an English verb for each operation. <code>ADD A TO B</code> changes <code>B</code>. With <code>GIVING</code>, the result goes into a separate field and the inputs are left alone.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. VERBS.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 TOTAL PIC 9(3) VALUE 10.
01 RESULT PIC 9(3).
PROCEDURE DIVISION.
    ADD 5 TO TOTAL.
    DISPLAY TOTAL.
    SUBTRACT 3 FROM TOTAL.
    DISPLAY TOTAL.
    MULTIPLY TOTAL BY 2 GIVING RESULT.
    DISPLAY RESULT.
    DIVIDE RESULT BY 4 GIVING RESULT.
    DISPLAY RESULT.
    STOP RUN.`,
          out: "015\n012\n024\n006",
        },
        {
          h: "COMPUTE and the remainder",
          p: "<code>COMPUTE</code> takes an ordinary formula with <code>+ - * /</code> and brackets. Whole-number fields drop any fraction, they do not round it. <code>DIVIDE ... REMAINDER</code> gives you what is left over.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. COMP.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 Q PIC 9(3).
01 R PIC 9(3).
PROCEDURE DIVISION.
    COMPUTE Q = (2 + 3) * 4.
    DISPLAY Q.
    DIVIDE 17 BY 5 GIVING Q REMAINDER R.
    DISPLAY Q " remainder " R.
    STOP RUN.`,
          out: "020\n003 remainder 002",
        },
        {
          h: "Decimals for money",
          p: "<code>V</code> in a picture marks where the decimal point is assumed to be. <code>PIC 9(3)V99</code> holds amounts like 123.45 exactly, without the rounding errors of floating point, which is why banks like it. To print the point, move the value into an edited picture with a real <code>.</code> in it. <code>ROUNDED</code> rounds instead of cutting off.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. MONEY.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 PRICE PIC 9(3)V99 VALUE 19.99.
01 TOTAL PIC 9(4)V99.
01 SHARE PIC 9(3)V99.
01 SHOW PIC ZZZ9.99.
PROCEDURE DIVISION.
    MULTIPLY PRICE BY 3 GIVING TOTAL.
    MOVE TOTAL TO SHOW.
    DISPLAY "Total:" SHOW.
    COMPUTE SHARE ROUNDED = 10 / 3.
    MOVE SHARE TO SHOW.
    DISPLAY "Share:" SHOW.
    STOP RUN.`,
          out: "Total:  59.97\nShare:   3.33",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q1.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 N PIC 9(2) VALUE 8.
PROCEDURE DIVISION.
    ADD 4 TO N.
    DISPLAY N.
    STOP RUN.`, options: ["12", "4", "8", "84"], answer: "12", why: "ADD 4 TO N adds 4 to N and stores the result back in N." },
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q2.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 N PIC 9(2).
PROCEDURE DIVISION.
    DIVIDE 9 BY 2 GIVING N.
    DISPLAY N.
    STOP RUN.`, options: ["04", "05", "4.5", "45"], answer: "04", why: "N has no decimal places, so the .5 is dropped. Without ROUNDED, COBOL cuts off, it does not round." },
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q3.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 N PIC 9(2).
PROCEDURE DIVISION.
    DIVIDE 9 BY 2 GIVING N ROUNDED.
    DISPLAY N.
    STOP RUN.`, options: ["05", "04", "4.5", "09"], answer: "05", why: "ROUNDED rounds 4.5 up to 5." },
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q4.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 Q PIC 9.
01 R PIC 9.
PROCEDURE DIVISION.
    DIVIDE 7 BY 3 GIVING Q REMAINDER R.
    DISPLAY Q R.
    STOP RUN.`, options: ["21", "12", "23", "2"], answer: "21", why: "7 is 3 twice with 1 left over, so Q is 2 and R is 1, printed side by side." },
        { q: "Why is PIC 9(5)V99 good for money?", options: ["It stores the cents exactly, with no floating-point rounding", "It makes numbers print in colour", "It allows negative amounts automatically", "It stores numbers in binary"], answer: "It stores the cents exactly, with no floating-point rounding", why: "V marks an assumed decimal point and the digits are stored exactly, so 0.10 + 0.20 is exactly 0.30." },
      ],
    },
    {
      id: "decisions",
      title: "Decisions",
      summary: "IF, EVALUATE and level-88 condition names.",
      sections: [
        {
          p: "<code>IF</code> runs statements when a condition is true, <code>ELSE</code> when it is not, and <code>END-IF</code> closes it. Conditions can be written with symbols (<code>&gt; &lt; =</code>) or words (<code>GREATER THAN</code>), and joined with <code>AND</code>, <code>OR</code> and <code>NOT</code>.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. CHECK.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 BALANCE PIC 9(4) VALUE 250.
PROCEDURE DIVISION.
    IF BALANCE > 100
        DISPLAY "Plenty saved"
    ELSE
        DISPLAY "Save more"
    END-IF.
    STOP RUN.`,
          out: "Plenty saved",
        },
        {
          h: "EVALUATE",
          p: "<code>EVALUATE</code> picks one branch out of many. The first <code>WHEN</code> that matches runs, and <code>WHEN OTHER</code> catches everything else. <code>THRU</code> matches a range.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. GRADE.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 SCORE PIC 9(3) VALUE 82.
PROCEDURE DIVISION.
    EVALUATE SCORE
        WHEN 90 THRU 100 DISPLAY "A"
        WHEN 80 THRU 89 DISPLAY "B"
        WHEN 70 THRU 79 DISPLAY "C"
        WHEN OTHER DISPLAY "Try again"
    END-EVALUATE.
    STOP RUN.`,
          out: "B",
        },
        {
          h: "Condition names",
          p: "A level-<code>88</code> item gives a name to some values of the field above it. The name then reads like a true-or-false question, and <code>SET ... TO TRUE</code> moves the matching value in. Real programs use these everywhere for status codes.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. STATUS.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 ACCOUNT-STATUS PIC X VALUE "O".
   88 ACCOUNT-OPEN VALUE "O".
   88 ACCOUNT-CLOSED VALUE "C".
PROCEDURE DIVISION.
    IF ACCOUNT-OPEN
        DISPLAY "Open"
    END-IF.
    SET ACCOUNT-CLOSED TO TRUE.
    DISPLAY ACCOUNT-STATUS.
    STOP RUN.`,
          out: "Open\nC",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q1.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 N PIC 9(2) VALUE 10.
PROCEDURE DIVISION.
    IF N > 10
        DISPLAY "big"
    ELSE
        DISPLAY "small"
    END-IF.
    STOP RUN.`, options: ["small", "big", "big\nsmall", "Nothing"], answer: "small", why: "10 is not greater than 10, so the ELSE branch runs." },
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q2.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 DAY-NO PIC 9 VALUE 6.
PROCEDURE DIVISION.
    EVALUATE DAY-NO
        WHEN 1 THRU 5 DISPLAY "Weekday"
        WHEN 6 WHEN 7 DISPLAY "Weekend"
        WHEN OTHER DISPLAY "No such day"
    END-EVALUATE.
    STOP RUN.`, options: ["Weekend", "Weekday", "No such day", "Weekday\nWeekend"], answer: "Weekend", why: "Two WHENs in a row share one action, so 6 or 7 prints Weekend. Only the first matching branch runs." },
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q3.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 LIGHT PIC X VALUE "G".
   88 STOP-NOW VALUE "R".
   88 GO-ON VALUE "G".
PROCEDURE DIVISION.
    IF STOP-NOW
        DISPLAY "Stop"
    ELSE
        DISPLAY "Go"
    END-IF.
    STOP RUN.`, options: ["Go", "Stop", "G", "R"], answer: "Go", why: "STOP-NOW is true only when LIGHT holds R. It holds G, so the ELSE branch runs." },
        { q: "What closes an IF statement?", options: ["END-IF", "FI", "}", "ENDIF."], answer: "END-IF", why: "Modern COBOL closes IF with END-IF. Older code ended the whole IF with a full stop instead, which made nested IFs easy to get wrong." },
      ],
    },
    {
      id: "loops",
      title: "Loops and paragraphs",
      summary: "PERFORM TIMES, UNTIL and VARYING, and named paragraphs.",
      sections: [
        {
          p: "Loops are written with <code>PERFORM</code>. An inline <code>PERFORM ... END-PERFORM</code> repeats the statements inside it. <code>TIMES</code> gives a fixed count, and <code>VARYING ... FROM ... BY ... UNTIL</code> is a counting loop.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. COUNT.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 I PIC 9(2).
PROCEDURE DIVISION.
    PERFORM 2 TIMES
        DISPLAY "Hop"
    END-PERFORM.
    PERFORM VARYING I FROM 1 BY 1 UNTIL I > 3
        DISPLAY "Step " I
    END-PERFORM.
    STOP RUN.`,
          out: "Hop\nHop\nStep 01\nStep 02\nStep 03",
        },
        {
          h: "UNTIL is checked first",
          p: "<code>PERFORM UNTIL</code> tests the condition before each pass, so the body might not run at all. It stops as soon as the condition is true.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. DOUBLE.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 N PIC 9(3) VALUE 1.
PROCEDURE DIVISION.
    PERFORM UNTIL N > 20
        DISPLAY N
        MULTIPLY 2 BY N
    END-PERFORM.
    STOP RUN.`,
          out: "001\n002\n004\n008\n016",
        },
        {
          h: "Paragraphs",
          p: "A <b>paragraph</b> is a named block of statements, a little like a procedure with no parameters. <code>PERFORM NAME</code> runs it and comes back. Put <code>STOP RUN</code> before the paragraphs, or the program falls into them after the main part.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. PARAS.
PROCEDURE DIVISION.
MAIN-PARA.
    PERFORM GREET.
    PERFORM GREET 2 TIMES.
    STOP RUN.
GREET.
    DISPLAY "Hello from GREET".`,
          out: "Hello from GREET\nHello from GREET\nHello from GREET",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q1.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 I PIC 9.
PROCEDURE DIVISION.
    PERFORM VARYING I FROM 2 BY 2 UNTIL I > 6
        DISPLAY I
    END-PERFORM.
    STOP RUN.`, options: ["2\n4\n6", "2\n4", "2\n4\n6\n8", "0\n2\n4\n6"], answer: "2\n4\n6", why: "I takes 2, 4 and 6. When it reaches 8 the UNTIL test is true and the loop stops before printing." },
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q2.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 N PIC 9 VALUE 5.
PROCEDURE DIVISION.
    PERFORM UNTIL N > 3
        DISPLAY "inside"
    END-PERFORM.
    DISPLAY "done".
    STOP RUN.`, options: ["done", "inside\ndone", "inside", "Nothing"], answer: "done", why: "N is already greater than 3, and PERFORM UNTIL checks before the first pass, so the body never runs." },
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q3.
PROCEDURE DIVISION.
MAIN-PARA.
    DISPLAY "A".
    PERFORM SAY-B.
    DISPLAY "C".
    STOP RUN.
SAY-B.
    DISPLAY "B".`, options: ["A\nB\nC", "A\nC\nB", "A\nC", "B\nA\nC"], answer: "A\nB\nC", why: "PERFORM SAY-B jumps to the paragraph, runs it, and comes back to the next statement." },
        { q: "What happens if you leave out STOP RUN before the paragraphs?", options: ["The program carries on into the paragraphs below", "Nothing, it stops anyway", "It will not compile", "It loops forever from the top"], answer: "The program carries on into the paragraphs below", why: "Statements run top to bottom, so without STOP RUN the paragraphs run once more after the main part." },
      ],
    },
    {
      id: "records",
      title: "Records and tables",
      summary: "Group items, OCCURS and subscripts.",
      sections: [
        {
          p: "Data is described as <b>records</b>. A group item at level <code>01</code> holds smaller fields at higher levels such as <code>05</code>. You can work with one field, or with the whole record as a single string of characters. This is how COBOL lays out each line of a bank file.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. RECORD.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 CUSTOMER.
   05 CUST-ID PIC 9(4) VALUE 17.
   05 CUST-NAME PIC X(6) VALUE "Hazel".
   05 CUST-NUTS PIC 9(3) VALUE 120.
PROCEDURE DIVISION.
    DISPLAY CUST-NAME.
    DISPLAY CUSTOMER.
    STOP RUN.`,
          out: "Hazel\n0017Hazel 120",
        },
        {
          h: "Tables with OCCURS",
          p: "<code>OCCURS</code> repeats a field to make a table (an array). Subscripts are written in brackets and <b>start at 1</b>, not 0.",
          code: `IDENTIFICATION DIVISION.
PROGRAM-ID. TABLE.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 STASH.
   05 NUTS PIC 9(2) OCCURS 3 TIMES.
01 I PIC 9.
01 TOTAL PIC 9(3) VALUE 0.
PROCEDURE DIVISION.
    MOVE 12 TO NUTS(1).
    MOVE 30 TO NUTS(2).
    MOVE 5 TO NUTS(3).
    PERFORM VARYING I FROM 1 BY 1 UNTIL I > 3
        ADD NUTS(I) TO TOTAL
    END-PERFORM.
    DISPLAY "Total " TOTAL.
    DISPLAY "Second " NUTS(2).
    STOP RUN.`,
          out: "Total 047\nSecond 30",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q1.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 DATE-REC.
   05 YYYY PIC 9(4) VALUE 1959.
   05 MM PIC 9(2) VALUE 5.
PROCEDURE DIVISION.
    DISPLAY DATE-REC.
    STOP RUN.`, options: ["195905", "1959 5", "1959-05", "19595"], answer: "195905", why: "A group item is all its fields side by side. MM is two digits wide, so 5 shows as 05." },
        { kind: "output", q: "What does this print?", code: `IDENTIFICATION DIVISION.
PROGRAM-ID. Q2.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 T.
   05 W PIC X(3) OCCURS 3 TIMES.
PROCEDURE DIVISION.
    MOVE "OAK" TO W(1).
    MOVE "ELM" TO W(2).
    MOVE "ASH" TO W(3).
    DISPLAY W(1).
    STOP RUN.`, options: ["OAK", "ELM", "ASH", "OAKELMASH"], answer: "OAK", why: "COBOL subscripts start at 1, so W(1) is the first entry." },
        { q: "What does OCCURS 10 TIMES make?", options: ["A table of ten entries", "A loop that runs ten times", "A ten-character field", "Ten separate programs"], answer: "A table of ten entries", why: "OCCURS repeats the field to make an array. PERFORM is what loops." },
        { q: "What is the first subscript of a COBOL table?", options: ["1", "0", "-1", "It depends on the compiler"], answer: "1", why: "COBOL counts table entries from 1." },
      ],
    },
  ],
};
