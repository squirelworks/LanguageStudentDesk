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
    {
      id: "enums",
      title: "Enumerations, sets and case",
      summary: "Naming a fixed list of choices, and holding several at once.",
      sections: [
        {
          p: "An <b>enumerated type</b> lists every value a variable may hold, with names instead of magic numbers. <code>Ord</code> gives a value's position (from 0), <code>Succ</code> and <code>Pred</code> step to the next and previous, and <code>Low</code>/<code>High</code> give the first and last, so a <code>for</code> loop can visit them all. A <code>case</code> statement picks a branch for each value.",
          code: `program Seasons;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
type
  TSeason = (Spring, Summer, Autumn, Winter);
const
  Names: array[TSeason] of string = ('spring', 'summer', 'autumn', 'winter');
var
  S: TSeason;
begin
  for S := Low(TSeason) to High(TSeason) do
  begin
    Write(Ord(S), ' ', Names[S], ': ');
    case S of
      Spring, Summer: Writeln('find food');
      Autumn: Writeln('bury nuts');
      Winter: Writeln('dig them up');
    end;
  end;
  Writeln('after autumn comes ', Names[Succ(Autumn)]);
end.`,
          out: "0 spring: find food\n1 summer: find food\n2 autumn: bury nuts\n3 winter: dig them up\nafter autumn comes winter",
        },
        {
          h: "Sets",
          p: "A <b>set</b> holds any combination of values from a small ordinal type, such as an enumeration or the letters. <code>in</code> tests membership, <code>+</code> joins two sets, <code>*</code> keeps what they share and <code>-</code> removes. <code>Include</code> and <code>Exclude</code> change a set in place. Pascal has had sets since the 1970s; they are a compact, readable way to keep flags.",
          code: `program Sets;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
type
  TNut = (Acorn, Hazelnut, Walnut, Chestnut, Beechnut);
  TNuts = set of TNut;
const
  Names: array[TNut] of string = ('acorn', 'hazelnut', 'walnut', 'chestnut', 'beechnut');
procedure Show(const Title: string; Nuts: TNuts);
var
  N: TNut;
begin
  Write(Title, ':');
  for N in Nuts do
    Write(' ', Names[N]);
  Writeln;
end;
var
  Sam, Pip: TNuts;
begin
  Sam := [Acorn, Walnut, Beechnut];
  Pip := [Hazelnut, Walnut];
  Show('both like', Sam * Pip);
  Show('either likes', Sam + Pip);
  Show('only Sam', Sam - Pip);
  Include(Pip, Chestnut);
  Writeln('Pip likes chestnuts: ', Chestnut in Pip);
  Writeln('u is a vowel: ', 'u' in ['a', 'e', 'i', 'o', 'u']);
end.`,
          out: "both like: walnut\neither likes: acorn hazelnut walnut beechnut\nonly Sam: acorn beechnut\nPip likes chestnuts: TRUE\nu is a vowel: TRUE",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program P;
{$APPTYPE CONSOLE}
type
  TSize = (Small, Medium, Large);
begin
  Writeln(Ord(Large), ' ', Ord(Succ(Small)));
end.`, options: ["2 1", "3 2", "2 0", "1 2"], answer: "2 1", why: "Positions start at 0, so Large is 2, and Succ(Small) is Medium, which is 1." },
        { kind: "output", q: "What does this print?", code: `program P;
{$APPTYPE CONSOLE}
var
  A, B: set of 1..9;
begin
  A := [1, 2, 3, 4];
  B := [3, 4, 5];
  Writeln(3 in (A * B), ' ', 5 in (A - B));
end.`, options: ["TRUE FALSE", "TRUE TRUE", "FALSE FALSE", "FALSE TRUE"], answer: "TRUE FALSE", why: "A * B is [3, 4], which holds 3. A - B is [1, 2], which does not hold 5." },
        { q: "Why use an enumerated type instead of plain integers 0 to 3?", options: ["The names make the code readable and the compiler rejects values outside the list", "It runs faster", "Integers cannot be used in case statements", "Enumerations can hold any number"], answer: "The names make the code readable and the compiler rejects values outside the list", why: "TSeason can only ever be one of its four names, and the code says which." },
      ],
    },
    {
      id: "arrays",
      title: "Dynamic arrays and open arrays",
      summary: "Arrays whose size is set while the program runs.",
      sections: [
        {
          p: "A <b>dynamic array</b>, declared as <code>array of Integer</code>, has no fixed size. <code>SetLength</code> gives it room (new elements start at 0) and can grow it later, keeping what is there. Indexes run from 0 to <code>High(A)</code>, and <code>Length</code> gives the count. Delphi frees the memory itself when the array is no longer used.",
          code: `program Dyn;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
var
  Days: array of Integer;
  I, Total: Integer;
begin
  SetLength(Days, 3);
  Days[0] := 4;
  Days[1] := 9;
  Days[2] := 2;
  SetLength(Days, 5);
  Days[4] := 7;
  Total := 0;
  for I := 0 to High(Days) do
  begin
    Write(Days[I], ' ');
    Total := Total + Days[I];
  end;
  Writeln;
  Writeln(Length(Days), ' days, ', Total, ' nuts');
end.`,
          out: "4 9 2 0 7\n5 days, 22 nuts",
        },
        {
          h: "Open array parameters",
          p: "A parameter written <code>const Values: array of Integer</code> is an <b>open array</b>: the routine accepts a static array, a dynamic array, or a list written in place in square brackets. Inside, it is indexed from 0 to <code>High(Values)</code>. That is how <code>Format</code> takes its list of arguments.",
          code: `program OpenArr;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
function Largest(const Values: array of Integer): Integer;
var
  I: Integer;
begin
  Result := Values[0];
  for I := 1 to High(Values) do
    if Values[I] > Result then
      Result := Values[I];
end;
var
  Fixed: array[1..4] of Integer = (3, 8, 1, 6);
begin
  Writeln(Largest(Fixed));
  Writeln(Largest([12, 40, 7]));
  Writeln(Format('%s found %d nuts on day %d', ['Sam', Largest([5, 9]), 2]));
end.`,
          out: "8\n40\nSam found 9 nuts on day 2",
        },
        {
          h: "Copying",
          p: "Dynamic arrays are reference types: assigning one to another makes both names share the same elements. <code>Copy</code> makes an independent copy, and it can take just a slice: <code>Copy(A, 1, 2)</code> is two elements starting at index 1.",
          code: `program CopyArr;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
var
  A, B, C: array of Integer;
begin
  SetLength(A, 3);
  A[0] := 1; A[1] := 2; A[2] := 3;
  B := A;
  C := Copy(A);
  B[0] := 99;
  Writeln(A[0], ' ', B[0], ' ', C[0]);
  C := Copy(A, 1, 2);
  Writeln(Length(C), ': ', C[0], ' ', C[1]);
end.`,
          out: "99 99 1\n2: 2 3",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program P;
{$APPTYPE CONSOLE}
var
  A: array of Integer;
begin
  SetLength(A, 2);
  A[1] := 5;
  SetLength(A, 4);
  Writeln(A[0], ' ', A[1], ' ', High(A));
end.`, options: ["0 5 3", "0 5 4", "5 0 3", "0 0 3"], answer: "0 5 3", why: "New elements start at 0, growing keeps A[1], and High of a 4-element array is 3." },
        { kind: "output", q: "What does this print?", code: `program P;
{$APPTYPE CONSOLE}
function Sum(const V: array of Integer): Integer;
var
  X: Integer;
begin
  Result := 0;
  for X in V do
    Result := Result + X;
end;
begin
  Writeln(Sum([1, 2, 3, 4]));
end.`, options: ["10", "4", "24", "1234"], answer: "10", why: "The open array takes the list in brackets, and the loop adds every element." },
        { q: "After B := A with two dynamic arrays, what happens when you change B[0]?", options: ["A[0] changes too, because they share the elements", "Only B changes", "The program will not compile", "A is freed"], answer: "A[0] changes too, because they share the elements", why: "Use Copy(A) when you need an independent array." },
      ],
    },
    {
      id: "interfaces",
      title: "Interfaces",
      summary: "Promises a class keeps, and objects that free themselves.",
      sections: [
        {
          p: "An <code>interface</code> lists methods without any code. A class that names the interface promises to provide them, and code written against the interface works with every such class. Classes that implement interfaces usually inherit from <code>TInterfacedObject</code>, which does the bookkeeping. <code>Describe</code> takes its parameter without <code>const</code> on purpose: a brand-new object passed straight into a <code>const</code> interface parameter is never counted, so it is never freed.",
          code: `program Shapes;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
type
  IStore = interface
    function Name: string;
    function Capacity: Integer;
  end;
  THollow = class(TInterfacedObject, IStore)
    function Name: string;
    function Capacity: Integer;
  end;
  TBurrow = class(TInterfacedObject, IStore)
  private
    FDepth: Integer;
  public
    constructor Create(Depth: Integer);
    function Name: string;
    function Capacity: Integer;
  end;
function THollow.Name: string;
begin
  Result := 'tree hollow';
end;
function THollow.Capacity: Integer;
begin
  Result := 120;
end;
constructor TBurrow.Create(Depth: Integer);
begin
  inherited Create;
  FDepth := Depth;
end;
function TBurrow.Name: string;
begin
  Result := Format('burrow %d cm deep', [FDepth]);
end;
function TBurrow.Capacity: Integer;
begin
  Result := FDepth * 2;
end;
procedure Describe(S: IStore);
begin
  Writeln(S.Name, ' holds ', S.Capacity);
end;
begin
  Describe(THollow.Create);
  Describe(TBurrow.Create(30));
end.`,
          out: "tree hollow holds 120\nburrow 30 cm deep holds 60",
        },
        {
          h: "Reference counting",
          p: "Objects used through an interface variable are <b>reference counted</b>: Delphi counts how many interface variables point at the object and frees it when the count drops to zero. So, unlike ordinary objects, you do not call <code>Free</code> and need no <code>try ... finally</code>. Do not mix the two styles for one object: keep it in interface variables only.",
          code: `program Counting;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
type
  IGreeter = interface
    procedure Hello;
  end;
  TGreeter = class(TInterfacedObject, IGreeter)
  private
    FName: string;
  public
    constructor Create(const Name: string);
    destructor Destroy; override;
    procedure Hello;
  end;
constructor TGreeter.Create(const Name: string);
begin
  inherited Create;
  FName := Name;
  Writeln('create ', FName);
end;
destructor TGreeter.Destroy;
begin
  Writeln('free ', FName);
  inherited;
end;
procedure TGreeter.Hello;
begin
  Writeln('hello from ', FName);
end;
procedure Run;
var
  A, B: IGreeter;
begin
  A := TGreeter.Create('Sam');
  B := A;
  A := nil;
  Writeln('A cleared');
  B.Hello;
  B := nil;
  Writeln('B cleared');
end;
begin
  Run;
end.`,
          out: "create Sam\nA cleared\nhello from Sam\nfree Sam\nB cleared",
        },
      ],
      practice: [
        { q: "When is an object used only through interface variables freed?", options: ["When the last interface variable pointing at it is cleared or goes out of scope", "Only when you call Free", "When the program ends", "Never"], answer: "When the last interface variable pointing at it is cleared or goes out of scope", why: "TInterfacedObject counts the references and frees itself at zero." },
        { q: "What does an interface declaration contain?", options: ["Method headings only, with no code", "Fields and their starting values", "A full class with code", "Only constants"], answer: "Method headings only, with no code", why: "The classes that implement it supply the code." },
        { kind: "output", q: "What does this print?", code: `program P;
{$APPTYPE CONSOLE}
type
  INum = interface
    function Value: Integer;
  end;
  TTwo = class(TInterfacedObject, INum)
    function Value: Integer;
  end;
function TTwo.Value: Integer;
begin
  Result := 2;
end;
var
  N: INum;
begin
  N := TTwo.Create;
  Writeln(N.Value * 21);
end.`, options: ["42", "2", "21", "221"], answer: "42", why: "N.Value calls TTwo's method, which returns 2." },
      ],
    },
    {
      id: "files",
      title: "Text and files with TStringList",
      summary: "Lists of lines that can be sorted, saved and loaded.",
      sections: [
        {
          p: "<code>TStringList</code> from <code>System.Classes</code> is a list of strings with handy extras: <code>Sort</code>, <code>IndexOf</code>, <code>SaveToFile</code> and <code>LoadFromFile</code>. It is a class, so create it, use it inside <code>try</code>, and free it in <code>finally</code>.",
          code: `program Lines;
{$APPTYPE CONSOLE}
uses
  System.SysUtils, System.Classes;
var
  Trees, Again: TStringList;
  I: Integer;
begin
  Trees := TStringList.Create;
  Again := TStringList.Create;
  try
    Trees.Add('oak');
    Trees.Add('hazel');
    Trees.Add('beech');
    Trees.Sort;
    Writeln('sorted: ', Trees.CommaText);
    Writeln('hazel is at ', Trees.IndexOf('hazel'));
    Trees.SaveToFile('trees.txt');
    Again.LoadFromFile('trees.txt');
    for I := 0 to Again.Count - 1 do
      Writeln(I + 1, '. ', Again[I]);
  finally
    Again.Free;
    Trees.Free;
  end;
end.`,
          out: "sorted: beech,hazel,oak\nhazel is at 1\n1. beech\n2. hazel\n3. oak",
        },
        {
          h: "Name=value pairs",
          p: "A <code>TStringList</code> also understands lines of the form <code>name=value</code>, which makes a simple settings file. <code>Values['name']</code> reads or sets a value, and an unknown name gives an empty string. <code>StrToIntDef</code> converts text to a number with a fallback for bad input.",
          code: `program Settings;
{$APPTYPE CONSOLE}
uses
  System.SysUtils, System.Classes;
var
  Cfg: TStringList;
begin
  Cfg := TStringList.Create;
  try
    Cfg.Add('name=Sam');
    Cfg.Add('nuts=42');
    Cfg.Values['nuts'] := '50';
    Cfg.Values['tree'] := 'oak';
    Writeln(Cfg.Values['name'], ' keeps ', StrToIntDef(Cfg.Values['nuts'], 0), ' nuts');
    Writeln('missing: "', Cfg.Values['colour'], '"');
    Writeln(StrToIntDef('lots', -1));
    Writeln(Cfg.Text.Trim);
  finally
    Cfg.Free;
  end;
end.`,
          out: "Sam keeps 50 nuts\nmissing: \"\"\n-1\nname=Sam\nnuts=50\ntree=oak",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program P;
{$APPTYPE CONSOLE}
uses
  System.SysUtils, System.Classes;
var
  L: TStringList;
begin
  L := TStringList.Create;
  try
    L.Add('pine');
    L.Add('ash');
    L.Sort;
    Writeln(L[0], ' ', L.Count);
  finally
    L.Free;
  end;
end.`, options: ["ash 2", "pine 2", "ash 1", "pine 1"], answer: "ash 2", why: "Sort puts \"ash\" first, and the list holds two lines." },
        { q: "Why is a TStringList freed in a finally block?", options: ["It is a class, so it must be freed even if an exception happens", "finally makes it sort", "Strings are freed only in finally", "It is reference counted"], answer: "It is a class, so it must be freed even if an exception happens", why: "Ordinary objects are not reference counted; try ... finally guarantees Free runs." },
        { kind: "output", q: "What does this print?", code: `program P;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
begin
  Writeln(StrToIntDef('12', 0) + StrToIntDef('x', 5));
end.`, options: ["17", "12", "5", "An exception"], answer: "17", why: "'12' converts to 12; 'x' is not a number, so the default 5 is used." },
      ],
    },
    {
      id: "project",
      title: "Project: a nut report",
      summary: "Records, enums, dynamic arrays and Format in one program.",
      sections: [
        {
          p: "This program stores a season of finds as an array of records, adds them up per kind of nut with an array indexed by an enumeration, finds the best day, and prints a report with <code>Format</code>. In <code>Format</code>, <code>%-9s</code> left-aligns text in 9 columns and <code>%4d</code> right-aligns a number in 4; <code>%5.1f</code> prints a real number with one decimal.",
          code: `program NutReport;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
type
  TNut = (Acorn, Hazelnut, Walnut);
  TFind = record
    Day: Integer;
    Nut: TNut;
    Count: Integer;
  end;
const
  Names: array[TNut] of string = ('acorn', 'hazelnut', 'walnut');
var
  Finds: array of TFind;
  Totals: array[TNut] of Integer;
  N: TNut;
  I, All, BestDay, BestCount: Integer;
procedure AddFind(Day: Integer; Nut: TNut; Count: Integer);
begin
  SetLength(Finds, Length(Finds) + 1);
  Finds[High(Finds)].Day := Day;
  Finds[High(Finds)].Nut := Nut;
  Finds[High(Finds)].Count := Count;
end;
begin
  AddFind(1, Acorn, 6);
  AddFind(1, Hazelnut, 2);
  AddFind(2, Walnut, 1);
  AddFind(3, Acorn, 9);
  AddFind(3, Hazelnut, 4);
  AddFind(4, Acorn, 3);
  for N := Low(TNut) to High(TNut) do
    Totals[N] := 0;
  All := 0;
  BestDay := 0;
  BestCount := 0;
  for I := 0 to High(Finds) do
  begin
    Inc(Totals[Finds[I].Nut], Finds[I].Count);
    Inc(All, Finds[I].Count);
    if Finds[I].Count > BestCount then
    begin
      BestCount := Finds[I].Count;
      BestDay := Finds[I].Day;
    end;
  end;
  for N := Low(TNut) to High(TNut) do
    Writeln(Format('%-9s%4d %5.1f%%', [Names[N], Totals[N], 100 * Totals[N] / All]));
  Writeln(Format('%-9s%4d', ['total', All]));
  Writeln(Format('best single find: %d on day %d', [BestCount, BestDay]));
end.`,
          out: "acorn      18  72.0%\nhazelnut    6  24.0%\nwalnut      1   4.0%\ntotal      25\nbest single find: 9 on day 3",
        },
        {
          h: "Ideas to try",
          p: "Save the finds to a file with a <code>TStringList</code> (one <code>day,nut,count</code> line each) and load them back, turn <code>TFind</code> into a record with a <code>ToString</code> method, or replace the array of totals with a <code>TDictionary&lt;string, Integer&gt;</code> so new kinds of nut need no change to the type.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program P;
{$APPTYPE CONSOLE}
uses
  System.SysUtils;
begin
  Writeln(Format('[%-4s][%3d]', ['ab', 7]));
end.`, options: ["[ab  ][  7]", "[  ab][7  ]", "[ab][7]", "[ab  ][7  ]"], answer: "[ab  ][  7]", why: "A minus sign left-aligns; without it the value is right-aligned in the width." },
        { q: "Why can Totals be declared as array[TNut] of Integer?", options: ["An enumeration can be used as an array's index type", "TNut is an integer", "Arrays need an enumeration", "It makes the array dynamic"], answer: "An enumeration can be used as an array's index type", why: "There is exactly one element per kind of nut, and Totals[Walnut] reads naturally." },
        { q: "What does Inc(X, N) do?", options: ["Adds N to X", "Sets X to N", "Adds 1 to X and N", "Compares X and N"], answer: "Adds N to X", why: "Inc(X) adds 1, and Inc(X, N) adds N." },
      ],
    },
  ],
};
