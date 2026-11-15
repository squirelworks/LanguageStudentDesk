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
    "INTERFACE", "IMPLEMENTATION", "TEXT", "FILE", "OBJECT", "NIL",
  ],
  builtins: ["WRITELN", "WRITE", "READLN", "LENGTH", "COPY", "POS", "CONCAT", "UPCASE", "ORD", "CHR", "INC", "DEC", "SIZEOF", "CLRSCR", "GOTOXY", "TEXTCOLOR", "ASSIGN", "RESET", "REWRITE", "APPEND", "CLOSE", "EOF", "EOLN", "VAL", "NEW", "DISPOSE"],
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
    {
      id: "files",
      title: "Text files",
      summary: "Assign, Rewrite, Reset, Append, ReadLn and Close.",
      sections: [
        {
          p: "A <code>Text</code> variable is a text file. <code>Assign</code> ties it to a path, <code>Rewrite</code> creates or replaces it, <code>Reset</code> opens it for reading, and <code>Close</code> finishes. <code>WriteLn(F, ...)</code> writes a line; <code>ReadLn(F, ...)</code> reads one. <code>Eof(F)</code> is true when there is nothing left to read. Parsing a line of words often means <code>ReadLn</code> into a string, then <code>Pos</code>, <code>Copy</code> and <code>Val</code>.",
          code: `program NutFile;
var
  F: Text;
  Line: string;
  SpacePos, N, Code, Total: Integer;
  Name: string;
begin
  Assign(F, 'nuts.txt');
  Rewrite(F);
  WriteLn(F, 'acorn 12');
  WriteLn(F, 'walnut 5');
  WriteLn(F, 'hazel 9');
  Close(F);
  Assign(F, 'nuts.txt');
  Reset(F);
  Total := 0;
  while not Eof(F) do
  begin
    ReadLn(F, Line);
    SpacePos := Pos(' ', Line);
    Name := Copy(Line, 1, SpacePos - 1);
    Val(Copy(Line, SpacePos + 1, 255), N, Code);
    WriteLn(Name, ' => ', N);
    Total := Total + N;
  end;
  Close(F);
  WriteLn('total ', Total);
end.`,
          out: "acorn => 12\nwalnut => 5\nhazel => 9\ntotal 26",
        },
        {
          h: "Append",
          p: "<code>Append</code> opens an existing text file so new <code>WriteLn</code> calls add at the end. After writing, close it and <code>Reset</code> again if you need to read the whole log back.",
          code: `program AppendDemo;
var
  F: Text;
  S: string;
begin
  Assign(F, 'log.txt');
  Rewrite(F);
  WriteLn(F, 'day 1');
  Close(F);
  Assign(F, 'log.txt');
  Append(F);
  WriteLn(F, 'day 2');
  Close(F);
  Assign(F, 'log.txt');
  Reset(F);
  while not Eof(F) do
  begin
    ReadLn(F, S);
    WriteLn(S);
  end;
  Close(F);
end.`,
          out: "day 1\nday 2",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q1;
var
  F: Text;
  S: string;
begin
  Assign(F, 't.txt');
  Rewrite(F);
  WriteLn(F, 'x');
  WriteLn(F, 'y');
  Close(F);
  Assign(F, 't.txt');
  Reset(F);
  while not Eof(F) do
  begin
    ReadLn(F, S);
    Write(S);
  end;
  Close(F);
  WriteLn;
end.`, options: ["xy", "x\ny", "yx", "x y"], answer: "xy", why: "Write prints without a newline, so x and y land on one line." },
        { kind: "output", q: "What does this print?", code: `program Q2;
var
  F: Text;
  S: string;
begin
  Assign(F, 'a.txt');
  Rewrite(F);
  WriteLn(F, 'oak');
  Close(F);
  Assign(F, 'a.txt');
  Append(F);
  WriteLn(F, 'elm');
  Close(F);
  Assign(F, 'a.txt');
  Reset(F);
  while not Eof(F) do
  begin
    ReadLn(F, S);
    WriteLn(S);
  end;
  Close(F);
end.`, options: ["oak\nelm", "elm", "oak", "oakelm"], answer: "oak\nelm", why: "Append adds elm after the line already written by Rewrite." },
        { q: "What does Assign do?", options: ["Ties a file variable to a path, without opening it yet", "Opens the file for reading", "Deletes the file", "Creates a unit"], answer: "Ties a file variable to a path, without opening it yet", why: "Rewrite, Reset or Append is what actually opens the file." },
        { q: "What does Val(S, N, Code) do?", options: ["Converts text S into number N; Code is 0 when it worked", "Only uppercases S", "Opens file S", "Splits S on spaces"], answer: "Converts text S into number N; Code is 0 when it worked", why: "Val is the Turbo Pascal way to parse a number from a string." },
      ],
    },
    {
      id: "pointers",
      title: "Pointers and linked lists",
      summary: "New, Dispose, ^ and a short chain of records.",
      sections: [
        {
          p: "A pointer type is written <code>^T</code>: it holds the address of a <code>T</code>. <code>New(P)</code> allocates one on the heap and points <code>P</code> at it; <code>P^</code> is the value itself; <code>Dispose(P)</code> frees it. Linked structures use a pointer field inside a record. Always dispose what you new, in reverse order for a chain, or the heap leaks — on DOS that mattered quickly.",
          code: `program Ptrs;
type
  PNode = ^TNode;
  TNode = record
    Nuts: Integer;
    Next: PNode;
  end;
var
  Head, P: PNode;
  Sum: Integer;
begin
  New(Head);
  Head^.Nuts := 3;
  New(Head^.Next);
  Head^.Next^.Nuts := 5;
  New(Head^.Next^.Next);
  Head^.Next^.Next^.Nuts := 7;
  Head^.Next^.Next^.Next := nil;
  Sum := 0;
  P := Head;
  while P <> nil do
  begin
    WriteLn(P^.Nuts);
    Sum := Sum + P^.Nuts;
    P := P^.Next;
  end;
  WriteLn('sum ', Sum);
  Dispose(Head^.Next^.Next);
  Dispose(Head^.Next);
  Dispose(Head);
end.`,
          out: "3\n5\n7\nsum 15",
        },
        {
          h: "Forward type names",
          p: "Notice <code>PNode = ^TNode</code> before <code>TNode</code> is fully defined. Pascal allows that so a record can contain a pointer to its own type. <code>nil</code> means \"no node\", and is how the list ends.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q1;
type
  PInt = ^Integer;
var
  P: PInt;
begin
  New(P);
  P^ := 9;
  WriteLn(P^);
  Dispose(P);
end.`, options: ["9", "0", "P", "nil"], answer: "9", why: "P^ is the Integer on the heap, set to 9." },
        { kind: "output", q: "What does this print?", code: `program Q2;
type
  PNode = ^TNode;
  TNode = record
    N: Integer;
    Next: PNode;
  end;
var
  A, B: PNode;
begin
  New(A);
  A^.N := 1;
  New(B);
  B^.N := 2;
  B^.Next := nil;
  A^.Next := B;
  WriteLn(A^.Next^.N);
  Dispose(B);
  Dispose(A);
end.`, options: ["2", "1", "0", "nil"], answer: "2", why: "A^.Next is B, so A^.Next^.N is B's N." },
        { q: "What does nil mean for a pointer?", options: ["It points at nothing", "It points at zero", "It is uninitialized memory", "It is the same as Dispose"], answer: "It points at nothing", why: "nil is the empty pointer value. Dispose frees memory; it does not by itself assign nil unless you do." },
        { q: "What does New(P) do?", options: ["Allocates a value on the heap and points P at it", "Creates a file named P", "Zeros P^ only", "Declares a new type"], answer: "Allocates a value on the heap and points P at it", why: "New is heap allocation. The matching free is Dispose." },
      ],
    },
    {
      id: "objects",
      title: "Objects",
      summary: "Turbo Pascal object types, methods and Init.",
      sections: [
        {
          p: "From Turbo Pascal 5.5, an <code>object</code> type holds fields and <b>methods</b> (procedures and functions declared inside the type). Method bodies are written later as <code>TypeName.MethodName</code>. You call them with a dot on a variable of that object type. This is the OOP style that led toward Delphi; it is not yet the later <code>class</code> model.",
          code: `program Objs;
type
  TStash = object
    Name: string[12];
    Count: Integer;
    procedure Init(AName: string; ACount: Integer);
    procedure Add(N: Integer);
    function Share(Parts: Integer): Integer;
    procedure Report;
  end;

procedure TStash.Init(AName: string; ACount: Integer);
begin
  Name := AName;
  Count := ACount;
end;

procedure TStash.Add(N: Integer);
begin
  Count := Count + N;
end;

function TStash.Share(Parts: Integer): Integer;
begin
  Share := Count div Parts;
end;

procedure TStash.Report;
begin
  WriteLn(Name, ': ', Count);
end;

var
  S: TStash;
begin
  S.Init('Hazel', 10);
  S.Add(5);
  S.Report;
  WriteLn('each ', S.Share(3));
end.`,
          out: "Hazel: 15\neach 5",
        },
        {
          h: "Static objects on the stack",
          p: "A plain <code>var S: TStash</code> lives like a record: no <code>New</code> needed. You can also allocate objects dynamically with <code>New</code> when you want polymorphism and virtual methods; that is a step further than this lesson.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q1;
type
  TBox = object
    N: Integer;
    procedure Inc;
  end;
procedure TBox.Inc;
begin
  N := N + 1;
end;
var
  B: TBox;
begin
  B.N := 2;
  B.Inc;
  B.Inc;
  WriteLn(B.N);
end.`, options: ["4", "2", "3", "0"], answer: "4", why: "Inc runs twice, so N goes from 2 to 4." },
        { kind: "output", q: "What does this print?", code: `program Q2;
type
  TCounter = object
    N: Integer;
    procedure Init;
    procedure Tick;
  end;
procedure TCounter.Init;
begin
  N := 0;
end;
procedure TCounter.Tick;
begin
  N := N + 10;
end;
var
  C: TCounter;
begin
  C.Init;
  C.Tick;
  C.Tick;
  WriteLn(C.N);
end.`, options: ["20", "10", "0", "2"], answer: "20", why: "Init sets 0, then two Tick calls add 10 each." },
        { q: "How is a method body named?", options: ["TypeName.MethodName", "MethodName only", "object.MethodName", "implementation MethodName"], answer: "TypeName.MethodName", why: "TStash.Add tells the compiler which object type the method belongs to." },
        { q: "How does Turbo Pascal object differ from a later Delphi class?", options: ["object is the older TP model; Delphi's class is reference-based with constructors", "They are identical", "object cannot have methods", "class cannot have fields"], answer: "object is the older TP model; Delphi's class is reference-based with constructors", why: "These lessons stay with object, which Turbo Pascal 7 understands." },
      ],
    },
    {
      id: "project",
      title: "Project: a nut ledger",
      summary: "Enums, event records and a small stock report.",
      sections: [
        {
          p: "A ledger of six events updates a stock array indexed by nut kind. Each event is a record with a kind (found, ate or gift), a nut and a count. Applying an event either adds stock, subtracts it, or prints <code>skipped</code> when there are not enough nuts — the same shape as the inventory projects in the other courses, in Turbo Pascal 7 style.",
          code: `program NutLedger;
type
  TKind = (Acorn, Walnut, Hazelnut);
  TEventKind = (Found, Ate, Gift);
  TEvent = record
    Kind: TEventKind;
    Nut: TKind;
    Count: Integer;
  end;
var
  Stock: array[TKind] of Integer;
  Events: array[1..6] of TEvent;
  I: Integer;
  K: TKind;
  Names: array[TKind] of string[10];

procedure Apply(E: TEvent);
begin
  case E.Kind of
    Found: Stock[E.Nut] := Stock[E.Nut] + E.Count;
    Ate, Gift:
      if Stock[E.Nut] >= E.Count then
        Stock[E.Nut] := Stock[E.Nut] - E.Count
      else
        WriteLn('skipped ', Names[E.Nut]);
  end;
end;

begin
  Names[Acorn] := 'acorn';
  Names[Walnut] := 'walnut';
  Names[Hazelnut] := 'hazelnut';
  for K := Acorn to Hazelnut do
    Stock[K] := 0;
  Events[1].Kind := Found; Events[1].Nut := Acorn; Events[1].Count := 8;
  Events[2].Kind := Found; Events[2].Nut := Walnut; Events[2].Count := 3;
  Events[3].Kind := Ate; Events[3].Nut := Acorn; Events[3].Count := 2;
  Events[4].Kind := Gift; Events[4].Nut := Walnut; Events[4].Count := 5;
  Events[5].Kind := Found; Events[5].Nut := Hazelnut; Events[5].Count := 4;
  Events[6].Kind := Gift; Events[6].Nut := Acorn; Events[6].Count := 1;
  for I := 1 to 6 do
    Apply(Events[I]);
  for K := Acorn to Hazelnut do
    WriteLn(Names[K], ': ', Stock[K]);
end.`,
          out: "skipped walnut\nacorn: 5\nwalnut: 3\nhazelnut: 4",
        },
        {
          h: "Ideas to try",
          p: "Load the events from a text file with <code>Reset</code> and <code>Val</code>, store the stock in an <code>object</code> with <code>Apply</code> as a method, or keep the events in a linked list of pointers.",
        },
      ],
      practice: [
        { q: "Why is walnut skipped?", options: ["The gift asks for 5 but only 3 are in stock", "Walnut is not in TKind", "Ate runs after Gift", "Names[Walnut] is empty"], answer: "The gift asks for 5 but only 3 are in stock", why: "Found adds 3 walnuts; Gift 5 fails the Stock >= Count check." },
        { q: "What is the final acorn count?", options: ["5", "8", "6", "7"], answer: "5", why: "Start 0, found 8, ate 2, gift 1 leaves 5." },
        { kind: "output", q: "What does this print?", code: `program Q1;
type
  TKind = (Acorn, Walnut);
var
  Stock: array[TKind] of Integer;
begin
  Stock[Acorn] := 4;
  Stock[Walnut] := 1;
  Stock[Acorn] := Stock[Acorn] - 2;
  WriteLn(Stock[Acorn], ' ', Stock[Walnut]);
end.`, options: ["2 1", "4 1", "2 0", "4 2"], answer: "2 1", why: "Acorn drops by 2; Walnut is untouched." },
      ],
    },
  ],
};
