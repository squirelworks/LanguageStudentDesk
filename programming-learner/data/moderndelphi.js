// Modern Delphi course for the Programming Learner. Written for this project.
// Schema: see data/python.js. Complete console programs with `out` (and
// practice of kind "output") are compiled and run by tools/check_packs.py
// through tools/run_moderndelphi.py (Free Pascal in Delphi mode, with the
// System. prefix dropped from unit names). Sections that use syntax Free
// Pascal lacks (inline variables, anonymous methods) have no `out`.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.moderndelphi = {
  id: "moderndelphi",
  name: "Delphi",
  title: "Modern Delphi: Object Pascal today",
  intro:
    "Delphi is still developed and sold today by Embarcadero, as the successor of the Borland line. It builds native programs for Windows, macOS, Linux, Android and iOS from one Object Pascal code base, with the VCL for Windows and FireMonkey for the other platforms. The language has grown a lot since Delphi 7: Unicode strings with helper methods, generics and collections, records with methods, <code>for ... in</code> loops, anonymous methods and inline variables. This course teaches the current language with small console programs. If you want the classic Delphi 5, 6 and 7, that course is in the older section. To run a program yourself, make a new console application in Delphi (the free Community Edition is enough) and paste the code in.",
  comment: "//",
  caseInsensitive: true,
  keywords: [
    "PROGRAM", "USES", "TYPE", "CLASS", "RECORD", "VAR", "CONST", "BEGIN", "END", "PROCEDURE", "FUNCTION", "IF", "THEN", "ELSE",
    "FOR", "TO", "DOWNTO", "DO", "WHILE", "REPEAT", "UNTIL", "CASE", "OF", "IN", "TRY", "EXCEPT", "ON", "FINALLY", "RAISE", "NIL",
    "TRUE", "FALSE", "AND", "OR", "NOT", "DIV", "MOD", "IS", "AS", "PRIVATE", "PUBLIC", "PROPERTY", "READ", "WRITE",
    "CONSTRUCTOR", "DESTRUCTOR", "INHERITED", "OVERRIDE", "VIRTUAL", "RESULT", "SELF", "INTEGER", "STRING", "BOOLEAN", "DOUBLE",
    "ARRAY", "REFERENCE",
  ],
  builtins: [
    "WRITELN", "WRITE", "FORMAT", "INTTOSTR", "BOOLTOSTR", "LENGTH", "POS", "EXCEPTION", "TLIST", "TDICTIONARY", "TOBJECTLIST", "FREEANDNIL",
  ],
  lessons: [
    {
      id: "first",
      title: "A modern console program",
      summary: "program, uses System.SysUtils, Writeln and Unicode strings.",
      sections: [
        {
          p: "A console program starts with <code>program</code>, asks for a console window with <code>{$APPTYPE CONSOLE}</code>, and lists the units it needs after <code>uses</code>. Units today have <b>namespaced</b> names such as <code>System.SysUtils</code>; Delphi 7 just said <code>SysUtils</code>. The code runs between <code>begin</code> and <code>end.</code> (with a full stop).",
          code: `program Hello;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
begin
  Writeln('Hello, squirrel!');
  Writeln(Format('%d nuts, %.2f kg', [42, 1.5]));
end.`,
          out: "Hello, squirrel!\n42 nuts, 1.50 kg",
        },
        {
          h: "Strings are Unicode",
          p: "Since Delphi 2009, <code>string</code> is a Unicode string, so any language's text fits in it. <code>Length</code> counts UTF-16 code units, and <code>s[1]</code> is still the first character: the classic functions count from 1.",
          code: `program Strings;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
var
  S: string;
begin
  S := 'Hazelnut';
  Writeln(Length(S));
  Writeln(S[1]);
  Writeln(Pos('nut', S));
end.`,
          out: "8\nH\n6",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q1;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
begin
  Writeln(Format('%s has %d', ['Oak', 3]));
end.`, options: ["Oak has 3", "%s has %d", "Oak has %d", "'Oak' has 3"], answer: "Oak has 3", why: "Format replaces each %s with a string and each %d with an integer, in order." },
        { kind: "output", q: "What does this print?", code: `program Q2;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
var
  S: string;
begin
  S := 'Acorn';
  Writeln(S[1], Length(S));
end.`, options: ["A5", "c5", "A4", "Acorn5"], answer: "A5", why: "S[1] is the first character, and Length gives 5. Writeln prints the items side by side." },
        { q: "Which company develops Delphi today?", options: ["Embarcadero", "Borland", "Microsoft", "CodeGear only"], answer: "Embarcadero", why: "Borland's tools passed to CodeGear and then to Embarcadero, which still releases new versions." },
        { q: "What is System.SysUtils?", options: ["The namespaced name of the SysUtils unit", "A Windows system file", "A compiler switch", "A class"], answer: "The namespaced name of the SysUtils unit", why: "Modern Delphi groups its units into namespaces such as System, Vcl and FMX." },
      ],
    },
    {
      id: "helpers",
      title: "String helpers",
      summary: "Methods on strings, and why they count from 0.",
      sections: [
        {
          p: "Modern Delphi lets you call methods on a string directly: <code>S.ToUpper</code>, <code>S.Contains</code>, <code>S.Replace</code>, <code>S.Split</code>. These come from a <b>record helper</b> for <code>string</code> in <code>System.SysUtils</code>.",
          code: `program Helpers;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
var
  S: string;
begin
  S := 'Hazelnut';
  Writeln(S.ToUpper);
  Writeln(BoolToStr(S.Contains('zel'), True));
  Writeln(S.Replace('nut', 'tree'));
  Writeln(string.Join(', ', ['oak', 'elm', 'ash']));
end.`,
          out: "HAZELNUT\nTrue\nHazeltree\noak, elm, ash",
        },
        {
          h: "Helpers count from 0",
          p: "Watch out: the helper methods use <b>0-based</b> positions, like most other languages, while the classic functions such as <code>Pos</code> and <code>Copy</code> and the <code>S[i]</code> index count from 1. <code>S.IndexOf</code> returns -1 when nothing is found, where <code>Pos</code> returns 0.",
          code: `program Zero;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
var
  S: string;
begin
  S := 'Hazelnut';
  Writeln(S.IndexOf('nut'), ' ', Pos('nut', S));
  Writeln(S.Substring(0, 5), ' ', Copy(S, 1, 5));
  Writeln(S.IndexOf('pine'), ' ', Pos('pine', S));
end.`,
          out: "5 6\nHazel Hazel\n-1 0",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q1;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
var
  S: string;
begin
  S := 'Squirrel';
  Writeln(S.IndexOf('q'));
end.`, options: ["1", "2", "0", "-1"], answer: "1", why: "Helper methods count from 0, so S is at 0 and q is at 1." },
        { kind: "output", q: "What does this print?", code: `program Q2;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
var
  S: string;
begin
  S := 'Squirrel';
  Writeln(Pos('q', S));
end.`, options: ["2", "1", "0", "-1"], answer: "2", why: "Pos is a classic function and counts from 1." },
        { kind: "output", q: "What does this print?", code: `program Q3;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
begin
  Writeln('a-b-c'.Replace('-', '+'));
end.`, options: ["a+b+c", "a+b-c", "a-b-c", "abc"], answer: "a+b+c", why: "Replace changes every match, not just the first one." },
        { q: "What does S.IndexOf return when the text is not found?", options: ["-1", "0", "Length(S)", "It raises an exception"], answer: "-1", why: "0 is a real position for a 0-based method, so not-found is -1. Pos, which counts from 1, uses 0 instead." },
      ],
    },
    {
      id: "records",
      title: "Records with methods",
      summary: "Advanced records: fields, methods and constructors.",
      sections: [
        {
          p: "A <code>record</code> can have methods and constructors, not just fields. Records are <b>value types</b>: assigning one copies it, and there is nothing to free. They suit small things such as points, money amounts and dates.",
          code: `program Points;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
type
  TPoint2 = record
    X, Y: Integer;
    constructor Create(AX, AY: Integer);
    function Sum: Integer;
  end;

constructor TPoint2.Create(AX, AY: Integer);
begin
  X := AX;
  Y := AY;
end;

function TPoint2.Sum: Integer;
begin
  Result := X + Y;
end;

var
  A, B: TPoint2;
begin
  A := TPoint2.Create(2, 5);
  B := A;
  B.X := 10;
  Writeln(A.Sum, ' ', B.Sum);
end.`,
          out: "7 15",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q1;
{$APPTYPE CONSOLE}
type
  TBox = record
    N: Integer;
  end;
var
  A, B: TBox;
begin
  A.N := 1;
  B := A;
  B.N := 9;
  Writeln(A.N);
end.`, options: ["1", "9", "0", "10"], answer: "1", why: "Records are copied on assignment, so changing B leaves A alone." },
        { q: "Do you need to Free a record?", options: ["No, records are value types", "Yes, always", "Only if it has methods", "Only in a try...finally"], answer: "No, records are value types", why: "Records live where they are declared and go away by themselves. Class instances are the ones you free." },
        { q: "What is Result inside a function?", options: ["The value the function returns", "A keyword that ends the function", "The last line printed", "The function's name"], answer: "The value the function returns", why: "Assign to Result to set the return value. Unlike Exit, it does not leave the function." },
      ],
    },
    {
      id: "classes",
      title: "Classes and properties",
      summary: "Constructors, properties, try...finally and virtual methods.",
      sections: [
        {
          p: "A <code>class</code> instance lives on the heap, so you create it and free it yourself. The standard pattern puts <code>Free</code> in a <code>try ... finally</code> block, so it runs even if something goes wrong. A <code>property</code> looks like a field to the caller but can go through a method.",
          code: `program Stash;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
type
  TStash = class
  private
    FNuts: Integer;
    procedure SetNuts(Value: Integer);
  public
    constructor Create(Start: Integer);
    property Nuts: Integer read FNuts write SetNuts;
  end;

constructor TStash.Create(Start: Integer);
begin
  inherited Create;
  FNuts := Start;
end;

procedure TStash.SetNuts(Value: Integer);
begin
  if Value < 0 then
    Value := 0;
  FNuts := Value;
end;

var
  S: TStash;
begin
  S := TStash.Create(5);
  try
    S.Nuts := S.Nuts + 3;
    Writeln(S.Nuts);
    S.Nuts := -2;
    Writeln(S.Nuts);
  finally
    S.Free;
  end;
end.`,
          out: "8\n0",
        },
        {
          h: "Inheritance and virtual methods",
          p: "A class can extend another. Mark a method <code>virtual</code> in the parent and <code>override</code> in the child, and the right version is chosen by the object's real class at run time.",
          code: `program Animals;
{$APPTYPE CONSOLE}
type
  TAnimal = class
    function Sound: string; virtual;
  end;
  TSquirrel = class(TAnimal)
    function Sound: string; override;
  end;

function TAnimal.Sound: string;
begin
  Result := '...';
end;

function TSquirrel.Sound: string;
begin
  Result := 'Chitter';
end;

var
  A: TAnimal;
begin
  A := TSquirrel.Create;
  try
    Writeln(A.Sound);
  finally
    A.Free;
  end;
end.`,
          out: "Chitter",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q1;
{$APPTYPE CONSOLE}
type
  TBase = class
    function Name: string; virtual;
  end;
  TChild = class(TBase)
    function Name: string; override;
  end;

function TBase.Name: string;
begin
  Result := 'Base';
end;

function TChild.Name: string;
begin
  Result := 'Child+' + inherited Name;
end;

var
  B: TBase;
begin
  B := TChild.Create;
  try
    Writeln(B.Name);
  finally
    B.Free;
  end;
end.`, options: ["Child+Base", "Base", "Child", "Base+Child"], answer: "Child+Base", why: "The object is a TChild, so its override runs, and inherited Name calls the parent's version." },
        { q: "Why put Free in a finally block?", options: ["So the object is freed even if an exception happens", "Because Free only works there", "To make it faster", "So it is freed twice"], answer: "So the object is freed even if an exception happens", why: "The finally part always runs, whether the try part finishes normally or raises an exception." },
        { q: "What does a property with a write method let you do?", options: ["Check or change a value as it is set", "Make the field public", "Store the value twice", "Stop the value from being read"], answer: "Check or change a value as it is set", why: "Assigning to the property calls the setter, which can validate the value, as SetNuts does." },
      ],
    },
    {
      id: "generics",
      title: "Generics and collections",
      summary: "TList<T>, TDictionary<K, V> and for ... in.",
      sections: [
        {
          p: "<code>System.Generics.Collections</code> has type-safe collections. <code>TList&lt;Integer&gt;</code> is a growable list of integers, and <code>for X in List do</code> walks through it. Collections are classes, so they are freed in a <code>finally</code>.",
          code: `program Lists;
{$APPTYPE CONSOLE}
uses
  System.SysUtils, System.Generics.Collections;
var
  L: TList<Integer>;
  N, Total: Integer;
begin
  L := TList<Integer>.Create;
  try
    L.Add(30);
    L.Add(12);
    L.Add(5);
    L.Sort;
    Total := 0;
    for N in L do
    begin
      Write(N, ' ');
      Total := Total + N;
    end;
    Writeln;
    Writeln('Count ', L.Count, ', total ', Total, ', first ', L[0]);
  finally
    L.Free;
  end;
end.`,
          out: "5 12 30\nCount 3, total 47, first 5",
        },
        {
          h: "Dictionaries",
          p: "<code>TDictionary&lt;string, Integer&gt;</code> maps keys to values. <code>TryGetValue</code> looks a key up without raising an exception when it is missing. A dictionary keeps no particular order, so do not rely on the order of a <code>for ... in</code> over it.",
          code: `program Dicts;
{$APPTYPE CONSOLE}
uses
  System.SysUtils, System.Generics.Collections;
var
  D: TDictionary<string, Integer>;
  V: Integer;
begin
  D := TDictionary<string, Integer>.Create;
  try
    D.Add('oak', 3);
    D.Add('elm', 7);
    D['oak'] := D['oak'] + 1;
    Writeln(D['oak']);
    if not D.TryGetValue('ash', V) then
      Writeln('No ash trees');
    Writeln(D.Count);
  finally
    D.Free;
  end;
end.`,
          out: "4\nNo ash trees\n2",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q1;
{$APPTYPE CONSOLE}
uses
  System.Generics.Collections;
var
  L: TList<string>;
begin
  L := TList<string>.Create;
  try
    L.Add('elm');
    L.Add('ash');
    L.Add('oak');
    Writeln(L[1]);
  finally
    L.Free;
  end;
end.`, options: ["ash", "elm", "oak", "1"], answer: "ash", why: "A TList is indexed from 0, so L[1] is the second item added." },
        { kind: "output", q: "What does this print?", code: `program Q2;
{$APPTYPE CONSOLE}
uses
  System.Generics.Collections;
var
  L: TList<Integer>;
  N: Integer;
begin
  L := TList<Integer>.Create;
  try
    L.AddRange([3, 1, 2]);
    L.Sort;
    for N in L do
      Write(N);
    Writeln;
  finally
    L.Free;
  end;
end.`, options: ["123", "312", "321", "6"], answer: "123", why: "Sort puts the list in ascending order before the loop prints it." },
        { q: "What does the <Integer> in TList<Integer> do?", options: ["Says the list only holds integers, checked by the compiler", "Sets the list's length", "Makes the list sorted", "Converts items to integers"], answer: "Says the list only holds integers, checked by the compiler", why: "That is a generic type argument. Adding a string to a TList<Integer> will not compile." },
      ],
    },
    {
      id: "exceptions",
      title: "Exceptions",
      summary: "try...except, raise and your own exception classes.",
      sections: [
        {
          p: "<code>raise</code> throws an exception object, and <code>try ... except on E: SomeClass do</code> catches it. Make your own exception classes by inheriting from <code>Exception</code>. The first matching <code>on</code> branch wins, so put specific classes before general ones.",
          code: `program Errors;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
type
  EOutOfNuts = class(Exception);

procedure Eat(var Stash: Integer);
begin
  if Stash = 0 then
    raise EOutOfNuts.Create('The stash is empty');
  Dec(Stash);
end;

var
  Stash: Integer;
begin
  Stash := 1;
  try
    Eat(Stash);
    Writeln('Ate one, ', Stash, ' left');
    Eat(Stash);
    Writeln('Never printed');
  except
    on E: EOutOfNuts do
      Writeln('Caught: ', E.Message);
    on E: Exception do
      Writeln('Something else: ', E.Message);
  end;
end.`,
          out: "Ate one, 0 left\nCaught: The stash is empty",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program Q1;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
begin
  try
    Writeln('A');
    raise Exception.Create('B');
    Writeln('C');
  except
    on E: Exception do
      Writeln(E.Message);
  end;
  Writeln('D');
end.`, options: ["A\nB\nD", "A\nC\nD", "A\nB\nC\nD", "A\nD"], answer: "A\nB\nD", why: "raise jumps straight to the except block, so C is skipped. After the except block the program carries on with D." },
        { kind: "output", q: "What does this print?", code: `program Q2;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
begin
  try
    try
      raise Exception.Create('oops');
    finally
      Writeln('cleanup');
    end;
  except
    Writeln('handled');
  end;
end.`, options: ["cleanup\nhandled", "handled\ncleanup", "handled", "cleanup"], answer: "cleanup\nhandled", why: "The finally block runs first, while the exception passes through, and then the outer except catches it." },
        { q: "How do you declare your own exception class?", options: ["EMyError = class(Exception);", "EMyError = exception;", "EMyError = record(Exception);", "raise class EMyError;"], answer: "EMyError = class(Exception);", why: "An exception is a class that inherits from Exception. The E prefix is the usual naming habit." },
      ],
    },
    {
      id: "newer",
      title: "Newer syntax",
      summary: "Inline variables, type inference and anonymous methods.",
      sections: [
        {
          p: "These features are reading material: they need a current Delphi compiler, so the examples have no output shown here.",
        },
        {
          h: "Inline variables",
          p: "Since Delphi 10.3 you can declare a variable where you first need it, inside <code>begin ... end</code>, instead of in a <code>var</code> block at the top. The type can be left out when it is clear from the value, and a loop counter can be declared right in the <code>for</code>. An inline variable only exists inside the block where it is declared.",
          code: `program Inline;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
begin
  var Name: string := 'Hazel';
  var Count := 3;              // the type, Integer, is inferred
  for var I := 1 to Count do
    Writeln(Name, ' ', I);
end.`,
        },
        {
          h: "Anonymous methods",
          p: "An anonymous method is a procedure or function without a name, written right where it is used, and it can use the variables around it. Its type is written <code>reference to function ...</code>. They are used for callbacks, sorting rules and background tasks.",
          code: `program Anon;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
type
  TIntFunc = reference to function(N: Integer): Integer;

function MakeAdder(Amount: Integer): TIntFunc;
begin
  Result := function(N: Integer): Integer
    begin
      Result := N + Amount;
    end;
end;

begin
  var AddFive := MakeAdder(5);
  Writeln(AddFive(10));        // 15
end.`,
        },
      ],
      practice: [
        { q: "Where can an inline variable be used?", options: ["Only inside the block where it is declared", "Anywhere in the program", "Only in the var section", "Only inside for loops"], answer: "Only inside the block where it is declared", why: "Inline variables are scoped to their begin...end block, which keeps them close to where they are used." },
        { q: "What type does var Count := 3; give Count?", options: ["Integer", "string", "Double", "It must be written out"], answer: "Integer", why: "With type inference the compiler takes the type from the value, and 3 is an Integer." },
        { q: "What can an anonymous method use that a plain procedure cannot?", options: ["Local variables from where it was written", "More than three parameters", "Strings", "Exceptions"], answer: "Local variables from where it was written", why: "It captures the variables around it. In MakeAdder, the returned function keeps Amount after MakeAdder has returned." },
      ],
    },
  ],
};
