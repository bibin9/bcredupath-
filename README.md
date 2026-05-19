# 🎯 BCRedupath

> Built by **Bibin CutRiver** · Gamified CBSE Class 10 & 12 board-prep · Duolingo-meets-Brilliant

**Status:** All 6 sprints complete. 40 routes. 900+ questions seeded. PWA-installable. Production-ready.

---

## Quick start

```bash
cp .env.example .env.local        # then fill MONGODB_URI + NEXTAUTH_SECRET

npm install
npm run seed                       # 51 hand-curated Class 10 questions
npm run seed:ai                    # ~340 AI-generated (needs ANTHROPIC_API_KEY, ~$3.50)
npm run seed:content               # 129 careers/colleges/exams/scholarships/counselors

npm run dev                        # http://localhost:3000
```

### Required env vars

| Key | What | Where |
|---|---|---|
| `MONGODB_URI` | Database | https://cloud.mongodb.com (free Atlas M0) |
| `NEXTAUTH_SECRET` | JWT signing | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | OAuth callback | `http://localhost:3000` for dev |

### Optional (unlocks features)

| Key | Unlocks |
|---|---|
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | "Continue with Google" button |
| `ANTHROPIC_API_KEY` | AI question generator (`npm run seed:ai`) |
| `CLOUDINARY_*` | Image uploads (not used yet) |

---

## What's in the box

### Sprint 1 — Foundation
Next.js 14 (App Router) + TypeScript + Tailwind. Dark neon design system (Bricolage / Plus Jakarta / JetBrains Mono fonts, glassmorphism cards, neon glow shadows, gradient blobs). NextAuth with Credentials + optional Google. All 9 Mongoose models. 5-step animated onboarding with branching (class → stream skipped for Class 10). Sidebar + mobile bottom nav + top bar with XP/streak.

### Sprint 2 — Question Bank
51 hand-curated Class 10 Math + Science questions (representative across all chapters). KaTeX-rendered LaTeX (`$...$` inline, `$$...$$` block). Filters API with chapter aggregation. URL-state filter UI. Bookmark API + optimistic UI button. MCQ tap-to-answer, expandable solution panel with common-mistakes + related-concepts sections.

### Sprint 3 — Predictor + Practice
AI Question Predictor at `/dashboard/predictor` with top-10 medal list, animated chapter heatmap (27 chapters), Sleeper Alert (high-frequency topics dormant 3+ years), "If I study top 20" expected-score calculator. **6 practice modes**: Daily Challenge, Hot 20 Sprint, Rapid Fire MCQ (30s/Q timer), PYQ Marathon, Random Roulette, Weakness Hunter, Predicted Paper. Live PracticeRunner with progress bar, score counter, instant feedback, +XP toasts, emoji confetti. Results screen with grade (S/A/B/C/D), XP breakdown, level-up callout, new-badge gallery, share. XP/streak/badge engine atomically updates Mongo on submit.

### Sprint 4 — Leaderboard + Daily Challenge
Live leaderboard at `/dashboard/leaderboard` with 4 scope tabs (All India / State / City / School — disabled with tooltips for scopes you haven't set) and 4 period tabs (Daily / Weekly / Monthly / All time). Animated top-3 podium, ranked list with avatars + state + streak. Your-rank card always visible with "X XP behind [leader]". Daily Challenge auto-generates one challenge per day globally (deterministic seeded shuffle), rotates subjects, +100 XP bonus on completion (idempotent via `$addToSet`).

### Sprint 5 — Career, Colleges, Exams, Scholarships, Counselors
**35 careers** across engineering/medical/commerce/law/design/media/research/civil-services/defense. Each with day-in-life, salary tiers (₹entry/mid/senior), entrance exams (deep-linked), top colleges (populated from College docs), skills, interest tags. **20-question Tinder-style interest quiz** at `/dashboard/careers/quiz` with Holland Code-style matcher → personalized careers with **match %**. **43 colleges** (IITs/NITs/IIMs/AIIMS/NLUs/NIDs/IISERs + private + state) with NIRF ranks, fees, courses. **20 entrance exams** with calendar tiles + days-away countdown. **21 scholarships** (national + state + private) with "Match my profile" filter. **10 counselors + 5 verified helplines** (iCALL, Vandrevala 24×7, CBSE, KIRAN, Fortis).

### Sprint 6 — Launch polish
- **PWA**: `/manifest.webmanifest`, `/sw.js` (network-first APIs, stale-while-revalidate for question bank, cache-first for static assets), `/offline.html` fallback, animated install banner with localStorage dismissal memory, iOS apple-touch-icon
- **Study Planner** at `/dashboard/planner`: Pomodoro 25/5/15 with animated SVG circle progress + Web Audio beep, days-to-boards countdown, suggested Q/day target computed from remaining time, weekly stats, per-subject time allocation bars
- **In-app notification bell** with computed alerts (daily challenge ready, streak risk, leaderboard gap, fresh badge) — no separate Notification model, derives from current state
- **Custom 404** at `app/not-found.tsx` with branded gradient blobs
- **Hindi i18n scaffold** ([lib/i18n.ts](lib/i18n.ts) + `LocaleToggle` component in profile settings) — translations defined for key strings; full route-localized i18n via next-intl is a separate sprint

---

## Architecture

```
app/
├── page.tsx                          # public landing
├── not-found.tsx                     # 404
├── (auth)/                           # login, signup, onboarding
├── dashboard/                        # all gated routes
│   ├── page.tsx                      # home: hero + daily challenge + subjects + badges
│   ├── bank/[subject]/page.tsx       # question bank with filters + LaTeX
│   ├── predictor/page.tsx            # top picks + heatmap + sleepers
│   ├── practice/[mode]/page.tsx      # 7 modes + live runner + results
│   ├── leaderboard/page.tsx          # scoped + periodic ranks
│   ├── careers/                      # index + quiz + detail
│   ├── colleges, exams, scholarships, counselors, planner, profile
└── api/                              # 18 endpoints

lib/
├── db.ts                              # Mongoose with serverless cache
├── auth.ts                            # NextAuth config
├── claude.ts                          # Anthropic SDK
├── gamification.ts                    # XP/level/streak/badge logic (pure)
├── predictor.ts                       # probability algorithm
├── practice-modes.ts                  # mode definitions
├── career-matcher.ts                  # Holland Code scorer + 20-Q quiz
├── daily-challenge.ts                 # ensure-today helper
├── i18n.ts                            # Hindi translations
├── seed/                              # all curated data
└── ...

models/                                # 9 Mongoose models
components/
├── shared/                            # Sidebar, BottomNav, TopBar, NotificationBell, PWARegister
├── game/                              # XPBar, StreakCounter, BadgeChip, SubjectCard, DailyChallengeCard
├── questions/                         # Latex, PredictionBadge, QuestionCard, SolutionPanel, BookmarkButton, Filters
├── practice/                          # PracticeRunner, ResultsScreen, ConfettiBurst
├── predictor/                         # TopPredicted, HeatMap, SleeperAlert
├── careers/                           # CareerCard, CareerQuiz
├── leaderboard/                       # Podium, LeaderboardRow, ScopeTabs
├── onboarding/                        # OnboardingFlow (5 steps)
└── planner/                           # Pomodoro

scripts/
├── seed.mjs                           # 51 hand-curated questions
├── seed-ai.mjs                        # Claude batch generator
├── seed-ai-retry.mjs                  # retry failed chapters
├── seed-content.mjs                   # 129 careers/colleges/etc.
└── test-mongo.mjs                     # connection diagnostic
```

## Scripts

```bash
npm run dev               # dev server (http://localhost:3000)
npm run build             # production build
npm run start             # serve the build
npm run lint              # eslint
npm run typecheck         # tsc --noEmit
npm run seed              # re-seed hand-curated 51 questions
npm run seed:ai           # bulk AI-generate questions (clears + regenerates)
npm run seed:ai:retry     # retry specific failed chapters
npm run seed:content      # re-seed careers/colleges/exams/scholarships/counselors
npm run test:mongo        # standalone Mongo connection test
```

---

## Deploying to Vercel

```bash
# One-time
npm i -g vercel
vercel login
vercel link

# Set production env vars (from the Vercel dashboard or CLI):
#   MONGODB_URI, NEXTAUTH_SECRET, NEXTAUTH_URL (=https://your-domain.vercel.app),
#   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET (optional),
#   ANTHROPIC_API_KEY (optional)

vercel --prod
```

**Atlas IP allowlist:** if you're using a free M0 cluster, make sure `0.0.0.0/0` is in **Network Access** (Vercel functions get rotating IPs).

**Google OAuth:** add `https://your-domain.vercel.app/api/auth/callback/google` to authorized redirect URIs in Google Cloud Console.

---

## Known limitations / what to do before launch

1. **Replace placeholder counselors** in [lib/seed/counselors.ts](lib/seed/counselors.ts) — names are dummies. The 5 helplines underneath ARE real and verifiable.
2. **Verify CBSE 2021–2025 PYQ accuracy** — the 340 AI-generated questions are CBSE-pattern realistic but not literal copies of real papers. Tag clearly in your UI if needed.
3. **Push notifications**: in-app bell works fine; for actual web push, wire OneSignal or implement Web Push API in `/api/notifications/subscribe`.
4. **Real PNG icons**: the manifest currently references `/icon.svg`. iOS in some standalone contexts wants PNG — generate 192/512 PNG versions before App Store submission.
5. **Rate-limit AI generation**: `seed:ai` is sequential to stay under Anthropic tier-0 limits. With higher tier or paid quota, bump concurrency in `scripts/seed-ai.mjs`.
6. **Cron snapshots for leaderboard**: live aggregation is fine up to ~10K users. Add a Vercel cron job (`api/cron/leaderboard-snapshot`) once you cross that scale.

---

## Author

**Bibin CutRiver** · 2026 · Built for Indian Class 10 & 12 students.
