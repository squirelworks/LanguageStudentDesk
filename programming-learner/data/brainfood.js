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
    {
      id: "moving",
      title: "Moving and copying",
      summary: "Clearing a box, moving a value and copying it with a helper box.",
      sections: [
        {
          p: "Most brainFOOD programs are built from a few small patterns. The first: <code>[-]</code> sets a box to 0, whatever it held. The second moves a value: <code>[-&gt;+&lt;]</code> takes 1 from this box and adds 1 to the next, over and over, until this box is empty.",
          code: `++++++++[>++++++++<-]>+    box 1 is 65
[->>+<<]                   move it two boxes along
>>.                        box 3 prints A`,
          out: "A",
        },
        {
          h: "Adding",
          p: "Moving one value onto another adds them. Box 0 holds 3, box 1 holds 4; moving box 0 into box 1 leaves 7 there. Adding 48 then turns the number 7 into the character 7.",
          code: `+++>++++<     box 0 is 3 and box 1 is 4
[->+<]        move box 0 into box 1
>             box 1 is 7
>++++++[<++++++++>-]<     add 6 times 8 to box 1
.`,
          out: "7",
        },
        {
          h: "Copying needs a helper",
          p: "Moving empties the box you move from. To copy, move into <b>two</b> boxes at once, then move one of them back. Afterwards box 0 still holds 5 and box 1 holds a copy.",
          code: `+++++          box 0 is 5
[->+>+<<]      box 1 and box 2 both get 5 and box 0 is empty
>>[-<<+>>]     move box 2 back into box 0
++++++[<++++++++<++++++++>>-]     add 48 to boxes 0 and 1
<<.>.`,
          out: "55",
        },
        {
          h: "Keep the pointer balanced",
          p: "Inside a loop, count your arrows. If the body moves right two and left two, the pointer is back on the counting box when <code>]</code> checks it. If they do not balance, the loop tests a different box each round, which is almost always a bug.",
        },
      ],
      practice: [
        { q: "What does [-] do to the current box?", options: ["Sets it to 0", "Takes 1 away", "Moves it right", "Nothing"], answer: "Sets it to 0", why: "It keeps taking 1 away until the box is 0, then the loop ends." },
        { kind: "output", q: "What does this print?", code: `++++++++[>++++++++<-]>++[->+<]>.`, options: ["B", "A", "@", "C"], answer: "B", why: "Box 1 gets 66 (8 × 8 + 2), which is then moved to box 2 and printed: B." },
        { q: "After +++[->+<] which box holds 3?", options: ["Box 1", "Box 0", "Both", "Neither"], answer: "Box 1", why: "Moving empties box 0 into box 1." },
        { q: "Why does copying use a third box?", options: ["Moving empties the source, so one copy has to be moved back", "Boxes can only hold one value", "The loop needs three arrows", "It is faster"], answer: "Moving empties the source, so one copy has to be moved back", why: "The value goes into two boxes, then one of them refills the original." },
        { kind: "output", q: "What does this print?", code: `++>+++<[->+<]>>++++++[>++++++++<-]>[-<<+>>]<<.`, options: ["5", "6", "2", "3"], answer: "5", why: "2 moved onto 3 gives 5; then 48 is built two boxes along and moved on top, giving the character 5." },
      ],
    },
    {
      id: "arithmetic",
      title: "Subtracting and multiplying",
      summary: "Taking one box from another, and loops inside loops.",
      sections: [
        {
          p: "Subtracting is moving with a minus: <code>[-&gt;-&lt;]</code> takes 1 from both boxes until the first is empty. Here box 0 holds 7 and box 1 holds 3; taking box 1 away from box 0 leaves 4.",
          code: `+++++++>+++    box 0 is 7 and box 1 is 3
[-<->]<        take box 1 away from box 0
>++++++[<++++++++>-]<     add 48
.`,
          out: "4",
        },
        {
          h: "Multiplying",
          p: "To multiply box 0 by box 1, add box 1 into box 2 once for every unit in box 0. Each round copies box 1 (using box 3 as the helper) so it survives for the next round. That is a loop inside a loop.",
          code: `++>++++<       box 0 is 2 and box 1 is 4
[
  >[->+>+<<]   add box 1 to box 2 and box 3
  >>[-<<+>>]   move box 3 back to box 1
  <<<-         one round done
]
>>>++++++[<++++++++>-]<.  box 2 is 8`,
          out: "8",
        },
        {
          h: "Wrapping around",
          p: "Each box holds 0 to 255. Taking 1 from 0 gives 255, and adding 1 to 255 gives 0. Some interpreters do not wrap, so careful programs avoid relying on it.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `+++++++++>++++[-<->]<>++++++[<++++++++>-]<.`, options: ["5", "4", "9", "3"], answer: "5", why: "9 take away 4 is 5, plus 48 is the character 5." },
        { q: "In the multiply program, why is box 1 copied each round?", options: ["Adding it to box 2 would otherwise empty it", "To print it", "To count the rounds", "Box 1 must stay at 0"], answer: "Adding it to box 2 would otherwise empty it", why: "Moving empties the source; copying keeps box 1 ready for the next round." },
        { kind: "output", q: "What does this print?", code: `+++[>+++<-]>>++++++[>++++++++<-]>[-<<+>>]<<.`, options: ["9", "6", "3", "0"], answer: "9", why: "The first loop makes 3 × 3 = 9 in box 1; then 48 is built and added to it." },
        { q: "With wrapping, what is in a box after 0 then -?", options: ["255", "-1", "0", "It stops the program"], answer: "255", why: "Boxes hold 0 to 255 and wrap around at both ends." },
      ],
    },
    {
      id: "loops",
      title: "Counting loops",
      summary: "A counter box, a working box, and loops inside loops.",
      sections: [
        {
          p: "A counting loop keeps the count in one box and does its work in another. Here box 0 counts 5 rounds and box 1 starts at A, printing and growing by one each round.",
          code: `+++++                       box 0 counts 5
>++++++++[>++++++++<-]>+    box 2 is 65 which is A
<<[>>.+<<-]                 print and step five times`,
          out: "ABCDE",
        },
        {
          h: "Counting down",
          p: "The same shape works backwards. Box 0 counts 10 rounds and box 2 starts at the character 9 (57).",
          code: `++++++++++                   box 0 counts 10
>++++++[>++++++++++<-]>---   box 2 is 57
<<[>>.-<<-]`,
          out: "9876543210",
        },
        {
          h: "Rows and columns",
          p: "Put one counting loop inside another to draw a grid. Box 0 counts rows, box 1 holds a star (42), box 2 a new line (10), and box 3 counts the stars on each row.",
          code: `+++                         box 0 counts 3 rows
>>++++++[<+++++++>-]         box 1 is 42
++++++++++                   box 2 is 10
<<[
  >>>++++[<<.>>-]            four stars
  <.                         new line
  <<-
]`,
          out: "****\n****\n****",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `+++>++++++++[>++++++++<-]>+<<[>>.<<-]`, options: ["AAA", "ABC", "A", "CBA"], answer: "AAA", why: "The loop prints box 2 three times but never changes it." },
        { kind: "output", q: "What does this print?", code: `++++>++++++++[>++++++++<-]>++++<<[>>.+<<-]`, options: ["DEFG", "ABCD", "DCBA", "D"], answer: "DEFG", why: "Box 2 starts at 68 (D) and grows by one each of the four rounds." },
        { q: "Why does the grid program use box 3 for the stars on each row?", options: ["Box 3 is refilled every row, while box 0 keeps the row count", "Box 3 holds the star", "Box 3 prints the new line", "It does not need to"], answer: "Box 3 is refilled every row, while box 0 keeps the row count", why: "Each loop needs its own counter, or the inner loop would use up the outer one." },
        { q: "A loop body moves right three times and left twice. What goes wrong?", options: ["The loop checks a different box each round", "Nothing", "It runs one extra time", "The program will not start"], answer: "The loop checks a different box each round", why: "The pointer drifts one box right per round, so ] no longer tests the counter." },
      ],
    },
    {
      id: "decisions",
      title: "Decisions",
      summary: "Doing something only if a box is not zero, and if/else with a flag.",
      sections: [
        {
          p: "brainFOOD has no <code>if</code>, but a loop that empties its own box runs at most once. <code>[ do something [-] ]</code> means “if this box is not 0, do something”. Here box 0 holds 1, so the letter is printed; with 0 it would be skipped.",
          code: `+                            box 0 is 1
>++++++++[>+++++++++++<-]>+  box 2 is 89 which is Y
<<[>>.<<[-]]                 if box 0 then print`,
          out: "Y",
        },
        {
          h: "If and else",
          p: "For an else, keep a <b>flag</b> box set to 1. The “then” part clears the flag; afterwards, a second one-time loop on the flag runs only if the “then” part did not. This program subtracts box 1 from box 0 and says Y if they were equal, N if not. Box 3 holds N and box 4 holds Y.",
          code: `>>++++++++[>++++++++++>+++++++++++<<-]>-->+<<<<
+++++>+++++    box 0 and box 1 are both 5
[-<->]<        box 0 is the difference
>+<            box 1 is the flag
[>>>.<<<[-]>-<]    not zero so print N and clear the flag
>[>>>.<<<-]<       flag still set so print Y`,
          out: "Y",
        },
        {
          h: "Both paths end in the same place",
          p: "Each one-time loop must finish on the box it started from, with that box at 0. Otherwise the program carries on from a different box depending on which way it went, and the rest of the program breaks.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `>++++++++[>+++++++++++<-]>+<<[>>.<<[-]]`, options: ["Nothing", "Y", "YY", "0"], answer: "Nothing", check: "", why: "Box 0 is 0, so the one-time loop is skipped entirely." },
        { kind: "output", q: "What does this print?", code: `>>++++++++[>++++++++++>+++++++++++<<-]>-->+<<<<+++++>+++[-<->]<>+<[>>>.<<<[-]>-<]>[>>>.<<<-]<`, options: ["N", "Y", "NY", "Nothing"], answer: "N", why: "5 take away 3 is 2, not zero, so N is printed and the flag is cleared." },
        { q: "Why does an if-loop end with [-]?", options: ["So the loop runs at most once", "To print the box", "To move the pointer", "To set a flag"], answer: "So the loop runs at most once", why: "Emptying its own box makes the ] check fail, so the loop exits." },
        { q: "What is the flag box for?", options: ["Remembering whether the then part ran, so the else part can be skipped", "Counting rounds", "Holding the answer", "Printing Y"], answer: "Remembering whether the then part ran, so the else part can be skipped", why: "The then part clears the flag; the else part runs only if it is still set." },
      ],
    },
    {
      id: "strings",
      title: "Words in memory",
      summary: "Storing letters in a row of boxes and walking along them.",
      sections: [
        {
          p: "A word can live in a row of boxes with a 0 at each end. <code>[.&gt;]</code> prints boxes and moves right until it reaches a 0; <code>[&lt;]</code> or <code>[.&lt;]</code> goes back the other way. Here one loop builds o, a and k (111, 97, 107) together.",
          code: `++++++++++[>+++++++++++>++++++++++>+++++++++++<<<-]
>+>--->---     boxes 1 to 3 hold o a k
<<[.>]         print forwards until box 4
<[.<]          print backwards until box 0`,
          out: "oakkao",
        },
        {
          h: "Changing every letter",
          p: "Walking a word lets you change each letter. Lowercase letters are 32 above their capitals, so taking 32 from each box shouts the word. The loop stops at the 0 after the last letter.",
          code: `++++++++++[>+++++++++++>++++++++++>+++++++++++<<<-]
>+>--->---<<           o a k again
[-------- -------- -------- -------->]   take 32 from each box
<[<]>[.>]              back to the start and print`,
          out: "OAK",
        },
      ],
      practice: [
        { q: "When does [.>] stop?", options: ["When the pointer reaches a box holding 0", "After 10 boxes", "When it prints a space", "Never"], answer: "When the pointer reaches a box holding 0", why: "The loop test checks the current box; a 0 ends the walk." },
        { kind: "output", q: "What does this print?", code: `++++++++[>++++++++>++++++++<<-]>+>++<[.>]`, options: ["AB", "A", "BA", "@A"], answer: "AB", why: "Boxes 1 and 2 become 65 and 66, and the walk prints both before stopping at box 3." },
        { q: "Why keep a 0 box before the start of a word?", options: ["So a backwards walk like [<] knows where to stop", "Boxes must start at 1", "To hold the length", "So the word prints in capitals"], answer: "So a backwards walk like [<] knows where to stop", why: "Walks stop at 0, so zeros at both ends mark the edges of the word." },
      ],
    },
    {
      id: "alphabet",
      title: "Putting it together: the alphabet",
      summary: "Building numbers with loops and printing a whole sequence.",
      sections: [
        {
          p: "To print the alphabet, a counter of 26 and a letter that starts at A are enough. Building 26 as 5 × 5 + 1 and 65 as 8 × 8 + 1 keeps the program short.",
          code: `+++++[>+++++<-]>+            box 1 counts 26
>>++++++++[<++++++++>-]<+    box 2 is 65
<[>.+<-]                     print and step 26 times`,
          out: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        },
        {
          h: "Where to go next",
          p: "Everything bigger in brainFOOD is built from the patterns in this course: clear, move, copy, count, if and walk. Good next challenges: print the alphabet backwards, print the lowercase alphabet with a new line every 13 letters, or read characters with <code>,</code> and print them in capitals. An online visualiser that shows the row of boxes as the program runs makes debugging much easier.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `+++++>>++++++++[<++++++++>-]<++++++++++++++++++++++++++<[>.-<-]`, options: ["ZYXWV", "ABCDE", "VWXYZ", "Z"], answer: "ZYXWV", why: "Box 1 starts at 90 (Z) and the loop prints it, then takes 1 away, five times." },
        { q: "Which is the shortest way to put 64 in a box?", options: ["A loop of 8 rounds adding 8", "64 plus signs", "A loop of 64 rounds adding 1", "Reading it with ,"], answer: "A loop of 8 rounds adding 8", why: "++++++++[>++++++++<-] is 19 commands instead of 64." },
        { q: "Which pattern prints every box until a 0?", options: ["[.>]", "[-]", "[->+<]", ".+."], answer: "[.>]", why: "Print, move right, and repeat while the box is not 0." },
      ],
    },
  ],
};
