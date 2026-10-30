// Piet course for the Programming Learner. Written for this project.
// Schema: see data/python.js.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.piet = {
  id: "piet",
  name: "Piet",
  title: "Programs as paintings",
  intro:
    "Piet (David Morgan-Mar, 2001, named after the painter Piet Mondrian) uses pictures as source code. The program is a grid of coloured squares called <b>codels</b>. An interpreter walks from one block of colour to the next, and the change in colour between them decides what happens. To play with it, try the npiet interpreter or one of the online Piet editors, which let you paint and step through a program.",
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
      ],
      practice: [
        { q: "Light red to normal red. What happens?", options: ["push", "pop", "add", "Nothing"], answer: "push", why: "No hue change and one step darker is push." },
        { q: "Red to yellow at the same lightness. What happens?", options: ["add", "push", "multiply", "out (char)"], answer: "add", why: "Red to yellow is one hue step with no lightness change: add." },
        { q: "What number does push put on the stack?", options: ["The size of the block just left", "The colour's number", "Always 1", "The row number"], answer: "The size of the block just left", why: "Block size in codels is how Piet gets numbers into a program." },
        { q: "What do black codels do?", options: ["Block movement, like walls", "End the program at once", "Print a space", "Push 0"], answer: "Block movement, like walls", why: "The pointer cannot enter black; it turns and tries another way." },
      ],
    },
  ],
};
