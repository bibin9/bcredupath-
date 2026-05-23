/**
 * Colleges database expansion — Round 2.
 *
 * Adds ~50 new Indian colleges (with a handful of high-recall NRI-popular
 * unis abroad) across:
 *   - More IITs (newer ones from 2014/2015 cohort)
 *   - More NITs (we had 3 → adding 8 more out of 31 total)
 *   - More IIITs (Delhi, Allahabad, Jabalpur, etc.)
 *   - More AIIMS branches (Rishikesh, Bhopal, etc. were missing)
 *   - State govt medical colleges (KGMU, Madras MC, Grant MC)
 *   - Top private engineering (VIT, SRM, Thapar, Manipal Inst Tech)
 *   - Top commerce colleges (Stephen's, Hindu, Christ, NMIMS)
 *   - Architecture (SPA Delhi, CEPT, JNAFAU)
 *   - Design (NIFT branches, MIT-ID Pune, Srishti)
 *   - Performing arts (FTII, NSD, SRFTI)
 *   - Foreign language (EFLU Hyderabad, JNU SLL)
 *   - Defense academies (NDA, IMA, INA, AFA)
 *   - Maritime academies (IMU, TS Chanakya, MERI)
 *   - Hospitality (IHM Mumbai/Delhi/Pusa)
 */

import type { SeedCollege } from "./colleges";

export const COLLEGES_EXTENDED: SeedCollege[] = [
  /* ─── More IITs ─── */
  { name: "IIT (BHU) Varanasi", type: "Govt", state: "Uttar Pradesh", city: "Varanasi", nirfRank: 11, courses: ["B.Tech", "B.Pharma", "M.Tech", "PhD"], fees: { min: 250_000, max: 1_000_000 }, website: "https://www.iitbhu.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT (ISM) Dhanbad", type: "Govt", state: "Jharkhand", city: "Dhanbad", nirfRank: 19, courses: ["B.Tech Petroleum", "B.Tech Mining", "M.Tech"], fees: { min: 250_000, max: 900_000 }, website: "https://www.iitism.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Indore", type: "Govt", state: "Madhya Pradesh", city: "Indore", nirfRank: 16, courses: ["B.Tech", "M.Sc", "M.Tech"], fees: { min: 250_000, max: 900_000 }, website: "https://www.iiti.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Mandi", type: "Govt", state: "Himachal Pradesh", city: "Mandi", nirfRank: 31, courses: ["B.Tech", "M.Tech"], fees: { min: 250_000, max: 900_000 }, website: "https://www.iitmandi.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Patna", type: "Govt", state: "Bihar", city: "Patna", nirfRank: 41, courses: ["B.Tech", "M.Tech"], fees: { min: 250_000, max: 900_000 }, website: "https://www.iitp.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Ropar", type: "Govt", state: "Punjab", city: "Rupnagar", nirfRank: 22, courses: ["B.Tech", "M.Tech"], fees: { min: 250_000, max: 900_000 }, website: "https://www.iitrpr.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Gandhinagar", type: "Govt", state: "Gujarat", city: "Gandhinagar", nirfRank: 23, courses: ["B.Tech", "M.Tech", "M.Sc"], fees: { min: 250_000, max: 900_000 }, website: "https://www.iitgn.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Bhubaneswar", type: "Govt", state: "Odisha", city: "Bhubaneswar", nirfRank: 33, courses: ["B.Tech", "M.Tech"], fees: { min: 250_000, max: 900_000 }, website: "https://www.iitbbs.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Jodhpur", type: "Govt", state: "Rajasthan", city: "Jodhpur", nirfRank: 40, courses: ["B.Tech", "M.Tech"], fees: { min: 250_000, max: 900_000 }, website: "https://www.iitj.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Tirupati", type: "Govt", state: "Andhra Pradesh", city: "Tirupati", courses: ["B.Tech", "M.Tech"], fees: { min: 250_000, max: 900_000 }, website: "https://www.iittp.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Palakkad", type: "Govt", state: "Kerala", city: "Palakkad", courses: ["B.Tech", "M.Tech"], fees: { min: 250_000, max: 900_000 }, website: "https://www.iitpkd.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },

  /* ─── More NITs ─── */
  { name: "NIT Calicut", type: "Govt", state: "Kerala", city: "Kozhikode", nirfRank: 25, courses: ["B.Tech", "M.Tech", "B.Arch"], fees: { min: 150_000, max: 600_000 }, website: "https://www.nitc.ac.in", admissionLink: "https://josaa.nic.in", hostel: true },
  { name: "NIT Rourkela", type: "Govt", state: "Odisha", city: "Rourkela", nirfRank: 19, courses: ["B.Tech", "M.Tech", "PhD"], fees: { min: 150_000, max: 600_000 }, website: "https://www.nitrkl.ac.in", admissionLink: "https://josaa.nic.in", hostel: true },
  { name: "NIT Allahabad (MNNIT)", type: "Govt", state: "Uttar Pradesh", city: "Prayagraj", nirfRank: 49, courses: ["B.Tech", "M.Tech"], fees: { min: 150_000, max: 600_000 }, website: "https://www.mnnit.ac.in", admissionLink: "https://josaa.nic.in", hostel: true },
  { name: "NIT Jaipur (MNIT)", type: "Govt", state: "Rajasthan", city: "Jaipur", nirfRank: 37, courses: ["B.Tech", "B.Arch", "M.Tech"], fees: { min: 150_000, max: 600_000 }, website: "https://www.mnit.ac.in", admissionLink: "https://josaa.nic.in", hostel: true },
  { name: "NIT Nagpur (VNIT)", type: "Govt", state: "Maharashtra", city: "Nagpur", nirfRank: 39, courses: ["B.Tech", "B.Arch", "M.Tech"], fees: { min: 150_000, max: 600_000 }, website: "https://www.vnit.ac.in", admissionLink: "https://josaa.nic.in", hostel: true },
  { name: "NIT Durgapur", type: "Govt", state: "West Bengal", city: "Durgapur", nirfRank: 50, courses: ["B.Tech", "M.Tech"], fees: { min: 150_000, max: 600_000 }, website: "https://nitdgp.ac.in", admissionLink: "https://josaa.nic.in", hostel: true },
  { name: "NIT Silchar", type: "Govt", state: "Assam", city: "Silchar", courses: ["B.Tech", "M.Tech"], fees: { min: 150_000, max: 600_000 }, website: "https://www.nits.ac.in", admissionLink: "https://josaa.nic.in", hostel: true },
  { name: "NIT Kurukshetra", type: "Govt", state: "Haryana", city: "Kurukshetra", nirfRank: 45, courses: ["B.Tech", "M.Tech"], fees: { min: 150_000, max: 600_000 }, website: "https://nitkkr.ac.in", admissionLink: "https://josaa.nic.in", hostel: true },

  /* ─── More IIITs ─── */
  { name: "IIIT Delhi", type: "Govt", state: "Delhi", city: "New Delhi", nirfRank: 75, courses: ["B.Tech", "M.Tech"], fees: { min: 350_000, max: 1_200_000 }, website: "https://www.iiitd.ac.in", admissionLink: "https://www.iiitd.ac.in", hostel: true },
  { name: "IIIT Allahabad", type: "Govt", state: "Uttar Pradesh", city: "Prayagraj", courses: ["B.Tech IT", "M.Tech"], fees: { min: 200_000, max: 750_000 }, website: "https://iiita.ac.in", admissionLink: "https://josaa.nic.in", hostel: true },
  { name: "IIIT Jabalpur", type: "Govt", state: "Madhya Pradesh", city: "Jabalpur", courses: ["B.Tech IT", "M.Tech"], fees: { min: 200_000, max: 750_000 }, website: "https://www.iiitdmj.ac.in", admissionLink: "https://josaa.nic.in", hostel: true },

  /* ─── IISERs (research) ─── */
  { name: "IISER Pune", type: "Govt", state: "Maharashtra", city: "Pune", nirfRank: 32, courses: ["BS-MS Dual", "PhD"], fees: { min: 80_000, max: 200_000 }, website: "https://www.iiserpune.ac.in", admissionLink: "https://www.iiseradmission.in", hostel: true, highlights: ["INSPIRE scholarship", "Integrated 5-yr BS-MS"] },
  { name: "IISER Mohali", type: "Govt", state: "Punjab", city: "Mohali", courses: ["BS-MS Dual", "PhD"], fees: { min: 80_000, max: 200_000 }, website: "https://www.iisermohali.ac.in", admissionLink: "https://www.iiseradmission.in", hostel: true },
  { name: "IISER Kolkata", type: "Govt", state: "West Bengal", city: "Kolkata", courses: ["BS-MS Dual", "PhD"], fees: { min: 80_000, max: 200_000 }, website: "https://www.iiserkol.ac.in", admissionLink: "https://www.iiseradmission.in", hostel: true },
  { name: "IISER Bhopal", type: "Govt", state: "Madhya Pradesh", city: "Bhopal", courses: ["BS-MS Dual", "PhD"], fees: { min: 80_000, max: 200_000 }, website: "https://www.iiserb.ac.in", admissionLink: "https://www.iiseradmission.in", hostel: true },
  { name: "IISER Tirupati", type: "Govt", state: "Andhra Pradesh", city: "Tirupati", courses: ["BS-MS Dual"], fees: { min: 80_000, max: 200_000 }, website: "https://www.iisertirupati.ac.in", admissionLink: "https://www.iiseradmission.in", hostel: true },
  { name: "IISER Berhampur", type: "Govt", state: "Odisha", city: "Berhampur", courses: ["BS-MS Dual"], fees: { min: 80_000, max: 200_000 }, website: "https://www.iiserbpr.ac.in", admissionLink: "https://www.iiseradmission.in", hostel: true },
  { name: "NISER Bhubaneswar", type: "Govt", state: "Odisha", city: "Bhubaneswar", courses: ["Integrated MSc", "PhD"], fees: { min: 80_000, max: 200_000 }, website: "https://www.niser.ac.in", admissionLink: "https://www.nestexam.in", hostel: true },

  /* ─── More AIIMS branches ─── */
  { name: "AIIMS Patna", type: "Govt", state: "Bihar", city: "Patna", courses: ["MBBS", "MD", "BSc Nursing"], fees: { min: 1_500, max: 100_000 }, website: "https://aiimspatna.edu.in", admissionLink: "https://neet.nta.nic.in", hostel: true },
  { name: "AIIMS Raipur", type: "Govt", state: "Chhattisgarh", city: "Raipur", courses: ["MBBS", "MD"], fees: { min: 1_500, max: 100_000 }, website: "https://www.aiimsraipur.edu.in", admissionLink: "https://neet.nta.nic.in", hostel: true },
  { name: "AIIMS Bhubaneswar", type: "Govt", state: "Odisha", city: "Bhubaneswar", courses: ["MBBS", "MD"], fees: { min: 1_500, max: 100_000 }, website: "https://aiimsbhubaneswar.nic.in", admissionLink: "https://neet.nta.nic.in", hostel: true },
  { name: "AIIMS Nagpur", type: "Govt", state: "Maharashtra", city: "Nagpur", courses: ["MBBS", "MD"], fees: { min: 1_500, max: 100_000 }, website: "https://aiimsnagpur.edu.in", admissionLink: "https://neet.nta.nic.in", hostel: true },
  { name: "AIIMS Mangalagiri", type: "Govt", state: "Andhra Pradesh", city: "Mangalagiri", courses: ["MBBS"], fees: { min: 1_500, max: 100_000 }, website: "https://www.aiimsmangalagiri.edu.in", admissionLink: "https://neet.nta.nic.in", hostel: true },
  { name: "AIIMS Gorakhpur", type: "Govt", state: "Uttar Pradesh", city: "Gorakhpur", courses: ["MBBS"], fees: { min: 1_500, max: 100_000 }, website: "https://www.aiimsgorakhpur.edu.in", admissionLink: "https://neet.nta.nic.in", hostel: true },

  /* ─── Top state govt medical colleges ─── */
  { name: "KGMU Lucknow", type: "Govt", state: "Uttar Pradesh", city: "Lucknow", nirfRank: 11, courses: ["MBBS", "MD", "BDS"], fees: { min: 60_000, max: 300_000 }, website: "https://www.kgmu.org", admissionLink: "https://neet.nta.nic.in", hostel: true, highlights: ["Oldest medical college in UP", "Largest tertiary care hospital in north India"] },
  { name: "Grant Medical College Mumbai", type: "Govt", state: "Maharashtra", city: "Mumbai", courses: ["MBBS", "MD"], fees: { min: 60_000, max: 200_000 }, website: "https://www.ggmcjjh.org", admissionLink: "https://neet.nta.nic.in", hostel: true, highlights: ["Founded 1845", "Attached to JJ Hospital"] },
  { name: "Madras Medical College", type: "Govt", state: "Tamil Nadu", city: "Chennai", courses: ["MBBS", "MD"], fees: { min: 60_000, max: 200_000 }, website: "https://www.mmc.tn.gov.in", admissionLink: "https://neet.nta.nic.in", hostel: true },
  { name: "BJ Medical College Pune", type: "Govt", state: "Maharashtra", city: "Pune", courses: ["MBBS", "MD"], fees: { min: 60_000, max: 200_000 }, website: "https://www.bjmcpune.org", admissionLink: "https://neet.nta.nic.in", hostel: true },
  { name: "Stanley Medical College Chennai", type: "Govt", state: "Tamil Nadu", city: "Chennai", courses: ["MBBS", "MD"], fees: { min: 60_000, max: 200_000 }, website: "https://www.stanleymedicalcollege.org", admissionLink: "https://neet.nta.nic.in", hostel: true },
  { name: "Govt Medical College Trivandrum", type: "Govt", state: "Kerala", city: "Thiruvananthapuram", courses: ["MBBS", "MD"], fees: { min: 60_000, max: 200_000 }, website: "https://www.mctvm.kerala.gov.in", admissionLink: "https://neet.nta.nic.in", hostel: true },
  { name: "Armed Forces Medical College Pune", type: "Govt", state: "Maharashtra", city: "Pune", nirfRank: 9, courses: ["MBBS", "MD"], fees: { min: 60_000, max: 200_000 }, website: "https://www.afmc.nic.in", admissionLink: "https://neet.nta.nic.in", hostel: true, highlights: ["Defense services commitment", "All-India ~150 seats only"] },

  /* ─── Top private engineering ─── */
  { name: "VIT Vellore", type: "Private", state: "Tamil Nadu", city: "Vellore", nirfRank: 13, courses: ["B.Tech", "M.Tech", "MBA"], fees: { min: 500_000, max: 2_500_000 }, website: "https://vit.ac.in", admissionLink: "https://viteee.vit.ac.in", hostel: true, highlights: ["VITEEE entrance", "Strong tier-2 placements"] },
  { name: "SRM Chennai", type: "Private", state: "Tamil Nadu", city: "Chennai", nirfRank: 41, courses: ["B.Tech", "M.Tech", "Medical"], fees: { min: 500_000, max: 4_000_000 }, website: "https://www.srmist.edu.in", admissionLink: "https://www.srmist.edu.in/admission-india", hostel: true, highlights: ["SRMJEEE entrance"] },
  { name: "Thapar University Patiala", type: "Private", state: "Punjab", city: "Patiala", nirfRank: 29, courses: ["B.Tech", "M.Tech", "MBA"], fees: { min: 400_000, max: 1_800_000 }, website: "https://www.thapar.edu", admissionLink: "https://www.thapar.edu/admissions", hostel: true },
  { name: "Manipal Institute of Technology", type: "Private", state: "Karnataka", city: "Manipal", nirfRank: 56, courses: ["B.Tech", "M.Tech"], fees: { min: 500_000, max: 2_000_000 }, website: "https://manipal.edu/mit.html", admissionLink: "https://manipal.edu/mit/admission.html", hostel: true },
  { name: "PES University Bangalore", type: "Private", state: "Karnataka", city: "Bangalore", courses: ["B.Tech", "M.Tech"], fees: { min: 400_000, max: 1_400_000 }, website: "https://pes.edu", admissionLink: "https://pes.edu/admissions-2025", hostel: true },
  { name: "Amrita Vishwa Vidyapeetham", type: "Private", state: "Tamil Nadu", city: "Coimbatore", nirfRank: 23, courses: ["B.Tech", "M.Tech", "Medical"], fees: { min: 350_000, max: 1_500_000 }, website: "https://www.amrita.edu", admissionLink: "https://www.amrita.edu/admissions", hostel: true },

  /* ─── Top commerce + arts colleges ─── */
  { name: "Shri Ram College of Commerce (SRCC) Delhi", type: "Govt", state: "Delhi", city: "New Delhi", nirfRank: 1, courses: ["B.Com (H)", "B.A. Economics (H)"], fees: { min: 50_000, max: 100_000 }, website: "https://srcc.edu", admissionLink: "https://srcc.edu/admissions", hostel: true, highlights: ["Top commerce college in India", "Day-1 IB recruitment"] },
  { name: "St Stephen's College Delhi", type: "Govt", state: "Delhi", city: "New Delhi", courses: ["B.A. Economics", "B.A. English", "B.Sc Physics"], fees: { min: 40_000, max: 80_000 }, website: "https://www.ststephens.edu", admissionLink: "https://www.ststephens.edu/admissions.aspx", hostel: true, highlights: ["Founded 1881", "Highest Rhodes alumni in India"] },
  { name: "Hindu College Delhi", type: "Govt", state: "Delhi", city: "New Delhi", courses: ["B.A. (H)", "B.Sc (H)", "B.Com"], fees: { min: 30_000, max: 60_000 }, website: "https://www.hinducollege.ac.in", admissionLink: "https://admission.uod.ac.in", hostel: true },
  { name: "Lady Shri Ram College for Women Delhi", type: "Govt", state: "Delhi", city: "New Delhi", courses: ["B.A. (H)", "B.Com (H)"], fees: { min: 30_000, max: 60_000 }, website: "https://lsr.edu.in", admissionLink: "https://admission.uod.ac.in", hostel: true },
  { name: "Christ University Bangalore", type: "Private", state: "Karnataka", city: "Bangalore", nirfRank: 65, courses: ["BA", "BBA", "B.Com", "BCA"], fees: { min: 150_000, max: 500_000 }, website: "https://christuniversity.in", admissionLink: "https://christuniversity.in/admission", hostel: true },
  { name: "St Xavier's College Mumbai", type: "Govt", state: "Maharashtra", city: "Mumbai", courses: ["BA", "B.Sc", "B.Com", "BMM"], fees: { min: 30_000, max: 100_000 }, website: "https://xaviers.edu", admissionLink: "https://xaviers.edu/main/admission", hostel: false },
  { name: "Loyola College Chennai", type: "Govt", state: "Tamil Nadu", city: "Chennai", courses: ["BA", "B.Sc", "B.Com"], fees: { min: 30_000, max: 80_000 }, website: "https://www.loyolacollege.edu", admissionLink: "https://www.loyolacollege.edu/admission", hostel: true },
  { name: "NMIMS Mumbai", type: "Private", state: "Maharashtra", city: "Mumbai", courses: ["BBA", "B.Com", "B.Tech", "MBA"], fees: { min: 350_000, max: 2_500_000 }, website: "https://www.nmims.edu", admissionLink: "https://www.nmims.edu/admissions", hostel: true },
  { name: "Symbiosis Pune", type: "Private", state: "Maharashtra", city: "Pune", courses: ["BBA", "BA", "B.Tech", "MBA"], fees: { min: 350_000, max: 1_800_000 }, website: "https://www.symbiosis.ac.in", admissionLink: "https://www.symbiosis.ac.in/admission.html", hostel: true },

  /* ─── Architecture + Design ─── */
  { name: "School of Planning & Architecture Delhi", type: "Govt", state: "Delhi", city: "New Delhi", nirfRank: 1, courses: ["B.Arch", "B.Planning", "M.Arch", "M.Plan"], fees: { min: 150_000, max: 400_000 }, website: "https://spa.ac.in", admissionLink: "https://www.nata.in", hostel: true, highlights: ["Top architecture school in India"] },
  { name: "CEPT University Ahmedabad", type: "Private", state: "Gujarat", city: "Ahmedabad", nirfRank: 3, courses: ["B.Arch", "B.Des", "Urban Design"], fees: { min: 300_000, max: 700_000 }, website: "https://cept.ac.in", admissionLink: "https://cept.ac.in/admissions", hostel: true },
  { name: "NIFT Delhi", type: "Govt", state: "Delhi", city: "New Delhi", courses: ["B.Des Fashion", "M.Des", "MFM"], fees: { min: 350_000, max: 800_000 }, website: "https://www.nift.ac.in/delhi", admissionLink: "https://www.nift.ac.in", hostel: true },
  { name: "NIFT Mumbai", type: "Govt", state: "Maharashtra", city: "Mumbai", courses: ["B.Des Fashion", "M.Des", "MFM"], fees: { min: 350_000, max: 800_000 }, website: "https://www.nift.ac.in/mumbai", admissionLink: "https://www.nift.ac.in", hostel: true },
  { name: "MIT Institute of Design Pune", type: "Private", state: "Maharashtra", city: "Pune", courses: ["B.Des", "M.Des"], fees: { min: 500_000, max: 1_200_000 }, website: "https://mitid.edu.in", admissionLink: "https://mitid.edu.in/admissions", hostel: true },
  { name: "Srishti Manipal Institute of Art Bangalore", type: "Private", state: "Karnataka", city: "Bangalore", courses: ["B.Des", "M.Des"], fees: { min: 600_000, max: 1_500_000 }, website: "https://srishtimanipalinstitute.in", admissionLink: "https://srishtimanipalinstitute.in/admissions", hostel: false },

  /* ─── Performing arts + film ─── */
  { name: "Film & Television Institute of India (FTII) Pune", type: "Govt", state: "Maharashtra", city: "Pune", courses: ["PG Diploma Film Direction / Editing / Cinematography / Sound"], fees: { min: 100_000, max: 250_000 }, website: "https://www.ftii.ac.in", admissionLink: "https://ftii.ac.in/admissions", hostel: true, highlights: ["India's premier film school"] },
  { name: "Satyajit Ray Film & TV Institute Kolkata", type: "Govt", state: "West Bengal", city: "Kolkata", courses: ["PG Diploma Direction / Editing / Cinematography"], fees: { min: 100_000, max: 250_000 }, website: "https://srfti.ac.in", admissionLink: "https://srfti.ac.in/admissions", hostel: true },
  { name: "National School of Drama Delhi", type: "Govt", state: "Delhi", city: "New Delhi", courses: ["3-yr Diploma Dramatic Arts"], fees: { min: 30_000, max: 100_000 }, website: "https://nsd.gov.in", admissionLink: "https://nsd.gov.in/admissions", hostel: true, highlights: ["India's top theatre + acting school"] },

  /* ─── Maritime + defense academies ─── */
  { name: "Indian Maritime University Chennai", type: "Govt", state: "Tamil Nadu", city: "Chennai", courses: ["B.Sc Nautical", "B.Tech Marine", "B.Tech Naval Arch"], fees: { min: 150_000, max: 400_000 }, website: "https://www.imu.edu.in", admissionLink: "https://www.imu.edu.in/admissions", hostel: true },
  { name: "Marine Engineering Research Institute (MERI) Kolkata", type: "Govt", state: "West Bengal", city: "Kolkata", courses: ["B.Tech Marine Engineering"], fees: { min: 250_000, max: 500_000 }, website: "https://imu.edu.in/index.php/imu-campuses/imu-kolkata-campus", admissionLink: "https://www.imu.edu.in/admissions", hostel: true },
  { name: "National Defence Academy Khadakwasla", type: "Govt", state: "Maharashtra", city: "Pune", courses: ["3-yr inter-services training (Army / Navy / Air Force)"], fees: { min: 30_000, max: 100_000 }, website: "https://nda.nic.in", admissionLink: "https://upsc.gov.in", hostel: true, highlights: ["Premier tri-service academy"] },
  { name: "Indian Military Academy Dehradun", type: "Govt", state: "Uttarakhand", city: "Dehradun", courses: ["Gentlemen Cadet Course"], fees: { min: 0, max: 0 }, website: "https://indianarmy.nic.in/ima", admissionLink: "https://upsc.gov.in", hostel: true },
  { name: "Indian Naval Academy Ezhimala", type: "Govt", state: "Kerala", city: "Kannur", courses: ["B.Tech / Naval Cadet Course"], fees: { min: 0, max: 0 }, website: "https://indiannavy.nic.in/ina", admissionLink: "https://upsc.gov.in", hostel: true },
  { name: "Air Force Academy Hyderabad", type: "Govt", state: "Telangana", city: "Hyderabad", courses: ["Flying Branch / Ground Duty"], fees: { min: 0, max: 0 }, website: "https://indianairforce.nic.in/training/air-force-academy", admissionLink: "https://upsc.gov.in", hostel: true },

  /* ─── Forest, agriculture, special institutes ─── */
  { name: "Forest Research Institute Dehradun", type: "Govt", state: "Uttarakhand", city: "Dehradun", courses: ["M.Sc Forestry", "PhD"], fees: { min: 60_000, max: 200_000 }, website: "https://fri.icfre.gov.in", admissionLink: "https://fridu.edu.in", hostel: true },
  { name: "Indian Agricultural Research Institute (IARI) Delhi", type: "Govt", state: "Delhi", city: "New Delhi", courses: ["M.Sc Agriculture", "PhD"], fees: { min: 30_000, max: 150_000 }, website: "https://www.iari.res.in", admissionLink: "https://icar.nta.ac.in", hostel: true },
  { name: "Indian Veterinary Research Institute Bareilly", type: "Govt", state: "Uttar Pradesh", city: "Bareilly", courses: ["B.V.Sc", "M.V.Sc", "PhD"], fees: { min: 30_000, max: 100_000 }, website: "https://www.ivri.nic.in", admissionLink: "https://icar.nta.ac.in", hostel: true },

  /* ─── Foreign language ─── */
  { name: "English & Foreign Languages University (EFLU) Hyderabad", type: "Govt", state: "Telangana", city: "Hyderabad", courses: ["BA / MA Foreign Lang (French, German, Spanish, Russian, Arabic, Japanese, etc.)"], fees: { min: 20_000, max: 80_000 }, website: "https://www.efluniversity.ac.in", admissionLink: "https://www.efluniversity.ac.in/admission", hostel: true, highlights: ["India's central foreign-language uni"] },

  /* ─── Hospitality ─── */
  { name: "IHM Mumbai", type: "Govt", state: "Maharashtra", city: "Mumbai", courses: ["B.Sc Hospitality", "MBA Hospitality"], fees: { min: 70_000, max: 300_000 }, website: "https://www.ihmctan.edu", admissionLink: "https://nchmjee.nta.nic.in", hostel: true },
  { name: "IHM Pusa Delhi", type: "Govt", state: "Delhi", city: "New Delhi", courses: ["B.Sc Hospitality"], fees: { min: 70_000, max: 300_000 }, website: "https://ihmpusa.net", admissionLink: "https://nchmjee.nta.nic.in", hostel: true },
  { name: "Welcomgroup Graduate School of Hotel Administration Manipal", type: "Private", state: "Karnataka", city: "Manipal", courses: ["B.A. Culinary Arts", "BHM"], fees: { min: 200_000, max: 600_000 }, website: "https://wgsha.manipal.edu", admissionLink: "https://wgsha.manipal.edu/admissions", hostel: true },

  /* ─── More NLUs ─── */
  { name: "NLU Hyderabad", type: "Govt", state: "Telangana", city: "Hyderabad", nirfRank: 4, courses: ["BA LLB", "LLM"], fees: { min: 250_000, max: 500_000 }, website: "https://nalsar.ac.in", admissionLink: "https://consortiumofnlus.ac.in", hostel: true },
  { name: "NLU Kolkata (WBNUJS)", type: "Govt", state: "West Bengal", city: "Kolkata", nirfRank: 8, courses: ["BA LLB", "LLM"], fees: { min: 250_000, max: 500_000 }, website: "https://www.nujs.edu", admissionLink: "https://consortiumofnlus.ac.in", hostel: true },
  { name: "Gujarat National Law University", type: "Govt", state: "Gujarat", city: "Gandhinagar", courses: ["BA LLB", "LLM"], fees: { min: 220_000, max: 500_000 }, website: "https://gnlu.ac.in", admissionLink: "https://consortiumofnlus.ac.in", hostel: true },
  { name: "NLIU Bhopal", type: "Govt", state: "Madhya Pradesh", city: "Bhopal", courses: ["BA LLB", "LLM"], fees: { min: 220_000, max: 500_000 }, website: "https://www.nliu.ac.in", admissionLink: "https://consortiumofnlus.ac.in", hostel: true },
];
