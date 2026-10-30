// Delphi course for the Programming Learner. Written for this project.
// Schema: see data/python.js.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.delphi = {
  id: "delphi",
  name: "Delphi 5/6/7",
  title: "Object Pascal and the VCL",
  intro:
    "Delphi paired the Object Pascal language with a form designer: drop a button on a window, double-click it, and type what should happen. Versions 5, 6 and 7 were the classic Windows releases, and Delphi 7 in particular stayed in use for years. Free Pascal with the Lazarus IDE runs almost the same code today on Windows, Linux and macOS.",
  comment: "//",
  caseInsensitive: true,
  keywords: [
    "PROGRAM", "UNIT", "INTERFACE", "IMPLEMENTATION", "USES", "TYPE", "CLASS", "VAR", "CONST", "BEGIN", "END", "PROCEDURE",
    "FUNCTION", "IF", "THEN", "ELSE", "FOR", "TO", "DOWNTO", "DO", "WHILE", "REPEAT", "UNTIL", "CASE", "OF", "TRY", "EXCEPT",
    "FINALLY", "RAISE", "NIL", "TRUE", "FALSE", "AND", "OR", "NOT", "DIV", "MOD", "PRIVATE", "PUBLIC", "PUBLISHED", "PROPERTY",
    "READ", "WRITE", "CONSTRUCTOR", "DESTRUCTOR", "INHERITED", "OVERRIDE", "VIRTUAL", "RESULT", "SELF", "INTEGER", "STRING",
    "BOOLEAN", "DOUBLE", "ARRAY",
  ],
  builtins: ["WRITELN", "WRITE", "READLN", "SHOWMESSAGE", "INTTOSTR", "STRTOINT", "FORMAT", "LENGTH", "COPY", "POS", "UPPERCASE", "FREEANDNIL", "INC", "DEC"],
  lessons: [
    {
      id: "pascal",
      title: "Pascal basics",
      summary: "Programs, var blocks, := and begin…end.",
      sections: [
        {
          p: "A console program declares its variables in a <code>var</code> block before <code>begin</code>. Assignment is <code>:=</code>; a single <code>=</code> compares. Statements are separated by semicolons, and the program ends with <code>end.</code> (with a full stop).",
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
          h: "Blocks and loops",
          p: "<code>begin … end</code> groups several statements wherever one is expected. <code>for</code> counts with <code>to</code> or <code>downto</code>; <code>div</code> and <code>mod</code> are whole-number division and remainder. Strings use single quotes.",
          code: `for i := 1 to 3 do
begin
  if i mod 2 = 1 then
    WriteLn(i, ' is odd')
  else
    WriteLn(i, ' is even');
end;`,
          out: "1 is odd\n2 is even\n3 is odd",
        },
        {
          h: "Functions return through Result",
          p: "A <code>procedure</code> does something; a <code>function</code> returns a value by assigning to the built-in <code>Result</code> variable.",
          code: `function Square(n: Integer): Integer;
begin
  Result := n * n;
end;`,
        },
        {
          h: "Strings start at 1",
          p: "Unlike most languages, the first character of a Delphi string is at index 1. <code>Length</code> gives the size and <code>Copy(s, start, count)</code> takes a piece.",
          code: `s := 'acorn';
WriteLn(s[1]);
WriteLn(Copy(s, 2, 3));
WriteLn(Length(s));`,
          out: "a\ncor\n5",
        },
      ],
      practice: [
        { q: "How do you assign 5 to x?", options: ["x := 5;", "x = 5;", "x <- 5;", "let x = 5;"], answer: "x := 5;", why: "Pascal uses := for assignment and = for comparison." },
        { q: "In s := 'oak', what is s[1]?", options: ["'o'", "'a'", "'k'", "An error"], answer: "'o'", why: "Delphi strings are indexed from 1." },
        { q: "How does a function hand back its value?", options: ["Assign to Result", "return value;", "Print it", "Assign to Self"], answer: "Assign to Result", why: "Every Delphi function has an implicit Result variable." },
        { q: "What is 17 div 5?", options: ["3", "2", "3.4", "4"], answer: "3", why: "div is whole-number division; mod would give the remainder, 2." },
      ],
    },
    {
      id: "forms",
      title: "Forms and events",
      summary: "Units, components and OnClick handlers.",
      sections: [
        {
          p: "Each form is a <b>unit</b> with two halves: <code>interface</code> (what other units can see) and <code>implementation</code> (the code). The form designer writes the class declaration for you as you drop components on it.",
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
          p: "Double-clicking <code>Button1</code> in the designer creates <code>Button1Click</code> and connects it to the button's <code>OnClick</code> event. The layout itself is saved in the <code>.dfm</code> file, which <code>{$R *.dfm}</code> links in. Components are objects of VCL classes such as <code>TButton</code>, <code>TEdit</code> and <code>TLabel</code>, and their settings (<code>Caption</code>, <code>Text</code>, <code>Enabled</code>) are <b>properties</b> you can set in the Object Inspector or in code.",
        },
        {
          h: "Converting for display",
          p: "Text boxes hold strings, so convert numbers on the way in and out.",
          code: `procedure TForm1.Button1Click(Sender: TObject);
var
  n: Integer;
begin
  n := StrToInt(Edit1.Text);
  Label1.Caption := IntToStr(n * 2);
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
  ],
};
