// Malbolge course for the Programming Learner. Written for this project.
// Schema: see data/python.js.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.malbolge = {
  id: "malbolge",
  name: "Malbolge",
  title: "The language from the eighth circle",
  intro:
    "Ben Olmstead designed Malbolge in 1998 to be as hard to program as possible, and named it after the eighth circle of Hell in Dante's Inferno. It took two years before anyone produced a working program, and that first Hello World was found by a computer search, not written by hand. The interesting part is not writing Malbolge but understanding why it fights back.",
  lessons: [
    {
      id: "machine",
      title: "How the machine works",
      summary: "Base 3, three registers, and code that changes as it runs.",
      sections: [
        {
          h: "Ternary memory",
          p: "Malbolge counts in base 3. Each memory cell holds a 10-trit number (0 to 59048), and there are 3<sup>10</sup> = 59049 cells. There are three registers: <code>a</code> (the accumulator), <code>c</code> (the code pointer) and <code>d</code> (the data pointer).",
        },
        {
          h: "Instructions depend on where they are",
          p: "To decide what to do, the machine adds the character at <code>[c]</code> to the address <code>c</code> itself and takes the remainder after dividing by 94. Only eight results mean anything, such as jump, print, read, rotate, the “crazy” operation, and stop. So the same character means different things at different positions.",
        },
        {
          h: "Self-encrypting code",
          p: "After each instruction runs, the character at <code>[c]</code> is replaced using a fixed scrambling table. The next time the program passes that spot, the instruction is different. Loops therefore have to be designed so the code returns to a useful state, which is a big part of why Malbolge is so hard.",
        },
        {
          h: "The crazy operation",
          p: "Malbolge has no add or subtract. Its only arithmetic is the “crazy” operation, which combines two numbers trit by trit using a 3×3 table that matches no familiar logic gate. Rotating a number's trits right is the only other way to change data.",
        },
      ],
      practice: [
        { q: "What number base does Malbolge use?", options: ["Base 3", "Base 2", "Base 10", "Base 94"], answer: "Base 3", why: "Its memory and arithmetic are ternary, built from trits." },
        { q: "What happens to an instruction after it runs?", options: ["It is scrambled into a different one", "It is deleted", "It stays the same", "It is printed"], answer: "It is scrambled into a different one", why: "Each executed cell is encrypted with a fixed table, so code changes as it runs." },
        { q: "How was the first Malbolge Hello World made?", options: ["A computer search found it", "Ben Olmstead wrote it by hand", "It was translated from C", "It came with the specification"], answer: "A computer search found it", why: "Andrew Cooke's program was found by a beam search, two years after the language was released." },
        { q: "Why does the same character mean different things in different places?", options: ["The instruction is (character + address) mod 94", "Characters are randomly chosen", "Each line has its own alphabet", "It does not; it is always the same"], answer: "The instruction is (character + address) mod 94", why: "The address is mixed in before the instruction is decoded." },
      ],
    },
  ],
};
