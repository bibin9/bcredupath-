/**
 * Free verified helplines. These are real, publicly-listed numbers.
 *
 * Counselor partnerships are not yet onboarded — the platform shows
 * helplines first; we'll add verified counselor profiles once we have
 * real onboarded partners (no placeholder dummy entries).
 */

export type SeedCounselor = {
  name: string;
  specialization: string[];
  city: string;
  state: string;
  phone?: string;
  email?: string;
  website?: string;
  languages: string[];
  fees?: number; // per session, INR
  rating: number; // 0-5
  verified: boolean;
};

/** Empty until we onboard real counselor partners. */
export const COUNSELORS: SeedCounselor[] = [];

export const HELPLINES = [
  {
    name: "iCALL (TISS) — Mental Health",
    description: "Free, confidential mental health counseling for students.",
    phone: "+91-9152987821",
    email: "icall@tiss.edu",
    hours: "Mon-Sat, 8am-10pm",
    languages: ["English", "Hindi"],
    website: "https://icallhelpline.org",
  },
  {
    name: "Vandrevala Foundation",
    description: "Free 24×7 mental health and crisis intervention helpline.",
    phone: "1860-2662-345",
    email: "help@vandrevalafoundation.com",
    hours: "24×7",
    languages: ["English", "Hindi", "11 Indian languages"],
    website: "https://www.vandrevalafoundation.com",
  },
  {
    name: "CBSE Counseling Helpline",
    description: "Free pre/post-exam counseling for CBSE students by trained counselors and principals.",
    phone: "1800-11-8004",
    email: "info.cbse@nic.in",
    hours: "Pre-exam: Feb, Post-exam: May-Jun",
    languages: ["English", "Hindi"],
    website: "https://cbse.gov.in",
  },
  {
    name: "KIRAN Mental Health (Govt of India)",
    description: "Toll-free 24×7 mental health rehabilitation helpline.",
    phone: "1800-599-0019",
    email: "",
    hours: "24×7",
    languages: ["13 languages"],
    website: "https://www.socialjustice.gov.in",
  },
  {
    name: "iCare by Fortis",
    description: "Free helpline for emotional well-being.",
    phone: "+91-8376804102",
    email: "",
    hours: "9am-7pm, Mon-Sat",
    languages: ["English", "Hindi"],
    website: "https://www.fortishealthcare.com",
  },
];
