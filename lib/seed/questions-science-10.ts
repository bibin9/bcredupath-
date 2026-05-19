/**
 * Class 10 Science seed questions (Physics + Chemistry + Biology).
 * Curated representative set covering CBSE syllabus chapters.
 */

import type { SeedQuestion } from "./questions-math-10";

export const SCIENCE_10: SeedQuestion[] = [
  /* ─────────── PHYSICS ─────────── */

  /* ─── Light - Reflection and Refraction ─── */
  {
    chapter: "Light - Reflection and Refraction",
    topic: "Lens formula",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "A convex lens forms a real and inverted image of an object placed beyond $2F$. The image is formed:",
    options: [
      "between $F$ and $2F$ on the other side",
      "beyond $2F$ on the other side",
      "at $F$",
      "at infinity",
    ],
    answer: 0,
    solution: {
      steps:
        "For a convex lens, when object is beyond $2F$, the image forms between $F$ and $2F$ on the opposite side — real, inverted, and diminished.",
      commonMistakes: ["Confusing 'beyond $2F$' with 'at $2F$' (image then forms at $2F$, same size)"],
      relatedConcepts: ["Magnification", "Image table for convex lens positions"],
    },
    yearsAsked: [2020, 2023],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Understand",
    expectedTime: 60,
  },
  {
    chapter: "Light - Reflection and Refraction",
    topic: "Refractive index",
    type: "SA",
    marks: 3,
    difficulty: "Medium",
    question:
      "The refractive index of glass is $1.5$ and that of water is $1.33$. Find the refractive index of glass with respect to water.",
    options: null,
    answer: "≈ 1.128",
    solution: {
      steps:
        "${}_w n_g = \\frac{n_g}{n_w} = \\frac{1.5}{1.33} \\approx 1.128$.\n\nThis tells us how much glass refracts light relative to water.",
      commonMistakes: ["Inverting the ratio (would give refractive index of water w.r.t. glass)"],
      relatedConcepts: ["Snell's law", "Absolute vs relative refractive index"],
    },
    yearsAsked: [2019, 2024],
    examType: "Board",
    frequencyScore: 7,
    bloomLevel: "Apply",
    expectedTime: 180,
  },
  {
    chapter: "Light - Reflection and Refraction",
    topic: "Mirror formula",
    type: "LA",
    marks: 5,
    difficulty: "Hard",
    question:
      "An object 5 cm tall is placed 30 cm in front of a concave mirror of focal length 20 cm. Find the position, nature and size of the image.",
    options: null,
    answer: "v = -60 cm; real, inverted, magnified 10 cm tall",
    solution: {
      steps:
        "Sign convention: $u = -30, f = -20$.\n\n$\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}$\n\n$\\frac{1}{v} = \\frac{1}{-20} - \\frac{1}{-30} = -\\frac{1}{20} + \\frac{1}{30} = \\frac{-3 + 2}{60} = -\\frac{1}{60}$\n\nSo $v = -60$ cm. The image is on the same side as the object (real, inverted).\n\nMagnification $m = -\\frac{v}{u} = -\\frac{-60}{-30} = -2$.\n\nImage height $= m \\times h_o = -2 \\times 5 = -10$ cm (negative ⇒ inverted, magnitude 10 cm).",
      commonMistakes: [
        "Sign convention errors (forgetting object distance is negative)",
        "Confusing image distance sign with nature",
      ],
      relatedConcepts: ["Cartesian sign convention", "Concave mirror image table"],
    },
    yearsAsked: [2018, 2023, 2024],
    examType: "Board",
    frequencyScore: 9,
    bloomLevel: "Analyze",
    expectedTime: 540,
  },

  /* ─── Human Eye ─── */
  {
    chapter: "The Human Eye and the Colourful World",
    topic: "Defects of vision",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "Myopia (short-sightedness) is corrected using:",
    options: [
      "Convex lens",
      "Concave lens",
      "Cylindrical lens",
      "Bi-focal lens",
    ],
    answer: 1,
    solution: {
      steps:
        "In myopia, the image forms in front of the retina. A concave (diverging) lens spreads the rays so the image shifts onto the retina.",
      commonMistakes: ["Swapping myopia (concave) and hypermetropia (convex)"],
      relatedConcepts: ["Hypermetropia → convex lens", "Presbyopia → bi-focal"],
    },
    yearsAsked: [2021, 2024],
    examType: "Board",
    frequencyScore: 7,
    bloomLevel: "Remember",
    expectedTime: 30,
  },
  {
    chapter: "The Human Eye and the Colourful World",
    topic: "Dispersion + scattering",
    type: "SA",
    marks: 2,
    difficulty: "Medium",
    question:
      "Why does the sky appear blue during the day but reddish at sunrise and sunset?",
    options: null,
    answer:
      "Rayleigh scattering: blue scatters most → blue sky; at sunrise/sunset light travels longer paths, blue is scattered away, leaving red.",
    solution: {
      steps:
        "Rayleigh scattering intensity $\\propto 1/\\lambda^4$. Shorter wavelengths (blue) scatter much more by atmospheric molecules — the diffuse light reaching us is therefore blue.\n\nAt sunrise/sunset, sunlight passes through a much thicker layer of atmosphere. Most blue is scattered out, so the dominant transmitted wavelengths are red and orange.",
      commonMistakes: [
        "Saying 'because the sky reflects the ocean' (incorrect)",
        "Confusing scattering with absorption",
      ],
      relatedConcepts: ["Rayleigh vs Mie scattering", "Tyndall effect"],
    },
    yearsAsked: [2019, 2022, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Understand",
    expectedTime: 180,
  },

  /* ─── Electricity ─── */
  {
    chapter: "Electricity",
    topic: "Ohm's law",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "If the potential difference across a resistor is doubled while resistance is kept constant, the current:",
    options: ["halves", "doubles", "stays the same", "becomes four times"],
    answer: 1,
    solution: {
      steps: "By Ohm's law $V = IR$, doubling $V$ at constant $R$ doubles $I$.",
      commonMistakes: ["Applying $P = I^2 R$ thinking power relationship"],
      relatedConcepts: ["$V = IR$", "$P = VI = I^2 R = V^2/R$"],
    },
    yearsAsked: [2020, 2023, 2024],
    examType: "Board",
    frequencyScore: 9,
    bloomLevel: "Apply",
    expectedTime: 30,
  },
  {
    chapter: "Electricity",
    topic: "Series and parallel",
    type: "LA",
    marks: 5,
    difficulty: "Hard",
    question:
      "Three resistors of $2 \\Omega, 3 \\Omega$ and $6 \\Omega$ are connected in parallel across a $6$ V battery. Calculate (i) equivalent resistance, (ii) total current from the battery, (iii) current through the $3 \\Omega$ resistor.",
    options: null,
    answer: "(i) 1 Ω, (ii) 6 A, (iii) 2 A",
    solution: {
      steps:
        "(i) $\\frac{1}{R_p} = \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6} = \\frac{3 + 2 + 1}{6} = 1 \\Rightarrow R_p = 1\\,\\Omega$.\n\n(ii) Total current $I = \\frac{V}{R_p} = \\frac{6}{1} = 6$ A.\n\n(iii) In parallel, voltage across each is 6 V. Current through 3 Ω: $I_3 = \\frac{6}{3} = 2$ A.",
      commonMistakes: [
        "Applying total current to a single branch (each branch has its own current)",
        "Forgetting that voltage is same across parallel branches",
      ],
      relatedConcepts: ["Kirchhoff's current law", "Power dissipated per branch"],
    },
    yearsAsked: [2019, 2022, 2024],
    examType: "Board",
    frequencyScore: 9,
    bloomLevel: "Analyze",
    expectedTime: 480,
  },
  {
    chapter: "Electricity",
    topic: "Power and energy",
    type: "SA",
    marks: 3,
    difficulty: "Medium",
    question:
      "An electric bulb is rated $220$ V, $100$ W. Calculate (a) its resistance and (b) the energy consumed in kWh if it operates for $5$ hours daily for $30$ days.",
    options: null,
    answer: "R = 484 Ω; Energy = 15 kWh",
    solution: {
      steps:
        "(a) $R = \\frac{V^2}{P} = \\frac{220^2}{100} = \\frac{48400}{100} = 484\\,\\Omega$.\n\n(b) Energy $= P \\times t = 100 \\text{ W} \\times 5 \\text{ h} \\times 30 = 15000$ Wh $= 15$ kWh.",
      commonMistakes: ["Using current rating with $V$ rating mismatched"],
      relatedConcepts: ["1 unit = 1 kWh", "Cost calculation"],
    },
    yearsAsked: [2020, 2023],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Apply",
    expectedTime: 240,
  },

  /* ─── Magnetic Effects ─── */
  {
    chapter: "Magnetic Effects of Electric Current",
    topic: "Right-hand rule",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "The direction of the magnetic field around a straight current-carrying conductor is given by:",
    options: [
      "Fleming's left-hand rule",
      "Fleming's right-hand rule",
      "Right-hand thumb rule (Maxwell's corkscrew rule)",
      "Lenz's law",
    ],
    answer: 2,
    solution: {
      steps:
        "The right-hand thumb rule: if you grasp the conductor with your right hand so the thumb points in the direction of current, your curled fingers indicate the direction of magnetic field lines.",
      commonMistakes: ["Confusing with Fleming's left-hand rule (used for force on conductor)"],
      relatedConcepts: ["Magnetic field of a solenoid", "Fleming's left-hand rule (motor)"],
    },
    yearsAsked: [2021, 2024],
    examType: "Board",
    frequencyScore: 7,
    bloomLevel: "Remember",
    expectedTime: 30,
  },
  {
    chapter: "Magnetic Effects of Electric Current",
    topic: "Electromagnetic induction",
    type: "SA",
    marks: 3,
    difficulty: "Medium",
    question:
      "State the principle of an electric generator and explain how it converts mechanical energy to electrical energy.",
    options: null,
    answer:
      "Based on electromagnetic induction (Faraday's law): a coil rotating in a magnetic field experiences a changing flux, inducing an EMF.",
    solution: {
      steps:
        "Principle: when a closed coil is rotated in a uniform magnetic field, the magnetic flux through the coil changes continuously. By Faraday's law, this induces an EMF in the coil.\n\nMechanical energy used to rotate the coil is converted into electrical energy. AC generators produce alternating current (the EMF direction reverses every half rotation); DC generators use a split-ring commutator to provide a unidirectional current.",
      commonMistakes: [
        "Stating Fleming's right-hand rule but not Faraday's law as the principle",
        "Confusing generator (induces EMF) with motor (uses current to create motion)",
      ],
      relatedConcepts: ["Lenz's law", "Slip rings vs split rings"],
    },
    yearsAsked: [2018, 2022, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Understand",
    expectedTime: 240,
  },

  /* ─────────── BIOLOGY ─────────── */

  /* ─── Life Processes ─── */
  {
    chapter: "Life Processes",
    topic: "Respiration",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "The end product of anaerobic respiration in human muscles during heavy exercise is:",
    options: ["Carbon dioxide and water", "Lactic acid", "Ethanol and CO₂", "Pyruvate"],
    answer: 1,
    solution: {
      steps:
        "When oxygen is in short supply during heavy exercise, pyruvate is converted to lactic acid in muscle cells. This accumulation causes muscle cramps.",
      commonMistakes: ["Confusing with anaerobic respiration in yeast (ethanol + CO₂)"],
      relatedConcepts: ["Glycolysis", "Krebs cycle", "Cori cycle"],
    },
    yearsAsked: [2020, 2023, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Remember",
    expectedTime: 45,
  },
  {
    chapter: "Life Processes",
    topic: "Human digestive system",
    type: "LA",
    marks: 5,
    difficulty: "Hard",
    question:
      "Describe the process of digestion in the human alimentary canal, mentioning the role of saliva, gastric juice, bile and pancreatic juice.",
    options: null,
    answer: "See solution.",
    solution: {
      steps:
        "**Mouth**: Saliva (contains salivary amylase/ptyalin) breaks down starch → maltose. Teeth and tongue mechanically break down food.\n\n**Oesophagus**: Peristalsis pushes food to stomach.\n\n**Stomach**: Gastric juice — HCl (kills microbes, activates pepsin), pepsin (digests proteins → peptides), mucus (protects stomach wall).\n\n**Small intestine**: Bile from liver emulsifies fats (breaks large globules into smaller). Pancreatic juice contains trypsin (proteins → amino acids), lipase (fats → fatty acids + glycerol), amylase (starch → maltose). Intestinal juice completes digestion: maltose → glucose.\n\nFinal absorption of nutrients happens through villi in the small intestine; water is absorbed in the large intestine.",
      commonMistakes: [
        "Calling bile an enzyme (it's not — it emulsifies)",
        "Forgetting HCl's role (activates pepsin, antimicrobial)",
      ],
      relatedConcepts: ["Peristalsis", "Villi structure", "Pancreatic enzymes"],
    },
    yearsAsked: [2019, 2023],
    examType: "Board",
    frequencyScore: 9,
    bloomLevel: "Understand",
    expectedTime: 600,
  },
  {
    chapter: "Life Processes",
    topic: "Photosynthesis",
    type: "SA",
    marks: 3,
    difficulty: "Medium",
    question:
      "Write the balanced equation for photosynthesis. Explain the role of chlorophyll and where it occurs in plants.",
    options: null,
    answer:
      "$6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow{\\text{light, chlorophyll}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$",
    solution: {
      steps:
        "Equation: $6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow{\\text{light, chlorophyll}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$.\n\nChlorophyll is the green pigment in chloroplasts (mainly within leaf mesophyll cells, especially the palisade layer). It absorbs light energy (mostly red and blue, reflecting green) and uses it to split water — the source of O₂ — and drive the conversion of CO₂ to glucose.",
      commonMistakes: [
        "Forgetting to balance with $6$ on both sides",
        "Stating chlorophyll 'makes' food (it's the energy converter, not the food)",
      ],
      relatedConcepts: ["Stomata + gas exchange", "Light vs dark reactions"],
    },
    yearsAsked: [2018, 2021, 2024],
    examType: "Board",
    frequencyScore: 9,
    bloomLevel: "Understand",
    expectedTime: 240,
  },

  /* ─── Control and Coordination ─── */
  {
    chapter: "Control and Coordination",
    topic: "Plant hormones",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "Which plant hormone promotes cell elongation and is responsible for phototropism?",
    options: ["Cytokinin", "Abscisic acid", "Auxin", "Gibberellin"],
    answer: 2,
    solution: {
      steps:
        "Auxin accumulates on the shaded side of a stem, causing those cells to elongate more. The stem bends toward light — phototropism.",
      commonMistakes: ["Confusing auxin with gibberellin (which also promotes growth but via different mechanism)"],
      relatedConcepts: ["Geotropism", "ABA inhibits growth"],
    },
    yearsAsked: [2020, 2023],
    examType: "Board",
    frequencyScore: 7,
    bloomLevel: "Remember",
    expectedTime: 30,
  },
  {
    chapter: "Control and Coordination",
    topic: "Reflex action",
    type: "SA",
    marks: 3,
    difficulty: "Medium",
    question:
      "Explain reflex action with a labelled diagram of the reflex arc.",
    options: null,
    answer:
      "Stimulus → receptor → sensory neuron → spinal cord (interneuron) → motor neuron → effector → response.",
    solution: {
      steps:
        "**Reflex action**: an involuntary, near-instantaneous response to a stimulus, mediated by the spinal cord (without conscious brain involvement).\n\n**Reflex arc** (pathway):\n1. Stimulus (e.g. heat) acts on a **receptor** (skin).\n2. **Sensory neuron** carries the impulse to the **spinal cord**.\n3. An **interneuron** in the spinal cord processes the signal.\n4. **Motor neuron** carries the response back to the **effector** (muscle).\n5. Muscle contracts — the hand is pulled away.\n\nThe brain is informed but is not part of the action loop — this is why reflexes are fast.",
      commonMistakes: [
        "Saying the brain triggers the reflex (it doesn't — the spinal cord does)",
        "Omitting the interneuron",
      ],
      relatedConcepts: ["CNS vs PNS", "Synaptic transmission"],
    },
    yearsAsked: [2019, 2022, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Understand",
    expectedTime: 240,
  },

  /* ─── How do Organisms Reproduce ─── */
  {
    chapter: "How do Organisms Reproduce",
    topic: "Asexual reproduction",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "Yeast reproduces asexually by:",
    options: ["Binary fission", "Multiple fission", "Budding", "Spore formation"],
    answer: 2,
    solution: {
      steps:
        "Yeast forms a small outgrowth (bud) on its surface that eventually detaches as a new individual.",
      commonMistakes: ["Confusing with bacteria (binary fission)"],
      relatedConcepts: ["Hydra also reproduces by budding", "Fragmentation in Spirogyra"],
    },
    yearsAsked: [2021, 2024],
    examType: "Board",
    frequencyScore: 7,
    bloomLevel: "Remember",
    expectedTime: 30,
  },

  /* ─── Heredity ─── */
  {
    chapter: "Heredity",
    topic: "Mendel's laws",
    type: "SA",
    marks: 3,
    difficulty: "Medium",
    question:
      "State Mendel's law of dominance and law of segregation with examples from his pea plant experiments.",
    options: null,
    answer:
      "Dominance: one allele masks the other in F1; Segregation: alleles separate during gamete formation.",
    solution: {
      steps:
        "**Law of Dominance**: When two pure parents differing in a contrasting character are crossed, only the dominant character appears in the F1 generation. Example: tall (TT) × dwarf (tt) → all tall (Tt) in F1.\n\n**Law of Segregation**: During gamete formation, the two alleles of a gene segregate (separate) so each gamete receives only one allele. Example: F1 Tt × Tt → F2 has 1 TT : 2 Tt : 1 tt (phenotype 3 tall : 1 dwarf).\n\nThis 3:1 phenotype ratio in F2 is direct evidence of segregation.",
      commonMistakes: [
        "Confusing dominance (F1) with segregation (F2)",
        "Stating ratio as 1:3 instead of 3:1",
      ],
      relatedConcepts: ["Law of independent assortment", "Punnett square"],
    },
    yearsAsked: [2020, 2023],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Understand",
    expectedTime: 240,
  },

  /* ─────────── CHEMISTRY ─────────── */

  /* ─── Chemical Reactions ─── */
  {
    chapter: "Chemical Reactions and Equations",
    topic: "Types of reactions",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "The reaction $\\text{Zn} + \\text{CuSO}_4 \\rightarrow \\text{ZnSO}_4 + \\text{Cu}$ is an example of:",
    options: [
      "Combination reaction",
      "Decomposition reaction",
      "Displacement reaction",
      "Double displacement reaction",
    ],
    answer: 2,
    solution: {
      steps:
        "Zinc, being more reactive than copper, displaces it from copper sulphate solution — a classic displacement reaction.",
      commonMistakes: ["Confusing with double displacement (involves swapping ions between two compounds)"],
      relatedConcepts: ["Reactivity series", "Redox in displacement reactions"],
    },
    yearsAsked: [2020, 2023, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Understand",
    expectedTime: 45,
  },
  {
    chapter: "Chemical Reactions and Equations",
    topic: "Balancing equations",
    type: "SA",
    marks: 2,
    difficulty: "Medium",
    question:
      "Balance the equation: $\\text{Fe}_2\\text{O}_3 + \\text{C} \\rightarrow \\text{Fe} + \\text{CO}_2$.",
    options: null,
    answer: "$2\\text{Fe}_2\\text{O}_3 + 3\\text{C} \\rightarrow 4\\text{Fe} + 3\\text{CO}_2$",
    solution: {
      steps:
        "Balance Fe: $\\text{Fe}_2\\text{O}_3 + \\text{C} \\rightarrow 2\\text{Fe} + \\text{CO}_2$.\n\nO: LHS has 3, RHS has 2 (per CO₂). Multiply $\\text{CO}_2$ by 3 and $\\text{Fe}_2\\text{O}_3$ by 2:\n\n$2\\text{Fe}_2\\text{O}_3 + \\text{C} \\rightarrow 4\\text{Fe} + 3\\text{CO}_2$.\n\nNow C: RHS has 3, LHS has 1. Multiply C by 3:\n\n$2\\text{Fe}_2\\text{O}_3 + 3\\text{C} \\rightarrow 4\\text{Fe} + 3\\text{CO}_2$.\n\nCheck: Fe 4=4, O 6=6, C 3=3 ✓.",
      commonMistakes: ["Changing subscripts instead of coefficients"],
      relatedConcepts: ["Law of conservation of mass"],
    },
    yearsAsked: [2019, 2022, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Apply",
    expectedTime: 180,
  },

  /* ─── Acids, Bases and Salts ─── */
  {
    chapter: "Acids, Bases and Salts",
    topic: "pH",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "A solution turns red litmus blue. Its pH is most likely:",
    options: ["1", "5", "7", "10"],
    answer: 3,
    solution: {
      steps:
        "Red litmus turns blue in a base. Basic solutions have pH > 7. Among the options, pH = 10 is the only basic value.",
      commonMistakes: ["Mixing red and blue litmus behaviour"],
      relatedConcepts: ["pH scale 0–14, 7 = neutral", "Universal indicator colours"],
    },
    yearsAsked: [2020, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Remember",
    expectedTime: 30,
  },
  {
    chapter: "Acids, Bases and Salts",
    topic: "Salts",
    type: "SA",
    marks: 3,
    difficulty: "Medium",
    question:
      "Give the chemical formula of (a) baking soda, (b) washing soda, (c) bleaching powder. Mention one use of each.",
    options: null,
    answer:
      "(a) NaHCO₃ — antacid / leavening agent; (b) Na₂CO₃·10H₂O — cleaning, water softening; (c) CaOCl₂ — disinfectant / bleach in textile",
    solution: {
      steps:
        "(a) Baking soda: **NaHCO₃** (sodium hydrogen carbonate). Used as an antacid and as a leavening agent in baking.\n\n(b) Washing soda: **Na₂CO₃·10H₂O** (sodium carbonate decahydrate). Used for laundry cleaning and to remove permanent hardness from water.\n\n(c) Bleaching powder: **CaOCl₂** (calcium oxychloride). Used as a disinfectant in drinking water and as a bleach in textile / paper industries.",
      commonMistakes: ["Mixing up washing soda formula with that of sodium hydroxide"],
      relatedConcepts: ["Plaster of Paris (CaSO₄·½H₂O)", "Olum"],
    },
    yearsAsked: [2019, 2023, 2024],
    examType: "Board",
    frequencyScore: 9,
    bloomLevel: "Remember",
    expectedTime: 240,
  },

  /* ─── Metals and Non-metals ─── */
  {
    chapter: "Metals and Non-metals",
    topic: "Reactivity series",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "Which of the following metals does NOT react with cold water?",
    options: ["Sodium", "Potassium", "Calcium", "Iron"],
    answer: 3,
    solution: {
      steps:
        "Na, K, Ca react vigorously with cold water. Iron does not react with cold water — it reacts only with steam (Fe + H₂O → Fe₃O₄ + H₂).",
      commonMistakes: ["Forgetting that reactivity decreases down the series"],
      relatedConcepts: ["Reactivity series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > Cu > Hg > Ag > Au"],
    },
    yearsAsked: [2021, 2024],
    examType: "Board",
    frequencyScore: 7,
    bloomLevel: "Understand",
    expectedTime: 45,
  },

  /* ─── Carbon and its Compounds ─── */
  {
    chapter: "Carbon and its Compounds",
    topic: "Functional groups",
    type: "SA",
    marks: 2,
    difficulty: "Easy",
    question:
      "Name the functional group present in (a) CH₃COOH and (b) CH₃CH₂OH.",
    options: null,
    answer: "(a) Carboxylic acid (-COOH), (b) Alcohol (-OH)",
    solution: {
      steps:
        "(a) CH₃COOH (acetic acid / ethanoic acid) — contains the **carboxylic acid** group $-\\text{COOH}$.\n\n(b) CH₃CH₂OH (ethanol) — contains the **hydroxyl / alcohol** group $-\\text{OH}$.",
      commonMistakes: ["Calling -OH a 'water group'"],
      relatedConcepts: ["Aldehyde -CHO", "Ketone >C=O", "Halide -X"],
    },
    yearsAsked: [2020, 2023, 2024],
    examType: "Board",
    frequencyScore: 8,
    bloomLevel: "Remember",
    expectedTime: 90,
  },
  {
    chapter: "Carbon and its Compounds",
    topic: "Soaps and detergents",
    type: "LA",
    marks: 5,
    difficulty: "Hard",
    question:
      "Explain the cleansing action of soap. Why does soap not work effectively in hard water?",
    options: null,
    answer:
      "Soap micelles trap oil/dirt in their hydrophobic core, dispersing it in water. Hard water has Ca²⁺/Mg²⁺ which form insoluble scum with soap, wasting it.",
    solution: {
      steps:
        "**Structure of soap**: a long hydrocarbon tail (hydrophobic, oil-loving) attached to a polar head (hydrophilic, water-loving — typically -COO⁻Na⁺).\n\n**Cleansing action**: when soap is added to water containing oily dirt, the hydrophobic tails embed themselves in the oil droplet while the hydrophilic heads face the water. This forms a spherical structure called a **micelle**. The oil is trapped in the centre and the whole micelle is suspended in water as an emulsion. Mechanical agitation washes it away.\n\n**In hard water**: Ca²⁺ and Mg²⁺ ions react with the soap anions to form insoluble calcium/magnesium salts (scum). This consumes soap without producing lather, reducing cleaning efficiency. Detergents avoid this because their calcium/magnesium salts are still soluble.",
      commonMistakes: [
        "Drawing only the soap molecule without the micelle structure",
        "Saying hard water 'kills' soap (it precipitates it)",
      ],
      relatedConcepts: ["Emulsion", "Detergents (synthetic surfactants)"],
    },
    yearsAsked: [2018, 2022, 2024],
    examType: "Board",
    frequencyScore: 9,
    bloomLevel: "Analyze",
    expectedTime: 600,
  },

  /* ─── Sources of Energy ─── */
  {
    chapter: "Sources of Energy",
    topic: "Renewable energy",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    question:
      "Which of the following is NOT a renewable source of energy?",
    options: ["Solar energy", "Wind energy", "Natural gas", "Hydroelectric energy"],
    answer: 2,
    solution: {
      steps:
        "Natural gas is a fossil fuel — non-renewable. Solar, wind, and hydro are renewable.",
      commonMistakes: ["Confusing 'natural' with 'renewable'"],
      relatedConcepts: ["Biomass", "Geothermal", "Tidal energy"],
    },
    yearsAsked: [2019, 2023],
    examType: "Board",
    frequencyScore: 6,
    bloomLevel: "Remember",
    expectedTime: 30,
  },
];
