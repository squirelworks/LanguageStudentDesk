// Fortran course for the Programming Learner. Written for this project.
// Examples are complete free-form programs (Fortran 2008). tools/run_fortran.py
// compiles them with gfortran and checks the printed output.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.fortran = {
  id: "fortran",
  name: "Fortran",
  title: "Fortran: numbers, arrays and science",
  intro:
    "Fortran (FORmula TRANslation) appeared in 1957 and was the first widely used high-level language. It is still a working language in scientific computing: weather and climate models, physics, engineering and many of the fast maths libraries other languages call into are written in it, so it is worth knowing if you work anywhere near numbers. Today's Fortran is a clean, modern language with whole-array operations built in. These lessons use free-form Fortran 2008. Old code from before 1990 (FORTRAN 77) uses fixed columns and capital letters; lesson 1 shows how to recognise it. Every example is a whole program and shows exactly what it prints. To run one yourself, save it as <code>hello.f90</code> and type <code>gfortran -o hello hello.f90 && ./hello</code>.",
  comment: "!",
  caseInsensitive: true,
  keywords: [
    "PROGRAM", "END", "IMPLICIT", "NONE", "INTEGER", "REAL", "CHARACTER", "LOGICAL", "PARAMETER", "LEN",
    "IF", "THEN", "ELSE", "SELECT", "CASE", "DEFAULT", "DO", "WHILE", "EXIT", "CYCLE",
    "FUNCTION", "SUBROUTINE", "CONTAINS", "RESULT", "INTENT", "IN", "OUT", "INOUT", "CALL", "USE", "KIND",
  ],
  builtins: ["PRINT", "SQRT", "MOD", "ABS", "SUM", "SIZE", "MAXVAL", "MINVAL", "REAL", "INT", "TRIM", "ISO_FORTRAN_ENV", "REAL64"],
  lessons: [
    {
      id: "first",
      title: "Your first program",
      summary: "program, print, comments and implicit none.",
      sections: [
        {
          p: "A Fortran program sits between <code>program name</code> and <code>end program name</code>. <code>print '(a)', ...</code> prints a line of text: the part in quotes is a <b>format</b>, and <code>(a)</code> means \"a piece of text\". <code>!</code> starts a comment. Always write <code>implicit none</code> at the top; without it, Fortran guesses a type for any name you forget to declare, and a typo silently becomes a new variable.",
          code: `program hello
  implicit none
  ! Print two lines
  print '(a)', 'Hello, squirrel!'
  print '(a)', 'Nuts are ready.'
end program hello`,
          out: "Hello, squirrel!\nNuts are ready.",
        },
        {
          h: "Several items, and the quick form",
          p: "A format can list several items: <code>(a, a)</code> prints two pieces of text with nothing between them. You will also see <code>print *, ...</code>, the quick form that lets the compiler choose the layout. It is handy for debugging, but each compiler spaces it a little differently (gfortran starts each line with a space), so these lessons write the format out.",
          code: `program join
  implicit none
  print '(a, a)', 'Acorn', 'Bank'
  print '(a, a)', 'Acorn ', 'Bank'
  print *, 'Quick form'
end program join`,
          out: "AcornBank\nAcorn Bank\n Quick form",
        },
        {
          h: "Recognising FORTRAN 77",
          p: "Older code is in fixed form: a <code>C</code> or <code>*</code> in column 1 marks a comment, columns 1 to 5 hold statement labels, a character in column 6 continues the previous line, and statements go in columns 7 to 72. Loops end on a numbered <code>CONTINUE</code> line. Modern compilers still build this code, which is one reason so much of it is still running.",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program q1
  implicit none
  print '(a, a)', 'Pay', 'day'
end program q1`, options: ["Payday", "Pay day", "Pay\nday", " Payday"], answer: "Payday", why: "The format (a, a) prints the two strings right next to each other." },
        { kind: "output", q: "What does this print?", code: `program q2
  implicit none
  print '(a)', 'One'
  ! print '(a)', 'Two'
  print '(a)', 'Three'
end program q2`, options: ["One\nThree", "One\nTwo\nThree", "OneThree", "One"], answer: "One\nThree", why: "The middle line starts with !, so it is a comment and never runs." },
        { q: "Why write implicit none?", options: ["So every variable must be declared and typos are caught", "To make the program run faster", "To turn off printing", "To allow any type in any variable"], answer: "So every variable must be declared and typos are caught", why: "Without it, Fortran gives undeclared names a type from their first letter, so a misspelt name quietly becomes a new variable." },
        { q: "Where is Fortran still widely used?", options: ["Scientific and engineering computing", "Web page layout", "Phone apps", "Spreadsheet macros"], answer: "Scientific and engineering computing", why: "Weather, climate, physics and engineering codes, and many fast maths libraries, are written in Fortran." },
      ],
    },
    {
      id: "types",
      title: "Variables and formats",
      summary: "integer, real, character, logical, and the i, f and a edit descriptors.",
      sections: [
        {
          p: "Declarations come first, before any statement. The main types are <code>integer</code>, <code>real</code>, <code>character(len=n)</code> and <code>logical</code> (<code>.true.</code> or <code>.false.</code>). In a format, <code>i0</code> prints an integer in as few digits as it needs, and <code>a</code> prints text.",
          code: `program vars
  implicit none
  integer :: nuts
  character(len=8) :: owner
  nuts = 42
  owner = 'Squirrel'
  print '(a, a, i0, a)', owner, ' has ', nuts, ' nuts'
end program vars`,
          out: "Squirrel has 42 nuts",
        },
        {
          h: "Real numbers and double precision",
          p: "A plain <code>real</code> has only about 7 significant digits. Scientific code uses 64-bit reals, chosen with a <b>kind</b>: <code>use iso_fortran_env, only: real64</code>, then <code>real(real64)</code>, and literals written with <code>_real64</code>. In a format, <code>f8.3</code> prints a real 8 characters wide with 3 digits after the point, and <code>f0.2</code> uses just as much width as it needs. With <code>f0</code>, the zero before the point is optional in the standard, and gfortran leaves it out.",
          code: `program reals
  use iso_fortran_env, only: real64
  implicit none
  real(real64) :: x
  x = 2.0_real64 / 3.0_real64
  print '(f8.3)', x
  print '(f0.2)', x
  print '(f0.10)', x
end program reals`,
          out: "   0.667\n.67\n.6666666667",
        },
        {
          h: "Constants and text",
          p: "<code>parameter</code> makes a named constant that can never change. Text in a <code>character</code> variable is padded with spaces to its full length; <code>trim</code> removes the trailing spaces.",
          code: `program consts
  implicit none
  integer, parameter :: days = 7
  character(len=10) :: tree
  tree = 'Oak'
  print '(a, a, a)', '[', tree, ']'
  print '(a, a, a)', '[', trim(tree), ']'
  print '(i0)', days * 2
end program consts`,
          out: "[Oak       ]\n[Oak]\n14",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program q1
  implicit none
  integer :: n
  n = 7
  print '(a, i0)', 'n=', n
end program q1`, options: ["n=7", "n= 7", "n=007", "n=7.0"], answer: "n=7", why: "i0 prints the integer in as few digits as it needs, with no padding." },
        { kind: "output", q: "What does this print?", code: `program q2
  use iso_fortran_env, only: real64
  implicit none
  real(real64) :: x
  x = 1.0_real64 / 4.0_real64
  print '(f0.3)', x
end program q2`, options: [".250", ".25", "0.25", ".3"], answer: ".250", why: "f0.3 always prints exactly three digits after the point, so 0.25 becomes .250. With f0, gfortran leaves out the zero before the point." },
        { kind: "output", q: "What does this print?", code: `program q3
  implicit none
  character(len=6) :: w
  w = 'Elm'
  print '(a, a, a)', '<', trim(w), '>'
end program q3`, options: ["<Elm>", "<Elm   >", "< Elm>", "<Elm >"], answer: "<Elm>", why: "w holds Elm followed by three spaces; trim removes them." },
        { q: "What does integer, parameter :: n = 10 declare?", options: ["A named constant that cannot be changed", "A function parameter", "An array of 10 integers", "A variable that starts at 10"], answer: "A named constant that cannot be changed", why: "parameter fixes the value at compile time. Assigning to n later is an error." },
        { q: "How do you get 64-bit reals in portable modern Fortran?", options: ["real(real64) with use iso_fortran_env", "real*64", "double real", "real, long"], answer: "real(real64) with use iso_fortran_env", why: "iso_fortran_env gives standard kind names. real*8 is an old extension you will see in legacy code." },
      ],
    },
    {
      id: "arithmetic",
      title: "Arithmetic",
      summary: "Integer division, powers, mixed types and intrinsic functions.",
      sections: [
        {
          p: "<code>+ - * /</code> work as usual, and <code>**</code> is a power. Dividing two integers gives an integer and drops the fraction. <code>mod(a, b)</code> is the remainder.",
          code: `program ints
  implicit none
  print '(i0)', 7 / 2
  print '(i0)', mod(7, 2)
  print '(i0)', 2**10
  print '(i0)', -7 / 2
end program ints`,
          out: "3\n1\n1024\n-3",
        },
        {
          h: "Mixing integers and reals",
          p: "If either side is real, the arithmetic is done in real. <code>real(n, real64)</code> converts an integer on purpose, and <code>int(x)</code> cuts a real down to a whole number. The intrinsic functions such as <code>sqrt</code>, <code>abs</code> and <code>exp</code> work on any real kind.",
          code: `program mixed
  use iso_fortran_env, only: real64
  implicit none
  integer :: n
  real(real64) :: x
  n = 7
  x = real(n, real64) / 2
  print '(f0.1)', x
  print '(i0)', int(x)
  print '(f0.6)', sqrt(2.0_real64)
  print '(f0.1)', abs(-3.5_real64)
end program mixed`,
          out: "3.5\n3\n1.414214\n3.5",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program q1
  implicit none
  print '(i0)', 9 / 4
end program q1`, options: ["2", "2.25", "3", "2.0"], answer: "2", why: "Both sides are integers, so the result is an integer and the .25 is dropped." },
        { kind: "output", q: "What does this print?", code: `program q2
  implicit none
  print '(i0)', 3**3
end program q2`, options: ["27", "9", "6", "33"], answer: "27", why: "** is a power: 3 to the power 3 is 27." },
        { kind: "output", q: "What does this print?", code: `program q3
  implicit none
  print '(i0)', mod(17, 5)
end program q3`, options: ["2", "3", "5", "12"], answer: "2", why: "17 is 3 fives (15) with 2 left over." },
        { kind: "output", q: "What does this print?", code: `program q4
  use iso_fortran_env, only: real64
  implicit none
  print '(f0.2)', 9 / 4 * 1.0_real64
end program q4`, options: ["2.00", "2.25", "2.20", "9.00"], answer: "2.00", why: "Fortran works left to right: 9 / 4 is integer division and gives 2 before the multiplication turns it into a real." },
      ],
    },
    {
      id: "decisions",
      title: "Decisions",
      summary: "if, else if and select case.",
      sections: [
        {
          p: "<code>if (condition) then ... else if ... else ... end if</code>. Comparisons are <code>== /= &lt; &lt;= &gt; &gt;=</code>, and conditions combine with <code>.and.</code>, <code>.or.</code> and <code>.not.</code>. Note that \"not equal\" is <code>/=</code>.",
          code: `program check
  implicit none
  integer :: t
  t = 25
  if (t > 30) then
    print '(a)', 'Hot'
  else if (t > 15) then
    print '(a)', 'Mild'
  else
    print '(a)', 'Cold'
  end if
  if (t /= 0 .and. mod(t, 5) == 0) print '(a)', 'Multiple of five'
end program check`,
          out: "Mild\nMultiple of five",
        },
        {
          h: "select case",
          p: "<code>select case</code> picks one branch by value. A case can list several values or a range written with <code>:</code>, and <code>case default</code> catches the rest.",
          code: `program grade
  implicit none
  integer :: score
  score = 82
  select case (score)
  case (90:)
    print '(a)', 'A'
  case (80:89)
    print '(a)', 'B'
  case (70:79)
    print '(a)', 'C'
  case default
    print '(a)', 'Try again'
  end select
end program grade`,
          out: "B",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program q1
  implicit none
  integer :: n
  n = 10
  if (n > 10) then
    print '(a)', 'big'
  else
    print '(a)', 'small'
  end if
end program q1`, options: ["small", "big", "big\nsmall", "Nothing"], answer: "small", why: "10 is not greater than 10, so the else branch runs." },
        { kind: "output", q: "What does this print?", code: `program q2
  implicit none
  integer :: d
  d = 6
  select case (d)
  case (1:5)
    print '(a)', 'Weekday'
  case (6, 7)
    print '(a)', 'Weekend'
  case default
    print '(a)', 'No such day'
  end select
end program q2`, options: ["Weekend", "Weekday", "No such day", "Weekday\nWeekend"], answer: "Weekend", why: "case (6, 7) matches either value. Only one branch runs." },
        { q: "How do you write \"not equal\" in Fortran?", options: ["/=", "!=", "<>", "=/="], answer: "/=", why: "Fortran uses /= (or the old .ne.). != starts a comment in Fortran." },
        { q: "What does case (90:) match?", options: ["90 and anything above", "Only 90", "Anything below 90", "90 to 99"], answer: "90 and anything above", why: "A range with no upper end is open on that side." },
      ],
    },
    {
      id: "loops",
      title: "Loops",
      summary: "Counted do loops, do while, exit and cycle.",
      sections: [
        {
          p: "<code>do i = first, last</code> counts up by 1, and a third number gives the step. The last value is included. The loop ends at <code>end do</code>.",
          code: `program counting
  implicit none
  integer :: i
  do i = 1, 3
    print '(a, i0)', 'Step ', i
  end do
  do i = 10, 0, -5
    print '(i0)', i
  end do
end program counting`,
          out: "Step 1\nStep 2\nStep 3\n10\n5\n0",
        },
        {
          h: "do while, exit and cycle",
          p: "<code>do while (condition)</code> checks before each pass. Inside any loop, <code>exit</code> leaves it at once and <code>cycle</code> skips to the next pass. A bare <code>do</code> with an <code>exit</code> inside is a common way to loop until something happens.",
          code: `program control
  implicit none
  integer :: n, i
  n = 1
  do while (n < 20)
    n = n * 2
  end do
  print '(i0)', n
  do i = 1, 10
    if (mod(i, 2) == 0) cycle
    if (i > 7) exit
    print '(i0)', i
  end do
end program control`,
          out: "32\n1\n3\n5\n7",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program q1
  implicit none
  integer :: i
  do i = 2, 6, 2
    print '(i0)', i
  end do
end program q1`, options: ["2\n4\n6", "2\n4", "2\n3\n4\n5\n6", "4\n6"], answer: "2\n4\n6", why: "The loop counts from 2 in steps of 2, and the last value, 6, is included." },
        { kind: "output", q: "What does this print?", code: `program q2
  implicit none
  integer :: i, total
  total = 0
  do i = 1, 4
    total = total + i
  end do
  print '(i0)', total
end program q2`, options: ["10", "4", "6", "24"], answer: "10", why: "1 + 2 + 3 + 4 is 10." },
        { kind: "output", q: "What does this print?", code: `program q3
  implicit none
  integer :: i
  do i = 1, 5
    if (i == 3) cycle
    print '(i0)', i
  end do
end program q3`, options: ["1\n2\n4\n5", "1\n2", "1\n2\n3\n4\n5", "3"], answer: "1\n2\n4\n5", why: "cycle skips the rest of the pass when i is 3, then the loop carries on." },
        { q: "What does exit do inside a do loop?", options: ["Leaves the loop at once", "Ends the whole program", "Skips to the next pass", "Restarts the loop"], answer: "Leaves the loop at once", why: "exit jumps to just after end do. cycle is the one that skips to the next pass, and stop ends the program." },
      ],
    },
    {
      id: "arrays",
      title: "Arrays",
      summary: "Declaring arrays, 1-based indexes and whole-array operations.",
      sections: [
        {
          p: "<code>integer :: a(5)</code> declares five integers. Indexes <b>start at 1</b>. <code>[ ... ]</code> builds an array from a list, and the format <code>(*(i0, 1x))</code> repeats \"an integer and one space\" for every item.",
          code: `program arrays
  implicit none
  integer :: nuts(3)
  nuts = [12, 30, 5]
  print '(i0)', nuts(1)
  nuts(3) = nuts(3) + 1
  print '(*(i0, 1x))', nuts
end program arrays`,
          out: "12\n12 30 6",
        },
        {
          h: "Whole-array operations",
          p: "Arithmetic works on whole arrays at once, element by element, with no loop. Intrinsics such as <code>sum</code>, <code>maxval</code> and <code>size</code> work on a whole array, and <code>a(2:3)</code> is a <b>section</b> of it. This is a big part of why Fortran is pleasant for maths.",
          code: `program whole
  implicit none
  integer :: a(4), b(4)
  a = [1, 2, 3, 4]
  b = a * 10 + 1
  print '(*(i0, 1x))', b
  print '(i0)', sum(a)
  print '(i0)', maxval(b)
  print '(i0)', size(a)
  print '(*(i0, 1x))', a(2:3)
end program whole`,
          out: "11 21 31 41\n10\n41\n4\n2 3",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program q1
  implicit none
  integer :: a(3)
  a = [7, 8, 9]
  print '(i0)', a(1)
end program q1`, options: ["7", "8", "9", "0"], answer: "7", why: "Fortran arrays start at index 1 by default, so a(1) is the first element." },
        { kind: "output", q: "What does this print?", code: `program q2
  implicit none
  integer :: a(3)
  a = [1, 2, 3]
  a = a * a
  print '(*(i0, 1x))', a
end program q2`, options: ["1 4 9", "14", "1 2 3", "6"], answer: "1 4 9", why: "a * a multiplies element by element: 1×1, 2×2, 3×3." },
        { kind: "output", q: "What does this print?", code: `program q3
  implicit none
  integer :: a(5)
  a = [5, 4, 3, 2, 1]
  print '(i0)', sum(a(2:4))
end program q3`, options: ["9", "15", "6", "7"], answer: "9", why: "a(2:4) is the section 4, 3, 2, which adds up to 9." },
        { q: "How do you double every element of a real array x?", options: ["x = 2 * x", "do x: x *= 2", "x.double()", "map(x, 2)"], answer: "x = 2 * x", why: "Arithmetic on a whole array applies to every element, so no loop is needed." },
      ],
    },
    {
      id: "procedures",
      title: "Functions and subroutines",
      summary: "contains, function, subroutine and intent.",
      sections: [
        {
          p: "Procedures go after <code>contains</code>, at the end of the program. A <b>function</b> returns a value; a <b>subroutine</b> does not and is run with <code>call</code>. <code>intent(in)</code> promises an argument is only read, and <code>intent(inout)</code> lets the subroutine change the caller's variable.",
          code: `program procs
  implicit none
  integer :: stash
  stash = 10
  print '(i0)', square(6)
  call add_nuts(stash, 5)
  print '(i0)', stash
contains
  function square(n) result(r)
    integer, intent(in) :: n
    integer :: r
    r = n * n
  end function square

  subroutine add_nuts(total, extra)
    integer, intent(inout) :: total
    integer, intent(in) :: extra
    total = total + extra
  end subroutine add_nuts
end program procs`,
          out: "36\n15",
        },
        {
          h: "Arrays as arguments",
          p: "An argument declared <code>x(:)</code> takes an array of any length, and <code>size(x)</code> tells you how long it is. This is how library routines are written.",
          code: `program mean_demo
  use iso_fortran_env, only: real64
  implicit none
  print '(f0.2)', mean([2.0_real64, 4.0_real64, 9.0_real64])
contains
  function mean(x) result(m)
    real(real64), intent(in) :: x(:)
    real(real64) :: m
    m = sum(x) / size(x)
  end function mean
end program mean_demo`,
          out: "5.00",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `program q1
  implicit none
  print '(i0)', twice(4) + 1
contains
  function twice(n) result(r)
    integer, intent(in) :: n
    integer :: r
    r = 2 * n
  end function twice
end program q1`, options: ["9", "8", "10", "5"], answer: "9", why: "twice(4) is 8, and 1 is added after the call." },
        { kind: "output", q: "What does this print?", code: `program q2
  implicit none
  integer :: n
  n = 3
  call bump(n)
  call bump(n)
  print '(i0)', n
contains
  subroutine bump(k)
    integer, intent(inout) :: k
    k = k + 10
  end subroutine bump
end program q2`, options: ["23", "13", "3", "30"], answer: "23", why: "Arguments are passed by reference, so each call adds 10 to the caller's n." },
        { q: "How do you run a subroutine?", options: ["call name(args)", "name(args) on its own", "run name", "perform name"], answer: "call name(args)", why: "Subroutines are run with call. Functions are used inside expressions." },
        { q: "What does intent(in) mean on an argument?", options: ["The procedure only reads it and may not change it", "It is optional", "It is an input from the keyboard", "It must be an integer"], answer: "The procedure only reads it and may not change it", why: "The compiler checks the promise and reports an error if the procedure assigns to it." },
      ],
    },
  ],
};
