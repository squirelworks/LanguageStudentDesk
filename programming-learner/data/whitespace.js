// Whitespace course for the Programming Learner. Written for this project.
// Code is shown with S, T and L standing for space, tab and line feed; notes
// are in small letters so they hold no capital S, T or L. Schema: see
// data/python.js. Examples with `out` and practice of kind "output" are run
// by tools/check_packs.py with tools/run_whitespace.py.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.whitespace = {
  id: "whitespace",
  name: "Whitespace",
  title: "Programs made of nothing",
  intro:
    "Whitespace (Edwin Brady and Chris Morris, 2003) ignores every visible character. Only space, tab and line feed count, so a Whitespace program can hide inside the blank parts of an ordinary text file. Because you cannot see the code, these lessons write it with <b>S</b> for space, <b>T</b> for tab and <b>L</b> for line feed. Underneath, Whitespace is a small stack machine, much like the ones inside real processors and virtual machines.",
  noStrings: true,
  lessons: [
    {
      id: "stack",
      title: "Commands and the stack",
      summary: "How S, T and L spell instructions.",
      sections: [
        { p: "Each command starts with a short prefix that says which group it belongs to, called the <b>IMP</b> (instruction modification parameter). After the prefix come the command and, for some commands, a number or a label." },
        { code: `S     stack manipulation
TS    arithmetic
TT    heap access
L     flow control
TL    input and output` },
        { h: "Numbers", p: "A number is written in binary: a sign (<code>S</code> for plus, <code>T</code> for minus), then bits with <code>S</code> = 0 and <code>T</code> = 1, then <code>L</code> to finish. So <code>STSTL</code> is +101 in binary, which is 5, and <code>TTTL</code> is −11 in binary, which is −3." },
        { h: "A program that prints 5", p: "Push 5 (IMP <code>S</code>, command <code>S</code>, then the number), print the top of the stack as a number (IMP <code>TL</code>, command <code>ST</code>), and end (IMP <code>L</code>, command <code>LL</code>). The spaces between groups and the notes on the right are only for reading: the course writes notes in small letters so they never contain a capital S, T or L.", code: `S  S  STSTL       push +5
TL ST             print it as a number
L  LL             end the program`, out: "5" },
        { h: "Stack commands", p: "After the <code>S</code> prefix: <code>S n</code> pushes a number · <code>LS</code> duplicates the top · <code>LT</code> swaps the top two · <code>LL</code> throws the top away · <code>TS n</code> copies the nth item down to the top · <code>TL n</code> slides n items off from under the top." },
      ],
      practice: [
        { q: "In this notation, which number is SSTTL?", options: ["+3", "+6", "−3", "+11"], answer: "+3", why: "S is the plus sign, then the bits TT are binary 11, which is 3." },
        { q: "Which IMP starts an input/output command?", options: ["TL", "S", "L", "TT"], answer: "TL", why: "Tab then line feed introduces I/O." },
        { q: "What does L LL do?", options: ["Ends the program", "Prints a new line", "Pushes 0", "Nothing"], answer: "Ends the program", why: "Three line feeds is the flow-control command for end." },
        { q: "What happens to the letters in a Whitespace file?", options: ["They are ignored", "They are pushed on the stack", "They cause an error", "They are printed"], answer: "They are ignored", why: "Only space, tab and line feed are part of the language." },
        { q: "How is −2 written?", options: ["TTSL", "STSL", "TSTL", "TTL"], answer: "TTSL", why: "T for minus, then binary 10 as TS, then L." },
      ],
    },
    {
      id: "printing",
      title: "Printing",
      summary: "Characters, numbers and arithmetic.",
      sections: [
        { p: "<code>TL SS</code> prints the top of the stack as a <b>character</b>, using its code: 72 is H, 105 is i, 10 is a new line. <code>TL ST</code> prints it as a <b>number</b>. Either way the value is popped off the stack.", code: `S  S  STSSTSSSL   push 72, the code for H
TL SS             print it as a character
S  S  STTSTSSTL   push 105, the code for i
TL SS
L  LL             end`, out: "Hi" },
        { h: "Arithmetic", p: "After the <code>TS</code> prefix: <code>SS</code> add, <code>ST</code> subtract, <code>SL</code> multiply, <code>TS</code> divide (whole numbers), <code>TT</code> remainder. Each pops the top two values and pushes the answer.", code: `S  S  STTSL       push 6
S  S  STTTL       push 7
TS SL             multiply: 42
TL ST             print 42
L  LL`, out: "42" },
        { h: "Order matters", p: "For subtract, divide and remainder, the value pushed <b>first</b> is on the left. Push 10, push 3, subtract: 10 − 3.", code: `S  S  STSTSL      push 10
S  S  STTL        push 3
TS ST             10 minus 3
TL ST
L  LL`, out: "7" },
        { h: "Division and remainder", p: "Divide and remainder work on whole numbers. A space (32) between the two results keeps them apart.", code: `S  S  STSSSTL     push 17
S  S  STSTL       push 5
TS TS             17 divided by 5 is 3
TL ST
S  S  STSSSSSL    a space
TL SS
S  S  STSSSTL
S  S  STSTL
TS TT             the remainder is 2
TL ST
L  LL`, out: "3 2" },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `S  S  STTL
S  S  STSSL
TS SS
TL ST
L  LL`, options: ["7", "34", "12", "1"], answer: "7", why: "3 + 4 = 7, printed as a number." },
        { kind: "output", q: "What does this print?", code: `S  S  STSSSSSTL
TL SS
S  S  STSSSSTSL
TL SS
L  LL`, options: ["AB", "6566", "A", "BA"], answer: "AB", why: "65 and 66 are the codes for A and B, printed as characters in order." },
        { kind: "output", q: "What does this print?", code: `S  S  STSTSSL
S  S  STTSL
TS TT
TL ST
L  LL`, options: ["2", "3", "26", "14"], answer: "2", why: "20 divided by 6 is 3 with 2 left over; TS TT gives the remainder." },
        { q: "Which command prints the top value as a number?", options: ["TL ST", "TL SS", "TS SS", "S LS"], answer: "TL ST", why: "TL is input/output; ST outputs a number, SS outputs a character." },
      ],
    },
    {
      id: "tricks",
      title: "Stack tricks",
      summary: "Duplicate, swap and drop.",
      sections: [
        { p: "Every command takes its values from the top of the stack, so a lot of Whitespace is arranging the stack. <code>S LS</code> duplicates the top value, which is how you use a value twice.", code: `S  S  STSTL       push 5
S  LS             copy the top: 5 5
TS SL             5 times 5
TL ST
L  LL`, out: "25" },
        { h: "Swap", p: "<code>S LT</code> swaps the top two. The values print in the order they come off the top.", code: `S  S  STL         push 1
S  S  STSL        push 2
S  LT             now 2 is under 1
TL ST             prints 1
TL ST             prints 2
L  LL`, out: "12" },
        { h: "Drop", p: "<code>S LL</code> throws away the top value, for when a copy is no longer needed." },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `S  S  STSSSL
S  S  STSL
S  LT
TS ST
TL ST
L  LL`, options: ["-6", "6", "10", "82"], answer: "-6", why: "After the swap 2 is under 8, so subtract works out 2 − 8." },
        { q: "Why duplicate a value before printing it?", options: ["Printing pops it, so a copy is kept for later", "Printing needs two values", "To print it twice as big", "It is required before every print"], answer: "Printing pops it, so a copy is kept for later", why: "Output commands remove the value they print." },
        { q: "Stack holds 1 then 2 on top. What is on top after S LT?", options: ["1", "2", "3", "Nothing"], answer: "1", why: "Swap exchanges the top two values." },
      ],
    },
    {
      id: "heap",
      title: "The heap",
      summary: "Storing values at numbered addresses.",
      sections: [
        { p: "Besides the stack there is a <b>heap</b>: numbered boxes that keep their values. <code>TT S</code> stores: push an address, push a value, then store. <code>TT T</code> retrieves: push an address, then retrieve, and the value is pushed.", code: `S  S  SL          address 0
S  S  STSTSTSL    value 42
TT S              heap at 0 is 42
S  S  SL          address 0
TT T              fetch it back
TL ST
L  LL`, out: "42" },
        { h: "When to use it", p: "The stack is good for working out one sum. The heap is good for anything you need again later: a counter, a running total, or the letters of a word." },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `S  S  STL
S  S  STSSTL
TT S
S  S  STL
TT T
S  LS
TS SS
TL ST
L  LL`, options: ["18", "9", "1", "10"], answer: "18", why: "9 is stored at address 1, fetched back, duplicated and added to itself." },
        { q: "What do you push before TT S?", options: ["An address, then a value", "A value, then an address", "Just a value", "Nothing"], answer: "An address, then a value", why: "Store pops the value from the top and the address from under it." },
        { q: "What does retrieving an address that was never stored give?", options: ["0", "An error", "The address itself", "A random number"], answer: "0", why: "Unused heap boxes read as 0." },
      ],
    },
    {
      id: "loops",
      title: "Labels and loops",
      summary: "Marking places, jumping and testing for zero.",
      sections: [
        { p: "A <b>label</b> is a run of <code>S</code> and <code>T</code> ended by <code>L</code>, such as <code>SL</code> or <code>TL</code>. <code>L SS label</code> marks a place; <code>L SL label</code> jumps there; <code>L TS label</code> pops a value and jumps only if it is 0. This loop prints 1 to 5 by counting up and stopping when the counter minus 6 is zero.", code: `S  S  STL         start at 1
L  SS SL          mark the loop label
S  LS             keep a copy to print
TL ST
S  S  STL
TS SS             add one
S  LS
S  S  STTSL
TS ST             counter minus 6
L  TS TL          if zero, jump to the end label
L  SL SL          otherwise back to the loop label
L  SS TL          mark the end label
S  LL             tidy the stack
L  LL`, out: "12345" },
        { h: "Reading the loop", p: "The counter stays on the stack the whole time. Each round duplicates it to print, adds one, then duplicates again to test, because the test pops what it looks at. At the end one copy is left, and <code>S LL</code> drops it." },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `S  S  STTL
L  SS SL
S  LS
TL ST
S  S  STL
TS ST
S  LS
L  TS TL
L  SL SL
L  SS TL
L  LL`, options: ["321", "3210", "123", "3"], answer: "321", why: "The counter starts at 3 and goes down; the loop ends when it reaches 0, before printing it." },
        { q: "What does L TS label do?", options: ["Pops a value and jumps if it is zero", "Jumps always", "Marks a label", "Pops a value and jumps if it is negative"], answer: "Pops a value and jumps if it is zero", why: "TS after the L prefix is jump-if-zero; TT is jump-if-negative." },
        { q: "Why does the loop duplicate the counter before testing it?", options: ["The test pops the value it checks", "Tests need two values", "To count twice as fast", "Labels need it"], answer: "The test pops the value it checks", why: "Without the copy, the counter would be gone after the first test." },
      ],
    },
    {
      id: "decisions",
      title: "Decisions and subroutines",
      summary: "Jump if negative, call and return.",
      sections: [
        { p: "<code>L TT label</code> pops a value and jumps if it is negative. This prints the absolute value of −7: negative numbers jump to a part that multiplies by −1.", code: `S  S  TTTTL       push minus 7
S  LS
L  TT SL          negative? jump to the flip label
TL ST
L  LL
L  SS SL          mark the flip label
S  S  TTL
TS SL             flip the sign
TL ST
L  LL`, out: "7" },
        { h: "Subroutines", p: "<code>L ST label</code> calls a subroutine and <code>L TL</code> returns to just after the call. The stack is shared, so values go in and come out on it. This routine squares the top value.", code: `S  S  STTL        push 3
L  ST SL          call the square routine
TL ST             prints 9
S  S  STSSSSSL
TL SS             a space
S  S  STSSL
L  ST SL
TL ST             prints 16
L  LL
L  SS SL          mark the square routine
S  LS
TS SL
L  TL             go back`, out: "9 16" },
        { h: "Where to go next", p: "A real Whitespace file is these same commands written with actual spaces, tabs and line feeds; you can turn this course's notation into one by replacing each S, T and L. Try a program that prints the 5 times table, or one that stores a word on the heap and prints it backwards." },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `S  S  SL
L  TS SL
S  S  STSSTTTSL
TL SS
L  LL
L  SS SL
S  S  STSTTSSTL
TL SS
L  LL`, options: ["Y", "N", "YN", "89"], answer: "Y", why: "0 is on top, so the jump-if-zero is taken and 89, Y, is printed." },
        { kind: "output", q: "What does this print?", code: `S  S  STSL
L  ST SL
L  ST SL
TL ST
L  LL
L  SS SL
S  S  STSTSL
TS SL
L  TL`, options: ["200", "20", "2", "1000"], answer: "200", why: "Each call multiplies the top value by 10: 2, then 20, then 200." },
        { q: "Where does L TL return to?", options: ["The command after the last call", "The start of the program", "The last label", "Label S"], answer: "The command after the last call", why: "Calls remember where they came from, like CALL and RET in assembly." },
        { q: "Which command jumps only if the value is negative?", options: ["L TT", "L TS", "L SL", "L ST"], answer: "L TT", why: "TT is jump-if-negative; TS is jump-if-zero; SL always jumps; ST calls." },
      ],
    },
  ],
};
