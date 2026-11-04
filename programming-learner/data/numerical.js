// Numerical methods track for the Programming Learner. Written for this
// project: every explanation and every program here is our own. Numerical
// Recipes is cited as further reading only; nothing is taken from it.
// Schema: see data/python.js, plus `langs` (name and colouring words per
// language) and `lang` on an example or question, which picks the language it
// is shown and run in. tools/check_packs.py runs each example with that
// language's runner, and tools/test_numerical.py checks the numbers against
// known values (`known`) and that every language prints the same result.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.numerical = {
  id: "numerical",
  name: "Numerical methods",
  title: "Numerical methods, one idea at a time",
  intro:
    "Numerical methods are the recipes computers use to get numbers out of maths that has no neat formula: the root of an equation, the area under a curve, the solution of a system of equations. This track explains each method in plain words, shows why it works and when it fails, and then implements it in several languages side by side, so you can compare how Python, C and Fortran say the same thing. Every implementation is tested against known values, and the versions in different languages must print the same answer. It assumes you can already write loops and functions in at least one of the languages. Topics arrive one at a time, starting with floating-point numbers and root finding. <br><br><b>Further reading:</b> W. H. Press, S. A. Teukolsky, W. T. Vetterling and B. P. Flannery, <i>Numerical Recipes: The Art of Scientific Computing</i>, 3rd edition, Cambridge University Press, 2007, covers these topics and many more in depth. The explanations and code in this track are our own and are not taken from that book.",
  langs: {
    python: {
      name: "Python",
      comment: "#",
      keywords: ["def", "return", "if", "else", "elif", "while", "for", "in", "range", "import", "from", "raise", "and", "or", "not", "lambda", "True", "False", "None"],
      builtins: ["print", "abs", "math", "ValueError", "RuntimeError"],
    },
    c: {
      name: "C",
      comment: "//",
      keywords: ["int", "double", "void", "return", "if", "else", "for", "while", "include", "typedef", "const"],
      builtins: ["printf", "fabs", "cos", "main"],
    },
    fortran: {
      name: "Fortran",
      comment: "!",
      caseInsensitive: true,
      keywords: ["PROGRAM", "END", "IMPLICIT", "NONE", "INTEGER", "REAL", "LOGICAL", "IF", "THEN", "ELSE", "DO", "WHILE", "EXIT", "FUNCTION", "SUBROUTINE", "CONTAINS", "RESULT", "INTENT", "IN", "OUT", "INOUT", "CALL", "USE", "ONLY", "ABSTRACT", "INTERFACE", "IMPORT", "PROCEDURE", "ERROR", "STOP"],
      builtins: ["PRINT", "ABS", "COS", "EPSILON", "ISO_FORTRAN_ENV", "REAL64"],
    },
  },
  lessons: [
    {
      id: "floats",
      title: "Floating-point numbers",
      summary: "Why 0.1 + 0.2 is not 0.3, machine epsilon, and comparing with a tolerance.",
      sections: [
        {
          p: "Almost every numerical method works on <b>floating-point</b> numbers: the <code>float</code> in Python, <code>double</code> in C and <code>real(real64)</code> in Fortran. They store a number in binary with about 16 significant decimal digits. Most decimal fractions, such as 0.1, have no exact binary form, so they are stored as the nearest value that fits, and small errors creep into every result. Printing more digits than usual shows the error.",
        },
        {
          lang: "python",
          code: `a = 0.1 + 0.2
print(f"{a:.17f}")
print(a == 0.3)`,
          out: "0.30000000000000004\nFalse",
        },
        {
          lang: "c",
          code: `#include <stdio.h>
int main(void) {
    double a = 0.1 + 0.2;
    printf("%.17f\\n", a);
    printf("%s\\n", a == 0.3 ? "True" : "False");
    return 0;
}`,
          out: "0.30000000000000004\nFalse",
        },
        {
          h: "Machine epsilon",
          p: "<b>Machine epsilon</b> is the gap between 1 and the next number a double can hold, about 2.2 × 10<sup>−16</sup>. It sets the best relative accuracy you can hope for: answers are only ever right to roughly 15 or 16 significant digits. Adding something much smaller than epsilon to 1 changes nothing at all.",
        },
        {
          lang: "python",
          code: `import sys
eps = sys.float_info.epsilon
print(f"{eps:.3e}")
print(1.0 + eps / 4 == 1.0)`,
          out: "2.220e-16\nTrue",
        },
        {
          lang: "fortran",
          code: `program eps
  use iso_fortran_env, only: real64
  implicit none
  real(real64) :: e
  e = epsilon(1.0_real64)
  print '(es10.3)', e
  print '(l1)', 1.0_real64 + e / 4 == 1.0_real64
end program eps`,
          out: " 2.220E-16\nT",
        },
        {
          h: "Compare with a tolerance",
          p: "Because of these errors, never test two computed floats with <code>==</code>. Check that they are close instead: <code>abs(a - b) &lt; tol</code>, where the tolerance suits the size of the numbers. The methods in this track stop the same way, when a change gets smaller than a tolerance you choose.",
          lang: "python",
          code: `a = 0.1 + 0.2
tol = 1e-12
print(abs(a - 0.3) < tol)`,
          out: "True",
        },
      ],
      practice: [
        { q: "Why does 0.1 + 0.2 == 0.3 come out false?", options: ["0.1 and 0.2 have no exact binary form, so small errors add up", "The computer adds wrongly", "== does not work on numbers", "0.3 is too big for a double"], answer: "0.1 and 0.2 have no exact binary form, so small errors add up", why: "Each value is stored as the nearest binary fraction, and the tiny errors make the sum differ from the stored 0.3 in the last digit." },
        { q: "About how many significant decimal digits does a double hold?", options: ["15 to 16", "6 to 7", "32", "As many as you need"], answer: "15 to 16", why: "A 64-bit double has a 53-bit mantissa, which is a little under 16 decimal digits. A 32-bit float has about 7." },
        { kind: "output", lang: "python", q: "What does this print?", code: `print(abs((0.1 + 0.2) - 0.3) < 1e-9)`, options: ["True", "False", "0.0", "Error"], answer: "True", why: "The difference is about 5.6 × 10⁻¹⁷, far below the tolerance." },
        { q: "How should you check that two computed doubles a and b are equal?", options: ["abs(a - b) < tol, with a suitable tolerance", "a == b", "a - b == 0", "int(a) == int(b)"], answer: "abs(a - b) < tol, with a suitable tolerance", why: "Computed values carry rounding errors, so exact equality fails when the maths says they should match." },
      ],
    },
    {
      id: "bisection",
      title: "Root finding: bisection",
      summary: "Halving an interval that brackets a sign change.",
      sections: [
        {
          p: "A <b>root</b> of a function <i>f</i> is a value <i>x</i> where <i>f</i>(<i>x</i>) = 0. Finding √2, for example, is finding the root of <i>f</i>(<i>x</i>) = <i>x</i>² − 2. Many equations have no formula for their roots, so we search for them.",
        },
        {
          h: "The idea",
          p: "If <i>f</i> is continuous and <i>f</i>(<i>a</i>) and <i>f</i>(<i>b</i>) have opposite signs, the curve must cross zero somewhere between <i>a</i> and <i>b</i>; the interval <b>brackets</b> a root. Look at the midpoint <i>m</i>. Whichever half still has a sign change keeps the root, so throw the other half away and repeat. Each step halves the interval, so after <i>n</i> steps it is (<i>b</i> − <i>a</i>) / 2<sup><i>n</i></sup> wide. Shrinking a width of 1 below 10<sup>−12</sup> takes 40 steps, because 2<sup>40</sup> is just over 10<sup>12</sup>.",
        },
        {
          h: "Why use it",
          p: "Bisection always works once you have a bracket, and you know in advance how many steps it will take. It is slow, gaining one binary digit per step, and it needs a sign change, so it cannot find a root where the curve only touches zero, such as <i>x</i>² = 0. Below, the same function finds √2 and the root of cos <i>x</i> = <i>x</i> (about 0.739, the number you get by pressing cos over and over on a calculator).",
        },
        {
          lang: "python",
          known: [1.4142135623730951, 0.7390851332151607],
          impl: "bisection",
          code: `import math

def bisect(f, a, b, tol=1e-12):
    fa = f(a)
    if fa * f(b) > 0:
        raise ValueError("f(a) and f(b) must have opposite signs")
    steps = 0
    while b - a > tol:
        m = (a + b) / 2
        fm = f(m)
        if fa * fm <= 0:    # the sign change is in [a, m]
            b = m
        else:               # the sign change is in [m, b]
            a, fa = m, fm
        steps += 1
    return (a + b) / 2, steps

root, steps = bisect(lambda x: x * x - 2, 1.0, 2.0)
print(f"{root:.10f} after {steps} steps")
root, steps = bisect(lambda x: math.cos(x) - x, 0.0, 1.0)
print(f"{root:.10f} after {steps} steps")`,
          out: "1.4142135624 after 40 steps\n0.7390851332 after 40 steps",
        },
        {
          p: "In C the function is passed as a pointer, and the step count comes back through a pointer argument.",
          lang: "c",
          known: [1.4142135623730951, 0.7390851332151607],
          impl: "bisection",
          code: `#include <math.h>
#include <stdio.h>

typedef double (*func)(double);

double bisect(func f, double a, double b, double tol, int *steps) {
    double fa = f(a);
    *steps = 0;
    while (b - a > tol) {
        double m = (a + b) / 2;
        double fm = f(m);
        if (fa * fm <= 0) {
            b = m;
        } else {
            a = m;
            fa = fm;
        }
        (*steps)++;
    }
    return (a + b) / 2;
}

double square_minus_two(double x) { return x * x - 2; }
double cos_minus_x(double x) { return cos(x) - x; }

int main(void) {
    int steps;
    double root = bisect(square_minus_two, 1.0, 2.0, 1e-12, &steps);
    printf("%.10f after %d steps\\n", root, steps);
    root = bisect(cos_minus_x, 0.0, 1.0, 1e-12, &steps);
    printf("%.10f after %d steps\\n", root, steps);
    return 0;
}`,
          out: "1.4142135624 after 40 steps\n0.7390851332 after 40 steps",
        },
        {
          p: "In Fortran an <code>abstract interface</code> describes the kind of function <code>bisect</code> accepts, and <code>procedure(fn)</code> declares the argument.",
          lang: "fortran",
          known: [1.4142135623730951, 0.7390851332151607],
          impl: "bisection",
          code: `program bisection
  use iso_fortran_env, only: real64
  implicit none
  abstract interface
    function fn(x) result(y)
      import :: real64
      real(real64), intent(in) :: x
      real(real64) :: y
    end function fn
  end interface
  real(real64) :: root
  integer :: steps

  call bisect(square_minus_two, 1.0_real64, 2.0_real64, 1.0e-12_real64, root, steps)
  print '(f12.10, a, i0, a)', root, ' after ', steps, ' steps'
  call bisect(cos_minus_x, 0.0_real64, 1.0_real64, 1.0e-12_real64, root, steps)
  print '(f12.10, a, i0, a)', root, ' after ', steps, ' steps'
contains
  subroutine bisect(f, a0, b0, tol, root, steps)
    procedure(fn) :: f
    real(real64), intent(in) :: a0, b0, tol
    real(real64), intent(out) :: root
    integer, intent(out) :: steps
    real(real64) :: a, b, m, fa, fm
    a = a0
    b = b0
    fa = f(a)
    steps = 0
    do while (b - a > tol)
      m = (a + b) / 2
      fm = f(m)
      if (fa * fm <= 0) then
        b = m
      else
        a = m
        fa = fm
      end if
      steps = steps + 1
    end do
    root = (a + b) / 2
  end subroutine bisect

  function square_minus_two(x) result(y)
    real(real64), intent(in) :: x
    real(real64) :: y
    y = x * x - 2
  end function square_minus_two

  function cos_minus_x(x) result(y)
    real(real64), intent(in) :: x
    real(real64) :: y
    y = cos(x) - x
  end function cos_minus_x
end program bisection`,
          out: "1.4142135624 after 40 steps\n0.7390851332 after 40 steps",
        },
      ],
      practice: [
        { q: "What must be true of f(a) and f(b) before bisection can start?", options: ["They have opposite signs", "They are equal", "Both are positive", "f(a) is zero"], answer: "They have opposite signs", why: "A sign change guarantees that a continuous function crosses zero between a and b." },
        { q: "The interval starts 1 wide. How many bisection steps make it narrower than 0.001?", options: ["10", "3", "100", "1000"], answer: "10", why: "After n steps the width is 1 / 2ⁿ, and 2¹⁰ = 1024 is the first power of two above 1000." },
        { kind: "output", lang: "python", q: "Bisection on f(x) = x − 0.3 over [0, 1]. Which half is kept after the first step?", code: `f = lambda x: x - 0.3
a, b = 0.0, 1.0
m = (a + b) / 2
if f(a) * f(m) <= 0:
    b = m
else:
    a = m
print(a, b)`, options: ["0.0 0.5", "0.5 1.0", "0.0 1.0", "0.3 0.5"], answer: "0.0 0.5", why: "f(0) = −0.3 and f(0.5) = 0.2 have opposite signs, so the root is in the left half." },
        { q: "Why can bisection not find the root of f(x) = x² at 0?", options: ["The function touches zero without changing sign", "The root is too small", "x² is not continuous", "It needs a derivative"], answer: "The function touches zero without changing sign", why: "x² is never negative, so no interval has a sign change for bisection to start from." },
        { q: "What is bisection's main strength?", options: ["Once started, it always converges", "It is the fastest method", "It needs no starting values", "It finds every root at once"], answer: "Once started, it always converges", why: "A bracket can only shrink around the root, so it cannot wander off. The cost is speed: one binary digit per step." },
      ],
    },
    {
      id: "newton",
      title: "Root finding: Newton's method",
      summary: "Following the tangent line, and why it is fast but fragile.",
      sections: [
        {
          p: "Newton's method uses the slope as well as the value. At a guess <i>x</i>, draw the tangent line to the curve and see where it crosses zero; that crossing is the next guess. The tangent crosses at <i>x</i> − <i>f</i>(<i>x</i>) / <i>f</i>′(<i>x</i>), so each step is <i>x</i><sub>new</sub> = <i>x</i> − <i>f</i>(<i>x</i>) / <i>f</i>′(<i>x</i>). Stop when the step gets smaller than a tolerance.",
        },
        {
          h: "Fast when it works",
          p: "Close to a simple root, Newton's method roughly <b>doubles the number of correct digits</b> each step (this is called quadratic convergence). For √2 with <i>f</i>(<i>x</i>) = <i>x</i>² − 2 and <i>f</i>′(<i>x</i>) = 2<i>x</i>, starting from 1, watch the correct digits grow: 1, 3, 6, then all of them. Bisection needed 40 steps for the same accuracy. (This particular case is also the old \"divide and average\" way of working out square roots by hand.)",
        },
        {
          lang: "python",
          known: [1.4142135623730951],
          impl: "newton",
          code: `def newton(f, df, x, tol=1e-12, max_steps=50):
    for step in range(1, max_steps + 1):
        dx = f(x) / df(x)
        x -= dx
        print(f"step {step}: {x:.12f}")
        if abs(dx) < tol:
            return x
    raise RuntimeError("Newton's method did not converge")

root = newton(lambda x: x * x - 2, lambda x: 2 * x, 1.0)
print(f"root {root:.10f}")`,
          out: "step 1: 1.500000000000\nstep 2: 1.416666666667\nstep 3: 1.414215686275\nstep 4: 1.414213562375\nstep 5: 1.414213562373\nstep 6: 1.414213562373\nroot 1.4142135624",
        },
        {
          lang: "c",
          known: [1.4142135623730951],
          impl: "newton",
          code: `#include <math.h>
#include <stdio.h>

typedef double (*func)(double);

int newton(func f, func df, double *x, double tol, int max_steps) {
    for (int step = 1; step <= max_steps; step++) {
        double dx = f(*x) / df(*x);
        *x -= dx;
        printf("step %d: %.12f\\n", step, *x);
        if (fabs(dx) < tol) return 1;
    }
    return 0;  /* did not converge */
}

double f(double x) { return x * x - 2; }
double df(double x) { return 2 * x; }

int main(void) {
    double x = 1.0;
    if (newton(f, df, &x, 1e-12, 50))
        printf("root %.10f\\n", x);
    else
        printf("did not converge\\n");
    return 0;
}`,
          out: "step 1: 1.500000000000\nstep 2: 1.416666666667\nstep 3: 1.414215686275\nstep 4: 1.414213562375\nstep 5: 1.414213562373\nstep 6: 1.414213562373\nroot 1.4142135624",
        },
        {
          lang: "fortran",
          known: [1.4142135623730951],
          impl: "newton",
          code: `program newton_demo
  use iso_fortran_env, only: real64
  implicit none
  real(real64) :: x, dx
  integer :: step
  logical :: converged

  x = 1.0_real64
  converged = .false.
  do step = 1, 50
    dx = f(x) / df(x)
    x = x - dx
    print '(a, i0, a, f14.12)', 'step ', step, ': ', x
    if (abs(dx) < 1.0e-12_real64) then
      converged = .true.
      exit
    end if
  end do
  if (converged) then
    print '(a, f12.10)', 'root ', x
  else
    print '(a)', 'did not converge'
  end if
contains
  function f(x) result(y)
    real(real64), intent(in) :: x
    real(real64) :: y
    y = x * x - 2
  end function f

  function df(x) result(y)
    real(real64), intent(in) :: x
    real(real64) :: y
    y = 2 * x
  end function df
end program newton_demo`,
          out: "step 1: 1.500000000000\nstep 2: 1.416666666667\nstep 3: 1.414215686275\nstep 4: 1.414213562375\nstep 5: 1.414213562373\nstep 6: 1.414213562373\nroot 1.4142135624",
        },
        {
          h: "Fragile when it doesn't",
          p: "Newton's method needs a good start. Where the slope is zero the step divides by zero, and where the slope is small the step can throw the guess far away. Some starting points make it bounce between two values forever. That is why real code always caps the number of steps, as <code>max_steps</code> does above, and why a common robust approach brackets the root first and uses Newton steps only while they stay inside the bracket, falling back to bisection otherwise. Newton's method also needs the derivative; when that is hard to write down, the <b>secant method</b> replaces it with the slope through the last two guesses.",
        },
        {
          h: "Another known root",
          p: "<i>x</i>³ − 2<i>x</i> − 5 = 0 is a classic test equation; its real root is 2.0945514815… Starting from 2, Newton's method gets there in a handful of steps.",
          lang: "python",
          known: [2.0945514815423265],
          code: `def newton(f, df, x, tol=1e-12, max_steps=50):
    for step in range(1, max_steps + 1):
        dx = f(x) / df(x)
        x -= dx
        if abs(dx) < tol:
            return x, step
    raise RuntimeError("did not converge")

root, steps = newton(lambda x: x**3 - 2*x - 5, lambda x: 3*x**2 - 2, 2.0)
print(f"{root:.10f} in {steps} steps")`,
          out: "2.0945514815 in 5 steps",
        },
      ],
      practice: [
        { q: "What is one Newton step for f(x)?", options: ["x − f(x) / f′(x)", "x − f′(x) / f(x)", "(a + b) / 2", "x + f(x)"], answer: "x − f(x) / f′(x)", why: "It is where the tangent line at x crosses zero." },
        { kind: "output", lang: "python", q: "One Newton step for f(x) = x² − 9, starting at x = 5. What does it print?", code: `x = 5.0
x = x - (x * x - 9) / (2 * x)
print(x)`, options: ["3.4", "3.0", "4.6", "2.5"], answer: "3.4", why: "f(5) = 16 and f′(5) = 10, so the step is 5 − 16 / 10 = 3.4. The next step lands near 3.02." },
        { q: "Near a simple root, roughly what happens to the number of correct digits each Newton step?", options: ["It doubles", "It goes up by one", "It halves", "It stays the same"], answer: "It doubles", why: "That is quadratic convergence: the new error is about the square of the old one." },
        { q: "Why does good Newton code limit the number of steps?", options: ["A bad start can make it wander or cycle forever", "Computers can only loop 50 times", "The answer gets worse after 50 steps", "To save memory"], answer: "A bad start can make it wander or cycle forever", why: "Unlike bisection, Newton's method has no bracket to keep it near the root." },
        { q: "What does the secant method use instead of the derivative?", options: ["The slope through the last two guesses", "The midpoint of a bracket", "A random number", "The second derivative"], answer: "The slope through the last two guesses", why: "It needs no derivative formula, and still converges faster than bisection." },
      ],
    },
    {
      id: "integration",
      title: "Integration: trapezoids and Simpson's rule",
      summary: "Adding up thin slices to find the area under a curve, and how fast the error shrinks.",
      sections: [
        {
          p: "The integral of <i>f</i> from <i>a</i> to <i>b</i> is the area under its curve. Many integrals have no formula, so we cut the interval into <i>n</i> thin slices of width <i>h</i> = (<i>b</i> − <i>a</i>) / <i>n</i>, estimate the area of each slice, and add them up. This is called <b>quadrature</b>.",
        },
        {
          h: "The trapezoid rule",
          p: "Join the curve's values at the ends of each slice with a straight line, so each slice becomes a trapezoid with area <i>h</i> × (<i>f</i>(left) + <i>f</i>(right)) / 2. Adding them up, every inside point is counted twice and the two end points once, which gives <i>h</i> × (<i>f</i>(<i>a</i>)/2 + <i>f</i>(<i>x</i><sub>1</sub>) + … + <i>f</i>(<i>x</i><sub><i>n</i>−1</sub>) + <i>f</i>(<i>b</i>)/2). The error shrinks like <i>h</i>²: twice as many slices make it about four times smaller.",
        },
        {
          h: "Simpson's rule",
          p: "Fit a parabola through each pair of slices instead of a straight line. That works out to the weights 1, 4, 2, 4, 2, …, 4, 1, times <i>h</i>/3, and needs an even number of slices. Its error shrinks like <i>h</i>⁴: twice as many slices make it about sixteen times smaller, for the same number of function evaluations. Below, both rules integrate sin <i>x</i> from 0 to π, whose exact area is 2. Each time <i>n</i> grows four times, the trapezoid error falls about 16 times and Simpson's about 256 times. The last line also finds π as the integral of 4 / (1 + <i>x</i>²) from 0 to 1.",
        },
        {
          lang: "python",
          known: [2.0, 3.141592653589793],
          impl: "integration",
          code: `import math

def trapezoid(f, a, b, n):
    h = (b - a) / n
    total = (f(a) + f(b)) / 2
    for i in range(1, n):
        total += f(a + i * h)
    return total * h

def simpson(f, a, b, n):    # n must be even
    h = (b - a) / n
    total = f(a) + f(b)
    for i in range(1, n):
        weight = 4 if i % 2 == 1 else 2
        total += weight * f(a + i * h)
    return total * h / 3

print("   n  trapezoid error  Simpson error")
for n in (4, 16, 64):
    t = abs(trapezoid(math.sin, 0.0, math.pi, n) - 2)
    s = abs(simpson(math.sin, 0.0, math.pi, n) - 2)
    print(f"{n:4d}  {t:.10f}     {s:.10f}")
area = simpson(math.sin, 0.0, math.pi, 256)
pi = simpson(lambda x: 4 / (1 + x * x), 0.0, 1.0, 256)
print(f"{area:.8f} {pi:.8f}")`,
          out: "   n  trapezoid error  Simpson error\n   4  0.1038811021     0.0045597550\n  16  0.0064296562     0.0000165910\n  64  0.0004016114     0.0000000645\n2.00000000 3.14159265",
        },
        {
          p: "In C, <code>sin</code> from the maths library can be passed straight in as a function pointer. C has no π constant in the standard, so <code>acos(-1.0)</code> gives it.",
          lang: "c",
          known: [2.0, 3.141592653589793],
          impl: "integration",
          code: `#include <math.h>
#include <stdio.h>

typedef double (*func)(double);

double trapezoid(func f, double a, double b, int n) {
    double h = (b - a) / n;
    double total = (f(a) + f(b)) / 2;
    for (int i = 1; i < n; i++)
        total += f(a + i * h);
    return total * h;
}

double simpson(func f, double a, double b, int n) {  /* n must be even */
    double h = (b - a) / n;
    double total = f(a) + f(b);
    for (int i = 1; i < n; i++) {
        int weight = (i % 2 == 1) ? 4 : 2;
        total += weight * f(a + i * h);
    }
    return total * h / 3;
}

double quarter_circle(double x) { return 4 / (1 + x * x); }

int main(void) {
    const double pi = acos(-1.0);
    int sizes[] = {4, 16, 64};
    printf("   n  trapezoid error  Simpson error\\n");
    for (int k = 0; k < 3; k++) {
        int n = sizes[k];
        double t = fabs(trapezoid(sin, 0.0, pi, n) - 2);
        double s = fabs(simpson(sin, 0.0, pi, n) - 2);
        printf("%4d  %.10f     %.10f\\n", n, t, s);
    }
    double area = simpson(sin, 0.0, pi, 256);
    double p = simpson(quarter_circle, 0.0, 1.0, 256);
    printf("%.8f %.8f\\n", area, p);
    return 0;
}`,
          out: "   n  trapezoid error  Simpson error\n   4  0.1038811021     0.0045597550\n  16  0.0064296562     0.0000165910\n  64  0.0004016114     0.0000000645\n2.00000000 3.14159265",
        },
        {
          p: "Fortran can't pass the generic <code>sin</code> intrinsic as an argument, so a small <code>sine</code> function wraps it. <code>i * h</code> mixes an integer and a real, and Fortran converts the integer first, just as C and Python do.",
          lang: "fortran",
          known: [2.0, 3.141592653589793],
          impl: "integration",
          code: `program integration
  use iso_fortran_env, only: real64
  implicit none
  abstract interface
    function fn(x) result(y)
      import :: real64
      real(real64), intent(in) :: x
      real(real64) :: y
    end function fn
  end interface
  real(real64), parameter :: pi = acos(-1.0_real64)
  integer, parameter :: sizes(3) = [4, 16, 64]
  real(real64) :: t, s
  integer :: k

  print '(a)', '   n  trapezoid error  Simpson error'
  do k = 1, 3
    t = abs(trapezoid(sine, 0.0_real64, pi, sizes(k)) - 2)
    s = abs(simpson(sine, 0.0_real64, pi, sizes(k)) - 2)
    print '(i4, 2x, f12.10, 5x, f12.10)', sizes(k), t, s
  end do
  print '(f10.8, 1x, f10.8)', simpson(sine, 0.0_real64, pi, 256), &
                              simpson(quarter_circle, 0.0_real64, 1.0_real64, 256)
contains
  function trapezoid(f, a, b, n) result(total)
    procedure(fn) :: f
    real(real64), intent(in) :: a, b
    integer, intent(in) :: n
    real(real64) :: h, total
    integer :: i
    h = (b - a) / n
    total = (f(a) + f(b)) / 2
    do i = 1, n - 1
      total = total + f(a + i * h)
    end do
    total = total * h
  end function trapezoid

  function simpson(f, a, b, n) result(total)   ! n must be even
    procedure(fn) :: f
    real(real64), intent(in) :: a, b
    integer, intent(in) :: n
    real(real64) :: h, total
    integer :: i, weight
    h = (b - a) / n
    total = f(a) + f(b)
    do i = 1, n - 1
      if (mod(i, 2) == 1) then
        weight = 4
      else
        weight = 2
      end if
      total = total + weight * f(a + i * h)
    end do
    total = total * h / 3
  end function simpson

  function sine(x) result(y)
    real(real64), intent(in) :: x
    real(real64) :: y
    y = sin(x)
  end function sine

  function quarter_circle(x) result(y)
    real(real64), intent(in) :: x
    real(real64) :: y
    y = 4 / (1 + x * x)
  end function quarter_circle
end program integration`,
          out: "   n  trapezoid error  Simpson error\n   4  0.1038811021     0.0045597550\n  16  0.0064296562     0.0000165910\n  64  0.0004016114     0.0000000645\n2.00000000 3.14159265",
        },
        {
          h: "Choosing n",
          p: "In practice you rarely know the error in advance. A common approach is to double <i>n</i> until two answers agree to the accuracy you need; with the trapezoid rule, each doubling can reuse every point already computed. Both rules assume a smooth function: a corner, a jump or an infinite value inside the interval spoils the error estimates, and the interval should be split at that point.",
        },
      ],
      practice: [
        { q: "With the trapezoid rule, you double the number of slices. Roughly what happens to the error?", options: ["It becomes about 4 times smaller", "It halves", "It becomes about 16 times smaller", "It stays the same"], answer: "It becomes about 4 times smaller", why: "The trapezoid error shrinks like h², and halving h divides h² by 4." },
        { q: "What weights does Simpson's rule give the points, before multiplying by h/3?", options: ["1, 4, 2, 4, …, 2, 4, 1", "1, 2, 2, …, 2, 1", "1, 1, 1, …, 1", "4, 1, 4, …, 1, 4"], answer: "1, 4, 2, 4, …, 2, 4, 1", why: "Each parabola over two slices weighs its ends 1 and its middle 4. Neighbouring parabolas share an end, which gives the inner 2s." },
        { q: "Why does Simpson's rule need an even number of slices?", options: ["Each parabola covers two slices", "It divides by n", "Odd numbers give negative weights", "It doesn't; any n works"], answer: "Each parabola covers two slices", why: "The slices are taken in pairs, one parabola per pair, so they must pair up exactly." },
        { kind: "output", lang: "python", q: "The trapezoid rule with one slice on f(x) = x² from 0 to 2. What does it print?", code: `f = lambda x: x * x
a, b = 0.0, 2.0
print((b - a) * (f(a) + f(b)) / 2)`, options: ["4.0", "2.6666666666666665", "8.0", "2.0"], answer: "4.0", why: "One trapezoid: width 2 times the average of f(0) = 0 and f(2) = 4. The true area is 8/3, so one slice overshoots badly." },
      ],
    },
  ],
};
