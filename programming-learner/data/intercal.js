// INTERCAL course for the Programming Learner. Written for this project.
// Schema: see data/python.js.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.intercal = {
  id: "intercal",
  name: "INTERCAL",
  title: "INTERCAL, politely",
  intro:
    "INTERCAL was written in 1972 by Don Woods and James Lyon to be unlike every other language. It has no ordinary arithmetic operators, judges your manners, and prints numbers in Roman numerals. It is a joke, but a carefully built one, and reading it shows how much we take for granted in normal languages. C-INTERCAL (the <code>ick</code> compiler) runs it today.",
  comment: "NOTE",
  keywords: ["DO", "PLEASE", "NOT", "N'T", "READ", "OUT", "WRITE", "IN", "GIVE", "UP", "COME", "FROM", "NEXT", "FORGET", "RESUME", "STASH", "RETRIEVE", "IGNORE", "REMEMBER", "ABSTAIN", "REINSTATE"],
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
      ],
    },
  ],
};
