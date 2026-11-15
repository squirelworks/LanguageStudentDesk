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
        { q: "Which IMP starts stack manipulation?", options: ["S", "TS", "TT", "TL"], answer: "S", why: "A single space is the stack IMP; TS is arithmetic, TT is heap, TL is I/O." },
        { q: "Which number is STSSSL?", options: ["+8", "+4", "+16", "−8"], answer: "+8", why: "S for plus, then bits TSSS are binary 1000, which is 8." },
        { kind: "output", q: "What does this print?", code: `S  S  STSSL
TL ST
L  LL`, options: ["4", "2", "8", "1"], answer: "4", why: "STSSL is +100 in binary, which is 4, printed as a number." },
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
        { kind: "output", q: "What does this print?", code: `S  S  STTL
S  S  STSTL
TS SL
TL ST
L  LL`, options: ["15", "8", "35", "2"], answer: "15", why: "3 × 5 = 15; TS SL multiplies the top two values." },
        { kind: "output", q: "What does this print?", code: `S  S  STSTSSL
S  S  STSSL
TS TS
TL ST
L  LL`, options: ["5", "4", "20", "0"], answer: "5", why: "20 divided by 4 is 5; TS TS is whole-number divide." },
        { kind: "output", q: "What does this print?", code: `S  S  STSSSSTL
TL SS
L  LL`, options: ["!", "A", "33", " "], answer: "!", why: "STSSSSTL is 33, the character code for an exclamation mark." },
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
        { kind: "output", q: "What does this print?", code: `S  S  STTSL
S  LS
TS SS
TL ST
L  LL`, options: ["12", "6", "36", "0"], answer: "12", why: "Duplicate 6, then add: 6 + 6 = 12." },
        { kind: "output", q: "What does this print?", code: `S  S  STSTL
S  S  STSL
S  LT
TL ST
TL ST
L  LL`, options: ["52", "25", "7", "10"], answer: "52", why: "After the swap, 5 is on top and prints first, then 2." },
        { kind: "output", q: "What does this print?", code: `S  S  STSTL
S  S  STSL
S  LL
TL ST
L  LL`, options: ["5", "2", "7", "52"], answer: "5", why: "S LL drops the top value 2, leaving 5 to print." },
        { q: "What does S LL do?", options: ["Throws away the top of the stack", "Ends the program", "Duplicates the top", "Swaps the top two"], answer: "Throws away the top of the stack", why: "After the S prefix, LL is drop; LS is duplicate; LT is swap." },
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
        { kind: "output", q: "What does this print?", code: `S  S  SL
S  S  STSSL
TT S
S  S  STL
S  S  STTL
TT S
S  S  SL
TT T
S  S  STL
TT T
TS SS
TL ST
L  LL`, options: ["7", "4", "3", "43"], answer: "7", why: "Heap[0] is 4 and heap[1] is 3; fetching both and adding gives 7." },
        { q: "Which IMP introduces heap commands?", options: ["TT", "TS", "TL", "S"], answer: "TT", why: "Two tabs mean heap access; TT S stores and TT T retrieves." },
        { q: "After TT T, where is the fetched value?", options: ["On top of the stack", "Still only in the heap", "Printed", "In a register"], answer: "On top of the stack", why: "Retrieve pushes the heap value onto the stack so you can print or compute with it." },
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
        { kind: "output", q: "What does this print?", code: `S  S  STSL
L  SS SL
S  LS
TL ST
S  S  STL
TS ST
S  LS
L  TS TL
L  SL SL
L  SS TL
L  LL`, options: ["21", "210", "12", "2"], answer: "21", why: "Countdown from 2: print 2, then 1, then stop when the counter hits 0." },
        { kind: "output", q: "What does this print?", code: `S  S  STL
L  SS SL
S  LS
TL ST
S  S  STL
TS SS
S  LS
S  S  STSSL
TS ST
L  TS TL
L  SL SL
L  SS TL
S  LL
L  LL`, options: ["123", "1234", "12", "321"], answer: "123", why: "Count up from 1, stop when the counter minus 4 is zero, then drop the leftover 4." },
        { q: "What does L SS label do?", options: ["Marks a place in the program", "Jumps to that label", "Calls a subroutine", "Ends the program"], answer: "Marks a place in the program", why: "L SS sets a label; L SL jumps to it, L ST calls it." },
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
        { kind: "output", q: "What does this print?", code: `S  S  STSTL
L  ST SL
TL ST
L  LL
L  SS SL
S  LS
TS SS
L  TL`, options: ["10", "5", "25", "0"], answer: "10", why: "The subroutine doubles by adding the value to itself: 5 + 5 = 10." },
        { kind: "output", q: "What does this print?", code: `S  S  TTSL
S  LS
L  TT SL
S  S  STSSTTTTL
TL SS
L  LL
L  SS SL
S  S  STSSTTSSL
TL SS
L  LL`, options: ["L", "O", "LO", "−2"], answer: "L", why: "−2 is negative, so the jump is taken and 76 (L) is printed." },
        { kind: "output", q: "What does this print?", code: `S  S  STL
L  TS SL
S  S  STSSTTTTL
TL SS
L  LL
L  SS SL
S  S  STSSTTSSL
TL SS
L  LL`, options: ["O", "L", "OL", "1"], answer: "O", why: "1 is not zero, so the jump is skipped and 79 (O) is printed." },
        { q: "What does L ST label do?", options: ["Calls a subroutine at that label", "Marks the label", "Jumps if zero", "Returns from a call"], answer: "Calls a subroutine at that label", why: "L ST is call; L TL returns; L SS marks; L TS is jump-if-zero." },
      ],
    },
    {
      id: "copy",
      title: "Copy and slide",
      summary: "Reaching deeper stack items without losing the top.",
      sections: [
        {
          p: "<code>S TS n</code> copies the item n places down (0 is the top, 1 is under it) onto the top, without removing the original. Push 5, push 2, copy 1: the stack becomes 5, 2, 5 — useful when a later sum still needs an earlier value.",
          code: `S  S  STSTL       push 5
S  S  STSL        push 2
S  TS STL         copy 1 deep (the 5)
TL ST
TL ST
TL ST
L  LL`,
          out: "525",
        },
        {
          h: "Slide",
          p: "<code>S TL n</code> keeps the top value and throws away the n items under it. Push 1, 2, 3, then slide 1: 2 is dropped and 3 stays on 1. It is the tidy-up after a calculation that left clutter under the answer.",
          code: `S  S  STL         push 1
S  S  STSL        push 2
S  S  STTL        push 3
S  TL STL         slide 1
TL ST
TL ST
L  LL`,
          out: "31",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `S  S  STSSSL
S  S  STSTL
S  S  STTL
S  TS STSL
TL ST
L  LL`, options: ["8", "5", "3", "853"], answer: "8", why: "Copy 2 reaches the bottom 8 and prints it." },
        { kind: "output", q: "What does this print?", code: `S  S  STL
S  S  STSL
S  S  STTL
S  S  STSSL
S  TL STSL
TL ST
TL ST
L  LL`, options: ["41", "14", "43", "21"], answer: "41", why: "Slide 2 keeps 4 on top of 1; printing pops 4 then 1." },
        { q: "In S TS n, what is n = 0?", options: ["A copy of the top item", "The bottom of the stack", "Always zero", "An error"], answer: "A copy of the top item", why: "Depth 0 means the top; copy then acts like duplicate." },
        { q: "What does S TL n keep?", options: ["The top value, after dropping n items under it", "Only the bottom n items", "Nothing", "The label n"], answer: "The top value, after dropping n items under it", why: "Slide pops the top, deletes n below, then pushes the top back." },
      ],
    },
    {
      id: "io",
      title: "Reading input",
      summary: "getc and getn, and what end-of-input means here.",
      sections: [
        {
          p: "<code>TL TT</code> reads a whole number into the heap at the address on the stack; <code>TL TS</code> reads one character's code the same way. The checker has no typed input, so both hit end-of-input: <code>getn</code> stores 0 and <code>getc</code> stores −1. Real Whitespace programs use that as a signal to stop reading.",
          code: `S  S  SL          address 0
TL TT             read a number (end of input → 0)
S  S  SL
TT T
TL ST             prints 0
S  S  STSSSSSL    a space
TL SS
S  S  STSSTTTSL   78, N
TL SS
L  LL`,
          out: "0 N",
        },
        {
          h: "End of characters",
          p: "A character read at end of input is −1, which is handy with jump-if-negative: keep reading until the heap holds −1, then leave the loop.",
          code: `S  S  SL          address 0
TL TS             read a character (end of input → −1)
S  S  SL
TT T
TL ST
L  LL`,
          out: "-1",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `S  S  STL
TL TT
S  S  STL
TT T
TL ST
L  LL`, options: ["0", "-1", "1", ""], answer: "0", why: "getn at end of input stores 0 at the address." },
        { kind: "output", q: "What does this print?", code: `S  S  SL
TL TS
S  S  SL
TT T
S  LS
L  TT SL
S  S  STSSTTTSL
TL SS
L  LL
L  SS SL
S  S  STSSTTSSL
TL SS
L  LL`, options: ["L", "O", "LO", "-1"], answer: "L", why: "getc stored −1, so jump-if-negative prints 76 (L)." },
        { q: "Which command reads a number into the heap?", options: ["TL TT", "TL TS", "TL ST", "TT S"], answer: "TL TT", why: "TL TT is getn; TL TS is getc; TL ST prints a number." },
        { q: "Why do these lessons show 0 and −1 for input?", options: ["The checker has no typed input, so both hit end-of-input", "Whitespace cannot read", "0 and −1 are the only legal values", "The heap starts full"], answer: "The checker has no typed input, so both hit end-of-input", why: "Empty input is the portable way to test the read commands here." },
      ],
    },
    {
      id: "heap2",
      title: "Strings on the heap",
      summary: "Storing character codes in order and printing them back.",
      sections: [
        {
          p: "A word is just character codes in consecutive heap addresses. Store N, U, T, S at 0–3, then loop an index: load, print as a character, add one, stop when the index minus 4 is zero. The same pattern builds any fixed string without keeping every code on the stack at once.",
          code: `S  S  SL
S  S  STSSTTTSL   78, code for n
TT S
S  S  STL
S  S  STSTSTSTL   85, code for u
TT S
S  S  STSL
S  S  STSTSTSSL   84, code for t
TT S
S  S  STTL
S  S  STSTSSTTL   83, code for s
TT S
S  S  SL          index begins at 0
L  SS SL
S  LS
TT T
TL SS
S  S  STL
TS SS             add one to the index
S  LS
S  S  STSSL       four
TS ST
L  TS TL          finish when index minus four is 0
L  SL SL
L  SS TL
S  LL
L  LL`,
          out: "NUTS",
        },
        {
          h: "Running totals",
          p: "Heap cells also hold counters. Load, add, store back — the oak cell starts at 2, gains 3, and prints beside elm's 1.",
          code: `S  S  SL
S  S  STSL
TT S              oak begins at 2
S  S  STL
S  S  STL
TT S              elm begins at 1
S  S  SL
S  S  SL
TT T
S  S  STTL
TS SS
TT S              oak becomes 2 plus 3
S  S  SL
TT T
TL ST
S  S  STSSSSSL
TL SS
S  S  STL
TT T
TL ST
L  LL`,
          out: "5 1",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `S  S  SL
S  S  STSSSSSTL
TT S
S  S  STL
S  S  STSSSSTSL
TT S
S  S  SL
TT T
TL SS
S  S  STL
TT T
TL SS
L  LL`, options: ["AB", "BA", "6566", "A"], answer: "AB", why: "65 and 66 are A and B, stored at 0 and 1 then printed." },
        { kind: "output", q: "What does this print?", code: `S  S  SL
S  S  STSTL
TT S
S  S  SL
TT T
S  S  STSL
TS SS
S  S  SL
S  LT
TT S
S  S  SL
TT T
TL ST
L  LL`, options: ["7", "5", "2", "52"], answer: "7", why: "Heap[0] starts at 5, then 5 + 2 is stored back and printed." },
        { q: "Why store a word on the heap instead of the stack?", options: ["Addresses stay put while the stack is busy with the loop", "The heap prints automatically", "Stack cells cannot hold character codes", "Labels only work with the heap"], answer: "Addresses stay put while the stack is busy with the loop", why: "The index and arithmetic need the stack; the letters wait in the heap." },
      ],
    },
    {
      id: "project",
      title: "Project: reverse a word",
      summary: "Heap storage, a countdown loop and character output.",
      sections: [
        {
          p: "Store A, C, O, R, N at addresses 0–4, then count the index down from 4. Each round loads that cell, prints it as a character, subtracts one, and jump-if-negative stops after address 0 is done — a tiny Whitespace program that uses the heap, arithmetic, labels and output together.",
          code: `S  S  SL
S  S  STSSSSSTL   65, code for a
TT S
S  S  STL
S  S  STSSSSTTL   67, code for c
TT S
S  S  STSL
S  S  STSSTTTTL   79, code for o
TT S
S  S  STTL
S  S  STSTSSTSL   82, code for r
TT S
S  S  STSSL
S  S  STSSTTTSL   78, code for n
TT S
S  S  STSSL       index begins at 4
L  SS SL
S  LS
TT T
TL SS
S  S  STL
TS ST             subtract one from the index
S  LS
L  TT TL          leave when the index is below zero
L  SL SL
L  SS TL
S  LL
L  LL`,
          out: "NROCA",
        },
        {
          h: "Ideas to try",
          p: "Print a space between letters, reverse only part of the word, or write a subroutine that prints one heap address so the main loop only counts.",
        },
      ],
      practice: [
        { q: "Why does the loop start i at 4?", options: ["N sits at address 4, the last letter of ACORN", "Whitespace arrays are one-based", "4 is the code for A", "Jump-if-negative needs 4"], answer: "N sits at address 4, the last letter of ACORN", why: "Counting down from the last index prints the word backwards." },
        { q: "What stops the countdown?", options: ["Jump-if-negative after i goes below 0", "Jump-if-zero on i", "Running off the end", "An end command inside the loop"], answer: "Jump-if-negative after i goes below 0", why: "After printing address 0, i becomes −1 and L TT fires." },
        { kind: "output", q: "What does this print?", code: `S  S  SL
S  S  STSSSSSTL
TT S
S  S  STL
S  S  STSSSSTSL
TT S
S  S  STL
L  SS SL
S  LS
TT T
TL SS
S  S  STL
TS ST
S  LS
L  TT TL
L  SL SL
L  SS TL
S  LL
L  LL`, options: ["BA", "AB", "A", "B"], answer: "BA", why: "Countdown from 1 prints heap[1] then heap[0]: B then A." },
      ],
    },
  ],
};
