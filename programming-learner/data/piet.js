// Piet course for the Programming Learner. Written for this project.
// Programs are written as grids of two-letter codels (see the first lesson)
// and drawn in colour by pietGrid below. Schema: see data/python.js.
// Examples with `out` and practice of kind "output" are run by
// tools/check_packs.py with tools/run_piet.py.
window.PROGRAMMING = window.PROGRAMMING || {};
(function () {
  const COLOURS = {
    lr: "#ffc0c0", ly: "#ffffc0", lg: "#c0ffc0", lc: "#c0ffff", lb: "#c0c0ff", lm: "#ffc0ff",
    nr: "#ff0000", ny: "#ffff00", ng: "#00ff00", nc: "#00ffff", nb: "#0000ff", nm: "#ff00ff",
    dr: "#c00000", dy: "#c0c000", dg: "#00c000", dc: "#00c0c0", db: "#0000c0", dm: "#c000c0",
    ww: "#ffffff", kk: "#000000",
  };
  const pietGrid = (code) =>
    '<table class="codels">' +
    code.trim().split("\n").map((row) =>
      "<tr>" + row.trim().split(/\s+/).map((t) => '<td style="background:' + COLOURS[t] + '" title="' + t + '"></td>').join("") + "</tr>"
    ).join("") +
    "</table>";
  const P = {
    add: `lr lr nr dr dy lr kk
lr lr nr kk kk ww kk
lr kk nr kk kk ww kk
kk kk kk kk kk ww kk
kk kk kk kk nb nb nb`,
    sub: `lr lr nr dr ly nr kk
lr lr nr kk kk ww kk
lr kk nr kk kk ww kk
kk kk kk kk kk ww kk
kk kk kk kk nb nb nb`,
    mul: `lr lr nr nr dr ny dr kk
lr kk nr nr kk kk ww kk
kk kk kk kk kk kk ww kk
kk kk kk kk kk nb nb nb`,
    div: `lr lr lr nr dr dg ly kk
lr lr kk nr kk kk ww kk
lr lr kk kk kk kk ww kk
kk kk kk kk kk kk ww kk
kk kk kk kk kk nb nb nb`,
    mod: `lr lr lr nr dr lg ny kk
lr lr kk nr kk kk ww kk
lr lr kk kk kk kk ww kk
kk kk kk kk kk kk ww kk
kk kk kk kk kk nb nb nb`,
    pop: `lr lr nr nr dr nr dm kk
lr lr nr nr kk kk ww kk
lr lr nr kk kk kk ww kk
kk kk kk kk kk kk ww kk
kk kk kk kk kk nb nb nb`,
    h: `lr lr lr nr nr nr dr ny lr kk
lr lr lr nr nr nr kk kk ww kk
lr lr kk nr nr nr kk kk ww kk
kk kk kk kk kk kk kk kk ww kk
kk kk kk kk kk kk kk nb nb nb`,
    hi: `lr lr lr nr nr nr dr ny nm lb nb nb nb nb db nm nr lm kk
lr lr lr nr nr nr kk kk kk lb nb nb nb nb kk kk kk ww kk
lr lr kk nr nr nr kk kk kk lb nb nb nb kk kk kk kk ww kk
kk kk kk kk kk kk kk kk kk kk kk kk kk kk kk kk kk ww kk
kk kk kk kk kk kk kk kk kk kk kk kk kk kk kk kk nb nb nb`,
    dup: `lr nr nb lm nb kk
lr kk kk kk ww kk
lr kk kk kk ww kk
kk kk kk kk ww kk
kk kk kk nb nb nb`,
    roll: `lr nr dr lr nr dr lb nc dg ly kk
kk nr dr lr kk kk kk kk kk ww kk
kk kk dr lr kk kk kk kk kk ww kk
kk kk kk kk kk kk kk kk kk ww kk
kk kk kk kk kk kk kk kk nb nb nb`,
    greater: `lr nr dr dc lg kk
lr nr kk kk ww kk
kk nr kk kk ww kk
kk kk kk kk ww kk
kk kk kk nb nb nb`,
    greater2: `lr lr nr dr dc lg kk
lr kk nr kk kk ww kk
lr kk nr kk kk ww kk
kk kk kk kk kk ww kk
kk kk kk kk nb nb nb`,
    not: `lr lr nr lg ny kk
lr lr kk kk ww kk
kk kk kk kk ww kk
kk kk kk nb nb nb`,
    gap: `lr nr ww ww nr nr dr ny dr kk
lr kk kk kk nr kk kk kk ww kk
lr kk kk kk nr kk kk kk ww kk
kk kk kk kk kk kk kk kk ww kk
kk kk kk kk kk kk kk nb nb nb`,
    two: `lr nr dm lm nm lr nm kk
lr kk dm lm kk kk ww kk
kk kk kk kk kk kk ww kk
kk kk kk kk kk nb nb nb`,
    turn: `lr nr dc kk
kk kk dc kk
kk kk dc kk
kk kk dc kk
kk kk dc kk
kk kk lc kk
kk kk ng kk
kk kk ww kk
kk nb nb nb`,
  };

  window.PROGRAMMING.piet = {
    id: "piet",
    name: "Piet",
    title: "Programs as paintings",
    intro:
      "Piet (David Morgan-Mar, 2001, named after the painter Piet Mondrian) uses pictures as source code. The program is a grid of coloured squares called <b>codels</b>. An interpreter walks from one block of colour to the next, and the change in colour between them decides what happens. To play with it, try the npiet interpreter or one of the online Piet editors, which let you paint and step through a program.",
    noStrings: true,
    lessons: [
      {
        id: "colours",
        title: "Colours and commands",
        summary: "Hue steps and lightness steps choose the instruction.",
        sections: [
          {
            p: "Piet uses 18 colours: six hues (red, yellow, green, cyan, blue, magenta) in three lightnesses (light, normal, dark), plus white and black. The command is not set by a colour itself but by how far you move between two colours: steps around the hue cycle, and steps darker in lightness (both wrap around).",
          },
          {
            h: "The command table",
            p: "<table class=\"ops\"><tr><th>Hue steps</th><th>Same lightness</th><th>1 darker</th><th>2 darker</th></tr>" +
              "<tr><td>0</td><td>–</td><td>push</td><td>pop</td></tr>" +
              "<tr><td>1</td><td>add</td><td>subtract</td><td>multiply</td></tr>" +
              "<tr><td>2</td><td>divide</td><td>mod</td><td>not</td></tr>" +
              "<tr><td>3</td><td>greater</td><td>pointer</td><td>switch</td></tr>" +
              "<tr><td>4</td><td>duplicate</td><td>roll</td><td>in (number)</td></tr>" +
              "<tr><td>5</td><td>in (char)</td><td>out (number)</td><td>out (char)</td></tr></table>",
          },
          {
            h: "Size is data",
            p: "<code>push</code> pushes the number of codels in the block you just left. A block of 5 red squares followed by a darker red block pushes 5. Arithmetic then works on the stack, like a calculator that uses reverse Polish notation.",
          },
          {
            h: "Moving around",
            p: "The interpreter keeps a <b>direction pointer</b> (right, down, left or up) and a <b>codel chooser</b> (left or right) to decide which edge of a block to leave from. Black squares and the image edge are walls; when every way out is blocked eight times running, the program stops. White is free space that can be crossed without doing anything.",
          },
          {
            h: "How these lessons write a program",
            p: "Each program is drawn in colour and also written out as text, one row per line. Every codel is two letters: the lightness (<code>l</code> light, <code>n</code> normal, <code>d</code> dark) and the hue (<code>r</code> red, <code>y</code> yellow, <code>g</code> green, <code>c</code> cyan, <code>b</code> blue, <code>m</code> magenta). <code>ww</code> is white and <code>kk</code> is black. The run starts at the top-left codel heading right." +
              pietGrid("lr ly lg lc lb lm\nnr ny ng nc nb nm\ndr dy dg dc db dm\nww ww ww kk kk kk"),
            code: `lr ly lg lc lb lm
nr ny ng nc nb nm
dr dy dg dc db dm
ww ww ww kk kk kk`,
          },
        ],
        practice: [
          { q: "Light red to normal red. What happens?", options: ["push", "pop", "add", "Nothing"], answer: "push", why: "No hue change and one step darker is push." },
          { q: "Red to yellow at the same lightness. What happens?", options: ["add", "push", "multiply", "out (char)"], answer: "add", why: "Red to yellow is one hue step with no lightness change: add." },
          { q: "What number does push put on the stack?", options: ["The size of the block just left", "The colour's number", "Always 1", "The row number"], answer: "The size of the block just left", why: "Block size in codels is how Piet gets numbers into a program." },
          { q: "What do black codels do?", options: ["Block movement, like walls", "End the program at once", "Print a space", "Push 0"], answer: "Block movement, like walls", why: "The pointer cannot enter black; it turns and tries another way." },
          { q: "Dark red to light red. How many steps darker is that?", options: ["1", "2", "0", "It is lighter, so none"], answer: "1", why: "Lightness wraps around: light, normal, dark, then light again, so dark to light is one step darker." },
        ],
      },
      {
        id: "numbers",
        title: "Numbers and arithmetic",
        summary: "Push block sizes, then add, subtract and multiply.",
        sections: [
          {
            p: "Read this program from the left. The first block has 5 codels; moving from light red to normal red is push, so 5 goes on the stack. The normal red block has 3 codels, and normal red to dark red pushes 3. Dark red to dark yellow is one hue step: add, leaving 8. Dark yellow to light red is five hue steps and one darker: out (number). The white path and the blue bar at the bottom are where the program stops; the last lesson explains how." + pietGrid(P.add),
            code: P.add,
            out: "8",
          },
          {
            h: "Order matters",
            p: "For subtract, divide and mod, the value pushed first is on the left: push 5, push 3, subtract gives 5 − 3." + pietGrid(P.sub),
            code: P.sub,
            out: "2",
          },
          {
            h: "Blocks can be any shape",
            p: "Only the number of codels counts. Here a 2×2 block pushes 4, and 3 × 4 is printed." + pietGrid(P.mul),
            code: P.mul,
            out: "12",
          },
          {
            h: "Several results",
            p: "Each out (number) prints and removes the top of the stack. Nothing is printed between results, so 2 and then 4 come out as 24." + pietGrid(P.two),
            code: P.two,
            out: "24",
          },
        ],
        practice: [
          { kind: "output", q: "What does this print?", code: P.div, options: ["3", "3.5", "4", "5"], answer: "3", why: "Push 7, push 2, divide: whole-number division gives 3." },
          { kind: "output", q: "What does this print?", code: P.mod, options: ["1", "3", "0", "5"], answer: "1", why: "Push 7, push 2, mod: the remainder of 7 ÷ 2 is 1." },
          { kind: "output", q: "What does this print?", code: P.pop, options: ["6", "5", "65", "11"], answer: "6", why: "Push 6, push 5, then pop throws the 5 away, leaving 6 to print." },
          { q: "Which change in colour is subtract?", options: ["One hue step and one darker", "One hue step, same lightness", "Two hue steps, same lightness", "No hue change, one darker"], answer: "One hue step and one darker", why: "Look in the hue-step 1 row, one-darker column." },
        ],
      },
      {
        id: "characters",
        title: "Printing characters",
        summary: "Build a character code, then out (char).",
        sections: [
          {
            p: "out (char) prints the character whose code is on top of the stack. H is 72, which is 8 × 9, so push an 8-codel block and a 9-codel block, multiply, and print." + pietGrid(P.h),
            code: P.h,
            out: "H",
          },
          {
            h: "Reusing a value",
            p: "i is 105, which is 72 + 33. Duplicate keeps a copy of the 72, the copy is printed, then 3 × 11 = 33 is added to what is left." + pietGrid(P.hi),
            code: P.hi,
            out: "Hi",
          },
          {
            h: "Big numbers, small pictures",
            p: "A block of 105 codels works, but most Piet programmers build numbers by multiplying small blocks, just as above. Painting programs that also look good is part of the fun.",
          },
        ],
        practice: [
          { q: "Which character code does out (char) need to print A?", options: ["65", "1", "97", "41"], answer: "65", why: "A is 65 in ASCII; 97 is a lowercase a." },
          { q: "How would you get 72 on the stack with small blocks?", options: ["Push 8, push 9, multiply", "Push 7, push 2", "Push 72 times", "Push 9, push 8, subtract"], answer: "Push 8, push 9, multiply", why: "8 × 9 = 72, using two small blocks instead of one 72-codel block." },
          { q: "What does duplicate do?", options: ["Pushes a copy of the top value", "Prints the top value twice", "Doubles the top value", "Copies a block of codels"], answer: "Pushes a copy of the top value", why: "Afterwards the same number is on the stack twice." },
        ],
      },
      {
        id: "stack",
        title: "Working the stack",
        summary: "Duplicate, roll, greater and not.",
        sections: [
          {
            p: "Duplicate followed by multiply squares a number." + pietGrid(P.dup),
            code: P.dup,
            out: "9",
          },
          {
            h: "Roll",
            p: "Roll pops two values: the number of rolls on top, and below it the depth. One roll to depth 3 buries the top value three deep. Push 1, 2, 3, then roll with depth 3 and 1 roll: the stack becomes 3, 1, 2 (top last). Printing three times gives 2, then 1, then 3." + pietGrid(P.roll),
            code: P.roll,
            out: "213",
          },
          {
            h: "Greater and not",
            p: "Greater pops two values and pushes 1 if the first is bigger than the second, otherwise 0. Not turns 0 into 1 and anything else into 0. They are how Piet makes decisions, together with pointer and switch." + pietGrid(P.greater),
            code: P.greater,
            out: "0",
          },
        ],
        practice: [
          { kind: "output", q: "What does this print?", code: P.greater2, options: ["1", "0", "4", "7"], answer: "1", why: "Push 4, push 3, greater: 4 is bigger than 3, so 1." },
          { kind: "output", q: "What does this print?", code: P.not, options: ["0", "1", "4", "-4"], answer: "0", why: "Push 4, then not: any value other than 0 becomes 0." },
          { q: "Stack (bottom to top) 5, 6, 7. Push 2 and 1, then roll. What is the stack?", options: ["5, 7, 6", "6, 7, 5", "7, 5, 6", "5, 6, 7"], answer: "5, 7, 6", why: "Depth 2, one roll: the top value 7 is buried two deep, under the 6." },
        ],
      },
      {
        id: "flow",
        title: "Turning and stopping",
        summary: "Pointer, white space, and how a program ends.",
        sections: [
          {
            p: "Pointer pops a number and turns the direction pointer clockwise that many times (anticlockwise for a negative number). Here push 1 then pointer turns the run from right to down, and it carries on down the cyan column: push 5, out (number)." + pietGrid(P.turn),
            code: P.turn,
            out: "5",
          },
          {
            h: "White is free",
            p: "Moving into white does nothing, and the run slides straight across it to the next colour without running a command. Here the white gap separates two normal red blocks, so nothing happens between them; the second one pushes 4." + pietGrid(P.gap),
            code: P.gap,
            out: "12",
          },
          {
            h: "Stopping",
            p: "A program stops when every way out of a block is blocked eight times in a row, with the codel chooser and the direction pointer taking turns to change. The blue bar at the bottom of these programs is entered in the middle from the white path. Its corners are under black codels, and the codel chooser only ever picks the end codels of an edge, so there is no way back up and the run ends.",
          },
          {
            h: "Switch",
            p: "Switch pops a number and flips the codel chooser that many times. With greater, not, pointer and switch, a program can choose a path depending on a value, and that is how Piet programs loop and decide.",
          },
        ],
        practice: [
          { q: "What does pointer do with a 1 on the stack?", options: ["Turns clockwise once", "Turns anticlockwise once", "Moves one codel", "Stops the program"], answer: "Turns clockwise once", why: "A positive number turns the direction pointer clockwise that many times." },
          { q: "What happens when the run crosses white codels?", options: ["No command runs", "The block size is pushed", "The program stops", "The colour resets to red"], answer: "No command runs", why: "White is free space; only colour-to-colour moves run commands." },
          { q: "When does a Piet program stop?", options: ["After eight blocked attempts in a row", "At the last codel of the image", "When it reaches a white codel", "When the stack is empty"], answer: "After eight blocked attempts in a row", why: "The interpreter tries every combination of the direction pointer and codel chooser before giving up." },
        ],
      },
    ],
  };
})();
