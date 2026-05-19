import type { Metadata } from "next";
import { LegalLayout } from "@/components/shared/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Use — BCRedupath",
  description: "The rules for using BCRedupath, in plain English.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Use"
      subtitle="What you can do, what we can do, what nobody can do."
      lastUpdated="18 May 2026"
    >
      <Section title="The short version">
        <ul>
          <li>BCRedupath is free for personal study. Don't scrape it, resell content, or break the law with it.</li>
          <li>We're a small team and the service is provided "as is" — no guarantees that questions are 100% accurate.</li>
          <li>AI-generated questions are practice material — always cross-check with NCERT before exams.</li>
          <li>If you're under 18, your parent/guardian must agree to these terms with you.</li>
        </ul>
      </Section>

      <Section title="1. Who can use this">
        <ul>
          <li>You must be at least 13 to use BCRedupath.</li>
          <li>If you're 13–17, a parent or legal guardian must consent at signup.</li>
          <li>One account per person. No bots, no fake accounts, no buying/selling accounts.</li>
          <li>If you're banned, don't make a new account.</li>
        </ul>
      </Section>

      <Section title="2. What BCRedupath gives you">
        <ul>
          <li>Access to the question bank, AI predictor, practice modes, leaderboard, career/college/scholarship/exam content, and study planner.</li>
          <li>A personal profile with XP, streaks, badges, and bookmarks.</li>
          <li>Daily challenges and email/in-app notifications.</li>
        </ul>
        <p>
          We can change, pause, or stop any feature at any time. We'll usually give notice
          for big changes.
        </p>
      </Section>

      <Section title="3. Question accuracy & AI content">
        <p>
          Some questions in our bank are AI-generated using Claude (Anthropic).
          Although we use few-shot examples and web search across CBSE / NCERT / Vedantu /
          Oswaal sources, AI can make mistakes.
        </p>
        <ul>
          <li><strong>Always cross-check answers with your NCERT textbook</strong> before relying on them for exams.</li>
          <li>Questions tagged with real <code>yearsAsked</code> values are sourced from past papers; questions with empty year arrays are AI-supplemented exam-style content.</li>
          <li>Report errors via the bookmark icon → "report" or email{" "}
            <a href="mailto:feedback@bcredupath.example" className="text-neon-cyan hover:underline">
              feedback@bcredupath.example
            </a>
          </li>
        </ul>
      </Section>

      <Section title="4. What you can't do">
        <ul>
          <li><strong>Don't scrape or copy</strong> our content for resale or competing services.</li>
          <li><strong>Don't share your account</strong> with others — it messes up the leaderboard for everyone.</li>
          <li><strong>Don't try to break</strong> the app (reverse engineer, attack APIs, abuse the AI generator).</li>
          <li><strong>Don't upload</strong> illegal, hateful, sexual, or harmful content if we later add upload features.</li>
          <li><strong>Don't spam</strong> the AI generator — we rate-limit and may ban abusive accounts.</li>
        </ul>
      </Section>

      <Section title="5. Your content">
        <p>
          Your bookmarks, profile, and practice history belong to you. By using the
          service, you grant us a limited license to store, display, and process
          this data only as needed to provide the app to you.
        </p>
        <p>
          Leaderboard data (your name, avatar, XP, state, level) is visible to other
          students within scope. If you don't want to appear, set your state/school
          to blank in your profile.
        </p>
      </Section>

      <Section title="6. Counselors & helplines">
        <p>
          The helplines we list (iCALL, Vandrevala, CBSE, KIRAN, Fortis) are
          publicly-listed numbers. We're not a healthcare provider. In a mental
          health emergency, please call <strong>112</strong> or one of the
          24×7 helplines we list — not us.
        </p>
        <p>
          Counselor profiles, once we add them, are independent professionals — not
          our employees. We verify credentials but don't guarantee outcomes of any
          paid sessions.
        </p>
      </Section>

      <Section title="7. Free service, no guarantees">
        <p>
          BCRedupath is provided "as is" and "as available". We don't guarantee:
        </p>
        <ul>
          <li>That every question is 100% accurate</li>
          <li>That you'll get any specific score in your boards / JEE / NEET</li>
          <li>That the service will never go down</li>
          <li>That AI predictions reflect what will actually appear in 2026 exams</li>
        </ul>
        <p>
          To the maximum extent allowed by law, we're not liable for any indirect
          loss (lost time, lost marks, missed scholarships) from using the app.
          Our maximum liability is capped at ₹1,000 (one thousand rupees) per user.
        </p>
      </Section>

      <Section title="8. Closing your account">
        <p>
          You can delete your account anytime by emailing{" "}
          <a href="mailto:privacy@bcredupath.example" className="text-neon-cyan hover:underline">
            privacy@bcredupath.example
          </a>
          . We may also close accounts that violate these terms.
        </p>
      </Section>

      <Section title="9. Changes to these terms">
        <p>
          We'll show a banner at least 30 days before material changes. Continued use
          means you accept the new terms.
        </p>
      </Section>

      <Section title="10. Governing law & jurisdiction">
        <p>
          These terms are governed by the laws of India. Any disputes go to the
          courts of <strong>Kerala, India</strong>.
        </p>
      </Section>

      <Section title="11. Contact">
        <p>
          Built by <strong>Bibin CutRiver</strong>. Reach us at{" "}
          <a href="mailto:hello@bcredupath.example" className="text-neon-cyan hover:underline">
            hello@bcredupath.example
          </a>
          .
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
      <div className="space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-neon-cyan [&_a]:hover:underline [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[11px]">
        {children}
      </div>
    </section>
  );
}
