// Whitespace course for the Programming Learner. Written for this project.
// Code is shown with S, T and L standing for space, tab and line feed.
// Schema: see data/python.js.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.whitespace = {
  id: "whitespace",
  name: "Whitespace",
  title: "Programs made of nothing",
  intro:
    "Whitespace (Edwin Brady and Chris Morris, 2003) ignores every visible character. Only space, tab and line feed count, so a Whitespace program can hide inside the blank parts of an ordinary text file. Because you cannot see the code, these lessons write it with <b>S</b> for space, <b>T</b> for tab and <b>L</b> for line feed.",
  lessons: [
    {
      id: "stack",
      title: "Commands and the stack",
      summary: "How S, T and L spell instructions.",
      sections: [
        {
          p: "Each command starts with a short prefix that says which group it belongs to, called the <b>IMP</b> (instruction modification parameter):",
        },
        {
          code: `S     stack manipulation
TS    arithmetic
TT    heap access
L     flow control
TL    input and output`,
        },
        {
          h: "Numbers",
          p: "A number is written in binary: a sign (<code>S</code> for plus, <code>T</code> for minus), then bits with <code>S</code> = 0 and <code>T</code> = 1, then <code>L</code> to finish. So <code>STSTL</code> is +101 in binary, which is 5.",
        },
        {
          h: "A program that prints 5",
          p: "Push 5 (<code>SS</code> means stack: push), print the top of the stack as a number (<code>TL</code> I/O, then <code>ST</code> output number), and end (<code>LLL</code>). Spaces between groups below are only for reading.",
          code: `SS STSTL    push +5
TL ST       print it as a number
LLL         end the program`,
        },
        {
          h: "Stack commands",
          p: "<code>SS n</code> push a number · <code>SLS</code> duplicate the top · <code>SLT</code> swap the top two · <code>SLL</code> throw the top away. Arithmetic (<code>TS</code>) then <code>SS</code> add, <code>ST</code> subtract, <code>SL</code> multiply, <code>TS</code> divide, <code>TT</code> modulo works on the top two values.",
        },
      ],
      practice: [
        { q: "In this notation, which number is SSTTL?", options: ["+3", "+6", "−3", "+11"], answer: "+3", why: "S is the plus sign, then the bits TT are binary 11, which is 3." },
        { q: "Which IMP starts an input/output command?", options: ["TL", "S", "L", "TT"], answer: "TL", why: "Tab then line feed introduces I/O." },
        { q: "What does LLL do?", options: ["Ends the program", "Prints a new line", "Pushes 0", "Nothing"], answer: "Ends the program", why: "Three line feeds is the flow-control command for end." },
        { q: "What happens to the letters in a Whitespace file?", options: ["They are ignored", "They are pushed on the stack", "They cause an error", "They are printed"], answer: "They are ignored", why: "Only space, tab and line feed are part of the language." },
      ],
    },
  ],
};
