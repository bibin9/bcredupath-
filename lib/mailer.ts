/**
 * Email sender with two backends:
 *  - Resend (if RESEND_API_KEY is set in env) — for production
 *  - Console (fallback) — prints the email to dev server logs
 *
 * No SMTP dependency, no node-mailer install needed. Resend's HTTP API is
 * called via fetch. To go live, sign up at https://resend.com (free 3K/mo),
 * verify your sender domain, set RESEND_API_KEY + EMAIL_FROM env vars.
 */

const RESEND_API = "https://api.resend.com/emails";

export type Email = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmail(email: Email): Promise<{ ok: boolean; via: "resend" | "console"; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim() || "BCRedupath <noreply@bcredupath.example>";

  if (!apiKey) {
    // Dev fallback — log to server console so the user can grab the reset link
    /* eslint-disable no-console */
    console.log("\n📬 ───── EMAIL (console fallback) ─────");
    console.log("  To:      ", email.to);
    console.log("  From:    ", from);
    console.log("  Subject: ", email.subject);
    console.log("  ─────────────────────────────────────");
    console.log(stripHtml(email.html));
    console.log("  ─────────────────────────────────────\n");
    /* eslint-enable no-console */
    return { ok: true, via: "console" };
  }

  try {
    const res = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [email.to],
        subject: email.subject,
        html: email.html,
        text: email.text ?? stripHtml(email.html),
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, via: "resend", error: `Resend ${res.status}: ${body}` };
    }
    return { ok: true, via: "resend" };
  } catch (err) {
    return { ok: false, via: "resend", error: err instanceof Error ? err.message : "unknown" };
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

/* ─────────── Pre-built templates ─────────── */

export function passwordResetEmail(params: {
  name: string;
  resetUrl: string;
}) {
  const { name, resetUrl } = params;
  return {
    subject: "Reset your BCRedupath password",
    html: `<!doctype html>
<html><body style="font-family: system-ui, -apple-system, sans-serif; background:#0a0a1f; color:#fff; padding:24px;">
  <div style="max-width:480px; margin:0 auto; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:24px; padding:32px;">
    <div style="font-size:48px; text-align:center; margin-bottom:16px;">🎯</div>
    <h1 style="margin:0 0 8px; font-size:24px; text-align:center;">Reset your password</h1>
    <p style="margin:0 0 16px; color:rgba(255,255,255,0.7); font-size:14px;">
      Hi ${name},
    </p>
    <p style="margin:0 0 16px; color:rgba(255,255,255,0.7); font-size:14px;">
      Click the button below to set a new password. This link expires in 30 minutes.
    </p>
    <div style="text-align:center; margin:24px 0;">
      <a href="${resetUrl}" style="display:inline-block; background:linear-gradient(135deg, #ff3e88, #a855f7); color:#fff; padding:12px 24px; border-radius:16px; text-decoration:none; font-weight:600;">
        Reset password
      </a>
    </div>
    <p style="margin:0; color:rgba(255,255,255,0.5); font-size:12px; text-align:center;">
      If you didn't request this, ignore this email — your password stays the same.
    </p>
    <p style="margin:16px 0 0; color:rgba(255,255,255,0.35); font-size:11px; text-align:center;">
      Or copy this link: <br/><span style="word-break:break-all;">${resetUrl}</span>
    </p>
  </div>
</body></html>`,
  };
}
