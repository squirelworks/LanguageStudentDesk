// LOLCODE course for the Programming Learner. Written for this project.
// Schema: see data/python.js. Examples with `out` and practice of kind
// "output" are run by tools/check_packs.py with tools/run_lolcode.py.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.lolcode = {
  id: "lolcode",
  name: "LOLCODE",
  title: "LOLCODE 1.2",
  intro:
    "LOLCODE was made in 2007 as a joke about lolcat captions, but it is a complete language with variables, loops, functions and a written specification (version 1.2). Under the silly words it works much like a small scripting language, which makes it a fun way to practise ideas you already know, or to meet them for the first time. To run code yourself, build the <code>lci</code> interpreter from its source (github.com/justinmeza/lci), save a program in a file ending in <code>.lol</code> and run <code>lci file.lol</code>. Every example shows exactly what it prints.",
  comment: "BTW",
  keywords: [
    "HAI", "KTHXBYE", "CAN", "HAS", "I", "A", "ITZ", "R", "VISIBLE", "GIMMEH", "O", "RLY?", "RLY", "YA", "NO", "WAI", "MEBBE",
    "OIC", "WTF?", "OMG", "OMGWTF", "GTFO", "IM", "IN", "YR", "OUTTA", "UPPIN", "NERFIN", "TIL", "WILE", "HOW", "IZ", "IF",
    "U", "SAY", "SO", "FOUND", "AN", "MKAY", "NOT", "BOTH", "SAEM", "DIFFRINT", "EITHER", "OF", "WON", "ALL", "ANY", "SUM", "DIFF",
    "PRODUKT", "QUOSHUNT", "MOD", "BIGGR", "SMALLR", "SMOOSH", "MAEK", "IS", "NOW", "WIN", "FAIL", "NOOB", "YARN", "NUMBR", "NUMBAR", "TROOF",
    "OBTW", "TLDR",
  ],
  builtins: ["IT"],
  lessons: [
    {
      id: "basics",
      title: "HAI and VISIBLE",
      summary: "Program bounds, printing, comments and special characters.",
      sections: [
        {
          p: "Every program starts with <code>HAI 1.2</code> (the version) and ends with <code>KTHXBYE</code>. <code>VISIBLE</code> prints and then starts a new line. <code>BTW</code> starts a comment that runs to the end of the line.",
          code: `HAI 1.2
BTW this is a comment
VISIBLE "OH HAI"
VISIBLE "I CAN HAS CHEEZBURGER?"
KTHXBYE`,
          out: "OH HAI\nI CAN HAS CHEEZBURGER?",
        },
        {
          h: "Several things in one line",
          p: "Give <code>VISIBLE</code> several values and it prints them one after another with nothing in between, so put any spaces inside the quotes. A <code>!</code> at the very end stops the new line, so the next <code>VISIBLE</code> carries on the same line.",
          code: `HAI 1.2
VISIBLE "NUTZ = " 3
VISIBLE "SQUIR"!
VISIBLE "REL"
KTHXBYE`,
          out: "NUTZ = 3\nSQUIRREL",
        },
        {
          h: "Long comments",
          p: "<code>OBTW</code> starts a comment that can cover many lines, and <code>TLDR</code> (“too long, didn't read”) ends it.",
          code: `HAI 1.2
OBTW
  This whole part is ignored.
  Even this line.
TLDR
VISIBLE "STILL HERE"
KTHXBYE`,
          out: "STILL HERE",
        },
        {
          h: "Special characters",
          p: "Inside a string the colon is the escape character. <code>:)</code> is a new line, <code>:&gt;</code> a tab, <code>:\"</code> a double quote and <code>::</code> a colon.",
          code: `HAI 1.2
VISIBLE "ONE:)TWO"
VISIBLE "SHE SED :"HAI:""
VISIBLE "TIME:: 3 OCLOCK"
KTHXBYE`,
          out: "ONE\nTWO\nSHE SED \"HAI\"\nTIME: 3 OCLOCK",
        },
        {
          h: "Commas join lines",
          p: "A comma works like a line break, so short statements can share a line.",
          code: `HAI 1.2
VISIBLE "A", VISIBLE "B"
KTHXBYE`,
          out: "A\nB",
        },
      ],
      practice: [
        { q: "Which line prints KITTEH?", options: ["VISIBLE \"KITTEH\"", "PRINT \"KITTEH\"", "GIMMEH \"KITTEH\"", "SAY \"KITTEH\""], answer: "VISIBLE \"KITTEH\"", why: "VISIBLE is LOLCODE's print." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
VISIBLE "UP" "TREE"
KTHXBYE`, options: ["UPTREE", "UP TREE", "UP\nTREE", "\"UP\" \"TREE\""], answer: "UPTREE", why: "VISIBLE joins its values with nothing in between." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
VISIBLE "HAI"!
VISIBLE "2U"
KTHXBYE`, options: ["HAI2U", "HAI\n2U", "HAI!\n2U", "HAI! 2U"], answer: "HAI2U", why: "The ! at the end stops the new line, so 2U follows straight on." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
BTW VISIBLE "SECRET"
VISIBLE "PUBLIC"
KTHXBYE`, options: ["PUBLIC", "SECRET\nPUBLIC", "SECRET", "Nothing"], answer: "PUBLIC", why: "The first line is a comment, so it never runs." },
        { q: "How do you put a new line inside a string?", options: [":)", "\\n", ":>", "::"], answer: ":)", why: "The colon is LOLCODE's escape character, and :) means a new line." },
        { q: "Which word ends a multi-line comment?", options: ["TLDR", "OBTW", "BTW", "KTHXBYE"], answer: "TLDR", why: "OBTW opens the comment and TLDR closes it." },
      ],
    },
    {
      id: "variables",
      title: "Variables and types",
      summary: "I HAS A, R, the five types and changing between them.",
      sections: [
        {
          p: "<code>I HAS A name ITZ value</code> makes a variable; <code>name R value</code> changes it. A variable made without <code>ITZ</code> holds <code>NOOB</code>, which means “nothing yet”.",
          code: `HAI 1.2
I HAS A nuts ITZ 3
VISIBLE "I HAS " nuts " NUTZ"
nuts R 10
VISIBLE "NAO I HAS " nuts " NUTZ"
KTHXBYE`,
          out: "I HAS 3 NUTZ\nNAO I HAS 10 NUTZ",
        },
        {
          h: "Five types",
          p: "<code>NUMBR</code> is a whole number, <code>NUMBAR</code> a number with a decimal point, <code>YARN</code> text, <code>TROOF</code> is <code>WIN</code> or <code>FAIL</code>, and <code>NOOB</code> is nothing. A variable can hold any type and switch to another later. A <code>NUMBAR</code> is always shown with two decimal places.",
          code: `HAI 1.2
I HAS A n ITZ 42
I HAS A f ITZ 2.5
I HAS A s ITZ "ACORN"
I HAS A t ITZ WIN
VISIBLE n " " f " " s " " t
KTHXBYE`,
          out: "42 2.50 ACORN WIN",
        },
        {
          h: "Putting variables in strings",
          p: "<code>:{name}</code> inside a string is replaced by the variable's value. It saves splitting the string into pieces.",
          code: `HAI 1.2
I HAS A who ITZ "CEILING CAT"
VISIBLE "HAI, :{who}!"
KTHXBYE`,
          out: "HAI, CEILING CAT!",
        },
        {
          h: "MAEK and IS NOW A",
          p: "<code>MAEK value A type</code> gives a copy of the value as another type. <code>name IS NOW A type</code> changes the variable itself. A <code>YARN</code> of digits becomes a number this way, and a <code>NUMBAR</code> made into a <code>NUMBR</code> loses everything after the point.",
          code: `HAI 1.2
I HAS A typed ITZ "12"
I HAS A num ITZ MAEK typed A NUMBR
VISIBLE SUM OF num AN 1
I HAS A f ITZ 7.9
f IS NOW A NUMBR
VISIBLE f
KTHXBYE`,
          out: "13\n7",
        },
        {
          h: "SMOOSH joins text",
          p: "<code>SMOOSH a AN b AN c MKAY</code> joins its values into one <code>YARN</code>. <code>MKAY</code> marks where the list ends.",
          code: `HAI 1.2
I HAS A name ITZ SMOOSH "SQUIR" AN "REL" MKAY
VISIBLE name
VISIBLE SMOOSH name AN " NO. " AN 1 MKAY
KTHXBYE`,
          out: "SQUIRREL\nSQUIRREL NO. 1",
        },
      ],
      practice: [
        { q: "How do you set an existing variable x to 5?", options: ["x R 5", "I HAS A x ITZ 5 again", "x ITZ 5", "x = 5"], answer: "x R 5", why: "R assigns to a variable that already exists; I HAS A declares a new one." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
I HAS A x ITZ 1
x R 7
VISIBLE x
KTHXBYE`, options: ["7", "1", "17", "x"], answer: "7", why: "R replaces the value, so x holds 7 when it is printed." },
        { q: "What does a variable hold after I HAS A thing?", options: ["NOOB", "0", "\"\"", "FAIL"], answer: "NOOB", why: "Without ITZ there is no value yet, which LOLCODE calls NOOB." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
VISIBLE 3.5
KTHXBYE`, options: ["3.50", "3.5", "3", "4"], answer: "3.50", why: "A NUMBAR is shown with two decimal places." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
I HAS A pet ITZ "KITTEH"
VISIBLE "MAH :{pet}"
KTHXBYE`, options: ["MAH KITTEH", "MAH :{pet}", "MAH pet", "MAH"], answer: "MAH KITTEH", why: ":{pet} is swapped for the value of pet." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
VISIBLE SMOOSH "A" AN 1 AN "B" MKAY
KTHXBYE`, options: ["A1B", "A 1 B", "2", "A1"], answer: "A1B", why: "SMOOSH turns each value into text and joins them with nothing between." },
      ],
    },
    {
      id: "maths",
      title: "Maths",
      summary: "Operators that come first, whole and decimal numbers, nesting.",
      sections: [
        {
          p: "Operators come before their two values, joined by <code>AN</code>: <code>SUM OF</code>, <code>DIFF OF</code>, <code>PRODUKT OF</code>, <code>QUOSHUNT OF</code>, <code>MOD OF</code> (remainder), <code>BIGGR OF</code> and <code>SMALLR OF</code>.",
          code: `HAI 1.2
VISIBLE SUM OF 7 AN 3
VISIBLE DIFF OF 7 AN 3
VISIBLE PRODUKT OF 7 AN 3
VISIBLE QUOSHUNT OF 7 AN 3
VISIBLE MOD OF 7 AN 3
VISIBLE BIGGR OF 7 AN 3
KTHXBYE`,
          out: "10\n4\n21\n2\n1\n7",
        },
        {
          h: "Whole or decimal",
          p: "Two <code>NUMBR</code>s give a <code>NUMBR</code>, so <code>QUOSHUNT OF 7 AN 2</code> is 3: the remainder is dropped. If either side is a <code>NUMBAR</code>, the answer is a <code>NUMBAR</code>.",
          code: `HAI 1.2
VISIBLE QUOSHUNT OF 7 AN 2
VISIBLE QUOSHUNT OF 7.0 AN 2
VISIBLE SUM OF 1 AN 0.25
KTHXBYE`,
          out: "3\n3.50\n1.25",
        },
        {
          h: "Nesting",
          p: "An operator can be the value of another. Read from the left: the outer operator waits for both of its values to be worked out. There are no brackets and no precedence to learn.",
          code: `HAI 1.2
VISIBLE PRODUKT OF SUM OF 2 AN 3 AN 4
VISIBLE SUM OF 2 AN PRODUKT OF 3 AN 4
KTHXBYE`,
          out: "20\n14",
        },
        {
          h: "Changing a variable",
          p: "To add to a variable, assign the sum back to it. Text that holds a number is turned into one when maths needs it.",
          code: `HAI 1.2
I HAS A score ITZ 10
score R SUM OF score AN 5
score R PRODUKT OF score AN 2
VISIBLE score
VISIBLE SUM OF "4" AN 4
KTHXBYE`,
          out: "30\n8",
        },
      ],
      practice: [
        { q: "What is DIFF OF 10 AN 4?", options: ["6", "14", "40", "-6"], answer: "6", why: "DIFF OF subtracts the second value from the first." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
VISIBLE QUOSHUNT OF 9 AN 2
KTHXBYE`, options: ["4", "4.50", "4.5", "5"], answer: "4", why: "Both values are NUMBRs, so the answer is a NUMBR and the remainder is dropped." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
VISIBLE MOD OF 17 AN 5
KTHXBYE`, options: ["2", "3", "12", "85"], answer: "2", why: "17 is 3 × 5 with 2 left over." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
VISIBLE DIFF OF PRODUKT OF 3 AN 3 AN 1
KTHXBYE`, options: ["8", "6", "9", "2"], answer: "8", why: "The first value of DIFF OF is PRODUKT OF 3 AN 3, which is 9; 9 − 1 = 8." },
        { q: "What does BIGGR OF 3 AN 8 give?", options: ["8", "3", "11", "WIN"], answer: "8", why: "BIGGR OF returns the larger of the two." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
VISIBLE SUM OF 1.5 AN 1
KTHXBYE`, options: ["2.50", "2", "2.5", "3"], answer: "2.50", why: "One side is a NUMBAR, so the sum is a NUMBAR, shown with two decimal places." },
      ],
    },
    {
      id: "troofs",
      title: "TROOFs and comparisons",
      summary: "WIN and FAIL, comparing values, and the IT variable.",
      sections: [
        {
          p: "<code>BOTH SAEM a AN b</code> is <code>WIN</code> when the values are equal; <code>DIFFRINT a AN b</code> is <code>WIN</code> when they differ. There is no “greater than”: instead ask whether a value is the same as the bigger of the two.",
          code: `HAI 1.2
VISIBLE BOTH SAEM 4 AN 4
VISIBLE DIFFRINT 4 AN 5
I HAS A x ITZ 9
VISIBLE BOTH SAEM x AN BIGGR OF x AN 5
KTHXBYE`,
          out: "WIN\nWIN\nWIN",
        },
        {
          h: "Types matter",
          p: "<code>BOTH SAEM</code> does not turn text into numbers, so the <code>YARN</code> <code>\"3\"</code> is not the same as the <code>NUMBR</code> 3. A <code>NUMBR</code> and a <code>NUMBAR</code> with the same value are equal.",
          code: `HAI 1.2
VISIBLE BOTH SAEM 3 AN "3"
VISIBLE BOTH SAEM 3 AN 3.0
KTHXBYE`,
          out: "FAIL\nWIN",
        },
        {
          h: "AND, OR, NOT",
          p: "<code>BOTH OF</code> is “and”, <code>EITHER OF</code> is “or”, <code>WON OF</code> is “one but not both”, and <code>NOT</code> flips a value. <code>ALL OF ... MKAY</code> and <code>ANY OF ... MKAY</code> take a whole list.",
          code: `HAI 1.2
VISIBLE BOTH OF WIN AN FAIL
VISIBLE EITHER OF WIN AN FAIL
VISIBLE WON OF WIN AN WIN
VISIBLE NOT FAIL
VISIBLE ALL OF WIN AN WIN AN FAIL MKAY
KTHXBYE`,
          out: "FAIL\nWIN\nFAIL\nWIN\nFAIL",
        },
        {
          h: "Truthy values",
          p: "When a <code>TROOF</code> is needed, other values are turned into one: 0, 0.0, the empty string <code>\"\"</code> and <code>NOOB</code> are <code>FAIL</code>; everything else is <code>WIN</code>.",
          code: `HAI 1.2
VISIBLE NOT 0
VISIBLE NOT ""
VISIBLE NOT "FAIL"
KTHXBYE`,
          out: "WIN\nWIN\nFAIL",
        },
        {
          h: "IT",
          p: "A line that is just a value, with no <code>VISIBLE</code> or <code>R</code>, stores that value in a special variable called <code>IT</code>. The decisions in the next lessons look at <code>IT</code>.",
          code: `HAI 1.2
SUM OF 20 AN 22
VISIBLE IT
KTHXBYE`,
          out: "42",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `HAI 1.2
VISIBLE DIFFRINT 2 AN 2
KTHXBYE`, options: ["FAIL", "WIN", "0", "2"], answer: "FAIL", why: "The values are the same, so DIFFRINT is FAIL." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
VISIBLE BOTH SAEM "7" AN 7
KTHXBYE`, options: ["FAIL", "WIN", "7", "NOOB"], answer: "FAIL", why: "A YARN and a NUMBR are different types, so they are not the same." },
        { q: "How do you ask whether x is at least 10?", options: ["BOTH SAEM x AN BIGGR OF x AN 10", "BIGGR x AN 10", "x > 10", "BOTH SAEM x AN 10"], answer: "BOTH SAEM x AN BIGGR OF x AN 10", why: "If x is the bigger of x and 10, then x is 10 or more." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
VISIBLE EITHER OF FAIL AN NOT FAIL
KTHXBYE`, options: ["WIN", "FAIL", "NOOB", "NOT"], answer: "WIN", why: "NOT FAIL is WIN, and EITHER OF needs only one WIN." },
        { q: "Which value counts as FAIL?", options: ["\"\"", "\"0.0\"", "-1", "\"FAIL\""], answer: "\"\"", why: "Only 0, 0.0, the empty string and NOOB are FAIL; any non-empty text is WIN." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
PRODUKT OF 6 AN 7
VISIBLE IT
KTHXBYE`, options: ["42", "NOOB", "IT", "13"], answer: "42", why: "A bare value goes into IT, so IT holds 42." },
      ],
    },
    {
      id: "flow",
      title: "O RLY? decisions",
      summary: "YA RLY, NO WAI, MEBBE and OIC.",
      sections: [
        {
          p: "Work out a <code>TROOF</code> on its own line so it lands in <code>IT</code>, then <code>O RLY?</code> branches on it: <code>YA RLY</code> runs when <code>IT</code> is <code>WIN</code>, <code>NO WAI</code> otherwise, and <code>OIC</code> (“oh, I see”) closes the block.",
          code: `HAI 1.2
I HAS A temp ITZ 4
BOTH SAEM temp AN SMALLR OF temp AN 10
O RLY?
  YA RLY
    VISIBLE "CHILLY"
  NO WAI
    VISIBLE "WARM"
OIC
KTHXBYE`,
          out: "CHILLY",
        },
        {
          h: "Without NO WAI",
          p: "The <code>NO WAI</code> part is optional. If <code>IT</code> is <code>FAIL</code> and there is no <code>NO WAI</code>, nothing happens.",
          code: `HAI 1.2
I HAS A nuts ITZ 0
nuts
O RLY?
  YA RLY
    VISIBLE "SNACK TIME"
OIC
VISIBLE "DONE"
KTHXBYE`,
          out: "DONE",
        },
        {
          h: "MEBBE for more choices",
          p: "<code>MEBBE expression</code> is “else if”: when the earlier tests fail, its expression is worked out and its part runs if that is <code>WIN</code>. Only the first matching part runs.",
          code: `HAI 1.2
I HAS A n ITZ 15
BOTH SAEM n AN 0
O RLY?
  YA RLY
    VISIBLE "NONE"
  MEBBE BOTH SAEM n AN SMALLR OF n AN 9
    VISIBLE "FEW"
  MEBBE BOTH SAEM n AN SMALLR OF n AN 99
    VISIBLE "LOTS"
  NO WAI
    VISIBLE "TOO MANY"
OIC
KTHXBYE`,
          out: "LOTS",
        },
        {
          h: "Nesting",
          p: "A whole <code>O RLY?</code> block can sit inside a part of another one. Indenting is optional, but it makes the shape easy to see.",
          code: `HAI 1.2
I HAS A hungry ITZ WIN
I HAS A nuts ITZ 2
hungry
O RLY?
  YA RLY
    nuts
    O RLY?
      YA RLY
        VISIBLE "NOM NOM"
      NO WAI
        VISIBLE "GO FIND NUTZ"
    OIC
OIC
KTHXBYE`,
          out: "NOM NOM",
        },
      ],
      practice: [
        { q: "What closes an O RLY? block?", options: ["OIC", "KTHXBYE", "NO WAI", "GTFO"], answer: "OIC", why: "OIC (“oh, I see”) ends the conditional." },
        { q: "Where does the result of BOTH SAEM go when it stands alone on a line?", options: ["Into IT", "Into WIN", "It is printed", "Nowhere"], answer: "Into IT", why: "A bare expression is stored in the special variable IT, which O RLY? tests." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
I HAS A x ITZ 3
BOTH SAEM x AN 4
O RLY?
  YA RLY
    VISIBLE "FOUR"
  NO WAI
    VISIBLE "NOT FOUR"
OIC
KTHXBYE`, options: ["NOT FOUR", "FOUR", "FOUR\nNOT FOUR", "Nothing"], answer: "NOT FOUR", why: "3 is not 4, so IT is FAIL and the NO WAI part runs." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
I HAS A n ITZ 5
BOTH SAEM n AN 1
O RLY?
  YA RLY
    VISIBLE "ONE"
  MEBBE BOTH SAEM n AN 5
    VISIBLE "FIVE"
  MEBBE BOTH SAEM n AN BIGGR OF n AN 2
    VISIBLE "BIG"
OIC
KTHXBYE`, options: ["FIVE", "FIVE\nBIG", "BIG", "ONE"], answer: "FIVE", why: "Only the first part whose test is WIN runs, even though the last test would also be WIN." },
        { q: "Which word means “else if”?", options: ["MEBBE", "NO WAI", "YA RLY", "OMG"], answer: "MEBBE", why: "MEBBE has its own test and is tried only when the parts above it failed." },
      ],
    },
    {
      id: "wtf",
      title: "WTF? for many cases",
      summary: "Matching IT against values with OMG, OMGWTF and GTFO.",
      sections: [
        {
          p: "<code>WTF?</code> compares <code>IT</code> with each <code>OMG</code> value in turn. Running starts at the first match and <b>keeps going</b> into the cases below until it meets <code>GTFO</code>. <code>OMGWTF</code> is the case for anything not listed.",
          code: `HAI 1.2
I HAS A colour ITZ "GREEN"
colour
WTF?
  OMG "RED"
    VISIBLE "STOP"
    GTFO
  OMG "GREEN"
    VISIBLE "GO"
    GTFO
  OMGWTF
    VISIBLE "WAIT"
OIC
KTHXBYE`,
          out: "GO",
        },
        {
          h: "Falling through",
          p: "Leave out <code>GTFO</code> and running carries on into the next case. That is handy when several values should share some steps.",
          code: `HAI 1.2
3
WTF?
  OMG 3
    VISIBLE "THREE"
  OMG 2
    VISIBLE "TWO"
  OMG 1
    VISIBLE "ONE"
    GTFO
  OMG 0
    VISIBLE "ZERO"
OIC
KTHXBYE`,
          out: "THREE\nTWO\nONE",
        },
        {
          h: "Cases are values",
          p: "Each <code>OMG</code> must be a plain value written out, such as a number or a string, not a sum or a variable. For ranges, use <code>O RLY?</code> with <code>MEBBE</code> instead.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `HAI 1.2
"B"
WTF?
  OMG "A"
    VISIBLE "APPLE"
    GTFO
  OMG "B"
    VISIBLE "BANANA"
    GTFO
  OMGWTF
    VISIBLE "HUH"
OIC
KTHXBYE`, options: ["BANANA", "BANANA\nHUH", "HUH", "APPLE"], answer: "BANANA", why: "IT matches the second case, and GTFO stops before OMGWTF." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
1
WTF?
  OMG 1
    VISIBLE "A"
  OMG 2
    VISIBLE "B"
OIC
KTHXBYE`, options: ["A\nB", "A", "B", "Nothing"], answer: "A\nB", why: "There is no GTFO, so running falls through from case 1 into case 2." },
        { q: "What does GTFO do inside WTF?", options: ["Leaves the WTF? block", "Ends the program", "Goes to OMGWTF", "Restarts the block"], answer: "Leaves the WTF? block", why: "GTFO breaks out of the case block, like break in other languages." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
7
WTF?
  OMG 1
    VISIBLE "ONE"
    GTFO
  OMGWTF
    VISIBLE "SOMETHING ELSE"
OIC
KTHXBYE`, options: ["SOMETHING ELSE", "ONE", "ONE\nSOMETHING ELSE", "7"], answer: "SOMETHING ELSE", why: "7 matches no OMG, so the OMGWTF case runs." },
        { q: "Which can be written after OMG?", options: ["\"YES\"", "SUM OF 1 AN 2", "x", "BOTH SAEM x AN 1"], answer: "\"YES\"", why: "Cases must be plain values, not expressions or variables." },
      ],
    },
    {
      id: "loops",
      title: "Loops",
      summary: "IM IN YR, UPPIN and NERFIN, TIL and WILE, and GTFO.",
      sections: [
        {
          p: "<code>IM IN YR name</code> starts a loop and <code>IM OUTTA YR name</code> ends it. <code>UPPIN YR var</code> adds 1 to a counter after each round, and <code>TIL</code> says when to stop. The counter always starts at 0 and belongs to the loop: it is gone once the loop ends, so give it a name of its own.",
          code: `HAI 1.2
IM IN YR hop UPPIN YR i TIL BOTH SAEM i AN 3
  VISIBLE "HOP " i
IM OUTTA YR hop
KTHXBYE`,
          out: "HOP 0\nHOP 1\nHOP 2",
        },
        {
          h: "Counting down and WILE",
          p: "<code>NERFIN</code> takes 1 away, so the counter goes 0, −1, −2 and so on. <code>WILE</code> is the opposite of <code>TIL</code>: keep going while the test is <code>WIN</code>. The test is checked before every round, so a loop can run zero times.",
          code: `HAI 1.2
IM IN YR count NERFIN YR i WILE DIFFRINT i AN -3
  VISIBLE SUM OF 3 AN i "..."
IM OUTTA YR count
VISIBLE "LIFTOFF"
KTHXBYE`,
          out: "3...\n2...\n1...\nLIFTOFF",
        },
        {
          h: "Adding up",
          p: "A variable made before the loop can collect a total. This adds 1 + 2 + 3 + 4 + 5.",
          code: `HAI 1.2
I HAS A total ITZ 0
IM IN YR add UPPIN YR k TIL BOTH SAEM k AN 6
  total R SUM OF total AN k
IM OUTTA YR add
VISIBLE total
KTHXBYE`,
          out: "15",
        },
        {
          h: "GTFO and loops with no test",
          p: "A loop with no <code>UPPIN</code> and no <code>TIL</code> runs until a <code>GTFO</code> inside it. Here the program doubles a number until it passes 100.",
          code: `HAI 1.2
I HAS A x ITZ 1
IM IN YR grow
  x R PRODUKT OF x AN 2
  BOTH SAEM x AN BIGGR OF x AN 100
  O RLY?
    YA RLY
      GTFO
  OIC
IM OUTTA YR grow
VISIBLE x
KTHXBYE`,
          out: "128",
        },
        {
          h: "Loops in loops",
          p: "Give each loop its own name and counter. The inner loop runs all the way through on every round of the outer one.",
          code: `HAI 1.2
IM IN YR row UPPIN YR r TIL BOTH SAEM r AN 3
  IM IN YR col UPPIN YR c TIL BOTH SAEM c AN 4
    VISIBLE "*"!
  IM OUTTA YR col
  VISIBLE ""
IM OUTTA YR row
KTHXBYE`,
          out: "****\n****\n****",
        },
      ],
      practice: [
        { q: "How many times does VISIBLE run in IM IN YR l UPPIN YR i TIL BOTH SAEM i AN 3?", options: ["3", "4", "2", "Forever"], answer: "3", why: "i starts at 0 and the loop stops when it reaches 3: rounds 0, 1 and 2." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
IM IN YR l UPPIN YR i TIL BOTH SAEM i AN 4
  VISIBLE i!
IM OUTTA YR l
KTHXBYE`, options: ["0123", "1234", "01234", "0\n1\n2\n3"], answer: "0123", why: "The counter starts at 0 and stops before printing 4; the ! keeps it on one line." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
IM IN YR l NERFIN YR n WILE DIFFRINT n AN -2
  VISIBLE n
IM OUTTA YR l
KTHXBYE`, options: ["0\n-1", "0\n-1\n-2", "-1\n-2", "2\n1"], answer: "0\n-1", why: "n starts at 0 and counts down; the loop stops as soon as n is −2, before printing it." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
I HAS A t ITZ 0
IM IN YR l UPPIN YR k TIL BOTH SAEM k AN 4
  t R SUM OF t AN 2
IM OUTTA YR l
VISIBLE t
KTHXBYE`, options: ["8", "6", "10", "4"], answer: "8", why: "The body runs four times (k = 0 to 3), adding 2 each time." },
        { q: "What stops a loop that has no TIL or WILE?", options: ["GTFO", "OIC", "KTHXBYE inside it", "Nothing can"], answer: "GTFO", why: "GTFO inside a loop breaks out of it." },
        { q: "What is the difference between TIL and WILE?", options: ["TIL stops when the test is WIN; WILE stops when it is FAIL", "They are the same", "WILE only counts down", "TIL runs at least once"], answer: "TIL stops when the test is WIN; WILE stops when it is FAIL", why: "TIL means “until” and WILE means “while”." },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      summary: "HOW IZ I, FOUND YR, several parameters and recursion.",
      sections: [
        {
          p: "<code>HOW IZ I name YR param</code> defines a function, <code>FOUND YR value</code> hands back a result, and <code>IF U SAY SO</code> ends it. Call it with <code>I IZ name YR value MKAY</code>.",
          code: `HAI 1.2
HOW IZ I dubbl YR n
  FOUND YR PRODUKT OF n AN 2
IF U SAY SO
VISIBLE I IZ dubbl YR 21 MKAY
KTHXBYE`,
          out: "42",
        },
        {
          h: "Several parameters",
          p: "Join extra parameters with <code>AN YR</code>, both when defining and when calling.",
          code: `HAI 1.2
HOW IZ I area YR w AN YR h
  FOUND YR PRODUKT OF w AN h
IF U SAY SO
VISIBLE I IZ area YR 3 AN YR 4 MKAY
KTHXBYE`,
          out: "12",
        },
        {
          h: "Functions keep to themselves",
          p: "Inside a function you can only see its parameters, the variables it makes, and its own <code>IT</code>. Variables from the main program are out of reach, so pass in anything it needs. A function does not have to hand anything back: this one just prints. <code>GTFO</code> leaves a function early with no value (<code>NOOB</code>).",
          code: `HAI 1.2
HOW IZ I greet YR who
  VISIBLE "HAI " who
IF U SAY SO
I IZ greet YR "BUCKY" MKAY
I IZ greet YR "ROCKY" MKAY
KTHXBYE`,
          out: "HAI BUCKY\nHAI ROCKY",
        },
        {
          h: "Deciding inside a function",
          p: "<code>FOUND YR</code> can sit inside an <code>O RLY?</code>. It leaves the function straight away.",
          code: `HAI 1.2
HOW IZ I sign YR n
  BOTH SAEM n AN 0
  O RLY?
    YA RLY
      FOUND YR "ZERO"
  OIC
  BOTH SAEM n AN BIGGR OF n AN 0
  O RLY?
    YA RLY
      FOUND YR "PLUS"
  OIC
  FOUND YR "MINUS"
IF U SAY SO
VISIBLE I IZ sign YR 5 MKAY
VISIBLE I IZ sign YR -2 MKAY
VISIBLE I IZ sign YR 0 MKAY
KTHXBYE`,
          out: "PLUS\nMINUS\nZERO",
        },
        {
          h: "Recursion",
          p: "A function may call itself, as long as some case stops it. The factorial of n is n × (n − 1) × … × 1.",
          code: `HAI 1.2
HOW IZ I fact YR n
  BOTH SAEM n AN SMALLR OF n AN 1
  O RLY?
    YA RLY
      FOUND YR 1
  OIC
  FOUND YR PRODUKT OF n AN I IZ fact YR DIFF OF n AN 1 MKAY
IF U SAY SO
VISIBLE I IZ fact YR 5 MKAY
KTHXBYE`,
          out: "120",
        },
      ],
      practice: [
        { q: "How does a LOLCODE function return a value?", options: ["FOUND YR value", "RETURN value", "GTFO value", "VISIBLE value"], answer: "FOUND YR value", why: "GTFO leaves without a value; FOUND YR hands one back." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
HOW IZ I plus1 YR n
  FOUND YR SUM OF n AN 1
IF U SAY SO
VISIBLE I IZ plus1 YR I IZ plus1 YR 1 MKAY MKAY
KTHXBYE`, options: ["3", "2", "1", "11"], answer: "3", why: "The inner call gives 2, and the outer call adds one more." },
        { q: "Which line ends a function definition?", options: ["IF U SAY SO", "OIC", "KTHXBYE", "MKAY"], answer: "IF U SAY SO", why: "HOW IZ I opens the function and IF U SAY SO closes it." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
HOW IZ I smaller YR a AN YR b
  FOUND YR SMALLR OF a AN b
IF U SAY SO
VISIBLE I IZ smaller YR 8 AN YR 3 MKAY
KTHXBYE`, options: ["3", "8", "11", "5"], answer: "3", why: "The function hands back the smaller of its two parameters." },
        { q: "Can a function read a variable made in the main program?", options: ["No, pass it in as a parameter", "Yes, always", "Only with IT", "Only if it is a YARN"], answer: "No, pass it in as a parameter", why: "A function has its own scope: its parameters, its own variables and its own IT." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
HOW IZ I sum YR n
  BOTH SAEM n AN 0
  O RLY?
    YA RLY
      FOUND YR 0
  OIC
  FOUND YR SUM OF n AN I IZ sum YR DIFF OF n AN 1 MKAY
IF U SAY SO
VISIBLE I IZ sum YR 4 MKAY
KTHXBYE`, options: ["10", "4", "24", "0"], answer: "10", why: "4 + 3 + 2 + 1 + 0, stopping when n reaches 0." },
      ],
    },
    {
      id: "fizzbuzz",
      title: "Putting it together: FizzBuzz",
      summary: "Loops, MOD, decisions and SMOOSH in one program.",
      sections: [
        {
          p: "FizzBuzz counts from 1, but says <b>FIZZ</b> for multiples of 3, <b>BUZZ</b> for multiples of 5 and <b>FIZZBUZZ</b> for both. The loop counter starts at 0, so <code>k</code> holds the number to say, one more than the counter. <code>MOD OF k AN 3</code> is 0 exactly when k divides by 3. Testing for 15 first stops the single words from winning.",
          code: `HAI 1.2
I HAS A k
IM IN YR count UPPIN YR n TIL BOTH SAEM n AN 15
  k R SUM OF n AN 1
  BOTH SAEM MOD OF k AN 15 AN 0
  O RLY?
    YA RLY
      VISIBLE "FIZZBUZZ"
    MEBBE BOTH SAEM MOD OF k AN 3 AN 0
      VISIBLE "FIZZ"
    MEBBE BOTH SAEM MOD OF k AN 5 AN 0
      VISIBLE "BUZZ"
    NO WAI
      VISIBLE k
  OIC
IM OUTTA YR count
KTHXBYE`,
          out: "1\n2\nFIZZ\n4\nBUZZ\nFIZZ\n7\n8\nFIZZ\nBUZZ\n11\nFIZZ\n13\n14\nFIZZBUZZ",
        },
        {
          h: "Building text in a loop",
          p: "<code>SMOOSH</code> can grow a <code>YARN</code> one piece at a time. This builds a times-table row and prints it once at the end.",
          code: `HAI 1.2
I HAS A row ITZ ""
IM IN YR t UPPIN YR i TIL BOTH SAEM i AN 5
  row R SMOOSH row AN PRODUKT OF 3 AN SUM OF i AN 1 AN " " MKAY
IM OUTTA YR t
VISIBLE "3 TIMEZ = " row
KTHXBYE`,
          out: "3 TIMEZ = 3 6 9 12 15 ",
        },
        {
          h: "Where to go next",
          p: "You have met nearly all of LOLCODE 1.2. Try changing these programs in <code>lci</code>: FizzBuzz up to 100, a function that says whether a number is prime, or a countdown that reads its start with <code>GIMMEH</code>, which reads a line the user types into a variable as a <code>YARN</code>.",
        },
      ],
      practice: [
        { q: "Why test for 15 before 3 and 5?", options: ["Otherwise 15 would match 3 first and print only FIZZ", "MOD OF needs the biggest number first", "MEBBE only works once", "15 is the last number"], answer: "Otherwise 15 would match 3 first and print only FIZZ", why: "Only the first matching part of an O RLY? runs." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
VISIBLE MOD OF 12 AN 3
KTHXBYE`, options: ["0", "4", "3", "1"], answer: "0", why: "12 divides by 3 exactly, so there is no remainder." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
I HAS A s ITZ ""
IM IN YR l UPPIN YR i TIL BOTH SAEM i AN 3
  s R SMOOSH s AN i MKAY
IM OUTTA YR l
VISIBLE s
KTHXBYE`, options: ["012", "0 1 2", "3", "123"], answer: "012", why: "Each round adds the counter to the end of s: 0, then 1, then 2." },
        { kind: "output", q: "What does this print?", code: `HAI 1.2
IM IN YR l UPPIN YR n TIL BOTH SAEM n AN 6
  BOTH SAEM MOD OF n AN 2 AN 0
  O RLY?
    YA RLY
      VISIBLE n!
  OIC
IM OUTTA YR l
KTHXBYE`, options: ["024", "135", "0246", "246"], answer: "024", why: "n runs from 0 to 5, and only the even ones print." },
        { q: "What does GIMMEH x do?", options: ["Reads a typed line into x", "Prints x", "Makes x a NUMBR", "Deletes x"], answer: "Reads a typed line into x", why: "GIMMEH is LOLCODE's input; the value is always a YARN." },
      ],
    },
  ],
};
