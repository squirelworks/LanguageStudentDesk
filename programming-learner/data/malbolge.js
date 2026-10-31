// Malbolge course for the Programming Learner. Written for this project.
// Schema: see data/python.js. Examples with `out` and practice of kind
// "output" are run by tools/check_packs.py with tools/run_malbolge.py.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.malbolge = {
  id: "malbolge",
  name: "Malbolge",
  title: "The language from the eighth circle",
  intro:
    "Ben Olmstead designed Malbolge in 1998 to be as hard to program as possible, and named it after the eighth circle of Hell in Dante's Inferno. It took two years before anyone produced a working program, and that first Hello World was found by a computer search, not written by hand. The interesting part is not writing Malbolge but understanding why it fights back.",
  noStrings: true,
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
    {
      id: "decode",
      title: "Reading an instruction",
      summary: "(c + [c]) mod 94, and the eight that count.",
      sections: [
        {
          p: "To find out what the cell at address <code>c</code> does, take its character code, add the address, and keep the remainder after dividing by 94. Only eight remainders are instructions:" +
            "<table class=\"ops\"><tr><th>Remainder</th><th>Letter</th><th>What it does</th></tr>" +
            "<tr><td>4</td><td>i</td><td>jump: <code>c</code> becomes <code>[d]</code></td></tr>" +
            "<tr><td>5</td><td>&lt;</td><td>print <code>a</code> mod 256 as a character</td></tr>" +
            "<tr><td>23</td><td>/</td><td>read a character into <code>a</code></td></tr>" +
            "<tr><td>39</td><td>*</td><td>rotate <code>[d]</code> one trit right and copy it to <code>a</code></td></tr>" +
            "<tr><td>40</td><td>j</td><td><code>d</code> becomes <code>[d]</code></td></tr>" +
            "<tr><td>62</td><td>p</td><td>crazy operation on <code>a</code> and <code>[d]</code>, result to both</td></tr>" +
            "<tr><td>68</td><td>o</td><td>do nothing</td></tr>" +
            "<tr><td>81</td><td>v</td><td>stop</td></tr></table>",
        },
        {
          h: "A worked example",
          p: "The character <code>c</code> has code 99. At address 0, 99 + 0 = 99, and 99 mod 94 = 5, so it prints. Move the same <code>c</code> to address 1 and the sum is 100, remainder 6, which is not an instruction. To print from address 1 you need code 98, the character <code>b</code>.",
        },
        {
          h: "Normalized Malbolge",
          p: "Because the meaning depends on the address, people often rewrite a program as the letters in the table above, one per cell. This is called <b>normalized</b> Malbolge, and it is far easier to read. For example, <code>'C&lt;A@9&gt;=&lt;;4XE</code> normalizes to <code>*opoopoooop&lt;v</code>, a program you will meet again in the last lesson.",
        },
        {
          h: "Only real instructions may be loaded",
          p: "The original interpreter refuses to load a program if any character is not one of the eight instructions at its own address. The registers <code>a</code>, <code>c</code> and <code>d</code> all start at 0, so the first instruction is the one at address 0, and <code>d</code> starts out pointing at the program itself.",
        },
      ],
      practice: [
        { q: "At address 0, what does the character c (code 99) do?", options: ["Prints a", "Jumps", "Stops", "Nothing"], answer: "Prints a", why: "99 mod 94 = 5, the print instruction." },
        { q: "At address 2, which character prints?", options: ["a", "c", "b", "<"], answer: "a", why: "a is code 97, and 97 + 2 = 99, which leaves 5 after dividing by 94." },
        { q: "At address 0, what does D (code 68) do?", options: ["Nothing", "Stops", "Rotates", "Reads a character"], answer: "Nothing", why: "68 mod 94 is 68, the no-op." },
        { q: "What is normalized Malbolge?", options: ["The program rewritten as one instruction letter per cell", "A newer, easier version of the language", "A program with its comments removed", "The program after it has run once"], answer: "The program rewritten as one instruction letter per cell", why: "It shows what each cell does at its own address, which the raw characters hide." },
        { q: "Where does d point when a program starts?", options: ["Address 0, the start of the program", "The end of memory", "Nowhere until j runs", "The last character of the program"], answer: "Address 0, the start of the program", why: "All three registers start at 0, so code and data begin in the same place." },
      ],
    },
    {
      id: "crazy",
      title: "Rotate and crazy",
      summary: "The only two ways to change a number.",
      sections: [
        {
          p: "Numbers are written with 10 trits (ternary digits). <b>Rotate</b> moves every trit one place right, and the trit that falls off the end comes back at the front. 5 is <code>0000000012</code>; rotated it becomes <code>2000000001</code>, which is 2 × 3<sup>9</sup> + 1 = 39367.",
        },
        {
          h: "The crazy table",
          p: "The crazy operation works trit by trit, using this table for each pair of trits:" +
            "<table class=\"ops\"><tr><th></th><th>a = 0</th><th>a = 1</th><th>a = 2</th></tr>" +
            "<tr><th>[d] = 0</th><td>1</td><td>0</td><td>0</td></tr>" +
            "<tr><th>[d] = 1</th><td>1</td><td>0</td><td>2</td></tr>" +
            "<tr><th>[d] = 2</th><td>2</td><td>2</td><td>1</td></tr></table>" +
            "It is not addition, AND, OR or anything else familiar, and it does not give the same answer if you swap the inputs.",
        },
        {
          h: "Worked through",
          p: "Take <code>a</code> = 5 (<code>0000000012</code>) and <code>[d]</code> = 7 (<code>0000000021</code>). The last trits are a = 2 and [d] = 1, giving 2. The next pair is a = 1 and [d] = 2, giving 2. The other eight pairs are both 0, giving 1 each. The answer is <code>1111111122</code>, which is 29528, and it goes into both <code>a</code> and <code>[d]</code>.",
        },
        {
          h: "Why zero is not zero",
          p: "Crazy of 0 and 0 is <code>1111111111</code>, not 0. A cleared register is hard to come by, so even simple arithmetic takes searching.",
        },
      ],
      practice: [
        { q: "What is 3 rotated one trit right?", options: ["1", "9", "0", "19683"], answer: "1", why: "3 is 0000000010; the 0 at the end moves to the front, leaving 0000000001." },
        { q: "What is 1 rotated one trit right?", options: ["19683", "3", "0", "1"], answer: "19683", why: "The 1 falls off the end and comes back as the first trit: 3 to the power 9." },
        { q: "Using the table, what is the crazy result for the trits a = 2 and [d] = 1?", options: ["2", "1", "0", "3"], answer: "2", why: "Row [d] = 1, column a = 2." },
        { q: "What is crazy of a = 0 and [d] = 0?", options: ["1111111111 in ternary", "0", "2222222222 in ternary", "1"], answer: "1111111111 in ternary", why: "Every trit pair is 0 and 0, which gives 1." },
      ],
    },
    {
      id: "encrypt",
      title: "Code that rewrites itself",
      summary: "The scrambling table and the memory beyond the program.",
      sections: [
        {
          p: "After every instruction, the character in the cell <code>c</code> points to is replaced by looking it up in a fixed 94-character table. Then <code>c</code> and <code>d</code> both move on by one. If you follow the table from any character, you come back to it after a cycle. The cycles have lengths 2, 4, 5, 6, 9 and 68, so most characters take 68 runs to return.",
        },
        {
          h: "Jumps",
          p: "The jump instruction sets <code>c</code> to <code>[d]</code>, then the usual scrambling and step happen. So if <code>[d]</code> is 100, the next instruction to run is the one at 101. A loop only works if every cell inside it still does something useful after being scrambled, which is the heart of Malbolge's difficulty.",
        },
        {
          h: "The rest of memory",
          p: "The program fills the first cells. Every later cell is filled with the crazy operation of the two cells before it, all the way to 59048. So a program must be at least two characters long, and memory past the end is not empty.",
        },
      ],
      practice: [
        { q: "When is a cell's character scrambled?", options: ["Right after it runs as an instruction", "When the program loads", "Only when it is printed", "Never"], answer: "Right after it runs as an instruction", why: "The cell c points to is replaced after each step." },
        { q: "If [d] is 100 when the jump runs, where is the next instruction?", options: ["101", "100", "99", "0"], answer: "101", why: "c becomes 100, then c moves on by one before the next instruction." },
        { q: "What fills memory after the program?", options: ["Crazy of the two cells before each one", "Zeros", "Copies of the program", "Random numbers"], answer: "Crazy of the two cells before each one", why: "Each cell is crazy(previous, one before that), up to address 59048." },
        { q: "A character in a cycle of length 2 runs twice. What is in its cell?", options: ["The original character again", "A space", "Its scrambled form", "The number 2"], answer: "The original character again", why: "After a full cycle the table brings the character back." },
      ],
    },
    {
      id: "writing",
      title: "Writing a program",
      summary: "Printing letters without loops.",
      sections: [
        {
          p: "Without jumps or <code>j</code>, <code>c</code> and <code>d</code> move together, so <code>[d]</code> is always the cell being run. That gives a way in: <code>*</code> loads a rotated copy of its own cell into <code>a</code>, <code>p</code> mixes its own cell into <code>a</code> with crazy, and <code>o</code> just waits a step so the next instruction lands on a different address. Try combinations until <code>a</code> mod 256 is the code you want, then print it with <code>&lt;</code>.",
          code: `*opoopoooop<v`,
          out: "A",
        },
        {
          h: "The same program, unnormalized",
          p: "This is what the interpreter actually loads. Each character was chosen so that it means the right letter at its address.",
          code: `'C<A@9>=<;4XE`,
          out: "A",
        },
        {
          h: "Two letters",
          p: "After the first letter, <code>a</code> keeps its value, so the search for the second letter starts from there. This program was found by a short computer search, the same way the first Hello World was found.",
          code: `oooooooopoooop<oooooooooppop<v`,
          out: "Hi",
        },
      ],
      practice: [
        { kind: "output", q: "What does this normalized program print? (Count the print instructions.)", code: `*opoopoooop<v`, options: ["A", "AA", "AAA", "Hi"], answer: "A", why: "There is one < before v, so one character is printed: a mod 256 is 65 at that point, the code for A." },
        { q: "Why are c and d equal in these programs?", options: ["Both step by one and nothing changes d", "d is copied from c each step", "The program sets them equal", "They are always equal"], answer: "Both step by one and nothing changes d", why: "Only j (and jumps, for c) break the pairing." },
        { q: "What does o do in these programs?", options: ["Waits a step so later cells land on other addresses", "Prints a zero", "Clears a", "Ends the program"], answer: "Waits a step so later cells land on other addresses", why: "It is a no-op, but the address of every later instruction changes." },
        { q: "How was the first Malbolge Hello World made?", options: ["A computer search", "By hand over a weekend", "Translated from C", "Ben Olmstead wrote it"], answer: "A computer search", why: "Andrew Cooke's program was found by a search program, two years after the language appeared." },
      ],
    },
  ],
};
