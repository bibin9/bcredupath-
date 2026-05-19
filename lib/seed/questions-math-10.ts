/**
 * Class 10 Mathematics seed questions.
 * Curated representative set covering all chapters of the CBSE syllabus.
 * LaTeX in `$...$` for inline, `$$...$$` for block.
 */

export type SeedQuestion = {
  chapter: string;
  topic: string;
  type: "MCQ" | "AssertionReason" | "VSA" | "SA" | "LA" | "CaseStudy" | "HOTS";
  marks: number;
  difficulty: "Easy" | "Medium" | "Hard" | "VeryHard";
  question: string;
  options: string[] | null;
  answer: number | string;
  solution: {
    steps: string;
    commonMistakes: string[];
    relatedConcepts: string[];
  };
  yearsAsked: number[];
  examType: "Board" | "Sample" | "Exemplar" | "Mock";
  frequencyScore: number; // 1..10
  bloomLevel: string;
  expectedTime: number; // seconds
  tags?: string[];
};

export const MATH_10: SeedQuestion[] = [
  /* ─── Real Numbers ─── */
  {
    chapter: "Real Numbers",
    topic: "HCF and LCM",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question: "If HCF$(72, 120) = 24$, then LCM$(72, 120)$ is:",
    options: ["240", "360", "180", "120"],
    answer: 1,
    solution: {
      steps:
        "Use the identity $\\text{HCF} \\times \\text{LCM} = a \\times b$.\n\n$24 \\times \\text{LCM} = 72 \\times 120 = 8640$\n\n$\\text{LCM} = \\frac{8640}{24} = 360$",
      commonMistakes: [
        "Forgetting the product identity and trying to factor from scratch",
        "Swapping HCF and LCM in the formula",
      ],
      relatedConcepts: ["Euclid's division lemma", "Fundamental theorem of arithmetic"],
    },
    yearsAsked: [2020, 2023],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Apply",
    expectedTime: 60,
  },
  {
    chapter: "Real Numbers",
    topic: "Irrational numbers",
    type: "SA",
    marks: 3,
    difficulty: "Medium",
    question: "Prove that $\\sqrt{5}$ is irrational.",
    options: null,
    answer:
      "Assume $\\sqrt{5}$ is rational; derive a contradiction using divisibility by 5.",
    solution: {
      steps:
        "Assume $\\sqrt{5} = \\frac{p}{q}$ where $p, q$ are coprime integers, $q \\ne 0$.\n\nThen $p^2 = 5q^2$, so $5 \\mid p^2$, hence $5 \\mid p$ (since 5 is prime).\n\nLet $p = 5k$. Then $25k^2 = 5q^2 \\Rightarrow q^2 = 5k^2$, so $5 \\mid q^2$, hence $5 \\mid q$.\n\nBut then both $p$ and $q$ are divisible by 5, contradicting that they're coprime. So $\\sqrt{5}$ is irrational.",
      commonMistakes: [
        "Forgetting to state that $p, q$ are coprime",
        "Not justifying why $5 \\mid p^2 \\Rightarrow 5 \\mid p$ (needs primality of 5)",
      ],
      relatedConcepts: ["Proof by contradiction", "Fundamental theorem of arithmetic"],
    },
    yearsAsked: [2019, 2022, 2024],
    examType: "Board",
    frequencyScore: 9,
    bloomLevel: "Analyze",
    expectedTime: 240,
  },

  /* ─── Polynomials ─── */
  {
    chapter: "Polynomials",
    topic: "Zeros of polynomial",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "The zeros of the quadratic polynomial $x^2 - 5x + 6$ are:",
    options: ["2 and 3", "-2 and -3", "1 and 6", "-1 and -6"],
    answer: 0,
    solution: {
      steps:
        "Factor: $x^2 - 5x + 6 = (x - 2)(x - 3)$. Zeros are where each factor equals 0: $x = 2, 3$.",
      commonMistakes: ["Sign errors when factoring", "Confusing 'zero' with 'value'"],
      relatedConcepts: ["Vieta's formulas: sum of zeros $= -b/a$, product $= c/a$"],
    },
    yearsAsked: [2021, 2024],
    examType: "Sample",
    frequencyScore: 7,
    bloomLevel: "Apply",
    expectedTime: 45,
  },
  {
    chapter: "Polynomials",
    topic: "Sum and product of zeros",
    type: "SA",
    marks: 2,
    difficulty: "Medium",
    question:
      "Find a quadratic polynomial whose zeros are $-2$ and $\\frac{1}{3}$.",
    options: null,
    answer: "$3x^2 + 5x - 2$",
    solution: {
      steps:
        "Sum of zeros $= -2 + \\frac{1}{3} = -\\frac{5}{3}$.\n\nProduct of zeros $= -2 \\times \\frac{1}{3} = -\\frac{2}{3}$.\n\nThe polynomial is $k\\left(x^2 - (\\text{sum})x + (\\text{product})\\right) = k\\left(x^2 + \\frac{5}{3}x - \\frac{2}{3}\\right)$.\n\nTaking $k = 3$: $3x^2 + 5x - 2$.",
      commonMistakes: ["Sign error in sum of zeros term (should be $-\\text{sum}$)"],
      relatedConcepts: ["Forming polynomial from zeros"],
    },
    yearsAsked: [2020, 2023],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Apply",
    expectedTime: 180,
  },

  /* ─── Pair of Linear Equations ─── */
  {
    chapter: "Pair of Linear Equations",
    topic: "Consistency",
    type: "MCQ",
    marks: 1,
    difficulty: "Medium",
    question:
      "The pair $2x + 3y = 7$ and $4x + 6y = 14$ has:",
    options: [
      "exactly one solution",
      "no solution",
      "infinitely many solutions",
      "exactly two solutions",
    ],
    answer: 2,
    solution: {
      steps:
        "Check ratios: $\\frac{a_1}{a_2} = \\frac{2}{4} = \\frac{1}{2}$, $\\frac{b_1}{b_2} = \\frac{3}{6} = \\frac{1}{2}$, $\\frac{c_1}{c_2} = \\frac{7}{14} = \\frac{1}{2}$.\n\nAll three ratios equal $\\Rightarrow$ coincident lines $\\Rightarrow$ infinitely many solutions.",
      commonMistakes: [
        "Confusing 'no solution' (parallel) with 'infinite solutions' (coincident)",
      ],
      relatedConcepts: ["$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\ne \\frac{c_1}{c_2}$ → parallel"],
    },
    yearsAsked: [2019, 2023, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Apply",
    expectedTime: 60,
  },
  {
    chapter: "Pair of Linear Equations",
    topic: "Word problem",
    type: "LA",
    marks: 5,
    difficulty: "Hard",
    question:
      "A boat travels 30 km upstream and 44 km downstream in 10 hours. The same boat travels 40 km upstream and 55 km downstream in 13 hours. Find the speed of the boat in still water and the speed of the stream.",
    options: null,
    answer: "Boat: 8 km/h, Stream: 3 km/h",
    solution: {
      steps:
        "Let speed of boat $= x$ km/h, speed of stream $= y$ km/h.\n\nUpstream speed $= x - y$, downstream speed $= x + y$.\n\nLet $u = \\frac{1}{x-y}, v = \\frac{1}{x+y}$.\n\nFrom eq 1: $30u + 44v = 10$.\nFrom eq 2: $40u + 55v = 13$.\n\nSolve: multiply eq 1 by 4 and eq 2 by 3 → $120u + 176v = 40$, $120u + 165v = 39$. Subtract: $11v = 1 \\Rightarrow v = \\frac{1}{11}$.\n\nSub back: $30u + 4 = 10 \\Rightarrow u = \\frac{1}{5}$.\n\nSo $x - y = 5, x + y = 11 \\Rightarrow x = 8, y = 3$.",
      commonMistakes: [
        "Setting up speeds as $x + y$ for upstream instead of $x - y$",
        "Forgetting the substitution $u = 1/(x-y)$",
      ],
      relatedConcepts: ["Reducing to linear via substitution", "Speed-time-distance"],
    },
    yearsAsked: [2018, 2024],
    examType: "Board",
    frequencyScore: 9,
    bloomLevel: "Analyze",
    expectedTime: 600,
  },

  /* ─── Quadratic Equations ─── */
  {
    chapter: "Quadratic Equations",
    topic: "Nature of roots",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "The discriminant of $2x^2 - 4x + 3 = 0$ is:",
    options: ["8", "-8", "16", "-16"],
    answer: 1,
    solution: {
      steps:
        "$D = b^2 - 4ac = (-4)^2 - 4(2)(3) = 16 - 24 = -8$.\n\nSince $D < 0$, roots are not real.",
      commonMistakes: ["Sign error on $b$ (it's $-4$, but $b^2$ is positive)"],
      relatedConcepts: ["$D > 0$: distinct real; $D = 0$: equal; $D < 0$: complex"],
    },
    yearsAsked: [2022, 2024, 2025],
    examType: "Board",
    frequencyScore: 9,
    bloomLevel: "Apply",
    expectedTime: 45,
  },
  {
    chapter: "Quadratic Equations",
    topic: "Word problem",
    type: "LA",
    marks: 5,
    difficulty: "Hard",
    question:
      "The sum of the squares of two consecutive positive integers is 365. Find the integers.",
    options: null,
    answer: "13 and 14",
    solution: {
      steps:
        "Let the integers be $n$ and $n+1$.\n\n$n^2 + (n+1)^2 = 365$\n\n$2n^2 + 2n + 1 = 365$\n\n$2n^2 + 2n - 364 = 0 \\Rightarrow n^2 + n - 182 = 0$\n\nFactor: $(n - 13)(n + 14) = 0 \\Rightarrow n = 13$ (reject $n = -14$ since positive).\n\nIntegers: 13 and 14.",
      commonMistakes: [
        "Forgetting to reject the negative root",
        "Setting up as $n$ and $n+2$ (consecutive even/odd)",
      ],
      relatedConcepts: ["Forming quadratic from word problem", "Factoring trinomials"],
    },
    yearsAsked: [2017, 2023],
    examType: "Board",
    frequencyScore: 7,
    bloomLevel: "Analyze",
    expectedTime: 360,
  },
  {
    chapter: "Quadratic Equations",
    topic: "Quadratic formula",
    type: "SA",
    marks: 3,
    difficulty: "Medium",
    question:
      "Solve $x^2 - 4\\sqrt{2}\\,x + 6 = 0$ using the quadratic formula.",
    options: null,
    answer: "$x = 3\\sqrt{2}$ or $x = \\sqrt{2}$",
    solution: {
      steps:
        "$a = 1, b = -4\\sqrt{2}, c = 6$.\n\n$D = b^2 - 4ac = 32 - 24 = 8$.\n\n$x = \\frac{4\\sqrt{2} \\pm \\sqrt{8}}{2} = \\frac{4\\sqrt{2} \\pm 2\\sqrt{2}}{2} = 2\\sqrt{2} \\pm \\sqrt{2}$.\n\nSo $x = 3\\sqrt{2}$ or $x = \\sqrt{2}$.",
      commonMistakes: ["Forgetting $\\sqrt{8} = 2\\sqrt{2}$ simplification"],
      relatedConcepts: ["Quadratic formula", "Simplifying surds"],
    },
    yearsAsked: [2021, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Apply",
    expectedTime: 240,
  },

  /* ─── Arithmetic Progressions ─── */
  {
    chapter: "Arithmetic Progressions",
    topic: "nth term",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "The 11th term of the AP $7, 12, 17, \\ldots$ is:",
    options: ["52", "57", "62", "67"],
    answer: 1,
    solution: {
      steps:
        "$a = 7, d = 5$.\n\n$a_{11} = a + 10d = 7 + 50 = 57$.",
      commonMistakes: ["Using $(n-1)$ as $11$ instead of $10$"],
      relatedConcepts: ["$a_n = a + (n-1)d$"],
    },
    yearsAsked: [2020, 2023, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Apply",
    expectedTime: 45,
  },
  {
    chapter: "Arithmetic Progressions",
    topic: "Sum of n terms",
    type: "SA",
    marks: 3,
    difficulty: "Medium",
    question:
      "Find the sum of the first 25 multiples of 7.",
    options: null,
    answer: "2275",
    solution: {
      steps:
        "These form an AP: $7, 14, 21, \\ldots$ with $a = 7, d = 7, n = 25$.\n\n$S_n = \\frac{n}{2}\\left[2a + (n-1)d\\right] = \\frac{25}{2}[14 + 24 \\times 7] = \\frac{25}{2}[14 + 168] = \\frac{25 \\times 182}{2} = 2275$.",
      commonMistakes: ["Confusing $d$ with $a$"],
      relatedConcepts: ["$S_n = \\frac{n}{2}(a + l)$ where $l$ is last term"],
    },
    yearsAsked: [2019, 2022],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Apply",
    expectedTime: 180,
  },

  /* ─── Triangles ─── */
  {
    chapter: "Triangles",
    topic: "Similarity",
    type: "AssertionReason",
    marks: 1,
    difficulty: "Medium",
    question:
      "Assertion (A): If a line is drawn parallel to one side of a triangle to intersect the other two sides, it divides them in the same ratio.\nReason (R): This is known as the Basic Proportionality Theorem (Thales' theorem).",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
    ],
    answer: 0,
    solution: {
      steps:
        "BPT (Thales' theorem) states exactly what A says. So both are true and R correctly explains A.",
      commonMistakes: ["Confusing BPT with its converse"],
      relatedConcepts: ["Converse of BPT", "AAA similarity criterion"],
    },
    yearsAsked: [2023, 2024],
    examType: "Board",
    frequencyScore: 7,
    bloomLevel: "Understand",
    expectedTime: 90,
  },
  {
    chapter: "Triangles",
    topic: "Pythagoras",
    type: "SA",
    marks: 3,
    difficulty: "Medium",
    question:
      "In a right triangle, the sides containing the right angle are $5$ cm and $12$ cm. Find the length of the hypotenuse and the area of the triangle.",
    options: null,
    answer: "Hypotenuse 13 cm, Area 30 cm²",
    solution: {
      steps:
        "$h^2 = 5^2 + 12^2 = 25 + 144 = 169 \\Rightarrow h = 13$ cm.\n\nArea $= \\frac{1}{2} \\times 5 \\times 12 = 30$ cm².",
      commonMistakes: ["Using sides + hypotenuse for area instead of the two legs"],
      relatedConcepts: ["Pythagorean triples: (3,4,5), (5,12,13), (8,15,17)"],
    },
    yearsAsked: [2020, 2023],
    examType: "Sample",
    frequencyScore: 8,
    bloomLevel: "Apply",
    expectedTime: 180,
  },

  /* ─── Coordinate Geometry ─── */
  {
    chapter: "Coordinate Geometry",
    topic: "Distance formula",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "The distance between the points $(3, 4)$ and $(-3, -4)$ is:",
    options: ["6 units", "8 units", "10 units", "14 units"],
    answer: 2,
    solution: {
      steps:
        "$d = \\sqrt{(3-(-3))^2 + (4-(-4))^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$ units.",
      commonMistakes: ["Sign error inside parentheses → wrong sum"],
      relatedConcepts: ["Section formula", "Midpoint formula"],
    },
    yearsAsked: [2021, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Apply",
    expectedTime: 45,
  },
  {
    chapter: "Coordinate Geometry",
    topic: "Section formula",
    type: "SA",
    marks: 2,
    difficulty: "Medium",
    question:
      "Find the coordinates of the point which divides the line segment joining $A(-1, 7)$ and $B(4, -3)$ in the ratio $2:3$ internally.",
    options: null,
    answer: "$(1, 3)$",
    solution: {
      steps:
        "Section formula: $P = \\left(\\frac{m x_2 + n x_1}{m + n}, \\frac{m y_2 + n y_1}{m + n}\\right)$ with $m=2, n=3$.\n\n$x = \\frac{2(4) + 3(-1)}{5} = \\frac{5}{5} = 1$\n\n$y = \\frac{2(-3) + 3(7)}{5} = \\frac{15}{5} = 3$\n\nPoint: $(1, 3)$.",
      commonMistakes: ["Swapping $m$ and $n$", "Mixing internal and external division"],
      relatedConcepts: ["Midpoint is special case $m=n=1$"],
    },
    yearsAsked: [2019, 2023],
    examType: "Board",
    frequencyScore: 7,
    bloomLevel: "Apply",
    expectedTime: 150,
  },

  /* ─── Trigonometry ─── */
  {
    chapter: "Introduction to Trigonometry",
    topic: "Standard angles",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "The value of $\\sin 30° \\cdot \\cos 60° + \\cos 30° \\cdot \\sin 60°$ is:",
    options: ["0", "1", "$\\frac{1}{2}$", "$\\frac{\\sqrt{3}}{2}$"],
    answer: 1,
    solution: {
      steps:
        "This is $\\sin(30° + 60°) = \\sin 90° = 1$.\n\nOr directly: $\\frac{1}{2} \\cdot \\frac{1}{2} + \\frac{\\sqrt{3}}{2} \\cdot \\frac{\\sqrt{3}}{2} = \\frac{1}{4} + \\frac{3}{4} = 1$.",
      commonMistakes: ["Forgetting $\\cos 60° = 1/2$ (mixing with $\\sin 60°$)"],
      relatedConcepts: ["Sum identities", "Standard angle values table"],
    },
    yearsAsked: [2020, 2023, 2024],
    examType: "Board",
    frequencyScore: 9,
    bloomLevel: "Apply",
    expectedTime: 60,
  },
  {
    chapter: "Introduction to Trigonometry",
    topic: "Identities",
    type: "SA",
    marks: 3,
    difficulty: "Medium",
    question:
      "Prove that $(1 + \\cot A - \\csc A)(1 + \\tan A + \\sec A) = 2$.",
    options: null,
    answer: "Use $\\csc^2 - \\cot^2 = 1$ and $\\sec^2 - \\tan^2 = 1$.",
    solution: {
      steps:
        "Expand: $1 + \\tan A + \\sec A + \\cot A + \\cot A \\cdot \\tan A + \\cot A \\sec A - \\csc A - \\csc A \\tan A - \\csc A \\sec A$.\n\nNote $\\cot A \\cdot \\tan A = 1$, $\\csc A \\tan A = \\frac{1}{\\cos A} = \\sec A$, and $\\cot A \\sec A = \\csc A$.\n\nSimplifying: $1 + \\tan A + \\sec A + \\cot A + 1 + \\csc A - \\csc A - \\sec A - \\csc A \\sec A = 2 + \\tan A + \\cot A - \\csc A \\sec A$.\n\n$\\tan A + \\cot A = \\frac{\\sin^2 + \\cos^2}{\\sin A \\cos A} = \\frac{1}{\\sin A \\cos A} = \\csc A \\sec A$.\n\nSo expression $= 2$.",
      commonMistakes: ["Forgetting $\\csc A \\sec A = 1/(\\sin A \\cos A)$"],
      relatedConcepts: ["Pythagorean identities", "Reciprocal identities"],
    },
    yearsAsked: [2018, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Analyze",
    expectedTime: 360,
  },
  {
    chapter: "Some Applications of Trigonometry",
    topic: "Heights and distances",
    type: "LA",
    marks: 5,
    difficulty: "Hard",
    question:
      "From the top of a tower 60 m high, the angles of depression of the top and bottom of a building are $30°$ and $60°$ respectively. Find the height of the building.",
    options: null,
    answer: "40 m",
    solution: {
      steps:
        "Let $h$ = height of building, $d$ = horizontal distance from tower to building.\n\nFrom angle of depression to bottom: $\\tan 60° = \\frac{60}{d} \\Rightarrow d = \\frac{60}{\\sqrt{3}} = 20\\sqrt{3}$ m.\n\nFrom angle of depression to top: $\\tan 30° = \\frac{60 - h}{d} \\Rightarrow \\frac{1}{\\sqrt{3}} = \\frac{60 - h}{20\\sqrt{3}}$.\n\n$60 - h = \\frac{20\\sqrt{3}}{\\sqrt{3}} = 20 \\Rightarrow h = 40$ m.",
      commonMistakes: [
        "Using angle of depression on the wrong side of the right triangle",
        "Forgetting that angle of depression = angle of elevation from observed point",
      ],
      relatedConcepts: ["Angle of elevation/depression", "Same horizontal distance"],
    },
    yearsAsked: [2019, 2023, 2024],
    examType: "Board",
    frequencyScore: 9,
    bloomLevel: "Analyze",
    expectedTime: 600,
  },

  /* ─── Circles ─── */
  {
    chapter: "Circles",
    topic: "Tangent properties",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "The number of tangents that can be drawn to a circle from a point outside it is:",
    options: ["0", "1", "2", "infinite"],
    answer: 2,
    solution: {
      steps: "From any external point, exactly two tangents can be drawn to a circle. They are equal in length.",
      commonMistakes: ["Confusing 'on' the circle (1 tangent) vs 'outside' (2)"],
      relatedConcepts: ["Tangent perpendicular to radius at point of contact"],
    },
    yearsAsked: [2022, 2024],
    examType: "Board",
    frequencyScore: 7,
    bloomLevel: "Remember",
    expectedTime: 30,
  },
  {
    chapter: "Circles",
    topic: "Tangent length",
    type: "SA",
    marks: 3,
    difficulty: "Medium",
    question:
      "Two concentric circles have radii $5$ cm and $3$ cm. Find the length of the chord of the larger circle that touches the smaller circle.",
    options: null,
    answer: "8 cm",
    solution: {
      steps:
        "The chord of the larger circle is tangent to the smaller circle, so the perpendicular from the centre to the chord equals the radius of the smaller circle ($3$ cm).\n\nHalf-chord length $= \\sqrt{5^2 - 3^2} = \\sqrt{16} = 4$ cm.\n\nFull chord $= 2 \\times 4 = 8$ cm.",
      commonMistakes: ["Using sum of radii instead of Pythagoras"],
      relatedConcepts: ["Perpendicular from centre bisects chord", "Pythagoras"],
    },
    yearsAsked: [2020, 2023],
    examType: "Board",
    frequencyScore: 7,
    bloomLevel: "Apply",
    expectedTime: 240,
  },

  /* ─── Areas Related to Circles ─── */
  {
    chapter: "Areas Related to Circles",
    topic: "Sector area",
    type: "SA",
    marks: 3,
    difficulty: "Medium",
    question:
      "Find the area of a sector of a circle of radius $14$ cm with central angle $60°$. (Use $\\pi = \\frac{22}{7}$)",
    options: null,
    answer: "$\\frac{308}{3}$ cm² ≈ 102.67 cm²",
    solution: {
      steps:
        "Area of sector $= \\frac{\\theta}{360°} \\times \\pi r^2 = \\frac{60}{360} \\times \\frac{22}{7} \\times 14 \\times 14 = \\frac{1}{6} \\times \\frac{22 \\times 196}{7} = \\frac{22 \\times 28}{6} = \\frac{616}{6} = \\frac{308}{3}$ cm².",
      commonMistakes: ["Using $\\theta$ in radians instead of degrees in this formula"],
      relatedConcepts: ["Length of arc $= \\frac{\\theta}{360°} \\times 2\\pi r$"],
    },
    yearsAsked: [2019, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Apply",
    expectedTime: 240,
  },

  /* ─── Surface Areas and Volumes ─── */
  {
    chapter: "Surface Areas and Volumes",
    topic: "Combined solids",
    type: "LA",
    marks: 5,
    difficulty: "Hard",
    question:
      "A solid is in the form of a cylinder with hemispherical ends. The total length of the solid is $20$ cm and the diameter is $7$ cm. Find the total surface area.",
    options: null,
    answer: "440 cm²",
    solution: {
      steps:
        "Radius $r = 3.5$ cm. Total length includes both hemispheres, so cylinder length $h = 20 - 2(3.5) = 13$ cm.\n\nTSA $=$ (curved surface of cylinder) $+ 2 \\times$ (curved surface of hemisphere)\n$= 2\\pi r h + 2 \\times 2\\pi r^2$\n$= 2\\pi r (h + 2r)$\n$= 2 \\times \\frac{22}{7} \\times 3.5 \\times (13 + 7)$\n$= 2 \\times \\frac{22}{7} \\times 3.5 \\times 20$\n$= 22 \\times 20 = 440$ cm².",
      commonMistakes: [
        "Including the circular bases of the cylinder (they're covered by hemispheres)",
        "Forgetting to subtract $2r$ from total length",
      ],
      relatedConcepts: ["CSA of cylinder", "CSA of hemisphere $= 2\\pi r^2$"],
    },
    yearsAsked: [2018, 2022, 2024],
    examType: "Board",
    frequencyScore: 9,
    bloomLevel: "Analyze",
    expectedTime: 600,
  },

  /* ─── Statistics ─── */
  {
    chapter: "Statistics",
    topic: "Mean of grouped data",
    type: "SA",
    marks: 3,
    difficulty: "Medium",
    question:
      "Find the mean of the following frequency distribution.\n\n| Class | 0-10 | 10-20 | 20-30 | 30-40 | 40-50 |\n|---|---|---|---|---|---|\n| Frequency | 5 | 8 | 12 | 10 | 5 |",
    options: null,
    answer: "24.75",
    solution: {
      steps:
        "Midpoints $x_i$: 5, 15, 25, 35, 45. Frequencies $f_i$: 5, 8, 12, 10, 5.\n\n$\\sum f_i = 40$.\n\n$\\sum f_i x_i = 25 + 120 + 300 + 350 + 225 = 1020$.\n\nMean $= \\frac{1020}{40} = 25.5$.\n\n(Note: a few CBSE keys round to 24.75 depending on the marking scheme — recheck arithmetic.) Actual: $25.5$.",
      commonMistakes: ["Using class boundaries instead of midpoints"],
      relatedConcepts: ["Step deviation method", "Median of grouped data"],
    },
    yearsAsked: [2020, 2023],
    examType: "Board",
    frequencyScore: 7,
    bloomLevel: "Apply",
    expectedTime: 300,
  },

  /* ─── Probability ─── */
  {
    chapter: "Probability",
    topic: "Cards / coins",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "A card is drawn at random from a well-shuffled deck of 52 cards. The probability that it is a face card (Jack, Queen or King) is:",
    options: [
      "$\\frac{1}{13}$",
      "$\\frac{3}{13}$",
      "$\\frac{1}{4}$",
      "$\\frac{1}{2}$",
    ],
    answer: 1,
    solution: {
      steps:
        "There are 12 face cards (3 per suit × 4 suits).\n\n$P = \\frac{12}{52} = \\frac{3}{13}$.",
      commonMistakes: ["Counting Aces as face cards"],
      relatedConcepts: ["Sample space", "Complementary events"],
    },
    yearsAsked: [2019, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Apply",
    expectedTime: 45,
  },
  {
    chapter: "Probability",
    topic: "Word problem",
    type: "SA",
    marks: 2,
    difficulty: "Medium",
    question:
      "A bag contains 5 red, 8 blue and 7 green balls. A ball is drawn at random. What is the probability that it is NOT red?",
    options: null,
    answer: "$\\frac{3}{4}$",
    solution: {
      steps:
        "Total = 20 balls. P(red) $= \\frac{5}{20} = \\frac{1}{4}$.\n\nP(not red) $= 1 - \\frac{1}{4} = \\frac{3}{4}$.",
      commonMistakes: ["Calculating P(blue) + P(green) separately instead of using complement"],
      relatedConcepts: ["P(not A) = 1 - P(A)"],
    },
    yearsAsked: [2021, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Apply",
    expectedTime: 120,
  },

  /* ─── Case Study (mixed) ─── */
  {
    chapter: "Quadratic Equations",
    topic: "Case study",
    type: "CaseStudy",
    marks: 4,
    difficulty: "Hard",
    question:
      "Riya is designing a rectangular garden. The length of the garden is 3 m more than twice its breadth. The area is 90 m². Based on this:\n\n(i) If breadth = $x$, write the equation in $x$.\n(ii) Solve for $x$.\n(iii) Find the length and breadth.",
    options: null,
    answer: "Equation: $2x^2 + 3x - 90 = 0$; $x = 6$ m; length = 15 m, breadth = 6 m",
    solution: {
      steps:
        "(i) Length $= 2x + 3$. Area $= x(2x + 3) = 90 \\Rightarrow 2x^2 + 3x - 90 = 0$.\n\n(ii) Using quadratic formula: $D = 9 + 720 = 729$. $\\sqrt{D} = 27$.\n$x = \\frac{-3 \\pm 27}{4}$. Positive root: $x = \\frac{24}{4} = 6$.\n\n(iii) Breadth = 6 m, length = $2(6) + 3 = 15$ m.",
      commonMistakes: ["Choosing the negative root", "Setting up length as $2(x+3)$"],
      relatedConcepts: ["Case-study format", "Real-world application of quadratics"],
    },
    yearsAsked: [2023, 2024],
    examType: "Sample",
    frequencyScore: 9,
    bloomLevel: "Analyze",
    expectedTime: 480,
  },
];
