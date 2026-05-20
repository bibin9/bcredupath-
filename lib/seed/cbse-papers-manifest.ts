/**
 * Manifest of official CBSE Sample Question Papers (SQP) + Marking Schemes (MS).
 *
 * Source: cbseacademic.nic.in (CBSE's official academic site)
 * License: Free for educational use, redistributable with attribution to CBSE.
 *
 * To add new years, get URLs from:
 *   https://cbseacademic.nic.in/SQP_CLASSX_<year>.html
 *   https://cbseacademic.nic.in/SQP_CLASSXII_<year>.html
 */

export type CBSEPaper = {
  class: 10 | 12;
  /** Our internal subject ID (matches SUBJECTS_BY_CLASS) */
  subject: string;
  /** Display name */
  displayName: string;
  /** Academic year the paper was released for, e.g. 2024 means 2024-25 session */
  year: number;
  /** Path under https://cbseacademic.nic.in/ */
  sqpPath: string;
  msPath: string;
  /** If true, the PDF contains heavy math/diagrams — parsing will be patchy. */
  mathHeavy?: boolean;
};

const BASE = "https://cbseacademic.nic.in/";
export const cbseUrl = (path: string) => BASE + path;

export const CBSE_PAPERS_2024_25: CBSEPaper[] = [
  /* ─── CLASS 10 ─── */
  {
    class: 10,
    subject: "math",
    displayName: "Mathematics (Standard)",
    year: 2024,
    sqpPath: "web_material/SQP/ClassX_2024_25/MathsStandard-SQP.pdf",
    msPath: "web_material/SQP/ClassX_2024_25/MathsStandard-MS.pdf",
    mathHeavy: true,
  },
  {
    class: 10,
    subject: "science",
    displayName: "Science",
    year: 2024,
    sqpPath: "web_material/SQP/ClassX_2024_25/Science-SQP.pdf",
    msPath: "web_material/SQP/ClassX_2024_25/Science-MS.pdf",
    mathHeavy: true,
  },
  {
    class: 10,
    subject: "sst",
    displayName: "Social Science",
    year: 2024,
    sqpPath: "web_material/SQP/ClassX_2024_25/SocialScience-SQP.pdf",
    msPath: "web_material/SQP/ClassX_2024_25/SocialScience-MS.pdf",
  },
  {
    class: 10,
    subject: "english",
    displayName: "English (Language & Literature)",
    year: 2024,
    sqpPath: "web_material/SQP/ClassX_2024_25/EnglishL-SQP.pdf",
    msPath: "web_material/SQP/ClassX_2024_25/EnglishL-MS.pdf",
  },
  {
    class: 10,
    subject: "hindi",
    displayName: "Hindi A",
    year: 2024,
    sqpPath: "web_material/SQP/ClassX_2024_25/HindiCourseA-SQP.pdf",
    msPath: "web_material/SQP/ClassX_2024_25/HindiCourseA-MS.pdf",
  },

  /* ─── CLASS 12 ─── */
  {
    class: 12,
    subject: "math",
    displayName: "Mathematics",
    year: 2024,
    sqpPath: "web_material/SQP/ClassXII_2024_25/Maths-SQP.pdf",
    msPath: "web_material/SQP/ClassXII_2024_25/Maths-MS.pdf",
    mathHeavy: true,
  },
  {
    class: 12,
    subject: "physics",
    displayName: "Physics",
    year: 2024,
    sqpPath: "web_material/SQP/ClassXII_2024_25/Physics-SQP.pdf",
    msPath: "web_material/SQP/ClassXII_2024_25/Physics-MS.pdf",
    mathHeavy: true,
  },
  {
    class: 12,
    subject: "chemistry",
    displayName: "Chemistry",
    year: 2024,
    sqpPath: "web_material/SQP/ClassXII_2024_25/Chemistry-SQP.pdf",
    msPath: "web_material/SQP/ClassXII_2024_25/Chemistry-MS.pdf",
    mathHeavy: true,
  },
  {
    class: 12,
    subject: "biology",
    displayName: "Biology",
    year: 2024,
    sqpPath: "web_material/SQP/ClassXII_2024_25/Biology-SQP.pdf",
    msPath: "web_material/SQP/ClassXII_2024_25/Biology-MS.pdf",
  },
  {
    class: 12,
    subject: "english",
    displayName: "English Core",
    year: 2024,
    sqpPath: "web_material/SQP/ClassXII_2024_25/EnglishCore-SQP.pdf",
    msPath: "web_material/SQP/ClassXII_2024_25/EnglishCore-MS.pdf",
  },
  {
    class: 12,
    subject: "hindi",
    displayName: "Hindi Core",
    year: 2024,
    sqpPath: "web_material/SQP/ClassXII_2024_25/HindiCore-SQP.pdf",
    msPath: "web_material/SQP/ClassXII_2024_25/HindiCore-MS.pdf",
  },
  {
    class: 12,
    subject: "accountancy",
    displayName: "Accountancy",
    year: 2024,
    sqpPath: "web_material/SQP/ClassXII_2024_25/Accountancy-SQP.pdf",
    msPath: "web_material/SQP/ClassXII_2024_25/Accountancy-MS.pdf",
  },
  {
    class: 12,
    subject: "business",
    displayName: "Business Studies",
    year: 2024,
    sqpPath: "web_material/SQP/ClassXII_2024_25/BusinessStudies-SQP.pdf",
    msPath: "web_material/SQP/ClassXII_2024_25/BusinessStudies-MS.pdf",
  },
  {
    class: 12,
    subject: "economics",
    displayName: "Economics",
    year: 2024,
    sqpPath: "web_material/SQP/ClassXII_2024_25/Economics-SQP.pdf",
    msPath: "web_material/SQP/ClassXII_2024_25/Economics-MS.pdf",
  },
  {
    class: 12,
    subject: "history",
    displayName: "History",
    year: 2024,
    sqpPath: "web_material/SQP/ClassXII_2024_25/History-SQP.pdf",
    msPath: "web_material/SQP/ClassXII_2024_25/History-MS.pdf",
  },
  {
    class: 12,
    subject: "geography",
    displayName: "Geography",
    year: 2024,
    sqpPath: "web_material/SQP/ClassXII_2024_25/Geography-SQP.pdf",
    msPath: "web_material/SQP/ClassXII_2024_25/Geography-MS.pdf",
  },
  {
    class: 12,
    subject: "polsci",
    displayName: "Political Science",
    year: 2024,
    sqpPath: "web_material/SQP/ClassXII_2024_25/PolSci-SQP.pdf",
    msPath: "web_material/SQP/ClassXII_2024_25/PolSci-MS.pdf",
  },
  {
    class: 12,
    subject: "psychology",
    displayName: "Psychology",
    year: 2024,
    sqpPath: "web_material/SQP/ClassXII_2024_25/Psychology-SQP.pdf",
    msPath: "web_material/SQP/ClassXII_2024_25/Psychology-MS.pdf",
  },
  {
    class: 12,
    subject: "sociology",
    displayName: "Sociology",
    year: 2024,
    sqpPath: "web_material/SQP/ClassXII_2024_25/Sociology-SQP.pdf",
    msPath: "web_material/SQP/ClassXII_2024_25/Sociology-MS.pdf",
  },
  {
    class: 12,
    subject: "cs",
    displayName: "Computer Science",
    year: 2024,
    sqpPath: "web_material/SQP/ClassXII_2024_25/ComputerScience-SQP.pdf",
    msPath: "web_material/SQP/ClassXII_2024_25/ComputerScience-MS.pdf",
    mathHeavy: true,
  },
];
