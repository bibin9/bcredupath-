# BCRedupath — User Manual (v1 Beta)

**Tagline:** Crack board & pick your career.
**For:** CBSE Class 10 & 12 students (India + NRI)
**Live at:** [bcredupath.vercel.app](https://bcredupath.vercel.app)

---

## 1. Sign up & onboarding (60 seconds)

1. Open **bcredupath.vercel.app** → **Sign up** (email/password or Google)
2. 5-step onboarding:
   - Name + avatar (24 emojis)
   - **Class** → 10 or 12
   - **Stream** (Class 12 only) → PCM / PCB / Commerce / Humanities
   - **Location** → 🇮🇳 India (then pick state) **or** 🌍 Outside India (then pick country — for NRI students)
   - Interest tags (pick ≥3) — drives career matches
3. You land on the **Dashboard**.

> **NRI students:** picking "Outside India" auto-sets currency (USD/AED/etc.) and unlocks NRI quota seat info on colleges.

---

## 2. Dashboard (`/dashboard`)

Top strip shows your **Class · Stream · Session 2026-27** + a live countdown to **CBSE 2027 Boards**.

| Widget | What it does |
|---|---|
| Streak 🔥 | Days in a row you've practiced |
| XP / Level | Earned per question. Climbs rank Bronze → Diamond |
| Daily Challenge | Today's curated 10 questions for bonus XP |
| Quick Modes | One-tap into Hot 20, Rapid Fire, PYQ Marathon, Random |
| Your Subjects | Grid of your stream's subjects (split for Class 10) |

---

## 3. Question Bank (`/dashboard/bank`)

- **Class 10** sees subjects split: Math · Physics · Chemistry · Biology · History · Geography · Civics · Economics · English
- **Class 12 PCM** sees: Physics · Chemistry · Math · English (other streams similarly)
- **2,317 questions** indexed · **801 marked 🇮🇳 CBSE Official** (from 2023 + 2024 sample papers)

**Per subject:**
- Sidebar filters: chapter, type (MCQ / SA / LA / Case Study / Assertion-Reason), difficulty, marks, year asked
- Click a question → see options → reveal solution + common mistakes + related concepts
- Star ⭐ to bookmark

---

## 4. Practice (`/dashboard/practice`)

Pick a mode → 10-30 timed questions → auto-submit → XP + badges:

| Mode | Description |
|---|---|
| 🔥 Hot 20 | Top 20 predicted Qs across all subjects |
| ⚡ Rapid Fire | MCQ-only sprint, 45s each |
| 📅 PYQ Marathon | Recent board years only |
| 🎯 Weakness Hunter | Hard + medium Qs from your weak chapters |
| 🎲 Random | Shuffle |
| 📝 Predicted Paper | Mock paper with predicted Q probabilities |

---

## 5. Predictor (`/dashboard/predictor`)

AI scores every question 0–100% for board-likelihood based on frequency, recency, topic weight, and "sleeper" boost (high-freq but not asked in 3+ years).

- **Top 20** ranked list
- **Heatmap** of chapters by predicted probability
- **Sleeper Alerts** — chapters overdue to reappear

---

## 6. Careers (`/dashboard/careers`)

**158 careers** across 12 categories. Click any → full detail page.

- **🔍 Search bar** at top — by name, skill, subject, interest tag
- **Sort:** A→Z · Mid-career salary · Senior salary
- **Category tabs:** Tech, Engineering, Medical, Commerce, Law, Design, Media, Research, Civil Services, Defense

**Each career page has:**
- Day-in-life · Salary tiles (in your chosen currency)
- **Roadmap:** Class 10 → Class 12 stream → UG degree → PG (optional) → Final role
- Click any **degree node** → drawer of colleges offering that degree with phone/email/website
- NRI quota info appears automatically if you're an NRI student
- Qualifications · Skills required · Entrance exams · Top colleges

### Career Quiz (`/dashboard/careers/quiz`)
- Step 1: pick subjects you enjoy
- Step 2: 20 swipe-style "Is this me?" questions
- Result: % match scores against all 158 careers

---

## 7. Colleges (`/dashboard/colleges`)

**155 colleges** — Indian (govt + private) + international.

- Filter by state, country, course type
- Each card shows: NIRF rank, courses offered, contact details
- **55 top colleges** carry NRI quota info (fee, seat %, cutoff notes)

---

## 8. Entrance Exams (`/dashboard/exams`)

**59 exams** indexed (13 international).

- **Search + 13 field tabs** + India/International scope toggle
- Upcoming exams sorted to top with a `Nd` countdown when ≤60 days away
- Click any exam → detail page with:
  - 4 date tiles (open / close / exam / fee)
  - **Step-by-step "how to apply"**
  - **Careers it opens** (clickable)
  - **Colleges that accept it**

Coverage: JEE Main/Adv · NEET · CUET · CLAT · CAT · GATE · NDA · CA · CFA · SAT · GRE · GMAT · IELTS · TOEFL · MCAT · UCAT · Oxford · JLPT + more.

---

## 9. Scholarships (`/dashboard/scholarships`)

**29 schemes** — 10 NRI-eligible.
- Filter by type (Govt / Private / Merit / Need / NRI)
- "Match my profile" filters by your state
- NRI students see an **NRI-only** toggle (defaults ON)
- Amount shown in your preferred currency

---

## 10. Profile (`/dashboard/profile`)

Edit anything you set at onboarding:
- **Class & Stream** — promoted from 10 to 12? Wrong stream? Fix here.
- **Location** — flip India ↔ NRI any time
- **Currency** — INR / USD / AED / SAR / SGD / GBP / EUR / AUD / CAD (career salaries + college fees auto-convert)
- **Language** — English / Hindi (key surfaces)
- **Parent share** — generate a read-only link for your parent
- **Install as app** (PWA — works offline)

---

## 11. Leaderboard (`/dashboard/leaderboard`)

Compete by:
- **Scope:** All India / Your State / Your City / Your School (or Country / City / School if NRI)
- **Period:** Today / This week / This month / All time

---

## 12. Tips & shortcuts

- **Streak protection:** practice at least 1 question/day to keep your fire alive
- **Bookmarks:** ⭐ questions you want to revisit → `/dashboard/bookmarks`
- **Daily Challenge:** highest XP-per-minute reward each day
- **Install as PWA:** Profile → "Install App" for offline access & home-screen icon
- **Beta banner** at the top: tap **Report** to email feedback (helps us improve)

---

## 13. Features currently paused

Three AI-powered features are temporarily off (no API costs while in beta):
- Ask AI doubt resolver
- AI-generated revision notes
- AI question generator

Visiting their URLs shows a "paused" notice with links to working alternatives (Question Bank, Predictor, Practice).

---

## 14. Quick reference — every URL

| URL | What's there |
|---|---|
| `/` | Public landing page |
| `/login` | Sign in |
| `/signup` | Create account |
| `/onboarding` | First-time setup wizard |
| `/dashboard` | Home — streak, XP, daily challenge, subjects |
| `/dashboard/bank` | Question bank index |
| `/dashboard/bank/[subject]` | Subject's chapters + questions |
| `/dashboard/bookmarks` | Your starred questions |
| `/dashboard/predictor` | Top 20 + heatmap + sleeper alerts |
| `/dashboard/practice` | Pick a practice mode |
| `/dashboard/practice/[mode]` | Run the practice session |
| `/dashboard/analytics` | Your progress / accuracy / streaks chart |
| `/dashboard/leaderboard` | Rank vs other students |
| `/dashboard/careers` | 158 careers (searchable + filterable) |
| `/dashboard/careers/[id]` | Single-career roadmap + colleges |
| `/dashboard/careers/quiz` | 20-Q interest quiz → matched careers |
| `/dashboard/colleges` | 155 colleges (India + abroad) |
| `/dashboard/scholarships` | 29 scholarship schemes |
| `/dashboard/exams` | 59 entrance exams (search + filter) |
| `/dashboard/exams/[id]` | Exam detail: apply guide, careers, colleges |
| `/dashboard/counselors` | (Coming with launch — counselor directory) |
| `/dashboard/planner` | Pomodoro + weekly suggested study load |
| `/dashboard/install` | PWA install guide (iOS / Android / desktop) |
| `/dashboard/profile` | Edit class, stream, country, currency, language |
| `/parent/[token]` | Read-only parent dashboard (token from Profile) |

---

**Author:** Bibin CutRiver
**Live at:** [bcredupath.vercel.app](https://bcredupath.vercel.app)
**Beta feedback:** Tap **Report** on the banner in any page.
