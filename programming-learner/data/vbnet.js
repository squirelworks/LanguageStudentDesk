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
  ],
  builtins: ["Console", "WriteLine", "Write", "Math", "List", "Dictionary", "Len", "Left", "Right", "Mid", "UCase", "LCase", "CInt", "CStr", "CDbl", "Sum", "Count"],
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
  ],
};
