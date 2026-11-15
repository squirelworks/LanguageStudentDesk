// Linear algebra course for the Math Learner. Written for this project.
// Schema: see data/arithmetic.js. File id uses a hyphen: window.MATH["linear-algebra"].
window.MATH = window.MATH || {};
window.MATH["linear-algebra"] = {
  id: "linear-algebra",
  name: "Linear algebra",
  title: "Linear algebra essentials",
  intro:
    "Linear algebra studies vectors, matrices and linear maps — the language of systems of equations, computer graphics, data and much of advanced maths. These lessons build intuition for vectors and matrices, solving Ax = b, determinants, eigenvalues and what a linear transformation does to space. Comfort with high-school algebra is enough to begin.",
  lessons: [
    {
      id: "vectors",
      title: "Vectors",
      summary: "Arrows and lists of numbers; addition and scalar multiplication.",
      sections: [
        {
          p: "A <b>vector</b> in the plane or space can be drawn as an arrow and written as a column (or row) of components. In R², v = ⟨v₁, v₂⟩. Two vectors are equal when corresponding components match; position of the arrow can slide (free vector).",
        },
        {
          h: "Addition and scaling",
          p: "Add componentwise; scale by multiplying each component. Geometrically, addition is tip-to-tail; scaling stretches or flips.",
          code: "⟨1, 2⟩ + ⟨3, −1⟩ = ⟨4, 1⟩\n3⟨1, 2⟩ = ⟨3, 6⟩\n−⟨1, 2⟩ = ⟨−1, −2⟩",
        },
        {
          h: "Zero and length",
          p: "The zero vector 0 has all components 0. Length (Euclidean norm) ‖v‖ = √(v₁² + v₂² + …). A <b>unit vector</b> has length 1.",
        },
        {
          h: "Dot product",
          p: "u · v = u₁v₁ + u₂v₂ + … = ‖u‖ ‖v‖ cos θ. Zero dot product means orthogonal (perpendicular) when neither is zero.",
          code: "⟨1, 2⟩ · ⟨2, −1⟩ = 2 − 2 = 0  → perpendicular",
        },
      ],
      practice: [
        { q: "⟨1, 2⟩ + ⟨3, −1⟩ =", options: ["⟨4, 1⟩", "⟨3, 1⟩", "⟨4, 3⟩", "⟨2, 2⟩"], answer: "⟨4, 1⟩", why: "Componentwise sum." },
        { q: "3⟨1, 2⟩ =", options: ["⟨3, 6⟩", "⟨1, 6⟩", "⟨3, 2⟩", "9"], answer: "⟨3, 6⟩", why: "Scale each component." },
        { q: "‖⟨3, 4⟩‖ =", options: ["5", "7", "12", "25"], answer: "5", why: "√(9+16)=5." },
        { q: "⟨1, 2⟩ · ⟨2, −1⟩ =", options: ["0", "4", "1", "−1"], answer: "0", why: "1·2 + 2·(−1)=0." },
        { q: "If u · v = 0 and u,v ≠ 0, they are:", options: ["Orthogonal", "Parallel always", "Equal", "Unit length"], answer: "Orthogonal", why: "Dot product zero." },
        { q: "The zero vector has length:", options: ["0", "1", "Undefined", "∞"], answer: "0", why: "All components zero." },
      ],
    },
    {
      id: "matrices",
      title: "Matrices",
      summary: "Rectangular arrays; addition, scalar mult and matrix–vector products.",
      sections: [
        {
          p: "An <b>m × n matrix</b> has m rows and n columns. Entry a<sub>ij</sub> sits in row i, column j. Matrices store linear data: coefficients of systems, pixel grids, or the action of a linear map.",
        },
        {
          h: "Addition and scalar multiplication",
          p: "Same shape required for addition: add entrywise. Scale entrywise. These match vector operations on the “big vector” of all entries.",
        },
        {
          h: "Matrix times vector",
          p: "If A is m × n and x is in Rⁿ (column), Ax is in Rᵐ. Each entry of Ax is a dot product of a row of A with x. Columns of A are the images of the standard basis vectors.",
          code: "A = [2 1; 0 3],  x = ⟨1, 4⟩\nAx = ⟨2·1+1·4, 0·1+3·4⟩ = ⟨6, 12⟩",
        },
        {
          h: "Matrix multiplication",
          p: "AB is defined when A is m × n and B is n × p; result is m × p. Entry (i,j) is row i of A dot column j of B. In general AB ≠ BA.",
          code: "[1 2; 0 1][0 1; 1 0] = [2 1; 1 0]\n(other order differs)",
        },
      ],
      practice: [
        { q: "A 2 × 3 matrix has how many columns?", options: ["3", "2", "6", "5"], answer: "3", why: "m×n → n columns." },
        { q: "For A = [2 1; 0 3] and x=⟨1,4⟩, Ax =", options: ["⟨6, 12⟩", "⟨2, 12⟩", "⟨6, 3⟩", "⟨5, 4⟩"], answer: "⟨6, 12⟩", why: "Row dots as in the example." },
        { q: "AB requires the middle dimensions to:", options: ["Match", "Both be 1", "Sum to 0", "Be square"], answer: "Match", why: "n in m×n and n×p." },
        { q: "In general AB and BA:", options: ["Need not be equal", "Always equal", "Always undefined", "Always zero"], answer: "Need not be equal", why: "Matrix mult is not commutative." },
        { q: "Columns of A are images of:", options: ["Standard basis vectors", "Only the zero vector", "Eigenvalues", "Determinants"], answer: "Standard basis vectors", why: "Aeᵢ = i-th column." },
        { q: "Scalar 2 times [1 0; 0 1] equals:", options: ["[2 0; 0 2]", "[2 2; 2 2]", "[1 0; 0 1]", "[0 0; 0 0]"], answer: "[2 0; 0 2]", why: "Scale every entry." },
        { q: "Shape of Ax when A is 3×2 and x ∈ R²:", options: ["Vector in R³", "Vector in R²", "2×3 matrix", "Scalar"], answer: "Vector in R³", why: "m×n times n-vector → m-vector." },
      ],
    },
    {
      id: "systems-axb",
      title: "Systems Ax = b",
      summary: "Linear systems as matrix equations; row reduction idea.",
      sections: [
        {
          p: "The system 2x + y = 5, x − y = 1 is Ax = b with A = [2 1; 1 −1], x = ⟨x,y⟩, b = ⟨5,1⟩. Solving the system means finding x (if any) mapped by A to b.",
        },
        {
          h: "Row operations",
          p: "Swap rows, scale a row by a nonzero constant, or add a multiple of one row to another. These do not change the solution set and lead to row-echelon or reduced row-echelon form (Gaussian / Gauss–Jordan elimination).",
          code: "2x + y = 5\nx − y = 1\n→ eliminate: e.g. add twice row2 to row1 ideas…\nSolution: x=2, y=1",
        },
        {
          h: "Solution types",
          p: "Unique solution (pivot in every variable column); infinitely many (free variables); none (inconsistent row like 0 = 1).",
        },
        {
          h: "Span and consistency",
          p: "Ax = b is solvable iff b lies in the <b>column space</b> (span of columns of A). The span of vectors is all their linear combinations.",
        },
      ],
      practice: [
        { q: "The system 2x+y=5, x−y=1 has solution:", options: ["x=2, y=1", "x=1, y=2", "x=3, y=−1", "No solution"], answer: "x=2, y=1", why: "Check: 4+1=5; 2−1=1." },
        { q: "Ax = b packs a linear system into:", options: ["One matrix equation", "Only graphs", "Determinants alone", "Eigenvalues alone"], answer: "One matrix equation", why: "Central viewpoint." },
        { q: "A row 0 = 1 after elimination means:", options: ["No solution", "Unique solution", "Free variable only", "Infinite pivots"], answer: "No solution", why: "Inconsistent." },
        { q: "Free variables typically yield:", options: ["Infinitely many solutions", "No solutions", "Exactly one", "Complex only"], answer: "Infinitely many solutions", why: "Parameter family." },
        { q: "b is in the column space of A iff:", options: ["Ax=b has a solution", "A is zero", "det A = 1 always", "b = 0"], answer: "Ax=b has a solution", why: "Definition of column space membership." },
        { q: "Allowed row operation:", options: ["Add multiple of one row to another", "Multiply a row by 0 always", "Square every entry", "Delete a pivot column"], answer: "Add multiple of one row to another", why: "Elementary row op." },
      ],
    },
    {
      id: "determinants",
      title: "Determinants",
      summary: "A number that detects invertibility and signed volume scaling.",
      sections: [
        {
          p: "For a square matrix A, the <b>determinant</b> det(A) is a scalar. Among other roles: A is invertible iff det(A) ≠ 0; |det(A)| is the factor by which A scales areas (2D) or volumes (3D).",
        },
        {
          h: "2 × 2 formula",
          code: "det[a b; c d] = ad − bc\ndet[2 1; 0 3] = 6 − 0 = 6\ndet[1 2; 2 4] = 4 − 4 = 0  (singular)",
        },
        {
          h: "Invertibility",
          p: "If det(A) ≠ 0, there is A⁻¹ with A A⁻¹ = I. For 2×2: A⁻¹ = (1/det)[d −b; −c a]. If det = 0, columns are linearly dependent and Ax = b fails for some b.",
        },
        {
          h: "Products",
          p: "det(AB) = det(A) det(B). So det(A⁻¹) = 1/det(A) when A is invertible.",
        },
      ],
      practice: [
        { q: "det[2 1; 0 3] =", options: ["6", "5", "0", "3"], answer: "6", why: "ad−bc=6−0." },
        { q: "det[1 2; 2 4] =", options: ["0", "8", "−1", "2"], answer: "0", why: "4−4=0; rows dependent." },
        { q: "A is invertible when det(A) is:", options: ["Nonzero", "Zero", "Negative only", "Equal to 1 only"], answer: "Nonzero", why: "Standard criterion." },
        { q: "det(AB) equals:", options: ["det(A) det(B)", "det(A)+det(B)", "det(A)−det(B)", "1 always"], answer: "det(A) det(B)", why: "Multiplicativity." },
        { q: "|det(A)| in 2D measures:", options: ["Area scaling factor", "Trace", "Only the slope", "Eigenvector count"], answer: "Area scaling factor", why: "Geometric meaning." },
        { q: "For invertible A, det(A⁻¹) =", options: ["1/det(A)", "det(A)", "0", "−det(A)"], answer: "1/det(A)", why: "det(A)det(A⁻¹)=det(I)=1." },
        { q: "det[I] for identity I is:", options: ["1", "0", "n", "−1"], answer: "1", why: "Product of diagonal 1s / definition." },
      ],
    },
    {
      id: "eigenvalues",
      title: "Eigenvalues intuition",
      summary: "Directions that matrices only stretch; Av = λv.",
      sections: [
        {
          p: "A nonzero vector v is an <b>eigenvector</b> of A if Av = λv for some scalar λ (the <b>eigenvalue</b>). A stretches or flips along that line without rotating it off the line.",
        },
        {
          h: "Characteristic equation",
          p: "Av = λv ⇒ (A − λI)v = 0 needs a nontrivial solution ⇒ det(A − λI) = 0. Roots λ are the eigenvalues.",
          code: "A = [2 0; 0 3]\nEigenvalues 2 and 3\nAxes e₁, e₂ are eigenvectors",
        },
        {
          h: "Why care",
          p: "Diagonalizable matrices act simply in an eigenbasis: stretch by λᵢ along each axis. Used in differential equations, PCA, vibration modes and PageRank-style ranking.",
        },
        {
          h: "Trace and det (2×2 hint)",
          p: "For 2×2, eigenvalues satisfy λ₁+λ₂ = trace(A) and λ₁λ₂ = det(A).",
        },
      ],
      practice: [
        { q: "Av = λv with v ≠ 0 means v is an:", options: ["Eigenvector", "Determinant", "Row reduced form", "Pivot"], answer: "Eigenvector", why: "Definition." },
        { q: "Eigenvalues solve:", options: ["det(A − λI)=0", "det(A)=λ", "A=λI only", "Ax=0 only"], answer: "det(A − λI)=0", why: "Characteristic equation." },
        { q: "For diag(2,3), eigenvalues are:", options: ["2 and 3", "5 and 6", "0 and 1", "2 and 2"], answer: "2 and 3", why: "Diagonal entries." },
        { q: "λ₁λ₂ for 2×2 equals:", options: ["det(A)", "trace(A)", "‖A‖", "0 always"], answer: "det(A)", why: "Product of eigenvalues." },
        { q: "λ₁+λ₂ for 2×2 equals:", options: ["trace(A)", "det(A)", "rank(A)", "1"], answer: "trace(A)", why: "Sum of eigenvalues." },
        { q: "Can v = 0 be called an eigenvector?", options: ["No", "Yes always", "Only if λ=0", "Only in 3D"], answer: "No", why: "Definition requires nonzero v." },
      ],
    },
    {
      id: "linear-maps",
      title: "Linear maps",
      summary: "Functions that preserve addition and scaling; matrices represent them.",
      sections: [
        {
          p: "A map T: Rⁿ → Rᵐ is <b>linear</b> when T(u+v) = T(u)+T(v) and T(cv) = c T(v). Equivalently T(0)=0 and T preserves all linear combinations. Every such map is multiplication by some matrix A: T(x) = Ax.",
        },
        {
          h: "Examples",
          p: "Rotations about the origin, reflections through a line through the origin, projections onto a subspace, and scalings are linear. Translations x ↦ x + b (b ≠ 0) are not linear.",
          code: "Rotation by 90° CCW in R²:\nA = [0 −1; 1 0]\n⟨1,0⟩ ↦ ⟨0,1⟩,  ⟨0,1⟩ ↦ ⟨−1,0⟩",
        },
        {
          h: "Kernel and image",
          p: "ker(T) = {x : T(x)=0} (null space of A). im(T) = column space of A. Rank–nullity: dim(ker) + dim(im) = n for T: Rⁿ → Rᵐ.",
        },
        {
          h: "Composition",
          p: "Doing S then T is matrix product (matrices for the maps, in the appropriate order). This is why AB ≠ BA can matter geometrically: rotate-then-reflect ≠ reflect-then-rotate in general.",
        },
      ],
      practice: [
        { q: "Linear maps must send 0 to:", options: ["0", "1", "Any fixed vector", "Infinity"], answer: "0", why: "T(0)=T(0+0)=T(0)+T(0)." },
        { q: "x ↦ x + ⟨1,0⟩ is:", options: ["Not linear", "Linear", "Only orthogonal", "An eigenvalue"], answer: "Not linear", why: "Translation; T(0)≠0." },
        { q: "Rotation by 90° CCW sends ⟨1,0⟩ to:", options: ["⟨0,1⟩", "⟨1,0⟩", "⟨−1,0⟩", "⟨0,−1⟩"], answer: "⟨0,1⟩", why: "Standard rotation." },
        { q: "ker(T) is where T(x) equals:", options: ["0", "1", "x", "λx always"], answer: "0", why: "Null space." },
        { q: "Every linear map Rⁿ→Rᵐ is:", options: ["Multiplication by a matrix", "A translation", "Nonlinear", "Only diagonal"], answer: "Multiplication by a matrix", why: "Representation theorem in finite dimensions." },
        { q: "Rank–nullity: dim(ker)+dim(im) =", options: ["n (domain dimension)", "m always", "det(A)", "0"], answer: "n (domain dimension)", why: "For T: Rⁿ → Rᵐ." },
        { q: "Composition of linear maps corresponds to:", options: ["Matrix multiplication", "Matrix addition", "Determinants only", "Dot products only"], answer: "Matrix multiplication", why: "T(S(x)) = A_T A_S x." },
      ],
    },
    {
      id: "independence-basis",
      title: "Independence, basis and dimension",
      summary: "When vectors are redundant; coordinate systems that fit a subspace.",
      sections: [
        {
          p: "Vectors v₁,…,vₖ are <b>linearly dependent</b> if some nontrivial combination gives 0 (one is redundant). They are <b>independent</b> if c₁v₁+…+cₖvₖ = 0 forces all cᵢ = 0.",
        },
        {
          h: "Basis",
          p: "A <b>basis</b> of a subspace V is an independent spanning set. Every vector in V has unique coordinates relative to a basis. All bases of V have the same number of vectors: the <b>dimension</b> dim(V).",
        },
        {
          h: "Standard examples",
          p: "Standard basis of R³: e₁,e₂,e₃. The plane x+y+z=0 in R³ has dimension 2. Columns of an invertible n×n matrix form a basis of Rⁿ.",
        },
        {
          h: "Test with matrices",
          p: "Columns of A are independent iff Ax = 0 has only the zero solution iff (for square A) det(A) ≠ 0.",
        },
      ],
      practice: [
        { q: "Independent vectors: only the trivial combo gives:", options: ["0", "1", "A pivot", "det=1"], answer: "0", why: "Definition of independence." },
        { q: "Dimension of R³ is:", options: ["3", "2", "1", "9"], answer: "3", why: "Three standard basis vectors." },
        { q: "A basis must:", options: ["Span and be independent", "Only be orthogonal", "Include 0", "Have det 0"], answer: "Span and be independent", why: "Definition." },
        { q: "Columns of invertible n×n A:", options: ["Form a basis of Rⁿ", "Are dependent", "Span only 0", "Number fewer than n"], answer: "Form a basis of Rⁿ", why: "Full rank." },
        { q: "If two vectors in R² are scalar multiples, they are:", options: ["Dependent", "A basis of R²", "Always orthogonal", "Unit length"], answer: "Dependent", why: "One is redundant." },
        { q: "Unique coordinates relative to a basis mean:", options: ["Each vector has one coordinate tuple", "No coordinates exist", "Infinite coords always", "Only integers allowed"], answer: "Each vector has one coordinate tuple", why: "Independence + spanning." },
      ],
    },
    {
      id: "geometry-maps",
      title: "Geometry of maps in the plane",
      summary: "Stretch, shear, rotate, reflect — reading a 2×2 matrix.",
      sections: [
        {
          p: "A 2×2 matrix is determined by where e₁ and e₂ go: those images become the columns. Watching the unit square helps you see area change (|det|) and orientation (sign of det).",
        },
        {
          h: "Gallery",
          code: "Scale: [2 0; 0 3]  stretches x by 2, y by 3\nShear: [1 1; 0 1]  pushes horizontally by y\nReflect over x-axis: [1 0; 0 −1]\nRotate θ: [cosθ −sinθ; sinθ cosθ]",
        },
        {
          h: "Singular maps",
          p: "If det = 0, the image collapses to a line or a point (lower dimension). Information is lost; you cannot invert the map.",
        },
        {
          h: "Orthogonal matrices (preview)",
          p: "Matrices with AᵀA = I represent rotations/reflections: they preserve lengths and angles. Columns are orthonormal.",
        },
      ],
      practice: [
        { q: "Columns of a 2×2 matrix are images of:", options: ["e₁ and e₂", "Only 0", "Eigenvalues", "Rows of I³"], answer: "e₁ and e₂", why: "Ae₁, Ae₂." },
        { q: "[1 1; 0 1] is a:", options: ["Shear", "Pure rotation by 90°", "Projection to 0", "Reflection over y=x only"], answer: "Shear", why: "Horizontal shear." },
        { q: "Rotation matrices have |det| =", options: ["1", "0", "2", "θ"], answer: "1", why: "Preserve area; orientation-preserving ⇒ det=1." },
        { q: "det = 0 means the map:", options: ["Collapses dimension", "Is always rotation", "Is invertible", "Preserves all areas"], answer: "Collapses dimension", why: "Singular." },
        { q: "Reflect over x-axis matrix:", options: ["[1 0; 0 −1]", "[−1 0; 0 −1]", "[0 1; 1 0]", "[2 0; 0 2]"], answer: "[1 0; 0 −1]", why: "x stays, y flips." },
        { q: "Sign of det negative suggests:", options: ["Orientation reversal", "Zero area always", "No eigenvalues", "Nonlinearity"], answer: "Orientation reversal", why: "Reflection-type behaviour." },
      ],
    },
  ],
};
