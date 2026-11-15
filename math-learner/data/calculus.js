// Calculus course for the Math Learner. Written for this project.
// Schema: see data/arithmetic.js.
window.MATH = window.MATH || {};
window.MATH.calculus = {
  id: "calculus",
  name: "Calculus",
  title: "Calculus intuition",
  intro:
    "Calculus studies change and accumulation. Limits make precise what happens as you zoom in; derivatives measure instantaneous rate of change; integrals add up infinitely many small pieces. These lessons build intuition and the core rules — product, chain, and the Fundamental Theorem — with simple techniques for everyday problems. Algebra fluency with functions and graphs is assumed.",
  lessons: [
    {
      id: "limits",
      title: "Limits intuition",
      summary: "What value a function approaches as the input approaches a point.",
      sections: [
        {
          p: "The limit lim<sub>x→a</sub> f(x) = L means: as x gets arbitrarily close to a (from either side, in the two-sided limit), f(x) gets arbitrarily close to L. The function need not equal L at a — or even be defined there.",
        },
        {
          h: "A classic",
          p: "f(x) = (x² − 1)/(x − 1) is undefined at x = 1, but for x ≠ 1 it equals x + 1. So lim<sub>x→1</sub> f(x) = 2.",
          code: "(x² − 1)/(x − 1) = x + 1  for x ≠ 1\nlim x→1 = 2",
        },
        {
          h: "One-sided limits",
          p: "Left-hand lim<sub>x→a−</sub> and right-hand lim<sub>x→a+</sub> may differ (jump). The two-sided limit exists only when both exist and agree.",
        },
        {
          h: "Infinity",
          p: "lim<sub>x→∞</sub> 1/x = 0: values approach 0 as x grows without bound. Vertical asymptotes often mean a limit is infinite (grows without bound), which is a useful description even though ∞ is not a real number.",
        },
      ],
      practice: [
        { q: "lim x→1 of (x²−1)/(x−1) =", options: ["2", "0", "1", "Undefined as a limit"], answer: "2", why: "Simplifies to x+1 → 2." },
        { q: "For a two-sided limit to exist, left and right limits must:", options: ["Exist and be equal", "Both be infinite", "Equal f(a)", "Be undefined"], answer: "Exist and be equal", why: "Definition of two-sided limit." },
        { q: "lim x→∞ of 1/x =", options: ["0", "1", "∞", "−1"], answer: "0", why: "Values shrink toward 0." },
        { q: "If lim x→a f(x) = L, must f(a) = L?", options: ["No", "Yes always", "Only if L=0", "Only for polynomials"], answer: "No", why: "Limit cares about nearby values, not necessarily the point itself." },
        { q: "A jump discontinuity typically means:", options: ["Left and right limits differ", "The function is infinite", "No asymptote", "f is constant"], answer: "Left and right limits differ", why: "Classic jump picture." },
        { q: "lim x→0 of x² =", options: ["0", "1", "Does not exist", "∞"], answer: "0", why: "Continuous polynomial; value and limit agree." },
      ],
    },
    {
      id: "derivative-idea",
      title: "The derivative idea",
      summary: "Instantaneous rate of change as a limit of slopes.",
      sections: [
        {
          p: "Average rate of change of f from a to a+h is [f(a+h) − f(a)] / h — the slope of a secant. The <b>derivative</b> f′(a) is the limit of that quotient as h → 0: slope of the tangent line, when the limit exists.",
        },
        {
          h: "Definition",
          code: "f′(a) = lim h→0 [f(a+h) − f(a)] / h",
        },
        {
          h: "Example",
          p: "For f(x) = x² at a = 3: [ (3+h)² − 9 ] / h = [9 + 6h + h² − 9]/h = 6 + h → 6. So f′(3) = 6. In general (x²)′ = 2x.",
          code: "f(x)=x²\n[f(3+h)−f(3)]/h = 6 + h → 6",
        },
        {
          h: "Units and meaning",
          p: "If f is position (meters) and x is time (seconds), f′ is velocity (m/s). If f is cost and x is items, f′ is marginal cost.",
        },
      ],
      practice: [
        { q: "The difference quotient [f(a+h)−f(a)]/h is the slope of a:", options: ["Secant line", "Tangent only", "Vertical line", "Normal vector"], answer: "Secant line", why: "Two points on the curve." },
        { q: "f′(a) is the limit of that quotient as:", options: ["h → 0", "h → ∞", "a → 0", "f → 0"], answer: "h → 0", why: "Zoom to instantaneous slope." },
        { q: "For f(x)=x², f′(3) =", options: ["6", "9", "3", "2"], answer: "6", why: "2x at x=3." },
        { q: "If s(t) is position, s′(t) is:", options: ["Velocity", "Acceleration only", "Distance total", "Jerk"], answer: "Velocity", why: "Rate of change of position." },
        { q: "If the limit defining f′(a) fails to exist, then at a:", options: ["f is not differentiable", "f cannot be continuous", "f is zero", "f has a root"], answer: "f is not differentiable", why: "Definition fails." },
        { q: "(x²)′ as a function equals:", options: ["2x", "x", "2", "x²"], answer: "2x", why: "Power rule preview / calculation." },
        { q: "A horizontal tangent means f′(a) =", options: ["0", "1", "Undefined always", "∞"], answer: "0", why: "Slope zero." },
      ],
    },
    {
      id: "basic-rules",
      title: "Basic differentiation rules",
      summary: "Power, constant, sum and constant-multiple rules.",
      sections: [
        {
          p: "Once you trust the limit definition, shortcuts save time. These rules hold on intervals where the functions are differentiable.",
        },
        {
          h: "Core rules",
          code: "(c)′ = 0\n(xⁿ)′ = n xⁿ⁻¹    (n constant)\n(cf)′ = c f′\n(f+g)′ = f′ + g′\n(f−g)′ = f′ − g′",
        },
        {
          h: "Examples",
          code: "(5x³ − 2x + 7)′ = 15x² − 2\n(√x)′ = (x¹ᐟ²)′ = (1/2) x⁻¹ᐟ² = 1/(2√x)\n(1/x)′ = (x⁻¹)′ = −1/x²",
        },
        {
          h: "eˣ and ln",
          p: "(eˣ)′ = eˣ. (ln x)′ = 1/x for x > 0. These are the natural pair for growth and accumulation.",
        },
      ],
      practice: [
        { q: "(x⁵)′ =", options: ["5x⁴", "5x⁵", "x⁴", "4x⁵"], answer: "5x⁴", why: "Power rule." },
        { q: "(7)′ =", options: ["0", "7", "1", "7x"], answer: "0", why: "Constant rule." },
        { q: "(5x³ − 2x)′ =", options: ["15x² − 2", "5x² − 2", "15x² − 2x", "15x³"], answer: "15x² − 2", why: "Term by term." },
        { q: "(eˣ)′ =", options: ["eˣ", "x eˣ⁻¹", "1", "ln x"], answer: "eˣ", why: "Defining property of eˣ." },
        { q: "(ln x)′ for x>0:", options: ["1/x", "ln x", "1", "x"], answer: "1/x", why: "Standard derivative." },
        { q: "(1/x)′ =", options: ["−1/x²", "1/x²", "−1/x", "ln x"], answer: "−1/x²", why: "Power −1." },
      ],
    },
    {
      id: "product-chain",
      title: "Product and chain rules",
      summary: "Differentiating products and compositions.",
      sections: [
        {
          p: "Products and nested functions need their own rules. The product rule is not “derivative of each times each” alone — there is a cross of terms.",
        },
        {
          h: "Product rule",
          p: "(fg)′ = f′g + fg′.",
          code: "f=x², g=eˣ\n(fg)′ = 2x eˣ + x² eˣ = eˣ(2x + x²)",
        },
        {
          h: "Quotient rule (optional form)",
          p: "(f/g)′ = (f′g − fg′) / g² when g ≠ 0. Same idea as product with g⁻¹.",
        },
        {
          h: "Chain rule",
          p: "If y = f(u) and u = g(x), then dy/dx = f′(u) · g′(x). “Outer derivative evaluated inside, times inner derivative.”",
          code: "y = (3x+1)⁵\ndy/dx = 5(3x+1)⁴ · 3 = 15(3x+1)⁴\n\ny = sin(x²) → cos(x²)·2x",
        },
      ],
      practice: [
        { q: "(fg)′ equals:", options: ["f′g + fg′", "f′g′", "f+g", "f′/g′"], answer: "f′g + fg′", why: "Product rule." },
        { q: "Derivative of (3x+1)⁵:", options: ["15(3x+1)⁴", "5(3x+1)⁴", "5(3x+1)⁵", "3(3x+1)⁴"], answer: "15(3x+1)⁴", why: "Chain: 5( )⁴ × 3." },
        { q: "d/dx sin(x²) =", options: ["2x cos(x²)", "cos(x²)", "cos(2x)", "2x sin(x²)"], answer: "2x cos(x²)", why: "Outer cos, inner 2x." },
        { q: "d/dx [x² eˣ] =", options: ["eˣ(2x + x²)", "2x eˣ", "x² eˣ", "2x + eˣ"], answer: "eˣ(2x + x²)", why: "Product rule." },
        { q: "Chain rule differentiates:", options: ["Compositions", "Only sums", "Only constants", "Integrals only"], answer: "Compositions", why: "f(g(x))." },
        { q: "(f/g)′ numerator is:", options: ["f′g − fg′", "f′g + fg′", "f′g′", "fg"], answer: "f′g − fg′", why: "Quotient rule." },
        { q: "d/dx cos(5x) =", options: ["−5 sin(5x)", "−sin(5x)", "5 cos(5x)", "5 sin(5x)"], answer: "−5 sin(5x)", why: "Chain with inner 5." },
      ],
    },
    {
      id: "applications",
      title: "Applications of derivatives",
      summary: "Tangents, motion, related rates sketch and max/min.",
      sections: [
        {
          p: "Derivatives answer “how fast?” and “which way is the graph bending?” They also locate candidates for maximum and minimum values.",
        },
        {
          h: "Tangent line",
          p: "At x = a, slope m = f′(a); line: y − f(a) = m(x − a).",
          code: "f(x)=x², a=3, f′(3)=6, f(3)=9\ny − 9 = 6(x − 3)",
        },
        {
          h: "Critical points",
          p: "Where f′(x) = 0 or f′ is undefined (in the domain). First or second derivative tests classify local max/min. Endpoints matter on a closed interval.",
        },
        {
          h: "Motion",
          p: "Position s(t); velocity v = s′; acceleration a = v′ = s″. Speed is |v|.",
        },
        {
          h: "Optimization sketch",
          p: "Express the quantity to optimize as a function of one variable, find critical points, compare values. Example: maximize area for fixed fence length.",
        },
      ],
      practice: [
        { q: "Tangent slope to y=f(x) at a is:", options: ["f′(a)", "f(a)", "f″(a)", "a"], answer: "f′(a)", why: "Definition." },
        { q: "For f(x)=x² at x=3, tangent slope is:", options: ["6", "9", "3", "2"], answer: "6", why: "f′=2x." },
        { q: "If s is position, acceleration is:", options: ["s″", "s′", "s", "|s′|"], answer: "s″", why: "Derivative of velocity." },
        { q: "A critical point in the domain can occur where:", options: ["f′=0 or f′ undefined", "f=0 only", "f″=1", "x→∞"], answer: "f′=0 or f′ undefined", why: "Standard definition." },
        { q: "Speed equals:", options: ["|velocity|", "velocity", "acceleration", "position"], answer: "|velocity|", why: "Nonnegative magnitude." },
        { q: "On a closed interval, extrema of a continuous f occur at:", options: ["Critical points or endpoints", "Only where f′>0", "Only asymptotes", "Inflection only"], answer: "Critical points or endpoints", why: "Extreme value theorem strategy." },
      ],
    },
    {
      id: "integrals-area",
      title: "Integrals as area",
      summary: "Riemann sums and the definite integral as net signed area.",
      sections: [
        {
          p: "To approximate the area under y = f(x) from x = a to x = b, slice [a,b] into n strips, form rectangles of height f(at a sample point) and width Δx, and add. As n → ∞ and Δx → 0, the sum approaches the <b>definite integral</b> ∫<sub>a</sub><sup>b</sup> f(x) dx when f is nice enough.",
        },
        {
          h: "Signed area",
          p: "Above the x-axis contributes positively; below, negatively. Net integral can be zero even when geometric area is not.",
        },
        {
          h: "Notation",
          code: "∫_a^b f(x) dx\na = lower limit, b = upper limit\nf(x) = integrand",
        },
        {
          h: "Simple exact areas",
          p: "Under y = 1 from 0 to 2: area 2. Under y = x from 0 to 2: triangle area (1/2)×2×2 = 2. Under y = x² the exact value needs antiderivatives (next lessons).",
        },
      ],
      practice: [
        { q: "A Riemann sum approximates area with:", options: ["Rectangles (or similar strips)", "Only circles", "Tangents", "Factorials"], answer: "Rectangles (or similar strips)", why: "Classic construction." },
        { q: "∫ from 0 to 2 of 1 dx equals:", options: ["2", "1", "0", "1/2"], answer: "2", why: "Width 2, height 1." },
        { q: "∫ from 0 to 2 of x dx equals:", options: ["2", "4", "1", "0"], answer: "2", why: "Triangle area 2." },
        { q: "Region below the x-axis contributes:", options: ["Negative signed area", "Positive always", "Zero", "Complex values"], answer: "Negative signed area", why: "Signed area convention." },
        { q: "In ∫_a^b f(x) dx, a is the:", options: ["Lower limit", "Upper limit", "Integrand", "Variable only"], answer: "Lower limit", why: "Notation." },
        { q: "As n→∞ in a regular partition, Δx typically:", options: ["→ 0", "→ ∞", "Stays 1", "Equals n"], answer: "→ 0", why: "Mesh of partition goes to zero." },
        { q: "Net integral of an odd function over [−a,a] (integrable) is often:", options: ["0", "2a", "a²", "Undefined always"], answer: "0", why: "Symmetric cancellation." },
      ],
    },
    {
      id: "ftc",
      title: "Fundamental Theorem intuition",
      summary: "Derivatives and integrals undo each other.",
      sections: [
        {
          p: "The <b>Fundamental Theorem of Calculus (FTC)</b> links the two halves of calculus. If F′ = f, then ∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a). Accumulation from a to b is the net change of an antiderivative.",
        },
        {
          h: "Antiderivative",
          p: "F is an antiderivative of f when F′ = f. Antiderivatives differ by a constant: if F works, so does F + C.",
          code: "f(x)=2x → F(x)=x² + C\n∫_1^3 2x dx = 3² − 1² = 9−1 = 8",
        },
        {
          h: "Other half",
          p: "d/dx ∫<sub>a</sub><sup>x</sup> f(t) dt = f(x) (for continuous f). The derivative of “area so far” recovers the height.",
        },
        {
          h: "Indefinite integral",
          p: "∫ f(x) dx = F(x) + C denotes the family of antiderivatives. The +C matters until limits fix the constant.",
        },
      ],
      practice: [
        { q: "If F′=f, then ∫_a^b f =", options: ["F(b)−F(a)", "F(a)−F(b)", "F(a)+F(b)", "F′(b)"], answer: "F(b)−F(a)", why: "FTC evaluation." },
        { q: "∫_1^3 2x dx =", options: ["8", "6", "9", "4"], answer: "8", why: "x² from 1 to 3: 9−1." },
        { q: "An antiderivative of 2x is:", options: ["x² + C", "2 + C", "x + C", "2x² + C"], answer: "x² + C", why: "Derivative of x² is 2x." },
        { q: "d/dx ∫_a^x f(t) dt =", options: ["f(x)", "f(a)", "F(x)", "0"], answer: "f(x)", why: "FTC part 1." },
        { q: "Why write +C for indefinite integrals?", options: ["Antiderivatives differ by a constant", "To cancel errors", "Units only", "FTC forbids it"], answer: "Antiderivatives differ by a constant", why: "Constants differentiate to 0." },
        { q: "∫ 0 dx =", options: ["C", "0 only", "x", "1"], answer: "C", why: "Family of constant functions." },
      ],
    },
    {
      id: "techniques",
      title: "Simple integration techniques",
      summary: "Power rule reverse, substitution hint and splitting sums.",
      sections: [
        {
          p: "Many integrals reduce to reversing differentiation rules. Start with linearity and the power rule; use substitution when a chain-rule pattern appears.",
        },
        {
          h: "Power rule reverse",
          code: "∫ xⁿ dx = xⁿ⁺¹/(n+1) + C   (n ≠ −1)\n∫ x⁻¹ dx = ln|x| + C\n∫ eˣ dx = eˣ + C",
        },
        {
          h: "Linearity",
          p: "∫ (af + bg) = a∫f + b∫g. Split sums and pull out constants before integrating term by term.",
          code: "∫ (3x² − 4x + 1) dx = x³ − 2x² + x + C",
        },
        {
          h: "Substitution (u-sub) sketch",
          p: "If you see f′(g(x)) g′(x), set u = g(x), du = g′(x) dx. Example: ∫ 2x cos(x²) dx; u = x², du = 2x dx → ∫ cos u du = sin(x²) + C.",
          code: "∫ 2x cos(x²) dx\nu = x², du = 2x dx\n→ sin(x²) + C",
        },
      ],
      practice: [
        { q: "∫ x³ dx =", options: ["x⁴/4 + C", "3x² + C", "x⁴ + C", "4x³ + C"], answer: "x⁴/4 + C", why: "Power rule reverse." },
        { q: "∫ (1/x) dx =", options: ["ln|x| + C", "1/x² + C", "x ln x", "−1/x² + C"], answer: "ln|x| + C", why: "Exception n=−1." },
        { q: "∫ (3x² − 4x) dx =", options: ["x³ − 2x² + C", "6x − 4 + C", "3x³ − 4x² + C", "x³ − 4x + C"], answer: "x³ − 2x² + C", why: "Term by term." },
        { q: "∫ 2x cos(x²) dx =", options: ["sin(x²) + C", "cos(x²) + C", "2sin(x²)+C", "−sin(x²)+C"], answer: "sin(x²) + C", why: "u=x² substitution." },
        { q: "∫ eˣ dx =", options: ["eˣ + C", "x eˣ + C", "eˣ / x + C", "ln|eˣ| + C"], answer: "eˣ + C", why: "Derivative of eˣ is itself." },
        { q: "Substitution undoes which differentiation rule?", options: ["Chain rule", "Product rule only", "Constant rule only", "FTC only"], answer: "Chain rule", why: "u-sub matches compositions." },
        { q: "∫ 5 dx =", options: ["5x + C", "5 + C", "x⁵ + C", "0"], answer: "5x + C", why: "Constant integrand." },
      ],
    },
  ],
};
