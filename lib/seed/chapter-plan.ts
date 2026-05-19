/**
 * Master chapter list for AI generation.
 * Each entry tells the seeder how many questions to generate per chapter
 * and what difficulty mix to aim for.
 */

export type ChapterPlan = {
  subject: string;
  class: 10 | 12;
  chapter: string;
  /** Topics within the chapter — Claude will rotate through these */
  topics: string[];
  /** Total questions to generate for this chapter */
  count: number;
  /** Question-type distribution (approximate) */
  typeMix?: { MCQ?: number; SA?: number; LA?: number; AssertionReason?: number; CaseStudy?: number };
};

export const CLASS_10_PLAN: ChapterPlan[] = [
  /* ─── MATH ─── */
  {
    subject: "math",
    class: 10,
    chapter: "Real Numbers",
    topics: ["HCF and LCM", "Irrational numbers", "Euclid's lemma", "Fundamental theorem of arithmetic"],
    count: 8,
    typeMix: { MCQ: 4, SA: 3, LA: 1 },
  },
  {
    subject: "math",
    class: 10,
    chapter: "Polynomials",
    topics: ["Zeros of polynomial", "Sum and product of zeros", "Division algorithm"],
    count: 8,
    typeMix: { MCQ: 3, SA: 3, LA: 2 },
  },
  {
    subject: "math",
    class: 10,
    chapter: "Pair of Linear Equations",
    topics: ["Consistency", "Graphical method", "Substitution", "Elimination", "Word problems"],
    count: 10,
    typeMix: { MCQ: 3, SA: 3, LA: 3, CaseStudy: 1 },
  },
  {
    subject: "math",
    class: 10,
    chapter: "Quadratic Equations",
    topics: ["Nature of roots", "Quadratic formula", "Word problems", "Discriminant"],
    count: 10,
    typeMix: { MCQ: 3, SA: 3, LA: 3, CaseStudy: 1 },
  },
  {
    subject: "math",
    class: 10,
    chapter: "Arithmetic Progressions",
    topics: ["nth term", "Sum of n terms", "Word problems"],
    count: 8,
    typeMix: { MCQ: 3, SA: 3, LA: 2 },
  },
  {
    subject: "math",
    class: 10,
    chapter: "Triangles",
    topics: ["Similarity", "BPT/Thales", "Pythagoras", "AAA criterion"],
    count: 9,
    typeMix: { MCQ: 3, AssertionReason: 1, SA: 3, LA: 2 },
  },
  {
    subject: "math",
    class: 10,
    chapter: "Coordinate Geometry",
    topics: ["Distance formula", "Section formula", "Midpoint", "Area of triangle"],
    count: 8,
    typeMix: { MCQ: 3, SA: 3, LA: 2 },
  },
  {
    subject: "math",
    class: 10,
    chapter: "Introduction to Trigonometry",
    topics: ["Standard angles", "Identities", "Complementary angles"],
    count: 9,
    typeMix: { MCQ: 3, SA: 4, LA: 2 },
  },
  {
    subject: "math",
    class: 10,
    chapter: "Some Applications of Trigonometry",
    topics: ["Heights and distances", "Angles of elevation", "Angles of depression"],
    count: 7,
    typeMix: { MCQ: 1, SA: 2, LA: 4 },
  },
  {
    subject: "math",
    class: 10,
    chapter: "Circles",
    topics: ["Tangent properties", "Tangent length", "Two-tangent theorem"],
    count: 7,
    typeMix: { MCQ: 3, SA: 2, LA: 2 },
  },
  {
    subject: "math",
    class: 10,
    chapter: "Areas Related to Circles",
    topics: ["Sector area", "Segment area", "Length of arc"],
    count: 6,
    typeMix: { MCQ: 2, SA: 2, LA: 2 },
  },
  {
    subject: "math",
    class: 10,
    chapter: "Surface Areas and Volumes",
    topics: ["Combined solids", "Frustum", "Cylinder + hemisphere", "Cone + cylinder"],
    count: 8,
    typeMix: { MCQ: 2, SA: 2, LA: 4 },
  },
  {
    subject: "math",
    class: 10,
    chapter: "Statistics",
    topics: ["Mean of grouped data", "Median", "Mode", "Step deviation"],
    count: 7,
    typeMix: { MCQ: 2, SA: 3, LA: 2 },
  },
  {
    subject: "math",
    class: 10,
    chapter: "Probability",
    topics: ["Cards / coins / dice", "Bag problems", "Geometric probability"],
    count: 7,
    typeMix: { MCQ: 3, SA: 3, LA: 1 },
  },

  /* ─── SCIENCE ─── */
  {
    subject: "science",
    class: 10,
    chapter: "Light - Reflection and Refraction",
    topics: ["Lens formula", "Mirror formula", "Refractive index", "Power of lens", "Ray diagrams"],
    count: 10,
    typeMix: { MCQ: 3, SA: 3, LA: 3, CaseStudy: 1 },
  },
  {
    subject: "science",
    class: 10,
    chapter: "The Human Eye and the Colourful World",
    topics: ["Defects of vision", "Dispersion", "Scattering", "Atmospheric refraction"],
    count: 6,
    typeMix: { MCQ: 2, SA: 2, LA: 2 },
  },
  {
    subject: "science",
    class: 10,
    chapter: "Electricity",
    topics: ["Ohm's law", "Series and parallel", "Power and energy", "Joule's law", "Resistivity"],
    count: 12,
    typeMix: { MCQ: 4, SA: 3, LA: 4, CaseStudy: 1 },
  },
  {
    subject: "science",
    class: 10,
    chapter: "Magnetic Effects of Electric Current",
    topics: ["Right-hand rule", "Solenoid", "Electromagnetic induction", "Generator", "Motor"],
    count: 8,
    typeMix: { MCQ: 3, SA: 3, LA: 2 },
  },
  {
    subject: "science",
    class: 10,
    chapter: "Life Processes",
    topics: ["Respiration", "Digestive system", "Photosynthesis", "Circulation", "Excretion"],
    count: 12,
    typeMix: { MCQ: 4, SA: 4, LA: 4 },
  },
  {
    subject: "science",
    class: 10,
    chapter: "Control and Coordination",
    topics: ["Plant hormones", "Reflex action", "Nervous system", "Endocrine glands"],
    count: 8,
    typeMix: { MCQ: 3, SA: 3, LA: 2 },
  },
  {
    subject: "science",
    class: 10,
    chapter: "How do Organisms Reproduce",
    topics: ["Asexual reproduction", "Sexual reproduction in plants", "Human reproductive system"],
    count: 7,
    typeMix: { MCQ: 3, SA: 2, LA: 2 },
  },
  {
    subject: "science",
    class: 10,
    chapter: "Heredity",
    topics: ["Mendel's laws", "Sex determination", "Inherited traits"],
    count: 6,
    typeMix: { MCQ: 2, SA: 2, LA: 2 },
  },
  {
    subject: "science",
    class: 10,
    chapter: "Our Environment",
    topics: ["Ecosystem", "Food chain", "Ozone depletion", "Waste management"],
    count: 5,
    typeMix: { MCQ: 2, SA: 2, LA: 1 },
  },
  {
    subject: "science",
    class: 10,
    chapter: "Chemical Reactions and Equations",
    topics: ["Types of reactions", "Balancing equations", "Redox", "Corrosion"],
    count: 9,
    typeMix: { MCQ: 3, SA: 3, LA: 3 },
  },
  {
    subject: "science",
    class: 10,
    chapter: "Acids, Bases and Salts",
    topics: ["pH", "Salts", "Indicators", "Reactions of acids and bases"],
    count: 9,
    typeMix: { MCQ: 3, SA: 3, LA: 3 },
  },
  {
    subject: "science",
    class: 10,
    chapter: "Metals and Non-metals",
    topics: ["Reactivity series", "Extraction of metals", "Corrosion", "Alloys"],
    count: 9,
    typeMix: { MCQ: 3, SA: 3, LA: 3 },
  },
  {
    subject: "science",
    class: 10,
    chapter: "Carbon and its Compounds",
    topics: ["Functional groups", "Soaps and detergents", "Homologous series", "Ethanol", "Acetic acid"],
    count: 10,
    typeMix: { MCQ: 3, SA: 3, LA: 3, CaseStudy: 1 },
  },

  /* ─── SOCIAL SCIENCE ─── */
  {
    subject: "sst",
    class: 10,
    chapter: "Nationalism in India",
    topics: ["Non-Cooperation Movement", "Civil Disobedience", "Salt March", "Gandhi's role"],
    count: 8,
    typeMix: { MCQ: 3, SA: 3, LA: 2 },
  },
  {
    subject: "sst",
    class: 10,
    chapter: "Rise of Nationalism in Europe",
    topics: ["French Revolution", "Italian unification", "German unification", "Romanticism"],
    count: 6,
    typeMix: { MCQ: 2, SA: 2, LA: 2 },
  },
  {
    subject: "sst",
    class: 10,
    chapter: "The Making of a Global World",
    topics: ["Silk routes", "Industrial Revolution", "Inter-war economy", "Bretton Woods"],
    count: 6,
    typeMix: { MCQ: 2, SA: 2, LA: 2 },
  },
  {
    subject: "sst",
    class: 10,
    chapter: "Resources and Development",
    topics: ["Types of resources", "Land use", "Soil types", "Soil erosion"],
    count: 7,
    typeMix: { MCQ: 3, SA: 2, LA: 2 },
  },
  {
    subject: "sst",
    class: 10,
    chapter: "Water Resources",
    topics: ["Hydraulic structures", "Multipurpose projects", "Rainwater harvesting"],
    count: 5,
    typeMix: { MCQ: 2, SA: 2, LA: 1 },
  },
  {
    subject: "sst",
    class: 10,
    chapter: "Agriculture",
    topics: ["Cropping patterns", "Major crops", "Green Revolution", "Government policies"],
    count: 7,
    typeMix: { MCQ: 3, SA: 2, LA: 2 },
  },
  {
    subject: "sst",
    class: 10,
    chapter: "Minerals and Energy Resources",
    topics: ["Iron ore distribution", "Non-conventional energy", "Conservation"],
    count: 5,
    typeMix: { MCQ: 2, SA: 2, LA: 1 },
  },
  {
    subject: "sst",
    class: 10,
    chapter: "Power Sharing",
    topics: ["Belgium model", "Sri Lanka", "Forms of power sharing"],
    count: 5,
    typeMix: { MCQ: 2, SA: 2, LA: 1 },
  },
  {
    subject: "sst",
    class: 10,
    chapter: "Federalism",
    topics: ["Types of federations", "Indian federalism", "Decentralisation", "Local government"],
    count: 6,
    typeMix: { MCQ: 2, SA: 2, LA: 2 },
  },
  {
    subject: "sst",
    class: 10,
    chapter: "Democracy and Diversity",
    topics: ["Origins of social division", "Caste, religion, gender in politics"],
    count: 5,
    typeMix: { MCQ: 2, SA: 2, LA: 1 },
  },
  {
    subject: "sst",
    class: 10,
    chapter: "Political Parties",
    topics: ["Need for parties", "National vs regional parties", "Challenges to parties"],
    count: 6,
    typeMix: { MCQ: 2, SA: 2, LA: 2 },
  },
  {
    subject: "sst",
    class: 10,
    chapter: "Development",
    topics: ["GDP vs HDI", "Sustainable development", "Per capita income"],
    count: 5,
    typeMix: { MCQ: 2, SA: 2, LA: 1 },
  },
  {
    subject: "sst",
    class: 10,
    chapter: "Sectors of the Indian Economy",
    topics: ["Primary/Secondary/Tertiary", "Organised/Unorganised", "MGNREGA"],
    count: 6,
    typeMix: { MCQ: 2, SA: 2, LA: 2 },
  },
  {
    subject: "sst",
    class: 10,
    chapter: "Money and Credit",
    topics: ["Functions of money", "Formal vs informal credit", "Self-help groups"],
    count: 5,
    typeMix: { MCQ: 2, SA: 2, LA: 1 },
  },
  {
    subject: "sst",
    class: 10,
    chapter: "Globalisation and the Indian Economy",
    topics: ["MNCs", "Liberalisation", "WTO", "Fair globalisation"],
    count: 5,
    typeMix: { MCQ: 2, SA: 2, LA: 1 },
  },

  /* ─── ENGLISH (Literature + Grammar focus) ─── */
  {
    subject: "english",
    class: 10,
    chapter: "A Letter to God",
    topics: ["Character of Lencho", "Themes", "Symbolism", "Faith"],
    count: 5,
    typeMix: { MCQ: 2, SA: 2, LA: 1 },
  },
  {
    subject: "english",
    class: 10,
    chapter: "Nelson Mandela: Long Walk to Freedom",
    topics: ["Apartheid", "Mandela's inauguration", "Freedom", "Reconciliation"],
    count: 5,
    typeMix: { MCQ: 2, SA: 2, LA: 1 },
  },
  {
    subject: "english",
    class: 10,
    chapter: "Two Stories About Flying",
    topics: ["The young seagull", "Black aeroplane", "Courage", "Fear"],
    count: 4,
    typeMix: { MCQ: 2, SA: 1, LA: 1 },
  },
  {
    subject: "english",
    class: 10,
    chapter: "From the Diary of Anne Frank",
    topics: ["Anne's character", "Loneliness", "School life", "Writing as expression"],
    count: 5,
    typeMix: { MCQ: 2, SA: 2, LA: 1 },
  },
  {
    subject: "english",
    class: 10,
    chapter: "Glimpses of India",
    topics: ["A Baker from Goa", "Coorg", "Tea from Assam"],
    count: 5,
    typeMix: { MCQ: 2, SA: 2, LA: 1 },
  },
  {
    subject: "english",
    class: 10,
    chapter: "Mijbil the Otter",
    topics: ["Maxwell's bond with Mij", "Otter's playful behaviour"],
    count: 4,
    typeMix: { MCQ: 2, SA: 1, LA: 1 },
  },
  {
    subject: "english",
    class: 10,
    chapter: "Madam Rides the Bus",
    topics: ["Valli's character", "Independence", "Journey as metaphor"],
    count: 4,
    typeMix: { MCQ: 2, SA: 1, LA: 1 },
  },
  {
    subject: "english",
    class: 10,
    chapter: "The Sermon at Benares",
    topics: ["Buddha's teachings", "Kisa Gotami", "Suffering and acceptance"],
    count: 4,
    typeMix: { MCQ: 1, SA: 2, LA: 1 },
  },
  {
    subject: "english",
    class: 10,
    chapter: "Poems",
    topics: ["Dust of Snow (Frost)", "Fire and Ice (Frost)", "A Tiger in the Zoo", "How to Tell Wild Animals"],
    count: 8,
    typeMix: { MCQ: 4, SA: 2, LA: 2 },
  },
  {
    subject: "english",
    class: 10,
    chapter: "Grammar and Writing",
    topics: ["Tenses", "Modals", "Subject-verb agreement", "Letter writing", "Analytical paragraph"],
    count: 8,
    typeMix: { MCQ: 5, SA: 2, LA: 1 },
  },
];

/**
 * Class 12 plan — focused on the most-tested subjects across PCM / PCB /
 * Commerce / Humanities. Smaller per-chapter counts than Class 10 since
 * Class 12 chapters are denser; 6-8 questions cover the main patterns.
 */
export const CLASS_12_PLAN: ChapterPlan[] = [
  /* ─── PHYSICS (PCM + PCB) ─── */
  { subject: "physics", class: 12, chapter: "Electric Charges and Fields", topics: ["Coulomb's law", "Electric flux", "Gauss's law"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "physics", class: 12, chapter: "Electrostatic Potential and Capacitance", topics: ["Potential due to point charge", "Capacitors in series/parallel", "Dielectrics"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "physics", class: 12, chapter: "Current Electricity", topics: ["Ohm's law", "Kirchhoff's laws", "Wheatstone bridge", "Drift velocity"], count: 10, typeMix: { MCQ: 3, SA: 4, LA: 3 } },
  { subject: "physics", class: 12, chapter: "Moving Charges and Magnetism", topics: ["Biot-Savart law", "Ampere's law", "Moving coil galvanometer"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "physics", class: 12, chapter: "Electromagnetic Induction", topics: ["Faraday's law", "Lenz's law", "Self/mutual inductance"], count: 7, typeMix: { MCQ: 2, SA: 3, LA: 2 } },
  { subject: "physics", class: 12, chapter: "Alternating Current", topics: ["RMS values", "LCR circuit", "Resonance", "Transformer"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "physics", class: 12, chapter: "Ray Optics and Optical Instruments", topics: ["Lens formula", "Refraction at surfaces", "Total internal reflection", "Microscope", "Telescope"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "physics", class: 12, chapter: "Wave Optics", topics: ["Young's double-slit", "Diffraction", "Polarization"], count: 7, typeMix: { MCQ: 3, SA: 2, LA: 2 } },
  { subject: "physics", class: 12, chapter: "Dual Nature of Radiation and Matter", topics: ["Photoelectric effect", "de Broglie wavelength"], count: 6, typeMix: { MCQ: 3, SA: 2, LA: 1 } },
  { subject: "physics", class: 12, chapter: "Atoms and Nuclei", topics: ["Bohr model", "Hydrogen spectrum", "Radioactive decay", "Mass-energy"], count: 7, typeMix: { MCQ: 3, SA: 3, LA: 1 } },
  { subject: "physics", class: 12, chapter: "Semiconductor Electronics", topics: ["P-N junction", "Diode rectifier", "Transistor", "Logic gates"], count: 6, typeMix: { MCQ: 3, SA: 2, LA: 1 } },

  /* ─── CHEMISTRY (PCM + PCB) ─── */
  { subject: "chemistry", class: 12, chapter: "Solutions", topics: ["Mole fraction", "Molarity / molality", "Raoult's law", "Colligative properties"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "chemistry", class: 12, chapter: "Electrochemistry", topics: ["Nernst equation", "Conductivity", "Electrolysis", "Galvanic cell"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "chemistry", class: 12, chapter: "Chemical Kinetics", topics: ["Rate of reaction", "Order/molecularity", "Arrhenius equation", "Half-life"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "chemistry", class: 12, chapter: "d and f Block Elements", topics: ["Transition metal properties", "Oxidation states", "Lanthanide contraction"], count: 7, typeMix: { MCQ: 3, SA: 2, LA: 2 } },
  { subject: "chemistry", class: 12, chapter: "Coordination Compounds", topics: ["Werner's theory", "IUPAC naming", "Crystal field theory", "Isomerism"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "chemistry", class: 12, chapter: "Haloalkanes and Haloarenes", topics: ["Nucleophilic substitution (SN1/SN2)", "Reactions"], count: 7, typeMix: { MCQ: 3, SA: 2, LA: 2 } },
  { subject: "chemistry", class: 12, chapter: "Alcohols, Phenols and Ethers", topics: ["Preparation", "Reactions", "Tests"], count: 7, typeMix: { MCQ: 3, SA: 2, LA: 2 } },
  { subject: "chemistry", class: 12, chapter: "Aldehydes, Ketones and Carboxylic Acids", topics: ["Aldol condensation", "Cannizzaro", "Tests"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "chemistry", class: 12, chapter: "Amines", topics: ["Preparation", "Basic strength", "Hinsberg test", "Diazotisation"], count: 7, typeMix: { MCQ: 3, SA: 2, LA: 2 } },
  { subject: "chemistry", class: 12, chapter: "Biomolecules", topics: ["Carbohydrates", "Proteins", "Enzymes", "Nucleic acids"], count: 6, typeMix: { MCQ: 3, SA: 2, LA: 1 } },

  /* ─── MATHEMATICS (PCM + Commerce) ─── */
  { subject: "math", class: 12, chapter: "Relations and Functions", topics: ["Types of relations", "Bijective functions", "Composition", "Inverse"], count: 7, typeMix: { MCQ: 3, SA: 2, LA: 2 } },
  { subject: "math", class: 12, chapter: "Inverse Trigonometric Functions", topics: ["Principal values", "Properties", "Identities"], count: 7, typeMix: { MCQ: 3, SA: 2, LA: 2 } },
  { subject: "math", class: 12, chapter: "Matrices", topics: ["Operations", "Inverse", "Symmetric/Skew-symmetric"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "math", class: 12, chapter: "Determinants", topics: ["Properties", "Area of triangle", "System of linear equations"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "math", class: 12, chapter: "Continuity and Differentiability", topics: ["Continuity at point", "Chain rule", "Logarithmic differentiation"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "math", class: 12, chapter: "Application of Derivatives", topics: ["Rate of change", "Increasing/decreasing", "Maxima/minima", "Tangents/normals"], count: 9, typeMix: { MCQ: 3, SA: 3, LA: 3 } },
  { subject: "math", class: 12, chapter: "Integrals", topics: ["Indefinite integrals", "Definite integrals", "Substitution", "Integration by parts"], count: 10, typeMix: { MCQ: 3, SA: 4, LA: 3 } },
  { subject: "math", class: 12, chapter: "Application of Integrals", topics: ["Area under curves", "Area between curves"], count: 6, typeMix: { MCQ: 2, SA: 2, LA: 2 } },
  { subject: "math", class: 12, chapter: "Differential Equations", topics: ["Order/degree", "Variable separable", "Linear DE", "Homogeneous"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "math", class: 12, chapter: "Vector Algebra", topics: ["Dot product", "Cross product", "Direction cosines"], count: 7, typeMix: { MCQ: 3, SA: 2, LA: 2 } },
  { subject: "math", class: 12, chapter: "Three Dimensional Geometry", topics: ["Line equations", "Plane equations", "Angle between lines/planes", "Shortest distance"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "math", class: 12, chapter: "Linear Programming", topics: ["Graphical method", "Feasible region", "Optimisation"], count: 5, typeMix: { MCQ: 2, SA: 1, LA: 2 } },
  { subject: "math", class: 12, chapter: "Probability", topics: ["Conditional probability", "Bayes' theorem", "Random variables", "Binomial distribution"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },

  /* ─── BIOLOGY (PCB) ─── */
  { subject: "biology", class: 12, chapter: "Reproduction in Organisms", topics: ["Asexual", "Sexual", "Life-spans"], count: 5, typeMix: { MCQ: 2, SA: 2, LA: 1 } },
  { subject: "biology", class: 12, chapter: "Sexual Reproduction in Flowering Plants", topics: ["Pollination", "Double fertilization", "Embryo development"], count: 7, typeMix: { MCQ: 3, SA: 2, LA: 2 } },
  { subject: "biology", class: 12, chapter: "Human Reproduction", topics: ["Male/female systems", "Gametogenesis", "Menstrual cycle", "Implantation"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "biology", class: 12, chapter: "Reproductive Health", topics: ["Contraception", "STDs", "Assisted reproductive tech"], count: 5, typeMix: { MCQ: 2, SA: 2, LA: 1 } },
  { subject: "biology", class: 12, chapter: "Principles of Inheritance and Variation", topics: ["Mendelian inheritance", "Sex-linkage", "Pedigree", "Mutations"], count: 9, typeMix: { MCQ: 3, SA: 3, LA: 3 } },
  { subject: "biology", class: 12, chapter: "Molecular Basis of Inheritance", topics: ["DNA structure", "Replication", "Transcription", "Translation", "Lac operon"], count: 10, typeMix: { MCQ: 3, SA: 4, LA: 3 } },
  { subject: "biology", class: 12, chapter: "Evolution", topics: ["Theories", "Hardy-Weinberg", "Speciation"], count: 6, typeMix: { MCQ: 3, SA: 2, LA: 1 } },
  { subject: "biology", class: 12, chapter: "Human Health and Disease", topics: ["Immunity", "AIDS", "Cancer", "Drugs/alcohol"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "biology", class: 12, chapter: "Microbes in Human Welfare", topics: ["Household products", "Industrial use", "Sewage", "Biofertilizers"], count: 5, typeMix: { MCQ: 2, SA: 2, LA: 1 } },
  { subject: "biology", class: 12, chapter: "Biotechnology Principles and Processes", topics: ["Recombinant DNA", "PCR", "Cloning vectors", "Restriction enzymes"], count: 7, typeMix: { MCQ: 3, SA: 2, LA: 2 } },
  { subject: "biology", class: 12, chapter: "Biotechnology and its Applications", topics: ["GM crops", "Insulin production", "Gene therapy"], count: 6, typeMix: { MCQ: 3, SA: 2, LA: 1 } },
  { subject: "biology", class: 12, chapter: "Ecosystem", topics: ["Trophic levels", "Energy flow", "Productivity", "Nutrient cycling"], count: 7, typeMix: { MCQ: 3, SA: 2, LA: 2 } },

  /* ─── ACCOUNTANCY (Commerce) ─── */
  { subject: "accountancy", class: 12, chapter: "Accounting for Partnership Firms", topics: ["Profit-sharing ratio", "Goodwill", "Admission of partner", "Retirement"], count: 9, typeMix: { MCQ: 3, SA: 3, LA: 3 } },
  { subject: "accountancy", class: 12, chapter: "Dissolution of Partnership", topics: ["Realisation account", "Loss/gain settlement"], count: 6, typeMix: { MCQ: 2, SA: 2, LA: 2 } },
  { subject: "accountancy", class: 12, chapter: "Accounting for Companies — Share Capital", topics: ["Issue of shares", "Forfeiture", "Re-issue"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "accountancy", class: 12, chapter: "Accounting for Debentures", topics: ["Issue", "Redemption", "Sinking fund"], count: 6, typeMix: { MCQ: 2, SA: 2, LA: 2 } },
  { subject: "accountancy", class: 12, chapter: "Analysis of Financial Statements", topics: ["Comparative statements", "Common-size statements", "Ratios"], count: 7, typeMix: { MCQ: 3, SA: 2, LA: 2 } },
  { subject: "accountancy", class: 12, chapter: "Cash Flow Statement", topics: ["Operating activities", "Investing activities", "Financing activities"], count: 6, typeMix: { MCQ: 2, SA: 2, LA: 2 } },

  /* ─── ECONOMICS (Commerce + Humanities) ─── */
  { subject: "economics", class: 12, chapter: "Introductory Microeconomics", topics: ["Demand & supply", "Elasticity", "Equilibrium", "Producer's behaviour"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "economics", class: 12, chapter: "Theory of Consumer Behaviour", topics: ["Utility analysis", "Indifference curves", "Budget line"], count: 6, typeMix: { MCQ: 2, SA: 2, LA: 2 } },
  { subject: "economics", class: 12, chapter: "Forms of Market", topics: ["Perfect competition", "Monopoly", "Monopolistic", "Oligopoly"], count: 6, typeMix: { MCQ: 3, SA: 2, LA: 1 } },
  { subject: "economics", class: 12, chapter: "National Income Accounting", topics: ["GDP", "GNP", "NDP", "Income method", "Expenditure method"], count: 8, typeMix: { MCQ: 3, SA: 3, LA: 2 } },
  { subject: "economics", class: 12, chapter: "Money and Banking", topics: ["Functions of money", "Banks", "Money supply", "RBI"], count: 6, typeMix: { MCQ: 3, SA: 2, LA: 1 } },
  { subject: "economics", class: 12, chapter: "Government Budget", topics: ["Revenue receipts", "Capital receipts", "Deficits"], count: 5, typeMix: { MCQ: 2, SA: 2, LA: 1 } },
  { subject: "economics", class: 12, chapter: "Balance of Payments", topics: ["Current account", "Capital account", "Forex rate"], count: 5, typeMix: { MCQ: 2, SA: 2, LA: 1 } },

  /* ─── ENGLISH (all streams) ─── */
  { subject: "english", class: 12, chapter: "The Last Lesson (Flamingo)", topics: ["Theme of nationalism", "Language and identity", "Franz", "M. Hamel"], count: 5, typeMix: { MCQ: 2, SA: 2, LA: 1 } },
  { subject: "english", class: 12, chapter: "Lost Spring (Flamingo)", topics: ["Child labour", "Saheb", "Mukesh", "Poverty cycle"], count: 5, typeMix: { MCQ: 2, SA: 2, LA: 1 } },
  { subject: "english", class: 12, chapter: "Deep Water (Flamingo)", topics: ["Fear of water", "Conquering phobias", "Douglas's journey"], count: 4, typeMix: { MCQ: 2, SA: 1, LA: 1 } },
  { subject: "english", class: 12, chapter: "Indigo (Flamingo)", topics: ["Gandhi's Champaran movement", "Sharecropping system"], count: 5, typeMix: { MCQ: 2, SA: 2, LA: 1 } },
  { subject: "english", class: 12, chapter: "The Rattrap (Flamingo)", topics: ["Themes of compassion", "World as a rattrap"], count: 4, typeMix: { MCQ: 2, SA: 1, LA: 1 } },
  { subject: "english", class: 12, chapter: "Flamingo Poems", topics: ["My Mother at Sixty-Six", "Keeping Quiet", "A Thing of Beauty", "Aunt Jennifer's Tigers"], count: 8, typeMix: { MCQ: 4, SA: 2, LA: 2 } },
  { subject: "english", class: 12, chapter: "Vistas — The Third Level", topics: ["Escapism", "Time travel motif"], count: 4, typeMix: { MCQ: 2, SA: 1, LA: 1 } },
  { subject: "english", class: 12, chapter: "Vistas — The Tiger King", topics: ["Satire on power", "Allegory"], count: 4, typeMix: { MCQ: 2, SA: 1, LA: 1 } },
  { subject: "english", class: 12, chapter: "Writing Skills (Class 12)", topics: ["Notice writing", "Letter writing", "Article writing", "Report writing"], count: 8, typeMix: { MCQ: 4, SA: 2, LA: 2 } },
];

/** Compute total budget across the plan. */
export function planSummary(plan: ChapterPlan[] = CLASS_10_PLAN) {
  const bySubject = new Map<string, number>();
  let total = 0;
  for (const c of plan) {
    bySubject.set(c.subject, (bySubject.get(c.subject) ?? 0) + c.count);
    total += c.count;
  }
  return { total, bySubject };
}
