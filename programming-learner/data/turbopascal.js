// Turbo Pascal course for the Programming Learner. Written for this project.
// Schema: see data/python.js. Complete programs with `out` (and practice of
// kind "output") are compiled and run by tools/check_packs.py through
// tools/run_turbopascal.py, which uses Free Pascal's Turbo Pascal mode. Code
// sticks to what Turbo Pascal 7 accepts.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.turbopascal = {
  id: "turbopascal",
  name: "Turbo Pascal",
  title: "Turbo Pascal: structured programming on DOS",
  intro:
    "Turbo Pascal was Borland's Pascal for CP/M and DOS, first released in 1983. It was fast and cheap, and it came with an editor, compiler and debugger in one blue screen, so for a decade it was how a great many people learned to program, at school and at home. Pascal itself was designed by Niklaus Wirth to teach structured programming: declare everything first, keep blocks clearly nested, and let the compiler catch type mistakes. Turbo Pascal grew into Borland Pascal and then into Delphi, whose courses are in this learner too. These lessons use Turbo Pascal 7 style. Every example is a whole program and shows exactly what it prints. To run one today, use Free Pascal (<code>fpc -Mtp hello.pas</code>), or the original IDE in a DOS emulator such as DOSBox.",
  comment: "//",
  caseInsensitive: true,
  keywords: [
    "PROGRAM", "USES", "TYPE", "RECORD", "VAR", "CONST", "BEGIN", "END", "PROCEDURE", "FUNCTION", "IF", "THEN", "ELSE",
    "FOR", "TO", "DOWNTO", "DO", "WHILE", "REPEAT", "UNTIL", "CASE", "OF", "AND", "OR", "NOT", "DIV", "MOD", "IN",
    "ARRAY", "SET", "STRING", "INTEGER", "LONGINT", "REAL", "CHAR", "BOOLEAN", "BYTE", "TRUE", "FALSE", "WITH", "UNIT",
    "INTERFACE", "IMPLEMENTATION",
  ],
  builtins: ["WRITELN", "WRITE", "READLN", "LENGTH", "COPY", "POS", "CONCAT", "UPCASE", "ORD", "CHR", "INC", "DEC", "SIZEOF", "CLRSCR", "GOTOXY", "TEXTCOLOR"],
  lessons: [
    {
      id: "first",
      title: "Your first program",
      summary: "program, begin ... end., Write and WriteLn, comments.",
      sections: [
        {
          p: "A Pascal program has a name, then a block between <code>begin</code> and <code>end.</code> (with a full stop at the very end). Statements are separated by semicolons. <code>WriteLn</code> prints its items and ends the line; <code>Write</code> prints without ending it. Comments go between <code>{ }</code> or <code>(* *)</code>.",
          code: `program Hello;
{ Prints two lines }
begin
  WriteLn('Hello, squirrel!');
  Write('Nuts ');
  WriteLn('are ready.');
end.`,
          out: "Hello, squirrel!\nNuts are ready.",
        },
        {
          h: "Case does not matter",
          p: "Pascal ignores upper and lower case in keywords and names, so <code>WRITELN</code>, <code>writeln</code> and <code>WriteLn</code> are the same. Strings are written with single quotes, and a quote inside a string is doubled.",
          code: `program Quotes;
begin
  WRITELN('It''s Pascal');
  writeln('one', 'two');
end.`,
          out: "It's Pascal\nonetwo",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q1;
begin
  Write('A');
  Write('B');
  WriteLn('C');
end.`, options: ["ABC", "A\nB\nC", "AB\nC", "A B C"], answer: "ABC", why: "Write does not end the line, so A, B and C all land on one line, and WriteLn ends it." },
        { kind: "output", q: "What does this print?", code: `program Q2;
begin
  { WriteLn('hidden'); }
  WriteLn('shown');
end.`, options: ["shown", "hidden\nshown", "{ WriteLn('hidden'); }\nshown", "Nothing"], answer: "shown", why: "Everything between { and } is a comment." },
        { q: "What ends a Pascal program?", options: ["end. with a full stop", "end;", "stop", "halt"], answer: "end. with a full stop", why: "Inner blocks end with end; but the main block ends with end. and the compiler stops reading there." },
        { q: "Which company made Turbo Pascal?", options: ["Borland", "Microsoft", "IBM", "Apple"], answer: "Borland", why: "Borland released it in 1983. Its line continued as Borland Pascal and then Delphi." },
      ],
    },
    {
      id: "types",
      title: "Variables and types",
      summary: "var blocks, Integer, Real, Char, Boolean, and field widths.",
      sections: [
        {
          p: "Every variable is declared in a <code>var</code> section before <code>begin</code>. Assignment is <code>:=</code>, and <code>=</code> is only for comparing. <code>/</code> always gives a Real; <code>div</code> and <code>mod</code> are whole-number division and remainder.",
          code: `program Vars;
var
  Nuts, Trees: Integer;
  Name: string;
begin
  Nuts := 17;
  Trees := 5;
  Name := 'Hazel';
  WriteLn(Name, ' has ', Nuts, ' nuts');
  WriteLn(Nuts div Trees, ' each, ', Nuts mod Trees, ' left over');
end.`,
          out: "Hazel has 17 nuts\n3 each, 2 left over",
        },
        {
          h: "Field widths",
          p: "In <code>Write</code> and <code>WriteLn</code>, <code>x:8</code> prints <code>x</code> right-aligned in 8 characters, and for a Real, <code>x:8:2</code> also sets 2 digits after the point. This is how Pascal programs lined up columns of numbers. Always give a Real a width; without one it prints in scientific notation.",
          code: `program Widths;
var
  Price: Real;
begin
  Price := 2 / 3;
  WriteLn('[', 42:5, ']');
  WriteLn('[', Price:8:3, ']');
  WriteLn('[', 'ab':4, ']');
end.`,
          out: "[   42]\n[   0.667]\n[  ab]",
        },
        {
          h: "Integer is 16 bits",
          p: "On DOS, <code>Integer</code> is only 16 bits, from −32768 to 32767. Go past the top and it wraps round to the bottom without any warning, unless range checking is switched on with <code>{$R+}</code> and <code>{$Q+}</code>. Use <code>LongInt</code> (32 bits) for bigger numbers.",
          code: `program Wrap;
var
  I: Integer;
  L: LongInt;
begin
  I := 32767;
  I := I + 1;
  WriteLn(I);
  L := 32767;
  L := L + 1;
  WriteLn(L);
end.`,
          out: "-32768\n32768",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q1;
begin
  WriteLn(17 div 5, ' ', 17 mod 5);
end.`, options: ["3 2", "3.4 0", "2 3", "3 0"], answer: "3 2", why: "div gives the whole number of times 5 fits into 17, and mod gives what is left." },
        { kind: "output", q: "What does this print?", code: `program Q2;
begin
  WriteLn('[', 7:3, ']');
end.`, options: ["[  7]", "[7  ]", "[007]", "[7]"], answer: "[  7]", why: "A width of 3 right-aligns the number in three characters, padding with spaces on the left." },
        { kind: "output", q: "What does this print?", code: `program Q3;
var
  X: Real;
begin
  X := 10 / 4;
  WriteLn(X:0:2);
end.`, options: ["2.50", "2", "2.5", "2.00"], answer: "2.50", why: "/ always gives a Real, and :0:2 prints it with exactly two decimals and no padding." },
        { kind: "output", q: "What does this print?", code: `program Q4;
var
  I: Integer;
begin
  I := -32768;
  I := I - 1;
  WriteLn(I);
end.`, options: ["32767", "-32769", "0", "-32768"], answer: "32767", why: "A 16-bit Integer wraps at both ends: one below −32768 is 32767." },
        { q: "What is the difference between := and = in Pascal?", options: [":= assigns, = compares", "They are the same", "= assigns, := compares", ":= is only for constants"], answer: ":= assigns, = compares", why: "Pascal keeps them apart on purpose, so if X = 1 can never accidentally change X." },
      ],
    },
    {
      id: "control",
      title: "Decisions and loops",
      summary: "if, case, for, while and repeat ... until.",
      sections: [
        {
          p: "<code>if ... then ... else</code> picks between two statements. To run several statements, wrap them in <code>begin ... end</code>. There is no semicolon before <code>else</code>. <code>case</code> picks by value, with ranges written <code>1..5</code>.",
          code: `program Decide;
var
  Score: Integer;
begin
  Score := 82;
  if Score >= 50 then
    WriteLn('Pass')
  else
    WriteLn('Try again');
  case Score of
    90..100: WriteLn('A');
    80..89: WriteLn('B');
    70..79: WriteLn('C');
  else
    WriteLn('Below C');
  end;
end.`,
          out: "Pass\nB",
        },
        {
          h: "Three kinds of loop",
          p: "<code>for I := 1 to 3 do</code> counts up, and <code>downto</code> counts down. <code>while</code> checks before each pass, so it may not run at all. <code>repeat ... until</code> checks after each pass, so it always runs at least once, and it needs no <code>begin ... end</code>.",
          code: `program Loops;
var
  I, N: Integer;
begin
  for I := 1 to 3 do
    Write(I, ' ');
  WriteLn;
  for I := 3 downto 1 do
    Write(I, ' ');
  WriteLn;
  N := 1;
  while N < 20 do
    N := N * 2;
  WriteLn(N);
  N := 100;
  repeat
    N := N - 30;
  until N < 0;
  WriteLn(N);
end.`,
          out: "1 2 3\n3 2 1\n32\n-20",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q1;
var
  I, Total: Integer;
begin
  Total := 0;
  for I := 1 to 4 do
    Total := Total + I;
  WriteLn(Total);
end.`, options: ["10", "4", "6", "24"], answer: "10", why: "1 + 2 + 3 + 4 is 10." },
        { kind: "output", q: "What does this print?", code: `program Q2;
var
  N: Integer;
begin
  N := 5;
  repeat
    WriteLn('once');
  until N > 3;
end.`, options: ["once", "Nothing", "once\nonce", "It loops forever"], answer: "once", why: "repeat checks its condition after the body, so the body runs once even though N > 3 is already true." },
        { kind: "output", q: "What does this print?", code: `program Q3;
var
  C: Char;
begin
  C := 'e';
  case C of
    'a', 'e', 'i', 'o', 'u': WriteLn('vowel');
  else
    WriteLn('consonant');
  end;
end.`, options: ["vowel", "consonant", "e", "vowel\nconsonant"], answer: "vowel", why: "A case label can list several values. 'e' is one of them." },
        { q: "Why does if X > 1 then WriteLn('a'); else WriteLn('b'); not compile?", options: ["There must be no semicolon before else", "else needs begin", "WriteLn cannot be used in if", "X must be declared as Boolean"], answer: "There must be no semicolon before else", why: "The semicolon ends the if statement, so the compiler then finds an else with no if." },
      ],
    },
    {
      id: "procedures",
      title: "Procedures and functions",
      summary: "Declaring them before use, var parameters and nesting.",
      sections: [
        {
          p: "Procedures and functions are declared before the main <code>begin</code>. A function returns its value by assigning to its own name. Parameters are copied in by default; mark one <code>var</code> and the procedure works on the caller's variable instead.",
          code: `program Procs;
var
  Stash: Integer;

function Square(N: Integer): Integer;
begin
  Square := N * N;
end;

procedure AddNuts(var Total: Integer; Extra: Integer);
begin
  Total := Total + Extra;
end;

begin
  WriteLn(Square(6));
  Stash := 10;
  AddNuts(Stash, 5);
  WriteLn(Stash);
end.`,
          out: "36\n15",
        },
        {
          h: "Nested procedures",
          p: "Pascal lets you declare a procedure inside another one. The inner procedure can use the outer one's variables and is invisible everywhere else, which keeps helpers close to the only place they are used.",
          code: `program Nested;

procedure Report(Count: Integer);
  procedure Line(Ch: Char);
  var
    I: Integer;
  begin
    for I := 1 to Count do
      Write(Ch);
    WriteLn;
  end;
begin
  Line('=');
  WriteLn(Count, ' acorns');
  Line('=');
end;

begin
  Report(9);
end.`,
          out: "=========\n9 acorns\n=========",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q1;
var
  N: Integer;

procedure Bump(X: Integer);
begin
  X := X + 10;
end;

begin
  N := 1;
  Bump(N);
  WriteLn(N);
end.`, options: ["1", "11", "10", "0"], answer: "1", why: "X is a copy of N because it is not a var parameter, so N is unchanged." },
        { kind: "output", q: "What does this print?", code: `program Q2;
var
  N: Integer;

procedure Bump(var X: Integer);
begin
  X := X + 10;
end;

begin
  N := 1;
  Bump(N);
  Bump(N);
  WriteLn(N);
end.`, options: ["21", "11", "1", "20"], answer: "21", why: "With var, X is N itself, so each call adds 10 to it." },
        { q: "How does a Turbo Pascal function return its value?", options: ["By assigning to the function's own name", "With a return statement", "By printing it", "With the result of the last line"], answer: "By assigning to the function's own name", why: "Square := N * N sets the result. Delphi later added the Result variable as well." },
      ],
    },
    {
      id: "strings",
      title: "Strings",
      summary: "Short strings, Length, Copy, Pos, Concat and the length byte.",
      sections: [
        {
          p: "A Turbo Pascal <code>string</code> holds up to 255 characters, and <code>string[10]</code> holds at most 10; anything longer is cut off. Characters are numbered from 1. <code>Length</code>, <code>Copy(S, Start, Count)</code>, <code>Pos(Sub, S)</code> and <code>+</code> or <code>Concat</code> cover most needs, and <code>UpCase</code> capitalises one character.",
          code: `program Strs;
var
  S: string;
  Short: string[5];
begin
  S := 'Hazelnut';
  WriteLn(Length(S));
  WriteLn(Copy(S, 1, 5));
  WriteLn(Pos('nut', S));
  WriteLn(S[1], UpCase(S[2]));
  Short := 'Squirrel';
  WriteLn(Short);
  WriteLn('Oak' + 'Tree');
end.`,
          out: "8\nHazel\n6\nHA\nSquir\nOakTree",
        },
        {
          h: "The length byte",
          p: "A short string stores its length in position 0, as a character, followed by the text. <code>Ord(S[0])</code> is the same as <code>Length(S)</code>. Old programs sometimes set <code>S[0]</code> directly to shorten a string, which is fast but easy to get wrong.",
          code: `program LenByte;
var
  S: string;
begin
  S := 'Pinecone';
  WriteLn(Ord(S[0]));
  S[0] := Chr(4);
  WriteLn(S);
end.`,
          out: "8\nPine",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q1;
var
  S: string;
begin
  S := 'Squirrel';
  WriteLn(Copy(S, 3, 4));
end.`, options: ["uirr", "quir", "irre", "Squi"], answer: "uirr", why: "Copy starts at position 3 (characters count from 1) and takes 4 characters." },
        { kind: "output", q: "What does this print?", code: `program Q2;
var
  S: string[3];
begin
  S := 'Acorn';
  WriteLn(S, Length(S));
end.`, options: ["Aco3", "Acorn5", "Aco5", "Acorn3"], answer: "Aco3", why: "string[3] holds at most three characters, so the rest is cut off." },
        { kind: "output", q: "What does this print?", code: `program Q3;
begin
  WriteLn(Pos('z', 'Hazel'), Pos('q', 'Hazel'));
end.`, options: ["30", "3-1", "20", "3"], answer: "30", why: "z is the third character, and Pos returns 0 when the text is not found. The two numbers are printed side by side." },
        { q: "What is the longest a plain Turbo Pascal string can be?", options: ["255 characters", "65535 characters", "As long as memory allows", "80 characters"], answer: "255 characters", why: "The length is kept in one byte at position 0, so it can't go above 255." },
      ],
    },
    {
      id: "data",
      title: "Arrays, records and sets",
      summary: "Typed arrays with any range, records, enumerations and sets.",
      sections: [
        {
          p: "An array's index range is part of its type, and it can start anywhere: <code>array[1..5]</code>, <code>array[0..9]</code> or <code>array['A'..'Z']</code>. A <code>record</code> groups named fields, and <code>with</code> lets you use the fields without repeating the record's name.",
          code: `program DataTypes;
type
  TTree = record
    Name: string[10];
    Nuts: Integer;
  end;
var
  Counts: array[1..3] of Integer;
  Oak: TTree;
  I, Total: Integer;
begin
  Counts[1] := 12;
  Counts[2] := 30;
  Counts[3] := 5;
  Total := 0;
  for I := 1 to 3 do
    Total := Total + Counts[I];
  WriteLn(Total);
  with Oak do
  begin
    Name := 'Oak';
    Nuts := Total;
  end;
  WriteLn(Oak.Name, ': ', Oak.Nuts);
end.`,
          out: "47\nOak: 47",
        },
        {
          h: "Enumerations and sets",
          p: "An enumerated type lists its own values, and <code>Ord</code> gives each value's position, counting from 0. A <code>set</code> holds any group of values of a small type, and <code>in</code> tests whether a value is in it. Sets make checks like \"is this a vowel?\" short and fast.",
          code: `program Sets;
type
  TSeason = (Spring, Summer, Autumn, Winter);
var
  S: TSeason;
  Busy: set of TSeason;
  C: Char;
begin
  Busy := [Autumn];
  for S := Spring to Winter do
    if S in Busy then
      WriteLn(Ord(S), ' is busy');
  C := 'e';
  if C in ['a', 'e', 'i', 'o', 'u'] then
    WriteLn(C, ' is a vowel');
end.`,
          out: "2 is busy\ne is a vowel",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q1;
var
  A: array[5..7] of Integer;
  I: Integer;
begin
  for I := 5 to 7 do
    A[I] := I * 2;
  WriteLn(A[6]);
end.`, options: ["12", "6", "14", "10"], answer: "12", why: "The array is indexed 5 to 7, so A[6] is the middle element, set to 6 × 2." },
        { kind: "output", q: "What does this print?", code: `program Q2;
type
  TColour = (Red, Green, Blue);
begin
  WriteLn(Ord(Blue));
end.`, options: ["2", "3", "1", "Blue"], answer: "2", why: "Enumerated values count from 0: Red is 0, Green 1, Blue 2." },
        { kind: "output", q: "What does this print?", code: `program Q3;
var
  D: set of 1..9;
begin
  D := [2, 4, 6];
  if 4 in D then Write('yes ') else Write('no ');
  if 5 in D then WriteLn('yes') else WriteLn('no');
end.`, options: ["yes no", "no yes", "yes yes", "no no"], answer: "yes no", why: "4 is in the set and 5 is not." },
      ],
    },
    {
      id: "units",
      title: "Units and the DOS screen",
      summary: "uses Crt, writing your own unit, and the IDE.",
      sections: [
        {
          p: "This lesson is reading material: the Crt unit needs a DOS text screen, so the examples show no output here.",
        },
        {
          h: "The Crt unit",
          p: "<code>uses Crt;</code> gives a program control of the text screen: <code>ClrScr</code> clears it, <code>GotoXY(X, Y)</code> moves the cursor, <code>TextColor</code> and <code>TextBackground</code> pick from 16 colours, <code>ReadKey</code> waits for a key without echoing it, and <code>Delay</code> pauses for some milliseconds. Menus, games and the famous blue-and-yellow screens of the era were built this way.",
          code: `program Menu;
uses Crt;
var
  Key: Char;
begin
  TextBackground(Blue);
  ClrScr;
  TextColor(Yellow);
  GotoXY(30, 10);
  Write('Press any key...');
  Key := ReadKey;
  TextColor(LightGray);
  TextBackground(Black);
  ClrScr;
end.`,
        },
        {
          h: "Writing a unit",
          p: "A unit is a separately compiled module. Its <code>interface</code> part lists what other programs may use, and its <code>implementation</code> part holds the code. Change the implementation and the programs that use it do not need to change.",
          code: `unit Nuts;

interface

function Share(Total, Squirrels: Integer): Integer;

implementation

function Share(Total, Squirrels: Integer): Integer;
begin
  Share := Total div Squirrels;
end;

end.`,
        },
        {
          h: "The IDE",
          p: "Turbo Pascal's IDE kept the editor, compiler and debugger in one program. F9 compiles, Ctrl+F9 runs, F7 and F8 step through the code a line at a time, and Ctrl+F7 adds a watch on a variable. Compiling took seconds even on slow machines, which is a big part of why it was loved.",
        },
      ],
      practice: [
        { q: "What does the interface part of a unit contain?", options: ["What other programs may use", "The code of every procedure", "The program's main block", "Comments only"], answer: "What other programs may use", why: "The interface is the public list. The code itself goes in the implementation part." },
        { q: "Which unit gives ClrScr and GotoXY?", options: ["Crt", "Dos", "System", "Graph"], answer: "Crt", why: "Crt handles the text screen and keyboard. Dos has file and system calls, and Graph draws in graphics modes." },
        { q: "What did Turbo Pascal's line eventually become?", options: ["Delphi", "Visual Basic", "C++Builder", "Lazarus"], answer: "Delphi", why: "Borland Pascal with Objects was followed by Delphi in 1995. Lazarus is a later, separate project built on Free Pascal." },
      ],
    },
  ],
};
