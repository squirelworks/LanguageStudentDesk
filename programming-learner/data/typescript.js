// TypeScript course for the Programming Learner. Written for this project.
// Examples are complete TypeScript files. tools/run_typescript.py checks each
// with tsc in strict mode, runs the compiled JavaScript with node, and checks
// the printed output.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.typescript = {
  id: "typescript",
  name: "TypeScript",
  title: "TypeScript: JavaScript with types",
  intro:
    "TypeScript is JavaScript with type annotations added. Microsoft released it in 2012, and it is now how most large web apps are written, from VS Code itself to the front ends of big sites. You say what kind of value each variable and parameter holds, and the TypeScript compiler, <code>tsc</code>, checks the whole program before it runs: a typo in a property name or a function called with the wrong thing is caught while you type, not by a user. Then <code>tsc</code> removes the types and writes plain JavaScript, so it runs anywhere JavaScript does. These lessons assume you know a little JavaScript (there is a course for that too) and use strict mode, which turns on all the checks. Every example passes the checker and shows exactly what it prints. To run one yourself, install TypeScript with <code>npm install -g typescript</code>, save the example as <code>hello.ts</code>, and type <code>tsc --strict hello.ts && node hello.js</code>.",
  comment: "//",
  keywords: [
    "let", "const", "function", "return", "if", "else", "for", "of", "while", "switch", "case", "default", "type", "interface",
    "class", "new", "extends", "implements", "public", "private", "readonly", "async", "await", "true", "false", "null",
    "undefined", "typeof", "keyof", "as", "never", "unknown", "string", "number", "boolean", "void",
  ],
  builtins: ["console", "log", "Array", "Record", "Partial", "Pick", "Promise", "Math", "JSON", "Map"],
  lessons: [
    {
      id: "first",
      title: "Types on values",
      summary: "Annotations, inference, and what the checker catches.",
      sections: [
        {
          p: "A type annotation goes after a name with a colon: <code>let nuts: number = 7</code>. The basic types are <code>number</code>, <code>string</code> and <code>boolean</code>, and arrays are written <code>number[]</code>. Once a variable has a type, giving it a value of another type is an error that <code>tsc</code> reports before the program runs. Here the commented line would be refused with <i>Type 'string' is not assignable to type 'number'</i>.",
          code: `let nuts: number = 7;
const owner: string = "Hazel";
const hungry: boolean = nuts < 10;
const stash: number[] = [3, 4, 5];
// nuts = "lots";   <- tsc refuses this line
nuts = nuts + stash.length;
console.log(owner, nuts, hungry);`,
          out: "Hazel 10 true",
        },
        {
          h: "Inference",
          p: "You rarely need to write every type. When a variable starts with a value, TypeScript <b>infers</b> its type from that value, so <code>let count = 3</code> is a <code>number</code> without saying so. Hover over a name in an editor like VS Code to see what was inferred. <code>const</code> goes one step further: <code>const day = \"sat\"</code> has the type <code>\"sat\"</code>, the one exact string, because it can never change.",
          code: `let count = 3;
count += 1;
const trees = ["oak", "ash"];
trees.push("hazel");
const day = "sat";
console.log(count, trees.join("/"), day.toUpperCase());
console.log(typeof count, typeof trees, typeof day);`,
          out: "4 oak/ash/hazel SAT\nnumber object string",
        },
        {
          h: "Types disappear when it runs",
          p: "TypeScript's types exist only for the checker. <code>tsc</code> strips them out and the JavaScript that runs has none, so <code>typeof</code> at run time still answers with JavaScript's own small set of names. This also means a type can't check data that arrives while the program runs, such as JSON from a server; the lesson on unions shows how to check such data yourself.",
          code: `type Grams = number;
const weight: Grams = 3;
console.log(typeof weight);
console.log(JSON.stringify({ weight }));`,
          out: "number\n{\"weight\":3}",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `const sizes: number[] = [2, 5, 8];
let total = 0;
for (const s of sizes) {
  total += s;
}
console.log(total, sizes.length);`, options: ["15 3", "258 3", "15 8", "3 15"], answer: "15 3", why: "total is inferred as a number, so += adds. There are three items." },
        { q: "What does tsc do with  let nuts: number = \"lots\";  ?", options: ["Reports a type error", "Converts \"lots\" to a number", "Changes nuts to a string", "Nothing until the line runs"], answer: "Reports a type error", why: "The checker compares the value's type with the annotation before anything runs." },
        { q: "What is the type of day after  const day = \"sat\";  ?", options: ["\"sat\"", "string", "any", "unknown"], answer: "\"sat\"", why: "A const can never change, so TypeScript gives it the exact literal type. With let it would widen to string." },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      summary: "Typed parameters, return types, optional and default parameters.",
      sections: [
        {
          p: "Parameters always need types, because TypeScript can't guess what callers will pass. The return type goes after the brackets; it can usually be inferred, but writing it documents the function and catches a wrong <code>return</code>. A <code>?</code> makes a parameter optional, and a default value does the same while giving it a value.",
          code: `function share(nuts: number, squirrels: number = 2): number {
  return Math.floor(nuts / squirrels);
}

function label(tree: string, count?: number): string {
  if (count === undefined) {
    return tree;
  }
  return tree + " x" + count;
}

console.log(share(10), share(10, 3));
console.log(label("oak"), label("ash", 4));`,
          out: "5 3\noak ash x4",
        },
        {
          h: "Functions as values",
          p: "A function's type is written like an arrow: <code>(n: number) =&gt; number</code> is a function that takes a number and returns one. Passing a function with the wrong shape is an error. In arrow functions passed straight to something like <code>map</code>, TypeScript already knows the parameter type, so you can leave it off.",
          code: `function twice(f: (n: number) => number, x: number): number {
  return f(f(x));
}

const triple = (n: number) => n * 3;
console.log(twice(triple, 2));
const lengths = ["oak", "beech", "ash"].map((t) => t.length);
console.log(lengths);`,
          out: "18\n[ 3, 5, 3 ]",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `function greet(who: string, greeting = "Hello"): string {
  return greeting + ", " + who;
}
console.log(greet("Hazel"));
console.log(greet("Acorn", "Hi"));`, options: ["Hello, Hazel\nHi, Acorn", "Hello, Hazel\nHello, Acorn", "Hazel, Hello\nAcorn, Hi", "undefined, Hazel\nHi, Acorn"], answer: "Hello, Hazel\nHi, Acorn", why: "The default is used when the second argument is left out. greeting's type, string, is inferred from the default." },
        { q: "In  label(tree: string, count?: number) , what is count's type inside the function?", options: ["number | undefined", "number", "any", "optional"], answer: "number | undefined", why: "An optional parameter may be missing, so TypeScript makes you handle undefined before treating it as a number." },
      ],
    },
    {
      id: "objects",
      title: "Object types",
      summary: "type and interface, optional and readonly properties, structural typing.",
      sections: [
        {
          p: "An object's type lists its properties and their types. You can name one with <code>type</code> or with <code>interface</code>; for plain object shapes they work almost the same. <code>?</code> marks a property that may be missing and <code>readonly</code> one that can't be changed after the object is made. Misspelling a property, or leaving out a required one, is an error.",
          code: `interface Squirrel {
  readonly name: string;
  nuts: number;
  favouriteTree?: string;
}

const hazel: Squirrel = { name: "Hazel", nuts: 3 };
hazel.nuts += 4;
// hazel.name = "Bob";   <- error: name is readonly
// hazel.nutz = 1;       <- error: no property nutz
console.log(hazel.name, hazel.nuts, hazel.favouriteTree ?? "any tree");`,
          out: "Hazel 7 any tree",
        },
        {
          h: "Shapes, not names",
          p: "TypeScript compares types by their <b>shape</b>: any object with the right properties fits, whatever it was called or wherever it came from. This is called <b>structural typing</b>, and it matches how JavaScript code already passes plain objects around.",
          code: `type Point = { x: number; y: number };

function distance(p: Point): number {
  return Math.sqrt(p.x * p.x + p.y * p.y);
}

const nest = { x: 3, y: 4, tree: "oak" };
console.log(distance(nest));
console.log(distance({ x: 6, y: 8 }));`,
          out: "5\n10",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `interface Nut {
  kind: string;
  grams?: number;
}
const nuts: Nut[] = [{ kind: "hazel", grams: 3 }, { kind: "acorn" }];
let total = 0;
for (const n of nuts) {
  total += n.grams ?? 1;
}
console.log(total);`, options: ["4", "3", "NaN", "31"], answer: "4", why: "The acorn has no grams, so ?? gives 1 in its place: 3 + 1." },
        { q: "Why can nest, which has a tree property too, be passed where a Point is expected?", options: ["It has x and y numbers, and that is all Point asks for", "Extra properties are deleted first", "Point was declared with any", "It can't; that line is an error"], answer: "It has x and y numbers, and that is all Point asks for", why: "Structural typing checks that the needed properties are there. Only an object literal written straight into the call gets an extra check for unknown properties." },
      ],
    },
    {
      id: "unions",
      title: "Unions and narrowing",
      summary: "A | B, literal types, narrowing with typeof and tags, never.",
      sections: [
        {
          p: "A <b>union</b> type, written <code>string | number</code>, means the value is one of those types. Before you can use something only one of them has, you must check which it is. TypeScript follows your <code>if</code> and <code>typeof</code> checks and <b>narrows</b> the type inside each branch.",
          code: `function describe(v: string | number): string {
  if (typeof v === "string") {
    return "text of length " + v.length;
  }
  return "number doubled is " + v * 2;
}

console.log(describe("acorn"));
console.log(describe(21));`,
          out: "text of length 5\nnumber doubled is 42",
        },
        {
          h: "Tagged unions",
          p: "Unions of string literals, like <code>\"spring\" | \"autumn\"</code>, list every allowed value. Give each kind of object a <code>kind</code> property with its own literal, and a <code>switch</code> on <code>kind</code> narrows to the right shape. Assigning the leftover value to <code>never</code> in the <code>default</code> branch makes the checker tell you if a new kind is added and not handled.",
          code: `type Shape =
  | { kind: "circle"; r: number }
  | { kind: "rect"; w: number; h: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.round(Math.PI * s.r * s.r);
    case "rect":
      return s.w * s.h;
    default: {
      const unhandled: never = s;
      return unhandled;
    }
  }
}

console.log(area({ kind: "circle", r: 2 }));
console.log(area({ kind: "rect", w: 3, h: 4 }));`,
          out: "13\n12",
        },
        {
          h: "Checking outside data",
          p: "Data parsed at run time, such as JSON, has no checked type. Give it the type <code>unknown</code>, which allows nothing until you check it, and narrow it step by step. A function whose return type is <code>v is Nut</code> is a <b>type guard</b>: when it returns true, TypeScript treats the value as a <code>Nut</code> from then on.",
          code: `interface Nut { kind: string; grams: number }

function isNut(v: unknown): v is Nut {
  return typeof v === "object" && v !== null &&
    typeof (v as Nut).kind === "string" && typeof (v as Nut).grams === "number";
}

const raw: unknown[] = JSON.parse('[{"kind":"hazel","grams":3},{"kind":"acorn"}]');
for (const item of raw) {
  console.log(isNut(item) ? item.kind + " " + item.grams + "g" : "skipped bad record");
}`,
          out: "hazel 3g\nskipped bad record",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `function size(v: string | string[]): number {
  if (Array.isArray(v)) {
    return v.length * 10;
  }
  return v.length;
}
console.log(size("oak"), size(["oak", "ash"]));`, options: ["3 20", "3 2", "30 20", "3 6"], answer: "3 20", why: "Array.isArray narrows v to string[] in the if branch, so the list of two gives 2 * 10." },
        { q: "What is unknown good for?", options: ["Values whose type must be checked before use", "Turning off type checking", "Values that are always null", "Functions that never return"], answer: "Values whose type must be checked before use", why: "unknown accepts any value but lets you do nothing with it until you narrow it. any skips the checks entirely." },
      ],
    },
    {
      id: "generics",
      title: "Generics",
      summary: "Type parameters, Array<T>, Record and the utility types.",
      sections: [
        {
          p: "A <b>generic</b> function has a type parameter in angle brackets, <code>&lt;T&gt;</code>, standing for whatever type the caller uses. The return type can then depend on it: <code>first</code> of a <code>string[]</code> is a <code>string</code>, and of a <code>number[]</code> a <code>number</code>. TypeScript usually infers <code>T</code> from the arguments.",
          code: `function first<T>(items: T[]): T | undefined {
  return items[0];
}

function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

const tree = first(["oak", "ash"]);
const n = first([30, 12]);
console.log(tree?.toUpperCase(), (n ?? 0) + 1);
const [who, count] = pair("Hazel", 7);
console.log(who.length, count * 2);`,
          out: "OAK 31\n5 14",
        },
        {
          h: "Built-in generic types",
          p: "Many built-in types are generic. <code>Array&lt;T&gt;</code> is another way to write <code>T[]</code>, <code>Map&lt;K, V&gt;</code> maps keys to values, and <code>Record&lt;K, V&gt;</code> is an object with keys of type <code>K</code>. The <b>utility types</b> build new types from old ones: <code>Partial&lt;T&gt;</code> makes every property optional and <code>Pick&lt;T, K&gt;</code> keeps only some.",
          code: `interface Squirrel { name: string; nuts: number; tree: string }

const stash: Record<string, number> = { oak: 4, hazel: 9 };
stash["beech"] = 2;
console.log(Object.keys(stash).length);

function update(s: Squirrel, changes: Partial<Squirrel>): Squirrel {
  return { ...s, ...changes };
}
const hazel: Squirrel = { name: "Hazel", nuts: 3, tree: "oak" };
console.log(update(hazel, { nuts: 8 }).nuts);

type Badge = Pick<Squirrel, "name" | "tree">;
const badge: Badge = { name: "Acorn", tree: "ash" };
console.log(badge.name + " of the " + badge.tree);`,
          out: "3\n8\nAcorn of the ash",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `function last<T>(items: T[]): T {
  return items[items.length - 1];
}
console.log(last([1, 2, 3]) * 10);
console.log(last(["x", "y"]).repeat(2));`, options: ["30\nyy", "10\nxx", "30\ny2", "3\nyy"], answer: "30\nyy", why: "T is number for the first call and string for the second, so * and repeat both type-check." },
        { q: "What does Partial<Squirrel> describe?", options: ["An object with any of Squirrel's properties, all optional", "Half of a Squirrel's properties", "A Squirrel with no properties", "A Squirrel that can't be changed"], answer: "An object with any of Squirrel's properties, all optional", why: "Partial adds ? to every property, which suits a list of changes." },
      ],
    },
    {
      id: "classes",
      title: "Classes and async code",
      summary: "Access modifiers, implements, and typed promises.",
      sections: [
        {
          p: "Classes work as in JavaScript, with types added. <code>private</code> fields can be used only inside the class, and the checker enforces it. Writing <code>private</code> or <code>readonly</code> before a constructor parameter declares the field and fills it in one step. <code>implements</code> checks that a class has everything an interface asks for.",
          code: `interface Animal {
  sound(): string;
}

class Squirrel implements Animal {
  private nuts = 0;
  constructor(readonly name: string) {}

  gather(found: number): this {
    this.nuts += found;
    return this;
  }
  sound(): string {
    return this.name + " says chitter (" + this.nuts + " nuts)";
  }
}

const s = new Squirrel("Hazel").gather(3).gather(4);
// s.nuts = 99;   <- error: nuts is private
console.log(s.sound());`,
          out: "Hazel says chitter (7 nuts)",
        },
        {
          h: "Promises and async",
          p: "An <code>async</code> function returns a <code>Promise</code>, and its type says what the promise will hold: <code>Promise&lt;number&gt;</code>. <code>await</code> waits for it and gives you the number. <code>Promise.all</code> waits for several at once and keeps their types in order.",
          code: `function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function countNuts(tree: string): Promise<number> {
  await wait(10);
  return tree.length;
}

async function main(): Promise<void> {
  const oak = await countNuts("oak");
  const [ash, hazel] = await Promise.all([countNuts("ash"), countNuts("hazel")]);
  console.log(oak + ash + hazel);
}

main();`,
          out: "11",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `class Counter {
  private count = 0;
  tick(): number {
    return ++this.count;
  }
}
const a = new Counter();
const b = new Counter();
a.tick();
console.log(a.tick(), b.tick());`, options: ["2 1", "1 1", "2 2", "1 2"], answer: "2 1", why: "Each object has its own private count. a has ticked twice and b once." },
        { kind: "output", q: "What does this print?", code: `async function seeds(): Promise<number> {
  return 4;
}
async function main() {
  const n = await seeds();
  console.log(n + 1);
}
main();
console.log("first");`, options: ["first\n5", "5\nfirst", "first\n41", "5"], answer: "first\n5", why: "main runs up to the await and then lets the rest of the script go on, so \"first\" prints before the awaited result." },
      ],
    },
  ],
};
