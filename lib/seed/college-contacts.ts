/**
 * Contact info overrides for the most-referenced colleges. Applied to
 * the College documents after seeding by matching on `name`.
 *
 * Phone numbers and emails are publicly-listed institutional contact
 * info (NOT individual staff). Verify before relying on for admissions.
 */

export type CollegeContact = {
  address?: string;
  phone?: string;
  email?: string;
};

export const COLLEGE_CONTACTS: Record<string, CollegeContact> = {
  /* ─── IITs ─── */
  "IIT Madras": {
    address: "Indian Institute of Technology Madras, Sardar Patel Road, Chennai 600036, Tamil Nadu, India",
    phone: "+91-44-2257-8280",
    email: "info@iitm.ac.in",
  },
  "IIT Delhi": {
    address: "Indian Institute of Technology Delhi, Hauz Khas, New Delhi 110016, India",
    phone: "+91-11-2659-1749",
    email: "registrar@admin.iitd.ac.in",
  },
  "IIT Bombay": {
    address: "Indian Institute of Technology Bombay, Powai, Mumbai 400076, Maharashtra, India",
    phone: "+91-22-2572-2545",
    email: "registrar@iitb.ac.in",
  },
  "IIT Kanpur": {
    address: "Indian Institute of Technology Kanpur, Kalyanpur, Kanpur 208016, Uttar Pradesh, India",
    phone: "+91-512-259-7000",
    email: "registrar@iitk.ac.in",
  },
  "IIT Kharagpur": {
    address: "Indian Institute of Technology Kharagpur, Kharagpur 721302, West Bengal, India",
    phone: "+91-3222-255-221",
    email: "registrar@adm.iitkgp.ac.in",
  },
  "IIT Roorkee": {
    address: "Indian Institute of Technology Roorkee, Roorkee 247667, Uttarakhand, India",
    phone: "+91-1332-285-311",
    email: "registrar@iitr.ac.in",
  },
  "IIT Guwahati": {
    address: "Indian Institute of Technology Guwahati, Amingaon, North Guwahati 781039, Assam, India",
    phone: "+91-361-258-2150",
    email: "registrar@iitg.ac.in",
  },
  "IIT Hyderabad": {
    address: "Indian Institute of Technology Hyderabad, Kandi, Sangareddy 502285, Telangana, India",
    phone: "+91-40-2301-7000",
    email: "registrar@iith.ac.in",
  },
  "IIT Palakkad": {
    address: "Indian Institute of Technology Palakkad, Ahalia Integrated Campus, Kozhippara, Palakkad 678557, Kerala, India",
    phone: "+91-4923-226-300",
    email: "office.dean.ap@iitpkd.ac.in",
  },

  /* ─── NITs ─── */
  "NIT Trichy": {
    address: "National Institute of Technology Tiruchirappalli, Tanjore Main Road, Tiruchirappalli 620015, Tamil Nadu, India",
    phone: "+91-431-250-3000",
    email: "registrar@nitt.edu",
  },
  "NIT Surathkal": {
    address: "National Institute of Technology Karnataka, Srinivasnagar, Surathkal, Mangalore 575025, Karnataka, India",
    phone: "+91-824-247-3000",
    email: "registrar@nitk.edu.in",
  },
  "NIT Warangal": {
    address: "National Institute of Technology Warangal, Hanamkonda, Warangal 506004, Telangana, India",
    phone: "+91-870-246-2002",
    email: "registrar@nitw.ac.in",
  },
  "NIT Calicut": {
    address: "National Institute of Technology Calicut, NIT Campus PO, Kozhikode 673601, Kerala, India",
    phone: "+91-495-228-6101",
    email: "registrar@nitc.ac.in",
  },

  /* ─── IIITs ─── */
  "IIIT Hyderabad": {
    address: "International Institute of Information Technology Hyderabad, Gachibowli, Hyderabad 500032, Telangana, India",
    phone: "+91-40-6653-1000",
    email: "admissions@iiit.ac.in",
  },
  "IIIT Kottayam": {
    address: "Indian Institute of Information Technology Kottayam, Valavoor PO, Pala, Kottayam 686635, Kerala, India",
    phone: "+91-481-258-6900",
    email: "office@iiitkottayam.ac.in",
  },

  /* ─── Private engineering ─── */
  "BITS Pilani": {
    address: "Birla Institute of Technology and Science, Pilani 333031, Rajasthan, India",
    phone: "+91-1596-242-205",
    email: "admission@pilani.bits-pilani.ac.in",
  },
  "VIT Vellore": {
    address: "Vellore Institute of Technology, Tiruvalam Road, Katpadi, Vellore 632014, Tamil Nadu, India",
    phone: "+91-416-220-2125",
    email: "ugadmission@vit.ac.in",
  },
  "Manipal Institute of Technology": {
    address: "Manipal Institute of Technology, MAHE, Manipal 576104, Karnataka, India",
    phone: "+91-820-292-3000",
    email: "admissions@manipal.edu",
  },

  /* ─── Medical ─── */
  "AIIMS Delhi": {
    address: "All India Institute of Medical Sciences, Ansari Nagar, New Delhi 110029, India",
    phone: "+91-11-2658-8500",
    email: "registrar@aiims.edu",
  },
  "CMC Vellore": {
    address: "Christian Medical College, Ida Scudder Road, Vellore 632004, Tamil Nadu, India",
    phone: "+91-416-228-1000",
    email: "registrar@cmcvellore.ac.in",
  },
  "AFMC Pune": {
    address: "Armed Forces Medical College, Sholapur Road, Pune 411040, Maharashtra, India",
    phone: "+91-20-2630-3000",
    email: "afmc-mh@nic.in",
  },
  "JIPMER Puducherry": {
    address: "JIPMER, Dhanvantri Nagar, Puducherry 605006, India",
    phone: "+91-413-227-2380",
    email: "registrar@jipmer.edu.in",
  },
  "Maulana Azad Medical College": {
    address: "Maulana Azad Medical College, 2 Bahadur Shah Zafar Marg, New Delhi 110002, India",
    phone: "+91-11-2323-9271",
    email: "principal@mamc.ac.in",
  },
  "PGIMER Chandigarh": {
    address: "Post Graduate Institute of Medical Education and Research, Sector 12, Chandigarh 160012, India",
    phone: "+91-172-275-6565",
    email: "registrar@pgimer.edu.in",
  },
  "NIMHANS Bangalore": {
    address: "National Institute of Mental Health and Neurosciences, Hosur Road, Bangalore 560029, Karnataka, India",
    phone: "+91-80-2699-5001",
    email: "registrar.nimhans@gmail.com",
  },
  "Government Medical College Thiruvananthapuram": {
    address: "Government Medical College, Medical College PO, Thiruvananthapuram 695011, Kerala, India",
    phone: "+91-471-244-3537",
    email: "tmckerala@gmail.com",
  },
  "Government Medical College Kozhikode": {
    address: "Government Medical College, Kozhikode 673008, Kerala, India",
    phone: "+91-495-235-0216",
    email: "gmckkdprincipal@gmail.com",
  },

  /* ─── IIMs ─── */
  "IIM Ahmedabad": {
    address: "Indian Institute of Management Ahmedabad, Vastrapur, Ahmedabad 380015, Gujarat, India",
    phone: "+91-79-7152-4881",
    email: "admissions@iima.ac.in",
  },
  "IIM Bangalore": {
    address: "Indian Institute of Management Bangalore, Bannerghatta Road, Bangalore 560076, Karnataka, India",
    phone: "+91-80-2699-3000",
    email: "admissions@iimb.ac.in",
  },
  "IIM Calcutta": {
    address: "Indian Institute of Management Calcutta, D.H. Road, Joka, Kolkata 700104, West Bengal, India",
    phone: "+91-33-2467-8300",
    email: "registrar@iimcal.ac.in",
  },
  "IIM Kozhikode": {
    address: "Indian Institute of Management Kozhikode, IIMK Campus PO, Kozhikode 673570, Kerala, India",
    phone: "+91-495-280-9100",
    email: "admissions@iimk.ac.in",
  },
  "ISB Hyderabad": {
    address: "Indian School of Business, Gachibowli, Hyderabad 500111, Telangana, India",
    phone: "+91-40-2300-7000",
    email: "admissions@isb.edu",
  },

  /* ─── Law ─── */
  "NLSIU Bangalore": {
    address: "National Law School of India University, Nagarbhavi, Bangalore 560072, Karnataka, India",
    phone: "+91-80-2316-0532",
    email: "registrar@nls.ac.in",
  },
  "NALSAR Hyderabad": {
    address: "NALSAR University of Law, Justice City, Shameerpet, Hyderabad 500101, Telangana, India",
    phone: "+91-40-2349-8104",
    email: "registrar@nalsar.ac.in",
  },
  "NLU Delhi": {
    address: "National Law University Delhi, Sector 14, Dwarka, New Delhi 110078, India",
    phone: "+91-11-2803-4250",
    email: "registrar@nludelhi.ac.in",
  },

  /* ─── Commerce / Arts ─── */
  "SRCC (Delhi University)": {
    address: "Shri Ram College of Commerce, Maurice Nagar, University of Delhi, Delhi 110007, India",
    phone: "+91-11-2766-7905",
    email: "principaloffice@srcc.du.ac.in",
  },
  "Hindu College (DU)": {
    address: "Hindu College, University of Delhi, Delhi 110007, India",
    phone: "+91-11-2766-7184",
    email: "principal@hinducollege.ac.in",
  },
  "St. Stephen's College (DU)": {
    address: "St. Stephen's College, University of Delhi, Delhi 110007, India",
    phone: "+91-11-2766-7271",
    email: "principal@ststephens.edu",
  },
  "Christ University": {
    address: "Christ University, Hosur Road, Bangalore 560029, Karnataka, India",
    phone: "+91-80-4012-9100",
    email: "mail@christuniversity.in",
  },

  /* ─── Design ─── */
  "NID Ahmedabad": {
    address: "National Institute of Design, Paldi, Ahmedabad 380007, Gujarat, India",
    phone: "+91-79-2662-9500",
    email: "info@nid.edu",
  },
  "NIFT Delhi": {
    address: "National Institute of Fashion Technology, Hauz Khas, New Delhi 110016, India",
    phone: "+91-11-2685-1037",
    email: "campus.delhi@nift.ac.in",
  },

  /* ─── Research ─── */
  "IISc Bangalore": {
    address: "Indian Institute of Science, CV Raman Road, Bangalore 560012, Karnataka, India",
    phone: "+91-80-2293-2444",
    email: "registrar@iisc.ac.in",
  },
  "IISER Pune": {
    address: "Indian Institute of Science Education and Research Pune, Dr Homi Bhabha Road, Pune 411008, Maharashtra, India",
    phone: "+91-20-2590-8001",
    email: "registrar@iiserpune.ac.in",
  },
  "IISER Thiruvananthapuram": {
    address: "IISER Thiruvananthapuram, Maruthamala PO, Vithura, Thiruvananthapuram 695551, Kerala, India",
    phone: "+91-471-277-8000",
    email: "registrar@iisertvm.ac.in",
  },
  "IIST Thiruvananthapuram": {
    address: "Indian Institute of Space Science and Technology, Valiamala PO, Thiruvananthapuram 695547, Kerala, India",
    phone: "+91-471-256-8400",
    email: "registrar@iist.ac.in",
  },
  "ISI Kolkata": {
    address: "Indian Statistical Institute, 203 B.T. Road, Kolkata 700108, West Bengal, India",
    phone: "+91-33-2575-2001",
    email: "dean@isical.ac.in",
  },
  "CMI Chennai": {
    address: "Chennai Mathematical Institute, H1 SIPCOT IT Park, Siruseri, Kelambakkam 603103, Tamil Nadu, India",
    phone: "+91-44-6748-0900",
    email: "admissions@cmi.ac.in",
  },
  "Amrita Vishwa Vidyapeetham (Amritapuri)": {
    address: "Amrita Vishwa Vidyapeetham, Amritapuri PO, Clappana, Kollam 690525, Kerala, India",
    phone: "+91-476-280-3110",
    email: "info@amrita.edu",
  },
  "Cochin University of Science & Tech (CUSAT)": {
    address: "Cochin University of Science and Technology, South Kalamassery, Kochi 682022, Kerala, India",
    phone: "+91-484-257-7550",
    email: "registrar@cusat.ac.in",
  },

  /* ─── Kerala state ─── */
  "College of Engineering Trivandrum (CET)": {
    address: "College of Engineering Trivandrum, Sreekariyam PO, Thiruvananthapuram 695016, Kerala, India",
    phone: "+91-471-251-5555",
    email: "principal@cet.ac.in",
  },
  "Government Engineering College Thrissur": {
    address: "Government Engineering College, Thrissur 680009, Kerala, India",
    phone: "+91-487-233-4144",
    email: "principal@gectcr.ac.in",
  },

  /* ─── Liberal arts ─── */
  "Ashoka University": {
    address: "Ashoka University, Plot No. 2, Rajiv Gandhi Education City, Sonipat 131029, Haryana, India",
    phone: "+91-130-230-0000",
    email: "admissions@ashoka.edu.in",
  },

  /* ─── Govt institutes ─── */
  "IIMC Delhi": {
    address: "Indian Institute of Mass Communication, Aruna Asaf Ali Marg, JNU New Campus, New Delhi 110067, India",
    phone: "+91-11-2674-1239",
    email: "admin@iimc.gov.in",
  },
  "FTII Pune": {
    address: "Film and Television Institute of India, Law College Road, Pune 411004, Maharashtra, India",
    phone: "+91-20-2543-1000",
    email: "info@ftiindia.com",
  },

  /* ─── Abroad ─── */
  "Massachusetts Institute of Technology (MIT)": {
    address: "Massachusetts Institute of Technology, 77 Massachusetts Avenue, Cambridge MA 02139, USA",
    phone: "+1-617-253-1000",
    email: "admissions@mit.edu",
  },
  "Stanford University": {
    address: "Stanford University, 450 Jane Stanford Way, Stanford CA 94305, USA",
    phone: "+1-650-723-2300",
    email: "admission@stanford.edu",
  },
  "Harvard University": {
    address: "Harvard University, Massachusetts Hall, Cambridge MA 02138, USA",
    phone: "+1-617-495-1000",
    email: "college@fas.harvard.edu",
  },
  "Carnegie Mellon University (CMU)": {
    address: "Carnegie Mellon University, 5000 Forbes Avenue, Pittsburgh PA 15213, USA",
    phone: "+1-412-268-2000",
    email: "undergraduate-admission@andrew.cmu.edu",
  },
  "UC Berkeley": {
    address: "University of California Berkeley, Berkeley CA 94720, USA",
    phone: "+1-510-642-6000",
    email: "ouars@berkeley.edu",
  },
  "University of Oxford": {
    address: "University of Oxford, University Offices, Wellington Square, Oxford OX1 2JD, United Kingdom",
    phone: "+44-1865-270-000",
    email: "undergraduate.admissions@admin.ox.ac.uk",
  },
  "University of Cambridge": {
    address: "University of Cambridge, The Old Schools, Trinity Lane, Cambridge CB2 1TN, United Kingdom",
    phone: "+44-1223-337-733",
    email: "admissions@cam.ac.uk",
  },
  "Imperial College London": {
    address: "Imperial College London, South Kensington Campus, London SW7 2AZ, United Kingdom",
    phone: "+44-20-7589-5111",
    email: "registry@imperial.ac.uk",
  },
  "University of Toronto": {
    address: "University of Toronto, 27 King's College Circle, Toronto ON M5S 1A1, Canada",
    phone: "+1-416-978-2011",
    email: "ask@utoronto.ca",
  },
  "University of Waterloo": {
    address: "University of Waterloo, 200 University Avenue West, Waterloo ON N2L 3G1, Canada",
    phone: "+1-519-888-4567",
    email: "registrar@uwaterloo.ca",
  },
  "McGill University": {
    address: "McGill University, 845 Sherbrooke Street West, Montreal QC H3A 0G4, Canada",
    phone: "+1-514-398-4455",
    email: "admissions@mcgill.ca",
  },
  "National University of Singapore (NUS)": {
    address: "National University of Singapore, 21 Lower Kent Ridge Road, Singapore 119077",
    phone: "+65-6516-6666",
    email: "askadm@nus.edu.sg",
  },
  "Nanyang Technological University (NTU)": {
    address: "Nanyang Technological University, 50 Nanyang Avenue, Singapore 639798",
    phone: "+65-6791-1744",
    email: "admissions@ntu.edu.sg",
  },
  "Technical University of Munich (TUM)": {
    address: "Technische Universität München, Arcisstraße 21, 80333 München, Germany",
    phone: "+49-89-289-01",
    email: "studium@tum.de",
  },
  "RWTH Aachen": {
    address: "RWTH Aachen University, Templergraben 55, 52062 Aachen, Germany",
    phone: "+49-241-80-1",
    email: "registrar@rwth-aachen.de",
  },
  "University of Melbourne": {
    address: "University of Melbourne, Grattan Street, Parkville VIC 3010, Australia",
    phone: "+61-3-9035-5511",
    email: "13-melb@unimelb.edu.au",
  },
  "University of Sydney": {
    address: "University of Sydney, Camperdown NSW 2006, Australia",
    phone: "+61-2-9351-2222",
    email: "international.office@sydney.edu.au",
  },
  "TU Delft": {
    address: "Delft University of Technology, Mekelweg 5, 2628 CD Delft, Netherlands",
    phone: "+31-15-278-9111",
    email: "info@tudelft.nl",
  },
};
