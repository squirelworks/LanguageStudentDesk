// INTERCAL course for the Programming Learner. Written for this project.
// Schema: see data/python.js. Answers about mingle, select and the unary
// operators follow the INTERCAL-72 manual's definitions (16-bit values).
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.intercal = {
  id: "intercal",
  name: "INTERCAL",
  title: "INTERCAL, politely",
  intro:
    "INTERCAL was written in 1972 by Don Woods and James Lyon to be unlike every other language. It has no ordinary arithmetic operators, judges your manners, and prints numbers in Roman numerals. It is a joke, but a carefully built one, and reading it shows how much we take for granted in normal languages. C-INTERCAL (the <code>ick</code> compiler) runs it today.",
  comment: "NOTE",
  keywords: ["DO", "PLEASE", "NOT", "N'T", "READ", "OUT", "WRITE", "IN", "GIVE", "UP", "COME", "FROM", "NEXT", "FORGET", "RESUME", "STASH", "RETRIEVE", "IGNORE", "REMEMBER", "ABSTAIN", "REINSTATE", "ONCE", "AGAIN"],
  lessons: [
    {
      id: "statements",
      title: "Statements and manners",
      summary: "DO, PLEASE, variables and Roman numerals.",
      sections: [
        {
          p: "Every statement starts with <code>DO</code>, <code>PLEASE</code> or <code>PLEASE DO</code>. The compiler counts your manners: if fewer than about one statement in five says <code>PLEASE</code> it refuses the program as impolite, and if more than about one in three does, it refuses it as overly polite. The program ends with <code>GIVE UP</code>.",
          code: `DO .1 <- #5
DO .2 <- #3
PLEASE READ OUT .1
DO GIVE UP`,
        },
        {
          h: "Variables and constants",
          p: "Names are a symbol and a number. <code>.1</code> is a 16-bit variable (a “spot”), <code>:1</code> is 32-bit (a “two-spot”), and <code>,1</code> and <code>;1</code> are arrays. Constants start with a mesh: <code>#5</code>. Assignment is <code>&lt;-</code>.",
        },
        {
          h: "Output in Roman numerals",
          p: "<code>READ OUT</code> prints a number as Roman numerals, so the program above prints <code>V</code>. Large numbers use a bar over the letters to mean thousands. <code>WRITE IN</code> reads numbers typed as English digit names, such as <code>ONE FIVE</code> for 15.",
        },
        {
          h: "Operators",
          p: "There is no plus or minus. Instead there are two binary operators, <b>mingle</b> (<code>$</code>, which interleaves the bits of two numbers) and <b>select</b> (<code>~</code>, which picks bits out of one number using another as a mask), plus unary AND, OR and XOR (<code>&amp;</code>, <code>V</code>, <code>?</code>) that work on neighbouring bits of a single number. Arithmetic is done by calling library routines with <code>NEXT</code>.",
        },
        {
          h: "COME FROM",
          p: "Instead of GOTO, INTERCAL has <code>COME FROM (10)</code>: when the line labelled (10) finishes, control jumps <i>to</i> the COME FROM. It began as a parody of GOTO and has since been borrowed seriously for debuggers and aspect-oriented ideas.",
        },
      ],
      practice: [
        { q: "What does READ OUT print for the value 5?", options: ["V", "5", "FIVE", "IIIII"], answer: "V", why: "INTERCAL output uses Roman numerals." },
        { q: "Which is a 32-bit variable?", options: [":1", ".1", ",1", "#1"], answer: ":1", why: "The two-spot (:) marks a 32-bit variable; one spot (.) is 16-bit; # is a constant." },
        { q: "What happens if no statement says PLEASE?", options: ["The compiler rejects the program as impolite", "It runs normally", "Every line is skipped", "It prints a warning only"], answer: "The compiler rejects the program as impolite", why: "Too little politeness, and too much, are both errors." },
        { q: "How is the constant 3 written?", options: ["#3", ".3", "$3", "3"], answer: "#3", why: "Constants start with the mesh symbol #." },
        { q: "What does COME FROM (10) do?", options: ["Jumps to itself after line (10) runs", "Jumps to line (10)", "Comments out line (10)", "Repeats line (10) ten times"], answer: "Jumps to itself after line (10) runs", why: "It is GOTO turned around: the jump is declared at the destination." },
        { q: "How does a program end?", options: ["DO GIVE UP", "DO END", "DO STOP", "DO HALT"], answer: "DO GIVE UP", why: "GIVE UP is the polite way to finish; there is no END or STOP." },
        { q: "What is .1?", options: ["A 16-bit variable (a spot)", "A 32-bit variable", "A constant", "An array"], answer: "A 16-bit variable (a spot)", why: "One spot (.) is 16-bit; two-spot (:) is 32-bit; mesh (#) is a constant." },
        { q: "How do you type the number 15 for WRITE IN?", options: ["ONE FIVE", "15", "XV", "F"], answer: "ONE FIVE", why: "WRITE IN reads English digit names, not digits or Roman numerals." },
        { q: "What happens if too many statements say PLEASE?", options: ["The compiler rejects the program as overly polite", "It runs faster", "PLEASE is ignored", "Only the first PLEASE counts"], answer: "The compiler rejects the program as overly polite", why: "About one PLEASE in three to five is the safe band; more is rejected." },
      ],
    },
    {
      id: "mingle",
      title: "Mingle and select",
      summary: "The two binary operators, worked out bit by bit.",
      sections: [
        {
          p: "<b>Mingle</b> (<code>$</code>, also written as a c with a line through it, the “change” sign) takes two 16-bit values and interleaves their bits into one 32-bit value. The left value's bits land in the odd positions and the right value's in the even ones, starting from the right. The lines that begin <code>DO NOTE</code> are comments: INTERCAL reads them as <code>DO NOT E…</code>, a statement switched off for good.",
          code: `DO NOTE #3 $ #0
DO NOTE left  #3 = 11 in binary
DO NOTE right #0 = 00
DO NOTE interleave left, right, left, right = 1 0 1 0
DO NOTE 1010 in binary is 10
DO :1 <- #3 $ #0`,
        },
        {
          h: "Select",
          p: "<b>Select</b> (<code>~</code>) uses the right value as a mask. It picks out the bits of the left value where the mask has a 1, and packs them together at the right-hand end. The manual's own example is <code>#179 ~ #201</code>: 179 is 10110011, the mask 201 is 11001001, the picked bits are 1, 0, 0 and 1, and 1001 is 9.",
          code: `DO NOTE #179 ~ #201
DO NOTE 179  = 1 0 1 1 0 0 1 1
DO NOTE 201  = 1 1 0 0 1 0 0 1   (mask)
DO NOTE kept = 1 0 . . 0 . . 1   gives 1001, which is 9
DO .1 <- #179 ~ #201`,
        },
        {
          h: "Why bother",
          p: "Together mingle and select can do anything: mingle builds wide values, select pulls bits back out, and a mask of all ones (<code>#65535</code>) selects a whole 16-bit value. They are just very inconvenient on purpose, which is why real INTERCAL programs lean on the system library for arithmetic.",
        },
      ],
      practice: [
        { q: "What is #1 $ #0?", options: ["2", "1", "3", "10"], answer: "2", why: "The left value's bit 0 goes to position 1, so the result is binary 10, which is 2." },
        { q: "What is #0 $ #1?", options: ["1", "2", "0", "3"], answer: "1", why: "The right value's bits take the even positions, so its bit 0 stays at position 0." },
        { q: "What is #2 $ #3?", options: ["13", "23", "5", "14"], answer: "13", why: "Left 10 and right 11 interleave to 1 1 0 1, which is 13." },
        { q: "What is #12 ~ #7?", options: ["4", "12", "7", "3"], answer: "4", why: "The mask 0111 keeps the low three bits of 1100, which are 100: 4." },
        { q: "What is #6 ~ #6?", options: ["3", "6", "0", "2"], answer: "3", why: "The mask 110 keeps two bits of 110, both 1, packed as 11: 3." },
        { q: "What is #1 $ #1?", options: ["3", "1", "2", "0"], answer: "3", why: "Left and right each contribute bit 0, interleaved as binary 11." },
        { q: "What is #3 $ #0?", options: ["10", "3", "6", "0"], answer: "10", why: "Left 11 and right 00 interleave to 1010, which is 10 — the manual's style of example." },
        { q: "What is #15 ~ #10?", options: ["3", "15", "10", "5"], answer: "3", why: "Mask 1010 keeps bits 1 and 3 of 1111, both 1, packed as 11: 3." },
        { q: "What is #8 ~ #8?", options: ["1", "8", "0", "4"], answer: "1", why: "The mask keeps only the high 1 of 1000, packed down to bit 0." },
        { q: "What does a mask of #65535 do in a select?", options: ["Selects a whole 16-bit value", "Clears every bit", "Mingles with itself", "Causes an error"], answer: "Selects a whole 16-bit value", why: "All ones in the mask keep every bit, packed as the original 16-bit number." },
      ],
    },
    {
      id: "unary",
      title: "The unary operators",
      summary: "AND, OR and XOR of a number with itself, rotated.",
      sections: [
        {
          p: "The unary operators <code>&amp;</code> (AND), <code>V</code> (OR) and <code>?</code> (XOR) take one value. They rotate it one bit to the right (the lowest bit wraps round to the top) and combine each bit with the rotated copy. The operator is written inside the name, after the spot or mesh: <code>.&amp;1</code>, <code>#V77</code>.",
          code: `DO NOTE #77 is 0000000001001101
DO NOTE rotated 1000000000100110
DO NOTE &#77 = AND of the two = 0000000000000100 = 4
DO NOTE V#77 = OR  of the two = 1000000001101111 = 32879
DO NOTE ?#77 = XOR of the two = 1000000001101011 = 32875
DO .1 <- #&77`,
        },
        {
          h: "Grouping",
          p: "INTERCAL has no brackets. Instead, <b>sparks</b> (<code>'</code>) and <b>rabbit ears</b> (<code>\"</code>) group sub-expressions, and they can be nested by alternating them. Reading which spark matches which is part of the fun.",
          code: `DO .3 <- '.1 ~ #255' $ '.2 ~ #255'`,
        },
      ],
      practice: [
        { q: "What does the unary & combine each bit with?", options: ["The bit to its left, wrapping round", "The bit to its right only", "The same bit of another number", "Nothing; it is a comment"], answer: "The bit to its left, wrapping round", why: "The value is rotated right by one, so each bit meets its left-hand neighbour; the top bit meets the lowest." },
        { q: "What is &#3?", options: ["1", "3", "0", "2"], answer: "1", why: "3 is ...011; the two low bits are both 1, so AND keeps one 1 at the bottom, and the wrapped top pair gives 0: result 1." },
        { q: "What is &#5?", options: ["0", "5", "4", "1"], answer: "0", why: "5 is 101: no two neighbouring bits are both 1, so AND gives 0." },
        { q: "What groups part of an expression in INTERCAL?", options: ["Sparks ' and rabbit ears \"", "Round brackets", "Square brackets", "Commas"], answer: "Sparks ' and rabbit ears \"", why: "There are no brackets; sparks and rabbit ears do the job and alternate when nested." },
        { q: "What is &#7?", options: ["3", "7", "1", "15"], answer: "3", why: "7 is ...0111; AND with its right-rotate keeps the low two bits as 11: 3." },
        { q: "What is &#1?", options: ["0", "1", "32769", "2"], answer: "0", why: "The single 1 meets the wrapped 0 from the top, so AND clears it." },
        { q: "Where is a unary operator written?", options: ["Inside the name, after the spot or mesh", "Between two values", "Only at the start of a line", "After GIVE UP"], answer: "Inside the name, after the spot or mesh", why: "Forms like .&1 and #V77 put &, V or ? inside the variable or constant." },
        { q: "What does unary V do?", options: ["OR of each bit with its left-hand neighbour", "AND of neighbouring bits", "XOR of neighbouring bits", "Rotate without combining"], answer: "OR of each bit with its left-hand neighbour", why: "V is unary OR against the right-rotated copy; & is AND and ? is XOR." },
      ],
    },
    {
      id: "flow",
      title: "NEXT, RESUME and FORGET",
      summary: "Calling, returning and the NEXT stack.",
      sections: [
        {
          p: "Lines can carry a label in brackets, such as <code>(10)</code>. <code>DO (10) NEXT</code> jumps to line (10) and remembers where it came from on the <b>NEXT stack</b>, which holds at most 79 entries. <code>DO RESUME #1</code> goes back one entry; <code>DO FORGET #1</code> throws one entry away without going back. A program that fills the stack dies with an error, so every NEXT needs a matching RESUME or FORGET.",
          code: `        DO (10) NEXT
        DO READ OUT .1
        DO GIVE UP
(10)    DO .1 <- #7
        PLEASE RESUME #1`,
        },
        {
          h: "Arithmetic from the library",
          p: "Adding two numbers is a library call. Put the values in <code>.1</code> and <code>.2</code>, call <code>(1000)</code>, and the sum appears in <code>.3</code>. The system library also subtracts, multiplies and divides, all written in INTERCAL itself out of mingles and selects.",
          code: `DO .1 <- #2
DO .2 <- #3
PLEASE DO (1000) NEXT
DO READ OUT .3`,
        },
        {
          h: "Conditional jumps, the INTERCAL way",
          p: "There is no IF. A classic trick computes #1 or #2 from a test, then does <code>RESUME</code> by that amount: resuming by 1 returns normally, resuming by 2 skips back one level further. It is as hard to read as it sounds, which is the point.",
        },
      ],
      practice: [
        { q: "What does DO (10) NEXT do?", options: ["Jumps to (10) and remembers where it came from", "Skips the next 10 lines", "Labels this line 10", "Repeats line (10)"], answer: "Jumps to (10) and remembers where it came from", why: "NEXT is INTERCAL's call; the return point goes on the NEXT stack." },
        { q: "How many entries can the NEXT stack hold?", options: ["79", "80", "16", "Unlimited"], answer: "79", why: "The 80th NEXT is an error." },
        { q: "What is the difference between RESUME #1 and FORGET #1?", options: ["RESUME returns to the saved place; FORGET drops it and carries on", "They are the same", "FORGET returns twice", "RESUME clears the whole stack"], answer: "RESUME returns to the saved place; FORGET drops it and carries on", why: "Both remove an entry; only RESUME jumps to it." },
        { q: "Where does (1000) put the sum of .1 and .2?", options: [".3", ".1", ":1", "It prints it"], answer: ".3", why: "The library routine leaves its answer in .3." },
        { q: "How is a line labelled?", options: ["A number in brackets before the statement", "A colon after the statement", "A # before the statement", "An equals sign"], answer: "A number in brackets before the statement", why: "Labels look like (10) at the start of the line." },
        { q: "What must every NEXT have?", options: ["A matching RESUME or FORGET", "A PLEASE on the same line", "A COME FROM", "A READ OUT"], answer: "A matching RESUME or FORGET", why: "Otherwise the NEXT stack fills and the program dies." },
        { q: "What does RESUME #2 do compared with RESUME #1?", options: ["Returns two levels up the NEXT stack", "Returns twice as far in the file", "Forgets two entries without jumping", "Adds 2 to .1"], answer: "Returns two levels up the NEXT stack", why: "The number is how many stack entries to pop while returning; 2 is a classic conditional trick." },
        { q: "Where do you put the addends before calling (1000)?", options: ["In .1 and .2", "In .3 and .4", "On the NEXT stack", "In :1 only"], answer: "In .1 and .2", why: "The system library reads .1 and .2 and leaves the sum in .3." },
      ],
    },
    {
      id: "abstain",
      title: "ABSTAIN, STASH and chance",
      summary: "Switching statements off, saving variables and percentages.",
      sections: [
        {
          p: "<code>DO ABSTAIN FROM (20)</code> switches line (20) off; <code>DO REINSTATE (20)</code> switches it back on. You can also abstain from a kind of statement: <code>DO ABSTAIN FROM READING OUT</code> silences every output. A statement written with <code>NOT</code> or <code>N'T</code> (<code>DON'T</code>, <code>PLEASE DON'T</code>) starts switched off.",
          code: `        DO ABSTAIN FROM (20)
(20)    PLEASE READ OUT #1
        DO REINSTATE (20)
        DO GIVE UP`,
        },
        {
          h: "STASH and RETRIEVE",
          p: "<code>DO STASH .1</code> saves a copy of <code>.1</code> on its own private stack; <code>DO RETRIEVE .1</code> brings the saved value back. It is how routines keep the caller's variables safe. <code>IGNORE</code> makes a variable read-only until <code>REMEMBER</code>.",
          code: `DO .1 <- #5
DO STASH .1
DO .1 <- #9
DO RETRIEVE .1
PLEASE READ OUT .1`,
        },
        {
          h: "Doing things sometimes",
          p: "A statement can start with a percentage, such as <code>DO %50 READ OUT .1</code>, meaning it runs with that chance each time. INTERCAL may be the only language where randomness is a statement prefix.",
        },
      ],
      practice: [
        { q: "What does DON'T at the start of a statement mean?", options: ["The statement starts switched off", "The statement is a comment and can never run", "The program refuses to compile", "It runs twice"], answer: "The statement starts switched off", why: "It is abstained from at the start; REINSTATE can switch it on later." },
        { q: "After DO .1 <- #5, DO STASH .1, DO .1 <- #9, DO RETRIEVE .1, what is in .1?", options: ["5", "9", "14", "0"], answer: "5", why: "RETRIEVE brings back the value that was stashed." },
        { q: "What does DO %25 READ OUT .1 do?", options: ["Prints .1 about one time in four", "Prints a quarter of .1", "Prints .1 25 times", "Prints 25%"], answer: "Prints .1 about one time in four", why: "The percentage is the chance that the statement runs." },
        { q: "What does DO ABSTAIN FROM READING OUT do?", options: ["Switches off every READ OUT statement", "Ends the program", "Clears the output", "Reads input instead"], answer: "Switches off every READ OUT statement", why: "Abstaining by gerund affects every statement of that kind." },
        { q: "What does DO REINSTATE (20) do?", options: ["Switches line (20) back on", "Deletes line (20)", "Runs line (20) twice", "Abstains from line (20)"], answer: "Switches line (20) back on", why: "REINSTATE undoes an ABSTAIN for that label." },
        { q: "What does IGNORE do to a variable?", options: ["Makes it read-only until REMEMBER", "Deletes it", "Stashes it", "Prints it"], answer: "Makes it read-only until REMEMBER", why: "Assignments are ignored while the variable is IGNOREd." },
        { q: "Where does STASH keep the saved value?", options: ["On that variable's own private stack", "On the NEXT stack", "In .3", "In a mesh constant"], answer: "On that variable's own private stack", why: "Each variable has its own stash; RETRIEVE pops it back." },
        { q: "How does DO NOTE… become a comment?", options: ["It is read as DO NOT E…, a statement switched off", "NOTE is a reserved comment keyword", "The compiler strips lines starting with N", "It only works after PLEASE"], answer: "It is read as DO NOT E…, a statement switched off", why: "NOT / N'T abstains the statement for good, so DO NOTE… never runs." },
      ],
    },
  ],
};
