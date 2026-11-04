// JavaScript course for the Programming Learner. Written for this project.
// Examples are complete scripts. tools/run_javascript.py runs them with Node.js
// and checks what console.log prints. They use only the language itself, so
// they behave the same in a browser console.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.javascript = {
  id: "javascript",
  name: "JavaScript",
  title: "JavaScript: the language of the web",
  intro:
    "JavaScript runs in every web browser, so it is the language behind interactive web pages. With Node.js it also runs servers, command-line tools and desktop apps. It was designed in a hurry in 1995 and has some famous oddities, but modern JavaScript, with <code>let</code>, <code>const</code>, arrow functions, classes and <code>async</code>, is a pleasant and very capable language. These lessons teach the language itself, not web pages. Every example is a whole script and shows exactly what it prints. To try one, open your browser's developer console (F12) and paste it in, or save it as <code>hello.js</code> and run <code>node hello.js</code>.",
  comment: "//",
  keywords: [
    "let", "const", "var", "function", "return", "if", "else", "for", "of", "in", "while", "do", "switch", "case", "break",
    "continue", "default", "class", "extends", "new", "this", "super", "async", "await", "true", "false", "null", "undefined",
    "typeof", "try", "catch", "throw", "static",
  ],
  builtins: ["console", "log", "Math", "JSON", "Number", "String", "Array", "Object", "Promise", "setTimeout"],
  lessons: [
    {
      id: "first",
      title: "Your first script",
      summary: "console.log, comments and the three kinds of string.",
      sections: [
        {
          p: "<code>console.log</code> prints its arguments, separated by spaces, and ends the line. <code>//</code> starts a comment to the end of the line, and <code>/* ... */</code> can span lines. Statements usually end with a semicolon.",
          code: `console.log("Hello, squirrel!");
console.log("Nuts:", 42);
// console.log("not shown");`,
          out: "Hello, squirrel!\nNuts: 42",
        },
        {
          h: "Strings",
          p: "Strings can use double quotes, single quotes or backticks. Backtick strings are <b>template literals</b>: <code>${...}</code> inside them is replaced by the value of the expression, and they may span several lines.",
          code: `const name = "Hazel";
const nuts = 3;
console.log('single', "double");
console.log(\`\${name} has \${nuts * 2} nuts\`);`,
          out: "single double\nHazel has 6 nuts",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `console.log("Up", "the", "tree");`, options: ["Up the tree", "Uptheteree", "Up,the,tree", "Up\nthe\ntree"], answer: "Up the tree", why: "console.log puts a space between its arguments." },
        { kind: "output", q: "What does this print?", code: `const n = 4;
console.log(\`\${n} + 1 = \${n + 1}\`);`, options: ["4 + 1 = 5", "n + 1 = n + 1", "4 + 1 = 41", "${n} + 1 = ${n + 1}"], answer: "4 + 1 = 5", why: "Each ${...} is replaced by its value. n + 1 is computed as a number, 5." },
        { q: "Where does JavaScript run?", options: ["In every web browser, and on servers with Node.js", "Only on Windows", "Only inside Java programs", "Only on phones"], answer: "In every web browser, and on servers with Node.js", why: "It is built into browsers, and Node.js runs it outside them. Despite the name, it is not related to Java." },
      ],
    },
    {
      id: "values",
      title: "Values and variables",
      summary: "let and const, numbers, strings, booleans, null and undefined.",
      sections: [
        {
          p: "Declare variables with <code>const</code> when they never get a new value, and <code>let</code> when they do. (Old code uses <code>var</code>, which has looser rules; avoid it.) Values carry their own type, which <code>typeof</code> reports.",
          code: `const tree = "Oak";
let nuts = 10;
nuts = nuts + 5;
console.log(tree, nuts);
console.log(typeof tree, typeof nuts, typeof true);`,
          out: "Oak 15\nstring number boolean",
        },
        {
          h: "One kind of number",
          p: "JavaScript has a single <code>number</code> type, a 64-bit floating-point value, for both whole numbers and fractions. So <code>7 / 2</code> is 3.5, and decimal fractions carry tiny rounding errors. <code>Math.floor</code>, <code>Math.round</code> and <code>toFixed</code> help. Whole numbers are exact up to about 9 × 10<sup>15</sup>; beyond that, use <code>BigInt</code>.",
          code: `console.log(7 / 2);
console.log(Math.floor(7 / 2), 7 % 2);
console.log(0.1 + 0.2);
console.log((0.1 + 0.2).toFixed(2));`,
          out: "3.5\n3 1\n0.30000000000000004\n0.30",
        },
        {
          h: "Nothing, two ways",
          p: "<code>undefined</code> means \"no value was ever given\": a variable declared without a value, or a missing property. <code>null</code> is a value you set on purpose to mean \"empty\".",
          code: `let later;
const box = { nuts: 3 };
console.log(later);
console.log(box.acorns);
console.log(null);`,
          out: "undefined\nundefined\nnull",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `console.log(9 / 2);`, options: ["4.5", "4", "5", "4.0"], answer: "4.5", why: "There is only one number type, so dividing two whole numbers can give a fraction." },
        { kind: "output", q: "What does this print?", code: `console.log(typeof 42, typeof "42");`, options: ["number string", "number number", "string string", "int string"], answer: "number string", why: "42 is a number, while \"42\" in quotes is a string." },
        { kind: "output", q: "What does this print?", code: `const squirrel = { name: "Hazel" };
console.log(squirrel.age);`, options: ["undefined", "null", "0", "An error"], answer: "undefined", why: "Reading a property that does not exist gives undefined, not an error." },
        { q: "When should you use const instead of let?", options: ["When the variable will never be given a new value", "For numbers only", "For global variables only", "Never, they are the same"], answer: "When the variable will never be given a new value", why: "const stops reassignment, which makes code easier to follow. Use let only for values that change." },
      ],
    },
    {
      id: "equality",
      title: "Equality and conversions",
      summary: "=== versus ==, truthy and falsy, and turning text into numbers.",
      sections: [
        {
          p: "<code>===</code> is true only when both sides have the same type and value. <code>==</code> converts types first, which gives surprising results, so modern code uses <code>===</code> and <code>!==</code> almost everywhere.",
          code: `console.log(5 === 5, 5 === "5");
console.log(5 == "5", 0 == "", null == undefined);`,
          out: "true false\ntrue true true",
        },
        {
          h: "Plus joins, minus subtracts",
          p: "If either side of <code>+</code> is a string, it joins strings. The other arithmetic operators always convert to numbers. To convert text on purpose, use <code>Number(...)</code>; it gives <code>NaN</code> (\"not a number\") when the text is not a number.",
          code: `console.log("5" + 3);
console.log("5" - 3);
console.log(Number("42") + 1);
console.log(Number("acorn"));`,
          out: "53\n2\n43\nNaN",
        },
        {
          h: "Truthy and falsy",
          p: "In an <code>if</code>, any value counts as true or false. Only six values are <b>falsy</b>: <code>false</code>, <code>0</code>, <code>\"\"</code> (empty string), <code>null</code>, <code>undefined</code> and <code>NaN</code>. Everything else, including <code>\"0\"</code> and empty arrays, is truthy. <code>??</code> picks a fallback only for <code>null</code> or <code>undefined</code>.",
          code: `for (const v of [0, "0", "", [], null]) {
  console.log(JSON.stringify(v), v ? "truthy" : "falsy");
}
const count = 0;
console.log(count || 10, count ?? 10);`,
          out: "0 falsy\n\"0\" truthy\n\"\" falsy\n[] truthy\nnull falsy\n10 0",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `console.log("2" + 2);`, options: ["22", "4", "NaN", "\"2\"2"], answer: "22", why: "With a string on one side, + joins the two as text." },
        { kind: "output", q: "What does this print?", code: `console.log("10" - 4);`, options: ["6", "104", "NaN", "\"6\""], answer: "6", why: "Minus only works on numbers, so \"10\" is converted to 10 first." },
        { kind: "output", q: "What does this print?", code: `console.log(1 === "1", 1 == "1");`, options: ["false true", "true true", "false false", "true false"], answer: "false true", why: "=== needs the same type, so a number and a string are never equal. == converts first." },
        { kind: "output", q: "What does this print?", code: `const name = "";
console.log(name || "anonymous");`, options: ["anonymous", "\"\"", "undefined", "false"], answer: "anonymous", why: "An empty string is falsy, so || falls back to the right-hand side." },
      ],
    },
    {
      id: "control",
      title: "Decisions and loops",
      summary: "if, switch, for, for...of and while.",
      sections: [
        {
          p: "<code>if (...) { ... } else { ... }</code> and the ternary <code>cond ? a : b</code> make choices. <code>switch</code> compares with <code>===</code>; each <code>case</code> needs a <code>break</code>, or it falls through into the next one.",
          code: `const score = 82;
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("Keep going");
}
const day = "Sat";
switch (day) {
  case "Sat":
  case "Sun":
    console.log("Weekend");
    break;
  default:
    console.log("Weekday");
}`,
          out: "B\nWeekend",
        },
        {
          h: "Loops",
          p: "The classic <code>for (let i = 0; i &lt; n; i++)</code> counts. <code>for (const x of list)</code> walks through the values of an array or string, and is usually what you want. <code>while</code> repeats as long as a condition holds.",
          code: `for (let i = 1; i <= 3; i++) {
  console.log("step", i);
}
for (const tree of ["oak", "elm"]) {
  console.log(tree);
}
let n = 1;
while (n < 20) n *= 2;
console.log(n);`,
          out: "step 1\nstep 2\nstep 3\noak\nelm\n32",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `let total = 0;
for (let i = 1; i <= 4; i++) total += i;
console.log(total);`, options: ["10", "4", "6", "1234"], answer: "10", why: "1 + 2 + 3 + 4 is 10." },
        { kind: "output", q: "What does this print?", code: `const n = 2;
switch (n) {
  case 1: console.log("one");
  case 2: console.log("two");
  case 3: console.log("three");
}`, options: ["two\nthree", "two", "one\ntwo\nthree", "three"], answer: "two\nthree", why: "Without break, a matching case falls through into the cases below it." },
        { kind: "output", q: "What does this print?", code: `const age = 15;
console.log(age >= 18 ? "adult" : "young");`, options: ["young", "adult", "true", "15"], answer: "young", why: "The ternary gives the part after : when the condition is false." },
        { q: "What does for (const x of [1, 2, 3]) give x?", options: ["Each value: 1, then 2, then 3", "Each index: 0, 1, 2", "The whole array", "Nothing, const can't be used in loops"], answer: "Each value: 1, then 2, then 3", why: "for...of gives values. for...in gives keys (indexes, as strings), which is rarely what you want for an array." },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      summary: "Declarations, arrow functions, default parameters and closures.",
      sections: [
        {
          p: "A function can be declared with <code>function</code>, or written as an <b>arrow function</b>: <code>(a, b) =&gt; a + b</code>. An arrow with a single expression returns it without <code>return</code>. Parameters can have default values. Functions are values: you can store them and pass them to other functions.",
          code: `function square(n) {
  return n * n;
}
const add = (a, b) => a + b;
const greet = (name = "friend") => "Hello, " + name;
console.log(square(6), add(2, 3));
console.log(greet(), greet("Hazel"));
const twice = (f, x) => f(f(x));
console.log(twice(square, 3));`,
          out: "36 5\nHello, friend Hello, Hazel\n81",
        },
        {
          h: "Closures",
          p: "A function remembers the variables around it when it was made, even after the outer function has returned. That pairing is a <b>closure</b>, and it is how JavaScript keeps private state.",
          code: `function makeCounter() {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
}
const next = makeCounter();
next();
next();
console.log(next());
const other = makeCounter();
console.log(other());`,
          out: "3\n1",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `const double = (n) => n * 2;
console.log(double(double(5)));`, options: ["20", "10", "25", "52"], answer: "20", why: "double(5) is 10, and doubling that gives 20." },
        { kind: "output", q: "What does this print?", code: `function f(a, b = 10) {
  return a + b;
}
console.log(f(1), f(1, 2));`, options: ["11 3", "1 3", "NaN 3", "11 12"], answer: "11 3", why: "b uses its default of 10 only when no second argument is given." },
        { kind: "output", q: "What does this print?", code: `function makeAdder(x) {
  return (y) => x + y;
}
const addFive = makeAdder(5);
console.log(addFive(10));`, options: ["15", "5", "10", "undefined"], answer: "15", why: "The returned arrow function keeps x = 5 from when it was made: that is a closure." },
        { kind: "output", q: "What does this print?", code: `const f = (n) => { n * 2 };
console.log(f(4));`, options: ["undefined", "8", "4", "An error"], answer: "undefined", why: "With braces the arrow has a body, and the body has no return, so the function returns undefined." },
      ],
    },
    {
      id: "collections",
      title: "Arrays and objects",
      summary: "map, filter and reduce, destructuring, spread and JSON.",
      sections: [
        {
          p: "An array is a list: <code>push</code> adds to the end and <code>length</code> counts. <code>map</code> makes a new array by transforming each item, <code>filter</code> keeps the items that pass a test, and <code>reduce</code> combines them into one value. They leave the original array alone. (The output shows arrays the way Node.js prints them; a browser console shows the same values as a list you can expand.)",
          code: `const nuts = [12, 30, 5];
nuts.push(8);
console.log(nuts.length, nuts[0]);
console.log(nuts.map((n) => n * 2));
console.log(nuts.filter((n) => n > 10));
console.log(nuts.reduce((sum, n) => sum + n, 0));`,
          out: "4 12\n[ 24, 60, 10, 16 ]\n[ 12, 30 ]\n55",
        },
        {
          h: "Objects",
          p: "An object holds named properties. <b>Destructuring</b> pulls values out into variables, and the <b>spread</b> syntax <code>...</code> copies arrays and objects into new ones. <code>JSON.stringify</code> turns data into text, the format web services exchange.",
          code: `const squirrel = { name: "Hazel", nuts: 3 };
squirrel.nuts += 1;
const { name, nuts } = squirrel;
console.log(name, nuts);
const copy = { ...squirrel, tree: "oak" };
console.log(JSON.stringify(copy));
const [first, ...rest] = [1, 2, 3];
console.log(first, rest);`,
          out: "Hazel 4\n{\"name\":\"Hazel\",\"nuts\":4,\"tree\":\"oak\"}\n1 [ 2, 3 ]",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `console.log([1, 2, 3].map((x) => x * 10).join(","));`, options: ["10,20,30", "1,2,3", "60", "[10, 20, 30]"], answer: "10,20,30", why: "map multiplies each item, and join puts the results in one string with commas between them." },
        { kind: "output", q: "What does this print?", code: `const words = ["oak", "pine", "elm", "birch"];
console.log(words.filter((w) => w.length > 3).length);`, options: ["2", "4", "3", "1"], answer: "2", why: "Only pine and birch have more than three letters." },
        { kind: "output", q: "What does this print?", code: `const a = [1, 2];
const b = a;
b.push(3);
console.log(a.length);`, options: ["3", "2", "1", "An error"], answer: "3", why: "b is not a copy: a and b are two names for the same array. Use [...a] to copy." },
        { kind: "output", q: "What does this print?", code: `const { x, y = 5 } = { x: 1 };
console.log(x + y);`, options: ["6", "1", "NaN", "15"], answer: "6", why: "Destructuring can give defaults. y is missing from the object, so it takes 5." },
      ],
    },
    {
      id: "classes-async",
      title: "Classes and async code",
      summary: "class and extends, then promises, async and await.",
      sections: [
        {
          p: "A <code>class</code> bundles data and methods. The <code>constructor</code> runs when you call <code>new</code>, and <code>extends</code> builds on another class, with <code>super</code> calling the parent.",
          code: `class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return this.name + " makes a sound";
  }
}
class Squirrel extends Animal {
  speak() {
    return super.speak() + ": chitter!";
  }
}
const s = new Squirrel("Hazel");
console.log(s.speak());`,
          out: "Hazel makes a sound: chitter!",
        },
        {
          h: "Doing things later",
          p: "JavaScript runs one thing at a time, so slow work (a network request, a timer) is started and finished later instead of blocking. A <b>promise</b> stands for a result that will arrive later. Inside an <code>async</code> function, <code>await</code> pauses that function until the promise settles, while the rest of the program carries on, which is why \"after the call\" prints first below.",
          code: `const wait = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

async function gather() {
  console.log("start gathering");
  const nuts = await wait(10, 12);
  console.log("gathered", nuts);
  return nuts * 2;
}

gather().then((total) => console.log("total", total));
console.log("after the call");`,
          out: "start gathering\nafter the call\ngathered 12\ntotal 24",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `class Box {
  constructor(n) { this.n = n; }
  add(k) { this.n += k; return this; }
}
console.log(new Box(1).add(2).add(3).n);`, options: ["6", "3", "1", "An error"], answer: "6", why: "Each add returns the same box, so the calls chain: 1 + 2 + 3." },
        { kind: "output", q: "What does this print?", code: `setTimeout(() => console.log("A"), 0);
console.log("B");`, options: ["B\nA", "A\nB", "A", "B"], answer: "B\nA", why: "Even a 0 ms timer runs only after the current script has finished." },
        { kind: "output", q: "What does this print?", code: `async function f() {
  return 5;
}
f().then((v) => console.log(v + 1));
console.log("first");`, options: ["first\n6", "6\nfirst", "first\n5", "6"], answer: "first\n6", why: "An async function returns a promise, and .then runs after the current code finishes." },
        { q: "What does await do?", options: ["Pauses the async function until the promise settles", "Stops the whole program", "Makes code run faster", "Turns a number into a promise"], answer: "Pauses the async function until the promise settles", why: "Only that function waits. The rest of the program keeps running." },
      ],
    },
  ],
};
