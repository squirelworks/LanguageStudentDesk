// Topology course for the Math Learner. Written for this project.
// Schema: see data/arithmetic.js.
window.MATH = window.MATH || {};
window.MATH.topology = {
  id: "topology",
  name: "Topology",
  title: "Topology intuition",
  intro:
    "Topology studies shapes up to continuous deformation — stretching and bending without tearing or gluing. These lessons build intuition for open and closed sets, continuity, homeomorphisms, connectedness and compactness, with examples on the real line and the circle. The tone is conceptual: enough precision to be honest, without a full axiomatic course.",
  lessons: [
    {
      id: "open-closed",
      title: "Open and closed sets",
      summary: "Neighbourhoods on the line; interiors, boundaries and complements.",
      sections: [
        {
          p: "On the real line R, an <b>open interval</b> (a,b) does not include its endpoints. A set U ⊆ R is <b>open</b> if every point of U has some open interval around it still inside U. Open sets are unions of open intervals.",
        },
        {
          h: "Closed sets",
          p: "A set is <b>closed</b> if its complement is open. Closed intervals [a,b] include endpoints. Finite sets of points are closed in R. Being closed is not the opposite of “not open”: [0,1) is neither open nor closed in R.",
        },
        {
          h: "Boundary intuition",
          p: "The boundary of [0,1] is {0,1}. Interior points have a whole interval of neighbours inside the set; boundary points do not.",
          code: "Open: (0,1), (0,∞), empty set, R\nClosed: [0,1], {0}, empty set, R\nNeither: [0,1)",
        },
        {
          h: "Both empty and R",
          p: "In R (usual topology), ∅ and R are both open and closed (“clopen”). That is allowed by the definitions.",
        },
      ],
      practice: [
        { q: "Is (0,1) open in R?", options: ["Yes", "No", "Only at 0.5", "Only if closed too"], answer: "Yes", why: "Open interval; every point has a subinterval inside." },
        { q: "Is [0,1] closed in R?", options: ["Yes", "No", "Neither", "Only open"], answer: "Yes", why: "Complement (−∞,0)∪(1,∞) is open." },
        { q: "[0,1) in R is:", options: ["Neither open nor closed", "Open", "Closed", "Clopen"], answer: "Neither open nor closed", why: "0 blocks openness; 1 missing blocks closedness." },
        { q: "Boundary of [0,1] is:", options: ["{0,1}", "(0,1)", "∅", "R"], answer: "{0,1}", why: "Endpoints." },
        { q: "In R, the empty set is:", options: ["Both open and closed", "Only open", "Only closed", "Neither"], answer: "Both open and closed", why: "Complement R is open; empty is open by convention/definition." },
        { q: "An interior point of a set has:", options: ["A neighbourhood inside the set", "Only boundary neighbours", "No neighbours", "Infinite complement"], answer: "A neighbourhood inside the set", why: "Interior definition." },
      ],
    },
    {
      id: "continuity",
      title: "Continuity",
      summary: "No jumps: ε–δ idea and preimages of open sets.",
      sections: [
        {
          p: "A function f: R → R is <b>continuous at a</b> if values f(x) stay close to f(a) whenever x is close to a. Formally: for every ε > 0 there is δ > 0 so that |x−a| < δ implies |f(x)−f(a)| < ε.",
        },
        {
          h: "Pictures",
          p: "Polynomials, sin, cos, exp and rational functions on their domains (where the denominator ≠ 0) are continuous. A step function with a jump is discontinuous at the jump.",
        },
        {
          h: "Open-set view",
          p: "f is continuous (everywhere) iff for every open U in the codomain, the preimage f⁻¹(U) is open in the domain. This definition extends cleanly beyond R.",
          code: "f(x)=x² continuous on R\nf(x)=1/x continuous on R\\{0}\nstep at 0: discontinuous at 0",
        },
        {
          h: "Composition",
          p: "Composition of continuous maps is continuous. Limits and continuity match when the limit equals the function value.",
        },
      ],
      practice: [
        { q: "Continuity at a means nearby inputs give:", options: ["Nearby outputs", "Exactly f(a) only", "Infinite outputs", "Open complements"], answer: "Nearby outputs", why: "ε–δ idea." },
        { q: "Polynomials on R are:", options: ["Continuous", "Never continuous", "Only differentiable nowhere", "Only closed maps"], answer: "Continuous", why: "Standard fact." },
        { q: "f(x)=1/x is continuous on:", options: ["R excluding 0", "All of R", "Only {0}", "Empty set only"], answer: "R excluding 0", why: "Undefined at 0; continuous elsewhere." },
        { q: "Global continuity ↔ preimages of open sets are:", options: ["Open", "Closed always", "Finite", "Compact always"], answer: "Open", why: "Topological definition." },
        { q: "Composition of continuous functions is:", options: ["Continuous", "Discontinuous", "Open only", "Constant"], answer: "Continuous", why: "Closure under composition." },
        { q: "A jump discontinuity means at that point:", options: ["Left/right limits disagree or miss f(a)", "f is differentiable", "f is constant", "Domain is empty"], answer: "Left/right limits disagree or miss f(a)", why: "Classic failure of continuity." },
        { q: "If lim x→a f(x) = f(a), then f is:", options: ["Continuous at a", "Open at a", "Compact at a", "Homeomorphic at a"], answer: "Continuous at a", why: "Limit characterisation." },
      ],
    },
    {
      id: "homeomorphism",
      title: "Homeomorphism idea",
      summary: "Continuous bijections with continuous inverse — “same shape” topologically.",
      sections: [
        {
          p: "A <b>homeomorphism</b> is a continuous bijection f: X → Y whose inverse is also continuous. If one exists, X and Y are <b>homeomorphic</b>: topologically the same for the purposes of continuous deformation.",
        },
        {
          h: "Rubber-sheet slogan",
          p: "You may stretch, bend and reshape, but not cut, tear or glue distant points together. A coffee cup and a doughnut (solid torus) are the classic cartoon — one hole each.",
        },
        {
          h: "Examples on the line",
          p: "(0,1) is homeomorphic to R (e.g. via tan stretched, or x ↦ (2x−1)/(x(x−1)) variants). [0,1] is <b>not</b> homeomorphic to (0,1): endpoints behave differently (removing an endpoint from [0,1] can leave a connected set; removing a point from (0,1) always splits it).",
          code: "(0,1) ~ R  (homeomorphic)\n[0,1] not ~ (0,1)\nCircle S¹ not ~ R",
        },
        {
          h: "Invariants",
          p: "Properties preserved by homeomorphism are <b>topological invariants</b>: connectedness, compactness, “number of pieces,” presence of a hole (informally). If an invariant differs, spaces are not homeomorphic.",
        },
      ],
      practice: [
        { q: "A homeomorphism is a continuous bijection with:", options: ["Continuous inverse", "Linear inverse only", "No inverse", "Constant inverse"], answer: "Continuous inverse", why: "Definition." },
        { q: "(0,1) and R are:", options: ["Homeomorphic", "Never related", "The same set", "Both compact"], answer: "Homeomorphic", why: "Standard example." },
        { q: "[0,1] and (0,1) are:", options: ["Not homeomorphic", "Homeomorphic", "Equal", "Both open in R"], answer: "Not homeomorphic", why: "Endpoint / cut-point behaviour differs." },
        { q: "Homeomorphisms preserve:", options: ["Topological invariants", "Exact distances always", "Straightness of lines", "Polynomial degree"], answer: "Topological invariants", why: "That is their point." },
        { q: "Cutting a space typically:", options: ["Breaks a homeomorphism type", "Is always allowed", "Preserves all invariants", "Creates linearity"], answer: "Breaks a homeomorphism type", why: "Tearing is not a homeomorphism." },
        { q: "The circle S¹ is homeomorphic to R?", options: ["No", "Yes", "Only in 3D", "Only if open"], answer: "No", why: "Removing a point from S¹ leaves it connected; from R does not." },
      ],
    },
    {
      id: "connectedness",
      title: "Connectedness",
      summary: "One piece versus many; intervals on R.",
      sections: [
        {
          p: "A space is <b>connected</b> if it is not the union of two disjoint nonempty open (in the subspace) sets that cover it — informally, it comes in one piece. On R, the connected subsets are exactly the intervals (including rays, points, R itself).",
        },
        {
          h: "Examples",
          p: "[0,1] connected; (0,1)∪(2,3) disconnected. The circle is connected. Q (rationals) as a subspace of R is totally disconnected in a strong sense: between any two rationals sits an irrational cut.",
        },
        {
          h: "Continuous images",
          p: "Continuous image of a connected set is connected. Intermediate Value Theorem is the special case for f: [a,b] → R: the image is an interval, so every intermediate value is hit.",
          code: "IVT: f continuous on [a,b], f(a)<L<f(b)\n⇒ some c with f(c)=L",
        },
        {
          h: "Path-connectedness",
          p: "Stronger notion: any two points joined by a continuous path. Open disks in R² are path-connected. Path-connected ⇒ connected; converse can fail in exotic spaces, but for open sets in Rⁿ they agree.",
        },
      ],
      practice: [
        { q: "Connected subsets of R are:", options: ["Intervals", "Only open intervals", "Only finite sets", "Only Q"], answer: "Intervals", why: "Classification on the line." },
        { q: "(0,1)∪(2,3) is:", options: ["Disconnected", "Connected", "Compact", "A singleton"], answer: "Disconnected", why: "Two separate pieces." },
        { q: "Continuous image of a connected set is:", options: ["Connected", "Disconnected", "Finite", "Open always"], answer: "Connected", why: "Preservation theorem." },
        { q: "IVT uses connectedness of:", options: ["[a,b] and its image interval", "Only open covers", "Eigenvalues", "Matrices"], answer: "[a,b] and its image interval", why: "Image of connected is connected." },
        { q: "Path-connected implies:", options: ["Connected", "Compact", "Discrete", "Finite"], answer: "Connected", why: "Paths glue the space into one piece." },
        { q: "The circle S¹ is:", options: ["Connected", "Disconnected", "A pair of points only", "Empty"], answer: "Connected", why: "One piece; path-connected even." },
      ],
    },
    {
      id: "compactness",
      title: "Compactness intuition",
      summary: "Closed and bounded in Rⁿ; open covers and finite subcovers.",
      sections: [
        {
          p: "Compactness is a finiteness property for infinite spaces. In Rⁿ with the usual metric, Heine–Borel says: a set is <b>compact</b> iff it is closed and bounded. So [0,1] is compact; (0,1) is not (not closed); Z is not (not bounded).",
        },
        {
          h: "Open cover definition",
          p: "A collection of open sets covers K if their union contains K. K is compact if every open cover has a <b>finite</b> subcover. Intuition: infinitely many opens are never all needed; finitely many always suffice.",
        },
        {
          h: "Why (0,1) fails",
          p: "Cover (0,1) by (1/(n+1), 1−1/(n+1)) for n = 1,2,… — or simpler: unions of (1/n, 1). No finite subcollection reaches down to 0’s neighbourhood inside (0,1).",
          code: "Compact in R: [0,1], finite sets, empty set\nNot compact: (0,1), R, [0,∞), Q∩[0,1]",
        },
        {
          h: "Useful consequences",
          p: "Continuous image of a compact set is compact. Continuous f: [a,b] → R attains max and min (Extreme Value Theorem). Compact + Hausdorff ⇒ closed.",
        },
      ],
      practice: [
        { q: "By Heine–Borel in Rⁿ, compact ↔", options: ["Closed and bounded", "Open and bounded", "Only bounded", "Only closed"], answer: "Closed and bounded", why: "Heine–Borel." },
        { q: "Is [0,1] compact in R?", options: ["Yes", "No", "Only open", "Only if discrete"], answer: "Yes", why: "Closed and bounded." },
        { q: "Is (0,1) compact in R?", options: ["No", "Yes", "Only at rationals", "Yes iff closed"], answer: "No", why: "Not closed / open-cover failure." },
        { q: "Compactness via covers: every open cover has a:", options: ["Finite subcover", "Countable complement", "Unique maximum", "Metric"], answer: "Finite subcover", why: "Definition." },
        { q: "Extreme Value Theorem needs domain:", options: ["Compact (e.g. [a,b])", "Only open", "Only Q", "Empty"], answer: "Compact (e.g. [a,b])", why: "Continuous image compact ⇒ attains bounds in R." },
        { q: "Continuous image of a compact set is:", options: ["Compact", "Always open", "Always disconnected", "Unbounded always"], answer: "Compact", why: "Preservation." },
        { q: "Z ⊆ R is not compact because it is not:", options: ["Bounded", "Closed", "Discrete", "Countable"], answer: "Bounded", why: "Closed but unbounded." },
      ],
    },
    {
      id: "circle",
      title: "The circle",
      summary: "S¹ as a compact connected space; loops and cutting points.",
      sections: [
        {
          p: "The circle S¹ = {(x,y): x² + y² = 1} (or R/Z, angles mod 2π) is the simplest space with a hole. It is compact, connected and path-connected.",
        },
        {
          h: "Not a line",
          p: "Remove one point from S¹: what remains is homeomorphic to an open interval — still connected. Remove one point from R: two rays, disconnected. So S¹ ≇ R.",
        },
        {
          h: "Winding",
          p: "A loop on the circle can wind around the hole n times (integer winding number). You cannot continuously shrink a loop that winds once to a point while staying on the circle — informal hint of fundamental group π₁(S¹) ≅ Z.",
        },
        {
          h: "Maps from the circle",
          p: "Continuous f: S¹ → R must attain max/min and cannot be bijective onto R (compact image in R is closed and bounded). Continuous f: S¹ → S¹ can be classified up to homotopy by degree (winding).",
        },
      ],
      practice: [
        { q: "S¹ is:", options: ["Compact and connected", "Neither compact nor connected", "Only discrete", "Homeomorphic to R"], answer: "Compact and connected", why: "Closed bounded in R²; one piece." },
        { q: "S¹ minus one point is:", options: ["Connected", "Two components", "Empty", "Compact and equal to S¹"], answer: "Connected", why: "Like an open interval." },
        { q: "R minus one point is:", options: ["Disconnected", "Connected", "Compact", "A circle"], answer: "Disconnected", why: "Two rays." },
        { q: "A continuous bijection S¹ → R:", options: ["Cannot exist", "Always exists", "Exists iff linear", "Exists via tan only"], answer: "Cannot exist", why: "Compact image would be compact in R; R is not." },
        { q: "Winding number around the hole is valued in:", options: ["Integers (informally)", "Only {0}", "R only", "Matrices"], answer: "Integers (informally)", why: "How many times a loop wraps." },
        { q: "S¹ as angles is often written:", options: ["R / 2πZ (or R/Z)", "Only [0,1]", "Q", "Empty set"], answer: "R / 2πZ (or R/Z)", why: "Identify angles differing by full turns." },
      ],
    },
    {
      id: "examples-r",
      title: "More examples on R",
      summary: "Subspaces, relative topology and quick classification drills.",
      sections: [
        {
          p: "A subset A ⊆ R inherits a <b>subspace topology</b>: opens in A are intersections of opens in R with A. So (0,1] is open as a subset of (0,1]? — actually (0,1] is open in itself as a whole space, but as a subset of R it is neither open nor closed. Context matters.",
        },
        {
          h: "Relative open",
          p: "In A = [0,1], the set [0,1/2) is open in A (relative to A) because it is (−1/2, 1/2) ∩ A, even though it is not open in R.",
          code: "In R: [0,½) neither open nor closed\nIn [0,1]: [0,½) is relatively open",
        },
        {
          h: "Quick invariants on subsets of R",
          p: "Ask: connected? (interval?) compact? (closed and bounded?) homeomorphic to which model interval? Endpoints and whether the set is open/closed in R are the usual clues.",
        },
        {
          h: "Takeaway",
          p: "Topology tracks qualitative shape: pieces, holes, boundaries and finiteness of covers — not exact distances. Once those words feel natural on R and S¹, the same vocabulary applies to surfaces, knots and data-shape ideas later.",
        },
      ],
      practice: [
        { q: "Opens in a subspace A ⊆ R are:", options: ["U ∩ A for U open in R", "Only open intervals in R", "Only closed sets", "Only finite sets"], answer: "U ∩ A for U open in R", why: "Subspace topology." },
        { q: "In [0,1], is [0,1/2) relatively open?", options: ["Yes", "No", "Only if compact", "Only in Q"], answer: "Yes", why: "Intersection of an open interval with [0,1]." },
        { q: "Compact connected subsets of R are:", options: ["Closed bounded intervals", "Only open intervals", "Only Z", "All subsets"], answer: "Closed bounded intervals", why: "Connected ⇒ interval; compact ⇒ closed bounded." },
        { q: "Topology cares most about:", options: ["Qualitative shape under continuous deformation", "Exact centimetres only", "Only algebra", "Only matrices"], answer: "Qualitative shape under continuous deformation", why: "Course theme." },
        { q: "As a subset of R, (0,1] is:", options: ["Neither open nor closed", "Open", "Closed", "Compact"], answer: "Neither open nor closed", why: "Missing 0 for closed; includes 1 for not open." },
        { q: "Homeomorphic classification of intervals depends on:", options: ["Endpoints / open vs closed type", "Only length", "Only midpoint", "Prime factors"], answer: "Endpoints / open vs closed type", why: "(0,1), [0,1], [0,1) are different types." },
      ],
    },
  ],
};
