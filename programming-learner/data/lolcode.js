// LOLCODE course for the Programming Learner. Written for this project.
// Schema: see data/python.js.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.lolcode = {
  id: "lolcode",
  name: "LOLCODE",
  title: "LOLCODE 1.2",
  intro:
    "LOLCODE was made in 2007 as a joke about lolcat captions, but it is a complete language with variables, loops, functions and a written specification (version 1.2). Under the silly words it works much like a small scripting language, which makes it a fun way to practise ideas you already know. The lci interpreter runs it on any computer.",
  comment: "BTW",
  keywords: [
    "HAI", "KTHXBYE", "CAN", "HAS", "I", "A", "ITZ", "R", "VISIBLE", "GIMMEH", "O", "RLY?", "RLY", "YA", "NO", "WAI", "MEBBE",
    "OIC", "WTF?", "OMG", "OMGWTF", "GTFO", "IM", "IN", "YR", "OUTTA", "UPPIN", "NERFIN", "TIL", "WILE", "HOW", "IZ", "IF",
    "U", "SAY", "SO", "FOUND", "AN", "MKAY", "NOT", "BOTH", "SAEM", "DIFFRINT", "EITHER", "OF", "WON", "SUM", "DIFF",
    "PRODUKT", "QUOSHUNT", "MOD", "BIGGR", "SMALLR", "SMOOSH", "MAEK", "IS", "NOW", "WIN", "FAIL", "NOOB", "YARN", "NUMBR", "NUMBAR", "TROOF",
  ],
  lessons: [
    {
      id: "basics",
      title: "HAI, VISIBLE and variables",
      summary: "Program bounds, output, variables and maths.",
      sections: [
        {
          p: "Every program starts with <code>HAI 1.2</code> and ends with <code>KTHXBYE</code>. <code>VISIBLE</code> prints. <code>BTW</code> starts a comment.",
          code: `HAI 1.2
BTW this is a comment
VISIBLE "OH HAI"
KTHXBYE`,
          out: "OH HAI",
        },
        {
          h: "Variables",
          p: "<code>I HAS A name ITZ value</code> makes a variable; <code>name R value</code> changes it. Types are <code>NUMBR</code> (whole number), <code>NUMBAR</code> (decimal), <code>YARN</code> (text), <code>TROOF</code> (<code>WIN</code> or <code>FAIL</code>) and <code>NOOB</code> (nothing yet).",
          code: `HAI 1.2
I HAS A nuts ITZ 3
nuts R SUM OF nuts AN 4
VISIBLE "I HAS " nuts " NUTZ"
KTHXBYE`,
          out: "I HAS 7 NUTZ",
        },
        {
          h: "Maths is written first",
          p: "Operators come before their two values, joined by <code>AN</code>: <code>SUM OF</code>, <code>DIFF OF</code>, <code>PRODUKT OF</code>, <code>QUOSHUNT OF</code>, <code>MOD OF</code>, <code>BIGGR OF</code>, <code>SMALLR OF</code>. They nest.",
          code: `VISIBLE PRODUKT OF SUM OF 2 AN 3 AN 4`,
          out: "20",
        },
      ],
      practice: [
        { q: "Which line prints KITTEH?", options: ["VISIBLE \"KITTEH\"", "PRINT \"KITTEH\"", "GIMMEH \"KITTEH\"", "SAY \"KITTEH\""], answer: "VISIBLE \"KITTEH\"", why: "VISIBLE is LOLCODE's print." },
        { q: "What is DIFF OF 10 AN 4?", options: ["6", "14", "40", "2"], answer: "6", why: "DIFF OF subtracts the second value from the first." },
        { q: "How do you set an existing variable x to 5?", options: ["x R 5", "I HAS A x ITZ 5 again", "x ITZ 5", "x = 5"], answer: "x R 5", why: "R assigns to a variable that already exists; I HAS A declares a new one." },
        { q: "What does BIGGR OF 3 AN 8 give?", options: ["8", "3", "11", "WIN"], answer: "8", why: "BIGGR OF returns the larger of the two." },
      ],
    },
    {
      id: "flow",
      title: "O RLY? and loops",
      summary: "Conditions, comparisons and IM IN YR loops.",
      sections: [
        {
          p: "Compare with <code>BOTH SAEM</code> (equal) or <code>DIFFRINT</code> (not equal). The result goes into a special variable called <code>IT</code>, and <code>O RLY?</code> branches on it: <code>YA RLY</code> for yes, <code>NO WAI</code> for no, and <code>OIC</code> closes the block.",
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
          h: "Loops",
          p: "<code>IM IN YR name</code> starts a loop and <code>IM OUTTA YR name</code> ends it. <code>UPPIN YR var</code> adds 1 to a counter each round, and <code>TIL</code> or <code>WILE</code> says when to stop.",
          code: `HAI 1.2
IM IN YR hop UPPIN YR i TIL BOTH SAEM i AN 3
  VISIBLE "HOP " i
IM OUTTA YR hop
KTHXBYE`,
          out: "HOP 0\nHOP 1\nHOP 2",
        },
        {
          h: "Functions",
          p: "<code>HOW IZ I name YR param</code> defines a function, <code>FOUND YR value</code> returns, and <code>IF U SAY SO</code> ends it. Call it with <code>I IZ name YR value MKAY</code>.",
          code: `HAI 1.2
HOW IZ I dubbl YR n
  FOUND YR PRODUKT OF n AN 2
IF U SAY SO
VISIBLE I IZ dubbl YR 21 MKAY
KTHXBYE`,
          out: "42",
        },
      ],
      practice: [
        { q: "What closes an O RLY? block?", options: ["OIC", "KTHXBYE", "NO WAI", "GTFO"], answer: "OIC", why: "OIC (“oh, I see”) ends the conditional." },
        { q: "How many times does VISIBLE run in IM IN YR l UPPIN YR i TIL BOTH SAEM i AN 3?", options: ["3", "4", "2", "Forever"], answer: "3", why: "i starts at 0 and the loop stops when it reaches 3: rounds 0, 1 and 2." },
        { q: "Where does the result of BOTH SAEM go when it stands alone on a line?", options: ["Into IT", "Into WIN", "It is printed", "Nowhere"], answer: "Into IT", why: "A bare expression is stored in the special variable IT, which O RLY? tests." },
        { q: "How does a LOLCODE function return a value?", options: ["FOUND YR value", "RETURN value", "GTFO value", "VISIBLE value"], answer: "FOUND YR value", why: "GTFO leaves without a value; FOUND YR hands one back." },
      ],
    },
  ],
};
