// Delphi course for the Programming Learner. Written for this project.
// Schema: see data/python.js. Complete console programs with `out` (and
// practice of kind "output") are compiled and run by tools/check_packs.py
// through tools/run_delphi.py, which uses Free Pascal's Delphi mode. Code
// sticks to what Delphi 7 itself accepts.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.delphi = {
  id: "delphi",
  name: "Delphi 5/6/7",
  title: "Object Pascal and the VCL",
  intro:
    "Delphi paired the Object Pascal language with a form designer: drop a button on a window, double-click it, and type what should happen. Versions 5, 6 and 7 were the classic Windows releases, and Delphi 7 in particular stayed in use for years. This course teaches the language with small console programs first, then classes, exceptions and finally forms. To run the console programs, choose File → New → Other → Console Application in Delphi, or use Free Pascal (<code>fpc -Mdelphi file.pas</code>) or the Lazarus IDE, which run almost the same code today on Windows, Linux and macOS. Every console example shows exactly what it prints.",
  comment: "//",
  caseInsensitive: true,
  keywords: [
    "PROGRAM", "UNIT", "INTERFACE", "IMPLEMENTATION", "USES", "TYPE", "CLASS", "RECORD", "VAR", "CONST", "OUT", "BEGIN", "END", "PROCEDURE",
    "FUNCTION", "IF", "THEN", "ELSE", "FOR", "TO", "DOWNTO", "DO", "WHILE", "REPEAT", "UNTIL", "CASE", "OF", "TRY", "EXCEPT", "ON",
    "FINALLY", "RAISE", "NIL", "TRUE", "FALSE", "AND", "OR", "XOR", "NOT", "DIV", "MOD", "IN", "IS", "AS", "PRIVATE", "PROTECTED", "PUBLIC", "PUBLISHED", "PROPERTY",
    "READ", "WRITE", "CONSTRUCTOR", "DESTRUCTOR", "INHERITED", "OVERRIDE", "VIRTUAL", "ABSTRACT", "OVERLOAD", "RESULT", "SELF", "INTEGER", "STRING",
    "BOOLEAN", "DOUBLE", "CHAR", "ARRAY", "SET",
  ],
  builtins: [
    "WRITELN", "WRITE", "READLN", "SHOWMESSAGE", "INTTOSTR", "STRTOINT", "STRTOINTDEF", "FLOATTOSTR", "FORMAT", "LENGTH", "COPY", "POS", "INSERT", "DELETE",
    "UPPERCASE", "LOWERCASE", "TRIM", "STRINGOFCHAR", "FREEANDNIL", "INC", "DEC", "ORD", "CHR", "LOW", "HIGH", "SETLENGTH", "BREAK", "CONTINUE", "EXIT", "EXCEPTION",
  ],
  lessons: [
    {
      id: "pascal",
      title: "Pascal basics",
      summary: "Programs, var blocks, := and WriteLn.",
      sections: [
        {
          p: "A console program starts with <code>program Name;</code>. <code>{$APPTYPE CONSOLE}</code> tells Delphi to open a text window. Variables are declared with their types in a <code>var</code> block before <code>begin</code>. Assignment is <code>:=</code>; a single <code>=</code> compares. Statements are separated by semicolons, and the program ends with <code>end.</code> (with a full stop).",
          code: `program Stash;
{$APPTYPE CONSOLE}
var
  nuts: Integer;
  name: string;
begin
  name := 'Hazel';
  nuts := 12;
  nuts := nuts + 3;
  WriteLn(name, ' has ', nuts, ' nuts');
end.`,
          out: "Hazel has 15 nuts",
        },
        {
          h: "Write and WriteLn",
          p: "<code>WriteLn</code> prints its arguments one after another and then starts a new line; <code>Write</code> stays on the same line. Text goes in <b>single</b> quotes; to put a quote inside, double it.",
          code: `program Lines;
{$APPTYPE CONSOLE}
begin
  Write('Up ');
  Write('the ');
  WriteLn('tree');
  WriteLn('It''s mine');
  WriteLn;
  WriteLn(6 * 7);
end.`,
          out: "Up the tree\nIt's mine\n\n42",
        },
        {
          h: "Comments",
          p: "<code>//</code> comments to the end of the line. <code>{ ... }</code> and <code>(* ... *)</code> can cover several lines. A brace followed by <code>$</code>, like <code>{$APPTYPE CONSOLE}</code>, is not a comment but an instruction to the compiler.",
          code: `program Notes;
{$APPTYPE CONSOLE}
{ This program
  prints one line. }
begin
  WriteLn('Only this'); // the rest is ignored
end.`,
          out: "Only this",
        },
        {
          h: "Case does not matter",
          p: "Pascal ignores upper and lower case in names: <code>WriteLn</code>, <code>writeln</code> and <code>WRITELN</code> are the same, and so are <code>nuts</code> and <code>Nuts</code>. Delphi programmers usually write keywords in lower case and names in CamelCase.",
        },
      ],
      practice: [
        { q: "How do you assign 5 to x?", options: ["x := 5;", "x = 5;", "x <- 5;", "let x = 5;"], answer: "x := 5;", why: "Pascal uses := for assignment and = for comparison." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
begin
  Write('A');
  Write('B');
  WriteLn('C');
end.`, options: ["ABC", "A\nB\nC", "AB\nC", "A B C"], answer: "ABC", why: "Write does not start a new line, so all three letters share one line." },
        { q: "How does a program end?", options: ["end.", "end;", "stop;", "return;"], answer: "end.", why: "The main block ends with end and a full stop; other blocks end with end;." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
var
  a: Integer;
begin
  a := 4;
  a := a * a;
  WriteLn('a=', a);
end.`, options: ["a=16", "a=8", "a= 16", "16"], answer: "a=16", why: "a becomes 4 × 4, and WriteLn puts the number straight after the text." },
        { q: "Where are variables declared?", options: ["In a var block before begin", "Anywhere in the code", "Only inside functions", "They are never declared"], answer: "In a var block before begin", why: "Pascal wants every variable named, with its type, before the code that uses it." },
        { q: "How do you write the text Don't in Pascal?", options: ["'Don''t'", "\"Don't\"", "'Don\\'t'", "'Don't'"], answer: "'Don''t'", why: "Strings use single quotes, and a quote inside is written twice." },
      ],
    },
    {
      id: "types",
      title: "Types and formatting",
      summary: "Integer, Double, Boolean, Char and string; constants and Format.",
      sections: [
        {
          p: "Every variable has a fixed type. The everyday ones are <code>Integer</code> (whole numbers), <code>Double</code> (decimals), <code>Boolean</code> (<code>True</code> or <code>False</code>), <code>Char</code> (one character) and <code>string</code>. Putting text into an Integer is a compile error, not a surprise at run time.",
          code: `program Kinds;
{$APPTYPE CONSOLE}
var
  count: Integer;
  ready: Boolean;
  first: Char;
begin
  count := 7;
  ready := count > 5;
  first := 'Q';
  WriteLn(count, ' ', ready, ' ', first);
end.`,
          out: "7 TRUE Q",
        },
        {
          h: "Dividing",
          p: "<code>/</code> always gives a <code>Double</code>. For whole numbers use <code>div</code> (division without remainder) and <code>mod</code> (the remainder). To print a Double neatly, add a width and a number of decimals: <code>x:0:2</code> means “as wide as needed, two decimals”.",
          code: `program Divide;
{$APPTYPE CONSOLE}
var
  x: Double;
begin
  WriteLn(17 div 5, ' ', 17 mod 5);
  x := 17 / 5;
  WriteLn(x:0:2);
  WriteLn((1 / 3):0:4);
end.`,
          out: "3 2\n3.40\n0.3333",
        },
        {
          h: "Constants",
          p: "A <code>const</code> block names values that never change. The compiler works out their type.",
          code: `program Consts;
{$APPTYPE CONSOLE}
const
  TreeCount = 3;
  Greeting = 'Hello';
begin
  WriteLn(Greeting, ', ', TreeCount, ' trees');
end.`,
          out: "Hello, 3 trees",
        },
        {
          h: "Converting and Format",
          p: "<code>IntToStr</code> and <code>StrToInt</code> convert between numbers and text; they live in the <code>SysUtils</code> unit, which the <code>uses</code> line brings in. <code>Format</code> fills a pattern: <code>%d</code> for an integer, <code>%s</code> for a string, <code>%.2f</code> for a decimal with two places.",
          code: `program Fmt;
{$APPTYPE CONSOLE}
uses SysUtils;
var
  s: string;
begin
  s := 'Total: ' + IntToStr(40 + 2);
  WriteLn(s);
  WriteLn(StrToInt('12') * 2);
  WriteLn(Format('%s has %d nuts weighing %.2f kg', ['Hazel', 12, 0.5]));
end.`,
          out: "Total: 42\n24\nHazel has 12 nuts weighing 0.50 kg",
        },
        {
          h: "Characters are numbers",
          p: "<code>Ord</code> gives a character's code and <code>Chr</code> turns a code back into a character. <code>Inc</code> and <code>Dec</code> add or take one.",
          code: `program Codes;
{$APPTYPE CONSOLE}
var
  c: Char;
begin
  c := 'A';
  WriteLn(Ord(c));
  Inc(c);
  WriteLn(c, Chr(Ord(c) + 1));
end.`,
          out: "65\nBC",
        },
      ],
      practice: [
        { q: "What is 17 div 5?", options: ["3", "2", "3.4", "4"], answer: "3", why: "div is whole-number division; mod would give the remainder, 2." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
begin
  WriteLn(20 mod 6);
end.`, options: ["2", "3", "3.33", "14"], answer: "2", why: "6 fits into 20 three times with 2 left over." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
begin
  WriteLn((7 / 2):0:1);
end.`, options: ["3.5", "3", "4", "3.50"], answer: "3.5", why: "/ gives a Double, and :0:1 prints it with one decimal." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
var
  b: Boolean;
begin
  b := 3 > 4;
  WriteLn(b);
end.`, options: ["FALSE", "TRUE", "0", "False"], answer: "FALSE", why: "3 > 4 is false; WriteLn spells Booleans in capitals." },
        { q: "What happens with x: Integer; x := 'five';?", options: ["The program does not compile", "x becomes 5", "x becomes 0", "It crashes when run"], answer: "The program does not compile", why: "Pascal checks types when it compiles, so a string cannot go into an Integer." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
uses SysUtils;
begin
  WriteLn(Format('[%d|%s]', [7, 'oak']));
end.`, options: ["[7|oak]", "[%d|%s]", "[7, oak]", "[ 7|oak]"], answer: "[7|oak]", why: "Format replaces %d with the integer and %s with the string, in order." },
      ],
    },
    {
      id: "decisions",
      title: "Decisions",
      summary: "if/then/else, begin…end blocks, and/or/not, and case.",
      sections: [
        {
          p: "<code>if condition then statement else statement</code>. To do several things, wrap them in <code>begin … end</code>. There is <b>no semicolon before else</b>: the whole if/else is one statement.",
          code: `program Weather;
{$APPTYPE CONSOLE}
var
  temp: Integer;
begin
  temp := 4;
  if temp < 0 then
    WriteLn('Freezing')
  else if temp < 10 then
  begin
    WriteLn('Chilly');
    WriteLn('Take a scarf');
  end
  else
    WriteLn('Mild');
end.`,
          out: "Chilly\nTake a scarf",
        },
        {
          h: "and, or, not need brackets",
          p: "<code>and</code> and <code>or</code> bind more tightly than comparisons, so each comparison needs its own brackets: <code>(age &gt; 9) and (age &lt; 20)</code>. Not-equal is <code>&lt;&gt;</code>.",
          code: `program Ages;
{$APPTYPE CONSOLE}
var
  age: Integer;
begin
  age := 12;
  if (age > 9) and (age < 20) then WriteLn('Teen-ish');
  if (age < 5) or (age > 65) then WriteLn('Free') else WriteLn('Pay');
  if not (age = 12) then WriteLn('Not twelve') else WriteLn('Twelve');
end.`,
          out: "Teen-ish\nPay\nTwelve",
        },
        {
          h: "case",
          p: "<code>case</code> picks a branch by an ordinal value: an integer, a character or an enumeration (not a string). Branches can list values and ranges.",
          code: `program Grades;
{$APPTYPE CONSOLE}
var
  score: Integer;
begin
  score := 72;
  case score div 10 of
    9, 10: WriteLn('A');
    7..8:  WriteLn('B');
    5..6:  WriteLn('C');
  else
    WriteLn('Try again');
  end;
end.`,
          out: "B",
        },
        {
          h: "Sets of characters",
          p: "<code>c in ['a'..'z']</code> tests whether a character is in a set, which is shorter than several comparisons.",
          code: `program Kind;
{$APPTYPE CONSOLE}
var
  c: Char;
begin
  c := '7';
  if c in ['0'..'9'] then WriteLn('digit')
  else if c in ['a'..'z', 'A'..'Z'] then WriteLn('letter')
  else WriteLn('other');
end.`,
          out: "digit",
        },
      ],
      practice: [
        { q: "What is wrong with: if x > 1 then WriteLn('a'); else WriteLn('b');", options: ["The semicolon before else", "else needs begin", "WriteLn needs brackets", "Nothing"], answer: "The semicolon before else", why: "A semicolon ends the if statement, so the else has nothing to belong to." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
var
  n: Integer;
begin
  n := 15;
  if n > 20 then WriteLn('big')
  else if n > 10 then WriteLn('medium')
  else WriteLn('small');
end.`, options: ["medium", "big", "small", "medium\nsmall"], answer: "medium", why: "The first test fails, the second passes, and the rest is skipped." },
        { q: "Why write (a > 1) and (b > 1) with brackets?", options: ["and binds tighter than >, so it would try 1 and b first", "Brackets are optional style", "and only works on Booleans in brackets", "To make it run faster"], answer: "and binds tighter than >, so it would try 1 and b first", why: "Without brackets Pascal reads a > (1 and b) > 1, which is not what you meant." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
var
  d: Integer;
begin
  d := 6;
  case d of
    1..5: WriteLn('weekday');
    6, 7: WriteLn('weekend');
  end;
end.`, options: ["weekend", "weekday", "weekday\nweekend", "Nothing"], answer: "weekend", why: "6 is in the list 6, 7." },
        { q: "Which can a case statement switch on?", options: ["A Char", "A string", "A Double", "An array"], answer: "A Char", why: "case needs an ordinal type: integers, characters, Booleans or enumerations." },
      ],
    },
    {
      id: "loops",
      title: "Loops",
      summary: "for to/downto, while, repeat…until, Break and Continue.",
      sections: [
        {
          p: "<code>for</code> counts with <code>to</code> or <code>downto</code>, one step at a time. The loop variable must be a local ordinal variable, and you must not change it inside the loop.",
          code: `program Count;
{$APPTYPE CONSOLE}
var
  i: Integer;
begin
  for i := 1 to 3 do
  begin
    if i mod 2 = 1 then
      WriteLn(i, ' is odd')
    else
      WriteLn(i, ' is even');
  end;
  for i := 3 downto 1 do Write(i, ' ');
  WriteLn('go!');
end.`,
          out: "1 is odd\n2 is even\n3 is odd\n3 2 1 go!",
        },
        {
          h: "while and repeat",
          p: "<code>while</code> tests before each round, so it may run zero times. <code>repeat … until</code> tests after, so it always runs at least once, and it needs no <code>begin … end</code>.",
          code: `program Grow;
{$APPTYPE CONSOLE}
var
  n: Integer;
begin
  n := 1;
  while n < 100 do
    n := n * 3;
  WriteLn(n);
  n := 50;
  repeat
    n := n + 10;
  until n > 5;
  WriteLn(n);
end.`,
          out: "243\n60",
        },
        {
          h: "Break and Continue",
          p: "<code>Break</code> leaves the loop at once. <code>Continue</code> skips the rest of this round and goes on to the next.",
          code: `program Skip;
{$APPTYPE CONSOLE}
var
  i: Integer;
begin
  for i := 1 to 10 do
  begin
    if i mod 3 = 0 then Continue;
    if i > 7 then Break;
    Write(i, ' ');
  end;
  WriteLn;
end.`,
          out: "1 2 4 5 7",
        },
        {
          h: "Running totals",
          p: "A variable outside the loop collects a result. Set it to 0 first. Variables in the main program's var block start at 0, but variables declared inside a procedure or function start with whatever happened to be in memory, so setting them is a good habit everywhere.",
          code: `program Sum;
{$APPTYPE CONSOLE}
var
  i, total: Integer;
begin
  total := 0;
  for i := 1 to 100 do
    total := total + i;
  WriteLn(total);
end.`,
          out: "5050",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
var
  i: Integer;
begin
  for i := 2 to 5 do Write(i);
  WriteLn;
end.`, options: ["2345", "234", "2 3 4 5", "12345"], answer: "2345", why: "The loop includes both ends, and Write adds no spaces." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
var
  n: Integer;
begin
  n := 10;
  while n < 5 do n := n + 1;
  WriteLn(n);
end.`, options: ["10", "5", "11", "4"], answer: "10", why: "The test fails straight away, so the body never runs." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
var
  n: Integer;
begin
  n := 10;
  repeat n := n + 1 until n > 5;
  WriteLn(n);
end.`, options: ["11", "10", "6", "5"], answer: "11", why: "repeat runs the body once before testing." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
var
  i: Integer;
begin
  for i := 1 to 5 do
  begin
    if i = 3 then Break;
    Write(i);
  end;
  WriteLn;
end.`, options: ["12", "123", "1245", "12345"], answer: "12", why: "Break leaves the loop as soon as i reaches 3." },
        { q: "Why set total := 0 before the loop?", options: ["Variables inside routines do not start at 0 by themselves", "for loops need it", "Otherwise total is a string", "It is only style"], answer: "Variables inside routines do not start at 0 by themselves", why: "Pascal does not clear variables declared in a procedure or function, so they hold leftover values until you set them." },
      ],
    },
    {
      id: "routines",
      title: "Procedures and functions",
      summary: "Result, parameters by value, var and const, and local variables.",
      sections: [
        {
          p: "A <code>procedure</code> does something; a <code>function</code> returns a value by assigning to the built-in <code>Result</code> variable. They are declared before the main <code>begin</code>, and can have their own <code>var</code> block.",
          code: `program Squares;
{$APPTYPE CONSOLE}

function Square(n: Integer): Integer;
begin
  Result := n * n;
end;

procedure Banner(const title: string);
begin
  WriteLn('== ', title, ' ==');
end;

begin
  Banner('Squares');
  WriteLn(Square(9));
  WriteLn(Square(Square(2)));
end.`,
          out: "== Squares ==\n81\n16",
        },
        {
          h: "var parameters",
          p: "Normally a routine gets a copy of each argument. Mark a parameter <code>var</code> and it works on the caller's own variable instead. <code>const</code> promises not to change it, which lets Delphi skip the copy for strings.",
          code: `program Swaps;
{$APPTYPE CONSOLE}

procedure AddOne(n: Integer);
begin
  n := n + 1;
end;

procedure AddOneVar(var n: Integer);
begin
  n := n + 1;
end;

var
  x: Integer;
begin
  x := 1;
  AddOne(x);
  WriteLn(x);
  AddOneVar(x);
  WriteLn(x);
end.`,
          out: "1\n2",
        },
        {
          h: "Exit and Result",
          p: "<code>Exit</code> leaves a routine straight away. In a function, set <code>Result</code> first: whatever it holds is the answer.",
          code: `program Signs;
{$APPTYPE CONSOLE}

function Sign(n: Integer): string;
begin
  Result := 'zero';
  if n = 0 then Exit;
  if n > 0 then Result := 'plus' else Result := 'minus';
end;

begin
  WriteLn(Sign(5), ' ', Sign(-2), ' ', Sign(0));
end.`,
          out: "plus minus zero",
        },
        {
          h: "Recursion",
          p: "A function can call itself, as long as some case stops it.",
          code: `program Fact;
{$APPTYPE CONSOLE}

function Factorial(n: Integer): Integer;
begin
  if n <= 1 then
    Result := 1
  else
    Result := n * Factorial(n - 1);
end;

begin
  WriteLn(Factorial(5));
  WriteLn(Factorial(10));
end.`,
          out: "120\n3628800",
        },
      ],
      practice: [
        { q: "How does a function hand back its value?", options: ["Assign to Result", "return value;", "Print it", "Assign to Self"], answer: "Assign to Result", why: "Every Delphi function has an implicit Result variable." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}

function Twice(n: Integer): Integer;
begin
  Result := n * 2;
end;

begin
  WriteLn(Twice(Twice(3)));
end.`, options: ["12", "6", "9", "3"], answer: "12", why: "The inner call gives 6 and the outer call doubles it." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}

procedure Zero(var n: Integer);
begin
  n := 0;
end;

var
  a: Integer;
begin
  a := 5;
  Zero(a);
  WriteLn(a);
end.`, options: ["0", "5", "50", "An error"], answer: "0", why: "A var parameter is the caller's own variable, so a becomes 0." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}

procedure Zero(n: Integer);
begin
  n := 0;
end;

var
  a: Integer;
begin
  a := 5;
  Zero(a);
  WriteLn(a);
end.`, options: ["5", "0", "50", "An error"], answer: "5", why: "Without var the procedure works on a copy; a is untouched." },
        { q: "What does const in front of a parameter promise?", options: ["The routine will not change it", "It is a constant number", "It is passed by var", "It must be a literal"], answer: "The routine will not change it", why: "The compiler refuses changes, and can avoid copying large values." },
      ],
    },
    {
      id: "strings",
      title: "Strings",
      summary: "Indexing from 1, Length, Copy, Pos, Insert, Delete and case.",
      sections: [
        {
          p: "Unlike most languages, the first character of a Delphi string is at index 1. <code>Length</code> gives the size and <code>Copy(s, start, count)</code> takes a piece. <code>+</code> joins strings.",
          code: `program Pieces;
{$APPTYPE CONSOLE}
var
  s: string;
begin
  s := 'acorn';
  WriteLn(s[1]);
  WriteLn(Copy(s, 2, 3));
  WriteLn(Length(s));
  WriteLn(s + 's');
end.`,
          out: "a\ncor\n5\nacorns",
        },
        {
          h: "Finding and changing",
          p: "<code>Pos(sub, s)</code> gives where <code>sub</code> starts in <code>s</code>, or 0. <code>Insert</code> and <code>Delete</code> change a string variable in place. <code>UpperCase</code>, <code>LowerCase</code> and <code>Trim</code> come from <code>SysUtils</code>.",
          code: `program Edit;
{$APPTYPE CONSOLE}
uses SysUtils;
var
  s: string;
begin
  s := 'hazelnut';
  WriteLn(Pos('nut', s));
  Delete(s, 1, 5);
  WriteLn(s);
  Insert('wal', s, 1);
  WriteLn(UpperCase(s));
  WriteLn('[', Trim('  oak  '), ']');
end.`,
          out: "6\nnut\nWALNUT\n[oak]",
        },
        {
          h: "Walking a string",
          p: "A <code>for</code> loop from 1 to <code>Length(s)</code> visits every character. Here it counts the vowels.",
          code: `program Vowels;
{$APPTYPE CONSOLE}
var
  s: string;
  i, n: Integer;
begin
  s := 'squirrel';
  n := 0;
  for i := 1 to Length(s) do
    if s[i] in ['a', 'e', 'i', 'o', 'u'] then Inc(n);
  WriteLn(n, ' vowels');
end.`,
          out: "3 vowels",
        },
        {
          h: "Building strings",
          p: "<code>StringOfChar</code> repeats a character, and a loop can build a string one piece at a time.",
          code: `program Build;
{$APPTYPE CONSOLE}
var
  s: string;
  i: Integer;
begin
  WriteLn(StringOfChar('*', 5));
  s := '';
  for i := 5 downto 1 do
    s := s + Chr(Ord('0') + i);
  WriteLn(s);
end.`,
          out: "*****\n54321",
        },
      ],
      practice: [
        { q: "In s := 'oak', what is s[1]?", options: ["'o'", "'a'", "'k'", "An error"], answer: "'o'", why: "Delphi strings are indexed from 1." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
begin
  WriteLn(Copy('chestnut', 6, 3));
end.`, options: ["nut", "tnu", "che", "stn"], answer: "nut", why: "Starting at character 6 (n), take three: n, u, t." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
begin
  WriteLn(Pos('l', 'walnut'));
end.`, options: ["3", "2", "4", "0"], answer: "3", why: "w is 1, a is 2, l is 3." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
var
  s: string;
begin
  s := 'pinecone';
  Delete(s, 1, 4);
  WriteLn(s);
end.`, options: ["cone", "pine", "econe", "necone"], answer: "cone", why: "Delete removes four characters starting at 1: p, i, n, e." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
begin
  WriteLn(Length('oak tree'));
end.`, options: ["8", "7", "2", "3"], answer: "8", why: "The space counts as a character." },
      ],
    },
    {
      id: "arrays",
      title: "Arrays and records",
      summary: "Fixed and dynamic arrays, Low and High, and records.",
      sections: [
        {
          p: "A static array has its index range in its type: <code>array[1..5] of Integer</code>. <code>Low</code> and <code>High</code> give the first and last index, so loops do not need the numbers written twice.",
          code: `program Arr;
{$APPTYPE CONSOLE}
var
  nuts: array[1..5] of Integer;
  i, total: Integer;
begin
  for i := Low(nuts) to High(nuts) do
    nuts[i] := i * 10;
  total := 0;
  for i := Low(nuts) to High(nuts) do
    total := total + nuts[i];
  WriteLn(nuts[1], ' ', nuts[5], ' total ', total);
end.`,
          out: "10 50 total 150",
        },
        {
          h: "Dynamic arrays",
          p: "<code>array of Integer</code> has no fixed size. <code>SetLength</code> sizes it, and it always counts from 0.",
          code: `program Dyn;
{$APPTYPE CONSOLE}
var
  a: array of Integer;
  i: Integer;
begin
  SetLength(a, 4);
  for i := 0 to High(a) do
    a[i] := i * i;
  WriteLn(Length(a), ' items, last is ', a[High(a)]);
end.`,
          out: "4 items, last is 9",
        },
        {
          h: "Records",
          p: "A <code>record</code> groups named fields into one type. Arrays of records are how many Delphi programs hold their data.",
          code: `program Rec;
{$APPTYPE CONSOLE}
type
  TSquirrel = record
    Name: string;
    Nuts: Integer;
  end;
var
  team: array[1..2] of TSquirrel;
  i: Integer;
begin
  team[1].Name := 'Hazel';
  team[1].Nuts := 12;
  team[2].Name := 'Bramble';
  team[2].Nuts := 7;
  for i := 1 to 2 do
    WriteLn(team[i].Name, ': ', team[i].Nuts);
end.`,
          out: "Hazel: 12\nBramble: 7",
        },
        {
          h: "Constant arrays",
          p: "A typed constant can hold a whole table, which is handy for lookups.",
          code: `program Days;
{$APPTYPE CONSOLE}
const
  Names: array[1..3] of string = ('Mon', 'Tue', 'Wed');
var
  i: Integer;
begin
  for i := 3 downto 1 do Write(Names[i], ' ');
  WriteLn;
end.`,
          out: "Wed Tue Mon",
        },
      ],
      practice: [
        { q: "What does High return for array[1..5] of Integer?", options: ["5", "4", "6", "1"], answer: "5", why: "High is the last index in the declared range." },
        { q: "What is the first index of a dynamic array?", options: ["0", "1", "Whatever SetLength says", "-1"], answer: "0", why: "Dynamic arrays always count from 0; static arrays use the range you declare." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
var
  v: array[1..3] of Integer;
  i: Integer;
begin
  for i := 1 to 3 do v[i] := i * i;
  WriteLn(v[3] - v[2]);
end.`, options: ["5", "1", "9", "3"], answer: "5", why: "v[3] is 9 and v[2] is 4." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
var
  a: array of Integer;
begin
  SetLength(a, 3);
  WriteLn(High(a));
end.`, options: ["2", "3", "1", "0"], answer: "2", why: "Three items numbered 0, 1 and 2." },
        { q: "How do you read the Nuts field of the record in team[1]?", options: ["team[1].Nuts", "team.Nuts[1]", "team[1]->Nuts", "Nuts(team[1])"], answer: "team[1].Nuts", why: "Pick the element first, then the field with a dot." },
      ],
    },
    {
      id: "classes",
      title: "Classes and objects",
      summary: "Fields, methods, constructors, properties, inheritance and Free.",
      sections: [
        {
          p: "A <code>class</code> bundles data (<b>fields</b>) with the code that works on it (<b>methods</b>). Objects are created with a <b>constructor</b>, usually <code>Create</code>, and must be freed with <code>Free</code> when you are done. <code>try … finally</code> makes sure the <code>Free</code> happens even if something goes wrong.",
          code: `program Obj;
{$APPTYPE CONSOLE}
type
  TSquirrel = class
  private
    FName: string;
    FNuts: Integer;
  public
    constructor Create(const AName: string);
    procedure Gather(n: Integer);
    property Name: string read FName;
    property Nuts: Integer read FNuts;
  end;

constructor TSquirrel.Create(const AName: string);
begin
  inherited Create;
  FName := AName;
end;

procedure TSquirrel.Gather(n: Integer);
begin
  FNuts := FNuts + n;
end;

var
  s: TSquirrel;
begin
  s := TSquirrel.Create('Hazel');
  try
    s.Gather(5);
    s.Gather(7);
    WriteLn(s.Name, ' has ', s.Nuts, ' nuts');
  finally
    s.Free;
  end;
end.`,
          out: "Hazel has 12 nuts",
        },
        {
          h: "Private, public and properties",
          p: "Fields start with <code>F</code> by convention and are kept <code>private</code>. The outside world uses <b>properties</b>, which can read a field directly or call a method. A property with no <code>write</code> is read-only. Object fields start at 0, empty or <code>nil</code>, unlike local variables.",
        },
        {
          h: "Inheritance and override",
          p: "A class can extend another. A method marked <code>virtual</code> can be replaced in a descendant with <code>override</code>; then calling it through a variable of the parent type runs the right version for each object.",
          code: `program Animals;
{$APPTYPE CONSOLE}
type
  TAnimal = class
    function Sound: string; virtual;
  end;
  TSquirrel = class(TAnimal)
    function Sound: string; override;
  end;
  TOwl = class(TAnimal)
    function Sound: string; override;
  end;

function TAnimal.Sound: string;
begin
  Result := '...';
end;

function TSquirrel.Sound: string;
begin
  Result := 'chitter';
end;

function TOwl.Sound: string;
begin
  Result := 'hoo';
end;

var
  zoo: array[1..3] of TAnimal;
  i: Integer;
begin
  zoo[1] := TSquirrel.Create;
  zoo[2] := TOwl.Create;
  zoo[3] := TAnimal.Create;
  for i := 1 to 3 do
  begin
    WriteLn(zoo[i].ClassName, ': ', zoo[i].Sound);
    zoo[i].Free;
  end;
end.`,
          out: "TSquirrel: chitter\nTOwl: hoo\nTAnimal: ...",
        },
        {
          h: "is and as",
          p: "<code>obj is TOwl</code> asks whether an object is a <code>TOwl</code> (or a descendant). <code>obj as TOwl</code> treats it as one, and raises an error if it is not.",
          code: `if zoo[i] is TOwl then
  WriteLn('An owl!');`,
        },
      ],
      practice: [
        { q: "What frees an object you created with Create?", options: ["Calling its Free method", "It is freed automatically", "Setting it to 0", "Calling Destroy on the class"], answer: "Calling its Free method", why: "Delphi objects are not garbage-collected; whoever creates one frees it, usually in a finally block." },
        { q: "Why put Free inside finally?", options: ["It runs even if an error happens in the try part", "finally makes it faster", "Free is only allowed there", "So it runs twice"], answer: "It runs even if an error happens in the try part", why: "try … finally guarantees the clean-up code runs on every way out." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
type
  TCounter = class
    Count: Integer;
    procedure Bump;
  end;

procedure TCounter.Bump;
begin
  Inc(Count);
end;

var
  c: TCounter;
begin
  c := TCounter.Create;
  c.Bump;
  c.Bump;
  c.Bump;
  WriteLn(c.Count);
  c.Free;
end.`, options: ["3", "0", "1", "An error"], answer: "3", why: "Object fields start at 0, and each Bump adds one." },
        { q: "What does override do?", options: ["Replaces a virtual method in a descendant class", "Hides a field", "Creates a new object", "Calls the parent method"], answer: "Replaces a virtual method in a descendant class", why: "Calls through a parent-type variable then run the descendant's version." },
        { q: "What is a property with read FName and no write?", options: ["Read-only from outside", "Write-only", "A compile error", "A method"], answer: "Read-only from outside", why: "Without a write part, code outside the class can read the property but not set it." },
      ],
    },
    {
      id: "exceptions",
      title: "Exceptions",
      summary: "try…except, raise, and handling particular kinds of error.",
      sections: [
        {
          p: "When something goes wrong, Delphi <b>raises an exception</b>: normal running stops and jumps to the nearest <code>except</code> block. <code>on E: Exception do</code> catches it and gives you the exception object, whose <code>Message</code> says what happened.",
          code: `program Safe;
{$APPTYPE CONSOLE}
uses SysUtils;

procedure CheckNuts(n: Integer);
begin
  if n < 0 then
    raise Exception.Create('Nuts cannot be negative');
  WriteLn(n, ' nuts is fine');
end;

begin
  try
    CheckNuts(4);
    CheckNuts(-1);
    WriteLn('never printed');
  except
    on E: Exception do
      WriteLn('Problem: ', E.Message);
  end;
  WriteLn('carrying on');
end.`,
          out: "4 nuts is fine\nProblem: Nuts cannot be negative\ncarrying on",
        },
        {
          h: "Kinds of exception",
          p: "Exceptions are classes, so you can catch particular kinds. <code>StrToInt</code> raises <code>EConvertError</code> on bad text; <code>div</code> by zero raises <code>EDivByZero</code>. The first matching <code>on</code> wins.",
          code: `program Kinds;
{$APPTYPE CONSOLE}
uses SysUtils;

procedure Try1(const s: string);
var
  n, zero: Integer;
begin
  zero := 0;
  try
    n := StrToInt(s);
    WriteLn(100 div (n * zero));
  except
    on E: EConvertError do WriteLn(s, ': not a number');
    on E: EDivByZero do WriteLn(s, ': divided by zero');
  end;
end;

begin
  Try1('abc');
  Try1('5');
end.`,
          out: "abc: not a number\n5: divided by zero",
        },
        {
          h: "Safer than catching",
          p: "Often you can avoid the exception: <code>StrToIntDef(s, 0)</code> gives 0 instead of raising. Keep <code>try … except</code> for problems you cannot check in advance, and <code>try … finally</code> for clean-up.",
          code: `program Def;
{$APPTYPE CONSOLE}
uses SysUtils;
begin
  WriteLn(StrToIntDef('42', 0) + StrToIntDef('oops', 0));
end.`,
          out: "42",
        },
      ],
      practice: [
        { q: "Which keyword starts an error?", options: ["raise", "throw", "error", "except"], answer: "raise", why: "raise Exception.Create('...') creates and raises an exception." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
uses SysUtils;
begin
  try
    WriteLn('a');
    raise Exception.Create('b');
    WriteLn('c');
  except
    on E: Exception do WriteLn(E.Message);
  end;
end.`, options: ["a\nb", "a\nc", "a\nb\nc", "b"], answer: "a\nb", why: "raise jumps straight to except, so c is never printed." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
uses SysUtils;
begin
  WriteLn(StrToIntDef('seven', -1));
end.`, options: ["-1", "7", "0", "An error"], answer: "-1", why: "seven is not written in digits, so the default -1 is returned." },
        { q: "What is the difference between except and finally?", options: ["except handles errors; finally always runs", "They are the same", "finally handles errors; except always runs", "except is for classes only"], answer: "except handles errors; finally always runs", why: "Use except to deal with a problem and finally to clean up whatever happens." },
      ],
    },
    {
      id: "forms",
      title: "Forms and events",
      summary: "Units, components and OnClick handlers.",
      sections: [
        {
          p: "Each form is a <b>unit</b> with two halves: <code>interface</code> (what other units can see) and <code>implementation</code> (the code). The form designer writes the class declaration for you as you drop components on it. A form is a class, just like the ones in the last lessons.",
          code: `unit Main;

interface

uses Windows, SysUtils, Classes, Forms, Controls, StdCtrls, Dialogs;

type
  TForm1 = class(TForm)
    Button1: TButton;
    Edit1: TEdit;
    procedure Button1Click(Sender: TObject);
  end;

var
  Form1: TForm1;

implementation

{$R *.dfm}

procedure TForm1.Button1Click(Sender: TObject);
begin
  ShowMessage('Hello, ' + Edit1.Text);
end;

end.`,
        },
        {
          h: "How it fits together",
          p: "Double-clicking <code>Button1</code> in the designer creates <code>Button1Click</code> and connects it to the button's <code>OnClick</code> event. The layout itself is saved in the <code>.dfm</code> file, which <code>{$R *.dfm}</code> links in. Components are objects of VCL classes such as <code>TButton</code>, <code>TEdit</code> and <code>TLabel</code>, and their settings (<code>Caption</code>, <code>Text</code>, <code>Enabled</code>) are <b>properties</b> you can set in the Object Inspector or in code. The form owns its components and frees them when it closes.",
        },
        {
          h: "Converting for display",
          p: "Text boxes hold strings, so convert numbers on the way in and out. <code>StrToIntDef</code> copes with a box the user left empty.",
          code: `procedure TForm1.Button1Click(Sender: TObject);
var
  n: Integer;
begin
  n := StrToIntDef(Edit1.Text, 0);
  Label1.Caption := IntToStr(n * 2);
end;`,
        },
        {
          h: "One handler, many buttons",
          p: "Several buttons can share one <code>OnClick</code> handler. <code>Sender</code> says which was clicked, and <code>as</code> turns it into a <code>TButton</code> so you can read its <code>Caption</code>.",
          code: `procedure TForm1.DigitClick(Sender: TObject);
begin
  Edit1.Text := Edit1.Text + (Sender as TButton).Caption;
end;`,
        },
      ],
      practice: [
        { q: "Which file stores a form's layout?", options: [".dfm", ".pas", ".dpr", ".exe"], answer: ".dfm", why: "The .pas file holds the code; the .dfm holds the components and their properties." },
        { q: "Which part of a unit can other units use?", options: ["interface", "implementation", "initialization", "var"], answer: "interface", why: "Only what is declared in the interface section is visible outside the unit." },
        { q: "What does the Sender parameter of an event tell you?", options: ["Which component fired the event", "Which key was pressed", "The form's size", "The user's name"], answer: "Which component fired the event", why: "One handler can serve several buttons; Sender says which one was clicked." },
        { q: "How do you show the number n in Label1?", options: ["Label1.Caption := IntToStr(n);", "Label1.Caption := n;", "Label1 := n;", "ShowLabel(n);"], answer: "Label1.Caption := IntToStr(n);", why: "Caption is a string property, so the integer has to be converted." },
      ],
    },
    {
      id: "fizzbuzz",
      title: "Putting it together: FizzBuzz",
      summary: "Loops, mod, a function and string building in one program.",
      sections: [
        {
          p: "FizzBuzz counts from 1, but says <b>Fizz</b> for multiples of 3, <b>Buzz</b> for multiples of 5 and <b>FizzBuzz</b> for both. Building the word inside a function keeps the main loop short, and an empty result means “just say the number”.",
          code: `program FizzBuzz;
{$APPTYPE CONSOLE}
uses SysUtils;

function Say(n: Integer): string;
begin
  Result := '';
  if n mod 3 = 0 then Result := 'Fizz';
  if n mod 5 = 0 then Result := Result + 'Buzz';
  if Result = '' then Result := IntToStr(n);
end;

var
  i: Integer;
begin
  for i := 1 to 15 do
    Write(Say(i), ' ');
  WriteLn;
end.`,
          out: "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz",
        },
        {
          h: "Where to go next",
          p: "You have the core of Object Pascal. Good next steps: turn FizzBuzz into a form with a button and a <code>TMemo</code> that fills with lines; use <code>TStringList</code> (in the <code>Classes</code> unit) to load, sort and save text files; and read the VCL source that ships with Delphi, which is written in exactly the language you now know.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
var
  i: Integer;
begin
  for i := 9 to 10 do
    if i mod 3 = 0 then WriteLn('Fizz')
    else if i mod 5 = 0 then WriteLn('Buzz');
end.`, options: ["Fizz\nBuzz", "FizzBuzz", "Buzz\nFizz", "Fizz"], answer: "Fizz\nBuzz", why: "9 divides by 3 and 10 divides by 5." },
        { q: "Why does Say start with Result := ''?", options: ["So the later tests add to a known value", "Strings must start empty", "To return early", "It is required by mod"], answer: "So the later tests add to a known value", why: "Result + 'Buzz' needs Result to hold something definite first, so the function sets it before testing." },
        { kind: "output", q: "What does this print?", code: `program Q;
{$APPTYPE CONSOLE}
uses SysUtils;
begin
  WriteLn('[' + IntToStr(7) + ']');
end.`, options: ["[7]", "[ 7]", "[7 ]", "7"], answer: "[7]", why: "IntToStr gives the digits with no spaces." },
      ],
    },
  ],
};
