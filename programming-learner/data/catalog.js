// Languages in the Programming Learner. Order here doesn't matter: the page
// sorts by name inside each group (see ../sections.js).
// Each id has a course in data/<id>.js and matches a ?lang= value the Desk passes in.
// group: "modern" (current languages), "older" (earlier versions and legacy
// languages), "joke" (esoteric) or "tracks" (one topic in several
// languages). tags: category tags for the filter, given for the modern and
// older groups.
window.PROGRAMMING_CATALOG = [
  { id: "brainfood", name: "brainFOOD", era: "Esoteric · 8 commands", blurb: "A row of boxes, a pointer and eight symbols. Tiny, strange and surprisingly powerful.", group: "joke" },
  { id: "c", name: "C", era: "1972 · systems", blurb: "The small language under operating systems and most other languages. Types, loops and functions.", group: "modern", tags: ["Compiled programs"] },
  { id: "cpp", name: "C++", era: "1985 · systems and games", blurb: "C with classes grown up: references, the standard library, RAII and modern C++20.", group: "modern", tags: ["Compiled programs"] },
  { id: "chisel", name: "Chisel", era: "2012 · hardware", blurb: "A hardware construction language in Scala. The program builds a circuit; it does not step through one.", group: "modern", tags: ["Hardware"] },
  { id: "cobol", name: "COBOL", era: "1959 · business data", blurb: "Records, money and plain-English statements. Still runs payments and payroll at banks, insurers and government agencies.", group: "older", tags: ["Compiled programs"] },
  { id: "moderndelphi", name: "Delphi", era: "Today · Embarcadero", blurb: "Current Object Pascal: Unicode strings, generics, records with methods and anonymous methods, for Windows, macOS, Linux and phones.", group: "modern", tags: ["Compiled programs"] },
  { id: "delphi", name: "Delphi 5/6/7", era: "1999–2002 · Windows", blurb: "Object Pascal with drag-and-drop forms. Fast to build real Windows programs.", group: "older", tags: ["Compiled programs"] },
  { id: "fortran", name: "Fortran", era: "1957 · science and engineering", blurb: "The first high-level language, now modern and array-friendly. Still behind weather models, physics codes and fast maths libraries.", group: "older", tags: ["Compiled programs"] },
  { id: "go", name: "Go", era: "2009 · servers", blurb: "A small language for services and tools. One looping keyword, and slices instead of a pile of collection types.", group: "modern", tags: ["Compiled programs"] },
  { id: "intercal", name: "INTERCAL", era: "Esoteric · 1972", blurb: "The first joke language: politeness is mandatory and numbers come out in Roman numerals.", group: "joke" },
  { id: "java", name: "Java", era: "1995 · business and Android", blurb: "Classes, strong types and a huge standard library. Runs bank systems, Android apps and countless university courses.", group: "modern", tags: ["Compiled programs"] },
  { id: "javascript", name: "JavaScript", era: "1995 · the web", blurb: "The language every web browser runs, and with Node.js, servers and tools too. Modern syntax, closures, classes and async.", group: "modern", tags: ["Scripting", "Web"] },
  { id: "lolcode", name: "LOLCODE", era: "Esoteric · 2007", blurb: "A real, working language written in lolcat speak. HAI to KTHXBYE.", group: "joke" },
  { id: "malbolge", name: "Malbolge", era: "Esoteric · 1998", blurb: "Built to be nearly impossible to program, and it rewrites itself as it runs.", group: "joke" },
  { id: "numerical", name: "Numerical methods", era: "Track · Python, C and Fortran", blurb: "How computers find roots, areas and solutions when there is no formula. Each method explained, then built and tested in several languages.", group: "tracks" },
  { id: "piet", name: "Piet", era: "Esoteric · 2001", blurb: "Programs are pictures. Colour changes between blocks are the instructions.", group: "joke" },
  { id: "python", name: "Python", era: "1991 · general purpose", blurb: "A friendly, readable language used everywhere from web servers to science. The full beginner course.", group: "modern", tags: ["Scripting"] },
  { id: "quickbasic", name: "QuickBASIC", era: "1985 · DOS", blurb: "Microsoft's structured BASIC with a full-screen editor. Where many people wrote their first game.", group: "older", tags: ["Compiled programs"] },
  { id: "rust", name: "Rust", era: "2015 · systems", blurb: "A modern systems language. The compiler keeps track of who owns each value.", group: "modern", tags: ["Compiled programs"] },
  { id: "slick", name: "Slick", era: "Experimental · Go in brackets", blurb: "Pascal Costanza's s-expression notation for Go. Same language underneath, Lisp-shaped on the page.", group: "modern", tags: ["Compiled programs"] },
  { id: "turbopascal", name: "Turbo Pascal", era: "1983 · DOS", blurb: "Borland's fast, friendly Pascal with the blue IDE. Where structured programming was learned for a decade.", group: "older", tags: ["Compiled programs"] },
  { id: "whitespace", name: "Whitespace", era: "Esoteric · 2003", blurb: "Only spaces, tabs and newlines mean anything. Everything you can see is a comment.", group: "joke" },
  { id: "win16", name: "Win16", era: "1990–1995 · Windows 3.x", blurb: "C and the 16-bit Windows API: WinMain, the message loop and window procedures.", group: "older", tags: ["Compiled programs"] },
  { id: "z80", name: "Z80 Assembly", era: "1976 · 8-bit CPUs", blurb: "Talk to the processor directly: registers, flags, loops and the stack.", group: "older", tags: ["Assembly"] },
];
