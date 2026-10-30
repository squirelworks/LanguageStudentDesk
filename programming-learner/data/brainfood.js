// brainFOOD course for the Programming Learner. Written for this project.
// brainFOOD is the Desk's kid-friendly name for the classic eight-command
// language. Schema: see data/python.js; kind "output" code is run by
// tools/check_packs.py with its own small interpreter.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.brainfood = {
  id: "brainfood",
  name: "brainFOOD",
  title: "Eight commands and a row of boxes",
  intro:
    "Picture a long row of boxes, each holding a number that starts at 0, and a pointer that sits under one box. brainFOOD has just eight commands to move the pointer, change the number in a box, read and print characters, and loop. That is enough to compute anything a bigger language can, just very slowly and with a lot of plus signs. Every other character is ignored, so you can write notes anywhere.",
  lessons: [
    {
      id: "commands",
      title: "The eight commands",
      summary: "Move, change, print, read and loop.",
      sections: [
        {
          p: "<code>&gt;</code> move right to the next box · <code>&lt;</code> move left · <code>+</code> add 1 to this box · <code>-</code> take 1 away · <code>.</code> print this box as a character · <code>,</code> read a typed character into this box · <code>[</code> if this box is 0, skip past the matching <code>]</code> · <code>]</code> if this box is not 0, go back to the matching <code>[</code>.",
        },
        {
          h: "Numbers are characters",
          p: "<code>.</code> prints the character whose code is in the box: 65 is <code>A</code>, 97 is <code>a</code>, 48 is <code>0</code>, 10 is a new line. So to print a letter you first count up to its code.",
          code: `+++++ +++++ +++++ +++++ +++++ +++++ +++++
+++++ +++++ +++++ +++++ +++++ +++++ +++++
++.`,
          out: "H",
        },
        {
          h: "Loops multiply",
          p: "Seventy-two plus signs is a lot. A loop does it faster: put 8 in box 0, and each time round add 9 to box 1 and take 1 from box 0. When box 0 reaches 0 the loop stops and box 1 holds 8 × 9 = 72.",
          code: `++++++++[>+++++++++<-]>.   H is 72
+++++++++++++++++++++++++++++++++.   i is 105`,
          out: "Hi",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `++++++++[>++++++++<-]>+.`, options: ["A", "@", "B", "64"], answer: "A", why: "8 × 8 = 64, plus one is 65, the code for A." },
        { q: "What does [-] do?", options: ["Sets the current box to 0", "Deletes the program", "Moves to box 0", "Prints a minus sign"], answer: "Sets the current box to 0", why: "It keeps taking 1 away until the box is 0, then the loop ends." },
        { kind: "output", q: "What does this print?", code: `++++++[>++++++++<-]>.+.+.`, options: ["012", "000", "0", "123"], answer: "012", why: "6 × 8 = 48 is the character 0; each +. adds one and prints again." },
        { q: "How many boxes does the pointer move in >>><?", options: ["2 to the right", "4 to the right", "3 to the right", "1 to the left"], answer: "2 to the right", why: "Three steps right, one step left." },
        { q: "What happens to a letter like x in a program?", options: ["It is ignored", "It prints x", "It is an error", "It ends the program"], answer: "It is ignored", why: "Only the eight command symbols mean anything." },
      ],
    },
    {
      id: "hello",
      title: "Hello World, step by step",
      summary: "Setting up several boxes with one loop.",
      sections: [
        {
          p: "A classic trick: one loop fills several boxes at once with handy starting values, and then small nudges reach each letter. Here box 0 counts down from 10 while boxes 1 to 4 grow by 7, 10, 3 and 1, giving 70, 100, 30 and 10. Those are close to <code>H</code> (72), the lowercase letters (around 100), a space (32) and a new line (10).",
          code: `++++++++++[>+++++++>++++++++++>+++>+<<<<-]
>++.          H
>+.           e
+++++++..     l l
+++.          o
>++.          space
<<+++++++++++++++.  W
>.            o
+++.          r
------.       l
--------.     d
>+.           !
>.            new line`,
          out: "Hello World!",
        },
        {
          h: "Reading input",
          p: "<code>,</code> stores the code of one typed character. This program echoes each character until it reads a 0 (end of input on most interpreters).",
          code: `,[.,]`,
        },
      ],
      practice: [
        { q: "After ++++++++++[>+++++++<-] which box holds 70?", options: ["Box 1", "Box 0", "Box 7", "Box 10"], answer: "Box 1", why: "Box 0 counts the 10 rounds down to 0; box 1 gains 7 each round." },
        { kind: "output", q: "What does this print?", code: `+++++[>+++++++++++++<-]>.+++.`, options: ["AD", "AB", "A", "BE"], answer: "AD", why: "5 × 13 = 65 is A; three more is 68, D." },
        { q: "Why is the program text full of words like H and space?", options: ["They are notes; non-commands are ignored", "They print themselves", "They name the boxes", "They are required labels"], answer: "They are notes; non-commands are ignored", why: "Any character that is not one of the eight commands is skipped." },
      ],
    },
  ],
};
