import type { Metadata } from "next";
import { LegalLayout } from "@/components/shared/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — BCRedupath",
  description: "How BCRedupath collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Plain English. No fine print tricks."
      lastUpdated="18 May 2026"
    >
      <Section title="The short version">
        <ul>
          <li>We collect your name, email, school, state, and your in-app activity (XP, streaks, practice attempts).</li>
          <li>We never sell your data. We don't run ads.</li>
          <li>If you're under 18, we ask for a parent/guardian to consent on your behalf at signup.</li>
          <li>You can delete your account and all your data anytime by emailing us.</li>
        </ul>
      </Section>

      <Section title="1. Who we are">
        <p>
          BCRedupath ("we", "us") is operated by <strong>Bibin CutRiver</strong>. We
          provide a CBSE Class 10 & 12 board-prep app to Indian students.
        </p>
        <p>
          For privacy questions or data requests, write to{" "}
          <a href="mailto:privacy@bcredupath.example" className="text-neon-cyan hover:underline">
            privacy@bcredupath.example
          </a>
          .
        </p>
      </Section>

      <Section title="2. What we collect">
        <h3>You give us:</h3>
        <ul>
          <li><strong>Name + email</strong> (to create your account, send sign-in emails)</li>
          <li><strong>Class, stream, state, city, school</strong> (to personalise the question bank and leaderboard)</li>
          <li><strong>Avatar emoji + interest tags</strong> from onboarding (to match careers)</li>
          <li><strong>Password</strong> — stored only as a one-way bcrypt hash. We can never see it.</li>
        </ul>
        <h3>We collect automatically:</h3>
        <ul>
          <li><strong>Practice activity</strong> — questions attempted, correct/incorrect, time spent, mode</li>
          <li><strong>XP, streak, level, badges</strong> — the gamification state</li>
          <li><strong>Last active date</strong> (for streak tracking)</li>
          <li><strong>Bookmarks</strong> you save</li>
        </ul>
        <h3>What we do NOT collect:</h3>
        <ul>
          <li>Your phone contacts, photos, or files</li>
          <li>Your location beyond what you tell us</li>
          <li>Browsing history outside our app</li>
          <li>Payment info — we don't take payments</li>
        </ul>
      </Section>

      <Section title="3. Children & parental consent (under 18)">
        <p>
          India's Digital Personal Data Protection Act, 2023 requires verifiable
          parental consent before processing the personal data of children
          (under 18). When you sign up, we ask:
        </p>
        <ul>
          <li>Your age / class</li>
          <li>If under 18, a parent/guardian's consent at signup (checkbox + email)</li>
        </ul>
        <p>
          We never use data of children to target ads or build behavioural profiles.
          Parents can write to us anytime to view, correct, or delete their child's data.
        </p>
      </Section>

      <Section title="4. How we use your data">
        <p>Only for these purposes:</p>
        <ul>
          <li>Show you questions and predictions relevant to your class/stream/state</li>
          <li>Track your XP, streak, level, badges, leaderboard rank</li>
          <li>Match careers to your interests</li>
          <li>Send sign-in / password-reset emails (transactional only)</li>
          <li>Improve the product (aggregate, anonymised analytics — never personally identifying)</li>
        </ul>
        <p>
          We <strong>do not</strong> use your data to train AI models. AI question
          generation uses Anthropic's Claude API; your personal data is never sent in those
          requests — only the chapter/topic you picked.
        </p>
      </Section>

      <Section title="5. Who we share with">
        <p>Three categories, all minimum-necessary:</p>
        <ul>
          <li><strong>MongoDB Atlas</strong> (our database host) — to store your account and progress</li>
          <li><strong>Anthropic</strong> (Claude AI) — only the topic/chapter you choose for question generation; no personal data</li>
          <li><strong>Vercel</strong> (hosting) — IP address for serving the app and basic abuse prevention</li>
        </ul>
        <p>
          We <strong>do not</strong> sell, rent, or share your data with advertisers,
          data brokers, or any third party for marketing.
        </p>
      </Section>

      <Section title="6. How long we keep your data">
        <ul>
          <li><strong>While your account is active:</strong> indefinitely</li>
          <li><strong>If you delete your account:</strong> we remove your profile + practice history within 30 days</li>
          <li><strong>Inactive accounts (3+ years no login):</strong> we'll email a warning, then delete</li>
          <li><strong>Anonymised aggregate stats</strong> (e.g. "X students from Kerala practiced today") may be retained</li>
        </ul>
      </Section>

      <Section title="7. Your rights (DPDP Act)">
        <p>Email <a href="mailto:privacy@bcredupath.example" className="text-neon-cyan hover:underline">privacy@bcredupath.example</a> to:</p>
        <ul>
          <li><strong>Access</strong> a copy of your data (we'll send a JSON export within 7 days)</li>
          <li><strong>Correct</strong> any wrong information</li>
          <li><strong>Delete</strong> your account and data</li>
          <li><strong>Withdraw consent</strong> for data processing (this will delete your account)</li>
          <li><strong>File a grievance</strong> if you're unhappy with how we handled your data</li>
        </ul>
      </Section>

      <Section title="8. Security">
        <p>
          We use industry-standard encryption (TLS for all traffic, bcrypt for passwords).
          We're a small team — no system is perfectly secure, but we take this seriously.
          If you spot a vulnerability, please email{" "}
          <a href="mailto:security@bcredupath.example" className="text-neon-cyan hover:underline">
            security@bcredupath.example
          </a>
          .
        </p>
      </Section>

      <Section title="9. Cookies & similar tech">
        <p>
          We use one session cookie to keep you logged in. We don't use third-party
          tracking cookies or pixels. Your browser's localStorage holds tiny UI prefs
          (your locale, dismissed banners, read notifications) — never personal data.
        </p>
      </Section>

      <Section title="10. Changes to this policy">
        <p>
          If we make material changes, we'll show a banner in the app at least 30 days
          before they take effect. Continued use after that = acceptance.
        </p>
      </Section>

      <Section title="11. Grievance officer">
        <p>
          As required by Indian law, our grievance officer is{" "}
          <strong>Bibin CutRiver</strong>. Email{" "}
          <a href="mailto:grievance@bcredupath.example" className="text-neon-cyan hover:underline">
            grievance@bcredupath.example
          </a>
          . We respond within 30 days.
        </p>
      </Section>
    </LegalLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 font-display text-xl font-bold text-white">
        {title}
      </h2>
      <div className="space-y-2 [&_h3]:mt-3 [&_h3]:font-semibold [&_h3]:text-white [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-neon-cyan [&_a]:hover:underline">
        {children}
      </div>
    </section>
  );
}
