/**
 * Gen-Z & emerging careers — Round 3 (2026 catalogue).
 *
 * 30 careers across what students actually want to do right now:
 *   - AI ethics, prompt engineering, generative AI artist
 *   - Sustainability / ESG / climate-tech tracks
 *   - Creator economy: podcaster, music producer, cinematographer,
 *     film editor, drone operator, cosplayer, NFT artist
 *   - Wellness + mental health: mindfulness coach, sports psych
 *   - Hard-emerging tech: space researcher, quantum cryptographer,
 *     genomics, edge computing
 *   - Adventure / nature: marine tech, wildlife filmmaker, vertical farming
 *
 * Same SeedCareer shape — gets merged into CAREERS during seeding.
 */

import type { SeedCareer } from "./careers";

export const CAREERS_GENZ: SeedCareer[] = [
  /* ═══════════════════════ AI / EMERGING TECH ═══════════════════════ */
  {
    name: "Prompt Engineer / LLM Specialist",
    emoji: "🪄",
    category: "tech",
    description:
      "Design, test and iterate prompts for large language models (GPT, Claude, Gemini). The newest tech role on the block — every product team that ships AI features hires one. 2026 hiring boom.",
    dayInLife:
      "Test prompts across model versions, build evals, write meta-prompts, document patterns, train downstream teams. Heavy on writing skill + experimentation.",
    qualifications: [
      "B.Tech / B.Sc CS or strong portfolio + cert",
      "OpenAI / Anthropic LLM training",
      "Background in linguistics is a bonus",
    ],
    entranceExams: [
      { name: "JEE Main / BITSAT (for the CS degree route)", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" },
    ],
    salaryRanges: { entry: 1_200_000, mid: 3_500_000, senior: 8_000_000 },
    topColleges: ["IIT Bombay", "IIIT Hyderabad", "BITS Pilani"],
    skillsRequired: ["Writing", "Critical thinking", "Python", "Eval design", "ML basics"],
    interestTags: ["tech", "cs", "creative", "research"],
    preferredSubjects: ["english", "computer science", "math"],
    growthProspects:
      "From Prompt Engineer → AI Product Engineer → AI Lead. Top performers move to founding roles at AI startups.",
  },
  {
    name: "Generative AI Artist",
    emoji: "🎨",
    category: "design",
    description:
      "Use Midjourney, Stable Diffusion, Runway and custom models to produce art, ads, concept design, music videos. Indian agencies + Bollywood VFX hiring fast.",
    dayInLife:
      "Brief intake → prompt iteration → upscaling / inpainting → compositing → client review. Mix of art direction + technical fiddling.",
    qualifications: [
      "B.Des / Fine Arts OR self-taught + strong portfolio",
      "Comfort with Photoshop + ComfyUI + at least one diffusion model",
    ],
    entranceExams: [
      { name: "UCEED / NID DAT (for the degree route)", link: "https://www.uceed.iitb.ac.in", dates: "Jan" },
    ],
    salaryRanges: { entry: 600_000, mid: 1_800_000, senior: 4_500_000 },
    topColleges: ["NID Ahmedabad", "IIT Bombay IDC", "Pearl Academy", "Whistling Woods"],
    skillsRequired: ["Visual sense", "Prompting", "Compositing", "Color theory"],
    interestTags: ["design", "creative", "tech", "media"],
    preferredSubjects: ["english", "computer science"],
    growthProspects:
      "Freelance → studio artist at Prime Focus / DNEG → AI creative director. Strong India + Gulf market for ad campaigns.",
  },
  {
    name: "AI Ethics Researcher / Policy Analyst",
    emoji: "⚖️",
    category: "research",
    description:
      "Think + write about model bias, hallucinations, copyright, deepfakes, AI governance. Govt + NITI Aayog + private firms (Microsoft, Anthropic India) are hiring.",
    dayInLife:
      "Read papers, run audits on production models, draft policy briefs, attend govt consultations. Mix of philosophy, law, statistics.",
    qualifications: ["Bachelor's in Public Policy / CS / Philosophy", "MA / MPP / MS in AI Ethics"],
    entranceExams: [{ name: "CUET PG / GRE / TISS BAT", link: "https://cuet.nta.nic.in", dates: "Mar-Apr" }],
    salaryRanges: { entry: 800_000, mid: 2_200_000, senior: 5_000_000 },
    topColleges: ["IIT Madras Centre for Responsible AI", "NLU Delhi", "TISS Mumbai", "IIM Bangalore"],
    skillsRequired: ["Critical thinking", "Writing", "Stats literacy", "Policy reading"],
    interestTags: ["research", "humanities", "tech", "law"],
    preferredSubjects: ["english", "political science", "philosophy"],
    growthProspects:
      "Govt advisory (NITI Aayog, MEITY) + corporate roles + think tanks (Carnegie India, ORF). High prestige, medium pay.",
  },
  {
    name: "Genomics Engineer / Bio-AI Specialist",
    emoji: "🧬",
    category: "research",
    description:
      "Apply ML + statistics to DNA / RNA / protein data. India's genome sequencing push (Genome India Project) + global biotech boom make this one of the highest-leverage science careers.",
    dayInLife:
      "Pipeline genome data → train models → write papers → collaborate with wet-lab biologists. Pure CS + bio crossover.",
    qualifications: ["B.Tech Biotech / B.Sc Bio + Python", "M.Sc / PhD Bioinformatics"],
    entranceExams: [
      { name: "GAT-B (IISc + DBT)", link: "https://nta.ac.in", dates: "Apr" },
      { name: "JEE Main + IIIT-D Bioinformatics", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" },
    ],
    salaryRanges: { entry: 700_000, mid: 2_000_000, senior: 6_000_000 },
    topColleges: ["IIIT-Delhi (CB)", "IISc Bangalore", "IIT Madras", "TIGS Bangalore"],
    skillsRequired: ["Python", "ML", "Molecular biology", "Statistics"],
    interestTags: ["research", "biology", "tech", "math"],
    preferredSubjects: ["biology", "chemistry", "computer science", "math"],
    growthProspects:
      "Pharma R&D (Biocon, Dr Reddy's), MedaiCore, foreign post-doc → founding biotech startup. Genome India + precision medicine = decade-long runway.",
  },
  {
    name: "Quantum Cryptographer",
    emoji: "🔐",
    category: "research",
    description:
      "Build encryption that survives quantum computers. India's Quantum Mission ($1B+) is creating jobs at DRDO, IIT, IISc and private startups (QNu Labs, BosonQ).",
    dayInLife:
      "Theoretical proofs + simulation + protocol design + reading papers. Heavy math (linear algebra, number theory).",
    qualifications: ["B.Sc Math / Physics / B.Tech CSE", "PhD in Cryptography or Quantum Computing"],
    entranceExams: [
      { name: "JEE Advanced", link: "https://jeeadv.ac.in", dates: "May" },
      { name: "JEST Physics / TIFR GS", link: "https://www.jest.org.in", dates: "Feb" },
    ],
    salaryRanges: { entry: 800_000, mid: 2_500_000, senior: 8_000_000 },
    topColleges: ["IIT Madras", "IISc Bangalore", "TIFR Mumbai", "IIT Kanpur"],
    skillsRequired: ["Linear algebra", "Quantum mechanics", "Cryptography", "Python / Qiskit"],
    interestTags: ["research", "math", "tech", "logic"],
    preferredSubjects: ["math", "physics", "computer science"],
    growthProspects:
      "DRDO, ISRO labs, IBM Research India, Google Quantum AI. ~$1B National Quantum Mission funds the runway.",
  },
  {
    name: "Edge Computing / 5G Engineer",
    emoji: "📡",
    category: "engineering",
    description:
      "Build low-latency apps that run on 5G + edge nodes — autonomous vehicles, AR glasses, real-time industrial control. Reliance Jio + Airtel + private 5G campuses hiring hard.",
    dayInLife:
      "Network architecture, edge node deployment, app porting, latency optimization, on-call for 5G core.",
    qualifications: ["B.Tech ECE / CSE", "Cloud + Kubernetes certifications", "5G NR knowledge"],
    entranceExams: [{ name: "JEE Main", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" }],
    salaryRanges: { entry: 1_000_000, mid: 2_800_000, senior: 7_500_000 },
    topColleges: ["IIT Bombay", "IIT Madras", "BITS Pilani", "IIIT Hyderabad"],
    skillsRequired: ["Networking", "Kubernetes", "C++ / Go", "5G NR"],
    interestTags: ["tech", "engineering", "cs"],
    preferredSubjects: ["physics", "math", "computer science"],
    growthProspects:
      "Jio, Airtel, Ericsson, Nokia, Samsung. Strong runway as 5G private networks + edge AI roll out across India 2026-2030.",
  },

  /* ═══════════════════════ CREATOR ECONOMY ═══════════════════════ */
  {
    name: "Podcast Producer / Audio Storyteller",
    emoji: "🎙️",
    category: "media",
    description:
      "Independent or studio-employed creator of long-form audio. India's podcast audience crossed 100M in 2025 — major networks (JioSaavn, Spotify India, Audible) commissioning aggressively.",
    dayInLife:
      "Story development → guest research → recording → editing in Hindenburg / Pro Tools → distribution → analytics review.",
    qualifications: ["No formal — portfolio matters", "Mass Comm / Journalism (optional)"],
    entranceExams: [{ name: "Symbiosis SCMC entrance", link: "https://www.scmc.edu.in", dates: "Mar-Apr" }],
    salaryRanges: { entry: 300_000, mid: 1_200_000, senior: 4_000_000 },
    topColleges: ["FTII Pune (Sound Recording)", "SRFTI Kolkata", "Symbiosis SCMC Pune"],
    skillsRequired: ["Writing", "Audio editing", "Interviewing", "Distribution / SEO"],
    interestTags: ["media", "creative", "tech"],
    preferredSubjects: ["english", "psychology"],
    growthProspects:
      "Build your own show + brand deals + freelance for networks. Top Indian podcasters earn ₹40L-2Cr/yr.",
  },
  {
    name: "Music Producer / Beatmaker",
    emoji: "🎧",
    category: "media",
    description:
      "Make beats, mix songs, produce records for indie + film + brand campaigns. India's indie music renaissance (Karan Aujla, Hanumankind, Diljit) means real money for producers.",
    dayInLife:
      "Studio sessions, beat creation in Ableton / FL Studio, mixing, mastering. Night-owl friendly.",
    qualifications: ["Self-taught + portfolio", "Diploma in Music Production (SAE / True School)"],
    entranceExams: [],
    salaryRanges: { entry: 350_000, mid: 1_200_000, senior: 6_000_000 },
    topColleges: ["True School of Music Mumbai", "SAE Institute Mumbai", "Berklee India (Pune)"],
    skillsRequired: ["DAW (Ableton / FL Studio)", "Mixing", "Ear training", "Networking"],
    interestTags: ["media", "creative", "tech"],
    preferredSubjects: ["english", "physics"],
    growthProspects:
      "Indie artist collabs → label deals → film score → publishing royalties. Long-tail income via streaming + sync licensing.",
  },
  {
    name: "Cinematographer / DOP",
    emoji: "🎥",
    category: "media",
    description:
      "Director of Photography — design every frame of films, web series, music videos, ads. Bollywood + OTT renaissance keeps demand high; rates exploded post-pandemic.",
    dayInLife:
      "Pre-prod recces, lighting design, on-set camera operation, dailies review, DI sessions. Crazy hours during shoots.",
    qualifications: ["Diploma / Degree from FTII / SRFTI", "Strong reel + assistant work"],
    entranceExams: [
      { name: "FTII entrance", link: "https://www.ftiindia.com", dates: "Mar" },
      { name: "SRFTI entrance", link: "https://srfti.ac.in", dates: "Mar" },
    ],
    salaryRanges: { entry: 600_000, mid: 2_500_000, senior: 12_000_000 },
    topColleges: ["FTII Pune", "SRFTI Kolkata", "Whistling Woods Mumbai"],
    skillsRequired: ["Visual sense", "Lighting", "Camera tech", "Color theory", "Collaboration"],
    interestTags: ["media", "creative", "tech"],
    preferredSubjects: ["english", "physics"],
    growthProspects:
      "Indie shorts → music videos → ads → features. Top DOPs in India earn ₹5-10L per day on commercials.",
  },
  {
    name: "Film Editor / Colorist",
    emoji: "✂️",
    category: "media",
    description:
      "Cut films, web series, ads. Or specialise in DI / color grading. Both are in heavy demand on OTT shows + Bollywood + the YouTube long-form boom.",
    dayInLife:
      "Avid / Premiere / DaVinci Resolve. Logging dailies, building rough cuts, refining with director, DI / online finishing.",
    qualifications: ["FTII / SRFTI diploma OR strong portfolio", "Da Vinci / Avid certifications"],
    entranceExams: [{ name: "FTII / SRFTI entrance", link: "https://www.ftiindia.com", dates: "Mar" }],
    salaryRanges: { entry: 400_000, mid: 1_600_000, senior: 6_000_000 },
    topColleges: ["FTII Pune", "SRFTI Kolkata", "Whistling Woods Mumbai"],
    skillsRequired: ["Premiere / Avid / DaVinci", "Story sense", "Stamina", "Color theory"],
    interestTags: ["media", "creative", "tech"],
    preferredSubjects: ["english", "computer science"],
    growthProspects:
      "Assistant editor → editor → showrunner-favorite. Long-running shows + indie features + ad agency rosters.",
  },
  {
    name: "Drone Pilot / Aerial Cinematographer",
    emoji: "🚁",
    category: "media",
    description:
      "Operate commercial drones for film shoots, real estate, agriculture mapping, mining surveys. DGCA-licensed pilots are a small + well-paid pool.",
    dayInLife:
      "Site recces, flight planning + permits, on-location drone ops, footage handoff. High-risk = high-pay days.",
    qualifications: [
      "DGCA Remote Pilot Certificate (RPC)",
      "Film school degree optional but helps for cine work",
    ],
    entranceExams: [
      { name: "DGCA RPC", link: "https://digitalsky.dgca.gov.in", dates: "Rolling" },
    ],
    salaryRanges: { entry: 400_000, mid: 1_200_000, senior: 4_000_000 },
    topColleges: ["Indian Institute of Drones (Mumbai)", "Drone Destination Academy"],
    skillsRequired: ["Drone flight", "Aerial composition", "Post-processing", "Regulation knowledge"],
    interestTags: ["media", "tech", "engineering", "creative"],
    preferredSubjects: ["physics", "english"],
    growthProspects:
      "Film + ad + survey + agri-spray + delivery. India's drone industry is forecast ₹15,000Cr by 2030.",
  },
  {
    name: "Cosplay Designer / Costume Artist",
    emoji: "🦸",
    category: "design",
    description:
      "Design and build elaborate character costumes for films, comic cons, brand events, streamers. ComicCon India + anime explosion + Disney+ Hotstar marketing budgets fuel demand.",
    dayInLife:
      "Reference research, pattern making, prop fabrication, makeup tests, photo shoots. Mix of fashion design + sculpting + prop-making.",
    qualifications: ["B.Des Fashion / Costume Design", "Self-taught + portfolio OK"],
    entranceExams: [
      { name: "NIFT entrance", link: "https://www.nift.ac.in", dates: "Feb" },
      { name: "Pearl Academy entrance", link: "https://www.pearlacademy.com", dates: "Varies" },
    ],
    salaryRanges: { entry: 250_000, mid: 900_000, senior: 3_500_000 },
    topColleges: ["NIFT Delhi", "Pearl Academy", "NID Ahmedabad"],
    skillsRequired: ["Sewing / patterning", "Sculpting", "Makeup FX", "Reference research"],
    interestTags: ["creative", "design", "media"],
    preferredSubjects: ["english"],
    growthProspects:
      "Film + theatre + ComicCon circuit + brand activations + Twitch streamers commission custom suits. Strong global market via Etsy/Patreon.",
  },
  {
    name: "Brand Photographer / Content Creator",
    emoji: "📷",
    category: "media",
    description:
      "Shoot photography + short-form video for Instagram, brand campaigns, lookbooks. India's D2C boom (Mamaearth, Boat, Sugar) made this a real career, not a hobby.",
    dayInLife:
      "Concept boards, shoot day, editing in Lightroom / CapCut, posting + analytics. Mix of art + business.",
    qualifications: ["No formal — portfolio + Instagram following"],
    entranceExams: [],
    salaryRanges: { entry: 300_000, mid: 1_200_000, senior: 5_000_000 },
    topColleges: ["Light & Life Academy Ooty", "NID Photography"],
    skillsRequired: ["Composition", "Lighting", "Lightroom / CapCut", "Business sense", "DM negotiation"],
    interestTags: ["media", "creative", "design"],
    preferredSubjects: ["english"],
    growthProspects:
      "Freelance D2C clients → in-house brand creator → agency. Top brand photographers earn ₹50K-2L per campaign.",
  },
  {
    name: "Travel Vlogger / Travel Tech Creator",
    emoji: "🌏",
    category: "media",
    description:
      "Make travel content for YouTube + Instagram. India's outbound travel boom + new visa-free destinations (Thailand, Sri Lanka, Malaysia, Vietnam for Indians) is a content goldmine.",
    dayInLife:
      "Trip planning + booking + shooting + editing on the road. Brand partnerships + affiliate links + YouTube AdSense fund the lifestyle.",
    qualifications: ["No formal — channel matters"],
    entranceExams: [],
    salaryRanges: { entry: 200_000, mid: 1_500_000, senior: 8_000_000 },
    topColleges: ["No formal — start a channel"],
    skillsRequired: ["Storytelling", "Camera + editing", "On-camera presence", "Business of brand deals"],
    interestTags: ["media", "creative", "social"],
    preferredSubjects: ["english", "geography"],
    growthProspects:
      "Top travel YouTubers in India (Mountain Trekker, Indian Backpacker) earn ₹1-3Cr/yr from sponsorships + affiliates + tour businesses.",
  },
  {
    name: "Wildlife Cinematographer",
    emoji: "🐯",
    category: "media",
    description:
      "Shoot wildlife docs for Discovery, BBC Earth, Sony BBC Earth India, Netflix. India's 100+ tiger reserves + Western Ghats + Northeast = unmatched location library.",
    dayInLife:
      "Months on location, predawn waits, long lens setups, rough living. Editorial trips in cities between shoots.",
    qualifications: ["Photography + wildlife biology background", "FTII / specialised cine training"],
    entranceExams: [{ name: "FTII / SRFTI", link: "https://www.ftiindia.com", dates: "Mar" }],
    salaryRanges: { entry: 400_000, mid: 1_500_000, senior: 4_500_000 },
    topColleges: ["FTII Pune (Cinematography)", "WII Dehradun (Wildlife)"],
    skillsRequired: ["Patience", "Long-lens technique", "Field stamina", "Wildlife knowledge"],
    interestTags: ["media", "creative", "biology", "social"],
    preferredSubjects: ["biology", "english", "geography"],
    growthProspects:
      "BBC Studios India, Sony BBC Earth, Roundglass Sustain. National Geographic India + Discovery India both ramp local productions.",
  },

  /* ═══════════════════════ SUSTAINABILITY / CLIMATE ═══════════════════════ */
  {
    name: "Sustainability / ESG Consultant",
    emoji: "🌱",
    category: "commerce",
    description:
      "Advise companies on carbon footprint, ESG reporting, SEBI BRSR compliance. India's top 1,000 listed companies are now mandated to report ESG — huge job market.",
    dayInLife:
      "Client audits, GHG calculations, ESG report drafting, stakeholder interviews, compliance check-ins.",
    qualifications: ["MBA Sustainability / MSc Env Mgmt", "GRI certification"],
    entranceExams: [
      { name: "CAT", link: "https://iimcat.ac.in", dates: "Nov" },
      { name: "TERI University entrance", link: "https://www.teriin.org", dates: "Mar-Apr" },
    ],
    salaryRanges: { entry: 800_000, mid: 2_500_000, senior: 7_000_000 },
    topColleges: ["TERI School of Advanced Studies", "IIM Lucknow (Sustainability)", "IIM Bangalore"],
    skillsRequired: ["GHG accounting", "ESG frameworks", "Excel modeling", "Stakeholder mgmt"],
    interestTags: ["commerce", "research", "social"],
    preferredSubjects: ["economics", "english", "biology"],
    growthProspects:
      "Big 4 (Deloitte, PwC, EY, KPMG) + dedicated firms (Sustainabuild, Sattva). High-demand for next 10+ yrs as ESG reporting deepens.",
  },
  {
    name: "Climate-Tech Entrepreneur",
    emoji: "🌍",
    category: "commerce",
    description:
      "Build hardware or software that helps decarbonise — EV batteries, carbon capture, climate finance, regen agri. ₹2,000Cr+ raised by Indian climate-tech startups in 2025.",
    dayInLife:
      "Customer dev, raising capital, tech R&D, regulatory navigation, hiring. Mix of CEO + scientist + fundraiser.",
    qualifications: [
      "B.Tech / Bachelor's + entrepreneurial experience",
      "Domain expertise in energy / agri / climate",
    ],
    entranceExams: [],
    salaryRanges: { entry: 400_000, mid: 1_500_000, senior: 25_000_000 },
    topColleges: ["IIT Bombay", "IISc Bangalore", "ISB Hyderabad"],
    skillsRequired: ["Fundraising", "Tech depth", "Resilience", "Storytelling"],
    interestTags: ["entrepreneur", "tech", "social", "engineering"],
    preferredSubjects: ["physics", "chemistry", "math", "economics"],
    growthProspects:
      "Backed by Sequoia, Accel, Lowercarbon Capital, Aavishkaar. Acquihires or scale-ups. Strong narrative globally.",
  },
  {
    name: "Vertical Farming Specialist",
    emoji: "🥬",
    category: "engineering",
    description:
      "Design + operate hydroponic / aeroponic vertical farms. Urban food shortage + Gulf + Singapore + India NCR all need 365-day fresh produce close to consumer.",
    dayInLife:
      "Crop science, nutrient mix tuning, IoT sensor monitoring, light scheduling, harvest cycle planning.",
    qualifications: [
      "B.Sc Horticulture / Agri / Biotech",
      "Specialised training in CEA (Controlled Environment Agri)",
    ],
    entranceExams: [
      { name: "ICAR AIEEA", link: "https://www.icar.org.in", dates: "Apr-May" },
      { name: "JEE Main (for engineering route)", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" },
    ],
    salaryRanges: { entry: 350_000, mid: 1_100_000, senior: 3_500_000 },
    topColleges: ["IARI Delhi", "GBPUAT Pantnagar", "PAU Ludhiana"],
    skillsRequired: ["Plant science", "IoT / sensors", "Hydroponics", "Lighting design"],
    interestTags: ["engineering", "biology", "research"],
    preferredSubjects: ["biology", "chemistry", "physics"],
    growthProspects:
      "Indian vertical-farm startups (UrbanKisaan, Barton Breeze) + Gulf (Bustanica Dubai) + Singapore (Sky Greens). Govt urban-agri subsidies growing.",
  },
  {
    name: "Plant-Based / Alt-Protein Food Scientist",
    emoji: "🌿",
    category: "research",
    description:
      "Develop plant-based + cultivated-meat products at startups like Greenest Foods (India), Imagine Meats, Cell-Cul. India's massive vegetarian market makes it a natural lab.",
    dayInLife:
      "Recipe formulation, sensory testing, scale-up runs, regulatory liaison (FSSAI), shelf-life testing.",
    qualifications: ["B.Tech Food Tech / M.Sc Food Science"],
    entranceExams: [
      { name: "JEE Main + CFTRI Mysore entrance", link: "https://www.cftri.com", dates: "Apr" },
    ],
    salaryRanges: { entry: 450_000, mid: 1_300_000, senior: 3_500_000 },
    topColleges: ["CFTRI Mysore", "NIFTEM Sonipat", "ICT Mumbai", "IIT Kharagpur (Food Tech)"],
    skillsRequired: ["Food chemistry", "Sensory science", "Lab discipline", "Regulatory knowledge"],
    interestTags: ["research", "biology", "engineering", "creative"],
    preferredSubjects: ["biology", "chemistry", "math"],
    growthProspects:
      "Indian alt-protein market projected $5B+ by 2030. Govt MoFPI grants + foreign VC funding both growing.",
  },

  /* ═══════════════════════ WELLNESS / PSYCHE ═══════════════════════ */
  {
    name: "Mindfulness / Wellness Coach",
    emoji: "🧘",
    category: "education",
    description:
      "1-on-1 + corporate coaching in meditation, stress mgmt, breathwork. Indian corporates (Tata, Infosys, RPG) all hire wellness coaches; international virtual market huge.",
    dayInLife:
      "Client sessions over Zoom + IRL, content creation (Instagram + YouTube), corporate workshop facilitation.",
    qualifications: [
      "ICF / IPHM / Yoga Alliance certification",
      "Background in psychology / yoga / mindful traditions",
    ],
    entranceExams: [],
    salaryRanges: { entry: 300_000, mid: 1_200_000, senior: 4_000_000 },
    topColleges: ["S-VYASA Bangalore", "Bihar School of Yoga", "Sivananda Yoga (multiple)"],
    skillsRequired: ["Active listening", "Meditation", "Public speaking", "Business of coaching"],
    interestTags: ["social", "psychology", "humanities"],
    preferredSubjects: ["psychology", "english"],
    growthProspects:
      "Apps like Headspace + Calm hire Indian coaches; corporate consulting; personal brand → premium 1:1 → online courses.",
  },
  {
    name: "Sports Analytics Engineer",
    emoji: "📊",
    category: "tech",
    description:
      "Apply data science to cricket, football, kabaddi, esports. IPL teams (MI, RCB, CSK), Mumbai City FC, Delhi Capitals all have analytics teams now.",
    dayInLife:
      "Wrangling match data, building models, prepping briefings for coaches, watching games with stats overlay.",
    qualifications: ["B.Tech CSE / Stats", "Knowledge of the sport"],
    entranceExams: [
      { name: "JEE Main / ISI Kolkata BStat entrance", link: "https://www.isical.ac.in", dates: "May" },
    ],
    salaryRanges: { entry: 600_000, mid: 1_800_000, senior: 5_500_000 },
    topColleges: ["ISI Kolkata", "IIT Madras (Sports Analytics)", "Chennai Mathematical Institute"],
    skillsRequired: ["Python / R", "ML", "Stats", "Domain knowledge of sport"],
    interestTags: ["tech", "math", "social"],
    preferredSubjects: ["math", "computer science", "physics"],
    growthProspects:
      "IPL teams + ISL teams + Pro Kabaddi + esports orgs. Top sports analytics leads earn $200K+ at top global teams.",
  },
  {
    name: "Sports Psychologist",
    emoji: "🧠",
    category: "medical",
    description:
      "Help athletes manage pressure, focus, recovery. Indian Olympic / ISL / IPL teams all hire sports psychologists post-Tokyo 2020 success stories.",
    dayInLife:
      "1-on-1 athlete sessions, team workshops, travel with squad, performance debriefs, injury rehab psych support.",
    qualifications: ["MA / M.Phil Clinical / Sports Psychology", "RCI registration"],
    entranceExams: [
      { name: "CUET PG", link: "https://cuet.nta.nic.in", dates: "Mar-Apr" },
      { name: "AIIMS PG Nursing/Psych", link: "https://www.aiimsexams.ac.in", dates: "Varies" },
    ],
    salaryRanges: { entry: 500_000, mid: 1_500_000, senior: 5_000_000 },
    topColleges: ["NIS Patiala (Sports Sciences)", "AIIMS Delhi", "Christ University Bangalore"],
    skillsRequired: ["Counselling", "Performance psych", "Confidentiality", "Knowledge of sport"],
    interestTags: ["medical", "psychology", "social"],
    preferredSubjects: ["psychology", "biology"],
    growthProspects:
      "BCCI, IOC, IPL teams, NIS Patiala. ~50-100 specialists in India today = early-mover advantage.",
  },
  {
    name: "Adventure Sports Instructor",
    emoji: "🧗",
    category: "education",
    description:
      "Train + lead trekking, scuba, paragliding, skiing, white-water rafting. India's adventure-tourism market crossed ₹4,000Cr in 2025.",
    dayInLife:
      "Lead group expeditions, safety briefings, gear maintenance, off-season cert renewals, content for socials.",
    qualifications: [
      "NIM Uttarkashi mountaineering cert / PADI Scuba cert / IGS-cert paragliding",
    ],
    entranceExams: [
      { name: "NIM Uttarkashi entrance", link: "https://nimindia.net", dates: "Apr-May" },
    ],
    salaryRanges: { entry: 200_000, mid: 800_000, senior: 2_500_000 },
    topColleges: ["NIM Uttarkashi", "ABVIMAS Manali", "JIM&WS Pahalgam"],
    skillsRequired: ["Physical fitness", "Risk assessment", "Group management", "Sport-specific tech"],
    interestTags: ["social", "biology"],
    preferredSubjects: ["physics", "biology", "geography"],
    growthProspects:
      "Lead expeditions → start your own adventure brand. Top guides earn ₹1L+ per high-altitude expedition.",
  },

  /* ═══════════════════════ SPACE / FRONTIER ═══════════════════════ */
  {
    name: "Astronaut / Space Researcher (ISRO)",
    emoji: "🚀",
    category: "research",
    description:
      "Become a Gaganyaan astronaut OR a research scientist at ISRO / NASA / ESA. India's manned mission + Chandrayaan + Aditya-L1 successes inspired a generation.",
    dayInLife:
      "Mission planning, simulator training, payload science, papers. Astronaut role = years of physical + technical training.",
    qualifications: [
      "B.Tech / B.Sc Physics + MS / PhD",
      "IAF or Navy pilot training (for crewed mission selection)",
    ],
    entranceExams: [
      { name: "JEE Advanced", link: "https://jeeadv.ac.in", dates: "May" },
      { name: "IISER Aptitude Test / NEST", link: "https://www.iiseradmission.in", dates: "Jun" },
      { name: "AFCAT (for IAF route)", link: "https://afcat.cdac.in", dates: "Feb & Aug" },
    ],
    salaryRanges: { entry: 800_000, mid: 1_800_000, senior: 4_500_000 },
    topColleges: ["IIST Trivandrum", "IIT Madras", "IISc Bangalore", "BITS Pilani"],
    skillsRequired: ["Physics", "Engineering", "Programming", "Physical fitness"],
    interestTags: ["research", "math", "tech", "engineering"],
    preferredSubjects: ["physics", "math", "computer science"],
    growthProspects:
      "ISRO scientist → mission lead. ~10 astronauts to be selected for Indian space program over next decade.",
  },

  /* ═══════════════════════ NICHE FINANCE ═══════════════════════ */
  {
    name: "Forensic Accountant / Fraud Investigator",
    emoji: "🕵️",
    category: "commerce",
    description:
      "Investigate corporate fraud, money laundering, banking frauds. Big 4 forensic teams + ED + SFIO + private investigators all hire.",
    dayInLife:
      "Document review, transaction tracing, witness interviews, court testimony, report writing.",
    qualifications: [
      "CA / CFA + Certified Fraud Examiner (CFE)",
      "Diploma in Forensic Accounting from ICAI",
    ],
    entranceExams: [
      { name: "CA Foundation", link: "https://www.icai.org", dates: "Jun & Dec" },
      { name: "CFE (ACFE)", link: "https://www.acfe.com", dates: "Rolling" },
    ],
    salaryRanges: { entry: 700_000, mid: 2_000_000, senior: 7_000_000 },
    topColleges: ["ICAI (CA + Forensic Diploma)", "Manipal University", "NFSU Gandhinagar"],
    skillsRequired: ["Accounting", "Investigation", "Reporting", "Cyber forensics"],
    interestTags: ["commerce", "law", "research"],
    preferredSubjects: ["accountancy", "math", "computer science"],
    growthProspects:
      "Big 4 forensic practices (Deloitte FRM, EY Forensic), ED, SFIO, private security firms. Rapidly growing with banking frauds + crypto.",
  },
  {
    name: "Crypto / Web3 Compliance Officer",
    emoji: "🪙",
    category: "law",
    description:
      "Navigate India's TDS + GST + VDA regulations for crypto exchanges + Web3 startups. New role with thin talent pool + high pay.",
    dayInLife:
      "Compliance audits, regulator liaison (RBI, SEBI, FIU-IND), policy drafting, KYC framework reviews.",
    qualifications: ["LLB / CA + crypto-specific cert", "Knowledge of FATF + DPDP Act"],
    entranceExams: [{ name: "CLAT / CA Foundation", link: "https://consortiumofnlus.ac.in", dates: "Dec / Jun" }],
    salaryRanges: { entry: 1_000_000, mid: 2_800_000, senior: 8_000_000 },
    topColleges: ["NLU Delhi", "NLSIU Bangalore", "Symbiosis Law Pune"],
    skillsRequired: ["Compliance frameworks", "Tech literacy", "Regulator relationships", "Policy writing"],
    interestTags: ["law", "commerce", "tech"],
    preferredSubjects: ["english", "political science", "economics"],
    growthProspects:
      "CoinDCX, WazirX, CoinSwitch + global exchanges hire. Even as crypto matures, compliance never goes away.",
  },
  {
    name: "Privacy Officer / Data Protection Officer (DPO)",
    emoji: "🔒",
    category: "law",
    description:
      "Required by India's DPDP Act 2023 for every significant data fiduciary. Hot, well-paid, deeply technical-legal role.",
    dayInLife:
      "Data flow mapping, privacy impact assessments, breach response, employee training, regulator liaison.",
    qualifications: [
      "LLB OR engineering + IAPP CIPP / CIPM cert",
      "Knowledge of DPDP Act, GDPR, CCPA",
    ],
    entranceExams: [
      { name: "CLAT", link: "https://consortiumofnlus.ac.in", dates: "Dec" },
      { name: "IAPP CIPP-E / CIPM", link: "https://iapp.org", dates: "Rolling" },
    ],
    salaryRanges: { entry: 900_000, mid: 2_500_000, senior: 7_500_000 },
    topColleges: ["NLU Delhi", "NLSIU Bangalore", "Symbiosis Law Pune"],
    skillsRequired: ["Privacy law", "Risk assessment", "Tech literacy", "Cross-functional comms"],
    interestTags: ["law", "tech", "research"],
    preferredSubjects: ["english", "political science", "computer science"],
    growthProspects:
      "Every consumer-tech company + bank + insurance + healthcare hires one. Salaries up 40% YoY post-DPDP Act.",
  },

  /* ═══════════════════════ SPEAKING / SOFT SKILLS ═══════════════════════ */
  {
    name: "Public Speaking / Debate Coach",
    emoji: "🎤",
    category: "education",
    description:
      "Coach students for MUNs, parliamentary debates, school competitions, corporate execs. India's debate circuit (NDA / WSDC) is fierce + parents pay for prep.",
    dayInLife:
      "1-on-1 sessions, workshop facilitation, video reviews, content creation for socials.",
    qualifications: [
      "Bachelor's in English / Pol Sci / Law",
      "Strong debate / MUN background",
    ],
    entranceExams: [
      { name: "CUET UG", link: "https://cuet.nta.nic.in", dates: "May" },
    ],
    salaryRanges: { entry: 300_000, mid: 1_000_000, senior: 3_500_000 },
    topColleges: ["St Stephen's Delhi", "Hindu College Delhi", "NLSIU Bangalore"],
    skillsRequired: ["Public speaking", "Argumentation", "Feedback delivery", "Confidence building"],
    interestTags: ["humanities", "social", "law"],
    preferredSubjects: ["english", "political science", "history"],
    growthProspects:
      "School circuit → corporate workshops → personal brand. Top coaches earn ₹50K+ per workshop day.",
  },
  {
    name: "Behavioral Economist",
    emoji: "🧮",
    category: "research",
    description:
      "Apply behavioral science to govt policy, fintech, healthcare. NITI Aayog, Idinsight, Final Mile, Behavioural Insights Team India all hire.",
    dayInLife:
      "Field experiments, data analysis, policy briefs, intervention design. Mix of econ, psych, stats.",
    qualifications: ["BA Economics + MA / PhD Behavioral Econ", "Field experiment experience"],
    entranceExams: [
      { name: "DSE / ISI entrance", link: "https://www.econdse.org", dates: "Jun" },
      { name: "GRE (for foreign MA / PhD)", link: "https://www.ets.org/gre", dates: "Year-round" },
    ],
    salaryRanges: { entry: 700_000, mid: 1_800_000, senior: 5_000_000 },
    topColleges: ["DSE Delhi", "ISI Kolkata", "Krea University", "Ashoka University"],
    skillsRequired: ["Stats", "Field methods", "Writing", "Critical thinking"],
    interestTags: ["research", "psychology", "social", "math"],
    preferredSubjects: ["economics", "psychology", "math"],
    growthProspects:
      "Govt advisory + private consulting + academia. Rapidly growing field with India-specific research demand.",
  },
];
