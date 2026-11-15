// Visual Basic .NET course for the Programming Learner. Written for this project.
// Examples are complete Visual Basic 16 programs. tools/run_vbnet.py compiles
// them with the .NET SDK's Visual Basic compiler and checks the printed output.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.vbnet = {
  id: "vbnet",
  name: "Visual Basic .NET",
  title: "Visual Basic .NET from the first line",
  intro:
    "Visual Basic .NET is the BASIC of Microsoft's .NET platform. It arrived in 2002 as the successor to Visual Basic 6, the language that made Windows programs quick to build. It reads almost like English: blocks end with <code>End If</code> and <code>Next</code> rather than braces, and keywords are not case-sensitive. Underneath it shares everything with C#: the same types, the same libraries and the same compiled code. Microsoft no longer adds new language features, but VB.NET still runs a great many business programs and is fully supported on .NET 8. These lessons use VB 16 with <b>Option Strict On</b>, which makes the compiler insist on clear types. Every example is a whole program and shows exactly what it prints. To run one yourself, install the .NET SDK, type <code>dotnet new console -lang VB -o hello</code>, paste the example into <code>hello/Program.vb</code> and type <code>dotnet run --project hello</code>.",
  comment: "'",
  caseInsensitive: true,
  keywords: [
    "Module", "End", "Sub", "Function", "Dim", "As", "New", "Return", "If", "Then", "Else", "ElseIf", "Select", "Case", "For", "Each",
    "In", "To", "Step", "Next", "Do", "While", "Until", "Loop", "Exit", "Class", "Inherits", "Overrides", "Overridable", "MustInherit",
    "Interface", "Implements", "Property", "ReadOnly", "Public", "Private", "Shared", "Const", "ByVal", "ByRef", "Optional", "Of",
    "And", "Or", "Not", "AndAlso", "OrElse", "Mod", "Is", "IsNot", "Nothing", "True", "False", "Me", "From", "Where", "Order", "By",
    "Try", "Catch", "Finally", "Throw", "With", "Imports", "Integer", "Double", "Decimal", "String", "Boolean", "Char", "Date",
    "Structure", "Enum", "Async", "Await", "Iterator", "Yield", "Using", "ReDim", "Preserve", "DirectCast", "TryCast", "GetType", "TypeOf",
  ],
  builtins: ["Console", "WriteLine", "Write", "Math", "List", "Dictionary", "HashSet", "Len", "Left", "Right", "Mid", "UCase", "LCase", "CInt", "CStr", "CDbl", "Sum", "Count", "Task", "File", "StreamWriter", "StreamReader"],
  lessons: [
    {
      id: "first",
      title: "Your first program",
      summary: "Module, Sub Main, Console.WriteLine and interpolated strings.",
      sections: [
        {
          p: "A Visual Basic program lives in a <code>Module</code>, and it starts in a procedure called <code>Sub Main</code>. Each block is closed by its own <code>End</code> line. <code>Console.WriteLine</code> prints a line and <code>Console.Write</code> prints without ending it. There are no semicolons: one statement per line. A comment starts with an apostrophe.",
          code: `Module Program
    Sub Main()
        ' Say hello
        Console.WriteLine("Hello, squirrel!")
        Console.Write("Nuts: ")
        Console.WriteLine(42)
    End Sub
End Module`,
          out: "Hello, squirrel!\nNuts: 42",
        },
        {
          h: "Joining and interpolating",
          p: "<code>&amp;</code> joins text, and it turns numbers into text for you. A string with a <code>$</code> in front can hold expressions in braces, which are worked out and put in place; after a colon you can give a format such as <code>F2</code> for two decimals. To put a double quote inside a string, write it twice.",
          code: `Module Program
    Sub Main()
        Dim name As String = "Hazel"
        Dim nuts As Integer = 7
        Dim price As Double = 1.5
        Console.WriteLine(name & " has " & nuts & " nuts")
        Console.WriteLine($"{nuts * 2} after a good day")
        Console.WriteLine($"Cost: {price:F2}")
        Console.WriteLine("She said ""acorns!""")
    End Sub
End Module`,
          out: "Hazel has 7 nuts\n14 after a good day\nCost: 1.50\nShe said \"acorns!\"",
        },
        {
          h: "Case doesn't matter",
          p: "Visual Basic ignores the case of keywords and names: <code>console.writeline</code> and <code>CONSOLE.WRITELINE</code> both work, and the editor tidies them to the usual spelling. Text inside quotes keeps its case, of course.",
          code: `Module Program
    Sub Main()
        DIM total AS INTEGER = 3
        console.writeline(TOTAL + 4)
        Console.WriteLine("Mixed Case Stays")
    End Sub
End Module`,
          out: "7\nMixed Case Stays",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Console.Write("Up")
        Console.Write(" the")
        Console.WriteLine(" tree")
    End Sub
End Module`, options: ["Up the tree", "Up\n the\n tree", "Upthetree", "Up the\ntree"], answer: "Up the tree", why: "Write doesn't end the line, so all three pieces land on one line." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Dim n As Integer = 5
        Console.WriteLine("n" & n & n)
    End Sub
End Module`, options: ["n55", "n10", "n5", "nnn"], answer: "n55", why: "& joins text, so each 5 is turned into text and added on; nothing is added up." },
      ],
    },
    {
      id: "values",
      title: "Types and arithmetic",
      summary: "Dim, the main types, the two kinds of division, Mod, ^ and converting.",
      sections: [
        {
          p: "<code>Dim</code> declares a variable and <code>As</code> gives its type. The common types are <code>Integer</code>, <code>Long</code>, <code>Double</code>, <code>Decimal</code> (exact, for money), <code>Boolean</code>, <code>Char</code>, <code>String</code> and <code>Date</code>. With an initial value you can leave the type out and the compiler works it out. <code>Const</code> makes a value that can't change.",
          code: `Module Program
    Const TreesInPark As Integer = 12

    Sub Main()
        Dim nuts As Integer = 40
        Dim weight As Double = 2.5
        Dim price As Decimal = 0.1D + 0.2D
        Dim hungry As Boolean = True
        Dim guess = 3.0 * 2     ' a Double, worked out by the compiler
        Console.WriteLine(nuts + TreesInPark)
        Console.WriteLine(weight * 2)
        Console.WriteLine(price)
        Console.WriteLine(hungry)
        Console.WriteLine(guess)
    End Sub
End Module`,
          out: "52\n5\n0.3\nTrue\n6",
        },
        {
          h: "Two kinds of division",
          p: "<code>/</code> always divides exactly and gives a <code>Double</code>. The backslash <code>\\</code> divides whole numbers and drops the remainder, and <code>Mod</code> gives the remainder. <code>^</code> raises to a power.",
          code: `Module Program
    Sub Main()
        Console.WriteLine(7 / 2)
        Console.WriteLine(7 \\ 2)
        Console.WriteLine(7 Mod 2)
        Console.WriteLine(2 ^ 10)
    End Sub
End Module`,
          out: "3.5\n3\n1\n1024",
        },
        {
          h: "Converting",
          p: "With Option Strict on, VB won't quietly turn a <code>Double</code> into an <code>Integer</code> or a <code>String</code> into a number, because that could lose something. You convert on purpose with <code>CInt</code>, <code>CDbl</code>, <code>CStr</code> and friends. <code>CInt</code> rounds halves to the even number (banker's rounding), while <code>Fix</code> just cuts off the fraction.",
          code: `Module Program
    Sub Main()
        Dim text As String = "17"
        Dim n As Integer = CInt(text) + 1
        Console.WriteLine(n)
        Console.WriteLine(CInt(2.5))
        Console.WriteLine(CInt(3.5))
        Console.WriteLine(Fix(3.9))
        Console.WriteLine(CStr(n) & "!")
    End Sub
End Module`,
          out: "18\n2\n4\n3\n18!",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Console.WriteLine(17 \\ 5)
        Console.WriteLine(17 Mod 5)
    End Sub
End Module`, options: ["3\n2", "3.4\n2", "3\n3", "2\n3"], answer: "3\n2", why: "5 goes into 17 three whole times (\\), leaving 2 (Mod)." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Console.WriteLine(9 / 2)
    End Sub
End Module`, options: ["4.5", "4", "5", "4.0"], answer: "4.5", why: "The slash always does exact division in VB, even with two whole numbers." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Console.WriteLine(CInt(4.5) + CInt(5.5))
    End Sub
End Module`, options: ["10", "11", "9", "12"], answer: "10", why: "CInt rounds a half to the even neighbour: 4.5 becomes 4 and 5.5 becomes 6." },
      ],
    },
    {
      id: "control",
      title: "Decisions and loops",
      summary: "If...ElseIf, Select Case, For...Next, For Each and Do loops.",
      sections: [
        {
          p: "<code>If ... Then</code> runs a block when its condition is true; add <code>ElseIf</code> and <code>Else</code> for other cases and close with <code>End If</code>. Comparisons are <code>=</code>, <code>&lt;&gt;</code>, <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code> and <code>&gt;=</code>. Join conditions with <code>AndAlso</code> and <code>OrElse</code>, which stop as soon as the answer is known.",
          code: `Module Program
    Sub Main()
        Dim nuts As Integer = 14
        If nuts >= 20 Then
            Console.WriteLine("Ready for winter")
        ElseIf nuts >= 10 AndAlso nuts < 20 Then
            Console.WriteLine("Getting there")
        Else
            Console.WriteLine("Keep looking")
        End If
        If nuts <> 0 Then Console.WriteLine("Not empty")
    End Sub
End Module`,
          out: "Getting there\nNot empty",
        },
        {
          h: "Select Case",
          p: "<code>Select Case</code> picks one branch by value. A case can list several values, give a range with <code>To</code>, or compare with <code>Is</code>. <code>Case Else</code> catches everything left over.",
          code: `Module Program
    Sub Main()
        For Each month As Integer In {1, 4, 7, 10}
            Select Case month
                Case 12, 1, 2
                    Console.WriteLine($"{month}: sleep")
                Case 3 To 5
                    Console.WriteLine($"{month}: dig up nuts")
                Case Is >= 9
                    Console.WriteLine($"{month}: bury nuts")
                Case Else
                    Console.WriteLine($"{month}: play")
            End Select
        Next
    End Sub
End Module`,
          out: "1: sleep\n4: dig up nuts\n7: play\n10: bury nuts",
        },
        {
          h: "Loops",
          p: "<code>For i = a To b</code> counts, both ends included, and <code>Step</code> changes how far it moves each time. <code>For Each</code> visits every item in a collection. <code>Do While</code> repeats while a condition holds, and <code>Do ... Loop Until</code> always runs at least once. <code>Exit For</code> and <code>Exit Do</code> leave a loop early.",
          code: `Module Program
    Sub Main()
        For i As Integer = 1 To 3
            Console.Write(i & " ")
        Next
        Console.WriteLine()
        For i As Integer = 10 To 0 Step -5
            Console.Write(i & " ")
        Next
        Console.WriteLine()
        Dim stash As Integer = 1
        Do While stash < 50
            stash *= 3
        Loop
        Console.WriteLine(stash)
    End Sub
End Module`,
          out: "1 2 3 \n10 5 0 \n81",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Dim total As Integer = 0
        For i As Integer = 1 To 4
            total += i
        Next
        Console.WriteLine(total)
    End Sub
End Module`, options: ["10", "6", "4", "15"], answer: "10", why: "For ... To includes both ends, so it adds 1 + 2 + 3 + 4." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Dim n As Integer = 15
        Select Case n
            Case 1 To 9
                Console.WriteLine("small")
            Case 10, 20
                Console.WriteLine("round")
            Case Is > 12
                Console.WriteLine("big")
            Case Else
                Console.WriteLine("other")
        End Select
    End Sub
End Module`, options: ["big", "round", "small", "other"], answer: "big", why: "15 isn't in 1 to 9 and isn't 10 or 20, but it is greater than 12." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Dim n As Integer = 100
        Do
            n += 1
        Loop Until n > 5
        Console.WriteLine(n)
    End Sub
End Module`, options: ["101", "100", "6", "Nothing; the loop never runs"], answer: "101", why: "Do ... Loop Until checks at the bottom, so the body runs once before the test." },
      ],
    },
    {
      id: "procedures",
      title: "Subs, functions and collections",
      summary: "Sub and Function, ByRef, Optional parameters, arrays, List(Of T) and Dictionary.",
      sections: [
        {
          p: "A <code>Sub</code> does a job and gives nothing back; a <code>Function</code> returns a value with <code>Return</code>. Parameters are passed <code>ByVal</code> (a copy) unless you write <code>ByRef</code>, which lets the procedure change the caller's variable. <code>Optional</code> parameters have a default.",
          code: `Module Program
    Function DoubleUp(n As Integer) As Integer
        Return n * 2
    End Function

    Sub AddNut(ByRef stash As Integer, Optional count As Integer = 1)
        stash += count
    End Sub

    Sub Main()
        Dim stash As Integer = 5
        AddNut(stash)
        AddNut(stash, 3)
        Console.WriteLine(stash)
        Console.WriteLine(DoubleUp(stash))
    End Sub
End Module`,
          out: "9\n18",
        },
        {
          h: "Arrays",
          p: "An array holds a fixed number of values. <code>Dim a(3)</code> makes one with indexes 0 to 3, so <b>four</b> items: the number is the last index, not the count. You can also fill one with braces. <code>.Length</code> counts the items and <code>UBound</code> gives the last index.",
          code: `Module Program
    Sub Main()
        Dim slots(3) As Integer
        slots(0) = 10
        slots(3) = 40
        Console.WriteLine(slots.Length & " " & UBound(slots))
        Dim trees() As String = {"oak", "beech", "hazel"}
        For i As Integer = 0 To trees.Length - 1
            Console.WriteLine(i & ": " & trees(i))
        Next
    End Sub
End Module`,
          out: "4 3\n0: oak\n1: beech\n2: hazel",
        },
        {
          h: "List and Dictionary",
          p: "<code>List(Of T)</code> is an array that can grow; <code>Of</code> names the type of its items. <code>Dictionary(Of K, V)</code> looks values up by key. Both come from .NET, so they work exactly as they do in C#.",
          code: `Module Program
    Sub Main()
        Dim nuts As New List(Of String) From {"acorn", "walnut"}
        nuts.Add("hazelnut")
        nuts.Remove("acorn")
        Console.WriteLine(nuts.Count & ": " & String.Join(", ", nuts))

        Dim stores As New Dictionary(Of String, Integer)
        stores("oak") = 12
        stores("beech") = 5
        stores("oak") += 3
        For Each pair In stores
            Console.WriteLine($"{pair.Key} = {pair.Value}")
        Next
        Console.WriteLine(stores.ContainsKey("pine"))
    End Sub
End Module`,
          out: "2: walnut, hazelnut\noak = 15\nbeech = 5\nFalse",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Bump(n As Integer)
        n += 10
    End Sub

    Sub Main()
        Dim x As Integer = 1
        Bump(x)
        Console.WriteLine(x)
    End Sub
End Module`, options: ["1", "11", "10", "0"], answer: "1", why: "Parameters are ByVal unless marked ByRef, so Bump only changes its own copy." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Dim a(5) As Integer
        Console.WriteLine(a.Length)
    End Sub
End Module`, options: ["6", "5", "4", "0"], answer: "6", why: "The 5 is the last index, so the array has indexes 0 to 5: six items." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Function Greet(name As String, Optional mark As String = "!") As String
        Return "Hi " & name & mark
    End Function

    Sub Main()
        Console.WriteLine(Greet("Pip"))
        Console.WriteLine(Greet("Pip", "?"))
    End Sub
End Module`, options: ["Hi Pip!\nHi Pip?", "Hi Pip\nHi Pip?", "Hi Pip!\nHi Pip!", "Hi Pip!?"], answer: "Hi Pip!\nHi Pip?", why: "The first call leaves out mark, so it gets its default \"!\"; the second passes \"?\"." },
      ],
    },
    {
      id: "classes",
      title: "Classes and objects",
      summary: "Class, properties, Sub New, Inherits, Overrides and interfaces.",
      sections: [
        {
          p: "A <code>Class</code> describes a kind of object. A <code>Property</code> holds a value; the short form <code>Public Property Name As String</code> makes the storage for you. <code>Sub New</code> is the constructor, run by <code>New</code>. Inside the class, <code>Me</code> means the current object.",
          code: `Module Program
    Class Squirrel
        Public Property Name As String
        Public Property Nuts As Integer

        Sub New(name As String)
            Me.Name = name
        End Sub

        Sub Gather(count As Integer)
            Nuts += count
        End Sub

        Public ReadOnly Property Ready As Boolean
            Get
                Return Nuts >= 10
            End Get
        End Property
    End Class

    Sub Main()
        Dim s As New Squirrel("Hazel")
        s.Gather(4)
        s.Gather(7)
        Console.WriteLine($"{s.Name}: {s.Nuts}, ready = {s.Ready}")
    End Sub
End Module`,
          out: "Hazel: 11, ready = True",
        },
        {
          h: "Inheritance",
          p: "<code>Inherits</code> makes a class that starts with everything another class has. A method marked <code>Overridable</code> can be replaced in the new class with <code>Overrides</code>, and <code>MyBase</code> reaches the original. <code>MustInherit</code> marks a class that is only a base for others.",
          code: `Module Program
    MustInherit Class Animal
        Public Property Name As String
        Overridable Function Describe() As String
            Return Name
        End Function
    End Class

    Class RedSquirrel
        Inherits Animal
        Overrides Function Describe() As String
            Return MyBase.Describe() & " (red squirrel)"
        End Function
    End Class

    Class Owl
        Inherits Animal
    End Class

    Sub Main()
        Dim animals As New List(Of Animal) From {
            New RedSquirrel With {.Name = "Rusty"},
            New Owl With {.Name = "Hoot"}
        }
        For Each a In animals
            Console.WriteLine(a.Describe())
        Next
    End Sub
End Module`,
          out: "Rusty (red squirrel)\nHoot",
        },
        {
          h: "Interfaces",
          p: "An <code>Interface</code> lists what a class promises to do. The class says <code>Implements</code> on its own line, and each member says which part of the interface it fills. <code>With {.Name = ...}</code> sets properties right after <code>New</code>.",
          code: `Module Program
    Interface IHasWeight
        Function Grams() As Integer
    End Interface

    Class Nut
        Implements IHasWeight
        Public Property Kind As String
        Public Property Weight As Integer
        Function Grams() As Integer Implements IHasWeight.Grams
            Return Weight
        End Function
    End Class

    Sub Main()
        Dim bag As New List(Of IHasWeight) From {
            New Nut With {.Kind = "acorn", .Weight = 4},
            New Nut With {.Kind = "walnut", .Weight = 11}
        }
        Dim total As Integer = 0
        For Each item In bag
            total += item.Grams()
        Next
        Console.WriteLine($"{total} g")
    End Sub
End Module`,
          out: "15 g",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `Module Program
    Class Counter
        Public Property Value As Integer
        Sub Add()
            Value += 1
        End Sub
    End Class

    Sub Main()
        Dim a As New Counter()
        Dim b As Counter = a
        a.Add()
        b.Add()
        Console.WriteLine(a.Value)
    End Sub
End Module`, options: ["2", "1", "0", "Nothing"], answer: "2", why: "A class is a reference type: a and b are two names for the same Counter, so both Adds count." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Class Tree
        Overridable Function Name() As String
            Return "tree"
        End Function
    End Class

    Class Oak
        Inherits Tree
        Overrides Function Name() As String
            Return "oak"
        End Function
    End Class

    Sub Main()
        Dim t As Tree = New Oak()
        Console.WriteLine(t.Name())
    End Sub
End Module`, options: ["oak", "tree", "oaktree", "It doesn't compile"], answer: "oak", why: "Overrides replaces the method for Oak objects, even when the variable's type is Tree." },
      ],
    },
    {
      id: "linq",
      title: "LINQ, text and errors",
      summary: "Query expressions, lambdas, the classic string functions and Try...Catch.",
      sections: [
        {
          p: "LINQ lets you ask questions of a collection. VB has its own query syntax that reads like a sentence: <code>From ... In ... Where ... Order By ... Select</code>. It also works with methods and <b>lambdas</b>, small functions written <code>Function(x) x * 2</code>.",
          code: `Module Program
    Sub Main()
        Dim nuts() As Integer = {7, 2, 9, 4, 12}
        Dim big = From n In nuts
                  Where n > 3
                  Order By n Descending
                  Select n
        Console.WriteLine(String.Join(" ", big))
        Console.WriteLine(nuts.Where(Function(n) n Mod 2 = 0).Sum())
        Console.WriteLine(nuts.Max() & " " & nuts.Average())
        Dim doubled = nuts.Select(Function(n) n * 2).ToList()
        Console.WriteLine(doubled(0))
    End Sub
End Module`,
          out: "12 9 7 4\n18\n12 6.8\n14",
        },
        {
          h: "Classic string functions",
          p: "VB.NET keeps the string functions from older BASICs, such as <code>Len</code>, <code>Left</code>, <code>Right</code>, <code>Mid</code>, <code>UCase</code> and <code>InStr</code>. They count from 1, as BASIC always has. The .NET methods such as <code>.Substring</code> and <code>.IndexOf</code> count from 0. Both kinds work, so watch which one you are using.",
          code: `Module Program
    Sub Main()
        Dim s As String = "Hazelnut"
        Console.WriteLine(Len(s))
        Console.WriteLine(Left(s, 5) & "|" & Right(s, 3) & "|" & Mid(s, 2, 3))
        Console.WriteLine(UCase(s) & " " & InStr(s, "nut"))
        Console.WriteLine(s.Substring(1, 3) & " " & s.IndexOf("nut"))
        Console.WriteLine(s.Replace("Hazel", "Wal").ToLower())
    End Sub
End Module`,
          out: "8\nHazel|nut|aze\nHAZELNUT 6\naze 5\nwalnut",
        },
        {
          h: "Try ... Catch",
          p: "When something goes wrong at run time, .NET throws an exception. <code>Try</code> runs code that might fail, <code>Catch</code> handles the problem, and <code>Finally</code> runs either way. You can catch a particular kind of exception and use its <code>Message</code>.",
          code: `Module Program
    Function ParseNuts(text As String) As Integer
        Try
            Return Integer.Parse(text)
        Catch ex As FormatException
            Console.WriteLine($"Not a number: {text}")
            Return 0
        Finally
            Console.WriteLine("checked " & text)
        End Try
    End Function

    Sub Main()
        Console.WriteLine(ParseNuts("12") + ParseNuts("lots"))
    End Sub
End Module`,
          out: "checked 12\nNot a number: lots\nchecked lots\n12",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Console.WriteLine(Mid("squirrel", 3, 4))
    End Sub
End Module`, options: ["uirr", "quir", "irre", "uir"], answer: "uirr", why: "Mid counts from 1, so it starts at the 3rd letter, u, and takes four letters." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Dim xs() As Integer = {5, 1, 8, 3}
        Dim r = From x In xs Where x > 2 Order By x Select x * 10
        Console.WriteLine(String.Join(",", r))
    End Sub
End Module`, options: ["30,50,80", "50,80,30", "50,10,80,30", "3,5,8"], answer: "30,50,80", why: "The query keeps 5, 8 and 3, sorts them to 3, 5, 8, then multiplies each by 10." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Try
            Dim a() As Integer = {1, 2, 3}
            Console.WriteLine(a(3))
        Catch ex As IndexOutOfRangeException
            Console.WriteLine("no such slot")
        End Try
    End Sub
End Module`, options: ["no such slot", "3", "0", "Nothing"], answer: "no such slot", why: "{1, 2, 3} has indexes 0 to 2, so a(3) throws and the Catch prints its message." },
      ],
    },
    {
      id: "types",
      title: "Nullable types, casts and arrays",
      summary: "Integer?, DirectCast and TryCast, 2-D and jagged arrays, ReDim and Structure.",
      sections: [
        {
          p: "Option Strict stops quiet conversions that might lose information. A <b>nullable</b> value type such as <code>Integer?</code> can hold a whole number or <code>Nothing</code>; use <code>.HasValue</code> and <code>.Value</code>, or <code>If(maybe, fallback)</code> for a default. When a value is typed as <code>Object</code>, <code>DirectCast</code> insists on the exact type and throws if it is wrong, while <code>TryCast</code> (for reference types) returns <code>Nothing</code> instead.",
          code: `Module Program
    Sub Main()
        Dim maybe As Integer? = Nothing
        Console.WriteLine(maybe.HasValue)
        maybe = 7
        Console.WriteLine(maybe.Value)
        Console.WriteLine(If(maybe, -1))
        Dim empty As Integer? = Nothing
        Console.WriteLine(If(empty, -1))
        Dim boxed As Object = 12
        Dim n As Integer = DirectCast(boxed, Integer)
        Console.WriteLine(n)
        Dim s As String = TryCast(boxed, String)
        Console.WriteLine(If(s, "not a string"))
    End Sub
End Module`,
          out: "False\n7\n7\n-1\n12\nnot a string",
        },
        {
          h: "More arrays",
          p: "A rectangular array uses commas in the bounds: <code>Dim grid(1, 2)</code> has two rows and three columns (indexes 0–1 and 0–2). A <b>jagged</b> array is an array of arrays, written <code>()()</code>, so each row can be a different length. <code>ReDim Preserve</code> resizes an array and keeps the values that still fit; new slots start at the type's default (0 for integers).",
          code: `Module Program
    Sub Main()
        Dim grid(1, 2) As Integer
        grid(0, 0) = 1 : grid(0, 1) = 2 : grid(0, 2) = 3
        grid(1, 0) = 4 : grid(1, 1) = 5 : grid(1, 2) = 6
        Console.WriteLine(grid.GetLength(0) & "x" & grid.GetLength(1))
        Console.WriteLine(grid(1, 2))

        Dim rows()() As String = {
            New String() {"oak", "beech"},
            New String() {"hazel"}
        }
        Console.WriteLine(rows(0)(1) & " / " & rows(1)(0))

        Dim stash() As Integer = {3, 5}
        ReDim Preserve stash(3)
        stash(3) = 9
        Console.WriteLine(String.Join(",", stash))
    End Sub
End Module`,
          out: "2x3\n6\nbeech / hazel\n3,5,0,9",
        },
        {
          h: "Structure and With",
          p: "A <code>Structure</code> is a value type: assigning one copies the fields, so changing the copy leaves the original alone (unlike a <code>Class</code>). <code>With ... End With</code> lets you write <code>.Field</code> repeatedly against one object without naming it each time.",
          code: `Module Program
    Structure Point
        Public X As Integer
        Public Y As Integer
        Public Overrides Function ToString() As String
            Return $"({X},{Y})"
        End Function
    End Structure

    Sub Main()
        Dim a As New Point With {.X = 2, .Y = 3}
        Dim b = a
        b.X = 9
        Console.WriteLine(a)
        Console.WriteLine(b)
        With a
            Console.WriteLine(.X + .Y)
        End With
    End Sub
End Module`,
          out: "(2,3)\n(9,3)\n5",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Dim n As Integer? = Nothing
        Console.WriteLine(If(n, 5) & " " & If(n.HasValue, "yes", "no"))
    End Sub
End Module`, options: ["5 no", "0 no", "5 yes", "Nothing no"], answer: "5 no", why: "If supplies 5 when the nullable is Nothing, and HasValue is False." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Dim a() As Integer = {1, 2}
        ReDim Preserve a(3)
        Console.WriteLine(a.Length & " " & a(3))
    End Sub
End Module`, options: ["4 0", "3 0", "4 2", "2 0"], answer: "4 0", why: "Indexes 0 to 3 make four slots; the new ones are 0, and Preserve keeps 1 and 2 at the front." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Structure Pair
        Public A As Integer
    End Structure
    Sub Main()
        Dim x As New Pair With {.A = 1}
        Dim y = x
        y.A = 9
        Console.WriteLine(x.A & " " & y.A)
    End Sub
End Module`, options: ["1 9", "9 9", "1 1", "0 9"], answer: "1 9", why: "A Structure is copied on assignment, so changing y does not change x." },
      ],
    },
    {
      id: "files",
      title: "Reading and writing files",
      summary: "File helpers, Using with streams, and a small CSV.",
      sections: [
        {
          p: "The System.IO types live in another namespace, so start with <code>Imports System.IO</code>. <code>File.WriteAllText</code> and <code>File.ReadAllText</code> handle a whole file at once; <code>File.ReadAllLines</code> gives an array of lines. Paths are relative to the process's working directory.",
          code: `Imports System.IO

Module Program
    Sub Main()
        File.WriteAllText("stash.txt", "acorn 6" & vbLf & "hazelnut 2" & vbLf & "walnut 1" & vbLf)
        Dim text As String = File.ReadAllText("stash.txt")
        Console.WriteLine("bytes: " & text.Length)
        For Each line In File.ReadAllLines("stash.txt")
            Dim parts = line.Split(" "c)
            Console.WriteLine($"{parts(0)} => {parts(1)}")
        Next
        File.Copy("stash.txt", "backup.txt", True)
        Console.WriteLine(If(File.Exists("backup.txt"), "backup ready", "missing"))
    End Sub
End Module`,
          out: "bytes: 28\nacorn => 6\nhazelnut => 2\nwalnut => 1\nbackup ready",
        },
        {
          h: "Using streams",
          p: "<code>Using ... End Using</code> opens something that must be closed (a file stream, a network connection) and always calls <code>Dispose</code> when the block ends, even if an exception is thrown. <code>StreamWriter</code> and <code>StreamReader</code> write and read a line at a time.",
          code: `Imports System.IO

Module Program
    Sub Main()
        Using writer As New StreamWriter("log.txt")
            writer.WriteLine("day 1: found 3")
            writer.WriteLine("day 2: found 5")
        End Using
        Using reader As New StreamReader("log.txt")
            Do While Not reader.EndOfStream
                Console.WriteLine(reader.ReadLine())
            Loop
        End Using
        Console.WriteLine(If(File.Exists("nope.txt"), "yes", "no"))
    End Sub
End Module`,
          out: "day 1: found 3\nday 2: found 5\nno",
        },
        {
          h: "A tiny CSV",
          p: "<code>File.WriteAllLines</code> writes a collection as lines; <code>File.ReadLines</code> walks them without loading everything at once. <code>File.AppendAllText</code> adds to the end instead of replacing the file.",
          code: `Imports System.IO

Module Program
    Sub Main()
        Dim lines As New List(Of String) From {"oak,14", "hazel,9", "beech,20"}
        File.WriteAllLines("caches.csv", lines)
        Dim total As Integer = 0
        For Each line In File.ReadLines("caches.csv")
            Dim cols = line.Split(","c)
            total += Integer.Parse(cols(1))
            Console.WriteLine(cols(0))
        Next
        Console.WriteLine("total " & total)
        File.AppendAllText("caches.csv", "pine,4" & vbLf)
        Console.WriteLine(File.ReadAllLines("caches.csv").Length)
    End Sub
End Module`,
          out: "oak\nhazel\nbeech\ntotal 43\n4",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `Imports System.IO
Module Program
    Sub Main()
        File.WriteAllText("t.txt", "x")
        File.AppendAllText("t.txt", "y")
        Console.WriteLine(File.ReadAllText("t.txt"))
    End Sub
End Module`, options: ["xy", "y", "x", "yx"], answer: "xy", why: "AppendAllText adds y after the existing x." },
        { kind: "output", q: "What does this print?", code: `Imports System.IO
Module Program
    Sub Main()
        File.WriteAllLines("n.txt", {"a", "b"})
        Console.WriteLine(File.ReadAllLines("n.txt").Length)
    End Sub
End Module`, options: ["2", "3", "1", "0"], answer: "2", why: "WriteAllLines writes two lines, so ReadAllLines returns two strings." },
        { q: "Why wrap a StreamWriter in Using?", options: ["So Dispose closes the file even if something goes wrong", "Using makes writes faster", "It turns on Option Strict", "Streams only work inside Using"], answer: "So Dispose closes the file even if something goes wrong", why: "End Using always runs Dispose, which flushes and closes the handle." },
      ],
    },
    {
      id: "async",
      title: "Async and Await",
      summary: "Async Function, Await, Task.WhenAll and reading a file asynchronously.",
      sections: [
        {
          p: "An <code>Async Function</code> can <code>Await</code> a <code>Task</code>: the method pauses until that work finishes, without blocking the whole program the way a busy wait would. <code>Task.Delay</code> is a tiny stand-in for slow work such as a download. Console programs often kick off the async work from <code>Sub Main</code> with <code>.GetAwaiter().GetResult()</code>, which waits for it to finish before the process exits.",
          code: `Module Program
    Async Function DigAsync(spot As String) As Task(Of Integer)
        Console.WriteLine("digging " & spot)
        Await Task.Delay(1)
        Return spot.Length
    End Function

    Async Function GatherAsync() As Task
        Dim a = Await DigAsync("oak")
        Dim b = Await DigAsync("beech")
        Console.WriteLine($"nuts: {a + b}")
    End Function

    Sub Main()
        GatherAsync().GetAwaiter().GetResult()
    End Sub
End Module`,
          out: "digging oak\ndigging beech\nnuts: 8",
        },
        {
          h: "Several tasks at once",
          p: "Start more than one task, then <code>Await Task.WhenAll(...)</code> to wait for all of them. The array of results comes back in the same order as the tasks you passed in, so you can total or join them without racing the console.",
          code: `Module Program
    Async Function CountAsync(n As Integer) As Task(Of Integer)
        Await Task.Delay(1)
        Return n * 2
    End Function

    Async Function RunAsync() As Task
        Dim t1 = CountAsync(3)
        Dim t2 = CountAsync(5)
        Dim parts = Await Task.WhenAll(t1, t2)
        Console.WriteLine(String.Join("+", parts) & "=" & parts.Sum())
        Dim more = Await Task.WhenAll(CountAsync(1), CountAsync(2), CountAsync(3))
        Console.WriteLine(more.Max())
    End Function

    Sub Main()
        RunAsync().GetAwaiter().GetResult()
    End Sub
End Module`,
          out: "6+10=16\n6",
        },
        {
          h: "Async file reads",
          p: "<code>File.ReadAllTextAsync</code> returns a <code>Task(Of String)</code>. You can still use <code>Try ... Catch</code> around an <code>Await</code>: a missing file throws <code>FileNotFoundException</code> the same way as the synchronous call.",
          code: `Imports System.IO

Module Program
    Async Function LoadStashAsync(path As String) As Task(Of Integer)
        Try
            Dim text = Await File.ReadAllTextAsync(path)
            Return Integer.Parse(text.Trim())
        Catch ex As FileNotFoundException
            Console.WriteLine("missing " & path)
            Return 0
        End Try
    End Function

    Async Function RunAsync() As Task
        File.WriteAllText("count.txt", "12")
        Dim a = Await LoadStashAsync("count.txt")
        Dim b = Await LoadStashAsync("gone.txt")
        Console.WriteLine(a + b)
    End Function

    Sub Main()
        RunAsync().GetAwaiter().GetResult()
    End Sub
End Module`,
          out: "missing gone.txt\n12",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `Module Program
    Async Function TwiceAsync(n As Integer) As Task(Of Integer)
        Await Task.Delay(1)
        Return n * 2
    End Function
    Sub Main()
        Console.WriteLine(TwiceAsync(21).GetAwaiter().GetResult())
    End Sub
End Module`, options: ["42", "21", "22", "Nothing"], answer: "42", why: "TwiceAsync awaits a short delay, then returns 21 * 2." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Async Function NAsync(n As Integer) As Task(Of Integer)
        Await Task.Delay(1)
        Return n
    End Function
    Sub Main()
        Dim parts = Task.WhenAll(NAsync(2), NAsync(5)).GetAwaiter().GetResult()
        Console.WriteLine(parts(0) & "," & parts(1) & "," & parts.Sum())
    End Sub
End Module`, options: ["2,5,7", "5,2,7", "2,5,25", "7,7,7"], answer: "2,5,7", why: "WhenAll keeps the results in the same order as the tasks: 2 then 5, which sum to 7." },
        { q: "What does Await do inside an Async Function?", options: ["Pauses this method until the Task finishes, then continues with its result", "Starts a new thread every time", "Turns Option Strict off", "Cancels every other Task"], answer: "Pauses this method until the Task finishes, then continues with its result", why: "That is how Async and Await chain slow work without a busy loop." },
      ],
    },
    {
      id: "queries",
      title: "Grouping, tuples and iterators",
      summary: "LINQ Group By, TypeOf tests, named tuples and Yield.",
      sections: [
        {
          p: "Query syntax can <code>Group By</code> a key and name aggregates such as <code>Sum</code> in the same breath. Method-style LINQ still works beside it: <code>Distinct</code>, <code>OrderBy</code> and friends take lambdas written <code>Function(x) ...</code>.",
          code: `Module Program
    Sub Main()
        Dim nuts = {
            New With {.Tree = "oak", .Kind = "acorn", .Count = 14},
            New With {.Tree = "oak", .Kind = "acorn", .Count = 6},
            New With {.Tree = "hazel", .Kind = "hazelnut", .Count = 9},
            New With {.Tree = "beech", .Kind = "beechnut", .Count = 20}
        }
        Dim byTree = From n In nuts
                     Group By n.Tree Into Group, Total = Sum(n.Count)
                     Order By Total Descending
                     Select Tree, Total
        For Each row In byTree
            Console.WriteLine($"{row.Tree}: {row.Total}")
        Next
        Dim kinds = nuts.Select(Function(n) n.Kind).Distinct().OrderBy(Function(k) k)
        Console.WriteLine(String.Join(", ", kinds))
    End Sub
End Module`,
          out: "oak: 20\nbeech: 20\nhazel: 9\nacorn, beechnut, hazelnut",
        },
        {
          h: "TypeOf and tuples",
          p: "<code>Select Case True</code> with <code>TypeOf item Is ...</code> is a common way to branch on a value's run-time type under Option Strict. A <b>tuple</b> bundles a few values without a new class: name the fields with <code>:=</code>, or read unnamed ones as <code>.Item1</code> and <code>.Item2</code>.",
          code: `Module Program
    Function Label(item As Object) As String
        Select Case True
            Case TypeOf item Is Integer
                Return "int:" & CStr(DirectCast(item, Integer))
            Case TypeOf item Is String
                Return "str:" & DirectCast(item, String)
            Case Else
                Return "other"
        End Select
    End Function

    Sub Main()
        Console.WriteLine(Label(7))
        Console.WriteLine(Label("oak"))
        Console.WriteLine(Label(True))

        Dim pair = (Tree := "hazel", Nuts := 12)
        Console.WriteLine($"{pair.Tree} holds {pair.Nuts}")
        Dim plain = ("oak", 7)
        Console.WriteLine(plain.Item1 & "=" & plain.Item2)
    End Sub
End Module`,
          out: "int:7\nstr:oak\nother\nhazel holds 12\noak=7",
        },
        {
          h: "Iterator and Yield",
          p: "An <code>Iterator Function</code> that returns <code>IEnumerable(Of T)</code> can <code>Yield</code> one item at a time. Each time the caller asks for the next value, the function runs until the next <code>Yield</code> and then pauses. LINQ methods such as <code>Where</code> are lazy in the same way: they run when you loop, so they see changes made after the query was built.",
          code: `Module Program
    Iterator Function Countdown(from As Integer) As IEnumerable(Of Integer)
        For i As Integer = from To 0 Step -1
            Yield i
        Next
    End Function

    Iterator Function Fibonacci() As IEnumerable(Of Long)
        Dim a As Long = 0
        Dim b As Long = 1
        Do
            Yield a
            Dim next_ = a + b
            a = b
            b = next_
        Loop
    End Function

    Sub Main()
        Console.WriteLine(String.Join(" ", Countdown(3)))
        Console.WriteLine(String.Join(" ", Fibonacci().Take(8)))
        Dim stash As New List(Of Integer) From {4, 9, 2}
        Dim big = stash.Where(Function(n)
                                  Console.WriteLine($"  check {n}")
                                  Return n > 3
                              End Function)
        stash.Add(12)
        Console.WriteLine("before")
        For Each n In big
            Console.WriteLine("big " & n)
        Next
    End Sub
End Module`,
          out: "3 2 1 0\n0 1 1 2 3 5 8 13\nbefore\n  check 4\nbig 4\n  check 9\nbig 9\n  check 2\n  check 12\nbig 12",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Dim xs = {New With {.K = "a", .N = 2}, New With {.K = "b", .N = 5}, New With {.K = "a", .N = 3}}
        Dim q = From x In xs Group By x.K Into Total = Sum(x.N) Order By K
        Console.WriteLine(String.Join(",", From r In q Select r.K & r.Total))
    End Sub
End Module`, options: ["a5,b5", "a2,b5,a3", "a5,b5,a3", "b5,a5"], answer: "a5,b5", why: "Group By totals a to 5 and b to 5, then Order By K puts a before b." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Iterator Function Evens() As IEnumerable(Of Integer)
        Dim i = 0
        Do
            Yield i
            i += 2
        Loop
    End Function
    Sub Main()
        Console.WriteLine(String.Join("", Evens().Take(3)))
    End Sub
End Module`, options: ["024", "246", "02", "An endless loop"], answer: "024", why: "Take(3) only asks for three items, so the endless iterator stops there." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Dim t = (Tree := "oak", Nuts := 4)
        Console.WriteLine(t.Tree & t.Nuts)
    End Sub
End Module`, options: ["oak4", "Tree4", "oak Nuts", "4oak"], answer: "oak4", why: "Named tuple fields are read with .Tree and .Nuts." },
      ],
    },
    {
      id: "project",
      title: "Project: a nut inventory",
      summary: "Enum, classes and a ledger of found / ate / gift events.",
      sections: [
        {
          p: "An inventory is built by replaying a list of events. Each event holds a kind string, a <code>NutKind</code> enum and a count. Applying an event either updates the stock or returns an error string — a small result value, without throwing. A gift that asks for more walnuts than you have is skipped and reported; the rest become a sorted table, with a note of who received gifts.",
          code: `Module Program
    Enum NutKind
        Acorn
        Walnut
        Hazelnut
    End Enum

    Class InventoryEvent
        Public Property Kind As String
        Public Property Nut As NutKind
        Public Property Count As Integer
        Public Property [To] As String

        Sub New(kind As String, nut As NutKind, count As Integer, Optional [to] As String = Nothing)
            Me.Kind = kind
            Me.Nut = nut
            Me.Count = count
            Me.To = [to]
        End Sub
    End Class

    Class Inventory
        Private ReadOnly stock As New Dictionary(Of NutKind, Integer)

        Sub New()
            For Each n As NutKind In [Enum].GetValues(GetType(NutKind))
                stock(n) = 0
            Next
        End Sub

        Function Apply(e As InventoryEvent) As String
            If e.Kind = "found" Then
                stock(e.Nut) += e.Count
                Return Nothing
            End If
            If stock(e.Nut) < e.Count Then
                Return $"cannot {e.Kind} {e.Count} {e.Nut.ToString().ToLower()}: only {stock(e.Nut)}"
            End If
            stock(e.Nut) -= e.Count
            Return Nothing
        End Function

        Sub Report()
            For Each pair In stock.OrderByDescending(Function(kv) kv.Value)
                Console.WriteLine($"{pair.Key.ToString().ToLower(),-9} {pair.Value,2}")
            Next
        End Sub
    End Class

    Sub Main()
        Dim events As New List(Of InventoryEvent) From {
            New InventoryEvent("found", NutKind.Acorn, 8),
            New InventoryEvent("found", NutKind.Walnut, 3),
            New InventoryEvent("ate", NutKind.Acorn, 2),
            New InventoryEvent("gift", NutKind.Walnut, 5, "Pip"),
            New InventoryEvent("found", NutKind.Hazelnut, 4),
            New InventoryEvent("gift", NutKind.Acorn, 1, "Pip")
        }

        Dim inv As New Inventory()
        Dim gifts As New HashSet(Of String)
        For Each e In events
            Dim err = inv.Apply(e)
            If err IsNot Nothing Then
                Console.WriteLine("skipped: " & err)
                Continue For
            End If
            If e.Kind = "gift" Then gifts.Add(e.To)
        Next
        inv.Report()
        Console.WriteLine("gifts to: " & String.Join(", ", gifts.OrderBy(Function(g) g)))
    End Sub
End Module`,
          out: "skipped: cannot gift 5 walnut: only 3\nacorn      5\nhazelnut   4\nwalnut     3\ngifts to: Pip",
        },
        {
          h: "Ideas to try",
          p: "Add a <code>traded</code> event that swaps one nut for another, load the events from a CSV with the file helpers from earlier, or make <code>Apply</code> return a small class with <code>Ok</code> and <code>Message</code> properties instead of a bare string. Format widths such as <code>{name,-9}</code> left-align in nine columns; a positive width right-aligns.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `Module Program
    Sub Main()
        Console.WriteLine($"[{"ab",-4}][{7,3}]")
    End Sub
End Module`, options: ["[ab  ][  7]", "[  ab][7  ]", "[ab][7]", "[ab  ][7  ]"], answer: "[ab  ][  7]", why: "A negative width left-aligns, a positive one right-aligns." },
        { q: "Why does Apply return a String instead of throwing?", options: ["So a bad event can be skipped and reported without stopping the whole replay", "VB cannot throw inside a Class", "Enums cannot be used with exceptions", "Strings are faster than exceptions"], answer: "So a bad event can be skipped and reported without stopping the whole replay", why: "Returning an error value keeps the loop in charge of what to print next." },
        { kind: "output", q: "What does this print?", code: `Module Program
    Enum Nut
        Acorn
        Walnut
    End Enum
    Sub Main()
        Dim stock As New Dictionary(Of Nut, Integer)
        For Each n As Nut In [Enum].GetValues(GetType(Nut))
            stock(n) = 0
        Next
        stock(Nut.Acorn) += 3
        Console.WriteLine(String.Join(",", stock.Keys.Select(Function(k) k.ToString().ToLower())) & " " & stock(Nut.Acorn))
    End Sub
End Module`, options: ["acorn,walnut 3", "Acorn,Walnut 3", "acorn 3", "0,0 3"], answer: "acorn,walnut 3", why: "GetValues lists both enum members in order; ToLower makes the names readable, then acorn is increased." },
      ],
    },
  ],
};
